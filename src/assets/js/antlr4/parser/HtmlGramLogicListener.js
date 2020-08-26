

var antlr4 = require('../../antlr4/index'); 
var GramLogicLexer = require('../parser/GramLogicLexer'); 
var GramLogicParser = require('../parser/GramLogicParser'); 
var GramLogicListener = require('../parser/GramLogicListener').GramLogicListener;
var error = require('../../antlr4/error/ErrorListener'); 

HtmlGramLogicListener = function () { 
    GramLogicListener.call(this);
    this.xmlDoc = null;
    return this; 
    } 

HtmlGramLogicListener.prototype = Object.create(GramLogicListener.prototype);

HtmlGramLogicListener.prototype.constructor = HtmlGramLogicListener; 


HtmlGramLogicListener.prototype.enterForm = function (ctx) { 

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "assets/xml/base.xml", false);
    xhttp.send();
    this.xmlDoc = xhttp
    ctx.values = [];
}; 

HtmlGramLogicListener.prototype.exitForm = function (ctx) { 
    var conclusao =null;
    var premissas =[];
    try {
   
        for(var i=1; i<ctx.children.length;i++){
            if(ctx.children[i-1].getText()=='|-'){
                conclusao = this.xmlDoc.responseXML.createElement("CONCLUSAO");
                conclusao.appendChild(ctx.children[i].value);
                
            }
            else if( ctx.children[i].getText()==',' || ctx.children[i].getText()=='|-'){
                premissa = this.xmlDoc.responseXML.createElement("PREMISSA");
                premissa.appendChild(ctx.children[i-1].value)
                premissas.push(premissa);
            }
            
        }
        x = this.xmlDoc.responseXML.getElementsByTagName("ARGUMENTO")[0]
        for(var i=0; i<premissas.length;i++){
            x.appendChild(premissas[i]);
        }
        x.appendChild(conclusao);

        this.xmlDoc = this.xmlDoc.responseXML.getElementsByTagName("ARGUMENTO")[0];
    }
    catch (e) {

    }
    

  
}; 

HtmlGramLogicListener.prototype.enterArg = function (ctx) {
    try {
        var str = ctx.getText();
        if((str.length>=2 &&  str.indexOf("^")==-1 && str.indexOf("v")==-1 &&  str.indexOf("->")==-1 &&  str.indexOf("<->")==-1) ||str.length==1){        
            var count=0;   
            for (var i=0; i<str.length;i++){   
                if(str.charAt(i)=='~'){   
                    count++;   
                }  
            }

            lpred = this.xmlDoc.responseXML.createElement("LPRED");
            newElement = this.xmlDoc.responseXML.createElement("PREDICATIVO");
            newText = this.xmlDoc.responseXML.createTextNode(str[str.length-1]);
            newElement.appendChild(newText);
            lpred.appendChild(newElement);
            var neg="";
            for (var i=0; i<count;i++){
                neg=neg+'~'
            }
            lpred.setAttribute("NEG",neg);
            ctx.value = lpred
        
        }
        else{
            ctx.value = null;
        }
    }
    catch (e) {

    }

}; 

HtmlGramLogicListener.prototype.exitArg = function (ctx) {
    try {
        var str = ctx.getText();
        if((ctx.children && ctx.children.length == 3) && (str.indexOf("^")>=0 || str.indexOf("v")>=0 ||  str.indexOf("->")>=0 ||  str.indexOf("<->")>=0)){

            var left = ctx.children[0];
            var right = ctx.children[2];
            var conect = ctx.children[1].getText();

            switch (conect) {
                case '^':
                    newElement = this.xmlDoc.responseXML.createElement("CONJUNCAO");

                    newElementPrim = this.xmlDoc.responseXML.createElement("PRIM");
                    newElementPrim.appendChild(left.value);
                    newElement.appendChild(newElementPrim);

                    newElementSeg = this.xmlDoc.responseXML.createElement("SEG");
                    newElementSeg.appendChild(right.value); 
                    newElement.appendChild(newElementSeg);

                    newElement.setAttribute("CONECTIVO",conect);

                    break;
                case 'v':
                    newElement = this.xmlDoc.responseXML.createElement("DISJUNCAO");

                    newElementPrim = this.xmlDoc.responseXML.createElement("PRIM");
                    newElementPrim.appendChild(left.value);
                    newElement.appendChild(newElementPrim);

                    newElementSeg = this.xmlDoc.responseXML.createElement("SEG");
                    newElementSeg.appendChild(right.value); 
                    newElement.appendChild(newElementSeg);

                    newElement.setAttribute("CONECTIVO",conect);

                    break;
                case '->':
                    newElement = this.xmlDoc.responseXML.createElement("CONDICIONAL");

                    newElementPrim = this.xmlDoc.responseXML.createElement("ANTECENDENTE");
                    newElementPrim.appendChild(left.value);
                    newElement.appendChild(newElementPrim);


                    newElementSeg = this.xmlDoc.responseXML.createElement("CONSEQUENTE");
                    newElementSeg.appendChild(right.value); 
                    newElement.appendChild(newElementSeg);

                    newElement.setAttribute("CONECTIVO",conect);
                    break;
                case '<->':
                    newElement = this.xmlDoc.responseXML.createElement("BICONDICIONAL");

                    newElementPrim = this.xmlDoc.responseXML.createElement("PRIM");
                    newElementPrim.appendChild(left.value);
                    newElement.appendChild(newElementPrim);

                    newElementSeg = this.xmlDoc.responseXML.createElement("SEG");
                    newElementSeg.appendChild(right.value); 
                    newElement.appendChild(newElementSeg);

                    newElement.setAttribute("CONECTIVO",conect);
                    break;
            }
            newElement.setAttribute("NEG","");
            ctx.value =newElement;
    
        }
        

        var neg="";
        if(ctx.children && ctx.children.length >= 4){

            for(var i=0; i<ctx.children.length;i++){
                if(ctx.children[i].getText()=='~'){
                    neg=neg+'~'
                }

                if(ctx.children[i].getText()=='(' && ctx.children[i+2].getText()==')'){
                    var element = ctx.children[i+1].value;
                    element.setAttribute("NEG",neg);
                    ctx.value = element;
                }
            }
        }
    }
    catch (e) {

    }
   
}; 

exports.HtmlGramLogicListener = HtmlGramLogicListener; 