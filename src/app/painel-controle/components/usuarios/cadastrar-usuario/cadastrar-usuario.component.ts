import { Component, OnInit } from '@angular/core';
import { UsuarioInput, UsuarioResponse } from '../interface';
import { UsuariosService } from '../usuarios.service';
import { Router } from '@angular/router';
import { PainelControleComponent } from 'src/app/painel-controle/painel-controle.component';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css'],
})
export class CadastrarUsuarioComponent implements OnInit {
  usuario: UsuarioInput = {
    nome: '',
    email: '',
    password: '',
    ativo: true,
  };
  requisitando = false;

  constructor(
    private service: UsuariosService,
    private router: Router,
    private painelCmp: PainelControleComponent,
  ) {}

  ngOnInit(): void {}

  cadastrarUsuario() {
    this.requisitando = true;
    this.service.cadastrar(this.usuario).subscribe(
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
