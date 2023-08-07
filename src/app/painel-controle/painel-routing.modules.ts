import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { PainelControleComponent } from './painel-controle.component';
import { ModuloComponent } from './modulo/modulo.component';
import { NiveisComponent } from './modulo/niveis/niveis.component';
import { ExerciciosComponent } from './modulo/exercicios/exercicios.component';
import { RespostasComponent } from './modulo/respostas/respostas.component';
import { CadastrarNivelComponent } from './modulo/niveis/cadastrar-nivel/cadastrar-nivel.component';
import { EditarNivelComponent } from './modulo/niveis/editar-nivel/editar-nivel.component';
import { PesquisarExercicioComponent } from './modulo/exercicios/pesquisar-exercicio/pesquisar-exercicio.component';
import { ListarExerciciosComponent } from './modulo/exercicios/listar-exercicios/listar-exercicios.component';
import { CadastrarExercicioComponent } from './modulo/exercicios/cadastrar-exercicio/cadastrar-exercicio.component';
import { InicioComponent } from './modulo/inicio/inicio.component';
import { LogicLiveComponent } from './configuracoes/logic-live/logic-live.component';
import { EditarExercicioComponent } from './modulo/exercicios/editar-exercicio/editar-exercicio.component';

export const routes: Routes = [
  {
    path: 'modulo',
    redirectTo: 'modulo/inicio',
    pathMatch: 'full',
  },

  {
    path: '',
    component: PainelControleComponent,
    children: [
      { path: 'configuracao/logiclive', component: LogicLiveComponent },
      {
        path: 'modulo',
        component: ModuloComponent,
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
              { path: ':id', component: ListarExerciciosComponent },
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
