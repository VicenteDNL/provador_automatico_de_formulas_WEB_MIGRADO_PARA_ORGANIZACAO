var gramLogic = (function() {
    var ambiente ='dev'
    var hostdev='http://localhost:4200';
    return {
      validar: function(formula,prod=false) {

        if (formula.length == '') {
          return {
              sucesso:false,
              mensagem:'nenhuma fórmula foi inserida',
              xml: null
          }
      }


      var antlr4 = require('assets/js/antlr4/index');
      var GramLogicLexer = require('assets/js/antlr4/parser/GramLogicLexer').GramLogicLexer; 
      var GramLogicParser = require('assets/js/antlr4/parser/GramLogicParser').GramLogicParser; 
      var HtmlErrorListener = require('assets/js/antlr4/parser/HtmlErrorListener').HtmlErrorListener;
      var HtmlGramLogicListener = require('assets/js/antlr4/parser/HtmlGramLogicListener').HtmlGramLogicListener;

      var chars = new antlr4.InputStream(formula); 
      var lexer = new GramLogicLexer(chars); 
      var tokens = new antlr4.CommonTokenStream(lexer); 
      var parser = new GramLogicParser(tokens); 
      var errorListener = new HtmlErrorListener();
      parser.addErrorListener(errorListener);
      parser.buildParseTrees = true; 
      var tree = parser.form();
      var htmlGramLogic = new HtmlGramLogicListener();
      antlr4.tree.ParseTreeWalker.DEFAULT.walk(htmlGramLogic, tree);

    if (errorListener.errors.length == 0) {
            return {
                sucesso:true,
                mensagem:'Opaa! seu arquivo acabou de ser gerado',
                xml: htmlGramLogic.xmlDoc.outerHTML
            }
    } else {
       
       var listaErros=[];
        for (var i = 0; i < errorListener.errors.length; i++) {
            var msg = {
                'linha':null,
                'coluna':null,
                'info':null
            };


            var error = errorListener.errors[i];
            msg.linha = error.line;
            msg.coluna =  error.column;;

            var infos =[]
                if (error.msg.indexOf('expecting')>=0){
                    var x = error.msg.indexOf('expecting')+11;
                    var tamanho = error.msg.length;
                    var esperados = error.msg.substring(x, tamanho-1);
                    var index = esperados.indexOf(', ')
                    if (index==-1){
                        
                        if(esperados=='EOF'){
                            infos.push('Final da fórmula inválido') 
                        }else{
                            infos.push('Os valores esperados são: '+esperados)
                        }
                       
    
                    }else{
                        while(index>=0){
                            infos.push('Valor esperado: '+esperados.substring(0,index))
                            esperados =esperados.substring(index+2);
                            index = esperados.indexOf(', ');
                        }
                        if(esperados=='PRED'){
                            infos.push("Valor esperado: letras predicativas de 'A' a 'Z'")
                        }
                    }
                }else{
                   
                    var index = error.msg.indexOf('input')+6;
                    var tamanho = error.msg.length;
                    var entrada = error.msg.substring(index+1,tamanho-1);
                    
                    if(entrada=='~'){
                        infos.push("Valor esperado: Letras predicativas de 'A' a 'Z'")

                    }
                    else if(entrada=='('){
                        infos.push("Valor esperado: Simbolo de negação '~' Letras predicativas de 'A' a 'Z'")

                    }
                    else{
                        infos.push("O Argumento '"+entrada+"' não é válido")
                    }
                }

                msg.info = infos
                listaErros.push(msg)
    
           
        }
            return {
                sucesso:false,
                mensagem:listaErros,
                xml: ''
            }

        
    }
      
      },
      getAmbiente: function() {
        return  ambiente;
      }
      ,
      setAmbiente: function(amb) {

        if(amb=='prod' || amb=='dev' ){
            ambiente = amb;
            return true
        }
        else{
            return false 
        }
            
      }
      ,
      gethost: function() {
        return  hostdev;
      }
      
    }

})(gramLogic||{})

