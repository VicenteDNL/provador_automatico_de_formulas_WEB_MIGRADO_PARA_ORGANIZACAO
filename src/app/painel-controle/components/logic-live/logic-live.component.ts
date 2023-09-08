import { Component, OnInit } from '@angular/core';
import { PainelControleComponent } from '../../painel-controle.component';
import { LogicLiveService } from './logic-live.service';
import { LogicLiveInfo } from './interfaces';

@Component({
  selector: 'app-logic-live',
  templateUrl: './logic-live.component.html',
  styleUrls: ['./logic-live.component.css'],
})
export class LogicLiveComponent implements OnInit {
  info: { loading: boolean; data: LogicLiveInfo | null } = {
    loading: true,
    data: null,
  };

  statusIntegracao = {
    loading: true,
    status: false,
    erro: false,
  };

  constructor(
    private service: LogicLiveService,
    private painelCpm: PainelControleComponent,
  ) {}

  ngOnInit(): void {
    this.buscarInfos();

    this.service.ativo().subscribe(
      response => {
        if (response.success) {
          this.statusIntegracao.status = response.data.ativo;
        } else {
          this.statusIntegracao.erro = true;
        }
        this.statusIntegracao.loading = false;
      },
      error => {
        this.statusIntegracao.loading = false;
        this.statusIntegracao.erro = true;
      },
    );
  }

  buscarInfos() {
    this.service.info().subscribe(
      response => {
        this.info.loading = false;
        if (response.success) {
          this.info.data = response.data;
        } else {
          this.painelCpm.errorMensagen = response.msg;
          this.info.loading = false;
        }
      },
      error => {
        this.info.loading = false;
        this.painelCpm.errorMensagen = error.error.msg;
      },
    );
  }

  criarGame() {
    this.info.loading = true;
    this.service.criarGame().subscribe(
      response => {
        if (response.success) {
          this.buscarInfos();
        } else {
          this.painelCpm.errorMensagen = response.msg;
          this.info.loading = false;
        }
        this.info.loading = false;
      },
      error => {
        this.painelCpm.errorMensagen =
          error.error.msg ?? 'Não foi possivel executar essa ação';
        this.info.loading = false;
      },
    );
  }

  statusGame(ativo: boolean, id: number) {
    this.info.loading = true;
    this.service.statusGame(id, { ativo }).subscribe(
      response => {
        if (response.success) {
          this.buscarInfos();
        } else {
          this.painelCpm.errorMensagen = response.msg;
          this.info.loading = false;
        }
      },
      error => {
        this.painelCpm.errorMensagen =
          error.error.msg ?? 'Não foi possivel executar essa ação';
        this.info.loading = false;
      },
    );
  }

  criarModulos(idGame: number) {
    this.info.loading = true;
    this.service.criarModulos(idGame).subscribe(
      response => {
        if (response.success) {
          this.buscarInfos();
        } else {
          this.painelCpm.errorMensagen = response.msg;
          this.info.loading = false;
        }
      },
      error => {
        this.painelCpm.errorMensagen =
          error.error.msg ?? 'Não foi possivel executar essa ação';
        this.info.loading = false;
      },
    );
  }

  statusModulo(ativo: boolean, id: number) {
    this.info.loading = true;
    this.service.statusModulo(id, { ativo }).subscribe(
      response => {
        if (response.success) {
          this.buscarInfos();
        } else {
          this.painelCpm.errorMensagen = response.msg;
          this.info.loading = false;
        }
      },
      error => {
        this.painelCpm.errorMensagen =
          error.error.msg ?? 'Não foi possivel executar essa ação';
        this.info.loading = false;
      },
    );
  }

  criarNiveis(idModulo: number) {
    this.info.loading = true;
    this.service.criarNiveis(idModulo).subscribe(
      response => {
        if (response.success) {
          this.buscarInfos();
        } else {
          this.painelCpm.errorMensagen = response.msg;
          this.info.loading = false;
        }
      },
      error => {
        this.painelCpm.errorMensagen =
          error.error.msg ?? 'Não foi possivel executar essa ação';
        this.info.loading = false;
      },
    );
  }

  statusNivel(ativo: boolean, id: number) {
    this.info.loading = true;
    this.service.statusNivel(id, { ativo }).subscribe(
      response => {
        if (response.success) {
          this.buscarInfos();
        } else {
          this.painelCpm.errorMensagen = response.msg;
          this.info.loading = false;
        }
      },
      error => {
        this.painelCpm.errorMensagen =
          error.error.msg ?? 'Não foi possivel executar essa ação';
        this.info.loading = false;
      },
    );
  }

  criarExercicios(idNivel: number) {
    this.info.loading = true;
    this.service.criarExercicios(idNivel).subscribe(
      response => {
        if (response.success) {
          this.buscarInfos();
        } else {
          this.painelCpm.errorMensagen = response.msg;
          this.info.loading = false;
        }
      },
      error => {
        this.painelCpm.errorMensagen =
          error.error.msg ?? 'Não foi possivel executar essa ação';
        this.info.loading = false;
      },
    );
  }

  statusExercicio(ativo: boolean, id: number) {
    this.info.loading = true;
    this.service.statusExercicio(id, { ativo }).subscribe(
      response => {
        if (response.success) {
          this.buscarInfos();
        } else {
          this.painelCpm.errorMensagen = response.msg;
          this.info.loading = false;
        }
      },
      error => {
        this.painelCpm.errorMensagen =
          error.error.msg ?? 'Não foi possivel executar essa ação';
        this.info.loading = false;
      },
    );
  }
}
