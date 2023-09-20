import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabelaGramaticaComponent } from './tabela-gramatica/tabela-gramatica.component';
import { VisualizadorArvoreComponent } from './visualizador-arvore/visualizador-arvore.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [TabelaGramaticaComponent, VisualizadorArvoreComponent],

  imports: [CommonModule, FontAwesomeModule],
  exports: [TabelaGramaticaComponent, VisualizadorArvoreComponent],
})
export class MyComponentsModule {}
