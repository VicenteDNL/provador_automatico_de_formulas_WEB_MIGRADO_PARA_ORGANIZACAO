import { Routes, RouterModule } from '@angular/router';


import { NgModule } from '@angular/core';
import { ExercicioValidacaoComponent } from './components/exercicio-validacao/exercicio-validacao.component';
import { Exercicio01Component } from './components/estudo-conceitos/exercicio01/exercicio01.component';


export const routes : Routes = [


  {
    path: 'validacao/:id',
    component:ExercicioValidacaoComponent,
  },
  {
    path: 'conceitos/01',
    component:Exercicio01Component,
  },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercicioRoutingModule { }