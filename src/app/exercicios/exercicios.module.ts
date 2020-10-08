import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercicioValidacaoComponent } from './exercicio-validacao/exercicio-validacao.component';
import { ExercicioRoutingModule } from './exercicio-routing.modules';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CollapseModule } from 'ngx-bootstrap/collapse';



@NgModule({
  declarations: [ExercicioValidacaoComponent],
  imports: [
    CommonModule,
    CollapseModule.forRoot(),
    ExercicioRoutingModule,
    FontAwesomeModule,
  ]
})
export class ExerciciosModule { }
