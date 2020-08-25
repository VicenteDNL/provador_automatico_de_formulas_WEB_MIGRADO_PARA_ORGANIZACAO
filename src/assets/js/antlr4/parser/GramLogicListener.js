// Generated from GramLogic.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('assets/js/antlr4/index');

// This class defines a complete listener for a parse tree produced by GramLogicParser.
function GramLogicListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

GramLogicListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
GramLogicListener.prototype.constructor = GramLogicListener;

// Enter a parse tree produced by GramLogicParser#form.
GramLogicListener.prototype.enterForm = function(ctx) {
};

// Exit a parse tree produced by GramLogicParser#form.
GramLogicListener.prototype.exitForm = function(ctx) {
};


// Enter a parse tree produced by GramLogicParser#arg.
GramLogicListener.prototype.enterArg = function(ctx) {
};

// Exit a parse tree produced by GramLogicParser#arg.
GramLogicListener.prototype.exitArg = function(ctx) {
};



exports.GramLogicListener = GramLogicListener;