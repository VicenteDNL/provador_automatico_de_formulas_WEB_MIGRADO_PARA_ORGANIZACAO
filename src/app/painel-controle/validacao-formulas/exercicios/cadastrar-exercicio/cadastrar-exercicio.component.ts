import { Component, OnInit, TemplateRef } from '@angular/core';
import { faArrowAltCircleLeft, faTimes, faQuestionCircle, faEye, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Exercicio } from 'src/app/painel-controle/models/exercicio.model';
import { ExerciciosService } from '../exercicios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Recompensa } from 'src/app/painel-controle/models/recompensa.model';
import { Niveis } from 'src/app/painel-controle/models/niveis.model';
import { Formula } from 'src/app/painel-controle/models/formula.model';
import { TabelaExerciciosComponent } from '../tabela-exercicios/tabela-exercicios.component';
import { map, switchMap } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PainelControleComponent } from 'src/app/painel-controle/painel-controle.component';



declare var gramLogic: any;

@Component({
  selector: 'app-cadastrar-exercicio',
  templateUrl: './cadastrar-exercicio.component.html',
  styleUrls: ['./cadastrar-exercicio.component.css']
})
export class CadastrarExercicioComponent implements OnInit {

  iconVoltar= faArrowAltCircleLeft;
  iconFechar=faTimes;
  duvida= faQuestionCircle;
  visual=faEye;
  error=faExclamationTriangle;
  listaRecompensas=[]
  loadingRecompensa=false
  exercicio:Exercicio
  requisitando=false;

  tempoDesbilita=false;
  limitarerros=false;
  modalRef:BsModalRef;
  formulaInvalida=false
  visualizararvore=false
  mensagemError;
  listaImpressaoNo=[]
  listaImpressaoAresta=[]



  listaPassoInicial=[]
  listaDerivacoes=[]
  listaTicagem=[]
  listaFechamento=[]
 
  constructor(
              private modalService: BsModalService,
              private service: ExerciciosService,
              private router:Router,
              private route: ActivatedRoute,   
              private painetlCmp:PainelControleComponent
  ) {
   
   }


  ngOnInit(): void {
    this.exercicio = new Exercicio(null,new Recompensa() ,null,new Formula());
    this.route.params.subscribe(params => {
      this.exercicio.id_nivel = new Niveis(params['idNivel']);
   })

    
    this.loadingRecompensa=true
    this.service.todasRecompensas().subscribe(
      recompensas=> this.carregacomboRecompensas(recompensas),
      error=>this.errorBuscaRecompensas()
    );

  }


  cadastrarExercicio(){
    this.exercicio.id_formula.lista_derivacoes=this.listaDerivacoes
    this.exercicio.id_formula.lista_fechamento=this.listaFechamento
    this.exercicio.id_formula.lista_ticagem=this.listaTicagem
    this.exercicio.id_formula.lista_passos=this.listaPassoInicial


   
    this.requisitando=true
    this.service.cadastrarExercicio(this.exercicio).subscribe(
      response=>this.sucessoCadastro(response),
      error=>this.errorCadastro(error.message)
    );
    
  }

  sucessoCadastro(response){
    this.requisitando=false
    if(response['success']=true){
      this.router.navigate(['/painel/modulo1/exercicios/'+this.exercicio.id_nivel.id])
    }
    else
      this.painetlCmp.errorMensagen=response['msg']

  }
  errorCadastro(response){
    this.requisitando=false
    this.painetlCmp.errorMensagen=response

  }


  carregacomboRecompensas(recompensas){
    this.listaRecompensas = recompensas
    this.loadingRecompensa =false;
  }

  errorBuscaRecompensas(){
    this.listaRecompensas=['ERROR AO CARREGAR!']
  }

  tempoDesbilitar(){
      this.exercicio.tempo=null;
  
  }


  limitarerrosDesbilitar(){
      this.exercicio.qndt_erros=null;
  
  }


  infoGramatica(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template,Object.assign({}, { class: 'gray modal-lg' }));
  }
  errorGramatica(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template,Object.assign({}, { class: 'modal-sm' }));
  }
  

  fechar(){
    this.modalRef.hide();
  }


  validarFormula(){
    if(this.exercicio.id_formula.formula==null || this.exercicio.id_formula.formula=='' || this.exercicio.id_formula.formula==undefined){
      this.exercicio.id_formula.xml='';
      this.formulaInvalida=false
      this.visualizararvore=true
    }
    else{
      var validacao = gramLogic.validar(this.exercicio.id_formula.formula,false)

      console.log(validacao)
      if(validacao['sucesso']==true){
      this.formulaInvalida=false
      this.visualizararvore=true
      this.exercicio.id_formula.xml=validacao['xml'];
      }
      else{
        this.formulaInvalida=true
        this.visualizararvore=false
        this.mensagemError=validacao['mensagem'];
        
      }

    }

  }

  abrirArvore(template: TemplateRef<any>){
      if(this.exercicio.id_formula.xml!=''){
        this.service.arvoreOtimizada(this.exercicio.id_formula.xml).subscribe(
          response=> {
            this.listaImpressaoNo=response['data']['impresao']['nos'];
            this.listaImpressaoAresta=response['data']['impresao']['arestas'];
            this.modalRef = this.modalService.show(template,Object.assign({}, { class: 'modal-lg', }))
          },
          error=>{
            console.log(error)
          }
        );

        
      }
   
   
  }

  iniciarZerada(){
    
  this.listaPassoInicial=[]
  this.listaDerivacoes=[]
  this.listaTicagem=[]
  this.listaFechamento=[]
  this.exercicio.id_formula.inicio_personalizado=false;
  }

  modalPersonalizarInicio(template){
  this.exercicio.id_formula.iniciar_zerada=false;
    if(this.exercicio.id_formula.inicio_personalizado!=true){
      var config = {
        backdrop: true,
        ignoreBackdropClick: true,
         class: 'modal-xl',
         keyboard: false
      };
    
      this.modalRef = this.modalService.show(template, config)
    }
   
  }

  voltar(){
    this.router.navigate(['/painel/modulo1/exercicios/'+this.exercicio.id_nivel.id])
  }
}
