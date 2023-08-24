import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { RecompensaService } from './recompensas.service';
import { RecompensaInput } from './interfaces';
import { Recompensa } from 'src/app/common/models/recompensa.model';
import { Subject } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-recompensas',
  templateUrl: './recompensas.component.html',
  styleUrls: ['./recompensas.component.css'],
})
export class RecompensasComponent implements OnInit {
  @Output() eventFinished = new EventEmitter<unknown>();
  @Input() openSubject: Subject<number | null>;
  @ViewChild('autoShownModal', { static: false })
  autoShownModal?: ModalDirective;
  show = false;
  cadastrarColapse = false;
  editarColapse = true;
  idRecompensaSelecionada: number;
  listaRecompensas: Recompensa[];
  requisitando = false;
  title = 'Criar Recompensa';
  recompensa: RecompensaInput = {
    nome: '',
    pontuacao: 0,
  };
  exibirFormEditar = true;
  error = false;

  constructor(private service: RecompensaService) {}

  ngOnInit(): void {
    this.openSubject.subscribe(_ => {
      this.showModal();
      this.service.listar().subscribe(
        response =>
          (this.listaRecompensas =
            response.success === true ? response.data : []),
        error => (this.listaRecompensas = []),
      );
    });
  }

  showModal(): void {
    this.show = true;
  }
  hideModal(): void {
    this.autoShownModal?.hide();
  }
  onHide(): void {
    this.eventFinished.emit();
    this.show = false;
    this.cadastrarColapse = false;
    this.editarColapse = true;
    this.idRecompensaSelecionada = null;
    this.requisitando = false;
    this.title = 'Criar Recompensa';
    this.recompensa = {
      nome: '',
      pontuacao: 0,
    };
    this.exibirFormEditar = true;
    this.error = false;
  }

  cadastrarRecompensa() {
    this.error = false;
    this.requisitando = true;
    this.service.cadastrar(this.recompensa).subscribe(
      response => {
        this.requisitando = false;
        if (response.success) {
          this.hideModal();
        } else {
          this.error = true;
        }
      },
      error => {
        this.requisitando = false;
        this.error = true;
      },
    );
  }

  editarRecompensa() {
    this.error = false;
    this.requisitando = true;
    this.service.editar(this.recompensa).subscribe(
      response => {
        this.requisitando = false;

        if (response.success) {
          this.hideModal();
        }
      },
      error => {
        this.requisitando = false;
        this.error = true;
      },
    );
  }

  deletarRecompensa() {
    this.error = false;
    this.requisitando = true;
    this.service.deletar(this.recompensa.id).subscribe(
      response => {
        this.requisitando = false;

        if (response.success) {
          this.hideModal();
        } else {
        }
      },
      error => {
        this.requisitando = false;
        this.error = true;
      },
    );
  }

  exibirColapse(val: number) {
    this.error = false;
    if (val === 1 && this.cadastrarColapse) {
      this.title = 'Criar Recompensa';
      this.cadastrarColapse = !this.cadastrarColapse;
      this.editarColapse = !this.editarColapse;
    } else if (val === 2 && this.editarColapse) {
      this.title = 'Editar Recompensa';
      this.cadastrarColapse = !this.cadastrarColapse;
      this.editarColapse = !this.editarColapse;
    }
  }

  preencherForms() {
    this.exibirFormEditar = false;
    this.recompensa = this.listaRecompensas[this.idRecompensaSelecionada];
  }
}
