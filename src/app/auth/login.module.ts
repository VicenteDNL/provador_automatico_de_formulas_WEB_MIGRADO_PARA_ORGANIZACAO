import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { LoginService } from './services/login.service';
import { httpInterceptorProviders } from './http-interceptors';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, HttpClientModule],

  providers: [LoginService, AuthService, httpInterceptorProviders],
})
export class LoginModule {}
