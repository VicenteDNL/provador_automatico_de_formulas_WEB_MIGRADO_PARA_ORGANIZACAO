import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabelaGramaticaComponent } from './tabela-gramatica/tabela-gramatica.component';

@NgModule({
  declarations: [TabelaGramaticaComponent],
  imports: [CommonModule],
  exports: [TabelaGramaticaComponent],
})
export class MyComponentsModule {}
