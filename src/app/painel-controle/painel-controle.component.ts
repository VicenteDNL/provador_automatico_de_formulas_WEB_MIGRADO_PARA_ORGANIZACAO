import { Component, OnInit, TemplateRef } from '@angular/core';
import { faCog, faUser, faTimes} from  '@fortawesome/free-solid-svg-icons' ;
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { LoginService } from '../auth/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-painel-controle',
  templateUrl: './painel-controle.component.html',
  styleUrls: ['./painel-controle.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class PainelControleComponent implements OnInit {
  config =faCog;
  user = faUser;
  iconFechar=faTimes;

  errorMensagen=null

  modulos ={
    'modulo1':[
              {'item':'Níveis','url':'painel/modulo1/niveis','id':'item-nav1', 'ativo':true},
              {'item':'Exercícios','url':'painel/modulo1/exercicios/pesquisar','id':'item-nav2','ativo':false},
              {'item':'Respostas','url':'painel/modulo1/respostas','id':'item-nav3','ativo':false}
            ],
    'modulo2':[
              {'item':'Níveis','url':'painel/modulo2/niveis','id':'item-nav1','ativo':true},
              {'item':'Exercícios','url':'painel/modulo2/exercicios','id':'item-nav2','ativo':false},
              {'item':'Perguntas','url':'painel/modulo2/perguntas','id':'item-nav3','ativo':false},
              {'item':'Respostas','url':'painel/modulo2/respostas','id':'item-nav4','ativo':false}
            ],
    'modulo3':[]
  };

  emailUser=null;

  itensNaveracao=null

  // Config Modal logout
  modalRef: BsModalRef;
  message: string;
  // ---

  saindo=false;
  constructor(
              private modalService: BsModalService,
              private login$: LoginService,
              private router: Router,
              private auth$: AuthService,
              ) { }

  ngOnInit(): void {
    this.itensNaveracao=this.modulos.modulo1;
    this.emailUser= this.getEmailUser();
  }
  
  getEmailUser() {
    let data = localStorage.getItem('auth-data');
    if (data) {
      data = JSON.parse(data);
      return data['email'];
    }
  }
  


  logout(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirmar(): void {
    this.saindo=true;
    var  sair = this.login$.logout();
    if(sair!=false){
      sair.subscribe(
        response=> this.sucessoLogout(),
        error => this.erroLogout()
      )
    }
    else{
      this.erroLogout();
    } 
  }
 
  cancelar(): void {
    this.modalRef.hide();
  }

  sucessoLogout(){
    this.modalRef.hide();
    this.router.navigate(['login']);
    this.auth$.clean();
    this.saindo=false;

  }
  erroLogout(){
    this.modalRef.hide();
    this.router.navigate(['login']);
    this.saindo=false;
  }


  navegarPara(id, url){
    // Calculo para movimentação da barra do menu de navegação
    var cordeNav =  document.getElementById('barra-navegacao').getBoundingClientRect().left, 
        item =document.getElementById(id),
        barra =  document.getElementById('barra-ativa-interna'),
        tamanhoItem = item.getBoundingClientRect().left,
        centralizar = ((tamanhoItem - cordeNav) + (item.getBoundingClientRect().width/2)) - (barra.getBoundingClientRect().width/2);
    document.getElementById('barra-ativa-interna').style.transform = "translateX("+centralizar+"px)";
    // -----------------------------------

    //Remoção da Classe "navegacao-ativa" de todos os itens da navegação
    var lista = document.getElementsByClassName("item-navegacao")
    for (var i = 0; i < lista.length; i++){     
       var arr = lista[i].className.split(" ");
      if (arr.indexOf("navegacao-ativa") != -1) {
        arr.splice(arr.indexOf("navegacao-ativa"), 1);
        var classes ='';
        for (var e = 0; e < arr.length; e++){   
            classes = classes+" "+arr[e]
        }
        lista[i].className=classes
      }
    }
    // -----------------------------------

    // Adição da Classe "navegacao-ativa" no item de navegação clicado
    item.classList.add("navegacao-ativa")
     // -----------------------------------
     this.router.navigate([url]);
  }


  animacaoIniciar(){
  document.getElementById('barra-ativa-interna').style.transform = "translateX(50px)";


    // -----------------------------------
  }


  irpara(item){

    var itens =document.getElementsByClassName("li-item")
    for (var i = 0; i < itens.length; i++){  
      var arr = itens[i].className.split(" ");
      if (arr.indexOf("d-none") != -1) {
        arr.splice(arr.indexOf("d-none"), 1);
        var classes ='';
        for (var e = 0; e < arr.length; e++){   
            classes = classes+" "+arr[e]
        }
        itens[i].className=classes
      }
    }

    switch (item) {
      case 1:
        document.getElementById('botao-dropdown').innerHTML="Validação de Fórmulas";
        document.getElementById('li-item-1').classList.add("d-none");
        this.router.navigate(['painel/modulo1/inicio']);
        this.itensNaveracao=this.modulos.modulo1;
  
        document.getElementById('barra-ativa-interna').style.transform = "translateX(0px)";
        
        break;
      case 2:
        document.getElementById('botao-dropdown').innerHTML="Estudo dos Conceitos";
        document.getElementById('li-item-2').classList.add("d-none");
        this.router.navigate(['painel/modulo2']);
        this.itensNaveracao=this.modulos.modulo2;
        document.getElementById('barra-ativa-interna').style.transform = "translateX(0px)";
        break;
      case 3:
        document.getElementById('botao-dropdown').innerHTML="Criação livre de Fórmulas";
        document.getElementById('li-item-3').classList.add("d-none");
        this.router.navigate(['painel/modulo3']);
        this.itensNaveracao=this.modulos.modulo3;
        document.getElementById('barra-ativa-interna').style.transform = "translateX(0px)";
        break;

      default:
        document.getElementById('botao-dropdown').innerHTML="Validação de Fórmulas";
        document.getElementById('li-item-1').classList.add("d-none"); 
        this.router.navigate(['painel/modulo1']);
        this.itensNaveracao=this.modulos.modulo1;

    
    }

  }


  fecharAvisoError(){
    this.errorMensagen=null
  }

}
