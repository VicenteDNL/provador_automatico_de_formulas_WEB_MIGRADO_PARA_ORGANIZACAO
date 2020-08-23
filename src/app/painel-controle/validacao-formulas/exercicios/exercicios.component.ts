import { Component, OnInit } from '@angular/core';
import { Niveis } from '../../models/niveis.model';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-exercicios',
  templateUrl: './exercicios.component.html',
  styleUrls: ['./exercicios.component.css']
})
export class ExerciciosComponent implements OnInit {
  errorMensagen=null
  iconFechar=faTimes;
  constructor() { }

  ngOnInit(): void {
   
  }

  fecharAvisoError(){
    this.errorMensagen=null
  }

}
