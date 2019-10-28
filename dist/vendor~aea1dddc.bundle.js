(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[37],{

/***/ "5XgJ":
/***/ (function(module, exports, __webpack_require__) {

/**
 * The Lexer class handles tokenizing the input in various ways. Since our
 * parser expects us to be able to backtrack, the lexer allows lexing from any
 * given starting point.
 *
 * Its main exposed function is the `lex` function, which takes a position to
 * lex from and a type of token to lex. It defers to the appropriate `_innerLex`
 * function.
 *
 * The various `_innerLex` functions perform the actual lexing of different
 * kinds.
 */

var matchAt = __webpack_require__("rq37");

var ParseError = __webpack_require__("E0m9");

// The main lexer class
function Lexer(input) {
    this._input = input;
}

// The resulting token returned from `lex`.
function Token(text, data, position) {
    this.text = text;
    this.data = data;
    this.position = position;
}

/* The following tokenRegex
 * - matches typical whitespace (but not NBSP etc.) using its first group
 * - matches symbol combinations which result in a single output character
 * - does not match any control character \x00-\x1f except whitespace
 * - does not match a bare backslash
 * - matches any ASCII character except those just mentioned
 * - does not match the BMP private use area \uE000-\uF8FF
 * - does not match bare surrogate code units
 * - matches any BMP character except for those just described
 * - matches any valid Unicode surrogate pair
 * - matches a backslash followed by one or more letters
 * - matches a backslash followed by any BMP character, including newline
 * Just because the Lexer matches something doesn't mean it's valid input:
 * If there is no matching function or symbol definition, the Parser will
 * still reject the input.
 */
var tokenRegex = new RegExp(
    "([ \r\n\t]+)|(" +                                // whitespace
    "---?" +                                          // special combinations
    "|[!-\\[\\]-\u2027\u202A-\uD7FF\uF900-\uFFFF]" +  // single codepoint
    "|[\uD800-\uDBFF][\uDC00-\uDFFF]" +               // surrogate pair
    "|\\\\(?:[a-zA-Z]+|[^\uD800-\uDFFF])" +           // function name
    ")"
);

var whitespaceRegex = /\s*/;

/**
 * This function lexes a single normal token. It takes a position and
 * whether it should completely ignore whitespace or not.
 */
Lexer.prototype._innerLex = function(pos, ignoreWhitespace) {
    var input = this._input;
    if (pos === input.length) {
        return new Token("EOF", null, pos);
    }
    var match = matchAt(tokenRegex, input, pos);
    if (match === null) {
        throw new ParseError(
            "Unexpected character: '" + input[pos] + "'",
            this, pos);
    } else if (match[2]) { // matched non-whitespace
        return new Token(match[2], null, pos + match[2].length);
    } else if (ignoreWhitespace) {
        return this._innerLex(pos + match[1].length, true);
    } else { // concatenate whitespace to a single space
        return new Token(" ", null, pos + match[1].length);
    }
};

// A regex to match a CSS color (like #ffffff or BlueViolet)
var cssColor = /#[a-z0-9]+|[a-z]+/i;

/**
 * This function lexes a CSS color.
 */
Lexer.prototype._innerLexColor = function(pos) {
    var input = this._input;

    // Ignore whitespace
    var whitespace = matchAt(whitespaceRegex, input, pos)[0];
    pos += whitespace.length;

    var match;
    if ((match = matchAt(cssColor, input, pos))) {
        // If we look like a color, return a color
        return new Token(match[0], null, pos + match[0].length);
    } else {
        throw new ParseError("Invalid color", this, pos);
    }
};

// A regex to match a dimension. Dimensions look like
// "1.2em" or ".4pt" or "1 ex"
var sizeRegex = /(-?)\s*(\d+(?:\.\d*)?|\.\d+)\s*([a-z]{2})/;

/**
 * This function lexes a dimension.
 */
Lexer.prototype._innerLexSize = function(pos) {
    var input = this._input;

    // Ignore whitespace
    var whitespace = matchAt(whitespaceRegex, input, pos)[0];
    pos += whitespace.length;

    var match;
    if ((match = matchAt(sizeRegex, input, pos))) {
        var unit = match[3];
        // We only currently handle "em" and "ex" units
        if (unit !== "em" && unit !== "ex") {
            throw new ParseError("Invalid unit: '" + unit + "'", this, pos);
        }
        return new Token(match[0], {
            number: +(match[1] + match[2]),
            unit: unit,
        }, pos + match[0].length);
    }

    throw new ParseError("Invalid size", this, pos);
};

/**
 * This function lexes a string of whitespace.
 */
Lexer.prototype._innerLexWhitespace = function(pos) {
    var input = this._input;

    var whitespace = matchAt(whitespaceRegex, input, pos)[0];
    pos += whitespace.length;

    return new Token(whitespace[0], null, pos);
};

/**
 * This function lexes a single token starting at `pos` and of the given mode.
 * Based on the mode, we defer to one of the `_innerLex` functions.
 */
Lexer.prototype.lex = function(pos, mode) {
    if (mode === "math") {
        return this._innerLex(pos, true);
    } else if (mode === "text") {
        return this._innerLex(pos, false);
    } else if (mode === "color") {
        return this._innerLexColor(pos);
    } else if (mode === "size") {
        return this._innerLexSize(pos);
    } else if (mode === "whitespace") {
        return this._innerLexWhitespace(pos);
    }
};

module.exports = Lexer;


/***/ }),

/***/ "E0m9":
/***/ (function(module, exports) {

/**
 * This is the ParseError class, which is the main error thrown by KaTeX
 * functions when something has gone wrong. This is used to distinguish internal
 * errors from errors in the expression that the user provided.
 */
function ParseError(message, lexer, position) {
    var error = "KaTeX parse error: " + message;

    if (lexer !== undefined && position !== undefined) {
        // If we have the input and a position, make the error a bit fancier

        // Prepend some information
        error += " at position " + position + ": ";

        // Get the input
        var input = lexer._input;
        // Insert a combining underscore at the correct position
        input = input.slice(0, position) + "\u0332" +
            input.slice(position);

        // Extract some context from the input and add it to the error
        var begin = Math.max(0, position - 15);
        var end = position + 15;
        error += input.slice(begin, end);
    }

    // Some hackery to make ParseError a prototype of Error
    // See http://stackoverflow.com/a/8460753
    var self = new Error(error);
    self.name = "ParseError";
    self.__proto__ = ParseError.prototype;

    self.position = position;
    return self;
}

// More hackery
ParseError.prototype.__proto__ = Error.prototype;

module.exports = ParseError;


/***/ }),

/***/ "Wjn4":
/***/ (function(module, exports) {

/**
 * This file contains information about the options that the Parser carries
 * around with it while parsing. Data is held in an `Options` object, and when
 * recursing, a new `Options` object can be created with the `.with*` and
 * `.reset` functions.
 */

/**
 * This is the main options class. It contains the style, size, color, and font
 * of the current parse level. It also contains the style and size of the parent
 * parse level, so size changes can be handled efficiently.
 *
 * Each of the `.with*` and `.reset` functions passes its current style and size
 * as the parentStyle and parentSize of the new options class, so parent
 * handling is taken care of automatically.
 */
function Options(data) {
    this.style = data.style;
    this.color = data.color;
    this.size = data.size;
    this.phantom = data.phantom;
    this.font = data.font;

    if (data.parentStyle === undefined) {
        this.parentStyle = data.style;
    } else {
        this.parentStyle = data.parentStyle;
    }

    if (data.parentSize === undefined) {
        this.parentSize = data.size;
    } else {
        this.parentSize = data.parentSize;
    }
}

/**
 * Returns a new options object with the same properties as "this".  Properties
 * from "extension" will be copied to the new options object.
 */
Options.prototype.extend = function(extension) {
    var data = {
        style: this.style,
        size: this.size,
        color: this.color,
        parentStyle: this.style,
        parentSize: this.size,
        phantom: this.phantom,
        font: this.font,
    };

    for (var key in extension) {
        if (extension.hasOwnProperty(key)) {
            data[key] = extension[key];
        }
    }

    return new Options(data);
};

/**
 * Create a new options object with the given style.
 */
Options.prototype.withStyle = function(style) {
    return this.extend({
        style: style,
    });
};

/**
 * Create a new options object with the given size.
 */
Options.prototype.withSize = function(size) {
    return this.extend({
        size: size,
    });
};

/**
 * Create a new options object with the given color.
 */
Options.prototype.withColor = function(color) {
    return this.extend({
        color: color,
    });
};

/**
 * Create a new options object with "phantom" set to true.
 */
Options.prototype.withPhantom = function() {
    return this.extend({
        phantom: true,
    });
};

/**
 * Create a new options objects with the give font.
 */
Options.prototype.withFont = function(font) {
    return this.extend({
        font: font,
    });
};

/**
 * Create a new options object with the same style, size, and color. This is
 * used so that parent style and size changes are handled correctly.
 */
Options.prototype.reset = function() {
    return this.extend({});
};

/**
 * A map of color names to CSS colors.
 * TODO(emily): Remove this when we have real macros
 */
var colorMap = {
    "katex-blue": "#6495ed",
    "katex-orange": "#ffa500",
    "katex-pink": "#ff00af",
    "katex-red": "#df0030",
    "katex-green": "#28ae7b",
    "katex-gray": "gray",
    "katex-purple": "#9d38bd",
    "katex-blueA": "#c7e9f1",
    "katex-blueB": "#9cdceb",
    "katex-blueC": "#58c4dd",
    "katex-blueD": "#29abca",
    "katex-blueE": "#1c758a",
    "katex-tealA": "#acead7",
    "katex-tealB": "#76ddc0",
    "katex-tealC": "#5cd0b3",
    "katex-tealD": "#55c1a7",
    "katex-tealE": "#49a88f",
    "katex-greenA": "#c9e2ae",
    "katex-greenB": "#a6cf8c",
    "katex-greenC": "#83c167",
    "katex-greenD": "#77b05d",
    "katex-greenE": "#699c52",
    "katex-goldA": "#f7c797",
    "katex-goldB": "#f9b775",
    "katex-goldC": "#f0ac5f",
    "katex-goldD": "#e1a158",
    "katex-goldE": "#c78d46",
    "katex-redA": "#f7a1a3",
    "katex-redB": "#ff8080",
    "katex-redC": "#fc6255",
    "katex-redD": "#e65a4c",
    "katex-redE": "#cf5044",
    "katex-maroonA": "#ecabc1",
    "katex-maroonB": "#ec92ab",
    "katex-maroonC": "#c55f73",
    "katex-maroonD": "#a24d61",
    "katex-maroonE": "#94424f",
    "katex-purpleA": "#caa3e8",
    "katex-purpleB": "#b189c6",
    "katex-purpleC": "#9a72ac",
    "katex-purpleD": "#715582",
    "katex-purpleE": "#644172",
    "katex-mintA": "#f5f9e8",
    "katex-mintB": "#edf2df",
    "katex-mintC": "#e0e5cc",
    "katex-grayA": "#fdfdfd",
    "katex-grayB": "#f7f7f7",
    "katex-grayC": "#eeeeee",
    "katex-grayD": "#dddddd",
    "katex-grayE": "#cccccc",
    "katex-grayF": "#aaaaaa",
    "katex-grayG": "#999999",
    "katex-grayH": "#555555",
    "katex-grayI": "#333333",
    "katex-kaBlue": "#314453",
    "katex-kaGreen": "#639b24",
};

/**
 * Gets the CSS color of the current options object, accounting for the
 * `colorMap`.
 */
Options.prototype.getColor = function() {
    if (this.phantom) {
        return "transparent";
    } else {
        return colorMap[this.color] || this.color;
    }
};

module.exports = Options;


/***/ }),

/***/ "aNjz":
/***/ (function(module, exports) {

/**
 * This file contains information and classes for the various kinds of styles
 * used in TeX. It provides a generic `Style` class, which holds information
 * about a specific style. It then provides instances of all the different kinds
 * of styles possible, and provides functions to move between them and get
 * information about them.
 */

/**
 * The main style class. Contains a unique id for the style, a size (which is
 * the same for cramped and uncramped version of a style), a cramped flag, and a
 * size multiplier, which gives the size difference between a style and
 * textstyle.
 */
function Style(id, size, multiplier, cramped) {
    this.id = id;
    this.size = size;
    this.cramped = cramped;
    this.sizeMultiplier = multiplier;
}

/**
 * Get the style of a superscript given a base in the current style.
 */
Style.prototype.sup = function() {
    return styles[sup[this.id]];
};

/**
 * Get the style of a subscript given a base in the current style.
 */
Style.prototype.sub = function() {
    return styles[sub[this.id]];
};

/**
 * Get the style of a fraction numerator given the fraction in the current
 * style.
 */
Style.prototype.fracNum = function() {
    return styles[fracNum[this.id]];
};

/**
 * Get the style of a fraction denominator given the fraction in the current
 * style.
 */
Style.prototype.fracDen = function() {
    return styles[fracDen[this.id]];
};

/**
 * Get the cramped version of a style (in particular, cramping a cramped style
 * doesn't change the style).
 */
Style.prototype.cramp = function() {
    return styles[cramp[this.id]];
};

/**
 * HTML class name, like "displaystyle cramped"
 */
Style.prototype.cls = function() {
    return sizeNames[this.size] + (this.cramped ? " cramped" : " uncramped");
};

/**
 * HTML Reset class name, like "reset-textstyle"
 */
Style.prototype.reset = function() {
    return resetNames[this.size];
};

// IDs of the different styles
var D = 0;
var Dc = 1;
var T = 2;
var Tc = 3;
var S = 4;
var Sc = 5;
var SS = 6;
var SSc = 7;

// String names for the different sizes
var sizeNames = [
    "displaystyle textstyle",
    "textstyle",
    "scriptstyle",
    "scriptscriptstyle",
];

// Reset names for the different sizes
var resetNames = [
    "reset-textstyle",
    "reset-textstyle",
    "reset-scriptstyle",
    "reset-scriptscriptstyle",
];

// Instances of the different styles
var styles = [
    new Style(D, 0, 1.0, false),
    new Style(Dc, 0, 1.0, true),
    new Style(T, 1, 1.0, false),
    new Style(Tc, 1, 1.0, true),
    new Style(S, 2, 0.7, false),
    new Style(Sc, 2, 0.7, true),
    new Style(SS, 3, 0.5, false),
    new Style(SSc, 3, 0.5, true),
];

// Lookup tables for switching from one style to another
var sup = [S, Sc, S, Sc, SS, SSc, SS, SSc];
var sub = [Sc, Sc, Sc, Sc, SSc, SSc, SSc, SSc];
var fracNum = [T, Tc, S, Sc, SS, SSc, SS, SSc];
var fracDen = [Tc, Tc, Sc, Sc, SSc, SSc, SSc, SSc];
var cramp = [Dc, Dc, Tc, Tc, Sc, Sc, SSc, SSc];

// We only export some of the styles. Also, we don't export the `Style` class so
// no more styles can be generated.
module.exports = {
    DISPLAY: styles[D],
    TEXT: styles[T],
    SCRIPT: styles[S],
    SCRIPTSCRIPT: styles[SS],
};


/***/ }),

/***/ "bzbY":
/***/ (function(module, exports, __webpack_require__) {

/* eslint no-constant-condition:0 */
var functions = __webpack_require__("eIiX");
var environments = __webpack_require__("gveB");
var Lexer = __webpack_require__("5XgJ");
var symbols = __webpack_require__("FdGB");
var utils = __webpack_require__("s847");

var parseData = __webpack_require__("yqz1");
var ParseError = __webpack_require__("E0m9");

/**
 * This file contains the parser used to parse out a TeX expression from the
 * input. Since TeX isn't context-free, standard parsers don't work particularly
 * well.
 *
 * The strategy of this parser is as such:
 *
 * The main functions (the `.parse...` ones) take a position in the current
 * parse string to parse tokens from. The lexer (found in Lexer.js, stored at
 * this.lexer) also supports pulling out tokens at arbitrary places. When
 * individual tokens are needed at a position, the lexer is called to pull out a
 * token, which is then used.
 *
 * The parser has a property called "mode" indicating the mode that
 * the parser is currently in. Currently it has to be one of "math" or
 * "text", which denotes whether the current environment is a math-y
 * one or a text-y one (e.g. inside \text). Currently, this serves to
 * limit the functions which can be used in text mode.
 *
 * The main functions then return an object which contains the useful data that
 * was parsed at its given point, and a new position at the end of the parsed
 * data. The main functions can call each other and continue the parsing by
 * using the returned position as a new starting point.
 *
 * There are also extra `.handle...` functions, which pull out some reused
 * functionality into self-contained functions.
 *
 * The earlier functions return ParseNodes.
 * The later functions (which are called deeper in the parse) sometimes return
 * ParseFuncOrArgument, which contain a ParseNode as well as some data about
 * whether the parsed object is a function which is missing some arguments, or a
 * standalone object which can be used as an argument to another function.
 */

/**
 * Main Parser class
 */
function Parser(input, settings) {
    // Make a new lexer
    this.lexer = new Lexer(input);
    // Store the settings for use in parsing
    this.settings = settings;
}

var ParseNode = parseData.ParseNode;

/**
 * An initial function (without its arguments), or an argument to a function.
 * The `result` argument should be a ParseNode.
 */
function ParseFuncOrArgument(result, isFunction) {
    this.result = result;
    // Is this a function (i.e. is it something defined in functions.js)?
    this.isFunction = isFunction;
}

/**
 * Checks a result to make sure it has the right type, and throws an
 * appropriate error otherwise.
 *
 * @param {boolean=} consume whether to consume the expected token,
 *                           defaults to true
 */
Parser.prototype.expect = function(text, consume) {
    if (this.nextToken.text !== text) {
        throw new ParseError(
            "Expected '" + text + "', got '" + this.nextToken.text + "'",
            this.lexer, this.nextToken.position
        );
    }
    if (consume !== false) {
        this.consume();
    }
};

/**
 * Considers the current look ahead token as consumed,
 * and fetches the one after that as the new look ahead.
 */
Parser.prototype.consume = function() {
    this.pos = this.nextToken.position;
    this.nextToken = this.lexer.lex(this.pos, this.mode);
};

/**
 * Main parsing function, which parses an entire input.
 *
 * @return {?Array.<ParseNode>}
 */
Parser.prototype.parse = function() {
    // Try to parse the input
    this.mode = "math";
    this.pos = 0;
    this.nextToken = this.lexer.lex(this.pos, this.mode);
    var parse = this.parseInput();
    return parse;
};

/**
 * Parses an entire input tree.
 */
Parser.prototype.parseInput = function() {
    // Parse an expression
    var expression = this.parseExpression(false);
    // If we succeeded, make sure there's an EOF at the end
    this.expect("EOF", false);
    return expression;
};

var endOfExpression = ["}", "\\end", "\\right", "&", "\\\\", "\\cr"];

/**
 * Parses an "expression", which is a list of atoms.
 *
 * @param {boolean} breakOnInfix Should the parsing stop when we hit infix
 *                  nodes? This happens when functions have higher precendence
 *                  than infix nodes in implicit parses.
 *
 * @param {?string} breakOnToken The token that the expression should end with,
 *                  or `null` if something else should end the expression.
 *
 * @return {ParseNode}
 */
Parser.prototype.parseExpression = function(breakOnInfix, breakOnToken) {
    var body = [];
    // Keep adding atoms to the body until we can't parse any more atoms (either
    // we reached the end, a }, or a \right)
    while (true) {
        var lex = this.nextToken;
        var pos = this.pos;
        if (endOfExpression.indexOf(lex.text) !== -1) {
            break;
        }
        if (breakOnToken && lex.text === breakOnToken) {
            break;
        }
        var atom = this.parseAtom();
        if (!atom) {
            if (!this.settings.throwOnError && lex.text[0] === "\\") {
                var errorNode = this.handleUnsupportedCmd();
                body.push(errorNode);

                pos = lex.position;
                continue;
            }

            break;
        }
        if (breakOnInfix && atom.type === "infix") {
            // rewind so we can parse the infix atom again
            this.pos = pos;
            this.nextToken = lex;
            break;
        }
        body.push(atom);
    }
    return this.handleInfixNodes(body);
};

/**
 * Rewrites infix operators such as \over with corresponding commands such
 * as \frac.
 *
 * There can only be one infix operator per group.  If there's more than one
 * then the expression is ambiguous.  This can be resolved by adding {}.
 *
 * @returns {Array}
 */
Parser.prototype.handleInfixNodes = function(body) {
    var overIndex = -1;
    var funcName;

    for (var i = 0; i < body.length; i++) {
        var node = body[i];
        if (node.type === "infix") {
            if (overIndex !== -1) {
                throw new ParseError("only one infix operator per group",
                    this.lexer, -1);
            }
            overIndex = i;
            funcName = node.value.replaceWith;
        }
    }

    if (overIndex !== -1) {
        var numerNode;
        var denomNode;

        var numerBody = body.slice(0, overIndex);
        var denomBody = body.slice(overIndex + 1);

        if (numerBody.length === 1 && numerBody[0].type === "ordgroup") {
            numerNode = numerBody[0];
        } else {
            numerNode = new ParseNode("ordgroup", numerBody, this.mode);
        }

        if (denomBody.length === 1 && denomBody[0].type === "ordgroup") {
            denomNode = denomBody[0];
        } else {
            denomNode = new ParseNode("ordgroup", denomBody, this.mode);
        }

        var value = this.callFunction(
            funcName, [numerNode, denomNode], null);
        return [new ParseNode(value.type, value, this.mode)];
    } else {
        return body;
    }
};

// The greediness of a superscript or subscript
var SUPSUB_GREEDINESS = 1;

/**
 * Handle a subscript or superscript with nice errors.
 */
Parser.prototype.handleSupSubscript = function(name) {
    var symbol = this.nextToken.text;
    var symPos = this.pos;
    this.consume();
    var group = this.parseGroup();

    if (!group) {
        if (!this.settings.throwOnError && this.nextToken.text[0] === "\\") {
            return this.handleUnsupportedCmd();
        } else {
            throw new ParseError(
                "Expected group after '" + symbol + "'",
                this.lexer,
                symPos + 1
            );
        }
    } else if (group.isFunction) {
        // ^ and _ have a greediness, so handle interactions with functions'
        // greediness
        var funcGreediness = functions[group.result].greediness;
        if (funcGreediness > SUPSUB_GREEDINESS) {
            return this.parseFunction(group);
        } else {
            throw new ParseError(
                "Got function '" + group.result + "' with no arguments " +
                    "as " + name,
                this.lexer, symPos + 1);
        }
    } else {
        return group.result;
    }
};

/**
 * Converts the textual input of an unsupported command into a text node
 * contained within a color node whose color is determined by errorColor
 */
Parser.prototype.handleUnsupportedCmd = function() {
    var text = this.nextToken.text;
    var textordArray = [];

    for (var i = 0; i < text.length; i++) {
        textordArray.push(new ParseNode("textord", text[i], "text"));
    }

    var textNode = new ParseNode(
        "text",
        {
            body: textordArray,
            type: "text",
        },
        this.mode);

    var colorNode = new ParseNode(
        "color",
        {
            color: this.settings.errorColor,
            value: [textNode],
            type: "color",
        },
        this.mode);

    this.consume();
    return colorNode;
};

/**
 * Parses a group with optional super/subscripts.
 *
 * @return {?ParseNode}
 */
Parser.prototype.parseAtom = function() {
    // The body of an atom is an implicit group, so that things like
    // \left(x\right)^2 work correctly.
    var base = this.parseImplicitGroup();

    // In text mode, we don't have superscripts or subscripts
    if (this.mode === "text") {
        return base;
    }

    // Note that base may be empty (i.e. null) at this point.

    var superscript;
    var subscript;
    while (true) {
        // Lex the first token
        var lex = this.nextToken;

        if (lex.text === "\\limits" || lex.text === "\\nolimits") {
            // We got a limit control
            if (!base || base.type !== "op") {
                throw new ParseError(
                    "Limit controls must follow a math operator",
                    this.lexer, this.pos);
            } else {
                var limits = lex.text === "\\limits";
                base.value.limits = limits;
                base.value.alwaysHandleSupSub = true;
            }
            this.consume();
        } else if (lex.text === "^") {
            // We got a superscript start
            if (superscript) {
                throw new ParseError(
                    "Double superscript", this.lexer, this.pos);
            }
            superscript = this.handleSupSubscript("superscript");
        } else if (lex.text === "_") {
            // We got a subscript start
            if (subscript) {
                throw new ParseError(
                    "Double subscript", this.lexer, this.pos);
            }
            subscript = this.handleSupSubscript("subscript");
        } else if (lex.text === "'") {
            // We got a prime
            var prime = new ParseNode("textord", "\\prime", this.mode);

            // Many primes can be grouped together, so we handle this here
            var primes = [prime];
            this.consume();
            // Keep lexing tokens until we get something that's not a prime
            while (this.nextToken.text === "'") {
                // For each one, add another prime to the list
                primes.push(prime);
                this.consume();
            }
            // Put them into an ordgroup as the superscript
            superscript = new ParseNode("ordgroup", primes, this.mode);
        } else {
            // If it wasn't ^, _, or ', stop parsing super/subscripts
            break;
        }
    }

    if (superscript || subscript) {
        // If we got either a superscript or subscript, create a supsub
        return new ParseNode("supsub", {
            base: base,
            sup: superscript,
            sub: subscript,
        }, this.mode);
    } else {
        // Otherwise return the original body
        return base;
    }
};

// A list of the size-changing functions, for use in parseImplicitGroup
var sizeFuncs = [
    "\\tiny", "\\scriptsize", "\\footnotesize", "\\small", "\\normalsize",
    "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge",
];

// A list of the style-changing functions, for use in parseImplicitGroup
var styleFuncs = [
    "\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle",
];

/**
 * Parses an implicit group, which is a group that starts at the end of a
 * specified, and ends right before a higher explicit group ends, or at EOL. It
 * is used for functions that appear to affect the current style, like \Large or
 * \textrm, where instead of keeping a style we just pretend that there is an
 * implicit grouping after it until the end of the group. E.g.
 *   small text {\Large large text} small text again
 * It is also used for \left and \right to get the correct grouping.
 *
 * @return {?ParseNode}
 */
Parser.prototype.parseImplicitGroup = function() {
    var start = this.parseSymbol();

    if (start == null) {
        // If we didn't get anything we handle, fall back to parseFunction
        return this.parseFunction();
    }

    var func = start.result;
    var body;

    if (func === "\\left") {
        // If we see a left:
        // Parse the entire left function (including the delimiter)
        var left = this.parseFunction(start);
        // Parse out the implicit body
        body = this.parseExpression(false);
        // Check the next token
        this.expect("\\right", false);
        var right = this.parseFunction();
        return new ParseNode("leftright", {
            body: body,
            left: left.value.value,
            right: right.value.value,
        }, this.mode);
    } else if (func === "\\begin") {
        // begin...end is similar to left...right
        var begin = this.parseFunction(start);
        var envName = begin.value.name;
        if (!environments.hasOwnProperty(envName)) {
            throw new ParseError(
                "No such environment: " + envName,
                this.lexer, begin.value.namepos);
        }
        // Build the environment object. Arguments and other information will
        // be made available to the begin and end methods using properties.
        var env = environments[envName];
        var args = this.parseArguments("\\begin{" + envName + "}", env);
        var context = {
            mode: this.mode,
            envName: envName,
            parser: this,
            lexer: this.lexer,
            positions: args.pop(),
        };
        var result = env.handler(context, args);
        this.expect("\\end", false);
        var end = this.parseFunction();
        if (end.value.name !== envName) {
            throw new ParseError(
                "Mismatch: \\begin{" + envName + "} matched " +
                "by \\end{" + end.value.name + "}",
                this.lexer /* , end.value.namepos */);
            // TODO: Add position to the above line and adjust test case,
            // requires #385 to get merged first
        }
        result.position = end.position;
        return result;
    } else if (utils.contains(sizeFuncs, func)) {
        // If we see a sizing function, parse out the implict body
        body = this.parseExpression(false);
        return new ParseNode("sizing", {
            // Figure out what size to use based on the list of functions above
            size: "size" + (utils.indexOf(sizeFuncs, func) + 1),
            value: body,
        }, this.mode);
    } else if (utils.contains(styleFuncs, func)) {
        // If we see a styling function, parse out the implict body
        body = this.parseExpression(true);
        return new ParseNode("styling", {
            // Figure out what style to use by pulling out the style from
            // the function name
            style: func.slice(1, func.length - 5),
            value: body,
        }, this.mode);
    } else {
        // Defer to parseFunction if it's not a function we handle
        return this.parseFunction(start);
    }
};

/**
 * Parses an entire function, including its base and all of its arguments.
 * The base might either have been parsed already, in which case
 * it is provided as an argument, or it's the next group in the input.
 *
 * @param {ParseFuncOrArgument=} baseGroup optional as described above
 * @return {?ParseNode}
 */
Parser.prototype.parseFunction = function(baseGroup) {
    if (!baseGroup) {
        baseGroup = this.parseGroup();
    }

    if (baseGroup) {
        if (baseGroup.isFunction) {
            var func = baseGroup.result;
            var funcData = functions[func];
            if (this.mode === "text" && !funcData.allowedInText) {
                throw new ParseError(
                    "Can't use function '" + func + "' in text mode",
                    this.lexer, baseGroup.position);
            }

            var args = this.parseArguments(func, funcData);
            var result = this.callFunction(func, args, args.pop());
            return new ParseNode(result.type, result, this.mode);
        } else {
            return baseGroup.result;
        }
    } else {
        return null;
    }
};

/**
 * Call a function handler with a suitable context and arguments.
 */
Parser.prototype.callFunction = function(name, args, positions) {
    var context = {
        funcName: name,
        parser: this,
        lexer: this.lexer,
        positions: positions,
    };
    return functions[name].handler(context, args);
};

/**
 * Parses the arguments of a function or environment
 *
 * @param {string} func  "\name" or "\begin{name}"
 * @param {{numArgs:number,numOptionalArgs:number|undefined}} funcData
 * @return the array of arguments, with the list of positions as last element
 */
Parser.prototype.parseArguments = function(func, funcData) {
    var totalArgs = funcData.numArgs + funcData.numOptionalArgs;
    if (totalArgs === 0) {
        return [[this.pos]];
    }

    var baseGreediness = funcData.greediness;
    var positions = [this.pos];
    var args = [];

    for (var i = 0; i < totalArgs; i++) {
        var argType = funcData.argTypes && funcData.argTypes[i];
        var arg;
        if (i < funcData.numOptionalArgs) {
            if (argType) {
                arg = this.parseSpecialGroup(argType, true);
            } else {
                arg = this.parseOptionalGroup();
            }
            if (!arg) {
                args.push(null);
                positions.push(this.pos);
                continue;
            }
        } else {
            if (argType) {
                arg = this.parseSpecialGroup(argType);
            } else {
                arg = this.parseGroup();
            }
            if (!arg) {
                if (!this.settings.throwOnError &&
                    this.nextToken.text[0] === "\\") {
                    arg = new ParseFuncOrArgument(
                        this.handleUnsupportedCmd(this.nextToken.text),
                        false);
                } else {
                    throw new ParseError(
                        "Expected group after '" + func + "'",
                        this.lexer, this.pos);
                }
            }
        }
        var argNode;
        if (arg.isFunction) {
            var argGreediness =
                functions[arg.result].greediness;
            if (argGreediness > baseGreediness) {
                argNode = this.parseFunction(arg);
            } else {
                throw new ParseError(
                    "Got function '" + arg.result + "' as " +
                    "argument to '" + func + "'",
                    this.lexer, this.pos - 1);
            }
        } else {
            argNode = arg.result;
        }
        args.push(argNode);
        positions.push(this.pos);
    }

    args.push(positions);

    return args;
};


/**
 * Parses a group when the mode is changing. Takes a position, a new mode, and
 * an outer mode that is used to parse the outside.
 *
 * @return {?ParseFuncOrArgument}
 */
Parser.prototype.parseSpecialGroup = function(innerMode, optional) {
    var outerMode = this.mode;
    // Handle `original` argTypes
    if (innerMode === "original") {
        innerMode = outerMode;
    }

    if (innerMode === "color" || innerMode === "size") {
        // color and size modes are special because they should have braces and
        // should only lex a single symbol inside
        var openBrace = this.nextToken;
        if (optional && openBrace.text !== "[") {
            // optional arguments should return null if they don't exist
            return null;
        }
        // The call to expect will lex the token after the '{' in inner mode
        this.mode = innerMode;
        this.expect(optional ? "[" : "{");
        var inner = this.nextToken;
        this.mode = outerMode;
        var data;
        if (innerMode === "color") {
            data = inner.text;
        } else {
            data = inner.data;
        }
        this.consume(); // consume the token stored in inner
        this.expect(optional ? "]" : "}");
        return new ParseFuncOrArgument(
            new ParseNode(innerMode, data, outerMode),
            false);
    } else if (innerMode === "text") {
        // text mode is special because it should ignore the whitespace before
        // it
        var whitespace = this.lexer.lex(this.pos, "whitespace");
        this.pos = whitespace.position;
    }

    // By the time we get here, innerMode is one of "text" or "math".
    // We switch the mode of the parser, recurse, then restore the old mode.
    this.mode = innerMode;
    this.nextToken = this.lexer.lex(this.pos, innerMode);
    var res;
    if (optional) {
        res = this.parseOptionalGroup();
    } else {
        res = this.parseGroup();
    }
    this.mode = outerMode;
    this.nextToken = this.lexer.lex(this.pos, outerMode);
    return res;
};

/**
 * Parses a group, which is either a single nucleus (like "x") or an expression
 * in braces (like "{x+y}")
 *
 * @return {?ParseFuncOrArgument}
 */
Parser.prototype.parseGroup = function() {
    // Try to parse an open brace
    if (this.nextToken.text === "{") {
        // If we get a brace, parse an expression
        this.consume();
        var expression = this.parseExpression(false);
        // Make sure we get a close brace
        this.expect("}");
        return new ParseFuncOrArgument(
            new ParseNode("ordgroup", expression, this.mode),
            false);
    } else {
        // Otherwise, just return a nucleus
        return this.parseSymbol();
    }
};

/**
 * Parses a group, which is an expression in brackets (like "[x+y]")
 *
 * @return {?ParseFuncOrArgument}
 */
Parser.prototype.parseOptionalGroup = function() {
    // Try to parse an open bracket
    if (this.nextToken.text === "[") {
        // If we get a brace, parse an expression
        this.consume();
        var expression = this.parseExpression(false, "]");
        // Make sure we get a close bracket
        this.expect("]");
        return new ParseFuncOrArgument(
            new ParseNode("ordgroup", expression, this.mode),
            false);
    } else {
        // Otherwise, return null,
        return null;
    }
};

/**
 * Parse a single symbol out of the string. Here, we handle both the functions
 * we have defined, as well as the single character symbols
 *
 * @return {?ParseFuncOrArgument}
 */
Parser.prototype.parseSymbol = function() {
    var nucleus = this.nextToken;

    if (functions[nucleus.text]) {
        this.consume();
        // If there exists a function with this name, we return the function and
        // say that it is a function.
        return new ParseFuncOrArgument(
            nucleus.text,
            true);
    } else if (symbols[this.mode][nucleus.text]) {
        this.consume();
        // Otherwise if this is a no-argument function, find the type it
        // corresponds to in the symbols map
        return new ParseFuncOrArgument(
            new ParseNode(symbols[this.mode][nucleus.text].group,
                          nucleus.text, this.mode),
            false);
    } else {
        return null;
    }
};

Parser.prototype.ParseNode = ParseNode;

module.exports = Parser;


/***/ }),

/***/ "okAn":
/***/ (function(module, exports) {

/**
 * This is a module for storing settings passed into KaTeX. It correctly handles
 * default settings.
 */

/**
 * Helper function for getting a default value if the value is undefined
 */
function get(option, defaultValue) {
    return option === undefined ? defaultValue : option;
}

/**
 * The main Settings object
 *
 * The current options stored are:
 *  - displayMode: Whether the expression should be typeset by default in
 *                 textstyle or displaystyle (default false)
 */
function Settings(options) {
    // allow null options
    options = options || {};
    this.displayMode = get(options.displayMode, false);
    this.throwOnError = get(options.throwOnError, true);
    this.errorColor = get(options.errorColor, "#cc0000");
}

module.exports = Settings;


/***/ }),

/***/ "x1ku":
/***/ (function(module, exports, __webpack_require__) {

/* eslint no-console:0 */
/**
 * This is the main entry point for KaTeX. Here, we expose functions for
 * rendering expressions either to DOM nodes or to markup strings.
 *
 * We also expose the ParseError class to check if errors thrown from KaTeX are
 * errors in the expression, or errors in javascript handling.
 */

var ParseError = __webpack_require__("E0m9");
var Settings = __webpack_require__("okAn");

var buildTree = __webpack_require__("M9y/");
var parseTree = __webpack_require__("6sUn");
var utils = __webpack_require__("s847");

/**
 * Parse and build an expression, and place that expression in the DOM node
 * given.
 */
var render = function(expression, baseNode, options) {
    utils.clearNode(baseNode);

    var settings = new Settings(options);

    var tree = parseTree(expression, settings);
    var node = buildTree(tree, expression, settings).toNode();

    baseNode.appendChild(node);
};

// KaTeX's styles don't work properly in quirks mode. Print out an error, and
// disable rendering.
if (typeof document !== "undefined") {
    if (document.compatMode !== "CSS1Compat") {
        typeof console !== "undefined" && console.warn(
            "Warning: KaTeX doesn't work in quirks mode. Make sure your " +
                "website has a suitable doctype.");

        render = function() {
            throw new ParseError("KaTeX doesn't work in quirks mode.");
        };
    }
}

/**
 * Parse and build an expression, and return the markup for that.
 */
var renderToString = function(expression, options) {
    var settings = new Settings(options);

    var tree = parseTree(expression, settings);
    return buildTree(tree, expression, settings).toMarkup();
};

/**
 * Parse an expression and return the parse tree.
 */
var generateParseTree = function(expression, options) {
    var settings = new Settings(options);
    return parseTree(expression, settings);
};

module.exports = {
    render: render,
    renderToString: renderToString,
    /**
     * NOTE: This method is not currently recommended for public use.
     * The internal tree representation is unstable and is very likely
     * to change. Use at your own risk.
     */
    __parse: generateParseTree,
    ParseError: ParseError,
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMva2F0ZXgvc3JjL0xleGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9rYXRleC9zcmMvUGFyc2VFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMva2F0ZXgvc3JjL09wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2thdGV4L3NyYy9TdHlsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMva2F0ZXgvc3JjL1BhcnNlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMva2F0ZXgvc3JjL1NldHRpbmdzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9rYXRleC9rYXRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLG1CQUFPLENBQUMsTUFBVTs7QUFFaEMsaUJBQWlCLG1CQUFPLENBQUMsTUFBYzs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxxQkFBcUI7QUFDMUI7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLLE9BQU87QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RCxFQUFFOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUNqS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7OztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDNUxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxnQkFBZ0I7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Ozs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLG1CQUFPLENBQUMsTUFBa0I7QUFDM0MsZUFBZSxtQkFBTyxDQUFDLE1BQWdCOztBQUV2QyxnQkFBZ0IsbUJBQU8sQ0FBQyxNQUFpQjtBQUN6QyxnQkFBZ0IsbUJBQU8sQ0FBQyxNQUFpQjtBQUN6QyxZQUFZLG1CQUFPLENBQUMsTUFBYTs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoidmVuZG9yfmFlYTFkZGRjLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGhlIExleGVyIGNsYXNzIGhhbmRsZXMgdG9rZW5pemluZyB0aGUgaW5wdXQgaW4gdmFyaW91cyB3YXlzLiBTaW5jZSBvdXJcbiAqIHBhcnNlciBleHBlY3RzIHVzIHRvIGJlIGFibGUgdG8gYmFja3RyYWNrLCB0aGUgbGV4ZXIgYWxsb3dzIGxleGluZyBmcm9tIGFueVxuICogZ2l2ZW4gc3RhcnRpbmcgcG9pbnQuXG4gKlxuICogSXRzIG1haW4gZXhwb3NlZCBmdW5jdGlvbiBpcyB0aGUgYGxleGAgZnVuY3Rpb24sIHdoaWNoIHRha2VzIGEgcG9zaXRpb24gdG9cbiAqIGxleCBmcm9tIGFuZCBhIHR5cGUgb2YgdG9rZW4gdG8gbGV4LiBJdCBkZWZlcnMgdG8gdGhlIGFwcHJvcHJpYXRlIGBfaW5uZXJMZXhgXG4gKiBmdW5jdGlvbi5cbiAqXG4gKiBUaGUgdmFyaW91cyBgX2lubmVyTGV4YCBmdW5jdGlvbnMgcGVyZm9ybSB0aGUgYWN0dWFsIGxleGluZyBvZiBkaWZmZXJlbnRcbiAqIGtpbmRzLlxuICovXG5cbnZhciBtYXRjaEF0ID0gcmVxdWlyZShcIm1hdGNoLWF0XCIpO1xuXG52YXIgUGFyc2VFcnJvciA9IHJlcXVpcmUoXCIuL1BhcnNlRXJyb3JcIik7XG5cbi8vIFRoZSBtYWluIGxleGVyIGNsYXNzXG5mdW5jdGlvbiBMZXhlcihpbnB1dCkge1xuICAgIHRoaXMuX2lucHV0ID0gaW5wdXQ7XG59XG5cbi8vIFRoZSByZXN1bHRpbmcgdG9rZW4gcmV0dXJuZWQgZnJvbSBgbGV4YC5cbmZ1bmN0aW9uIFRva2VuKHRleHQsIGRhdGEsIHBvc2l0aW9uKSB7XG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbn1cblxuLyogVGhlIGZvbGxvd2luZyB0b2tlblJlZ2V4XG4gKiAtIG1hdGNoZXMgdHlwaWNhbCB3aGl0ZXNwYWNlIChidXQgbm90IE5CU1AgZXRjLikgdXNpbmcgaXRzIGZpcnN0IGdyb3VwXG4gKiAtIG1hdGNoZXMgc3ltYm9sIGNvbWJpbmF0aW9ucyB3aGljaCByZXN1bHQgaW4gYSBzaW5nbGUgb3V0cHV0IGNoYXJhY3RlclxuICogLSBkb2VzIG5vdCBtYXRjaCBhbnkgY29udHJvbCBjaGFyYWN0ZXIgXFx4MDAtXFx4MWYgZXhjZXB0IHdoaXRlc3BhY2VcbiAqIC0gZG9lcyBub3QgbWF0Y2ggYSBiYXJlIGJhY2tzbGFzaFxuICogLSBtYXRjaGVzIGFueSBBU0NJSSBjaGFyYWN0ZXIgZXhjZXB0IHRob3NlIGp1c3QgbWVudGlvbmVkXG4gKiAtIGRvZXMgbm90IG1hdGNoIHRoZSBCTVAgcHJpdmF0ZSB1c2UgYXJlYSBcXHVFMDAwLVxcdUY4RkZcbiAqIC0gZG9lcyBub3QgbWF0Y2ggYmFyZSBzdXJyb2dhdGUgY29kZSB1bml0c1xuICogLSBtYXRjaGVzIGFueSBCTVAgY2hhcmFjdGVyIGV4Y2VwdCBmb3IgdGhvc2UganVzdCBkZXNjcmliZWRcbiAqIC0gbWF0Y2hlcyBhbnkgdmFsaWQgVW5pY29kZSBzdXJyb2dhdGUgcGFpclxuICogLSBtYXRjaGVzIGEgYmFja3NsYXNoIGZvbGxvd2VkIGJ5IG9uZSBvciBtb3JlIGxldHRlcnNcbiAqIC0gbWF0Y2hlcyBhIGJhY2tzbGFzaCBmb2xsb3dlZCBieSBhbnkgQk1QIGNoYXJhY3RlciwgaW5jbHVkaW5nIG5ld2xpbmVcbiAqIEp1c3QgYmVjYXVzZSB0aGUgTGV4ZXIgbWF0Y2hlcyBzb21ldGhpbmcgZG9lc24ndCBtZWFuIGl0J3MgdmFsaWQgaW5wdXQ6XG4gKiBJZiB0aGVyZSBpcyBubyBtYXRjaGluZyBmdW5jdGlvbiBvciBzeW1ib2wgZGVmaW5pdGlvbiwgdGhlIFBhcnNlciB3aWxsXG4gKiBzdGlsbCByZWplY3QgdGhlIGlucHV0LlxuICovXG52YXIgdG9rZW5SZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgXCIoWyBcXHJcXG5cXHRdKyl8KFwiICsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdoaXRlc3BhY2VcbiAgICBcIi0tLT9cIiArICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3BlY2lhbCBjb21iaW5hdGlvbnNcbiAgICBcInxbIS1cXFxcW1xcXFxdLVxcdTIwMjdcXHUyMDJBLVxcdUQ3RkZcXHVGOTAwLVxcdUZGRkZdXCIgKyAgLy8gc2luZ2xlIGNvZGVwb2ludFxuICAgIFwifFtcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl1cIiArICAgICAgICAgICAgICAgLy8gc3Vycm9nYXRlIHBhaXJcbiAgICBcInxcXFxcXFxcXCg/OlthLXpBLVpdK3xbXlxcdUQ4MDAtXFx1REZGRl0pXCIgKyAgICAgICAgICAgLy8gZnVuY3Rpb24gbmFtZVxuICAgIFwiKVwiXG4pO1xuXG52YXIgd2hpdGVzcGFjZVJlZ2V4ID0gL1xccyovO1xuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gbGV4ZXMgYSBzaW5nbGUgbm9ybWFsIHRva2VuLiBJdCB0YWtlcyBhIHBvc2l0aW9uIGFuZFxuICogd2hldGhlciBpdCBzaG91bGQgY29tcGxldGVseSBpZ25vcmUgd2hpdGVzcGFjZSBvciBub3QuXG4gKi9cbkxleGVyLnByb3RvdHlwZS5faW5uZXJMZXggPSBmdW5jdGlvbihwb3MsIGlnbm9yZVdoaXRlc3BhY2UpIHtcbiAgICB2YXIgaW5wdXQgPSB0aGlzLl9pbnB1dDtcbiAgICBpZiAocG9zID09PSBpbnB1dC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUb2tlbihcIkVPRlwiLCBudWxsLCBwb3MpO1xuICAgIH1cbiAgICB2YXIgbWF0Y2ggPSBtYXRjaEF0KHRva2VuUmVnZXgsIGlucHV0LCBwb3MpO1xuICAgIGlmIChtYXRjaCA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgUGFyc2VFcnJvcihcbiAgICAgICAgICAgIFwiVW5leHBlY3RlZCBjaGFyYWN0ZXI6ICdcIiArIGlucHV0W3Bvc10gKyBcIidcIixcbiAgICAgICAgICAgIHRoaXMsIHBvcyk7XG4gICAgfSBlbHNlIGlmIChtYXRjaFsyXSkgeyAvLyBtYXRjaGVkIG5vbi13aGl0ZXNwYWNlXG4gICAgICAgIHJldHVybiBuZXcgVG9rZW4obWF0Y2hbMl0sIG51bGwsIHBvcyArIG1hdGNoWzJdLmxlbmd0aCk7XG4gICAgfSBlbHNlIGlmIChpZ25vcmVXaGl0ZXNwYWNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbm5lckxleChwb3MgKyBtYXRjaFsxXS5sZW5ndGgsIHRydWUpO1xuICAgIH0gZWxzZSB7IC8vIGNvbmNhdGVuYXRlIHdoaXRlc3BhY2UgdG8gYSBzaW5nbGUgc3BhY2VcbiAgICAgICAgcmV0dXJuIG5ldyBUb2tlbihcIiBcIiwgbnVsbCwgcG9zICsgbWF0Y2hbMV0ubGVuZ3RoKTtcbiAgICB9XG59O1xuXG4vLyBBIHJlZ2V4IHRvIG1hdGNoIGEgQ1NTIGNvbG9yIChsaWtlICNmZmZmZmYgb3IgQmx1ZVZpb2xldClcbnZhciBjc3NDb2xvciA9IC8jW2EtejAtOV0rfFthLXpdKy9pO1xuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gbGV4ZXMgYSBDU1MgY29sb3IuXG4gKi9cbkxleGVyLnByb3RvdHlwZS5faW5uZXJMZXhDb2xvciA9IGZ1bmN0aW9uKHBvcykge1xuICAgIHZhciBpbnB1dCA9IHRoaXMuX2lucHV0O1xuXG4gICAgLy8gSWdub3JlIHdoaXRlc3BhY2VcbiAgICB2YXIgd2hpdGVzcGFjZSA9IG1hdGNoQXQod2hpdGVzcGFjZVJlZ2V4LCBpbnB1dCwgcG9zKVswXTtcbiAgICBwb3MgKz0gd2hpdGVzcGFjZS5sZW5ndGg7XG5cbiAgICB2YXIgbWF0Y2g7XG4gICAgaWYgKChtYXRjaCA9IG1hdGNoQXQoY3NzQ29sb3IsIGlucHV0LCBwb3MpKSkge1xuICAgICAgICAvLyBJZiB3ZSBsb29rIGxpa2UgYSBjb2xvciwgcmV0dXJuIGEgY29sb3JcbiAgICAgICAgcmV0dXJuIG5ldyBUb2tlbihtYXRjaFswXSwgbnVsbCwgcG9zICsgbWF0Y2hbMF0ubGVuZ3RoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgUGFyc2VFcnJvcihcIkludmFsaWQgY29sb3JcIiwgdGhpcywgcG9zKTtcbiAgICB9XG59O1xuXG4vLyBBIHJlZ2V4IHRvIG1hdGNoIGEgZGltZW5zaW9uLiBEaW1lbnNpb25zIGxvb2sgbGlrZVxuLy8gXCIxLjJlbVwiIG9yIFwiLjRwdFwiIG9yIFwiMSBleFwiXG52YXIgc2l6ZVJlZ2V4ID0gLygtPylcXHMqKFxcZCsoPzpcXC5cXGQqKT98XFwuXFxkKylcXHMqKFthLXpdezJ9KS87XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBsZXhlcyBhIGRpbWVuc2lvbi5cbiAqL1xuTGV4ZXIucHJvdG90eXBlLl9pbm5lckxleFNpemUgPSBmdW5jdGlvbihwb3MpIHtcbiAgICB2YXIgaW5wdXQgPSB0aGlzLl9pbnB1dDtcblxuICAgIC8vIElnbm9yZSB3aGl0ZXNwYWNlXG4gICAgdmFyIHdoaXRlc3BhY2UgPSBtYXRjaEF0KHdoaXRlc3BhY2VSZWdleCwgaW5wdXQsIHBvcylbMF07XG4gICAgcG9zICs9IHdoaXRlc3BhY2UubGVuZ3RoO1xuXG4gICAgdmFyIG1hdGNoO1xuICAgIGlmICgobWF0Y2ggPSBtYXRjaEF0KHNpemVSZWdleCwgaW5wdXQsIHBvcykpKSB7XG4gICAgICAgIHZhciB1bml0ID0gbWF0Y2hbM107XG4gICAgICAgIC8vIFdlIG9ubHkgY3VycmVudGx5IGhhbmRsZSBcImVtXCIgYW5kIFwiZXhcIiB1bml0c1xuICAgICAgICBpZiAodW5pdCAhPT0gXCJlbVwiICYmIHVuaXQgIT09IFwiZXhcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXJyb3IoXCJJbnZhbGlkIHVuaXQ6ICdcIiArIHVuaXQgKyBcIidcIiwgdGhpcywgcG9zKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFRva2VuKG1hdGNoWzBdLCB7XG4gICAgICAgICAgICBudW1iZXI6ICsobWF0Y2hbMV0gKyBtYXRjaFsyXSksXG4gICAgICAgICAgICB1bml0OiB1bml0LFxuICAgICAgICB9LCBwb3MgKyBtYXRjaFswXS5sZW5ndGgpO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBQYXJzZUVycm9yKFwiSW52YWxpZCBzaXplXCIsIHRoaXMsIHBvcyk7XG59O1xuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gbGV4ZXMgYSBzdHJpbmcgb2Ygd2hpdGVzcGFjZS5cbiAqL1xuTGV4ZXIucHJvdG90eXBlLl9pbm5lckxleFdoaXRlc3BhY2UgPSBmdW5jdGlvbihwb3MpIHtcbiAgICB2YXIgaW5wdXQgPSB0aGlzLl9pbnB1dDtcblxuICAgIHZhciB3aGl0ZXNwYWNlID0gbWF0Y2hBdCh3aGl0ZXNwYWNlUmVnZXgsIGlucHV0LCBwb3MpWzBdO1xuICAgIHBvcyArPSB3aGl0ZXNwYWNlLmxlbmd0aDtcblxuICAgIHJldHVybiBuZXcgVG9rZW4od2hpdGVzcGFjZVswXSwgbnVsbCwgcG9zKTtcbn07XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBsZXhlcyBhIHNpbmdsZSB0b2tlbiBzdGFydGluZyBhdCBgcG9zYCBhbmQgb2YgdGhlIGdpdmVuIG1vZGUuXG4gKiBCYXNlZCBvbiB0aGUgbW9kZSwgd2UgZGVmZXIgdG8gb25lIG9mIHRoZSBgX2lubmVyTGV4YCBmdW5jdGlvbnMuXG4gKi9cbkxleGVyLnByb3RvdHlwZS5sZXggPSBmdW5jdGlvbihwb3MsIG1vZGUpIHtcbiAgICBpZiAobW9kZSA9PT0gXCJtYXRoXCIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lubmVyTGV4KHBvcywgdHJ1ZSk7XG4gICAgfSBlbHNlIGlmIChtb2RlID09PSBcInRleHRcIikge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5uZXJMZXgocG9zLCBmYWxzZSk7XG4gICAgfSBlbHNlIGlmIChtb2RlID09PSBcImNvbG9yXCIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lubmVyTGV4Q29sb3IocG9zKTtcbiAgICB9IGVsc2UgaWYgKG1vZGUgPT09IFwic2l6ZVwiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbm5lckxleFNpemUocG9zKTtcbiAgICB9IGVsc2UgaWYgKG1vZGUgPT09IFwid2hpdGVzcGFjZVwiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbm5lckxleFdoaXRlc3BhY2UocG9zKTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExleGVyO1xuIiwiLyoqXG4gKiBUaGlzIGlzIHRoZSBQYXJzZUVycm9yIGNsYXNzLCB3aGljaCBpcyB0aGUgbWFpbiBlcnJvciB0aHJvd24gYnkgS2FUZVhcbiAqIGZ1bmN0aW9ucyB3aGVuIHNvbWV0aGluZyBoYXMgZ29uZSB3cm9uZy4gVGhpcyBpcyB1c2VkIHRvIGRpc3Rpbmd1aXNoIGludGVybmFsXG4gKiBlcnJvcnMgZnJvbSBlcnJvcnMgaW4gdGhlIGV4cHJlc3Npb24gdGhhdCB0aGUgdXNlciBwcm92aWRlZC5cbiAqL1xuZnVuY3Rpb24gUGFyc2VFcnJvcihtZXNzYWdlLCBsZXhlciwgcG9zaXRpb24pIHtcbiAgICB2YXIgZXJyb3IgPSBcIkthVGVYIHBhcnNlIGVycm9yOiBcIiArIG1lc3NhZ2U7XG5cbiAgICBpZiAobGV4ZXIgIT09IHVuZGVmaW5lZCAmJiBwb3NpdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIElmIHdlIGhhdmUgdGhlIGlucHV0IGFuZCBhIHBvc2l0aW9uLCBtYWtlIHRoZSBlcnJvciBhIGJpdCBmYW5jaWVyXG5cbiAgICAgICAgLy8gUHJlcGVuZCBzb21lIGluZm9ybWF0aW9uXG4gICAgICAgIGVycm9yICs9IFwiIGF0IHBvc2l0aW9uIFwiICsgcG9zaXRpb24gKyBcIjogXCI7XG5cbiAgICAgICAgLy8gR2V0IHRoZSBpbnB1dFxuICAgICAgICB2YXIgaW5wdXQgPSBsZXhlci5faW5wdXQ7XG4gICAgICAgIC8vIEluc2VydCBhIGNvbWJpbmluZyB1bmRlcnNjb3JlIGF0IHRoZSBjb3JyZWN0IHBvc2l0aW9uXG4gICAgICAgIGlucHV0ID0gaW5wdXQuc2xpY2UoMCwgcG9zaXRpb24pICsgXCJcXHUwMzMyXCIgK1xuICAgICAgICAgICAgaW5wdXQuc2xpY2UocG9zaXRpb24pO1xuXG4gICAgICAgIC8vIEV4dHJhY3Qgc29tZSBjb250ZXh0IGZyb20gdGhlIGlucHV0IGFuZCBhZGQgaXQgdG8gdGhlIGVycm9yXG4gICAgICAgIHZhciBiZWdpbiA9IE1hdGgubWF4KDAsIHBvc2l0aW9uIC0gMTUpO1xuICAgICAgICB2YXIgZW5kID0gcG9zaXRpb24gKyAxNTtcbiAgICAgICAgZXJyb3IgKz0gaW5wdXQuc2xpY2UoYmVnaW4sIGVuZCk7XG4gICAgfVxuXG4gICAgLy8gU29tZSBoYWNrZXJ5IHRvIG1ha2UgUGFyc2VFcnJvciBhIHByb3RvdHlwZSBvZiBFcnJvclxuICAgIC8vIFNlZSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS84NDYwNzUzXG4gICAgdmFyIHNlbGYgPSBuZXcgRXJyb3IoZXJyb3IpO1xuICAgIHNlbGYubmFtZSA9IFwiUGFyc2VFcnJvclwiO1xuICAgIHNlbGYuX19wcm90b19fID0gUGFyc2VFcnJvci5wcm90b3R5cGU7XG5cbiAgICBzZWxmLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgcmV0dXJuIHNlbGY7XG59XG5cbi8vIE1vcmUgaGFja2VyeVxuUGFyc2VFcnJvci5wcm90b3R5cGUuX19wcm90b19fID0gRXJyb3IucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhcnNlRXJyb3I7XG4iLCIvKipcbiAqIFRoaXMgZmlsZSBjb250YWlucyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgb3B0aW9ucyB0aGF0IHRoZSBQYXJzZXIgY2Fycmllc1xuICogYXJvdW5kIHdpdGggaXQgd2hpbGUgcGFyc2luZy4gRGF0YSBpcyBoZWxkIGluIGFuIGBPcHRpb25zYCBvYmplY3QsIGFuZCB3aGVuXG4gKiByZWN1cnNpbmcsIGEgbmV3IGBPcHRpb25zYCBvYmplY3QgY2FuIGJlIGNyZWF0ZWQgd2l0aCB0aGUgYC53aXRoKmAgYW5kXG4gKiBgLnJlc2V0YCBmdW5jdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBtYWluIG9wdGlvbnMgY2xhc3MuIEl0IGNvbnRhaW5zIHRoZSBzdHlsZSwgc2l6ZSwgY29sb3IsIGFuZCBmb250XG4gKiBvZiB0aGUgY3VycmVudCBwYXJzZSBsZXZlbC4gSXQgYWxzbyBjb250YWlucyB0aGUgc3R5bGUgYW5kIHNpemUgb2YgdGhlIHBhcmVudFxuICogcGFyc2UgbGV2ZWwsIHNvIHNpemUgY2hhbmdlcyBjYW4gYmUgaGFuZGxlZCBlZmZpY2llbnRseS5cbiAqXG4gKiBFYWNoIG9mIHRoZSBgLndpdGgqYCBhbmQgYC5yZXNldGAgZnVuY3Rpb25zIHBhc3NlcyBpdHMgY3VycmVudCBzdHlsZSBhbmQgc2l6ZVxuICogYXMgdGhlIHBhcmVudFN0eWxlIGFuZCBwYXJlbnRTaXplIG9mIHRoZSBuZXcgb3B0aW9ucyBjbGFzcywgc28gcGFyZW50XG4gKiBoYW5kbGluZyBpcyB0YWtlbiBjYXJlIG9mIGF1dG9tYXRpY2FsbHkuXG4gKi9cbmZ1bmN0aW9uIE9wdGlvbnMoZGF0YSkge1xuICAgIHRoaXMuc3R5bGUgPSBkYXRhLnN0eWxlO1xuICAgIHRoaXMuY29sb3IgPSBkYXRhLmNvbG9yO1xuICAgIHRoaXMuc2l6ZSA9IGRhdGEuc2l6ZTtcbiAgICB0aGlzLnBoYW50b20gPSBkYXRhLnBoYW50b207XG4gICAgdGhpcy5mb250ID0gZGF0YS5mb250O1xuXG4gICAgaWYgKGRhdGEucGFyZW50U3R5bGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnBhcmVudFN0eWxlID0gZGF0YS5zdHlsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBhcmVudFN0eWxlID0gZGF0YS5wYXJlbnRTdHlsZTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5wYXJlbnRTaXplID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5wYXJlbnRTaXplID0gZGF0YS5zaXplO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGFyZW50U2l6ZSA9IGRhdGEucGFyZW50U2l6ZTtcbiAgICB9XG59XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBvcHRpb25zIG9iamVjdCB3aXRoIHRoZSBzYW1lIHByb3BlcnRpZXMgYXMgXCJ0aGlzXCIuICBQcm9wZXJ0aWVzXG4gKiBmcm9tIFwiZXh0ZW5zaW9uXCIgd2lsbCBiZSBjb3BpZWQgdG8gdGhlIG5ldyBvcHRpb25zIG9iamVjdC5cbiAqL1xuT3B0aW9ucy5wcm90b3R5cGUuZXh0ZW5kID0gZnVuY3Rpb24oZXh0ZW5zaW9uKSB7XG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHN0eWxlOiB0aGlzLnN0eWxlLFxuICAgICAgICBzaXplOiB0aGlzLnNpemUsXG4gICAgICAgIGNvbG9yOiB0aGlzLmNvbG9yLFxuICAgICAgICBwYXJlbnRTdHlsZTogdGhpcy5zdHlsZSxcbiAgICAgICAgcGFyZW50U2l6ZTogdGhpcy5zaXplLFxuICAgICAgICBwaGFudG9tOiB0aGlzLnBoYW50b20sXG4gICAgICAgIGZvbnQ6IHRoaXMuZm9udCxcbiAgICB9O1xuXG4gICAgZm9yICh2YXIga2V5IGluIGV4dGVuc2lvbikge1xuICAgICAgICBpZiAoZXh0ZW5zaW9uLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIGRhdGFba2V5XSA9IGV4dGVuc2lvbltrZXldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBPcHRpb25zKGRhdGEpO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgb3B0aW9ucyBvYmplY3Qgd2l0aCB0aGUgZ2l2ZW4gc3R5bGUuXG4gKi9cbk9wdGlvbnMucHJvdG90eXBlLndpdGhTdHlsZSA9IGZ1bmN0aW9uKHN0eWxlKSB7XG4gICAgcmV0dXJuIHRoaXMuZXh0ZW5kKHtcbiAgICAgICAgc3R5bGU6IHN0eWxlLFxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgb3B0aW9ucyBvYmplY3Qgd2l0aCB0aGUgZ2l2ZW4gc2l6ZS5cbiAqL1xuT3B0aW9ucy5wcm90b3R5cGUud2l0aFNpemUgPSBmdW5jdGlvbihzaXplKSB7XG4gICAgcmV0dXJuIHRoaXMuZXh0ZW5kKHtcbiAgICAgICAgc2l6ZTogc2l6ZSxcbiAgICB9KTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IG9wdGlvbnMgb2JqZWN0IHdpdGggdGhlIGdpdmVuIGNvbG9yLlxuICovXG5PcHRpb25zLnByb3RvdHlwZS53aXRoQ29sb3IgPSBmdW5jdGlvbihjb2xvcikge1xuICAgIHJldHVybiB0aGlzLmV4dGVuZCh7XG4gICAgICAgIGNvbG9yOiBjb2xvcixcbiAgICB9KTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IG9wdGlvbnMgb2JqZWN0IHdpdGggXCJwaGFudG9tXCIgc2V0IHRvIHRydWUuXG4gKi9cbk9wdGlvbnMucHJvdG90eXBlLndpdGhQaGFudG9tID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZXh0ZW5kKHtcbiAgICAgICAgcGhhbnRvbTogdHJ1ZSxcbiAgICB9KTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IG9wdGlvbnMgb2JqZWN0cyB3aXRoIHRoZSBnaXZlIGZvbnQuXG4gKi9cbk9wdGlvbnMucHJvdG90eXBlLndpdGhGb250ID0gZnVuY3Rpb24oZm9udCkge1xuICAgIHJldHVybiB0aGlzLmV4dGVuZCh7XG4gICAgICAgIGZvbnQ6IGZvbnQsXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBvcHRpb25zIG9iamVjdCB3aXRoIHRoZSBzYW1lIHN0eWxlLCBzaXplLCBhbmQgY29sb3IuIFRoaXMgaXNcbiAqIHVzZWQgc28gdGhhdCBwYXJlbnQgc3R5bGUgYW5kIHNpemUgY2hhbmdlcyBhcmUgaGFuZGxlZCBjb3JyZWN0bHkuXG4gKi9cbk9wdGlvbnMucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZXh0ZW5kKHt9KTtcbn07XG5cbi8qKlxuICogQSBtYXAgb2YgY29sb3IgbmFtZXMgdG8gQ1NTIGNvbG9ycy5cbiAqIFRPRE8oZW1pbHkpOiBSZW1vdmUgdGhpcyB3aGVuIHdlIGhhdmUgcmVhbCBtYWNyb3NcbiAqL1xudmFyIGNvbG9yTWFwID0ge1xuICAgIFwia2F0ZXgtYmx1ZVwiOiBcIiM2NDk1ZWRcIixcbiAgICBcImthdGV4LW9yYW5nZVwiOiBcIiNmZmE1MDBcIixcbiAgICBcImthdGV4LXBpbmtcIjogXCIjZmYwMGFmXCIsXG4gICAgXCJrYXRleC1yZWRcIjogXCIjZGYwMDMwXCIsXG4gICAgXCJrYXRleC1ncmVlblwiOiBcIiMyOGFlN2JcIixcbiAgICBcImthdGV4LWdyYXlcIjogXCJncmF5XCIsXG4gICAgXCJrYXRleC1wdXJwbGVcIjogXCIjOWQzOGJkXCIsXG4gICAgXCJrYXRleC1ibHVlQVwiOiBcIiNjN2U5ZjFcIixcbiAgICBcImthdGV4LWJsdWVCXCI6IFwiIzljZGNlYlwiLFxuICAgIFwia2F0ZXgtYmx1ZUNcIjogXCIjNThjNGRkXCIsXG4gICAgXCJrYXRleC1ibHVlRFwiOiBcIiMyOWFiY2FcIixcbiAgICBcImthdGV4LWJsdWVFXCI6IFwiIzFjNzU4YVwiLFxuICAgIFwia2F0ZXgtdGVhbEFcIjogXCIjYWNlYWQ3XCIsXG4gICAgXCJrYXRleC10ZWFsQlwiOiBcIiM3NmRkYzBcIixcbiAgICBcImthdGV4LXRlYWxDXCI6IFwiIzVjZDBiM1wiLFxuICAgIFwia2F0ZXgtdGVhbERcIjogXCIjNTVjMWE3XCIsXG4gICAgXCJrYXRleC10ZWFsRVwiOiBcIiM0OWE4OGZcIixcbiAgICBcImthdGV4LWdyZWVuQVwiOiBcIiNjOWUyYWVcIixcbiAgICBcImthdGV4LWdyZWVuQlwiOiBcIiNhNmNmOGNcIixcbiAgICBcImthdGV4LWdyZWVuQ1wiOiBcIiM4M2MxNjdcIixcbiAgICBcImthdGV4LWdyZWVuRFwiOiBcIiM3N2IwNWRcIixcbiAgICBcImthdGV4LWdyZWVuRVwiOiBcIiM2OTljNTJcIixcbiAgICBcImthdGV4LWdvbGRBXCI6IFwiI2Y3Yzc5N1wiLFxuICAgIFwia2F0ZXgtZ29sZEJcIjogXCIjZjliNzc1XCIsXG4gICAgXCJrYXRleC1nb2xkQ1wiOiBcIiNmMGFjNWZcIixcbiAgICBcImthdGV4LWdvbGREXCI6IFwiI2UxYTE1OFwiLFxuICAgIFwia2F0ZXgtZ29sZEVcIjogXCIjYzc4ZDQ2XCIsXG4gICAgXCJrYXRleC1yZWRBXCI6IFwiI2Y3YTFhM1wiLFxuICAgIFwia2F0ZXgtcmVkQlwiOiBcIiNmZjgwODBcIixcbiAgICBcImthdGV4LXJlZENcIjogXCIjZmM2MjU1XCIsXG4gICAgXCJrYXRleC1yZWREXCI6IFwiI2U2NWE0Y1wiLFxuICAgIFwia2F0ZXgtcmVkRVwiOiBcIiNjZjUwNDRcIixcbiAgICBcImthdGV4LW1hcm9vbkFcIjogXCIjZWNhYmMxXCIsXG4gICAgXCJrYXRleC1tYXJvb25CXCI6IFwiI2VjOTJhYlwiLFxuICAgIFwia2F0ZXgtbWFyb29uQ1wiOiBcIiNjNTVmNzNcIixcbiAgICBcImthdGV4LW1hcm9vbkRcIjogXCIjYTI0ZDYxXCIsXG4gICAgXCJrYXRleC1tYXJvb25FXCI6IFwiIzk0NDI0ZlwiLFxuICAgIFwia2F0ZXgtcHVycGxlQVwiOiBcIiNjYWEzZThcIixcbiAgICBcImthdGV4LXB1cnBsZUJcIjogXCIjYjE4OWM2XCIsXG4gICAgXCJrYXRleC1wdXJwbGVDXCI6IFwiIzlhNzJhY1wiLFxuICAgIFwia2F0ZXgtcHVycGxlRFwiOiBcIiM3MTU1ODJcIixcbiAgICBcImthdGV4LXB1cnBsZUVcIjogXCIjNjQ0MTcyXCIsXG4gICAgXCJrYXRleC1taW50QVwiOiBcIiNmNWY5ZThcIixcbiAgICBcImthdGV4LW1pbnRCXCI6IFwiI2VkZjJkZlwiLFxuICAgIFwia2F0ZXgtbWludENcIjogXCIjZTBlNWNjXCIsXG4gICAgXCJrYXRleC1ncmF5QVwiOiBcIiNmZGZkZmRcIixcbiAgICBcImthdGV4LWdyYXlCXCI6IFwiI2Y3ZjdmN1wiLFxuICAgIFwia2F0ZXgtZ3JheUNcIjogXCIjZWVlZWVlXCIsXG4gICAgXCJrYXRleC1ncmF5RFwiOiBcIiNkZGRkZGRcIixcbiAgICBcImthdGV4LWdyYXlFXCI6IFwiI2NjY2NjY1wiLFxuICAgIFwia2F0ZXgtZ3JheUZcIjogXCIjYWFhYWFhXCIsXG4gICAgXCJrYXRleC1ncmF5R1wiOiBcIiM5OTk5OTlcIixcbiAgICBcImthdGV4LWdyYXlIXCI6IFwiIzU1NTU1NVwiLFxuICAgIFwia2F0ZXgtZ3JheUlcIjogXCIjMzMzMzMzXCIsXG4gICAgXCJrYXRleC1rYUJsdWVcIjogXCIjMzE0NDUzXCIsXG4gICAgXCJrYXRleC1rYUdyZWVuXCI6IFwiIzYzOWIyNFwiLFxufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBDU1MgY29sb3Igb2YgdGhlIGN1cnJlbnQgb3B0aW9ucyBvYmplY3QsIGFjY291bnRpbmcgZm9yIHRoZVxuICogYGNvbG9yTWFwYC5cbiAqL1xuT3B0aW9ucy5wcm90b3R5cGUuZ2V0Q29sb3IgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5waGFudG9tKSB7XG4gICAgICAgIHJldHVybiBcInRyYW5zcGFyZW50XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNvbG9yTWFwW3RoaXMuY29sb3JdIHx8IHRoaXMuY29sb3I7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPcHRpb25zO1xuIiwiLyoqXG4gKiBUaGlzIGZpbGUgY29udGFpbnMgaW5mb3JtYXRpb24gYW5kIGNsYXNzZXMgZm9yIHRoZSB2YXJpb3VzIGtpbmRzIG9mIHN0eWxlc1xuICogdXNlZCBpbiBUZVguIEl0IHByb3ZpZGVzIGEgZ2VuZXJpYyBgU3R5bGVgIGNsYXNzLCB3aGljaCBob2xkcyBpbmZvcm1hdGlvblxuICogYWJvdXQgYSBzcGVjaWZpYyBzdHlsZS4gSXQgdGhlbiBwcm92aWRlcyBpbnN0YW5jZXMgb2YgYWxsIHRoZSBkaWZmZXJlbnQga2luZHNcbiAqIG9mIHN0eWxlcyBwb3NzaWJsZSwgYW5kIHByb3ZpZGVzIGZ1bmN0aW9ucyB0byBtb3ZlIGJldHdlZW4gdGhlbSBhbmQgZ2V0XG4gKiBpbmZvcm1hdGlvbiBhYm91dCB0aGVtLlxuICovXG5cbi8qKlxuICogVGhlIG1haW4gc3R5bGUgY2xhc3MuIENvbnRhaW5zIGEgdW5pcXVlIGlkIGZvciB0aGUgc3R5bGUsIGEgc2l6ZSAod2hpY2ggaXNcbiAqIHRoZSBzYW1lIGZvciBjcmFtcGVkIGFuZCB1bmNyYW1wZWQgdmVyc2lvbiBvZiBhIHN0eWxlKSwgYSBjcmFtcGVkIGZsYWcsIGFuZCBhXG4gKiBzaXplIG11bHRpcGxpZXIsIHdoaWNoIGdpdmVzIHRoZSBzaXplIGRpZmZlcmVuY2UgYmV0d2VlbiBhIHN0eWxlIGFuZFxuICogdGV4dHN0eWxlLlxuICovXG5mdW5jdGlvbiBTdHlsZShpZCwgc2l6ZSwgbXVsdGlwbGllciwgY3JhbXBlZCkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgIHRoaXMuY3JhbXBlZCA9IGNyYW1wZWQ7XG4gICAgdGhpcy5zaXplTXVsdGlwbGllciA9IG11bHRpcGxpZXI7XG59XG5cbi8qKlxuICogR2V0IHRoZSBzdHlsZSBvZiBhIHN1cGVyc2NyaXB0IGdpdmVuIGEgYmFzZSBpbiB0aGUgY3VycmVudCBzdHlsZS5cbiAqL1xuU3R5bGUucHJvdG90eXBlLnN1cCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBzdHlsZXNbc3VwW3RoaXMuaWRdXTtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBzdHlsZSBvZiBhIHN1YnNjcmlwdCBnaXZlbiBhIGJhc2UgaW4gdGhlIGN1cnJlbnQgc3R5bGUuXG4gKi9cblN0eWxlLnByb3RvdHlwZS5zdWIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gc3R5bGVzW3N1Ylt0aGlzLmlkXV07XG59O1xuXG4vKipcbiAqIEdldCB0aGUgc3R5bGUgb2YgYSBmcmFjdGlvbiBudW1lcmF0b3IgZ2l2ZW4gdGhlIGZyYWN0aW9uIGluIHRoZSBjdXJyZW50XG4gKiBzdHlsZS5cbiAqL1xuU3R5bGUucHJvdG90eXBlLmZyYWNOdW0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gc3R5bGVzW2ZyYWNOdW1bdGhpcy5pZF1dO1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIHN0eWxlIG9mIGEgZnJhY3Rpb24gZGVub21pbmF0b3IgZ2l2ZW4gdGhlIGZyYWN0aW9uIGluIHRoZSBjdXJyZW50XG4gKiBzdHlsZS5cbiAqL1xuU3R5bGUucHJvdG90eXBlLmZyYWNEZW4gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gc3R5bGVzW2ZyYWNEZW5bdGhpcy5pZF1dO1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIGNyYW1wZWQgdmVyc2lvbiBvZiBhIHN0eWxlIChpbiBwYXJ0aWN1bGFyLCBjcmFtcGluZyBhIGNyYW1wZWQgc3R5bGVcbiAqIGRvZXNuJ3QgY2hhbmdlIHRoZSBzdHlsZSkuXG4gKi9cblN0eWxlLnByb3RvdHlwZS5jcmFtcCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBzdHlsZXNbY3JhbXBbdGhpcy5pZF1dO1xufTtcblxuLyoqXG4gKiBIVE1MIGNsYXNzIG5hbWUsIGxpa2UgXCJkaXNwbGF5c3R5bGUgY3JhbXBlZFwiXG4gKi9cblN0eWxlLnByb3RvdHlwZS5jbHMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gc2l6ZU5hbWVzW3RoaXMuc2l6ZV0gKyAodGhpcy5jcmFtcGVkID8gXCIgY3JhbXBlZFwiIDogXCIgdW5jcmFtcGVkXCIpO1xufTtcblxuLyoqXG4gKiBIVE1MIFJlc2V0IGNsYXNzIG5hbWUsIGxpa2UgXCJyZXNldC10ZXh0c3R5bGVcIlxuICovXG5TdHlsZS5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gcmVzZXROYW1lc1t0aGlzLnNpemVdO1xufTtcblxuLy8gSURzIG9mIHRoZSBkaWZmZXJlbnQgc3R5bGVzXG52YXIgRCA9IDA7XG52YXIgRGMgPSAxO1xudmFyIFQgPSAyO1xudmFyIFRjID0gMztcbnZhciBTID0gNDtcbnZhciBTYyA9IDU7XG52YXIgU1MgPSA2O1xudmFyIFNTYyA9IDc7XG5cbi8vIFN0cmluZyBuYW1lcyBmb3IgdGhlIGRpZmZlcmVudCBzaXplc1xudmFyIHNpemVOYW1lcyA9IFtcbiAgICBcImRpc3BsYXlzdHlsZSB0ZXh0c3R5bGVcIixcbiAgICBcInRleHRzdHlsZVwiLFxuICAgIFwic2NyaXB0c3R5bGVcIixcbiAgICBcInNjcmlwdHNjcmlwdHN0eWxlXCIsXG5dO1xuXG4vLyBSZXNldCBuYW1lcyBmb3IgdGhlIGRpZmZlcmVudCBzaXplc1xudmFyIHJlc2V0TmFtZXMgPSBbXG4gICAgXCJyZXNldC10ZXh0c3R5bGVcIixcbiAgICBcInJlc2V0LXRleHRzdHlsZVwiLFxuICAgIFwicmVzZXQtc2NyaXB0c3R5bGVcIixcbiAgICBcInJlc2V0LXNjcmlwdHNjcmlwdHN0eWxlXCIsXG5dO1xuXG4vLyBJbnN0YW5jZXMgb2YgdGhlIGRpZmZlcmVudCBzdHlsZXNcbnZhciBzdHlsZXMgPSBbXG4gICAgbmV3IFN0eWxlKEQsIDAsIDEuMCwgZmFsc2UpLFxuICAgIG5ldyBTdHlsZShEYywgMCwgMS4wLCB0cnVlKSxcbiAgICBuZXcgU3R5bGUoVCwgMSwgMS4wLCBmYWxzZSksXG4gICAgbmV3IFN0eWxlKFRjLCAxLCAxLjAsIHRydWUpLFxuICAgIG5ldyBTdHlsZShTLCAyLCAwLjcsIGZhbHNlKSxcbiAgICBuZXcgU3R5bGUoU2MsIDIsIDAuNywgdHJ1ZSksXG4gICAgbmV3IFN0eWxlKFNTLCAzLCAwLjUsIGZhbHNlKSxcbiAgICBuZXcgU3R5bGUoU1NjLCAzLCAwLjUsIHRydWUpLFxuXTtcblxuLy8gTG9va3VwIHRhYmxlcyBmb3Igc3dpdGNoaW5nIGZyb20gb25lIHN0eWxlIHRvIGFub3RoZXJcbnZhciBzdXAgPSBbUywgU2MsIFMsIFNjLCBTUywgU1NjLCBTUywgU1NjXTtcbnZhciBzdWIgPSBbU2MsIFNjLCBTYywgU2MsIFNTYywgU1NjLCBTU2MsIFNTY107XG52YXIgZnJhY051bSA9IFtULCBUYywgUywgU2MsIFNTLCBTU2MsIFNTLCBTU2NdO1xudmFyIGZyYWNEZW4gPSBbVGMsIFRjLCBTYywgU2MsIFNTYywgU1NjLCBTU2MsIFNTY107XG52YXIgY3JhbXAgPSBbRGMsIERjLCBUYywgVGMsIFNjLCBTYywgU1NjLCBTU2NdO1xuXG4vLyBXZSBvbmx5IGV4cG9ydCBzb21lIG9mIHRoZSBzdHlsZXMuIEFsc28sIHdlIGRvbid0IGV4cG9ydCB0aGUgYFN0eWxlYCBjbGFzcyBzb1xuLy8gbm8gbW9yZSBzdHlsZXMgY2FuIGJlIGdlbmVyYXRlZC5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIERJU1BMQVk6IHN0eWxlc1tEXSxcbiAgICBURVhUOiBzdHlsZXNbVF0sXG4gICAgU0NSSVBUOiBzdHlsZXNbU10sXG4gICAgU0NSSVBUU0NSSVBUOiBzdHlsZXNbU1NdLFxufTtcbiIsIi8qIGVzbGludCBuby1jb25zdGFudC1jb25kaXRpb246MCAqL1xudmFyIGZ1bmN0aW9ucyA9IHJlcXVpcmUoXCIuL2Z1bmN0aW9uc1wiKTtcbnZhciBlbnZpcm9ubWVudHMgPSByZXF1aXJlKFwiLi9lbnZpcm9ubWVudHNcIik7XG52YXIgTGV4ZXIgPSByZXF1aXJlKFwiLi9MZXhlclwiKTtcbnZhciBzeW1ib2xzID0gcmVxdWlyZShcIi4vc3ltYm9sc1wiKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuXG52YXIgcGFyc2VEYXRhID0gcmVxdWlyZShcIi4vcGFyc2VEYXRhXCIpO1xudmFyIFBhcnNlRXJyb3IgPSByZXF1aXJlKFwiLi9QYXJzZUVycm9yXCIpO1xuXG4vKipcbiAqIFRoaXMgZmlsZSBjb250YWlucyB0aGUgcGFyc2VyIHVzZWQgdG8gcGFyc2Ugb3V0IGEgVGVYIGV4cHJlc3Npb24gZnJvbSB0aGVcbiAqIGlucHV0LiBTaW5jZSBUZVggaXNuJ3QgY29udGV4dC1mcmVlLCBzdGFuZGFyZCBwYXJzZXJzIGRvbid0IHdvcmsgcGFydGljdWxhcmx5XG4gKiB3ZWxsLlxuICpcbiAqIFRoZSBzdHJhdGVneSBvZiB0aGlzIHBhcnNlciBpcyBhcyBzdWNoOlxuICpcbiAqIFRoZSBtYWluIGZ1bmN0aW9ucyAodGhlIGAucGFyc2UuLi5gIG9uZXMpIHRha2UgYSBwb3NpdGlvbiBpbiB0aGUgY3VycmVudFxuICogcGFyc2Ugc3RyaW5nIHRvIHBhcnNlIHRva2VucyBmcm9tLiBUaGUgbGV4ZXIgKGZvdW5kIGluIExleGVyLmpzLCBzdG9yZWQgYXRcbiAqIHRoaXMubGV4ZXIpIGFsc28gc3VwcG9ydHMgcHVsbGluZyBvdXQgdG9rZW5zIGF0IGFyYml0cmFyeSBwbGFjZXMuIFdoZW5cbiAqIGluZGl2aWR1YWwgdG9rZW5zIGFyZSBuZWVkZWQgYXQgYSBwb3NpdGlvbiwgdGhlIGxleGVyIGlzIGNhbGxlZCB0byBwdWxsIG91dCBhXG4gKiB0b2tlbiwgd2hpY2ggaXMgdGhlbiB1c2VkLlxuICpcbiAqIFRoZSBwYXJzZXIgaGFzIGEgcHJvcGVydHkgY2FsbGVkIFwibW9kZVwiIGluZGljYXRpbmcgdGhlIG1vZGUgdGhhdFxuICogdGhlIHBhcnNlciBpcyBjdXJyZW50bHkgaW4uIEN1cnJlbnRseSBpdCBoYXMgdG8gYmUgb25lIG9mIFwibWF0aFwiIG9yXG4gKiBcInRleHRcIiwgd2hpY2ggZGVub3RlcyB3aGV0aGVyIHRoZSBjdXJyZW50IGVudmlyb25tZW50IGlzIGEgbWF0aC15XG4gKiBvbmUgb3IgYSB0ZXh0LXkgb25lIChlLmcuIGluc2lkZSBcXHRleHQpLiBDdXJyZW50bHksIHRoaXMgc2VydmVzIHRvXG4gKiBsaW1pdCB0aGUgZnVuY3Rpb25zIHdoaWNoIGNhbiBiZSB1c2VkIGluIHRleHQgbW9kZS5cbiAqXG4gKiBUaGUgbWFpbiBmdW5jdGlvbnMgdGhlbiByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGNvbnRhaW5zIHRoZSB1c2VmdWwgZGF0YSB0aGF0XG4gKiB3YXMgcGFyc2VkIGF0IGl0cyBnaXZlbiBwb2ludCwgYW5kIGEgbmV3IHBvc2l0aW9uIGF0IHRoZSBlbmQgb2YgdGhlIHBhcnNlZFxuICogZGF0YS4gVGhlIG1haW4gZnVuY3Rpb25zIGNhbiBjYWxsIGVhY2ggb3RoZXIgYW5kIGNvbnRpbnVlIHRoZSBwYXJzaW5nIGJ5XG4gKiB1c2luZyB0aGUgcmV0dXJuZWQgcG9zaXRpb24gYXMgYSBuZXcgc3RhcnRpbmcgcG9pbnQuXG4gKlxuICogVGhlcmUgYXJlIGFsc28gZXh0cmEgYC5oYW5kbGUuLi5gIGZ1bmN0aW9ucywgd2hpY2ggcHVsbCBvdXQgc29tZSByZXVzZWRcbiAqIGZ1bmN0aW9uYWxpdHkgaW50byBzZWxmLWNvbnRhaW5lZCBmdW5jdGlvbnMuXG4gKlxuICogVGhlIGVhcmxpZXIgZnVuY3Rpb25zIHJldHVybiBQYXJzZU5vZGVzLlxuICogVGhlIGxhdGVyIGZ1bmN0aW9ucyAod2hpY2ggYXJlIGNhbGxlZCBkZWVwZXIgaW4gdGhlIHBhcnNlKSBzb21ldGltZXMgcmV0dXJuXG4gKiBQYXJzZUZ1bmNPckFyZ3VtZW50LCB3aGljaCBjb250YWluIGEgUGFyc2VOb2RlIGFzIHdlbGwgYXMgc29tZSBkYXRhIGFib3V0XG4gKiB3aGV0aGVyIHRoZSBwYXJzZWQgb2JqZWN0IGlzIGEgZnVuY3Rpb24gd2hpY2ggaXMgbWlzc2luZyBzb21lIGFyZ3VtZW50cywgb3IgYVxuICogc3RhbmRhbG9uZSBvYmplY3Qgd2hpY2ggY2FuIGJlIHVzZWQgYXMgYW4gYXJndW1lbnQgdG8gYW5vdGhlciBmdW5jdGlvbi5cbiAqL1xuXG4vKipcbiAqIE1haW4gUGFyc2VyIGNsYXNzXG4gKi9cbmZ1bmN0aW9uIFBhcnNlcihpbnB1dCwgc2V0dGluZ3MpIHtcbiAgICAvLyBNYWtlIGEgbmV3IGxleGVyXG4gICAgdGhpcy5sZXhlciA9IG5ldyBMZXhlcihpbnB1dCk7XG4gICAgLy8gU3RvcmUgdGhlIHNldHRpbmdzIGZvciB1c2UgaW4gcGFyc2luZ1xuICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcbn1cblxudmFyIFBhcnNlTm9kZSA9IHBhcnNlRGF0YS5QYXJzZU5vZGU7XG5cbi8qKlxuICogQW4gaW5pdGlhbCBmdW5jdGlvbiAod2l0aG91dCBpdHMgYXJndW1lbnRzKSwgb3IgYW4gYXJndW1lbnQgdG8gYSBmdW5jdGlvbi5cbiAqIFRoZSBgcmVzdWx0YCBhcmd1bWVudCBzaG91bGQgYmUgYSBQYXJzZU5vZGUuXG4gKi9cbmZ1bmN0aW9uIFBhcnNlRnVuY09yQXJndW1lbnQocmVzdWx0LCBpc0Z1bmN0aW9uKSB7XG4gICAgdGhpcy5yZXN1bHQgPSByZXN1bHQ7XG4gICAgLy8gSXMgdGhpcyBhIGZ1bmN0aW9uIChpLmUuIGlzIGl0IHNvbWV0aGluZyBkZWZpbmVkIGluIGZ1bmN0aW9ucy5qcyk/XG4gICAgdGhpcy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcbn1cblxuLyoqXG4gKiBDaGVja3MgYSByZXN1bHQgdG8gbWFrZSBzdXJlIGl0IGhhcyB0aGUgcmlnaHQgdHlwZSwgYW5kIHRocm93cyBhblxuICogYXBwcm9wcmlhdGUgZXJyb3Igb3RoZXJ3aXNlLlxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGNvbnN1bWUgd2hldGhlciB0byBjb25zdW1lIHRoZSBleHBlY3RlZCB0b2tlbixcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdHMgdG8gdHJ1ZVxuICovXG5QYXJzZXIucHJvdG90eXBlLmV4cGVjdCA9IGZ1bmN0aW9uKHRleHQsIGNvbnN1bWUpIHtcbiAgICBpZiAodGhpcy5uZXh0VG9rZW4udGV4dCAhPT0gdGV4dCkge1xuICAgICAgICB0aHJvdyBuZXcgUGFyc2VFcnJvcihcbiAgICAgICAgICAgIFwiRXhwZWN0ZWQgJ1wiICsgdGV4dCArIFwiJywgZ290ICdcIiArIHRoaXMubmV4dFRva2VuLnRleHQgKyBcIidcIixcbiAgICAgICAgICAgIHRoaXMubGV4ZXIsIHRoaXMubmV4dFRva2VuLnBvc2l0aW9uXG4gICAgICAgICk7XG4gICAgfVxuICAgIGlmIChjb25zdW1lICE9PSBmYWxzZSkge1xuICAgICAgICB0aGlzLmNvbnN1bWUoKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIENvbnNpZGVycyB0aGUgY3VycmVudCBsb29rIGFoZWFkIHRva2VuIGFzIGNvbnN1bWVkLFxuICogYW5kIGZldGNoZXMgdGhlIG9uZSBhZnRlciB0aGF0IGFzIHRoZSBuZXcgbG9vayBhaGVhZC5cbiAqL1xuUGFyc2VyLnByb3RvdHlwZS5jb25zdW1lID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5wb3MgPSB0aGlzLm5leHRUb2tlbi5wb3NpdGlvbjtcbiAgICB0aGlzLm5leHRUb2tlbiA9IHRoaXMubGV4ZXIubGV4KHRoaXMucG9zLCB0aGlzLm1vZGUpO1xufTtcblxuLyoqXG4gKiBNYWluIHBhcnNpbmcgZnVuY3Rpb24sIHdoaWNoIHBhcnNlcyBhbiBlbnRpcmUgaW5wdXQuXG4gKlxuICogQHJldHVybiB7P0FycmF5LjxQYXJzZU5vZGU+fVxuICovXG5QYXJzZXIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gVHJ5IHRvIHBhcnNlIHRoZSBpbnB1dFxuICAgIHRoaXMubW9kZSA9IFwibWF0aFwiO1xuICAgIHRoaXMucG9zID0gMDtcbiAgICB0aGlzLm5leHRUb2tlbiA9IHRoaXMubGV4ZXIubGV4KHRoaXMucG9zLCB0aGlzLm1vZGUpO1xuICAgIHZhciBwYXJzZSA9IHRoaXMucGFyc2VJbnB1dCgpO1xuICAgIHJldHVybiBwYXJzZTtcbn07XG5cbi8qKlxuICogUGFyc2VzIGFuIGVudGlyZSBpbnB1dCB0cmVlLlxuICovXG5QYXJzZXIucHJvdG90eXBlLnBhcnNlSW5wdXQgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBQYXJzZSBhbiBleHByZXNzaW9uXG4gICAgdmFyIGV4cHJlc3Npb24gPSB0aGlzLnBhcnNlRXhwcmVzc2lvbihmYWxzZSk7XG4gICAgLy8gSWYgd2Ugc3VjY2VlZGVkLCBtYWtlIHN1cmUgdGhlcmUncyBhbiBFT0YgYXQgdGhlIGVuZFxuICAgIHRoaXMuZXhwZWN0KFwiRU9GXCIsIGZhbHNlKTtcbiAgICByZXR1cm4gZXhwcmVzc2lvbjtcbn07XG5cbnZhciBlbmRPZkV4cHJlc3Npb24gPSBbXCJ9XCIsIFwiXFxcXGVuZFwiLCBcIlxcXFxyaWdodFwiLCBcIiZcIiwgXCJcXFxcXFxcXFwiLCBcIlxcXFxjclwiXTtcblxuLyoqXG4gKiBQYXJzZXMgYW4gXCJleHByZXNzaW9uXCIsIHdoaWNoIGlzIGEgbGlzdCBvZiBhdG9tcy5cbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGJyZWFrT25JbmZpeCBTaG91bGQgdGhlIHBhcnNpbmcgc3RvcCB3aGVuIHdlIGhpdCBpbmZpeFxuICogICAgICAgICAgICAgICAgICBub2Rlcz8gVGhpcyBoYXBwZW5zIHdoZW4gZnVuY3Rpb25zIGhhdmUgaGlnaGVyIHByZWNlbmRlbmNlXG4gKiAgICAgICAgICAgICAgICAgIHRoYW4gaW5maXggbm9kZXMgaW4gaW1wbGljaXQgcGFyc2VzLlxuICpcbiAqIEBwYXJhbSB7P3N0cmluZ30gYnJlYWtPblRva2VuIFRoZSB0b2tlbiB0aGF0IHRoZSBleHByZXNzaW9uIHNob3VsZCBlbmQgd2l0aCxcbiAqICAgICAgICAgICAgICAgICAgb3IgYG51bGxgIGlmIHNvbWV0aGluZyBlbHNlIHNob3VsZCBlbmQgdGhlIGV4cHJlc3Npb24uXG4gKlxuICogQHJldHVybiB7UGFyc2VOb2RlfVxuICovXG5QYXJzZXIucHJvdG90eXBlLnBhcnNlRXhwcmVzc2lvbiA9IGZ1bmN0aW9uKGJyZWFrT25JbmZpeCwgYnJlYWtPblRva2VuKSB7XG4gICAgdmFyIGJvZHkgPSBbXTtcbiAgICAvLyBLZWVwIGFkZGluZyBhdG9tcyB0byB0aGUgYm9keSB1bnRpbCB3ZSBjYW4ndCBwYXJzZSBhbnkgbW9yZSBhdG9tcyAoZWl0aGVyXG4gICAgLy8gd2UgcmVhY2hlZCB0aGUgZW5kLCBhIH0sIG9yIGEgXFxyaWdodClcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgbGV4ID0gdGhpcy5uZXh0VG9rZW47XG4gICAgICAgIHZhciBwb3MgPSB0aGlzLnBvcztcbiAgICAgICAgaWYgKGVuZE9mRXhwcmVzc2lvbi5pbmRleE9mKGxleC50ZXh0KSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChicmVha09uVG9rZW4gJiYgbGV4LnRleHQgPT09IGJyZWFrT25Ub2tlbikge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGF0b20gPSB0aGlzLnBhcnNlQXRvbSgpO1xuICAgICAgICBpZiAoIWF0b20pIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy50aHJvd09uRXJyb3IgJiYgbGV4LnRleHRbMF0gPT09IFwiXFxcXFwiKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9yTm9kZSA9IHRoaXMuaGFuZGxlVW5zdXBwb3J0ZWRDbWQoKTtcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goZXJyb3JOb2RlKTtcblxuICAgICAgICAgICAgICAgIHBvcyA9IGxleC5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJyZWFrT25JbmZpeCAmJiBhdG9tLnR5cGUgPT09IFwiaW5maXhcIikge1xuICAgICAgICAgICAgLy8gcmV3aW5kIHNvIHdlIGNhbiBwYXJzZSB0aGUgaW5maXggYXRvbSBhZ2FpblxuICAgICAgICAgICAgdGhpcy5wb3MgPSBwb3M7XG4gICAgICAgICAgICB0aGlzLm5leHRUb2tlbiA9IGxleDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGJvZHkucHVzaChhdG9tKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlSW5maXhOb2Rlcyhib2R5KTtcbn07XG5cbi8qKlxuICogUmV3cml0ZXMgaW5maXggb3BlcmF0b3JzIHN1Y2ggYXMgXFxvdmVyIHdpdGggY29ycmVzcG9uZGluZyBjb21tYW5kcyBzdWNoXG4gKiBhcyBcXGZyYWMuXG4gKlxuICogVGhlcmUgY2FuIG9ubHkgYmUgb25lIGluZml4IG9wZXJhdG9yIHBlciBncm91cC4gIElmIHRoZXJlJ3MgbW9yZSB0aGFuIG9uZVxuICogdGhlbiB0aGUgZXhwcmVzc2lvbiBpcyBhbWJpZ3VvdXMuICBUaGlzIGNhbiBiZSByZXNvbHZlZCBieSBhZGRpbmcge30uXG4gKlxuICogQHJldHVybnMge0FycmF5fVxuICovXG5QYXJzZXIucHJvdG90eXBlLmhhbmRsZUluZml4Tm9kZXMgPSBmdW5jdGlvbihib2R5KSB7XG4gICAgdmFyIG92ZXJJbmRleCA9IC0xO1xuICAgIHZhciBmdW5jTmFtZTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm9keS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgbm9kZSA9IGJvZHlbaV07XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09IFwiaW5maXhcIikge1xuICAgICAgICAgICAgaWYgKG92ZXJJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFcnJvcihcIm9ubHkgb25lIGluZml4IG9wZXJhdG9yIHBlciBncm91cFwiLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxleGVyLCAtMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvdmVySW5kZXggPSBpO1xuICAgICAgICAgICAgZnVuY05hbWUgPSBub2RlLnZhbHVlLnJlcGxhY2VXaXRoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG92ZXJJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgdmFyIG51bWVyTm9kZTtcbiAgICAgICAgdmFyIGRlbm9tTm9kZTtcblxuICAgICAgICB2YXIgbnVtZXJCb2R5ID0gYm9keS5zbGljZSgwLCBvdmVySW5kZXgpO1xuICAgICAgICB2YXIgZGVub21Cb2R5ID0gYm9keS5zbGljZShvdmVySW5kZXggKyAxKTtcblxuICAgICAgICBpZiAobnVtZXJCb2R5Lmxlbmd0aCA9PT0gMSAmJiBudW1lckJvZHlbMF0udHlwZSA9PT0gXCJvcmRncm91cFwiKSB7XG4gICAgICAgICAgICBudW1lck5vZGUgPSBudW1lckJvZHlbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBudW1lck5vZGUgPSBuZXcgUGFyc2VOb2RlKFwib3JkZ3JvdXBcIiwgbnVtZXJCb2R5LCB0aGlzLm1vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlbm9tQm9keS5sZW5ndGggPT09IDEgJiYgZGVub21Cb2R5WzBdLnR5cGUgPT09IFwib3JkZ3JvdXBcIikge1xuICAgICAgICAgICAgZGVub21Ob2RlID0gZGVub21Cb2R5WzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVub21Ob2RlID0gbmV3IFBhcnNlTm9kZShcIm9yZGdyb3VwXCIsIGRlbm9tQm9keSwgdGhpcy5tb2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuY2FsbEZ1bmN0aW9uKFxuICAgICAgICAgICAgZnVuY05hbWUsIFtudW1lck5vZGUsIGRlbm9tTm9kZV0sIG51bGwpO1xuICAgICAgICByZXR1cm4gW25ldyBQYXJzZU5vZGUodmFsdWUudHlwZSwgdmFsdWUsIHRoaXMubW9kZSldO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBib2R5O1xuICAgIH1cbn07XG5cbi8vIFRoZSBncmVlZGluZXNzIG9mIGEgc3VwZXJzY3JpcHQgb3Igc3Vic2NyaXB0XG52YXIgU1VQU1VCX0dSRUVESU5FU1MgPSAxO1xuXG4vKipcbiAqIEhhbmRsZSBhIHN1YnNjcmlwdCBvciBzdXBlcnNjcmlwdCB3aXRoIG5pY2UgZXJyb3JzLlxuICovXG5QYXJzZXIucHJvdG90eXBlLmhhbmRsZVN1cFN1YnNjcmlwdCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgc3ltYm9sID0gdGhpcy5uZXh0VG9rZW4udGV4dDtcbiAgICB2YXIgc3ltUG9zID0gdGhpcy5wb3M7XG4gICAgdGhpcy5jb25zdW1lKCk7XG4gICAgdmFyIGdyb3VwID0gdGhpcy5wYXJzZUdyb3VwKCk7XG5cbiAgICBpZiAoIWdyb3VwKSB7XG4gICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy50aHJvd09uRXJyb3IgJiYgdGhpcy5uZXh0VG9rZW4udGV4dFswXSA9PT0gXCJcXFxcXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVVuc3VwcG9ydGVkQ21kKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFcnJvcihcbiAgICAgICAgICAgICAgICBcIkV4cGVjdGVkIGdyb3VwIGFmdGVyICdcIiArIHN5bWJvbCArIFwiJ1wiLFxuICAgICAgICAgICAgICAgIHRoaXMubGV4ZXIsXG4gICAgICAgICAgICAgICAgc3ltUG9zICsgMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZ3JvdXAuaXNGdW5jdGlvbikge1xuICAgICAgICAvLyBeIGFuZCBfIGhhdmUgYSBncmVlZGluZXNzLCBzbyBoYW5kbGUgaW50ZXJhY3Rpb25zIHdpdGggZnVuY3Rpb25zJ1xuICAgICAgICAvLyBncmVlZGluZXNzXG4gICAgICAgIHZhciBmdW5jR3JlZWRpbmVzcyA9IGZ1bmN0aW9uc1tncm91cC5yZXN1bHRdLmdyZWVkaW5lc3M7XG4gICAgICAgIGlmIChmdW5jR3JlZWRpbmVzcyA+IFNVUFNVQl9HUkVFRElORVNTKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUZ1bmN0aW9uKGdyb3VwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUVycm9yKFxuICAgICAgICAgICAgICAgIFwiR290IGZ1bmN0aW9uICdcIiArIGdyb3VwLnJlc3VsdCArIFwiJyB3aXRoIG5vIGFyZ3VtZW50cyBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiYXMgXCIgKyBuYW1lLFxuICAgICAgICAgICAgICAgIHRoaXMubGV4ZXIsIHN5bVBvcyArIDEpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGdyb3VwLnJlc3VsdDtcbiAgICB9XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIHRoZSB0ZXh0dWFsIGlucHV0IG9mIGFuIHVuc3VwcG9ydGVkIGNvbW1hbmQgaW50byBhIHRleHQgbm9kZVxuICogY29udGFpbmVkIHdpdGhpbiBhIGNvbG9yIG5vZGUgd2hvc2UgY29sb3IgaXMgZGV0ZXJtaW5lZCBieSBlcnJvckNvbG9yXG4gKi9cblBhcnNlci5wcm90b3R5cGUuaGFuZGxlVW5zdXBwb3J0ZWRDbWQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdGV4dCA9IHRoaXMubmV4dFRva2VuLnRleHQ7XG4gICAgdmFyIHRleHRvcmRBcnJheSA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRleHRvcmRBcnJheS5wdXNoKG5ldyBQYXJzZU5vZGUoXCJ0ZXh0b3JkXCIsIHRleHRbaV0sIFwidGV4dFwiKSk7XG4gICAgfVxuXG4gICAgdmFyIHRleHROb2RlID0gbmV3IFBhcnNlTm9kZShcbiAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgIHtcbiAgICAgICAgICAgIGJvZHk6IHRleHRvcmRBcnJheSxcbiAgICAgICAgICAgIHR5cGU6IFwidGV4dFwiLFxuICAgICAgICB9LFxuICAgICAgICB0aGlzLm1vZGUpO1xuXG4gICAgdmFyIGNvbG9yTm9kZSA9IG5ldyBQYXJzZU5vZGUoXG4gICAgICAgIFwiY29sb3JcIixcbiAgICAgICAge1xuICAgICAgICAgICAgY29sb3I6IHRoaXMuc2V0dGluZ3MuZXJyb3JDb2xvcixcbiAgICAgICAgICAgIHZhbHVlOiBbdGV4dE5vZGVdLFxuICAgICAgICAgICAgdHlwZTogXCJjb2xvclwiLFxuICAgICAgICB9LFxuICAgICAgICB0aGlzLm1vZGUpO1xuXG4gICAgdGhpcy5jb25zdW1lKCk7XG4gICAgcmV0dXJuIGNvbG9yTm9kZTtcbn07XG5cbi8qKlxuICogUGFyc2VzIGEgZ3JvdXAgd2l0aCBvcHRpb25hbCBzdXBlci9zdWJzY3JpcHRzLlxuICpcbiAqIEByZXR1cm4gez9QYXJzZU5vZGV9XG4gKi9cblBhcnNlci5wcm90b3R5cGUucGFyc2VBdG9tID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gVGhlIGJvZHkgb2YgYW4gYXRvbSBpcyBhbiBpbXBsaWNpdCBncm91cCwgc28gdGhhdCB0aGluZ3MgbGlrZVxuICAgIC8vIFxcbGVmdCh4XFxyaWdodCleMiB3b3JrIGNvcnJlY3RseS5cbiAgICB2YXIgYmFzZSA9IHRoaXMucGFyc2VJbXBsaWNpdEdyb3VwKCk7XG5cbiAgICAvLyBJbiB0ZXh0IG1vZGUsIHdlIGRvbid0IGhhdmUgc3VwZXJzY3JpcHRzIG9yIHN1YnNjcmlwdHNcbiAgICBpZiAodGhpcy5tb2RlID09PSBcInRleHRcIikge1xuICAgICAgICByZXR1cm4gYmFzZTtcbiAgICB9XG5cbiAgICAvLyBOb3RlIHRoYXQgYmFzZSBtYXkgYmUgZW1wdHkgKGkuZS4gbnVsbCkgYXQgdGhpcyBwb2ludC5cblxuICAgIHZhciBzdXBlcnNjcmlwdDtcbiAgICB2YXIgc3Vic2NyaXB0O1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIC8vIExleCB0aGUgZmlyc3QgdG9rZW5cbiAgICAgICAgdmFyIGxleCA9IHRoaXMubmV4dFRva2VuO1xuXG4gICAgICAgIGlmIChsZXgudGV4dCA9PT0gXCJcXFxcbGltaXRzXCIgfHwgbGV4LnRleHQgPT09IFwiXFxcXG5vbGltaXRzXCIpIHtcbiAgICAgICAgICAgIC8vIFdlIGdvdCBhIGxpbWl0IGNvbnRyb2xcbiAgICAgICAgICAgIGlmICghYmFzZSB8fCBiYXNlLnR5cGUgIT09IFwib3BcIikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUVycm9yKFxuICAgICAgICAgICAgICAgICAgICBcIkxpbWl0IGNvbnRyb2xzIG11c3QgZm9sbG93IGEgbWF0aCBvcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxleGVyLCB0aGlzLnBvcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBsaW1pdHMgPSBsZXgudGV4dCA9PT0gXCJcXFxcbGltaXRzXCI7XG4gICAgICAgICAgICAgICAgYmFzZS52YWx1ZS5saW1pdHMgPSBsaW1pdHM7XG4gICAgICAgICAgICAgICAgYmFzZS52YWx1ZS5hbHdheXNIYW5kbGVTdXBTdWIgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb25zdW1lKCk7XG4gICAgICAgIH0gZWxzZSBpZiAobGV4LnRleHQgPT09IFwiXlwiKSB7XG4gICAgICAgICAgICAvLyBXZSBnb3QgYSBzdXBlcnNjcmlwdCBzdGFydFxuICAgICAgICAgICAgaWYgKHN1cGVyc2NyaXB0KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgIFwiRG91YmxlIHN1cGVyc2NyaXB0XCIsIHRoaXMubGV4ZXIsIHRoaXMucG9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN1cGVyc2NyaXB0ID0gdGhpcy5oYW5kbGVTdXBTdWJzY3JpcHQoXCJzdXBlcnNjcmlwdFwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChsZXgudGV4dCA9PT0gXCJfXCIpIHtcbiAgICAgICAgICAgIC8vIFdlIGdvdCBhIHN1YnNjcmlwdCBzdGFydFxuICAgICAgICAgICAgaWYgKHN1YnNjcmlwdCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUVycm9yKFxuICAgICAgICAgICAgICAgICAgICBcIkRvdWJsZSBzdWJzY3JpcHRcIiwgdGhpcy5sZXhlciwgdGhpcy5wb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3Vic2NyaXB0ID0gdGhpcy5oYW5kbGVTdXBTdWJzY3JpcHQoXCJzdWJzY3JpcHRcIik7XG4gICAgICAgIH0gZWxzZSBpZiAobGV4LnRleHQgPT09IFwiJ1wiKSB7XG4gICAgICAgICAgICAvLyBXZSBnb3QgYSBwcmltZVxuICAgICAgICAgICAgdmFyIHByaW1lID0gbmV3IFBhcnNlTm9kZShcInRleHRvcmRcIiwgXCJcXFxccHJpbWVcIiwgdGhpcy5tb2RlKTtcblxuICAgICAgICAgICAgLy8gTWFueSBwcmltZXMgY2FuIGJlIGdyb3VwZWQgdG9nZXRoZXIsIHNvIHdlIGhhbmRsZSB0aGlzIGhlcmVcbiAgICAgICAgICAgIHZhciBwcmltZXMgPSBbcHJpbWVdO1xuICAgICAgICAgICAgdGhpcy5jb25zdW1lKCk7XG4gICAgICAgICAgICAvLyBLZWVwIGxleGluZyB0b2tlbnMgdW50aWwgd2UgZ2V0IHNvbWV0aGluZyB0aGF0J3Mgbm90IGEgcHJpbWVcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLm5leHRUb2tlbi50ZXh0ID09PSBcIidcIikge1xuICAgICAgICAgICAgICAgIC8vIEZvciBlYWNoIG9uZSwgYWRkIGFub3RoZXIgcHJpbWUgdG8gdGhlIGxpc3RcbiAgICAgICAgICAgICAgICBwcmltZXMucHVzaChwcmltZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25zdW1lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBQdXQgdGhlbSBpbnRvIGFuIG9yZGdyb3VwIGFzIHRoZSBzdXBlcnNjcmlwdFxuICAgICAgICAgICAgc3VwZXJzY3JpcHQgPSBuZXcgUGFyc2VOb2RlKFwib3JkZ3JvdXBcIiwgcHJpbWVzLCB0aGlzLm1vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSWYgaXQgd2Fzbid0IF4sIF8sIG9yICcsIHN0b3AgcGFyc2luZyBzdXBlci9zdWJzY3JpcHRzXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXBlcnNjcmlwdCB8fCBzdWJzY3JpcHQpIHtcbiAgICAgICAgLy8gSWYgd2UgZ290IGVpdGhlciBhIHN1cGVyc2NyaXB0IG9yIHN1YnNjcmlwdCwgY3JlYXRlIGEgc3Vwc3ViXG4gICAgICAgIHJldHVybiBuZXcgUGFyc2VOb2RlKFwic3Vwc3ViXCIsIHtcbiAgICAgICAgICAgIGJhc2U6IGJhc2UsXG4gICAgICAgICAgICBzdXA6IHN1cGVyc2NyaXB0LFxuICAgICAgICAgICAgc3ViOiBzdWJzY3JpcHQsXG4gICAgICAgIH0sIHRoaXMubW9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gT3RoZXJ3aXNlIHJldHVybiB0aGUgb3JpZ2luYWwgYm9keVxuICAgICAgICByZXR1cm4gYmFzZTtcbiAgICB9XG59O1xuXG4vLyBBIGxpc3Qgb2YgdGhlIHNpemUtY2hhbmdpbmcgZnVuY3Rpb25zLCBmb3IgdXNlIGluIHBhcnNlSW1wbGljaXRHcm91cFxudmFyIHNpemVGdW5jcyA9IFtcbiAgICBcIlxcXFx0aW55XCIsIFwiXFxcXHNjcmlwdHNpemVcIiwgXCJcXFxcZm9vdG5vdGVzaXplXCIsIFwiXFxcXHNtYWxsXCIsIFwiXFxcXG5vcm1hbHNpemVcIixcbiAgICBcIlxcXFxsYXJnZVwiLCBcIlxcXFxMYXJnZVwiLCBcIlxcXFxMQVJHRVwiLCBcIlxcXFxodWdlXCIsIFwiXFxcXEh1Z2VcIixcbl07XG5cbi8vIEEgbGlzdCBvZiB0aGUgc3R5bGUtY2hhbmdpbmcgZnVuY3Rpb25zLCBmb3IgdXNlIGluIHBhcnNlSW1wbGljaXRHcm91cFxudmFyIHN0eWxlRnVuY3MgPSBbXG4gICAgXCJcXFxcZGlzcGxheXN0eWxlXCIsIFwiXFxcXHRleHRzdHlsZVwiLCBcIlxcXFxzY3JpcHRzdHlsZVwiLCBcIlxcXFxzY3JpcHRzY3JpcHRzdHlsZVwiLFxuXTtcblxuLyoqXG4gKiBQYXJzZXMgYW4gaW1wbGljaXQgZ3JvdXAsIHdoaWNoIGlzIGEgZ3JvdXAgdGhhdCBzdGFydHMgYXQgdGhlIGVuZCBvZiBhXG4gKiBzcGVjaWZpZWQsIGFuZCBlbmRzIHJpZ2h0IGJlZm9yZSBhIGhpZ2hlciBleHBsaWNpdCBncm91cCBlbmRzLCBvciBhdCBFT0wuIEl0XG4gKiBpcyB1c2VkIGZvciBmdW5jdGlvbnMgdGhhdCBhcHBlYXIgdG8gYWZmZWN0IHRoZSBjdXJyZW50IHN0eWxlLCBsaWtlIFxcTGFyZ2Ugb3JcbiAqIFxcdGV4dHJtLCB3aGVyZSBpbnN0ZWFkIG9mIGtlZXBpbmcgYSBzdHlsZSB3ZSBqdXN0IHByZXRlbmQgdGhhdCB0aGVyZSBpcyBhblxuICogaW1wbGljaXQgZ3JvdXBpbmcgYWZ0ZXIgaXQgdW50aWwgdGhlIGVuZCBvZiB0aGUgZ3JvdXAuIEUuZy5cbiAqICAgc21hbGwgdGV4dCB7XFxMYXJnZSBsYXJnZSB0ZXh0fSBzbWFsbCB0ZXh0IGFnYWluXG4gKiBJdCBpcyBhbHNvIHVzZWQgZm9yIFxcbGVmdCBhbmQgXFxyaWdodCB0byBnZXQgdGhlIGNvcnJlY3QgZ3JvdXBpbmcuXG4gKlxuICogQHJldHVybiB7P1BhcnNlTm9kZX1cbiAqL1xuUGFyc2VyLnByb3RvdHlwZS5wYXJzZUltcGxpY2l0R3JvdXAgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RhcnQgPSB0aGlzLnBhcnNlU3ltYm9sKCk7XG5cbiAgICBpZiAoc3RhcnQgPT0gbnVsbCkge1xuICAgICAgICAvLyBJZiB3ZSBkaWRuJ3QgZ2V0IGFueXRoaW5nIHdlIGhhbmRsZSwgZmFsbCBiYWNrIHRvIHBhcnNlRnVuY3Rpb25cbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VGdW5jdGlvbigpO1xuICAgIH1cblxuICAgIHZhciBmdW5jID0gc3RhcnQucmVzdWx0O1xuICAgIHZhciBib2R5O1xuXG4gICAgaWYgKGZ1bmMgPT09IFwiXFxcXGxlZnRcIikge1xuICAgICAgICAvLyBJZiB3ZSBzZWUgYSBsZWZ0OlxuICAgICAgICAvLyBQYXJzZSB0aGUgZW50aXJlIGxlZnQgZnVuY3Rpb24gKGluY2x1ZGluZyB0aGUgZGVsaW1pdGVyKVxuICAgICAgICB2YXIgbGVmdCA9IHRoaXMucGFyc2VGdW5jdGlvbihzdGFydCk7XG4gICAgICAgIC8vIFBhcnNlIG91dCB0aGUgaW1wbGljaXQgYm9keVxuICAgICAgICBib2R5ID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oZmFsc2UpO1xuICAgICAgICAvLyBDaGVjayB0aGUgbmV4dCB0b2tlblxuICAgICAgICB0aGlzLmV4cGVjdChcIlxcXFxyaWdodFwiLCBmYWxzZSk7XG4gICAgICAgIHZhciByaWdodCA9IHRoaXMucGFyc2VGdW5jdGlvbigpO1xuICAgICAgICByZXR1cm4gbmV3IFBhcnNlTm9kZShcImxlZnRyaWdodFwiLCB7XG4gICAgICAgICAgICBib2R5OiBib2R5LFxuICAgICAgICAgICAgbGVmdDogbGVmdC52YWx1ZS52YWx1ZSxcbiAgICAgICAgICAgIHJpZ2h0OiByaWdodC52YWx1ZS52YWx1ZSxcbiAgICAgICAgfSwgdGhpcy5tb2RlKTtcbiAgICB9IGVsc2UgaWYgKGZ1bmMgPT09IFwiXFxcXGJlZ2luXCIpIHtcbiAgICAgICAgLy8gYmVnaW4uLi5lbmQgaXMgc2ltaWxhciB0byBsZWZ0Li4ucmlnaHRcbiAgICAgICAgdmFyIGJlZ2luID0gdGhpcy5wYXJzZUZ1bmN0aW9uKHN0YXJ0KTtcbiAgICAgICAgdmFyIGVudk5hbWUgPSBiZWdpbi52YWx1ZS5uYW1lO1xuICAgICAgICBpZiAoIWVudmlyb25tZW50cy5oYXNPd25Qcm9wZXJ0eShlbnZOYW1lKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXJyb3IoXG4gICAgICAgICAgICAgICAgXCJObyBzdWNoIGVudmlyb25tZW50OiBcIiArIGVudk5hbWUsXG4gICAgICAgICAgICAgICAgdGhpcy5sZXhlciwgYmVnaW4udmFsdWUubmFtZXBvcyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQnVpbGQgdGhlIGVudmlyb25tZW50IG9iamVjdC4gQXJndW1lbnRzIGFuZCBvdGhlciBpbmZvcm1hdGlvbiB3aWxsXG4gICAgICAgIC8vIGJlIG1hZGUgYXZhaWxhYmxlIHRvIHRoZSBiZWdpbiBhbmQgZW5kIG1ldGhvZHMgdXNpbmcgcHJvcGVydGllcy5cbiAgICAgICAgdmFyIGVudiA9IGVudmlyb25tZW50c1tlbnZOYW1lXTtcbiAgICAgICAgdmFyIGFyZ3MgPSB0aGlzLnBhcnNlQXJndW1lbnRzKFwiXFxcXGJlZ2lue1wiICsgZW52TmFtZSArIFwifVwiLCBlbnYpO1xuICAgICAgICB2YXIgY29udGV4dCA9IHtcbiAgICAgICAgICAgIG1vZGU6IHRoaXMubW9kZSxcbiAgICAgICAgICAgIGVudk5hbWU6IGVudk5hbWUsXG4gICAgICAgICAgICBwYXJzZXI6IHRoaXMsXG4gICAgICAgICAgICBsZXhlcjogdGhpcy5sZXhlcixcbiAgICAgICAgICAgIHBvc2l0aW9uczogYXJncy5wb3AoKSxcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGVudi5oYW5kbGVyKGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICB0aGlzLmV4cGVjdChcIlxcXFxlbmRcIiwgZmFsc2UpO1xuICAgICAgICB2YXIgZW5kID0gdGhpcy5wYXJzZUZ1bmN0aW9uKCk7XG4gICAgICAgIGlmIChlbmQudmFsdWUubmFtZSAhPT0gZW52TmFtZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXJyb3IoXG4gICAgICAgICAgICAgICAgXCJNaXNtYXRjaDogXFxcXGJlZ2lue1wiICsgZW52TmFtZSArIFwifSBtYXRjaGVkIFwiICtcbiAgICAgICAgICAgICAgICBcImJ5IFxcXFxlbmR7XCIgKyBlbmQudmFsdWUubmFtZSArIFwifVwiLFxuICAgICAgICAgICAgICAgIHRoaXMubGV4ZXIgLyogLCBlbmQudmFsdWUubmFtZXBvcyAqLyk7XG4gICAgICAgICAgICAvLyBUT0RPOiBBZGQgcG9zaXRpb24gdG8gdGhlIGFib3ZlIGxpbmUgYW5kIGFkanVzdCB0ZXN0IGNhc2UsXG4gICAgICAgICAgICAvLyByZXF1aXJlcyAjMzg1IHRvIGdldCBtZXJnZWQgZmlyc3RcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQucG9zaXRpb24gPSBlbmQucG9zaXRpb247XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSBlbHNlIGlmICh1dGlscy5jb250YWlucyhzaXplRnVuY3MsIGZ1bmMpKSB7XG4gICAgICAgIC8vIElmIHdlIHNlZSBhIHNpemluZyBmdW5jdGlvbiwgcGFyc2Ugb3V0IHRoZSBpbXBsaWN0IGJvZHlcbiAgICAgICAgYm9keSA9IHRoaXMucGFyc2VFeHByZXNzaW9uKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQYXJzZU5vZGUoXCJzaXppbmdcIiwge1xuICAgICAgICAgICAgLy8gRmlndXJlIG91dCB3aGF0IHNpemUgdG8gdXNlIGJhc2VkIG9uIHRoZSBsaXN0IG9mIGZ1bmN0aW9ucyBhYm92ZVxuICAgICAgICAgICAgc2l6ZTogXCJzaXplXCIgKyAodXRpbHMuaW5kZXhPZihzaXplRnVuY3MsIGZ1bmMpICsgMSksXG4gICAgICAgICAgICB2YWx1ZTogYm9keSxcbiAgICAgICAgfSwgdGhpcy5tb2RlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmNvbnRhaW5zKHN0eWxlRnVuY3MsIGZ1bmMpKSB7XG4gICAgICAgIC8vIElmIHdlIHNlZSBhIHN0eWxpbmcgZnVuY3Rpb24sIHBhcnNlIG91dCB0aGUgaW1wbGljdCBib2R5XG4gICAgICAgIGJvZHkgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbih0cnVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQYXJzZU5vZGUoXCJzdHlsaW5nXCIsIHtcbiAgICAgICAgICAgIC8vIEZpZ3VyZSBvdXQgd2hhdCBzdHlsZSB0byB1c2UgYnkgcHVsbGluZyBvdXQgdGhlIHN0eWxlIGZyb21cbiAgICAgICAgICAgIC8vIHRoZSBmdW5jdGlvbiBuYW1lXG4gICAgICAgICAgICBzdHlsZTogZnVuYy5zbGljZSgxLCBmdW5jLmxlbmd0aCAtIDUpLFxuICAgICAgICAgICAgdmFsdWU6IGJvZHksXG4gICAgICAgIH0sIHRoaXMubW9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRGVmZXIgdG8gcGFyc2VGdW5jdGlvbiBpZiBpdCdzIG5vdCBhIGZ1bmN0aW9uIHdlIGhhbmRsZVxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUZ1bmN0aW9uKHN0YXJ0KTtcbiAgICB9XG59O1xuXG4vKipcbiAqIFBhcnNlcyBhbiBlbnRpcmUgZnVuY3Rpb24sIGluY2x1ZGluZyBpdHMgYmFzZSBhbmQgYWxsIG9mIGl0cyBhcmd1bWVudHMuXG4gKiBUaGUgYmFzZSBtaWdodCBlaXRoZXIgaGF2ZSBiZWVuIHBhcnNlZCBhbHJlYWR5LCBpbiB3aGljaCBjYXNlXG4gKiBpdCBpcyBwcm92aWRlZCBhcyBhbiBhcmd1bWVudCwgb3IgaXQncyB0aGUgbmV4dCBncm91cCBpbiB0aGUgaW5wdXQuXG4gKlxuICogQHBhcmFtIHtQYXJzZUZ1bmNPckFyZ3VtZW50PX0gYmFzZUdyb3VwIG9wdGlvbmFsIGFzIGRlc2NyaWJlZCBhYm92ZVxuICogQHJldHVybiB7P1BhcnNlTm9kZX1cbiAqL1xuUGFyc2VyLnByb3RvdHlwZS5wYXJzZUZ1bmN0aW9uID0gZnVuY3Rpb24oYmFzZUdyb3VwKSB7XG4gICAgaWYgKCFiYXNlR3JvdXApIHtcbiAgICAgICAgYmFzZUdyb3VwID0gdGhpcy5wYXJzZUdyb3VwKCk7XG4gICAgfVxuXG4gICAgaWYgKGJhc2VHcm91cCkge1xuICAgICAgICBpZiAoYmFzZUdyb3VwLmlzRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIHZhciBmdW5jID0gYmFzZUdyb3VwLnJlc3VsdDtcbiAgICAgICAgICAgIHZhciBmdW5jRGF0YSA9IGZ1bmN0aW9uc1tmdW5jXTtcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGUgPT09IFwidGV4dFwiICYmICFmdW5jRGF0YS5hbGxvd2VkSW5UZXh0KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgIFwiQ2FuJ3QgdXNlIGZ1bmN0aW9uICdcIiArIGZ1bmMgKyBcIicgaW4gdGV4dCBtb2RlXCIsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGV4ZXIsIGJhc2VHcm91cC5wb3NpdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBhcmdzID0gdGhpcy5wYXJzZUFyZ3VtZW50cyhmdW5jLCBmdW5jRGF0YSk7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5jYWxsRnVuY3Rpb24oZnVuYywgYXJncywgYXJncy5wb3AoKSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFBhcnNlTm9kZShyZXN1bHQudHlwZSwgcmVzdWx0LCB0aGlzLm1vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGJhc2VHcm91cC5yZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59O1xuXG4vKipcbiAqIENhbGwgYSBmdW5jdGlvbiBoYW5kbGVyIHdpdGggYSBzdWl0YWJsZSBjb250ZXh0IGFuZCBhcmd1bWVudHMuXG4gKi9cblBhcnNlci5wcm90b3R5cGUuY2FsbEZ1bmN0aW9uID0gZnVuY3Rpb24obmFtZSwgYXJncywgcG9zaXRpb25zKSB7XG4gICAgdmFyIGNvbnRleHQgPSB7XG4gICAgICAgIGZ1bmNOYW1lOiBuYW1lLFxuICAgICAgICBwYXJzZXI6IHRoaXMsXG4gICAgICAgIGxleGVyOiB0aGlzLmxleGVyLFxuICAgICAgICBwb3NpdGlvbnM6IHBvc2l0aW9ucyxcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbnNbbmFtZV0uaGFuZGxlcihjb250ZXh0LCBhcmdzKTtcbn07XG5cbi8qKlxuICogUGFyc2VzIHRoZSBhcmd1bWVudHMgb2YgYSBmdW5jdGlvbiBvciBlbnZpcm9ubWVudFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmdW5jICBcIlxcbmFtZVwiIG9yIFwiXFxiZWdpbntuYW1lfVwiXG4gKiBAcGFyYW0ge3tudW1BcmdzOm51bWJlcixudW1PcHRpb25hbEFyZ3M6bnVtYmVyfHVuZGVmaW5lZH19IGZ1bmNEYXRhXG4gKiBAcmV0dXJuIHRoZSBhcnJheSBvZiBhcmd1bWVudHMsIHdpdGggdGhlIGxpc3Qgb2YgcG9zaXRpb25zIGFzIGxhc3QgZWxlbWVudFxuICovXG5QYXJzZXIucHJvdG90eXBlLnBhcnNlQXJndW1lbnRzID0gZnVuY3Rpb24oZnVuYywgZnVuY0RhdGEpIHtcbiAgICB2YXIgdG90YWxBcmdzID0gZnVuY0RhdGEubnVtQXJncyArIGZ1bmNEYXRhLm51bU9wdGlvbmFsQXJncztcbiAgICBpZiAodG90YWxBcmdzID09PSAwKSB7XG4gICAgICAgIHJldHVybiBbW3RoaXMucG9zXV07XG4gICAgfVxuXG4gICAgdmFyIGJhc2VHcmVlZGluZXNzID0gZnVuY0RhdGEuZ3JlZWRpbmVzcztcbiAgICB2YXIgcG9zaXRpb25zID0gW3RoaXMucG9zXTtcbiAgICB2YXIgYXJncyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b3RhbEFyZ3M7IGkrKykge1xuICAgICAgICB2YXIgYXJnVHlwZSA9IGZ1bmNEYXRhLmFyZ1R5cGVzICYmIGZ1bmNEYXRhLmFyZ1R5cGVzW2ldO1xuICAgICAgICB2YXIgYXJnO1xuICAgICAgICBpZiAoaSA8IGZ1bmNEYXRhLm51bU9wdGlvbmFsQXJncykge1xuICAgICAgICAgICAgaWYgKGFyZ1R5cGUpIHtcbiAgICAgICAgICAgICAgICBhcmcgPSB0aGlzLnBhcnNlU3BlY2lhbEdyb3VwKGFyZ1R5cGUsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhcmcgPSB0aGlzLnBhcnNlT3B0aW9uYWxHcm91cCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFhcmcpIHtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2gobnVsbCk7XG4gICAgICAgICAgICAgICAgcG9zaXRpb25zLnB1c2godGhpcy5wb3MpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGFyZ1R5cGUpIHtcbiAgICAgICAgICAgICAgICBhcmcgPSB0aGlzLnBhcnNlU3BlY2lhbEdyb3VwKGFyZ1R5cGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhcmcgPSB0aGlzLnBhcnNlR3JvdXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghYXJnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLnRocm93T25FcnJvciAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRUb2tlbi50ZXh0WzBdID09PSBcIlxcXFxcIikge1xuICAgICAgICAgICAgICAgICAgICBhcmcgPSBuZXcgUGFyc2VGdW5jT3JBcmd1bWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlVW5zdXBwb3J0ZWRDbWQodGhpcy5uZXh0VG9rZW4udGV4dCksXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkV4cGVjdGVkIGdyb3VwIGFmdGVyICdcIiArIGZ1bmMgKyBcIidcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGV4ZXIsIHRoaXMucG9zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFyZ05vZGU7XG4gICAgICAgIGlmIChhcmcuaXNGdW5jdGlvbikge1xuICAgICAgICAgICAgdmFyIGFyZ0dyZWVkaW5lc3MgPVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uc1thcmcucmVzdWx0XS5ncmVlZGluZXNzO1xuICAgICAgICAgICAgaWYgKGFyZ0dyZWVkaW5lc3MgPiBiYXNlR3JlZWRpbmVzcykge1xuICAgICAgICAgICAgICAgIGFyZ05vZGUgPSB0aGlzLnBhcnNlRnVuY3Rpb24oYXJnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgIFwiR290IGZ1bmN0aW9uICdcIiArIGFyZy5yZXN1bHQgKyBcIicgYXMgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcImFyZ3VtZW50IHRvICdcIiArIGZ1bmMgKyBcIidcIixcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZXhlciwgdGhpcy5wb3MgLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFyZ05vZGUgPSBhcmcucmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGFyZ3MucHVzaChhcmdOb2RlKTtcbiAgICAgICAgcG9zaXRpb25zLnB1c2godGhpcy5wb3MpO1xuICAgIH1cblxuICAgIGFyZ3MucHVzaChwb3NpdGlvbnMpO1xuXG4gICAgcmV0dXJuIGFyZ3M7XG59O1xuXG5cbi8qKlxuICogUGFyc2VzIGEgZ3JvdXAgd2hlbiB0aGUgbW9kZSBpcyBjaGFuZ2luZy4gVGFrZXMgYSBwb3NpdGlvbiwgYSBuZXcgbW9kZSwgYW5kXG4gKiBhbiBvdXRlciBtb2RlIHRoYXQgaXMgdXNlZCB0byBwYXJzZSB0aGUgb3V0c2lkZS5cbiAqXG4gKiBAcmV0dXJuIHs/UGFyc2VGdW5jT3JBcmd1bWVudH1cbiAqL1xuUGFyc2VyLnByb3RvdHlwZS5wYXJzZVNwZWNpYWxHcm91cCA9IGZ1bmN0aW9uKGlubmVyTW9kZSwgb3B0aW9uYWwpIHtcbiAgICB2YXIgb3V0ZXJNb2RlID0gdGhpcy5tb2RlO1xuICAgIC8vIEhhbmRsZSBgb3JpZ2luYWxgIGFyZ1R5cGVzXG4gICAgaWYgKGlubmVyTW9kZSA9PT0gXCJvcmlnaW5hbFwiKSB7XG4gICAgICAgIGlubmVyTW9kZSA9IG91dGVyTW9kZTtcbiAgICB9XG5cbiAgICBpZiAoaW5uZXJNb2RlID09PSBcImNvbG9yXCIgfHwgaW5uZXJNb2RlID09PSBcInNpemVcIikge1xuICAgICAgICAvLyBjb2xvciBhbmQgc2l6ZSBtb2RlcyBhcmUgc3BlY2lhbCBiZWNhdXNlIHRoZXkgc2hvdWxkIGhhdmUgYnJhY2VzIGFuZFxuICAgICAgICAvLyBzaG91bGQgb25seSBsZXggYSBzaW5nbGUgc3ltYm9sIGluc2lkZVxuICAgICAgICB2YXIgb3BlbkJyYWNlID0gdGhpcy5uZXh0VG9rZW47XG4gICAgICAgIGlmIChvcHRpb25hbCAmJiBvcGVuQnJhY2UudGV4dCAhPT0gXCJbXCIpIHtcbiAgICAgICAgICAgIC8vIG9wdGlvbmFsIGFyZ3VtZW50cyBzaG91bGQgcmV0dXJuIG51bGwgaWYgdGhleSBkb24ndCBleGlzdFxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhlIGNhbGwgdG8gZXhwZWN0IHdpbGwgbGV4IHRoZSB0b2tlbiBhZnRlciB0aGUgJ3snIGluIGlubmVyIG1vZGVcbiAgICAgICAgdGhpcy5tb2RlID0gaW5uZXJNb2RlO1xuICAgICAgICB0aGlzLmV4cGVjdChvcHRpb25hbCA/IFwiW1wiIDogXCJ7XCIpO1xuICAgICAgICB2YXIgaW5uZXIgPSB0aGlzLm5leHRUb2tlbjtcbiAgICAgICAgdGhpcy5tb2RlID0gb3V0ZXJNb2RlO1xuICAgICAgICB2YXIgZGF0YTtcbiAgICAgICAgaWYgKGlubmVyTW9kZSA9PT0gXCJjb2xvclwiKSB7XG4gICAgICAgICAgICBkYXRhID0gaW5uZXIudGV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRhdGEgPSBpbm5lci5kYXRhO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29uc3VtZSgpOyAvLyBjb25zdW1lIHRoZSB0b2tlbiBzdG9yZWQgaW4gaW5uZXJcbiAgICAgICAgdGhpcy5leHBlY3Qob3B0aW9uYWwgPyBcIl1cIiA6IFwifVwiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQYXJzZUZ1bmNPckFyZ3VtZW50KFxuICAgICAgICAgICAgbmV3IFBhcnNlTm9kZShpbm5lck1vZGUsIGRhdGEsIG91dGVyTW9kZSksXG4gICAgICAgICAgICBmYWxzZSk7XG4gICAgfSBlbHNlIGlmIChpbm5lck1vZGUgPT09IFwidGV4dFwiKSB7XG4gICAgICAgIC8vIHRleHQgbW9kZSBpcyBzcGVjaWFsIGJlY2F1c2UgaXQgc2hvdWxkIGlnbm9yZSB0aGUgd2hpdGVzcGFjZSBiZWZvcmVcbiAgICAgICAgLy8gaXRcbiAgICAgICAgdmFyIHdoaXRlc3BhY2UgPSB0aGlzLmxleGVyLmxleCh0aGlzLnBvcywgXCJ3aGl0ZXNwYWNlXCIpO1xuICAgICAgICB0aGlzLnBvcyA9IHdoaXRlc3BhY2UucG9zaXRpb247XG4gICAgfVxuXG4gICAgLy8gQnkgdGhlIHRpbWUgd2UgZ2V0IGhlcmUsIGlubmVyTW9kZSBpcyBvbmUgb2YgXCJ0ZXh0XCIgb3IgXCJtYXRoXCIuXG4gICAgLy8gV2Ugc3dpdGNoIHRoZSBtb2RlIG9mIHRoZSBwYXJzZXIsIHJlY3Vyc2UsIHRoZW4gcmVzdG9yZSB0aGUgb2xkIG1vZGUuXG4gICAgdGhpcy5tb2RlID0gaW5uZXJNb2RlO1xuICAgIHRoaXMubmV4dFRva2VuID0gdGhpcy5sZXhlci5sZXgodGhpcy5wb3MsIGlubmVyTW9kZSk7XG4gICAgdmFyIHJlcztcbiAgICBpZiAob3B0aW9uYWwpIHtcbiAgICAgICAgcmVzID0gdGhpcy5wYXJzZU9wdGlvbmFsR3JvdXAoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXMgPSB0aGlzLnBhcnNlR3JvdXAoKTtcbiAgICB9XG4gICAgdGhpcy5tb2RlID0gb3V0ZXJNb2RlO1xuICAgIHRoaXMubmV4dFRva2VuID0gdGhpcy5sZXhlci5sZXgodGhpcy5wb3MsIG91dGVyTW9kZSk7XG4gICAgcmV0dXJuIHJlcztcbn07XG5cbi8qKlxuICogUGFyc2VzIGEgZ3JvdXAsIHdoaWNoIGlzIGVpdGhlciBhIHNpbmdsZSBudWNsZXVzIChsaWtlIFwieFwiKSBvciBhbiBleHByZXNzaW9uXG4gKiBpbiBicmFjZXMgKGxpa2UgXCJ7eCt5fVwiKVxuICpcbiAqIEByZXR1cm4gez9QYXJzZUZ1bmNPckFyZ3VtZW50fVxuICovXG5QYXJzZXIucHJvdG90eXBlLnBhcnNlR3JvdXAgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBUcnkgdG8gcGFyc2UgYW4gb3BlbiBicmFjZVxuICAgIGlmICh0aGlzLm5leHRUb2tlbi50ZXh0ID09PSBcIntcIikge1xuICAgICAgICAvLyBJZiB3ZSBnZXQgYSBicmFjZSwgcGFyc2UgYW4gZXhwcmVzc2lvblxuICAgICAgICB0aGlzLmNvbnN1bWUoKTtcbiAgICAgICAgdmFyIGV4cHJlc3Npb24gPSB0aGlzLnBhcnNlRXhwcmVzc2lvbihmYWxzZSk7XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBnZXQgYSBjbG9zZSBicmFjZVxuICAgICAgICB0aGlzLmV4cGVjdChcIn1cIik7XG4gICAgICAgIHJldHVybiBuZXcgUGFyc2VGdW5jT3JBcmd1bWVudChcbiAgICAgICAgICAgIG5ldyBQYXJzZU5vZGUoXCJvcmRncm91cFwiLCBleHByZXNzaW9uLCB0aGlzLm1vZGUpLFxuICAgICAgICAgICAgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE90aGVyd2lzZSwganVzdCByZXR1cm4gYSBudWNsZXVzXG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlU3ltYm9sKCk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBQYXJzZXMgYSBncm91cCwgd2hpY2ggaXMgYW4gZXhwcmVzc2lvbiBpbiBicmFja2V0cyAobGlrZSBcIlt4K3ldXCIpXG4gKlxuICogQHJldHVybiB7P1BhcnNlRnVuY09yQXJndW1lbnR9XG4gKi9cblBhcnNlci5wcm90b3R5cGUucGFyc2VPcHRpb25hbEdyb3VwID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gVHJ5IHRvIHBhcnNlIGFuIG9wZW4gYnJhY2tldFxuICAgIGlmICh0aGlzLm5leHRUb2tlbi50ZXh0ID09PSBcIltcIikge1xuICAgICAgICAvLyBJZiB3ZSBnZXQgYSBicmFjZSwgcGFyc2UgYW4gZXhwcmVzc2lvblxuICAgICAgICB0aGlzLmNvbnN1bWUoKTtcbiAgICAgICAgdmFyIGV4cHJlc3Npb24gPSB0aGlzLnBhcnNlRXhwcmVzc2lvbihmYWxzZSwgXCJdXCIpO1xuICAgICAgICAvLyBNYWtlIHN1cmUgd2UgZ2V0IGEgY2xvc2UgYnJhY2tldFxuICAgICAgICB0aGlzLmV4cGVjdChcIl1cIik7XG4gICAgICAgIHJldHVybiBuZXcgUGFyc2VGdW5jT3JBcmd1bWVudChcbiAgICAgICAgICAgIG5ldyBQYXJzZU5vZGUoXCJvcmRncm91cFwiLCBleHByZXNzaW9uLCB0aGlzLm1vZGUpLFxuICAgICAgICAgICAgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE90aGVyd2lzZSwgcmV0dXJuIG51bGwsXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn07XG5cbi8qKlxuICogUGFyc2UgYSBzaW5nbGUgc3ltYm9sIG91dCBvZiB0aGUgc3RyaW5nLiBIZXJlLCB3ZSBoYW5kbGUgYm90aCB0aGUgZnVuY3Rpb25zXG4gKiB3ZSBoYXZlIGRlZmluZWQsIGFzIHdlbGwgYXMgdGhlIHNpbmdsZSBjaGFyYWN0ZXIgc3ltYm9sc1xuICpcbiAqIEByZXR1cm4gez9QYXJzZUZ1bmNPckFyZ3VtZW50fVxuICovXG5QYXJzZXIucHJvdG90eXBlLnBhcnNlU3ltYm9sID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG51Y2xldXMgPSB0aGlzLm5leHRUb2tlbjtcblxuICAgIGlmIChmdW5jdGlvbnNbbnVjbGV1cy50ZXh0XSkge1xuICAgICAgICB0aGlzLmNvbnN1bWUoKTtcbiAgICAgICAgLy8gSWYgdGhlcmUgZXhpc3RzIGEgZnVuY3Rpb24gd2l0aCB0aGlzIG5hbWUsIHdlIHJldHVybiB0aGUgZnVuY3Rpb24gYW5kXG4gICAgICAgIC8vIHNheSB0aGF0IGl0IGlzIGEgZnVuY3Rpb24uXG4gICAgICAgIHJldHVybiBuZXcgUGFyc2VGdW5jT3JBcmd1bWVudChcbiAgICAgICAgICAgIG51Y2xldXMudGV4dCxcbiAgICAgICAgICAgIHRydWUpO1xuICAgIH0gZWxzZSBpZiAoc3ltYm9sc1t0aGlzLm1vZGVdW251Y2xldXMudGV4dF0pIHtcbiAgICAgICAgdGhpcy5jb25zdW1lKCk7XG4gICAgICAgIC8vIE90aGVyd2lzZSBpZiB0aGlzIGlzIGEgbm8tYXJndW1lbnQgZnVuY3Rpb24sIGZpbmQgdGhlIHR5cGUgaXRcbiAgICAgICAgLy8gY29ycmVzcG9uZHMgdG8gaW4gdGhlIHN5bWJvbHMgbWFwXG4gICAgICAgIHJldHVybiBuZXcgUGFyc2VGdW5jT3JBcmd1bWVudChcbiAgICAgICAgICAgIG5ldyBQYXJzZU5vZGUoc3ltYm9sc1t0aGlzLm1vZGVdW251Y2xldXMudGV4dF0uZ3JvdXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG51Y2xldXMudGV4dCwgdGhpcy5tb2RlKSxcbiAgICAgICAgICAgIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59O1xuXG5QYXJzZXIucHJvdG90eXBlLlBhcnNlTm9kZSA9IFBhcnNlTm9kZTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYXJzZXI7XG4iLCIvKipcbiAqIFRoaXMgaXMgYSBtb2R1bGUgZm9yIHN0b3Jpbmcgc2V0dGluZ3MgcGFzc2VkIGludG8gS2FUZVguIEl0IGNvcnJlY3RseSBoYW5kbGVzXG4gKiBkZWZhdWx0IHNldHRpbmdzLlxuICovXG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIGZvciBnZXR0aW5nIGEgZGVmYXVsdCB2YWx1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKi9cbmZ1bmN0aW9uIGdldChvcHRpb24sIGRlZmF1bHRWYWx1ZSkge1xuICAgIHJldHVybiBvcHRpb24gPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRWYWx1ZSA6IG9wdGlvbjtcbn1cblxuLyoqXG4gKiBUaGUgbWFpbiBTZXR0aW5ncyBvYmplY3RcbiAqXG4gKiBUaGUgY3VycmVudCBvcHRpb25zIHN0b3JlZCBhcmU6XG4gKiAgLSBkaXNwbGF5TW9kZTogV2hldGhlciB0aGUgZXhwcmVzc2lvbiBzaG91bGQgYmUgdHlwZXNldCBieSBkZWZhdWx0IGluXG4gKiAgICAgICAgICAgICAgICAgdGV4dHN0eWxlIG9yIGRpc3BsYXlzdHlsZSAoZGVmYXVsdCBmYWxzZSlcbiAqL1xuZnVuY3Rpb24gU2V0dGluZ3Mob3B0aW9ucykge1xuICAgIC8vIGFsbG93IG51bGwgb3B0aW9uc1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHRoaXMuZGlzcGxheU1vZGUgPSBnZXQob3B0aW9ucy5kaXNwbGF5TW9kZSwgZmFsc2UpO1xuICAgIHRoaXMudGhyb3dPbkVycm9yID0gZ2V0KG9wdGlvbnMudGhyb3dPbkVycm9yLCB0cnVlKTtcbiAgICB0aGlzLmVycm9yQ29sb3IgPSBnZXQob3B0aW9ucy5lcnJvckNvbG9yLCBcIiNjYzAwMDBcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2V0dGluZ3M7XG4iLCIvKiBlc2xpbnQgbm8tY29uc29sZTowICovXG4vKipcbiAqIFRoaXMgaXMgdGhlIG1haW4gZW50cnkgcG9pbnQgZm9yIEthVGVYLiBIZXJlLCB3ZSBleHBvc2UgZnVuY3Rpb25zIGZvclxuICogcmVuZGVyaW5nIGV4cHJlc3Npb25zIGVpdGhlciB0byBET00gbm9kZXMgb3IgdG8gbWFya3VwIHN0cmluZ3MuXG4gKlxuICogV2UgYWxzbyBleHBvc2UgdGhlIFBhcnNlRXJyb3IgY2xhc3MgdG8gY2hlY2sgaWYgZXJyb3JzIHRocm93biBmcm9tIEthVGVYIGFyZVxuICogZXJyb3JzIGluIHRoZSBleHByZXNzaW9uLCBvciBlcnJvcnMgaW4gamF2YXNjcmlwdCBoYW5kbGluZy5cbiAqL1xuXG52YXIgUGFyc2VFcnJvciA9IHJlcXVpcmUoXCIuL3NyYy9QYXJzZUVycm9yXCIpO1xudmFyIFNldHRpbmdzID0gcmVxdWlyZShcIi4vc3JjL1NldHRpbmdzXCIpO1xuXG52YXIgYnVpbGRUcmVlID0gcmVxdWlyZShcIi4vc3JjL2J1aWxkVHJlZVwiKTtcbnZhciBwYXJzZVRyZWUgPSByZXF1aXJlKFwiLi9zcmMvcGFyc2VUcmVlXCIpO1xudmFyIHV0aWxzID0gcmVxdWlyZShcIi4vc3JjL3V0aWxzXCIpO1xuXG4vKipcbiAqIFBhcnNlIGFuZCBidWlsZCBhbiBleHByZXNzaW9uLCBhbmQgcGxhY2UgdGhhdCBleHByZXNzaW9uIGluIHRoZSBET00gbm9kZVxuICogZ2l2ZW4uXG4gKi9cbnZhciByZW5kZXIgPSBmdW5jdGlvbihleHByZXNzaW9uLCBiYXNlTm9kZSwgb3B0aW9ucykge1xuICAgIHV0aWxzLmNsZWFyTm9kZShiYXNlTm9kZSk7XG5cbiAgICB2YXIgc2V0dGluZ3MgPSBuZXcgU2V0dGluZ3Mob3B0aW9ucyk7XG5cbiAgICB2YXIgdHJlZSA9IHBhcnNlVHJlZShleHByZXNzaW9uLCBzZXR0aW5ncyk7XG4gICAgdmFyIG5vZGUgPSBidWlsZFRyZWUodHJlZSwgZXhwcmVzc2lvbiwgc2V0dGluZ3MpLnRvTm9kZSgpO1xuXG4gICAgYmFzZU5vZGUuYXBwZW5kQ2hpbGQobm9kZSk7XG59O1xuXG4vLyBLYVRlWCdzIHN0eWxlcyBkb24ndCB3b3JrIHByb3Blcmx5IGluIHF1aXJrcyBtb2RlLiBQcmludCBvdXQgYW4gZXJyb3IsIGFuZFxuLy8gZGlzYWJsZSByZW5kZXJpbmcuXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgaWYgKGRvY3VtZW50LmNvbXBhdE1vZGUgIT09IFwiQ1NTMUNvbXBhdFwiKSB7XG4gICAgICAgIHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgIFwiV2FybmluZzogS2FUZVggZG9lc24ndCB3b3JrIGluIHF1aXJrcyBtb2RlLiBNYWtlIHN1cmUgeW91ciBcIiArXG4gICAgICAgICAgICAgICAgXCJ3ZWJzaXRlIGhhcyBhIHN1aXRhYmxlIGRvY3R5cGUuXCIpO1xuXG4gICAgICAgIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXJyb3IoXCJLYVRlWCBkb2Vzbid0IHdvcmsgaW4gcXVpcmtzIG1vZGUuXCIpO1xuICAgICAgICB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBQYXJzZSBhbmQgYnVpbGQgYW4gZXhwcmVzc2lvbiwgYW5kIHJldHVybiB0aGUgbWFya3VwIGZvciB0aGF0LlxuICovXG52YXIgcmVuZGVyVG9TdHJpbmcgPSBmdW5jdGlvbihleHByZXNzaW9uLCBvcHRpb25zKSB7XG4gICAgdmFyIHNldHRpbmdzID0gbmV3IFNldHRpbmdzKG9wdGlvbnMpO1xuXG4gICAgdmFyIHRyZWUgPSBwYXJzZVRyZWUoZXhwcmVzc2lvbiwgc2V0dGluZ3MpO1xuICAgIHJldHVybiBidWlsZFRyZWUodHJlZSwgZXhwcmVzc2lvbiwgc2V0dGluZ3MpLnRvTWFya3VwKCk7XG59O1xuXG4vKipcbiAqIFBhcnNlIGFuIGV4cHJlc3Npb24gYW5kIHJldHVybiB0aGUgcGFyc2UgdHJlZS5cbiAqL1xudmFyIGdlbmVyYXRlUGFyc2VUcmVlID0gZnVuY3Rpb24oZXhwcmVzc2lvbiwgb3B0aW9ucykge1xuICAgIHZhciBzZXR0aW5ncyA9IG5ldyBTZXR0aW5ncyhvcHRpb25zKTtcbiAgICByZXR1cm4gcGFyc2VUcmVlKGV4cHJlc3Npb24sIHNldHRpbmdzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHJlbmRlcjogcmVuZGVyLFxuICAgIHJlbmRlclRvU3RyaW5nOiByZW5kZXJUb1N0cmluZyxcbiAgICAvKipcbiAgICAgKiBOT1RFOiBUaGlzIG1ldGhvZCBpcyBub3QgY3VycmVudGx5IHJlY29tbWVuZGVkIGZvciBwdWJsaWMgdXNlLlxuICAgICAqIFRoZSBpbnRlcm5hbCB0cmVlIHJlcHJlc2VudGF0aW9uIGlzIHVuc3RhYmxlIGFuZCBpcyB2ZXJ5IGxpa2VseVxuICAgICAqIHRvIGNoYW5nZS4gVXNlIGF0IHlvdXIgb3duIHJpc2suXG4gICAgICovXG4gICAgX19wYXJzZTogZ2VuZXJhdGVQYXJzZVRyZWUsXG4gICAgUGFyc2VFcnJvcjogUGFyc2VFcnJvcixcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9