import { Component, OnInit } from '@angular/core';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { AlunoAuthService } from 'src/app/exercicios/service/aluno-auth.service';
import { ConceitosService } from 'src/app/exercicios/service/conceitos.service';

@Component({
  selector: 'app-regras',
  templateUrl: './regras.component.html',
  styleUrls: ['./regras.component.css'],
})
export class RegrasComponent implements OnInit {
  check = faCheckSquare;
  buscando;
  constructor(
    private service: ConceitosService,
    private auth: AlunoAuthService,
  ) {}

  ngOnInit(): void {}

  concluir() {
    this.buscando = true;
    this.service.concluir(this.auth.get(), 2).subscribe(
      response => {
        if (response.success) {
          this.buscando = false;
        } else {
          this.buscando = false;
        }
      },
      error => null,
    );
  }
}
