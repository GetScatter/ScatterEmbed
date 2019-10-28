(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[33],{

/***/ "Nmc6":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// This file is the concatenation of many js files.
// See http://github.com/jimhigson/oboe.js for the raw source

// having a local undefined, window, Object etc allows slightly better minification:
(function  (window, Object, Array, Error, JSON, undefined ) {

   // v2.1.3-15-g7432b49

/*

Copyright (c) 2013, Jim Higson

All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

1.  Redistributions of source code must retain the above copyright
    notice, this list of conditions and the following disclaimer.

2.  Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the
    documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

/** 
 * Partially complete a function.
 * 
 *  var add3 = partialComplete( function add(a,b){return a+b}, 3 );
 *  
 *  add3(4) // gives 7
 *  
 *  function wrap(left, right, cen){return left + " " + cen + " " + right;}
 *  
 *  var pirateGreeting = partialComplete( wrap , "I'm", ", a mighty pirate!" );
 *  
 *  pirateGreeting("Guybrush Threepwood"); 
 *  // gives "I'm Guybrush Threepwood, a mighty pirate!"
 */
var partialComplete = varArgs(function( fn, args ) {

      // this isn't the shortest way to write this but it does
      // avoid creating a new array each time to pass to fn.apply,
      // otherwise could just call boundArgs.concat(callArgs)       

      var numBoundArgs = args.length;

      return varArgs(function( callArgs ) {
         
         for (var i = 0; i < callArgs.length; i++) {
            args[numBoundArgs + i] = callArgs[i];
         }
         
         args.length = numBoundArgs + callArgs.length;         
                     
         return fn.apply(this, args);
      }); 
   }),

/**
 * Compose zero or more functions:
 * 
 *    compose(f1, f2, f3)(x) = f1(f2(f3(x))))
 * 
 * The last (inner-most) function may take more than one parameter:
 * 
 *    compose(f1, f2, f3)(x,y) = f1(f2(f3(x,y))))
 */
   compose = varArgs(function(fns) {

      var fnsList = arrayAsList(fns);
   
      function next(params, curFn) {  
         return [apply(params, curFn)];   
      }
            
      return varArgs(function(startParams){
        
         return foldR(next, startParams, fnsList)[0];
      });
   });

/**
 * A more optimised version of compose that takes exactly two functions
 * @param f1
 * @param f2
 */
function compose2(f1, f2){
   return function(){
      return f1.call(this,f2.apply(this,arguments));
   }
}

/**
 * Generic form for a function to get a property from an object
 * 
 *    var o = {
 *       foo:'bar'
 *    }
 *    
 *    var getFoo = attr('foo')
 *    
 *    fetFoo(o) // returns 'bar'
 * 
 * @param {String} key the property name
 */
function attr(key) {
   return function(o) { return o[key]; };
}
        
/**
 * Call a list of functions with the same args until one returns a 
 * truthy result. Similar to the || operator.
 * 
 * So:
 *      lazyUnion([f1,f2,f3 ... fn])( p1, p2 ... pn )
 *      
 * Is equivalent to: 
 *      apply([p1, p2 ... pn], f1) || 
 *      apply([p1, p2 ... pn], f2) || 
 *      apply([p1, p2 ... pn], f3) ... apply(fn, [p1, p2 ... pn])  
 *  
 * @returns the first return value that is given that is truthy.
 */
   var lazyUnion = varArgs(function(fns) {

      return varArgs(function(params){
   
         var maybeValue;
   
         for (var i = 0; i < len(fns); i++) {
   
            maybeValue = apply(params, fns[i]);
   
            if( maybeValue ) {
               return maybeValue;
            }
         }
      });
   });   

/**
 * This file declares various pieces of functional programming.
 * 
 * This isn't a general purpose functional library, to keep things small it
 * has just the parts useful for Oboe.js.
 */


/**
 * Call a single function with the given arguments array.
 * Basically, a functional-style version of the OO-style Function#apply for 
 * when we don't care about the context ('this') of the call.
 * 
 * The order of arguments allows partial completion of the arguments array
 */
function apply(args, fn) {
   return fn.apply(undefined, args);
}

/**
 * Define variable argument functions but cut out all that tedious messing about 
 * with the arguments object. Delivers the variable-length part of the arguments
 * list as an array.
 * 
 * Eg:
 * 
 * var myFunction = varArgs(
 *    function( fixedArgument, otherFixedArgument, variableNumberOfArguments ){
 *       console.log( variableNumberOfArguments );
 *    }
 * )
 * 
 * myFunction('a', 'b', 1, 2, 3); // logs [1,2,3]
 * 
 * var myOtherFunction = varArgs(function( variableNumberOfArguments ){
 *    console.log( variableNumberOfArguments );
 * })
 * 
 * myFunction(1, 2, 3); // logs [1,2,3]
 * 
 */
function varArgs(fn){

   var numberOfFixedArguments = fn.length -1,
       slice = Array.prototype.slice;          
         
                   
   if( numberOfFixedArguments == 0 ) {
      // an optimised case for when there are no fixed args:   
   
      return function(){
         return fn.call(this, slice.call(arguments));
      }
      
   } else if( numberOfFixedArguments == 1 ) {
      // an optimised case for when there are is one fixed args:
   
      return function(){
         return fn.call(this, arguments[0], slice.call(arguments, 1));
      }
   }
   
   // general case   

   // we know how many arguments fn will always take. Create a
   // fixed-size array to hold that many, to be re-used on
   // every call to the returned function
   var argsHolder = Array(fn.length);   
                             
   return function(){
                            
      for (var i = 0; i < numberOfFixedArguments; i++) {
         argsHolder[i] = arguments[i];         
      }

      argsHolder[numberOfFixedArguments] = 
         slice.call(arguments, numberOfFixedArguments);
                                
      return fn.apply( this, argsHolder);      
   }       
}


/**
 * Swap the order of parameters to a binary function
 * 
 * A bit like this flip: http://zvon.org/other/haskell/Outputprelude/flip_f.html
 */
function flip(fn){
   return function(a, b){
      return fn(b,a);
   }
}


/**
 * Create a function which is the intersection of two other functions.
 * 
 * Like the && operator, if the first is truthy, the second is never called,
 * otherwise the return value from the second is returned.
 */
function lazyIntersection(fn1, fn2) {

   return function (param) {
                                                              
      return fn1(param) && fn2(param);
   };   
}

/**
 * A function which does nothing
 */
function noop(){}

/**
 * A function which is always happy
 */
function always(){return true}

/**
 * Create a function which always returns the same
 * value
 * 
 * var return3 = functor(3);
 * 
 * return3() // gives 3
 * return3() // still gives 3
 * return3() // will always give 3
 */
function functor(val){
   return function(){
      return val;
   }
}

/**
 * This file defines some loosely associated syntactic sugar for 
 * Javascript programming 
 */


/**
 * Returns true if the given candidate is of type T
 */
function isOfType(T, maybeSomething){
   return maybeSomething && maybeSomething.constructor === T;
}

var len = attr('length'),    
    isString = partialComplete(isOfType, String);

/** 
 * I don't like saying this:
 * 
 *    foo !=== undefined
 *    
 * because of the double-negative. I find this:
 * 
 *    defined(foo)
 *    
 * easier to read.
 */ 
function defined( value ) {
   return value !== undefined;
}

/**
 * Returns true if object o has a key named like every property in 
 * the properties array. Will give false if any are missing, or if o 
 * is not an object.
 */
function hasAllProperties(fieldList, o) {

   return      (o instanceof Object) 
            &&
               all(function (field) {         
                  return (field in o);         
               }, fieldList);
}
/**
 * Like cons in Lisp
 */
function cons(x, xs) {
   
   /* Internally lists are linked 2-element Javascript arrays.
          
      Ideally the return here would be Object.freeze([x,xs])
      so that bugs related to mutation are found fast.
      However, cons is right on the critical path for
      performance and this slows oboe-mark down by
      ~25%. Under theoretical future JS engines that freeze more
      efficiently (possibly even use immutability to
      run faster) this should be considered for
      restoration.
   */
   
   return [x,xs];
}

/**
 * The empty list
 */
var emptyList = null,

/**
 * Get the head of a list.
 * 
 * Ie, head(cons(a,b)) = a
 */
    head = attr(0),

/**
 * Get the tail of a list.
 * 
 * Ie, tail(cons(a,b)) = b
 */
    tail = attr(1);


/** 
 * Converts an array to a list 
 * 
 *    asList([a,b,c])
 * 
 * is equivalent to:
 *    
 *    cons(a, cons(b, cons(c, emptyList))) 
 **/
function arrayAsList(inputArray){

   return reverseList( 
      inputArray.reduce(
         flip(cons),
         emptyList 
      )
   );
}

/**
 * A varargs version of arrayAsList. Works a bit like list
 * in LISP.
 * 
 *    list(a,b,c) 
 *    
 * is equivalent to:
 * 
 *    cons(a, cons(b, cons(c, emptyList)))
 */
var list = varArgs(arrayAsList);

/**
 * Convert a list back to a js native array
 */
function listAsArray(list){

   return foldR( function(arraySoFar, listItem){
      
      arraySoFar.unshift(listItem);
      return arraySoFar;
           
   }, [], list );
   
}

/**
 * Map a function over a list 
 */
function map(fn, list) {

   return list
            ? cons(fn(head(list)), map(fn,tail(list)))
            : emptyList
            ;
}

/**
 * foldR implementation. Reduce a list down to a single value.
 * 
 * @pram {Function} fn     (rightEval, curVal) -> result 
 */
function foldR(fn, startValue, list) {
      
   return list 
            ? fn(foldR(fn, startValue, tail(list)), head(list))
            : startValue
            ;
}

/**
 * foldR implementation. Reduce a list down to a single value.
 * 
 * @pram {Function} fn     (rightEval, curVal) -> result 
 */
function foldR1(fn, list) {
      
   return tail(list) 
            ? fn(foldR1(fn, tail(list)), head(list))
            : head(list)
            ;
}


/**
 * Return a list like the one given but with the first instance equal 
 * to item removed 
 */
function without(list, test, removedFn) {
 
   return withoutInner(list, removedFn || noop);
 
   function withoutInner(subList, removedFn) {
      return subList  
         ?  ( test(head(subList)) 
                  ? (removedFn(head(subList)), tail(subList)) 
                  : cons(head(subList), withoutInner(tail(subList), removedFn))
            )
         : emptyList
         ;
   }               
}

/** 
 * Returns true if the given function holds for every item in 
 * the list, false otherwise 
 */
function all(fn, list) {
   
   return !list || 
          ( fn(head(list)) && all(fn, tail(list)) );
}

/**
 * Call every function in a list of functions with the same arguments
 * 
 * This doesn't make any sense if we're doing pure functional because 
 * it doesn't return anything. Hence, this is only really useful if the
 * functions being called have side-effects. 
 */
function applyEach(fnList, args) {

   if( fnList ) {  
      head(fnList).apply(null, args);
      
      applyEach(tail(fnList), args);
   }
}

/**
 * Reverse the order of a list
 */
function reverseList(list){ 

   // js re-implementation of 3rd solution from:
   //    http://www.haskell.org/haskellwiki/99_questions/Solutions/5
   function reverseInner( list, reversedAlready ) {
      if( !list ) {
         return reversedAlready;
      }
      
      return reverseInner(tail(list), cons(head(list), reversedAlready))
   }

   return reverseInner(list, emptyList);
}

function first(test, list) {
   return   list &&
               (test(head(list)) 
                  ? head(list) 
                  : first(test,tail(list))); 
}

/* 
   This is a slightly hacked-up browser only version of clarinet 
   
      *  some features removed to help keep browser Oboe under 
         the 5k micro-library limit
      *  plug directly into event bus
   
   For the original go here:
      https://github.com/dscape/clarinet

   We receive the events:
      STREAM_DATA
      STREAM_END
      
   We emit the events:
      SAX_KEY
      SAX_VALUE_OPEN
      SAX_VALUE_CLOSE      
      FAIL_EVENT      
 */

function clarinet(eventBus) {
  "use strict";
   
  var 
      // shortcut some events on the bus
      emitSaxKey           = eventBus(SAX_KEY).emit,
      emitValueOpen        = eventBus(SAX_VALUE_OPEN).emit,
      emitValueClose       = eventBus(SAX_VALUE_CLOSE).emit,
      emitFail             = eventBus(FAIL_EVENT).emit,
              
      MAX_BUFFER_LENGTH = 64 * 1024
  ,   stringTokenPattern = /[\\"\n]/g
  ,   _n = 0
  
      // states
  ,   BEGIN                = _n++
  ,   VALUE                = _n++ // general stuff
  ,   OPEN_OBJECT          = _n++ // {
  ,   CLOSE_OBJECT         = _n++ // }
  ,   OPEN_ARRAY           = _n++ // [
  ,   CLOSE_ARRAY          = _n++ // ]
  ,   STRING               = _n++ // ""
  ,   OPEN_KEY             = _n++ // , "a"
  ,   CLOSE_KEY            = _n++ // :
  ,   TRUE                 = _n++ // r
  ,   TRUE2                = _n++ // u
  ,   TRUE3                = _n++ // e
  ,   FALSE                = _n++ // a
  ,   FALSE2               = _n++ // l
  ,   FALSE3               = _n++ // s
  ,   FALSE4               = _n++ // e
  ,   NULL                 = _n++ // u
  ,   NULL2                = _n++ // l
  ,   NULL3                = _n++ // l
  ,   NUMBER_DECIMAL_POINT = _n++ // .
  ,   NUMBER_DIGIT         = _n   // [0-9]

      // setup initial parser values
  ,   bufferCheckPosition  = MAX_BUFFER_LENGTH
  ,   latestError                
  ,   c                    
  ,   p                    
  ,   textNode             = undefined
  ,   numberNode           = ""     
  ,   slashed              = false
  ,   closed               = false
  ,   state                = BEGIN
  ,   stack                = []
  ,   unicodeS             = null
  ,   unicodeI             = 0
  ,   depth                = 0
  ,   position             = 0
  ,   column               = 0  //mostly for error reporting
  ,   line                 = 1
  ;

  function checkBufferLength () {
     
    var maxActual = 0;
     
    if (textNode !== undefined && textNode.length > MAX_BUFFER_LENGTH) {
      emitError("Max buffer length exceeded: textNode");
      maxActual = Math.max(maxActual, textNode.length);
    }
    if (numberNode.length > MAX_BUFFER_LENGTH) {
      emitError("Max buffer length exceeded: numberNode");
      maxActual = Math.max(maxActual, numberNode.length);
    }
     
    bufferCheckPosition = (MAX_BUFFER_LENGTH - maxActual)
                               + position;
  }

  eventBus(STREAM_DATA).on(handleData);

   /* At the end of the http content close the clarinet 
    This will provide an error if the total content provided was not 
    valid json, ie if not all arrays, objects and Strings closed properly */
  eventBus(STREAM_END).on(handleStreamEnd);   

  function emitError (errorString) {
     if (textNode !== undefined) {
        emitValueOpen(textNode);
        emitValueClose();
        textNode = undefined;
     }

     latestError = Error(errorString + "\nLn: "+line+
                                       "\nCol: "+column+
                                       "\nChr: "+c);
     
     emitFail(errorReport(undefined, undefined, latestError));
  }

  function handleStreamEnd() {
    if( state == BEGIN ) {
      // Handle the case where the stream closes without ever receiving
      // any input. This isn't an error - response bodies can be blank,
      // particularly for 204 http responses
      
      // Because of how Oboe is currently implemented, we parse a
      // completely empty stream as containing an empty object.
      // This is because Oboe's done event is only fired when the
      // root object of the JSON stream closes.
      
      // This should be decoupled and attached instead to the input stream
      // from the http (or whatever) resource ending.
      // If this decoupling could happen the SAX parser could simply emit
      // zero events on a completely empty input.
      emitValueOpen({});
      emitValueClose();

      closed = true;
      return;
    }
  
    if (state !== VALUE || depth !== 0)
      emitError("Unexpected end");
 
    if (textNode !== undefined) {
      emitValueOpen(textNode);
      emitValueClose();
      textNode = undefined;
    }
     
    closed = true;
  }

  function whitespace(c){
     return c == '\r' || c == '\n' || c == ' ' || c == '\t';
  }
   
  function handleData (chunk) {
         
    // this used to throw the error but inside Oboe we will have already
    // gotten the error when it was emitted. The important thing is to
    // not continue with the parse.
    if (latestError)
      return;
      
    if (closed) {
       return emitError("Cannot write after close");
    }

    var i = 0;
    c = chunk[0]; 

    while (c) {
      if (i > 0) {
        p = c;
      }
      c = chunk[i++];
      if(!c) break;

      position ++;
      if (c == "\n") {
        line ++;
        column = 0;
      } else column ++;
      switch (state) {

        case BEGIN:
          if (c === "{") state = OPEN_OBJECT;
          else if (c === "[") state = OPEN_ARRAY;
          else if (!whitespace(c))
            return emitError("Non-whitespace before {[.");
        continue;

        case OPEN_KEY:
        case OPEN_OBJECT:
          if (whitespace(c)) continue;
          if(state === OPEN_KEY) stack.push(CLOSE_KEY);
          else {
            if(c === '}') {
              emitValueOpen({});
              emitValueClose();
              state = stack.pop() || VALUE;
              continue;
            } else  stack.push(CLOSE_OBJECT);
          }
          if(c === '"')
             state = STRING;
          else
             return emitError("Malformed object key should start with \" ");
        continue;

        case CLOSE_KEY:
        case CLOSE_OBJECT:
          if (whitespace(c)) continue;

          if(c===':') {
            if(state === CLOSE_OBJECT) {
              stack.push(CLOSE_OBJECT);

               if (textNode !== undefined) {
                  // was previously (in upstream Clarinet) one event
                  //  - object open came with the text of the first
                  emitValueOpen({});
                  emitSaxKey(textNode);
                  textNode = undefined;
               }
               depth++;
            } else {
               if (textNode !== undefined) {
                  emitSaxKey(textNode);
                  textNode = undefined;
               }
            }
             state  = VALUE;
          } else if (c==='}') {
             if (textNode !== undefined) {
                emitValueOpen(textNode);
                emitValueClose();
                textNode = undefined;
             }
             emitValueClose();
            depth--;
            state = stack.pop() || VALUE;
          } else if(c===',') {
            if(state === CLOSE_OBJECT)
              stack.push(CLOSE_OBJECT);
             if (textNode !== undefined) {
                emitValueOpen(textNode);
                emitValueClose();
                textNode = undefined;
             }
             state  = OPEN_KEY;
          } else 
             return emitError('Bad object');
        continue;

        case OPEN_ARRAY: // after an array there always a value
        case VALUE:
          if (whitespace(c)) continue;
          if(state===OPEN_ARRAY) {
            emitValueOpen([]);
            depth++;             
            state = VALUE;
            if(c === ']') {
              emitValueClose();
              depth--;
              state = stack.pop() || VALUE;
              continue;
            } else {
              stack.push(CLOSE_ARRAY);
            }
          }
               if(c === '"') state = STRING;
          else if(c === '{') state = OPEN_OBJECT;
          else if(c === '[') state = OPEN_ARRAY;
          else if(c === 't') state = TRUE;
          else if(c === 'f') state = FALSE;
          else if(c === 'n') state = NULL;
          else if(c === '-') { // keep and continue
            numberNode += c;
          } else if(c==='0') {
            numberNode += c;
            state = NUMBER_DIGIT;
          } else if('123456789'.indexOf(c) !== -1) {
            numberNode += c;
            state = NUMBER_DIGIT;
          } else               
            return emitError("Bad value");
        continue;

        case CLOSE_ARRAY:
          if(c===',') {
            stack.push(CLOSE_ARRAY);
             if (textNode !== undefined) {
                emitValueOpen(textNode);
                emitValueClose();
                textNode = undefined;
             }
             state  = VALUE;
          } else if (c===']') {
             if (textNode !== undefined) {
                emitValueOpen(textNode);
                emitValueClose();
                textNode = undefined;
             }
             emitValueClose();
            depth--;
            state = stack.pop() || VALUE;
          } else if (whitespace(c))
              continue;
          else 
             return emitError('Bad array');
        continue;

        case STRING:
          if (textNode === undefined) {
              textNode = "";
          }

          // thanks thejh, this is an about 50% performance improvement.
          var starti              = i-1;
           
          STRING_BIGLOOP: while (true) {

            // zero means "no unicode active". 1-4 mean "parse some more". end after 4.
            while (unicodeI > 0) {
              unicodeS += c;
              c = chunk.charAt(i++);
              if (unicodeI === 4) {
                // TODO this might be slow? well, probably not used too often anyway
                textNode += String.fromCharCode(parseInt(unicodeS, 16));
                unicodeI = 0;
                starti = i-1;
              } else {
                unicodeI++;
              }
              // we can just break here: no stuff we skipped that still has to be sliced out or so
              if (!c) break STRING_BIGLOOP;
            }
            if (c === '"' && !slashed) {
              state = stack.pop() || VALUE;
              textNode += chunk.substring(starti, i-1);
              break;
            }
            if (c === '\\' && !slashed) {
              slashed = true;
              textNode += chunk.substring(starti, i-1);
               c = chunk.charAt(i++);
              if (!c) break;
            }
            if (slashed) {
              slashed = false;
                   if (c === 'n') { textNode += '\n'; }
              else if (c === 'r') { textNode += '\r'; }
              else if (c === 't') { textNode += '\t'; }
              else if (c === 'f') { textNode += '\f'; }
              else if (c === 'b') { textNode += '\b'; }
              else if (c === 'u') {
                // \uxxxx. meh!
                unicodeI = 1;
                unicodeS = '';
              } else {
                textNode += c;
              }
              c = chunk.charAt(i++);
              starti = i-1;
              if (!c) break;
              else continue;
            }

            stringTokenPattern.lastIndex = i;
            var reResult = stringTokenPattern.exec(chunk);
            if (!reResult) {
              i = chunk.length+1;
              textNode += chunk.substring(starti, i-1);
              break;
            }
            i = reResult.index+1;
            c = chunk.charAt(reResult.index);
            if (!c) {
              textNode += chunk.substring(starti, i-1);
              break;
            }
          }
        continue;

        case TRUE:
          if (!c)  continue; // strange buffers
          if (c==='r') state = TRUE2;
          else
             return emitError( 'Invalid true started with t'+ c);
        continue;

        case TRUE2:
          if (!c)  continue;
          if (c==='u') state = TRUE3;
          else
             return emitError('Invalid true started with tr'+ c);
        continue;

        case TRUE3:
          if (!c) continue;
          if(c==='e') {
            emitValueOpen(true);
            emitValueClose();
            state = stack.pop() || VALUE;
          } else
             return emitError('Invalid true started with tru'+ c);
        continue;

        case FALSE:
          if (!c)  continue;
          if (c==='a') state = FALSE2;
          else
             return emitError('Invalid false started with f'+ c);
        continue;

        case FALSE2:
          if (!c)  continue;
          if (c==='l') state = FALSE3;
          else
             return emitError('Invalid false started with fa'+ c);
        continue;

        case FALSE3:
          if (!c)  continue;
          if (c==='s') state = FALSE4;
          else
             return emitError('Invalid false started with fal'+ c);
        continue;

        case FALSE4:
          if (!c)  continue;
          if (c==='e') {
            emitValueOpen(false);
            emitValueClose();
            state = stack.pop() || VALUE;
          } else
             return emitError('Invalid false started with fals'+ c);
        continue;

        case NULL:
          if (!c)  continue;
          if (c==='u') state = NULL2;
          else
             return emitError('Invalid null started with n'+ c);
        continue;

        case NULL2:
          if (!c)  continue;
          if (c==='l') state = NULL3;
          else
             return emitError('Invalid null started with nu'+ c);
        continue;

        case NULL3:
          if (!c) continue;
          if(c==='l') {
            emitValueOpen(null);
            emitValueClose();
            state = stack.pop() || VALUE;
          } else 
             return emitError('Invalid null started with nul'+ c);
        continue;

        case NUMBER_DECIMAL_POINT:
          if(c==='.') {
            numberNode += c;
            state       = NUMBER_DIGIT;
          } else 
             return emitError('Leading zero not followed by .');
        continue;

        case NUMBER_DIGIT:
          if('0123456789'.indexOf(c) !== -1) numberNode += c;
          else if (c==='.') {
            if(numberNode.indexOf('.')!==-1)
               return emitError('Invalid number has two dots');
            numberNode += c;
          } else if (c==='e' || c==='E') {
            if(numberNode.indexOf('e')!==-1 ||
               numberNode.indexOf('E')!==-1 )
               return emitError('Invalid number has two exponential');
            numberNode += c;
          } else if (c==="+" || c==="-") {
            if(!(p==='e' || p==='E'))
               return emitError('Invalid symbol in number');
            numberNode += c;
          } else {
            if (numberNode) {
              emitValueOpen(parseFloat(numberNode));
              emitValueClose();
              numberNode = "";
            }
            i--; // go back one
            state = stack.pop() || VALUE;
          }
        continue;

        default:
          return emitError("Unknown state: " + state);
      }
    }
    if (position >= bufferCheckPosition)
      checkBufferLength();
  }
}


/** 
 * A bridge used to assign stateless functions to listen to clarinet.
 * 
 * As well as the parameter from clarinet, each callback will also be passed
 * the result of the last callback.
 * 
 * This may also be used to clear all listeners by assigning zero handlers:
 * 
 *    ascentManager( clarinet, {} )
 */
function ascentManager(oboeBus, handlers){
   "use strict";
   
   var listenerId = {},
       ascent;

   function stateAfter(handler) {
      return function(param){
         ascent = handler( ascent, param);
      }
   }
   
   for( var eventName in handlers ) {

      oboeBus(eventName).on(stateAfter(handlers[eventName]), listenerId);
   }
   
   oboeBus(NODE_SWAP).on(function(newNode) {
      
      var oldHead = head(ascent),
          key = keyOf(oldHead),
          ancestors = tail(ascent),
          parentNode;

      if( ancestors ) {
         parentNode = nodeOf(head(ancestors));
         parentNode[key] = newNode;
      }
   });

   oboeBus(NODE_DROP).on(function() {

      var oldHead = head(ascent),
          key = keyOf(oldHead),
          ancestors = tail(ascent),
          parentNode;

      if( ancestors ) {
         parentNode = nodeOf(head(ancestors));
 
         delete parentNode[key];
      }
   });

   oboeBus(ABORTING).on(function(){
      
      for( var eventName in handlers ) {
         oboeBus(eventName).un(listenerId);
      }
   });   
}

// based on gist https://gist.github.com/monsur/706839

/**
 * XmlHttpRequest's getAllResponseHeaders() method returns a string of response
 * headers according to the format described here:
 * http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders-method
 * This method parses that string into a user-friendly key/value pair object.
 */
function parseResponseHeaders(headerStr) {
   var headers = {};
   
   headerStr && headerStr.split('\u000d\u000a')
      .forEach(function(headerPair){
   
         // Can't use split() here because it does the wrong thing
         // if the header value has the string ": " in it.
         var index = headerPair.indexOf('\u003a\u0020');
         
         headers[headerPair.substring(0, index)] 
                     = headerPair.substring(index + 2);
      });
   
   return headers;
}

/**
 * Detect if a given URL is cross-origin in the scope of the
 * current page.
 * 
 * Browser only (since cross-origin has no meaning in Node.js)
 *
 * @param {Object} pageLocation - as in window.location
 * @param {Object} ajaxHost - an object like window.location describing the 
 *    origin of the url that we want to ajax in
 */
function isCrossOrigin(pageLocation, ajaxHost) {

   /*
    * NB: defaultPort only knows http and https.
    * Returns undefined otherwise.
    */
   function defaultPort(protocol) {
      return {'http:':80, 'https:':443}[protocol];
   }
   
   function portOf(location) {
      // pageLocation should always have a protocol. ajaxHost if no port or
      // protocol is specified, should use the port of the containing page
      
      return location.port || defaultPort(location.protocol||pageLocation.protocol);
   }

   // if ajaxHost doesn't give a domain, port is the same as pageLocation
   // it can't give a protocol but not a domain
   // it can't give a port but not a domain
   
   return !!(  (ajaxHost.protocol  && (ajaxHost.protocol  != pageLocation.protocol)) ||
               (ajaxHost.host      && (ajaxHost.host      != pageLocation.host))     ||
               (ajaxHost.host      && (portOf(ajaxHost) != portOf(pageLocation)))
          );
}

/* turn any url into an object like window.location */
function parseUrlOrigin(url) {
   // url could be domain-relative
   // url could give a domain

   // cross origin means:
   //    same domain
   //    same port
   //    some protocol
   // so, same everything up to the first (single) slash 
   // if such is given
   //
   // can ignore everything after that   
   
   var URL_HOST_PATTERN = /(\w+:)?(?:\/\/)([\w.-]+)?(?::(\d+))?\/?/,

         // if no match, use an empty array so that
         // subexpressions 1,2,3 are all undefined
         // and will ultimately return all empty
         // strings as the parse result:
       urlHostMatch = URL_HOST_PATTERN.exec(url) || [];
   
   return {
      protocol:   urlHostMatch[1] || '',
      host:       urlHostMatch[2] || '',
      port:       urlHostMatch[3] || ''
   };
}

function httpTransport(){
   return new XMLHttpRequest();
}

/**
 * A wrapper around the browser XmlHttpRequest object that raises an 
 * event whenever a new part of the response is available.
 * 
 * In older browsers progressive reading is impossible so all the 
 * content is given in a single call. For newer ones several events
 * should be raised, allowing progressive interpretation of the response.
 *      
 * @param {Function} oboeBus an event bus local to this Oboe instance
 * @param {XMLHttpRequest} xhr the xhr to use as the transport. Under normal
 *          operation, will have been created using httpTransport() above
 *          but for tests a stub can be provided instead.
 * @param {String} method one of 'GET' 'POST' 'PUT' 'PATCH' 'DELETE'
 * @param {String} url the url to make a request to
 * @param {String|Null} data some content to be sent with the request.
 *                      Only valid if method is POST or PUT.
 * @param {Object} [headers] the http request headers to send
 * @param {boolean} withCredentials the XHR withCredentials property will be
 *    set to this value
 */  
function streamingHttp(oboeBus, xhr, method, url, data, headers, withCredentials) {
           
   "use strict";
   
   var emitStreamData = oboeBus(STREAM_DATA).emit,
       emitFail       = oboeBus(FAIL_EVENT).emit,
       numberOfCharsAlreadyGivenToCallback = 0,
       stillToSendStartEvent = true;

   // When an ABORTING message is put on the event bus abort 
   // the ajax request         
   oboeBus( ABORTING ).on( function(){
  
      // if we keep the onreadystatechange while aborting the XHR gives 
      // a callback like a successful call so first remove this listener
      // by assigning null:
      xhr.onreadystatechange = null;
            
      xhr.abort();
   });

   /** 
    * Handle input from the underlying xhr: either a state change,
    * the progress event or the request being complete.
    */
   function handleProgress() {
                        
      var textSoFar = xhr.responseText,
          newText = textSoFar.substr(numberOfCharsAlreadyGivenToCallback);
      
      
      /* Raise the event for new text.
      
         On older browsers, the new text is the whole response. 
         On newer/better ones, the fragment part that we got since 
         last progress. */
         
      if( newText ) {
         emitStreamData( newText );
      } 

      numberOfCharsAlreadyGivenToCallback = len(textSoFar);
   }
   
   
   if('onprogress' in xhr){  // detect browser support for progressive delivery
      xhr.onprogress = handleProgress;
   }
      
   xhr.onreadystatechange = function() {

      function sendStartIfNotAlready() {
         // Internet Explorer is very unreliable as to when xhr.status etc can
         // be read so has to be protected with try/catch and tried again on 
         // the next readyState if it fails
         try{
            stillToSendStartEvent && oboeBus( HTTP_START ).emit(
               xhr.status,
               parseResponseHeaders(xhr.getAllResponseHeaders()) );
            stillToSendStartEvent = false;
         } catch(e){/* do nothing, will try again on next readyState*/}
      }
      
      switch( xhr.readyState ) {
               
         case 2: // HEADERS_RECEIVED
         case 3: // LOADING
            return sendStartIfNotAlready();
            
         case 4: // DONE
            sendStartIfNotAlready(); // if xhr.status hasn't been available yet, it must be NOW, huh IE?
            
            // is this a 2xx http code?
            var successful = String(xhr.status)[0] == 2;
            
            if( successful ) {
               // In Chrome 29 (not 28) no onprogress is emitted when a response
               // is complete before the onload. We need to always do handleInput
               // in case we get the load but have not had a final progress event.
               // This looks like a bug and may change in future but let's take
               // the safest approach and assume we might not have received a 
               // progress event for each part of the response
               handleProgress();
               
               oboeBus(STREAM_END).emit();
            } else {

               emitFail( errorReport(
                  xhr.status, 
                  xhr.responseText
               ));
            }
      }
   };
   
   try{
   
      xhr.open(method, url, true);
   
      for( var headerName in headers ){
         xhr.setRequestHeader(headerName, headers[headerName]);
      }
      
      if( !isCrossOrigin(window.location, parseUrlOrigin(url)) ) {
         xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      }

      xhr.withCredentials = withCredentials;
      
      xhr.send(data);
      
   } catch( e ) {
      
      // To keep a consistent interface with Node, we can't emit an event here.
      // Node's streaming http adaptor receives the error as an asynchronous
      // event rather than as an exception. If we emitted now, the Oboe user
      // has had no chance to add a .fail listener so there is no way
      // the event could be useful. For both these reasons defer the
      // firing to the next JS frame.  
      window.setTimeout(
         partialComplete(emitFail, errorReport(undefined, undefined, e))
      ,  0
      );
   }            
}

var jsonPathSyntax = (function() {
 
   var
   
   /** 
    * Export a regular expression as a simple function by exposing just 
    * the Regex#exec. This allows regex tests to be used under the same 
    * interface as differently implemented tests, or for a user of the
    * tests to not concern themselves with their implementation as regular
    * expressions.
    * 
    * This could also be expressed point-free as:
    *   Function.prototype.bind.bind(RegExp.prototype.exec),
    *   
    * But that's far too confusing! (and not even smaller once minified 
    * and gzipped)
    */
       regexDescriptor = function regexDescriptor(regex) {
            return regex.exec.bind(regex);
       }
       
   /**
    * Join several regular expressions and express as a function.
    * This allows the token patterns to reuse component regular expressions
    * instead of being expressed in full using huge and confusing regular
    * expressions.
    */       
   ,   jsonPathClause = varArgs(function( componentRegexes ) {

            // The regular expressions all start with ^ because we 
            // only want to find matches at the start of the 
            // JSONPath fragment we are inspecting           
            componentRegexes.unshift(/^/);
            
            return   regexDescriptor(
                        RegExp(
                           componentRegexes.map(attr('source')).join('')
                        )
                     );
       })
       
   ,   possiblyCapturing =           /(\$?)/
   ,   namedNode =                   /([\w-_]+|\*)/
   ,   namePlaceholder =             /()/
   ,   nodeInArrayNotation =         /\["([^"]+)"\]/
   ,   numberedNodeInArrayNotation = /\[(\d+|\*)\]/
   ,   fieldList =                      /{([\w ]*?)}/
   ,   optionalFieldList =           /(?:{([\w ]*?)})?/
    

       //   foo or *                  
   ,   jsonPathNamedNodeInObjectNotation   = jsonPathClause( 
                                                possiblyCapturing, 
                                                namedNode, 
                                                optionalFieldList
                                             )
                                             
       //   ["foo"]   
   ,   jsonPathNamedNodeInArrayNotation    = jsonPathClause( 
                                                possiblyCapturing, 
                                                nodeInArrayNotation, 
                                                optionalFieldList
                                             )  

       //   [2] or [*]       
   ,   jsonPathNumberedNodeInArrayNotation = jsonPathClause( 
                                                possiblyCapturing, 
                                                numberedNodeInArrayNotation, 
                                                optionalFieldList
                                             )

       //   {a b c}      
   ,   jsonPathPureDuckTyping              = jsonPathClause( 
                                                possiblyCapturing, 
                                                namePlaceholder, 
                                                fieldList
                                             )
   
       //   ..
   ,   jsonPathDoubleDot                   = jsonPathClause(/\.\./)                  
   
       //   .
   ,   jsonPathDot                         = jsonPathClause(/\./)                    
   
       //   !
   ,   jsonPathBang                        = jsonPathClause(
                                                possiblyCapturing, 
                                                /!/
                                             )  
   
       //   nada!
   ,   emptyString                         = jsonPathClause(/$/)                     
   
   ;
   
  
   /* We export only a single function. When called, this function injects 
      into another function the descriptors from above.             
    */
   return function (fn){      
      return fn(      
         lazyUnion(
            jsonPathNamedNodeInObjectNotation
         ,  jsonPathNamedNodeInArrayNotation
         ,  jsonPathNumberedNodeInArrayNotation
         ,  jsonPathPureDuckTyping 
         )
      ,  jsonPathDoubleDot
      ,  jsonPathDot
      ,  jsonPathBang
      ,  emptyString 
      );
   }; 

}());
/**
 * Get a new key->node mapping
 * 
 * @param {String|Number} key
 * @param {Object|Array|String|Number|null} node a value found in the json
 */
function namedNode(key, node) {
   return {key:key, node:node};
}

/** get the key of a namedNode */
var keyOf = attr('key');

/** get the node from a namedNode */
var nodeOf = attr('node');
/** 
 * This file provides various listeners which can be used to build up
 * a changing ascent based on the callbacks provided by Clarinet. It listens
 * to the low-level events from Clarinet and emits higher-level ones.
 *  
 * The building up is stateless so to track a JSON file
 * ascentManager.js is required to store the ascent state
 * between calls.
 */



/** 
 * A special value to use in the path list to represent the path 'to' a root 
 * object (which doesn't really have any path). This prevents the need for 
 * special-casing detection of the root object and allows it to be treated 
 * like any other object. We might think of this as being similar to the 
 * 'unnamed root' domain ".", eg if I go to 
 * http://en.wikipedia.org./wiki/En/Main_page the dot after 'org' deliminates 
 * the unnamed root of the DNS.
 * 
 * This is kept as an object to take advantage that in Javascript's OO objects 
 * are guaranteed to be distinct, therefore no other object can possibly clash 
 * with this one. Strings, numbers etc provide no such guarantee. 
 **/
var ROOT_PATH = {};


/**
 * Create a new set of handlers for clarinet's events, bound to the emit 
 * function given.  
 */ 
function incrementalContentBuilder( oboeBus ) {

   var emitNodeOpened = oboeBus(NODE_OPENED).emit,
       emitNodeClosed = oboeBus(NODE_CLOSED).emit,
       emitRootOpened = oboeBus(ROOT_PATH_FOUND).emit,
       emitRootClosed = oboeBus(ROOT_NODE_FOUND).emit;

   function arrayIndicesAreKeys( possiblyInconsistentAscent, newDeepestNode) {
   
      /* for values in arrays we aren't pre-warned of the coming paths 
         (Clarinet gives no call to onkey like it does for values in objects) 
         so if we are in an array we need to create this path ourselves. The 
         key will be len(parentNode) because array keys are always sequential 
         numbers. */

      var parentNode = nodeOf( head( possiblyInconsistentAscent));
      
      return      isOfType( Array, parentNode)
               ?
                  keyFound(  possiblyInconsistentAscent, 
                              len(parentNode), 
                              newDeepestNode
                  )
               :  
                  // nothing needed, return unchanged
                  possiblyInconsistentAscent 
               ;
   }
                 
   function nodeOpened( ascent, newDeepestNode ) {
      
      if( !ascent ) {
         // we discovered the root node,         
         emitRootOpened( newDeepestNode);
                    
         return keyFound( ascent, ROOT_PATH, newDeepestNode);         
      }

      // we discovered a non-root node
                 
      var arrayConsistentAscent  = arrayIndicesAreKeys( ascent, newDeepestNode),      
          ancestorBranches       = tail( arrayConsistentAscent),
          previouslyUnmappedName = keyOf( head( arrayConsistentAscent));
          
      appendBuiltContent( 
         ancestorBranches, 
         previouslyUnmappedName, 
         newDeepestNode 
      );
                                                                                                         
      return cons( 
               namedNode( previouslyUnmappedName, newDeepestNode ), 
               ancestorBranches
      );                                                                          
   }


   /**
    * Add a new value to the object we are building up to represent the
    * parsed JSON
    */
   function appendBuiltContent( ancestorBranches, key, node ){
     
      nodeOf( head( ancestorBranches))[key] = node;
   }

     
   /**
    * For when we find a new key in the json.
    * 
    * @param {String|Number|Object} newDeepestName the key. If we are in an 
    *    array will be a number, otherwise a string. May take the special 
    *    value ROOT_PATH if the root node has just been found
    *    
    * @param {String|Number|Object|Array|Null|undefined} [maybeNewDeepestNode] 
    *    usually this won't be known so can be undefined. Can't use null 
    *    to represent unknown because null is a valid value in JSON
    **/  
   function keyFound(ascent, newDeepestName, maybeNewDeepestNode) {

      if( ascent ) { // if not root
      
         // If we have the key but (unless adding to an array) no known value
         // yet. Put that key in the output but against no defined value:      
         appendBuiltContent( ascent, newDeepestName, maybeNewDeepestNode );
      }
   
      var ascentWithNewPath = cons( 
                                 namedNode( newDeepestName, 
                                            maybeNewDeepestNode), 
                                 ascent
                              );

      emitNodeOpened( ascentWithNewPath);
 
      return ascentWithNewPath;
   }


   /**
    * For when the current node ends.
    */
   function nodeClosed( ascent ) {

      emitNodeClosed( ascent);
       
      return tail( ascent) ||
             // If there are no nodes left in the ascent the root node
             // just closed. Emit a special event for this: 
             emitRootClosed(nodeOf(head(ascent)));
   }      

   var contentBuilderHandlers = {};
   contentBuilderHandlers[SAX_VALUE_OPEN] = nodeOpened;
   contentBuilderHandlers[SAX_VALUE_CLOSE] = nodeClosed;
   contentBuilderHandlers[SAX_KEY] = keyFound;
   return contentBuilderHandlers;
}

/**
 * The jsonPath evaluator compiler used for Oboe.js. 
 * 
 * One function is exposed. This function takes a String JSONPath spec and 
 * returns a function to test candidate ascents for matches.
 * 
 *  String jsonPath -> (List ascent) -> Boolean|Object
 *
 * This file is coded in a pure functional style. That is, no function has 
 * side effects, every function evaluates to the same value for the same 
 * arguments and no variables are reassigned.
 */  
// the call to jsonPathSyntax injects the token syntaxes that are needed 
// inside the compiler
var jsonPathCompiler = jsonPathSyntax(function (pathNodeSyntax, 
                                                doubleDotSyntax, 
                                                dotSyntax,
                                                bangSyntax,
                                                emptySyntax ) {

   var CAPTURING_INDEX = 1;
   var NAME_INDEX = 2;
   var FIELD_LIST_INDEX = 3;

   var headKey  = compose2(keyOf, head),
       headNode = compose2(nodeOf, head);
                   
   /**
    * Create an evaluator function for a named path node, expressed in the
    * JSONPath like:
    *    foo
    *    ["bar"]
    *    [2]   
    */
   function nameClause(previousExpr, detection ) {
     
      var name = detection[NAME_INDEX],
            
          matchesName = ( !name || name == '*' ) 
                           ?  always
                           :  function(ascent){return headKey(ascent) == name};
     

      return lazyIntersection(matchesName, previousExpr);
   }

   /**
    * Create an evaluator function for a a duck-typed node, expressed like:
    * 
    *    {spin, taste, colour}
    *    .particle{spin, taste, colour}
    *    *{spin, taste, colour}
    */
   function duckTypeClause(previousExpr, detection) {

      var fieldListStr = detection[FIELD_LIST_INDEX];

      if (!fieldListStr) 
         return previousExpr; // don't wrap at all, return given expr as-is      

      var hasAllrequiredFields = partialComplete(
                                    hasAllProperties, 
                                    arrayAsList(fieldListStr.split(/\W+/))
                                 ),
                                 
          isMatch =  compose2( 
                        hasAllrequiredFields, 
                        headNode
                     );

      return lazyIntersection(isMatch, previousExpr);
   }

   /**
    * Expression for $, returns the evaluator function
    */
   function capture( previousExpr, detection ) {

      // extract meaning from the detection      
      var capturing = !!detection[CAPTURING_INDEX];

      if (!capturing)          
         return previousExpr; // don't wrap at all, return given expr as-is      
      
      return lazyIntersection(previousExpr, head);
            
   }            
      
   /**
    * Create an evaluator function that moves onto the next item on the 
    * lists. This function is the place where the logic to move up a 
    * level in the ascent exists. 
    * 
    * Eg, for JSONPath ".foo" we need skip1(nameClause(always, [,'foo']))
    */
   function skip1(previousExpr) {
   
   
      if( previousExpr == always ) {
         /* If there is no previous expression this consume command 
            is at the start of the jsonPath.
            Since JSONPath specifies what we'd like to find but not 
            necessarily everything leading down to it, when running
            out of JSONPath to check against we default to true */
         return always;
      }

      /** return true if the ascent we have contains only the JSON root,
       *  false otherwise
       */
      function notAtRoot(ascent){
         return headKey(ascent) != ROOT_PATH;
      }
      
      return lazyIntersection(
               /* If we're already at the root but there are more 
                  expressions to satisfy, can't consume any more. No match.

                  This check is why none of the other exprs have to be able 
                  to handle empty lists; skip1 is the only evaluator that 
                  moves onto the next token and it refuses to do so once it 
                  reaches the last item in the list. */
               notAtRoot,
               
               /* We are not at the root of the ascent yet.
                  Move to the next level of the ascent by handing only 
                  the tail to the previous expression */ 
               compose2(previousExpr, tail) 
      );
                                                                                                               
   }   
   
   /**
    * Create an evaluator function for the .. (double dot) token. Consumes
    * zero or more levels of the ascent, the fewest that are required to find
    * a match when given to previousExpr.
    */   
   function skipMany(previousExpr) {

      if( previousExpr == always ) {
         /* If there is no previous expression this consume command 
            is at the start of the jsonPath.
            Since JSONPath specifies what we'd like to find but not 
            necessarily everything leading down to it, when running
            out of JSONPath to check against we default to true */            
         return always;
      }
          
      var 
          // In JSONPath .. is equivalent to !.. so if .. reaches the root
          // the match has succeeded. Ie, we might write ..foo or !..foo
          // and both should match identically.
          terminalCaseWhenArrivingAtRoot = rootExpr(),
          terminalCaseWhenPreviousExpressionIsSatisfied = previousExpr,
          recursiveCase = skip1(function(ascent) {
             return cases(ascent);
          }),

          cases = lazyUnion(
                     terminalCaseWhenArrivingAtRoot
                  ,  terminalCaseWhenPreviousExpressionIsSatisfied
                  ,  recursiveCase  
                  );
      
      return cases;
   }      
   
   /**
    * Generate an evaluator for ! - matches only the root element of the json
    * and ignores any previous expressions since nothing may precede !. 
    */   
   function rootExpr() {
      
      return function(ascent){
         return headKey(ascent) == ROOT_PATH;
      };
   }   
         
   /**
    * Generate a statement wrapper to sit around the outermost 
    * clause evaluator.
    * 
    * Handles the case where the capturing is implicit because the JSONPath
    * did not contain a '$' by returning the last node.
    */   
   function statementExpr(lastClause) {
      
      return function(ascent) {
   
         // kick off the evaluation by passing through to the last clause
         var exprMatch = lastClause(ascent);
                                                     
         return exprMatch === true ? head(ascent) : exprMatch;
      };
   }      
                          
   /**
    * For when a token has been found in the JSONPath input.
    * Compiles the parser for that token and returns in combination with the
    * parser already generated.
    * 
    * @param {Function} exprs  a list of the clause evaluator generators for
    *                          the token that was found
    * @param {Function} parserGeneratedSoFar the parser already found
    * @param {Array} detection the match given by the regex engine when 
    *                          the feature was found
    */
   function expressionsReader( exprs, parserGeneratedSoFar, detection ) {
                     
      // if exprs is zero-length foldR will pass back the 
      // parserGeneratedSoFar as-is so we don't need to treat 
      // this as a special case
      
      return   foldR( 
                  function( parserGeneratedSoFar, expr ){
         
                     return expr(parserGeneratedSoFar, detection);
                  }, 
                  parserGeneratedSoFar, 
                  exprs
               );                     

   }

   /** 
    *  If jsonPath matches the given detector function, creates a function which
    *  evaluates against every clause in the clauseEvaluatorGenerators. The
    *  created function is propagated to the onSuccess function, along with
    *  the remaining unparsed JSONPath substring.
    *  
    *  The intended use is to create a clauseMatcher by filling in
    *  the first two arguments, thus providing a function that knows
    *  some syntax to match and what kind of generator to create if it
    *  finds it. The parameter list once completed is:
    *  
    *    (jsonPath, parserGeneratedSoFar, onSuccess)
    *  
    *  onSuccess may be compileJsonPathToFunction, to recursively continue 
    *  parsing after finding a match or returnFoundParser to stop here.
    */
   function generateClauseReaderIfTokenFound (
     
                        tokenDetector, clauseEvaluatorGenerators,
                         
                        jsonPath, parserGeneratedSoFar, onSuccess) {
                        
      var detected = tokenDetector(jsonPath);

      if(detected) {
         var compiledParser = expressionsReader(
                                 clauseEvaluatorGenerators, 
                                 parserGeneratedSoFar, 
                                 detected
                              ),
         
             remainingUnparsedJsonPath = jsonPath.substr(len(detected[0]));                
                               
         return onSuccess(remainingUnparsedJsonPath, compiledParser);
      }         
   }
                 
   /**
    * Partially completes generateClauseReaderIfTokenFound above. 
    */
   function clauseMatcher(tokenDetector, exprs) {
        
      return   partialComplete( 
                  generateClauseReaderIfTokenFound, 
                  tokenDetector, 
                  exprs 
               );
   }

   /**
    * clauseForJsonPath is a function which attempts to match against 
    * several clause matchers in order until one matches. If non match the
    * jsonPath expression is invalid and an error is thrown.
    * 
    * The parameter list is the same as a single clauseMatcher:
    * 
    *    (jsonPath, parserGeneratedSoFar, onSuccess)
    */     
   var clauseForJsonPath = lazyUnion(

      clauseMatcher(pathNodeSyntax   , list( capture, 
                                             duckTypeClause, 
                                             nameClause, 
                                             skip1 ))
                                                     
   ,  clauseMatcher(doubleDotSyntax  , list( skipMany))
       
       // dot is a separator only (like whitespace in other languages) but 
       // rather than make it a special case, use an empty list of 
       // expressions when this token is found
   ,  clauseMatcher(dotSyntax        , list() )  
                                                                                      
   ,  clauseMatcher(bangSyntax       , list( capture,
                                             rootExpr))
                                                          
   ,  clauseMatcher(emptySyntax      , list( statementExpr))
   
   ,  function (jsonPath) {
         throw Error('"' + jsonPath + '" could not be tokenised')      
      }
   );


   /**
    * One of two possible values for the onSuccess argument of 
    * generateClauseReaderIfTokenFound.
    * 
    * When this function is used, generateClauseReaderIfTokenFound simply 
    * returns the compiledParser that it made, regardless of if there is 
    * any remaining jsonPath to be compiled.
    */
   function returnFoundParser(_remainingJsonPath, compiledParser){ 
      return compiledParser 
   }     
              
   /**
    * Recursively compile a JSONPath expression.
    * 
    * This function serves as one of two possible values for the onSuccess 
    * argument of generateClauseReaderIfTokenFound, meaning continue to
    * recursively compile. Otherwise, returnFoundParser is given and
    * compilation terminates.
    */
   function compileJsonPathToFunction( uncompiledJsonPath, 
                                       parserGeneratedSoFar ) {

      /**
       * On finding a match, if there is remaining text to be compiled
       * we want to either continue parsing using a recursive call to 
       * compileJsonPathToFunction. Otherwise, we want to stop and return 
       * the parser that we have found so far.
       */
      var onFind =      uncompiledJsonPath
                     ?  compileJsonPathToFunction 
                     :  returnFoundParser;
                   
      return   clauseForJsonPath( 
                  uncompiledJsonPath, 
                  parserGeneratedSoFar, 
                  onFind
               );                              
   }

   /**
    * This is the function that we expose to the rest of the library.
    */
   return function(jsonPath){
        
      try {
         // Kick off the recursive parsing of the jsonPath 
         return compileJsonPathToFunction(jsonPath, always);
         
      } catch( e ) {
         throw Error( 'Could not compile "' + jsonPath + 
                      '" because ' + e.message
         );
      }
   }

});

/**
 * A pub/sub which is responsible for a single event type. A
 * multi-event type event bus is created by pubSub by collecting
 * several of these.
 *
 * @param {String} eventType
 *    the name of the events managed by this singleEventPubSub
 * @param {singleEventPubSub} [newListener]
 *    place to notify of new listeners
 * @param {singleEventPubSub} [removeListener]
 *    place to notify of when listeners are removed
 */
function singleEventPubSub(eventType, newListener, removeListener){

  /** we are optimised for emitting events over firing them.
   *  As well as the tuple list which stores event ids and
   *  listeners there is a list with just the listeners which
   *  can be iterated more quickly when we are emitting
   */
  var listenerTupleList,
      listenerList;

  function hasId(id){
    return function(tuple) {
      return tuple.id == id;
    };
  }

  return {

    /**
     * @param {Function} listener
     * @param {*} listenerId
     *    an id that this listener can later by removed by.
     *    Can be of any type, to be compared to other ids using ==
     */
    on:function( listener, listenerId ) {

      var tuple = {
        listener: listener
        ,  id:       listenerId || listener // when no id is given use the
        // listener function as the id
      };

      if( newListener ) {
        newListener.emit(eventType, listener, tuple.id);
      }

      listenerTupleList = cons( tuple,    listenerTupleList );
      listenerList      = cons( listener, listenerList      );

      return this; // chaining
    },

    emit:function () {
      applyEach( listenerList, arguments );
    },

    un: function( listenerId ) {

      var removed;

      listenerTupleList = without(
        listenerTupleList,
        hasId(listenerId),
        function(tuple){
          removed = tuple;
        }
      );

      if( removed ) {
        listenerList = without( listenerList, function(listener){
          return listener == removed.listener;
        });

        if( removeListener ) {
          removeListener.emit(eventType, removed.listener, removed.id);
        }
      }
    },

    listeners: function(){
      // differs from Node EventEmitter: returns list, not array
      return listenerList;
    },

    hasListener: function(listenerId){
      var test = listenerId? hasId(listenerId) : always;

      return defined(first( test, listenerTupleList));
    }
  };
}

/**
 * pubSub is a curried interface for listening to and emitting
 * events.
 *
 * If we get a bus:
 *
 *    var bus = pubSub();
 *
 * We can listen to event 'foo' like:
 *
 *    bus('foo').on(myCallback)
 *
 * And emit event foo like:
 *
 *    bus('foo').emit()
 *
 * or, with a parameter:
 *
 *    bus('foo').emit('bar')
 *
 * All functions can be cached and don't need to be
 * bound. Ie:
 *
 *    var fooEmitter = bus('foo').emit
 *    fooEmitter('bar');  // emit an event
 *    fooEmitter('baz');  // emit another
 *
 * There's also an uncurried[1] shortcut for .emit and .on:
 *
 *    bus.on('foo', callback)
 *    bus.emit('foo', 'bar')
 *
 * [1]: http://zvon.org/other/haskell/Outputprelude/uncurry_f.html
 */
function pubSub(){

   var singles = {},
       newListener = newSingle('newListener'),
       removeListener = newSingle('removeListener');

   function newSingle(eventName) {
      return singles[eventName] = singleEventPubSub(
         eventName,
         newListener,
         removeListener
      );
   }

   /** pubSub instances are functions */
   function pubSubInstance( eventName ){

      return singles[eventName] || newSingle( eventName );
   }

   // add convenience EventEmitter-style uncurried form of 'emit' and 'on'
   ['emit', 'on', 'un'].forEach(function(methodName){

      pubSubInstance[methodName] = varArgs(function(eventName, parameters){
         apply( parameters, pubSubInstance( eventName )[methodName]);
      });
   });

   return pubSubInstance;
}

/**
 * This file declares some constants to use as names for event types.
 */

var // the events which are never exported are kept as 
    // the smallest possible representation, in numbers:
    _S = 1,

    // fired whenever a new node starts in the JSON stream:
    NODE_OPENED     = _S++,

    // fired whenever a node closes in the JSON stream:
    NODE_CLOSED     = _S++,

    // called if a .node callback returns a value - 
    NODE_SWAP       = _S++,
    NODE_DROP       = _S++,

    FAIL_EVENT      = 'fail',
   
    ROOT_NODE_FOUND = _S++,
    ROOT_PATH_FOUND = _S++,
   
    HTTP_START      = 'start',
    STREAM_DATA     = 'data',
    STREAM_END      = 'end',
    ABORTING        = _S++,

    // SAX events butchered from Clarinet
    SAX_KEY          = _S++,
    SAX_VALUE_OPEN   = _S++,
    SAX_VALUE_CLOSE  = _S++;
    
function errorReport(statusCode, body, error) {
   try{
      var jsonBody = JSON.parse(body);
   }catch(e){}

   return {
      statusCode:statusCode,
      body:body,
      jsonBody:jsonBody,
      thrown:error
   };
}    

/** 
 *  The pattern adaptor listens for newListener and removeListener
 *  events. When patterns are added or removed it compiles the JSONPath
 *  and wires them up.
 *  
 *  When nodes and paths are found it emits the fully-qualified match 
 *  events with parameters ready to ship to the outside world
 */

function patternAdapter(oboeBus, jsonPathCompiler) {

   var predicateEventMap = {
      node:oboeBus(NODE_CLOSED)
   ,  path:oboeBus(NODE_OPENED)
   };
     
   function emitMatchingNode(emitMatch, node, ascent) {
         
      /* 
         We're now calling to the outside world where Lisp-style 
         lists will not be familiar. Convert to standard arrays. 
   
         Also, reverse the order because it is more common to 
         list paths "root to leaf" than "leaf to root"  */
      var descent     = reverseList(ascent);
                
      emitMatch(
         node,
         
         // To make a path, strip off the last item which is the special
         // ROOT_PATH token for the 'path' to the root node          
         listAsArray(tail(map(keyOf,descent))),  // path
         listAsArray(map(nodeOf, descent))       // ancestors    
      );         
   }

   /* 
    * Set up the catching of events such as NODE_CLOSED and NODE_OPENED and, if 
    * matching the specified pattern, propagate to pattern-match events such as 
    * oboeBus('node:!')
    * 
    * 
    * 
    * @param {Function} predicateEvent 
    *          either oboeBus(NODE_CLOSED) or oboeBus(NODE_OPENED).
    * @param {Function} compiledJsonPath          
    */
   function addUnderlyingListener( fullEventName, predicateEvent, compiledJsonPath ){
   
      var emitMatch = oboeBus(fullEventName).emit;
   
      predicateEvent.on( function (ascent) {

         var maybeMatchingMapping = compiledJsonPath(ascent);

         /* Possible values for maybeMatchingMapping are now:

          false: 
          we did not match 

          an object/array/string/number/null: 
          we matched and have the node that matched.
          Because nulls are valid json values this can be null.

          undefined:
          we matched but don't have the matching node yet.
          ie, we know there is an upcoming node that matches but we 
          can't say anything else about it. 
          */
         if (maybeMatchingMapping !== false) {

            emitMatchingNode(
               emitMatch, 
               nodeOf(maybeMatchingMapping), 
               ascent
            );
         }
      }, fullEventName);
     
      oboeBus('removeListener').on( function(removedEventName){

         // if the fully qualified match event listener is later removed, clean up 
         // by removing the underlying listener if it was the last using that pattern:
      
         if( removedEventName == fullEventName ) {
         
            if( !oboeBus(removedEventName).listeners(  )) {
               predicateEvent.un( fullEventName );
            }
         }
      });   
   }

   oboeBus('newListener').on( function(fullEventName){

      var match = /(node|path):(.*)/.exec(fullEventName);
      
      if( match ) {
         var predicateEvent = predicateEventMap[match[1]];
                    
         if( !predicateEvent.hasListener( fullEventName) ) {  
                  
            addUnderlyingListener(
               fullEventName,
               predicateEvent, 
               jsonPathCompiler( match[2] )
            );
         }
      }    
   })

}

/**
 * The instance API is the thing that is returned when oboe() is called.
 * it allows:
 *
 *    - listeners for various events to be added and removed
 *    - the http response header/headers to be read
 */
function instanceApi(oboeBus, contentSource){

  var oboeApi,
      fullyQualifiedNamePattern = /^(node|path):./,
      rootNodeFinishedEvent = oboeBus(ROOT_NODE_FOUND),
      emitNodeDrop = oboeBus(NODE_DROP).emit,
      emitNodeSwap = oboeBus(NODE_SWAP).emit,

      /**
       * Add any kind of listener that the instance api exposes
       */
      addListener = varArgs(function( eventId, parameters ){

        if( oboeApi[eventId] ) {

          // for events added as .on(event, callback), if there is a
          // .event() equivalent with special behaviour , pass through
          // to that:
          apply(parameters, oboeApi[eventId]);
        } else {

          // we have a standard Node.js EventEmitter 2-argument call.
          // The first parameter is the listener.
          var event = oboeBus(eventId),
              listener = parameters[0];

          if( fullyQualifiedNamePattern.test(eventId) ) {

            // allow fully-qualified node/path listeners
            // to be added
            addForgettableCallback(event, listener);
          } else  {

            // the event has no special handling, pass through
            // directly onto the event bus:
            event.on( listener);
          }
        }

        return oboeApi; // chaining
      }),

      /**
       * Remove any kind of listener that the instance api exposes
       */
      removeListener = function( eventId, p2, p3 ){

        if( eventId == 'done' ) {

          rootNodeFinishedEvent.un(p2);

        } else if( eventId == 'node' || eventId == 'path' ) {

          // allow removal of node and path
          oboeBus.un(eventId + ':' + p2, p3);
        } else {

          // we have a standard Node.js EventEmitter 2-argument call.
          // The second parameter is the listener. This may be a call
          // to remove a fully-qualified node/path listener but requires
          // no special handling
          var listener = p2;

          oboeBus(eventId).un(listener);
        }

        return oboeApi; // chaining
      };

  /**
   * Add a callback, wrapped in a try/catch so as to not break the
   * execution of Oboe if an exception is thrown (fail events are
   * fired instead)
   *
   * The callback is used as the listener id so that it can later be
   * removed using .un(callback)
   */
  function addProtectedCallback(eventName, callback) {
    oboeBus(eventName).on(protectedCallback(callback), callback);
    return oboeApi; // chaining
  }

  /**
   * Add a callback where, if .forget() is called during the callback's
   * execution, the callback will be de-registered
   */
  function addForgettableCallback(event, callback, listenerId) {

    // listenerId is optional and if not given, the original
    // callback will be used
    listenerId = listenerId || callback;

    var safeCallback = protectedCallback(callback);

    event.on( function() {

      var discard = false;

      oboeApi.forget = function(){
        discard = true;
      };

      apply( arguments, safeCallback );

      delete oboeApi.forget;

      if( discard ) {
        event.un(listenerId);
      }
    }, listenerId);

    return oboeApi; // chaining
  }

  /**
   *  wrap a callback so that if it throws, Oboe.js doesn't crash but instead
   *  throw the error in another event loop
   */
  function protectedCallback( callback ) {
    return function() {
      try{
        return callback.apply(oboeApi, arguments);
      }catch(e)  {
        setTimeout(function() {
          throw new Error(e.message);
        });
      }
    }
  }

  /**
   * Return the fully qualified event for when a pattern matches
   * either a node or a path
   *
   * @param type {String} either 'node' or 'path'
   */
  function fullyQualifiedPatternMatchEvent(type, pattern) {
    return oboeBus(type + ':' + pattern);
  }

  function wrapCallbackToSwapNodeIfSomethingReturned( callback ) {
    return function() {
      var returnValueFromCallback = callback.apply(this, arguments);

      if( defined(returnValueFromCallback) ) {

        if( returnValueFromCallback == oboe.drop ) {
          emitNodeDrop();
        } else {
          emitNodeSwap(returnValueFromCallback);
        }
      }
    }
  }

  function addSingleNodeOrPathListener(eventId, pattern, callback) {

    var effectiveCallback;

    if( eventId == 'node' ) {
      effectiveCallback = wrapCallbackToSwapNodeIfSomethingReturned(callback);
    } else {
      effectiveCallback = callback;
    }

    addForgettableCallback(
      fullyQualifiedPatternMatchEvent(eventId, pattern),
      effectiveCallback,
      callback
    );
  }

  /**
   * Add several listeners at a time, from a map
   */
  function addMultipleNodeOrPathListeners(eventId, listenerMap) {

    for( var pattern in listenerMap ) {
      addSingleNodeOrPathListener(eventId, pattern, listenerMap[pattern]);
    }
  }

  /**
   * implementation behind .onPath() and .onNode()
   */
  function addNodeOrPathListenerApi( eventId, jsonPathOrListenerMap, callback ){

    if( isString(jsonPathOrListenerMap) ) {
      addSingleNodeOrPathListener(eventId, jsonPathOrListenerMap, callback);

    } else {
      addMultipleNodeOrPathListeners(eventId, jsonPathOrListenerMap);
    }

    return oboeApi; // chaining
  }


  // some interface methods are only filled in after we receive
  // values and are noops before that:
  oboeBus(ROOT_PATH_FOUND).on( function(rootNode) {
    oboeApi.root = functor(rootNode);
  });

  /**
   * When content starts make the headers readable through the
   * instance API
   */
  oboeBus(HTTP_START).on( function(_statusCode, headers) {

    oboeApi.header =  function(name) {
      return name ? headers[name]
        : headers
      ;
    }
  });

  /**
   * Construct and return the public API of the Oboe instance to be
   * returned to the calling application
   */
  return oboeApi = {
    on             : addListener,
    addListener    : addListener,
    removeListener : removeListener,
    emit           : oboeBus.emit,

    node           : partialComplete(addNodeOrPathListenerApi, 'node'),
    path           : partialComplete(addNodeOrPathListenerApi, 'path'),

    done           : partialComplete(addForgettableCallback, rootNodeFinishedEvent),
    start          : partialComplete(addProtectedCallback, HTTP_START ),

    // fail doesn't use protectedCallback because
    // could lead to non-terminating loops
    fail           : oboeBus(FAIL_EVENT).on,

    // public api calling abort fires the ABORTING event
    abort          : oboeBus(ABORTING).emit,

    // initially return nothing for header and root
    header         : noop,
    root           : noop,

    source         : contentSource
  };
}

/**
 * This file sits just behind the API which is used to attain a new
 * Oboe instance. It creates the new components that are required
 * and introduces them to each other.
 */

function wire (httpMethodName, contentSource, body, headers, withCredentials){

   var oboeBus = pubSub();
   
   // Wire the input stream in if we are given a content source.
   // This will usually be the case. If not, the instance created
   // will have to be passed content from an external source.
  
   if( contentSource ) {

      streamingHttp( oboeBus,
                     httpTransport(), 
                     httpMethodName,
                     contentSource,
                     body,
                     headers,
                     withCredentials
      );
   }

   clarinet(oboeBus);

   ascentManager(oboeBus, incrementalContentBuilder(oboeBus));
      
   patternAdapter(oboeBus, jsonPathCompiler);      
      
   return instanceApi(oboeBus, contentSource);
}

function applyDefaults( passthrough, url, httpMethodName, body, headers, withCredentials, cached ){

   headers = headers ?
      // Shallow-clone the headers array. This allows it to be
      // modified without side effects to the caller. We don't
      // want to change objects that the user passes in.
      JSON.parse(JSON.stringify(headers))
      : {};

   if( body ) {
      if( !isString(body) ) {

         // If the body is not a string, stringify it. This allows objects to
         // be given which will be sent as JSON.
         body = JSON.stringify(body);

         // Default Content-Type to JSON unless given otherwise.
         headers['Content-Type'] = headers['Content-Type'] || 'application/json';
      }
      headers['Content-Length'] = headers['Content-Length'] || body.length;
   } else {
      body = null;
   }

   // support cache busting like jQuery.ajax({cache:false})
   function modifiedUrl(baseUrl, cached) {

      if( cached === false ) {

         if( baseUrl.indexOf('?') == -1 ) {
            baseUrl += '?';
         } else {
            baseUrl += '&';
         }

         baseUrl += '_=' + new Date().getTime();
      }
      return baseUrl;
   }

   return passthrough( httpMethodName || 'GET', modifiedUrl(url, cached), body, headers, withCredentials || false );
}

// export public API
function oboe(arg1) {

   // We use duck-typing to detect if the parameter given is a stream, with the
   // below list of parameters.
   // Unpipe and unshift would normally be present on a stream but this breaks
   // compatibility with Request streams.
   // See https://github.com/jimhigson/oboe.js/issues/65
   
   var nodeStreamMethodNames = list('resume', 'pause', 'pipe'),
       isStream = partialComplete(
                     hasAllProperties
                  ,  nodeStreamMethodNames
                  );
   
   if( arg1 ) {
      if (isStream(arg1) || isString(arg1)) {

         //  simple version for GETs. Signature is:
         //    oboe( url )
         //  or, under node:
         //    oboe( readableStream )
         return applyDefaults(
            wire,
            arg1 // url
         );

      } else {

         // method signature is:
         //    oboe({method:m, url:u, body:b, headers:{...}})

         return applyDefaults(
            wire,
            arg1.url,
            arg1.method,
            arg1.body,
            arg1.headers,
            arg1.withCredentials,
            arg1.cached
         );
         
      }
   } else {
      // wire up a no-AJAX, no-stream Oboe. Will have to have content 
      // fed in externally and using .emit.
      return wire();
   }
}

/* oboe.drop is a special value. If a node callback returns this value the
   parsed node is deleted from the JSON
 */
oboe.drop = function() {
   return oboe.drop;
};


   if ( true ) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () { return oboe; }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
   } else {}
})((function(){
   // Access to the window object throws an exception in HTML5 web workers so
   // point it to "self" if it runs in a web worker
      try {
         return window;
      } catch (e) {
         return self;
      }
   }()), Object, Array, Error, JSON);


/***/ }),

