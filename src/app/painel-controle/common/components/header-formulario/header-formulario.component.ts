import { Component, Input, OnInit } from '@angular/core';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header-formulario',
  templateUrl: './header-formulario.component.html',
  styleUrls: ['./header-formulario.component.css'],
})
export class HeaderFormularioComponent implements OnInit {
  @Input() titulo: string;
  @Input() linkVoltar: string;
  iconVoltar = faArrowAltCircleLeft;
  constructor() {}

  ngOnInit(): void {}
}
