import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { ExerciciosService } from '../exercicios.service';
import { faTrash, faEdit, faStepForward, faStepBackward, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Exercicio } from 'src/app/painel-controle/models/exercicio.model';
import { PainelControleComponent } from 'src/app/painel-controle/painel-controle.component';

@Component({
  selector: 'app-tabela-exercicios',
  templateUrl: './tabela-exercicios.component.html',
  styleUrls: ['./tabela-exercicios.component.css']
})
export class TabelaExerciciosComponent implements OnInit {

    
  // ------ Icones Fortawesome --------
  iconDeletar = faTrash;
  iconEditar = faEdit;
  next = faStepForward;
  prev = faStepBackward;
  iconFechar=faTimes;
  // --------------

  lista_exercicio=[] ;
  exibirTabela=false
  buscando=false;
  nextPage=null;
  prevPage=null;
  total=0;
  from=0;
  to=0
  errorMensagen=null;

  excluindo=false
  modalRef:BsModalRef;
  idExercicioDeletar=null;
  idNivel=null;

  constructor(
              private modalService: BsModalService,
              private service:ExerciciosService,
              private router:Router,
              private route: ActivatedRoute,
              private painelCpm: PainelControleComponent 

              ) { }

  ngOnInit(): void {
    this.carregarLista();
  }

  

  carregarLista(acao=null){
    this.exibirTabela=false
    this.buscando=true
    var page;
    switch (acao) {
      case 'next':
        page = this.nextPage
        break;
      case 'prev':
        page = this.prevPage
        break;
      case null:
        page = '1'
        break;
      default:
        page = '1'
        
    }


    this.route.params.subscribe(params => {
      this.idNivel=params['id'];
    
      this.service.buscarExerciciosPorNivel(this.idNivel,page).subscribe(
        response=>{
          if (response['success']==true) {

          // PreparandoPaginação
          var next =response['data']['next_page_url']; 
          this.nextPage = next ==null? 0 : next.substr(next.indexOf('=')+1,next.length)
          
          var prev = response['data']['prev_page_url']; 
          this.prevPage = prev ==null? 0 : prev.substr(prev.indexOf('=')+1,prev.length)

          this.total=response['data']['total'];
          this.from=response['data']['from'];
          this.to=response['data']['to']
          // ----------------------------------------------------


          var data =response['data']['data'];
          for (var cont in response['data']['data']){
            if(data[cont]['ativo']=='1'){
              data[cont]['ativo']='Ativo'
            }
            else{
              data[cont]['ativo']='Inativo'
            } 
          }
          this.exibirTabela=true
          this.buscando=false
          this.lista_exercicio =data;
          } else {
            this.errorMensagem(response['msg'])

          }
        },
        error => this.errorMensagem(error.message)
      )
    }
    )
  }


  errorMensagem(error){
    this.painelCpm.errorMensagen=error
  }

  abrirEdicao(id){
    this.router.navigate(['/painel/modulo1/exercicios/'+this.idNivel+'/editar/'+id])   
  }

  abrirCadastro(){
    this.router.navigate(['/painel/modulo1/exercicios/'+this.idNivel+'/cadastrar'])
  }


  deletar(template: TemplateRef<any>, id){
    this.idExercicioDeletar=id;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirmarDelete(){
    this.excluindo=true;
    this.service.deletar(this.idExercicioDeletar).subscribe(
        response=> this.sucessoDelecao(response),
        error => this.erroDelecao(error)
      )
  }

  cancelarDelete(){
    this.modalRef.hide();
  }


  sucessoDelecao(response){
    this.modalRef.hide();
    this.excluindo=false;
    if(response['success']){
      this.carregarLista();
    }
    else{
      this.errorMensagem(response['msg'])
    }
    
  }
  
  erroDelecao(error){
    this.excluindo=false;
    this.errorMensagem(error.message)
    this.modalRef.hide();

  }

  fecharAvisoError(){
    this.errorMensagen=null
  }

  // constructor(
  //             private service: ExerciciosService,
  //             private router:Router,
  //             private route:ActivatedRoute,
  // ) { }

  // ngOnInit(): void {
  //   this.buscarExercicios();
  // }


  // buscarExercicios(){
  //   

  // }

}
