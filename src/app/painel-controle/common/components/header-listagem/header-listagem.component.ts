import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-listagem',
  templateUrl: './header-listagem.component.html',
  styleUrls: ['./header-listagem.component.css'],
})
export class HeaderListagemComponent implements OnInit {
  @Input() titulo: string;
  @Input() linkCadastro: string;
  constructor() {}

  ngOnInit(): void {}
}
