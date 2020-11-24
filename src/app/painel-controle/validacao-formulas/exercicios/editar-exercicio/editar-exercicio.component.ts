import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowAltCircleLeft, faEye } from '@fortawesome/free-solid-svg-icons';
import { map, switchMap } from 'rxjs/operators';
import { Exercicio } from 'src/app/painel-controle/models/exercicio.model';
import { Formula } from 'src/app/painel-controle/models/formula.model';
import { Niveis } from 'src/app/painel-controle/models/niveis.model';
import { Recompensa } from 'src/app/painel-controle/models/recompensa.model';
import { ExerciciosService } from '../exercicios.service';

@Component({
  selector: 'app-editar-exercicio',
  templateUrl: './editar-exercicio.component.html',
  styleUrls: ['./editar-exercicio.component.css']
})
export class EditarExercicioComponent implements OnInit {
  exercicio:Exercicio
  requisitando
  spineer
  visual=faEye;
  iconVoltar= faArrowAltCircleLeft;
  erroSalvar=null;
  constructor(
    private route: ActivatedRoute, 
    private service: ExerciciosService,
    private router:Router,
  ) { }

  ngOnInit(): void {

    this.route.params.pipe(
      map((params:any)=>params['id']),
      switchMap(id=> 
        {
        this.requisitando = true;
        this.spineer=true;
        return this.service.buscarPorId(id)
        })
      ).subscribe(
        response=> this.carregarExercicio(response),
        error => this.errorExercicio(error)
      );
  }

  carregarExercicio(response){
    if(response['success']){
      this.exercicio = response['data']
    }
    this.requisitando = false;
    this.spineer=false;


  }

  errorExercicio(error){

  }

  abrirArvore(arq){

  }

  editarExercicio(){
    this.requisitando = true;
    this.spineer=true;
      var resposta ={
        'nome': this.exercicio.nome,
        'enunciado': this.exercicio.enunciado,
        'descricao': this.exercicio.descricao,
        'ativo': this.exercicio.ativo
      }

      this.service.editar(this.exercicio.id,resposta).subscribe(
        response=> this.sucessoEdicao(response),
        error=>this.errorNivel(error)
      );
  }

  sucessoEdicao(response){
    this.requisitando=false
    this.spineer=false
    this.router.navigate(['/painel/modulo1/exercicios/'+this.exercicio.id_nivel])

  }

  errorNivel(response){
    this.spineer=false
    this.erroSalvar=response.message

  }
  
  voltar(){
    this.router.navigate(['/painel/modulo1/exercicios/'+this.exercicio.id_nivel])
  }

}
