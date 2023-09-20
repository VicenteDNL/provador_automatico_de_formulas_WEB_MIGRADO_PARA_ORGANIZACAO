import { Component, Input, OnInit } from '@angular/core';
import { Saude } from '../../../../common/interfaces/saude';
import {
  faClock,
  faHeart,
  faInfinity,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-placar',
  templateUrl: './placar.component.html',
  styleUrls: ['./placar.component.css'],
})
export class PlacarComponent implements OnInit {
  @Input() color: string;
  @Input() saude: Saude;
  @Input() enunciado: Saude;
  iconClock = faClock;
  iconHeart = faHeart;
  iconInfinity = faInfinity;
  iconTrophy = faTrophy;

  constructor() {}

  ngOnInit(): void {}
}
