import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-delecao',
  templateUrl: './modal-delecao.component.html',
  styleUrls: ['./modal-delecao.component.css'],
})
export class ModalDelecaoComponent implements OnInit {
  @Output() eventConfirm = new EventEmitter<number>();
  @Input() deletarSubject: Subject<number | null>;
  @Input() titulo: string;

  @ViewChild('autoShownModal', { static: false })
  autoShownModal?: ModalDirective;
  excluindo = false;
  show = false;
  id = null;

  constructor() {}

  ngOnInit(): void {
    this.deletarSubject.subscribe(value => {
      this.id = value;
      if (value == null) {
        this.hideModal();
      } else {
        this.showModal();
      }
    });
  }
  showModal(): void {
    this.show = true;
  }
  hideModal(): void {
    this.autoShownModal?.hide();
  }
  onHide(): void {
    this.show = false;
    this.excluindo = false;
  }
  confirm() {
    this.excluindo = true;
    this.eventConfirm.emit(this.id);
  }
}
