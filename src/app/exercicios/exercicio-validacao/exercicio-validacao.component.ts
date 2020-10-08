import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faWindowClose, faCheckSquare, faTrashAlt, faCaretSquareUp, faCaretSquareDown , faHeart, faPlus, faInfinity} from '@fortawesome/free-solid-svg-icons';
import { MensagemConsole } from '../models/mensagemConsole';
import { ValidacaoService } from './validacao.service';
@Component({
  selector: 'app-exercicio-validacao',
  templateUrl: './exercicio-validacao.component.html',
  styleUrls: ['./exercicio-validacao.component.css']
})
export class ExercicioValidacaoComponent implements OnInit {


  close = faWindowClose;
  check = faCheckSquare
  limpar=faTrashAlt
  min =faCaretSquareUp
  max =faCaretSquareDown
  heart=faHeart
  plus=faPlus
  infinity=faInfinity;
 // Variaveis do CONSOLE
 listaconsole:Array<MensagemConsole>=[];
 isCollapsed = false;
 carregamentoConsole=false
 // --------

 // Variaveis da etapa de INICIALIZACAO
 argSelecionado;
 listaPremissaConclusao;
 inializacaoCompleta=false;
 // --------

 // Variaveis para geração do SVG DA ARVORE
 listaNos=[];
 listaAresta;
 // --------

 // Variaveis para controlar a ativação dos botoes
 ativosBtnFecharRamo=false;
 ativosBtnTicarNo=false;
 ativosCheckDerivacao=false;
 // --------

 // Variaveis para salvar os passos do usario
 noInsercao=[];
 listaPassoInicial=[];
 listaDerivacoes=[];
 listaTicagem=[];
 listaFechamento=[];

 noDerivacao=null;
 regra=null;
 // --------

// outras variaveis de controle
 xmlFormula=null;
 desmarcadonoInsercao=false;
 idExercicio=null;
  // --------

  // controle tempo
  minutos_restante=0
  segundos_restante=0
  acabou_restante=false
  interval;


  ticarAutomatico=false
  fecharAutomatico=false

  vida={'qnt': [], 'infinito':false, 'adicional':0, 'total':-1 }

  enunciado=null;
  constructor(
          private service: ValidacaoService,
          private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.buscarExercicio();
  }



  buscarExercicio(){
    this.route.params.subscribe(params => {
      this.idExercicio=params['id'];
      this.service.buscarExercicios(this.idExercicio).subscribe(
        response=>{
          if(response['success']){           
            this.preparaExercicio(response['data']['exercicio'] )
            this.preparaCamposDerivacao(response['data']['formula'],response['data']['listapcoes'])
            this.preparaArvore(response['data']['impresao'])
          }
          else{
            // redirecionar pagina de erro
          }
          
        },
        error =>{} // redirecionar pagina de erro
      )
    }
    )
  }


  preparaExercicio(exercicio){
    this.enunciado = exercicio.enunciado;

    // Prepara a quantidade de erros
    if(exercicio.qndt_erros==null){
      this.vida={'qnt': [1,2,3], 'infinito':true, 'adicional':0, 'total':-1 }
    }
    else if(exercicio.qndt_erros<=3){
      var qnt=[]
       switch(exercicio.qndt_erros){
        case 1:
          qnt=[1]
          break
        case 2:
          qnt=[1,2]
          break
        case 3:
          qnt=[1,2,3]
          break
        default:
          qnt=[1,2,3]
       }
        
      this.vida={'qnt': qnt, 'infinito':false, 'adicional':0 , 'total':exercicio.qndt_erros}
    }
    else{
      this.vida={'qnt': [1,2,3], 'infinito':false, 'adicional':exercicio.qndt_erros-3, 'total':-1 }
    }
    //---------------------------------

    // Cria o controle de tempo restante
    this.relogioTempoRestante(exercicio.tempo)
    //---------------------------------

  } 

