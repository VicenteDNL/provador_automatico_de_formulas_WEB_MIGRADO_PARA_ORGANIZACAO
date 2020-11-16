import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercicioRoutingModule } from './exercicio-routing.modules';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ExercicioValidacaoComponent } from './components/exercicio-validacao/exercicio-validacao.component';
import { Exercicio01Component } from './components/estudo-conceitos/exercicio01/exercicio01.component';
import { Exercicio02Component } from './components/estudo-conceitos/exercicio02/exercicio02.component';





@NgModule({
  declarations: [ExercicioValidacaoComponent, Exercicio01Component, Exercicio02Component],
  imports: [
    CommonModule,
    CollapseModule.forRoot(),
    ExercicioRoutingModule,
    FontAwesomeModule,
  ]
})
export class ExerciciosModule { }
