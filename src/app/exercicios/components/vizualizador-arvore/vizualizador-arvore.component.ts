import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vizualizador-arvore',
  templateUrl: './vizualizador-arvore.component.html',
  styleUrls: ['./vizualizador-arvore.component.css']
})
export class VizualizadorArvoreComponent implements OnInit {

  @Input() impressaoNo:Array<any>;
  @Input() impressaoAresta:Array<any>;
  @Input() exibirLinha:boolean;
  @Input() width:number;
  @Input() height:number;
 constructor() { }
 fillColor = 'url(#grad1)';
 ngOnInit(): void {
 }


 alterarcor(index){
   this.impressaoNo[index].fill='url(#grad2)'

 }


 voltarcor(index){
   this.impressaoNo[index].fill='url(#grad1)'
 }
}
