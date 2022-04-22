import { Component, OnInit } from '@angular/core';
import { ExerciciosService } from '../exercicios.service';
import { Niveis } from 'src/app/painel-controle/models/niveis.model';
import { map } from 'rxjs/operators';
import { ExerciciosComponent } from '../exercicios.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pesquisar-exercicio',
  templateUrl: './pesquisar-exercicio.component.html',
  styleUrls: ['./pesquisar-exercicio.component.css'],
})
export class PesquisarExercicioComponent implements OnInit {
  loadingNiveis = false;
  listaNiveis = null;
  nivelId = null;
  constructor(
    private service: ExerciciosService,
    private exercicioCmp: ExerciciosComponent,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.carregarLista();
  }

  carregarLista() {
    this.loadingNiveis = true;

    this.service
      .listarNiveis()
      .pipe(
        map(response => {
          if (response.success === true) {
            return response.data;
            // ----------------------------------------------------
          } else {
            this.errorMensagem(
              'Ocorreu um error ao buscar os niveis disponiveis',
            );
            return [];
          }
        }),
      )
      .subscribe(
        response => this.sucessoBuscaNiveis(response),
        error => this.errorMensagem(error.message),
      );
  }

  sucessoBuscaNiveis(response) {
    this.listaNiveis = response;
    this.loadingNiveis = false;
  }

  errorMensagem(msg) {
    this.loadingNiveis = false;
    this.exercicioCmp.errorMensagen = msg;
  }

  carregarExercicios() {
    this.router.navigate(['/painel/modulo1/exercicios', this.nivelId]);
  }
}