  preparaCamposDerivacao(formula,listapcoes){

    // Verificar ticagem e fechamento automatico
    this.ticarAutomatico=formula.ticar_automaticamente
    this.fecharAutomatico=formula.fechar_automaticamente
    console.log(this.fecharAutomatico)
    // ------

    if(formula.iniciar_zerada==true && formula.inicio_personalizado==false ){
      this.listaPremissaConclusao=listapcoes
      this.exibirNoConsole("Fórmula buscada do sucesso",'sucesso');
    }
    else{

      if(formula.inicializacao_completa==true){ //verifica se a inicialização esta completa  
        this.inializacaoCompleta=true
      }
      this.listaPassoInicial=formula.lista_passos;
      this.listaDerivacoes=formula.lista_derivacoes;
      this.listaTicagem=formula.lista_ticagem;
      this.listaFechamento=formula.lista_fechamento;  
    }
 
  }

  preparaArvore(impresao){
    this.listaNos=impresao['nos']
    this.listaAresta=impresao['arestas']
    
  }


  // ------------ Metodos da etapa de Inicialização ----------- Está etapa é responsavel por inserir todos as premissas e conclução na árvore de derivação


  // Adiciona a premissa ou conclusão na arvore sem realizar a negação
  adicionarPremCon(){
    this.carregamentoConsole=true
    this.exibirNoConsole("Inserindo o argumento  '"+this.argSelecionado['str']+"'",'info');
    this.service.adicionarNo(this.xmlFormula,this.listaPassoInicial,this.argSelecionado['id'],this.idExercicio).subscribe(
      response=>this.sucessoInserirNo(response),
      error=>{this.errorCarregar(error.message)}
    )
  }
   
  // Adiciona a premissa ou conclusão na arvore realizando a negação
  adicionarPremConNeg(){
    this.carregamentoConsole=true
    this.exibirNoConsole("Inserindo o argumento  '"+this.argSelecionado['str']+"'",'info');
    this.service.adicionarNoNegando(this.xmlFormula,this.listaPassoInicial,this.argSelecionado['id'],this.idExercicio).subscribe(
      response=>this.sucessoInserirNo(response),
      error=>{this.errorCarregar(error.message)}
    )
  }

  // Pega o valor do check box selecionado e adiciona a variavel
  selecionado(id){
    this.argSelecionado=this.listaPremissaConclusao[id]
  }


  // Metodo verifica sê ocorreu sucesso ao inserir nó na arvore
  sucessoInserirNo(response){
    this.carregamentoConsole=false
    if(response['success']==true){
      this.listaNos=response['data']['impresao']['nos']
      this.listaAresta=response['data']['impresao']['arestas']
      this.listaPassoInicial=response['data']['lista']
      this.listaPremissaConclusao=response['data']['listasopcoes']
      this.exibirNoConsole("Argumento  '"+this.argSelecionado['str']+"' inserido",'sucesso');
      this.argSelecionado=null;
      if(response['data']['finalizado']==true){
        this.inializacaoCompleta=true
      }

      this.ativosCheckDerivacao=false
      this.ativosBtnFecharRamo=false;
      this.ativosBtnTicarNo=false;

    }
    else{
      this.exibirNoConsole(response['msg'],'error');
    }
  }

  // Metodo verifica sê ocorreu na requisição
  errorCarregar(error){
    this.exibirNoConsole(error,'error');
  }

// ------------------------------------------------------------------------------------------------




// ------------ Metodos da etapa de Derivavao ---------------------Está etapa é responsavel por derivar os nos da arvore conforme as regras 
  

  // Este metodo envia a requisição para informar a ticagem do nó
  marcarComoUtilizada(){
    var modelTicagem={
      'idExercicio':this.idExercicio,
      'listaInicial':this.listaPassoInicial,
      'listaDerivacoes': this.listaDerivacoes,
      'listaTicagem':this.listaTicagem,
      'listaFechamento':this.listaFechamento,
      'no':this.noDerivacao['idNo'],

    }
    this.carregamentoConsole=true
    this.exibirNoConsole("Requisitando ticagem do nó  '"+this.noDerivacao['str']+"'",'info');
    this.service.ticarNo(modelTicagem).subscribe(
      response=>this.sucessoMarcaUtili(response),
      error=>this.errorMarcaUtili(error.message)
    )
  }


