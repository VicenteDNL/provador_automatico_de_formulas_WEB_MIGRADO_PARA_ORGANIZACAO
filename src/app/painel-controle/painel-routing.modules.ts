import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { PainelControleComponent } from './painel-controle.component';
import { ValidacaoFormulasComponent } from './validacao-formulas/validacao-formulas.component';
import { NiveisComponent } from './validacao-formulas/niveis/niveis.component';
import { ExerciciosComponent } from './validacao-formulas/exercicios/exercicios.component';
import { RespostasComponent } from './validacao-formulas/respostas/respostas.component';
import { CadastrarNivelComponent } from './validacao-formulas/niveis/cadastrar-nivel/cadastrar-nivel.component';
import { EditarNivelComponent } from './validacao-formulas/niveis/editar-nivel/editar-nivel.component';
import { PesquisarExercicioComponent } from './validacao-formulas/exercicios/pesquisar-exercicio/pesquisar-exercicio.component';
import { TabelaExerciciosComponent } from './validacao-formulas/exercicios/tabela-exercicios/tabela-exercicios.component';
import { CadastrarExercicioComponent } from './validacao-formulas/exercicios/cadastrar-exercicio/cadastrar-exercicio.component';
import { InicioComponent } from './validacao-formulas/inicio/inicio.component';
import { LogicLiveComponent } from './configuracoes/logic-live/logic-live.component';
import { EditarExercicioComponent } from './validacao-formulas/exercicios/editar-exercicio/editar-exercicio.component';

export const routes: Routes = [
  {
    path: 'modulo1',
    redirectTo: 'modulo1/inicio',
    pathMatch: 'full',
  },

  {
    path: '',
    component: PainelControleComponent,
    children: [
      { path: 'configuracao/logiclive', component: LogicLiveComponent },
      {
        path: 'modulo1',
        component: ValidacaoFormulasComponent,
        children: [
          { path: 'inicio', component: InicioComponent },
          { path: 'niveis', component: NiveisComponent },
          { path: 'niveis/cadastrar', component: CadastrarNivelComponent },
          { path: 'niveis/editar/:id', component: EditarNivelComponent },
          {
            path: 'exercicios',
            component: ExerciciosComponent,
            children: [
              { path: '', component: PesquisarExercicioComponent },
              { path: ':id', component: TabelaExerciciosComponent },
              {
                path: ':idNivel/cadastrar',
                component: CadastrarExercicioComponent,
              },
              {
                path: ':idNivel/editar/:id',
                component: EditarExercicioComponent,
              },
            ],
          },

          { path: 'respostas', component: RespostasComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PainelRoutingModule {}
