import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PainelControleComponent } from './painel-controle.component';
import { PainelRoutingModule } from './painel-routing.modules';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { ModuloComponent  } from './modulo/modulo.component';
import { NiveisComponent } from './modulo/niveis/niveis.component';
import { ExerciciosComponent } from './modulo/exercicios/exercicios.component';
import { RespostasComponent } from './modulo/respostas/respostas.component';
import { CadastrarNivelComponent } from './modulo/niveis/cadastrar-nivel/cadastrar-nivel.component';
import { EditarNivelComponent } from './modulo/niveis/editar-nivel/editar-nivel.component';
import { PesquisarExercicioComponent } from './modulo/exercicios/pesquisar-exercicio/pesquisar-exercicio.component';
import { ListarExerciciosComponent } from './modulo/exercicios/listar-exercicios/listar-exercicios.component';
import { CadastrarExercicioComponent } from './modulo/exercicios/cadastrar-exercicio/cadastrar-exercicio.component';
import { TabelaGramaticaComponent } from './modulo/exercicios/cadastrar-exercicio/tabela-gramatica/tabela-gramatica.component';
import { VisualizadorArvoreComponent } from './visualizador-arvore/visualizador-arvore.component';
import { PersonalizarArvoreComponent } from
'./modulo/exercicios/cadastrar-exercicio/personalizar-arvore/personalizar-arvore.component';
import { InicioComponent } from './modulo/inicio/inicio.component';
import { LogicLiveComponent } from './configuracoes/logic-live/logic-live.component';
import { UsuarioComponent } from './configuracoes/usuario/usuario.component';
import { RecompensasComponent } from './modulo/recompensa/recompensas.component';
import { EditarExercicioComponent } from './modulo/exercicios/editar-exercicio/editar-exercicio.component';

@NgModule({
  declarations: [
    PainelControleComponent,
    ModuloComponent,
    NiveisComponent,
    ExerciciosComponent,
    RespostasComponent,
    CadastrarNivelComponent,
    EditarNivelComponent,
    PesquisarExercicioComponent,
    ListarExerciciosComponent,
    CadastrarExercicioComponent,
    TabelaGramaticaComponent,
    VisualizadorArvoreComponent,
    PersonalizarArvoreComponent,
    InicioComponent,
    LogicLiveComponent,
    UsuarioComponent,
    RecompensasComponent,
    EditarExercicioComponent,
  ],
  imports: [
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    CommonModule,
    PainelRoutingModule,
    FontAwesomeModule,
    FormsModule,
  ],
})
export class PainelControleModule {}
