// Generated from GramLogic.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('assets/js/antlr4/index');
var GramLogicListener = require('./GramLogicListener').GramLogicListener;
var grammarFileName = "GramLogic.g4";


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\r7\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0003\u0002\u0003",
    "\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0007\u0002\f\n\u0002\f\u0002",
    "\u000e\u0002\u000f\u000b\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003",
    "\u0002\u0005\u0002\u0015\n\u0002\u0003\u0003\u0003\u0003\u0007\u0003",
    "\u0019\n\u0003\f\u0003\u000e\u0003\u001c\u000b\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0007\u0003$",
    "\n\u0003\f\u0003\u000e\u0003\'\u000b\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0005\u0003-\n\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0007\u00032\n\u0003\f\u0003\u000e\u00035\u000b\u0003\u0003\u0003",
    "\u0004\u001a%\u0003\u0004\u0004\u0002\u0004\u0002\u0003\u0003\u0002",
    "\u0005\b\u0002;\u0002\u0014\u0003\u0002\u0002\u0002\u0004,\u0003\u0002",
    "\u0002\u0002\u0006\u0007\u0007\u0003\u0002\u0002\u0007\u0015\u0005\u0004",
    "\u0003\u0002\b\r\u0005\u0004\u0003\u0002\t\n\u0007\u0004\u0002\u0002",
    "\n\f\u0005\u0004\u0003\u0002\u000b\t\u0003\u0002\u0002\u0002\f\u000f",
    "\u0003\u0002\u0002\u0002\r\u000b\u0003\u0002\u0002\u0002\r\u000e\u0003",
    "\u0002\u0002\u0002\u000e\u0010\u0003\u0002\u0002\u0002\u000f\r\u0003",
    "\u0002\u0002\u0002\u0010\u0011\u0007\u0003\u0002\u0002\u0011\u0012\u0005",
    "\u0004\u0003\u0002\u0012\u0013\u0007\u0002\u0002\u0003\u0013\u0015\u0003",
    "\u0002\u0002\u0002\u0014\u0006\u0003\u0002\u0002\u0002\u0014\b\u0003",
    "\u0002\u0002\u0002\u0015\u0003\u0003\u0002\u0002\u0002\u0016\u001a\b",
    "\u0003\u0001\u0002\u0017\u0019\u0007\t\u0002\u0002\u0018\u0017\u0003",
    "\u0002\u0002\u0002\u0019\u001c\u0003\u0002\u0002\u0002\u001a\u001b\u0003",
    "\u0002\u0002\u0002\u001a\u0018\u0003\u0002\u0002\u0002\u001b\u001d\u0003",
    "\u0002\u0002\u0002\u001c\u001a\u0003\u0002\u0002\u0002\u001d-\u0007",
    "\r\u0002\u0002\u001e\u001f\u0007\n\u0002\u0002\u001f \u0005\u0004\u0003",
    "\u0002 !\u0007\u000b\u0002\u0002!-\u0003\u0002\u0002\u0002\"$\u0007",
    "\t\u0002\u0002#\"\u0003\u0002\u0002\u0002$\'\u0003\u0002\u0002\u0002",
    "%&\u0003\u0002\u0002\u0002%#\u0003\u0002\u0002\u0002&(\u0003\u0002\u0002",
    "\u0002\'%\u0003\u0002\u0002\u0002()\u0007\n\u0002\u0002)*\u0005\u0004",
    "\u0003\u0002*+\u0007\u000b\u0002\u0002+-\u0003\u0002\u0002\u0002,\u0016",
    "\u0003\u0002\u0002\u0002,\u001e\u0003\u0002\u0002\u0002,%\u0003\u0002",
    "\u0002\u0002-3\u0003\u0002\u0002\u0002./\f\u0006\u0002\u0002/0\t\u0002",
    "\u0002\u000202\u0005\u0004\u0003\u00071.\u0003\u0002\u0002\u000225\u0003",
    "\u0002\u0002\u000231\u0003\u0002\u0002\u000234\u0003\u0002\u0002\u0002",
    "4\u0005\u0003\u0002\u0002\u000253\u0003\u0002\u0002\u0002\b\r\u0014",
    "\u001a%,3"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'|-'", "','", "'^'", "'v'", "'->'", "'<->'", 
                     "'~'", "'('", "')'" ];

var symbolicNames = [ null, null, null, null, null, null, null, null, null, 
                      null, "WHITESPACE", "PRED" ];

var ruleNames =  [ "form", "arg" ];

function GramLogicParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

GramLogicParser.prototype = Object.create(antlr4.Parser.prototype);
GramLogicParser.prototype.constructor = GramLogicParser;

Object.defineProperty(GramLogicParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

GramLogicParser.EOF = antlr4.Token.EOF;
GramLogicParser.T__0 = 1;
GramLogicParser.T__1 = 2;
GramLogicParser.T__2 = 3;
GramLogicParser.T__3 = 4;
GramLogicParser.T__4 = 5;
GramLogicParser.T__5 = 6;
GramLogicParser.T__6 = 7;
GramLogicParser.T__7 = 8;
GramLogicParser.T__8 = 9;
GramLogicParser.WHITESPACE = 10;
GramLogicParser.PRED = 11;

GramLogicParser.RULE_form = 0;
GramLogicParser.RULE_arg = 1;


function FormContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = GramLogicParser.RULE_form;
    return this;
}

FormContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FormContext.prototype.constructor = FormContext;

FormContext.prototype.arg = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ArgContext);
    } else {
        return this.getTypedRuleContext(ArgContext,i);
    }
};

FormContext.prototype.EOF = function() {
    return this.getToken(GramLogicParser.EOF, 0);
};

FormContext.prototype.enterRule = function(listener) {
    if(listener instanceof GramLogicListener ) {
        listener.enterForm(this);
	}
};

FormContext.prototype.exitRule = function(listener) {
    if(listener instanceof GramLogicListener ) {
        listener.exitForm(this);
	}
};




GramLogicParser.FormContext = FormContext;

GramLogicParser.prototype.form = function() {

    var localctx = new FormContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, GramLogicParser.RULE_form);
    var _la = 0; // Token type
    try {
        this.state = 18;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case GramLogicParser.T__0:
            this.enterOuterAlt(localctx, 1);
            this.state = 4;
            this.match(GramLogicParser.T__0);
            this.state = 5;
            this.arg(0);
            break;
        case GramLogicParser.T__6:
        case GramLogicParser.T__7:
        case GramLogicParser.PRED:
            this.enterOuterAlt(localctx, 2);
            this.state = 6;
            this.arg(0);
            this.state = 11;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===GramLogicParser.T__1) {
                this.state = 7;
                this.match(GramLogicParser.T__1);
                this.state = 8;
                this.arg(0);
                this.state = 13;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 14;
            this.match(GramLogicParser.T__0);
            this.state = 15;
            this.arg(0);
            this.state = 16;
            this.match(GramLogicParser.EOF);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function ArgContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = GramLogicParser.RULE_arg;
    return this;
}

ArgContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ArgContext.prototype.constructor = ArgContext;

ArgContext.prototype.PRED = function() {
    return this.getToken(GramLogicParser.PRED, 0);
};

ArgContext.prototype.arg = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ArgContext);
    } else {
        return this.getTypedRuleContext(ArgContext,i);
    }
};

ArgContext.prototype.enterRule = function(listener) {
    if(listener instanceof GramLogicListener ) {
        listener.enterArg(this);
	}
};

ArgContext.prototype.exitRule = function(listener) {
    if(listener instanceof GramLogicListener ) {
        listener.exitArg(this);
	}
};



GramLogicParser.prototype.arg = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new ArgContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 2;
    this.enterRecursionRule(localctx, 2, GramLogicParser.RULE_arg, _p);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 42;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,4,this._ctx);
        switch(la_) {
        case 1:
            this.state = 24;
            this._errHandler.sync(this);
            var _alt = this._interp.adaptivePredict(this._input,2,this._ctx)
            while(_alt!=1 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
                if(_alt===1+1) {
                    this.state = 21;
                    this.match(GramLogicParser.T__6); 
                }
                this.state = 26;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input,2,this._ctx);
            }

            this.state = 27;
            this.match(GramLogicParser.PRED);
            break;

        case 2:
            this.state = 28;
            this.match(GramLogicParser.T__7);
            this.state = 29;
            this.arg(0);
            this.state = 30;
            this.match(GramLogicParser.T__8);
            break;

        case 3:
            this.state = 35;
            this._errHandler.sync(this);
            var _alt = this._interp.adaptivePredict(this._input,3,this._ctx)
            while(_alt!=1 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
                if(_alt===1+1) {
                    this.state = 32;
                    this.match(GramLogicParser.T__6); 
                }
                this.state = 37;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input,3,this._ctx);
            }

            this.state = 38;
            this.match(GramLogicParser.T__7);
            this.state = 39;
            this.arg(0);
            this.state = 40;
            this.match(GramLogicParser.T__8);
            break;

        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 49;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,5,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                localctx = new ArgContext(this, _parentctx, _parentState);
                this.pushNewRecursionContext(localctx, _startState, GramLogicParser.RULE_arg);
                this.state = 44;
                if (!( this.precpred(this._ctx, 4))) {
                    throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
                }
                this.state = 45;
                _la = this._input.LA(1);
                if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << GramLogicParser.T__2) | (1 << GramLogicParser.T__3) | (1 << GramLogicParser.T__4) | (1 << GramLogicParser.T__5))) !== 0))) {
                this._errHandler.recoverInline(this);
                }
                else {
                	this._errHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 46;
                this.arg(5); 
            }
            this.state = 51;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,5,this._ctx);
        }

    } catch( error) {
        if(error instanceof antlr4.error.RecognitionException) {
	        localctx.exception = error;
	        this._errHandler.reportError(this, error);
	        this._errHandler.recover(this, error);
	    } else {
	    	throw error;
	    }
    } finally {
        this.unrollRecursionContexts(_parentctx)
    }
    return localctx;
};


GramLogicParser.prototype.sempred = function(localctx, ruleIndex, predIndex) {
	switch(ruleIndex) {
	case 1:
			return this.arg_sempred(localctx, predIndex);
    default:
        throw "No predicate with index:" + ruleIndex;
   }
};

GramLogicParser.prototype.arg_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.precpred(this._ctx, 4);
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.GramLogicParser = GramLogicParser;
