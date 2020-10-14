import { Component, OnInit } from '@angular/core';
import { PainelControleComponent } from '../../painel-controle.component';

@Component({
  selector: 'app-logic-live',
  templateUrl: './logic-live.component.html',
  styleUrls: ['./logic-live.component.css']
})
export class LogicLiveComponent implements OnInit {

  constructor( private painelComp: PainelControleComponent ) { }

  ngOnInit(): void {
  
  }

}
