import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabelaGramaticaComponent } from './tabela-gramatica/tabela-gramatica.component';
import { VisualizadorArvoreComponent } from './visualizador-arvore/visualizador-arvore.component';

@NgModule({
  declarations: [TabelaGramaticaComponent, VisualizadorArvoreComponent],
  imports: [CommonModule],
  exports: [TabelaGramaticaComponent, VisualizadorArvoreComponent],
})
export class MyComponentsModule {}
