import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { PainelControleComponent } from './painel-controle.component';
import { PainelRoutingModule } from './painel-routing.modules';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';

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
import { TabelaGramaticaComponent } from './validacao-formulas/exercicios/cadastrar-exercicio/tabela-gramatica/tabela-gramatica.component';
import { VisualizadorArvoreComponent } from './visualizador-arvore/visualizador-arvore.component';
import { PersonalizarArvoreComponent } from './validacao-formulas/exercicios/cadastrar-exercicio/personalizar-arvore/personalizar-arvore.component';


@NgModule({
  declarations: [
    PainelControleComponent, 
    ValidacaoFormulasComponent, 
    EstudoConceitosComponent, 
    NiveisComponent, 
    ExerciciosComponent, 
    RespostasComponent, 
    CriacaoLivreComponent,
    CadastrarNivelComponent,
    EditarNivelComponent,
    PesquisarExercicioComponent,
    TabelaExerciciosComponent,
    CadastrarExercicioComponent,
    TabelaGramaticaComponent,
    VisualizadorArvoreComponent,
    PersonalizarArvoreComponent,
  ],
  imports: [
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    CommonModule,
    PainelRoutingModule,
    FontAwesomeModule,
    FormsModule
  ]
})
export class PainelControleModule { }




