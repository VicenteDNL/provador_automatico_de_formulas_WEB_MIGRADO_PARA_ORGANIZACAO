import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import {
  faStepBackward,
  faStepForward,
} from '@fortawesome/free-solid-svg-icons';
import { PaginationResponse } from 'src/app/common/models/paginationResponse.model';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.css'],
})
export class PaginacaoComponent implements OnInit, OnChanges {
  @Output() eventPaginate = new EventEmitter<number>();
  @Input() paginacao: PaginationResponse<any> | null;
  nextIcon = faStepForward;
  prevIcon = faStepBackward;
  buscando = false;
  nextPage = null;
  prevPage = null;
  total = 0;
  from = 0;
  to = 0;
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.carregarPaginas();
    this.buscando = false;
  }

  carregarPaginas() {
    if (this.paginacao) {
      const next = this.paginacao.next_page_url;

      this.nextPage =
        next == null ? 0 : next.substr(next.indexOf('=') + 1, next.length);

      const prev = this.paginacao.prev_page_url;
      this.prevPage =
        prev == null ? 0 : prev.substr(prev.indexOf('=') + 1, prev.length);

      this.total = this.paginacao.total;
      this.from = this.paginacao.from != null ? this.paginacao.from : 0;
      this.to = this.paginacao.to != null ? this.paginacao.to : 0;
    }
  }

  paginar(acao: string) {
    console.log({ acao });
    let page: 1;
    switch (acao) {
      case 'next':
        page = this.nextPage;
        break;
      case 'prev':
        page = this.prevPage;
        break;
      default:
        page = 1;
    }
    this.eventPaginate.emit(page);
    this.buscando = true;
  }
}
