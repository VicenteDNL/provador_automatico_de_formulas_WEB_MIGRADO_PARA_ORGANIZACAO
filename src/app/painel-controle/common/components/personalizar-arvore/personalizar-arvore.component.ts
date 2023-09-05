import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ArvoreService } from 'src/app/painel-controle/common/services/arvore.service';
import { ArvoreResponse } from 'src/app/painel-controle/common/services/interfaces';
import { Passos } from 'src/app/common/models/Passos';
import { EtapasEmProgresso } from 'src/app/common/models/EtapasEmProgresso';
import { Selecao } from 'src/app/common/models/Selecao';
import { Console } from 'src/app/common/models/Console';
import { ArvoreManager } from 'src/app/common/models/ArvoreManager';
import { Logs } from 'src/app/common/enums/Logs';
import { Acoes } from 'src/app/common/enums/Acoes';
import { Arvore } from 'src/app/common/interfaces/arvore/arvore.model';
@Component({
  selector: 'app-personalizar-arvore',
  templateUrl: './personalizar-arvore.component.html',
  styleUrls: ['./personalizar-arvore.component.css'],
})
export class PersonalizarArvoreComponent implements OnInit {
  @Input() arvore: Arvore;
  @Input() openModal: Subject<boolean>;
  @Output() eventConfirm = new EventEmitter<Arvore>();
  @ViewChild('autoShownModal', { static: false })
  autoShownModal?: ModalDirective;
  show = false;
  iconLimpar = faTrashAlt;

  console: Console = new Console();
  etapasEmProgresso: EtapasEmProgresso = new EtapasEmProgresso();
  selecao: Selecao = new Selecao();
  arvoreManager: ArvoreManager = new ArvoreManager();
  passos: Passos = new Passos();
  onSave = false;

  constructor(private service: ArvoreService) {}

  ngOnInit(): void {
    this.openModal.subscribe(value => {
      if (value) {
        this.showModal();
      } else {
        this.hideModal();
      }
    });
  }

  showModal(): void {
    this.console.addLog('Buscando Fórmula', Logs.info, true);

    this.service.recria(this.arvore).subscribe(
      response => {
        this.sucessoNaRequisicao(response, Acoes.iniciar);
      },
      error => {
        this.console.cleanLogs();
        this.console.addLog(
          error?.error.msg ??
            'Ocorreu um erro ao inserir o argumento, tente novamente.',
          Logs.erro,
          false,
        );
      },
    );

    this.show = true;
  }

  hideModal(): void {
    this.autoShownModal?.hide();
  }
  onHide(): void {
    if (this.onSave === false) {
      this.eventConfirm.emit(null);
    }
    this.show = false;
    this.selecao.restart();
    this.passos.restart();
    this.arvoreManager.restart();
    this.etapasEmProgresso.restart();
    this.console.cleanLogs();
    this.onSave = false;
  }

  eventoOnclickNo(index: number) {
    this.arvoreManager.eventoClickNo(index, this.selecao);
  }

  adicionar(negar: boolean) {
    const inicializacao = this.passos.setInicializacao(negar);

    this.console.addLogByAcao(Acoes.adicionar, null, inicializacao.no);

    this.service
      .adicionar(this.arvoreManager.getArvore(), inicializacao)
      .subscribe(
        response => this.sucessoNaRequisicao(response, Acoes.adicionar),
        error => this.erroNaRequisicao(error),
      );
  }

  ticar() {
    const ticagem = this.passos.setTicagem(this.selecao);

    this.console.addLogByAcao(Acoes.ticar, ticagem.no);

    this.service.ticar(this.arvoreManager.getArvore(), ticagem).subscribe(
      response => this.sucessoNaRequisicao(response, Acoes.ticar),
      error => this.erroNaRequisicao(error),
    );
  }

  fechar() {
    const fechamento = this.passos.setFechamento(this.selecao);

    this.console.addLogByAcao(Acoes.fechar, fechamento.noFolha);

    this.service.fechar(this.arvoreManager.getArvore(), fechamento).subscribe(
      response => this.sucessoNaRequisicao(response, Acoes.fechar),
      error => this.erroNaRequisicao(error),
    );
  }

  derivar() {
    const derivacao = this.passos.setDerivacao(this.selecao);

    this.console.addLogByAcao(Acoes.derivar, derivacao.noDerivacao);

    this.service.derivar(this.arvoreManager.getArvore(), derivacao).subscribe(
      response => this.sucessoNaRequisicao(response, Acoes.derivar),
      error => this.erroNaRequisicao(error),
    );
  }

  salvar() {
    this.onSave = true;
    this.eventConfirm.emit(this.arvoreManager.getArvore());
    this.autoShownModal?.hide();
  }

  sucessoNaRequisicao(response: ArvoreResponse, acao: Acoes) {
    this.console.stopLoading();

    if (!response.success) {
      this.console.addLog(response.msg, Logs.erro, false);
      return;
    }
    this.console.sucessoLogByAcao(
      acao,
      this.passos.getFechamento().noFolha ??
        this.passos.getTicagem().no ??
        this.passos.getDerivacao().noDerivacao,
      this.passos.getInicializacao().no,
    );

    this.selecao.restart();
    this.passos.restart();
    this.arvoreManager.atualizarArvore(response.data);
    this.etapasEmProgresso.atualizarEtapa(this.arvoreManager);
  }

  erroNaRequisicao(erro: any) {
    this.console.cleanLogs();
    this.console.addLog(
      erro?.error.msg ??
        'Ocorreu um erro ao inserir o argumento, tente novamente.',
      Logs.erro,
      false,
    );
  }
}
