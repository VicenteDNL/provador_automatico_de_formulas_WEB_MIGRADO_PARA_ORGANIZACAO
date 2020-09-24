import { Routes, RouterModule } from '@angular/router';


import { NgModule } from '@angular/core';
import { PainelControleComponent } from './painel-controle.component';
import { ValidacaoFormulasComponent } from './validacao-formulas/validacao-formulas.component';
import { EstudoConceitosComponent } from './estudo-conceitos/estudo-conceitos.component';
import { NiveisComponent } from './validacao-formulas/niveis/niveis.component';
import { ExerciciosComponent } from './validacao-formulas/exercicios/exercicios.component';
import { RespostasComponent } from './validacao-formulas/respostas/respostas.component';
import { CriacaoLivreComponent } from './criacao-livre/criacao-livre.component';
import { CadastrarNivelComponent } from './validacao-formulas/niveis/cadastrar-nivel/cadastrar-nivel.component';
import { EditarNivelComponent } from './validacao-formulas/niveis/editar-nivel/editar-nivel.component';
import { PesquisarExercicioComponent } from './validacao-formulas/exercicios/pesquisar-exercicio/pesquisar-exercicio.component';
import { TabelaExerciciosComponent } from './validacao-formulas/exercicios/tabela-exercicios/tabela-exercicios.component';
import { CadastrarExercicioComponent } from './validacao-formulas/exercicios/cadastrar-exercicio/cadastrar-exercicio.component';
import { InicioComponent } from './validacao-formulas/inicio/inicio.component';

export const routes : Routes = [


  {
    path:'modulo1',
    redirectTo: 'modulo1/inicio',
    pathMatch: 'full'
  },
  {
    path: '',
    component:PainelControleComponent,
    children: [
      { path: 'modulo1',
        component: ValidacaoFormulasComponent,
        children: [
          { path: 'inicio', component: InicioComponent },
          { path: 'niveis', component: NiveisComponent },
          { path: 'niveis/cadastrar', component: CadastrarNivelComponent },
          { path: 'niveis/editar/:id', component: EditarNivelComponent },


          { path: 'exercicios', component: ExerciciosComponent,
          children: [
            { path: 'pesquisar', component: PesquisarExercicioComponent },
            { path: ':id', component: TabelaExerciciosComponent},
            { path: ':idNivel/cadastrar', component: CadastrarExercicioComponent}
          ] },



          
          { path: 'respostas', component: RespostasComponent },
          ]

      },
      { path: 'modulo2',
      component: EstudoConceitosComponent
      // children: [
      //   { path: 'cadastrar', component: CadastrarComponent },
      //   { path: 'editar/:id', component: EditarComponent },
      //   ]

      },
      { path: 'modulo3',
      component: CriacaoLivreComponent
      // children: [
      //   { path: 'cadastrar', component: CadastrarComponent },
      //   { path: 'editar/:id', component: EditarComponent },
      //   ]

      }]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PainelRoutingModule { }