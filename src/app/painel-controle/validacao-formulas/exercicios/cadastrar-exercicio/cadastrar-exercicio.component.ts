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


// import { GramLogic } from '../../../../../../gramLogic/gramLogic';
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
  spineer=false
  erroSalvar=null;
  tempoDesbilita=false;
  modalRef:BsModalRef;
  formulaInvalida=false
  visualizararvore=false
  mensagemError;
 
  constructor(
              private modalService: BsModalService,
              private service: ExerciciosService,
              private router:Router,
              private route: ActivatedRoute,   
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


  cadastrarNivel(){
    console.log( this.exercicio)
    // this.requisitando=true
    // this.spineer=true

    // this.service.cadastrar(this.exercicio).subscribe(
    //   response=> this.sucessoCadastro(response),
    //   error=>this.errorCadastro(error)
    // );
  }

  sucessoCadastro(response){
    this.requisitando=false
    this.spineer=false
    this.router.navigate(['/painel/modulo1/exercicio'])

  }
  errorCadastro(response){
    this.spineer=false
    this.erroSalvar=response.message

  }


  carregacomboRecompensas(recompensas){
    this.listaRecompensas = recompensas
    this.loadingRecompensa =false;
  }

  errorBuscaRecompensas(){
    this.listaRecompensas=['ERROR AO CARREGAR!']
  }

  tempoDesbilitar(){

    if(this.tempoDesbilita==false){
      this.exercicio.tempo=undefined;
    }
  }

  fecharAvisoError(){
    this.erroSalvar=null;
    this.requisitando=false
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

}
