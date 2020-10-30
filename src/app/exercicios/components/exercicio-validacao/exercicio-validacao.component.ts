import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faWindowClose, faCheckSquare, faTrashAlt, faCaretSquareUp, faCaretSquareDown , faHeart, faPlus, faInfinity, faClock} from '@fortawesome/free-solid-svg-icons';
import { MensagemConsole } from '../../models/mensagemConsole';
import { Request } from '../../models/request.model';
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
	clock = faClock
	min =faCaretSquareUp
	max =faCaretSquareDown
	heart=faHeart
	plus=faPlus
	infinity=faInfinity;

	// Variaveis do CONSOLE
	msgConsole= new MensagemConsole();
	carregamentoConsole=false

	request:Request = new Request();

	// Variaveis da etapa de INICIALIZACAO
	argSelecionado;

	// Variaveis para controlar a ativação dos botoes
	ativosBtnFecharRamo=false;
	ativosBtnTicarNo=false;
	ativosCheckDerivacao=false;

	// outras variaveis de controle
	desmarcadonoInsercao=false;

	// controle tempo
	minutos_restante=0
	segundos_restante=0
	acabou_restante=false
	interval;

	vida=null;
	enunciado=null;


	constructor(
		private service: ValidacaoService,
		private route: ActivatedRoute,
	) { }

  	ngOnInit(): void {
    
		this.route.queryParams.subscribe(
			params => {
			this.request.usu_hash =params['usu_hash'];
			this.request.exe_hash =params['exe_hash'];
			this.buscarExercicio(params);
		})    
  	}

  	buscarExercicio(hash){
		this.route.params.subscribe(params => {
			this.request.exercicio=params['id'];
			this.service.buscarExercicios(this.request.exercicio,hash)
			.subscribe(
				response=>{
					if(response['success']){     
						this.preparaExercicio(response['data'] )
						this.vida= response['data']['tentativa_restante']
					}else{
						// redirecionar pagina de erro
					}
			
				},
				error =>{} // redirecionar pagina de erro
			)
		})
  	}

	preparaExercicio(data){
		var exercicio  = data['exercicio'], 
			formula    = data['formula'], 
			listapcoes = data['listapcoes'],
			impresao   = data['impresao']
    	this.enunciado = exercicio.enunciado;

    	// Cria o controle de tempo restante
    	this.relogioTempoRestante(exercicio.tempo)

		// Verificar ticagem e fechamento automatico
		this.request.ticar.auto=formula.ticar_automaticamente
		this.request.fechar.auto=formula.fechar_automaticamente
		// ------

		// Verifica sê o inicio da fórmula é personalizado
		if(formula.iniciar_zerada==true && formula.inicio_personalizado==false ){
			this.request.inicio.opcoes=listapcoes
			this.exibirNoConsole("Exercício Inicializado",'sucesso');
		}else{
      		//verifica se a inicialização esta completa
      		if(formula.inicializacao_completa==true){   
        	this.request.inicio.completa=true
      		}
			this.request.inicio.lista=formula.lista_passos;
			this.request.derivacao.lista=formula.lista_derivacoes;
			this.request.ticar.lista=formula.lista_ticagem;
			this.request.fechar.lista=formula.lista_fechamento;  
    	}

    	this.request.nos=impresao['nos']
    	this.request.arestas=impresao['arestas']

	  } 
	  



	error(error){
		this.exibirNoConsole(error,'error');
	}

	sucesso(response, tipo=''){
		this.carregamentoConsole=false
		if(response['success']==true){
			var msg = ''
			switch(tipo){
				case 'fechar':
					msg = "Fechamento do nó  '"+this.request.fechar.folha['str']+"' realizado com sucesso"
					break
				case 'ticar':
					msg = "Nó '"+this.request.derivacao.no['str']+"' ticado com sucesso!"
					break
				case 'derivar':
					msg = "Derivação do nó '"+this.request.derivacao.no['str']+"' realizado com sucesso"
					break
				case 'adicionar':
					msg = "Argumento  '"+this.request.inicio.no['str']+"' inserido"
					break
				default:
					msg = ''

			 }

			this.exibirNoConsole(msg,'sucesso');	
			this.argSelecionado=null;
			this.ativosCheckDerivacao=false
			this.ativosBtnFecharRamo=false;
			this.ativosBtnTicarNo=false;
			this.request = response['data']
		}
		else{
			this.exibirNoConsole(response['msg'],'error');
			this.vida=response['data']['tentativa_restante']
		}
	}

	/**
	 * ----------- Metodos da etapa de Inicialização -----------
	 * 
	 * Descrição :
	 * 		 Os métodos de 1 a 2 são responsavel pelo controle
	 * 		 de inserção de todas as premissas e conclução na árvore de 
	 *       derivação
	 * 
	 */



	/**
	 * ----------- Método 01 -----------
	 * Descrição : Pega o valor do check box selecionado e adiciona a variavel
	 */
	  selecionado(id){
		this.request.inicio.no=this.request.inicio.opcoes[id]
	  }

	  
	 /**
	 * ----------- Método 02 -----------
	 * Descrição : adiciona a premissa ou conclusão na arvore
	 */
	adicionaNo(negar){
		this.request.inicio.negacao = negar==1 ? true :false;
		this.carregamentoConsole=true
		this.exibirNoConsole("Inserindo o argumento  '"+this.request.inicio.no['str']+"'",'info');
		this.service.adicionarNo(this.request).subscribe(
			response=>this.sucesso(response,'adicionar'),
			error=>this.error(error.message)
		)
	}

	/**
	 * ----------- Metodos da etapa de Derivavao  -----------
	 * 
	 * Descrição :
	 * 		 Os métodos de 3 a 6 são responsavel pelo controle
	 * 		 de derivação dos nós da 
	 * 
	 */


	 /**
	 * ----------- Método 03 -----------
	 * Descrição : Adiciona a regra escolhida
	 */
	regra(regra){
		if(this.request.derivacao.no!=null && this.request.derivacao.folhas!=[]){
			this.request.derivacao.regra=regra
		}
	}

	/**
	 * ----------- Método 04 -----------
	 * Descrição : Tica o nó de interesse
	 */
	ticar(){
		this.carregamentoConsole=true
		this.exibirNoConsole("Requisitando ticagem do nó  '"+this.request.derivacao.no['str']+"'",'info');
		this.service.ticarNo(this.request).subscribe(
			response=>this.sucesso(response, 'ticar'),
			error=>this.error(error.message)
		)
	}

  	/**
	 * ----------- Método 05 -----------
	 * Descrição : Fechar o nó de interesse
	 */
  	fechar(){
		this.carregamentoConsole=true
		this.exibirNoConsole("Requisitando fechamento do nó  '"+this.request.fechar.folha['str']+"', contradição na linha:"+this.request.fechar.no['linha']+"",'info');
		this.service.fecharRamo(this.request).subscribe(
			response=>this.sucesso(response,'fechar'),
			error=>this.error(error.message),
		)
  	}

	/**
	 * ----------- Método 06 -----------
	 * Descrição : Realiza a derivação da arvore
	 */
	derivar(){
		var listaIds=[],
			nomes=''

		this.request.derivacao.folhas.forEach(function(item){
				listaIds.push(item.idNo)
				nomes=nomes+ "[ "+item.str+", linha: "+item.linha+" ], "
			});

		this.carregamentoConsole=true
		this.exibirNoConsole("Requisitando derivação do nó '"+this.request.derivacao.no['str']+"' para inserção no no(s): "+nomes ,'info');
		this.service.derivar(this.request).subscribe(
			response=>this.sucesso(response, 'derivar'),
			error=>this.error(error.message),
		)
	}

	/**
	 * ----------- Metodos para controlar a selecção dos nós -----------
	 * 
	 * Descrição :
	 * 		 Os métodos de 7 a 9 são responsavel pelo controle
	 * 		 controlar o evento de selecção dos nos da arvore, e
	 * 		 aplicar os estilos para os nós selecionados
	 * 
	 */

 
	/**
	 * ----------- Método 07 -----------
	 * Descrição : Metodo aplicado para alterar cor do nó com o evento de hover-in do mouse
	 */
	alterarcor(index){
		this.request.nos[index].fill='url(#grad2)'
	}

	/**
	 * ----------- Método 08 -----------
	 * Descrição : Metodo aplicado para voltar a cor original do nó com o evento de hover-out do mouse
	 */
	voltarcor(index){
		this.request.nos[index].fill='url(#grad1)'
	}


   	/**
	 * ----------- Método 09 -----------
	 * Descrição : Metodo aplicado para adicioanar os nós selecionados na arvore
	 */

  	selecionarNo(index){
		if(this.request.inicio.completa==true){

			if(this.request.derivacao.folhas.length==0 && this.request.derivacao.no==null  && this.desmarcadonoInsercao==false){
			this.request.nos[index].strokeColor="#b91d1d"
			this.request.nos[index].strokeWidth="3"
			this.request.derivacao.no=this.request.nos[index]
			
			this.ativosCheckDerivacao=false
			this.ativosBtnFecharRamo=false;
			this.ativosBtnTicarNo=true;

			}
			else if( this.request.derivacao.folhas.length==0 && this.request.derivacao.no==this.request.nos[index] && this.desmarcadonoInsercao==false ){
			this.request.nos[index].strokeColor='url(#grad3)'
			this.request.nos[index].strokeWidth="3"
			this.request.derivacao.folhas.push(this.request.nos[index])
			
			this.ativosCheckDerivacao=true
			this.ativosBtnFecharRamo=false;
			this.ativosBtnTicarNo=false;
			}
			else if(this.request.derivacao.folhas.indexOf(this.request.nos[index])!=-1 && this.request.derivacao.no==this.request.nos[index] && this.desmarcadonoInsercao==false){
			this.request.nos[index].strokeColor="#b91d1d"
			this.request.nos[index].strokeWidth="3"
			this.request.derivacao.folhas.splice(this.request.derivacao.folhas.indexOf(this.request.nos[index]),1)
			this.desmarcadonoInsercao=true
			
			this.ativosCheckDerivacao=false
			this.ativosBtnFecharRamo=false;
			this.ativosBtnTicarNo=true;
			}
			else if( this.request.derivacao.folhas.length==0 && this.request.derivacao.no==this.request.nos[index] && this.desmarcadonoInsercao==true){
			this.request.nos[index].strokeColor="#C0C0C0"
			this.request.nos[index].strokeWidth="2"
			this.request.derivacao.no=null
			this.desmarcadonoInsercao=false

			this.ativosCheckDerivacao=false
			this.ativosBtnFecharRamo=false;
			this.ativosBtnTicarNo=false;
			}
			else if( this.request.derivacao.no!=this.request.nos[index]  && this.request.derivacao.folhas.indexOf(this.request.nos[index])==-1){
			this.request.nos[index].strokeColor="#FFFF00"
			this.request.nos[index].strokeWidth="3"
			this.request.derivacao.folhas.push(this.request.nos[index])

			this.ativosCheckDerivacao=true
			this.ativosBtnFecharRamo= this.request.derivacao.folhas.length==1?true:false 
			this.ativosBtnTicarNo=false;
			}
			else if(this.request.derivacao.folhas.indexOf(this.request.nos[index])!=-1){
			this.request.nos[index].strokeColor="#C0C0C0"
			this.request.nos[index].strokeWidth="2"
			this.request.derivacao.no.splice(this.request.derivacao.folhas.indexOf(this.request.nos[index]),1)

			this.ativosCheckDerivacao=this.request.derivacao.folhas.length>=1?true:false 
			this.ativosBtnFecharRamo= this.request.derivacao.folhas.length==1?true:false 
			this.ativosBtnTicarNo=this.request.derivacao.folhas.length==0?true:false;
			}
		}
  }




  exibirNoConsole(msg, tipo){
    this.msgConsole =new MensagemConsole(msg,tipo)
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

 



  tentarNovamente(){
    this.carregamentoConsole=true
    this.service.tentarNovamente(  this.request.exercicio,this.request.usu_hash).subscribe(
      response=>{this.recomecar()},
      error=>{this.carregamentoConsole=false}
    )
  }


  recomecar(){
    this.route.params.subscribe(params => {
		this.request.exercicio=params['id'];
		this.service.buscarExercicios(this.request.exercicio,this.request.usu_hash)
		.subscribe(
			response=>{
				if(response['success']){     
					this.preparaExercicio(response['data'] )
					this.vida= response['data']['tentativa_restante']
				}else{
					// redirecionar pagina de erro
				}
		
			},
			error =>{} // redirecionar pagina de erro
		)
          this.carregamentoConsole=false
          
        },
        error =>{this.carregamentoConsole=false} // redirecionar pagina de erro
      ) 
  }

 
  

}		