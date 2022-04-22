/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  faCog,
  faUser,
  faTimes,
  faArrowAltCircleLeft,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { LoginService } from '../auth/services/login.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-painel-controle',
  templateUrl: './painel-controle.component.html',
  styleUrls: ['./painel-controle.component.css'],
  providers: [
    {
      provide: BsDropdownConfig,
      useValue: { isAnimated: true, autoClose: true },
    },
  ],
})
export class PainelControleComponent implements OnInit {
  config = faCog;
  user = faUser;
  iconFechar = faTimes;
  iconVoltar = faArrowAltCircleLeft;
  home = faHome;

  errorMensagen = null;

  modulos = {
    modulo1: {
      itens: [
        {
          item: 'Níveis',
          url: 'painel/modulo1/niveis',
          id: 'item-nav1',
          ativo: false,
        },
        {
          item: 'Exercícios',
          url: 'painel/modulo1/exercicios/pesquisar',
          id: 'item-nav2',
          ativo: false,
        },
        {
          item: 'Respostas',
          url: 'painel/modulo1/respostas',
          id: 'item-nav3',
          ativo: false,
        },
      ],
      menu: [false, true, true],
      nome: 'Validação de fórmulas',
      id: 1,
    },
  };

  emailUser = null;
  configAberta = null;
  itensNavegacao = null;

  // Config Modal logout
  modalRef: BsModalRef;
  message: string;
  // ---

  saindo = false;
  constructor(
    private modalService: BsModalService,
    private login$: LoginService,
    private router: Router,
    private auth$: AuthService,
  ) {}

  ngOnInit(): void {
    this.rotaAtiva(this.router.url);
    // this.itensNavegacao=this.modulos.modulo2;
    this.emailUser = this.getEmailUser();
  }

  rotaAtiva(url) {
    const lista = url.split('/')[2];
    switch (lista) {
      case 'modulo1':
        this.itensNavegacao = this.modulos.modulo1;
        this.router.navigate(['painel/modulo1/inicio']);

        break;
      case 'configuracao':
        this.itensNavegacao = this.modulos.modulo1;
        this.router.navigate(['painel/modulo1/inicio']);
        break;
    }
  }

  getEmailUser() {
    const dataJson = localStorage.getItem('auth-data');
    if (dataJson) {
      const data = JSON.parse(dataJson)  as {access_token: string;
        email: string;
        expires_in: 3600;
        token_type: string;} ;
      return data.email;
    }
  }

  logout(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirmar(): void {
    this.saindo = true;
    const sair = this.login$.logout();
    if (sair !== false) {
      sair.subscribe(
        response => this.sucessoLogout(),
        error => this.erroLogout(),
      );
    } else {
      this.erroLogout();
    }
  }

  cancelar(): void {
    this.modalRef.hide();
  }

  sucessoLogout() {
    this.modalRef.hide();
    this.router.navigate(['login']);
    this.auth$.clean();
    this.saindo = false;
  }
  erroLogout() {
    this.modalRef.hide();
    this.router.navigate(['login']);
    this.saindo = false;
  }

  navegarPara(id) {
    // Calculo para movimentação da barra do menu de navegação
    const cordeNav = document
        .getElementById('barra-navegacao')
        .getBoundingClientRect().left;
      const item = document.getElementById(id);
      const barra = document.getElementById('barra-ativa-interna');
      const tamanhoItem = item.getBoundingClientRect().left;
      const centralizar =
        tamanhoItem -
        cordeNav +
        item.getBoundingClientRect().width / 2 -
        barra.getBoundingClientRect().width / 2;
    document.getElementById('barra-ativa-interna').style.transform =
      'translateX(' + centralizar + 'px)';
    // -----------------------------------
  }

  animacaoIniciar() {
    document.getElementById('barra-ativa-interna').style.transform =
      'translateX(50px)';

    // -----------------------------------
  }

  irpara() {
    document.getElementById('barra-ativa-interna').style.transform =
      'translateX(0px)';
  }

  fecharAvisoError() {
    this.errorMensagen = null;
  }

  abriConfigLogicLive() {
    this.router.navigate(['painel/configuracao/logiclive']);
    this.configAberta = true;
  }

  voltar() {
    switch (this.itensNavegacao.id) {
      case 1:
        this.router.navigate(['painel/modulo1/inicio']);
        break;
      default:
        this.router.navigate(['painel/modulo1/inicio']);
    }

    this.configAberta = false;
  }

  criarRecompensa(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
}
