import { Component, Input, OnInit } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Console } from '../../models/Console';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css'],
})
export class ConsoleComponent implements OnInit {
  @Input() console: Console;
  @Input() color: string;
  iconLimpar = faTrashAlt;
  constructor() {}

  ngOnInit(): void {}
}
