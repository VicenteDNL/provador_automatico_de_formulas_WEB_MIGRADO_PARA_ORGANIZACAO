import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabelaGramaticaComponent } from './tabela-gramatica/tabela-gramatica.component';
import { VisualizadorArvoreComponent } from './visualizador-arvore/visualizador-arvore.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlacarComponent } from './placar/placar.component';
import { ControlesComponent } from './controles/controles.component';
import { ConsoleComponent } from './console/console.component';
import { DerivacaoComponent } from './derivacao/derivacao.component';

@NgModule({
  declarations: [
    TabelaGramaticaComponent,
    VisualizadorArvoreComponent,
    ConsoleComponent,
    PlacarComponent,
    ControlesComponent,
    ConsoleComponent,
    DerivacaoComponent,
  ],

  imports: [CommonModule, FontAwesomeModule],
  exports: [
    TabelaGramaticaComponent,
    VisualizadorArvoreComponent,
    ConsoleComponent,
    PlacarComponent,
    ControlesComponent,
    DerivacaoComponent,
  ],
})
export class MyComponentsModule {}
