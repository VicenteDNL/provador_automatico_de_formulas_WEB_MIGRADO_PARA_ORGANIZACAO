import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercicioRoutingModule } from './exercicio-routing.modules';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { EstudoLivreComponent } from './components/modulos/estudo-livre/estudo-livre.component';
import { FormsModule } from '@angular/forms';
import { RegrasGramlogicComponent } from './components/regras-gramlogic/regras-gramlogic.component';
import { VizualizadorArvoreComponent } from './components/vizualizador-arvore/vizualizador-arvore.component';
import { ExercicioValidacaoComponent } from './components/modulos/exercicio-validacao/exercicio-validacao.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RegrasComponent } from './components/modulos/estudo-conceitos/regras/regras.component';
import { ArvoreComponent } from './components/modulos/estudo-conceitos/arvore/arvore.component';
import { AcessoInvalidoComponent } from './components/acesso-invalido/acesso-invalido.component';

@NgModule({
  declarations: [
    ExercicioValidacaoComponent,
    EstudoLivreComponent,
    AcessoInvalidoComponent,
    RegrasGramlogicComponent,
    VizualizadorArvoreComponent,
    RegrasComponent,
    ArvoreComponent,
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    ExercicioRoutingModule,
    FontAwesomeModule,
    FormsModule,
  ],
})
export class ExerciciosModule {}
