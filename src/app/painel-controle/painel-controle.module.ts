import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PainelControleComponent } from './painel-controle.component';
import { PainelRoutingModule } from './painel-routing.modules';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { RespostasComponent } from './components/respostas/respostas.component';
import { CadastrarNivelComponent } from './components/niveis/cadastrar-nivel/cadastrar-nivel.component';
import { EditarNivelComponent } from './components/niveis/editar-nivel/editar-nivel.component';
import { PersonalizarArvoreComponent } from './common/components/personalizar-arvore/personalizar-arvore.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LogicLiveComponent } from './components/logic-live/logic-live.component';
import { RecompensasComponent } from './components/recompensa/recompensas.component';
import { EditarExercicioComponent } from './components/exercicios/editar-exercicio/editar-exercicio.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CadastrarUsuarioComponent } from './components/usuarios/cadastrar-usuario/cadastrar-usuario.component';
import { EditarUsuarioComponent } from './components/usuarios/editar-usuario/editar-usuario.component';
import { HeaderFormularioComponent } from './common/components/header-formulario/header-formulario.component';
import { SpinnerComponent } from './common/components/spinner/spinner.component';
import { ModalDelecaoComponent } from './common/components/modal-delecao/modal-delecao.component';
import { PaginacaoComponent } from './common/components/paginacao/paginacao.component';
import { HeaderListagemComponent } from './common/components/header-listagem/header-listagem.component';
import { NiveisComponent } from './components/niveis/niveis.component';
import { ExerciciosComponent } from './components/exercicios/exercicios.component';
import { CadastrarExercicioComponent } from './components/exercicios/cadastrar-exercicio/cadastrar-exercicio.component';
import { ModalVisualizadorArvoreComponent } from './common/components/modal-visualizador-arvore/modal-visualizador-arvore.component';
import { ModalErroGramaticaComponent } from './common/components/modal-erro-gramatica/modal-erro-gramatica.component';
import { ModalInfoGramaticaComponent } from './common/components/modal-info-gramatica/modal-info-gramatica.component';
import { ModalLogoutComponent } from './common/components/modal-logout/modal-logout.component';
import { MyComponentsModule } from '../common/components/my-components.module';

@NgModule({
  declarations: [
    PainelControleComponent,
    NiveisComponent,
    ExerciciosComponent,
    RespostasComponent,
    CadastrarNivelComponent,
    EditarNivelComponent,
    CadastrarExercicioComponent,
    PersonalizarArvoreComponent,
    InicioComponent,
    LogicLiveComponent,
    UsuariosComponent,
    RecompensasComponent,
    EditarExercicioComponent,
    UsuariosComponent,
    CadastrarUsuarioComponent,
    EditarUsuarioComponent,
    HeaderFormularioComponent,
    SpinnerComponent,
    ModalDelecaoComponent,
    PaginacaoComponent,
    HeaderListagemComponent,
    ModalVisualizadorArvoreComponent,
    ModalErroGramaticaComponent,
    ModalInfoGramaticaComponent,
    ModalLogoutComponent,
  ],
  imports: [
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    CommonModule,
    PainelRoutingModule,
    FontAwesomeModule,
    FormsModule,
    MyComponentsModule,
  ],
})
export class PainelControleModule {}
