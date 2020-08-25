// Generated from GramLogic.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('assets/js/antlr4/index');



var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0002\r9\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
    "\u0004\r\t\r\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003",
    "\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\b",
    "\u0003\b\u0003\t\u0003\t\u0003\n\u0003\n\u0003\u000b\u0003\u000b\u0003",
    "\f\u0003\f\u0003\f\u0003\f\u0003\r\u0003\r\u0002\u0002\u000e\u0003\u0003",
    "\u0005\u0004\u0007\u0005\t\u0006\u000b\u0007\r\b\u000f\t\u0011\n\u0013",
    "\u000b\u0015\u0002\u0017\f\u0019\r\u0003\u0002\u0004\u0003\u0002C\\",
    "\u0005\u0002\u000b\f\u000f\u000f\"\"\u00027\u0002\u0003\u0003\u0002",
    "\u0002\u0002\u0002\u0005\u0003\u0002\u0002\u0002\u0002\u0007\u0003\u0002",
    "\u0002\u0002\u0002\t\u0003\u0002\u0002\u0002\u0002\u000b\u0003\u0002",
    "\u0002\u0002\u0002\r\u0003\u0002\u0002\u0002\u0002\u000f\u0003\u0002",
    "\u0002\u0002\u0002\u0011\u0003\u0002\u0002\u0002\u0002\u0013\u0003\u0002",
    "\u0002\u0002\u0002\u0017\u0003\u0002\u0002\u0002\u0002\u0019\u0003\u0002",
    "\u0002\u0002\u0003\u001b\u0003\u0002\u0002\u0002\u0005\u001e\u0003\u0002",
    "\u0002\u0002\u0007 \u0003\u0002\u0002\u0002\t\"\u0003\u0002\u0002\u0002",
    "\u000b$\u0003\u0002\u0002\u0002\r\'\u0003\u0002\u0002\u0002\u000f+\u0003",
    "\u0002\u0002\u0002\u0011-\u0003\u0002\u0002\u0002\u0013/\u0003\u0002",
    "\u0002\u0002\u00151\u0003\u0002\u0002\u0002\u00173\u0003\u0002\u0002",
    "\u0002\u00197\u0003\u0002\u0002\u0002\u001b\u001c\u0007~\u0002\u0002",
    "\u001c\u001d\u0007/\u0002\u0002\u001d\u0004\u0003\u0002\u0002\u0002",
    "\u001e\u001f\u0007.\u0002\u0002\u001f\u0006\u0003\u0002\u0002\u0002",
    " !\u0007`\u0002\u0002!\b\u0003\u0002\u0002\u0002\"#\u0007x\u0002\u0002",
    "#\n\u0003\u0002\u0002\u0002$%\u0007/\u0002\u0002%&\u0007@\u0002\u0002",
    "&\f\u0003\u0002\u0002\u0002\'(\u0007>\u0002\u0002()\u0007/\u0002\u0002",
    ")*\u0007@\u0002\u0002*\u000e\u0003\u0002\u0002\u0002+,\u0007\u0080\u0002",
    "\u0002,\u0010\u0003\u0002\u0002\u0002-.\u0007*\u0002\u0002.\u0012\u0003",
    "\u0002\u0002\u0002/0\u0007+\u0002\u00020\u0014\u0003\u0002\u0002\u0002",
    "12\t\u0002\u0002\u00022\u0016\u0003\u0002\u0002\u000234\t\u0003\u0002",
    "\u000245\u0003\u0002\u0002\u000256\b\f\u0002\u00026\u0018\u0003\u0002",
    "\u0002\u000278\u0005\u0015\u000b\u00028\u001a\u0003\u0002\u0002\u0002",
    "\u0003\u0002\u0003\b\u0002\u0002"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

function GramLogicLexer(input) {
	antlr4.Lexer.call(this, input);
    this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    return this;
}

GramLogicLexer.prototype = Object.create(antlr4.Lexer.prototype);
GramLogicLexer.prototype.constructor = GramLogicLexer;

Object.defineProperty(GramLogicLexer.prototype, "atn", {
        get : function() {
                return atn;
        }
});

GramLogicLexer.EOF = antlr4.Token.EOF;
GramLogicLexer.T__0 = 1;
GramLogicLexer.T__1 = 2;
GramLogicLexer.T__2 = 3;
GramLogicLexer.T__3 = 4;
GramLogicLexer.T__4 = 5;
GramLogicLexer.T__5 = 6;
GramLogicLexer.T__6 = 7;
GramLogicLexer.T__7 = 8;
GramLogicLexer.T__8 = 9;
GramLogicLexer.WHITESPACE = 10;
GramLogicLexer.PRED = 11;

GramLogicLexer.prototype.channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];

GramLogicLexer.prototype.modeNames = [ "DEFAULT_MODE" ];

GramLogicLexer.prototype.literalNames = [ null, "'|-'", "','", "'^'", "'v'", 
                                          "'->'", "'<->'", "'~'", "'('", 
                                          "')'" ];

GramLogicLexer.prototype.symbolicNames = [ null, null, null, null, null, 
                                           null, null, null, null, null, 
                                           "WHITESPACE", "PRED" ];

GramLogicLexer.prototype.ruleNames = [ "T__0", "T__1", "T__2", "T__3", "T__4", 
                                       "T__5", "T__6", "T__7", "T__8", "UPPERCASE", 
                                       "WHITESPACE", "PRED" ];

GramLogicLexer.prototype.grammarFileName = "GramLogic.g4";



exports.GramLogicLexer = GramLogicLexer;

