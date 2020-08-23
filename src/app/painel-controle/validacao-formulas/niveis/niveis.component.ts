import { Component, OnInit, TemplateRef } from '@angular/core';
import {  faPlus, faTrash, faEdit, faStepForward, faStepBackward, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Niveis } from '../../models/niveis.model';
import { NiveisService } from './niveis.service';
import { map, delay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-niveis',
  templateUrl: './niveis.component.html',
  styleUrls: ['./niveis.component.css']
})
export class NiveisComponent implements OnInit {
  
  // ------ Icones Fortawesome --------
  iconDeletar = faTrash;
  iconEditar = faEdit;
  next = faStepForward;
  prev = faStepBackward;
  iconFechar=faTimes;
  // --------------

  lista_niveis$: Observable<Niveis[]> ;
  buscando=false;
  nextPage=null;
  prevPage=null;
  total=0;
  from=0;
  to=0
  errorMensagen=null;

  excluindo=false
  modalRef:BsModalRef;
  idNivelDeletar=null

  constructor(
              private modalService: BsModalService,
              private service:NiveisService,
              private router:Router,
              private route: ActivatedRoute,   

              ) { }

  ngOnInit(): void {
    this.carregarLista();
  }

  

  carregarLista(acao=null){
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

    this.lista_niveis$ = this.service.listar(page).pipe(map((response) => {
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
        this.buscando=false
        return data;
      } else {
        this.errorMensagem()
        return [];

      }
    }));
  }


  errorMensagem(){
    console.log('error Service')
  }

  abrirEdicao(id){
    console.log(id)
    this.router.navigate(['/painel/modulo1/niveis/editar', id])
  }


  deletar(template: TemplateRef<any>, id){
    this.idNivelDeletar=id;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirmarDelete(){
    this.excluindo=true;
    var  sair = this.service.deletar(this.idNivelDeletar).subscribe(
        response=> this.sucessoDelecao(),
        error => this.erroDelecao(error)
      )
  }

  cancelarDelete(){
    this.modalRef.hide();
  }


  sucessoDelecao(){
    this.carregarLista();
    this.modalRef.hide();
    this.excluindo=false;
    
  }
  
  erroDelecao(error){
    this.excluindo=false;
    this.errorMensagen=error.message
    this.modalRef.hide();

  }

  fecharAvisoError(){
    this.errorMensagen=null
  }
}
