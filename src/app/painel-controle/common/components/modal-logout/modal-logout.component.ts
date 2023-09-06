import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoginService } from 'src/app/auth/services/login.service';

@Component({
  selector: 'app-modal-logout',
  templateUrl: './modal-logout.component.html',
  styleUrls: ['./modal-logout.component.css'],
})
export class ModalLogoutComponent implements OnInit {
  @Output() eventConfirm = new EventEmitter<boolean>();
  @Input() openModal: Subject<boolean>;

  @ViewChild('autoShownModal', { static: false })
  autoShownModal?: ModalDirective;
  saindo = false;
  show = false;

  constructor(private login: LoginService, private auth: AuthService) {}

  ngOnInit(): void {
    this.openModal.subscribe(value => {
      if (value) {
        this.showModal();
      } else {
        this.hideModal();
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
    this.saindo = false;
  }
  confirm() {
    this.saindo = true;
    const sair = this.login.logout();
    if (sair !== false) {
      sair.subscribe(
        response => {
          if (response.success) {
            this.auth.cleanLocalStorage();
            this.eventConfirm.emit(true);
          } else {
            this.eventConfirm.emit(false);
          }
          this.hideModal();
        },
        error => {
          this.eventConfirm.emit(false);
          this.hideModal();
        },
      );
    } else {
      this.eventConfirm.emit(false);
      this.hideModal();
    }
  }
}
