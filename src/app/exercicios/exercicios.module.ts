import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercicioRoutingModule } from './exercicio-routing.modules';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ExercicioValidacaoComponent } from './components/exercicio-validacao/exercicio-validacao.component';



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
