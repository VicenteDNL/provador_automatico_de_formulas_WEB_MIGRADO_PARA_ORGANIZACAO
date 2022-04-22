export  type Request ={

     exercicio: number;
     xml: string;
     nos: any[];
     arestas: any[];
     finalizada: boolean;
     // eslint-disable-next-line @typescript-eslint/naming-convention
     usu_hash: string;
     // eslint-disable-next-line @typescript-eslint/naming-convention
     exe_hash: string;

     resposta?: string;
     derivacao: Derivacao;
     inicio: Inicializacao;
     ticar: Ticagem;
     fechar: Fechamento;
     regras: any[];
     strformula: string;

};

export type Derivacao ={

     lista: any[];
     folhas: any[]; // lista de identificadores dos nós que receberao a nova derivação
     no: {
      str: string;
     }; // id do nó a ser derivado
     regra: string; // identificador da regra a ser aplicada

};

export type Inicializacao ={

     lista: any[]; //lista para armazenar a ordem de posicionamento dos nós iniciais
     opcoes: any[]; //lista para armazenar as opçoes de inserção ainda disponiveis
     completa: boolean; //informa sê a inialização está completa  ou não
     no: {
       str: string;

     };
     negacao: boolean;

};

export type Ticagem ={
   lista: any[];  no: {
     str: string;
   };  auto: number;
};

export type Fechamento ={

     lista: any[];
     no: {
      linha: number;
     };
     folha: {
      str: string;
     };
     auto: number;

};
