import { Component, OnInit, Input } from '@angular/core';
import { ExerciciosService } from '../../exercicios.service';
import { faTimes, faTree, faPlus, faInfoCircle, faTrashAlt, faWindowMinimize, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { CadastrarExercicioComponent } from '../cadastrar-exercicio.component';
import { Mensagem } from 'src/app/painel-controle/models/mensagem.model';
@Component({
  selector: 'app-personalizar-arvore',
  templateUrl: './personalizar-arvore.component.html',
  styleUrls: ['./personalizar-arvore.component.css']
})
export class PersonalizarArvoreComponent implements OnInit {

  @Input() xmlFormula;
  @Input()refModal;

  // ICONES DO Font Awesome
  iconFechar=faTimes;
  arvore=faTree;
  add=faPlus;
  info=faInfoCircle
  limpar=faTrashAlt
  minimizar=faMinusSquare
  // --------

  // Variaveis do CONSOLE
  listaconsole:Array<Mensagem>=[];
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
  noDerivacao=null;
  regra=null;
  // --------
 
  // outras variaveis de controle
  errorMensagen=null;
  strFormula
  desmarcadonoInsercao=false;
   // --------
  
  constructor(
          private service: ExerciciosService,
          private cadastrarCmp: CadastrarExercicioComponent
        ) { }

  ngOnInit(): void {
    this.carregamentoConsole=true
    this.exibirNoConsole("Buscando Fórmula",'info');
    this.service.buscarInicioArvore(this.xmlFormula).subscribe(
      response=>{
        this.sucessoCarregar(response);
      },
      error=>{
        this.errorCarregar(error.message)
      }
    );
  }


  // ------------ Metodos da etapa de Inicialização ----------- Está etapa é responsavel por inserir todos as premissas e conclução na árvore de derivação


  // Adiciona a premissa ou conclusão na arvore sem realizar a negação
  adicionarPremCon(){
    this.carregamentoConsole=true
    this.exibirNoConsole("Inserindo o argumento  '"+this.argSelecionado['str']+"'",'info');
    this.service.adicionarNo(this.xmlFormula,this.cadastrarCmp.listaPassoInicial,this.argSelecionado['id']).subscribe(
      response=>this.sucessoInserirNo(response),
      error=>{this.errorCarregar(error.message)}
    )
  }
   
  // Adiciona a premissa ou conclusão na arvore realizando a negação
  adicionarPremConNeg(){
    this.carregamentoConsole=true
    this.exibirNoConsole("Inserindo o argumento  '"+this.argSelecionado['str']+"'",'info');
    this.service.adicionarNoNegando(this.xmlFormula,this.cadastrarCmp.listaPassoInicial,this.argSelecionado['id']).subscribe(
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
      this.cadastrarCmp.listaPassoInicial=response['data']['lista']
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
      'xml':this.xmlFormula,
      'listaInicial':this.cadastrarCmp.listaPassoInicial,
      'listaDerivacoes': this.cadastrarCmp.listaDerivacoes,
      'listaTicagem':this.cadastrarCmp.listaTicagem,
      'listaFechamento':this.cadastrarCmp.listaFechamento,
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
      this.cadastrarCmp.listaTicagem.push(response['data']['noticado'])
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
      'xml':this.xmlFormula,
      'listaInicial':this.cadastrarCmp.listaPassoInicial,
      'listaDerivacoes': this.cadastrarCmp.listaDerivacoes,
      'listaTicagem':this.cadastrarCmp.listaTicagem,
      'listaFechamento':this.cadastrarCmp.listaFechamento,
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

      this.cadastrarCmp.listaFechamento.push({
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
      'xml':this.xmlFormula,
      'listaInicial':this.cadastrarCmp.listaPassoInicial,
      'listaDerivacoes': this.cadastrarCmp.listaDerivacoes,
      'listaTicagem':this.cadastrarCmp.listaTicagem,
      'listaFechamento':this.cadastrarCmp.listaFechamento,
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
      this.cadastrarCmp.listaDerivacoes=response['data']['listaDerivacoes']
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
    this.listaconsole.push(new Mensagem(msg,tipo))
  }
  limparConsole(){
    this.listaconsole=[]
  }
  fecharAvisoError(){
    this.errorMensagen=null
  }
  sucessoCarregar(response){
    this.carregamentoConsole=false
    if(response['success']==true){

      this.listaPremissaConclusao=response['data']['listapcoes']
      this.strFormula=response['data']['strformula']
      this.exibirNoConsole("Fórmula buscada do sucesso",'sucesso');

    }
    else{
      this.exibirNoConsole(response['msg'],'error');
    }

  }

  fechar(){
    this.cadastrarCmp.listaFechamento=[];
    this.cadastrarCmp.listaTicagem=[];
    this.cadastrarCmp.listaDerivacoes=[];
    this.cadastrarCmp.listaPassoInicial=[];
    this.cadastrarCmp.exercicio.id_formula.inicio_personalizado=false;
    this.cadastrarCmp.exercicio.id_formula.iniciar_zerada=true;
    this.refModal.hide()
  }

  salvar(){
    this.cadastrarCmp.exercicio.id_formula.inicio_personalizado=true;
    this.cadastrarCmp.exercicio.id_formula.iniciar_zerada=false;
    this.refModal.hide()
  }

}