  sucessoMarcaUtili(response){
    this.carregamentoConsole=false
    if(response['success']==true){
      this.listaNos=response['data']['impresao']['nos']
      this.listaAresta=response['data']['impresao']['arestas']
      this.listaTicagem.push(response['data']['noticado'])
      this.exibirNoConsole("Nó '"+this.noDerivacao['str']+"' ticado com sucesso!",'sucesso');
      this.noInsercao=[]
      this.noDerivacao=null
      this.regra=null

      this.ativosCheckDerivacao=false
      this.ativosBtnFecharRamo=false;
      this.ativosBtnTicarNo=false;
    }
    else{
      this.exibirNoConsole(response['msg'],'error');
    }
  }

  errorMarcaUtili(error){
    this.exibirNoConsole(error,'error');
  }


  // Este metodo envia a requisição para informar o fechamento do nó
  fecharRamo(){
    var modelFechamento={
      'idExercicio':this.idExercicio,
      'listaInicial':this.listaPassoInicial,
      'listaDerivacoes': this.listaDerivacoes,
      'listaTicagem':this.listaTicagem,
      'listaFechamento':this.listaFechamento,
      'noFolha':this.noDerivacao['idNo'],
      'noContradicao':this.noInsercao[0]['idNo'],

    }
    this.carregamentoConsole=true
    this.exibirNoConsole("Requisitando fechamento do nó  '"+this.noDerivacao['str']+"', contradição na linha:"+this.noInsercao[0]['linha']+"",'info');
    this.service.fecharRamo(modelFechamento).subscribe(
      response=>this.sucessoFecharRamo(response),
      error=>this.errorFecharRamo(error.message),
    )
  }

  sucessoFecharRamo(response){
    this.carregamentoConsole=false
    if(response['success']==true){
      this.listaNos=response['data']['impresao']['nos']
      this.listaAresta=response['data']['impresao']['arestas']

      this.exibirNoConsole("Fechamento do nó  '"+this.noDerivacao['str']+"' realizado com sucesso",'sucesso');

      this.listaFechamento.push({
        'nofechado': response['data']['nofechado'], 
        'noContradicao': response['data']['noContradicao']  
        })

      this.ativosCheckDerivacao=false
      this.ativosBtnFecharRamo=false;
      this.ativosBtnTicarNo=false;

      this.noInsercao=[]
      this.noDerivacao=null
      this.regra=null
    }
    else{
      this.exibirNoConsole(response['msg'],'error');
    }
  }

  errorFecharRamo(error){
    this.exibirNoConsole(error,'error');
  }


  derivarNo(){
    var listaIds=[]
    var nomes=''
    this.noInsercao.forEach(function(item){
      listaIds.push(item.idNo)
      nomes= "[ "+item.str+", linha: "+item.linha+" ] ,"
    })
    var modelDerivacao={
      'idExercicio':this.idExercicio,
      'listaInicial':this.listaPassoInicial,
      'listaDerivacoes': this.listaDerivacoes,
      'listaTicagem':this.listaTicagem,
      'listaFechamento':this.listaFechamento,
      'derivacao':this.noDerivacao['idNo'],
      'insercao':listaIds,
      'regra':this.regra
    }
    this.carregamentoConsole=true
    this.exibirNoConsole("Requisitando derivação do nó '"+this.noDerivacao['str']+"' para inserção no no(s): "+nomes ,'info');
    this.service.derivar(modelDerivacao).subscribe(
      response=>this.sucessoDerivar(response),
      error=>this.errorDerivar(error.message),
    )
 
  }


  sucessoDerivar(response){
    this.carregamentoConsole=false
    if(response['success']==true){
      this.listaNos=response['data']['impresao']['nos']
      this.listaAresta=response['data']['impresao']['arestas']
      this.listaDerivacoes=response['data']['listaDerivacoes']
      this.exibirNoConsole("Derivaçãod do nó '"+this.noDerivacao['str']+"' realizado com sucesso",'sucesso');
      this.noInsercao=[]
      this.noDerivacao=null
      this.regra=null
      
      this.ativosCheckDerivacao=false
      this.ativosBtnFecharRamo=false;
      this.ativosBtnTicarNo=false
    }else{
      this.exibirNoConsole(response['msg'],'error');
    }

  }

  errorDerivar(error){
    this.exibirNoConsole(error,'error');
  }

  // ------------------------------------------------------------------

  // ---------------------Metodos para controlar a selecção dos nós---------------------------------------------
 
  alterarcor(index){
    this.listaNos[index].fill='url(#grad2)'
  }

  voltarcor(index){
    this.listaNos[index].fill='url(#grad1)'
  }

