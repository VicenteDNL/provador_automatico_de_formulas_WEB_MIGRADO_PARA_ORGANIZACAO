var antlr4 = require('../../antlr4/index');
var GramLogicLexer = require('../parser/GramLogicLexer');
var GramLogicParser = require('../parser/GramLogicParser');
var GramLogicListener = require('../parser/GramLogicListener').ExprListener;

HtmlErrorListener = function () {
    antlr4.error.ErrorListener.call(this);
    this.errors = [];
    return this;
}

HtmlProxyErrorListener = function () {

    
    // antlr4.error.ProxyErrorListener.call(this);
    this.errors = [];
    return this;
}



HtmlErrorListener.prototype = Object.create(antlr4.error.ErrorListener.prototype);
HtmlErrorListener.prototype.constructor = HtmlErrorListener;

HtmlErrorListener.prototype.syntaxError = function (recognizer, offendingSymbol, line, column, msg, e) {
    console.log('entrou')
    this.errors.push({
        'recognizer': recognizer,
        'offendingSymbol': offendingSymbol,
        'line': line,
        'column': column,
        'msg': msg,
        'e': e
    });
};


exports.HtmlErrorListener = HtmlErrorListener;
