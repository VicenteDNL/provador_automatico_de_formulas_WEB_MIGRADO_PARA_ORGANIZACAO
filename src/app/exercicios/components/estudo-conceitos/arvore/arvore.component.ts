import { Component, OnInit } from '@angular/core';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { EstudoConceitosService } from '../estudo-conceitos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConcluirEstudoConceitosInput } from '../interfaces';

@Component({
  selector: 'app-arvore',
  templateUrl: './arvore.component.html',
  styleUrls: ['./arvore.component.css'],
})
export class ArvoreComponent implements OnInit {
  concluindo: boolean;
  check = faCheckSquare;
  concluirInput: ConcluirEstudoConceitosInput | null = null;

  constructor(
    private service: EstudoConceitosService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      if (
        queryParams.usu_hash === undefined ||
        queryParams.usu_hash === undefined
      ) {
        this.router.navigate(['exercicio/erro']);
      }
      this.concluirInput = {
        usuHash: queryParams.usu_hash,
        exeHash: queryParams.exe_hash,
      };
    });
  }

  concluir() {
    this.concluindo = true;
    this.service.concluir(this.concluirInput).subscribe(
      response => {
        if (response.success) {
          this.concluindo = false;
        } else {
          this.concluindo = false;
        }
      },
      error => {
        this.concluindo = false;
      },
    );
  }
}
