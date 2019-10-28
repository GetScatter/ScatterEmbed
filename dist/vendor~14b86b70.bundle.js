(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "0BtN":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=22)}([function(e,t){e.exports=__webpack_require__("o0o1")},function(e,t){e.exports=__webpack_require__("yXPU")},function(e,t){e.exports=__webpack_require__("lwsE")},function(e,t){e.exports=__webpack_require__("W8MJ")},function(e,t){e.exports=__webpack_require__("MVZn")},function(e,t){e.exports=__webpack_require__("lSNA")},function(e,t){e.exports=__webpack_require__("RIqP")},function(e,t){e.exports=__webpack_require__("J4zp")},function(e,t){e.exports=__webpack_require__("cDf5")},function(e,t){e.exports=__webpack_require__("g2/l")},function(e,t){e.exports=__webpack_require__("5+qj")},function(e,t){e.exports=__webpack_require__("PJYZ")},function(e,t){e.exports=__webpack_require__("jWEn")},function(e,t){e.exports=__webpack_require__("MzeL")},function(e,t){e.exports=__webpack_require__("a1gu")},function(e,t){e.exports=__webpack_require__("Nsbk")},function(e,t){e.exports=__webpack_require__("7W2i")},function(e,t){e.exports=__webpack_require__("vDqi")},function(e,t){e.exports=__webpack_require__("+QwO")},function(e,t){e.exports=__webpack_require__("uhBA")},function(e){e.exports={a:"2.7.1"}},function(e,t){e.exports=__webpack_require__("s4NR")},function(e,t,n){"use strict";n.r(t);var r={};n.r(r),n.d(r,"byte2hexStr",function(){return C}),n.d(r,"bytesToString",function(){return E}),n.d(r,"hextoString",function(){return q}),n.d(r,"byteArray2hexStr",function(){return O}),n.d(r,"base64DecodeFromString",function(){return D}),n.d(r,"base64EncodeToString",function(){return K});var i={};n.r(i),n.d(i,"bin2String",function(){return M}),n.d(i,"arrayEquals",function(){return J}),n.d(i,"stringToBytes",function(){return G}),n.d(i,"byte2hexStr",function(){return C}),n.d(i,"bytesToString",function(){return E}),n.d(i,"hextoString",function(){return q}),n.d(i,"byteArray2hexStr",function(){return O}),n.d(i,"base64DecodeFromString",function(){return D}),n.d(i,"base64EncodeToString",function(){return K}),n.d(i,"hexChar2byte",function(){return Y}),n.d(i,"isHexChar",function(){return X}),n.d(i,"hexStr2byteArray",function(){return Z}),n.d(i,"strToDate",function(){return $}),n.d(i,"isNumber",function(){return Q}),n.d(i,"getStringType",function(){return ee});var s={};n.r(s),n.d(s,"encode58",function(){return se}),n.d(s,"decode58",function(){return oe});var o={};n.r(o),n.d(o,"getBase58CheckAddress",function(){return pe}),n.d(o,"decodeBase58Address",function(){return ge}),n.d(o,"signTransaction",function(){return be}),n.d(o,"arrayToBase64String",function(){return me}),n.d(o,"signBytes",function(){return ye}),n.d(o,"getRowBytesFromTransactionBase64",function(){return ke}),n.d(o,"genPriKey",function(){return xe}),n.d(o,"computeAddress",function(){return we}),n.d(o,"getAddressFromPriKey",function(){return Ie}),n.d(o,"decode58Check",function(){return We}),n.d(o,"isAddressValid",function(){return Ae}),n.d(o,"getBase58CheckAddressFromPriKeyBase64String",function(){return Pe}),n.d(o,"getHexStrAddressFromPriKeyBase64String",function(){return _e}),n.d(o,"getAddressFromPriKeyBase64String",function(){return Ne}),n.d(o,"getPubKeyFromPriKey",function(){return Se}),n.d(o,"ECKeySign",function(){return Te}),n.d(o,"SHA256",function(){return je}),n.d(o,"passwordToAddress",function(){return Be}),n.d(o,"pkToAddress",function(){return Fe});var a={};n.r(a),n.d(a,"generateAccount",function(){return Ce});var u={};n.r(u),n.d(u,"decodeParams",function(){return qe}),n.d(u,"encodeParams",function(){return Oe});var c=n(0),d=n.n(c),l=n(1),h=n.n(l),f=n(8),v=n.n(f),p=n(2),g=n.n(p),b=n(3),m=n.n(b),y=n(14),k=n.n(y),x=n(15),w=n.n(x),I=n(11),W=n.n(I),A=n(16),P=n.n(A),_=n(5),N=n.n(_),S=n(17),T=n.n(S),j=n(4),B=n.n(j);function F(){var e=this;this._keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",this.encode=function(t){for(var n,r,i,s,o,a,u,c="",d=0;d<t.length;)s=(n=t.charCodeAt(d++))>>2,o=(3&n)<<4|(r=t.charCodeAt(d++))>>4,a=(15&r)<<2|(i=t.charCodeAt(d++))>>6,u=63&i,isNaN(r)?a=u=64:isNaN(i)&&(u=64),c=c+e._keyStr.charAt(s)+e._keyStr.charAt(o)+e._keyStr.charAt(a)+e._keyStr.charAt(u);return c},this.encodeIgnoreUtf8=function(t){for(var n,r,i,s,o,a,u,c="",d=0;d<t.length;)s=(n=t[d++])>>2,o=(3&n)<<4|(r=t[d++])>>4,a=(15&r)<<2|(i=t[d++])>>6,u=63&i,isNaN(r)?a=u=64:isNaN(i)&&(u=64),c=c+e._keyStr.charAt(s)+e._keyStr.charAt(o)+e._keyStr.charAt(a)+e._keyStr.charAt(u);return c},this.decode=function(t){var n,r,i,s,o,a,u="",c=0;for(t=t.replace(/[^A-Za-z0-9\+\/\=]/g,"");c<t.length;)n=e._keyStr.indexOf(t.charAt(c++))<<2|(s=e._keyStr.indexOf(t.charAt(c++)))>>4,r=(15&s)<<4|(o=e._keyStr.indexOf(t.charAt(c++)))>>2,i=(3&o)<<6|(a=e._keyStr.indexOf(t.charAt(c++))),u+=String.fromCharCode(n),64!=o&&(u+=String.fromCharCode(r)),64!=a&&(u+=String.fromCharCode(i));return e._utf8_decode(u)},this.decodeToByteArray=function(t){var n,r,i,s,o,a,u="",c=0;for(t=t.replace(/[^A-Za-z0-9\+\/\=]/g,"");c<t.length;)n=e._keyStr.indexOf(t.charAt(c++))<<2|(s=e._keyStr.indexOf(t.charAt(c++)))>>4,r=(15&s)<<4|(o=e._keyStr.indexOf(t.charAt(c++)))>>2,i=(3&o)<<6|(a=e._keyStr.indexOf(t.charAt(c++))),u+=String.fromCharCode(n),64!=o&&(u+=String.fromCharCode(r)),64!=a&&(u+=String.fromCharCode(i));return e._out2ByteArray(u)},this._out2ByteArray=function(e){for(var t=new Array(e.length),n=0,r=0;n<e.length;)r=e.charCodeAt(n),t[n]=r,n++;return t},this._utf8_encode=function(e){e=e.replace(/\r\n/g,"\n");for(var t="",n=0;n<e.length;n++){var r=e.charCodeAt(n);r<128?t+=String.fromCharCode(r):r>127&&r<2048?(t+=String.fromCharCode(r>>6|192),t+=String.fromCharCode(63&r|128)):(t+=String.fromCharCode(r>>12|224),t+=String.fromCharCode(r>>6&63|128),t+=String.fromCharCode(63&r|128))}return t},this._utf8_decode=function(e){for(var t="",n=0,r=0,i=0,s=0;n<e.length;)(r=e.charCodeAt(n))<128?(t+=String.fromCharCode(r),n++):r>191&&r<224?(i=e.charCodeAt(n+1),t+=String.fromCharCode((31&r)<<6|63&i),n+=2):(i=e.charCodeAt(n+1),s=e.charCodeAt(n+2),t+=String.fromCharCode((15&r)<<12|(63&i)<<6|63&s),n+=3);return t}}function C(e){if("number"!=typeof e)throw new Error("Input must be a number");if(e<0||e>255)throw new Error("Input must be a byte");var t="";return t+="0123456789ABCDEF".charAt(e>>4),t+="0123456789ABCDEF".charAt(15&e)}function E(e){if("string"==typeof e)return e;for(var t="",n=0;n<e.length;n++){var r=e[n].toString(2),i=r.match(/^1+?(?=0)/);if(i&&8===r.length){for(var s=i[0].length,o=e[n].toString(2).slice(7-s),a=1;a<s;a++)o+=e[a+n].toString(2).slice(2);t+=String.fromCharCode(parseInt(o,2)),n+=s-1}else t+=String.fromCharCode(e[n])}return t}function q(e){for(var t=e.replace(/^0x/,"").split(""),n="",r=0;r<t.length/2;r++){var i="0x".concat(t[2*r]).concat(t[2*r+1]);n+=String.fromCharCode(i)}return n}function O(e){for(var t="",n=0;n<e.length;n++)t+=C(e[n]);return t}function D(e){return(new F).decodeToByteArray(e)}function K(e){return(new F).encodeIgnoreUtf8(e)}var H=n(6),R=n.n(H),V=34,U="41",L=65,z=/^(41)/;function M(e){return E(e)}function J(e,t,n){if(e.length!=t.length)return!1;var r;for(r=0;r<e.length;r++)if(n){if(e[r]!=t[r])return!1}else if(JSON.stringify(e[r])!=JSON.stringify(t[r]))return!1;return!0}function G(e){if("string"!=typeof e)throw new Error("The passed string is not a string");var t,n,r=new Array;t=e.length;for(var i=0;i<t;i++)(n=e.charCodeAt(i))>=65536&&n<=1114111?(r.push(n>>18&7|240),r.push(n>>12&63|128),r.push(n>>6&63|128),r.push(63&n|128)):n>=2048&&n<=65535?(r.push(n>>12&15|224),r.push(n>>6&63|128),r.push(63&n|128)):n>=128&&n<=2047?(r.push(n>>6&31|192),r.push(63&n|128)):r.push(255&n);return r}function Y(e){var t;if(e>="A"&&e<="F"?t=e.charCodeAt(0)-"A".charCodeAt(0)+10:e>="a"&&e<="f"?t=e.charCodeAt(0)-"a".charCodeAt(0)+10:e>="0"&&e<="9"&&(t=e.charCodeAt(0)-"0".charCodeAt(0)),"number"==typeof t)return t;throw new Error("The passed hex char is not a valid hex char")}function X(e){return e>="A"&&e<="F"||e>="a"&&e<="f"||e>="0"&&e<="9"?1:0}function Z(e){if("string"!=typeof e)throw new Error("The passed string is not a string");for(var t=Array(),n=0,r=0,i=0,s=0;s<e.length;s++){var o=e.charAt(s);if(!X(o))throw new Error("The passed hex char is not a valid hex string");n<<=4,n+=Y(o),0==++r%2&&(t[i++]=n,n=0)}return t}function $(e){if(!/^\d{4}-\d{2}-\d{2}( \d{2}-\d{2}-\d{2}|)/.test(e))throw new Error("The passed date string is not valid");var t=e.split(" "),n=t[0].split("-"),r=parseInt(n[0],10),i=parseInt(n[1],10)-1,s=parseInt(n[2],10);if(t.length>1){var o=t[1].split("-"),a=parseInt(o[0],10),u=parseInt(o[1],10),c=parseInt(o[2],10);return new Date(r,i,s,a,u,c)}return new Date(r,i,s)}function Q(e){return e>="0"&&e<="9"?1:0}function ee(e){if(null==e)return-1;if("string"!=typeof e)return-1;if(0==e.length||""==e)return-1;var t=0;if(40==e.length)for(;t<40;t++){if(!X(e.charAt(t)))break}if(40==t)return 1;for(t=0;t<e.length;t++){if(!Q(e.charAt(t)))break}if(t==e.length)return 2;for(t=0;t<e.length;t++){if(e.charAt(t)>" ")return 3}return-1}for(var te="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",ne={},re=0;re<te.length;re++)ne[te.charAt(re)]=re;var ie=58;function se(e){if(0===e.length)return"";var t,n,r=[0];for(t=0;t<e.length;t++){for(n=0;n<r.length;n++)r[n]<<=8;r[0]+=e[t];var i=0;for(n=0;n<r.length;++n)r[n]+=i,i=r[n]/ie|0,r[n]%=ie;for(;i;)r.push(i%ie),i=i/ie|0}for(t=0;0===e[t]&&t<e.length-1;t++)r.push(0);return r.reverse().map(function(e){return te[e]}).join("")}function oe(e){if(0===e.length)return[];var t,n,r=[0];for(t=0;t<e.length;t++){var i=e[t];if(!(i in ne))throw new Error("Non-base58 character");for(n=0;n<r.length;n++)r[n]*=ie;r[0]+=ne[i];var s=0;for(n=0;n<r.length;++n)r[n]+=s,s=r[n]>>8,r[n]&=255;for(;s;)r.push(255&s),s>>=8}for(t=0;"1"===e[t]&&t<e.length-1;t++)r.push(0);return r.reverse()}var ae=n(13),ue=n(10),ce=ue.utils.keccak256,de=ue.utils.sha256,le=ue.utils.toUtf8Bytes,he=ue.utils.recoverAddress,fe=ue.utils.SigningKey,ve=ue.utils.AbiCoder;function pe(e){var t=je(e),n=je(t).slice(0,4);return se(n=e.concat(n))}function ge(e){if("string"!=typeof e)return!1;if(e.length<=4)return!1;var t=oe(e);if(e.length<=4)return!1;var n=t.length-4,r=t.slice(n),i=je(t=t.slice(0,n)),s=je(i).slice(0,4);if(r[0]==s[0]&&r[1]==s[1]&&r[2]==s[2]&&r[3]==s[3])return t;throw new Error("Invalid address provided")}function be(e,t){"string"==typeof e&&(e=Z(e));var n=Te(Z(t.txID),e);return Array.isArray(t.signature)?t.signature.includes(n)||t.signature.push(n):t.signature=[n],t}function me(e){return btoa(String.fromCharCode.apply(String,R()(e)))}function ye(e,t){return"string"==typeof e&&(e=Z(e)),Te(je(t),e)}function ke(e){var t=D(e);return proto.protocol.Transaction.deserializeBinary(t).getRawData().serializeBinary()}function xe(){for(var e=new ae.ec("secp256k1").genKeyPair().getPrivate().toString("hex");e.length<64;)e="0".concat(e);return Z(e)}function we(e){65===e.length&&(e=e.slice(1));var t=ce(e).toString().substring(2);return Z(U+t.substring(24))}function Ie(e){return we(Se(e))}function We(e){var t=oe(e);if(t.length<=4)return!1;var n=t.slice(0,t.length-4),r=je(n),i=je(r);return i[0]===t[n.length]&&i[1]===t[n.length+1]&&i[2]===t[n.length+2]&&i[3]===t[n.length+3]&&n}function Ae(e){if("string"!=typeof e)return!1;if(e.length!==V)return!1;var t=oe(e);if(25!==t.length)return!1;if(t[0]!==L)return!1;var n=t.slice(21),r=je(t=t.slice(0,21)),i=je(r).slice(0,4);return n[0]==i[0]&&n[1]==i[1]&&n[2]==i[2]&&n[3]==i[3]}function Pe(e){return pe(we(Se(D(e))))}function _e(e){return O(we(Se(D(e))))}function Ne(e){return K(we(Se(D(e))))}function Se(e){for(var t=new ae.ec("secp256k1").keyFromPrivate(e,"bytes").getPublic(),n=t.x,r=t.y,i=n.toString("hex");i.length<64;)i="0".concat(i);for(var s=r.toString("hex");s.length<64;)s="0".concat(s);return Z("04".concat(i).concat(s))}function Te(e,t){for(var n=new ae.ec("secp256k1").keyFromPrivate(t,"bytes").sign(e),r=n.r,i=n.s,s=n.recoveryParam,o=r.toString("hex");o.length<64;)o="0".concat(o);for(var a=i.toString("hex");a.length<64;)a="0".concat(a);return o+a+C(s)}function je(e){var t=O(e);return Z(de("0x"+t).replace(/^0x/,""))}function Be(e){return pe(Ie(D(e)))}function Fe(e){return pe(Ie(Z(e)))}function Ce(){var e=xe(),t=Se(e),n=Ie(e);return{privateKey:O(e),publicKey:O(t),address:{base58:pe(n),hex:O(n)}}}var Ee=new ve;function qe(e,t,n,r){if(n&&"boolean"!=typeof n||(r=n,n=t,t=e,e=[]),r&&n.replace(/^0x/,"").length%64==8&&(n="0x"+n.replace(/^0x/,"").substring(8)),n.replace(/^0x/,"").length%64)throw new Error("The encoded string is not valid. Its length must be a multiple of 64.");return t=t.map(function(e){return/trcToken/.test(e)&&(e=e.replace(/trcToken/,"uint256")),e}),Ee.decode(t,n).reduce(function(n,r,i){return"address"==t[i]&&(r=U+r.substr(2).toLowerCase()),e.length?n[e[i]]=r:n.push(r),n},e.length?{}:[])}function Oe(e,t){for(var n=0;n<e.length;n++)"address"===e[n]&&(t[n]=pt.address.toHex(t[n]).replace(z,"0x"));return Ee.encode(e,t)}var De,Ke=n(18),He=n.n(Ke),Re=n(9),Ve=n.n(Re),Ue={isValidURL:function(e){return"string"==typeof e&&He.a.isURL(e.toString(),{protocols:["http","https"],require_tld:!1})},isObject:function(e){return e===Object(e)&&"[object Array]"!==Object.prototype.toString.call(e)},isArray:function(e){return Array.isArray(e)},isJson:function(e){try{return!!JSON.parse(e)}catch(e){return!1}},isBoolean:function(e){return"boolean"==typeof e},isBigNumber:function(e){return e&&(e instanceof Ve.a||e.constructor&&"BigNumber"===e.constructor.name)},isString:function(e){return"string"==typeof e||e&&e.constructor&&"String"===e.constructor.name},isFunction:function(e){return"function"==typeof e},isHex:function(e){return"string"==typeof e&&!isNaN(parseInt(e,16))&&/^(0x|)[a-fA-F0-9]+$/.test(e)},isInteger:function(e){return null!==e&&Number.isInteger(Number(e))},hasProperty:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},hasProperties:function(e){for(var t=this,n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];return r.length&&!r.map(function(n){return t.hasProperty(e,n)}).includes(!1)},injectPromise:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return new Promise(function(t,r){e.apply(void 0,n.concat([function(e,n){e?r(e):t(n)}]))})},promiseInjector:function(e){var t=this;return function(n){for(var r=arguments.length,i=new Array(r>1?r-1:0),s=1;s<r;s++)i[s-1]=arguments[s];return t.injectPromise.apply(t,[n.bind(e)].concat(i))}},mapEvent:function(e){var t={block:e.block_number,timestamp:e.block_timestamp,contract:e.contract_address,name:e.event_name,transaction:e.transaction_id,result:e.result,resourceNode:e.resource_Node||(e._unconfirmed?"fullNode":"solidityNode")};return e._unconfirmed&&(t.unconfirmed=e._unconfirmed),e._fingerprint&&(t.fingerprint=e._fingerprint),t},parseEvent:function(e,t){var n=t.inputs;if(!e.result)return e;if(this.isObject(e.result))for(var r=0;r<n.length;r++){var i=n[r];"address"==i.type&&i.name in e.result&&(e.result[i.name]=U+e.result[i.name].substr(2).toLowerCase())}else this.isArray(e.result)&&(e.result=e.result.reduce(function(e,t,r){var i=n[r],s=i.name;return"address"==i.type&&(t=U+t.substr(2).toLowerCase()),e[s]=t,e},{}));return e},padLeft:function(e,t,n){for(var r=e.toString();r.length<n;)r=t+r;return r},isNotNullOrUndefined:function(e){return null!=e},sleep:function(){var e=h()(d.a.mark(function e(){var t,n=arguments;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:1e3,e.abrupt("return",new Promise(function(e){return setTimeout(e,t)}));case 2:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()},Le=B()({},Ue,{code:i,accounts:a,base58:s,bytes:r,crypto:o,abi:u}),ze={HttpProvider:function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e4,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=arguments.length>3&&void 0!==arguments[3]&&arguments[3],s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"/";if(g()(this,e),!Le.isValidURL(t))throw new Error("Invalid URL provided to HttpProvider");if(isNaN(n)||n<0)throw new Error("Invalid timeout duration provided");if(!Le.isObject(s))throw new Error("Invalid headers object provided");t=t.replace(/\/+$/,""),this.host=t,this.timeout=n,this.user=r,this.password=i,this.headers=s,this.statusPage=o,this.instance=T.a.create({baseURL:t,timeout:n,headers:s,auth:r&&{user:r,password:i}})}return m()(e,[{key:"setStatusPage",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/";this.statusPage=e}},{key:"isConnected",value:function(){var e=h()(d.a.mark(function e(){var t,n=arguments;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:this.statusPage,e.abrupt("return",this.request(t).then(function(e){return Le.hasProperties(e,"blockID","block_header")}).catch(function(){return!1}));case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"request",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"get";return n=n.toLowerCase(),this.instance.request({data:"post"==n&&Object.keys(t).length?t:null,params:"get"==n&&t,url:e,method:n}).then(function(e){return e.data})}}]),e}()},Me=n(19),Je=n.n(Me),Ge=n(20),Ye=n(12),Xe=n.n(Ye),Ze=n(7),$e=n.n(Ze),Qe=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(g()(this,e),!t||!t instanceof pt)throw new Error("Expected instance of TronWeb");this.tronWeb=t}return m()(e,[{key:"invalid",value:function(e){return e.msg||"Invalid ".concat(e.name).concat("address"===e.type?" address":""," provided")}},{key:"notPositive",value:function(e){return"".concat(e.name," must be a positive integer")}},{key:"notEqual",value:function(e){return e.msg||"".concat(e.names[0]," can not be equal to ").concat(e.names[1])}},{key:"notValid",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Function,n={},r=!1,i=!0,s=!1,o=void 0;try{for(var a,u=e[Symbol.iterator]();!(i=(a=u.next()).done);i=!0){var c=a.value,d=c.name,l=c.names,h=c.value,f=c.type,v=c.gt,p=c.lt,g=c.gte,b=c.lte;c.se;if(!c.optional||Le.isNotNullOrUndefined(h)&&("boolean"===f||!1!==h)){switch(n[c.name]=c.value,f){case"address":this.tronWeb.isAddress(h)?n[d]=this.tronWeb.address.toHex(h):r=!0;break;case"integer":(!Le.isInteger(h)||"number"==typeof v&&h<=c.gt||"number"==typeof p&&h>=c.lt||"number"==typeof g&&h<c.gte||"number"==typeof b&&h>c.lte)&&(r=!0);break;case"positive-integer":if(!Le.isInteger(h)||h<=0)return void t(this.notPositive(c));break;case"tokenId":Le.isString(h)&&h.length||(r=!0);break;case"notEmptyObject":Le.isObject(h)&&Object.keys(h).length||(r=!0);break;case"notEqual":if(n[l[0]]===n[l[1]])return t(this.notEqual(c)),!0;break;case"resource":["BANDWIDTH","ENERGY"].includes(h)||(r=!0);break;case"url":Le.isValidURL(h)||(r=!0);break;case"hex":Le.isHex(h)||(r=!0);break;case"array":Array.isArray(h)||(r=!0);break;case"not-empty-string":Le.isString(h)&&h.length||(r=!0);break;case"boolean":Le.isBoolean(h)||(r=!0);break;case"string":(!Le.isString(h)||"number"==typeof v&&h.length<=c.gt||"number"==typeof p&&h.length>=c.lt||"number"==typeof g&&h.length<c.gte||"number"==typeof b&&h.length>c.lte)&&(r=!0)}if(r)return t(this.invalid(c)),!0}}}catch(e){s=!0,o=e}finally{try{i||null==u.return||u.return()}finally{if(s)throw o}}return!1}}]),e}();function et(e){return De.tronWeb.address.toHex(e)}function tt(e){return De.tronWeb.fromUtf8(e)}function nt(e,t){return e.Error?t(e.Error):e.result&&e.result.message?t(De.tronWeb.toUtf8(e.result.message)):t(null,e)}var rt=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(g()(this,e),!t||!t instanceof pt)throw new Error("Expected instance of TronWeb");De=this,this.tronWeb=t,this.injectPromise=Le.promiseInjector(this),this.validator=new Qe(t)}return m()(e,[{key:"sendTrx",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.tronWeb.defaultAddress.hex,r=arguments.length>3?arguments[3]:void 0,i=arguments.length>4&&void 0!==arguments[4]&&arguments[4];if(Le.isFunction(r)&&(i=r,r={}),Le.isFunction(n)?(i=n,n=this.tronWeb.defaultAddress.hex):Le.isObject(n)&&(r=n,n=this.tronWeb.defaultAddress.hex),!i)return this.injectPromise(this.sendTrx,e,t,n,r);if(t=parseInt(t),!this.validator.notValid([{name:"recipient",type:"address",value:e},{name:"origin",type:"address",value:n},{names:["recipient","origin"],type:"notEqual",msg:"Cannot transfer TRX to the same account"},{name:"amount",type:"integer",gt:0,value:t}],i)){var s={to_address:et(e),owner_address:et(n),amount:t};r&&r.permissionId&&(s.Permission_id=r.permissionId),this.tronWeb.fullNode.request("wallet/createtransaction",s,"post").then(function(e){return nt(e,i)}).catch(function(e){return i(e)})}}},{key:"sendToken",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:this.tronWeb.defaultAddress.hex,i=arguments.length>4?arguments[4]:void 0,s=arguments.length>5&&void 0!==arguments[5]&&arguments[5];if(Le.isFunction(i)&&(s=i,i={}),Le.isFunction(r)?(s=r,r=this.tronWeb.defaultAddress.hex):Le.isObject(r)&&(i=r,r=this.tronWeb.defaultAddress.hex),!s)return this.injectPromise(this.sendToken,e,t,n,r,i);if(t=parseInt(t),!this.validator.notValid([{name:"recipient",type:"address",value:e},{name:"origin",type:"address",value:r},{names:["recipient","origin"],type:"notEqual",msg:"Cannot transfer tokens to the same account"},{name:"amount",type:"integer",gt:0,value:t},{name:"token ID",type:"tokenId",value:n}],s)){var o={to_address:et(e),owner_address:et(r),asset_name:tt(n),amount:parseInt(t)};i&&i.permissionId&&(o.Permission_id=i.permissionId),this.tronWeb.fullNode.request("wallet/transferasset",o,"post").then(function(e){return nt(e,s)}).catch(function(e){return s(e)})}}},{key:"purchaseToken",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:this.tronWeb.defaultAddress.hex,i=arguments.length>4?arguments[4]:void 0,s=arguments.length>5&&void 0!==arguments[5]&&arguments[5];if(Le.isFunction(i)&&(s=i,i={}),Le.isFunction(r)?(s=r,r=this.tronWeb.defaultAddress.hex):Le.isObject(r)&&(i=r,r=this.tronWeb.defaultAddress.hex),!s)return this.injectPromise(this.purchaseToken,e,t,n,r,i);if(!this.validator.notValid([{name:"buyer",type:"address",value:r},{name:"issuer",type:"address",value:e},{names:["buyer","issuer"],type:"notEqual",msg:"Cannot purchase tokens from same account"},{name:"amount",type:"integer",gt:0,value:n},{name:"token ID",type:"tokenId",value:t}],s)){var o={to_address:et(e),owner_address:et(r),asset_name:tt(t),amount:parseInt(n)};i&&i.permissionId&&(o.Permission_id=i.permissionId),this.tronWeb.fullNode.request("wallet/participateassetissue",o,"post").then(function(e){return nt(e,s)}).catch(function(e){return s(e)})}}},{key:"freezeBalance",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"BANDWIDTH",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:this.tronWeb.defaultAddress.hex,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:void 0,s=arguments.length>5?arguments[5]:void 0,o=arguments.length>6&&void 0!==arguments[6]&&arguments[6];if(Le.isFunction(s)&&(o=s,s={}),Le.isFunction(i)?(o=i,i=void 0):Le.isObject(i)&&(s=i,i=void 0),Le.isFunction(r)?(o=r,r=this.tronWeb.defaultAddress.hex):Le.isObject(r)&&(s=r,r=this.tronWeb.defaultAddress.hex),Le.isFunction(t)&&(o=t,t=3),Le.isFunction(n)&&(o=n,n="BANDWIDTH"),!o)return this.injectPromise(this.freezeBalance,e,t,n,r,i,s);if(!this.validator.notValid([{name:"origin",type:"address",value:r},{name:"receiver",type:"address",value:i,optional:!0},{name:"amount",type:"integer",gt:0,value:e},{name:"duration",type:"integer",gte:3,value:t},{name:"resource",type:"resource",value:n,msg:'Invalid resource provided: Expected "BANDWIDTH" or "ENERGY'}],o)){var a={owner_address:et(r),frozen_balance:parseInt(e),frozen_duration:parseInt(t),resource:n};Le.isNotNullOrUndefined(i)&&et(i)!==et(r)&&(a.receiver_address=et(i)),s&&s.permissionId&&(a.Permission_id=s.permissionId),this.tronWeb.fullNode.request("wallet/freezebalance",a,"post").then(function(e){return nt(e,o)}).catch(function(e){return o(e)})}}},{key:"unfreezeBalance",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"BANDWIDTH",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.tronWeb.defaultAddress.hex,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,r=arguments.length>3?arguments[3]:void 0,i=arguments.length>4&&void 0!==arguments[4]&&arguments[4];if(Le.isFunction(r)&&(i=r,r={}),Le.isFunction(n)?(i=n,n=void 0):Le.isObject(n)&&(r=n,n=void 0),Le.isFunction(t)?(i=t,t=this.tronWeb.defaultAddress.hex):Le.isObject(t)&&(r=t,t=this.tronWeb.defaultAddress.hex),Le.isFunction(e)&&(i=e,e="BANDWIDTH"),!i)return this.injectPromise(this.unfreezeBalance,e,t,n,r);if(!this.validator.notValid([{name:"origin",type:"address",value:t},{name:"receiver",type:"address",value:n,optional:!0},{name:"resource",type:"resource",value:e,msg:'Invalid resource provided: Expected "BANDWIDTH" or "ENERGY'}],i)){var s={owner_address:et(t),resource:e};Le.isNotNullOrUndefined(n)&&et(n)!==et(t)&&(s.receiver_address=et(n)),r&&r.permissionId&&(s.Permission_id=r.permissionId),this.tronWeb.fullNode.request("wallet/unfreezebalance",s,"post").then(function(e){return nt(e,i)}).catch(function(e){return i(e)})}}},{key:"withdrawBlockRewards",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultAddress.hex,t=arguments.length>1?arguments[1]:void 0,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(Le.isFunction(t)&&(n=t,t={}),Le.isFunction(e)?(n=e,e=this.tronWeb.defaultAddress.hex):Le.isObject(e)&&(t=e,e=this.tronWeb.defaultAddress.hex),!n)return this.injectPromise(this.withdrawBlockRewards,e,t);if(!this.validator.notValid([{name:"origin",type:"address",value:e}],n)){var r={owner_address:et(e)};t&&t.permissionId&&(r.Permission_id=t.permissionId),this.tronWeb.fullNode.request("wallet/withdrawbalance",r,"post").then(function(e){return nt(e,n)}).catch(function(e){return n(e)})}}},{key:"applyForSR",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultAddress.hex,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2?arguments[2]:void 0,r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if(console.log(et(e),Le.isObject(t)),Le.isFunction(n)&&(r=n,n={}),Le.isObject(t)&&Le.isValidURL(e)&&(n=t,t=e,e=this.tronWeb.defaultAddress.hex),!r)return this.injectPromise(this.applyForSR,e,t,n);if(!this.validator.notValid([{name:"origin",type:"address",value:e},{name:"url",type:"url",value:t,msg:"Invalid url provided"}],r)){console.log(et(e));var i={owner_address:et(e),url:tt(t)};n&&n.permissionId&&(i.Permission_id=n.permissionId),this.tronWeb.fullNode.request("wallet/createwitness",i,"post").then(function(e){return nt(e,r)}).catch(function(e){return r(e)})}}},{key:"vote",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.tronWeb.defaultAddress.hex,r=arguments.length>2?arguments[2]:void 0,i=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if(Le.isFunction(r)&&(i=r,r={}),Le.isFunction(n)?(i=n,n=this.tronWeb.defaultAddress.hex):Le.isObject(n)&&(r=n,n=this.tronWeb.defaultAddress.hex),!i)return this.injectPromise(this.vote,t,n,r);if(!this.validator.notValid([{name:"voter",type:"address",value:n},{name:"votes",type:"notEmptyObject",value:t}],i)){var s=!1;if(t=Object.entries(t).map(function(t){var n=$e()(t,2),r=n[0],i=n[1];if(!s)return e.validator.notValid([{name:"SR",type:"address",value:r},{name:"vote count",type:"integer",gt:0,value:i,msg:"Invalid vote count provided for SR: "+r}])?s=!0:{vote_address:et(r),vote_count:parseInt(i)}}),!s){var o={owner_address:et(n),votes:t};r&&r.permissionId&&(o.Permission_id=r.permissionId),this.tronWeb.fullNode.request("wallet/votewitnessaccount",o,"post").then(function(e){return nt(e,i)}).catch(function(e){return i(e)})}}}},{key:"createSmartContract",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.tronWeb.defaultAddress.hex,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(Le.isFunction(t)&&(n=t,t=this.tronWeb.defaultAddress.hex),!n)return this.injectPromise(this.createSmartContract,e,t);var r=e.feeLimit||1e9,i=e.userFeePercentage;"number"==typeof i||i||(i=100);var s=e.originEnergyLimit||1e7,o=e.callValue||0,a=e.tokenValue,u=e.tokenId||e.token_id,c=e.abi,d=void 0!==c&&c,l=e.bytecode,h=void 0!==l&&l,f=e.parameters,v=void 0===f?[]:f,p=e.name,g=void 0===p?"":p;if(d&&Le.isString(d))try{d=JSON.parse(d)}catch(e){return n("Invalid options.abi provided")}if(d.entrys&&(d=d.entrys),!Le.isArray(d))return n("Invalid options.abi provided");var b=d.some(function(e){return"constructor"==e.type&&e.payable});if(!this.validator.notValid([{name:"bytecode",type:"hex",value:h},{name:"feeLimit",type:"integer",value:r,gt:0,lte:1e9},{name:"callValue",type:"integer",value:o,gte:0},{name:"userFeePercentage",type:"integer",value:i,gte:0,lte:100},{name:"originEnergyLimit",type:"integer",value:s,gte:0,lte:1e7},{name:"parameters",type:"array",value:v},{name:"issuer",type:"address",value:t},{name:"tokenValue",type:"integer",value:a,gte:0,optional:!0},{name:"tokenId",type:"integer",value:u,gte:0,optional:!0}],n)){if(b&&0==o&&0==a)return n("When contract is payable, options.callValue or options.tokenValue must be a positive integer");if(!b&&(o>0||a>0))return n("When contract is not payable, options.callValue and options.tokenValue must be 0");var m=d.find(function(e){return"constructor"===e.type});if(void 0!==m&&m){var y=new ve,k=[],x=[];if(m=m.inputs,v.length!=m.length)return n("constructor needs ".concat(m.length," but ").concat(v.length," provided"));for(var w=0;w<v.length;w++){var I=m[w].type,W=v[w];if(!I||!Le.isString(I)||!I.length)return n("Invalid parameter type provided: "+I);"address"==I&&(W=et(W).replace(z,"0x")),k.push(I),x.push(W)}try{v=y.encode(k,x).replace(/^(0x)/,"")}catch(e){return n(e)}}else v="";var A={owner_address:et(t),fee_limit:parseInt(r),call_value:parseInt(o),consume_user_resource_percent:i,origin_energy_limit:s,abi:JSON.stringify(d),bytecode:h,parameter:v,name:g};Le.isNotNullOrUndefined(a)&&(A.call_token_value=parseInt(a)),Le.isNotNullOrUndefined(u)&&(A.token_id=parseInt(u)),e&&e.permissionId&&(A.Permission_id=e.permissionId),this.tronWeb.fullNode.request("wallet/deploycontract",A,"post").then(function(e){return nt(e,n)}).catch(function(e){return n(e)})}}},{key:"triggerSmartContract",value:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return"object"!==v()(t[2])&&(t[2]={feeLimit:t[2],callValue:t[3]},t.splice(3,1)),this._triggerSmartContract.apply(this,t)}},{key:"triggerConstantContract",value:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t[2]._isConstant=!0,this.triggerSmartContract.apply(this,t)}},{key:"_triggerSmartContract",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:this.tronWeb.defaultAddress.hex,s=arguments.length>5&&void 0!==arguments[5]&&arguments[5];if(Le.isFunction(i)&&(s=i,i=this.tronWeb.defaultAddress.hex),Le.isFunction(r)&&(s=r,r=[]),!s)return this.injectPromise(this._triggerSmartContract,e,t,n,r,i);var o=Object.assign({callValue:0,feeLimit:1e9},n),a=o.tokenValue,u=o.tokenId,c=o.callValue,d=o.feeLimit;if(!this.validator.notValid([{name:"feeLimit",type:"integer",value:d,gt:0,lte:1e9},{name:"callValue",type:"integer",value:c,gte:0},{name:"parameters",type:"array",value:r},{name:"contract",type:"address",value:e},{name:"issuer",type:"address",value:i,optional:!0},{name:"tokenValue",type:"integer",value:a,gte:0,optional:!0},{name:"tokenId",type:"integer",value:u,gte:0,optional:!0},{name:"function selector",type:"not-empty-string",value:t}],s)){if(t=t.replace("/s*/g",""),r.length){for(var l=new ve,h=[],f=[],v=0;v<r.length;v++){var p=r[v],g=p.type,b=p.value;if(!g||!Le.isString(g)||!g.length)return s("Invalid parameter type provided: "+g);"address"==g&&(b=et(b).replace(z,"0x")),h.push(g),f.push(b)}try{h=h.map(function(e){return/trcToken/.test(e)&&(e=e.replace(/trcToken/,"uint256")),e}),r=l.encode(h,f).replace(/^(0x)/,"")}catch(e){return s(e)}}else r="";var m={contract_address:et(e),owner_address:et(i),function_selector:t,parameter:r};n._isConstant||(m.call_value=parseInt(c),m.fee_limit=parseInt(d),Le.isNotNullOrUndefined(a)&&(m.call_token_value=parseInt(a)),Le.isNotNullOrUndefined(u)&&(m.token_id=parseInt(u))),n.permissionId&&(m.Permission_id=n.permissionId),this.tronWeb.fullNode.request("wallet/trigger".concat(n._isConstant?"constant":"smart","contract"),m,"post").then(function(e){return nt(e,s)}).catch(function(e){return s(e)})}}},{key:"clearABI",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.tronWeb.defaultAddress.hex,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(!n)return this.injectPromise(this.clearABI,e,t);if(!this.tronWeb.isAddress(e))return n("Invalid contract address provided");if(!this.tronWeb.isAddress(t))return n("Invalid owner address provided");var r={contract_address:et(e),owner_address:et(t)};this.tronWeb.trx.cache.contracts[e]&&delete this.tronWeb.trx.cache.contracts[e],this.tronWeb.fullNode.request("wallet/clearabi",r,"post").then(function(e){return nt(e,n)}).catch(function(e){return n(e)})}},{key:"createToken",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.tronWeb.defaultAddress.hex,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(Le.isFunction(t)&&(n=t,t=this.tronWeb.defaultAddress.hex),!n)return this.injectPromise(this.createToken,e,t);var r=e.name,i=void 0!==r&&r,s=e.abbreviation,o=void 0!==s&&s,a=e.description,u=void 0!==a&&a,c=e.url,d=void 0!==c&&c,l=e.totalSupply,h=void 0===l?0:l,f=e.trxRatio,v=void 0===f?1:f,p=e.tokenRatio,g=void 0===p?1:p,b=e.saleStart,m=void 0===b?Date.now():b,y=e.saleEnd,k=void 0!==y&&y,x=e.freeBandwidth,w=void 0===x?0:x,I=e.freeBandwidthLimit,W=void 0===I?0:I,A=e.frozenAmount,P=void 0===A?0:A,_=e.frozenDuration,N=void 0===_?0:_,S=e.voteScore,T=e.precision;if(!this.validator.notValid([{name:"Supply amount",type:"positive-integer",value:h},{name:"TRX ratio",type:"positive-integer",value:v},{name:"Token ratio",type:"positive-integer",value:g},{name:"token abbreviation",type:"not-empty-string",value:o},{name:"token name",type:"not-empty-string",value:i},{name:"token description",type:"not-empty-string",value:u},{name:"token url",type:"url",value:d},{name:"issuer",type:"address",value:t},{name:"sale start timestamp",type:"integer",value:m,gte:Date.now()},{name:"sale end timestamp",type:"integer",value:k,gt:m},{name:"Free bandwidth amount",type:"integer",value:w,gte:0},{name:"Free bandwidth limit",type:"integer",value:W,gte:0},{name:"Frozen supply",type:"integer",value:P,gte:0},{name:"Frozen duration",type:"integer",value:N,gte:0}],n)){if(Le.isNotNullOrUndefined(S)&&(!Le.isInteger(S)||S<=0))return n("voteScore must be a positive integer greater than 0");if(Le.isNotNullOrUndefined(T)&&(!Le.isInteger(T)||T<=0||T>6))return n("precision must be a positive integer > 0 and <= 6");var j={owner_address:et(t),name:tt(i),abbr:tt(o),description:tt(u),url:tt(d),total_supply:parseInt(h),trx_num:parseInt(v),num:parseInt(g),start_time:parseInt(m),end_time:parseInt(k),free_asset_net_limit:parseInt(w),public_free_asset_net_limit:parseInt(W),frozen_supply:{frozen_amount:parseInt(P),frozen_days:parseInt(N)}};!this.tronWeb.fullnodeSatisfies(">=3.5.0")||parseInt(P)>0||delete j.frozen_supply,T&&!isNaN(parseInt(T))&&(j.precision=parseInt(T)),S&&!isNaN(parseInt(S))&&(j.vote_score=parseInt(S)),e&&e.permissionId&&(j.Permission_id=e.permissionId),this.tronWeb.fullNode.request("wallet/createassetissue",j,"post").then(function(e){return nt(e,n)}).catch(function(e){return n(e)})}}},{key:"updateAccount",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.tronWeb.defaultAddress.hex,n=arguments.length>2?arguments[2]:void 0,r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if(Le.isFunction(n)&&(r=n,n={}),Le.isFunction(t)?(r=t,t=this.tronWeb.defaultAddress.hex):Le.isObject(t)&&(n=t,t=this.tronWeb.defaultAddress.hex),!r)return this.injectPromise(this.updateAccount,e,t,n);if(!this.validator.notValid([{name:"Name",type:"not-empty-string",value:e},{name:"origin",type:"address",value:t}],r)){var i={account_name:tt(e),owner_address:et(t)};n&&n.permissionId&&(i.Permission_id=n.permissionId),this.tronWeb.fullNode.request("wallet/updateaccount",i,"post").then(function(e){return nt(e,r)}).catch(function(e){return r(e)})}}},{key:"setAccountId",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.tronWeb.defaultAddress.hex,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(Le.isFunction(t)&&(n=t,t=this.tronWeb.defaultAddress.hex),!n)return this.injectPromise(this.setAccountId,e,t);e&&Le.isString(e)&&e.startsWith("0x")&&(e=e.slice(2)),this.validator.notValid([{name:"accountId",type:"hex",value:e},{name:"accountId",type:"string",lte:32,gte:8,value:e},{name:"origin",type:"address",value:t}],n)||this.tronWeb.fullNode.request("wallet/setaccountid",{account_id:e,owner_address:et(t)},"post").then(function(e){return nt(e,n)}).catch(function(e){return n(e)})}},{key:"updateToken",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.tronWeb.defaultAddress.hex,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(Le.isFunction(t)?(n=t,t=this.tronWeb.defaultAddress.hex):Le.isObject(t)&&(e=t,t=this.tronWeb.defaultAddress.hex),!n)return this.injectPromise(this.updateToken,e,t);var r=e,i=r.description,s=void 0!==i&&i,o=r.url,a=void 0!==o&&o,u=r.freeBandwidth,c=void 0===u?0:u,d=r.freeBandwidthLimit,l=void 0===d?0:d;if(!this.validator.notValid([{name:"token description",type:"not-empty-string",value:s},{name:"token url",type:"url",value:a},{name:"issuer",type:"address",value:t},{name:"Free bandwidth amount",type:"positive-integer",value:c},{name:"Free bandwidth limit",type:"positive-integer",value:l}],n)){var h={owner_address:et(t),description:tt(s),url:tt(a),new_limit:parseInt(c),new_public_limit:parseInt(l)};e&&e.permissionId&&(h.Permission_id=e.permissionId),this.tronWeb.fullNode.request("wallet/updateasset",h,"post").then(function(e){return nt(e,n)}).catch(function(e){return n(e)})}}},{key:"sendAsset",value:function(){return this.sendToken.apply(this,arguments)}},{key:"purchaseAsset",value:function(){return this.purchaseToken.apply(this,arguments)}},{key:"createAsset",value:function(){return this.createToken.apply(this,arguments)}},{key:"updateAsset",value:function(){return this.updateToken.apply(this,arguments)}},{key:"createProposal",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.tronWeb.defaultAddress.hex,n=arguments.length>2?arguments[2]:void 0,r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if(Le.isFunction(n)&&(r=n,n={}),Le.isFunction(t)?(r=t,t=this.tronWeb.defaultAddress.hex):Le.isObject(t)&&(n=t,t=this.tronWeb.defaultAddress.hex),!r)return this.injectPromise(this.createProposal,e,t,n);if(!this.validator.notValid([{name:"issuer",type:"address",value:t}],r)){var i="Invalid proposal parameters provided";if(!e)return r(i);Le.isArray(e)||(e=[e]);var s=!0,o=!1,a=void 0;try{for(var u,c=e[Symbol.iterator]();!(s=(u=c.next()).done);s=!0){var d=u.value;if(!Le.isObject(d))return r(i)}}catch(e){o=!0,a=e}finally{try{s||null==c.return||c.return()}finally{if(o)throw a}}var l={owner_address:et(t),parameters:e};n&&n.permissionId&&(l.Permission_id=n.permissionId),this.tronWeb.fullNode.request("wallet/proposalcreate",l,"post").then(function(e){return nt(e,r)}).catch(function(e){return r(e)})}}},{key:"deleteProposal",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.tronWeb.defaultAddress.hex,n=arguments.length>2?arguments[2]:void 0,r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if(Le.isFunction(n)&&(r=n,n={}),Le.isFunction(t)?(r=t,t=this.tronWeb.defaultAddress.hex):Le.isObject(t)&&(n=t,t=this.tronWeb.defaultAddress.hex),!r)return this.injectPromise(this.deleteProposal,e,t,n);if(!this.validator.notValid([{name:"issuer",type:"address",value:t},{name:"proposalID",type:"integer",value:e,gte:0}],r)){var i={owner_address:et(t),proposal_id:parseInt(e)};n&&n.permissionId&&(i.Permission_id=n.permissionId),this.tronWeb.fullNode.request("wallet/proposaldelete",i,"post").then(function(e){return nt(e,r)}).catch(function(e){return r(e)})}}},{key:"voteProposal",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.tronWeb.defaultAddress.hex,r=arguments.length>3?arguments[3]:void 0,i=arguments.length>4&&void 0!==arguments[4]&&arguments[4];if(Le.isFunction(r)&&(i=r,r={}),Le.isFunction(n)?(i=n,n=this.tronWeb.defaultAddress.hex):Le.isObject(n)&&(r=n,n=this.tronWeb.defaultAddress.hex),!i)return this.injectPromise(this.voteProposal,e,t,n,r);if(!this.validator.notValid([{name:"voter",type:"address",value:n},{name:"proposalID",type:"integer",value:e,gte:0},{name:"has approval",type:"boolean",value:t}],i)){var s={owner_address:et(n),proposal_id:parseInt(e),is_add_approval:t};r&&r.permissionId&&(s.Permission_id=r.permissionId),this.tronWeb.fullNode.request("wallet/proposalapprove",s,"post").then(function(e){return nt(e,i)}).catch(function(e){return i(e)})}}},{key:"createTRXExchange",value:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:this.tronWeb.defaultAddress.hex,i=arguments.length>4?arguments[4]:void 0,s=arguments.length>5&&void 0!==arguments[5]&&arguments[5];if(Le.isFunction(i)&&(s=i,i={}),Le.isFunction(r)?(s=r,r=this.tronWeb.defaultAddress.hex):Le.isObject(r)&&(i=r,r=this.tronWeb.defaultAddress.hex),!s)return this.injectPromise(this.createTRXExchange,e,t,n,r,i);if(!this.validator.notValid([{name:"owner",type:"address",value:r},{name:"token name",type:"not-empty-string",value:e},{name:"token balance",type:"positive-integer",value:t},{name:"trx balance",type:"positive-integer",value:n}],s)){var o={owner_address:et(r),first_token_id:tt(e),first_token_balance:t,second_token_id:"5f",second_token_balance:n};i&&i.permissionId&&(o.Permission_id=i.permissionId),this.tronWeb.fullNode.request("wallet/exchangecreate",o,"post").then(function(e){s(null,e)}).catch(function(e){return s(e)})}}},{key:"createTokenExchange",value:function(e,t,n,r){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:this.tronWeb.defaultAddress.hex,s=arguments.length>5?arguments[5]:void 0,o=arguments.length>6&&void 0!==arguments[6]&&arguments[6];if(Le.isFunction(s)&&(o=s,s={}),Le.isFunction(i)?(o=i,i=this.tronWeb.defaultAddress.hex):Le.isObject(i)&&(s=i,i=this.tronWeb.defaultAddress.hex),!o)return this.injectPromise(this.createTokenExchange,e,t,n,r,i,s);if(!this.validator.notValid([{name:"owner",type:"address",value:i},{name:"first token name",type:"not-empty-string",value:e},{name:"second token name",type:"not-empty-string",value:n},{name:"first token balance",type:"positive-integer",value:t},{name:"second token balance",type:"positive-integer",value:r}],o)){var a={owner_address:et(i),first_token_id:tt(e),first_token_balance:t,second_token_id:tt(n),second_token_balance:r};s&&s.permissionId&&(a.Permission_id=s.permissionId),this.tronWeb.fullNode.request("wallet/exchangecreate",a,"post").then(function(e){o(null,e)}).catch(function(e){return o(e)})}}},{key:"injectExchangeTokens",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:this.tronWeb.defaultAddress.hex,i=arguments.length>4?arguments[4]:void 0,s=arguments.length>5&&void 0!==arguments[5]&&arguments[5];if(Le.isFunction(i)&&(s=i,i={}),Le.isFunction(r)?(s=r,r=this.tronWeb.defaultAddress.hex):Le.isObject(r)&&(i=r,r=this.tronWeb.defaultAddress.hex),!s)return this.injectPromise(this.injectExchangeTokens,e,t,n,r,i);if(!this.validator.notValid([{name:"owner",type:"address",value:r},{name:"token name",type:"not-empty-string",value:t},{name:"token amount",type:"integer",value:n,gte:1},{name:"exchangeID",type:"integer",value:e,gte:0}],s)){var o={owner_address:et(r),exchange_id:parseInt(e),token_id:tt(t),quant:parseInt(n)};i&&i.permissionId&&(o.Permission_id=i.permissionId),this.tronWeb.fullNode.request("wallet/exchangeinject",o,"post").then(function(e){return nt(e,s)}).catch(function(e){return s(e)})}}},{key:"withdrawExchangeTokens",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:this.tronWeb.defaultAddress.hex,i=arguments.length>4?arguments[4]:void 0,s=arguments.length>5&&void 0!==arguments[5]&&arguments[5];if(Le.isFunction(i)&&(s=i,i={}),Le.isFunction(r)?(s=r,r=this.tronWeb.defaultAddress.hex):Le.isObject(r)&&(i=r,r=this.tronWeb.defaultAddress.hex),!s)return this.injectPromise(this.withdrawExchangeTokens,e,t,n,r,i);if(!this.validator.notValid([{name:"owner",type:"address",value:r},{name:"token name",type:"not-empty-string",value:t},{name:"token amount",type:"integer",value:n,gte:1},{name:"exchangeID",type:"integer",value:e,gte:0}],s)){var o={owner_address:et(r),exchange_id:parseInt(e),token_id:tt(t),quant:parseInt(n)};i&&i.permissionId&&(o.Permission_id=i.permissionId),this.tronWeb.fullNode.request("wallet/exchangewithdraw",o,"post").then(function(e){return nt(e,s)}).catch(function(e){return s(e)})}}},{key:"tradeExchangeTokens",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:this.tronWeb.defaultAddress.hex,s=arguments.length>5?arguments[5]:void 0,o=arguments.length>6&&void 0!==arguments[6]&&arguments[6];if(Le.isFunction(s)&&(o=s,s={}),Le.isFunction(i)?(o=i,i=this.tronWeb.defaultAddress.hex):Le.isObject(i)&&(s=i,i=this.tronWeb.defaultAddress.hex),!o)return this.injectPromise(this.tradeExchangeTokens,e,t,n,r,i,s);if(!this.validator.notValid([{name:"owner",type:"address",value:i},{name:"token name",type:"not-empty-string",value:t},{name:"tokenAmountSold",type:"integer",value:n,gte:1},{name:"tokenAmountExpected",type:"integer",value:r,gte:1},{name:"exchangeID",type:"integer",value:e,gte:0}],o)){var a={owner_address:et(i),exchange_id:parseInt(e),token_id:this.tronWeb.fromAscii(t),quant:parseInt(n),expected:parseInt(r)};s&&s.permissionId&&(a.Permission_id=s.permissionId),this.tronWeb.fullNode.request("wallet/exchangetransaction",a,"post").then(function(e){return nt(e,o)}).catch(function(e){return o(e)})}}},{key:"updateSetting",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.tronWeb.defaultAddress.hex,r=arguments.length>3?arguments[3]:void 0,i=arguments.length>4&&void 0!==arguments[4]&&arguments[4];if(Le.isFunction(r)&&(i=r,r={}),Le.isFunction(n)?(i=n,n=this.tronWeb.defaultAddress.hex):Le.isObject(n)&&(r=n,n=this.tronWeb.defaultAddress.hex),!i)return this.injectPromise(this.updateSetting,e,t,n,r);if(!this.validator.notValid([{name:"owner",type:"address",value:n},{name:"contract",type:"address",value:e},{name:"userFeePercentage",type:"integer",value:t,gte:0,lte:100}],i)){var s={owner_address:et(n),contract_address:et(e),consume_user_resource_percent:t};r&&r.permissionId&&(s.Permission_id=r.permissionId),this.tronWeb.fullNode.request("wallet/updatesetting",s,"post").then(function(e){return nt(e,i)}).catch(function(e){return i(e)})}}},{key:"updateEnergyLimit",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.tronWeb.defaultAddress.hex,r=arguments.length>3?arguments[3]:void 0,i=arguments.length>4&&void 0!==arguments[4]&&arguments[4];if(Le.isFunction(r)&&(i=r,r={}),Le.isFunction(n)?(i=n,n=this.tronWeb.defaultAddress.hex):Le.isObject(n)&&(r=n,n=this.tronWeb.defaultAddress.hex),!i)return this.injectPromise(this.updateEnergyLimit,e,t,n,r);if(!this.validator.notValid([{name:"owner",type:"address",value:n},{name:"contract",type:"address",value:e},{name:"originEnergyLimit",type:"integer",value:t,gte:0,lte:1e7}],i)){var s={owner_address:et(n),contract_address:et(e),origin_energy_limit:t};r&&r.permissionId&&(s.Permission_id=r.permissionId),this.tronWeb.fullNode.request("wallet/updateenergylimit",s,"post").then(function(e){return nt(e,i)}).catch(function(e){return i(e)})}}},{key:"checkPermissions",value:function(e,t){if(e){if(e.type!==t||!e.permission_name||!Le.isString(e.permission_name)||!Le.isInteger(e.threshold)||e.threshold<1||!e.keys)return!1;var n=!0,r=!1,i=void 0;try{for(var s,o=e.keys[Symbol.iterator]();!(n=(s=o.next()).done);n=!0){var a=s.value;if(!this.tronWeb.isAddress(a.address)||!Le.isInteger(a.weight)||a.weight>e.threshold||a.weight<1||2===t&&!e.operations)return!1}}catch(e){r=!0,i=e}finally{try{n||null==o.return||o.return()}finally{if(r)throw i}}}return!0}},{key:"updateAccountPermissions",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultAddress.hex,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i=arguments.length>4&&void 0!==arguments[4]&&arguments[4];if(Le.isFunction(r)&&(i=r,r=!1),Le.isFunction(n)&&(i=n,n=r=!1),Le.isFunction(t)&&(i=t,t=n=r=!1),!i)return this.injectPromise(this.updateAccountPermissions,e,t,n,r);if(!this.tronWeb.isAddress(e))return i("Invalid ownerAddress provided");if(!this.checkPermissions(t,0))return i("Invalid ownerPermissions provided");if(!this.checkPermissions(n,1))return i("Invalid witnessPermissions provided");Array.isArray(r)||(r=[r]);var s=!0,o=!1,a=void 0;try{for(var u,c=r[Symbol.iterator]();!(s=(u=c.next()).done);s=!0){var d=u.value;if(!this.checkPermissions(d,2))return i("Invalid activesPermissions provided")}}catch(e){o=!0,a=e}finally{try{s||null==c.return||c.return()}finally{if(o)throw a}}var l={owner_address:e};t&&(l.owner=t),n&&(l.witness=n),r&&(l.actives=1===r.length?r[0]:r),this.tronWeb.fullNode.request("wallet/accountpermissionupdate",l,"post").then(function(e){return nt(e,i)}).catch(function(e){return i(e)})}},{key:"newTxID",value:function(){var e=h()(d.a.mark(function e(t,n){return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n){e.next=2;break}return e.abrupt("return",this.injectPromise(this.newTxID,t));case 2:this.tronWeb.fullNode.request("wallet/getsignweight",t,"post").then(function(e){e=e.transaction.transaction,"boolean"==typeof t.visible&&(e.visible=t.visible),n(null,e)}).catch(function(e){return n("Error generating a new transaction id.")});case 3:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}()},{key:"alterTransaction",value:function(){var e=h()(d.a.mark(function e(t){var n,r,i=arguments;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=i.length>1&&void 0!==i[1]?i[1]:{},r=i.length>2&&void 0!==i[2]&&i[2]){e.next=4;break}return e.abrupt("return",this.injectPromise(this.alterTransaction,t,n));case 4:if(!t.signature){e.next=6;break}return e.abrupt("return",r("You can not extend the expiration of a signed transaction."));case 6:if(!n.data){e.next=12;break}if("hex"!==n.dataFormat&&(n.data=this.tronWeb.toHex(n.data)),n.data=n.data.replace(/^0x/,""),0!==n.data.length){e.next=11;break}return e.abrupt("return",r("Invalid data provided"));case 11:t.raw_data.data=n.data;case 12:if(!n.extension){e.next=17;break}if(n.extension=parseInt(1e3*n.extension),!(isNaN(n.extension)||t.raw_data.expiration+n.extension<=Date.now()+3e3)){e.next=16;break}return e.abrupt("return",r("Invalid extension provided"));case 16:t.raw_data.expiration+=n.extension;case 17:this.newTxID(t,r);case 18:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"extendExpiration",value:function(){var e=h()(d.a.mark(function e(t,n){var r,i=arguments;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(r=i.length>2&&void 0!==i[2]&&i[2]){e.next=3;break}return e.abrupt("return",this.injectPromise(this.extendExpiration,t,n));case 3:this.alterTransaction(t,{extension:n},r);case 4:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}()},{key:"addUpdateData",value:function(){var e=h()(d.a.mark(function e(t,n){var r,i,s=arguments;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(r=s.length>2&&void 0!==s[2]?s[2]:"utf8",i=s.length>3&&void 0!==s[3]&&s[3],Le.isFunction(r)&&(i=r,r="utf8"),i){e.next=5;break}return e.abrupt("return",this.injectPromise(this.addUpdateData,t,n,r));case 5:this.alterTransaction(t,{data:n,dataFormat:r},i);case 6:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}()}]),e}(),it=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(g()(this,e),!t||!t instanceof pt)throw new Error("Expected instance of TronWeb");this.tronWeb=t,this.injectPromise=Le.promiseInjector(this),this.cache={contracts:{}},this.validator=new Qe(t)}return m()(e,[{key:"_parseToken",value:function(e){return B()({},e,{name:this.tronWeb.toUtf8(e.name),abbr:e.abbr&&this.tronWeb.toUtf8(e.abbr),description:e.description&&this.tronWeb.toUtf8(e.description),url:e.url&&this.tronWeb.toUtf8(e.url)})}},{key:"getCurrentBlock",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!e)return this.injectPromise(this.getCurrentBlock);this.tronWeb.fullNode.request("wallet/getnowblock").then(function(t){e(null,t)}).catch(function(t){return e(t)})}},{key:"getConfirmedCurrentBlock",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!e)return this.injectPromise(this.getConfirmedCurrentBlock);this.tronWeb.solidityNode.request("walletsolidity/getnowblock").then(function(t){e(null,t)}).catch(function(t){return e(t)})}},{key:"getBlock",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultBlock,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return Le.isFunction(e)&&(t=e,e=this.tronWeb.defaultBlock),t?!1===e?t("No block identifier provided"):("earliest"==e&&(e=0),"latest"==e?this.getCurrentBlock(t):isNaN(e)&&Le.isHex(e)?this.getBlockByHash(e,t):void this.getBlockByNumber(e,t)):this.injectPromise(this.getBlock,e)}},{key:"getBlockByHash",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!t)return this.injectPromise(this.getBlockByHash,e);this.tronWeb.fullNode.request("wallet/getblockbyid",{value:e},"post").then(function(e){if(!Object.keys(e).length)return t("Block not found");t(null,e)}).catch(function(e){return t(e)})}},{key:"getBlockByNumber",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return t?!Le.isInteger(e)||e<0?t("Invalid block number provided"):void this.tronWeb.fullNode.request("wallet/getblockbynum",{num:parseInt(e)},"post").then(function(e){if(!Object.keys(e).length)return t("Block not found");t(null,e)}).catch(function(e){return t(e)}):this.injectPromise(this.getBlockByNumber,e)}},{key:"getBlockTransactionCount",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultBlock,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(Le.isFunction(e)&&(t=e,e=this.tronWeb.defaultBlock),!t)return this.injectPromise(this.getBlockTransactionCount,e);this.getBlock(e).then(function(e){var n=e.transactions;t(null,(void 0===n?[]:n).length)}).catch(function(e){return t(e)})}},{key:"getTransactionFromBlock",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultBlock,t=arguments.length>1?arguments[1]:void 0,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(Le.isFunction(t)&&(n=t,t=0),Le.isFunction(e)&&(n=e,e=this.tronWeb.defaultBlock),!n)return this.injectPromise(this.getTransactionFromBlock,e,t);this.getBlock(e).then(function(e){var r=e.transactions,i=void 0!==r&&r;i?"number"==typeof t?t>=0&&t<i.length?n(null,i[t]):n("Invalid transaction index provided"):n(null,i):n("Transaction not found in block")}).catch(function(e){return n(e)})}},{key:"getTransaction",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!t)return this.injectPromise(this.getTransaction,e);this.tronWeb.fullNode.request("wallet/gettransactionbyid",{value:e},"post").then(function(e){if(!Object.keys(e).length)return t("Transaction not found");t(null,e)}).catch(function(e){return t(e)})}},{key:"getConfirmedTransaction",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!t)return this.injectPromise(this.getConfirmedTransaction,e);this.tronWeb.solidityNode.request("walletsolidity/gettransactionbyid",{value:e},"post").then(function(e){if(!Object.keys(e).length)return t("Transaction not found");t(null,e)}).catch(function(e){return t(e)})}},{key:"getUnconfirmedTransactionInfo",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return this._getTransactionInfoById(e,{confirmed:!1},t)}},{key:"getTransactionInfo",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return this._getTransactionInfoById(e,{confirmed:!0},t)}},{key:"_getTransactionInfoById",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(!n)return this.injectPromise(this._getTransactionInfoById,e,t);this.tronWeb[t.confirmed?"solidityNode":"fullNode"].request("wallet".concat(t.confirmed?"solidity":"","/gettransactioninfobyid"),{value:e},"post").then(function(e){n(null,e)}).catch(function(e){return n(e)})}},{key:"getTransactionsToAddress",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultAddress.hex,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:30,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return Le.isFunction(n)&&(r=n,n=0),Le.isFunction(t)&&(r=t,t=30),r?(e=this.tronWeb.address.toHex(e),this.getTransactionsRelated(e,"to",t,n,r)):this.injectPromise(this.getTransactionsToAddress,e,t,n)}},{key:"getTransactionsFromAddress",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultAddress.hex,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:30,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return Le.isFunction(n)&&(r=n,n=0),Le.isFunction(t)&&(r=t,t=30),r?(e=this.tronWeb.address.toHex(e),this.getTransactionsRelated(e,"from",t,n,r)):this.injectPromise(this.getTransactionsFromAddress,e,t,n)}},{key:"getTransactionsRelated",value:function(){var e=h()(d.a.mark(function e(){var t,n,r,i,s,o,a,u,c,l=arguments;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=l.length>0&&void 0!==l[0]?l[0]:this.tronWeb.defaultAddress.hex,n=l.length>1&&void 0!==l[1]?l[1]:"all",r=l.length>2&&void 0!==l[2]?l[2]:30,i=l.length>3&&void 0!==l[3]?l[3]:0,s=l.length>4&&void 0!==l[4]&&l[4],Le.isFunction(i)&&(s=i,i=0),Le.isFunction(r)&&(s=r,r=30),Le.isFunction(n)&&(s=n,n="all"),Le.isFunction(t)&&(s=t,t=this.tronWeb.defaultAddress.hex),s){e.next=11;break}return e.abrupt("return",this.injectPromise(this.getTransactionsRelated,t,n,r,i));case 11:if(["to","from","all"].includes(n)){e.next=13;break}return e.abrupt("return",s('Invalid direction provided: Expected "to", "from" or "all"'));case 13:if("all"!=n){e.next=27;break}return e.prev=14,e.next=17,Promise.all([this.getTransactionsRelated(t,"from",r,i),this.getTransactionsRelated(t,"to",r,i)]);case 17:return o=e.sent,a=$e()(o,2),u=a[0],c=a[1],e.abrupt("return",s(null,[].concat(R()(u.map(function(e){return e.direction="from",e})),R()(c.map(function(e){return e.direction="to",e}))).sort(function(e,t){return t.raw_data.timestamp-e.raw_data.timestamp})));case 24:return e.prev=24,e.t0=e.catch(14),e.abrupt("return",s(e.t0));case 27:if(this.tronWeb.isAddress(t)){e.next=29;break}return e.abrupt("return",s("Invalid address provided"));case 29:if(!(!Le.isInteger(r)||r<0||i&&r<1)){e.next=31;break}return e.abrupt("return",s("Invalid limit provided"));case 31:if(Le.isInteger(i)&&!(i<0)){e.next=33;break}return e.abrupt("return",s("Invalid offset provided"));case 33:t=this.tronWeb.address.toHex(t),this.tronWeb.solidityNode.request("walletextension/gettransactions".concat(n,"this"),{account:{address:t},offset:i,limit:r},"post").then(function(e){var t=e.transaction;s(null,t)}).catch(function(e){return s(e)});case 35:case"end":return e.stop()}},e,this,[[14,24]])}));return function(){return e.apply(this,arguments)}}()},{key:"getAccount",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultAddress.hex,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return Le.isFunction(e)&&(t=e,e=this.tronWeb.defaultAddress.hex),t?this.tronWeb.isAddress(e)?(e=this.tronWeb.address.toHex(e),void this.tronWeb.solidityNode.request("walletsolidity/getaccount",{address:e},"post").then(function(e){t(null,e)}).catch(function(e){return t(e)})):t("Invalid address provided"):this.injectPromise(this.getAccount,e)}},{key:"getAccountById",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!t)return this.injectPromise(this.getAccountById,e);this.getAccountInfoById(e,{confirmed:!0},t)}},{key:"getAccountInfoById",value:function(e,t,n){this.validator.notValid([{name:"accountId",type:"hex",value:e},{name:"accountId",type:"string",lte:32,gte:8,value:e}],n)||(e.startsWith("0x")&&(e=e.slice(2)),this.tronWeb[t.confirmed?"solidityNode":"fullNode"].request("wallet".concat(t.confirmed?"solidity":"","/getaccountbyid"),{account_id:e},"post").then(function(e){n(null,e)}).catch(function(e){return n(e)}))}},{key:"getBalance",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultAddress.hex,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(Le.isFunction(e)&&(t=e,e=this.tronWeb.defaultAddress.hex),!t)return this.injectPromise(this.getBalance,e);this.getAccount(e).then(function(e){var n=e.balance;t(null,void 0===n?0:n)}).catch(function(e){return t(e)})}},{key:"getUnconfirmedAccount",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultAddress.hex,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return Le.isFunction(e)&&(t=e,e=this.tronWeb.defaultAddress.hex),t?this.tronWeb.isAddress(e)?(e=this.tronWeb.address.toHex(e),void this.tronWeb.fullNode.request("wallet/getaccount",{address:e},"post").then(function(e){t(null,e)}).catch(function(e){return t(e)})):t("Invalid address provided"):this.injectPromise(this.getUnconfirmedAccount,e)}},{key:"getUnconfirmedAccountById",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!t)return this.injectPromise(this.getUnconfirmedAccountById,e);this.getAccountInfoById(e,{confirmed:!1},t)}},{key:"getUnconfirmedBalance",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultAddress.hex,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(Le.isFunction(e)&&(t=e,e=this.tronWeb.defaultAddress.hex),!t)return this.injectPromise(this.getUnconfirmedBalance,e);this.getUnconfirmedAccount(e).then(function(e){var n=e.balance;t(null,void 0===n?0:n)}).catch(function(e){return t(e)})}},{key:"getBandwidth",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultAddress.hex,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return Le.isFunction(e)&&(t=e,e=this.tronWeb.defaultAddress.hex),t?this.tronWeb.isAddress(e)?(e=this.tronWeb.address.toHex(e),void this.tronWeb.fullNode.request("wallet/getaccountnet",{address:e},"post").then(function(e){var n=e.freeNetUsed,r=void 0===n?0:n,i=e.freeNetLimit,s=void 0===i?0:i,o=e.NetUsed,a=void 0===o?0:o,u=e.NetLimit;t(null,s-r+((void 0===u?0:u)-a))}).catch(function(e){return t(e)})):t("Invalid address provided"):this.injectPromise(this.getBandwidth,e)}},{key:"getTokensIssuedByAddress",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultAddress.hex,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return Le.isFunction(t)&&(n=t,t=this.tronWeb.defaultAddress.hex),n?this.tronWeb.isAddress(t)?(t=this.tronWeb.address.toHex(t),void this.tronWeb.fullNode.request("wallet/getassetissuebyaccount",{address:t},"post").then(function(t){var r=t.assetIssue,i=void 0!==r&&r;if(!i)return n(null,{});var s=i.map(function(t){return e._parseToken(t)}).reduce(function(e,t){return e[t.name]=t,e},{});n(null,s)}).catch(function(e){return n(e)})):n("Invalid address provided"):this.injectPromise(this.getTokensIssuedByAddress,t)}},{key:"getTokenFromID",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n?(Le.isInteger(t)&&(t=t.toString()),Le.isString(t)&&t.length?void this.tronWeb.fullNode.request("wallet/getassetissuebyname",{value:this.tronWeb.fromUtf8(t)},"post").then(function(t){if(!t.name)return n("Token does not exist");n(null,e._parseToken(t))}).catch(function(e){return n(e)}):n("Invalid token ID provided")):this.injectPromise(this.getTokenFromID,t)}},{key:"listNodes",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!t)return this.injectPromise(this.listNodes);this.tronWeb.fullNode.request("wallet/listnodes").then(function(n){var r=n.nodes;t(null,(void 0===r?[]:r).map(function(t){var n=t.address,r=n.host,i=n.port;return"".concat(e.tronWeb.toUtf8(r),":").concat(i)}))}).catch(function(e){return t(e)})}},{key:"getBlockRange",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:30,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return Le.isFunction(t)&&(n=t,t=30),Le.isFunction(e)&&(n=e,e=0),n?!Le.isInteger(e)||e<0?n("Invalid start of range provided"):!Le.isInteger(t)||t<=e?n("Invalid end of range provided"):void this.tronWeb.fullNode.request("wallet/getblockbylimitnext",{startNum:parseInt(e),endNum:parseInt(t)+1},"post").then(function(e){var t=e.block;n(null,void 0===t?[]:t)}).catch(function(e){return n(e)}):this.injectPromise(this.getBlockRange,e,t)}},{key:"listSuperRepresentatives",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!e)return this.injectPromise(this.listSuperRepresentatives);this.tronWeb.fullNode.request("wallet/listwitnesses").then(function(t){var n=t.witnesses;e(null,void 0===n?[]:n)}).catch(function(t){return e(t)})}},{key:"listTokens",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return Le.isFunction(n)&&(r=n,n=0),Le.isFunction(t)&&(r=t,t=0),r?!Le.isInteger(t)||t<0||n&&t<1?r("Invalid limit provided"):!Le.isInteger(n)||n<0?r("Invalid offset provided"):t?void this.tronWeb.fullNode.request("wallet/getpaginatedassetissuelist",{offset:parseInt(n),limit:parseInt(t)},"post").then(function(t){var n=t.assetIssue;r(null,(void 0===n?[]:n).map(function(t){return e._parseToken(t)}))}).catch(function(e){return r(e)}):this.tronWeb.fullNode.request("wallet/getassetissuelist").then(function(t){var n=t.assetIssue;r(null,(void 0===n?[]:n).map(function(t){return e._parseToken(t)}))}).catch(function(e){return r(e)}):this.injectPromise(this.listTokens,t,n)}},{key:"timeUntilNextVoteCycle",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!e)return this.injectPromise(this.timeUntilNextVoteCycle);this.tronWeb.fullNode.request("wallet/getnextmaintenancetime").then(function(t){var n=t.num,r=void 0===n?-1:n;if(-1==r)return e("Failed to get time until next vote cycle");e(null,Math.floor(r/1e3))}).catch(function(t){return e(t)})}},{key:"getContract",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n?this.tronWeb.isAddress(e)?void(this.cache.contracts[e]?n(null,this.cache.contracts[e]):(e=this.tronWeb.address.toHex(e),this.tronWeb.fullNode.request("wallet/getcontract",{value:e}).then(function(r){if(r.Error)return n("Contract does not exist");t.cache.contracts[e]=r,n(null,r)}).catch(function(e){return n(e)}))):n("Invalid contract address provided"):this.injectPromise(this.getContract,e)}},{key:"verifyMessage",value:function(){var t=h()(d.a.mark(function t(){var n,r,i,s,o,a=arguments;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(n=a.length>0&&void 0!==a[0]&&a[0],r=a.length>1&&void 0!==a[1]&&a[1],i=a.length>2&&void 0!==a[2]?a[2]:this.tronWeb.defaultAddress.base58,s=!(a.length>3&&void 0!==a[3])||a[3],o=a.length>4&&void 0!==a[4]&&a[4],Le.isFunction(i)&&(o=i,i=this.tronWeb.defaultAddress.base58,s=!0),Le.isFunction(s)&&(o=s,s=!0),o){t.next=9;break}return t.abrupt("return",this.injectPromise(this.verifyMessage,n,r,i,s));case 9:if(Le.isHex(n)){t.next=11;break}return t.abrupt("return",o("Expected hex message input"));case 11:if(!e.verifySignature(n,i,r,s)){t.next=13;break}return t.abrupt("return",o(null,!0));case 13:o("Signature does not match");case 14:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"sign",value:function(){var t=h()(d.a.mark(function t(){var n,r,i,s,o,a,u=arguments;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(n=u.length>0&&void 0!==u[0]&&u[0],r=u.length>1&&void 0!==u[1]?u[1]:this.tronWeb.defaultPrivateKey,i=!(u.length>2&&void 0!==u[2])||u[2],s=u.length>3&&void 0!==u[3]&&u[3],o=u.length>4&&void 0!==u[4]&&u[4],Le.isFunction(s)&&(o=s,s=!1),Le.isFunction(i)&&(o=i,i=!0,s=!1),Le.isFunction(r)&&(o=r,r=this.tronWeb.defaultPrivateKey,i=!0,s=!1),o){t.next=10;break}return t.abrupt("return",this.injectPromise(this.sign,n,r,i,s));case 10:if(!Le.isString(n)){t.next=21;break}if(Le.isHex(n)){t.next=13;break}return t.abrupt("return",o("Expected hex message input"));case 13:return t.prev=13,a=e.signString(n,r,i),t.abrupt("return",o(null,a));case 18:t.prev=18,t.t0=t.catch(13),o(t.t0);case 21:if(Le.isObject(n)){t.next=23;break}return t.abrupt("return",o("Invalid transaction provided"));case 23:if(s||!n.signature){t.next=25;break}return t.abrupt("return",o("Transaction is already signed"));case 25:if(t.prev=25,s){t.next=30;break}if(this.tronWeb.address.toHex(this.tronWeb.address.fromPrivateKey(r)).toLowerCase()===n.raw_data.contract[0].parameter.value.owner_address.toLowerCase()){t.next=30;break}return t.abrupt("return",o("Private key does not match address in transaction"));case 30:return t.abrupt("return",o(null,Le.crypto.signTransaction(r,n)));case 33:t.prev=33,t.t1=t.catch(25),o(t.t1);case 36:case"end":return t.stop()}},t,this,[[13,18],[25,33]])}));return function(){return t.apply(this,arguments)}}()},{key:"multiSign",value:function(){var e=h()(d.a.mark(function e(){var t,n,r,i,s,o,a,u=arguments;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=u.length>0&&void 0!==u[0]&&u[0],n=u.length>1&&void 0!==u[1]?u[1]:this.tronWeb.defaultPrivateKey,r=u.length>2&&void 0!==u[2]&&u[2],i=u.length>3&&void 0!==u[3]&&u[3],Le.isFunction(r)&&(i=r,r=0),Le.isFunction(n)&&(i=n,n=this.tronWeb.defaultPrivateKey,r=0),i){e.next=8;break}return e.abrupt("return",this.injectPromise(this.multiSign,t,n,r));case 8:if(Le.isObject(t)&&t.raw_data&&t.raw_data.contract){e.next=10;break}return e.abrupt("return",i("Invalid transaction provided"));case 10:if(t.raw_data.contract[0].Permission_id||!(r>0)){e.next=30;break}return t.raw_data.contract[0].Permission_id=r,s=this.tronWeb.address.toHex(this.tronWeb.address.fromPrivateKey(n)).toLowerCase(),e.next=15,this.getSignWeight(t,r);case 15:if("PERMISSION_ERROR"!==(o=e.sent).result.code){e.next=18;break}return e.abrupt("return",i(o.result.message));case 18:if(a=!1,o.permission.keys.map(function(e){e.address===s&&(a=!0)}),a){e.next=22;break}return e.abrupt("return",i(n+" has no permission to sign"));case 22:if(!o.approved_list||-1==o.approved_list.indexOf(s)){e.next=24;break}return e.abrupt("return",i(n+" already sign transaction"));case 24:if(!o.transaction||!o.transaction.transaction){e.next=29;break}t=o.transaction.transaction,r>0&&(t.raw_data.contract[0].Permission_id=r),e.next=30;break;case 29:return e.abrupt("return",i("Invalid transaction provided"));case 30:return e.prev=30,e.abrupt("return",i(null,Le.crypto.signTransaction(n,t)));case 34:e.prev=34,e.t0=e.catch(30),i(e.t0);case 37:case"end":return e.stop()}},e,this,[[30,34]])}));return function(){return e.apply(this,arguments)}}()},{key:"getApprovedList",value:function(){var e=h()(d.a.mark(function e(t){var n,r=arguments;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.length>1&&void 0!==r[1]&&r[1]){e.next=3;break}return e.abrupt("return",this.injectPromise(this.getApprovedList,t));case 3:if(Le.isObject(t)){e.next=5;break}return e.abrupt("return",n("Invalid transaction provided"));case 5:this.tronWeb.fullNode.request("wallet/getapprovedlist",t,"post").then(function(e){n(null,e)}).catch(function(e){return n(e)});case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"getSignWeight",value:function(){var e=h()(d.a.mark(function e(t,n){var r,i=arguments;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(r=i.length>2&&void 0!==i[2]&&i[2],Le.isFunction(n)&&(r=n,n=void 0),r){e.next=4;break}return e.abrupt("return",this.injectPromise(this.getSignWeight,t,n));case 4:if(Le.isObject(t)&&t.raw_data&&t.raw_data.contract){e.next=6;break}return e.abrupt("return",r("Invalid transaction provided"));case 6:if(Le.isInteger(n)?t.raw_data.contract[0].Permission_id=parseInt(n):"number"!=typeof t.raw_data.contract[0].Permission_id&&(t.raw_data.contract[0].Permission_id=0),Le.isObject(t)){e.next=9;break}return e.abrupt("return",r("Invalid transaction provided"));case 9:this.tronWeb.fullNode.request("wallet/getsignweight",t,"post").then(function(e){r(null,e)}).catch(function(e){return r(e)});case 10:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}()},{key:"sendRawTransaction",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return Le.isFunction(t)&&(n=t,t={}),n?Le.isObject(e)?Le.isObject(t)?e.signature&&Le.isArray(e.signature)?void this.tronWeb.fullNode.request("wallet/broadcasttransaction",e,"post").then(function(t){t.result&&(t.transaction=e),n(null,t)}).catch(function(e){return n(e)}):n("Transaction is not signed"):n("Invalid options provided"):n("Invalid transaction provided"):this.injectPromise(this.sendRawTransaction,e,t)}},{key:"sendTransaction",value:function(){var e=h()(d.a.mark(function e(){var t,n,r,i,s,o,a,u,c=arguments;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=c.length>0&&void 0!==c[0]&&c[0],n=c.length>1&&void 0!==c[1]&&c[1],r=c.length>2&&void 0!==c[2]?c[2]:{},i=c.length>3&&void 0!==c[3]&&c[3],Le.isFunction(r)&&(i=r,r={}),"string"==typeof r&&(r={privateKey:r}),i){e.next=8;break}return e.abrupt("return",this.injectPromise(this.sendTransaction,t,n,r));case 8:if(this.tronWeb.isAddress(t)){e.next=10;break}return e.abrupt("return",i("Invalid recipient provided"));case 10:if(Le.isInteger(n)&&!(n<=0)){e.next=12;break}return e.abrupt("return",i("Invalid amount provided"));case 12:if((r=B()({privateKey:this.tronWeb.defaultPrivateKey,address:this.tronWeb.defaultAddress.hex},r)).privateKey||r.address){e.next=15;break}return e.abrupt("return",i("Function requires either a private key or address to be set"));case 15:return e.prev=15,s=r.privateKey?this.tronWeb.address.fromPrivateKey(r.privateKey):r.address,e.next=19,this.tronWeb.transactionBuilder.sendTrx(t,n,s);case 19:return o=e.sent,e.next=22,this.sign(o,r.privateKey||void 0);case 22:return a=e.sent,e.next=25,this.sendRawTransaction(a);case 25:return u=e.sent,e.abrupt("return",i(null,u));case 29:return e.prev=29,e.t0=e.catch(15),e.abrupt("return",i(e.t0));case 32:case"end":return e.stop()}},e,this,[[15,29]])}));return function(){return e.apply(this,arguments)}}()},{key:"sendToken",value:function(){var e=h()(d.a.mark(function e(){var t,n,r,i,s,o,a,u,c,l=arguments;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=l.length>0&&void 0!==l[0]&&l[0],n=l.length>1&&void 0!==l[1]&&l[1],r=l.length>2&&void 0!==l[2]&&l[2],i=l.length>3&&void 0!==l[3]?l[3]:{},s=l.length>4&&void 0!==l[4]&&l[4],Le.isFunction(i)&&(s=i,i={}),"string"==typeof i&&(i={privateKey:i}),s){e.next=9;break}return e.abrupt("return",this.injectPromise(this.sendToken,t,n,r,i));case 9:if(this.tronWeb.isAddress(t)){e.next=11;break}return e.abrupt("return",s("Invalid recipient provided"));case 11:if(Le.isInteger(n)&&!(n<=0)){e.next=13;break}return e.abrupt("return",s("Invalid amount provided"));case 13:if(Le.isInteger(r)&&(r=r.toString()),Le.isString(r)){e.next=16;break}return e.abrupt("return",s("Invalid token ID provided"));case 16:if((i=B()({privateKey:this.tronWeb.defaultPrivateKey,address:this.tronWeb.defaultAddress.hex},i)).privateKey||i.address){e.next=19;break}return e.abrupt("return",s("Function requires either a private key or address to be set"));case 19:return e.prev=19,o=i.privateKey?this.tronWeb.address.fromPrivateKey(i.privateKey):i.address,e.next=23,this.tronWeb.transactionBuilder.sendToken(t,n,r,o);case 23:return a=e.sent,e.next=26,this.sign(a,i.privateKey||void 0);case 26:return u=e.sent,e.next=29,this.sendRawTransaction(u);case 29:return c=e.sent,e.abrupt("return",s(null,c));case 33:return e.prev=33,e.t0=e.catch(19),e.abrupt("return",s(e.t0));case 36:case"end":return e.stop()}},e,this,[[19,33]])}));return function(){return e.apply(this,arguments)}}()},{key:"freezeBalance",value:function(){var e=h()(d.a.mark(function e(){var t,n,r,i,s,o,a,u,c,l,h=arguments;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=h.length>0&&void 0!==h[0]?h[0]:0,n=h.length>1&&void 0!==h[1]?h[1]:3,r=h.length>2&&void 0!==h[2]?h[2]:"BANDWIDTH",i=h.length>3&&void 0!==h[3]?h[3]:{},s=h.length>4&&void 0!==h[4]?h[4]:void 0,o=h.length>5&&void 0!==h[5]&&h[5],Le.isFunction(s)&&(o=s,s=void 0),Le.isFunction(n)&&(o=n,n=3),Le.isFunction(r)&&(o=r,r="BANDWIDTH"),Le.isFunction(i)&&(o=i,i={}),"string"==typeof i&&(i={privateKey:i}),o){e.next=13;break}return e.abrupt("return",this.injectPromise(this.freezeBalance,t,n,r,i,s));case 13:if(["BANDWIDTH","ENERGY"].includes(r)){e.next=15;break}return e.abrupt("return",o('Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"'));case 15:if(Le.isInteger(t)&&!(t<=0)){e.next=17;break}return e.abrupt("return",o("Invalid amount provided"));case 17:if(Le.isInteger(n)&&!(n<3)){e.next=19;break}return e.abrupt("return",o("Invalid duration provided, minimum of 3 days"));case 19:if((i=B()({privateKey:this.tronWeb.defaultPrivateKey,address:this.tronWeb.defaultAddress.hex},i)).privateKey||i.address){e.next=22;break}return e.abrupt("return",o("Function requires either a private key or address to be set"));case 22:return e.prev=22,a=i.privateKey?this.tronWeb.address.fromPrivateKey(i.privateKey):i.address,e.next=26,this.tronWeb.transactionBuilder.freezeBalance(t,n,r,a,s);case 26:return u=e.sent,e.next=29,this.sign(u,i.privateKey||void 0);case 29:return c=e.sent,e.next=32,this.sendRawTransaction(c);case 32:return l=e.sent,e.abrupt("return",o(null,l));case 36:return e.prev=36,e.t0=e.catch(22),e.abrupt("return",o(e.t0));case 39:case"end":return e.stop()}},e,this,[[22,36]])}));return function(){return e.apply(this,arguments)}}()},{key:"unfreezeBalance",value:function(){var e=h()(d.a.mark(function e(){var t,n,r,i,s,o,a,u,c=arguments;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=c.length>0&&void 0!==c[0]?c[0]:"BANDWIDTH",n=c.length>1&&void 0!==c[1]?c[1]:{},r=c.length>2&&void 0!==c[2]?c[2]:void 0,i=c.length>3&&void 0!==c[3]&&c[3],Le.isFunction(r)&&(i=r,r=void 0),Le.isFunction(t)&&(i=t,t="BANDWIDTH"),Le.isFunction(n)&&(i=n,n={}),"string"==typeof n&&(n={privateKey:n}),i){e.next=10;break}return e.abrupt("return",this.injectPromise(this.unfreezeBalance,t,n,r));case 10:if(["BANDWIDTH","ENERGY"].includes(t)){e.next=12;break}return e.abrupt("return",i('Invalid resource provided: Expected "BANDWIDTH" or "ENERGY"'));case 12:if((n=B()({privateKey:this.tronWeb.defaultPrivateKey,address:this.tronWeb.defaultAddress.hex},n)).privateKey||n.address){e.next=15;break}return e.abrupt("return",i("Function requires either a private key or address to be set"));case 15:return e.prev=15,s=n.privateKey?this.tronWeb.address.fromPrivateKey(n.privateKey):n.address,e.next=19,this.tronWeb.transactionBuilder.unfreezeBalance(t,s,r);case 19:return o=e.sent,e.next=22,this.sign(o,n.privateKey||void 0);case 22:return a=e.sent,e.next=25,this.sendRawTransaction(a);case 25:return u=e.sent,e.abrupt("return",i(null,u));case 29:return e.prev=29,e.t0=e.catch(15),e.abrupt("return",i(e.t0));case 32:case"end":return e.stop()}},e,this,[[15,29]])}));return function(){return e.apply(this,arguments)}}()},{key:"updateAccount",value:function(){var e=h()(d.a.mark(function e(){var t,n,r,i,s,o,a,u=arguments;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=u.length>0&&void 0!==u[0]&&u[0],n=u.length>1&&void 0!==u[1]?u[1]:{},r=u.length>2&&void 0!==u[2]&&u[2],Le.isFunction(n)&&(r=n,n={}),"string"==typeof n&&(n={privateKey:n}),r){e.next=7;break}return e.abrupt("return",this.injectPromise(this.updateAccount,t,n));case 7:if(Le.isString(t)&&t.length){e.next=9;break}return e.abrupt("return",r("Name must be a string"));case 9:if((n=B()({privateKey:this.tronWeb.defaultPrivateKey,address:this.tronWeb.defaultAddress.hex},n)).privateKey||n.address){e.next=12;break}return e.abrupt("return",r("Function requires either a private key or address to be set"));case 12:return e.prev=12,i=n.privateKey?this.tronWeb.address.fromPrivateKey(n.privateKey):n.address,e.next=16,this.tronWeb.transactionBuilder.updateAccount(t,i);case 16:return s=e.sent,e.next=19,this.sign(s,n.privateKey||void 0);case 19:return o=e.sent,e.next=22,this.sendRawTransaction(o);case 22:return a=e.sent,e.abrupt("return",r(null,a));case 26:return e.prev=26,e.t0=e.catch(12),e.abrupt("return",r(e.t0));case 29:case"end":return e.stop()}},e,this,[[12,26]])}));return function(){return e.apply(this,arguments)}}()},{key:"signMessage",value:function(){return this.sign.apply(this,arguments)}},{key:"sendAsset",value:function(){return this.sendToken.apply(this,arguments)}},{key:"send",value:function(){return this.sendTransaction.apply(this,arguments)}},{key:"sendTrx",value:function(){return this.sendTransaction.apply(this,arguments)}},{key:"broadcast",value:function(){return this.sendRawTransaction.apply(this,arguments)}},{key:"signTransaction",value:function(){return this.sign.apply(this,arguments)}},{key:"getProposal",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return t?!Le.isInteger(e)||e<0?t("Invalid proposalID provided"):void this.tronWeb.fullNode.request("wallet/getproposalbyid",{id:parseInt(e)},"post").then(function(e){t(null,e)}).catch(function(e){return t(e)}):this.injectPromise(this.getProposal,e)}},{key:"listProposals",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!e)return this.injectPromise(this.listProposals);this.tronWeb.fullNode.request("wallet/listproposals",{},"post").then(function(t){var n=t.proposals;e(null,void 0===n?[]:n)}).catch(function(t){return e(t)})}},{key:"getChainParameters",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!e)return this.injectPromise(this.getChainParameters);this.tronWeb.fullNode.request("wallet/getchainparameters",{},"post").then(function(t){var n=t.chainParameter;e(null,void 0===n?[]:n)}).catch(function(t){return e(t)})}},{key:"getAccountResources",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.tronWeb.defaultAddress.hex,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return t?this.tronWeb.isAddress(e)?void this.tronWeb.fullNode.request("wallet/getaccountresource",{address:this.tronWeb.address.toHex(e)},"post").then(function(e){t(null,e)}).catch(function(e){return t(e)}):t("Invalid address provided"):this.injectPromise(this.getAccountResources,e)}},{key:"getExchangeByID",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return t?!Le.isInteger(e)||e<0?t("Invalid exchangeID provided"):void this.tronWeb.fullNode.request("wallet/getexchangebyid",{id:e},"post").then(function(e){t(null,e)}).catch(function(e){return t(e)}):this.injectPromise(this.getExchangeByID,e)}},{key:"listExchanges",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!e)return this.injectPromise(this.listExchanges);this.tronWeb.fullNode.request("wallet/listexchanges",{},"post").then(function(t){var n=t.exchanges;e(null,void 0===n?[]:n)},"post").catch(function(t){return e(t)})}},{key:"listExchangesPaginated",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(Le.isFunction(t)&&(n=t,t=0),Le.isFunction(e)&&(n=e,e=30),!n)return this.injectPromise(this.listExchanges);this.tronWeb.fullNode.request("wallet/listexchangespaginated",{limit:e,offset:t},"post").then(function(e){var t=e.exchanges;n(null,void 0===t?[]:t)}).catch(function(e){return n(e)})}},{key:"getNodeInfo",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!e)return this.injectPromise(this.getNodeInfo);this.tronWeb.fullNode.request("wallet/getnodeinfo",{},"post").then(function(t){e(null,t)},"post").catch(function(t){return e(t)})}},{key:"getTokenListByName",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n?(Le.isInteger(t)&&(t=t.toString()),Le.isString(t)&&t.length?void this.tronWeb.fullNode.request("wallet/getassetissuelistbyname",{value:this.tronWeb.fromUtf8(t)},"post").then(function(t){if(!t.name)return n("Token does not exist");n(null,e._parseToken(t))}).catch(function(e){return n(e)}):n("Invalid token ID provided")):this.injectPromise(this.getTokenListByName,t)}},{key:"getTokenByID",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n?(Le.isInteger(t)&&(t=t.toString()),Le.isString(t)&&t.length?void this.tronWeb.fullNode.request("wallet/getassetissuebyid",{value:t},"post").then(function(t){if(!t.name)return n("Token does not exist");n(null,e._parseToken(t))}).catch(function(e){return n(e)}):n("Invalid token ID provided")):this.injectPromise(this.getTokenByID,t)}}],[{key:"verifySignature",value:function(e,t,n){var r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];e=e.replace(/^0x/,""),n=n.replace(/^0x/,"");var i=[].concat(R()(le(r?"TRON Signed Message:\n32":"Ethereum Signed Message:\n32")),R()(Le.code.hexStr2byteArray(e))),s=ce(i),o=he(s,{recoveryParam:"1c"==n.substring(128,130)?1:0,r:"0x"+n.substring(0,64),s:"0x"+n.substring(64,128)}),a=U+o.substr(2);return pt.address.fromHex(a)==pt.address.fromHex(t)}},{key:"signString",value:function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];e=e.replace(/^0x/,"");var r=new fe(t),i=[].concat(R()(le(n?"TRON Signed Message:\n32":"Ethereum Signed Message:\n32")),R()(Le.code.hexStr2byteArray(e))),s=ce(i),o=r.signDigest(s);return["0x",o.r.substring(2),o.s.substring(2),Number(o.v).toString(16)].join("")}}]),e}(),st=function(e){return e.name+"("+ot(e.inputs||[]).join(",")+")"},ot=function(e){return e.map(function(e){return e.type})},at=function(e,t){var n=e.map(function(e){return e.name}).filter(function(e){return!!e}),r=e.map(function(e){return e.type});return Le.abi.decodeParams(n,r,t)},ut=function(){function e(t,n){g()(this,e),this.tronWeb=t.tronWeb,this.contract=t,this.abi=n,this.name=n.name||(n.name=n.type),this.inputs=n.inputs||[],this.outputs=n.outputs||[],this.functionSelector=st(n),this.signature=this.tronWeb.sha3(this.functionSelector,!1).slice(0,8),this.injectPromise=Le.promiseInjector(this),this.defaultOptions={feeLimit:1e9,callValue:0,userFeePercentage:100,shouldPollResponse:!1}}return m()(e,[{key:"decodeInput",value:function(e){return at(this.inputs,"0x"+e)}},{key:"onMethod",value:function(){for(var e=this,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];var i=ot(this.inputs);return n.forEach(function(t,r){"address"==i[r]&&(n[r]=e.tronWeb.address.toHex(t).replace(z,"0x")),"address[]"==i[r]&&(n[r]=n[r].map(function(t){return e.tronWeb.address.toHex(t).replace(z,"0x")}))}),{call:function(){for(var t=arguments.length,r=new Array(t),s=0;s<t;s++)r[s]=arguments[s];return e._call.apply(e,[i,n].concat(r))},send:function(){for(var t=arguments.length,r=new Array(t),s=0;s<t;s++)r[s]=arguments[s];return e._send.apply(e,[i,n].concat(r))},watch:function(){return e._watch.apply(e,arguments)}}}},{key:"_call",value:function(){var e=h()(d.a.mark(function e(t,n){var r,i,s,o,a=this,u=arguments;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(r=u.length>2&&void 0!==u[2]?u[2]:{},i=u.length>3&&void 0!==u[3]&&u[3],Le.isFunction(r)&&(i=r,r={}),i){e.next=5;break}return e.abrupt("return",this.injectPromise(this._call,t,n,r));case 5:if(t.length===n.length){e.next=7;break}return e.abrupt("return",i("Invalid argument count provided"));case 7:if(this.contract.address){e.next=9;break}return e.abrupt("return",i("Smart contract is missing address"));case 9:if(this.contract.deployed){e.next=11;break}return e.abrupt("return",i("Calling smart contracts requires you to load the contract first"));case 11:if(s=this.abi.stateMutability,["pure","view"].includes(s.toLowerCase())){e.next=14;break}return e.abrupt("return",i('Methods with state mutability "'.concat(s,'" must use send()')));case 14:r=B()({},this.defaultOptions,{from:this.tronWeb.defaultAddress.hex},r),o=n.map(function(e,n){return{type:t[n],value:e}}),this.tronWeb.transactionBuilder.triggerSmartContract(this.contract.address,this.functionSelector,r,o,!!r.from&&this.tronWeb.address.toHex(r.from),function(e,t){if(e)return i(e);if(!Le.hasProperty(t,"constant_result"))return i("Failed to execute");try{var n=t.constant_result[0].length;if(0===n||n%64==8){var r="The call has been reverted or has thrown an error.";if(0!==n){r+=" Error message: ";for(var s="",o=t.constant_result[0].substring(8),u=0;u<n-8;u+=64)s+=a.tronWeb.toUtf8(o.substring(u,u+64));r+=s.replace(/(\u0000|\u000b|\f)+/g," ").replace(/ +/g," ").replace(/\s+$/g,"")}return i(r)}var c=at(a.outputs,"0x"+t.constant_result[0]);return 1===c.length&&(c=c[0]),i(null,c)}catch(e){return i(e)}});case 17:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}()},{key:"_send",value:function(){var e=h()(d.a.mark(function e(t,n){var r,i,s,o,a,u,c,l,f,v,p,g=this,b=arguments;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(r=b.length>2&&void 0!==b[2]?b[2]:{},i=b.length>3&&void 0!==b[3]?b[3]:this.tronWeb.defaultPrivateKey,s=b.length>4&&void 0!==b[4]&&b[4],Le.isFunction(i)&&(s=i,i=this.tronWeb.defaultPrivateKey),Le.isFunction(r)&&(s=r,r={}),s){e.next=7;break}return e.abrupt("return",this.injectPromise(this._send,t,n,r,i));case 7:if(t.length===n.length){e.next=9;break}throw new Error("Invalid argument count provided");case 9:if(this.contract.address){e.next=11;break}return e.abrupt("return",s("Smart contract is missing address"));case 11:if(this.contract.deployed){e.next=13;break}return e.abrupt("return",s("Calling smart contracts requires you to load the contract first"));case 13:if(o=this.abi.stateMutability,!["pure","view"].includes(o.toLowerCase())){e.next=16;break}return e.abrupt("return",s('Methods with state mutability "'.concat(o,'" must use call()')));case 16:return["payable"].includes(o.toLowerCase())||(r.callValue=0),r=B()({},this.defaultOptions,{from:this.tronWeb.defaultAddress.hex},r),a=n.map(function(e,n){return{type:t[n],value:e}}),e.prev=19,u=i?this.tronWeb.address.fromPrivateKey(i):this.tronWeb.defaultAddress.base58,e.next=23,this.tronWeb.transactionBuilder.triggerSmartContract(this.contract.address,this.functionSelector,r,a,this.tronWeb.address.toHex(u));case 23:if((c=e.sent).result&&c.result.result){e.next=26;break}return e.abrupt("return",s("Unknown error: "+JSON.stringify(c,null,2)));case 26:return e.next=28,this.tronWeb.trx.sign(c.transaction,i);case 28:if((l=e.sent).signature){e.next=33;break}if(i){e.next=32;break}return e.abrupt("return",s("Transaction was not signed properly"));case 32:return e.abrupt("return",s("Invalid private key provided"));case 33:return e.next=35,this.tronWeb.trx.sendRawTransaction(l);case 35:if(!(f=e.sent).code){e.next=40;break}return v={error:f.code,message:f.code},f.message&&(v.message=this.tronWeb.toUtf8(f.message)),e.abrupt("return",s(v));case 40:if(r.shouldPollResponse){e.next=42;break}return e.abrupt("return",s(null,l.txID));case 42:(p=function(){var e=h()(d.a.mark(function e(){var t,n,i,o=arguments;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(20!=(t=o.length>0&&void 0!==o[0]?o[0]:0)){e.next=3;break}return e.abrupt("return",s({error:"Cannot find result in solidity node",transaction:l}));case 3:return e.next=5,g.tronWeb.trx.getTransactionInfo(l.txID);case 5:if(n=e.sent,Object.keys(n).length){e.next=8;break}return e.abrupt("return",setTimeout(function(){p(t+1)},3e3));case 8:if(!n.result||"FAILED"!=n.result){e.next=10;break}return e.abrupt("return",s({error:g.tronWeb.toUtf8(n.resMessage),transaction:l,output:n}));case 10:if(Le.hasProperty(n,"contractResult")){e.next=12;break}return e.abrupt("return",s({error:"Failed to execute: "+JSON.stringify(n,null,2),transaction:l,output:n}));case 12:if(!r.rawResponse){e.next=14;break}return e.abrupt("return",s(null,n));case 14:return 1===(i=at(g.outputs,"0x"+n.contractResult[0])).length&&(i=i[0]),e.abrupt("return",s(null,i));case 17:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}())(),e.next=49;break;case 46:return e.prev=46,e.t0=e.catch(19),e.abrupt("return",s(e.t0));case 49:case"end":return e.stop()}},e,this,[[19,46]])}));return function(t,n){return e.apply(this,arguments)}}()},{key:"_watch",value:function(){var e=h()(d.a.mark(function e(){var t,n,r,i,s,o,a,u=this,c=arguments;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=c.length>0&&void 0!==c[0]?c[0]:{},n=c.length>1&&void 0!==c[1]&&c[1],Le.isFunction(t)&&(n=t,t={}),Le.isFunction(n)){e.next=5;break}throw new Error("Expected callback to be provided");case 5:if(this.contract.address){e.next=7;break}return e.abrupt("return",n("Smart contract is missing address"));case 7:if(this.abi.type&&/event/i.test(this.abi.type)){e.next=9;break}return e.abrupt("return",n("Invalid method type for event watching"));case 9:if(this.tronWeb.eventServer){e.next=11;break}return e.abrupt("return",n("No event server configured"));case 11:return r=!1,i=!1,s=Date.now()-1e3,o=function(){var e=h()(d.a.mark(function e(){var n,r,o,a,c,l;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={since:s,eventName:u.name,sort:"block_timestamp",blockNumber:"latest",filters:t.filters},t.resourceNode&&(/full/i.test(t.resourceNode)?n.onlyUnconfirmed=!0:n.onlyConfirmed=!0),e.next=5,u.tronWeb.event.getEventsByContractAddress(u.contract.address,n);case 5:return r=e.sent,o=r.sort(function(e,t){return t.block-e.block}),a=$e()(o,1),c=a[0],l=r.filter(function(e,n){return(!t.resourceNode||!e.resourceNode||t.resourceNode.toLowerCase()===e.resourceNode.toLowerCase())&&(!r.slice(0,n).some(function(t){return JSON.stringify(t)==JSON.stringify(e)})&&(!i||e.block>i))}),c&&(i=c.block),e.abrupt("return",l);case 12:return e.prev=12,e.t0=e.catch(0),e.abrupt("return",Promise.reject(e.t0));case 15:case"end":return e.stop()}},e,null,[[0,12]])}));return function(){return e.apply(this,arguments)}}(),a=function(){r&&clearInterval(r),r=setInterval(function(){o().then(function(e){return e.forEach(function(e){n(null,Le.parseEvent(e,u.abi))})}).catch(function(e){return n(e)})},3e3)},e.next=18,o();case 18:return a(),e.abrupt("return",{start:a(),stop:function(){r&&(clearInterval(r),r=!1)}});case 20:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}]),e}(),ct=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(g()(this,e),!t||!t instanceof pt)throw new Error("Expected instance of TronWeb");this.tronWeb=t,this.injectPromise=Le.promiseInjector(this),this.address=r,this.abi=n,this.eventListener=!1,this.bytecode=!1,this.deployed=!1,this.lastBlock=!1,this.methods={},this.methodInstances={},this.props=[],this.tronWeb.isAddress(r)?this.deployed=!0:this.address=!1,this.loadAbi(n)}return m()(e,[{key:"_getEvents",value:function(){var e=h()(d.a.mark(function e(){var t,n,r,i,s,o,a=this,u=arguments;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=u.length>0&&void 0!==u[0]?u[0]:{},e.next=3,this.tronWeb.event.getEventsByContractAddress(this.address,t);case 3:return n=e.sent,r=n.sort(function(e,t){return t.block-e.block}),i=$e()(r,1),s=i[0],o=n.filter(function(e,r){return(!t.resourceNode||!e.resourceNode||t.resourceNode.toLowerCase()===e.resourceNode.toLowerCase())&&(!n.slice(0,r).some(function(t){return JSON.stringify(t)==JSON.stringify(e)})&&(!a.lastBlock||e.block>a.lastBlock))}),s&&(this.lastBlock=s.block),e.abrupt("return",o);case 8:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"_startEventListener",value:function(){var e=h()(d.a.mark(function e(){var t,n,r=this,i=arguments;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=i.length>0&&void 0!==i[0]?i[0]:{},n=i.length>1?i[1]:void 0,Le.isFunction(t)&&(n=t,t={}),this.eventListener&&clearInterval(this.eventListener),this.tronWeb.eventServer){e.next=6;break}throw new Error("Event server is not configured");case 6:if(this.address){e.next=8;break}throw new Error("Contract is not configured with an address");case 8:return this.eventCallback=n,e.next=11,this._getEvents(t);case 11:this.eventListener=setInterval(function(){r._getEvents(t).then(function(e){return e.forEach(function(e){r.eventCallback&&r.eventCallback(e)})}).catch(function(e){console.error("Failed to get event list",e)})},3e3);case 12:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"_stopEventListener",value:function(){this.eventListener&&(clearInterval(this.eventListener),this.eventListener=!1,this.eventCallback=!1)}},{key:"hasProperty",value:function(e){return this.hasOwnProperty(e)||this.__proto__.hasOwnProperty(e)}},{key:"loadAbi",value:function(e){var t=this;this.abi=e,this.methods={},this.props.forEach(function(e){return delete t[e]}),e.forEach(function(e){if(e.type&&!/constructor/i.test(e.type)){var n=new ut(t,e),r=n.onMethod.bind(n),i=n.name,s=n.functionSelector,o=n.signature;t.methods[i]=r,t.methods[s]=r,t.methods[o]=r,t.methodInstances[i]=n,t.methodInstances[s]=n,t.methodInstances[o]=n,t.hasProperty(i)||(t[i]=r,t.props.push(i)),t.hasProperty(s)||(t[s]=r,t.props.push(s)),t.hasProperty(o)||(t[o]=r,t.props.push(o))}})}},{key:"decodeInput",value:function(e){var t=e.substring(0,8),n=e.substring(8);if(!this.methodInstances[t])throw new Error("Contract method "+t+" not found");return{name:this.methodInstances[t].name,params:this.methodInstances[t].decodeInput(n)}}},{key:"new",value:function(){var e=h()(d.a.mark(function e(t){var n,r,i,s,o,a,u=arguments;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=u.length>1&&void 0!==u[1]?u[1]:this.tronWeb.defaultPrivateKey,r=u.length>2&&void 0!==u[2]&&u[2],Le.isFunction(n)&&(r=n,n=this.tronWeb.defaultPrivateKey),r){e.next=5;break}return e.abrupt("return",this.injectPromise(this.new,t,n));case 5:return e.prev=5,i=this.tronWeb.address.fromPrivateKey(n),e.next=9,this.tronWeb.transactionBuilder.createSmartContract(t,i);case 9:return s=e.sent,e.next=12,this.tronWeb.trx.sign(s,n);case 12:return o=e.sent,e.next=15,this.tronWeb.trx.sendRawTransaction(o);case 15:if(!(a=e.sent).code){e.next=18;break}return e.abrupt("return",r({error:a.code,message:this.tronWeb.toUtf8(a.message)}));case 18:return e.next=20,Le.sleep(3e3);case 20:return e.abrupt("return",this.at(o.contract_address,r));case 23:return e.prev=23,e.t0=e.catch(5),e.abrupt("return",r(e.t0));case 26:case"end":return e.stop()}},e,this,[[5,23]])}));return function(t){return e.apply(this,arguments)}}()},{key:"at",value:function(){var e=h()(d.a.mark(function e(t){var n,r,i=arguments;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=i.length>1&&void 0!==i[1]&&i[1]){e.next=3;break}return e.abrupt("return",this.injectPromise(this.at,t));case 3:return e.prev=3,e.next=6,this.tronWeb.trx.getContract(t);case 6:if((r=e.sent).contract_address){e.next=9;break}return e.abrupt("return",n("Unknown error: "+JSON.stringify(r,null,2)));case 9:return this.address=r.contract_address,this.bytecode=r.bytecode,this.deployed=!0,this.loadAbi(r.abi.entrys),e.abrupt("return",n(null,this));case 16:if(e.prev=16,e.t0=e.catch(3),!e.t0.toString().includes("does not exist")){e.next=20;break}return e.abrupt("return",n("Contract has not been deployed on the network"));case 20:return e.abrupt("return",n(e.t0));case 21:case"end":return e.stop()}},e,this,[[3,16]])}));return function(t){return e.apply(this,arguments)}}()},{key:"events",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(Le.isFunction(e)&&(t=e,e={}),!Le.isFunction(t))throw new Error("Callback function expected");var n=this;return{start:function(){var r=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return r?(n._startEventListener(e,t).then(function(){r()}).catch(function(e){r(e)}),this):(n._startEventListener(e,t),this)},stop:function(){n._stopEventListener()}}}}]),e}(),dt=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(g()(this,e),!t||!t instanceof pt)throw new Error("Expected instance of TronWeb");this.tronWeb=t,this.pluginNoOverride=["register"]}return m()(e,[{key:"register",value:function(e,t){var n={requires:"0.0.0",components:{}},r={plugged:[],skipped:[]},i=new e(this.tronWeb);if(Le.isFunction(i.pluginInterface)&&(n=i.pluginInterface(t)),!Xe.a.satisfies(pt.version,n.requires))throw new Error("The plugin is not compatible with this version of TronWeb");for(var s in n.components)if(this.tronWeb.hasOwnProperty(s)){var o=n.components[s],a=this.tronWeb[s].pluginNoOverride||[];for(var u in o)"constructor"===u||this.tronWeb[s][u]&&(a.includes(u)||/^_/.test(u))?r.skipped.push(u):(this.tronWeb[s][u]=o[u].bind(this.tronWeb[s]),r.plugged.push(u))}return r}}]),e}(),lt=n(21),ht=n.n(lt),ft=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(g()(this,e),!(t&&t instanceof pt))throw new Error("Expected instance of TronWeb");this.tronWeb=t,this.injectPromise=Le.promiseInjector(this)}return m()(e,[{key:"setServer",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"healthcheck";if(!t)return this.tronWeb.eventServer=!1;if(Le.isString(t)&&(t=new ze.HttpProvider(t)),!this.tronWeb.isValidProvider(t))throw new Error("Invalid event server provided");this.tronWeb.eventServer=t,this.tronWeb.eventServer.isConnected=function(){return e.tronWeb.eventServer.request(n).then(function(){return!0}).catch(function(){return!1})}}},{key:"getEventsByContractAddress",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=Object.assign({sinceTimestamp:0,eventName:!1,blockNumber:!1,size:20,page:1},t),i=r.sinceTimestamp,s=r.since,o=r.fromTimestamp,a=r.eventName,u=r.blockNumber,c=r.size,d=r.page,l=r.onlyConfirmed,h=r.onlyUnconfirmed,f=r.previousLastEventFingerprint,p=r.previousFingerprint,g=r.fingerprint,b=r.rawResponse,m=r.sort,y=r.filters;if(!n)return this.injectPromise(this.getEventsByContractAddress,e,t);if(o=o||i||s,!this.tronWeb.eventServer)return n("No event server configured");var k=[];if(!this.tronWeb.isAddress(e))return n("Invalid contract address provided");if(a&&!e)return n("Usage of event name filtering requires a contract address");if(void 0!==o&&!Le.isInteger(o))return n("Invalid fromTimestamp provided");if(!Le.isInteger(c))return n("Invalid size provided");if(c>200&&(console.warn("Defaulting to maximum accepted size: 200"),c=200),!Le.isInteger(d))return n("Invalid page provided");if(u&&!a)return n("Usage of block number filtering requires an event name");e&&k.push(this.tronWeb.address.fromHex(e)),a&&k.push(a),u&&k.push(u);var x={size:c,page:d};return"object"===v()(y)&&Object.keys(y).length>0&&(x.filters=JSON.stringify(y)),o&&(x.fromTimestamp=x.since=o),l&&(x.onlyConfirmed=l),h&&!l&&(x.onlyUnconfirmed=h),m&&(x.sort=m),(g=g||p||f)&&(x.fingerprint=g),this.tronWeb.eventServer.request("event/contract/".concat(k.join("/"),"?").concat(ht.a.stringify(x))).then(function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return e?Le.isArray(e)?n(null,!0===b?e:e.map(function(e){return Le.mapEvent(e)})):n(e):n("Unknown error occurred")}).catch(function(e){return n(e.response&&e.response.data||e)})}},{key:"getEventsByTransactionID",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return Le.isFunction(t)&&(n=t,t={}),n?this.tronWeb.eventServer?this.tronWeb.eventServer.request("event/transaction/".concat(e)).then(function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return e?Le.isArray(e)?n(null,!0===t.rawResponse?e:e.map(function(e){return Le.mapEvent(e)})):n(e):n("Unknown error occurred")}).catch(function(e){return n(e.response&&e.response.data||e)}):n("No event server configured"):this.injectPromise(this.getEventsByTransactionID,e,t)}}]),e}();n.d(t,"default",function(){return pt});var vt="3.5.0",pt=function(e){function t(){var e,n,r=arguments.length>0&&void 0!==arguments[0]&&arguments[0],i=arguments.length>1&&void 0!==arguments[1]&&arguments[1],s=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return g()(this,t),e=k()(this,w()(t).call(this)),"object"===v()(r)&&(r.fullNode||r.fullHost)?(n=r.fullNode||r.fullHost,i=r.solidityNode||r.fullHost,s=r.eventServer||r.fullHost,o=r.privateKey):n=r,Le.isString(n)&&(n=new ze.HttpProvider(n)),Le.isString(i)&&(i=new ze.HttpProvider(i)),Le.isString(s)&&(s=new ze.HttpProvider(s)),e.event=new ft(W()(e)),e.transactionBuilder=new rt(W()(e)),e.trx=new it(W()(e)),e.plugin=new dt(W()(e)),e.utils=Le,e.setFullNode(n),e.setSolidityNode(i),e.setEventServer(s),e.providers=ze,e.BigNumber=Ve.a,e.defaultBlock=!1,e.defaultPrivateKey=!1,e.defaultAddress={hex:!1,base58:!1},["sha3","toHex","toUtf8","fromUtf8","toAscii","fromAscii","toDecimal","fromDecimal","toSun","fromSun","toBigNumber","isAddress","createAccount","address","version"].forEach(function(n){e[n]=t[n]}),o&&e.setPrivateKey(o),e.fullnodeVersion=vt,e.injectPromise=Le.promiseInjector(W()(e)),e}return P()(t,e),m()(t,[{key:"getFullnodeVersion",value:function(){var e=h()(d.a.mark(function e(){var t;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.trx.getNodeInfo();case 3:t=e.sent,this.fullnodeVersion=t.configNodeInfo.codeVersion,2===this.fullnodeVersion.split(".").length&&(this.fullnodeVersion+=".0"),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),this.fullnodeVersion=vt;case 11:case"end":return e.stop()}},e,this,[[0,8]])}));return function(){return e.apply(this,arguments)}}()},{key:"setDefaultBlock",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if([!1,"latest","earliest",0].includes(e))return this.defaultBlock=e;if(!Le.isInteger(e)||!e)throw new Error("Invalid block ID provided");this.defaultBlock=Math.abs(e)}},{key:"setPrivateKey",value:function(e){try{this.setAddress(this.address.fromPrivateKey(e))}catch(e){throw new Error("Invalid private key provided")}this.defaultPrivateKey=e,this.emit("privateKeyChanged",e)}},{key:"setAddress",value:function(e){if(!this.isAddress(e))throw new Error("Invalid address provided");var t=this.address.toHex(e),n=this.address.fromHex(e);this.defaultPrivateKey&&this.address.fromPrivateKey(this.defaultPrivateKey)!==n&&(this.defaultPrivateKey=!1),this.defaultAddress={hex:t,base58:n},this.emit("addressChanged",{hex:t,base58:n})}},{key:"fullnodeSatisfies",value:function(e){return Xe.a.satisfies(this.fullnodeVersion,e)}},{key:"isValidProvider",value:function(e){return Object.values(ze).some(function(t){return e instanceof t})}},{key:"setFullNode",value:function(e){if(Le.isString(e)&&(e=new ze.HttpProvider(e)),!this.isValidProvider(e))throw new Error("Invalid full node provided");this.fullNode=e,this.fullNode.setStatusPage("wallet/getnowblock"),this.getFullnodeVersion()}},{key:"setSolidityNode",value:function(e){if(Le.isString(e)&&(e=new ze.HttpProvider(e)),!this.isValidProvider(e))throw new Error("Invalid solidity node provided");this.solidityNode=e,this.solidityNode.setStatusPage("walletsolidity/getnowblock")}},{key:"setEventServer",value:function(){var e;(e=this.event).setServer.apply(e,arguments)}},{key:"currentProviders",value:function(){return{fullNode:this.fullNode,solidityNode:this.solidityNode,eventServer:this.eventServer}}},{key:"currentProvider",value:function(){return this.currentProviders()}},{key:"getEventResult",value:function(){for(var e,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return"object"!==v()(n[1])&&(n[1]={sinceTimestamp:n[1]||0,eventName:n[2]||!1,blockNumber:n[3]||!1,size:n[4]||20,page:n[5]||1},n.splice(2,4),Le.isFunction(n[2])||(Le.isFunction(n[1].page)?(n[2]=n[1].page,n[1].page=1):Le.isFunction(n[1].size)&&(n[2]=n[1].size,n[1].size=20,n[1].page=1))),(e=this.event).getEventsByContractAddress.apply(e,n)}},{key:"getEventByTransactionID",value:function(){var e;return(e=this.event).getEventsByTransactionID.apply(e,arguments)}},{key:"contract",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return new ct(this,e,t)}},{key:"isConnected",value:function(){var e=h()(d.a.mark(function e(){var t,n=arguments;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=n.length>0&&void 0!==n[0]&&n[0]){e.next=3;break}return e.abrupt("return",this.injectPromise(this.isConnected));case 3:return e.t0=t,e.next=6,this.fullNode.isConnected();case 6:return e.t1=e.sent,e.next=9,this.solidityNode.isConnected();case 9:if(e.t2=e.sent,e.t3=this.eventServer,!e.t3){e.next=15;break}return e.next=14,this.eventServer.isConnected();case 14:e.t3=e.sent;case 15:return e.t4=e.t3,e.t5={fullNode:e.t1,solidityNode:e.t2,eventServer:e.t4},e.abrupt("return",(0,e.t0)(null,e.t5));case 18:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}],[{key:"sha3",value:function(e){return(!(arguments.length>1&&void 0!==arguments[1])||arguments[1]?"0x":"")+ce(Buffer.from(e,"utf-8")).toString().substring(2)}},{key:"toHex",value:function(e){if(Le.isBoolean(e))return t.fromDecimal(+e);if(Le.isBigNumber(e))return t.fromDecimal(e);if("object"===v()(e))return t.fromUtf8(JSON.stringify(e));if(Le.isString(e)){if(/^(-|)0x/.test(e))return e;if(!isFinite(e))return t.fromUtf8(e)}var n=t.fromDecimal(e);if("0xNaN"===n)throw new Error("The passed value is not convertible to a hex string");return n}},{key:"toUtf8",value:function(e){if(Le.isHex(e))return e=e.replace(/^0x/,""),Buffer.from(e,"hex").toString("utf8");throw new Error("The passed value is not a valid hex string")}},{key:"fromUtf8",value:function(e){if(!Le.isString(e))throw new Error("The passed value is not a valid utf-8 string");return"0x"+Buffer.from(e,"utf8").toString("hex")}},{key:"toAscii",value:function(e){if(Le.isHex(e)){var t="",n=0,r=e.length;for("0x"===e.substring(0,2)&&(n=2);n<r;n+=2){var i=parseInt(e.substr(n,2),16);t+=String.fromCharCode(i)}return t}throw new Error("The passed value is not a valid hex string")}},{key:"fromAscii",value:function(e,t){if(!Le.isString(e))throw new Error("The passed value is not a valid utf-8 string");return"0x"+Buffer.from(e,"ascii").toString("hex").padEnd(t,"0")}},{key:"toDecimal",value:function(e){return t.toBigNumber(e).toNumber()}},{key:"fromDecimal",value:function(e){var n=t.toBigNumber(e),r=n.toString(16);return n.isLessThan(0)?"-0x"+r.substr(1):"0x"+r}},{key:"fromSun",value:function(e){var n=t.toBigNumber(e).div(1e6);return Le.isBigNumber(e)?n:n.toString(10)}},{key:"toSun",value:function(e){var n=t.toBigNumber(e).times(1e6);return Le.isBigNumber(e)?n:n.toString(10)}},{key:"toBigNumber",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return Le.isBigNumber(e)?e:Le.isString(e)&&/^(-|)0x/.test(e)?new Ve.a(e.replace("0x",""),16):new Ve.a(e.toString(10),10)}},{key:"isAddress",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!Le.isString(e))return!1;if(42===e.length)try{return t.isAddress(Le.crypto.getBase58CheckAddress(Le.code.hexStr2byteArray(e)))}catch(e){return!1}try{return Le.crypto.isAddressValid(e)}catch(e){return!1}}},{key:"createAccount",value:function(){var e=h()(d.a.mark(function e(){var t;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=Le.accounts.generateAccount(),e.abrupt("return",t);case 2:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()},{key:"address",get:function(){return{fromHex:function(e){return Le.isHex(e)?Le.crypto.getBase58CheckAddress(Le.code.hexStr2byteArray(e.replace(/^0x/,U))):e},toHex:function(e){return Le.isHex(e)?e.toLowerCase().replace(/^0x/,U):Le.code.byteArray2hexStr(Le.crypto.decodeBase58Address(e)).toLowerCase()},fromPrivateKey:function(e){try{return Le.crypto.pkToAddress(e)}catch(e){return!1}}}}}]),t}(Je.a);N()(pt,"providers",ze),N()(pt,"BigNumber",Ve.a),N()(pt,"TransactionBuilder",rt),N()(pt,"Trx",it),N()(pt,"Contract",ct),N()(pt,"Plugin",dt),N()(pt,"Event",ft),N()(pt,"version",Ge.a),N()(pt,"utils",Le)}]).default;
//# sourceMappingURL=TronWeb.node.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "2Tiy":
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__("HDXh").Buffer

module.exports = function (buf) {
	// If the buffer is backed by a Uint8Array, a faster version will work
	if (buf instanceof Uint8Array) {
		// If the buffer isn't a subarray, return the underlying ArrayBuffer
		if (buf.byteOffset === 0 && buf.byteLength === buf.buffer.byteLength) {
			return buf.buffer
		} else if (typeof buf.buffer.slice === 'function') {
			// Otherwise we need to get a proper copy
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
		}
	}

	if (Buffer.isBuffer(buf)) {
		// This is the slow version that will work with any Buffer
		// implementation (even in old browsers)
		var arrayCopy = new Uint8Array(buf.length)
		var len = buf.length
		for (var i = 0; i < len; i++) {
			arrayCopy[i] = buf[i]
		}
		return arrayCopy.buffer
	} else {
		throw new Error('Argument must be a Buffer')
	}
}


/***/ }),

/***/ "g2/l":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;;(function (globalObject) {
  'use strict';

/*
 *      bignumber.js v7.2.1
 *      A JavaScript library for arbitrary-precision arithmetic.
 *      https://github.com/MikeMcl/bignumber.js
 *      Copyright (c) 2018 Michael Mclaughlin <M8ch88l@gmail.com>
 *      MIT Licensed.
 *
 *      BigNumber.prototype methods     |  BigNumber methods
 *                                      |
 *      absoluteValue            abs    |  clone
 *      comparedTo                      |  config               set
 *      decimalPlaces            dp     |      DECIMAL_PLACES
 *      dividedBy                div    |      ROUNDING_MODE
 *      dividedToIntegerBy       idiv   |      EXPONENTIAL_AT
 *      exponentiatedBy          pow    |      RANGE
 *      integerValue                    |      CRYPTO
 *      isEqualTo                eq     |      MODULO_MODE
 *      isFinite                        |      POW_PRECISION
 *      isGreaterThan            gt     |      FORMAT
 *      isGreaterThanOrEqualTo   gte    |      ALPHABET
 *      isInteger                       |  isBigNumber
 *      isLessThan               lt     |  maximum              max
 *      isLessThanOrEqualTo      lte    |  minimum              min
 *      isNaN                           |  random
 *      isNegative                      |
 *      isPositive                      |
 *      isZero                          |
 *      minus                           |
 *      modulo                   mod    |
 *      multipliedBy             times  |
 *      negated                         |
 *      plus                            |
 *      precision                sd     |
 *      shiftedBy                       |
 *      squareRoot               sqrt   |
 *      toExponential                   |
 *      toFixed                         |
 *      toFormat                        |
 *      toFraction                      |
 *      toJSON                          |
 *      toNumber                        |
 *      toPrecision                     |
 *      toString                        |
 *      valueOf                         |
 *
 */


  var BigNumber,
    isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,

    mathceil = Math.ceil,
    mathfloor = Math.floor,

    bignumberError = '[BigNumber Error] ',
    tooManyDigits = bignumberError + 'Number primitive has more than 15 significant digits: ',

    BASE = 1e14,
    LOG_BASE = 14,
    MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
    // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
    POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
    SQRT_BASE = 1e7,

    // EDITABLE
    // The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
    // the arguments to toExponential, toFixed, toFormat, and toPrecision.
    MAX = 1E9;                                   // 0 to MAX_INT32


  /*
   * Create and return a BigNumber constructor.
   */
  function clone(configObject) {
    var div, convertBase, parseNumeric,
      P = BigNumber.prototype = { constructor: BigNumber, toString: null, valueOf: null },
      ONE = new BigNumber(1),


      //----------------------------- EDITABLE CONFIG DEFAULTS -------------------------------


      // The default values below must be integers within the inclusive ranges stated.
      // The values can also be changed at run-time using BigNumber.set.

      // The maximum number of decimal places for operations involving division.
      DECIMAL_PLACES = 20,                     // 0 to MAX

      // The rounding mode used when rounding to the above decimal places, and when using
      // toExponential, toFixed, toFormat and toPrecision, and round (default value).
      // UP         0 Away from zero.
      // DOWN       1 Towards zero.
      // CEIL       2 Towards +Infinity.
      // FLOOR      3 Towards -Infinity.
      // HALF_UP    4 Towards nearest neighbour. If equidistant, up.
      // HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
      // HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
      // HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
      // HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
      ROUNDING_MODE = 4,                       // 0 to 8

      // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

      // The exponent value at and beneath which toString returns exponential notation.
      // Number type: -7
      TO_EXP_NEG = -7,                         // 0 to -MAX

      // The exponent value at and above which toString returns exponential notation.
      // Number type: 21
      TO_EXP_POS = 21,                         // 0 to MAX

      // RANGE : [MIN_EXP, MAX_EXP]

      // The minimum exponent value, beneath which underflow to zero occurs.
      // Number type: -324  (5e-324)
      MIN_EXP = -1e7,                          // -1 to -MAX

      // The maximum exponent value, above which overflow to Infinity occurs.
      // Number type:  308  (1.7976931348623157e+308)
      // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
      MAX_EXP = 1e7,                           // 1 to MAX

      // Whether to use cryptographically-secure random number generation, if available.
      CRYPTO = false,                          // true or false

      // The modulo mode used when calculating the modulus: a mod n.
      // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
      // The remainder (r) is calculated as: r = a - n * q.
      //
      // UP        0 The remainder is positive if the dividend is negative, else is negative.
      // DOWN      1 The remainder has the same sign as the dividend.
      //             This modulo mode is commonly known as 'truncated division' and is
      //             equivalent to (a % n) in JavaScript.
      // FLOOR     3 The remainder has the same sign as the divisor (Python %).
      // HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
      // EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
      //             The remainder is always positive.
      //
      // The truncated division, floored division, Euclidian division and IEEE 754 remainder
      // modes are commonly used for the modulus operation.
      // Although the other rounding modes can also be used, they may not give useful results.
      MODULO_MODE = 1,                         // 0 to 9

      // The maximum number of significant digits of the result of the exponentiatedBy operation.
      // If POW_PRECISION is 0, there will be unlimited significant digits.
      POW_PRECISION = 0,                    // 0 to MAX

      // The format specification used by the BigNumber.prototype.toFormat method.
      FORMAT = {
        decimalSeparator: '.',
        groupSeparator: ',',
        groupSize: 3,
        secondaryGroupSize: 0,
        fractionGroupSeparator: '\xA0',      // non-breaking space
        fractionGroupSize: 0
      },

      // The alphabet used for base conversion.
      // It must be at least 2 characters long, with no '.' or repeated character.
      // '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'
      ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';


    //------------------------------------------------------------------------------------------


    // CONSTRUCTOR


    /*
     * The BigNumber constructor and exported function.
     * Create and return a new instance of a BigNumber object.
     *
     * n {number|string|BigNumber} A numeric value.
     * [b] {number} The base of n. Integer, 2 to ALPHABET.length inclusive.
     */
    function BigNumber(n, b) {
      var alphabet, c, caseChanged, e, i, isNum, len, str,
        x = this;

      // Enable constructor usage without new.
      if (!(x instanceof BigNumber)) {

        // Don't throw on constructor call without new (#81).
        // '[BigNumber Error] Constructor call without new: {n}'
        //throw Error(bignumberError + ' Constructor call without new: ' + n);
        return new BigNumber(n, b);
      }

      if (b == null) {

        // Duplicate.
        if (n instanceof BigNumber) {
          x.s = n.s;
          x.e = n.e;
          x.c = (n = n.c) ? n.slice() : n;
          return;
        }

        isNum = typeof n == 'number';

        if (isNum && n * 0 == 0) {

          // Use `1 / n` to handle minus zero also.
          x.s = 1 / n < 0 ? (n = -n, -1) : 1;

          // Faster path for integers.
          if (n === ~~n) {
            for (e = 0, i = n; i >= 10; i /= 10, e++);
            x.e = e;
            x.c = [n];
            return;
          }

          str = n + '';
        } else {
          if (!isNumeric.test(str = n + '')) return parseNumeric(x, str, isNum);
          x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
        }

        // Decimal point?
        if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

        // Exponential form?
        if ((i = str.search(/e/i)) > 0) {

          // Determine exponent.
          if (e < 0) e = i;
          e += +str.slice(i + 1);
          str = str.substring(0, i);
        } else if (e < 0) {

          // Integer.
          e = str.length;
        }

      } else {

        // '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
        intCheck(b, 2, ALPHABET.length, 'Base');
        str = n + '';

        // Allow exponential notation to be used with base 10 argument, while
        // also rounding to DECIMAL_PLACES as with other bases.
        if (b == 10) {
          x = new BigNumber(n instanceof BigNumber ? n : str);
          return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
        }

        isNum = typeof n == 'number';

        if (isNum) {

          // Avoid potential interpretation of Infinity and NaN as base 44+ values.
          if (n * 0 != 0) return parseNumeric(x, str, isNum, b);

          x.s = 1 / n < 0 ? (str = str.slice(1), -1) : 1;

          // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
          if (BigNumber.DEBUG && str.replace(/^0\.0*|\./, '').length > 15) {
            throw Error
             (tooManyDigits + n);
          }

          // Prevent later check for length on converted number.
          isNum = false;
        } else {
          x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
        }

        alphabet = ALPHABET.slice(0, b);
        e = i = 0;

        // Check that str is a valid base b number.
        // Don't use RegExp so alphabet can contain special characters.
        for (len = str.length; i < len; i++) {
          if (alphabet.indexOf(c = str.charAt(i)) < 0) {
            if (c == '.') {

              // If '.' is not the first character and it has not be found before.
              if (i > e) {
                e = len;
                continue;
              }
            } else if (!caseChanged) {

              // Allow e.g. hexadecimal 'FF' as well as 'ff'.
              if (str == str.toUpperCase() && (str = str.toLowerCase()) ||
                  str == str.toLowerCase() && (str = str.toUpperCase())) {
                caseChanged = true;
                i = -1;
                e = 0;
                continue;
              }
            }

            return parseNumeric(x, n + '', isNum, b);
          }
        }

        str = convertBase(str, b, 10, x.s);

        // Decimal point?
        if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');
        else e = str.length;
      }

      // Determine leading zeros.
      for (i = 0; str.charCodeAt(i) === 48; i++);

      // Determine trailing zeros.
      for (len = str.length; str.charCodeAt(--len) === 48;);

      str = str.slice(i, ++len);

      if (str) {
        len -= i;

        // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
        if (isNum && BigNumber.DEBUG &&
          len > 15 && (n > MAX_SAFE_INTEGER || n !== mathfloor(n))) {
            throw Error
             (tooManyDigits + (x.s * n));
        }

        e = e - i - 1;

         // Overflow?
        if (e > MAX_EXP) {

          // Infinity.
          x.c = x.e = null;

        // Underflow?
        } else if (e < MIN_EXP) {

          // Zero.
          x.c = [x.e = 0];
        } else {
          x.e = e;
          x.c = [];

          // Transform base

          // e is the base 10 exponent.
          // i is where to slice str to get the first element of the coefficient array.
          i = (e + 1) % LOG_BASE;
          if (e < 0) i += LOG_BASE;

          if (i < len) {
            if (i) x.c.push(+str.slice(0, i));

            for (len -= LOG_BASE; i < len;) {
              x.c.push(+str.slice(i, i += LOG_BASE));
            }

            str = str.slice(i);
            i = LOG_BASE - str.length;
          } else {
            i -= len;
          }

          for (; i--; str += '0');
          x.c.push(+str);
        }
      } else {

        // Zero.
        x.c = [x.e = 0];
      }
    }


    // CONSTRUCTOR PROPERTIES


    BigNumber.clone = clone;

    BigNumber.ROUND_UP = 0;
    BigNumber.ROUND_DOWN = 1;
    BigNumber.ROUND_CEIL = 2;
    BigNumber.ROUND_FLOOR = 3;
    BigNumber.ROUND_HALF_UP = 4;
    BigNumber.ROUND_HALF_DOWN = 5;
    BigNumber.ROUND_HALF_EVEN = 6;
    BigNumber.ROUND_HALF_CEIL = 7;
    BigNumber.ROUND_HALF_FLOOR = 8;
    BigNumber.EUCLID = 9;


    /*
     * Configure infrequently-changing library-wide settings.
     *
     * Accept an object with the following optional properties (if the value of a property is
     * a number, it must be an integer within the inclusive range stated):
     *
     *   DECIMAL_PLACES   {number}           0 to MAX
     *   ROUNDING_MODE    {number}           0 to 8
     *   EXPONENTIAL_AT   {number|number[]}  -MAX to MAX  or  [-MAX to 0, 0 to MAX]
     *   RANGE            {number|number[]}  -MAX to MAX (not zero)  or  [-MAX to -1, 1 to MAX]
     *   CRYPTO           {boolean}          true or false
     *   MODULO_MODE      {number}           0 to 9
     *   POW_PRECISION       {number}           0 to MAX
     *   ALPHABET         {string}           A string of two or more unique characters which does
     *                                       not contain '.'.
     *   FORMAT           {object}           An object with some of the following properties:
     *      decimalSeparator       {string}
     *      groupSeparator         {string}
     *      groupSize              {number}
     *      secondaryGroupSize     {number}
     *      fractionGroupSeparator {string}
     *      fractionGroupSize      {number}
     *
     * (The values assigned to the above FORMAT object properties are not checked for validity.)
     *
     * E.g.
     * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
     *
     * Ignore properties/parameters set to null or undefined, except for ALPHABET.
     *
     * Return an object with the properties current values.
     */
    BigNumber.config = BigNumber.set = function (obj) {
      var p, v;

      if (obj != null) {

        if (typeof obj == 'object') {

          // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
          // '[BigNumber Error] DECIMAL_PLACES {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'DECIMAL_PLACES')) {
            v = obj[p];
            intCheck(v, 0, MAX, p);
            DECIMAL_PLACES = v;
          }

          // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
          // '[BigNumber Error] ROUNDING_MODE {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'ROUNDING_MODE')) {
            v = obj[p];
            intCheck(v, 0, 8, p);
            ROUNDING_MODE = v;
          }

          // EXPONENTIAL_AT {number|number[]}
          // Integer, -MAX to MAX inclusive or
          // [integer -MAX to 0 inclusive, 0 to MAX inclusive].
          // '[BigNumber Error] EXPONENTIAL_AT {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'EXPONENTIAL_AT')) {
            v = obj[p];
            if (isArray(v)) {
              intCheck(v[0], -MAX, 0, p);
              intCheck(v[1], 0, MAX, p);
              TO_EXP_NEG = v[0];
              TO_EXP_POS = v[1];
            } else {
              intCheck(v, -MAX, MAX, p);
              TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
            }
          }

          // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
          // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
          // '[BigNumber Error] RANGE {not a primitive number|not an integer|out of range|cannot be zero}: {v}'
          if (obj.hasOwnProperty(p = 'RANGE')) {
            v = obj[p];
            if (isArray(v)) {
              intCheck(v[0], -MAX, -1, p);
              intCheck(v[1], 1, MAX, p);
              MIN_EXP = v[0];
              MAX_EXP = v[1];
            } else {
              intCheck(v, -MAX, MAX, p);
              if (v) {
                MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
              } else {
                throw Error
                 (bignumberError + p + ' cannot be zero: ' + v);
              }
            }
          }

          // CRYPTO {boolean} true or false.
          // '[BigNumber Error] CRYPTO not true or false: {v}'
          // '[BigNumber Error] crypto unavailable'
          if (obj.hasOwnProperty(p = 'CRYPTO')) {
            v = obj[p];
            if (v === !!v) {
              if (v) {
                if (typeof crypto != 'undefined' && crypto &&
                 (crypto.getRandomValues || crypto.randomBytes)) {
                  CRYPTO = v;
                } else {
                  CRYPTO = !v;
                  throw Error
                   (bignumberError + 'crypto unavailable');
                }
              } else {
                CRYPTO = v;
              }
            } else {
              throw Error
               (bignumberError + p + ' not true or false: ' + v);
            }
          }

          // MODULO_MODE {number} Integer, 0 to 9 inclusive.
          // '[BigNumber Error] MODULO_MODE {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'MODULO_MODE')) {
            v = obj[p];
            intCheck(v, 0, 9, p);
            MODULO_MODE = v;
          }

          // POW_PRECISION {number} Integer, 0 to MAX inclusive.
          // '[BigNumber Error] POW_PRECISION {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'POW_PRECISION')) {
            v = obj[p];
            intCheck(v, 0, MAX, p);
            POW_PRECISION = v;
          }

          // FORMAT {object}
          // '[BigNumber Error] FORMAT not an object: {v}'
          if (obj.hasOwnProperty(p = 'FORMAT')) {
            v = obj[p];
            if (typeof v == 'object') FORMAT = v;
            else throw Error
             (bignumberError + p + ' not an object: ' + v);
          }

          // ALPHABET {string}
          // '[BigNumber Error] ALPHABET invalid: {v}'
          if (obj.hasOwnProperty(p = 'ALPHABET')) {
            v = obj[p];

            // Disallow if only one character, or contains '.' or a repeated character.
            if (typeof v == 'string' && !/^.$|\.|(.).*\1/.test(v)) {
              ALPHABET = v;
            } else {
              throw Error
               (bignumberError + p + ' invalid: ' + v);
            }
          }

        } else {

          // '[BigNumber Error] Object expected: {v}'
          throw Error
           (bignumberError + 'Object expected: ' + obj);
        }
      }

      return {
        DECIMAL_PLACES: DECIMAL_PLACES,
        ROUNDING_MODE: ROUNDING_MODE,
        EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
        RANGE: [MIN_EXP, MAX_EXP],
        CRYPTO: CRYPTO,
        MODULO_MODE: MODULO_MODE,
        POW_PRECISION: POW_PRECISION,
        FORMAT: FORMAT,
        ALPHABET: ALPHABET
      };
    };


    /*
     * Return true if v is a BigNumber instance, otherwise return false.
     *
     * v {any}
     */
    BigNumber.isBigNumber = function (v) {
      return v instanceof BigNumber || v && v._isBigNumber === true || false;
    };


    /*
     * Return a new BigNumber whose value is the maximum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */
    BigNumber.maximum = BigNumber.max = function () {
      return maxOrMin(arguments, P.lt);
    };


    /*
     * Return a new BigNumber whose value is the minimum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */
    BigNumber.minimum = BigNumber.min = function () {
      return maxOrMin(arguments, P.gt);
    };


    /*
     * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
     * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
     * zeros are produced).
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp}'
     * '[BigNumber Error] crypto unavailable'
     */
    BigNumber.random = (function () {
      var pow2_53 = 0x20000000000000;

      // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
      // Check if Math.random() produces more than 32 bits of randomness.
      // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
      // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
      var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
       ? function () { return mathfloor(Math.random() * pow2_53); }
       : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
         (Math.random() * 0x800000 | 0); };

      return function (dp) {
        var a, b, e, k, v,
          i = 0,
          c = [],
          rand = new BigNumber(ONE);

        if (dp == null) dp = DECIMAL_PLACES;
        else intCheck(dp, 0, MAX);

        k = mathceil(dp / LOG_BASE);

        if (CRYPTO) {

          // Browsers supporting crypto.getRandomValues.
          if (crypto.getRandomValues) {

            a = crypto.getRandomValues(new Uint32Array(k *= 2));

            for (; i < k;) {

              // 53 bits:
              // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
              // 11111 11111111 11111111 11111111 11100000 00000000 00000000
              // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
              //                                     11111 11111111 11111111
              // 0x20000 is 2^21.
              v = a[i] * 0x20000 + (a[i + 1] >>> 11);

              // Rejection sampling:
              // 0 <= v < 9007199254740992
              // Probability that v >= 9e15, is
              // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
              if (v >= 9e15) {
                b = crypto.getRandomValues(new Uint32Array(2));
                a[i] = b[0];
                a[i + 1] = b[1];
              } else {

                // 0 <= v <= 8999999999999999
                // 0 <= (v % 1e14) <= 99999999999999
                c.push(v % 1e14);
                i += 2;
              }
            }
            i = k / 2;

          // Node.js supporting crypto.randomBytes.
          } else if (crypto.randomBytes) {

            // buffer
            a = crypto.randomBytes(k *= 7);

            for (; i < k;) {

              // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
              // 0x100000000 is 2^32, 0x1000000 is 2^24
              // 11111 11111111 11111111 11111111 11111111 11111111 11111111
              // 0 <= v < 9007199254740992
              v = ((a[i] & 31) * 0x1000000000000) + (a[i + 1] * 0x10000000000) +
                 (a[i + 2] * 0x100000000) + (a[i + 3] * 0x1000000) +
                 (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];

              if (v >= 9e15) {
                crypto.randomBytes(7).copy(a, i);
              } else {

                // 0 <= (v % 1e14) <= 99999999999999
                c.push(v % 1e14);
                i += 7;
              }
            }
            i = k / 7;
          } else {
            CRYPTO = false;
            throw Error
             (bignumberError + 'crypto unavailable');
          }
        }

        // Use Math.random.
        if (!CRYPTO) {

          for (; i < k;) {
            v = random53bitInt();
            if (v < 9e15) c[i++] = v % 1e14;
          }
        }

        k = c[--i];
        dp %= LOG_BASE;

        // Convert trailing digits to zeros according to dp.
        if (k && dp) {
          v = POWS_TEN[LOG_BASE - dp];
          c[i] = mathfloor(k / v) * v;
        }

        // Remove trailing elements which are zero.
        for (; c[i] === 0; c.pop(), i--);

        // Zero?
        if (i < 0) {
          c = [e = 0];
        } else {

          // Remove leading elements which are zero and adjust exponent accordingly.
          for (e = -1 ; c[0] === 0; c.splice(0, 1), e -= LOG_BASE);

          // Count the digits of the first element of c to determine leading zeros, and...
          for (i = 1, v = c[0]; v >= 10; v /= 10, i++);

          // adjust the exponent accordingly.
          if (i < LOG_BASE) e -= LOG_BASE - i;
        }

        rand.e = e;
        rand.c = c;
        return rand;
      };
    })();


    // PRIVATE FUNCTIONS


    // Called by BigNumber and BigNumber.prototype.toString.
    convertBase = (function () {
      var decimal = '0123456789';

      /*
       * Convert string of baseIn to an array of numbers of baseOut.
       * Eg. toBaseOut('255', 10, 16) returns [15, 15].
       * Eg. toBaseOut('ff', 16, 10) returns [2, 5, 5].
       */
      function toBaseOut(str, baseIn, baseOut, alphabet) {
        var j,
          arr = [0],
          arrL,
          i = 0,
          len = str.length;

        for (; i < len;) {
          for (arrL = arr.length; arrL--; arr[arrL] *= baseIn);

          arr[0] += alphabet.indexOf(str.charAt(i++));

          for (j = 0; j < arr.length; j++) {

            if (arr[j] > baseOut - 1) {
              if (arr[j + 1] == null) arr[j + 1] = 0;
              arr[j + 1] += arr[j] / baseOut | 0;
              arr[j] %= baseOut;
            }
          }
        }

        return arr.reverse();
      }

      // Convert a numeric string of baseIn to a numeric string of baseOut.
      // If the caller is toString, we are converting from base 10 to baseOut.
      // If the caller is BigNumber, we are converting from baseIn to base 10.
      return function (str, baseIn, baseOut, sign, callerIsToString) {
        var alphabet, d, e, k, r, x, xc, y,
          i = str.indexOf('.'),
          dp = DECIMAL_PLACES,
          rm = ROUNDING_MODE;

        // Non-integer.
        if (i >= 0) {
          k = POW_PRECISION;

          // Unlimited precision.
          POW_PRECISION = 0;
          str = str.replace('.', '');
          y = new BigNumber(baseIn);
          x = y.pow(str.length - i);
          POW_PRECISION = k;

          // Convert str as if an integer, then restore the fraction part by dividing the
          // result by its base raised to a power.

          y.c = toBaseOut(toFixedPoint(coeffToString(x.c), x.e, '0'),
           10, baseOut, decimal);
          y.e = y.c.length;
        }

        // Convert the number as integer.

        xc = toBaseOut(str, baseIn, baseOut, callerIsToString
         ? (alphabet = ALPHABET, decimal)
         : (alphabet = decimal, ALPHABET));

        // xc now represents str as an integer and converted to baseOut. e is the exponent.
        e = k = xc.length;

        // Remove trailing zeros.
        for (; xc[--k] == 0; xc.pop());

        // Zero?
        if (!xc[0]) return alphabet.charAt(0);

        // Does str represent an integer? If so, no need for the division.
        if (i < 0) {
          --e;
        } else {
          x.c = xc;
          x.e = e;

          // The sign is needed for correct rounding.
          x.s = sign;
          x = div(x, y, dp, rm, baseOut);
          xc = x.c;
          r = x.r;
          e = x.e;
        }

        // xc now represents str converted to baseOut.

        // THe index of the rounding digit.
        d = e + dp + 1;

        // The rounding digit: the digit to the right of the digit that may be rounded up.
        i = xc[d];

        // Look at the rounding digits and mode to determine whether to round up.

        k = baseOut / 2;
        r = r || d < 0 || xc[d + 1] != null;

        r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
              : i > k || i == k &&(rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
               rm == (x.s < 0 ? 8 : 7));

        // If the index of the rounding digit is not greater than zero, or xc represents
        // zero, then the result of the base conversion is zero or, if rounding up, a value
        // such as 0.00001.
        if (d < 1 || !xc[0]) {

          // 1^-dp or 0
          str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0))
              : alphabet.charAt(0);
        } else {

          // Truncate xc to the required number of decimal places.
          xc.length = d;

          // Round up?
          if (r) {

            // Rounding up may mean the previous digit has to be rounded up and so on.
            for (--baseOut; ++xc[--d] > baseOut;) {
              xc[d] = 0;

              if (!d) {
                ++e;
                xc = [1].concat(xc);
              }
            }
          }

          // Determine trailing zeros.
          for (k = xc.length; !xc[--k];);

          // E.g. [4, 11, 15] becomes 4bf.
          for (i = 0, str = ''; i <= k; str += alphabet.charAt(xc[i++]));

          // Add leading zeros, decimal point and trailing zeros as required.
          str = toFixedPoint(str, e, alphabet.charAt(0));
        }

        // The caller will add the sign.
        return str;
      };
    })();


    // Perform division in the specified base. Called by div and convertBase.
    div = (function () {

      // Assume non-zero x and k.
      function multiply(x, k, base) {
        var m, temp, xlo, xhi,
          carry = 0,
          i = x.length,
          klo = k % SQRT_BASE,
          khi = k / SQRT_BASE | 0;

        for (x = x.slice(); i--;) {
          xlo = x[i] % SQRT_BASE;
          xhi = x[i] / SQRT_BASE | 0;
          m = khi * xlo + xhi * klo;
          temp = klo * xlo + ((m % SQRT_BASE) * SQRT_BASE) + carry;
          carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
          x[i] = temp % base;
        }

        if (carry) x = [carry].concat(x);

        return x;
      }

      function compare(a, b, aL, bL) {
        var i, cmp;

        if (aL != bL) {
          cmp = aL > bL ? 1 : -1;
        } else {

          for (i = cmp = 0; i < aL; i++) {

            if (a[i] != b[i]) {
              cmp = a[i] > b[i] ? 1 : -1;
              break;
            }
          }
        }

        return cmp;
      }

      function subtract(a, b, aL, base) {
        var i = 0;

        // Subtract b from a.
        for (; aL--;) {
          a[aL] -= i;
          i = a[aL] < b[aL] ? 1 : 0;
          a[aL] = i * base + a[aL] - b[aL];
        }

        // Remove leading zeros.
        for (; !a[0] && a.length > 1; a.splice(0, 1));
      }

      // x: dividend, y: divisor.
      return function (x, y, dp, rm, base) {
        var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
          yL, yz,
          s = x.s == y.s ? 1 : -1,
          xc = x.c,
          yc = y.c;

        // Either NaN, Infinity or 0?
        if (!xc || !xc[0] || !yc || !yc[0]) {

          return new BigNumber(

           // Return NaN if either NaN, or both Infinity or 0.
           !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN :

            // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
            xc && xc[0] == 0 || !yc ? s * 0 : s / 0
         );
        }

        q = new BigNumber(s);
        qc = q.c = [];
        e = x.e - y.e;
        s = dp + e + 1;

        if (!base) {
          base = BASE;
          e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
          s = s / LOG_BASE | 0;
        }

        // Result exponent may be one less then the current value of e.
        // The coefficients of the BigNumbers from convertBase may have trailing zeros.
        for (i = 0; yc[i] == (xc[i] || 0); i++);

        if (yc[i] > (xc[i] || 0)) e--;

        if (s < 0) {
          qc.push(1);
          more = true;
        } else {
          xL = xc.length;
          yL = yc.length;
          i = 0;
          s += 2;

          // Normalise xc and yc so highest order digit of yc is >= base / 2.

          n = mathfloor(base / (yc[0] + 1));

          // Not necessary, but to handle odd bases where yc[0] == (base / 2) - 1.
          // if (n > 1 || n++ == 1 && yc[0] < base / 2) {
          if (n > 1) {
            yc = multiply(yc, n, base);
            xc = multiply(xc, n, base);
            yL = yc.length;
            xL = xc.length;
          }

          xi = yL;
          rem = xc.slice(0, yL);
          remL = rem.length;

          // Add zeros to make remainder as long as divisor.
          for (; remL < yL; rem[remL++] = 0);
          yz = yc.slice();
          yz = [0].concat(yz);
          yc0 = yc[0];
          if (yc[1] >= base / 2) yc0++;
          // Not necessary, but to prevent trial digit n > base, when using base 3.
          // else if (base == 3 && yc0 == 1) yc0 = 1 + 1e-15;

          do {
            n = 0;

            // Compare divisor and remainder.
            cmp = compare(yc, rem, yL, remL);

            // If divisor < remainder.
            if (cmp < 0) {

              // Calculate trial digit, n.

              rem0 = rem[0];
              if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);

              // n is how many times the divisor goes into the current remainder.
              n = mathfloor(rem0 / yc0);

              //  Algorithm:
              //  product = divisor multiplied by trial digit (n).
              //  Compare product and remainder.
              //  If product is greater than remainder:
              //    Subtract divisor from product, decrement trial digit.
              //  Subtract product from remainder.
              //  If product was less than remainder at the last compare:
              //    Compare new remainder and divisor.
              //    If remainder is greater than divisor:
              //      Subtract divisor from remainder, increment trial digit.

              if (n > 1) {

                // n may be > base only when base is 3.
                if (n >= base) n = base - 1;

                // product = divisor * trial digit.
                prod = multiply(yc, n, base);
                prodL = prod.length;
                remL = rem.length;

                // Compare product and remainder.
                // If product > remainder then trial digit n too high.
                // n is 1 too high about 5% of the time, and is not known to have
                // ever been more than 1 too high.
                while (compare(prod, rem, prodL, remL) == 1) {
                  n--;

                  // Subtract divisor from product.
                  subtract(prod, yL < prodL ? yz : yc, prodL, base);
                  prodL = prod.length;
                  cmp = 1;
                }
              } else {

                // n is 0 or 1, cmp is -1.
                // If n is 0, there is no need to compare yc and rem again below,
                // so change cmp to 1 to avoid it.
                // If n is 1, leave cmp as -1, so yc and rem are compared again.
                if (n == 0) {

                  // divisor < remainder, so n must be at least 1.
                  cmp = n = 1;
                }

                // product = divisor
                prod = yc.slice();
                prodL = prod.length;
              }

              if (prodL < remL) prod = [0].concat(prod);

              // Subtract product from remainder.
              subtract(rem, prod, remL, base);
              remL = rem.length;

               // If product was < remainder.
              if (cmp == -1) {

                // Compare divisor and new remainder.
                // If divisor < new remainder, subtract divisor from remainder.
                // Trial digit n too low.
                // n is 1 too low about 5% of the time, and very rarely 2 too low.
                while (compare(yc, rem, yL, remL) < 1) {
                  n++;

                  // Subtract divisor from remainder.
                  subtract(rem, yL < remL ? yz : yc, remL, base);
                  remL = rem.length;
                }
              }
            } else if (cmp === 0) {
              n++;
              rem = [0];
            } // else cmp === 1 and n will be 0

            // Add the next digit, n, to the result array.
            qc[i++] = n;

            // Update the remainder.
            if (rem[0]) {
              rem[remL++] = xc[xi] || 0;
            } else {
              rem = [xc[xi]];
              remL = 1;
            }
          } while ((xi++ < xL || rem[0] != null) && s--);

          more = rem[0] != null;

          // Leading zero?
          if (!qc[0]) qc.splice(0, 1);
        }

        if (base == BASE) {

          // To calculate q.e, first get the number of digits of qc[0].
          for (i = 1, s = qc[0]; s >= 10; s /= 10, i++);

          round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);

        // Caller is convertBase.
        } else {
          q.e = e;
          q.r = +more;
        }

        return q;
      };
    })();


    /*
     * Return a string representing the value of BigNumber n in fixed-point or exponential
     * notation rounded to the specified decimal places or significant digits.
     *
     * n: a BigNumber.
     * i: the index of the last digit required (i.e. the digit that may be rounded up).
     * rm: the rounding mode.
     * id: 1 (toExponential) or 2 (toPrecision).
     */
    function format(n, i, rm, id) {
      var c0, e, ne, len, str;

      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);

      if (!n.c) return n.toString();

      c0 = n.c[0];
      ne = n.e;

      if (i == null) {
        str = coeffToString(n.c);
        str = id == 1 || id == 2 && ne <= TO_EXP_NEG
         ? toExponential(str, ne)
         : toFixedPoint(str, ne, '0');
      } else {
        n = round(new BigNumber(n), i, rm);

        // n.e may have changed if the value was rounded up.
        e = n.e;

        str = coeffToString(n.c);
        len = str.length;

        // toPrecision returns exponential notation if the number of significant digits
        // specified is less than the number of digits necessary to represent the integer
        // part of the value in fixed-point notation.

        // Exponential notation.
        if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {

          // Append zeros?
          for (; len < i; str += '0', len++);
          str = toExponential(str, e);

        // Fixed-point notation.
        } else {
          i -= ne;
          str = toFixedPoint(str, e, '0');

          // Append zeros?
          if (e + 1 > len) {
            if (--i > 0) for (str += '.'; i--; str += '0');
          } else {
            i += e - len;
            if (i > 0) {
              if (e + 1 == len) str += '.';
              for (; i--; str += '0');
            }
          }
        }
      }

      return n.s < 0 && c0 ? '-' + str : str;
    }


    // Handle BigNumber.max and BigNumber.min.
    function maxOrMin(args, method) {
      var m, n,
        i = 0;

      if (isArray(args[0])) args = args[0];
      m = new BigNumber(args[0]);

      for (; ++i < args.length;) {
        n = new BigNumber(args[i]);

        // If any number is NaN, return NaN.
        if (!n.s) {
          m = n;
          break;
        } else if (method.call(m, n)) {
          m = n;
        }
      }

      return m;
    }


    /*
     * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
     * Called by minus, plus and times.
     */
    function normalise(n, c, e) {
      var i = 1,
        j = c.length;

       // Remove trailing zeros.
      for (; !c[--j]; c.pop());

      // Calculate the base 10 exponent. First get the number of digits of c[0].
      for (j = c[0]; j >= 10; j /= 10, i++);

      // Overflow?
      if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {

        // Infinity.
        n.c = n.e = null;

      // Underflow?
      } else if (e < MIN_EXP) {

        // Zero.
        n.c = [n.e = 0];
      } else {
        n.e = e;
        n.c = c;
      }

      return n;
    }


    // Handle values that fail the validity test in BigNumber.
    parseNumeric = (function () {
      var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
        dotAfter = /^([^.]+)\.$/,
        dotBefore = /^\.([^.]+)$/,
        isInfinityOrNaN = /^-?(Infinity|NaN)$/,
        whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;

      return function (x, str, isNum, b) {
        var base,
          s = isNum ? str : str.replace(whitespaceOrPlus, '');

        // No exception on ±Infinity or NaN.
        if (isInfinityOrNaN.test(s)) {
          x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
          x.c = x.e = null;
        } else {
          if (!isNum) {

            // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
            s = s.replace(basePrefix, function (m, p1, p2) {
              base = (p2 = p2.toLowerCase()) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
              return !b || b == base ? p1 : m;
            });

            if (b) {
              base = b;

              // E.g. '1.' to '1', '.1' to '0.1'
              s = s.replace(dotAfter, '$1').replace(dotBefore, '0.$1');
            }

            if (str != s) return new BigNumber(s, base);
          }

          // '[BigNumber Error] Not a number: {n}'
          // '[BigNumber Error] Not a base {b} number: {n}'
          if (BigNumber.DEBUG) {
            throw Error
              (bignumberError + 'Not a' + (b ? ' base ' + b : '') + ' number: ' + str);
          }

          // NaN
          x.c = x.e = x.s = null;
        }
      }
    })();


    /*
     * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
     * If r is truthy, it is known that there are more digits after the rounding digit.
     */
    function round(x, sd, rm, r) {
      var d, i, j, k, n, ni, rd,
        xc = x.c,
        pows10 = POWS_TEN;

      // if x is not Infinity or NaN...
      if (xc) {

        // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
        // n is a base 1e14 number, the value of the element of array x.c containing rd.
        // ni is the index of n within x.c.
        // d is the number of digits of n.
        // i is the index of rd within n including leading zeros.
        // j is the actual index of rd within n (if < 0, rd is a leading zero).
        out: {

          // Get the number of digits of the first element of xc.
          for (d = 1, k = xc[0]; k >= 10; k /= 10, d++);
          i = sd - d;

          // If the rounding digit is in the first element of xc...
          if (i < 0) {
            i += LOG_BASE;
            j = sd;
            n = xc[ni = 0];

            // Get the rounding digit at index j of n.
            rd = n / pows10[d - j - 1] % 10 | 0;
          } else {
            ni = mathceil((i + 1) / LOG_BASE);

            if (ni >= xc.length) {

              if (r) {

                // Needed by sqrt.
                for (; xc.length <= ni; xc.push(0));
                n = rd = 0;
                d = 1;
                i %= LOG_BASE;
                j = i - LOG_BASE + 1;
              } else {
                break out;
              }
            } else {
              n = k = xc[ni];

              // Get the number of digits of n.
              for (d = 1; k >= 10; k /= 10, d++);

              // Get the index of rd within n.
              i %= LOG_BASE;

              // Get the index of rd within n, adjusted for leading zeros.
              // The number of leading zeros of n is given by LOG_BASE - d.
              j = i - LOG_BASE + d;

              // Get the rounding digit at index j of n.
              rd = j < 0 ? 0 : n / pows10[d - j - 1] % 10 | 0;
            }
          }

          r = r || sd < 0 ||

          // Are there any non-zero digits after the rounding digit?
          // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
          // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
           xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);

          r = rm < 4
           ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
           : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 &&

            // Check whether the digit to the left of the rounding digit is odd.
            ((i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10) & 1 ||
             rm == (x.s < 0 ? 8 : 7));

          if (sd < 1 || !xc[0]) {
            xc.length = 0;

            if (r) {

              // Convert sd to decimal places.
              sd -= x.e + 1;

              // 1, 0.1, 0.01, 0.001, 0.0001 etc.
              xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
              x.e = -sd || 0;
            } else {

              // Zero.
              xc[0] = x.e = 0;
            }

            return x;
          }

          // Remove excess digits.
          if (i == 0) {
            xc.length = ni;
            k = 1;
            ni--;
          } else {
            xc.length = ni + 1;
            k = pows10[LOG_BASE - i];

            // E.g. 56700 becomes 56000 if 7 is the rounding digit.
            // j > 0 means i > number of leading zeros of n.
            xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
          }

          // Round up?
          if (r) {

            for (; ;) {

              // If the digit to be rounded up is in the first element of xc...
              if (ni == 0) {

                // i will be the length of xc[0] before k is added.
                for (i = 1, j = xc[0]; j >= 10; j /= 10, i++);
                j = xc[0] += k;
                for (k = 1; j >= 10; j /= 10, k++);

                // if i != k the length has increased.
                if (i != k) {
                  x.e++;
                  if (xc[0] == BASE) xc[0] = 1;
                }

                break;
              } else {
                xc[ni] += k;
                if (xc[ni] != BASE) break;
                xc[ni--] = 0;
                k = 1;
              }
            }
          }

          // Remove trailing zeros.
          for (i = xc.length; xc[--i] === 0; xc.pop());
        }

        // Overflow? Infinity.
        if (x.e > MAX_EXP) {
          x.c = x.e = null;

        // Underflow? Zero.
        } else if (x.e < MIN_EXP) {
          x.c = [x.e = 0];
        }
      }

      return x;
    }


    // PROTOTYPE/INSTANCE METHODS


    /*
     * Return a new BigNumber whose value is the absolute value of this BigNumber.
     */
    P.absoluteValue = P.abs = function () {
      var x = new BigNumber(this);
      if (x.s < 0) x.s = 1;
      return x;
    };


    /*
     * Return
     *   1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
     *   -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
     *   0 if they have the same value,
     *   or null if the value of either is NaN.
     */
    P.comparedTo = function (y, b) {
      return compare(this, new BigNumber(y, b));
    };


    /*
     * If dp is undefined or null or true or false, return the number of decimal places of the
     * value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
     *
     * Otherwise, if dp is a number, return a new BigNumber whose value is the value of this
     * BigNumber rounded to a maximum of dp decimal places using rounding mode rm, or
     * ROUNDING_MODE if rm is omitted.
     *
     * [dp] {number} Decimal places: integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */
    P.decimalPlaces = P.dp = function (dp, rm) {
      var c, n, v,
        x = this;

      if (dp != null) {
        intCheck(dp, 0, MAX);
        if (rm == null) rm = ROUNDING_MODE;
        else intCheck(rm, 0, 8);

        return round(new BigNumber(x), dp + x.e + 1, rm);
      }

      if (!(c = x.c)) return null;
      n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;

      // Subtract the number of trailing zeros of the last number.
      if (v = c[v]) for (; v % 10 == 0; v /= 10, n--);
      if (n < 0) n = 0;

      return n;
    };


    /*
     *  n / 0 = I
     *  n / N = N
     *  n / I = 0
     *  0 / n = 0
     *  0 / 0 = N
     *  0 / N = N
     *  0 / I = 0
     *  N / n = N
     *  N / 0 = N
     *  N / N = N
     *  N / I = N
     *  I / n = I
     *  I / 0 = I
     *  I / N = N
     *  I / I = N
     *
     * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
     * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
     */
    P.dividedBy = P.div = function (y, b) {
      return div(this, new BigNumber(y, b), DECIMAL_PLACES, ROUNDING_MODE);
    };


    /*
     * Return a new BigNumber whose value is the integer part of dividing the value of this
     * BigNumber by the value of BigNumber(y, b).
     */
    P.dividedToIntegerBy = P.idiv = function (y, b) {
      return div(this, new BigNumber(y, b), 0, 1);
    };


    /*
     * Return a BigNumber whose value is the value of this BigNumber exponentiated by n.
     *
     * If m is present, return the result modulo m.
     * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
     * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using ROUNDING_MODE.
     *
     * The modular power operation works efficiently when x, n, and m are integers, otherwise it
     * is equivalent to calculating x.exponentiatedBy(n).modulo(m) with a POW_PRECISION of 0.
     *
     * n {number|string|BigNumber} The exponent. An integer.
     * [m] {number|string|BigNumber} The modulus.
     *
     * '[BigNumber Error] Exponent not an integer: {n}'
     */
    P.exponentiatedBy = P.pow = function (n, m) {
      var half, isModExp, k, more, nIsBig, nIsNeg, nIsOdd, y,
        x = this;

      n = new BigNumber(n);

      // Allow NaN and ±Infinity, but not other non-integers.
      if (n.c && !n.isInteger()) {
        throw Error
          (bignumberError + 'Exponent not an integer: ' + n);
      }

      if (m != null) m = new BigNumber(m);

      // Exponent of MAX_SAFE_INTEGER is 15.
      nIsBig = n.e > 14;

      // If x is NaN, ±Infinity, ±0 or ±1, or n is ±Infinity, NaN or ±0.
      if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {

        // The sign of the result of pow when x is negative depends on the evenness of n.
        // If +n overflows to ±Infinity, the evenness of n would be not be known.
        y = new BigNumber(Math.pow(+x.valueOf(), nIsBig ? 2 - isOdd(n) : +n));
        return m ? y.mod(m) : y;
      }

      nIsNeg = n.s < 0;

      if (m) {

        // x % m returns NaN if abs(m) is zero, or m is NaN.
        if (m.c ? !m.c[0] : !m.s) return new BigNumber(NaN);

        isModExp = !nIsNeg && x.isInteger() && m.isInteger();

        if (isModExp) x = x.mod(m);

      // Overflow to ±Infinity: >=2**1e10 or >=1.0000024**1e15.
      // Underflow to ±0: <=0.79**1e10 or <=0.9999975**1e15.
      } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0
        // [1, 240000000]
        ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7
        // [80000000000000]  [99999750000000]
        : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {

        // If x is negative and n is odd, k = -0, else k = 0.
        k = x.s < 0 && isOdd(n) ? -0 : 0;

        // If x >= 1, k = ±Infinity.
        if (x.e > -1) k = 1 / k;

        // If n is negative return ±0, else return ±Infinity.
        return new BigNumber(nIsNeg ? 1 / k : k);

      } else if (POW_PRECISION) {

        // Truncating each coefficient array to a length of k after each multiplication
        // equates to truncating significant digits to POW_PRECISION + [28, 41],
        // i.e. there will be a minimum of 28 guard digits retained.
        k = mathceil(POW_PRECISION / LOG_BASE + 2);
      }

      if (nIsBig) {
        half = new BigNumber(0.5);
        nIsOdd = isOdd(n);
      } else {
        nIsOdd = n % 2;
      }

      if (nIsNeg) n.s = 1;

      y = new BigNumber(ONE);

      // Performs 54 loop iterations for n of 9007199254740991.
      for (; ;) {

        if (nIsOdd) {
          y = y.times(x);
          if (!y.c) break;

          if (k) {
            if (y.c.length > k) y.c.length = k;
          } else if (isModExp) {
            y = y.mod(m);    //y = y.minus(div(y, m, 0, MODULO_MODE).times(m));
          }
        }

        if (nIsBig) {
          n = n.times(half);
          round(n, n.e + 1, 1);
          if (!n.c[0]) break;
          nIsBig = n.e > 14;
          nIsOdd = isOdd(n);
        } else {
          n = mathfloor(n / 2);
          if (!n) break;
          nIsOdd = n % 2;
        }

        x = x.times(x);

        if (k) {
          if (x.c && x.c.length > k) x.c.length = k;
        } else if (isModExp) {
          x = x.mod(m);    //x = x.minus(div(x, m, 0, MODULO_MODE).times(m));
        }
      }

      if (isModExp) return y;
      if (nIsNeg) y = ONE.div(y);

      return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
    };


    /*
     * Return a new BigNumber whose value is the value of this BigNumber rounded to an integer
     * using rounding mode rm, or ROUNDING_MODE if rm is omitted.
     *
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {rm}'
     */
    P.integerValue = function (rm) {
      var n = new BigNumber(this);
      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);
      return round(n, n.e + 1, rm);
    };


    /*
     * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
     * otherwise return false.
     */
    P.isEqualTo = P.eq = function (y, b) {
      return compare(this, new BigNumber(y, b)) === 0;
    };


    /*
     * Return true if the value of this BigNumber is a finite number, otherwise return false.
     */
    P.isFinite = function () {
      return !!this.c;
    };


    /*
     * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
     * otherwise return false.
     */
    P.isGreaterThan = P.gt = function (y, b) {
      return compare(this, new BigNumber(y, b)) > 0;
    };


    /*
     * Return true if the value of this BigNumber is greater than or equal to the value of
     * BigNumber(y, b), otherwise return false.
     */
    P.isGreaterThanOrEqualTo = P.gte = function (y, b) {
      return (b = compare(this, new BigNumber(y, b))) === 1 || b === 0;

    };


    /*
     * Return true if the value of this BigNumber is an integer, otherwise return false.
     */
    P.isInteger = function () {
      return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
    };


    /*
     * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
     * otherwise return false.
     */
    P.isLessThan = P.lt = function (y, b) {
      return compare(this, new BigNumber(y, b)) < 0;
    };


    /*
     * Return true if the value of this BigNumber is less than or equal to the value of
     * BigNumber(y, b), otherwise return false.
     */
    P.isLessThanOrEqualTo = P.lte = function (y, b) {
      return (b = compare(this, new BigNumber(y, b))) === -1 || b === 0;
    };


    /*
     * Return true if the value of this BigNumber is NaN, otherwise return false.
     */
    P.isNaN = function () {
      return !this.s;
    };


    /*
     * Return true if the value of this BigNumber is negative, otherwise return false.
     */
    P.isNegative = function () {
      return this.s < 0;
    };


    /*
     * Return true if the value of this BigNumber is positive, otherwise return false.
     */
    P.isPositive = function () {
      return this.s > 0;
    };


    /*
     * Return true if the value of this BigNumber is 0 or -0, otherwise return false.
     */
    P.isZero = function () {
      return !!this.c && this.c[0] == 0;
    };


    /*
     *  n - 0 = n
     *  n - N = N
     *  n - I = -I
     *  0 - n = -n
     *  0 - 0 = 0
     *  0 - N = N
     *  0 - I = -I
     *  N - n = N
     *  N - 0 = N
     *  N - N = N
     *  N - I = N
     *  I - n = I
     *  I - 0 = I
     *  I - N = N
     *  I - I = N
     *
     * Return a new BigNumber whose value is the value of this BigNumber minus the value of
     * BigNumber(y, b).
     */
    P.minus = function (y, b) {
      var i, j, t, xLTy,
        x = this,
        a = x.s;

      y = new BigNumber(y, b);
      b = y.s;

      // Either NaN?
      if (!a || !b) return new BigNumber(NaN);

      // Signs differ?
      if (a != b) {
        y.s = -b;
        return x.plus(y);
      }

      var xe = x.e / LOG_BASE,
        ye = y.e / LOG_BASE,
        xc = x.c,
        yc = y.c;

      if (!xe || !ye) {

        // Either Infinity?
        if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber(yc ? x : NaN);

        // Either zero?
        if (!xc[0] || !yc[0]) {

          // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
          return yc[0] ? (y.s = -b, y) : new BigNumber(xc[0] ? x :

           // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
           ROUNDING_MODE == 3 ? -0 : 0);
        }
      }

      xe = bitFloor(xe);
      ye = bitFloor(ye);
      xc = xc.slice();

      // Determine which is the bigger number.
      if (a = xe - ye) {

        if (xLTy = a < 0) {
          a = -a;
          t = xc;
        } else {
          ye = xe;
          t = yc;
        }

        t.reverse();

        // Prepend zeros to equalise exponents.
        for (b = a; b--; t.push(0));
        t.reverse();
      } else {

        // Exponents equal. Check digit by digit.
        j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;

        for (a = b = 0; b < j; b++) {

          if (xc[b] != yc[b]) {
            xLTy = xc[b] < yc[b];
            break;
          }
        }
      }

      // x < y? Point xc to the array of the bigger number.
      if (xLTy) t = xc, xc = yc, yc = t, y.s = -y.s;

      b = (j = yc.length) - (i = xc.length);

      // Append zeros to xc if shorter.
      // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
      if (b > 0) for (; b--; xc[i++] = 0);
      b = BASE - 1;

      // Subtract yc from xc.
      for (; j > a;) {

        if (xc[--j] < yc[j]) {
          for (i = j; i && !xc[--i]; xc[i] = b);
          --xc[i];
          xc[j] += BASE;
        }

        xc[j] -= yc[j];
      }

      // Remove leading zeros and adjust exponent accordingly.
      for (; xc[0] == 0; xc.splice(0, 1), --ye);

      // Zero?
      if (!xc[0]) {

        // Following IEEE 754 (2008) 6.3,
        // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
        y.s = ROUNDING_MODE == 3 ? -1 : 1;
        y.c = [y.e = 0];
        return y;
      }

      // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
      // for finite x and y.
      return normalise(y, xc, ye);
    };


    /*
     *   n % 0 =  N
     *   n % N =  N
     *   n % I =  n
     *   0 % n =  0
     *  -0 % n = -0
     *   0 % 0 =  N
     *   0 % N =  N
     *   0 % I =  0
     *   N % n =  N
     *   N % 0 =  N
     *   N % N =  N
     *   N % I =  N
     *   I % n =  N
     *   I % 0 =  N
     *   I % N =  N
     *   I % I =  N
     *
     * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
     * BigNumber(y, b). The result depends on the value of MODULO_MODE.
     */
    P.modulo = P.mod = function (y, b) {
      var q, s,
        x = this;

      y = new BigNumber(y, b);

      // Return NaN if x is Infinity or NaN, or y is NaN or zero.
      if (!x.c || !y.s || y.c && !y.c[0]) {
        return new BigNumber(NaN);

      // Return x if y is Infinity or x is zero.
      } else if (!y.c || x.c && !x.c[0]) {
        return new BigNumber(x);
      }

      if (MODULO_MODE == 9) {

        // Euclidian division: q = sign(y) * floor(x / abs(y))
        // r = x - qy    where  0 <= r < abs(y)
        s = y.s;
        y.s = 1;
        q = div(x, y, 0, 3);
        y.s = s;
        q.s *= s;
      } else {
        q = div(x, y, 0, MODULO_MODE);
      }

      y = x.minus(q.times(y));

      // To match JavaScript %, ensure sign of zero is sign of dividend.
      if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;

      return y;
    };


    /*
     *  n * 0 = 0
     *  n * N = N
     *  n * I = I
     *  0 * n = 0
     *  0 * 0 = 0
     *  0 * N = N
     *  0 * I = N
     *  N * n = N
     *  N * 0 = N
     *  N * N = N
     *  N * I = N
     *  I * n = I
     *  I * 0 = N
     *  I * N = N
     *  I * I = I
     *
     * Return a new BigNumber whose value is the value of this BigNumber multiplied by the value
     * of BigNumber(y, b).
     */
    P.multipliedBy = P.times = function (y, b) {
      var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
        base, sqrtBase,
        x = this,
        xc = x.c,
        yc = (y = new BigNumber(y, b)).c;

      // Either NaN, ±Infinity or ±0?
      if (!xc || !yc || !xc[0] || !yc[0]) {

        // Return NaN if either is NaN, or one is 0 and the other is Infinity.
        if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
          y.c = y.e = y.s = null;
        } else {
          y.s *= x.s;

          // Return ±Infinity if either is ±Infinity.
          if (!xc || !yc) {
            y.c = y.e = null;

          // Return ±0 if either is ±0.
          } else {
            y.c = [0];
            y.e = 0;
          }
        }

        return y;
      }

      e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
      y.s *= x.s;
      xcL = xc.length;
      ycL = yc.length;

      // Ensure xc points to longer array and xcL to its length.
      if (xcL < ycL) zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i;

      // Initialise the result array with zeros.
      for (i = xcL + ycL, zc = []; i--; zc.push(0));

      base = BASE;
      sqrtBase = SQRT_BASE;

      for (i = ycL; --i >= 0;) {
        c = 0;
        ylo = yc[i] % sqrtBase;
        yhi = yc[i] / sqrtBase | 0;

        for (k = xcL, j = i + k; j > i;) {
          xlo = xc[--k] % sqrtBase;
          xhi = xc[k] / sqrtBase | 0;
          m = yhi * xlo + xhi * ylo;
          xlo = ylo * xlo + ((m % sqrtBase) * sqrtBase) + zc[j] + c;
          c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
          zc[j--] = xlo % base;
        }

        zc[j] = c;
      }

      if (c) {
        ++e;
      } else {
        zc.splice(0, 1);
      }

      return normalise(y, zc, e);
    };


    /*
     * Return a new BigNumber whose value is the value of this BigNumber negated,
     * i.e. multiplied by -1.
     */
    P.negated = function () {
      var x = new BigNumber(this);
      x.s = -x.s || null;
      return x;
    };


    /*
     *  n + 0 = n
     *  n + N = N
     *  n + I = I
     *  0 + n = n
     *  0 + 0 = 0
     *  0 + N = N
     *  0 + I = I
     *  N + n = N
     *  N + 0 = N
     *  N + N = N
     *  N + I = N
     *  I + n = I
     *  I + 0 = I
     *  I + N = N
     *  I + I = I
     *
     * Return a new BigNumber whose value is the value of this BigNumber plus the value of
     * BigNumber(y, b).
     */
    P.plus = function (y, b) {
      var t,
        x = this,
        a = x.s;

      y = new BigNumber(y, b);
      b = y.s;

      // Either NaN?
      if (!a || !b) return new BigNumber(NaN);

      // Signs differ?
       if (a != b) {
        y.s = -b;
        return x.minus(y);
      }

      var xe = x.e / LOG_BASE,
        ye = y.e / LOG_BASE,
        xc = x.c,
        yc = y.c;

      if (!xe || !ye) {

        // Return ±Infinity if either ±Infinity.
        if (!xc || !yc) return new BigNumber(a / 0);

        // Either zero?
        // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
        if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber(xc[0] ? x : a * 0);
      }

      xe = bitFloor(xe);
      ye = bitFloor(ye);
      xc = xc.slice();

      // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
      if (a = xe - ye) {
        if (a > 0) {
          ye = xe;
          t = yc;
        } else {
          a = -a;
          t = xc;
        }

        t.reverse();
        for (; a--; t.push(0));
        t.reverse();
      }

      a = xc.length;
      b = yc.length;

      // Point xc to the longer array, and b to the shorter length.
      if (a - b < 0) t = yc, yc = xc, xc = t, b = a;

      // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
      for (a = 0; b;) {
        a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
        xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
      }

      if (a) {
        xc = [a].concat(xc);
        ++ye;
      }

      // No need to check for zero, as +x + +y != 0 && -x + -y != 0
      // ye = MAX_EXP + 1 possible
      return normalise(y, xc, ye);
    };


    /*
     * If sd is undefined or null or true or false, return the number of significant digits of
     * the value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
     * If sd is true include integer-part trailing zeros in the count.
     *
     * Otherwise, if sd is a number, return a new BigNumber whose value is the value of this
     * BigNumber rounded to a maximum of sd significant digits using rounding mode rm, or
     * ROUNDING_MODE if rm is omitted.
     *
     * sd {number|boolean} number: significant digits: integer, 1 to MAX inclusive.
     *                     boolean: whether to count integer-part trailing zeros: true or false.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
     */
    P.precision = P.sd = function (sd, rm) {
      var c, n, v,
        x = this;

      if (sd != null && sd !== !!sd) {
        intCheck(sd, 1, MAX);
        if (rm == null) rm = ROUNDING_MODE;
        else intCheck(rm, 0, 8);

        return round(new BigNumber(x), sd, rm);
      }

      if (!(c = x.c)) return null;
      v = c.length - 1;
      n = v * LOG_BASE + 1;

      if (v = c[v]) {

        // Subtract the number of trailing zeros of the last element.
        for (; v % 10 == 0; v /= 10, n--);

        // Add the number of digits of the first element.
        for (v = c[0]; v >= 10; v /= 10, n++);
      }

      if (sd && x.e + 1 > n) n = x.e + 1;

      return n;
    };


    /*
     * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
     * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
     *
     * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {k}'
     */
    P.shiftedBy = function (k) {
      intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
      return this.times('1e' + k);
    };


    /*
     *  sqrt(-n) =  N
     *  sqrt(N) =  N
     *  sqrt(-I) =  N
     *  sqrt(I) =  I
     *  sqrt(0) =  0
     *  sqrt(-0) = -0
     *
     * Return a new BigNumber whose value is the square root of the value of this BigNumber,
     * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
     */
    P.squareRoot = P.sqrt = function () {
      var m, n, r, rep, t,
        x = this,
        c = x.c,
        s = x.s,
        e = x.e,
        dp = DECIMAL_PLACES + 4,
        half = new BigNumber('0.5');

      // Negative/NaN/Infinity/zero?
      if (s !== 1 || !c || !c[0]) {
        return new BigNumber(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
      }

      // Initial estimate.
      s = Math.sqrt(+x);

      // Math.sqrt underflow/overflow?
      // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
      if (s == 0 || s == 1 / 0) {
        n = coeffToString(c);
        if ((n.length + e) % 2 == 0) n += '0';
        s = Math.sqrt(n);
        e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);

        if (s == 1 / 0) {
          n = '1e' + e;
        } else {
          n = s.toExponential();
          n = n.slice(0, n.indexOf('e') + 1) + e;
        }

        r = new BigNumber(n);
      } else {
        r = new BigNumber(s + '');
      }

      // Check for zero.
      // r could be zero if MIN_EXP is changed after the this value was created.
      // This would cause a division by zero (x/t) and hence Infinity below, which would cause
      // coeffToString to throw.
      if (r.c[0]) {
        e = r.e;
        s = e + dp;
        if (s < 3) s = 0;

        // Newton-Raphson iteration.
        for (; ;) {
          t = r;
          r = half.times(t.plus(div(x, t, dp, 1)));

          if (coeffToString(t.c  ).slice(0, s) === (n =
             coeffToString(r.c)).slice(0, s)) {

            // The exponent of r may here be one less than the final result exponent,
            // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
            // are indexed correctly.
            if (r.e < e) --s;
            n = n.slice(s - 3, s + 1);

            // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
            // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
            // iteration.
            if (n == '9999' || !rep && n == '4999') {

              // On the first iteration only, check to see if rounding up gives the
              // exact result as the nines may infinitely repeat.
              if (!rep) {
                round(t, t.e + DECIMAL_PLACES + 2, 0);

                if (t.times(t).eq(x)) {
                  r = t;
                  break;
                }
              }

              dp += 4;
              s += 4;
              rep = 1;
            } else {

              // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
              // result. If not, then there are further digits and m will be truthy.
              if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

                // Truncate to the first rounding digit.
                round(r, r.e + DECIMAL_PLACES + 2, 1);
                m = !r.times(r).eq(x);
              }

              break;
            }
          }
        }
      }

      return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
    };


    /*
     * Return a string representing the value of this BigNumber in exponential notation and
     * rounded using ROUNDING_MODE to dp fixed decimal places.
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */
    P.toExponential = function (dp, rm) {
      if (dp != null) {
        intCheck(dp, 0, MAX);
        dp++;
      }
      return format(this, dp, rm, 1);
    };


    /*
     * Return a string representing the value of this BigNumber in fixed-point notation rounding
     * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
     *
     * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
     * but e.g. (-0.00001).toFixed(0) is '-0'.
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */
    P.toFixed = function (dp, rm) {
      if (dp != null) {
        intCheck(dp, 0, MAX);
        dp = dp + this.e + 1;
      }
      return format(this, dp, rm);
    };


    /*
     * Return a string representing the value of this BigNumber in fixed-point notation rounded
     * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
     * of the FORMAT object (see BigNumber.set).
     *
     * FORMAT = {
     *      decimalSeparator : '.',
     *      groupSeparator : ',',
     *      groupSize : 3,
     *      secondaryGroupSize : 0,
     *      fractionGroupSeparator : '\xA0',    // non-breaking space
     *      fractionGroupSize : 0
     * };
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */
    P.toFormat = function (dp, rm) {
      var str = this.toFixed(dp, rm);

      if (this.c) {
        var i,
          arr = str.split('.'),
          g1 = +FORMAT.groupSize,
          g2 = +FORMAT.secondaryGroupSize,
          groupSeparator = FORMAT.groupSeparator,
          intPart = arr[0],
          fractionPart = arr[1],
          isNeg = this.s < 0,
          intDigits = isNeg ? intPart.slice(1) : intPart,
          len = intDigits.length;

        if (g2) i = g1, g1 = g2, g2 = i, len -= i;

        if (g1 > 0 && len > 0) {
          i = len % g1 || g1;
          intPart = intDigits.substr(0, i);

          for (; i < len; i += g1) {
            intPart += groupSeparator + intDigits.substr(i, g1);
          }

          if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
          if (isNeg) intPart = '-' + intPart;
        }

        str = fractionPart
         ? intPart + FORMAT.decimalSeparator + ((g2 = +FORMAT.fractionGroupSize)
          ? fractionPart.replace(new RegExp('\\d{' + g2 + '}\\B', 'g'),
           '$&' + FORMAT.fractionGroupSeparator)
          : fractionPart)
         : intPart;
      }

      return str;
    };


    /*
     * Return a string array representing the value of this BigNumber as a simple fraction with
     * an integer numerator and an integer denominator. The denominator will be a positive
     * non-zero value less than or equal to the specified maximum denominator. If a maximum
     * denominator is not specified, the denominator will be the lowest value necessary to
     * represent the number exactly.
     *
     * [md] {number|string|BigNumber} Integer >= 1, or Infinity. The maximum denominator.
     *
     * '[BigNumber Error] Argument {not an integer|out of range} : {md}'
     */
    P.toFraction = function (md) {
      var arr, d, d0, d1, d2, e, exp, n, n0, n1, q, s,
        x = this,
        xc = x.c;

      if (md != null) {
        n = new BigNumber(md);

        // Throw if md is less than one or is not an integer, unless it is Infinity.
        if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
          throw Error
            (bignumberError + 'Argument ' +
              (n.isInteger() ? 'out of range: ' : 'not an integer: ') + md);
        }
      }

      if (!xc) return x.toString();

      d = new BigNumber(ONE);
      n1 = d0 = new BigNumber(ONE);
      d1 = n0 = new BigNumber(ONE);
      s = coeffToString(xc);

      // Determine initial denominator.
      // d is a power of 10 and the minimum max denominator that specifies the value exactly.
      e = d.e = s.length - x.e - 1;
      d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
      md = !md || n.comparedTo(d) > 0 ? (e > 0 ? d : n1) : n;

      exp = MAX_EXP;
      MAX_EXP = 1 / 0;
      n = new BigNumber(s);

      // n0 = d1 = 0
      n0.c[0] = 0;

      for (; ;)  {
        q = div(n, d, 0, 1);
        d2 = d0.plus(q.times(d1));
        if (d2.comparedTo(md) == 1) break;
        d0 = d1;
        d1 = d2;
        n1 = n0.plus(q.times(d2 = n1));
        n0 = d2;
        d = n.minus(q.times(d2 = d));
        n = d2;
      }

      d2 = div(md.minus(d0), d1, 0, 1);
      n0 = n0.plus(d2.times(n1));
      d0 = d0.plus(d2.times(d1));
      n0.s = n1.s = x.s;
      e *= 2;

      // Determine which fraction is closer to x, n0/d0 or n1/d1
      arr = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(
         div(n0, d0, e, ROUNDING_MODE).minus(x).abs()) < 1
          ? [n1.toString(), d1.toString()]
          : [n0.toString(), d0.toString()];

      MAX_EXP = exp;
      return arr;
    };


    /*
     * Return the value of this BigNumber converted to a number primitive.
     */
    P.toNumber = function () {
      return +this;
    };


    /*
     * Return a string representing the value of this BigNumber rounded to sd significant digits
     * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
     * necessary to represent the integer part of the value in fixed-point notation, then use
     * exponential notation.
     *
     * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
     */
    P.toPrecision = function (sd, rm) {
      if (sd != null) intCheck(sd, 1, MAX);
      return format(this, sd, rm, 2);
    };


    /*
     * Return a string representing the value of this BigNumber in base b, or base 10 if b is
     * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
     * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
     * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
     * TO_EXP_NEG, return exponential notation.
     *
     * [b] {number} Integer, 2 to ALPHABET.length inclusive.
     *
     * '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
     */
    P.toString = function (b) {
      var str,
        n = this,
        s = n.s,
        e = n.e;

      // Infinity or NaN?
      if (e === null) {

        if (s) {
          str = 'Infinity';
          if (s < 0) str = '-' + str;
        } else {
          str = 'NaN';
        }
      } else {
        str = coeffToString(n.c);

        if (b == null) {
          str = e <= TO_EXP_NEG || e >= TO_EXP_POS
           ? toExponential(str, e)
           : toFixedPoint(str, e, '0');
        } else {
          intCheck(b, 2, ALPHABET.length, 'Base');
          str = convertBase(toFixedPoint(str, e, '0'), 10, b, s, true);
        }

        if (s < 0 && n.c[0]) str = '-' + str;
      }

      return str;
    };


    /*
     * Return as toString, but do not accept a base argument, and include the minus sign for
     * negative zero.
     */
    P.valueOf = P.toJSON = function () {
      var str,
        n = this,
        e = n.e;

      if (e === null) return n.toString();

      str = coeffToString(n.c);

      str = e <= TO_EXP_NEG || e >= TO_EXP_POS
        ? toExponential(str, e)
        : toFixedPoint(str, e, '0');

      return n.s < 0 ? '-' + str : str;
    };


    P._isBigNumber = true;

    if (configObject != null) BigNumber.set(configObject);

    return BigNumber;
  }


  // PRIVATE HELPER FUNCTIONS


  function bitFloor(n) {
    var i = n | 0;
    return n > 0 || n === i ? i : i - 1;
  }


  // Return a coefficient array as a string of base 10 digits.
  function coeffToString(a) {
    var s, z,
      i = 1,
      j = a.length,
      r = a[0] + '';

    for (; i < j;) {
      s = a[i++] + '';
      z = LOG_BASE - s.length;
      for (; z--; s = '0' + s);
      r += s;
    }

    // Determine trailing zeros.
    for (j = r.length; r.charCodeAt(--j) === 48;);
    return r.slice(0, j + 1 || 1);
  }


  // Compare the value of BigNumbers x and y.
  function compare(x, y) {
    var a, b,
      xc = x.c,
      yc = y.c,
      i = x.s,
      j = y.s,
      k = x.e,
      l = y.e;

    // Either NaN?
    if (!i || !j) return null;

    a = xc && !xc[0];
    b = yc && !yc[0];

    // Either zero?
    if (a || b) return a ? b ? 0 : -j : i;

    // Signs differ?
    if (i != j) return i;

    a = i < 0;
    b = k == l;

    // Either Infinity?
    if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1;

    // Compare exponents.
    if (!b) return k > l ^ a ? 1 : -1;

    j = (k = xc.length) < (l = yc.length) ? k : l;

    // Compare digit by digit.
    for (i = 0; i < j; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;

    // Compare lengths.
    return k == l ? 0 : k > l ^ a ? 1 : -1;
  }


  /*
   * Check that n is a primitive number, an integer, and in range, otherwise throw.
   */
  function intCheck(n, min, max, name) {
    if (n < min || n > max || n !== (n < 0 ? mathceil(n) : mathfloor(n))) {
      throw Error
       (bignumberError + (name || 'Argument') + (typeof n == 'number'
         ? n < min || n > max ? ' out of range: ' : ' not an integer: '
         : ' not a primitive number: ') + n);
    }
  }


  function isArray(obj) {
    return Object.prototype.toString.call(obj) == '[object Array]';
  }


  // Assumes finite n.
  function isOdd(n) {
    var k = n.c.length - 1;
    return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
  }


  function toExponential(str, e) {
    return (str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str) +
     (e < 0 ? 'e' : 'e+') + e;
  }


  function toFixedPoint(str, e, z) {
    var len, zs;

    // Negative exponent?
    if (e < 0) {

      // Prepend zeros.
      for (zs = z + '.'; ++e; zs += z);
      str = zs + str;

    // Positive exponent
    } else {
      len = str.length;

      // Append zeros.
      if (++e > len) {
        for (zs = z, e -= len; --e; zs += z);
        str += zs;
      } else if (e < len) {
        str = str.slice(0, e) + '.' + str.slice(e);
      }
    }

    return str;
  }


  // EXPORT


  BigNumber = clone();
  BigNumber['default'] = BigNumber.BigNumber = BigNumber;

  // AMD.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return BigNumber; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

  // Node.js and other environments that support module.exports.
  } else {}
})(this);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdHJvbndlYi9kaXN0L1Ryb25XZWIubm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdG8tYXJyYXlidWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Ryb253ZWIvbm9kZV9tb2R1bGVzL2JpZ251bWJlci5qcy9iaWdudW1iZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5RUFBMkIsU0FBUyxjQUFjLDRCQUE0QixZQUFZLHFCQUFxQiwyREFBMkQsdUNBQXVDLHFDQUFxQyxvQkFBb0IsRUFBRSxpQkFBaUIsNEZBQTRGLGVBQWUsd0NBQXdDLFNBQVMsRUFBRSxtQkFBbUIsOEJBQThCLHFEQUFxRCwwQkFBMEIsNkNBQTZDLHNCQUFzQiw2REFBNkQsWUFBWSxlQUFlLFNBQVMsaUJBQWlCLGlDQUFpQyxpQkFBaUIsWUFBWSxVQUFVLHNCQUFzQixtQkFBbUIsaURBQWlELGtCQUFrQixnQkFBZ0IsVUFBVSxtQkFBTyxDQUFDLE1BQTRCLEVBQUUsZUFBZSxVQUFVLG1CQUFPLENBQUMsTUFBeUMsRUFBRSxlQUFlLFVBQVUsbUJBQU8sQ0FBQyxNQUF1QyxFQUFFLGVBQWUsVUFBVSxtQkFBTyxDQUFDLE1BQW9DLEVBQUUsZUFBZSxVQUFVLG1CQUFPLENBQUMsTUFBcUMsRUFBRSxlQUFlLFVBQVUsbUJBQU8sQ0FBQyxNQUF1QyxFQUFFLGVBQWUsVUFBVSxtQkFBTyxDQUFDLE1BQTBDLEVBQUUsZUFBZSxVQUFVLG1CQUFPLENBQUMsTUFBc0MsRUFBRSxlQUFlLFVBQVUsbUJBQU8sQ0FBQyxNQUErQixFQUFFLGVBQWUsVUFBVSxtQkFBTyxDQUFDLE1BQWMsRUFBRSxlQUFlLFVBQVUsbUJBQU8sQ0FBQyxNQUFRLEVBQUUsZUFBZSxVQUFVLG1CQUFPLENBQUMsTUFBOEMsRUFBRSxlQUFlLFVBQVUsbUJBQU8sQ0FBQyxNQUFRLEVBQUUsZUFBZSxVQUFVLG1CQUFP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QUNMOztBQUVBO0FBQ0E7QUFDQSw4QkFBOEIsS0FBSztBQUNuQztBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNLElBQXlDO0FBQy9DLElBQUksbUNBQU8sYUFBYSxrQkFBa0IsRUFBRTtBQUFBLG9HQUFDOztBQUU3QztBQUNBLEdBQUcsTUFBTSxFQVVOO0FBQ0gsQ0FBQyIsImZpbGUiOiJ2ZW5kb3J+MTRiODZiNzAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHM9ZnVuY3Rpb24oZSl7dmFyIHQ9e307ZnVuY3Rpb24gbihyKXtpZih0W3JdKXJldHVybiB0W3JdLmV4cG9ydHM7dmFyIGk9dFtyXT17aTpyLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIGVbcl0uY2FsbChpLmV4cG9ydHMsaSxpLmV4cG9ydHMsbiksaS5sPSEwLGkuZXhwb3J0c31yZXR1cm4gbi5tPWUsbi5jPXQsbi5kPWZ1bmN0aW9uKGUsdCxyKXtuLm8oZSx0KXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsdCx7ZW51bWVyYWJsZTohMCxnZXQ6cn0pfSxuLnI9ZnVuY3Rpb24oZSl7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbCYmU3ltYm9sLnRvU3RyaW5nVGFnJiZPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxTeW1ib2wudG9TdHJpbmdUYWcse3ZhbHVlOlwiTW9kdWxlXCJ9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KX0sbi50PWZ1bmN0aW9uKGUsdCl7aWYoMSZ0JiYoZT1uKGUpKSw4JnQpcmV0dXJuIGU7aWYoNCZ0JiZcIm9iamVjdFwiPT10eXBlb2YgZSYmZSYmZS5fX2VzTW9kdWxlKXJldHVybiBlO3ZhciByPU9iamVjdC5jcmVhdGUobnVsbCk7aWYobi5yKHIpLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyLFwiZGVmYXVsdFwiLHtlbnVtZXJhYmxlOiEwLHZhbHVlOmV9KSwyJnQmJlwic3RyaW5nXCIhPXR5cGVvZiBlKWZvcih2YXIgaSBpbiBlKW4uZChyLGksZnVuY3Rpb24odCl7cmV0dXJuIGVbdF19LmJpbmQobnVsbCxpKSk7cmV0dXJuIHJ9LG4ubj1mdW5jdGlvbihlKXt2YXIgdD1lJiZlLl9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gZS5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiBlfTtyZXR1cm4gbi5kKHQsXCJhXCIsdCksdH0sbi5vPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpfSxuLnA9XCJcIixuKG4ucz0yMil9KFtmdW5jdGlvbihlLHQpe2UuZXhwb3J0cz1yZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3JcIil9LGZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPXJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3JcIil9LGZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPXJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpfSxmdW5jdGlvbihlLHQpe2UuZXhwb3J0cz1yZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKX0sZnVuY3Rpb24oZSx0KXtlLmV4cG9ydHM9cmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0U3ByZWFkXCIpfSxmdW5jdGlvbihlLHQpe2UuZXhwb3J0cz1yZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eVwiKX0sZnVuY3Rpb24oZSx0KXtlLmV4cG9ydHM9cmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvdG9Db25zdW1hYmxlQXJyYXlcIil9LGZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPXJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXlcIil9LGZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPXJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZlwiKX0sZnVuY3Rpb24oZSx0KXtlLmV4cG9ydHM9cmVxdWlyZShcImJpZ251bWJlci5qc1wiKX0sZnVuY3Rpb24oZSx0KXtlLmV4cG9ydHM9cmVxdWlyZShcImV0aGVyc1wiKX0sZnVuY3Rpb24oZSx0KXtlLmV4cG9ydHM9cmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXNzZXJ0VGhpc0luaXRpYWxpemVkXCIpfSxmdW5jdGlvbihlLHQpe2UuZXhwb3J0cz1yZXF1aXJlKFwic2VtdmVyXCIpfSxmdW5jdGlvbihlLHQpe2UuZXhwb3J0cz1yZXF1aXJlKFwiZWxsaXB0aWNcIil9LGZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPXJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm5cIil9LGZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPXJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldFByb3RvdHlwZU9mXCIpfSxmdW5jdGlvbihlLHQpe2UuZXhwb3J0cz1yZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0c1wiKX0sZnVuY3Rpb24oZSx0KXtlLmV4cG9ydHM9cmVxdWlyZShcImF4aW9zXCIpfSxmdW5jdGlvbihlLHQpe2UuZXhwb3J0cz1yZXF1aXJlKFwidmFsaWRhdG9yXCIpfSxmdW5jdGlvbihlLHQpe2UuZXhwb3J0cz1yZXF1aXJlKFwiZXZlbnRlbWl0dGVyM1wiKX0sZnVuY3Rpb24oZSl7ZS5leHBvcnRzPXthOlwiMi43LjFcIn19LGZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPXJlcXVpcmUoXCJxdWVyeXN0cmluZ1wiKX0sZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO24ucih0KTt2YXIgcj17fTtuLnIociksbi5kKHIsXCJieXRlMmhleFN0clwiLGZ1bmN0aW9uKCl7cmV0dXJuIEN9KSxuLmQocixcImJ5dGVzVG9TdHJpbmdcIixmdW5jdGlvbigpe3JldHVybiBFfSksbi5kKHIsXCJoZXh0b1N0cmluZ1wiLGZ1bmN0aW9uKCl7cmV0dXJuIHF9KSxuLmQocixcImJ5dGVBcnJheTJoZXhTdHJcIixmdW5jdGlvbigpe3JldHVybiBPfSksbi5kKHIsXCJiYXNlNjREZWNvZGVGcm9tU3RyaW5nXCIsZnVuY3Rpb24oKXtyZXR1cm4gRH0pLG4uZChyLFwiYmFzZTY0RW5jb2RlVG9TdHJpbmdcIixmdW5jdGlvbigpe3JldHVybiBLfSk7dmFyIGk9e307bi5yKGkpLG4uZChpLFwiYmluMlN0cmluZ1wiLGZ1bmN0aW9uKCl7cmV0dXJuIE19KSxuLmQoaSxcImFycmF5RXF1YWxzXCIsZnVuY3Rpb24oKXtyZXR1cm4gSn0pLG4uZChpLFwic3RyaW5nVG9CeXRlc1wiLGZ1bmN0aW9uKCl7cmV0dXJuIEd9KSxuLmQoaSxcImJ5dGUyaGV4U3RyXCIsZnVuY3Rpb24oKXtyZXR1cm4gQ30pLG4uZChpLFwiYnl0ZXNUb1N0cmluZ1wiLGZ1bmN0aW9uKCl7cmV0dXJuIEV9KSxuLmQoaSxcImhleHRvU3RyaW5nXCIsZnVuY3Rpb24oKXtyZXR1cm4gcX0pLG4uZChpLFwiYnl0ZUFycmF5MmhleFN0clwiLGZ1bmN0aW9uKCl7cmV0dXJuIE99KSxuLmQoaSxcImJhc2U2NERlY29kZUZyb21TdHJpbmdcIixmdW5jdGlvbigpe3JldHVybiBEfSksbi5kKGksXCJiYXNlNjRFbmNvZGVUb1N0cmluZ1wiLGZ1bmN0aW9uKCl7cmV0dXJuIEt9KSxuLmQoaSxcImhleENoYXIyYnl0ZVwiLGZ1bmN0aW9uKCl7cmV0dXJuIFl9KSxuLmQoaSxcImlzSGV4Q2hhclwiLGZ1bmN0aW9uKCl7cmV0dXJuIFh9KSxuLmQoaSxcImhleFN0cjJieXRlQXJyYXlcIixmdW5jdGlvbigpe3JldHVybiBafSksbi5kKGksXCJzdHJUb0RhdGVcIixmdW5jdGlvbigpe3JldHVybiAkfSksbi5kKGksXCJpc051bWJlclwiLGZ1bmN0aW9uKCl7cmV0dXJuIFF9KSxuLmQoaSxcImdldFN0cmluZ1R5cGVcIixmdW5jdGlvbigpe3JldHVybiBlZX0pO3ZhciBzPXt9O24ucihzKSxuLmQocyxcImVuY29kZTU4XCIsZnVuY3Rpb24oKXtyZXR1cm4gc2V9KSxuLmQocyxcImRlY29kZTU4XCIsZnVuY3Rpb24oKXtyZXR1cm4gb2V9KTt2YXIgbz17fTtuLnIobyksbi5kKG8sXCJnZXRCYXNlNThDaGVja0FkZHJlc3NcIixmdW5jdGlvbigpe3JldHVybiBwZX0pLG4uZChvLFwiZGVjb2RlQmFzZTU4QWRkcmVzc1wiLGZ1bmN0aW9uKCl7cmV0dXJuIGdlfSksbi5kKG8sXCJzaWduVHJhbnNhY3Rpb25cIixmdW5jdGlvbigpe3JldHVybiBiZX0pLG4uZChvLFwiYXJyYXlUb0Jhc2U2NFN0cmluZ1wiLGZ1bmN0aW9uKCl7cmV0dXJuIG1lfSksbi5kKG8sXCJzaWduQnl0ZXNcIixmdW5jdGlvbigpe3JldHVybiB5ZX0pLG4uZChvLFwiZ2V0Um93Qnl0ZXNGcm9tVHJhbnNhY3Rpb25CYXNlNjRcIixmdW5jdGlvbigpe3JldHVybiBrZX0pLG4uZChvLFwiZ2VuUHJpS2V5XCIsZnVuY3Rpb24oKXtyZXR1cm4geGV9KSxuLmQobyxcImNvbXB1dGVBZGRyZXNzXCIsZnVuY3Rpb24oKXtyZXR1cm4gd2V9KSxuLmQobyxcImdldEFkZHJlc3NGcm9tUHJpS2V5XCIsZnVuY3Rpb24oKXtyZXR1cm4gSWV9KSxuLmQobyxcImRlY29kZTU4Q2hlY2tcIixmdW5jdGlvbigpe3JldHVybiBXZX0pLG4uZChvLFwiaXNBZGRyZXNzVmFsaWRcIixmdW5jdGlvbigpe3JldHVybiBBZX0pLG4uZChvLFwiZ2V0QmFzZTU4Q2hlY2tBZGRyZXNzRnJvbVByaUtleUJhc2U2NFN0cmluZ1wiLGZ1bmN0aW9uKCl7cmV0dXJuIFBlfSksbi5kKG8sXCJnZXRIZXhTdHJBZGRyZXNzRnJvbVByaUtleUJhc2U2NFN0cmluZ1wiLGZ1bmN0aW9uKCl7cmV0dXJuIF9lfSksbi5kKG8sXCJnZXRBZGRyZXNzRnJvbVByaUtleUJhc2U2NFN0cmluZ1wiLGZ1bmN0aW9uKCl7cmV0dXJuIE5lfSksbi5kKG8sXCJnZXRQdWJLZXlGcm9tUHJpS2V5XCIsZnVuY3Rpb24oKXtyZXR1cm4gU2V9KSxuLmQobyxcIkVDS2V5U2lnblwiLGZ1bmN0aW9uKCl7cmV0dXJuIFRlfSksbi5kKG8sXCJTSEEyNTZcIixmdW5jdGlvbigpe3JldHVybiBqZX0pLG4uZChvLFwicGFzc3dvcmRUb0FkZHJlc3NcIixmdW5jdGlvbigpe3JldHVybiBCZX0pLG4uZChvLFwicGtUb0FkZHJlc3NcIixmdW5jdGlvbigpe3JldHVybiBGZX0pO3ZhciBhPXt9O24ucihhKSxuLmQoYSxcImdlbmVyYXRlQWNjb3VudFwiLGZ1bmN0aW9uKCl7cmV0dXJuIENlfSk7dmFyIHU9e307bi5yKHUpLG4uZCh1LFwiZGVjb2RlUGFyYW1zXCIsZnVuY3Rpb24oKXtyZXR1cm4gcWV9KSxuLmQodSxcImVuY29kZVBhcmFtc1wiLGZ1bmN0aW9uKCl7cmV0dXJuIE9lfSk7dmFyIGM9bigwKSxkPW4ubihjKSxsPW4oMSksaD1uLm4obCksZj1uKDgpLHY9bi5uKGYpLHA9bigyKSxnPW4ubihwKSxiPW4oMyksbT1uLm4oYikseT1uKDE0KSxrPW4ubih5KSx4PW4oMTUpLHc9bi5uKHgpLEk9bigxMSksVz1uLm4oSSksQT1uKDE2KSxQPW4ubihBKSxfPW4oNSksTj1uLm4oXyksUz1uKDE3KSxUPW4ubihTKSxqPW4oNCksQj1uLm4oaik7ZnVuY3Rpb24gRigpe3ZhciBlPXRoaXM7dGhpcy5fa2V5U3RyPVwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz1cIix0aGlzLmVuY29kZT1mdW5jdGlvbih0KXtmb3IodmFyIG4scixpLHMsbyxhLHUsYz1cIlwiLGQ9MDtkPHQubGVuZ3RoOylzPShuPXQuY2hhckNvZGVBdChkKyspKT4+MixvPSgzJm4pPDw0fChyPXQuY2hhckNvZGVBdChkKyspKT4+NCxhPSgxNSZyKTw8MnwoaT10LmNoYXJDb2RlQXQoZCsrKSk+PjYsdT02MyZpLGlzTmFOKHIpP2E9dT02NDppc05hTihpKSYmKHU9NjQpLGM9YytlLl9rZXlTdHIuY2hhckF0KHMpK2UuX2tleVN0ci5jaGFyQXQobykrZS5fa2V5U3RyLmNoYXJBdChhKStlLl9rZXlTdHIuY2hhckF0KHUpO3JldHVybiBjfSx0aGlzLmVuY29kZUlnbm9yZVV0Zjg9ZnVuY3Rpb24odCl7Zm9yKHZhciBuLHIsaSxzLG8sYSx1LGM9XCJcIixkPTA7ZDx0Lmxlbmd0aDspcz0obj10W2QrK10pPj4yLG89KDMmbik8PDR8KHI9dFtkKytdKT4+NCxhPSgxNSZyKTw8MnwoaT10W2QrK10pPj42LHU9NjMmaSxpc05hTihyKT9hPXU9NjQ6aXNOYU4oaSkmJih1PTY0KSxjPWMrZS5fa2V5U3RyLmNoYXJBdChzKStlLl9rZXlTdHIuY2hhckF0KG8pK2UuX2tleVN0ci5jaGFyQXQoYSkrZS5fa2V5U3RyLmNoYXJBdCh1KTtyZXR1cm4gY30sdGhpcy5kZWNvZGU9ZnVuY3Rpb24odCl7dmFyIG4scixpLHMsbyxhLHU9XCJcIixjPTA7Zm9yKHQ9dC5yZXBsYWNlKC9bXkEtWmEtejAtOVxcK1xcL1xcPV0vZyxcIlwiKTtjPHQubGVuZ3RoOyluPWUuX2tleVN0ci5pbmRleE9mKHQuY2hhckF0KGMrKykpPDwyfChzPWUuX2tleVN0ci5pbmRleE9mKHQuY2hhckF0KGMrKykpKT4+NCxyPSgxNSZzKTw8NHwobz1lLl9rZXlTdHIuaW5kZXhPZih0LmNoYXJBdChjKyspKSk+PjIsaT0oMyZvKTw8NnwoYT1lLl9rZXlTdHIuaW5kZXhPZih0LmNoYXJBdChjKyspKSksdSs9U3RyaW5nLmZyb21DaGFyQ29kZShuKSw2NCE9byYmKHUrPVN0cmluZy5mcm9tQ2hhckNvZGUocikpLDY0IT1hJiYodSs9U3RyaW5nLmZyb21DaGFyQ29kZShpKSk7cmV0dXJuIGUuX3V0ZjhfZGVjb2RlKHUpfSx0aGlzLmRlY29kZVRvQnl0ZUFycmF5PWZ1bmN0aW9uKHQpe3ZhciBuLHIsaSxzLG8sYSx1PVwiXCIsYz0wO2Zvcih0PXQucmVwbGFjZSgvW15BLVphLXowLTlcXCtcXC9cXD1dL2csXCJcIik7Yzx0Lmxlbmd0aDspbj1lLl9rZXlTdHIuaW5kZXhPZih0LmNoYXJBdChjKyspKTw8Mnwocz1lLl9rZXlTdHIuaW5kZXhPZih0LmNoYXJBdChjKyspKSk+PjQscj0oMTUmcyk8PDR8KG89ZS5fa2V5U3RyLmluZGV4T2YodC5jaGFyQXQoYysrKSkpPj4yLGk9KDMmbyk8PDZ8KGE9ZS5fa2V5U3RyLmluZGV4T2YodC5jaGFyQXQoYysrKSkpLHUrPVN0cmluZy5mcm9tQ2hhckNvZGUobiksNjQhPW8mJih1Kz1TdHJpbmcuZnJvbUNoYXJDb2RlKHIpKSw2NCE9YSYmKHUrPVN0cmluZy5mcm9tQ2hhckNvZGUoaSkpO3JldHVybiBlLl9vdXQyQnl0ZUFycmF5KHUpfSx0aGlzLl9vdXQyQnl0ZUFycmF5PWZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1uZXcgQXJyYXkoZS5sZW5ndGgpLG49MCxyPTA7bjxlLmxlbmd0aDspcj1lLmNoYXJDb2RlQXQobiksdFtuXT1yLG4rKztyZXR1cm4gdH0sdGhpcy5fdXRmOF9lbmNvZGU9ZnVuY3Rpb24oZSl7ZT1lLnJlcGxhY2UoL1xcclxcbi9nLFwiXFxuXCIpO2Zvcih2YXIgdD1cIlwiLG49MDtuPGUubGVuZ3RoO24rKyl7dmFyIHI9ZS5jaGFyQ29kZUF0KG4pO3I8MTI4P3QrPVN0cmluZy5mcm9tQ2hhckNvZGUocik6cj4xMjcmJnI8MjA0OD8odCs9U3RyaW5nLmZyb21DaGFyQ29kZShyPj42fDE5MiksdCs9U3RyaW5nLmZyb21DaGFyQ29kZSg2MyZyfDEyOCkpOih0Kz1TdHJpbmcuZnJvbUNoYXJDb2RlKHI+PjEyfDIyNCksdCs9U3RyaW5nLmZyb21DaGFyQ29kZShyPj42JjYzfDEyOCksdCs9U3RyaW5nLmZyb21DaGFyQ29kZSg2MyZyfDEyOCkpfXJldHVybiB0fSx0aGlzLl91dGY4X2RlY29kZT1mdW5jdGlvbihlKXtmb3IodmFyIHQ9XCJcIixuPTAscj0wLGk9MCxzPTA7bjxlLmxlbmd0aDspKHI9ZS5jaGFyQ29kZUF0KG4pKTwxMjg/KHQrPVN0cmluZy5mcm9tQ2hhckNvZGUociksbisrKTpyPjE5MSYmcjwyMjQ/KGk9ZS5jaGFyQ29kZUF0KG4rMSksdCs9U3RyaW5nLmZyb21DaGFyQ29kZSgoMzEmcik8PDZ8NjMmaSksbis9Mik6KGk9ZS5jaGFyQ29kZUF0KG4rMSkscz1lLmNoYXJDb2RlQXQobisyKSx0Kz1TdHJpbmcuZnJvbUNoYXJDb2RlKCgxNSZyKTw8MTJ8KDYzJmkpPDw2fDYzJnMpLG4rPTMpO3JldHVybiB0fX1mdW5jdGlvbiBDKGUpe2lmKFwibnVtYmVyXCIhPXR5cGVvZiBlKXRocm93IG5ldyBFcnJvcihcIklucHV0IG11c3QgYmUgYSBudW1iZXJcIik7aWYoZTwwfHxlPjI1NSl0aHJvdyBuZXcgRXJyb3IoXCJJbnB1dCBtdXN0IGJlIGEgYnl0ZVwiKTt2YXIgdD1cIlwiO3JldHVybiB0Kz1cIjAxMjM0NTY3ODlBQkNERUZcIi5jaGFyQXQoZT4+NCksdCs9XCIwMTIzNDU2Nzg5QUJDREVGXCIuY2hhckF0KDE1JmUpfWZ1bmN0aW9uIEUoZSl7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGUpcmV0dXJuIGU7Zm9yKHZhciB0PVwiXCIsbj0wO248ZS5sZW5ndGg7bisrKXt2YXIgcj1lW25dLnRvU3RyaW5nKDIpLGk9ci5tYXRjaCgvXjErPyg/PTApLyk7aWYoaSYmOD09PXIubGVuZ3RoKXtmb3IodmFyIHM9aVswXS5sZW5ndGgsbz1lW25dLnRvU3RyaW5nKDIpLnNsaWNlKDctcyksYT0xO2E8czthKyspbys9ZVthK25dLnRvU3RyaW5nKDIpLnNsaWNlKDIpO3QrPVN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQobywyKSksbis9cy0xfWVsc2UgdCs9U3RyaW5nLmZyb21DaGFyQ29kZShlW25dKX1yZXR1cm4gdH1mdW5jdGlvbiBxKGUpe2Zvcih2YXIgdD1lLnJlcGxhY2UoL14weC8sXCJcIikuc3BsaXQoXCJcIiksbj1cIlwiLHI9MDtyPHQubGVuZ3RoLzI7cisrKXt2YXIgaT1cIjB4XCIuY29uY2F0KHRbMipyXSkuY29uY2F0KHRbMipyKzFdKTtuKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGkpfXJldHVybiBufWZ1bmN0aW9uIE8oZSl7Zm9yKHZhciB0PVwiXCIsbj0wO248ZS5sZW5ndGg7bisrKXQrPUMoZVtuXSk7cmV0dXJuIHR9ZnVuY3Rpb24gRChlKXtyZXR1cm4obmV3IEYpLmRlY29kZVRvQnl0ZUFycmF5KGUpfWZ1bmN0aW9uIEsoZSl7cmV0dXJuKG5ldyBGKS5lbmNvZGVJZ25vcmVVdGY4KGUpfXZhciBIPW4oNiksUj1uLm4oSCksVj0zNCxVPVwiNDFcIixMPTY1LHo9L14oNDEpLztmdW5jdGlvbiBNKGUpe3JldHVybiBFKGUpfWZ1bmN0aW9uIEooZSx0LG4pe2lmKGUubGVuZ3RoIT10Lmxlbmd0aClyZXR1cm4hMTt2YXIgcjtmb3Iocj0wO3I8ZS5sZW5ndGg7cisrKWlmKG4pe2lmKGVbcl0hPXRbcl0pcmV0dXJuITF9ZWxzZSBpZihKU09OLnN0cmluZ2lmeShlW3JdKSE9SlNPTi5zdHJpbmdpZnkodFtyXSkpcmV0dXJuITE7cmV0dXJuITB9ZnVuY3Rpb24gRyhlKXtpZihcInN0cmluZ1wiIT10eXBlb2YgZSl0aHJvdyBuZXcgRXJyb3IoXCJUaGUgcGFzc2VkIHN0cmluZyBpcyBub3QgYSBzdHJpbmdcIik7dmFyIHQsbixyPW5ldyBBcnJheTt0PWUubGVuZ3RoO2Zvcih2YXIgaT0wO2k8dDtpKyspKG49ZS5jaGFyQ29kZUF0KGkpKT49NjU1MzYmJm48PTExMTQxMTE/KHIucHVzaChuPj4xOCY3fDI0MCksci5wdXNoKG4+PjEyJjYzfDEyOCksci5wdXNoKG4+PjYmNjN8MTI4KSxyLnB1c2goNjMmbnwxMjgpKTpuPj0yMDQ4JiZuPD02NTUzNT8oci5wdXNoKG4+PjEyJjE1fDIyNCksci5wdXNoKG4+PjYmNjN8MTI4KSxyLnB1c2goNjMmbnwxMjgpKTpuPj0xMjgmJm48PTIwNDc/KHIucHVzaChuPj42JjMxfDE5Miksci5wdXNoKDYzJm58MTI4KSk6ci5wdXNoKDI1NSZuKTtyZXR1cm4gcn1mdW5jdGlvbiBZKGUpe3ZhciB0O2lmKGU+PVwiQVwiJiZlPD1cIkZcIj90PWUuY2hhckNvZGVBdCgwKS1cIkFcIi5jaGFyQ29kZUF0KDApKzEwOmU+PVwiYVwiJiZlPD1cImZcIj90PWUuY2hhckNvZGVBdCgwKS1cImFcIi5jaGFyQ29kZUF0KDApKzEwOmU+PVwiMFwiJiZlPD1cIjlcIiYmKHQ9ZS5jaGFyQ29kZUF0KDApLVwiMFwiLmNoYXJDb2RlQXQoMCkpLFwibnVtYmVyXCI9PXR5cGVvZiB0KXJldHVybiB0O3Rocm93IG5ldyBFcnJvcihcIlRoZSBwYXNzZWQgaGV4IGNoYXIgaXMgbm90IGEgdmFsaWQgaGV4IGNoYXJcIil9ZnVuY3Rpb24gWChlKXtyZXR1cm4gZT49XCJBXCImJmU8PVwiRlwifHxlPj1cImFcIiYmZTw9XCJmXCJ8fGU+PVwiMFwiJiZlPD1cIjlcIj8xOjB9ZnVuY3Rpb24gWihlKXtpZihcInN0cmluZ1wiIT10eXBlb2YgZSl0aHJvdyBuZXcgRXJyb3IoXCJUaGUgcGFzc2VkIHN0cmluZyBpcyBub3QgYSBzdHJpbmdcIik7Zm9yKHZhciB0PUFycmF5KCksbj0wLHI9MCxpPTAscz0wO3M8ZS5sZW5ndGg7cysrKXt2YXIgbz1lLmNoYXJBdChzKTtpZighWChvKSl0aHJvdyBuZXcgRXJyb3IoXCJUaGUgcGFzc2VkIGhleCBjaGFyIGlzIG5vdCBhIHZhbGlkIGhleCBzdHJpbmdcIik7bjw8PTQsbis9WShvKSwwPT0rK3IlMiYmKHRbaSsrXT1uLG49MCl9cmV0dXJuIHR9ZnVuY3Rpb24gJChlKXtpZighL15cXGR7NH0tXFxkezJ9LVxcZHsyfSggXFxkezJ9LVxcZHsyfS1cXGR7Mn18KS8udGVzdChlKSl0aHJvdyBuZXcgRXJyb3IoXCJUaGUgcGFzc2VkIGRhdGUgc3RyaW5nIGlzIG5vdCB2YWxpZFwiKTt2YXIgdD1lLnNwbGl0KFwiIFwiKSxuPXRbMF0uc3BsaXQoXCItXCIpLHI9cGFyc2VJbnQoblswXSwxMCksaT1wYXJzZUludChuWzFdLDEwKS0xLHM9cGFyc2VJbnQoblsyXSwxMCk7aWYodC5sZW5ndGg+MSl7dmFyIG89dFsxXS5zcGxpdChcIi1cIiksYT1wYXJzZUludChvWzBdLDEwKSx1PXBhcnNlSW50KG9bMV0sMTApLGM9cGFyc2VJbnQob1syXSwxMCk7cmV0dXJuIG5ldyBEYXRlKHIsaSxzLGEsdSxjKX1yZXR1cm4gbmV3IERhdGUocixpLHMpfWZ1bmN0aW9uIFEoZSl7cmV0dXJuIGU+PVwiMFwiJiZlPD1cIjlcIj8xOjB9ZnVuY3Rpb24gZWUoZSl7aWYobnVsbD09ZSlyZXR1cm4tMTtpZihcInN0cmluZ1wiIT10eXBlb2YgZSlyZXR1cm4tMTtpZigwPT1lLmxlbmd0aHx8XCJcIj09ZSlyZXR1cm4tMTt2YXIgdD0wO2lmKDQwPT1lLmxlbmd0aClmb3IoO3Q8NDA7dCsrKXtpZighWChlLmNoYXJBdCh0KSkpYnJlYWt9aWYoNDA9PXQpcmV0dXJuIDE7Zm9yKHQ9MDt0PGUubGVuZ3RoO3QrKyl7aWYoIVEoZS5jaGFyQXQodCkpKWJyZWFrfWlmKHQ9PWUubGVuZ3RoKXJldHVybiAyO2Zvcih0PTA7dDxlLmxlbmd0aDt0Kyspe2lmKGUuY2hhckF0KHQpPlwiIFwiKXJldHVybiAzfXJldHVybi0xfWZvcih2YXIgdGU9XCIxMjM0NTY3ODlBQkNERUZHSEpLTE1OUFFSU1RVVldYWVphYmNkZWZnaGlqa21ub3BxcnN0dXZ3eHl6XCIsbmU9e30scmU9MDtyZTx0ZS5sZW5ndGg7cmUrKyluZVt0ZS5jaGFyQXQocmUpXT1yZTt2YXIgaWU9NTg7ZnVuY3Rpb24gc2UoZSl7aWYoMD09PWUubGVuZ3RoKXJldHVyblwiXCI7dmFyIHQsbixyPVswXTtmb3IodD0wO3Q8ZS5sZW5ndGg7dCsrKXtmb3Iobj0wO248ci5sZW5ndGg7bisrKXJbbl08PD04O3JbMF0rPWVbdF07dmFyIGk9MDtmb3Iobj0wO248ci5sZW5ndGg7KytuKXJbbl0rPWksaT1yW25dL2llfDAscltuXSU9aWU7Zm9yKDtpOylyLnB1c2goaSVpZSksaT1pL2llfDB9Zm9yKHQ9MDswPT09ZVt0XSYmdDxlLmxlbmd0aC0xO3QrKylyLnB1c2goMCk7cmV0dXJuIHIucmV2ZXJzZSgpLm1hcChmdW5jdGlvbihlKXtyZXR1cm4gdGVbZV19KS5qb2luKFwiXCIpfWZ1bmN0aW9uIG9lKGUpe2lmKDA9PT1lLmxlbmd0aClyZXR1cm5bXTt2YXIgdCxuLHI9WzBdO2Zvcih0PTA7dDxlLmxlbmd0aDt0Kyspe3ZhciBpPWVbdF07aWYoIShpIGluIG5lKSl0aHJvdyBuZXcgRXJyb3IoXCJOb24tYmFzZTU4IGNoYXJhY3RlclwiKTtmb3Iobj0wO248ci5sZW5ndGg7bisrKXJbbl0qPWllO3JbMF0rPW5lW2ldO3ZhciBzPTA7Zm9yKG49MDtuPHIubGVuZ3RoOysrbilyW25dKz1zLHM9cltuXT4+OCxyW25dJj0yNTU7Zm9yKDtzOylyLnB1c2goMjU1JnMpLHM+Pj04fWZvcih0PTA7XCIxXCI9PT1lW3RdJiZ0PGUubGVuZ3RoLTE7dCsrKXIucHVzaCgwKTtyZXR1cm4gci5yZXZlcnNlKCl9dmFyIGFlPW4oMTMpLHVlPW4oMTApLGNlPXVlLnV0aWxzLmtlY2NhazI1NixkZT11ZS51dGlscy5zaGEyNTYsbGU9dWUudXRpbHMudG9VdGY4Qnl0ZXMsaGU9dWUudXRpbHMucmVjb3ZlckFkZHJlc3MsZmU9dWUudXRpbHMuU2lnbmluZ0tleSx2ZT11ZS51dGlscy5BYmlDb2RlcjtmdW5jdGlvbiBwZShlKXt2YXIgdD1qZShlKSxuPWplKHQpLnNsaWNlKDAsNCk7cmV0dXJuIHNlKG49ZS5jb25jYXQobikpfWZ1bmN0aW9uIGdlKGUpe2lmKFwic3RyaW5nXCIhPXR5cGVvZiBlKXJldHVybiExO2lmKGUubGVuZ3RoPD00KXJldHVybiExO3ZhciB0PW9lKGUpO2lmKGUubGVuZ3RoPD00KXJldHVybiExO3ZhciBuPXQubGVuZ3RoLTQscj10LnNsaWNlKG4pLGk9amUodD10LnNsaWNlKDAsbikpLHM9amUoaSkuc2xpY2UoMCw0KTtpZihyWzBdPT1zWzBdJiZyWzFdPT1zWzFdJiZyWzJdPT1zWzJdJiZyWzNdPT1zWzNdKXJldHVybiB0O3Rocm93IG5ldyBFcnJvcihcIkludmFsaWQgYWRkcmVzcyBwcm92aWRlZFwiKX1mdW5jdGlvbiBiZShlLHQpe1wic3RyaW5nXCI9PXR5cGVvZiBlJiYoZT1aKGUpKTt2YXIgbj1UZShaKHQudHhJRCksZSk7cmV0dXJuIEFycmF5LmlzQXJyYXkodC5zaWduYXR1cmUpP3Quc2lnbmF0dXJlLmluY2x1ZGVzKG4pfHx0LnNpZ25hdHVyZS5wdXNoKG4pOnQuc2lnbmF0dXJlPVtuXSx0fWZ1bmN0aW9uIG1lKGUpe3JldHVybiBidG9hKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLFIoKShlKSkpfWZ1bmN0aW9uIHllKGUsdCl7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIGUmJihlPVooZSkpLFRlKGplKHQpLGUpfWZ1bmN0aW9uIGtlKGUpe3ZhciB0PUQoZSk7cmV0dXJuIHByb3RvLnByb3RvY29sLlRyYW5zYWN0aW9uLmRlc2VyaWFsaXplQmluYXJ5KHQpLmdldFJhd0RhdGEoKS5zZXJpYWxpemVCaW5hcnkoKX1mdW5jdGlvbiB4ZSgpe2Zvcih2YXIgZT1uZXcgYWUuZWMoXCJzZWNwMjU2azFcIikuZ2VuS2V5UGFpcigpLmdldFByaXZhdGUoKS50b1N0cmluZyhcImhleFwiKTtlLmxlbmd0aDw2NDspZT1cIjBcIi5jb25jYXQoZSk7cmV0dXJuIFooZSl9ZnVuY3Rpb24gd2UoZSl7NjU9PT1lLmxlbmd0aCYmKGU9ZS5zbGljZSgxKSk7dmFyIHQ9Y2UoZSkudG9TdHJpbmcoKS5zdWJzdHJpbmcoMik7cmV0dXJuIFooVSt0LnN1YnN0cmluZygyNCkpfWZ1bmN0aW9uIEllKGUpe3JldHVybiB3ZShTZShlKSl9ZnVuY3Rpb24gV2UoZSl7dmFyIHQ9b2UoZSk7aWYodC5sZW5ndGg8PTQpcmV0dXJuITE7dmFyIG49dC5zbGljZSgwLHQubGVuZ3RoLTQpLHI9amUobiksaT1qZShyKTtyZXR1cm4gaVswXT09PXRbbi5sZW5ndGhdJiZpWzFdPT09dFtuLmxlbmd0aCsxXSYmaVsyXT09PXRbbi5sZW5ndGgrMl0mJmlbM109PT10W24ubGVuZ3RoKzNdJiZufWZ1bmN0aW9uIEFlKGUpe2lmKFwic3RyaW5nXCIhPXR5cGVvZiBlKXJldHVybiExO2lmKGUubGVuZ3RoIT09VilyZXR1cm4hMTt2YXIgdD1vZShlKTtpZigyNSE9PXQubGVuZ3RoKXJldHVybiExO2lmKHRbMF0hPT1MKXJldHVybiExO3ZhciBuPXQuc2xpY2UoMjEpLHI9amUodD10LnNsaWNlKDAsMjEpKSxpPWplKHIpLnNsaWNlKDAsNCk7cmV0dXJuIG5bMF09PWlbMF0mJm5bMV09PWlbMV0mJm5bMl09PWlbMl0mJm5bM109PWlbM119ZnVuY3Rpb24gUGUoZSl7cmV0dXJuIHBlKHdlKFNlKEQoZSkpKSl9ZnVuY3Rpb24gX2UoZSl7cmV0dXJuIE8od2UoU2UoRChlKSkpKX1mdW5jdGlvbiBOZShlKXtyZXR1cm4gSyh3ZShTZShEKGUpKSkpfWZ1bmN0aW9uIFNlKGUpe2Zvcih2YXIgdD1uZXcgYWUuZWMoXCJzZWNwMjU2azFcIikua2V5RnJvbVByaXZhdGUoZSxcImJ5dGVzXCIpLmdldFB1YmxpYygpLG49dC54LHI9dC55LGk9bi50b1N0cmluZyhcImhleFwiKTtpLmxlbmd0aDw2NDspaT1cIjBcIi5jb25jYXQoaSk7Zm9yKHZhciBzPXIudG9TdHJpbmcoXCJoZXhcIik7cy5sZW5ndGg8NjQ7KXM9XCIwXCIuY29uY2F0KHMpO3JldHVybiBaKFwiMDRcIi5jb25jYXQoaSkuY29uY2F0KHMpKX1mdW5jdGlvbiBUZShlLHQpe2Zvcih2YXIgbj1uZXcgYWUuZWMoXCJzZWNwMjU2azFcIikua2V5RnJvbVByaXZhdGUodCxcImJ5dGVzXCIpLnNpZ24oZSkscj1uLnIsaT1uLnMscz1uLnJlY292ZXJ5UGFyYW0sbz1yLnRvU3RyaW5nKFwiaGV4XCIpO28ubGVuZ3RoPDY0OylvPVwiMFwiLmNvbmNhdChvKTtmb3IodmFyIGE9aS50b1N0cmluZyhcImhleFwiKTthLmxlbmd0aDw2NDspYT1cIjBcIi5jb25jYXQoYSk7cmV0dXJuIG8rYStDKHMpfWZ1bmN0aW9uIGplKGUpe3ZhciB0PU8oZSk7cmV0dXJuIFooZGUoXCIweFwiK3QpLnJlcGxhY2UoL14weC8sXCJcIikpfWZ1bmN0aW9uIEJlKGUpe3JldHVybiBwZShJZShEKGUpKSl9ZnVuY3Rpb24gRmUoZSl7cmV0dXJuIHBlKEllKFooZSkpKX1mdW5jdGlvbiBDZSgpe3ZhciBlPXhlKCksdD1TZShlKSxuPUllKGUpO3JldHVybntwcml2YXRlS2V5Ok8oZSkscHVibGljS2V5Ok8odCksYWRkcmVzczp7YmFzZTU4OnBlKG4pLGhleDpPKG4pfX19dmFyIEVlPW5ldyB2ZTtmdW5jdGlvbiBxZShlLHQsbixyKXtpZihuJiZcImJvb2xlYW5cIiE9dHlwZW9mIG58fChyPW4sbj10LHQ9ZSxlPVtdKSxyJiZuLnJlcGxhY2UoL14weC8sXCJcIikubGVuZ3RoJTY0PT04JiYobj1cIjB4XCIrbi5yZXBsYWNlKC9eMHgvLFwiXCIpLnN1YnN0cmluZyg4KSksbi5yZXBsYWNlKC9eMHgvLFwiXCIpLmxlbmd0aCU2NCl0aHJvdyBuZXcgRXJyb3IoXCJUaGUgZW5jb2RlZCBzdHJpbmcgaXMgbm90IHZhbGlkLiBJdHMgbGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA2NC5cIik7cmV0dXJuIHQ9dC5tYXAoZnVuY3Rpb24oZSl7cmV0dXJuL3RyY1Rva2VuLy50ZXN0KGUpJiYoZT1lLnJlcGxhY2UoL3RyY1Rva2VuLyxcInVpbnQyNTZcIikpLGV9KSxFZS5kZWNvZGUodCxuKS5yZWR1Y2UoZnVuY3Rpb24obixyLGkpe3JldHVyblwiYWRkcmVzc1wiPT10W2ldJiYocj1VK3Iuc3Vic3RyKDIpLnRvTG93ZXJDYXNlKCkpLGUubGVuZ3RoP25bZVtpXV09cjpuLnB1c2gociksbn0sZS5sZW5ndGg/e306W10pfWZ1bmN0aW9uIE9lKGUsdCl7Zm9yKHZhciBuPTA7bjxlLmxlbmd0aDtuKyspXCJhZGRyZXNzXCI9PT1lW25dJiYodFtuXT1wdC5hZGRyZXNzLnRvSGV4KHRbbl0pLnJlcGxhY2UoeixcIjB4XCIpKTtyZXR1cm4gRWUuZW5jb2RlKGUsdCl9dmFyIERlLEtlPW4oMTgpLEhlPW4ubihLZSksUmU9big5KSxWZT1uLm4oUmUpLFVlPXtpc1ZhbGlkVVJMOmZ1bmN0aW9uKGUpe3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiBlJiZIZS5hLmlzVVJMKGUudG9TdHJpbmcoKSx7cHJvdG9jb2xzOltcImh0dHBcIixcImh0dHBzXCJdLHJlcXVpcmVfdGxkOiExfSl9LGlzT2JqZWN0OmZ1bmN0aW9uKGUpe3JldHVybiBlPT09T2JqZWN0KGUpJiZcIltvYmplY3QgQXJyYXldXCIhPT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSl9LGlzQXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIEFycmF5LmlzQXJyYXkoZSl9LGlzSnNvbjpmdW5jdGlvbihlKXt0cnl7cmV0dXJuISFKU09OLnBhcnNlKGUpfWNhdGNoKGUpe3JldHVybiExfX0saXNCb29sZWFuOmZ1bmN0aW9uKGUpe3JldHVyblwiYm9vbGVhblwiPT10eXBlb2YgZX0saXNCaWdOdW1iZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJihlIGluc3RhbmNlb2YgVmUuYXx8ZS5jb25zdHJ1Y3RvciYmXCJCaWdOdW1iZXJcIj09PWUuY29uc3RydWN0b3IubmFtZSl9LGlzU3RyaW5nOmZ1bmN0aW9uKGUpe3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiBlfHxlJiZlLmNvbnN0cnVjdG9yJiZcIlN0cmluZ1wiPT09ZS5jb25zdHJ1Y3Rvci5uYW1lfSxpc0Z1bmN0aW9uOmZ1bmN0aW9uKGUpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIGV9LGlzSGV4OmZ1bmN0aW9uKGUpe3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiBlJiYhaXNOYU4ocGFyc2VJbnQoZSwxNikpJiYvXigweHwpW2EtZkEtRjAtOV0rJC8udGVzdChlKX0saXNJbnRlZ2VyOmZ1bmN0aW9uKGUpe3JldHVybiBudWxsIT09ZSYmTnVtYmVyLmlzSW50ZWdlcihOdW1iZXIoZSkpfSxoYXNQcm9wZXJ0eTpmdW5jdGlvbihlLHQpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSx0KX0saGFzUHJvcGVydGllczpmdW5jdGlvbihlKXtmb3IodmFyIHQ9dGhpcyxuPWFyZ3VtZW50cy5sZW5ndGgscj1uZXcgQXJyYXkobj4xP24tMTowKSxpPTE7aTxuO2krKylyW2ktMV09YXJndW1lbnRzW2ldO3JldHVybiByLmxlbmd0aCYmIXIubWFwKGZ1bmN0aW9uKG4pe3JldHVybiB0Lmhhc1Byb3BlcnR5KGUsbil9KS5pbmNsdWRlcyghMSl9LGluamVjdFByb21pc2U6ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PWFyZ3VtZW50cy5sZW5ndGgsbj1uZXcgQXJyYXkodD4xP3QtMTowKSxyPTE7cjx0O3IrKyluW3ItMV09YXJndW1lbnRzW3JdO3JldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbih0LHIpe2UuYXBwbHkodm9pZCAwLG4uY29uY2F0KFtmdW5jdGlvbihlLG4pe2U/cihlKTp0KG4pfV0pKX0pfSxwcm9taXNlSW5qZWN0b3I6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcztyZXR1cm4gZnVuY3Rpb24obil7Zm9yKHZhciByPWFyZ3VtZW50cy5sZW5ndGgsaT1uZXcgQXJyYXkocj4xP3ItMTowKSxzPTE7czxyO3MrKylpW3MtMV09YXJndW1lbnRzW3NdO3JldHVybiB0LmluamVjdFByb21pc2UuYXBwbHkodCxbbi5iaW5kKGUpXS5jb25jYXQoaSkpfX0sbWFwRXZlbnQ6ZnVuY3Rpb24oZSl7dmFyIHQ9e2Jsb2NrOmUuYmxvY2tfbnVtYmVyLHRpbWVzdGFtcDplLmJsb2NrX3RpbWVzdGFtcCxjb250cmFjdDplLmNvbnRyYWN0X2FkZHJlc3MsbmFtZTplLmV2ZW50X25hbWUsdHJhbnNhY3Rpb246ZS50cmFuc2FjdGlvbl9pZCxyZXN1bHQ6ZS5yZXN1bHQscmVzb3VyY2VOb2RlOmUucmVzb3VyY2VfTm9kZXx8KGUuX3VuY29uZmlybWVkP1wiZnVsbE5vZGVcIjpcInNvbGlkaXR5Tm9kZVwiKX07cmV0dXJuIGUuX3VuY29uZmlybWVkJiYodC51bmNvbmZpcm1lZD1lLl91bmNvbmZpcm1lZCksZS5fZmluZ2VycHJpbnQmJih0LmZpbmdlcnByaW50PWUuX2ZpbmdlcnByaW50KSx0fSxwYXJzZUV2ZW50OmZ1bmN0aW9uKGUsdCl7dmFyIG49dC5pbnB1dHM7aWYoIWUucmVzdWx0KXJldHVybiBlO2lmKHRoaXMuaXNPYmplY3QoZS5yZXN1bHQpKWZvcih2YXIgcj0wO3I8bi5sZW5ndGg7cisrKXt2YXIgaT1uW3JdO1wiYWRkcmVzc1wiPT1pLnR5cGUmJmkubmFtZSBpbiBlLnJlc3VsdCYmKGUucmVzdWx0W2kubmFtZV09VStlLnJlc3VsdFtpLm5hbWVdLnN1YnN0cigyKS50b0xvd2VyQ2FzZSgpKX1lbHNlIHRoaXMuaXNBcnJheShlLnJlc3VsdCkmJihlLnJlc3VsdD1lLnJlc3VsdC5yZWR1Y2UoZnVuY3Rpb24oZSx0LHIpe3ZhciBpPW5bcl0scz1pLm5hbWU7cmV0dXJuXCJhZGRyZXNzXCI9PWkudHlwZSYmKHQ9VSt0LnN1YnN0cigyKS50b0xvd2VyQ2FzZSgpKSxlW3NdPXQsZX0se30pKTtyZXR1cm4gZX0scGFkTGVmdDpmdW5jdGlvbihlLHQsbil7Zm9yKHZhciByPWUudG9TdHJpbmcoKTtyLmxlbmd0aDxuOylyPXQrcjtyZXR1cm4gcn0saXNOb3ROdWxsT3JVbmRlZmluZWQ6ZnVuY3Rpb24oZSl7cmV0dXJuIG51bGwhPWV9LHNsZWVwOmZ1bmN0aW9uKCl7dmFyIGU9aCgpKGQuYS5tYXJrKGZ1bmN0aW9uIGUoKXt2YXIgdCxuPWFyZ3VtZW50cztyZXR1cm4gZC5hLndyYXAoZnVuY3Rpb24oZSl7Zm9yKDs7KXN3aXRjaChlLnByZXY9ZS5uZXh0KXtjYXNlIDA6cmV0dXJuIHQ9bi5sZW5ndGg+MCYmdm9pZCAwIT09blswXT9uWzBdOjFlMyxlLmFicnVwdChcInJldHVyblwiLG5ldyBQcm9taXNlKGZ1bmN0aW9uKGUpe3JldHVybiBzZXRUaW1lb3V0KGUsdCl9KSk7Y2FzZSAyOmNhc2VcImVuZFwiOnJldHVybiBlLnN0b3AoKX19LGUpfSkpO3JldHVybiBmdW5jdGlvbigpe3JldHVybiBlLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19KCl9LExlPUIoKSh7fSxVZSx7Y29kZTppLGFjY291bnRzOmEsYmFzZTU4OnMsYnl0ZXM6cixjcnlwdG86byxhYmk6dX0pLHplPXtIdHRwUHJvdmlkZXI6ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQpe3ZhciBuPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTozZTQscj1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXSYmYXJndW1lbnRzWzJdLGk9YXJndW1lbnRzLmxlbmd0aD4zJiZ2b2lkIDAhPT1hcmd1bWVudHNbM10mJmFyZ3VtZW50c1szXSxzPWFyZ3VtZW50cy5sZW5ndGg+NCYmdm9pZCAwIT09YXJndW1lbnRzWzRdP2FyZ3VtZW50c1s0XTp7fSxvPWFyZ3VtZW50cy5sZW5ndGg+NSYmdm9pZCAwIT09YXJndW1lbnRzWzVdP2FyZ3VtZW50c1s1XTpcIi9cIjtpZihnKCkodGhpcyxlKSwhTGUuaXNWYWxpZFVSTCh0KSl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIFVSTCBwcm92aWRlZCB0byBIdHRwUHJvdmlkZXJcIik7aWYoaXNOYU4obil8fG48MCl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHRpbWVvdXQgZHVyYXRpb24gcHJvdmlkZWRcIik7aWYoIUxlLmlzT2JqZWN0KHMpKXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgaGVhZGVycyBvYmplY3QgcHJvdmlkZWRcIik7dD10LnJlcGxhY2UoL1xcLyskLyxcIlwiKSx0aGlzLmhvc3Q9dCx0aGlzLnRpbWVvdXQ9bix0aGlzLnVzZXI9cix0aGlzLnBhc3N3b3JkPWksdGhpcy5oZWFkZXJzPXMsdGhpcy5zdGF0dXNQYWdlPW8sdGhpcy5pbnN0YW5jZT1ULmEuY3JlYXRlKHtiYXNlVVJMOnQsdGltZW91dDpuLGhlYWRlcnM6cyxhdXRoOnImJnt1c2VyOnIscGFzc3dvcmQ6aX19KX1yZXR1cm4gbSgpKGUsW3trZXk6XCJzZXRTdGF0dXNQYWdlXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06XCIvXCI7dGhpcy5zdGF0dXNQYWdlPWV9fSx7a2V5OlwiaXNDb25uZWN0ZWRcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWgoKShkLmEubWFyayhmdW5jdGlvbiBlKCl7dmFyIHQsbj1hcmd1bWVudHM7cmV0dXJuIGQuYS53cmFwKGZ1bmN0aW9uKGUpe2Zvcig7Oylzd2l0Y2goZS5wcmV2PWUubmV4dCl7Y2FzZSAwOnJldHVybiB0PW4ubGVuZ3RoPjAmJnZvaWQgMCE9PW5bMF0/blswXTp0aGlzLnN0YXR1c1BhZ2UsZS5hYnJ1cHQoXCJyZXR1cm5cIix0aGlzLnJlcXVlc3QodCkudGhlbihmdW5jdGlvbihlKXtyZXR1cm4gTGUuaGFzUHJvcGVydGllcyhlLFwiYmxvY2tJRFwiLFwiYmxvY2tfaGVhZGVyXCIpfSkuY2F0Y2goZnVuY3Rpb24oKXtyZXR1cm4hMX0pKTtjYXNlIDI6Y2FzZVwiZW5kXCI6cmV0dXJuIGUuc3RvcCgpfX0sZSx0aGlzKX0pKTtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gZS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSgpfSx7a2V5OlwicmVxdWVzdFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTp7fSxuPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdP2FyZ3VtZW50c1syXTpcImdldFwiO3JldHVybiBuPW4udG9Mb3dlckNhc2UoKSx0aGlzLmluc3RhbmNlLnJlcXVlc3Qoe2RhdGE6XCJwb3N0XCI9PW4mJk9iamVjdC5rZXlzKHQpLmxlbmd0aD90Om51bGwscGFyYW1zOlwiZ2V0XCI9PW4mJnQsdXJsOmUsbWV0aG9kOm59KS50aGVuKGZ1bmN0aW9uKGUpe3JldHVybiBlLmRhdGF9KX19XSksZX0oKX0sTWU9bigxOSksSmU9bi5uKE1lKSxHZT1uKDIwKSxZZT1uKDEyKSxYZT1uLm4oWWUpLFplPW4oNyksJGU9bi5uKFplKSxRZT1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdO2lmKGcoKSh0aGlzLGUpLCF0fHwhdCBpbnN0YW5jZW9mIHB0KXRocm93IG5ldyBFcnJvcihcIkV4cGVjdGVkIGluc3RhbmNlIG9mIFRyb25XZWJcIik7dGhpcy50cm9uV2ViPXR9cmV0dXJuIG0oKShlLFt7a2V5OlwiaW52YWxpZFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiBlLm1zZ3x8XCJJbnZhbGlkIFwiLmNvbmNhdChlLm5hbWUpLmNvbmNhdChcImFkZHJlc3NcIj09PWUudHlwZT9cIiBhZGRyZXNzXCI6XCJcIixcIiBwcm92aWRlZFwiKX19LHtrZXk6XCJub3RQb3NpdGl2ZVwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVyblwiXCIuY29uY2F0KGUubmFtZSxcIiBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlclwiKX19LHtrZXk6XCJub3RFcXVhbFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiBlLm1zZ3x8XCJcIi5jb25jYXQoZS5uYW1lc1swXSxcIiBjYW4gbm90IGJlIGVxdWFsIHRvIFwiKS5jb25jYXQoZS5uYW1lc1sxXSl9fSx7a2V5Olwibm90VmFsaWRcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTpbXSx0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTpuZXcgRnVuY3Rpb24sbj17fSxyPSExLGk9ITAscz0hMSxvPXZvaWQgMDt0cnl7Zm9yKHZhciBhLHU9ZVtTeW1ib2wuaXRlcmF0b3JdKCk7IShpPShhPXUubmV4dCgpKS5kb25lKTtpPSEwKXt2YXIgYz1hLnZhbHVlLGQ9Yy5uYW1lLGw9Yy5uYW1lcyxoPWMudmFsdWUsZj1jLnR5cGUsdj1jLmd0LHA9Yy5sdCxnPWMuZ3RlLGI9Yy5sdGU7Yy5zZTtpZighYy5vcHRpb25hbHx8TGUuaXNOb3ROdWxsT3JVbmRlZmluZWQoaCkmJihcImJvb2xlYW5cIj09PWZ8fCExIT09aCkpe3N3aXRjaChuW2MubmFtZV09Yy52YWx1ZSxmKXtjYXNlXCJhZGRyZXNzXCI6dGhpcy50cm9uV2ViLmlzQWRkcmVzcyhoKT9uW2RdPXRoaXMudHJvbldlYi5hZGRyZXNzLnRvSGV4KGgpOnI9ITA7YnJlYWs7Y2FzZVwiaW50ZWdlclwiOighTGUuaXNJbnRlZ2VyKGgpfHxcIm51bWJlclwiPT10eXBlb2YgdiYmaDw9Yy5ndHx8XCJudW1iZXJcIj09dHlwZW9mIHAmJmg+PWMubHR8fFwibnVtYmVyXCI9PXR5cGVvZiBnJiZoPGMuZ3RlfHxcIm51bWJlclwiPT10eXBlb2YgYiYmaD5jLmx0ZSkmJihyPSEwKTticmVhaztjYXNlXCJwb3NpdGl2ZS1pbnRlZ2VyXCI6aWYoIUxlLmlzSW50ZWdlcihoKXx8aDw9MClyZXR1cm4gdm9pZCB0KHRoaXMubm90UG9zaXRpdmUoYykpO2JyZWFrO2Nhc2VcInRva2VuSWRcIjpMZS5pc1N0cmluZyhoKSYmaC5sZW5ndGh8fChyPSEwKTticmVhaztjYXNlXCJub3RFbXB0eU9iamVjdFwiOkxlLmlzT2JqZWN0KGgpJiZPYmplY3Qua2V5cyhoKS5sZW5ndGh8fChyPSEwKTticmVhaztjYXNlXCJub3RFcXVhbFwiOmlmKG5bbFswXV09PT1uW2xbMV1dKXJldHVybiB0KHRoaXMubm90RXF1YWwoYykpLCEwO2JyZWFrO2Nhc2VcInJlc291cmNlXCI6W1wiQkFORFdJRFRIXCIsXCJFTkVSR1lcIl0uaW5jbHVkZXMoaCl8fChyPSEwKTticmVhaztjYXNlXCJ1cmxcIjpMZS5pc1ZhbGlkVVJMKGgpfHwocj0hMCk7YnJlYWs7Y2FzZVwiaGV4XCI6TGUuaXNIZXgoaCl8fChyPSEwKTticmVhaztjYXNlXCJhcnJheVwiOkFycmF5LmlzQXJyYXkoaCl8fChyPSEwKTticmVhaztjYXNlXCJub3QtZW1wdHktc3RyaW5nXCI6TGUuaXNTdHJpbmcoaCkmJmgubGVuZ3RofHwocj0hMCk7YnJlYWs7Y2FzZVwiYm9vbGVhblwiOkxlLmlzQm9vbGVhbihoKXx8KHI9ITApO2JyZWFrO2Nhc2VcInN0cmluZ1wiOighTGUuaXNTdHJpbmcoaCl8fFwibnVtYmVyXCI9PXR5cGVvZiB2JiZoLmxlbmd0aDw9Yy5ndHx8XCJudW1iZXJcIj09dHlwZW9mIHAmJmgubGVuZ3RoPj1jLmx0fHxcIm51bWJlclwiPT10eXBlb2YgZyYmaC5sZW5ndGg8Yy5ndGV8fFwibnVtYmVyXCI9PXR5cGVvZiBiJiZoLmxlbmd0aD5jLmx0ZSkmJihyPSEwKX1pZihyKXJldHVybiB0KHRoaXMuaW52YWxpZChjKSksITB9fX1jYXRjaChlKXtzPSEwLG89ZX1maW5hbGx5e3RyeXtpfHxudWxsPT11LnJldHVybnx8dS5yZXR1cm4oKX1maW5hbGx5e2lmKHMpdGhyb3cgb319cmV0dXJuITF9fV0pLGV9KCk7ZnVuY3Rpb24gZXQoZSl7cmV0dXJuIERlLnRyb25XZWIuYWRkcmVzcy50b0hleChlKX1mdW5jdGlvbiB0dChlKXtyZXR1cm4gRGUudHJvbldlYi5mcm9tVXRmOChlKX1mdW5jdGlvbiBudChlLHQpe3JldHVybiBlLkVycm9yP3QoZS5FcnJvcik6ZS5yZXN1bHQmJmUucmVzdWx0Lm1lc3NhZ2U/dChEZS50cm9uV2ViLnRvVXRmOChlLnJlc3VsdC5tZXNzYWdlKSk6dChudWxsLGUpfXZhciBydD1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdO2lmKGcoKSh0aGlzLGUpLCF0fHwhdCBpbnN0YW5jZW9mIHB0KXRocm93IG5ldyBFcnJvcihcIkV4cGVjdGVkIGluc3RhbmNlIG9mIFRyb25XZWJcIik7RGU9dGhpcyx0aGlzLnRyb25XZWI9dCx0aGlzLmluamVjdFByb21pc2U9TGUucHJvbWlzZUluamVjdG9yKHRoaXMpLHRoaXMudmFsaWRhdG9yPW5ldyBRZSh0KX1yZXR1cm4gbSgpKGUsW3trZXk6XCJzZW5kVHJ4XCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdLHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOjAsbj1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXT9hcmd1bWVudHNbMl06dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleCxyPWFyZ3VtZW50cy5sZW5ndGg+Mz9hcmd1bWVudHNbM106dm9pZCAwLGk9YXJndW1lbnRzLmxlbmd0aD40JiZ2b2lkIDAhPT1hcmd1bWVudHNbNF0mJmFyZ3VtZW50c1s0XTtpZihMZS5pc0Z1bmN0aW9uKHIpJiYoaT1yLHI9e30pLExlLmlzRnVuY3Rpb24obik/KGk9bixuPXRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgpOkxlLmlzT2JqZWN0KG4pJiYocj1uLG49dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleCksIWkpcmV0dXJuIHRoaXMuaW5qZWN0UHJvbWlzZSh0aGlzLnNlbmRUcngsZSx0LG4scik7aWYodD1wYXJzZUludCh0KSwhdGhpcy52YWxpZGF0b3Iubm90VmFsaWQoW3tuYW1lOlwicmVjaXBpZW50XCIsdHlwZTpcImFkZHJlc3NcIix2YWx1ZTplfSx7bmFtZTpcIm9yaWdpblwiLHR5cGU6XCJhZGRyZXNzXCIsdmFsdWU6bn0se25hbWVzOltcInJlY2lwaWVudFwiLFwib3JpZ2luXCJdLHR5cGU6XCJub3RFcXVhbFwiLG1zZzpcIkNhbm5vdCB0cmFuc2ZlciBUUlggdG8gdGhlIHNhbWUgYWNjb3VudFwifSx7bmFtZTpcImFtb3VudFwiLHR5cGU6XCJpbnRlZ2VyXCIsZ3Q6MCx2YWx1ZTp0fV0saSkpe3ZhciBzPXt0b19hZGRyZXNzOmV0KGUpLG93bmVyX2FkZHJlc3M6ZXQobiksYW1vdW50OnR9O3ImJnIucGVybWlzc2lvbklkJiYocy5QZXJtaXNzaW9uX2lkPXIucGVybWlzc2lvbklkKSx0aGlzLnRyb25XZWIuZnVsbE5vZGUucmVxdWVzdChcIndhbGxldC9jcmVhdGV0cmFuc2FjdGlvblwiLHMsXCJwb3N0XCIpLnRoZW4oZnVuY3Rpb24oZSl7cmV0dXJuIG50KGUsaSl9KS5jYXRjaChmdW5jdGlvbihlKXtyZXR1cm4gaShlKX0pfX19LHtrZXk6XCJzZW5kVG9rZW5cIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdJiZhcmd1bWVudHNbMF0sdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06MCxuPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdJiZhcmd1bWVudHNbMl0scj1hcmd1bWVudHMubGVuZ3RoPjMmJnZvaWQgMCE9PWFyZ3VtZW50c1szXT9hcmd1bWVudHNbM106dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleCxpPWFyZ3VtZW50cy5sZW5ndGg+ND9hcmd1bWVudHNbNF06dm9pZCAwLHM9YXJndW1lbnRzLmxlbmd0aD41JiZ2b2lkIDAhPT1hcmd1bWVudHNbNV0mJmFyZ3VtZW50c1s1XTtpZihMZS5pc0Z1bmN0aW9uKGkpJiYocz1pLGk9e30pLExlLmlzRnVuY3Rpb24ocik/KHM9cixyPXRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgpOkxlLmlzT2JqZWN0KHIpJiYoaT1yLHI9dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleCksIXMpcmV0dXJuIHRoaXMuaW5qZWN0UHJvbWlzZSh0aGlzLnNlbmRUb2tlbixlLHQsbixyLGkpO2lmKHQ9cGFyc2VJbnQodCksIXRoaXMudmFsaWRhdG9yLm5vdFZhbGlkKFt7bmFtZTpcInJlY2lwaWVudFwiLHR5cGU6XCJhZGRyZXNzXCIsdmFsdWU6ZX0se25hbWU6XCJvcmlnaW5cIix0eXBlOlwiYWRkcmVzc1wiLHZhbHVlOnJ9LHtuYW1lczpbXCJyZWNpcGllbnRcIixcIm9yaWdpblwiXSx0eXBlOlwibm90RXF1YWxcIixtc2c6XCJDYW5ub3QgdHJhbnNmZXIgdG9rZW5zIHRvIHRoZSBzYW1lIGFjY291bnRcIn0se25hbWU6XCJhbW91bnRcIix0eXBlOlwiaW50ZWdlclwiLGd0OjAsdmFsdWU6dH0se25hbWU6XCJ0b2tlbiBJRFwiLHR5cGU6XCJ0b2tlbklkXCIsdmFsdWU6bn1dLHMpKXt2YXIgbz17dG9fYWRkcmVzczpldChlKSxvd25lcl9hZGRyZXNzOmV0KHIpLGFzc2V0X25hbWU6dHQobiksYW1vdW50OnBhcnNlSW50KHQpfTtpJiZpLnBlcm1pc3Npb25JZCYmKG8uUGVybWlzc2lvbl9pZD1pLnBlcm1pc3Npb25JZCksdGhpcy50cm9uV2ViLmZ1bGxOb2RlLnJlcXVlc3QoXCJ3YWxsZXQvdHJhbnNmZXJhc3NldFwiLG8sXCJwb3N0XCIpLnRoZW4oZnVuY3Rpb24oZSl7cmV0dXJuIG50KGUscyl9KS5jYXRjaChmdW5jdGlvbihlKXtyZXR1cm4gcyhlKX0pfX19LHtrZXk6XCJwdXJjaGFzZVRva2VuXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdLHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0mJmFyZ3VtZW50c1sxXSxuPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdP2FyZ3VtZW50c1syXTowLHI9YXJndW1lbnRzLmxlbmd0aD4zJiZ2b2lkIDAhPT1hcmd1bWVudHNbM10/YXJndW1lbnRzWzNdOnRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgsaT1hcmd1bWVudHMubGVuZ3RoPjQ/YXJndW1lbnRzWzRdOnZvaWQgMCxzPWFyZ3VtZW50cy5sZW5ndGg+NSYmdm9pZCAwIT09YXJndW1lbnRzWzVdJiZhcmd1bWVudHNbNV07aWYoTGUuaXNGdW5jdGlvbihpKSYmKHM9aSxpPXt9KSxMZS5pc0Z1bmN0aW9uKHIpPyhzPXIscj10aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4KTpMZS5pc09iamVjdChyKSYmKGk9cixyPXRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgpLCFzKXJldHVybiB0aGlzLmluamVjdFByb21pc2UodGhpcy5wdXJjaGFzZVRva2VuLGUsdCxuLHIsaSk7aWYoIXRoaXMudmFsaWRhdG9yLm5vdFZhbGlkKFt7bmFtZTpcImJ1eWVyXCIsdHlwZTpcImFkZHJlc3NcIix2YWx1ZTpyfSx7bmFtZTpcImlzc3VlclwiLHR5cGU6XCJhZGRyZXNzXCIsdmFsdWU6ZX0se25hbWVzOltcImJ1eWVyXCIsXCJpc3N1ZXJcIl0sdHlwZTpcIm5vdEVxdWFsXCIsbXNnOlwiQ2Fubm90IHB1cmNoYXNlIHRva2VucyBmcm9tIHNhbWUgYWNjb3VudFwifSx7bmFtZTpcImFtb3VudFwiLHR5cGU6XCJpbnRlZ2VyXCIsZ3Q6MCx2YWx1ZTpufSx7bmFtZTpcInRva2VuIElEXCIsdHlwZTpcInRva2VuSWRcIix2YWx1ZTp0fV0scykpe3ZhciBvPXt0b19hZGRyZXNzOmV0KGUpLG93bmVyX2FkZHJlc3M6ZXQociksYXNzZXRfbmFtZTp0dCh0KSxhbW91bnQ6cGFyc2VJbnQobil9O2kmJmkucGVybWlzc2lvbklkJiYoby5QZXJtaXNzaW9uX2lkPWkucGVybWlzc2lvbklkKSx0aGlzLnRyb25XZWIuZnVsbE5vZGUucmVxdWVzdChcIndhbGxldC9wYXJ0aWNpcGF0ZWFzc2V0aXNzdWVcIixvLFwicG9zdFwiKS50aGVuKGZ1bmN0aW9uKGUpe3JldHVybiBudChlLHMpfSkuY2F0Y2goZnVuY3Rpb24oZSl7cmV0dXJuIHMoZSl9KX19fSx7a2V5OlwiZnJlZXplQmFsYW5jZVwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOjAsdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06MyxuPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdP2FyZ3VtZW50c1syXTpcIkJBTkRXSURUSFwiLHI9YXJndW1lbnRzLmxlbmd0aD4zJiZ2b2lkIDAhPT1hcmd1bWVudHNbM10/YXJndW1lbnRzWzNdOnRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgsaT1hcmd1bWVudHMubGVuZ3RoPjQmJnZvaWQgMCE9PWFyZ3VtZW50c1s0XT9hcmd1bWVudHNbNF06dm9pZCAwLHM9YXJndW1lbnRzLmxlbmd0aD41P2FyZ3VtZW50c1s1XTp2b2lkIDAsbz1hcmd1bWVudHMubGVuZ3RoPjYmJnZvaWQgMCE9PWFyZ3VtZW50c1s2XSYmYXJndW1lbnRzWzZdO2lmKExlLmlzRnVuY3Rpb24ocykmJihvPXMscz17fSksTGUuaXNGdW5jdGlvbihpKT8obz1pLGk9dm9pZCAwKTpMZS5pc09iamVjdChpKSYmKHM9aSxpPXZvaWQgMCksTGUuaXNGdW5jdGlvbihyKT8obz1yLHI9dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleCk6TGUuaXNPYmplY3QocikmJihzPXIscj10aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4KSxMZS5pc0Z1bmN0aW9uKHQpJiYobz10LHQ9MyksTGUuaXNGdW5jdGlvbihuKSYmKG89bixuPVwiQkFORFdJRFRIXCIpLCFvKXJldHVybiB0aGlzLmluamVjdFByb21pc2UodGhpcy5mcmVlemVCYWxhbmNlLGUsdCxuLHIsaSxzKTtpZighdGhpcy52YWxpZGF0b3Iubm90VmFsaWQoW3tuYW1lOlwib3JpZ2luXCIsdHlwZTpcImFkZHJlc3NcIix2YWx1ZTpyfSx7bmFtZTpcInJlY2VpdmVyXCIsdHlwZTpcImFkZHJlc3NcIix2YWx1ZTppLG9wdGlvbmFsOiEwfSx7bmFtZTpcImFtb3VudFwiLHR5cGU6XCJpbnRlZ2VyXCIsZ3Q6MCx2YWx1ZTplfSx7bmFtZTpcImR1cmF0aW9uXCIsdHlwZTpcImludGVnZXJcIixndGU6Myx2YWx1ZTp0fSx7bmFtZTpcInJlc291cmNlXCIsdHlwZTpcInJlc291cmNlXCIsdmFsdWU6bixtc2c6J0ludmFsaWQgcmVzb3VyY2UgcHJvdmlkZWQ6IEV4cGVjdGVkIFwiQkFORFdJRFRIXCIgb3IgXCJFTkVSR1knfV0sbykpe3ZhciBhPXtvd25lcl9hZGRyZXNzOmV0KHIpLGZyb3plbl9iYWxhbmNlOnBhcnNlSW50KGUpLGZyb3plbl9kdXJhdGlvbjpwYXJzZUludCh0KSxyZXNvdXJjZTpufTtMZS5pc05vdE51bGxPclVuZGVmaW5lZChpKSYmZXQoaSkhPT1ldChyKSYmKGEucmVjZWl2ZXJfYWRkcmVzcz1ldChpKSkscyYmcy5wZXJtaXNzaW9uSWQmJihhLlBlcm1pc3Npb25faWQ9cy5wZXJtaXNzaW9uSWQpLHRoaXMudHJvbldlYi5mdWxsTm9kZS5yZXF1ZXN0KFwid2FsbGV0L2ZyZWV6ZWJhbGFuY2VcIixhLFwicG9zdFwiKS50aGVuKGZ1bmN0aW9uKGUpe3JldHVybiBudChlLG8pfSkuY2F0Y2goZnVuY3Rpb24oZSl7cmV0dXJuIG8oZSl9KX19fSx7a2V5OlwidW5mcmVlemVCYWxhbmNlXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06XCJCQU5EV0lEVEhcIix0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTp0aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4LG49YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0/YXJndW1lbnRzWzJdOnZvaWQgMCxyPWFyZ3VtZW50cy5sZW5ndGg+Mz9hcmd1bWVudHNbM106dm9pZCAwLGk9YXJndW1lbnRzLmxlbmd0aD40JiZ2b2lkIDAhPT1hcmd1bWVudHNbNF0mJmFyZ3VtZW50c1s0XTtpZihMZS5pc0Z1bmN0aW9uKHIpJiYoaT1yLHI9e30pLExlLmlzRnVuY3Rpb24obik/KGk9bixuPXZvaWQgMCk6TGUuaXNPYmplY3QobikmJihyPW4sbj12b2lkIDApLExlLmlzRnVuY3Rpb24odCk/KGk9dCx0PXRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgpOkxlLmlzT2JqZWN0KHQpJiYocj10LHQ9dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleCksTGUuaXNGdW5jdGlvbihlKSYmKGk9ZSxlPVwiQkFORFdJRFRIXCIpLCFpKXJldHVybiB0aGlzLmluamVjdFByb21pc2UodGhpcy51bmZyZWV6ZUJhbGFuY2UsZSx0LG4scik7aWYoIXRoaXMudmFsaWRhdG9yLm5vdFZhbGlkKFt7bmFtZTpcIm9yaWdpblwiLHR5cGU6XCJhZGRyZXNzXCIsdmFsdWU6dH0se25hbWU6XCJyZWNlaXZlclwiLHR5cGU6XCJhZGRyZXNzXCIsdmFsdWU6bixvcHRpb25hbDohMH0se25hbWU6XCJyZXNvdXJjZVwiLHR5cGU6XCJyZXNvdXJjZVwiLHZhbHVlOmUsbXNnOidJbnZhbGlkIHJlc291cmNlIHByb3ZpZGVkOiBFeHBlY3RlZCBcIkJBTkRXSURUSFwiIG9yIFwiRU5FUkdZJ31dLGkpKXt2YXIgcz17b3duZXJfYWRkcmVzczpldCh0KSxyZXNvdXJjZTplfTtMZS5pc05vdE51bGxPclVuZGVmaW5lZChuKSYmZXQobikhPT1ldCh0KSYmKHMucmVjZWl2ZXJfYWRkcmVzcz1ldChuKSksciYmci5wZXJtaXNzaW9uSWQmJihzLlBlcm1pc3Npb25faWQ9ci5wZXJtaXNzaW9uSWQpLHRoaXMudHJvbldlYi5mdWxsTm9kZS5yZXF1ZXN0KFwid2FsbGV0L3VuZnJlZXplYmFsYW5jZVwiLHMsXCJwb3N0XCIpLnRoZW4oZnVuY3Rpb24oZSl7cmV0dXJuIG50KGUsaSl9KS5jYXRjaChmdW5jdGlvbihlKXtyZXR1cm4gaShlKX0pfX19LHtrZXk6XCJ3aXRoZHJhd0Jsb2NrUmV3YXJkc1wiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgsdD1hcmd1bWVudHMubGVuZ3RoPjE/YXJndW1lbnRzWzFdOnZvaWQgMCxuPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdJiZhcmd1bWVudHNbMl07aWYoTGUuaXNGdW5jdGlvbih0KSYmKG49dCx0PXt9KSxMZS5pc0Z1bmN0aW9uKGUpPyhuPWUsZT10aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4KTpMZS5pc09iamVjdChlKSYmKHQ9ZSxlPXRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgpLCFuKXJldHVybiB0aGlzLmluamVjdFByb21pc2UodGhpcy53aXRoZHJhd0Jsb2NrUmV3YXJkcyxlLHQpO2lmKCF0aGlzLnZhbGlkYXRvci5ub3RWYWxpZChbe25hbWU6XCJvcmlnaW5cIix0eXBlOlwiYWRkcmVzc1wiLHZhbHVlOmV9XSxuKSl7dmFyIHI9e293bmVyX2FkZHJlc3M6ZXQoZSl9O3QmJnQucGVybWlzc2lvbklkJiYoci5QZXJtaXNzaW9uX2lkPXQucGVybWlzc2lvbklkKSx0aGlzLnRyb25XZWIuZnVsbE5vZGUucmVxdWVzdChcIndhbGxldC93aXRoZHJhd2JhbGFuY2VcIixyLFwicG9zdFwiKS50aGVuKGZ1bmN0aW9uKGUpe3JldHVybiBudChlLG4pfSkuY2F0Y2goZnVuY3Rpb24oZSl7cmV0dXJuIG4oZSl9KX19fSx7a2V5OlwiYXBwbHlGb3JTUlwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgsdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXSYmYXJndW1lbnRzWzFdLG49YXJndW1lbnRzLmxlbmd0aD4yP2FyZ3VtZW50c1syXTp2b2lkIDAscj1hcmd1bWVudHMubGVuZ3RoPjMmJnZvaWQgMCE9PWFyZ3VtZW50c1szXSYmYXJndW1lbnRzWzNdO2lmKGNvbnNvbGUubG9nKGV0KGUpLExlLmlzT2JqZWN0KHQpKSxMZS5pc0Z1bmN0aW9uKG4pJiYocj1uLG49e30pLExlLmlzT2JqZWN0KHQpJiZMZS5pc1ZhbGlkVVJMKGUpJiYobj10LHQ9ZSxlPXRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgpLCFyKXJldHVybiB0aGlzLmluamVjdFByb21pc2UodGhpcy5hcHBseUZvclNSLGUsdCxuKTtpZighdGhpcy52YWxpZGF0b3Iubm90VmFsaWQoW3tuYW1lOlwib3JpZ2luXCIsdHlwZTpcImFkZHJlc3NcIix2YWx1ZTplfSx7bmFtZTpcInVybFwiLHR5cGU6XCJ1cmxcIix2YWx1ZTp0LG1zZzpcIkludmFsaWQgdXJsIHByb3ZpZGVkXCJ9XSxyKSl7Y29uc29sZS5sb2coZXQoZSkpO3ZhciBpPXtvd25lcl9hZGRyZXNzOmV0KGUpLHVybDp0dCh0KX07biYmbi5wZXJtaXNzaW9uSWQmJihpLlBlcm1pc3Npb25faWQ9bi5wZXJtaXNzaW9uSWQpLHRoaXMudHJvbldlYi5mdWxsTm9kZS5yZXF1ZXN0KFwid2FsbGV0L2NyZWF0ZXdpdG5lc3NcIixpLFwicG9zdFwiKS50aGVuKGZ1bmN0aW9uKGUpe3JldHVybiBudChlLHIpfSkuY2F0Y2goZnVuY3Rpb24oZSl7cmV0dXJuIHIoZSl9KX19fSx7a2V5Olwidm90ZVwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp7fSxuPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTp0aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4LHI9YXJndW1lbnRzLmxlbmd0aD4yP2FyZ3VtZW50c1syXTp2b2lkIDAsaT1hcmd1bWVudHMubGVuZ3RoPjMmJnZvaWQgMCE9PWFyZ3VtZW50c1szXSYmYXJndW1lbnRzWzNdO2lmKExlLmlzRnVuY3Rpb24ocikmJihpPXIscj17fSksTGUuaXNGdW5jdGlvbihuKT8oaT1uLG49dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleCk6TGUuaXNPYmplY3QobikmJihyPW4sbj10aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4KSwhaSlyZXR1cm4gdGhpcy5pbmplY3RQcm9taXNlKHRoaXMudm90ZSx0LG4scik7aWYoIXRoaXMudmFsaWRhdG9yLm5vdFZhbGlkKFt7bmFtZTpcInZvdGVyXCIsdHlwZTpcImFkZHJlc3NcIix2YWx1ZTpufSx7bmFtZTpcInZvdGVzXCIsdHlwZTpcIm5vdEVtcHR5T2JqZWN0XCIsdmFsdWU6dH1dLGkpKXt2YXIgcz0hMTtpZih0PU9iamVjdC5lbnRyaWVzKHQpLm1hcChmdW5jdGlvbih0KXt2YXIgbj0kZSgpKHQsMikscj1uWzBdLGk9blsxXTtpZighcylyZXR1cm4gZS52YWxpZGF0b3Iubm90VmFsaWQoW3tuYW1lOlwiU1JcIix0eXBlOlwiYWRkcmVzc1wiLHZhbHVlOnJ9LHtuYW1lOlwidm90ZSBjb3VudFwiLHR5cGU6XCJpbnRlZ2VyXCIsZ3Q6MCx2YWx1ZTppLG1zZzpcIkludmFsaWQgdm90ZSBjb3VudCBwcm92aWRlZCBmb3IgU1I6IFwiK3J9XSk/cz0hMDp7dm90ZV9hZGRyZXNzOmV0KHIpLHZvdGVfY291bnQ6cGFyc2VJbnQoaSl9fSksIXMpe3ZhciBvPXtvd25lcl9hZGRyZXNzOmV0KG4pLHZvdGVzOnR9O3ImJnIucGVybWlzc2lvbklkJiYoby5QZXJtaXNzaW9uX2lkPXIucGVybWlzc2lvbklkKSx0aGlzLnRyb25XZWIuZnVsbE5vZGUucmVxdWVzdChcIndhbGxldC92b3Rld2l0bmVzc2FjY291bnRcIixvLFwicG9zdFwiKS50aGVuKGZ1bmN0aW9uKGUpe3JldHVybiBudChlLGkpfSkuY2F0Y2goZnVuY3Rpb24oZSl7cmV0dXJuIGkoZSl9KX19fX0se2tleTpcImNyZWF0ZVNtYXJ0Q29udHJhY3RcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp7fSx0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTp0aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4LG49YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0mJmFyZ3VtZW50c1syXTtpZihMZS5pc0Z1bmN0aW9uKHQpJiYobj10LHQ9dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleCksIW4pcmV0dXJuIHRoaXMuaW5qZWN0UHJvbWlzZSh0aGlzLmNyZWF0ZVNtYXJ0Q29udHJhY3QsZSx0KTt2YXIgcj1lLmZlZUxpbWl0fHwxZTksaT1lLnVzZXJGZWVQZXJjZW50YWdlO1wibnVtYmVyXCI9PXR5cGVvZiBpfHxpfHwoaT0xMDApO3ZhciBzPWUub3JpZ2luRW5lcmd5TGltaXR8fDFlNyxvPWUuY2FsbFZhbHVlfHwwLGE9ZS50b2tlblZhbHVlLHU9ZS50b2tlbklkfHxlLnRva2VuX2lkLGM9ZS5hYmksZD12b2lkIDAhPT1jJiZjLGw9ZS5ieXRlY29kZSxoPXZvaWQgMCE9PWwmJmwsZj1lLnBhcmFtZXRlcnMsdj12b2lkIDA9PT1mP1tdOmYscD1lLm5hbWUsZz12b2lkIDA9PT1wP1wiXCI6cDtpZihkJiZMZS5pc1N0cmluZyhkKSl0cnl7ZD1KU09OLnBhcnNlKGQpfWNhdGNoKGUpe3JldHVybiBuKFwiSW52YWxpZCBvcHRpb25zLmFiaSBwcm92aWRlZFwiKX1pZihkLmVudHJ5cyYmKGQ9ZC5lbnRyeXMpLCFMZS5pc0FycmF5KGQpKXJldHVybiBuKFwiSW52YWxpZCBvcHRpb25zLmFiaSBwcm92aWRlZFwiKTt2YXIgYj1kLnNvbWUoZnVuY3Rpb24oZSl7cmV0dXJuXCJjb25zdHJ1Y3RvclwiPT1lLnR5cGUmJmUucGF5YWJsZX0pO2lmKCF0aGlzLnZhbGlkYXRvci5ub3RWYWxpZChbe25hbWU6XCJieXRlY29kZVwiLHR5cGU6XCJoZXhcIix2YWx1ZTpofSx7bmFtZTpcImZlZUxpbWl0XCIsdHlwZTpcImludGVnZXJcIix2YWx1ZTpyLGd0OjAsbHRlOjFlOX0se25hbWU6XCJjYWxsVmFsdWVcIix0eXBlOlwiaW50ZWdlclwiLHZhbHVlOm8sZ3RlOjB9LHtuYW1lOlwidXNlckZlZVBlcmNlbnRhZ2VcIix0eXBlOlwiaW50ZWdlclwiLHZhbHVlOmksZ3RlOjAsbHRlOjEwMH0se25hbWU6XCJvcmlnaW5FbmVyZ3lMaW1pdFwiLHR5cGU6XCJpbnRlZ2VyXCIsdmFsdWU6cyxndGU6MCxsdGU6MWU3fSx7bmFtZTpcInBhcmFtZXRlcnNcIix0eXBlOlwiYXJyYXlcIix2YWx1ZTp2fSx7bmFtZTpcImlzc3VlclwiLHR5cGU6XCJhZGRyZXNzXCIsdmFsdWU6dH0se25hbWU6XCJ0b2tlblZhbHVlXCIsdHlwZTpcImludGVnZXJcIix2YWx1ZTphLGd0ZTowLG9wdGlvbmFsOiEwfSx7bmFtZTpcInRva2VuSWRcIix0eXBlOlwiaW50ZWdlclwiLHZhbHVlOnUsZ3RlOjAsb3B0aW9uYWw6ITB9XSxuKSl7aWYoYiYmMD09byYmMD09YSlyZXR1cm4gbihcIldoZW4gY29udHJhY3QgaXMgcGF5YWJsZSwgb3B0aW9ucy5jYWxsVmFsdWUgb3Igb3B0aW9ucy50b2tlblZhbHVlIG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyXCIpO2lmKCFiJiYobz4wfHxhPjApKXJldHVybiBuKFwiV2hlbiBjb250cmFjdCBpcyBub3QgcGF5YWJsZSwgb3B0aW9ucy5jYWxsVmFsdWUgYW5kIG9wdGlvbnMudG9rZW5WYWx1ZSBtdXN0IGJlIDBcIik7dmFyIG09ZC5maW5kKGZ1bmN0aW9uKGUpe3JldHVyblwiY29uc3RydWN0b3JcIj09PWUudHlwZX0pO2lmKHZvaWQgMCE9PW0mJm0pe3ZhciB5PW5ldyB2ZSxrPVtdLHg9W107aWYobT1tLmlucHV0cyx2Lmxlbmd0aCE9bS5sZW5ndGgpcmV0dXJuIG4oXCJjb25zdHJ1Y3RvciBuZWVkcyBcIi5jb25jYXQobS5sZW5ndGgsXCIgYnV0IFwiKS5jb25jYXQodi5sZW5ndGgsXCIgcHJvdmlkZWRcIikpO2Zvcih2YXIgdz0wO3c8di5sZW5ndGg7dysrKXt2YXIgST1tW3ddLnR5cGUsVz12W3ddO2lmKCFJfHwhTGUuaXNTdHJpbmcoSSl8fCFJLmxlbmd0aClyZXR1cm4gbihcIkludmFsaWQgcGFyYW1ldGVyIHR5cGUgcHJvdmlkZWQ6IFwiK0kpO1wiYWRkcmVzc1wiPT1JJiYoVz1ldChXKS5yZXBsYWNlKHosXCIweFwiKSksay5wdXNoKEkpLHgucHVzaChXKX10cnl7dj15LmVuY29kZShrLHgpLnJlcGxhY2UoL14oMHgpLyxcIlwiKX1jYXRjaChlKXtyZXR1cm4gbihlKX19ZWxzZSB2PVwiXCI7dmFyIEE9e293bmVyX2FkZHJlc3M6ZXQodCksZmVlX2xpbWl0OnBhcnNlSW50KHIpLGNhbGxfdmFsdWU6cGFyc2VJbnQobyksY29uc3VtZV91c2VyX3Jlc291cmNlX3BlcmNlbnQ6aSxvcmlnaW5fZW5lcmd5X2xpbWl0OnMsYWJpOkpTT04uc3RyaW5naWZ5KGQpLGJ5dGVjb2RlOmgscGFyYW1ldGVyOnYsbmFtZTpnfTtMZS5pc05vdE51bGxPclVuZGVmaW5lZChhKSYmKEEuY2FsbF90b2tlbl92YWx1ZT1wYXJzZUludChhKSksTGUuaXNOb3ROdWxsT3JVbmRlZmluZWQodSkmJihBLnRva2VuX2lkPXBhcnNlSW50KHUpKSxlJiZlLnBlcm1pc3Npb25JZCYmKEEuUGVybWlzc2lvbl9pZD1lLnBlcm1pc3Npb25JZCksdGhpcy50cm9uV2ViLmZ1bGxOb2RlLnJlcXVlc3QoXCJ3YWxsZXQvZGVwbG95Y29udHJhY3RcIixBLFwicG9zdFwiKS50aGVuKGZ1bmN0aW9uKGUpe3JldHVybiBudChlLG4pfSkuY2F0Y2goZnVuY3Rpb24oZSl7cmV0dXJuIG4oZSl9KX19fSx7a2V5OlwidHJpZ2dlclNtYXJ0Q29udHJhY3RcIix2YWx1ZTpmdW5jdGlvbigpe2Zvcih2YXIgZT1hcmd1bWVudHMubGVuZ3RoLHQ9bmV3IEFycmF5KGUpLG49MDtuPGU7bisrKXRbbl09YXJndW1lbnRzW25dO3JldHVyblwib2JqZWN0XCIhPT12KCkodFsyXSkmJih0WzJdPXtmZWVMaW1pdDp0WzJdLGNhbGxWYWx1ZTp0WzNdfSx0LnNwbGljZSgzLDEpKSx0aGlzLl90cmlnZ2VyU21hcnRDb250cmFjdC5hcHBseSh0aGlzLHQpfX0se2tleTpcInRyaWdnZXJDb25zdGFudENvbnRyYWN0XCIsdmFsdWU6ZnVuY3Rpb24oKXtmb3IodmFyIGU9YXJndW1lbnRzLmxlbmd0aCx0PW5ldyBBcnJheShlKSxuPTA7bjxlO24rKyl0W25dPWFyZ3VtZW50c1tuXTtyZXR1cm4gdFsyXS5faXNDb25zdGFudD0hMCx0aGlzLnRyaWdnZXJTbWFydENvbnRyYWN0LmFwcGx5KHRoaXMsdCl9fSx7a2V5OlwiX3RyaWdnZXJTbWFydENvbnRyYWN0XCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXt2YXIgbj1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXT9hcmd1bWVudHNbMl06e30scj1hcmd1bWVudHMubGVuZ3RoPjMmJnZvaWQgMCE9PWFyZ3VtZW50c1szXT9hcmd1bWVudHNbM106W10saT1hcmd1bWVudHMubGVuZ3RoPjQmJnZvaWQgMCE9PWFyZ3VtZW50c1s0XT9hcmd1bWVudHNbNF06dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleCxzPWFyZ3VtZW50cy5sZW5ndGg+NSYmdm9pZCAwIT09YXJndW1lbnRzWzVdJiZhcmd1bWVudHNbNV07aWYoTGUuaXNGdW5jdGlvbihpKSYmKHM9aSxpPXRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgpLExlLmlzRnVuY3Rpb24ocikmJihzPXIscj1bXSksIXMpcmV0dXJuIHRoaXMuaW5qZWN0UHJvbWlzZSh0aGlzLl90cmlnZ2VyU21hcnRDb250cmFjdCxlLHQsbixyLGkpO3ZhciBvPU9iamVjdC5hc3NpZ24oe2NhbGxWYWx1ZTowLGZlZUxpbWl0OjFlOX0sbiksYT1vLnRva2VuVmFsdWUsdT1vLnRva2VuSWQsYz1vLmNhbGxWYWx1ZSxkPW8uZmVlTGltaXQ7aWYoIXRoaXMudmFsaWRhdG9yLm5vdFZhbGlkKFt7bmFtZTpcImZlZUxpbWl0XCIsdHlwZTpcImludGVnZXJcIix2YWx1ZTpkLGd0OjAsbHRlOjFlOX0se25hbWU6XCJjYWxsVmFsdWVcIix0eXBlOlwiaW50ZWdlclwiLHZhbHVlOmMsZ3RlOjB9LHtuYW1lOlwicGFyYW1ldGVyc1wiLHR5cGU6XCJhcnJheVwiLHZhbHVlOnJ9LHtuYW1lOlwiY29udHJhY3RcIix0eXBlOlwiYWRkcmVzc1wiLHZhbHVlOmV9LHtuYW1lOlwiaXNzdWVyXCIsdHlwZTpcImFkZHJlc3NcIix2YWx1ZTppLG9wdGlvbmFsOiEwfSx7bmFtZTpcInRva2VuVmFsdWVcIix0eXBlOlwiaW50ZWdlclwiLHZhbHVlOmEsZ3RlOjAsb3B0aW9uYWw6ITB9LHtuYW1lOlwidG9rZW5JZFwiLHR5cGU6XCJpbnRlZ2VyXCIsdmFsdWU6dSxndGU6MCxvcHRpb25hbDohMH0se25hbWU6XCJmdW5jdGlvbiBzZWxlY3RvclwiLHR5cGU6XCJub3QtZW1wdHktc3RyaW5nXCIsdmFsdWU6dH1dLHMpKXtpZih0PXQucmVwbGFjZShcIi9zKi9nXCIsXCJcIiksci5sZW5ndGgpe2Zvcih2YXIgbD1uZXcgdmUsaD1bXSxmPVtdLHY9MDt2PHIubGVuZ3RoO3YrKyl7dmFyIHA9clt2XSxnPXAudHlwZSxiPXAudmFsdWU7aWYoIWd8fCFMZS5pc1N0cmluZyhnKXx8IWcubGVuZ3RoKXJldHVybiBzKFwiSW52YWxpZCBwYXJhbWV0ZXIgdHlwZSBwcm92aWRlZDogXCIrZyk7XCJhZGRyZXNzXCI9PWcmJihiPWV0KGIpLnJlcGxhY2UoeixcIjB4XCIpKSxoLnB1c2goZyksZi5wdXNoKGIpfXRyeXtoPWgubWFwKGZ1bmN0aW9uKGUpe3JldHVybi90cmNUb2tlbi8udGVzdChlKSYmKGU9ZS5yZXBsYWNlKC90cmNUb2tlbi8sXCJ1aW50MjU2XCIpKSxlfSkscj1sLmVuY29kZShoLGYpLnJlcGxhY2UoL14oMHgpLyxcIlwiKX1jYXRjaChlKXtyZXR1cm4gcyhlKX19ZWxzZSByPVwiXCI7dmFyIG09e2NvbnRyYWN0X2FkZHJlc3M6ZXQoZSksb3duZXJfYWRkcmVzczpldChpKSxmdW5jdGlvbl9zZWxlY3Rvcjp0LHBhcmFtZXRlcjpyfTtuLl9pc0NvbnN0YW50fHwobS5jYWxsX3ZhbHVlPXBhcnNlSW50KGMpLG0uZmVlX2xpbWl0PXBhcnNlSW50KGQpLExlLmlzTm90TnVsbE9yVW5kZWZpbmVkKGEpJiYobS5jYWxsX3Rva2VuX3ZhbHVlPXBhcnNlSW50KGEpKSxMZS5pc05vdE51bGxPclVuZGVmaW5lZCh1KSYmKG0udG9rZW5faWQ9cGFyc2VJbnQodSkpKSxuLnBlcm1pc3Npb25JZCYmKG0uUGVybWlzc2lvbl9pZD1uLnBlcm1pc3Npb25JZCksdGhpcy50cm9uV2ViLmZ1bGxOb2RlLnJlcXVlc3QoXCJ3YWxsZXQvdHJpZ2dlclwiLmNvbmNhdChuLl9pc0NvbnN0YW50P1wiY29uc3RhbnRcIjpcInNtYXJ0XCIsXCJjb250cmFjdFwiKSxtLFwicG9zdFwiKS50aGVuKGZ1bmN0aW9uKGUpe3JldHVybiBudChlLHMpfSkuY2F0Y2goZnVuY3Rpb24oZSl7cmV0dXJuIHMoZSl9KX19fSx7a2V5OlwiY2xlYXJBQklcIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleCxuPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdJiZhcmd1bWVudHNbMl07aWYoIW4pcmV0dXJuIHRoaXMuaW5qZWN0UHJvbWlzZSh0aGlzLmNsZWFyQUJJLGUsdCk7aWYoIXRoaXMudHJvbldlYi5pc0FkZHJlc3MoZSkpcmV0dXJuIG4oXCJJbnZhbGlkIGNvbnRyYWN0IGFkZHJlc3MgcHJvdmlkZWRcIik7aWYoIXRoaXMudHJvbldlYi5pc0FkZHJlc3ModCkpcmV0dXJuIG4oXCJJbnZhbGlkIG93bmVyIGFkZHJlc3MgcHJvdmlkZWRcIik7dmFyIHI9e2NvbnRyYWN0X2FkZHJlc3M6ZXQoZSksb3duZXJfYWRkcmVzczpldCh0KX07dGhpcy50cm9uV2ViLnRyeC5jYWNoZS5jb250cmFjdHNbZV0mJmRlbGV0ZSB0aGlzLnRyb25XZWIudHJ4LmNhY2hlLmNvbnRyYWN0c1tlXSx0aGlzLnRyb25XZWIuZnVsbE5vZGUucmVxdWVzdChcIndhbGxldC9jbGVhcmFiaVwiLHIsXCJwb3N0XCIpLnRoZW4oZnVuY3Rpb24oZSl7cmV0dXJuIG50KGUsbil9KS5jYXRjaChmdW5jdGlvbihlKXtyZXR1cm4gbihlKX0pfX0se2tleTpcImNyZWF0ZVRva2VuXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06e30sdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleCxuPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdJiZhcmd1bWVudHNbMl07aWYoTGUuaXNGdW5jdGlvbih0KSYmKG49dCx0PXRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgpLCFuKXJldHVybiB0aGlzLmluamVjdFByb21pc2UodGhpcy5jcmVhdGVUb2tlbixlLHQpO3ZhciByPWUubmFtZSxpPXZvaWQgMCE9PXImJnIscz1lLmFiYnJldmlhdGlvbixvPXZvaWQgMCE9PXMmJnMsYT1lLmRlc2NyaXB0aW9uLHU9dm9pZCAwIT09YSYmYSxjPWUudXJsLGQ9dm9pZCAwIT09YyYmYyxsPWUudG90YWxTdXBwbHksaD12b2lkIDA9PT1sPzA6bCxmPWUudHJ4UmF0aW8sdj12b2lkIDA9PT1mPzE6ZixwPWUudG9rZW5SYXRpbyxnPXZvaWQgMD09PXA/MTpwLGI9ZS5zYWxlU3RhcnQsbT12b2lkIDA9PT1iP0RhdGUubm93KCk6Yix5PWUuc2FsZUVuZCxrPXZvaWQgMCE9PXkmJnkseD1lLmZyZWVCYW5kd2lkdGgsdz12b2lkIDA9PT14PzA6eCxJPWUuZnJlZUJhbmR3aWR0aExpbWl0LFc9dm9pZCAwPT09ST8wOkksQT1lLmZyb3plbkFtb3VudCxQPXZvaWQgMD09PUE/MDpBLF89ZS5mcm96ZW5EdXJhdGlvbixOPXZvaWQgMD09PV8/MDpfLFM9ZS52b3RlU2NvcmUsVD1lLnByZWNpc2lvbjtpZighdGhpcy52YWxpZGF0b3Iubm90VmFsaWQoW3tuYW1lOlwiU3VwcGx5IGFtb3VudFwiLHR5cGU6XCJwb3NpdGl2ZS1pbnRlZ2VyXCIsdmFsdWU6aH0se25hbWU6XCJUUlggcmF0aW9cIix0eXBlOlwicG9zaXRpdmUtaW50ZWdlclwiLHZhbHVlOnZ9LHtuYW1lOlwiVG9rZW4gcmF0aW9cIix0eXBlOlwicG9zaXRpdmUtaW50ZWdlclwiLHZhbHVlOmd9LHtuYW1lOlwidG9rZW4gYWJicmV2aWF0aW9uXCIsdHlwZTpcIm5vdC1lbXB0eS1zdHJpbmdcIix2YWx1ZTpvfSx7bmFtZTpcInRva2VuIG5hbWVcIix0eXBlOlwibm90LWVtcHR5LXN0cmluZ1wiLHZhbHVlOml9LHtuYW1lOlwidG9rZW4gZGVzY3JpcHRpb25cIix0eXBlOlwibm90LWVtcHR5LXN0cmluZ1wiLHZhbHVlOnV9LHtuYW1lOlwidG9rZW4gdXJsXCIsdHlwZTpcInVybFwiLHZhbHVlOmR9LHtuYW1lOlwiaXNzdWVyXCIsdHlwZTpcImFkZHJlc3NcIix2YWx1ZTp0fSx7bmFtZTpcInNhbGUgc3RhcnQgdGltZXN0YW1wXCIsdHlwZTpcImludGVnZXJcIix2YWx1ZTptLGd0ZTpEYXRlLm5vdygpfSx7bmFtZTpcInNhbGUgZW5kIHRpbWVzdGFtcFwiLHR5cGU6XCJpbnRlZ2VyXCIsdmFsdWU6ayxndDptfSx7bmFtZTpcIkZyZWUgYmFuZHdpZHRoIGFtb3VudFwiLHR5cGU6XCJpbnRlZ2VyXCIsdmFsdWU6dyxndGU6MH0se25hbWU6XCJGcmVlIGJhbmR3aWR0aCBsaW1pdFwiLHR5cGU6XCJpbnRlZ2VyXCIsdmFsdWU6VyxndGU6MH0se25hbWU6XCJGcm96ZW4gc3VwcGx5XCIsdHlwZTpcImludGVnZXJcIix2YWx1ZTpQLGd0ZTowfSx7bmFtZTpcIkZyb3plbiBkdXJhdGlvblwiLHR5cGU6XCJpbnRlZ2VyXCIsdmFsdWU6TixndGU6MH1dLG4pKXtpZihMZS5pc05vdE51bGxPclVuZGVmaW5lZChTKSYmKCFMZS5pc0ludGVnZXIoUyl8fFM8PTApKXJldHVybiBuKFwidm90ZVNjb3JlIG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiAwXCIpO2lmKExlLmlzTm90TnVsbE9yVW5kZWZpbmVkKFQpJiYoIUxlLmlzSW50ZWdlcihUKXx8VDw9MHx8VD42KSlyZXR1cm4gbihcInByZWNpc2lvbiBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlciA+IDAgYW5kIDw9IDZcIik7dmFyIGo9e293bmVyX2FkZHJlc3M6ZXQodCksbmFtZTp0dChpKSxhYmJyOnR0KG8pLGRlc2NyaXB0aW9uOnR0KHUpLHVybDp0dChkKSx0b3RhbF9zdXBwbHk6cGFyc2VJbnQoaCksdHJ4X251bTpwYXJzZUludCh2KSxudW06cGFyc2VJbnQoZyksc3RhcnRfdGltZTpwYXJzZUludChtKSxlbmRfdGltZTpwYXJzZUludChrKSxmcmVlX2Fzc2V0X25ldF9saW1pdDpwYXJzZUludCh3KSxwdWJsaWNfZnJlZV9hc3NldF9uZXRfbGltaXQ6cGFyc2VJbnQoVyksZnJvemVuX3N1cHBseTp7ZnJvemVuX2Ftb3VudDpwYXJzZUludChQKSxmcm96ZW5fZGF5czpwYXJzZUludChOKX19OyF0aGlzLnRyb25XZWIuZnVsbG5vZGVTYXRpc2ZpZXMoXCI+PTMuNS4wXCIpfHxwYXJzZUludChQKT4wfHxkZWxldGUgai5mcm96ZW5fc3VwcGx5LFQmJiFpc05hTihwYXJzZUludChUKSkmJihqLnByZWNpc2lvbj1wYXJzZUludChUKSksUyYmIWlzTmFOKHBhcnNlSW50KFMpKSYmKGoudm90ZV9zY29yZT1wYXJzZUludChTKSksZSYmZS5wZXJtaXNzaW9uSWQmJihqLlBlcm1pc3Npb25faWQ9ZS5wZXJtaXNzaW9uSWQpLHRoaXMudHJvbldlYi5mdWxsTm9kZS5yZXF1ZXN0KFwid2FsbGV0L2NyZWF0ZWFzc2V0aXNzdWVcIixqLFwicG9zdFwiKS50aGVuKGZ1bmN0aW9uKGUpe3JldHVybiBudChlLG4pfSkuY2F0Y2goZnVuY3Rpb24oZSl7cmV0dXJuIG4oZSl9KX19fSx7a2V5OlwidXBkYXRlQWNjb3VudFwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXSx0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTp0aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4LG49YXJndW1lbnRzLmxlbmd0aD4yP2FyZ3VtZW50c1syXTp2b2lkIDAscj1hcmd1bWVudHMubGVuZ3RoPjMmJnZvaWQgMCE9PWFyZ3VtZW50c1szXSYmYXJndW1lbnRzWzNdO2lmKExlLmlzRnVuY3Rpb24obikmJihyPW4sbj17fSksTGUuaXNGdW5jdGlvbih0KT8ocj10LHQ9dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleCk6TGUuaXNPYmplY3QodCkmJihuPXQsdD10aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4KSwhcilyZXR1cm4gdGhpcy5pbmplY3RQcm9taXNlKHRoaXMudXBkYXRlQWNjb3VudCxlLHQsbik7aWYoIXRoaXMudmFsaWRhdG9yLm5vdFZhbGlkKFt7bmFtZTpcIk5hbWVcIix0eXBlOlwibm90LWVtcHR5LXN0cmluZ1wiLHZhbHVlOmV9LHtuYW1lOlwib3JpZ2luXCIsdHlwZTpcImFkZHJlc3NcIix2YWx1ZTp0fV0scikpe3ZhciBpPXthY2NvdW50X25hbWU6dHQoZSksb3duZXJfYWRkcmVzczpldCh0KX07biYmbi5wZXJtaXNzaW9uSWQmJihpLlBlcm1pc3Npb25faWQ9bi5wZXJtaXNzaW9uSWQpLHRoaXMudHJvbldlYi5mdWxsTm9kZS5yZXF1ZXN0KFwid2FsbGV0L3VwZGF0ZWFjY291bnRcIixpLFwicG9zdFwiKS50aGVuKGZ1bmN0aW9uKGUpe3JldHVybiBudChlLHIpfSkuY2F0Y2goZnVuY3Rpb24oZSl7cmV0dXJuIHIoZSl9KX19fSx7a2V5Olwic2V0QWNjb3VudElkXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOnRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgsbj1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXSYmYXJndW1lbnRzWzJdO2lmKExlLmlzRnVuY3Rpb24odCkmJihuPXQsdD10aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4KSwhbilyZXR1cm4gdGhpcy5pbmplY3RQcm9taXNlKHRoaXMuc2V0QWNjb3VudElkLGUsdCk7ZSYmTGUuaXNTdHJpbmcoZSkmJmUuc3RhcnRzV2l0aChcIjB4XCIpJiYoZT1lLnNsaWNlKDIpKSx0aGlzLnZhbGlkYXRvci5ub3RWYWxpZChbe25hbWU6XCJhY2NvdW50SWRcIix0eXBlOlwiaGV4XCIsdmFsdWU6ZX0se25hbWU6XCJhY2NvdW50SWRcIix0eXBlOlwic3RyaW5nXCIsbHRlOjMyLGd0ZTo4LHZhbHVlOmV9LHtuYW1lOlwib3JpZ2luXCIsdHlwZTpcImFkZHJlc3NcIix2YWx1ZTp0fV0sbil8fHRoaXMudHJvbldlYi5mdWxsTm9kZS5yZXF1ZXN0KFwid2FsbGV0L3NldGFjY291bnRpZFwiLHthY2NvdW50X2lkOmUsb3duZXJfYWRkcmVzczpldCh0KX0sXCJwb3N0XCIpLnRoZW4oZnVuY3Rpb24oZSl7cmV0dXJuIG50KGUsbil9KS5jYXRjaChmdW5jdGlvbihlKXtyZXR1cm4gbihlKX0pfX0se2tleTpcInVwZGF0ZVRva2VuXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06e30sdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleCxuPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdJiZhcmd1bWVudHNbMl07aWYoTGUuaXNGdW5jdGlvbih0KT8obj10LHQ9dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleCk6TGUuaXNPYmplY3QodCkmJihlPXQsdD10aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4KSwhbilyZXR1cm4gdGhpcy5pbmplY3RQcm9taXNlKHRoaXMudXBkYXRlVG9rZW4sZSx0KTt2YXIgcj1lLGk9ci5kZXNjcmlwdGlvbixzPXZvaWQgMCE9PWkmJmksbz1yLnVybCxhPXZvaWQgMCE9PW8mJm8sdT1yLmZyZWVCYW5kd2lkdGgsYz12b2lkIDA9PT11PzA6dSxkPXIuZnJlZUJhbmR3aWR0aExpbWl0LGw9dm9pZCAwPT09ZD8wOmQ7aWYoIXRoaXMudmFsaWRhdG9yLm5vdFZhbGlkKFt7bmFtZTpcInRva2VuIGRlc2NyaXB0aW9uXCIsdHlwZTpcIm5vdC1lbXB0eS1zdHJpbmdcIix2YWx1ZTpzfSx7bmFtZTpcInRva2VuIHVybFwiLHR5cGU6XCJ1cmxcIix2YWx1ZTphfSx7bmFtZTpcImlzc3VlclwiLHR5cGU6XCJhZGRyZXNzXCIsdmFsdWU6dH0se25hbWU6XCJGcmVlIGJhbmR3aWR0aCBhbW91bnRcIix0eXBlOlwicG9zaXRpdmUtaW50ZWdlclwiLHZhbHVlOmN9LHtuYW1lOlwiRnJlZSBiYW5kd2lkdGggbGltaXRcIix0eXBlOlwicG9zaXRpdmUtaW50ZWdlclwiLHZhbHVlOmx9XSxuKSl7dmFyIGg9e293bmVyX2FkZHJlc3M6ZXQodCksZGVzY3JpcHRpb246dHQocyksdXJsOnR0KGEpLG5ld19saW1pdDpwYXJzZUludChjKSxuZXdfcHVibGljX2xpbWl0OnBhcnNlSW50KGwpfTtlJiZlLnBlcm1pc3Npb25JZCYmKGguUGVybWlzc2lvbl9pZD1lLnBlcm1pc3Npb25JZCksdGhpcy50cm9uV2ViLmZ1bGxOb2RlLnJlcXVlc3QoXCJ3YWxsZXQvdXBkYXRlYXNzZXRcIixoLFwicG9zdFwiKS50aGVuKGZ1bmN0aW9uKGUpe3JldHVybiBudChlLG4pfSkuY2F0Y2goZnVuY3Rpb24oZSl7cmV0dXJuIG4oZSl9KX19fSx7a2V5Olwic2VuZEFzc2V0XCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zZW5kVG9rZW4uYXBwbHkodGhpcyxhcmd1bWVudHMpfX0se2tleTpcInB1cmNoYXNlQXNzZXRcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLnB1cmNoYXNlVG9rZW4uYXBwbHkodGhpcyxhcmd1bWVudHMpfX0se2tleTpcImNyZWF0ZUFzc2V0XCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jcmVhdGVUb2tlbi5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSx7a2V5OlwidXBkYXRlQXNzZXRcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLnVwZGF0ZVRva2VuLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19LHtrZXk6XCJjcmVhdGVQcm9wb3NhbFwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXSx0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTp0aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4LG49YXJndW1lbnRzLmxlbmd0aD4yP2FyZ3VtZW50c1syXTp2b2lkIDAscj1hcmd1bWVudHMubGVuZ3RoPjMmJnZvaWQgMCE9PWFyZ3VtZW50c1szXSYmYXJndW1lbnRzWzNdO2lmKExlLmlzRnVuY3Rpb24obikmJihyPW4sbj17fSksTGUuaXNGdW5jdGlvbih0KT8ocj10LHQ9dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleCk6TGUuaXNPYmplY3QodCkmJihuPXQsdD10aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4KSwhcilyZXR1cm4gdGhpcy5pbmplY3RQcm9taXNlKHRoaXMuY3JlYXRlUHJvcG9zYWwsZSx0LG4pO2lmKCF0aGlzLnZhbGlkYXRvci5ub3RWYWxpZChbe25hbWU6XCJpc3N1ZXJcIix0eXBlOlwiYWRkcmVzc1wiLHZhbHVlOnR9XSxyKSl7dmFyIGk9XCJJbnZhbGlkIHByb3Bvc2FsIHBhcmFtZXRlcnMgcHJvdmlkZWRcIjtpZighZSlyZXR1cm4gcihpKTtMZS5pc0FycmF5KGUpfHwoZT1bZV0pO3ZhciBzPSEwLG89ITEsYT12b2lkIDA7dHJ5e2Zvcih2YXIgdSxjPWVbU3ltYm9sLml0ZXJhdG9yXSgpOyEocz0odT1jLm5leHQoKSkuZG9uZSk7cz0hMCl7dmFyIGQ9dS52YWx1ZTtpZighTGUuaXNPYmplY3QoZCkpcmV0dXJuIHIoaSl9fWNhdGNoKGUpe289ITAsYT1lfWZpbmFsbHl7dHJ5e3N8fG51bGw9PWMucmV0dXJufHxjLnJldHVybigpfWZpbmFsbHl7aWYobyl0aHJvdyBhfX12YXIgbD17b3duZXJfYWRkcmVzczpldCh0KSxwYXJhbWV0ZXJzOmV9O24mJm4ucGVybWlzc2lvbklkJiYobC5QZXJtaXNzaW9uX2lkPW4ucGVybWlzc2lvbklkKSx0aGlzLnRyb25XZWIuZnVsbE5vZGUucmVxdWVzdChcIndhbGxldC9wcm9wb3NhbGNyZWF0ZVwiLGwsXCJwb3N0XCIpLnRoZW4oZnVuY3Rpb24oZSl7cmV0dXJuIG50KGUscil9KS5jYXRjaChmdW5jdGlvbihlKXtyZXR1cm4gcihlKX0pfX19LHtrZXk6XCJkZWxldGVQcm9wb3NhbFwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXSx0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTp0aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4LG49YXJndW1lbnRzLmxlbmd0aD4yP2FyZ3VtZW50c1syXTp2b2lkIDAscj1hcmd1bWVudHMubGVuZ3RoPjMmJnZvaWQgMCE9PWFyZ3VtZW50c1szXSYmYXJndW1lbnRzWzNdO2lmKExlLmlzRnVuY3Rpb24obikmJihyPW4sbj17fSksTGUuaXNGdW5jdGlvbih0KT8ocj10LHQ9dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleCk6TGUuaXNPYmplY3QodCkmJihuPXQsdD10aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4KSwhcilyZXR1cm4gdGhpcy5pbmplY3RQcm9taXNlKHRoaXMuZGVsZXRlUHJvcG9zYWwsZSx0LG4pO2lmKCF0aGlzLnZhbGlkYXRvci5ub3RWYWxpZChbe25hbWU6XCJpc3N1ZXJcIix0eXBlOlwiYWRkcmVzc1wiLHZhbHVlOnR9LHtuYW1lOlwicHJvcG9zYWxJRFwiLHR5cGU6XCJpbnRlZ2VyXCIsdmFsdWU6ZSxndGU6MH1dLHIpKXt2YXIgaT17b3duZXJfYWRkcmVzczpldCh0KSxwcm9wb3NhbF9pZDpwYXJzZUludChlKX07biYmbi5wZXJtaXNzaW9uSWQmJihpLlBlcm1pc3Npb25faWQ9bi5wZXJtaXNzaW9uSWQpLHRoaXMudHJvbldlYi5mdWxsTm9kZS5yZXF1ZXN0KFwid2FsbGV0L3Byb3Bvc2FsZGVsZXRlXCIsaSxcInBvc3RcIikudGhlbihmdW5jdGlvbihlKXtyZXR1cm4gbnQoZSxyKX0pLmNhdGNoKGZ1bmN0aW9uKGUpe3JldHVybiByKGUpfSl9fX0se2tleTpcInZvdGVQcm9wb3NhbFwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXSx0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdJiZhcmd1bWVudHNbMV0sbj1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXT9hcmd1bWVudHNbMl06dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleCxyPWFyZ3VtZW50cy5sZW5ndGg+Mz9hcmd1bWVudHNbM106dm9pZCAwLGk9YXJndW1lbnRzLmxlbmd0aD40JiZ2b2lkIDAhPT1hcmd1bWVudHNbNF0mJmFyZ3VtZW50c1s0XTtpZihMZS5pc0Z1bmN0aW9uKHIpJiYoaT1yLHI9e30pLExlLmlzRnVuY3Rpb24obik/KGk9bixuPXRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgpOkxlLmlzT2JqZWN0KG4pJiYocj1uLG49dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleCksIWkpcmV0dXJuIHRoaXMuaW5qZWN0UHJvbWlzZSh0aGlzLnZvdGVQcm9wb3NhbCxlLHQsbixyKTtpZighdGhpcy52YWxpZGF0b3Iubm90VmFsaWQoW3tuYW1lOlwidm90ZXJcIix0eXBlOlwiYWRkcmVzc1wiLHZhbHVlOm59LHtuYW1lOlwicHJvcG9zYWxJRFwiLHR5cGU6XCJpbnRlZ2VyXCIsdmFsdWU6ZSxndGU6MH0se25hbWU6XCJoYXMgYXBwcm92YWxcIix0eXBlOlwiYm9vbGVhblwiLHZhbHVlOnR9XSxpKSl7dmFyIHM9e293bmVyX2FkZHJlc3M6ZXQobikscHJvcG9zYWxfaWQ6cGFyc2VJbnQoZSksaXNfYWRkX2FwcHJvdmFsOnR9O3ImJnIucGVybWlzc2lvbklkJiYocy5QZXJtaXNzaW9uX2lkPXIucGVybWlzc2lvbklkKSx0aGlzLnRyb25XZWIuZnVsbE5vZGUucmVxdWVzdChcIndhbGxldC9wcm9wb3NhbGFwcHJvdmVcIixzLFwicG9zdFwiKS50aGVuKGZ1bmN0aW9uKGUpe3JldHVybiBudChlLGkpfSkuY2F0Y2goZnVuY3Rpb24oZSl7cmV0dXJuIGkoZSl9KX19fSx7a2V5OlwiY3JlYXRlVFJYRXhjaGFuZ2VcIix2YWx1ZTpmdW5jdGlvbihlLHQsbil7dmFyIHI9YXJndW1lbnRzLmxlbmd0aD4zJiZ2b2lkIDAhPT1hcmd1bWVudHNbM10/YXJndW1lbnRzWzNdOnRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgsaT1hcmd1bWVudHMubGVuZ3RoPjQ/YXJndW1lbnRzWzRdOnZvaWQgMCxzPWFyZ3VtZW50cy5sZW5ndGg+NSYmdm9pZCAwIT09YXJndW1lbnRzWzVdJiZhcmd1bWVudHNbNV07aWYoTGUuaXNGdW5jdGlvbihpKSYmKHM9aSxpPXt9KSxMZS5pc0Z1bmN0aW9uKHIpPyhzPXIscj10aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4KTpMZS5pc09iamVjdChyKSYmKGk9cixyPXRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgpLCFzKXJldHVybiB0aGlzLmluamVjdFByb21pc2UodGhpcy5jcmVhdGVUUlhFeGNoYW5nZSxlLHQsbixyLGkpO2lmKCF0aGlzLnZhbGlkYXRvci5ub3RWYWxpZChbe25hbWU6XCJvd25lclwiLHR5cGU6XCJhZGRyZXNzXCIsdmFsdWU6cn0se25hbWU6XCJ0b2tlbiBuYW1lXCIsdHlwZTpcIm5vdC1lbXB0eS1zdHJpbmdcIix2YWx1ZTplfSx7bmFtZTpcInRva2VuIGJhbGFuY2VcIix0eXBlOlwicG9zaXRpdmUtaW50ZWdlclwiLHZhbHVlOnR9LHtuYW1lOlwidHJ4IGJhbGFuY2VcIix0eXBlOlwicG9zaXRpdmUtaW50ZWdlclwiLHZhbHVlOm59XSxzKSl7dmFyIG89e293bmVyX2FkZHJlc3M6ZXQociksZmlyc3RfdG9rZW5faWQ6dHQoZSksZmlyc3RfdG9rZW5fYmFsYW5jZTp0LHNlY29uZF90b2tlbl9pZDpcIjVmXCIsc2Vjb25kX3Rva2VuX2JhbGFuY2U6bn07aSYmaS5wZXJtaXNzaW9uSWQmJihvLlBlcm1pc3Npb25faWQ9aS5wZXJtaXNzaW9uSWQpLHRoaXMudHJvbldlYi5mdWxsTm9kZS5yZXF1ZXN0KFwid2FsbGV0L2V4Y2hhbmdlY3JlYXRlXCIsbyxcInBvc3RcIikudGhlbihmdW5jdGlvbihlKXtzKG51bGwsZSl9KS5jYXRjaChmdW5jdGlvbihlKXtyZXR1cm4gcyhlKX0pfX19LHtrZXk6XCJjcmVhdGVUb2tlbkV4Y2hhbmdlXCIsdmFsdWU6ZnVuY3Rpb24oZSx0LG4scil7dmFyIGk9YXJndW1lbnRzLmxlbmd0aD40JiZ2b2lkIDAhPT1hcmd1bWVudHNbNF0/YXJndW1lbnRzWzRdOnRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgscz1hcmd1bWVudHMubGVuZ3RoPjU/YXJndW1lbnRzWzVdOnZvaWQgMCxvPWFyZ3VtZW50cy5sZW5ndGg+NiYmdm9pZCAwIT09YXJndW1lbnRzWzZdJiZhcmd1bWVudHNbNl07aWYoTGUuaXNGdW5jdGlvbihzKSYmKG89cyxzPXt9KSxMZS5pc0Z1bmN0aW9uKGkpPyhvPWksaT10aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4KTpMZS5pc09iamVjdChpKSYmKHM9aSxpPXRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgpLCFvKXJldHVybiB0aGlzLmluamVjdFByb21pc2UodGhpcy5jcmVhdGVUb2tlbkV4Y2hhbmdlLGUsdCxuLHIsaSxzKTtpZighdGhpcy52YWxpZGF0b3Iubm90VmFsaWQoW3tuYW1lOlwib3duZXJcIix0eXBlOlwiYWRkcmVzc1wiLHZhbHVlOml9LHtuYW1lOlwiZmlyc3QgdG9rZW4gbmFtZVwiLHR5cGU6XCJub3QtZW1wdHktc3RyaW5nXCIsdmFsdWU6ZX0se25hbWU6XCJzZWNvbmQgdG9rZW4gbmFtZVwiLHR5cGU6XCJub3QtZW1wdHktc3RyaW5nXCIsdmFsdWU6bn0se25hbWU6XCJmaXJzdCB0b2tlbiBiYWxhbmNlXCIsdHlwZTpcInBvc2l0aXZlLWludGVnZXJcIix2YWx1ZTp0fSx7bmFtZTpcInNlY29uZCB0b2tlbiBiYWxhbmNlXCIsdHlwZTpcInBvc2l0aXZlLWludGVnZXJcIix2YWx1ZTpyfV0sbykpe3ZhciBhPXtvd25lcl9hZGRyZXNzOmV0KGkpLGZpcnN0X3Rva2VuX2lkOnR0KGUpLGZpcnN0X3Rva2VuX2JhbGFuY2U6dCxzZWNvbmRfdG9rZW5faWQ6dHQobiksc2Vjb25kX3Rva2VuX2JhbGFuY2U6cn07cyYmcy5wZXJtaXNzaW9uSWQmJihhLlBlcm1pc3Npb25faWQ9cy5wZXJtaXNzaW9uSWQpLHRoaXMudHJvbldlYi5mdWxsTm9kZS5yZXF1ZXN0KFwid2FsbGV0L2V4Y2hhbmdlY3JlYXRlXCIsYSxcInBvc3RcIikudGhlbihmdW5jdGlvbihlKXtvKG51bGwsZSl9KS5jYXRjaChmdW5jdGlvbihlKXtyZXR1cm4gbyhlKX0pfX19LHtrZXk6XCJpbmplY3RFeGNoYW5nZVRva2Vuc1wiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXSx0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdJiZhcmd1bWVudHNbMV0sbj1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXT9hcmd1bWVudHNbMl06MCxyPWFyZ3VtZW50cy5sZW5ndGg+MyYmdm9pZCAwIT09YXJndW1lbnRzWzNdP2FyZ3VtZW50c1szXTp0aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4LGk9YXJndW1lbnRzLmxlbmd0aD40P2FyZ3VtZW50c1s0XTp2b2lkIDAscz1hcmd1bWVudHMubGVuZ3RoPjUmJnZvaWQgMCE9PWFyZ3VtZW50c1s1XSYmYXJndW1lbnRzWzVdO2lmKExlLmlzRnVuY3Rpb24oaSkmJihzPWksaT17fSksTGUuaXNGdW5jdGlvbihyKT8ocz1yLHI9dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleCk6TGUuaXNPYmplY3QocikmJihpPXIscj10aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4KSwhcylyZXR1cm4gdGhpcy5pbmplY3RQcm9taXNlKHRoaXMuaW5qZWN0RXhjaGFuZ2VUb2tlbnMsZSx0LG4scixpKTtpZighdGhpcy52YWxpZGF0b3Iubm90VmFsaWQoW3tuYW1lOlwib3duZXJcIix0eXBlOlwiYWRkcmVzc1wiLHZhbHVlOnJ9LHtuYW1lOlwidG9rZW4gbmFtZVwiLHR5cGU6XCJub3QtZW1wdHktc3RyaW5nXCIsdmFsdWU6dH0se25hbWU6XCJ0b2tlbiBhbW91bnRcIix0eXBlOlwiaW50ZWdlclwiLHZhbHVlOm4sZ3RlOjF9LHtuYW1lOlwiZXhjaGFuZ2VJRFwiLHR5cGU6XCJpbnRlZ2VyXCIsdmFsdWU6ZSxndGU6MH1dLHMpKXt2YXIgbz17b3duZXJfYWRkcmVzczpldChyKSxleGNoYW5nZV9pZDpwYXJzZUludChlKSx0b2tlbl9pZDp0dCh0KSxxdWFudDpwYXJzZUludChuKX07aSYmaS5wZXJtaXNzaW9uSWQmJihvLlBlcm1pc3Npb25faWQ9aS5wZXJtaXNzaW9uSWQpLHRoaXMudHJvbldlYi5mdWxsTm9kZS5yZXF1ZXN0KFwid2FsbGV0L2V4Y2hhbmdlaW5qZWN0XCIsbyxcInBvc3RcIikudGhlbihmdW5jdGlvbihlKXtyZXR1cm4gbnQoZSxzKX0pLmNhdGNoKGZ1bmN0aW9uKGUpe3JldHVybiBzKGUpfSl9fX0se2tleTpcIndpdGhkcmF3RXhjaGFuZ2VUb2tlbnNcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdJiZhcmd1bWVudHNbMF0sdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXSYmYXJndW1lbnRzWzFdLG49YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0/YXJndW1lbnRzWzJdOjAscj1hcmd1bWVudHMubGVuZ3RoPjMmJnZvaWQgMCE9PWFyZ3VtZW50c1szXT9hcmd1bWVudHNbM106dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleCxpPWFyZ3VtZW50cy5sZW5ndGg+ND9hcmd1bWVudHNbNF06dm9pZCAwLHM9YXJndW1lbnRzLmxlbmd0aD41JiZ2b2lkIDAhPT1hcmd1bWVudHNbNV0mJmFyZ3VtZW50c1s1XTtpZihMZS5pc0Z1bmN0aW9uKGkpJiYocz1pLGk9e30pLExlLmlzRnVuY3Rpb24ocik/KHM9cixyPXRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgpOkxlLmlzT2JqZWN0KHIpJiYoaT1yLHI9dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleCksIXMpcmV0dXJuIHRoaXMuaW5qZWN0UHJvbWlzZSh0aGlzLndpdGhkcmF3RXhjaGFuZ2VUb2tlbnMsZSx0LG4scixpKTtpZighdGhpcy52YWxpZGF0b3Iubm90VmFsaWQoW3tuYW1lOlwib3duZXJcIix0eXBlOlwiYWRkcmVzc1wiLHZhbHVlOnJ9LHtuYW1lOlwidG9rZW4gbmFtZVwiLHR5cGU6XCJub3QtZW1wdHktc3RyaW5nXCIsdmFsdWU6dH0se25hbWU6XCJ0b2tlbiBhbW91bnRcIix0eXBlOlwiaW50ZWdlclwiLHZhbHVlOm4sZ3RlOjF9LHtuYW1lOlwiZXhjaGFuZ2VJRFwiLHR5cGU6XCJpbnRlZ2VyXCIsdmFsdWU6ZSxndGU6MH1dLHMpKXt2YXIgbz17b3duZXJfYWRkcmVzczpldChyKSxleGNoYW5nZV9pZDpwYXJzZUludChlKSx0b2tlbl9pZDp0dCh0KSxxdWFudDpwYXJzZUludChuKX07aSYmaS5wZXJtaXNzaW9uSWQmJihvLlBlcm1pc3Npb25faWQ9aS5wZXJtaXNzaW9uSWQpLHRoaXMudHJvbldlYi5mdWxsTm9kZS5yZXF1ZXN0KFwid2FsbGV0L2V4Y2hhbmdld2l0aGRyYXdcIixvLFwicG9zdFwiKS50aGVuKGZ1bmN0aW9uKGUpe3JldHVybiBudChlLHMpfSkuY2F0Y2goZnVuY3Rpb24oZSl7cmV0dXJuIHMoZSl9KX19fSx7a2V5OlwidHJhZGVFeGNoYW5nZVRva2Vuc1wiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXSx0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdJiZhcmd1bWVudHNbMV0sbj1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXT9hcmd1bWVudHNbMl06MCxyPWFyZ3VtZW50cy5sZW5ndGg+MyYmdm9pZCAwIT09YXJndW1lbnRzWzNdP2FyZ3VtZW50c1szXTowLGk9YXJndW1lbnRzLmxlbmd0aD40JiZ2b2lkIDAhPT1hcmd1bWVudHNbNF0/YXJndW1lbnRzWzRdOnRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgscz1hcmd1bWVudHMubGVuZ3RoPjU/YXJndW1lbnRzWzVdOnZvaWQgMCxvPWFyZ3VtZW50cy5sZW5ndGg+NiYmdm9pZCAwIT09YXJndW1lbnRzWzZdJiZhcmd1bWVudHNbNl07aWYoTGUuaXNGdW5jdGlvbihzKSYmKG89cyxzPXt9KSxMZS5pc0Z1bmN0aW9uKGkpPyhvPWksaT10aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4KTpMZS5pc09iamVjdChpKSYmKHM9aSxpPXRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgpLCFvKXJldHVybiB0aGlzLmluamVjdFByb21pc2UodGhpcy50cmFkZUV4Y2hhbmdlVG9rZW5zLGUsdCxuLHIsaSxzKTtpZighdGhpcy52YWxpZGF0b3Iubm90VmFsaWQoW3tuYW1lOlwib3duZXJcIix0eXBlOlwiYWRkcmVzc1wiLHZhbHVlOml9LHtuYW1lOlwidG9rZW4gbmFtZVwiLHR5cGU6XCJub3QtZW1wdHktc3RyaW5nXCIsdmFsdWU6dH0se25hbWU6XCJ0b2tlbkFtb3VudFNvbGRcIix0eXBlOlwiaW50ZWdlclwiLHZhbHVlOm4sZ3RlOjF9LHtuYW1lOlwidG9rZW5BbW91bnRFeHBlY3RlZFwiLHR5cGU6XCJpbnRlZ2VyXCIsdmFsdWU6cixndGU6MX0se25hbWU6XCJleGNoYW5nZUlEXCIsdHlwZTpcImludGVnZXJcIix2YWx1ZTplLGd0ZTowfV0sbykpe3ZhciBhPXtvd25lcl9hZGRyZXNzOmV0KGkpLGV4Y2hhbmdlX2lkOnBhcnNlSW50KGUpLHRva2VuX2lkOnRoaXMudHJvbldlYi5mcm9tQXNjaWkodCkscXVhbnQ6cGFyc2VJbnQobiksZXhwZWN0ZWQ6cGFyc2VJbnQocil9O3MmJnMucGVybWlzc2lvbklkJiYoYS5QZXJtaXNzaW9uX2lkPXMucGVybWlzc2lvbklkKSx0aGlzLnRyb25XZWIuZnVsbE5vZGUucmVxdWVzdChcIndhbGxldC9leGNoYW5nZXRyYW5zYWN0aW9uXCIsYSxcInBvc3RcIikudGhlbihmdW5jdGlvbihlKXtyZXR1cm4gbnQoZSxvKX0pLmNhdGNoKGZ1bmN0aW9uKGUpe3JldHVybiBvKGUpfSl9fX0se2tleTpcInVwZGF0ZVNldHRpbmdcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdJiZhcmd1bWVudHNbMF0sdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXSYmYXJndW1lbnRzWzFdLG49YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0/YXJndW1lbnRzWzJdOnRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgscj1hcmd1bWVudHMubGVuZ3RoPjM/YXJndW1lbnRzWzNdOnZvaWQgMCxpPWFyZ3VtZW50cy5sZW5ndGg+NCYmdm9pZCAwIT09YXJndW1lbnRzWzRdJiZhcmd1bWVudHNbNF07aWYoTGUuaXNGdW5jdGlvbihyKSYmKGk9cixyPXt9KSxMZS5pc0Z1bmN0aW9uKG4pPyhpPW4sbj10aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4KTpMZS5pc09iamVjdChuKSYmKHI9bixuPXRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgpLCFpKXJldHVybiB0aGlzLmluamVjdFByb21pc2UodGhpcy51cGRhdGVTZXR0aW5nLGUsdCxuLHIpO2lmKCF0aGlzLnZhbGlkYXRvci5ub3RWYWxpZChbe25hbWU6XCJvd25lclwiLHR5cGU6XCJhZGRyZXNzXCIsdmFsdWU6bn0se25hbWU6XCJjb250cmFjdFwiLHR5cGU6XCJhZGRyZXNzXCIsdmFsdWU6ZX0se25hbWU6XCJ1c2VyRmVlUGVyY2VudGFnZVwiLHR5cGU6XCJpbnRlZ2VyXCIsdmFsdWU6dCxndGU6MCxsdGU6MTAwfV0saSkpe3ZhciBzPXtvd25lcl9hZGRyZXNzOmV0KG4pLGNvbnRyYWN0X2FkZHJlc3M6ZXQoZSksY29uc3VtZV91c2VyX3Jlc291cmNlX3BlcmNlbnQ6dH07ciYmci5wZXJtaXNzaW9uSWQmJihzLlBlcm1pc3Npb25faWQ9ci5wZXJtaXNzaW9uSWQpLHRoaXMudHJvbldlYi5mdWxsTm9kZS5yZXF1ZXN0KFwid2FsbGV0L3VwZGF0ZXNldHRpbmdcIixzLFwicG9zdFwiKS50aGVuKGZ1bmN0aW9uKGUpe3JldHVybiBudChlLGkpfSkuY2F0Y2goZnVuY3Rpb24oZSl7cmV0dXJuIGkoZSl9KX19fSx7a2V5OlwidXBkYXRlRW5lcmd5TGltaXRcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdJiZhcmd1bWVudHNbMF0sdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXSYmYXJndW1lbnRzWzFdLG49YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0/YXJndW1lbnRzWzJdOnRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgscj1hcmd1bWVudHMubGVuZ3RoPjM/YXJndW1lbnRzWzNdOnZvaWQgMCxpPWFyZ3VtZW50cy5sZW5ndGg+NCYmdm9pZCAwIT09YXJndW1lbnRzWzRdJiZhcmd1bWVudHNbNF07aWYoTGUuaXNGdW5jdGlvbihyKSYmKGk9cixyPXt9KSxMZS5pc0Z1bmN0aW9uKG4pPyhpPW4sbj10aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4KTpMZS5pc09iamVjdChuKSYmKHI9bixuPXRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgpLCFpKXJldHVybiB0aGlzLmluamVjdFByb21pc2UodGhpcy51cGRhdGVFbmVyZ3lMaW1pdCxlLHQsbixyKTtpZighdGhpcy52YWxpZGF0b3Iubm90VmFsaWQoW3tuYW1lOlwib3duZXJcIix0eXBlOlwiYWRkcmVzc1wiLHZhbHVlOm59LHtuYW1lOlwiY29udHJhY3RcIix0eXBlOlwiYWRkcmVzc1wiLHZhbHVlOmV9LHtuYW1lOlwib3JpZ2luRW5lcmd5TGltaXRcIix0eXBlOlwiaW50ZWdlclwiLHZhbHVlOnQsZ3RlOjAsbHRlOjFlN31dLGkpKXt2YXIgcz17b3duZXJfYWRkcmVzczpldChuKSxjb250cmFjdF9hZGRyZXNzOmV0KGUpLG9yaWdpbl9lbmVyZ3lfbGltaXQ6dH07ciYmci5wZXJtaXNzaW9uSWQmJihzLlBlcm1pc3Npb25faWQ9ci5wZXJtaXNzaW9uSWQpLHRoaXMudHJvbldlYi5mdWxsTm9kZS5yZXF1ZXN0KFwid2FsbGV0L3VwZGF0ZWVuZXJneWxpbWl0XCIscyxcInBvc3RcIikudGhlbihmdW5jdGlvbihlKXtyZXR1cm4gbnQoZSxpKX0pLmNhdGNoKGZ1bmN0aW9uKGUpe3JldHVybiBpKGUpfSl9fX0se2tleTpcImNoZWNrUGVybWlzc2lvbnNcIix2YWx1ZTpmdW5jdGlvbihlLHQpe2lmKGUpe2lmKGUudHlwZSE9PXR8fCFlLnBlcm1pc3Npb25fbmFtZXx8IUxlLmlzU3RyaW5nKGUucGVybWlzc2lvbl9uYW1lKXx8IUxlLmlzSW50ZWdlcihlLnRocmVzaG9sZCl8fGUudGhyZXNob2xkPDF8fCFlLmtleXMpcmV0dXJuITE7dmFyIG49ITAscj0hMSxpPXZvaWQgMDt0cnl7Zm9yKHZhciBzLG89ZS5rZXlzW1N5bWJvbC5pdGVyYXRvcl0oKTshKG49KHM9by5uZXh0KCkpLmRvbmUpO249ITApe3ZhciBhPXMudmFsdWU7aWYoIXRoaXMudHJvbldlYi5pc0FkZHJlc3MoYS5hZGRyZXNzKXx8IUxlLmlzSW50ZWdlcihhLndlaWdodCl8fGEud2VpZ2h0PmUudGhyZXNob2xkfHxhLndlaWdodDwxfHwyPT09dCYmIWUub3BlcmF0aW9ucylyZXR1cm4hMX19Y2F0Y2goZSl7cj0hMCxpPWV9ZmluYWxseXt0cnl7bnx8bnVsbD09by5yZXR1cm58fG8ucmV0dXJuKCl9ZmluYWxseXtpZihyKXRocm93IGl9fX1yZXR1cm4hMH19LHtrZXk6XCJ1cGRhdGVBY2NvdW50UGVybWlzc2lvbnNcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp0aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4LHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0mJmFyZ3VtZW50c1sxXSxuPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdJiZhcmd1bWVudHNbMl0scj1hcmd1bWVudHMubGVuZ3RoPjMmJnZvaWQgMCE9PWFyZ3VtZW50c1szXSYmYXJndW1lbnRzWzNdLGk9YXJndW1lbnRzLmxlbmd0aD40JiZ2b2lkIDAhPT1hcmd1bWVudHNbNF0mJmFyZ3VtZW50c1s0XTtpZihMZS5pc0Z1bmN0aW9uKHIpJiYoaT1yLHI9ITEpLExlLmlzRnVuY3Rpb24obikmJihpPW4sbj1yPSExKSxMZS5pc0Z1bmN0aW9uKHQpJiYoaT10LHQ9bj1yPSExKSwhaSlyZXR1cm4gdGhpcy5pbmplY3RQcm9taXNlKHRoaXMudXBkYXRlQWNjb3VudFBlcm1pc3Npb25zLGUsdCxuLHIpO2lmKCF0aGlzLnRyb25XZWIuaXNBZGRyZXNzKGUpKXJldHVybiBpKFwiSW52YWxpZCBvd25lckFkZHJlc3MgcHJvdmlkZWRcIik7aWYoIXRoaXMuY2hlY2tQZXJtaXNzaW9ucyh0LDApKXJldHVybiBpKFwiSW52YWxpZCBvd25lclBlcm1pc3Npb25zIHByb3ZpZGVkXCIpO2lmKCF0aGlzLmNoZWNrUGVybWlzc2lvbnMobiwxKSlyZXR1cm4gaShcIkludmFsaWQgd2l0bmVzc1Blcm1pc3Npb25zIHByb3ZpZGVkXCIpO0FycmF5LmlzQXJyYXkocil8fChyPVtyXSk7dmFyIHM9ITAsbz0hMSxhPXZvaWQgMDt0cnl7Zm9yKHZhciB1LGM9cltTeW1ib2wuaXRlcmF0b3JdKCk7IShzPSh1PWMubmV4dCgpKS5kb25lKTtzPSEwKXt2YXIgZD11LnZhbHVlO2lmKCF0aGlzLmNoZWNrUGVybWlzc2lvbnMoZCwyKSlyZXR1cm4gaShcIkludmFsaWQgYWN0aXZlc1Blcm1pc3Npb25zIHByb3ZpZGVkXCIpfX1jYXRjaChlKXtvPSEwLGE9ZX1maW5hbGx5e3RyeXtzfHxudWxsPT1jLnJldHVybnx8Yy5yZXR1cm4oKX1maW5hbGx5e2lmKG8pdGhyb3cgYX19dmFyIGw9e293bmVyX2FkZHJlc3M6ZX07dCYmKGwub3duZXI9dCksbiYmKGwud2l0bmVzcz1uKSxyJiYobC5hY3RpdmVzPTE9PT1yLmxlbmd0aD9yWzBdOnIpLHRoaXMudHJvbldlYi5mdWxsTm9kZS5yZXF1ZXN0KFwid2FsbGV0L2FjY291bnRwZXJtaXNzaW9udXBkYXRlXCIsbCxcInBvc3RcIikudGhlbihmdW5jdGlvbihlKXtyZXR1cm4gbnQoZSxpKX0pLmNhdGNoKGZ1bmN0aW9uKGUpe3JldHVybiBpKGUpfSl9fSx7a2V5OlwibmV3VHhJRFwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9aCgpKGQuYS5tYXJrKGZ1bmN0aW9uIGUodCxuKXtyZXR1cm4gZC5hLndyYXAoZnVuY3Rpb24oZSl7Zm9yKDs7KXN3aXRjaChlLnByZXY9ZS5uZXh0KXtjYXNlIDA6aWYobil7ZS5uZXh0PTI7YnJlYWt9cmV0dXJuIGUuYWJydXB0KFwicmV0dXJuXCIsdGhpcy5pbmplY3RQcm9taXNlKHRoaXMubmV3VHhJRCx0KSk7Y2FzZSAyOnRoaXMudHJvbldlYi5mdWxsTm9kZS5yZXF1ZXN0KFwid2FsbGV0L2dldHNpZ253ZWlnaHRcIix0LFwicG9zdFwiKS50aGVuKGZ1bmN0aW9uKGUpe2U9ZS50cmFuc2FjdGlvbi50cmFuc2FjdGlvbixcImJvb2xlYW5cIj09dHlwZW9mIHQudmlzaWJsZSYmKGUudmlzaWJsZT10LnZpc2libGUpLG4obnVsbCxlKX0pLmNhdGNoKGZ1bmN0aW9uKGUpe3JldHVybiBuKFwiRXJyb3IgZ2VuZXJhdGluZyBhIG5ldyB0cmFuc2FjdGlvbiBpZC5cIil9KTtjYXNlIDM6Y2FzZVwiZW5kXCI6cmV0dXJuIGUuc3RvcCgpfX0sZSx0aGlzKX0pKTtyZXR1cm4gZnVuY3Rpb24odCxuKXtyZXR1cm4gZS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSgpfSx7a2V5OlwiYWx0ZXJUcmFuc2FjdGlvblwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9aCgpKGQuYS5tYXJrKGZ1bmN0aW9uIGUodCl7dmFyIG4scixpPWFyZ3VtZW50cztyZXR1cm4gZC5hLndyYXAoZnVuY3Rpb24oZSl7Zm9yKDs7KXN3aXRjaChlLnByZXY9ZS5uZXh0KXtjYXNlIDA6aWYobj1pLmxlbmd0aD4xJiZ2b2lkIDAhPT1pWzFdP2lbMV06e30scj1pLmxlbmd0aD4yJiZ2b2lkIDAhPT1pWzJdJiZpWzJdKXtlLm5leHQ9NDticmVha31yZXR1cm4gZS5hYnJ1cHQoXCJyZXR1cm5cIix0aGlzLmluamVjdFByb21pc2UodGhpcy5hbHRlclRyYW5zYWN0aW9uLHQsbikpO2Nhc2UgNDppZighdC5zaWduYXR1cmUpe2UubmV4dD02O2JyZWFrfXJldHVybiBlLmFicnVwdChcInJldHVyblwiLHIoXCJZb3UgY2FuIG5vdCBleHRlbmQgdGhlIGV4cGlyYXRpb24gb2YgYSBzaWduZWQgdHJhbnNhY3Rpb24uXCIpKTtjYXNlIDY6aWYoIW4uZGF0YSl7ZS5uZXh0PTEyO2JyZWFrfWlmKFwiaGV4XCIhPT1uLmRhdGFGb3JtYXQmJihuLmRhdGE9dGhpcy50cm9uV2ViLnRvSGV4KG4uZGF0YSkpLG4uZGF0YT1uLmRhdGEucmVwbGFjZSgvXjB4LyxcIlwiKSwwIT09bi5kYXRhLmxlbmd0aCl7ZS5uZXh0PTExO2JyZWFrfXJldHVybiBlLmFicnVwdChcInJldHVyblwiLHIoXCJJbnZhbGlkIGRhdGEgcHJvdmlkZWRcIikpO2Nhc2UgMTE6dC5yYXdfZGF0YS5kYXRhPW4uZGF0YTtjYXNlIDEyOmlmKCFuLmV4dGVuc2lvbil7ZS5uZXh0PTE3O2JyZWFrfWlmKG4uZXh0ZW5zaW9uPXBhcnNlSW50KDFlMypuLmV4dGVuc2lvbiksIShpc05hTihuLmV4dGVuc2lvbil8fHQucmF3X2RhdGEuZXhwaXJhdGlvbituLmV4dGVuc2lvbjw9RGF0ZS5ub3coKSszZTMpKXtlLm5leHQ9MTY7YnJlYWt9cmV0dXJuIGUuYWJydXB0KFwicmV0dXJuXCIscihcIkludmFsaWQgZXh0ZW5zaW9uIHByb3ZpZGVkXCIpKTtjYXNlIDE2OnQucmF3X2RhdGEuZXhwaXJhdGlvbis9bi5leHRlbnNpb247Y2FzZSAxNzp0aGlzLm5ld1R4SUQodCxyKTtjYXNlIDE4OmNhc2VcImVuZFwiOnJldHVybiBlLnN0b3AoKX19LGUsdGhpcyl9KSk7cmV0dXJuIGZ1bmN0aW9uKHQpe3JldHVybiBlLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19KCl9LHtrZXk6XCJleHRlbmRFeHBpcmF0aW9uXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1oKCkoZC5hLm1hcmsoZnVuY3Rpb24gZSh0LG4pe3ZhciByLGk9YXJndW1lbnRzO3JldHVybiBkLmEud3JhcChmdW5jdGlvbihlKXtmb3IoOzspc3dpdGNoKGUucHJldj1lLm5leHQpe2Nhc2UgMDppZihyPWkubGVuZ3RoPjImJnZvaWQgMCE9PWlbMl0mJmlbMl0pe2UubmV4dD0zO2JyZWFrfXJldHVybiBlLmFicnVwdChcInJldHVyblwiLHRoaXMuaW5qZWN0UHJvbWlzZSh0aGlzLmV4dGVuZEV4cGlyYXRpb24sdCxuKSk7Y2FzZSAzOnRoaXMuYWx0ZXJUcmFuc2FjdGlvbih0LHtleHRlbnNpb246bn0scik7Y2FzZSA0OmNhc2VcImVuZFwiOnJldHVybiBlLnN0b3AoKX19LGUsdGhpcyl9KSk7cmV0dXJuIGZ1bmN0aW9uKHQsbil7cmV0dXJuIGUuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0oKX0se2tleTpcImFkZFVwZGF0ZURhdGFcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWgoKShkLmEubWFyayhmdW5jdGlvbiBlKHQsbil7dmFyIHIsaSxzPWFyZ3VtZW50cztyZXR1cm4gZC5hLndyYXAoZnVuY3Rpb24oZSl7Zm9yKDs7KXN3aXRjaChlLnByZXY9ZS5uZXh0KXtjYXNlIDA6aWYocj1zLmxlbmd0aD4yJiZ2b2lkIDAhPT1zWzJdP3NbMl06XCJ1dGY4XCIsaT1zLmxlbmd0aD4zJiZ2b2lkIDAhPT1zWzNdJiZzWzNdLExlLmlzRnVuY3Rpb24ocikmJihpPXIscj1cInV0ZjhcIiksaSl7ZS5uZXh0PTU7YnJlYWt9cmV0dXJuIGUuYWJydXB0KFwicmV0dXJuXCIsdGhpcy5pbmplY3RQcm9taXNlKHRoaXMuYWRkVXBkYXRlRGF0YSx0LG4scikpO2Nhc2UgNTp0aGlzLmFsdGVyVHJhbnNhY3Rpb24odCx7ZGF0YTpuLGRhdGFGb3JtYXQ6cn0saSk7Y2FzZSA2OmNhc2VcImVuZFwiOnJldHVybiBlLnN0b3AoKX19LGUsdGhpcyl9KSk7cmV0dXJuIGZ1bmN0aW9uKHQsbil7cmV0dXJuIGUuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0oKX1dKSxlfSgpLGl0PWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSgpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdJiZhcmd1bWVudHNbMF07aWYoZygpKHRoaXMsZSksIXR8fCF0IGluc3RhbmNlb2YgcHQpdGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgaW5zdGFuY2Ugb2YgVHJvbldlYlwiKTt0aGlzLnRyb25XZWI9dCx0aGlzLmluamVjdFByb21pc2U9TGUucHJvbWlzZUluamVjdG9yKHRoaXMpLHRoaXMuY2FjaGU9e2NvbnRyYWN0czp7fX0sdGhpcy52YWxpZGF0b3I9bmV3IFFlKHQpfXJldHVybiBtKCkoZSxbe2tleTpcIl9wYXJzZVRva2VuXCIsdmFsdWU6ZnVuY3Rpb24oZSl7cmV0dXJuIEIoKSh7fSxlLHtuYW1lOnRoaXMudHJvbldlYi50b1V0ZjgoZS5uYW1lKSxhYmJyOmUuYWJiciYmdGhpcy50cm9uV2ViLnRvVXRmOChlLmFiYnIpLGRlc2NyaXB0aW9uOmUuZGVzY3JpcHRpb24mJnRoaXMudHJvbldlYi50b1V0ZjgoZS5kZXNjcmlwdGlvbiksdXJsOmUudXJsJiZ0aGlzLnRyb25XZWIudG9VdGY4KGUudXJsKX0pfX0se2tleTpcImdldEN1cnJlbnRCbG9ja1wiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXTtpZighZSlyZXR1cm4gdGhpcy5pbmplY3RQcm9taXNlKHRoaXMuZ2V0Q3VycmVudEJsb2NrKTt0aGlzLnRyb25XZWIuZnVsbE5vZGUucmVxdWVzdChcIndhbGxldC9nZXRub3dibG9ja1wiKS50aGVuKGZ1bmN0aW9uKHQpe2UobnVsbCx0KX0pLmNhdGNoKGZ1bmN0aW9uKHQpe3JldHVybiBlKHQpfSl9fSx7a2V5OlwiZ2V0Q29uZmlybWVkQ3VycmVudEJsb2NrXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdO2lmKCFlKXJldHVybiB0aGlzLmluamVjdFByb21pc2UodGhpcy5nZXRDb25maXJtZWRDdXJyZW50QmxvY2spO3RoaXMudHJvbldlYi5zb2xpZGl0eU5vZGUucmVxdWVzdChcIndhbGxldHNvbGlkaXR5L2dldG5vd2Jsb2NrXCIpLnRoZW4oZnVuY3Rpb24odCl7ZShudWxsLHQpfSkuY2F0Y2goZnVuY3Rpb24odCl7cmV0dXJuIGUodCl9KX19LHtrZXk6XCJnZXRCbG9ja1wiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnRoaXMudHJvbldlYi5kZWZhdWx0QmxvY2ssdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXSYmYXJndW1lbnRzWzFdO3JldHVybiBMZS5pc0Z1bmN0aW9uKGUpJiYodD1lLGU9dGhpcy50cm9uV2ViLmRlZmF1bHRCbG9jayksdD8hMT09PWU/dChcIk5vIGJsb2NrIGlkZW50aWZpZXIgcHJvdmlkZWRcIik6KFwiZWFybGllc3RcIj09ZSYmKGU9MCksXCJsYXRlc3RcIj09ZT90aGlzLmdldEN1cnJlbnRCbG9jayh0KTppc05hTihlKSYmTGUuaXNIZXgoZSk/dGhpcy5nZXRCbG9ja0J5SGFzaChlLHQpOnZvaWQgdGhpcy5nZXRCbG9ja0J5TnVtYmVyKGUsdCkpOnRoaXMuaW5qZWN0UHJvbWlzZSh0aGlzLmdldEJsb2NrLGUpfX0se2tleTpcImdldEJsb2NrQnlIYXNoXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0mJmFyZ3VtZW50c1sxXTtpZighdClyZXR1cm4gdGhpcy5pbmplY3RQcm9taXNlKHRoaXMuZ2V0QmxvY2tCeUhhc2gsZSk7dGhpcy50cm9uV2ViLmZ1bGxOb2RlLnJlcXVlc3QoXCJ3YWxsZXQvZ2V0YmxvY2tieWlkXCIse3ZhbHVlOmV9LFwicG9zdFwiKS50aGVuKGZ1bmN0aW9uKGUpe2lmKCFPYmplY3Qua2V5cyhlKS5sZW5ndGgpcmV0dXJuIHQoXCJCbG9jayBub3QgZm91bmRcIik7dChudWxsLGUpfSkuY2F0Y2goZnVuY3Rpb24oZSl7cmV0dXJuIHQoZSl9KX19LHtrZXk6XCJnZXRCbG9ja0J5TnVtYmVyXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0mJmFyZ3VtZW50c1sxXTtyZXR1cm4gdD8hTGUuaXNJbnRlZ2VyKGUpfHxlPDA/dChcIkludmFsaWQgYmxvY2sgbnVtYmVyIHByb3ZpZGVkXCIpOnZvaWQgdGhpcy50cm9uV2ViLmZ1bGxOb2RlLnJlcXVlc3QoXCJ3YWxsZXQvZ2V0YmxvY2tieW51bVwiLHtudW06cGFyc2VJbnQoZSl9LFwicG9zdFwiKS50aGVuKGZ1bmN0aW9uKGUpe2lmKCFPYmplY3Qua2V5cyhlKS5sZW5ndGgpcmV0dXJuIHQoXCJCbG9jayBub3QgZm91bmRcIik7dChudWxsLGUpfSkuY2F0Y2goZnVuY3Rpb24oZSl7cmV0dXJuIHQoZSl9KTp0aGlzLmluamVjdFByb21pc2UodGhpcy5nZXRCbG9ja0J5TnVtYmVyLGUpfX0se2tleTpcImdldEJsb2NrVHJhbnNhY3Rpb25Db3VudFwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnRoaXMudHJvbldlYi5kZWZhdWx0QmxvY2ssdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXSYmYXJndW1lbnRzWzFdO2lmKExlLmlzRnVuY3Rpb24oZSkmJih0PWUsZT10aGlzLnRyb25XZWIuZGVmYXVsdEJsb2NrKSwhdClyZXR1cm4gdGhpcy5pbmplY3RQcm9taXNlKHRoaXMuZ2V0QmxvY2tUcmFuc2FjdGlvbkNvdW50LGUpO3RoaXMuZ2V0QmxvY2soZSkudGhlbihmdW5jdGlvbihlKXt2YXIgbj1lLnRyYW5zYWN0aW9uczt0KG51bGwsKHZvaWQgMD09PW4/W106bikubGVuZ3RoKX0pLmNhdGNoKGZ1bmN0aW9uKGUpe3JldHVybiB0KGUpfSl9fSx7a2V5OlwiZ2V0VHJhbnNhY3Rpb25Gcm9tQmxvY2tcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp0aGlzLnRyb25XZWIuZGVmYXVsdEJsb2NrLHQ9YXJndW1lbnRzLmxlbmd0aD4xP2FyZ3VtZW50c1sxXTp2b2lkIDAsbj1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXSYmYXJndW1lbnRzWzJdO2lmKExlLmlzRnVuY3Rpb24odCkmJihuPXQsdD0wKSxMZS5pc0Z1bmN0aW9uKGUpJiYobj1lLGU9dGhpcy50cm9uV2ViLmRlZmF1bHRCbG9jayksIW4pcmV0dXJuIHRoaXMuaW5qZWN0UHJvbWlzZSh0aGlzLmdldFRyYW5zYWN0aW9uRnJvbUJsb2NrLGUsdCk7dGhpcy5nZXRCbG9jayhlKS50aGVuKGZ1bmN0aW9uKGUpe3ZhciByPWUudHJhbnNhY3Rpb25zLGk9dm9pZCAwIT09ciYmcjtpP1wibnVtYmVyXCI9PXR5cGVvZiB0P3Q+PTAmJnQ8aS5sZW5ndGg/bihudWxsLGlbdF0pOm4oXCJJbnZhbGlkIHRyYW5zYWN0aW9uIGluZGV4IHByb3ZpZGVkXCIpOm4obnVsbCxpKTpuKFwiVHJhbnNhY3Rpb24gbm90IGZvdW5kIGluIGJsb2NrXCIpfSkuY2F0Y2goZnVuY3Rpb24oZSl7cmV0dXJuIG4oZSl9KX19LHtrZXk6XCJnZXRUcmFuc2FjdGlvblwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdJiZhcmd1bWVudHNbMV07aWYoIXQpcmV0dXJuIHRoaXMuaW5qZWN0UHJvbWlzZSh0aGlzLmdldFRyYW5zYWN0aW9uLGUpO3RoaXMudHJvbldlYi5mdWxsTm9kZS5yZXF1ZXN0KFwid2FsbGV0L2dldHRyYW5zYWN0aW9uYnlpZFwiLHt2YWx1ZTplfSxcInBvc3RcIikudGhlbihmdW5jdGlvbihlKXtpZighT2JqZWN0LmtleXMoZSkubGVuZ3RoKXJldHVybiB0KFwiVHJhbnNhY3Rpb24gbm90IGZvdW5kXCIpO3QobnVsbCxlKX0pLmNhdGNoKGZ1bmN0aW9uKGUpe3JldHVybiB0KGUpfSl9fSx7a2V5OlwiZ2V0Q29uZmlybWVkVHJhbnNhY3Rpb25cIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXSYmYXJndW1lbnRzWzFdO2lmKCF0KXJldHVybiB0aGlzLmluamVjdFByb21pc2UodGhpcy5nZXRDb25maXJtZWRUcmFuc2FjdGlvbixlKTt0aGlzLnRyb25XZWIuc29saWRpdHlOb2RlLnJlcXVlc3QoXCJ3YWxsZXRzb2xpZGl0eS9nZXR0cmFuc2FjdGlvbmJ5aWRcIix7dmFsdWU6ZX0sXCJwb3N0XCIpLnRoZW4oZnVuY3Rpb24oZSl7aWYoIU9iamVjdC5rZXlzKGUpLmxlbmd0aClyZXR1cm4gdChcIlRyYW5zYWN0aW9uIG5vdCBmb3VuZFwiKTt0KG51bGwsZSl9KS5jYXRjaChmdW5jdGlvbihlKXtyZXR1cm4gdChlKX0pfX0se2tleTpcImdldFVuY29uZmlybWVkVHJhbnNhY3Rpb25JbmZvXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0mJmFyZ3VtZW50c1sxXTtyZXR1cm4gdGhpcy5fZ2V0VHJhbnNhY3Rpb25JbmZvQnlJZChlLHtjb25maXJtZWQ6ITF9LHQpfX0se2tleTpcImdldFRyYW5zYWN0aW9uSW5mb1wiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdJiZhcmd1bWVudHNbMV07cmV0dXJuIHRoaXMuX2dldFRyYW5zYWN0aW9uSW5mb0J5SWQoZSx7Y29uZmlybWVkOiEwfSx0KX19LHtrZXk6XCJfZ2V0VHJhbnNhY3Rpb25JbmZvQnlJZFwiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7dmFyIG49YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0mJmFyZ3VtZW50c1syXTtpZighbilyZXR1cm4gdGhpcy5pbmplY3RQcm9taXNlKHRoaXMuX2dldFRyYW5zYWN0aW9uSW5mb0J5SWQsZSx0KTt0aGlzLnRyb25XZWJbdC5jb25maXJtZWQ/XCJzb2xpZGl0eU5vZGVcIjpcImZ1bGxOb2RlXCJdLnJlcXVlc3QoXCJ3YWxsZXRcIi5jb25jYXQodC5jb25maXJtZWQ/XCJzb2xpZGl0eVwiOlwiXCIsXCIvZ2V0dHJhbnNhY3Rpb25pbmZvYnlpZFwiKSx7dmFsdWU6ZX0sXCJwb3N0XCIpLnRoZW4oZnVuY3Rpb24oZSl7bihudWxsLGUpfSkuY2F0Y2goZnVuY3Rpb24oZSl7cmV0dXJuIG4oZSl9KX19LHtrZXk6XCJnZXRUcmFuc2FjdGlvbnNUb0FkZHJlc3NcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp0aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4LHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOjMwLG49YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0/YXJndW1lbnRzWzJdOjAscj1hcmd1bWVudHMubGVuZ3RoPjMmJnZvaWQgMCE9PWFyZ3VtZW50c1szXSYmYXJndW1lbnRzWzNdO3JldHVybiBMZS5pc0Z1bmN0aW9uKG4pJiYocj1uLG49MCksTGUuaXNGdW5jdGlvbih0KSYmKHI9dCx0PTMwKSxyPyhlPXRoaXMudHJvbldlYi5hZGRyZXNzLnRvSGV4KGUpLHRoaXMuZ2V0VHJhbnNhY3Rpb25zUmVsYXRlZChlLFwidG9cIix0LG4scikpOnRoaXMuaW5qZWN0UHJvbWlzZSh0aGlzLmdldFRyYW5zYWN0aW9uc1RvQWRkcmVzcyxlLHQsbil9fSx7a2V5OlwiZ2V0VHJhbnNhY3Rpb25zRnJvbUFkZHJlc3NcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp0aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4LHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOjMwLG49YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0/YXJndW1lbnRzWzJdOjAscj1hcmd1bWVudHMubGVuZ3RoPjMmJnZvaWQgMCE9PWFyZ3VtZW50c1szXSYmYXJndW1lbnRzWzNdO3JldHVybiBMZS5pc0Z1bmN0aW9uKG4pJiYocj1uLG49MCksTGUuaXNGdW5jdGlvbih0KSYmKHI9dCx0PTMwKSxyPyhlPXRoaXMudHJvbldlYi5hZGRyZXNzLnRvSGV4KGUpLHRoaXMuZ2V0VHJhbnNhY3Rpb25zUmVsYXRlZChlLFwiZnJvbVwiLHQsbixyKSk6dGhpcy5pbmplY3RQcm9taXNlKHRoaXMuZ2V0VHJhbnNhY3Rpb25zRnJvbUFkZHJlc3MsZSx0LG4pfX0se2tleTpcImdldFRyYW5zYWN0aW9uc1JlbGF0ZWRcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWgoKShkLmEubWFyayhmdW5jdGlvbiBlKCl7dmFyIHQsbixyLGkscyxvLGEsdSxjLGw9YXJndW1lbnRzO3JldHVybiBkLmEud3JhcChmdW5jdGlvbihlKXtmb3IoOzspc3dpdGNoKGUucHJldj1lLm5leHQpe2Nhc2UgMDppZih0PWwubGVuZ3RoPjAmJnZvaWQgMCE9PWxbMF0/bFswXTp0aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4LG49bC5sZW5ndGg+MSYmdm9pZCAwIT09bFsxXT9sWzFdOlwiYWxsXCIscj1sLmxlbmd0aD4yJiZ2b2lkIDAhPT1sWzJdP2xbMl06MzAsaT1sLmxlbmd0aD4zJiZ2b2lkIDAhPT1sWzNdP2xbM106MCxzPWwubGVuZ3RoPjQmJnZvaWQgMCE9PWxbNF0mJmxbNF0sTGUuaXNGdW5jdGlvbihpKSYmKHM9aSxpPTApLExlLmlzRnVuY3Rpb24ocikmJihzPXIscj0zMCksTGUuaXNGdW5jdGlvbihuKSYmKHM9bixuPVwiYWxsXCIpLExlLmlzRnVuY3Rpb24odCkmJihzPXQsdD10aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4KSxzKXtlLm5leHQ9MTE7YnJlYWt9cmV0dXJuIGUuYWJydXB0KFwicmV0dXJuXCIsdGhpcy5pbmplY3RQcm9taXNlKHRoaXMuZ2V0VHJhbnNhY3Rpb25zUmVsYXRlZCx0LG4scixpKSk7Y2FzZSAxMTppZihbXCJ0b1wiLFwiZnJvbVwiLFwiYWxsXCJdLmluY2x1ZGVzKG4pKXtlLm5leHQ9MTM7YnJlYWt9cmV0dXJuIGUuYWJydXB0KFwicmV0dXJuXCIscygnSW52YWxpZCBkaXJlY3Rpb24gcHJvdmlkZWQ6IEV4cGVjdGVkIFwidG9cIiwgXCJmcm9tXCIgb3IgXCJhbGxcIicpKTtjYXNlIDEzOmlmKFwiYWxsXCIhPW4pe2UubmV4dD0yNzticmVha31yZXR1cm4gZS5wcmV2PTE0LGUubmV4dD0xNyxQcm9taXNlLmFsbChbdGhpcy5nZXRUcmFuc2FjdGlvbnNSZWxhdGVkKHQsXCJmcm9tXCIscixpKSx0aGlzLmdldFRyYW5zYWN0aW9uc1JlbGF0ZWQodCxcInRvXCIscixpKV0pO2Nhc2UgMTc6cmV0dXJuIG89ZS5zZW50LGE9JGUoKShvLDIpLHU9YVswXSxjPWFbMV0sZS5hYnJ1cHQoXCJyZXR1cm5cIixzKG51bGwsW10uY29uY2F0KFIoKSh1Lm1hcChmdW5jdGlvbihlKXtyZXR1cm4gZS5kaXJlY3Rpb249XCJmcm9tXCIsZX0pKSxSKCkoYy5tYXAoZnVuY3Rpb24oZSl7cmV0dXJuIGUuZGlyZWN0aW9uPVwidG9cIixlfSkpKS5zb3J0KGZ1bmN0aW9uKGUsdCl7cmV0dXJuIHQucmF3X2RhdGEudGltZXN0YW1wLWUucmF3X2RhdGEudGltZXN0YW1wfSkpKTtjYXNlIDI0OnJldHVybiBlLnByZXY9MjQsZS50MD1lLmNhdGNoKDE0KSxlLmFicnVwdChcInJldHVyblwiLHMoZS50MCkpO2Nhc2UgMjc6aWYodGhpcy50cm9uV2ViLmlzQWRkcmVzcyh0KSl7ZS5uZXh0PTI5O2JyZWFrfXJldHVybiBlLmFicnVwdChcInJldHVyblwiLHMoXCJJbnZhbGlkIGFkZHJlc3MgcHJvdmlkZWRcIikpO2Nhc2UgMjk6aWYoISghTGUuaXNJbnRlZ2VyKHIpfHxyPDB8fGkmJnI8MSkpe2UubmV4dD0zMTticmVha31yZXR1cm4gZS5hYnJ1cHQoXCJyZXR1cm5cIixzKFwiSW52YWxpZCBsaW1pdCBwcm92aWRlZFwiKSk7Y2FzZSAzMTppZihMZS5pc0ludGVnZXIoaSkmJiEoaTwwKSl7ZS5uZXh0PTMzO2JyZWFrfXJldHVybiBlLmFicnVwdChcInJldHVyblwiLHMoXCJJbnZhbGlkIG9mZnNldCBwcm92aWRlZFwiKSk7Y2FzZSAzMzp0PXRoaXMudHJvbldlYi5hZGRyZXNzLnRvSGV4KHQpLHRoaXMudHJvbldlYi5zb2xpZGl0eU5vZGUucmVxdWVzdChcIndhbGxldGV4dGVuc2lvbi9nZXR0cmFuc2FjdGlvbnNcIi5jb25jYXQobixcInRoaXNcIikse2FjY291bnQ6e2FkZHJlc3M6dH0sb2Zmc2V0OmksbGltaXQ6cn0sXCJwb3N0XCIpLnRoZW4oZnVuY3Rpb24oZSl7dmFyIHQ9ZS50cmFuc2FjdGlvbjtzKG51bGwsdCl9KS5jYXRjaChmdW5jdGlvbihlKXtyZXR1cm4gcyhlKX0pO2Nhc2UgMzU6Y2FzZVwiZW5kXCI6cmV0dXJuIGUuc3RvcCgpfX0sZSx0aGlzLFtbMTQsMjRdXSl9KSk7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGUuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0oKX0se2tleTpcImdldEFjY291bnRcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp0aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4LHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0mJmFyZ3VtZW50c1sxXTtyZXR1cm4gTGUuaXNGdW5jdGlvbihlKSYmKHQ9ZSxlPXRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgpLHQ/dGhpcy50cm9uV2ViLmlzQWRkcmVzcyhlKT8oZT10aGlzLnRyb25XZWIuYWRkcmVzcy50b0hleChlKSx2b2lkIHRoaXMudHJvbldlYi5zb2xpZGl0eU5vZGUucmVxdWVzdChcIndhbGxldHNvbGlkaXR5L2dldGFjY291bnRcIix7YWRkcmVzczplfSxcInBvc3RcIikudGhlbihmdW5jdGlvbihlKXt0KG51bGwsZSl9KS5jYXRjaChmdW5jdGlvbihlKXtyZXR1cm4gdChlKX0pKTp0KFwiSW52YWxpZCBhZGRyZXNzIHByb3ZpZGVkXCIpOnRoaXMuaW5qZWN0UHJvbWlzZSh0aGlzLmdldEFjY291bnQsZSl9fSx7a2V5OlwiZ2V0QWNjb3VudEJ5SWRcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdJiZhcmd1bWVudHNbMF0sdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXSYmYXJndW1lbnRzWzFdO2lmKCF0KXJldHVybiB0aGlzLmluamVjdFByb21pc2UodGhpcy5nZXRBY2NvdW50QnlJZCxlKTt0aGlzLmdldEFjY291bnRJbmZvQnlJZChlLHtjb25maXJtZWQ6ITB9LHQpfX0se2tleTpcImdldEFjY291bnRJbmZvQnlJZFwiLHZhbHVlOmZ1bmN0aW9uKGUsdCxuKXt0aGlzLnZhbGlkYXRvci5ub3RWYWxpZChbe25hbWU6XCJhY2NvdW50SWRcIix0eXBlOlwiaGV4XCIsdmFsdWU6ZX0se25hbWU6XCJhY2NvdW50SWRcIix0eXBlOlwic3RyaW5nXCIsbHRlOjMyLGd0ZTo4LHZhbHVlOmV9XSxuKXx8KGUuc3RhcnRzV2l0aChcIjB4XCIpJiYoZT1lLnNsaWNlKDIpKSx0aGlzLnRyb25XZWJbdC5jb25maXJtZWQ/XCJzb2xpZGl0eU5vZGVcIjpcImZ1bGxOb2RlXCJdLnJlcXVlc3QoXCJ3YWxsZXRcIi5jb25jYXQodC5jb25maXJtZWQ/XCJzb2xpZGl0eVwiOlwiXCIsXCIvZ2V0YWNjb3VudGJ5aWRcIikse2FjY291bnRfaWQ6ZX0sXCJwb3N0XCIpLnRoZW4oZnVuY3Rpb24oZSl7bihudWxsLGUpfSkuY2F0Y2goZnVuY3Rpb24oZSl7cmV0dXJuIG4oZSl9KSl9fSx7a2V5OlwiZ2V0QmFsYW5jZVwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgsdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXSYmYXJndW1lbnRzWzFdO2lmKExlLmlzRnVuY3Rpb24oZSkmJih0PWUsZT10aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4KSwhdClyZXR1cm4gdGhpcy5pbmplY3RQcm9taXNlKHRoaXMuZ2V0QmFsYW5jZSxlKTt0aGlzLmdldEFjY291bnQoZSkudGhlbihmdW5jdGlvbihlKXt2YXIgbj1lLmJhbGFuY2U7dChudWxsLHZvaWQgMD09PW4/MDpuKX0pLmNhdGNoKGZ1bmN0aW9uKGUpe3JldHVybiB0KGUpfSl9fSx7a2V5OlwiZ2V0VW5jb25maXJtZWRBY2NvdW50XCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleCx0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdJiZhcmd1bWVudHNbMV07cmV0dXJuIExlLmlzRnVuY3Rpb24oZSkmJih0PWUsZT10aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4KSx0P3RoaXMudHJvbldlYi5pc0FkZHJlc3MoZSk/KGU9dGhpcy50cm9uV2ViLmFkZHJlc3MudG9IZXgoZSksdm9pZCB0aGlzLnRyb25XZWIuZnVsbE5vZGUucmVxdWVzdChcIndhbGxldC9nZXRhY2NvdW50XCIse2FkZHJlc3M6ZX0sXCJwb3N0XCIpLnRoZW4oZnVuY3Rpb24oZSl7dChudWxsLGUpfSkuY2F0Y2goZnVuY3Rpb24oZSl7cmV0dXJuIHQoZSl9KSk6dChcIkludmFsaWQgYWRkcmVzcyBwcm92aWRlZFwiKTp0aGlzLmluamVjdFByb21pc2UodGhpcy5nZXRVbmNvbmZpcm1lZEFjY291bnQsZSl9fSx7a2V5OlwiZ2V0VW5jb25maXJtZWRBY2NvdW50QnlJZFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdJiZhcmd1bWVudHNbMV07aWYoIXQpcmV0dXJuIHRoaXMuaW5qZWN0UHJvbWlzZSh0aGlzLmdldFVuY29uZmlybWVkQWNjb3VudEJ5SWQsZSk7dGhpcy5nZXRBY2NvdW50SW5mb0J5SWQoZSx7Y29uZmlybWVkOiExfSx0KX19LHtrZXk6XCJnZXRVbmNvbmZpcm1lZEJhbGFuY2VcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp0aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4LHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0mJmFyZ3VtZW50c1sxXTtpZihMZS5pc0Z1bmN0aW9uKGUpJiYodD1lLGU9dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleCksIXQpcmV0dXJuIHRoaXMuaW5qZWN0UHJvbWlzZSh0aGlzLmdldFVuY29uZmlybWVkQmFsYW5jZSxlKTt0aGlzLmdldFVuY29uZmlybWVkQWNjb3VudChlKS50aGVuKGZ1bmN0aW9uKGUpe3ZhciBuPWUuYmFsYW5jZTt0KG51bGwsdm9pZCAwPT09bj8wOm4pfSkuY2F0Y2goZnVuY3Rpb24oZSl7cmV0dXJuIHQoZSl9KX19LHtrZXk6XCJnZXRCYW5kd2lkdGhcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp0aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4LHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0mJmFyZ3VtZW50c1sxXTtyZXR1cm4gTGUuaXNGdW5jdGlvbihlKSYmKHQ9ZSxlPXRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgpLHQ/dGhpcy50cm9uV2ViLmlzQWRkcmVzcyhlKT8oZT10aGlzLnRyb25XZWIuYWRkcmVzcy50b0hleChlKSx2b2lkIHRoaXMudHJvbldlYi5mdWxsTm9kZS5yZXF1ZXN0KFwid2FsbGV0L2dldGFjY291bnRuZXRcIix7YWRkcmVzczplfSxcInBvc3RcIikudGhlbihmdW5jdGlvbihlKXt2YXIgbj1lLmZyZWVOZXRVc2VkLHI9dm9pZCAwPT09bj8wOm4saT1lLmZyZWVOZXRMaW1pdCxzPXZvaWQgMD09PWk/MDppLG89ZS5OZXRVc2VkLGE9dm9pZCAwPT09bz8wOm8sdT1lLk5ldExpbWl0O3QobnVsbCxzLXIrKCh2b2lkIDA9PT11PzA6dSktYSkpfSkuY2F0Y2goZnVuY3Rpb24oZSl7cmV0dXJuIHQoZSl9KSk6dChcIkludmFsaWQgYWRkcmVzcyBwcm92aWRlZFwiKTp0aGlzLmluamVjdFByb21pc2UodGhpcy5nZXRCYW5kd2lkdGgsZSl9fSx7a2V5OlwiZ2V0VG9rZW5zSXNzdWVkQnlBZGRyZXNzXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXgsbj1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXSYmYXJndW1lbnRzWzFdO3JldHVybiBMZS5pc0Z1bmN0aW9uKHQpJiYobj10LHQ9dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleCksbj90aGlzLnRyb25XZWIuaXNBZGRyZXNzKHQpPyh0PXRoaXMudHJvbldlYi5hZGRyZXNzLnRvSGV4KHQpLHZvaWQgdGhpcy50cm9uV2ViLmZ1bGxOb2RlLnJlcXVlc3QoXCJ3YWxsZXQvZ2V0YXNzZXRpc3N1ZWJ5YWNjb3VudFwiLHthZGRyZXNzOnR9LFwicG9zdFwiKS50aGVuKGZ1bmN0aW9uKHQpe3ZhciByPXQuYXNzZXRJc3N1ZSxpPXZvaWQgMCE9PXImJnI7aWYoIWkpcmV0dXJuIG4obnVsbCx7fSk7dmFyIHM9aS5tYXAoZnVuY3Rpb24odCl7cmV0dXJuIGUuX3BhcnNlVG9rZW4odCl9KS5yZWR1Y2UoZnVuY3Rpb24oZSx0KXtyZXR1cm4gZVt0Lm5hbWVdPXQsZX0se30pO24obnVsbCxzKX0pLmNhdGNoKGZ1bmN0aW9uKGUpe3JldHVybiBuKGUpfSkpOm4oXCJJbnZhbGlkIGFkZHJlc3MgcHJvdmlkZWRcIik6dGhpcy5pbmplY3RQcm9taXNlKHRoaXMuZ2V0VG9rZW5zSXNzdWVkQnlBZGRyZXNzLHQpfX0se2tleTpcImdldFRva2VuRnJvbUlEXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXSxuPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdJiZhcmd1bWVudHNbMV07cmV0dXJuIG4/KExlLmlzSW50ZWdlcih0KSYmKHQ9dC50b1N0cmluZygpKSxMZS5pc1N0cmluZyh0KSYmdC5sZW5ndGg/dm9pZCB0aGlzLnRyb25XZWIuZnVsbE5vZGUucmVxdWVzdChcIndhbGxldC9nZXRhc3NldGlzc3VlYnluYW1lXCIse3ZhbHVlOnRoaXMudHJvbldlYi5mcm9tVXRmOCh0KX0sXCJwb3N0XCIpLnRoZW4oZnVuY3Rpb24odCl7aWYoIXQubmFtZSlyZXR1cm4gbihcIlRva2VuIGRvZXMgbm90IGV4aXN0XCIpO24obnVsbCxlLl9wYXJzZVRva2VuKHQpKX0pLmNhdGNoKGZ1bmN0aW9uKGUpe3JldHVybiBuKGUpfSk6bihcIkludmFsaWQgdG9rZW4gSUQgcHJvdmlkZWRcIikpOnRoaXMuaW5qZWN0UHJvbWlzZSh0aGlzLmdldFRva2VuRnJvbUlELHQpfX0se2tleTpcImxpc3ROb2Rlc1wiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdJiZhcmd1bWVudHNbMF07aWYoIXQpcmV0dXJuIHRoaXMuaW5qZWN0UHJvbWlzZSh0aGlzLmxpc3ROb2Rlcyk7dGhpcy50cm9uV2ViLmZ1bGxOb2RlLnJlcXVlc3QoXCJ3YWxsZXQvbGlzdG5vZGVzXCIpLnRoZW4oZnVuY3Rpb24obil7dmFyIHI9bi5ub2Rlczt0KG51bGwsKHZvaWQgMD09PXI/W106cikubWFwKGZ1bmN0aW9uKHQpe3ZhciBuPXQuYWRkcmVzcyxyPW4uaG9zdCxpPW4ucG9ydDtyZXR1cm5cIlwiLmNvbmNhdChlLnRyb25XZWIudG9VdGY4KHIpLFwiOlwiKS5jb25jYXQoaSl9KSl9KS5jYXRjaChmdW5jdGlvbihlKXtyZXR1cm4gdChlKX0pfX0se2tleTpcImdldEJsb2NrUmFuZ2VcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTowLHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOjMwLG49YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0mJmFyZ3VtZW50c1syXTtyZXR1cm4gTGUuaXNGdW5jdGlvbih0KSYmKG49dCx0PTMwKSxMZS5pc0Z1bmN0aW9uKGUpJiYobj1lLGU9MCksbj8hTGUuaXNJbnRlZ2VyKGUpfHxlPDA/bihcIkludmFsaWQgc3RhcnQgb2YgcmFuZ2UgcHJvdmlkZWRcIik6IUxlLmlzSW50ZWdlcih0KXx8dDw9ZT9uKFwiSW52YWxpZCBlbmQgb2YgcmFuZ2UgcHJvdmlkZWRcIik6dm9pZCB0aGlzLnRyb25XZWIuZnVsbE5vZGUucmVxdWVzdChcIndhbGxldC9nZXRibG9ja2J5bGltaXRuZXh0XCIse3N0YXJ0TnVtOnBhcnNlSW50KGUpLGVuZE51bTpwYXJzZUludCh0KSsxfSxcInBvc3RcIikudGhlbihmdW5jdGlvbihlKXt2YXIgdD1lLmJsb2NrO24obnVsbCx2b2lkIDA9PT10P1tdOnQpfSkuY2F0Y2goZnVuY3Rpb24oZSl7cmV0dXJuIG4oZSl9KTp0aGlzLmluamVjdFByb21pc2UodGhpcy5nZXRCbG9ja1JhbmdlLGUsdCl9fSx7a2V5OlwibGlzdFN1cGVyUmVwcmVzZW50YXRpdmVzXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdO2lmKCFlKXJldHVybiB0aGlzLmluamVjdFByb21pc2UodGhpcy5saXN0U3VwZXJSZXByZXNlbnRhdGl2ZXMpO3RoaXMudHJvbldlYi5mdWxsTm9kZS5yZXF1ZXN0KFwid2FsbGV0L2xpc3R3aXRuZXNzZXNcIikudGhlbihmdW5jdGlvbih0KXt2YXIgbj10LndpdG5lc3NlcztlKG51bGwsdm9pZCAwPT09bj9bXTpuKX0pLmNhdGNoKGZ1bmN0aW9uKHQpe3JldHVybiBlKHQpfSl9fSx7a2V5OlwibGlzdFRva2Vuc1wiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTowLG49YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOjAscj1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXSYmYXJndW1lbnRzWzJdO3JldHVybiBMZS5pc0Z1bmN0aW9uKG4pJiYocj1uLG49MCksTGUuaXNGdW5jdGlvbih0KSYmKHI9dCx0PTApLHI/IUxlLmlzSW50ZWdlcih0KXx8dDwwfHxuJiZ0PDE/cihcIkludmFsaWQgbGltaXQgcHJvdmlkZWRcIik6IUxlLmlzSW50ZWdlcihuKXx8bjwwP3IoXCJJbnZhbGlkIG9mZnNldCBwcm92aWRlZFwiKTp0P3ZvaWQgdGhpcy50cm9uV2ViLmZ1bGxOb2RlLnJlcXVlc3QoXCJ3YWxsZXQvZ2V0cGFnaW5hdGVkYXNzZXRpc3N1ZWxpc3RcIix7b2Zmc2V0OnBhcnNlSW50KG4pLGxpbWl0OnBhcnNlSW50KHQpfSxcInBvc3RcIikudGhlbihmdW5jdGlvbih0KXt2YXIgbj10LmFzc2V0SXNzdWU7cihudWxsLCh2b2lkIDA9PT1uP1tdOm4pLm1hcChmdW5jdGlvbih0KXtyZXR1cm4gZS5fcGFyc2VUb2tlbih0KX0pKX0pLmNhdGNoKGZ1bmN0aW9uKGUpe3JldHVybiByKGUpfSk6dGhpcy50cm9uV2ViLmZ1bGxOb2RlLnJlcXVlc3QoXCJ3YWxsZXQvZ2V0YXNzZXRpc3N1ZWxpc3RcIikudGhlbihmdW5jdGlvbih0KXt2YXIgbj10LmFzc2V0SXNzdWU7cihudWxsLCh2b2lkIDA9PT1uP1tdOm4pLm1hcChmdW5jdGlvbih0KXtyZXR1cm4gZS5fcGFyc2VUb2tlbih0KX0pKX0pLmNhdGNoKGZ1bmN0aW9uKGUpe3JldHVybiByKGUpfSk6dGhpcy5pbmplY3RQcm9taXNlKHRoaXMubGlzdFRva2Vucyx0LG4pfX0se2tleTpcInRpbWVVbnRpbE5leHRWb3RlQ3ljbGVcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdJiZhcmd1bWVudHNbMF07aWYoIWUpcmV0dXJuIHRoaXMuaW5qZWN0UHJvbWlzZSh0aGlzLnRpbWVVbnRpbE5leHRWb3RlQ3ljbGUpO3RoaXMudHJvbldlYi5mdWxsTm9kZS5yZXF1ZXN0KFwid2FsbGV0L2dldG5leHRtYWludGVuYW5jZXRpbWVcIikudGhlbihmdW5jdGlvbih0KXt2YXIgbj10Lm51bSxyPXZvaWQgMD09PW4/LTE6bjtpZigtMT09cilyZXR1cm4gZShcIkZhaWxlZCB0byBnZXQgdGltZSB1bnRpbCBuZXh0IHZvdGUgY3ljbGVcIik7ZShudWxsLE1hdGguZmxvb3Ioci8xZTMpKX0pLmNhdGNoKGZ1bmN0aW9uKHQpe3JldHVybiBlKHQpfSl9fSx7a2V5OlwiZ2V0Q29udHJhY3RcIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgdD10aGlzLG49YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0mJmFyZ3VtZW50c1sxXTtyZXR1cm4gbj90aGlzLnRyb25XZWIuaXNBZGRyZXNzKGUpP3ZvaWQodGhpcy5jYWNoZS5jb250cmFjdHNbZV0/bihudWxsLHRoaXMuY2FjaGUuY29udHJhY3RzW2VdKTooZT10aGlzLnRyb25XZWIuYWRkcmVzcy50b0hleChlKSx0aGlzLnRyb25XZWIuZnVsbE5vZGUucmVxdWVzdChcIndhbGxldC9nZXRjb250cmFjdFwiLHt2YWx1ZTplfSkudGhlbihmdW5jdGlvbihyKXtpZihyLkVycm9yKXJldHVybiBuKFwiQ29udHJhY3QgZG9lcyBub3QgZXhpc3RcIik7dC5jYWNoZS5jb250cmFjdHNbZV09cixuKG51bGwscil9KS5jYXRjaChmdW5jdGlvbihlKXtyZXR1cm4gbihlKX0pKSk6bihcIkludmFsaWQgY29udHJhY3QgYWRkcmVzcyBwcm92aWRlZFwiKTp0aGlzLmluamVjdFByb21pc2UodGhpcy5nZXRDb250cmFjdCxlKX19LHtrZXk6XCJ2ZXJpZnlNZXNzYWdlXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgdD1oKCkoZC5hLm1hcmsoZnVuY3Rpb24gdCgpe3ZhciBuLHIsaSxzLG8sYT1hcmd1bWVudHM7cmV0dXJuIGQuYS53cmFwKGZ1bmN0aW9uKHQpe2Zvcig7Oylzd2l0Y2godC5wcmV2PXQubmV4dCl7Y2FzZSAwOmlmKG49YS5sZW5ndGg+MCYmdm9pZCAwIT09YVswXSYmYVswXSxyPWEubGVuZ3RoPjEmJnZvaWQgMCE9PWFbMV0mJmFbMV0saT1hLmxlbmd0aD4yJiZ2b2lkIDAhPT1hWzJdP2FbMl06dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmJhc2U1OCxzPSEoYS5sZW5ndGg+MyYmdm9pZCAwIT09YVszXSl8fGFbM10sbz1hLmxlbmd0aD40JiZ2b2lkIDAhPT1hWzRdJiZhWzRdLExlLmlzRnVuY3Rpb24oaSkmJihvPWksaT10aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuYmFzZTU4LHM9ITApLExlLmlzRnVuY3Rpb24ocykmJihvPXMscz0hMCksbyl7dC5uZXh0PTk7YnJlYWt9cmV0dXJuIHQuYWJydXB0KFwicmV0dXJuXCIsdGhpcy5pbmplY3RQcm9taXNlKHRoaXMudmVyaWZ5TWVzc2FnZSxuLHIsaSxzKSk7Y2FzZSA5OmlmKExlLmlzSGV4KG4pKXt0Lm5leHQ9MTE7YnJlYWt9cmV0dXJuIHQuYWJydXB0KFwicmV0dXJuXCIsbyhcIkV4cGVjdGVkIGhleCBtZXNzYWdlIGlucHV0XCIpKTtjYXNlIDExOmlmKCFlLnZlcmlmeVNpZ25hdHVyZShuLGkscixzKSl7dC5uZXh0PTEzO2JyZWFrfXJldHVybiB0LmFicnVwdChcInJldHVyblwiLG8obnVsbCwhMCkpO2Nhc2UgMTM6byhcIlNpZ25hdHVyZSBkb2VzIG5vdCBtYXRjaFwiKTtjYXNlIDE0OmNhc2VcImVuZFwiOnJldHVybiB0LnN0b3AoKX19LHQsdGhpcyl9KSk7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHQuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0oKX0se2tleTpcInNpZ25cIix2YWx1ZTpmdW5jdGlvbigpe3ZhciB0PWgoKShkLmEubWFyayhmdW5jdGlvbiB0KCl7dmFyIG4scixpLHMsbyxhLHU9YXJndW1lbnRzO3JldHVybiBkLmEud3JhcChmdW5jdGlvbih0KXtmb3IoOzspc3dpdGNoKHQucHJldj10Lm5leHQpe2Nhc2UgMDppZihuPXUubGVuZ3RoPjAmJnZvaWQgMCE9PXVbMF0mJnVbMF0scj11Lmxlbmd0aD4xJiZ2b2lkIDAhPT11WzFdP3VbMV06dGhpcy50cm9uV2ViLmRlZmF1bHRQcml2YXRlS2V5LGk9ISh1Lmxlbmd0aD4yJiZ2b2lkIDAhPT11WzJdKXx8dVsyXSxzPXUubGVuZ3RoPjMmJnZvaWQgMCE9PXVbM10mJnVbM10sbz11Lmxlbmd0aD40JiZ2b2lkIDAhPT11WzRdJiZ1WzRdLExlLmlzRnVuY3Rpb24ocykmJihvPXMscz0hMSksTGUuaXNGdW5jdGlvbihpKSYmKG89aSxpPSEwLHM9ITEpLExlLmlzRnVuY3Rpb24ocikmJihvPXIscj10aGlzLnRyb25XZWIuZGVmYXVsdFByaXZhdGVLZXksaT0hMCxzPSExKSxvKXt0Lm5leHQ9MTA7YnJlYWt9cmV0dXJuIHQuYWJydXB0KFwicmV0dXJuXCIsdGhpcy5pbmplY3RQcm9taXNlKHRoaXMuc2lnbixuLHIsaSxzKSk7Y2FzZSAxMDppZighTGUuaXNTdHJpbmcobikpe3QubmV4dD0yMTticmVha31pZihMZS5pc0hleChuKSl7dC5uZXh0PTEzO2JyZWFrfXJldHVybiB0LmFicnVwdChcInJldHVyblwiLG8oXCJFeHBlY3RlZCBoZXggbWVzc2FnZSBpbnB1dFwiKSk7Y2FzZSAxMzpyZXR1cm4gdC5wcmV2PTEzLGE9ZS5zaWduU3RyaW5nKG4scixpKSx0LmFicnVwdChcInJldHVyblwiLG8obnVsbCxhKSk7Y2FzZSAxODp0LnByZXY9MTgsdC50MD10LmNhdGNoKDEzKSxvKHQudDApO2Nhc2UgMjE6aWYoTGUuaXNPYmplY3Qobikpe3QubmV4dD0yMzticmVha31yZXR1cm4gdC5hYnJ1cHQoXCJyZXR1cm5cIixvKFwiSW52YWxpZCB0cmFuc2FjdGlvbiBwcm92aWRlZFwiKSk7Y2FzZSAyMzppZihzfHwhbi5zaWduYXR1cmUpe3QubmV4dD0yNTticmVha31yZXR1cm4gdC5hYnJ1cHQoXCJyZXR1cm5cIixvKFwiVHJhbnNhY3Rpb24gaXMgYWxyZWFkeSBzaWduZWRcIikpO2Nhc2UgMjU6aWYodC5wcmV2PTI1LHMpe3QubmV4dD0zMDticmVha31pZih0aGlzLnRyb25XZWIuYWRkcmVzcy50b0hleCh0aGlzLnRyb25XZWIuYWRkcmVzcy5mcm9tUHJpdmF0ZUtleShyKSkudG9Mb3dlckNhc2UoKT09PW4ucmF3X2RhdGEuY29udHJhY3RbMF0ucGFyYW1ldGVyLnZhbHVlLm93bmVyX2FkZHJlc3MudG9Mb3dlckNhc2UoKSl7dC5uZXh0PTMwO2JyZWFrfXJldHVybiB0LmFicnVwdChcInJldHVyblwiLG8oXCJQcml2YXRlIGtleSBkb2VzIG5vdCBtYXRjaCBhZGRyZXNzIGluIHRyYW5zYWN0aW9uXCIpKTtjYXNlIDMwOnJldHVybiB0LmFicnVwdChcInJldHVyblwiLG8obnVsbCxMZS5jcnlwdG8uc2lnblRyYW5zYWN0aW9uKHIsbikpKTtjYXNlIDMzOnQucHJldj0zMyx0LnQxPXQuY2F0Y2goMjUpLG8odC50MSk7Y2FzZSAzNjpjYXNlXCJlbmRcIjpyZXR1cm4gdC5zdG9wKCl9fSx0LHRoaXMsW1sxMywxOF0sWzI1LDMzXV0pfSkpO3JldHVybiBmdW5jdGlvbigpe3JldHVybiB0LmFwcGx5KHRoaXMsYXJndW1lbnRzKX19KCl9LHtrZXk6XCJtdWx0aVNpZ25cIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWgoKShkLmEubWFyayhmdW5jdGlvbiBlKCl7dmFyIHQsbixyLGkscyxvLGEsdT1hcmd1bWVudHM7cmV0dXJuIGQuYS53cmFwKGZ1bmN0aW9uKGUpe2Zvcig7Oylzd2l0Y2goZS5wcmV2PWUubmV4dCl7Y2FzZSAwOmlmKHQ9dS5sZW5ndGg+MCYmdm9pZCAwIT09dVswXSYmdVswXSxuPXUubGVuZ3RoPjEmJnZvaWQgMCE9PXVbMV0/dVsxXTp0aGlzLnRyb25XZWIuZGVmYXVsdFByaXZhdGVLZXkscj11Lmxlbmd0aD4yJiZ2b2lkIDAhPT11WzJdJiZ1WzJdLGk9dS5sZW5ndGg+MyYmdm9pZCAwIT09dVszXSYmdVszXSxMZS5pc0Z1bmN0aW9uKHIpJiYoaT1yLHI9MCksTGUuaXNGdW5jdGlvbihuKSYmKGk9bixuPXRoaXMudHJvbldlYi5kZWZhdWx0UHJpdmF0ZUtleSxyPTApLGkpe2UubmV4dD04O2JyZWFrfXJldHVybiBlLmFicnVwdChcInJldHVyblwiLHRoaXMuaW5qZWN0UHJvbWlzZSh0aGlzLm11bHRpU2lnbix0LG4scikpO2Nhc2UgODppZihMZS5pc09iamVjdCh0KSYmdC5yYXdfZGF0YSYmdC5yYXdfZGF0YS5jb250cmFjdCl7ZS5uZXh0PTEwO2JyZWFrfXJldHVybiBlLmFicnVwdChcInJldHVyblwiLGkoXCJJbnZhbGlkIHRyYW5zYWN0aW9uIHByb3ZpZGVkXCIpKTtjYXNlIDEwOmlmKHQucmF3X2RhdGEuY29udHJhY3RbMF0uUGVybWlzc2lvbl9pZHx8IShyPjApKXtlLm5leHQ9MzA7YnJlYWt9cmV0dXJuIHQucmF3X2RhdGEuY29udHJhY3RbMF0uUGVybWlzc2lvbl9pZD1yLHM9dGhpcy50cm9uV2ViLmFkZHJlc3MudG9IZXgodGhpcy50cm9uV2ViLmFkZHJlc3MuZnJvbVByaXZhdGVLZXkobikpLnRvTG93ZXJDYXNlKCksZS5uZXh0PTE1LHRoaXMuZ2V0U2lnbldlaWdodCh0LHIpO2Nhc2UgMTU6aWYoXCJQRVJNSVNTSU9OX0VSUk9SXCIhPT0obz1lLnNlbnQpLnJlc3VsdC5jb2RlKXtlLm5leHQ9MTg7YnJlYWt9cmV0dXJuIGUuYWJydXB0KFwicmV0dXJuXCIsaShvLnJlc3VsdC5tZXNzYWdlKSk7Y2FzZSAxODppZihhPSExLG8ucGVybWlzc2lvbi5rZXlzLm1hcChmdW5jdGlvbihlKXtlLmFkZHJlc3M9PT1zJiYoYT0hMCl9KSxhKXtlLm5leHQ9MjI7YnJlYWt9cmV0dXJuIGUuYWJydXB0KFwicmV0dXJuXCIsaShuK1wiIGhhcyBubyBwZXJtaXNzaW9uIHRvIHNpZ25cIikpO2Nhc2UgMjI6aWYoIW8uYXBwcm92ZWRfbGlzdHx8LTE9PW8uYXBwcm92ZWRfbGlzdC5pbmRleE9mKHMpKXtlLm5leHQ9MjQ7YnJlYWt9cmV0dXJuIGUuYWJydXB0KFwicmV0dXJuXCIsaShuK1wiIGFscmVhZHkgc2lnbiB0cmFuc2FjdGlvblwiKSk7Y2FzZSAyNDppZighby50cmFuc2FjdGlvbnx8IW8udHJhbnNhY3Rpb24udHJhbnNhY3Rpb24pe2UubmV4dD0yOTticmVha310PW8udHJhbnNhY3Rpb24udHJhbnNhY3Rpb24scj4wJiYodC5yYXdfZGF0YS5jb250cmFjdFswXS5QZXJtaXNzaW9uX2lkPXIpLGUubmV4dD0zMDticmVhaztjYXNlIDI5OnJldHVybiBlLmFicnVwdChcInJldHVyblwiLGkoXCJJbnZhbGlkIHRyYW5zYWN0aW9uIHByb3ZpZGVkXCIpKTtjYXNlIDMwOnJldHVybiBlLnByZXY9MzAsZS5hYnJ1cHQoXCJyZXR1cm5cIixpKG51bGwsTGUuY3J5cHRvLnNpZ25UcmFuc2FjdGlvbihuLHQpKSk7Y2FzZSAzNDplLnByZXY9MzQsZS50MD1lLmNhdGNoKDMwKSxpKGUudDApO2Nhc2UgMzc6Y2FzZVwiZW5kXCI6cmV0dXJuIGUuc3RvcCgpfX0sZSx0aGlzLFtbMzAsMzRdXSl9KSk7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGUuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0oKX0se2tleTpcImdldEFwcHJvdmVkTGlzdFwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9aCgpKGQuYS5tYXJrKGZ1bmN0aW9uIGUodCl7dmFyIG4scj1hcmd1bWVudHM7cmV0dXJuIGQuYS53cmFwKGZ1bmN0aW9uKGUpe2Zvcig7Oylzd2l0Y2goZS5wcmV2PWUubmV4dCl7Y2FzZSAwOmlmKG49ci5sZW5ndGg+MSYmdm9pZCAwIT09clsxXSYmclsxXSl7ZS5uZXh0PTM7YnJlYWt9cmV0dXJuIGUuYWJydXB0KFwicmV0dXJuXCIsdGhpcy5pbmplY3RQcm9taXNlKHRoaXMuZ2V0QXBwcm92ZWRMaXN0LHQpKTtjYXNlIDM6aWYoTGUuaXNPYmplY3QodCkpe2UubmV4dD01O2JyZWFrfXJldHVybiBlLmFicnVwdChcInJldHVyblwiLG4oXCJJbnZhbGlkIHRyYW5zYWN0aW9uIHByb3ZpZGVkXCIpKTtjYXNlIDU6dGhpcy50cm9uV2ViLmZ1bGxOb2RlLnJlcXVlc3QoXCJ3YWxsZXQvZ2V0YXBwcm92ZWRsaXN0XCIsdCxcInBvc3RcIikudGhlbihmdW5jdGlvbihlKXtuKG51bGwsZSl9KS5jYXRjaChmdW5jdGlvbihlKXtyZXR1cm4gbihlKX0pO2Nhc2UgNjpjYXNlXCJlbmRcIjpyZXR1cm4gZS5zdG9wKCl9fSxlLHRoaXMpfSkpO3JldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gZS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSgpfSx7a2V5OlwiZ2V0U2lnbldlaWdodFwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9aCgpKGQuYS5tYXJrKGZ1bmN0aW9uIGUodCxuKXt2YXIgcixpPWFyZ3VtZW50cztyZXR1cm4gZC5hLndyYXAoZnVuY3Rpb24oZSl7Zm9yKDs7KXN3aXRjaChlLnByZXY9ZS5uZXh0KXtjYXNlIDA6aWYocj1pLmxlbmd0aD4yJiZ2b2lkIDAhPT1pWzJdJiZpWzJdLExlLmlzRnVuY3Rpb24obikmJihyPW4sbj12b2lkIDApLHIpe2UubmV4dD00O2JyZWFrfXJldHVybiBlLmFicnVwdChcInJldHVyblwiLHRoaXMuaW5qZWN0UHJvbWlzZSh0aGlzLmdldFNpZ25XZWlnaHQsdCxuKSk7Y2FzZSA0OmlmKExlLmlzT2JqZWN0KHQpJiZ0LnJhd19kYXRhJiZ0LnJhd19kYXRhLmNvbnRyYWN0KXtlLm5leHQ9NjticmVha31yZXR1cm4gZS5hYnJ1cHQoXCJyZXR1cm5cIixyKFwiSW52YWxpZCB0cmFuc2FjdGlvbiBwcm92aWRlZFwiKSk7Y2FzZSA2OmlmKExlLmlzSW50ZWdlcihuKT90LnJhd19kYXRhLmNvbnRyYWN0WzBdLlBlcm1pc3Npb25faWQ9cGFyc2VJbnQobik6XCJudW1iZXJcIiE9dHlwZW9mIHQucmF3X2RhdGEuY29udHJhY3RbMF0uUGVybWlzc2lvbl9pZCYmKHQucmF3X2RhdGEuY29udHJhY3RbMF0uUGVybWlzc2lvbl9pZD0wKSxMZS5pc09iamVjdCh0KSl7ZS5uZXh0PTk7YnJlYWt9cmV0dXJuIGUuYWJydXB0KFwicmV0dXJuXCIscihcIkludmFsaWQgdHJhbnNhY3Rpb24gcHJvdmlkZWRcIikpO2Nhc2UgOTp0aGlzLnRyb25XZWIuZnVsbE5vZGUucmVxdWVzdChcIndhbGxldC9nZXRzaWdud2VpZ2h0XCIsdCxcInBvc3RcIikudGhlbihmdW5jdGlvbihlKXtyKG51bGwsZSl9KS5jYXRjaChmdW5jdGlvbihlKXtyZXR1cm4gcihlKX0pO2Nhc2UgMTA6Y2FzZVwiZW5kXCI6cmV0dXJuIGUuc3RvcCgpfX0sZSx0aGlzKX0pKTtyZXR1cm4gZnVuY3Rpb24odCxuKXtyZXR1cm4gZS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSgpfSx7a2V5Olwic2VuZFJhd1RyYW5zYWN0aW9uXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdLHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOnt9LG49YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0mJmFyZ3VtZW50c1syXTtyZXR1cm4gTGUuaXNGdW5jdGlvbih0KSYmKG49dCx0PXt9KSxuP0xlLmlzT2JqZWN0KGUpP0xlLmlzT2JqZWN0KHQpP2Uuc2lnbmF0dXJlJiZMZS5pc0FycmF5KGUuc2lnbmF0dXJlKT92b2lkIHRoaXMudHJvbldlYi5mdWxsTm9kZS5yZXF1ZXN0KFwid2FsbGV0L2Jyb2FkY2FzdHRyYW5zYWN0aW9uXCIsZSxcInBvc3RcIikudGhlbihmdW5jdGlvbih0KXt0LnJlc3VsdCYmKHQudHJhbnNhY3Rpb249ZSksbihudWxsLHQpfSkuY2F0Y2goZnVuY3Rpb24oZSl7cmV0dXJuIG4oZSl9KTpuKFwiVHJhbnNhY3Rpb24gaXMgbm90IHNpZ25lZFwiKTpuKFwiSW52YWxpZCBvcHRpb25zIHByb3ZpZGVkXCIpOm4oXCJJbnZhbGlkIHRyYW5zYWN0aW9uIHByb3ZpZGVkXCIpOnRoaXMuaW5qZWN0UHJvbWlzZSh0aGlzLnNlbmRSYXdUcmFuc2FjdGlvbixlLHQpfX0se2tleTpcInNlbmRUcmFuc2FjdGlvblwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9aCgpKGQuYS5tYXJrKGZ1bmN0aW9uIGUoKXt2YXIgdCxuLHIsaSxzLG8sYSx1LGM9YXJndW1lbnRzO3JldHVybiBkLmEud3JhcChmdW5jdGlvbihlKXtmb3IoOzspc3dpdGNoKGUucHJldj1lLm5leHQpe2Nhc2UgMDppZih0PWMubGVuZ3RoPjAmJnZvaWQgMCE9PWNbMF0mJmNbMF0sbj1jLmxlbmd0aD4xJiZ2b2lkIDAhPT1jWzFdJiZjWzFdLHI9Yy5sZW5ndGg+MiYmdm9pZCAwIT09Y1syXT9jWzJdOnt9LGk9Yy5sZW5ndGg+MyYmdm9pZCAwIT09Y1szXSYmY1szXSxMZS5pc0Z1bmN0aW9uKHIpJiYoaT1yLHI9e30pLFwic3RyaW5nXCI9PXR5cGVvZiByJiYocj17cHJpdmF0ZUtleTpyfSksaSl7ZS5uZXh0PTg7YnJlYWt9cmV0dXJuIGUuYWJydXB0KFwicmV0dXJuXCIsdGhpcy5pbmplY3RQcm9taXNlKHRoaXMuc2VuZFRyYW5zYWN0aW9uLHQsbixyKSk7Y2FzZSA4OmlmKHRoaXMudHJvbldlYi5pc0FkZHJlc3ModCkpe2UubmV4dD0xMDticmVha31yZXR1cm4gZS5hYnJ1cHQoXCJyZXR1cm5cIixpKFwiSW52YWxpZCByZWNpcGllbnQgcHJvdmlkZWRcIikpO2Nhc2UgMTA6aWYoTGUuaXNJbnRlZ2VyKG4pJiYhKG48PTApKXtlLm5leHQ9MTI7YnJlYWt9cmV0dXJuIGUuYWJydXB0KFwicmV0dXJuXCIsaShcIkludmFsaWQgYW1vdW50IHByb3ZpZGVkXCIpKTtjYXNlIDEyOmlmKChyPUIoKSh7cHJpdmF0ZUtleTp0aGlzLnRyb25XZWIuZGVmYXVsdFByaXZhdGVLZXksYWRkcmVzczp0aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4fSxyKSkucHJpdmF0ZUtleXx8ci5hZGRyZXNzKXtlLm5leHQ9MTU7YnJlYWt9cmV0dXJuIGUuYWJydXB0KFwicmV0dXJuXCIsaShcIkZ1bmN0aW9uIHJlcXVpcmVzIGVpdGhlciBhIHByaXZhdGUga2V5IG9yIGFkZHJlc3MgdG8gYmUgc2V0XCIpKTtjYXNlIDE1OnJldHVybiBlLnByZXY9MTUscz1yLnByaXZhdGVLZXk/dGhpcy50cm9uV2ViLmFkZHJlc3MuZnJvbVByaXZhdGVLZXkoci5wcml2YXRlS2V5KTpyLmFkZHJlc3MsZS5uZXh0PTE5LHRoaXMudHJvbldlYi50cmFuc2FjdGlvbkJ1aWxkZXIuc2VuZFRyeCh0LG4scyk7Y2FzZSAxOTpyZXR1cm4gbz1lLnNlbnQsZS5uZXh0PTIyLHRoaXMuc2lnbihvLHIucHJpdmF0ZUtleXx8dm9pZCAwKTtjYXNlIDIyOnJldHVybiBhPWUuc2VudCxlLm5leHQ9MjUsdGhpcy5zZW5kUmF3VHJhbnNhY3Rpb24oYSk7Y2FzZSAyNTpyZXR1cm4gdT1lLnNlbnQsZS5hYnJ1cHQoXCJyZXR1cm5cIixpKG51bGwsdSkpO2Nhc2UgMjk6cmV0dXJuIGUucHJldj0yOSxlLnQwPWUuY2F0Y2goMTUpLGUuYWJydXB0KFwicmV0dXJuXCIsaShlLnQwKSk7Y2FzZSAzMjpjYXNlXCJlbmRcIjpyZXR1cm4gZS5zdG9wKCl9fSxlLHRoaXMsW1sxNSwyOV1dKX0pKTtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gZS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSgpfSx7a2V5Olwic2VuZFRva2VuXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1oKCkoZC5hLm1hcmsoZnVuY3Rpb24gZSgpe3ZhciB0LG4scixpLHMsbyxhLHUsYyxsPWFyZ3VtZW50cztyZXR1cm4gZC5hLndyYXAoZnVuY3Rpb24oZSl7Zm9yKDs7KXN3aXRjaChlLnByZXY9ZS5uZXh0KXtjYXNlIDA6aWYodD1sLmxlbmd0aD4wJiZ2b2lkIDAhPT1sWzBdJiZsWzBdLG49bC5sZW5ndGg+MSYmdm9pZCAwIT09bFsxXSYmbFsxXSxyPWwubGVuZ3RoPjImJnZvaWQgMCE9PWxbMl0mJmxbMl0saT1sLmxlbmd0aD4zJiZ2b2lkIDAhPT1sWzNdP2xbM106e30scz1sLmxlbmd0aD40JiZ2b2lkIDAhPT1sWzRdJiZsWzRdLExlLmlzRnVuY3Rpb24oaSkmJihzPWksaT17fSksXCJzdHJpbmdcIj09dHlwZW9mIGkmJihpPXtwcml2YXRlS2V5Oml9KSxzKXtlLm5leHQ9OTticmVha31yZXR1cm4gZS5hYnJ1cHQoXCJyZXR1cm5cIix0aGlzLmluamVjdFByb21pc2UodGhpcy5zZW5kVG9rZW4sdCxuLHIsaSkpO2Nhc2UgOTppZih0aGlzLnRyb25XZWIuaXNBZGRyZXNzKHQpKXtlLm5leHQ9MTE7YnJlYWt9cmV0dXJuIGUuYWJydXB0KFwicmV0dXJuXCIscyhcIkludmFsaWQgcmVjaXBpZW50IHByb3ZpZGVkXCIpKTtjYXNlIDExOmlmKExlLmlzSW50ZWdlcihuKSYmIShuPD0wKSl7ZS5uZXh0PTEzO2JyZWFrfXJldHVybiBlLmFicnVwdChcInJldHVyblwiLHMoXCJJbnZhbGlkIGFtb3VudCBwcm92aWRlZFwiKSk7Y2FzZSAxMzppZihMZS5pc0ludGVnZXIocikmJihyPXIudG9TdHJpbmcoKSksTGUuaXNTdHJpbmcocikpe2UubmV4dD0xNjticmVha31yZXR1cm4gZS5hYnJ1cHQoXCJyZXR1cm5cIixzKFwiSW52YWxpZCB0b2tlbiBJRCBwcm92aWRlZFwiKSk7Y2FzZSAxNjppZigoaT1CKCkoe3ByaXZhdGVLZXk6dGhpcy50cm9uV2ViLmRlZmF1bHRQcml2YXRlS2V5LGFkZHJlc3M6dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleH0saSkpLnByaXZhdGVLZXl8fGkuYWRkcmVzcyl7ZS5uZXh0PTE5O2JyZWFrfXJldHVybiBlLmFicnVwdChcInJldHVyblwiLHMoXCJGdW5jdGlvbiByZXF1aXJlcyBlaXRoZXIgYSBwcml2YXRlIGtleSBvciBhZGRyZXNzIHRvIGJlIHNldFwiKSk7Y2FzZSAxOTpyZXR1cm4gZS5wcmV2PTE5LG89aS5wcml2YXRlS2V5P3RoaXMudHJvbldlYi5hZGRyZXNzLmZyb21Qcml2YXRlS2V5KGkucHJpdmF0ZUtleSk6aS5hZGRyZXNzLGUubmV4dD0yMyx0aGlzLnRyb25XZWIudHJhbnNhY3Rpb25CdWlsZGVyLnNlbmRUb2tlbih0LG4scixvKTtjYXNlIDIzOnJldHVybiBhPWUuc2VudCxlLm5leHQ9MjYsdGhpcy5zaWduKGEsaS5wcml2YXRlS2V5fHx2b2lkIDApO2Nhc2UgMjY6cmV0dXJuIHU9ZS5zZW50LGUubmV4dD0yOSx0aGlzLnNlbmRSYXdUcmFuc2FjdGlvbih1KTtjYXNlIDI5OnJldHVybiBjPWUuc2VudCxlLmFicnVwdChcInJldHVyblwiLHMobnVsbCxjKSk7Y2FzZSAzMzpyZXR1cm4gZS5wcmV2PTMzLGUudDA9ZS5jYXRjaCgxOSksZS5hYnJ1cHQoXCJyZXR1cm5cIixzKGUudDApKTtjYXNlIDM2OmNhc2VcImVuZFwiOnJldHVybiBlLnN0b3AoKX19LGUsdGhpcyxbWzE5LDMzXV0pfSkpO3JldHVybiBmdW5jdGlvbigpe3JldHVybiBlLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19KCl9LHtrZXk6XCJmcmVlemVCYWxhbmNlXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1oKCkoZC5hLm1hcmsoZnVuY3Rpb24gZSgpe3ZhciB0LG4scixpLHMsbyxhLHUsYyxsLGg9YXJndW1lbnRzO3JldHVybiBkLmEud3JhcChmdW5jdGlvbihlKXtmb3IoOzspc3dpdGNoKGUucHJldj1lLm5leHQpe2Nhc2UgMDppZih0PWgubGVuZ3RoPjAmJnZvaWQgMCE9PWhbMF0/aFswXTowLG49aC5sZW5ndGg+MSYmdm9pZCAwIT09aFsxXT9oWzFdOjMscj1oLmxlbmd0aD4yJiZ2b2lkIDAhPT1oWzJdP2hbMl06XCJCQU5EV0lEVEhcIixpPWgubGVuZ3RoPjMmJnZvaWQgMCE9PWhbM10/aFszXTp7fSxzPWgubGVuZ3RoPjQmJnZvaWQgMCE9PWhbNF0/aFs0XTp2b2lkIDAsbz1oLmxlbmd0aD41JiZ2b2lkIDAhPT1oWzVdJiZoWzVdLExlLmlzRnVuY3Rpb24ocykmJihvPXMscz12b2lkIDApLExlLmlzRnVuY3Rpb24obikmJihvPW4sbj0zKSxMZS5pc0Z1bmN0aW9uKHIpJiYobz1yLHI9XCJCQU5EV0lEVEhcIiksTGUuaXNGdW5jdGlvbihpKSYmKG89aSxpPXt9KSxcInN0cmluZ1wiPT10eXBlb2YgaSYmKGk9e3ByaXZhdGVLZXk6aX0pLG8pe2UubmV4dD0xMzticmVha31yZXR1cm4gZS5hYnJ1cHQoXCJyZXR1cm5cIix0aGlzLmluamVjdFByb21pc2UodGhpcy5mcmVlemVCYWxhbmNlLHQsbixyLGkscykpO2Nhc2UgMTM6aWYoW1wiQkFORFdJRFRIXCIsXCJFTkVSR1lcIl0uaW5jbHVkZXMocikpe2UubmV4dD0xNTticmVha31yZXR1cm4gZS5hYnJ1cHQoXCJyZXR1cm5cIixvKCdJbnZhbGlkIHJlc291cmNlIHByb3ZpZGVkOiBFeHBlY3RlZCBcIkJBTkRXSURUSFwiIG9yIFwiRU5FUkdZXCInKSk7Y2FzZSAxNTppZihMZS5pc0ludGVnZXIodCkmJiEodDw9MCkpe2UubmV4dD0xNzticmVha31yZXR1cm4gZS5hYnJ1cHQoXCJyZXR1cm5cIixvKFwiSW52YWxpZCBhbW91bnQgcHJvdmlkZWRcIikpO2Nhc2UgMTc6aWYoTGUuaXNJbnRlZ2VyKG4pJiYhKG48Mykpe2UubmV4dD0xOTticmVha31yZXR1cm4gZS5hYnJ1cHQoXCJyZXR1cm5cIixvKFwiSW52YWxpZCBkdXJhdGlvbiBwcm92aWRlZCwgbWluaW11bSBvZiAzIGRheXNcIikpO2Nhc2UgMTk6aWYoKGk9QigpKHtwcml2YXRlS2V5OnRoaXMudHJvbldlYi5kZWZhdWx0UHJpdmF0ZUtleSxhZGRyZXNzOnRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXh9LGkpKS5wcml2YXRlS2V5fHxpLmFkZHJlc3Mpe2UubmV4dD0yMjticmVha31yZXR1cm4gZS5hYnJ1cHQoXCJyZXR1cm5cIixvKFwiRnVuY3Rpb24gcmVxdWlyZXMgZWl0aGVyIGEgcHJpdmF0ZSBrZXkgb3IgYWRkcmVzcyB0byBiZSBzZXRcIikpO2Nhc2UgMjI6cmV0dXJuIGUucHJldj0yMixhPWkucHJpdmF0ZUtleT90aGlzLnRyb25XZWIuYWRkcmVzcy5mcm9tUHJpdmF0ZUtleShpLnByaXZhdGVLZXkpOmkuYWRkcmVzcyxlLm5leHQ9MjYsdGhpcy50cm9uV2ViLnRyYW5zYWN0aW9uQnVpbGRlci5mcmVlemVCYWxhbmNlKHQsbixyLGEscyk7Y2FzZSAyNjpyZXR1cm4gdT1lLnNlbnQsZS5uZXh0PTI5LHRoaXMuc2lnbih1LGkucHJpdmF0ZUtleXx8dm9pZCAwKTtjYXNlIDI5OnJldHVybiBjPWUuc2VudCxlLm5leHQ9MzIsdGhpcy5zZW5kUmF3VHJhbnNhY3Rpb24oYyk7Y2FzZSAzMjpyZXR1cm4gbD1lLnNlbnQsZS5hYnJ1cHQoXCJyZXR1cm5cIixvKG51bGwsbCkpO2Nhc2UgMzY6cmV0dXJuIGUucHJldj0zNixlLnQwPWUuY2F0Y2goMjIpLGUuYWJydXB0KFwicmV0dXJuXCIsbyhlLnQwKSk7Y2FzZSAzOTpjYXNlXCJlbmRcIjpyZXR1cm4gZS5zdG9wKCl9fSxlLHRoaXMsW1syMiwzNl1dKX0pKTtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gZS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSgpfSx7a2V5OlwidW5mcmVlemVCYWxhbmNlXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1oKCkoZC5hLm1hcmsoZnVuY3Rpb24gZSgpe3ZhciB0LG4scixpLHMsbyxhLHUsYz1hcmd1bWVudHM7cmV0dXJuIGQuYS53cmFwKGZ1bmN0aW9uKGUpe2Zvcig7Oylzd2l0Y2goZS5wcmV2PWUubmV4dCl7Y2FzZSAwOmlmKHQ9Yy5sZW5ndGg+MCYmdm9pZCAwIT09Y1swXT9jWzBdOlwiQkFORFdJRFRIXCIsbj1jLmxlbmd0aD4xJiZ2b2lkIDAhPT1jWzFdP2NbMV06e30scj1jLmxlbmd0aD4yJiZ2b2lkIDAhPT1jWzJdP2NbMl06dm9pZCAwLGk9Yy5sZW5ndGg+MyYmdm9pZCAwIT09Y1szXSYmY1szXSxMZS5pc0Z1bmN0aW9uKHIpJiYoaT1yLHI9dm9pZCAwKSxMZS5pc0Z1bmN0aW9uKHQpJiYoaT10LHQ9XCJCQU5EV0lEVEhcIiksTGUuaXNGdW5jdGlvbihuKSYmKGk9bixuPXt9KSxcInN0cmluZ1wiPT10eXBlb2YgbiYmKG49e3ByaXZhdGVLZXk6bn0pLGkpe2UubmV4dD0xMDticmVha31yZXR1cm4gZS5hYnJ1cHQoXCJyZXR1cm5cIix0aGlzLmluamVjdFByb21pc2UodGhpcy51bmZyZWV6ZUJhbGFuY2UsdCxuLHIpKTtjYXNlIDEwOmlmKFtcIkJBTkRXSURUSFwiLFwiRU5FUkdZXCJdLmluY2x1ZGVzKHQpKXtlLm5leHQ9MTI7YnJlYWt9cmV0dXJuIGUuYWJydXB0KFwicmV0dXJuXCIsaSgnSW52YWxpZCByZXNvdXJjZSBwcm92aWRlZDogRXhwZWN0ZWQgXCJCQU5EV0lEVEhcIiBvciBcIkVORVJHWVwiJykpO2Nhc2UgMTI6aWYoKG49QigpKHtwcml2YXRlS2V5OnRoaXMudHJvbldlYi5kZWZhdWx0UHJpdmF0ZUtleSxhZGRyZXNzOnRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5oZXh9LG4pKS5wcml2YXRlS2V5fHxuLmFkZHJlc3Mpe2UubmV4dD0xNTticmVha31yZXR1cm4gZS5hYnJ1cHQoXCJyZXR1cm5cIixpKFwiRnVuY3Rpb24gcmVxdWlyZXMgZWl0aGVyIGEgcHJpdmF0ZSBrZXkgb3IgYWRkcmVzcyB0byBiZSBzZXRcIikpO2Nhc2UgMTU6cmV0dXJuIGUucHJldj0xNSxzPW4ucHJpdmF0ZUtleT90aGlzLnRyb25XZWIuYWRkcmVzcy5mcm9tUHJpdmF0ZUtleShuLnByaXZhdGVLZXkpOm4uYWRkcmVzcyxlLm5leHQ9MTksdGhpcy50cm9uV2ViLnRyYW5zYWN0aW9uQnVpbGRlci51bmZyZWV6ZUJhbGFuY2UodCxzLHIpO2Nhc2UgMTk6cmV0dXJuIG89ZS5zZW50LGUubmV4dD0yMix0aGlzLnNpZ24obyxuLnByaXZhdGVLZXl8fHZvaWQgMCk7Y2FzZSAyMjpyZXR1cm4gYT1lLnNlbnQsZS5uZXh0PTI1LHRoaXMuc2VuZFJhd1RyYW5zYWN0aW9uKGEpO2Nhc2UgMjU6cmV0dXJuIHU9ZS5zZW50LGUuYWJydXB0KFwicmV0dXJuXCIsaShudWxsLHUpKTtjYXNlIDI5OnJldHVybiBlLnByZXY9MjksZS50MD1lLmNhdGNoKDE1KSxlLmFicnVwdChcInJldHVyblwiLGkoZS50MCkpO2Nhc2UgMzI6Y2FzZVwiZW5kXCI6cmV0dXJuIGUuc3RvcCgpfX0sZSx0aGlzLFtbMTUsMjldXSl9KSk7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGUuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0oKX0se2tleTpcInVwZGF0ZUFjY291bnRcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWgoKShkLmEubWFyayhmdW5jdGlvbiBlKCl7dmFyIHQsbixyLGkscyxvLGEsdT1hcmd1bWVudHM7cmV0dXJuIGQuYS53cmFwKGZ1bmN0aW9uKGUpe2Zvcig7Oylzd2l0Y2goZS5wcmV2PWUubmV4dCl7Y2FzZSAwOmlmKHQ9dS5sZW5ndGg+MCYmdm9pZCAwIT09dVswXSYmdVswXSxuPXUubGVuZ3RoPjEmJnZvaWQgMCE9PXVbMV0/dVsxXTp7fSxyPXUubGVuZ3RoPjImJnZvaWQgMCE9PXVbMl0mJnVbMl0sTGUuaXNGdW5jdGlvbihuKSYmKHI9bixuPXt9KSxcInN0cmluZ1wiPT10eXBlb2YgbiYmKG49e3ByaXZhdGVLZXk6bn0pLHIpe2UubmV4dD03O2JyZWFrfXJldHVybiBlLmFicnVwdChcInJldHVyblwiLHRoaXMuaW5qZWN0UHJvbWlzZSh0aGlzLnVwZGF0ZUFjY291bnQsdCxuKSk7Y2FzZSA3OmlmKExlLmlzU3RyaW5nKHQpJiZ0Lmxlbmd0aCl7ZS5uZXh0PTk7YnJlYWt9cmV0dXJuIGUuYWJydXB0KFwicmV0dXJuXCIscihcIk5hbWUgbXVzdCBiZSBhIHN0cmluZ1wiKSk7Y2FzZSA5OmlmKChuPUIoKSh7cHJpdmF0ZUtleTp0aGlzLnRyb25XZWIuZGVmYXVsdFByaXZhdGVLZXksYWRkcmVzczp0aGlzLnRyb25XZWIuZGVmYXVsdEFkZHJlc3MuaGV4fSxuKSkucHJpdmF0ZUtleXx8bi5hZGRyZXNzKXtlLm5leHQ9MTI7YnJlYWt9cmV0dXJuIGUuYWJydXB0KFwicmV0dXJuXCIscihcIkZ1bmN0aW9uIHJlcXVpcmVzIGVpdGhlciBhIHByaXZhdGUga2V5IG9yIGFkZHJlc3MgdG8gYmUgc2V0XCIpKTtjYXNlIDEyOnJldHVybiBlLnByZXY9MTIsaT1uLnByaXZhdGVLZXk/dGhpcy50cm9uV2ViLmFkZHJlc3MuZnJvbVByaXZhdGVLZXkobi5wcml2YXRlS2V5KTpuLmFkZHJlc3MsZS5uZXh0PTE2LHRoaXMudHJvbldlYi50cmFuc2FjdGlvbkJ1aWxkZXIudXBkYXRlQWNjb3VudCh0LGkpO2Nhc2UgMTY6cmV0dXJuIHM9ZS5zZW50LGUubmV4dD0xOSx0aGlzLnNpZ24ocyxuLnByaXZhdGVLZXl8fHZvaWQgMCk7Y2FzZSAxOTpyZXR1cm4gbz1lLnNlbnQsZS5uZXh0PTIyLHRoaXMuc2VuZFJhd1RyYW5zYWN0aW9uKG8pO2Nhc2UgMjI6cmV0dXJuIGE9ZS5zZW50LGUuYWJydXB0KFwicmV0dXJuXCIscihudWxsLGEpKTtjYXNlIDI2OnJldHVybiBlLnByZXY9MjYsZS50MD1lLmNhdGNoKDEyKSxlLmFicnVwdChcInJldHVyblwiLHIoZS50MCkpO2Nhc2UgMjk6Y2FzZVwiZW5kXCI6cmV0dXJuIGUuc3RvcCgpfX0sZSx0aGlzLFtbMTIsMjZdXSl9KSk7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGUuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0oKX0se2tleTpcInNpZ25NZXNzYWdlXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zaWduLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19LHtrZXk6XCJzZW5kQXNzZXRcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLnNlbmRUb2tlbi5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSx7a2V5Olwic2VuZFwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc2VuZFRyYW5zYWN0aW9uLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19LHtrZXk6XCJzZW5kVHJ4XCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zZW5kVHJhbnNhY3Rpb24uYXBwbHkodGhpcyxhcmd1bWVudHMpfX0se2tleTpcImJyb2FkY2FzdFwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc2VuZFJhd1RyYW5zYWN0aW9uLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19LHtrZXk6XCJzaWduVHJhbnNhY3Rpb25cIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLnNpZ24uYXBwbHkodGhpcyxhcmd1bWVudHMpfX0se2tleTpcImdldFByb3Bvc2FsXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdLHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0mJmFyZ3VtZW50c1sxXTtyZXR1cm4gdD8hTGUuaXNJbnRlZ2VyKGUpfHxlPDA/dChcIkludmFsaWQgcHJvcG9zYWxJRCBwcm92aWRlZFwiKTp2b2lkIHRoaXMudHJvbldlYi5mdWxsTm9kZS5yZXF1ZXN0KFwid2FsbGV0L2dldHByb3Bvc2FsYnlpZFwiLHtpZDpwYXJzZUludChlKX0sXCJwb3N0XCIpLnRoZW4oZnVuY3Rpb24oZSl7dChudWxsLGUpfSkuY2F0Y2goZnVuY3Rpb24oZSl7cmV0dXJuIHQoZSl9KTp0aGlzLmluamVjdFByb21pc2UodGhpcy5nZXRQcm9wb3NhbCxlKX19LHtrZXk6XCJsaXN0UHJvcG9zYWxzXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdO2lmKCFlKXJldHVybiB0aGlzLmluamVjdFByb21pc2UodGhpcy5saXN0UHJvcG9zYWxzKTt0aGlzLnRyb25XZWIuZnVsbE5vZGUucmVxdWVzdChcIndhbGxldC9saXN0cHJvcG9zYWxzXCIse30sXCJwb3N0XCIpLnRoZW4oZnVuY3Rpb24odCl7dmFyIG49dC5wcm9wb3NhbHM7ZShudWxsLHZvaWQgMD09PW4/W106bil9KS5jYXRjaChmdW5jdGlvbih0KXtyZXR1cm4gZSh0KX0pfX0se2tleTpcImdldENoYWluUGFyYW1ldGVyc1wiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXTtpZighZSlyZXR1cm4gdGhpcy5pbmplY3RQcm9taXNlKHRoaXMuZ2V0Q2hhaW5QYXJhbWV0ZXJzKTt0aGlzLnRyb25XZWIuZnVsbE5vZGUucmVxdWVzdChcIndhbGxldC9nZXRjaGFpbnBhcmFtZXRlcnNcIix7fSxcInBvc3RcIikudGhlbihmdW5jdGlvbih0KXt2YXIgbj10LmNoYWluUGFyYW1ldGVyO2UobnVsbCx2b2lkIDA9PT1uP1tdOm4pfSkuY2F0Y2goZnVuY3Rpb24odCl7cmV0dXJuIGUodCl9KX19LHtrZXk6XCJnZXRBY2NvdW50UmVzb3VyY2VzXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleCx0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdJiZhcmd1bWVudHNbMV07cmV0dXJuIHQ/dGhpcy50cm9uV2ViLmlzQWRkcmVzcyhlKT92b2lkIHRoaXMudHJvbldlYi5mdWxsTm9kZS5yZXF1ZXN0KFwid2FsbGV0L2dldGFjY291bnRyZXNvdXJjZVwiLHthZGRyZXNzOnRoaXMudHJvbldlYi5hZGRyZXNzLnRvSGV4KGUpfSxcInBvc3RcIikudGhlbihmdW5jdGlvbihlKXt0KG51bGwsZSl9KS5jYXRjaChmdW5jdGlvbihlKXtyZXR1cm4gdChlKX0pOnQoXCJJbnZhbGlkIGFkZHJlc3MgcHJvdmlkZWRcIik6dGhpcy5pbmplY3RQcm9taXNlKHRoaXMuZ2V0QWNjb3VudFJlc291cmNlcyxlKX19LHtrZXk6XCJnZXRFeGNoYW5nZUJ5SURcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdJiZhcmd1bWVudHNbMF0sdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXSYmYXJndW1lbnRzWzFdO3JldHVybiB0PyFMZS5pc0ludGVnZXIoZSl8fGU8MD90KFwiSW52YWxpZCBleGNoYW5nZUlEIHByb3ZpZGVkXCIpOnZvaWQgdGhpcy50cm9uV2ViLmZ1bGxOb2RlLnJlcXVlc3QoXCJ3YWxsZXQvZ2V0ZXhjaGFuZ2VieWlkXCIse2lkOmV9LFwicG9zdFwiKS50aGVuKGZ1bmN0aW9uKGUpe3QobnVsbCxlKX0pLmNhdGNoKGZ1bmN0aW9uKGUpe3JldHVybiB0KGUpfSk6dGhpcy5pbmplY3RQcm9taXNlKHRoaXMuZ2V0RXhjaGFuZ2VCeUlELGUpfX0se2tleTpcImxpc3RFeGNoYW5nZXNcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdJiZhcmd1bWVudHNbMF07aWYoIWUpcmV0dXJuIHRoaXMuaW5qZWN0UHJvbWlzZSh0aGlzLmxpc3RFeGNoYW5nZXMpO3RoaXMudHJvbldlYi5mdWxsTm9kZS5yZXF1ZXN0KFwid2FsbGV0L2xpc3RleGNoYW5nZXNcIix7fSxcInBvc3RcIikudGhlbihmdW5jdGlvbih0KXt2YXIgbj10LmV4Y2hhbmdlcztlKG51bGwsdm9pZCAwPT09bj9bXTpuKX0sXCJwb3N0XCIpLmNhdGNoKGZ1bmN0aW9uKHQpe3JldHVybiBlKHQpfSl9fSx7a2V5OlwibGlzdEV4Y2hhbmdlc1BhZ2luYXRlZFwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOjEwLHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOjAsbj1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXSYmYXJndW1lbnRzWzJdO2lmKExlLmlzRnVuY3Rpb24odCkmJihuPXQsdD0wKSxMZS5pc0Z1bmN0aW9uKGUpJiYobj1lLGU9MzApLCFuKXJldHVybiB0aGlzLmluamVjdFByb21pc2UodGhpcy5saXN0RXhjaGFuZ2VzKTt0aGlzLnRyb25XZWIuZnVsbE5vZGUucmVxdWVzdChcIndhbGxldC9saXN0ZXhjaGFuZ2VzcGFnaW5hdGVkXCIse2xpbWl0OmUsb2Zmc2V0OnR9LFwicG9zdFwiKS50aGVuKGZ1bmN0aW9uKGUpe3ZhciB0PWUuZXhjaGFuZ2VzO24obnVsbCx2b2lkIDA9PT10P1tdOnQpfSkuY2F0Y2goZnVuY3Rpb24oZSl7cmV0dXJuIG4oZSl9KX19LHtrZXk6XCJnZXROb2RlSW5mb1wiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXTtpZighZSlyZXR1cm4gdGhpcy5pbmplY3RQcm9taXNlKHRoaXMuZ2V0Tm9kZUluZm8pO3RoaXMudHJvbldlYi5mdWxsTm9kZS5yZXF1ZXN0KFwid2FsbGV0L2dldG5vZGVpbmZvXCIse30sXCJwb3N0XCIpLnRoZW4oZnVuY3Rpb24odCl7ZShudWxsLHQpfSxcInBvc3RcIikuY2F0Y2goZnVuY3Rpb24odCl7cmV0dXJuIGUodCl9KX19LHtrZXk6XCJnZXRUb2tlbkxpc3RCeU5hbWVcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMsdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdLG49YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0mJmFyZ3VtZW50c1sxXTtyZXR1cm4gbj8oTGUuaXNJbnRlZ2VyKHQpJiYodD10LnRvU3RyaW5nKCkpLExlLmlzU3RyaW5nKHQpJiZ0Lmxlbmd0aD92b2lkIHRoaXMudHJvbldlYi5mdWxsTm9kZS5yZXF1ZXN0KFwid2FsbGV0L2dldGFzc2V0aXNzdWVsaXN0YnluYW1lXCIse3ZhbHVlOnRoaXMudHJvbldlYi5mcm9tVXRmOCh0KX0sXCJwb3N0XCIpLnRoZW4oZnVuY3Rpb24odCl7aWYoIXQubmFtZSlyZXR1cm4gbihcIlRva2VuIGRvZXMgbm90IGV4aXN0XCIpO24obnVsbCxlLl9wYXJzZVRva2VuKHQpKX0pLmNhdGNoKGZ1bmN0aW9uKGUpe3JldHVybiBuKGUpfSk6bihcIkludmFsaWQgdG9rZW4gSUQgcHJvdmlkZWRcIikpOnRoaXMuaW5qZWN0UHJvbWlzZSh0aGlzLmdldFRva2VuTGlzdEJ5TmFtZSx0KX19LHtrZXk6XCJnZXRUb2tlbkJ5SURcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMsdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdLG49YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0mJmFyZ3VtZW50c1sxXTtyZXR1cm4gbj8oTGUuaXNJbnRlZ2VyKHQpJiYodD10LnRvU3RyaW5nKCkpLExlLmlzU3RyaW5nKHQpJiZ0Lmxlbmd0aD92b2lkIHRoaXMudHJvbldlYi5mdWxsTm9kZS5yZXF1ZXN0KFwid2FsbGV0L2dldGFzc2V0aXNzdWVieWlkXCIse3ZhbHVlOnR9LFwicG9zdFwiKS50aGVuKGZ1bmN0aW9uKHQpe2lmKCF0Lm5hbWUpcmV0dXJuIG4oXCJUb2tlbiBkb2VzIG5vdCBleGlzdFwiKTtuKG51bGwsZS5fcGFyc2VUb2tlbih0KSl9KS5jYXRjaChmdW5jdGlvbihlKXtyZXR1cm4gbihlKX0pOm4oXCJJbnZhbGlkIHRva2VuIElEIHByb3ZpZGVkXCIpKTp0aGlzLmluamVjdFByb21pc2UodGhpcy5nZXRUb2tlbkJ5SUQsdCl9fV0sW3trZXk6XCJ2ZXJpZnlTaWduYXR1cmVcIix2YWx1ZTpmdW5jdGlvbihlLHQsbil7dmFyIHI9IShhcmd1bWVudHMubGVuZ3RoPjMmJnZvaWQgMCE9PWFyZ3VtZW50c1szXSl8fGFyZ3VtZW50c1szXTtlPWUucmVwbGFjZSgvXjB4LyxcIlwiKSxuPW4ucmVwbGFjZSgvXjB4LyxcIlwiKTt2YXIgaT1bXS5jb25jYXQoUigpKGxlKHI/XCJcdTAwMTlUUk9OIFNpZ25lZCBNZXNzYWdlOlxcbjMyXCI6XCJcdTAwMTlFdGhlcmV1bSBTaWduZWQgTWVzc2FnZTpcXG4zMlwiKSksUigpKExlLmNvZGUuaGV4U3RyMmJ5dGVBcnJheShlKSkpLHM9Y2UoaSksbz1oZShzLHtyZWNvdmVyeVBhcmFtOlwiMWNcIj09bi5zdWJzdHJpbmcoMTI4LDEzMCk/MTowLHI6XCIweFwiK24uc3Vic3RyaW5nKDAsNjQpLHM6XCIweFwiK24uc3Vic3RyaW5nKDY0LDEyOCl9KSxhPVUrby5zdWJzdHIoMik7cmV0dXJuIHB0LmFkZHJlc3MuZnJvbUhleChhKT09cHQuYWRkcmVzcy5mcm9tSGV4KHQpfX0se2tleTpcInNpZ25TdHJpbmdcIix2YWx1ZTpmdW5jdGlvbihlLHQpe3ZhciBuPSEoYXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0pfHxhcmd1bWVudHNbMl07ZT1lLnJlcGxhY2UoL14weC8sXCJcIik7dmFyIHI9bmV3IGZlKHQpLGk9W10uY29uY2F0KFIoKShsZShuP1wiXHUwMDE5VFJPTiBTaWduZWQgTWVzc2FnZTpcXG4zMlwiOlwiXHUwMDE5RXRoZXJldW0gU2lnbmVkIE1lc3NhZ2U6XFxuMzJcIikpLFIoKShMZS5jb2RlLmhleFN0cjJieXRlQXJyYXkoZSkpKSxzPWNlKGkpLG89ci5zaWduRGlnZXN0KHMpO3JldHVybltcIjB4XCIsby5yLnN1YnN0cmluZygyKSxvLnMuc3Vic3RyaW5nKDIpLE51bWJlcihvLnYpLnRvU3RyaW5nKDE2KV0uam9pbihcIlwiKX19XSksZX0oKSxzdD1mdW5jdGlvbihlKXtyZXR1cm4gZS5uYW1lK1wiKFwiK290KGUuaW5wdXRzfHxbXSkuam9pbihcIixcIikrXCIpXCJ9LG90PWZ1bmN0aW9uKGUpe3JldHVybiBlLm1hcChmdW5jdGlvbihlKXtyZXR1cm4gZS50eXBlfSl9LGF0PWZ1bmN0aW9uKGUsdCl7dmFyIG49ZS5tYXAoZnVuY3Rpb24oZSl7cmV0dXJuIGUubmFtZX0pLmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm4hIWV9KSxyPWUubWFwKGZ1bmN0aW9uKGUpe3JldHVybiBlLnR5cGV9KTtyZXR1cm4gTGUuYWJpLmRlY29kZVBhcmFtcyhuLHIsdCl9LHV0PWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4pe2coKSh0aGlzLGUpLHRoaXMudHJvbldlYj10LnRyb25XZWIsdGhpcy5jb250cmFjdD10LHRoaXMuYWJpPW4sdGhpcy5uYW1lPW4ubmFtZXx8KG4ubmFtZT1uLnR5cGUpLHRoaXMuaW5wdXRzPW4uaW5wdXRzfHxbXSx0aGlzLm91dHB1dHM9bi5vdXRwdXRzfHxbXSx0aGlzLmZ1bmN0aW9uU2VsZWN0b3I9c3QobiksdGhpcy5zaWduYXR1cmU9dGhpcy50cm9uV2ViLnNoYTModGhpcy5mdW5jdGlvblNlbGVjdG9yLCExKS5zbGljZSgwLDgpLHRoaXMuaW5qZWN0UHJvbWlzZT1MZS5wcm9taXNlSW5qZWN0b3IodGhpcyksdGhpcy5kZWZhdWx0T3B0aW9ucz17ZmVlTGltaXQ6MWU5LGNhbGxWYWx1ZTowLHVzZXJGZWVQZXJjZW50YWdlOjEwMCxzaG91bGRQb2xsUmVzcG9uc2U6ITF9fXJldHVybiBtKCkoZSxbe2tleTpcImRlY29kZUlucHV0XCIsdmFsdWU6ZnVuY3Rpb24oZSl7cmV0dXJuIGF0KHRoaXMuaW5wdXRzLFwiMHhcIitlKX19LHtrZXk6XCJvbk1ldGhvZFwiLHZhbHVlOmZ1bmN0aW9uKCl7Zm9yKHZhciBlPXRoaXMsdD1hcmd1bWVudHMubGVuZ3RoLG49bmV3IEFycmF5KHQpLHI9MDtyPHQ7cisrKW5bcl09YXJndW1lbnRzW3JdO3ZhciBpPW90KHRoaXMuaW5wdXRzKTtyZXR1cm4gbi5mb3JFYWNoKGZ1bmN0aW9uKHQscil7XCJhZGRyZXNzXCI9PWlbcl0mJihuW3JdPWUudHJvbldlYi5hZGRyZXNzLnRvSGV4KHQpLnJlcGxhY2UoeixcIjB4XCIpKSxcImFkZHJlc3NbXVwiPT1pW3JdJiYobltyXT1uW3JdLm1hcChmdW5jdGlvbih0KXtyZXR1cm4gZS50cm9uV2ViLmFkZHJlc3MudG9IZXgodCkucmVwbGFjZSh6LFwiMHhcIil9KSl9KSx7Y2FsbDpmdW5jdGlvbigpe2Zvcih2YXIgdD1hcmd1bWVudHMubGVuZ3RoLHI9bmV3IEFycmF5KHQpLHM9MDtzPHQ7cysrKXJbc109YXJndW1lbnRzW3NdO3JldHVybiBlLl9jYWxsLmFwcGx5KGUsW2ksbl0uY29uY2F0KHIpKX0sc2VuZDpmdW5jdGlvbigpe2Zvcih2YXIgdD1hcmd1bWVudHMubGVuZ3RoLHI9bmV3IEFycmF5KHQpLHM9MDtzPHQ7cysrKXJbc109YXJndW1lbnRzW3NdO3JldHVybiBlLl9zZW5kLmFwcGx5KGUsW2ksbl0uY29uY2F0KHIpKX0sd2F0Y2g6ZnVuY3Rpb24oKXtyZXR1cm4gZS5fd2F0Y2guYXBwbHkoZSxhcmd1bWVudHMpfX19fSx7a2V5OlwiX2NhbGxcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWgoKShkLmEubWFyayhmdW5jdGlvbiBlKHQsbil7dmFyIHIsaSxzLG8sYT10aGlzLHU9YXJndW1lbnRzO3JldHVybiBkLmEud3JhcChmdW5jdGlvbihlKXtmb3IoOzspc3dpdGNoKGUucHJldj1lLm5leHQpe2Nhc2UgMDppZihyPXUubGVuZ3RoPjImJnZvaWQgMCE9PXVbMl0/dVsyXTp7fSxpPXUubGVuZ3RoPjMmJnZvaWQgMCE9PXVbM10mJnVbM10sTGUuaXNGdW5jdGlvbihyKSYmKGk9cixyPXt9KSxpKXtlLm5leHQ9NTticmVha31yZXR1cm4gZS5hYnJ1cHQoXCJyZXR1cm5cIix0aGlzLmluamVjdFByb21pc2UodGhpcy5fY2FsbCx0LG4scikpO2Nhc2UgNTppZih0Lmxlbmd0aD09PW4ubGVuZ3RoKXtlLm5leHQ9NzticmVha31yZXR1cm4gZS5hYnJ1cHQoXCJyZXR1cm5cIixpKFwiSW52YWxpZCBhcmd1bWVudCBjb3VudCBwcm92aWRlZFwiKSk7Y2FzZSA3OmlmKHRoaXMuY29udHJhY3QuYWRkcmVzcyl7ZS5uZXh0PTk7YnJlYWt9cmV0dXJuIGUuYWJydXB0KFwicmV0dXJuXCIsaShcIlNtYXJ0IGNvbnRyYWN0IGlzIG1pc3NpbmcgYWRkcmVzc1wiKSk7Y2FzZSA5OmlmKHRoaXMuY29udHJhY3QuZGVwbG95ZWQpe2UubmV4dD0xMTticmVha31yZXR1cm4gZS5hYnJ1cHQoXCJyZXR1cm5cIixpKFwiQ2FsbGluZyBzbWFydCBjb250cmFjdHMgcmVxdWlyZXMgeW91IHRvIGxvYWQgdGhlIGNvbnRyYWN0IGZpcnN0XCIpKTtjYXNlIDExOmlmKHM9dGhpcy5hYmkuc3RhdGVNdXRhYmlsaXR5LFtcInB1cmVcIixcInZpZXdcIl0uaW5jbHVkZXMocy50b0xvd2VyQ2FzZSgpKSl7ZS5uZXh0PTE0O2JyZWFrfXJldHVybiBlLmFicnVwdChcInJldHVyblwiLGkoJ01ldGhvZHMgd2l0aCBzdGF0ZSBtdXRhYmlsaXR5IFwiJy5jb25jYXQocywnXCIgbXVzdCB1c2Ugc2VuZCgpJykpKTtjYXNlIDE0OnI9QigpKHt9LHRoaXMuZGVmYXVsdE9wdGlvbnMse2Zyb206dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleH0sciksbz1uLm1hcChmdW5jdGlvbihlLG4pe3JldHVybnt0eXBlOnRbbl0sdmFsdWU6ZX19KSx0aGlzLnRyb25XZWIudHJhbnNhY3Rpb25CdWlsZGVyLnRyaWdnZXJTbWFydENvbnRyYWN0KHRoaXMuY29udHJhY3QuYWRkcmVzcyx0aGlzLmZ1bmN0aW9uU2VsZWN0b3IscixvLCEhci5mcm9tJiZ0aGlzLnRyb25XZWIuYWRkcmVzcy50b0hleChyLmZyb20pLGZ1bmN0aW9uKGUsdCl7aWYoZSlyZXR1cm4gaShlKTtpZighTGUuaGFzUHJvcGVydHkodCxcImNvbnN0YW50X3Jlc3VsdFwiKSlyZXR1cm4gaShcIkZhaWxlZCB0byBleGVjdXRlXCIpO3RyeXt2YXIgbj10LmNvbnN0YW50X3Jlc3VsdFswXS5sZW5ndGg7aWYoMD09PW58fG4lNjQ9PTgpe3ZhciByPVwiVGhlIGNhbGwgaGFzIGJlZW4gcmV2ZXJ0ZWQgb3IgaGFzIHRocm93biBhbiBlcnJvci5cIjtpZigwIT09bil7cis9XCIgRXJyb3IgbWVzc2FnZTogXCI7Zm9yKHZhciBzPVwiXCIsbz10LmNvbnN0YW50X3Jlc3VsdFswXS5zdWJzdHJpbmcoOCksdT0wO3U8bi04O3UrPTY0KXMrPWEudHJvbldlYi50b1V0Zjgoby5zdWJzdHJpbmcodSx1KzY0KSk7cis9cy5yZXBsYWNlKC8oXFx1MDAwMHxcXHUwMDBifFxcZikrL2csXCIgXCIpLnJlcGxhY2UoLyArL2csXCIgXCIpLnJlcGxhY2UoL1xccyskL2csXCJcIil9cmV0dXJuIGkocil9dmFyIGM9YXQoYS5vdXRwdXRzLFwiMHhcIit0LmNvbnN0YW50X3Jlc3VsdFswXSk7cmV0dXJuIDE9PT1jLmxlbmd0aCYmKGM9Y1swXSksaShudWxsLGMpfWNhdGNoKGUpe3JldHVybiBpKGUpfX0pO2Nhc2UgMTc6Y2FzZVwiZW5kXCI6cmV0dXJuIGUuc3RvcCgpfX0sZSx0aGlzKX0pKTtyZXR1cm4gZnVuY3Rpb24odCxuKXtyZXR1cm4gZS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSgpfSx7a2V5OlwiX3NlbmRcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWgoKShkLmEubWFyayhmdW5jdGlvbiBlKHQsbil7dmFyIHIsaSxzLG8sYSx1LGMsbCxmLHYscCxnPXRoaXMsYj1hcmd1bWVudHM7cmV0dXJuIGQuYS53cmFwKGZ1bmN0aW9uKGUpe2Zvcig7Oylzd2l0Y2goZS5wcmV2PWUubmV4dCl7Y2FzZSAwOmlmKHI9Yi5sZW5ndGg+MiYmdm9pZCAwIT09YlsyXT9iWzJdOnt9LGk9Yi5sZW5ndGg+MyYmdm9pZCAwIT09YlszXT9iWzNdOnRoaXMudHJvbldlYi5kZWZhdWx0UHJpdmF0ZUtleSxzPWIubGVuZ3RoPjQmJnZvaWQgMCE9PWJbNF0mJmJbNF0sTGUuaXNGdW5jdGlvbihpKSYmKHM9aSxpPXRoaXMudHJvbldlYi5kZWZhdWx0UHJpdmF0ZUtleSksTGUuaXNGdW5jdGlvbihyKSYmKHM9cixyPXt9KSxzKXtlLm5leHQ9NzticmVha31yZXR1cm4gZS5hYnJ1cHQoXCJyZXR1cm5cIix0aGlzLmluamVjdFByb21pc2UodGhpcy5fc2VuZCx0LG4scixpKSk7Y2FzZSA3OmlmKHQubGVuZ3RoPT09bi5sZW5ndGgpe2UubmV4dD05O2JyZWFrfXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYXJndW1lbnQgY291bnQgcHJvdmlkZWRcIik7Y2FzZSA5OmlmKHRoaXMuY29udHJhY3QuYWRkcmVzcyl7ZS5uZXh0PTExO2JyZWFrfXJldHVybiBlLmFicnVwdChcInJldHVyblwiLHMoXCJTbWFydCBjb250cmFjdCBpcyBtaXNzaW5nIGFkZHJlc3NcIikpO2Nhc2UgMTE6aWYodGhpcy5jb250cmFjdC5kZXBsb3llZCl7ZS5uZXh0PTEzO2JyZWFrfXJldHVybiBlLmFicnVwdChcInJldHVyblwiLHMoXCJDYWxsaW5nIHNtYXJ0IGNvbnRyYWN0cyByZXF1aXJlcyB5b3UgdG8gbG9hZCB0aGUgY29udHJhY3QgZmlyc3RcIikpO2Nhc2UgMTM6aWYobz10aGlzLmFiaS5zdGF0ZU11dGFiaWxpdHksIVtcInB1cmVcIixcInZpZXdcIl0uaW5jbHVkZXMoby50b0xvd2VyQ2FzZSgpKSl7ZS5uZXh0PTE2O2JyZWFrfXJldHVybiBlLmFicnVwdChcInJldHVyblwiLHMoJ01ldGhvZHMgd2l0aCBzdGF0ZSBtdXRhYmlsaXR5IFwiJy5jb25jYXQobywnXCIgbXVzdCB1c2UgY2FsbCgpJykpKTtjYXNlIDE2OnJldHVybltcInBheWFibGVcIl0uaW5jbHVkZXMoby50b0xvd2VyQ2FzZSgpKXx8KHIuY2FsbFZhbHVlPTApLHI9QigpKHt9LHRoaXMuZGVmYXVsdE9wdGlvbnMse2Zyb206dGhpcy50cm9uV2ViLmRlZmF1bHRBZGRyZXNzLmhleH0sciksYT1uLm1hcChmdW5jdGlvbihlLG4pe3JldHVybnt0eXBlOnRbbl0sdmFsdWU6ZX19KSxlLnByZXY9MTksdT1pP3RoaXMudHJvbldlYi5hZGRyZXNzLmZyb21Qcml2YXRlS2V5KGkpOnRoaXMudHJvbldlYi5kZWZhdWx0QWRkcmVzcy5iYXNlNTgsZS5uZXh0PTIzLHRoaXMudHJvbldlYi50cmFuc2FjdGlvbkJ1aWxkZXIudHJpZ2dlclNtYXJ0Q29udHJhY3QodGhpcy5jb250cmFjdC5hZGRyZXNzLHRoaXMuZnVuY3Rpb25TZWxlY3RvcixyLGEsdGhpcy50cm9uV2ViLmFkZHJlc3MudG9IZXgodSkpO2Nhc2UgMjM6aWYoKGM9ZS5zZW50KS5yZXN1bHQmJmMucmVzdWx0LnJlc3VsdCl7ZS5uZXh0PTI2O2JyZWFrfXJldHVybiBlLmFicnVwdChcInJldHVyblwiLHMoXCJVbmtub3duIGVycm9yOiBcIitKU09OLnN0cmluZ2lmeShjLG51bGwsMikpKTtjYXNlIDI2OnJldHVybiBlLm5leHQ9MjgsdGhpcy50cm9uV2ViLnRyeC5zaWduKGMudHJhbnNhY3Rpb24saSk7Y2FzZSAyODppZigobD1lLnNlbnQpLnNpZ25hdHVyZSl7ZS5uZXh0PTMzO2JyZWFrfWlmKGkpe2UubmV4dD0zMjticmVha31yZXR1cm4gZS5hYnJ1cHQoXCJyZXR1cm5cIixzKFwiVHJhbnNhY3Rpb24gd2FzIG5vdCBzaWduZWQgcHJvcGVybHlcIikpO2Nhc2UgMzI6cmV0dXJuIGUuYWJydXB0KFwicmV0dXJuXCIscyhcIkludmFsaWQgcHJpdmF0ZSBrZXkgcHJvdmlkZWRcIikpO2Nhc2UgMzM6cmV0dXJuIGUubmV4dD0zNSx0aGlzLnRyb25XZWIudHJ4LnNlbmRSYXdUcmFuc2FjdGlvbihsKTtjYXNlIDM1OmlmKCEoZj1lLnNlbnQpLmNvZGUpe2UubmV4dD00MDticmVha31yZXR1cm4gdj17ZXJyb3I6Zi5jb2RlLG1lc3NhZ2U6Zi5jb2RlfSxmLm1lc3NhZ2UmJih2Lm1lc3NhZ2U9dGhpcy50cm9uV2ViLnRvVXRmOChmLm1lc3NhZ2UpKSxlLmFicnVwdChcInJldHVyblwiLHModikpO2Nhc2UgNDA6aWYoci5zaG91bGRQb2xsUmVzcG9uc2Upe2UubmV4dD00MjticmVha31yZXR1cm4gZS5hYnJ1cHQoXCJyZXR1cm5cIixzKG51bGwsbC50eElEKSk7Y2FzZSA0MjoocD1mdW5jdGlvbigpe3ZhciBlPWgoKShkLmEubWFyayhmdW5jdGlvbiBlKCl7dmFyIHQsbixpLG89YXJndW1lbnRzO3JldHVybiBkLmEud3JhcChmdW5jdGlvbihlKXtmb3IoOzspc3dpdGNoKGUucHJldj1lLm5leHQpe2Nhc2UgMDppZigyMCE9KHQ9by5sZW5ndGg+MCYmdm9pZCAwIT09b1swXT9vWzBdOjApKXtlLm5leHQ9MzticmVha31yZXR1cm4gZS5hYnJ1cHQoXCJyZXR1cm5cIixzKHtlcnJvcjpcIkNhbm5vdCBmaW5kIHJlc3VsdCBpbiBzb2xpZGl0eSBub2RlXCIsdHJhbnNhY3Rpb246bH0pKTtjYXNlIDM6cmV0dXJuIGUubmV4dD01LGcudHJvbldlYi50cnguZ2V0VHJhbnNhY3Rpb25JbmZvKGwudHhJRCk7Y2FzZSA1OmlmKG49ZS5zZW50LE9iamVjdC5rZXlzKG4pLmxlbmd0aCl7ZS5uZXh0PTg7YnJlYWt9cmV0dXJuIGUuYWJydXB0KFwicmV0dXJuXCIsc2V0VGltZW91dChmdW5jdGlvbigpe3AodCsxKX0sM2UzKSk7Y2FzZSA4OmlmKCFuLnJlc3VsdHx8XCJGQUlMRURcIiE9bi5yZXN1bHQpe2UubmV4dD0xMDticmVha31yZXR1cm4gZS5hYnJ1cHQoXCJyZXR1cm5cIixzKHtlcnJvcjpnLnRyb25XZWIudG9VdGY4KG4ucmVzTWVzc2FnZSksdHJhbnNhY3Rpb246bCxvdXRwdXQ6bn0pKTtjYXNlIDEwOmlmKExlLmhhc1Byb3BlcnR5KG4sXCJjb250cmFjdFJlc3VsdFwiKSl7ZS5uZXh0PTEyO2JyZWFrfXJldHVybiBlLmFicnVwdChcInJldHVyblwiLHMoe2Vycm9yOlwiRmFpbGVkIHRvIGV4ZWN1dGU6IFwiK0pTT04uc3RyaW5naWZ5KG4sbnVsbCwyKSx0cmFuc2FjdGlvbjpsLG91dHB1dDpufSkpO2Nhc2UgMTI6aWYoIXIucmF3UmVzcG9uc2Upe2UubmV4dD0xNDticmVha31yZXR1cm4gZS5hYnJ1cHQoXCJyZXR1cm5cIixzKG51bGwsbikpO2Nhc2UgMTQ6cmV0dXJuIDE9PT0oaT1hdChnLm91dHB1dHMsXCIweFwiK24uY29udHJhY3RSZXN1bHRbMF0pKS5sZW5ndGgmJihpPWlbMF0pLGUuYWJydXB0KFwicmV0dXJuXCIscyhudWxsLGkpKTtjYXNlIDE3OmNhc2VcImVuZFwiOnJldHVybiBlLnN0b3AoKX19LGUpfSkpO3JldHVybiBmdW5jdGlvbigpe3JldHVybiBlLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19KCkpKCksZS5uZXh0PTQ5O2JyZWFrO2Nhc2UgNDY6cmV0dXJuIGUucHJldj00NixlLnQwPWUuY2F0Y2goMTkpLGUuYWJydXB0KFwicmV0dXJuXCIscyhlLnQwKSk7Y2FzZSA0OTpjYXNlXCJlbmRcIjpyZXR1cm4gZS5zdG9wKCl9fSxlLHRoaXMsW1sxOSw0Nl1dKX0pKTtyZXR1cm4gZnVuY3Rpb24odCxuKXtyZXR1cm4gZS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSgpfSx7a2V5OlwiX3dhdGNoXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1oKCkoZC5hLm1hcmsoZnVuY3Rpb24gZSgpe3ZhciB0LG4scixpLHMsbyxhLHU9dGhpcyxjPWFyZ3VtZW50cztyZXR1cm4gZC5hLndyYXAoZnVuY3Rpb24oZSl7Zm9yKDs7KXN3aXRjaChlLnByZXY9ZS5uZXh0KXtjYXNlIDA6aWYodD1jLmxlbmd0aD4wJiZ2b2lkIDAhPT1jWzBdP2NbMF06e30sbj1jLmxlbmd0aD4xJiZ2b2lkIDAhPT1jWzFdJiZjWzFdLExlLmlzRnVuY3Rpb24odCkmJihuPXQsdD17fSksTGUuaXNGdW5jdGlvbihuKSl7ZS5uZXh0PTU7YnJlYWt9dGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgY2FsbGJhY2sgdG8gYmUgcHJvdmlkZWRcIik7Y2FzZSA1OmlmKHRoaXMuY29udHJhY3QuYWRkcmVzcyl7ZS5uZXh0PTc7YnJlYWt9cmV0dXJuIGUuYWJydXB0KFwicmV0dXJuXCIsbihcIlNtYXJ0IGNvbnRyYWN0IGlzIG1pc3NpbmcgYWRkcmVzc1wiKSk7Y2FzZSA3OmlmKHRoaXMuYWJpLnR5cGUmJi9ldmVudC9pLnRlc3QodGhpcy5hYmkudHlwZSkpe2UubmV4dD05O2JyZWFrfXJldHVybiBlLmFicnVwdChcInJldHVyblwiLG4oXCJJbnZhbGlkIG1ldGhvZCB0eXBlIGZvciBldmVudCB3YXRjaGluZ1wiKSk7Y2FzZSA5OmlmKHRoaXMudHJvbldlYi5ldmVudFNlcnZlcil7ZS5uZXh0PTExO2JyZWFrfXJldHVybiBlLmFicnVwdChcInJldHVyblwiLG4oXCJObyBldmVudCBzZXJ2ZXIgY29uZmlndXJlZFwiKSk7Y2FzZSAxMTpyZXR1cm4gcj0hMSxpPSExLHM9RGF0ZS5ub3coKS0xZTMsbz1mdW5jdGlvbigpe3ZhciBlPWgoKShkLmEubWFyayhmdW5jdGlvbiBlKCl7dmFyIG4scixvLGEsYyxsO3JldHVybiBkLmEud3JhcChmdW5jdGlvbihlKXtmb3IoOzspc3dpdGNoKGUucHJldj1lLm5leHQpe2Nhc2UgMDpyZXR1cm4gZS5wcmV2PTAsbj17c2luY2U6cyxldmVudE5hbWU6dS5uYW1lLHNvcnQ6XCJibG9ja190aW1lc3RhbXBcIixibG9ja051bWJlcjpcImxhdGVzdFwiLGZpbHRlcnM6dC5maWx0ZXJzfSx0LnJlc291cmNlTm9kZSYmKC9mdWxsL2kudGVzdCh0LnJlc291cmNlTm9kZSk/bi5vbmx5VW5jb25maXJtZWQ9ITA6bi5vbmx5Q29uZmlybWVkPSEwKSxlLm5leHQ9NSx1LnRyb25XZWIuZXZlbnQuZ2V0RXZlbnRzQnlDb250cmFjdEFkZHJlc3ModS5jb250cmFjdC5hZGRyZXNzLG4pO2Nhc2UgNTpyZXR1cm4gcj1lLnNlbnQsbz1yLnNvcnQoZnVuY3Rpb24oZSx0KXtyZXR1cm4gdC5ibG9jay1lLmJsb2NrfSksYT0kZSgpKG8sMSksYz1hWzBdLGw9ci5maWx0ZXIoZnVuY3Rpb24oZSxuKXtyZXR1cm4oIXQucmVzb3VyY2VOb2RlfHwhZS5yZXNvdXJjZU5vZGV8fHQucmVzb3VyY2VOb2RlLnRvTG93ZXJDYXNlKCk9PT1lLnJlc291cmNlTm9kZS50b0xvd2VyQ2FzZSgpKSYmKCFyLnNsaWNlKDAsbikuc29tZShmdW5jdGlvbih0KXtyZXR1cm4gSlNPTi5zdHJpbmdpZnkodCk9PUpTT04uc3RyaW5naWZ5KGUpfSkmJighaXx8ZS5ibG9jaz5pKSl9KSxjJiYoaT1jLmJsb2NrKSxlLmFicnVwdChcInJldHVyblwiLGwpO2Nhc2UgMTI6cmV0dXJuIGUucHJldj0xMixlLnQwPWUuY2F0Y2goMCksZS5hYnJ1cHQoXCJyZXR1cm5cIixQcm9taXNlLnJlamVjdChlLnQwKSk7Y2FzZSAxNTpjYXNlXCJlbmRcIjpyZXR1cm4gZS5zdG9wKCl9fSxlLG51bGwsW1swLDEyXV0pfSkpO3JldHVybiBmdW5jdGlvbigpe3JldHVybiBlLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19KCksYT1mdW5jdGlvbigpe3ImJmNsZWFySW50ZXJ2YWwocikscj1zZXRJbnRlcnZhbChmdW5jdGlvbigpe28oKS50aGVuKGZ1bmN0aW9uKGUpe3JldHVybiBlLmZvckVhY2goZnVuY3Rpb24oZSl7bihudWxsLExlLnBhcnNlRXZlbnQoZSx1LmFiaSkpfSl9KS5jYXRjaChmdW5jdGlvbihlKXtyZXR1cm4gbihlKX0pfSwzZTMpfSxlLm5leHQ9MTgsbygpO2Nhc2UgMTg6cmV0dXJuIGEoKSxlLmFicnVwdChcInJldHVyblwiLHtzdGFydDphKCksc3RvcDpmdW5jdGlvbigpe3ImJihjbGVhckludGVydmFsKHIpLHI9ITEpfX0pO2Nhc2UgMjA6Y2FzZVwiZW5kXCI6cmV0dXJuIGUuc3RvcCgpfX0sZSx0aGlzKX0pKTtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gZS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSgpfV0pLGV9KCksY3Q9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXSxuPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTpbXSxyPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdJiZhcmd1bWVudHNbMl07aWYoZygpKHRoaXMsZSksIXR8fCF0IGluc3RhbmNlb2YgcHQpdGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgaW5zdGFuY2Ugb2YgVHJvbldlYlwiKTt0aGlzLnRyb25XZWI9dCx0aGlzLmluamVjdFByb21pc2U9TGUucHJvbWlzZUluamVjdG9yKHRoaXMpLHRoaXMuYWRkcmVzcz1yLHRoaXMuYWJpPW4sdGhpcy5ldmVudExpc3RlbmVyPSExLHRoaXMuYnl0ZWNvZGU9ITEsdGhpcy5kZXBsb3llZD0hMSx0aGlzLmxhc3RCbG9jaz0hMSx0aGlzLm1ldGhvZHM9e30sdGhpcy5tZXRob2RJbnN0YW5jZXM9e30sdGhpcy5wcm9wcz1bXSx0aGlzLnRyb25XZWIuaXNBZGRyZXNzKHIpP3RoaXMuZGVwbG95ZWQ9ITA6dGhpcy5hZGRyZXNzPSExLHRoaXMubG9hZEFiaShuKX1yZXR1cm4gbSgpKGUsW3trZXk6XCJfZ2V0RXZlbnRzXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1oKCkoZC5hLm1hcmsoZnVuY3Rpb24gZSgpe3ZhciB0LG4scixpLHMsbyxhPXRoaXMsdT1hcmd1bWVudHM7cmV0dXJuIGQuYS53cmFwKGZ1bmN0aW9uKGUpe2Zvcig7Oylzd2l0Y2goZS5wcmV2PWUubmV4dCl7Y2FzZSAwOnJldHVybiB0PXUubGVuZ3RoPjAmJnZvaWQgMCE9PXVbMF0/dVswXTp7fSxlLm5leHQ9Myx0aGlzLnRyb25XZWIuZXZlbnQuZ2V0RXZlbnRzQnlDb250cmFjdEFkZHJlc3ModGhpcy5hZGRyZXNzLHQpO2Nhc2UgMzpyZXR1cm4gbj1lLnNlbnQscj1uLnNvcnQoZnVuY3Rpb24oZSx0KXtyZXR1cm4gdC5ibG9jay1lLmJsb2NrfSksaT0kZSgpKHIsMSkscz1pWzBdLG89bi5maWx0ZXIoZnVuY3Rpb24oZSxyKXtyZXR1cm4oIXQucmVzb3VyY2VOb2RlfHwhZS5yZXNvdXJjZU5vZGV8fHQucmVzb3VyY2VOb2RlLnRvTG93ZXJDYXNlKCk9PT1lLnJlc291cmNlTm9kZS50b0xvd2VyQ2FzZSgpKSYmKCFuLnNsaWNlKDAscikuc29tZShmdW5jdGlvbih0KXtyZXR1cm4gSlNPTi5zdHJpbmdpZnkodCk9PUpTT04uc3RyaW5naWZ5KGUpfSkmJighYS5sYXN0QmxvY2t8fGUuYmxvY2s+YS5sYXN0QmxvY2spKX0pLHMmJih0aGlzLmxhc3RCbG9jaz1zLmJsb2NrKSxlLmFicnVwdChcInJldHVyblwiLG8pO2Nhc2UgODpjYXNlXCJlbmRcIjpyZXR1cm4gZS5zdG9wKCl9fSxlLHRoaXMpfSkpO3JldHVybiBmdW5jdGlvbigpe3JldHVybiBlLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19KCl9LHtrZXk6XCJfc3RhcnRFdmVudExpc3RlbmVyXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1oKCkoZC5hLm1hcmsoZnVuY3Rpb24gZSgpe3ZhciB0LG4scj10aGlzLGk9YXJndW1lbnRzO3JldHVybiBkLmEud3JhcChmdW5jdGlvbihlKXtmb3IoOzspc3dpdGNoKGUucHJldj1lLm5leHQpe2Nhc2UgMDppZih0PWkubGVuZ3RoPjAmJnZvaWQgMCE9PWlbMF0/aVswXTp7fSxuPWkubGVuZ3RoPjE/aVsxXTp2b2lkIDAsTGUuaXNGdW5jdGlvbih0KSYmKG49dCx0PXt9KSx0aGlzLmV2ZW50TGlzdGVuZXImJmNsZWFySW50ZXJ2YWwodGhpcy5ldmVudExpc3RlbmVyKSx0aGlzLnRyb25XZWIuZXZlbnRTZXJ2ZXIpe2UubmV4dD02O2JyZWFrfXRocm93IG5ldyBFcnJvcihcIkV2ZW50IHNlcnZlciBpcyBub3QgY29uZmlndXJlZFwiKTtjYXNlIDY6aWYodGhpcy5hZGRyZXNzKXtlLm5leHQ9ODticmVha310aHJvdyBuZXcgRXJyb3IoXCJDb250cmFjdCBpcyBub3QgY29uZmlndXJlZCB3aXRoIGFuIGFkZHJlc3NcIik7Y2FzZSA4OnJldHVybiB0aGlzLmV2ZW50Q2FsbGJhY2s9bixlLm5leHQ9MTEsdGhpcy5fZ2V0RXZlbnRzKHQpO2Nhc2UgMTE6dGhpcy5ldmVudExpc3RlbmVyPXNldEludGVydmFsKGZ1bmN0aW9uKCl7ci5fZ2V0RXZlbnRzKHQpLnRoZW4oZnVuY3Rpb24oZSl7cmV0dXJuIGUuZm9yRWFjaChmdW5jdGlvbihlKXtyLmV2ZW50Q2FsbGJhY2smJnIuZXZlbnRDYWxsYmFjayhlKX0pfSkuY2F0Y2goZnVuY3Rpb24oZSl7Y29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBnZXQgZXZlbnQgbGlzdFwiLGUpfSl9LDNlMyk7Y2FzZSAxMjpjYXNlXCJlbmRcIjpyZXR1cm4gZS5zdG9wKCl9fSxlLHRoaXMpfSkpO3JldHVybiBmdW5jdGlvbigpe3JldHVybiBlLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19KCl9LHtrZXk6XCJfc3RvcEV2ZW50TGlzdGVuZXJcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMuZXZlbnRMaXN0ZW5lciYmKGNsZWFySW50ZXJ2YWwodGhpcy5ldmVudExpc3RlbmVyKSx0aGlzLmV2ZW50TGlzdGVuZXI9ITEsdGhpcy5ldmVudENhbGxiYWNrPSExKX19LHtrZXk6XCJoYXNQcm9wZXJ0eVwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmhhc093blByb3BlcnR5KGUpfHx0aGlzLl9fcHJvdG9fXy5oYXNPd25Qcm9wZXJ0eShlKX19LHtrZXk6XCJsb2FkQWJpXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpczt0aGlzLmFiaT1lLHRoaXMubWV0aG9kcz17fSx0aGlzLnByb3BzLmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIGRlbGV0ZSB0W2VdfSksZS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2lmKGUudHlwZSYmIS9jb25zdHJ1Y3Rvci9pLnRlc3QoZS50eXBlKSl7dmFyIG49bmV3IHV0KHQsZSkscj1uLm9uTWV0aG9kLmJpbmQobiksaT1uLm5hbWUscz1uLmZ1bmN0aW9uU2VsZWN0b3Isbz1uLnNpZ25hdHVyZTt0Lm1ldGhvZHNbaV09cix0Lm1ldGhvZHNbc109cix0Lm1ldGhvZHNbb109cix0Lm1ldGhvZEluc3RhbmNlc1tpXT1uLHQubWV0aG9kSW5zdGFuY2VzW3NdPW4sdC5tZXRob2RJbnN0YW5jZXNbb109bix0Lmhhc1Byb3BlcnR5KGkpfHwodFtpXT1yLHQucHJvcHMucHVzaChpKSksdC5oYXNQcm9wZXJ0eShzKXx8KHRbc109cix0LnByb3BzLnB1c2gocykpLHQuaGFzUHJvcGVydHkobyl8fCh0W29dPXIsdC5wcm9wcy5wdXNoKG8pKX19KX19LHtrZXk6XCJkZWNvZGVJbnB1dFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PWUuc3Vic3RyaW5nKDAsOCksbj1lLnN1YnN0cmluZyg4KTtpZighdGhpcy5tZXRob2RJbnN0YW5jZXNbdF0pdGhyb3cgbmV3IEVycm9yKFwiQ29udHJhY3QgbWV0aG9kIFwiK3QrXCIgbm90IGZvdW5kXCIpO3JldHVybntuYW1lOnRoaXMubWV0aG9kSW5zdGFuY2VzW3RdLm5hbWUscGFyYW1zOnRoaXMubWV0aG9kSW5zdGFuY2VzW3RdLmRlY29kZUlucHV0KG4pfX19LHtrZXk6XCJuZXdcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWgoKShkLmEubWFyayhmdW5jdGlvbiBlKHQpe3ZhciBuLHIsaSxzLG8sYSx1PWFyZ3VtZW50cztyZXR1cm4gZC5hLndyYXAoZnVuY3Rpb24oZSl7Zm9yKDs7KXN3aXRjaChlLnByZXY9ZS5uZXh0KXtjYXNlIDA6aWYobj11Lmxlbmd0aD4xJiZ2b2lkIDAhPT11WzFdP3VbMV06dGhpcy50cm9uV2ViLmRlZmF1bHRQcml2YXRlS2V5LHI9dS5sZW5ndGg+MiYmdm9pZCAwIT09dVsyXSYmdVsyXSxMZS5pc0Z1bmN0aW9uKG4pJiYocj1uLG49dGhpcy50cm9uV2ViLmRlZmF1bHRQcml2YXRlS2V5KSxyKXtlLm5leHQ9NTticmVha31yZXR1cm4gZS5hYnJ1cHQoXCJyZXR1cm5cIix0aGlzLmluamVjdFByb21pc2UodGhpcy5uZXcsdCxuKSk7Y2FzZSA1OnJldHVybiBlLnByZXY9NSxpPXRoaXMudHJvbldlYi5hZGRyZXNzLmZyb21Qcml2YXRlS2V5KG4pLGUubmV4dD05LHRoaXMudHJvbldlYi50cmFuc2FjdGlvbkJ1aWxkZXIuY3JlYXRlU21hcnRDb250cmFjdCh0LGkpO2Nhc2UgOTpyZXR1cm4gcz1lLnNlbnQsZS5uZXh0PTEyLHRoaXMudHJvbldlYi50cnguc2lnbihzLG4pO2Nhc2UgMTI6cmV0dXJuIG89ZS5zZW50LGUubmV4dD0xNSx0aGlzLnRyb25XZWIudHJ4LnNlbmRSYXdUcmFuc2FjdGlvbihvKTtjYXNlIDE1OmlmKCEoYT1lLnNlbnQpLmNvZGUpe2UubmV4dD0xODticmVha31yZXR1cm4gZS5hYnJ1cHQoXCJyZXR1cm5cIixyKHtlcnJvcjphLmNvZGUsbWVzc2FnZTp0aGlzLnRyb25XZWIudG9VdGY4KGEubWVzc2FnZSl9KSk7Y2FzZSAxODpyZXR1cm4gZS5uZXh0PTIwLExlLnNsZWVwKDNlMyk7Y2FzZSAyMDpyZXR1cm4gZS5hYnJ1cHQoXCJyZXR1cm5cIix0aGlzLmF0KG8uY29udHJhY3RfYWRkcmVzcyxyKSk7Y2FzZSAyMzpyZXR1cm4gZS5wcmV2PTIzLGUudDA9ZS5jYXRjaCg1KSxlLmFicnVwdChcInJldHVyblwiLHIoZS50MCkpO2Nhc2UgMjY6Y2FzZVwiZW5kXCI6cmV0dXJuIGUuc3RvcCgpfX0sZSx0aGlzLFtbNSwyM11dKX0pKTtyZXR1cm4gZnVuY3Rpb24odCl7cmV0dXJuIGUuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0oKX0se2tleTpcImF0XCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1oKCkoZC5hLm1hcmsoZnVuY3Rpb24gZSh0KXt2YXIgbixyLGk9YXJndW1lbnRzO3JldHVybiBkLmEud3JhcChmdW5jdGlvbihlKXtmb3IoOzspc3dpdGNoKGUucHJldj1lLm5leHQpe2Nhc2UgMDppZihuPWkubGVuZ3RoPjEmJnZvaWQgMCE9PWlbMV0mJmlbMV0pe2UubmV4dD0zO2JyZWFrfXJldHVybiBlLmFicnVwdChcInJldHVyblwiLHRoaXMuaW5qZWN0UHJvbWlzZSh0aGlzLmF0LHQpKTtjYXNlIDM6cmV0dXJuIGUucHJldj0zLGUubmV4dD02LHRoaXMudHJvbldlYi50cnguZ2V0Q29udHJhY3QodCk7Y2FzZSA2OmlmKChyPWUuc2VudCkuY29udHJhY3RfYWRkcmVzcyl7ZS5uZXh0PTk7YnJlYWt9cmV0dXJuIGUuYWJydXB0KFwicmV0dXJuXCIsbihcIlVua25vd24gZXJyb3I6IFwiK0pTT04uc3RyaW5naWZ5KHIsbnVsbCwyKSkpO2Nhc2UgOTpyZXR1cm4gdGhpcy5hZGRyZXNzPXIuY29udHJhY3RfYWRkcmVzcyx0aGlzLmJ5dGVjb2RlPXIuYnl0ZWNvZGUsdGhpcy5kZXBsb3llZD0hMCx0aGlzLmxvYWRBYmkoci5hYmkuZW50cnlzKSxlLmFicnVwdChcInJldHVyblwiLG4obnVsbCx0aGlzKSk7Y2FzZSAxNjppZihlLnByZXY9MTYsZS50MD1lLmNhdGNoKDMpLCFlLnQwLnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJkb2VzIG5vdCBleGlzdFwiKSl7ZS5uZXh0PTIwO2JyZWFrfXJldHVybiBlLmFicnVwdChcInJldHVyblwiLG4oXCJDb250cmFjdCBoYXMgbm90IGJlZW4gZGVwbG95ZWQgb24gdGhlIG5ldHdvcmtcIikpO2Nhc2UgMjA6cmV0dXJuIGUuYWJydXB0KFwicmV0dXJuXCIsbihlLnQwKSk7Y2FzZSAyMTpjYXNlXCJlbmRcIjpyZXR1cm4gZS5zdG9wKCl9fSxlLHRoaXMsW1szLDE2XV0pfSkpO3JldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gZS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSgpfSx7a2V5OlwiZXZlbnRzXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06e30sdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXSYmYXJndW1lbnRzWzFdO2lmKExlLmlzRnVuY3Rpb24oZSkmJih0PWUsZT17fSksIUxlLmlzRnVuY3Rpb24odCkpdGhyb3cgbmV3IEVycm9yKFwiQ2FsbGJhY2sgZnVuY3Rpb24gZXhwZWN0ZWRcIik7dmFyIG49dGhpcztyZXR1cm57c3RhcnQ6ZnVuY3Rpb24oKXt2YXIgcj1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdO3JldHVybiByPyhuLl9zdGFydEV2ZW50TGlzdGVuZXIoZSx0KS50aGVuKGZ1bmN0aW9uKCl7cigpfSkuY2F0Y2goZnVuY3Rpb24oZSl7cihlKX0pLHRoaXMpOihuLl9zdGFydEV2ZW50TGlzdGVuZXIoZSx0KSx0aGlzKX0sc3RvcDpmdW5jdGlvbigpe24uX3N0b3BFdmVudExpc3RlbmVyKCl9fX19XSksZX0oKSxkdD1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdO2lmKGcoKSh0aGlzLGUpLCF0fHwhdCBpbnN0YW5jZW9mIHB0KXRocm93IG5ldyBFcnJvcihcIkV4cGVjdGVkIGluc3RhbmNlIG9mIFRyb25XZWJcIik7dGhpcy50cm9uV2ViPXQsdGhpcy5wbHVnaW5Ob092ZXJyaWRlPVtcInJlZ2lzdGVyXCJdfXJldHVybiBtKCkoZSxbe2tleTpcInJlZ2lzdGVyXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXt2YXIgbj17cmVxdWlyZXM6XCIwLjAuMFwiLGNvbXBvbmVudHM6e319LHI9e3BsdWdnZWQ6W10sc2tpcHBlZDpbXX0saT1uZXcgZSh0aGlzLnRyb25XZWIpO2lmKExlLmlzRnVuY3Rpb24oaS5wbHVnaW5JbnRlcmZhY2UpJiYobj1pLnBsdWdpbkludGVyZmFjZSh0KSksIVhlLmEuc2F0aXNmaWVzKHB0LnZlcnNpb24sbi5yZXF1aXJlcykpdGhyb3cgbmV3IEVycm9yKFwiVGhlIHBsdWdpbiBpcyBub3QgY29tcGF0aWJsZSB3aXRoIHRoaXMgdmVyc2lvbiBvZiBUcm9uV2ViXCIpO2Zvcih2YXIgcyBpbiBuLmNvbXBvbmVudHMpaWYodGhpcy50cm9uV2ViLmhhc093blByb3BlcnR5KHMpKXt2YXIgbz1uLmNvbXBvbmVudHNbc10sYT10aGlzLnRyb25XZWJbc10ucGx1Z2luTm9PdmVycmlkZXx8W107Zm9yKHZhciB1IGluIG8pXCJjb25zdHJ1Y3RvclwiPT09dXx8dGhpcy50cm9uV2ViW3NdW3VdJiYoYS5pbmNsdWRlcyh1KXx8L15fLy50ZXN0KHUpKT9yLnNraXBwZWQucHVzaCh1KToodGhpcy50cm9uV2ViW3NdW3VdPW9bdV0uYmluZCh0aGlzLnRyb25XZWJbc10pLHIucGx1Z2dlZC5wdXNoKHUpKX1yZXR1cm4gcn19XSksZX0oKSxsdD1uKDIxKSxodD1uLm4obHQpLGZ0PWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSgpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdJiZhcmd1bWVudHNbMF07aWYoZygpKHRoaXMsZSksISh0JiZ0IGluc3RhbmNlb2YgcHQpKXRocm93IG5ldyBFcnJvcihcIkV4cGVjdGVkIGluc3RhbmNlIG9mIFRyb25XZWJcIik7dGhpcy50cm9uV2ViPXQsdGhpcy5pbmplY3RQcm9taXNlPUxlLnByb21pc2VJbmplY3Rvcih0aGlzKX1yZXR1cm4gbSgpKGUsW3trZXk6XCJzZXRTZXJ2ZXJcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMsdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdLG49YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOlwiaGVhbHRoY2hlY2tcIjtpZighdClyZXR1cm4gdGhpcy50cm9uV2ViLmV2ZW50U2VydmVyPSExO2lmKExlLmlzU3RyaW5nKHQpJiYodD1uZXcgemUuSHR0cFByb3ZpZGVyKHQpKSwhdGhpcy50cm9uV2ViLmlzVmFsaWRQcm92aWRlcih0KSl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGV2ZW50IHNlcnZlciBwcm92aWRlZFwiKTt0aGlzLnRyb25XZWIuZXZlbnRTZXJ2ZXI9dCx0aGlzLnRyb25XZWIuZXZlbnRTZXJ2ZXIuaXNDb25uZWN0ZWQ9ZnVuY3Rpb24oKXtyZXR1cm4gZS50cm9uV2ViLmV2ZW50U2VydmVyLnJlcXVlc3QobikudGhlbihmdW5jdGlvbigpe3JldHVybiEwfSkuY2F0Y2goZnVuY3Rpb24oKXtyZXR1cm4hMX0pfX19LHtrZXk6XCJnZXRFdmVudHNCeUNvbnRyYWN0QWRkcmVzc1wiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXSx0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTp7fSxuPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdJiZhcmd1bWVudHNbMl0scj1PYmplY3QuYXNzaWduKHtzaW5jZVRpbWVzdGFtcDowLGV2ZW50TmFtZTohMSxibG9ja051bWJlcjohMSxzaXplOjIwLHBhZ2U6MX0sdCksaT1yLnNpbmNlVGltZXN0YW1wLHM9ci5zaW5jZSxvPXIuZnJvbVRpbWVzdGFtcCxhPXIuZXZlbnROYW1lLHU9ci5ibG9ja051bWJlcixjPXIuc2l6ZSxkPXIucGFnZSxsPXIub25seUNvbmZpcm1lZCxoPXIub25seVVuY29uZmlybWVkLGY9ci5wcmV2aW91c0xhc3RFdmVudEZpbmdlcnByaW50LHA9ci5wcmV2aW91c0ZpbmdlcnByaW50LGc9ci5maW5nZXJwcmludCxiPXIucmF3UmVzcG9uc2UsbT1yLnNvcnQseT1yLmZpbHRlcnM7aWYoIW4pcmV0dXJuIHRoaXMuaW5qZWN0UHJvbWlzZSh0aGlzLmdldEV2ZW50c0J5Q29udHJhY3RBZGRyZXNzLGUsdCk7aWYobz1vfHxpfHxzLCF0aGlzLnRyb25XZWIuZXZlbnRTZXJ2ZXIpcmV0dXJuIG4oXCJObyBldmVudCBzZXJ2ZXIgY29uZmlndXJlZFwiKTt2YXIgaz1bXTtpZighdGhpcy50cm9uV2ViLmlzQWRkcmVzcyhlKSlyZXR1cm4gbihcIkludmFsaWQgY29udHJhY3QgYWRkcmVzcyBwcm92aWRlZFwiKTtpZihhJiYhZSlyZXR1cm4gbihcIlVzYWdlIG9mIGV2ZW50IG5hbWUgZmlsdGVyaW5nIHJlcXVpcmVzIGEgY29udHJhY3QgYWRkcmVzc1wiKTtpZih2b2lkIDAhPT1vJiYhTGUuaXNJbnRlZ2VyKG8pKXJldHVybiBuKFwiSW52YWxpZCBmcm9tVGltZXN0YW1wIHByb3ZpZGVkXCIpO2lmKCFMZS5pc0ludGVnZXIoYykpcmV0dXJuIG4oXCJJbnZhbGlkIHNpemUgcHJvdmlkZWRcIik7aWYoYz4yMDAmJihjb25zb2xlLndhcm4oXCJEZWZhdWx0aW5nIHRvIG1heGltdW0gYWNjZXB0ZWQgc2l6ZTogMjAwXCIpLGM9MjAwKSwhTGUuaXNJbnRlZ2VyKGQpKXJldHVybiBuKFwiSW52YWxpZCBwYWdlIHByb3ZpZGVkXCIpO2lmKHUmJiFhKXJldHVybiBuKFwiVXNhZ2Ugb2YgYmxvY2sgbnVtYmVyIGZpbHRlcmluZyByZXF1aXJlcyBhbiBldmVudCBuYW1lXCIpO2UmJmsucHVzaCh0aGlzLnRyb25XZWIuYWRkcmVzcy5mcm9tSGV4KGUpKSxhJiZrLnB1c2goYSksdSYmay5wdXNoKHUpO3ZhciB4PXtzaXplOmMscGFnZTpkfTtyZXR1cm5cIm9iamVjdFwiPT09digpKHkpJiZPYmplY3Qua2V5cyh5KS5sZW5ndGg+MCYmKHguZmlsdGVycz1KU09OLnN0cmluZ2lmeSh5KSksbyYmKHguZnJvbVRpbWVzdGFtcD14LnNpbmNlPW8pLGwmJih4Lm9ubHlDb25maXJtZWQ9bCksaCYmIWwmJih4Lm9ubHlVbmNvbmZpcm1lZD1oKSxtJiYoeC5zb3J0PW0pLChnPWd8fHB8fGYpJiYoeC5maW5nZXJwcmludD1nKSx0aGlzLnRyb25XZWIuZXZlbnRTZXJ2ZXIucmVxdWVzdChcImV2ZW50L2NvbnRyYWN0L1wiLmNvbmNhdChrLmpvaW4oXCIvXCIpLFwiP1wiKS5jb25jYXQoaHQuYS5zdHJpbmdpZnkoeCkpKS50aGVuKGZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXTtyZXR1cm4gZT9MZS5pc0FycmF5KGUpP24obnVsbCwhMD09PWI/ZTplLm1hcChmdW5jdGlvbihlKXtyZXR1cm4gTGUubWFwRXZlbnQoZSl9KSk6bihlKTpuKFwiVW5rbm93biBlcnJvciBvY2N1cnJlZFwiKX0pLmNhdGNoKGZ1bmN0aW9uKGUpe3JldHVybiBuKGUucmVzcG9uc2UmJmUucmVzcG9uc2UuZGF0YXx8ZSl9KX19LHtrZXk6XCJnZXRFdmVudHNCeVRyYW5zYWN0aW9uSURcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdJiZhcmd1bWVudHNbMF0sdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06e30sbj1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXSYmYXJndW1lbnRzWzJdO3JldHVybiBMZS5pc0Z1bmN0aW9uKHQpJiYobj10LHQ9e30pLG4/dGhpcy50cm9uV2ViLmV2ZW50U2VydmVyP3RoaXMudHJvbldlYi5ldmVudFNlcnZlci5yZXF1ZXN0KFwiZXZlbnQvdHJhbnNhY3Rpb24vXCIuY29uY2F0KGUpKS50aGVuKGZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXTtyZXR1cm4gZT9MZS5pc0FycmF5KGUpP24obnVsbCwhMD09PXQucmF3UmVzcG9uc2U/ZTplLm1hcChmdW5jdGlvbihlKXtyZXR1cm4gTGUubWFwRXZlbnQoZSl9KSk6bihlKTpuKFwiVW5rbm93biBlcnJvciBvY2N1cnJlZFwiKX0pLmNhdGNoKGZ1bmN0aW9uKGUpe3JldHVybiBuKGUucmVzcG9uc2UmJmUucmVzcG9uc2UuZGF0YXx8ZSl9KTpuKFwiTm8gZXZlbnQgc2VydmVyIGNvbmZpZ3VyZWRcIik6dGhpcy5pbmplY3RQcm9taXNlKHRoaXMuZ2V0RXZlbnRzQnlUcmFuc2FjdGlvbklELGUsdCl9fV0pLGV9KCk7bi5kKHQsXCJkZWZhdWx0XCIsZnVuY3Rpb24oKXtyZXR1cm4gcHR9KTt2YXIgdnQ9XCIzLjUuMFwiLHB0PWZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQoKXt2YXIgZSxuLHI9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXSxpPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdJiZhcmd1bWVudHNbMV0scz1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXSYmYXJndW1lbnRzWzJdLG89YXJndW1lbnRzLmxlbmd0aD4zJiZ2b2lkIDAhPT1hcmd1bWVudHNbM10mJmFyZ3VtZW50c1szXTtyZXR1cm4gZygpKHRoaXMsdCksZT1rKCkodGhpcyx3KCkodCkuY2FsbCh0aGlzKSksXCJvYmplY3RcIj09PXYoKShyKSYmKHIuZnVsbE5vZGV8fHIuZnVsbEhvc3QpPyhuPXIuZnVsbE5vZGV8fHIuZnVsbEhvc3QsaT1yLnNvbGlkaXR5Tm9kZXx8ci5mdWxsSG9zdCxzPXIuZXZlbnRTZXJ2ZXJ8fHIuZnVsbEhvc3Qsbz1yLnByaXZhdGVLZXkpOm49cixMZS5pc1N0cmluZyhuKSYmKG49bmV3IHplLkh0dHBQcm92aWRlcihuKSksTGUuaXNTdHJpbmcoaSkmJihpPW5ldyB6ZS5IdHRwUHJvdmlkZXIoaSkpLExlLmlzU3RyaW5nKHMpJiYocz1uZXcgemUuSHR0cFByb3ZpZGVyKHMpKSxlLmV2ZW50PW5ldyBmdChXKCkoZSkpLGUudHJhbnNhY3Rpb25CdWlsZGVyPW5ldyBydChXKCkoZSkpLGUudHJ4PW5ldyBpdChXKCkoZSkpLGUucGx1Z2luPW5ldyBkdChXKCkoZSkpLGUudXRpbHM9TGUsZS5zZXRGdWxsTm9kZShuKSxlLnNldFNvbGlkaXR5Tm9kZShpKSxlLnNldEV2ZW50U2VydmVyKHMpLGUucHJvdmlkZXJzPXplLGUuQmlnTnVtYmVyPVZlLmEsZS5kZWZhdWx0QmxvY2s9ITEsZS5kZWZhdWx0UHJpdmF0ZUtleT0hMSxlLmRlZmF1bHRBZGRyZXNzPXtoZXg6ITEsYmFzZTU4OiExfSxbXCJzaGEzXCIsXCJ0b0hleFwiLFwidG9VdGY4XCIsXCJmcm9tVXRmOFwiLFwidG9Bc2NpaVwiLFwiZnJvbUFzY2lpXCIsXCJ0b0RlY2ltYWxcIixcImZyb21EZWNpbWFsXCIsXCJ0b1N1blwiLFwiZnJvbVN1blwiLFwidG9CaWdOdW1iZXJcIixcImlzQWRkcmVzc1wiLFwiY3JlYXRlQWNjb3VudFwiLFwiYWRkcmVzc1wiLFwidmVyc2lvblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG4pe2Vbbl09dFtuXX0pLG8mJmUuc2V0UHJpdmF0ZUtleShvKSxlLmZ1bGxub2RlVmVyc2lvbj12dCxlLmluamVjdFByb21pc2U9TGUucHJvbWlzZUluamVjdG9yKFcoKShlKSksZX1yZXR1cm4gUCgpKHQsZSksbSgpKHQsW3trZXk6XCJnZXRGdWxsbm9kZVZlcnNpb25cIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWgoKShkLmEubWFyayhmdW5jdGlvbiBlKCl7dmFyIHQ7cmV0dXJuIGQuYS53cmFwKGZ1bmN0aW9uKGUpe2Zvcig7Oylzd2l0Y2goZS5wcmV2PWUubmV4dCl7Y2FzZSAwOnJldHVybiBlLnByZXY9MCxlLm5leHQ9Myx0aGlzLnRyeC5nZXROb2RlSW5mbygpO2Nhc2UgMzp0PWUuc2VudCx0aGlzLmZ1bGxub2RlVmVyc2lvbj10LmNvbmZpZ05vZGVJbmZvLmNvZGVWZXJzaW9uLDI9PT10aGlzLmZ1bGxub2RlVmVyc2lvbi5zcGxpdChcIi5cIikubGVuZ3RoJiYodGhpcy5mdWxsbm9kZVZlcnNpb24rPVwiLjBcIiksZS5uZXh0PTExO2JyZWFrO2Nhc2UgODplLnByZXY9OCxlLnQwPWUuY2F0Y2goMCksdGhpcy5mdWxsbm9kZVZlcnNpb249dnQ7Y2FzZSAxMTpjYXNlXCJlbmRcIjpyZXR1cm4gZS5zdG9wKCl9fSxlLHRoaXMsW1swLDhdXSl9KSk7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGUuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0oKX0se2tleTpcInNldERlZmF1bHRCbG9ja1wiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXTtpZihbITEsXCJsYXRlc3RcIixcImVhcmxpZXN0XCIsMF0uaW5jbHVkZXMoZSkpcmV0dXJuIHRoaXMuZGVmYXVsdEJsb2NrPWU7aWYoIUxlLmlzSW50ZWdlcihlKXx8IWUpdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBibG9jayBJRCBwcm92aWRlZFwiKTt0aGlzLmRlZmF1bHRCbG9jaz1NYXRoLmFicyhlKX19LHtrZXk6XCJzZXRQcml2YXRlS2V5XCIsdmFsdWU6ZnVuY3Rpb24oZSl7dHJ5e3RoaXMuc2V0QWRkcmVzcyh0aGlzLmFkZHJlc3MuZnJvbVByaXZhdGVLZXkoZSkpfWNhdGNoKGUpe3Rocm93IG5ldyBFcnJvcihcIkludmFsaWQgcHJpdmF0ZSBrZXkgcHJvdmlkZWRcIil9dGhpcy5kZWZhdWx0UHJpdmF0ZUtleT1lLHRoaXMuZW1pdChcInByaXZhdGVLZXlDaGFuZ2VkXCIsZSl9fSx7a2V5Olwic2V0QWRkcmVzc1wiLHZhbHVlOmZ1bmN0aW9uKGUpe2lmKCF0aGlzLmlzQWRkcmVzcyhlKSl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGFkZHJlc3MgcHJvdmlkZWRcIik7dmFyIHQ9dGhpcy5hZGRyZXNzLnRvSGV4KGUpLG49dGhpcy5hZGRyZXNzLmZyb21IZXgoZSk7dGhpcy5kZWZhdWx0UHJpdmF0ZUtleSYmdGhpcy5hZGRyZXNzLmZyb21Qcml2YXRlS2V5KHRoaXMuZGVmYXVsdFByaXZhdGVLZXkpIT09biYmKHRoaXMuZGVmYXVsdFByaXZhdGVLZXk9ITEpLHRoaXMuZGVmYXVsdEFkZHJlc3M9e2hleDp0LGJhc2U1ODpufSx0aGlzLmVtaXQoXCJhZGRyZXNzQ2hhbmdlZFwiLHtoZXg6dCxiYXNlNTg6bn0pfX0se2tleTpcImZ1bGxub2RlU2F0aXNmaWVzXCIsdmFsdWU6ZnVuY3Rpb24oZSl7cmV0dXJuIFhlLmEuc2F0aXNmaWVzKHRoaXMuZnVsbG5vZGVWZXJzaW9uLGUpfX0se2tleTpcImlzVmFsaWRQcm92aWRlclwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiBPYmplY3QudmFsdWVzKHplKS5zb21lKGZ1bmN0aW9uKHQpe3JldHVybiBlIGluc3RhbmNlb2YgdH0pfX0se2tleTpcInNldEZ1bGxOb2RlXCIsdmFsdWU6ZnVuY3Rpb24oZSl7aWYoTGUuaXNTdHJpbmcoZSkmJihlPW5ldyB6ZS5IdHRwUHJvdmlkZXIoZSkpLCF0aGlzLmlzVmFsaWRQcm92aWRlcihlKSl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGZ1bGwgbm9kZSBwcm92aWRlZFwiKTt0aGlzLmZ1bGxOb2RlPWUsdGhpcy5mdWxsTm9kZS5zZXRTdGF0dXNQYWdlKFwid2FsbGV0L2dldG5vd2Jsb2NrXCIpLHRoaXMuZ2V0RnVsbG5vZGVWZXJzaW9uKCl9fSx7a2V5Olwic2V0U29saWRpdHlOb2RlXCIsdmFsdWU6ZnVuY3Rpb24oZSl7aWYoTGUuaXNTdHJpbmcoZSkmJihlPW5ldyB6ZS5IdHRwUHJvdmlkZXIoZSkpLCF0aGlzLmlzVmFsaWRQcm92aWRlcihlKSl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHNvbGlkaXR5IG5vZGUgcHJvdmlkZWRcIik7dGhpcy5zb2xpZGl0eU5vZGU9ZSx0aGlzLnNvbGlkaXR5Tm9kZS5zZXRTdGF0dXNQYWdlKFwid2FsbGV0c29saWRpdHkvZ2V0bm93YmxvY2tcIil9fSx7a2V5Olwic2V0RXZlbnRTZXJ2ZXJcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlOyhlPXRoaXMuZXZlbnQpLnNldFNlcnZlci5hcHBseShlLGFyZ3VtZW50cyl9fSx7a2V5OlwiY3VycmVudFByb3ZpZGVyc1wiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJue2Z1bGxOb2RlOnRoaXMuZnVsbE5vZGUsc29saWRpdHlOb2RlOnRoaXMuc29saWRpdHlOb2RlLGV2ZW50U2VydmVyOnRoaXMuZXZlbnRTZXJ2ZXJ9fX0se2tleTpcImN1cnJlbnRQcm92aWRlclwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY3VycmVudFByb3ZpZGVycygpfX0se2tleTpcImdldEV2ZW50UmVzdWx0XCIsdmFsdWU6ZnVuY3Rpb24oKXtmb3IodmFyIGUsdD1hcmd1bWVudHMubGVuZ3RoLG49bmV3IEFycmF5KHQpLHI9MDtyPHQ7cisrKW5bcl09YXJndW1lbnRzW3JdO3JldHVyblwib2JqZWN0XCIhPT12KCkoblsxXSkmJihuWzFdPXtzaW5jZVRpbWVzdGFtcDpuWzFdfHwwLGV2ZW50TmFtZTpuWzJdfHwhMSxibG9ja051bWJlcjpuWzNdfHwhMSxzaXplOm5bNF18fDIwLHBhZ2U6bls1XXx8MX0sbi5zcGxpY2UoMiw0KSxMZS5pc0Z1bmN0aW9uKG5bMl0pfHwoTGUuaXNGdW5jdGlvbihuWzFdLnBhZ2UpPyhuWzJdPW5bMV0ucGFnZSxuWzFdLnBhZ2U9MSk6TGUuaXNGdW5jdGlvbihuWzFdLnNpemUpJiYoblsyXT1uWzFdLnNpemUsblsxXS5zaXplPTIwLG5bMV0ucGFnZT0xKSkpLChlPXRoaXMuZXZlbnQpLmdldEV2ZW50c0J5Q29udHJhY3RBZGRyZXNzLmFwcGx5KGUsbil9fSx7a2V5OlwiZ2V0RXZlbnRCeVRyYW5zYWN0aW9uSURcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlO3JldHVybihlPXRoaXMuZXZlbnQpLmdldEV2ZW50c0J5VHJhbnNhY3Rpb25JRC5hcHBseShlLGFyZ3VtZW50cyl9fSx7a2V5OlwiY29udHJhY3RcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTpbXSx0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdJiZhcmd1bWVudHNbMV07cmV0dXJuIG5ldyBjdCh0aGlzLGUsdCl9fSx7a2V5OlwiaXNDb25uZWN0ZWRcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWgoKShkLmEubWFyayhmdW5jdGlvbiBlKCl7dmFyIHQsbj1hcmd1bWVudHM7cmV0dXJuIGQuYS53cmFwKGZ1bmN0aW9uKGUpe2Zvcig7Oylzd2l0Y2goZS5wcmV2PWUubmV4dCl7Y2FzZSAwOmlmKHQ9bi5sZW5ndGg+MCYmdm9pZCAwIT09blswXSYmblswXSl7ZS5uZXh0PTM7YnJlYWt9cmV0dXJuIGUuYWJydXB0KFwicmV0dXJuXCIsdGhpcy5pbmplY3RQcm9taXNlKHRoaXMuaXNDb25uZWN0ZWQpKTtjYXNlIDM6cmV0dXJuIGUudDA9dCxlLm5leHQ9Nix0aGlzLmZ1bGxOb2RlLmlzQ29ubmVjdGVkKCk7Y2FzZSA2OnJldHVybiBlLnQxPWUuc2VudCxlLm5leHQ9OSx0aGlzLnNvbGlkaXR5Tm9kZS5pc0Nvbm5lY3RlZCgpO2Nhc2UgOTppZihlLnQyPWUuc2VudCxlLnQzPXRoaXMuZXZlbnRTZXJ2ZXIsIWUudDMpe2UubmV4dD0xNTticmVha31yZXR1cm4gZS5uZXh0PTE0LHRoaXMuZXZlbnRTZXJ2ZXIuaXNDb25uZWN0ZWQoKTtjYXNlIDE0OmUudDM9ZS5zZW50O2Nhc2UgMTU6cmV0dXJuIGUudDQ9ZS50MyxlLnQ1PXtmdWxsTm9kZTplLnQxLHNvbGlkaXR5Tm9kZTplLnQyLGV2ZW50U2VydmVyOmUudDR9LGUuYWJydXB0KFwicmV0dXJuXCIsKDAsZS50MCkobnVsbCxlLnQ1KSk7Y2FzZSAxODpjYXNlXCJlbmRcIjpyZXR1cm4gZS5zdG9wKCl9fSxlLHRoaXMpfSkpO3JldHVybiBmdW5jdGlvbigpe3JldHVybiBlLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19KCl9XSxbe2tleTpcInNoYTNcIix2YWx1ZTpmdW5jdGlvbihlKXtyZXR1cm4oIShhcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXSl8fGFyZ3VtZW50c1sxXT9cIjB4XCI6XCJcIikrY2UoQnVmZmVyLmZyb20oZSxcInV0Zi04XCIpKS50b1N0cmluZygpLnN1YnN0cmluZygyKX19LHtrZXk6XCJ0b0hleFwiLHZhbHVlOmZ1bmN0aW9uKGUpe2lmKExlLmlzQm9vbGVhbihlKSlyZXR1cm4gdC5mcm9tRGVjaW1hbCgrZSk7aWYoTGUuaXNCaWdOdW1iZXIoZSkpcmV0dXJuIHQuZnJvbURlY2ltYWwoZSk7aWYoXCJvYmplY3RcIj09PXYoKShlKSlyZXR1cm4gdC5mcm9tVXRmOChKU09OLnN0cmluZ2lmeShlKSk7aWYoTGUuaXNTdHJpbmcoZSkpe2lmKC9eKC18KTB4Ly50ZXN0KGUpKXJldHVybiBlO2lmKCFpc0Zpbml0ZShlKSlyZXR1cm4gdC5mcm9tVXRmOChlKX12YXIgbj10LmZyb21EZWNpbWFsKGUpO2lmKFwiMHhOYU5cIj09PW4pdGhyb3cgbmV3IEVycm9yKFwiVGhlIHBhc3NlZCB2YWx1ZSBpcyBub3QgY29udmVydGlibGUgdG8gYSBoZXggc3RyaW5nXCIpO3JldHVybiBufX0se2tleTpcInRvVXRmOFwiLHZhbHVlOmZ1bmN0aW9uKGUpe2lmKExlLmlzSGV4KGUpKXJldHVybiBlPWUucmVwbGFjZSgvXjB4LyxcIlwiKSxCdWZmZXIuZnJvbShlLFwiaGV4XCIpLnRvU3RyaW5nKFwidXRmOFwiKTt0aHJvdyBuZXcgRXJyb3IoXCJUaGUgcGFzc2VkIHZhbHVlIGlzIG5vdCBhIHZhbGlkIGhleCBzdHJpbmdcIil9fSx7a2V5OlwiZnJvbVV0ZjhcIix2YWx1ZTpmdW5jdGlvbihlKXtpZighTGUuaXNTdHJpbmcoZSkpdGhyb3cgbmV3IEVycm9yKFwiVGhlIHBhc3NlZCB2YWx1ZSBpcyBub3QgYSB2YWxpZCB1dGYtOCBzdHJpbmdcIik7cmV0dXJuXCIweFwiK0J1ZmZlci5mcm9tKGUsXCJ1dGY4XCIpLnRvU3RyaW5nKFwiaGV4XCIpfX0se2tleTpcInRvQXNjaWlcIix2YWx1ZTpmdW5jdGlvbihlKXtpZihMZS5pc0hleChlKSl7dmFyIHQ9XCJcIixuPTAscj1lLmxlbmd0aDtmb3IoXCIweFwiPT09ZS5zdWJzdHJpbmcoMCwyKSYmKG49Mik7bjxyO24rPTIpe3ZhciBpPXBhcnNlSW50KGUuc3Vic3RyKG4sMiksMTYpO3QrPVN0cmluZy5mcm9tQ2hhckNvZGUoaSl9cmV0dXJuIHR9dGhyb3cgbmV3IEVycm9yKFwiVGhlIHBhc3NlZCB2YWx1ZSBpcyBub3QgYSB2YWxpZCBoZXggc3RyaW5nXCIpfX0se2tleTpcImZyb21Bc2NpaVwiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7aWYoIUxlLmlzU3RyaW5nKGUpKXRocm93IG5ldyBFcnJvcihcIlRoZSBwYXNzZWQgdmFsdWUgaXMgbm90IGEgdmFsaWQgdXRmLTggc3RyaW5nXCIpO3JldHVyblwiMHhcIitCdWZmZXIuZnJvbShlLFwiYXNjaWlcIikudG9TdHJpbmcoXCJoZXhcIikucGFkRW5kKHQsXCIwXCIpfX0se2tleTpcInRvRGVjaW1hbFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiB0LnRvQmlnTnVtYmVyKGUpLnRvTnVtYmVyKCl9fSx7a2V5OlwiZnJvbURlY2ltYWxcIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgbj10LnRvQmlnTnVtYmVyKGUpLHI9bi50b1N0cmluZygxNik7cmV0dXJuIG4uaXNMZXNzVGhhbigwKT9cIi0weFwiK3Iuc3Vic3RyKDEpOlwiMHhcIityfX0se2tleTpcImZyb21TdW5cIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgbj10LnRvQmlnTnVtYmVyKGUpLmRpdigxZTYpO3JldHVybiBMZS5pc0JpZ051bWJlcihlKT9uOm4udG9TdHJpbmcoMTApfX0se2tleTpcInRvU3VuXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIG49dC50b0JpZ051bWJlcihlKS50aW1lcygxZTYpO3JldHVybiBMZS5pc0JpZ051bWJlcihlKT9uOm4udG9TdHJpbmcoMTApfX0se2tleTpcInRvQmlnTnVtYmVyXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06MDtyZXR1cm4gTGUuaXNCaWdOdW1iZXIoZSk/ZTpMZS5pc1N0cmluZyhlKSYmL14oLXwpMHgvLnRlc3QoZSk/bmV3IFZlLmEoZS5yZXBsYWNlKFwiMHhcIixcIlwiKSwxNik6bmV3IFZlLmEoZS50b1N0cmluZygxMCksMTApfX0se2tleTpcImlzQWRkcmVzc1wiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXTtpZighTGUuaXNTdHJpbmcoZSkpcmV0dXJuITE7aWYoNDI9PT1lLmxlbmd0aCl0cnl7cmV0dXJuIHQuaXNBZGRyZXNzKExlLmNyeXB0by5nZXRCYXNlNThDaGVja0FkZHJlc3MoTGUuY29kZS5oZXhTdHIyYnl0ZUFycmF5KGUpKSl9Y2F0Y2goZSl7cmV0dXJuITF9dHJ5e3JldHVybiBMZS5jcnlwdG8uaXNBZGRyZXNzVmFsaWQoZSl9Y2F0Y2goZSl7cmV0dXJuITF9fX0se2tleTpcImNyZWF0ZUFjY291bnRcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWgoKShkLmEubWFyayhmdW5jdGlvbiBlKCl7dmFyIHQ7cmV0dXJuIGQuYS53cmFwKGZ1bmN0aW9uKGUpe2Zvcig7Oylzd2l0Y2goZS5wcmV2PWUubmV4dCl7Y2FzZSAwOnJldHVybiB0PUxlLmFjY291bnRzLmdlbmVyYXRlQWNjb3VudCgpLGUuYWJydXB0KFwicmV0dXJuXCIsdCk7Y2FzZSAyOmNhc2VcImVuZFwiOnJldHVybiBlLnN0b3AoKX19LGUpfSkpO3JldHVybiBmdW5jdGlvbigpe3JldHVybiBlLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19KCl9LHtrZXk6XCJhZGRyZXNzXCIsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJue2Zyb21IZXg6ZnVuY3Rpb24oZSl7cmV0dXJuIExlLmlzSGV4KGUpP0xlLmNyeXB0by5nZXRCYXNlNThDaGVja0FkZHJlc3MoTGUuY29kZS5oZXhTdHIyYnl0ZUFycmF5KGUucmVwbGFjZSgvXjB4LyxVKSkpOmV9LHRvSGV4OmZ1bmN0aW9uKGUpe3JldHVybiBMZS5pc0hleChlKT9lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXjB4LyxVKTpMZS5jb2RlLmJ5dGVBcnJheTJoZXhTdHIoTGUuY3J5cHRvLmRlY29kZUJhc2U1OEFkZHJlc3MoZSkpLnRvTG93ZXJDYXNlKCl9LGZyb21Qcml2YXRlS2V5OmZ1bmN0aW9uKGUpe3RyeXtyZXR1cm4gTGUuY3J5cHRvLnBrVG9BZGRyZXNzKGUpfWNhdGNoKGUpe3JldHVybiExfX19fX1dKSx0fShKZS5hKTtOKCkocHQsXCJwcm92aWRlcnNcIix6ZSksTigpKHB0LFwiQmlnTnVtYmVyXCIsVmUuYSksTigpKHB0LFwiVHJhbnNhY3Rpb25CdWlsZGVyXCIscnQpLE4oKShwdCxcIlRyeFwiLGl0KSxOKCkocHQsXCJDb250cmFjdFwiLGN0KSxOKCkocHQsXCJQbHVnaW5cIixkdCksTigpKHB0LFwiRXZlbnRcIixmdCksTigpKHB0LFwidmVyc2lvblwiLEdlLmEpLE4oKShwdCxcInV0aWxzXCIsTGUpfV0pLmRlZmF1bHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Ucm9uV2ViLm5vZGUuanMubWFwIiwidmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ2J1ZmZlcicpLkJ1ZmZlclxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChidWYpIHtcblx0Ly8gSWYgdGhlIGJ1ZmZlciBpcyBiYWNrZWQgYnkgYSBVaW50OEFycmF5LCBhIGZhc3RlciB2ZXJzaW9uIHdpbGwgd29ya1xuXHRpZiAoYnVmIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuXHRcdC8vIElmIHRoZSBidWZmZXIgaXNuJ3QgYSBzdWJhcnJheSwgcmV0dXJuIHRoZSB1bmRlcmx5aW5nIEFycmF5QnVmZmVyXG5cdFx0aWYgKGJ1Zi5ieXRlT2Zmc2V0ID09PSAwICYmIGJ1Zi5ieXRlTGVuZ3RoID09PSBidWYuYnVmZmVyLmJ5dGVMZW5ndGgpIHtcblx0XHRcdHJldHVybiBidWYuYnVmZmVyXG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgYnVmLmJ1ZmZlci5zbGljZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0Ly8gT3RoZXJ3aXNlIHdlIG5lZWQgdG8gZ2V0IGEgcHJvcGVyIGNvcHlcblx0XHRcdHJldHVybiBidWYuYnVmZmVyLnNsaWNlKGJ1Zi5ieXRlT2Zmc2V0LCBidWYuYnl0ZU9mZnNldCArIGJ1Zi5ieXRlTGVuZ3RoKVxuXHRcdH1cblx0fVxuXG5cdGlmIChCdWZmZXIuaXNCdWZmZXIoYnVmKSkge1xuXHRcdC8vIFRoaXMgaXMgdGhlIHNsb3cgdmVyc2lvbiB0aGF0IHdpbGwgd29yayB3aXRoIGFueSBCdWZmZXJcblx0XHQvLyBpbXBsZW1lbnRhdGlvbiAoZXZlbiBpbiBvbGQgYnJvd3NlcnMpXG5cdFx0dmFyIGFycmF5Q29weSA9IG5ldyBVaW50OEFycmF5KGJ1Zi5sZW5ndGgpXG5cdFx0dmFyIGxlbiA9IGJ1Zi5sZW5ndGhcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRhcnJheUNvcHlbaV0gPSBidWZbaV1cblx0XHR9XG5cdFx0cmV0dXJuIGFycmF5Q29weS5idWZmZXJcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuXHR9XG59XG4iLCI7KGZ1bmN0aW9uIChnbG9iYWxPYmplY3QpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4vKlxyXG4gKiAgICAgIGJpZ251bWJlci5qcyB2Ny4yLjFcclxuICogICAgICBBIEphdmFTY3JpcHQgbGlicmFyeSBmb3IgYXJiaXRyYXJ5LXByZWNpc2lvbiBhcml0aG1ldGljLlxyXG4gKiAgICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWtlTWNsL2JpZ251bWJlci5qc1xyXG4gKiAgICAgIENvcHlyaWdodCAoYykgMjAxOCBNaWNoYWVsIE1jbGF1Z2hsaW4gPE04Y2g4OGxAZ21haWwuY29tPlxyXG4gKiAgICAgIE1JVCBMaWNlbnNlZC5cclxuICpcclxuICogICAgICBCaWdOdW1iZXIucHJvdG90eXBlIG1ldGhvZHMgICAgIHwgIEJpZ051bWJlciBtZXRob2RzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XHJcbiAqICAgICAgYWJzb2x1dGVWYWx1ZSAgICAgICAgICAgIGFicyAgICB8ICBjbG9uZVxyXG4gKiAgICAgIGNvbXBhcmVkVG8gICAgICAgICAgICAgICAgICAgICAgfCAgY29uZmlnICAgICAgICAgICAgICAgc2V0XHJcbiAqICAgICAgZGVjaW1hbFBsYWNlcyAgICAgICAgICAgIGRwICAgICB8ICAgICAgREVDSU1BTF9QTEFDRVNcclxuICogICAgICBkaXZpZGVkQnkgICAgICAgICAgICAgICAgZGl2ICAgIHwgICAgICBST1VORElOR19NT0RFXHJcbiAqICAgICAgZGl2aWRlZFRvSW50ZWdlckJ5ICAgICAgIGlkaXYgICB8ICAgICAgRVhQT05FTlRJQUxfQVRcclxuICogICAgICBleHBvbmVudGlhdGVkQnkgICAgICAgICAgcG93ICAgIHwgICAgICBSQU5HRVxyXG4gKiAgICAgIGludGVnZXJWYWx1ZSAgICAgICAgICAgICAgICAgICAgfCAgICAgIENSWVBUT1xyXG4gKiAgICAgIGlzRXF1YWxUbyAgICAgICAgICAgICAgICBlcSAgICAgfCAgICAgIE1PRFVMT19NT0RFXHJcbiAqICAgICAgaXNGaW5pdGUgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgUE9XX1BSRUNJU0lPTlxyXG4gKiAgICAgIGlzR3JlYXRlclRoYW4gICAgICAgICAgICBndCAgICAgfCAgICAgIEZPUk1BVFxyXG4gKiAgICAgIGlzR3JlYXRlclRoYW5PckVxdWFsVG8gICBndGUgICAgfCAgICAgIEFMUEhBQkVUXHJcbiAqICAgICAgaXNJbnRlZ2VyICAgICAgICAgICAgICAgICAgICAgICB8ICBpc0JpZ051bWJlclxyXG4gKiAgICAgIGlzTGVzc1RoYW4gICAgICAgICAgICAgICBsdCAgICAgfCAgbWF4aW11bSAgICAgICAgICAgICAgbWF4XHJcbiAqICAgICAgaXNMZXNzVGhhbk9yRXF1YWxUbyAgICAgIGx0ZSAgICB8ICBtaW5pbXVtICAgICAgICAgICAgICBtaW5cclxuICogICAgICBpc05hTiAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgIHJhbmRvbVxyXG4gKiAgICAgIGlzTmVnYXRpdmUgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIGlzUG9zaXRpdmUgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIGlzWmVybyAgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIG1pbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIG1vZHVsbyAgICAgICAgICAgICAgICAgICBtb2QgICAgfFxyXG4gKiAgICAgIG11bHRpcGxpZWRCeSAgICAgICAgICAgICB0aW1lcyAgfFxyXG4gKiAgICAgIG5lZ2F0ZWQgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHBsdXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHByZWNpc2lvbiAgICAgICAgICAgICAgICBzZCAgICAgfFxyXG4gKiAgICAgIHNoaWZ0ZWRCeSAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHNxdWFyZVJvb3QgICAgICAgICAgICAgICBzcXJ0ICAgfFxyXG4gKiAgICAgIHRvRXhwb25lbnRpYWwgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHRvRml4ZWQgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHRvRm9ybWF0ICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHRvRnJhY3Rpb24gICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHRvSlNPTiAgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHRvTnVtYmVyICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHRvUHJlY2lzaW9uICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHRvU3RyaW5nICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHZhbHVlT2YgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKlxyXG4gKi9cclxuXHJcblxyXG4gIHZhciBCaWdOdW1iZXIsXHJcbiAgICBpc051bWVyaWMgPSAvXi0/KD86XFxkKyg/OlxcLlxcZCopP3xcXC5cXGQrKSg/OmVbKy1dP1xcZCspPyQvaSxcclxuXHJcbiAgICBtYXRoY2VpbCA9IE1hdGguY2VpbCxcclxuICAgIG1hdGhmbG9vciA9IE1hdGguZmxvb3IsXHJcblxyXG4gICAgYmlnbnVtYmVyRXJyb3IgPSAnW0JpZ051bWJlciBFcnJvcl0gJyxcclxuICAgIHRvb01hbnlEaWdpdHMgPSBiaWdudW1iZXJFcnJvciArICdOdW1iZXIgcHJpbWl0aXZlIGhhcyBtb3JlIHRoYW4gMTUgc2lnbmlmaWNhbnQgZGlnaXRzOiAnLFxyXG5cclxuICAgIEJBU0UgPSAxZTE0LFxyXG4gICAgTE9HX0JBU0UgPSAxNCxcclxuICAgIE1BWF9TQUZFX0lOVEVHRVIgPSAweDFmZmZmZmZmZmZmZmZmLCAgICAgICAgIC8vIDJeNTMgLSAxXHJcbiAgICAvLyBNQVhfSU5UMzIgPSAweDdmZmZmZmZmLCAgICAgICAgICAgICAgICAgICAvLyAyXjMxIC0gMVxyXG4gICAgUE9XU19URU4gPSBbMSwgMTAsIDEwMCwgMWUzLCAxZTQsIDFlNSwgMWU2LCAxZTcsIDFlOCwgMWU5LCAxZTEwLCAxZTExLCAxZTEyLCAxZTEzXSxcclxuICAgIFNRUlRfQkFTRSA9IDFlNyxcclxuXHJcbiAgICAvLyBFRElUQUJMRVxyXG4gICAgLy8gVGhlIGxpbWl0IG9uIHRoZSB2YWx1ZSBvZiBERUNJTUFMX1BMQUNFUywgVE9fRVhQX05FRywgVE9fRVhQX1BPUywgTUlOX0VYUCwgTUFYX0VYUCwgYW5kXHJcbiAgICAvLyB0aGUgYXJndW1lbnRzIHRvIHRvRXhwb25lbnRpYWwsIHRvRml4ZWQsIHRvRm9ybWF0LCBhbmQgdG9QcmVjaXNpb24uXHJcbiAgICBNQVggPSAxRTk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAwIHRvIE1BWF9JTlQzMlxyXG5cclxuXHJcbiAgLypcclxuICAgKiBDcmVhdGUgYW5kIHJldHVybiBhIEJpZ051bWJlciBjb25zdHJ1Y3Rvci5cclxuICAgKi9cclxuICBmdW5jdGlvbiBjbG9uZShjb25maWdPYmplY3QpIHtcclxuICAgIHZhciBkaXYsIGNvbnZlcnRCYXNlLCBwYXJzZU51bWVyaWMsXHJcbiAgICAgIFAgPSBCaWdOdW1iZXIucHJvdG90eXBlID0geyBjb25zdHJ1Y3RvcjogQmlnTnVtYmVyLCB0b1N0cmluZzogbnVsbCwgdmFsdWVPZjogbnVsbCB9LFxyXG4gICAgICBPTkUgPSBuZXcgQmlnTnVtYmVyKDEpLFxyXG5cclxuXHJcbiAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRURJVEFCTEUgQ09ORklHIERFRkFVTFRTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblxyXG4gICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZXMgYmVsb3cgbXVzdCBiZSBpbnRlZ2VycyB3aXRoaW4gdGhlIGluY2x1c2l2ZSByYW5nZXMgc3RhdGVkLlxyXG4gICAgICAvLyBUaGUgdmFsdWVzIGNhbiBhbHNvIGJlIGNoYW5nZWQgYXQgcnVuLXRpbWUgdXNpbmcgQmlnTnVtYmVyLnNldC5cclxuXHJcbiAgICAgIC8vIFRoZSBtYXhpbXVtIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlcyBmb3Igb3BlcmF0aW9ucyBpbnZvbHZpbmcgZGl2aXNpb24uXHJcbiAgICAgIERFQ0lNQUxfUExBQ0VTID0gMjAsICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byBNQVhcclxuXHJcbiAgICAgIC8vIFRoZSByb3VuZGluZyBtb2RlIHVzZWQgd2hlbiByb3VuZGluZyB0byB0aGUgYWJvdmUgZGVjaW1hbCBwbGFjZXMsIGFuZCB3aGVuIHVzaW5nXHJcbiAgICAgIC8vIHRvRXhwb25lbnRpYWwsIHRvRml4ZWQsIHRvRm9ybWF0IGFuZCB0b1ByZWNpc2lvbiwgYW5kIHJvdW5kIChkZWZhdWx0IHZhbHVlKS5cclxuICAgICAgLy8gVVAgICAgICAgICAwIEF3YXkgZnJvbSB6ZXJvLlxyXG4gICAgICAvLyBET1dOICAgICAgIDEgVG93YXJkcyB6ZXJvLlxyXG4gICAgICAvLyBDRUlMICAgICAgIDIgVG93YXJkcyArSW5maW5pdHkuXHJcbiAgICAgIC8vIEZMT09SICAgICAgMyBUb3dhcmRzIC1JbmZpbml0eS5cclxuICAgICAgLy8gSEFMRl9VUCAgICA0IFRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50LCB1cC5cclxuICAgICAgLy8gSEFMRl9ET1dOICA1IFRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50LCBkb3duLlxyXG4gICAgICAvLyBIQUxGX0VWRU4gIDYgVG93YXJkcyBuZWFyZXN0IG5laWdoYm91ci4gSWYgZXF1aWRpc3RhbnQsIHRvd2FyZHMgZXZlbiBuZWlnaGJvdXIuXHJcbiAgICAgIC8vIEhBTEZfQ0VJTCAgNyBUb3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLiBJZiBlcXVpZGlzdGFudCwgdG93YXJkcyArSW5maW5pdHkuXHJcbiAgICAgIC8vIEhBTEZfRkxPT1IgOCBUb3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLiBJZiBlcXVpZGlzdGFudCwgdG93YXJkcyAtSW5maW5pdHkuXHJcbiAgICAgIFJPVU5ESU5HX01PREUgPSA0LCAgICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byA4XHJcblxyXG4gICAgICAvLyBFWFBPTkVOVElBTF9BVCA6IFtUT19FWFBfTkVHICwgVE9fRVhQX1BPU11cclxuXHJcbiAgICAgIC8vIFRoZSBleHBvbmVudCB2YWx1ZSBhdCBhbmQgYmVuZWF0aCB3aGljaCB0b1N0cmluZyByZXR1cm5zIGV4cG9uZW50aWFsIG5vdGF0aW9uLlxyXG4gICAgICAvLyBOdW1iZXIgdHlwZTogLTdcclxuICAgICAgVE9fRVhQX05FRyA9IC03LCAgICAgICAgICAgICAgICAgICAgICAgICAvLyAwIHRvIC1NQVhcclxuXHJcbiAgICAgIC8vIFRoZSBleHBvbmVudCB2YWx1ZSBhdCBhbmQgYWJvdmUgd2hpY2ggdG9TdHJpbmcgcmV0dXJucyBleHBvbmVudGlhbCBub3RhdGlvbi5cclxuICAgICAgLy8gTnVtYmVyIHR5cGU6IDIxXHJcbiAgICAgIFRPX0VYUF9QT1MgPSAyMSwgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byBNQVhcclxuXHJcbiAgICAgIC8vIFJBTkdFIDogW01JTl9FWFAsIE1BWF9FWFBdXHJcblxyXG4gICAgICAvLyBUaGUgbWluaW11bSBleHBvbmVudCB2YWx1ZSwgYmVuZWF0aCB3aGljaCB1bmRlcmZsb3cgdG8gemVybyBvY2N1cnMuXHJcbiAgICAgIC8vIE51bWJlciB0eXBlOiAtMzI0ICAoNWUtMzI0KVxyXG4gICAgICBNSU5fRVhQID0gLTFlNywgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIC0xIHRvIC1NQVhcclxuXHJcbiAgICAgIC8vIFRoZSBtYXhpbXVtIGV4cG9uZW50IHZhbHVlLCBhYm92ZSB3aGljaCBvdmVyZmxvdyB0byBJbmZpbml0eSBvY2N1cnMuXHJcbiAgICAgIC8vIE51bWJlciB0eXBlOiAgMzA4ICAoMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDgpXHJcbiAgICAgIC8vIEZvciBNQVhfRVhQID4gMWU3LCBlLmcuIG5ldyBCaWdOdW1iZXIoJzFlMTAwMDAwMDAwJykucGx1cygxKSBtYXkgYmUgc2xvdy5cclxuICAgICAgTUFYX0VYUCA9IDFlNywgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAxIHRvIE1BWFxyXG5cclxuICAgICAgLy8gV2hldGhlciB0byB1c2UgY3J5cHRvZ3JhcGhpY2FsbHktc2VjdXJlIHJhbmRvbSBudW1iZXIgZ2VuZXJhdGlvbiwgaWYgYXZhaWxhYmxlLlxyXG4gICAgICBDUllQVE8gPSBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRydWUgb3IgZmFsc2VcclxuXHJcbiAgICAgIC8vIFRoZSBtb2R1bG8gbW9kZSB1c2VkIHdoZW4gY2FsY3VsYXRpbmcgdGhlIG1vZHVsdXM6IGEgbW9kIG4uXHJcbiAgICAgIC8vIFRoZSBxdW90aWVudCAocSA9IGEgLyBuKSBpcyBjYWxjdWxhdGVkIGFjY29yZGluZyB0byB0aGUgY29ycmVzcG9uZGluZyByb3VuZGluZyBtb2RlLlxyXG4gICAgICAvLyBUaGUgcmVtYWluZGVyIChyKSBpcyBjYWxjdWxhdGVkIGFzOiByID0gYSAtIG4gKiBxLlxyXG4gICAgICAvL1xyXG4gICAgICAvLyBVUCAgICAgICAgMCBUaGUgcmVtYWluZGVyIGlzIHBvc2l0aXZlIGlmIHRoZSBkaXZpZGVuZCBpcyBuZWdhdGl2ZSwgZWxzZSBpcyBuZWdhdGl2ZS5cclxuICAgICAgLy8gRE9XTiAgICAgIDEgVGhlIHJlbWFpbmRlciBoYXMgdGhlIHNhbWUgc2lnbiBhcyB0aGUgZGl2aWRlbmQuXHJcbiAgICAgIC8vICAgICAgICAgICAgIFRoaXMgbW9kdWxvIG1vZGUgaXMgY29tbW9ubHkga25vd24gYXMgJ3RydW5jYXRlZCBkaXZpc2lvbicgYW5kIGlzXHJcbiAgICAgIC8vICAgICAgICAgICAgIGVxdWl2YWxlbnQgdG8gKGEgJSBuKSBpbiBKYXZhU2NyaXB0LlxyXG4gICAgICAvLyBGTE9PUiAgICAgMyBUaGUgcmVtYWluZGVyIGhhcyB0aGUgc2FtZSBzaWduIGFzIHRoZSBkaXZpc29yIChQeXRob24gJSkuXHJcbiAgICAgIC8vIEhBTEZfRVZFTiA2IFRoaXMgbW9kdWxvIG1vZGUgaW1wbGVtZW50cyB0aGUgSUVFRSA3NTQgcmVtYWluZGVyIGZ1bmN0aW9uLlxyXG4gICAgICAvLyBFVUNMSUQgICAgOSBFdWNsaWRpYW4gZGl2aXNpb24uIHEgPSBzaWduKG4pICogZmxvb3IoYSAvIGFicyhuKSkuXHJcbiAgICAgIC8vICAgICAgICAgICAgIFRoZSByZW1haW5kZXIgaXMgYWx3YXlzIHBvc2l0aXZlLlxyXG4gICAgICAvL1xyXG4gICAgICAvLyBUaGUgdHJ1bmNhdGVkIGRpdmlzaW9uLCBmbG9vcmVkIGRpdmlzaW9uLCBFdWNsaWRpYW4gZGl2aXNpb24gYW5kIElFRUUgNzU0IHJlbWFpbmRlclxyXG4gICAgICAvLyBtb2RlcyBhcmUgY29tbW9ubHkgdXNlZCBmb3IgdGhlIG1vZHVsdXMgb3BlcmF0aW9uLlxyXG4gICAgICAvLyBBbHRob3VnaCB0aGUgb3RoZXIgcm91bmRpbmcgbW9kZXMgY2FuIGFsc28gYmUgdXNlZCwgdGhleSBtYXkgbm90IGdpdmUgdXNlZnVsIHJlc3VsdHMuXHJcbiAgICAgIE1PRFVMT19NT0RFID0gMSwgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byA5XHJcblxyXG4gICAgICAvLyBUaGUgbWF4aW11bSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzIG9mIHRoZSByZXN1bHQgb2YgdGhlIGV4cG9uZW50aWF0ZWRCeSBvcGVyYXRpb24uXHJcbiAgICAgIC8vIElmIFBPV19QUkVDSVNJT04gaXMgMCwgdGhlcmUgd2lsbCBiZSB1bmxpbWl0ZWQgc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAgICBQT1dfUFJFQ0lTSU9OID0gMCwgICAgICAgICAgICAgICAgICAgIC8vIDAgdG8gTUFYXHJcblxyXG4gICAgICAvLyBUaGUgZm9ybWF0IHNwZWNpZmljYXRpb24gdXNlZCBieSB0aGUgQmlnTnVtYmVyLnByb3RvdHlwZS50b0Zvcm1hdCBtZXRob2QuXHJcbiAgICAgIEZPUk1BVCA9IHtcclxuICAgICAgICBkZWNpbWFsU2VwYXJhdG9yOiAnLicsXHJcbiAgICAgICAgZ3JvdXBTZXBhcmF0b3I6ICcsJyxcclxuICAgICAgICBncm91cFNpemU6IDMsXHJcbiAgICAgICAgc2Vjb25kYXJ5R3JvdXBTaXplOiAwLFxyXG4gICAgICAgIGZyYWN0aW9uR3JvdXBTZXBhcmF0b3I6ICdcXHhBMCcsICAgICAgLy8gbm9uLWJyZWFraW5nIHNwYWNlXHJcbiAgICAgICAgZnJhY3Rpb25Hcm91cFNpemU6IDBcclxuICAgICAgfSxcclxuXHJcbiAgICAgIC8vIFRoZSBhbHBoYWJldCB1c2VkIGZvciBiYXNlIGNvbnZlcnNpb24uXHJcbiAgICAgIC8vIEl0IG11c3QgYmUgYXQgbGVhc3QgMiBjaGFyYWN0ZXJzIGxvbmcsIHdpdGggbm8gJy4nIG9yIHJlcGVhdGVkIGNoYXJhY3Rlci5cclxuICAgICAgLy8gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJF8nXHJcbiAgICAgIEFMUEhBQkVUID0gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eic7XHJcblxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cclxuICAgIC8vIENPTlNUUlVDVE9SXHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBUaGUgQmlnTnVtYmVyIGNvbnN0cnVjdG9yIGFuZCBleHBvcnRlZCBmdW5jdGlvbi5cclxuICAgICAqIENyZWF0ZSBhbmQgcmV0dXJuIGEgbmV3IGluc3RhbmNlIG9mIGEgQmlnTnVtYmVyIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBuIHtudW1iZXJ8c3RyaW5nfEJpZ051bWJlcn0gQSBudW1lcmljIHZhbHVlLlxyXG4gICAgICogW2JdIHtudW1iZXJ9IFRoZSBiYXNlIG9mIG4uIEludGVnZXIsIDIgdG8gQUxQSEFCRVQubGVuZ3RoIGluY2x1c2l2ZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gQmlnTnVtYmVyKG4sIGIpIHtcclxuICAgICAgdmFyIGFscGhhYmV0LCBjLCBjYXNlQ2hhbmdlZCwgZSwgaSwgaXNOdW0sIGxlbiwgc3RyLFxyXG4gICAgICAgIHggPSB0aGlzO1xyXG5cclxuICAgICAgLy8gRW5hYmxlIGNvbnN0cnVjdG9yIHVzYWdlIHdpdGhvdXQgbmV3LlxyXG4gICAgICBpZiAoISh4IGluc3RhbmNlb2YgQmlnTnVtYmVyKSkge1xyXG5cclxuICAgICAgICAvLyBEb24ndCB0aHJvdyBvbiBjb25zdHJ1Y3RvciBjYWxsIHdpdGhvdXQgbmV3ICgjODEpLlxyXG4gICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBDb25zdHJ1Y3RvciBjYWxsIHdpdGhvdXQgbmV3OiB7bn0nXHJcbiAgICAgICAgLy90aHJvdyBFcnJvcihiaWdudW1iZXJFcnJvciArICcgQ29uc3RydWN0b3IgY2FsbCB3aXRob3V0IG5ldzogJyArIG4pO1xyXG4gICAgICAgIHJldHVybiBuZXcgQmlnTnVtYmVyKG4sIGIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoYiA9PSBudWxsKSB7XHJcblxyXG4gICAgICAgIC8vIER1cGxpY2F0ZS5cclxuICAgICAgICBpZiAobiBpbnN0YW5jZW9mIEJpZ051bWJlcikge1xyXG4gICAgICAgICAgeC5zID0gbi5zO1xyXG4gICAgICAgICAgeC5lID0gbi5lO1xyXG4gICAgICAgICAgeC5jID0gKG4gPSBuLmMpID8gbi5zbGljZSgpIDogbjtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzTnVtID0gdHlwZW9mIG4gPT0gJ251bWJlcic7XHJcblxyXG4gICAgICAgIGlmIChpc051bSAmJiBuICogMCA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgLy8gVXNlIGAxIC8gbmAgdG8gaGFuZGxlIG1pbnVzIHplcm8gYWxzby5cclxuICAgICAgICAgIHgucyA9IDEgLyBuIDwgMCA/IChuID0gLW4sIC0xKSA6IDE7XHJcblxyXG4gICAgICAgICAgLy8gRmFzdGVyIHBhdGggZm9yIGludGVnZXJzLlxyXG4gICAgICAgICAgaWYgKG4gPT09IH5+bikge1xyXG4gICAgICAgICAgICBmb3IgKGUgPSAwLCBpID0gbjsgaSA+PSAxMDsgaSAvPSAxMCwgZSsrKTtcclxuICAgICAgICAgICAgeC5lID0gZTtcclxuICAgICAgICAgICAgeC5jID0gW25dO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc3RyID0gbiArICcnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoIWlzTnVtZXJpYy50ZXN0KHN0ciA9IG4gKyAnJykpIHJldHVybiBwYXJzZU51bWVyaWMoeCwgc3RyLCBpc051bSk7XHJcbiAgICAgICAgICB4LnMgPSBzdHIuY2hhckNvZGVBdCgwKSA9PSA0NSA/IChzdHIgPSBzdHIuc2xpY2UoMSksIC0xKSA6IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEZWNpbWFsIHBvaW50P1xyXG4gICAgICAgIGlmICgoZSA9IHN0ci5pbmRleE9mKCcuJykpID4gLTEpIHN0ciA9IHN0ci5yZXBsYWNlKCcuJywgJycpO1xyXG5cclxuICAgICAgICAvLyBFeHBvbmVudGlhbCBmb3JtP1xyXG4gICAgICAgIGlmICgoaSA9IHN0ci5zZWFyY2goL2UvaSkpID4gMCkge1xyXG5cclxuICAgICAgICAgIC8vIERldGVybWluZSBleHBvbmVudC5cclxuICAgICAgICAgIGlmIChlIDwgMCkgZSA9IGk7XHJcbiAgICAgICAgICBlICs9ICtzdHIuc2xpY2UoaSArIDEpO1xyXG4gICAgICAgICAgc3RyID0gc3RyLnN1YnN0cmluZygwLCBpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGUgPCAwKSB7XHJcblxyXG4gICAgICAgICAgLy8gSW50ZWdlci5cclxuICAgICAgICAgIGUgPSBzdHIubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBCYXNlIHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtifSdcclxuICAgICAgICBpbnRDaGVjayhiLCAyLCBBTFBIQUJFVC5sZW5ndGgsICdCYXNlJyk7XHJcbiAgICAgICAgc3RyID0gbiArICcnO1xyXG5cclxuICAgICAgICAvLyBBbGxvdyBleHBvbmVudGlhbCBub3RhdGlvbiB0byBiZSB1c2VkIHdpdGggYmFzZSAxMCBhcmd1bWVudCwgd2hpbGVcclxuICAgICAgICAvLyBhbHNvIHJvdW5kaW5nIHRvIERFQ0lNQUxfUExBQ0VTIGFzIHdpdGggb3RoZXIgYmFzZXMuXHJcbiAgICAgICAgaWYgKGIgPT0gMTApIHtcclxuICAgICAgICAgIHggPSBuZXcgQmlnTnVtYmVyKG4gaW5zdGFuY2VvZiBCaWdOdW1iZXIgPyBuIDogc3RyKTtcclxuICAgICAgICAgIHJldHVybiByb3VuZCh4LCBERUNJTUFMX1BMQUNFUyArIHguZSArIDEsIFJPVU5ESU5HX01PREUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNOdW0gPSB0eXBlb2YgbiA9PSAnbnVtYmVyJztcclxuXHJcbiAgICAgICAgaWYgKGlzTnVtKSB7XHJcblxyXG4gICAgICAgICAgLy8gQXZvaWQgcG90ZW50aWFsIGludGVycHJldGF0aW9uIG9mIEluZmluaXR5IGFuZCBOYU4gYXMgYmFzZSA0NCsgdmFsdWVzLlxyXG4gICAgICAgICAgaWYgKG4gKiAwICE9IDApIHJldHVybiBwYXJzZU51bWVyaWMoeCwgc3RyLCBpc051bSwgYik7XHJcblxyXG4gICAgICAgICAgeC5zID0gMSAvIG4gPCAwID8gKHN0ciA9IHN0ci5zbGljZSgxKSwgLTEpIDogMTtcclxuXHJcbiAgICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gTnVtYmVyIHByaW1pdGl2ZSBoYXMgbW9yZSB0aGFuIDE1IHNpZ25pZmljYW50IGRpZ2l0czoge259J1xyXG4gICAgICAgICAgaWYgKEJpZ051bWJlci5ERUJVRyAmJiBzdHIucmVwbGFjZSgvXjBcXC4wKnxcXC4vLCAnJykubGVuZ3RoID4gMTUpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgICAgICAgICh0b29NYW55RGlnaXRzICsgbik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gUHJldmVudCBsYXRlciBjaGVjayBmb3IgbGVuZ3RoIG9uIGNvbnZlcnRlZCBudW1iZXIuXHJcbiAgICAgICAgICBpc051bSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB4LnMgPSBzdHIuY2hhckNvZGVBdCgwKSA9PT0gNDUgPyAoc3RyID0gc3RyLnNsaWNlKDEpLCAtMSkgOiAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWxwaGFiZXQgPSBBTFBIQUJFVC5zbGljZSgwLCBiKTtcclxuICAgICAgICBlID0gaSA9IDA7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIHRoYXQgc3RyIGlzIGEgdmFsaWQgYmFzZSBiIG51bWJlci5cclxuICAgICAgICAvLyBEb24ndCB1c2UgUmVnRXhwIHNvIGFscGhhYmV0IGNhbiBjb250YWluIHNwZWNpYWwgY2hhcmFjdGVycy5cclxuICAgICAgICBmb3IgKGxlbiA9IHN0ci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgaWYgKGFscGhhYmV0LmluZGV4T2YoYyA9IHN0ci5jaGFyQXQoaSkpIDwgMCkge1xyXG4gICAgICAgICAgICBpZiAoYyA9PSAnLicpIHtcclxuXHJcbiAgICAgICAgICAgICAgLy8gSWYgJy4nIGlzIG5vdCB0aGUgZmlyc3QgY2hhcmFjdGVyIGFuZCBpdCBoYXMgbm90IGJlIGZvdW5kIGJlZm9yZS5cclxuICAgICAgICAgICAgICBpZiAoaSA+IGUpIHtcclxuICAgICAgICAgICAgICAgIGUgPSBsZW47XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWNhc2VDaGFuZ2VkKSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIEFsbG93IGUuZy4gaGV4YWRlY2ltYWwgJ0ZGJyBhcyB3ZWxsIGFzICdmZicuXHJcbiAgICAgICAgICAgICAgaWYgKHN0ciA9PSBzdHIudG9VcHBlckNhc2UoKSAmJiAoc3RyID0gc3RyLnRvTG93ZXJDYXNlKCkpIHx8XHJcbiAgICAgICAgICAgICAgICAgIHN0ciA9PSBzdHIudG9Mb3dlckNhc2UoKSAmJiAoc3RyID0gc3RyLnRvVXBwZXJDYXNlKCkpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpID0gLTE7XHJcbiAgICAgICAgICAgICAgICBlID0gMDtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlTnVtZXJpYyh4LCBuICsgJycsIGlzTnVtLCBiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0ciA9IGNvbnZlcnRCYXNlKHN0ciwgYiwgMTAsIHgucyk7XHJcblxyXG4gICAgICAgIC8vIERlY2ltYWwgcG9pbnQ/XHJcbiAgICAgICAgaWYgKChlID0gc3RyLmluZGV4T2YoJy4nKSkgPiAtMSkgc3RyID0gc3RyLnJlcGxhY2UoJy4nLCAnJyk7XHJcbiAgICAgICAgZWxzZSBlID0gc3RyLmxlbmd0aDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gRGV0ZXJtaW5lIGxlYWRpbmcgemVyb3MuXHJcbiAgICAgIGZvciAoaSA9IDA7IHN0ci5jaGFyQ29kZUF0KGkpID09PSA0ODsgaSsrKTtcclxuXHJcbiAgICAgIC8vIERldGVybWluZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgICAgZm9yIChsZW4gPSBzdHIubGVuZ3RoOyBzdHIuY2hhckNvZGVBdCgtLWxlbikgPT09IDQ4Oyk7XHJcblxyXG4gICAgICBzdHIgPSBzdHIuc2xpY2UoaSwgKytsZW4pO1xyXG5cclxuICAgICAgaWYgKHN0cikge1xyXG4gICAgICAgIGxlbiAtPSBpO1xyXG5cclxuICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gTnVtYmVyIHByaW1pdGl2ZSBoYXMgbW9yZSB0aGFuIDE1IHNpZ25pZmljYW50IGRpZ2l0czoge259J1xyXG4gICAgICAgIGlmIChpc051bSAmJiBCaWdOdW1iZXIuREVCVUcgJiZcclxuICAgICAgICAgIGxlbiA+IDE1ICYmIChuID4gTUFYX1NBRkVfSU5URUdFUiB8fCBuICE9PSBtYXRoZmxvb3IobikpKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yXHJcbiAgICAgICAgICAgICAodG9vTWFueURpZ2l0cyArICh4LnMgKiBuKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlID0gZSAtIGkgLSAxO1xyXG5cclxuICAgICAgICAgLy8gT3ZlcmZsb3c/XHJcbiAgICAgICAgaWYgKGUgPiBNQVhfRVhQKSB7XHJcblxyXG4gICAgICAgICAgLy8gSW5maW5pdHkuXHJcbiAgICAgICAgICB4LmMgPSB4LmUgPSBudWxsO1xyXG5cclxuICAgICAgICAvLyBVbmRlcmZsb3c/XHJcbiAgICAgICAgfSBlbHNlIGlmIChlIDwgTUlOX0VYUCkge1xyXG5cclxuICAgICAgICAgIC8vIFplcm8uXHJcbiAgICAgICAgICB4LmMgPSBbeC5lID0gMF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHguZSA9IGU7XHJcbiAgICAgICAgICB4LmMgPSBbXTtcclxuXHJcbiAgICAgICAgICAvLyBUcmFuc2Zvcm0gYmFzZVxyXG5cclxuICAgICAgICAgIC8vIGUgaXMgdGhlIGJhc2UgMTAgZXhwb25lbnQuXHJcbiAgICAgICAgICAvLyBpIGlzIHdoZXJlIHRvIHNsaWNlIHN0ciB0byBnZXQgdGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhlIGNvZWZmaWNpZW50IGFycmF5LlxyXG4gICAgICAgICAgaSA9IChlICsgMSkgJSBMT0dfQkFTRTtcclxuICAgICAgICAgIGlmIChlIDwgMCkgaSArPSBMT0dfQkFTRTtcclxuXHJcbiAgICAgICAgICBpZiAoaSA8IGxlbikge1xyXG4gICAgICAgICAgICBpZiAoaSkgeC5jLnB1c2goK3N0ci5zbGljZSgwLCBpKSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxlbiAtPSBMT0dfQkFTRTsgaSA8IGxlbjspIHtcclxuICAgICAgICAgICAgICB4LmMucHVzaCgrc3RyLnNsaWNlKGksIGkgKz0gTE9HX0JBU0UpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3RyID0gc3RyLnNsaWNlKGkpO1xyXG4gICAgICAgICAgICBpID0gTE9HX0JBU0UgLSBzdHIubGVuZ3RoO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaSAtPSBsZW47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZm9yICg7IGktLTsgc3RyICs9ICcwJyk7XHJcbiAgICAgICAgICB4LmMucHVzaCgrc3RyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIC8vIFplcm8uXHJcbiAgICAgICAgeC5jID0gW3guZSA9IDBdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIENPTlNUUlVDVE9SIFBST1BFUlRJRVNcclxuXHJcblxyXG4gICAgQmlnTnVtYmVyLmNsb25lID0gY2xvbmU7XHJcblxyXG4gICAgQmlnTnVtYmVyLlJPVU5EX1VQID0gMDtcclxuICAgIEJpZ051bWJlci5ST1VORF9ET1dOID0gMTtcclxuICAgIEJpZ051bWJlci5ST1VORF9DRUlMID0gMjtcclxuICAgIEJpZ051bWJlci5ST1VORF9GTE9PUiA9IDM7XHJcbiAgICBCaWdOdW1iZXIuUk9VTkRfSEFMRl9VUCA9IDQ7XHJcbiAgICBCaWdOdW1iZXIuUk9VTkRfSEFMRl9ET1dOID0gNTtcclxuICAgIEJpZ051bWJlci5ST1VORF9IQUxGX0VWRU4gPSA2O1xyXG4gICAgQmlnTnVtYmVyLlJPVU5EX0hBTEZfQ0VJTCA9IDc7XHJcbiAgICBCaWdOdW1iZXIuUk9VTkRfSEFMRl9GTE9PUiA9IDg7XHJcbiAgICBCaWdOdW1iZXIuRVVDTElEID0gOTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIENvbmZpZ3VyZSBpbmZyZXF1ZW50bHktY2hhbmdpbmcgbGlicmFyeS13aWRlIHNldHRpbmdzLlxyXG4gICAgICpcclxuICAgICAqIEFjY2VwdCBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIG9wdGlvbmFsIHByb3BlcnRpZXMgKGlmIHRoZSB2YWx1ZSBvZiBhIHByb3BlcnR5IGlzXHJcbiAgICAgKiBhIG51bWJlciwgaXQgbXVzdCBiZSBhbiBpbnRlZ2VyIHdpdGhpbiB0aGUgaW5jbHVzaXZlIHJhbmdlIHN0YXRlZCk6XHJcbiAgICAgKlxyXG4gICAgICogICBERUNJTUFMX1BMQUNFUyAgIHtudW1iZXJ9ICAgICAgICAgICAwIHRvIE1BWFxyXG4gICAgICogICBST1VORElOR19NT0RFICAgIHtudW1iZXJ9ICAgICAgICAgICAwIHRvIDhcclxuICAgICAqICAgRVhQT05FTlRJQUxfQVQgICB7bnVtYmVyfG51bWJlcltdfSAgLU1BWCB0byBNQVggIG9yICBbLU1BWCB0byAwLCAwIHRvIE1BWF1cclxuICAgICAqICAgUkFOR0UgICAgICAgICAgICB7bnVtYmVyfG51bWJlcltdfSAgLU1BWCB0byBNQVggKG5vdCB6ZXJvKSAgb3IgIFstTUFYIHRvIC0xLCAxIHRvIE1BWF1cclxuICAgICAqICAgQ1JZUFRPICAgICAgICAgICB7Ym9vbGVhbn0gICAgICAgICAgdHJ1ZSBvciBmYWxzZVxyXG4gICAgICogICBNT0RVTE9fTU9ERSAgICAgIHtudW1iZXJ9ICAgICAgICAgICAwIHRvIDlcclxuICAgICAqICAgUE9XX1BSRUNJU0lPTiAgICAgICB7bnVtYmVyfSAgICAgICAgICAgMCB0byBNQVhcclxuICAgICAqICAgQUxQSEFCRVQgICAgICAgICB7c3RyaW5nfSAgICAgICAgICAgQSBzdHJpbmcgb2YgdHdvIG9yIG1vcmUgdW5pcXVlIGNoYXJhY3RlcnMgd2hpY2ggZG9lc1xyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3QgY29udGFpbiAnLicuXHJcbiAgICAgKiAgIEZPUk1BVCAgICAgICAgICAge29iamVjdH0gICAgICAgICAgIEFuIG9iamVjdCB3aXRoIHNvbWUgb2YgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gICAgICogICAgICBkZWNpbWFsU2VwYXJhdG9yICAgICAgIHtzdHJpbmd9XHJcbiAgICAgKiAgICAgIGdyb3VwU2VwYXJhdG9yICAgICAgICAge3N0cmluZ31cclxuICAgICAqICAgICAgZ3JvdXBTaXplICAgICAgICAgICAgICB7bnVtYmVyfVxyXG4gICAgICogICAgICBzZWNvbmRhcnlHcm91cFNpemUgICAgIHtudW1iZXJ9XHJcbiAgICAgKiAgICAgIGZyYWN0aW9uR3JvdXBTZXBhcmF0b3Ige3N0cmluZ31cclxuICAgICAqICAgICAgZnJhY3Rpb25Hcm91cFNpemUgICAgICB7bnVtYmVyfVxyXG4gICAgICpcclxuICAgICAqIChUaGUgdmFsdWVzIGFzc2lnbmVkIHRvIHRoZSBhYm92ZSBGT1JNQVQgb2JqZWN0IHByb3BlcnRpZXMgYXJlIG5vdCBjaGVja2VkIGZvciB2YWxpZGl0eS4pXHJcbiAgICAgKlxyXG4gICAgICogRS5nLlxyXG4gICAgICogQmlnTnVtYmVyLmNvbmZpZyh7IERFQ0lNQUxfUExBQ0VTIDogMjAsIFJPVU5ESU5HX01PREUgOiA0IH0pXHJcbiAgICAgKlxyXG4gICAgICogSWdub3JlIHByb3BlcnRpZXMvcGFyYW1ldGVycyBzZXQgdG8gbnVsbCBvciB1bmRlZmluZWQsIGV4Y2VwdCBmb3IgQUxQSEFCRVQuXHJcbiAgICAgKlxyXG4gICAgICogUmV0dXJuIGFuIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzIGN1cnJlbnQgdmFsdWVzLlxyXG4gICAgICovXHJcbiAgICBCaWdOdW1iZXIuY29uZmlnID0gQmlnTnVtYmVyLnNldCA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgdmFyIHAsIHY7XHJcblxyXG4gICAgICBpZiAob2JqICE9IG51bGwpIHtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogPT0gJ29iamVjdCcpIHtcclxuXHJcbiAgICAgICAgICAvLyBERUNJTUFMX1BMQUNFUyB7bnVtYmVyfSBJbnRlZ2VyLCAwIHRvIE1BWCBpbmNsdXNpdmUuXHJcbiAgICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gREVDSU1BTF9QTEFDRVMge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge3Z9J1xyXG4gICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwID0gJ0RFQ0lNQUxfUExBQ0VTJykpIHtcclxuICAgICAgICAgICAgdiA9IG9ialtwXTtcclxuICAgICAgICAgICAgaW50Q2hlY2sodiwgMCwgTUFYLCBwKTtcclxuICAgICAgICAgICAgREVDSU1BTF9QTEFDRVMgPSB2O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIFJPVU5ESU5HX01PREUge251bWJlcn0gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBST1VORElOR19NT0RFIHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHt2fSdcclxuICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCA9ICdST1VORElOR19NT0RFJykpIHtcclxuICAgICAgICAgICAgdiA9IG9ialtwXTtcclxuICAgICAgICAgICAgaW50Q2hlY2sodiwgMCwgOCwgcCk7XHJcbiAgICAgICAgICAgIFJPVU5ESU5HX01PREUgPSB2O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIEVYUE9ORU5USUFMX0FUIHtudW1iZXJ8bnVtYmVyW119XHJcbiAgICAgICAgICAvLyBJbnRlZ2VyLCAtTUFYIHRvIE1BWCBpbmNsdXNpdmUgb3JcclxuICAgICAgICAgIC8vIFtpbnRlZ2VyIC1NQVggdG8gMCBpbmNsdXNpdmUsIDAgdG8gTUFYIGluY2x1c2l2ZV0uXHJcbiAgICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gRVhQT05FTlRJQUxfQVQge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge3Z9J1xyXG4gICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwID0gJ0VYUE9ORU5USUFMX0FUJykpIHtcclxuICAgICAgICAgICAgdiA9IG9ialtwXTtcclxuICAgICAgICAgICAgaWYgKGlzQXJyYXkodikpIHtcclxuICAgICAgICAgICAgICBpbnRDaGVjayh2WzBdLCAtTUFYLCAwLCBwKTtcclxuICAgICAgICAgICAgICBpbnRDaGVjayh2WzFdLCAwLCBNQVgsIHApO1xyXG4gICAgICAgICAgICAgIFRPX0VYUF9ORUcgPSB2WzBdO1xyXG4gICAgICAgICAgICAgIFRPX0VYUF9QT1MgPSB2WzFdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGludENoZWNrKHYsIC1NQVgsIE1BWCwgcCk7XHJcbiAgICAgICAgICAgICAgVE9fRVhQX05FRyA9IC0oVE9fRVhQX1BPUyA9IHYgPCAwID8gLXYgOiB2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIFJBTkdFIHtudW1iZXJ8bnVtYmVyW119IE5vbi16ZXJvIGludGVnZXIsIC1NQVggdG8gTUFYIGluY2x1c2l2ZSBvclxyXG4gICAgICAgICAgLy8gW2ludGVnZXIgLU1BWCB0byAtMSBpbmNsdXNpdmUsIGludGVnZXIgMSB0byBNQVggaW5jbHVzaXZlXS5cclxuICAgICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBSQU5HRSB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V8Y2Fubm90IGJlIHplcm99OiB7dn0nXHJcbiAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHAgPSAnUkFOR0UnKSkge1xyXG4gICAgICAgICAgICB2ID0gb2JqW3BdO1xyXG4gICAgICAgICAgICBpZiAoaXNBcnJheSh2KSkge1xyXG4gICAgICAgICAgICAgIGludENoZWNrKHZbMF0sIC1NQVgsIC0xLCBwKTtcclxuICAgICAgICAgICAgICBpbnRDaGVjayh2WzFdLCAxLCBNQVgsIHApO1xyXG4gICAgICAgICAgICAgIE1JTl9FWFAgPSB2WzBdO1xyXG4gICAgICAgICAgICAgIE1BWF9FWFAgPSB2WzFdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGludENoZWNrKHYsIC1NQVgsIE1BWCwgcCk7XHJcbiAgICAgICAgICAgICAgaWYgKHYpIHtcclxuICAgICAgICAgICAgICAgIE1JTl9FWFAgPSAtKE1BWF9FWFAgPSB2IDwgMCA/IC12IDogdik7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IEVycm9yXHJcbiAgICAgICAgICAgICAgICAgKGJpZ251bWJlckVycm9yICsgcCArICcgY2Fubm90IGJlIHplcm86ICcgKyB2KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBDUllQVE8ge2Jvb2xlYW59IHRydWUgb3IgZmFsc2UuXHJcbiAgICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gQ1JZUFRPIG5vdCB0cnVlIG9yIGZhbHNlOiB7dn0nXHJcbiAgICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gY3J5cHRvIHVuYXZhaWxhYmxlJ1xyXG4gICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwID0gJ0NSWVBUTycpKSB7XHJcbiAgICAgICAgICAgIHYgPSBvYmpbcF07XHJcbiAgICAgICAgICAgIGlmICh2ID09PSAhIXYpIHtcclxuICAgICAgICAgICAgICBpZiAodikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjcnlwdG8gIT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvICYmXHJcbiAgICAgICAgICAgICAgICAgKGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgfHwgY3J5cHRvLnJhbmRvbUJ5dGVzKSkge1xyXG4gICAgICAgICAgICAgICAgICBDUllQVE8gPSB2O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgQ1JZUFRPID0gIXY7XHJcbiAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yXHJcbiAgICAgICAgICAgICAgICAgICAoYmlnbnVtYmVyRXJyb3IgKyAnY3J5cHRvIHVuYXZhaWxhYmxlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIENSWVBUTyA9IHY7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRocm93IEVycm9yXHJcbiAgICAgICAgICAgICAgIChiaWdudW1iZXJFcnJvciArIHAgKyAnIG5vdCB0cnVlIG9yIGZhbHNlOiAnICsgdik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBNT0RVTE9fTU9ERSB7bnVtYmVyfSBJbnRlZ2VyLCAwIHRvIDkgaW5jbHVzaXZlLlxyXG4gICAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIE1PRFVMT19NT0RFIHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHt2fSdcclxuICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCA9ICdNT0RVTE9fTU9ERScpKSB7XHJcbiAgICAgICAgICAgIHYgPSBvYmpbcF07XHJcbiAgICAgICAgICAgIGludENoZWNrKHYsIDAsIDksIHApO1xyXG4gICAgICAgICAgICBNT0RVTE9fTU9ERSA9IHY7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gUE9XX1BSRUNJU0lPTiB7bnVtYmVyfSBJbnRlZ2VyLCAwIHRvIE1BWCBpbmNsdXNpdmUuXHJcbiAgICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gUE9XX1BSRUNJU0lPTiB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V9OiB7dn0nXHJcbiAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHAgPSAnUE9XX1BSRUNJU0lPTicpKSB7XHJcbiAgICAgICAgICAgIHYgPSBvYmpbcF07XHJcbiAgICAgICAgICAgIGludENoZWNrKHYsIDAsIE1BWCwgcCk7XHJcbiAgICAgICAgICAgIFBPV19QUkVDSVNJT04gPSB2O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIEZPUk1BVCB7b2JqZWN0fVxyXG4gICAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIEZPUk1BVCBub3QgYW4gb2JqZWN0OiB7dn0nXHJcbiAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHAgPSAnRk9STUFUJykpIHtcclxuICAgICAgICAgICAgdiA9IG9ialtwXTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2ID09ICdvYmplY3QnKSBGT1JNQVQgPSB2O1xyXG4gICAgICAgICAgICBlbHNlIHRocm93IEVycm9yXHJcbiAgICAgICAgICAgICAoYmlnbnVtYmVyRXJyb3IgKyBwICsgJyBub3QgYW4gb2JqZWN0OiAnICsgdik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gQUxQSEFCRVQge3N0cmluZ31cclxuICAgICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBBTFBIQUJFVCBpbnZhbGlkOiB7dn0nXHJcbiAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHAgPSAnQUxQSEFCRVQnKSkge1xyXG4gICAgICAgICAgICB2ID0gb2JqW3BdO1xyXG5cclxuICAgICAgICAgICAgLy8gRGlzYWxsb3cgaWYgb25seSBvbmUgY2hhcmFjdGVyLCBvciBjb250YWlucyAnLicgb3IgYSByZXBlYXRlZCBjaGFyYWN0ZXIuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdiA9PSAnc3RyaW5nJyAmJiAhL14uJHxcXC58KC4pLipcXDEvLnRlc3QodikpIHtcclxuICAgICAgICAgICAgICBBTFBIQUJFVCA9IHY7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgICAgICAgICAgKGJpZ251bWJlckVycm9yICsgcCArICcgaW52YWxpZDogJyArIHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIE9iamVjdCBleHBlY3RlZDoge3Z9J1xyXG4gICAgICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgICAgICAoYmlnbnVtYmVyRXJyb3IgKyAnT2JqZWN0IGV4cGVjdGVkOiAnICsgb2JqKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgREVDSU1BTF9QTEFDRVM6IERFQ0lNQUxfUExBQ0VTLFxyXG4gICAgICAgIFJPVU5ESU5HX01PREU6IFJPVU5ESU5HX01PREUsXHJcbiAgICAgICAgRVhQT05FTlRJQUxfQVQ6IFtUT19FWFBfTkVHLCBUT19FWFBfUE9TXSxcclxuICAgICAgICBSQU5HRTogW01JTl9FWFAsIE1BWF9FWFBdLFxyXG4gICAgICAgIENSWVBUTzogQ1JZUFRPLFxyXG4gICAgICAgIE1PRFVMT19NT0RFOiBNT0RVTE9fTU9ERSxcclxuICAgICAgICBQT1dfUFJFQ0lTSU9OOiBQT1dfUFJFQ0lTSU9OLFxyXG4gICAgICAgIEZPUk1BVDogRk9STUFULFxyXG4gICAgICAgIEFMUEhBQkVUOiBBTFBIQUJFVFxyXG4gICAgICB9O1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiB0cnVlIGlmIHYgaXMgYSBCaWdOdW1iZXIgaW5zdGFuY2UsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKlxyXG4gICAgICogdiB7YW55fVxyXG4gICAgICovXHJcbiAgICBCaWdOdW1iZXIuaXNCaWdOdW1iZXIgPSBmdW5jdGlvbiAodikge1xyXG4gICAgICByZXR1cm4gdiBpbnN0YW5jZW9mIEJpZ051bWJlciB8fCB2ICYmIHYuX2lzQmlnTnVtYmVyID09PSB0cnVlIHx8IGZhbHNlO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIG1heGltdW0gb2YgdGhlIGFyZ3VtZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBhcmd1bWVudHMge251bWJlcnxzdHJpbmd8QmlnTnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBCaWdOdW1iZXIubWF4aW11bSA9IEJpZ051bWJlci5tYXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBtYXhPck1pbihhcmd1bWVudHMsIFAubHQpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIG1pbmltdW0gb2YgdGhlIGFyZ3VtZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBhcmd1bWVudHMge251bWJlcnxzdHJpbmd8QmlnTnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBCaWdOdW1iZXIubWluaW11bSA9IEJpZ051bWJlci5taW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBtYXhPck1pbihhcmd1bWVudHMsIFAuZ3QpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2l0aCBhIHJhbmRvbSB2YWx1ZSBlcXVhbCB0byBvciBncmVhdGVyIHRoYW4gMCBhbmQgbGVzcyB0aGFuIDEsXHJcbiAgICAgKiBhbmQgd2l0aCBkcCwgb3IgREVDSU1BTF9QTEFDRVMgaWYgZHAgaXMgb21pdHRlZCwgZGVjaW1hbCBwbGFjZXMgKG9yIGxlc3MgaWYgdHJhaWxpbmdcclxuICAgICAqIHplcm9zIGFyZSBwcm9kdWNlZCkuXHJcbiAgICAgKlxyXG4gICAgICogW2RwXSB7bnVtYmVyfSBEZWNpbWFsIHBsYWNlcy4gSW50ZWdlciwgMCB0byBNQVggaW5jbHVzaXZlLlxyXG4gICAgICpcclxuICAgICAqICdbQmlnTnVtYmVyIEVycm9yXSBBcmd1bWVudCB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V9OiB7ZHB9J1xyXG4gICAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIGNyeXB0byB1bmF2YWlsYWJsZSdcclxuICAgICAqL1xyXG4gICAgQmlnTnVtYmVyLnJhbmRvbSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBwb3cyXzUzID0gMHgyMDAwMDAwMDAwMDAwMDtcclxuXHJcbiAgICAgIC8vIFJldHVybiBhIDUzIGJpdCBpbnRlZ2VyIG4sIHdoZXJlIDAgPD0gbiA8IDkwMDcxOTkyNTQ3NDA5OTIuXHJcbiAgICAgIC8vIENoZWNrIGlmIE1hdGgucmFuZG9tKCkgcHJvZHVjZXMgbW9yZSB0aGFuIDMyIGJpdHMgb2YgcmFuZG9tbmVzcy5cclxuICAgICAgLy8gSWYgaXQgZG9lcywgYXNzdW1lIGF0IGxlYXN0IDUzIGJpdHMgYXJlIHByb2R1Y2VkLCBvdGhlcndpc2UgYXNzdW1lIGF0IGxlYXN0IDMwIGJpdHMuXHJcbiAgICAgIC8vIDB4NDAwMDAwMDAgaXMgMl4zMCwgMHg4MDAwMDAgaXMgMl4yMywgMHgxZmZmZmYgaXMgMl4yMSAtIDEuXHJcbiAgICAgIHZhciByYW5kb201M2JpdEludCA9IChNYXRoLnJhbmRvbSgpICogcG93Ml81MykgJiAweDFmZmZmZlxyXG4gICAgICAgPyBmdW5jdGlvbiAoKSB7IHJldHVybiBtYXRoZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvdzJfNTMpOyB9XHJcbiAgICAgICA6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICgoTWF0aC5yYW5kb20oKSAqIDB4NDAwMDAwMDAgfCAwKSAqIDB4ODAwMDAwKSArXHJcbiAgICAgICAgIChNYXRoLnJhbmRvbSgpICogMHg4MDAwMDAgfCAwKTsgfTtcclxuXHJcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoZHApIHtcclxuICAgICAgICB2YXIgYSwgYiwgZSwgaywgdixcclxuICAgICAgICAgIGkgPSAwLFxyXG4gICAgICAgICAgYyA9IFtdLFxyXG4gICAgICAgICAgcmFuZCA9IG5ldyBCaWdOdW1iZXIoT05FKTtcclxuXHJcbiAgICAgICAgaWYgKGRwID09IG51bGwpIGRwID0gREVDSU1BTF9QTEFDRVM7XHJcbiAgICAgICAgZWxzZSBpbnRDaGVjayhkcCwgMCwgTUFYKTtcclxuXHJcbiAgICAgICAgayA9IG1hdGhjZWlsKGRwIC8gTE9HX0JBU0UpO1xyXG5cclxuICAgICAgICBpZiAoQ1JZUFRPKSB7XHJcblxyXG4gICAgICAgICAgLy8gQnJvd3NlcnMgc3VwcG9ydGluZyBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLlxyXG4gICAgICAgICAgaWYgKGNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcclxuXHJcbiAgICAgICAgICAgIGEgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50MzJBcnJheShrICo9IDIpKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoOyBpIDwgazspIHtcclxuXHJcbiAgICAgICAgICAgICAgLy8gNTMgYml0czpcclxuICAgICAgICAgICAgICAvLyAoKE1hdGgucG93KDIsIDMyKSAtIDEpICogTWF0aC5wb3coMiwgMjEpKS50b1N0cmluZygyKVxyXG4gICAgICAgICAgICAgIC8vIDExMTExIDExMTExMTExIDExMTExMTExIDExMTExMTExIDExMTAwMDAwIDAwMDAwMDAwIDAwMDAwMDAwXHJcbiAgICAgICAgICAgICAgLy8gKChNYXRoLnBvdygyLCAzMikgLSAxKSA+Pj4gMTEpLnRvU3RyaW5nKDIpXHJcbiAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTExMTEgMTExMTExMTEgMTExMTExMTFcclxuICAgICAgICAgICAgICAvLyAweDIwMDAwIGlzIDJeMjEuXHJcbiAgICAgICAgICAgICAgdiA9IGFbaV0gKiAweDIwMDAwICsgKGFbaSArIDFdID4+PiAxMSk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIFJlamVjdGlvbiBzYW1wbGluZzpcclxuICAgICAgICAgICAgICAvLyAwIDw9IHYgPCA5MDA3MTk5MjU0NzQwOTkyXHJcbiAgICAgICAgICAgICAgLy8gUHJvYmFiaWxpdHkgdGhhdCB2ID49IDllMTUsIGlzXHJcbiAgICAgICAgICAgICAgLy8gNzE5OTI1NDc0MDk5MiAvIDkwMDcxOTkyNTQ3NDA5OTIgfj0gMC4wMDA4LCBpLmUuIDEgaW4gMTI1MVxyXG4gICAgICAgICAgICAgIGlmICh2ID49IDllMTUpIHtcclxuICAgICAgICAgICAgICAgIGIgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50MzJBcnJheSgyKSk7XHJcbiAgICAgICAgICAgICAgICBhW2ldID0gYlswXTtcclxuICAgICAgICAgICAgICAgIGFbaSArIDFdID0gYlsxXTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIDAgPD0gdiA8PSA4OTk5OTk5OTk5OTk5OTk5XHJcbiAgICAgICAgICAgICAgICAvLyAwIDw9ICh2ICUgMWUxNCkgPD0gOTk5OTk5OTk5OTk5OTlcclxuICAgICAgICAgICAgICAgIGMucHVzaCh2ICUgMWUxNCk7XHJcbiAgICAgICAgICAgICAgICBpICs9IDI7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGkgPSBrIC8gMjtcclxuXHJcbiAgICAgICAgICAvLyBOb2RlLmpzIHN1cHBvcnRpbmcgY3J5cHRvLnJhbmRvbUJ5dGVzLlxyXG4gICAgICAgICAgfSBlbHNlIGlmIChjcnlwdG8ucmFuZG9tQnl0ZXMpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGJ1ZmZlclxyXG4gICAgICAgICAgICBhID0gY3J5cHRvLnJhbmRvbUJ5dGVzKGsgKj0gNyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKDsgaSA8IGs7KSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIDB4MTAwMDAwMDAwMDAwMCBpcyAyXjQ4LCAweDEwMDAwMDAwMDAwIGlzIDJeNDBcclxuICAgICAgICAgICAgICAvLyAweDEwMDAwMDAwMCBpcyAyXjMyLCAweDEwMDAwMDAgaXMgMl4yNFxyXG4gICAgICAgICAgICAgIC8vIDExMTExIDExMTExMTExIDExMTExMTExIDExMTExMTExIDExMTExMTExIDExMTExMTExIDExMTExMTExXHJcbiAgICAgICAgICAgICAgLy8gMCA8PSB2IDwgOTAwNzE5OTI1NDc0MDk5MlxyXG4gICAgICAgICAgICAgIHYgPSAoKGFbaV0gJiAzMSkgKiAweDEwMDAwMDAwMDAwMDApICsgKGFbaSArIDFdICogMHgxMDAwMDAwMDAwMCkgK1xyXG4gICAgICAgICAgICAgICAgIChhW2kgKyAyXSAqIDB4MTAwMDAwMDAwKSArIChhW2kgKyAzXSAqIDB4MTAwMDAwMCkgK1xyXG4gICAgICAgICAgICAgICAgIChhW2kgKyA0XSA8PCAxNikgKyAoYVtpICsgNV0gPDwgOCkgKyBhW2kgKyA2XTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKHYgPj0gOWUxNSkge1xyXG4gICAgICAgICAgICAgICAgY3J5cHRvLnJhbmRvbUJ5dGVzKDcpLmNvcHkoYSwgaSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAwIDw9ICh2ICUgMWUxNCkgPD0gOTk5OTk5OTk5OTk5OTlcclxuICAgICAgICAgICAgICAgIGMucHVzaCh2ICUgMWUxNCk7XHJcbiAgICAgICAgICAgICAgICBpICs9IDc7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGkgPSBrIC8gNztcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIENSWVBUTyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvclxyXG4gICAgICAgICAgICAgKGJpZ251bWJlckVycm9yICsgJ2NyeXB0byB1bmF2YWlsYWJsZScpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVXNlIE1hdGgucmFuZG9tLlxyXG4gICAgICAgIGlmICghQ1JZUFRPKSB7XHJcblxyXG4gICAgICAgICAgZm9yICg7IGkgPCBrOykge1xyXG4gICAgICAgICAgICB2ID0gcmFuZG9tNTNiaXRJbnQoKTtcclxuICAgICAgICAgICAgaWYgKHYgPCA5ZTE1KSBjW2krK10gPSB2ICUgMWUxNDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGsgPSBjWy0taV07XHJcbiAgICAgICAgZHAgJT0gTE9HX0JBU0U7XHJcblxyXG4gICAgICAgIC8vIENvbnZlcnQgdHJhaWxpbmcgZGlnaXRzIHRvIHplcm9zIGFjY29yZGluZyB0byBkcC5cclxuICAgICAgICBpZiAoayAmJiBkcCkge1xyXG4gICAgICAgICAgdiA9IFBPV1NfVEVOW0xPR19CQVNFIC0gZHBdO1xyXG4gICAgICAgICAgY1tpXSA9IG1hdGhmbG9vcihrIC8gdikgKiB2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIHRyYWlsaW5nIGVsZW1lbnRzIHdoaWNoIGFyZSB6ZXJvLlxyXG4gICAgICAgIGZvciAoOyBjW2ldID09PSAwOyBjLnBvcCgpLCBpLS0pO1xyXG5cclxuICAgICAgICAvLyBaZXJvP1xyXG4gICAgICAgIGlmIChpIDwgMCkge1xyXG4gICAgICAgICAgYyA9IFtlID0gMF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAvLyBSZW1vdmUgbGVhZGluZyBlbGVtZW50cyB3aGljaCBhcmUgemVybyBhbmQgYWRqdXN0IGV4cG9uZW50IGFjY29yZGluZ2x5LlxyXG4gICAgICAgICAgZm9yIChlID0gLTEgOyBjWzBdID09PSAwOyBjLnNwbGljZSgwLCAxKSwgZSAtPSBMT0dfQkFTRSk7XHJcblxyXG4gICAgICAgICAgLy8gQ291bnQgdGhlIGRpZ2l0cyBvZiB0aGUgZmlyc3QgZWxlbWVudCBvZiBjIHRvIGRldGVybWluZSBsZWFkaW5nIHplcm9zLCBhbmQuLi5cclxuICAgICAgICAgIGZvciAoaSA9IDEsIHYgPSBjWzBdOyB2ID49IDEwOyB2IC89IDEwLCBpKyspO1xyXG5cclxuICAgICAgICAgIC8vIGFkanVzdCB0aGUgZXhwb25lbnQgYWNjb3JkaW5nbHkuXHJcbiAgICAgICAgICBpZiAoaSA8IExPR19CQVNFKSBlIC09IExPR19CQVNFIC0gaTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJhbmQuZSA9IGU7XHJcbiAgICAgICAgcmFuZC5jID0gYztcclxuICAgICAgICByZXR1cm4gcmFuZDtcclxuICAgICAgfTtcclxuICAgIH0pKCk7XHJcblxyXG5cclxuICAgIC8vIFBSSVZBVEUgRlVOQ1RJT05TXHJcblxyXG5cclxuICAgIC8vIENhbGxlZCBieSBCaWdOdW1iZXIgYW5kIEJpZ051bWJlci5wcm90b3R5cGUudG9TdHJpbmcuXHJcbiAgICBjb252ZXJ0QmFzZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBkZWNpbWFsID0gJzAxMjM0NTY3ODknO1xyXG5cclxuICAgICAgLypcclxuICAgICAgICogQ29udmVydCBzdHJpbmcgb2YgYmFzZUluIHRvIGFuIGFycmF5IG9mIG51bWJlcnMgb2YgYmFzZU91dC5cclxuICAgICAgICogRWcuIHRvQmFzZU91dCgnMjU1JywgMTAsIDE2KSByZXR1cm5zIFsxNSwgMTVdLlxyXG4gICAgICAgKiBFZy4gdG9CYXNlT3V0KCdmZicsIDE2LCAxMCkgcmV0dXJucyBbMiwgNSwgNV0uXHJcbiAgICAgICAqL1xyXG4gICAgICBmdW5jdGlvbiB0b0Jhc2VPdXQoc3RyLCBiYXNlSW4sIGJhc2VPdXQsIGFscGhhYmV0KSB7XHJcbiAgICAgICAgdmFyIGosXHJcbiAgICAgICAgICBhcnIgPSBbMF0sXHJcbiAgICAgICAgICBhcnJMLFxyXG4gICAgICAgICAgaSA9IDAsXHJcbiAgICAgICAgICBsZW4gPSBzdHIubGVuZ3RoO1xyXG5cclxuICAgICAgICBmb3IgKDsgaSA8IGxlbjspIHtcclxuICAgICAgICAgIGZvciAoYXJyTCA9IGFyci5sZW5ndGg7IGFyckwtLTsgYXJyW2FyckxdICo9IGJhc2VJbik7XHJcblxyXG4gICAgICAgICAgYXJyWzBdICs9IGFscGhhYmV0LmluZGV4T2Yoc3RyLmNoYXJBdChpKyspKTtcclxuXHJcbiAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgYXJyLmxlbmd0aDsgaisrKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoYXJyW2pdID4gYmFzZU91dCAtIDEpIHtcclxuICAgICAgICAgICAgICBpZiAoYXJyW2ogKyAxXSA9PSBudWxsKSBhcnJbaiArIDFdID0gMDtcclxuICAgICAgICAgICAgICBhcnJbaiArIDFdICs9IGFycltqXSAvIGJhc2VPdXQgfCAwO1xyXG4gICAgICAgICAgICAgIGFycltqXSAlPSBiYXNlT3V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYXJyLnJldmVyc2UoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQ29udmVydCBhIG51bWVyaWMgc3RyaW5nIG9mIGJhc2VJbiB0byBhIG51bWVyaWMgc3RyaW5nIG9mIGJhc2VPdXQuXHJcbiAgICAgIC8vIElmIHRoZSBjYWxsZXIgaXMgdG9TdHJpbmcsIHdlIGFyZSBjb252ZXJ0aW5nIGZyb20gYmFzZSAxMCB0byBiYXNlT3V0LlxyXG4gICAgICAvLyBJZiB0aGUgY2FsbGVyIGlzIEJpZ051bWJlciwgd2UgYXJlIGNvbnZlcnRpbmcgZnJvbSBiYXNlSW4gdG8gYmFzZSAxMC5cclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdHIsIGJhc2VJbiwgYmFzZU91dCwgc2lnbiwgY2FsbGVySXNUb1N0cmluZykge1xyXG4gICAgICAgIHZhciBhbHBoYWJldCwgZCwgZSwgaywgciwgeCwgeGMsIHksXHJcbiAgICAgICAgICBpID0gc3RyLmluZGV4T2YoJy4nKSxcclxuICAgICAgICAgIGRwID0gREVDSU1BTF9QTEFDRVMsXHJcbiAgICAgICAgICBybSA9IFJPVU5ESU5HX01PREU7XHJcblxyXG4gICAgICAgIC8vIE5vbi1pbnRlZ2VyLlxyXG4gICAgICAgIGlmIChpID49IDApIHtcclxuICAgICAgICAgIGsgPSBQT1dfUFJFQ0lTSU9OO1xyXG5cclxuICAgICAgICAgIC8vIFVubGltaXRlZCBwcmVjaXNpb24uXHJcbiAgICAgICAgICBQT1dfUFJFQ0lTSU9OID0gMDtcclxuICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKCcuJywgJycpO1xyXG4gICAgICAgICAgeSA9IG5ldyBCaWdOdW1iZXIoYmFzZUluKTtcclxuICAgICAgICAgIHggPSB5LnBvdyhzdHIubGVuZ3RoIC0gaSk7XHJcbiAgICAgICAgICBQT1dfUFJFQ0lTSU9OID0gaztcclxuXHJcbiAgICAgICAgICAvLyBDb252ZXJ0IHN0ciBhcyBpZiBhbiBpbnRlZ2VyLCB0aGVuIHJlc3RvcmUgdGhlIGZyYWN0aW9uIHBhcnQgYnkgZGl2aWRpbmcgdGhlXHJcbiAgICAgICAgICAvLyByZXN1bHQgYnkgaXRzIGJhc2UgcmFpc2VkIHRvIGEgcG93ZXIuXHJcblxyXG4gICAgICAgICAgeS5jID0gdG9CYXNlT3V0KHRvRml4ZWRQb2ludChjb2VmZlRvU3RyaW5nKHguYyksIHguZSwgJzAnKSxcclxuICAgICAgICAgICAxMCwgYmFzZU91dCwgZGVjaW1hbCk7XHJcbiAgICAgICAgICB5LmUgPSB5LmMubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ29udmVydCB0aGUgbnVtYmVyIGFzIGludGVnZXIuXHJcblxyXG4gICAgICAgIHhjID0gdG9CYXNlT3V0KHN0ciwgYmFzZUluLCBiYXNlT3V0LCBjYWxsZXJJc1RvU3RyaW5nXHJcbiAgICAgICAgID8gKGFscGhhYmV0ID0gQUxQSEFCRVQsIGRlY2ltYWwpXHJcbiAgICAgICAgIDogKGFscGhhYmV0ID0gZGVjaW1hbCwgQUxQSEFCRVQpKTtcclxuXHJcbiAgICAgICAgLy8geGMgbm93IHJlcHJlc2VudHMgc3RyIGFzIGFuIGludGVnZXIgYW5kIGNvbnZlcnRlZCB0byBiYXNlT3V0LiBlIGlzIHRoZSBleHBvbmVudC5cclxuICAgICAgICBlID0gayA9IHhjLmxlbmd0aDtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHplcm9zLlxyXG4gICAgICAgIGZvciAoOyB4Y1stLWtdID09IDA7IHhjLnBvcCgpKTtcclxuXHJcbiAgICAgICAgLy8gWmVybz9cclxuICAgICAgICBpZiAoIXhjWzBdKSByZXR1cm4gYWxwaGFiZXQuY2hhckF0KDApO1xyXG5cclxuICAgICAgICAvLyBEb2VzIHN0ciByZXByZXNlbnQgYW4gaW50ZWdlcj8gSWYgc28sIG5vIG5lZWQgZm9yIHRoZSBkaXZpc2lvbi5cclxuICAgICAgICBpZiAoaSA8IDApIHtcclxuICAgICAgICAgIC0tZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgeC5jID0geGM7XHJcbiAgICAgICAgICB4LmUgPSBlO1xyXG5cclxuICAgICAgICAgIC8vIFRoZSBzaWduIGlzIG5lZWRlZCBmb3IgY29ycmVjdCByb3VuZGluZy5cclxuICAgICAgICAgIHgucyA9IHNpZ247XHJcbiAgICAgICAgICB4ID0gZGl2KHgsIHksIGRwLCBybSwgYmFzZU91dCk7XHJcbiAgICAgICAgICB4YyA9IHguYztcclxuICAgICAgICAgIHIgPSB4LnI7XHJcbiAgICAgICAgICBlID0geC5lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8geGMgbm93IHJlcHJlc2VudHMgc3RyIGNvbnZlcnRlZCB0byBiYXNlT3V0LlxyXG5cclxuICAgICAgICAvLyBUSGUgaW5kZXggb2YgdGhlIHJvdW5kaW5nIGRpZ2l0LlxyXG4gICAgICAgIGQgPSBlICsgZHAgKyAxO1xyXG5cclxuICAgICAgICAvLyBUaGUgcm91bmRpbmcgZGlnaXQ6IHRoZSBkaWdpdCB0byB0aGUgcmlnaHQgb2YgdGhlIGRpZ2l0IHRoYXQgbWF5IGJlIHJvdW5kZWQgdXAuXHJcbiAgICAgICAgaSA9IHhjW2RdO1xyXG5cclxuICAgICAgICAvLyBMb29rIGF0IHRoZSByb3VuZGluZyBkaWdpdHMgYW5kIG1vZGUgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdG8gcm91bmQgdXAuXHJcblxyXG4gICAgICAgIGsgPSBiYXNlT3V0IC8gMjtcclxuICAgICAgICByID0gciB8fCBkIDwgMCB8fCB4Y1tkICsgMV0gIT0gbnVsbDtcclxuXHJcbiAgICAgICAgciA9IHJtIDwgNCA/IChpICE9IG51bGwgfHwgcikgJiYgKHJtID09IDAgfHwgcm0gPT0gKHgucyA8IDAgPyAzIDogMikpXHJcbiAgICAgICAgICAgICAgOiBpID4gayB8fCBpID09IGsgJiYocm0gPT0gNCB8fCByIHx8IHJtID09IDYgJiYgeGNbZCAtIDFdICYgMSB8fFxyXG4gICAgICAgICAgICAgICBybSA9PSAoeC5zIDwgMCA/IDggOiA3KSk7XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBpbmRleCBvZiB0aGUgcm91bmRpbmcgZGlnaXQgaXMgbm90IGdyZWF0ZXIgdGhhbiB6ZXJvLCBvciB4YyByZXByZXNlbnRzXHJcbiAgICAgICAgLy8gemVybywgdGhlbiB0aGUgcmVzdWx0IG9mIHRoZSBiYXNlIGNvbnZlcnNpb24gaXMgemVybyBvciwgaWYgcm91bmRpbmcgdXAsIGEgdmFsdWVcclxuICAgICAgICAvLyBzdWNoIGFzIDAuMDAwMDEuXHJcbiAgICAgICAgaWYgKGQgPCAxIHx8ICF4Y1swXSkge1xyXG5cclxuICAgICAgICAgIC8vIDFeLWRwIG9yIDBcclxuICAgICAgICAgIHN0ciA9IHIgPyB0b0ZpeGVkUG9pbnQoYWxwaGFiZXQuY2hhckF0KDEpLCAtZHAsIGFscGhhYmV0LmNoYXJBdCgwKSlcclxuICAgICAgICAgICAgICA6IGFscGhhYmV0LmNoYXJBdCgwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgIC8vIFRydW5jYXRlIHhjIHRvIHRoZSByZXF1aXJlZCBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMuXHJcbiAgICAgICAgICB4Yy5sZW5ndGggPSBkO1xyXG5cclxuICAgICAgICAgIC8vIFJvdW5kIHVwP1xyXG4gICAgICAgICAgaWYgKHIpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFJvdW5kaW5nIHVwIG1heSBtZWFuIHRoZSBwcmV2aW91cyBkaWdpdCBoYXMgdG8gYmUgcm91bmRlZCB1cCBhbmQgc28gb24uXHJcbiAgICAgICAgICAgIGZvciAoLS1iYXNlT3V0OyArK3hjWy0tZF0gPiBiYXNlT3V0Oykge1xyXG4gICAgICAgICAgICAgIHhjW2RdID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKCFkKSB7XHJcbiAgICAgICAgICAgICAgICArK2U7XHJcbiAgICAgICAgICAgICAgICB4YyA9IFsxXS5jb25jYXQoeGMpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIERldGVybWluZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgICAgICAgIGZvciAoayA9IHhjLmxlbmd0aDsgIXhjWy0ta107KTtcclxuXHJcbiAgICAgICAgICAvLyBFLmcuIFs0LCAxMSwgMTVdIGJlY29tZXMgNGJmLlxyXG4gICAgICAgICAgZm9yIChpID0gMCwgc3RyID0gJyc7IGkgPD0gazsgc3RyICs9IGFscGhhYmV0LmNoYXJBdCh4Y1tpKytdKSk7XHJcblxyXG4gICAgICAgICAgLy8gQWRkIGxlYWRpbmcgemVyb3MsIGRlY2ltYWwgcG9pbnQgYW5kIHRyYWlsaW5nIHplcm9zIGFzIHJlcXVpcmVkLlxyXG4gICAgICAgICAgc3RyID0gdG9GaXhlZFBvaW50KHN0ciwgZSwgYWxwaGFiZXQuY2hhckF0KDApKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoZSBjYWxsZXIgd2lsbCBhZGQgdGhlIHNpZ24uXHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgICAgfTtcclxuICAgIH0pKCk7XHJcblxyXG5cclxuICAgIC8vIFBlcmZvcm0gZGl2aXNpb24gaW4gdGhlIHNwZWNpZmllZCBiYXNlLiBDYWxsZWQgYnkgZGl2IGFuZCBjb252ZXJ0QmFzZS5cclxuICAgIGRpdiA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAvLyBBc3N1bWUgbm9uLXplcm8geCBhbmQgay5cclxuICAgICAgZnVuY3Rpb24gbXVsdGlwbHkoeCwgaywgYmFzZSkge1xyXG4gICAgICAgIHZhciBtLCB0ZW1wLCB4bG8sIHhoaSxcclxuICAgICAgICAgIGNhcnJ5ID0gMCxcclxuICAgICAgICAgIGkgPSB4Lmxlbmd0aCxcclxuICAgICAgICAgIGtsbyA9IGsgJSBTUVJUX0JBU0UsXHJcbiAgICAgICAgICBraGkgPSBrIC8gU1FSVF9CQVNFIHwgMDtcclxuXHJcbiAgICAgICAgZm9yICh4ID0geC5zbGljZSgpOyBpLS07KSB7XHJcbiAgICAgICAgICB4bG8gPSB4W2ldICUgU1FSVF9CQVNFO1xyXG4gICAgICAgICAgeGhpID0geFtpXSAvIFNRUlRfQkFTRSB8IDA7XHJcbiAgICAgICAgICBtID0ga2hpICogeGxvICsgeGhpICoga2xvO1xyXG4gICAgICAgICAgdGVtcCA9IGtsbyAqIHhsbyArICgobSAlIFNRUlRfQkFTRSkgKiBTUVJUX0JBU0UpICsgY2Fycnk7XHJcbiAgICAgICAgICBjYXJyeSA9ICh0ZW1wIC8gYmFzZSB8IDApICsgKG0gLyBTUVJUX0JBU0UgfCAwKSArIGtoaSAqIHhoaTtcclxuICAgICAgICAgIHhbaV0gPSB0ZW1wICUgYmFzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjYXJyeSkgeCA9IFtjYXJyeV0uY29uY2F0KHgpO1xyXG5cclxuICAgICAgICByZXR1cm4geDtcclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gY29tcGFyZShhLCBiLCBhTCwgYkwpIHtcclxuICAgICAgICB2YXIgaSwgY21wO1xyXG5cclxuICAgICAgICBpZiAoYUwgIT0gYkwpIHtcclxuICAgICAgICAgIGNtcCA9IGFMID4gYkwgPyAxIDogLTE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICBmb3IgKGkgPSBjbXAgPSAwOyBpIDwgYUw7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgaWYgKGFbaV0gIT0gYltpXSkge1xyXG4gICAgICAgICAgICAgIGNtcCA9IGFbaV0gPiBiW2ldID8gMSA6IC0xO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY21wO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBzdWJ0cmFjdChhLCBiLCBhTCwgYmFzZSkge1xyXG4gICAgICAgIHZhciBpID0gMDtcclxuXHJcbiAgICAgICAgLy8gU3VidHJhY3QgYiBmcm9tIGEuXHJcbiAgICAgICAgZm9yICg7IGFMLS07KSB7XHJcbiAgICAgICAgICBhW2FMXSAtPSBpO1xyXG4gICAgICAgICAgaSA9IGFbYUxdIDwgYlthTF0gPyAxIDogMDtcclxuICAgICAgICAgIGFbYUxdID0gaSAqIGJhc2UgKyBhW2FMXSAtIGJbYUxdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGxlYWRpbmcgemVyb3MuXHJcbiAgICAgICAgZm9yICg7ICFhWzBdICYmIGEubGVuZ3RoID4gMTsgYS5zcGxpY2UoMCwgMSkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB4OiBkaXZpZGVuZCwgeTogZGl2aXNvci5cclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh4LCB5LCBkcCwgcm0sIGJhc2UpIHtcclxuICAgICAgICB2YXIgY21wLCBlLCBpLCBtb3JlLCBuLCBwcm9kLCBwcm9kTCwgcSwgcWMsIHJlbSwgcmVtTCwgcmVtMCwgeGksIHhMLCB5YzAsXHJcbiAgICAgICAgICB5TCwgeXosXHJcbiAgICAgICAgICBzID0geC5zID09IHkucyA/IDEgOiAtMSxcclxuICAgICAgICAgIHhjID0geC5jLFxyXG4gICAgICAgICAgeWMgPSB5LmM7XHJcblxyXG4gICAgICAgIC8vIEVpdGhlciBOYU4sIEluZmluaXR5IG9yIDA/XHJcbiAgICAgICAgaWYgKCF4YyB8fCAheGNbMF0gfHwgIXljIHx8ICF5Y1swXSkge1xyXG5cclxuICAgICAgICAgIHJldHVybiBuZXcgQmlnTnVtYmVyKFxyXG5cclxuICAgICAgICAgICAvLyBSZXR1cm4gTmFOIGlmIGVpdGhlciBOYU4sIG9yIGJvdGggSW5maW5pdHkgb3IgMC5cclxuICAgICAgICAgICAheC5zIHx8ICF5LnMgfHwgKHhjID8geWMgJiYgeGNbMF0gPT0geWNbMF0gOiAheWMpID8gTmFOIDpcclxuXHJcbiAgICAgICAgICAgIC8vIFJldHVybiDCsTAgaWYgeCBpcyDCsTAgb3IgeSBpcyDCsUluZmluaXR5LCBvciByZXR1cm4gwrFJbmZpbml0eSBhcyB5IGlzIMKxMC5cclxuICAgICAgICAgICAgeGMgJiYgeGNbMF0gPT0gMCB8fCAheWMgPyBzICogMCA6IHMgLyAwXHJcbiAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBxID0gbmV3IEJpZ051bWJlcihzKTtcclxuICAgICAgICBxYyA9IHEuYyA9IFtdO1xyXG4gICAgICAgIGUgPSB4LmUgLSB5LmU7XHJcbiAgICAgICAgcyA9IGRwICsgZSArIDE7XHJcblxyXG4gICAgICAgIGlmICghYmFzZSkge1xyXG4gICAgICAgICAgYmFzZSA9IEJBU0U7XHJcbiAgICAgICAgICBlID0gYml0Rmxvb3IoeC5lIC8gTE9HX0JBU0UpIC0gYml0Rmxvb3IoeS5lIC8gTE9HX0JBU0UpO1xyXG4gICAgICAgICAgcyA9IHMgLyBMT0dfQkFTRSB8IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXN1bHQgZXhwb25lbnQgbWF5IGJlIG9uZSBsZXNzIHRoZW4gdGhlIGN1cnJlbnQgdmFsdWUgb2YgZS5cclxuICAgICAgICAvLyBUaGUgY29lZmZpY2llbnRzIG9mIHRoZSBCaWdOdW1iZXJzIGZyb20gY29udmVydEJhc2UgbWF5IGhhdmUgdHJhaWxpbmcgemVyb3MuXHJcbiAgICAgICAgZm9yIChpID0gMDsgeWNbaV0gPT0gKHhjW2ldIHx8IDApOyBpKyspO1xyXG5cclxuICAgICAgICBpZiAoeWNbaV0gPiAoeGNbaV0gfHwgMCkpIGUtLTtcclxuXHJcbiAgICAgICAgaWYgKHMgPCAwKSB7XHJcbiAgICAgICAgICBxYy5wdXNoKDEpO1xyXG4gICAgICAgICAgbW9yZSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHhMID0geGMubGVuZ3RoO1xyXG4gICAgICAgICAgeUwgPSB5Yy5sZW5ndGg7XHJcbiAgICAgICAgICBpID0gMDtcclxuICAgICAgICAgIHMgKz0gMjtcclxuXHJcbiAgICAgICAgICAvLyBOb3JtYWxpc2UgeGMgYW5kIHljIHNvIGhpZ2hlc3Qgb3JkZXIgZGlnaXQgb2YgeWMgaXMgPj0gYmFzZSAvIDIuXHJcblxyXG4gICAgICAgICAgbiA9IG1hdGhmbG9vcihiYXNlIC8gKHljWzBdICsgMSkpO1xyXG5cclxuICAgICAgICAgIC8vIE5vdCBuZWNlc3NhcnksIGJ1dCB0byBoYW5kbGUgb2RkIGJhc2VzIHdoZXJlIHljWzBdID09IChiYXNlIC8gMikgLSAxLlxyXG4gICAgICAgICAgLy8gaWYgKG4gPiAxIHx8IG4rKyA9PSAxICYmIHljWzBdIDwgYmFzZSAvIDIpIHtcclxuICAgICAgICAgIGlmIChuID4gMSkge1xyXG4gICAgICAgICAgICB5YyA9IG11bHRpcGx5KHljLCBuLCBiYXNlKTtcclxuICAgICAgICAgICAgeGMgPSBtdWx0aXBseSh4YywgbiwgYmFzZSk7XHJcbiAgICAgICAgICAgIHlMID0geWMubGVuZ3RoO1xyXG4gICAgICAgICAgICB4TCA9IHhjLmxlbmd0aDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB4aSA9IHlMO1xyXG4gICAgICAgICAgcmVtID0geGMuc2xpY2UoMCwgeUwpO1xyXG4gICAgICAgICAgcmVtTCA9IHJlbS5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgLy8gQWRkIHplcm9zIHRvIG1ha2UgcmVtYWluZGVyIGFzIGxvbmcgYXMgZGl2aXNvci5cclxuICAgICAgICAgIGZvciAoOyByZW1MIDwgeUw7IHJlbVtyZW1MKytdID0gMCk7XHJcbiAgICAgICAgICB5eiA9IHljLnNsaWNlKCk7XHJcbiAgICAgICAgICB5eiA9IFswXS5jb25jYXQoeXopO1xyXG4gICAgICAgICAgeWMwID0geWNbMF07XHJcbiAgICAgICAgICBpZiAoeWNbMV0gPj0gYmFzZSAvIDIpIHljMCsrO1xyXG4gICAgICAgICAgLy8gTm90IG5lY2Vzc2FyeSwgYnV0IHRvIHByZXZlbnQgdHJpYWwgZGlnaXQgbiA+IGJhc2UsIHdoZW4gdXNpbmcgYmFzZSAzLlxyXG4gICAgICAgICAgLy8gZWxzZSBpZiAoYmFzZSA9PSAzICYmIHljMCA9PSAxKSB5YzAgPSAxICsgMWUtMTU7XHJcblxyXG4gICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBuID0gMDtcclxuXHJcbiAgICAgICAgICAgIC8vIENvbXBhcmUgZGl2aXNvciBhbmQgcmVtYWluZGVyLlxyXG4gICAgICAgICAgICBjbXAgPSBjb21wYXJlKHljLCByZW0sIHlMLCByZW1MKTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIGRpdmlzb3IgPCByZW1haW5kZXIuXHJcbiAgICAgICAgICAgIGlmIChjbXAgPCAwKSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIENhbGN1bGF0ZSB0cmlhbCBkaWdpdCwgbi5cclxuXHJcbiAgICAgICAgICAgICAgcmVtMCA9IHJlbVswXTtcclxuICAgICAgICAgICAgICBpZiAoeUwgIT0gcmVtTCkgcmVtMCA9IHJlbTAgKiBiYXNlICsgKHJlbVsxXSB8fCAwKTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gbiBpcyBob3cgbWFueSB0aW1lcyB0aGUgZGl2aXNvciBnb2VzIGludG8gdGhlIGN1cnJlbnQgcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgIG4gPSBtYXRoZmxvb3IocmVtMCAvIHljMCk7XHJcblxyXG4gICAgICAgICAgICAgIC8vICBBbGdvcml0aG06XHJcbiAgICAgICAgICAgICAgLy8gIHByb2R1Y3QgPSBkaXZpc29yIG11bHRpcGxpZWQgYnkgdHJpYWwgZGlnaXQgKG4pLlxyXG4gICAgICAgICAgICAgIC8vICBDb21wYXJlIHByb2R1Y3QgYW5kIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICAvLyAgSWYgcHJvZHVjdCBpcyBncmVhdGVyIHRoYW4gcmVtYWluZGVyOlxyXG4gICAgICAgICAgICAgIC8vICAgIFN1YnRyYWN0IGRpdmlzb3IgZnJvbSBwcm9kdWN0LCBkZWNyZW1lbnQgdHJpYWwgZGlnaXQuXHJcbiAgICAgICAgICAgICAgLy8gIFN1YnRyYWN0IHByb2R1Y3QgZnJvbSByZW1haW5kZXIuXHJcbiAgICAgICAgICAgICAgLy8gIElmIHByb2R1Y3Qgd2FzIGxlc3MgdGhhbiByZW1haW5kZXIgYXQgdGhlIGxhc3QgY29tcGFyZTpcclxuICAgICAgICAgICAgICAvLyAgICBDb21wYXJlIG5ldyByZW1haW5kZXIgYW5kIGRpdmlzb3IuXHJcbiAgICAgICAgICAgICAgLy8gICAgSWYgcmVtYWluZGVyIGlzIGdyZWF0ZXIgdGhhbiBkaXZpc29yOlxyXG4gICAgICAgICAgICAgIC8vICAgICAgU3VidHJhY3QgZGl2aXNvciBmcm9tIHJlbWFpbmRlciwgaW5jcmVtZW50IHRyaWFsIGRpZ2l0LlxyXG5cclxuICAgICAgICAgICAgICBpZiAobiA+IDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBuIG1heSBiZSA+IGJhc2Ugb25seSB3aGVuIGJhc2UgaXMgMy5cclxuICAgICAgICAgICAgICAgIGlmIChuID49IGJhc2UpIG4gPSBiYXNlIC0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBwcm9kdWN0ID0gZGl2aXNvciAqIHRyaWFsIGRpZ2l0LlxyXG4gICAgICAgICAgICAgICAgcHJvZCA9IG11bHRpcGx5KHljLCBuLCBiYXNlKTtcclxuICAgICAgICAgICAgICAgIHByb2RMID0gcHJvZC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICByZW1MID0gcmVtLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDb21wYXJlIHByb2R1Y3QgYW5kIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICAgIC8vIElmIHByb2R1Y3QgPiByZW1haW5kZXIgdGhlbiB0cmlhbCBkaWdpdCBuIHRvbyBoaWdoLlxyXG4gICAgICAgICAgICAgICAgLy8gbiBpcyAxIHRvbyBoaWdoIGFib3V0IDUlIG9mIHRoZSB0aW1lLCBhbmQgaXMgbm90IGtub3duIHRvIGhhdmVcclxuICAgICAgICAgICAgICAgIC8vIGV2ZXIgYmVlbiBtb3JlIHRoYW4gMSB0b28gaGlnaC5cclxuICAgICAgICAgICAgICAgIHdoaWxlIChjb21wYXJlKHByb2QsIHJlbSwgcHJvZEwsIHJlbUwpID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgbi0tO1xyXG5cclxuICAgICAgICAgICAgICAgICAgLy8gU3VidHJhY3QgZGl2aXNvciBmcm9tIHByb2R1Y3QuXHJcbiAgICAgICAgICAgICAgICAgIHN1YnRyYWN0KHByb2QsIHlMIDwgcHJvZEwgPyB5eiA6IHljLCBwcm9kTCwgYmFzZSk7XHJcbiAgICAgICAgICAgICAgICAgIHByb2RMID0gcHJvZC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgIGNtcCA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBuIGlzIDAgb3IgMSwgY21wIGlzIC0xLlxyXG4gICAgICAgICAgICAgICAgLy8gSWYgbiBpcyAwLCB0aGVyZSBpcyBubyBuZWVkIHRvIGNvbXBhcmUgeWMgYW5kIHJlbSBhZ2FpbiBiZWxvdyxcclxuICAgICAgICAgICAgICAgIC8vIHNvIGNoYW5nZSBjbXAgdG8gMSB0byBhdm9pZCBpdC5cclxuICAgICAgICAgICAgICAgIC8vIElmIG4gaXMgMSwgbGVhdmUgY21wIGFzIC0xLCBzbyB5YyBhbmQgcmVtIGFyZSBjb21wYXJlZCBhZ2Fpbi5cclxuICAgICAgICAgICAgICAgIGlmIChuID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgIC8vIGRpdmlzb3IgPCByZW1haW5kZXIsIHNvIG4gbXVzdCBiZSBhdCBsZWFzdCAxLlxyXG4gICAgICAgICAgICAgICAgICBjbXAgPSBuID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBwcm9kdWN0ID0gZGl2aXNvclxyXG4gICAgICAgICAgICAgICAgcHJvZCA9IHljLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICBwcm9kTCA9IHByb2QubGVuZ3RoO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgaWYgKHByb2RMIDwgcmVtTCkgcHJvZCA9IFswXS5jb25jYXQocHJvZCk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIFN1YnRyYWN0IHByb2R1Y3QgZnJvbSByZW1haW5kZXIuXHJcbiAgICAgICAgICAgICAgc3VidHJhY3QocmVtLCBwcm9kLCByZW1MLCBiYXNlKTtcclxuICAgICAgICAgICAgICByZW1MID0gcmVtLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgIC8vIElmIHByb2R1Y3Qgd2FzIDwgcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgIGlmIChjbXAgPT0gLTEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDb21wYXJlIGRpdmlzb3IgYW5kIG5ldyByZW1haW5kZXIuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBkaXZpc29yIDwgbmV3IHJlbWFpbmRlciwgc3VidHJhY3QgZGl2aXNvciBmcm9tIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICAgIC8vIFRyaWFsIGRpZ2l0IG4gdG9vIGxvdy5cclxuICAgICAgICAgICAgICAgIC8vIG4gaXMgMSB0b28gbG93IGFib3V0IDUlIG9mIHRoZSB0aW1lLCBhbmQgdmVyeSByYXJlbHkgMiB0b28gbG93LlxyXG4gICAgICAgICAgICAgICAgd2hpbGUgKGNvbXBhcmUoeWMsIHJlbSwgeUwsIHJlbUwpIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgICBuKys7XHJcblxyXG4gICAgICAgICAgICAgICAgICAvLyBTdWJ0cmFjdCBkaXZpc29yIGZyb20gcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgICAgICBzdWJ0cmFjdChyZW0sIHlMIDwgcmVtTCA/IHl6IDogeWMsIHJlbUwsIGJhc2UpO1xyXG4gICAgICAgICAgICAgICAgICByZW1MID0gcmVtLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY21wID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgbisrO1xyXG4gICAgICAgICAgICAgIHJlbSA9IFswXTtcclxuICAgICAgICAgICAgfSAvLyBlbHNlIGNtcCA9PT0gMSBhbmQgbiB3aWxsIGJlIDBcclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCB0aGUgbmV4dCBkaWdpdCwgbiwgdG8gdGhlIHJlc3VsdCBhcnJheS5cclxuICAgICAgICAgICAgcWNbaSsrXSA9IG47XHJcblxyXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgaWYgKHJlbVswXSkge1xyXG4gICAgICAgICAgICAgIHJlbVtyZW1MKytdID0geGNbeGldIHx8IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcmVtID0gW3hjW3hpXV07XHJcbiAgICAgICAgICAgICAgcmVtTCA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gd2hpbGUgKCh4aSsrIDwgeEwgfHwgcmVtWzBdICE9IG51bGwpICYmIHMtLSk7XHJcblxyXG4gICAgICAgICAgbW9yZSA9IHJlbVswXSAhPSBudWxsO1xyXG5cclxuICAgICAgICAgIC8vIExlYWRpbmcgemVybz9cclxuICAgICAgICAgIGlmICghcWNbMF0pIHFjLnNwbGljZSgwLCAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChiYXNlID09IEJBU0UpIHtcclxuXHJcbiAgICAgICAgICAvLyBUbyBjYWxjdWxhdGUgcS5lLCBmaXJzdCBnZXQgdGhlIG51bWJlciBvZiBkaWdpdHMgb2YgcWNbMF0uXHJcbiAgICAgICAgICBmb3IgKGkgPSAxLCBzID0gcWNbMF07IHMgPj0gMTA7IHMgLz0gMTAsIGkrKyk7XHJcblxyXG4gICAgICAgICAgcm91bmQocSwgZHAgKyAocS5lID0gaSArIGUgKiBMT0dfQkFTRSAtIDEpICsgMSwgcm0sIG1vcmUpO1xyXG5cclxuICAgICAgICAvLyBDYWxsZXIgaXMgY29udmVydEJhc2UuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHEuZSA9IGU7XHJcbiAgICAgICAgICBxLnIgPSArbW9yZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBxO1xyXG4gICAgICB9O1xyXG4gICAgfSkoKTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIEJpZ051bWJlciBuIGluIGZpeGVkLXBvaW50IG9yIGV4cG9uZW50aWFsXHJcbiAgICAgKiBub3RhdGlvbiByb3VuZGVkIHRvIHRoZSBzcGVjaWZpZWQgZGVjaW1hbCBwbGFjZXMgb3Igc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAgICpcclxuICAgICAqIG46IGEgQmlnTnVtYmVyLlxyXG4gICAgICogaTogdGhlIGluZGV4IG9mIHRoZSBsYXN0IGRpZ2l0IHJlcXVpcmVkIChpLmUuIHRoZSBkaWdpdCB0aGF0IG1heSBiZSByb3VuZGVkIHVwKS5cclxuICAgICAqIHJtOiB0aGUgcm91bmRpbmcgbW9kZS5cclxuICAgICAqIGlkOiAxICh0b0V4cG9uZW50aWFsKSBvciAyICh0b1ByZWNpc2lvbikuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGZvcm1hdChuLCBpLCBybSwgaWQpIHtcclxuICAgICAgdmFyIGMwLCBlLCBuZSwgbGVuLCBzdHI7XHJcblxyXG4gICAgICBpZiAocm0gPT0gbnVsbCkgcm0gPSBST1VORElOR19NT0RFO1xyXG4gICAgICBlbHNlIGludENoZWNrKHJtLCAwLCA4KTtcclxuXHJcbiAgICAgIGlmICghbi5jKSByZXR1cm4gbi50b1N0cmluZygpO1xyXG5cclxuICAgICAgYzAgPSBuLmNbMF07XHJcbiAgICAgIG5lID0gbi5lO1xyXG5cclxuICAgICAgaWYgKGkgPT0gbnVsbCkge1xyXG4gICAgICAgIHN0ciA9IGNvZWZmVG9TdHJpbmcobi5jKTtcclxuICAgICAgICBzdHIgPSBpZCA9PSAxIHx8IGlkID09IDIgJiYgbmUgPD0gVE9fRVhQX05FR1xyXG4gICAgICAgICA/IHRvRXhwb25lbnRpYWwoc3RyLCBuZSlcclxuICAgICAgICAgOiB0b0ZpeGVkUG9pbnQoc3RyLCBuZSwgJzAnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuID0gcm91bmQobmV3IEJpZ051bWJlcihuKSwgaSwgcm0pO1xyXG5cclxuICAgICAgICAvLyBuLmUgbWF5IGhhdmUgY2hhbmdlZCBpZiB0aGUgdmFsdWUgd2FzIHJvdW5kZWQgdXAuXHJcbiAgICAgICAgZSA9IG4uZTtcclxuXHJcbiAgICAgICAgc3RyID0gY29lZmZUb1N0cmluZyhuLmMpO1xyXG4gICAgICAgIGxlbiA9IHN0ci5sZW5ndGg7XHJcblxyXG4gICAgICAgIC8vIHRvUHJlY2lzaW9uIHJldHVybnMgZXhwb25lbnRpYWwgbm90YXRpb24gaWYgdGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHNcclxuICAgICAgICAvLyBzcGVjaWZpZWQgaXMgbGVzcyB0aGFuIHRoZSBudW1iZXIgb2YgZGlnaXRzIG5lY2Vzc2FyeSB0byByZXByZXNlbnQgdGhlIGludGVnZXJcclxuICAgICAgICAvLyBwYXJ0IG9mIHRoZSB2YWx1ZSBpbiBmaXhlZC1wb2ludCBub3RhdGlvbi5cclxuXHJcbiAgICAgICAgLy8gRXhwb25lbnRpYWwgbm90YXRpb24uXHJcbiAgICAgICAgaWYgKGlkID09IDEgfHwgaWQgPT0gMiAmJiAoaSA8PSBlIHx8IGUgPD0gVE9fRVhQX05FRykpIHtcclxuXHJcbiAgICAgICAgICAvLyBBcHBlbmQgemVyb3M/XHJcbiAgICAgICAgICBmb3IgKDsgbGVuIDwgaTsgc3RyICs9ICcwJywgbGVuKyspO1xyXG4gICAgICAgICAgc3RyID0gdG9FeHBvbmVudGlhbChzdHIsIGUpO1xyXG5cclxuICAgICAgICAvLyBGaXhlZC1wb2ludCBub3RhdGlvbi5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaSAtPSBuZTtcclxuICAgICAgICAgIHN0ciA9IHRvRml4ZWRQb2ludChzdHIsIGUsICcwJyk7XHJcblxyXG4gICAgICAgICAgLy8gQXBwZW5kIHplcm9zP1xyXG4gICAgICAgICAgaWYgKGUgKyAxID4gbGVuKSB7XHJcbiAgICAgICAgICAgIGlmICgtLWkgPiAwKSBmb3IgKHN0ciArPSAnLic7IGktLTsgc3RyICs9ICcwJyk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpICs9IGUgLSBsZW47XHJcbiAgICAgICAgICAgIGlmIChpID4gMCkge1xyXG4gICAgICAgICAgICAgIGlmIChlICsgMSA9PSBsZW4pIHN0ciArPSAnLic7XHJcbiAgICAgICAgICAgICAgZm9yICg7IGktLTsgc3RyICs9ICcwJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuLnMgPCAwICYmIGMwID8gJy0nICsgc3RyIDogc3RyO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBIYW5kbGUgQmlnTnVtYmVyLm1heCBhbmQgQmlnTnVtYmVyLm1pbi5cclxuICAgIGZ1bmN0aW9uIG1heE9yTWluKGFyZ3MsIG1ldGhvZCkge1xyXG4gICAgICB2YXIgbSwgbixcclxuICAgICAgICBpID0gMDtcclxuXHJcbiAgICAgIGlmIChpc0FycmF5KGFyZ3NbMF0pKSBhcmdzID0gYXJnc1swXTtcclxuICAgICAgbSA9IG5ldyBCaWdOdW1iZXIoYXJnc1swXSk7XHJcblxyXG4gICAgICBmb3IgKDsgKytpIDwgYXJncy5sZW5ndGg7KSB7XHJcbiAgICAgICAgbiA9IG5ldyBCaWdOdW1iZXIoYXJnc1tpXSk7XHJcblxyXG4gICAgICAgIC8vIElmIGFueSBudW1iZXIgaXMgTmFOLCByZXR1cm4gTmFOLlxyXG4gICAgICAgIGlmICghbi5zKSB7XHJcbiAgICAgICAgICBtID0gbjtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobWV0aG9kLmNhbGwobSwgbikpIHtcclxuICAgICAgICAgIG0gPSBuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG07XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBTdHJpcCB0cmFpbGluZyB6ZXJvcywgY2FsY3VsYXRlIGJhc2UgMTAgZXhwb25lbnQgYW5kIGNoZWNrIGFnYWluc3QgTUlOX0VYUCBhbmQgTUFYX0VYUC5cclxuICAgICAqIENhbGxlZCBieSBtaW51cywgcGx1cyBhbmQgdGltZXMuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIG5vcm1hbGlzZShuLCBjLCBlKSB7XHJcbiAgICAgIHZhciBpID0gMSxcclxuICAgICAgICBqID0gYy5sZW5ndGg7XHJcblxyXG4gICAgICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHplcm9zLlxyXG4gICAgICBmb3IgKDsgIWNbLS1qXTsgYy5wb3AoKSk7XHJcblxyXG4gICAgICAvLyBDYWxjdWxhdGUgdGhlIGJhc2UgMTAgZXhwb25lbnQuIEZpcnN0IGdldCB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBvZiBjWzBdLlxyXG4gICAgICBmb3IgKGogPSBjWzBdOyBqID49IDEwOyBqIC89IDEwLCBpKyspO1xyXG5cclxuICAgICAgLy8gT3ZlcmZsb3c/XHJcbiAgICAgIGlmICgoZSA9IGkgKyBlICogTE9HX0JBU0UgLSAxKSA+IE1BWF9FWFApIHtcclxuXHJcbiAgICAgICAgLy8gSW5maW5pdHkuXHJcbiAgICAgICAgbi5jID0gbi5lID0gbnVsbDtcclxuXHJcbiAgICAgIC8vIFVuZGVyZmxvdz9cclxuICAgICAgfSBlbHNlIGlmIChlIDwgTUlOX0VYUCkge1xyXG5cclxuICAgICAgICAvLyBaZXJvLlxyXG4gICAgICAgIG4uYyA9IFtuLmUgPSAwXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuLmUgPSBlO1xyXG4gICAgICAgIG4uYyA9IGM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBIYW5kbGUgdmFsdWVzIHRoYXQgZmFpbCB0aGUgdmFsaWRpdHkgdGVzdCBpbiBCaWdOdW1iZXIuXHJcbiAgICBwYXJzZU51bWVyaWMgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgYmFzZVByZWZpeCA9IC9eKC0/KTAoW3hib10pKD89XFx3W1xcdy5dKiQpL2ksXHJcbiAgICAgICAgZG90QWZ0ZXIgPSAvXihbXi5dKylcXC4kLyxcclxuICAgICAgICBkb3RCZWZvcmUgPSAvXlxcLihbXi5dKykkLyxcclxuICAgICAgICBpc0luZmluaXR5T3JOYU4gPSAvXi0/KEluZmluaXR5fE5hTikkLyxcclxuICAgICAgICB3aGl0ZXNwYWNlT3JQbHVzID0gL15cXHMqXFwrKD89W1xcdy5dKXxeXFxzK3xcXHMrJC9nO1xyXG5cclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh4LCBzdHIsIGlzTnVtLCBiKSB7XHJcbiAgICAgICAgdmFyIGJhc2UsXHJcbiAgICAgICAgICBzID0gaXNOdW0gPyBzdHIgOiBzdHIucmVwbGFjZSh3aGl0ZXNwYWNlT3JQbHVzLCAnJyk7XHJcblxyXG4gICAgICAgIC8vIE5vIGV4Y2VwdGlvbiBvbiDCsUluZmluaXR5IG9yIE5hTi5cclxuICAgICAgICBpZiAoaXNJbmZpbml0eU9yTmFOLnRlc3QocykpIHtcclxuICAgICAgICAgIHgucyA9IGlzTmFOKHMpID8gbnVsbCA6IHMgPCAwID8gLTEgOiAxO1xyXG4gICAgICAgICAgeC5jID0geC5lID0gbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKCFpc051bSkge1xyXG5cclxuICAgICAgICAgICAgLy8gYmFzZVByZWZpeCA9IC9eKC0/KTAoW3hib10pKD89XFx3W1xcdy5dKiQpL2lcclxuICAgICAgICAgICAgcyA9IHMucmVwbGFjZShiYXNlUHJlZml4LCBmdW5jdGlvbiAobSwgcDEsIHAyKSB7XHJcbiAgICAgICAgICAgICAgYmFzZSA9IChwMiA9IHAyLnRvTG93ZXJDYXNlKCkpID09ICd4JyA/IDE2IDogcDIgPT0gJ2InID8gMiA6IDg7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICFiIHx8IGIgPT0gYmFzZSA/IHAxIDogbTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoYikge1xyXG4gICAgICAgICAgICAgIGJhc2UgPSBiO1xyXG5cclxuICAgICAgICAgICAgICAvLyBFLmcuICcxLicgdG8gJzEnLCAnLjEnIHRvICcwLjEnXHJcbiAgICAgICAgICAgICAgcyA9IHMucmVwbGFjZShkb3RBZnRlciwgJyQxJykucmVwbGFjZShkb3RCZWZvcmUsICcwLiQxJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdHIgIT0gcykgcmV0dXJuIG5ldyBCaWdOdW1iZXIocywgYmFzZSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIE5vdCBhIG51bWJlcjoge259J1xyXG4gICAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIE5vdCBhIGJhc2Uge2J9IG51bWJlcjoge259J1xyXG4gICAgICAgICAgaWYgKEJpZ051bWJlci5ERUJVRykge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvclxyXG4gICAgICAgICAgICAgIChiaWdudW1iZXJFcnJvciArICdOb3QgYScgKyAoYiA/ICcgYmFzZSAnICsgYiA6ICcnKSArICcgbnVtYmVyOiAnICsgc3RyKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBOYU5cclxuICAgICAgICAgIHguYyA9IHguZSA9IHgucyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUm91bmQgeCB0byBzZCBzaWduaWZpY2FudCBkaWdpdHMgdXNpbmcgcm91bmRpbmcgbW9kZSBybS4gQ2hlY2sgZm9yIG92ZXIvdW5kZXItZmxvdy5cclxuICAgICAqIElmIHIgaXMgdHJ1dGh5LCBpdCBpcyBrbm93biB0aGF0IHRoZXJlIGFyZSBtb3JlIGRpZ2l0cyBhZnRlciB0aGUgcm91bmRpbmcgZGlnaXQuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHJvdW5kKHgsIHNkLCBybSwgcikge1xyXG4gICAgICB2YXIgZCwgaSwgaiwgaywgbiwgbmksIHJkLFxyXG4gICAgICAgIHhjID0geC5jLFxyXG4gICAgICAgIHBvd3MxMCA9IFBPV1NfVEVOO1xyXG5cclxuICAgICAgLy8gaWYgeCBpcyBub3QgSW5maW5pdHkgb3IgTmFOLi4uXHJcbiAgICAgIGlmICh4Yykge1xyXG5cclxuICAgICAgICAvLyByZCBpcyB0aGUgcm91bmRpbmcgZGlnaXQsIGkuZS4gdGhlIGRpZ2l0IGFmdGVyIHRoZSBkaWdpdCB0aGF0IG1heSBiZSByb3VuZGVkIHVwLlxyXG4gICAgICAgIC8vIG4gaXMgYSBiYXNlIDFlMTQgbnVtYmVyLCB0aGUgdmFsdWUgb2YgdGhlIGVsZW1lbnQgb2YgYXJyYXkgeC5jIGNvbnRhaW5pbmcgcmQuXHJcbiAgICAgICAgLy8gbmkgaXMgdGhlIGluZGV4IG9mIG4gd2l0aGluIHguYy5cclxuICAgICAgICAvLyBkIGlzIHRoZSBudW1iZXIgb2YgZGlnaXRzIG9mIG4uXHJcbiAgICAgICAgLy8gaSBpcyB0aGUgaW5kZXggb2YgcmQgd2l0aGluIG4gaW5jbHVkaW5nIGxlYWRpbmcgemVyb3MuXHJcbiAgICAgICAgLy8gaiBpcyB0aGUgYWN0dWFsIGluZGV4IG9mIHJkIHdpdGhpbiBuIChpZiA8IDAsIHJkIGlzIGEgbGVhZGluZyB6ZXJvKS5cclxuICAgICAgICBvdXQ6IHtcclxuXHJcbiAgICAgICAgICAvLyBHZXQgdGhlIG51bWJlciBvZiBkaWdpdHMgb2YgdGhlIGZpcnN0IGVsZW1lbnQgb2YgeGMuXHJcbiAgICAgICAgICBmb3IgKGQgPSAxLCBrID0geGNbMF07IGsgPj0gMTA7IGsgLz0gMTAsIGQrKyk7XHJcbiAgICAgICAgICBpID0gc2QgLSBkO1xyXG5cclxuICAgICAgICAgIC8vIElmIHRoZSByb3VuZGluZyBkaWdpdCBpcyBpbiB0aGUgZmlyc3QgZWxlbWVudCBvZiB4Yy4uLlxyXG4gICAgICAgICAgaWYgKGkgPCAwKSB7XHJcbiAgICAgICAgICAgIGkgKz0gTE9HX0JBU0U7XHJcbiAgICAgICAgICAgIGogPSBzZDtcclxuICAgICAgICAgICAgbiA9IHhjW25pID0gMF07XHJcblxyXG4gICAgICAgICAgICAvLyBHZXQgdGhlIHJvdW5kaW5nIGRpZ2l0IGF0IGluZGV4IGogb2Ygbi5cclxuICAgICAgICAgICAgcmQgPSBuIC8gcG93czEwW2QgLSBqIC0gMV0gJSAxMCB8IDA7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuaSA9IG1hdGhjZWlsKChpICsgMSkgLyBMT0dfQkFTRSk7XHJcblxyXG4gICAgICAgICAgICBpZiAobmkgPj0geGMubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgIGlmIChyKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTmVlZGVkIGJ5IHNxcnQuXHJcbiAgICAgICAgICAgICAgICBmb3IgKDsgeGMubGVuZ3RoIDw9IG5pOyB4Yy5wdXNoKDApKTtcclxuICAgICAgICAgICAgICAgIG4gPSByZCA9IDA7XHJcbiAgICAgICAgICAgICAgICBkID0gMTtcclxuICAgICAgICAgICAgICAgIGkgJT0gTE9HX0JBU0U7XHJcbiAgICAgICAgICAgICAgICBqID0gaSAtIExPR19CQVNFICsgMTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnJlYWsgb3V0O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBuID0gayA9IHhjW25pXTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gR2V0IHRoZSBudW1iZXIgb2YgZGlnaXRzIG9mIG4uXHJcbiAgICAgICAgICAgICAgZm9yIChkID0gMTsgayA+PSAxMDsgayAvPSAxMCwgZCsrKTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gR2V0IHRoZSBpbmRleCBvZiByZCB3aXRoaW4gbi5cclxuICAgICAgICAgICAgICBpICU9IExPR19CQVNFO1xyXG5cclxuICAgICAgICAgICAgICAvLyBHZXQgdGhlIGluZGV4IG9mIHJkIHdpdGhpbiBuLCBhZGp1c3RlZCBmb3IgbGVhZGluZyB6ZXJvcy5cclxuICAgICAgICAgICAgICAvLyBUaGUgbnVtYmVyIG9mIGxlYWRpbmcgemVyb3Mgb2YgbiBpcyBnaXZlbiBieSBMT0dfQkFTRSAtIGQuXHJcbiAgICAgICAgICAgICAgaiA9IGkgLSBMT0dfQkFTRSArIGQ7XHJcblxyXG4gICAgICAgICAgICAgIC8vIEdldCB0aGUgcm91bmRpbmcgZGlnaXQgYXQgaW5kZXggaiBvZiBuLlxyXG4gICAgICAgICAgICAgIHJkID0gaiA8IDAgPyAwIDogbiAvIHBvd3MxMFtkIC0gaiAtIDFdICUgMTAgfCAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgciA9IHIgfHwgc2QgPCAwIHx8XHJcblxyXG4gICAgICAgICAgLy8gQXJlIHRoZXJlIGFueSBub24temVybyBkaWdpdHMgYWZ0ZXIgdGhlIHJvdW5kaW5nIGRpZ2l0P1xyXG4gICAgICAgICAgLy8gVGhlIGV4cHJlc3Npb24gIG4gJSBwb3dzMTBbZCAtIGogLSAxXSAgcmV0dXJucyBhbGwgZGlnaXRzIG9mIG4gdG8gdGhlIHJpZ2h0XHJcbiAgICAgICAgICAvLyBvZiB0aGUgZGlnaXQgYXQgaiwgZS5nLiBpZiBuIGlzIDkwODcxNCBhbmQgaiBpcyAyLCB0aGUgZXhwcmVzc2lvbiBnaXZlcyA3MTQuXHJcbiAgICAgICAgICAgeGNbbmkgKyAxXSAhPSBudWxsIHx8IChqIDwgMCA/IG4gOiBuICUgcG93czEwW2QgLSBqIC0gMV0pO1xyXG5cclxuICAgICAgICAgIHIgPSBybSA8IDRcclxuICAgICAgICAgICA/IChyZCB8fCByKSAmJiAocm0gPT0gMCB8fCBybSA9PSAoeC5zIDwgMCA/IDMgOiAyKSlcclxuICAgICAgICAgICA6IHJkID4gNSB8fCByZCA9PSA1ICYmIChybSA9PSA0IHx8IHIgfHwgcm0gPT0gNiAmJlxyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgd2hldGhlciB0aGUgZGlnaXQgdG8gdGhlIGxlZnQgb2YgdGhlIHJvdW5kaW5nIGRpZ2l0IGlzIG9kZC5cclxuICAgICAgICAgICAgKChpID4gMCA/IGogPiAwID8gbiAvIHBvd3MxMFtkIC0gal0gOiAwIDogeGNbbmkgLSAxXSkgJSAxMCkgJiAxIHx8XHJcbiAgICAgICAgICAgICBybSA9PSAoeC5zIDwgMCA/IDggOiA3KSk7XHJcblxyXG4gICAgICAgICAgaWYgKHNkIDwgMSB8fCAheGNbMF0pIHtcclxuICAgICAgICAgICAgeGMubGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgICAgIGlmIChyKSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIENvbnZlcnQgc2QgdG8gZGVjaW1hbCBwbGFjZXMuXHJcbiAgICAgICAgICAgICAgc2QgLT0geC5lICsgMTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gMSwgMC4xLCAwLjAxLCAwLjAwMSwgMC4wMDAxIGV0Yy5cclxuICAgICAgICAgICAgICB4Y1swXSA9IHBvd3MxMFsoTE9HX0JBU0UgLSBzZCAlIExPR19CQVNFKSAlIExPR19CQVNFXTtcclxuICAgICAgICAgICAgICB4LmUgPSAtc2QgfHwgMDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgLy8gWmVyby5cclxuICAgICAgICAgICAgICB4Y1swXSA9IHguZSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB4O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIFJlbW92ZSBleGNlc3MgZGlnaXRzLlxyXG4gICAgICAgICAgaWYgKGkgPT0gMCkge1xyXG4gICAgICAgICAgICB4Yy5sZW5ndGggPSBuaTtcclxuICAgICAgICAgICAgayA9IDE7XHJcbiAgICAgICAgICAgIG5pLS07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB4Yy5sZW5ndGggPSBuaSArIDE7XHJcbiAgICAgICAgICAgIGsgPSBwb3dzMTBbTE9HX0JBU0UgLSBpXTtcclxuXHJcbiAgICAgICAgICAgIC8vIEUuZy4gNTY3MDAgYmVjb21lcyA1NjAwMCBpZiA3IGlzIHRoZSByb3VuZGluZyBkaWdpdC5cclxuICAgICAgICAgICAgLy8gaiA+IDAgbWVhbnMgaSA+IG51bWJlciBvZiBsZWFkaW5nIHplcm9zIG9mIG4uXHJcbiAgICAgICAgICAgIHhjW25pXSA9IGogPiAwID8gbWF0aGZsb29yKG4gLyBwb3dzMTBbZCAtIGpdICUgcG93czEwW2pdKSAqIGsgOiAwO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIFJvdW5kIHVwP1xyXG4gICAgICAgICAgaWYgKHIpIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAoOyA7KSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIElmIHRoZSBkaWdpdCB0byBiZSByb3VuZGVkIHVwIGlzIGluIHRoZSBmaXJzdCBlbGVtZW50IG9mIHhjLi4uXHJcbiAgICAgICAgICAgICAgaWYgKG5pID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpIHdpbGwgYmUgdGhlIGxlbmd0aCBvZiB4Y1swXSBiZWZvcmUgayBpcyBhZGRlZC5cclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDEsIGogPSB4Y1swXTsgaiA+PSAxMDsgaiAvPSAxMCwgaSsrKTtcclxuICAgICAgICAgICAgICAgIGogPSB4Y1swXSArPSBrO1xyXG4gICAgICAgICAgICAgICAgZm9yIChrID0gMTsgaiA+PSAxMDsgaiAvPSAxMCwgaysrKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpZiBpICE9IGsgdGhlIGxlbmd0aCBoYXMgaW5jcmVhc2VkLlxyXG4gICAgICAgICAgICAgICAgaWYgKGkgIT0gaykge1xyXG4gICAgICAgICAgICAgICAgICB4LmUrKztcclxuICAgICAgICAgICAgICAgICAgaWYgKHhjWzBdID09IEJBU0UpIHhjWzBdID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgeGNbbmldICs9IGs7XHJcbiAgICAgICAgICAgICAgICBpZiAoeGNbbmldICE9IEJBU0UpIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgeGNbbmktLV0gPSAwO1xyXG4gICAgICAgICAgICAgICAgayA9IDE7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHplcm9zLlxyXG4gICAgICAgICAgZm9yIChpID0geGMubGVuZ3RoOyB4Y1stLWldID09PSAwOyB4Yy5wb3AoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBPdmVyZmxvdz8gSW5maW5pdHkuXHJcbiAgICAgICAgaWYgKHguZSA+IE1BWF9FWFApIHtcclxuICAgICAgICAgIHguYyA9IHguZSA9IG51bGw7XHJcblxyXG4gICAgICAgIC8vIFVuZGVyZmxvdz8gWmVyby5cclxuICAgICAgICB9IGVsc2UgaWYgKHguZSA8IE1JTl9FWFApIHtcclxuICAgICAgICAgIHguYyA9IFt4LmUgPSAwXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB4O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBQUk9UT1RZUEUvSU5TVEFOQ0UgTUVUSE9EU1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgYWJzb2x1dGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIuXHJcbiAgICAgKi9cclxuICAgIFAuYWJzb2x1dGVWYWx1ZSA9IFAuYWJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgeCA9IG5ldyBCaWdOdW1iZXIodGhpcyk7XHJcbiAgICAgIGlmICh4LnMgPCAwKSB4LnMgPSAxO1xyXG4gICAgICByZXR1cm4geDtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm5cclxuICAgICAqICAgMSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgZ3JlYXRlciB0aGFuIHRoZSB2YWx1ZSBvZiBCaWdOdW1iZXIoeSwgYiksXHJcbiAgICAgKiAgIC0xIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBsZXNzIHRoYW4gdGhlIHZhbHVlIG9mIEJpZ051bWJlcih5LCBiKSxcclxuICAgICAqICAgMCBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgdmFsdWUsXHJcbiAgICAgKiAgIG9yIG51bGwgaWYgdGhlIHZhbHVlIG9mIGVpdGhlciBpcyBOYU4uXHJcbiAgICAgKi9cclxuICAgIFAuY29tcGFyZWRUbyA9IGZ1bmN0aW9uICh5LCBiKSB7XHJcbiAgICAgIHJldHVybiBjb21wYXJlKHRoaXMsIG5ldyBCaWdOdW1iZXIoeSwgYikpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIElmIGRwIGlzIHVuZGVmaW5lZCBvciBudWxsIG9yIHRydWUgb3IgZmFsc2UsIHJldHVybiB0aGUgbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzIG9mIHRoZVxyXG4gICAgICogdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIsIG9yIG51bGwgaWYgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGlzIMKxSW5maW5pdHkgb3IgTmFOLlxyXG4gICAgICpcclxuICAgICAqIE90aGVyd2lzZSwgaWYgZHAgaXMgYSBudW1iZXIsIHJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXNcclxuICAgICAqIEJpZ051bWJlciByb3VuZGVkIHRvIGEgbWF4aW11bSBvZiBkcCBkZWNpbWFsIHBsYWNlcyB1c2luZyByb3VuZGluZyBtb2RlIHJtLCBvclxyXG4gICAgICogUk9VTkRJTkdfTU9ERSBpZiBybSBpcyBvbWl0dGVkLlxyXG4gICAgICpcclxuICAgICAqIFtkcF0ge251bWJlcn0gRGVjaW1hbCBwbGFjZXM6IGludGVnZXIsIDAgdG8gTUFYIGluY2x1c2l2ZS5cclxuICAgICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgICAqXHJcbiAgICAgKiAnW0JpZ051bWJlciBFcnJvcl0gQXJndW1lbnQge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge2RwfHJtfSdcclxuICAgICAqL1xyXG4gICAgUC5kZWNpbWFsUGxhY2VzID0gUC5kcCA9IGZ1bmN0aW9uIChkcCwgcm0pIHtcclxuICAgICAgdmFyIGMsIG4sIHYsXHJcbiAgICAgICAgeCA9IHRoaXM7XHJcblxyXG4gICAgICBpZiAoZHAgIT0gbnVsbCkge1xyXG4gICAgICAgIGludENoZWNrKGRwLCAwLCBNQVgpO1xyXG4gICAgICAgIGlmIChybSA9PSBudWxsKSBybSA9IFJPVU5ESU5HX01PREU7XHJcbiAgICAgICAgZWxzZSBpbnRDaGVjayhybSwgMCwgOCk7XHJcblxyXG4gICAgICAgIHJldHVybiByb3VuZChuZXcgQmlnTnVtYmVyKHgpLCBkcCArIHguZSArIDEsIHJtKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCEoYyA9IHguYykpIHJldHVybiBudWxsO1xyXG4gICAgICBuID0gKCh2ID0gYy5sZW5ndGggLSAxKSAtIGJpdEZsb29yKHRoaXMuZSAvIExPR19CQVNFKSkgKiBMT0dfQkFTRTtcclxuXHJcbiAgICAgIC8vIFN1YnRyYWN0IHRoZSBudW1iZXIgb2YgdHJhaWxpbmcgemVyb3Mgb2YgdGhlIGxhc3QgbnVtYmVyLlxyXG4gICAgICBpZiAodiA9IGNbdl0pIGZvciAoOyB2ICUgMTAgPT0gMDsgdiAvPSAxMCwgbi0tKTtcclxuICAgICAgaWYgKG4gPCAwKSBuID0gMDtcclxuXHJcbiAgICAgIHJldHVybiBuO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqICBuIC8gMCA9IElcclxuICAgICAqICBuIC8gTiA9IE5cclxuICAgICAqICBuIC8gSSA9IDBcclxuICAgICAqICAwIC8gbiA9IDBcclxuICAgICAqICAwIC8gMCA9IE5cclxuICAgICAqICAwIC8gTiA9IE5cclxuICAgICAqICAwIC8gSSA9IDBcclxuICAgICAqICBOIC8gbiA9IE5cclxuICAgICAqICBOIC8gMCA9IE5cclxuICAgICAqICBOIC8gTiA9IE5cclxuICAgICAqICBOIC8gSSA9IE5cclxuICAgICAqICBJIC8gbiA9IElcclxuICAgICAqICBJIC8gMCA9IElcclxuICAgICAqICBJIC8gTiA9IE5cclxuICAgICAqICBJIC8gSSA9IE5cclxuICAgICAqXHJcbiAgICAgKiBSZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBkaXZpZGVkIGJ5IHRoZSB2YWx1ZSBvZlxyXG4gICAgICogQmlnTnVtYmVyKHksIGIpLCByb3VuZGVkIGFjY29yZGluZyB0byBERUNJTUFMX1BMQUNFUyBhbmQgUk9VTkRJTkdfTU9ERS5cclxuICAgICAqL1xyXG4gICAgUC5kaXZpZGVkQnkgPSBQLmRpdiA9IGZ1bmN0aW9uICh5LCBiKSB7XHJcbiAgICAgIHJldHVybiBkaXYodGhpcywgbmV3IEJpZ051bWJlcih5LCBiKSwgREVDSU1BTF9QTEFDRVMsIFJPVU5ESU5HX01PREUpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIGludGVnZXIgcGFydCBvZiBkaXZpZGluZyB0aGUgdmFsdWUgb2YgdGhpc1xyXG4gICAgICogQmlnTnVtYmVyIGJ5IHRoZSB2YWx1ZSBvZiBCaWdOdW1iZXIoeSwgYikuXHJcbiAgICAgKi9cclxuICAgIFAuZGl2aWRlZFRvSW50ZWdlckJ5ID0gUC5pZGl2ID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgICAgcmV0dXJuIGRpdih0aGlzLCBuZXcgQmlnTnVtYmVyKHksIGIpLCAwLCAxKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gYSBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGV4cG9uZW50aWF0ZWQgYnkgbi5cclxuICAgICAqXHJcbiAgICAgKiBJZiBtIGlzIHByZXNlbnQsIHJldHVybiB0aGUgcmVzdWx0IG1vZHVsbyBtLlxyXG4gICAgICogSWYgbiBpcyBuZWdhdGl2ZSByb3VuZCBhY2NvcmRpbmcgdG8gREVDSU1BTF9QTEFDRVMgYW5kIFJPVU5ESU5HX01PREUuXHJcbiAgICAgKiBJZiBQT1dfUFJFQ0lTSU9OIGlzIG5vbi16ZXJvIGFuZCBtIGlzIG5vdCBwcmVzZW50LCByb3VuZCB0byBQT1dfUFJFQ0lTSU9OIHVzaW5nIFJPVU5ESU5HX01PREUuXHJcbiAgICAgKlxyXG4gICAgICogVGhlIG1vZHVsYXIgcG93ZXIgb3BlcmF0aW9uIHdvcmtzIGVmZmljaWVudGx5IHdoZW4geCwgbiwgYW5kIG0gYXJlIGludGVnZXJzLCBvdGhlcndpc2UgaXRcclxuICAgICAqIGlzIGVxdWl2YWxlbnQgdG8gY2FsY3VsYXRpbmcgeC5leHBvbmVudGlhdGVkQnkobikubW9kdWxvKG0pIHdpdGggYSBQT1dfUFJFQ0lTSU9OIG9mIDAuXHJcbiAgICAgKlxyXG4gICAgICogbiB7bnVtYmVyfHN0cmluZ3xCaWdOdW1iZXJ9IFRoZSBleHBvbmVudC4gQW4gaW50ZWdlci5cclxuICAgICAqIFttXSB7bnVtYmVyfHN0cmluZ3xCaWdOdW1iZXJ9IFRoZSBtb2R1bHVzLlxyXG4gICAgICpcclxuICAgICAqICdbQmlnTnVtYmVyIEVycm9yXSBFeHBvbmVudCBub3QgYW4gaW50ZWdlcjoge259J1xyXG4gICAgICovXHJcbiAgICBQLmV4cG9uZW50aWF0ZWRCeSA9IFAucG93ID0gZnVuY3Rpb24gKG4sIG0pIHtcclxuICAgICAgdmFyIGhhbGYsIGlzTW9kRXhwLCBrLCBtb3JlLCBuSXNCaWcsIG5Jc05lZywgbklzT2RkLCB5LFxyXG4gICAgICAgIHggPSB0aGlzO1xyXG5cclxuICAgICAgbiA9IG5ldyBCaWdOdW1iZXIobik7XHJcblxyXG4gICAgICAvLyBBbGxvdyBOYU4gYW5kIMKxSW5maW5pdHksIGJ1dCBub3Qgb3RoZXIgbm9uLWludGVnZXJzLlxyXG4gICAgICBpZiAobi5jICYmICFuLmlzSW50ZWdlcigpKSB7XHJcbiAgICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgICAgIChiaWdudW1iZXJFcnJvciArICdFeHBvbmVudCBub3QgYW4gaW50ZWdlcjogJyArIG4pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAobSAhPSBudWxsKSBtID0gbmV3IEJpZ051bWJlcihtKTtcclxuXHJcbiAgICAgIC8vIEV4cG9uZW50IG9mIE1BWF9TQUZFX0lOVEVHRVIgaXMgMTUuXHJcbiAgICAgIG5Jc0JpZyA9IG4uZSA+IDE0O1xyXG5cclxuICAgICAgLy8gSWYgeCBpcyBOYU4sIMKxSW5maW5pdHksIMKxMCBvciDCsTEsIG9yIG4gaXMgwrFJbmZpbml0eSwgTmFOIG9yIMKxMC5cclxuICAgICAgaWYgKCF4LmMgfHwgIXguY1swXSB8fCB4LmNbMF0gPT0gMSAmJiAheC5lICYmIHguYy5sZW5ndGggPT0gMSB8fCAhbi5jIHx8ICFuLmNbMF0pIHtcclxuXHJcbiAgICAgICAgLy8gVGhlIHNpZ24gb2YgdGhlIHJlc3VsdCBvZiBwb3cgd2hlbiB4IGlzIG5lZ2F0aXZlIGRlcGVuZHMgb24gdGhlIGV2ZW5uZXNzIG9mIG4uXHJcbiAgICAgICAgLy8gSWYgK24gb3ZlcmZsb3dzIHRvIMKxSW5maW5pdHksIHRoZSBldmVubmVzcyBvZiBuIHdvdWxkIGJlIG5vdCBiZSBrbm93bi5cclxuICAgICAgICB5ID0gbmV3IEJpZ051bWJlcihNYXRoLnBvdygreC52YWx1ZU9mKCksIG5Jc0JpZyA/IDIgLSBpc09kZChuKSA6ICtuKSk7XHJcbiAgICAgICAgcmV0dXJuIG0gPyB5Lm1vZChtKSA6IHk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG5Jc05lZyA9IG4ucyA8IDA7XHJcblxyXG4gICAgICBpZiAobSkge1xyXG5cclxuICAgICAgICAvLyB4ICUgbSByZXR1cm5zIE5hTiBpZiBhYnMobSkgaXMgemVybywgb3IgbSBpcyBOYU4uXHJcbiAgICAgICAgaWYgKG0uYyA/ICFtLmNbMF0gOiAhbS5zKSByZXR1cm4gbmV3IEJpZ051bWJlcihOYU4pO1xyXG5cclxuICAgICAgICBpc01vZEV4cCA9ICFuSXNOZWcgJiYgeC5pc0ludGVnZXIoKSAmJiBtLmlzSW50ZWdlcigpO1xyXG5cclxuICAgICAgICBpZiAoaXNNb2RFeHApIHggPSB4Lm1vZChtKTtcclxuXHJcbiAgICAgIC8vIE92ZXJmbG93IHRvIMKxSW5maW5pdHk6ID49MioqMWUxMCBvciA+PTEuMDAwMDAyNCoqMWUxNS5cclxuICAgICAgLy8gVW5kZXJmbG93IHRvIMKxMDogPD0wLjc5KioxZTEwIG9yIDw9MC45OTk5OTc1KioxZTE1LlxyXG4gICAgICB9IGVsc2UgaWYgKG4uZSA+IDkgJiYgKHguZSA+IDAgfHwgeC5lIDwgLTEgfHwgKHguZSA9PSAwXHJcbiAgICAgICAgLy8gWzEsIDI0MDAwMDAwMF1cclxuICAgICAgICA/IHguY1swXSA+IDEgfHwgbklzQmlnICYmIHguY1sxXSA+PSAyNGU3XHJcbiAgICAgICAgLy8gWzgwMDAwMDAwMDAwMDAwXSAgWzk5OTk5NzUwMDAwMDAwXVxyXG4gICAgICAgIDogeC5jWzBdIDwgOGUxMyB8fCBuSXNCaWcgJiYgeC5jWzBdIDw9IDk5OTk5NzVlNykpKSB7XHJcblxyXG4gICAgICAgIC8vIElmIHggaXMgbmVnYXRpdmUgYW5kIG4gaXMgb2RkLCBrID0gLTAsIGVsc2UgayA9IDAuXHJcbiAgICAgICAgayA9IHgucyA8IDAgJiYgaXNPZGQobikgPyAtMCA6IDA7XHJcblxyXG4gICAgICAgIC8vIElmIHggPj0gMSwgayA9IMKxSW5maW5pdHkuXHJcbiAgICAgICAgaWYgKHguZSA+IC0xKSBrID0gMSAvIGs7XHJcblxyXG4gICAgICAgIC8vIElmIG4gaXMgbmVnYXRpdmUgcmV0dXJuIMKxMCwgZWxzZSByZXR1cm4gwrFJbmZpbml0eS5cclxuICAgICAgICByZXR1cm4gbmV3IEJpZ051bWJlcihuSXNOZWcgPyAxIC8gayA6IGspO1xyXG5cclxuICAgICAgfSBlbHNlIGlmIChQT1dfUFJFQ0lTSU9OKSB7XHJcblxyXG4gICAgICAgIC8vIFRydW5jYXRpbmcgZWFjaCBjb2VmZmljaWVudCBhcnJheSB0byBhIGxlbmd0aCBvZiBrIGFmdGVyIGVhY2ggbXVsdGlwbGljYXRpb25cclxuICAgICAgICAvLyBlcXVhdGVzIHRvIHRydW5jYXRpbmcgc2lnbmlmaWNhbnQgZGlnaXRzIHRvIFBPV19QUkVDSVNJT04gKyBbMjgsIDQxXSxcclxuICAgICAgICAvLyBpLmUuIHRoZXJlIHdpbGwgYmUgYSBtaW5pbXVtIG9mIDI4IGd1YXJkIGRpZ2l0cyByZXRhaW5lZC5cclxuICAgICAgICBrID0gbWF0aGNlaWwoUE9XX1BSRUNJU0lPTiAvIExPR19CQVNFICsgMik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChuSXNCaWcpIHtcclxuICAgICAgICBoYWxmID0gbmV3IEJpZ051bWJlcigwLjUpO1xyXG4gICAgICAgIG5Jc09kZCA9IGlzT2RkKG4pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5Jc09kZCA9IG4gJSAyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAobklzTmVnKSBuLnMgPSAxO1xyXG5cclxuICAgICAgeSA9IG5ldyBCaWdOdW1iZXIoT05FKTtcclxuXHJcbiAgICAgIC8vIFBlcmZvcm1zIDU0IGxvb3AgaXRlcmF0aW9ucyBmb3IgbiBvZiA5MDA3MTk5MjU0NzQwOTkxLlxyXG4gICAgICBmb3IgKDsgOykge1xyXG5cclxuICAgICAgICBpZiAobklzT2RkKSB7XHJcbiAgICAgICAgICB5ID0geS50aW1lcyh4KTtcclxuICAgICAgICAgIGlmICgheS5jKSBicmVhaztcclxuXHJcbiAgICAgICAgICBpZiAoaykge1xyXG4gICAgICAgICAgICBpZiAoeS5jLmxlbmd0aCA+IGspIHkuYy5sZW5ndGggPSBrO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChpc01vZEV4cCkge1xyXG4gICAgICAgICAgICB5ID0geS5tb2QobSk7ICAgIC8veSA9IHkubWludXMoZGl2KHksIG0sIDAsIE1PRFVMT19NT0RFKS50aW1lcyhtKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobklzQmlnKSB7XHJcbiAgICAgICAgICBuID0gbi50aW1lcyhoYWxmKTtcclxuICAgICAgICAgIHJvdW5kKG4sIG4uZSArIDEsIDEpO1xyXG4gICAgICAgICAgaWYgKCFuLmNbMF0pIGJyZWFrO1xyXG4gICAgICAgICAgbklzQmlnID0gbi5lID4gMTQ7XHJcbiAgICAgICAgICBuSXNPZGQgPSBpc09kZChuKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbiA9IG1hdGhmbG9vcihuIC8gMik7XHJcbiAgICAgICAgICBpZiAoIW4pIGJyZWFrO1xyXG4gICAgICAgICAgbklzT2RkID0gbiAlIDI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB4ID0geC50aW1lcyh4KTtcclxuXHJcbiAgICAgICAgaWYgKGspIHtcclxuICAgICAgICAgIGlmICh4LmMgJiYgeC5jLmxlbmd0aCA+IGspIHguYy5sZW5ndGggPSBrO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNNb2RFeHApIHtcclxuICAgICAgICAgIHggPSB4Lm1vZChtKTsgICAgLy94ID0geC5taW51cyhkaXYoeCwgbSwgMCwgTU9EVUxPX01PREUpLnRpbWVzKG0pKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpc01vZEV4cCkgcmV0dXJuIHk7XHJcbiAgICAgIGlmIChuSXNOZWcpIHkgPSBPTkUuZGl2KHkpO1xyXG5cclxuICAgICAgcmV0dXJuIG0gPyB5Lm1vZChtKSA6IGsgPyByb3VuZCh5LCBQT1dfUFJFQ0lTSU9OLCBST1VORElOR19NT0RFLCBtb3JlKSA6IHk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgcm91bmRlZCB0byBhbiBpbnRlZ2VyXHJcbiAgICAgKiB1c2luZyByb3VuZGluZyBtb2RlIHJtLCBvciBST1VORElOR19NT0RFIGlmIHJtIGlzIG9taXR0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogW3JtXSB7bnVtYmVyfSBSb3VuZGluZyBtb2RlLiBJbnRlZ2VyLCAwIHRvIDggaW5jbHVzaXZlLlxyXG4gICAgICpcclxuICAgICAqICdbQmlnTnVtYmVyIEVycm9yXSBBcmd1bWVudCB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V9OiB7cm19J1xyXG4gICAgICovXHJcbiAgICBQLmludGVnZXJWYWx1ZSA9IGZ1bmN0aW9uIChybSkge1xyXG4gICAgICB2YXIgbiA9IG5ldyBCaWdOdW1iZXIodGhpcyk7XHJcbiAgICAgIGlmIChybSA9PSBudWxsKSBybSA9IFJPVU5ESU5HX01PREU7XHJcbiAgICAgIGVsc2UgaW50Q2hlY2socm0sIDAsIDgpO1xyXG4gICAgICByZXR1cm4gcm91bmQobiwgbi5lICsgMSwgcm0pO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBlcXVhbCB0byB0aGUgdmFsdWUgb2YgQmlnTnVtYmVyKHksIGIpLFxyXG4gICAgICogb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgUC5pc0VxdWFsVG8gPSBQLmVxID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgICAgcmV0dXJuIGNvbXBhcmUodGhpcywgbmV3IEJpZ051bWJlcih5LCBiKSkgPT09IDA7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGlzIGEgZmluaXRlIG51bWJlciwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgUC5pc0Zpbml0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuICEhdGhpcy5jO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBncmVhdGVyIHRoYW4gdGhlIHZhbHVlIG9mIEJpZ051bWJlcih5LCBiKSxcclxuICAgICAqIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIFAuaXNHcmVhdGVyVGhhbiA9IFAuZ3QgPSBmdW5jdGlvbiAoeSwgYikge1xyXG4gICAgICByZXR1cm4gY29tcGFyZSh0aGlzLCBuZXcgQmlnTnVtYmVyKHksIGIpKSA+IDA7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB0aGUgdmFsdWUgb2ZcclxuICAgICAqIEJpZ051bWJlcih5LCBiKSwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgUC5pc0dyZWF0ZXJUaGFuT3JFcXVhbFRvID0gUC5ndGUgPSBmdW5jdGlvbiAoeSwgYikge1xyXG4gICAgICByZXR1cm4gKGIgPSBjb21wYXJlKHRoaXMsIG5ldyBCaWdOdW1iZXIoeSwgYikpKSA9PT0gMSB8fCBiID09PSAwO1xyXG5cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgYW4gaW50ZWdlciwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgUC5pc0ludGVnZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiAhIXRoaXMuYyAmJiBiaXRGbG9vcih0aGlzLmUgLyBMT0dfQkFTRSkgPiB0aGlzLmMubGVuZ3RoIC0gMjtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgbGVzcyB0aGFuIHRoZSB2YWx1ZSBvZiBCaWdOdW1iZXIoeSwgYiksXHJcbiAgICAgKiBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICBQLmlzTGVzc1RoYW4gPSBQLmx0ID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgICAgcmV0dXJuIGNvbXBhcmUodGhpcywgbmV3IEJpZ051bWJlcih5LCBiKSkgPCAwO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHZhbHVlIG9mXHJcbiAgICAgKiBCaWdOdW1iZXIoeSwgYiksIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIFAuaXNMZXNzVGhhbk9yRXF1YWxUbyA9IFAubHRlID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgICAgcmV0dXJuIChiID0gY29tcGFyZSh0aGlzLCBuZXcgQmlnTnVtYmVyKHksIGIpKSkgPT09IC0xIHx8IGIgPT09IDA7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGlzIE5hTiwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgUC5pc05hTiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuICF0aGlzLnM7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGlzIG5lZ2F0aXZlLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICBQLmlzTmVnYXRpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnMgPCAwO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBwb3NpdGl2ZSwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgUC5pc1Bvc2l0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5zID4gMDtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgMCBvciAtMCwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgUC5pc1plcm8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiAhIXRoaXMuYyAmJiB0aGlzLmNbMF0gPT0gMDtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiAgbiAtIDAgPSBuXHJcbiAgICAgKiAgbiAtIE4gPSBOXHJcbiAgICAgKiAgbiAtIEkgPSAtSVxyXG4gICAgICogIDAgLSBuID0gLW5cclxuICAgICAqICAwIC0gMCA9IDBcclxuICAgICAqICAwIC0gTiA9IE5cclxuICAgICAqICAwIC0gSSA9IC1JXHJcbiAgICAgKiAgTiAtIG4gPSBOXHJcbiAgICAgKiAgTiAtIDAgPSBOXHJcbiAgICAgKiAgTiAtIE4gPSBOXHJcbiAgICAgKiAgTiAtIEkgPSBOXHJcbiAgICAgKiAgSSAtIG4gPSBJXHJcbiAgICAgKiAgSSAtIDAgPSBJXHJcbiAgICAgKiAgSSAtIE4gPSBOXHJcbiAgICAgKiAgSSAtIEkgPSBOXHJcbiAgICAgKlxyXG4gICAgICogUmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgbWludXMgdGhlIHZhbHVlIG9mXHJcbiAgICAgKiBCaWdOdW1iZXIoeSwgYikuXHJcbiAgICAgKi9cclxuICAgIFAubWludXMgPSBmdW5jdGlvbiAoeSwgYikge1xyXG4gICAgICB2YXIgaSwgaiwgdCwgeExUeSxcclxuICAgICAgICB4ID0gdGhpcyxcclxuICAgICAgICBhID0geC5zO1xyXG5cclxuICAgICAgeSA9IG5ldyBCaWdOdW1iZXIoeSwgYik7XHJcbiAgICAgIGIgPSB5LnM7XHJcblxyXG4gICAgICAvLyBFaXRoZXIgTmFOP1xyXG4gICAgICBpZiAoIWEgfHwgIWIpIHJldHVybiBuZXcgQmlnTnVtYmVyKE5hTik7XHJcblxyXG4gICAgICAvLyBTaWducyBkaWZmZXI/XHJcbiAgICAgIGlmIChhICE9IGIpIHtcclxuICAgICAgICB5LnMgPSAtYjtcclxuICAgICAgICByZXR1cm4geC5wbHVzKHkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgeGUgPSB4LmUgLyBMT0dfQkFTRSxcclxuICAgICAgICB5ZSA9IHkuZSAvIExPR19CQVNFLFxyXG4gICAgICAgIHhjID0geC5jLFxyXG4gICAgICAgIHljID0geS5jO1xyXG5cclxuICAgICAgaWYgKCF4ZSB8fCAheWUpIHtcclxuXHJcbiAgICAgICAgLy8gRWl0aGVyIEluZmluaXR5P1xyXG4gICAgICAgIGlmICgheGMgfHwgIXljKSByZXR1cm4geGMgPyAoeS5zID0gLWIsIHkpIDogbmV3IEJpZ051bWJlcih5YyA/IHggOiBOYU4pO1xyXG5cclxuICAgICAgICAvLyBFaXRoZXIgemVybz9cclxuICAgICAgICBpZiAoIXhjWzBdIHx8ICF5Y1swXSkge1xyXG5cclxuICAgICAgICAgIC8vIFJldHVybiB5IGlmIHkgaXMgbm9uLXplcm8sIHggaWYgeCBpcyBub24temVybywgb3IgemVybyBpZiBib3RoIGFyZSB6ZXJvLlxyXG4gICAgICAgICAgcmV0dXJuIHljWzBdID8gKHkucyA9IC1iLCB5KSA6IG5ldyBCaWdOdW1iZXIoeGNbMF0gPyB4IDpcclxuXHJcbiAgICAgICAgICAgLy8gSUVFRSA3NTQgKDIwMDgpIDYuMzogbiAtIG4gPSAtMCB3aGVuIHJvdW5kaW5nIHRvIC1JbmZpbml0eVxyXG4gICAgICAgICAgIFJPVU5ESU5HX01PREUgPT0gMyA/IC0wIDogMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB4ZSA9IGJpdEZsb29yKHhlKTtcclxuICAgICAgeWUgPSBiaXRGbG9vcih5ZSk7XHJcbiAgICAgIHhjID0geGMuc2xpY2UoKTtcclxuXHJcbiAgICAgIC8vIERldGVybWluZSB3aGljaCBpcyB0aGUgYmlnZ2VyIG51bWJlci5cclxuICAgICAgaWYgKGEgPSB4ZSAtIHllKSB7XHJcblxyXG4gICAgICAgIGlmICh4TFR5ID0gYSA8IDApIHtcclxuICAgICAgICAgIGEgPSAtYTtcclxuICAgICAgICAgIHQgPSB4YztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgeWUgPSB4ZTtcclxuICAgICAgICAgIHQgPSB5YztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHQucmV2ZXJzZSgpO1xyXG5cclxuICAgICAgICAvLyBQcmVwZW5kIHplcm9zIHRvIGVxdWFsaXNlIGV4cG9uZW50cy5cclxuICAgICAgICBmb3IgKGIgPSBhOyBiLS07IHQucHVzaCgwKSk7XHJcbiAgICAgICAgdC5yZXZlcnNlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIC8vIEV4cG9uZW50cyBlcXVhbC4gQ2hlY2sgZGlnaXQgYnkgZGlnaXQuXHJcbiAgICAgICAgaiA9ICh4TFR5ID0gKGEgPSB4Yy5sZW5ndGgpIDwgKGIgPSB5Yy5sZW5ndGgpKSA/IGEgOiBiO1xyXG5cclxuICAgICAgICBmb3IgKGEgPSBiID0gMDsgYiA8IGo7IGIrKykge1xyXG5cclxuICAgICAgICAgIGlmICh4Y1tiXSAhPSB5Y1tiXSkge1xyXG4gICAgICAgICAgICB4TFR5ID0geGNbYl0gPCB5Y1tiXTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB4IDwgeT8gUG9pbnQgeGMgdG8gdGhlIGFycmF5IG9mIHRoZSBiaWdnZXIgbnVtYmVyLlxyXG4gICAgICBpZiAoeExUeSkgdCA9IHhjLCB4YyA9IHljLCB5YyA9IHQsIHkucyA9IC15LnM7XHJcblxyXG4gICAgICBiID0gKGogPSB5Yy5sZW5ndGgpIC0gKGkgPSB4Yy5sZW5ndGgpO1xyXG5cclxuICAgICAgLy8gQXBwZW5kIHplcm9zIHRvIHhjIGlmIHNob3J0ZXIuXHJcbiAgICAgIC8vIE5vIG5lZWQgdG8gYWRkIHplcm9zIHRvIHljIGlmIHNob3J0ZXIgYXMgc3VidHJhY3Qgb25seSBuZWVkcyB0byBzdGFydCBhdCB5Yy5sZW5ndGguXHJcbiAgICAgIGlmIChiID4gMCkgZm9yICg7IGItLTsgeGNbaSsrXSA9IDApO1xyXG4gICAgICBiID0gQkFTRSAtIDE7XHJcblxyXG4gICAgICAvLyBTdWJ0cmFjdCB5YyBmcm9tIHhjLlxyXG4gICAgICBmb3IgKDsgaiA+IGE7KSB7XHJcblxyXG4gICAgICAgIGlmICh4Y1stLWpdIDwgeWNbal0pIHtcclxuICAgICAgICAgIGZvciAoaSA9IGo7IGkgJiYgIXhjWy0taV07IHhjW2ldID0gYik7XHJcbiAgICAgICAgICAtLXhjW2ldO1xyXG4gICAgICAgICAgeGNbal0gKz0gQkFTRTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHhjW2pdIC09IHljW2pdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBSZW1vdmUgbGVhZGluZyB6ZXJvcyBhbmQgYWRqdXN0IGV4cG9uZW50IGFjY29yZGluZ2x5LlxyXG4gICAgICBmb3IgKDsgeGNbMF0gPT0gMDsgeGMuc3BsaWNlKDAsIDEpLCAtLXllKTtcclxuXHJcbiAgICAgIC8vIFplcm8/XHJcbiAgICAgIGlmICgheGNbMF0pIHtcclxuXHJcbiAgICAgICAgLy8gRm9sbG93aW5nIElFRUUgNzU0ICgyMDA4KSA2LjMsXHJcbiAgICAgICAgLy8gbiAtIG4gPSArMCAgYnV0ICBuIC0gbiA9IC0wICB3aGVuIHJvdW5kaW5nIHRvd2FyZHMgLUluZmluaXR5LlxyXG4gICAgICAgIHkucyA9IFJPVU5ESU5HX01PREUgPT0gMyA/IC0xIDogMTtcclxuICAgICAgICB5LmMgPSBbeS5lID0gMF07XHJcbiAgICAgICAgcmV0dXJuIHk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE5vIG5lZWQgdG8gY2hlY2sgZm9yIEluZmluaXR5IGFzICt4IC0gK3kgIT0gSW5maW5pdHkgJiYgLXggLSAteSAhPSBJbmZpbml0eVxyXG4gICAgICAvLyBmb3IgZmluaXRlIHggYW5kIHkuXHJcbiAgICAgIHJldHVybiBub3JtYWxpc2UoeSwgeGMsIHllKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiAgIG4gJSAwID0gIE5cclxuICAgICAqICAgbiAlIE4gPSAgTlxyXG4gICAgICogICBuICUgSSA9ICBuXHJcbiAgICAgKiAgIDAgJSBuID0gIDBcclxuICAgICAqICAtMCAlIG4gPSAtMFxyXG4gICAgICogICAwICUgMCA9ICBOXHJcbiAgICAgKiAgIDAgJSBOID0gIE5cclxuICAgICAqICAgMCAlIEkgPSAgMFxyXG4gICAgICogICBOICUgbiA9ICBOXHJcbiAgICAgKiAgIE4gJSAwID0gIE5cclxuICAgICAqICAgTiAlIE4gPSAgTlxyXG4gICAgICogICBOICUgSSA9ICBOXHJcbiAgICAgKiAgIEkgJSBuID0gIE5cclxuICAgICAqICAgSSAlIDAgPSAgTlxyXG4gICAgICogICBJICUgTiA9ICBOXHJcbiAgICAgKiAgIEkgJSBJID0gIE5cclxuICAgICAqXHJcbiAgICAgKiBSZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBtb2R1bG8gdGhlIHZhbHVlIG9mXHJcbiAgICAgKiBCaWdOdW1iZXIoeSwgYikuIFRoZSByZXN1bHQgZGVwZW5kcyBvbiB0aGUgdmFsdWUgb2YgTU9EVUxPX01PREUuXHJcbiAgICAgKi9cclxuICAgIFAubW9kdWxvID0gUC5tb2QgPSBmdW5jdGlvbiAoeSwgYikge1xyXG4gICAgICB2YXIgcSwgcyxcclxuICAgICAgICB4ID0gdGhpcztcclxuXHJcbiAgICAgIHkgPSBuZXcgQmlnTnVtYmVyKHksIGIpO1xyXG5cclxuICAgICAgLy8gUmV0dXJuIE5hTiBpZiB4IGlzIEluZmluaXR5IG9yIE5hTiwgb3IgeSBpcyBOYU4gb3IgemVyby5cclxuICAgICAgaWYgKCF4LmMgfHwgIXkucyB8fCB5LmMgJiYgIXkuY1swXSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgQmlnTnVtYmVyKE5hTik7XHJcblxyXG4gICAgICAvLyBSZXR1cm4geCBpZiB5IGlzIEluZmluaXR5IG9yIHggaXMgemVyby5cclxuICAgICAgfSBlbHNlIGlmICgheS5jIHx8IHguYyAmJiAheC5jWzBdKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBCaWdOdW1iZXIoeCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChNT0RVTE9fTU9ERSA9PSA5KSB7XHJcblxyXG4gICAgICAgIC8vIEV1Y2xpZGlhbiBkaXZpc2lvbjogcSA9IHNpZ24oeSkgKiBmbG9vcih4IC8gYWJzKHkpKVxyXG4gICAgICAgIC8vIHIgPSB4IC0gcXkgICAgd2hlcmUgIDAgPD0gciA8IGFicyh5KVxyXG4gICAgICAgIHMgPSB5LnM7XHJcbiAgICAgICAgeS5zID0gMTtcclxuICAgICAgICBxID0gZGl2KHgsIHksIDAsIDMpO1xyXG4gICAgICAgIHkucyA9IHM7XHJcbiAgICAgICAgcS5zICo9IHM7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcSA9IGRpdih4LCB5LCAwLCBNT0RVTE9fTU9ERSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHkgPSB4Lm1pbnVzKHEudGltZXMoeSkpO1xyXG5cclxuICAgICAgLy8gVG8gbWF0Y2ggSmF2YVNjcmlwdCAlLCBlbnN1cmUgc2lnbiBvZiB6ZXJvIGlzIHNpZ24gb2YgZGl2aWRlbmQuXHJcbiAgICAgIGlmICgheS5jWzBdICYmIE1PRFVMT19NT0RFID09IDEpIHkucyA9IHgucztcclxuXHJcbiAgICAgIHJldHVybiB5O1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqICBuICogMCA9IDBcclxuICAgICAqICBuICogTiA9IE5cclxuICAgICAqICBuICogSSA9IElcclxuICAgICAqICAwICogbiA9IDBcclxuICAgICAqICAwICogMCA9IDBcclxuICAgICAqICAwICogTiA9IE5cclxuICAgICAqICAwICogSSA9IE5cclxuICAgICAqICBOICogbiA9IE5cclxuICAgICAqICBOICogMCA9IE5cclxuICAgICAqICBOICogTiA9IE5cclxuICAgICAqICBOICogSSA9IE5cclxuICAgICAqICBJICogbiA9IElcclxuICAgICAqICBJICogMCA9IE5cclxuICAgICAqICBJICogTiA9IE5cclxuICAgICAqICBJICogSSA9IElcclxuICAgICAqXHJcbiAgICAgKiBSZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBtdWx0aXBsaWVkIGJ5IHRoZSB2YWx1ZVxyXG4gICAgICogb2YgQmlnTnVtYmVyKHksIGIpLlxyXG4gICAgICovXHJcbiAgICBQLm11bHRpcGxpZWRCeSA9IFAudGltZXMgPSBmdW5jdGlvbiAoeSwgYikge1xyXG4gICAgICB2YXIgYywgZSwgaSwgaiwgaywgbSwgeGNMLCB4bG8sIHhoaSwgeWNMLCB5bG8sIHloaSwgemMsXHJcbiAgICAgICAgYmFzZSwgc3FydEJhc2UsXHJcbiAgICAgICAgeCA9IHRoaXMsXHJcbiAgICAgICAgeGMgPSB4LmMsXHJcbiAgICAgICAgeWMgPSAoeSA9IG5ldyBCaWdOdW1iZXIoeSwgYikpLmM7XHJcblxyXG4gICAgICAvLyBFaXRoZXIgTmFOLCDCsUluZmluaXR5IG9yIMKxMD9cclxuICAgICAgaWYgKCF4YyB8fCAheWMgfHwgIXhjWzBdIHx8ICF5Y1swXSkge1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gTmFOIGlmIGVpdGhlciBpcyBOYU4sIG9yIG9uZSBpcyAwIGFuZCB0aGUgb3RoZXIgaXMgSW5maW5pdHkuXHJcbiAgICAgICAgaWYgKCF4LnMgfHwgIXkucyB8fCB4YyAmJiAheGNbMF0gJiYgIXljIHx8IHljICYmICF5Y1swXSAmJiAheGMpIHtcclxuICAgICAgICAgIHkuYyA9IHkuZSA9IHkucyA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHkucyAqPSB4LnM7XHJcblxyXG4gICAgICAgICAgLy8gUmV0dXJuIMKxSW5maW5pdHkgaWYgZWl0aGVyIGlzIMKxSW5maW5pdHkuXHJcbiAgICAgICAgICBpZiAoIXhjIHx8ICF5Yykge1xyXG4gICAgICAgICAgICB5LmMgPSB5LmUgPSBudWxsO1xyXG5cclxuICAgICAgICAgIC8vIFJldHVybiDCsTAgaWYgZWl0aGVyIGlzIMKxMC5cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHkuYyA9IFswXTtcclxuICAgICAgICAgICAgeS5lID0gMDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB5O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBlID0gYml0Rmxvb3IoeC5lIC8gTE9HX0JBU0UpICsgYml0Rmxvb3IoeS5lIC8gTE9HX0JBU0UpO1xyXG4gICAgICB5LnMgKj0geC5zO1xyXG4gICAgICB4Y0wgPSB4Yy5sZW5ndGg7XHJcbiAgICAgIHljTCA9IHljLmxlbmd0aDtcclxuXHJcbiAgICAgIC8vIEVuc3VyZSB4YyBwb2ludHMgdG8gbG9uZ2VyIGFycmF5IGFuZCB4Y0wgdG8gaXRzIGxlbmd0aC5cclxuICAgICAgaWYgKHhjTCA8IHljTCkgemMgPSB4YywgeGMgPSB5YywgeWMgPSB6YywgaSA9IHhjTCwgeGNMID0geWNMLCB5Y0wgPSBpO1xyXG5cclxuICAgICAgLy8gSW5pdGlhbGlzZSB0aGUgcmVzdWx0IGFycmF5IHdpdGggemVyb3MuXHJcbiAgICAgIGZvciAoaSA9IHhjTCArIHljTCwgemMgPSBbXTsgaS0tOyB6Yy5wdXNoKDApKTtcclxuXHJcbiAgICAgIGJhc2UgPSBCQVNFO1xyXG4gICAgICBzcXJ0QmFzZSA9IFNRUlRfQkFTRTtcclxuXHJcbiAgICAgIGZvciAoaSA9IHljTDsgLS1pID49IDA7KSB7XHJcbiAgICAgICAgYyA9IDA7XHJcbiAgICAgICAgeWxvID0geWNbaV0gJSBzcXJ0QmFzZTtcclxuICAgICAgICB5aGkgPSB5Y1tpXSAvIHNxcnRCYXNlIHwgMDtcclxuXHJcbiAgICAgICAgZm9yIChrID0geGNMLCBqID0gaSArIGs7IGogPiBpOykge1xyXG4gICAgICAgICAgeGxvID0geGNbLS1rXSAlIHNxcnRCYXNlO1xyXG4gICAgICAgICAgeGhpID0geGNba10gLyBzcXJ0QmFzZSB8IDA7XHJcbiAgICAgICAgICBtID0geWhpICogeGxvICsgeGhpICogeWxvO1xyXG4gICAgICAgICAgeGxvID0geWxvICogeGxvICsgKChtICUgc3FydEJhc2UpICogc3FydEJhc2UpICsgemNbal0gKyBjO1xyXG4gICAgICAgICAgYyA9ICh4bG8gLyBiYXNlIHwgMCkgKyAobSAvIHNxcnRCYXNlIHwgMCkgKyB5aGkgKiB4aGk7XHJcbiAgICAgICAgICB6Y1tqLS1dID0geGxvICUgYmFzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHpjW2pdID0gYztcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGMpIHtcclxuICAgICAgICArK2U7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgemMuc3BsaWNlKDAsIDEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbm9ybWFsaXNlKHksIHpjLCBlKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBuZWdhdGVkLFxyXG4gICAgICogaS5lLiBtdWx0aXBsaWVkIGJ5IC0xLlxyXG4gICAgICovXHJcbiAgICBQLm5lZ2F0ZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciB4ID0gbmV3IEJpZ051bWJlcih0aGlzKTtcclxuICAgICAgeC5zID0gLXgucyB8fCBudWxsO1xyXG4gICAgICByZXR1cm4geDtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiAgbiArIDAgPSBuXHJcbiAgICAgKiAgbiArIE4gPSBOXHJcbiAgICAgKiAgbiArIEkgPSBJXHJcbiAgICAgKiAgMCArIG4gPSBuXHJcbiAgICAgKiAgMCArIDAgPSAwXHJcbiAgICAgKiAgMCArIE4gPSBOXHJcbiAgICAgKiAgMCArIEkgPSBJXHJcbiAgICAgKiAgTiArIG4gPSBOXHJcbiAgICAgKiAgTiArIDAgPSBOXHJcbiAgICAgKiAgTiArIE4gPSBOXHJcbiAgICAgKiAgTiArIEkgPSBOXHJcbiAgICAgKiAgSSArIG4gPSBJXHJcbiAgICAgKiAgSSArIDAgPSBJXHJcbiAgICAgKiAgSSArIE4gPSBOXHJcbiAgICAgKiAgSSArIEkgPSBJXHJcbiAgICAgKlxyXG4gICAgICogUmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgcGx1cyB0aGUgdmFsdWUgb2ZcclxuICAgICAqIEJpZ051bWJlcih5LCBiKS5cclxuICAgICAqL1xyXG4gICAgUC5wbHVzID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgICAgdmFyIHQsXHJcbiAgICAgICAgeCA9IHRoaXMsXHJcbiAgICAgICAgYSA9IHgucztcclxuXHJcbiAgICAgIHkgPSBuZXcgQmlnTnVtYmVyKHksIGIpO1xyXG4gICAgICBiID0geS5zO1xyXG5cclxuICAgICAgLy8gRWl0aGVyIE5hTj9cclxuICAgICAgaWYgKCFhIHx8ICFiKSByZXR1cm4gbmV3IEJpZ051bWJlcihOYU4pO1xyXG5cclxuICAgICAgLy8gU2lnbnMgZGlmZmVyP1xyXG4gICAgICAgaWYgKGEgIT0gYikge1xyXG4gICAgICAgIHkucyA9IC1iO1xyXG4gICAgICAgIHJldHVybiB4Lm1pbnVzKHkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgeGUgPSB4LmUgLyBMT0dfQkFTRSxcclxuICAgICAgICB5ZSA9IHkuZSAvIExPR19CQVNFLFxyXG4gICAgICAgIHhjID0geC5jLFxyXG4gICAgICAgIHljID0geS5jO1xyXG5cclxuICAgICAgaWYgKCF4ZSB8fCAheWUpIHtcclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIMKxSW5maW5pdHkgaWYgZWl0aGVyIMKxSW5maW5pdHkuXHJcbiAgICAgICAgaWYgKCF4YyB8fCAheWMpIHJldHVybiBuZXcgQmlnTnVtYmVyKGEgLyAwKTtcclxuXHJcbiAgICAgICAgLy8gRWl0aGVyIHplcm8/XHJcbiAgICAgICAgLy8gUmV0dXJuIHkgaWYgeSBpcyBub24temVybywgeCBpZiB4IGlzIG5vbi16ZXJvLCBvciB6ZXJvIGlmIGJvdGggYXJlIHplcm8uXHJcbiAgICAgICAgaWYgKCF4Y1swXSB8fCAheWNbMF0pIHJldHVybiB5Y1swXSA/IHkgOiBuZXcgQmlnTnVtYmVyKHhjWzBdID8geCA6IGEgKiAwKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgeGUgPSBiaXRGbG9vcih4ZSk7XHJcbiAgICAgIHllID0gYml0Rmxvb3IoeWUpO1xyXG4gICAgICB4YyA9IHhjLnNsaWNlKCk7XHJcblxyXG4gICAgICAvLyBQcmVwZW5kIHplcm9zIHRvIGVxdWFsaXNlIGV4cG9uZW50cy4gRmFzdGVyIHRvIHVzZSByZXZlcnNlIHRoZW4gZG8gdW5zaGlmdHMuXHJcbiAgICAgIGlmIChhID0geGUgLSB5ZSkge1xyXG4gICAgICAgIGlmIChhID4gMCkge1xyXG4gICAgICAgICAgeWUgPSB4ZTtcclxuICAgICAgICAgIHQgPSB5YztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYSA9IC1hO1xyXG4gICAgICAgICAgdCA9IHhjO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdC5yZXZlcnNlKCk7XHJcbiAgICAgICAgZm9yICg7IGEtLTsgdC5wdXNoKDApKTtcclxuICAgICAgICB0LnJldmVyc2UoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYSA9IHhjLmxlbmd0aDtcclxuICAgICAgYiA9IHljLmxlbmd0aDtcclxuXHJcbiAgICAgIC8vIFBvaW50IHhjIHRvIHRoZSBsb25nZXIgYXJyYXksIGFuZCBiIHRvIHRoZSBzaG9ydGVyIGxlbmd0aC5cclxuICAgICAgaWYgKGEgLSBiIDwgMCkgdCA9IHljLCB5YyA9IHhjLCB4YyA9IHQsIGIgPSBhO1xyXG5cclxuICAgICAgLy8gT25seSBzdGFydCBhZGRpbmcgYXQgeWMubGVuZ3RoIC0gMSBhcyB0aGUgZnVydGhlciBkaWdpdHMgb2YgeGMgY2FuIGJlIGlnbm9yZWQuXHJcbiAgICAgIGZvciAoYSA9IDA7IGI7KSB7XHJcbiAgICAgICAgYSA9ICh4Y1stLWJdID0geGNbYl0gKyB5Y1tiXSArIGEpIC8gQkFTRSB8IDA7XHJcbiAgICAgICAgeGNbYl0gPSBCQVNFID09PSB4Y1tiXSA/IDAgOiB4Y1tiXSAlIEJBU0U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChhKSB7XHJcbiAgICAgICAgeGMgPSBbYV0uY29uY2F0KHhjKTtcclxuICAgICAgICArK3llO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBObyBuZWVkIHRvIGNoZWNrIGZvciB6ZXJvLCBhcyAreCArICt5ICE9IDAgJiYgLXggKyAteSAhPSAwXHJcbiAgICAgIC8vIHllID0gTUFYX0VYUCArIDEgcG9zc2libGVcclxuICAgICAgcmV0dXJuIG5vcm1hbGlzZSh5LCB4YywgeWUpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIElmIHNkIGlzIHVuZGVmaW5lZCBvciBudWxsIG9yIHRydWUgb3IgZmFsc2UsIHJldHVybiB0aGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0cyBvZlxyXG4gICAgICogdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyLCBvciBudWxsIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyDCsUluZmluaXR5IG9yIE5hTi5cclxuICAgICAqIElmIHNkIGlzIHRydWUgaW5jbHVkZSBpbnRlZ2VyLXBhcnQgdHJhaWxpbmcgemVyb3MgaW4gdGhlIGNvdW50LlxyXG4gICAgICpcclxuICAgICAqIE90aGVyd2lzZSwgaWYgc2QgaXMgYSBudW1iZXIsIHJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXNcclxuICAgICAqIEJpZ051bWJlciByb3VuZGVkIHRvIGEgbWF4aW11bSBvZiBzZCBzaWduaWZpY2FudCBkaWdpdHMgdXNpbmcgcm91bmRpbmcgbW9kZSBybSwgb3JcclxuICAgICAqIFJPVU5ESU5HX01PREUgaWYgcm0gaXMgb21pdHRlZC5cclxuICAgICAqXHJcbiAgICAgKiBzZCB7bnVtYmVyfGJvb2xlYW59IG51bWJlcjogc2lnbmlmaWNhbnQgZGlnaXRzOiBpbnRlZ2VyLCAxIHRvIE1BWCBpbmNsdXNpdmUuXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgIGJvb2xlYW46IHdoZXRoZXIgdG8gY291bnQgaW50ZWdlci1wYXJ0IHRyYWlsaW5nIHplcm9zOiB0cnVlIG9yIGZhbHNlLlxyXG4gICAgICogW3JtXSB7bnVtYmVyfSBSb3VuZGluZyBtb2RlLiBJbnRlZ2VyLCAwIHRvIDggaW5jbHVzaXZlLlxyXG4gICAgICpcclxuICAgICAqICdbQmlnTnVtYmVyIEVycm9yXSBBcmd1bWVudCB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V9OiB7c2R8cm19J1xyXG4gICAgICovXHJcbiAgICBQLnByZWNpc2lvbiA9IFAuc2QgPSBmdW5jdGlvbiAoc2QsIHJtKSB7XHJcbiAgICAgIHZhciBjLCBuLCB2LFxyXG4gICAgICAgIHggPSB0aGlzO1xyXG5cclxuICAgICAgaWYgKHNkICE9IG51bGwgJiYgc2QgIT09ICEhc2QpIHtcclxuICAgICAgICBpbnRDaGVjayhzZCwgMSwgTUFYKTtcclxuICAgICAgICBpZiAocm0gPT0gbnVsbCkgcm0gPSBST1VORElOR19NT0RFO1xyXG4gICAgICAgIGVsc2UgaW50Q2hlY2socm0sIDAsIDgpO1xyXG5cclxuICAgICAgICByZXR1cm4gcm91bmQobmV3IEJpZ051bWJlcih4KSwgc2QsIHJtKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCEoYyA9IHguYykpIHJldHVybiBudWxsO1xyXG4gICAgICB2ID0gYy5sZW5ndGggLSAxO1xyXG4gICAgICBuID0gdiAqIExPR19CQVNFICsgMTtcclxuXHJcbiAgICAgIGlmICh2ID0gY1t2XSkge1xyXG5cclxuICAgICAgICAvLyBTdWJ0cmFjdCB0aGUgbnVtYmVyIG9mIHRyYWlsaW5nIHplcm9zIG9mIHRoZSBsYXN0IGVsZW1lbnQuXHJcbiAgICAgICAgZm9yICg7IHYgJSAxMCA9PSAwOyB2IC89IDEwLCBuLS0pO1xyXG5cclxuICAgICAgICAvLyBBZGQgdGhlIG51bWJlciBvZiBkaWdpdHMgb2YgdGhlIGZpcnN0IGVsZW1lbnQuXHJcbiAgICAgICAgZm9yICh2ID0gY1swXTsgdiA+PSAxMDsgdiAvPSAxMCwgbisrKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHNkICYmIHguZSArIDEgPiBuKSBuID0geC5lICsgMTtcclxuXHJcbiAgICAgIHJldHVybiBuO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIHNoaWZ0ZWQgYnkgayBwbGFjZXNcclxuICAgICAqIChwb3dlcnMgb2YgMTApLiBTaGlmdCB0byB0aGUgcmlnaHQgaWYgbiA+IDAsIGFuZCB0byB0aGUgbGVmdCBpZiBuIDwgMC5cclxuICAgICAqXHJcbiAgICAgKiBrIHtudW1iZXJ9IEludGVnZXIsIC1NQVhfU0FGRV9JTlRFR0VSIHRvIE1BWF9TQUZFX0lOVEVHRVIgaW5jbHVzaXZlLlxyXG4gICAgICpcclxuICAgICAqICdbQmlnTnVtYmVyIEVycm9yXSBBcmd1bWVudCB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V9OiB7a30nXHJcbiAgICAgKi9cclxuICAgIFAuc2hpZnRlZEJ5ID0gZnVuY3Rpb24gKGspIHtcclxuICAgICAgaW50Q2hlY2soaywgLU1BWF9TQUZFX0lOVEVHRVIsIE1BWF9TQUZFX0lOVEVHRVIpO1xyXG4gICAgICByZXR1cm4gdGhpcy50aW1lcygnMWUnICsgayk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogIHNxcnQoLW4pID0gIE5cclxuICAgICAqICBzcXJ0KE4pID0gIE5cclxuICAgICAqICBzcXJ0KC1JKSA9ICBOXHJcbiAgICAgKiAgc3FydChJKSA9ICBJXHJcbiAgICAgKiAgc3FydCgwKSA9ICAwXHJcbiAgICAgKiAgc3FydCgtMCkgPSAtMFxyXG4gICAgICpcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHNxdWFyZSByb290IG9mIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlcixcclxuICAgICAqIHJvdW5kZWQgYWNjb3JkaW5nIHRvIERFQ0lNQUxfUExBQ0VTIGFuZCBST1VORElOR19NT0RFLlxyXG4gICAgICovXHJcbiAgICBQLnNxdWFyZVJvb3QgPSBQLnNxcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBtLCBuLCByLCByZXAsIHQsXHJcbiAgICAgICAgeCA9IHRoaXMsXHJcbiAgICAgICAgYyA9IHguYyxcclxuICAgICAgICBzID0geC5zLFxyXG4gICAgICAgIGUgPSB4LmUsXHJcbiAgICAgICAgZHAgPSBERUNJTUFMX1BMQUNFUyArIDQsXHJcbiAgICAgICAgaGFsZiA9IG5ldyBCaWdOdW1iZXIoJzAuNScpO1xyXG5cclxuICAgICAgLy8gTmVnYXRpdmUvTmFOL0luZmluaXR5L3plcm8/XHJcbiAgICAgIGlmIChzICE9PSAxIHx8ICFjIHx8ICFjWzBdKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBCaWdOdW1iZXIoIXMgfHwgcyA8IDAgJiYgKCFjIHx8IGNbMF0pID8gTmFOIDogYyA/IHggOiAxIC8gMCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEluaXRpYWwgZXN0aW1hdGUuXHJcbiAgICAgIHMgPSBNYXRoLnNxcnQoK3gpO1xyXG5cclxuICAgICAgLy8gTWF0aC5zcXJ0IHVuZGVyZmxvdy9vdmVyZmxvdz9cclxuICAgICAgLy8gUGFzcyB4IHRvIE1hdGguc3FydCBhcyBpbnRlZ2VyLCB0aGVuIGFkanVzdCB0aGUgZXhwb25lbnQgb2YgdGhlIHJlc3VsdC5cclxuICAgICAgaWYgKHMgPT0gMCB8fCBzID09IDEgLyAwKSB7XHJcbiAgICAgICAgbiA9IGNvZWZmVG9TdHJpbmcoYyk7XHJcbiAgICAgICAgaWYgKChuLmxlbmd0aCArIGUpICUgMiA9PSAwKSBuICs9ICcwJztcclxuICAgICAgICBzID0gTWF0aC5zcXJ0KG4pO1xyXG4gICAgICAgIGUgPSBiaXRGbG9vcigoZSArIDEpIC8gMikgLSAoZSA8IDAgfHwgZSAlIDIpO1xyXG5cclxuICAgICAgICBpZiAocyA9PSAxIC8gMCkge1xyXG4gICAgICAgICAgbiA9ICcxZScgKyBlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuID0gcy50b0V4cG9uZW50aWFsKCk7XHJcbiAgICAgICAgICBuID0gbi5zbGljZSgwLCBuLmluZGV4T2YoJ2UnKSArIDEpICsgZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHIgPSBuZXcgQmlnTnVtYmVyKG4pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHIgPSBuZXcgQmlnTnVtYmVyKHMgKyAnJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIENoZWNrIGZvciB6ZXJvLlxyXG4gICAgICAvLyByIGNvdWxkIGJlIHplcm8gaWYgTUlOX0VYUCBpcyBjaGFuZ2VkIGFmdGVyIHRoZSB0aGlzIHZhbHVlIHdhcyBjcmVhdGVkLlxyXG4gICAgICAvLyBUaGlzIHdvdWxkIGNhdXNlIGEgZGl2aXNpb24gYnkgemVybyAoeC90KSBhbmQgaGVuY2UgSW5maW5pdHkgYmVsb3csIHdoaWNoIHdvdWxkIGNhdXNlXHJcbiAgICAgIC8vIGNvZWZmVG9TdHJpbmcgdG8gdGhyb3cuXHJcbiAgICAgIGlmIChyLmNbMF0pIHtcclxuICAgICAgICBlID0gci5lO1xyXG4gICAgICAgIHMgPSBlICsgZHA7XHJcbiAgICAgICAgaWYgKHMgPCAzKSBzID0gMDtcclxuXHJcbiAgICAgICAgLy8gTmV3dG9uLVJhcGhzb24gaXRlcmF0aW9uLlxyXG4gICAgICAgIGZvciAoOyA7KSB7XHJcbiAgICAgICAgICB0ID0gcjtcclxuICAgICAgICAgIHIgPSBoYWxmLnRpbWVzKHQucGx1cyhkaXYoeCwgdCwgZHAsIDEpKSk7XHJcblxyXG4gICAgICAgICAgaWYgKGNvZWZmVG9TdHJpbmcodC5jICApLnNsaWNlKDAsIHMpID09PSAobiA9XHJcbiAgICAgICAgICAgICBjb2VmZlRvU3RyaW5nKHIuYykpLnNsaWNlKDAsIHMpKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBUaGUgZXhwb25lbnQgb2YgciBtYXkgaGVyZSBiZSBvbmUgbGVzcyB0aGFuIHRoZSBmaW5hbCByZXN1bHQgZXhwb25lbnQsXHJcbiAgICAgICAgICAgIC8vIGUuZyAwLjAwMDk5OTkgKGUtNCkgLS0+IDAuMDAxIChlLTMpLCBzbyBhZGp1c3QgcyBzbyB0aGUgcm91bmRpbmcgZGlnaXRzXHJcbiAgICAgICAgICAgIC8vIGFyZSBpbmRleGVkIGNvcnJlY3RseS5cclxuICAgICAgICAgICAgaWYgKHIuZSA8IGUpIC0tcztcclxuICAgICAgICAgICAgbiA9IG4uc2xpY2UocyAtIDMsIHMgKyAxKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRoZSA0dGggcm91bmRpbmcgZGlnaXQgbWF5IGJlIGluIGVycm9yIGJ5IC0xIHNvIGlmIHRoZSA0IHJvdW5kaW5nIGRpZ2l0c1xyXG4gICAgICAgICAgICAvLyBhcmUgOTk5OSBvciA0OTk5IChpLmUuIGFwcHJvYWNoaW5nIGEgcm91bmRpbmcgYm91bmRhcnkpIGNvbnRpbnVlIHRoZVxyXG4gICAgICAgICAgICAvLyBpdGVyYXRpb24uXHJcbiAgICAgICAgICAgIGlmIChuID09ICc5OTk5JyB8fCAhcmVwICYmIG4gPT0gJzQ5OTknKSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIE9uIHRoZSBmaXJzdCBpdGVyYXRpb24gb25seSwgY2hlY2sgdG8gc2VlIGlmIHJvdW5kaW5nIHVwIGdpdmVzIHRoZVxyXG4gICAgICAgICAgICAgIC8vIGV4YWN0IHJlc3VsdCBhcyB0aGUgbmluZXMgbWF5IGluZmluaXRlbHkgcmVwZWF0LlxyXG4gICAgICAgICAgICAgIGlmICghcmVwKSB7XHJcbiAgICAgICAgICAgICAgICByb3VuZCh0LCB0LmUgKyBERUNJTUFMX1BMQUNFUyArIDIsIDApO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0LnRpbWVzKHQpLmVxKHgpKSB7XHJcbiAgICAgICAgICAgICAgICAgIHIgPSB0O1xyXG4gICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGRwICs9IDQ7XHJcbiAgICAgICAgICAgICAgcyArPSA0O1xyXG4gICAgICAgICAgICAgIHJlcCA9IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIElmIHJvdW5kaW5nIGRpZ2l0cyBhcmUgbnVsbCwgMHswLDR9IG9yIDUwezAsM30sIGNoZWNrIGZvciBleGFjdFxyXG4gICAgICAgICAgICAgIC8vIHJlc3VsdC4gSWYgbm90LCB0aGVuIHRoZXJlIGFyZSBmdXJ0aGVyIGRpZ2l0cyBhbmQgbSB3aWxsIGJlIHRydXRoeS5cclxuICAgICAgICAgICAgICBpZiAoIStuIHx8ICErbi5zbGljZSgxKSAmJiBuLmNoYXJBdCgwKSA9PSAnNScpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUcnVuY2F0ZSB0byB0aGUgZmlyc3Qgcm91bmRpbmcgZGlnaXQuXHJcbiAgICAgICAgICAgICAgICByb3VuZChyLCByLmUgKyBERUNJTUFMX1BMQUNFUyArIDIsIDEpO1xyXG4gICAgICAgICAgICAgICAgbSA9ICFyLnRpbWVzKHIpLmVxKHgpO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiByb3VuZChyLCByLmUgKyBERUNJTUFMX1BMQUNFUyArIDEsIFJPVU5ESU5HX01PREUsIG0pO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGluIGV4cG9uZW50aWFsIG5vdGF0aW9uIGFuZFxyXG4gICAgICogcm91bmRlZCB1c2luZyBST1VORElOR19NT0RFIHRvIGRwIGZpeGVkIGRlY2ltYWwgcGxhY2VzLlxyXG4gICAgICpcclxuICAgICAqIFtkcF0ge251bWJlcn0gRGVjaW1hbCBwbGFjZXMuIEludGVnZXIsIDAgdG8gTUFYIGluY2x1c2l2ZS5cclxuICAgICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgICAqXHJcbiAgICAgKiAnW0JpZ051bWJlciBFcnJvcl0gQXJndW1lbnQge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge2RwfHJtfSdcclxuICAgICAqL1xyXG4gICAgUC50b0V4cG9uZW50aWFsID0gZnVuY3Rpb24gKGRwLCBybSkge1xyXG4gICAgICBpZiAoZHAgIT0gbnVsbCkge1xyXG4gICAgICAgIGludENoZWNrKGRwLCAwLCBNQVgpO1xyXG4gICAgICAgIGRwKys7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZvcm1hdCh0aGlzLCBkcCwgcm0sIDEpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGluIGZpeGVkLXBvaW50IG5vdGF0aW9uIHJvdW5kaW5nXHJcbiAgICAgKiB0byBkcCBmaXhlZCBkZWNpbWFsIHBsYWNlcyB1c2luZyByb3VuZGluZyBtb2RlIHJtLCBvciBST1VORElOR19NT0RFIGlmIHJtIGlzIG9taXR0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogTm90ZTogYXMgd2l0aCBKYXZhU2NyaXB0J3MgbnVtYmVyIHR5cGUsICgtMCkudG9GaXhlZCgwKSBpcyAnMCcsXHJcbiAgICAgKiBidXQgZS5nLiAoLTAuMDAwMDEpLnRvRml4ZWQoMCkgaXMgJy0wJy5cclxuICAgICAqXHJcbiAgICAgKiBbZHBdIHtudW1iZXJ9IERlY2ltYWwgcGxhY2VzLiBJbnRlZ2VyLCAwIHRvIE1BWCBpbmNsdXNpdmUuXHJcbiAgICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICAgKlxyXG4gICAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEFyZ3VtZW50IHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtkcHxybX0nXHJcbiAgICAgKi9cclxuICAgIFAudG9GaXhlZCA9IGZ1bmN0aW9uIChkcCwgcm0pIHtcclxuICAgICAgaWYgKGRwICE9IG51bGwpIHtcclxuICAgICAgICBpbnRDaGVjayhkcCwgMCwgTUFYKTtcclxuICAgICAgICBkcCA9IGRwICsgdGhpcy5lICsgMTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZm9ybWF0KHRoaXMsIGRwLCBybSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaW4gZml4ZWQtcG9pbnQgbm90YXRpb24gcm91bmRlZFxyXG4gICAgICogdXNpbmcgcm0gb3IgUk9VTkRJTkdfTU9ERSB0byBkcCBkZWNpbWFsIHBsYWNlcywgYW5kIGZvcm1hdHRlZCBhY2NvcmRpbmcgdG8gdGhlIHByb3BlcnRpZXNcclxuICAgICAqIG9mIHRoZSBGT1JNQVQgb2JqZWN0IChzZWUgQmlnTnVtYmVyLnNldCkuXHJcbiAgICAgKlxyXG4gICAgICogRk9STUFUID0ge1xyXG4gICAgICogICAgICBkZWNpbWFsU2VwYXJhdG9yIDogJy4nLFxyXG4gICAgICogICAgICBncm91cFNlcGFyYXRvciA6ICcsJyxcclxuICAgICAqICAgICAgZ3JvdXBTaXplIDogMyxcclxuICAgICAqICAgICAgc2Vjb25kYXJ5R3JvdXBTaXplIDogMCxcclxuICAgICAqICAgICAgZnJhY3Rpb25Hcm91cFNlcGFyYXRvciA6ICdcXHhBMCcsICAgIC8vIG5vbi1icmVha2luZyBzcGFjZVxyXG4gICAgICogICAgICBmcmFjdGlvbkdyb3VwU2l6ZSA6IDBcclxuICAgICAqIH07XHJcbiAgICAgKlxyXG4gICAgICogW2RwXSB7bnVtYmVyfSBEZWNpbWFsIHBsYWNlcy4gSW50ZWdlciwgMCB0byBNQVggaW5jbHVzaXZlLlxyXG4gICAgICogW3JtXSB7bnVtYmVyfSBSb3VuZGluZyBtb2RlLiBJbnRlZ2VyLCAwIHRvIDggaW5jbHVzaXZlLlxyXG4gICAgICpcclxuICAgICAqICdbQmlnTnVtYmVyIEVycm9yXSBBcmd1bWVudCB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V9OiB7ZHB8cm19J1xyXG4gICAgICovXHJcbiAgICBQLnRvRm9ybWF0ID0gZnVuY3Rpb24gKGRwLCBybSkge1xyXG4gICAgICB2YXIgc3RyID0gdGhpcy50b0ZpeGVkKGRwLCBybSk7XHJcblxyXG4gICAgICBpZiAodGhpcy5jKSB7XHJcbiAgICAgICAgdmFyIGksXHJcbiAgICAgICAgICBhcnIgPSBzdHIuc3BsaXQoJy4nKSxcclxuICAgICAgICAgIGcxID0gK0ZPUk1BVC5ncm91cFNpemUsXHJcbiAgICAgICAgICBnMiA9ICtGT1JNQVQuc2Vjb25kYXJ5R3JvdXBTaXplLFxyXG4gICAgICAgICAgZ3JvdXBTZXBhcmF0b3IgPSBGT1JNQVQuZ3JvdXBTZXBhcmF0b3IsXHJcbiAgICAgICAgICBpbnRQYXJ0ID0gYXJyWzBdLFxyXG4gICAgICAgICAgZnJhY3Rpb25QYXJ0ID0gYXJyWzFdLFxyXG4gICAgICAgICAgaXNOZWcgPSB0aGlzLnMgPCAwLFxyXG4gICAgICAgICAgaW50RGlnaXRzID0gaXNOZWcgPyBpbnRQYXJ0LnNsaWNlKDEpIDogaW50UGFydCxcclxuICAgICAgICAgIGxlbiA9IGludERpZ2l0cy5sZW5ndGg7XHJcblxyXG4gICAgICAgIGlmIChnMikgaSA9IGcxLCBnMSA9IGcyLCBnMiA9IGksIGxlbiAtPSBpO1xyXG5cclxuICAgICAgICBpZiAoZzEgPiAwICYmIGxlbiA+IDApIHtcclxuICAgICAgICAgIGkgPSBsZW4gJSBnMSB8fCBnMTtcclxuICAgICAgICAgIGludFBhcnQgPSBpbnREaWdpdHMuc3Vic3RyKDAsIGkpO1xyXG5cclxuICAgICAgICAgIGZvciAoOyBpIDwgbGVuOyBpICs9IGcxKSB7XHJcbiAgICAgICAgICAgIGludFBhcnQgKz0gZ3JvdXBTZXBhcmF0b3IgKyBpbnREaWdpdHMuc3Vic3RyKGksIGcxKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZzIgPiAwKSBpbnRQYXJ0ICs9IGdyb3VwU2VwYXJhdG9yICsgaW50RGlnaXRzLnNsaWNlKGkpO1xyXG4gICAgICAgICAgaWYgKGlzTmVnKSBpbnRQYXJ0ID0gJy0nICsgaW50UGFydDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0ciA9IGZyYWN0aW9uUGFydFxyXG4gICAgICAgICA/IGludFBhcnQgKyBGT1JNQVQuZGVjaW1hbFNlcGFyYXRvciArICgoZzIgPSArRk9STUFULmZyYWN0aW9uR3JvdXBTaXplKVxyXG4gICAgICAgICAgPyBmcmFjdGlvblBhcnQucmVwbGFjZShuZXcgUmVnRXhwKCdcXFxcZHsnICsgZzIgKyAnfVxcXFxCJywgJ2cnKSxcclxuICAgICAgICAgICAnJCYnICsgRk9STUFULmZyYWN0aW9uR3JvdXBTZXBhcmF0b3IpXHJcbiAgICAgICAgICA6IGZyYWN0aW9uUGFydClcclxuICAgICAgICAgOiBpbnRQYXJ0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gc3RyO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIHN0cmluZyBhcnJheSByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGFzIGEgc2ltcGxlIGZyYWN0aW9uIHdpdGhcclxuICAgICAqIGFuIGludGVnZXIgbnVtZXJhdG9yIGFuZCBhbiBpbnRlZ2VyIGRlbm9taW5hdG9yLiBUaGUgZGVub21pbmF0b3Igd2lsbCBiZSBhIHBvc2l0aXZlXHJcbiAgICAgKiBub24temVybyB2YWx1ZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHNwZWNpZmllZCBtYXhpbXVtIGRlbm9taW5hdG9yLiBJZiBhIG1heGltdW1cclxuICAgICAqIGRlbm9taW5hdG9yIGlzIG5vdCBzcGVjaWZpZWQsIHRoZSBkZW5vbWluYXRvciB3aWxsIGJlIHRoZSBsb3dlc3QgdmFsdWUgbmVjZXNzYXJ5IHRvXHJcbiAgICAgKiByZXByZXNlbnQgdGhlIG51bWJlciBleGFjdGx5LlxyXG4gICAgICpcclxuICAgICAqIFttZF0ge251bWJlcnxzdHJpbmd8QmlnTnVtYmVyfSBJbnRlZ2VyID49IDEsIG9yIEluZmluaXR5LiBUaGUgbWF4aW11bSBkZW5vbWluYXRvci5cclxuICAgICAqXHJcbiAgICAgKiAnW0JpZ051bWJlciBFcnJvcl0gQXJndW1lbnQge25vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX0gOiB7bWR9J1xyXG4gICAgICovXHJcbiAgICBQLnRvRnJhY3Rpb24gPSBmdW5jdGlvbiAobWQpIHtcclxuICAgICAgdmFyIGFyciwgZCwgZDAsIGQxLCBkMiwgZSwgZXhwLCBuLCBuMCwgbjEsIHEsIHMsXHJcbiAgICAgICAgeCA9IHRoaXMsXHJcbiAgICAgICAgeGMgPSB4LmM7XHJcblxyXG4gICAgICBpZiAobWQgIT0gbnVsbCkge1xyXG4gICAgICAgIG4gPSBuZXcgQmlnTnVtYmVyKG1kKTtcclxuXHJcbiAgICAgICAgLy8gVGhyb3cgaWYgbWQgaXMgbGVzcyB0aGFuIG9uZSBvciBpcyBub3QgYW4gaW50ZWdlciwgdW5sZXNzIGl0IGlzIEluZmluaXR5LlxyXG4gICAgICAgIGlmICghbi5pc0ludGVnZXIoKSAmJiAobi5jIHx8IG4ucyAhPT0gMSkgfHwgbi5sdChPTkUpKSB7XHJcbiAgICAgICAgICB0aHJvdyBFcnJvclxyXG4gICAgICAgICAgICAoYmlnbnVtYmVyRXJyb3IgKyAnQXJndW1lbnQgJyArXHJcbiAgICAgICAgICAgICAgKG4uaXNJbnRlZ2VyKCkgPyAnb3V0IG9mIHJhbmdlOiAnIDogJ25vdCBhbiBpbnRlZ2VyOiAnKSArIG1kKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICgheGMpIHJldHVybiB4LnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICBkID0gbmV3IEJpZ051bWJlcihPTkUpO1xyXG4gICAgICBuMSA9IGQwID0gbmV3IEJpZ051bWJlcihPTkUpO1xyXG4gICAgICBkMSA9IG4wID0gbmV3IEJpZ051bWJlcihPTkUpO1xyXG4gICAgICBzID0gY29lZmZUb1N0cmluZyh4Yyk7XHJcblxyXG4gICAgICAvLyBEZXRlcm1pbmUgaW5pdGlhbCBkZW5vbWluYXRvci5cclxuICAgICAgLy8gZCBpcyBhIHBvd2VyIG9mIDEwIGFuZCB0aGUgbWluaW11bSBtYXggZGVub21pbmF0b3IgdGhhdCBzcGVjaWZpZXMgdGhlIHZhbHVlIGV4YWN0bHkuXHJcbiAgICAgIGUgPSBkLmUgPSBzLmxlbmd0aCAtIHguZSAtIDE7XHJcbiAgICAgIGQuY1swXSA9IFBPV1NfVEVOWyhleHAgPSBlICUgTE9HX0JBU0UpIDwgMCA/IExPR19CQVNFICsgZXhwIDogZXhwXTtcclxuICAgICAgbWQgPSAhbWQgfHwgbi5jb21wYXJlZFRvKGQpID4gMCA/IChlID4gMCA/IGQgOiBuMSkgOiBuO1xyXG5cclxuICAgICAgZXhwID0gTUFYX0VYUDtcclxuICAgICAgTUFYX0VYUCA9IDEgLyAwO1xyXG4gICAgICBuID0gbmV3IEJpZ051bWJlcihzKTtcclxuXHJcbiAgICAgIC8vIG4wID0gZDEgPSAwXHJcbiAgICAgIG4wLmNbMF0gPSAwO1xyXG5cclxuICAgICAgZm9yICg7IDspICB7XHJcbiAgICAgICAgcSA9IGRpdihuLCBkLCAwLCAxKTtcclxuICAgICAgICBkMiA9IGQwLnBsdXMocS50aW1lcyhkMSkpO1xyXG4gICAgICAgIGlmIChkMi5jb21wYXJlZFRvKG1kKSA9PSAxKSBicmVhaztcclxuICAgICAgICBkMCA9IGQxO1xyXG4gICAgICAgIGQxID0gZDI7XHJcbiAgICAgICAgbjEgPSBuMC5wbHVzKHEudGltZXMoZDIgPSBuMSkpO1xyXG4gICAgICAgIG4wID0gZDI7XHJcbiAgICAgICAgZCA9IG4ubWludXMocS50aW1lcyhkMiA9IGQpKTtcclxuICAgICAgICBuID0gZDI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGQyID0gZGl2KG1kLm1pbnVzKGQwKSwgZDEsIDAsIDEpO1xyXG4gICAgICBuMCA9IG4wLnBsdXMoZDIudGltZXMobjEpKTtcclxuICAgICAgZDAgPSBkMC5wbHVzKGQyLnRpbWVzKGQxKSk7XHJcbiAgICAgIG4wLnMgPSBuMS5zID0geC5zO1xyXG4gICAgICBlICo9IDI7XHJcblxyXG4gICAgICAvLyBEZXRlcm1pbmUgd2hpY2ggZnJhY3Rpb24gaXMgY2xvc2VyIHRvIHgsIG4wL2QwIG9yIG4xL2QxXHJcbiAgICAgIGFyciA9IGRpdihuMSwgZDEsIGUsIFJPVU5ESU5HX01PREUpLm1pbnVzKHgpLmFicygpLmNvbXBhcmVkVG8oXHJcbiAgICAgICAgIGRpdihuMCwgZDAsIGUsIFJPVU5ESU5HX01PREUpLm1pbnVzKHgpLmFicygpKSA8IDFcclxuICAgICAgICAgID8gW24xLnRvU3RyaW5nKCksIGQxLnRvU3RyaW5nKCldXHJcbiAgICAgICAgICA6IFtuMC50b1N0cmluZygpLCBkMC50b1N0cmluZygpXTtcclxuXHJcbiAgICAgIE1BWF9FWFAgPSBleHA7XHJcbiAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBjb252ZXJ0ZWQgdG8gYSBudW1iZXIgcHJpbWl0aXZlLlxyXG4gICAgICovXHJcbiAgICBQLnRvTnVtYmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gK3RoaXM7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgcm91bmRlZCB0byBzZCBzaWduaWZpY2FudCBkaWdpdHNcclxuICAgICAqIHVzaW5nIHJvdW5kaW5nIG1vZGUgcm0gb3IgUk9VTkRJTkdfTU9ERS4gSWYgc2QgaXMgbGVzcyB0aGFuIHRoZSBudW1iZXIgb2YgZGlnaXRzXHJcbiAgICAgKiBuZWNlc3NhcnkgdG8gcmVwcmVzZW50IHRoZSBpbnRlZ2VyIHBhcnQgb2YgdGhlIHZhbHVlIGluIGZpeGVkLXBvaW50IG5vdGF0aW9uLCB0aGVuIHVzZVxyXG4gICAgICogZXhwb25lbnRpYWwgbm90YXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogW3NkXSB7bnVtYmVyfSBTaWduaWZpY2FudCBkaWdpdHMuIEludGVnZXIsIDEgdG8gTUFYIGluY2x1c2l2ZS5cclxuICAgICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgICAqXHJcbiAgICAgKiAnW0JpZ051bWJlciBFcnJvcl0gQXJndW1lbnQge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge3NkfHJtfSdcclxuICAgICAqL1xyXG4gICAgUC50b1ByZWNpc2lvbiA9IGZ1bmN0aW9uIChzZCwgcm0pIHtcclxuICAgICAgaWYgKHNkICE9IG51bGwpIGludENoZWNrKHNkLCAxLCBNQVgpO1xyXG4gICAgICByZXR1cm4gZm9ybWF0KHRoaXMsIHNkLCBybSwgMik7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaW4gYmFzZSBiLCBvciBiYXNlIDEwIGlmIGIgaXNcclxuICAgICAqIG9taXR0ZWQuIElmIGEgYmFzZSBpcyBzcGVjaWZpZWQsIGluY2x1ZGluZyBiYXNlIDEwLCByb3VuZCBhY2NvcmRpbmcgdG8gREVDSU1BTF9QTEFDRVMgYW5kXHJcbiAgICAgKiBST1VORElOR19NT0RFLiBJZiBhIGJhc2UgaXMgbm90IHNwZWNpZmllZCwgYW5kIHRoaXMgQmlnTnVtYmVyIGhhcyBhIHBvc2l0aXZlIGV4cG9uZW50XHJcbiAgICAgKiB0aGF0IGlzIGVxdWFsIHRvIG9yIGdyZWF0ZXIgdGhhbiBUT19FWFBfUE9TLCBvciBhIG5lZ2F0aXZlIGV4cG9uZW50IGVxdWFsIHRvIG9yIGxlc3MgdGhhblxyXG4gICAgICogVE9fRVhQX05FRywgcmV0dXJuIGV4cG9uZW50aWFsIG5vdGF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIFtiXSB7bnVtYmVyfSBJbnRlZ2VyLCAyIHRvIEFMUEhBQkVULmxlbmd0aCBpbmNsdXNpdmUuXHJcbiAgICAgKlxyXG4gICAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEJhc2Uge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge2J9J1xyXG4gICAgICovXHJcbiAgICBQLnRvU3RyaW5nID0gZnVuY3Rpb24gKGIpIHtcclxuICAgICAgdmFyIHN0cixcclxuICAgICAgICBuID0gdGhpcyxcclxuICAgICAgICBzID0gbi5zLFxyXG4gICAgICAgIGUgPSBuLmU7XHJcblxyXG4gICAgICAvLyBJbmZpbml0eSBvciBOYU4/XHJcbiAgICAgIGlmIChlID09PSBudWxsKSB7XHJcblxyXG4gICAgICAgIGlmIChzKSB7XHJcbiAgICAgICAgICBzdHIgPSAnSW5maW5pdHknO1xyXG4gICAgICAgICAgaWYgKHMgPCAwKSBzdHIgPSAnLScgKyBzdHI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN0ciA9ICdOYU4nO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzdHIgPSBjb2VmZlRvU3RyaW5nKG4uYyk7XHJcblxyXG4gICAgICAgIGlmIChiID09IG51bGwpIHtcclxuICAgICAgICAgIHN0ciA9IGUgPD0gVE9fRVhQX05FRyB8fCBlID49IFRPX0VYUF9QT1NcclxuICAgICAgICAgICA/IHRvRXhwb25lbnRpYWwoc3RyLCBlKVxyXG4gICAgICAgICAgIDogdG9GaXhlZFBvaW50KHN0ciwgZSwgJzAnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaW50Q2hlY2soYiwgMiwgQUxQSEFCRVQubGVuZ3RoLCAnQmFzZScpO1xyXG4gICAgICAgICAgc3RyID0gY29udmVydEJhc2UodG9GaXhlZFBvaW50KHN0ciwgZSwgJzAnKSwgMTAsIGIsIHMsIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHMgPCAwICYmIG4uY1swXSkgc3RyID0gJy0nICsgc3RyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gc3RyO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhcyB0b1N0cmluZywgYnV0IGRvIG5vdCBhY2NlcHQgYSBiYXNlIGFyZ3VtZW50LCBhbmQgaW5jbHVkZSB0aGUgbWludXMgc2lnbiBmb3JcclxuICAgICAqIG5lZ2F0aXZlIHplcm8uXHJcbiAgICAgKi9cclxuICAgIFAudmFsdWVPZiA9IFAudG9KU09OID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgc3RyLFxyXG4gICAgICAgIG4gPSB0aGlzLFxyXG4gICAgICAgIGUgPSBuLmU7XHJcblxyXG4gICAgICBpZiAoZSA9PT0gbnVsbCkgcmV0dXJuIG4udG9TdHJpbmcoKTtcclxuXHJcbiAgICAgIHN0ciA9IGNvZWZmVG9TdHJpbmcobi5jKTtcclxuXHJcbiAgICAgIHN0ciA9IGUgPD0gVE9fRVhQX05FRyB8fCBlID49IFRPX0VYUF9QT1NcclxuICAgICAgICA/IHRvRXhwb25lbnRpYWwoc3RyLCBlKVxyXG4gICAgICAgIDogdG9GaXhlZFBvaW50KHN0ciwgZSwgJzAnKTtcclxuXHJcbiAgICAgIHJldHVybiBuLnMgPCAwID8gJy0nICsgc3RyIDogc3RyO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgUC5faXNCaWdOdW1iZXIgPSB0cnVlO1xyXG5cclxuICAgIGlmIChjb25maWdPYmplY3QgIT0gbnVsbCkgQmlnTnVtYmVyLnNldChjb25maWdPYmplY3QpO1xyXG5cclxuICAgIHJldHVybiBCaWdOdW1iZXI7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gUFJJVkFURSBIRUxQRVIgRlVOQ1RJT05TXHJcblxyXG5cclxuICBmdW5jdGlvbiBiaXRGbG9vcihuKSB7XHJcbiAgICB2YXIgaSA9IG4gfCAwO1xyXG4gICAgcmV0dXJuIG4gPiAwIHx8IG4gPT09IGkgPyBpIDogaSAtIDE7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gUmV0dXJuIGEgY29lZmZpY2llbnQgYXJyYXkgYXMgYSBzdHJpbmcgb2YgYmFzZSAxMCBkaWdpdHMuXHJcbiAgZnVuY3Rpb24gY29lZmZUb1N0cmluZyhhKSB7XHJcbiAgICB2YXIgcywgeixcclxuICAgICAgaSA9IDEsXHJcbiAgICAgIGogPSBhLmxlbmd0aCxcclxuICAgICAgciA9IGFbMF0gKyAnJztcclxuXHJcbiAgICBmb3IgKDsgaSA8IGo7KSB7XHJcbiAgICAgIHMgPSBhW2krK10gKyAnJztcclxuICAgICAgeiA9IExPR19CQVNFIC0gcy5sZW5ndGg7XHJcbiAgICAgIGZvciAoOyB6LS07IHMgPSAnMCcgKyBzKTtcclxuICAgICAgciArPSBzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERldGVybWluZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgIGZvciAoaiA9IHIubGVuZ3RoOyByLmNoYXJDb2RlQXQoLS1qKSA9PT0gNDg7KTtcclxuICAgIHJldHVybiByLnNsaWNlKDAsIGogKyAxIHx8IDEpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIENvbXBhcmUgdGhlIHZhbHVlIG9mIEJpZ051bWJlcnMgeCBhbmQgeS5cclxuICBmdW5jdGlvbiBjb21wYXJlKHgsIHkpIHtcclxuICAgIHZhciBhLCBiLFxyXG4gICAgICB4YyA9IHguYyxcclxuICAgICAgeWMgPSB5LmMsXHJcbiAgICAgIGkgPSB4LnMsXHJcbiAgICAgIGogPSB5LnMsXHJcbiAgICAgIGsgPSB4LmUsXHJcbiAgICAgIGwgPSB5LmU7XHJcblxyXG4gICAgLy8gRWl0aGVyIE5hTj9cclxuICAgIGlmICghaSB8fCAhaikgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgYSA9IHhjICYmICF4Y1swXTtcclxuICAgIGIgPSB5YyAmJiAheWNbMF07XHJcblxyXG4gICAgLy8gRWl0aGVyIHplcm8/XHJcbiAgICBpZiAoYSB8fCBiKSByZXR1cm4gYSA/IGIgPyAwIDogLWogOiBpO1xyXG5cclxuICAgIC8vIFNpZ25zIGRpZmZlcj9cclxuICAgIGlmIChpICE9IGopIHJldHVybiBpO1xyXG5cclxuICAgIGEgPSBpIDwgMDtcclxuICAgIGIgPSBrID09IGw7XHJcblxyXG4gICAgLy8gRWl0aGVyIEluZmluaXR5P1xyXG4gICAgaWYgKCF4YyB8fCAheWMpIHJldHVybiBiID8gMCA6ICF4YyBeIGEgPyAxIDogLTE7XHJcblxyXG4gICAgLy8gQ29tcGFyZSBleHBvbmVudHMuXHJcbiAgICBpZiAoIWIpIHJldHVybiBrID4gbCBeIGEgPyAxIDogLTE7XHJcblxyXG4gICAgaiA9IChrID0geGMubGVuZ3RoKSA8IChsID0geWMubGVuZ3RoKSA/IGsgOiBsO1xyXG5cclxuICAgIC8vIENvbXBhcmUgZGlnaXQgYnkgZGlnaXQuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgajsgaSsrKSBpZiAoeGNbaV0gIT0geWNbaV0pIHJldHVybiB4Y1tpXSA+IHljW2ldIF4gYSA/IDEgOiAtMTtcclxuXHJcbiAgICAvLyBDb21wYXJlIGxlbmd0aHMuXHJcbiAgICByZXR1cm4gayA9PSBsID8gMCA6IGsgPiBsIF4gYSA/IDEgOiAtMTtcclxuICB9XHJcblxyXG5cclxuICAvKlxyXG4gICAqIENoZWNrIHRoYXQgbiBpcyBhIHByaW1pdGl2ZSBudW1iZXIsIGFuIGludGVnZXIsIGFuZCBpbiByYW5nZSwgb3RoZXJ3aXNlIHRocm93LlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGludENoZWNrKG4sIG1pbiwgbWF4LCBuYW1lKSB7XHJcbiAgICBpZiAobiA8IG1pbiB8fCBuID4gbWF4IHx8IG4gIT09IChuIDwgMCA/IG1hdGhjZWlsKG4pIDogbWF0aGZsb29yKG4pKSkge1xyXG4gICAgICB0aHJvdyBFcnJvclxyXG4gICAgICAgKGJpZ251bWJlckVycm9yICsgKG5hbWUgfHwgJ0FyZ3VtZW50JykgKyAodHlwZW9mIG4gPT0gJ251bWJlcidcclxuICAgICAgICAgPyBuIDwgbWluIHx8IG4gPiBtYXggPyAnIG91dCBvZiByYW5nZTogJyA6ICcgbm90IGFuIGludGVnZXI6ICdcclxuICAgICAgICAgOiAnIG5vdCBhIHByaW1pdGl2ZSBudW1iZXI6ICcpICsgbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgZnVuY3Rpb24gaXNBcnJheShvYmopIHtcclxuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PSAnW29iamVjdCBBcnJheV0nO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIEFzc3VtZXMgZmluaXRlIG4uXHJcbiAgZnVuY3Rpb24gaXNPZGQobikge1xyXG4gICAgdmFyIGsgPSBuLmMubGVuZ3RoIC0gMTtcclxuICAgIHJldHVybiBiaXRGbG9vcihuLmUgLyBMT0dfQkFTRSkgPT0gayAmJiBuLmNba10gJSAyICE9IDA7XHJcbiAgfVxyXG5cclxuXHJcbiAgZnVuY3Rpb24gdG9FeHBvbmVudGlhbChzdHIsIGUpIHtcclxuICAgIHJldHVybiAoc3RyLmxlbmd0aCA+IDEgPyBzdHIuY2hhckF0KDApICsgJy4nICsgc3RyLnNsaWNlKDEpIDogc3RyKSArXHJcbiAgICAgKGUgPCAwID8gJ2UnIDogJ2UrJykgKyBlO1xyXG4gIH1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIHRvRml4ZWRQb2ludChzdHIsIGUsIHopIHtcclxuICAgIHZhciBsZW4sIHpzO1xyXG5cclxuICAgIC8vIE5lZ2F0aXZlIGV4cG9uZW50P1xyXG4gICAgaWYgKGUgPCAwKSB7XHJcblxyXG4gICAgICAvLyBQcmVwZW5kIHplcm9zLlxyXG4gICAgICBmb3IgKHpzID0geiArICcuJzsgKytlOyB6cyArPSB6KTtcclxuICAgICAgc3RyID0genMgKyBzdHI7XHJcblxyXG4gICAgLy8gUG9zaXRpdmUgZXhwb25lbnRcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxlbiA9IHN0ci5sZW5ndGg7XHJcblxyXG4gICAgICAvLyBBcHBlbmQgemVyb3MuXHJcbiAgICAgIGlmICgrK2UgPiBsZW4pIHtcclxuICAgICAgICBmb3IgKHpzID0geiwgZSAtPSBsZW47IC0tZTsgenMgKz0geik7XHJcbiAgICAgICAgc3RyICs9IHpzO1xyXG4gICAgICB9IGVsc2UgaWYgKGUgPCBsZW4pIHtcclxuICAgICAgICBzdHIgPSBzdHIuc2xpY2UoMCwgZSkgKyAnLicgKyBzdHIuc2xpY2UoZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RyO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIEVYUE9SVFxyXG5cclxuXHJcbiAgQmlnTnVtYmVyID0gY2xvbmUoKTtcclxuICBCaWdOdW1iZXJbJ2RlZmF1bHQnXSA9IEJpZ051bWJlci5CaWdOdW1iZXIgPSBCaWdOdW1iZXI7XHJcblxyXG4gIC8vIEFNRC5cclxuICBpZiAodHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcclxuICAgIGRlZmluZShmdW5jdGlvbiAoKSB7IHJldHVybiBCaWdOdW1iZXI7IH0pO1xyXG5cclxuICAvLyBOb2RlLmpzIGFuZCBvdGhlciBlbnZpcm9ubWVudHMgdGhhdCBzdXBwb3J0IG1vZHVsZS5leHBvcnRzLlxyXG4gIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBCaWdOdW1iZXI7XHJcblxyXG4gIC8vIEJyb3dzZXIuXHJcbiAgfSBlbHNlIHtcclxuICAgIGlmICghZ2xvYmFsT2JqZWN0KSB7XHJcbiAgICAgIGdsb2JhbE9iamVjdCA9IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYgPyBzZWxmIDogd2luZG93O1xyXG4gICAgfVxyXG5cclxuICAgIGdsb2JhbE9iamVjdC5CaWdOdW1iZXIgPSBCaWdOdW1iZXI7XHJcbiAgfVxyXG59KSh0aGlzKTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==