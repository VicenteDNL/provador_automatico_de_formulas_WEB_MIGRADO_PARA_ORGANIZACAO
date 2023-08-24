import { Component, OnInit } from '@angular/core';
import { UsuarioInput, UsuarioResponse } from '../interface';
import { UsuariosService } from '../usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PainelControleComponent } from 'src/app/painel-controle/painel-controle.component';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
})
export class EditarUsuarioComponent implements OnInit {
  usuario: UsuarioInput = {
    id: null,
    nome: '',
    email: '',
    password: '',
    ativo: true,
  };
  requisitando = false;

  constructor(
    private service: UsuariosService,
    private router: Router,
    private route: ActivatedRoute,
    private painelCmp: PainelControleComponent,
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: any) => params.id),
        switchMap(id => {
          this.requisitando = true;
          return this.service.buscar(id);
        }),
      )
      .subscribe(
        response => this.carregarUsuario(response),
        error => {
          this.requisitando = false;
          this.painelCmp.errorMensagen =
            error.error.msg ?? 'Ocorreu um problema ao executar esta ação';
        },
      );
  }

  carregarUsuario(response: UsuarioResponse) {
    if (response.success) {
      this.usuario.id = response.data.id;
      this.usuario.nome = response.data.nome;
      this.usuario.email = response.data.email;
      this.usuario.password = '';
    } else {
      this.painelCmp.errorMensagen = response.msg;
    }
    this.requisitando = false;
  }

  editarUsuario() {
    this.requisitando = true;
    this.service.editar(this.usuario).subscribe(
      response => {
        this.requisitando = false;
        if (response.success === true) {
          this.router.navigate(['/painel/usuarios']);
        } else {
          this.painelCmp.errorMensagen = response.msg;
        }
      },
      error => {
        this.painelCmp.errorMensagen =
          error.error.msg ?? 'Ocorreu um problema ao executar esta ação';
      },
    );
  }
}
