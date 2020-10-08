import { Routes, RouterModule } from '@angular/router';


import { NgModule } from '@angular/core';
import { ExercicioValidacaoComponent } from './exercicio-validacao/exercicio-validacao.component';

export const routes : Routes = [


  {
    path: 'validacao/:id',
    component:ExercicioValidacaoComponent,
  },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercicioRoutingModule { }