/* eslint-disable @typescript-eslint/naming-convention */
import { AfterViewInit, Component, OnInit, TemplateRef } from '@angular/core';
import {
  faCog,
  faUser,
  faTimes,
  faArrowAltCircleLeft,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { LoginService } from '../auth/services/login.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { Subject } from 'rxjs';

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
export class PainelControleComponent implements OnInit, AfterViewInit {
  menu = faBars;
  config = faCog;
  user = faUser;
  iconFechar = faTimes;
  iconVoltar = faArrowAltCircleLeft;
  errorMensagen = null;
  emailUser = null;
  configAberta = null;
  itensNavegacao = null;
  openRecompensasSubject = new Subject<any>();
  openModalLogout = new Subject<any>();

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.emailUser = this.getEmailUser();
  }

  ngAfterViewInit() {
    this.rotaAtiva(this.router.url);
  }

  rotaAtiva(url: string) {
    const path = url.split('/')[2];
    if (path === 'usuarios' || path === 'logiclive') {
      this.configAberta = true;
    } else {
      this.navegarPara(`rota-${path}`);
    }
  }

  getEmailUser() {
    const dataJson = this.auth.getLocalStorage();
    if (dataJson) {
      return dataJson.email;
    }
    return 'desconhecido';
  }

  logout() {
    this.openModalLogout.next(true);
  }

  confirmarLogout(sucesso: boolean): void {
    if (sucesso) {
      this.router.navigate(['login']);
    } else {
      this.errorMensagen = 'Ocorreu um erro ao sair';
    }
  }

  navegarPara(id: string) {
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
  }

  irparaIncio() {
    document.getElementById('barra-ativa-interna').style.transform =
      'translateX(25px)';
  }

  fecharAvisoError() {
    this.errorMensagen = null;
  }

  abriConfigLogicLive() {
    this.configAberta = true;
    this.router.navigate(['painel/logiclive']);
  }

  abriUsuarios() {
    this.configAberta = true;
    this.router.navigate(['painel/usuarios']);
  }

  voltar() {
    this.configAberta = false;
    this.router.navigate(['painel/inicio']);
  }

  openModalRecompensa() {
    this.openRecompensasSubject.next();
  }
}
