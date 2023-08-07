import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/services/login.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email;
  senha;
  logando = false;
  errorLogin;
  sucessoLogin = false;
  constructor(
    private login$: LoginService,
    private router: Router,
    private auth$: AuthService,
  ) {}

  ngOnInit(): void {}
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  // ngAfterViewInit() {
  //   this.animacaoIniciar();
  // }

  onLogin() {
    this.errorLogin = null;
    this.logando = true;
    this.login$.login(this.email, this.senha).subscribe(
      data => {
        this.sucessoLogin = true;
        this.auth$.set(data);
        this.logando = false;
        this.email = '';
        this.senha = '';
        this.router.navigate(['painel/modulo/inicio']);
      },

      error => {
        if (error.status === '401') {
          this.errorLogin = 'email ou senha inválidos ';
        } else if (error.status === '0') {
          this.errorLogin = 'Erro interno. tente novamente';
        } else {
          this.errorLogin = 'Ocorreu um erro ao tentar entrar no sistema';
        }
        this.logando = false;
      },
    );
  }

  // navegarPara(id) {
  //   // Calculo para movimentação da barra do menu de navegação
  //   const cordeNav = document
  //       .getElementById('barra-navegacao')
  //       .getBoundingClientRect().left;
  //     const item = document.getElementById(id);
  //     const barra = document.getElementById('barra-ativa');
  //     const tamanhoItem = item.getBoundingClientRect().left;
  //     const centralizar =
  //       tamanhoItem -
  //       cordeNav +
  //       item.getBoundingClientRect().width / 2 -
  //       barra.getBoundingClientRect().width / 2;
  //   document.getElementById('barra-ativa').style.transform =
  //     'translateX(' + centralizar + 'px)';
  //   // -----------------------------------

  //   //Remoção da Classe "navegacao-ativa" de todos os itens da navegação
  //   const lista = document.getElementsByClassName('item-navegacao') as unknown as any[];
  //   for (const value of lista) {
  //     const arr = value.className.split(' ');
  //     if (arr.indexOf('navegacao-ativa') !== -1) {
  //       arr.splice(arr.indexOf('navegacao-ativa'), 1);
  //       let classes = '';
  //       // eslint-disable-next-line @typescript-eslint/prefer-for-of
  //       for (let e = 0; e < arr.length; e++) {
  //         classes = classes + ' ' + arr[e];
  //       }
  //       value.className = classes;
  //     }
  //   }
  //   // -----------------------------------

  //   // Adição da Classe "navegacao-ativa" no item de navegação clicado
  //   item.classList.add('navegacao-ativa');
  //   // -----------------------------------
  // }

  // animacaoIniciar() {
  //   // Calculo para movimentação da barra do menu de navegação ao iniciar o componente
  //   const cordeNav = document
  //       .getElementById('barra-navegacao')
  //       .getBoundingClientRect().left;
  //     const item = document.getElementsByClassName('navegacao-ativa')[0];
  //     const barra = document.getElementById('barra-ativa');
  //     const tamanhoItem = item.getBoundingClientRect().left;
  //     const centralizar =
  //       tamanhoItem -
  //       cordeNav +
  //       item.getBoundingClientRect().width / 2 -
  //       barra.getBoundingClientRect().width / 2;
  //   document.getElementById('barra-ativa').style.transform =
  //     'translateX(' + centralizar + 'px)';
  //   // -----------------------------------
  // }
}
