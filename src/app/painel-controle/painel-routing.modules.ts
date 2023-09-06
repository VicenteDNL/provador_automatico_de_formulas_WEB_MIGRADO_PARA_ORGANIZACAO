import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { PainelControleComponent } from './painel-controle.component';
import { RespostasComponent } from './components/respostas/respostas.component';
import { CadastrarNivelComponent } from './components/niveis/cadastrar-nivel/cadastrar-nivel.component';
import { EditarNivelComponent } from './components/niveis/editar-nivel/editar-nivel.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LogicLiveComponent } from './configuracoes/logic-live/logic-live.component';
import { EditarExercicioComponent } from './components/exercicios/editar-exercicio/editar-exercicio.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CadastrarUsuarioComponent } from './components/usuarios/cadastrar-usuario/cadastrar-usuario.component';
import { EditarUsuarioComponent } from './components/usuarios/editar-usuario/editar-usuario.component';
import { NiveisComponent } from './components/niveis/niveis.component';
import { ExerciciosComponent } from './components/exercicios/exercicios.component';
import { CadastrarExercicioComponent } from './components/exercicios/cadastrar-exercicio/cadastrar-exercicio.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },

  {
    path: '',
    component: PainelControleComponent,
    children: [
      { path: 'logiclive', component: LogicLiveComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'usuarios/cadastrar', component: CadastrarUsuarioComponent },
      { path: 'usuarios/editar/:id', component: EditarUsuarioComponent },
      { path: 'inicio', component: InicioComponent },
      { path: 'niveis', component: NiveisComponent },
      { path: 'niveis/cadastrar', component: CadastrarNivelComponent },
      { path: 'niveis/editar/:id', component: EditarNivelComponent },
      { path: 'exercicios', component: ExerciciosComponent },
      {
        path: 'exercicios/cadastrar',
        component: CadastrarExercicioComponent,
      },
      {
        path: 'exercicios/editar/:id',
        component: EditarExercicioComponent,
      },

      { path: 'respostas', component: RespostasComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PainelRoutingModule {}
