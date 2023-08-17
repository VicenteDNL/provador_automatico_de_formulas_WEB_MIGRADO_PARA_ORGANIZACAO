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
  email: string;
  senha: string;
  logando = false;
  errorLogin: string|null;
  sucessoLogin = false;
  constructor(
    private login$: LoginService,
    private router: Router,
    private auth$: AuthService,
  ) {}

  ngOnInit(): void {}

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
        this.router.navigate(['painel']);
      },

      error => {
        console.log(error);
        if (error.status === 401) {
          this.errorLogin = 'Email ou senha inválidos ';
        } else if (error.status === 500) {
          this.errorLogin = 'Erro interno. tente novamente';
        } else {
          this.errorLogin = 'Ocorreu um erro ao tentar entrar no sistema';
        }
        this.logando = false;
      },
    );
  }
}
