import { Component, OnInit } from '@angular/core';
import { faArrowAltCircleLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Niveis } from 'src/app/painel-controle/models/niveis.model';
import { NiveisService } from '../niveis.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-editar-nivel',
  templateUrl: './editar-nivel.component.html',
  styleUrls: ['./editar-nivel.component.css']
})
export class EditarNivelComponent implements OnInit {
  iconVoltar= faArrowAltCircleLeft;
  iconFechar=faTimes;
  listaRecompensas=[]
  loadingRecompensa=false
  nivel:Niveis
  semRecompensa=true;
  requisitando=false;
  spineer=false
  erroSalvar=null;
  constructor(
              private service: NiveisService,
              private router:Router,
              private route:ActivatedRoute,
  ) { }


  ngOnInit(): void {

    this.nivel = new Niveis();
    this.loadingRecompensa=true
    this.requisitando = true;
    this.spineer=true;
    this.iniciarRequisicoes();


  }

  iniciarRequisicoes(){
    this.service.todasRecompensas().subscribe(
      recompensas=> {
        this.listaRecompensas = recompensas['data']; 
        this.buscaNivel(); 
      },
      error=>{
        this.errorNivel(error),
        this.listaRecompensas=[];
      }
    );
  }

  buscaNivel(){
    this.route.params.pipe(
      map((params:any)=>params['id']),
      switchMap(id=> 
        {
        this.requisitando = true;
        this.spineer=true;
        return this.service.buscarPorId(id)
        })
      ).subscribe(
        response=> this.carregarNivel(response),
        error => this.errorNivel(error)
      );
  }


  carregarNivel(response){
    if(response['success']==true){
      this.requisitando = false;

      this.nivel.id=response['data'].id;
      this.nivel.nome=response['data'].nome;
      this.nivel.descricao=response['data'].descricao;
      this.nivel.ativo=response['data'].ativo;

      if(response['data'].id_recompensa==null){
        this.semRecompensa=true;
      }else{
        this.semRecompensa=false;
        this.nivel.id_recompensa=response['data'].id_recompensa;
      }
    }
    else{
      this.erroSalvar=response['msg']
    }
    this.spineer=false
    this.loadingRecompensa =false; 
  }


  editarNivel(){
    this.requisitando=true
    this.spineer=true

    this.service.editar(this.nivel).subscribe(
      response=> this.sucessoEdicao(response),
      error=>this.errorNivel(error)
    );
  }

  sucessoEdicao(response){
    this.requisitando=false
    this.spineer=false
    this.router.navigate(['/painel/modulo1/niveis'])

  }

  errorNivel(response){
    this.spineer=false
    this.erroSalvar=response.message

  }

  recompensaDesbilita(){
    if(this.semRecompensa==false){
      this.nivel.id_recompensa=undefined;
    }
  }

  fecharAvisoError(){
    this.erroSalvar=null;
    this.requisitando=false
  }




}