import { Routes, RouterModule } from '@angular/router';


import { NgModule } from '@angular/core';

import { EstudoLivreComponent } from './components/modulos/estudo-livre/estudo-livre.component';
import { AlunoAuthGuard } from './guard/aluno-auth.guard';
import { ExercicioValidacaoComponent } from './components/modulos/exercicio-validacao/exercicio-validacao.component';
import { ArvoreComponent } from './components/modulos/estudo-conceitos/arvore/arvore.component';
import { RegrasComponent } from './components/modulos/estudo-conceitos/regras/regras.component';
import { AcessoInvalidoComponent } from './components/acesso-invalido/acesso-invalido.component';


export const routes : Routes = [


  {
    path: 'validacao/:id',
    component:ExercicioValidacaoComponent,
    canActivate: [AlunoAuthGuard],
  },
  {
    path: 'conceitos/01',
    component:ArvoreComponent,
    canActivate: [AlunoAuthGuard],
  },

  {
    path: 'conceitos/02',
    component:RegrasComponent,
    canActivate: [AlunoAuthGuard],
  },

  {
    path: 'livre/01',
    component:EstudoLivreComponent,
    canActivate: [AlunoAuthGuard],
  },
 

  {
    path: 'error/token',
    component:AcessoInvalidoComponent,

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercicioRoutingModule { }