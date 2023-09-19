import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExercicioRoutingModule } from './exercicio-routing.modules';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';

import { EstudoLivreComponent } from './components/estudo-livre/estudo-livre.component';
import { ExercicioValidacaoComponent } from './components/exercicio-validacao/exercicio-validacao.component';
import { RegrasComponent } from './components/estudo-conceitos/regras/regras.component';
import { ArvoreComponent } from './components/estudo-conceitos/arvore/arvore.component';
import { ModalErroGramaticaComponent } from './common/components/modal-erro-gramatica/modal-erro-gramatica.component';
import { ModalInfoGramaticaComponent } from './common/components/modal-info-gramatica/modal-info-gramatica.component';
import { MyComponentsModule } from '../common/components/my-components.module';
import { ModalVisualizadorArvoreComponent } from './common/components/modal-visualizador-arvore/modal-visualizador-arvore.component';
import { ErroInternoComponent } from './common/components/erro-interno/erro-interno.component';

@NgModule({
  declarations: [
    ExercicioValidacaoComponent,
    EstudoLivreComponent,
    RegrasComponent,
    ArvoreComponent,
    ModalErroGramaticaComponent,
    ModalInfoGramaticaComponent,
    ModalVisualizadorArvoreComponent,
    ErroInternoComponent,
  ],
  imports: [
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    CommonModule,
    ExercicioRoutingModule,
    FontAwesomeModule,
    FormsModule,
    MyComponentsModule,
  ],
})
export class ExerciciosModule {}