  selecionarRegra(regra){
    if(this.noDerivacao!=null && this.noInsercao!=null){
      this.regra=regra
    }
   
  }

  selecionarNo(index){
 
    if(this.inializacaoCompleta==true){
        if(this.noInsercao.length==0 && this.noDerivacao==null  && this.desmarcadonoInsercao==false){
          this.listaNos[index].strokeColor="#b91d1d"
          this.listaNos[index].strokeWidth="3"
          this.noDerivacao=this.listaNos[index]
         
          this.ativosCheckDerivacao=false
          this.ativosBtnFecharRamo=false;
          this.ativosBtnTicarNo=true;

        }
        else if( this.noInsercao.length==0 && this.noDerivacao==this.listaNos[index] && this.desmarcadonoInsercao==false ){
          this.listaNos[index].strokeColor='url(#grad3)'
          this.listaNos[index].strokeWidth="3"
          this.noInsercao.push(this.listaNos[index])
          
          this.ativosCheckDerivacao=true
          this.ativosBtnFecharRamo=false;
          this.ativosBtnTicarNo=false;
        }
        else if(this.noInsercao.indexOf(this.listaNos[index])!=-1 && this.noDerivacao==this.listaNos[index] && this.desmarcadonoInsercao==false){
          this.listaNos[index].strokeColor="#b91d1d"
          this.listaNos[index].strokeWidth="3"
          this.noInsercao.splice(this.noInsercao.indexOf(this.listaNos[index]),1)
          this.desmarcadonoInsercao=true
          
          this.ativosCheckDerivacao=false
          this.ativosBtnFecharRamo=false;
          this.ativosBtnTicarNo=true;
        }
        else if( this.noInsercao.length==0 && this.noDerivacao==this.listaNos[index] && this.desmarcadonoInsercao==true){
          this.listaNos[index].strokeColor="#C0C0C0"
          this.listaNos[index].strokeWidth="2"
          this.noDerivacao=null
          this.desmarcadonoInsercao=false

          this.ativosCheckDerivacao=false
          this.ativosBtnFecharRamo=false;
          this.ativosBtnTicarNo=false;
        }
        else if( this.noDerivacao!=this.listaNos[index]  && this.noInsercao.indexOf(this.listaNos[index])==-1){
          this.listaNos[index].strokeColor="#FFFF00"
          this.listaNos[index].strokeWidth="3"
          this.noInsercao.push(this.listaNos[index])

          this.ativosCheckDerivacao=true
          this.ativosBtnFecharRamo= this.noInsercao.length==1?true:false 
          this.ativosBtnTicarNo=false;
        }
        else if(this.noInsercao.indexOf(this.listaNos[index])!=-1){
          this.listaNos[index].strokeColor="#C0C0C0"
          this.listaNos[index].strokeWidth="2"
          this.noInsercao.splice(this.noInsercao.indexOf(this.listaNos[index]),1)

          this.ativosCheckDerivacao=this.noInsercao.length>=1?true:false 
          this.ativosBtnFecharRamo= this.noInsercao.length==1?true:false 
          this.ativosBtnTicarNo=this.noInsercao.length==0?true:false;
        }
    }
  }
  // --------------------------------------------------------------


  exibirNoConsole(msg, tipo){
    this.listaconsole.push(new MensagemConsole(msg,tipo))
  }
  limparConsole(){
    this.listaconsole=[]
  }



  sucessoCarregar(response){
    this.carregamentoConsole=false
    if(response['success']==true){

      this.listaPremissaConclusao=response['data']['listapcoes']
      // this.strFormula=response['data']['strformula']
      this.exibirNoConsole("Fórmula buscada do sucesso",'sucesso');

    }
    else{
      this.exibirNoConsole(response['msg'],'error');
    }

  }


  relogioTempoRestante(tempo){
    this.minutos_restante = tempo
    if(this.minutos_restante!=null){
      this.interval = setInterval(() => {
        if(this.segundos_restante > 0) {
          this.segundos_restante--;
        } else {
          if(this.minutos_restante<=0){
            this.acabou_restante=true
          }else{
            this.segundos_restante = 60;
            this.minutos_restante--
          }
        }
      },1000)

    }




  }

  fechar(){

  }

  salvar(){

  }


  
}
