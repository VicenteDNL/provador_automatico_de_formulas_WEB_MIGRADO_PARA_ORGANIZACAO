import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';

import { EstudoLivreComponent } from './components/estudo-livre/estudo-livre.component';
import { AlunoAuthGuard } from './guard/aluno-auth.guard';
import { ExercicioValidacaoComponent } from './components/exercicio-validacao/exercicio-validacao.component';
import { ArvoreComponent } from './components/estudo-conceitos/arvore/arvore.component';
import { RegrasComponent } from './components/estudo-conceitos/regras/regras.component';
import { AcessoInvalidoComponent } from './common/components/acesso-invalido/acesso-invalido.component';

export const routes: Routes = [
  {
    path: 'validacao/:id',
    component: ExercicioValidacaoComponent,
    canActivate: [AlunoAuthGuard],
  },
  {
    path: 'conceitos/arvore',
    component: ArvoreComponent,
    canActivate: [AlunoAuthGuard],
  },

  {
    path: 'conceitos/regras',
    component: RegrasComponent,
    canActivate: [AlunoAuthGuard],
  },

  {
    path: 'livre',
    component: EstudoLivreComponent,
    canActivate: [AlunoAuthGuard],
  },

  {
    path: 'error/token',
    component: AcessoInvalidoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExercicioRoutingModule {}
