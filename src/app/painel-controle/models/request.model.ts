export class Request {

	constructor(
        public xml=null,
        public nos=[],
        public arestas=[],
        public derivacao= new Derivacao(),
        public inicio= new Inicializacao(),  
        public ticar= new Ticagem(), 
        public fechar= new Fechamento(), 
 
     
        ) {}
}



class Derivacao{
    constructor(
        public lista=[],
        public folhas=[], // lista de identificadores dos nós que receberao a nova derivação
        public no=null, // id do nó a ser derivado
        public regra=null, // identificador da regra a ser aplicada
    ){}

}


class Inicializacao{
    constructor(
        public lista=[],  //lista para armazenar a ordem de posicionamento dos nós iniciais
        public opcoes=[],   //lista para armazenar as opçoes de inserção ainda disponiveis
        public completa=false, //informa sê a inialização está completa  ou não
        public no=null,
        public negacao=null, 
        ){}
}


class Ticagem{
    constructor(
        public lista=[],
        public no=null,
        public auto=false,
        ){}
}


class Fechamento{
    constructor(
        public lista=[],
        public no=null,
        public folha=null,
        public auto=false,
        ){}
}