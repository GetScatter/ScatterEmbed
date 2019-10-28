(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[48],{

/***/ "+7+6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var sjcl={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(a){this.toString=function(){return"CORRUPT: "+this.message};this.message=a},invalid:function(a){this.toString=function(){return"INVALID: "+this.message};this.message=a},bug:function(a){this.toString=function(){return"BUG: "+this.message};this.message=a},notReady:function(a){this.toString=function(){return"NOT READY: "+this.message};this.message=a}}};
sjcl.cipher.aes=function(a){this.s[0][0][0]||this.O();var b,c,d,e,f=this.s[0][4],g=this.s[1];b=a.length;var h=1;if(4!==b&&6!==b&&8!==b)throw new sjcl.exception.invalid("invalid aes key size");this.b=[d=a.slice(0),e=[]];for(a=b;a<4*b+28;a++){c=d[a-1];if(0===a%b||8===b&&4===a%b)c=f[c>>>24]<<24^f[c>>16&255]<<16^f[c>>8&255]<<8^f[c&255],0===a%b&&(c=c<<8^c>>>24^h<<24,h=h<<1^283*(h>>7));d[a]=d[a-b]^c}for(b=0;a;b++,a--)c=d[b&3?a:a-4],e[b]=4>=a||4>b?c:g[0][f[c>>>24]]^g[1][f[c>>16&255]]^g[2][f[c>>8&255]]^g[3][f[c&
255]]};
sjcl.cipher.aes.prototype={encrypt:function(a){return t(this,a,0)},decrypt:function(a){return t(this,a,1)},s:[[[],[],[],[],[]],[[],[],[],[],[]]],O:function(){var a=this.s[0],b=this.s[1],c=a[4],d=b[4],e,f,g,h=[],k=[],l,n,m,p;for(e=0;0x100>e;e++)k[(h[e]=e<<1^283*(e>>7))^e]=e;for(f=g=0;!c[f];f^=l||1,g=k[g]||1)for(m=g^g<<1^g<<2^g<<3^g<<4,m=m>>8^m&255^99,c[f]=m,d[m]=f,n=h[e=h[l=h[f]]],p=0x1010101*n^0x10001*e^0x101*l^0x1010100*f,n=0x101*h[m]^0x1010100*m,e=0;4>e;e++)a[e][f]=n=n<<24^n>>>8,b[e][m]=p=p<<24^p>>>8;for(e=
0;5>e;e++)a[e]=a[e].slice(0),b[e]=b[e].slice(0)}};
function t(a,b,c){if(4!==b.length)throw new sjcl.exception.invalid("invalid aes block size");var d=a.b[c],e=b[0]^d[0],f=b[c?3:1]^d[1],g=b[2]^d[2];b=b[c?1:3]^d[3];var h,k,l,n=d.length/4-2,m,p=4,r=[0,0,0,0];h=a.s[c];a=h[0];var q=h[1],v=h[2],w=h[3],x=h[4];for(m=0;m<n;m++)h=a[e>>>24]^q[f>>16&255]^v[g>>8&255]^w[b&255]^d[p],k=a[f>>>24]^q[g>>16&255]^v[b>>8&255]^w[e&255]^d[p+1],l=a[g>>>24]^q[b>>16&255]^v[e>>8&255]^w[f&255]^d[p+2],b=a[b>>>24]^q[e>>16&255]^v[f>>8&255]^w[g&255]^d[p+3],p+=4,e=h,f=k,g=l;for(m=
0;4>m;m++)r[c?3&-m:m]=x[e>>>24]<<24^x[f>>16&255]<<16^x[g>>8&255]<<8^x[b&255]^d[p++],h=e,e=f,f=g,g=b,b=h;return r}
sjcl.bitArray={bitSlice:function(a,b,c){a=sjcl.bitArray.$(a.slice(b/32),32-(b&31)).slice(1);return void 0===c?a:sjcl.bitArray.clamp(a,c-b)},extract:function(a,b,c){var d=Math.floor(-b-c&31);return((b+c-1^b)&-32?a[b/32|0]<<32-d^a[b/32+1|0]>>>d:a[b/32|0]>>>d)&(1<<c)-1},concat:function(a,b){if(0===a.length||0===b.length)return a.concat(b);var c=a[a.length-1],d=sjcl.bitArray.getPartial(c);return 32===d?a.concat(b):sjcl.bitArray.$(b,d,c|0,a.slice(0,a.length-1))},bitLength:function(a){var b=a.length;return 0===
b?0:32*(b-1)+sjcl.bitArray.getPartial(a[b-1])},clamp:function(a,b){if(32*a.length<b)return a;a=a.slice(0,Math.ceil(b/32));var c=a.length;b=b&31;0<c&&b&&(a[c-1]=sjcl.bitArray.partial(b,a[c-1]&2147483648>>b-1,1));return a},partial:function(a,b,c){return 32===a?b:(c?b|0:b<<32-a)+0x10000000000*a},getPartial:function(a){return Math.round(a/0x10000000000)||32},equal:function(a,b){if(sjcl.bitArray.bitLength(a)!==sjcl.bitArray.bitLength(b))return!1;var c=0,d;for(d=0;d<a.length;d++)c|=a[d]^b[d];return 0===
c},$:function(a,b,c,d){var e;e=0;for(void 0===d&&(d=[]);32<=b;b-=32)d.push(c),c=0;if(0===b)return d.concat(a);for(e=0;e<a.length;e++)d.push(c|a[e]>>>b),c=a[e]<<32-b;e=a.length?a[a.length-1]:0;a=sjcl.bitArray.getPartial(e);d.push(sjcl.bitArray.partial(b+a&31,32<b+a?c:d.pop(),1));return d},i:function(a,b){return[a[0]^b[0],a[1]^b[1],a[2]^b[2],a[3]^b[3]]},byteswapM:function(a){var b,c;for(b=0;b<a.length;++b)c=a[b],a[b]=c>>>24|c>>>8&0xff00|(c&0xff00)<<8|c<<24;return a}};
sjcl.codec.utf8String={fromBits:function(a){var b="",c=sjcl.bitArray.bitLength(a),d,e;for(d=0;d<c/8;d++)0===(d&3)&&(e=a[d/4]),b+=String.fromCharCode(e>>>8>>>8>>>8),e<<=8;return decodeURIComponent(escape(b))},toBits:function(a){a=unescape(encodeURIComponent(a));var b=[],c,d=0;for(c=0;c<a.length;c++)d=d<<8|a.charCodeAt(c),3===(c&3)&&(b.push(d),d=0);c&3&&b.push(sjcl.bitArray.partial(8*(c&3),d));return b}};
sjcl.codec.hex={fromBits:function(a){var b="",c;for(c=0;c<a.length;c++)b+=((a[c]|0)+0xf00000000000).toString(16).substr(4);return b.substr(0,sjcl.bitArray.bitLength(a)/4)},toBits:function(a){var b,c=[],d;a=a.replace(/\s|0x/g,"");d=a.length;a=a+"00000000";for(b=0;b<a.length;b+=8)c.push(parseInt(a.substr(b,8),16)^0);return sjcl.bitArray.clamp(c,4*d)}};
sjcl.codec.base32={B:"ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",X:"0123456789ABCDEFGHIJKLMNOPQRSTUV",BITS:32,BASE:5,REMAINING:27,fromBits:function(a,b,c){var d=sjcl.codec.base32.BASE,e=sjcl.codec.base32.REMAINING,f="",g=0,h=sjcl.codec.base32.B,k=0,l=sjcl.bitArray.bitLength(a);c&&(h=sjcl.codec.base32.X);for(c=0;f.length*d<l;)f+=h.charAt((k^a[c]>>>g)>>>e),g<d?(k=a[c]<<d-g,g+=e,c++):(k<<=d,g-=d);for(;f.length&7&&!b;)f+="=";return f},toBits:function(a,b){a=a.replace(/\s|=/g,"").toUpperCase();var c=sjcl.codec.base32.BITS,
d=sjcl.codec.base32.BASE,e=sjcl.codec.base32.REMAINING,f=[],g,h=0,k=sjcl.codec.base32.B,l=0,n,m="base32";b&&(k=sjcl.codec.base32.X,m="base32hex");for(g=0;g<a.length;g++){n=k.indexOf(a.charAt(g));if(0>n){if(!b)try{return sjcl.codec.base32hex.toBits(a)}catch(p){}throw new sjcl.exception.invalid("this isn't "+m+"!");}h>e?(h-=e,f.push(l^n>>>h),l=n<<c-h):(h+=d,l^=n<<c-h)}h&56&&f.push(sjcl.bitArray.partial(h&56,l,1));return f}};
sjcl.codec.base32hex={fromBits:function(a,b){return sjcl.codec.base32.fromBits(a,b,1)},toBits:function(a){return sjcl.codec.base32.toBits(a,1)}};
sjcl.codec.base64={B:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",fromBits:function(a,b,c){var d="",e=0,f=sjcl.codec.base64.B,g=0,h=sjcl.bitArray.bitLength(a);c&&(f=f.substr(0,62)+"-_");for(c=0;6*d.length<h;)d+=f.charAt((g^a[c]>>>e)>>>26),6>e?(g=a[c]<<6-e,e+=26,c++):(g<<=6,e-=6);for(;d.length&3&&!b;)d+="=";return d},toBits:function(a,b){a=a.replace(/\s|=/g,"");var c=[],d,e=0,f=sjcl.codec.base64.B,g=0,h;b&&(f=f.substr(0,62)+"-_");for(d=0;d<a.length;d++){h=f.indexOf(a.charAt(d));
if(0>h)throw new sjcl.exception.invalid("this isn't base64!");26<e?(e-=26,c.push(g^h>>>e),g=h<<32-e):(e+=6,g^=h<<32-e)}e&56&&c.push(sjcl.bitArray.partial(e&56,g,1));return c}};sjcl.codec.base64url={fromBits:function(a){return sjcl.codec.base64.fromBits(a,1,1)},toBits:function(a){return sjcl.codec.base64.toBits(a,1)}};sjcl.hash.sha256=function(a){this.b[0]||this.O();a?(this.F=a.F.slice(0),this.A=a.A.slice(0),this.l=a.l):this.reset()};sjcl.hash.sha256.hash=function(a){return(new sjcl.hash.sha256).update(a).finalize()};
sjcl.hash.sha256.prototype={blockSize:512,reset:function(){this.F=this.Y.slice(0);this.A=[];this.l=0;return this},update:function(a){"string"===typeof a&&(a=sjcl.codec.utf8String.toBits(a));var b,c=this.A=sjcl.bitArray.concat(this.A,a);b=this.l;a=this.l=b+sjcl.bitArray.bitLength(a);if(0x1fffffffffffff<a)throw new sjcl.exception.invalid("Cannot hash more than 2^53 - 1 bits");if("undefined"!==typeof Uint32Array){var d=new Uint32Array(c),e=0;for(b=512+b-(512+b&0x1ff);b<=a;b+=512)u(this,d.subarray(16*e,
16*(e+1))),e+=1;c.splice(0,16*e)}else for(b=512+b-(512+b&0x1ff);b<=a;b+=512)u(this,c.splice(0,16));return this},finalize:function(){var a,b=this.A,c=this.F,b=sjcl.bitArray.concat(b,[sjcl.bitArray.partial(1,1)]);for(a=b.length+2;a&15;a++)b.push(0);b.push(Math.floor(this.l/0x100000000));for(b.push(this.l|0);b.length;)u(this,b.splice(0,16));this.reset();return c},Y:[],b:[],O:function(){function a(a){return 0x100000000*(a-Math.floor(a))|0}for(var b=0,c=2,d,e;64>b;c++){e=!0;for(d=2;d*d<=c;d++)if(0===c%d){e=
!1;break}e&&(8>b&&(this.Y[b]=a(Math.pow(c,.5))),this.b[b]=a(Math.pow(c,1/3)),b++)}}};
function u(a,b){var c,d,e,f=a.F,g=a.b,h=f[0],k=f[1],l=f[2],n=f[3],m=f[4],p=f[5],r=f[6],q=f[7];for(c=0;64>c;c++)16>c?d=b[c]:(d=b[c+1&15],e=b[c+14&15],d=b[c&15]=(d>>>7^d>>>18^d>>>3^d<<25^d<<14)+(e>>>17^e>>>19^e>>>10^e<<15^e<<13)+b[c&15]+b[c+9&15]|0),d=d+q+(m>>>6^m>>>11^m>>>25^m<<26^m<<21^m<<7)+(r^m&(p^r))+g[c],q=r,r=p,p=m,m=n+d|0,n=l,l=k,k=h,h=d+(k&l^n&(k^l))+(k>>>2^k>>>13^k>>>22^k<<30^k<<19^k<<10)|0;f[0]=f[0]+h|0;f[1]=f[1]+k|0;f[2]=f[2]+l|0;f[3]=f[3]+n|0;f[4]=f[4]+m|0;f[5]=f[5]+p|0;f[6]=f[6]+r|0;f[7]=
f[7]+q|0}
sjcl.mode.ccm={name:"ccm",G:[],listenProgress:function(a){sjcl.mode.ccm.G.push(a)},unListenProgress:function(a){a=sjcl.mode.ccm.G.indexOf(a);-1<a&&sjcl.mode.ccm.G.splice(a,1)},fa:function(a){var b=sjcl.mode.ccm.G.slice(),c;for(c=0;c<b.length;c+=1)b[c](a)},encrypt:function(a,b,c,d,e){var f,g=b.slice(0),h=sjcl.bitArray,k=h.bitLength(c)/8,l=h.bitLength(g)/8;e=e||64;d=d||[];if(7>k)throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");for(f=2;4>f&&l>>>8*f;f++);f<15-k&&(f=15-k);c=h.clamp(c,
8*(15-f));b=sjcl.mode.ccm.V(a,b,c,d,e,f);g=sjcl.mode.ccm.C(a,g,c,b,e,f);return h.concat(g.data,g.tag)},decrypt:function(a,b,c,d,e){e=e||64;d=d||[];var f=sjcl.bitArray,g=f.bitLength(c)/8,h=f.bitLength(b),k=f.clamp(b,h-e),l=f.bitSlice(b,h-e),h=(h-e)/8;if(7>g)throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");for(b=2;4>b&&h>>>8*b;b++);b<15-g&&(b=15-g);c=f.clamp(c,8*(15-b));k=sjcl.mode.ccm.C(a,k,c,l,e,b);a=sjcl.mode.ccm.V(a,k.data,c,d,e,b);if(!f.equal(k.tag,a))throw new sjcl.exception.corrupt("ccm: tag doesn't match");
return k.data},na:function(a,b,c,d,e,f){var g=[],h=sjcl.bitArray,k=h.i;d=[h.partial(8,(b.length?64:0)|d-2<<2|f-1)];d=h.concat(d,c);d[3]|=e;d=a.encrypt(d);if(b.length)for(c=h.bitLength(b)/8,65279>=c?g=[h.partial(16,c)]:0xffffffff>=c&&(g=h.concat([h.partial(16,65534)],[c])),g=h.concat(g,b),b=0;b<g.length;b+=4)d=a.encrypt(k(d,g.slice(b,b+4).concat([0,0,0])));return d},V:function(a,b,c,d,e,f){var g=sjcl.bitArray,h=g.i;e/=8;if(e%2||4>e||16<e)throw new sjcl.exception.invalid("ccm: invalid tag length");
if(0xffffffff<d.length||0xffffffff<b.length)throw new sjcl.exception.bug("ccm: can't deal with 4GiB or more data");c=sjcl.mode.ccm.na(a,d,c,e,g.bitLength(b)/8,f);for(d=0;d<b.length;d+=4)c=a.encrypt(h(c,b.slice(d,d+4).concat([0,0,0])));return g.clamp(c,8*e)},C:function(a,b,c,d,e,f){var g,h=sjcl.bitArray;g=h.i;var k=b.length,l=h.bitLength(b),n=k/50,m=n;c=h.concat([h.partial(8,f-1)],c).concat([0,0,0]).slice(0,4);d=h.bitSlice(g(d,a.encrypt(c)),0,e);if(!k)return{tag:d,data:[]};for(g=0;g<k;g+=4)g>n&&(sjcl.mode.ccm.fa(g/
k),n+=m),c[3]++,e=a.encrypt(c),b[g]^=e[0],b[g+1]^=e[1],b[g+2]^=e[2],b[g+3]^=e[3];return{tag:d,data:h.clamp(b,l)}}};
sjcl.mode.ocb2={name:"ocb2",encrypt:function(a,b,c,d,e,f){if(128!==sjcl.bitArray.bitLength(c))throw new sjcl.exception.invalid("ocb iv must be 128 bits");var g,h=sjcl.mode.ocb2.S,k=sjcl.bitArray,l=k.i,n=[0,0,0,0];c=h(a.encrypt(c));var m,p=[];d=d||[];e=e||64;for(g=0;g+4<b.length;g+=4)m=b.slice(g,g+4),n=l(n,m),p=p.concat(l(c,a.encrypt(l(c,m)))),c=h(c);m=b.slice(g);b=k.bitLength(m);g=a.encrypt(l(c,[0,0,0,b]));m=k.clamp(l(m.concat([0,0,0]),g),b);n=l(n,l(m.concat([0,0,0]),g));n=a.encrypt(l(n,l(c,h(c))));
d.length&&(n=l(n,f?d:sjcl.mode.ocb2.pmac(a,d)));return p.concat(k.concat(m,k.clamp(n,e)))},decrypt:function(a,b,c,d,e,f){if(128!==sjcl.bitArray.bitLength(c))throw new sjcl.exception.invalid("ocb iv must be 128 bits");e=e||64;var g=sjcl.mode.ocb2.S,h=sjcl.bitArray,k=h.i,l=[0,0,0,0],n=g(a.encrypt(c)),m,p,r=sjcl.bitArray.bitLength(b)-e,q=[];d=d||[];for(c=0;c+4<r/32;c+=4)m=k(n,a.decrypt(k(n,b.slice(c,c+4)))),l=k(l,m),q=q.concat(m),n=g(n);p=r-32*c;m=a.encrypt(k(n,[0,0,0,p]));m=k(m,h.clamp(b.slice(c),p).concat([0,
0,0]));l=k(l,m);l=a.encrypt(k(l,k(n,g(n))));d.length&&(l=k(l,f?d:sjcl.mode.ocb2.pmac(a,d)));if(!h.equal(h.clamp(l,e),h.bitSlice(b,r)))throw new sjcl.exception.corrupt("ocb: tag doesn't match");return q.concat(h.clamp(m,p))},pmac:function(a,b){var c,d=sjcl.mode.ocb2.S,e=sjcl.bitArray,f=e.i,g=[0,0,0,0],h=a.encrypt([0,0,0,0]),h=f(h,d(d(h)));for(c=0;c+4<b.length;c+=4)h=d(h),g=f(g,a.encrypt(f(h,b.slice(c,c+4))));c=b.slice(c);128>e.bitLength(c)&&(h=f(h,d(h)),c=e.concat(c,[-2147483648,0,0,0]));g=f(g,c);
return a.encrypt(f(d(f(h,d(h))),g))},S:function(a){return[a[0]<<1^a[1]>>>31,a[1]<<1^a[2]>>>31,a[2]<<1^a[3]>>>31,a[3]<<1^135*(a[0]>>>31)]}};
sjcl.mode.gcm={name:"gcm",encrypt:function(a,b,c,d,e){var f=b.slice(0);b=sjcl.bitArray;d=d||[];a=sjcl.mode.gcm.C(!0,a,f,d,c,e||128);return b.concat(a.data,a.tag)},decrypt:function(a,b,c,d,e){var f=b.slice(0),g=sjcl.bitArray,h=g.bitLength(f);e=e||128;d=d||[];e<=h?(b=g.bitSlice(f,h-e),f=g.bitSlice(f,0,h-e)):(b=f,f=[]);a=sjcl.mode.gcm.C(!1,a,f,d,c,e);if(!g.equal(a.tag,b))throw new sjcl.exception.corrupt("gcm: tag doesn't match");return a.data},ka:function(a,b){var c,d,e,f,g,h=sjcl.bitArray.i;e=[0,0,
0,0];f=b.slice(0);for(c=0;128>c;c++){(d=0!==(a[Math.floor(c/32)]&1<<31-c%32))&&(e=h(e,f));g=0!==(f[3]&1);for(d=3;0<d;d--)f[d]=f[d]>>>1|(f[d-1]&1)<<31;f[0]>>>=1;g&&(f[0]^=-0x1f000000)}return e},j:function(a,b,c){var d,e=c.length;b=b.slice(0);for(d=0;d<e;d+=4)b[0]^=0xffffffff&c[d],b[1]^=0xffffffff&c[d+1],b[2]^=0xffffffff&c[d+2],b[3]^=0xffffffff&c[d+3],b=sjcl.mode.gcm.ka(b,a);return b},C:function(a,b,c,d,e,f){var g,h,k,l,n,m,p,r,q=sjcl.bitArray;m=c.length;p=q.bitLength(c);r=q.bitLength(d);h=q.bitLength(e);
g=b.encrypt([0,0,0,0]);96===h?(e=e.slice(0),e=q.concat(e,[1])):(e=sjcl.mode.gcm.j(g,[0,0,0,0],e),e=sjcl.mode.gcm.j(g,e,[0,0,Math.floor(h/0x100000000),h&0xffffffff]));h=sjcl.mode.gcm.j(g,[0,0,0,0],d);n=e.slice(0);d=h.slice(0);a||(d=sjcl.mode.gcm.j(g,h,c));for(l=0;l<m;l+=4)n[3]++,k=b.encrypt(n),c[l]^=k[0],c[l+1]^=k[1],c[l+2]^=k[2],c[l+3]^=k[3];c=q.clamp(c,p);a&&(d=sjcl.mode.gcm.j(g,h,c));a=[Math.floor(r/0x100000000),r&0xffffffff,Math.floor(p/0x100000000),p&0xffffffff];d=sjcl.mode.gcm.j(g,d,a);k=b.encrypt(e);
d[0]^=k[0];d[1]^=k[1];d[2]^=k[2];d[3]^=k[3];return{tag:q.bitSlice(d,0,f),data:c}}};sjcl.misc.hmac=function(a,b){this.W=b=b||sjcl.hash.sha256;var c=[[],[]],d,e=b.prototype.blockSize/32;this.w=[new b,new b];a.length>e&&(a=b.hash(a));for(d=0;d<e;d++)c[0][d]=a[d]^909522486,c[1][d]=a[d]^1549556828;this.w[0].update(c[0]);this.w[1].update(c[1]);this.R=new b(this.w[0])};
sjcl.misc.hmac.prototype.encrypt=sjcl.misc.hmac.prototype.mac=function(a){if(this.aa)throw new sjcl.exception.invalid("encrypt on already updated hmac called!");this.update(a);return this.digest(a)};sjcl.misc.hmac.prototype.reset=function(){this.R=new this.W(this.w[0]);this.aa=!1};sjcl.misc.hmac.prototype.update=function(a){this.aa=!0;this.R.update(a)};sjcl.misc.hmac.prototype.digest=function(){var a=this.R.finalize(),a=(new this.W(this.w[1])).update(a).finalize();this.reset();return a};
sjcl.misc.pbkdf2=function(a,b,c,d,e){c=c||1E4;if(0>d||0>c)throw new sjcl.exception.invalid("invalid params to pbkdf2");"string"===typeof a&&(a=sjcl.codec.utf8String.toBits(a));"string"===typeof b&&(b=sjcl.codec.utf8String.toBits(b));e=e||sjcl.misc.hmac;a=new e(a);var f,g,h,k,l=[],n=sjcl.bitArray;for(k=1;32*l.length<(d||1);k++){e=f=a.encrypt(n.concat(b,[k]));for(g=1;g<c;g++)for(f=a.encrypt(f),h=0;h<f.length;h++)e[h]^=f[h];l=l.concat(e)}d&&(l=n.clamp(l,d));return l};
sjcl.prng=function(a){this.c=[new sjcl.hash.sha256];this.m=[0];this.P=0;this.H={};this.N=0;this.U={};this.Z=this.f=this.o=this.ha=0;this.b=[0,0,0,0,0,0,0,0];this.h=[0,0,0,0];this.L=void 0;this.M=a;this.D=!1;this.K={progress:{},seeded:{}};this.u=this.ga=0;this.I=1;this.J=2;this.ca=0x10000;this.T=[0,48,64,96,128,192,0x100,384,512,768,1024];this.da=3E4;this.ba=80};
sjcl.prng.prototype={randomWords:function(a,b){var c=[],d;d=this.isReady(b);var e;if(d===this.u)throw new sjcl.exception.notReady("generator isn't seeded");if(d&this.J){d=!(d&this.I);e=[];var f=0,g;this.Z=e[0]=(new Date).valueOf()+this.da;for(g=0;16>g;g++)e.push(0x100000000*Math.random()|0);for(g=0;g<this.c.length&&(e=e.concat(this.c[g].finalize()),f+=this.m[g],this.m[g]=0,d||!(this.P&1<<g));g++);this.P>=1<<this.c.length&&(this.c.push(new sjcl.hash.sha256),this.m.push(0));this.f-=f;f>this.o&&(this.o=
f);this.P++;this.b=sjcl.hash.sha256.hash(this.b.concat(e));this.L=new sjcl.cipher.aes(this.b);for(d=0;4>d&&(this.h[d]=this.h[d]+1|0,!this.h[d]);d++);}for(d=0;d<a;d+=4)0===(d+1)%this.ca&&y(this),e=z(this),c.push(e[0],e[1],e[2],e[3]);y(this);return c.slice(0,a)},setDefaultParanoia:function(a,b){if(0===a&&"Setting paranoia=0 will ruin your security; use it only for testing"!==b)throw new sjcl.exception.invalid("Setting paranoia=0 will ruin your security; use it only for testing");this.M=a},addEntropy:function(a,
b,c){c=c||"user";var d,e,f=(new Date).valueOf(),g=this.H[c],h=this.isReady(),k=0;d=this.U[c];void 0===d&&(d=this.U[c]=this.ha++);void 0===g&&(g=this.H[c]=0);this.H[c]=(this.H[c]+1)%this.c.length;switch(typeof a){case "number":void 0===b&&(b=1);this.c[g].update([d,this.N++,1,b,f,1,a|0]);break;case "object":c=Object.prototype.toString.call(a);if("[object Uint32Array]"===c){e=[];for(c=0;c<a.length;c++)e.push(a[c]);a=e}else for("[object Array]"!==c&&(k=1),c=0;c<a.length&&!k;c++)"number"!==typeof a[c]&&
(k=1);if(!k){if(void 0===b)for(c=b=0;c<a.length;c++)for(e=a[c];0<e;)b++,e=e>>>1;this.c[g].update([d,this.N++,2,b,f,a.length].concat(a))}break;case "string":void 0===b&&(b=a.length);this.c[g].update([d,this.N++,3,b,f,a.length]);this.c[g].update(a);break;default:k=1}if(k)throw new sjcl.exception.bug("random: addEntropy only supports number, array of numbers or string");this.m[g]+=b;this.f+=b;h===this.u&&(this.isReady()!==this.u&&A("seeded",Math.max(this.o,this.f)),A("progress",this.getProgress()))},
isReady:function(a){a=this.T[void 0!==a?a:this.M];return this.o&&this.o>=a?this.m[0]>this.ba&&(new Date).valueOf()>this.Z?this.J|this.I:this.I:this.f>=a?this.J|this.u:this.u},getProgress:function(a){a=this.T[a?a:this.M];return this.o>=a?1:this.f>a?1:this.f/a},startCollectors:function(){if(!this.D){this.a={loadTimeCollector:B(this,this.ma),mouseCollector:B(this,this.oa),keyboardCollector:B(this,this.la),accelerometerCollector:B(this,this.ea),touchCollector:B(this,this.qa)};if(window.addEventListener)window.addEventListener("load",
this.a.loadTimeCollector,!1),window.addEventListener("mousemove",this.a.mouseCollector,!1),window.addEventListener("keypress",this.a.keyboardCollector,!1),window.addEventListener("devicemotion",this.a.accelerometerCollector,!1),window.addEventListener("touchmove",this.a.touchCollector,!1);else if(document.attachEvent)document.attachEvent("onload",this.a.loadTimeCollector),document.attachEvent("onmousemove",this.a.mouseCollector),document.attachEvent("keypress",this.a.keyboardCollector);else throw new sjcl.exception.bug("can't attach event");
this.D=!0}},stopCollectors:function(){this.D&&(window.removeEventListener?(window.removeEventListener("load",this.a.loadTimeCollector,!1),window.removeEventListener("mousemove",this.a.mouseCollector,!1),window.removeEventListener("keypress",this.a.keyboardCollector,!1),window.removeEventListener("devicemotion",this.a.accelerometerCollector,!1),window.removeEventListener("touchmove",this.a.touchCollector,!1)):document.detachEvent&&(document.detachEvent("onload",this.a.loadTimeCollector),document.detachEvent("onmousemove",
this.a.mouseCollector),document.detachEvent("keypress",this.a.keyboardCollector)),this.D=!1)},addEventListener:function(a,b){this.K[a][this.ga++]=b},removeEventListener:function(a,b){var c,d,e=this.K[a],f=[];for(d in e)e.hasOwnProperty(d)&&e[d]===b&&f.push(d);for(c=0;c<f.length;c++)d=f[c],delete e[d]},la:function(){C(this,1)},oa:function(a){var b,c;try{b=a.x||a.clientX||a.offsetX||0,c=a.y||a.clientY||a.offsetY||0}catch(d){c=b=0}0!=b&&0!=c&&this.addEntropy([b,c],2,"mouse");C(this,0)},qa:function(a){a=
a.touches[0]||a.changedTouches[0];this.addEntropy([a.pageX||a.clientX,a.pageY||a.clientY],1,"touch");C(this,0)},ma:function(){C(this,2)},ea:function(a){a=a.accelerationIncludingGravity.x||a.accelerationIncludingGravity.y||a.accelerationIncludingGravity.z;if(window.orientation){var b=window.orientation;"number"===typeof b&&this.addEntropy(b,1,"accelerometer")}a&&this.addEntropy(a,2,"accelerometer");C(this,0)}};
function A(a,b){var c,d=sjcl.random.K[a],e=[];for(c in d)d.hasOwnProperty(c)&&e.push(d[c]);for(c=0;c<e.length;c++)e[c](b)}function C(a,b){"undefined"!==typeof window&&window.performance&&"function"===typeof window.performance.now?a.addEntropy(window.performance.now(),b,"loadtime"):a.addEntropy((new Date).valueOf(),b,"loadtime")}function y(a){a.b=z(a).concat(z(a));a.L=new sjcl.cipher.aes(a.b)}function z(a){for(var b=0;4>b&&(a.h[b]=a.h[b]+1|0,!a.h[b]);b++);return a.L.encrypt(a.h)}
function B(a,b){return function(){b.apply(a,arguments)}}sjcl.random=new sjcl.prng(6);
a:try{var D,E,F,G;if(G= true&&module.exports){var H;try{H=__webpack_require__("HEbw")}catch(a){H=null}G=E=H}if(G&&E.randomBytes)D=E.randomBytes(128),D=new Uint32Array((new Uint8Array(D)).buffer),sjcl.random.addEntropy(D,1024,"crypto['randomBytes']");else if("undefined"!==typeof window&&"undefined"!==typeof Uint32Array){F=new Uint32Array(32);if(window.crypto&&window.crypto.getRandomValues)window.crypto.getRandomValues(F);else if(window.msCrypto&&window.msCrypto.getRandomValues)window.msCrypto.getRandomValues(F);
else break a;sjcl.random.addEntropy(F,1024,"crypto['getRandomValues']")}}catch(a){"undefined"!==typeof window&&window.console&&(console.log("There was an error collecting entropy from the browser:"),console.log(a))}
sjcl.json={defaults:{v:1,iter:1E4,ks:128,ts:64,mode:"ccm",adata:"",cipher:"aes"},ja:function(a,b,c,d){c=c||{};d=d||{};var e=sjcl.json,f=e.g({iv:sjcl.random.randomWords(4,0)},e.defaults),g;e.g(f,c);c=f.adata;"string"===typeof f.salt&&(f.salt=sjcl.codec.base64.toBits(f.salt));"string"===typeof f.iv&&(f.iv=sjcl.codec.base64.toBits(f.iv));if(!sjcl.mode[f.mode]||!sjcl.cipher[f.cipher]||"string"===typeof a&&100>=f.iter||64!==f.ts&&96!==f.ts&&128!==f.ts||128!==f.ks&&192!==f.ks&&0x100!==f.ks||2>f.iv.length||
4<f.iv.length)throw new sjcl.exception.invalid("json encrypt: invalid parameters");"string"===typeof a?(g=sjcl.misc.cachedPbkdf2(a,f),a=g.key.slice(0,f.ks/32),f.salt=g.salt):sjcl.ecc&&a instanceof sjcl.ecc.elGamal.publicKey&&(g=a.kem(),f.kemtag=g.tag,a=g.key.slice(0,f.ks/32));"string"===typeof b&&(b=sjcl.codec.utf8String.toBits(b));"string"===typeof c&&(f.adata=c=sjcl.codec.utf8String.toBits(c));g=new sjcl.cipher[f.cipher](a);e.g(d,f);d.key=a;f.ct="ccm"===f.mode&&sjcl.arrayBuffer&&sjcl.arrayBuffer.ccm&&
b instanceof ArrayBuffer?sjcl.arrayBuffer.ccm.encrypt(g,b,f.iv,c,f.ts):sjcl.mode[f.mode].encrypt(g,b,f.iv,c,f.ts);return f},encrypt:function(a,b,c,d){var e=sjcl.json,f=e.ja.apply(e,arguments);return e.encode(f)},ia:function(a,b,c,d){c=c||{};d=d||{};var e=sjcl.json;b=e.g(e.g(e.g({},e.defaults),b),c,!0);var f,g;f=b.adata;"string"===typeof b.salt&&(b.salt=sjcl.codec.base64.toBits(b.salt));"string"===typeof b.iv&&(b.iv=sjcl.codec.base64.toBits(b.iv));if(!sjcl.mode[b.mode]||!sjcl.cipher[b.cipher]||"string"===
typeof a&&100>=b.iter||64!==b.ts&&96!==b.ts&&128!==b.ts||128!==b.ks&&192!==b.ks&&0x100!==b.ks||!b.iv||2>b.iv.length||4<b.iv.length)throw new sjcl.exception.invalid("json decrypt: invalid parameters");"string"===typeof a?(g=sjcl.misc.cachedPbkdf2(a,b),a=g.key.slice(0,b.ks/32),b.salt=g.salt):sjcl.ecc&&a instanceof sjcl.ecc.elGamal.secretKey&&(a=a.unkem(sjcl.codec.base64.toBits(b.kemtag)).slice(0,b.ks/32));"string"===typeof f&&(f=sjcl.codec.utf8String.toBits(f));g=new sjcl.cipher[b.cipher](a);f="ccm"===
b.mode&&sjcl.arrayBuffer&&sjcl.arrayBuffer.ccm&&b.ct instanceof ArrayBuffer?sjcl.arrayBuffer.ccm.decrypt(g,b.ct,b.iv,b.tag,f,b.ts):sjcl.mode[b.mode].decrypt(g,b.ct,b.iv,f,b.ts);e.g(d,b);d.key=a;return 1===c.raw?f:sjcl.codec.utf8String.fromBits(f)},decrypt:function(a,b,c,d){var e=sjcl.json;return e.ia(a,e.decode(b),c,d)},encode:function(a){var b,c="{",d="";for(b in a)if(a.hasOwnProperty(b)){if(!b.match(/^[a-z0-9]+$/i))throw new sjcl.exception.invalid("json encode: invalid property name");c+=d+'"'+
b+'":';d=",";switch(typeof a[b]){case "number":case "boolean":c+=a[b];break;case "string":c+='"'+escape(a[b])+'"';break;case "object":c+='"'+sjcl.codec.base64.fromBits(a[b],0)+'"';break;default:throw new sjcl.exception.bug("json encode: unsupported type");}}return c+"}"},decode:function(a){a=a.replace(/\s/g,"");if(!a.match(/^\{.*\}$/))throw new sjcl.exception.invalid("json decode: this isn't json!");a=a.replace(/^\{|\}$/g,"").split(/,/);var b={},c,d;for(c=0;c<a.length;c++){if(!(d=a[c].match(/^\s*(?:(["']?)([a-z][a-z0-9]*)\1)\s*:\s*(?:(-?\d+)|"([a-z0-9+\/%*_.@=\-]*)"|(true|false))$/i)))throw new sjcl.exception.invalid("json decode: this isn't json!");
null!=d[3]?b[d[2]]=parseInt(d[3],10):null!=d[4]?b[d[2]]=d[2].match(/^(ct|adata|salt|iv)$/)?sjcl.codec.base64.toBits(d[4]):unescape(d[4]):null!=d[5]&&(b[d[2]]="true"===d[5])}return b},g:function(a,b,c){void 0===a&&(a={});if(void 0===b)return a;for(var d in b)if(b.hasOwnProperty(d)){if(c&&void 0!==a[d]&&a[d]!==b[d])throw new sjcl.exception.invalid("required parameter overridden");a[d]=b[d]}return a},sa:function(a,b){var c={},d;for(d in a)a.hasOwnProperty(d)&&a[d]!==b[d]&&(c[d]=a[d]);return c},ra:function(a,
b){var c={},d;for(d=0;d<b.length;d++)void 0!==a[b[d]]&&(c[b[d]]=a[b[d]]);return c}};sjcl.encrypt=sjcl.json.encrypt;sjcl.decrypt=sjcl.json.decrypt;sjcl.misc.pa={};sjcl.misc.cachedPbkdf2=function(a,b){var c=sjcl.misc.pa,d;b=b||{};d=b.iter||1E3;c=c[a]=c[a]||{};d=c[d]=c[d]||{firstSalt:b.salt&&b.salt.length?b.salt.slice(0):sjcl.random.randomWords(2,0)};c=void 0===b.salt?d.firstSalt:b.salt;d[c]=d[c]||sjcl.misc.pbkdf2(a,c,b.iter);return{key:d[c].slice(0),salt:c.slice(0)}};
 true&&module.exports&&(module.exports=sjcl); true&&!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function(){return sjcl}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "1IWx":
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = __webpack_require__("+qE3").EventEmitter;
var inherits = __webpack_require__("P7XM");

inherits(Stream, EE);
Stream.Readable = __webpack_require__("43KI");
Stream.Writable = __webpack_require__("LGOv");
Stream.Duplex = __webpack_require__("CWBI");
Stream.Transform = __webpack_require__("0XuU");
Stream.PassThrough = __webpack_require__("wq4j");

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};


/***/ }),

/***/ "4qo1":
/***/ (function(module, exports) {

var picker = function picker(type) {
  return function () {
    return new Promise(function (resolve, reject) {
      var fileLoader = function fileLoader(e) {
        var directory = {};
        var totalFiles = e.target.files.length;
        var loadedFiles = 0;
        [].map.call(e.target.files, function (file) {
          var reader = new FileReader();

          reader.onload = function (e) {
            var data = new Uint8Array(e.target.result);

            if (type === "directory") {
              var path = file.webkitRelativePath;
              directory[path.slice(path.indexOf("/") + 1)] = {
                type: "text/plain",
                data: data
              };
              if (++loadedFiles === totalFiles) resolve(directory);
            } else if (type === "file") {
              var _path = file.webkitRelativePath;
              resolve({
                "type": mimetype.lookup(_path),
                "data": data
              });
            } else {
              resolve(data);
            }
          };

          reader.readAsArrayBuffer(file);
        });
      };

      var fileInput;

      if (type === "directory") {
        fileInput = document.createElement("input");
        fileInput.addEventListener("change", fileLoader);
        fileInput.type = "file";
        fileInput.webkitdirectory = true;
        fileInput.mozdirectory = true;
        fileInput.msdirectory = true;
        fileInput.odirectory = true;
        fileInput.directory = true;
      } else {
        fileInput = document.createElement("input");
        fileInput.addEventListener("change", fileLoader);
        fileInput.type = "file";
      }

      ;
      var mouseEvent = document.createEvent("MouseEvents");
      mouseEvent.initEvent("click", true, false);
      fileInput.dispatchEvent(mouseEvent);
    });
  };
};

module.exports = {
  data: picker("data"),
  file: picker("file"),
  directory: picker("directory")
};

/***/ }),

/***/ "74uD":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {const createHmac = __webpack_require__("Giow")

const ONE1 = Buffer.alloc(1, 1)
const ZERO1 = Buffer.alloc(1, 0)

// https://tools.ietf.org/html/rfc6979#section-3.2
function deterministicGenerateK (hash, x, checkSig, isPrivate, extraEntropy) {
  // Step A, ignored as hash already provided
  // Step B
  // Step C
  let k = Buffer.alloc(32, 0)
  let v = Buffer.alloc(32, 1)

  // Step D
  k = createHmac('sha256', k)
    .update(v)
    .update(ZERO1)
    .update(x)
    .update(hash)
    .update(extraEntropy || '')
    .digest()

  // Step E
  v = createHmac('sha256', k).update(v).digest()

  // Step F
  k = createHmac('sha256', k)
    .update(v)
    .update(ONE1)
    .update(x)
    .update(hash)
    .update(extraEntropy || '')
    .digest()

  // Step G
  v = createHmac('sha256', k).update(v).digest()

  // Step H1/H2a, ignored as tlen === qlen (256 bit)
  // Step H2b
  v = createHmac('sha256', k).update(v).digest()

  let T = v

  // Step H3, repeat until T is within the interval [1, n - 1] and is suitable for ECDSA
  while (!isPrivate(T) || !checkSig(T)) {
    k = createHmac('sha256', k)
      .update(v)
      .update(ZERO1)
      .digest()

    v = createHmac('sha256', k).update(v).digest()

    // Step H1/H2a, again, ignored as tlen === qlen (256 bit)
    // Step H2b again
    v = createHmac('sha256', k).update(v).digest()
    T = v
  }

  return T
}

module.exports = deterministicGenerateK

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "G3+v":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__("Vi6U");

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};


/***/ }),

/***/ "KfcP":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {const BN = __webpack_require__("OZ/i")
const EC = __webpack_require__("MzeL").ec
const secp256k1 = new EC('secp256k1')
const deterministicGenerateK = __webpack_require__("74uD")

const ZERO32 = Buffer.alloc(32, 0)
const EC_GROUP_ORDER = Buffer.from('fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141', 'hex')
const EC_P = Buffer.from('fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f', 'hex')

const n = secp256k1.curve.n
const nDiv2 = n.shrn(1)
const G = secp256k1.curve.g

const THROW_BAD_PRIVATE = 'Expected Private'
const THROW_BAD_POINT = 'Expected Point'
const THROW_BAD_TWEAK = 'Expected Tweak'
const THROW_BAD_HASH = 'Expected Hash'
const THROW_BAD_SIGNATURE = 'Expected Signature'
const THROW_BAD_EXTRA_DATA = 'Expected Extra Data (32 bytes)'

function isScalar (x) {
  return Buffer.isBuffer(x) && x.length === 32
}

function isOrderScalar (x) {
  if (!isScalar(x)) return false
  return x.compare(EC_GROUP_ORDER) < 0 // < G
}

function isPoint (p) {
  if (!Buffer.isBuffer(p)) return false
  if (p.length < 33) return false

  const t = p[0]
  const x = p.slice(1, 33)
  if (x.compare(ZERO32) === 0) return false
  if (x.compare(EC_P) >= 0) return false
  if ((t === 0x02 || t === 0x03) && p.length === 33) {
    try { decodeFrom(p) } catch (e) { return false } // TODO: temporary
    return true
  }

  const y = p.slice(33)
  if (y.compare(ZERO32) === 0) return false
  if (y.compare(EC_P) >= 0) return false
  if (t === 0x04 && p.length === 65) return true
  return false
}

function __isPointCompressed (p) {
  return p[0] !== 0x04
}

function isPointCompressed (p) {
  if (!isPoint(p)) return false
  return __isPointCompressed(p)
}

function isPrivate (x) {
  if (!isScalar(x)) return false
  return x.compare(ZERO32) > 0 && // > 0
    x.compare(EC_GROUP_ORDER) < 0 // < G
}

function isSignature (value) {
  const r = value.slice(0, 32)
  const s = value.slice(32, 64)
  return Buffer.isBuffer(value) && value.length === 64 &&
    r.compare(EC_GROUP_ORDER) < 0 &&
    s.compare(EC_GROUP_ORDER) < 0
}

function assumeCompression (value, pubkey) {
  if (value === undefined && pubkey !== undefined) return __isPointCompressed(pubkey)
  if (value === undefined) return true
  return value
}

function fromBuffer (d) { return new BN(d) }
function toBuffer (d) { return d.toArrayLike(Buffer, 'be', 32) }
function decodeFrom (P) { return secp256k1.curve.decodePoint(P) }
function getEncoded (P, compressed) { return Buffer.from(P._encode(compressed)) }

function pointAdd (pA, pB, __compressed) {
  if (!isPoint(pA)) throw new TypeError(THROW_BAD_POINT)
  if (!isPoint(pB)) throw new TypeError(THROW_BAD_POINT)

  const a = decodeFrom(pA)
  const b = decodeFrom(pB)
  const pp = a.add(b)
  if (pp.isInfinity()) return null

  const compressed = assumeCompression(__compressed, pA)
  return getEncoded(pp, compressed)
}

function pointAddScalar (p, tweak, __compressed) {
  if (!isPoint(p)) throw new TypeError(THROW_BAD_POINT)
  if (!isOrderScalar(tweak)) throw new TypeError(THROW_BAD_TWEAK)

  const compressed = assumeCompression(__compressed, p)
  const pp = decodeFrom(p)
  if (tweak.compare(ZERO32) === 0) return getEncoded(pp, compressed)

  const tt = fromBuffer(tweak)
  const qq = G.mul(tt)
  const uu = pp.add(qq)
  if (uu.isInfinity()) return null

  return getEncoded(uu, compressed)
}

function pointCompress (p, compressed) {
  if (!isPoint(p)) throw new TypeError(THROW_BAD_POINT)

  const pp = decodeFrom(p)
  if (pp.isInfinity()) throw new TypeError(THROW_BAD_POINT)

  return getEncoded(pp, compressed)
}

function pointFromScalar (d, __compressed) {
  if (!isPrivate(d)) throw new TypeError(THROW_BAD_PRIVATE)

  const dd = fromBuffer(d)
  const pp = G.mul(dd)
  if (pp.isInfinity()) return null

  const compressed = assumeCompression(__compressed)
  return getEncoded(pp, compressed)
}

function pointMultiply (p, tweak, __compressed) {
  if (!isPoint(p)) throw new TypeError(THROW_BAD_POINT)
  if (!isOrderScalar(tweak)) throw new TypeError(THROW_BAD_TWEAK)

  const compressed = assumeCompression(__compressed, p)
  const pp = decodeFrom(p)
  const tt = fromBuffer(tweak)
  const qq = pp.mul(tt)
  if (qq.isInfinity()) return null

  return getEncoded(qq, compressed)
}

function privateAdd (d, tweak) {
  if (!isPrivate(d)) throw new TypeError(THROW_BAD_PRIVATE)
  if (!isOrderScalar(tweak)) throw new TypeError(THROW_BAD_TWEAK)

  const dd = fromBuffer(d)
  const tt = fromBuffer(tweak)
  const dt = toBuffer(dd.add(tt).umod(n))
  if (!isPrivate(dt)) return null

  return dt
}

function privateSub (d, tweak) {
  if (!isPrivate(d)) throw new TypeError(THROW_BAD_PRIVATE)
  if (!isOrderScalar(tweak)) throw new TypeError(THROW_BAD_TWEAK)

  const dd = fromBuffer(d)
  const tt = fromBuffer(tweak)
  const dt = toBuffer(dd.sub(tt).umod(n))
  if (!isPrivate(dt)) return null

  return dt
}

function sign (hash, x) {
  return __sign(hash, x)
}

function signWithEntropy (hash, x, addData) {
  return __sign(hash, x, addData)
}

function __sign (hash, x, addData) {
  if (!isScalar(hash)) throw new TypeError(THROW_BAD_HASH)
  if (!isPrivate(x)) throw new TypeError(THROW_BAD_PRIVATE)
  if (addData !== undefined && !isScalar(addData)) throw new TypeError(THROW_BAD_EXTRA_DATA)

  const d = fromBuffer(x)
  const e = fromBuffer(hash)

  let r, s
  const checkSig = function (k) {
    const kI = fromBuffer(k)
    const Q = G.mul(kI)

    if (Q.isInfinity()) return false

    r = Q.x.umod(n)
    if (r.isZero() === 0) return false

    s = kI
      .invm(n)
      .mul(e.add(d.mul(r)))
      .umod(n)
    if (s.isZero() === 0) return false

    return true
  }

  deterministicGenerateK(hash, x, checkSig, isPrivate, addData)

  // enforce low S values, see bip62: 'low s values in signatures'
  if (s.cmp(nDiv2) > 0) {
    s = n.sub(s)
  }

  const buffer = Buffer.allocUnsafe(64)
  toBuffer(r).copy(buffer, 0)
  toBuffer(s).copy(buffer, 32)
  return buffer
}

function verify (hash, q, signature) {
  if (!isScalar(hash)) throw new TypeError(THROW_BAD_HASH)
  if (!isPoint(q)) throw new TypeError(THROW_BAD_POINT)

  // 1.4.1 Enforce r and s are both integers in the interval [1, n − 1] (1, isSignature enforces '< n - 1')
  if (!isSignature(signature)) throw new TypeError(THROW_BAD_SIGNATURE)

  const Q = decodeFrom(q)
  const r = fromBuffer(signature.slice(0, 32))
  const s = fromBuffer(signature.slice(32, 64))

  // 1.4.1 Enforce r and s are both integers in the interval [1, n − 1] (2, enforces '> 0')
  if (r.gtn(0) <= 0 /* || r.compareTo(n) >= 0 */) return false
  if (s.gtn(0) <= 0 /* || s.compareTo(n) >= 0 */) return false

  // 1.4.2 H = Hash(M), already done by the user
  // 1.4.3 e = H
  const e = fromBuffer(hash)

  // Compute s^-1
  const sInv = s.invm(n)

  // 1.4.4 Compute u1 = es^−1 mod n
  //               u2 = rs^−1 mod n
  const u1 = e.mul(sInv).umod(n)
  const u2 = r.mul(sInv).umod(n)

  // 1.4.5 Compute R = (xR, yR)
  //               R = u1G + u2Q
  const R = G.mulAdd(u1, Q, u2)

  // 1.4.5 (cont.) Enforce R is not at infinity
  if (R.isInfinity()) return false

  // 1.4.6 Convert the field element R.x to an integer
  const xR = R.x

  // 1.4.7 Set v = xR mod n
  const v = xR.umod(n)

  // 1.4.8 If v = r, output "valid", and if v != r, output "invalid"
  return v.eq(r)
}

module.exports = {
  isPoint,
  isPointCompressed,
  isPrivate,
  pointAdd,
  pointAddScalar,
  pointCompress,
  pointFromScalar,
  pointMultiply,
  privateAdd,
  privateSub,
  sign,
  signWithEntropy,
  verify
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "M/th":
/***/ (function(module, exports, __webpack_require__) {

var unavailable = function unavailable() {
  throw "This swarm.js function isn't available on the browser.";
};

var fs = {
  readFile: unavailable
};
var files = {
  download: unavailable,
  safeDownloadArchived: unavailable,
  directoryTree: unavailable
};
var os = {
  platform: unavailable,
  arch: unavailable
};
var path = {
  join: unavailable,
  slice: unavailable
};
var child_process = {
  spawn: unavailable
};
var mimetype = {
  lookup: unavailable
};
var defaultArchives = {};
var downloadUrl = null;

var request = __webpack_require__("JfJa");

var bytes = __webpack_require__("vHQG");

var hash = __webpack_require__("adyd");

var pick = __webpack_require__("4qo1");

var swarm = __webpack_require__("qtZk");

module.exports = swarm({
  fs: fs,
  files: files,
  os: os,
  path: path,
  child_process: child_process,
  defaultArchives: defaultArchives,
  mimetype: mimetype,
  request: request,
  downloadUrl: downloadUrl,
  bytes: bytes,
  hash: hash,
  pick: pick
});

/***/ }),

/***/ "QZTG":
/***/ (function(module, exports, __webpack_require__) {

// This is free and unencumbered software released into the public domain.
// See LICENSE.md for more information.

var encoding = __webpack_require__("Te/c");

module.exports = {
  TextEncoder: encoding.TextEncoder,
  TextDecoder: encoding.TextDecoder,
};


/***/ }),

/***/ "Te/c":
/***/ (function(module, exports, __webpack_require__) {

// This is free and unencumbered software released into the public domain.
// See LICENSE.md for more information.

/**
 * @fileoverview Global |this| required for resolving indexes in node.
 * @suppress {globalThis}
 */
(function(global) {
  'use strict';

  // If we're in node require encoding-indexes and attach it to the global.
  if ( true && module.exports &&
    !global["encoding-indexes"]) {
    global["encoding-indexes"] =
      __webpack_require__("Npx1")["encoding-indexes"];
  }

  //
  // Utilities
  //

  /**
   * @param {number} a The number to test.
   * @param {number} min The minimum value in the range, inclusive.
   * @param {number} max The maximum value in the range, inclusive.
   * @return {boolean} True if a >= min and a <= max.
   */
  function inRange(a, min, max) {
    return min <= a && a <= max;
  }

  /**
   * @param {!Array.<*>} array The array to check.
   * @param {*} item The item to look for in the array.
   * @return {boolean} True if the item appears in the array.
   */
  function includes(array, item) {
    return array.indexOf(item) !== -1;
  }

  var floor = Math.floor;

  /**
   * @param {*} o
   * @return {Object}
   */
  function ToDictionary(o) {
    if (o === undefined) return {};
    if (o === Object(o)) return o;
    throw TypeError('Could not convert argument to dictionary');
  }

  /**
   * @param {string} string Input string of UTF-16 code units.
   * @return {!Array.<number>} Code points.
   */
  function stringToCodePoints(string) {
    // https://heycam.github.io/webidl/#dfn-obtain-unicode

    // 1. Let S be the DOMString value.
    var s = String(string);

    // 2. Let n be the length of S.
    var n = s.length;

    // 3. Initialize i to 0.
    var i = 0;

    // 4. Initialize U to be an empty sequence of Unicode characters.
    var u = [];

    // 5. While i < n:
    while (i < n) {

      // 1. Let c be the code unit in S at index i.
      var c = s.charCodeAt(i);

      // 2. Depending on the value of c:

      // c < 0xD800 or c > 0xDFFF
      if (c < 0xD800 || c > 0xDFFF) {
        // Append to U the Unicode character with code point c.
        u.push(c);
      }

      // 0xDC00 ≤ c ≤ 0xDFFF
      else if (0xDC00 <= c && c <= 0xDFFF) {
        // Append to U a U+FFFD REPLACEMENT CHARACTER.
        u.push(0xFFFD);
      }

      // 0xD800 ≤ c ≤ 0xDBFF
      else if (0xD800 <= c && c <= 0xDBFF) {
        // 1. If i = n−1, then append to U a U+FFFD REPLACEMENT
        // CHARACTER.
        if (i === n - 1) {
          u.push(0xFFFD);
        }
        // 2. Otherwise, i < n−1:
        else {
          // 1. Let d be the code unit in S at index i+1.
          var d = s.charCodeAt(i + 1);

          // 2. If 0xDC00 ≤ d ≤ 0xDFFF, then:
          if (0xDC00 <= d && d <= 0xDFFF) {
            // 1. Let a be c & 0x3FF.
            var a = c & 0x3FF;

            // 2. Let b be d & 0x3FF.
            var b = d & 0x3FF;

            // 3. Append to U the Unicode character with code point
            // 2^16+2^10*a+b.
            u.push(0x10000 + (a << 10) + b);

            // 4. Set i to i+1.
            i += 1;
          }

          // 3. Otherwise, d < 0xDC00 or d > 0xDFFF. Append to U a
          // U+FFFD REPLACEMENT CHARACTER.
          else  {
            u.push(0xFFFD);
          }
        }
      }

      // 3. Set i to i+1.
      i += 1;
    }

    // 6. Return U.
    return u;
  }

  /**
   * @param {!Array.<number>} code_points Array of code points.
   * @return {string} string String of UTF-16 code units.
   */
  function codePointsToString(code_points) {
    var s = '';
    for (var i = 0; i < code_points.length; ++i) {
      var cp = code_points[i];
      if (cp <= 0xFFFF) {
        s += String.fromCharCode(cp);
      } else {
        cp -= 0x10000;
        s += String.fromCharCode((cp >> 10) + 0xD800,
                                 (cp & 0x3FF) + 0xDC00);
      }
    }
    return s;
  }


  //
  // Implementation of Encoding specification
  // https://encoding.spec.whatwg.org/
  //

  //
  // 4. Terminology
  //

  /**
   * An ASCII byte is a byte in the range 0x00 to 0x7F, inclusive.
   * @param {number} a The number to test.
   * @return {boolean} True if a is in the range 0x00 to 0x7F, inclusive.
   */
  function isASCIIByte(a) {
    return 0x00 <= a && a <= 0x7F;
  }

  /**
   * An ASCII code point is a code point in the range U+0000 to
   * U+007F, inclusive.
   */
  var isASCIICodePoint = isASCIIByte;


  /**
   * End-of-stream is a special token that signifies no more tokens
   * are in the stream.
   * @const
   */ var end_of_stream = -1;

  /**
   * A stream represents an ordered sequence of tokens.
   *
   * @constructor
   * @param {!(Array.<number>|Uint8Array)} tokens Array of tokens that provide
   * the stream.
   */
  function Stream(tokens) {
    /** @type {!Array.<number>} */
    this.tokens = [].slice.call(tokens);
    // Reversed as push/pop is more efficient than shift/unshift.
    this.tokens.reverse();
  }

  Stream.prototype = {
    /**
     * @return {boolean} True if end-of-stream has been hit.
     */
    endOfStream: function() {
      return !this.tokens.length;
    },

    /**
     * When a token is read from a stream, the first token in the
     * stream must be returned and subsequently removed, and
     * end-of-stream must be returned otherwise.
     *
     * @return {number} Get the next token from the stream, or
     * end_of_stream.
     */
     read: function() {
      if (!this.tokens.length)
        return end_of_stream;
       return this.tokens.pop();
     },

    /**
     * When one or more tokens are prepended to a stream, those tokens
     * must be inserted, in given order, before the first token in the
     * stream.
     *
     * @param {(number|!Array.<number>)} token The token(s) to prepend to the
     * stream.
     */
    prepend: function(token) {
      if (Array.isArray(token)) {
        var tokens = /**@type {!Array.<number>}*/(token);
        while (tokens.length)
          this.tokens.push(tokens.pop());
      } else {
        this.tokens.push(token);
      }
    },

    /**
     * When one or more tokens are pushed to a stream, those tokens
     * must be inserted, in given order, after the last token in the
     * stream.
     *
     * @param {(number|!Array.<number>)} token The tokens(s) to push to the
     * stream.
     */
    push: function(token) {
      if (Array.isArray(token)) {
        var tokens = /**@type {!Array.<number>}*/(token);
        while (tokens.length)
          this.tokens.unshift(tokens.shift());
      } else {
        this.tokens.unshift(token);
      }
    }
  };

  //
  // 5. Encodings
  //

  // 5.1 Encoders and decoders

  /** @const */
  var finished = -1;

  /**
   * @param {boolean} fatal If true, decoding errors raise an exception.
   * @param {number=} opt_code_point Override the standard fallback code point.
   * @return {number} The code point to insert on a decoding error.
   */
  function decoderError(fatal, opt_code_point) {
    if (fatal)
      throw TypeError('Decoder error');
    return opt_code_point || 0xFFFD;
  }

  /**
   * @param {number} code_point The code point that could not be encoded.
   * @return {number} Always throws, no value is actually returned.
   */
  function encoderError(code_point) {
    throw TypeError('The code point ' + code_point + ' could not be encoded.');
  }

  /** @interface */
  function Decoder() {}
  Decoder.prototype = {
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point, or |finished|.
     */
    handler: function(stream, bite) {}
  };

  /** @interface */
  function Encoder() {}
  Encoder.prototype = {
    /**
     * @param {Stream} stream The stream of code points being encoded.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit, or |finished|.
     */
    handler: function(stream, code_point) {}
  };

  // 5.2 Names and labels

  // TODO: Define @typedef for Encoding: {name:string,labels:Array.<string>}
  // https://github.com/google/closure-compiler/issues/247

  /**
   * @param {string} label The encoding label.
   * @return {?{name:string,labels:Array.<string>}}
   */
  function getEncoding(label) {
    // 1. Remove any leading and trailing ASCII whitespace from label.
    label = String(label).trim().toLowerCase();

    // 2. If label is an ASCII case-insensitive match for any of the
    // labels listed in the table below, return the corresponding
    // encoding, and failure otherwise.
    if (Object.prototype.hasOwnProperty.call(label_to_encoding, label)) {
      return label_to_encoding[label];
    }
    return null;
  }

  /**
   * Encodings table: https://encoding.spec.whatwg.org/encodings.json
   * @const
   * @type {!Array.<{
   *          heading: string,
   *          encodings: Array.<{name:string,labels:Array.<string>}>
   *        }>}
   */
  var encodings = [
    {
      "encodings": [
        {
          "labels": [
            "unicode-1-1-utf-8",
            "utf-8",
            "utf8"
          ],
          "name": "UTF-8"
        }
      ],
      "heading": "The Encoding"
    },
    {
      "encodings": [
        {
          "labels": [
            "866",
            "cp866",
            "csibm866",
            "ibm866"
          ],
          "name": "IBM866"
        },
        {
          "labels": [
            "csisolatin2",
            "iso-8859-2",
            "iso-ir-101",
            "iso8859-2",
            "iso88592",
            "iso_8859-2",
            "iso_8859-2:1987",
            "l2",
            "latin2"
          ],
          "name": "ISO-8859-2"
        },
        {
          "labels": [
            "csisolatin3",
            "iso-8859-3",
            "iso-ir-109",
            "iso8859-3",
            "iso88593",
            "iso_8859-3",
            "iso_8859-3:1988",
            "l3",
            "latin3"
          ],
          "name": "ISO-8859-3"
        },
        {
          "labels": [
            "csisolatin4",
            "iso-8859-4",
            "iso-ir-110",
            "iso8859-4",
            "iso88594",
            "iso_8859-4",
            "iso_8859-4:1988",
            "l4",
            "latin4"
          ],
          "name": "ISO-8859-4"
        },
        {
          "labels": [
            "csisolatincyrillic",
            "cyrillic",
            "iso-8859-5",
            "iso-ir-144",
            "iso8859-5",
            "iso88595",
            "iso_8859-5",
            "iso_8859-5:1988"
          ],
          "name": "ISO-8859-5"
        },
        {
          "labels": [
            "arabic",
            "asmo-708",
            "csiso88596e",
            "csiso88596i",
            "csisolatinarabic",
            "ecma-114",
            "iso-8859-6",
            "iso-8859-6-e",
            "iso-8859-6-i",
            "iso-ir-127",
            "iso8859-6",
            "iso88596",
            "iso_8859-6",
            "iso_8859-6:1987"
          ],
          "name": "ISO-8859-6"
        },
        {
          "labels": [
            "csisolatingreek",
            "ecma-118",
            "elot_928",
            "greek",
            "greek8",
            "iso-8859-7",
            "iso-ir-126",
            "iso8859-7",
            "iso88597",
            "iso_8859-7",
            "iso_8859-7:1987",
            "sun_eu_greek"
          ],
          "name": "ISO-8859-7"
        },
        {
          "labels": [
            "csiso88598e",
            "csisolatinhebrew",
            "hebrew",
            "iso-8859-8",
            "iso-8859-8-e",
            "iso-ir-138",
            "iso8859-8",
            "iso88598",
            "iso_8859-8",
            "iso_8859-8:1988",
            "visual"
          ],
          "name": "ISO-8859-8"
        },
        {
          "labels": [
            "csiso88598i",
            "iso-8859-8-i",
            "logical"
          ],
          "name": "ISO-8859-8-I"
        },
        {
          "labels": [
            "csisolatin6",
            "iso-8859-10",
            "iso-ir-157",
            "iso8859-10",
            "iso885910",
            "l6",
            "latin6"
          ],
          "name": "ISO-8859-10"
        },
        {
          "labels": [
            "iso-8859-13",
            "iso8859-13",
            "iso885913"
          ],
          "name": "ISO-8859-13"
        },
        {
          "labels": [
            "iso-8859-14",
            "iso8859-14",
            "iso885914"
          ],
          "name": "ISO-8859-14"
        },
        {
          "labels": [
            "csisolatin9",
            "iso-8859-15",
            "iso8859-15",
            "iso885915",
            "iso_8859-15",
            "l9"
          ],
          "name": "ISO-8859-15"
        },
        {
          "labels": [
            "iso-8859-16"
          ],
          "name": "ISO-8859-16"
        },
        {
          "labels": [
            "cskoi8r",
            "koi",
            "koi8",
            "koi8-r",
            "koi8_r"
          ],
          "name": "KOI8-R"
        },
        {
          "labels": [
            "koi8-ru",
            "koi8-u"
          ],
          "name": "KOI8-U"
        },
        {
          "labels": [
            "csmacintosh",
            "mac",
            "macintosh",
            "x-mac-roman"
          ],
          "name": "macintosh"
        },
        {
          "labels": [
            "dos-874",
            "iso-8859-11",
            "iso8859-11",
            "iso885911",
            "tis-620",
            "windows-874"
          ],
          "name": "windows-874"
        },
        {
          "labels": [
            "cp1250",
            "windows-1250",
            "x-cp1250"
          ],
          "name": "windows-1250"
        },
        {
          "labels": [
            "cp1251",
            "windows-1251",
            "x-cp1251"
          ],
          "name": "windows-1251"
        },
        {
          "labels": [
            "ansi_x3.4-1968",
            "ascii",
            "cp1252",
            "cp819",
            "csisolatin1",
            "ibm819",
            "iso-8859-1",
            "iso-ir-100",
            "iso8859-1",
            "iso88591",
            "iso_8859-1",
            "iso_8859-1:1987",
            "l1",
            "latin1",
            "us-ascii",
            "windows-1252",
            "x-cp1252"
          ],
          "name": "windows-1252"
        },
        {
          "labels": [
            "cp1253",
            "windows-1253",
            "x-cp1253"
          ],
          "name": "windows-1253"
        },
        {
          "labels": [
            "cp1254",
            "csisolatin5",
            "iso-8859-9",
            "iso-ir-148",
            "iso8859-9",
            "iso88599",
            "iso_8859-9",
            "iso_8859-9:1989",
            "l5",
            "latin5",
            "windows-1254",
            "x-cp1254"
          ],
          "name": "windows-1254"
        },
        {
          "labels": [
            "cp1255",
            "windows-1255",
            "x-cp1255"
          ],
          "name": "windows-1255"
        },
        {
          "labels": [
            "cp1256",
            "windows-1256",
            "x-cp1256"
          ],
          "name": "windows-1256"
        },
        {
          "labels": [
            "cp1257",
            "windows-1257",
            "x-cp1257"
          ],
          "name": "windows-1257"
        },
        {
          "labels": [
            "cp1258",
            "windows-1258",
            "x-cp1258"
          ],
          "name": "windows-1258"
        },
        {
          "labels": [
            "x-mac-cyrillic",
            "x-mac-ukrainian"
          ],
          "name": "x-mac-cyrillic"
        }
      ],
      "heading": "Legacy single-byte encodings"
    },
    {
      "encodings": [
        {
          "labels": [
            "chinese",
            "csgb2312",
            "csiso58gb231280",
            "gb2312",
            "gb_2312",
            "gb_2312-80",
            "gbk",
            "iso-ir-58",
            "x-gbk"
          ],
          "name": "GBK"
        },
        {
          "labels": [
            "gb18030"
          ],
          "name": "gb18030"
        }
      ],
      "heading": "Legacy multi-byte Chinese (simplified) encodings"
    },
    {
      "encodings": [
        {
          "labels": [
            "big5",
            "big5-hkscs",
            "cn-big5",
            "csbig5",
            "x-x-big5"
          ],
          "name": "Big5"
        }
      ],
      "heading": "Legacy multi-byte Chinese (traditional) encodings"
    },
    {
      "encodings": [
        {
          "labels": [
            "cseucpkdfmtjapanese",
            "euc-jp",
            "x-euc-jp"
          ],
          "name": "EUC-JP"
        },
        {
          "labels": [
            "csiso2022jp",
            "iso-2022-jp"
          ],
          "name": "ISO-2022-JP"
        },
        {
          "labels": [
            "csshiftjis",
            "ms932",
            "ms_kanji",
            "shift-jis",
            "shift_jis",
            "sjis",
            "windows-31j",
            "x-sjis"
          ],
          "name": "Shift_JIS"
        }
      ],
      "heading": "Legacy multi-byte Japanese encodings"
    },
    {
      "encodings": [
        {
          "labels": [
            "cseuckr",
            "csksc56011987",
            "euc-kr",
            "iso-ir-149",
            "korean",
            "ks_c_5601-1987",
            "ks_c_5601-1989",
            "ksc5601",
            "ksc_5601",
            "windows-949"
          ],
          "name": "EUC-KR"
        }
      ],
      "heading": "Legacy multi-byte Korean encodings"
    },
    {
      "encodings": [
        {
          "labels": [
            "csiso2022kr",
            "hz-gb-2312",
            "iso-2022-cn",
            "iso-2022-cn-ext",
            "iso-2022-kr"
          ],
          "name": "replacement"
        },
        {
          "labels": [
            "utf-16be"
          ],
          "name": "UTF-16BE"
        },
        {
          "labels": [
            "utf-16",
            "utf-16le"
          ],
          "name": "UTF-16LE"
        },
        {
          "labels": [
            "x-user-defined"
          ],
          "name": "x-user-defined"
        }
      ],
      "heading": "Legacy miscellaneous encodings"
    }
  ];

  // Label to encoding registry.
  /** @type {Object.<string,{name:string,labels:Array.<string>}>} */
  var label_to_encoding = {};
  encodings.forEach(function(category) {
    category.encodings.forEach(function(encoding) {
      encoding.labels.forEach(function(label) {
        label_to_encoding[label] = encoding;
      });
    });
  });

  // Registry of of encoder/decoder factories, by encoding name.
  /** @type {Object.<string, function({fatal:boolean}): Encoder>} */
  var encoders = {};
  /** @type {Object.<string, function({fatal:boolean}): Decoder>} */
  var decoders = {};

  //
  // 6. Indexes
  //

  /**
   * @param {number} pointer The |pointer| to search for.
   * @param {(!Array.<?number>|undefined)} index The |index| to search within.
   * @return {?number} The code point corresponding to |pointer| in |index|,
   *     or null if |code point| is not in |index|.
   */
  function indexCodePointFor(pointer, index) {
    if (!index) return null;
    return index[pointer] || null;
  }

  /**
   * @param {number} code_point The |code point| to search for.
   * @param {!Array.<?number>} index The |index| to search within.
   * @return {?number} The first pointer corresponding to |code point| in
   *     |index|, or null if |code point| is not in |index|.
   */
  function indexPointerFor(code_point, index) {
    var pointer = index.indexOf(code_point);
    return pointer === -1 ? null : pointer;
  }

  /**
   * @param {string} name Name of the index.
   * @return {(!Array.<number>|!Array.<Array.<number>>)}
   *  */
  function index(name) {
    if (!('encoding-indexes' in global)) {
      throw Error("Indexes missing." +
                  " Did you forget to include encoding-indexes.js first?");
    }
    return global['encoding-indexes'][name];
  }

  /**
   * @param {number} pointer The |pointer| to search for in the gb18030 index.
   * @return {?number} The code point corresponding to |pointer| in |index|,
   *     or null if |code point| is not in the gb18030 index.
   */
  function indexGB18030RangesCodePointFor(pointer) {
    // 1. If pointer is greater than 39419 and less than 189000, or
    // pointer is greater than 1237575, return null.
    if ((pointer > 39419 && pointer < 189000) || (pointer > 1237575))
      return null;

    // 2. If pointer is 7457, return code point U+E7C7.
    if (pointer === 7457) return 0xE7C7;

    // 3. Let offset be the last pointer in index gb18030 ranges that
    // is equal to or less than pointer and let code point offset be
    // its corresponding code point.
    var offset = 0;
    var code_point_offset = 0;
    var idx = index('gb18030-ranges');
    var i;
    for (i = 0; i < idx.length; ++i) {
      /** @type {!Array.<number>} */
      var entry = idx[i];
      if (entry[0] <= pointer) {
        offset = entry[0];
        code_point_offset = entry[1];
      } else {
        break;
      }
    }

    // 4. Return a code point whose value is code point offset +
    // pointer − offset.
    return code_point_offset + pointer - offset;
  }

  /**
   * @param {number} code_point The |code point| to locate in the gb18030 index.
   * @return {number} The first pointer corresponding to |code point| in the
   *     gb18030 index.
   */
  function indexGB18030RangesPointerFor(code_point) {
    // 1. If code point is U+E7C7, return pointer 7457.
    if (code_point === 0xE7C7) return 7457;

    // 2. Let offset be the last code point in index gb18030 ranges
    // that is equal to or less than code point and let pointer offset
    // be its corresponding pointer.
    var offset = 0;
    var pointer_offset = 0;
    var idx = index('gb18030-ranges');
    var i;
    for (i = 0; i < idx.length; ++i) {
      /** @type {!Array.<number>} */
      var entry = idx[i];
      if (entry[1] <= code_point) {
        offset = entry[1];
        pointer_offset = entry[0];
      } else {
        break;
      }
    }

    // 3. Return a pointer whose value is pointer offset + code point
    // − offset.
    return pointer_offset + code_point - offset;
  }

  /**
   * @param {number} code_point The |code_point| to search for in the Shift_JIS
   *     index.
   * @return {?number} The code point corresponding to |pointer| in |index|,
   *     or null if |code point| is not in the Shift_JIS index.
   */
  function indexShiftJISPointerFor(code_point) {
    // 1. Let index be index jis0208 excluding all entries whose
    // pointer is in the range 8272 to 8835, inclusive.
    shift_jis_index = shift_jis_index ||
      index('jis0208').map(function(code_point, pointer) {
        return inRange(pointer, 8272, 8835) ? null : code_point;
      });
    var index_ = shift_jis_index;

    // 2. Return the index pointer for code point in index.
    return index_.indexOf(code_point);
  }
  var shift_jis_index;

  /**
   * @param {number} code_point The |code_point| to search for in the big5
   *     index.
   * @return {?number} The code point corresponding to |pointer| in |index|,
   *     or null if |code point| is not in the big5 index.
   */
  function indexBig5PointerFor(code_point) {
    // 1. Let index be index Big5 excluding all entries whose pointer
    big5_index_no_hkscs = big5_index_no_hkscs ||
      index('big5').map(function(code_point, pointer) {
        return (pointer < (0xA1 - 0x81) * 157) ? null : code_point;
      });
    var index_ = big5_index_no_hkscs;

    // 2. If code point is U+2550, U+255E, U+2561, U+256A, U+5341, or
    // U+5345, return the last pointer corresponding to code point in
    // index.
    if (code_point === 0x2550 || code_point === 0x255E ||
        code_point === 0x2561 || code_point === 0x256A ||
        code_point === 0x5341 || code_point === 0x5345) {
      return index_.lastIndexOf(code_point);
    }

    // 3. Return the index pointer for code point in index.
    return indexPointerFor(code_point, index_);
  }
  var big5_index_no_hkscs;

  //
  // 8. API
  //

  /** @const */ var DEFAULT_ENCODING = 'utf-8';

  // 8.1 Interface TextDecoder

  /**
   * @constructor
   * @param {string=} label The label of the encoding;
   *     defaults to 'utf-8'.
   * @param {Object=} options
   */
  function TextDecoder(label, options) {
    // Web IDL conventions
    if (!(this instanceof TextDecoder))
      throw TypeError('Called as a function. Did you forget \'new\'?');
    label = label !== undefined ? String(label) : DEFAULT_ENCODING;
    options = ToDictionary(options);

    // A TextDecoder object has an associated encoding, decoder,
    // stream, ignore BOM flag (initially unset), BOM seen flag
    // (initially unset), error mode (initially replacement), and do
    // not flush flag (initially unset).

    /** @private */
    this._encoding = null;
    /** @private @type {?Decoder} */
    this._decoder = null;
    /** @private @type {boolean} */
    this._ignoreBOM = false;
    /** @private @type {boolean} */
    this._BOMseen = false;
    /** @private @type {string} */
    this._error_mode = 'replacement';
    /** @private @type {boolean} */
    this._do_not_flush = false;


    // 1. Let encoding be the result of getting an encoding from
    // label.
    var encoding = getEncoding(label);

    // 2. If encoding is failure or replacement, throw a RangeError.
    if (encoding === null || encoding.name === 'replacement')
      throw RangeError('Unknown encoding: ' + label);
    if (!decoders[encoding.name]) {
      throw Error('Decoder not present.' +
                  ' Did you forget to include encoding-indexes.js first?');
    }

    // 3. Let dec be a new TextDecoder object.
    var dec = this;

    // 4. Set dec's encoding to encoding.
    dec._encoding = encoding;

    // 5. If options's fatal member is true, set dec's error mode to
    // fatal.
    if (Boolean(options['fatal']))
      dec._error_mode = 'fatal';

    // 6. If options's ignoreBOM member is true, set dec's ignore BOM
    // flag.
    if (Boolean(options['ignoreBOM']))
      dec._ignoreBOM = true;

    // For pre-ES5 runtimes:
    if (!Object.defineProperty) {
      this.encoding = dec._encoding.name.toLowerCase();
      this.fatal = dec._error_mode === 'fatal';
      this.ignoreBOM = dec._ignoreBOM;
    }

    // 7. Return dec.
    return dec;
  }

  if (Object.defineProperty) {
    // The encoding attribute's getter must return encoding's name.
    Object.defineProperty(TextDecoder.prototype, 'encoding', {
      /** @this {TextDecoder} */
      get: function() { return this._encoding.name.toLowerCase(); }
    });

    // The fatal attribute's getter must return true if error mode
    // is fatal, and false otherwise.
    Object.defineProperty(TextDecoder.prototype, 'fatal', {
      /** @this {TextDecoder} */
      get: function() { return this._error_mode === 'fatal'; }
    });

    // The ignoreBOM attribute's getter must return true if ignore
    // BOM flag is set, and false otherwise.
    Object.defineProperty(TextDecoder.prototype, 'ignoreBOM', {
      /** @this {TextDecoder} */
      get: function() { return this._ignoreBOM; }
    });
  }

  /**
   * @param {BufferSource=} input The buffer of bytes to decode.
   * @param {Object=} options
   * @return {string} The decoded string.
   */
  TextDecoder.prototype.decode = function decode(input, options) {
    var bytes;
    if (typeof input === 'object' && input instanceof ArrayBuffer) {
      bytes = new Uint8Array(input);
    } else if (typeof input === 'object' && 'buffer' in input &&
               input.buffer instanceof ArrayBuffer) {
      bytes = new Uint8Array(input.buffer,
                             input.byteOffset,
                             input.byteLength);
    } else {
      bytes = new Uint8Array(0);
    }

    options = ToDictionary(options);

    // 1. If the do not flush flag is unset, set decoder to a new
    // encoding's decoder, set stream to a new stream, and unset the
    // BOM seen flag.
    if (!this._do_not_flush) {
      this._decoder = decoders[this._encoding.name]({
        fatal: this._error_mode === 'fatal'});
      this._BOMseen = false;
    }

    // 2. If options's stream is true, set the do not flush flag, and
    // unset the do not flush flag otherwise.
    this._do_not_flush = Boolean(options['stream']);

    // 3. If input is given, push a copy of input to stream.
    // TODO: Align with spec algorithm - maintain stream on instance.
    var input_stream = new Stream(bytes);

    // 4. Let output be a new stream.
    var output = [];

    /** @type {?(number|!Array.<number>)} */
    var result;

    // 5. While true:
    while (true) {
      // 1. Let token be the result of reading from stream.
      var token = input_stream.read();

      // 2. If token is end-of-stream and the do not flush flag is
      // set, return output, serialized.
      // TODO: Align with spec algorithm.
      if (token === end_of_stream)
        break;

      // 3. Otherwise, run these subsubsteps:

      // 1. Let result be the result of processing token for decoder,
      // stream, output, and error mode.
      result = this._decoder.handler(input_stream, token);

      // 2. If result is finished, return output, serialized.
      if (result === finished)
        break;

      if (result !== null) {
        if (Array.isArray(result))
          output.push.apply(output, /**@type {!Array.<number>}*/(result));
        else
          output.push(result);
      }

      // 3. Otherwise, if result is error, throw a TypeError.
      // (Thrown in handler)

      // 4. Otherwise, do nothing.
    }
    // TODO: Align with spec algorithm.
    if (!this._do_not_flush) {
      do {
        result = this._decoder.handler(input_stream, input_stream.read());
        if (result === finished)
          break;
        if (result === null)
          continue;
        if (Array.isArray(result))
          output.push.apply(output, /**@type {!Array.<number>}*/(result));
        else
          output.push(result);
      } while (!input_stream.endOfStream());
      this._decoder = null;
    }

    // A TextDecoder object also has an associated serialize stream
    // algorithm...
    /**
     * @param {!Array.<number>} stream
     * @return {string}
     * @this {TextDecoder}
     */
    function serializeStream(stream) {
      // 1. Let token be the result of reading from stream.
      // (Done in-place on array, rather than as a stream)

      // 2. If encoding is UTF-8, UTF-16BE, or UTF-16LE, and ignore
      // BOM flag and BOM seen flag are unset, run these subsubsteps:
      if (includes(['UTF-8', 'UTF-16LE', 'UTF-16BE'], this._encoding.name) &&
          !this._ignoreBOM && !this._BOMseen) {
        if (stream.length > 0 && stream[0] === 0xFEFF) {
          // 1. If token is U+FEFF, set BOM seen flag.
          this._BOMseen = true;
          stream.shift();
        } else if (stream.length > 0) {
          // 2. Otherwise, if token is not end-of-stream, set BOM seen
          // flag and append token to stream.
          this._BOMseen = true;
        } else {
          // 3. Otherwise, if token is not end-of-stream, append token
          // to output.
          // (no-op)
        }
      }
      // 4. Otherwise, return output.
      return codePointsToString(stream);
    }

    return serializeStream.call(this, output);
  };

  // 8.2 Interface TextEncoder

  /**
   * @constructor
   * @param {string=} label The label of the encoding. NONSTANDARD.
   * @param {Object=} options NONSTANDARD.
   */
  function TextEncoder(label, options) {
    // Web IDL conventions
    if (!(this instanceof TextEncoder))
      throw TypeError('Called as a function. Did you forget \'new\'?');
    options = ToDictionary(options);

    // A TextEncoder object has an associated encoding and encoder.

    /** @private */
    this._encoding = null;
    /** @private @type {?Encoder} */
    this._encoder = null;

    // Non-standard
    /** @private @type {boolean} */
    this._do_not_flush = false;
    /** @private @type {string} */
    this._fatal = Boolean(options['fatal']) ? 'fatal' : 'replacement';

    // 1. Let enc be a new TextEncoder object.
    var enc = this;

    // 2. Set enc's encoding to UTF-8's encoder.
    if (Boolean(options['NONSTANDARD_allowLegacyEncoding'])) {
      // NONSTANDARD behavior.
      label = label !== undefined ? String(label) : DEFAULT_ENCODING;
      var encoding = getEncoding(label);
      if (encoding === null || encoding.name === 'replacement')
        throw RangeError('Unknown encoding: ' + label);
      if (!encoders[encoding.name]) {
        throw Error('Encoder not present.' +
                    ' Did you forget to include encoding-indexes.js first?');
      }
      enc._encoding = encoding;
    } else {
      // Standard behavior.
      enc._encoding = getEncoding('utf-8');

      if (label !== undefined && 'console' in global) {
        console.warn('TextEncoder constructor called with encoding label, '
                     + 'which is ignored.');
      }
    }

    // For pre-ES5 runtimes:
    if (!Object.defineProperty)
      this.encoding = enc._encoding.name.toLowerCase();

    // 3. Return enc.
    return enc;
  }

  if (Object.defineProperty) {
    // The encoding attribute's getter must return encoding's name.
    Object.defineProperty(TextEncoder.prototype, 'encoding', {
      /** @this {TextEncoder} */
      get: function() { return this._encoding.name.toLowerCase(); }
    });
  }

  /**
   * @param {string=} opt_string The string to encode.
   * @param {Object=} options
   * @return {!Uint8Array} Encoded bytes, as a Uint8Array.
   */
  TextEncoder.prototype.encode = function encode(opt_string, options) {
    opt_string = opt_string === undefined ? '' : String(opt_string);
    options = ToDictionary(options);

    // NOTE: This option is nonstandard. None of the encodings
    // permitted for encoding (i.e. UTF-8, UTF-16) are stateful when
    // the input is a USVString so streaming is not necessary.
    if (!this._do_not_flush)
      this._encoder = encoders[this._encoding.name]({
        fatal: this._fatal === 'fatal'});
    this._do_not_flush = Boolean(options['stream']);

    // 1. Convert input to a stream.
    var input = new Stream(stringToCodePoints(opt_string));

    // 2. Let output be a new stream
    var output = [];

    /** @type {?(number|!Array.<number>)} */
    var result;
    // 3. While true, run these substeps:
    while (true) {
      // 1. Let token be the result of reading from input.
      var token = input.read();
      if (token === end_of_stream)
        break;
      // 2. Let result be the result of processing token for encoder,
      // input, output.
      result = this._encoder.handler(input, token);
      if (result === finished)
        break;
      if (Array.isArray(result))
        output.push.apply(output, /**@type {!Array.<number>}*/(result));
      else
        output.push(result);
    }
    // TODO: Align with spec algorithm.
    if (!this._do_not_flush) {
      while (true) {
        result = this._encoder.handler(input, input.read());
        if (result === finished)
          break;
        if (Array.isArray(result))
          output.push.apply(output, /**@type {!Array.<number>}*/(result));
        else
          output.push(result);
      }
      this._encoder = null;
    }
    // 3. If result is finished, convert output into a byte sequence,
    // and then return a Uint8Array object wrapping an ArrayBuffer
    // containing output.
    return new Uint8Array(output);
  };


  //
  // 9. The encoding
  //

  // 9.1 utf-8

  // 9.1.1 utf-8 decoder
  /**
   * @constructor
   * @implements {Decoder}
   * @param {{fatal: boolean}} options
   */
  function UTF8Decoder(options) {
    var fatal = options.fatal;

    // utf-8's decoder's has an associated utf-8 code point, utf-8
    // bytes seen, and utf-8 bytes needed (all initially 0), a utf-8
    // lower boundary (initially 0x80), and a utf-8 upper boundary
    // (initially 0xBF).
    var /** @type {number} */ utf8_code_point = 0,
        /** @type {number} */ utf8_bytes_seen = 0,
        /** @type {number} */ utf8_bytes_needed = 0,
        /** @type {number} */ utf8_lower_boundary = 0x80,
        /** @type {number} */ utf8_upper_boundary = 0xBF;

    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      // 1. If byte is end-of-stream and utf-8 bytes needed is not 0,
      // set utf-8 bytes needed to 0 and return error.
      if (bite === end_of_stream && utf8_bytes_needed !== 0) {
        utf8_bytes_needed = 0;
        return decoderError(fatal);
      }

      // 2. If byte is end-of-stream, return finished.
      if (bite === end_of_stream)
        return finished;

      // 3. If utf-8 bytes needed is 0, based on byte:
      if (utf8_bytes_needed === 0) {

        // 0x00 to 0x7F
        if (inRange(bite, 0x00, 0x7F)) {
          // Return a code point whose value is byte.
          return bite;
        }

        // 0xC2 to 0xDF
        else if (inRange(bite, 0xC2, 0xDF)) {
          // 1. Set utf-8 bytes needed to 1.
          utf8_bytes_needed = 1;

          // 2. Set UTF-8 code point to byte & 0x1F.
          utf8_code_point = bite & 0x1F;
        }

        // 0xE0 to 0xEF
        else if (inRange(bite, 0xE0, 0xEF)) {
          // 1. If byte is 0xE0, set utf-8 lower boundary to 0xA0.
          if (bite === 0xE0)
            utf8_lower_boundary = 0xA0;
          // 2. If byte is 0xED, set utf-8 upper boundary to 0x9F.
          if (bite === 0xED)
            utf8_upper_boundary = 0x9F;
          // 3. Set utf-8 bytes needed to 2.
          utf8_bytes_needed = 2;
          // 4. Set UTF-8 code point to byte & 0xF.
          utf8_code_point = bite & 0xF;
        }

        // 0xF0 to 0xF4
        else if (inRange(bite, 0xF0, 0xF4)) {
          // 1. If byte is 0xF0, set utf-8 lower boundary to 0x90.
          if (bite === 0xF0)
            utf8_lower_boundary = 0x90;
          // 2. If byte is 0xF4, set utf-8 upper boundary to 0x8F.
          if (bite === 0xF4)
            utf8_upper_boundary = 0x8F;
          // 3. Set utf-8 bytes needed to 3.
          utf8_bytes_needed = 3;
          // 4. Set UTF-8 code point to byte & 0x7.
          utf8_code_point = bite & 0x7;
        }

        // Otherwise
        else {
          // Return error.
          return decoderError(fatal);
        }

        // Return continue.
        return null;
      }

      // 4. If byte is not in the range utf-8 lower boundary to utf-8
      // upper boundary, inclusive, run these substeps:
      if (!inRange(bite, utf8_lower_boundary, utf8_upper_boundary)) {

        // 1. Set utf-8 code point, utf-8 bytes needed, and utf-8
        // bytes seen to 0, set utf-8 lower boundary to 0x80, and set
        // utf-8 upper boundary to 0xBF.
        utf8_code_point = utf8_bytes_needed = utf8_bytes_seen = 0;
        utf8_lower_boundary = 0x80;
        utf8_upper_boundary = 0xBF;

        // 2. Prepend byte to stream.
        stream.prepend(bite);

        // 3. Return error.
        return decoderError(fatal);
      }

      // 5. Set utf-8 lower boundary to 0x80 and utf-8 upper boundary
      // to 0xBF.
      utf8_lower_boundary = 0x80;
      utf8_upper_boundary = 0xBF;

      // 6. Set UTF-8 code point to (UTF-8 code point << 6) | (byte &
      // 0x3F)
      utf8_code_point = (utf8_code_point << 6) | (bite & 0x3F);

      // 7. Increase utf-8 bytes seen by one.
      utf8_bytes_seen += 1;

      // 8. If utf-8 bytes seen is not equal to utf-8 bytes needed,
      // continue.
      if (utf8_bytes_seen !== utf8_bytes_needed)
        return null;

      // 9. Let code point be utf-8 code point.
      var code_point = utf8_code_point;

      // 10. Set utf-8 code point, utf-8 bytes needed, and utf-8 bytes
      // seen to 0.
      utf8_code_point = utf8_bytes_needed = utf8_bytes_seen = 0;

      // 11. Return a code point whose value is code point.
      return code_point;
    };
  }

  // 9.1.2 utf-8 encoder
  /**
   * @constructor
   * @implements {Encoder}
   * @param {{fatal: boolean}} options
   */
  function UTF8Encoder(options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      // 1. If code point is end-of-stream, return finished.
      if (code_point === end_of_stream)
        return finished;

      // 2. If code point is an ASCII code point, return a byte whose
      // value is code point.
      if (isASCIICodePoint(code_point))
        return code_point;

      // 3. Set count and offset based on the range code point is in:
      var count, offset;
      // U+0080 to U+07FF, inclusive:
      if (inRange(code_point, 0x0080, 0x07FF)) {
        // 1 and 0xC0
        count = 1;
        offset = 0xC0;
      }
      // U+0800 to U+FFFF, inclusive:
      else if (inRange(code_point, 0x0800, 0xFFFF)) {
        // 2 and 0xE0
        count = 2;
        offset = 0xE0;
      }
      // U+10000 to U+10FFFF, inclusive:
      else if (inRange(code_point, 0x10000, 0x10FFFF)) {
        // 3 and 0xF0
        count = 3;
        offset = 0xF0;
      }

      // 4. Let bytes be a byte sequence whose first byte is (code
      // point >> (6 × count)) + offset.
      var bytes = [(code_point >> (6 * count)) + offset];

      // 5. Run these substeps while count is greater than 0:
      while (count > 0) {

        // 1. Set temp to code point >> (6 × (count − 1)).
        var temp = code_point >> (6 * (count - 1));

        // 2. Append to bytes 0x80 | (temp & 0x3F).
        bytes.push(0x80 | (temp & 0x3F));

        // 3. Decrease count by one.
        count -= 1;
      }

      // 6. Return bytes bytes, in order.
      return bytes;
    };
  }

  /** @param {{fatal: boolean}} options */
  encoders['UTF-8'] = function(options) {
    return new UTF8Encoder(options);
  };
  /** @param {{fatal: boolean}} options */
  decoders['UTF-8'] = function(options) {
    return new UTF8Decoder(options);
  };

  //
  // 10. Legacy single-byte encodings
  //

  // 10.1 single-byte decoder
  /**
   * @constructor
   * @implements {Decoder}
   * @param {!Array.<number>} index The encoding index.
   * @param {{fatal: boolean}} options
   */
  function SingleByteDecoder(index, options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      // 1. If byte is end-of-stream, return finished.
      if (bite === end_of_stream)
        return finished;

      // 2. If byte is an ASCII byte, return a code point whose value
      // is byte.
      if (isASCIIByte(bite))
        return bite;

      // 3. Let code point be the index code point for byte − 0x80 in
      // index single-byte.
      var code_point = index[bite - 0x80];

      // 4. If code point is null, return error.
      if (code_point === null)
        return decoderError(fatal);

      // 5. Return a code point whose value is code point.
      return code_point;
    };
  }

  // 10.2 single-byte encoder
  /**
   * @constructor
   * @implements {Encoder}
   * @param {!Array.<?number>} index The encoding index.
   * @param {{fatal: boolean}} options
   */
  function SingleByteEncoder(index, options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      // 1. If code point is end-of-stream, return finished.
      if (code_point === end_of_stream)
        return finished;

      // 2. If code point is an ASCII code point, return a byte whose
      // value is code point.
      if (isASCIICodePoint(code_point))
        return code_point;

      // 3. Let pointer be the index pointer for code point in index
      // single-byte.
      var pointer = indexPointerFor(code_point, index);

      // 4. If pointer is null, return error with code point.
      if (pointer === null)
        encoderError(code_point);

      // 5. Return a byte whose value is pointer + 0x80.
      return pointer + 0x80;
    };
  }

  (function() {
    if (!('encoding-indexes' in global))
      return;
    encodings.forEach(function(category) {
      if (category.heading !== 'Legacy single-byte encodings')
        return;
      category.encodings.forEach(function(encoding) {
        var name = encoding.name;
        var idx = index(name.toLowerCase());
        /** @param {{fatal: boolean}} options */
        decoders[name] = function(options) {
          return new SingleByteDecoder(idx, options);
        };
        /** @param {{fatal: boolean}} options */
        encoders[name] = function(options) {
          return new SingleByteEncoder(idx, options);
        };
      });
    });
  }());

  //
  // 11. Legacy multi-byte Chinese (simplified) encodings
  //

  // 11.1 gbk

  // 11.1.1 gbk decoder
  // gbk's decoder is gb18030's decoder.
  /** @param {{fatal: boolean}} options */
  decoders['GBK'] = function(options) {
    return new GB18030Decoder(options);
  };

  // 11.1.2 gbk encoder
  // gbk's encoder is gb18030's encoder with its gbk flag set.
  /** @param {{fatal: boolean}} options */
  encoders['GBK'] = function(options) {
    return new GB18030Encoder(options, true);
  };

  // 11.2 gb18030

  // 11.2.1 gb18030 decoder
  /**
   * @constructor
   * @implements {Decoder}
   * @param {{fatal: boolean}} options
   */
  function GB18030Decoder(options) {
    var fatal = options.fatal;
    // gb18030's decoder has an associated gb18030 first, gb18030
    // second, and gb18030 third (all initially 0x00).
    var /** @type {number} */ gb18030_first = 0x00,
        /** @type {number} */ gb18030_second = 0x00,
        /** @type {number} */ gb18030_third = 0x00;
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      // 1. If byte is end-of-stream and gb18030 first, gb18030
      // second, and gb18030 third are 0x00, return finished.
      if (bite === end_of_stream && gb18030_first === 0x00 &&
          gb18030_second === 0x00 && gb18030_third === 0x00) {
        return finished;
      }
      // 2. If byte is end-of-stream, and gb18030 first, gb18030
      // second, or gb18030 third is not 0x00, set gb18030 first,
      // gb18030 second, and gb18030 third to 0x00, and return error.
      if (bite === end_of_stream &&
          (gb18030_first !== 0x00 || gb18030_second !== 0x00 ||
           gb18030_third !== 0x00)) {
        gb18030_first = 0x00;
        gb18030_second = 0x00;
        gb18030_third = 0x00;
        decoderError(fatal);
      }
      var code_point;
      // 3. If gb18030 third is not 0x00, run these substeps:
      if (gb18030_third !== 0x00) {
        // 1. Let code point be null.
        code_point = null;
        // 2. If byte is in the range 0x30 to 0x39, inclusive, set
        // code point to the index gb18030 ranges code point for
        // (((gb18030 first − 0x81) × 10 + gb18030 second − 0x30) ×
        // 126 + gb18030 third − 0x81) × 10 + byte − 0x30.
        if (inRange(bite, 0x30, 0x39)) {
          code_point = indexGB18030RangesCodePointFor(
              (((gb18030_first - 0x81) * 10 + gb18030_second - 0x30) * 126 +
               gb18030_third - 0x81) * 10 + bite - 0x30);
        }

        // 3. Let buffer be a byte sequence consisting of gb18030
        // second, gb18030 third, and byte, in order.
        var buffer = [gb18030_second, gb18030_third, bite];

        // 4. Set gb18030 first, gb18030 second, and gb18030 third to
        // 0x00.
        gb18030_first = 0x00;
        gb18030_second = 0x00;
        gb18030_third = 0x00;

        // 5. If code point is null, prepend buffer to stream and
        // return error.
        if (code_point === null) {
          stream.prepend(buffer);
          return decoderError(fatal);
        }

        // 6. Return a code point whose value is code point.
        return code_point;
      }

      // 4. If gb18030 second is not 0x00, run these substeps:
      if (gb18030_second !== 0x00) {

        // 1. If byte is in the range 0x81 to 0xFE, inclusive, set
        // gb18030 third to byte and return continue.
        if (inRange(bite, 0x81, 0xFE)) {
          gb18030_third = bite;
          return null;
        }

        // 2. Prepend gb18030 second followed by byte to stream, set
        // gb18030 first and gb18030 second to 0x00, and return error.
        stream.prepend([gb18030_second, bite]);
        gb18030_first = 0x00;
        gb18030_second = 0x00;
        return decoderError(fatal);
      }

      // 5. If gb18030 first is not 0x00, run these substeps:
      if (gb18030_first !== 0x00) {

        // 1. If byte is in the range 0x30 to 0x39, inclusive, set
        // gb18030 second to byte and return continue.
        if (inRange(bite, 0x30, 0x39)) {
          gb18030_second = bite;
          return null;
        }

        // 2. Let lead be gb18030 first, let pointer be null, and set
        // gb18030 first to 0x00.
        var lead = gb18030_first;
        var pointer = null;
        gb18030_first = 0x00;

        // 3. Let offset be 0x40 if byte is less than 0x7F and 0x41
        // otherwise.
        var offset = bite < 0x7F ? 0x40 : 0x41;

        // 4. If byte is in the range 0x40 to 0x7E, inclusive, or 0x80
        // to 0xFE, inclusive, set pointer to (lead − 0x81) × 190 +
        // (byte − offset).
        if (inRange(bite, 0x40, 0x7E) || inRange(bite, 0x80, 0xFE))
          pointer = (lead - 0x81) * 190 + (bite - offset);

        // 5. Let code point be null if pointer is null and the index
        // code point for pointer in index gb18030 otherwise.
        code_point = pointer === null ? null :
            indexCodePointFor(pointer, index('gb18030'));

        // 6. If code point is null and byte is an ASCII byte, prepend
        // byte to stream.
        if (code_point === null && isASCIIByte(bite))
          stream.prepend(bite);

        // 7. If code point is null, return error.
        if (code_point === null)
          return decoderError(fatal);

        // 8. Return a code point whose value is code point.
        return code_point;
      }

      // 6. If byte is an ASCII byte, return a code point whose value
      // is byte.
      if (isASCIIByte(bite))
        return bite;

      // 7. If byte is 0x80, return code point U+20AC.
      if (bite === 0x80)
        return 0x20AC;

      // 8. If byte is in the range 0x81 to 0xFE, inclusive, set
      // gb18030 first to byte and return continue.
      if (inRange(bite, 0x81, 0xFE)) {
        gb18030_first = bite;
        return null;
      }

      // 9. Return error.
      return decoderError(fatal);
    };
  }

  // 11.2.2 gb18030 encoder
  /**
   * @constructor
   * @implements {Encoder}
   * @param {{fatal: boolean}} options
   * @param {boolean=} gbk_flag
   */
  function GB18030Encoder(options, gbk_flag) {
    var fatal = options.fatal;
    // gb18030's decoder has an associated gbk flag (initially unset).
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      // 1. If code point is end-of-stream, return finished.
      if (code_point === end_of_stream)
        return finished;

      // 2. If code point is an ASCII code point, return a byte whose
      // value is code point.
      if (isASCIICodePoint(code_point))
        return code_point;

      // 3. If code point is U+E5E5, return error with code point.
      if (code_point === 0xE5E5)
        return encoderError(code_point);

      // 4. If the gbk flag is set and code point is U+20AC, return
      // byte 0x80.
      if (gbk_flag && code_point === 0x20AC)
        return 0x80;

      // 5. Let pointer be the index pointer for code point in index
      // gb18030.
      var pointer = indexPointerFor(code_point, index('gb18030'));

      // 6. If pointer is not null, run these substeps:
      if (pointer !== null) {

        // 1. Let lead be floor(pointer / 190) + 0x81.
        var lead = floor(pointer / 190) + 0x81;

        // 2. Let trail be pointer % 190.
        var trail = pointer % 190;

        // 3. Let offset be 0x40 if trail is less than 0x3F and 0x41 otherwise.
        var offset = trail < 0x3F ? 0x40 : 0x41;

        // 4. Return two bytes whose values are lead and trail + offset.
        return [lead, trail + offset];
      }

      // 7. If gbk flag is set, return error with code point.
      if (gbk_flag)
        return encoderError(code_point);

      // 8. Set pointer to the index gb18030 ranges pointer for code
      // point.
      pointer = indexGB18030RangesPointerFor(code_point);

      // 9. Let byte1 be floor(pointer / 10 / 126 / 10).
      var byte1 = floor(pointer / 10 / 126 / 10);

      // 10. Set pointer to pointer − byte1 × 10 × 126 × 10.
      pointer = pointer - byte1 * 10 * 126 * 10;

      // 11. Let byte2 be floor(pointer / 10 / 126).
      var byte2 = floor(pointer / 10 / 126);

      // 12. Set pointer to pointer − byte2 × 10 × 126.
      pointer = pointer - byte2 * 10 * 126;

      // 13. Let byte3 be floor(pointer / 10).
      var byte3 = floor(pointer / 10);

      // 14. Let byte4 be pointer − byte3 × 10.
      var byte4 = pointer - byte3 * 10;

      // 15. Return four bytes whose values are byte1 + 0x81, byte2 +
      // 0x30, byte3 + 0x81, byte4 + 0x30.
      return [byte1 + 0x81,
              byte2 + 0x30,
              byte3 + 0x81,
              byte4 + 0x30];
    };
  }

  /** @param {{fatal: boolean}} options */
  encoders['gb18030'] = function(options) {
    return new GB18030Encoder(options);
  };
  /** @param {{fatal: boolean}} options */
  decoders['gb18030'] = function(options) {
    return new GB18030Decoder(options);
  };


  //
  // 12. Legacy multi-byte Chinese (traditional) encodings
  //

  // 12.1 Big5

  // 12.1.1 Big5 decoder
  /**
   * @constructor
   * @implements {Decoder}
   * @param {{fatal: boolean}} options
   */
  function Big5Decoder(options) {
    var fatal = options.fatal;
    // Big5's decoder has an associated Big5 lead (initially 0x00).
    var /** @type {number} */ Big5_lead = 0x00;

    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      // 1. If byte is end-of-stream and Big5 lead is not 0x00, set
      // Big5 lead to 0x00 and return error.
      if (bite === end_of_stream && Big5_lead !== 0x00) {
        Big5_lead = 0x00;
        return decoderError(fatal);
      }

      // 2. If byte is end-of-stream and Big5 lead is 0x00, return
      // finished.
      if (bite === end_of_stream && Big5_lead === 0x00)
        return finished;

      // 3. If Big5 lead is not 0x00, let lead be Big5 lead, let
      // pointer be null, set Big5 lead to 0x00, and then run these
      // substeps:
      if (Big5_lead !== 0x00) {
        var lead = Big5_lead;
        var pointer = null;
        Big5_lead = 0x00;

        // 1. Let offset be 0x40 if byte is less than 0x7F and 0x62
        // otherwise.
        var offset = bite < 0x7F ? 0x40 : 0x62;

        // 2. If byte is in the range 0x40 to 0x7E, inclusive, or 0xA1
        // to 0xFE, inclusive, set pointer to (lead − 0x81) × 157 +
        // (byte − offset).
        if (inRange(bite, 0x40, 0x7E) || inRange(bite, 0xA1, 0xFE))
          pointer = (lead - 0x81) * 157 + (bite - offset);

        // 3. If there is a row in the table below whose first column
        // is pointer, return the two code points listed in its second
        // column
        // Pointer | Code points
        // --------+--------------
        // 1133    | U+00CA U+0304
        // 1135    | U+00CA U+030C
        // 1164    | U+00EA U+0304
        // 1166    | U+00EA U+030C
        switch (pointer) {
          case 1133: return [0x00CA, 0x0304];
          case 1135: return [0x00CA, 0x030C];
          case 1164: return [0x00EA, 0x0304];
          case 1166: return [0x00EA, 0x030C];
        }

        // 4. Let code point be null if pointer is null and the index
        // code point for pointer in index Big5 otherwise.
        var code_point = (pointer === null) ? null :
            indexCodePointFor(pointer, index('big5'));

        // 5. If code point is null and byte is an ASCII byte, prepend
        // byte to stream.
        if (code_point === null && isASCIIByte(bite))
          stream.prepend(bite);

        // 6. If code point is null, return error.
        if (code_point === null)
          return decoderError(fatal);

        // 7. Return a code point whose value is code point.
        return code_point;
      }

      // 4. If byte is an ASCII byte, return a code point whose value
      // is byte.
      if (isASCIIByte(bite))
        return bite;

      // 5. If byte is in the range 0x81 to 0xFE, inclusive, set Big5
      // lead to byte and return continue.
      if (inRange(bite, 0x81, 0xFE)) {
        Big5_lead = bite;
        return null;
      }

      // 6. Return error.
      return decoderError(fatal);
    };
  }

  // 12.1.2 Big5 encoder
  /**
   * @constructor
   * @implements {Encoder}
   * @param {{fatal: boolean}} options
   */
  function Big5Encoder(options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      // 1. If code point is end-of-stream, return finished.
      if (code_point === end_of_stream)
        return finished;

      // 2. If code point is an ASCII code point, return a byte whose
      // value is code point.
      if (isASCIICodePoint(code_point))
        return code_point;

      // 3. Let pointer be the index Big5 pointer for code point.
      var pointer = indexBig5PointerFor(code_point);

      // 4. If pointer is null, return error with code point.
      if (pointer === null)
        return encoderError(code_point);

      // 5. Let lead be floor(pointer / 157) + 0x81.
      var lead = floor(pointer / 157) + 0x81;

      // 6. If lead is less than 0xA1, return error with code point.
      if (lead < 0xA1)
        return encoderError(code_point);

      // 7. Let trail be pointer % 157.
      var trail = pointer % 157;

      // 8. Let offset be 0x40 if trail is less than 0x3F and 0x62
      // otherwise.
      var offset = trail < 0x3F ? 0x40 : 0x62;

      // Return two bytes whose values are lead and trail + offset.
      return [lead, trail + offset];
    };
  }

  /** @param {{fatal: boolean}} options */
  encoders['Big5'] = function(options) {
    return new Big5Encoder(options);
  };
  /** @param {{fatal: boolean}} options */
  decoders['Big5'] = function(options) {
    return new Big5Decoder(options);
  };


  //
  // 13. Legacy multi-byte Japanese encodings
  //

  // 13.1 euc-jp

  // 13.1.1 euc-jp decoder
  /**
   * @constructor
   * @implements {Decoder}
   * @param {{fatal: boolean}} options
   */
  function EUCJPDecoder(options) {
    var fatal = options.fatal;

    // euc-jp's decoder has an associated euc-jp jis0212 flag
    // (initially unset) and euc-jp lead (initially 0x00).
    var /** @type {boolean} */ eucjp_jis0212_flag = false,
        /** @type {number} */ eucjp_lead = 0x00;

    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      // 1. If byte is end-of-stream and euc-jp lead is not 0x00, set
      // euc-jp lead to 0x00, and return error.
      if (bite === end_of_stream && eucjp_lead !== 0x00) {
        eucjp_lead = 0x00;
        return decoderError(fatal);
      }

      // 2. If byte is end-of-stream and euc-jp lead is 0x00, return
      // finished.
      if (bite === end_of_stream && eucjp_lead === 0x00)
        return finished;

      // 3. If euc-jp lead is 0x8E and byte is in the range 0xA1 to
      // 0xDF, inclusive, set euc-jp lead to 0x00 and return a code
      // point whose value is 0xFF61 − 0xA1 + byte.
      if (eucjp_lead === 0x8E && inRange(bite, 0xA1, 0xDF)) {
        eucjp_lead = 0x00;
        return 0xFF61 - 0xA1 + bite;
      }

      // 4. If euc-jp lead is 0x8F and byte is in the range 0xA1 to
      // 0xFE, inclusive, set the euc-jp jis0212 flag, set euc-jp lead
      // to byte, and return continue.
      if (eucjp_lead === 0x8F && inRange(bite, 0xA1, 0xFE)) {
        eucjp_jis0212_flag = true;
        eucjp_lead = bite;
        return null;
      }

      // 5. If euc-jp lead is not 0x00, let lead be euc-jp lead, set
      // euc-jp lead to 0x00, and run these substeps:
      if (eucjp_lead !== 0x00) {
        var lead = eucjp_lead;
        eucjp_lead = 0x00;

        // 1. Let code point be null.
        var code_point = null;

        // 2. If lead and byte are both in the range 0xA1 to 0xFE,
        // inclusive, set code point to the index code point for (lead
        // − 0xA1) × 94 + byte − 0xA1 in index jis0208 if the euc-jp
        // jis0212 flag is unset and in index jis0212 otherwise.
        if (inRange(lead, 0xA1, 0xFE) && inRange(bite, 0xA1, 0xFE)) {
          code_point = indexCodePointFor(
            (lead - 0xA1) * 94 + (bite - 0xA1),
            index(!eucjp_jis0212_flag ? 'jis0208' : 'jis0212'));
        }

        // 3. Unset the euc-jp jis0212 flag.
        eucjp_jis0212_flag = false;

        // 4. If byte is not in the range 0xA1 to 0xFE, inclusive,
        // prepend byte to stream.
        if (!inRange(bite, 0xA1, 0xFE))
          stream.prepend(bite);

        // 5. If code point is null, return error.
        if (code_point === null)
          return decoderError(fatal);

        // 6. Return a code point whose value is code point.
        return code_point;
      }

      // 6. If byte is an ASCII byte, return a code point whose value
      // is byte.
      if (isASCIIByte(bite))
        return bite;

      // 7. If byte is 0x8E, 0x8F, or in the range 0xA1 to 0xFE,
      // inclusive, set euc-jp lead to byte and return continue.
      if (bite === 0x8E || bite === 0x8F || inRange(bite, 0xA1, 0xFE)) {
        eucjp_lead = bite;
        return null;
      }

      // 8. Return error.
      return decoderError(fatal);
    };
  }

  // 13.1.2 euc-jp encoder
  /**
   * @constructor
   * @implements {Encoder}
   * @param {{fatal: boolean}} options
   */
  function EUCJPEncoder(options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      // 1. If code point is end-of-stream, return finished.
      if (code_point === end_of_stream)
        return finished;

      // 2. If code point is an ASCII code point, return a byte whose
      // value is code point.
      if (isASCIICodePoint(code_point))
        return code_point;

      // 3. If code point is U+00A5, return byte 0x5C.
      if (code_point === 0x00A5)
        return 0x5C;

      // 4. If code point is U+203E, return byte 0x7E.
      if (code_point === 0x203E)
        return 0x7E;

      // 5. If code point is in the range U+FF61 to U+FF9F, inclusive,
      // return two bytes whose values are 0x8E and code point −
      // 0xFF61 + 0xA1.
      if (inRange(code_point, 0xFF61, 0xFF9F))
        return [0x8E, code_point - 0xFF61 + 0xA1];

      // 6. If code point is U+2212, set it to U+FF0D.
      if (code_point === 0x2212)
        code_point = 0xFF0D;

      // 7. Let pointer be the index pointer for code point in index
      // jis0208.
      var pointer = indexPointerFor(code_point, index('jis0208'));

      // 8. If pointer is null, return error with code point.
      if (pointer === null)
        return encoderError(code_point);

      // 9. Let lead be floor(pointer / 94) + 0xA1.
      var lead = floor(pointer / 94) + 0xA1;

      // 10. Let trail be pointer % 94 + 0xA1.
      var trail = pointer % 94 + 0xA1;

      // 11. Return two bytes whose values are lead and trail.
      return [lead, trail];
    };
  }

  /** @param {{fatal: boolean}} options */
  encoders['EUC-JP'] = function(options) {
    return new EUCJPEncoder(options);
  };
  /** @param {{fatal: boolean}} options */
  decoders['EUC-JP'] = function(options) {
    return new EUCJPDecoder(options);
  };

  // 13.2 iso-2022-jp

  // 13.2.1 iso-2022-jp decoder
  /**
   * @constructor
   * @implements {Decoder}
   * @param {{fatal: boolean}} options
   */
  function ISO2022JPDecoder(options) {
    var fatal = options.fatal;
    /** @enum */
    var states = {
      ASCII: 0,
      Roman: 1,
      Katakana: 2,
      LeadByte: 3,
      TrailByte: 4,
      EscapeStart: 5,
      Escape: 6
    };
    // iso-2022-jp's decoder has an associated iso-2022-jp decoder
    // state (initially ASCII), iso-2022-jp decoder output state
    // (initially ASCII), iso-2022-jp lead (initially 0x00), and
    // iso-2022-jp output flag (initially unset).
    var /** @type {number} */ iso2022jp_decoder_state = states.ASCII,
        /** @type {number} */ iso2022jp_decoder_output_state = states.ASCII,
        /** @type {number} */ iso2022jp_lead = 0x00,
        /** @type {boolean} */ iso2022jp_output_flag = false;
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      // switching on iso-2022-jp decoder state:
      switch (iso2022jp_decoder_state) {
      default:
      case states.ASCII:
        // ASCII
        // Based on byte:

        // 0x1B
        if (bite === 0x1B) {
          // Set iso-2022-jp decoder state to escape start and return
          // continue.
          iso2022jp_decoder_state = states.EscapeStart;
          return null;
        }

        // 0x00 to 0x7F, excluding 0x0E, 0x0F, and 0x1B
        if (inRange(bite, 0x00, 0x7F) && bite !== 0x0E
            && bite !== 0x0F && bite !== 0x1B) {
          // Unset the iso-2022-jp output flag and return a code point
          // whose value is byte.
          iso2022jp_output_flag = false;
          return bite;
        }

        // end-of-stream
        if (bite === end_of_stream) {
          // Return finished.
          return finished;
        }

        // Otherwise
        // Unset the iso-2022-jp output flag and return error.
        iso2022jp_output_flag = false;
        return decoderError(fatal);

      case states.Roman:
        // Roman
        // Based on byte:

        // 0x1B
        if (bite === 0x1B) {
          // Set iso-2022-jp decoder state to escape start and return
          // continue.
          iso2022jp_decoder_state = states.EscapeStart;
          return null;
        }

        // 0x5C
        if (bite === 0x5C) {
          // Unset the iso-2022-jp output flag and return code point
          // U+00A5.
          iso2022jp_output_flag = false;
          return 0x00A5;
        }

        // 0x7E
        if (bite === 0x7E) {
          // Unset the iso-2022-jp output flag and return code point
          // U+203E.
          iso2022jp_output_flag = false;
          return 0x203E;
        }

        // 0x00 to 0x7F, excluding 0x0E, 0x0F, 0x1B, 0x5C, and 0x7E
        if (inRange(bite, 0x00, 0x7F) && bite !== 0x0E && bite !== 0x0F
            && bite !== 0x1B && bite !== 0x5C && bite !== 0x7E) {
          // Unset the iso-2022-jp output flag and return a code point
          // whose value is byte.
          iso2022jp_output_flag = false;
          return bite;
        }

        // end-of-stream
        if (bite === end_of_stream) {
          // Return finished.
          return finished;
        }

        // Otherwise
        // Unset the iso-2022-jp output flag and return error.
        iso2022jp_output_flag = false;
        return decoderError(fatal);

      case states.Katakana:
        // Katakana
        // Based on byte:

        // 0x1B
        if (bite === 0x1B) {
          // Set iso-2022-jp decoder state to escape start and return
          // continue.
          iso2022jp_decoder_state = states.EscapeStart;
          return null;
        }

        // 0x21 to 0x5F
        if (inRange(bite, 0x21, 0x5F)) {
          // Unset the iso-2022-jp output flag and return a code point
          // whose value is 0xFF61 − 0x21 + byte.
          iso2022jp_output_flag = false;
          return 0xFF61 - 0x21 + bite;
        }

        // end-of-stream
        if (bite === end_of_stream) {
          // Return finished.
          return finished;
        }

        // Otherwise
        // Unset the iso-2022-jp output flag and return error.
        iso2022jp_output_flag = false;
        return decoderError(fatal);

      case states.LeadByte:
        // Lead byte
        // Based on byte:

        // 0x1B
        if (bite === 0x1B) {
          // Set iso-2022-jp decoder state to escape start and return
          // continue.
          iso2022jp_decoder_state = states.EscapeStart;
          return null;
        }

        // 0x21 to 0x7E
        if (inRange(bite, 0x21, 0x7E)) {
          // Unset the iso-2022-jp output flag, set iso-2022-jp lead
          // to byte, iso-2022-jp decoder state to trail byte, and
          // return continue.
          iso2022jp_output_flag = false;
          iso2022jp_lead = bite;
          iso2022jp_decoder_state = states.TrailByte;
          return null;
        }

        // end-of-stream
        if (bite === end_of_stream) {
          // Return finished.
          return finished;
        }

        // Otherwise
        // Unset the iso-2022-jp output flag and return error.
        iso2022jp_output_flag = false;
        return decoderError(fatal);

      case states.TrailByte:
        // Trail byte
        // Based on byte:

        // 0x1B
        if (bite === 0x1B) {
          // Set iso-2022-jp decoder state to escape start and return
          // continue.
          iso2022jp_decoder_state = states.EscapeStart;
          return decoderError(fatal);
        }

        // 0x21 to 0x7E
        if (inRange(bite, 0x21, 0x7E)) {
          // 1. Set the iso-2022-jp decoder state to lead byte.
          iso2022jp_decoder_state = states.LeadByte;

          // 2. Let pointer be (iso-2022-jp lead − 0x21) × 94 + byte − 0x21.
          var pointer = (iso2022jp_lead - 0x21) * 94 + bite - 0x21;

          // 3. Let code point be the index code point for pointer in
          // index jis0208.
          var code_point = indexCodePointFor(pointer, index('jis0208'));

          // 4. If code point is null, return error.
          if (code_point === null)
            return decoderError(fatal);

          // 5. Return a code point whose value is code point.
          return code_point;
        }

        // end-of-stream
        if (bite === end_of_stream) {
          // Set the iso-2022-jp decoder state to lead byte, prepend
          // byte to stream, and return error.
          iso2022jp_decoder_state = states.LeadByte;
          stream.prepend(bite);
          return decoderError(fatal);
        }

        // Otherwise
        // Set iso-2022-jp decoder state to lead byte and return
        // error.
        iso2022jp_decoder_state = states.LeadByte;
        return decoderError(fatal);

      case states.EscapeStart:
        // Escape start

        // 1. If byte is either 0x24 or 0x28, set iso-2022-jp lead to
        // byte, iso-2022-jp decoder state to escape, and return
        // continue.
        if (bite === 0x24 || bite === 0x28) {
          iso2022jp_lead = bite;
          iso2022jp_decoder_state = states.Escape;
          return null;
        }

        // 2. Prepend byte to stream.
        stream.prepend(bite);

        // 3. Unset the iso-2022-jp output flag, set iso-2022-jp
        // decoder state to iso-2022-jp decoder output state, and
        // return error.
        iso2022jp_output_flag = false;
        iso2022jp_decoder_state = iso2022jp_decoder_output_state;
        return decoderError(fatal);

      case states.Escape:
        // Escape

        // 1. Let lead be iso-2022-jp lead and set iso-2022-jp lead to
        // 0x00.
        var lead = iso2022jp_lead;
        iso2022jp_lead = 0x00;

        // 2. Let state be null.
        var state = null;

        // 3. If lead is 0x28 and byte is 0x42, set state to ASCII.
        if (lead === 0x28 && bite === 0x42)
          state = states.ASCII;

        // 4. If lead is 0x28 and byte is 0x4A, set state to Roman.
        if (lead === 0x28 && bite === 0x4A)
          state = states.Roman;

        // 5. If lead is 0x28 and byte is 0x49, set state to Katakana.
        if (lead === 0x28 && bite === 0x49)
          state = states.Katakana;

        // 6. If lead is 0x24 and byte is either 0x40 or 0x42, set
        // state to lead byte.
        if (lead === 0x24 && (bite === 0x40 || bite === 0x42))
          state = states.LeadByte;

        // 7. If state is non-null, run these substeps:
        if (state !== null) {
          // 1. Set iso-2022-jp decoder state and iso-2022-jp decoder
          // output state to states.
          iso2022jp_decoder_state = iso2022jp_decoder_state = state;

          // 2. Let output flag be the iso-2022-jp output flag.
          var output_flag = iso2022jp_output_flag;

          // 3. Set the iso-2022-jp output flag.
          iso2022jp_output_flag = true;

          // 4. Return continue, if output flag is unset, and error
          // otherwise.
          return !output_flag ? null : decoderError(fatal);
        }

        // 8. Prepend lead and byte to stream.
        stream.prepend([lead, bite]);

        // 9. Unset the iso-2022-jp output flag, set iso-2022-jp
        // decoder state to iso-2022-jp decoder output state and
        // return error.
        iso2022jp_output_flag = false;
        iso2022jp_decoder_state = iso2022jp_decoder_output_state;
        return decoderError(fatal);
      }
    };
  }

  // 13.2.2 iso-2022-jp encoder
  /**
   * @constructor
   * @implements {Encoder}
   * @param {{fatal: boolean}} options
   */
  function ISO2022JPEncoder(options) {
    var fatal = options.fatal;
    // iso-2022-jp's encoder has an associated iso-2022-jp encoder
    // state which is one of ASCII, Roman, and jis0208 (initially
    // ASCII).
    /** @enum */
    var states = {
      ASCII: 0,
      Roman: 1,
      jis0208: 2
    };
    var /** @type {number} */ iso2022jp_state = states.ASCII;
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      // 1. If code point is end-of-stream and iso-2022-jp encoder
      // state is not ASCII, prepend code point to stream, set
      // iso-2022-jp encoder state to ASCII, and return three bytes
      // 0x1B 0x28 0x42.
      if (code_point === end_of_stream &&
          iso2022jp_state !== states.ASCII) {
        stream.prepend(code_point);
        iso2022jp_state = states.ASCII;
        return [0x1B, 0x28, 0x42];
      }

      // 2. If code point is end-of-stream and iso-2022-jp encoder
      // state is ASCII, return finished.
      if (code_point === end_of_stream && iso2022jp_state === states.ASCII)
        return finished;

      // 3. If ISO-2022-JP encoder state is ASCII or Roman, and code
      // point is U+000E, U+000F, or U+001B, return error with U+FFFD.
      if ((iso2022jp_state === states.ASCII ||
           iso2022jp_state === states.Roman) &&
          (code_point === 0x000E || code_point === 0x000F ||
           code_point === 0x001B)) {
        return encoderError(0xFFFD);
      }

      // 4. If iso-2022-jp encoder state is ASCII and code point is an
      // ASCII code point, return a byte whose value is code point.
      if (iso2022jp_state === states.ASCII &&
          isASCIICodePoint(code_point))
        return code_point;

      // 5. If iso-2022-jp encoder state is Roman and code point is an
      // ASCII code point, excluding U+005C and U+007E, or is U+00A5
      // or U+203E, run these substeps:
      if (iso2022jp_state === states.Roman &&
          ((isASCIICodePoint(code_point) &&
           code_point !== 0x005C && code_point !== 0x007E) ||
          (code_point == 0x00A5 || code_point == 0x203E))) {

        // 1. If code point is an ASCII code point, return a byte
        // whose value is code point.
        if (isASCIICodePoint(code_point))
          return code_point;

        // 2. If code point is U+00A5, return byte 0x5C.
        if (code_point === 0x00A5)
          return 0x5C;

        // 3. If code point is U+203E, return byte 0x7E.
        if (code_point === 0x203E)
          return 0x7E;
      }

      // 6. If code point is an ASCII code point, and iso-2022-jp
      // encoder state is not ASCII, prepend code point to stream, set
      // iso-2022-jp encoder state to ASCII, and return three bytes
      // 0x1B 0x28 0x42.
      if (isASCIICodePoint(code_point) &&
          iso2022jp_state !== states.ASCII) {
        stream.prepend(code_point);
        iso2022jp_state = states.ASCII;
        return [0x1B, 0x28, 0x42];
      }

      // 7. If code point is either U+00A5 or U+203E, and iso-2022-jp
      // encoder state is not Roman, prepend code point to stream, set
      // iso-2022-jp encoder state to Roman, and return three bytes
      // 0x1B 0x28 0x4A.
      if ((code_point === 0x00A5 || code_point === 0x203E) &&
          iso2022jp_state !== states.Roman) {
        stream.prepend(code_point);
        iso2022jp_state = states.Roman;
        return [0x1B, 0x28, 0x4A];
      }

      // 8. If code point is U+2212, set it to U+FF0D.
      if (code_point === 0x2212)
        code_point = 0xFF0D;

      // 9. Let pointer be the index pointer for code point in index
      // jis0208.
      var pointer = indexPointerFor(code_point, index('jis0208'));

      // 10. If pointer is null, return error with code point.
      if (pointer === null)
        return encoderError(code_point);

      // 11. If iso-2022-jp encoder state is not jis0208, prepend code
      // point to stream, set iso-2022-jp encoder state to jis0208,
      // and return three bytes 0x1B 0x24 0x42.
      if (iso2022jp_state !== states.jis0208) {
        stream.prepend(code_point);
        iso2022jp_state = states.jis0208;
        return [0x1B, 0x24, 0x42];
      }

      // 12. Let lead be floor(pointer / 94) + 0x21.
      var lead = floor(pointer / 94) + 0x21;

      // 13. Let trail be pointer % 94 + 0x21.
      var trail = pointer % 94 + 0x21;

      // 14. Return two bytes whose values are lead and trail.
      return [lead, trail];
    };
  }

  /** @param {{fatal: boolean}} options */
  encoders['ISO-2022-JP'] = function(options) {
    return new ISO2022JPEncoder(options);
  };
  /** @param {{fatal: boolean}} options */
  decoders['ISO-2022-JP'] = function(options) {
    return new ISO2022JPDecoder(options);
  };

  // 13.3 Shift_JIS

  // 13.3.1 Shift_JIS decoder
  /**
   * @constructor
   * @implements {Decoder}
   * @param {{fatal: boolean}} options
   */
  function ShiftJISDecoder(options) {
    var fatal = options.fatal;
    // Shift_JIS's decoder has an associated Shift_JIS lead (initially
    // 0x00).
    var /** @type {number} */ Shift_JIS_lead = 0x00;
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      // 1. If byte is end-of-stream and Shift_JIS lead is not 0x00,
      // set Shift_JIS lead to 0x00 and return error.
      if (bite === end_of_stream && Shift_JIS_lead !== 0x00) {
        Shift_JIS_lead = 0x00;
        return decoderError(fatal);
      }

      // 2. If byte is end-of-stream and Shift_JIS lead is 0x00,
      // return finished.
      if (bite === end_of_stream && Shift_JIS_lead === 0x00)
        return finished;

      // 3. If Shift_JIS lead is not 0x00, let lead be Shift_JIS lead,
      // let pointer be null, set Shift_JIS lead to 0x00, and then run
      // these substeps:
      if (Shift_JIS_lead !== 0x00) {
        var lead = Shift_JIS_lead;
        var pointer = null;
        Shift_JIS_lead = 0x00;

        // 1. Let offset be 0x40, if byte is less than 0x7F, and 0x41
        // otherwise.
        var offset = (bite < 0x7F) ? 0x40 : 0x41;

        // 2. Let lead offset be 0x81, if lead is less than 0xA0, and
        // 0xC1 otherwise.
        var lead_offset = (lead < 0xA0) ? 0x81 : 0xC1;

        // 3. If byte is in the range 0x40 to 0x7E, inclusive, or 0x80
        // to 0xFC, inclusive, set pointer to (lead − lead offset) ×
        // 188 + byte − offset.
        if (inRange(bite, 0x40, 0x7E) || inRange(bite, 0x80, 0xFC))
          pointer = (lead - lead_offset) * 188 + bite - offset;

        // 4. If pointer is in the range 8836 to 10715, inclusive,
        // return a code point whose value is 0xE000 − 8836 + pointer.
        if (inRange(pointer, 8836, 10715))
          return 0xE000 - 8836 + pointer;

        // 5. Let code point be null, if pointer is null, and the
        // index code point for pointer in index jis0208 otherwise.
        var code_point = (pointer === null) ? null :
              indexCodePointFor(pointer, index('jis0208'));

        // 6. If code point is null and byte is an ASCII byte, prepend
        // byte to stream.
        if (code_point === null && isASCIIByte(bite))
          stream.prepend(bite);

        // 7. If code point is null, return error.
        if (code_point === null)
          return decoderError(fatal);

        // 8. Return a code point whose value is code point.
        return code_point;
      }

      // 4. If byte is an ASCII byte or 0x80, return a code point
      // whose value is byte.
      if (isASCIIByte(bite) || bite === 0x80)
        return bite;

      // 5. If byte is in the range 0xA1 to 0xDF, inclusive, return a
      // code point whose value is 0xFF61 − 0xA1 + byte.
      if (inRange(bite, 0xA1, 0xDF))
        return 0xFF61 - 0xA1 + bite;

      // 6. If byte is in the range 0x81 to 0x9F, inclusive, or 0xE0
      // to 0xFC, inclusive, set Shift_JIS lead to byte and return
      // continue.
      if (inRange(bite, 0x81, 0x9F) || inRange(bite, 0xE0, 0xFC)) {
        Shift_JIS_lead = bite;
        return null;
      }

      // 7. Return error.
      return decoderError(fatal);
    };
  }

  // 13.3.2 Shift_JIS encoder
  /**
   * @constructor
   * @implements {Encoder}
   * @param {{fatal: boolean}} options
   */
  function ShiftJISEncoder(options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      // 1. If code point is end-of-stream, return finished.
      if (code_point === end_of_stream)
        return finished;

      // 2. If code point is an ASCII code point or U+0080, return a
      // byte whose value is code point.
      if (isASCIICodePoint(code_point) || code_point === 0x0080)
        return code_point;

      // 3. If code point is U+00A5, return byte 0x5C.
      if (code_point === 0x00A5)
        return 0x5C;

      // 4. If code point is U+203E, return byte 0x7E.
      if (code_point === 0x203E)
        return 0x7E;

      // 5. If code point is in the range U+FF61 to U+FF9F, inclusive,
      // return a byte whose value is code point − 0xFF61 + 0xA1.
      if (inRange(code_point, 0xFF61, 0xFF9F))
        return code_point - 0xFF61 + 0xA1;

      // 6. If code point is U+2212, set it to U+FF0D.
      if (code_point === 0x2212)
        code_point = 0xFF0D;

      // 7. Let pointer be the index Shift_JIS pointer for code point.
      var pointer = indexShiftJISPointerFor(code_point);

      // 8. If pointer is null, return error with code point.
      if (pointer === null)
        return encoderError(code_point);

      // 9. Let lead be floor(pointer / 188).
      var lead = floor(pointer / 188);

      // 10. Let lead offset be 0x81, if lead is less than 0x1F, and
      // 0xC1 otherwise.
      var lead_offset = (lead < 0x1F) ? 0x81 : 0xC1;

      // 11. Let trail be pointer % 188.
      var trail = pointer % 188;

      // 12. Let offset be 0x40, if trail is less than 0x3F, and 0x41
      // otherwise.
      var offset = (trail < 0x3F) ? 0x40 : 0x41;

      // 13. Return two bytes whose values are lead + lead offset and
      // trail + offset.
      return [lead + lead_offset, trail + offset];
    };
  }

  /** @param {{fatal: boolean}} options */
  encoders['Shift_JIS'] = function(options) {
    return new ShiftJISEncoder(options);
  };
  /** @param {{fatal: boolean}} options */
  decoders['Shift_JIS'] = function(options) {
    return new ShiftJISDecoder(options);
  };

  //
  // 14. Legacy multi-byte Korean encodings
  //

  // 14.1 euc-kr

  // 14.1.1 euc-kr decoder
  /**
   * @constructor
   * @implements {Decoder}
   * @param {{fatal: boolean}} options
   */
  function EUCKRDecoder(options) {
    var fatal = options.fatal;

    // euc-kr's decoder has an associated euc-kr lead (initially 0x00).
    var /** @type {number} */ euckr_lead = 0x00;
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      // 1. If byte is end-of-stream and euc-kr lead is not 0x00, set
      // euc-kr lead to 0x00 and return error.
      if (bite === end_of_stream && euckr_lead !== 0) {
        euckr_lead = 0x00;
        return decoderError(fatal);
      }

      // 2. If byte is end-of-stream and euc-kr lead is 0x00, return
      // finished.
      if (bite === end_of_stream && euckr_lead === 0)
        return finished;

      // 3. If euc-kr lead is not 0x00, let lead be euc-kr lead, let
      // pointer be null, set euc-kr lead to 0x00, and then run these
      // substeps:
      if (euckr_lead !== 0x00) {
        var lead = euckr_lead;
        var pointer = null;
        euckr_lead = 0x00;

        // 1. If byte is in the range 0x41 to 0xFE, inclusive, set
        // pointer to (lead − 0x81) × 190 + (byte − 0x41).
        if (inRange(bite, 0x41, 0xFE))
          pointer = (lead - 0x81) * 190 + (bite - 0x41);

        // 2. Let code point be null, if pointer is null, and the
        // index code point for pointer in index euc-kr otherwise.
        var code_point = (pointer === null)
              ? null : indexCodePointFor(pointer, index('euc-kr'));

        // 3. If code point is null and byte is an ASCII byte, prepend
        // byte to stream.
        if (pointer === null && isASCIIByte(bite))
          stream.prepend(bite);

        // 4. If code point is null, return error.
        if (code_point === null)
          return decoderError(fatal);

        // 5. Return a code point whose value is code point.
        return code_point;
      }

      // 4. If byte is an ASCII byte, return a code point whose value
      // is byte.
      if (isASCIIByte(bite))
        return bite;

      // 5. If byte is in the range 0x81 to 0xFE, inclusive, set
      // euc-kr lead to byte and return continue.
      if (inRange(bite, 0x81, 0xFE)) {
        euckr_lead = bite;
        return null;
      }

      // 6. Return error.
      return decoderError(fatal);
    };
  }

  // 14.1.2 euc-kr encoder
  /**
   * @constructor
   * @implements {Encoder}
   * @param {{fatal: boolean}} options
   */
  function EUCKREncoder(options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      // 1. If code point is end-of-stream, return finished.
      if (code_point === end_of_stream)
        return finished;

      // 2. If code point is an ASCII code point, return a byte whose
      // value is code point.
      if (isASCIICodePoint(code_point))
        return code_point;

      // 3. Let pointer be the index pointer for code point in index
      // euc-kr.
      var pointer = indexPointerFor(code_point, index('euc-kr'));

      // 4. If pointer is null, return error with code point.
      if (pointer === null)
        return encoderError(code_point);

      // 5. Let lead be floor(pointer / 190) + 0x81.
      var lead = floor(pointer / 190) + 0x81;

      // 6. Let trail be pointer % 190 + 0x41.
      var trail = (pointer % 190) + 0x41;

      // 7. Return two bytes whose values are lead and trail.
      return [lead, trail];
    };
  }

  /** @param {{fatal: boolean}} options */
  encoders['EUC-KR'] = function(options) {
    return new EUCKREncoder(options);
  };
  /** @param {{fatal: boolean}} options */
  decoders['EUC-KR'] = function(options) {
    return new EUCKRDecoder(options);
  };


  //
  // 15. Legacy miscellaneous encodings
  //

  // 15.1 replacement

  // Not needed - API throws RangeError

  // 15.2 Common infrastructure for utf-16be and utf-16le

  /**
   * @param {number} code_unit
   * @param {boolean} utf16be
   * @return {!Array.<number>} bytes
   */
  function convertCodeUnitToBytes(code_unit, utf16be) {
    // 1. Let byte1 be code unit >> 8.
    var byte1 = code_unit >> 8;

    // 2. Let byte2 be code unit & 0x00FF.
    var byte2 = code_unit & 0x00FF;

    // 3. Then return the bytes in order:
        // utf-16be flag is set: byte1, then byte2.
    if (utf16be)
      return [byte1, byte2];
    // utf-16be flag is unset: byte2, then byte1.
    return [byte2, byte1];
  }

  // 15.2.1 shared utf-16 decoder
  /**
   * @constructor
   * @implements {Decoder}
   * @param {boolean} utf16_be True if big-endian, false if little-endian.
   * @param {{fatal: boolean}} options
   */
  function UTF16Decoder(utf16_be, options) {
    var fatal = options.fatal;
    var /** @type {?number} */ utf16_lead_byte = null,
        /** @type {?number} */ utf16_lead_surrogate = null;
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      // 1. If byte is end-of-stream and either utf-16 lead byte or
      // utf-16 lead surrogate is not null, set utf-16 lead byte and
      // utf-16 lead surrogate to null, and return error.
      if (bite === end_of_stream && (utf16_lead_byte !== null ||
                                utf16_lead_surrogate !== null)) {
        return decoderError(fatal);
      }

      // 2. If byte is end-of-stream and utf-16 lead byte and utf-16
      // lead surrogate are null, return finished.
      if (bite === end_of_stream && utf16_lead_byte === null &&
          utf16_lead_surrogate === null) {
        return finished;
      }

      // 3. If utf-16 lead byte is null, set utf-16 lead byte to byte
      // and return continue.
      if (utf16_lead_byte === null) {
        utf16_lead_byte = bite;
        return null;
      }

      // 4. Let code unit be the result of:
      var code_unit;
      if (utf16_be) {
        // utf-16be decoder flag is set
        //   (utf-16 lead byte << 8) + byte.
        code_unit = (utf16_lead_byte << 8) + bite;
      } else {
        // utf-16be decoder flag is unset
        //   (byte << 8) + utf-16 lead byte.
        code_unit = (bite << 8) + utf16_lead_byte;
      }
      // Then set utf-16 lead byte to null.
      utf16_lead_byte = null;

      // 5. If utf-16 lead surrogate is not null, let lead surrogate
      // be utf-16 lead surrogate, set utf-16 lead surrogate to null,
      // and then run these substeps:
      if (utf16_lead_surrogate !== null) {
        var lead_surrogate = utf16_lead_surrogate;
        utf16_lead_surrogate = null;

        // 1. If code unit is in the range U+DC00 to U+DFFF,
        // inclusive, return a code point whose value is 0x10000 +
        // ((lead surrogate − 0xD800) << 10) + (code unit − 0xDC00).
        if (inRange(code_unit, 0xDC00, 0xDFFF)) {
          return 0x10000 + (lead_surrogate - 0xD800) * 0x400 +
              (code_unit - 0xDC00);
        }

        // 2. Prepend the sequence resulting of converting code unit
        // to bytes using utf-16be decoder flag to stream and return
        // error.
        stream.prepend(convertCodeUnitToBytes(code_unit, utf16_be));
        return decoderError(fatal);
      }

      // 6. If code unit is in the range U+D800 to U+DBFF, inclusive,
      // set utf-16 lead surrogate to code unit and return continue.
      if (inRange(code_unit, 0xD800, 0xDBFF)) {
        utf16_lead_surrogate = code_unit;
        return null;
      }

      // 7. If code unit is in the range U+DC00 to U+DFFF, inclusive,
      // return error.
      if (inRange(code_unit, 0xDC00, 0xDFFF))
        return decoderError(fatal);

      // 8. Return code point code unit.
      return code_unit;
    };
  }

  // 15.2.2 shared utf-16 encoder
  /**
   * @constructor
   * @implements {Encoder}
   * @param {boolean} utf16_be True if big-endian, false if little-endian.
   * @param {{fatal: boolean}} options
   */
  function UTF16Encoder(utf16_be, options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      // 1. If code point is end-of-stream, return finished.
      if (code_point === end_of_stream)
        return finished;

      // 2. If code point is in the range U+0000 to U+FFFF, inclusive,
      // return the sequence resulting of converting code point to
      // bytes using utf-16be encoder flag.
      if (inRange(code_point, 0x0000, 0xFFFF))
        return convertCodeUnitToBytes(code_point, utf16_be);

      // 3. Let lead be ((code point − 0x10000) >> 10) + 0xD800,
      // converted to bytes using utf-16be encoder flag.
      var lead = convertCodeUnitToBytes(
        ((code_point - 0x10000) >> 10) + 0xD800, utf16_be);

      // 4. Let trail be ((code point − 0x10000) & 0x3FF) + 0xDC00,
      // converted to bytes using utf-16be encoder flag.
      var trail = convertCodeUnitToBytes(
        ((code_point - 0x10000) & 0x3FF) + 0xDC00, utf16_be);

      // 5. Return a byte sequence of lead followed by trail.
      return lead.concat(trail);
    };
  }

  // 15.3 utf-16be
  // 15.3.1 utf-16be decoder
  /** @param {{fatal: boolean}} options */
  encoders['UTF-16BE'] = function(options) {
    return new UTF16Encoder(true, options);
  };
  // 15.3.2 utf-16be encoder
  /** @param {{fatal: boolean}} options */
  decoders['UTF-16BE'] = function(options) {
    return new UTF16Decoder(true, options);
  };

  // 15.4 utf-16le
  // 15.4.1 utf-16le decoder
  /** @param {{fatal: boolean}} options */
  encoders['UTF-16LE'] = function(options) {
    return new UTF16Encoder(false, options);
  };
  // 15.4.2 utf-16le encoder
  /** @param {{fatal: boolean}} options */
  decoders['UTF-16LE'] = function(options) {
    return new UTF16Decoder(false, options);
  };

  // 15.5 x-user-defined

  // 15.5.1 x-user-defined decoder
  /**
   * @constructor
   * @implements {Decoder}
   * @param {{fatal: boolean}} options
   */
  function XUserDefinedDecoder(options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      // 1. If byte is end-of-stream, return finished.
      if (bite === end_of_stream)
        return finished;

      // 2. If byte is an ASCII byte, return a code point whose value
      // is byte.
      if (isASCIIByte(bite))
        return bite;

      // 3. Return a code point whose value is 0xF780 + byte − 0x80.
      return 0xF780 + bite - 0x80;
    };
  }

  // 15.5.2 x-user-defined encoder
  /**
   * @constructor
   * @implements {Encoder}
   * @param {{fatal: boolean}} options
   */
  function XUserDefinedEncoder(options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      // 1.If code point is end-of-stream, return finished.
      if (code_point === end_of_stream)
        return finished;

      // 2. If code point is an ASCII code point, return a byte whose
      // value is code point.
      if (isASCIICodePoint(code_point))
        return code_point;

      // 3. If code point is in the range U+F780 to U+F7FF, inclusive,
      // return a byte whose value is code point − 0xF780 + 0x80.
      if (inRange(code_point, 0xF780, 0xF7FF))
        return code_point - 0xF780 + 0x80;

      // 4. Return error with code point.
      return encoderError(code_point);
    };
  }

  /** @param {{fatal: boolean}} options */
  encoders['x-user-defined'] = function(options) {
    return new XUserDefinedEncoder(options);
  };
  /** @param {{fatal: boolean}} options */
  decoders['x-user-defined'] = function(options) {
    return new XUserDefinedDecoder(options);
  };

  if (!global['TextEncoder'])
    global['TextEncoder'] = TextEncoder;
  if (!global['TextDecoder'])
    global['TextDecoder'] = TextDecoder;

  if ( true && module.exports) {
    module.exports = {
      TextEncoder: global['TextEncoder'],
      TextDecoder: global['TextDecoder'],
      EncodingIndexes: global["encoding-indexes"]
    };
  }

// For strict environments where `this` inside the global scope
// is `undefined`, take a pure object instead
}(this || {}));

/***/ }),

/***/ "URgk":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__("iQ8O");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("yLpj")))

/***/ }),

/***/ "Vi6U":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__("D3zA");
var ES = __webpack_require__("DwGB");
var replace = bind.call(Function.call, String.prototype.replace);

/* eslint-disable no-control-regex */
var leftWhitespace = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/;
var rightWhitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/;
/* eslint-enable no-control-regex */

module.exports = function trim() {
	var S = ES.ToString(ES.CheckObjectCoercible(this));
	return replace(replace(S, leftWhitespace, ''), rightWhitespace, '');
};


/***/ }),

/***/ "ZFOp":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};


/***/ }),

/***/ "adyd":
/***/ (function(module, exports, __webpack_require__) {

// Thanks https://github.com/axic/swarmhash
var keccak = __webpack_require__("nQl/").keccak256;

var Bytes = __webpack_require__("vHQG");

var swarmHashBlock = function swarmHashBlock(length, data) {
  var lengthEncoded = Bytes.reverse(Bytes.pad(6, Bytes.fromNumber(length)));
  var bytes = Bytes.flatten([lengthEncoded, "0x0000", data]);
  return keccak(bytes).slice(2);
}; // (Bytes | Uint8Array | String) -> String


var swarmHash = function swarmHash(data) {
  if (typeof data === "string" && data.slice(0, 2) !== "0x") {
    data = Bytes.fromString(data);
  } else if (typeof data !== "string" && data.length !== undefined) {
    data = Bytes.fromUint8Array(data);
  }

  var length = Bytes.length(data);

  if (length <= 4096) {
    return swarmHashBlock(length, data);
  }

  var maxSize = 4096;

  while (maxSize * (4096 / 32) < length) {
    maxSize *= 4096 / 32;
  }

  var innerNodes = [];

  for (var i = 0; i < length; i += maxSize) {
    var size = maxSize < length - i ? maxSize : length - i;
    innerNodes.push(swarmHash(Bytes.slice(data, i, i + size)));
  }

  return swarmHashBlock(length, Bytes.flatten(innerNodes));
};

module.exports = swarmHash;

/***/ }),

/***/ "hbHZ":
/***/ (function(module, exports, __webpack_require__) {

var isHexPrefixed = __webpack_require__("UWJ2");

/**
 * Removes '0x' from a given `String` is present
 * @param {String} str the string value
 * @return {String|Optional} a string by pass if necessary
 */
module.exports = function stripHexPrefix(str) {
  if (typeof str !== 'string') {
    return str;
  }

  return isHexPrefixed(str) ? str.slice(2) : str;
}


/***/ }),

/***/ "iQ8O":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("yLpj"), __webpack_require__("8oxB")))

/***/ }),

/***/ "kl5A":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer, global, process) {var capability = __webpack_require__("qfHW")
var inherits = __webpack_require__("P7XM")
var response = __webpack_require__("yQtW")
var stream = __webpack_require__("43KI")
var toArrayBuffer = __webpack_require__("2Tiy")

var IncomingMessage = response.IncomingMessage
var rStates = response.readyStates

function decideMode (preferBinary, useFetch) {
	if (capability.fetch && useFetch) {
		return 'fetch'
	} else if (capability.mozchunkedarraybuffer) {
		return 'moz-chunked-arraybuffer'
	} else if (capability.msstream) {
		return 'ms-stream'
	} else if (capability.arraybuffer && preferBinary) {
		return 'arraybuffer'
	} else if (capability.vbArray && preferBinary) {
		return 'text:vbarray'
	} else {
		return 'text'
	}
}

var ClientRequest = module.exports = function (opts) {
	var self = this
	stream.Writable.call(self)

	self._opts = opts
	self._body = []
	self._headers = {}
	if (opts.auth)
		self.setHeader('Authorization', 'Basic ' + new Buffer(opts.auth).toString('base64'))
	Object.keys(opts.headers).forEach(function (name) {
		self.setHeader(name, opts.headers[name])
	})

	var preferBinary
	var useFetch = true
	if (opts.mode === 'disable-fetch' || ('requestTimeout' in opts && !capability.abortController)) {
		// If the use of XHR should be preferred. Not typically needed.
		useFetch = false
		preferBinary = true
	} else if (opts.mode === 'prefer-streaming') {
		// If streaming is a high priority but binary compatibility and
		// the accuracy of the 'content-type' header aren't
		preferBinary = false
	} else if (opts.mode === 'allow-wrong-content-type') {
		// If streaming is more important than preserving the 'content-type' header
		preferBinary = !capability.overrideMimeType
	} else if (!opts.mode || opts.mode === 'default' || opts.mode === 'prefer-fast') {
		// Use binary if text streaming may corrupt data or the content-type header, or for speed
		preferBinary = true
	} else {
		throw new Error('Invalid value for opts.mode')
	}
	self._mode = decideMode(preferBinary, useFetch)
	self._fetchTimer = null

	self.on('finish', function () {
		self._onFinish()
	})
}

inherits(ClientRequest, stream.Writable)

ClientRequest.prototype.setHeader = function (name, value) {
	var self = this
	var lowerName = name.toLowerCase()
	// This check is not necessary, but it prevents warnings from browsers about setting unsafe
	// headers. To be honest I'm not entirely sure hiding these warnings is a good thing, but
	// http-browserify did it, so I will too.
	if (unsafeHeaders.indexOf(lowerName) !== -1)
		return

	self._headers[lowerName] = {
		name: name,
		value: value
	}
}

ClientRequest.prototype.getHeader = function (name) {
	var header = this._headers[name.toLowerCase()]
	if (header)
		return header.value
	return null
}

ClientRequest.prototype.removeHeader = function (name) {
	var self = this
	delete self._headers[name.toLowerCase()]
}

ClientRequest.prototype._onFinish = function () {
	var self = this

	if (self._destroyed)
		return
	var opts = self._opts

	var headersObj = self._headers
	var body = null
	if (opts.method !== 'GET' && opts.method !== 'HEAD') {
		if (capability.arraybuffer) {
			body = toArrayBuffer(Buffer.concat(self._body))
		} else if (capability.blobConstructor) {
			body = new global.Blob(self._body.map(function (buffer) {
				return toArrayBuffer(buffer)
			}), {
				type: (headersObj['content-type'] || {}).value || ''
			})
		} else {
			// get utf8 string
			body = Buffer.concat(self._body).toString()
		}
	}

	// create flattened list of headers
	var headersList = []
	Object.keys(headersObj).forEach(function (keyName) {
		var name = headersObj[keyName].name
		var value = headersObj[keyName].value
		if (Array.isArray(value)) {
			value.forEach(function (v) {
				headersList.push([name, v])
			})
		} else {
			headersList.push([name, value])
		}
	})

	if (self._mode === 'fetch') {
		var signal = null
		var fetchTimer = null
		if (capability.abortController) {
			var controller = new AbortController()
			signal = controller.signal
			self._fetchAbortController = controller

			if ('requestTimeout' in opts && opts.requestTimeout !== 0) {
				self._fetchTimer = global.setTimeout(function () {
					self.emit('requestTimeout')
					if (self._fetchAbortController)
						self._fetchAbortController.abort()
				}, opts.requestTimeout)
			}
		}

		global.fetch(self._opts.url, {
			method: self._opts.method,
			headers: headersList,
			body: body || undefined,
			mode: 'cors',
			credentials: opts.withCredentials ? 'include' : 'same-origin',
			signal: signal
		}).then(function (response) {
			self._fetchResponse = response
			self._connect()
		}, function (reason) {
			global.clearTimeout(self._fetchTimer)
			if (!self._destroyed)
				self.emit('error', reason)
		})
	} else {
		var xhr = self._xhr = new global.XMLHttpRequest()
		try {
			xhr.open(self._opts.method, self._opts.url, true)
		} catch (err) {
			process.nextTick(function () {
				self.emit('error', err)
			})
			return
		}

		// Can't set responseType on really old browsers
		if ('responseType' in xhr)
			xhr.responseType = self._mode.split(':')[0]

		if ('withCredentials' in xhr)
			xhr.withCredentials = !!opts.withCredentials

		if (self._mode === 'text' && 'overrideMimeType' in xhr)
			xhr.overrideMimeType('text/plain; charset=x-user-defined')

		if ('requestTimeout' in opts) {
			xhr.timeout = opts.requestTimeout
			xhr.ontimeout = function () {
				self.emit('requestTimeout')
			}
		}

		headersList.forEach(function (header) {
			xhr.setRequestHeader(header[0], header[1])
		})

		self._response = null
		xhr.onreadystatechange = function () {
			switch (xhr.readyState) {
				case rStates.LOADING:
				case rStates.DONE:
					self._onXHRProgress()
					break
			}
		}
		// Necessary for streaming in Firefox, since xhr.response is ONLY defined
		// in onprogress, not in onreadystatechange with xhr.readyState = 3
		if (self._mode === 'moz-chunked-arraybuffer') {
			xhr.onprogress = function () {
				self._onXHRProgress()
			}
		}

		xhr.onerror = function () {
			if (self._destroyed)
				return
			self.emit('error', new Error('XHR error'))
		}

		try {
			xhr.send(body)
		} catch (err) {
			process.nextTick(function () {
				self.emit('error', err)
			})
			return
		}
	}
}

/**
 * Checks if xhr.status is readable and non-zero, indicating no error.
 * Even though the spec says it should be available in readyState 3,
 * accessing it throws an exception in IE8
 */
function statusValid (xhr) {
	try {
		var status = xhr.status
		return (status !== null && status !== 0)
	} catch (e) {
		return false
	}
}

ClientRequest.prototype._onXHRProgress = function () {
	var self = this

	if (!statusValid(self._xhr) || self._destroyed)
		return

	if (!self._response)
		self._connect()

	self._response._onXHRProgress()
}

ClientRequest.prototype._connect = function () {
	var self = this

	if (self._destroyed)
		return

	self._response = new IncomingMessage(self._xhr, self._fetchResponse, self._mode, self._fetchTimer)
	self._response.on('error', function(err) {
		self.emit('error', err)
	})

	self.emit('response', self._response)
}

ClientRequest.prototype._write = function (chunk, encoding, cb) {
	var self = this

	self._body.push(chunk)
	cb()
}

ClientRequest.prototype.abort = ClientRequest.prototype.destroy = function () {
	var self = this
	self._destroyed = true
	global.clearTimeout(self._fetchTimer)
	if (self._response)
		self._response._destroyed = true
	if (self._xhr)
		self._xhr.abort()
	else if (self._fetchAbortController)
		self._fetchAbortController.abort()
}

ClientRequest.prototype.end = function (data, encoding, cb) {
	var self = this
	if (typeof data === 'function') {
		cb = data
		data = undefined
	}

	stream.Writable.prototype.end.call(self, data, encoding, cb)
}

ClientRequest.prototype.flushHeaders = function () {}
ClientRequest.prototype.setTimeout = function () {}
ClientRequest.prototype.setNoDelay = function () {}
ClientRequest.prototype.setSocketKeepAlive = function () {}

// Taken from http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader%28%29-method
var unsafeHeaders = [
	'accept-charset',
	'accept-encoding',
	'access-control-request-headers',
	'access-control-request-method',
	'connection',
	'content-length',
	'cookie',
	'cookie2',
	'date',
	'dnt',
	'expect',
	'host',
	'keep-alive',
	'origin',
	'referer',
	'te',
	'trailer',
	'transfer-encoding',
	'upgrade',
	'via'
]

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer, __webpack_require__("yLpj"), __webpack_require__("8oxB")))

/***/ }),

/***/ "lJCZ":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var ClientRequest = __webpack_require__("kl5A")
var response = __webpack_require__("yQtW")
var extend = __webpack_require__("U6jy")
var statusCodes = __webpack_require__("jAWH")
var url = __webpack_require__("CxY0")

var http = exports

http.request = function (opts, cb) {
	if (typeof opts === 'string')
		opts = url.parse(opts)
	else
		opts = extend(opts)

	// Normally, the page is loaded from http or https, so not specifying a protocol
	// will result in a (valid) protocol-relative url. However, this won't work if
	// the protocol is something else, like 'file:'
	var defaultProtocol = global.location.protocol.search(/^https?:$/) === -1 ? 'http:' : ''

	var protocol = opts.protocol || defaultProtocol
	var host = opts.hostname || opts.host
	var port = opts.port
	var path = opts.path || '/'

	// Necessary for IPv6 addresses
	if (host && host.indexOf(':') !== -1)
		host = '[' + host + ']'

	// This may be a relative url. The browser should always be able to interpret it correctly.
	opts.url = (host ? (protocol + '//' + host) : '') + (port ? ':' + port : '') + path
	opts.method = (opts.method || 'GET').toUpperCase()
	opts.headers = opts.headers || {}

	// Also valid opts.auth, opts.mode

	var req = new ClientRequest(opts)
	if (cb)
		req.on('response', cb)
	return req
}

http.get = function get (opts, cb) {
	var req = http.request(opts, cb)
	req.end()
	return req
}

http.ClientRequest = ClientRequest
http.IncomingMessage = response.IncomingMessage

http.Agent = function () {}
http.Agent.defaultMaxSockets = 4

http.globalAgent = new http.Agent()

http.STATUS_CODES = statusCodes

http.METHODS = [
	'CHECKOUT',
	'CONNECT',
	'COPY',
	'DELETE',
	'GET',
	'HEAD',
	'LOCK',
	'M-SEARCH',
	'MERGE',
	'MKACTIVITY',
	'MKCOL',
	'MOVE',
	'NOTIFY',
	'OPTIONS',
	'PATCH',
	'POST',
	'PROPFIND',
	'PROPPATCH',
	'PURGE',
	'PUT',
	'REPORT',
	'SEARCH',
	'SUBSCRIBE',
	'TRACE',
	'UNLOCK',
	'UNSUBSCRIBE'
]
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("yLpj")))

/***/ }),

/***/ "mqpt":
/***/ (function(module, exports) {

var generate = function generate(num, fn) {
  var a = [];
  for (var i = 0; i < num; ++i) {
    a.push(fn(i));
  }return a;
};

var replicate = function replicate(num, val) {
  return generate(num, function () {
    return val;
  });
};

var concat = function concat(a, b) {
  return a.concat(b);
};

var flatten = function flatten(a) {
  var r = [];
  for (var j = 0, J = a.length; j < J; ++j) {
    for (var i = 0, I = a[j].length; i < I; ++i) {
      r.push(a[j][i]);
    }
  }return r;
};

var chunksOf = function chunksOf(n, a) {
  var b = [];
  for (var i = 0, l = a.length; i < l; i += n) {
    b.push(a.slice(i, i + n));
  }return b;
};

module.exports = {
  generate: generate,
  replicate: replicate,
  concat: concat,
  flatten: flatten,
  chunksOf: chunksOf
};

/***/ }),

/***/ "nQl/":
/***/ (function(module, exports) {

// This was ported from https://github.com/emn178/js-sha3, with some minor
// modifications and pruning. It is licensed under MIT:
//
// Copyright 2015-2016 Chen, Yi-Cyuan
//  
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var HEX_CHARS = '0123456789abcdef'.split('');
var KECCAK_PADDING = [1, 256, 65536, 16777216];
var SHIFT = [0, 8, 16, 24];
var RC = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];

var Keccak = function Keccak(bits) {
  return {
    blocks: [],
    reset: true,
    block: 0,
    start: 0,
    blockCount: 1600 - (bits << 1) >> 5,
    outputBlocks: bits >> 5,
    s: function (s) {
      return [].concat(s, s, s, s, s);
    }([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  };
};

var update = function update(state, message) {
  var length = message.length,
      blocks = state.blocks,
      byteCount = state.blockCount << 2,
      blockCount = state.blockCount,
      outputBlocks = state.outputBlocks,
      s = state.s,
      index = 0,
      i,
      code;

  // update
  while (index < length) {
    if (state.reset) {
      state.reset = false;
      blocks[0] = state.block;
      for (i = 1; i < blockCount + 1; ++i) {
        blocks[i] = 0;
      }
    }
    if (typeof message !== "string") {
      for (i = state.start; index < length && i < byteCount; ++index) {
        blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
      }
    } else {
      for (i = state.start; index < length && i < byteCount; ++index) {
        code = message.charCodeAt(index);
        if (code < 0x80) {
          blocks[i >> 2] |= code << SHIFT[i++ & 3];
        } else if (code < 0x800) {
          blocks[i >> 2] |= (0xc0 | code >> 6) << SHIFT[i++ & 3];
          blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
        } else if (code < 0xd800 || code >= 0xe000) {
          blocks[i >> 2] |= (0xe0 | code >> 12) << SHIFT[i++ & 3];
          blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
          blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
        } else {
          code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
          blocks[i >> 2] |= (0xf0 | code >> 18) << SHIFT[i++ & 3];
          blocks[i >> 2] |= (0x80 | code >> 12 & 0x3f) << SHIFT[i++ & 3];
          blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
          blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
        }
      }
    }
    state.lastByteIndex = i;
    if (i >= byteCount) {
      state.start = i - byteCount;
      state.block = blocks[blockCount];
      for (i = 0; i < blockCount; ++i) {
        s[i] ^= blocks[i];
      }
      f(s);
      state.reset = true;
    } else {
      state.start = i;
    }
  }

  // finalize
  i = state.lastByteIndex;
  blocks[i >> 2] |= KECCAK_PADDING[i & 3];
  if (state.lastByteIndex === byteCount) {
    blocks[0] = blocks[blockCount];
    for (i = 1; i < blockCount + 1; ++i) {
      blocks[i] = 0;
    }
  }
  blocks[blockCount - 1] |= 0x80000000;
  for (i = 0; i < blockCount; ++i) {
    s[i] ^= blocks[i];
  }
  f(s);

  // toString
  var hex = '',
      i = 0,
      j = 0,
      block;
  while (j < outputBlocks) {
    for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
      block = s[i];
      hex += HEX_CHARS[block >> 4 & 0x0F] + HEX_CHARS[block & 0x0F] + HEX_CHARS[block >> 12 & 0x0F] + HEX_CHARS[block >> 8 & 0x0F] + HEX_CHARS[block >> 20 & 0x0F] + HEX_CHARS[block >> 16 & 0x0F] + HEX_CHARS[block >> 28 & 0x0F] + HEX_CHARS[block >> 24 & 0x0F];
    }
    if (j % blockCount === 0) {
      f(s);
      i = 0;
    }
  }
  return "0x" + hex;
};

var f = function f(s) {
  var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33, b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;

  for (n = 0; n < 48; n += 2) {
    c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
    c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
    c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
    c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
    c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
    c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
    c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
    c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
    c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
    c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];

    h = c8 ^ (c2 << 1 | c3 >>> 31);
    l = c9 ^ (c3 << 1 | c2 >>> 31);
    s[0] ^= h;
    s[1] ^= l;
    s[10] ^= h;
    s[11] ^= l;
    s[20] ^= h;
    s[21] ^= l;
    s[30] ^= h;
    s[31] ^= l;
    s[40] ^= h;
    s[41] ^= l;
    h = c0 ^ (c4 << 1 | c5 >>> 31);
    l = c1 ^ (c5 << 1 | c4 >>> 31);
    s[2] ^= h;
    s[3] ^= l;
    s[12] ^= h;
    s[13] ^= l;
    s[22] ^= h;
    s[23] ^= l;
    s[32] ^= h;
    s[33] ^= l;
    s[42] ^= h;
    s[43] ^= l;
    h = c2 ^ (c6 << 1 | c7 >>> 31);
    l = c3 ^ (c7 << 1 | c6 >>> 31);
    s[4] ^= h;
    s[5] ^= l;
    s[14] ^= h;
    s[15] ^= l;
    s[24] ^= h;
    s[25] ^= l;
    s[34] ^= h;
    s[35] ^= l;
    s[44] ^= h;
    s[45] ^= l;
    h = c4 ^ (c8 << 1 | c9 >>> 31);
    l = c5 ^ (c9 << 1 | c8 >>> 31);
    s[6] ^= h;
    s[7] ^= l;
    s[16] ^= h;
    s[17] ^= l;
    s[26] ^= h;
    s[27] ^= l;
    s[36] ^= h;
    s[37] ^= l;
    s[46] ^= h;
    s[47] ^= l;
    h = c6 ^ (c0 << 1 | c1 >>> 31);
    l = c7 ^ (c1 << 1 | c0 >>> 31);
    s[8] ^= h;
    s[9] ^= l;
    s[18] ^= h;
    s[19] ^= l;
    s[28] ^= h;
    s[29] ^= l;
    s[38] ^= h;
    s[39] ^= l;
    s[48] ^= h;
    s[49] ^= l;

    b0 = s[0];
    b1 = s[1];
    b32 = s[11] << 4 | s[10] >>> 28;
    b33 = s[10] << 4 | s[11] >>> 28;
    b14 = s[20] << 3 | s[21] >>> 29;
    b15 = s[21] << 3 | s[20] >>> 29;
    b46 = s[31] << 9 | s[30] >>> 23;
    b47 = s[30] << 9 | s[31] >>> 23;
    b28 = s[40] << 18 | s[41] >>> 14;
    b29 = s[41] << 18 | s[40] >>> 14;
    b20 = s[2] << 1 | s[3] >>> 31;
    b21 = s[3] << 1 | s[2] >>> 31;
    b2 = s[13] << 12 | s[12] >>> 20;
    b3 = s[12] << 12 | s[13] >>> 20;
    b34 = s[22] << 10 | s[23] >>> 22;
    b35 = s[23] << 10 | s[22] >>> 22;
    b16 = s[33] << 13 | s[32] >>> 19;
    b17 = s[32] << 13 | s[33] >>> 19;
    b48 = s[42] << 2 | s[43] >>> 30;
    b49 = s[43] << 2 | s[42] >>> 30;
    b40 = s[5] << 30 | s[4] >>> 2;
    b41 = s[4] << 30 | s[5] >>> 2;
    b22 = s[14] << 6 | s[15] >>> 26;
    b23 = s[15] << 6 | s[14] >>> 26;
    b4 = s[25] << 11 | s[24] >>> 21;
    b5 = s[24] << 11 | s[25] >>> 21;
    b36 = s[34] << 15 | s[35] >>> 17;
    b37 = s[35] << 15 | s[34] >>> 17;
    b18 = s[45] << 29 | s[44] >>> 3;
    b19 = s[44] << 29 | s[45] >>> 3;
    b10 = s[6] << 28 | s[7] >>> 4;
    b11 = s[7] << 28 | s[6] >>> 4;
    b42 = s[17] << 23 | s[16] >>> 9;
    b43 = s[16] << 23 | s[17] >>> 9;
    b24 = s[26] << 25 | s[27] >>> 7;
    b25 = s[27] << 25 | s[26] >>> 7;
    b6 = s[36] << 21 | s[37] >>> 11;
    b7 = s[37] << 21 | s[36] >>> 11;
    b38 = s[47] << 24 | s[46] >>> 8;
    b39 = s[46] << 24 | s[47] >>> 8;
    b30 = s[8] << 27 | s[9] >>> 5;
    b31 = s[9] << 27 | s[8] >>> 5;
    b12 = s[18] << 20 | s[19] >>> 12;
    b13 = s[19] << 20 | s[18] >>> 12;
    b44 = s[29] << 7 | s[28] >>> 25;
    b45 = s[28] << 7 | s[29] >>> 25;
    b26 = s[38] << 8 | s[39] >>> 24;
    b27 = s[39] << 8 | s[38] >>> 24;
    b8 = s[48] << 14 | s[49] >>> 18;
    b9 = s[49] << 14 | s[48] >>> 18;

    s[0] = b0 ^ ~b2 & b4;
    s[1] = b1 ^ ~b3 & b5;
    s[10] = b10 ^ ~b12 & b14;
    s[11] = b11 ^ ~b13 & b15;
    s[20] = b20 ^ ~b22 & b24;
    s[21] = b21 ^ ~b23 & b25;
    s[30] = b30 ^ ~b32 & b34;
    s[31] = b31 ^ ~b33 & b35;
    s[40] = b40 ^ ~b42 & b44;
    s[41] = b41 ^ ~b43 & b45;
    s[2] = b2 ^ ~b4 & b6;
    s[3] = b3 ^ ~b5 & b7;
    s[12] = b12 ^ ~b14 & b16;
    s[13] = b13 ^ ~b15 & b17;
    s[22] = b22 ^ ~b24 & b26;
    s[23] = b23 ^ ~b25 & b27;
    s[32] = b32 ^ ~b34 & b36;
    s[33] = b33 ^ ~b35 & b37;
    s[42] = b42 ^ ~b44 & b46;
    s[43] = b43 ^ ~b45 & b47;
    s[4] = b4 ^ ~b6 & b8;
    s[5] = b5 ^ ~b7 & b9;
    s[14] = b14 ^ ~b16 & b18;
    s[15] = b15 ^ ~b17 & b19;
    s[24] = b24 ^ ~b26 & b28;
    s[25] = b25 ^ ~b27 & b29;
    s[34] = b34 ^ ~b36 & b38;
    s[35] = b35 ^ ~b37 & b39;
    s[44] = b44 ^ ~b46 & b48;
    s[45] = b45 ^ ~b47 & b49;
    s[6] = b6 ^ ~b8 & b0;
    s[7] = b7 ^ ~b9 & b1;
    s[16] = b16 ^ ~b18 & b10;
    s[17] = b17 ^ ~b19 & b11;
    s[26] = b26 ^ ~b28 & b20;
    s[27] = b27 ^ ~b29 & b21;
    s[36] = b36 ^ ~b38 & b30;
    s[37] = b37 ^ ~b39 & b31;
    s[46] = b46 ^ ~b48 & b40;
    s[47] = b47 ^ ~b49 & b41;
    s[8] = b8 ^ ~b0 & b2;
    s[9] = b9 ^ ~b1 & b3;
    s[18] = b18 ^ ~b10 & b12;
    s[19] = b19 ^ ~b11 & b13;
    s[28] = b28 ^ ~b20 & b22;
    s[29] = b29 ^ ~b21 & b23;
    s[38] = b38 ^ ~b30 & b32;
    s[39] = b39 ^ ~b31 & b33;
    s[48] = b48 ^ ~b40 & b42;
    s[49] = b49 ^ ~b41 & b43;

    s[0] ^= RC[n];
    s[1] ^= RC[n + 1];
  }
};

var keccak = function keccak(bits) {
  return function (str) {
    var msg;
    if (str.slice(0, 2) === "0x") {
      msg = [];
      for (var i = 2, l = str.length; i < l; i += 2) {
        msg.push(parseInt(str.slice(i, i + 2), 16));
      }
    } else {
      msg = str;
    }
    return update(Keccak(bits, bits), msg);
  };
};

module.exports = {
  keccak256: keccak(256),
  keccak512: keccak(512),
  keccak256s: keccak(256),
  keccak512s: keccak(512)
};

/***/ }),

/***/ "qfHW":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports.fetch = isFunction(global.fetch) && isFunction(global.ReadableStream)

exports.writableStream = isFunction(global.WritableStream)

exports.abortController = isFunction(global.AbortController)

exports.blobConstructor = false
try {
	new Blob([new ArrayBuffer(1)])
	exports.blobConstructor = true
} catch (e) {}

// The xhr request to example.com may violate some restrictive CSP configurations,
// so if we're running in a browser that supports `fetch`, avoid calling getXHR()
// and assume support for certain features below.
var xhr
function getXHR () {
	// Cache the xhr value
	if (xhr !== undefined) return xhr

	if (global.XMLHttpRequest) {
		xhr = new global.XMLHttpRequest()
		// If XDomainRequest is available (ie only, where xhr might not work
		// cross domain), use the page location. Otherwise use example.com
		// Note: this doesn't actually make an http request.
		try {
			xhr.open('GET', global.XDomainRequest ? '/' : 'https://example.com')
		} catch(e) {
			xhr = null
		}
	} else {
		// Service workers don't have XHR
		xhr = null
	}
	return xhr
}

function checkTypeSupport (type) {
	var xhr = getXHR()
	if (!xhr) return false
	try {
		xhr.responseType = type
		return xhr.responseType === type
	} catch (e) {}
	return false
}

// For some strange reason, Safari 7.0 reports typeof global.ArrayBuffer === 'object'.
// Safari 7.1 appears to have fixed this bug.
var haveArrayBuffer = typeof global.ArrayBuffer !== 'undefined'
var haveSlice = haveArrayBuffer && isFunction(global.ArrayBuffer.prototype.slice)

// If fetch is supported, then arraybuffer will be supported too. Skip calling
// checkTypeSupport(), since that calls getXHR().
exports.arraybuffer = exports.fetch || (haveArrayBuffer && checkTypeSupport('arraybuffer'))

// These next two tests unavoidably show warnings in Chrome. Since fetch will always
// be used if it's available, just return false for these to avoid the warnings.
exports.msstream = !exports.fetch && haveSlice && checkTypeSupport('ms-stream')
exports.mozchunkedarraybuffer = !exports.fetch && haveArrayBuffer &&
	checkTypeSupport('moz-chunked-arraybuffer')

// If fetch is supported, then overrideMimeType will be supported too. Skip calling
// getXHR().
exports.overrideMimeType = exports.fetch || (getXHR() ? isFunction(getXHR().overrideMimeType) : false)

exports.vbArray = isFunction(global.VBArray)

function isFunction (value) {
	return typeof value === 'function'
}

xhr = null // Help gc

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("yLpj")))

/***/ }),

/***/ "qtZk":
/***/ (function(module, exports) {

// TODO: this is a temporary fix to hide those libraries from the browser. A
// slightly better long-term solution would be to split this file into two,
// separating the functions that are used on Node.js from the functions that
// are used only on the browser.
module.exports = function (_ref) {
  var fs = _ref.fs,
      files = _ref.files,
      os = _ref.os,
      path = _ref.path,
      child_process = _ref.child_process,
      mimetype = _ref.mimetype,
      defaultArchives = _ref.defaultArchives,
      request = _ref.request,
      downloadUrl = _ref.downloadUrl,
      bytes = _ref.bytes,
      hash = _ref.hash,
      pick = _ref.pick;

  // ∀ a . String -> JSON -> Map String a -o Map String a
  //   Inserts a key/val pair in an object impurely.
  var impureInsert = function impureInsert(key) {
    return function (val) {
      return function (map) {
        return map[key] = val, map;
      };
    };
  }; // String -> JSON -> Map String JSON
  //   Merges an array of keys and an array of vals into an object.


  var toMap = function toMap(keys) {
    return function (vals) {
      var map = {};

      for (var i = 0, l = keys.length; i < l; ++i) {
        map[keys[i]] = vals[i];
      }

      return map;
    };
  }; // ∀ a . Map String a -> Map String a -> Map String a
  //   Merges two maps into one.


  var merge = function merge(a) {
    return function (b) {
      var map = {};

      for (var key in a) {
        map[key] = a[key];
      }

      for (var _key in b) {
        map[_key] = b[_key];
      }

      return map;
    };
  }; // ∀ a . [a] -> [a] -> Bool


  var equals = function equals(a) {
    return function (b) {
      if (a.length !== b.length) {
        return false;
      } else {
        for (var i = 0, l = a.length; i < l; ++i) {
          if (a[i] !== b[i]) return false;
        }
      }

      return true;
    };
  }; // String -> String -> String


  var rawUrl = function rawUrl(swarmUrl) {
    return function (hash) {
      return "".concat(swarmUrl, "/bzzr:/").concat(hash);
    };
  }; // String -> String -> Promise Uint8Array
  //   Gets the raw contents of a Swarm hash address.


  var downloadData = function downloadData(swarmUrl) {
    return function (hash) {
      return request(rawUrl(swarmUrl)(hash), {
        responseType: "arraybuffer"
      }).then(function (arrayBuffer) {
        var uint8Array = new Uint8Array(arrayBuffer);
        var error404 = [52, 48, 52, 32, 112, 97, 103, 101, 32, 110, 111, 116, 32, 102, 111, 117, 110, 100, 10];
        if (equals(uint8Array)(error404)) throw "Error 404.";
        return uint8Array;
      });
    };
  }; // type Entry = {"type": String, "hash": String}
  // type File = {"type": String, "data": Uint8Array}
  // String -> String -> Promise (Map String Entry)
  //   Solves the manifest of a Swarm address recursively.
  //   Returns a map from full paths to entries.


  var downloadEntries = function downloadEntries(swarmUrl) {
    return function (hash) {
      var search = function search(hash) {
        return function (path) {
          return function (routes) {
            // Formats an entry to the Swarm.js type.
            var format = function format(entry) {
              return {
                type: entry.contentType,
                hash: entry.hash
              };
            }; // To download a single entry:
            //   if type is bzz-manifest, go deeper
            //   if not, add it to the routing table


            var downloadEntry = function downloadEntry(entry) {
              if (entry.path === undefined) {
                return Promise.resolve();
              } else {
                return entry.contentType === "application/bzz-manifest+json" ? search(entry.hash)(path + entry.path)(routes) : Promise.resolve(impureInsert(path + entry.path)(format(entry))(routes));
              }
            }; // Downloads the initial manifest and then each entry.


            return downloadData(swarmUrl)(hash).then(function (text) {
              return JSON.parse(toString(text)).entries;
            }).then(function (entries) {
              return Promise.all(entries.map(downloadEntry));
            }).then(function () {
              return routes;
            });
          };
        };
      };

      return search(hash)("")({});
    };
  }; // String -> String -> Promise (Map String String)
  //   Same as `downloadEntries`, but returns only hashes (no types).


  var downloadRoutes = function downloadRoutes(swarmUrl) {
    return function (hash) {
      return downloadEntries(swarmUrl)(hash).then(function (entries) {
        return toMap(Object.keys(entries))(Object.keys(entries).map(function (route) {
          return entries[route].hash;
        }));
      });
    };
  }; // String -> String -> Promise (Map String File)
  //   Gets the entire directory tree in a Swarm address.
  //   Returns a promise mapping paths to file contents.


  var downloadDirectory = function downloadDirectory(swarmUrl) {
    return function (hash) {
      return downloadEntries(swarmUrl)(hash).then(function (entries) {
        var paths = Object.keys(entries);
        var hashs = paths.map(function (path) {
          return entries[path].hash;
        });
        var types = paths.map(function (path) {
          return entries[path].type;
        });
        var datas = hashs.map(downloadData(swarmUrl));

        var files = function files(datas) {
          return datas.map(function (data, i) {
            return {
              type: types[i],
              data: data
            };
          });
        };

        return Promise.all(datas).then(function (datas) {
          return toMap(paths)(files(datas));
        });
      });
    };
  }; // String -> String -> String -> Promise String
  //   Gets the raw contents of a Swarm hash address.
  //   Returns a promise with the downloaded file path.


  var downloadDataToDisk = function downloadDataToDisk(swarmUrl) {
    return function (hash) {
      return function (filePath) {
        return files.download(rawUrl(swarmUrl)(hash))(filePath);
      };
    };
  }; // String -> String -> String -> Promise (Map String String)
  //   Gets the entire directory tree in a Swarm address.
  //   Returns a promise mapping paths to file contents.


  var downloadDirectoryToDisk = function downloadDirectoryToDisk(swarmUrl) {
    return function (hash) {
      return function (dirPath) {
        return downloadRoutes(swarmUrl)(hash).then(function (routingTable) {
          var downloads = [];

          for (var route in routingTable) {
            if (route.length > 0) {
              var filePath = path.join(dirPath, route);
              downloads.push(downloadDataToDisk(swarmUrl)(routingTable[route])(filePath));
            }

            ;
          }

          ;
          return Promise.all(downloads).then(function () {
            return dirPath;
          });
        });
      };
    };
  }; // String -> Uint8Array -> Promise String
  //   Uploads raw data to Swarm.
  //   Returns a promise with the uploaded hash.


  var uploadData = function uploadData(swarmUrl) {
    return function (data) {
      return request("".concat(swarmUrl, "/bzzr:/"), {
        body: typeof data === "string" ? fromString(data) : data,
        method: "POST"
      });
    };
  }; // String -> String -> String -> File -> Promise String
  //   Uploads a file to the Swarm manifest at a given hash, under a specific
  //   route. Returns a promise containing the uploaded hash.
  //   FIXME: for some reasons Swarm-Gateways is sometimes returning
  //   error 404 (bad request), so we retry up to 3 times. Why?


  var uploadToManifest = function uploadToManifest(swarmUrl) {
    return function (hash) {
      return function (route) {
        return function (file) {
          var attempt = function attempt(n) {
            var slashRoute = route[0] === "/" ? route : "/" + route;
            var url = "".concat(swarmUrl, "/bzz:/").concat(hash).concat(slashRoute);
            var opt = {
              method: "PUT",
              headers: {
                "Content-Type": file.type
              },
              body: file.data
            };
            return request(url, opt).then(function (response) {
              if (response.indexOf("error") !== -1) {
                throw response;
              }

              return response;
            }).catch(function (e) {
              return n > 0 && attempt(n - 1);
            });
          };

          return attempt(3);
        };
      };
    };
  }; // String -> {type: String, data: Uint8Array} -> Promise String


  var uploadFile = function uploadFile(swarmUrl) {
    return function (file) {
      return uploadDirectory(swarmUrl)({
        "": file
      });
    };
  }; // String -> String -> Promise String


  var uploadFileFromDisk = function uploadFileFromDisk(swarmUrl) {
    return function (filePath) {
      return fs.readFile(filePath).then(function (data) {
        return uploadFile(swarmUrl)({
          type: mimetype.lookup(filePath),
          data: data
        });
      });
    };
  }; // String -> Map String File -> Promise String
  //   Uploads a directory to Swarm. The directory is
  //   represented as a map of routes and files.
  //   A default path is encoded by having a "" route.


  var uploadDirectory = function uploadDirectory(swarmUrl) {
    return function (directory) {
      return uploadData(swarmUrl)("{}").then(function (hash) {
        var uploadRoute = function uploadRoute(route) {
          return function (hash) {
            return uploadToManifest(swarmUrl)(hash)(route)(directory[route]);
          };
        };

        var uploadToHash = function uploadToHash(hash, route) {
          return hash.then(uploadRoute(route));
        };

        return Object.keys(directory).reduce(uploadToHash, Promise.resolve(hash));
      });
    };
  }; // String -> Promise String


  var uploadDataFromDisk = function uploadDataFromDisk(swarmUrl) {
    return function (filePath) {
      return fs.readFile(filePath).then(uploadData(swarmUrl));
    };
  }; // String -> Nullable String -> String -> Promise String


  var uploadDirectoryFromDisk = function uploadDirectoryFromDisk(swarmUrl) {
    return function (defaultPath) {
      return function (dirPath) {
        return files.directoryTree(dirPath).then(function (fullPaths) {
          return Promise.all(fullPaths.map(function (path) {
            return fs.readFile(path);
          })).then(function (datas) {
            var paths = fullPaths.map(function (path) {
              return path.slice(dirPath.length);
            });
            var types = fullPaths.map(function (path) {
              return mimetype.lookup(path) || "text/plain";
            });
            return toMap(paths)(datas.map(function (data, i) {
              return {
                type: types[i],
                data: data
              };
            }));
          });
        }).then(function (directory) {
          return merge(defaultPath ? {
            "": directory[defaultPath]
          } : {})(directory);
        }).then(uploadDirectory(swarmUrl));
      };
    };
  }; // String -> UploadInfo -> Promise String
  //   Simplified multi-type upload which calls the correct
  //   one based on the type of the argument given.


  var _upload = function upload(swarmUrl) {
    return function (arg) {
      // Upload raw data from browser
      if (arg.pick === "data") {
        return pick.data().then(uploadData(swarmUrl)); // Upload a file from browser
      } else if (arg.pick === "file") {
        return pick.file().then(uploadFile(swarmUrl)); // Upload a directory from browser
      } else if (arg.pick === "directory") {
        return pick.directory().then(uploadDirectory(swarmUrl)); // Upload directory/file from disk
      } else if (arg.path) {
        switch (arg.kind) {
          case "data":
            return uploadDataFromDisk(swarmUrl)(arg.path);

          case "file":
            return uploadFileFromDisk(swarmUrl)(arg.path);

          case "directory":
            return uploadDirectoryFromDisk(swarmUrl)(arg.defaultFile)(arg.path);
        }

        ; // Upload UTF-8 string or raw data (buffer)
      } else if (arg.length || typeof arg === "string") {
        return uploadData(swarmUrl)(arg); // Upload directory with JSON
      } else if (arg instanceof Object) {
        return uploadDirectory(swarmUrl)(arg);
      }

      return Promise.reject(new Error("Bad arguments"));
    };
  }; // String -> String -> Nullable String -> Promise (String | Uint8Array | Map String Uint8Array)
  //   Simplified multi-type download which calls the correct function based on
  //   the type of the argument given, and on whether the Swwarm address has a
  //   directory or a file.


  var _download = function download(swarmUrl) {
    return function (hash) {
      return function (path) {
        return isDirectory(swarmUrl)(hash).then(function (isDir) {
          if (isDir) {
            return path ? downloadDirectoryToDisk(swarmUrl)(hash)(path) : downloadDirectory(swarmUrl)(hash);
          } else {
            return path ? downloadDataToDisk(swarmUrl)(hash)(path) : downloadData(swarmUrl)(hash);
          }
        });
      };
    };
  }; // String -> Promise String
  //   Downloads the Swarm binaries into a path. Returns a promise that only
  //   resolves when the exact Swarm file is there, and verified to be correct.
  //   If it was already there to begin with, skips the download.


  var downloadBinary = function downloadBinary(path, archives) {
    var system = os.platform().replace("win32", "windows") + "-" + (os.arch() === "x64" ? "amd64" : "386");
    var archive = (archives || defaultArchives)[system];
    var archiveUrl = downloadUrl + archive.archive + ".tar.gz";
    var archiveMD5 = archive.archiveMD5;
    var binaryMD5 = archive.binaryMD5;
    return files.safeDownloadArchived(archiveUrl)(archiveMD5)(binaryMD5)(path);
  }; // type SwarmSetup = {
  //   account : String,
  //   password : String,
  //   dataDir : String,
  //   binPath : String,
  //   ensApi : String,
  //   onDownloadProgress : Number ~> (),
  //   archives : [{
  //     archive: String,
  //     binaryMD5: String,
  //     archiveMD5: String
  //   }]
  // }
  // SwarmSetup ~> Promise Process
  //   Starts the Swarm process.


  var startProcess = function startProcess(swarmSetup) {
    return new Promise(function (resolve, reject) {
      var spawn = child_process.spawn;

      var hasString = function hasString(str) {
        return function (buffer) {
          return ('' + buffer).indexOf(str) !== -1;
        };
      };

      var account = swarmSetup.account,
          password = swarmSetup.password,
          dataDir = swarmSetup.dataDir,
          ensApi = swarmSetup.ensApi,
          privateKey = swarmSetup.privateKey;
      var STARTUP_TIMEOUT_SECS = 3;
      var WAITING_PASSWORD = 0;
      var STARTING = 1;
      var LISTENING = 2;
      var PASSWORD_PROMPT_HOOK = "Passphrase";
      var LISTENING_HOOK = "Swarm http proxy started";
      var state = WAITING_PASSWORD;
      var swarmProcess = spawn(swarmSetup.binPath, ['--bzzaccount', account || privateKey, '--datadir', dataDir, '--ens-api', ensApi]);

      var handleProcessOutput = function handleProcessOutput(data) {
        if (state === WAITING_PASSWORD && hasString(PASSWORD_PROMPT_HOOK)(data)) {
          setTimeout(function () {
            state = STARTING;
            swarmProcess.stdin.write(password + '\n');
          }, 500);
        } else if (hasString(LISTENING_HOOK)(data)) {
          state = LISTENING;
          clearTimeout(timeout);
          resolve(swarmProcess);
        }
      };

      swarmProcess.stdout.on('data', handleProcessOutput);
      swarmProcess.stderr.on('data', handleProcessOutput); //swarmProcess.on('close', () => setTimeout(restart, 2000));

      var restart = function restart() {
        return startProcess(swarmSetup).then(resolve).catch(reject);
      };

      var error = function error() {
        return reject(new Error("Couldn't start swarm process."));
      };

      var timeout = setTimeout(error, 20000);
    });
  }; // Process ~> Promise ()
  //   Stops the Swarm process.


  var stopProcess = function stopProcess(process) {
    return new Promise(function (resolve, reject) {
      process.stderr.removeAllListeners('data');
      process.stdout.removeAllListeners('data');
      process.stdin.removeAllListeners('error');
      process.removeAllListeners('error');
      process.removeAllListeners('exit');
      process.kill('SIGINT');
      var killTimeout = setTimeout(function () {
        return process.kill('SIGKILL');
      }, 8000);
      process.once('close', function () {
        clearTimeout(killTimeout);
        resolve();
      });
    });
  }; // SwarmSetup -> (SwarmAPI -> Promise ()) -> Promise ()
  //   Receives a Swarm configuration object and a callback function. It then
  //   checks if a local Swarm node is running. If no local Swarm is found, it
  //   downloads the Swarm binaries to the dataDir (if not there), checksums,
  //   starts the Swarm process and calls the callback function with an API
  //   object using the local node. That callback must return a promise which
  //   will resolve when it is done using the API, so that this function can
  //   close the Swarm process properly. Returns a promise that resolves when the
  //   user is done with the API and the Swarm process is closed.
  //   TODO: check if Swarm process is already running (improve `isAvailable`)


  var local = function local(swarmSetup) {
    return function (useAPI) {
      return _isAvailable("http://localhost:8500").then(function (isAvailable) {
        return isAvailable ? useAPI(at("http://localhost:8500")).then(function () {}) : downloadBinary(swarmSetup.binPath, swarmSetup.archives).onData(function (data) {
          return (swarmSetup.onProgress || function () {})(data.length);
        }).then(function () {
          return startProcess(swarmSetup);
        }).then(function (process) {
          return useAPI(at("http://localhost:8500")).then(function () {
            return process;
          });
        }).then(stopProcess);
      });
    };
  }; // String ~> Promise Bool
  //   Returns true if Swarm is available on `url`.
  //   Perfoms a test upload to determine that.
  //   TODO: improve this?


  var _isAvailable = function isAvailable(swarmUrl) {
    var testFile = "test";
    var testHash = "c9a99c7d326dcc6316f32fe2625b311f6dc49a175e6877681ded93137d3569e7";
    return uploadData(swarmUrl)(testFile).then(function (hash) {
      return hash === testHash;
    }).catch(function () {
      return false;
    });
  }; // String -> String ~> Promise Bool
  //   Returns a Promise which is true if that Swarm address is a directory.
  //   Determines that by checking that it (i) is a JSON, (ii) has a .entries.
  //   TODO: improve this?


  var isDirectory = function isDirectory(swarmUrl) {
    return function (hash) {
      return downloadData(swarmUrl)(hash).then(function (data) {
        try {
          return !!JSON.parse(toString(data)).entries;
        } catch (e) {
          return false;
        }
      });
    };
  }; // Uncurries a function; used to allow the f(x,y,z) style on exports.


  var uncurry = function uncurry(f) {
    return function (a, b, c, d, e) {
      var p; // Hardcoded because efficiency (`arguments` is very slow).

      if (typeof a !== "undefined") p = f(a);
      if (typeof b !== "undefined") p = f(b);
      if (typeof c !== "undefined") p = f(c);
      if (typeof d !== "undefined") p = f(d);
      if (typeof e !== "undefined") p = f(e);
      return p;
    };
  }; // () -> Promise Bool
  //   Not sure how to mock Swarm to test it properly. Ideas?


  var test = function test() {
    return Promise.resolve(true);
  }; // Uint8Array -> String


  var toString = function toString(uint8Array) {
    return bytes.toString(bytes.fromUint8Array(uint8Array));
  }; // String -> Uint8Array


  var fromString = function fromString(string) {
    return bytes.toUint8Array(bytes.fromString(string));
  }; // String -> SwarmAPI
  //   Fixes the `swarmUrl`, returning an API where you don't have to pass it.


  var at = function at(swarmUrl) {
    return {
      download: function download(hash, path) {
        return _download(swarmUrl)(hash)(path);
      },
      downloadData: uncurry(downloadData(swarmUrl)),
      downloadDataToDisk: uncurry(downloadDataToDisk(swarmUrl)),
      downloadDirectory: uncurry(downloadDirectory(swarmUrl)),
      downloadDirectoryToDisk: uncurry(downloadDirectoryToDisk(swarmUrl)),
      downloadEntries: uncurry(downloadEntries(swarmUrl)),
      downloadRoutes: uncurry(downloadRoutes(swarmUrl)),
      isAvailable: function isAvailable() {
        return _isAvailable(swarmUrl);
      },
      upload: function upload(arg) {
        return _upload(swarmUrl)(arg);
      },
      uploadData: uncurry(uploadData(swarmUrl)),
      uploadFile: uncurry(uploadFile(swarmUrl)),
      uploadFileFromDisk: uncurry(uploadFile(swarmUrl)),
      uploadDataFromDisk: uncurry(uploadDataFromDisk(swarmUrl)),
      uploadDirectory: uncurry(uploadDirectory(swarmUrl)),
      uploadDirectoryFromDisk: uncurry(uploadDirectoryFromDisk(swarmUrl)),
      uploadToManifest: uncurry(uploadToManifest(swarmUrl)),
      pick: pick,
      hash: hash,
      fromString: fromString,
      toString: toString
    };
  };

  return {
    at: at,
    local: local,
    download: _download,
    downloadBinary: downloadBinary,
    downloadData: downloadData,
    downloadDataToDisk: downloadDataToDisk,
    downloadDirectory: downloadDirectory,
    downloadDirectoryToDisk: downloadDirectoryToDisk,
    downloadEntries: downloadEntries,
    downloadRoutes: downloadRoutes,
    isAvailable: _isAvailable,
    startProcess: startProcess,
    stopProcess: stopProcess,
    upload: _upload,
    uploadData: uploadData,
    uploadDataFromDisk: uploadDataFromDisk,
    uploadFile: uploadFile,
    uploadFileFromDisk: uploadFileFromDisk,
    uploadDirectory: uploadDirectory,
    uploadDirectoryFromDisk: uploadDirectoryFromDisk,
    uploadToManifest: uploadToManifest,
    pick: pick,
    hash: hash,
    fromString: fromString,
    toString: toString
  };
};

/***/ }),

/***/ "s/21":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__("82c2");
var getPolyfill = __webpack_require__("G3+v");

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, {
		trim: function testTrim() {
			return String.prototype.trim !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ "vHQG":
/***/ (function(module, exports, __webpack_require__) {

var A = __webpack_require__("mqpt");

var at = function at(bytes, index) {
  return parseInt(bytes.slice(index * 2 + 2, index * 2 + 4), 16);
};

var random = function random(bytes) {
  var rnd = void 0;
  if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) rnd = window.crypto.getRandomValues(new Uint8Array(bytes));else if (true) rnd = __webpack_require__("HEbw").randomBytes(bytes);else {}
  var hex = "0x";
  for (var i = 0; i < bytes; ++i) {
    hex += ("00" + rnd[i].toString(16)).slice(-2);
  }return hex;
};

var length = function length(a) {
  return (a.length - 2) / 2;
};

var flatten = function flatten(a) {
  return "0x" + a.reduce(function (r, s) {
    return r + s.slice(2);
  }, "");
};

var slice = function slice(i, j, bs) {
  return "0x" + bs.slice(i * 2 + 2, j * 2 + 2);
};

var reverse = function reverse(hex) {
  var rev = "0x";
  for (var i = 0, l = length(hex); i < l; ++i) {
    rev += hex.slice((l - i) * 2, (l - i + 1) * 2);
  }
  return rev;
};

var pad = function pad(l, hex) {
  return hex.length === l * 2 + 2 ? hex : pad(l, "0x" + "0" + hex.slice(2));
};

var padRight = function padRight(l, hex) {
  return hex.length === l * 2 + 2 ? hex : padRight(l, hex + "0");
};

var toArray = function toArray(hex) {
  var arr = [];
  for (var i = 2, l = hex.length; i < l; i += 2) {
    arr.push(parseInt(hex.slice(i, i + 2), 16));
  }return arr;
};

var fromArray = function fromArray(arr) {
  var hex = "0x";
  for (var i = 0, l = arr.length; i < l; ++i) {
    var b = arr[i];
    hex += (b < 16 ? "0" : "") + b.toString(16);
  }
  return hex;
};

var toUint8Array = function toUint8Array(hex) {
  return new Uint8Array(toArray(hex));
};

var fromUint8Array = function fromUint8Array(arr) {
  return fromArray([].slice.call(arr, 0));
};

var fromNumber = function fromNumber(num) {
  var hex = num.toString(16);
  return hex.length % 2 === 0 ? "0x" + hex : "0x0" + hex;
};

var toNumber = function toNumber(hex) {
  return parseInt(hex.slice(2), 16);
};

var concat = function concat(a, b) {
  return a.concat(b.slice(2));
};

var fromNat = function fromNat(bn) {
  return bn === "0x0" ? "0x" : bn.length % 2 === 0 ? bn : "0x0" + bn.slice(2);
};

var toNat = function toNat(bn) {
  return bn[2] === "0" ? "0x" + bn.slice(3) : bn;
};

var fromAscii = function fromAscii(ascii) {
  var hex = "0x";
  for (var i = 0; i < ascii.length; ++i) {
    hex += ("00" + ascii.charCodeAt(i).toString(16)).slice(-2);
  }return hex;
};

var toAscii = function toAscii(hex) {
  var ascii = "";
  for (var i = 2; i < hex.length; i += 2) {
    ascii += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16));
  }return ascii;
};

// From https://gist.github.com/pascaldekloe/62546103a1576803dade9269ccf76330
var fromString = function fromString(s) {
  var makeByte = function makeByte(uint8) {
    var b = uint8.toString(16);
    return b.length < 2 ? "0" + b : b;
  };
  var bytes = "0x";
  for (var ci = 0; ci != s.length; ci++) {
    var c = s.charCodeAt(ci);
    if (c < 128) {
      bytes += makeByte(c);
      continue;
    }
    if (c < 2048) {
      bytes += makeByte(c >> 6 | 192);
    } else {
      if (c > 0xd7ff && c < 0xdc00) {
        if (++ci == s.length) return null;
        var c2 = s.charCodeAt(ci);
        if (c2 < 0xdc00 || c2 > 0xdfff) return null;
        c = 0x10000 + ((c & 0x03ff) << 10) + (c2 & 0x03ff);
        bytes += makeByte(c >> 18 | 240);
        bytes += makeByte(c >> 12 & 63 | 128);
      } else {
        // c <= 0xffff
        bytes += makeByte(c >> 12 | 224);
      }
      bytes += makeByte(c >> 6 & 63 | 128);
    }
    bytes += makeByte(c & 63 | 128);
  }
  return bytes;
};

var toString = function toString(bytes) {
  var s = '';
  var i = 0;
  var l = length(bytes);
  while (i < l) {
    var c = at(bytes, i++);
    if (c > 127) {
      if (c > 191 && c < 224) {
        if (i >= l) return null;
        c = (c & 31) << 6 | at(bytes, i) & 63;
      } else if (c > 223 && c < 240) {
        if (i + 1 >= l) return null;
        c = (c & 15) << 12 | (at(bytes, i) & 63) << 6 | at(bytes, ++i) & 63;
      } else if (c > 239 && c < 248) {
        if (i + 2 >= l) return null;
        c = (c & 7) << 18 | (at(bytes, i) & 63) << 12 | (at(bytes, ++i) & 63) << 6 | at(bytes, ++i) & 63;
      } else return null;
      ++i;
    }
    if (c <= 0xffff) s += String.fromCharCode(c);else if (c <= 0x10ffff) {
      c -= 0x10000;
      s += String.fromCharCode(c >> 10 | 0xd800);
      s += String.fromCharCode(c & 0x3FF | 0xdc00);
    } else return null;
  }
  return s;
};

module.exports = {
  random: random,
  length: length,
  concat: concat,
  flatten: flatten,
  slice: slice,
  reverse: reverse,
  pad: pad,
  padRight: padRight,
  fromAscii: fromAscii,
  toAscii: toAscii,
  fromString: fromString,
  toString: toString,
  fromNumber: fromNumber,
  toNumber: toNumber,
  fromNat: fromNat,
  toNat: toNat,
  fromArray: fromArray,
  toArray: toArray,
  fromUint8Array: fromUint8Array,
  toUint8Array: toUint8Array
};

/***/ }),

/***/ "yQtW":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, Buffer, global) {var capability = __webpack_require__("qfHW")
var inherits = __webpack_require__("P7XM")
var stream = __webpack_require__("43KI")

var rStates = exports.readyStates = {
	UNSENT: 0,
	OPENED: 1,
	HEADERS_RECEIVED: 2,
	LOADING: 3,
	DONE: 4
}

var IncomingMessage = exports.IncomingMessage = function (xhr, response, mode, fetchTimer) {
	var self = this
	stream.Readable.call(self)

	self._mode = mode
	self.headers = {}
	self.rawHeaders = []
	self.trailers = {}
	self.rawTrailers = []

	// Fake the 'close' event, but only once 'end' fires
	self.on('end', function () {
		// The nextTick is necessary to prevent the 'request' module from causing an infinite loop
		process.nextTick(function () {
			self.emit('close')
		})
	})

	if (mode === 'fetch') {
		self._fetchResponse = response

		self.url = response.url
		self.statusCode = response.status
		self.statusMessage = response.statusText
		
		response.headers.forEach(function (header, key){
			self.headers[key.toLowerCase()] = header
			self.rawHeaders.push(key, header)
		})

		if (capability.writableStream) {
			var writable = new WritableStream({
				write: function (chunk) {
					return new Promise(function (resolve, reject) {
						if (self._destroyed) {
							reject()
						} else if(self.push(new Buffer(chunk))) {
							resolve()
						} else {
							self._resumeFetch = resolve
						}
					})
				},
				close: function () {
					global.clearTimeout(fetchTimer)
					if (!self._destroyed)
						self.push(null)
				},
				abort: function (err) {
					if (!self._destroyed)
						self.emit('error', err)
				}
			})

			try {
				response.body.pipeTo(writable).catch(function (err) {
					global.clearTimeout(fetchTimer)
					if (!self._destroyed)
						self.emit('error', err)
				})
				return
			} catch (e) {} // pipeTo method isn't defined. Can't find a better way to feature test this
		}
		// fallback for when writableStream or pipeTo aren't available
		var reader = response.body.getReader()
		function read () {
			reader.read().then(function (result) {
				if (self._destroyed)
					return
				if (result.done) {
					global.clearTimeout(fetchTimer)
					self.push(null)
					return
				}
				self.push(new Buffer(result.value))
				read()
			}).catch(function (err) {
				global.clearTimeout(fetchTimer)
				if (!self._destroyed)
					self.emit('error', err)
			})
		}
		read()
	} else {
		self._xhr = xhr
		self._pos = 0

		self.url = xhr.responseURL
		self.statusCode = xhr.status
		self.statusMessage = xhr.statusText
		var headers = xhr.getAllResponseHeaders().split(/\r?\n/)
		headers.forEach(function (header) {
			var matches = header.match(/^([^:]+):\s*(.*)/)
			if (matches) {
				var key = matches[1].toLowerCase()
				if (key === 'set-cookie') {
					if (self.headers[key] === undefined) {
						self.headers[key] = []
					}
					self.headers[key].push(matches[2])
				} else if (self.headers[key] !== undefined) {
					self.headers[key] += ', ' + matches[2]
				} else {
					self.headers[key] = matches[2]
				}
				self.rawHeaders.push(matches[1], matches[2])
			}
		})

		self._charset = 'x-user-defined'
		if (!capability.overrideMimeType) {
			var mimeType = self.rawHeaders['mime-type']
			if (mimeType) {
				var charsetMatch = mimeType.match(/;\s*charset=([^;])(;|$)/)
				if (charsetMatch) {
					self._charset = charsetMatch[1].toLowerCase()
				}
			}
			if (!self._charset)
				self._charset = 'utf-8' // best guess
		}
	}
}

inherits(IncomingMessage, stream.Readable)

IncomingMessage.prototype._read = function () {
	var self = this

	var resolve = self._resumeFetch
	if (resolve) {
		self._resumeFetch = null
		resolve()
	}
}

IncomingMessage.prototype._onXHRProgress = function () {
	var self = this

	var xhr = self._xhr

	var response = null
	switch (self._mode) {
		case 'text:vbarray': // For IE9
			if (xhr.readyState !== rStates.DONE)
				break
			try {
				// This fails in IE8
				response = new global.VBArray(xhr.responseBody).toArray()
			} catch (e) {}
			if (response !== null) {
				self.push(new Buffer(response))
				break
			}
			// Falls through in IE8	
		case 'text':
			try { // This will fail when readyState = 3 in IE9. Switch mode and wait for readyState = 4
				response = xhr.responseText
			} catch (e) {
				self._mode = 'text:vbarray'
				break
			}
			if (response.length > self._pos) {
				var newData = response.substr(self._pos)
				if (self._charset === 'x-user-defined') {
					var buffer = new Buffer(newData.length)
					for (var i = 0; i < newData.length; i++)
						buffer[i] = newData.charCodeAt(i) & 0xff

					self.push(buffer)
				} else {
					self.push(newData, self._charset)
				}
				self._pos = response.length
			}
			break
		case 'arraybuffer':
			if (xhr.readyState !== rStates.DONE || !xhr.response)
				break
			response = xhr.response
			self.push(new Buffer(new Uint8Array(response)))
			break
		case 'moz-chunked-arraybuffer': // take whole
			response = xhr.response
			if (xhr.readyState !== rStates.LOADING || !response)
				break
			self.push(new Buffer(new Uint8Array(response)))
			break
		case 'ms-stream':
			response = xhr.response
			if (xhr.readyState !== rStates.LOADING)
				break
			var reader = new global.MSStreamReader()
			reader.onprogress = function () {
				if (reader.result.byteLength > self._pos) {
					self.push(new Buffer(new Uint8Array(reader.result.slice(self._pos))))
					self._pos = reader.result.byteLength
				}
			}
			reader.onload = function () {
				self.push(null)
			}
			// reader.onerror = ??? // TODO: this
			reader.readAsArrayBuffer(response)
			break
	}

	// The ms-stream case handles end separately in reader.onload()
	if (self._xhr.readyState === rStates.DONE && self._mode !== 'ms-stream') {
		self.push(null)
	}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("8oxB"), __webpack_require__("HDXh").Buffer, __webpack_require__("yLpj")))

/***/ }),

/***/ "yp9T":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__("D3zA");
var define = __webpack_require__("82c2");

var implementation = __webpack_require__("Vi6U");
var getPolyfill = __webpack_require__("G3+v");
var shim = __webpack_require__("s/21");

var boundTrim = bind.call(Function.call, getPolyfill());

define(boundTrim, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundTrim;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2pjbC9zamNsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHJlYW0tYnJvd3NlcmlmeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3dhcm0tanMvbGliL3BpY2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2VjcDI1NmsxL3JmYzY5NzkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0cmluZy5wcm90b3R5cGUudHJpbS9wb2x5ZmlsbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zZWNwMjU2azEvanMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N3YXJtLWpzL2xpYi9hcGktYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGV4dC1lbmNvZGluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGV4dC1lbmNvZGluZy9saWIvZW5jb2RpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RpbWVycy1icm93c2VyaWZ5L21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0cmluZy5wcm90b3R5cGUudHJpbS9pbXBsZW1lbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3RyaWN0LXVyaS1lbmNvZGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N3YXJtLWpzL2xpYi9zd2FybS1oYXNoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHJpcC1oZXgtcHJlZml4L3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGltZXJzLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3NldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0cmVhbS1odHRwL2xpYi9yZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHJlYW0taHR0cC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3dhcm0tanMvbm9kZV9tb2R1bGVzL2V0aC1saWIvbGliL2FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zd2FybS1qcy9ub2RlX21vZHVsZXMvZXRoLWxpYi9saWIvaGFzaC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3RyZWFtLWh0dHAvbGliL2NhcGFiaWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N3YXJtLWpzL2xpYi9zd2FybS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3RyaW5nLnByb3RvdHlwZS50cmltL3NoaW0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N3YXJtLWpzL25vZGVfbW9kdWxlcy9ldGgtbGliL2xpYi9ieXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3RyZWFtLWh0dHAvbGliL3Jlc3BvbnNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHJpbmcucHJvdG90eXBlLnRyaW0vaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsZ0VBQWEsVUFBVSxTQUFTLFFBQVEsZUFBZSxRQUFRLFFBQVEsU0FBUyxZQUFZLG9CQUFvQix5QkFBeUIsZ0NBQWdDLGVBQWUscUJBQXFCLHlCQUF5QixnQ0FBZ0MsZUFBZSxpQkFBaUIseUJBQXlCLDRCQUE0QixlQUFlLHNCQUFzQix5QkFBeUIsa0NBQWtDO0FBQzNiLDRCQUE0QiwwQkFBMEIsdUNBQXVDLFdBQVcsUUFBUSxnRkFBZ0YsMkJBQTJCLFFBQVEsU0FBUyxLQUFLLFNBQVMscUlBQXFJLGNBQWMsUUFBUSxFQUFFO0FBQ3ZaO0FBQ0EsMkJBQTJCLG9CQUFvQixtQkFBbUIscUJBQXFCLG1CQUFtQixvREFBb0Qsa0VBQWtFLFFBQVEsUUFBUSxrQ0FBa0MsVUFBVSxNQUFNLHNLQUFzSyxJQUFJLGdEQUFnRDtBQUM1ZixFQUFFLElBQUk7QUFDTixrQkFBa0IsMkVBQTJFLHFEQUFxRCxnQkFBZ0IsMkNBQTJDLFNBQVMsT0FBTyxnQ0FBZ0MsUUFBUSxJQUFJLHVPQUF1TztBQUNoZixFQUFFLElBQUksa0dBQWtHO0FBQ3hHLGVBQWUseUJBQXlCLG9EQUFvRCwrQ0FBK0MseUJBQXlCLDBCQUEwQiw2RUFBNkUsc0JBQXNCLGlEQUFpRCxrREFBa0QseUVBQXlFLHVCQUF1QixlQUFlO0FBQ25mLDhDQUE4QyxxQkFBcUIsMEJBQTBCLDZCQUE2QixlQUFlLE9BQU8sbUVBQW1FLFNBQVMseUJBQXlCLGdEQUFnRCx3QkFBd0IsdUNBQXVDLHFCQUFxQixvRUFBb0UsVUFBVSxRQUFRLFdBQVcsaUJBQWlCO0FBQzNlLEVBQUUscUJBQXFCLE1BQU0sSUFBSSx1QkFBdUIsTUFBTSxvQkFBb0IsNEJBQTRCLFFBQVEsV0FBVyxvQ0FBb0MsMkJBQTJCLDhCQUE4Qix5REFBeUQsU0FBUyxpQkFBaUIsZ0RBQWdELHVCQUF1QixRQUFRLFFBQVEsV0FBVyx3REFBd0Q7QUFDM2MsdUJBQXVCLHFCQUFxQiwwQ0FBMEMsUUFBUSxNQUFNLHNFQUFzRSxxQ0FBcUMsb0JBQW9CLGtDQUFrQyxlQUFlLFFBQVEsV0FBVyxzREFBc0QsOENBQThDO0FBQzNZLGdCQUFnQixxQkFBcUIsV0FBVyxRQUFRLFdBQVcsd0RBQXdELGdEQUFnRCxvQkFBb0IsYUFBYSx5QkFBeUIsV0FBVyxlQUFlLFFBQVEsV0FBVywwQ0FBMEM7QUFDNVQsbUJBQW1CLCtIQUErSCwySEFBMkgsMkJBQTJCLFFBQVEsYUFBYSx1RUFBdUUsS0FBSyxlQUFlLFFBQVEsU0FBUyxzQkFBc0Isc0NBQXNDO0FBQ3JlLHlHQUF5Ryx5Q0FBeUMsUUFBUSxXQUFXLEtBQUsseUJBQXlCLFFBQVEsVUFBVSxzQ0FBc0MsVUFBVSx1REFBdUQscURBQXFELDhDQUE4QztBQUMvWixzQkFBc0IsdUJBQXVCLHlDQUF5QyxvQkFBb0I7QUFDMUcsbUJBQW1CLDhGQUE4RixvRUFBb0UsMkJBQTJCLFFBQVEsYUFBYSx5RUFBeUUsS0FBSyxlQUFlLFFBQVEsU0FBUyxzQkFBc0Isd0JBQXdCLDJDQUEyQywyQkFBMkIsUUFBUSxXQUFXLEtBQUs7QUFDL2QsOERBQThELHlEQUF5RCw4Q0FBOEMsV0FBVyxzQkFBc0IscUJBQXFCLHlDQUF5QyxvQkFBb0IsdUNBQXVDLDZCQUE2QixvQkFBb0IscUVBQXFFLGtDQUFrQztBQUN2ZCw0QkFBNEIsK0JBQStCLHVCQUF1QixVQUFVLFNBQVMsWUFBWSxvQkFBb0IseURBQXlELDhDQUE4QyxTQUFTLHNDQUFzQyw4RkFBOEYscUNBQXFDLDZCQUE2QiwwQkFBMEIsS0FBSztBQUMxZCxnQkFBZ0IsaUJBQWlCLCtCQUErQixLQUFLLDhCQUE4QixZQUFZLHFCQUFxQiwrRUFBK0UsaUJBQWlCLEtBQUssY0FBYyx1Q0FBdUMscUJBQXFCLFNBQVMsd0JBQXdCLGFBQWEsU0FBUyx3QkFBd0IsY0FBYyx1Q0FBdUMsb0JBQW9CLEtBQUssS0FBSyxLQUFLLFFBQVEsT0FBTyxnQkFBZ0I7QUFDemYsR0FBRyxNQUFNO0FBQ1QsZ0JBQWdCLDhFQUE4RSxRQUFRLEtBQUssdVNBQXVTLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWM7QUFDcGY7QUFDQSxlQUFlLDJDQUEyQyx3QkFBd0IsOEJBQThCLDZCQUE2QixrQ0FBa0MsZ0JBQWdCLGdDQUFnQyxRQUFRLFdBQVcsYUFBYSw2QkFBNkIseUVBQXlFLFFBQVEsUUFBUSw0RUFBNEUsUUFBUSxhQUFhLEtBQUssaUJBQWlCO0FBQzVlLFVBQVUsK0JBQStCLCtCQUErQiw4QkFBOEIsNkJBQTZCLFFBQVEsUUFBUSx1R0FBdUcsNEVBQTRFLFFBQVEsYUFBYSxLQUFLLGlCQUFpQixzQkFBc0IsK0JBQStCLG9DQUFvQztBQUMxYyxjQUFjLDBCQUEwQiwrQkFBK0IsNENBQTRDLGdCQUFnQixRQUFRLGVBQWUsMklBQTJJLFdBQVcsc0RBQXNELFNBQVMseUJBQXlCLDBCQUEwQixLQUFLO0FBQ3ZhLG1IQUFtSCwrQ0FBK0MsUUFBUSxXQUFXLHNEQUFzRCxzQkFBc0IseUJBQXlCLHNCQUFzQixNQUFNLDJDQUEyQyw0REFBNEQsb0NBQW9DLGFBQWEsZUFBZSxRQUFRLElBQUk7QUFDemUsaUZBQWlGLE9BQU87QUFDeEYsZ0JBQWdCLDBDQUEwQyxnR0FBZ0csMkRBQTJELGtCQUFrQixXQUFXLFFBQVEsUUFBUSxRQUFRLGFBQWEseUVBQXlFLGFBQWEsaUJBQWlCLDRCQUE0QixvQ0FBb0MsOEJBQThCO0FBQzVkLGdEQUFnRCwwQ0FBMEMsK0JBQStCLGdHQUFnRyxRQUFRLG1IQUFtSCxRQUFRLFFBQVEsU0FBUyx5RUFBeUUsU0FBUyw0QkFBNEI7QUFDM2QsT0FBTyxTQUFTLDRCQUE0QixnREFBZ0QscUdBQXFHLDhCQUE4QixvQkFBb0IsaUdBQWlHLFFBQVEsYUFBYSxrREFBa0QsYUFBYSxvRUFBb0U7QUFDNWUsb0NBQW9DLGVBQWU7QUFDbkQsZUFBZSx1Q0FBdUMsaUJBQWlCLGdCQUFnQixRQUFRLHFDQUFxQyw4QkFBOEIsNkJBQTZCLGtEQUFrRCxTQUFTLFFBQVEsNERBQTRELGdDQUFnQyxnRkFBZ0YsY0FBYyxrQkFBa0IsZ0NBQWdDO0FBQzllLEtBQUssYUFBYSxRQUFRLE1BQU0sS0FBSyxxREFBcUQsZUFBZSxRQUFRLElBQUksaUNBQWlDLFVBQVUsdUJBQXVCLFNBQVMsbUJBQW1CLGlCQUFpQixhQUFhLFFBQVEsSUFBSSwySEFBMkgsU0FBUyx5QkFBeUIsb0NBQW9DLFdBQVcsaUJBQWlCLGlCQUFpQjtBQUMzZSx1QkFBdUIsK0lBQStJLGlDQUFpQyxhQUFhLGFBQWEsOEJBQThCLFFBQVEsSUFBSSw2RUFBNkUsZUFBZSw4QkFBOEIsa0ZBQWtGLHlCQUF5QjtBQUNoZixXQUFXLFdBQVcsV0FBVyxXQUFXLE9BQU8sZ0NBQWdDLDZCQUE2Qiw2QkFBNkIsMkNBQTJDLHFCQUFxQiwwQkFBMEIsUUFBUSxJQUFJLG1EQUFtRCx1QkFBdUIsdUJBQXVCO0FBQ3BWLDBFQUEwRSx1RkFBdUYsZUFBZSx1QkFBdUIsMENBQTBDLDZCQUE2QixZQUFZLDRDQUE0QyxXQUFXLGtCQUFrQiwyQ0FBMkMsdUVBQXVFLGFBQWE7QUFDbGUscUNBQXFDLFNBQVMseUVBQXlFLHlEQUF5RCx5REFBeUQsb0JBQW9CLFdBQVcsaUNBQWlDLFFBQVEsbUJBQW1CLEtBQUssK0JBQStCLFFBQVEsSUFBSSwyQkFBMkIsV0FBVyxlQUFlLGNBQWMsb0JBQW9CO0FBQzNjLHNCQUFzQiw4QkFBOEIsV0FBVyxTQUFTLFVBQVUsU0FBUyxVQUFVLCtCQUErQix5QkFBeUIsaUJBQWlCLGNBQWMsU0FBUyxVQUFVLFFBQVEsV0FBVyxZQUFZLGlCQUFpQixTQUFTLFNBQVMsZ0JBQWdCLG1EQUFtRCxZQUFZO0FBQ2hXLHFCQUFxQiwwQkFBMEIsV0FBVyxrQkFBa0IsTUFBTSwwRUFBMEUsYUFBYSxjQUFjLEtBQUssVUFBVSx5Q0FBeUMsUUFBUSxLQUFLLHdDQUF3QyxRQUFRLCtGQUErRixLQUFLLDZFQUE2RSxVQUFVO0FBQ3ZlLEdBQUcsU0FBUywrQ0FBK0MsbUNBQW1DLFFBQVEsMENBQTBDLE1BQU0sUUFBUSxJQUFJLHNFQUFzRSxRQUFRLG9CQUFvQixrQ0FBa0Msc0RBQXNELDJHQUEyRywyQkFBMkIsU0FBUztBQUMzZSxLQUFLLFlBQVksZ0VBQWdFLFlBQVksb0NBQW9DLDRCQUE0QixzQ0FBc0MsaUJBQWlCLGdDQUFnQywyQ0FBMkMsTUFBTSxrREFBa0QsK0JBQStCLEtBQUssUUFBUSxXQUFXLGlCQUFpQixJQUFJLHlDQUF5QyxlQUFlO0FBQzNkLE1BQU0sT0FBTyx3QkFBd0IsV0FBVyxlQUFlLElBQUksYUFBYSx3REFBd0QsTUFBTSx1Q0FBdUMsOENBQThDLG9CQUFvQixNQUFNLFlBQVkseUdBQXlHLGFBQWEsVUFBVSw0R0FBNEc7QUFDcmYsb0JBQW9CLDhCQUE4Qiw0SEFBNEgseUJBQXlCLHFCQUFxQix1Q0FBdUMsNEJBQTRCLFlBQVksUUFBUSwwS0FBMEs7QUFDN2Qsa1NBQWtTLHlNQUF5TTtBQUMzZSxXQUFXLDJCQUEyQjtBQUN0Qyw2RkFBNkYsZ0NBQWdDLHVCQUF1QixtQ0FBbUMseUJBQXlCLG9EQUFvRCxRQUFRLFdBQVcsdUJBQXVCLGVBQWUsVUFBVSxnQkFBZ0IsUUFBUSxJQUFJLDhEQUE4RCxTQUFTLE1BQU0sNkNBQTZDLFVBQVUsZ0JBQWdCO0FBQ3ZmLGtDQUFrQyxtRUFBbUUsVUFBVSxlQUFlLFVBQVUsZ0JBQWdCLHVHQUF1Ryx1QkFBdUIseUJBQXlCLDBEQUEwRCx3Q0FBd0M7QUFDalosZ0JBQWdCLDhCQUE4Qiw2Q0FBNkMsUUFBUSxXQUFXLFlBQVksZ0JBQWdCLGdNQUFnTSxjQUFjLHNCQUFzQiw2QkFBNkIsY0FBYyxZQUFZLGlDQUFpQyxLQUFLO0FBQzNjLGdCQUFnQixrQkFBa0Isc0JBQXNCO0FBQ3hELE1BQU0sWUFBWSxLQUFLLEtBQTJCLGtCQUFrQixNQUFNLElBQUksRUFBRSxtQkFBTyxDQUFDLE1BQVEsRUFBRSxTQUFTLE9BQU8sTUFBTSw4SUFBOEksdUVBQXVFLHNCQUFzQixpRkFBaUY7QUFDcGIsYUFBYSw0REFBNEQsU0FBUztBQUNsRixXQUFXLFVBQVUsMkRBQTJELHNCQUFzQixRQUFRLFFBQVEsdUJBQXVCLGdDQUFnQyxlQUFlLFNBQVMsVUFBVSxvRUFBb0UsOERBQThEO0FBQ2pWLG1GQUFtRixrTUFBa00seURBQXlELGlFQUFpRSwrQkFBK0IsU0FBUyxRQUFRO0FBQy9iLGtIQUFrSCxTQUFTLDJCQUEyQiwwQ0FBMEMsbUJBQW1CLHNCQUFzQixRQUFRLFFBQVEsZ0JBQWdCLGdCQUFnQixzQkFBc0IsUUFBUSxVQUFVLG9FQUFvRSw4REFBOEQ7QUFDbmMsd01BQXdNLCtNQUErTSx5REFBeUQsK0JBQStCO0FBQy9lLGlMQUFpTCxTQUFTLFFBQVEscURBQXFELDJCQUEyQixnQkFBZ0IsK0JBQStCLG9CQUFvQixVQUFVLE9BQU8sbUNBQW1DLG1HQUFtRztBQUM1ZSxPQUFPLE1BQU0sb0JBQW9CLHFDQUFxQyxNQUFNLHNDQUFzQyxNQUFNLDREQUE0RCxNQUFNLHdFQUF3RSxXQUFXLEVBQUUsb0JBQW9CLHNCQUFzQixnQkFBZ0IsSUFBSSxzRUFBc0UsZ0JBQWdCLEdBQUcsbUJBQW1CLFFBQVEsS0FBSyxRQUFRLFdBQVcsS0FBSztBQUM5ZCw2S0FBNkssU0FBUyxtQkFBbUIsaUJBQWlCLEVBQUUsdUJBQXVCLHVDQUF1QyxtR0FBbUcsVUFBVSxTQUFTLGtCQUFrQixRQUFRLEdBQUcseURBQXlELFNBQVM7QUFDL2UsR0FBRyxRQUFRLEdBQUcsUUFBUSxXQUFXLHdDQUF3QyxXQUFXLCtCQUErQiwrQkFBK0IsZ0JBQWdCLHFDQUFxQyxxQkFBcUIsUUFBUSxjQUFjLGdCQUFnQixjQUFjLDhFQUE4RSxxQ0FBcUMsd0NBQXdDLE9BQU87QUFDbGIsS0FBMkIsd0NBQXdDLEtBQTBCLEVBQUUsaUNBQU8sRUFBRSxtQ0FBQyxXQUFXLFlBQVk7QUFBQSxvR0FBQzs7Ozs7Ozs7QUMzRGpJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBUyxtQkFBTyxDQUFDLE1BQVE7QUFDekIsZUFBZSxtQkFBTyxDQUFDLE1BQVU7O0FBRWpDO0FBQ0Esa0JBQWtCLG1CQUFPLENBQUMsTUFBNkI7QUFDdkQsa0JBQWtCLG1CQUFPLENBQUMsTUFBNkI7QUFDdkQsZ0JBQWdCLG1CQUFPLENBQUMsTUFBMkI7QUFDbkQsbUJBQW1CLG1CQUFPLENBQUMsTUFBOEI7QUFDekQscUJBQXFCLG1CQUFPLENBQUMsTUFBZ0M7O0FBRTdEO0FBQ0E7Ozs7QUFJQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7OztBQzlIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7OztBQ2hFQSxpRUFBbUIsbUJBQU8sQ0FBQyxNQUFhOztBQUV4QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUM3RGE7O0FBRWIscUJBQXFCLG1CQUFPLENBQUMsTUFBa0I7O0FBRS9DOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNYQSx5REFBVyxtQkFBTyxDQUFDLE1BQU87QUFDMUIsV0FBVyxtQkFBTyxDQUFDLE1BQVU7QUFDN0I7QUFDQSwrQkFBK0IsbUJBQU8sQ0FBQyxNQUFXOztBQUVsRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLGdCQUFnQixZQUFZLGVBQWU7QUFDcEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5QkFBeUI7QUFDekIsdUJBQXVCO0FBQ3ZCLHlCQUF5QjtBQUN6QixxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ25SQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsbUJBQU8sQ0FBQyxNQUFxQjs7QUFFM0MsWUFBWSxtQkFBTyxDQUFDLE1BQW1COztBQUV2QyxXQUFXLG1CQUFPLENBQUMsTUFBaUI7O0FBRXBDLFdBQVcsbUJBQU8sQ0FBQyxNQUFXOztBQUU5QixZQUFZLG1CQUFPLENBQUMsTUFBUzs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEU7Ozs7Ozs7QUNwREQ7QUFDQTs7QUFFQSxlQUFlLG1CQUFPLENBQUMsTUFBbUI7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ1JBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNLEtBQTZCO0FBQ25DO0FBQ0E7QUFDQSxNQUFNLG1CQUFPLENBQUMsTUFBdUI7QUFDckM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsY0FBYyxRQUFRO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSxXQUFXO0FBQ3hCLGFBQWEsRUFBRTtBQUNmLGNBQWMsUUFBUTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGFBQWEsRUFBRTtBQUNmLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLE9BQU87QUFDcEIsY0FBYyxnQkFBZ0I7QUFDOUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSxnQkFBZ0I7QUFDN0IsY0FBYyxPQUFPO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix3QkFBd0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixjQUFjLFFBQVE7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsNkJBQTZCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLGVBQWUsZ0JBQWdCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHlCQUF5QjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixnQkFBZ0I7QUFDL0M7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSx5QkFBeUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsZ0JBQWdCO0FBQy9DO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLE9BQU87QUFDcEIsY0FBYyxPQUFPO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixnQkFBZ0IsMEJBQTBCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGdCQUFnQix5QkFBeUI7QUFDekM7QUFDQTtBQUNBOztBQUVBOztBQUVBLDBDQUEwQztBQUMxQzs7QUFFQTtBQUNBLGFBQWEsT0FBTztBQUNwQixjQUFjLEVBQUU7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQSxpQ0FBaUMsa0NBQWtDO0FBQ25FLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLGdCQUFnQixrQ0FBa0MsRUFBRTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0EsYUFBYSwwQkFB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Q0E7QUFDQTtBQUNBLGVBQWUsZ0JBQWdCO0FBQy9CO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEIsY0FBYyxnQkFBZ0I7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCLG1CQUFtQixPQUFPO0FBQzFCLG1CQUFtQixPQUFPO0FBQzFCLG1CQUFtQixRQUFRO0FBQzNCO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixnQkFBZ0IsMEJBQTBCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQixjQUFjLGdCQUFnQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZ0JBQWdCLHlCQUF5QjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlLGdCQUFnQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQSxlQUFlLGdCQUFnQjtBQUMvQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLGNBQWMsZ0JBQWdCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZ0JBQWdCLDBCQUEwQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNB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QUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQzs7QUFFcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLE9BQU87QUFDNUM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7O0FDbFZBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7O0FBR0E7QUFDQTtBQUNBOztBQUVBLHNDQUFzQyxPQUFPO0FBQzdDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7OztBQUdKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLHFDQUFxQyxPQUFPO0FBQzVDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTs7O0FBR0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsSUFBSSxrQkFBa0I7QUFDdEIsa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQy9OYTs7QUFFYixXQUFXLG1CQUFPLENBQUMsTUFBZTtBQUNsQyxhQUFhLG1CQUFPLENBQUMsTUFBbUI7O0FBRXhDLHFCQUFxQixtQkFBTyxDQUFDLE1BQWtCO0FBQy9DLGtCQUFrQixtQkFBTyxDQUFDLE1BQVk7QUFDdEMsV0FBVyxtQkFBTyxDQUFDLE1BQVE7O0FBRTNCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCIsImZpbGUiOiJ2ZW5kb3J+ZWM4YzQyN2UuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7dmFyIHNqY2w9e2NpcGhlcjp7fSxoYXNoOnt9LGtleWV4Y2hhbmdlOnt9LG1vZGU6e30sbWlzYzp7fSxjb2RlYzp7fSxleGNlcHRpb246e2NvcnJ1cHQ6ZnVuY3Rpb24oYSl7dGhpcy50b1N0cmluZz1mdW5jdGlvbigpe3JldHVyblwiQ09SUlVQVDogXCIrdGhpcy5tZXNzYWdlfTt0aGlzLm1lc3NhZ2U9YX0saW52YWxpZDpmdW5jdGlvbihhKXt0aGlzLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuXCJJTlZBTElEOiBcIit0aGlzLm1lc3NhZ2V9O3RoaXMubWVzc2FnZT1hfSxidWc6ZnVuY3Rpb24oYSl7dGhpcy50b1N0cmluZz1mdW5jdGlvbigpe3JldHVyblwiQlVHOiBcIit0aGlzLm1lc3NhZ2V9O3RoaXMubWVzc2FnZT1hfSxub3RSZWFkeTpmdW5jdGlvbihhKXt0aGlzLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuXCJOT1QgUkVBRFk6IFwiK3RoaXMubWVzc2FnZX07dGhpcy5tZXNzYWdlPWF9fX07XG5zamNsLmNpcGhlci5hZXM9ZnVuY3Rpb24oYSl7dGhpcy5zWzBdWzBdWzBdfHx0aGlzLk8oKTt2YXIgYixjLGQsZSxmPXRoaXMuc1swXVs0XSxnPXRoaXMuc1sxXTtiPWEubGVuZ3RoO3ZhciBoPTE7aWYoNCE9PWImJjYhPT1iJiY4IT09Yil0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImludmFsaWQgYWVzIGtleSBzaXplXCIpO3RoaXMuYj1bZD1hLnNsaWNlKDApLGU9W11dO2ZvcihhPWI7YTw0KmIrMjg7YSsrKXtjPWRbYS0xXTtpZigwPT09YSVifHw4PT09YiYmND09PWElYiljPWZbYz4+PjI0XTw8MjReZltjPj4xNiYyNTVdPDwxNl5mW2M+PjgmMjU1XTw8OF5mW2MmMjU1XSwwPT09YSViJiYoYz1jPDw4XmM+Pj4yNF5oPDwyNCxoPWg8PDFeMjgzKihoPj43KSk7ZFthXT1kW2EtYl1eY31mb3IoYj0wO2E7YisrLGEtLSljPWRbYiYzP2E6YS00XSxlW2JdPTQ+PWF8fDQ+Yj9jOmdbMF1bZltjPj4+MjRdXV5nWzFdW2ZbYz4+MTYmMjU1XV1eZ1syXVtmW2M+PjgmMjU1XV1eZ1szXVtmW2MmXG4yNTVdXX07XG5zamNsLmNpcGhlci5hZXMucHJvdG90eXBlPXtlbmNyeXB0OmZ1bmN0aW9uKGEpe3JldHVybiB0KHRoaXMsYSwwKX0sZGVjcnlwdDpmdW5jdGlvbihhKXtyZXR1cm4gdCh0aGlzLGEsMSl9LHM6W1tbXSxbXSxbXSxbXSxbXV0sW1tdLFtdLFtdLFtdLFtdXV0sTzpmdW5jdGlvbigpe3ZhciBhPXRoaXMuc1swXSxiPXRoaXMuc1sxXSxjPWFbNF0sZD1iWzRdLGUsZixnLGg9W10saz1bXSxsLG4sbSxwO2ZvcihlPTA7MHgxMDA+ZTtlKyspa1soaFtlXT1lPDwxXjI4MyooZT4+NykpXmVdPWU7Zm9yKGY9Zz0wOyFjW2ZdO2ZePWx8fDEsZz1rW2ddfHwxKWZvcihtPWdeZzw8MV5nPDwyXmc8PDNeZzw8NCxtPW0+PjhebSYyNTVeOTksY1tmXT1tLGRbbV09ZixuPWhbZT1oW2w9aFtmXV1dLHA9MHgxMDEwMTAxKm5eMHgxMDAwMSplXjB4MTAxKmxeMHgxMDEwMTAwKmYsbj0weDEwMSpoW21dXjB4MTAxMDEwMCptLGU9MDs0PmU7ZSsrKWFbZV1bZl09bj1uPDwyNF5uPj4+OCxiW2VdW21dPXA9cDw8MjRecD4+Pjg7Zm9yKGU9XG4wOzU+ZTtlKyspYVtlXT1hW2VdLnNsaWNlKDApLGJbZV09YltlXS5zbGljZSgwKX19O1xuZnVuY3Rpb24gdChhLGIsYyl7aWYoNCE9PWIubGVuZ3RoKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwiaW52YWxpZCBhZXMgYmxvY2sgc2l6ZVwiKTt2YXIgZD1hLmJbY10sZT1iWzBdXmRbMF0sZj1iW2M/MzoxXV5kWzFdLGc9YlsyXV5kWzJdO2I9YltjPzE6M11eZFszXTt2YXIgaCxrLGwsbj1kLmxlbmd0aC80LTIsbSxwPTQscj1bMCwwLDAsMF07aD1hLnNbY107YT1oWzBdO3ZhciBxPWhbMV0sdj1oWzJdLHc9aFszXSx4PWhbNF07Zm9yKG09MDttPG47bSsrKWg9YVtlPj4+MjRdXnFbZj4+MTYmMjU1XV52W2c+PjgmMjU1XV53W2ImMjU1XV5kW3BdLGs9YVtmPj4+MjRdXnFbZz4+MTYmMjU1XV52W2I+PjgmMjU1XV53W2UmMjU1XV5kW3ArMV0sbD1hW2c+Pj4yNF1ecVtiPj4xNiYyNTVdXnZbZT4+OCYyNTVdXndbZiYyNTVdXmRbcCsyXSxiPWFbYj4+PjI0XV5xW2U+PjE2JjI1NV1edltmPj44JjI1NV1ed1tnJjI1NV1eZFtwKzNdLHArPTQsZT1oLGY9ayxnPWw7Zm9yKG09XG4wOzQ+bTttKyspcltjPzMmLW06bV09eFtlPj4+MjRdPDwyNF54W2Y+PjE2JjI1NV08PDE2XnhbZz4+OCYyNTVdPDw4XnhbYiYyNTVdXmRbcCsrXSxoPWUsZT1mLGY9ZyxnPWIsYj1oO3JldHVybiByfVxuc2pjbC5iaXRBcnJheT17Yml0U2xpY2U6ZnVuY3Rpb24oYSxiLGMpe2E9c2pjbC5iaXRBcnJheS4kKGEuc2xpY2UoYi8zMiksMzItKGImMzEpKS5zbGljZSgxKTtyZXR1cm4gdm9pZCAwPT09Yz9hOnNqY2wuYml0QXJyYXkuY2xhbXAoYSxjLWIpfSxleHRyYWN0OmZ1bmN0aW9uKGEsYixjKXt2YXIgZD1NYXRoLmZsb29yKC1iLWMmMzEpO3JldHVybigoYitjLTFeYikmLTMyP2FbYi8zMnwwXTw8MzItZF5hW2IvMzIrMXwwXT4+PmQ6YVtiLzMyfDBdPj4+ZCkmKDE8PGMpLTF9LGNvbmNhdDpmdW5jdGlvbihhLGIpe2lmKDA9PT1hLmxlbmd0aHx8MD09PWIubGVuZ3RoKXJldHVybiBhLmNvbmNhdChiKTt2YXIgYz1hW2EubGVuZ3RoLTFdLGQ9c2pjbC5iaXRBcnJheS5nZXRQYXJ0aWFsKGMpO3JldHVybiAzMj09PWQ/YS5jb25jYXQoYik6c2pjbC5iaXRBcnJheS4kKGIsZCxjfDAsYS5zbGljZSgwLGEubGVuZ3RoLTEpKX0sYml0TGVuZ3RoOmZ1bmN0aW9uKGEpe3ZhciBiPWEubGVuZ3RoO3JldHVybiAwPT09XG5iPzA6MzIqKGItMSkrc2pjbC5iaXRBcnJheS5nZXRQYXJ0aWFsKGFbYi0xXSl9LGNsYW1wOmZ1bmN0aW9uKGEsYil7aWYoMzIqYS5sZW5ndGg8YilyZXR1cm4gYTthPWEuc2xpY2UoMCxNYXRoLmNlaWwoYi8zMikpO3ZhciBjPWEubGVuZ3RoO2I9YiYzMTswPGMmJmImJihhW2MtMV09c2pjbC5iaXRBcnJheS5wYXJ0aWFsKGIsYVtjLTFdJjIxNDc0ODM2NDg+PmItMSwxKSk7cmV0dXJuIGF9LHBhcnRpYWw6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiAzMj09PWE/YjooYz9ifDA6Yjw8MzItYSkrMHgxMDAwMDAwMDAwMCphfSxnZXRQYXJ0aWFsOmZ1bmN0aW9uKGEpe3JldHVybiBNYXRoLnJvdW5kKGEvMHgxMDAwMDAwMDAwMCl8fDMyfSxlcXVhbDpmdW5jdGlvbihhLGIpe2lmKHNqY2wuYml0QXJyYXkuYml0TGVuZ3RoKGEpIT09c2pjbC5iaXRBcnJheS5iaXRMZW5ndGgoYikpcmV0dXJuITE7dmFyIGM9MCxkO2ZvcihkPTA7ZDxhLmxlbmd0aDtkKyspY3w9YVtkXV5iW2RdO3JldHVybiAwPT09XG5jfSwkOmZ1bmN0aW9uKGEsYixjLGQpe3ZhciBlO2U9MDtmb3Iodm9pZCAwPT09ZCYmKGQ9W10pOzMyPD1iO2ItPTMyKWQucHVzaChjKSxjPTA7aWYoMD09PWIpcmV0dXJuIGQuY29uY2F0KGEpO2ZvcihlPTA7ZTxhLmxlbmd0aDtlKyspZC5wdXNoKGN8YVtlXT4+PmIpLGM9YVtlXTw8MzItYjtlPWEubGVuZ3RoP2FbYS5sZW5ndGgtMV06MDthPXNqY2wuYml0QXJyYXkuZ2V0UGFydGlhbChlKTtkLnB1c2goc2pjbC5iaXRBcnJheS5wYXJ0aWFsKGIrYSYzMSwzMjxiK2E/YzpkLnBvcCgpLDEpKTtyZXR1cm4gZH0saTpmdW5jdGlvbihhLGIpe3JldHVyblthWzBdXmJbMF0sYVsxXV5iWzFdLGFbMl1eYlsyXSxhWzNdXmJbM11dfSxieXRlc3dhcE06ZnVuY3Rpb24oYSl7dmFyIGIsYztmb3IoYj0wO2I8YS5sZW5ndGg7KytiKWM9YVtiXSxhW2JdPWM+Pj4yNHxjPj4+OCYweGZmMDB8KGMmMHhmZjAwKTw8OHxjPDwyNDtyZXR1cm4gYX19O1xuc2pjbC5jb2RlYy51dGY4U3RyaW5nPXtmcm9tQml0czpmdW5jdGlvbihhKXt2YXIgYj1cIlwiLGM9c2pjbC5iaXRBcnJheS5iaXRMZW5ndGgoYSksZCxlO2ZvcihkPTA7ZDxjLzg7ZCsrKTA9PT0oZCYzKSYmKGU9YVtkLzRdKSxiKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGU+Pj44Pj4+OD4+PjgpLGU8PD04O3JldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKGIpKX0sdG9CaXRzOmZ1bmN0aW9uKGEpe2E9dW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGEpKTt2YXIgYj1bXSxjLGQ9MDtmb3IoYz0wO2M8YS5sZW5ndGg7YysrKWQ9ZDw8OHxhLmNoYXJDb2RlQXQoYyksMz09PShjJjMpJiYoYi5wdXNoKGQpLGQ9MCk7YyYzJiZiLnB1c2goc2pjbC5iaXRBcnJheS5wYXJ0aWFsKDgqKGMmMyksZCkpO3JldHVybiBifX07XG5zamNsLmNvZGVjLmhleD17ZnJvbUJpdHM6ZnVuY3Rpb24oYSl7dmFyIGI9XCJcIixjO2ZvcihjPTA7YzxhLmxlbmd0aDtjKyspYis9KChhW2NdfDApKzB4ZjAwMDAwMDAwMDAwKS50b1N0cmluZygxNikuc3Vic3RyKDQpO3JldHVybiBiLnN1YnN0cigwLHNqY2wuYml0QXJyYXkuYml0TGVuZ3RoKGEpLzQpfSx0b0JpdHM6ZnVuY3Rpb24oYSl7dmFyIGIsYz1bXSxkO2E9YS5yZXBsYWNlKC9cXHN8MHgvZyxcIlwiKTtkPWEubGVuZ3RoO2E9YStcIjAwMDAwMDAwXCI7Zm9yKGI9MDtiPGEubGVuZ3RoO2IrPTgpYy5wdXNoKHBhcnNlSW50KGEuc3Vic3RyKGIsOCksMTYpXjApO3JldHVybiBzamNsLmJpdEFycmF5LmNsYW1wKGMsNCpkKX19O1xuc2pjbC5jb2RlYy5iYXNlMzI9e0I6XCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWjIzNDU2N1wiLFg6XCIwMTIzNDU2Nzg5QUJDREVGR0hJSktMTU5PUFFSU1RVVlwiLEJJVFM6MzIsQkFTRTo1LFJFTUFJTklORzoyNyxmcm9tQml0czpmdW5jdGlvbihhLGIsYyl7dmFyIGQ9c2pjbC5jb2RlYy5iYXNlMzIuQkFTRSxlPXNqY2wuY29kZWMuYmFzZTMyLlJFTUFJTklORyxmPVwiXCIsZz0wLGg9c2pjbC5jb2RlYy5iYXNlMzIuQixrPTAsbD1zamNsLmJpdEFycmF5LmJpdExlbmd0aChhKTtjJiYoaD1zamNsLmNvZGVjLmJhc2UzMi5YKTtmb3IoYz0wO2YubGVuZ3RoKmQ8bDspZis9aC5jaGFyQXQoKGteYVtjXT4+PmcpPj4+ZSksZzxkPyhrPWFbY108PGQtZyxnKz1lLGMrKyk6KGs8PD1kLGctPWQpO2Zvcig7Zi5sZW5ndGgmNyYmIWI7KWYrPVwiPVwiO3JldHVybiBmfSx0b0JpdHM6ZnVuY3Rpb24oYSxiKXthPWEucmVwbGFjZSgvXFxzfD0vZyxcIlwiKS50b1VwcGVyQ2FzZSgpO3ZhciBjPXNqY2wuY29kZWMuYmFzZTMyLkJJVFMsXG5kPXNqY2wuY29kZWMuYmFzZTMyLkJBU0UsZT1zamNsLmNvZGVjLmJhc2UzMi5SRU1BSU5JTkcsZj1bXSxnLGg9MCxrPXNqY2wuY29kZWMuYmFzZTMyLkIsbD0wLG4sbT1cImJhc2UzMlwiO2ImJihrPXNqY2wuY29kZWMuYmFzZTMyLlgsbT1cImJhc2UzMmhleFwiKTtmb3IoZz0wO2c8YS5sZW5ndGg7ZysrKXtuPWsuaW5kZXhPZihhLmNoYXJBdChnKSk7aWYoMD5uKXtpZighYil0cnl7cmV0dXJuIHNqY2wuY29kZWMuYmFzZTMyaGV4LnRvQml0cyhhKX1jYXRjaChwKXt9dGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJ0aGlzIGlzbid0IFwiK20rXCIhXCIpO31oPmU/KGgtPWUsZi5wdXNoKGxebj4+PmgpLGw9bjw8Yy1oKTooaCs9ZCxsXj1uPDxjLWgpfWgmNTYmJmYucHVzaChzamNsLmJpdEFycmF5LnBhcnRpYWwoaCY1NixsLDEpKTtyZXR1cm4gZn19O1xuc2pjbC5jb2RlYy5iYXNlMzJoZXg9e2Zyb21CaXRzOmZ1bmN0aW9uKGEsYil7cmV0dXJuIHNqY2wuY29kZWMuYmFzZTMyLmZyb21CaXRzKGEsYiwxKX0sdG9CaXRzOmZ1bmN0aW9uKGEpe3JldHVybiBzamNsLmNvZGVjLmJhc2UzMi50b0JpdHMoYSwxKX19O1xuc2pjbC5jb2RlYy5iYXNlNjQ9e0I6XCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCIsZnJvbUJpdHM6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPVwiXCIsZT0wLGY9c2pjbC5jb2RlYy5iYXNlNjQuQixnPTAsaD1zamNsLmJpdEFycmF5LmJpdExlbmd0aChhKTtjJiYoZj1mLnN1YnN0cigwLDYyKStcIi1fXCIpO2ZvcihjPTA7NipkLmxlbmd0aDxoOylkKz1mLmNoYXJBdCgoZ15hW2NdPj4+ZSk+Pj4yNiksNj5lPyhnPWFbY108PDYtZSxlKz0yNixjKyspOihnPDw9NixlLT02KTtmb3IoO2QubGVuZ3RoJjMmJiFiOylkKz1cIj1cIjtyZXR1cm4gZH0sdG9CaXRzOmZ1bmN0aW9uKGEsYil7YT1hLnJlcGxhY2UoL1xcc3w9L2csXCJcIik7dmFyIGM9W10sZCxlPTAsZj1zamNsLmNvZGVjLmJhc2U2NC5CLGc9MCxoO2ImJihmPWYuc3Vic3RyKDAsNjIpK1wiLV9cIik7Zm9yKGQ9MDtkPGEubGVuZ3RoO2QrKyl7aD1mLmluZGV4T2YoYS5jaGFyQXQoZCkpO1xuaWYoMD5oKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwidGhpcyBpc24ndCBiYXNlNjQhXCIpOzI2PGU/KGUtPTI2LGMucHVzaChnXmg+Pj5lKSxnPWg8PDMyLWUpOihlKz02LGdePWg8PDMyLWUpfWUmNTYmJmMucHVzaChzamNsLmJpdEFycmF5LnBhcnRpYWwoZSY1NixnLDEpKTtyZXR1cm4gY319O3NqY2wuY29kZWMuYmFzZTY0dXJsPXtmcm9tQml0czpmdW5jdGlvbihhKXtyZXR1cm4gc2pjbC5jb2RlYy5iYXNlNjQuZnJvbUJpdHMoYSwxLDEpfSx0b0JpdHM6ZnVuY3Rpb24oYSl7cmV0dXJuIHNqY2wuY29kZWMuYmFzZTY0LnRvQml0cyhhLDEpfX07c2pjbC5oYXNoLnNoYTI1Nj1mdW5jdGlvbihhKXt0aGlzLmJbMF18fHRoaXMuTygpO2E/KHRoaXMuRj1hLkYuc2xpY2UoMCksdGhpcy5BPWEuQS5zbGljZSgwKSx0aGlzLmw9YS5sKTp0aGlzLnJlc2V0KCl9O3NqY2wuaGFzaC5zaGEyNTYuaGFzaD1mdW5jdGlvbihhKXtyZXR1cm4obmV3IHNqY2wuaGFzaC5zaGEyNTYpLnVwZGF0ZShhKS5maW5hbGl6ZSgpfTtcbnNqY2wuaGFzaC5zaGEyNTYucHJvdG90eXBlPXtibG9ja1NpemU6NTEyLHJlc2V0OmZ1bmN0aW9uKCl7dGhpcy5GPXRoaXMuWS5zbGljZSgwKTt0aGlzLkE9W107dGhpcy5sPTA7cmV0dXJuIHRoaXN9LHVwZGF0ZTpmdW5jdGlvbihhKXtcInN0cmluZ1wiPT09dHlwZW9mIGEmJihhPXNqY2wuY29kZWMudXRmOFN0cmluZy50b0JpdHMoYSkpO3ZhciBiLGM9dGhpcy5BPXNqY2wuYml0QXJyYXkuY29uY2F0KHRoaXMuQSxhKTtiPXRoaXMubDthPXRoaXMubD1iK3NqY2wuYml0QXJyYXkuYml0TGVuZ3RoKGEpO2lmKDB4MWZmZmZmZmZmZmZmZmY8YSl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcIkNhbm5vdCBoYXNoIG1vcmUgdGhhbiAyXjUzIC0gMSBiaXRzXCIpO2lmKFwidW5kZWZpbmVkXCIhPT10eXBlb2YgVWludDMyQXJyYXkpe3ZhciBkPW5ldyBVaW50MzJBcnJheShjKSxlPTA7Zm9yKGI9NTEyK2ItKDUxMitiJjB4MWZmKTtiPD1hO2IrPTUxMil1KHRoaXMsZC5zdWJhcnJheSgxNiplLFxuMTYqKGUrMSkpKSxlKz0xO2Muc3BsaWNlKDAsMTYqZSl9ZWxzZSBmb3IoYj01MTIrYi0oNTEyK2ImMHgxZmYpO2I8PWE7Yis9NTEyKXUodGhpcyxjLnNwbGljZSgwLDE2KSk7cmV0dXJuIHRoaXN9LGZpbmFsaXplOmZ1bmN0aW9uKCl7dmFyIGEsYj10aGlzLkEsYz10aGlzLkYsYj1zamNsLmJpdEFycmF5LmNvbmNhdChiLFtzamNsLmJpdEFycmF5LnBhcnRpYWwoMSwxKV0pO2ZvcihhPWIubGVuZ3RoKzI7YSYxNTthKyspYi5wdXNoKDApO2IucHVzaChNYXRoLmZsb29yKHRoaXMubC8weDEwMDAwMDAwMCkpO2ZvcihiLnB1c2godGhpcy5sfDApO2IubGVuZ3RoOyl1KHRoaXMsYi5zcGxpY2UoMCwxNikpO3RoaXMucmVzZXQoKTtyZXR1cm4gY30sWTpbXSxiOltdLE86ZnVuY3Rpb24oKXtmdW5jdGlvbiBhKGEpe3JldHVybiAweDEwMDAwMDAwMCooYS1NYXRoLmZsb29yKGEpKXwwfWZvcih2YXIgYj0wLGM9MixkLGU7NjQ+YjtjKyspe2U9ITA7Zm9yKGQ9MjtkKmQ8PWM7ZCsrKWlmKDA9PT1jJWQpe2U9XG4hMTticmVha31lJiYoOD5iJiYodGhpcy5ZW2JdPWEoTWF0aC5wb3coYywuNSkpKSx0aGlzLmJbYl09YShNYXRoLnBvdyhjLDEvMykpLGIrKyl9fX07XG5mdW5jdGlvbiB1KGEsYil7dmFyIGMsZCxlLGY9YS5GLGc9YS5iLGg9ZlswXSxrPWZbMV0sbD1mWzJdLG49ZlszXSxtPWZbNF0scD1mWzVdLHI9Zls2XSxxPWZbN107Zm9yKGM9MDs2ND5jO2MrKykxNj5jP2Q9YltjXTooZD1iW2MrMSYxNV0sZT1iW2MrMTQmMTVdLGQ9YltjJjE1XT0oZD4+PjdeZD4+PjE4XmQ+Pj4zXmQ8PDI1XmQ8PDE0KSsoZT4+PjE3XmU+Pj4xOV5lPj4+MTBeZTw8MTVeZTw8MTMpK2JbYyYxNV0rYltjKzkmMTVdfDApLGQ9ZCtxKyhtPj4+Nl5tPj4+MTFebT4+PjI1Xm08PDI2Xm08PDIxXm08PDcpKyhyXm0mKHBecikpK2dbY10scT1yLHI9cCxwPW0sbT1uK2R8MCxuPWwsbD1rLGs9aCxoPWQrKGsmbF5uJihrXmwpKSsoaz4+PjJeaz4+PjEzXms+Pj4yMl5rPDwzMF5rPDwxOV5rPDwxMCl8MDtmWzBdPWZbMF0raHwwO2ZbMV09ZlsxXStrfDA7ZlsyXT1mWzJdK2x8MDtmWzNdPWZbM10rbnwwO2ZbNF09Zls0XSttfDA7Zls1XT1mWzVdK3B8MDtmWzZdPWZbNl0rcnwwO2ZbN109XG5mWzddK3F8MH1cbnNqY2wubW9kZS5jY209e25hbWU6XCJjY21cIixHOltdLGxpc3RlblByb2dyZXNzOmZ1bmN0aW9uKGEpe3NqY2wubW9kZS5jY20uRy5wdXNoKGEpfSx1bkxpc3RlblByb2dyZXNzOmZ1bmN0aW9uKGEpe2E9c2pjbC5tb2RlLmNjbS5HLmluZGV4T2YoYSk7LTE8YSYmc2pjbC5tb2RlLmNjbS5HLnNwbGljZShhLDEpfSxmYTpmdW5jdGlvbihhKXt2YXIgYj1zamNsLm1vZGUuY2NtLkcuc2xpY2UoKSxjO2ZvcihjPTA7YzxiLmxlbmd0aDtjKz0xKWJbY10oYSl9LGVuY3J5cHQ6ZnVuY3Rpb24oYSxiLGMsZCxlKXt2YXIgZixnPWIuc2xpY2UoMCksaD1zamNsLmJpdEFycmF5LGs9aC5iaXRMZW5ndGgoYykvOCxsPWguYml0TGVuZ3RoKGcpLzg7ZT1lfHw2NDtkPWR8fFtdO2lmKDc+ayl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImNjbTogaXYgbXVzdCBiZSBhdCBsZWFzdCA3IGJ5dGVzXCIpO2ZvcihmPTI7ND5mJiZsPj4+OCpmO2YrKyk7ZjwxNS1rJiYoZj0xNS1rKTtjPWguY2xhbXAoYyxcbjgqKDE1LWYpKTtiPXNqY2wubW9kZS5jY20uVihhLGIsYyxkLGUsZik7Zz1zamNsLm1vZGUuY2NtLkMoYSxnLGMsYixlLGYpO3JldHVybiBoLmNvbmNhdChnLmRhdGEsZy50YWcpfSxkZWNyeXB0OmZ1bmN0aW9uKGEsYixjLGQsZSl7ZT1lfHw2NDtkPWR8fFtdO3ZhciBmPXNqY2wuYml0QXJyYXksZz1mLmJpdExlbmd0aChjKS84LGg9Zi5iaXRMZW5ndGgoYiksaz1mLmNsYW1wKGIsaC1lKSxsPWYuYml0U2xpY2UoYixoLWUpLGg9KGgtZSkvODtpZig3PmcpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJjY206IGl2IG11c3QgYmUgYXQgbGVhc3QgNyBieXRlc1wiKTtmb3IoYj0yOzQ+YiYmaD4+PjgqYjtiKyspO2I8MTUtZyYmKGI9MTUtZyk7Yz1mLmNsYW1wKGMsOCooMTUtYikpO2s9c2pjbC5tb2RlLmNjbS5DKGEsayxjLGwsZSxiKTthPXNqY2wubW9kZS5jY20uVihhLGsuZGF0YSxjLGQsZSxiKTtpZighZi5lcXVhbChrLnRhZyxhKSl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uY29ycnVwdChcImNjbTogdGFnIGRvZXNuJ3QgbWF0Y2hcIik7XG5yZXR1cm4gay5kYXRhfSxuYTpmdW5jdGlvbihhLGIsYyxkLGUsZil7dmFyIGc9W10saD1zamNsLmJpdEFycmF5LGs9aC5pO2Q9W2gucGFydGlhbCg4LChiLmxlbmd0aD82NDowKXxkLTI8PDJ8Zi0xKV07ZD1oLmNvbmNhdChkLGMpO2RbM118PWU7ZD1hLmVuY3J5cHQoZCk7aWYoYi5sZW5ndGgpZm9yKGM9aC5iaXRMZW5ndGgoYikvOCw2NTI3OT49Yz9nPVtoLnBhcnRpYWwoMTYsYyldOjB4ZmZmZmZmZmY+PWMmJihnPWguY29uY2F0KFtoLnBhcnRpYWwoMTYsNjU1MzQpXSxbY10pKSxnPWguY29uY2F0KGcsYiksYj0wO2I8Zy5sZW5ndGg7Yis9NClkPWEuZW5jcnlwdChrKGQsZy5zbGljZShiLGIrNCkuY29uY2F0KFswLDAsMF0pKSk7cmV0dXJuIGR9LFY6ZnVuY3Rpb24oYSxiLGMsZCxlLGYpe3ZhciBnPXNqY2wuYml0QXJyYXksaD1nLmk7ZS89ODtpZihlJTJ8fDQ+ZXx8MTY8ZSl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImNjbTogaW52YWxpZCB0YWcgbGVuZ3RoXCIpO1xuaWYoMHhmZmZmZmZmZjxkLmxlbmd0aHx8MHhmZmZmZmZmZjxiLmxlbmd0aCl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uYnVnKFwiY2NtOiBjYW4ndCBkZWFsIHdpdGggNEdpQiBvciBtb3JlIGRhdGFcIik7Yz1zamNsLm1vZGUuY2NtLm5hKGEsZCxjLGUsZy5iaXRMZW5ndGgoYikvOCxmKTtmb3IoZD0wO2Q8Yi5sZW5ndGg7ZCs9NCljPWEuZW5jcnlwdChoKGMsYi5zbGljZShkLGQrNCkuY29uY2F0KFswLDAsMF0pKSk7cmV0dXJuIGcuY2xhbXAoYyw4KmUpfSxDOmZ1bmN0aW9uKGEsYixjLGQsZSxmKXt2YXIgZyxoPXNqY2wuYml0QXJyYXk7Zz1oLmk7dmFyIGs9Yi5sZW5ndGgsbD1oLmJpdExlbmd0aChiKSxuPWsvNTAsbT1uO2M9aC5jb25jYXQoW2gucGFydGlhbCg4LGYtMSldLGMpLmNvbmNhdChbMCwwLDBdKS5zbGljZSgwLDQpO2Q9aC5iaXRTbGljZShnKGQsYS5lbmNyeXB0KGMpKSwwLGUpO2lmKCFrKXJldHVybnt0YWc6ZCxkYXRhOltdfTtmb3IoZz0wO2c8aztnKz00KWc+biYmKHNqY2wubW9kZS5jY20uZmEoZy9cbmspLG4rPW0pLGNbM10rKyxlPWEuZW5jcnlwdChjKSxiW2ddXj1lWzBdLGJbZysxXV49ZVsxXSxiW2crMl1ePWVbMl0sYltnKzNdXj1lWzNdO3JldHVybnt0YWc6ZCxkYXRhOmguY2xhbXAoYixsKX19fTtcbnNqY2wubW9kZS5vY2IyPXtuYW1lOlwib2NiMlwiLGVuY3J5cHQ6ZnVuY3Rpb24oYSxiLGMsZCxlLGYpe2lmKDEyOCE9PXNqY2wuYml0QXJyYXkuYml0TGVuZ3RoKGMpKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwib2NiIGl2IG11c3QgYmUgMTI4IGJpdHNcIik7dmFyIGcsaD1zamNsLm1vZGUub2NiMi5TLGs9c2pjbC5iaXRBcnJheSxsPWsuaSxuPVswLDAsMCwwXTtjPWgoYS5lbmNyeXB0KGMpKTt2YXIgbSxwPVtdO2Q9ZHx8W107ZT1lfHw2NDtmb3IoZz0wO2crNDxiLmxlbmd0aDtnKz00KW09Yi5zbGljZShnLGcrNCksbj1sKG4sbSkscD1wLmNvbmNhdChsKGMsYS5lbmNyeXB0KGwoYyxtKSkpKSxjPWgoYyk7bT1iLnNsaWNlKGcpO2I9ay5iaXRMZW5ndGgobSk7Zz1hLmVuY3J5cHQobChjLFswLDAsMCxiXSkpO209ay5jbGFtcChsKG0uY29uY2F0KFswLDAsMF0pLGcpLGIpO249bChuLGwobS5jb25jYXQoWzAsMCwwXSksZykpO249YS5lbmNyeXB0KGwobixsKGMsaChjKSkpKTtcbmQubGVuZ3RoJiYobj1sKG4sZj9kOnNqY2wubW9kZS5vY2IyLnBtYWMoYSxkKSkpO3JldHVybiBwLmNvbmNhdChrLmNvbmNhdChtLGsuY2xhbXAobixlKSkpfSxkZWNyeXB0OmZ1bmN0aW9uKGEsYixjLGQsZSxmKXtpZigxMjghPT1zamNsLmJpdEFycmF5LmJpdExlbmd0aChjKSl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcIm9jYiBpdiBtdXN0IGJlIDEyOCBiaXRzXCIpO2U9ZXx8NjQ7dmFyIGc9c2pjbC5tb2RlLm9jYjIuUyxoPXNqY2wuYml0QXJyYXksaz1oLmksbD1bMCwwLDAsMF0sbj1nKGEuZW5jcnlwdChjKSksbSxwLHI9c2pjbC5iaXRBcnJheS5iaXRMZW5ndGgoYiktZSxxPVtdO2Q9ZHx8W107Zm9yKGM9MDtjKzQ8ci8zMjtjKz00KW09ayhuLGEuZGVjcnlwdChrKG4sYi5zbGljZShjLGMrNCkpKSksbD1rKGwsbSkscT1xLmNvbmNhdChtKSxuPWcobik7cD1yLTMyKmM7bT1hLmVuY3J5cHQoayhuLFswLDAsMCxwXSkpO209ayhtLGguY2xhbXAoYi5zbGljZShjKSxwKS5jb25jYXQoWzAsXG4wLDBdKSk7bD1rKGwsbSk7bD1hLmVuY3J5cHQoayhsLGsobixnKG4pKSkpO2QubGVuZ3RoJiYobD1rKGwsZj9kOnNqY2wubW9kZS5vY2IyLnBtYWMoYSxkKSkpO2lmKCFoLmVxdWFsKGguY2xhbXAobCxlKSxoLmJpdFNsaWNlKGIscikpKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5jb3JydXB0KFwib2NiOiB0YWcgZG9lc24ndCBtYXRjaFwiKTtyZXR1cm4gcS5jb25jYXQoaC5jbGFtcChtLHApKX0scG1hYzpmdW5jdGlvbihhLGIpe3ZhciBjLGQ9c2pjbC5tb2RlLm9jYjIuUyxlPXNqY2wuYml0QXJyYXksZj1lLmksZz1bMCwwLDAsMF0saD1hLmVuY3J5cHQoWzAsMCwwLDBdKSxoPWYoaCxkKGQoaCkpKTtmb3IoYz0wO2MrNDxiLmxlbmd0aDtjKz00KWg9ZChoKSxnPWYoZyxhLmVuY3J5cHQoZihoLGIuc2xpY2UoYyxjKzQpKSkpO2M9Yi5zbGljZShjKTsxMjg+ZS5iaXRMZW5ndGgoYykmJihoPWYoaCxkKGgpKSxjPWUuY29uY2F0KGMsWy0yMTQ3NDgzNjQ4LDAsMCwwXSkpO2c9ZihnLGMpO1xucmV0dXJuIGEuZW5jcnlwdChmKGQoZihoLGQoaCkpKSxnKSl9LFM6ZnVuY3Rpb24oYSl7cmV0dXJuW2FbMF08PDFeYVsxXT4+PjMxLGFbMV08PDFeYVsyXT4+PjMxLGFbMl08PDFeYVszXT4+PjMxLGFbM108PDFeMTM1KihhWzBdPj4+MzEpXX19O1xuc2pjbC5tb2RlLmdjbT17bmFtZTpcImdjbVwiLGVuY3J5cHQ6ZnVuY3Rpb24oYSxiLGMsZCxlKXt2YXIgZj1iLnNsaWNlKDApO2I9c2pjbC5iaXRBcnJheTtkPWR8fFtdO2E9c2pjbC5tb2RlLmdjbS5DKCEwLGEsZixkLGMsZXx8MTI4KTtyZXR1cm4gYi5jb25jYXQoYS5kYXRhLGEudGFnKX0sZGVjcnlwdDpmdW5jdGlvbihhLGIsYyxkLGUpe3ZhciBmPWIuc2xpY2UoMCksZz1zamNsLmJpdEFycmF5LGg9Zy5iaXRMZW5ndGgoZik7ZT1lfHwxMjg7ZD1kfHxbXTtlPD1oPyhiPWcuYml0U2xpY2UoZixoLWUpLGY9Zy5iaXRTbGljZShmLDAsaC1lKSk6KGI9ZixmPVtdKTthPXNqY2wubW9kZS5nY20uQyghMSxhLGYsZCxjLGUpO2lmKCFnLmVxdWFsKGEudGFnLGIpKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5jb3JydXB0KFwiZ2NtOiB0YWcgZG9lc24ndCBtYXRjaFwiKTtyZXR1cm4gYS5kYXRhfSxrYTpmdW5jdGlvbihhLGIpe3ZhciBjLGQsZSxmLGcsaD1zamNsLmJpdEFycmF5Lmk7ZT1bMCwwLFxuMCwwXTtmPWIuc2xpY2UoMCk7Zm9yKGM9MDsxMjg+YztjKyspeyhkPTAhPT0oYVtNYXRoLmZsb29yKGMvMzIpXSYxPDwzMS1jJTMyKSkmJihlPWgoZSxmKSk7Zz0wIT09KGZbM10mMSk7Zm9yKGQ9MzswPGQ7ZC0tKWZbZF09ZltkXT4+PjF8KGZbZC0xXSYxKTw8MzE7ZlswXT4+Pj0xO2cmJihmWzBdXj0tMHgxZjAwMDAwMCl9cmV0dXJuIGV9LGo6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkLGU9Yy5sZW5ndGg7Yj1iLnNsaWNlKDApO2ZvcihkPTA7ZDxlO2QrPTQpYlswXV49MHhmZmZmZmZmZiZjW2RdLGJbMV1ePTB4ZmZmZmZmZmYmY1tkKzFdLGJbMl1ePTB4ZmZmZmZmZmYmY1tkKzJdLGJbM11ePTB4ZmZmZmZmZmYmY1tkKzNdLGI9c2pjbC5tb2RlLmdjbS5rYShiLGEpO3JldHVybiBifSxDOmZ1bmN0aW9uKGEsYixjLGQsZSxmKXt2YXIgZyxoLGssbCxuLG0scCxyLHE9c2pjbC5iaXRBcnJheTttPWMubGVuZ3RoO3A9cS5iaXRMZW5ndGgoYyk7cj1xLmJpdExlbmd0aChkKTtoPXEuYml0TGVuZ3RoKGUpO1xuZz1iLmVuY3J5cHQoWzAsMCwwLDBdKTs5Nj09PWg/KGU9ZS5zbGljZSgwKSxlPXEuY29uY2F0KGUsWzFdKSk6KGU9c2pjbC5tb2RlLmdjbS5qKGcsWzAsMCwwLDBdLGUpLGU9c2pjbC5tb2RlLmdjbS5qKGcsZSxbMCwwLE1hdGguZmxvb3IoaC8weDEwMDAwMDAwMCksaCYweGZmZmZmZmZmXSkpO2g9c2pjbC5tb2RlLmdjbS5qKGcsWzAsMCwwLDBdLGQpO249ZS5zbGljZSgwKTtkPWguc2xpY2UoMCk7YXx8KGQ9c2pjbC5tb2RlLmdjbS5qKGcsaCxjKSk7Zm9yKGw9MDtsPG07bCs9NCluWzNdKyssaz1iLmVuY3J5cHQobiksY1tsXV49a1swXSxjW2wrMV1ePWtbMV0sY1tsKzJdXj1rWzJdLGNbbCszXV49a1szXTtjPXEuY2xhbXAoYyxwKTthJiYoZD1zamNsLm1vZGUuZ2NtLmooZyxoLGMpKTthPVtNYXRoLmZsb29yKHIvMHgxMDAwMDAwMDApLHImMHhmZmZmZmZmZixNYXRoLmZsb29yKHAvMHgxMDAwMDAwMDApLHAmMHhmZmZmZmZmZl07ZD1zamNsLm1vZGUuZ2NtLmooZyxkLGEpO2s9Yi5lbmNyeXB0KGUpO1xuZFswXV49a1swXTtkWzFdXj1rWzFdO2RbMl1ePWtbMl07ZFszXV49a1szXTtyZXR1cm57dGFnOnEuYml0U2xpY2UoZCwwLGYpLGRhdGE6Y319fTtzamNsLm1pc2MuaG1hYz1mdW5jdGlvbihhLGIpe3RoaXMuVz1iPWJ8fHNqY2wuaGFzaC5zaGEyNTY7dmFyIGM9W1tdLFtdXSxkLGU9Yi5wcm90b3R5cGUuYmxvY2tTaXplLzMyO3RoaXMudz1bbmV3IGIsbmV3IGJdO2EubGVuZ3RoPmUmJihhPWIuaGFzaChhKSk7Zm9yKGQ9MDtkPGU7ZCsrKWNbMF1bZF09YVtkXV45MDk1MjI0ODYsY1sxXVtkXT1hW2RdXjE1NDk1NTY4Mjg7dGhpcy53WzBdLnVwZGF0ZShjWzBdKTt0aGlzLndbMV0udXBkYXRlKGNbMV0pO3RoaXMuUj1uZXcgYih0aGlzLndbMF0pfTtcbnNqY2wubWlzYy5obWFjLnByb3RvdHlwZS5lbmNyeXB0PXNqY2wubWlzYy5obWFjLnByb3RvdHlwZS5tYWM9ZnVuY3Rpb24oYSl7aWYodGhpcy5hYSl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImVuY3J5cHQgb24gYWxyZWFkeSB1cGRhdGVkIGhtYWMgY2FsbGVkIVwiKTt0aGlzLnVwZGF0ZShhKTtyZXR1cm4gdGhpcy5kaWdlc3QoYSl9O3NqY2wubWlzYy5obWFjLnByb3RvdHlwZS5yZXNldD1mdW5jdGlvbigpe3RoaXMuUj1uZXcgdGhpcy5XKHRoaXMud1swXSk7dGhpcy5hYT0hMX07c2pjbC5taXNjLmhtYWMucHJvdG90eXBlLnVwZGF0ZT1mdW5jdGlvbihhKXt0aGlzLmFhPSEwO3RoaXMuUi51cGRhdGUoYSl9O3NqY2wubWlzYy5obWFjLnByb3RvdHlwZS5kaWdlc3Q9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLlIuZmluYWxpemUoKSxhPShuZXcgdGhpcy5XKHRoaXMud1sxXSkpLnVwZGF0ZShhKS5maW5hbGl6ZSgpO3RoaXMucmVzZXQoKTtyZXR1cm4gYX07XG5zamNsLm1pc2MucGJrZGYyPWZ1bmN0aW9uKGEsYixjLGQsZSl7Yz1jfHwxRTQ7aWYoMD5kfHwwPmMpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJpbnZhbGlkIHBhcmFtcyB0byBwYmtkZjJcIik7XCJzdHJpbmdcIj09PXR5cGVvZiBhJiYoYT1zamNsLmNvZGVjLnV0ZjhTdHJpbmcudG9CaXRzKGEpKTtcInN0cmluZ1wiPT09dHlwZW9mIGImJihiPXNqY2wuY29kZWMudXRmOFN0cmluZy50b0JpdHMoYikpO2U9ZXx8c2pjbC5taXNjLmhtYWM7YT1uZXcgZShhKTt2YXIgZixnLGgsayxsPVtdLG49c2pjbC5iaXRBcnJheTtmb3Ioaz0xOzMyKmwubGVuZ3RoPChkfHwxKTtrKyspe2U9Zj1hLmVuY3J5cHQobi5jb25jYXQoYixba10pKTtmb3IoZz0xO2c8YztnKyspZm9yKGY9YS5lbmNyeXB0KGYpLGg9MDtoPGYubGVuZ3RoO2grKyllW2hdXj1mW2hdO2w9bC5jb25jYXQoZSl9ZCYmKGw9bi5jbGFtcChsLGQpKTtyZXR1cm4gbH07XG5zamNsLnBybmc9ZnVuY3Rpb24oYSl7dGhpcy5jPVtuZXcgc2pjbC5oYXNoLnNoYTI1Nl07dGhpcy5tPVswXTt0aGlzLlA9MDt0aGlzLkg9e307dGhpcy5OPTA7dGhpcy5VPXt9O3RoaXMuWj10aGlzLmY9dGhpcy5vPXRoaXMuaGE9MDt0aGlzLmI9WzAsMCwwLDAsMCwwLDAsMF07dGhpcy5oPVswLDAsMCwwXTt0aGlzLkw9dm9pZCAwO3RoaXMuTT1hO3RoaXMuRD0hMTt0aGlzLks9e3Byb2dyZXNzOnt9LHNlZWRlZDp7fX07dGhpcy51PXRoaXMuZ2E9MDt0aGlzLkk9MTt0aGlzLko9Mjt0aGlzLmNhPTB4MTAwMDA7dGhpcy5UPVswLDQ4LDY0LDk2LDEyOCwxOTIsMHgxMDAsMzg0LDUxMiw3NjgsMTAyNF07dGhpcy5kYT0zRTQ7dGhpcy5iYT04MH07XG5zamNsLnBybmcucHJvdG90eXBlPXtyYW5kb21Xb3JkczpmdW5jdGlvbihhLGIpe3ZhciBjPVtdLGQ7ZD10aGlzLmlzUmVhZHkoYik7dmFyIGU7aWYoZD09PXRoaXMudSl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24ubm90UmVhZHkoXCJnZW5lcmF0b3IgaXNuJ3Qgc2VlZGVkXCIpO2lmKGQmdGhpcy5KKXtkPSEoZCZ0aGlzLkkpO2U9W107dmFyIGY9MCxnO3RoaXMuWj1lWzBdPShuZXcgRGF0ZSkudmFsdWVPZigpK3RoaXMuZGE7Zm9yKGc9MDsxNj5nO2crKyllLnB1c2goMHgxMDAwMDAwMDAqTWF0aC5yYW5kb20oKXwwKTtmb3IoZz0wO2c8dGhpcy5jLmxlbmd0aCYmKGU9ZS5jb25jYXQodGhpcy5jW2ddLmZpbmFsaXplKCkpLGYrPXRoaXMubVtnXSx0aGlzLm1bZ109MCxkfHwhKHRoaXMuUCYxPDxnKSk7ZysrKTt0aGlzLlA+PTE8PHRoaXMuYy5sZW5ndGgmJih0aGlzLmMucHVzaChuZXcgc2pjbC5oYXNoLnNoYTI1NiksdGhpcy5tLnB1c2goMCkpO3RoaXMuZi09ZjtmPnRoaXMubyYmKHRoaXMubz1cbmYpO3RoaXMuUCsrO3RoaXMuYj1zamNsLmhhc2guc2hhMjU2Lmhhc2godGhpcy5iLmNvbmNhdChlKSk7dGhpcy5MPW5ldyBzamNsLmNpcGhlci5hZXModGhpcy5iKTtmb3IoZD0wOzQ+ZCYmKHRoaXMuaFtkXT10aGlzLmhbZF0rMXwwLCF0aGlzLmhbZF0pO2QrKyk7fWZvcihkPTA7ZDxhO2QrPTQpMD09PShkKzEpJXRoaXMuY2EmJnkodGhpcyksZT16KHRoaXMpLGMucHVzaChlWzBdLGVbMV0sZVsyXSxlWzNdKTt5KHRoaXMpO3JldHVybiBjLnNsaWNlKDAsYSl9LHNldERlZmF1bHRQYXJhbm9pYTpmdW5jdGlvbihhLGIpe2lmKDA9PT1hJiZcIlNldHRpbmcgcGFyYW5vaWE9MCB3aWxsIHJ1aW4geW91ciBzZWN1cml0eTsgdXNlIGl0IG9ubHkgZm9yIHRlc3RpbmdcIiE9PWIpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJTZXR0aW5nIHBhcmFub2lhPTAgd2lsbCBydWluIHlvdXIgc2VjdXJpdHk7IHVzZSBpdCBvbmx5IGZvciB0ZXN0aW5nXCIpO3RoaXMuTT1hfSxhZGRFbnRyb3B5OmZ1bmN0aW9uKGEsXG5iLGMpe2M9Y3x8XCJ1c2VyXCI7dmFyIGQsZSxmPShuZXcgRGF0ZSkudmFsdWVPZigpLGc9dGhpcy5IW2NdLGg9dGhpcy5pc1JlYWR5KCksaz0wO2Q9dGhpcy5VW2NdO3ZvaWQgMD09PWQmJihkPXRoaXMuVVtjXT10aGlzLmhhKyspO3ZvaWQgMD09PWcmJihnPXRoaXMuSFtjXT0wKTt0aGlzLkhbY109KHRoaXMuSFtjXSsxKSV0aGlzLmMubGVuZ3RoO3N3aXRjaCh0eXBlb2YgYSl7Y2FzZSBcIm51bWJlclwiOnZvaWQgMD09PWImJihiPTEpO3RoaXMuY1tnXS51cGRhdGUoW2QsdGhpcy5OKyssMSxiLGYsMSxhfDBdKTticmVhaztjYXNlIFwib2JqZWN0XCI6Yz1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYSk7aWYoXCJbb2JqZWN0IFVpbnQzMkFycmF5XVwiPT09Yyl7ZT1bXTtmb3IoYz0wO2M8YS5sZW5ndGg7YysrKWUucHVzaChhW2NdKTthPWV9ZWxzZSBmb3IoXCJbb2JqZWN0IEFycmF5XVwiIT09YyYmKGs9MSksYz0wO2M8YS5sZW5ndGgmJiFrO2MrKylcIm51bWJlclwiIT09dHlwZW9mIGFbY10mJlxuKGs9MSk7aWYoIWspe2lmKHZvaWQgMD09PWIpZm9yKGM9Yj0wO2M8YS5sZW5ndGg7YysrKWZvcihlPWFbY107MDxlOyliKyssZT1lPj4+MTt0aGlzLmNbZ10udXBkYXRlKFtkLHRoaXMuTisrLDIsYixmLGEubGVuZ3RoXS5jb25jYXQoYSkpfWJyZWFrO2Nhc2UgXCJzdHJpbmdcIjp2b2lkIDA9PT1iJiYoYj1hLmxlbmd0aCk7dGhpcy5jW2ddLnVwZGF0ZShbZCx0aGlzLk4rKywzLGIsZixhLmxlbmd0aF0pO3RoaXMuY1tnXS51cGRhdGUoYSk7YnJlYWs7ZGVmYXVsdDprPTF9aWYoayl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uYnVnKFwicmFuZG9tOiBhZGRFbnRyb3B5IG9ubHkgc3VwcG9ydHMgbnVtYmVyLCBhcnJheSBvZiBudW1iZXJzIG9yIHN0cmluZ1wiKTt0aGlzLm1bZ10rPWI7dGhpcy5mKz1iO2g9PT10aGlzLnUmJih0aGlzLmlzUmVhZHkoKSE9PXRoaXMudSYmQShcInNlZWRlZFwiLE1hdGgubWF4KHRoaXMubyx0aGlzLmYpKSxBKFwicHJvZ3Jlc3NcIix0aGlzLmdldFByb2dyZXNzKCkpKX0sXG5pc1JlYWR5OmZ1bmN0aW9uKGEpe2E9dGhpcy5UW3ZvaWQgMCE9PWE/YTp0aGlzLk1dO3JldHVybiB0aGlzLm8mJnRoaXMubz49YT90aGlzLm1bMF0+dGhpcy5iYSYmKG5ldyBEYXRlKS52YWx1ZU9mKCk+dGhpcy5aP3RoaXMuSnx0aGlzLkk6dGhpcy5JOnRoaXMuZj49YT90aGlzLkp8dGhpcy51OnRoaXMudX0sZ2V0UHJvZ3Jlc3M6ZnVuY3Rpb24oYSl7YT10aGlzLlRbYT9hOnRoaXMuTV07cmV0dXJuIHRoaXMubz49YT8xOnRoaXMuZj5hPzE6dGhpcy5mL2F9LHN0YXJ0Q29sbGVjdG9yczpmdW5jdGlvbigpe2lmKCF0aGlzLkQpe3RoaXMuYT17bG9hZFRpbWVDb2xsZWN0b3I6Qih0aGlzLHRoaXMubWEpLG1vdXNlQ29sbGVjdG9yOkIodGhpcyx0aGlzLm9hKSxrZXlib2FyZENvbGxlY3RvcjpCKHRoaXMsdGhpcy5sYSksYWNjZWxlcm9tZXRlckNvbGxlY3RvcjpCKHRoaXMsdGhpcy5lYSksdG91Y2hDb2xsZWN0b3I6Qih0aGlzLHRoaXMucWEpfTtpZih3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcil3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIixcbnRoaXMuYS5sb2FkVGltZUNvbGxlY3RvciwhMSksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIix0aGlzLmEubW91c2VDb2xsZWN0b3IsITEpLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIix0aGlzLmEua2V5Ym9hcmRDb2xsZWN0b3IsITEpLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlbW90aW9uXCIsdGhpcy5hLmFjY2VsZXJvbWV0ZXJDb2xsZWN0b3IsITEpLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsdGhpcy5hLnRvdWNoQ29sbGVjdG9yLCExKTtlbHNlIGlmKGRvY3VtZW50LmF0dGFjaEV2ZW50KWRvY3VtZW50LmF0dGFjaEV2ZW50KFwib25sb2FkXCIsdGhpcy5hLmxvYWRUaW1lQ29sbGVjdG9yKSxkb2N1bWVudC5hdHRhY2hFdmVudChcIm9ubW91c2Vtb3ZlXCIsdGhpcy5hLm1vdXNlQ29sbGVjdG9yKSxkb2N1bWVudC5hdHRhY2hFdmVudChcImtleXByZXNzXCIsdGhpcy5hLmtleWJvYXJkQ29sbGVjdG9yKTtlbHNlIHRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5idWcoXCJjYW4ndCBhdHRhY2ggZXZlbnRcIik7XG50aGlzLkQ9ITB9fSxzdG9wQ29sbGVjdG9yczpmdW5jdGlvbigpe3RoaXMuRCYmKHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyPyh3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRcIix0aGlzLmEubG9hZFRpbWVDb2xsZWN0b3IsITEpLHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsdGhpcy5hLm1vdXNlQ29sbGVjdG9yLCExKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsdGhpcy5hLmtleWJvYXJkQ29sbGVjdG9yLCExKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImRldmljZW1vdGlvblwiLHRoaXMuYS5hY2NlbGVyb21ldGVyQ29sbGVjdG9yLCExKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLHRoaXMuYS50b3VjaENvbGxlY3RvciwhMSkpOmRvY3VtZW50LmRldGFjaEV2ZW50JiYoZG9jdW1lbnQuZGV0YWNoRXZlbnQoXCJvbmxvYWRcIix0aGlzLmEubG9hZFRpbWVDb2xsZWN0b3IpLGRvY3VtZW50LmRldGFjaEV2ZW50KFwib25tb3VzZW1vdmVcIixcbnRoaXMuYS5tb3VzZUNvbGxlY3RvciksZG9jdW1lbnQuZGV0YWNoRXZlbnQoXCJrZXlwcmVzc1wiLHRoaXMuYS5rZXlib2FyZENvbGxlY3RvcikpLHRoaXMuRD0hMSl9LGFkZEV2ZW50TGlzdGVuZXI6ZnVuY3Rpb24oYSxiKXt0aGlzLktbYV1bdGhpcy5nYSsrXT1ifSxyZW1vdmVFdmVudExpc3RlbmVyOmZ1bmN0aW9uKGEsYil7dmFyIGMsZCxlPXRoaXMuS1thXSxmPVtdO2ZvcihkIGluIGUpZS5oYXNPd25Qcm9wZXJ0eShkKSYmZVtkXT09PWImJmYucHVzaChkKTtmb3IoYz0wO2M8Zi5sZW5ndGg7YysrKWQ9ZltjXSxkZWxldGUgZVtkXX0sbGE6ZnVuY3Rpb24oKXtDKHRoaXMsMSl9LG9hOmZ1bmN0aW9uKGEpe3ZhciBiLGM7dHJ5e2I9YS54fHxhLmNsaWVudFh8fGEub2Zmc2V0WHx8MCxjPWEueXx8YS5jbGllbnRZfHxhLm9mZnNldFl8fDB9Y2F0Y2goZCl7Yz1iPTB9MCE9YiYmMCE9YyYmdGhpcy5hZGRFbnRyb3B5KFtiLGNdLDIsXCJtb3VzZVwiKTtDKHRoaXMsMCl9LHFhOmZ1bmN0aW9uKGEpe2E9XG5hLnRvdWNoZXNbMF18fGEuY2hhbmdlZFRvdWNoZXNbMF07dGhpcy5hZGRFbnRyb3B5KFthLnBhZ2VYfHxhLmNsaWVudFgsYS5wYWdlWXx8YS5jbGllbnRZXSwxLFwidG91Y2hcIik7Qyh0aGlzLDApfSxtYTpmdW5jdGlvbigpe0ModGhpcywyKX0sZWE6ZnVuY3Rpb24oYSl7YT1hLmFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkueHx8YS5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lnl8fGEuYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS56O2lmKHdpbmRvdy5vcmllbnRhdGlvbil7dmFyIGI9d2luZG93Lm9yaWVudGF0aW9uO1wibnVtYmVyXCI9PT10eXBlb2YgYiYmdGhpcy5hZGRFbnRyb3B5KGIsMSxcImFjY2VsZXJvbWV0ZXJcIil9YSYmdGhpcy5hZGRFbnRyb3B5KGEsMixcImFjY2VsZXJvbWV0ZXJcIik7Qyh0aGlzLDApfX07XG5mdW5jdGlvbiBBKGEsYil7dmFyIGMsZD1zamNsLnJhbmRvbS5LW2FdLGU9W107Zm9yKGMgaW4gZClkLmhhc093blByb3BlcnR5KGMpJiZlLnB1c2goZFtjXSk7Zm9yKGM9MDtjPGUubGVuZ3RoO2MrKyllW2NdKGIpfWZ1bmN0aW9uIEMoYSxiKXtcInVuZGVmaW5lZFwiIT09dHlwZW9mIHdpbmRvdyYmd2luZG93LnBlcmZvcm1hbmNlJiZcImZ1bmN0aW9uXCI9PT10eXBlb2Ygd2luZG93LnBlcmZvcm1hbmNlLm5vdz9hLmFkZEVudHJvcHkod2luZG93LnBlcmZvcm1hbmNlLm5vdygpLGIsXCJsb2FkdGltZVwiKTphLmFkZEVudHJvcHkoKG5ldyBEYXRlKS52YWx1ZU9mKCksYixcImxvYWR0aW1lXCIpfWZ1bmN0aW9uIHkoYSl7YS5iPXooYSkuY29uY2F0KHooYSkpO2EuTD1uZXcgc2pjbC5jaXBoZXIuYWVzKGEuYil9ZnVuY3Rpb24geihhKXtmb3IodmFyIGI9MDs0PmImJihhLmhbYl09YS5oW2JdKzF8MCwhYS5oW2JdKTtiKyspO3JldHVybiBhLkwuZW5jcnlwdChhLmgpfVxuZnVuY3Rpb24gQihhLGIpe3JldHVybiBmdW5jdGlvbigpe2IuYXBwbHkoYSxhcmd1bWVudHMpfX1zamNsLnJhbmRvbT1uZXcgc2pjbC5wcm5nKDYpO1xuYTp0cnl7dmFyIEQsRSxGLEc7aWYoRz1cInVuZGVmaW5lZFwiIT09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHMpe3ZhciBIO3RyeXtIPXJlcXVpcmUoXCJjcnlwdG9cIil9Y2F0Y2goYSl7SD1udWxsfUc9RT1IfWlmKEcmJkUucmFuZG9tQnl0ZXMpRD1FLnJhbmRvbUJ5dGVzKDEyOCksRD1uZXcgVWludDMyQXJyYXkoKG5ldyBVaW50OEFycmF5KEQpKS5idWZmZXIpLHNqY2wucmFuZG9tLmFkZEVudHJvcHkoRCwxMDI0LFwiY3J5cHRvWydyYW5kb21CeXRlcyddXCIpO2Vsc2UgaWYoXCJ1bmRlZmluZWRcIiE9PXR5cGVvZiB3aW5kb3cmJlwidW5kZWZpbmVkXCIhPT10eXBlb2YgVWludDMyQXJyYXkpe0Y9bmV3IFVpbnQzMkFycmF5KDMyKTtpZih3aW5kb3cuY3J5cHRvJiZ3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyl3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhGKTtlbHNlIGlmKHdpbmRvdy5tc0NyeXB0byYmd2luZG93Lm1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcyl3aW5kb3cubXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKEYpO1xuZWxzZSBicmVhayBhO3NqY2wucmFuZG9tLmFkZEVudHJvcHkoRiwxMDI0LFwiY3J5cHRvWydnZXRSYW5kb21WYWx1ZXMnXVwiKX19Y2F0Y2goYSl7XCJ1bmRlZmluZWRcIiE9PXR5cGVvZiB3aW5kb3cmJndpbmRvdy5jb25zb2xlJiYoY29uc29sZS5sb2coXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29sbGVjdGluZyBlbnRyb3B5IGZyb20gdGhlIGJyb3dzZXI6XCIpLGNvbnNvbGUubG9nKGEpKX1cbnNqY2wuanNvbj17ZGVmYXVsdHM6e3Y6MSxpdGVyOjFFNCxrczoxMjgsdHM6NjQsbW9kZTpcImNjbVwiLGFkYXRhOlwiXCIsY2lwaGVyOlwiYWVzXCJ9LGphOmZ1bmN0aW9uKGEsYixjLGQpe2M9Y3x8e307ZD1kfHx7fTt2YXIgZT1zamNsLmpzb24sZj1lLmcoe2l2OnNqY2wucmFuZG9tLnJhbmRvbVdvcmRzKDQsMCl9LGUuZGVmYXVsdHMpLGc7ZS5nKGYsYyk7Yz1mLmFkYXRhO1wic3RyaW5nXCI9PT10eXBlb2YgZi5zYWx0JiYoZi5zYWx0PXNqY2wuY29kZWMuYmFzZTY0LnRvQml0cyhmLnNhbHQpKTtcInN0cmluZ1wiPT09dHlwZW9mIGYuaXYmJihmLml2PXNqY2wuY29kZWMuYmFzZTY0LnRvQml0cyhmLml2KSk7aWYoIXNqY2wubW9kZVtmLm1vZGVdfHwhc2pjbC5jaXBoZXJbZi5jaXBoZXJdfHxcInN0cmluZ1wiPT09dHlwZW9mIGEmJjEwMD49Zi5pdGVyfHw2NCE9PWYudHMmJjk2IT09Zi50cyYmMTI4IT09Zi50c3x8MTI4IT09Zi5rcyYmMTkyIT09Zi5rcyYmMHgxMDAhPT1mLmtzfHwyPmYuaXYubGVuZ3RofHxcbjQ8Zi5pdi5sZW5ndGgpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJqc29uIGVuY3J5cHQ6IGludmFsaWQgcGFyYW1ldGVyc1wiKTtcInN0cmluZ1wiPT09dHlwZW9mIGE/KGc9c2pjbC5taXNjLmNhY2hlZFBia2RmMihhLGYpLGE9Zy5rZXkuc2xpY2UoMCxmLmtzLzMyKSxmLnNhbHQ9Zy5zYWx0KTpzamNsLmVjYyYmYSBpbnN0YW5jZW9mIHNqY2wuZWNjLmVsR2FtYWwucHVibGljS2V5JiYoZz1hLmtlbSgpLGYua2VtdGFnPWcudGFnLGE9Zy5rZXkuc2xpY2UoMCxmLmtzLzMyKSk7XCJzdHJpbmdcIj09PXR5cGVvZiBiJiYoYj1zamNsLmNvZGVjLnV0ZjhTdHJpbmcudG9CaXRzKGIpKTtcInN0cmluZ1wiPT09dHlwZW9mIGMmJihmLmFkYXRhPWM9c2pjbC5jb2RlYy51dGY4U3RyaW5nLnRvQml0cyhjKSk7Zz1uZXcgc2pjbC5jaXBoZXJbZi5jaXBoZXJdKGEpO2UuZyhkLGYpO2Qua2V5PWE7Zi5jdD1cImNjbVwiPT09Zi5tb2RlJiZzamNsLmFycmF5QnVmZmVyJiZzamNsLmFycmF5QnVmZmVyLmNjbSYmXG5iIGluc3RhbmNlb2YgQXJyYXlCdWZmZXI/c2pjbC5hcnJheUJ1ZmZlci5jY20uZW5jcnlwdChnLGIsZi5pdixjLGYudHMpOnNqY2wubW9kZVtmLm1vZGVdLmVuY3J5cHQoZyxiLGYuaXYsYyxmLnRzKTtyZXR1cm4gZn0sZW5jcnlwdDpmdW5jdGlvbihhLGIsYyxkKXt2YXIgZT1zamNsLmpzb24sZj1lLmphLmFwcGx5KGUsYXJndW1lbnRzKTtyZXR1cm4gZS5lbmNvZGUoZil9LGlhOmZ1bmN0aW9uKGEsYixjLGQpe2M9Y3x8e307ZD1kfHx7fTt2YXIgZT1zamNsLmpzb247Yj1lLmcoZS5nKGUuZyh7fSxlLmRlZmF1bHRzKSxiKSxjLCEwKTt2YXIgZixnO2Y9Yi5hZGF0YTtcInN0cmluZ1wiPT09dHlwZW9mIGIuc2FsdCYmKGIuc2FsdD1zamNsLmNvZGVjLmJhc2U2NC50b0JpdHMoYi5zYWx0KSk7XCJzdHJpbmdcIj09PXR5cGVvZiBiLml2JiYoYi5pdj1zamNsLmNvZGVjLmJhc2U2NC50b0JpdHMoYi5pdikpO2lmKCFzamNsLm1vZGVbYi5tb2RlXXx8IXNqY2wuY2lwaGVyW2IuY2lwaGVyXXx8XCJzdHJpbmdcIj09PVxudHlwZW9mIGEmJjEwMD49Yi5pdGVyfHw2NCE9PWIudHMmJjk2IT09Yi50cyYmMTI4IT09Yi50c3x8MTI4IT09Yi5rcyYmMTkyIT09Yi5rcyYmMHgxMDAhPT1iLmtzfHwhYi5pdnx8Mj5iLml2Lmxlbmd0aHx8NDxiLml2Lmxlbmd0aCl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImpzb24gZGVjcnlwdDogaW52YWxpZCBwYXJhbWV0ZXJzXCIpO1wic3RyaW5nXCI9PT10eXBlb2YgYT8oZz1zamNsLm1pc2MuY2FjaGVkUGJrZGYyKGEsYiksYT1nLmtleS5zbGljZSgwLGIua3MvMzIpLGIuc2FsdD1nLnNhbHQpOnNqY2wuZWNjJiZhIGluc3RhbmNlb2Ygc2pjbC5lY2MuZWxHYW1hbC5zZWNyZXRLZXkmJihhPWEudW5rZW0oc2pjbC5jb2RlYy5iYXNlNjQudG9CaXRzKGIua2VtdGFnKSkuc2xpY2UoMCxiLmtzLzMyKSk7XCJzdHJpbmdcIj09PXR5cGVvZiBmJiYoZj1zamNsLmNvZGVjLnV0ZjhTdHJpbmcudG9CaXRzKGYpKTtnPW5ldyBzamNsLmNpcGhlcltiLmNpcGhlcl0oYSk7Zj1cImNjbVwiPT09XG5iLm1vZGUmJnNqY2wuYXJyYXlCdWZmZXImJnNqY2wuYXJyYXlCdWZmZXIuY2NtJiZiLmN0IGluc3RhbmNlb2YgQXJyYXlCdWZmZXI/c2pjbC5hcnJheUJ1ZmZlci5jY20uZGVjcnlwdChnLGIuY3QsYi5pdixiLnRhZyxmLGIudHMpOnNqY2wubW9kZVtiLm1vZGVdLmRlY3J5cHQoZyxiLmN0LGIuaXYsZixiLnRzKTtlLmcoZCxiKTtkLmtleT1hO3JldHVybiAxPT09Yy5yYXc/ZjpzamNsLmNvZGVjLnV0ZjhTdHJpbmcuZnJvbUJpdHMoZil9LGRlY3J5cHQ6ZnVuY3Rpb24oYSxiLGMsZCl7dmFyIGU9c2pjbC5qc29uO3JldHVybiBlLmlhKGEsZS5kZWNvZGUoYiksYyxkKX0sZW5jb2RlOmZ1bmN0aW9uKGEpe3ZhciBiLGM9XCJ7XCIsZD1cIlwiO2ZvcihiIGluIGEpaWYoYS5oYXNPd25Qcm9wZXJ0eShiKSl7aWYoIWIubWF0Y2goL15bYS16MC05XSskL2kpKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwianNvbiBlbmNvZGU6IGludmFsaWQgcHJvcGVydHkgbmFtZVwiKTtjKz1kKydcIicrXG5iKydcIjonO2Q9XCIsXCI7c3dpdGNoKHR5cGVvZiBhW2JdKXtjYXNlIFwibnVtYmVyXCI6Y2FzZSBcImJvb2xlYW5cIjpjKz1hW2JdO2JyZWFrO2Nhc2UgXCJzdHJpbmdcIjpjKz0nXCInK2VzY2FwZShhW2JdKSsnXCInO2JyZWFrO2Nhc2UgXCJvYmplY3RcIjpjKz0nXCInK3NqY2wuY29kZWMuYmFzZTY0LmZyb21CaXRzKGFbYl0sMCkrJ1wiJzticmVhaztkZWZhdWx0OnRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5idWcoXCJqc29uIGVuY29kZTogdW5zdXBwb3J0ZWQgdHlwZVwiKTt9fXJldHVybiBjK1wifVwifSxkZWNvZGU6ZnVuY3Rpb24oYSl7YT1hLnJlcGxhY2UoL1xccy9nLFwiXCIpO2lmKCFhLm1hdGNoKC9eXFx7LipcXH0kLykpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJqc29uIGRlY29kZTogdGhpcyBpc24ndCBqc29uIVwiKTthPWEucmVwbGFjZSgvXlxce3xcXH0kL2csXCJcIikuc3BsaXQoLywvKTt2YXIgYj17fSxjLGQ7Zm9yKGM9MDtjPGEubGVuZ3RoO2MrKyl7aWYoIShkPWFbY10ubWF0Y2goL15cXHMqKD86KFtcIiddPykoW2Etel1bYS16MC05XSopXFwxKVxccyo6XFxzKig/OigtP1xcZCspfFwiKFthLXowLTkrXFwvJSpfLkA9XFwtXSopXCJ8KHRydWV8ZmFsc2UpKSQvaSkpKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwianNvbiBkZWNvZGU6IHRoaXMgaXNuJ3QganNvbiFcIik7XG5udWxsIT1kWzNdP2JbZFsyXV09cGFyc2VJbnQoZFszXSwxMCk6bnVsbCE9ZFs0XT9iW2RbMl1dPWRbMl0ubWF0Y2goL14oY3R8YWRhdGF8c2FsdHxpdikkLyk/c2pjbC5jb2RlYy5iYXNlNjQudG9CaXRzKGRbNF0pOnVuZXNjYXBlKGRbNF0pOm51bGwhPWRbNV0mJihiW2RbMl1dPVwidHJ1ZVwiPT09ZFs1XSl9cmV0dXJuIGJ9LGc6ZnVuY3Rpb24oYSxiLGMpe3ZvaWQgMD09PWEmJihhPXt9KTtpZih2b2lkIDA9PT1iKXJldHVybiBhO2Zvcih2YXIgZCBpbiBiKWlmKGIuaGFzT3duUHJvcGVydHkoZCkpe2lmKGMmJnZvaWQgMCE9PWFbZF0mJmFbZF0hPT1iW2RdKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwicmVxdWlyZWQgcGFyYW1ldGVyIG92ZXJyaWRkZW5cIik7YVtkXT1iW2RdfXJldHVybiBhfSxzYTpmdW5jdGlvbihhLGIpe3ZhciBjPXt9LGQ7Zm9yKGQgaW4gYSlhLmhhc093blByb3BlcnR5KGQpJiZhW2RdIT09YltkXSYmKGNbZF09YVtkXSk7cmV0dXJuIGN9LHJhOmZ1bmN0aW9uKGEsXG5iKXt2YXIgYz17fSxkO2ZvcihkPTA7ZDxiLmxlbmd0aDtkKyspdm9pZCAwIT09YVtiW2RdXSYmKGNbYltkXV09YVtiW2RdXSk7cmV0dXJuIGN9fTtzamNsLmVuY3J5cHQ9c2pjbC5qc29uLmVuY3J5cHQ7c2pjbC5kZWNyeXB0PXNqY2wuanNvbi5kZWNyeXB0O3NqY2wubWlzYy5wYT17fTtzamNsLm1pc2MuY2FjaGVkUGJrZGYyPWZ1bmN0aW9uKGEsYil7dmFyIGM9c2pjbC5taXNjLnBhLGQ7Yj1ifHx7fTtkPWIuaXRlcnx8MUUzO2M9Y1thXT1jW2FdfHx7fTtkPWNbZF09Y1tkXXx8e2ZpcnN0U2FsdDpiLnNhbHQmJmIuc2FsdC5sZW5ndGg/Yi5zYWx0LnNsaWNlKDApOnNqY2wucmFuZG9tLnJhbmRvbVdvcmRzKDIsMCl9O2M9dm9pZCAwPT09Yi5zYWx0P2QuZmlyc3RTYWx0OmIuc2FsdDtkW2NdPWRbY118fHNqY2wubWlzYy5wYmtkZjIoYSxjLGIuaXRlcik7cmV0dXJue2tleTpkW2NdLnNsaWNlKDApLHNhbHQ6Yy5zbGljZSgwKX19O1xuXCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzJiYobW9kdWxlLmV4cG9ydHM9c2pjbCk7XCJmdW5jdGlvblwiPT09dHlwZW9mIGRlZmluZSYmZGVmaW5lKFtdLGZ1bmN0aW9uKCl7cmV0dXJuIHNqY2x9KTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0cmVhbTtcblxudmFyIEVFID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcblxuaW5oZXJpdHMoU3RyZWFtLCBFRSk7XG5TdHJlYW0uUmVhZGFibGUgPSByZXF1aXJlKCdyZWFkYWJsZS1zdHJlYW0vcmVhZGFibGUuanMnKTtcblN0cmVhbS5Xcml0YWJsZSA9IHJlcXVpcmUoJ3JlYWRhYmxlLXN0cmVhbS93cml0YWJsZS5qcycpO1xuU3RyZWFtLkR1cGxleCA9IHJlcXVpcmUoJ3JlYWRhYmxlLXN0cmVhbS9kdXBsZXguanMnKTtcblN0cmVhbS5UcmFuc2Zvcm0gPSByZXF1aXJlKCdyZWFkYWJsZS1zdHJlYW0vdHJhbnNmb3JtLmpzJyk7XG5TdHJlYW0uUGFzc1Rocm91Z2ggPSByZXF1aXJlKCdyZWFkYWJsZS1zdHJlYW0vcGFzc3Rocm91Z2guanMnKTtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC40LnhcblN0cmVhbS5TdHJlYW0gPSBTdHJlYW07XG5cblxuXG4vLyBvbGQtc3R5bGUgc3RyZWFtcy4gIE5vdGUgdGhhdCB0aGUgcGlwZSBtZXRob2QgKHRoZSBvbmx5IHJlbGV2YW50XG4vLyBwYXJ0IG9mIHRoaXMgY2xhc3MpIGlzIG92ZXJyaWRkZW4gaW4gdGhlIFJlYWRhYmxlIGNsYXNzLlxuXG5mdW5jdGlvbiBTdHJlYW0oKSB7XG4gIEVFLmNhbGwodGhpcyk7XG59XG5cblN0cmVhbS5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uKGRlc3QsIG9wdGlvbnMpIHtcbiAgdmFyIHNvdXJjZSA9IHRoaXM7XG5cbiAgZnVuY3Rpb24gb25kYXRhKGNodW5rKSB7XG4gICAgaWYgKGRlc3Qud3JpdGFibGUpIHtcbiAgICAgIGlmIChmYWxzZSA9PT0gZGVzdC53cml0ZShjaHVuaykgJiYgc291cmNlLnBhdXNlKSB7XG4gICAgICAgIHNvdXJjZS5wYXVzZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNvdXJjZS5vbignZGF0YScsIG9uZGF0YSk7XG5cbiAgZnVuY3Rpb24gb25kcmFpbigpIHtcbiAgICBpZiAoc291cmNlLnJlYWRhYmxlICYmIHNvdXJjZS5yZXN1bWUpIHtcbiAgICAgIHNvdXJjZS5yZXN1bWUoKTtcbiAgICB9XG4gIH1cblxuICBkZXN0Lm9uKCdkcmFpbicsIG9uZHJhaW4pO1xuXG4gIC8vIElmIHRoZSAnZW5kJyBvcHRpb24gaXMgbm90IHN1cHBsaWVkLCBkZXN0LmVuZCgpIHdpbGwgYmUgY2FsbGVkIHdoZW5cbiAgLy8gc291cmNlIGdldHMgdGhlICdlbmQnIG9yICdjbG9zZScgZXZlbnRzLiAgT25seSBkZXN0LmVuZCgpIG9uY2UuXG4gIGlmICghZGVzdC5faXNTdGRpbyAmJiAoIW9wdGlvbnMgfHwgb3B0aW9ucy5lbmQgIT09IGZhbHNlKSkge1xuICAgIHNvdXJjZS5vbignZW5kJywgb25lbmQpO1xuICAgIHNvdXJjZS5vbignY2xvc2UnLCBvbmNsb3NlKTtcbiAgfVxuXG4gIHZhciBkaWRPbkVuZCA9IGZhbHNlO1xuICBmdW5jdGlvbiBvbmVuZCgpIHtcbiAgICBpZiAoZGlkT25FbmQpIHJldHVybjtcbiAgICBkaWRPbkVuZCA9IHRydWU7XG5cbiAgICBkZXN0LmVuZCgpO1xuICB9XG5cblxuICBmdW5jdGlvbiBvbmNsb3NlKCkge1xuICAgIGlmIChkaWRPbkVuZCkgcmV0dXJuO1xuICAgIGRpZE9uRW5kID0gdHJ1ZTtcblxuICAgIGlmICh0eXBlb2YgZGVzdC5kZXN0cm95ID09PSAnZnVuY3Rpb24nKSBkZXN0LmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8vIGRvbid0IGxlYXZlIGRhbmdsaW5nIHBpcGVzIHdoZW4gdGhlcmUgYXJlIGVycm9ycy5cbiAgZnVuY3Rpb24gb25lcnJvcihlcikge1xuICAgIGNsZWFudXAoKTtcbiAgICBpZiAoRUUubGlzdGVuZXJDb3VudCh0aGlzLCAnZXJyb3InKSA9PT0gMCkge1xuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCBzdHJlYW0gZXJyb3IgaW4gcGlwZS5cbiAgICB9XG4gIH1cblxuICBzb3VyY2Uub24oJ2Vycm9yJywgb25lcnJvcik7XG4gIGRlc3Qub24oJ2Vycm9yJywgb25lcnJvcik7XG5cbiAgLy8gcmVtb3ZlIGFsbCB0aGUgZXZlbnQgbGlzdGVuZXJzIHRoYXQgd2VyZSBhZGRlZC5cbiAgZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgICBzb3VyY2UucmVtb3ZlTGlzdGVuZXIoJ2RhdGEnLCBvbmRhdGEpO1xuICAgIGRlc3QucmVtb3ZlTGlzdGVuZXIoJ2RyYWluJywgb25kcmFpbik7XG5cbiAgICBzb3VyY2UucmVtb3ZlTGlzdGVuZXIoJ2VuZCcsIG9uZW5kKTtcbiAgICBzb3VyY2UucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgb25jbG9zZSk7XG5cbiAgICBzb3VyY2UucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgb25lcnJvcik7XG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBvbmVycm9yKTtcblxuICAgIHNvdXJjZS5yZW1vdmVMaXN0ZW5lcignZW5kJywgY2xlYW51cCk7XG4gICAgc291cmNlLnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIGNsZWFudXApO1xuXG4gICAgZGVzdC5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBjbGVhbnVwKTtcbiAgfVxuXG4gIHNvdXJjZS5vbignZW5kJywgY2xlYW51cCk7XG4gIHNvdXJjZS5vbignY2xvc2UnLCBjbGVhbnVwKTtcblxuICBkZXN0Lm9uKCdjbG9zZScsIGNsZWFudXApO1xuXG4gIGRlc3QuZW1pdCgncGlwZScsIHNvdXJjZSk7XG5cbiAgLy8gQWxsb3cgZm9yIHVuaXgtbGlrZSB1c2FnZTogQS5waXBlKEIpLnBpcGUoQylcbiAgcmV0dXJuIGRlc3Q7XG59O1xuIiwidmFyIHBpY2tlciA9IGZ1bmN0aW9uIHBpY2tlcih0eXBlKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBmaWxlTG9hZGVyID0gZnVuY3Rpb24gZmlsZUxvYWRlcihlKSB7XG4gICAgICAgIHZhciBkaXJlY3RvcnkgPSB7fTtcbiAgICAgICAgdmFyIHRvdGFsRmlsZXMgPSBlLnRhcmdldC5maWxlcy5sZW5ndGg7XG4gICAgICAgIHZhciBsb2FkZWRGaWxlcyA9IDA7XG4gICAgICAgIFtdLm1hcC5jYWxsKGUudGFyZ2V0LmZpbGVzLCBmdW5jdGlvbiAoZmlsZSkge1xuICAgICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IG5ldyBVaW50OEFycmF5KGUudGFyZ2V0LnJlc3VsdCk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09PSBcImRpcmVjdG9yeVwiKSB7XG4gICAgICAgICAgICAgIHZhciBwYXRoID0gZmlsZS53ZWJraXRSZWxhdGl2ZVBhdGg7XG4gICAgICAgICAgICAgIGRpcmVjdG9yeVtwYXRoLnNsaWNlKHBhdGguaW5kZXhPZihcIi9cIikgKyAxKV0gPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJ0ZXh0L3BsYWluXCIsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBpZiAoKytsb2FkZWRGaWxlcyA9PT0gdG90YWxGaWxlcykgcmVzb2x2ZShkaXJlY3RvcnkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBcImZpbGVcIikge1xuICAgICAgICAgICAgICB2YXIgX3BhdGggPSBmaWxlLndlYmtpdFJlbGF0aXZlUGF0aDtcbiAgICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IG1pbWV0eXBlLmxvb2t1cChfcGF0aCksXG4gICAgICAgICAgICAgICAgXCJkYXRhXCI6IGRhdGFcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoZmlsZSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgdmFyIGZpbGVJbnB1dDtcblxuICAgICAgaWYgKHR5cGUgPT09IFwiZGlyZWN0b3J5XCIpIHtcbiAgICAgICAgZmlsZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICBmaWxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmaWxlTG9hZGVyKTtcbiAgICAgICAgZmlsZUlucHV0LnR5cGUgPSBcImZpbGVcIjtcbiAgICAgICAgZmlsZUlucHV0LndlYmtpdGRpcmVjdG9yeSA9IHRydWU7XG4gICAgICAgIGZpbGVJbnB1dC5tb3pkaXJlY3RvcnkgPSB0cnVlO1xuICAgICAgICBmaWxlSW5wdXQubXNkaXJlY3RvcnkgPSB0cnVlO1xuICAgICAgICBmaWxlSW5wdXQub2RpcmVjdG9yeSA9IHRydWU7XG4gICAgICAgIGZpbGVJbnB1dC5kaXJlY3RvcnkgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmlsZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICBmaWxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmaWxlTG9hZGVyKTtcbiAgICAgICAgZmlsZUlucHV0LnR5cGUgPSBcImZpbGVcIjtcbiAgICAgIH1cblxuICAgICAgO1xuICAgICAgdmFyIG1vdXNlRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRzXCIpO1xuICAgICAgbW91c2VFdmVudC5pbml0RXZlbnQoXCJjbGlja1wiLCB0cnVlLCBmYWxzZSk7XG4gICAgICBmaWxlSW5wdXQuZGlzcGF0Y2hFdmVudChtb3VzZUV2ZW50KTtcbiAgICB9KTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBkYXRhOiBwaWNrZXIoXCJkYXRhXCIpLFxuICBmaWxlOiBwaWNrZXIoXCJmaWxlXCIpLFxuICBkaXJlY3Rvcnk6IHBpY2tlcihcImRpcmVjdG9yeVwiKVxufTsiLCJjb25zdCBjcmVhdGVIbWFjID0gcmVxdWlyZSgnY3JlYXRlLWhtYWMnKVxuXG5jb25zdCBPTkUxID0gQnVmZmVyLmFsbG9jKDEsIDEpXG5jb25zdCBaRVJPMSA9IEJ1ZmZlci5hbGxvYygxLCAwKVxuXG4vLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjk3OSNzZWN0aW9uLTMuMlxuZnVuY3Rpb24gZGV0ZXJtaW5pc3RpY0dlbmVyYXRlSyAoaGFzaCwgeCwgY2hlY2tTaWcsIGlzUHJpdmF0ZSwgZXh0cmFFbnRyb3B5KSB7XG4gIC8vIFN0ZXAgQSwgaWdub3JlZCBhcyBoYXNoIGFscmVhZHkgcHJvdmlkZWRcbiAgLy8gU3RlcCBCXG4gIC8vIFN0ZXAgQ1xuICBsZXQgayA9IEJ1ZmZlci5hbGxvYygzMiwgMClcbiAgbGV0IHYgPSBCdWZmZXIuYWxsb2MoMzIsIDEpXG5cbiAgLy8gU3RlcCBEXG4gIGsgPSBjcmVhdGVIbWFjKCdzaGEyNTYnLCBrKVxuICAgIC51cGRhdGUodilcbiAgICAudXBkYXRlKFpFUk8xKVxuICAgIC51cGRhdGUoeClcbiAgICAudXBkYXRlKGhhc2gpXG4gICAgLnVwZGF0ZShleHRyYUVudHJvcHkgfHwgJycpXG4gICAgLmRpZ2VzdCgpXG5cbiAgLy8gU3RlcCBFXG4gIHYgPSBjcmVhdGVIbWFjKCdzaGEyNTYnLCBrKS51cGRhdGUodikuZGlnZXN0KClcblxuICAvLyBTdGVwIEZcbiAgayA9IGNyZWF0ZUhtYWMoJ3NoYTI1NicsIGspXG4gICAgLnVwZGF0ZSh2KVxuICAgIC51cGRhdGUoT05FMSlcbiAgICAudXBkYXRlKHgpXG4gICAgLnVwZGF0ZShoYXNoKVxuICAgIC51cGRhdGUoZXh0cmFFbnRyb3B5IHx8ICcnKVxuICAgIC5kaWdlc3QoKVxuXG4gIC8vIFN0ZXAgR1xuICB2ID0gY3JlYXRlSG1hYygnc2hhMjU2JywgaykudXBkYXRlKHYpLmRpZ2VzdCgpXG5cbiAgLy8gU3RlcCBIMS9IMmEsIGlnbm9yZWQgYXMgdGxlbiA9PT0gcWxlbiAoMjU2IGJpdClcbiAgLy8gU3RlcCBIMmJcbiAgdiA9IGNyZWF0ZUhtYWMoJ3NoYTI1NicsIGspLnVwZGF0ZSh2KS5kaWdlc3QoKVxuXG4gIGxldCBUID0gdlxuXG4gIC8vIFN0ZXAgSDMsIHJlcGVhdCB1bnRpbCBUIGlzIHdpdGhpbiB0aGUgaW50ZXJ2YWwgWzEsIG4gLSAxXSBhbmQgaXMgc3VpdGFibGUgZm9yIEVDRFNBXG4gIHdoaWxlICghaXNQcml2YXRlKFQpIHx8ICFjaGVja1NpZyhUKSkge1xuICAgIGsgPSBjcmVhdGVIbWFjKCdzaGEyNTYnLCBrKVxuICAgICAgLnVwZGF0ZSh2KVxuICAgICAgLnVwZGF0ZShaRVJPMSlcbiAgICAgIC5kaWdlc3QoKVxuXG4gICAgdiA9IGNyZWF0ZUhtYWMoJ3NoYTI1NicsIGspLnVwZGF0ZSh2KS5kaWdlc3QoKVxuXG4gICAgLy8gU3RlcCBIMS9IMmEsIGFnYWluLCBpZ25vcmVkIGFzIHRsZW4gPT09IHFsZW4gKDI1NiBiaXQpXG4gICAgLy8gU3RlcCBIMmIgYWdhaW5cbiAgICB2ID0gY3JlYXRlSG1hYygnc2hhMjU2JywgaykudXBkYXRlKHYpLmRpZ2VzdCgpXG4gICAgVCA9IHZcbiAgfVxuXG4gIHJldHVybiBUXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGV0ZXJtaW5pc3RpY0dlbmVyYXRlS1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG5cbnZhciB6ZXJvV2lkdGhTcGFjZSA9ICdcXHUyMDBiJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRQb2x5ZmlsbCgpIHtcblx0aWYgKFN0cmluZy5wcm90b3R5cGUudHJpbSAmJiB6ZXJvV2lkdGhTcGFjZS50cmltKCkgPT09IHplcm9XaWR0aFNwYWNlKSB7XG5cdFx0cmV0dXJuIFN0cmluZy5wcm90b3R5cGUudHJpbTtcblx0fVxuXHRyZXR1cm4gaW1wbGVtZW50YXRpb247XG59O1xuIiwiY29uc3QgQk4gPSByZXF1aXJlKCdibi5qcycpXG5jb25zdCBFQyA9IHJlcXVpcmUoJ2VsbGlwdGljJykuZWNcbmNvbnN0IHNlY3AyNTZrMSA9IG5ldyBFQygnc2VjcDI1NmsxJylcbmNvbnN0IGRldGVybWluaXN0aWNHZW5lcmF0ZUsgPSByZXF1aXJlKCcuL3JmYzY5NzknKVxuXG5jb25zdCBaRVJPMzIgPSBCdWZmZXIuYWxsb2MoMzIsIDApXG5jb25zdCBFQ19HUk9VUF9PUkRFUiA9IEJ1ZmZlci5mcm9tKCdmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZWJhYWVkY2U2YWY0OGEwM2JiZmQyNWU4Y2QwMzY0MTQxJywgJ2hleCcpXG5jb25zdCBFQ19QID0gQnVmZmVyLmZyb20oJ2ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZlZmZmZmZjMmYnLCAnaGV4JylcblxuY29uc3QgbiA9IHNlY3AyNTZrMS5jdXJ2ZS5uXG5jb25zdCBuRGl2MiA9IG4uc2hybigxKVxuY29uc3QgRyA9IHNlY3AyNTZrMS5jdXJ2ZS5nXG5cbmNvbnN0IFRIUk9XX0JBRF9QUklWQVRFID0gJ0V4cGVjdGVkIFByaXZhdGUnXG5jb25zdCBUSFJPV19CQURfUE9JTlQgPSAnRXhwZWN0ZWQgUG9pbnQnXG5jb25zdCBUSFJPV19CQURfVFdFQUsgPSAnRXhwZWN0ZWQgVHdlYWsnXG5jb25zdCBUSFJPV19CQURfSEFTSCA9ICdFeHBlY3RlZCBIYXNoJ1xuY29uc3QgVEhST1dfQkFEX1NJR05BVFVSRSA9ICdFeHBlY3RlZCBTaWduYXR1cmUnXG5jb25zdCBUSFJPV19CQURfRVhUUkFfREFUQSA9ICdFeHBlY3RlZCBFeHRyYSBEYXRhICgzMiBieXRlcyknXG5cbmZ1bmN0aW9uIGlzU2NhbGFyICh4KSB7XG4gIHJldHVybiBCdWZmZXIuaXNCdWZmZXIoeCkgJiYgeC5sZW5ndGggPT09IDMyXG59XG5cbmZ1bmN0aW9uIGlzT3JkZXJTY2FsYXIgKHgpIHtcbiAgaWYgKCFpc1NjYWxhcih4KSkgcmV0dXJuIGZhbHNlXG4gIHJldHVybiB4LmNvbXBhcmUoRUNfR1JPVVBfT1JERVIpIDwgMCAvLyA8IEdcbn1cblxuZnVuY3Rpb24gaXNQb2ludCAocCkge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihwKSkgcmV0dXJuIGZhbHNlXG4gIGlmIChwLmxlbmd0aCA8IDMzKSByZXR1cm4gZmFsc2VcblxuICBjb25zdCB0ID0gcFswXVxuICBjb25zdCB4ID0gcC5zbGljZSgxLCAzMylcbiAgaWYgKHguY29tcGFyZShaRVJPMzIpID09PSAwKSByZXR1cm4gZmFsc2VcbiAgaWYgKHguY29tcGFyZShFQ19QKSA+PSAwKSByZXR1cm4gZmFsc2VcbiAgaWYgKCh0ID09PSAweDAyIHx8IHQgPT09IDB4MDMpICYmIHAubGVuZ3RoID09PSAzMykge1xuICAgIHRyeSB7IGRlY29kZUZyb20ocCkgfSBjYXRjaCAoZSkgeyByZXR1cm4gZmFsc2UgfSAvLyBUT0RPOiB0ZW1wb3JhcnlcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgY29uc3QgeSA9IHAuc2xpY2UoMzMpXG4gIGlmICh5LmNvbXBhcmUoWkVSTzMyKSA9PT0gMCkgcmV0dXJuIGZhbHNlXG4gIGlmICh5LmNvbXBhcmUoRUNfUCkgPj0gMCkgcmV0dXJuIGZhbHNlXG4gIGlmICh0ID09PSAweDA0ICYmIHAubGVuZ3RoID09PSA2NSkgcmV0dXJuIHRydWVcbiAgcmV0dXJuIGZhbHNlXG59XG5cbmZ1bmN0aW9uIF9faXNQb2ludENvbXByZXNzZWQgKHApIHtcbiAgcmV0dXJuIHBbMF0gIT09IDB4MDRcbn1cblxuZnVuY3Rpb24gaXNQb2ludENvbXByZXNzZWQgKHApIHtcbiAgaWYgKCFpc1BvaW50KHApKSByZXR1cm4gZmFsc2VcbiAgcmV0dXJuIF9faXNQb2ludENvbXByZXNzZWQocClcbn1cblxuZnVuY3Rpb24gaXNQcml2YXRlICh4KSB7XG4gIGlmICghaXNTY2FsYXIoeCkpIHJldHVybiBmYWxzZVxuICByZXR1cm4geC5jb21wYXJlKFpFUk8zMikgPiAwICYmIC8vID4gMFxuICAgIHguY29tcGFyZShFQ19HUk9VUF9PUkRFUikgPCAwIC8vIDwgR1xufVxuXG5mdW5jdGlvbiBpc1NpZ25hdHVyZSAodmFsdWUpIHtcbiAgY29uc3QgciA9IHZhbHVlLnNsaWNlKDAsIDMyKVxuICBjb25zdCBzID0gdmFsdWUuc2xpY2UoMzIsIDY0KVxuICByZXR1cm4gQnVmZmVyLmlzQnVmZmVyKHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDY0ICYmXG4gICAgci5jb21wYXJlKEVDX0dST1VQX09SREVSKSA8IDAgJiZcbiAgICBzLmNvbXBhcmUoRUNfR1JPVVBfT1JERVIpIDwgMFxufVxuXG5mdW5jdGlvbiBhc3N1bWVDb21wcmVzc2lvbiAodmFsdWUsIHB1YmtleSkge1xuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCAmJiBwdWJrZXkgIT09IHVuZGVmaW5lZCkgcmV0dXJuIF9faXNQb2ludENvbXByZXNzZWQocHVia2V5KVxuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRydWVcbiAgcmV0dXJuIHZhbHVlXG59XG5cbmZ1bmN0aW9uIGZyb21CdWZmZXIgKGQpIHsgcmV0dXJuIG5ldyBCTihkKSB9XG5mdW5jdGlvbiB0b0J1ZmZlciAoZCkgeyByZXR1cm4gZC50b0FycmF5TGlrZShCdWZmZXIsICdiZScsIDMyKSB9XG5mdW5jdGlvbiBkZWNvZGVGcm9tIChQKSB7IHJldHVybiBzZWNwMjU2azEuY3VydmUuZGVjb2RlUG9pbnQoUCkgfVxuZnVuY3Rpb24gZ2V0RW5jb2RlZCAoUCwgY29tcHJlc3NlZCkgeyByZXR1cm4gQnVmZmVyLmZyb20oUC5fZW5jb2RlKGNvbXByZXNzZWQpKSB9XG5cbmZ1bmN0aW9uIHBvaW50QWRkIChwQSwgcEIsIF9fY29tcHJlc3NlZCkge1xuICBpZiAoIWlzUG9pbnQocEEpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFRIUk9XX0JBRF9QT0lOVClcbiAgaWYgKCFpc1BvaW50KHBCKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihUSFJPV19CQURfUE9JTlQpXG5cbiAgY29uc3QgYSA9IGRlY29kZUZyb20ocEEpXG4gIGNvbnN0IGIgPSBkZWNvZGVGcm9tKHBCKVxuICBjb25zdCBwcCA9IGEuYWRkKGIpXG4gIGlmIChwcC5pc0luZmluaXR5KCkpIHJldHVybiBudWxsXG5cbiAgY29uc3QgY29tcHJlc3NlZCA9IGFzc3VtZUNvbXByZXNzaW9uKF9fY29tcHJlc3NlZCwgcEEpXG4gIHJldHVybiBnZXRFbmNvZGVkKHBwLCBjb21wcmVzc2VkKVxufVxuXG5mdW5jdGlvbiBwb2ludEFkZFNjYWxhciAocCwgdHdlYWssIF9fY29tcHJlc3NlZCkge1xuICBpZiAoIWlzUG9pbnQocCkpIHRocm93IG5ldyBUeXBlRXJyb3IoVEhST1dfQkFEX1BPSU5UKVxuICBpZiAoIWlzT3JkZXJTY2FsYXIodHdlYWspKSB0aHJvdyBuZXcgVHlwZUVycm9yKFRIUk9XX0JBRF9UV0VBSylcblxuICBjb25zdCBjb21wcmVzc2VkID0gYXNzdW1lQ29tcHJlc3Npb24oX19jb21wcmVzc2VkLCBwKVxuICBjb25zdCBwcCA9IGRlY29kZUZyb20ocClcbiAgaWYgKHR3ZWFrLmNvbXBhcmUoWkVSTzMyKSA9PT0gMCkgcmV0dXJuIGdldEVuY29kZWQocHAsIGNvbXByZXNzZWQpXG5cbiAgY29uc3QgdHQgPSBmcm9tQnVmZmVyKHR3ZWFrKVxuICBjb25zdCBxcSA9IEcubXVsKHR0KVxuICBjb25zdCB1dSA9IHBwLmFkZChxcSlcbiAgaWYgKHV1LmlzSW5maW5pdHkoKSkgcmV0dXJuIG51bGxcblxuICByZXR1cm4gZ2V0RW5jb2RlZCh1dSwgY29tcHJlc3NlZClcbn1cblxuZnVuY3Rpb24gcG9pbnRDb21wcmVzcyAocCwgY29tcHJlc3NlZCkge1xuICBpZiAoIWlzUG9pbnQocCkpIHRocm93IG5ldyBUeXBlRXJyb3IoVEhST1dfQkFEX1BPSU5UKVxuXG4gIGNvbnN0IHBwID0gZGVjb2RlRnJvbShwKVxuICBpZiAocHAuaXNJbmZpbml0eSgpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFRIUk9XX0JBRF9QT0lOVClcblxuICByZXR1cm4gZ2V0RW5jb2RlZChwcCwgY29tcHJlc3NlZClcbn1cblxuZnVuY3Rpb24gcG9pbnRGcm9tU2NhbGFyIChkLCBfX2NvbXByZXNzZWQpIHtcbiAgaWYgKCFpc1ByaXZhdGUoZCkpIHRocm93IG5ldyBUeXBlRXJyb3IoVEhST1dfQkFEX1BSSVZBVEUpXG5cbiAgY29uc3QgZGQgPSBmcm9tQnVmZmVyKGQpXG4gIGNvbnN0IHBwID0gRy5tdWwoZGQpXG4gIGlmIChwcC5pc0luZmluaXR5KCkpIHJldHVybiBudWxsXG5cbiAgY29uc3QgY29tcHJlc3NlZCA9IGFzc3VtZUNvbXByZXNzaW9uKF9fY29tcHJlc3NlZClcbiAgcmV0dXJuIGdldEVuY29kZWQocHAsIGNvbXByZXNzZWQpXG59XG5cbmZ1bmN0aW9uIHBvaW50TXVsdGlwbHkgKHAsIHR3ZWFrLCBfX2NvbXByZXNzZWQpIHtcbiAgaWYgKCFpc1BvaW50KHApKSB0aHJvdyBuZXcgVHlwZUVycm9yKFRIUk9XX0JBRF9QT0lOVClcbiAgaWYgKCFpc09yZGVyU2NhbGFyKHR3ZWFrKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihUSFJPV19CQURfVFdFQUspXG5cbiAgY29uc3QgY29tcHJlc3NlZCA9IGFzc3VtZUNvbXByZXNzaW9uKF9fY29tcHJlc3NlZCwgcClcbiAgY29uc3QgcHAgPSBkZWNvZGVGcm9tKHApXG4gIGNvbnN0IHR0ID0gZnJvbUJ1ZmZlcih0d2VhaylcbiAgY29uc3QgcXEgPSBwcC5tdWwodHQpXG4gIGlmIChxcS5pc0luZmluaXR5KCkpIHJldHVybiBudWxsXG5cbiAgcmV0dXJuIGdldEVuY29kZWQocXEsIGNvbXByZXNzZWQpXG59XG5cbmZ1bmN0aW9uIHByaXZhdGVBZGQgKGQsIHR3ZWFrKSB7XG4gIGlmICghaXNQcml2YXRlKGQpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFRIUk9XX0JBRF9QUklWQVRFKVxuICBpZiAoIWlzT3JkZXJTY2FsYXIodHdlYWspKSB0aHJvdyBuZXcgVHlwZUVycm9yKFRIUk9XX0JBRF9UV0VBSylcblxuICBjb25zdCBkZCA9IGZyb21CdWZmZXIoZClcbiAgY29uc3QgdHQgPSBmcm9tQnVmZmVyKHR3ZWFrKVxuICBjb25zdCBkdCA9IHRvQnVmZmVyKGRkLmFkZCh0dCkudW1vZChuKSlcbiAgaWYgKCFpc1ByaXZhdGUoZHQpKSByZXR1cm4gbnVsbFxuXG4gIHJldHVybiBkdFxufVxuXG5mdW5jdGlvbiBwcml2YXRlU3ViIChkLCB0d2Vhaykge1xuICBpZiAoIWlzUHJpdmF0ZShkKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihUSFJPV19CQURfUFJJVkFURSlcbiAgaWYgKCFpc09yZGVyU2NhbGFyKHR3ZWFrKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihUSFJPV19CQURfVFdFQUspXG5cbiAgY29uc3QgZGQgPSBmcm9tQnVmZmVyKGQpXG4gIGNvbnN0IHR0ID0gZnJvbUJ1ZmZlcih0d2VhaylcbiAgY29uc3QgZHQgPSB0b0J1ZmZlcihkZC5zdWIodHQpLnVtb2QobikpXG4gIGlmICghaXNQcml2YXRlKGR0KSkgcmV0dXJuIG51bGxcblxuICByZXR1cm4gZHRcbn1cblxuZnVuY3Rpb24gc2lnbiAoaGFzaCwgeCkge1xuICByZXR1cm4gX19zaWduKGhhc2gsIHgpXG59XG5cbmZ1bmN0aW9uIHNpZ25XaXRoRW50cm9weSAoaGFzaCwgeCwgYWRkRGF0YSkge1xuICByZXR1cm4gX19zaWduKGhhc2gsIHgsIGFkZERhdGEpXG59XG5cbmZ1bmN0aW9uIF9fc2lnbiAoaGFzaCwgeCwgYWRkRGF0YSkge1xuICBpZiAoIWlzU2NhbGFyKGhhc2gpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFRIUk9XX0JBRF9IQVNIKVxuICBpZiAoIWlzUHJpdmF0ZSh4KSkgdGhyb3cgbmV3IFR5cGVFcnJvcihUSFJPV19CQURfUFJJVkFURSlcbiAgaWYgKGFkZERhdGEgIT09IHVuZGVmaW5lZCAmJiAhaXNTY2FsYXIoYWRkRGF0YSkpIHRocm93IG5ldyBUeXBlRXJyb3IoVEhST1dfQkFEX0VYVFJBX0RBVEEpXG5cbiAgY29uc3QgZCA9IGZyb21CdWZmZXIoeClcbiAgY29uc3QgZSA9IGZyb21CdWZmZXIoaGFzaClcblxuICBsZXQgciwgc1xuICBjb25zdCBjaGVja1NpZyA9IGZ1bmN0aW9uIChrKSB7XG4gICAgY29uc3Qga0kgPSBmcm9tQnVmZmVyKGspXG4gICAgY29uc3QgUSA9IEcubXVsKGtJKVxuXG4gICAgaWYgKFEuaXNJbmZpbml0eSgpKSByZXR1cm4gZmFsc2VcblxuICAgIHIgPSBRLngudW1vZChuKVxuICAgIGlmIChyLmlzWmVybygpID09PSAwKSByZXR1cm4gZmFsc2VcblxuICAgIHMgPSBrSVxuICAgICAgLmludm0obilcbiAgICAgIC5tdWwoZS5hZGQoZC5tdWwocikpKVxuICAgICAgLnVtb2QobilcbiAgICBpZiAocy5pc1plcm8oKSA9PT0gMCkgcmV0dXJuIGZhbHNlXG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgZGV0ZXJtaW5pc3RpY0dlbmVyYXRlSyhoYXNoLCB4LCBjaGVja1NpZywgaXNQcml2YXRlLCBhZGREYXRhKVxuXG4gIC8vIGVuZm9yY2UgbG93IFMgdmFsdWVzLCBzZWUgYmlwNjI6ICdsb3cgcyB2YWx1ZXMgaW4gc2lnbmF0dXJlcydcbiAgaWYgKHMuY21wKG5EaXYyKSA+IDApIHtcbiAgICBzID0gbi5zdWIocylcbiAgfVxuXG4gIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSg2NClcbiAgdG9CdWZmZXIocikuY29weShidWZmZXIsIDApXG4gIHRvQnVmZmVyKHMpLmNvcHkoYnVmZmVyLCAzMilcbiAgcmV0dXJuIGJ1ZmZlclxufVxuXG5mdW5jdGlvbiB2ZXJpZnkgKGhhc2gsIHEsIHNpZ25hdHVyZSkge1xuICBpZiAoIWlzU2NhbGFyKGhhc2gpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFRIUk9XX0JBRF9IQVNIKVxuICBpZiAoIWlzUG9pbnQocSkpIHRocm93IG5ldyBUeXBlRXJyb3IoVEhST1dfQkFEX1BPSU5UKVxuXG4gIC8vIDEuNC4xIEVuZm9yY2UgciBhbmQgcyBhcmUgYm90aCBpbnRlZ2VycyBpbiB0aGUgaW50ZXJ2YWwgWzEsIG4g4oiSIDFdICgxLCBpc1NpZ25hdHVyZSBlbmZvcmNlcyAnPCBuIC0gMScpXG4gIGlmICghaXNTaWduYXR1cmUoc2lnbmF0dXJlKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihUSFJPV19CQURfU0lHTkFUVVJFKVxuXG4gIGNvbnN0IFEgPSBkZWNvZGVGcm9tKHEpXG4gIGNvbnN0IHIgPSBmcm9tQnVmZmVyKHNpZ25hdHVyZS5zbGljZSgwLCAzMikpXG4gIGNvbnN0IHMgPSBmcm9tQnVmZmVyKHNpZ25hdHVyZS5zbGljZSgzMiwgNjQpKVxuXG4gIC8vIDEuNC4xIEVuZm9yY2UgciBhbmQgcyBhcmUgYm90aCBpbnRlZ2VycyBpbiB0aGUgaW50ZXJ2YWwgWzEsIG4g4oiSIDFdICgyLCBlbmZvcmNlcyAnPiAwJylcbiAgaWYgKHIuZ3RuKDApIDw9IDAgLyogfHwgci5jb21wYXJlVG8obikgPj0gMCAqLykgcmV0dXJuIGZhbHNlXG4gIGlmIChzLmd0bigwKSA8PSAwIC8qIHx8IHMuY29tcGFyZVRvKG4pID49IDAgKi8pIHJldHVybiBmYWxzZVxuXG4gIC8vIDEuNC4yIEggPSBIYXNoKE0pLCBhbHJlYWR5IGRvbmUgYnkgdGhlIHVzZXJcbiAgLy8gMS40LjMgZSA9IEhcbiAgY29uc3QgZSA9IGZyb21CdWZmZXIoaGFzaClcblxuICAvLyBDb21wdXRlIHNeLTFcbiAgY29uc3Qgc0ludiA9IHMuaW52bShuKVxuXG4gIC8vIDEuNC40IENvbXB1dGUgdTEgPSBlc17iiJIxIG1vZCBuXG4gIC8vICAgICAgICAgICAgICAgdTIgPSByc17iiJIxIG1vZCBuXG4gIGNvbnN0IHUxID0gZS5tdWwoc0ludikudW1vZChuKVxuICBjb25zdCB1MiA9IHIubXVsKHNJbnYpLnVtb2QobilcblxuICAvLyAxLjQuNSBDb21wdXRlIFIgPSAoeFIsIHlSKVxuICAvLyAgICAgICAgICAgICAgIFIgPSB1MUcgKyB1MlFcbiAgY29uc3QgUiA9IEcubXVsQWRkKHUxLCBRLCB1MilcblxuICAvLyAxLjQuNSAoY29udC4pIEVuZm9yY2UgUiBpcyBub3QgYXQgaW5maW5pdHlcbiAgaWYgKFIuaXNJbmZpbml0eSgpKSByZXR1cm4gZmFsc2VcblxuICAvLyAxLjQuNiBDb252ZXJ0IHRoZSBmaWVsZCBlbGVtZW50IFIueCB0byBhbiBpbnRlZ2VyXG4gIGNvbnN0IHhSID0gUi54XG5cbiAgLy8gMS40LjcgU2V0IHYgPSB4UiBtb2QgblxuICBjb25zdCB2ID0geFIudW1vZChuKVxuXG4gIC8vIDEuNC44IElmIHYgPSByLCBvdXRwdXQgXCJ2YWxpZFwiLCBhbmQgaWYgdiAhPSByLCBvdXRwdXQgXCJpbnZhbGlkXCJcbiAgcmV0dXJuIHYuZXEocilcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzUG9pbnQsXG4gIGlzUG9pbnRDb21wcmVzc2VkLFxuICBpc1ByaXZhdGUsXG4gIHBvaW50QWRkLFxuICBwb2ludEFkZFNjYWxhcixcbiAgcG9pbnRDb21wcmVzcyxcbiAgcG9pbnRGcm9tU2NhbGFyLFxuICBwb2ludE11bHRpcGx5LFxuICBwcml2YXRlQWRkLFxuICBwcml2YXRlU3ViLFxuICBzaWduLFxuICBzaWduV2l0aEVudHJvcHksXG4gIHZlcmlmeVxufVxuIiwidmFyIHVuYXZhaWxhYmxlID0gZnVuY3Rpb24gdW5hdmFpbGFibGUoKSB7XG4gIHRocm93IFwiVGhpcyBzd2FybS5qcyBmdW5jdGlvbiBpc24ndCBhdmFpbGFibGUgb24gdGhlIGJyb3dzZXIuXCI7XG59O1xuXG52YXIgZnMgPSB7XG4gIHJlYWRGaWxlOiB1bmF2YWlsYWJsZVxufTtcbnZhciBmaWxlcyA9IHtcbiAgZG93bmxvYWQ6IHVuYXZhaWxhYmxlLFxuICBzYWZlRG93bmxvYWRBcmNoaXZlZDogdW5hdmFpbGFibGUsXG4gIGRpcmVjdG9yeVRyZWU6IHVuYXZhaWxhYmxlXG59O1xudmFyIG9zID0ge1xuICBwbGF0Zm9ybTogdW5hdmFpbGFibGUsXG4gIGFyY2g6IHVuYXZhaWxhYmxlXG59O1xudmFyIHBhdGggPSB7XG4gIGpvaW46IHVuYXZhaWxhYmxlLFxuICBzbGljZTogdW5hdmFpbGFibGVcbn07XG52YXIgY2hpbGRfcHJvY2VzcyA9IHtcbiAgc3Bhd246IHVuYXZhaWxhYmxlXG59O1xudmFyIG1pbWV0eXBlID0ge1xuICBsb29rdXA6IHVuYXZhaWxhYmxlXG59O1xudmFyIGRlZmF1bHRBcmNoaXZlcyA9IHt9O1xudmFyIGRvd25sb2FkVXJsID0gbnVsbDtcblxudmFyIHJlcXVlc3QgPSByZXF1aXJlKFwieGhyLXJlcXVlc3QtcHJvbWlzZVwiKTtcblxudmFyIGJ5dGVzID0gcmVxdWlyZShcImV0aC1saWIvbGliL2J5dGVzXCIpO1xuXG52YXIgaGFzaCA9IHJlcXVpcmUoXCIuL3N3YXJtLWhhc2guanNcIik7XG5cbnZhciBwaWNrID0gcmVxdWlyZShcIi4vcGljay5qc1wiKTtcblxudmFyIHN3YXJtID0gcmVxdWlyZShcIi4vc3dhcm1cIik7XG5cbm1vZHVsZS5leHBvcnRzID0gc3dhcm0oe1xuICBmczogZnMsXG4gIGZpbGVzOiBmaWxlcyxcbiAgb3M6IG9zLFxuICBwYXRoOiBwYXRoLFxuICBjaGlsZF9wcm9jZXNzOiBjaGlsZF9wcm9jZXNzLFxuICBkZWZhdWx0QXJjaGl2ZXM6IGRlZmF1bHRBcmNoaXZlcyxcbiAgbWltZXR5cGU6IG1pbWV0eXBlLFxuICByZXF1ZXN0OiByZXF1ZXN0LFxuICBkb3dubG9hZFVybDogZG93bmxvYWRVcmwsXG4gIGJ5dGVzOiBieXRlcyxcbiAgaGFzaDogaGFzaCxcbiAgcGljazogcGlja1xufSk7IiwiLy8gVGhpcyBpcyBmcmVlIGFuZCB1bmVuY3VtYmVyZWQgc29mdHdhcmUgcmVsZWFzZWQgaW50byB0aGUgcHVibGljIGRvbWFpbi5cbi8vIFNlZSBMSUNFTlNFLm1kIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuXG52YXIgZW5jb2RpbmcgPSByZXF1aXJlKFwiLi9saWIvZW5jb2RpbmcuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBUZXh0RW5jb2RlcjogZW5jb2RpbmcuVGV4dEVuY29kZXIsXG4gIFRleHREZWNvZGVyOiBlbmNvZGluZy5UZXh0RGVjb2Rlcixcbn07XG4iLCIvLyBUaGlzIGlzIGZyZWUgYW5kIHVuZW5jdW1iZXJlZCBzb2Z0d2FyZSByZWxlYXNlZCBpbnRvIHRoZSBwdWJsaWMgZG9tYWluLlxuLy8gU2VlIExJQ0VOU0UubWQgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG5cbi8qKlxuICogQGZpbGVvdmVydmlldyBHbG9iYWwgfHRoaXN8IHJlcXVpcmVkIGZvciByZXNvbHZpbmcgaW5kZXhlcyBpbiBub2RlLlxuICogQHN1cHByZXNzIHtnbG9iYWxUaGlzfVxuICovXG4oZnVuY3Rpb24oZ2xvYmFsKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBJZiB3ZSdyZSBpbiBub2RlIHJlcXVpcmUgZW5jb2RpbmctaW5kZXhlcyBhbmQgYXR0YWNoIGl0IHRvIHRoZSBnbG9iYWwuXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiICYmIG1vZHVsZS5leHBvcnRzICYmXG4gICAgIWdsb2JhbFtcImVuY29kaW5nLWluZGV4ZXNcIl0pIHtcbiAgICBnbG9iYWxbXCJlbmNvZGluZy1pbmRleGVzXCJdID1cbiAgICAgIHJlcXVpcmUoXCIuL2VuY29kaW5nLWluZGV4ZXMuanNcIilbXCJlbmNvZGluZy1pbmRleGVzXCJdO1xuICB9XG5cbiAgLy9cbiAgLy8gVXRpbGl0aWVzXG4gIC8vXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhIFRoZSBudW1iZXIgdG8gdGVzdC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG1pbiBUaGUgbWluaW11bSB2YWx1ZSBpbiB0aGUgcmFuZ2UsIGluY2x1c2l2ZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG1heCBUaGUgbWF4aW11bSB2YWx1ZSBpbiB0aGUgcmFuZ2UsIGluY2x1c2l2ZS5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBhID49IG1pbiBhbmQgYSA8PSBtYXguXG4gICAqL1xuICBmdW5jdGlvbiBpblJhbmdlKGEsIG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIG1pbiA8PSBhICYmIGEgPD0gbWF4O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUFycmF5LjwqPn0gYXJyYXkgVGhlIGFycmF5IHRvIGNoZWNrLlxuICAgKiBAcGFyYW0geyp9IGl0ZW0gVGhlIGl0ZW0gdG8gbG9vayBmb3IgaW4gdGhlIGFycmF5LlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBpdGVtIGFwcGVhcnMgaW4gdGhlIGFycmF5LlxuICAgKi9cbiAgZnVuY3Rpb24gaW5jbHVkZXMoYXJyYXksIGl0ZW0pIHtcbiAgICByZXR1cm4gYXJyYXkuaW5kZXhPZihpdGVtKSAhPT0gLTE7XG4gIH1cblxuICB2YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0geyp9IG9cbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgZnVuY3Rpb24gVG9EaWN0aW9uYXJ5KG8pIHtcbiAgICBpZiAobyA9PT0gdW5kZWZpbmVkKSByZXR1cm4ge307XG4gICAgaWYgKG8gPT09IE9iamVjdChvKSkgcmV0dXJuIG87XG4gICAgdGhyb3cgVHlwZUVycm9yKCdDb3VsZCBub3QgY29udmVydCBhcmd1bWVudCB0byBkaWN0aW9uYXJ5Jyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBJbnB1dCBzdHJpbmcgb2YgVVRGLTE2IGNvZGUgdW5pdHMuXG4gICAqIEByZXR1cm4geyFBcnJheS48bnVtYmVyPn0gQ29kZSBwb2ludHMuXG4gICAqL1xuICBmdW5jdGlvbiBzdHJpbmdUb0NvZGVQb2ludHMoc3RyaW5nKSB7XG4gICAgLy8gaHR0cHM6Ly9oZXljYW0uZ2l0aHViLmlvL3dlYmlkbC8jZGZuLW9idGFpbi11bmljb2RlXG5cbiAgICAvLyAxLiBMZXQgUyBiZSB0aGUgRE9NU3RyaW5nIHZhbHVlLlxuICAgIHZhciBzID0gU3RyaW5nKHN0cmluZyk7XG5cbiAgICAvLyAyLiBMZXQgbiBiZSB0aGUgbGVuZ3RoIG9mIFMuXG4gICAgdmFyIG4gPSBzLmxlbmd0aDtcblxuICAgIC8vIDMuIEluaXRpYWxpemUgaSB0byAwLlxuICAgIHZhciBpID0gMDtcblxuICAgIC8vIDQuIEluaXRpYWxpemUgVSB0byBiZSBhbiBlbXB0eSBzZXF1ZW5jZSBvZiBVbmljb2RlIGNoYXJhY3RlcnMuXG4gICAgdmFyIHUgPSBbXTtcblxuICAgIC8vIDUuIFdoaWxlIGkgPCBuOlxuICAgIHdoaWxlIChpIDwgbikge1xuXG4gICAgICAvLyAxLiBMZXQgYyBiZSB0aGUgY29kZSB1bml0IGluIFMgYXQgaW5kZXggaS5cbiAgICAgIHZhciBjID0gcy5jaGFyQ29kZUF0KGkpO1xuXG4gICAgICAvLyAyLiBEZXBlbmRpbmcgb24gdGhlIHZhbHVlIG9mIGM6XG5cbiAgICAgIC8vIGMgPCAweEQ4MDAgb3IgYyA+IDB4REZGRlxuICAgICAgaWYgKGMgPCAweEQ4MDAgfHwgYyA+IDB4REZGRikge1xuICAgICAgICAvLyBBcHBlbmQgdG8gVSB0aGUgVW5pY29kZSBjaGFyYWN0ZXIgd2l0aCBjb2RlIHBvaW50IGMuXG4gICAgICAgIHUucHVzaChjKTtcbiAgICAgIH1cblxuICAgICAgLy8gMHhEQzAwIOKJpCBjIOKJpCAweERGRkZcbiAgICAgIGVsc2UgaWYgKDB4REMwMCA8PSBjICYmIGMgPD0gMHhERkZGKSB7XG4gICAgICAgIC8vIEFwcGVuZCB0byBVIGEgVStGRkZEIFJFUExBQ0VNRU5UIENIQVJBQ1RFUi5cbiAgICAgICAgdS5wdXNoKDB4RkZGRCk7XG4gICAgICB9XG5cbiAgICAgIC8vIDB4RDgwMCDiiaQgYyDiiaQgMHhEQkZGXG4gICAgICBlbHNlIGlmICgweEQ4MDAgPD0gYyAmJiBjIDw9IDB4REJGRikge1xuICAgICAgICAvLyAxLiBJZiBpID0gbuKIkjEsIHRoZW4gYXBwZW5kIHRvIFUgYSBVK0ZGRkQgUkVQTEFDRU1FTlRcbiAgICAgICAgLy8gQ0hBUkFDVEVSLlxuICAgICAgICBpZiAoaSA9PT0gbiAtIDEpIHtcbiAgICAgICAgICB1LnB1c2goMHhGRkZEKTtcbiAgICAgICAgfVxuICAgICAgICAvLyAyLiBPdGhlcndpc2UsIGkgPCBu4oiSMTpcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgLy8gMS4gTGV0IGQgYmUgdGhlIGNvZGUgdW5pdCBpbiBTIGF0IGluZGV4IGkrMS5cbiAgICAgICAgICB2YXIgZCA9IHMuY2hhckNvZGVBdChpICsgMSk7XG5cbiAgICAgICAgICAvLyAyLiBJZiAweERDMDAg4omkIGQg4omkIDB4REZGRiwgdGhlbjpcbiAgICAgICAgICBpZiAoMHhEQzAwIDw9IGQgJiYgZCA8PSAweERGRkYpIHtcbiAgICAgICAgICAgIC8vIDEuIExldCBhIGJlIGMgJiAweDNGRi5cbiAgICAgICAgICAgIHZhciBhID0gYyAmIDB4M0ZGO1xuXG4gICAgICAgICAgICAvLyAyLiBMZXQgYiBiZSBkICYgMHgzRkYuXG4gICAgICAgICAgICB2YXIgYiA9IGQgJiAweDNGRjtcblxuICAgICAgICAgICAgLy8gMy4gQXBwZW5kIHRvIFUgdGhlIFVuaWNvZGUgY2hhcmFjdGVyIHdpdGggY29kZSBwb2ludFxuICAgICAgICAgICAgLy8gMl4xNisyXjEwKmErYi5cbiAgICAgICAgICAgIHUucHVzaCgweDEwMDAwICsgKGEgPDwgMTApICsgYik7XG5cbiAgICAgICAgICAgIC8vIDQuIFNldCBpIHRvIGkrMS5cbiAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyAzLiBPdGhlcndpc2UsIGQgPCAweERDMDAgb3IgZCA+IDB4REZGRi4gQXBwZW5kIHRvIFUgYVxuICAgICAgICAgIC8vIFUrRkZGRCBSRVBMQUNFTUVOVCBDSEFSQUNURVIuXG4gICAgICAgICAgZWxzZSAge1xuICAgICAgICAgICAgdS5wdXNoKDB4RkZGRCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIDMuIFNldCBpIHRvIGkrMS5cbiAgICAgIGkgKz0gMTtcbiAgICB9XG5cbiAgICAvLyA2LiBSZXR1cm4gVS5cbiAgICByZXR1cm4gdTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFBcnJheS48bnVtYmVyPn0gY29kZV9wb2ludHMgQXJyYXkgb2YgY29kZSBwb2ludHMuXG4gICAqIEByZXR1cm4ge3N0cmluZ30gc3RyaW5nIFN0cmluZyBvZiBVVEYtMTYgY29kZSB1bml0cy5cbiAgICovXG4gIGZ1bmN0aW9uIGNvZGVQb2ludHNUb1N0cmluZyhjb2RlX3BvaW50cykge1xuICAgIHZhciBzID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2RlX3BvaW50cy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGNwID0gY29kZV9wb2ludHNbaV07XG4gICAgICBpZiAoY3AgPD0gMHhGRkZGKSB7XG4gICAgICAgIHMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjcCAtPSAweDEwMDAwO1xuICAgICAgICBzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGNwID4+IDEwKSArIDB4RDgwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjcCAmIDB4M0ZGKSArIDB4REMwMCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzO1xuICB9XG5cblxuICAvL1xuICAvLyBJbXBsZW1lbnRhdGlvbiBvZiBFbmNvZGluZyBzcGVjaWZpY2F0aW9uXG4gIC8vIGh0dHBzOi8vZW5jb2Rpbmcuc3BlYy53aGF0d2cub3JnL1xuICAvL1xuXG4gIC8vXG4gIC8vIDQuIFRlcm1pbm9sb2d5XG4gIC8vXG5cbiAgLyoqXG4gICAqIEFuIEFTQ0lJIGJ5dGUgaXMgYSBieXRlIGluIHRoZSByYW5nZSAweDAwIHRvIDB4N0YsIGluY2x1c2l2ZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGEgVGhlIG51bWJlciB0byB0ZXN0LlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGEgaXMgaW4gdGhlIHJhbmdlIDB4MDAgdG8gMHg3RiwgaW5jbHVzaXZlLlxuICAgKi9cbiAgZnVuY3Rpb24gaXNBU0NJSUJ5dGUoYSkge1xuICAgIHJldHVybiAweDAwIDw9IGEgJiYgYSA8PSAweDdGO1xuICB9XG5cbiAgLyoqXG4gICAqIEFuIEFTQ0lJIGNvZGUgcG9pbnQgaXMgYSBjb2RlIHBvaW50IGluIHRoZSByYW5nZSBVKzAwMDAgdG9cbiAgICogVSswMDdGLCBpbmNsdXNpdmUuXG4gICAqL1xuICB2YXIgaXNBU0NJSUNvZGVQb2ludCA9IGlzQVNDSUlCeXRlO1xuXG5cbiAgLyoqXG4gICAqIEVuZC1vZi1zdHJlYW0gaXMgYSBzcGVjaWFsIHRva2VuIHRoYXQgc2lnbmlmaWVzIG5vIG1vcmUgdG9rZW5zXG4gICAqIGFyZSBpbiB0aGUgc3RyZWFtLlxuICAgKiBAY29uc3RcbiAgICovIHZhciBlbmRfb2Zfc3RyZWFtID0gLTE7XG5cbiAgLyoqXG4gICAqIEEgc3RyZWFtIHJlcHJlc2VudHMgYW4gb3JkZXJlZCBzZXF1ZW5jZSBvZiB0b2tlbnMuXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0geyEoQXJyYXkuPG51bWJlcj58VWludDhBcnJheSl9IHRva2VucyBBcnJheSBvZiB0b2tlbnMgdGhhdCBwcm92aWRlXG4gICAqIHRoZSBzdHJlYW0uXG4gICAqL1xuICBmdW5jdGlvbiBTdHJlYW0odG9rZW5zKSB7XG4gICAgLyoqIEB0eXBlIHshQXJyYXkuPG51bWJlcj59ICovXG4gICAgdGhpcy50b2tlbnMgPSBbXS5zbGljZS5jYWxsKHRva2Vucyk7XG4gICAgLy8gUmV2ZXJzZWQgYXMgcHVzaC9wb3AgaXMgbW9yZSBlZmZpY2llbnQgdGhhbiBzaGlmdC91bnNoaWZ0LlxuICAgIHRoaXMudG9rZW5zLnJldmVyc2UoKTtcbiAgfVxuXG4gIFN0cmVhbS5wcm90b3R5cGUgPSB7XG4gICAgLyoqXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBlbmQtb2Ytc3RyZWFtIGhhcyBiZWVuIGhpdC5cbiAgICAgKi9cbiAgICBlbmRPZlN0cmVhbTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gIXRoaXMudG9rZW5zLmxlbmd0aDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogV2hlbiBhIHRva2VuIGlzIHJlYWQgZnJvbSBhIHN0cmVhbSwgdGhlIGZpcnN0IHRva2VuIGluIHRoZVxuICAgICAqIHN0cmVhbSBtdXN0IGJlIHJldHVybmVkIGFuZCBzdWJzZXF1ZW50bHkgcmVtb3ZlZCwgYW5kXG4gICAgICogZW5kLW9mLXN0cmVhbSBtdXN0IGJlIHJldHVybmVkIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gR2V0IHRoZSBuZXh0IHRva2VuIGZyb20gdGhlIHN0cmVhbSwgb3JcbiAgICAgKiBlbmRfb2Zfc3RyZWFtLlxuICAgICAqL1xuICAgICByZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghdGhpcy50b2tlbnMubGVuZ3RoKVxuICAgICAgICByZXR1cm4gZW5kX29mX3N0cmVhbTtcbiAgICAgICByZXR1cm4gdGhpcy50b2tlbnMucG9wKCk7XG4gICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBXaGVuIG9uZSBvciBtb3JlIHRva2VucyBhcmUgcHJlcGVuZGVkIHRvIGEgc3RyZWFtLCB0aG9zZSB0b2tlbnNcbiAgICAgKiBtdXN0IGJlIGluc2VydGVkLCBpbiBnaXZlbiBvcmRlciwgYmVmb3JlIHRoZSBmaXJzdCB0b2tlbiBpbiB0aGVcbiAgICAgKiBzdHJlYW0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyhudW1iZXJ8IUFycmF5LjxudW1iZXI+KX0gdG9rZW4gVGhlIHRva2VuKHMpIHRvIHByZXBlbmQgdG8gdGhlXG4gICAgICogc3RyZWFtLlxuICAgICAqL1xuICAgIHByZXBlbmQ6IGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh0b2tlbikpIHtcbiAgICAgICAgdmFyIHRva2VucyA9IC8qKkB0eXBlIHshQXJyYXkuPG51bWJlcj59Ki8odG9rZW4pO1xuICAgICAgICB3aGlsZSAodG9rZW5zLmxlbmd0aClcbiAgICAgICAgICB0aGlzLnRva2Vucy5wdXNoKHRva2Vucy5wb3AoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogV2hlbiBvbmUgb3IgbW9yZSB0b2tlbnMgYXJlIHB1c2hlZCB0byBhIHN0cmVhbSwgdGhvc2UgdG9rZW5zXG4gICAgICogbXVzdCBiZSBpbnNlcnRlZCwgaW4gZ2l2ZW4gb3JkZXIsIGFmdGVyIHRoZSBsYXN0IHRva2VuIGluIHRoZVxuICAgICAqIHN0cmVhbS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7KG51bWJlcnwhQXJyYXkuPG51bWJlcj4pfSB0b2tlbiBUaGUgdG9rZW5zKHMpIHRvIHB1c2ggdG8gdGhlXG4gICAgICogc3RyZWFtLlxuICAgICAqL1xuICAgIHB1c2g6IGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh0b2tlbikpIHtcbiAgICAgICAgdmFyIHRva2VucyA9IC8qKkB0eXBlIHshQXJyYXkuPG51bWJlcj59Ki8odG9rZW4pO1xuICAgICAgICB3aGlsZSAodG9rZW5zLmxlbmd0aClcbiAgICAgICAgICB0aGlzLnRva2Vucy51bnNoaWZ0KHRva2Vucy5zaGlmdCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudG9rZW5zLnVuc2hpZnQodG9rZW4pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvL1xuICAvLyA1LiBFbmNvZGluZ3NcbiAgLy9cblxuICAvLyA1LjEgRW5jb2RlcnMgYW5kIGRlY29kZXJzXG5cbiAgLyoqIEBjb25zdCAqL1xuICB2YXIgZmluaXNoZWQgPSAtMTtcblxuICAvKipcbiAgICogQHBhcmFtIHtib29sZWFufSBmYXRhbCBJZiB0cnVlLCBkZWNvZGluZyBlcnJvcnMgcmFpc2UgYW4gZXhjZXB0aW9uLlxuICAgKiBAcGFyYW0ge251bWJlcj19IG9wdF9jb2RlX3BvaW50IE92ZXJyaWRlIHRoZSBzdGFuZGFyZCBmYWxsYmFjayBjb2RlIHBvaW50LlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBjb2RlIHBvaW50IHRvIGluc2VydCBvbiBhIGRlY29kaW5nIGVycm9yLlxuICAgKi9cbiAgZnVuY3Rpb24gZGVjb2RlckVycm9yKGZhdGFsLCBvcHRfY29kZV9wb2ludCkge1xuICAgIGlmIChmYXRhbClcbiAgICAgIHRocm93IFR5cGVFcnJvcignRGVjb2RlciBlcnJvcicpO1xuICAgIHJldHVybiBvcHRfY29kZV9wb2ludCB8fCAweEZGRkQ7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IGNvZGVfcG9pbnQgVGhlIGNvZGUgcG9pbnQgdGhhdCBjb3VsZCBub3QgYmUgZW5jb2RlZC5cbiAgICogQHJldHVybiB7bnVtYmVyfSBBbHdheXMgdGhyb3dzLCBubyB2YWx1ZSBpcyBhY3R1YWxseSByZXR1cm5lZC5cbiAgICovXG4gIGZ1bmN0aW9uIGVuY29kZXJFcnJvcihjb2RlX3BvaW50KSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdUaGUgY29kZSBwb2ludCAnICsgY29kZV9wb2ludCArICcgY291bGQgbm90IGJlIGVuY29kZWQuJyk7XG4gIH1cblxuICAvKiogQGludGVyZmFjZSAqL1xuICBmdW5jdGlvbiBEZWNvZGVyKCkge31cbiAgRGVjb2Rlci5wcm90b3R5cGUgPSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbSBUaGUgc3RyZWFtIG9mIGJ5dGVzIGJlaW5nIGRlY29kZWQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGJpdGUgVGhlIG5leHQgYnl0ZSByZWFkIGZyb20gdGhlIHN0cmVhbS5cbiAgICAgKiBAcmV0dXJuIHs/KG51bWJlcnwhQXJyYXkuPG51bWJlcj4pfSBUaGUgbmV4dCBjb2RlIHBvaW50KHMpXG4gICAgICogICAgIGRlY29kZWQsIG9yIG51bGwgaWYgbm90IGVub3VnaCBkYXRhIGV4aXN0cyBpbiB0aGUgaW5wdXRcbiAgICAgKiAgICAgc3RyZWFtIHRvIGRlY29kZSBhIGNvbXBsZXRlIGNvZGUgcG9pbnQsIG9yIHxmaW5pc2hlZHwuXG4gICAgICovXG4gICAgaGFuZGxlcjogZnVuY3Rpb24oc3RyZWFtLCBiaXRlKSB7fVxuICB9O1xuXG4gIC8qKiBAaW50ZXJmYWNlICovXG4gIGZ1bmN0aW9uIEVuY29kZXIoKSB7fVxuICBFbmNvZGVyLnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtIFRoZSBzdHJlYW0gb2YgY29kZSBwb2ludHMgYmVpbmcgZW5jb2RlZC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY29kZV9wb2ludCBOZXh0IGNvZGUgcG9pbnQgcmVhZCBmcm9tIHRoZSBzdHJlYW0uXG4gICAgICogQHJldHVybiB7KG51bWJlcnwhQXJyYXkuPG51bWJlcj4pfSBCeXRlKHMpIHRvIGVtaXQsIG9yIHxmaW5pc2hlZHwuXG4gICAgICovXG4gICAgaGFuZGxlcjogZnVuY3Rpb24oc3RyZWFtLCBjb2RlX3BvaW50KSB7fVxuICB9O1xuXG4gIC8vIDUuMiBOYW1lcyBhbmQgbGFiZWxzXG5cbiAgLy8gVE9ETzogRGVmaW5lIEB0eXBlZGVmIGZvciBFbmNvZGluZzoge25hbWU6c3RyaW5nLGxhYmVsczpBcnJheS48c3RyaW5nPn1cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZS9jbG9zdXJlLWNvbXBpbGVyL2lzc3Vlcy8yNDdcblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIFRoZSBlbmNvZGluZyBsYWJlbC5cbiAgICogQHJldHVybiB7P3tuYW1lOnN0cmluZyxsYWJlbHM6QXJyYXkuPHN0cmluZz59fVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0RW5jb2RpbmcobGFiZWwpIHtcbiAgICAvLyAxLiBSZW1vdmUgYW55IGxlYWRpbmcgYW5kIHRyYWlsaW5nIEFTQ0lJIHdoaXRlc3BhY2UgZnJvbSBsYWJlbC5cbiAgICBsYWJlbCA9IFN0cmluZyhsYWJlbCkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAvLyAyLiBJZiBsYWJlbCBpcyBhbiBBU0NJSSBjYXNlLWluc2Vuc2l0aXZlIG1hdGNoIGZvciBhbnkgb2YgdGhlXG4gICAgLy8gbGFiZWxzIGxpc3RlZCBpbiB0aGUgdGFibGUgYmVsb3csIHJldHVybiB0aGUgY29ycmVzcG9uZGluZ1xuICAgIC8vIGVuY29kaW5nLCBhbmQgZmFpbHVyZSBvdGhlcndpc2UuXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChsYWJlbF90b19lbmNvZGluZywgbGFiZWwpKSB7XG4gICAgICByZXR1cm4gbGFiZWxfdG9fZW5jb2RpbmdbbGFiZWxdO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbmNvZGluZ3MgdGFibGU6IGh0dHBzOi8vZW5jb2Rpbmcuc3BlYy53aGF0d2cub3JnL2VuY29kaW5ncy5qc29uXG4gICAqIEBjb25zdFxuICAgKiBAdHlwZSB7IUFycmF5Ljx7XG4gICAqICAgICAgICAgIGhlYWRpbmc6IHN0cmluZyxcbiAgICogICAgICAgICAgZW5jb2RpbmdzOiBBcnJheS48e25hbWU6c3RyaW5nLGxhYmVsczpBcnJheS48c3RyaW5nPn0+XG4gICAqICAgICAgICB9Pn1cbiAgICovXG4gIHZhciBlbmNvZGluZ3MgPSBbXG4gICAge1xuICAgICAgXCJlbmNvZGluZ3NcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJsYWJlbHNcIjogW1xuICAgICAgICAgICAgXCJ1bmljb2RlLTEtMS11dGYtOFwiLFxuICAgICAgICAgICAgXCJ1dGYtOFwiLFxuICAgICAgICAgICAgXCJ1dGY4XCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwibmFtZVwiOiBcIlVURi04XCJcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFwiaGVhZGluZ1wiOiBcIlRoZSBFbmNvZGluZ1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImVuY29kaW5nc1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcImxhYmVsc1wiOiBbXG4gICAgICAgICAgICBcIjg2NlwiLFxuICAgICAgICAgICAgXCJjcDg2NlwiLFxuICAgICAgICAgICAgXCJjc2libTg2NlwiLFxuICAgICAgICAgICAgXCJpYm04NjZcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJuYW1lXCI6IFwiSUJNODY2XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibGFiZWxzXCI6IFtcbiAgICAgICAgICAgIFwiY3Npc29sYXRpbjJcIixcbiAgICAgICAgICAgIFwiaXNvLTg4NTktMlwiLFxuICAgICAgICAgICAgXCJpc28taXItMTAxXCIsXG4gICAgICAgICAgICBcImlzbzg4NTktMlwiLFxuICAgICAgICAgICAgXCJpc284ODU5MlwiLFxuICAgICAgICAgICAgXCJpc29fODg1OS0yXCIsXG4gICAgICAgICAgICBcImlzb184ODU5LTI6MTk4N1wiLFxuICAgICAgICAgICAgXCJsMlwiLFxuICAgICAgICAgICAgXCJsYXRpbjJcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJuYW1lXCI6IFwiSVNPLTg4NTktMlwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImxhYmVsc1wiOiBbXG4gICAgICAgICAgICBcImNzaXNvbGF0aW4zXCIsXG4gICAgICAgICAgICBcImlzby04ODU5LTNcIixcbiAgICAgICAgICAgIFwiaXNvLWlyLTEwOVwiLFxuICAgICAgICAgICAgXCJpc284ODU5LTNcIixcbiAgICAgICAgICAgIFwiaXNvODg1OTNcIixcbiAgICAgICAgICAgIFwiaXNvXzg4NTktM1wiLFxuICAgICAgICAgICAgXCJpc29fODg1OS0zOjE5ODhcIixcbiAgICAgICAgICAgIFwibDNcIixcbiAgICAgICAgICAgIFwibGF0aW4zXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwibmFtZVwiOiBcIklTTy04ODU5LTNcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJsYWJlbHNcIjogW1xuICAgICAgICAgICAgXCJjc2lzb2xhdGluNFwiLFxuICAgICAgICAgICAgXCJpc28tODg1OS00XCIsXG4gICAgICAgICAgICBcImlzby1pci0xMTBcIixcbiAgICAgICAgICAgIFwiaXNvODg1OS00XCIsXG4gICAgICAgICAgICBcImlzbzg4NTk0XCIsXG4gICAgICAgICAgICBcImlzb184ODU5LTRcIixcbiAgICAgICAgICAgIFwiaXNvXzg4NTktNDoxOTg4XCIsXG4gICAgICAgICAgICBcImw0XCIsXG4gICAgICAgICAgICBcImxhdGluNFwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcIm5hbWVcIjogXCJJU08tODg1OS00XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibGFiZWxzXCI6IFtcbiAgICAgICAgICAgIFwiY3Npc29sYXRpbmN5cmlsbGljXCIsXG4gICAgICAgICAgICBcImN5cmlsbGljXCIsXG4gICAgICAgICAgICBcImlzby04ODU5LTVcIixcbiAgICAgICAgICAgIFwiaXNvLWlyLTE0NFwiLFxuICAgICAgICAgICAgXCJpc284ODU5LTVcIixcbiAgICAgICAgICAgIFwiaXNvODg1OTVcIixcbiAgICAgICAgICAgIFwiaXNvXzg4NTktNVwiLFxuICAgICAgICAgICAgXCJpc29fODg1OS01OjE5ODhcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJuYW1lXCI6IFwiSVNPLTg4NTktNVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImxhYmVsc1wiOiBbXG4gICAgICAgICAgICBcImFyYWJpY1wiLFxuICAgICAgICAgICAgXCJhc21vLTcwOFwiLFxuICAgICAgICAgICAgXCJjc2lzbzg4NTk2ZVwiLFxuICAgICAgICAgICAgXCJjc2lzbzg4NTk2aVwiLFxuICAgICAgICAgICAgXCJjc2lzb2xhdGluYXJhYmljXCIsXG4gICAgICAgICAgICBcImVjbWEtMTE0XCIsXG4gICAgICAgICAgICBcImlzby04ODU5LTZcIixcbiAgICAgICAgICAgIFwiaXNvLTg4NTktNi1lXCIsXG4gICAgICAgICAgICBcImlzby04ODU5LTYtaVwiLFxuICAgICAgICAgICAgXCJpc28taXItMTI3XCIsXG4gICAgICAgICAgICBcImlzbzg4NTktNlwiLFxuICAgICAgICAgICAgXCJpc284ODU5NlwiLFxuICAgICAgICAgICAgXCJpc29fODg1OS02XCIsXG4gICAgICAgICAgICBcImlzb184ODU5LTY6MTk4N1wiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcIm5hbWVcIjogXCJJU08tODg1OS02XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibGFiZWxzXCI6IFtcbiAgICAgICAgICAgIFwiY3Npc29sYXRpbmdyZWVrXCIsXG4gICAgICAgICAgICBcImVjbWEtMTE4XCIsXG4gICAgICAgICAgICBcImVsb3RfOTI4XCIsXG4gICAgICAgICAgICBcImdyZWVrXCIsXG4gICAgICAgICAgICBcImdyZWVrOFwiLFxuICAgICAgICAgICAgXCJpc28tODg1OS03XCIsXG4gICAgICAgICAgICBcImlzby1pci0xMjZcIixcbiAgICAgICAgICAgIFwiaXNvODg1OS03XCIsXG4gICAgICAgICAgICBcImlzbzg4NTk3XCIsXG4gICAgICAgICAgICBcImlzb184ODU5LTdcIixcbiAgICAgICAgICAgIFwiaXNvXzg4NTktNzoxOTg3XCIsXG4gICAgICAgICAgICBcInN1bl9ldV9ncmVla1wiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcIm5hbWVcIjogXCJJU08tODg1OS03XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibGFiZWxzXCI6IFtcbiAgICAgICAgICAgIFwiY3Npc284ODU5OGVcIixcbiAgICAgICAgICAgIFwiY3Npc29sYXRpbmhlYnJld1wiLFxuICAgICAgICAgICAgXCJoZWJyZXdcIixcbiAgICAgICAgICAgIFwiaXNvLTg4NTktOFwiLFxuICAgICAgICAgICAgXCJpc28tODg1OS04LWVcIixcbiAgICAgICAgICAgIFwiaXNvLWlyLTEzOFwiLFxuICAgICAgICAgICAgXCJpc284ODU5LThcIixcbiAgICAgICAgICAgIFwiaXNvODg1OThcIixcbiAgICAgICAgICAgIFwiaXNvXzg4NTktOFwiLFxuICAgICAgICAgICAgXCJpc29fODg1OS04OjE5ODhcIixcbiAgICAgICAgICAgIFwidmlzdWFsXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwibmFtZVwiOiBcIklTTy04ODU5LThcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJsYWJlbHNcIjogW1xuICAgICAgICAgICAgXCJjc2lzbzg4NTk4aVwiLFxuICAgICAgICAgICAgXCJpc28tODg1OS04LWlcIixcbiAgICAgICAgICAgIFwibG9naWNhbFwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcIm5hbWVcIjogXCJJU08tODg1OS04LUlcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJsYWJlbHNcIjogW1xuICAgICAgICAgICAgXCJjc2lzb2xhdGluNlwiLFxuICAgICAgICAgICAgXCJpc28tODg1OS0xMFwiLFxuICAgICAgICAgICAgXCJpc28taXItMTU3XCIsXG4gICAgICAgICAgICBcImlzbzg4NTktMTBcIixcbiAgICAgICAgICAgIFwiaXNvODg1OTEwXCIsXG4gICAgICAgICAgICBcImw2XCIsXG4gICAgICAgICAgICBcImxhdGluNlwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcIm5hbWVcIjogXCJJU08tODg1OS0xMFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImxhYmVsc1wiOiBbXG4gICAgICAgICAgICBcImlzby04ODU5LTEzXCIsXG4gICAgICAgICAgICBcImlzbzg4NTktMTNcIixcbiAgICAgICAgICAgIFwiaXNvODg1OTEzXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwibmFtZVwiOiBcIklTTy04ODU5LTEzXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibGFiZWxzXCI6IFtcbiAgICAgICAgICAgIFwiaXNvLTg4NTktMTRcIixcbiAgICAgICAgICAgIFwiaXNvODg1OS0xNFwiLFxuICAgICAgICAgICAgXCJpc284ODU5MTRcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJuYW1lXCI6IFwiSVNPLTg4NTktMTRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJsYWJlbHNcIjogW1xuICAgICAgICAgICAgXCJjc2lzb2xhdGluOVwiLFxuICAgICAgICAgICAgXCJpc28tODg1OS0xNVwiLFxuICAgICAgICAgICAgXCJpc284ODU5LTE1XCIsXG4gICAgICAgICAgICBcImlzbzg4NTkxNVwiLFxuICAgICAgICAgICAgXCJpc29fODg1OS0xNVwiLFxuICAgICAgICAgICAgXCJsOVwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcIm5hbWVcIjogXCJJU08tODg1OS0xNVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImxhYmVsc1wiOiBbXG4gICAgICAgICAgICBcImlzby04ODU5LTE2XCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwibmFtZVwiOiBcIklTTy04ODU5LTE2XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibGFiZWxzXCI6IFtcbiAgICAgICAgICAgIFwiY3Nrb2k4clwiLFxuICAgICAgICAgICAgXCJrb2lcIixcbiAgICAgICAgICAgIFwia29pOFwiLFxuICAgICAgICAgICAgXCJrb2k4LXJcIixcbiAgICAgICAgICAgIFwia29pOF9yXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwibmFtZVwiOiBcIktPSTgtUlwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImxhYmVsc1wiOiBbXG4gICAgICAgICAgICBcImtvaTgtcnVcIixcbiAgICAgICAgICAgIFwia29pOC11XCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwibmFtZVwiOiBcIktPSTgtVVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImxhYmVsc1wiOiBbXG4gICAgICAgICAgICBcImNzbWFjaW50b3NoXCIsXG4gICAgICAgICAgICBcIm1hY1wiLFxuICAgICAgICAgICAgXCJtYWNpbnRvc2hcIixcbiAgICAgICAgICAgIFwieC1tYWMtcm9tYW5cIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJuYW1lXCI6IFwibWFjaW50b3NoXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibGFiZWxzXCI6IFtcbiAgICAgICAgICAgIFwiZG9zLTg3NFwiLFxuICAgICAgICAgICAgXCJpc28tODg1OS0xMVwiLFxuICAgICAgICAgICAgXCJpc284ODU5LTExXCIsXG4gICAgICAgICAgICBcImlzbzg4NTkxMVwiLFxuICAgICAgICAgICAgXCJ0aXMtNjIwXCIsXG4gICAgICAgICAgICBcIndpbmRvd3MtODc0XCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwibmFtZVwiOiBcIndpbmRvd3MtODc0XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibGFiZWxzXCI6IFtcbiAgICAgICAgICAgIFwiY3AxMjUwXCIsXG4gICAgICAgICAgICBcIndpbmRvd3MtMTI1MFwiLFxuICAgICAgICAgICAgXCJ4LWNwMTI1MFwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcIm5hbWVcIjogXCJ3aW5kb3dzLTEyNTBcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJsYWJlbHNcIjogW1xuICAgICAgICAgICAgXCJjcDEyNTFcIixcbiAgICAgICAgICAgIFwid2luZG93cy0xMjUxXCIsXG4gICAgICAgICAgICBcIngtY3AxMjUxXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwibmFtZVwiOiBcIndpbmRvd3MtMTI1MVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImxhYmVsc1wiOiBbXG4gICAgICAgICAgICBcImFuc2lfeDMuNC0xOTY4XCIsXG4gICAgICAgICAgICBcImFzY2lpXCIsXG4gICAgICAgICAgICBcImNwMTI1MlwiLFxuICAgICAgICAgICAgXCJjcDgxOVwiLFxuICAgICAgICAgICAgXCJjc2lzb2xhdGluMVwiLFxuICAgICAgICAgICAgXCJpYm04MTlcIixcbiAgICAgICAgICAgIFwiaXNvLTg4NTktMVwiLFxuICAgICAgICAgICAgXCJpc28taXItMTAwXCIsXG4gICAgICAgICAgICBcImlzbzg4NTktMVwiLFxuICAgICAgICAgICAgXCJpc284ODU5MVwiLFxuICAgICAgICAgICAgXCJpc29fODg1OS0xXCIsXG4gICAgICAgICAgICBcImlzb184ODU5LTE6MTk4N1wiLFxuICAgICAgICAgICAgXCJsMVwiLFxuICAgICAgICAgICAgXCJsYXRpbjFcIixcbiAgICAgICAgICAgIFwidXMtYXNjaWlcIixcbiAgICAgICAgICAgIFwid2luZG93cy0xMjUyXCIsXG4gICAgICAgICAgICBcIngtY3AxMjUyXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwibmFtZVwiOiBcIndpbmRvd3MtMTI1MlwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImxhYmVsc1wiOiBbXG4gICAgICAgICAgICBcImNwMTI1M1wiLFxuICAgICAgICAgICAgXCJ3aW5kb3dzLTEyNTNcIixcbiAgICAgICAgICAgIFwieC1jcDEyNTNcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJuYW1lXCI6IFwid2luZG93cy0xMjUzXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibGFiZWxzXCI6IFtcbiAgICAgICAgICAgIFwiY3AxMjU0XCIsXG4gICAgICAgICAgICBcImNzaXNvbGF0aW41XCIsXG4gICAgICAgICAgICBcImlzby04ODU5LTlcIixcbiAgICAgICAgICAgIFwiaXNvLWlyLTE0OFwiLFxuICAgICAgICAgICAgXCJpc284ODU5LTlcIixcbiAgICAgICAgICAgIFwiaXNvODg1OTlcIixcbiAgICAgICAgICAgIFwiaXNvXzg4NTktOVwiLFxuICAgICAgICAgICAgXCJpc29fODg1OS05OjE5ODlcIixcbiAgICAgICAgICAgIFwibDVcIixcbiAgICAgICAgICAgIFwibGF0aW41XCIsXG4gICAgICAgICAgICBcIndpbmRvd3MtMTI1NFwiLFxuICAgICAgICAgICAgXCJ4LWNwMTI1NFwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcIm5hbWVcIjogXCJ3aW5kb3dzLTEyNTRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJsYWJlbHNcIjogW1xuICAgICAgICAgICAgXCJjcDEyNTVcIixcbiAgICAgICAgICAgIFwid2luZG93cy0xMjU1XCIsXG4gICAgICAgICAgICBcIngtY3AxMjU1XCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwibmFtZVwiOiBcIndpbmRvd3MtMTI1NVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImxhYmVsc1wiOiBbXG4gICAgICAgICAgICBcImNwMTI1NlwiLFxuICAgICAgICAgICAgXCJ3aW5kb3dzLTEyNTZcIixcbiAgICAgICAgICAgIFwieC1jcDEyNTZcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJuYW1lXCI6IFwid2luZG93cy0xMjU2XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibGFiZWxzXCI6IFtcbiAgICAgICAgICAgIFwiY3AxMjU3XCIsXG4gICAgICAgICAgICBcIndpbmRvd3MtMTI1N1wiLFxuICAgICAgICAgICAgXCJ4LWNwMTI1N1wiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcIm5hbWVcIjogXCJ3aW5kb3dzLTEyNTdcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJsYWJlbHNcIjogW1xuICAgICAgICAgICAgXCJjcDEyNThcIixcbiAgICAgICAgICAgIFwid2luZG93cy0xMjU4XCIsXG4gICAgICAgICAgICBcIngtY3AxMjU4XCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwibmFtZVwiOiBcIndpbmRvd3MtMTI1OFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImxhYmVsc1wiOiBbXG4gICAgICAgICAgICBcIngtbWFjLWN5cmlsbGljXCIsXG4gICAgICAgICAgICBcIngtbWFjLXVrcmFpbmlhblwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcIm5hbWVcIjogXCJ4LW1hYy1jeXJpbGxpY1wiXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBcImhlYWRpbmdcIjogXCJMZWdhY3kgc2luZ2xlLWJ5dGUgZW5jb2RpbmdzXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiZW5jb2RpbmdzXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwibGFiZWxzXCI6IFtcbiAgICAgICAgICAgIFwiY2hpbmVzZVwiLFxuICAgICAgICAgICAgXCJjc2diMjMxMlwiLFxuICAgICAgICAgICAgXCJjc2lzbzU4Z2IyMzEyODBcIixcbiAgICAgICAgICAgIFwiZ2IyMzEyXCIsXG4gICAgICAgICAgICBcImdiXzIzMTJcIixcbiAgICAgICAgICAgIFwiZ2JfMjMxMi04MFwiLFxuICAgICAgICAgICAgXCJnYmtcIixcbiAgICAgICAgICAgIFwiaXNvLWlyLTU4XCIsXG4gICAgICAgICAgICBcIngtZ2JrXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwibmFtZVwiOiBcIkdCS1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImxhYmVsc1wiOiBbXG4gICAgICAgICAgICBcImdiMTgwMzBcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJuYW1lXCI6IFwiZ2IxODAzMFwiXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBcImhlYWRpbmdcIjogXCJMZWdhY3kgbXVsdGktYnl0ZSBDaGluZXNlIChzaW1wbGlmaWVkKSBlbmNvZGluZ3NcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJlbmNvZGluZ3NcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJsYWJlbHNcIjogW1xuICAgICAgICAgICAgXCJiaWc1XCIsXG4gICAgICAgICAgICBcImJpZzUtaGtzY3NcIixcbiAgICAgICAgICAgIFwiY24tYmlnNVwiLFxuICAgICAgICAgICAgXCJjc2JpZzVcIixcbiAgICAgICAgICAgIFwieC14LWJpZzVcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJuYW1lXCI6IFwiQmlnNVwiXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBcImhlYWRpbmdcIjogXCJMZWdhY3kgbXVsdGktYnl0ZSBDaGluZXNlICh0cmFkaXRpb25hbCkgZW5jb2RpbmdzXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiZW5jb2RpbmdzXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwibGFiZWxzXCI6IFtcbiAgICAgICAgICAgIFwiY3NldWNwa2RmbXRqYXBhbmVzZVwiLFxuICAgICAgICAgICAgXCJldWMtanBcIixcbiAgICAgICAgICAgIFwieC1ldWMtanBcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJuYW1lXCI6IFwiRVVDLUpQXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibGFiZWxzXCI6IFtcbiAgICAgICAgICAgIFwiY3Npc28yMDIyanBcIixcbiAgICAgICAgICAgIFwiaXNvLTIwMjItanBcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJuYW1lXCI6IFwiSVNPLTIwMjItSlBcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJsYWJlbHNcIjogW1xuICAgICAgICAgICAgXCJjc3NoaWZ0amlzXCIsXG4gICAgICAgICAgICBcIm1zOTMyXCIsXG4gICAgICAgICAgICBcIm1zX2thbmppXCIsXG4gICAgICAgICAgICBcInNoaWZ0LWppc1wiLFxuICAgICAgICAgICAgXCJzaGlmdF9qaXNcIixcbiAgICAgICAgICAgIFwic2ppc1wiLFxuICAgICAgICAgICAgXCJ3aW5kb3dzLTMxalwiLFxuICAgICAgICAgICAgXCJ4LXNqaXNcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJuYW1lXCI6IFwiU2hpZnRfSklTXCJcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFwiaGVhZGluZ1wiOiBcIkxlZ2FjeSBtdWx0aS1ieXRlIEphcGFuZXNlIGVuY29kaW5nc1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImVuY29kaW5nc1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcImxhYmVsc1wiOiBbXG4gICAgICAgICAgICBcImNzZXVja3JcIixcbiAgICAgICAgICAgIFwiY3Nrc2M1NjAxMTk4N1wiLFxuICAgICAgICAgICAgXCJldWMta3JcIixcbiAgICAgICAgICAgIFwiaXNvLWlyLTE0OVwiLFxuICAgICAgICAgICAgXCJrb3JlYW5cIixcbiAgICAgICAgICAgIFwia3NfY181NjAxLTE5ODdcIixcbiAgICAgICAgICAgIFwia3NfY181NjAxLTE5ODlcIixcbiAgICAgICAgICAgIFwia3NjNTYwMVwiLFxuICAgICAgICAgICAgXCJrc2NfNTYwMVwiLFxuICAgICAgICAgICAgXCJ3aW5kb3dzLTk0OVwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcIm5hbWVcIjogXCJFVUMtS1JcIlxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJoZWFkaW5nXCI6IFwiTGVnYWN5IG11bHRpLWJ5dGUgS29yZWFuIGVuY29kaW5nc1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImVuY29kaW5nc1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcImxhYmVsc1wiOiBbXG4gICAgICAgICAgICBcImNzaXNvMjAyMmtyXCIsXG4gICAgICAgICAgICBcImh6LWdiLTIzMTJcIixcbiAgICAgICAgICAgIFwiaXNvLTIwMjItY25cIixcbiAgICAgICAgICAgIFwiaXNvLTIwMjItY24tZXh0XCIsXG4gICAgICAgICAgICBcImlzby0yMDIyLWtyXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwibmFtZVwiOiBcInJlcGxhY2VtZW50XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibGFiZWxzXCI6IFtcbiAgICAgICAgICAgIFwidXRmLTE2YmVcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJuYW1lXCI6IFwiVVRGLTE2QkVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJsYWJlbHNcIjogW1xuICAgICAgICAgICAgXCJ1dGYtMTZcIixcbiAgICAgICAgICAgIFwidXRmLTE2bGVcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJuYW1lXCI6IFwiVVRGLTE2TEVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJsYWJlbHNcIjogW1xuICAgICAgICAgICAgXCJ4LXVzZXItZGVmaW5lZFwiXG4gICAgICAgICAgXSxcbiAgICAgICAgICBcIm5hbWVcIjogXCJ4LXVzZXItZGVmaW5lZFwiXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBcImhlYWRpbmdcIjogXCJMZWdhY3kgbWlzY2VsbGFuZW91cyBlbmNvZGluZ3NcIlxuICAgIH1cbiAgXTtcblxuICAvLyBMYWJlbCB0byBlbmNvZGluZyByZWdpc3RyeS5cbiAgLyoqIEB0eXBlIHtPYmplY3QuPHN0cmluZyx7bmFtZTpzdHJpbmcsbGFiZWxzOkFycmF5LjxzdHJpbmc+fT59ICovXG4gIHZhciBsYWJlbF90b19lbmNvZGluZyA9IHt9O1xuICBlbmNvZGluZ3MuZm9yRWFjaChmdW5jdGlvbihjYXRlZ29yeSkge1xuICAgIGNhdGVnb3J5LmVuY29kaW5ncy5mb3JFYWNoKGZ1bmN0aW9uKGVuY29kaW5nKSB7XG4gICAgICBlbmNvZGluZy5sYWJlbHMuZm9yRWFjaChmdW5jdGlvbihsYWJlbCkge1xuICAgICAgICBsYWJlbF90b19lbmNvZGluZ1tsYWJlbF0gPSBlbmNvZGluZztcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICAvLyBSZWdpc3RyeSBvZiBvZiBlbmNvZGVyL2RlY29kZXIgZmFjdG9yaWVzLCBieSBlbmNvZGluZyBuYW1lLlxuICAvKiogQHR5cGUge09iamVjdC48c3RyaW5nLCBmdW5jdGlvbih7ZmF0YWw6Ym9vbGVhbn0pOiBFbmNvZGVyPn0gKi9cbiAgdmFyIGVuY29kZXJzID0ge307XG4gIC8qKiBAdHlwZSB7T2JqZWN0LjxzdHJpbmcsIGZ1bmN0aW9uKHtmYXRhbDpib29sZWFufSk6IERlY29kZXI+fSAqL1xuICB2YXIgZGVjb2RlcnMgPSB7fTtcblxuICAvL1xuICAvLyA2LiBJbmRleGVzXG4gIC8vXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwb2ludGVyIFRoZSB8cG9pbnRlcnwgdG8gc2VhcmNoIGZvci5cbiAgICogQHBhcmFtIHsoIUFycmF5Ljw/bnVtYmVyPnx1bmRlZmluZWQpfSBpbmRleCBUaGUgfGluZGV4fCB0byBzZWFyY2ggd2l0aGluLlxuICAgKiBAcmV0dXJuIHs/bnVtYmVyfSBUaGUgY29kZSBwb2ludCBjb3JyZXNwb25kaW5nIHRvIHxwb2ludGVyfCBpbiB8aW5kZXh8LFxuICAgKiAgICAgb3IgbnVsbCBpZiB8Y29kZSBwb2ludHwgaXMgbm90IGluIHxpbmRleHwuXG4gICAqL1xuICBmdW5jdGlvbiBpbmRleENvZGVQb2ludEZvcihwb2ludGVyLCBpbmRleCkge1xuICAgIGlmICghaW5kZXgpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBpbmRleFtwb2ludGVyXSB8fCBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBjb2RlX3BvaW50IFRoZSB8Y29kZSBwb2ludHwgdG8gc2VhcmNoIGZvci5cbiAgICogQHBhcmFtIHshQXJyYXkuPD9udW1iZXI+fSBpbmRleCBUaGUgfGluZGV4fCB0byBzZWFyY2ggd2l0aGluLlxuICAgKiBAcmV0dXJuIHs/bnVtYmVyfSBUaGUgZmlyc3QgcG9pbnRlciBjb3JyZXNwb25kaW5nIHRvIHxjb2RlIHBvaW50fCBpblxuICAgKiAgICAgfGluZGV4fCwgb3IgbnVsbCBpZiB8Y29kZSBwb2ludHwgaXMgbm90IGluIHxpbmRleHwuXG4gICAqL1xuICBmdW5jdGlvbiBpbmRleFBvaW50ZXJGb3IoY29kZV9wb2ludCwgaW5kZXgpIHtcbiAgICB2YXIgcG9pbnRlciA9IGluZGV4LmluZGV4T2YoY29kZV9wb2ludCk7XG4gICAgcmV0dXJuIHBvaW50ZXIgPT09IC0xID8gbnVsbCA6IHBvaW50ZXI7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgaW5kZXguXG4gICAqIEByZXR1cm4geyghQXJyYXkuPG51bWJlcj58IUFycmF5LjxBcnJheS48bnVtYmVyPj4pfVxuICAgKiAgKi9cbiAgZnVuY3Rpb24gaW5kZXgobmFtZSkge1xuICAgIGlmICghKCdlbmNvZGluZy1pbmRleGVzJyBpbiBnbG9iYWwpKSB7XG4gICAgICB0aHJvdyBFcnJvcihcIkluZGV4ZXMgbWlzc2luZy5cIiArXG4gICAgICAgICAgICAgICAgICBcIiBEaWQgeW91IGZvcmdldCB0byBpbmNsdWRlIGVuY29kaW5nLWluZGV4ZXMuanMgZmlyc3Q/XCIpO1xuICAgIH1cbiAgICByZXR1cm4gZ2xvYmFsWydlbmNvZGluZy1pbmRleGVzJ11bbmFtZV07XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBvaW50ZXIgVGhlIHxwb2ludGVyfCB0byBzZWFyY2ggZm9yIGluIHRoZSBnYjE4MDMwIGluZGV4LlxuICAgKiBAcmV0dXJuIHs/bnVtYmVyfSBUaGUgY29kZSBwb2ludCBjb3JyZXNwb25kaW5nIHRvIHxwb2ludGVyfCBpbiB8aW5kZXh8LFxuICAgKiAgICAgb3IgbnVsbCBpZiB8Y29kZSBwb2ludHwgaXMgbm90IGluIHRoZSBnYjE4MDMwIGluZGV4LlxuICAgKi9cbiAgZnVuY3Rpb24gaW5kZXhHQjE4MDMwUmFuZ2VzQ29kZVBvaW50Rm9yKHBvaW50ZXIpIHtcbiAgICAvLyAxLiBJZiBwb2ludGVyIGlzIGdyZWF0ZXIgdGhhbiAzOTQxOSBhbmQgbGVzcyB0aGFuIDE4OTAwMCwgb3JcbiAgICAvLyBwb2ludGVyIGlzIGdyZWF0ZXIgdGhhbiAxMjM3NTc1LCByZXR1cm4gbnVsbC5cbiAgICBpZiAoKHBvaW50ZXIgPiAzOTQxOSAmJiBwb2ludGVyIDwgMTg5MDAwKSB8fCAocG9pbnRlciA+IDEyMzc1NzUpKVxuICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAvLyAyLiBJZiBwb2ludGVyIGlzIDc0NTcsIHJldHVybiBjb2RlIHBvaW50IFUrRTdDNy5cbiAgICBpZiAocG9pbnRlciA9PT0gNzQ1NykgcmV0dXJuIDB4RTdDNztcblxuICAgIC8vIDMuIExldCBvZmZzZXQgYmUgdGhlIGxhc3QgcG9pbnRlciBpbiBpbmRleCBnYjE4MDMwIHJhbmdlcyB0aGF0XG4gICAgLy8gaXMgZXF1YWwgdG8gb3IgbGVzcyB0aGFuIHBvaW50ZXIgYW5kIGxldCBjb2RlIHBvaW50IG9mZnNldCBiZVxuICAgIC8vIGl0cyBjb3JyZXNwb25kaW5nIGNvZGUgcG9pbnQuXG4gICAgdmFyIG9mZnNldCA9IDA7XG4gICAgdmFyIGNvZGVfcG9pbnRfb2Zmc2V0ID0gMDtcbiAgICB2YXIgaWR4ID0gaW5kZXgoJ2diMTgwMzAtcmFuZ2VzJyk7XG4gICAgdmFyIGk7XG4gICAgZm9yIChpID0gMDsgaSA8IGlkeC5sZW5ndGg7ICsraSkge1xuICAgICAgLyoqIEB0eXBlIHshQXJyYXkuPG51bWJlcj59ICovXG4gICAgICB2YXIgZW50cnkgPSBpZHhbaV07XG4gICAgICBpZiAoZW50cnlbMF0gPD0gcG9pbnRlcikge1xuICAgICAgICBvZmZzZXQgPSBlbnRyeVswXTtcbiAgICAgICAgY29kZV9wb2ludF9vZmZzZXQgPSBlbnRyeVsxXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIDQuIFJldHVybiBhIGNvZGUgcG9pbnQgd2hvc2UgdmFsdWUgaXMgY29kZSBwb2ludCBvZmZzZXQgK1xuICAgIC8vIHBvaW50ZXIg4oiSIG9mZnNldC5cbiAgICByZXR1cm4gY29kZV9wb2ludF9vZmZzZXQgKyBwb2ludGVyIC0gb2Zmc2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBjb2RlX3BvaW50IFRoZSB8Y29kZSBwb2ludHwgdG8gbG9jYXRlIGluIHRoZSBnYjE4MDMwIGluZGV4LlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBmaXJzdCBwb2ludGVyIGNvcnJlc3BvbmRpbmcgdG8gfGNvZGUgcG9pbnR8IGluIHRoZVxuICAgKiAgICAgZ2IxODAzMCBpbmRleC5cbiAgICovXG4gIGZ1bmN0aW9uIGluZGV4R0IxODAzMFJhbmdlc1BvaW50ZXJGb3IoY29kZV9wb2ludCkge1xuICAgIC8vIDEuIElmIGNvZGUgcG9pbnQgaXMgVStFN0M3LCByZXR1cm4gcG9pbnRlciA3NDU3LlxuICAgIGlmIChjb2RlX3BvaW50ID09PSAweEU3QzcpIHJldHVybiA3NDU3O1xuXG4gICAgLy8gMi4gTGV0IG9mZnNldCBiZSB0aGUgbGFzdCBjb2RlIHBvaW50IGluIGluZGV4IGdiMTgwMzAgcmFuZ2VzXG4gICAgLy8gdGhhdCBpcyBlcXVhbCB0byBvciBsZXNzIHRoYW4gY29kZSBwb2ludCBhbmQgbGV0IHBvaW50ZXIgb2Zmc2V0XG4gICAgLy8gYmUgaXRzIGNvcnJlc3BvbmRpbmcgcG9pbnRlci5cbiAgICB2YXIgb2Zmc2V0ID0gMDtcbiAgICB2YXIgcG9pbnRlcl9vZmZzZXQgPSAwO1xuICAgIHZhciBpZHggPSBpbmRleCgnZ2IxODAzMC1yYW5nZXMnKTtcbiAgICB2YXIgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgaWR4Lmxlbmd0aDsgKytpKSB7XG4gICAgICAvKiogQHR5cGUgeyFBcnJheS48bnVtYmVyPn0gKi9cbiAgICAgIHZhciBlbnRyeSA9IGlkeFtpXTtcbiAgICAgIGlmIChlbnRyeVsxXSA8PSBjb2RlX3BvaW50KSB7XG4gICAgICAgIG9mZnNldCA9IGVudHJ5WzFdO1xuICAgICAgICBwb2ludGVyX29mZnNldCA9IGVudHJ5WzBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gMy4gUmV0dXJuIGEgcG9pbnRlciB3aG9zZSB2YWx1ZSBpcyBwb2ludGVyIG9mZnNldCArIGNvZGUgcG9pbnRcbiAgICAvLyDiiJIgb2Zmc2V0LlxuICAgIHJldHVybiBwb2ludGVyX29mZnNldCArIGNvZGVfcG9pbnQgLSBvZmZzZXQ7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IGNvZGVfcG9pbnQgVGhlIHxjb2RlX3BvaW50fCB0byBzZWFyY2ggZm9yIGluIHRoZSBTaGlmdF9KSVNcbiAgICogICAgIGluZGV4LlxuICAgKiBAcmV0dXJuIHs/bnVtYmVyfSBUaGUgY29kZSBwb2ludCBjb3JyZXNwb25kaW5nIHRvIHxwb2ludGVyfCBpbiB8aW5kZXh8LFxuICAgKiAgICAgb3IgbnVsbCBpZiB8Y29kZSBwb2ludHwgaXMgbm90IGluIHRoZSBTaGlmdF9KSVMgaW5kZXguXG4gICAqL1xuICBmdW5jdGlvbiBpbmRleFNoaWZ0SklTUG9pbnRlckZvcihjb2RlX3BvaW50KSB7XG4gICAgLy8gMS4gTGV0IGluZGV4IGJlIGluZGV4IGppczAyMDggZXhjbHVkaW5nIGFsbCBlbnRyaWVzIHdob3NlXG4gICAgLy8gcG9pbnRlciBpcyBpbiB0aGUgcmFuZ2UgODI3MiB0byA4ODM1LCBpbmNsdXNpdmUuXG4gICAgc2hpZnRfamlzX2luZGV4ID0gc2hpZnRfamlzX2luZGV4IHx8XG4gICAgICBpbmRleCgnamlzMDIwOCcpLm1hcChmdW5jdGlvbihjb2RlX3BvaW50LCBwb2ludGVyKSB7XG4gICAgICAgIHJldHVybiBpblJhbmdlKHBvaW50ZXIsIDgyNzIsIDg4MzUpID8gbnVsbCA6IGNvZGVfcG9pbnQ7XG4gICAgICB9KTtcbiAgICB2YXIgaW5kZXhfID0gc2hpZnRfamlzX2luZGV4O1xuXG4gICAgLy8gMi4gUmV0dXJuIHRoZSBpbmRleCBwb2ludGVyIGZvciBjb2RlIHBvaW50IGluIGluZGV4LlxuICAgIHJldHVybiBpbmRleF8uaW5kZXhPZihjb2RlX3BvaW50KTtcbiAgfVxuICB2YXIgc2hpZnRfamlzX2luZGV4O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0gY29kZV9wb2ludCBUaGUgfGNvZGVfcG9pbnR8IHRvIHNlYXJjaCBmb3IgaW4gdGhlIGJpZzVcbiAgICogICAgIGluZGV4LlxuICAgKiBAcmV0dXJuIHs/bnVtYmVyfSBUaGUgY29kZSBwb2ludCBjb3JyZXNwb25kaW5nIHRvIHxwb2ludGVyfCBpbiB8aW5kZXh8LFxuICAgKiAgICAgb3IgbnVsbCBpZiB8Y29kZSBwb2ludHwgaXMgbm90IGluIHRoZSBiaWc1IGluZGV4LlxuICAgKi9cbiAgZnVuY3Rpb24gaW5kZXhCaWc1UG9pbnRlckZvcihjb2RlX3BvaW50KSB7XG4gICAgLy8gMS4gTGV0IGluZGV4IGJlIGluZGV4IEJpZzUgZXhjbHVkaW5nIGFsbCBlbnRyaWVzIHdob3NlIHBvaW50ZXJcbiAgICBiaWc1X2luZGV4X25vX2hrc2NzID0gYmlnNV9pbmRleF9ub19oa3NjcyB8fFxuICAgICAgaW5kZXgoJ2JpZzUnKS5tYXAoZnVuY3Rpb24oY29kZV9wb2ludCwgcG9pbnRlcikge1xuICAgICAgICByZXR1cm4gKHBvaW50ZXIgPCAoMHhBMSAtIDB4ODEpICogMTU3KSA/IG51bGwgOiBjb2RlX3BvaW50O1xuICAgICAgfSk7XG4gICAgdmFyIGluZGV4XyA9IGJpZzVfaW5kZXhfbm9faGtzY3M7XG5cbiAgICAvLyAyLiBJZiBjb2RlIHBvaW50IGlzIFUrMjU1MCwgVSsyNTVFLCBVKzI1NjEsIFUrMjU2QSwgVSs1MzQxLCBvclxuICAgIC8vIFUrNTM0NSwgcmV0dXJuIHRoZSBsYXN0IHBvaW50ZXIgY29ycmVzcG9uZGluZyB0byBjb2RlIHBvaW50IGluXG4gICAgLy8gaW5kZXguXG4gICAgaWYgKGNvZGVfcG9pbnQgPT09IDB4MjU1MCB8fCBjb2RlX3BvaW50ID09PSAweDI1NUUgfHxcbiAgICAgICAgY29kZV9wb2ludCA9PT0gMHgyNTYxIHx8IGNvZGVfcG9pbnQgPT09IDB4MjU2QSB8fFxuICAgICAgICBjb2RlX3BvaW50ID09PSAweDUzNDEgfHwgY29kZV9wb2ludCA9PT0gMHg1MzQ1KSB7XG4gICAgICByZXR1cm4gaW5kZXhfLmxhc3RJbmRleE9mKGNvZGVfcG9pbnQpO1xuICAgIH1cblxuICAgIC8vIDMuIFJldHVybiB0aGUgaW5kZXggcG9pbnRlciBmb3IgY29kZSBwb2ludCBpbiBpbmRleC5cbiAgICByZXR1cm4gaW5kZXhQb2ludGVyRm9yKGNvZGVfcG9pbnQsIGluZGV4Xyk7XG4gIH1cbiAgdmFyIGJpZzVfaW5kZXhfbm9faGtzY3M7XG5cbiAgLy9cbiAgLy8gOC4gQVBJXG4gIC8vXG5cbiAgLyoqIEBjb25zdCAqLyB2YXIgREVGQVVMVF9FTkNPRElORyA9ICd1dGYtOCc7XG5cbiAgLy8gOC4xIEludGVyZmFjZSBUZXh0RGVjb2RlclxuXG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtzdHJpbmc9fSBsYWJlbCBUaGUgbGFiZWwgb2YgdGhlIGVuY29kaW5nO1xuICAgKiAgICAgZGVmYXVsdHMgdG8gJ3V0Zi04Jy5cbiAgICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXG4gICAqL1xuICBmdW5jdGlvbiBUZXh0RGVjb2RlcihsYWJlbCwgb3B0aW9ucykge1xuICAgIC8vIFdlYiBJREwgY29udmVudGlvbnNcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgVGV4dERlY29kZXIpKVxuICAgICAgdGhyb3cgVHlwZUVycm9yKCdDYWxsZWQgYXMgYSBmdW5jdGlvbi4gRGlkIHlvdSBmb3JnZXQgXFwnbmV3XFwnPycpO1xuICAgIGxhYmVsID0gbGFiZWwgIT09IHVuZGVmaW5lZCA/IFN0cmluZyhsYWJlbCkgOiBERUZBVUxUX0VOQ09ESU5HO1xuICAgIG9wdGlvbnMgPSBUb0RpY3Rpb25hcnkob3B0aW9ucyk7XG5cbiAgICAvLyBBIFRleHREZWNvZGVyIG9iamVjdCBoYXMgYW4gYXNzb2NpYXRlZCBlbmNvZGluZywgZGVjb2RlcixcbiAgICAvLyBzdHJlYW0sIGlnbm9yZSBCT00gZmxhZyAoaW5pdGlhbGx5IHVuc2V0KSwgQk9NIHNlZW4gZmxhZ1xuICAgIC8vIChpbml0aWFsbHkgdW5zZXQpLCBlcnJvciBtb2RlIChpbml0aWFsbHkgcmVwbGFjZW1lbnQpLCBhbmQgZG9cbiAgICAvLyBub3QgZmx1c2ggZmxhZyAoaW5pdGlhbGx5IHVuc2V0KS5cblxuICAgIC8qKiBAcHJpdmF0ZSAqL1xuICAgIHRoaXMuX2VuY29kaW5nID0gbnVsbDtcbiAgICAvKiogQHByaXZhdGUgQHR5cGUgez9EZWNvZGVyfSAqL1xuICAgIHRoaXMuX2RlY29kZXIgPSBudWxsO1xuICAgIC8qKiBAcHJpdmF0ZSBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLl9pZ25vcmVCT00gPSBmYWxzZTtcbiAgICAvKiogQHByaXZhdGUgQHR5cGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5fQk9Nc2VlbiA9IGZhbHNlO1xuICAgIC8qKiBAcHJpdmF0ZSBAdHlwZSB7c3RyaW5nfSAqL1xuICAgIHRoaXMuX2Vycm9yX21vZGUgPSAncmVwbGFjZW1lbnQnO1xuICAgIC8qKiBAcHJpdmF0ZSBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLl9kb19ub3RfZmx1c2ggPSBmYWxzZTtcblxuXG4gICAgLy8gMS4gTGV0IGVuY29kaW5nIGJlIHRoZSByZXN1bHQgb2YgZ2V0dGluZyBhbiBlbmNvZGluZyBmcm9tXG4gICAgLy8gbGFiZWwuXG4gICAgdmFyIGVuY29kaW5nID0gZ2V0RW5jb2RpbmcobGFiZWwpO1xuXG4gICAgLy8gMi4gSWYgZW5jb2RpbmcgaXMgZmFpbHVyZSBvciByZXBsYWNlbWVudCwgdGhyb3cgYSBSYW5nZUVycm9yLlxuICAgIGlmIChlbmNvZGluZyA9PT0gbnVsbCB8fCBlbmNvZGluZy5uYW1lID09PSAncmVwbGFjZW1lbnQnKVxuICAgICAgdGhyb3cgUmFuZ2VFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGxhYmVsKTtcbiAgICBpZiAoIWRlY29kZXJzW2VuY29kaW5nLm5hbWVdKSB7XG4gICAgICB0aHJvdyBFcnJvcignRGVjb2RlciBub3QgcHJlc2VudC4nICtcbiAgICAgICAgICAgICAgICAgICcgRGlkIHlvdSBmb3JnZXQgdG8gaW5jbHVkZSBlbmNvZGluZy1pbmRleGVzLmpzIGZpcnN0PycpO1xuICAgIH1cblxuICAgIC8vIDMuIExldCBkZWMgYmUgYSBuZXcgVGV4dERlY29kZXIgb2JqZWN0LlxuICAgIHZhciBkZWMgPSB0aGlzO1xuXG4gICAgLy8gNC4gU2V0IGRlYydzIGVuY29kaW5nIHRvIGVuY29kaW5nLlxuICAgIGRlYy5fZW5jb2RpbmcgPSBlbmNvZGluZztcblxuICAgIC8vIDUuIElmIG9wdGlvbnMncyBmYXRhbCBtZW1iZXIgaXMgdHJ1ZSwgc2V0IGRlYydzIGVycm9yIG1vZGUgdG9cbiAgICAvLyBmYXRhbC5cbiAgICBpZiAoQm9vbGVhbihvcHRpb25zWydmYXRhbCddKSlcbiAgICAgIGRlYy5fZXJyb3JfbW9kZSA9ICdmYXRhbCc7XG5cbiAgICAvLyA2LiBJZiBvcHRpb25zJ3MgaWdub3JlQk9NIG1lbWJlciBpcyB0cnVlLCBzZXQgZGVjJ3MgaWdub3JlIEJPTVxuICAgIC8vIGZsYWcuXG4gICAgaWYgKEJvb2xlYW4ob3B0aW9uc1snaWdub3JlQk9NJ10pKVxuICAgICAgZGVjLl9pZ25vcmVCT00gPSB0cnVlO1xuXG4gICAgLy8gRm9yIHByZS1FUzUgcnVudGltZXM6XG4gICAgaWYgKCFPYmplY3QuZGVmaW5lUHJvcGVydHkpIHtcbiAgICAgIHRoaXMuZW5jb2RpbmcgPSBkZWMuX2VuY29kaW5nLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIHRoaXMuZmF0YWwgPSBkZWMuX2Vycm9yX21vZGUgPT09ICdmYXRhbCc7XG4gICAgICB0aGlzLmlnbm9yZUJPTSA9IGRlYy5faWdub3JlQk9NO1xuICAgIH1cblxuICAgIC8vIDcuIFJldHVybiBkZWMuXG4gICAgcmV0dXJuIGRlYztcbiAgfVxuXG4gIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHtcbiAgICAvLyBUaGUgZW5jb2RpbmcgYXR0cmlidXRlJ3MgZ2V0dGVyIG11c3QgcmV0dXJuIGVuY29kaW5nJ3MgbmFtZS5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGV4dERlY29kZXIucHJvdG90eXBlLCAnZW5jb2RpbmcnLCB7XG4gICAgICAvKiogQHRoaXMge1RleHREZWNvZGVyfSAqL1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX2VuY29kaW5nLm5hbWUudG9Mb3dlckNhc2UoKTsgfVxuICAgIH0pO1xuXG4gICAgLy8gVGhlIGZhdGFsIGF0dHJpYnV0ZSdzIGdldHRlciBtdXN0IHJldHVybiB0cnVlIGlmIGVycm9yIG1vZGVcbiAgICAvLyBpcyBmYXRhbCwgYW5kIGZhbHNlIG90aGVyd2lzZS5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGV4dERlY29kZXIucHJvdG90eXBlLCAnZmF0YWwnLCB7XG4gICAgICAvKiogQHRoaXMge1RleHREZWNvZGVyfSAqL1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX2Vycm9yX21vZGUgPT09ICdmYXRhbCc7IH1cbiAgICB9KTtcblxuICAgIC8vIFRoZSBpZ25vcmVCT00gYXR0cmlidXRlJ3MgZ2V0dGVyIG11c3QgcmV0dXJuIHRydWUgaWYgaWdub3JlXG4gICAgLy8gQk9NIGZsYWcgaXMgc2V0LCBhbmQgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUZXh0RGVjb2Rlci5wcm90b3R5cGUsICdpZ25vcmVCT00nLCB7XG4gICAgICAvKiogQHRoaXMge1RleHREZWNvZGVyfSAqL1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX2lnbm9yZUJPTTsgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QnVmZmVyU291cmNlPX0gaW5wdXQgVGhlIGJ1ZmZlciBvZiBieXRlcyB0byBkZWNvZGUuXG4gICAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBkZWNvZGVkIHN0cmluZy5cbiAgICovXG4gIFRleHREZWNvZGVyLnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbiBkZWNvZGUoaW5wdXQsIG9wdGlvbnMpIHtcbiAgICB2YXIgYnl0ZXM7XG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ29iamVjdCcgJiYgaW5wdXQgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgYnl0ZXMgPSBuZXcgVWludDhBcnJheShpbnB1dCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgaW5wdXQgPT09ICdvYmplY3QnICYmICdidWZmZXInIGluIGlucHV0ICYmXG4gICAgICAgICAgICAgICBpbnB1dC5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgYnl0ZXMgPSBuZXcgVWludDhBcnJheShpbnB1dC5idWZmZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmJ5dGVPZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmJ5dGVMZW5ndGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBieXRlcyA9IG5ldyBVaW50OEFycmF5KDApO1xuICAgIH1cblxuICAgIG9wdGlvbnMgPSBUb0RpY3Rpb25hcnkob3B0aW9ucyk7XG5cbiAgICAvLyAxLiBJZiB0aGUgZG8gbm90IGZsdXNoIGZsYWcgaXMgdW5zZXQsIHNldCBkZWNvZGVyIHRvIGEgbmV3XG4gICAgLy8gZW5jb2RpbmcncyBkZWNvZGVyLCBzZXQgc3RyZWFtIHRvIGEgbmV3IHN0cmVhbSwgYW5kIHVuc2V0IHRoZVxuICAgIC8vIEJPTSBzZWVuIGZsYWcuXG4gICAgaWYgKCF0aGlzLl9kb19ub3RfZmx1c2gpIHtcbiAgICAgIHRoaXMuX2RlY29kZXIgPSBkZWNvZGVyc1t0aGlzLl9lbmNvZGluZy5uYW1lXSh7XG4gICAgICAgIGZhdGFsOiB0aGlzLl9lcnJvcl9tb2RlID09PSAnZmF0YWwnfSk7XG4gICAgICB0aGlzLl9CT01zZWVuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gMi4gSWYgb3B0aW9ucydzIHN0cmVhbSBpcyB0cnVlLCBzZXQgdGhlIGRvIG5vdCBmbHVzaCBmbGFnLCBhbmRcbiAgICAvLyB1bnNldCB0aGUgZG8gbm90IGZsdXNoIGZsYWcgb3RoZXJ3aXNlLlxuICAgIHRoaXMuX2RvX25vdF9mbHVzaCA9IEJvb2xlYW4ob3B0aW9uc1snc3RyZWFtJ10pO1xuXG4gICAgLy8gMy4gSWYgaW5wdXQgaXMgZ2l2ZW4sIHB1c2ggYSBjb3B5IG9mIGlucHV0IHRvIHN0cmVhbS5cbiAgICAvLyBUT0RPOiBBbGlnbiB3aXRoIHNwZWMgYWxnb3JpdGhtIC0gbWFpbnRhaW4gc3RyZWFtIG9uIGluc3RhbmNlLlxuICAgIHZhciBpbnB1dF9zdHJlYW0gPSBuZXcgU3RyZWFtKGJ5dGVzKTtcblxuICAgIC8vIDQuIExldCBvdXRwdXQgYmUgYSBuZXcgc3RyZWFtLlxuICAgIHZhciBvdXRwdXQgPSBbXTtcblxuICAgIC8qKiBAdHlwZSB7PyhudW1iZXJ8IUFycmF5LjxudW1iZXI+KX0gKi9cbiAgICB2YXIgcmVzdWx0O1xuXG4gICAgLy8gNS4gV2hpbGUgdHJ1ZTpcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgLy8gMS4gTGV0IHRva2VuIGJlIHRoZSByZXN1bHQgb2YgcmVhZGluZyBmcm9tIHN0cmVhbS5cbiAgICAgIHZhciB0b2tlbiA9IGlucHV0X3N0cmVhbS5yZWFkKCk7XG5cbiAgICAgIC8vIDIuIElmIHRva2VuIGlzIGVuZC1vZi1zdHJlYW0gYW5kIHRoZSBkbyBub3QgZmx1c2ggZmxhZyBpc1xuICAgICAgLy8gc2V0LCByZXR1cm4gb3V0cHV0LCBzZXJpYWxpemVkLlxuICAgICAgLy8gVE9ETzogQWxpZ24gd2l0aCBzcGVjIGFsZ29yaXRobS5cbiAgICAgIGlmICh0b2tlbiA9PT0gZW5kX29mX3N0cmVhbSlcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIDMuIE90aGVyd2lzZSwgcnVuIHRoZXNlIHN1YnN1YnN0ZXBzOlxuXG4gICAgICAvLyAxLiBMZXQgcmVzdWx0IGJlIHRoZSByZXN1bHQgb2YgcHJvY2Vzc2luZyB0b2tlbiBmb3IgZGVjb2RlcixcbiAgICAgIC8vIHN0cmVhbSwgb3V0cHV0LCBhbmQgZXJyb3IgbW9kZS5cbiAgICAgIHJlc3VsdCA9IHRoaXMuX2RlY29kZXIuaGFuZGxlcihpbnB1dF9zdHJlYW0sIHRva2VuKTtcblxuICAgICAgLy8gMi4gSWYgcmVzdWx0IGlzIGZpbmlzaGVkLCByZXR1cm4gb3V0cHV0LCBzZXJpYWxpemVkLlxuICAgICAgaWYgKHJlc3VsdCA9PT0gZmluaXNoZWQpXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBpZiAocmVzdWx0ICE9PSBudWxsKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlc3VsdCkpXG4gICAgICAgICAgb3V0cHV0LnB1c2guYXBwbHkob3V0cHV0LCAvKipAdHlwZSB7IUFycmF5LjxudW1iZXI+fSovKHJlc3VsdCkpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgb3V0cHV0LnB1c2gocmVzdWx0KTtcbiAgICAgIH1cblxuICAgICAgLy8gMy4gT3RoZXJ3aXNlLCBpZiByZXN1bHQgaXMgZXJyb3IsIHRocm93IGEgVHlwZUVycm9yLlxuICAgICAgLy8gKFRocm93biBpbiBoYW5kbGVyKVxuXG4gICAgICAvLyA0LiBPdGhlcndpc2UsIGRvIG5vdGhpbmcuXG4gICAgfVxuICAgIC8vIFRPRE86IEFsaWduIHdpdGggc3BlYyBhbGdvcml0aG0uXG4gICAgaWYgKCF0aGlzLl9kb19ub3RfZmx1c2gpIHtcbiAgICAgIGRvIHtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5fZGVjb2Rlci5oYW5kbGVyKGlucHV0X3N0cmVhbSwgaW5wdXRfc3RyZWFtLnJlYWQoKSk7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IGZpbmlzaGVkKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsKVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXN1bHQpKVxuICAgICAgICAgIG91dHB1dC5wdXNoLmFwcGx5KG91dHB1dCwgLyoqQHR5cGUgeyFBcnJheS48bnVtYmVyPn0qLyhyZXN1bHQpKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIG91dHB1dC5wdXNoKHJlc3VsdCk7XG4gICAgICB9IHdoaWxlICghaW5wdXRfc3RyZWFtLmVuZE9mU3RyZWFtKCkpO1xuICAgICAgdGhpcy5fZGVjb2RlciA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gQSBUZXh0RGVjb2RlciBvYmplY3QgYWxzbyBoYXMgYW4gYXNzb2NpYXRlZCBzZXJpYWxpemUgc3RyZWFtXG4gICAgLy8gYWxnb3JpdGhtLi4uXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHshQXJyYXkuPG51bWJlcj59IHN0cmVhbVxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKiBAdGhpcyB7VGV4dERlY29kZXJ9XG4gICAgICovXG4gICAgZnVuY3Rpb24gc2VyaWFsaXplU3RyZWFtKHN0cmVhbSkge1xuICAgICAgLy8gMS4gTGV0IHRva2VuIGJlIHRoZSByZXN1bHQgb2YgcmVhZGluZyBmcm9tIHN0cmVhbS5cbiAgICAgIC8vIChEb25lIGluLXBsYWNlIG9uIGFycmF5LCByYXRoZXIgdGhhbiBhcyBhIHN0cmVhbSlcblxuICAgICAgLy8gMi4gSWYgZW5jb2RpbmcgaXMgVVRGLTgsIFVURi0xNkJFLCBvciBVVEYtMTZMRSwgYW5kIGlnbm9yZVxuICAgICAgLy8gQk9NIGZsYWcgYW5kIEJPTSBzZWVuIGZsYWcgYXJlIHVuc2V0LCBydW4gdGhlc2Ugc3Vic3Vic3RlcHM6XG4gICAgICBpZiAoaW5jbHVkZXMoWydVVEYtOCcsICdVVEYtMTZMRScsICdVVEYtMTZCRSddLCB0aGlzLl9lbmNvZGluZy5uYW1lKSAmJlxuICAgICAgICAgICF0aGlzLl9pZ25vcmVCT00gJiYgIXRoaXMuX0JPTXNlZW4pIHtcbiAgICAgICAgaWYgKHN0cmVhbS5sZW5ndGggPiAwICYmIHN0cmVhbVswXSA9PT0gMHhGRUZGKSB7XG4gICAgICAgICAgLy8gMS4gSWYgdG9rZW4gaXMgVStGRUZGLCBzZXQgQk9NIHNlZW4gZmxhZy5cbiAgICAgICAgICB0aGlzLl9CT01zZWVuID0gdHJ1ZTtcbiAgICAgICAgICBzdHJlYW0uc2hpZnQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChzdHJlYW0ubGVuZ3RoID4gMCkge1xuICAgICAgICAgIC8vIDIuIE90aGVyd2lzZSwgaWYgdG9rZW4gaXMgbm90IGVuZC1vZi1zdHJlYW0sIHNldCBCT00gc2VlblxuICAgICAgICAgIC8vIGZsYWcgYW5kIGFwcGVuZCB0b2tlbiB0byBzdHJlYW0uXG4gICAgICAgICAgdGhpcy5fQk9Nc2VlbiA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gMy4gT3RoZXJ3aXNlLCBpZiB0b2tlbiBpcyBub3QgZW5kLW9mLXN0cmVhbSwgYXBwZW5kIHRva2VuXG4gICAgICAgICAgLy8gdG8gb3V0cHV0LlxuICAgICAgICAgIC8vIChuby1vcClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gNC4gT3RoZXJ3aXNlLCByZXR1cm4gb3V0cHV0LlxuICAgICAgcmV0dXJuIGNvZGVQb2ludHNUb1N0cmluZyhzdHJlYW0pO1xuICAgIH1cblxuICAgIHJldHVybiBzZXJpYWxpemVTdHJlYW0uY2FsbCh0aGlzLCBvdXRwdXQpO1xuICB9O1xuXG4gIC8vIDguMiBJbnRlcmZhY2UgVGV4dEVuY29kZXJcblxuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7c3RyaW5nPX0gbGFiZWwgVGhlIGxhYmVsIG9mIHRoZSBlbmNvZGluZy4gTk9OU1RBTkRBUkQuXG4gICAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9ucyBOT05TVEFOREFSRC5cbiAgICovXG4gIGZ1bmN0aW9uIFRleHRFbmNvZGVyKGxhYmVsLCBvcHRpb25zKSB7XG4gICAgLy8gV2ViIElETCBjb252ZW50aW9uc1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBUZXh0RW5jb2RlcikpXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ0NhbGxlZCBhcyBhIGZ1bmN0aW9uLiBEaWQgeW91IGZvcmdldCBcXCduZXdcXCc/Jyk7XG4gICAgb3B0aW9ucyA9IFRvRGljdGlvbmFyeShvcHRpb25zKTtcblxuICAgIC8vIEEgVGV4dEVuY29kZXIgb2JqZWN0IGhhcyBhbiBhc3NvY2lhdGVkIGVuY29kaW5nIGFuZCBlbmNvZGVyLlxuXG4gICAgLyoqIEBwcml2YXRlICovXG4gICAgdGhpcy5fZW5jb2RpbmcgPSBudWxsO1xuICAgIC8qKiBAcHJpdmF0ZSBAdHlwZSB7P0VuY29kZXJ9ICovXG4gICAgdGhpcy5fZW5jb2RlciA9IG51bGw7XG5cbiAgICAvLyBOb24tc3RhbmRhcmRcbiAgICAvKiogQHByaXZhdGUgQHR5cGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5fZG9fbm90X2ZsdXNoID0gZmFsc2U7XG4gICAgLyoqIEBwcml2YXRlIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgdGhpcy5fZmF0YWwgPSBCb29sZWFuKG9wdGlvbnNbJ2ZhdGFsJ10pID8gJ2ZhdGFsJyA6ICdyZXBsYWNlbWVudCc7XG5cbiAgICAvLyAxLiBMZXQgZW5jIGJlIGEgbmV3IFRleHRFbmNvZGVyIG9iamVjdC5cbiAgICB2YXIgZW5jID0gdGhpcztcblxuICAgIC8vIDIuIFNldCBlbmMncyBlbmNvZGluZyB0byBVVEYtOCdzIGVuY29kZXIuXG4gICAgaWYgKEJvb2xlYW4ob3B0aW9uc1snTk9OU1RBTkRBUkRfYWxsb3dMZWdhY3lFbmNvZGluZyddKSkge1xuICAgICAgLy8gTk9OU1RBTkRBUkQgYmVoYXZpb3IuXG4gICAgICBsYWJlbCA9IGxhYmVsICE9PSB1bmRlZmluZWQgPyBTdHJpbmcobGFiZWwpIDogREVGQVVMVF9FTkNPRElORztcbiAgICAgIHZhciBlbmNvZGluZyA9IGdldEVuY29kaW5nKGxhYmVsKTtcbiAgICAgIGlmIChlbmNvZGluZyA9PT0gbnVsbCB8fCBlbmNvZGluZy5uYW1lID09PSAncmVwbGFjZW1lbnQnKVxuICAgICAgICB0aHJvdyBSYW5nZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgbGFiZWwpO1xuICAgICAgaWYgKCFlbmNvZGVyc1tlbmNvZGluZy5uYW1lXSkge1xuICAgICAgICB0aHJvdyBFcnJvcignRW5jb2RlciBub3QgcHJlc2VudC4nICtcbiAgICAgICAgICAgICAgICAgICAgJyBEaWQgeW91IGZvcmdldCB0byBpbmNsdWRlIGVuY29kaW5nLWluZGV4ZXMuanMgZmlyc3Q/Jyk7XG4gICAgICB9XG4gICAgICBlbmMuX2VuY29kaW5nID0gZW5jb2Rpbmc7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFN0YW5kYXJkIGJlaGF2aW9yLlxuICAgICAgZW5jLl9lbmNvZGluZyA9IGdldEVuY29kaW5nKCd1dGYtOCcpO1xuXG4gICAgICBpZiAobGFiZWwgIT09IHVuZGVmaW5lZCAmJiAnY29uc29sZScgaW4gZ2xvYmFsKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignVGV4dEVuY29kZXIgY29uc3RydWN0b3IgY2FsbGVkIHdpdGggZW5jb2RpbmcgbGFiZWwsICdcbiAgICAgICAgICAgICAgICAgICAgICsgJ3doaWNoIGlzIGlnbm9yZWQuJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRm9yIHByZS1FUzUgcnVudGltZXM6XG4gICAgaWYgKCFPYmplY3QuZGVmaW5lUHJvcGVydHkpXG4gICAgICB0aGlzLmVuY29kaW5nID0gZW5jLl9lbmNvZGluZy5uYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAvLyAzLiBSZXR1cm4gZW5jLlxuICAgIHJldHVybiBlbmM7XG4gIH1cblxuICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XG4gICAgLy8gVGhlIGVuY29kaW5nIGF0dHJpYnV0ZSdzIGdldHRlciBtdXN0IHJldHVybiBlbmNvZGluZydzIG5hbWUuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRleHRFbmNvZGVyLnByb3RvdHlwZSwgJ2VuY29kaW5nJywge1xuICAgICAgLyoqIEB0aGlzIHtUZXh0RW5jb2Rlcn0gKi9cbiAgICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9lbmNvZGluZy5uYW1lLnRvTG93ZXJDYXNlKCk7IH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZz19IG9wdF9zdHJpbmcgVGhlIHN0cmluZyB0byBlbmNvZGUuXG4gICAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHshVWludDhBcnJheX0gRW5jb2RlZCBieXRlcywgYXMgYSBVaW50OEFycmF5LlxuICAgKi9cbiAgVGV4dEVuY29kZXIucHJvdG90eXBlLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShvcHRfc3RyaW5nLCBvcHRpb25zKSB7XG4gICAgb3B0X3N0cmluZyA9IG9wdF9zdHJpbmcgPT09IHVuZGVmaW5lZCA/ICcnIDogU3RyaW5nKG9wdF9zdHJpbmcpO1xuICAgIG9wdGlvbnMgPSBUb0RpY3Rpb25hcnkob3B0aW9ucyk7XG5cbiAgICAvLyBOT1RFOiBUaGlzIG9wdGlvbiBpcyBub25zdGFuZGFyZC4gTm9uZSBvZiB0aGUgZW5jb2RpbmdzXG4gICAgLy8gcGVybWl0dGVkIGZvciBlbmNvZGluZyAoaS5lLiBVVEYtOCwgVVRGLTE2KSBhcmUgc3RhdGVmdWwgd2hlblxuICAgIC8vIHRoZSBpbnB1dCBpcyBhIFVTVlN0cmluZyBzbyBzdHJlYW1pbmcgaXMgbm90IG5lY2Vzc2FyeS5cbiAgICBpZiAoIXRoaXMuX2RvX25vdF9mbHVzaClcbiAgICAgIHRoaXMuX2VuY29kZXIgPSBlbmNvZGVyc1t0aGlzLl9lbmNvZGluZy5uYW1lXSh7XG4gICAgICAgIGZhdGFsOiB0aGlzLl9mYXRhbCA9PT0gJ2ZhdGFsJ30pO1xuICAgIHRoaXMuX2RvX25vdF9mbHVzaCA9IEJvb2xlYW4ob3B0aW9uc1snc3RyZWFtJ10pO1xuXG4gICAgLy8gMS4gQ29udmVydCBpbnB1dCB0byBhIHN0cmVhbS5cbiAgICB2YXIgaW5wdXQgPSBuZXcgU3RyZWFtKHN0cmluZ1RvQ29kZVBvaW50cyhvcHRfc3RyaW5nKSk7XG5cbiAgICAvLyAyLiBMZXQgb3V0cHV0IGJlIGEgbmV3IHN0cmVhbVxuICAgIHZhciBvdXRwdXQgPSBbXTtcblxuICAgIC8qKiBAdHlwZSB7PyhudW1iZXJ8IUFycmF5LjxudW1iZXI+KX0gKi9cbiAgICB2YXIgcmVzdWx0O1xuICAgIC8vIDMuIFdoaWxlIHRydWUsIHJ1biB0aGVzZSBzdWJzdGVwczpcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgLy8gMS4gTGV0IHRva2VuIGJlIHRoZSByZXN1bHQgb2YgcmVhZGluZyBmcm9tIGlucHV0LlxuICAgICAgdmFyIHRva2VuID0gaW5wdXQucmVhZCgpO1xuICAgICAgaWYgKHRva2VuID09PSBlbmRfb2Zfc3RyZWFtKVxuICAgICAgICBicmVhaztcbiAgICAgIC8vIDIuIExldCByZXN1bHQgYmUgdGhlIHJlc3VsdCBvZiBwcm9jZXNzaW5nIHRva2VuIGZvciBlbmNvZGVyLFxuICAgICAgLy8gaW5wdXQsIG91dHB1dC5cbiAgICAgIHJlc3VsdCA9IHRoaXMuX2VuY29kZXIuaGFuZGxlcihpbnB1dCwgdG9rZW4pO1xuICAgICAgaWYgKHJlc3VsdCA9PT0gZmluaXNoZWQpXG4gICAgICAgIGJyZWFrO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVzdWx0KSlcbiAgICAgICAgb3V0cHV0LnB1c2guYXBwbHkob3V0cHV0LCAvKipAdHlwZSB7IUFycmF5LjxudW1iZXI+fSovKHJlc3VsdCkpO1xuICAgICAgZWxzZVxuICAgICAgICBvdXRwdXQucHVzaChyZXN1bHQpO1xuICAgIH1cbiAgICAvLyBUT0RPOiBBbGlnbiB3aXRoIHNwZWMgYWxnb3JpdGhtLlxuICAgIGlmICghdGhpcy5fZG9fbm90X2ZsdXNoKSB7XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICByZXN1bHQgPSB0aGlzLl9lbmNvZGVyLmhhbmRsZXIoaW5wdXQsIGlucHV0LnJlYWQoKSk7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IGZpbmlzaGVkKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXN1bHQpKVxuICAgICAgICAgIG91dHB1dC5wdXNoLmFwcGx5KG91dHB1dCwgLyoqQHR5cGUgeyFBcnJheS48bnVtYmVyPn0qLyhyZXN1bHQpKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIG91dHB1dC5wdXNoKHJlc3VsdCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9lbmNvZGVyID0gbnVsbDtcbiAgICB9XG4gICAgLy8gMy4gSWYgcmVzdWx0IGlzIGZpbmlzaGVkLCBjb252ZXJ0IG91dHB1dCBpbnRvIGEgYnl0ZSBzZXF1ZW5jZSxcbiAgICAvLyBhbmQgdGhlbiByZXR1cm4gYSBVaW50OEFycmF5IG9iamVjdCB3cmFwcGluZyBhbiBBcnJheUJ1ZmZlclxuICAgIC8vIGNvbnRhaW5pbmcgb3V0cHV0LlxuICAgIHJldHVybiBuZXcgVWludDhBcnJheShvdXRwdXQpO1xuICB9O1xuXG5cbiAgLy9cbiAgLy8gOS4gVGhlIGVuY29kaW5nXG4gIC8vXG5cbiAgLy8gOS4xIHV0Zi04XG5cbiAgLy8gOS4xLjEgdXRmLTggZGVjb2RlclxuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBpbXBsZW1lbnRzIHtEZWNvZGVyfVxuICAgKiBAcGFyYW0ge3tmYXRhbDogYm9vbGVhbn19IG9wdGlvbnNcbiAgICovXG4gIGZ1bmN0aW9uIFVURjhEZWNvZGVyKG9wdGlvbnMpIHtcbiAgICB2YXIgZmF0YWwgPSBvcHRpb25zLmZhdGFsO1xuXG4gICAgLy8gdXRmLTgncyBkZWNvZGVyJ3MgaGFzIGFuIGFzc29jaWF0ZWQgdXRmLTggY29kZSBwb2ludCwgdXRmLThcbiAgICAvLyBieXRlcyBzZWVuLCBhbmQgdXRmLTggYnl0ZXMgbmVlZGVkIChhbGwgaW5pdGlhbGx5IDApLCBhIHV0Zi04XG4gICAgLy8gbG93ZXIgYm91bmRhcnkgKGluaXRpYWxseSAweDgwKSwgYW5kIGEgdXRmLTggdXBwZXIgYm91bmRhcnlcbiAgICAvLyAoaW5pdGlhbGx5IDB4QkYpLlxuICAgIHZhciAvKiogQHR5cGUge251bWJlcn0gKi8gdXRmOF9jb2RlX3BvaW50ID0gMCxcbiAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ9ICovIHV0ZjhfYnl0ZXNfc2VlbiA9IDAsXG4gICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqLyB1dGY4X2J5dGVzX25lZWRlZCA9IDAsXG4gICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqLyB1dGY4X2xvd2VyX2JvdW5kYXJ5ID0gMHg4MCxcbiAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ9ICovIHV0ZjhfdXBwZXJfYm91bmRhcnkgPSAweEJGO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbSBUaGUgc3RyZWFtIG9mIGJ5dGVzIGJlaW5nIGRlY29kZWQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGJpdGUgVGhlIG5leHQgYnl0ZSByZWFkIGZyb20gdGhlIHN0cmVhbS5cbiAgICAgKiBAcmV0dXJuIHs/KG51bWJlcnwhQXJyYXkuPG51bWJlcj4pfSBUaGUgbmV4dCBjb2RlIHBvaW50KHMpXG4gICAgICogICAgIGRlY29kZWQsIG9yIG51bGwgaWYgbm90IGVub3VnaCBkYXRhIGV4aXN0cyBpbiB0aGUgaW5wdXRcbiAgICAgKiAgICAgc3RyZWFtIHRvIGRlY29kZSBhIGNvbXBsZXRlIGNvZGUgcG9pbnQuXG4gICAgICovXG4gICAgdGhpcy5oYW5kbGVyID0gZnVuY3Rpb24oc3RyZWFtLCBiaXRlKSB7XG4gICAgICAvLyAxLiBJZiBieXRlIGlzIGVuZC1vZi1zdHJlYW0gYW5kIHV0Zi04IGJ5dGVzIG5lZWRlZCBpcyBub3QgMCxcbiAgICAgIC8vIHNldCB1dGYtOCBieXRlcyBuZWVkZWQgdG8gMCBhbmQgcmV0dXJuIGVycm9yLlxuICAgICAgaWYgKGJpdGUgPT09IGVuZF9vZl9zdHJlYW0gJiYgdXRmOF9ieXRlc19uZWVkZWQgIT09IDApIHtcbiAgICAgICAgdXRmOF9ieXRlc19uZWVkZWQgPSAwO1xuICAgICAgICByZXR1cm4gZGVjb2RlckVycm9yKGZhdGFsKTtcbiAgICAgIH1cblxuICAgICAgLy8gMi4gSWYgYnl0ZSBpcyBlbmQtb2Ytc3RyZWFtLCByZXR1cm4gZmluaXNoZWQuXG4gICAgICBpZiAoYml0ZSA9PT0gZW5kX29mX3N0cmVhbSlcbiAgICAgICAgcmV0dXJuIGZpbmlzaGVkO1xuXG4gICAgICAvLyAzLiBJZiB1dGYtOCBieXRlcyBuZWVkZWQgaXMgMCwgYmFzZWQgb24gYnl0ZTpcbiAgICAgIGlmICh1dGY4X2J5dGVzX25lZWRlZCA9PT0gMCkge1xuXG4gICAgICAgIC8vIDB4MDAgdG8gMHg3RlxuICAgICAgICBpZiAoaW5SYW5nZShiaXRlLCAweDAwLCAweDdGKSkge1xuICAgICAgICAgIC8vIFJldHVybiBhIGNvZGUgcG9pbnQgd2hvc2UgdmFsdWUgaXMgYnl0ZS5cbiAgICAgICAgICByZXR1cm4gYml0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDB4QzIgdG8gMHhERlxuICAgICAgICBlbHNlIGlmIChpblJhbmdlKGJpdGUsIDB4QzIsIDB4REYpKSB7XG4gICAgICAgICAgLy8gMS4gU2V0IHV0Zi04IGJ5dGVzIG5lZWRlZCB0byAxLlxuICAgICAgICAgIHV0ZjhfYnl0ZXNfbmVlZGVkID0gMTtcblxuICAgICAgICAgIC8vIDIuIFNldCBVVEYtOCBjb2RlIHBvaW50IHRvIGJ5dGUgJiAweDFGLlxuICAgICAgICAgIHV0ZjhfY29kZV9wb2ludCA9IGJpdGUgJiAweDFGO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gMHhFMCB0byAweEVGXG4gICAgICAgIGVsc2UgaWYgKGluUmFuZ2UoYml0ZSwgMHhFMCwgMHhFRikpIHtcbiAgICAgICAgICAvLyAxLiBJZiBieXRlIGlzIDB4RTAsIHNldCB1dGYtOCBsb3dlciBib3VuZGFyeSB0byAweEEwLlxuICAgICAgICAgIGlmIChiaXRlID09PSAweEUwKVxuICAgICAgICAgICAgdXRmOF9sb3dlcl9ib3VuZGFyeSA9IDB4QTA7XG4gICAgICAgICAgLy8gMi4gSWYgYnl0ZSBpcyAweEVELCBzZXQgdXRmLTggdXBwZXIgYm91bmRhcnkgdG8gMHg5Ri5cbiAgICAgICAgICBpZiAoYml0ZSA9PT0gMHhFRClcbiAgICAgICAgICAgIHV0ZjhfdXBwZXJfYm91bmRhcnkgPSAweDlGO1xuICAgICAgICAgIC8vIDMuIFNldCB1dGYtOCBieXRlcyBuZWVkZWQgdG8gMi5cbiAgICAgICAgICB1dGY4X2J5dGVzX25lZWRlZCA9IDI7XG4gICAgICAgICAgLy8gNC4gU2V0IFVURi04IGNvZGUgcG9pbnQgdG8gYnl0ZSAmIDB4Ri5cbiAgICAgICAgICB1dGY4X2NvZGVfcG9pbnQgPSBiaXRlICYgMHhGO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gMHhGMCB0byAweEY0XG4gICAgICAgIGVsc2UgaWYgKGluUmFuZ2UoYml0ZSwgMHhGMCwgMHhGNCkpIHtcbiAgICAgICAgICAvLyAxLiBJZiBieXRlIGlzIDB4RjAsIHNldCB1dGYtOCBsb3dlciBib3VuZGFyeSB0byAweDkwLlxuICAgICAgICAgIGlmIChiaXRlID09PSAweEYwKVxuICAgICAgICAgICAgdXRmOF9sb3dlcl9ib3VuZGFyeSA9IDB4OTA7XG4gICAgICAgICAgLy8gMi4gSWYgYnl0ZSBpcyAweEY0LCBzZXQgdXRmLTggdXBwZXIgYm91bmRhcnkgdG8gMHg4Ri5cbiAgICAgICAgICBpZiAoYml0ZSA9PT0gMHhGNClcbiAgICAgICAgICAgIHV0ZjhfdXBwZXJfYm91bmRhcnkgPSAweDhGO1xuICAgICAgICAgIC8vIDMuIFNldCB1dGYtOCBieXRlcyBuZWVkZWQgdG8gMy5cbiAgICAgICAgICB1dGY4X2J5dGVzX25lZWRlZCA9IDM7XG4gICAgICAgICAgLy8gNC4gU2V0IFVURi04IGNvZGUgcG9pbnQgdG8gYnl0ZSAmIDB4Ny5cbiAgICAgICAgICB1dGY4X2NvZGVfcG9pbnQgPSBiaXRlICYgMHg3O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT3RoZXJ3aXNlXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIC8vIFJldHVybiBlcnJvci5cbiAgICAgICAgICByZXR1cm4gZGVjb2RlckVycm9yKGZhdGFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJldHVybiBjb250aW51ZS5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIC8vIDQuIElmIGJ5dGUgaXMgbm90IGluIHRoZSByYW5nZSB1dGYtOCBsb3dlciBib3VuZGFyeSB0byB1dGYtOFxuICAgICAgLy8gdXBwZXIgYm91bmRhcnksIGluY2x1c2l2ZSwgcnVuIHRoZXNlIHN1YnN0ZXBzOlxuICAgICAgaWYgKCFpblJhbmdlKGJpdGUsIHV0ZjhfbG93ZXJfYm91bmRhcnksIHV0ZjhfdXBwZXJfYm91bmRhcnkpKSB7XG5cbiAgICAgICAgLy8gMS4gU2V0IHV0Zi04IGNvZGUgcG9pbnQsIHV0Zi04IGJ5dGVzIG5lZWRlZCwgYW5kIHV0Zi04XG4gICAgICAgIC8vIGJ5dGVzIHNlZW4gdG8gMCwgc2V0IHV0Zi04IGxvd2VyIGJvdW5kYXJ5IHRvIDB4ODAsIGFuZCBzZXRcbiAgICAgICAgLy8gdXRmLTggdXBwZXIgYm91bmRhcnkgdG8gMHhCRi5cbiAgICAgICAgdXRmOF9jb2RlX3BvaW50ID0gdXRmOF9ieXRlc19uZWVkZWQgPSB1dGY4X2J5dGVzX3NlZW4gPSAwO1xuICAgICAgICB1dGY4X2xvd2VyX2JvdW5kYXJ5ID0gMHg4MDtcbiAgICAgICAgdXRmOF91cHBlcl9ib3VuZGFyeSA9IDB4QkY7XG5cbiAgICAgICAgLy8gMi4gUHJlcGVuZCBieXRlIHRvIHN0cmVhbS5cbiAgICAgICAgc3RyZWFtLnByZXBlbmQoYml0ZSk7XG5cbiAgICAgICAgLy8gMy4gUmV0dXJuIGVycm9yLlxuICAgICAgICByZXR1cm4gZGVjb2RlckVycm9yKGZhdGFsKTtcbiAgICAgIH1cblxuICAgICAgLy8gNS4gU2V0IHV0Zi04IGxvd2VyIGJvdW5kYXJ5IHRvIDB4ODAgYW5kIHV0Zi04IHVwcGVyIGJvdW5kYXJ5XG4gICAgICAvLyB0byAweEJGLlxuICAgICAgdXRmOF9sb3dlcl9ib3VuZGFyeSA9IDB4ODA7XG4gICAgICB1dGY4X3VwcGVyX2JvdW5kYXJ5ID0gMHhCRjtcblxuICAgICAgLy8gNi4gU2V0IFVURi04IGNvZGUgcG9pbnQgdG8gKFVURi04IGNvZGUgcG9pbnQgPDwgNikgfCAoYnl0ZSAmXG4gICAgICAvLyAweDNGKVxuICAgICAgdXRmOF9jb2RlX3BvaW50ID0gKHV0ZjhfY29kZV9wb2ludCA8PCA2KSB8IChiaXRlICYgMHgzRik7XG5cbiAgICAgIC8vIDcuIEluY3JlYXNlIHV0Zi04IGJ5dGVzIHNlZW4gYnkgb25lLlxuICAgICAgdXRmOF9ieXRlc19zZWVuICs9IDE7XG5cbiAgICAgIC8vIDguIElmIHV0Zi04IGJ5dGVzIHNlZW4gaXMgbm90IGVxdWFsIHRvIHV0Zi04IGJ5dGVzIG5lZWRlZCxcbiAgICAgIC8vIGNvbnRpbnVlLlxuICAgICAgaWYgKHV0ZjhfYnl0ZXNfc2VlbiAhPT0gdXRmOF9ieXRlc19uZWVkZWQpXG4gICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAvLyA5LiBMZXQgY29kZSBwb2ludCBiZSB1dGYtOCBjb2RlIHBvaW50LlxuICAgICAgdmFyIGNvZGVfcG9pbnQgPSB1dGY4X2NvZGVfcG9pbnQ7XG5cbiAgICAgIC8vIDEwLiBTZXQgdXRmLTggY29kZSBwb2ludCwgdXRmLTggYnl0ZXMgbmVlZGVkLCBhbmQgdXRmLTggYnl0ZXNcbiAgICAgIC8vIHNlZW4gdG8gMC5cbiAgICAgIHV0ZjhfY29kZV9wb2ludCA9IHV0ZjhfYnl0ZXNfbmVlZGVkID0gdXRmOF9ieXRlc19zZWVuID0gMDtcblxuICAgICAgLy8gMTEuIFJldHVybiBhIGNvZGUgcG9pbnQgd2hvc2UgdmFsdWUgaXMgY29kZSBwb2ludC5cbiAgICAgIHJldHVybiBjb2RlX3BvaW50O1xuICAgIH07XG4gIH1cblxuICAvLyA5LjEuMiB1dGYtOCBlbmNvZGVyXG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGltcGxlbWVudHMge0VuY29kZXJ9XG4gICAqIEBwYXJhbSB7e2ZhdGFsOiBib29sZWFufX0gb3B0aW9uc1xuICAgKi9cbiAgZnVuY3Rpb24gVVRGOEVuY29kZXIob3B0aW9ucykge1xuICAgIHZhciBmYXRhbCA9IG9wdGlvbnMuZmF0YWw7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbSBJbnB1dCBzdHJlYW0uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNvZGVfcG9pbnQgTmV4dCBjb2RlIHBvaW50IHJlYWQgZnJvbSB0aGUgc3RyZWFtLlxuICAgICAqIEByZXR1cm4geyhudW1iZXJ8IUFycmF5LjxudW1iZXI+KX0gQnl0ZShzKSB0byBlbWl0LlxuICAgICAqL1xuICAgIHRoaXMuaGFuZGxlciA9IGZ1bmN0aW9uKHN0cmVhbSwgY29kZV9wb2ludCkge1xuICAgICAgLy8gMS4gSWYgY29kZSBwb2ludCBpcyBlbmQtb2Ytc3RyZWFtLCByZXR1cm4gZmluaXNoZWQuXG4gICAgICBpZiAoY29kZV9wb2ludCA9PT0gZW5kX29mX3N0cmVhbSlcbiAgICAgICAgcmV0dXJuIGZpbmlzaGVkO1xuXG4gICAgICAvLyAyLiBJZiBjb2RlIHBvaW50IGlzIGFuIEFTQ0lJIGNvZGUgcG9pbnQsIHJldHVybiBhIGJ5dGUgd2hvc2VcbiAgICAgIC8vIHZhbHVlIGlzIGNvZGUgcG9pbnQuXG4gICAgICBpZiAoaXNBU0NJSUNvZGVQb2ludChjb2RlX3BvaW50KSlcbiAgICAgICAgcmV0dXJuIGNvZGVfcG9pbnQ7XG5cbiAgICAgIC8vIDMuIFNldCBjb3VudCBhbmQgb2Zmc2V0IGJhc2VkIG9uIHRoZSByYW5nZSBjb2RlIHBvaW50IGlzIGluOlxuICAgICAgdmFyIGNvdW50LCBvZmZzZXQ7XG4gICAgICAvLyBVKzAwODAgdG8gVSswN0ZGLCBpbmNsdXNpdmU6XG4gICAgICBpZiAoaW5SYW5nZShjb2RlX3BvaW50LCAweDAwODAsIDB4MDdGRikpIHtcbiAgICAgICAgLy8gMSBhbmQgMHhDMFxuICAgICAgICBjb3VudCA9IDE7XG4gICAgICAgIG9mZnNldCA9IDB4QzA7XG4gICAgICB9XG4gICAgICAvLyBVKzA4MDAgdG8gVStGRkZGLCBpbmNsdXNpdmU6XG4gICAgICBlbHNlIGlmIChpblJhbmdlKGNvZGVfcG9pbnQsIDB4MDgwMCwgMHhGRkZGKSkge1xuICAgICAgICAvLyAyIGFuZCAweEUwXG4gICAgICAgIGNvdW50ID0gMjtcbiAgICAgICAgb2Zmc2V0ID0gMHhFMDtcbiAgICAgIH1cbiAgICAgIC8vIFUrMTAwMDAgdG8gVSsxMEZGRkYsIGluY2x1c2l2ZTpcbiAgICAgIGVsc2UgaWYgKGluUmFuZ2UoY29kZV9wb2ludCwgMHgxMDAwMCwgMHgxMEZGRkYpKSB7XG4gICAgICAgIC8vIDMgYW5kIDB4RjBcbiAgICAgICAgY291bnQgPSAzO1xuICAgICAgICBvZmZzZXQgPSAweEYwO1xuICAgICAgfVxuXG4gICAgICAvLyA0LiBMZXQgYnl0ZXMgYmUgYSBieXRlIHNlcXVlbmNlIHdob3NlIGZpcnN0IGJ5dGUgaXMgKGNvZGVcbiAgICAgIC8vIHBvaW50ID4+ICg2IMOXIGNvdW50KSkgKyBvZmZzZXQuXG4gICAgICB2YXIgYnl0ZXMgPSBbKGNvZGVfcG9pbnQgPj4gKDYgKiBjb3VudCkpICsgb2Zmc2V0XTtcblxuICAgICAgLy8gNS4gUnVuIHRoZXNlIHN1YnN0ZXBzIHdoaWxlIGNvdW50IGlzIGdyZWF0ZXIgdGhhbiAwOlxuICAgICAgd2hpbGUgKGNvdW50ID4gMCkge1xuXG4gICAgICAgIC8vIDEuIFNldCB0ZW1wIHRvIGNvZGUgcG9pbnQgPj4gKDYgw5cgKGNvdW50IOKIkiAxKSkuXG4gICAgICAgIHZhciB0ZW1wID0gY29kZV9wb2ludCA+PiAoNiAqIChjb3VudCAtIDEpKTtcblxuICAgICAgICAvLyAyLiBBcHBlbmQgdG8gYnl0ZXMgMHg4MCB8ICh0ZW1wICYgMHgzRikuXG4gICAgICAgIGJ5dGVzLnB1c2goMHg4MCB8ICh0ZW1wICYgMHgzRikpO1xuXG4gICAgICAgIC8vIDMuIERlY3JlYXNlIGNvdW50IGJ5IG9uZS5cbiAgICAgICAgY291bnQgLT0gMTtcbiAgICAgIH1cblxuICAgICAgLy8gNi4gUmV0dXJuIGJ5dGVzIGJ5dGVzLCBpbiBvcmRlci5cbiAgICAgIHJldHVybiBieXRlcztcbiAgICB9O1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7e2ZhdGFsOiBib29sZWFufX0gb3B0aW9ucyAqL1xuICBlbmNvZGVyc1snVVRGLTgnXSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFVURjhFbmNvZGVyKG9wdGlvbnMpO1xuICB9O1xuICAvKiogQHBhcmFtIHt7ZmF0YWw6IGJvb2xlYW59fSBvcHRpb25zICovXG4gIGRlY29kZXJzWydVVEYtOCddID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgVVRGOERlY29kZXIob3B0aW9ucyk7XG4gIH07XG5cbiAgLy9cbiAgLy8gMTAuIExlZ2FjeSBzaW5nbGUtYnl0ZSBlbmNvZGluZ3NcbiAgLy9cblxuICAvLyAxMC4xIHNpbmdsZS1ieXRlIGRlY29kZXJcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAaW1wbGVtZW50cyB7RGVjb2Rlcn1cbiAgICogQHBhcmFtIHshQXJyYXkuPG51bWJlcj59IGluZGV4IFRoZSBlbmNvZGluZyBpbmRleC5cbiAgICogQHBhcmFtIHt7ZmF0YWw6IGJvb2xlYW59fSBvcHRpb25zXG4gICAqL1xuICBmdW5jdGlvbiBTaW5nbGVCeXRlRGVjb2RlcihpbmRleCwgb3B0aW9ucykge1xuICAgIHZhciBmYXRhbCA9IG9wdGlvbnMuZmF0YWw7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbSBUaGUgc3RyZWFtIG9mIGJ5dGVzIGJlaW5nIGRlY29kZWQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGJpdGUgVGhlIG5leHQgYnl0ZSByZWFkIGZyb20gdGhlIHN0cmVhbS5cbiAgICAgKiBAcmV0dXJuIHs/KG51bWJlcnwhQXJyYXkuPG51bWJlcj4pfSBUaGUgbmV4dCBjb2RlIHBvaW50KHMpXG4gICAgICogICAgIGRlY29kZWQsIG9yIG51bGwgaWYgbm90IGVub3VnaCBkYXRhIGV4aXN0cyBpbiB0aGUgaW5wdXRcbiAgICAgKiAgICAgc3RyZWFtIHRvIGRlY29kZSBhIGNvbXBsZXRlIGNvZGUgcG9pbnQuXG4gICAgICovXG4gICAgdGhpcy5oYW5kbGVyID0gZnVuY3Rpb24oc3RyZWFtLCBiaXRlKSB7XG4gICAgICAvLyAxLiBJZiBieXRlIGlzIGVuZC1vZi1zdHJlYW0sIHJldHVybiBmaW5pc2hlZC5cbiAgICAgIGlmIChiaXRlID09PSBlbmRfb2Zfc3RyZWFtKVxuICAgICAgICByZXR1cm4gZmluaXNoZWQ7XG5cbiAgICAgIC8vIDIuIElmIGJ5dGUgaXMgYW4gQVNDSUkgYnl0ZSwgcmV0dXJuIGEgY29kZSBwb2ludCB3aG9zZSB2YWx1ZVxuICAgICAgLy8gaXMgYnl0ZS5cbiAgICAgIGlmIChpc0FTQ0lJQnl0ZShiaXRlKSlcbiAgICAgICAgcmV0dXJuIGJpdGU7XG5cbiAgICAgIC8vIDMuIExldCBjb2RlIHBvaW50IGJlIHRoZSBpbmRleCBjb2RlIHBvaW50IGZvciBieXRlIOKIkiAweDgwIGluXG4gICAgICAvLyBpbmRleCBzaW5nbGUtYnl0ZS5cbiAgICAgIHZhciBjb2RlX3BvaW50ID0gaW5kZXhbYml0ZSAtIDB4ODBdO1xuXG4gICAgICAvLyA0LiBJZiBjb2RlIHBvaW50IGlzIG51bGwsIHJldHVybiBlcnJvci5cbiAgICAgIGlmIChjb2RlX3BvaW50ID09PSBudWxsKVxuICAgICAgICByZXR1cm4gZGVjb2RlckVycm9yKGZhdGFsKTtcblxuICAgICAgLy8gNS4gUmV0dXJuIGEgY29kZSBwb2ludCB3aG9zZSB2YWx1ZSBpcyBjb2RlIHBvaW50LlxuICAgICAgcmV0dXJuIGNvZGVfcG9pbnQ7XG4gICAgfTtcbiAgfVxuXG4gIC8vIDEwLjIgc2luZ2xlLWJ5dGUgZW5jb2RlclxuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBpbXBsZW1lbnRzIHtFbmNvZGVyfVxuICAgKiBAcGFyYW0geyFBcnJheS48P251bWJlcj59IGluZGV4IFRoZSBlbmNvZGluZyBpbmRleC5cbiAgICogQHBhcmFtIHt7ZmF0YWw6IGJvb2xlYW59fSBvcHRpb25zXG4gICAqL1xuICBmdW5jdGlvbiBTaW5nbGVCeXRlRW5jb2RlcihpbmRleCwgb3B0aW9ucykge1xuICAgIHZhciBmYXRhbCA9IG9wdGlvbnMuZmF0YWw7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbSBJbnB1dCBzdHJlYW0uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNvZGVfcG9pbnQgTmV4dCBjb2RlIHBvaW50IHJlYWQgZnJvbSB0aGUgc3RyZWFtLlxuICAgICAqIEByZXR1cm4geyhudW1iZXJ8IUFycmF5LjxudW1iZXI+KX0gQnl0ZShzKSB0byBlbWl0LlxuICAgICAqL1xuICAgIHRoaXMuaGFuZGxlciA9IGZ1bmN0aW9uKHN0cmVhbSwgY29kZV9wb2ludCkge1xuICAgICAgLy8gMS4gSWYgY29kZSBwb2ludCBpcyBlbmQtb2Ytc3RyZWFtLCByZXR1cm4gZmluaXNoZWQuXG4gICAgICBpZiAoY29kZV9wb2ludCA9PT0gZW5kX29mX3N0cmVhbSlcbiAgICAgICAgcmV0dXJuIGZpbmlzaGVkO1xuXG4gICAgICAvLyAyLiBJZiBjb2RlIHBvaW50IGlzIGFuIEFTQ0lJIGNvZGUgcG9pbnQsIHJldHVybiBhIGJ5dGUgd2hvc2VcbiAgICAgIC8vIHZhbHVlIGlzIGNvZGUgcG9pbnQuXG4gICAgICBpZiAoaXNBU0NJSUNvZGVQb2ludChjb2RlX3BvaW50KSlcbiAgICAgICAgcmV0dXJuIGNvZGVfcG9pbnQ7XG5cbiAgICAgIC8vIDMuIExldCBwb2ludGVyIGJlIHRoZSBpbmRleCBwb2ludGVyIGZvciBjb2RlIHBvaW50IGluIGluZGV4XG4gICAgICAvLyBzaW5nbGUtYnl0ZS5cbiAgICAgIHZhciBwb2ludGVyID0gaW5kZXhQb2ludGVyRm9yKGNvZGVfcG9pbnQsIGluZGV4KTtcblxuICAgICAgLy8gNC4gSWYgcG9pbnRlciBpcyBudWxsLCByZXR1cm4gZXJyb3Igd2l0aCBjb2RlIHBvaW50LlxuICAgICAgaWYgKHBvaW50ZXIgPT09IG51bGwpXG4gICAgICAgIGVuY29kZXJFcnJvcihjb2RlX3BvaW50KTtcblxuICAgICAgLy8gNS4gUmV0dXJuIGEgYnl0ZSB3aG9zZSB2YWx1ZSBpcyBwb2ludGVyICsgMHg4MC5cbiAgICAgIHJldHVybiBwb2ludGVyICsgMHg4MDtcbiAgICB9O1xuICB9XG5cbiAgKGZ1bmN0aW9uKCkge1xuICAgIGlmICghKCdlbmNvZGluZy1pbmRleGVzJyBpbiBnbG9iYWwpKVxuICAgICAgcmV0dXJuO1xuICAgIGVuY29kaW5ncy5mb3JFYWNoKGZ1bmN0aW9uKGNhdGVnb3J5KSB7XG4gICAgICBpZiAoY2F0ZWdvcnkuaGVhZGluZyAhPT0gJ0xlZ2FjeSBzaW5nbGUtYnl0ZSBlbmNvZGluZ3MnKVxuICAgICAgICByZXR1cm47XG4gICAgICBjYXRlZ29yeS5lbmNvZGluZ3MuZm9yRWFjaChmdW5jdGlvbihlbmNvZGluZykge1xuICAgICAgICB2YXIgbmFtZSA9IGVuY29kaW5nLm5hbWU7XG4gICAgICAgIHZhciBpZHggPSBpbmRleChuYW1lLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICAvKiogQHBhcmFtIHt7ZmF0YWw6IGJvb2xlYW59fSBvcHRpb25zICovXG4gICAgICAgIGRlY29kZXJzW25hbWVdID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgIHJldHVybiBuZXcgU2luZ2xlQnl0ZURlY29kZXIoaWR4LCBvcHRpb25zKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqIEBwYXJhbSB7e2ZhdGFsOiBib29sZWFufX0gb3B0aW9ucyAqL1xuICAgICAgICBlbmNvZGVyc1tuYW1lXSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFNpbmdsZUJ5dGVFbmNvZGVyKGlkeCwgb3B0aW9ucyk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSgpKTtcblxuICAvL1xuICAvLyAxMS4gTGVnYWN5IG11bHRpLWJ5dGUgQ2hpbmVzZSAoc2ltcGxpZmllZCkgZW5jb2RpbmdzXG4gIC8vXG5cbiAgLy8gMTEuMSBnYmtcblxuICAvLyAxMS4xLjEgZ2JrIGRlY29kZXJcbiAgLy8gZ2JrJ3MgZGVjb2RlciBpcyBnYjE4MDMwJ3MgZGVjb2Rlci5cbiAgLyoqIEBwYXJhbSB7e2ZhdGFsOiBib29sZWFufX0gb3B0aW9ucyAqL1xuICBkZWNvZGVyc1snR0JLJ10gPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBHQjE4MDMwRGVjb2RlcihvcHRpb25zKTtcbiAgfTtcblxuICAvLyAxMS4xLjIgZ2JrIGVuY29kZXJcbiAgLy8gZ2JrJ3MgZW5jb2RlciBpcyBnYjE4MDMwJ3MgZW5jb2RlciB3aXRoIGl0cyBnYmsgZmxhZyBzZXQuXG4gIC8qKiBAcGFyYW0ge3tmYXRhbDogYm9vbGVhbn19IG9wdGlvbnMgKi9cbiAgZW5jb2RlcnNbJ0dCSyddID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgR0IxODAzMEVuY29kZXIob3B0aW9ucywgdHJ1ZSk7XG4gIH07XG5cbiAgLy8gMTEuMiBnYjE4MDMwXG5cbiAgLy8gMTEuMi4xIGdiMTgwMzAgZGVjb2RlclxuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBpbXBsZW1lbnRzIHtEZWNvZGVyfVxuICAgKiBAcGFyYW0ge3tmYXRhbDogYm9vbGVhbn19IG9wdGlvbnNcbiAgICovXG4gIGZ1bmN0aW9uIEdCMTgwMzBEZWNvZGVyKG9wdGlvbnMpIHtcbiAgICB2YXIgZmF0YWwgPSBvcHRpb25zLmZhdGFsO1xuICAgIC8vIGdiMTgwMzAncyBkZWNvZGVyIGhhcyBhbiBhc3NvY2lhdGVkIGdiMTgwMzAgZmlyc3QsIGdiMTgwMzBcbiAgICAvLyBzZWNvbmQsIGFuZCBnYjE4MDMwIHRoaXJkIChhbGwgaW5pdGlhbGx5IDB4MDApLlxuICAgIHZhciAvKiogQHR5cGUge251bWJlcn0gKi8gZ2IxODAzMF9maXJzdCA9IDB4MDAsXG4gICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqLyBnYjE4MDMwX3NlY29uZCA9IDB4MDAsXG4gICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqLyBnYjE4MDMwX3RoaXJkID0gMHgwMDtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtIFRoZSBzdHJlYW0gb2YgYnl0ZXMgYmVpbmcgZGVjb2RlZC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYml0ZSBUaGUgbmV4dCBieXRlIHJlYWQgZnJvbSB0aGUgc3RyZWFtLlxuICAgICAqIEByZXR1cm4gez8obnVtYmVyfCFBcnJheS48bnVtYmVyPil9IFRoZSBuZXh0IGNvZGUgcG9pbnQocylcbiAgICAgKiAgICAgZGVjb2RlZCwgb3IgbnVsbCBpZiBub3QgZW5vdWdoIGRhdGEgZXhpc3RzIGluIHRoZSBpbnB1dFxuICAgICAqICAgICBzdHJlYW0gdG8gZGVjb2RlIGEgY29tcGxldGUgY29kZSBwb2ludC5cbiAgICAgKi9cbiAgICB0aGlzLmhhbmRsZXIgPSBmdW5jdGlvbihzdHJlYW0sIGJpdGUpIHtcbiAgICAgIC8vIDEuIElmIGJ5dGUgaXMgZW5kLW9mLXN0cmVhbSBhbmQgZ2IxODAzMCBmaXJzdCwgZ2IxODAzMFxuICAgICAgLy8gc2Vjb25kLCBhbmQgZ2IxODAzMCB0aGlyZCBhcmUgMHgwMCwgcmV0dXJuIGZpbmlzaGVkLlxuICAgICAgaWYgKGJpdGUgPT09IGVuZF9vZl9zdHJlYW0gJiYgZ2IxODAzMF9maXJzdCA9PT0gMHgwMCAmJlxuICAgICAgICAgIGdiMTgwMzBfc2Vjb25kID09PSAweDAwICYmIGdiMTgwMzBfdGhpcmQgPT09IDB4MDApIHtcbiAgICAgICAgcmV0dXJuIGZpbmlzaGVkO1xuICAgICAgfVxuICAgICAgLy8gMi4gSWYgYnl0ZSBpcyBlbmQtb2Ytc3RyZWFtLCBhbmQgZ2IxODAzMCBmaXJzdCwgZ2IxODAzMFxuICAgICAgLy8gc2Vjb25kLCBvciBnYjE4MDMwIHRoaXJkIGlzIG5vdCAweDAwLCBzZXQgZ2IxODAzMCBmaXJzdCxcbiAgICAgIC8vIGdiMTgwMzAgc2Vjb25kLCBhbmQgZ2IxODAzMCB0aGlyZCB0byAweDAwLCBhbmQgcmV0dXJuIGVycm9yLlxuICAgICAgaWYgKGJpdGUgPT09IGVuZF9vZl9zdHJlYW0gJiZcbiAgICAgICAgICAoZ2IxODAzMF9maXJzdCAhPT0gMHgwMCB8fCBnYjE4MDMwX3NlY29uZCAhPT0gMHgwMCB8fFxuICAgICAgICAgICBnYjE4MDMwX3RoaXJkICE9PSAweDAwKSkge1xuICAgICAgICBnYjE4MDMwX2ZpcnN0ID0gMHgwMDtcbiAgICAgICAgZ2IxODAzMF9zZWNvbmQgPSAweDAwO1xuICAgICAgICBnYjE4MDMwX3RoaXJkID0gMHgwMDtcbiAgICAgICAgZGVjb2RlckVycm9yKGZhdGFsKTtcbiAgICAgIH1cbiAgICAgIHZhciBjb2RlX3BvaW50O1xuICAgICAgLy8gMy4gSWYgZ2IxODAzMCB0aGlyZCBpcyBub3QgMHgwMCwgcnVuIHRoZXNlIHN1YnN0ZXBzOlxuICAgICAgaWYgKGdiMTgwMzBfdGhpcmQgIT09IDB4MDApIHtcbiAgICAgICAgLy8gMS4gTGV0IGNvZGUgcG9pbnQgYmUgbnVsbC5cbiAgICAgICAgY29kZV9wb2ludCA9IG51bGw7XG4gICAgICAgIC8vIDIuIElmIGJ5dGUgaXMgaW4gdGhlIHJhbmdlIDB4MzAgdG8gMHgzOSwgaW5jbHVzaXZlLCBzZXRcbiAgICAgICAgLy8gY29kZSBwb2ludCB0byB0aGUgaW5kZXggZ2IxODAzMCByYW5nZXMgY29kZSBwb2ludCBmb3JcbiAgICAgICAgLy8gKCgoZ2IxODAzMCBmaXJzdCDiiJIgMHg4MSkgw5cgMTAgKyBnYjE4MDMwIHNlY29uZCDiiJIgMHgzMCkgw5dcbiAgICAgICAgLy8gMTI2ICsgZ2IxODAzMCB0aGlyZCDiiJIgMHg4MSkgw5cgMTAgKyBieXRlIOKIkiAweDMwLlxuICAgICAgICBpZiAoaW5SYW5nZShiaXRlLCAweDMwLCAweDM5KSkge1xuICAgICAgICAgIGNvZGVfcG9pbnQgPSBpbmRleEdCMTgwMzBSYW5nZXNDb2RlUG9pbnRGb3IoXG4gICAgICAgICAgICAgICgoKGdiMTgwMzBfZmlyc3QgLSAweDgxKSAqIDEwICsgZ2IxODAzMF9zZWNvbmQgLSAweDMwKSAqIDEyNiArXG4gICAgICAgICAgICAgICBnYjE4MDMwX3RoaXJkIC0gMHg4MSkgKiAxMCArIGJpdGUgLSAweDMwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDMuIExldCBidWZmZXIgYmUgYSBieXRlIHNlcXVlbmNlIGNvbnNpc3Rpbmcgb2YgZ2IxODAzMFxuICAgICAgICAvLyBzZWNvbmQsIGdiMTgwMzAgdGhpcmQsIGFuZCBieXRlLCBpbiBvcmRlci5cbiAgICAgICAgdmFyIGJ1ZmZlciA9IFtnYjE4MDMwX3NlY29uZCwgZ2IxODAzMF90aGlyZCwgYml0ZV07XG5cbiAgICAgICAgLy8gNC4gU2V0IGdiMTgwMzAgZmlyc3QsIGdiMTgwMzAgc2Vjb25kLCBhbmQgZ2IxODAzMCB0aGlyZCB0b1xuICAgICAgICAvLyAweDAwLlxuICAgICAgICBnYjE4MDMwX2ZpcnN0ID0gMHgwMDtcbiAgICAgICAgZ2IxODAzMF9zZWNvbmQgPSAweDAwO1xuICAgICAgICBnYjE4MDMwX3RoaXJkID0gMHgwMDtcblxuICAgICAgICAvLyA1LiBJZiBjb2RlIHBvaW50IGlzIG51bGwsIHByZXBlbmQgYnVmZmVyIHRvIHN0cmVhbSBhbmRcbiAgICAgICAgLy8gcmV0dXJuIGVycm9yLlxuICAgICAgICBpZiAoY29kZV9wb2ludCA9PT0gbnVsbCkge1xuICAgICAgICAgIHN0cmVhbS5wcmVwZW5kKGJ1ZmZlcik7XG4gICAgICAgICAgcmV0dXJuIGRlY29kZXJFcnJvcihmYXRhbCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyA2LiBSZXR1cm4gYSBjb2RlIHBvaW50IHdob3NlIHZhbHVlIGlzIGNvZGUgcG9pbnQuXG4gICAgICAgIHJldHVybiBjb2RlX3BvaW50O1xuICAgICAgfVxuXG4gICAgICAvLyA0LiBJZiBnYjE4MDMwIHNlY29uZCBpcyBub3QgMHgwMCwgcnVuIHRoZXNlIHN1YnN0ZXBzOlxuICAgICAgaWYgKGdiMTgwMzBfc2Vjb25kICE9PSAweDAwKSB7XG5cbiAgICAgICAgLy8gMS4gSWYgYnl0ZSBpcyBpbiB0aGUgcmFuZ2UgMHg4MSB0byAweEZFLCBpbmNsdXNpdmUsIHNldFxuICAgICAgICAvLyBnYjE4MDMwIHRoaXJkIHRvIGJ5dGUgYW5kIHJldHVybiBjb250aW51ZS5cbiAgICAgICAgaWYgKGluUmFuZ2UoYml0ZSwgMHg4MSwgMHhGRSkpIHtcbiAgICAgICAgICBnYjE4MDMwX3RoaXJkID0gYml0ZTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDIuIFByZXBlbmQgZ2IxODAzMCBzZWNvbmQgZm9sbG93ZWQgYnkgYnl0ZSB0byBzdHJlYW0sIHNldFxuICAgICAgICAvLyBnYjE4MDMwIGZpcnN0IGFuZCBnYjE4MDMwIHNlY29uZCB0byAweDAwLCBhbmQgcmV0dXJuIGVycm9yLlxuICAgICAgICBzdHJlYW0ucHJlcGVuZChbZ2IxODAzMF9zZWNvbmQsIGJpdGVdKTtcbiAgICAgICAgZ2IxODAzMF9maXJzdCA9IDB4MDA7XG4gICAgICAgIGdiMTgwMzBfc2Vjb25kID0gMHgwMDtcbiAgICAgICAgcmV0dXJuIGRlY29kZXJFcnJvcihmYXRhbCk7XG4gICAgICB9XG5cbiAgICAgIC8vIDUuIElmIGdiMTgwMzAgZmlyc3QgaXMgbm90IDB4MDAsIHJ1biB0aGVzZSBzdWJzdGVwczpcbiAgICAgIGlmIChnYjE4MDMwX2ZpcnN0ICE9PSAweDAwKSB7XG5cbiAgICAgICAgLy8gMS4gSWYgYnl0ZSBpcyBpbiB0aGUgcmFuZ2UgMHgzMCB0byAweDM5LCBpbmNsdXNpdmUsIHNldFxuICAgICAgICAvLyBnYjE4MDMwIHNlY29uZCB0byBieXRlIGFuZCByZXR1cm4gY29udGludWUuXG4gICAgICAgIGlmIChpblJhbmdlKGJpdGUsIDB4MzAsIDB4MzkpKSB7XG4gICAgICAgICAgZ2IxODAzMF9zZWNvbmQgPSBiaXRlO1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gMi4gTGV0IGxlYWQgYmUgZ2IxODAzMCBmaXJzdCwgbGV0IHBvaW50ZXIgYmUgbnVsbCwgYW5kIHNldFxuICAgICAgICAvLyBnYjE4MDMwIGZpcnN0IHRvIDB4MDAuXG4gICAgICAgIHZhciBsZWFkID0gZ2IxODAzMF9maXJzdDtcbiAgICAgICAgdmFyIHBvaW50ZXIgPSBudWxsO1xuICAgICAgICBnYjE4MDMwX2ZpcnN0ID0gMHgwMDtcblxuICAgICAgICAvLyAzLiBMZXQgb2Zmc2V0IGJlIDB4NDAgaWYgYnl0ZSBpcyBsZXNzIHRoYW4gMHg3RiBhbmQgMHg0MVxuICAgICAgICAvLyBvdGhlcndpc2UuXG4gICAgICAgIHZhciBvZmZzZXQgPSBiaXRlIDwgMHg3RiA/IDB4NDAgOiAweDQxO1xuXG4gICAgICAgIC8vIDQuIElmIGJ5dGUgaXMgaW4gdGhlIHJhbmdlIDB4NDAgdG8gMHg3RSwgaW5jbHVzaXZlLCBvciAweDgwXG4gICAgICAgIC8vIHRvIDB4RkUsIGluY2x1c2l2ZSwgc2V0IHBvaW50ZXIgdG8gKGxlYWQg4oiSIDB4ODEpIMOXIDE5MCArXG4gICAgICAgIC8vIChieXRlIOKIkiBvZmZzZXQpLlxuICAgICAgICBpZiAoaW5SYW5nZShiaXRlLCAweDQwLCAweDdFKSB8fCBpblJhbmdlKGJpdGUsIDB4ODAsIDB4RkUpKVxuICAgICAgICAgIHBvaW50ZXIgPSAobGVhZCAtIDB4ODEpICogMTkwICsgKGJpdGUgLSBvZmZzZXQpO1xuXG4gICAgICAgIC8vIDUuIExldCBjb2RlIHBvaW50IGJlIG51bGwgaWYgcG9pbnRlciBpcyBudWxsIGFuZCB0aGUgaW5kZXhcbiAgICAgICAgLy8gY29kZSBwb2ludCBmb3IgcG9pbnRlciBpbiBpbmRleCBnYjE4MDMwIG90aGVyd2lzZS5cbiAgICAgICAgY29kZV9wb2ludCA9IHBvaW50ZXIgPT09IG51bGwgPyBudWxsIDpcbiAgICAgICAgICAgIGluZGV4Q29kZVBvaW50Rm9yKHBvaW50ZXIsIGluZGV4KCdnYjE4MDMwJykpO1xuXG4gICAgICAgIC8vIDYuIElmIGNvZGUgcG9pbnQgaXMgbnVsbCBhbmQgYnl0ZSBpcyBhbiBBU0NJSSBieXRlLCBwcmVwZW5kXG4gICAgICAgIC8vIGJ5dGUgdG8gc3RyZWFtLlxuICAgICAgICBpZiAoY29kZV9wb2ludCA9PT0gbnVsbCAmJiBpc0FTQ0lJQnl0ZShiaXRlKSlcbiAgICAgICAgICBzdHJlYW0ucHJlcGVuZChiaXRlKTtcblxuICAgICAgICAvLyA3LiBJZiBjb2RlIHBvaW50IGlzIG51bGwsIHJldHVybiBlcnJvci5cbiAgICAgICAgaWYgKGNvZGVfcG9pbnQgPT09IG51bGwpXG4gICAgICAgICAgcmV0dXJuIGRlY29kZXJFcnJvcihmYXRhbCk7XG5cbiAgICAgICAgLy8gOC4gUmV0dXJuIGEgY29kZSBwb2ludCB3aG9zZSB2YWx1ZSBpcyBjb2RlIHBvaW50LlxuICAgICAgICByZXR1cm4gY29kZV9wb2ludDtcbiAgICAgIH1cblxuICAgICAgLy8gNi4gSWYgYnl0ZSBpcyBhbiBBU0NJSSBieXRlLCByZXR1cm4gYSBjb2RlIHBvaW50IHdob3NlIHZhbHVlXG4gICAgICAvLyBpcyBieXRlLlxuICAgICAgaWYgKGlzQVNDSUlCeXRlKGJpdGUpKVxuICAgICAgICByZXR1cm4gYml0ZTtcblxuICAgICAgLy8gNy4gSWYgYnl0ZSBpcyAweDgwLCByZXR1cm4gY29kZSBwb2ludCBVKzIwQUMuXG4gICAgICBpZiAoYml0ZSA9PT0gMHg4MClcbiAgICAgICAgcmV0dXJuIDB4MjBBQztcblxuICAgICAgLy8gOC4gSWYgYnl0ZSBpcyBpbiB0aGUgcmFuZ2UgMHg4MSB0byAweEZFLCBpbmNsdXNpdmUsIHNldFxuICAgICAgLy8gZ2IxODAzMCBmaXJzdCB0byBieXRlIGFuZCByZXR1cm4gY29udGludWUuXG4gICAgICBpZiAoaW5SYW5nZShiaXRlLCAweDgxLCAweEZFKSkge1xuICAgICAgICBnYjE4MDMwX2ZpcnN0ID0gYml0ZTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIC8vIDkuIFJldHVybiBlcnJvci5cbiAgICAgIHJldHVybiBkZWNvZGVyRXJyb3IoZmF0YWwpO1xuICAgIH07XG4gIH1cblxuICAvLyAxMS4yLjIgZ2IxODAzMCBlbmNvZGVyXG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGltcGxlbWVudHMge0VuY29kZXJ9XG4gICAqIEBwYXJhbSB7e2ZhdGFsOiBib29sZWFufX0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBnYmtfZmxhZ1xuICAgKi9cbiAgZnVuY3Rpb24gR0IxODAzMEVuY29kZXIob3B0aW9ucywgZ2JrX2ZsYWcpIHtcbiAgICB2YXIgZmF0YWwgPSBvcHRpb25zLmZhdGFsO1xuICAgIC8vIGdiMTgwMzAncyBkZWNvZGVyIGhhcyBhbiBhc3NvY2lhdGVkIGdiayBmbGFnIChpbml0aWFsbHkgdW5zZXQpLlxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U3RyZWFtfSBzdHJlYW0gSW5wdXQgc3RyZWFtLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb2RlX3BvaW50IE5leHQgY29kZSBwb2ludCByZWFkIGZyb20gdGhlIHN0cmVhbS5cbiAgICAgKiBAcmV0dXJuIHsobnVtYmVyfCFBcnJheS48bnVtYmVyPil9IEJ5dGUocykgdG8gZW1pdC5cbiAgICAgKi9cbiAgICB0aGlzLmhhbmRsZXIgPSBmdW5jdGlvbihzdHJlYW0sIGNvZGVfcG9pbnQpIHtcbiAgICAgIC8vIDEuIElmIGNvZGUgcG9pbnQgaXMgZW5kLW9mLXN0cmVhbSwgcmV0dXJuIGZpbmlzaGVkLlxuICAgICAgaWYgKGNvZGVfcG9pbnQgPT09IGVuZF9vZl9zdHJlYW0pXG4gICAgICAgIHJldHVybiBmaW5pc2hlZDtcblxuICAgICAgLy8gMi4gSWYgY29kZSBwb2ludCBpcyBhbiBBU0NJSSBjb2RlIHBvaW50LCByZXR1cm4gYSBieXRlIHdob3NlXG4gICAgICAvLyB2YWx1ZSBpcyBjb2RlIHBvaW50LlxuICAgICAgaWYgKGlzQVNDSUlDb2RlUG9pbnQoY29kZV9wb2ludCkpXG4gICAgICAgIHJldHVybiBjb2RlX3BvaW50O1xuXG4gICAgICAvLyAzLiBJZiBjb2RlIHBvaW50IGlzIFUrRTVFNSwgcmV0dXJuIGVycm9yIHdpdGggY29kZSBwb2ludC5cbiAgICAgIGlmIChjb2RlX3BvaW50ID09PSAweEU1RTUpXG4gICAgICAgIHJldHVybiBlbmNvZGVyRXJyb3IoY29kZV9wb2ludCk7XG5cbiAgICAgIC8vIDQuIElmIHRoZSBnYmsgZmxhZyBpcyBzZXQgYW5kIGNvZGUgcG9pbnQgaXMgVSsyMEFDLCByZXR1cm5cbiAgICAgIC8vIGJ5dGUgMHg4MC5cbiAgICAgIGlmIChnYmtfZmxhZyAmJiBjb2RlX3BvaW50ID09PSAweDIwQUMpXG4gICAgICAgIHJldHVybiAweDgwO1xuXG4gICAgICAvLyA1LiBMZXQgcG9pbnRlciBiZSB0aGUgaW5kZXggcG9pbnRlciBmb3IgY29kZSBwb2ludCBpbiBpbmRleFxuICAgICAgLy8gZ2IxODAzMC5cbiAgICAgIHZhciBwb2ludGVyID0gaW5kZXhQb2ludGVyRm9yKGNvZGVfcG9pbnQsIGluZGV4KCdnYjE4MDMwJykpO1xuXG4gICAgICAvLyA2LiBJZiBwb2ludGVyIGlzIG5vdCBudWxsLCBydW4gdGhlc2Ugc3Vic3RlcHM6XG4gICAgICBpZiAocG9pbnRlciAhPT0gbnVsbCkge1xuXG4gICAgICAgIC8vIDEuIExldCBsZWFkIGJlIGZsb29yKHBvaW50ZXIgLyAxOTApICsgMHg4MS5cbiAgICAgICAgdmFyIGxlYWQgPSBmbG9vcihwb2ludGVyIC8gMTkwKSArIDB4ODE7XG5cbiAgICAgICAgLy8gMi4gTGV0IHRyYWlsIGJlIHBvaW50ZXIgJSAxOTAuXG4gICAgICAgIHZhciB0cmFpbCA9IHBvaW50ZXIgJSAxOTA7XG5cbiAgICAgICAgLy8gMy4gTGV0IG9mZnNldCBiZSAweDQwIGlmIHRyYWlsIGlzIGxlc3MgdGhhbiAweDNGIGFuZCAweDQxIG90aGVyd2lzZS5cbiAgICAgICAgdmFyIG9mZnNldCA9IHRyYWlsIDwgMHgzRiA/IDB4NDAgOiAweDQxO1xuXG4gICAgICAgIC8vIDQuIFJldHVybiB0d28gYnl0ZXMgd2hvc2UgdmFsdWVzIGFyZSBsZWFkIGFuZCB0cmFpbCArIG9mZnNldC5cbiAgICAgICAgcmV0dXJuIFtsZWFkLCB0cmFpbCArIG9mZnNldF07XG4gICAgICB9XG5cbiAgICAgIC8vIDcuIElmIGdiayBmbGFnIGlzIHNldCwgcmV0dXJuIGVycm9yIHdpdGggY29kZSBwb2ludC5cbiAgICAgIGlmIChnYmtfZmxhZylcbiAgICAgICAgcmV0dXJuIGVuY29kZXJFcnJvcihjb2RlX3BvaW50KTtcblxuICAgICAgLy8gOC4gU2V0IHBvaW50ZXIgdG8gdGhlIGluZGV4IGdiMTgwMzAgcmFuZ2VzIHBvaW50ZXIgZm9yIGNvZGVcbiAgICAgIC8vIHBvaW50LlxuICAgICAgcG9pbnRlciA9IGluZGV4R0IxODAzMFJhbmdlc1BvaW50ZXJGb3IoY29kZV9wb2ludCk7XG5cbiAgICAgIC8vIDkuIExldCBieXRlMSBiZSBmbG9vcihwb2ludGVyIC8gMTAgLyAxMjYgLyAxMCkuXG4gICAgICB2YXIgYnl0ZTEgPSBmbG9vcihwb2ludGVyIC8gMTAgLyAxMjYgLyAxMCk7XG5cbiAgICAgIC8vIDEwLiBTZXQgcG9pbnRlciB0byBwb2ludGVyIOKIkiBieXRlMSDDlyAxMCDDlyAxMjYgw5cgMTAuXG4gICAgICBwb2ludGVyID0gcG9pbnRlciAtIGJ5dGUxICogMTAgKiAxMjYgKiAxMDtcblxuICAgICAgLy8gMTEuIExldCBieXRlMiBiZSBmbG9vcihwb2ludGVyIC8gMTAgLyAxMjYpLlxuICAgICAgdmFyIGJ5dGUyID0gZmxvb3IocG9pbnRlciAvIDEwIC8gMTI2KTtcblxuICAgICAgLy8gMTIuIFNldCBwb2ludGVyIHRvIHBvaW50ZXIg4oiSIGJ5dGUyIMOXIDEwIMOXIDEyNi5cbiAgICAgIHBvaW50ZXIgPSBwb2ludGVyIC0gYnl0ZTIgKiAxMCAqIDEyNjtcblxuICAgICAgLy8gMTMuIExldCBieXRlMyBiZSBmbG9vcihwb2ludGVyIC8gMTApLlxuICAgICAgdmFyIGJ5dGUzID0gZmxvb3IocG9pbnRlciAvIDEwKTtcblxuICAgICAgLy8gMTQuIExldCBieXRlNCBiZSBwb2ludGVyIOKIkiBieXRlMyDDlyAxMC5cbiAgICAgIHZhciBieXRlNCA9IHBvaW50ZXIgLSBieXRlMyAqIDEwO1xuXG4gICAgICAvLyAxNS4gUmV0dXJuIGZvdXIgYnl0ZXMgd2hvc2UgdmFsdWVzIGFyZSBieXRlMSArIDB4ODEsIGJ5dGUyICtcbiAgICAgIC8vIDB4MzAsIGJ5dGUzICsgMHg4MSwgYnl0ZTQgKyAweDMwLlxuICAgICAgcmV0dXJuIFtieXRlMSArIDB4ODEsXG4gICAgICAgICAgICAgIGJ5dGUyICsgMHgzMCxcbiAgICAgICAgICAgICAgYnl0ZTMgKyAweDgxLFxuICAgICAgICAgICAgICBieXRlNCArIDB4MzBdO1xuICAgIH07XG4gIH1cblxuICAvKiogQHBhcmFtIHt7ZmF0YWw6IGJvb2xlYW59fSBvcHRpb25zICovXG4gIGVuY29kZXJzWydnYjE4MDMwJ10gPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBHQjE4MDMwRW5jb2RlcihvcHRpb25zKTtcbiAgfTtcbiAgLyoqIEBwYXJhbSB7e2ZhdGFsOiBib29sZWFufX0gb3B0aW9ucyAqL1xuICBkZWNvZGVyc1snZ2IxODAzMCddID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgR0IxODAzMERlY29kZXIob3B0aW9ucyk7XG4gIH07XG5cblxuICAvL1xuICAvLyAxMi4gTGVnYWN5IG11bHRpLWJ5dGUgQ2hpbmVzZSAodHJhZGl0aW9uYWwpIGVuY29kaW5nc1xuICAvL1xuXG4gIC8vIDEyLjEgQmlnNVxuXG4gIC8vIDEyLjEuMSBCaWc1IGRlY29kZXJcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAaW1wbGVtZW50cyB7RGVjb2Rlcn1cbiAgICogQHBhcmFtIHt7ZmF0YWw6IGJvb2xlYW59fSBvcHRpb25zXG4gICAqL1xuICBmdW5jdGlvbiBCaWc1RGVjb2RlcihvcHRpb25zKSB7XG4gICAgdmFyIGZhdGFsID0gb3B0aW9ucy5mYXRhbDtcbiAgICAvLyBCaWc1J3MgZGVjb2RlciBoYXMgYW4gYXNzb2NpYXRlZCBCaWc1IGxlYWQgKGluaXRpYWxseSAweDAwKS5cbiAgICB2YXIgLyoqIEB0eXBlIHtudW1iZXJ9ICovIEJpZzVfbGVhZCA9IDB4MDA7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtIFRoZSBzdHJlYW0gb2YgYnl0ZXMgYmVpbmcgZGVjb2RlZC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYml0ZSBUaGUgbmV4dCBieXRlIHJlYWQgZnJvbSB0aGUgc3RyZWFtLlxuICAgICAqIEByZXR1cm4gez8obnVtYmVyfCFBcnJheS48bnVtYmVyPil9IFRoZSBuZXh0IGNvZGUgcG9pbnQocylcbiAgICAgKiAgICAgZGVjb2RlZCwgb3IgbnVsbCBpZiBub3QgZW5vdWdoIGRhdGEgZXhpc3RzIGluIHRoZSBpbnB1dFxuICAgICAqICAgICBzdHJlYW0gdG8gZGVjb2RlIGEgY29tcGxldGUgY29kZSBwb2ludC5cbiAgICAgKi9cbiAgICB0aGlzLmhhbmRsZXIgPSBmdW5jdGlvbihzdHJlYW0sIGJpdGUpIHtcbiAgICAgIC8vIDEuIElmIGJ5dGUgaXMgZW5kLW9mLXN0cmVhbSBhbmQgQmlnNSBsZWFkIGlzIG5vdCAweDAwLCBzZXRcbiAgICAgIC8vIEJpZzUgbGVhZCB0byAweDAwIGFuZCByZXR1cm4gZXJyb3IuXG4gICAgICBpZiAoYml0ZSA9PT0gZW5kX29mX3N0cmVhbSAmJiBCaWc1X2xlYWQgIT09IDB4MDApIHtcbiAgICAgICAgQmlnNV9sZWFkID0gMHgwMDtcbiAgICAgICAgcmV0dXJuIGRlY29kZXJFcnJvcihmYXRhbCk7XG4gICAgICB9XG5cbiAgICAgIC8vIDIuIElmIGJ5dGUgaXMgZW5kLW9mLXN0cmVhbSBhbmQgQmlnNSBsZWFkIGlzIDB4MDAsIHJldHVyblxuICAgICAgLy8gZmluaXNoZWQuXG4gICAgICBpZiAoYml0ZSA9PT0gZW5kX29mX3N0cmVhbSAmJiBCaWc1X2xlYWQgPT09IDB4MDApXG4gICAgICAgIHJldHVybiBmaW5pc2hlZDtcblxuICAgICAgLy8gMy4gSWYgQmlnNSBsZWFkIGlzIG5vdCAweDAwLCBsZXQgbGVhZCBiZSBCaWc1IGxlYWQsIGxldFxuICAgICAgLy8gcG9pbnRlciBiZSBudWxsLCBzZXQgQmlnNSBsZWFkIHRvIDB4MDAsIGFuZCB0aGVuIHJ1biB0aGVzZVxuICAgICAgLy8gc3Vic3RlcHM6XG4gICAgICBpZiAoQmlnNV9sZWFkICE9PSAweDAwKSB7XG4gICAgICAgIHZhciBsZWFkID0gQmlnNV9sZWFkO1xuICAgICAgICB2YXIgcG9pbnRlciA9IG51bGw7XG4gICAgICAgIEJpZzVfbGVhZCA9IDB4MDA7XG5cbiAgICAgICAgLy8gMS4gTGV0IG9mZnNldCBiZSAweDQwIGlmIGJ5dGUgaXMgbGVzcyB0aGFuIDB4N0YgYW5kIDB4NjJcbiAgICAgICAgLy8gb3RoZXJ3aXNlLlxuICAgICAgICB2YXIgb2Zmc2V0ID0gYml0ZSA8IDB4N0YgPyAweDQwIDogMHg2MjtcblxuICAgICAgICAvLyAyLiBJZiBieXRlIGlzIGluIHRoZSByYW5nZSAweDQwIHRvIDB4N0UsIGluY2x1c2l2ZSwgb3IgMHhBMVxuICAgICAgICAvLyB0byAweEZFLCBpbmNsdXNpdmUsIHNldCBwb2ludGVyIHRvIChsZWFkIOKIkiAweDgxKSDDlyAxNTcgK1xuICAgICAgICAvLyAoYnl0ZSDiiJIgb2Zmc2V0KS5cbiAgICAgICAgaWYgKGluUmFuZ2UoYml0ZSwgMHg0MCwgMHg3RSkgfHwgaW5SYW5nZShiaXRlLCAweEExLCAweEZFKSlcbiAgICAgICAgICBwb2ludGVyID0gKGxlYWQgLSAweDgxKSAqIDE1NyArIChiaXRlIC0gb2Zmc2V0KTtcblxuICAgICAgICAvLyAzLiBJZiB0aGVyZSBpcyBhIHJvdyBpbiB0aGUgdGFibGUgYmVsb3cgd2hvc2UgZmlyc3QgY29sdW1uXG4gICAgICAgIC8vIGlzIHBvaW50ZXIsIHJldHVybiB0aGUgdHdvIGNvZGUgcG9pbnRzIGxpc3RlZCBpbiBpdHMgc2Vjb25kXG4gICAgICAgIC8vIGNvbHVtblxuICAgICAgICAvLyBQb2ludGVyIHwgQ29kZSBwb2ludHNcbiAgICAgICAgLy8gLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgLy8gMTEzMyAgICB8IFUrMDBDQSBVKzAzMDRcbiAgICAgICAgLy8gMTEzNSAgICB8IFUrMDBDQSBVKzAzMENcbiAgICAgICAgLy8gMTE2NCAgICB8IFUrMDBFQSBVKzAzMDRcbiAgICAgICAgLy8gMTE2NiAgICB8IFUrMDBFQSBVKzAzMENcbiAgICAgICAgc3dpdGNoIChwb2ludGVyKSB7XG4gICAgICAgICAgY2FzZSAxMTMzOiByZXR1cm4gWzB4MDBDQSwgMHgwMzA0XTtcbiAgICAgICAgICBjYXNlIDExMzU6IHJldHVybiBbMHgwMENBLCAweDAzMENdO1xuICAgICAgICAgIGNhc2UgMTE2NDogcmV0dXJuIFsweDAwRUEsIDB4MDMwNF07XG4gICAgICAgICAgY2FzZSAxMTY2OiByZXR1cm4gWzB4MDBFQSwgMHgwMzBDXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDQuIExldCBjb2RlIHBvaW50IGJlIG51bGwgaWYgcG9pbnRlciBpcyBudWxsIGFuZCB0aGUgaW5kZXhcbiAgICAgICAgLy8gY29kZSBwb2ludCBmb3IgcG9pbnRlciBpbiBpbmRleCBCaWc1IG90aGVyd2lzZS5cbiAgICAgICAgdmFyIGNvZGVfcG9pbnQgPSAocG9pbnRlciA9PT0gbnVsbCkgPyBudWxsIDpcbiAgICAgICAgICAgIGluZGV4Q29kZVBvaW50Rm9yKHBvaW50ZXIsIGluZGV4KCdiaWc1JykpO1xuXG4gICAgICAgIC8vIDUuIElmIGNvZGUgcG9pbnQgaXMgbnVsbCBhbmQgYnl0ZSBpcyBhbiBBU0NJSSBieXRlLCBwcmVwZW5kXG4gICAgICAgIC8vIGJ5dGUgdG8gc3RyZWFtLlxuICAgICAgICBpZiAoY29kZV9wb2ludCA9PT0gbnVsbCAmJiBpc0FTQ0lJQnl0ZShiaXRlKSlcbiAgICAgICAgICBzdHJlYW0ucHJlcGVuZChiaXRlKTtcblxuICAgICAgICAvLyA2LiBJZiBjb2RlIHBvaW50IGlzIG51bGwsIHJldHVybiBlcnJvci5cbiAgICAgICAgaWYgKGNvZGVfcG9pbnQgPT09IG51bGwpXG4gICAgICAgICAgcmV0dXJuIGRlY29kZXJFcnJvcihmYXRhbCk7XG5cbiAgICAgICAgLy8gNy4gUmV0dXJuIGEgY29kZSBwb2ludCB3aG9zZSB2YWx1ZSBpcyBjb2RlIHBvaW50LlxuICAgICAgICByZXR1cm4gY29kZV9wb2ludDtcbiAgICAgIH1cblxuICAgICAgLy8gNC4gSWYgYnl0ZSBpcyBhbiBBU0NJSSBieXRlLCByZXR1cm4gYSBjb2RlIHBvaW50IHdob3NlIHZhbHVlXG4gICAgICAvLyBpcyBieXRlLlxuICAgICAgaWYgKGlzQVNDSUlCeXRlKGJpdGUpKVxuICAgICAgICByZXR1cm4gYml0ZTtcblxuICAgICAgLy8gNS4gSWYgYnl0ZSBpcyBpbiB0aGUgcmFuZ2UgMHg4MSB0byAweEZFLCBpbmNsdXNpdmUsIHNldCBCaWc1XG4gICAgICAvLyBsZWFkIHRvIGJ5dGUgYW5kIHJldHVybiBjb250aW51ZS5cbiAgICAgIGlmIChpblJhbmdlKGJpdGUsIDB4ODEsIDB4RkUpKSB7XG4gICAgICAgIEJpZzVfbGVhZCA9IGJpdGU7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyA2LiBSZXR1cm4gZXJyb3IuXG4gICAgICByZXR1cm4gZGVjb2RlckVycm9yKGZhdGFsKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gMTIuMS4yIEJpZzUgZW5jb2RlclxuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBpbXBsZW1lbnRzIHtFbmNvZGVyfVxuICAgKiBAcGFyYW0ge3tmYXRhbDogYm9vbGVhbn19IG9wdGlvbnNcbiAgICovXG4gIGZ1bmN0aW9uIEJpZzVFbmNvZGVyKG9wdGlvbnMpIHtcbiAgICB2YXIgZmF0YWwgPSBvcHRpb25zLmZhdGFsO1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U3RyZWFtfSBzdHJlYW0gSW5wdXQgc3RyZWFtLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb2RlX3BvaW50IE5leHQgY29kZSBwb2ludCByZWFkIGZyb20gdGhlIHN0cmVhbS5cbiAgICAgKiBAcmV0dXJuIHsobnVtYmVyfCFBcnJheS48bnVtYmVyPil9IEJ5dGUocykgdG8gZW1pdC5cbiAgICAgKi9cbiAgICB0aGlzLmhhbmRsZXIgPSBmdW5jdGlvbihzdHJlYW0sIGNvZGVfcG9pbnQpIHtcbiAgICAgIC8vIDEuIElmIGNvZGUgcG9pbnQgaXMgZW5kLW9mLXN0cmVhbSwgcmV0dXJuIGZpbmlzaGVkLlxuICAgICAgaWYgKGNvZGVfcG9pbnQgPT09IGVuZF9vZl9zdHJlYW0pXG4gICAgICAgIHJldHVybiBmaW5pc2hlZDtcblxuICAgICAgLy8gMi4gSWYgY29kZSBwb2ludCBpcyBhbiBBU0NJSSBjb2RlIHBvaW50LCByZXR1cm4gYSBieXRlIHdob3NlXG4gICAgICAvLyB2YWx1ZSBpcyBjb2RlIHBvaW50LlxuICAgICAgaWYgKGlzQVNDSUlDb2RlUG9pbnQoY29kZV9wb2ludCkpXG4gICAgICAgIHJldHVybiBjb2RlX3BvaW50O1xuXG4gICAgICAvLyAzLiBMZXQgcG9pbnRlciBiZSB0aGUgaW5kZXggQmlnNSBwb2ludGVyIGZvciBjb2RlIHBvaW50LlxuICAgICAgdmFyIHBvaW50ZXIgPSBpbmRleEJpZzVQb2ludGVyRm9yKGNvZGVfcG9pbnQpO1xuXG4gICAgICAvLyA0LiBJZiBwb2ludGVyIGlzIG51bGwsIHJldHVybiBlcnJvciB3aXRoIGNvZGUgcG9pbnQuXG4gICAgICBpZiAocG9pbnRlciA9PT0gbnVsbClcbiAgICAgICAgcmV0dXJuIGVuY29kZXJFcnJvcihjb2RlX3BvaW50KTtcblxuICAgICAgLy8gNS4gTGV0IGxlYWQgYmUgZmxvb3IocG9pbnRlciAvIDE1NykgKyAweDgxLlxuICAgICAgdmFyIGxlYWQgPSBmbG9vcihwb2ludGVyIC8gMTU3KSArIDB4ODE7XG5cbiAgICAgIC8vIDYuIElmIGxlYWQgaXMgbGVzcyB0aGFuIDB4QTEsIHJldHVybiBlcnJvciB3aXRoIGNvZGUgcG9pbnQuXG4gICAgICBpZiAobGVhZCA8IDB4QTEpXG4gICAgICAgIHJldHVybiBlbmNvZGVyRXJyb3IoY29kZV9wb2ludCk7XG5cbiAgICAgIC8vIDcuIExldCB0cmFpbCBiZSBwb2ludGVyICUgMTU3LlxuICAgICAgdmFyIHRyYWlsID0gcG9pbnRlciAlIDE1NztcblxuICAgICAgLy8gOC4gTGV0IG9mZnNldCBiZSAweDQwIGlmIHRyYWlsIGlzIGxlc3MgdGhhbiAweDNGIGFuZCAweDYyXG4gICAgICAvLyBvdGhlcndpc2UuXG4gICAgICB2YXIgb2Zmc2V0ID0gdHJhaWwgPCAweDNGID8gMHg0MCA6IDB4NjI7XG5cbiAgICAgIC8vIFJldHVybiB0d28gYnl0ZXMgd2hvc2UgdmFsdWVzIGFyZSBsZWFkIGFuZCB0cmFpbCArIG9mZnNldC5cbiAgICAgIHJldHVybiBbbGVhZCwgdHJhaWwgKyBvZmZzZXRdO1xuICAgIH07XG4gIH1cblxuICAvKiogQHBhcmFtIHt7ZmF0YWw6IGJvb2xlYW59fSBvcHRpb25zICovXG4gIGVuY29kZXJzWydCaWc1J10gPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBCaWc1RW5jb2RlcihvcHRpb25zKTtcbiAgfTtcbiAgLyoqIEBwYXJhbSB7e2ZhdGFsOiBib29sZWFufX0gb3B0aW9ucyAqL1xuICBkZWNvZGVyc1snQmlnNSddID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgQmlnNURlY29kZXIob3B0aW9ucyk7XG4gIH07XG5cblxuICAvL1xuICAvLyAxMy4gTGVnYWN5IG11bHRpLWJ5dGUgSmFwYW5lc2UgZW5jb2RpbmdzXG4gIC8vXG5cbiAgLy8gMTMuMSBldWMtanBcblxuICAvLyAxMy4xLjEgZXVjLWpwIGRlY29kZXJcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAaW1wbGVtZW50cyB7RGVjb2Rlcn1cbiAgICogQHBhcmFtIHt7ZmF0YWw6IGJvb2xlYW59fSBvcHRpb25zXG4gICAqL1xuICBmdW5jdGlvbiBFVUNKUERlY29kZXIob3B0aW9ucykge1xuICAgIHZhciBmYXRhbCA9IG9wdGlvbnMuZmF0YWw7XG5cbiAgICAvLyBldWMtanAncyBkZWNvZGVyIGhhcyBhbiBhc3NvY2lhdGVkIGV1Yy1qcCBqaXMwMjEyIGZsYWdcbiAgICAvLyAoaW5pdGlhbGx5IHVuc2V0KSBhbmQgZXVjLWpwIGxlYWQgKGluaXRpYWxseSAweDAwKS5cbiAgICB2YXIgLyoqIEB0eXBlIHtib29sZWFufSAqLyBldWNqcF9qaXMwMjEyX2ZsYWcgPSBmYWxzZSxcbiAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ9ICovIGV1Y2pwX2xlYWQgPSAweDAwO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbSBUaGUgc3RyZWFtIG9mIGJ5dGVzIGJlaW5nIGRlY29kZWQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGJpdGUgVGhlIG5leHQgYnl0ZSByZWFkIGZyb20gdGhlIHN0cmVhbS5cbiAgICAgKiBAcmV0dXJuIHs/KG51bWJlcnwhQXJyYXkuPG51bWJlcj4pfSBUaGUgbmV4dCBjb2RlIHBvaW50KHMpXG4gICAgICogICAgIGRlY29kZWQsIG9yIG51bGwgaWYgbm90IGVub3VnaCBkYXRhIGV4aXN0cyBpbiB0aGUgaW5wdXRcbiAgICAgKiAgICAgc3RyZWFtIHRvIGRlY29kZSBhIGNvbXBsZXRlIGNvZGUgcG9pbnQuXG4gICAgICovXG4gICAgdGhpcy5oYW5kbGVyID0gZnVuY3Rpb24oc3RyZWFtLCBiaXRlKSB7XG4gICAgICAvLyAxLiBJZiBieXRlIGlzIGVuZC1vZi1zdHJlYW0gYW5kIGV1Yy1qcCBsZWFkIGlzIG5vdCAweDAwLCBzZXRcbiAgICAgIC8vIGV1Yy1qcCBsZWFkIHRvIDB4MDAsIGFuZCByZXR1cm4gZXJyb3IuXG4gICAgICBpZiAoYml0ZSA9PT0gZW5kX29mX3N0cmVhbSAmJiBldWNqcF9sZWFkICE9PSAweDAwKSB7XG4gICAgICAgIGV1Y2pwX2xlYWQgPSAweDAwO1xuICAgICAgICByZXR1cm4gZGVjb2RlckVycm9yKGZhdGFsKTtcbiAgICAgIH1cblxuICAgICAgLy8gMi4gSWYgYnl0ZSBpcyBlbmQtb2Ytc3RyZWFtIGFuZCBldWMtanAgbGVhZCBpcyAweDAwLCByZXR1cm5cbiAgICAgIC8vIGZpbmlzaGVkLlxuICAgICAgaWYgKGJpdGUgPT09IGVuZF9vZl9zdHJlYW0gJiYgZXVjanBfbGVhZCA9PT0gMHgwMClcbiAgICAgICAgcmV0dXJuIGZpbmlzaGVkO1xuXG4gICAgICAvLyAzLiBJZiBldWMtanAgbGVhZCBpcyAweDhFIGFuZCBieXRlIGlzIGluIHRoZSByYW5nZSAweEExIHRvXG4gICAgICAvLyAweERGLCBpbmNsdXNpdmUsIHNldCBldWMtanAgbGVhZCB0byAweDAwIGFuZCByZXR1cm4gYSBjb2RlXG4gICAgICAvLyBwb2ludCB3aG9zZSB2YWx1ZSBpcyAweEZGNjEg4oiSIDB4QTEgKyBieXRlLlxuICAgICAgaWYgKGV1Y2pwX2xlYWQgPT09IDB4OEUgJiYgaW5SYW5nZShiaXRlLCAweEExLCAweERGKSkge1xuICAgICAgICBldWNqcF9sZWFkID0gMHgwMDtcbiAgICAgICAgcmV0dXJuIDB4RkY2MSAtIDB4QTEgKyBiaXRlO1xuICAgICAgfVxuXG4gICAgICAvLyA0LiBJZiBldWMtanAgbGVhZCBpcyAweDhGIGFuZCBieXRlIGlzIGluIHRoZSByYW5nZSAweEExIHRvXG4gICAgICAvLyAweEZFLCBpbmNsdXNpdmUsIHNldCB0aGUgZXVjLWpwIGppczAyMTIgZmxhZywgc2V0IGV1Yy1qcCBsZWFkXG4gICAgICAvLyB0byBieXRlLCBhbmQgcmV0dXJuIGNvbnRpbnVlLlxuICAgICAgaWYgKGV1Y2pwX2xlYWQgPT09IDB4OEYgJiYgaW5SYW5nZShiaXRlLCAweEExLCAweEZFKSkge1xuICAgICAgICBldWNqcF9qaXMwMjEyX2ZsYWcgPSB0cnVlO1xuICAgICAgICBldWNqcF9sZWFkID0gYml0ZTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIC8vIDUuIElmIGV1Yy1qcCBsZWFkIGlzIG5vdCAweDAwLCBsZXQgbGVhZCBiZSBldWMtanAgbGVhZCwgc2V0XG4gICAgICAvLyBldWMtanAgbGVhZCB0byAweDAwLCBhbmQgcnVuIHRoZXNlIHN1YnN0ZXBzOlxuICAgICAgaWYgKGV1Y2pwX2xlYWQgIT09IDB4MDApIHtcbiAgICAgICAgdmFyIGxlYWQgPSBldWNqcF9sZWFkO1xuICAgICAgICBldWNqcF9sZWFkID0gMHgwMDtcblxuICAgICAgICAvLyAxLiBMZXQgY29kZSBwb2ludCBiZSBudWxsLlxuICAgICAgICB2YXIgY29kZV9wb2ludCA9IG51bGw7XG5cbiAgICAgICAgLy8gMi4gSWYgbGVhZCBhbmQgYnl0ZSBhcmUgYm90aCBpbiB0aGUgcmFuZ2UgMHhBMSB0byAweEZFLFxuICAgICAgICAvLyBpbmNsdXNpdmUsIHNldCBjb2RlIHBvaW50IHRvIHRoZSBpbmRleCBjb2RlIHBvaW50IGZvciAobGVhZFxuICAgICAgICAvLyDiiJIgMHhBMSkgw5cgOTQgKyBieXRlIOKIkiAweEExIGluIGluZGV4IGppczAyMDggaWYgdGhlIGV1Yy1qcFxuICAgICAgICAvLyBqaXMwMjEyIGZsYWcgaXMgdW5zZXQgYW5kIGluIGluZGV4IGppczAyMTIgb3RoZXJ3aXNlLlxuICAgICAgICBpZiAoaW5SYW5nZShsZWFkLCAweEExLCAweEZFKSAmJiBpblJhbmdlKGJpdGUsIDB4QTEsIDB4RkUpKSB7XG4gICAgICAgICAgY29kZV9wb2ludCA9IGluZGV4Q29kZVBvaW50Rm9yKFxuICAgICAgICAgICAgKGxlYWQgLSAweEExKSAqIDk0ICsgKGJpdGUgLSAweEExKSxcbiAgICAgICAgICAgIGluZGV4KCFldWNqcF9qaXMwMjEyX2ZsYWcgPyAnamlzMDIwOCcgOiAnamlzMDIxMicpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDMuIFVuc2V0IHRoZSBldWMtanAgamlzMDIxMiBmbGFnLlxuICAgICAgICBldWNqcF9qaXMwMjEyX2ZsYWcgPSBmYWxzZTtcblxuICAgICAgICAvLyA0LiBJZiBieXRlIGlzIG5vdCBpbiB0aGUgcmFuZ2UgMHhBMSB0byAweEZFLCBpbmNsdXNpdmUsXG4gICAgICAgIC8vIHByZXBlbmQgYnl0ZSB0byBzdHJlYW0uXG4gICAgICAgIGlmICghaW5SYW5nZShiaXRlLCAweEExLCAweEZFKSlcbiAgICAgICAgICBzdHJlYW0ucHJlcGVuZChiaXRlKTtcblxuICAgICAgICAvLyA1LiBJZiBjb2RlIHBvaW50IGlzIG51bGwsIHJldHVybiBlcnJvci5cbiAgICAgICAgaWYgKGNvZGVfcG9pbnQgPT09IG51bGwpXG4gICAgICAgICAgcmV0dXJuIGRlY29kZXJFcnJvcihmYXRhbCk7XG5cbiAgICAgICAgLy8gNi4gUmV0dXJuIGEgY29kZSBwb2ludCB3aG9zZSB2YWx1ZSBpcyBjb2RlIHBvaW50LlxuICAgICAgICByZXR1cm4gY29kZV9wb2ludDtcbiAgICAgIH1cblxuICAgICAgLy8gNi4gSWYgYnl0ZSBpcyBhbiBBU0NJSSBieXRlLCByZXR1cm4gYSBjb2RlIHBvaW50IHdob3NlIHZhbHVlXG4gICAgICAvLyBpcyBieXRlLlxuICAgICAgaWYgKGlzQVNDSUlCeXRlKGJpdGUpKVxuICAgICAgICByZXR1cm4gYml0ZTtcblxuICAgICAgLy8gNy4gSWYgYnl0ZSBpcyAweDhFLCAweDhGLCBvciBpbiB0aGUgcmFuZ2UgMHhBMSB0byAweEZFLFxuICAgICAgLy8gaW5jbHVzaXZlLCBzZXQgZXVjLWpwIGxlYWQgdG8gYnl0ZSBhbmQgcmV0dXJuIGNvbnRpbnVlLlxuICAgICAgaWYgKGJpdGUgPT09IDB4OEUgfHwgYml0ZSA9PT0gMHg4RiB8fCBpblJhbmdlKGJpdGUsIDB4QTEsIDB4RkUpKSB7XG4gICAgICAgIGV1Y2pwX2xlYWQgPSBiaXRlO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gOC4gUmV0dXJuIGVycm9yLlxuICAgICAgcmV0dXJuIGRlY29kZXJFcnJvcihmYXRhbCk7XG4gICAgfTtcbiAgfVxuXG4gIC8vIDEzLjEuMiBldWMtanAgZW5jb2RlclxuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBpbXBsZW1lbnRzIHtFbmNvZGVyfVxuICAgKiBAcGFyYW0ge3tmYXRhbDogYm9vbGVhbn19IG9wdGlvbnNcbiAgICovXG4gIGZ1bmN0aW9uIEVVQ0pQRW5jb2RlcihvcHRpb25zKSB7XG4gICAgdmFyIGZhdGFsID0gb3B0aW9ucy5mYXRhbDtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtIElucHV0IHN0cmVhbS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY29kZV9wb2ludCBOZXh0IGNvZGUgcG9pbnQgcmVhZCBmcm9tIHRoZSBzdHJlYW0uXG4gICAgICogQHJldHVybiB7KG51bWJlcnwhQXJyYXkuPG51bWJlcj4pfSBCeXRlKHMpIHRvIGVtaXQuXG4gICAgICovXG4gICAgdGhpcy5oYW5kbGVyID0gZnVuY3Rpb24oc3RyZWFtLCBjb2RlX3BvaW50KSB7XG4gICAgICAvLyAxLiBJZiBjb2RlIHBvaW50IGlzIGVuZC1vZi1zdHJlYW0sIHJldHVybiBmaW5pc2hlZC5cbiAgICAgIGlmIChjb2RlX3BvaW50ID09PSBlbmRfb2Zfc3RyZWFtKVxuICAgICAgICByZXR1cm4gZmluaXNoZWQ7XG5cbiAgICAgIC8vIDIuIElmIGNvZGUgcG9pbnQgaXMgYW4gQVNDSUkgY29kZSBwb2ludCwgcmV0dXJuIGEgYnl0ZSB3aG9zZVxuICAgICAgLy8gdmFsdWUgaXMgY29kZSBwb2ludC5cbiAgICAgIGlmIChpc0FTQ0lJQ29kZVBvaW50KGNvZGVfcG9pbnQpKVxuICAgICAgICByZXR1cm4gY29kZV9wb2ludDtcblxuICAgICAgLy8gMy4gSWYgY29kZSBwb2ludCBpcyBVKzAwQTUsIHJldHVybiBieXRlIDB4NUMuXG4gICAgICBpZiAoY29kZV9wb2ludCA9PT0gMHgwMEE1KVxuICAgICAgICByZXR1cm4gMHg1QztcblxuICAgICAgLy8gNC4gSWYgY29kZSBwb2ludCBpcyBVKzIwM0UsIHJldHVybiBieXRlIDB4N0UuXG4gICAgICBpZiAoY29kZV9wb2ludCA9PT0gMHgyMDNFKVxuICAgICAgICByZXR1cm4gMHg3RTtcblxuICAgICAgLy8gNS4gSWYgY29kZSBwb2ludCBpcyBpbiB0aGUgcmFuZ2UgVStGRjYxIHRvIFUrRkY5RiwgaW5jbHVzaXZlLFxuICAgICAgLy8gcmV0dXJuIHR3byBieXRlcyB3aG9zZSB2YWx1ZXMgYXJlIDB4OEUgYW5kIGNvZGUgcG9pbnQg4oiSXG4gICAgICAvLyAweEZGNjEgKyAweEExLlxuICAgICAgaWYgKGluUmFuZ2UoY29kZV9wb2ludCwgMHhGRjYxLCAweEZGOUYpKVxuICAgICAgICByZXR1cm4gWzB4OEUsIGNvZGVfcG9pbnQgLSAweEZGNjEgKyAweEExXTtcblxuICAgICAgLy8gNi4gSWYgY29kZSBwb2ludCBpcyBVKzIyMTIsIHNldCBpdCB0byBVK0ZGMEQuXG4gICAgICBpZiAoY29kZV9wb2ludCA9PT0gMHgyMjEyKVxuICAgICAgICBjb2RlX3BvaW50ID0gMHhGRjBEO1xuXG4gICAgICAvLyA3LiBMZXQgcG9pbnRlciBiZSB0aGUgaW5kZXggcG9pbnRlciBmb3IgY29kZSBwb2ludCBpbiBpbmRleFxuICAgICAgLy8gamlzMDIwOC5cbiAgICAgIHZhciBwb2ludGVyID0gaW5kZXhQb2ludGVyRm9yKGNvZGVfcG9pbnQsIGluZGV4KCdqaXMwMjA4JykpO1xuXG4gICAgICAvLyA4LiBJZiBwb2ludGVyIGlzIG51bGwsIHJldHVybiBlcnJvciB3aXRoIGNvZGUgcG9pbnQuXG4gICAgICBpZiAocG9pbnRlciA9PT0gbnVsbClcbiAgICAgICAgcmV0dXJuIGVuY29kZXJFcnJvcihjb2RlX3BvaW50KTtcblxuICAgICAgLy8gOS4gTGV0IGxlYWQgYmUgZmxvb3IocG9pbnRlciAvIDk0KSArIDB4QTEuXG4gICAgICB2YXIgbGVhZCA9IGZsb29yKHBvaW50ZXIgLyA5NCkgKyAweEExO1xuXG4gICAgICAvLyAxMC4gTGV0IHRyYWlsIGJlIHBvaW50ZXIgJSA5NCArIDB4QTEuXG4gICAgICB2YXIgdHJhaWwgPSBwb2ludGVyICUgOTQgKyAweEExO1xuXG4gICAgICAvLyAxMS4gUmV0dXJuIHR3byBieXRlcyB3aG9zZSB2YWx1ZXMgYXJlIGxlYWQgYW5kIHRyYWlsLlxuICAgICAgcmV0dXJuIFtsZWFkLCB0cmFpbF07XG4gICAgfTtcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge3tmYXRhbDogYm9vbGVhbn19IG9wdGlvbnMgKi9cbiAgZW5jb2RlcnNbJ0VVQy1KUCddID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgRVVDSlBFbmNvZGVyKG9wdGlvbnMpO1xuICB9O1xuICAvKiogQHBhcmFtIHt7ZmF0YWw6IGJvb2xlYW59fSBvcHRpb25zICovXG4gIGRlY29kZXJzWydFVUMtSlAnXSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IEVVQ0pQRGVjb2RlcihvcHRpb25zKTtcbiAgfTtcblxuICAvLyAxMy4yIGlzby0yMDIyLWpwXG5cbiAgLy8gMTMuMi4xIGlzby0yMDIyLWpwIGRlY29kZXJcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAaW1wbGVtZW50cyB7RGVjb2Rlcn1cbiAgICogQHBhcmFtIHt7ZmF0YWw6IGJvb2xlYW59fSBvcHRpb25zXG4gICAqL1xuICBmdW5jdGlvbiBJU08yMDIySlBEZWNvZGVyKG9wdGlvbnMpIHtcbiAgICB2YXIgZmF0YWwgPSBvcHRpb25zLmZhdGFsO1xuICAgIC8qKiBAZW51bSAqL1xuICAgIHZhciBzdGF0ZXMgPSB7XG4gICAgICBBU0NJSTogMCxcbiAgICAgIFJvbWFuOiAxLFxuICAgICAgS2F0YWthbmE6IDIsXG4gICAgICBMZWFkQnl0ZTogMyxcbiAgICAgIFRyYWlsQnl0ZTogNCxcbiAgICAgIEVzY2FwZVN0YXJ0OiA1LFxuICAgICAgRXNjYXBlOiA2XG4gICAgfTtcbiAgICAvLyBpc28tMjAyMi1qcCdzIGRlY29kZXIgaGFzIGFuIGFzc29jaWF0ZWQgaXNvLTIwMjItanAgZGVjb2RlclxuICAgIC8vIHN0YXRlIChpbml0aWFsbHkgQVNDSUkpLCBpc28tMjAyMi1qcCBkZWNvZGVyIG91dHB1dCBzdGF0ZVxuICAgIC8vIChpbml0aWFsbHkgQVNDSUkpLCBpc28tMjAyMi1qcCBsZWFkIChpbml0aWFsbHkgMHgwMCksIGFuZFxuICAgIC8vIGlzby0yMDIyLWpwIG91dHB1dCBmbGFnIChpbml0aWFsbHkgdW5zZXQpLlxuICAgIHZhciAvKiogQHR5cGUge251bWJlcn0gKi8gaXNvMjAyMmpwX2RlY29kZXJfc3RhdGUgPSBzdGF0ZXMuQVNDSUksXG4gICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqLyBpc28yMDIyanBfZGVjb2Rlcl9vdXRwdXRfc3RhdGUgPSBzdGF0ZXMuQVNDSUksXG4gICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqLyBpc28yMDIyanBfbGVhZCA9IDB4MDAsXG4gICAgICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi8gaXNvMjAyMmpwX291dHB1dF9mbGFnID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbSBUaGUgc3RyZWFtIG9mIGJ5dGVzIGJlaW5nIGRlY29kZWQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGJpdGUgVGhlIG5leHQgYnl0ZSByZWFkIGZyb20gdGhlIHN0cmVhbS5cbiAgICAgKiBAcmV0dXJuIHs/KG51bWJlcnwhQXJyYXkuPG51bWJlcj4pfSBUaGUgbmV4dCBjb2RlIHBvaW50KHMpXG4gICAgICogICAgIGRlY29kZWQsIG9yIG51bGwgaWYgbm90IGVub3VnaCBkYXRhIGV4aXN0cyBpbiB0aGUgaW5wdXRcbiAgICAgKiAgICAgc3RyZWFtIHRvIGRlY29kZSBhIGNvbXBsZXRlIGNvZGUgcG9pbnQuXG4gICAgICovXG4gICAgdGhpcy5oYW5kbGVyID0gZnVuY3Rpb24oc3RyZWFtLCBiaXRlKSB7XG4gICAgICAvLyBzd2l0Y2hpbmcgb24gaXNvLTIwMjItanAgZGVjb2RlciBzdGF0ZTpcbiAgICAgIHN3aXRjaCAoaXNvMjAyMmpwX2RlY29kZXJfc3RhdGUpIHtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICBjYXNlIHN0YXRlcy5BU0NJSTpcbiAgICAgICAgLy8gQVNDSUlcbiAgICAgICAgLy8gQmFzZWQgb24gYnl0ZTpcblxuICAgICAgICAvLyAweDFCXG4gICAgICAgIGlmIChiaXRlID09PSAweDFCKSB7XG4gICAgICAgICAgLy8gU2V0IGlzby0yMDIyLWpwIGRlY29kZXIgc3RhdGUgdG8gZXNjYXBlIHN0YXJ0IGFuZCByZXR1cm5cbiAgICAgICAgICAvLyBjb250aW51ZS5cbiAgICAgICAgICBpc28yMDIyanBfZGVjb2Rlcl9zdGF0ZSA9IHN0YXRlcy5Fc2NhcGVTdGFydDtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDB4MDAgdG8gMHg3RiwgZXhjbHVkaW5nIDB4MEUsIDB4MEYsIGFuZCAweDFCXG4gICAgICAgIGlmIChpblJhbmdlKGJpdGUsIDB4MDAsIDB4N0YpICYmIGJpdGUgIT09IDB4MEVcbiAgICAgICAgICAgICYmIGJpdGUgIT09IDB4MEYgJiYgYml0ZSAhPT0gMHgxQikge1xuICAgICAgICAgIC8vIFVuc2V0IHRoZSBpc28tMjAyMi1qcCBvdXRwdXQgZmxhZyBhbmQgcmV0dXJuIGEgY29kZSBwb2ludFxuICAgICAgICAgIC8vIHdob3NlIHZhbHVlIGlzIGJ5dGUuXG4gICAgICAgICAgaXNvMjAyMmpwX291dHB1dF9mbGFnID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIGJpdGU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbmQtb2Ytc3RyZWFtXG4gICAgICAgIGlmIChiaXRlID09PSBlbmRfb2Zfc3RyZWFtKSB7XG4gICAgICAgICAgLy8gUmV0dXJuIGZpbmlzaGVkLlxuICAgICAgICAgIHJldHVybiBmaW5pc2hlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE90aGVyd2lzZVxuICAgICAgICAvLyBVbnNldCB0aGUgaXNvLTIwMjItanAgb3V0cHV0IGZsYWcgYW5kIHJldHVybiBlcnJvci5cbiAgICAgICAgaXNvMjAyMmpwX291dHB1dF9mbGFnID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBkZWNvZGVyRXJyb3IoZmF0YWwpO1xuXG4gICAgICBjYXNlIHN0YXRlcy5Sb21hbjpcbiAgICAgICAgLy8gUm9tYW5cbiAgICAgICAgLy8gQmFzZWQgb24gYnl0ZTpcblxuICAgICAgICAvLyAweDFCXG4gICAgICAgIGlmIChiaXRlID09PSAweDFCKSB7XG4gICAgICAgICAgLy8gU2V0IGlzby0yMDIyLWpwIGRlY29kZXIgc3RhdGUgdG8gZXNjYXBlIHN0YXJ0IGFuZCByZXR1cm5cbiAgICAgICAgICAvLyBjb250aW51ZS5cbiAgICAgICAgICBpc28yMDIyanBfZGVjb2Rlcl9zdGF0ZSA9IHN0YXRlcy5Fc2NhcGVTdGFydDtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDB4NUNcbiAgICAgICAgaWYgKGJpdGUgPT09IDB4NUMpIHtcbiAgICAgICAgICAvLyBVbnNldCB0aGUgaXNvLTIwMjItanAgb3V0cHV0IGZsYWcgYW5kIHJldHVybiBjb2RlIHBvaW50XG4gICAgICAgICAgLy8gVSswMEE1LlxuICAgICAgICAgIGlzbzIwMjJqcF9vdXRwdXRfZmxhZyA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiAweDAwQTU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAweDdFXG4gICAgICAgIGlmIChiaXRlID09PSAweDdFKSB7XG4gICAgICAgICAgLy8gVW5zZXQgdGhlIGlzby0yMDIyLWpwIG91dHB1dCBmbGFnIGFuZCByZXR1cm4gY29kZSBwb2ludFxuICAgICAgICAgIC8vIFUrMjAzRS5cbiAgICAgICAgICBpc28yMDIyanBfb3V0cHV0X2ZsYWcgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gMHgyMDNFO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gMHgwMCB0byAweDdGLCBleGNsdWRpbmcgMHgwRSwgMHgwRiwgMHgxQiwgMHg1QywgYW5kIDB4N0VcbiAgICAgICAgaWYgKGluUmFuZ2UoYml0ZSwgMHgwMCwgMHg3RikgJiYgYml0ZSAhPT0gMHgwRSAmJiBiaXRlICE9PSAweDBGXG4gICAgICAgICAgICAmJiBiaXRlICE9PSAweDFCICYmIGJpdGUgIT09IDB4NUMgJiYgYml0ZSAhPT0gMHg3RSkge1xuICAgICAgICAgIC8vIFVuc2V0IHRoZSBpc28tMjAyMi1qcCBvdXRwdXQgZmxhZyBhbmQgcmV0dXJuIGEgY29kZSBwb2ludFxuICAgICAgICAgIC8vIHdob3NlIHZhbHVlIGlzIGJ5dGUuXG4gICAgICAgICAgaXNvMjAyMmpwX291dHB1dF9mbGFnID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIGJpdGU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbmQtb2Ytc3RyZWFtXG4gICAgICAgIGlmIChiaXRlID09PSBlbmRfb2Zfc3RyZWFtKSB7XG4gICAgICAgICAgLy8gUmV0dXJuIGZpbmlzaGVkLlxuICAgICAgICAgIHJldHVybiBmaW5pc2hlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE90aGVyd2lzZVxuICAgICAgICAvLyBVbnNldCB0aGUgaXNvLTIwMjItanAgb3V0cHV0IGZsYWcgYW5kIHJldHVybiBlcnJvci5cbiAgICAgICAgaXNvMjAyMmpwX291dHB1dF9mbGFnID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBkZWNvZGVyRXJyb3IoZmF0YWwpO1xuXG4gICAgICBjYXNlIHN0YXRlcy5LYXRha2FuYTpcbiAgICAgICAgLy8gS2F0YWthbmFcbiAgICAgICAgLy8gQmFzZWQgb24gYnl0ZTpcblxuICAgICAgICAvLyAweDFCXG4gICAgICAgIGlmIChiaXRlID09PSAweDFCKSB7XG4gICAgICAgICAgLy8gU2V0IGlzby0yMDIyLWpwIGRlY29kZXIgc3RhdGUgdG8gZXNjYXBlIHN0YXJ0IGFuZCByZXR1cm5cbiAgICAgICAgICAvLyBjb250aW51ZS5cbiAgICAgICAgICBpc28yMDIyanBfZGVjb2Rlcl9zdGF0ZSA9IHN0YXRlcy5Fc2NhcGVTdGFydDtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDB4MjEgdG8gMHg1RlxuICAgICAgICBpZiAoaW5SYW5nZShiaXRlLCAweDIxLCAweDVGKSkge1xuICAgICAgICAgIC8vIFVuc2V0IHRoZSBpc28tMjAyMi1qcCBvdXRwdXQgZmxhZyBhbmQgcmV0dXJuIGEgY29kZSBwb2ludFxuICAgICAgICAgIC8vIHdob3NlIHZhbHVlIGlzIDB4RkY2MSDiiJIgMHgyMSArIGJ5dGUuXG4gICAgICAgICAgaXNvMjAyMmpwX291dHB1dF9mbGFnID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIDB4RkY2MSAtIDB4MjEgKyBiaXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZW5kLW9mLXN0cmVhbVxuICAgICAgICBpZiAoYml0ZSA9PT0gZW5kX29mX3N0cmVhbSkge1xuICAgICAgICAgIC8vIFJldHVybiBmaW5pc2hlZC5cbiAgICAgICAgICByZXR1cm4gZmluaXNoZWQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBPdGhlcndpc2VcbiAgICAgICAgLy8gVW5zZXQgdGhlIGlzby0yMDIyLWpwIG91dHB1dCBmbGFnIGFuZCByZXR1cm4gZXJyb3IuXG4gICAgICAgIGlzbzIwMjJqcF9vdXRwdXRfZmxhZyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZGVjb2RlckVycm9yKGZhdGFsKTtcblxuICAgICAgY2FzZSBzdGF0ZXMuTGVhZEJ5dGU6XG4gICAgICAgIC8vIExlYWQgYnl0ZVxuICAgICAgICAvLyBCYXNlZCBvbiBieXRlOlxuXG4gICAgICAgIC8vIDB4MUJcbiAgICAgICAgaWYgKGJpdGUgPT09IDB4MUIpIHtcbiAgICAgICAgICAvLyBTZXQgaXNvLTIwMjItanAgZGVjb2RlciBzdGF0ZSB0byBlc2NhcGUgc3RhcnQgYW5kIHJldHVyblxuICAgICAgICAgIC8vIGNvbnRpbnVlLlxuICAgICAgICAgIGlzbzIwMjJqcF9kZWNvZGVyX3N0YXRlID0gc3RhdGVzLkVzY2FwZVN0YXJ0O1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gMHgyMSB0byAweDdFXG4gICAgICAgIGlmIChpblJhbmdlKGJpdGUsIDB4MjEsIDB4N0UpKSB7XG4gICAgICAgICAgLy8gVW5zZXQgdGhlIGlzby0yMDIyLWpwIG91dHB1dCBmbGFnLCBzZXQgaXNvLTIwMjItanAgbGVhZFxuICAgICAgICAgIC8vIHRvIGJ5dGUsIGlzby0yMDIyLWpwIGRlY29kZXIgc3RhdGUgdG8gdHJhaWwgYnl0ZSwgYW5kXG4gICAgICAgICAgLy8gcmV0dXJuIGNvbnRpbnVlLlxuICAgICAgICAgIGlzbzIwMjJqcF9vdXRwdXRfZmxhZyA9IGZhbHNlO1xuICAgICAgICAgIGlzbzIwMjJqcF9sZWFkID0gYml0ZTtcbiAgICAgICAgICBpc28yMDIyanBfZGVjb2Rlcl9zdGF0ZSA9IHN0YXRlcy5UcmFpbEJ5dGU7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbmQtb2Ytc3RyZWFtXG4gICAgICAgIGlmIChiaXRlID09PSBlbmRfb2Zfc3RyZWFtKSB7XG4gICAgICAgICAgLy8gUmV0dXJuIGZpbmlzaGVkLlxuICAgICAgICAgIHJldHVybiBmaW5pc2hlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE90aGVyd2lzZVxuICAgICAgICAvLyBVbnNldCB0aGUgaXNvLTIwMjItanAgb3V0cHV0IGZsYWcgYW5kIHJldHVybiBlcnJvci5cbiAgICAgICAgaXNvMjAyMmpwX291dHB1dF9mbGFnID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBkZWNvZGVyRXJyb3IoZmF0YWwpO1xuXG4gICAgICBjYXNlIHN0YXRlcy5UcmFpbEJ5dGU6XG4gICAgICAgIC8vIFRyYWlsIGJ5dGVcbiAgICAgICAgLy8gQmFzZWQgb24gYnl0ZTpcblxuICAgICAgICAvLyAweDFCXG4gICAgICAgIGlmIChiaXRlID09PSAweDFCKSB7XG4gICAgICAgICAgLy8gU2V0IGlzby0yMDIyLWpwIGRlY29kZXIgc3RhdGUgdG8gZXNjYXBlIHN0YXJ0IGFuZCByZXR1cm5cbiAgICAgICAgICAvLyBjb250aW51ZS5cbiAgICAgICAgICBpc28yMDIyanBfZGVjb2Rlcl9zdGF0ZSA9IHN0YXRlcy5Fc2NhcGVTdGFydDtcbiAgICAgICAgICByZXR1cm4gZGVjb2RlckVycm9yKGZhdGFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDB4MjEgdG8gMHg3RVxuICAgICAgICBpZiAoaW5SYW5nZShiaXRlLCAweDIxLCAweDdFKSkge1xuICAgICAgICAgIC8vIDEuIFNldCB0aGUgaXNvLTIwMjItanAgZGVjb2RlciBzdGF0ZSB0byBsZWFkIGJ5dGUuXG4gICAgICAgICAgaXNvMjAyMmpwX2RlY29kZXJfc3RhdGUgPSBzdGF0ZXMuTGVhZEJ5dGU7XG5cbiAgICAgICAgICAvLyAyLiBMZXQgcG9pbnRlciBiZSAoaXNvLTIwMjItanAgbGVhZCDiiJIgMHgyMSkgw5cgOTQgKyBieXRlIOKIkiAweDIxLlxuICAgICAgICAgIHZhciBwb2ludGVyID0gKGlzbzIwMjJqcF9sZWFkIC0gMHgyMSkgKiA5NCArIGJpdGUgLSAweDIxO1xuXG4gICAgICAgICAgLy8gMy4gTGV0IGNvZGUgcG9pbnQgYmUgdGhlIGluZGV4IGNvZGUgcG9pbnQgZm9yIHBvaW50ZXIgaW5cbiAgICAgICAgICAvLyBpbmRleCBqaXMwMjA4LlxuICAgICAgICAgIHZhciBjb2RlX3BvaW50ID0gaW5kZXhDb2RlUG9pbnRGb3IocG9pbnRlciwgaW5kZXgoJ2ppczAyMDgnKSk7XG5cbiAgICAgICAgICAvLyA0LiBJZiBjb2RlIHBvaW50IGlzIG51bGwsIHJldHVybiBlcnJvci5cbiAgICAgICAgICBpZiAoY29kZV9wb2ludCA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBkZWNvZGVyRXJyb3IoZmF0YWwpO1xuXG4gICAgICAgICAgLy8gNS4gUmV0dXJuIGEgY29kZSBwb2ludCB3aG9zZSB2YWx1ZSBpcyBjb2RlIHBvaW50LlxuICAgICAgICAgIHJldHVybiBjb2RlX3BvaW50O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZW5kLW9mLXN0cmVhbVxuICAgICAgICBpZiAoYml0ZSA9PT0gZW5kX29mX3N0cmVhbSkge1xuICAgICAgICAgIC8vIFNldCB0aGUgaXNvLTIwMjItanAgZGVjb2RlciBzdGF0ZSB0byBsZWFkIGJ5dGUsIHByZXBlbmRcbiAgICAgICAgICAvLyBieXRlIHRvIHN0cmVhbSwgYW5kIHJldHVybiBlcnJvci5cbiAgICAgICAgICBpc28yMDIyanBfZGVjb2Rlcl9zdGF0ZSA9IHN0YXRlcy5MZWFkQnl0ZTtcbiAgICAgICAgICBzdHJlYW0ucHJlcGVuZChiaXRlKTtcbiAgICAgICAgICByZXR1cm4gZGVjb2RlckVycm9yKGZhdGFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE90aGVyd2lzZVxuICAgICAgICAvLyBTZXQgaXNvLTIwMjItanAgZGVjb2RlciBzdGF0ZSB0byBsZWFkIGJ5dGUgYW5kIHJldHVyblxuICAgICAgICAvLyBlcnJvci5cbiAgICAgICAgaXNvMjAyMmpwX2RlY29kZXJfc3RhdGUgPSBzdGF0ZXMuTGVhZEJ5dGU7XG4gICAgICAgIHJldHVybiBkZWNvZGVyRXJyb3IoZmF0YWwpO1xuXG4gICAgICBjYXNlIHN0YXRlcy5Fc2NhcGVTdGFydDpcbiAgICAgICAgLy8gRXNjYXBlIHN0YXJ0XG5cbiAgICAgICAgLy8gMS4gSWYgYnl0ZSBpcyBlaXRoZXIgMHgyNCBvciAweDI4LCBzZXQgaXNvLTIwMjItanAgbGVhZCB0b1xuICAgICAgICAvLyBieXRlLCBpc28tMjAyMi1qcCBkZWNvZGVyIHN0YXRlIHRvIGVzY2FwZSwgYW5kIHJldHVyblxuICAgICAgICAvLyBjb250aW51ZS5cbiAgICAgICAgaWYgKGJpdGUgPT09IDB4MjQgfHwgYml0ZSA9PT0gMHgyOCkge1xuICAgICAgICAgIGlzbzIwMjJqcF9sZWFkID0gYml0ZTtcbiAgICAgICAgICBpc28yMDIyanBfZGVjb2Rlcl9zdGF0ZSA9IHN0YXRlcy5Fc2NhcGU7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAyLiBQcmVwZW5kIGJ5dGUgdG8gc3RyZWFtLlxuICAgICAgICBzdHJlYW0ucHJlcGVuZChiaXRlKTtcblxuICAgICAgICAvLyAzLiBVbnNldCB0aGUgaXNvLTIwMjItanAgb3V0cHV0IGZsYWcsIHNldCBpc28tMjAyMi1qcFxuICAgICAgICAvLyBkZWNvZGVyIHN0YXRlIHRvIGlzby0yMDIyLWpwIGRlY29kZXIgb3V0cHV0IHN0YXRlLCBhbmRcbiAgICAgICAgLy8gcmV0dXJuIGVycm9yLlxuICAgICAgICBpc28yMDIyanBfb3V0cHV0X2ZsYWcgPSBmYWxzZTtcbiAgICAgICAgaXNvMjAyMmpwX2RlY29kZXJfc3RhdGUgPSBpc28yMDIyanBfZGVjb2Rlcl9vdXRwdXRfc3RhdGU7XG4gICAgICAgIHJldHVybiBkZWNvZGVyRXJyb3IoZmF0YWwpO1xuXG4gICAgICBjYXNlIHN0YXRlcy5Fc2NhcGU6XG4gICAgICAgIC8vIEVzY2FwZVxuXG4gICAgICAgIC8vIDEuIExldCBsZWFkIGJlIGlzby0yMDIyLWpwIGxlYWQgYW5kIHNldCBpc28tMjAyMi1qcCBsZWFkIHRvXG4gICAgICAgIC8vIDB4MDAuXG4gICAgICAgIHZhciBsZWFkID0gaXNvMjAyMmpwX2xlYWQ7XG4gICAgICAgIGlzbzIwMjJqcF9sZWFkID0gMHgwMDtcblxuICAgICAgICAvLyAyLiBMZXQgc3RhdGUgYmUgbnVsbC5cbiAgICAgICAgdmFyIHN0YXRlID0gbnVsbDtcblxuICAgICAgICAvLyAzLiBJZiBsZWFkIGlzIDB4MjggYW5kIGJ5dGUgaXMgMHg0Miwgc2V0IHN0YXRlIHRvIEFTQ0lJLlxuICAgICAgICBpZiAobGVhZCA9PT0gMHgyOCAmJiBiaXRlID09PSAweDQyKVxuICAgICAgICAgIHN0YXRlID0gc3RhdGVzLkFTQ0lJO1xuXG4gICAgICAgIC8vIDQuIElmIGxlYWQgaXMgMHgyOCBhbmQgYnl0ZSBpcyAweDRBLCBzZXQgc3RhdGUgdG8gUm9tYW4uXG4gICAgICAgIGlmIChsZWFkID09PSAweDI4ICYmIGJpdGUgPT09IDB4NEEpXG4gICAgICAgICAgc3RhdGUgPSBzdGF0ZXMuUm9tYW47XG5cbiAgICAgICAgLy8gNS4gSWYgbGVhZCBpcyAweDI4IGFuZCBieXRlIGlzIDB4NDksIHNldCBzdGF0ZSB0byBLYXRha2FuYS5cbiAgICAgICAgaWYgKGxlYWQgPT09IDB4MjggJiYgYml0ZSA9PT0gMHg0OSlcbiAgICAgICAgICBzdGF0ZSA9IHN0YXRlcy5LYXRha2FuYTtcblxuICAgICAgICAvLyA2LiBJZiBsZWFkIGlzIDB4MjQgYW5kIGJ5dGUgaXMgZWl0aGVyIDB4NDAgb3IgMHg0Miwgc2V0XG4gICAgICAgIC8vIHN0YXRlIHRvIGxlYWQgYnl0ZS5cbiAgICAgICAgaWYgKGxlYWQgPT09IDB4MjQgJiYgKGJpdGUgPT09IDB4NDAgfHwgYml0ZSA9PT0gMHg0MikpXG4gICAgICAgICAgc3RhdGUgPSBzdGF0ZXMuTGVhZEJ5dGU7XG5cbiAgICAgICAgLy8gNy4gSWYgc3RhdGUgaXMgbm9uLW51bGwsIHJ1biB0aGVzZSBzdWJzdGVwczpcbiAgICAgICAgaWYgKHN0YXRlICE9PSBudWxsKSB7XG4gICAgICAgICAgLy8gMS4gU2V0IGlzby0yMDIyLWpwIGRlY29kZXIgc3RhdGUgYW5kIGlzby0yMDIyLWpwIGRlY29kZXJcbiAgICAgICAgICAvLyBvdXRwdXQgc3RhdGUgdG8gc3RhdGVzLlxuICAgICAgICAgIGlzbzIwMjJqcF9kZWNvZGVyX3N0YXRlID0gaXNvMjAyMmpwX2RlY29kZXJfc3RhdGUgPSBzdGF0ZTtcblxuICAgICAgICAgIC8vIDIuIExldCBvdXRwdXQgZmxhZyBiZSB0aGUgaXNvLTIwMjItanAgb3V0cHV0IGZsYWcuXG4gICAgICAgICAgdmFyIG91dHB1dF9mbGFnID0gaXNvMjAyMmpwX291dHB1dF9mbGFnO1xuXG4gICAgICAgICAgLy8gMy4gU2V0IHRoZSBpc28tMjAyMi1qcCBvdXRwdXQgZmxhZy5cbiAgICAgICAgICBpc28yMDIyanBfb3V0cHV0X2ZsYWcgPSB0cnVlO1xuXG4gICAgICAgICAgLy8gNC4gUmV0dXJuIGNvbnRpbnVlLCBpZiBvdXRwdXQgZmxhZyBpcyB1bnNldCwgYW5kIGVycm9yXG4gICAgICAgICAgLy8gb3RoZXJ3aXNlLlxuICAgICAgICAgIHJldHVybiAhb3V0cHV0X2ZsYWcgPyBudWxsIDogZGVjb2RlckVycm9yKGZhdGFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDguIFByZXBlbmQgbGVhZCBhbmQgYnl0ZSB0byBzdHJlYW0uXG4gICAgICAgIHN0cmVhbS5wcmVwZW5kKFtsZWFkLCBiaXRlXSk7XG5cbiAgICAgICAgLy8gOS4gVW5zZXQgdGhlIGlzby0yMDIyLWpwIG91dHB1dCBmbGFnLCBzZXQgaXNvLTIwMjItanBcbiAgICAgICAgLy8gZGVjb2RlciBzdGF0ZSB0byBpc28tMjAyMi1qcCBkZWNvZGVyIG91dHB1dCBzdGF0ZSBhbmRcbiAgICAgICAgLy8gcmV0dXJuIGVycm9yLlxuICAgICAgICBpc28yMDIyanBfb3V0cHV0X2ZsYWcgPSBmYWxzZTtcbiAgICAgICAgaXNvMjAyMmpwX2RlY29kZXJfc3RhdGUgPSBpc28yMDIyanBfZGVjb2Rlcl9vdXRwdXRfc3RhdGU7XG4gICAgICAgIHJldHVybiBkZWNvZGVyRXJyb3IoZmF0YWwpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyAxMy4yLjIgaXNvLTIwMjItanAgZW5jb2RlclxuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBpbXBsZW1lbnRzIHtFbmNvZGVyfVxuICAgKiBAcGFyYW0ge3tmYXRhbDogYm9vbGVhbn19IG9wdGlvbnNcbiAgICovXG4gIGZ1bmN0aW9uIElTTzIwMjJKUEVuY29kZXIob3B0aW9ucykge1xuICAgIHZhciBmYXRhbCA9IG9wdGlvbnMuZmF0YWw7XG4gICAgLy8gaXNvLTIwMjItanAncyBlbmNvZGVyIGhhcyBhbiBhc3NvY2lhdGVkIGlzby0yMDIyLWpwIGVuY29kZXJcbiAgICAvLyBzdGF0ZSB3aGljaCBpcyBvbmUgb2YgQVNDSUksIFJvbWFuLCBhbmQgamlzMDIwOCAoaW5pdGlhbGx5XG4gICAgLy8gQVNDSUkpLlxuICAgIC8qKiBAZW51bSAqL1xuICAgIHZhciBzdGF0ZXMgPSB7XG4gICAgICBBU0NJSTogMCxcbiAgICAgIFJvbWFuOiAxLFxuICAgICAgamlzMDIwODogMlxuICAgIH07XG4gICAgdmFyIC8qKiBAdHlwZSB7bnVtYmVyfSAqLyBpc28yMDIyanBfc3RhdGUgPSBzdGF0ZXMuQVNDSUk7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbSBJbnB1dCBzdHJlYW0uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNvZGVfcG9pbnQgTmV4dCBjb2RlIHBvaW50IHJlYWQgZnJvbSB0aGUgc3RyZWFtLlxuICAgICAqIEByZXR1cm4geyhudW1iZXJ8IUFycmF5LjxudW1iZXI+KX0gQnl0ZShzKSB0byBlbWl0LlxuICAgICAqL1xuICAgIHRoaXMuaGFuZGxlciA9IGZ1bmN0aW9uKHN0cmVhbSwgY29kZV9wb2ludCkge1xuICAgICAgLy8gMS4gSWYgY29kZSBwb2ludCBpcyBlbmQtb2Ytc3RyZWFtIGFuZCBpc28tMjAyMi1qcCBlbmNvZGVyXG4gICAgICAvLyBzdGF0ZSBpcyBub3QgQVNDSUksIHByZXBlbmQgY29kZSBwb2ludCB0byBzdHJlYW0sIHNldFxuICAgICAgLy8gaXNvLTIwMjItanAgZW5jb2RlciBzdGF0ZSB0byBBU0NJSSwgYW5kIHJldHVybiB0aHJlZSBieXRlc1xuICAgICAgLy8gMHgxQiAweDI4IDB4NDIuXG4gICAgICBpZiAoY29kZV9wb2ludCA9PT0gZW5kX29mX3N0cmVhbSAmJlxuICAgICAgICAgIGlzbzIwMjJqcF9zdGF0ZSAhPT0gc3RhdGVzLkFTQ0lJKSB7XG4gICAgICAgIHN0cmVhbS5wcmVwZW5kKGNvZGVfcG9pbnQpO1xuICAgICAgICBpc28yMDIyanBfc3RhdGUgPSBzdGF0ZXMuQVNDSUk7XG4gICAgICAgIHJldHVybiBbMHgxQiwgMHgyOCwgMHg0Ml07XG4gICAgICB9XG5cbiAgICAgIC8vIDIuIElmIGNvZGUgcG9pbnQgaXMgZW5kLW9mLXN0cmVhbSBhbmQgaXNvLTIwMjItanAgZW5jb2RlclxuICAgICAgLy8gc3RhdGUgaXMgQVNDSUksIHJldHVybiBmaW5pc2hlZC5cbiAgICAgIGlmIChjb2RlX3BvaW50ID09PSBlbmRfb2Zfc3RyZWFtICYmIGlzbzIwMjJqcF9zdGF0ZSA9PT0gc3RhdGVzLkFTQ0lJKVxuICAgICAgICByZXR1cm4gZmluaXNoZWQ7XG5cbiAgICAgIC8vIDMuIElmIElTTy0yMDIyLUpQIGVuY29kZXIgc3RhdGUgaXMgQVNDSUkgb3IgUm9tYW4sIGFuZCBjb2RlXG4gICAgICAvLyBwb2ludCBpcyBVKzAwMEUsIFUrMDAwRiwgb3IgVSswMDFCLCByZXR1cm4gZXJyb3Igd2l0aCBVK0ZGRkQuXG4gICAgICBpZiAoKGlzbzIwMjJqcF9zdGF0ZSA9PT0gc3RhdGVzLkFTQ0lJIHx8XG4gICAgICAgICAgIGlzbzIwMjJqcF9zdGF0ZSA9PT0gc3RhdGVzLlJvbWFuKSAmJlxuICAgICAgICAgIChjb2RlX3BvaW50ID09PSAweDAwMEUgfHwgY29kZV9wb2ludCA9PT0gMHgwMDBGIHx8XG4gICAgICAgICAgIGNvZGVfcG9pbnQgPT09IDB4MDAxQikpIHtcbiAgICAgICAgcmV0dXJuIGVuY29kZXJFcnJvcigweEZGRkQpO1xuICAgICAgfVxuXG4gICAgICAvLyA0LiBJZiBpc28tMjAyMi1qcCBlbmNvZGVyIHN0YXRlIGlzIEFTQ0lJIGFuZCBjb2RlIHBvaW50IGlzIGFuXG4gICAgICAvLyBBU0NJSSBjb2RlIHBvaW50LCByZXR1cm4gYSBieXRlIHdob3NlIHZhbHVlIGlzIGNvZGUgcG9pbnQuXG4gICAgICBpZiAoaXNvMjAyMmpwX3N0YXRlID09PSBzdGF0ZXMuQVNDSUkgJiZcbiAgICAgICAgICBpc0FTQ0lJQ29kZVBvaW50KGNvZGVfcG9pbnQpKVxuICAgICAgICByZXR1cm4gY29kZV9wb2ludDtcblxuICAgICAgLy8gNS4gSWYgaXNvLTIwMjItanAgZW5jb2RlciBzdGF0ZSBpcyBSb21hbiBhbmQgY29kZSBwb2ludCBpcyBhblxuICAgICAgLy8gQVNDSUkgY29kZSBwb2ludCwgZXhjbHVkaW5nIFUrMDA1QyBhbmQgVSswMDdFLCBvciBpcyBVKzAwQTVcbiAgICAgIC8vIG9yIFUrMjAzRSwgcnVuIHRoZXNlIHN1YnN0ZXBzOlxuICAgICAgaWYgKGlzbzIwMjJqcF9zdGF0ZSA9PT0gc3RhdGVzLlJvbWFuICYmXG4gICAgICAgICAgKChpc0FTQ0lJQ29kZVBvaW50KGNvZGVfcG9pbnQpICYmXG4gICAgICAgICAgIGNvZGVfcG9pbnQgIT09IDB4MDA1QyAmJiBjb2RlX3BvaW50ICE9PSAweDAwN0UpIHx8XG4gICAgICAgICAgKGNvZGVfcG9pbnQgPT0gMHgwMEE1IHx8IGNvZGVfcG9pbnQgPT0gMHgyMDNFKSkpIHtcblxuICAgICAgICAvLyAxLiBJZiBjb2RlIHBvaW50IGlzIGFuIEFTQ0lJIGNvZGUgcG9pbnQsIHJldHVybiBhIGJ5dGVcbiAgICAgICAgLy8gd2hvc2UgdmFsdWUgaXMgY29kZSBwb2ludC5cbiAgICAgICAgaWYgKGlzQVNDSUlDb2RlUG9pbnQoY29kZV9wb2ludCkpXG4gICAgICAgICAgcmV0dXJuIGNvZGVfcG9pbnQ7XG5cbiAgICAgICAgLy8gMi4gSWYgY29kZSBwb2ludCBpcyBVKzAwQTUsIHJldHVybiBieXRlIDB4NUMuXG4gICAgICAgIGlmIChjb2RlX3BvaW50ID09PSAweDAwQTUpXG4gICAgICAgICAgcmV0dXJuIDB4NUM7XG5cbiAgICAgICAgLy8gMy4gSWYgY29kZSBwb2ludCBpcyBVKzIwM0UsIHJldHVybiBieXRlIDB4N0UuXG4gICAgICAgIGlmIChjb2RlX3BvaW50ID09PSAweDIwM0UpXG4gICAgICAgICAgcmV0dXJuIDB4N0U7XG4gICAgICB9XG5cbiAgICAgIC8vIDYuIElmIGNvZGUgcG9pbnQgaXMgYW4gQVNDSUkgY29kZSBwb2ludCwgYW5kIGlzby0yMDIyLWpwXG4gICAgICAvLyBlbmNvZGVyIHN0YXRlIGlzIG5vdCBBU0NJSSwgcHJlcGVuZCBjb2RlIHBvaW50IHRvIHN0cmVhbSwgc2V0XG4gICAgICAvLyBpc28tMjAyMi1qcCBlbmNvZGVyIHN0YXRlIHRvIEFTQ0lJLCBhbmQgcmV0dXJuIHRocmVlIGJ5dGVzXG4gICAgICAvLyAweDFCIDB4MjggMHg0Mi5cbiAgICAgIGlmIChpc0FTQ0lJQ29kZVBvaW50KGNvZGVfcG9pbnQpICYmXG4gICAgICAgICAgaXNvMjAyMmpwX3N0YXRlICE9PSBzdGF0ZXMuQVNDSUkpIHtcbiAgICAgICAgc3RyZWFtLnByZXBlbmQoY29kZV9wb2ludCk7XG4gICAgICAgIGlzbzIwMjJqcF9zdGF0ZSA9IHN0YXRlcy5BU0NJSTtcbiAgICAgICAgcmV0dXJuIFsweDFCLCAweDI4LCAweDQyXTtcbiAgICAgIH1cblxuICAgICAgLy8gNy4gSWYgY29kZSBwb2ludCBpcyBlaXRoZXIgVSswMEE1IG9yIFUrMjAzRSwgYW5kIGlzby0yMDIyLWpwXG4gICAgICAvLyBlbmNvZGVyIHN0YXRlIGlzIG5vdCBSb21hbiwgcHJlcGVuZCBjb2RlIHBvaW50IHRvIHN0cmVhbSwgc2V0XG4gICAgICAvLyBpc28tMjAyMi1qcCBlbmNvZGVyIHN0YXRlIHRvIFJvbWFuLCBhbmQgcmV0dXJuIHRocmVlIGJ5dGVzXG4gICAgICAvLyAweDFCIDB4MjggMHg0QS5cbiAgICAgIGlmICgoY29kZV9wb2ludCA9PT0gMHgwMEE1IHx8IGNvZGVfcG9pbnQgPT09IDB4MjAzRSkgJiZcbiAgICAgICAgICBpc28yMDIyanBfc3RhdGUgIT09IHN0YXRlcy5Sb21hbikge1xuICAgICAgICBzdHJlYW0ucHJlcGVuZChjb2RlX3BvaW50KTtcbiAgICAgICAgaXNvMjAyMmpwX3N0YXRlID0gc3RhdGVzLlJvbWFuO1xuICAgICAgICByZXR1cm4gWzB4MUIsIDB4MjgsIDB4NEFdO1xuICAgICAgfVxuXG4gICAgICAvLyA4LiBJZiBjb2RlIHBvaW50IGlzIFUrMjIxMiwgc2V0IGl0IHRvIFUrRkYwRC5cbiAgICAgIGlmIChjb2RlX3BvaW50ID09PSAweDIyMTIpXG4gICAgICAgIGNvZGVfcG9pbnQgPSAweEZGMEQ7XG5cbiAgICAgIC8vIDkuIExldCBwb2ludGVyIGJlIHRoZSBpbmRleCBwb2ludGVyIGZvciBjb2RlIHBvaW50IGluIGluZGV4XG4gICAgICAvLyBqaXMwMjA4LlxuICAgICAgdmFyIHBvaW50ZXIgPSBpbmRleFBvaW50ZXJGb3IoY29kZV9wb2ludCwgaW5kZXgoJ2ppczAyMDgnKSk7XG5cbiAgICAgIC8vIDEwLiBJZiBwb2ludGVyIGlzIG51bGwsIHJldHVybiBlcnJvciB3aXRoIGNvZGUgcG9pbnQuXG4gICAgICBpZiAocG9pbnRlciA9PT0gbnVsbClcbiAgICAgICAgcmV0dXJuIGVuY29kZXJFcnJvcihjb2RlX3BvaW50KTtcblxuICAgICAgLy8gMTEuIElmIGlzby0yMDIyLWpwIGVuY29kZXIgc3RhdGUgaXMgbm90IGppczAyMDgsIHByZXBlbmQgY29kZVxuICAgICAgLy8gcG9pbnQgdG8gc3RyZWFtLCBzZXQgaXNvLTIwMjItanAgZW5jb2RlciBzdGF0ZSB0byBqaXMwMjA4LFxuICAgICAgLy8gYW5kIHJldHVybiB0aHJlZSBieXRlcyAweDFCIDB4MjQgMHg0Mi5cbiAgICAgIGlmIChpc28yMDIyanBfc3RhdGUgIT09IHN0YXRlcy5qaXMwMjA4KSB7XG4gICAgICAgIHN0cmVhbS5wcmVwZW5kKGNvZGVfcG9pbnQpO1xuICAgICAgICBpc28yMDIyanBfc3RhdGUgPSBzdGF0ZXMuamlzMDIwODtcbiAgICAgICAgcmV0dXJuIFsweDFCLCAweDI0LCAweDQyXTtcbiAgICAgIH1cblxuICAgICAgLy8gMTIuIExldCBsZWFkIGJlIGZsb29yKHBvaW50ZXIgLyA5NCkgKyAweDIxLlxuICAgICAgdmFyIGxlYWQgPSBmbG9vcihwb2ludGVyIC8gOTQpICsgMHgyMTtcblxuICAgICAgLy8gMTMuIExldCB0cmFpbCBiZSBwb2ludGVyICUgOTQgKyAweDIxLlxuICAgICAgdmFyIHRyYWlsID0gcG9pbnRlciAlIDk0ICsgMHgyMTtcblxuICAgICAgLy8gMTQuIFJldHVybiB0d28gYnl0ZXMgd2hvc2UgdmFsdWVzIGFyZSBsZWFkIGFuZCB0cmFpbC5cbiAgICAgIHJldHVybiBbbGVhZCwgdHJhaWxdO1xuICAgIH07XG4gIH1cblxuICAvKiogQHBhcmFtIHt7ZmF0YWw6IGJvb2xlYW59fSBvcHRpb25zICovXG4gIGVuY29kZXJzWydJU08tMjAyMi1KUCddID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgSVNPMjAyMkpQRW5jb2RlcihvcHRpb25zKTtcbiAgfTtcbiAgLyoqIEBwYXJhbSB7e2ZhdGFsOiBib29sZWFufX0gb3B0aW9ucyAqL1xuICBkZWNvZGVyc1snSVNPLTIwMjItSlAnXSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IElTTzIwMjJKUERlY29kZXIob3B0aW9ucyk7XG4gIH07XG5cbiAgLy8gMTMuMyBTaGlmdF9KSVNcblxuICAvLyAxMy4zLjEgU2hpZnRfSklTIGRlY29kZXJcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAaW1wbGVtZW50cyB7RGVjb2Rlcn1cbiAgICogQHBhcmFtIHt7ZmF0YWw6IGJvb2xlYW59fSBvcHRpb25zXG4gICAqL1xuICBmdW5jdGlvbiBTaGlmdEpJU0RlY29kZXIob3B0aW9ucykge1xuICAgIHZhciBmYXRhbCA9IG9wdGlvbnMuZmF0YWw7XG4gICAgLy8gU2hpZnRfSklTJ3MgZGVjb2RlciBoYXMgYW4gYXNzb2NpYXRlZCBTaGlmdF9KSVMgbGVhZCAoaW5pdGlhbGx5XG4gICAgLy8gMHgwMCkuXG4gICAgdmFyIC8qKiBAdHlwZSB7bnVtYmVyfSAqLyBTaGlmdF9KSVNfbGVhZCA9IDB4MDA7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbSBUaGUgc3RyZWFtIG9mIGJ5dGVzIGJlaW5nIGRlY29kZWQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGJpdGUgVGhlIG5leHQgYnl0ZSByZWFkIGZyb20gdGhlIHN0cmVhbS5cbiAgICAgKiBAcmV0dXJuIHs/KG51bWJlcnwhQXJyYXkuPG51bWJlcj4pfSBUaGUgbmV4dCBjb2RlIHBvaW50KHMpXG4gICAgICogICAgIGRlY29kZWQsIG9yIG51bGwgaWYgbm90IGVub3VnaCBkYXRhIGV4aXN0cyBpbiB0aGUgaW5wdXRcbiAgICAgKiAgICAgc3RyZWFtIHRvIGRlY29kZSBhIGNvbXBsZXRlIGNvZGUgcG9pbnQuXG4gICAgICovXG4gICAgdGhpcy5oYW5kbGVyID0gZnVuY3Rpb24oc3RyZWFtLCBiaXRlKSB7XG4gICAgICAvLyAxLiBJZiBieXRlIGlzIGVuZC1vZi1zdHJlYW0gYW5kIFNoaWZ0X0pJUyBsZWFkIGlzIG5vdCAweDAwLFxuICAgICAgLy8gc2V0IFNoaWZ0X0pJUyBsZWFkIHRvIDB4MDAgYW5kIHJldHVybiBlcnJvci5cbiAgICAgIGlmIChiaXRlID09PSBlbmRfb2Zfc3RyZWFtICYmIFNoaWZ0X0pJU19sZWFkICE9PSAweDAwKSB7XG4gICAgICAgIFNoaWZ0X0pJU19sZWFkID0gMHgwMDtcbiAgICAgICAgcmV0dXJuIGRlY29kZXJFcnJvcihmYXRhbCk7XG4gICAgICB9XG5cbiAgICAgIC8vIDIuIElmIGJ5dGUgaXMgZW5kLW9mLXN0cmVhbSBhbmQgU2hpZnRfSklTIGxlYWQgaXMgMHgwMCxcbiAgICAgIC8vIHJldHVybiBmaW5pc2hlZC5cbiAgICAgIGlmIChiaXRlID09PSBlbmRfb2Zfc3RyZWFtICYmIFNoaWZ0X0pJU19sZWFkID09PSAweDAwKVxuICAgICAgICByZXR1cm4gZmluaXNoZWQ7XG5cbiAgICAgIC8vIDMuIElmIFNoaWZ0X0pJUyBsZWFkIGlzIG5vdCAweDAwLCBsZXQgbGVhZCBiZSBTaGlmdF9KSVMgbGVhZCxcbiAgICAgIC8vIGxldCBwb2ludGVyIGJlIG51bGwsIHNldCBTaGlmdF9KSVMgbGVhZCB0byAweDAwLCBhbmQgdGhlbiBydW5cbiAgICAgIC8vIHRoZXNlIHN1YnN0ZXBzOlxuICAgICAgaWYgKFNoaWZ0X0pJU19sZWFkICE9PSAweDAwKSB7XG4gICAgICAgIHZhciBsZWFkID0gU2hpZnRfSklTX2xlYWQ7XG4gICAgICAgIHZhciBwb2ludGVyID0gbnVsbDtcbiAgICAgICAgU2hpZnRfSklTX2xlYWQgPSAweDAwO1xuXG4gICAgICAgIC8vIDEuIExldCBvZmZzZXQgYmUgMHg0MCwgaWYgYnl0ZSBpcyBsZXNzIHRoYW4gMHg3RiwgYW5kIDB4NDFcbiAgICAgICAgLy8gb3RoZXJ3aXNlLlxuICAgICAgICB2YXIgb2Zmc2V0ID0gKGJpdGUgPCAweDdGKSA/IDB4NDAgOiAweDQxO1xuXG4gICAgICAgIC8vIDIuIExldCBsZWFkIG9mZnNldCBiZSAweDgxLCBpZiBsZWFkIGlzIGxlc3MgdGhhbiAweEEwLCBhbmRcbiAgICAgICAgLy8gMHhDMSBvdGhlcndpc2UuXG4gICAgICAgIHZhciBsZWFkX29mZnNldCA9IChsZWFkIDwgMHhBMCkgPyAweDgxIDogMHhDMTtcblxuICAgICAgICAvLyAzLiBJZiBieXRlIGlzIGluIHRoZSByYW5nZSAweDQwIHRvIDB4N0UsIGluY2x1c2l2ZSwgb3IgMHg4MFxuICAgICAgICAvLyB0byAweEZDLCBpbmNsdXNpdmUsIHNldCBwb2ludGVyIHRvIChsZWFkIOKIkiBsZWFkIG9mZnNldCkgw5dcbiAgICAgICAgLy8gMTg4ICsgYnl0ZSDiiJIgb2Zmc2V0LlxuICAgICAgICBpZiAoaW5SYW5nZShiaXRlLCAweDQwLCAweDdFKSB8fCBpblJhbmdlKGJpdGUsIDB4ODAsIDB4RkMpKVxuICAgICAgICAgIHBvaW50ZXIgPSAobGVhZCAtIGxlYWRfb2Zmc2V0KSAqIDE4OCArIGJpdGUgLSBvZmZzZXQ7XG5cbiAgICAgICAgLy8gNC4gSWYgcG9pbnRlciBpcyBpbiB0aGUgcmFuZ2UgODgzNiB0byAxMDcxNSwgaW5jbHVzaXZlLFxuICAgICAgICAvLyByZXR1cm4gYSBjb2RlIHBvaW50IHdob3NlIHZhbHVlIGlzIDB4RTAwMCDiiJIgODgzNiArIHBvaW50ZXIuXG4gICAgICAgIGlmIChpblJhbmdlKHBvaW50ZXIsIDg4MzYsIDEwNzE1KSlcbiAgICAgICAgICByZXR1cm4gMHhFMDAwIC0gODgzNiArIHBvaW50ZXI7XG5cbiAgICAgICAgLy8gNS4gTGV0IGNvZGUgcG9pbnQgYmUgbnVsbCwgaWYgcG9pbnRlciBpcyBudWxsLCBhbmQgdGhlXG4gICAgICAgIC8vIGluZGV4IGNvZGUgcG9pbnQgZm9yIHBvaW50ZXIgaW4gaW5kZXggamlzMDIwOCBvdGhlcndpc2UuXG4gICAgICAgIHZhciBjb2RlX3BvaW50ID0gKHBvaW50ZXIgPT09IG51bGwpID8gbnVsbCA6XG4gICAgICAgICAgICAgIGluZGV4Q29kZVBvaW50Rm9yKHBvaW50ZXIsIGluZGV4KCdqaXMwMjA4JykpO1xuXG4gICAgICAgIC8vIDYuIElmIGNvZGUgcG9pbnQgaXMgbnVsbCBhbmQgYnl0ZSBpcyBhbiBBU0NJSSBieXRlLCBwcmVwZW5kXG4gICAgICAgIC8vIGJ5dGUgdG8gc3RyZWFtLlxuICAgICAgICBpZiAoY29kZV9wb2ludCA9PT0gbnVsbCAmJiBpc0FTQ0lJQnl0ZShiaXRlKSlcbiAgICAgICAgICBzdHJlYW0ucHJlcGVuZChiaXRlKTtcblxuICAgICAgICAvLyA3LiBJZiBjb2RlIHBvaW50IGlzIG51bGwsIHJldHVybiBlcnJvci5cbiAgICAgICAgaWYgKGNvZGVfcG9pbnQgPT09IG51bGwpXG4gICAgICAgICAgcmV0dXJuIGRlY29kZXJFcnJvcihmYXRhbCk7XG5cbiAgICAgICAgLy8gOC4gUmV0dXJuIGEgY29kZSBwb2ludCB3aG9zZSB2YWx1ZSBpcyBjb2RlIHBvaW50LlxuICAgICAgICByZXR1cm4gY29kZV9wb2ludDtcbiAgICAgIH1cblxuICAgICAgLy8gNC4gSWYgYnl0ZSBpcyBhbiBBU0NJSSBieXRlIG9yIDB4ODAsIHJldHVybiBhIGNvZGUgcG9pbnRcbiAgICAgIC8vIHdob3NlIHZhbHVlIGlzIGJ5dGUuXG4gICAgICBpZiAoaXNBU0NJSUJ5dGUoYml0ZSkgfHwgYml0ZSA9PT0gMHg4MClcbiAgICAgICAgcmV0dXJuIGJpdGU7XG5cbiAgICAgIC8vIDUuIElmIGJ5dGUgaXMgaW4gdGhlIHJhbmdlIDB4QTEgdG8gMHhERiwgaW5jbHVzaXZlLCByZXR1cm4gYVxuICAgICAgLy8gY29kZSBwb2ludCB3aG9zZSB2YWx1ZSBpcyAweEZGNjEg4oiSIDB4QTEgKyBieXRlLlxuICAgICAgaWYgKGluUmFuZ2UoYml0ZSwgMHhBMSwgMHhERikpXG4gICAgICAgIHJldHVybiAweEZGNjEgLSAweEExICsgYml0ZTtcblxuICAgICAgLy8gNi4gSWYgYnl0ZSBpcyBpbiB0aGUgcmFuZ2UgMHg4MSB0byAweDlGLCBpbmNsdXNpdmUsIG9yIDB4RTBcbiAgICAgIC8vIHRvIDB4RkMsIGluY2x1c2l2ZSwgc2V0IFNoaWZ0X0pJUyBsZWFkIHRvIGJ5dGUgYW5kIHJldHVyblxuICAgICAgLy8gY29udGludWUuXG4gICAgICBpZiAoaW5SYW5nZShiaXRlLCAweDgxLCAweDlGKSB8fCBpblJhbmdlKGJpdGUsIDB4RTAsIDB4RkMpKSB7XG4gICAgICAgIFNoaWZ0X0pJU19sZWFkID0gYml0ZTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIC8vIDcuIFJldHVybiBlcnJvci5cbiAgICAgIHJldHVybiBkZWNvZGVyRXJyb3IoZmF0YWwpO1xuICAgIH07XG4gIH1cblxuICAvLyAxMy4zLjIgU2hpZnRfSklTIGVuY29kZXJcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAaW1wbGVtZW50cyB7RW5jb2Rlcn1cbiAgICogQHBhcmFtIHt7ZmF0YWw6IGJvb2xlYW59fSBvcHRpb25zXG4gICAqL1xuICBmdW5jdGlvbiBTaGlmdEpJU0VuY29kZXIob3B0aW9ucykge1xuICAgIHZhciBmYXRhbCA9IG9wdGlvbnMuZmF0YWw7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbSBJbnB1dCBzdHJlYW0uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNvZGVfcG9pbnQgTmV4dCBjb2RlIHBvaW50IHJlYWQgZnJvbSB0aGUgc3RyZWFtLlxuICAgICAqIEByZXR1cm4geyhudW1iZXJ8IUFycmF5LjxudW1iZXI+KX0gQnl0ZShzKSB0byBlbWl0LlxuICAgICAqL1xuICAgIHRoaXMuaGFuZGxlciA9IGZ1bmN0aW9uKHN0cmVhbSwgY29kZV9wb2ludCkge1xuICAgICAgLy8gMS4gSWYgY29kZSBwb2ludCBpcyBlbmQtb2Ytc3RyZWFtLCByZXR1cm4gZmluaXNoZWQuXG4gICAgICBpZiAoY29kZV9wb2ludCA9PT0gZW5kX29mX3N0cmVhbSlcbiAgICAgICAgcmV0dXJuIGZpbmlzaGVkO1xuXG4gICAgICAvLyAyLiBJZiBjb2RlIHBvaW50IGlzIGFuIEFTQ0lJIGNvZGUgcG9pbnQgb3IgVSswMDgwLCByZXR1cm4gYVxuICAgICAgLy8gYnl0ZSB3aG9zZSB2YWx1ZSBpcyBjb2RlIHBvaW50LlxuICAgICAgaWYgKGlzQVNDSUlDb2RlUG9pbnQoY29kZV9wb2ludCkgfHwgY29kZV9wb2ludCA9PT0gMHgwMDgwKVxuICAgICAgICByZXR1cm4gY29kZV9wb2ludDtcblxuICAgICAgLy8gMy4gSWYgY29kZSBwb2ludCBpcyBVKzAwQTUsIHJldHVybiBieXRlIDB4NUMuXG4gICAgICBpZiAoY29kZV9wb2ludCA9PT0gMHgwMEE1KVxuICAgICAgICByZXR1cm4gMHg1QztcblxuICAgICAgLy8gNC4gSWYgY29kZSBwb2ludCBpcyBVKzIwM0UsIHJldHVybiBieXRlIDB4N0UuXG4gICAgICBpZiAoY29kZV9wb2ludCA9PT0gMHgyMDNFKVxuICAgICAgICByZXR1cm4gMHg3RTtcblxuICAgICAgLy8gNS4gSWYgY29kZSBwb2ludCBpcyBpbiB0aGUgcmFuZ2UgVStGRjYxIHRvIFUrRkY5RiwgaW5jbHVzaXZlLFxuICAgICAgLy8gcmV0dXJuIGEgYnl0ZSB3aG9zZSB2YWx1ZSBpcyBjb2RlIHBvaW50IOKIkiAweEZGNjEgKyAweEExLlxuICAgICAgaWYgKGluUmFuZ2UoY29kZV9wb2ludCwgMHhGRjYxLCAweEZGOUYpKVxuICAgICAgICByZXR1cm4gY29kZV9wb2ludCAtIDB4RkY2MSArIDB4QTE7XG5cbiAgICAgIC8vIDYuIElmIGNvZGUgcG9pbnQgaXMgVSsyMjEyLCBzZXQgaXQgdG8gVStGRjBELlxuICAgICAgaWYgKGNvZGVfcG9pbnQgPT09IDB4MjIxMilcbiAgICAgICAgY29kZV9wb2ludCA9IDB4RkYwRDtcblxuICAgICAgLy8gNy4gTGV0IHBvaW50ZXIgYmUgdGhlIGluZGV4IFNoaWZ0X0pJUyBwb2ludGVyIGZvciBjb2RlIHBvaW50LlxuICAgICAgdmFyIHBvaW50ZXIgPSBpbmRleFNoaWZ0SklTUG9pbnRlckZvcihjb2RlX3BvaW50KTtcblxuICAgICAgLy8gOC4gSWYgcG9pbnRlciBpcyBudWxsLCByZXR1cm4gZXJyb3Igd2l0aCBjb2RlIHBvaW50LlxuICAgICAgaWYgKHBvaW50ZXIgPT09IG51bGwpXG4gICAgICAgIHJldHVybiBlbmNvZGVyRXJyb3IoY29kZV9wb2ludCk7XG5cbiAgICAgIC8vIDkuIExldCBsZWFkIGJlIGZsb29yKHBvaW50ZXIgLyAxODgpLlxuICAgICAgdmFyIGxlYWQgPSBmbG9vcihwb2ludGVyIC8gMTg4KTtcblxuICAgICAgLy8gMTAuIExldCBsZWFkIG9mZnNldCBiZSAweDgxLCBpZiBsZWFkIGlzIGxlc3MgdGhhbiAweDFGLCBhbmRcbiAgICAgIC8vIDB4QzEgb3RoZXJ3aXNlLlxuICAgICAgdmFyIGxlYWRfb2Zmc2V0ID0gKGxlYWQgPCAweDFGKSA/IDB4ODEgOiAweEMxO1xuXG4gICAgICAvLyAxMS4gTGV0IHRyYWlsIGJlIHBvaW50ZXIgJSAxODguXG4gICAgICB2YXIgdHJhaWwgPSBwb2ludGVyICUgMTg4O1xuXG4gICAgICAvLyAxMi4gTGV0IG9mZnNldCBiZSAweDQwLCBpZiB0cmFpbCBpcyBsZXNzIHRoYW4gMHgzRiwgYW5kIDB4NDFcbiAgICAgIC8vIG90aGVyd2lzZS5cbiAgICAgIHZhciBvZmZzZXQgPSAodHJhaWwgPCAweDNGKSA/IDB4NDAgOiAweDQxO1xuXG4gICAgICAvLyAxMy4gUmV0dXJuIHR3byBieXRlcyB3aG9zZSB2YWx1ZXMgYXJlIGxlYWQgKyBsZWFkIG9mZnNldCBhbmRcbiAgICAgIC8vIHRyYWlsICsgb2Zmc2V0LlxuICAgICAgcmV0dXJuIFtsZWFkICsgbGVhZF9vZmZzZXQsIHRyYWlsICsgb2Zmc2V0XTtcbiAgICB9O1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7e2ZhdGFsOiBib29sZWFufX0gb3B0aW9ucyAqL1xuICBlbmNvZGVyc1snU2hpZnRfSklTJ10gPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBTaGlmdEpJU0VuY29kZXIob3B0aW9ucyk7XG4gIH07XG4gIC8qKiBAcGFyYW0ge3tmYXRhbDogYm9vbGVhbn19IG9wdGlvbnMgKi9cbiAgZGVjb2RlcnNbJ1NoaWZ0X0pJUyddID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgU2hpZnRKSVNEZWNvZGVyKG9wdGlvbnMpO1xuICB9O1xuXG4gIC8vXG4gIC8vIDE0LiBMZWdhY3kgbXVsdGktYnl0ZSBLb3JlYW4gZW5jb2RpbmdzXG4gIC8vXG5cbiAgLy8gMTQuMSBldWMta3JcblxuICAvLyAxNC4xLjEgZXVjLWtyIGRlY29kZXJcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAaW1wbGVtZW50cyB7RGVjb2Rlcn1cbiAgICogQHBhcmFtIHt7ZmF0YWw6IGJvb2xlYW59fSBvcHRpb25zXG4gICAqL1xuICBmdW5jdGlvbiBFVUNLUkRlY29kZXIob3B0aW9ucykge1xuICAgIHZhciBmYXRhbCA9IG9wdGlvbnMuZmF0YWw7XG5cbiAgICAvLyBldWMta3IncyBkZWNvZGVyIGhhcyBhbiBhc3NvY2lhdGVkIGV1Yy1rciBsZWFkIChpbml0aWFsbHkgMHgwMCkuXG4gICAgdmFyIC8qKiBAdHlwZSB7bnVtYmVyfSAqLyBldWNrcl9sZWFkID0gMHgwMDtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtIFRoZSBzdHJlYW0gb2YgYnl0ZXMgYmVpbmcgZGVjb2RlZC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYml0ZSBUaGUgbmV4dCBieXRlIHJlYWQgZnJvbSB0aGUgc3RyZWFtLlxuICAgICAqIEByZXR1cm4gez8obnVtYmVyfCFBcnJheS48bnVtYmVyPil9IFRoZSBuZXh0IGNvZGUgcG9pbnQocylcbiAgICAgKiAgICAgZGVjb2RlZCwgb3IgbnVsbCBpZiBub3QgZW5vdWdoIGRhdGEgZXhpc3RzIGluIHRoZSBpbnB1dFxuICAgICAqICAgICBzdHJlYW0gdG8gZGVjb2RlIGEgY29tcGxldGUgY29kZSBwb2ludC5cbiAgICAgKi9cbiAgICB0aGlzLmhhbmRsZXIgPSBmdW5jdGlvbihzdHJlYW0sIGJpdGUpIHtcbiAgICAgIC8vIDEuIElmIGJ5dGUgaXMgZW5kLW9mLXN0cmVhbSBhbmQgZXVjLWtyIGxlYWQgaXMgbm90IDB4MDAsIHNldFxuICAgICAgLy8gZXVjLWtyIGxlYWQgdG8gMHgwMCBhbmQgcmV0dXJuIGVycm9yLlxuICAgICAgaWYgKGJpdGUgPT09IGVuZF9vZl9zdHJlYW0gJiYgZXVja3JfbGVhZCAhPT0gMCkge1xuICAgICAgICBldWNrcl9sZWFkID0gMHgwMDtcbiAgICAgICAgcmV0dXJuIGRlY29kZXJFcnJvcihmYXRhbCk7XG4gICAgICB9XG5cbiAgICAgIC8vIDIuIElmIGJ5dGUgaXMgZW5kLW9mLXN0cmVhbSBhbmQgZXVjLWtyIGxlYWQgaXMgMHgwMCwgcmV0dXJuXG4gICAgICAvLyBmaW5pc2hlZC5cbiAgICAgIGlmIChiaXRlID09PSBlbmRfb2Zfc3RyZWFtICYmIGV1Y2tyX2xlYWQgPT09IDApXG4gICAgICAgIHJldHVybiBmaW5pc2hlZDtcblxuICAgICAgLy8gMy4gSWYgZXVjLWtyIGxlYWQgaXMgbm90IDB4MDAsIGxldCBsZWFkIGJlIGV1Yy1rciBsZWFkLCBsZXRcbiAgICAgIC8vIHBvaW50ZXIgYmUgbnVsbCwgc2V0IGV1Yy1rciBsZWFkIHRvIDB4MDAsIGFuZCB0aGVuIHJ1biB0aGVzZVxuICAgICAgLy8gc3Vic3RlcHM6XG4gICAgICBpZiAoZXVja3JfbGVhZCAhPT0gMHgwMCkge1xuICAgICAgICB2YXIgbGVhZCA9IGV1Y2tyX2xlYWQ7XG4gICAgICAgIHZhciBwb2ludGVyID0gbnVsbDtcbiAgICAgICAgZXVja3JfbGVhZCA9IDB4MDA7XG5cbiAgICAgICAgLy8gMS4gSWYgYnl0ZSBpcyBpbiB0aGUgcmFuZ2UgMHg0MSB0byAweEZFLCBpbmNsdXNpdmUsIHNldFxuICAgICAgICAvLyBwb2ludGVyIHRvIChsZWFkIOKIkiAweDgxKSDDlyAxOTAgKyAoYnl0ZSDiiJIgMHg0MSkuXG4gICAgICAgIGlmIChpblJhbmdlKGJpdGUsIDB4NDEsIDB4RkUpKVxuICAgICAgICAgIHBvaW50ZXIgPSAobGVhZCAtIDB4ODEpICogMTkwICsgKGJpdGUgLSAweDQxKTtcblxuICAgICAgICAvLyAyLiBMZXQgY29kZSBwb2ludCBiZSBudWxsLCBpZiBwb2ludGVyIGlzIG51bGwsIGFuZCB0aGVcbiAgICAgICAgLy8gaW5kZXggY29kZSBwb2ludCBmb3IgcG9pbnRlciBpbiBpbmRleCBldWMta3Igb3RoZXJ3aXNlLlxuICAgICAgICB2YXIgY29kZV9wb2ludCA9IChwb2ludGVyID09PSBudWxsKVxuICAgICAgICAgICAgICA/IG51bGwgOiBpbmRleENvZGVQb2ludEZvcihwb2ludGVyLCBpbmRleCgnZXVjLWtyJykpO1xuXG4gICAgICAgIC8vIDMuIElmIGNvZGUgcG9pbnQgaXMgbnVsbCBhbmQgYnl0ZSBpcyBhbiBBU0NJSSBieXRlLCBwcmVwZW5kXG4gICAgICAgIC8vIGJ5dGUgdG8gc3RyZWFtLlxuICAgICAgICBpZiAocG9pbnRlciA9PT0gbnVsbCAmJiBpc0FTQ0lJQnl0ZShiaXRlKSlcbiAgICAgICAgICBzdHJlYW0ucHJlcGVuZChiaXRlKTtcblxuICAgICAgICAvLyA0LiBJZiBjb2RlIHBvaW50IGlzIG51bGwsIHJldHVybiBlcnJvci5cbiAgICAgICAgaWYgKGNvZGVfcG9pbnQgPT09IG51bGwpXG4gICAgICAgICAgcmV0dXJuIGRlY29kZXJFcnJvcihmYXRhbCk7XG5cbiAgICAgICAgLy8gNS4gUmV0dXJuIGEgY29kZSBwb2ludCB3aG9zZSB2YWx1ZSBpcyBjb2RlIHBvaW50LlxuICAgICAgICByZXR1cm4gY29kZV9wb2ludDtcbiAgICAgIH1cblxuICAgICAgLy8gNC4gSWYgYnl0ZSBpcyBhbiBBU0NJSSBieXRlLCByZXR1cm4gYSBjb2RlIHBvaW50IHdob3NlIHZhbHVlXG4gICAgICAvLyBpcyBieXRlLlxuICAgICAgaWYgKGlzQVNDSUlCeXRlKGJpdGUpKVxuICAgICAgICByZXR1cm4gYml0ZTtcblxuICAgICAgLy8gNS4gSWYgYnl0ZSBpcyBpbiB0aGUgcmFuZ2UgMHg4MSB0byAweEZFLCBpbmNsdXNpdmUsIHNldFxuICAgICAgLy8gZXVjLWtyIGxlYWQgdG8gYnl0ZSBhbmQgcmV0dXJuIGNvbnRpbnVlLlxuICAgICAgaWYgKGluUmFuZ2UoYml0ZSwgMHg4MSwgMHhGRSkpIHtcbiAgICAgICAgZXVja3JfbGVhZCA9IGJpdGU7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyA2LiBSZXR1cm4gZXJyb3IuXG4gICAgICByZXR1cm4gZGVjb2RlckVycm9yKGZhdGFsKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gMTQuMS4yIGV1Yy1rciBlbmNvZGVyXG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGltcGxlbWVudHMge0VuY29kZXJ9XG4gICAqIEBwYXJhbSB7e2ZhdGFsOiBib29sZWFufX0gb3B0aW9uc1xuICAgKi9cbiAgZnVuY3Rpb24gRVVDS1JFbmNvZGVyKG9wdGlvbnMpIHtcbiAgICB2YXIgZmF0YWwgPSBvcHRpb25zLmZhdGFsO1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U3RyZWFtfSBzdHJlYW0gSW5wdXQgc3RyZWFtLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb2RlX3BvaW50IE5leHQgY29kZSBwb2ludCByZWFkIGZyb20gdGhlIHN0cmVhbS5cbiAgICAgKiBAcmV0dXJuIHsobnVtYmVyfCFBcnJheS48bnVtYmVyPil9IEJ5dGUocykgdG8gZW1pdC5cbiAgICAgKi9cbiAgICB0aGlzLmhhbmRsZXIgPSBmdW5jdGlvbihzdHJlYW0sIGNvZGVfcG9pbnQpIHtcbiAgICAgIC8vIDEuIElmIGNvZGUgcG9pbnQgaXMgZW5kLW9mLXN0cmVhbSwgcmV0dXJuIGZpbmlzaGVkLlxuICAgICAgaWYgKGNvZGVfcG9pbnQgPT09IGVuZF9vZl9zdHJlYW0pXG4gICAgICAgIHJldHVybiBmaW5pc2hlZDtcblxuICAgICAgLy8gMi4gSWYgY29kZSBwb2ludCBpcyBhbiBBU0NJSSBjb2RlIHBvaW50LCByZXR1cm4gYSBieXRlIHdob3NlXG4gICAgICAvLyB2YWx1ZSBpcyBjb2RlIHBvaW50LlxuICAgICAgaWYgKGlzQVNDSUlDb2RlUG9pbnQoY29kZV9wb2ludCkpXG4gICAgICAgIHJldHVybiBjb2RlX3BvaW50O1xuXG4gICAgICAvLyAzLiBMZXQgcG9pbnRlciBiZSB0aGUgaW5kZXggcG9pbnRlciBmb3IgY29kZSBwb2ludCBpbiBpbmRleFxuICAgICAgLy8gZXVjLWtyLlxuICAgICAgdmFyIHBvaW50ZXIgPSBpbmRleFBvaW50ZXJGb3IoY29kZV9wb2ludCwgaW5kZXgoJ2V1Yy1rcicpKTtcblxuICAgICAgLy8gNC4gSWYgcG9pbnRlciBpcyBudWxsLCByZXR1cm4gZXJyb3Igd2l0aCBjb2RlIHBvaW50LlxuICAgICAgaWYgKHBvaW50ZXIgPT09IG51bGwpXG4gICAgICAgIHJldHVybiBlbmNvZGVyRXJyb3IoY29kZV9wb2ludCk7XG5cbiAgICAgIC8vIDUuIExldCBsZWFkIGJlIGZsb29yKHBvaW50ZXIgLyAxOTApICsgMHg4MS5cbiAgICAgIHZhciBsZWFkID0gZmxvb3IocG9pbnRlciAvIDE5MCkgKyAweDgxO1xuXG4gICAgICAvLyA2LiBMZXQgdHJhaWwgYmUgcG9pbnRlciAlIDE5MCArIDB4NDEuXG4gICAgICB2YXIgdHJhaWwgPSAocG9pbnRlciAlIDE5MCkgKyAweDQxO1xuXG4gICAgICAvLyA3LiBSZXR1cm4gdHdvIGJ5dGVzIHdob3NlIHZhbHVlcyBhcmUgbGVhZCBhbmQgdHJhaWwuXG4gICAgICByZXR1cm4gW2xlYWQsIHRyYWlsXTtcbiAgICB9O1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7e2ZhdGFsOiBib29sZWFufX0gb3B0aW9ucyAqL1xuICBlbmNvZGVyc1snRVVDLUtSJ10gPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBFVUNLUkVuY29kZXIob3B0aW9ucyk7XG4gIH07XG4gIC8qKiBAcGFyYW0ge3tmYXRhbDogYm9vbGVhbn19IG9wdGlvbnMgKi9cbiAgZGVjb2RlcnNbJ0VVQy1LUiddID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgRVVDS1JEZWNvZGVyKG9wdGlvbnMpO1xuICB9O1xuXG5cbiAgLy9cbiAgLy8gMTUuIExlZ2FjeSBtaXNjZWxsYW5lb3VzIGVuY29kaW5nc1xuICAvL1xuXG4gIC8vIDE1LjEgcmVwbGFjZW1lbnRcblxuICAvLyBOb3QgbmVlZGVkIC0gQVBJIHRocm93cyBSYW5nZUVycm9yXG5cbiAgLy8gMTUuMiBDb21tb24gaW5mcmFzdHJ1Y3R1cmUgZm9yIHV0Zi0xNmJlIGFuZCB1dGYtMTZsZVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0gY29kZV91bml0XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gdXRmMTZiZVxuICAgKiBAcmV0dXJuIHshQXJyYXkuPG51bWJlcj59IGJ5dGVzXG4gICAqL1xuICBmdW5jdGlvbiBjb252ZXJ0Q29kZVVuaXRUb0J5dGVzKGNvZGVfdW5pdCwgdXRmMTZiZSkge1xuICAgIC8vIDEuIExldCBieXRlMSBiZSBjb2RlIHVuaXQgPj4gOC5cbiAgICB2YXIgYnl0ZTEgPSBjb2RlX3VuaXQgPj4gODtcblxuICAgIC8vIDIuIExldCBieXRlMiBiZSBjb2RlIHVuaXQgJiAweDAwRkYuXG4gICAgdmFyIGJ5dGUyID0gY29kZV91bml0ICYgMHgwMEZGO1xuXG4gICAgLy8gMy4gVGhlbiByZXR1cm4gdGhlIGJ5dGVzIGluIG9yZGVyOlxuICAgICAgICAvLyB1dGYtMTZiZSBmbGFnIGlzIHNldDogYnl0ZTEsIHRoZW4gYnl0ZTIuXG4gICAgaWYgKHV0ZjE2YmUpXG4gICAgICByZXR1cm4gW2J5dGUxLCBieXRlMl07XG4gICAgLy8gdXRmLTE2YmUgZmxhZyBpcyB1bnNldDogYnl0ZTIsIHRoZW4gYnl0ZTEuXG4gICAgcmV0dXJuIFtieXRlMiwgYnl0ZTFdO1xuICB9XG5cbiAgLy8gMTUuMi4xIHNoYXJlZCB1dGYtMTYgZGVjb2RlclxuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBpbXBsZW1lbnRzIHtEZWNvZGVyfVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHV0ZjE2X2JlIFRydWUgaWYgYmlnLWVuZGlhbiwgZmFsc2UgaWYgbGl0dGxlLWVuZGlhbi5cbiAgICogQHBhcmFtIHt7ZmF0YWw6IGJvb2xlYW59fSBvcHRpb25zXG4gICAqL1xuICBmdW5jdGlvbiBVVEYxNkRlY29kZXIodXRmMTZfYmUsIG9wdGlvbnMpIHtcbiAgICB2YXIgZmF0YWwgPSBvcHRpb25zLmZhdGFsO1xuICAgIHZhciAvKiogQHR5cGUgez9udW1iZXJ9ICovIHV0ZjE2X2xlYWRfYnl0ZSA9IG51bGwsXG4gICAgICAgIC8qKiBAdHlwZSB7P251bWJlcn0gKi8gdXRmMTZfbGVhZF9zdXJyb2dhdGUgPSBudWxsO1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U3RyZWFtfSBzdHJlYW0gVGhlIHN0cmVhbSBvZiBieXRlcyBiZWluZyBkZWNvZGVkLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBiaXRlIFRoZSBuZXh0IGJ5dGUgcmVhZCBmcm9tIHRoZSBzdHJlYW0uXG4gICAgICogQHJldHVybiB7PyhudW1iZXJ8IUFycmF5LjxudW1iZXI+KX0gVGhlIG5leHQgY29kZSBwb2ludChzKVxuICAgICAqICAgICBkZWNvZGVkLCBvciBudWxsIGlmIG5vdCBlbm91Z2ggZGF0YSBleGlzdHMgaW4gdGhlIGlucHV0XG4gICAgICogICAgIHN0cmVhbSB0byBkZWNvZGUgYSBjb21wbGV0ZSBjb2RlIHBvaW50LlxuICAgICAqL1xuICAgIHRoaXMuaGFuZGxlciA9IGZ1bmN0aW9uKHN0cmVhbSwgYml0ZSkge1xuICAgICAgLy8gMS4gSWYgYnl0ZSBpcyBlbmQtb2Ytc3RyZWFtIGFuZCBlaXRoZXIgdXRmLTE2IGxlYWQgYnl0ZSBvclxuICAgICAgLy8gdXRmLTE2IGxlYWQgc3Vycm9nYXRlIGlzIG5vdCBudWxsLCBzZXQgdXRmLTE2IGxlYWQgYnl0ZSBhbmRcbiAgICAgIC8vIHV0Zi0xNiBsZWFkIHN1cnJvZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuIGVycm9yLlxuICAgICAgaWYgKGJpdGUgPT09IGVuZF9vZl9zdHJlYW0gJiYgKHV0ZjE2X2xlYWRfYnl0ZSAhPT0gbnVsbCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGYxNl9sZWFkX3N1cnJvZ2F0ZSAhPT0gbnVsbCkpIHtcbiAgICAgICAgcmV0dXJuIGRlY29kZXJFcnJvcihmYXRhbCk7XG4gICAgICB9XG5cbiAgICAgIC8vIDIuIElmIGJ5dGUgaXMgZW5kLW9mLXN0cmVhbSBhbmQgdXRmLTE2IGxlYWQgYnl0ZSBhbmQgdXRmLTE2XG4gICAgICAvLyBsZWFkIHN1cnJvZ2F0ZSBhcmUgbnVsbCwgcmV0dXJuIGZpbmlzaGVkLlxuICAgICAgaWYgKGJpdGUgPT09IGVuZF9vZl9zdHJlYW0gJiYgdXRmMTZfbGVhZF9ieXRlID09PSBudWxsICYmXG4gICAgICAgICAgdXRmMTZfbGVhZF9zdXJyb2dhdGUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZpbmlzaGVkO1xuICAgICAgfVxuXG4gICAgICAvLyAzLiBJZiB1dGYtMTYgbGVhZCBieXRlIGlzIG51bGwsIHNldCB1dGYtMTYgbGVhZCBieXRlIHRvIGJ5dGVcbiAgICAgIC8vIGFuZCByZXR1cm4gY29udGludWUuXG4gICAgICBpZiAodXRmMTZfbGVhZF9ieXRlID09PSBudWxsKSB7XG4gICAgICAgIHV0ZjE2X2xlYWRfYnl0ZSA9IGJpdGU7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyA0LiBMZXQgY29kZSB1bml0IGJlIHRoZSByZXN1bHQgb2Y6XG4gICAgICB2YXIgY29kZV91bml0O1xuICAgICAgaWYgKHV0ZjE2X2JlKSB7XG4gICAgICAgIC8vIHV0Zi0xNmJlIGRlY29kZXIgZmxhZyBpcyBzZXRcbiAgICAgICAgLy8gICAodXRmLTE2IGxlYWQgYnl0ZSA8PCA4KSArIGJ5dGUuXG4gICAgICAgIGNvZGVfdW5pdCA9ICh1dGYxNl9sZWFkX2J5dGUgPDwgOCkgKyBiaXRlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdXRmLTE2YmUgZGVjb2RlciBmbGFnIGlzIHVuc2V0XG4gICAgICAgIC8vICAgKGJ5dGUgPDwgOCkgKyB1dGYtMTYgbGVhZCBieXRlLlxuICAgICAgICBjb2RlX3VuaXQgPSAoYml0ZSA8PCA4KSArIHV0ZjE2X2xlYWRfYnl0ZTtcbiAgICAgIH1cbiAgICAgIC8vIFRoZW4gc2V0IHV0Zi0xNiBsZWFkIGJ5dGUgdG8gbnVsbC5cbiAgICAgIHV0ZjE2X2xlYWRfYnl0ZSA9IG51bGw7XG5cbiAgICAgIC8vIDUuIElmIHV0Zi0xNiBsZWFkIHN1cnJvZ2F0ZSBpcyBub3QgbnVsbCwgbGV0IGxlYWQgc3Vycm9nYXRlXG4gICAgICAvLyBiZSB1dGYtMTYgbGVhZCBzdXJyb2dhdGUsIHNldCB1dGYtMTYgbGVhZCBzdXJyb2dhdGUgdG8gbnVsbCxcbiAgICAgIC8vIGFuZCB0aGVuIHJ1biB0aGVzZSBzdWJzdGVwczpcbiAgICAgIGlmICh1dGYxNl9sZWFkX3N1cnJvZ2F0ZSAhPT0gbnVsbCkge1xuICAgICAgICB2YXIgbGVhZF9zdXJyb2dhdGUgPSB1dGYxNl9sZWFkX3N1cnJvZ2F0ZTtcbiAgICAgICAgdXRmMTZfbGVhZF9zdXJyb2dhdGUgPSBudWxsO1xuXG4gICAgICAgIC8vIDEuIElmIGNvZGUgdW5pdCBpcyBpbiB0aGUgcmFuZ2UgVStEQzAwIHRvIFUrREZGRixcbiAgICAgICAgLy8gaW5jbHVzaXZlLCByZXR1cm4gYSBjb2RlIHBvaW50IHdob3NlIHZhbHVlIGlzIDB4MTAwMDAgK1xuICAgICAgICAvLyAoKGxlYWQgc3Vycm9nYXRlIOKIkiAweEQ4MDApIDw8IDEwKSArIChjb2RlIHVuaXQg4oiSIDB4REMwMCkuXG4gICAgICAgIGlmIChpblJhbmdlKGNvZGVfdW5pdCwgMHhEQzAwLCAweERGRkYpKSB7XG4gICAgICAgICAgcmV0dXJuIDB4MTAwMDAgKyAobGVhZF9zdXJyb2dhdGUgLSAweEQ4MDApICogMHg0MDAgK1xuICAgICAgICAgICAgICAoY29kZV91bml0IC0gMHhEQzAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDIuIFByZXBlbmQgdGhlIHNlcXVlbmNlIHJlc3VsdGluZyBvZiBjb252ZXJ0aW5nIGNvZGUgdW5pdFxuICAgICAgICAvLyB0byBieXRlcyB1c2luZyB1dGYtMTZiZSBkZWNvZGVyIGZsYWcgdG8gc3RyZWFtIGFuZCByZXR1cm5cbiAgICAgICAgLy8gZXJyb3IuXG4gICAgICAgIHN0cmVhbS5wcmVwZW5kKGNvbnZlcnRDb2RlVW5pdFRvQnl0ZXMoY29kZV91bml0LCB1dGYxNl9iZSkpO1xuICAgICAgICByZXR1cm4gZGVjb2RlckVycm9yKGZhdGFsKTtcbiAgICAgIH1cblxuICAgICAgLy8gNi4gSWYgY29kZSB1bml0IGlzIGluIHRoZSByYW5nZSBVK0Q4MDAgdG8gVStEQkZGLCBpbmNsdXNpdmUsXG4gICAgICAvLyBzZXQgdXRmLTE2IGxlYWQgc3Vycm9nYXRlIHRvIGNvZGUgdW5pdCBhbmQgcmV0dXJuIGNvbnRpbnVlLlxuICAgICAgaWYgKGluUmFuZ2UoY29kZV91bml0LCAweEQ4MDAsIDB4REJGRikpIHtcbiAgICAgICAgdXRmMTZfbGVhZF9zdXJyb2dhdGUgPSBjb2RlX3VuaXQ7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyA3LiBJZiBjb2RlIHVuaXQgaXMgaW4gdGhlIHJhbmdlIFUrREMwMCB0byBVK0RGRkYsIGluY2x1c2l2ZSxcbiAgICAgIC8vIHJldHVybiBlcnJvci5cbiAgICAgIGlmIChpblJhbmdlKGNvZGVfdW5pdCwgMHhEQzAwLCAweERGRkYpKVxuICAgICAgICByZXR1cm4gZGVjb2RlckVycm9yKGZhdGFsKTtcblxuICAgICAgLy8gOC4gUmV0dXJuIGNvZGUgcG9pbnQgY29kZSB1bml0LlxuICAgICAgcmV0dXJuIGNvZGVfdW5pdDtcbiAgICB9O1xuICB9XG5cbiAgLy8gMTUuMi4yIHNoYXJlZCB1dGYtMTYgZW5jb2RlclxuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBpbXBsZW1lbnRzIHtFbmNvZGVyfVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHV0ZjE2X2JlIFRydWUgaWYgYmlnLWVuZGlhbiwgZmFsc2UgaWYgbGl0dGxlLWVuZGlhbi5cbiAgICogQHBhcmFtIHt7ZmF0YWw6IGJvb2xlYW59fSBvcHRpb25zXG4gICAqL1xuICBmdW5jdGlvbiBVVEYxNkVuY29kZXIodXRmMTZfYmUsIG9wdGlvbnMpIHtcbiAgICB2YXIgZmF0YWwgPSBvcHRpb25zLmZhdGFsO1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U3RyZWFtfSBzdHJlYW0gSW5wdXQgc3RyZWFtLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb2RlX3BvaW50IE5leHQgY29kZSBwb2ludCByZWFkIGZyb20gdGhlIHN0cmVhbS5cbiAgICAgKiBAcmV0dXJuIHsobnVtYmVyfCFBcnJheS48bnVtYmVyPil9IEJ5dGUocykgdG8gZW1pdC5cbiAgICAgKi9cbiAgICB0aGlzLmhhbmRsZXIgPSBmdW5jdGlvbihzdHJlYW0sIGNvZGVfcG9pbnQpIHtcbiAgICAgIC8vIDEuIElmIGNvZGUgcG9pbnQgaXMgZW5kLW9mLXN0cmVhbSwgcmV0dXJuIGZpbmlzaGVkLlxuICAgICAgaWYgKGNvZGVfcG9pbnQgPT09IGVuZF9vZl9zdHJlYW0pXG4gICAgICAgIHJldHVybiBmaW5pc2hlZDtcblxuICAgICAgLy8gMi4gSWYgY29kZSBwb2ludCBpcyBpbiB0aGUgcmFuZ2UgVSswMDAwIHRvIFUrRkZGRiwgaW5jbHVzaXZlLFxuICAgICAgLy8gcmV0dXJuIHRoZSBzZXF1ZW5jZSByZXN1bHRpbmcgb2YgY29udmVydGluZyBjb2RlIHBvaW50IHRvXG4gICAgICAvLyBieXRlcyB1c2luZyB1dGYtMTZiZSBlbmNvZGVyIGZsYWcuXG4gICAgICBpZiAoaW5SYW5nZShjb2RlX3BvaW50LCAweDAwMDAsIDB4RkZGRikpXG4gICAgICAgIHJldHVybiBjb252ZXJ0Q29kZVVuaXRUb0J5dGVzKGNvZGVfcG9pbnQsIHV0ZjE2X2JlKTtcblxuICAgICAgLy8gMy4gTGV0IGxlYWQgYmUgKChjb2RlIHBvaW50IOKIkiAweDEwMDAwKSA+PiAxMCkgKyAweEQ4MDAsXG4gICAgICAvLyBjb252ZXJ0ZWQgdG8gYnl0ZXMgdXNpbmcgdXRmLTE2YmUgZW5jb2RlciBmbGFnLlxuICAgICAgdmFyIGxlYWQgPSBjb252ZXJ0Q29kZVVuaXRUb0J5dGVzKFxuICAgICAgICAoKGNvZGVfcG9pbnQgLSAweDEwMDAwKSA+PiAxMCkgKyAweEQ4MDAsIHV0ZjE2X2JlKTtcblxuICAgICAgLy8gNC4gTGV0IHRyYWlsIGJlICgoY29kZSBwb2ludCDiiJIgMHgxMDAwMCkgJiAweDNGRikgKyAweERDMDAsXG4gICAgICAvLyBjb252ZXJ0ZWQgdG8gYnl0ZXMgdXNpbmcgdXRmLTE2YmUgZW5jb2RlciBmbGFnLlxuICAgICAgdmFyIHRyYWlsID0gY29udmVydENvZGVVbml0VG9CeXRlcyhcbiAgICAgICAgKChjb2RlX3BvaW50IC0gMHgxMDAwMCkgJiAweDNGRikgKyAweERDMDAsIHV0ZjE2X2JlKTtcblxuICAgICAgLy8gNS4gUmV0dXJuIGEgYnl0ZSBzZXF1ZW5jZSBvZiBsZWFkIGZvbGxvd2VkIGJ5IHRyYWlsLlxuICAgICAgcmV0dXJuIGxlYWQuY29uY2F0KHRyYWlsKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gMTUuMyB1dGYtMTZiZVxuICAvLyAxNS4zLjEgdXRmLTE2YmUgZGVjb2RlclxuICAvKiogQHBhcmFtIHt7ZmF0YWw6IGJvb2xlYW59fSBvcHRpb25zICovXG4gIGVuY29kZXJzWydVVEYtMTZCRSddID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgVVRGMTZFbmNvZGVyKHRydWUsIG9wdGlvbnMpO1xuICB9O1xuICAvLyAxNS4zLjIgdXRmLTE2YmUgZW5jb2RlclxuICAvKiogQHBhcmFtIHt7ZmF0YWw6IGJvb2xlYW59fSBvcHRpb25zICovXG4gIGRlY29kZXJzWydVVEYtMTZCRSddID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgVVRGMTZEZWNvZGVyKHRydWUsIG9wdGlvbnMpO1xuICB9O1xuXG4gIC8vIDE1LjQgdXRmLTE2bGVcbiAgLy8gMTUuNC4xIHV0Zi0xNmxlIGRlY29kZXJcbiAgLyoqIEBwYXJhbSB7e2ZhdGFsOiBib29sZWFufX0gb3B0aW9ucyAqL1xuICBlbmNvZGVyc1snVVRGLTE2TEUnXSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFVURjE2RW5jb2RlcihmYWxzZSwgb3B0aW9ucyk7XG4gIH07XG4gIC8vIDE1LjQuMiB1dGYtMTZsZSBlbmNvZGVyXG4gIC8qKiBAcGFyYW0ge3tmYXRhbDogYm9vbGVhbn19IG9wdGlvbnMgKi9cbiAgZGVjb2RlcnNbJ1VURi0xNkxFJ10gPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBVVEYxNkRlY29kZXIoZmFsc2UsIG9wdGlvbnMpO1xuICB9O1xuXG4gIC8vIDE1LjUgeC11c2VyLWRlZmluZWRcblxuICAvLyAxNS41LjEgeC11c2VyLWRlZmluZWQgZGVjb2RlclxuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBpbXBsZW1lbnRzIHtEZWNvZGVyfVxuICAgKiBAcGFyYW0ge3tmYXRhbDogYm9vbGVhbn19IG9wdGlvbnNcbiAgICovXG4gIGZ1bmN0aW9uIFhVc2VyRGVmaW5lZERlY29kZXIob3B0aW9ucykge1xuICAgIHZhciBmYXRhbCA9IG9wdGlvbnMuZmF0YWw7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbSBUaGUgc3RyZWFtIG9mIGJ5dGVzIGJlaW5nIGRlY29kZWQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGJpdGUgVGhlIG5leHQgYnl0ZSByZWFkIGZyb20gdGhlIHN0cmVhbS5cbiAgICAgKiBAcmV0dXJuIHs/KG51bWJlcnwhQXJyYXkuPG51bWJlcj4pfSBUaGUgbmV4dCBjb2RlIHBvaW50KHMpXG4gICAgICogICAgIGRlY29kZWQsIG9yIG51bGwgaWYgbm90IGVub3VnaCBkYXRhIGV4aXN0cyBpbiB0aGUgaW5wdXRcbiAgICAgKiAgICAgc3RyZWFtIHRvIGRlY29kZSBhIGNvbXBsZXRlIGNvZGUgcG9pbnQuXG4gICAgICovXG4gICAgdGhpcy5oYW5kbGVyID0gZnVuY3Rpb24oc3RyZWFtLCBiaXRlKSB7XG4gICAgICAvLyAxLiBJZiBieXRlIGlzIGVuZC1vZi1zdHJlYW0sIHJldHVybiBmaW5pc2hlZC5cbiAgICAgIGlmIChiaXRlID09PSBlbmRfb2Zfc3RyZWFtKVxuICAgICAgICByZXR1cm4gZmluaXNoZWQ7XG5cbiAgICAgIC8vIDIuIElmIGJ5dGUgaXMgYW4gQVNDSUkgYnl0ZSwgcmV0dXJuIGEgY29kZSBwb2ludCB3aG9zZSB2YWx1ZVxuICAgICAgLy8gaXMgYnl0ZS5cbiAgICAgIGlmIChpc0FTQ0lJQnl0ZShiaXRlKSlcbiAgICAgICAgcmV0dXJuIGJpdGU7XG5cbiAgICAgIC8vIDMuIFJldHVybiBhIGNvZGUgcG9pbnQgd2hvc2UgdmFsdWUgaXMgMHhGNzgwICsgYnl0ZSDiiJIgMHg4MC5cbiAgICAgIHJldHVybiAweEY3ODAgKyBiaXRlIC0gMHg4MDtcbiAgICB9O1xuICB9XG5cbiAgLy8gMTUuNS4yIHgtdXNlci1kZWZpbmVkIGVuY29kZXJcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAaW1wbGVtZW50cyB7RW5jb2Rlcn1cbiAgICogQHBhcmFtIHt7ZmF0YWw6IGJvb2xlYW59fSBvcHRpb25zXG4gICAqL1xuICBmdW5jdGlvbiBYVXNlckRlZmluZWRFbmNvZGVyKG9wdGlvbnMpIHtcbiAgICB2YXIgZmF0YWwgPSBvcHRpb25zLmZhdGFsO1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U3RyZWFtfSBzdHJlYW0gSW5wdXQgc3RyZWFtLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb2RlX3BvaW50IE5leHQgY29kZSBwb2ludCByZWFkIGZyb20gdGhlIHN0cmVhbS5cbiAgICAgKiBAcmV0dXJuIHsobnVtYmVyfCFBcnJheS48bnVtYmVyPil9IEJ5dGUocykgdG8gZW1pdC5cbiAgICAgKi9cbiAgICB0aGlzLmhhbmRsZXIgPSBmdW5jdGlvbihzdHJlYW0sIGNvZGVfcG9pbnQpIHtcbiAgICAgIC8vIDEuSWYgY29kZSBwb2ludCBpcyBlbmQtb2Ytc3RyZWFtLCByZXR1cm4gZmluaXNoZWQuXG4gICAgICBpZiAoY29kZV9wb2ludCA9PT0gZW5kX29mX3N0cmVhbSlcbiAgICAgICAgcmV0dXJuIGZpbmlzaGVkO1xuXG4gICAgICAvLyAyLiBJZiBjb2RlIHBvaW50IGlzIGFuIEFTQ0lJIGNvZGUgcG9pbnQsIHJldHVybiBhIGJ5dGUgd2hvc2VcbiAgICAgIC8vIHZhbHVlIGlzIGNvZGUgcG9pbnQuXG4gICAgICBpZiAoaXNBU0NJSUNvZGVQb2ludChjb2RlX3BvaW50KSlcbiAgICAgICAgcmV0dXJuIGNvZGVfcG9pbnQ7XG5cbiAgICAgIC8vIDMuIElmIGNvZGUgcG9pbnQgaXMgaW4gdGhlIHJhbmdlIFUrRjc4MCB0byBVK0Y3RkYsIGluY2x1c2l2ZSxcbiAgICAgIC8vIHJldHVybiBhIGJ5dGUgd2hvc2UgdmFsdWUgaXMgY29kZSBwb2ludCDiiJIgMHhGNzgwICsgMHg4MC5cbiAgICAgIGlmIChpblJhbmdlKGNvZGVfcG9pbnQsIDB4Rjc4MCwgMHhGN0ZGKSlcbiAgICAgICAgcmV0dXJuIGNvZGVfcG9pbnQgLSAweEY3ODAgKyAweDgwO1xuXG4gICAgICAvLyA0LiBSZXR1cm4gZXJyb3Igd2l0aCBjb2RlIHBvaW50LlxuICAgICAgcmV0dXJuIGVuY29kZXJFcnJvcihjb2RlX3BvaW50KTtcbiAgICB9O1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7e2ZhdGFsOiBib29sZWFufX0gb3B0aW9ucyAqL1xuICBlbmNvZGVyc1sneC11c2VyLWRlZmluZWQnXSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFhVc2VyRGVmaW5lZEVuY29kZXIob3B0aW9ucyk7XG4gIH07XG4gIC8qKiBAcGFyYW0ge3tmYXRhbDogYm9vbGVhbn19IG9wdGlvbnMgKi9cbiAgZGVjb2RlcnNbJ3gtdXNlci1kZWZpbmVkJ10gPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBYVXNlckRlZmluZWREZWNvZGVyKG9wdGlvbnMpO1xuICB9O1xuXG4gIGlmICghZ2xvYmFsWydUZXh0RW5jb2RlciddKVxuICAgIGdsb2JhbFsnVGV4dEVuY29kZXInXSA9IFRleHRFbmNvZGVyO1xuICBpZiAoIWdsb2JhbFsnVGV4dERlY29kZXInXSlcbiAgICBnbG9iYWxbJ1RleHREZWNvZGVyJ10gPSBUZXh0RGVjb2RlcjtcblxuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0ge1xuICAgICAgVGV4dEVuY29kZXI6IGdsb2JhbFsnVGV4dEVuY29kZXInXSxcbiAgICAgIFRleHREZWNvZGVyOiBnbG9iYWxbJ1RleHREZWNvZGVyJ10sXG4gICAgICBFbmNvZGluZ0luZGV4ZXM6IGdsb2JhbFtcImVuY29kaW5nLWluZGV4ZXNcIl1cbiAgICB9O1xuICB9XG5cbi8vIEZvciBzdHJpY3QgZW52aXJvbm1lbnRzIHdoZXJlIGB0aGlzYCBpbnNpZGUgdGhlIGdsb2JhbCBzY29wZVxuLy8gaXMgYHVuZGVmaW5lZGAsIHRha2UgYSBwdXJlIG9iamVjdCBpbnN0ZWFkXG59KHRoaXMgfHwge30pKTsiLCJ2YXIgc2NvcGUgPSAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwpIHx8XG4gICAgICAgICAgICAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZikgfHxcbiAgICAgICAgICAgIHdpbmRvdztcbnZhciBhcHBseSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseTtcblxuLy8gRE9NIEFQSXMsIGZvciBjb21wbGV0ZW5lc3NcblxuZXhwb3J0cy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldFRpbWVvdXQsIHNjb3BlLCBhcmd1bWVudHMpLCBjbGVhclRpbWVvdXQpO1xufTtcbmV4cG9ydHMuc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0SW50ZXJ2YWwsIHNjb3BlLCBhcmd1bWVudHMpLCBjbGVhckludGVydmFsKTtcbn07XG5leHBvcnRzLmNsZWFyVGltZW91dCA9XG5leHBvcnRzLmNsZWFySW50ZXJ2YWwgPSBmdW5jdGlvbih0aW1lb3V0KSB7XG4gIGlmICh0aW1lb3V0KSB7XG4gICAgdGltZW91dC5jbG9zZSgpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBUaW1lb3V0KGlkLCBjbGVhckZuKSB7XG4gIHRoaXMuX2lkID0gaWQ7XG4gIHRoaXMuX2NsZWFyRm4gPSBjbGVhckZuO1xufVxuVGltZW91dC5wcm90b3R5cGUudW5yZWYgPSBUaW1lb3V0LnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbigpIHt9O1xuVGltZW91dC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fY2xlYXJGbi5jYWxsKHNjb3BlLCB0aGlzLl9pZCk7XG59O1xuXG4vLyBEb2VzIG5vdCBzdGFydCB0aGUgdGltZSwganVzdCBzZXRzIHVwIHRoZSBtZW1iZXJzIG5lZWRlZC5cbmV4cG9ydHMuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSwgbXNlY3MpIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IG1zZWNzO1xufTtcblxuZXhwb3J0cy51bmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IC0xO1xufTtcblxuZXhwb3J0cy5fdW5yZWZBY3RpdmUgPSBleHBvcnRzLmFjdGl2ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuXG4gIHZhciBtc2VjcyA9IGl0ZW0uX2lkbGVUaW1lb3V0O1xuICBpZiAobXNlY3MgPj0gMCkge1xuICAgIGl0ZW0uX2lkbGVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIG9uVGltZW91dCgpIHtcbiAgICAgIGlmIChpdGVtLl9vblRpbWVvdXQpXG4gICAgICAgIGl0ZW0uX29uVGltZW91dCgpO1xuICAgIH0sIG1zZWNzKTtcbiAgfVxufTtcblxuLy8gc2V0aW1tZWRpYXRlIGF0dGFjaGVzIGl0c2VsZiB0byB0aGUgZ2xvYmFsIG9iamVjdFxucmVxdWlyZShcInNldGltbWVkaWF0ZVwiKTtcbi8vIE9uIHNvbWUgZXhvdGljIGVudmlyb25tZW50cywgaXQncyBub3QgY2xlYXIgd2hpY2ggb2JqZWN0IGBzZXRpbW1lZGlhdGVgIHdhc1xuLy8gYWJsZSB0byBpbnN0YWxsIG9udG8uICBTZWFyY2ggZWFjaCBwb3NzaWJpbGl0eSBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGVcbi8vIGBzZXRpbW1lZGlhdGVgIGxpYnJhcnkuXG5leHBvcnRzLnNldEltbWVkaWF0ZSA9ICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLnNldEltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLnNldEltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMgJiYgdGhpcy5zZXRJbW1lZGlhdGUpO1xuZXhwb3J0cy5jbGVhckltbWVkaWF0ZSA9ICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLmNsZWFySW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbC5jbGVhckltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcyAmJiB0aGlzLmNsZWFySW1tZWRpYXRlKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCdmdW5jdGlvbi1iaW5kJyk7XG52YXIgRVMgPSByZXF1aXJlKCdlcy1hYnN0cmFjdC9lczUnKTtcbnZhciByZXBsYWNlID0gYmluZC5jYWxsKEZ1bmN0aW9uLmNhbGwsIFN0cmluZy5wcm90b3R5cGUucmVwbGFjZSk7XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnRyb2wtcmVnZXggKi9cbnZhciBsZWZ0V2hpdGVzcGFjZSA9IC9eW1xceDA5XFx4MEFcXHgwQlxceDBDXFx4MERcXHgyMFxceEEwXFx1MTY4MFxcdTE4MEVcXHUyMDAwXFx1MjAwMVxcdTIwMDJcXHUyMDAzXFx1MjAwNFxcdTIwMDVcXHUyMDA2XFx1MjAwN1xcdTIwMDhcXHUyMDA5XFx1MjAwQVxcdTIwMkZcXHUyMDVGXFx1MzAwMFxcdTIwMjhcXHUyMDI5XFx1RkVGRl0rLztcbnZhciByaWdodFdoaXRlc3BhY2UgPSAvW1xceDA5XFx4MEFcXHgwQlxceDBDXFx4MERcXHgyMFxceEEwXFx1MTY4MFxcdTE4MEVcXHUyMDAwXFx1MjAwMVxcdTIwMDJcXHUyMDAzXFx1MjAwNFxcdTIwMDVcXHUyMDA2XFx1MjAwN1xcdTIwMDhcXHUyMDA5XFx1MjAwQVxcdTIwMkZcXHUyMDVGXFx1MzAwMFxcdTIwMjhcXHUyMDI5XFx1RkVGRl0rJC87XG4vKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnRyb2wtcmVnZXggKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmltKCkge1xuXHR2YXIgUyA9IEVTLlRvU3RyaW5nKEVTLkNoZWNrT2JqZWN0Q29lcmNpYmxlKHRoaXMpKTtcblx0cmV0dXJuIHJlcGxhY2UocmVwbGFjZShTLCBsZWZ0V2hpdGVzcGFjZSwgJycpLCByaWdodFdoaXRlc3BhY2UsICcnKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIpIHtcblx0cmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoL1shJygpKl0vZywgZnVuY3Rpb24gKGMpIHtcblx0XHRyZXR1cm4gJyUnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuXHR9KTtcbn07XG4iLCIvLyBUaGFua3MgaHR0cHM6Ly9naXRodWIuY29tL2F4aWMvc3dhcm1oYXNoXG52YXIga2VjY2FrID0gcmVxdWlyZShcImV0aC1saWIvbGliL2hhc2hcIikua2VjY2FrMjU2O1xuXG52YXIgQnl0ZXMgPSByZXF1aXJlKFwiZXRoLWxpYi9saWIvYnl0ZXNcIik7XG5cbnZhciBzd2FybUhhc2hCbG9jayA9IGZ1bmN0aW9uIHN3YXJtSGFzaEJsb2NrKGxlbmd0aCwgZGF0YSkge1xuICB2YXIgbGVuZ3RoRW5jb2RlZCA9IEJ5dGVzLnJldmVyc2UoQnl0ZXMucGFkKDYsIEJ5dGVzLmZyb21OdW1iZXIobGVuZ3RoKSkpO1xuICB2YXIgYnl0ZXMgPSBCeXRlcy5mbGF0dGVuKFtsZW5ndGhFbmNvZGVkLCBcIjB4MDAwMFwiLCBkYXRhXSk7XG4gIHJldHVybiBrZWNjYWsoYnl0ZXMpLnNsaWNlKDIpO1xufTsgLy8gKEJ5dGVzIHwgVWludDhBcnJheSB8IFN0cmluZykgLT4gU3RyaW5nXG5cblxudmFyIHN3YXJtSGFzaCA9IGZ1bmN0aW9uIHN3YXJtSGFzaChkYXRhKSB7XG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIiAmJiBkYXRhLnNsaWNlKDAsIDIpICE9PSBcIjB4XCIpIHtcbiAgICBkYXRhID0gQnl0ZXMuZnJvbVN0cmluZyhkYXRhKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGF0YSAhPT0gXCJzdHJpbmdcIiAmJiBkYXRhLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZGF0YSA9IEJ5dGVzLmZyb21VaW50OEFycmF5KGRhdGEpO1xuICB9XG5cbiAgdmFyIGxlbmd0aCA9IEJ5dGVzLmxlbmd0aChkYXRhKTtcblxuICBpZiAobGVuZ3RoIDw9IDQwOTYpIHtcbiAgICByZXR1cm4gc3dhcm1IYXNoQmxvY2sobGVuZ3RoLCBkYXRhKTtcbiAgfVxuXG4gIHZhciBtYXhTaXplID0gNDA5NjtcblxuICB3aGlsZSAobWF4U2l6ZSAqICg0MDk2IC8gMzIpIDwgbGVuZ3RoKSB7XG4gICAgbWF4U2l6ZSAqPSA0MDk2IC8gMzI7XG4gIH1cblxuICB2YXIgaW5uZXJOb2RlcyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IG1heFNpemUpIHtcbiAgICB2YXIgc2l6ZSA9IG1heFNpemUgPCBsZW5ndGggLSBpID8gbWF4U2l6ZSA6IGxlbmd0aCAtIGk7XG4gICAgaW5uZXJOb2Rlcy5wdXNoKHN3YXJtSGFzaChCeXRlcy5zbGljZShkYXRhLCBpLCBpICsgc2l6ZSkpKTtcbiAgfVxuXG4gIHJldHVybiBzd2FybUhhc2hCbG9jayhsZW5ndGgsIEJ5dGVzLmZsYXR0ZW4oaW5uZXJOb2RlcykpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzd2FybUhhc2g7IiwidmFyIGlzSGV4UHJlZml4ZWQgPSByZXF1aXJlKCdpcy1oZXgtcHJlZml4ZWQnKTtcblxuLyoqXG4gKiBSZW1vdmVzICcweCcgZnJvbSBhIGdpdmVuIGBTdHJpbmdgIGlzIHByZXNlbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgdGhlIHN0cmluZyB2YWx1ZVxuICogQHJldHVybiB7U3RyaW5nfE9wdGlvbmFsfSBhIHN0cmluZyBieSBwYXNzIGlmIG5lY2Vzc2FyeVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN0cmlwSGV4UHJlZml4KHN0cikge1xuICBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgcmV0dXJuIGlzSGV4UHJlZml4ZWQoc3RyKSA/IHN0ci5zbGljZSgyKSA6IHN0cjtcbn1cbiIsIihmdW5jdGlvbiAoZ2xvYmFsLCB1bmRlZmluZWQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmIChnbG9iYWwuc2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbmV4dEhhbmRsZSA9IDE7IC8vIFNwZWMgc2F5cyBncmVhdGVyIHRoYW4gemVyb1xuICAgIHZhciB0YXNrc0J5SGFuZGxlID0ge307XG4gICAgdmFyIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgIHZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG4gICAgdmFyIHJlZ2lzdGVySW1tZWRpYXRlO1xuXG4gICAgZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGNhbGxiYWNrKSB7XG4gICAgICAvLyBDYWxsYmFjayBjYW4gZWl0aGVyIGJlIGEgZnVuY3Rpb24gb3IgYSBzdHJpbmdcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjYWxsYmFjayA9IG5ldyBGdW5jdGlvbihcIlwiICsgY2FsbGJhY2spO1xuICAgICAgfVxuICAgICAgLy8gQ29weSBmdW5jdGlvbiBhcmd1bWVudHNcbiAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaSArIDFdO1xuICAgICAgfVxuICAgICAgLy8gU3RvcmUgYW5kIHJlZ2lzdGVyIHRoZSB0YXNrXG4gICAgICB2YXIgdGFzayA9IHsgY2FsbGJhY2s6IGNhbGxiYWNrLCBhcmdzOiBhcmdzIH07XG4gICAgICB0YXNrc0J5SGFuZGxlW25leHRIYW5kbGVdID0gdGFzaztcbiAgICAgIHJlZ2lzdGVySW1tZWRpYXRlKG5leHRIYW5kbGUpO1xuICAgICAgcmV0dXJuIG5leHRIYW5kbGUrKztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShoYW5kbGUpIHtcbiAgICAgICAgZGVsZXRlIHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW4odGFzaykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0YXNrLmNhbGxiYWNrO1xuICAgICAgICB2YXIgYXJncyA9IHRhc2suYXJncztcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW5JZlByZXNlbnQoaGFuZGxlKSB7XG4gICAgICAgIC8vIEZyb20gdGhlIHNwZWM6IFwiV2FpdCB1bnRpbCBhbnkgaW52b2NhdGlvbnMgb2YgdGhpcyBhbGdvcml0aG0gc3RhcnRlZCBiZWZvcmUgdGhpcyBvbmUgaGF2ZSBjb21wbGV0ZWQuXCJcbiAgICAgICAgLy8gU28gaWYgd2UncmUgY3VycmVudGx5IHJ1bm5pbmcgYSB0YXNrLCB3ZSdsbCBuZWVkIHRvIGRlbGF5IHRoaXMgaW52b2NhdGlvbi5cbiAgICAgICAgaWYgKGN1cnJlbnRseVJ1bm5pbmdBVGFzaykge1xuICAgICAgICAgICAgLy8gRGVsYXkgYnkgZG9pbmcgYSBzZXRUaW1lb3V0LiBzZXRJbW1lZGlhdGUgd2FzIHRyaWVkIGluc3RlYWQsIGJ1dCBpbiBGaXJlZm94IDcgaXQgZ2VuZXJhdGVkIGFcbiAgICAgICAgICAgIC8vIFwidG9vIG11Y2ggcmVjdXJzaW9uXCIgZXJyb3IuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB0YXNrID0gdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgICAgICAgICAgaWYgKHRhc2spIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bih0YXNrKTtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckltbWVkaWF0ZShoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gKCkgeyBydW5JZlByZXNlbnQoaGFuZGxlKTsgfSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FuVXNlUG9zdE1lc3NhZ2UoKSB7XG4gICAgICAgIC8vIFRoZSB0ZXN0IGFnYWluc3QgYGltcG9ydFNjcmlwdHNgIHByZXZlbnRzIHRoaXMgaW1wbGVtZW50YXRpb24gZnJvbSBiZWluZyBpbnN0YWxsZWQgaW5zaWRlIGEgd2ViIHdvcmtlcixcbiAgICAgICAgLy8gd2hlcmUgYGdsb2JhbC5wb3N0TWVzc2FnZWAgbWVhbnMgc29tZXRoaW5nIGNvbXBsZXRlbHkgZGlmZmVyZW50IGFuZCBjYW4ndCBiZSB1c2VkIGZvciB0aGlzIHB1cnBvc2UuXG4gICAgICAgIGlmIChnbG9iYWwucG9zdE1lc3NhZ2UgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgICAgICAgICB2YXIgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IHRydWU7XG4gICAgICAgICAgICB2YXIgb2xkT25NZXNzYWdlID0gZ2xvYmFsLm9ubWVzc2FnZTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKFwiXCIsIFwiKlwiKTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBvbGRPbk1lc3NhZ2U7XG4gICAgICAgICAgICByZXR1cm4gcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICAvLyBJbnN0YWxscyBhbiBldmVudCBoYW5kbGVyIG9uIGBnbG9iYWxgIGZvciB0aGUgYG1lc3NhZ2VgIGV2ZW50OiBzZWVcbiAgICAgICAgLy8gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9ET00vd2luZG93LnBvc3RNZXNzYWdlXG4gICAgICAgIC8vICogaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvY29tbXMuaHRtbCNjcm9zc0RvY3VtZW50TWVzc2FnZXNcblxuICAgICAgICB2YXIgbWVzc2FnZVByZWZpeCA9IFwic2V0SW1tZWRpYXRlJFwiICsgTWF0aC5yYW5kb20oKSArIFwiJFwiO1xuICAgICAgICB2YXIgb25HbG9iYWxNZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2UgPT09IGdsb2JhbCAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBldmVudC5kYXRhID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICAgICAgZXZlbnQuZGF0YS5pbmRleE9mKG1lc3NhZ2VQcmVmaXgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KCtldmVudC5kYXRhLnNsaWNlKG1lc3NhZ2VQcmVmaXgubGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnbG9iYWwuYXR0YWNoRXZlbnQoXCJvbm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UobWVzc2FnZVByZWZpeCArIGhhbmRsZSwgXCIqXCIpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgaGFuZGxlID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGh0bWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgPHNjcmlwdD4gZWxlbWVudDsgaXRzIHJlYWR5c3RhdGVjaGFuZ2UgZXZlbnQgd2lsbCBiZSBmaXJlZCBhc3luY2hyb25vdXNseSBvbmNlIGl0IGlzIGluc2VydGVkXG4gICAgICAgICAgICAvLyBpbnRvIHRoZSBkb2N1bWVudC4gRG8gc28sIHRodXMgcXVldWluZyB1cCB0aGUgdGFzay4gUmVtZW1iZXIgdG8gY2xlYW4gdXAgb25jZSBpdCdzIGJlZW4gY2FsbGVkLlxuICAgICAgICAgICAgdmFyIHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICAgICAgc2NyaXB0ID0gbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBodG1sLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIElmIHN1cHBvcnRlZCwgd2Ugc2hvdWxkIGF0dGFjaCB0byB0aGUgcHJvdG90eXBlIG9mIGdsb2JhbCwgc2luY2UgdGhhdCBpcyB3aGVyZSBzZXRUaW1lb3V0IGV0IGFsLiBsaXZlLlxuICAgIHZhciBhdHRhY2hUbyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZ2xvYmFsKTtcbiAgICBhdHRhY2hUbyA9IGF0dGFjaFRvICYmIGF0dGFjaFRvLnNldFRpbWVvdXQgPyBhdHRhY2hUbyA6IGdsb2JhbDtcblxuICAgIC8vIERvbid0IGdldCBmb29sZWQgYnkgZS5nLiBicm93c2VyaWZ5IGVudmlyb25tZW50cy5cbiAgICBpZiAoe30udG9TdHJpbmcuY2FsbChnbG9iYWwucHJvY2VzcykgPT09IFwiW29iamVjdCBwcm9jZXNzXVwiKSB7XG4gICAgICAgIC8vIEZvciBOb2RlLmpzIGJlZm9yZSAwLjlcbiAgICAgICAgaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoY2FuVXNlUG9zdE1lc3NhZ2UoKSkge1xuICAgICAgICAvLyBGb3Igbm9uLUlFMTAgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGdsb2JhbC5NZXNzYWdlQ2hhbm5lbCkge1xuICAgICAgICAvLyBGb3Igd2ViIHdvcmtlcnMsIHdoZXJlIHN1cHBvcnRlZFxuICAgICAgICBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChkb2MgJiYgXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIiBpbiBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSkge1xuICAgICAgICAvLyBGb3IgSUUgNuKAkzhcbiAgICAgICAgaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRm9yIG9sZGVyIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKTtcbiAgICB9XG5cbiAgICBhdHRhY2hUby5zZXRJbW1lZGlhdGUgPSBzZXRJbW1lZGlhdGU7XG4gICAgYXR0YWNoVG8uY2xlYXJJbW1lZGlhdGUgPSBjbGVhckltbWVkaWF0ZTtcbn0odHlwZW9mIHNlbGYgPT09IFwidW5kZWZpbmVkXCIgPyB0eXBlb2YgZ2xvYmFsID09PSBcInVuZGVmaW5lZFwiID8gdGhpcyA6IGdsb2JhbCA6IHNlbGYpKTtcbiIsInZhciBjYXBhYmlsaXR5ID0gcmVxdWlyZSgnLi9jYXBhYmlsaXR5JylcbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJylcbnZhciByZXNwb25zZSA9IHJlcXVpcmUoJy4vcmVzcG9uc2UnKVxudmFyIHN0cmVhbSA9IHJlcXVpcmUoJ3JlYWRhYmxlLXN0cmVhbScpXG52YXIgdG9BcnJheUJ1ZmZlciA9IHJlcXVpcmUoJ3RvLWFycmF5YnVmZmVyJylcblxudmFyIEluY29taW5nTWVzc2FnZSA9IHJlc3BvbnNlLkluY29taW5nTWVzc2FnZVxudmFyIHJTdGF0ZXMgPSByZXNwb25zZS5yZWFkeVN0YXRlc1xuXG5mdW5jdGlvbiBkZWNpZGVNb2RlIChwcmVmZXJCaW5hcnksIHVzZUZldGNoKSB7XG5cdGlmIChjYXBhYmlsaXR5LmZldGNoICYmIHVzZUZldGNoKSB7XG5cdFx0cmV0dXJuICdmZXRjaCdcblx0fSBlbHNlIGlmIChjYXBhYmlsaXR5Lm1vemNodW5rZWRhcnJheWJ1ZmZlcikge1xuXHRcdHJldHVybiAnbW96LWNodW5rZWQtYXJyYXlidWZmZXInXG5cdH0gZWxzZSBpZiAoY2FwYWJpbGl0eS5tc3N0cmVhbSkge1xuXHRcdHJldHVybiAnbXMtc3RyZWFtJ1xuXHR9IGVsc2UgaWYgKGNhcGFiaWxpdHkuYXJyYXlidWZmZXIgJiYgcHJlZmVyQmluYXJ5KSB7XG5cdFx0cmV0dXJuICdhcnJheWJ1ZmZlcidcblx0fSBlbHNlIGlmIChjYXBhYmlsaXR5LnZiQXJyYXkgJiYgcHJlZmVyQmluYXJ5KSB7XG5cdFx0cmV0dXJuICd0ZXh0OnZiYXJyYXknXG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuICd0ZXh0J1xuXHR9XG59XG5cbnZhciBDbGllbnRSZXF1ZXN0ID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0cykge1xuXHR2YXIgc2VsZiA9IHRoaXNcblx0c3RyZWFtLldyaXRhYmxlLmNhbGwoc2VsZilcblxuXHRzZWxmLl9vcHRzID0gb3B0c1xuXHRzZWxmLl9ib2R5ID0gW11cblx0c2VsZi5faGVhZGVycyA9IHt9XG5cdGlmIChvcHRzLmF1dGgpXG5cdFx0c2VsZi5zZXRIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArIG5ldyBCdWZmZXIob3B0cy5hdXRoKS50b1N0cmluZygnYmFzZTY0JykpXG5cdE9iamVjdC5rZXlzKG9wdHMuaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuXHRcdHNlbGYuc2V0SGVhZGVyKG5hbWUsIG9wdHMuaGVhZGVyc1tuYW1lXSlcblx0fSlcblxuXHR2YXIgcHJlZmVyQmluYXJ5XG5cdHZhciB1c2VGZXRjaCA9IHRydWVcblx0aWYgKG9wdHMubW9kZSA9PT0gJ2Rpc2FibGUtZmV0Y2gnIHx8ICgncmVxdWVzdFRpbWVvdXQnIGluIG9wdHMgJiYgIWNhcGFiaWxpdHkuYWJvcnRDb250cm9sbGVyKSkge1xuXHRcdC8vIElmIHRoZSB1c2Ugb2YgWEhSIHNob3VsZCBiZSBwcmVmZXJyZWQuIE5vdCB0eXBpY2FsbHkgbmVlZGVkLlxuXHRcdHVzZUZldGNoID0gZmFsc2Vcblx0XHRwcmVmZXJCaW5hcnkgPSB0cnVlXG5cdH0gZWxzZSBpZiAob3B0cy5tb2RlID09PSAncHJlZmVyLXN0cmVhbWluZycpIHtcblx0XHQvLyBJZiBzdHJlYW1pbmcgaXMgYSBoaWdoIHByaW9yaXR5IGJ1dCBiaW5hcnkgY29tcGF0aWJpbGl0eSBhbmRcblx0XHQvLyB0aGUgYWNjdXJhY3kgb2YgdGhlICdjb250ZW50LXR5cGUnIGhlYWRlciBhcmVuJ3Rcblx0XHRwcmVmZXJCaW5hcnkgPSBmYWxzZVxuXHR9IGVsc2UgaWYgKG9wdHMubW9kZSA9PT0gJ2FsbG93LXdyb25nLWNvbnRlbnQtdHlwZScpIHtcblx0XHQvLyBJZiBzdHJlYW1pbmcgaXMgbW9yZSBpbXBvcnRhbnQgdGhhbiBwcmVzZXJ2aW5nIHRoZSAnY29udGVudC10eXBlJyBoZWFkZXJcblx0XHRwcmVmZXJCaW5hcnkgPSAhY2FwYWJpbGl0eS5vdmVycmlkZU1pbWVUeXBlXG5cdH0gZWxzZSBpZiAoIW9wdHMubW9kZSB8fCBvcHRzLm1vZGUgPT09ICdkZWZhdWx0JyB8fCBvcHRzLm1vZGUgPT09ICdwcmVmZXItZmFzdCcpIHtcblx0XHQvLyBVc2UgYmluYXJ5IGlmIHRleHQgc3RyZWFtaW5nIG1heSBjb3JydXB0IGRhdGEgb3IgdGhlIGNvbnRlbnQtdHlwZSBoZWFkZXIsIG9yIGZvciBzcGVlZFxuXHRcdHByZWZlckJpbmFyeSA9IHRydWVcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsdWUgZm9yIG9wdHMubW9kZScpXG5cdH1cblx0c2VsZi5fbW9kZSA9IGRlY2lkZU1vZGUocHJlZmVyQmluYXJ5LCB1c2VGZXRjaClcblx0c2VsZi5fZmV0Y2hUaW1lciA9IG51bGxcblxuXHRzZWxmLm9uKCdmaW5pc2gnLCBmdW5jdGlvbiAoKSB7XG5cdFx0c2VsZi5fb25GaW5pc2goKVxuXHR9KVxufVxuXG5pbmhlcml0cyhDbGllbnRSZXF1ZXN0LCBzdHJlYW0uV3JpdGFibGUpXG5cbkNsaWVudFJlcXVlc3QucHJvdG90eXBlLnNldEhlYWRlciA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuXHR2YXIgc2VsZiA9IHRoaXNcblx0dmFyIGxvd2VyTmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKVxuXHQvLyBUaGlzIGNoZWNrIGlzIG5vdCBuZWNlc3NhcnksIGJ1dCBpdCBwcmV2ZW50cyB3YXJuaW5ncyBmcm9tIGJyb3dzZXJzIGFib3V0IHNldHRpbmcgdW5zYWZlXG5cdC8vIGhlYWRlcnMuIFRvIGJlIGhvbmVzdCBJJ20gbm90IGVudGlyZWx5IHN1cmUgaGlkaW5nIHRoZXNlIHdhcm5pbmdzIGlzIGEgZ29vZCB0aGluZywgYnV0XG5cdC8vIGh0dHAtYnJvd3NlcmlmeSBkaWQgaXQsIHNvIEkgd2lsbCB0b28uXG5cdGlmICh1bnNhZmVIZWFkZXJzLmluZGV4T2YobG93ZXJOYW1lKSAhPT0gLTEpXG5cdFx0cmV0dXJuXG5cblx0c2VsZi5faGVhZGVyc1tsb3dlck5hbWVdID0ge1xuXHRcdG5hbWU6IG5hbWUsXG5cdFx0dmFsdWU6IHZhbHVlXG5cdH1cbn1cblxuQ2xpZW50UmVxdWVzdC5wcm90b3R5cGUuZ2V0SGVhZGVyID0gZnVuY3Rpb24gKG5hbWUpIHtcblx0dmFyIGhlYWRlciA9IHRoaXMuX2hlYWRlcnNbbmFtZS50b0xvd2VyQ2FzZSgpXVxuXHRpZiAoaGVhZGVyKVxuXHRcdHJldHVybiBoZWFkZXIudmFsdWVcblx0cmV0dXJuIG51bGxcbn1cblxuQ2xpZW50UmVxdWVzdC5wcm90b3R5cGUucmVtb3ZlSGVhZGVyID0gZnVuY3Rpb24gKG5hbWUpIHtcblx0dmFyIHNlbGYgPSB0aGlzXG5cdGRlbGV0ZSBzZWxmLl9oZWFkZXJzW25hbWUudG9Mb3dlckNhc2UoKV1cbn1cblxuQ2xpZW50UmVxdWVzdC5wcm90b3R5cGUuX29uRmluaXNoID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgc2VsZiA9IHRoaXNcblxuXHRpZiAoc2VsZi5fZGVzdHJveWVkKVxuXHRcdHJldHVyblxuXHR2YXIgb3B0cyA9IHNlbGYuX29wdHNcblxuXHR2YXIgaGVhZGVyc09iaiA9IHNlbGYuX2hlYWRlcnNcblx0dmFyIGJvZHkgPSBudWxsXG5cdGlmIChvcHRzLm1ldGhvZCAhPT0gJ0dFVCcgJiYgb3B0cy5tZXRob2QgIT09ICdIRUFEJykge1xuXHRcdGlmIChjYXBhYmlsaXR5LmFycmF5YnVmZmVyKSB7XG5cdFx0XHRib2R5ID0gdG9BcnJheUJ1ZmZlcihCdWZmZXIuY29uY2F0KHNlbGYuX2JvZHkpKVxuXHRcdH0gZWxzZSBpZiAoY2FwYWJpbGl0eS5ibG9iQ29uc3RydWN0b3IpIHtcblx0XHRcdGJvZHkgPSBuZXcgZ2xvYmFsLkJsb2Ioc2VsZi5fYm9keS5tYXAoZnVuY3Rpb24gKGJ1ZmZlcikge1xuXHRcdFx0XHRyZXR1cm4gdG9BcnJheUJ1ZmZlcihidWZmZXIpXG5cdFx0XHR9KSwge1xuXHRcdFx0XHR0eXBlOiAoaGVhZGVyc09ialsnY29udGVudC10eXBlJ10gfHwge30pLnZhbHVlIHx8ICcnXG5cdFx0XHR9KVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBnZXQgdXRmOCBzdHJpbmdcblx0XHRcdGJvZHkgPSBCdWZmZXIuY29uY2F0KHNlbGYuX2JvZHkpLnRvU3RyaW5nKClcblx0XHR9XG5cdH1cblxuXHQvLyBjcmVhdGUgZmxhdHRlbmVkIGxpc3Qgb2YgaGVhZGVyc1xuXHR2YXIgaGVhZGVyc0xpc3QgPSBbXVxuXHRPYmplY3Qua2V5cyhoZWFkZXJzT2JqKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXlOYW1lKSB7XG5cdFx0dmFyIG5hbWUgPSBoZWFkZXJzT2JqW2tleU5hbWVdLm5hbWVcblx0XHR2YXIgdmFsdWUgPSBoZWFkZXJzT2JqW2tleU5hbWVdLnZhbHVlXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdFx0XHR2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uICh2KSB7XG5cdFx0XHRcdGhlYWRlcnNMaXN0LnB1c2goW25hbWUsIHZdKVxuXHRcdFx0fSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0aGVhZGVyc0xpc3QucHVzaChbbmFtZSwgdmFsdWVdKVxuXHRcdH1cblx0fSlcblxuXHRpZiAoc2VsZi5fbW9kZSA9PT0gJ2ZldGNoJykge1xuXHRcdHZhciBzaWduYWwgPSBudWxsXG5cdFx0dmFyIGZldGNoVGltZXIgPSBudWxsXG5cdFx0aWYgKGNhcGFiaWxpdHkuYWJvcnRDb250cm9sbGVyKSB7XG5cdFx0XHR2YXIgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKVxuXHRcdFx0c2lnbmFsID0gY29udHJvbGxlci5zaWduYWxcblx0XHRcdHNlbGYuX2ZldGNoQWJvcnRDb250cm9sbGVyID0gY29udHJvbGxlclxuXG5cdFx0XHRpZiAoJ3JlcXVlc3RUaW1lb3V0JyBpbiBvcHRzICYmIG9wdHMucmVxdWVzdFRpbWVvdXQgIT09IDApIHtcblx0XHRcdFx0c2VsZi5fZmV0Y2hUaW1lciA9IGdsb2JhbC5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRzZWxmLmVtaXQoJ3JlcXVlc3RUaW1lb3V0Jylcblx0XHRcdFx0XHRpZiAoc2VsZi5fZmV0Y2hBYm9ydENvbnRyb2xsZXIpXG5cdFx0XHRcdFx0XHRzZWxmLl9mZXRjaEFib3J0Q29udHJvbGxlci5hYm9ydCgpXG5cdFx0XHRcdH0sIG9wdHMucmVxdWVzdFRpbWVvdXQpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Z2xvYmFsLmZldGNoKHNlbGYuX29wdHMudXJsLCB7XG5cdFx0XHRtZXRob2Q6IHNlbGYuX29wdHMubWV0aG9kLFxuXHRcdFx0aGVhZGVyczogaGVhZGVyc0xpc3QsXG5cdFx0XHRib2R5OiBib2R5IHx8IHVuZGVmaW5lZCxcblx0XHRcdG1vZGU6ICdjb3JzJyxcblx0XHRcdGNyZWRlbnRpYWxzOiBvcHRzLndpdGhDcmVkZW50aWFscyA/ICdpbmNsdWRlJyA6ICdzYW1lLW9yaWdpbicsXG5cdFx0XHRzaWduYWw6IHNpZ25hbFxuXHRcdH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0XHRzZWxmLl9mZXRjaFJlc3BvbnNlID0gcmVzcG9uc2Vcblx0XHRcdHNlbGYuX2Nvbm5lY3QoKVxuXHRcdH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcblx0XHRcdGdsb2JhbC5jbGVhclRpbWVvdXQoc2VsZi5fZmV0Y2hUaW1lcilcblx0XHRcdGlmICghc2VsZi5fZGVzdHJveWVkKVxuXHRcdFx0XHRzZWxmLmVtaXQoJ2Vycm9yJywgcmVhc29uKVxuXHRcdH0pXG5cdH0gZWxzZSB7XG5cdFx0dmFyIHhociA9IHNlbGYuX3hociA9IG5ldyBnbG9iYWwuWE1MSHR0cFJlcXVlc3QoKVxuXHRcdHRyeSB7XG5cdFx0XHR4aHIub3BlbihzZWxmLl9vcHRzLm1ldGhvZCwgc2VsZi5fb3B0cy51cmwsIHRydWUpXG5cdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0c2VsZi5lbWl0KCdlcnJvcicsIGVycilcblx0XHRcdH0pXG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cblx0XHQvLyBDYW4ndCBzZXQgcmVzcG9uc2VUeXBlIG9uIHJlYWxseSBvbGQgYnJvd3NlcnNcblx0XHRpZiAoJ3Jlc3BvbnNlVHlwZScgaW4geGhyKVxuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9IHNlbGYuX21vZGUuc3BsaXQoJzonKVswXVxuXG5cdFx0aWYgKCd3aXRoQ3JlZGVudGlhbHMnIGluIHhocilcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSAhIW9wdHMud2l0aENyZWRlbnRpYWxzXG5cblx0XHRpZiAoc2VsZi5fbW9kZSA9PT0gJ3RleHQnICYmICdvdmVycmlkZU1pbWVUeXBlJyBpbiB4aHIpXG5cdFx0XHR4aHIub3ZlcnJpZGVNaW1lVHlwZSgndGV4dC9wbGFpbjsgY2hhcnNldD14LXVzZXItZGVmaW5lZCcpXG5cblx0XHRpZiAoJ3JlcXVlc3RUaW1lb3V0JyBpbiBvcHRzKSB7XG5cdFx0XHR4aHIudGltZW91dCA9IG9wdHMucmVxdWVzdFRpbWVvdXRcblx0XHRcdHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHNlbGYuZW1pdCgncmVxdWVzdFRpbWVvdXQnKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGhlYWRlcnNMaXN0LmZvckVhY2goZnVuY3Rpb24gKGhlYWRlcikge1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyWzBdLCBoZWFkZXJbMV0pXG5cdFx0fSlcblxuXHRcdHNlbGYuX3Jlc3BvbnNlID0gbnVsbFxuXHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRzd2l0Y2ggKHhoci5yZWFkeVN0YXRlKSB7XG5cdFx0XHRcdGNhc2UgclN0YXRlcy5MT0FESU5HOlxuXHRcdFx0XHRjYXNlIHJTdGF0ZXMuRE9ORTpcblx0XHRcdFx0XHRzZWxmLl9vblhIUlByb2dyZXNzKClcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyBOZWNlc3NhcnkgZm9yIHN0cmVhbWluZyBpbiBGaXJlZm94LCBzaW5jZSB4aHIucmVzcG9uc2UgaXMgT05MWSBkZWZpbmVkXG5cdFx0Ly8gaW4gb25wcm9ncmVzcywgbm90IGluIG9ucmVhZHlzdGF0ZWNoYW5nZSB3aXRoIHhoci5yZWFkeVN0YXRlID0gM1xuXHRcdGlmIChzZWxmLl9tb2RlID09PSAnbW96LWNodW5rZWQtYXJyYXlidWZmZXInKSB7XG5cdFx0XHR4aHIub25wcm9ncmVzcyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0c2VsZi5fb25YSFJQcm9ncmVzcygpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoc2VsZi5fZGVzdHJveWVkKVxuXHRcdFx0XHRyZXR1cm5cblx0XHRcdHNlbGYuZW1pdCgnZXJyb3InLCBuZXcgRXJyb3IoJ1hIUiBlcnJvcicpKVxuXHRcdH1cblxuXHRcdHRyeSB7XG5cdFx0XHR4aHIuc2VuZChib2R5KVxuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0cHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHNlbGYuZW1pdCgnZXJyb3InLCBlcnIpXG5cdFx0XHR9KVxuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHhoci5zdGF0dXMgaXMgcmVhZGFibGUgYW5kIG5vbi16ZXJvLCBpbmRpY2F0aW5nIG5vIGVycm9yLlxuICogRXZlbiB0aG91Z2ggdGhlIHNwZWMgc2F5cyBpdCBzaG91bGQgYmUgYXZhaWxhYmxlIGluIHJlYWR5U3RhdGUgMyxcbiAqIGFjY2Vzc2luZyBpdCB0aHJvd3MgYW4gZXhjZXB0aW9uIGluIElFOFxuICovXG5mdW5jdGlvbiBzdGF0dXNWYWxpZCAoeGhyKSB7XG5cdHRyeSB7XG5cdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXNcblx0XHRyZXR1cm4gKHN0YXR1cyAhPT0gbnVsbCAmJiBzdGF0dXMgIT09IDApXG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4gZmFsc2Vcblx0fVxufVxuXG5DbGllbnRSZXF1ZXN0LnByb3RvdHlwZS5fb25YSFJQcm9ncmVzcyA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIHNlbGYgPSB0aGlzXG5cblx0aWYgKCFzdGF0dXNWYWxpZChzZWxmLl94aHIpIHx8IHNlbGYuX2Rlc3Ryb3llZClcblx0XHRyZXR1cm5cblxuXHRpZiAoIXNlbGYuX3Jlc3BvbnNlKVxuXHRcdHNlbGYuX2Nvbm5lY3QoKVxuXG5cdHNlbGYuX3Jlc3BvbnNlLl9vblhIUlByb2dyZXNzKClcbn1cblxuQ2xpZW50UmVxdWVzdC5wcm90b3R5cGUuX2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBzZWxmID0gdGhpc1xuXG5cdGlmIChzZWxmLl9kZXN0cm95ZWQpXG5cdFx0cmV0dXJuXG5cblx0c2VsZi5fcmVzcG9uc2UgPSBuZXcgSW5jb21pbmdNZXNzYWdlKHNlbGYuX3hociwgc2VsZi5fZmV0Y2hSZXNwb25zZSwgc2VsZi5fbW9kZSwgc2VsZi5fZmV0Y2hUaW1lcilcblx0c2VsZi5fcmVzcG9uc2Uub24oJ2Vycm9yJywgZnVuY3Rpb24oZXJyKSB7XG5cdFx0c2VsZi5lbWl0KCdlcnJvcicsIGVycilcblx0fSlcblxuXHRzZWxmLmVtaXQoJ3Jlc3BvbnNlJywgc2VsZi5fcmVzcG9uc2UpXG59XG5cbkNsaWVudFJlcXVlc3QucHJvdG90eXBlLl93cml0ZSA9IGZ1bmN0aW9uIChjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG5cdHZhciBzZWxmID0gdGhpc1xuXG5cdHNlbGYuX2JvZHkucHVzaChjaHVuaylcblx0Y2IoKVxufVxuXG5DbGllbnRSZXF1ZXN0LnByb3RvdHlwZS5hYm9ydCA9IENsaWVudFJlcXVlc3QucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBzZWxmID0gdGhpc1xuXHRzZWxmLl9kZXN0cm95ZWQgPSB0cnVlXG5cdGdsb2JhbC5jbGVhclRpbWVvdXQoc2VsZi5fZmV0Y2hUaW1lcilcblx0aWYgKHNlbGYuX3Jlc3BvbnNlKVxuXHRcdHNlbGYuX3Jlc3BvbnNlLl9kZXN0cm95ZWQgPSB0cnVlXG5cdGlmIChzZWxmLl94aHIpXG5cdFx0c2VsZi5feGhyLmFib3J0KClcblx0ZWxzZSBpZiAoc2VsZi5fZmV0Y2hBYm9ydENvbnRyb2xsZXIpXG5cdFx0c2VsZi5fZmV0Y2hBYm9ydENvbnRyb2xsZXIuYWJvcnQoKVxufVxuXG5DbGllbnRSZXF1ZXN0LnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAoZGF0YSwgZW5jb2RpbmcsIGNiKSB7XG5cdHZhciBzZWxmID0gdGhpc1xuXHRpZiAodHlwZW9mIGRhdGEgPT09ICdmdW5jdGlvbicpIHtcblx0XHRjYiA9IGRhdGFcblx0XHRkYXRhID0gdW5kZWZpbmVkXG5cdH1cblxuXHRzdHJlYW0uV3JpdGFibGUucHJvdG90eXBlLmVuZC5jYWxsKHNlbGYsIGRhdGEsIGVuY29kaW5nLCBjYilcbn1cblxuQ2xpZW50UmVxdWVzdC5wcm90b3R5cGUuZmx1c2hIZWFkZXJzID0gZnVuY3Rpb24gKCkge31cbkNsaWVudFJlcXVlc3QucHJvdG90eXBlLnNldFRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7fVxuQ2xpZW50UmVxdWVzdC5wcm90b3R5cGUuc2V0Tm9EZWxheSA9IGZ1bmN0aW9uICgpIHt9XG5DbGllbnRSZXF1ZXN0LnByb3RvdHlwZS5zZXRTb2NrZXRLZWVwQWxpdmUgPSBmdW5jdGlvbiAoKSB7fVxuXG4vLyBUYWtlbiBmcm9tIGh0dHA6Ly93d3cudzMub3JnL1RSL1hNTEh0dHBSZXF1ZXN0LyN0aGUtc2V0cmVxdWVzdGhlYWRlciUyOCUyOS1tZXRob2RcbnZhciB1bnNhZmVIZWFkZXJzID0gW1xuXHQnYWNjZXB0LWNoYXJzZXQnLFxuXHQnYWNjZXB0LWVuY29kaW5nJyxcblx0J2FjY2Vzcy1jb250cm9sLXJlcXVlc3QtaGVhZGVycycsXG5cdCdhY2Nlc3MtY29udHJvbC1yZXF1ZXN0LW1ldGhvZCcsXG5cdCdjb25uZWN0aW9uJyxcblx0J2NvbnRlbnQtbGVuZ3RoJyxcblx0J2Nvb2tpZScsXG5cdCdjb29raWUyJyxcblx0J2RhdGUnLFxuXHQnZG50Jyxcblx0J2V4cGVjdCcsXG5cdCdob3N0Jyxcblx0J2tlZXAtYWxpdmUnLFxuXHQnb3JpZ2luJyxcblx0J3JlZmVyZXInLFxuXHQndGUnLFxuXHQndHJhaWxlcicsXG5cdCd0cmFuc2Zlci1lbmNvZGluZycsXG5cdCd1cGdyYWRlJyxcblx0J3ZpYSdcbl1cbiIsInZhciBDbGllbnRSZXF1ZXN0ID0gcmVxdWlyZSgnLi9saWIvcmVxdWVzdCcpXG52YXIgcmVzcG9uc2UgPSByZXF1aXJlKCcuL2xpYi9yZXNwb25zZScpXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgneHRlbmQnKVxudmFyIHN0YXR1c0NvZGVzID0gcmVxdWlyZSgnYnVpbHRpbi1zdGF0dXMtY29kZXMnKVxudmFyIHVybCA9IHJlcXVpcmUoJ3VybCcpXG5cbnZhciBodHRwID0gZXhwb3J0c1xuXG5odHRwLnJlcXVlc3QgPSBmdW5jdGlvbiAob3B0cywgY2IpIHtcblx0aWYgKHR5cGVvZiBvcHRzID09PSAnc3RyaW5nJylcblx0XHRvcHRzID0gdXJsLnBhcnNlKG9wdHMpXG5cdGVsc2Vcblx0XHRvcHRzID0gZXh0ZW5kKG9wdHMpXG5cblx0Ly8gTm9ybWFsbHksIHRoZSBwYWdlIGlzIGxvYWRlZCBmcm9tIGh0dHAgb3IgaHR0cHMsIHNvIG5vdCBzcGVjaWZ5aW5nIGEgcHJvdG9jb2xcblx0Ly8gd2lsbCByZXN1bHQgaW4gYSAodmFsaWQpIHByb3RvY29sLXJlbGF0aXZlIHVybC4gSG93ZXZlciwgdGhpcyB3b24ndCB3b3JrIGlmXG5cdC8vIHRoZSBwcm90b2NvbCBpcyBzb21ldGhpbmcgZWxzZSwgbGlrZSAnZmlsZTonXG5cdHZhciBkZWZhdWx0UHJvdG9jb2wgPSBnbG9iYWwubG9jYXRpb24ucHJvdG9jb2wuc2VhcmNoKC9eaHR0cHM/OiQvKSA9PT0gLTEgPyAnaHR0cDonIDogJydcblxuXHR2YXIgcHJvdG9jb2wgPSBvcHRzLnByb3RvY29sIHx8IGRlZmF1bHRQcm90b2NvbFxuXHR2YXIgaG9zdCA9IG9wdHMuaG9zdG5hbWUgfHwgb3B0cy5ob3N0XG5cdHZhciBwb3J0ID0gb3B0cy5wb3J0XG5cdHZhciBwYXRoID0gb3B0cy5wYXRoIHx8ICcvJ1xuXG5cdC8vIE5lY2Vzc2FyeSBmb3IgSVB2NiBhZGRyZXNzZXNcblx0aWYgKGhvc3QgJiYgaG9zdC5pbmRleE9mKCc6JykgIT09IC0xKVxuXHRcdGhvc3QgPSAnWycgKyBob3N0ICsgJ10nXG5cblx0Ly8gVGhpcyBtYXkgYmUgYSByZWxhdGl2ZSB1cmwuIFRoZSBicm93c2VyIHNob3VsZCBhbHdheXMgYmUgYWJsZSB0byBpbnRlcnByZXQgaXQgY29ycmVjdGx5LlxuXHRvcHRzLnVybCA9IChob3N0ID8gKHByb3RvY29sICsgJy8vJyArIGhvc3QpIDogJycpICsgKHBvcnQgPyAnOicgKyBwb3J0IDogJycpICsgcGF0aFxuXHRvcHRzLm1ldGhvZCA9IChvcHRzLm1ldGhvZCB8fCAnR0VUJykudG9VcHBlckNhc2UoKVxuXHRvcHRzLmhlYWRlcnMgPSBvcHRzLmhlYWRlcnMgfHwge31cblxuXHQvLyBBbHNvIHZhbGlkIG9wdHMuYXV0aCwgb3B0cy5tb2RlXG5cblx0dmFyIHJlcSA9IG5ldyBDbGllbnRSZXF1ZXN0KG9wdHMpXG5cdGlmIChjYilcblx0XHRyZXEub24oJ3Jlc3BvbnNlJywgY2IpXG5cdHJldHVybiByZXFcbn1cblxuaHR0cC5nZXQgPSBmdW5jdGlvbiBnZXQgKG9wdHMsIGNiKSB7XG5cdHZhciByZXEgPSBodHRwLnJlcXVlc3Qob3B0cywgY2IpXG5cdHJlcS5lbmQoKVxuXHRyZXR1cm4gcmVxXG59XG5cbmh0dHAuQ2xpZW50UmVxdWVzdCA9IENsaWVudFJlcXVlc3Rcbmh0dHAuSW5jb21pbmdNZXNzYWdlID0gcmVzcG9uc2UuSW5jb21pbmdNZXNzYWdlXG5cbmh0dHAuQWdlbnQgPSBmdW5jdGlvbiAoKSB7fVxuaHR0cC5BZ2VudC5kZWZhdWx0TWF4U29ja2V0cyA9IDRcblxuaHR0cC5nbG9iYWxBZ2VudCA9IG5ldyBodHRwLkFnZW50KClcblxuaHR0cC5TVEFUVVNfQ09ERVMgPSBzdGF0dXNDb2Rlc1xuXG5odHRwLk1FVEhPRFMgPSBbXG5cdCdDSEVDS09VVCcsXG5cdCdDT05ORUNUJyxcblx0J0NPUFknLFxuXHQnREVMRVRFJyxcblx0J0dFVCcsXG5cdCdIRUFEJyxcblx0J0xPQ0snLFxuXHQnTS1TRUFSQ0gnLFxuXHQnTUVSR0UnLFxuXHQnTUtBQ1RJVklUWScsXG5cdCdNS0NPTCcsXG5cdCdNT1ZFJyxcblx0J05PVElGWScsXG5cdCdPUFRJT05TJyxcblx0J1BBVENIJyxcblx0J1BPU1QnLFxuXHQnUFJPUEZJTkQnLFxuXHQnUFJPUFBBVENIJyxcblx0J1BVUkdFJyxcblx0J1BVVCcsXG5cdCdSRVBPUlQnLFxuXHQnU0VBUkNIJyxcblx0J1NVQlNDUklCRScsXG5cdCdUUkFDRScsXG5cdCdVTkxPQ0snLFxuXHQnVU5TVUJTQ1JJQkUnXG5dIiwidmFyIGdlbmVyYXRlID0gZnVuY3Rpb24gZ2VuZXJhdGUobnVtLCBmbikge1xuICB2YXIgYSA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG51bTsgKytpKSB7XG4gICAgYS5wdXNoKGZuKGkpKTtcbiAgfXJldHVybiBhO1xufTtcblxudmFyIHJlcGxpY2F0ZSA9IGZ1bmN0aW9uIHJlcGxpY2F0ZShudW0sIHZhbCkge1xuICByZXR1cm4gZ2VuZXJhdGUobnVtLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfSk7XG59O1xuXG52YXIgY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0KGEsIGIpIHtcbiAgcmV0dXJuIGEuY29uY2F0KGIpO1xufTtcblxudmFyIGZsYXR0ZW4gPSBmdW5jdGlvbiBmbGF0dGVuKGEpIHtcbiAgdmFyIHIgPSBbXTtcbiAgZm9yICh2YXIgaiA9IDAsIEogPSBhLmxlbmd0aDsgaiA8IEo7ICsraikge1xuICAgIGZvciAodmFyIGkgPSAwLCBJID0gYVtqXS5sZW5ndGg7IGkgPCBJOyArK2kpIHtcbiAgICAgIHIucHVzaChhW2pdW2ldKTtcbiAgICB9XG4gIH1yZXR1cm4gcjtcbn07XG5cbnZhciBjaHVua3NPZiA9IGZ1bmN0aW9uIGNodW5rc09mKG4sIGEpIHtcbiAgdmFyIGIgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhLmxlbmd0aDsgaSA8IGw7IGkgKz0gbikge1xuICAgIGIucHVzaChhLnNsaWNlKGksIGkgKyBuKSk7XG4gIH1yZXR1cm4gYjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZW5lcmF0ZTogZ2VuZXJhdGUsXG4gIHJlcGxpY2F0ZTogcmVwbGljYXRlLFxuICBjb25jYXQ6IGNvbmNhdCxcbiAgZmxhdHRlbjogZmxhdHRlbixcbiAgY2h1bmtzT2Y6IGNodW5rc09mXG59OyIsIi8vIFRoaXMgd2FzIHBvcnRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9lbW4xNzgvanMtc2hhMywgd2l0aCBzb21lIG1pbm9yXG4vLyBtb2RpZmljYXRpb25zIGFuZCBwcnVuaW5nLiBJdCBpcyBsaWNlbnNlZCB1bmRlciBNSVQ6XG4vL1xuLy8gQ29weXJpZ2h0IDIwMTUtMjAxNiBDaGVuLCBZaS1DeXVhblxuLy8gIFxuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nXG4vLyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvXG4vLyBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG9cbi8vIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vIFxuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbi8vIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy8gXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELFxuLy8gRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORFxuLy8gTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRVxuLy8gTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTlxuLy8gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OXG4vLyBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxudmFyIEhFWF9DSEFSUyA9ICcwMTIzNDU2Nzg5YWJjZGVmJy5zcGxpdCgnJyk7XG52YXIgS0VDQ0FLX1BBRERJTkcgPSBbMSwgMjU2LCA2NTUzNiwgMTY3NzcyMTZdO1xudmFyIFNISUZUID0gWzAsIDgsIDE2LCAyNF07XG52YXIgUkMgPSBbMSwgMCwgMzI4OTgsIDAsIDMyOTA2LCAyMTQ3NDgzNjQ4LCAyMTQ3NTE2NDE2LCAyMTQ3NDgzNjQ4LCAzMjkwNywgMCwgMjE0NzQ4MzY0OSwgMCwgMjE0NzUxNjU0NSwgMjE0NzQ4MzY0OCwgMzI3NzcsIDIxNDc0ODM2NDgsIDEzOCwgMCwgMTM2LCAwLCAyMTQ3NTE2NDI1LCAwLCAyMTQ3NDgzNjU4LCAwLCAyMTQ3NTE2NTU1LCAwLCAxMzksIDIxNDc0ODM2NDgsIDMyOTA1LCAyMTQ3NDgzNjQ4LCAzMjc3MSwgMjE0NzQ4MzY0OCwgMzI3NzAsIDIxNDc0ODM2NDgsIDEyOCwgMjE0NzQ4MzY0OCwgMzI3NzgsIDAsIDIxNDc0ODM2NTgsIDIxNDc0ODM2NDgsIDIxNDc1MTY1NDUsIDIxNDc0ODM2NDgsIDMyODk2LCAyMTQ3NDgzNjQ4LCAyMTQ3NDgzNjQ5LCAwLCAyMTQ3NTE2NDI0LCAyMTQ3NDgzNjQ4XTtcblxudmFyIEtlY2NhayA9IGZ1bmN0aW9uIEtlY2NhayhiaXRzKSB7XG4gIHJldHVybiB7XG4gICAgYmxvY2tzOiBbXSxcbiAgICByZXNldDogdHJ1ZSxcbiAgICBibG9jazogMCxcbiAgICBzdGFydDogMCxcbiAgICBibG9ja0NvdW50OiAxNjAwIC0gKGJpdHMgPDwgMSkgPj4gNSxcbiAgICBvdXRwdXRCbG9ja3M6IGJpdHMgPj4gNSxcbiAgICBzOiBmdW5jdGlvbiAocykge1xuICAgICAgcmV0dXJuIFtdLmNvbmNhdChzLCBzLCBzLCBzLCBzKTtcbiAgICB9KFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSlcbiAgfTtcbn07XG5cbnZhciB1cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUoc3RhdGUsIG1lc3NhZ2UpIHtcbiAgdmFyIGxlbmd0aCA9IG1lc3NhZ2UubGVuZ3RoLFxuICAgICAgYmxvY2tzID0gc3RhdGUuYmxvY2tzLFxuICAgICAgYnl0ZUNvdW50ID0gc3RhdGUuYmxvY2tDb3VudCA8PCAyLFxuICAgICAgYmxvY2tDb3VudCA9IHN0YXRlLmJsb2NrQ291bnQsXG4gICAgICBvdXRwdXRCbG9ja3MgPSBzdGF0ZS5vdXRwdXRCbG9ja3MsXG4gICAgICBzID0gc3RhdGUucyxcbiAgICAgIGluZGV4ID0gMCxcbiAgICAgIGksXG4gICAgICBjb2RlO1xuXG4gIC8vIHVwZGF0ZVxuICB3aGlsZSAoaW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoc3RhdGUucmVzZXQpIHtcbiAgICAgIHN0YXRlLnJlc2V0ID0gZmFsc2U7XG4gICAgICBibG9ja3NbMF0gPSBzdGF0ZS5ibG9jaztcbiAgICAgIGZvciAoaSA9IDE7IGkgPCBibG9ja0NvdW50ICsgMTsgKytpKSB7XG4gICAgICAgIGJsb2Nrc1tpXSA9IDA7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgZm9yIChpID0gc3RhdGUuc3RhcnQ7IGluZGV4IDwgbGVuZ3RoICYmIGkgPCBieXRlQ291bnQ7ICsraW5kZXgpIHtcbiAgICAgICAgYmxvY2tzW2kgPj4gMl0gfD0gbWVzc2FnZVtpbmRleF0gPDwgU0hJRlRbaSsrICYgM107XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoaSA9IHN0YXRlLnN0YXJ0OyBpbmRleCA8IGxlbmd0aCAmJiBpIDwgYnl0ZUNvdW50OyArK2luZGV4KSB7XG4gICAgICAgIGNvZGUgPSBtZXNzYWdlLmNoYXJDb2RlQXQoaW5kZXgpO1xuICAgICAgICBpZiAoY29kZSA8IDB4ODApIHtcbiAgICAgICAgICBibG9ja3NbaSA+PiAyXSB8PSBjb2RlIDw8IFNISUZUW2krKyAmIDNdO1xuICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPCAweDgwMCkge1xuICAgICAgICAgIGJsb2Nrc1tpID4+IDJdIHw9ICgweGMwIHwgY29kZSA+PiA2KSA8PCBTSElGVFtpKysgJiAzXTtcbiAgICAgICAgICBibG9ja3NbaSA+PiAyXSB8PSAoMHg4MCB8IGNvZGUgJiAweDNmKSA8PCBTSElGVFtpKysgJiAzXTtcbiAgICAgICAgfSBlbHNlIGlmIChjb2RlIDwgMHhkODAwIHx8IGNvZGUgPj0gMHhlMDAwKSB7XG4gICAgICAgICAgYmxvY2tzW2kgPj4gMl0gfD0gKDB4ZTAgfCBjb2RlID4+IDEyKSA8PCBTSElGVFtpKysgJiAzXTtcbiAgICAgICAgICBibG9ja3NbaSA+PiAyXSB8PSAoMHg4MCB8IGNvZGUgPj4gNiAmIDB4M2YpIDw8IFNISUZUW2krKyAmIDNdO1xuICAgICAgICAgIGJsb2Nrc1tpID4+IDJdIHw9ICgweDgwIHwgY29kZSAmIDB4M2YpIDw8IFNISUZUW2krKyAmIDNdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvZGUgPSAweDEwMDAwICsgKChjb2RlICYgMHgzZmYpIDw8IDEwIHwgbWVzc2FnZS5jaGFyQ29kZUF0KCsraW5kZXgpICYgMHgzZmYpO1xuICAgICAgICAgIGJsb2Nrc1tpID4+IDJdIHw9ICgweGYwIHwgY29kZSA+PiAxOCkgPDwgU0hJRlRbaSsrICYgM107XG4gICAgICAgICAgYmxvY2tzW2kgPj4gMl0gfD0gKDB4ODAgfCBjb2RlID4+IDEyICYgMHgzZikgPDwgU0hJRlRbaSsrICYgM107XG4gICAgICAgICAgYmxvY2tzW2kgPj4gMl0gfD0gKDB4ODAgfCBjb2RlID4+IDYgJiAweDNmKSA8PCBTSElGVFtpKysgJiAzXTtcbiAgICAgICAgICBibG9ja3NbaSA+PiAyXSB8PSAoMHg4MCB8IGNvZGUgJiAweDNmKSA8PCBTSElGVFtpKysgJiAzXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBzdGF0ZS5sYXN0Qnl0ZUluZGV4ID0gaTtcbiAgICBpZiAoaSA+PSBieXRlQ291bnQpIHtcbiAgICAgIHN0YXRlLnN0YXJ0ID0gaSAtIGJ5dGVDb3VudDtcbiAgICAgIHN0YXRlLmJsb2NrID0gYmxvY2tzW2Jsb2NrQ291bnRdO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGJsb2NrQ291bnQ7ICsraSkge1xuICAgICAgICBzW2ldIF49IGJsb2Nrc1tpXTtcbiAgICAgIH1cbiAgICAgIGYocyk7XG4gICAgICBzdGF0ZS5yZXNldCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLnN0YXJ0ID0gaTtcbiAgICB9XG4gIH1cblxuICAvLyBmaW5hbGl6ZVxuICBpID0gc3RhdGUubGFzdEJ5dGVJbmRleDtcbiAgYmxvY2tzW2kgPj4gMl0gfD0gS0VDQ0FLX1BBRERJTkdbaSAmIDNdO1xuICBpZiAoc3RhdGUubGFzdEJ5dGVJbmRleCA9PT0gYnl0ZUNvdW50KSB7XG4gICAgYmxvY2tzWzBdID0gYmxvY2tzW2Jsb2NrQ291bnRdO1xuICAgIGZvciAoaSA9IDE7IGkgPCBibG9ja0NvdW50ICsgMTsgKytpKSB7XG4gICAgICBibG9ja3NbaV0gPSAwO1xuICAgIH1cbiAgfVxuICBibG9ja3NbYmxvY2tDb3VudCAtIDFdIHw9IDB4ODAwMDAwMDA7XG4gIGZvciAoaSA9IDA7IGkgPCBibG9ja0NvdW50OyArK2kpIHtcbiAgICBzW2ldIF49IGJsb2Nrc1tpXTtcbiAgfVxuICBmKHMpO1xuXG4gIC8vIHRvU3RyaW5nXG4gIHZhciBoZXggPSAnJyxcbiAgICAgIGkgPSAwLFxuICAgICAgaiA9IDAsXG4gICAgICBibG9jaztcbiAgd2hpbGUgKGogPCBvdXRwdXRCbG9ja3MpIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgYmxvY2tDb3VudCAmJiBqIDwgb3V0cHV0QmxvY2tzOyArK2ksICsraikge1xuICAgICAgYmxvY2sgPSBzW2ldO1xuICAgICAgaGV4ICs9IEhFWF9DSEFSU1tibG9jayA+PiA0ICYgMHgwRl0gKyBIRVhfQ0hBUlNbYmxvY2sgJiAweDBGXSArIEhFWF9DSEFSU1tibG9jayA+PiAxMiAmIDB4MEZdICsgSEVYX0NIQVJTW2Jsb2NrID4+IDggJiAweDBGXSArIEhFWF9DSEFSU1tibG9jayA+PiAyMCAmIDB4MEZdICsgSEVYX0NIQVJTW2Jsb2NrID4+IDE2ICYgMHgwRl0gKyBIRVhfQ0hBUlNbYmxvY2sgPj4gMjggJiAweDBGXSArIEhFWF9DSEFSU1tibG9jayA+PiAyNCAmIDB4MEZdO1xuICAgIH1cbiAgICBpZiAoaiAlIGJsb2NrQ291bnQgPT09IDApIHtcbiAgICAgIGYocyk7XG4gICAgICBpID0gMDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFwiMHhcIiArIGhleDtcbn07XG5cbnZhciBmID0gZnVuY3Rpb24gZihzKSB7XG4gIHZhciBoLCBsLCBuLCBjMCwgYzEsIGMyLCBjMywgYzQsIGM1LCBjNiwgYzcsIGM4LCBjOSwgYjAsIGIxLCBiMiwgYjMsIGI0LCBiNSwgYjYsIGI3LCBiOCwgYjksIGIxMCwgYjExLCBiMTIsIGIxMywgYjE0LCBiMTUsIGIxNiwgYjE3LCBiMTgsIGIxOSwgYjIwLCBiMjEsIGIyMiwgYjIzLCBiMjQsIGIyNSwgYjI2LCBiMjcsIGIyOCwgYjI5LCBiMzAsIGIzMSwgYjMyLCBiMzMsIGIzNCwgYjM1LCBiMzYsIGIzNywgYjM4LCBiMzksIGI0MCwgYjQxLCBiNDIsIGI0MywgYjQ0LCBiNDUsIGI0NiwgYjQ3LCBiNDgsIGI0OTtcblxuICBmb3IgKG4gPSAwOyBuIDwgNDg7IG4gKz0gMikge1xuICAgIGMwID0gc1swXSBeIHNbMTBdIF4gc1syMF0gXiBzWzMwXSBeIHNbNDBdO1xuICAgIGMxID0gc1sxXSBeIHNbMTFdIF4gc1syMV0gXiBzWzMxXSBeIHNbNDFdO1xuICAgIGMyID0gc1syXSBeIHNbMTJdIF4gc1syMl0gXiBzWzMyXSBeIHNbNDJdO1xuICAgIGMzID0gc1szXSBeIHNbMTNdIF4gc1syM10gXiBzWzMzXSBeIHNbNDNdO1xuICAgIGM0ID0gc1s0XSBeIHNbMTRdIF4gc1syNF0gXiBzWzM0XSBeIHNbNDRdO1xuICAgIGM1ID0gc1s1XSBeIHNbMTVdIF4gc1syNV0gXiBzWzM1XSBeIHNbNDVdO1xuICAgIGM2ID0gc1s2XSBeIHNbMTZdIF4gc1syNl0gXiBzWzM2XSBeIHNbNDZdO1xuICAgIGM3ID0gc1s3XSBeIHNbMTddIF4gc1syN10gXiBzWzM3XSBeIHNbNDddO1xuICAgIGM4ID0gc1s4XSBeIHNbMThdIF4gc1syOF0gXiBzWzM4XSBeIHNbNDhdO1xuICAgIGM5ID0gc1s5XSBeIHNbMTldIF4gc1syOV0gXiBzWzM5XSBeIHNbNDldO1xuXG4gICAgaCA9IGM4IF4gKGMyIDw8IDEgfCBjMyA+Pj4gMzEpO1xuICAgIGwgPSBjOSBeIChjMyA8PCAxIHwgYzIgPj4+IDMxKTtcbiAgICBzWzBdIF49IGg7XG4gICAgc1sxXSBePSBsO1xuICAgIHNbMTBdIF49IGg7XG4gICAgc1sxMV0gXj0gbDtcbiAgICBzWzIwXSBePSBoO1xuICAgIHNbMjFdIF49IGw7XG4gICAgc1szMF0gXj0gaDtcbiAgICBzWzMxXSBePSBsO1xuICAgIHNbNDBdIF49IGg7XG4gICAgc1s0MV0gXj0gbDtcbiAgICBoID0gYzAgXiAoYzQgPDwgMSB8IGM1ID4+PiAzMSk7XG4gICAgbCA9IGMxIF4gKGM1IDw8IDEgfCBjNCA+Pj4gMzEpO1xuICAgIHNbMl0gXj0gaDtcbiAgICBzWzNdIF49IGw7XG4gICAgc1sxMl0gXj0gaDtcbiAgICBzWzEzXSBePSBsO1xuICAgIHNbMjJdIF49IGg7XG4gICAgc1syM10gXj0gbDtcbiAgICBzWzMyXSBePSBoO1xuICAgIHNbMzNdIF49IGw7XG4gICAgc1s0Ml0gXj0gaDtcbiAgICBzWzQzXSBePSBsO1xuICAgIGggPSBjMiBeIChjNiA8PCAxIHwgYzcgPj4+IDMxKTtcbiAgICBsID0gYzMgXiAoYzcgPDwgMSB8IGM2ID4+PiAzMSk7XG4gICAgc1s0XSBePSBoO1xuICAgIHNbNV0gXj0gbDtcbiAgICBzWzE0XSBePSBoO1xuICAgIHNbMTVdIF49IGw7XG4gICAgc1syNF0gXj0gaDtcbiAgICBzWzI1XSBePSBsO1xuICAgIHNbMzRdIF49IGg7XG4gICAgc1szNV0gXj0gbDtcbiAgICBzWzQ0XSBePSBoO1xuICAgIHNbNDVdIF49IGw7XG4gICAgaCA9IGM0IF4gKGM4IDw8IDEgfCBjOSA+Pj4gMzEpO1xuICAgIGwgPSBjNSBeIChjOSA8PCAxIHwgYzggPj4+IDMxKTtcbiAgICBzWzZdIF49IGg7XG4gICAgc1s3XSBePSBsO1xuICAgIHNbMTZdIF49IGg7XG4gICAgc1sxN10gXj0gbDtcbiAgICBzWzI2XSBePSBoO1xuICAgIHNbMjddIF49IGw7XG4gICAgc1szNl0gXj0gaDtcbiAgICBzWzM3XSBePSBsO1xuICAgIHNbNDZdIF49IGg7XG4gICAgc1s0N10gXj0gbDtcbiAgICBoID0gYzYgXiAoYzAgPDwgMSB8IGMxID4+PiAzMSk7XG4gICAgbCA9IGM3IF4gKGMxIDw8IDEgfCBjMCA+Pj4gMzEpO1xuICAgIHNbOF0gXj0gaDtcbiAgICBzWzldIF49IGw7XG4gICAgc1sxOF0gXj0gaDtcbiAgICBzWzE5XSBePSBsO1xuICAgIHNbMjhdIF49IGg7XG4gICAgc1syOV0gXj0gbDtcbiAgICBzWzM4XSBePSBoO1xuICAgIHNbMzldIF49IGw7XG4gICAgc1s0OF0gXj0gaDtcbiAgICBzWzQ5XSBePSBsO1xuXG4gICAgYjAgPSBzWzBdO1xuICAgIGIxID0gc1sxXTtcbiAgICBiMzIgPSBzWzExXSA8PCA0IHwgc1sxMF0gPj4+IDI4O1xuICAgIGIzMyA9IHNbMTBdIDw8IDQgfCBzWzExXSA+Pj4gMjg7XG4gICAgYjE0ID0gc1syMF0gPDwgMyB8IHNbMjFdID4+PiAyOTtcbiAgICBiMTUgPSBzWzIxXSA8PCAzIHwgc1syMF0gPj4+IDI5O1xuICAgIGI0NiA9IHNbMzFdIDw8IDkgfCBzWzMwXSA+Pj4gMjM7XG4gICAgYjQ3ID0gc1szMF0gPDwgOSB8IHNbMzFdID4+PiAyMztcbiAgICBiMjggPSBzWzQwXSA8PCAxOCB8IHNbNDFdID4+PiAxNDtcbiAgICBiMjkgPSBzWzQxXSA8PCAxOCB8IHNbNDBdID4+PiAxNDtcbiAgICBiMjAgPSBzWzJdIDw8IDEgfCBzWzNdID4+PiAzMTtcbiAgICBiMjEgPSBzWzNdIDw8IDEgfCBzWzJdID4+PiAzMTtcbiAgICBiMiA9IHNbMTNdIDw8IDEyIHwgc1sxMl0gPj4+IDIwO1xuICAgIGIzID0gc1sxMl0gPDwgMTIgfCBzWzEzXSA+Pj4gMjA7XG4gICAgYjM0ID0gc1syMl0gPDwgMTAgfCBzWzIzXSA+Pj4gMjI7XG4gICAgYjM1ID0gc1syM10gPDwgMTAgfCBzWzIyXSA+Pj4gMjI7XG4gICAgYjE2ID0gc1szM10gPDwgMTMgfCBzWzMyXSA+Pj4gMTk7XG4gICAgYjE3ID0gc1szMl0gPDwgMTMgfCBzWzMzXSA+Pj4gMTk7XG4gICAgYjQ4ID0gc1s0Ml0gPDwgMiB8IHNbNDNdID4+PiAzMDtcbiAgICBiNDkgPSBzWzQzXSA8PCAyIHwgc1s0Ml0gPj4+IDMwO1xuICAgIGI0MCA9IHNbNV0gPDwgMzAgfCBzWzRdID4+PiAyO1xuICAgIGI0MSA9IHNbNF0gPDwgMzAgfCBzWzVdID4+PiAyO1xuICAgIGIyMiA9IHNbMTRdIDw8IDYgfCBzWzE1XSA+Pj4gMjY7XG4gICAgYjIzID0gc1sxNV0gPDwgNiB8IHNbMTRdID4+PiAyNjtcbiAgICBiNCA9IHNbMjVdIDw8IDExIHwgc1syNF0gPj4+IDIxO1xuICAgIGI1ID0gc1syNF0gPDwgMTEgfCBzWzI1XSA+Pj4gMjE7XG4gICAgYjM2ID0gc1szNF0gPDwgMTUgfCBzWzM1XSA+Pj4gMTc7XG4gICAgYjM3ID0gc1szNV0gPDwgMTUgfCBzWzM0XSA+Pj4gMTc7XG4gICAgYjE4ID0gc1s0NV0gPDwgMjkgfCBzWzQ0XSA+Pj4gMztcbiAgICBiMTkgPSBzWzQ0XSA8PCAyOSB8IHNbNDVdID4+PiAzO1xuICAgIGIxMCA9IHNbNl0gPDwgMjggfCBzWzddID4+PiA0O1xuICAgIGIxMSA9IHNbN10gPDwgMjggfCBzWzZdID4+PiA0O1xuICAgIGI0MiA9IHNbMTddIDw8IDIzIHwgc1sxNl0gPj4+IDk7XG4gICAgYjQzID0gc1sxNl0gPDwgMjMgfCBzWzE3XSA+Pj4gOTtcbiAgICBiMjQgPSBzWzI2XSA8PCAyNSB8IHNbMjddID4+PiA3O1xuICAgIGIyNSA9IHNbMjddIDw8IDI1IHwgc1syNl0gPj4+IDc7XG4gICAgYjYgPSBzWzM2XSA8PCAyMSB8IHNbMzddID4+PiAxMTtcbiAgICBiNyA9IHNbMzddIDw8IDIxIHwgc1szNl0gPj4+IDExO1xuICAgIGIzOCA9IHNbNDddIDw8IDI0IHwgc1s0Nl0gPj4+IDg7XG4gICAgYjM5ID0gc1s0Nl0gPDwgMjQgfCBzWzQ3XSA+Pj4gODtcbiAgICBiMzAgPSBzWzhdIDw8IDI3IHwgc1s5XSA+Pj4gNTtcbiAgICBiMzEgPSBzWzldIDw8IDI3IHwgc1s4XSA+Pj4gNTtcbiAgICBiMTIgPSBzWzE4XSA8PCAyMCB8IHNbMTldID4+PiAxMjtcbiAgICBiMTMgPSBzWzE5XSA8PCAyMCB8IHNbMThdID4+PiAxMjtcbiAgICBiNDQgPSBzWzI5XSA8PCA3IHwgc1syOF0gPj4+IDI1O1xuICAgIGI0NSA9IHNbMjhdIDw8IDcgfCBzWzI5XSA+Pj4gMjU7XG4gICAgYjI2ID0gc1szOF0gPDwgOCB8IHNbMzldID4+PiAyNDtcbiAgICBiMjcgPSBzWzM5XSA8PCA4IHwgc1szOF0gPj4+IDI0O1xuICAgIGI4ID0gc1s0OF0gPDwgMTQgfCBzWzQ5XSA+Pj4gMTg7XG4gICAgYjkgPSBzWzQ5XSA8PCAxNCB8IHNbNDhdID4+PiAxODtcblxuICAgIHNbMF0gPSBiMCBeIH5iMiAmIGI0O1xuICAgIHNbMV0gPSBiMSBeIH5iMyAmIGI1O1xuICAgIHNbMTBdID0gYjEwIF4gfmIxMiAmIGIxNDtcbiAgICBzWzExXSA9IGIxMSBeIH5iMTMgJiBiMTU7XG4gICAgc1syMF0gPSBiMjAgXiB+YjIyICYgYjI0O1xuICAgIHNbMjFdID0gYjIxIF4gfmIyMyAmIGIyNTtcbiAgICBzWzMwXSA9IGIzMCBeIH5iMzIgJiBiMzQ7XG4gICAgc1szMV0gPSBiMzEgXiB+YjMzICYgYjM1O1xuICAgIHNbNDBdID0gYjQwIF4gfmI0MiAmIGI0NDtcbiAgICBzWzQxXSA9IGI0MSBeIH5iNDMgJiBiNDU7XG4gICAgc1syXSA9IGIyIF4gfmI0ICYgYjY7XG4gICAgc1szXSA9IGIzIF4gfmI1ICYgYjc7XG4gICAgc1sxMl0gPSBiMTIgXiB+YjE0ICYgYjE2O1xuICAgIHNbMTNdID0gYjEzIF4gfmIxNSAmIGIxNztcbiAgICBzWzIyXSA9IGIyMiBeIH5iMjQgJiBiMjY7XG4gICAgc1syM10gPSBiMjMgXiB+YjI1ICYgYjI3O1xuICAgIHNbMzJdID0gYjMyIF4gfmIzNCAmIGIzNjtcbiAgICBzWzMzXSA9IGIzMyBeIH5iMzUgJiBiMzc7XG4gICAgc1s0Ml0gPSBiNDIgXiB+YjQ0ICYgYjQ2O1xuICAgIHNbNDNdID0gYjQzIF4gfmI0NSAmIGI0NztcbiAgICBzWzRdID0gYjQgXiB+YjYgJiBiODtcbiAgICBzWzVdID0gYjUgXiB+YjcgJiBiOTtcbiAgICBzWzE0XSA9IGIxNCBeIH5iMTYgJiBiMTg7XG4gICAgc1sxNV0gPSBiMTUgXiB+YjE3ICYgYjE5O1xuICAgIHNbMjRdID0gYjI0IF4gfmIyNiAmIGIyODtcbiAgICBzWzI1XSA9IGIyNSBeIH5iMjcgJiBiMjk7XG4gICAgc1szNF0gPSBiMzQgXiB+YjM2ICYgYjM4O1xuICAgIHNbMzVdID0gYjM1IF4gfmIzNyAmIGIzOTtcbiAgICBzWzQ0XSA9IGI0NCBeIH5iNDYgJiBiNDg7XG4gICAgc1s0NV0gPSBiNDUgXiB+YjQ3ICYgYjQ5O1xuICAgIHNbNl0gPSBiNiBeIH5iOCAmIGIwO1xuICAgIHNbN10gPSBiNyBeIH5iOSAmIGIxO1xuICAgIHNbMTZdID0gYjE2IF4gfmIxOCAmIGIxMDtcbiAgICBzWzE3XSA9IGIxNyBeIH5iMTkgJiBiMTE7XG4gICAgc1syNl0gPSBiMjYgXiB+YjI4ICYgYjIwO1xuICAgIHNbMjddID0gYjI3IF4gfmIyOSAmIGIyMTtcbiAgICBzWzM2XSA9IGIzNiBeIH5iMzggJiBiMzA7XG4gICAgc1szN10gPSBiMzcgXiB+YjM5ICYgYjMxO1xuICAgIHNbNDZdID0gYjQ2IF4gfmI0OCAmIGI0MDtcbiAgICBzWzQ3XSA9IGI0NyBeIH5iNDkgJiBiNDE7XG4gICAgc1s4XSA9IGI4IF4gfmIwICYgYjI7XG4gICAgc1s5XSA9IGI5IF4gfmIxICYgYjM7XG4gICAgc1sxOF0gPSBiMTggXiB+YjEwICYgYjEyO1xuICAgIHNbMTldID0gYjE5IF4gfmIxMSAmIGIxMztcbiAgICBzWzI4XSA9IGIyOCBeIH5iMjAgJiBiMjI7XG4gICAgc1syOV0gPSBiMjkgXiB+YjIxICYgYjIzO1xuICAgIHNbMzhdID0gYjM4IF4gfmIzMCAmIGIzMjtcbiAgICBzWzM5XSA9IGIzOSBeIH5iMzEgJiBiMzM7XG4gICAgc1s0OF0gPSBiNDggXiB+YjQwICYgYjQyO1xuICAgIHNbNDldID0gYjQ5IF4gfmI0MSAmIGI0MztcblxuICAgIHNbMF0gXj0gUkNbbl07XG4gICAgc1sxXSBePSBSQ1tuICsgMV07XG4gIH1cbn07XG5cbnZhciBrZWNjYWsgPSBmdW5jdGlvbiBrZWNjYWsoYml0cykge1xuICByZXR1cm4gZnVuY3Rpb24gKHN0cikge1xuICAgIHZhciBtc2c7XG4gICAgaWYgKHN0ci5zbGljZSgwLCAyKSA9PT0gXCIweFwiKSB7XG4gICAgICBtc2cgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAyLCBsID0gc3RyLmxlbmd0aDsgaSA8IGw7IGkgKz0gMikge1xuICAgICAgICBtc2cucHVzaChwYXJzZUludChzdHIuc2xpY2UoaSwgaSArIDIpLCAxNikpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBtc2cgPSBzdHI7XG4gICAgfVxuICAgIHJldHVybiB1cGRhdGUoS2VjY2FrKGJpdHMsIGJpdHMpLCBtc2cpO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGtlY2NhazI1Njoga2VjY2FrKDI1NiksXG4gIGtlY2NhazUxMjoga2VjY2FrKDUxMiksXG4gIGtlY2NhazI1NnM6IGtlY2NhaygyNTYpLFxuICBrZWNjYWs1MTJzOiBrZWNjYWsoNTEyKVxufTsiLCJleHBvcnRzLmZldGNoID0gaXNGdW5jdGlvbihnbG9iYWwuZmV0Y2gpICYmIGlzRnVuY3Rpb24oZ2xvYmFsLlJlYWRhYmxlU3RyZWFtKVxuXG5leHBvcnRzLndyaXRhYmxlU3RyZWFtID0gaXNGdW5jdGlvbihnbG9iYWwuV3JpdGFibGVTdHJlYW0pXG5cbmV4cG9ydHMuYWJvcnRDb250cm9sbGVyID0gaXNGdW5jdGlvbihnbG9iYWwuQWJvcnRDb250cm9sbGVyKVxuXG5leHBvcnRzLmJsb2JDb25zdHJ1Y3RvciA9IGZhbHNlXG50cnkge1xuXHRuZXcgQmxvYihbbmV3IEFycmF5QnVmZmVyKDEpXSlcblx0ZXhwb3J0cy5ibG9iQ29uc3RydWN0b3IgPSB0cnVlXG59IGNhdGNoIChlKSB7fVxuXG4vLyBUaGUgeGhyIHJlcXVlc3QgdG8gZXhhbXBsZS5jb20gbWF5IHZpb2xhdGUgc29tZSByZXN0cmljdGl2ZSBDU1AgY29uZmlndXJhdGlvbnMsXG4vLyBzbyBpZiB3ZSdyZSBydW5uaW5nIGluIGEgYnJvd3NlciB0aGF0IHN1cHBvcnRzIGBmZXRjaGAsIGF2b2lkIGNhbGxpbmcgZ2V0WEhSKClcbi8vIGFuZCBhc3N1bWUgc3VwcG9ydCBmb3IgY2VydGFpbiBmZWF0dXJlcyBiZWxvdy5cbnZhciB4aHJcbmZ1bmN0aW9uIGdldFhIUiAoKSB7XG5cdC8vIENhY2hlIHRoZSB4aHIgdmFsdWVcblx0aWYgKHhociAhPT0gdW5kZWZpbmVkKSByZXR1cm4geGhyXG5cblx0aWYgKGdsb2JhbC5YTUxIdHRwUmVxdWVzdCkge1xuXHRcdHhociA9IG5ldyBnbG9iYWwuWE1MSHR0cFJlcXVlc3QoKVxuXHRcdC8vIElmIFhEb21haW5SZXF1ZXN0IGlzIGF2YWlsYWJsZSAoaWUgb25seSwgd2hlcmUgeGhyIG1pZ2h0IG5vdCB3b3JrXG5cdFx0Ly8gY3Jvc3MgZG9tYWluKSwgdXNlIHRoZSBwYWdlIGxvY2F0aW9uLiBPdGhlcndpc2UgdXNlIGV4YW1wbGUuY29tXG5cdFx0Ly8gTm90ZTogdGhpcyBkb2Vzbid0IGFjdHVhbGx5IG1ha2UgYW4gaHR0cCByZXF1ZXN0LlxuXHRcdHRyeSB7XG5cdFx0XHR4aHIub3BlbignR0VUJywgZ2xvYmFsLlhEb21haW5SZXF1ZXN0ID8gJy8nIDogJ2h0dHBzOi8vZXhhbXBsZS5jb20nKVxuXHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0eGhyID0gbnVsbFxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHQvLyBTZXJ2aWNlIHdvcmtlcnMgZG9uJ3QgaGF2ZSBYSFJcblx0XHR4aHIgPSBudWxsXG5cdH1cblx0cmV0dXJuIHhoclxufVxuXG5mdW5jdGlvbiBjaGVja1R5cGVTdXBwb3J0ICh0eXBlKSB7XG5cdHZhciB4aHIgPSBnZXRYSFIoKVxuXHRpZiAoIXhocikgcmV0dXJuIGZhbHNlXG5cdHRyeSB7XG5cdFx0eGhyLnJlc3BvbnNlVHlwZSA9IHR5cGVcblx0XHRyZXR1cm4geGhyLnJlc3BvbnNlVHlwZSA9PT0gdHlwZVxuXHR9IGNhdGNoIChlKSB7fVxuXHRyZXR1cm4gZmFsc2Vcbn1cblxuLy8gRm9yIHNvbWUgc3RyYW5nZSByZWFzb24sIFNhZmFyaSA3LjAgcmVwb3J0cyB0eXBlb2YgZ2xvYmFsLkFycmF5QnVmZmVyID09PSAnb2JqZWN0Jy5cbi8vIFNhZmFyaSA3LjEgYXBwZWFycyB0byBoYXZlIGZpeGVkIHRoaXMgYnVnLlxudmFyIGhhdmVBcnJheUJ1ZmZlciA9IHR5cGVvZiBnbG9iYWwuQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnXG52YXIgaGF2ZVNsaWNlID0gaGF2ZUFycmF5QnVmZmVyICYmIGlzRnVuY3Rpb24oZ2xvYmFsLkFycmF5QnVmZmVyLnByb3RvdHlwZS5zbGljZSlcblxuLy8gSWYgZmV0Y2ggaXMgc3VwcG9ydGVkLCB0aGVuIGFycmF5YnVmZmVyIHdpbGwgYmUgc3VwcG9ydGVkIHRvby4gU2tpcCBjYWxsaW5nXG4vLyBjaGVja1R5cGVTdXBwb3J0KCksIHNpbmNlIHRoYXQgY2FsbHMgZ2V0WEhSKCkuXG5leHBvcnRzLmFycmF5YnVmZmVyID0gZXhwb3J0cy5mZXRjaCB8fCAoaGF2ZUFycmF5QnVmZmVyICYmIGNoZWNrVHlwZVN1cHBvcnQoJ2FycmF5YnVmZmVyJykpXG5cbi8vIFRoZXNlIG5leHQgdHdvIHRlc3RzIHVuYXZvaWRhYmx5IHNob3cgd2FybmluZ3MgaW4gQ2hyb21lLiBTaW5jZSBmZXRjaCB3aWxsIGFsd2F5c1xuLy8gYmUgdXNlZCBpZiBpdCdzIGF2YWlsYWJsZSwganVzdCByZXR1cm4gZmFsc2UgZm9yIHRoZXNlIHRvIGF2b2lkIHRoZSB3YXJuaW5ncy5cbmV4cG9ydHMubXNzdHJlYW0gPSAhZXhwb3J0cy5mZXRjaCAmJiBoYXZlU2xpY2UgJiYgY2hlY2tUeXBlU3VwcG9ydCgnbXMtc3RyZWFtJylcbmV4cG9ydHMubW96Y2h1bmtlZGFycmF5YnVmZmVyID0gIWV4cG9ydHMuZmV0Y2ggJiYgaGF2ZUFycmF5QnVmZmVyICYmXG5cdGNoZWNrVHlwZVN1cHBvcnQoJ21vei1jaHVua2VkLWFycmF5YnVmZmVyJylcblxuLy8gSWYgZmV0Y2ggaXMgc3VwcG9ydGVkLCB0aGVuIG92ZXJyaWRlTWltZVR5cGUgd2lsbCBiZSBzdXBwb3J0ZWQgdG9vLiBTa2lwIGNhbGxpbmdcbi8vIGdldFhIUigpLlxuZXhwb3J0cy5vdmVycmlkZU1pbWVUeXBlID0gZXhwb3J0cy5mZXRjaCB8fCAoZ2V0WEhSKCkgPyBpc0Z1bmN0aW9uKGdldFhIUigpLm92ZXJyaWRlTWltZVR5cGUpIDogZmFsc2UpXG5cbmV4cG9ydHMudmJBcnJheSA9IGlzRnVuY3Rpb24oZ2xvYmFsLlZCQXJyYXkpXG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24gKHZhbHVlKSB7XG5cdHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbidcbn1cblxueGhyID0gbnVsbCAvLyBIZWxwIGdjXG4iLCIvLyBUT0RPOiB0aGlzIGlzIGEgdGVtcG9yYXJ5IGZpeCB0byBoaWRlIHRob3NlIGxpYnJhcmllcyBmcm9tIHRoZSBicm93c2VyLiBBXG4vLyBzbGlnaHRseSBiZXR0ZXIgbG9uZy10ZXJtIHNvbHV0aW9uIHdvdWxkIGJlIHRvIHNwbGl0IHRoaXMgZmlsZSBpbnRvIHR3byxcbi8vIHNlcGFyYXRpbmcgdGhlIGZ1bmN0aW9ucyB0aGF0IGFyZSB1c2VkIG9uIE5vZGUuanMgZnJvbSB0aGUgZnVuY3Rpb25zIHRoYXRcbi8vIGFyZSB1c2VkIG9ubHkgb24gdGhlIGJyb3dzZXIuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChfcmVmKSB7XG4gIHZhciBmcyA9IF9yZWYuZnMsXG4gICAgICBmaWxlcyA9IF9yZWYuZmlsZXMsXG4gICAgICBvcyA9IF9yZWYub3MsXG4gICAgICBwYXRoID0gX3JlZi5wYXRoLFxuICAgICAgY2hpbGRfcHJvY2VzcyA9IF9yZWYuY2hpbGRfcHJvY2VzcyxcbiAgICAgIG1pbWV0eXBlID0gX3JlZi5taW1ldHlwZSxcbiAgICAgIGRlZmF1bHRBcmNoaXZlcyA9IF9yZWYuZGVmYXVsdEFyY2hpdmVzLFxuICAgICAgcmVxdWVzdCA9IF9yZWYucmVxdWVzdCxcbiAgICAgIGRvd25sb2FkVXJsID0gX3JlZi5kb3dubG9hZFVybCxcbiAgICAgIGJ5dGVzID0gX3JlZi5ieXRlcyxcbiAgICAgIGhhc2ggPSBfcmVmLmhhc2gsXG4gICAgICBwaWNrID0gX3JlZi5waWNrO1xuXG4gIC8vIOKIgCBhIC4gU3RyaW5nIC0+IEpTT04gLT4gTWFwIFN0cmluZyBhIC1vIE1hcCBTdHJpbmcgYVxuICAvLyAgIEluc2VydHMgYSBrZXkvdmFsIHBhaXIgaW4gYW4gb2JqZWN0IGltcHVyZWx5LlxuICB2YXIgaW1wdXJlSW5zZXJ0ID0gZnVuY3Rpb24gaW1wdXJlSW5zZXJ0KGtleSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKG1hcCkge1xuICAgICAgICByZXR1cm4gbWFwW2tleV0gPSB2YWwsIG1hcDtcbiAgICAgIH07XG4gICAgfTtcbiAgfTsgLy8gU3RyaW5nIC0+IEpTT04gLT4gTWFwIFN0cmluZyBKU09OXG4gIC8vICAgTWVyZ2VzIGFuIGFycmF5IG9mIGtleXMgYW5kIGFuIGFycmF5IG9mIHZhbHMgaW50byBhbiBvYmplY3QuXG5cblxuICB2YXIgdG9NYXAgPSBmdW5jdGlvbiB0b01hcChrZXlzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh2YWxzKSB7XG4gICAgICB2YXIgbWFwID0ge307XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgbWFwW2tleXNbaV1dID0gdmFsc1tpXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1hcDtcbiAgICB9O1xuICB9OyAvLyDiiIAgYSAuIE1hcCBTdHJpbmcgYSAtPiBNYXAgU3RyaW5nIGEgLT4gTWFwIFN0cmluZyBhXG4gIC8vICAgTWVyZ2VzIHR3byBtYXBzIGludG8gb25lLlxuXG5cbiAgdmFyIG1lcmdlID0gZnVuY3Rpb24gbWVyZ2UoYSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYikge1xuICAgICAgdmFyIG1hcCA9IHt9O1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gYSkge1xuICAgICAgICBtYXBba2V5XSA9IGFba2V5XTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgX2tleSBpbiBiKSB7XG4gICAgICAgIG1hcFtfa2V5XSA9IGJbX2tleV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtYXA7XG4gICAgfTtcbiAgfTsgLy8g4oiAIGEgLiBbYV0gLT4gW2FdIC0+IEJvb2xcblxuXG4gIHZhciBlcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMoYSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYikge1xuICAgICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGEubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgaWYgKGFbaV0gIT09IGJbaV0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICB9OyAvLyBTdHJpbmcgLT4gU3RyaW5nIC0+IFN0cmluZ1xuXG5cbiAgdmFyIHJhd1VybCA9IGZ1bmN0aW9uIHJhd1VybChzd2FybVVybCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoaGFzaCkge1xuICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KHN3YXJtVXJsLCBcIi9ienpyOi9cIikuY29uY2F0KGhhc2gpO1xuICAgIH07XG4gIH07IC8vIFN0cmluZyAtPiBTdHJpbmcgLT4gUHJvbWlzZSBVaW50OEFycmF5XG4gIC8vICAgR2V0cyB0aGUgcmF3IGNvbnRlbnRzIG9mIGEgU3dhcm0gaGFzaCBhZGRyZXNzLlxuXG5cbiAgdmFyIGRvd25sb2FkRGF0YSA9IGZ1bmN0aW9uIGRvd25sb2FkRGF0YShzd2FybVVybCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoaGFzaCkge1xuICAgICAgcmV0dXJuIHJlcXVlc3QocmF3VXJsKHN3YXJtVXJsKShoYXNoKSwge1xuICAgICAgICByZXNwb25zZVR5cGU6IFwiYXJyYXlidWZmZXJcIlxuICAgICAgfSkudGhlbihmdW5jdGlvbiAoYXJyYXlCdWZmZXIpIHtcbiAgICAgICAgdmFyIHVpbnQ4QXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheUJ1ZmZlcik7XG4gICAgICAgIHZhciBlcnJvcjQwNCA9IFs1MiwgNDgsIDUyLCAzMiwgMTEyLCA5NywgMTAzLCAxMDEsIDMyLCAxMTAsIDExMSwgMTE2LCAzMiwgMTAyLCAxMTEsIDExNywgMTEwLCAxMDAsIDEwXTtcbiAgICAgICAgaWYgKGVxdWFscyh1aW50OEFycmF5KShlcnJvcjQwNCkpIHRocm93IFwiRXJyb3IgNDA0LlwiO1xuICAgICAgICByZXR1cm4gdWludDhBcnJheTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH07IC8vIHR5cGUgRW50cnkgPSB7XCJ0eXBlXCI6IFN0cmluZywgXCJoYXNoXCI6IFN0cmluZ31cbiAgLy8gdHlwZSBGaWxlID0ge1widHlwZVwiOiBTdHJpbmcsIFwiZGF0YVwiOiBVaW50OEFycmF5fVxuICAvLyBTdHJpbmcgLT4gU3RyaW5nIC0+IFByb21pc2UgKE1hcCBTdHJpbmcgRW50cnkpXG4gIC8vICAgU29sdmVzIHRoZSBtYW5pZmVzdCBvZiBhIFN3YXJtIGFkZHJlc3MgcmVjdXJzaXZlbHkuXG4gIC8vICAgUmV0dXJucyBhIG1hcCBmcm9tIGZ1bGwgcGF0aHMgdG8gZW50cmllcy5cblxuXG4gIHZhciBkb3dubG9hZEVudHJpZXMgPSBmdW5jdGlvbiBkb3dubG9hZEVudHJpZXMoc3dhcm1VcmwpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGhhc2gpIHtcbiAgICAgIHZhciBzZWFyY2ggPSBmdW5jdGlvbiBzZWFyY2goaGFzaCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHJvdXRlcykge1xuICAgICAgICAgICAgLy8gRm9ybWF0cyBhbiBlbnRyeSB0byB0aGUgU3dhcm0uanMgdHlwZS5cbiAgICAgICAgICAgIHZhciBmb3JtYXQgPSBmdW5jdGlvbiBmb3JtYXQoZW50cnkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBlbnRyeS5jb250ZW50VHlwZSxcbiAgICAgICAgICAgICAgICBoYXNoOiBlbnRyeS5oYXNoXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9OyAvLyBUbyBkb3dubG9hZCBhIHNpbmdsZSBlbnRyeTpcbiAgICAgICAgICAgIC8vICAgaWYgdHlwZSBpcyBienotbWFuaWZlc3QsIGdvIGRlZXBlclxuICAgICAgICAgICAgLy8gICBpZiBub3QsIGFkZCBpdCB0byB0aGUgcm91dGluZyB0YWJsZVxuXG5cbiAgICAgICAgICAgIHZhciBkb3dubG9hZEVudHJ5ID0gZnVuY3Rpb24gZG93bmxvYWRFbnRyeShlbnRyeSkge1xuICAgICAgICAgICAgICBpZiAoZW50cnkucGF0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbnRyeS5jb250ZW50VHlwZSA9PT0gXCJhcHBsaWNhdGlvbi9ienotbWFuaWZlc3QranNvblwiID8gc2VhcmNoKGVudHJ5Lmhhc2gpKHBhdGggKyBlbnRyeS5wYXRoKShyb3V0ZXMpIDogUHJvbWlzZS5yZXNvbHZlKGltcHVyZUluc2VydChwYXRoICsgZW50cnkucGF0aCkoZm9ybWF0KGVudHJ5KSkocm91dGVzKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07IC8vIERvd25sb2FkcyB0aGUgaW5pdGlhbCBtYW5pZmVzdCBhbmQgdGhlbiBlYWNoIGVudHJ5LlxuXG5cbiAgICAgICAgICAgIHJldHVybiBkb3dubG9hZERhdGEoc3dhcm1VcmwpKGhhc2gpLnRoZW4oZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodG9TdHJpbmcodGV4dCkpLmVudHJpZXM7XG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChlbnRyaWVzKSB7XG4gICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChlbnRyaWVzLm1hcChkb3dubG9hZEVudHJ5KSk7XG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJvdXRlcztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gc2VhcmNoKGhhc2gpKFwiXCIpKHt9KTtcbiAgICB9O1xuICB9OyAvLyBTdHJpbmcgLT4gU3RyaW5nIC0+IFByb21pc2UgKE1hcCBTdHJpbmcgU3RyaW5nKVxuICAvLyAgIFNhbWUgYXMgYGRvd25sb2FkRW50cmllc2AsIGJ1dCByZXR1cm5zIG9ubHkgaGFzaGVzIChubyB0eXBlcykuXG5cblxuICB2YXIgZG93bmxvYWRSb3V0ZXMgPSBmdW5jdGlvbiBkb3dubG9hZFJvdXRlcyhzd2FybVVybCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoaGFzaCkge1xuICAgICAgcmV0dXJuIGRvd25sb2FkRW50cmllcyhzd2FybVVybCkoaGFzaCkudGhlbihmdW5jdGlvbiAoZW50cmllcykge1xuICAgICAgICByZXR1cm4gdG9NYXAoT2JqZWN0LmtleXMoZW50cmllcykpKE9iamVjdC5rZXlzKGVudHJpZXMpLm1hcChmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgICAgICByZXR1cm4gZW50cmllc1tyb3V0ZV0uaGFzaDtcbiAgICAgICAgfSkpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfTsgLy8gU3RyaW5nIC0+IFN0cmluZyAtPiBQcm9taXNlIChNYXAgU3RyaW5nIEZpbGUpXG4gIC8vICAgR2V0cyB0aGUgZW50aXJlIGRpcmVjdG9yeSB0cmVlIGluIGEgU3dhcm0gYWRkcmVzcy5cbiAgLy8gICBSZXR1cm5zIGEgcHJvbWlzZSBtYXBwaW5nIHBhdGhzIHRvIGZpbGUgY29udGVudHMuXG5cblxuICB2YXIgZG93bmxvYWREaXJlY3RvcnkgPSBmdW5jdGlvbiBkb3dubG9hZERpcmVjdG9yeShzd2FybVVybCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoaGFzaCkge1xuICAgICAgcmV0dXJuIGRvd25sb2FkRW50cmllcyhzd2FybVVybCkoaGFzaCkudGhlbihmdW5jdGlvbiAoZW50cmllcykge1xuICAgICAgICB2YXIgcGF0aHMgPSBPYmplY3Qua2V5cyhlbnRyaWVzKTtcbiAgICAgICAgdmFyIGhhc2hzID0gcGF0aHMubWFwKGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgICAgcmV0dXJuIGVudHJpZXNbcGF0aF0uaGFzaDtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciB0eXBlcyA9IHBhdGhzLm1hcChmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICAgIHJldHVybiBlbnRyaWVzW3BhdGhdLnR5cGU7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgZGF0YXMgPSBoYXNocy5tYXAoZG93bmxvYWREYXRhKHN3YXJtVXJsKSk7XG5cbiAgICAgICAgdmFyIGZpbGVzID0gZnVuY3Rpb24gZmlsZXMoZGF0YXMpIHtcbiAgICAgICAgICByZXR1cm4gZGF0YXMubWFwKGZ1bmN0aW9uIChkYXRhLCBpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICB0eXBlOiB0eXBlc1tpXSxcbiAgICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoZGF0YXMpLnRoZW4oZnVuY3Rpb24gKGRhdGFzKSB7XG4gICAgICAgICAgcmV0dXJuIHRvTWFwKHBhdGhzKShmaWxlcyhkYXRhcykpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH07IC8vIFN0cmluZyAtPiBTdHJpbmcgLT4gU3RyaW5nIC0+IFByb21pc2UgU3RyaW5nXG4gIC8vICAgR2V0cyB0aGUgcmF3IGNvbnRlbnRzIG9mIGEgU3dhcm0gaGFzaCBhZGRyZXNzLlxuICAvLyAgIFJldHVybnMgYSBwcm9taXNlIHdpdGggdGhlIGRvd25sb2FkZWQgZmlsZSBwYXRoLlxuXG5cbiAgdmFyIGRvd25sb2FkRGF0YVRvRGlzayA9IGZ1bmN0aW9uIGRvd25sb2FkRGF0YVRvRGlzayhzd2FybVVybCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoaGFzaCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChmaWxlUGF0aCkge1xuICAgICAgICByZXR1cm4gZmlsZXMuZG93bmxvYWQocmF3VXJsKHN3YXJtVXJsKShoYXNoKSkoZmlsZVBhdGgpO1xuICAgICAgfTtcbiAgICB9O1xuICB9OyAvLyBTdHJpbmcgLT4gU3RyaW5nIC0+IFN0cmluZyAtPiBQcm9taXNlIChNYXAgU3RyaW5nIFN0cmluZylcbiAgLy8gICBHZXRzIHRoZSBlbnRpcmUgZGlyZWN0b3J5IHRyZWUgaW4gYSBTd2FybSBhZGRyZXNzLlxuICAvLyAgIFJldHVybnMgYSBwcm9taXNlIG1hcHBpbmcgcGF0aHMgdG8gZmlsZSBjb250ZW50cy5cblxuXG4gIHZhciBkb3dubG9hZERpcmVjdG9yeVRvRGlzayA9IGZ1bmN0aW9uIGRvd25sb2FkRGlyZWN0b3J5VG9EaXNrKHN3YXJtVXJsKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChoYXNoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGRpclBhdGgpIHtcbiAgICAgICAgcmV0dXJuIGRvd25sb2FkUm91dGVzKHN3YXJtVXJsKShoYXNoKS50aGVuKGZ1bmN0aW9uIChyb3V0aW5nVGFibGUpIHtcbiAgICAgICAgICB2YXIgZG93bmxvYWRzID0gW107XG5cbiAgICAgICAgICBmb3IgKHZhciByb3V0ZSBpbiByb3V0aW5nVGFibGUpIHtcbiAgICAgICAgICAgIGlmIChyb3V0ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIHZhciBmaWxlUGF0aCA9IHBhdGguam9pbihkaXJQYXRoLCByb3V0ZSk7XG4gICAgICAgICAgICAgIGRvd25sb2Fkcy5wdXNoKGRvd25sb2FkRGF0YVRvRGlzayhzd2FybVVybCkocm91dGluZ1RhYmxlW3JvdXRlXSkoZmlsZVBhdGgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIDtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoZG93bmxvYWRzKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBkaXJQYXRoO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfTtcbiAgfTsgLy8gU3RyaW5nIC0+IFVpbnQ4QXJyYXkgLT4gUHJvbWlzZSBTdHJpbmdcbiAgLy8gICBVcGxvYWRzIHJhdyBkYXRhIHRvIFN3YXJtLlxuICAvLyAgIFJldHVybnMgYSBwcm9taXNlIHdpdGggdGhlIHVwbG9hZGVkIGhhc2guXG5cblxuICB2YXIgdXBsb2FkRGF0YSA9IGZ1bmN0aW9uIHVwbG9hZERhdGEoc3dhcm1VcmwpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHJldHVybiByZXF1ZXN0KFwiXCIuY29uY2F0KHN3YXJtVXJsLCBcIi9ienpyOi9cIiksIHtcbiAgICAgICAgYm9keTogdHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIgPyBmcm9tU3RyaW5nKGRhdGEpIDogZGF0YSxcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIlxuICAgICAgfSk7XG4gICAgfTtcbiAgfTsgLy8gU3RyaW5nIC0+IFN0cmluZyAtPiBTdHJpbmcgLT4gRmlsZSAtPiBQcm9taXNlIFN0cmluZ1xuICAvLyAgIFVwbG9hZHMgYSBmaWxlIHRvIHRoZSBTd2FybSBtYW5pZmVzdCBhdCBhIGdpdmVuIGhhc2gsIHVuZGVyIGEgc3BlY2lmaWNcbiAgLy8gICByb3V0ZS4gUmV0dXJucyBhIHByb21pc2UgY29udGFpbmluZyB0aGUgdXBsb2FkZWQgaGFzaC5cbiAgLy8gICBGSVhNRTogZm9yIHNvbWUgcmVhc29ucyBTd2FybS1HYXRld2F5cyBpcyBzb21ldGltZXMgcmV0dXJuaW5nXG4gIC8vICAgZXJyb3IgNDA0wqAoYmFkIHJlcXVlc3QpLCBzbyB3ZSByZXRyeSB1cCB0byAzIHRpbWVzLiBXaHk/XG5cblxuICB2YXIgdXBsb2FkVG9NYW5pZmVzdCA9IGZ1bmN0aW9uIHVwbG9hZFRvTWFuaWZlc3Qoc3dhcm1VcmwpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGhhc2gpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgICAgdmFyIGF0dGVtcHQgPSBmdW5jdGlvbiBhdHRlbXB0KG4pIHtcbiAgICAgICAgICAgIHZhciBzbGFzaFJvdXRlID0gcm91dGVbMF0gPT09IFwiL1wiID8gcm91dGUgOiBcIi9cIiArIHJvdXRlO1xuICAgICAgICAgICAgdmFyIHVybCA9IFwiXCIuY29uY2F0KHN3YXJtVXJsLCBcIi9ieno6L1wiKS5jb25jYXQoaGFzaCkuY29uY2F0KHNsYXNoUm91dGUpO1xuICAgICAgICAgICAgdmFyIG9wdCA9IHtcbiAgICAgICAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogZmlsZS50eXBlXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGJvZHk6IGZpbGUuZGF0YVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0KHVybCwgb3B0KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuaW5kZXhPZihcImVycm9yXCIpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG4gPiAwICYmIGF0dGVtcHQobiAtIDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHJldHVybiBhdHRlbXB0KDMpO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICB9O1xuICB9OyAvLyBTdHJpbmcgLT4ge3R5cGU6IFN0cmluZywgZGF0YTogVWludDhBcnJheX0gLT4gUHJvbWlzZSBTdHJpbmdcblxuXG4gIHZhciB1cGxvYWRGaWxlID0gZnVuY3Rpb24gdXBsb2FkRmlsZShzd2FybVVybCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZmlsZSkge1xuICAgICAgcmV0dXJuIHVwbG9hZERpcmVjdG9yeShzd2FybVVybCkoe1xuICAgICAgICBcIlwiOiBmaWxlXG4gICAgICB9KTtcbiAgICB9O1xuICB9OyAvLyBTdHJpbmcgLT4gU3RyaW5nIC0+IFByb21pc2UgU3RyaW5nXG5cblxuICB2YXIgdXBsb2FkRmlsZUZyb21EaXNrID0gZnVuY3Rpb24gdXBsb2FkRmlsZUZyb21EaXNrKHN3YXJtVXJsKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChmaWxlUGF0aCkge1xuICAgICAgcmV0dXJuIGZzLnJlYWRGaWxlKGZpbGVQYXRoKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiB1cGxvYWRGaWxlKHN3YXJtVXJsKSh7XG4gICAgICAgICAgdHlwZTogbWltZXR5cGUubG9va3VwKGZpbGVQYXRoKSxcbiAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfTsgLy8gU3RyaW5nIC0+IE1hcCBTdHJpbmcgRmlsZSAtPiBQcm9taXNlIFN0cmluZ1xuICAvLyAgIFVwbG9hZHMgYSBkaXJlY3RvcnkgdG8gU3dhcm0uIFRoZSBkaXJlY3RvcnkgaXNcbiAgLy8gICByZXByZXNlbnRlZCBhcyBhIG1hcCBvZiByb3V0ZXMgYW5kIGZpbGVzLlxuICAvLyAgIEEgZGVmYXVsdCBwYXRoIGlzIGVuY29kZWQgYnkgaGF2aW5nIGEgXCJcIiByb3V0ZS5cblxuXG4gIHZhciB1cGxvYWREaXJlY3RvcnkgPSBmdW5jdGlvbiB1cGxvYWREaXJlY3Rvcnkoc3dhcm1VcmwpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRpcmVjdG9yeSkge1xuICAgICAgcmV0dXJuIHVwbG9hZERhdGEoc3dhcm1VcmwpKFwie31cIikudGhlbihmdW5jdGlvbiAoaGFzaCkge1xuICAgICAgICB2YXIgdXBsb2FkUm91dGUgPSBmdW5jdGlvbiB1cGxvYWRSb3V0ZShyb3V0ZSkge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoaGFzaCkge1xuICAgICAgICAgICAgcmV0dXJuIHVwbG9hZFRvTWFuaWZlc3Qoc3dhcm1VcmwpKGhhc2gpKHJvdXRlKShkaXJlY3Rvcnlbcm91dGVdKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB1cGxvYWRUb0hhc2ggPSBmdW5jdGlvbiB1cGxvYWRUb0hhc2goaGFzaCwgcm91dGUpIHtcbiAgICAgICAgICByZXR1cm4gaGFzaC50aGVuKHVwbG9hZFJvdXRlKHJvdXRlKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGRpcmVjdG9yeSkucmVkdWNlKHVwbG9hZFRvSGFzaCwgUHJvbWlzZS5yZXNvbHZlKGhhc2gpKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH07IC8vIFN0cmluZyAtPiBQcm9taXNlIFN0cmluZ1xuXG5cbiAgdmFyIHVwbG9hZERhdGFGcm9tRGlzayA9IGZ1bmN0aW9uIHVwbG9hZERhdGFGcm9tRGlzayhzd2FybVVybCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZmlsZVBhdGgpIHtcbiAgICAgIHJldHVybiBmcy5yZWFkRmlsZShmaWxlUGF0aCkudGhlbih1cGxvYWREYXRhKHN3YXJtVXJsKSk7XG4gICAgfTtcbiAgfTsgLy8gU3RyaW5nIC0+IE51bGxhYmxlIFN0cmluZyAtPiBTdHJpbmcgLT4gUHJvbWlzZSBTdHJpbmdcblxuXG4gIHZhciB1cGxvYWREaXJlY3RvcnlGcm9tRGlzayA9IGZ1bmN0aW9uIHVwbG9hZERpcmVjdG9yeUZyb21EaXNrKHN3YXJtVXJsKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkZWZhdWx0UGF0aCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkaXJQYXRoKSB7XG4gICAgICAgIHJldHVybiBmaWxlcy5kaXJlY3RvcnlUcmVlKGRpclBhdGgpLnRoZW4oZnVuY3Rpb24gKGZ1bGxQYXRocykge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChmdWxsUGF0aHMubWFwKGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgICAgICByZXR1cm4gZnMucmVhZEZpbGUocGF0aCk7XG4gICAgICAgICAgfSkpLnRoZW4oZnVuY3Rpb24gKGRhdGFzKSB7XG4gICAgICAgICAgICB2YXIgcGF0aHMgPSBmdWxsUGF0aHMubWFwKGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXRoLnNsaWNlKGRpclBhdGgubGVuZ3RoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIHR5cGVzID0gZnVsbFBhdGhzLm1hcChmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICAgICAgICByZXR1cm4gbWltZXR5cGUubG9va3VwKHBhdGgpIHx8IFwidGV4dC9wbGFpblwiO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdG9NYXAocGF0aHMpKGRhdGFzLm1hcChmdW5jdGlvbiAoZGF0YSwgaSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6IHR5cGVzW2ldLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoZGlyZWN0b3J5KSB7XG4gICAgICAgICAgcmV0dXJuIG1lcmdlKGRlZmF1bHRQYXRoID8ge1xuICAgICAgICAgICAgXCJcIjogZGlyZWN0b3J5W2RlZmF1bHRQYXRoXVxuICAgICAgICAgIH0gOiB7fSkoZGlyZWN0b3J5KTtcbiAgICAgICAgfSkudGhlbih1cGxvYWREaXJlY3Rvcnkoc3dhcm1VcmwpKTtcbiAgICAgIH07XG4gICAgfTtcbiAgfTsgLy8gU3RyaW5nIC0+IFVwbG9hZEluZm8gLT4gUHJvbWlzZSBTdHJpbmdcbiAgLy8gICBTaW1wbGlmaWVkIG11bHRpLXR5cGUgdXBsb2FkIHdoaWNoIGNhbGxzIHRoZSBjb3JyZWN0XG4gIC8vICAgb25lIGJhc2VkIG9uIHRoZSB0eXBlIG9mIHRoZSBhcmd1bWVudCBnaXZlbi5cblxuXG4gIHZhciBfdXBsb2FkID0gZnVuY3Rpb24gdXBsb2FkKHN3YXJtVXJsKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgIC8vIFVwbG9hZCByYXcgZGF0YSBmcm9tIGJyb3dzZXJcbiAgICAgIGlmIChhcmcucGljayA9PT0gXCJkYXRhXCIpIHtcbiAgICAgICAgcmV0dXJuIHBpY2suZGF0YSgpLnRoZW4odXBsb2FkRGF0YShzd2FybVVybCkpOyAvLyBVcGxvYWQgYSBmaWxlIGZyb20gYnJvd3NlclxuICAgICAgfSBlbHNlIGlmIChhcmcucGljayA9PT0gXCJmaWxlXCIpIHtcbiAgICAgICAgcmV0dXJuIHBpY2suZmlsZSgpLnRoZW4odXBsb2FkRmlsZShzd2FybVVybCkpOyAvLyBVcGxvYWQgYSBkaXJlY3RvcnkgZnJvbSBicm93c2VyXG4gICAgICB9IGVsc2UgaWYgKGFyZy5waWNrID09PSBcImRpcmVjdG9yeVwiKSB7XG4gICAgICAgIHJldHVybiBwaWNrLmRpcmVjdG9yeSgpLnRoZW4odXBsb2FkRGlyZWN0b3J5KHN3YXJtVXJsKSk7IC8vIFVwbG9hZCBkaXJlY3RvcnkvZmlsZSBmcm9tIGRpc2tcbiAgICAgIH0gZWxzZSBpZiAoYXJnLnBhdGgpIHtcbiAgICAgICAgc3dpdGNoIChhcmcua2luZCkge1xuICAgICAgICAgIGNhc2UgXCJkYXRhXCI6XG4gICAgICAgICAgICByZXR1cm4gdXBsb2FkRGF0YUZyb21EaXNrKHN3YXJtVXJsKShhcmcucGF0aCk7XG5cbiAgICAgICAgICBjYXNlIFwiZmlsZVwiOlxuICAgICAgICAgICAgcmV0dXJuIHVwbG9hZEZpbGVGcm9tRGlzayhzd2FybVVybCkoYXJnLnBhdGgpO1xuXG4gICAgICAgICAgY2FzZSBcImRpcmVjdG9yeVwiOlxuICAgICAgICAgICAgcmV0dXJuIHVwbG9hZERpcmVjdG9yeUZyb21EaXNrKHN3YXJtVXJsKShhcmcuZGVmYXVsdEZpbGUpKGFyZy5wYXRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIDsgLy8gVXBsb2FkIFVURi04IHN0cmluZyBvciByYXcgZGF0YSAoYnVmZmVyKVxuICAgICAgfSBlbHNlIGlmIChhcmcubGVuZ3RoIHx8IHR5cGVvZiBhcmcgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIHVwbG9hZERhdGEoc3dhcm1VcmwpKGFyZyk7IC8vIFVwbG9hZCBkaXJlY3Rvcnkgd2l0aCBKU09OXG4gICAgICB9IGVsc2UgaWYgKGFyZyBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICByZXR1cm4gdXBsb2FkRGlyZWN0b3J5KHN3YXJtVXJsKShhcmcpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQmFkIGFyZ3VtZW50c1wiKSk7XG4gICAgfTtcbiAgfTsgLy8gU3RyaW5nIC0+IFN0cmluZyAtPiBOdWxsYWJsZSBTdHJpbmcgLT4gUHJvbWlzZSAoU3RyaW5nIHwgVWludDhBcnJheSB8IE1hcCBTdHJpbmcgVWludDhBcnJheSlcbiAgLy8gICBTaW1wbGlmaWVkIG11bHRpLXR5cGUgZG93bmxvYWQgd2hpY2ggY2FsbHMgdGhlIGNvcnJlY3QgZnVuY3Rpb24gYmFzZWQgb25cbiAgLy8gICB0aGUgdHlwZSBvZiB0aGUgYXJndW1lbnQgZ2l2ZW4sIGFuZCBvbiB3aGV0aGVyIHRoZSBTd3dhcm0gYWRkcmVzcyBoYXMgYVxuICAvLyAgIGRpcmVjdG9yeSBvciBhIGZpbGUuXG5cblxuICB2YXIgX2Rvd25sb2FkID0gZnVuY3Rpb24gZG93bmxvYWQoc3dhcm1VcmwpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGhhc2gpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICByZXR1cm4gaXNEaXJlY3Rvcnkoc3dhcm1VcmwpKGhhc2gpLnRoZW4oZnVuY3Rpb24gKGlzRGlyKSB7XG4gICAgICAgICAgaWYgKGlzRGlyKSB7XG4gICAgICAgICAgICByZXR1cm4gcGF0aCA/IGRvd25sb2FkRGlyZWN0b3J5VG9EaXNrKHN3YXJtVXJsKShoYXNoKShwYXRoKSA6IGRvd25sb2FkRGlyZWN0b3J5KHN3YXJtVXJsKShoYXNoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHBhdGggPyBkb3dubG9hZERhdGFUb0Rpc2soc3dhcm1VcmwpKGhhc2gpKHBhdGgpIDogZG93bmxvYWREYXRhKHN3YXJtVXJsKShoYXNoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9O1xuICB9OyAvLyBTdHJpbmcgLT4gUHJvbWlzZSBTdHJpbmdcbiAgLy8gICBEb3dubG9hZHMgdGhlIFN3YXJtIGJpbmFyaWVzIGludG8gYSBwYXRoLiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IG9ubHlcbiAgLy8gICByZXNvbHZlcyB3aGVuIHRoZSBleGFjdCBTd2FybSBmaWxlIGlzIHRoZXJlLCBhbmQgdmVyaWZpZWQgdG8gYmUgY29ycmVjdC5cbiAgLy8gICBJZiBpdCB3YXMgYWxyZWFkeSB0aGVyZSB0byBiZWdpbiB3aXRoLCBza2lwcyB0aGUgZG93bmxvYWQuXG5cblxuICB2YXIgZG93bmxvYWRCaW5hcnkgPSBmdW5jdGlvbiBkb3dubG9hZEJpbmFyeShwYXRoLCBhcmNoaXZlcykge1xuICAgIHZhciBzeXN0ZW0gPSBvcy5wbGF0Zm9ybSgpLnJlcGxhY2UoXCJ3aW4zMlwiLCBcIndpbmRvd3NcIikgKyBcIi1cIiArIChvcy5hcmNoKCkgPT09IFwieDY0XCIgPyBcImFtZDY0XCIgOiBcIjM4NlwiKTtcbiAgICB2YXIgYXJjaGl2ZSA9IChhcmNoaXZlcyB8fCBkZWZhdWx0QXJjaGl2ZXMpW3N5c3RlbV07XG4gICAgdmFyIGFyY2hpdmVVcmwgPSBkb3dubG9hZFVybCArIGFyY2hpdmUuYXJjaGl2ZSArIFwiLnRhci5nelwiO1xuICAgIHZhciBhcmNoaXZlTUQ1ID0gYXJjaGl2ZS5hcmNoaXZlTUQ1O1xuICAgIHZhciBiaW5hcnlNRDUgPSBhcmNoaXZlLmJpbmFyeU1ENTtcbiAgICByZXR1cm4gZmlsZXMuc2FmZURvd25sb2FkQXJjaGl2ZWQoYXJjaGl2ZVVybCkoYXJjaGl2ZU1ENSkoYmluYXJ5TUQ1KShwYXRoKTtcbiAgfTsgLy8gdHlwZSBTd2FybVNldHVwID0ge1xuICAvLyAgIGFjY291bnQgOiBTdHJpbmcsXG4gIC8vICAgcGFzc3dvcmQgOiBTdHJpbmcsXG4gIC8vICAgZGF0YURpciA6IFN0cmluZyxcbiAgLy8gICBiaW5QYXRoIDogU3RyaW5nLFxuICAvLyAgIGVuc0FwaSA6IFN0cmluZyxcbiAgLy8gICBvbkRvd25sb2FkUHJvZ3Jlc3MgOiBOdW1iZXIgfj4gKCksXG4gIC8vICAgYXJjaGl2ZXMgOiBbe1xuICAvLyAgICAgYXJjaGl2ZTogU3RyaW5nLFxuICAvLyAgICAgYmluYXJ5TUQ1OiBTdHJpbmcsXG4gIC8vICAgICBhcmNoaXZlTUQ1OiBTdHJpbmdcbiAgLy8gICB9XVxuICAvLyB9XG4gIC8vIFN3YXJtU2V0dXAgfj4gUHJvbWlzZSBQcm9jZXNzXG4gIC8vICAgU3RhcnRzIHRoZSBTd2FybSBwcm9jZXNzLlxuXG5cbiAgdmFyIHN0YXJ0UHJvY2VzcyA9IGZ1bmN0aW9uIHN0YXJ0UHJvY2Vzcyhzd2FybVNldHVwKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBzcGF3biA9IGNoaWxkX3Byb2Nlc3Muc3Bhd247XG5cbiAgICAgIHZhciBoYXNTdHJpbmcgPSBmdW5jdGlvbiBoYXNTdHJpbmcoc3RyKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYnVmZmVyKSB7XG4gICAgICAgICAgcmV0dXJuICgnJyArIGJ1ZmZlcikuaW5kZXhPZihzdHIpICE9PSAtMTtcbiAgICAgICAgfTtcbiAgICAgIH07XG5cbiAgICAgIHZhciBhY2NvdW50ID0gc3dhcm1TZXR1cC5hY2NvdW50LFxuICAgICAgICAgIHBhc3N3b3JkID0gc3dhcm1TZXR1cC5wYXNzd29yZCxcbiAgICAgICAgICBkYXRhRGlyID0gc3dhcm1TZXR1cC5kYXRhRGlyLFxuICAgICAgICAgIGVuc0FwaSA9IHN3YXJtU2V0dXAuZW5zQXBpLFxuICAgICAgICAgIHByaXZhdGVLZXkgPSBzd2FybVNldHVwLnByaXZhdGVLZXk7XG4gICAgICB2YXIgU1RBUlRVUF9USU1FT1VUX1NFQ1MgPSAzO1xuICAgICAgdmFyIFdBSVRJTkdfUEFTU1dPUkQgPSAwO1xuICAgICAgdmFyIFNUQVJUSU5HID0gMTtcbiAgICAgIHZhciBMSVNURU5JTkcgPSAyO1xuICAgICAgdmFyIFBBU1NXT1JEX1BST01QVF9IT09LID0gXCJQYXNzcGhyYXNlXCI7XG4gICAgICB2YXIgTElTVEVOSU5HX0hPT0sgPSBcIlN3YXJtIGh0dHAgcHJveHkgc3RhcnRlZFwiO1xuICAgICAgdmFyIHN0YXRlID0gV0FJVElOR19QQVNTV09SRDtcbiAgICAgIHZhciBzd2FybVByb2Nlc3MgPSBzcGF3bihzd2FybVNldHVwLmJpblBhdGgsIFsnLS1ienphY2NvdW50JywgYWNjb3VudCB8fCBwcml2YXRlS2V5LCAnLS1kYXRhZGlyJywgZGF0YURpciwgJy0tZW5zLWFwaScsIGVuc0FwaV0pO1xuXG4gICAgICB2YXIgaGFuZGxlUHJvY2Vzc091dHB1dCA9IGZ1bmN0aW9uIGhhbmRsZVByb2Nlc3NPdXRwdXQoZGF0YSkge1xuICAgICAgICBpZiAoc3RhdGUgPT09IFdBSVRJTkdfUEFTU1dPUkQgJiYgaGFzU3RyaW5nKFBBU1NXT1JEX1BST01QVF9IT09LKShkYXRhKSkge1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RhdGUgPSBTVEFSVElORztcbiAgICAgICAgICAgIHN3YXJtUHJvY2Vzcy5zdGRpbi53cml0ZShwYXNzd29yZCArICdcXG4nKTtcbiAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9IGVsc2UgaWYgKGhhc1N0cmluZyhMSVNURU5JTkdfSE9PSykoZGF0YSkpIHtcbiAgICAgICAgICBzdGF0ZSA9IExJU1RFTklORztcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgcmVzb2x2ZShzd2FybVByb2Nlc3MpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBzd2FybVByb2Nlc3Muc3Rkb3V0Lm9uKCdkYXRhJywgaGFuZGxlUHJvY2Vzc091dHB1dCk7XG4gICAgICBzd2FybVByb2Nlc3Muc3RkZXJyLm9uKCdkYXRhJywgaGFuZGxlUHJvY2Vzc091dHB1dCk7IC8vc3dhcm1Qcm9jZXNzLm9uKCdjbG9zZScsICgpID0+IHNldFRpbWVvdXQocmVzdGFydCwgMjAwMCkpO1xuXG4gICAgICB2YXIgcmVzdGFydCA9IGZ1bmN0aW9uIHJlc3RhcnQoKSB7XG4gICAgICAgIHJldHVybiBzdGFydFByb2Nlc3Moc3dhcm1TZXR1cCkudGhlbihyZXNvbHZlKS5jYXRjaChyZWplY3QpO1xuICAgICAgfTtcblxuICAgICAgdmFyIGVycm9yID0gZnVuY3Rpb24gZXJyb3IoKSB7XG4gICAgICAgIHJldHVybiByZWplY3QobmV3IEVycm9yKFwiQ291bGRuJ3Qgc3RhcnQgc3dhcm0gcHJvY2Vzcy5cIikpO1xuICAgICAgfTtcblxuICAgICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGVycm9yLCAyMDAwMCk7XG4gICAgfSk7XG4gIH07IC8vIFByb2Nlc3Mgfj4gUHJvbWlzZSAoKVxuICAvLyAgIFN0b3BzIHRoZSBTd2FybSBwcm9jZXNzLlxuXG5cbiAgdmFyIHN0b3BQcm9jZXNzID0gZnVuY3Rpb24gc3RvcFByb2Nlc3MocHJvY2Vzcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBwcm9jZXNzLnN0ZGVyci5yZW1vdmVBbGxMaXN0ZW5lcnMoJ2RhdGEnKTtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LnJlbW92ZUFsbExpc3RlbmVycygnZGF0YScpO1xuICAgICAgcHJvY2Vzcy5zdGRpbi5yZW1vdmVBbGxMaXN0ZW5lcnMoJ2Vycm9yJyk7XG4gICAgICBwcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycygnZXJyb3InKTtcbiAgICAgIHByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzKCdleGl0Jyk7XG4gICAgICBwcm9jZXNzLmtpbGwoJ1NJR0lOVCcpO1xuICAgICAgdmFyIGtpbGxUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBwcm9jZXNzLmtpbGwoJ1NJR0tJTEwnKTtcbiAgICAgIH0sIDgwMDApO1xuICAgICAgcHJvY2Vzcy5vbmNlKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGtpbGxUaW1lb3V0KTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07IC8vIFN3YXJtU2V0dXAgLT4gKFN3YXJtQVBJIC0+IFByb21pc2UgKCkpIC0+IFByb21pc2UgKClcbiAgLy8gICBSZWNlaXZlcyBhIFN3YXJtIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGFuZCBhIGNhbGxiYWNrIGZ1bmN0aW9uLiBJdCB0aGVuXG4gIC8vICAgY2hlY2tzIGlmIGEgbG9jYWwgU3dhcm0gbm9kZSBpcyBydW5uaW5nLiBJZiBubyBsb2NhbCBTd2FybSBpcyBmb3VuZCwgaXRcbiAgLy8gICBkb3dubG9hZHMgdGhlIFN3YXJtIGJpbmFyaWVzIHRvIHRoZSBkYXRhRGlyIChpZiBub3QgdGhlcmUpLCBjaGVja3N1bXMsXG4gIC8vICAgc3RhcnRzIHRoZSBTd2FybSBwcm9jZXNzIGFuZCBjYWxscyB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBhbiBBUElcbiAgLy8gICBvYmplY3QgdXNpbmcgdGhlIGxvY2FsIG5vZGUuIFRoYXQgY2FsbGJhY2sgbXVzdCByZXR1cm4gYSBwcm9taXNlIHdoaWNoXG4gIC8vICAgd2lsbCByZXNvbHZlIHdoZW4gaXQgaXMgZG9uZSB1c2luZyB0aGUgQVBJLCBzbyB0aGF0IHRoaXMgZnVuY3Rpb24gY2FuXG4gIC8vICAgY2xvc2UgdGhlIFN3YXJtIHByb2Nlc3MgcHJvcGVybHkuIFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGVcbiAgLy8gICB1c2VyIGlzIGRvbmUgd2l0aCB0aGUgQVBJIGFuZCB0aGUgU3dhcm0gcHJvY2VzcyBpcyBjbG9zZWQuXG4gIC8vICAgVE9ETzogY2hlY2sgaWYgU3dhcm0gcHJvY2VzcyBpcyBhbHJlYWR5IHJ1bm5pbmcgKGltcHJvdmUgYGlzQXZhaWxhYmxlYClcblxuXG4gIHZhciBsb2NhbCA9IGZ1bmN0aW9uIGxvY2FsKHN3YXJtU2V0dXApIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHVzZUFQSSkge1xuICAgICAgcmV0dXJuIF9pc0F2YWlsYWJsZShcImh0dHA6Ly9sb2NhbGhvc3Q6ODUwMFwiKS50aGVuKGZ1bmN0aW9uIChpc0F2YWlsYWJsZSkge1xuICAgICAgICByZXR1cm4gaXNBdmFpbGFibGUgPyB1c2VBUEkoYXQoXCJodHRwOi8vbG9jYWxob3N0Ojg1MDBcIikpLnRoZW4oZnVuY3Rpb24gKCkge30pIDogZG93bmxvYWRCaW5hcnkoc3dhcm1TZXR1cC5iaW5QYXRoLCBzd2FybVNldHVwLmFyY2hpdmVzKS5vbkRhdGEoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICByZXR1cm4gKHN3YXJtU2V0dXAub25Qcm9ncmVzcyB8fCBmdW5jdGlvbiAoKSB7fSkoZGF0YS5sZW5ndGgpO1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gc3RhcnRQcm9jZXNzKHN3YXJtU2V0dXApO1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChwcm9jZXNzKSB7XG4gICAgICAgICAgcmV0dXJuIHVzZUFQSShhdChcImh0dHA6Ly9sb2NhbGhvc3Q6ODUwMFwiKSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvY2VzcztcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkudGhlbihzdG9wUHJvY2Vzcyk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9OyAvLyBTdHJpbmcgfj4gUHJvbWlzZSBCb29sXG4gIC8vICAgUmV0dXJucyB0cnVlIGlmIFN3YXJtIGlzIGF2YWlsYWJsZSBvbiBgdXJsYC5cbiAgLy8gICBQZXJmb21zIGEgdGVzdCB1cGxvYWQgdG8gZGV0ZXJtaW5lIHRoYXQuXG4gIC8vICAgVE9ETzogaW1wcm92ZSB0aGlzP1xuXG5cbiAgdmFyIF9pc0F2YWlsYWJsZSA9IGZ1bmN0aW9uIGlzQXZhaWxhYmxlKHN3YXJtVXJsKSB7XG4gICAgdmFyIHRlc3RGaWxlID0gXCJ0ZXN0XCI7XG4gICAgdmFyIHRlc3RIYXNoID0gXCJjOWE5OWM3ZDMyNmRjYzYzMTZmMzJmZTI2MjViMzExZjZkYzQ5YTE3NWU2ODc3NjgxZGVkOTMxMzdkMzU2OWU3XCI7XG4gICAgcmV0dXJuIHVwbG9hZERhdGEoc3dhcm1VcmwpKHRlc3RGaWxlKS50aGVuKGZ1bmN0aW9uIChoYXNoKSB7XG4gICAgICByZXR1cm4gaGFzaCA9PT0gdGVzdEhhc2g7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICB9OyAvLyBTdHJpbmcgLT4gU3RyaW5nIH4+IFByb21pc2UgQm9vbFxuICAvLyAgIFJldHVybnMgYSBQcm9taXNlIHdoaWNoIGlzIHRydWUgaWYgdGhhdCBTd2FybSBhZGRyZXNzIGlzIGEgZGlyZWN0b3J5LlxuICAvLyAgIERldGVybWluZXMgdGhhdCBieSBjaGVja2luZyB0aGF0IGl0IChpKSBpcyBhIEpTT04sIChpaSkgaGFzIGEgLmVudHJpZXMuXG4gIC8vICAgVE9ETzogaW1wcm92ZSB0aGlzP1xuXG5cbiAgdmFyIGlzRGlyZWN0b3J5ID0gZnVuY3Rpb24gaXNEaXJlY3Rvcnkoc3dhcm1VcmwpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGhhc2gpIHtcbiAgICAgIHJldHVybiBkb3dubG9hZERhdGEoc3dhcm1VcmwpKGhhc2gpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gISFKU09OLnBhcnNlKHRvU3RyaW5nKGRhdGEpKS5lbnRyaWVzO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICB9OyAvLyBVbmN1cnJpZXMgYSBmdW5jdGlvbjsgdXNlZCB0byBhbGxvdyB0aGUgZih4LHkseikgc3R5bGUgb24gZXhwb3J0cy5cblxuXG4gIHZhciB1bmN1cnJ5ID0gZnVuY3Rpb24gdW5jdXJyeShmKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjLCBkLCBlKSB7XG4gICAgICB2YXIgcDsgLy8gSGFyZGNvZGVkIGJlY2F1c2UgZWZmaWNpZW5jeSAoYGFyZ3VtZW50c2AgaXMgdmVyeSBzbG93KS5cblxuICAgICAgaWYgKHR5cGVvZiBhICE9PSBcInVuZGVmaW5lZFwiKSBwID0gZihhKTtcbiAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJ1bmRlZmluZWRcIikgcCA9IGYoYik7XG4gICAgICBpZiAodHlwZW9mIGMgIT09IFwidW5kZWZpbmVkXCIpIHAgPSBmKGMpO1xuICAgICAgaWYgKHR5cGVvZiBkICE9PSBcInVuZGVmaW5lZFwiKSBwID0gZihkKTtcbiAgICAgIGlmICh0eXBlb2YgZSAhPT0gXCJ1bmRlZmluZWRcIikgcCA9IGYoZSk7XG4gICAgICByZXR1cm4gcDtcbiAgICB9O1xuICB9OyAvLyAoKSAtPiBQcm9taXNlIEJvb2xcbiAgLy8gICBOb3Qgc3VyZSBob3cgdG8gbW9jayBTd2FybSB0byB0ZXN0IGl0IHByb3Blcmx5LiBJZGVhcz9cblxuXG4gIHZhciB0ZXN0ID0gZnVuY3Rpb24gdGVzdCgpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xuICB9OyAvLyBVaW50OEFycmF5IC0+IFN0cmluZ1xuXG5cbiAgdmFyIHRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcodWludDhBcnJheSkge1xuICAgIHJldHVybiBieXRlcy50b1N0cmluZyhieXRlcy5mcm9tVWludDhBcnJheSh1aW50OEFycmF5KSk7XG4gIH07IC8vIFN0cmluZyAtPiBVaW50OEFycmF5XG5cblxuICB2YXIgZnJvbVN0cmluZyA9IGZ1bmN0aW9uIGZyb21TdHJpbmcoc3RyaW5nKSB7XG4gICAgcmV0dXJuIGJ5dGVzLnRvVWludDhBcnJheShieXRlcy5mcm9tU3RyaW5nKHN0cmluZykpO1xuICB9OyAvLyBTdHJpbmcgLT4gU3dhcm1BUElcbiAgLy8gICBGaXhlcyB0aGUgYHN3YXJtVXJsYCwgcmV0dXJuaW5nIGFuIEFQSSB3aGVyZSB5b3UgZG9uJ3QgaGF2ZSB0byBwYXNzIGl0LlxuXG5cbiAgdmFyIGF0ID0gZnVuY3Rpb24gYXQoc3dhcm1VcmwpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZG93bmxvYWQ6IGZ1bmN0aW9uIGRvd25sb2FkKGhhc2gsIHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIF9kb3dubG9hZChzd2FybVVybCkoaGFzaCkocGF0aCk7XG4gICAgICB9LFxuICAgICAgZG93bmxvYWREYXRhOiB1bmN1cnJ5KGRvd25sb2FkRGF0YShzd2FybVVybCkpLFxuICAgICAgZG93bmxvYWREYXRhVG9EaXNrOiB1bmN1cnJ5KGRvd25sb2FkRGF0YVRvRGlzayhzd2FybVVybCkpLFxuICAgICAgZG93bmxvYWREaXJlY3Rvcnk6IHVuY3VycnkoZG93bmxvYWREaXJlY3Rvcnkoc3dhcm1VcmwpKSxcbiAgICAgIGRvd25sb2FkRGlyZWN0b3J5VG9EaXNrOiB1bmN1cnJ5KGRvd25sb2FkRGlyZWN0b3J5VG9EaXNrKHN3YXJtVXJsKSksXG4gICAgICBkb3dubG9hZEVudHJpZXM6IHVuY3VycnkoZG93bmxvYWRFbnRyaWVzKHN3YXJtVXJsKSksXG4gICAgICBkb3dubG9hZFJvdXRlczogdW5jdXJyeShkb3dubG9hZFJvdXRlcyhzd2FybVVybCkpLFxuICAgICAgaXNBdmFpbGFibGU6IGZ1bmN0aW9uIGlzQXZhaWxhYmxlKCkge1xuICAgICAgICByZXR1cm4gX2lzQXZhaWxhYmxlKHN3YXJtVXJsKTtcbiAgICAgIH0sXG4gICAgICB1cGxvYWQ6IGZ1bmN0aW9uIHVwbG9hZChhcmcpIHtcbiAgICAgICAgcmV0dXJuIF91cGxvYWQoc3dhcm1VcmwpKGFyZyk7XG4gICAgICB9LFxuICAgICAgdXBsb2FkRGF0YTogdW5jdXJyeSh1cGxvYWREYXRhKHN3YXJtVXJsKSksXG4gICAgICB1cGxvYWRGaWxlOiB1bmN1cnJ5KHVwbG9hZEZpbGUoc3dhcm1VcmwpKSxcbiAgICAgIHVwbG9hZEZpbGVGcm9tRGlzazogdW5jdXJyeSh1cGxvYWRGaWxlKHN3YXJtVXJsKSksXG4gICAgICB1cGxvYWREYXRhRnJvbURpc2s6IHVuY3VycnkodXBsb2FkRGF0YUZyb21EaXNrKHN3YXJtVXJsKSksXG4gICAgICB1cGxvYWREaXJlY3Rvcnk6IHVuY3VycnkodXBsb2FkRGlyZWN0b3J5KHN3YXJtVXJsKSksXG4gICAgICB1cGxvYWREaXJlY3RvcnlGcm9tRGlzazogdW5jdXJyeSh1cGxvYWREaXJlY3RvcnlGcm9tRGlzayhzd2FybVVybCkpLFxuICAgICAgdXBsb2FkVG9NYW5pZmVzdDogdW5jdXJyeSh1cGxvYWRUb01hbmlmZXN0KHN3YXJtVXJsKSksXG4gICAgICBwaWNrOiBwaWNrLFxuICAgICAgaGFzaDogaGFzaCxcbiAgICAgIGZyb21TdHJpbmc6IGZyb21TdHJpbmcsXG4gICAgICB0b1N0cmluZzogdG9TdHJpbmdcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYXQ6IGF0LFxuICAgIGxvY2FsOiBsb2NhbCxcbiAgICBkb3dubG9hZDogX2Rvd25sb2FkLFxuICAgIGRvd25sb2FkQmluYXJ5OiBkb3dubG9hZEJpbmFyeSxcbiAgICBkb3dubG9hZERhdGE6IGRvd25sb2FkRGF0YSxcbiAgICBkb3dubG9hZERhdGFUb0Rpc2s6IGRvd25sb2FkRGF0YVRvRGlzayxcbiAgICBkb3dubG9hZERpcmVjdG9yeTogZG93bmxvYWREaXJlY3RvcnksXG4gICAgZG93bmxvYWREaXJlY3RvcnlUb0Rpc2s6IGRvd25sb2FkRGlyZWN0b3J5VG9EaXNrLFxuICAgIGRvd25sb2FkRW50cmllczogZG93bmxvYWRFbnRyaWVzLFxuICAgIGRvd25sb2FkUm91dGVzOiBkb3dubG9hZFJvdXRlcyxcbiAgICBpc0F2YWlsYWJsZTogX2lzQXZhaWxhYmxlLFxuICAgIHN0YXJ0UHJvY2Vzczogc3RhcnRQcm9jZXNzLFxuICAgIHN0b3BQcm9jZXNzOiBzdG9wUHJvY2VzcyxcbiAgICB1cGxvYWQ6IF91cGxvYWQsXG4gICAgdXBsb2FkRGF0YTogdXBsb2FkRGF0YSxcbiAgICB1cGxvYWREYXRhRnJvbURpc2s6IHVwbG9hZERhdGFGcm9tRGlzayxcbiAgICB1cGxvYWRGaWxlOiB1cGxvYWRGaWxlLFxuICAgIHVwbG9hZEZpbGVGcm9tRGlzazogdXBsb2FkRmlsZUZyb21EaXNrLFxuICAgIHVwbG9hZERpcmVjdG9yeTogdXBsb2FkRGlyZWN0b3J5LFxuICAgIHVwbG9hZERpcmVjdG9yeUZyb21EaXNrOiB1cGxvYWREaXJlY3RvcnlGcm9tRGlzayxcbiAgICB1cGxvYWRUb01hbmlmZXN0OiB1cGxvYWRUb01hbmlmZXN0LFxuICAgIHBpY2s6IHBpY2ssXG4gICAgaGFzaDogaGFzaCxcbiAgICBmcm9tU3RyaW5nOiBmcm9tU3RyaW5nLFxuICAgIHRvU3RyaW5nOiB0b1N0cmluZ1xuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBkZWZpbmUgPSByZXF1aXJlKCdkZWZpbmUtcHJvcGVydGllcycpO1xudmFyIGdldFBvbHlmaWxsID0gcmVxdWlyZSgnLi9wb2x5ZmlsbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNoaW1TdHJpbmdUcmltKCkge1xuXHR2YXIgcG9seWZpbGwgPSBnZXRQb2x5ZmlsbCgpO1xuXHRkZWZpbmUoU3RyaW5nLnByb3RvdHlwZSwgeyB0cmltOiBwb2x5ZmlsbCB9LCB7XG5cdFx0dHJpbTogZnVuY3Rpb24gdGVzdFRyaW0oKSB7XG5cdFx0XHRyZXR1cm4gU3RyaW5nLnByb3RvdHlwZS50cmltICE9PSBwb2x5ZmlsbDtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gcG9seWZpbGw7XG59O1xuIiwidmFyIEEgPSByZXF1aXJlKFwiLi9hcnJheS5qc1wiKTtcblxudmFyIGF0ID0gZnVuY3Rpb24gYXQoYnl0ZXMsIGluZGV4KSB7XG4gIHJldHVybiBwYXJzZUludChieXRlcy5zbGljZShpbmRleCAqIDIgKyAyLCBpbmRleCAqIDIgKyA0KSwgMTYpO1xufTtcblxudmFyIHJhbmRvbSA9IGZ1bmN0aW9uIHJhbmRvbShieXRlcykge1xuICB2YXIgcm5kID0gdm9pZCAwO1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuY3J5cHRvICYmIHdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSBybmQgPSB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheShieXRlcykpO2Vsc2UgaWYgKHR5cGVvZiByZXF1aXJlICE9PSBcInVuZGVmaW5lZFwiKSBybmQgPSByZXF1aXJlKFwiY1wiICsgXCJyeXB0b1wiKS5yYW5kb21CeXRlcyhieXRlcyk7ZWxzZSB0aHJvdyBcIlNhZmUgcmFuZG9tIG51bWJlcnMgbm90IGF2YWlsYWJsZS5cIjtcbiAgdmFyIGhleCA9IFwiMHhcIjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlczsgKytpKSB7XG4gICAgaGV4ICs9IChcIjAwXCIgKyBybmRbaV0udG9TdHJpbmcoMTYpKS5zbGljZSgtMik7XG4gIH1yZXR1cm4gaGV4O1xufTtcblxudmFyIGxlbmd0aCA9IGZ1bmN0aW9uIGxlbmd0aChhKSB7XG4gIHJldHVybiAoYS5sZW5ndGggLSAyKSAvIDI7XG59O1xuXG52YXIgZmxhdHRlbiA9IGZ1bmN0aW9uIGZsYXR0ZW4oYSkge1xuICByZXR1cm4gXCIweFwiICsgYS5yZWR1Y2UoZnVuY3Rpb24gKHIsIHMpIHtcbiAgICByZXR1cm4gciArIHMuc2xpY2UoMik7XG4gIH0sIFwiXCIpO1xufTtcblxudmFyIHNsaWNlID0gZnVuY3Rpb24gc2xpY2UoaSwgaiwgYnMpIHtcbiAgcmV0dXJuIFwiMHhcIiArIGJzLnNsaWNlKGkgKiAyICsgMiwgaiAqIDIgKyAyKTtcbn07XG5cbnZhciByZXZlcnNlID0gZnVuY3Rpb24gcmV2ZXJzZShoZXgpIHtcbiAgdmFyIHJldiA9IFwiMHhcIjtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBsZW5ndGgoaGV4KTsgaSA8IGw7ICsraSkge1xuICAgIHJldiArPSBoZXguc2xpY2UoKGwgLSBpKSAqIDIsIChsIC0gaSArIDEpICogMik7XG4gIH1cbiAgcmV0dXJuIHJldjtcbn07XG5cbnZhciBwYWQgPSBmdW5jdGlvbiBwYWQobCwgaGV4KSB7XG4gIHJldHVybiBoZXgubGVuZ3RoID09PSBsICogMiArIDIgPyBoZXggOiBwYWQobCwgXCIweFwiICsgXCIwXCIgKyBoZXguc2xpY2UoMikpO1xufTtcblxudmFyIHBhZFJpZ2h0ID0gZnVuY3Rpb24gcGFkUmlnaHQobCwgaGV4KSB7XG4gIHJldHVybiBoZXgubGVuZ3RoID09PSBsICogMiArIDIgPyBoZXggOiBwYWRSaWdodChsLCBoZXggKyBcIjBcIik7XG59O1xuXG52YXIgdG9BcnJheSA9IGZ1bmN0aW9uIHRvQXJyYXkoaGV4KSB7XG4gIHZhciBhcnIgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDIsIGwgPSBoZXgubGVuZ3RoOyBpIDwgbDsgaSArPSAyKSB7XG4gICAgYXJyLnB1c2gocGFyc2VJbnQoaGV4LnNsaWNlKGksIGkgKyAyKSwgMTYpKTtcbiAgfXJldHVybiBhcnI7XG59O1xuXG52YXIgZnJvbUFycmF5ID0gZnVuY3Rpb24gZnJvbUFycmF5KGFycikge1xuICB2YXIgaGV4ID0gXCIweFwiO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyci5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICB2YXIgYiA9IGFycltpXTtcbiAgICBoZXggKz0gKGIgPCAxNiA/IFwiMFwiIDogXCJcIikgKyBiLnRvU3RyaW5nKDE2KTtcbiAgfVxuICByZXR1cm4gaGV4O1xufTtcblxudmFyIHRvVWludDhBcnJheSA9IGZ1bmN0aW9uIHRvVWludDhBcnJheShoZXgpIHtcbiAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHRvQXJyYXkoaGV4KSk7XG59O1xuXG52YXIgZnJvbVVpbnQ4QXJyYXkgPSBmdW5jdGlvbiBmcm9tVWludDhBcnJheShhcnIpIHtcbiAgcmV0dXJuIGZyb21BcnJheShbXS5zbGljZS5jYWxsKGFyciwgMCkpO1xufTtcblxudmFyIGZyb21OdW1iZXIgPSBmdW5jdGlvbiBmcm9tTnVtYmVyKG51bSkge1xuICB2YXIgaGV4ID0gbnVtLnRvU3RyaW5nKDE2KTtcbiAgcmV0dXJuIGhleC5sZW5ndGggJSAyID09PSAwID8gXCIweFwiICsgaGV4IDogXCIweDBcIiArIGhleDtcbn07XG5cbnZhciB0b051bWJlciA9IGZ1bmN0aW9uIHRvTnVtYmVyKGhleCkge1xuICByZXR1cm4gcGFyc2VJbnQoaGV4LnNsaWNlKDIpLCAxNik7XG59O1xuXG52YXIgY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0KGEsIGIpIHtcbiAgcmV0dXJuIGEuY29uY2F0KGIuc2xpY2UoMikpO1xufTtcblxudmFyIGZyb21OYXQgPSBmdW5jdGlvbiBmcm9tTmF0KGJuKSB7XG4gIHJldHVybiBibiA9PT0gXCIweDBcIiA/IFwiMHhcIiA6IGJuLmxlbmd0aCAlIDIgPT09IDAgPyBibiA6IFwiMHgwXCIgKyBibi5zbGljZSgyKTtcbn07XG5cbnZhciB0b05hdCA9IGZ1bmN0aW9uIHRvTmF0KGJuKSB7XG4gIHJldHVybiBiblsyXSA9PT0gXCIwXCIgPyBcIjB4XCIgKyBibi5zbGljZSgzKSA6IGJuO1xufTtcblxudmFyIGZyb21Bc2NpaSA9IGZ1bmN0aW9uIGZyb21Bc2NpaShhc2NpaSkge1xuICB2YXIgaGV4ID0gXCIweFwiO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFzY2lpLmxlbmd0aDsgKytpKSB7XG4gICAgaGV4ICs9IChcIjAwXCIgKyBhc2NpaS5jaGFyQ29kZUF0KGkpLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpO1xuICB9cmV0dXJuIGhleDtcbn07XG5cbnZhciB0b0FzY2lpID0gZnVuY3Rpb24gdG9Bc2NpaShoZXgpIHtcbiAgdmFyIGFzY2lpID0gXCJcIjtcbiAgZm9yICh2YXIgaSA9IDI7IGkgPCBoZXgubGVuZ3RoOyBpICs9IDIpIHtcbiAgICBhc2NpaSArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KGhleC5zbGljZShpLCBpICsgMiksIDE2KSk7XG4gIH1yZXR1cm4gYXNjaWk7XG59O1xuXG4vLyBGcm9tIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3Bhc2NhbGRla2xvZS82MjU0NjEwM2ExNTc2ODAzZGFkZTkyNjljY2Y3NjMzMFxudmFyIGZyb21TdHJpbmcgPSBmdW5jdGlvbiBmcm9tU3RyaW5nKHMpIHtcbiAgdmFyIG1ha2VCeXRlID0gZnVuY3Rpb24gbWFrZUJ5dGUodWludDgpIHtcbiAgICB2YXIgYiA9IHVpbnQ4LnRvU3RyaW5nKDE2KTtcbiAgICByZXR1cm4gYi5sZW5ndGggPCAyID8gXCIwXCIgKyBiIDogYjtcbiAgfTtcbiAgdmFyIGJ5dGVzID0gXCIweFwiO1xuICBmb3IgKHZhciBjaSA9IDA7IGNpICE9IHMubGVuZ3RoOyBjaSsrKSB7XG4gICAgdmFyIGMgPSBzLmNoYXJDb2RlQXQoY2kpO1xuICAgIGlmIChjIDwgMTI4KSB7XG4gICAgICBieXRlcyArPSBtYWtlQnl0ZShjKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoYyA8IDIwNDgpIHtcbiAgICAgIGJ5dGVzICs9IG1ha2VCeXRlKGMgPj4gNiB8IDE5Mik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjID4gMHhkN2ZmICYmIGMgPCAweGRjMDApIHtcbiAgICAgICAgaWYgKCsrY2kgPT0gcy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgICAgICB2YXIgYzIgPSBzLmNoYXJDb2RlQXQoY2kpO1xuICAgICAgICBpZiAoYzIgPCAweGRjMDAgfHwgYzIgPiAweGRmZmYpIHJldHVybiBudWxsO1xuICAgICAgICBjID0gMHgxMDAwMCArICgoYyAmIDB4MDNmZikgPDwgMTApICsgKGMyICYgMHgwM2ZmKTtcbiAgICAgICAgYnl0ZXMgKz0gbWFrZUJ5dGUoYyA+PiAxOCB8IDI0MCk7XG4gICAgICAgIGJ5dGVzICs9IG1ha2VCeXRlKGMgPj4gMTIgJiA2MyB8IDEyOCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjIDw9IDB4ZmZmZlxuICAgICAgICBieXRlcyArPSBtYWtlQnl0ZShjID4+IDEyIHwgMjI0KTtcbiAgICAgIH1cbiAgICAgIGJ5dGVzICs9IG1ha2VCeXRlKGMgPj4gNiAmIDYzIHwgMTI4KTtcbiAgICB9XG4gICAgYnl0ZXMgKz0gbWFrZUJ5dGUoYyAmIDYzIHwgMTI4KTtcbiAgfVxuICByZXR1cm4gYnl0ZXM7XG59O1xuXG52YXIgdG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyhieXRlcykge1xuICB2YXIgcyA9ICcnO1xuICB2YXIgaSA9IDA7XG4gIHZhciBsID0gbGVuZ3RoKGJ5dGVzKTtcbiAgd2hpbGUgKGkgPCBsKSB7XG4gICAgdmFyIGMgPSBhdChieXRlcywgaSsrKTtcbiAgICBpZiAoYyA+IDEyNykge1xuICAgICAgaWYgKGMgPiAxOTEgJiYgYyA8IDIyNCkge1xuICAgICAgICBpZiAoaSA+PSBsKSByZXR1cm4gbnVsbDtcbiAgICAgICAgYyA9IChjICYgMzEpIDw8IDYgfCBhdChieXRlcywgaSkgJiA2MztcbiAgICAgIH0gZWxzZSBpZiAoYyA+IDIyMyAmJiBjIDwgMjQwKSB7XG4gICAgICAgIGlmIChpICsgMSA+PSBsKSByZXR1cm4gbnVsbDtcbiAgICAgICAgYyA9IChjICYgMTUpIDw8IDEyIHwgKGF0KGJ5dGVzLCBpKSAmIDYzKSA8PCA2IHwgYXQoYnl0ZXMsICsraSkgJiA2MztcbiAgICAgIH0gZWxzZSBpZiAoYyA+IDIzOSAmJiBjIDwgMjQ4KSB7XG4gICAgICAgIGlmIChpICsgMiA+PSBsKSByZXR1cm4gbnVsbDtcbiAgICAgICAgYyA9IChjICYgNykgPDwgMTggfCAoYXQoYnl0ZXMsIGkpICYgNjMpIDw8IDEyIHwgKGF0KGJ5dGVzLCArK2kpICYgNjMpIDw8IDYgfCBhdChieXRlcywgKytpKSAmIDYzO1xuICAgICAgfSBlbHNlIHJldHVybiBudWxsO1xuICAgICAgKytpO1xuICAgIH1cbiAgICBpZiAoYyA8PSAweGZmZmYpIHMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjKTtlbHNlIGlmIChjIDw9IDB4MTBmZmZmKSB7XG4gICAgICBjIC09IDB4MTAwMDA7XG4gICAgICBzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYyA+PiAxMCB8IDB4ZDgwMCk7XG4gICAgICBzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYyAmIDB4M0ZGIHwgMHhkYzAwKTtcbiAgICB9IGVsc2UgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIHM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmFuZG9tOiByYW5kb20sXG4gIGxlbmd0aDogbGVuZ3RoLFxuICBjb25jYXQ6IGNvbmNhdCxcbiAgZmxhdHRlbjogZmxhdHRlbixcbiAgc2xpY2U6IHNsaWNlLFxuICByZXZlcnNlOiByZXZlcnNlLFxuICBwYWQ6IHBhZCxcbiAgcGFkUmlnaHQ6IHBhZFJpZ2h0LFxuICBmcm9tQXNjaWk6IGZyb21Bc2NpaSxcbiAgdG9Bc2NpaTogdG9Bc2NpaSxcbiAgZnJvbVN0cmluZzogZnJvbVN0cmluZyxcbiAgdG9TdHJpbmc6IHRvU3RyaW5nLFxuICBmcm9tTnVtYmVyOiBmcm9tTnVtYmVyLFxuICB0b051bWJlcjogdG9OdW1iZXIsXG4gIGZyb21OYXQ6IGZyb21OYXQsXG4gIHRvTmF0OiB0b05hdCxcbiAgZnJvbUFycmF5OiBmcm9tQXJyYXksXG4gIHRvQXJyYXk6IHRvQXJyYXksXG4gIGZyb21VaW50OEFycmF5OiBmcm9tVWludDhBcnJheSxcbiAgdG9VaW50OEFycmF5OiB0b1VpbnQ4QXJyYXlcbn07IiwidmFyIGNhcGFiaWxpdHkgPSByZXF1aXJlKCcuL2NhcGFiaWxpdHknKVxudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKVxudmFyIHN0cmVhbSA9IHJlcXVpcmUoJ3JlYWRhYmxlLXN0cmVhbScpXG5cbnZhciByU3RhdGVzID0gZXhwb3J0cy5yZWFkeVN0YXRlcyA9IHtcblx0VU5TRU5UOiAwLFxuXHRPUEVORUQ6IDEsXG5cdEhFQURFUlNfUkVDRUlWRUQ6IDIsXG5cdExPQURJTkc6IDMsXG5cdERPTkU6IDRcbn1cblxudmFyIEluY29taW5nTWVzc2FnZSA9IGV4cG9ydHMuSW5jb21pbmdNZXNzYWdlID0gZnVuY3Rpb24gKHhociwgcmVzcG9uc2UsIG1vZGUsIGZldGNoVGltZXIpIHtcblx0dmFyIHNlbGYgPSB0aGlzXG5cdHN0cmVhbS5SZWFkYWJsZS5jYWxsKHNlbGYpXG5cblx0c2VsZi5fbW9kZSA9IG1vZGVcblx0c2VsZi5oZWFkZXJzID0ge31cblx0c2VsZi5yYXdIZWFkZXJzID0gW11cblx0c2VsZi50cmFpbGVycyA9IHt9XG5cdHNlbGYucmF3VHJhaWxlcnMgPSBbXVxuXG5cdC8vIEZha2UgdGhlICdjbG9zZScgZXZlbnQsIGJ1dCBvbmx5IG9uY2UgJ2VuZCcgZmlyZXNcblx0c2VsZi5vbignZW5kJywgZnVuY3Rpb24gKCkge1xuXHRcdC8vIFRoZSBuZXh0VGljayBpcyBuZWNlc3NhcnkgdG8gcHJldmVudCB0aGUgJ3JlcXVlc3QnIG1vZHVsZSBmcm9tIGNhdXNpbmcgYW4gaW5maW5pdGUgbG9vcFxuXHRcdHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi5lbWl0KCdjbG9zZScpXG5cdFx0fSlcblx0fSlcblxuXHRpZiAobW9kZSA9PT0gJ2ZldGNoJykge1xuXHRcdHNlbGYuX2ZldGNoUmVzcG9uc2UgPSByZXNwb25zZVxuXG5cdFx0c2VsZi51cmwgPSByZXNwb25zZS51cmxcblx0XHRzZWxmLnN0YXR1c0NvZGUgPSByZXNwb25zZS5zdGF0dXNcblx0XHRzZWxmLnN0YXR1c01lc3NhZ2UgPSByZXNwb25zZS5zdGF0dXNUZXh0XG5cdFx0XG5cdFx0cmVzcG9uc2UuaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uIChoZWFkZXIsIGtleSl7XG5cdFx0XHRzZWxmLmhlYWRlcnNba2V5LnRvTG93ZXJDYXNlKCldID0gaGVhZGVyXG5cdFx0XHRzZWxmLnJhd0hlYWRlcnMucHVzaChrZXksIGhlYWRlcilcblx0XHR9KVxuXG5cdFx0aWYgKGNhcGFiaWxpdHkud3JpdGFibGVTdHJlYW0pIHtcblx0XHRcdHZhciB3cml0YWJsZSA9IG5ldyBXcml0YWJsZVN0cmVhbSh7XG5cdFx0XHRcdHdyaXRlOiBmdW5jdGlvbiAoY2h1bmspIHtcblx0XHRcdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0XHRcdFx0aWYgKHNlbGYuX2Rlc3Ryb3llZCkge1xuXHRcdFx0XHRcdFx0XHRyZWplY3QoKVxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmKHNlbGYucHVzaChuZXcgQnVmZmVyKGNodW5rKSkpIHtcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZSgpXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRzZWxmLl9yZXN1bWVGZXRjaCA9IHJlc29sdmVcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRjbG9zZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGdsb2JhbC5jbGVhclRpbWVvdXQoZmV0Y2hUaW1lcilcblx0XHRcdFx0XHRpZiAoIXNlbGYuX2Rlc3Ryb3llZClcblx0XHRcdFx0XHRcdHNlbGYucHVzaChudWxsKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRhYm9ydDogZnVuY3Rpb24gKGVycikge1xuXHRcdFx0XHRcdGlmICghc2VsZi5fZGVzdHJveWVkKVxuXHRcdFx0XHRcdFx0c2VsZi5lbWl0KCdlcnJvcicsIGVycilcblx0XHRcdFx0fVxuXHRcdFx0fSlcblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0cmVzcG9uc2UuYm9keS5waXBlVG8od3JpdGFibGUpLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdFx0XHRnbG9iYWwuY2xlYXJUaW1lb3V0KGZldGNoVGltZXIpXG5cdFx0XHRcdFx0aWYgKCFzZWxmLl9kZXN0cm95ZWQpXG5cdFx0XHRcdFx0XHRzZWxmLmVtaXQoJ2Vycm9yJywgZXJyKVxuXHRcdFx0XHR9KVxuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH0gY2F0Y2ggKGUpIHt9IC8vIHBpcGVUbyBtZXRob2QgaXNuJ3QgZGVmaW5lZC4gQ2FuJ3QgZmluZCBhIGJldHRlciB3YXkgdG8gZmVhdHVyZSB0ZXN0IHRoaXNcblx0XHR9XG5cdFx0Ly8gZmFsbGJhY2sgZm9yIHdoZW4gd3JpdGFibGVTdHJlYW0gb3IgcGlwZVRvIGFyZW4ndCBhdmFpbGFibGVcblx0XHR2YXIgcmVhZGVyID0gcmVzcG9uc2UuYm9keS5nZXRSZWFkZXIoKVxuXHRcdGZ1bmN0aW9uIHJlYWQgKCkge1xuXHRcdFx0cmVhZGVyLnJlYWQoKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRcdFx0aWYgKHNlbGYuX2Rlc3Ryb3llZClcblx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0aWYgKHJlc3VsdC5kb25lKSB7XG5cdFx0XHRcdFx0Z2xvYmFsLmNsZWFyVGltZW91dChmZXRjaFRpbWVyKVxuXHRcdFx0XHRcdHNlbGYucHVzaChudWxsKVxuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHR9XG5cdFx0XHRcdHNlbGYucHVzaChuZXcgQnVmZmVyKHJlc3VsdC52YWx1ZSkpXG5cdFx0XHRcdHJlYWQoKVxuXHRcdFx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuXHRcdFx0XHRnbG9iYWwuY2xlYXJUaW1lb3V0KGZldGNoVGltZXIpXG5cdFx0XHRcdGlmICghc2VsZi5fZGVzdHJveWVkKVxuXHRcdFx0XHRcdHNlbGYuZW1pdCgnZXJyb3InLCBlcnIpXG5cdFx0XHR9KVxuXHRcdH1cblx0XHRyZWFkKClcblx0fSBlbHNlIHtcblx0XHRzZWxmLl94aHIgPSB4aHJcblx0XHRzZWxmLl9wb3MgPSAwXG5cblx0XHRzZWxmLnVybCA9IHhoci5yZXNwb25zZVVSTFxuXHRcdHNlbGYuc3RhdHVzQ29kZSA9IHhoci5zdGF0dXNcblx0XHRzZWxmLnN0YXR1c01lc3NhZ2UgPSB4aHIuc3RhdHVzVGV4dFxuXHRcdHZhciBoZWFkZXJzID0geGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpLnNwbGl0KC9cXHI/XFxuLylcblx0XHRoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24gKGhlYWRlcikge1xuXHRcdFx0dmFyIG1hdGNoZXMgPSBoZWFkZXIubWF0Y2goL14oW146XSspOlxccyooLiopLylcblx0XHRcdGlmIChtYXRjaGVzKSB7XG5cdFx0XHRcdHZhciBrZXkgPSBtYXRjaGVzWzFdLnRvTG93ZXJDYXNlKClcblx0XHRcdFx0aWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG5cdFx0XHRcdFx0aWYgKHNlbGYuaGVhZGVyc1trZXldID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdHNlbGYuaGVhZGVyc1trZXldID0gW11cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0c2VsZi5oZWFkZXJzW2tleV0ucHVzaChtYXRjaGVzWzJdKVxuXHRcdFx0XHR9IGVsc2UgaWYgKHNlbGYuaGVhZGVyc1trZXldICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRzZWxmLmhlYWRlcnNba2V5XSArPSAnLCAnICsgbWF0Y2hlc1syXVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNlbGYuaGVhZGVyc1trZXldID0gbWF0Y2hlc1syXVxuXHRcdFx0XHR9XG5cdFx0XHRcdHNlbGYucmF3SGVhZGVycy5wdXNoKG1hdGNoZXNbMV0sIG1hdGNoZXNbMl0pXG5cdFx0XHR9XG5cdFx0fSlcblxuXHRcdHNlbGYuX2NoYXJzZXQgPSAneC11c2VyLWRlZmluZWQnXG5cdFx0aWYgKCFjYXBhYmlsaXR5Lm92ZXJyaWRlTWltZVR5cGUpIHtcblx0XHRcdHZhciBtaW1lVHlwZSA9IHNlbGYucmF3SGVhZGVyc1snbWltZS10eXBlJ11cblx0XHRcdGlmIChtaW1lVHlwZSkge1xuXHRcdFx0XHR2YXIgY2hhcnNldE1hdGNoID0gbWltZVR5cGUubWF0Y2goLztcXHMqY2hhcnNldD0oW147XSkoO3wkKS8pXG5cdFx0XHRcdGlmIChjaGFyc2V0TWF0Y2gpIHtcblx0XHRcdFx0XHRzZWxmLl9jaGFyc2V0ID0gY2hhcnNldE1hdGNoWzFdLnRvTG93ZXJDYXNlKClcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKCFzZWxmLl9jaGFyc2V0KVxuXHRcdFx0XHRzZWxmLl9jaGFyc2V0ID0gJ3V0Zi04JyAvLyBiZXN0IGd1ZXNzXG5cdFx0fVxuXHR9XG59XG5cbmluaGVyaXRzKEluY29taW5nTWVzc2FnZSwgc3RyZWFtLlJlYWRhYmxlKVxuXG5JbmNvbWluZ01lc3NhZ2UucHJvdG90eXBlLl9yZWFkID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgc2VsZiA9IHRoaXNcblxuXHR2YXIgcmVzb2x2ZSA9IHNlbGYuX3Jlc3VtZUZldGNoXG5cdGlmIChyZXNvbHZlKSB7XG5cdFx0c2VsZi5fcmVzdW1lRmV0Y2ggPSBudWxsXG5cdFx0cmVzb2x2ZSgpXG5cdH1cbn1cblxuSW5jb21pbmdNZXNzYWdlLnByb3RvdHlwZS5fb25YSFJQcm9ncmVzcyA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIHNlbGYgPSB0aGlzXG5cblx0dmFyIHhociA9IHNlbGYuX3hoclxuXG5cdHZhciByZXNwb25zZSA9IG51bGxcblx0c3dpdGNoIChzZWxmLl9tb2RlKSB7XG5cdFx0Y2FzZSAndGV4dDp2YmFycmF5JzogLy8gRm9yIElFOVxuXHRcdFx0aWYgKHhoci5yZWFkeVN0YXRlICE9PSByU3RhdGVzLkRPTkUpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHR0cnkge1xuXHRcdFx0XHQvLyBUaGlzIGZhaWxzIGluIElFOFxuXHRcdFx0XHRyZXNwb25zZSA9IG5ldyBnbG9iYWwuVkJBcnJheSh4aHIucmVzcG9uc2VCb2R5KS50b0FycmF5KClcblx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cdFx0XHRpZiAocmVzcG9uc2UgIT09IG51bGwpIHtcblx0XHRcdFx0c2VsZi5wdXNoKG5ldyBCdWZmZXIocmVzcG9uc2UpKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0fVxuXHRcdFx0Ly8gRmFsbHMgdGhyb3VnaCBpbiBJRThcdFxuXHRcdGNhc2UgJ3RleHQnOlxuXHRcdFx0dHJ5IHsgLy8gVGhpcyB3aWxsIGZhaWwgd2hlbiByZWFkeVN0YXRlID0gMyBpbiBJRTkuIFN3aXRjaCBtb2RlIGFuZCB3YWl0IGZvciByZWFkeVN0YXRlID0gNFxuXHRcdFx0XHRyZXNwb25zZSA9IHhoci5yZXNwb25zZVRleHRcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0c2VsZi5fbW9kZSA9ICd0ZXh0OnZiYXJyYXknXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHR9XG5cdFx0XHRpZiAocmVzcG9uc2UubGVuZ3RoID4gc2VsZi5fcG9zKSB7XG5cdFx0XHRcdHZhciBuZXdEYXRhID0gcmVzcG9uc2Uuc3Vic3RyKHNlbGYuX3Bvcylcblx0XHRcdFx0aWYgKHNlbGYuX2NoYXJzZXQgPT09ICd4LXVzZXItZGVmaW5lZCcpIHtcblx0XHRcdFx0XHR2YXIgYnVmZmVyID0gbmV3IEJ1ZmZlcihuZXdEYXRhLmxlbmd0aClcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG5ld0RhdGEubGVuZ3RoOyBpKyspXG5cdFx0XHRcdFx0XHRidWZmZXJbaV0gPSBuZXdEYXRhLmNoYXJDb2RlQXQoaSkgJiAweGZmXG5cblx0XHRcdFx0XHRzZWxmLnB1c2goYnVmZmVyKVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNlbGYucHVzaChuZXdEYXRhLCBzZWxmLl9jaGFyc2V0KVxuXHRcdFx0XHR9XG5cdFx0XHRcdHNlbGYuX3BvcyA9IHJlc3BvbnNlLmxlbmd0aFxuXHRcdFx0fVxuXHRcdFx0YnJlYWtcblx0XHRjYXNlICdhcnJheWJ1ZmZlcic6XG5cdFx0XHRpZiAoeGhyLnJlYWR5U3RhdGUgIT09IHJTdGF0ZXMuRE9ORSB8fCAheGhyLnJlc3BvbnNlKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0cmVzcG9uc2UgPSB4aHIucmVzcG9uc2Vcblx0XHRcdHNlbGYucHVzaChuZXcgQnVmZmVyKG5ldyBVaW50OEFycmF5KHJlc3BvbnNlKSkpXG5cdFx0XHRicmVha1xuXHRcdGNhc2UgJ21vei1jaHVua2VkLWFycmF5YnVmZmVyJzogLy8gdGFrZSB3aG9sZVxuXHRcdFx0cmVzcG9uc2UgPSB4aHIucmVzcG9uc2Vcblx0XHRcdGlmICh4aHIucmVhZHlTdGF0ZSAhPT0gclN0YXRlcy5MT0FESU5HIHx8ICFyZXNwb25zZSlcblx0XHRcdFx0YnJlYWtcblx0XHRcdHNlbGYucHVzaChuZXcgQnVmZmVyKG5ldyBVaW50OEFycmF5KHJlc3BvbnNlKSkpXG5cdFx0XHRicmVha1xuXHRcdGNhc2UgJ21zLXN0cmVhbSc6XG5cdFx0XHRyZXNwb25zZSA9IHhoci5yZXNwb25zZVxuXHRcdFx0aWYgKHhoci5yZWFkeVN0YXRlICE9PSByU3RhdGVzLkxPQURJTkcpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHR2YXIgcmVhZGVyID0gbmV3IGdsb2JhbC5NU1N0cmVhbVJlYWRlcigpXG5cdFx0XHRyZWFkZXIub25wcm9ncmVzcyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWYgKHJlYWRlci5yZXN1bHQuYnl0ZUxlbmd0aCA+IHNlbGYuX3Bvcykge1xuXHRcdFx0XHRcdHNlbGYucHVzaChuZXcgQnVmZmVyKG5ldyBVaW50OEFycmF5KHJlYWRlci5yZXN1bHQuc2xpY2Uoc2VsZi5fcG9zKSkpKVxuXHRcdFx0XHRcdHNlbGYuX3BvcyA9IHJlYWRlci5yZXN1bHQuYnl0ZUxlbmd0aFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRzZWxmLnB1c2gobnVsbClcblx0XHRcdH1cblx0XHRcdC8vIHJlYWRlci5vbmVycm9yID0gPz8/IC8vIFRPRE86IHRoaXNcblx0XHRcdHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihyZXNwb25zZSlcblx0XHRcdGJyZWFrXG5cdH1cblxuXHQvLyBUaGUgbXMtc3RyZWFtIGNhc2UgaGFuZGxlcyBlbmQgc2VwYXJhdGVseSBpbiByZWFkZXIub25sb2FkKClcblx0aWYgKHNlbGYuX3hoci5yZWFkeVN0YXRlID09PSByU3RhdGVzLkRPTkUgJiYgc2VsZi5fbW9kZSAhPT0gJ21zLXN0cmVhbScpIHtcblx0XHRzZWxmLnB1c2gobnVsbClcblx0fVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcbnZhciBkZWZpbmUgPSByZXF1aXJlKCdkZWZpbmUtcHJvcGVydGllcycpO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG52YXIgZ2V0UG9seWZpbGwgPSByZXF1aXJlKCcuL3BvbHlmaWxsJyk7XG52YXIgc2hpbSA9IHJlcXVpcmUoJy4vc2hpbScpO1xuXG52YXIgYm91bmRUcmltID0gYmluZC5jYWxsKEZ1bmN0aW9uLmNhbGwsIGdldFBvbHlmaWxsKCkpO1xuXG5kZWZpbmUoYm91bmRUcmltLCB7XG5cdGdldFBvbHlmaWxsOiBnZXRQb2x5ZmlsbCxcblx0aW1wbGVtZW50YXRpb246IGltcGxlbWVudGF0aW9uLFxuXHRzaGltOiBzaGltXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBib3VuZFRyaW07XG4iXSwic291cmNlUm9vdCI6IiJ9