import { Component, OnInit } from '@angular/core';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { UsuarioInput, UsuarioResponse } from '../interface';
import { UsuariosService } from '../usuarios.service';
import { Router } from '@angular/router';
import { PainelControleComponent } from 'src/app/painel-controle/painel-controle.component';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent implements OnInit {

  iconVoltar = faArrowAltCircleLeft;

  usuario: UsuarioInput = {
    nome:'',
    email:'',
    password:'',
    ativo:true
  };
  requisitando = false;
  spineer = false;

  constructor(
    private service: UsuariosService,
    private router: Router,
    private painelCmp: PainelControleComponent,
  ) {}

  ngOnInit(): void {
  }

  cadastrarUsuario() {
    this.requisitando = true;
    this.spineer = true;

    this.service.cadastrar(this.usuario).subscribe(
      response => this.sucessoCadastro(response),
      error => this.errorCadastro(error),
    );
  }

  sucessoCadastro(response: UsuarioResponse) {
    this.requisitando = false;
    this.spineer = false;
    if (response.success === true) {
      this.router.navigate(['/painel/usuarios']);
    } else {
      this.painelCmp.errorMensagen = response.msg;
    }
  }

  errorCadastro(response: any) {
    this.spineer = false;
    this.painelCmp.errorMensagen = response.error.msg ?? 'Ocorreu um problema ao executar esta ação';
  }
}