/***/ "PENG":
/***/ (function(module, exports) {

exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

exports.homedir = function () {
	return '/'
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb2JvZS9kaXN0L29ib2UtYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb3MtYnJvd3NlcmlmeS9icm93c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsV0FBVztBQUM3RDtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsMEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLHdCQUF3QixxQkFBcUI7QUFDN0M7QUFDQTs7QUFFQSxzRDs7QUFFQTtBQUNBLE9BQU8sRTtBQUNQLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsb0M7QUFDQSx1QztBQUNBOztBQUVBOztBQUVBO0FBQ0EsT0FBTztBQUNQLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0EsdUJBQXVCLGVBQWU7QUFDdEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLHdCQUF3QixjQUFjOztBQUV0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxJQUFJLEU7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUM7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQzs7QUFFQTs7QUFFQSxxQkFBcUIsNEJBQTRCO0FBQ2pELHNDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx5QztBQUNBLEk7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsSztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjs7QUFFbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUM7QUFDQSxzQztBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxJQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVSxTQUFTO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLFNBQVM7QUFDbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2Qiw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGdCQUFnQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGtCQUFrQjtBQUNyRCxtQ0FBbUMsa0JBQWtCO0FBQ3JELG1DQUFtQyxrQkFBa0I7QUFDckQsbUNBQW1DLGtCQUFrQjtBQUNyRCxtQ0FBbUMsa0JBQWtCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLEU7QUFDSjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMseUJBQXlCO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsV0FBVyxlQUFlO0FBQzFCO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsWUFBWTtBQUN2QjtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE87O0FBRUE7QUFDQTs7O0FBR0EsMkJBQTJCO0FBQzNCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxVQUFVO0FBQ3BCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQzs7QUFFcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxVQUFVO0FBQ3BELDBDQUEwQyxVQUFVOzs7QUFHcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxNO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSx3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEs7O0FBRUEsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QixXQUFXLGdDQUFnQztBQUMzQztBQUNBO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw2RDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHFCQUFxQjtBQUNuQztBQUNBO0FBQ0E7QUFDQSxjQUFjLDBDQUEwQztBQUN4RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSwrQ0FBK0M7OztBQUcvQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixtQkFBbUI7QUFDbkIsV0FBVztBQUNYO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSw2QkFBNkI7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDZCQUE2Qjs7QUFFN0I7O0FBRUEsSTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVzs7QUFFWDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEk7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFNBQVM7QUFDdkI7QUFDQSxjQUFjLFNBQVM7QUFDdkIsY0FBYyxNQUFNO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0EsaUI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkU7O0FBRUE7QUFDQSxPO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRTtBQUNBO0FBQ0EsSTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQSxXQUFXLGtCQUFrQjtBQUM3QjtBQUNBLFdBQVcsa0JBQWtCO0FBQzdCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCLGVBQWUsRUFBRTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQjtBQUNsQixLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEIsd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUI7QUFDbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQLElBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFNBQVM7QUFDdkI7QUFDQSxjQUFjLFNBQVM7QUFDdkI7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxFO0FBQ1A7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSw0RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPO0FBQ0EsSUFBSTs7QUFFSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7O0FBRVg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUI7QUFDdkIsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx1QkFBdUI7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwsbUJBQW1CO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxtQkFBbUI7QUFDbkI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsNkM7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQSw4Q0FBOEMsWUFBWTtBQUMxRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTzs7QUFFUDtBQUNBLHFCQUFxQixrQ0FBa0MsS0FBSzs7QUFFNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxRQUFRLElBQTBDO0FBQ2xELE1BQU0saUNBQWdCLEVBQUUsbUNBQUUsYUFBYSxhQUFhLEVBQUU7QUFBQSxvR0FBRTtBQUN4RCxJQUFJLE1BQU0sRUFJTjtBQUNKLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsSUFBSTs7Ozs7Ozs7QUNqcEZKLGtDQUFrQzs7QUFFbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtCQUErQjs7QUFFL0IsOEJBQThCOztBQUU5QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDRCQUE0Qjs7QUFFNUIsNEJBQTRCOztBQUU1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsVUFBVTs7QUFFekIsNEJBQTRCOztBQUU1QixnQ0FBZ0M7O0FBRWhDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EiLCJmaWxlIjoidmVuZG9yfmEwYzg5MGJjLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgZmlsZSBpcyB0aGUgY29uY2F0ZW5hdGlvbiBvZiBtYW55IGpzIGZpbGVzLlxuLy8gU2VlIGh0dHA6Ly9naXRodWIuY29tL2ppbWhpZ3Nvbi9vYm9lLmpzIGZvciB0aGUgcmF3IHNvdXJjZVxuXG4vLyBoYXZpbmcgYSBsb2NhbCB1bmRlZmluZWQsIHdpbmRvdywgT2JqZWN0IGV0YyBhbGxvd3Mgc2xpZ2h0bHkgYmV0dGVyIG1pbmlmaWNhdGlvbjpcbihmdW5jdGlvbiAgKHdpbmRvdywgT2JqZWN0LCBBcnJheSwgRXJyb3IsIEpTT04sIHVuZGVmaW5lZCApIHtcblxuICAgLy8gdjIuMS4zLTE1LWc3NDMyYjQ5XG5cbi8qXG5cbkNvcHlyaWdodCAoYykgMjAxMywgSmltIEhpZ3NvblxuXG5BbGwgcmlnaHRzIHJlc2VydmVkLlxuXG5SZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbm1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmVcbm1ldDpcblxuMS4gIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0XG4gICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuXG4yLiAgUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHRcbiAgICBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlXG4gICAgZG9jdW1lbnRhdGlvbiBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTXG5JU1wiIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEXG5UTywgVEhFIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEFcblBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVFxuSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLFxuU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEXG5UTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SXG5QUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElOR1xuTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG5TT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cblxuKi9cblxuLyoqIFxuICogUGFydGlhbGx5IGNvbXBsZXRlIGEgZnVuY3Rpb24uXG4gKiBcbiAqICB2YXIgYWRkMyA9IHBhcnRpYWxDb21wbGV0ZSggZnVuY3Rpb24gYWRkKGEsYil7cmV0dXJuIGErYn0sIDMgKTtcbiAqICBcbiAqICBhZGQzKDQpIC8vIGdpdmVzIDdcbiAqICBcbiAqICBmdW5jdGlvbiB3cmFwKGxlZnQsIHJpZ2h0LCBjZW4pe3JldHVybiBsZWZ0ICsgXCIgXCIgKyBjZW4gKyBcIiBcIiArIHJpZ2h0O31cbiAqICBcbiAqICB2YXIgcGlyYXRlR3JlZXRpbmcgPSBwYXJ0aWFsQ29tcGxldGUoIHdyYXAgLCBcIkknbVwiLCBcIiwgYSBtaWdodHkgcGlyYXRlIVwiICk7XG4gKiAgXG4gKiAgcGlyYXRlR3JlZXRpbmcoXCJHdXlicnVzaCBUaHJlZXB3b29kXCIpOyBcbiAqICAvLyBnaXZlcyBcIkknbSBHdXlicnVzaCBUaHJlZXB3b29kLCBhIG1pZ2h0eSBwaXJhdGUhXCJcbiAqL1xudmFyIHBhcnRpYWxDb21wbGV0ZSA9IHZhckFyZ3MoZnVuY3Rpb24oIGZuLCBhcmdzICkge1xuXG4gICAgICAvLyB0aGlzIGlzbid0IHRoZSBzaG9ydGVzdCB3YXkgdG8gd3JpdGUgdGhpcyBidXQgaXQgZG9lc1xuICAgICAgLy8gYXZvaWQgY3JlYXRpbmcgYSBuZXcgYXJyYXkgZWFjaCB0aW1lIHRvIHBhc3MgdG8gZm4uYXBwbHksXG4gICAgICAvLyBvdGhlcndpc2UgY291bGQganVzdCBjYWxsIGJvdW5kQXJncy5jb25jYXQoY2FsbEFyZ3MpICAgICAgIFxuXG4gICAgICB2YXIgbnVtQm91bmRBcmdzID0gYXJncy5sZW5ndGg7XG5cbiAgICAgIHJldHVybiB2YXJBcmdzKGZ1bmN0aW9uKCBjYWxsQXJncyApIHtcbiAgICAgICAgIFxuICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWxsQXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tudW1Cb3VuZEFyZ3MgKyBpXSA9IGNhbGxBcmdzW2ldO1xuICAgICAgICAgfVxuICAgICAgICAgXG4gICAgICAgICBhcmdzLmxlbmd0aCA9IG51bUJvdW5kQXJncyArIGNhbGxBcmdzLmxlbmd0aDsgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgfSk7IFxuICAgfSksXG5cbi8qKlxuICogQ29tcG9zZSB6ZXJvIG9yIG1vcmUgZnVuY3Rpb25zOlxuICogXG4gKiAgICBjb21wb3NlKGYxLCBmMiwgZjMpKHgpID0gZjEoZjIoZjMoeCkpKSlcbiAqIFxuICogVGhlIGxhc3QgKGlubmVyLW1vc3QpIGZ1bmN0aW9uIG1heSB0YWtlIG1vcmUgdGhhbiBvbmUgcGFyYW1ldGVyOlxuICogXG4gKiAgICBjb21wb3NlKGYxLCBmMiwgZjMpKHgseSkgPSBmMShmMihmMyh4LHkpKSkpXG4gKi9cbiAgIGNvbXBvc2UgPSB2YXJBcmdzKGZ1bmN0aW9uKGZucykge1xuXG4gICAgICB2YXIgZm5zTGlzdCA9IGFycmF5QXNMaXN0KGZucyk7XG4gICBcbiAgICAgIGZ1bmN0aW9uIG5leHQocGFyYW1zLCBjdXJGbikgeyAgXG4gICAgICAgICByZXR1cm4gW2FwcGx5KHBhcmFtcywgY3VyRm4pXTsgICBcbiAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgcmV0dXJuIHZhckFyZ3MoZnVuY3Rpb24oc3RhcnRQYXJhbXMpe1xuICAgICAgICBcbiAgICAgICAgIHJldHVybiBmb2xkUihuZXh0LCBzdGFydFBhcmFtcywgZm5zTGlzdClbMF07XG4gICAgICB9KTtcbiAgIH0pO1xuXG4vKipcbiAqIEEgbW9yZSBvcHRpbWlzZWQgdmVyc2lvbiBvZiBjb21wb3NlIHRoYXQgdGFrZXMgZXhhY3RseSB0d28gZnVuY3Rpb25zXG4gKiBAcGFyYW0gZjFcbiAqIEBwYXJhbSBmMlxuICovXG5mdW5jdGlvbiBjb21wb3NlMihmMSwgZjIpe1xuICAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gZjEuY2FsbCh0aGlzLGYyLmFwcGx5KHRoaXMsYXJndW1lbnRzKSk7XG4gICB9XG59XG5cbi8qKlxuICogR2VuZXJpYyBmb3JtIGZvciBhIGZ1bmN0aW9uIHRvIGdldCBhIHByb3BlcnR5IGZyb20gYW4gb2JqZWN0XG4gKiBcbiAqICAgIHZhciBvID0ge1xuICogICAgICAgZm9vOidiYXInXG4gKiAgICB9XG4gKiAgICBcbiAqICAgIHZhciBnZXRGb28gPSBhdHRyKCdmb28nKVxuICogICAgXG4gKiAgICBmZXRGb28obykgLy8gcmV0dXJucyAnYmFyJ1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5IHRoZSBwcm9wZXJ0eSBuYW1lXG4gKi9cbmZ1bmN0aW9uIGF0dHIoa2V5KSB7XG4gICByZXR1cm4gZnVuY3Rpb24obykgeyByZXR1cm4gb1trZXldOyB9O1xufVxuICAgICAgICBcbi8qKlxuICogQ2FsbCBhIGxpc3Qgb2YgZnVuY3Rpb25zIHdpdGggdGhlIHNhbWUgYXJncyB1bnRpbCBvbmUgcmV0dXJucyBhIFxuICogdHJ1dGh5IHJlc3VsdC4gU2ltaWxhciB0byB0aGUgfHwgb3BlcmF0b3IuXG4gKiBcbiAqIFNvOlxuICogICAgICBsYXp5VW5pb24oW2YxLGYyLGYzIC4uLiBmbl0pKCBwMSwgcDIgLi4uIHBuIClcbiAqICAgICAgXG4gKiBJcyBlcXVpdmFsZW50IHRvOiBcbiAqICAgICAgYXBwbHkoW3AxLCBwMiAuLi4gcG5dLCBmMSkgfHwgXG4gKiAgICAgIGFwcGx5KFtwMSwgcDIgLi4uIHBuXSwgZjIpIHx8IFxuICogICAgICBhcHBseShbcDEsIHAyIC4uLiBwbl0sIGYzKSAuLi4gYXBwbHkoZm4sIFtwMSwgcDIgLi4uIHBuXSkgIFxuICogIFxuICogQHJldHVybnMgdGhlIGZpcnN0IHJldHVybiB2YWx1ZSB0aGF0IGlzIGdpdmVuIHRoYXQgaXMgdHJ1dGh5LlxuICovXG4gICB2YXIgbGF6eVVuaW9uID0gdmFyQXJncyhmdW5jdGlvbihmbnMpIHtcblxuICAgICAgcmV0dXJuIHZhckFyZ3MoZnVuY3Rpb24ocGFyYW1zKXtcbiAgIFxuICAgICAgICAgdmFyIG1heWJlVmFsdWU7XG4gICBcbiAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuKGZucyk7IGkrKykge1xuICAgXG4gICAgICAgICAgICBtYXliZVZhbHVlID0gYXBwbHkocGFyYW1zLCBmbnNbaV0pO1xuICAgXG4gICAgICAgICAgICBpZiggbWF5YmVWYWx1ZSApIHtcbiAgICAgICAgICAgICAgIHJldHVybiBtYXliZVZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgfVxuICAgICAgfSk7XG4gICB9KTsgICBcblxuLyoqXG4gKiBUaGlzIGZpbGUgZGVjbGFyZXMgdmFyaW91cyBwaWVjZXMgb2YgZnVuY3Rpb25hbCBwcm9ncmFtbWluZy5cbiAqIFxuICogVGhpcyBpc24ndCBhIGdlbmVyYWwgcHVycG9zZSBmdW5jdGlvbmFsIGxpYnJhcnksIHRvIGtlZXAgdGhpbmdzIHNtYWxsIGl0XG4gKiBoYXMganVzdCB0aGUgcGFydHMgdXNlZnVsIGZvciBPYm9lLmpzLlxuICovXG5cblxuLyoqXG4gKiBDYWxsIGEgc2luZ2xlIGZ1bmN0aW9uIHdpdGggdGhlIGdpdmVuIGFyZ3VtZW50cyBhcnJheS5cbiAqIEJhc2ljYWxseSwgYSBmdW5jdGlvbmFsLXN0eWxlIHZlcnNpb24gb2YgdGhlIE9PLXN0eWxlIEZ1bmN0aW9uI2FwcGx5IGZvciBcbiAqIHdoZW4gd2UgZG9uJ3QgY2FyZSBhYm91dCB0aGUgY29udGV4dCAoJ3RoaXMnKSBvZiB0aGUgY2FsbC5cbiAqIFxuICogVGhlIG9yZGVyIG9mIGFyZ3VtZW50cyBhbGxvd3MgcGFydGlhbCBjb21wbGV0aW9uIG9mIHRoZSBhcmd1bWVudHMgYXJyYXlcbiAqL1xuZnVuY3Rpb24gYXBwbHkoYXJncywgZm4pIHtcbiAgIHJldHVybiBmbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xufVxuXG4vKipcbiAqIERlZmluZSB2YXJpYWJsZSBhcmd1bWVudCBmdW5jdGlvbnMgYnV0IGN1dCBvdXQgYWxsIHRoYXQgdGVkaW91cyBtZXNzaW5nIGFib3V0IFxuICogd2l0aCB0aGUgYXJndW1lbnRzIG9iamVjdC4gRGVsaXZlcnMgdGhlIHZhcmlhYmxlLWxlbmd0aCBwYXJ0IG9mIHRoZSBhcmd1bWVudHNcbiAqIGxpc3QgYXMgYW4gYXJyYXkuXG4gKiBcbiAqIEVnOlxuICogXG4gKiB2YXIgbXlGdW5jdGlvbiA9IHZhckFyZ3MoXG4gKiAgICBmdW5jdGlvbiggZml4ZWRBcmd1bWVudCwgb3RoZXJGaXhlZEFyZ3VtZW50LCB2YXJpYWJsZU51bWJlck9mQXJndW1lbnRzICl7XG4gKiAgICAgICBjb25zb2xlLmxvZyggdmFyaWFibGVOdW1iZXJPZkFyZ3VtZW50cyApO1xuICogICAgfVxuICogKVxuICogXG4gKiBteUZ1bmN0aW9uKCdhJywgJ2InLCAxLCAyLCAzKTsgLy8gbG9ncyBbMSwyLDNdXG4gKiBcbiAqIHZhciBteU90aGVyRnVuY3Rpb24gPSB2YXJBcmdzKGZ1bmN0aW9uKCB2YXJpYWJsZU51bWJlck9mQXJndW1lbnRzICl7XG4gKiAgICBjb25zb2xlLmxvZyggdmFyaWFibGVOdW1iZXJPZkFyZ3VtZW50cyApO1xuICogfSlcbiAqIFxuICogbXlGdW5jdGlvbigxLCAyLCAzKTsgLy8gbG9ncyBbMSwyLDNdXG4gKiBcbiAqL1xuZnVuY3Rpb24gdmFyQXJncyhmbil7XG5cbiAgIHZhciBudW1iZXJPZkZpeGVkQXJndW1lbnRzID0gZm4ubGVuZ3RoIC0xLFxuICAgICAgIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlOyAgICAgICAgICBcbiAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgIFxuICAgaWYoIG51bWJlck9mRml4ZWRBcmd1bWVudHMgPT0gMCApIHtcbiAgICAgIC8vIGFuIG9wdGltaXNlZCBjYXNlIGZvciB3aGVuIHRoZXJlIGFyZSBubyBmaXhlZCBhcmdzOiAgIFxuICAgXG4gICAgICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIHNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgICB9XG4gICAgICBcbiAgIH0gZWxzZSBpZiggbnVtYmVyT2ZGaXhlZEFyZ3VtZW50cyA9PSAxICkge1xuICAgICAgLy8gYW4gb3B0aW1pc2VkIGNhc2UgZm9yIHdoZW4gdGhlcmUgYXJlIGlzIG9uZSBmaXhlZCBhcmdzOlxuICAgXG4gICAgICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGFyZ3VtZW50c1swXSwgc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICAgIH1cbiAgIH1cbiAgIFxuICAgLy8gZ2VuZXJhbCBjYXNlICAgXG5cbiAgIC8vIHdlIGtub3cgaG93IG1hbnkgYXJndW1lbnRzIGZuIHdpbGwgYWx3YXlzIHRha2UuIENyZWF0ZSBhXG4gICAvLyBmaXhlZC1zaXplIGFycmF5IHRvIGhvbGQgdGhhdCBtYW55LCB0byBiZSByZS11c2VkIG9uXG4gICAvLyBldmVyeSBjYWxsIHRvIHRoZSByZXR1cm5lZCBmdW5jdGlvblxuICAgdmFyIGFyZ3NIb2xkZXIgPSBBcnJheShmbi5sZW5ndGgpOyAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgIHJldHVybiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZkZpeGVkQXJndW1lbnRzOyBpKyspIHtcbiAgICAgICAgIGFyZ3NIb2xkZXJbaV0gPSBhcmd1bWVudHNbaV07ICAgICAgICAgXG4gICAgICB9XG5cbiAgICAgIGFyZ3NIb2xkZXJbbnVtYmVyT2ZGaXhlZEFyZ3VtZW50c10gPSBcbiAgICAgICAgIHNsaWNlLmNhbGwoYXJndW1lbnRzLCBudW1iZXJPZkZpeGVkQXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICByZXR1cm4gZm4uYXBwbHkoIHRoaXMsIGFyZ3NIb2xkZXIpOyAgICAgIFxuICAgfSAgICAgICBcbn1cblxuXG4vKipcbiAqIFN3YXAgdGhlIG9yZGVyIG9mIHBhcmFtZXRlcnMgdG8gYSBiaW5hcnkgZnVuY3Rpb25cbiAqIFxuICogQSBiaXQgbGlrZSB0aGlzIGZsaXA6IGh0dHA6Ly96dm9uLm9yZy9vdGhlci9oYXNrZWxsL091dHB1dHByZWx1ZGUvZmxpcF9mLmh0bWxcbiAqL1xuZnVuY3Rpb24gZmxpcChmbil7XG4gICByZXR1cm4gZnVuY3Rpb24oYSwgYil7XG4gICAgICByZXR1cm4gZm4oYixhKTtcbiAgIH1cbn1cblxuXG4vKipcbiAqIENyZWF0ZSBhIGZ1bmN0aW9uIHdoaWNoIGlzIHRoZSBpbnRlcnNlY3Rpb24gb2YgdHdvIG90aGVyIGZ1bmN0aW9ucy5cbiAqIFxuICogTGlrZSB0aGUgJiYgb3BlcmF0b3IsIGlmIHRoZSBmaXJzdCBpcyB0cnV0aHksIHRoZSBzZWNvbmQgaXMgbmV2ZXIgY2FsbGVkLFxuICogb3RoZXJ3aXNlIHRoZSByZXR1cm4gdmFsdWUgZnJvbSB0aGUgc2Vjb25kIGlzIHJldHVybmVkLlxuICovXG5mdW5jdGlvbiBsYXp5SW50ZXJzZWN0aW9uKGZuMSwgZm4yKSB7XG5cbiAgIHJldHVybiBmdW5jdGlvbiAocGFyYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICByZXR1cm4gZm4xKHBhcmFtKSAmJiBmbjIocGFyYW0pO1xuICAgfTsgICBcbn1cblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHdoaWNoIGRvZXMgbm90aGluZ1xuICovXG5mdW5jdGlvbiBub29wKCl7fVxuXG4vKipcbiAqIEEgZnVuY3Rpb24gd2hpY2ggaXMgYWx3YXlzIGhhcHB5XG4gKi9cbmZ1bmN0aW9uIGFsd2F5cygpe3JldHVybiB0cnVlfVxuXG4vKipcbiAqIENyZWF0ZSBhIGZ1bmN0aW9uIHdoaWNoIGFsd2F5cyByZXR1cm5zIHRoZSBzYW1lXG4gKiB2YWx1ZVxuICogXG4gKiB2YXIgcmV0dXJuMyA9IGZ1bmN0b3IoMyk7XG4gKiBcbiAqIHJldHVybjMoKSAvLyBnaXZlcyAzXG4gKiByZXR1cm4zKCkgLy8gc3RpbGwgZ2l2ZXMgM1xuICogcmV0dXJuMygpIC8vIHdpbGwgYWx3YXlzIGdpdmUgM1xuICovXG5mdW5jdGlvbiBmdW5jdG9yKHZhbCl7XG4gICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiB2YWw7XG4gICB9XG59XG5cbi8qKlxuICogVGhpcyBmaWxlIGRlZmluZXMgc29tZSBsb29zZWx5IGFzc29jaWF0ZWQgc3ludGFjdGljIHN1Z2FyIGZvciBcbiAqIEphdmFzY3JpcHQgcHJvZ3JhbW1pbmcgXG4gKi9cblxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gY2FuZGlkYXRlIGlzIG9mIHR5cGUgVFxuICovXG5mdW5jdGlvbiBpc09mVHlwZShULCBtYXliZVNvbWV0aGluZyl7XG4gICByZXR1cm4gbWF5YmVTb21ldGhpbmcgJiYgbWF5YmVTb21ldGhpbmcuY29uc3RydWN0b3IgPT09IFQ7XG59XG5cbnZhciBsZW4gPSBhdHRyKCdsZW5ndGgnKSwgICAgXG4gICAgaXNTdHJpbmcgPSBwYXJ0aWFsQ29tcGxldGUoaXNPZlR5cGUsIFN0cmluZyk7XG5cbi8qKiBcbiAqIEkgZG9uJ3QgbGlrZSBzYXlpbmcgdGhpczpcbiAqIFxuICogICAgZm9vICE9PT0gdW5kZWZpbmVkXG4gKiAgICBcbiAqIGJlY2F1c2Ugb2YgdGhlIGRvdWJsZS1uZWdhdGl2ZS4gSSBmaW5kIHRoaXM6XG4gKiBcbiAqICAgIGRlZmluZWQoZm9vKVxuICogICAgXG4gKiBlYXNpZXIgdG8gcmVhZC5cbiAqLyBcbmZ1bmN0aW9uIGRlZmluZWQoIHZhbHVlICkge1xuICAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIG9iamVjdCBvIGhhcyBhIGtleSBuYW1lZCBsaWtlIGV2ZXJ5IHByb3BlcnR5IGluIFxuICogdGhlIHByb3BlcnRpZXMgYXJyYXkuIFdpbGwgZ2l2ZSBmYWxzZSBpZiBhbnkgYXJlIG1pc3NpbmcsIG9yIGlmIG8gXG4gKiBpcyBub3QgYW4gb2JqZWN0LlxuICovXG5mdW5jdGlvbiBoYXNBbGxQcm9wZXJ0aWVzKGZpZWxkTGlzdCwgbykge1xuXG4gICByZXR1cm4gICAgICAobyBpbnN0YW5jZW9mIE9iamVjdCkgXG4gICAgICAgICAgICAmJlxuICAgICAgICAgICAgICAgYWxsKGZ1bmN0aW9uIChmaWVsZCkgeyAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgcmV0dXJuIChmaWVsZCBpbiBvKTsgICAgICAgICBcbiAgICAgICAgICAgICAgIH0sIGZpZWxkTGlzdCk7XG59XG4vKipcbiAqIExpa2UgY29ucyBpbiBMaXNwXG4gKi9cbmZ1bmN0aW9uIGNvbnMoeCwgeHMpIHtcbiAgIFxuICAgLyogSW50ZXJuYWxseSBsaXN0cyBhcmUgbGlua2VkIDItZWxlbWVudCBKYXZhc2NyaXB0IGFycmF5cy5cbiAgICAgICAgICBcbiAgICAgIElkZWFsbHkgdGhlIHJldHVybiBoZXJlIHdvdWxkIGJlIE9iamVjdC5mcmVlemUoW3gseHNdKVxuICAgICAgc28gdGhhdCBidWdzIHJlbGF0ZWQgdG8gbXV0YXRpb24gYXJlIGZvdW5kIGZhc3QuXG4gICAgICBIb3dldmVyLCBjb25zIGlzIHJpZ2h0IG9uIHRoZSBjcml0aWNhbCBwYXRoIGZvclxuICAgICAgcGVyZm9ybWFuY2UgYW5kIHRoaXMgc2xvd3Mgb2JvZS1tYXJrIGRvd24gYnlcbiAgICAgIH4yNSUuIFVuZGVyIHRoZW9yZXRpY2FsIGZ1dHVyZSBKUyBlbmdpbmVzIHRoYXQgZnJlZXplIG1vcmVcbiAgICAgIGVmZmljaWVudGx5IChwb3NzaWJseSBldmVuIHVzZSBpbW11dGFiaWxpdHkgdG9cbiAgICAgIHJ1biBmYXN0ZXIpIHRoaXMgc2hvdWxkIGJlIGNvbnNpZGVyZWQgZm9yXG4gICAgICByZXN0b3JhdGlvbi5cbiAgICovXG4gICBcbiAgIHJldHVybiBbeCx4c107XG59XG5cbi8qKlxuICogVGhlIGVtcHR5IGxpc3RcbiAqL1xudmFyIGVtcHR5TGlzdCA9IG51bGwsXG5cbi8qKlxuICogR2V0IHRoZSBoZWFkIG9mIGEgbGlzdC5cbiAqIFxuICogSWUsIGhlYWQoY29ucyhhLGIpKSA9IGFcbiAqL1xuICAgIGhlYWQgPSBhdHRyKDApLFxuXG4vKipcbiAqIEdldCB0aGUgdGFpbCBvZiBhIGxpc3QuXG4gKiBcbiAqIEllLCB0YWlsKGNvbnMoYSxiKSkgPSBiXG4gKi9cbiAgICB0YWlsID0gYXR0cigxKTtcblxuXG4vKiogXG4gKiBDb252ZXJ0cyBhbiBhcnJheSB0byBhIGxpc3QgXG4gKiBcbiAqICAgIGFzTGlzdChbYSxiLGNdKVxuICogXG4gKiBpcyBlcXVpdmFsZW50IHRvOlxuICogICAgXG4gKiAgICBjb25zKGEsIGNvbnMoYiwgY29ucyhjLCBlbXB0eUxpc3QpKSkgXG4gKiovXG5mdW5jdGlvbiBhcnJheUFzTGlzdChpbnB1dEFycmF5KXtcblxuICAgcmV0dXJuIHJldmVyc2VMaXN0KCBcbiAgICAgIGlucHV0QXJyYXkucmVkdWNlKFxuICAgICAgICAgZmxpcChjb25zKSxcbiAgICAgICAgIGVtcHR5TGlzdCBcbiAgICAgIClcbiAgICk7XG59XG5cbi8qKlxuICogQSB2YXJhcmdzIHZlcnNpb24gb2YgYXJyYXlBc0xpc3QuIFdvcmtzIGEgYml0IGxpa2UgbGlzdFxuICogaW4gTElTUC5cbiAqIFxuICogICAgbGlzdChhLGIsYykgXG4gKiAgICBcbiAqIGlzIGVxdWl2YWxlbnQgdG86XG4gKiBcbiAqICAgIGNvbnMoYSwgY29ucyhiLCBjb25zKGMsIGVtcHR5TGlzdCkpKVxuICovXG52YXIgbGlzdCA9IHZhckFyZ3MoYXJyYXlBc0xpc3QpO1xuXG4vKipcbiAqIENvbnZlcnQgYSBsaXN0IGJhY2sgdG8gYSBqcyBuYXRpdmUgYXJyYXlcbiAqL1xuZnVuY3Rpb24gbGlzdEFzQXJyYXkobGlzdCl7XG5cbiAgIHJldHVybiBmb2xkUiggZnVuY3Rpb24oYXJyYXlTb0ZhciwgbGlzdEl0ZW0pe1xuICAgICAgXG4gICAgICBhcnJheVNvRmFyLnVuc2hpZnQobGlzdEl0ZW0pO1xuICAgICAgcmV0dXJuIGFycmF5U29GYXI7XG4gICAgICAgICAgIFxuICAgfSwgW10sIGxpc3QgKTtcbiAgIFxufVxuXG4vKipcbiAqIE1hcCBhIGZ1bmN0aW9uIG92ZXIgYSBsaXN0IFxuICovXG5mdW5jdGlvbiBtYXAoZm4sIGxpc3QpIHtcblxuICAgcmV0dXJuIGxpc3RcbiAgICAgICAgICAgID8gY29ucyhmbihoZWFkKGxpc3QpKSwgbWFwKGZuLHRhaWwobGlzdCkpKVxuICAgICAgICAgICAgOiBlbXB0eUxpc3RcbiAgICAgICAgICAgIDtcbn1cblxuLyoqXG4gKiBmb2xkUiBpbXBsZW1lbnRhdGlvbi4gUmVkdWNlIGEgbGlzdCBkb3duIHRvIGEgc2luZ2xlIHZhbHVlLlxuICogXG4gKiBAcHJhbSB7RnVuY3Rpb259IGZuICAgICAocmlnaHRFdmFsLCBjdXJWYWwpIC0+IHJlc3VsdCBcbiAqL1xuZnVuY3Rpb24gZm9sZFIoZm4sIHN0YXJ0VmFsdWUsIGxpc3QpIHtcbiAgICAgIFxuICAgcmV0dXJuIGxpc3QgXG4gICAgICAgICAgICA/IGZuKGZvbGRSKGZuLCBzdGFydFZhbHVlLCB0YWlsKGxpc3QpKSwgaGVhZChsaXN0KSlcbiAgICAgICAgICAgIDogc3RhcnRWYWx1ZVxuICAgICAgICAgICAgO1xufVxuXG4vKipcbiAqIGZvbGRSIGltcGxlbWVudGF0aW9uLiBSZWR1Y2UgYSBsaXN0IGRvd24gdG8gYSBzaW5nbGUgdmFsdWUuXG4gKiBcbiAqIEBwcmFtIHtGdW5jdGlvbn0gZm4gICAgIChyaWdodEV2YWwsIGN1clZhbCkgLT4gcmVzdWx0IFxuICovXG5mdW5jdGlvbiBmb2xkUjEoZm4sIGxpc3QpIHtcbiAgICAgIFxuICAgcmV0dXJuIHRhaWwobGlzdCkgXG4gICAgICAgICAgICA/IGZuKGZvbGRSMShmbiwgdGFpbChsaXN0KSksIGhlYWQobGlzdCkpXG4gICAgICAgICAgICA6IGhlYWQobGlzdClcbiAgICAgICAgICAgIDtcbn1cblxuXG4vKipcbiAqIFJldHVybiBhIGxpc3QgbGlrZSB0aGUgb25lIGdpdmVuIGJ1dCB3aXRoIHRoZSBmaXJzdCBpbnN0YW5jZSBlcXVhbCBcbiAqIHRvIGl0ZW0gcmVtb3ZlZCBcbiAqL1xuZnVuY3Rpb24gd2l0aG91dChsaXN0LCB0ZXN0LCByZW1vdmVkRm4pIHtcbiBcbiAgIHJldHVybiB3aXRob3V0SW5uZXIobGlzdCwgcmVtb3ZlZEZuIHx8IG5vb3ApO1xuIFxuICAgZnVuY3Rpb24gd2l0aG91dElubmVyKHN1Ykxpc3QsIHJlbW92ZWRGbikge1xuICAgICAgcmV0dXJuIHN1Ykxpc3QgIFxuICAgICAgICAgPyAgKCB0ZXN0KGhlYWQoc3ViTGlzdCkpIFxuICAgICAgICAgICAgICAgICAgPyAocmVtb3ZlZEZuKGhlYWQoc3ViTGlzdCkpLCB0YWlsKHN1Ykxpc3QpKSBcbiAgICAgICAgICAgICAgICAgIDogY29ucyhoZWFkKHN1Ykxpc3QpLCB3aXRob3V0SW5uZXIodGFpbChzdWJMaXN0KSwgcmVtb3ZlZEZuKSlcbiAgICAgICAgICAgIClcbiAgICAgICAgIDogZW1wdHlMaXN0XG4gICAgICAgICA7XG4gICB9ICAgICAgICAgICAgICAgXG59XG5cbi8qKiBcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gZnVuY3Rpb24gaG9sZHMgZm9yIGV2ZXJ5IGl0ZW0gaW4gXG4gKiB0aGUgbGlzdCwgZmFsc2Ugb3RoZXJ3aXNlIFxuICovXG5mdW5jdGlvbiBhbGwoZm4sIGxpc3QpIHtcbiAgIFxuICAgcmV0dXJuICFsaXN0IHx8IFxuICAgICAgICAgICggZm4oaGVhZChsaXN0KSkgJiYgYWxsKGZuLCB0YWlsKGxpc3QpKSApO1xufVxuXG4vKipcbiAqIENhbGwgZXZlcnkgZnVuY3Rpb24gaW4gYSBsaXN0IG9mIGZ1bmN0aW9ucyB3aXRoIHRoZSBzYW1lIGFyZ3VtZW50c1xuICogXG4gKiBUaGlzIGRvZXNuJ3QgbWFrZSBhbnkgc2Vuc2UgaWYgd2UncmUgZG9pbmcgcHVyZSBmdW5jdGlvbmFsIGJlY2F1c2UgXG4gKiBpdCBkb2Vzbid0IHJldHVybiBhbnl0aGluZy4gSGVuY2UsIHRoaXMgaXMgb25seSByZWFsbHkgdXNlZnVsIGlmIHRoZVxuICogZnVuY3Rpb25zIGJlaW5nIGNhbGxlZCBoYXZlIHNpZGUtZWZmZWN0cy4gXG4gKi9cbmZ1bmN0aW9uIGFwcGx5RWFjaChmbkxpc3QsIGFyZ3MpIHtcblxuICAgaWYoIGZuTGlzdCApIHsgIFxuICAgICAgaGVhZChmbkxpc3QpLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgXG4gICAgICBhcHBseUVhY2godGFpbChmbkxpc3QpLCBhcmdzKTtcbiAgIH1cbn1cblxuLyoqXG4gKiBSZXZlcnNlIHRoZSBvcmRlciBvZiBhIGxpc3RcbiAqL1xuZnVuY3Rpb24gcmV2ZXJzZUxpc3QobGlzdCl7IFxuXG4gICAvLyBqcyByZS1pbXBsZW1lbnRhdGlvbiBvZiAzcmQgc29sdXRpb24gZnJvbTpcbiAgIC8vICAgIGh0dHA6Ly93d3cuaGFza2VsbC5vcmcvaGFza2VsbHdpa2kvOTlfcXVlc3Rpb25zL1NvbHV0aW9ucy81XG4gICBmdW5jdGlvbiByZXZlcnNlSW5uZXIoIGxpc3QsIHJldmVyc2VkQWxyZWFkeSApIHtcbiAgICAgIGlmKCAhbGlzdCApIHtcbiAgICAgICAgIHJldHVybiByZXZlcnNlZEFscmVhZHk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIHJldHVybiByZXZlcnNlSW5uZXIodGFpbChsaXN0KSwgY29ucyhoZWFkKGxpc3QpLCByZXZlcnNlZEFscmVhZHkpKVxuICAgfVxuXG4gICByZXR1cm4gcmV2ZXJzZUlubmVyKGxpc3QsIGVtcHR5TGlzdCk7XG59XG5cbmZ1bmN0aW9uIGZpcnN0KHRlc3QsIGxpc3QpIHtcbiAgIHJldHVybiAgIGxpc3QgJiZcbiAgICAgICAgICAgICAgICh0ZXN0KGhlYWQobGlzdCkpIFxuICAgICAgICAgICAgICAgICAgPyBoZWFkKGxpc3QpIFxuICAgICAgICAgICAgICAgICAgOiBmaXJzdCh0ZXN0LHRhaWwobGlzdCkpKTsgXG59XG5cbi8qIFxuICAgVGhpcyBpcyBhIHNsaWdodGx5IGhhY2tlZC11cCBicm93c2VyIG9ubHkgdmVyc2lvbiBvZiBjbGFyaW5ldCBcbiAgIFxuICAgICAgKiAgc29tZSBmZWF0dXJlcyByZW1vdmVkIHRvIGhlbHAga2VlcCBicm93c2VyIE9ib2UgdW5kZXIgXG4gICAgICAgICB0aGUgNWsgbWljcm8tbGlicmFyeSBsaW1pdFxuICAgICAgKiAgcGx1ZyBkaXJlY3RseSBpbnRvIGV2ZW50IGJ1c1xuICAgXG4gICBGb3IgdGhlIG9yaWdpbmFsIGdvIGhlcmU6XG4gICAgICBodHRwczovL2dpdGh1Yi5jb20vZHNjYXBlL2NsYXJpbmV0XG5cbiAgIFdlIHJlY2VpdmUgdGhlIGV2ZW50czpcbiAgICAgIFNUUkVBTV9EQVRBXG4gICAgICBTVFJFQU1fRU5EXG4gICAgICBcbiAgIFdlIGVtaXQgdGhlIGV2ZW50czpcbiAgICAgIFNBWF9LRVlcbiAgICAgIFNBWF9WQUxVRV9PUEVOXG4gICAgICBTQVhfVkFMVUVfQ0xPU0UgICAgICBcbiAgICAgIEZBSUxfRVZFTlQgICAgICBcbiAqL1xuXG5mdW5jdGlvbiBjbGFyaW5ldChldmVudEJ1cykge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgIFxuICB2YXIgXG4gICAgICAvLyBzaG9ydGN1dCBzb21lIGV2ZW50cyBvbiB0aGUgYnVzXG4gICAgICBlbWl0U2F4S2V5ICAgICAgICAgICA9IGV2ZW50QnVzKFNBWF9LRVkpLmVtaXQsXG4gICAgICBlbWl0VmFsdWVPcGVuICAgICAgICA9IGV2ZW50QnVzKFNBWF9WQUxVRV9PUEVOKS5lbWl0LFxuICAgICAgZW1pdFZhbHVlQ2xvc2UgICAgICAgPSBldmVudEJ1cyhTQVhfVkFMVUVfQ0xPU0UpLmVtaXQsXG4gICAgICBlbWl0RmFpbCAgICAgICAgICAgICA9IGV2ZW50QnVzKEZBSUxfRVZFTlQpLmVtaXQsXG4gICAgICAgICAgICAgIFxuICAgICAgTUFYX0JVRkZFUl9MRU5HVEggPSA2NCAqIDEwMjRcbiAgLCAgIHN0cmluZ1Rva2VuUGF0dGVybiA9IC9bXFxcXFwiXFxuXS9nXG4gICwgICBfbiA9IDBcbiAgXG4gICAgICAvLyBzdGF0ZXNcbiAgLCAgIEJFR0lOICAgICAgICAgICAgICAgID0gX24rK1xuICAsICAgVkFMVUUgICAgICAgICAgICAgICAgPSBfbisrIC8vIGdlbmVyYWwgc3R1ZmZcbiAgLCAgIE9QRU5fT0JKRUNUICAgICAgICAgID0gX24rKyAvLyB7XG4gICwgICBDTE9TRV9PQkpFQ1QgICAgICAgICA9IF9uKysgLy8gfVxuICAsICAgT1BFTl9BUlJBWSAgICAgICAgICAgPSBfbisrIC8vIFtcbiAgLCAgIENMT1NFX0FSUkFZICAgICAgICAgID0gX24rKyAvLyBdXG4gICwgICBTVFJJTkcgICAgICAgICAgICAgICA9IF9uKysgLy8gXCJcIlxuICAsICAgT1BFTl9LRVkgICAgICAgICAgICAgPSBfbisrIC8vICwgXCJhXCJcbiAgLCAgIENMT1NFX0tFWSAgICAgICAgICAgID0gX24rKyAvLyA6XG4gICwgICBUUlVFICAgICAgICAgICAgICAgICA9IF9uKysgLy8gclxuICAsICAgVFJVRTIgICAgICAgICAgICAgICAgPSBfbisrIC8vIHVcbiAgLCAgIFRSVUUzICAgICAgICAgICAgICAgID0gX24rKyAvLyBlXG4gICwgICBGQUxTRSAgICAgICAgICAgICAgICA9IF9uKysgLy8gYVxuICAsICAgRkFMU0UyICAgICAgICAgICAgICAgPSBfbisrIC8vIGxcbiAgLCAgIEZBTFNFMyAgICAgICAgICAgICAgID0gX24rKyAvLyBzXG4gICwgICBGQUxTRTQgICAgICAgICAgICAgICA9IF9uKysgLy8gZVxuICAsICAgTlVMTCAgICAgICAgICAgICAgICAgPSBfbisrIC8vIHVcbiAgLCAgIE5VTEwyICAgICAgICAgICAgICAgID0gX24rKyAvLyBsXG4gICwgICBOVUxMMyAgICAgICAgICAgICAgICA9IF9uKysgLy8gbFxuICAsICAgTlVNQkVSX0RFQ0lNQUxfUE9JTlQgPSBfbisrIC8vIC5cbiAgLCAgIE5VTUJFUl9ESUdJVCAgICAgICAgID0gX24gICAvLyBbMC05XVxuXG4gICAgICAvLyBzZXR1cCBpbml0aWFsIHBhcnNlciB2YWx1ZXNcbiAgLCAgIGJ1ZmZlckNoZWNrUG9zaXRpb24gID0gTUFYX0JVRkZFUl9MRU5HVEhcbiAgLCAgIGxhdGVzdEVycm9yICAgICAgICAgICAgICAgIFxuICAsICAgYyAgICAgICAgICAgICAgICAgICAgXG4gICwgICBwICAgICAgICAgICAgICAgICAgICBcbiAgLCAgIHRleHROb2RlICAgICAgICAgICAgID0gdW5kZWZpbmVkXG4gICwgICBudW1iZXJOb2RlICAgICAgICAgICA9IFwiXCIgICAgIFxuICAsICAgc2xhc2hlZCAgICAgICAgICAgICAgPSBmYWxzZVxuICAsICAgY2xvc2VkICAgICAgICAgICAgICAgPSBmYWxzZVxuICAsICAgc3RhdGUgICAgICAgICAgICAgICAgPSBCRUdJTlxuICAsICAgc3RhY2sgICAgICAgICAgICAgICAgPSBbXVxuICAsICAgdW5pY29kZVMgICAgICAgICAgICAgPSBudWxsXG4gICwgICB1bmljb2RlSSAgICAgICAgICAgICA9IDBcbiAgLCAgIGRlcHRoICAgICAgICAgICAgICAgID0gMFxuICAsICAgcG9zaXRpb24gICAgICAgICAgICAgPSAwXG4gICwgICBjb2x1bW4gICAgICAgICAgICAgICA9IDAgIC8vbW9zdGx5IGZvciBlcnJvciByZXBvcnRpbmdcbiAgLCAgIGxpbmUgICAgICAgICAgICAgICAgID0gMVxuICA7XG5cbiAgZnVuY3Rpb24gY2hlY2tCdWZmZXJMZW5ndGggKCkge1xuICAgICBcbiAgICB2YXIgbWF4QWN0dWFsID0gMDtcbiAgICAgXG4gICAgaWYgKHRleHROb2RlICE9PSB1bmRlZmluZWQgJiYgdGV4dE5vZGUubGVuZ3RoID4gTUFYX0JVRkZFUl9MRU5HVEgpIHtcbiAgICAgIGVtaXRFcnJvcihcIk1heCBidWZmZXIgbGVuZ3RoIGV4Y2VlZGVkOiB0ZXh0Tm9kZVwiKTtcbiAgICAgIG1heEFjdHVhbCA9IE1hdGgubWF4KG1heEFjdHVhbCwgdGV4dE5vZGUubGVuZ3RoKTtcbiAgICB9XG4gICAgaWYgKG51bWJlck5vZGUubGVuZ3RoID4gTUFYX0JVRkZFUl9MRU5HVEgpIHtcbiAgICAgIGVtaXRFcnJvcihcIk1heCBidWZmZXIgbGVuZ3RoIGV4Y2VlZGVkOiBudW1iZXJOb2RlXCIpO1xuICAgICAgbWF4QWN0dWFsID0gTWF0aC5tYXgobWF4QWN0dWFsLCBudW1iZXJOb2RlLmxlbmd0aCk7XG4gICAgfVxuICAgICBcbiAgICBidWZmZXJDaGVja1Bvc2l0aW9uID0gKE1BWF9CVUZGRVJfTEVOR1RIIC0gbWF4QWN0dWFsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgcG9zaXRpb247XG4gIH1cblxuICBldmVudEJ1cyhTVFJFQU1fREFUQSkub24oaGFuZGxlRGF0YSk7XG5cbiAgIC8qIEF0IHRoZSBlbmQgb2YgdGhlIGh0dHAgY29udGVudCBjbG9zZSB0aGUgY2xhcmluZXQgXG4gICAgVGhpcyB3aWxsIHByb3ZpZGUgYW4gZXJyb3IgaWYgdGhlIHRvdGFsIGNvbnRlbnQgcHJvdmlkZWQgd2FzIG5vdCBcbiAgICB2YWxpZCBqc29uLCBpZSBpZiBub3QgYWxsIGFycmF5cywgb2JqZWN0cyBhbmQgU3RyaW5ncyBjbG9zZWQgcHJvcGVybHkgKi9cbiAgZXZlbnRCdXMoU1RSRUFNX0VORCkub24oaGFuZGxlU3RyZWFtRW5kKTsgICBcblxuICBmdW5jdGlvbiBlbWl0RXJyb3IgKGVycm9yU3RyaW5nKSB7XG4gICAgIGlmICh0ZXh0Tm9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGVtaXRWYWx1ZU9wZW4odGV4dE5vZGUpO1xuICAgICAgICBlbWl0VmFsdWVDbG9zZSgpO1xuICAgICAgICB0ZXh0Tm9kZSA9IHVuZGVmaW5lZDtcbiAgICAgfVxuXG4gICAgIGxhdGVzdEVycm9yID0gRXJyb3IoZXJyb3JTdHJpbmcgKyBcIlxcbkxuOiBcIitsaW5lK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG5Db2w6IFwiK2NvbHVtbitcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuQ2hyOiBcIitjKTtcbiAgICAgXG4gICAgIGVtaXRGYWlsKGVycm9yUmVwb3J0KHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBsYXRlc3RFcnJvcikpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlU3RyZWFtRW5kKCkge1xuICAgIGlmKCBzdGF0ZSA9PSBCRUdJTiApIHtcbiAgICAgIC8vIEhhbmRsZSB0aGUgY2FzZSB3aGVyZSB0aGUgc3RyZWFtIGNsb3NlcyB3aXRob3V0IGV2ZXIgcmVjZWl2aW5nXG4gICAgICAvLyBhbnkgaW5wdXQuIFRoaXMgaXNuJ3QgYW4gZXJyb3IgLSByZXNwb25zZSBib2RpZXMgY2FuIGJlIGJsYW5rLFxuICAgICAgLy8gcGFydGljdWxhcmx5IGZvciAyMDQgaHR0cCByZXNwb25zZXNcbiAgICAgIFxuICAgICAgLy8gQmVjYXVzZSBvZiBob3cgT2JvZSBpcyBjdXJyZW50bHkgaW1wbGVtZW50ZWQsIHdlIHBhcnNlIGFcbiAgICAgIC8vIGNvbXBsZXRlbHkgZW1wdHkgc3RyZWFtIGFzIGNvbnRhaW5pbmcgYW4gZW1wdHkgb2JqZWN0LlxuICAgICAgLy8gVGhpcyBpcyBiZWNhdXNlIE9ib2UncyBkb25lIGV2ZW50IGlzIG9ubHkgZmlyZWQgd2hlbiB0aGVcbiAgICAgIC8vIHJvb3Qgb2JqZWN0IG9mIHRoZSBKU09OIHN0cmVhbSBjbG9zZXMuXG4gICAgICBcbiAgICAgIC8vIFRoaXMgc2hvdWxkIGJlIGRlY291cGxlZCBhbmQgYXR0YWNoZWQgaW5zdGVhZCB0byB0aGUgaW5wdXQgc3RyZWFtXG4gICAgICAvLyBmcm9tIHRoZSBodHRwIChvciB3aGF0ZXZlcikgcmVzb3VyY2UgZW5kaW5nLlxuICAgICAgLy8gSWYgdGhpcyBkZWNvdXBsaW5nIGNvdWxkIGhhcHBlbiB0aGUgU0FYIHBhcnNlciBjb3VsZCBzaW1wbHkgZW1pdFxuICAgICAgLy8gemVybyBldmVudHMgb24gYSBjb21wbGV0ZWx5IGVtcHR5IGlucHV0LlxuICAgICAgZW1pdFZhbHVlT3Blbih7fSk7XG4gICAgICBlbWl0VmFsdWVDbG9zZSgpO1xuXG4gICAgICBjbG9zZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgXG4gICAgaWYgKHN0YXRlICE9PSBWQUxVRSB8fCBkZXB0aCAhPT0gMClcbiAgICAgIGVtaXRFcnJvcihcIlVuZXhwZWN0ZWQgZW5kXCIpO1xuIFxuICAgIGlmICh0ZXh0Tm9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBlbWl0VmFsdWVPcGVuKHRleHROb2RlKTtcbiAgICAgIGVtaXRWYWx1ZUNsb3NlKCk7XG4gICAgICB0ZXh0Tm9kZSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgIFxuICAgIGNsb3NlZCA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiB3aGl0ZXNwYWNlKGMpe1xuICAgICByZXR1cm4gYyA9PSAnXFxyJyB8fCBjID09ICdcXG4nIHx8IGMgPT0gJyAnIHx8IGMgPT0gJ1xcdCc7XG4gIH1cbiAgIFxuICBmdW5jdGlvbiBoYW5kbGVEYXRhIChjaHVuaykge1xuICAgICAgICAgXG4gICAgLy8gdGhpcyB1c2VkIHRvIHRocm93IHRoZSBlcnJvciBidXQgaW5zaWRlIE9ib2Ugd2Ugd2lsbCBoYXZlIGFscmVhZHlcbiAgICAvLyBnb3R0ZW4gdGhlIGVycm9yIHdoZW4gaXQgd2FzIGVtaXR0ZWQuIFRoZSBpbXBvcnRhbnQgdGhpbmcgaXMgdG9cbiAgICAvLyBub3QgY29udGludWUgd2l0aCB0aGUgcGFyc2UuXG4gICAgaWYgKGxhdGVzdEVycm9yKVxuICAgICAgcmV0dXJuO1xuICAgICAgXG4gICAgaWYgKGNsb3NlZCkge1xuICAgICAgIHJldHVybiBlbWl0RXJyb3IoXCJDYW5ub3Qgd3JpdGUgYWZ0ZXIgY2xvc2VcIik7XG4gICAgfVxuXG4gICAgdmFyIGkgPSAwO1xuICAgIGMgPSBjaHVua1swXTsgXG5cbiAgICB3aGlsZSAoYykge1xuICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgIHAgPSBjO1xuICAgICAgfVxuICAgICAgYyA9IGNodW5rW2krK107XG4gICAgICBpZighYykgYnJlYWs7XG5cbiAgICAgIHBvc2l0aW9uICsrO1xuICAgICAgaWYgKGMgPT0gXCJcXG5cIikge1xuICAgICAgICBsaW5lICsrO1xuICAgICAgICBjb2x1bW4gPSAwO1xuICAgICAgfSBlbHNlIGNvbHVtbiArKztcbiAgICAgIHN3aXRjaCAoc3RhdGUpIHtcblxuICAgICAgICBjYXNlIEJFR0lOOlxuICAgICAgICAgIGlmIChjID09PSBcIntcIikgc3RhdGUgPSBPUEVOX09CSkVDVDtcbiAgICAgICAgICBlbHNlIGlmIChjID09PSBcIltcIikgc3RhdGUgPSBPUEVOX0FSUkFZO1xuICAgICAgICAgIGVsc2UgaWYgKCF3aGl0ZXNwYWNlKGMpKVxuICAgICAgICAgICAgcmV0dXJuIGVtaXRFcnJvcihcIk5vbi13aGl0ZXNwYWNlIGJlZm9yZSB7Wy5cIik7XG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgIGNhc2UgT1BFTl9LRVk6XG4gICAgICAgIGNhc2UgT1BFTl9PQkpFQ1Q6XG4gICAgICAgICAgaWYgKHdoaXRlc3BhY2UoYykpIGNvbnRpbnVlO1xuICAgICAgICAgIGlmKHN0YXRlID09PSBPUEVOX0tFWSkgc3RhY2sucHVzaChDTE9TRV9LRVkpO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYoYyA9PT0gJ30nKSB7XG4gICAgICAgICAgICAgIGVtaXRWYWx1ZU9wZW4oe30pO1xuICAgICAgICAgICAgICBlbWl0VmFsdWVDbG9zZSgpO1xuICAgICAgICAgICAgICBzdGF0ZSA9IHN0YWNrLnBvcCgpIHx8IFZBTFVFO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH0gZWxzZSAgc3RhY2sucHVzaChDTE9TRV9PQkpFQ1QpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZihjID09PSAnXCInKVxuICAgICAgICAgICAgIHN0YXRlID0gU1RSSU5HO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICByZXR1cm4gZW1pdEVycm9yKFwiTWFsZm9ybWVkIG9iamVjdCBrZXkgc2hvdWxkIHN0YXJ0IHdpdGggXFxcIiBcIik7XG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgIGNhc2UgQ0xPU0VfS0VZOlxuICAgICAgICBjYXNlIENMT1NFX09CSkVDVDpcbiAgICAgICAgICBpZiAod2hpdGVzcGFjZShjKSkgY29udGludWU7XG5cbiAgICAgICAgICBpZihjPT09JzonKSB7XG4gICAgICAgICAgICBpZihzdGF0ZSA9PT0gQ0xPU0VfT0JKRUNUKSB7XG4gICAgICAgICAgICAgIHN0YWNrLnB1c2goQ0xPU0VfT0JKRUNUKTtcblxuICAgICAgICAgICAgICAgaWYgKHRleHROb2RlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgIC8vIHdhcyBwcmV2aW91c2x5IChpbiB1cHN0cmVhbSBDbGFyaW5ldCkgb25lIGV2ZW50XG4gICAgICAgICAgICAgICAgICAvLyAgLSBvYmplY3Qgb3BlbiBjYW1lIHdpdGggdGhlIHRleHQgb2YgdGhlIGZpcnN0XG4gICAgICAgICAgICAgICAgICBlbWl0VmFsdWVPcGVuKHt9KTtcbiAgICAgICAgICAgICAgICAgIGVtaXRTYXhLZXkodGV4dE5vZGUpO1xuICAgICAgICAgICAgICAgICAgdGV4dE5vZGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICBkZXB0aCsrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgIGlmICh0ZXh0Tm9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICBlbWl0U2F4S2V5KHRleHROb2RlKTtcbiAgICAgICAgICAgICAgICAgIHRleHROb2RlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgIHN0YXRlICA9IFZBTFVFO1xuICAgICAgICAgIH0gZWxzZSBpZiAoYz09PSd9Jykge1xuICAgICAgICAgICAgIGlmICh0ZXh0Tm9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZW1pdFZhbHVlT3Blbih0ZXh0Tm9kZSk7XG4gICAgICAgICAgICAgICAgZW1pdFZhbHVlQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICB0ZXh0Tm9kZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgZW1pdFZhbHVlQ2xvc2UoKTtcbiAgICAgICAgICAgIGRlcHRoLS07XG4gICAgICAgICAgICBzdGF0ZSA9IHN0YWNrLnBvcCgpIHx8IFZBTFVFO1xuICAgICAgICAgIH0gZWxzZSBpZihjPT09JywnKSB7XG4gICAgICAgICAgICBpZihzdGF0ZSA9PT0gQ0xPU0VfT0JKRUNUKVxuICAgICAgICAgICAgICBzdGFjay5wdXNoKENMT1NFX09CSkVDVCk7XG4gICAgICAgICAgICAgaWYgKHRleHROb2RlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBlbWl0VmFsdWVPcGVuKHRleHROb2RlKTtcbiAgICAgICAgICAgICAgICBlbWl0VmFsdWVDbG9zZSgpO1xuICAgICAgICAgICAgICAgIHRleHROb2RlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICBzdGF0ZSAgPSBPUEVOX0tFWTtcbiAgICAgICAgICB9IGVsc2UgXG4gICAgICAgICAgICAgcmV0dXJuIGVtaXRFcnJvcignQmFkIG9iamVjdCcpO1xuICAgICAgICBjb250aW51ZTtcblxuICAgICAgICBjYXNlIE9QRU5fQVJSQVk6IC8vIGFmdGVyIGFuIGFycmF5IHRoZXJlIGFsd2F5cyBhIHZhbHVlXG4gICAgICAgIGNhc2UgVkFMVUU6XG4gICAgICAgICAgaWYgKHdoaXRlc3BhY2UoYykpIGNvbnRpbnVlO1xuICAgICAgICAgIGlmKHN0YXRlPT09T1BFTl9BUlJBWSkge1xuICAgICAgICAgICAgZW1pdFZhbHVlT3BlbihbXSk7XG4gICAgICAgICAgICBkZXB0aCsrOyAgICAgICAgICAgICBcbiAgICAgICAgICAgIHN0YXRlID0gVkFMVUU7XG4gICAgICAgICAgICBpZihjID09PSAnXScpIHtcbiAgICAgICAgICAgICAgZW1pdFZhbHVlQ2xvc2UoKTtcbiAgICAgICAgICAgICAgZGVwdGgtLTtcbiAgICAgICAgICAgICAgc3RhdGUgPSBzdGFjay5wb3AoKSB8fCBWQUxVRTtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzdGFjay5wdXNoKENMT1NFX0FSUkFZKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgICAgICBpZihjID09PSAnXCInKSBzdGF0ZSA9IFNUUklORztcbiAgICAgICAgICBlbHNlIGlmKGMgPT09ICd7Jykgc3RhdGUgPSBPUEVOX09CSkVDVDtcbiAgICAgICAgICBlbHNlIGlmKGMgPT09ICdbJykgc3RhdGUgPSBPUEVOX0FSUkFZO1xuICAgICAgICAgIGVsc2UgaWYoYyA9PT0gJ3QnKSBzdGF0ZSA9IFRSVUU7XG4gICAgICAgICAgZWxzZSBpZihjID09PSAnZicpIHN0YXRlID0gRkFMU0U7XG4gICAgICAgICAgZWxzZSBpZihjID09PSAnbicpIHN0YXRlID0gTlVMTDtcbiAgICAgICAgICBlbHNlIGlmKGMgPT09ICctJykgeyAvLyBrZWVwIGFuZCBjb250aW51ZVxuICAgICAgICAgICAgbnVtYmVyTm9kZSArPSBjO1xuICAgICAgICAgIH0gZWxzZSBpZihjPT09JzAnKSB7XG4gICAgICAgICAgICBudW1iZXJOb2RlICs9IGM7XG4gICAgICAgICAgICBzdGF0ZSA9IE5VTUJFUl9ESUdJVDtcbiAgICAgICAgICB9IGVsc2UgaWYoJzEyMzQ1Njc4OScuaW5kZXhPZihjKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIG51bWJlck5vZGUgKz0gYztcbiAgICAgICAgICAgIHN0YXRlID0gTlVNQkVSX0RJR0lUO1xuICAgICAgICAgIH0gZWxzZSAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGVtaXRFcnJvcihcIkJhZCB2YWx1ZVwiKTtcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgY2FzZSBDTE9TRV9BUlJBWTpcbiAgICAgICAgICBpZihjPT09JywnKSB7XG4gICAgICAgICAgICBzdGFjay5wdXNoKENMT1NFX0FSUkFZKTtcbiAgICAgICAgICAgICBpZiAodGV4dE5vZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGVtaXRWYWx1ZU9wZW4odGV4dE5vZGUpO1xuICAgICAgICAgICAgICAgIGVtaXRWYWx1ZUNsb3NlKCk7XG4gICAgICAgICAgICAgICAgdGV4dE5vZGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIHN0YXRlICA9IFZBTFVFO1xuICAgICAgICAgIH0gZWxzZSBpZiAoYz09PSddJykge1xuICAgICAgICAgICAgIGlmICh0ZXh0Tm9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZW1pdFZhbHVlT3Blbih0ZXh0Tm9kZSk7XG4gICAgICAgICAgICAgICAgZW1pdFZhbHVlQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICB0ZXh0Tm9kZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgZW1pdFZhbHVlQ2xvc2UoKTtcbiAgICAgICAgICAgIGRlcHRoLS07XG4gICAgICAgICAgICBzdGF0ZSA9IHN0YWNrLnBvcCgpIHx8IFZBTFVFO1xuICAgICAgICAgIH0gZWxzZSBpZiAod2hpdGVzcGFjZShjKSlcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgZWxzZSBcbiAgICAgICAgICAgICByZXR1cm4gZW1pdEVycm9yKCdCYWQgYXJyYXknKTtcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgY2FzZSBTVFJJTkc6XG4gICAgICAgICAgaWYgKHRleHROb2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgdGV4dE5vZGUgPSBcIlwiO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHRoYW5rcyB0aGVqaCwgdGhpcyBpcyBhbiBhYm91dCA1MCUgcGVyZm9ybWFuY2UgaW1wcm92ZW1lbnQuXG4gICAgICAgICAgdmFyIHN0YXJ0aSAgICAgICAgICAgICAgPSBpLTE7XG4gICAgICAgICAgIFxuICAgICAgICAgIFNUUklOR19CSUdMT09QOiB3aGlsZSAodHJ1ZSkge1xuXG4gICAgICAgICAgICAvLyB6ZXJvIG1lYW5zIFwibm8gdW5pY29kZSBhY3RpdmVcIi4gMS00IG1lYW4gXCJwYXJzZSBzb21lIG1vcmVcIi4gZW5kIGFmdGVyIDQuXG4gICAgICAgICAgICB3aGlsZSAodW5pY29kZUkgPiAwKSB7XG4gICAgICAgICAgICAgIHVuaWNvZGVTICs9IGM7XG4gICAgICAgICAgICAgIGMgPSBjaHVuay5jaGFyQXQoaSsrKTtcbiAgICAgICAgICAgICAgaWYgKHVuaWNvZGVJID09PSA0KSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETyB0aGlzIG1pZ2h0IGJlIHNsb3c/IHdlbGwsIHByb2JhYmx5IG5vdCB1c2VkIHRvbyBvZnRlbiBhbnl3YXlcbiAgICAgICAgICAgICAgICB0ZXh0Tm9kZSArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KHVuaWNvZGVTLCAxNikpO1xuICAgICAgICAgICAgICAgIHVuaWNvZGVJID0gMDtcbiAgICAgICAgICAgICAgICBzdGFydGkgPSBpLTE7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdW5pY29kZUkrKztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyB3ZSBjYW4ganVzdCBicmVhayBoZXJlOiBubyBzdHVmZiB3ZSBza2lwcGVkIHRoYXQgc3RpbGwgaGFzIHRvIGJlIHNsaWNlZCBvdXQgb3Igc29cbiAgICAgICAgICAgICAgaWYgKCFjKSBicmVhayBTVFJJTkdfQklHTE9PUDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjID09PSAnXCInICYmICFzbGFzaGVkKSB7XG4gICAgICAgICAgICAgIHN0YXRlID0gc3RhY2sucG9wKCkgfHwgVkFMVUU7XG4gICAgICAgICAgICAgIHRleHROb2RlICs9IGNodW5rLnN1YnN0cmluZyhzdGFydGksIGktMSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGMgPT09ICdcXFxcJyAmJiAhc2xhc2hlZCkge1xuICAgICAgICAgICAgICBzbGFzaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdGV4dE5vZGUgKz0gY2h1bmsuc3Vic3RyaW5nKHN0YXJ0aSwgaS0xKTtcbiAgICAgICAgICAgICAgIGMgPSBjaHVuay5jaGFyQXQoaSsrKTtcbiAgICAgICAgICAgICAgaWYgKCFjKSBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzbGFzaGVkKSB7XG4gICAgICAgICAgICAgIHNsYXNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICBpZiAoYyA9PT0gJ24nKSB7IHRleHROb2RlICs9ICdcXG4nOyB9XG4gICAgICAgICAgICAgIGVsc2UgaWYgKGMgPT09ICdyJykgeyB0ZXh0Tm9kZSArPSAnXFxyJzsgfVxuICAgICAgICAgICAgICBlbHNlIGlmIChjID09PSAndCcpIHsgdGV4dE5vZGUgKz0gJ1xcdCc7IH1cbiAgICAgICAgICAgICAgZWxzZSBpZiAoYyA9PT0gJ2YnKSB7IHRleHROb2RlICs9ICdcXGYnOyB9XG4gICAgICAgICAgICAgIGVsc2UgaWYgKGMgPT09ICdiJykgeyB0ZXh0Tm9kZSArPSAnXFxiJzsgfVxuICAgICAgICAgICAgICBlbHNlIGlmIChjID09PSAndScpIHtcbiAgICAgICAgICAgICAgICAvLyBcXHV4eHh4LiBtZWghXG4gICAgICAgICAgICAgICAgdW5pY29kZUkgPSAxO1xuICAgICAgICAgICAgICAgIHVuaWNvZGVTID0gJyc7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGV4dE5vZGUgKz0gYztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjID0gY2h1bmsuY2hhckF0KGkrKyk7XG4gICAgICAgICAgICAgIHN0YXJ0aSA9IGktMTtcbiAgICAgICAgICAgICAgaWYgKCFjKSBicmVhaztcbiAgICAgICAgICAgICAgZWxzZSBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3RyaW5nVG9rZW5QYXR0ZXJuLmxhc3RJbmRleCA9IGk7XG4gICAgICAgICAgICB2YXIgcmVSZXN1bHQgPSBzdHJpbmdUb2tlblBhdHRlcm4uZXhlYyhjaHVuayk7XG4gICAgICAgICAgICBpZiAoIXJlUmVzdWx0KSB7XG4gICAgICAgICAgICAgIGkgPSBjaHVuay5sZW5ndGgrMTtcbiAgICAgICAgICAgICAgdGV4dE5vZGUgKz0gY2h1bmsuc3Vic3RyaW5nKHN0YXJ0aSwgaS0xKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpID0gcmVSZXN1bHQuaW5kZXgrMTtcbiAgICAgICAgICAgIGMgPSBjaHVuay5jaGFyQXQocmVSZXN1bHQuaW5kZXgpO1xuICAgICAgICAgICAgaWYgKCFjKSB7XG4gICAgICAgICAgICAgIHRleHROb2RlICs9IGNodW5rLnN1YnN0cmluZyhzdGFydGksIGktMSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgY2FzZSBUUlVFOlxuICAgICAgICAgIGlmICghYykgIGNvbnRpbnVlOyAvLyBzdHJhbmdlIGJ1ZmZlcnNcbiAgICAgICAgICBpZiAoYz09PSdyJykgc3RhdGUgPSBUUlVFMjtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgcmV0dXJuIGVtaXRFcnJvciggJ0ludmFsaWQgdHJ1ZSBzdGFydGVkIHdpdGggdCcrIGMpO1xuICAgICAgICBjb250aW51ZTtcblxuICAgICAgICBjYXNlIFRSVUUyOlxuICAgICAgICAgIGlmICghYykgIGNvbnRpbnVlO1xuICAgICAgICAgIGlmIChjPT09J3UnKSBzdGF0ZSA9IFRSVUUzO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICByZXR1cm4gZW1pdEVycm9yKCdJbnZhbGlkIHRydWUgc3RhcnRlZCB3aXRoIHRyJysgYyk7XG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgIGNhc2UgVFJVRTM6XG4gICAgICAgICAgaWYgKCFjKSBjb250aW51ZTtcbiAgICAgICAgICBpZihjPT09J2UnKSB7XG4gICAgICAgICAgICBlbWl0VmFsdWVPcGVuKHRydWUpO1xuICAgICAgICAgICAgZW1pdFZhbHVlQ2xvc2UoKTtcbiAgICAgICAgICAgIHN0YXRlID0gc3RhY2sucG9wKCkgfHwgVkFMVUU7XG4gICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgcmV0dXJuIGVtaXRFcnJvcignSW52YWxpZCB0cnVlIHN0YXJ0ZWQgd2l0aCB0cnUnKyBjKTtcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgY2FzZSBGQUxTRTpcbiAgICAgICAgICBpZiAoIWMpICBjb250aW51ZTtcbiAgICAgICAgICBpZiAoYz09PSdhJykgc3RhdGUgPSBGQUxTRTI7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgIHJldHVybiBlbWl0RXJyb3IoJ0ludmFsaWQgZmFsc2Ugc3RhcnRlZCB3aXRoIGYnKyBjKTtcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgY2FzZSBGQUxTRTI6XG4gICAgICAgICAgaWYgKCFjKSAgY29udGludWU7XG4gICAgICAgICAgaWYgKGM9PT0nbCcpIHN0YXRlID0gRkFMU0UzO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICByZXR1cm4gZW1pdEVycm9yKCdJbnZhbGlkIGZhbHNlIHN0YXJ0ZWQgd2l0aCBmYScrIGMpO1xuICAgICAgICBjb250aW51ZTtcblxuICAgICAgICBjYXNlIEZBTFNFMzpcbiAgICAgICAgICBpZiAoIWMpICBjb250aW51ZTtcbiAgICAgICAgICBpZiAoYz09PSdzJykgc3RhdGUgPSBGQUxTRTQ7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgIHJldHVybiBlbWl0RXJyb3IoJ0ludmFsaWQgZmFsc2Ugc3RhcnRlZCB3aXRoIGZhbCcrIGMpO1xuICAgICAgICBjb250aW51ZTtcblxuICAgICAgICBjYXNlIEZBTFNFNDpcbiAgICAgICAgICBpZiAoIWMpICBjb250aW51ZTtcbiAgICAgICAgICBpZiAoYz09PSdlJykge1xuICAgICAgICAgICAgZW1pdFZhbHVlT3BlbihmYWxzZSk7XG4gICAgICAgICAgICBlbWl0VmFsdWVDbG9zZSgpO1xuICAgICAgICAgICAgc3RhdGUgPSBzdGFjay5wb3AoKSB8fCBWQUxVRTtcbiAgICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgICByZXR1cm4gZW1pdEVycm9yKCdJbnZhbGlkIGZhbHNlIHN0YXJ0ZWQgd2l0aCBmYWxzJysgYyk7XG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgIGNhc2UgTlVMTDpcbiAgICAgICAgICBpZiAoIWMpICBjb250aW51ZTtcbiAgICAgICAgICBpZiAoYz09PSd1Jykgc3RhdGUgPSBOVUxMMjtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgcmV0dXJuIGVtaXRFcnJvcignSW52YWxpZCBudWxsIHN0YXJ0ZWQgd2l0aCBuJysgYyk7XG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgIGNhc2UgTlVMTDI6XG4gICAgICAgICAgaWYgKCFjKSAgY29udGludWU7XG4gICAgICAgICAgaWYgKGM9PT0nbCcpIHN0YXRlID0gTlVMTDM7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgIHJldHVybiBlbWl0RXJyb3IoJ0ludmFsaWQgbnVsbCBzdGFydGVkIHdpdGggbnUnKyBjKTtcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgY2FzZSBOVUxMMzpcbiAgICAgICAgICBpZiAoIWMpIGNvbnRpbnVlO1xuICAgICAgICAgIGlmKGM9PT0nbCcpIHtcbiAgICAgICAgICAgIGVtaXRWYWx1ZU9wZW4obnVsbCk7XG4gICAgICAgICAgICBlbWl0VmFsdWVDbG9zZSgpO1xuICAgICAgICAgICAgc3RhdGUgPSBzdGFjay5wb3AoKSB8fCBWQUxVRTtcbiAgICAgICAgICB9IGVsc2UgXG4gICAgICAgICAgICAgcmV0dXJuIGVtaXRFcnJvcignSW52YWxpZCBudWxsIHN0YXJ0ZWQgd2l0aCBudWwnKyBjKTtcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgY2FzZSBOVU1CRVJfREVDSU1BTF9QT0lOVDpcbiAgICAgICAgICBpZihjPT09Jy4nKSB7XG4gICAgICAgICAgICBudW1iZXJOb2RlICs9IGM7XG4gICAgICAgICAgICBzdGF0ZSAgICAgICA9IE5VTUJFUl9ESUdJVDtcbiAgICAgICAgICB9IGVsc2UgXG4gICAgICAgICAgICAgcmV0dXJuIGVtaXRFcnJvcignTGVhZGluZyB6ZXJvIG5vdCBmb2xsb3dlZCBieSAuJyk7XG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgIGNhc2UgTlVNQkVSX0RJR0lUOlxuICAgICAgICAgIGlmKCcwMTIzNDU2Nzg5Jy5pbmRleE9mKGMpICE9PSAtMSkgbnVtYmVyTm9kZSArPSBjO1xuICAgICAgICAgIGVsc2UgaWYgKGM9PT0nLicpIHtcbiAgICAgICAgICAgIGlmKG51bWJlck5vZGUuaW5kZXhPZignLicpIT09LTEpXG4gICAgICAgICAgICAgICByZXR1cm4gZW1pdEVycm9yKCdJbnZhbGlkIG51bWJlciBoYXMgdHdvIGRvdHMnKTtcbiAgICAgICAgICAgIG51bWJlck5vZGUgKz0gYztcbiAgICAgICAgICB9IGVsc2UgaWYgKGM9PT0nZScgfHwgYz09PSdFJykge1xuICAgICAgICAgICAgaWYobnVtYmVyTm9kZS5pbmRleE9mKCdlJykhPT0tMSB8fFxuICAgICAgICAgICAgICAgbnVtYmVyTm9kZS5pbmRleE9mKCdFJykhPT0tMSApXG4gICAgICAgICAgICAgICByZXR1cm4gZW1pdEVycm9yKCdJbnZhbGlkIG51bWJlciBoYXMgdHdvIGV4cG9uZW50aWFsJyk7XG4gICAgICAgICAgICBudW1iZXJOb2RlICs9IGM7XG4gICAgICAgICAgfSBlbHNlIGlmIChjPT09XCIrXCIgfHwgYz09PVwiLVwiKSB7XG4gICAgICAgICAgICBpZighKHA9PT0nZScgfHwgcD09PSdFJykpXG4gICAgICAgICAgICAgICByZXR1cm4gZW1pdEVycm9yKCdJbnZhbGlkIHN5bWJvbCBpbiBudW1iZXInKTtcbiAgICAgICAgICAgIG51bWJlck5vZGUgKz0gYztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG51bWJlck5vZGUpIHtcbiAgICAgICAgICAgICAgZW1pdFZhbHVlT3BlbihwYXJzZUZsb2F0KG51bWJlck5vZGUpKTtcbiAgICAgICAgICAgICAgZW1pdFZhbHVlQ2xvc2UoKTtcbiAgICAgICAgICAgICAgbnVtYmVyTm9kZSA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpLS07IC8vIGdvIGJhY2sgb25lXG4gICAgICAgICAgICBzdGF0ZSA9IHN0YWNrLnBvcCgpIHx8IFZBTFVFO1xuICAgICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gZW1pdEVycm9yKFwiVW5rbm93biBzdGF0ZTogXCIgKyBzdGF0ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwb3NpdGlvbiA+PSBidWZmZXJDaGVja1Bvc2l0aW9uKVxuICAgICAgY2hlY2tCdWZmZXJMZW5ndGgoKTtcbiAgfVxufVxuXG5cbi8qKiBcbiAqIEEgYnJpZGdlIHVzZWQgdG8gYXNzaWduIHN0YXRlbGVzcyBmdW5jdGlvbnMgdG8gbGlzdGVuIHRvIGNsYXJpbmV0LlxuICogXG4gKiBBcyB3ZWxsIGFzIHRoZSBwYXJhbWV0ZXIgZnJvbSBjbGFyaW5ldCwgZWFjaCBjYWxsYmFjayB3aWxsIGFsc28gYmUgcGFzc2VkXG4gKiB0aGUgcmVzdWx0IG9mIHRoZSBsYXN0IGNhbGxiYWNrLlxuICogXG4gKiBUaGlzIG1heSBhbHNvIGJlIHVzZWQgdG8gY2xlYXIgYWxsIGxpc3RlbmVycyBieSBhc3NpZ25pbmcgemVybyBoYW5kbGVyczpcbiAqIFxuICogICAgYXNjZW50TWFuYWdlciggY2xhcmluZXQsIHt9IClcbiAqL1xuZnVuY3Rpb24gYXNjZW50TWFuYWdlcihvYm9lQnVzLCBoYW5kbGVycyl7XG4gICBcInVzZSBzdHJpY3RcIjtcbiAgIFxuICAgdmFyIGxpc3RlbmVySWQgPSB7fSxcbiAgICAgICBhc2NlbnQ7XG5cbiAgIGZ1bmN0aW9uIHN0YXRlQWZ0ZXIoaGFuZGxlcikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHBhcmFtKXtcbiAgICAgICAgIGFzY2VudCA9IGhhbmRsZXIoIGFzY2VudCwgcGFyYW0pO1xuICAgICAgfVxuICAgfVxuICAgXG4gICBmb3IoIHZhciBldmVudE5hbWUgaW4gaGFuZGxlcnMgKSB7XG5cbiAgICAgIG9ib2VCdXMoZXZlbnROYW1lKS5vbihzdGF0ZUFmdGVyKGhhbmRsZXJzW2V2ZW50TmFtZV0pLCBsaXN0ZW5lcklkKTtcbiAgIH1cbiAgIFxuICAgb2JvZUJ1cyhOT0RFX1NXQVApLm9uKGZ1bmN0aW9uKG5ld05vZGUpIHtcbiAgICAgIFxuICAgICAgdmFyIG9sZEhlYWQgPSBoZWFkKGFzY2VudCksXG4gICAgICAgICAga2V5ID0ga2V5T2Yob2xkSGVhZCksXG4gICAgICAgICAgYW5jZXN0b3JzID0gdGFpbChhc2NlbnQpLFxuICAgICAgICAgIHBhcmVudE5vZGU7XG5cbiAgICAgIGlmKCBhbmNlc3RvcnMgKSB7XG4gICAgICAgICBwYXJlbnROb2RlID0gbm9kZU9mKGhlYWQoYW5jZXN0b3JzKSk7XG4gICAgICAgICBwYXJlbnROb2RlW2tleV0gPSBuZXdOb2RlO1xuICAgICAgfVxuICAgfSk7XG5cbiAgIG9ib2VCdXMoTk9ERV9EUk9QKS5vbihmdW5jdGlvbigpIHtcblxuICAgICAgdmFyIG9sZEhlYWQgPSBoZWFkKGFzY2VudCksXG4gICAgICAgICAga2V5ID0ga2V5T2Yob2xkSGVhZCksXG4gICAgICAgICAgYW5jZXN0b3JzID0gdGFpbChhc2NlbnQpLFxuICAgICAgICAgIHBhcmVudE5vZGU7XG5cbiAgICAgIGlmKCBhbmNlc3RvcnMgKSB7XG4gICAgICAgICBwYXJlbnROb2RlID0gbm9kZU9mKGhlYWQoYW5jZXN0b3JzKSk7XG4gXG4gICAgICAgICBkZWxldGUgcGFyZW50Tm9kZVtrZXldO1xuICAgICAgfVxuICAgfSk7XG5cbiAgIG9ib2VCdXMoQUJPUlRJTkcpLm9uKGZ1bmN0aW9uKCl7XG4gICAgICBcbiAgICAgIGZvciggdmFyIGV2ZW50TmFtZSBpbiBoYW5kbGVycyApIHtcbiAgICAgICAgIG9ib2VCdXMoZXZlbnROYW1lKS51bihsaXN0ZW5lcklkKTtcbiAgICAgIH1cbiAgIH0pOyAgIFxufVxuXG4vLyBiYXNlZCBvbiBnaXN0IGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL21vbnN1ci83MDY4MzlcblxuLyoqXG4gKiBYbWxIdHRwUmVxdWVzdCdzIGdldEFsbFJlc3BvbnNlSGVhZGVycygpIG1ldGhvZCByZXR1cm5zIGEgc3RyaW5nIG9mIHJlc3BvbnNlXG4gKiBoZWFkZXJzIGFjY29yZGluZyB0byB0aGUgZm9ybWF0IGRlc2NyaWJlZCBoZXJlOlxuICogaHR0cDovL3d3dy53My5vcmcvVFIvWE1MSHR0cFJlcXVlc3QvI3RoZS1nZXRhbGxyZXNwb25zZWhlYWRlcnMtbWV0aG9kXG4gKiBUaGlzIG1ldGhvZCBwYXJzZXMgdGhhdCBzdHJpbmcgaW50byBhIHVzZXItZnJpZW5kbHkga2V5L3ZhbHVlIHBhaXIgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBwYXJzZVJlc3BvbnNlSGVhZGVycyhoZWFkZXJTdHIpIHtcbiAgIHZhciBoZWFkZXJzID0ge307XG4gICBcbiAgIGhlYWRlclN0ciAmJiBoZWFkZXJTdHIuc3BsaXQoJ1xcdTAwMGRcXHUwMDBhJylcbiAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKGhlYWRlclBhaXIpe1xuICAgXG4gICAgICAgICAvLyBDYW4ndCB1c2Ugc3BsaXQoKSBoZXJlIGJlY2F1c2UgaXQgZG9lcyB0aGUgd3JvbmcgdGhpbmdcbiAgICAgICAgIC8vIGlmIHRoZSBoZWFkZXIgdmFsdWUgaGFzIHRoZSBzdHJpbmcgXCI6IFwiIGluIGl0LlxuICAgICAgICAgdmFyIGluZGV4ID0gaGVhZGVyUGFpci5pbmRleE9mKCdcXHUwMDNhXFx1MDAyMCcpO1xuICAgICAgICAgXG4gICAgICAgICBoZWFkZXJzW2hlYWRlclBhaXIuc3Vic3RyaW5nKDAsIGluZGV4KV0gXG4gICAgICAgICAgICAgICAgICAgICA9IGhlYWRlclBhaXIuc3Vic3RyaW5nKGluZGV4ICsgMik7XG4gICAgICB9KTtcbiAgIFxuICAgcmV0dXJuIGhlYWRlcnM7XG59XG5cbi8qKlxuICogRGV0ZWN0IGlmIGEgZ2l2ZW4gVVJMIGlzIGNyb3NzLW9yaWdpbiBpbiB0aGUgc2NvcGUgb2YgdGhlXG4gKiBjdXJyZW50IHBhZ2UuXG4gKiBcbiAqIEJyb3dzZXIgb25seSAoc2luY2UgY3Jvc3Mtb3JpZ2luIGhhcyBubyBtZWFuaW5nIGluIE5vZGUuanMpXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhZ2VMb2NhdGlvbiAtIGFzIGluIHdpbmRvdy5sb2NhdGlvblxuICogQHBhcmFtIHtPYmplY3R9IGFqYXhIb3N0IC0gYW4gb2JqZWN0IGxpa2Ugd2luZG93LmxvY2F0aW9uIGRlc2NyaWJpbmcgdGhlIFxuICogICAgb3JpZ2luIG9mIHRoZSB1cmwgdGhhdCB3ZSB3YW50IHRvIGFqYXggaW5cbiAqL1xuZnVuY3Rpb24gaXNDcm9zc09yaWdpbihwYWdlTG9jYXRpb24sIGFqYXhIb3N0KSB7XG5cbiAgIC8qXG4gICAgKiBOQjogZGVmYXVsdFBvcnQgb25seSBrbm93cyBodHRwIGFuZCBodHRwcy5cbiAgICAqIFJldHVybnMgdW5kZWZpbmVkIG90aGVyd2lzZS5cbiAgICAqL1xuICAgZnVuY3Rpb24gZGVmYXVsdFBvcnQocHJvdG9jb2wpIHtcbiAgICAgIHJldHVybiB7J2h0dHA6Jzo4MCwgJ2h0dHBzOic6NDQzfVtwcm90b2NvbF07XG4gICB9XG4gICBcbiAgIGZ1bmN0aW9uIHBvcnRPZihsb2NhdGlvbikge1xuICAgICAgLy8gcGFnZUxvY2F0aW9uIHNob3VsZCBhbHdheXMgaGF2ZSBhIHByb3RvY29sLiBhamF4SG9zdCBpZiBubyBwb3J0IG9yXG4gICAgICAvLyBwcm90b2NvbCBpcyBzcGVjaWZpZWQsIHNob3VsZCB1c2UgdGhlIHBvcnQgb2YgdGhlIGNvbnRhaW5pbmcgcGFnZVxuICAgICAgXG4gICAgICByZXR1cm4gbG9jYXRpb24ucG9ydCB8fCBkZWZhdWx0UG9ydChsb2NhdGlvbi5wcm90b2NvbHx8cGFnZUxvY2F0aW9uLnByb3RvY29sKTtcbiAgIH1cblxuICAgLy8gaWYgYWpheEhvc3QgZG9lc24ndCBnaXZlIGEgZG9tYWluLCBwb3J0IGlzIHRoZSBzYW1lIGFzIHBhZ2VMb2NhdGlvblxuICAgLy8gaXQgY2FuJ3QgZ2l2ZSBhIHByb3RvY29sIGJ1dCBub3QgYSBkb21haW5cbiAgIC8vIGl0IGNhbid0IGdpdmUgYSBwb3J0IGJ1dCBub3QgYSBkb21haW5cbiAgIFxuICAgcmV0dXJuICEhKCAgKGFqYXhIb3N0LnByb3RvY29sICAmJiAoYWpheEhvc3QucHJvdG9jb2wgICE9IHBhZ2VMb2NhdGlvbi5wcm90b2NvbCkpIHx8XG4gICAgICAgICAgICAgICAoYWpheEhvc3QuaG9zdCAgICAgICYmIChhamF4SG9zdC5ob3N0ICAgICAgIT0gcGFnZUxvY2F0aW9uLmhvc3QpKSAgICAgfHxcbiAgICAgICAgICAgICAgIChhamF4SG9zdC5ob3N0ICAgICAgJiYgKHBvcnRPZihhamF4SG9zdCkgIT0gcG9ydE9mKHBhZ2VMb2NhdGlvbikpKVxuICAgICAgICAgICk7XG59XG5cbi8qIHR1cm4gYW55IHVybCBpbnRvIGFuIG9iamVjdCBsaWtlIHdpbmRvdy5sb2NhdGlvbiAqL1xuZnVuY3Rpb24gcGFyc2VVcmxPcmlnaW4odXJsKSB7XG4gICAvLyB1cmwgY291bGQgYmUgZG9tYWluLXJlbGF0aXZlXG4gICAvLyB1cmwgY291bGQgZ2l2ZSBhIGRvbWFpblxuXG4gICAvLyBjcm9zcyBvcmlnaW4gbWVhbnM6XG4gICAvLyAgICBzYW1lIGRvbWFpblxuICAgLy8gICAgc2FtZSBwb3J0XG4gICAvLyAgICBzb21lIHByb3RvY29sXG4gICAvLyBzbywgc2FtZSBldmVyeXRoaW5nIHVwIHRvIHRoZSBmaXJzdCAoc2luZ2xlKSBzbGFzaCBcbiAgIC8vIGlmIHN1Y2ggaXMgZ2l2ZW5cbiAgIC8vXG4gICAvLyBjYW4gaWdub3JlIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhhdCAgIFxuICAgXG4gICB2YXIgVVJMX0hPU1RfUEFUVEVSTiA9IC8oXFx3KzopPyg/OlxcL1xcLykoW1xcdy4tXSspPyg/OjooXFxkKykpP1xcLz8vLFxuXG4gICAgICAgICAvLyBpZiBubyBtYXRjaCwgdXNlIGFuIGVtcHR5IGFycmF5IHNvIHRoYXRcbiAgICAgICAgIC8vIHN1YmV4cHJlc3Npb25zIDEsMiwzIGFyZSBhbGwgdW5kZWZpbmVkXG4gICAgICAgICAvLyBhbmQgd2lsbCB1bHRpbWF0ZWx5IHJldHVybiBhbGwgZW1wdHlcbiAgICAgICAgIC8vIHN0cmluZ3MgYXMgdGhlIHBhcnNlIHJlc3VsdDpcbiAgICAgICB1cmxIb3N0TWF0Y2ggPSBVUkxfSE9TVF9QQVRURVJOLmV4ZWModXJsKSB8fCBbXTtcbiAgIFxuICAgcmV0dXJuIHtcbiAgICAgIHByb3RvY29sOiAgIHVybEhvc3RNYXRjaFsxXSB8fCAnJyxcbiAgICAgIGhvc3Q6ICAgICAgIHVybEhvc3RNYXRjaFsyXSB8fCAnJyxcbiAgICAgIHBvcnQ6ICAgICAgIHVybEhvc3RNYXRjaFszXSB8fCAnJ1xuICAgfTtcbn1cblxuZnVuY3Rpb24gaHR0cFRyYW5zcG9ydCgpe1xuICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xufVxuXG4vKipcbiAqIEEgd3JhcHBlciBhcm91bmQgdGhlIGJyb3dzZXIgWG1sSHR0cFJlcXVlc3Qgb2JqZWN0IHRoYXQgcmFpc2VzIGFuIFxuICogZXZlbnQgd2hlbmV2ZXIgYSBuZXcgcGFydCBvZiB0aGUgcmVzcG9uc2UgaXMgYXZhaWxhYmxlLlxuICogXG4gKiBJbiBvbGRlciBicm93c2VycyBwcm9ncmVzc2l2ZSByZWFkaW5nIGlzIGltcG9zc2libGUgc28gYWxsIHRoZSBcbiAqIGNvbnRlbnQgaXMgZ2l2ZW4gaW4gYSBzaW5nbGUgY2FsbC4gRm9yIG5ld2VyIG9uZXMgc2V2ZXJhbCBldmVudHNcbiAqIHNob3VsZCBiZSByYWlzZWQsIGFsbG93aW5nIHByb2dyZXNzaXZlIGludGVycHJldGF0aW9uIG9mIHRoZSByZXNwb25zZS5cbiAqICAgICAgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvYm9lQnVzIGFuIGV2ZW50IGJ1cyBsb2NhbCB0byB0aGlzIE9ib2UgaW5zdGFuY2VcbiAqIEBwYXJhbSB7WE1MSHR0cFJlcXVlc3R9IHhociB0aGUgeGhyIHRvIHVzZSBhcyB0aGUgdHJhbnNwb3J0LiBVbmRlciBub3JtYWxcbiAqICAgICAgICAgIG9wZXJhdGlvbiwgd2lsbCBoYXZlIGJlZW4gY3JlYXRlZCB1c2luZyBodHRwVHJhbnNwb3J0KCkgYWJvdmVcbiAqICAgICAgICAgIGJ1dCBmb3IgdGVzdHMgYSBzdHViIGNhbiBiZSBwcm92aWRlZCBpbnN0ZWFkLlxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZCBvbmUgb2YgJ0dFVCcgJ1BPU1QnICdQVVQnICdQQVRDSCcgJ0RFTEVURSdcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgdGhlIHVybCB0byBtYWtlIGEgcmVxdWVzdCB0b1xuICogQHBhcmFtIHtTdHJpbmd8TnVsbH0gZGF0YSBzb21lIGNvbnRlbnQgdG8gYmUgc2VudCB3aXRoIHRoZSByZXF1ZXN0LlxuICogICAgICAgICAgICAgICAgICAgICAgT25seSB2YWxpZCBpZiBtZXRob2QgaXMgUE9TVCBvciBQVVQuXG4gKiBAcGFyYW0ge09iamVjdH0gW2hlYWRlcnNdIHRoZSBodHRwIHJlcXVlc3QgaGVhZGVycyB0byBzZW5kXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHdpdGhDcmVkZW50aWFscyB0aGUgWEhSIHdpdGhDcmVkZW50aWFscyBwcm9wZXJ0eSB3aWxsIGJlXG4gKiAgICBzZXQgdG8gdGhpcyB2YWx1ZVxuICovICBcbmZ1bmN0aW9uIHN0cmVhbWluZ0h0dHAob2JvZUJ1cywgeGhyLCBtZXRob2QsIHVybCwgZGF0YSwgaGVhZGVycywgd2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICAgICAgIFxuICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICBcbiAgIHZhciBlbWl0U3RyZWFtRGF0YSA9IG9ib2VCdXMoU1RSRUFNX0RBVEEpLmVtaXQsXG4gICAgICAgZW1pdEZhaWwgICAgICAgPSBvYm9lQnVzKEZBSUxfRVZFTlQpLmVtaXQsXG4gICAgICAgbnVtYmVyT2ZDaGFyc0FscmVhZHlHaXZlblRvQ2FsbGJhY2sgPSAwLFxuICAgICAgIHN0aWxsVG9TZW5kU3RhcnRFdmVudCA9IHRydWU7XG5cbiAgIC8vIFdoZW4gYW4gQUJPUlRJTkcgbWVzc2FnZSBpcyBwdXQgb24gdGhlIGV2ZW50IGJ1cyBhYm9ydCBcbiAgIC8vIHRoZSBhamF4IHJlcXVlc3QgICAgICAgICBcbiAgIG9ib2VCdXMoIEFCT1JUSU5HICkub24oIGZ1bmN0aW9uKCl7XG4gIFxuICAgICAgLy8gaWYgd2Uga2VlcCB0aGUgb25yZWFkeXN0YXRlY2hhbmdlIHdoaWxlIGFib3J0aW5nIHRoZSBYSFIgZ2l2ZXMgXG4gICAgICAvLyBhIGNhbGxiYWNrIGxpa2UgYSBzdWNjZXNzZnVsIGNhbGwgc28gZmlyc3QgcmVtb3ZlIHRoaXMgbGlzdGVuZXJcbiAgICAgIC8vIGJ5IGFzc2lnbmluZyBudWxsOlxuICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG4gICAgICAgICAgICBcbiAgICAgIHhoci5hYm9ydCgpO1xuICAgfSk7XG5cbiAgIC8qKiBcbiAgICAqIEhhbmRsZSBpbnB1dCBmcm9tIHRoZSB1bmRlcmx5aW5nIHhocjogZWl0aGVyIGEgc3RhdGUgY2hhbmdlLFxuICAgICogdGhlIHByb2dyZXNzIGV2ZW50IG9yIHRoZSByZXF1ZXN0IGJlaW5nIGNvbXBsZXRlLlxuICAgICovXG4gICBmdW5jdGlvbiBoYW5kbGVQcm9ncmVzcygpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgdmFyIHRleHRTb0ZhciA9IHhoci5yZXNwb25zZVRleHQsXG4gICAgICAgICAgbmV3VGV4dCA9IHRleHRTb0Zhci5zdWJzdHIobnVtYmVyT2ZDaGFyc0FscmVhZHlHaXZlblRvQ2FsbGJhY2spO1xuICAgICAgXG4gICAgICBcbiAgICAgIC8qIFJhaXNlIHRoZSBldmVudCBmb3IgbmV3IHRleHQuXG4gICAgICBcbiAgICAgICAgIE9uIG9sZGVyIGJyb3dzZXJzLCB0aGUgbmV3IHRleHQgaXMgdGhlIHdob2xlIHJlc3BvbnNlLiBcbiAgICAgICAgIE9uIG5ld2VyL2JldHRlciBvbmVzLCB0aGUgZnJhZ21lbnQgcGFydCB0aGF0IHdlIGdvdCBzaW5jZSBcbiAgICAgICAgIGxhc3QgcHJvZ3Jlc3MuICovXG4gICAgICAgICBcbiAgICAgIGlmKCBuZXdUZXh0ICkge1xuICAgICAgICAgZW1pdFN0cmVhbURhdGEoIG5ld1RleHQgKTtcbiAgICAgIH0gXG5cbiAgICAgIG51bWJlck9mQ2hhcnNBbHJlYWR5R2l2ZW5Ub0NhbGxiYWNrID0gbGVuKHRleHRTb0Zhcik7XG4gICB9XG4gICBcbiAgIFxuICAgaWYoJ29ucHJvZ3Jlc3MnIGluIHhocil7ICAvLyBkZXRlY3QgYnJvd3NlciBzdXBwb3J0IGZvciBwcm9ncmVzc2l2ZSBkZWxpdmVyeVxuICAgICAgeGhyLm9ucHJvZ3Jlc3MgPSBoYW5kbGVQcm9ncmVzcztcbiAgIH1cbiAgICAgIFxuICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICBmdW5jdGlvbiBzZW5kU3RhcnRJZk5vdEFscmVhZHkoKSB7XG4gICAgICAgICAvLyBJbnRlcm5ldCBFeHBsb3JlciBpcyB2ZXJ5IHVucmVsaWFibGUgYXMgdG8gd2hlbiB4aHIuc3RhdHVzIGV0YyBjYW5cbiAgICAgICAgIC8vIGJlIHJlYWQgc28gaGFzIHRvIGJlIHByb3RlY3RlZCB3aXRoIHRyeS9jYXRjaCBhbmQgdHJpZWQgYWdhaW4gb24gXG4gICAgICAgICAvLyB0aGUgbmV4dCByZWFkeVN0YXRlIGlmIGl0IGZhaWxzXG4gICAgICAgICB0cnl7XG4gICAgICAgICAgICBzdGlsbFRvU2VuZFN0YXJ0RXZlbnQgJiYgb2JvZUJ1cyggSFRUUF9TVEFSVCApLmVtaXQoXG4gICAgICAgICAgICAgICB4aHIuc3RhdHVzLFxuICAgICAgICAgICAgICAgcGFyc2VSZXNwb25zZUhlYWRlcnMoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSApO1xuICAgICAgICAgICAgc3RpbGxUb1NlbmRTdGFydEV2ZW50ID0gZmFsc2U7XG4gICAgICAgICB9IGNhdGNoKGUpey8qIGRvIG5vdGhpbmcsIHdpbGwgdHJ5IGFnYWluIG9uIG5leHQgcmVhZHlTdGF0ZSovfVxuICAgICAgfVxuICAgICAgXG4gICAgICBzd2l0Y2goIHhoci5yZWFkeVN0YXRlICkge1xuICAgICAgICAgICAgICAgXG4gICAgICAgICBjYXNlIDI6IC8vIEhFQURFUlNfUkVDRUlWRURcbiAgICAgICAgIGNhc2UgMzogLy8gTE9BRElOR1xuICAgICAgICAgICAgcmV0dXJuIHNlbmRTdGFydElmTm90QWxyZWFkeSgpO1xuICAgICAgICAgICAgXG4gICAgICAgICBjYXNlIDQ6IC8vIERPTkVcbiAgICAgICAgICAgIHNlbmRTdGFydElmTm90QWxyZWFkeSgpOyAvLyBpZiB4aHIuc3RhdHVzIGhhc24ndCBiZWVuIGF2YWlsYWJsZSB5ZXQsIGl0IG11c3QgYmUgTk9XLCBodWggSUU/XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGlzIHRoaXMgYSAyeHggaHR0cCBjb2RlP1xuICAgICAgICAgICAgdmFyIHN1Y2Nlc3NmdWwgPSBTdHJpbmcoeGhyLnN0YXR1cylbMF0gPT0gMjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoIHN1Y2Nlc3NmdWwgKSB7XG4gICAgICAgICAgICAgICAvLyBJbiBDaHJvbWUgMjkgKG5vdCAyOCkgbm8gb25wcm9ncmVzcyBpcyBlbWl0dGVkIHdoZW4gYSByZXNwb25zZVxuICAgICAgICAgICAgICAgLy8gaXMgY29tcGxldGUgYmVmb3JlIHRoZSBvbmxvYWQuIFdlIG5lZWQgdG8gYWx3YXlzIGRvIGhhbmRsZUlucHV0XG4gICAgICAgICAgICAgICAvLyBpbiBjYXNlIHdlIGdldCB0aGUgbG9hZCBidXQgaGF2ZSBub3QgaGFkIGEgZmluYWwgcHJvZ3Jlc3MgZXZlbnQuXG4gICAgICAgICAgICAgICAvLyBUaGlzIGxvb2tzIGxpa2UgYSBidWcgYW5kIG1heSBjaGFuZ2UgaW4gZnV0dXJlIGJ1dCBsZXQncyB0YWtlXG4gICAgICAgICAgICAgICAvLyB0aGUgc2FmZXN0IGFwcHJvYWNoIGFuZCBhc3N1bWUgd2UgbWlnaHQgbm90IGhhdmUgcmVjZWl2ZWQgYSBcbiAgICAgICAgICAgICAgIC8vIHByb2dyZXNzIGV2ZW50IGZvciBlYWNoIHBhcnQgb2YgdGhlIHJlc3BvbnNlXG4gICAgICAgICAgICAgICBoYW5kbGVQcm9ncmVzcygpO1xuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICBvYm9lQnVzKFNUUkVBTV9FTkQpLmVtaXQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgIGVtaXRGYWlsKCBlcnJvclJlcG9ydChcbiAgICAgICAgICAgICAgICAgIHhoci5zdGF0dXMsIFxuICAgICAgICAgICAgICAgICAgeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICB9XG4gICAgICB9XG4gICB9O1xuICAgXG4gICB0cnl7XG4gICBcbiAgICAgIHhoci5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKTtcbiAgIFxuICAgICAgZm9yKCB2YXIgaGVhZGVyTmFtZSBpbiBoZWFkZXJzICl7XG4gICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXJOYW1lLCBoZWFkZXJzW2hlYWRlck5hbWVdKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYoICFpc0Nyb3NzT3JpZ2luKHdpbmRvdy5sb2NhdGlvbiwgcGFyc2VVcmxPcmlnaW4odXJsKSkgKSB7XG4gICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1SZXF1ZXN0ZWQtV2l0aCcsICdYTUxIdHRwUmVxdWVzdCcpO1xuICAgICAgfVxuXG4gICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gd2l0aENyZWRlbnRpYWxzO1xuICAgICAgXG4gICAgICB4aHIuc2VuZChkYXRhKTtcbiAgICAgIFxuICAgfSBjYXRjaCggZSApIHtcbiAgICAgIFxuICAgICAgLy8gVG8ga2VlcCBhIGNvbnNpc3RlbnQgaW50ZXJmYWNlIHdpdGggTm9kZSwgd2UgY2FuJ3QgZW1pdCBhbiBldmVudCBoZXJlLlxuICAgICAgLy8gTm9kZSdzIHN0cmVhbWluZyBodHRwIGFkYXB0b3IgcmVjZWl2ZXMgdGhlIGVycm9yIGFzIGFuIGFzeW5jaHJvbm91c1xuICAgICAgLy8gZXZlbnQgcmF0aGVyIHRoYW4gYXMgYW4gZXhjZXB0aW9uLiBJZiB3ZSBlbWl0dGVkIG5vdywgdGhlIE9ib2UgdXNlclxuICAgICAgLy8gaGFzIGhhZCBubyBjaGFuY2UgdG8gYWRkIGEgLmZhaWwgbGlzdGVuZXIgc28gdGhlcmUgaXMgbm8gd2F5XG4gICAgICAvLyB0aGUgZXZlbnQgY291bGQgYmUgdXNlZnVsLiBGb3IgYm90aCB0aGVzZSByZWFzb25zIGRlZmVyIHRoZVxuICAgICAgLy8gZmlyaW5nIHRvIHRoZSBuZXh0IEpTIGZyYW1lLiAgXG4gICAgICB3aW5kb3cuc2V0VGltZW91dChcbiAgICAgICAgIHBhcnRpYWxDb21wbGV0ZShlbWl0RmFpbCwgZXJyb3JSZXBvcnQodW5kZWZpbmVkLCB1bmRlZmluZWQsIGUpKVxuICAgICAgLCAgMFxuICAgICAgKTtcbiAgIH0gICAgICAgICAgICBcbn1cblxudmFyIGpzb25QYXRoU3ludGF4ID0gKGZ1bmN0aW9uKCkge1xuIFxuICAgdmFyXG4gICBcbiAgIC8qKiBcbiAgICAqIEV4cG9ydCBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBhcyBhIHNpbXBsZSBmdW5jdGlvbiBieSBleHBvc2luZyBqdXN0IFxuICAgICogdGhlIFJlZ2V4I2V4ZWMuIFRoaXMgYWxsb3dzIHJlZ2V4IHRlc3RzIHRvIGJlIHVzZWQgdW5kZXIgdGhlIHNhbWUgXG4gICAgKiBpbnRlcmZhY2UgYXMgZGlmZmVyZW50bHkgaW1wbGVtZW50ZWQgdGVzdHMsIG9yIGZvciBhIHVzZXIgb2YgdGhlXG4gICAgKiB0ZXN0cyB0byBub3QgY29uY2VybiB0aGVtc2VsdmVzIHdpdGggdGhlaXIgaW1wbGVtZW50YXRpb24gYXMgcmVndWxhclxuICAgICogZXhwcmVzc2lvbnMuXG4gICAgKiBcbiAgICAqIFRoaXMgY291bGQgYWxzbyBiZSBleHByZXNzZWQgcG9pbnQtZnJlZSBhczpcbiAgICAqICAgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuYmluZChSZWdFeHAucHJvdG90eXBlLmV4ZWMpLFxuICAgICogICBcbiAgICAqIEJ1dCB0aGF0J3MgZmFyIHRvbyBjb25mdXNpbmchIChhbmQgbm90IGV2ZW4gc21hbGxlciBvbmNlIG1pbmlmaWVkIFxuICAgICogYW5kIGd6aXBwZWQpXG4gICAgKi9cbiAgICAgICByZWdleERlc2NyaXB0b3IgPSBmdW5jdGlvbiByZWdleERlc2NyaXB0b3IocmVnZXgpIHtcbiAgICAgICAgICAgIHJldHVybiByZWdleC5leGVjLmJpbmQocmVnZXgpO1xuICAgICAgIH1cbiAgICAgICBcbiAgIC8qKlxuICAgICogSm9pbiBzZXZlcmFsIHJlZ3VsYXIgZXhwcmVzc2lvbnMgYW5kIGV4cHJlc3MgYXMgYSBmdW5jdGlvbi5cbiAgICAqIFRoaXMgYWxsb3dzIHRoZSB0b2tlbiBwYXR0ZXJucyB0byByZXVzZSBjb21wb25lbnQgcmVndWxhciBleHByZXNzaW9uc1xuICAgICogaW5zdGVhZCBvZiBiZWluZyBleHByZXNzZWQgaW4gZnVsbCB1c2luZyBodWdlIGFuZCBjb25mdXNpbmcgcmVndWxhclxuICAgICogZXhwcmVzc2lvbnMuXG4gICAgKi8gICAgICAgXG4gICAsICAganNvblBhdGhDbGF1c2UgPSB2YXJBcmdzKGZ1bmN0aW9uKCBjb21wb25lbnRSZWdleGVzICkge1xuXG4gICAgICAgICAgICAvLyBUaGUgcmVndWxhciBleHByZXNzaW9ucyBhbGwgc3RhcnQgd2l0aCBeIGJlY2F1c2Ugd2UgXG4gICAgICAgICAgICAvLyBvbmx5IHdhbnQgdG8gZmluZCBtYXRjaGVzIGF0IHRoZSBzdGFydCBvZiB0aGUgXG4gICAgICAgICAgICAvLyBKU09OUGF0aCBmcmFnbWVudCB3ZSBhcmUgaW5zcGVjdGluZyAgICAgICAgICAgXG4gICAgICAgICAgICBjb21wb25lbnRSZWdleGVzLnVuc2hpZnQoL14vKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuICAgcmVnZXhEZXNjcmlwdG9yKFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVnRXhwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50UmVnZXhlcy5tYXAoYXR0cignc291cmNlJykpLmpvaW4oJycpXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgIH0pXG4gICAgICAgXG4gICAsICAgcG9zc2libHlDYXB0dXJpbmcgPSAgICAgICAgICAgLyhcXCQ/KS9cbiAgICwgICBuYW1lZE5vZGUgPSAgICAgICAgICAgICAgICAgICAvKFtcXHctX10rfFxcKikvXG4gICAsICAgbmFtZVBsYWNlaG9sZGVyID0gICAgICAgICAgICAgLygpL1xuICAgLCAgIG5vZGVJbkFycmF5Tm90YXRpb24gPSAgICAgICAgIC9cXFtcIihbXlwiXSspXCJcXF0vXG4gICAsICAgbnVtYmVyZWROb2RlSW5BcnJheU5vdGF0aW9uID0gL1xcWyhcXGQrfFxcKilcXF0vXG4gICAsICAgZmllbGRMaXN0ID0gICAgICAgICAgICAgICAgICAgICAgL3soW1xcdyBdKj8pfS9cbiAgICwgICBvcHRpb25hbEZpZWxkTGlzdCA9ICAgICAgICAgICAvKD86eyhbXFx3IF0qPyl9KT8vXG4gICAgXG5cbiAgICAgICAvLyAgIGZvbyBvciAqICAgICAgICAgICAgICAgICAgXG4gICAsICAganNvblBhdGhOYW1lZE5vZGVJbk9iamVjdE5vdGF0aW9uICAgPSBqc29uUGF0aENsYXVzZSggXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NzaWJseUNhcHR1cmluZywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lZE5vZGUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWxGaWVsZExpc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgIC8vICAgW1wiZm9vXCJdICAgXG4gICAsICAganNvblBhdGhOYW1lZE5vZGVJbkFycmF5Tm90YXRpb24gICAgPSBqc29uUGF0aENsYXVzZSggXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NzaWJseUNhcHR1cmluZywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlSW5BcnJheU5vdGF0aW9uLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbmFsRmllbGRMaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApICBcblxuICAgICAgIC8vICAgWzJdIG9yIFsqXSAgICAgICBcbiAgICwgICBqc29uUGF0aE51bWJlcmVkTm9kZUluQXJyYXlOb3RhdGlvbiA9IGpzb25QYXRoQ2xhdXNlKCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3NpYmx5Q2FwdHVyaW5nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bWJlcmVkTm9kZUluQXJyYXlOb3RhdGlvbiwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25hbEZpZWxkTGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuXG4gICAgICAgLy8gICB7YSBiIGN9ICAgICAgXG4gICAsICAganNvblBhdGhQdXJlRHVja1R5cGluZyAgICAgICAgICAgICAgPSBqc29uUGF0aENsYXVzZSggXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NzaWJseUNhcHR1cmluZywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lUGxhY2Vob2xkZXIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRMaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICBcbiAgICAgICAvLyAgIC4uXG4gICAsICAganNvblBhdGhEb3VibGVEb3QgICAgICAgICAgICAgICAgICAgPSBqc29uUGF0aENsYXVzZSgvXFwuXFwuLykgICAgICAgICAgICAgICAgICBcbiAgIFxuICAgICAgIC8vICAgLlxuICAgLCAgIGpzb25QYXRoRG90ICAgICAgICAgICAgICAgICAgICAgICAgID0ganNvblBhdGhDbGF1c2UoL1xcLi8pICAgICAgICAgICAgICAgICAgICBcbiAgIFxuICAgICAgIC8vICAgIVxuICAgLCAgIGpzb25QYXRoQmFuZyAgICAgICAgICAgICAgICAgICAgICAgID0ganNvblBhdGhDbGF1c2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NzaWJseUNhcHR1cmluZywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvIS9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgIFxuICAgXG4gICAgICAgLy8gICBuYWRhIVxuICAgLCAgIGVtcHR5U3RyaW5nICAgICAgICAgICAgICAgICAgICAgICAgID0ganNvblBhdGhDbGF1c2UoLyQvKSAgICAgICAgICAgICAgICAgICAgIFxuICAgXG4gICA7XG4gICBcbiAgXG4gICAvKiBXZSBleHBvcnQgb25seSBhIHNpbmdsZSBmdW5jdGlvbi4gV2hlbiBjYWxsZWQsIHRoaXMgZnVuY3Rpb24gaW5qZWN0cyBcbiAgICAgIGludG8gYW5vdGhlciBmdW5jdGlvbiB0aGUgZGVzY3JpcHRvcnMgZnJvbSBhYm92ZS4gICAgICAgICAgICAgXG4gICAgKi9cbiAgIHJldHVybiBmdW5jdGlvbiAoZm4peyAgICAgIFxuICAgICAgcmV0dXJuIGZuKCAgICAgIFxuICAgICAgICAgbGF6eVVuaW9uKFxuICAgICAgICAgICAganNvblBhdGhOYW1lZE5vZGVJbk9iamVjdE5vdGF0aW9uXG4gICAgICAgICAsICBqc29uUGF0aE5hbWVkTm9kZUluQXJyYXlOb3RhdGlvblxuICAgICAgICAgLCAganNvblBhdGhOdW1iZXJlZE5vZGVJbkFycmF5Tm90YXRpb25cbiAgICAgICAgICwgIGpzb25QYXRoUHVyZUR1Y2tUeXBpbmcgXG4gICAgICAgICApXG4gICAgICAsICBqc29uUGF0aERvdWJsZURvdFxuICAgICAgLCAganNvblBhdGhEb3RcbiAgICAgICwgIGpzb25QYXRoQmFuZ1xuICAgICAgLCAgZW1wdHlTdHJpbmcgXG4gICAgICApO1xuICAgfTsgXG5cbn0oKSk7XG4vKipcbiAqIEdldCBhIG5ldyBrZXktPm5vZGUgbWFwcGluZ1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IGtleVxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl8U3RyaW5nfE51bWJlcnxudWxsfSBub2RlIGEgdmFsdWUgZm91bmQgaW4gdGhlIGpzb25cbiAqL1xuZnVuY3Rpb24gbmFtZWROb2RlKGtleSwgbm9kZSkge1xuICAgcmV0dXJuIHtrZXk6a2V5LCBub2RlOm5vZGV9O1xufVxuXG4vKiogZ2V0IHRoZSBrZXkgb2YgYSBuYW1lZE5vZGUgKi9cbnZhciBrZXlPZiA9IGF0dHIoJ2tleScpO1xuXG4vKiogZ2V0IHRoZSBub2RlIGZyb20gYSBuYW1lZE5vZGUgKi9cbnZhciBub2RlT2YgPSBhdHRyKCdub2RlJyk7XG4vKiogXG4gKiBUaGlzIGZpbGUgcHJvdmlkZXMgdmFyaW91cyBsaXN0ZW5lcnMgd2hpY2ggY2FuIGJlIHVzZWQgdG8gYnVpbGQgdXBcbiAqIGEgY2hhbmdpbmcgYXNjZW50IGJhc2VkIG9uIHRoZSBjYWxsYmFja3MgcHJvdmlkZWQgYnkgQ2xhcmluZXQuIEl0IGxpc3RlbnNcbiAqIHRvIHRoZSBsb3ctbGV2ZWwgZXZlbnRzIGZyb20gQ2xhcmluZXQgYW5kIGVtaXRzIGhpZ2hlci1sZXZlbCBvbmVzLlxuICogIFxuICogVGhlIGJ1aWxkaW5nIHVwIGlzIHN0YXRlbGVzcyBzbyB0byB0cmFjayBhIEpTT04gZmlsZVxuICogYXNjZW50TWFuYWdlci5qcyBpcyByZXF1aXJlZCB0byBzdG9yZSB0aGUgYXNjZW50IHN0YXRlXG4gKiBiZXR3ZWVuIGNhbGxzLlxuICovXG5cblxuXG4vKiogXG4gKiBBIHNwZWNpYWwgdmFsdWUgdG8gdXNlIGluIHRoZSBwYXRoIGxpc3QgdG8gcmVwcmVzZW50IHRoZSBwYXRoICd0bycgYSByb290IFxuICogb2JqZWN0ICh3aGljaCBkb2Vzbid0IHJlYWxseSBoYXZlIGFueSBwYXRoKS4gVGhpcyBwcmV2ZW50cyB0aGUgbmVlZCBmb3IgXG4gKiBzcGVjaWFsLWNhc2luZyBkZXRlY3Rpb24gb2YgdGhlIHJvb3Qgb2JqZWN0IGFuZCBhbGxvd3MgaXQgdG8gYmUgdHJlYXRlZCBcbiAqIGxpa2UgYW55IG90aGVyIG9iamVjdC4gV2UgbWlnaHQgdGhpbmsgb2YgdGhpcyBhcyBiZWluZyBzaW1pbGFyIHRvIHRoZSBcbiAqICd1bm5hbWVkIHJvb3QnIGRvbWFpbiBcIi5cIiwgZWcgaWYgSSBnbyB0byBcbiAqIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnLi93aWtpL0VuL01haW5fcGFnZSB0aGUgZG90IGFmdGVyICdvcmcnIGRlbGltaW5hdGVzIFxuICogdGhlIHVubmFtZWQgcm9vdCBvZiB0aGUgRE5TLlxuICogXG4gKiBUaGlzIGlzIGtlcHQgYXMgYW4gb2JqZWN0IHRvIHRha2UgYWR2YW50YWdlIHRoYXQgaW4gSmF2YXNjcmlwdCdzIE9PIG9iamVjdHMgXG4gKiBhcmUgZ3VhcmFudGVlZCB0byBiZSBkaXN0aW5jdCwgdGhlcmVmb3JlIG5vIG90aGVyIG9iamVjdCBjYW4gcG9zc2libHkgY2xhc2ggXG4gKiB3aXRoIHRoaXMgb25lLiBTdHJpbmdzLCBudW1iZXJzIGV0YyBwcm92aWRlIG5vIHN1Y2ggZ3VhcmFudGVlLiBcbiAqKi9cbnZhciBST09UX1BBVEggPSB7fTtcblxuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBzZXQgb2YgaGFuZGxlcnMgZm9yIGNsYXJpbmV0J3MgZXZlbnRzLCBib3VuZCB0byB0aGUgZW1pdCBcbiAqIGZ1bmN0aW9uIGdpdmVuLiAgXG4gKi8gXG5mdW5jdGlvbiBpbmNyZW1lbnRhbENvbnRlbnRCdWlsZGVyKCBvYm9lQnVzICkge1xuXG4gICB2YXIgZW1pdE5vZGVPcGVuZWQgPSBvYm9lQnVzKE5PREVfT1BFTkVEKS5lbWl0LFxuICAgICAgIGVtaXROb2RlQ2xvc2VkID0gb2JvZUJ1cyhOT0RFX0NMT1NFRCkuZW1pdCxcbiAgICAgICBlbWl0Um9vdE9wZW5lZCA9IG9ib2VCdXMoUk9PVF9QQVRIX0ZPVU5EKS5lbWl0LFxuICAgICAgIGVtaXRSb290Q2xvc2VkID0gb2JvZUJ1cyhST09UX05PREVfRk9VTkQpLmVtaXQ7XG5cbiAgIGZ1bmN0aW9uIGFycmF5SW5kaWNlc0FyZUtleXMoIHBvc3NpYmx5SW5jb25zaXN0ZW50QXNjZW50LCBuZXdEZWVwZXN0Tm9kZSkge1xuICAgXG4gICAgICAvKiBmb3IgdmFsdWVzIGluIGFycmF5cyB3ZSBhcmVuJ3QgcHJlLXdhcm5lZCBvZiB0aGUgY29taW5nIHBhdGhzIFxuICAgICAgICAgKENsYXJpbmV0IGdpdmVzIG5vIGNhbGwgdG8gb25rZXkgbGlrZSBpdCBkb2VzIGZvciB2YWx1ZXMgaW4gb2JqZWN0cykgXG4gICAgICAgICBzbyBpZiB3ZSBhcmUgaW4gYW4gYXJyYXkgd2UgbmVlZCB0byBjcmVhdGUgdGhpcyBwYXRoIG91cnNlbHZlcy4gVGhlIFxuICAgICAgICAga2V5IHdpbGwgYmUgbGVuKHBhcmVudE5vZGUpIGJlY2F1c2UgYXJyYXkga2V5cyBhcmUgYWx3YXlzIHNlcXVlbnRpYWwgXG4gICAgICAgICBudW1iZXJzLiAqL1xuXG4gICAgICB2YXIgcGFyZW50Tm9kZSA9IG5vZGVPZiggaGVhZCggcG9zc2libHlJbmNvbnNpc3RlbnRBc2NlbnQpKTtcbiAgICAgIFxuICAgICAgcmV0dXJuICAgICAgaXNPZlR5cGUoIEFycmF5LCBwYXJlbnROb2RlKVxuICAgICAgICAgICAgICAgP1xuICAgICAgICAgICAgICAgICAga2V5Rm91bmQoICBwb3NzaWJseUluY29uc2lzdGVudEFzY2VudCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW4ocGFyZW50Tm9kZSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3RGVlcGVzdE5vZGVcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgIDogIFxuICAgICAgICAgICAgICAgICAgLy8gbm90aGluZyBuZWVkZWQsIHJldHVybiB1bmNoYW5nZWRcbiAgICAgICAgICAgICAgICAgIHBvc3NpYmx5SW5jb25zaXN0ZW50QXNjZW50IFxuICAgICAgICAgICAgICAgO1xuICAgfVxuICAgICAgICAgICAgICAgICBcbiAgIGZ1bmN0aW9uIG5vZGVPcGVuZWQoIGFzY2VudCwgbmV3RGVlcGVzdE5vZGUgKSB7XG4gICAgICBcbiAgICAgIGlmKCAhYXNjZW50ICkge1xuICAgICAgICAgLy8gd2UgZGlzY292ZXJlZCB0aGUgcm9vdCBub2RlLCAgICAgICAgIFxuICAgICAgICAgZW1pdFJvb3RPcGVuZWQoIG5ld0RlZXBlc3ROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICByZXR1cm4ga2V5Rm91bmQoIGFzY2VudCwgUk9PVF9QQVRILCBuZXdEZWVwZXN0Tm9kZSk7ICAgICAgICAgXG4gICAgICB9XG5cbiAgICAgIC8vIHdlIGRpc2NvdmVyZWQgYSBub24tcm9vdCBub2RlXG4gICAgICAgICAgICAgICAgIFxuICAgICAgdmFyIGFycmF5Q29uc2lzdGVudEFzY2VudCAgPSBhcnJheUluZGljZXNBcmVLZXlzKCBhc2NlbnQsIG5ld0RlZXBlc3ROb2RlKSwgICAgICBcbiAgICAgICAgICBhbmNlc3RvckJyYW5jaGVzICAgICAgID0gdGFpbCggYXJyYXlDb25zaXN0ZW50QXNjZW50KSxcbiAgICAgICAgICBwcmV2aW91c2x5VW5tYXBwZWROYW1lID0ga2V5T2YoIGhlYWQoIGFycmF5Q29uc2lzdGVudEFzY2VudCkpO1xuICAgICAgICAgIFxuICAgICAgYXBwZW5kQnVpbHRDb250ZW50KCBcbiAgICAgICAgIGFuY2VzdG9yQnJhbmNoZXMsIFxuICAgICAgICAgcHJldmlvdXNseVVubWFwcGVkTmFtZSwgXG4gICAgICAgICBuZXdEZWVwZXN0Tm9kZSBcbiAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgIHJldHVybiBjb25zKCBcbiAgICAgICAgICAgICAgIG5hbWVkTm9kZSggcHJldmlvdXNseVVubWFwcGVkTmFtZSwgbmV3RGVlcGVzdE5vZGUgKSwgXG4gICAgICAgICAgICAgICBhbmNlc3RvckJyYW5jaGVzXG4gICAgICApOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICB9XG5cblxuICAgLyoqXG4gICAgKiBBZGQgYSBuZXcgdmFsdWUgdG8gdGhlIG9iamVjdCB3ZSBhcmUgYnVpbGRpbmcgdXAgdG8gcmVwcmVzZW50IHRoZVxuICAgICogcGFyc2VkIEpTT05cbiAgICAqL1xuICAgZnVuY3Rpb24gYXBwZW5kQnVpbHRDb250ZW50KCBhbmNlc3RvckJyYW5jaGVzLCBrZXksIG5vZGUgKXtcbiAgICAgXG4gICAgICBub2RlT2YoIGhlYWQoIGFuY2VzdG9yQnJhbmNoZXMpKVtrZXldID0gbm9kZTtcbiAgIH1cblxuICAgICBcbiAgIC8qKlxuICAgICogRm9yIHdoZW4gd2UgZmluZCBhIG5ldyBrZXkgaW4gdGhlIGpzb24uXG4gICAgKiBcbiAgICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcnxPYmplY3R9IG5ld0RlZXBlc3ROYW1lIHRoZSBrZXkuIElmIHdlIGFyZSBpbiBhbiBcbiAgICAqICAgIGFycmF5IHdpbGwgYmUgYSBudW1iZXIsIG90aGVyd2lzZSBhIHN0cmluZy4gTWF5IHRha2UgdGhlIHNwZWNpYWwgXG4gICAgKiAgICB2YWx1ZSBST09UX1BBVEggaWYgdGhlIHJvb3Qgbm9kZSBoYXMganVzdCBiZWVuIGZvdW5kXG4gICAgKiAgICBcbiAgICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcnxPYmplY3R8QXJyYXl8TnVsbHx1bmRlZmluZWR9IFttYXliZU5ld0RlZXBlc3ROb2RlXSBcbiAgICAqICAgIHVzdWFsbHkgdGhpcyB3b24ndCBiZSBrbm93biBzbyBjYW4gYmUgdW5kZWZpbmVkLiBDYW4ndCB1c2UgbnVsbCBcbiAgICAqICAgIHRvIHJlcHJlc2VudCB1bmtub3duIGJlY2F1c2UgbnVsbCBpcyBhIHZhbGlkIHZhbHVlIGluIEpTT05cbiAgICAqKi8gIFxuICAgZnVuY3Rpb24ga2V5Rm91bmQoYXNjZW50LCBuZXdEZWVwZXN0TmFtZSwgbWF5YmVOZXdEZWVwZXN0Tm9kZSkge1xuXG4gICAgICBpZiggYXNjZW50ICkgeyAvLyBpZiBub3Qgcm9vdFxuICAgICAgXG4gICAgICAgICAvLyBJZiB3ZSBoYXZlIHRoZSBrZXkgYnV0ICh1bmxlc3MgYWRkaW5nIHRvIGFuIGFycmF5KSBubyBrbm93biB2YWx1ZVxuICAgICAgICAgLy8geWV0LiBQdXQgdGhhdCBrZXkgaW4gdGhlIG91dHB1dCBidXQgYWdhaW5zdCBubyBkZWZpbmVkIHZhbHVlOiAgICAgIFxuICAgICAgICAgYXBwZW5kQnVpbHRDb250ZW50KCBhc2NlbnQsIG5ld0RlZXBlc3ROYW1lLCBtYXliZU5ld0RlZXBlc3ROb2RlICk7XG4gICAgICB9XG4gICBcbiAgICAgIHZhciBhc2NlbnRXaXRoTmV3UGF0aCA9IGNvbnMoIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZWROb2RlKCBuZXdEZWVwZXN0TmFtZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heWJlTmV3RGVlcGVzdE5vZGUpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzY2VudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgZW1pdE5vZGVPcGVuZWQoIGFzY2VudFdpdGhOZXdQYXRoKTtcbiBcbiAgICAgIHJldHVybiBhc2NlbnRXaXRoTmV3UGF0aDtcbiAgIH1cblxuXG4gICAvKipcbiAgICAqIEZvciB3aGVuIHRoZSBjdXJyZW50IG5vZGUgZW5kcy5cbiAgICAqL1xuICAgZnVuY3Rpb24gbm9kZUNsb3NlZCggYXNjZW50ICkge1xuXG4gICAgICBlbWl0Tm9kZUNsb3NlZCggYXNjZW50KTtcbiAgICAgICBcbiAgICAgIHJldHVybiB0YWlsKCBhc2NlbnQpIHx8XG4gICAgICAgICAgICAgLy8gSWYgdGhlcmUgYXJlIG5vIG5vZGVzIGxlZnQgaW4gdGhlIGFzY2VudCB0aGUgcm9vdCBub2RlXG4gICAgICAgICAgICAgLy8ganVzdCBjbG9zZWQuIEVtaXQgYSBzcGVjaWFsIGV2ZW50IGZvciB0aGlzOiBcbiAgICAgICAgICAgICBlbWl0Um9vdENsb3NlZChub2RlT2YoaGVhZChhc2NlbnQpKSk7XG4gICB9ICAgICAgXG5cbiAgIHZhciBjb250ZW50QnVpbGRlckhhbmRsZXJzID0ge307XG4gICBjb250ZW50QnVpbGRlckhhbmRsZXJzW1NBWF9WQUxVRV9PUEVOXSA9IG5vZGVPcGVuZWQ7XG4gICBjb250ZW50QnVpbGRlckhhbmRsZXJzW1NBWF9WQUxVRV9DTE9TRV0gPSBub2RlQ2xvc2VkO1xuICAgY29udGVudEJ1aWxkZXJIYW5kbGVyc1tTQVhfS0VZXSA9IGtleUZvdW5kO1xuICAgcmV0dXJuIGNvbnRlbnRCdWlsZGVySGFuZGxlcnM7XG59XG5cbi8qKlxuICogVGhlIGpzb25QYXRoIGV2YWx1YXRvciBjb21waWxlciB1c2VkIGZvciBPYm9lLmpzLiBcbiAqIFxuICogT25lIGZ1bmN0aW9uIGlzIGV4cG9zZWQuIFRoaXMgZnVuY3Rpb24gdGFrZXMgYSBTdHJpbmcgSlNPTlBhdGggc3BlYyBhbmQgXG4gKiByZXR1cm5zIGEgZnVuY3Rpb24gdG8gdGVzdCBjYW5kaWRhdGUgYXNjZW50cyBmb3IgbWF0Y2hlcy5cbiAqIFxuICogIFN0cmluZyBqc29uUGF0aCAtPiAoTGlzdCBhc2NlbnQpIC0+IEJvb2xlYW58T2JqZWN0XG4gKlxuICogVGhpcyBmaWxlIGlzIGNvZGVkIGluIGEgcHVyZSBmdW5jdGlvbmFsIHN0eWxlLiBUaGF0IGlzLCBubyBmdW5jdGlvbiBoYXMgXG4gKiBzaWRlIGVmZmVjdHMsIGV2ZXJ5IGZ1bmN0aW9uIGV2YWx1YXRlcyB0byB0aGUgc2FtZSB2YWx1ZSBmb3IgdGhlIHNhbWUgXG4gKiBhcmd1bWVudHMgYW5kIG5vIHZhcmlhYmxlcyBhcmUgcmVhc3NpZ25lZC5cbiAqLyAgXG4vLyB0aGUgY2FsbCB0byBqc29uUGF0aFN5bnRheCBpbmplY3RzIHRoZSB0b2tlbiBzeW50YXhlcyB0aGF0IGFyZSBuZWVkZWQgXG4vLyBpbnNpZGUgdGhlIGNvbXBpbGVyXG52YXIganNvblBhdGhDb21waWxlciA9IGpzb25QYXRoU3ludGF4KGZ1bmN0aW9uIChwYXRoTm9kZVN5bnRheCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3VibGVEb3RTeW50YXgsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG90U3ludGF4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFuZ1N5bnRheCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtcHR5U3ludGF4ICkge1xuXG4gICB2YXIgQ0FQVFVSSU5HX0lOREVYID0gMTtcbiAgIHZhciBOQU1FX0lOREVYID0gMjtcbiAgIHZhciBGSUVMRF9MSVNUX0lOREVYID0gMztcblxuICAgdmFyIGhlYWRLZXkgID0gY29tcG9zZTIoa2V5T2YsIGhlYWQpLFxuICAgICAgIGhlYWROb2RlID0gY29tcG9zZTIobm9kZU9mLCBoZWFkKTtcbiAgICAgICAgICAgICAgICAgICBcbiAgIC8qKlxuICAgICogQ3JlYXRlIGFuIGV2YWx1YXRvciBmdW5jdGlvbiBmb3IgYSBuYW1lZCBwYXRoIG5vZGUsIGV4cHJlc3NlZCBpbiB0aGVcbiAgICAqIEpTT05QYXRoIGxpa2U6XG4gICAgKiAgICBmb29cbiAgICAqICAgIFtcImJhclwiXVxuICAgICogICAgWzJdICAgXG4gICAgKi9cbiAgIGZ1bmN0aW9uIG5hbWVDbGF1c2UocHJldmlvdXNFeHByLCBkZXRlY3Rpb24gKSB7XG4gICAgIFxuICAgICAgdmFyIG5hbWUgPSBkZXRlY3Rpb25bTkFNRV9JTkRFWF0sXG4gICAgICAgICAgICBcbiAgICAgICAgICBtYXRjaGVzTmFtZSA9ICggIW5hbWUgfHwgbmFtZSA9PSAnKicgKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgID8gIGFsd2F5c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAgZnVuY3Rpb24oYXNjZW50KXtyZXR1cm4gaGVhZEtleShhc2NlbnQpID09IG5hbWV9O1xuICAgICBcblxuICAgICAgcmV0dXJuIGxhenlJbnRlcnNlY3Rpb24obWF0Y2hlc05hbWUsIHByZXZpb3VzRXhwcik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ3JlYXRlIGFuIGV2YWx1YXRvciBmdW5jdGlvbiBmb3IgYSBhIGR1Y2stdHlwZWQgbm9kZSwgZXhwcmVzc2VkIGxpa2U6XG4gICAgKiBcbiAgICAqICAgIHtzcGluLCB0YXN0ZSwgY29sb3VyfVxuICAgICogICAgLnBhcnRpY2xle3NwaW4sIHRhc3RlLCBjb2xvdXJ9XG4gICAgKiAgICAqe3NwaW4sIHRhc3RlLCBjb2xvdXJ9XG4gICAgKi9cbiAgIGZ1bmN0aW9uIGR1Y2tUeXBlQ2xhdXNlKHByZXZpb3VzRXhwciwgZGV0ZWN0aW9uKSB7XG5cbiAgICAgIHZhciBmaWVsZExpc3RTdHIgPSBkZXRlY3Rpb25bRklFTERfTElTVF9JTkRFWF07XG5cbiAgICAgIGlmICghZmllbGRMaXN0U3RyKSBcbiAgICAgICAgIHJldHVybiBwcmV2aW91c0V4cHI7IC8vIGRvbid0IHdyYXAgYXQgYWxsLCByZXR1cm4gZ2l2ZW4gZXhwciBhcy1pcyAgICAgIFxuXG4gICAgICB2YXIgaGFzQWxscmVxdWlyZWRGaWVsZHMgPSBwYXJ0aWFsQ29tcGxldGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNBbGxQcm9wZXJ0aWVzLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5QXNMaXN0KGZpZWxkTGlzdFN0ci5zcGxpdCgvXFxXKy8pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgIGlzTWF0Y2ggPSAgY29tcG9zZTIoIFxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzQWxscmVxdWlyZWRGaWVsZHMsIFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZE5vZGVcbiAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgIHJldHVybiBsYXp5SW50ZXJzZWN0aW9uKGlzTWF0Y2gsIHByZXZpb3VzRXhwcik7XG4gICB9XG5cbiAgIC8qKlxuICAgICogRXhwcmVzc2lvbiBmb3IgJCwgcmV0dXJucyB0aGUgZXZhbHVhdG9yIGZ1bmN0aW9uXG4gICAgKi9cbiAgIGZ1bmN0aW9uIGNhcHR1cmUoIHByZXZpb3VzRXhwciwgZGV0ZWN0aW9uICkge1xuXG4gICAgICAvLyBleHRyYWN0IG1lYW5pbmcgZnJvbSB0aGUgZGV0ZWN0aW9uICAgICAgXG4gICAgICB2YXIgY2FwdHVyaW5nID0gISFkZXRlY3Rpb25bQ0FQVFVSSU5HX0lOREVYXTtcblxuICAgICAgaWYgKCFjYXB0dXJpbmcpICAgICAgICAgIFxuICAgICAgICAgcmV0dXJuIHByZXZpb3VzRXhwcjsgLy8gZG9uJ3Qgd3JhcCBhdCBhbGwsIHJldHVybiBnaXZlbiBleHByIGFzLWlzICAgICAgXG4gICAgICBcbiAgICAgIHJldHVybiBsYXp5SW50ZXJzZWN0aW9uKHByZXZpb3VzRXhwciwgaGVhZCk7XG4gICAgICAgICAgICBcbiAgIH0gICAgICAgICAgICBcbiAgICAgIFxuICAgLyoqXG4gICAgKiBDcmVhdGUgYW4gZXZhbHVhdG9yIGZ1bmN0aW9uIHRoYXQgbW92ZXMgb250byB0aGUgbmV4dCBpdGVtIG9uIHRoZSBcbiAgICAqIGxpc3RzLiBUaGlzIGZ1bmN0aW9uIGlzIHRoZSBwbGFjZSB3aGVyZSB0aGUgbG9naWMgdG8gbW92ZSB1cCBhIFxuICAgICogbGV2ZWwgaW4gdGhlIGFzY2VudCBleGlzdHMuIFxuICAgICogXG4gICAgKiBFZywgZm9yIEpTT05QYXRoIFwiLmZvb1wiIHdlIG5lZWQgc2tpcDEobmFtZUNsYXVzZShhbHdheXMsIFssJ2ZvbyddKSlcbiAgICAqL1xuICAgZnVuY3Rpb24gc2tpcDEocHJldmlvdXNFeHByKSB7XG4gICBcbiAgIFxuICAgICAgaWYoIHByZXZpb3VzRXhwciA9PSBhbHdheXMgKSB7XG4gICAgICAgICAvKiBJZiB0aGVyZSBpcyBubyBwcmV2aW91cyBleHByZXNzaW9uIHRoaXMgY29uc3VtZSBjb21tYW5kIFxuICAgICAgICAgICAgaXMgYXQgdGhlIHN0YXJ0IG9mIHRoZSBqc29uUGF0aC5cbiAgICAgICAgICAgIFNpbmNlIEpTT05QYXRoIHNwZWNpZmllcyB3aGF0IHdlJ2QgbGlrZSB0byBmaW5kIGJ1dCBub3QgXG4gICAgICAgICAgICBuZWNlc3NhcmlseSBldmVyeXRoaW5nIGxlYWRpbmcgZG93biB0byBpdCwgd2hlbiBydW5uaW5nXG4gICAgICAgICAgICBvdXQgb2YgSlNPTlBhdGggdG8gY2hlY2sgYWdhaW5zdCB3ZSBkZWZhdWx0IHRvIHRydWUgKi9cbiAgICAgICAgIHJldHVybiBhbHdheXM7XG4gICAgICB9XG5cbiAgICAgIC8qKiByZXR1cm4gdHJ1ZSBpZiB0aGUgYXNjZW50IHdlIGhhdmUgY29udGFpbnMgb25seSB0aGUgSlNPTiByb290LFxuICAgICAgICogIGZhbHNlIG90aGVyd2lzZVxuICAgICAgICovXG4gICAgICBmdW5jdGlvbiBub3RBdFJvb3QoYXNjZW50KXtcbiAgICAgICAgIHJldHVybiBoZWFkS2V5KGFzY2VudCkgIT0gUk9PVF9QQVRIO1xuICAgICAgfVxuICAgICAgXG4gICAgICByZXR1cm4gbGF6eUludGVyc2VjdGlvbihcbiAgICAgICAgICAgICAgIC8qIElmIHdlJ3JlIGFscmVhZHkgYXQgdGhlIHJvb3QgYnV0IHRoZXJlIGFyZSBtb3JlIFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbnMgdG8gc2F0aXNmeSwgY2FuJ3QgY29uc3VtZSBhbnkgbW9yZS4gTm8gbWF0Y2guXG5cbiAgICAgICAgICAgICAgICAgIFRoaXMgY2hlY2sgaXMgd2h5IG5vbmUgb2YgdGhlIG90aGVyIGV4cHJzIGhhdmUgdG8gYmUgYWJsZSBcbiAgICAgICAgICAgICAgICAgIHRvIGhhbmRsZSBlbXB0eSBsaXN0czsgc2tpcDEgaXMgdGhlIG9ubHkgZXZhbHVhdG9yIHRoYXQgXG4gICAgICAgICAgICAgICAgICBtb3ZlcyBvbnRvIHRoZSBuZXh0IHRva2VuIGFuZCBpdCByZWZ1c2VzIHRvIGRvIHNvIG9uY2UgaXQgXG4gICAgICAgICAgICAgICAgICByZWFjaGVzIHRoZSBsYXN0IGl0ZW0gaW4gdGhlIGxpc3QuICovXG4gICAgICAgICAgICAgICBub3RBdFJvb3QsXG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgIC8qIFdlIGFyZSBub3QgYXQgdGhlIHJvb3Qgb2YgdGhlIGFzY2VudCB5ZXQuXG4gICAgICAgICAgICAgICAgICBNb3ZlIHRvIHRoZSBuZXh0IGxldmVsIG9mIHRoZSBhc2NlbnQgYnkgaGFuZGluZyBvbmx5IFxuICAgICAgICAgICAgICAgICAgdGhlIHRhaWwgdG8gdGhlIHByZXZpb3VzIGV4cHJlc3Npb24gKi8gXG4gICAgICAgICAgICAgICBjb21wb3NlMihwcmV2aW91c0V4cHIsIHRhaWwpIFxuICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgfSAgIFxuICAgXG4gICAvKipcbiAgICAqIENyZWF0ZSBhbiBldmFsdWF0b3IgZnVuY3Rpb24gZm9yIHRoZSAuLiAoZG91YmxlIGRvdCkgdG9rZW4uIENvbnN1bWVzXG4gICAgKiB6ZXJvIG9yIG1vcmUgbGV2ZWxzIG9mIHRoZSBhc2NlbnQsIHRoZSBmZXdlc3QgdGhhdCBhcmUgcmVxdWlyZWQgdG8gZmluZFxuICAgICogYSBtYXRjaCB3aGVuIGdpdmVuIHRvIHByZXZpb3VzRXhwci5cbiAgICAqLyAgIFxuICAgZnVuY3Rpb24gc2tpcE1hbnkocHJldmlvdXNFeHByKSB7XG5cbiAgICAgIGlmKCBwcmV2aW91c0V4cHIgPT0gYWx3YXlzICkge1xuICAgICAgICAgLyogSWYgdGhlcmUgaXMgbm8gcHJldmlvdXMgZXhwcmVzc2lvbiB0aGlzIGNvbnN1bWUgY29tbWFuZCBcbiAgICAgICAgICAgIGlzIGF0IHRoZSBzdGFydCBvZiB0aGUganNvblBhdGguXG4gICAgICAgICAgICBTaW5jZSBKU09OUGF0aCBzcGVjaWZpZXMgd2hhdCB3ZSdkIGxpa2UgdG8gZmluZCBidXQgbm90IFxuICAgICAgICAgICAgbmVjZXNzYXJpbHkgZXZlcnl0aGluZyBsZWFkaW5nIGRvd24gdG8gaXQsIHdoZW4gcnVubmluZ1xuICAgICAgICAgICAgb3V0IG9mIEpTT05QYXRoIHRvIGNoZWNrIGFnYWluc3Qgd2UgZGVmYXVsdCB0byB0cnVlICovICAgICAgICAgICAgXG4gICAgICAgICByZXR1cm4gYWx3YXlzO1xuICAgICAgfVxuICAgICAgICAgIFxuICAgICAgdmFyIFxuICAgICAgICAgIC8vIEluIEpTT05QYXRoIC4uIGlzIGVxdWl2YWxlbnQgdG8gIS4uIHNvIGlmIC4uIHJlYWNoZXMgdGhlIHJvb3RcbiAgICAgICAgICAvLyB0aGUgbWF0Y2ggaGFzIHN1Y2NlZWRlZC4gSWUsIHdlIG1pZ2h0IHdyaXRlIC4uZm9vIG9yICEuLmZvb1xuICAgICAgICAgIC8vIGFuZCBib3RoIHNob3VsZCBtYXRjaCBpZGVudGljYWxseS5cbiAgICAgICAgICB0ZXJtaW5hbENhc2VXaGVuQXJyaXZpbmdBdFJvb3QgPSByb290RXhwcigpLFxuICAgICAgICAgIHRlcm1pbmFsQ2FzZVdoZW5QcmV2aW91c0V4cHJlc3Npb25Jc1NhdGlzZmllZCA9IHByZXZpb3VzRXhwcixcbiAgICAgICAgICByZWN1cnNpdmVDYXNlID0gc2tpcDEoZnVuY3Rpb24oYXNjZW50KSB7XG4gICAgICAgICAgICAgcmV0dXJuIGNhc2VzKGFzY2VudCk7XG4gICAgICAgICAgfSksXG5cbiAgICAgICAgICBjYXNlcyA9IGxhenlVbmlvbihcbiAgICAgICAgICAgICAgICAgICAgIHRlcm1pbmFsQ2FzZVdoZW5BcnJpdmluZ0F0Um9vdFxuICAgICAgICAgICAgICAgICAgLCAgdGVybWluYWxDYXNlV2hlblByZXZpb3VzRXhwcmVzc2lvbklzU2F0aXNmaWVkXG4gICAgICAgICAgICAgICAgICAsICByZWN1cnNpdmVDYXNlICBcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICBcbiAgICAgIHJldHVybiBjYXNlcztcbiAgIH0gICAgICBcbiAgIFxuICAgLyoqXG4gICAgKiBHZW5lcmF0ZSBhbiBldmFsdWF0b3IgZm9yICEgLSBtYXRjaGVzIG9ubHkgdGhlIHJvb3QgZWxlbWVudCBvZiB0aGUganNvblxuICAgICogYW5kIGlnbm9yZXMgYW55IHByZXZpb3VzIGV4cHJlc3Npb25zIHNpbmNlIG5vdGhpbmcgbWF5IHByZWNlZGUgIS4gXG4gICAgKi8gICBcbiAgIGZ1bmN0aW9uIHJvb3RFeHByKCkge1xuICAgICAgXG4gICAgICByZXR1cm4gZnVuY3Rpb24oYXNjZW50KXtcbiAgICAgICAgIHJldHVybiBoZWFkS2V5KGFzY2VudCkgPT0gUk9PVF9QQVRIO1xuICAgICAgfTtcbiAgIH0gICBcbiAgICAgICAgIFxuICAgLyoqXG4gICAgKiBHZW5lcmF0ZSBhIHN0YXRlbWVudCB3cmFwcGVyIHRvIHNpdCBhcm91bmQgdGhlIG91dGVybW9zdCBcbiAgICAqIGNsYXVzZSBldmFsdWF0b3IuXG4gICAgKiBcbiAgICAqIEhhbmRsZXMgdGhlIGNhc2Ugd2hlcmUgdGhlIGNhcHR1cmluZyBpcyBpbXBsaWNpdCBiZWNhdXNlIHRoZSBKU09OUGF0aFxuICAgICogZGlkIG5vdCBjb250YWluIGEgJyQnIGJ5IHJldHVybmluZyB0aGUgbGFzdCBub2RlLlxuICAgICovICAgXG4gICBmdW5jdGlvbiBzdGF0ZW1lbnRFeHByKGxhc3RDbGF1c2UpIHtcbiAgICAgIFxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGFzY2VudCkge1xuICAgXG4gICAgICAgICAvLyBraWNrIG9mZiB0aGUgZXZhbHVhdGlvbiBieSBwYXNzaW5nIHRocm91Z2ggdG8gdGhlIGxhc3QgY2xhdXNlXG4gICAgICAgICB2YXIgZXhwck1hdGNoID0gbGFzdENsYXVzZShhc2NlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgIHJldHVybiBleHByTWF0Y2ggPT09IHRydWUgPyBoZWFkKGFzY2VudCkgOiBleHByTWF0Y2g7XG4gICAgICB9O1xuICAgfSAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgIC8qKlxuICAgICogRm9yIHdoZW4gYSB0b2tlbiBoYXMgYmVlbiBmb3VuZCBpbiB0aGUgSlNPTlBhdGggaW5wdXQuXG4gICAgKiBDb21waWxlcyB0aGUgcGFyc2VyIGZvciB0aGF0IHRva2VuIGFuZCByZXR1cm5zIGluIGNvbWJpbmF0aW9uIHdpdGggdGhlXG4gICAgKiBwYXJzZXIgYWxyZWFkeSBnZW5lcmF0ZWQuXG4gICAgKiBcbiAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGV4cHJzICBhIGxpc3Qgb2YgdGhlIGNsYXVzZSBldmFsdWF0b3IgZ2VuZXJhdG9ycyBmb3JcbiAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgdG9rZW4gdGhhdCB3YXMgZm91bmRcbiAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHBhcnNlckdlbmVyYXRlZFNvRmFyIHRoZSBwYXJzZXIgYWxyZWFkeSBmb3VuZFxuICAgICogQHBhcmFtIHtBcnJheX0gZGV0ZWN0aW9uIHRoZSBtYXRjaCBnaXZlbiBieSB0aGUgcmVnZXggZW5naW5lIHdoZW4gXG4gICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIGZlYXR1cmUgd2FzIGZvdW5kXG4gICAgKi9cbiAgIGZ1bmN0aW9uIGV4cHJlc3Npb25zUmVhZGVyKCBleHBycywgcGFyc2VyR2VuZXJhdGVkU29GYXIsIGRldGVjdGlvbiApIHtcbiAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgLy8gaWYgZXhwcnMgaXMgemVyby1sZW5ndGggZm9sZFIgd2lsbCBwYXNzIGJhY2sgdGhlIFxuICAgICAgLy8gcGFyc2VyR2VuZXJhdGVkU29GYXIgYXMtaXMgc28gd2UgZG9uJ3QgbmVlZCB0byB0cmVhdCBcbiAgICAgIC8vIHRoaXMgYXMgYSBzcGVjaWFsIGNhc2VcbiAgICAgIFxuICAgICAgcmV0dXJuICAgZm9sZFIoIFxuICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oIHBhcnNlckdlbmVyYXRlZFNvRmFyLCBleHByICl7XG4gICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgIHJldHVybiBleHByKHBhcnNlckdlbmVyYXRlZFNvRmFyLCBkZXRlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAgICBwYXJzZXJHZW5lcmF0ZWRTb0ZhciwgXG4gICAgICAgICAgICAgICAgICBleHByc1xuICAgICAgICAgICAgICAgKTsgICAgICAgICAgICAgICAgICAgICBcblxuICAgfVxuXG4gICAvKiogXG4gICAgKiAgSWYganNvblBhdGggbWF0Y2hlcyB0aGUgZ2l2ZW4gZGV0ZWN0b3IgZnVuY3Rpb24sIGNyZWF0ZXMgYSBmdW5jdGlvbiB3aGljaFxuICAgICogIGV2YWx1YXRlcyBhZ2FpbnN0IGV2ZXJ5IGNsYXVzZSBpbiB0aGUgY2xhdXNlRXZhbHVhdG9yR2VuZXJhdG9ycy4gVGhlXG4gICAgKiAgY3JlYXRlZCBmdW5jdGlvbiBpcyBwcm9wYWdhdGVkIHRvIHRoZSBvblN1Y2Nlc3MgZnVuY3Rpb24sIGFsb25nIHdpdGhcbiAgICAqICB0aGUgcmVtYWluaW5nIHVucGFyc2VkIEpTT05QYXRoIHN1YnN0cmluZy5cbiAgICAqICBcbiAgICAqICBUaGUgaW50ZW5kZWQgdXNlIGlzIHRvIGNyZWF0ZSBhIGNsYXVzZU1hdGNoZXIgYnkgZmlsbGluZyBpblxuICAgICogIHRoZSBmaXJzdCB0d28gYXJndW1lbnRzLCB0aHVzIHByb3ZpZGluZyBhIGZ1bmN0aW9uIHRoYXQga25vd3NcbiAgICAqICBzb21lIHN5bnRheCB0byBtYXRjaCBhbmQgd2hhdCBraW5kIG9mIGdlbmVyYXRvciB0byBjcmVhdGUgaWYgaXRcbiAgICAqICBmaW5kcyBpdC4gVGhlIHBhcmFtZXRlciBsaXN0IG9uY2UgY29tcGxldGVkIGlzOlxuICAgICogIFxuICAgICogICAgKGpzb25QYXRoLCBwYXJzZXJHZW5lcmF0ZWRTb0Zhciwgb25TdWNjZXNzKVxuICAgICogIFxuICAgICogIG9uU3VjY2VzcyBtYXkgYmUgY29tcGlsZUpzb25QYXRoVG9GdW5jdGlvbiwgdG8gcmVjdXJzaXZlbHkgY29udGludWUgXG4gICAgKiAgcGFyc2luZyBhZnRlciBmaW5kaW5nIGEgbWF0Y2ggb3IgcmV0dXJuRm91bmRQYXJzZXIgdG8gc3RvcCBoZXJlLlxuICAgICovXG4gICBmdW5jdGlvbiBnZW5lcmF0ZUNsYXVzZVJlYWRlcklmVG9rZW5Gb3VuZCAoXG4gICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW5EZXRlY3RvciwgY2xhdXNlRXZhbHVhdG9yR2VuZXJhdG9ycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGpzb25QYXRoLCBwYXJzZXJHZW5lcmF0ZWRTb0Zhciwgb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgIHZhciBkZXRlY3RlZCA9IHRva2VuRGV0ZWN0b3IoanNvblBhdGgpO1xuXG4gICAgICBpZihkZXRlY3RlZCkge1xuICAgICAgICAgdmFyIGNvbXBpbGVkUGFyc2VyID0gZXhwcmVzc2lvbnNSZWFkZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGF1c2VFdmFsdWF0b3JHZW5lcmF0b3JzLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlckdlbmVyYXRlZFNvRmFyLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGVjdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgXG4gICAgICAgICAgICAgcmVtYWluaW5nVW5wYXJzZWRKc29uUGF0aCA9IGpzb25QYXRoLnN1YnN0cihsZW4oZGV0ZWN0ZWRbMF0pKTsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICByZXR1cm4gb25TdWNjZXNzKHJlbWFpbmluZ1VucGFyc2VkSnNvblBhdGgsIGNvbXBpbGVkUGFyc2VyKTtcbiAgICAgIH0gICAgICAgICBcbiAgIH1cbiAgICAgICAgICAgICAgICAgXG4gICAvKipcbiAgICAqIFBhcnRpYWxseSBjb21wbGV0ZXMgZ2VuZXJhdGVDbGF1c2VSZWFkZXJJZlRva2VuRm91bmQgYWJvdmUuIFxuICAgICovXG4gICBmdW5jdGlvbiBjbGF1c2VNYXRjaGVyKHRva2VuRGV0ZWN0b3IsIGV4cHJzKSB7XG4gICAgICAgIFxuICAgICAgcmV0dXJuICAgcGFydGlhbENvbXBsZXRlKCBcbiAgICAgICAgICAgICAgICAgIGdlbmVyYXRlQ2xhdXNlUmVhZGVySWZUb2tlbkZvdW5kLCBcbiAgICAgICAgICAgICAgICAgIHRva2VuRGV0ZWN0b3IsIFxuICAgICAgICAgICAgICAgICAgZXhwcnMgXG4gICAgICAgICAgICAgICApO1xuICAgfVxuXG4gICAvKipcbiAgICAqIGNsYXVzZUZvckpzb25QYXRoIGlzIGEgZnVuY3Rpb24gd2hpY2ggYXR0ZW1wdHMgdG8gbWF0Y2ggYWdhaW5zdCBcbiAgICAqIHNldmVyYWwgY2xhdXNlIG1hdGNoZXJzIGluIG9yZGVyIHVudGlsIG9uZSBtYXRjaGVzLiBJZiBub24gbWF0Y2ggdGhlXG4gICAgKiBqc29uUGF0aCBleHByZXNzaW9uIGlzIGludmFsaWQgYW5kIGFuIGVycm9yIGlzIHRocm93bi5cbiAgICAqIFxuICAgICogVGhlIHBhcmFtZXRlciBsaXN0IGlzIHRoZSBzYW1lIGFzIGEgc2luZ2xlIGNsYXVzZU1hdGNoZXI6XG4gICAgKiBcbiAgICAqICAgIChqc29uUGF0aCwgcGFyc2VyR2VuZXJhdGVkU29GYXIsIG9uU3VjY2VzcylcbiAgICAqLyAgICAgXG4gICB2YXIgY2xhdXNlRm9ySnNvblBhdGggPSBsYXp5VW5pb24oXG5cbiAgICAgIGNsYXVzZU1hdGNoZXIocGF0aE5vZGVTeW50YXggICAsIGxpc3QoIGNhcHR1cmUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVja1R5cGVDbGF1c2UsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZUNsYXVzZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2lwMSApKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICwgIGNsYXVzZU1hdGNoZXIoZG91YmxlRG90U3ludGF4ICAsIGxpc3QoIHNraXBNYW55KSlcbiAgICAgICBcbiAgICAgICAvLyBkb3QgaXMgYSBzZXBhcmF0b3Igb25seSAobGlrZSB3aGl0ZXNwYWNlIGluIG90aGVyIGxhbmd1YWdlcykgYnV0IFxuICAgICAgIC8vIHJhdGhlciB0aGFuIG1ha2UgaXQgYSBzcGVjaWFsIGNhc2UsIHVzZSBhbiBlbXB0eSBsaXN0IG9mIFxuICAgICAgIC8vIGV4cHJlc3Npb25zIHdoZW4gdGhpcyB0b2tlbiBpcyBmb3VuZFxuICAgLCAgY2xhdXNlTWF0Y2hlcihkb3RTeW50YXggICAgICAgICwgbGlzdCgpICkgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICwgIGNsYXVzZU1hdGNoZXIoYmFuZ1N5bnRheCAgICAgICAsIGxpc3QoIGNhcHR1cmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb290RXhwcikpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAsICBjbGF1c2VNYXRjaGVyKGVtcHR5U3ludGF4ICAgICAgLCBsaXN0KCBzdGF0ZW1lbnRFeHByKSlcbiAgIFxuICAgLCAgZnVuY3Rpb24gKGpzb25QYXRoKSB7XG4gICAgICAgICB0aHJvdyBFcnJvcignXCInICsganNvblBhdGggKyAnXCIgY291bGQgbm90IGJlIHRva2VuaXNlZCcpICAgICAgXG4gICAgICB9XG4gICApO1xuXG5cbiAgIC8qKlxuICAgICogT25lIG9mIHR3byBwb3NzaWJsZSB2YWx1ZXMgZm9yIHRoZSBvblN1Y2Nlc3MgYXJndW1lbnQgb2YgXG4gICAgKiBnZW5lcmF0ZUNsYXVzZVJlYWRlcklmVG9rZW5Gb3VuZC5cbiAgICAqIFxuICAgICogV2hlbiB0aGlzIGZ1bmN0aW9uIGlzIHVzZWQsIGdlbmVyYXRlQ2xhdXNlUmVhZGVySWZUb2tlbkZvdW5kIHNpbXBseSBcbiAgICAqIHJldHVybnMgdGhlIGNvbXBpbGVkUGFyc2VyIHRoYXQgaXQgbWFkZSwgcmVnYXJkbGVzcyBvZiBpZiB0aGVyZSBpcyBcbiAgICAqIGFueSByZW1haW5pbmcganNvblBhdGggdG8gYmUgY29tcGlsZWQuXG4gICAgKi9cbiAgIGZ1bmN0aW9uIHJldHVybkZvdW5kUGFyc2VyKF9yZW1haW5pbmdKc29uUGF0aCwgY29tcGlsZWRQYXJzZXIpeyBcbiAgICAgIHJldHVybiBjb21waWxlZFBhcnNlciBcbiAgIH0gICAgIFxuICAgICAgICAgICAgICBcbiAgIC8qKlxuICAgICogUmVjdXJzaXZlbHkgY29tcGlsZSBhIEpTT05QYXRoIGV4cHJlc3Npb24uXG4gICAgKiBcbiAgICAqIFRoaXMgZnVuY3Rpb24gc2VydmVzIGFzIG9uZSBvZiB0d28gcG9zc2libGUgdmFsdWVzIGZvciB0aGUgb25TdWNjZXNzIFxuICAgICogYXJndW1lbnQgb2YgZ2VuZXJhdGVDbGF1c2VSZWFkZXJJZlRva2VuRm91bmQsIG1lYW5pbmcgY29udGludWUgdG9cbiAgICAqIHJlY3Vyc2l2ZWx5IGNvbXBpbGUuIE90aGVyd2lzZSwgcmV0dXJuRm91bmRQYXJzZXIgaXMgZ2l2ZW4gYW5kXG4gICAgKiBjb21waWxhdGlvbiB0ZXJtaW5hdGVzLlxuICAgICovXG4gICBmdW5jdGlvbiBjb21waWxlSnNvblBhdGhUb0Z1bmN0aW9uKCB1bmNvbXBpbGVkSnNvblBhdGgsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyR2VuZXJhdGVkU29GYXIgKSB7XG5cbiAgICAgIC8qKlxuICAgICAgICogT24gZmluZGluZyBhIG1hdGNoLCBpZiB0aGVyZSBpcyByZW1haW5pbmcgdGV4dCB0byBiZSBjb21waWxlZFxuICAgICAgICogd2Ugd2FudCB0byBlaXRoZXIgY29udGludWUgcGFyc2luZyB1c2luZyBhIHJlY3Vyc2l2ZSBjYWxsIHRvIFxuICAgICAgICogY29tcGlsZUpzb25QYXRoVG9GdW5jdGlvbi4gT3RoZXJ3aXNlLCB3ZSB3YW50IHRvIHN0b3AgYW5kIHJldHVybiBcbiAgICAgICAqIHRoZSBwYXJzZXIgdGhhdCB3ZSBoYXZlIGZvdW5kIHNvIGZhci5cbiAgICAgICAqL1xuICAgICAgdmFyIG9uRmluZCA9ICAgICAgdW5jb21waWxlZEpzb25QYXRoXG4gICAgICAgICAgICAgICAgICAgICA/ICBjb21waWxlSnNvblBhdGhUb0Z1bmN0aW9uIFxuICAgICAgICAgICAgICAgICAgICAgOiAgcmV0dXJuRm91bmRQYXJzZXI7XG4gICAgICAgICAgICAgICAgICAgXG4gICAgICByZXR1cm4gICBjbGF1c2VGb3JKc29uUGF0aCggXG4gICAgICAgICAgICAgICAgICB1bmNvbXBpbGVkSnNvblBhdGgsIFxuICAgICAgICAgICAgICAgICAgcGFyc2VyR2VuZXJhdGVkU29GYXIsIFxuICAgICAgICAgICAgICAgICAgb25GaW5kXG4gICAgICAgICAgICAgICApOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgfVxuXG4gICAvKipcbiAgICAqIFRoaXMgaXMgdGhlIGZ1bmN0aW9uIHRoYXQgd2UgZXhwb3NlIHRvIHRoZSByZXN0IG9mIHRoZSBsaWJyYXJ5LlxuICAgICovXG4gICByZXR1cm4gZnVuY3Rpb24oanNvblBhdGgpe1xuICAgICAgICBcbiAgICAgIHRyeSB7XG4gICAgICAgICAvLyBLaWNrIG9mZiB0aGUgcmVjdXJzaXZlIHBhcnNpbmcgb2YgdGhlIGpzb25QYXRoIFxuICAgICAgICAgcmV0dXJuIGNvbXBpbGVKc29uUGF0aFRvRnVuY3Rpb24oanNvblBhdGgsIGFsd2F5cyk7XG4gICAgICAgICBcbiAgICAgIH0gY2F0Y2goIGUgKSB7XG4gICAgICAgICB0aHJvdyBFcnJvciggJ0NvdWxkIG5vdCBjb21waWxlIFwiJyArIGpzb25QYXRoICsgXG4gICAgICAgICAgICAgICAgICAgICAgJ1wiIGJlY2F1c2UgJyArIGUubWVzc2FnZVxuICAgICAgICAgKTtcbiAgICAgIH1cbiAgIH1cblxufSk7XG5cbi8qKlxuICogQSBwdWIvc3ViIHdoaWNoIGlzIHJlc3BvbnNpYmxlIGZvciBhIHNpbmdsZSBldmVudCB0eXBlLiBBXG4gKiBtdWx0aS1ldmVudCB0eXBlIGV2ZW50IGJ1cyBpcyBjcmVhdGVkIGJ5IHB1YlN1YiBieSBjb2xsZWN0aW5nXG4gKiBzZXZlcmFsIG9mIHRoZXNlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFR5cGVcbiAqICAgIHRoZSBuYW1lIG9mIHRoZSBldmVudHMgbWFuYWdlZCBieSB0aGlzIHNpbmdsZUV2ZW50UHViU3ViXG4gKiBAcGFyYW0ge3NpbmdsZUV2ZW50UHViU3VifSBbbmV3TGlzdGVuZXJdXG4gKiAgICBwbGFjZSB0byBub3RpZnkgb2YgbmV3IGxpc3RlbmVyc1xuICogQHBhcmFtIHtzaW5nbGVFdmVudFB1YlN1Yn0gW3JlbW92ZUxpc3RlbmVyXVxuICogICAgcGxhY2UgdG8gbm90aWZ5IG9mIHdoZW4gbGlzdGVuZXJzIGFyZSByZW1vdmVkXG4gKi9cbmZ1bmN0aW9uIHNpbmdsZUV2ZW50UHViU3ViKGV2ZW50VHlwZSwgbmV3TGlzdGVuZXIsIHJlbW92ZUxpc3RlbmVyKXtcblxuICAvKiogd2UgYXJlIG9wdGltaXNlZCBmb3IgZW1pdHRpbmcgZXZlbnRzIG92ZXIgZmlyaW5nIHRoZW0uXG4gICAqICBBcyB3ZWxsIGFzIHRoZSB0dXBsZSBsaXN0IHdoaWNoIHN0b3JlcyBldmVudCBpZHMgYW5kXG4gICAqICBsaXN0ZW5lcnMgdGhlcmUgaXMgYSBsaXN0IHdpdGgganVzdCB0aGUgbGlzdGVuZXJzIHdoaWNoXG4gICAqICBjYW4gYmUgaXRlcmF0ZWQgbW9yZSBxdWlja2x5IHdoZW4gd2UgYXJlIGVtaXR0aW5nXG4gICAqL1xuICB2YXIgbGlzdGVuZXJUdXBsZUxpc3QsXG4gICAgICBsaXN0ZW5lckxpc3Q7XG5cbiAgZnVuY3Rpb24gaGFzSWQoaWQpe1xuICAgIHJldHVybiBmdW5jdGlvbih0dXBsZSkge1xuICAgICAgcmV0dXJuIHR1cGxlLmlkID09IGlkO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXJcbiAgICAgKiBAcGFyYW0geyp9IGxpc3RlbmVySWRcbiAgICAgKiAgICBhbiBpZCB0aGF0IHRoaXMgbGlzdGVuZXIgY2FuIGxhdGVyIGJ5IHJlbW92ZWQgYnkuXG4gICAgICogICAgQ2FuIGJlIG9mIGFueSB0eXBlLCB0byBiZSBjb21wYXJlZCB0byBvdGhlciBpZHMgdXNpbmcgPT1cbiAgICAgKi9cbiAgICBvbjpmdW5jdGlvbiggbGlzdGVuZXIsIGxpc3RlbmVySWQgKSB7XG5cbiAgICAgIHZhciB0dXBsZSA9IHtcbiAgICAgICAgbGlzdGVuZXI6IGxpc3RlbmVyXG4gICAgICAgICwgIGlkOiAgICAgICBsaXN0ZW5lcklkIHx8IGxpc3RlbmVyIC8vIHdoZW4gbm8gaWQgaXMgZ2l2ZW4gdXNlIHRoZVxuICAgICAgICAvLyBsaXN0ZW5lciBmdW5jdGlvbiBhcyB0aGUgaWRcbiAgICAgIH07XG5cbiAgICAgIGlmKCBuZXdMaXN0ZW5lciApIHtcbiAgICAgICAgbmV3TGlzdGVuZXIuZW1pdChldmVudFR5cGUsIGxpc3RlbmVyLCB0dXBsZS5pZCk7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVyVHVwbGVMaXN0ID0gY29ucyggdHVwbGUsICAgIGxpc3RlbmVyVHVwbGVMaXN0ICk7XG4gICAgICBsaXN0ZW5lckxpc3QgICAgICA9IGNvbnMoIGxpc3RlbmVyLCBsaXN0ZW5lckxpc3QgICAgICApO1xuXG4gICAgICByZXR1cm4gdGhpczsgLy8gY2hhaW5pbmdcbiAgICB9LFxuXG4gICAgZW1pdDpmdW5jdGlvbiAoKSB7XG4gICAgICBhcHBseUVhY2goIGxpc3RlbmVyTGlzdCwgYXJndW1lbnRzICk7XG4gICAgfSxcblxuICAgIHVuOiBmdW5jdGlvbiggbGlzdGVuZXJJZCApIHtcblxuICAgICAgdmFyIHJlbW92ZWQ7XG5cbiAgICAgIGxpc3RlbmVyVHVwbGVMaXN0ID0gd2l0aG91dChcbiAgICAgICAgbGlzdGVuZXJUdXBsZUxpc3QsXG4gICAgICAgIGhhc0lkKGxpc3RlbmVySWQpLFxuICAgICAgICBmdW5jdGlvbih0dXBsZSl7XG4gICAgICAgICAgcmVtb3ZlZCA9IHR1cGxlO1xuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgICBpZiggcmVtb3ZlZCApIHtcbiAgICAgICAgbGlzdGVuZXJMaXN0ID0gd2l0aG91dCggbGlzdGVuZXJMaXN0LCBmdW5jdGlvbihsaXN0ZW5lcil7XG4gICAgICAgICAgcmV0dXJuIGxpc3RlbmVyID09IHJlbW92ZWQubGlzdGVuZXI7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKCByZW1vdmVMaXN0ZW5lciApIHtcbiAgICAgICAgICByZW1vdmVMaXN0ZW5lci5lbWl0KGV2ZW50VHlwZSwgcmVtb3ZlZC5saXN0ZW5lciwgcmVtb3ZlZC5pZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgbGlzdGVuZXJzOiBmdW5jdGlvbigpe1xuICAgICAgLy8gZGlmZmVycyBmcm9tIE5vZGUgRXZlbnRFbWl0dGVyOiByZXR1cm5zIGxpc3QsIG5vdCBhcnJheVxuICAgICAgcmV0dXJuIGxpc3RlbmVyTGlzdDtcbiAgICB9LFxuXG4gICAgaGFzTGlzdGVuZXI6IGZ1bmN0aW9uKGxpc3RlbmVySWQpe1xuICAgICAgdmFyIHRlc3QgPSBsaXN0ZW5lcklkPyBoYXNJZChsaXN0ZW5lcklkKSA6IGFsd2F5cztcblxuICAgICAgcmV0dXJuIGRlZmluZWQoZmlyc3QoIHRlc3QsIGxpc3RlbmVyVHVwbGVMaXN0KSk7XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIHB1YlN1YiBpcyBhIGN1cnJpZWQgaW50ZXJmYWNlIGZvciBsaXN0ZW5pbmcgdG8gYW5kIGVtaXR0aW5nXG4gKiBldmVudHMuXG4gKlxuICogSWYgd2UgZ2V0IGEgYnVzOlxuICpcbiAqICAgIHZhciBidXMgPSBwdWJTdWIoKTtcbiAqXG4gKiBXZSBjYW4gbGlzdGVuIHRvIGV2ZW50ICdmb28nIGxpa2U6XG4gKlxuICogICAgYnVzKCdmb28nKS5vbihteUNhbGxiYWNrKVxuICpcbiAqIEFuZCBlbWl0IGV2ZW50IGZvbyBsaWtlOlxuICpcbiAqICAgIGJ1cygnZm9vJykuZW1pdCgpXG4gKlxuICogb3IsIHdpdGggYSBwYXJhbWV0ZXI6XG4gKlxuICogICAgYnVzKCdmb28nKS5lbWl0KCdiYXInKVxuICpcbiAqIEFsbCBmdW5jdGlvbnMgY2FuIGJlIGNhY2hlZCBhbmQgZG9uJ3QgbmVlZCB0byBiZVxuICogYm91bmQuIEllOlxuICpcbiAqICAgIHZhciBmb29FbWl0dGVyID0gYnVzKCdmb28nKS5lbWl0XG4gKiAgICBmb29FbWl0dGVyKCdiYXInKTsgIC8vIGVtaXQgYW4gZXZlbnRcbiAqICAgIGZvb0VtaXR0ZXIoJ2JheicpOyAgLy8gZW1pdCBhbm90aGVyXG4gKlxuICogVGhlcmUncyBhbHNvIGFuIHVuY3VycmllZFsxXSBzaG9ydGN1dCBmb3IgLmVtaXQgYW5kIC5vbjpcbiAqXG4gKiAgICBidXMub24oJ2ZvbycsIGNhbGxiYWNrKVxuICogICAgYnVzLmVtaXQoJ2ZvbycsICdiYXInKVxuICpcbiAqIFsxXTogaHR0cDovL3p2b24ub3JnL290aGVyL2hhc2tlbGwvT3V0cHV0cHJlbHVkZS91bmN1cnJ5X2YuaHRtbFxuICovXG5mdW5jdGlvbiBwdWJTdWIoKXtcblxuICAgdmFyIHNpbmdsZXMgPSB7fSxcbiAgICAgICBuZXdMaXN0ZW5lciA9IG5ld1NpbmdsZSgnbmV3TGlzdGVuZXInKSxcbiAgICAgICByZW1vdmVMaXN0ZW5lciA9IG5ld1NpbmdsZSgncmVtb3ZlTGlzdGVuZXInKTtcblxuICAgZnVuY3Rpb24gbmV3U2luZ2xlKGV2ZW50TmFtZSkge1xuICAgICAgcmV0dXJuIHNpbmdsZXNbZXZlbnROYW1lXSA9IHNpbmdsZUV2ZW50UHViU3ViKFxuICAgICAgICAgZXZlbnROYW1lLFxuICAgICAgICAgbmV3TGlzdGVuZXIsXG4gICAgICAgICByZW1vdmVMaXN0ZW5lclxuICAgICAgKTtcbiAgIH1cblxuICAgLyoqIHB1YlN1YiBpbnN0YW5jZXMgYXJlIGZ1bmN0aW9ucyAqL1xuICAgZnVuY3Rpb24gcHViU3ViSW5zdGFuY2UoIGV2ZW50TmFtZSApe1xuXG4gICAgICByZXR1cm4gc2luZ2xlc1tldmVudE5hbWVdIHx8IG5ld1NpbmdsZSggZXZlbnROYW1lICk7XG4gICB9XG5cbiAgIC8vIGFkZCBjb252ZW5pZW5jZSBFdmVudEVtaXR0ZXItc3R5bGUgdW5jdXJyaWVkIGZvcm0gb2YgJ2VtaXQnIGFuZCAnb24nXG4gICBbJ2VtaXQnLCAnb24nLCAndW4nXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZE5hbWUpe1xuXG4gICAgICBwdWJTdWJJbnN0YW5jZVttZXRob2ROYW1lXSA9IHZhckFyZ3MoZnVuY3Rpb24oZXZlbnROYW1lLCBwYXJhbWV0ZXJzKXtcbiAgICAgICAgIGFwcGx5KCBwYXJhbWV0ZXJzLCBwdWJTdWJJbnN0YW5jZSggZXZlbnROYW1lIClbbWV0aG9kTmFtZV0pO1xuICAgICAgfSk7XG4gICB9KTtcblxuICAgcmV0dXJuIHB1YlN1Ykluc3RhbmNlO1xufVxuXG4vKipcbiAqIFRoaXMgZmlsZSBkZWNsYXJlcyBzb21lIGNvbnN0YW50cyB0byB1c2UgYXMgbmFtZXMgZm9yIGV2ZW50IHR5cGVzLlxuICovXG5cbnZhciAvLyB0aGUgZXZlbnRzIHdoaWNoIGFyZSBuZXZlciBleHBvcnRlZCBhcmUga2VwdCBhcyBcbiAgICAvLyB0aGUgc21hbGxlc3QgcG9zc2libGUgcmVwcmVzZW50YXRpb24sIGluIG51bWJlcnM6XG4gICAgX1MgPSAxLFxuXG4gICAgLy8gZmlyZWQgd2hlbmV2ZXIgYSBuZXcgbm9kZSBzdGFydHMgaW4gdGhlIEpTT04gc3RyZWFtOlxuICAgIE5PREVfT1BFTkVEICAgICA9IF9TKyssXG5cbiAgICAvLyBmaXJlZCB3aGVuZXZlciBhIG5vZGUgY2xvc2VzIGluIHRoZSBKU09OIHN0cmVhbTpcbiAgICBOT0RFX0NMT1NFRCAgICAgPSBfUysrLFxuXG4gICAgLy8gY2FsbGVkIGlmIGEgLm5vZGUgY2FsbGJhY2sgcmV0dXJucyBhIHZhbHVlIC0gXG4gICAgTk9ERV9TV0FQICAgICAgID0gX1MrKyxcbiAgICBOT0RFX0RST1AgICAgICAgPSBfUysrLFxuXG4gICAgRkFJTF9FVkVOVCAgICAgID0gJ2ZhaWwnLFxuICAgXG4gICAgUk9PVF9OT0RFX0ZPVU5EID0gX1MrKyxcbiAgICBST09UX1BBVEhfRk9VTkQgPSBfUysrLFxuICAgXG4gICAgSFRUUF9TVEFSVCAgICAgID0gJ3N0YXJ0JyxcbiAgICBTVFJFQU1fREFUQSAgICAgPSAnZGF0YScsXG4gICAgU1RSRUFNX0VORCAgICAgID0gJ2VuZCcsXG4gICAgQUJPUlRJTkcgICAgICAgID0gX1MrKyxcblxuICAgIC8vIFNBWCBldmVudHMgYnV0Y2hlcmVkIGZyb20gQ2xhcmluZXRcbiAgICBTQVhfS0VZICAgICAgICAgID0gX1MrKyxcbiAgICBTQVhfVkFMVUVfT1BFTiAgID0gX1MrKyxcbiAgICBTQVhfVkFMVUVfQ0xPU0UgID0gX1MrKztcbiAgICBcbmZ1bmN0aW9uIGVycm9yUmVwb3J0KHN0YXR1c0NvZGUsIGJvZHksIGVycm9yKSB7XG4gICB0cnl7XG4gICAgICB2YXIganNvbkJvZHkgPSBKU09OLnBhcnNlKGJvZHkpO1xuICAgfWNhdGNoKGUpe31cblxuICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1c0NvZGU6c3RhdHVzQ29kZSxcbiAgICAgIGJvZHk6Ym9keSxcbiAgICAgIGpzb25Cb2R5Ompzb25Cb2R5LFxuICAgICAgdGhyb3duOmVycm9yXG4gICB9O1xufSAgICBcblxuLyoqIFxuICogIFRoZSBwYXR0ZXJuIGFkYXB0b3IgbGlzdGVucyBmb3IgbmV3TGlzdGVuZXIgYW5kIHJlbW92ZUxpc3RlbmVyXG4gKiAgZXZlbnRzLiBXaGVuIHBhdHRlcm5zIGFyZSBhZGRlZCBvciByZW1vdmVkIGl0IGNvbXBpbGVzIHRoZSBKU09OUGF0aFxuICogIGFuZCB3aXJlcyB0aGVtIHVwLlxuICogIFxuICogIFdoZW4gbm9kZXMgYW5kIHBhdGhzIGFyZSBmb3VuZCBpdCBlbWl0cyB0aGUgZnVsbHktcXVhbGlmaWVkIG1hdGNoIFxuICogIGV2ZW50cyB3aXRoIHBhcmFtZXRlcnMgcmVhZHkgdG8gc2hpcCB0byB0aGUgb3V0c2lkZSB3b3JsZFxuICovXG5cbmZ1bmN0aW9uIHBhdHRlcm5BZGFwdGVyKG9ib2VCdXMsIGpzb25QYXRoQ29tcGlsZXIpIHtcblxuICAgdmFyIHByZWRpY2F0ZUV2ZW50TWFwID0ge1xuICAgICAgbm9kZTpvYm9lQnVzKE5PREVfQ0xPU0VEKVxuICAgLCAgcGF0aDpvYm9lQnVzKE5PREVfT1BFTkVEKVxuICAgfTtcbiAgICAgXG4gICBmdW5jdGlvbiBlbWl0TWF0Y2hpbmdOb2RlKGVtaXRNYXRjaCwgbm9kZSwgYXNjZW50KSB7XG4gICAgICAgICBcbiAgICAgIC8qIFxuICAgICAgICAgV2UncmUgbm93IGNhbGxpbmcgdG8gdGhlIG91dHNpZGUgd29ybGQgd2hlcmUgTGlzcC1zdHlsZSBcbiAgICAgICAgIGxpc3RzIHdpbGwgbm90IGJlIGZhbWlsaWFyLiBDb252ZXJ0IHRvIHN0YW5kYXJkIGFycmF5cy4gXG4gICBcbiAgICAgICAgIEFsc28sIHJldmVyc2UgdGhlIG9yZGVyIGJlY2F1c2UgaXQgaXMgbW9yZSBjb21tb24gdG8gXG4gICAgICAgICBsaXN0IHBhdGhzIFwicm9vdCB0byBsZWFmXCIgdGhhbiBcImxlYWYgdG8gcm9vdFwiICAqL1xuICAgICAgdmFyIGRlc2NlbnQgICAgID0gcmV2ZXJzZUxpc3QoYXNjZW50KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgIGVtaXRNYXRjaChcbiAgICAgICAgIG5vZGUsXG4gICAgICAgICBcbiAgICAgICAgIC8vIFRvIG1ha2UgYSBwYXRoLCBzdHJpcCBvZmYgdGhlIGxhc3QgaXRlbSB3aGljaCBpcyB0aGUgc3BlY2lhbFxuICAgICAgICAgLy8gUk9PVF9QQVRIIHRva2VuIGZvciB0aGUgJ3BhdGgnIHRvIHRoZSByb290IG5vZGUgICAgICAgICAgXG4gICAgICAgICBsaXN0QXNBcnJheSh0YWlsKG1hcChrZXlPZixkZXNjZW50KSkpLCAgLy8gcGF0aFxuICAgICAgICAgbGlzdEFzQXJyYXkobWFwKG5vZGVPZiwgZGVzY2VudCkpICAgICAgIC8vIGFuY2VzdG9ycyAgICBcbiAgICAgICk7ICAgICAgICAgXG4gICB9XG5cbiAgIC8qIFxuICAgICogU2V0IHVwIHRoZSBjYXRjaGluZyBvZiBldmVudHMgc3VjaCBhcyBOT0RFX0NMT1NFRCBhbmQgTk9ERV9PUEVORUQgYW5kLCBpZiBcbiAgICAqIG1hdGNoaW5nIHRoZSBzcGVjaWZpZWQgcGF0dGVybiwgcHJvcGFnYXRlIHRvIHBhdHRlcm4tbWF0Y2ggZXZlbnRzIHN1Y2ggYXMgXG4gICAgKiBvYm9lQnVzKCdub2RlOiEnKVxuICAgICogXG4gICAgKiBcbiAgICAqIFxuICAgICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlRXZlbnQgXG4gICAgKiAgICAgICAgICBlaXRoZXIgb2JvZUJ1cyhOT0RFX0NMT1NFRCkgb3Igb2JvZUJ1cyhOT0RFX09QRU5FRCkuXG4gICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21waWxlZEpzb25QYXRoICAgICAgICAgIFxuICAgICovXG4gICBmdW5jdGlvbiBhZGRVbmRlcmx5aW5nTGlzdGVuZXIoIGZ1bGxFdmVudE5hbWUsIHByZWRpY2F0ZUV2ZW50LCBjb21waWxlZEpzb25QYXRoICl7XG4gICBcbiAgICAgIHZhciBlbWl0TWF0Y2ggPSBvYm9lQnVzKGZ1bGxFdmVudE5hbWUpLmVtaXQ7XG4gICBcbiAgICAgIHByZWRpY2F0ZUV2ZW50Lm9uKCBmdW5jdGlvbiAoYXNjZW50KSB7XG5cbiAgICAgICAgIHZhciBtYXliZU1hdGNoaW5nTWFwcGluZyA9IGNvbXBpbGVkSnNvblBhdGgoYXNjZW50KTtcblxuICAgICAgICAgLyogUG9zc2libGUgdmFsdWVzIGZvciBtYXliZU1hdGNoaW5nTWFwcGluZyBhcmUgbm93OlxuXG4gICAgICAgICAgZmFsc2U6IFxuICAgICAgICAgIHdlIGRpZCBub3QgbWF0Y2ggXG5cbiAgICAgICAgICBhbiBvYmplY3QvYXJyYXkvc3RyaW5nL251bWJlci9udWxsOiBcbiAgICAgICAgICB3ZSBtYXRjaGVkIGFuZCBoYXZlIHRoZSBub2RlIHRoYXQgbWF0Y2hlZC5cbiAgICAgICAgICBCZWNhdXNlIG51bGxzIGFyZSB2YWxpZCBqc29uIHZhbHVlcyB0aGlzIGNhbiBiZSBudWxsLlxuXG4gICAgICAgICAgdW5kZWZpbmVkOlxuICAgICAgICAgIHdlIG1hdGNoZWQgYnV0IGRvbid0IGhhdmUgdGhlIG1hdGNoaW5nIG5vZGUgeWV0LlxuICAgICAgICAgIGllLCB3ZSBrbm93IHRoZXJlIGlzIGFuIHVwY29taW5nIG5vZGUgdGhhdCBtYXRjaGVzIGJ1dCB3ZSBcbiAgICAgICAgICBjYW4ndCBzYXkgYW55dGhpbmcgZWxzZSBhYm91dCBpdC4gXG4gICAgICAgICAgKi9cbiAgICAgICAgIGlmIChtYXliZU1hdGNoaW5nTWFwcGluZyAhPT0gZmFsc2UpIHtcblxuICAgICAgICAgICAgZW1pdE1hdGNoaW5nTm9kZShcbiAgICAgICAgICAgICAgIGVtaXRNYXRjaCwgXG4gICAgICAgICAgICAgICBub2RlT2YobWF5YmVNYXRjaGluZ01hcHBpbmcpLCBcbiAgICAgICAgICAgICAgIGFzY2VudFxuICAgICAgICAgICAgKTtcbiAgICAgICAgIH1cbiAgICAgIH0sIGZ1bGxFdmVudE5hbWUpO1xuICAgICBcbiAgICAgIG9ib2VCdXMoJ3JlbW92ZUxpc3RlbmVyJykub24oIGZ1bmN0aW9uKHJlbW92ZWRFdmVudE5hbWUpe1xuXG4gICAgICAgICAvLyBpZiB0aGUgZnVsbHkgcXVhbGlmaWVkIG1hdGNoIGV2ZW50IGxpc3RlbmVyIGlzIGxhdGVyIHJlbW92ZWQsIGNsZWFuIHVwIFxuICAgICAgICAgLy8gYnkgcmVtb3ZpbmcgdGhlIHVuZGVybHlpbmcgbGlzdGVuZXIgaWYgaXQgd2FzIHRoZSBsYXN0IHVzaW5nIHRoYXQgcGF0dGVybjpcbiAgICAgIFxuICAgICAgICAgaWYoIHJlbW92ZWRFdmVudE5hbWUgPT0gZnVsbEV2ZW50TmFtZSApIHtcbiAgICAgICAgIFxuICAgICAgICAgICAgaWYoICFvYm9lQnVzKHJlbW92ZWRFdmVudE5hbWUpLmxpc3RlbmVycyggICkpIHtcbiAgICAgICAgICAgICAgIHByZWRpY2F0ZUV2ZW50LnVuKCBmdWxsRXZlbnROYW1lICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICB9XG4gICAgICB9KTsgICBcbiAgIH1cblxuICAgb2JvZUJ1cygnbmV3TGlzdGVuZXInKS5vbiggZnVuY3Rpb24oZnVsbEV2ZW50TmFtZSl7XG5cbiAgICAgIHZhciBtYXRjaCA9IC8obm9kZXxwYXRoKTooLiopLy5leGVjKGZ1bGxFdmVudE5hbWUpO1xuICAgICAgXG4gICAgICBpZiggbWF0Y2ggKSB7XG4gICAgICAgICB2YXIgcHJlZGljYXRlRXZlbnQgPSBwcmVkaWNhdGVFdmVudE1hcFttYXRjaFsxXV07XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgaWYoICFwcmVkaWNhdGVFdmVudC5oYXNMaXN0ZW5lciggZnVsbEV2ZW50TmFtZSkgKSB7ICBcbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgYWRkVW5kZXJseWluZ0xpc3RlbmVyKFxuICAgICAgICAgICAgICAgZnVsbEV2ZW50TmFtZSxcbiAgICAgICAgICAgICAgIHByZWRpY2F0ZUV2ZW50LCBcbiAgICAgICAgICAgICAgIGpzb25QYXRoQ29tcGlsZXIoIG1hdGNoWzJdIClcbiAgICAgICAgICAgICk7XG4gICAgICAgICB9XG4gICAgICB9ICAgIFxuICAgfSlcblxufVxuXG4vKipcbiAqIFRoZSBpbnN0YW5jZSBBUEkgaXMgdGhlIHRoaW5nIHRoYXQgaXMgcmV0dXJuZWQgd2hlbiBvYm9lKCkgaXMgY2FsbGVkLlxuICogaXQgYWxsb3dzOlxuICpcbiAqICAgIC0gbGlzdGVuZXJzIGZvciB2YXJpb3VzIGV2ZW50cyB0byBiZSBhZGRlZCBhbmQgcmVtb3ZlZFxuICogICAgLSB0aGUgaHR0cCByZXNwb25zZSBoZWFkZXIvaGVhZGVycyB0byBiZSByZWFkXG4gKi9cbmZ1bmN0aW9uIGluc3RhbmNlQXBpKG9ib2VCdXMsIGNvbnRlbnRTb3VyY2Upe1xuXG4gIHZhciBvYm9lQXBpLFxuICAgICAgZnVsbHlRdWFsaWZpZWROYW1lUGF0dGVybiA9IC9eKG5vZGV8cGF0aCk6Li8sXG4gICAgICByb290Tm9kZUZpbmlzaGVkRXZlbnQgPSBvYm9lQnVzKFJPT1RfTk9ERV9GT1VORCksXG4gICAgICBlbWl0Tm9kZURyb3AgPSBvYm9lQnVzKE5PREVfRFJPUCkuZW1pdCxcbiAgICAgIGVtaXROb2RlU3dhcCA9IG9ib2VCdXMoTk9ERV9TV0FQKS5lbWl0LFxuXG4gICAgICAvKipcbiAgICAgICAqIEFkZCBhbnkga2luZCBvZiBsaXN0ZW5lciB0aGF0IHRoZSBpbnN0YW5jZSBhcGkgZXhwb3Nlc1xuICAgICAgICovXG4gICAgICBhZGRMaXN0ZW5lciA9IHZhckFyZ3MoZnVuY3Rpb24oIGV2ZW50SWQsIHBhcmFtZXRlcnMgKXtcblxuICAgICAgICBpZiggb2JvZUFwaVtldmVudElkXSApIHtcblxuICAgICAgICAgIC8vIGZvciBldmVudHMgYWRkZWQgYXMgLm9uKGV2ZW50LCBjYWxsYmFjayksIGlmIHRoZXJlIGlzIGFcbiAgICAgICAgICAvLyAuZXZlbnQoKSBlcXVpdmFsZW50IHdpdGggc3BlY2lhbCBiZWhhdmlvdXIgLCBwYXNzIHRocm91Z2hcbiAgICAgICAgICAvLyB0byB0aGF0OlxuICAgICAgICAgIGFwcGx5KHBhcmFtZXRlcnMsIG9ib2VBcGlbZXZlbnRJZF0pO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgLy8gd2UgaGF2ZSBhIHN0YW5kYXJkIE5vZGUuanMgRXZlbnRFbWl0dGVyIDItYXJndW1lbnQgY2FsbC5cbiAgICAgICAgICAvLyBUaGUgZmlyc3QgcGFyYW1ldGVyIGlzIHRoZSBsaXN0ZW5lci5cbiAgICAgICAgICB2YXIgZXZlbnQgPSBvYm9lQnVzKGV2ZW50SWQpLFxuICAgICAgICAgICAgICBsaXN0ZW5lciA9IHBhcmFtZXRlcnNbMF07XG5cbiAgICAgICAgICBpZiggZnVsbHlRdWFsaWZpZWROYW1lUGF0dGVybi50ZXN0KGV2ZW50SWQpICkge1xuXG4gICAgICAgICAgICAvLyBhbGxvdyBmdWxseS1xdWFsaWZpZWQgbm9kZS9wYXRoIGxpc3RlbmVyc1xuICAgICAgICAgICAgLy8gdG8gYmUgYWRkZWRcbiAgICAgICAgICAgIGFkZEZvcmdldHRhYmxlQ2FsbGJhY2soZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAgICAgICB9IGVsc2UgIHtcblxuICAgICAgICAgICAgLy8gdGhlIGV2ZW50IGhhcyBubyBzcGVjaWFsIGhhbmRsaW5nLCBwYXNzIHRocm91Z2hcbiAgICAgICAgICAgIC8vIGRpcmVjdGx5IG9udG8gdGhlIGV2ZW50IGJ1czpcbiAgICAgICAgICAgIGV2ZW50Lm9uKCBsaXN0ZW5lcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9ib2VBcGk7IC8vIGNoYWluaW5nXG4gICAgICB9KSxcblxuICAgICAgLyoqXG4gICAgICAgKiBSZW1vdmUgYW55IGtpbmQgb2YgbGlzdGVuZXIgdGhhdCB0aGUgaW5zdGFuY2UgYXBpIGV4cG9zZXNcbiAgICAgICAqL1xuICAgICAgcmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiggZXZlbnRJZCwgcDIsIHAzICl7XG5cbiAgICAgICAgaWYoIGV2ZW50SWQgPT0gJ2RvbmUnICkge1xuXG4gICAgICAgICAgcm9vdE5vZGVGaW5pc2hlZEV2ZW50LnVuKHAyKTtcblxuICAgICAgICB9IGVsc2UgaWYoIGV2ZW50SWQgPT0gJ25vZGUnIHx8IGV2ZW50SWQgPT0gJ3BhdGgnICkge1xuXG4gICAgICAgICAgLy8gYWxsb3cgcmVtb3ZhbCBvZiBub2RlIGFuZCBwYXRoXG4gICAgICAgICAgb2JvZUJ1cy51bihldmVudElkICsgJzonICsgcDIsIHAzKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIC8vIHdlIGhhdmUgYSBzdGFuZGFyZCBOb2RlLmpzIEV2ZW50RW1pdHRlciAyLWFyZ3VtZW50IGNhbGwuXG4gICAgICAgICAgLy8gVGhlIHNlY29uZCBwYXJhbWV0ZXIgaXMgdGhlIGxpc3RlbmVyLiBUaGlzIG1heSBiZSBhIGNhbGxcbiAgICAgICAgICAvLyB0byByZW1vdmUgYSBmdWxseS1xdWFsaWZpZWQgbm9kZS9wYXRoIGxpc3RlbmVyIGJ1dCByZXF1aXJlc1xuICAgICAgICAgIC8vIG5vIHNwZWNpYWwgaGFuZGxpbmdcbiAgICAgICAgICB2YXIgbGlzdGVuZXIgPSBwMjtcblxuICAgICAgICAgIG9ib2VCdXMoZXZlbnRJZCkudW4obGlzdGVuZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9ib2VBcGk7IC8vIGNoYWluaW5nXG4gICAgICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgYSBjYWxsYmFjaywgd3JhcHBlZCBpbiBhIHRyeS9jYXRjaCBzbyBhcyB0byBub3QgYnJlYWsgdGhlXG4gICAqIGV4ZWN1dGlvbiBvZiBPYm9lIGlmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gKGZhaWwgZXZlbnRzIGFyZVxuICAgKiBmaXJlZCBpbnN0ZWFkKVxuICAgKlxuICAgKiBUaGUgY2FsbGJhY2sgaXMgdXNlZCBhcyB0aGUgbGlzdGVuZXIgaWQgc28gdGhhdCBpdCBjYW4gbGF0ZXIgYmVcbiAgICogcmVtb3ZlZCB1c2luZyAudW4oY2FsbGJhY2spXG4gICAqL1xuICBmdW5jdGlvbiBhZGRQcm90ZWN0ZWRDYWxsYmFjayhldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgb2JvZUJ1cyhldmVudE5hbWUpLm9uKHByb3RlY3RlZENhbGxiYWNrKGNhbGxiYWNrKSwgY2FsbGJhY2spO1xuICAgIHJldHVybiBvYm9lQXBpOyAvLyBjaGFpbmluZ1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIGNhbGxiYWNrIHdoZXJlLCBpZiAuZm9yZ2V0KCkgaXMgY2FsbGVkIGR1cmluZyB0aGUgY2FsbGJhY2snc1xuICAgKiBleGVjdXRpb24sIHRoZSBjYWxsYmFjayB3aWxsIGJlIGRlLXJlZ2lzdGVyZWRcbiAgICovXG4gIGZ1bmN0aW9uIGFkZEZvcmdldHRhYmxlQ2FsbGJhY2soZXZlbnQsIGNhbGxiYWNrLCBsaXN0ZW5lcklkKSB7XG5cbiAgICAvLyBsaXN0ZW5lcklkIGlzIG9wdGlvbmFsIGFuZCBpZiBub3QgZ2l2ZW4sIHRoZSBvcmlnaW5hbFxuICAgIC8vIGNhbGxiYWNrIHdpbGwgYmUgdXNlZFxuICAgIGxpc3RlbmVySWQgPSBsaXN0ZW5lcklkIHx8IGNhbGxiYWNrO1xuXG4gICAgdmFyIHNhZmVDYWxsYmFjayA9IHByb3RlY3RlZENhbGxiYWNrKGNhbGxiYWNrKTtcblxuICAgIGV2ZW50Lm9uKCBmdW5jdGlvbigpIHtcblxuICAgICAgdmFyIGRpc2NhcmQgPSBmYWxzZTtcblxuICAgICAgb2JvZUFwaS5mb3JnZXQgPSBmdW5jdGlvbigpe1xuICAgICAgICBkaXNjYXJkID0gdHJ1ZTtcbiAgICAgIH07XG5cbiAgICAgIGFwcGx5KCBhcmd1bWVudHMsIHNhZmVDYWxsYmFjayApO1xuXG4gICAgICBkZWxldGUgb2JvZUFwaS5mb3JnZXQ7XG5cbiAgICAgIGlmKCBkaXNjYXJkICkge1xuICAgICAgICBldmVudC51bihsaXN0ZW5lcklkKTtcbiAgICAgIH1cbiAgICB9LCBsaXN0ZW5lcklkKTtcblxuICAgIHJldHVybiBvYm9lQXBpOyAvLyBjaGFpbmluZ1xuICB9XG5cbiAgLyoqXG4gICAqICB3cmFwIGEgY2FsbGJhY2sgc28gdGhhdCBpZiBpdCB0aHJvd3MsIE9ib2UuanMgZG9lc24ndCBjcmFzaCBidXQgaW5zdGVhZFxuICAgKiAgdGhyb3cgdGhlIGVycm9yIGluIGFub3RoZXIgZXZlbnQgbG9vcFxuICAgKi9cbiAgZnVuY3Rpb24gcHJvdGVjdGVkQ2FsbGJhY2soIGNhbGxiYWNrICkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHRyeXtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG9ib2VBcGksIGFyZ3VtZW50cyk7XG4gICAgICB9Y2F0Y2goZSkgIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZS5tZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgZnVsbHkgcXVhbGlmaWVkIGV2ZW50IGZvciB3aGVuIGEgcGF0dGVybiBtYXRjaGVzXG4gICAqIGVpdGhlciBhIG5vZGUgb3IgYSBwYXRoXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIHtTdHJpbmd9IGVpdGhlciAnbm9kZScgb3IgJ3BhdGgnXG4gICAqL1xuICBmdW5jdGlvbiBmdWxseVF1YWxpZmllZFBhdHRlcm5NYXRjaEV2ZW50KHR5cGUsIHBhdHRlcm4pIHtcbiAgICByZXR1cm4gb2JvZUJ1cyh0eXBlICsgJzonICsgcGF0dGVybik7XG4gIH1cblxuICBmdW5jdGlvbiB3cmFwQ2FsbGJhY2tUb1N3YXBOb2RlSWZTb21ldGhpbmdSZXR1cm5lZCggY2FsbGJhY2sgKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJldHVyblZhbHVlRnJvbUNhbGxiYWNrID0gY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgICAgaWYoIGRlZmluZWQocmV0dXJuVmFsdWVGcm9tQ2FsbGJhY2spICkge1xuXG4gICAgICAgIGlmKCByZXR1cm5WYWx1ZUZyb21DYWxsYmFjayA9PSBvYm9lLmRyb3AgKSB7XG4gICAgICAgICAgZW1pdE5vZGVEcm9wKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZW1pdE5vZGVTd2FwKHJldHVyblZhbHVlRnJvbUNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFNpbmdsZU5vZGVPclBhdGhMaXN0ZW5lcihldmVudElkLCBwYXR0ZXJuLCBjYWxsYmFjaykge1xuXG4gICAgdmFyIGVmZmVjdGl2ZUNhbGxiYWNrO1xuXG4gICAgaWYoIGV2ZW50SWQgPT0gJ25vZGUnICkge1xuICAgICAgZWZmZWN0aXZlQ2FsbGJhY2sgPSB3cmFwQ2FsbGJhY2tUb1N3YXBOb2RlSWZTb21ldGhpbmdSZXR1cm5lZChjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVmZmVjdGl2ZUNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgfVxuXG4gICAgYWRkRm9yZ2V0dGFibGVDYWxsYmFjayhcbiAgICAgIGZ1bGx5UXVhbGlmaWVkUGF0dGVybk1hdGNoRXZlbnQoZXZlbnRJZCwgcGF0dGVybiksXG4gICAgICBlZmZlY3RpdmVDYWxsYmFjayxcbiAgICAgIGNhbGxiYWNrXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgc2V2ZXJhbCBsaXN0ZW5lcnMgYXQgYSB0aW1lLCBmcm9tIGEgbWFwXG4gICAqL1xuICBmdW5jdGlvbiBhZGRNdWx0aXBsZU5vZGVPclBhdGhMaXN0ZW5lcnMoZXZlbnRJZCwgbGlzdGVuZXJNYXApIHtcblxuICAgIGZvciggdmFyIHBhdHRlcm4gaW4gbGlzdGVuZXJNYXAgKSB7XG4gICAgICBhZGRTaW5nbGVOb2RlT3JQYXRoTGlzdGVuZXIoZXZlbnRJZCwgcGF0dGVybiwgbGlzdGVuZXJNYXBbcGF0dGVybl0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBpbXBsZW1lbnRhdGlvbiBiZWhpbmQgLm9uUGF0aCgpIGFuZCAub25Ob2RlKClcbiAgICovXG4gIGZ1bmN0aW9uIGFkZE5vZGVPclBhdGhMaXN0ZW5lckFwaSggZXZlbnRJZCwganNvblBhdGhPckxpc3RlbmVyTWFwLCBjYWxsYmFjayApe1xuXG4gICAgaWYoIGlzU3RyaW5nKGpzb25QYXRoT3JMaXN0ZW5lck1hcCkgKSB7XG4gICAgICBhZGRTaW5nbGVOb2RlT3JQYXRoTGlzdGVuZXIoZXZlbnRJZCwganNvblBhdGhPckxpc3RlbmVyTWFwLCBjYWxsYmFjayk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgYWRkTXVsdGlwbGVOb2RlT3JQYXRoTGlzdGVuZXJzKGV2ZW50SWQsIGpzb25QYXRoT3JMaXN0ZW5lck1hcCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9ib2VBcGk7IC8vIGNoYWluaW5nXG4gIH1cblxuXG4gIC8vIHNvbWUgaW50ZXJmYWNlIG1ldGhvZHMgYXJlIG9ubHkgZmlsbGVkIGluIGFmdGVyIHdlIHJlY2VpdmVcbiAgLy8gdmFsdWVzIGFuZCBhcmUgbm9vcHMgYmVmb3JlIHRoYXQ6XG4gIG9ib2VCdXMoUk9PVF9QQVRIX0ZPVU5EKS5vbiggZnVuY3Rpb24ocm9vdE5vZGUpIHtcbiAgICBvYm9lQXBpLnJvb3QgPSBmdW5jdG9yKHJvb3ROb2RlKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFdoZW4gY29udGVudCBzdGFydHMgbWFrZSB0aGUgaGVhZGVycyByZWFkYWJsZSB0aHJvdWdoIHRoZVxuICAgKiBpbnN0YW5jZSBBUElcbiAgICovXG4gIG9ib2VCdXMoSFRUUF9TVEFSVCkub24oIGZ1bmN0aW9uKF9zdGF0dXNDb2RlLCBoZWFkZXJzKSB7XG5cbiAgICBvYm9lQXBpLmhlYWRlciA9ICBmdW5jdGlvbihuYW1lKSB7XG4gICAgICByZXR1cm4gbmFtZSA/IGhlYWRlcnNbbmFtZV1cbiAgICAgICAgOiBoZWFkZXJzXG4gICAgICA7XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGFuZCByZXR1cm4gdGhlIHB1YmxpYyBBUEkgb2YgdGhlIE9ib2UgaW5zdGFuY2UgdG8gYmVcbiAgICogcmV0dXJuZWQgdG8gdGhlIGNhbGxpbmcgYXBwbGljYXRpb25cbiAgICovXG4gIHJldHVybiBvYm9lQXBpID0ge1xuICAgIG9uICAgICAgICAgICAgIDogYWRkTGlzdGVuZXIsXG4gICAgYWRkTGlzdGVuZXIgICAgOiBhZGRMaXN0ZW5lcixcbiAgICByZW1vdmVMaXN0ZW5lciA6IHJlbW92ZUxpc3RlbmVyLFxuICAgIGVtaXQgICAgICAgICAgIDogb2JvZUJ1cy5lbWl0LFxuXG4gICAgbm9kZSAgICAgICAgICAgOiBwYXJ0aWFsQ29tcGxldGUoYWRkTm9kZU9yUGF0aExpc3RlbmVyQXBpLCAnbm9kZScpLFxuICAgIHBhdGggICAgICAgICAgIDogcGFydGlhbENvbXBsZXRlKGFkZE5vZGVPclBhdGhMaXN0ZW5lckFwaSwgJ3BhdGgnKSxcblxuICAgIGRvbmUgICAgICAgICAgIDogcGFydGlhbENvbXBsZXRlKGFkZEZvcmdldHRhYmxlQ2FsbGJhY2ssIHJvb3ROb2RlRmluaXNoZWRFdmVudCksXG4gICAgc3RhcnQgICAgICAgICAgOiBwYXJ0aWFsQ29tcGxldGUoYWRkUHJvdGVjdGVkQ2FsbGJhY2ssIEhUVFBfU1RBUlQgKSxcblxuICAgIC8vIGZhaWwgZG9lc24ndCB1c2UgcHJvdGVjdGVkQ2FsbGJhY2sgYmVjYXVzZVxuICAgIC8vIGNvdWxkIGxlYWQgdG8gbm9uLXRlcm1pbmF0aW5nIGxvb3BzXG4gICAgZmFpbCAgICAgICAgICAgOiBvYm9lQnVzKEZBSUxfRVZFTlQpLm9uLFxuXG4gICAgLy8gcHVibGljIGFwaSBjYWxsaW5nIGFib3J0IGZpcmVzIHRoZSBBQk9SVElORyBldmVudFxuICAgIGFib3J0ICAgICAgICAgIDogb2JvZUJ1cyhBQk9SVElORykuZW1pdCxcblxuICAgIC8vIGluaXRpYWxseSByZXR1cm4gbm90aGluZyBmb3IgaGVhZGVyIGFuZCByb290XG4gICAgaGVhZGVyICAgICAgICAgOiBub29wLFxuICAgIHJvb3QgICAgICAgICAgIDogbm9vcCxcblxuICAgIHNvdXJjZSAgICAgICAgIDogY29udGVudFNvdXJjZVxuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgZmlsZSBzaXRzIGp1c3QgYmVoaW5kIHRoZSBBUEkgd2hpY2ggaXMgdXNlZCB0byBhdHRhaW4gYSBuZXdcbiAqIE9ib2UgaW5zdGFuY2UuIEl0IGNyZWF0ZXMgdGhlIG5ldyBjb21wb25lbnRzIHRoYXQgYXJlIHJlcXVpcmVkXG4gKiBhbmQgaW50cm9kdWNlcyB0aGVtIHRvIGVhY2ggb3RoZXIuXG4gKi9cblxuZnVuY3Rpb24gd2lyZSAoaHR0cE1ldGhvZE5hbWUsIGNvbnRlbnRTb3VyY2UsIGJvZHksIGhlYWRlcnMsIHdpdGhDcmVkZW50aWFscyl7XG5cbiAgIHZhciBvYm9lQnVzID0gcHViU3ViKCk7XG4gICBcbiAgIC8vIFdpcmUgdGhlIGlucHV0IHN0cmVhbSBpbiBpZiB3ZSBhcmUgZ2l2ZW4gYSBjb250ZW50IHNvdXJjZS5cbiAgIC8vIFRoaXMgd2lsbCB1c3VhbGx5IGJlIHRoZSBjYXNlLiBJZiBub3QsIHRoZSBpbnN0YW5jZSBjcmVhdGVkXG4gICAvLyB3aWxsIGhhdmUgdG8gYmUgcGFzc2VkIGNvbnRlbnQgZnJvbSBhbiBleHRlcm5hbCBzb3VyY2UuXG4gIFxuICAgaWYoIGNvbnRlbnRTb3VyY2UgKSB7XG5cbiAgICAgIHN0cmVhbWluZ0h0dHAoIG9ib2VCdXMsXG4gICAgICAgICAgICAgICAgICAgICBodHRwVHJhbnNwb3J0KCksIFxuICAgICAgICAgICAgICAgICAgICAgaHR0cE1ldGhvZE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICBjb250ZW50U291cmNlLFxuICAgICAgICAgICAgICAgICAgICAgYm9keSxcbiAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHNcbiAgICAgICk7XG4gICB9XG5cbiAgIGNsYXJpbmV0KG9ib2VCdXMpO1xuXG4gICBhc2NlbnRNYW5hZ2VyKG9ib2VCdXMsIGluY3JlbWVudGFsQ29udGVudEJ1aWxkZXIob2JvZUJ1cykpO1xuICAgICAgXG4gICBwYXR0ZXJuQWRhcHRlcihvYm9lQnVzLCBqc29uUGF0aENvbXBpbGVyKTsgICAgICBcbiAgICAgIFxuICAgcmV0dXJuIGluc3RhbmNlQXBpKG9ib2VCdXMsIGNvbnRlbnRTb3VyY2UpO1xufVxuXG5mdW5jdGlvbiBhcHBseURlZmF1bHRzKCBwYXNzdGhyb3VnaCwgdXJsLCBodHRwTWV0aG9kTmFtZSwgYm9keSwgaGVhZGVycywgd2l0aENyZWRlbnRpYWxzLCBjYWNoZWQgKXtcblxuICAgaGVhZGVycyA9IGhlYWRlcnMgP1xuICAgICAgLy8gU2hhbGxvdy1jbG9uZSB0aGUgaGVhZGVycyBhcnJheS4gVGhpcyBhbGxvd3MgaXQgdG8gYmVcbiAgICAgIC8vIG1vZGlmaWVkIHdpdGhvdXQgc2lkZSBlZmZlY3RzIHRvIHRoZSBjYWxsZXIuIFdlIGRvbid0XG4gICAgICAvLyB3YW50IHRvIGNoYW5nZSBvYmplY3RzIHRoYXQgdGhlIHVzZXIgcGFzc2VzIGluLlxuICAgICAgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShoZWFkZXJzKSlcbiAgICAgIDoge307XG5cbiAgIGlmKCBib2R5ICkge1xuICAgICAgaWYoICFpc1N0cmluZyhib2R5KSApIHtcblxuICAgICAgICAgLy8gSWYgdGhlIGJvZHkgaXMgbm90IGEgc3RyaW5nLCBzdHJpbmdpZnkgaXQuIFRoaXMgYWxsb3dzIG9iamVjdHMgdG9cbiAgICAgICAgIC8vIGJlIGdpdmVuIHdoaWNoIHdpbGwgYmUgc2VudCBhcyBKU09OLlxuICAgICAgICAgYm9keSA9IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xuXG4gICAgICAgICAvLyBEZWZhdWx0IENvbnRlbnQtVHlwZSB0byBKU09OIHVubGVzcyBnaXZlbiBvdGhlcndpc2UuXG4gICAgICAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddIHx8ICdhcHBsaWNhdGlvbi9qc29uJztcbiAgICAgIH1cbiAgICAgIGhlYWRlcnNbJ0NvbnRlbnQtTGVuZ3RoJ10gPSBoZWFkZXJzWydDb250ZW50LUxlbmd0aCddIHx8IGJvZHkubGVuZ3RoO1xuICAgfSBlbHNlIHtcbiAgICAgIGJvZHkgPSBudWxsO1xuICAgfVxuXG4gICAvLyBzdXBwb3J0IGNhY2hlIGJ1c3RpbmcgbGlrZSBqUXVlcnkuYWpheCh7Y2FjaGU6ZmFsc2V9KVxuICAgZnVuY3Rpb24gbW9kaWZpZWRVcmwoYmFzZVVybCwgY2FjaGVkKSB7XG5cbiAgICAgIGlmKCBjYWNoZWQgPT09IGZhbHNlICkge1xuXG4gICAgICAgICBpZiggYmFzZVVybC5pbmRleE9mKCc/JykgPT0gLTEgKSB7XG4gICAgICAgICAgICBiYXNlVXJsICs9ICc/JztcbiAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBiYXNlVXJsICs9ICcmJztcbiAgICAgICAgIH1cblxuICAgICAgICAgYmFzZVVybCArPSAnXz0nICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYmFzZVVybDtcbiAgIH1cblxuICAgcmV0dXJuIHBhc3N0aHJvdWdoKCBodHRwTWV0aG9kTmFtZSB8fCAnR0VUJywgbW9kaWZpZWRVcmwodXJsLCBjYWNoZWQpLCBib2R5LCBoZWFkZXJzLCB3aXRoQ3JlZGVudGlhbHMgfHwgZmFsc2UgKTtcbn1cblxuLy8gZXhwb3J0IHB1YmxpYyBBUElcbmZ1bmN0aW9uIG9ib2UoYXJnMSkge1xuXG4gICAvLyBXZSB1c2UgZHVjay10eXBpbmcgdG8gZGV0ZWN0IGlmIHRoZSBwYXJhbWV0ZXIgZ2l2ZW4gaXMgYSBzdHJlYW0sIHdpdGggdGhlXG4gICAvLyBiZWxvdyBsaXN0IG9mIHBhcmFtZXRlcnMuXG4gICAvLyBVbnBpcGUgYW5kIHVuc2hpZnQgd291bGQgbm9ybWFsbHkgYmUgcHJlc2VudCBvbiBhIHN0cmVhbSBidXQgdGhpcyBicmVha3NcbiAgIC8vIGNvbXBhdGliaWxpdHkgd2l0aCBSZXF1ZXN0IHN0cmVhbXMuXG4gICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ppbWhpZ3Nvbi9vYm9lLmpzL2lzc3Vlcy82NVxuICAgXG4gICB2YXIgbm9kZVN0cmVhbU1ldGhvZE5hbWVzID0gbGlzdCgncmVzdW1lJywgJ3BhdXNlJywgJ3BpcGUnKSxcbiAgICAgICBpc1N0cmVhbSA9IHBhcnRpYWxDb21wbGV0ZShcbiAgICAgICAgICAgICAgICAgICAgIGhhc0FsbFByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICAgICwgIG5vZGVTdHJlYW1NZXRob2ROYW1lc1xuICAgICAgICAgICAgICAgICAgKTtcbiAgIFxuICAgaWYoIGFyZzEgKSB7XG4gICAgICBpZiAoaXNTdHJlYW0oYXJnMSkgfHwgaXNTdHJpbmcoYXJnMSkpIHtcblxuICAgICAgICAgLy8gIHNpbXBsZSB2ZXJzaW9uIGZvciBHRVRzLiBTaWduYXR1cmUgaXM6XG4gICAgICAgICAvLyAgICBvYm9lKCB1cmwgKVxuICAgICAgICAgLy8gIG9yLCB1bmRlciBub2RlOlxuICAgICAgICAgLy8gICAgb2JvZSggcmVhZGFibGVTdHJlYW0gKVxuICAgICAgICAgcmV0dXJuIGFwcGx5RGVmYXVsdHMoXG4gICAgICAgICAgICB3aXJlLFxuICAgICAgICAgICAgYXJnMSAvLyB1cmxcbiAgICAgICAgICk7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgIC8vIG1ldGhvZCBzaWduYXR1cmUgaXM6XG4gICAgICAgICAvLyAgICBvYm9lKHttZXRob2Q6bSwgdXJsOnUsIGJvZHk6YiwgaGVhZGVyczp7Li4ufX0pXG5cbiAgICAgICAgIHJldHVybiBhcHBseURlZmF1bHRzKFxuICAgICAgICAgICAgd2lyZSxcbiAgICAgICAgICAgIGFyZzEudXJsLFxuICAgICAgICAgICAgYXJnMS5tZXRob2QsXG4gICAgICAgICAgICBhcmcxLmJvZHksXG4gICAgICAgICAgICBhcmcxLmhlYWRlcnMsXG4gICAgICAgICAgICBhcmcxLndpdGhDcmVkZW50aWFscyxcbiAgICAgICAgICAgIGFyZzEuY2FjaGVkXG4gICAgICAgICApO1xuICAgICAgICAgXG4gICAgICB9XG4gICB9IGVsc2Uge1xuICAgICAgLy8gd2lyZSB1cCBhIG5vLUFKQVgsIG5vLXN0cmVhbSBPYm9lLiBXaWxsIGhhdmUgdG8gaGF2ZSBjb250ZW50IFxuICAgICAgLy8gZmVkIGluIGV4dGVybmFsbHkgYW5kIHVzaW5nIC5lbWl0LlxuICAgICAgcmV0dXJuIHdpcmUoKTtcbiAgIH1cbn1cblxuLyogb2JvZS5kcm9wIGlzIGEgc3BlY2lhbCB2YWx1ZS4gSWYgYSBub2RlIGNhbGxiYWNrIHJldHVybnMgdGhpcyB2YWx1ZSB0aGVcbiAgIHBhcnNlZCBub2RlIGlzIGRlbGV0ZWQgZnJvbSB0aGUgSlNPTlxuICovXG5vYm9lLmRyb3AgPSBmdW5jdGlvbigpIHtcbiAgIHJldHVybiBvYm9lLmRyb3A7XG59O1xuXG5cbiAgIGlmICggdHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQgKSB7XG4gICAgICBkZWZpbmUoIFwib2JvZVwiLCBbXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gb2JvZTsgfSApO1xuICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIG1vZHVsZS5leHBvcnRzID0gb2JvZTtcbiAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cub2JvZSA9IG9ib2U7XG4gICB9XG59KSgoZnVuY3Rpb24oKXtcbiAgIC8vIEFjY2VzcyB0byB0aGUgd2luZG93IG9iamVjdCB0aHJvd3MgYW4gZXhjZXB0aW9uIGluIEhUTUw1IHdlYiB3b3JrZXJzIHNvXG4gICAvLyBwb2ludCBpdCB0byBcInNlbGZcIiBpZiBpdCBydW5zIGluIGEgd2ViIHdvcmtlclxuICAgICAgdHJ5IHtcbiAgICAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH1cbiAgIH0oKSksIE9iamVjdCwgQXJyYXksIEVycm9yLCBKU09OKTtcbiIsImV4cG9ydHMuZW5kaWFubmVzcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdMRScgfTtcblxuZXhwb3J0cy5ob3N0bmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodHlwZW9mIGxvY2F0aW9uICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gbG9jYXRpb24uaG9zdG5hbWVcbiAgICB9XG4gICAgZWxzZSByZXR1cm4gJyc7XG59O1xuXG5leHBvcnRzLmxvYWRhdmcgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXSB9O1xuXG5leHBvcnRzLnVwdGltZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDAgfTtcblxuZXhwb3J0cy5mcmVlbWVtID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBOdW1iZXIuTUFYX1ZBTFVFO1xufTtcblxuZXhwb3J0cy50b3RhbG1lbSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gTnVtYmVyLk1BWF9WQUxVRTtcbn07XG5cbmV4cG9ydHMuY3B1cyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtdIH07XG5cbmV4cG9ydHMudHlwZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdCcm93c2VyJyB9O1xuXG5leHBvcnRzLnJlbGVhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IuYXBwVmVyc2lvbjtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xufTtcblxuZXhwb3J0cy5uZXR3b3JrSW50ZXJmYWNlc1xuPSBleHBvcnRzLmdldE5ldHdvcmtJbnRlcmZhY2VzXG49IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHt9IH07XG5cbmV4cG9ydHMuYXJjaCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdqYXZhc2NyaXB0JyB9O1xuXG5leHBvcnRzLnBsYXRmb3JtID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJ2Jyb3dzZXInIH07XG5cbmV4cG9ydHMudG1wZGlyID0gZXhwb3J0cy50bXBEaXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICcvdG1wJztcbn07XG5cbmV4cG9ydHMuRU9MID0gJ1xcbic7XG5cbmV4cG9ydHMuaG9tZWRpciA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuICcvJ1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=