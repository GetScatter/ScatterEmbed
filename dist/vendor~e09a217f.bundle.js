(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[47],{

/***/ "8GU6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
Object.defineProperty(exports, '__esModule', { value: true });
const bcrypto = __webpack_require__("lin5");
const networks_1 = __webpack_require__("A6N3");
const bscript = __webpack_require__("O5DG");
const lazy = __webpack_require__("XKyx");
const typef = __webpack_require__("d+zW");
const OPS = bscript.OPS;
const ecc = __webpack_require__("KfcP");
const bech32 = __webpack_require__("vyt/");
const EMPTY_BUFFER = Buffer.alloc(0);
// witness: {signature} {pubKey}
// input: <>
// output: OP_0 {pubKeyHash}
function p2wpkh(a, opts) {
  if (!a.address && !a.hash && !a.output && !a.pubkey && !a.witness)
    throw new TypeError('Not enough data');
  opts = Object.assign({ validate: true }, opts || {});
  typef(
    {
      address: typef.maybe(typef.String),
      hash: typef.maybe(typef.BufferN(20)),
      input: typef.maybe(typef.BufferN(0)),
      network: typef.maybe(typef.Object),
      output: typef.maybe(typef.BufferN(22)),
      pubkey: typef.maybe(ecc.isPoint),
      signature: typef.maybe(bscript.isCanonicalScriptSignature),
      witness: typef.maybe(typef.arrayOf(typef.Buffer)),
    },
    a,
  );
  const _address = lazy.value(() => {
    const result = bech32.decode(a.address);
    const version = result.words.shift();
    const data = bech32.fromWords(result.words);
    return {
      version,
      prefix: result.prefix,
      data: Buffer.from(data),
    };
  });
  const network = a.network || networks_1.bitcoin;
  const o = { name: 'p2wpkh', network };
  lazy.prop(o, 'address', () => {
    if (!o.hash) return;
    const words = bech32.toWords(o.hash);
    words.unshift(0x00);
    return bech32.encode(network.bech32, words);
  });
  lazy.prop(o, 'hash', () => {
    if (a.output) return a.output.slice(2, 22);
    if (a.address) return _address().data;
    if (a.pubkey || o.pubkey) return bcrypto.hash160(a.pubkey || o.pubkey);
  });
  lazy.prop(o, 'output', () => {
    if (!o.hash) return;
    return bscript.compile([OPS.OP_0, o.hash]);
  });
  lazy.prop(o, 'pubkey', () => {
    if (a.pubkey) return a.pubkey;
    if (!a.witness) return;
    return a.witness[1];
  });
  lazy.prop(o, 'signature', () => {
    if (!a.witness) return;
    return a.witness[0];
  });
  lazy.prop(o, 'input', () => {
    if (!o.witness) return;
    return EMPTY_BUFFER;
  });
  lazy.prop(o, 'witness', () => {
    if (!a.pubkey) return;
    if (!a.signature) return;
    return [a.signature, a.pubkey];
  });
  // extended validation
  if (opts.validate) {
    let hash = Buffer.from([]);
    if (a.address) {
      if (network && network.bech32 !== _address().prefix)
        throw new TypeError('Invalid prefix or Network mismatch');
      if (_address().version !== 0x00)
        throw new TypeError('Invalid address version');
      if (_address().data.length !== 20)
        throw new TypeError('Invalid address data');
      hash = _address().data;
    }
    if (a.hash) {
      if (hash.length > 0 && !hash.equals(a.hash))
        throw new TypeError('Hash mismatch');
      else hash = a.hash;
    }
    if (a.output) {
      if (
        a.output.length !== 22 ||
        a.output[0] !== OPS.OP_0 ||
        a.output[1] !== 0x14
      )
        throw new TypeError('Output is invalid');
      if (hash.length > 0 && !hash.equals(a.output.slice(2)))
        throw new TypeError('Hash mismatch');
      else hash = a.output.slice(2);
    }
    if (a.pubkey) {
      const pkh = bcrypto.hash160(a.pubkey);
      if (hash.length > 0 && !hash.equals(pkh))
        throw new TypeError('Hash mismatch');
      else hash = pkh;
    }
    if (a.witness) {
      if (a.witness.length !== 2) throw new TypeError('Witness is invalid');
      if (!bscript.isCanonicalScriptSignature(a.witness[0]))
        throw new TypeError('Witness has invalid signature');
      if (!ecc.isPoint(a.witness[1]))
        throw new TypeError('Witness has invalid pubkey');
      if (a.signature && !a.signature.equals(a.witness[0]))
        throw new TypeError('Signature mismatch');
      if (a.pubkey && !a.pubkey.equals(a.witness[1]))
        throw new TypeError('Pubkey mismatch');
      const pkh = bcrypto.hash160(a.witness[1]);
      if (hash.length > 0 && !hash.equals(pkh))
        throw new TypeError('Hash mismatch');
    }
  }
  return Object.assign(o, a);
}
exports.p2wpkh = p2wpkh;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "9PLV":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
// OP_RETURN {aa21a9ed} {commitment}
Object.defineProperty(exports, '__esModule', { value: true });
const bscript = __webpack_require__("O5DG");
const script_1 = __webpack_require__("O5DG");
const types = __webpack_require__("wmJG");
const typeforce = __webpack_require__("d+zW");
const HEADER = Buffer.from('aa21a9ed', 'hex');
function check(script) {
  const buffer = bscript.compile(script);
  return (
    buffer.length > 37 &&
    buffer[0] === script_1.OPS.OP_RETURN &&
    buffer[1] === 0x24 &&
    buffer.slice(2, 6).equals(HEADER)
  );
}
exports.check = check;
check.toJSON = () => {
  return 'Witness commitment output';
};
function encode(commitment) {
  typeforce(types.Hash256bit, commitment);
  const buffer = Buffer.allocUnsafe(36);
  HEADER.copy(buffer, 0);
  commitment.copy(buffer, 4);
  return bscript.compile([script_1.OPS.OP_RETURN, buffer]);
}
exports.encode = encode;
function decode(buffer) {
  typeforce(check, buffer);
  return bscript.decompile(buffer)[1].slice(4, 36);
}
exports.decode = decode;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "A6N3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, '__esModule', { value: true });
exports.bitcoin = {
  messagePrefix: '\x18Bitcoin Signed Message:\n',
  bech32: 'bc',
  bip32: {
    public: 0x0488b21e,
    private: 0x0488ade4,
  },
  pubKeyHash: 0x00,
  scriptHash: 0x05,
  wif: 0x80,
};
exports.regtest = {
  messagePrefix: '\x18Bitcoin Signed Message:\n',
  bech32: 'bcrt',
  bip32: {
    public: 0x043587cf,
    private: 0x04358394,
  },
  pubKeyHash: 0x6f,
  scriptHash: 0xc4,
  wif: 0xef,
};
exports.testnet = {
  messagePrefix: '\x18Bitcoin Signed Message:\n',
  bech32: 'tb',
  bip32: {
    public: 0x043587cf,
    private: 0x04358394,
  },
  pubKeyHash: 0x6f,
  scriptHash: 0xc4,
  wif: 0xef,
};


/***/ }),

/***/ "CB62":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, '__esModule', { value: true });
const input = __webpack_require__("pFpI");
exports.input = input;
const output = __webpack_require__("TJSY");
exports.output = output;


/***/ }),

/***/ "E0BK":
/***/ (function(module) {

module.exports = JSON.parse("{\"OP_FALSE\":0,\"OP_0\":0,\"OP_PUSHDATA1\":76,\"OP_PUSHDATA2\":77,\"OP_PUSHDATA4\":78,\"OP_1NEGATE\":79,\"OP_RESERVED\":80,\"OP_TRUE\":81,\"OP_1\":81,\"OP_2\":82,\"OP_3\":83,\"OP_4\":84,\"OP_5\":85,\"OP_6\":86,\"OP_7\":87,\"OP_8\":88,\"OP_9\":89,\"OP_10\":90,\"OP_11\":91,\"OP_12\":92,\"OP_13\":93,\"OP_14\":94,\"OP_15\":95,\"OP_16\":96,\"OP_NOP\":97,\"OP_VER\":98,\"OP_IF\":99,\"OP_NOTIF\":100,\"OP_VERIF\":101,\"OP_VERNOTIF\":102,\"OP_ELSE\":103,\"OP_ENDIF\":104,\"OP_VERIFY\":105,\"OP_RETURN\":106,\"OP_TOALTSTACK\":107,\"OP_FROMALTSTACK\":108,\"OP_2DROP\":109,\"OP_2DUP\":110,\"OP_3DUP\":111,\"OP_2OVER\":112,\"OP_2ROT\":113,\"OP_2SWAP\":114,\"OP_IFDUP\":115,\"OP_DEPTH\":116,\"OP_DROP\":117,\"OP_DUP\":118,\"OP_NIP\":119,\"OP_OVER\":120,\"OP_PICK\":121,\"OP_ROLL\":122,\"OP_ROT\":123,\"OP_SWAP\":124,\"OP_TUCK\":125,\"OP_CAT\":126,\"OP_SUBSTR\":127,\"OP_LEFT\":128,\"OP_RIGHT\":129,\"OP_SIZE\":130,\"OP_INVERT\":131,\"OP_AND\":132,\"OP_OR\":133,\"OP_XOR\":134,\"OP_EQUAL\":135,\"OP_EQUALVERIFY\":136,\"OP_RESERVED1\":137,\"OP_RESERVED2\":138,\"OP_1ADD\":139,\"OP_1SUB\":140,\"OP_2MUL\":141,\"OP_2DIV\":142,\"OP_NEGATE\":143,\"OP_ABS\":144,\"OP_NOT\":145,\"OP_0NOTEQUAL\":146,\"OP_ADD\":147,\"OP_SUB\":148,\"OP_MUL\":149,\"OP_DIV\":150,\"OP_MOD\":151,\"OP_LSHIFT\":152,\"OP_RSHIFT\":153,\"OP_BOOLAND\":154,\"OP_BOOLOR\":155,\"OP_NUMEQUAL\":156,\"OP_NUMEQUALVERIFY\":157,\"OP_NUMNOTEQUAL\":158,\"OP_LESSTHAN\":159,\"OP_GREATERTHAN\":160,\"OP_LESSTHANOREQUAL\":161,\"OP_GREATERTHANOREQUAL\":162,\"OP_MIN\":163,\"OP_MAX\":164,\"OP_WITHIN\":165,\"OP_RIPEMD160\":166,\"OP_SHA1\":167,\"OP_SHA256\":168,\"OP_HASH160\":169,\"OP_HASH256\":170,\"OP_CODESEPARATOR\":171,\"OP_CHECKSIG\":172,\"OP_CHECKSIGVERIFY\":173,\"OP_CHECKMULTISIG\":174,\"OP_CHECKMULTISIGVERIFY\":175,\"OP_NOP1\":176,\"OP_NOP2\":177,\"OP_CHECKLOCKTIMEVERIFY\":177,\"OP_NOP3\":178,\"OP_CHECKSEQUENCEVERIFY\":178,\"OP_NOP4\":179,\"OP_NOP5\":180,\"OP_NOP6\":181,\"OP_NOP7\":182,\"OP_NOP8\":183,\"OP_NOP9\":184,\"OP_NOP10\":185,\"OP_PUBKEYHASH\":253,\"OP_PUBKEY\":254,\"OP_INVALIDOPCODE\":255}");

/***/ }),

/***/ "Fh8C":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
// <scriptSig> {serialized scriptPubKey script}
Object.defineProperty(exports, '__esModule', { value: true });
const bscript = __webpack_require__("O5DG");
const typeforce = __webpack_require__("d+zW");
const p2ms = __webpack_require__("xmXb");
const p2pk = __webpack_require__("bEv/");
const p2pkh = __webpack_require__("SqU0");
function check(chunks, allowIncomplete) {
  typeforce(typeforce.Array, chunks);
  if (chunks.length < 1) return false;
  const witnessScript = chunks[chunks.length - 1];
  if (!Buffer.isBuffer(witnessScript)) return false;
  const witnessScriptChunks = bscript.decompile(witnessScript);
  // is witnessScript a valid script?
  if (!witnessScriptChunks || witnessScriptChunks.length === 0) return false;
  const witnessRawScriptSig = bscript.compile(chunks.slice(0, -1));
  // match types
  if (
    p2pkh.input.check(witnessRawScriptSig) &&
    p2pkh.output.check(witnessScriptChunks)
  )
    return true;
  if (
    p2ms.input.check(witnessRawScriptSig, allowIncomplete) &&
    p2ms.output.check(witnessScriptChunks)
  )
    return true;
  if (
    p2pk.input.check(witnessRawScriptSig) &&
    p2pk.output.check(witnessScriptChunks)
  )
    return true;
  return false;
}
exports.check = check;
check.toJSON = () => {
  return 'witnessScriptHash input';
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "HKPE":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, '__esModule', { value: true });
const output = __webpack_require__("9PLV");
exports.output = output;


/***/ }),

/***/ "I/fK":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// {signature}
Object.defineProperty(exports, '__esModule', { value: true });
const bscript = __webpack_require__("O5DG");
function check(script) {
  const chunks = bscript.decompile(script);
  return chunks.length === 1 && bscript.isCanonicalScriptSignature(chunks[0]);
}
exports.check = check;
check.toJSON = () => {
  return 'pubKey input';
};


/***/ }),

/***/ "I6F5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, '__esModule', { value: true });
const script_1 = __webpack_require__("O5DG");
const multisig = __webpack_require__("xmXb");
const nullData = __webpack_require__("SsB5");
const pubKey = __webpack_require__("bEv/");
const pubKeyHash = __webpack_require__("SqU0");
const scriptHash = __webpack_require__("IYV5");
const witnessCommitment = __webpack_require__("HKPE");
const witnessPubKeyHash = __webpack_require__("CB62");
const witnessScriptHash = __webpack_require__("vR+u");
const types = {
  P2MS: 'multisig',
  NONSTANDARD: 'nonstandard',
  NULLDATA: 'nulldata',
  P2PK: 'pubkey',
  P2PKH: 'pubkeyhash',
  P2SH: 'scripthash',
  P2WPKH: 'witnesspubkeyhash',
  P2WSH: 'witnessscripthash',
  WITNESS_COMMITMENT: 'witnesscommitment',
};
exports.types = types;
function classifyOutput(script) {
  if (witnessPubKeyHash.output.check(script)) return types.P2WPKH;
  if (witnessScriptHash.output.check(script)) return types.P2WSH;
  if (pubKeyHash.output.check(script)) return types.P2PKH;
  if (scriptHash.output.check(script)) return types.P2SH;
  // XXX: optimization, below functions .decompile before use
  const chunks = script_1.decompile(script);
  if (!chunks) throw new TypeError('Invalid script');
  if (multisig.output.check(chunks)) return types.P2MS;
  if (pubKey.output.check(chunks)) return types.P2PK;
  if (witnessCommitment.output.check(chunks)) return types.WITNESS_COMMITMENT;
  if (nullData.output.check(chunks)) return types.NULLDATA;
  return types.NONSTANDARD;
}
exports.output = classifyOutput;
function classifyInput(script, allowIncomplete) {
  // XXX: optimization, below functions .decompile before use
  const chunks = script_1.decompile(script);
  if (!chunks) throw new TypeError('Invalid script');
  if (pubKeyHash.input.check(chunks)) return types.P2PKH;
  if (scriptHash.input.check(chunks, allowIncomplete)) return types.P2SH;
  if (multisig.input.check(chunks, allowIncomplete)) return types.P2MS;
  if (pubKey.input.check(chunks)) return types.P2PK;
  return types.NONSTANDARD;
}
exports.input = classifyInput;
function classifyWitness(script, allowIncomplete) {
  // XXX: optimization, below functions .decompile before use
  const chunks = script_1.decompile(script);
  if (!chunks) throw new TypeError('Invalid script');
  if (witnessPubKeyHash.input.check(chunks)) return types.P2WPKH;
  if (witnessScriptHash.input.check(chunks, allowIncomplete))
    return types.P2WSH;
  return types.NONSTANDARD;
}
exports.witness = classifyWitness;


/***/ }),

/***/ "IYV5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, '__esModule', { value: true });
const input = __webpack_require__("YxaY");
exports.input = input;
const output = __webpack_require__("mBxT");
exports.output = output;


/***/ }),

/***/ "IiU8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
Object.defineProperty(exports, '__esModule', { value: true });
const NETWORKS = __webpack_require__("A6N3");
const types = __webpack_require__("wmJG");
const ecc = __webpack_require__("KfcP");
const randomBytes = __webpack_require__("Edxu");
const typeforce = __webpack_require__("d+zW");
const wif = __webpack_require__("pQ88");
const isOptions = typeforce.maybe(
  typeforce.compile({
    compressed: types.maybe(types.Boolean),
    network: types.maybe(types.Network),
  }),
);
class ECPair {
  constructor(__D, __Q, options) {
    this.__D = __D;
    this.__Q = __Q;
    this.lowR = false;
    if (options === undefined) options = {};
    this.compressed =
      options.compressed === undefined ? true : options.compressed;
    this.network = options.network || NETWORKS.bitcoin;
    if (__Q !== undefined) this.__Q = ecc.pointCompress(__Q, this.compressed);
  }
  get privateKey() {
    return this.__D;
  }
  get publicKey() {
    if (!this.__Q) this.__Q = ecc.pointFromScalar(this.__D, this.compressed);
    return this.__Q;
  }
  toWIF() {
    if (!this.__D) throw new Error('Missing private key');
    return wif.encode(this.network.wif, this.__D, this.compressed);
  }
  sign(hash, lowR) {
    if (!this.__D) throw new Error('Missing private key');
    if (lowR === undefined) lowR = this.lowR;
    if (lowR === false) {
      return ecc.sign(hash, this.__D);
    } else {
      let sig = ecc.sign(hash, this.__D);
      const extraData = Buffer.alloc(32, 0);
      let counter = 0;
      // if first try is lowR, skip the loop
      // for second try and on, add extra entropy counting up
      while (sig[0] > 0x7f) {
        counter++;
        extraData.writeUIntLE(counter, 0, 6);
        sig = ecc.signWithEntropy(hash, this.__D, extraData);
      }
      return sig;
    }
  }
  verify(hash, signature) {
    return ecc.verify(hash, this.publicKey, signature);
  }
}
function fromPrivateKey(buffer, options) {
  typeforce(types.Buffer256bit, buffer);
  if (!ecc.isPrivate(buffer))
    throw new TypeError('Private key not in range [1, n)');
  typeforce(isOptions, options);
  return new ECPair(buffer, undefined, options);
}
exports.fromPrivateKey = fromPrivateKey;
function fromPublicKey(buffer, options) {
  typeforce(ecc.isPoint, buffer);
  typeforce(isOptions, options);
  return new ECPair(undefined, buffer, options);
}
exports.fromPublicKey = fromPublicKey;
function fromWIF(wifString, network) {
  const decoded = wif.decode(wifString);
  const version = decoded.version;
  // list of networks?
  if (types.Array(network)) {
    network = network
      .filter(x => {
        return version === x.wif;
      })
      .pop();
    if (!network) throw new Error('Unknown network version');
    // otherwise, assume a network object (or default to bitcoin)
  } else {
    network = network || NETWORKS.bitcoin;
    if (version !== network.wif) throw new Error('Invalid network version');
  }
  return fromPrivateKey(decoded.privateKey, {
    compressed: decoded.compressed,
    network: network,
  });
}
exports.fromWIF = fromWIF;
function makeRandom(options) {
  typeforce(isOptions, options);
  if (options === undefined) options = {};
  const rng = options.rng || randomBytes;
  let d;
  do {
    d = rng(32);
    typeforce(types.Buffer256bit, d);
  } while (!ecc.isPrivate(d));
  return fromPrivateKey(d, options);
}
exports.makeRandom = makeRandom;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "Is0A":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, '__esModule', { value: true });
const networks_1 = __webpack_require__("A6N3");
const bscript = __webpack_require__("O5DG");
const lazy = __webpack_require__("XKyx");
const OPS = bscript.OPS;
const typef = __webpack_require__("d+zW");
const ecc = __webpack_require__("KfcP");
const OP_INT_BASE = OPS.OP_RESERVED; // OP_1 - 1
function stacksEqual(a, b) {
  if (a.length !== b.length) return false;
  return a.every((x, i) => {
    return x.equals(b[i]);
  });
}
// input: OP_0 [signatures ...]
// output: m [pubKeys ...] n OP_CHECKMULTISIG
function p2ms(a, opts) {
  if (
    !a.input &&
    !a.output &&
    !(a.pubkeys && a.m !== undefined) &&
    !a.signatures
  )
    throw new TypeError('Not enough data');
  opts = Object.assign({ validate: true }, opts || {});
  function isAcceptableSignature(x) {
    return (
      bscript.isCanonicalScriptSignature(x) ||
      (opts.allowIncomplete && x === OPS.OP_0) !== undefined
    );
  }
  typef(
    {
      network: typef.maybe(typef.Object),
      m: typef.maybe(typef.Number),
      n: typef.maybe(typef.Number),
      output: typef.maybe(typef.Buffer),
      pubkeys: typef.maybe(typef.arrayOf(ecc.isPoint)),
      signatures: typef.maybe(typef.arrayOf(isAcceptableSignature)),
      input: typef.maybe(typef.Buffer),
    },
    a,
  );
  const network = a.network || networks_1.bitcoin;
  const o = { network };
  let chunks = [];
  let decoded = false;
  function decode(output) {
    if (decoded) return;
    decoded = true;
    chunks = bscript.decompile(output);
    o.m = chunks[0] - OP_INT_BASE;
    o.n = chunks[chunks.length - 2] - OP_INT_BASE;
    o.pubkeys = chunks.slice(1, -2);
  }
  lazy.prop(o, 'output', () => {
    if (!a.m) return;
    if (!o.n) return;
    if (!a.pubkeys) return;
    return bscript.compile(
      [].concat(
        OP_INT_BASE + a.m,
        a.pubkeys,
        OP_INT_BASE + o.n,
        OPS.OP_CHECKMULTISIG,
      ),
    );
  });
  lazy.prop(o, 'm', () => {
    if (!o.output) return;
    decode(o.output);
    return o.m;
  });
  lazy.prop(o, 'n', () => {
    if (!o.pubkeys) return;
    return o.pubkeys.length;
  });
  lazy.prop(o, 'pubkeys', () => {
    if (!a.output) return;
    decode(a.output);
    return o.pubkeys;
  });
  lazy.prop(o, 'signatures', () => {
    if (!a.input) return;
    return bscript.decompile(a.input).slice(1);
  });
  lazy.prop(o, 'input', () => {
    if (!a.signatures) return;
    return bscript.compile([OPS.OP_0].concat(a.signatures));
  });
  lazy.prop(o, 'witness', () => {
    if (!o.input) return;
    return [];
  });
  lazy.prop(o, 'name', () => {
    if (!o.m || !o.n) return;
    return `p2ms(${o.m} of ${o.n})`;
  });
  // extended validation
  if (opts.validate) {
    if (a.output) {
      decode(a.output);
      if (!typef.Number(chunks[0])) throw new TypeError('Output is invalid');
      if (!typef.Number(chunks[chunks.length - 2]))
        throw new TypeError('Output is invalid');
      if (chunks[chunks.length - 1] !== OPS.OP_CHECKMULTISIG)
        throw new TypeError('Output is invalid');
      if (o.m <= 0 || o.n > 16 || o.m > o.n || o.n !== chunks.length - 3)
        throw new TypeError('Output is invalid');
      if (!o.pubkeys.every(x => ecc.isPoint(x)))
        throw new TypeError('Output is invalid');
      if (a.m !== undefined && a.m !== o.m) throw new TypeError('m mismatch');
      if (a.n !== undefined && a.n !== o.n) throw new TypeError('n mismatch');
      if (a.pubkeys && !stacksEqual(a.pubkeys, o.pubkeys))
        throw new TypeError('Pubkeys mismatch');
    }
    if (a.pubkeys) {
      if (a.n !== undefined && a.n !== a.pubkeys.length)
        throw new TypeError('Pubkey count mismatch');
      o.n = a.pubkeys.length;
      if (o.n < o.m) throw new TypeError('Pubkey count cannot be less than m');
    }
    if (a.signatures) {
      if (a.signatures.length < o.m)
        throw new TypeError('Not enough signatures provided');
      if (a.signatures.length > o.m)
        throw new TypeError('Too many signatures provided');
    }
    if (a.input) {
      if (a.input[0] !== OPS.OP_0) throw new TypeError('Input is invalid');
      if (
        o.signatures.length === 0 ||
        !o.signatures.every(isAcceptableSignature)
      )
        throw new TypeError('Input has invalid signature(s)');
      if (a.signatures && !stacksEqual(a.signatures, o.signatures))
        throw new TypeError('Signature mismatch');
      if (a.m !== undefined && a.m !== a.signatures.length)
        throw new TypeError('Signature count mismatch');
    }
  }
  return Object.assign(o, a);
}
exports.p2ms = p2ms;


/***/ }),

/***/ "NPSo":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
Object.defineProperty(exports, '__esModule', { value: true });
const bufferutils = __webpack_require__("n8MN");
const bufferutils_1 = __webpack_require__("n8MN");
const bcrypto = __webpack_require__("lin5");
const bscript = __webpack_require__("O5DG");
const script_1 = __webpack_require__("O5DG");
const types = __webpack_require__("wmJG");
const typeforce = __webpack_require__("d+zW");
const varuint = __webpack_require__("nU2i");
function varSliceSize(someScript) {
  const length = someScript.length;
  return varuint.encodingLength(length) + length;
}
function vectorSize(someVector) {
  const length = someVector.length;
  return (
    varuint.encodingLength(length) +
    someVector.reduce((sum, witness) => {
      return sum + varSliceSize(witness);
    }, 0)
  );
}
const EMPTY_SCRIPT = Buffer.allocUnsafe(0);
const EMPTY_WITNESS = [];
const ZERO = Buffer.from(
  '0000000000000000000000000000000000000000000000000000000000000000',
  'hex',
);
const ONE = Buffer.from(
  '0000000000000000000000000000000000000000000000000000000000000001',
  'hex',
);
const VALUE_UINT64_MAX = Buffer.from('ffffffffffffffff', 'hex');
const BLANK_OUTPUT = {
  script: EMPTY_SCRIPT,
  valueBuffer: VALUE_UINT64_MAX,
};
function isOutput(out) {
  return out.value !== undefined;
}
class Transaction {
  constructor() {
    this.version = 1;
    this.locktime = 0;
    this.ins = [];
    this.outs = [];
  }
  static fromBuffer(buffer, _NO_STRICT) {
    let offset = 0;
    function readSlice(n) {
      offset += n;
      return buffer.slice(offset - n, offset);
    }
    function readUInt32() {
      const i = buffer.readUInt32LE(offset);
      offset += 4;
      return i;
    }
    function readInt32() {
      const i = buffer.readInt32LE(offset);
      offset += 4;
      return i;
    }
    function readUInt64() {
      const i = bufferutils.readUInt64LE(buffer, offset);
      offset += 8;
      return i;
    }
    function readVarInt() {
      const vi = varuint.decode(buffer, offset);
      offset += varuint.decode.bytes;
      return vi;
    }
    function readVarSlice() {
      return readSlice(readVarInt());
    }
    function readVector() {
      const count = readVarInt();
      const vector = [];
      for (let i = 0; i < count; i++) vector.push(readVarSlice());
      return vector;
    }
    const tx = new Transaction();
    tx.version = readInt32();
    const marker = buffer.readUInt8(offset);
    const flag = buffer.readUInt8(offset + 1);
    let hasWitnesses = false;
    if (
      marker === Transaction.ADVANCED_TRANSACTION_MARKER &&
      flag === Transaction.ADVANCED_TRANSACTION_FLAG
    ) {
      offset += 2;
      hasWitnesses = true;
    }
    const vinLen = readVarInt();
    for (let i = 0; i < vinLen; ++i) {
      tx.ins.push({
        hash: readSlice(32),
        index: readUInt32(),
        script: readVarSlice(),
        sequence: readUInt32(),
        witness: EMPTY_WITNESS,
      });
    }
    const voutLen = readVarInt();
    for (let i = 0; i < voutLen; ++i) {
      tx.outs.push({
        value: readUInt64(),
        script: readVarSlice(),
      });
    }
    if (hasWitnesses) {
      for (let i = 0; i < vinLen; ++i) {
        tx.ins[i].witness = readVector();
      }
      // was this pointless?
      if (!tx.hasWitnesses())
        throw new Error('Transaction has superfluous witness data');
    }
    tx.locktime = readUInt32();
    if (_NO_STRICT) return tx;
    if (offset !== buffer.length)
      throw new Error('Transaction has unexpected data');
    return tx;
  }
  static fromHex(hex) {
    return Transaction.fromBuffer(Buffer.from(hex, 'hex'), false);
  }
  static isCoinbaseHash(buffer) {
    typeforce(types.Hash256bit, buffer);
    for (let i = 0; i < 32; ++i) {
      if (buffer[i] !== 0) return false;
    }
    return true;
  }
  isCoinbase() {
    return (
      this.ins.length === 1 && Transaction.isCoinbaseHash(this.ins[0].hash)
    );
  }
  addInput(hash, index, sequence, scriptSig) {
    typeforce(
      types.tuple(
        types.Hash256bit,
        types.UInt32,
        types.maybe(types.UInt32),
        types.maybe(types.Buffer),
      ),
      arguments,
    );
    if (types.Null(sequence)) {
      sequence = Transaction.DEFAULT_SEQUENCE;
    }
    // Add the input and return the input's index
    return (
      this.ins.push({
        hash,
        index,
        script: scriptSig || EMPTY_SCRIPT,
        sequence: sequence,
        witness: EMPTY_WITNESS,
      }) - 1
    );
  }
  addOutput(scriptPubKey, value) {
    typeforce(types.tuple(types.Buffer, types.Satoshi), arguments);
    // Add the output and return the output's index
    return (
      this.outs.push({
        script: scriptPubKey,
        value,
      }) - 1
    );
  }
  hasWitnesses() {
    return this.ins.some(x => {
      return x.witness.length !== 0;
    });
  }
  weight() {
    const base = this.__byteLength(false);
    const total = this.__byteLength(true);
    return base * 3 + total;
  }
  virtualSize() {
    return Math.ceil(this.weight() / 4);
  }
  byteLength() {
    return this.__byteLength(true);
  }
  clone() {
    const newTx = new Transaction();
    newTx.version = this.version;
    newTx.locktime = this.locktime;
    newTx.ins = this.ins.map(txIn => {
      return {
        hash: txIn.hash,
        index: txIn.index,
        script: txIn.script,
        sequence: txIn.sequence,
        witness: txIn.witness,
      };
    });
    newTx.outs = this.outs.map(txOut => {
      return {
        script: txOut.script,
        value: txOut.value,
      };
    });
    return newTx;
  }
  /**
   * Hash transaction for signing a specific input.
   *
   * Bitcoin uses a different hash for each signed transaction input.
   * This method copies the transaction, makes the necessary changes based on the
   * hashType, and then hashes the result.
   * This hash can then be used to sign the provided transaction input.
   */
  hashForSignature(inIndex, prevOutScript, hashType) {
    typeforce(
      types.tuple(types.UInt32, types.Buffer, /* types.UInt8 */ types.Number),
      arguments,
    );
    // https://github.com/bitcoin/bitcoin/blob/master/src/test/sighash_tests.cpp#L29
    if (inIndex >= this.ins.length) return ONE;
    // ignore OP_CODESEPARATOR
    const ourScript = bscript.compile(
      bscript.decompile(prevOutScript).filter(x => {
        return x !== script_1.OPS.OP_CODESEPARATOR;
      }),
    );
    const txTmp = this.clone();
    // SIGHASH_NONE: ignore all outputs? (wildcard payee)
    if ((hashType & 0x1f) === Transaction.SIGHASH_NONE) {
      txTmp.outs = [];
      // ignore sequence numbers (except at inIndex)
      txTmp.ins.forEach((input, i) => {
        if (i === inIndex) return;
        input.sequence = 0;
      });
      // SIGHASH_SINGLE: ignore all outputs, except at the same index?
    } else if ((hashType & 0x1f) === Transaction.SIGHASH_SINGLE) {
      // https://github.com/bitcoin/bitcoin/blob/master/src/test/sighash_tests.cpp#L60
      if (inIndex >= this.outs.length) return ONE;
      // truncate outputs after
      txTmp.outs.length = inIndex + 1;
      // "blank" outputs before
      for (let i = 0; i < inIndex; i++) {
        txTmp.outs[i] = BLANK_OUTPUT;
      }
      // ignore sequence numbers (except at inIndex)
      txTmp.ins.forEach((input, y) => {
        if (y === inIndex) return;
        input.sequence = 0;
      });
    }
    // SIGHASH_ANYONECANPAY: ignore inputs entirely?
    if (hashType & Transaction.SIGHASH_ANYONECANPAY) {
      txTmp.ins = [txTmp.ins[inIndex]];
      txTmp.ins[0].script = ourScript;
      // SIGHASH_ALL: only ignore input scripts
    } else {
      // "blank" others input scripts
      txTmp.ins.forEach(input => {
        input.script = EMPTY_SCRIPT;
      });
      txTmp.ins[inIndex].script = ourScript;
    }
    // serialize and hash
    const buffer = Buffer.allocUnsafe(txTmp.__byteLength(false) + 4);
    buffer.writeInt32LE(hashType, buffer.length - 4);
    txTmp.__toBuffer(buffer, 0, false);
    return bcrypto.hash256(buffer);
  }
  hashForWitnessV0(inIndex, prevOutScript, value, hashType) {
    typeforce(
      types.tuple(types.UInt32, types.Buffer, types.Satoshi, types.UInt32),
      arguments,
    );
    let tbuffer = Buffer.from([]);
    let toffset = 0;
    function writeSlice(slice) {
      toffset += slice.copy(tbuffer, toffset);
    }
    function writeUInt32(i) {
      toffset = tbuffer.writeUInt32LE(i, toffset);
    }
    function writeUInt64(i) {
      toffset = bufferutils.writeUInt64LE(tbuffer, i, toffset);
    }
    function writeVarInt(i) {
      varuint.encode(i, tbuffer, toffset);
      toffset += varuint.encode.bytes;
    }
    function writeVarSlice(slice) {
      writeVarInt(slice.length);
      writeSlice(slice);
    }
    let hashOutputs = ZERO;
    let hashPrevouts = ZERO;
    let hashSequence = ZERO;
    if (!(hashType & Transaction.SIGHASH_ANYONECANPAY)) {
      tbuffer = Buffer.allocUnsafe(36 * this.ins.length);
      toffset = 0;
      this.ins.forEach(txIn => {
        writeSlice(txIn.hash);
        writeUInt32(txIn.index);
      });
      hashPrevouts = bcrypto.hash256(tbuffer);
    }
    if (
      !(hashType & Transaction.SIGHASH_ANYONECANPAY) &&
      (hashType & 0x1f) !== Transaction.SIGHASH_SINGLE &&
      (hashType & 0x1f) !== Transaction.SIGHASH_NONE
    ) {
      tbuffer = Buffer.allocUnsafe(4 * this.ins.length);
      toffset = 0;
      this.ins.forEach(txIn => {
        writeUInt32(txIn.sequence);
      });
      hashSequence = bcrypto.hash256(tbuffer);
    }
    if (
      (hashType & 0x1f) !== Transaction.SIGHASH_SINGLE &&
      (hashType & 0x1f) !== Transaction.SIGHASH_NONE
    ) {
      const txOutsSize = this.outs.reduce((sum, output) => {
        return sum + 8 + varSliceSize(output.script);
      }, 0);
      tbuffer = Buffer.allocUnsafe(txOutsSize);
      toffset = 0;
      this.outs.forEach(out => {
        writeUInt64(out.value);
        writeVarSlice(out.script);
      });
      hashOutputs = bcrypto.hash256(tbuffer);
    } else if (
      (hashType & 0x1f) === Transaction.SIGHASH_SINGLE &&
      inIndex < this.outs.length
    ) {
      const output = this.outs[inIndex];
      tbuffer = Buffer.allocUnsafe(8 + varSliceSize(output.script));
      toffset = 0;
      writeUInt64(output.value);
      writeVarSlice(output.script);
      hashOutputs = bcrypto.hash256(tbuffer);
    }
    tbuffer = Buffer.allocUnsafe(156 + varSliceSize(prevOutScript));
    toffset = 0;
    const input = this.ins[inIndex];
    writeUInt32(this.version);
    writeSlice(hashPrevouts);
    writeSlice(hashSequence);
    writeSlice(input.hash);
    writeUInt32(input.index);
    writeVarSlice(prevOutScript);
    writeUInt64(value);
    writeUInt32(input.sequence);
    writeSlice(hashOutputs);
    writeUInt32(this.locktime);
    writeUInt32(hashType);
    return bcrypto.hash256(tbuffer);
  }
  getHash(forWitness) {
    // wtxid for coinbase is always 32 bytes of 0x00
    if (forWitness && this.isCoinbase()) return Buffer.alloc(32, 0);
    return bcrypto.hash256(this.__toBuffer(undefined, undefined, forWitness));
  }
  getId() {
    // transaction hash's are displayed in reverse order
    return bufferutils_1.reverseBuffer(this.getHash(false)).toString('hex');
  }
  toBuffer(buffer, initialOffset) {
    return this.__toBuffer(buffer, initialOffset, true);
  }
  toHex() {
    return this.toBuffer(undefined, undefined).toString('hex');
  }
  setInputScript(index, scriptSig) {
    typeforce(types.tuple(types.Number, types.Buffer), arguments);
    this.ins[index].script = scriptSig;
  }
  setWitness(index, witness) {
    typeforce(types.tuple(types.Number, [types.Buffer]), arguments);
    this.ins[index].witness = witness;
  }
  __byteLength(_ALLOW_WITNESS) {
    const hasWitnesses = _ALLOW_WITNESS && this.hasWitnesses();
    return (
      (hasWitnesses ? 10 : 8) +
      varuint.encodingLength(this.ins.length) +
      varuint.encodingLength(this.outs.length) +
      this.ins.reduce((sum, input) => {
        return sum + 40 + varSliceSize(input.script);
      }, 0) +
      this.outs.reduce((sum, output) => {
        return sum + 8 + varSliceSize(output.script);
      }, 0) +
      (hasWitnesses
        ? this.ins.reduce((sum, input) => {
            return sum + vectorSize(input.witness);
          }, 0)
        : 0)
    );
  }
  __toBuffer(buffer, initialOffset, _ALLOW_WITNESS) {
    if (!buffer) buffer = Buffer.allocUnsafe(this.__byteLength(_ALLOW_WITNESS));
    let offset = initialOffset || 0;
    function writeSlice(slice) {
      offset += slice.copy(buffer, offset);
    }
    function writeUInt8(i) {
      offset = buffer.writeUInt8(i, offset);
    }
    function writeUInt32(i) {
      offset = buffer.writeUInt32LE(i, offset);
    }
    function writeInt32(i) {
      offset = buffer.writeInt32LE(i, offset);
    }
    function writeUInt64(i) {
      offset = bufferutils.writeUInt64LE(buffer, i, offset);
    }
    function writeVarInt(i) {
      varuint.encode(i, buffer, offset);
      offset += varuint.encode.bytes;
    }
    function writeVarSlice(slice) {
      writeVarInt(slice.length);
      writeSlice(slice);
    }
    function writeVector(vector) {
      writeVarInt(vector.length);
      vector.forEach(writeVarSlice);
    }
    writeInt32(this.version);
    const hasWitnesses = _ALLOW_WITNESS && this.hasWitnesses();
    if (hasWitnesses) {
      writeUInt8(Transaction.ADVANCED_TRANSACTION_MARKER);
      writeUInt8(Transaction.ADVANCED_TRANSACTION_FLAG);
    }
    writeVarInt(this.ins.length);
    this.ins.forEach(txIn => {
      writeSlice(txIn.hash);
      writeUInt32(txIn.index);
      writeVarSlice(txIn.script);
      writeUInt32(txIn.sequence);
    });
    writeVarInt(this.outs.length);
    this.outs.forEach(txOut => {
      if (isOutput(txOut)) {
        writeUInt64(txOut.value);
      } else {
        writeSlice(txOut.valueBuffer);
      }
      writeVarSlice(txOut.script);
    });
    if (hasWitnesses) {
      this.ins.forEach(input => {
        writeVector(input.witness);
      });
    }
    writeUInt32(this.locktime);
    // avoid slicing unless necessary
    if (initialOffset !== undefined) return buffer.slice(initialOffset, offset);
    return buffer;
  }
}
Transaction.DEFAULT_SEQUENCE = 0xffffffff;
Transaction.SIGHASH_ALL = 0x01;
Transaction.SIGHASH_NONE = 0x02;
Transaction.SIGHASH_SINGLE = 0x03;
Transaction.SIGHASH_ANYONECANPAY = 0x80;
Transaction.ADVANCED_TRANSACTION_MARKER = 0x00;
Transaction.ADVANCED_TRANSACTION_FLAG = 0x01;
exports.Transaction = Transaction;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "Nw9z":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// {pubKey} OP_CHECKSIG
Object.defineProperty(exports, '__esModule', { value: true });
const bscript = __webpack_require__("O5DG");
const script_1 = __webpack_require__("O5DG");
function check(script) {
  const chunks = bscript.decompile(script);
  return (
    chunks.length === 2 &&
    bscript.isCanonicalPubKey(chunks[0]) &&
    chunks[1] === script_1.OPS.OP_CHECKSIG
  );
}
exports.check = check;
check.toJSON = () => {
  return 'pubKey output';
};


/***/ }),

/***/ "O5DG":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
Object.defineProperty(exports, '__esModule', { value: true });
const scriptNumber = __webpack_require__("dfgu");
const scriptSignature = __webpack_require__("PHfo");
const types = __webpack_require__("wmJG");
const bip66 = __webpack_require__("zRCy");
const ecc = __webpack_require__("KfcP");
const pushdata = __webpack_require__("FxS5");
const typeforce = __webpack_require__("d+zW");
exports.OPS = __webpack_require__("E0BK");
const REVERSE_OPS = __webpack_require__("yX9u");
const OP_INT_BASE = exports.OPS.OP_RESERVED; // OP_1 - 1
function isOPInt(value) {
  return (
    types.Number(value) &&
    (value === exports.OPS.OP_0 ||
      (value >= exports.OPS.OP_1 && value <= exports.OPS.OP_16) ||
      value === exports.OPS.OP_1NEGATE)
  );
}
function isPushOnlyChunk(value) {
  return types.Buffer(value) || isOPInt(value);
}
function isPushOnly(value) {
  return types.Array(value) && value.every(isPushOnlyChunk);
}
exports.isPushOnly = isPushOnly;
function asMinimalOP(buffer) {
  if (buffer.length === 0) return exports.OPS.OP_0;
  if (buffer.length !== 1) return;
  if (buffer[0] >= 1 && buffer[0] <= 16) return OP_INT_BASE + buffer[0];
  if (buffer[0] === 0x81) return exports.OPS.OP_1NEGATE;
}
function chunksIsBuffer(buf) {
  return Buffer.isBuffer(buf);
}
function chunksIsArray(buf) {
  return types.Array(buf);
}
function singleChunkIsBuffer(buf) {
  return Buffer.isBuffer(buf);
}
function compile(chunks) {
  // TODO: remove me
  if (chunksIsBuffer(chunks)) return chunks;
  typeforce(types.Array, chunks);
  const bufferSize = chunks.reduce((accum, chunk) => {
    // data chunk
    if (singleChunkIsBuffer(chunk)) {
      // adhere to BIP62.3, minimal push policy
      if (chunk.length === 1 && asMinimalOP(chunk) !== undefined) {
        return accum + 1;
      }
      return accum + pushdata.encodingLength(chunk.length) + chunk.length;
    }
    // opcode
    return accum + 1;
  }, 0.0);
  const buffer = Buffer.allocUnsafe(bufferSize);
  let offset = 0;
  chunks.forEach(chunk => {
    // data chunk
    if (singleChunkIsBuffer(chunk)) {
      // adhere to BIP62.3, minimal push policy
      const opcode = asMinimalOP(chunk);
      if (opcode !== undefined) {
        buffer.writeUInt8(opcode, offset);
        offset += 1;
        return;
      }
      offset += pushdata.encode(buffer, chunk.length, offset);
      chunk.copy(buffer, offset);
      offset += chunk.length;
      // opcode
    } else {
      buffer.writeUInt8(chunk, offset);
      offset += 1;
    }
  });
  if (offset !== buffer.length) throw new Error('Could not decode chunks');
  return buffer;
}
exports.compile = compile;
function decompile(buffer) {
  // TODO: remove me
  if (chunksIsArray(buffer)) return buffer;
  typeforce(types.Buffer, buffer);
  const chunks = [];
  let i = 0;
  while (i < buffer.length) {
    const opcode = buffer[i];
    // data chunk
    if (opcode > exports.OPS.OP_0 && opcode <= exports.OPS.OP_PUSHDATA4) {
      const d = pushdata.decode(buffer, i);
      // did reading a pushDataInt fail?
      if (d === null) return null;
      i += d.size;
      // attempt to read too much data?
      if (i + d.number > buffer.length) return null;
      const data = buffer.slice(i, i + d.number);
      i += d.number;
      // decompile minimally
      const op = asMinimalOP(data);
      if (op !== undefined) {
        chunks.push(op);
      } else {
        chunks.push(data);
      }
      // opcode
    } else {
      chunks.push(opcode);
      i += 1;
    }
  }
  return chunks;
}
exports.decompile = decompile;
function toASM(chunks) {
  if (chunksIsBuffer(chunks)) {
    chunks = decompile(chunks);
  }
  return chunks
    .map(chunk => {
      // data?
      if (singleChunkIsBuffer(chunk)) {
        const op = asMinimalOP(chunk);
        if (op === undefined) return chunk.toString('hex');
        chunk = op;
      }
      // opcode!
      return REVERSE_OPS[chunk];
    })
    .join(' ');
}
exports.toASM = toASM;
function fromASM(asm) {
  typeforce(types.String, asm);
  return compile(
    asm.split(' ').map(chunkStr => {
      // opcode?
      if (exports.OPS[chunkStr] !== undefined) return exports.OPS[chunkStr];
      typeforce(types.Hex, chunkStr);
      // data!
      return Buffer.from(chunkStr, 'hex');
    }),
  );
}
exports.fromASM = fromASM;
function toStack(chunks) {
  chunks = decompile(chunks);
  typeforce(isPushOnly, chunks);
  return chunks.map(op => {
    if (singleChunkIsBuffer(op)) return op;
    if (op === exports.OPS.OP_0) return Buffer.allocUnsafe(0);
    return scriptNumber.encode(op - OP_INT_BASE);
  });
}
exports.toStack = toStack;
function isCanonicalPubKey(buffer) {
  return ecc.isPoint(buffer);
}
exports.isCanonicalPubKey = isCanonicalPubKey;
function isDefinedHashType(hashType) {
  const hashTypeMod = hashType & ~0x80;
  // return hashTypeMod > SIGHASH_ALL && hashTypeMod < SIGHASH_SINGLE
  return hashTypeMod > 0x00 && hashTypeMod < 0x04;
}
exports.isDefinedHashType = isDefinedHashType;
function isCanonicalScriptSignature(buffer) {
  if (!Buffer.isBuffer(buffer)) return false;
  if (!isDefinedHashType(buffer[buffer.length - 1])) return false;
  return bip66.check(buffer.slice(0, -1));
}
exports.isCanonicalScriptSignature = isCanonicalScriptSignature;
// tslint:disable-next-line variable-name
exports.number = scriptNumber;
exports.signature = scriptSignature;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "PHfo":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
Object.defineProperty(exports, '__esModule', { value: true });
const types = __webpack_require__("wmJG");
const bip66 = __webpack_require__("zRCy");
const typeforce = __webpack_require__("d+zW");
const ZERO = Buffer.alloc(1, 0);
function toDER(x) {
  let i = 0;
  while (x[i] === 0) ++i;
  if (i === x.length) return ZERO;
  x = x.slice(i);
  if (x[0] & 0x80) return Buffer.concat([ZERO, x], 1 + x.length);
  return x;
}
function fromDER(x) {
  if (x[0] === 0x00) x = x.slice(1);
  const buffer = Buffer.alloc(32, 0);
  const bstart = Math.max(0, 32 - x.length);
  x.copy(buffer, bstart);
  return buffer;
}
// BIP62: 1 byte hashType flag (only 0x01, 0x02, 0x03, 0x81, 0x82 and 0x83 are allowed)
function decode(buffer) {
  const hashType = buffer.readUInt8(buffer.length - 1);
  const hashTypeMod = hashType & ~0x80;
  if (hashTypeMod <= 0 || hashTypeMod >= 4)
    throw new Error('Invalid hashType ' + hashType);
  const decoded = bip66.decode(buffer.slice(0, -1));
  const r = fromDER(decoded.r);
  const s = fromDER(decoded.s);
  const signature = Buffer.concat([r, s], 64);
  return { signature, hashType };
}
exports.decode = decode;
function encode(signature, hashType) {
  typeforce(
    {
      signature: types.BufferN(64),
      hashType: types.UInt8,
    },
    { signature, hashType },
  );
  const hashTypeMod = hashType & ~0x80;
  if (hashTypeMod <= 0 || hashTypeMod >= 4)
    throw new Error('Invalid hashType ' + hashType);
  const hashTypeBuffer = Buffer.allocUnsafe(1);
  hashTypeBuffer.writeUInt8(hashType, 0);
  const r = toDER(signature.slice(0, 32));
  const s = toDER(signature.slice(32, 64));
  return Buffer.concat([bip66.encode(r, s), hashTypeBuffer]);
}
exports.encode = encode;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "QDNB":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
Object.defineProperty(exports, '__esModule', { value: true });
const bufferutils_1 = __webpack_require__("n8MN");
const bcrypto = __webpack_require__("lin5");
const transaction_1 = __webpack_require__("NPSo");
const types = __webpack_require__("wmJG");
const fastMerkleRoot = __webpack_require__("CjOr");
const typeforce = __webpack_require__("d+zW");
const varuint = __webpack_require__("nU2i");
const errorMerkleNoTxes = new TypeError(
  'Cannot compute merkle root for zero transactions',
);
const errorWitnessNotSegwit = new TypeError(
  'Cannot compute witness commit for non-segwit block',
);
class Block {
  constructor() {
    this.version = 1;
    this.prevHash = undefined;
    this.merkleRoot = undefined;
    this.timestamp = 0;
    this.witnessCommit = undefined;
    this.bits = 0;
    this.nonce = 0;
    this.transactions = undefined;
  }
  static fromBuffer(buffer) {
    if (buffer.length < 80) throw new Error('Buffer too small (< 80 bytes)');
    let offset = 0;
    const readSlice = n => {
      offset += n;
      return buffer.slice(offset - n, offset);
    };
    const readUInt32 = () => {
      const i = buffer.readUInt32LE(offset);
      offset += 4;
      return i;
    };
    const readInt32 = () => {
      const i = buffer.readInt32LE(offset);
      offset += 4;
      return i;
    };
    const block = new Block();
    block.version = readInt32();
    block.prevHash = readSlice(32);
    block.merkleRoot = readSlice(32);
    block.timestamp = readUInt32();
    block.bits = readUInt32();
    block.nonce = readUInt32();
    if (buffer.length === 80) return block;
    const readVarInt = () => {
      const vi = varuint.decode(buffer, offset);
      offset += varuint.decode.bytes;
      return vi;
    };
    const readTransaction = () => {
      const tx = transaction_1.Transaction.fromBuffer(
        buffer.slice(offset),
        true,
      );
      offset += tx.byteLength();
      return tx;
    };
    const nTransactions = readVarInt();
    block.transactions = [];
    for (let i = 0; i < nTransactions; ++i) {
      const tx = readTransaction();
      block.transactions.push(tx);
    }
    const witnessCommit = block.getWitnessCommit();
    // This Block contains a witness commit
    if (witnessCommit) block.witnessCommit = witnessCommit;
    return block;
  }
  static fromHex(hex) {
    return Block.fromBuffer(Buffer.from(hex, 'hex'));
  }
  static calculateTarget(bits) {
    const exponent = ((bits & 0xff000000) >> 24) - 3;
    const mantissa = bits & 0x007fffff;
    const target = Buffer.alloc(32, 0);
    target.writeUIntBE(mantissa, 29 - exponent, 3);
    return target;
  }
  static calculateMerkleRoot(transactions, forWitness) {
    typeforce([{ getHash: types.Function }], transactions);
    if (transactions.length === 0) throw errorMerkleNoTxes;
    if (forWitness && !txesHaveWitnessCommit(transactions))
      throw errorWitnessNotSegwit;
    const hashes = transactions.map(transaction =>
      transaction.getHash(forWitness),
    );
    const rootHash = fastMerkleRoot(hashes, bcrypto.hash256);
    return forWitness
      ? bcrypto.hash256(
          Buffer.concat([rootHash, transactions[0].ins[0].witness[0]]),
        )
      : rootHash;
  }
  getWitnessCommit() {
    if (!txesHaveWitnessCommit(this.transactions)) return null;
    // The merkle root for the witness data is in an OP_RETURN output.
    // There is no rule for the index of the output, so use filter to find it.
    // The root is prepended with 0xaa21a9ed so check for 0x6a24aa21a9ed
    // If multiple commits are found, the output with highest index is assumed.
    const witnessCommits = this.transactions[0].outs
      .filter(out =>
        out.script.slice(0, 6).equals(Buffer.from('6a24aa21a9ed', 'hex')),
      )
      .map(out => out.script.slice(6, 38));
    if (witnessCommits.length === 0) return null;
    // Use the commit with the highest output (should only be one though)
    const result = witnessCommits[witnessCommits.length - 1];
    if (!(result instanceof Buffer && result.length === 32)) return null;
    return result;
  }
  hasWitnessCommit() {
    if (
      this.witnessCommit instanceof Buffer &&
      this.witnessCommit.length === 32
    )
      return true;
    if (this.getWitnessCommit() !== null) return true;
    return false;
  }
  hasWitness() {
    return anyTxHasWitness(this.transactions);
  }
  byteLength(headersOnly) {
    if (headersOnly || !this.transactions) return 80;
    return (
      80 +
      varuint.encodingLength(this.transactions.length) +
      this.transactions.reduce((a, x) => a + x.byteLength(), 0)
    );
  }
  getHash() {
    return bcrypto.hash256(this.toBuffer(true));
  }
  getId() {
    return bufferutils_1.reverseBuffer(this.getHash()).toString('hex');
  }
  getUTCDate() {
    const date = new Date(0); // epoch
    date.setUTCSeconds(this.timestamp);
    return date;
  }
  // TODO: buffer, offset compatibility
  toBuffer(headersOnly) {
    const buffer = Buffer.allocUnsafe(this.byteLength(headersOnly));
    let offset = 0;
    const writeSlice = slice => {
      slice.copy(buffer, offset);
      offset += slice.length;
    };
    const writeInt32 = i => {
      buffer.writeInt32LE(i, offset);
      offset += 4;
    };
    const writeUInt32 = i => {
      buffer.writeUInt32LE(i, offset);
      offset += 4;
    };
    writeInt32(this.version);
    writeSlice(this.prevHash);
    writeSlice(this.merkleRoot);
    writeUInt32(this.timestamp);
    writeUInt32(this.bits);
    writeUInt32(this.nonce);
    if (headersOnly || !this.transactions) return buffer;
    varuint.encode(this.transactions.length, buffer, offset);
    offset += varuint.encode.bytes;
    this.transactions.forEach(tx => {
      const txSize = tx.byteLength(); // TODO: extract from toBuffer?
      tx.toBuffer(buffer, offset);
      offset += txSize;
    });
    return buffer;
  }
  toHex(headersOnly) {
    return this.toBuffer(headersOnly).toString('hex');
  }
  checkTxRoots() {
    // If the Block has segwit transactions but no witness commit,
    // there's no way it can be valid, so fail the check.
    const hasWitnessCommit = this.hasWitnessCommit();
    if (!hasWitnessCommit && this.hasWitness()) return false;
    return (
      this.__checkMerkleRoot() &&
      (hasWitnessCommit ? this.__checkWitnessCommit() : true)
    );
  }
  checkProofOfWork() {
    const hash = bufferutils_1.reverseBuffer(this.getHash());
    const target = Block.calculateTarget(this.bits);
    return hash.compare(target) <= 0;
  }
  __checkMerkleRoot() {
    if (!this.transactions) throw errorMerkleNoTxes;
    const actualMerkleRoot = Block.calculateMerkleRoot(this.transactions);
    return this.merkleRoot.compare(actualMerkleRoot) === 0;
  }
  __checkWitnessCommit() {
    if (!this.transactions) throw errorMerkleNoTxes;
    if (!this.hasWitnessCommit()) throw errorWitnessNotSegwit;
    const actualWitnessCommit = Block.calculateMerkleRoot(
      this.transactions,
      true,
    );
    return this.witnessCommit.compare(actualWitnessCommit) === 0;
  }
}
exports.Block = Block;
function txesHaveWitnessCommit(transactions) {
  return (
    transactions instanceof Array &&
    transactions[0] &&
    transactions[0].ins &&
    transactions[0].ins instanceof Array &&
    transactions[0].ins[0] &&
    transactions[0].ins[0].witness &&
    transactions[0].ins[0].witness instanceof Array &&
    transactions[0].ins[0].witness.length > 0
  );
}
function anyTxHasWitness(transactions) {
  return (
    transactions instanceof Array &&
    transactions.some(
      tx =>
        typeof tx === 'object' &&
        tx.ins instanceof Array &&
        tx.ins.some(
          input =>
            typeof input === 'object' &&
            input.witness instanceof Array &&
            input.witness.length > 0,
        ),
    )
  );
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "Re6D":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
Object.defineProperty(exports, '__esModule', { value: true });
const bip174_1 = __webpack_require__("DIuF");
const varuint = __webpack_require__("NR72");
const utils_1 = __webpack_require__("oosv");
const address_1 = __webpack_require__("lMJ2");
const bufferutils_1 = __webpack_require__("n8MN");
const crypto_1 = __webpack_require__("lin5");
const ecpair_1 = __webpack_require__("IiU8");
const networks_1 = __webpack_require__("A6N3");
const payments = __webpack_require__("iRDL");
const bscript = __webpack_require__("O5DG");
const transaction_1 = __webpack_require__("NPSo");
/**
 * These are the default arguments for a Psbt instance.
 */
const DEFAULT_OPTS = {
  /**
   * A bitcoinjs Network object. This is only used if you pass an `address`
   * parameter to addOutput. Otherwise it is not needed and can be left default.
   */
  network: networks_1.bitcoin,
  /**
   * When extractTransaction is called, the fee rate is checked.
   * THIS IS NOT TO BE RELIED ON.
   * It is only here as a last ditch effort to prevent sending a 500 BTC fee etc.
   */
  maximumFeeRate: 5000,
};
/**
 * Psbt class can parse and generate a PSBT binary based off of the BIP174.
 * There are 6 roles that this class fulfills. (Explained in BIP174)
 *
 * Creator: This can be done with `new Psbt()`
 * Updater: This can be done with `psbt.addInput(input)`, `psbt.addInputs(inputs)`,
 *   `psbt.addOutput(output)`, `psbt.addOutputs(outputs)` when you are looking to
 *   add new inputs and outputs to the PSBT, and `psbt.updateGlobal(itemObject)`,
 *   `psbt.updateInput(itemObject)`, `psbt.updateOutput(itemObject)`
 *   addInput requires hash: Buffer | string; and index: number; as attributes
 *   and can also include any attributes that are used in updateInput method.
 *   addOutput requires script: Buffer; and value: number; and likewise can include
 *   data for updateOutput.
 *   For a list of what attributes should be what types. Check the bip174 library.
 *   Also, check the integration tests for some examples of usage.
 * Signer: There are a few methods. signAllInputs and signAllInputsAsync, which will search all input
 *   information for your pubkey or pubkeyhash, and only sign inputs where it finds
 *   your info. Or you can explicitly sign a specific input with signInput and
 *   signInputAsync. For the async methods you can create a SignerAsync object
 *   and use something like a hardware wallet to sign with. (You must implement this)
 * Combiner: psbts can be combined easily with `psbt.combine(psbt2, psbt3, psbt4 ...)`
 *   the psbt calling combine will always have precedence when a conflict occurs.
 *   Combine checks if the internal bitcoin transaction is the same, so be sure that
 *   all sequences, version, locktime, etc. are the same before combining.
 * Input Finalizer: This role is fairly important. Not only does it need to construct
 *   the input scriptSigs and witnesses, but it SHOULD verify the signatures etc.
 *   Before running `psbt.finalizeAllInputs()` please run `psbt.validateSignaturesOfAllInputs()`
 *   Running any finalize method will delete any data in the input(s) that are no longer
 *   needed due to the finalized scripts containing the information.
 * Transaction Extractor: This role will perform some checks before returning a
 *   Transaction object. Such as fee rate not being larger than maximumFeeRate etc.
 */
class Psbt {
  constructor(opts = {}, data = new bip174_1.Psbt(new PsbtTransaction())) {
    this.data = data;
    // set defaults
    this.opts = Object.assign({}, DEFAULT_OPTS, opts);
    this.__CACHE = {
      __NON_WITNESS_UTXO_TX_CACHE: [],
      __NON_WITNESS_UTXO_BUF_CACHE: [],
      __TX_IN_CACHE: {},
      __TX: this.data.globalMap.unsignedTx.tx,
    };
    if (this.data.inputs.length === 0) this.setVersion(2);
    // Make data hidden when enumerating
    const dpew = (obj, attr, enumerable, writable) =>
      Object.defineProperty(obj, attr, {
        enumerable,
        writable,
      });
    dpew(this, '__CACHE', false, true);
    dpew(this, 'opts', false, true);
  }
  static fromBase64(data, opts = {}) {
    const buffer = Buffer.from(data, 'base64');
    return this.fromBuffer(buffer, opts);
  }
  static fromHex(data, opts = {}) {
    const buffer = Buffer.from(data, 'hex');
    return this.fromBuffer(buffer, opts);
  }
  static fromBuffer(buffer, opts = {}) {
    const psbtBase = bip174_1.Psbt.fromBuffer(buffer, transactionFromBuffer);
    const psbt = new Psbt(opts, psbtBase);
    checkTxForDupeIns(psbt.__CACHE.__TX, psbt.__CACHE);
    return psbt;
  }
  get inputCount() {
    return this.data.inputs.length;
  }
  combine(...those) {
    this.data.combine(...those.map(o => o.data));
    return this;
  }
  clone() {
    // TODO: more efficient cloning
    const res = Psbt.fromBuffer(this.data.toBuffer());
    res.opts = JSON.parse(JSON.stringify(this.opts));
    return res;
  }
  setMaximumFeeRate(satoshiPerByte) {
    check32Bit(satoshiPerByte); // 42.9 BTC per byte IS excessive... so throw
    this.opts.maximumFeeRate = satoshiPerByte;
  }
  setVersion(version) {
    check32Bit(version);
    checkInputsForPartialSig(this.data.inputs, 'setVersion');
    const c = this.__CACHE;
    c.__TX.version = version;
    c.__EXTRACTED_TX = undefined;
    return this;
  }
  setLocktime(locktime) {
    check32Bit(locktime);
    checkInputsForPartialSig(this.data.inputs, 'setLocktime');
    const c = this.__CACHE;
    c.__TX.locktime = locktime;
    c.__EXTRACTED_TX = undefined;
    return this;
  }
  setInputSequence(inputIndex, sequence) {
    check32Bit(sequence);
    checkInputsForPartialSig(this.data.inputs, 'setInputSequence');
    const c = this.__CACHE;
    if (c.__TX.ins.length <= inputIndex) {
      throw new Error('Input index too high');
    }
    c.__TX.ins[inputIndex].sequence = sequence;
    c.__EXTRACTED_TX = undefined;
    return this;
  }
  addInputs(inputDatas) {
    inputDatas.forEach(inputData => this.addInput(inputData));
    return this;
  }
  addInput(inputData) {
    checkInputsForPartialSig(this.data.inputs, 'addInput');
    const c = this.__CACHE;
    this.data.addInput(inputData);
    const txIn = c.__TX.ins[c.__TX.ins.length - 1];
    checkTxInputCache(c, txIn);
    const inputIndex = this.data.inputs.length - 1;
    const input = this.data.inputs[inputIndex];
    if (input.nonWitnessUtxo) {
      addNonWitnessTxCache(this.__CACHE, input, inputIndex);
    }
    c.__FEE = undefined;
    c.__FEE_RATE = undefined;
    c.__EXTRACTED_TX = undefined;
    return this;
  }
  addOutputs(outputDatas) {
    outputDatas.forEach(outputData => this.addOutput(outputData));
    return this;
  }
  addOutput(outputData) {
    checkInputsForPartialSig(this.data.inputs, 'addOutput');
    const { address } = outputData;
    if (typeof address === 'string') {
      const { network } = this.opts;
      const script = address_1.toOutputScript(address, network);
      outputData = Object.assign(outputData, { script });
    }
    const c = this.__CACHE;
    this.data.addOutput(outputData);
    c.__FEE = undefined;
    c.__FEE_RATE = undefined;
    c.__EXTRACTED_TX = undefined;
    return this;
  }
  extractTransaction(disableFeeCheck) {
    if (!this.data.inputs.every(isFinalized)) throw new Error('Not finalized');
    const c = this.__CACHE;
    if (!disableFeeCheck) {
      checkFees(this, c, this.opts);
    }
    if (c.__EXTRACTED_TX) return c.__EXTRACTED_TX;
    const tx = c.__TX.clone();
    inputFinalizeGetAmts(this.data.inputs, tx, c, true);
    return tx;
  }
  getFeeRate() {
    return getTxCacheValue(
      '__FEE_RATE',
      'fee rate',
      this.data.inputs,
      this.__CACHE,
    );
  }
  getFee() {
    return getTxCacheValue('__FEE', 'fee', this.data.inputs, this.__CACHE);
  }
  finalizeAllInputs() {
    utils_1.checkForInput(this.data.inputs, 0); // making sure we have at least one
    range(this.data.inputs.length).forEach(idx => this.finalizeInput(idx));
    return this;
  }
  finalizeInput(inputIndex) {
    const input = utils_1.checkForInput(this.data.inputs, inputIndex);
    const { script, isP2SH, isP2WSH, isSegwit } = getScriptFromInput(
      inputIndex,
      input,
      this.__CACHE,
    );
    if (!script) throw new Error(`No script found for input #${inputIndex}`);
    const scriptType = classifyScript(script);
    if (!canFinalize(input, script, scriptType))
      throw new Error(`Can not finalize input #${inputIndex}`);
    checkPartialSigSighashes(input);
    const { finalScriptSig, finalScriptWitness } = getFinalScripts(
      script,
      scriptType,
      input.partialSig,
      isSegwit,
      isP2SH,
      isP2WSH,
    );
    if (finalScriptSig) this.data.updateInput(inputIndex, { finalScriptSig });
    if (finalScriptWitness)
      this.data.updateInput(inputIndex, { finalScriptWitness });
    if (!finalScriptSig && !finalScriptWitness)
      throw new Error(`Unknown error finalizing input #${inputIndex}`);
    this.data.clearFinalizedInput(inputIndex);
    return this;
  }
  validateSignaturesOfAllInputs() {
    utils_1.checkForInput(this.data.inputs, 0); // making sure we have at least one
    const results = range(this.data.inputs.length).map(idx =>
      this.validateSignaturesOfInput(idx),
    );
    return results.reduce((final, res) => res === true && final, true);
  }
  validateSignaturesOfInput(inputIndex, pubkey) {
    const input = this.data.inputs[inputIndex];
    const partialSig = (input || {}).partialSig;
    if (!input || !partialSig || partialSig.length < 1)
      throw new Error('No signatures to validate');
    const mySigs = pubkey
      ? partialSig.filter(sig => sig.pubkey.equals(pubkey))
      : partialSig;
    if (mySigs.length < 1) throw new Error('No signatures for this pubkey');
    const results = [];
    let hashCache;
    let scriptCache;
    let sighashCache;
    for (const pSig of mySigs) {
      const sig = bscript.signature.decode(pSig.signature);
      const { hash, script } =
        sighashCache !== sig.hashType
          ? getHashForSig(
              inputIndex,
              Object.assign({}, input, { sighashType: sig.hashType }),
              this.__CACHE,
            )
          : { hash: hashCache, script: scriptCache };
      sighashCache = sig.hashType;
      hashCache = hash;
      scriptCache = script;
      checkScriptForPubkey(pSig.pubkey, script, 'verify');
      const keypair = ecpair_1.fromPublicKey(pSig.pubkey);
      results.push(keypair.verify(hash, sig.signature));
    }
    return results.every(res => res === true);
  }
  signAllInputsHD(
    hdKeyPair,
    sighashTypes = [transaction_1.Transaction.SIGHASH_ALL],
  ) {
    if (!hdKeyPair || !hdKeyPair.publicKey || !hdKeyPair.fingerprint) {
      throw new Error('Need HDSigner to sign input');
    }
    const results = [];
    for (const i of range(this.data.inputs.length)) {
      try {
        this.signInputHD(i, hdKeyPair, sighashTypes);
        results.push(true);
      } catch (err) {
        results.push(false);
      }
    }
    if (results.every(v => v === false)) {
      throw new Error('No inputs were signed');
    }
    return this;
  }
  signAllInputsHDAsync(
    hdKeyPair,
    sighashTypes = [transaction_1.Transaction.SIGHASH_ALL],
  ) {
    return new Promise((resolve, reject) => {
      if (!hdKeyPair || !hdKeyPair.publicKey || !hdKeyPair.fingerprint) {
        return reject(new Error('Need HDSigner to sign input'));
      }
      const results = [];
      const promises = [];
      for (const i of range(this.data.inputs.length)) {
        promises.push(
          this.signInputHDAsync(i, hdKeyPair, sighashTypes).then(
            () => {
              results.push(true);
            },
            () => {
              results.push(false);
            },
          ),
        );
      }
      return Promise.all(promises).then(() => {
        if (results.every(v => v === false)) {
          return reject(new Error('No inputs were signed'));
        }
        resolve();
      });
    });
  }
  signInputHD(
    inputIndex,
    hdKeyPair,
    sighashTypes = [transaction_1.Transaction.SIGHASH_ALL],
  ) {
    if (!hdKeyPair || !hdKeyPair.publicKey || !hdKeyPair.fingerprint) {
      throw new Error('Need HDSigner to sign input');
    }
    const signers = getSignersFromHD(inputIndex, this.data.inputs, hdKeyPair);
    signers.forEach(signer => this.signInput(inputIndex, signer, sighashTypes));
    return this;
  }
  signInputHDAsync(
    inputIndex,
    hdKeyPair,
    sighashTypes = [transaction_1.Transaction.SIGHASH_ALL],
  ) {
    return new Promise((resolve, reject) => {
      if (!hdKeyPair || !hdKeyPair.publicKey || !hdKeyPair.fingerprint) {
        return reject(new Error('Need HDSigner to sign input'));
      }
      const signers = getSignersFromHD(inputIndex, this.data.inputs, hdKeyPair);
      const promises = signers.map(signer =>
        this.signInputAsync(inputIndex, signer, sighashTypes),
      );
      return Promise.all(promises)
        .then(() => {
          resolve();
        })
        .catch(reject);
    });
  }
  signAllInputs(
    keyPair,
    sighashTypes = [transaction_1.Transaction.SIGHASH_ALL],
  ) {
    if (!keyPair || !keyPair.publicKey)
      throw new Error('Need Signer to sign input');
    // TODO: Add a pubkey/pubkeyhash cache to each input
    // as input information is added, then eventually
    // optimize this method.
    const results = [];
    for (const i of range(this.data.inputs.length)) {
      try {
        this.signInput(i, keyPair, sighashTypes);
        results.push(true);
      } catch (err) {
        results.push(false);
      }
    }
    if (results.every(v => v === false)) {
      throw new Error('No inputs were signed');
    }
    return this;
  }
  signAllInputsAsync(
    keyPair,
    sighashTypes = [transaction_1.Transaction.SIGHASH_ALL],
  ) {
    return new Promise((resolve, reject) => {
      if (!keyPair || !keyPair.publicKey)
        return reject(new Error('Need Signer to sign input'));
      // TODO: Add a pubkey/pubkeyhash cache to each input
      // as input information is added, then eventually
      // optimize this method.
      const results = [];
      const promises = [];
      for (const [i] of this.data.inputs.entries()) {
        promises.push(
          this.signInputAsync(i, keyPair, sighashTypes).then(
            () => {
              results.push(true);
            },
            () => {
              results.push(false);
            },
          ),
        );
      }
      return Promise.all(promises).then(() => {
        if (results.every(v => v === false)) {
          return reject(new Error('No inputs were signed'));
        }
        resolve();
      });
    });
  }
  signInput(
    inputIndex,
    keyPair,
    sighashTypes = [transaction_1.Transaction.SIGHASH_ALL],
  ) {
    if (!keyPair || !keyPair.publicKey)
      throw new Error('Need Signer to sign input');
    const { hash, sighashType } = getHashAndSighashType(
      this.data.inputs,
      inputIndex,
      keyPair.publicKey,
      this.__CACHE,
      sighashTypes,
    );
    const partialSig = [
      {
        pubkey: keyPair.publicKey,
        signature: bscript.signature.encode(keyPair.sign(hash), sighashType),
      },
    ];
    this.data.updateInput(inputIndex, { partialSig });
    return this;
  }
  signInputAsync(
    inputIndex,
    keyPair,
    sighashTypes = [transaction_1.Transaction.SIGHASH_ALL],
  ) {
    return new Promise((resolve, reject) => {
      if (!keyPair || !keyPair.publicKey)
        return reject(new Error('Need Signer to sign input'));
      const { hash, sighashType } = getHashAndSighashType(
        this.data.inputs,
        inputIndex,
        keyPair.publicKey,
        this.__CACHE,
        sighashTypes,
      );
      Promise.resolve(keyPair.sign(hash)).then(signature => {
        const partialSig = [
          {
            pubkey: keyPair.publicKey,
            signature: bscript.signature.encode(signature, sighashType),
          },
        ];
        this.data.updateInput(inputIndex, { partialSig });
        resolve();
      });
    });
  }
  toBuffer() {
    return this.data.toBuffer();
  }
  toHex() {
    return this.data.toHex();
  }
  toBase64() {
    return this.data.toBase64();
  }
  updateGlobal(updateData) {
    this.data.updateGlobal(updateData);
    return this;
  }
  updateInput(inputIndex, updateData) {
    this.data.updateInput(inputIndex, updateData);
    if (updateData.nonWitnessUtxo) {
      addNonWitnessTxCache(
        this.__CACHE,
        this.data.inputs[inputIndex],
        inputIndex,
      );
    }
    return this;
  }
  updateOutput(outputIndex, updateData) {
    this.data.updateOutput(outputIndex, updateData);
    return this;
  }
  addUnknownKeyValToGlobal(keyVal) {
    this.data.addUnknownKeyValToGlobal(keyVal);
    return this;
  }
  addUnknownKeyValToInput(inputIndex, keyVal) {
    this.data.addUnknownKeyValToInput(inputIndex, keyVal);
    return this;
  }
  addUnknownKeyValToOutput(outputIndex, keyVal) {
    this.data.addUnknownKeyValToOutput(outputIndex, keyVal);
    return this;
  }
  clearFinalizedInput(inputIndex) {
    this.data.clearFinalizedInput(inputIndex);
    return this;
  }
}
exports.Psbt = Psbt;
/**
 * This function is needed to pass to the bip174 base class's fromBuffer.
 * It takes the "transaction buffer" portion of the psbt buffer and returns a
 * Transaction (From the bip174 library) interface.
 */
const transactionFromBuffer = buffer => new PsbtTransaction(buffer);
/**
 * This class implements the Transaction interface from bip174 library.
 * It contains a bitcoinjs-lib Transaction object.
 */
class PsbtTransaction {
  constructor(buffer = Buffer.from([2, 0, 0, 0, 0, 0, 0, 0, 0, 0])) {
    this.tx = transaction_1.Transaction.fromBuffer(buffer);
    checkTxEmpty(this.tx);
    Object.defineProperty(this, 'tx', {
      enumerable: false,
      writable: true,
    });
  }
  getInputOutputCounts() {
    return {
      inputCount: this.tx.ins.length,
      outputCount: this.tx.outs.length,
    };
  }
  addInput(input) {
    if (
      input.hash === undefined ||
      input.index === undefined ||
      (!Buffer.isBuffer(input.hash) && typeof input.hash !== 'string') ||
      typeof input.index !== 'number'
    ) {
      throw new Error('Error adding input.');
    }
    const hash =
      typeof input.hash === 'string'
        ? bufferutils_1.reverseBuffer(Buffer.from(input.hash, 'hex'))
        : input.hash;
    this.tx.addInput(hash, input.index, input.sequence);
  }
  addOutput(output) {
    if (
      output.script === undefined ||
      output.value === undefined ||
      !Buffer.isBuffer(output.script) ||
      typeof output.value !== 'number'
    ) {
      throw new Error('Error adding output.');
    }
    this.tx.addOutput(output.script, output.value);
  }
  toBuffer() {
    return this.tx.toBuffer();
  }
}
function canFinalize(input, script, scriptType) {
  switch (scriptType) {
    case 'pubkey':
    case 'pubkeyhash':
    case 'witnesspubkeyhash':
      return hasSigs(1, input.partialSig);
    case 'multisig':
      const p2ms = payments.p2ms({ output: script });
      return hasSigs(p2ms.m, input.partialSig);
    default:
      return false;
  }
}
function hasSigs(neededSigs, partialSig) {
  if (!partialSig) return false;
  if (partialSig.length > neededSigs) throw new Error('Too many signatures');
  return partialSig.length === neededSigs;
}
function isFinalized(input) {
  return !!input.finalScriptSig || !!input.finalScriptWitness;
}
function isPaymentFactory(payment) {
  return script => {
    try {
      payment({ output: script });
      return true;
    } catch (err) {
      return false;
    }
  };
}
const isP2MS = isPaymentFactory(payments.p2ms);
const isP2PK = isPaymentFactory(payments.p2pk);
const isP2PKH = isPaymentFactory(payments.p2pkh);
const isP2WPKH = isPaymentFactory(payments.p2wpkh);
const isP2WSHScript = isPaymentFactory(payments.p2wsh);
function check32Bit(num) {
  if (
    typeof num !== 'number' ||
    num !== Math.floor(num) ||
    num > 0xffffffff ||
    num < 0
  ) {
    throw new Error('Invalid 32 bit integer');
  }
}
function checkFees(psbt, cache, opts) {
  const feeRate = cache.__FEE_RATE || psbt.getFeeRate();
  const vsize = cache.__EXTRACTED_TX.virtualSize();
  const satoshis = feeRate * vsize;
  if (feeRate >= opts.maximumFeeRate) {
    throw new Error(
      `Warning: You are paying around ${(satoshis / 1e8).toFixed(8)} in ` +
        `fees, which is ${feeRate} satoshi per byte for a transaction ` +
        `with a VSize of ${vsize} bytes (segwit counted as 0.25 byte per ` +
        `byte). Use setMaximumFeeRate method to raise your threshold, or ` +
        `pass true to the first arg of extractTransaction.`,
    );
  }
}
function checkInputsForPartialSig(inputs, action) {
  inputs.forEach(input => {
    let throws = false;
    let pSigs = [];
    if ((input.partialSig || []).length === 0) {
      if (!input.finalScriptSig && !input.finalScriptWitness) return;
      pSigs = getPsigsFromInputFinalScripts(input);
    } else {
      pSigs = input.partialSig;
    }
    pSigs.forEach(pSig => {
      const { hashType } = bscript.signature.decode(pSig.signature);
      const whitelist = [];
      const isAnyoneCanPay =
        hashType & transaction_1.Transaction.SIGHASH_ANYONECANPAY;
      if (isAnyoneCanPay) whitelist.push('addInput');
      const hashMod = hashType & 0x1f;
      switch (hashMod) {
        case transaction_1.Transaction.SIGHASH_ALL:
          break;
        case transaction_1.Transaction.SIGHASH_SINGLE:
        case transaction_1.Transaction.SIGHASH_NONE:
          whitelist.push('addOutput');
          whitelist.push('setInputSequence');
          break;
      }
      if (whitelist.indexOf(action) === -1) {
        throws = true;
      }
    });
    if (throws) {
      throw new Error('Can not modify transaction, signatures exist.');
    }
  });
}
function checkPartialSigSighashes(input) {
  if (!input.sighashType || !input.partialSig) return;
  const { partialSig, sighashType } = input;
  partialSig.forEach(pSig => {
    const { hashType } = bscript.signature.decode(pSig.signature);
    if (sighashType !== hashType) {
      throw new Error('Signature sighash does not match input sighash type');
    }
  });
}
function checkScriptForPubkey(pubkey, script, action) {
  const pubkeyHash = crypto_1.hash160(pubkey);
  const decompiled = bscript.decompile(script);
  if (decompiled === null) throw new Error('Unknown script error');
  const hasKey = decompiled.some(element => {
    if (typeof element === 'number') return false;
    return element.equals(pubkey) || element.equals(pubkeyHash);
  });
  if (!hasKey) {
    throw new Error(
      `Can not ${action} for this input with the key ${pubkey.toString('hex')}`,
    );
  }
}
function checkTxEmpty(tx) {
  const isEmpty = tx.ins.every(
    input =>
      input.script &&
      input.script.length === 0 &&
      input.witness &&
      input.witness.length === 0,
  );
  if (!isEmpty) {
    throw new Error('Format Error: Transaction ScriptSigs are not empty');
  }
}
function checkTxForDupeIns(tx, cache) {
  tx.ins.forEach(input => {
    checkTxInputCache(cache, input);
  });
}
function checkTxInputCache(cache, input) {
  const key =
    bufferutils_1.reverseBuffer(Buffer.from(input.hash)).toString('hex') +
    ':' +
    input.index;
  if (cache.__TX_IN_CACHE[key]) throw new Error('Duplicate input detected.');
  cache.__TX_IN_CACHE[key] = 1;
}
function scriptCheckerFactory(payment, paymentScriptName) {
  return (inputIndex, scriptPubKey, redeemScript) => {
    const redeemScriptOutput = payment({
      redeem: { output: redeemScript },
    }).output;
    if (!scriptPubKey.equals(redeemScriptOutput)) {
      throw new Error(
        `${paymentScriptName} for input #${inputIndex} doesn't match the scriptPubKey in the prevout`,
      );
    }
  };
}
const checkRedeemScript = scriptCheckerFactory(payments.p2sh, 'Redeem script');
const checkWitnessScript = scriptCheckerFactory(
  payments.p2wsh,
  'Witness script',
);
function getTxCacheValue(key, name, inputs, c) {
  if (!inputs.every(isFinalized))
    throw new Error(`PSBT must be finalized to calculate ${name}`);
  if (key === '__FEE_RATE' && c.__FEE_RATE) return c.__FEE_RATE;
  if (key === '__FEE' && c.__FEE) return c.__FEE;
  let tx;
  let mustFinalize = true;
  if (c.__EXTRACTED_TX) {
    tx = c.__EXTRACTED_TX;
    mustFinalize = false;
  } else {
    tx = c.__TX.clone();
  }
  inputFinalizeGetAmts(inputs, tx, c, mustFinalize);
  if (key === '__FEE_RATE') return c.__FEE_RATE;
  else if (key === '__FEE') return c.__FEE;
}
function getFinalScripts(
  script,
  scriptType,
  partialSig,
  isSegwit,
  isP2SH,
  isP2WSH,
) {
  let finalScriptSig;
  let finalScriptWitness;
  // Wow, the payments API is very handy
  const payment = getPayment(script, scriptType, partialSig);
  const p2wsh = !isP2WSH ? null : payments.p2wsh({ redeem: payment });
  const p2sh = !isP2SH ? null : payments.p2sh({ redeem: p2wsh || payment });
  if (isSegwit) {
    if (p2wsh) {
      finalScriptWitness = witnessStackToScriptWitness(p2wsh.witness);
    } else {
      finalScriptWitness = witnessStackToScriptWitness(payment.witness);
    }
    if (p2sh) {
      finalScriptSig = p2sh.input;
    }
  } else {
    if (p2sh) {
      finalScriptSig = p2sh.input;
    } else {
      finalScriptSig = payment.input;
    }
  }
  return {
    finalScriptSig,
    finalScriptWitness,
  };
}
function getHashAndSighashType(
  inputs,
  inputIndex,
  pubkey,
  cache,
  sighashTypes,
) {
  const input = utils_1.checkForInput(inputs, inputIndex);
  const { hash, sighashType, script } = getHashForSig(
    inputIndex,
    input,
    cache,
    sighashTypes,
  );
  checkScriptForPubkey(pubkey, script, 'sign');
  return {
    hash,
    sighashType,
  };
}
function getHashForSig(inputIndex, input, cache, sighashTypes) {
  const unsignedTx = cache.__TX;
  const sighashType =
    input.sighashType || transaction_1.Transaction.SIGHASH_ALL;
  if (sighashTypes && sighashTypes.indexOf(sighashType) < 0) {
    const str = sighashTypeToString(sighashType);
    throw new Error(
      `Sighash type is not allowed. Retry the sign method passing the ` +
        `sighashTypes array of whitelisted types. Sighash type: ${str}`,
    );
  }
  let hash;
  let script;
  if (input.nonWitnessUtxo) {
    const nonWitnessUtxoTx = nonWitnessUtxoTxFromCache(
      cache,
      input,
      inputIndex,
    );
    const prevoutHash = unsignedTx.ins[inputIndex].hash;
    const utxoHash = nonWitnessUtxoTx.getHash();
    // If a non-witness UTXO is provided, its hash must match the hash specified in the prevout
    if (!prevoutHash.equals(utxoHash)) {
      throw new Error(
        `Non-witness UTXO hash for input #${inputIndex} doesn't match the hash specified in the prevout`,
      );
    }
    const prevoutIndex = unsignedTx.ins[inputIndex].index;
    const prevout = nonWitnessUtxoTx.outs[prevoutIndex];
    if (input.redeemScript) {
      // If a redeemScript is provided, the scriptPubKey must be for that redeemScript
      checkRedeemScript(inputIndex, prevout.script, input.redeemScript);
      script = input.redeemScript;
    } else {
      script = prevout.script;
    }
    if (isP2WSHScript(script)) {
      if (!input.witnessScript)
        throw new Error('Segwit input needs witnessScript if not P2WPKH');
      checkWitnessScript(inputIndex, script, input.witnessScript);
      hash = unsignedTx.hashForWitnessV0(
        inputIndex,
        input.witnessScript,
        prevout.value,
        sighashType,
      );
      script = input.witnessScript;
    } else if (isP2WPKH(script)) {
      // P2WPKH uses the P2PKH template for prevoutScript when signing
      const signingScript = payments.p2pkh({ hash: script.slice(2) }).output;
      hash = unsignedTx.hashForWitnessV0(
        inputIndex,
        signingScript,
        prevout.value,
        sighashType,
      );
    } else {
      hash = unsignedTx.hashForSignature(inputIndex, script, sighashType);
    }
  } else if (input.witnessUtxo) {
    let _script; // so we don't shadow the `let script` above
    if (input.redeemScript) {
      // If a redeemScript is provided, the scriptPubKey must be for that redeemScript
      checkRedeemScript(
        inputIndex,
        input.witnessUtxo.script,
        input.redeemScript,
      );
      _script = input.redeemScript;
    } else {
      _script = input.witnessUtxo.script;
    }
    if (isP2WPKH(_script)) {
      // P2WPKH uses the P2PKH template for prevoutScript when signing
      const signingScript = payments.p2pkh({ hash: _script.slice(2) }).output;
      hash = unsignedTx.hashForWitnessV0(
        inputIndex,
        signingScript,
        input.witnessUtxo.value,
        sighashType,
      );
      script = _script;
    } else if (isP2WSHScript(_script)) {
      if (!input.witnessScript)
        throw new Error('Segwit input needs witnessScript if not P2WPKH');
      checkWitnessScript(inputIndex, _script, input.witnessScript);
      hash = unsignedTx.hashForWitnessV0(
        inputIndex,
        input.witnessScript,
        input.witnessUtxo.value,
        sighashType,
      );
      // want to make sure the script we return is the actual meaningful script
      script = input.witnessScript;
    } else {
      throw new Error(
        `Input #${inputIndex} has witnessUtxo but non-segwit script: ` +
          `${_script.toString('hex')}`,
      );
    }
  } else {
    throw new Error('Need a Utxo input item for signing');
  }
  return {
    script,
    sighashType,
    hash,
  };
}
function getPayment(script, scriptType, partialSig) {
  let payment;
  switch (scriptType) {
    case 'multisig':
      const sigs = getSortedSigs(script, partialSig);
      payment = payments.p2ms({
        output: script,
        signatures: sigs,
      });
      break;
    case 'pubkey':
      payment = payments.p2pk({
        output: script,
        signature: partialSig[0].signature,
      });
      break;
    case 'pubkeyhash':
      payment = payments.p2pkh({
        output: script,
        pubkey: partialSig[0].pubkey,
        signature: partialSig[0].signature,
      });
      break;
    case 'witnesspubkeyhash':
      payment = payments.p2wpkh({
        output: script,
        pubkey: partialSig[0].pubkey,
        signature: partialSig[0].signature,
      });
      break;
  }
  return payment;
}
function getPsigsFromInputFinalScripts(input) {
  const scriptItems = !input.finalScriptSig
    ? []
    : bscript.decompile(input.finalScriptSig) || [];
  const witnessItems = !input.finalScriptWitness
    ? []
    : bscript.decompile(input.finalScriptWitness) || [];
  return scriptItems
    .concat(witnessItems)
    .filter(item => {
      return Buffer.isBuffer(item) && bscript.isCanonicalScriptSignature(item);
    })
    .map(sig => ({ signature: sig }));
}
function getScriptFromInput(inputIndex, input, cache) {
  const unsignedTx = cache.__TX;
  const res = {
    script: null,
    isSegwit: false,
    isP2SH: false,
    isP2WSH: false,
  };
  res.isP2SH = !!input.redeemScript;
  res.isP2WSH = !!input.witnessScript;
  if (input.witnessScript) {
    res.script = input.witnessScript;
  } else if (input.redeemScript) {
    res.script = input.redeemScript;
  } else {
    if (input.nonWitnessUtxo) {
      const nonWitnessUtxoTx = nonWitnessUtxoTxFromCache(
        cache,
        input,
        inputIndex,
      );
      const prevoutIndex = unsignedTx.ins[inputIndex].index;
      res.script = nonWitnessUtxoTx.outs[prevoutIndex].script;
    } else if (input.witnessUtxo) {
      res.script = input.witnessUtxo.script;
    }
  }
  if (input.witnessScript || isP2WPKH(res.script)) {
    res.isSegwit = true;
  }
  return res;
}
function getSignersFromHD(inputIndex, inputs, hdKeyPair) {
  const input = utils_1.checkForInput(inputs, inputIndex);
  if (!input.bip32Derivation || input.bip32Derivation.length === 0) {
    throw new Error('Need bip32Derivation to sign with HD');
  }
  const myDerivations = input.bip32Derivation
    .map(bipDv => {
      if (bipDv.masterFingerprint.equals(hdKeyPair.fingerprint)) {
        return bipDv;
      } else {
        return;
      }
    })
    .filter(v => !!v);
  if (myDerivations.length === 0) {
    throw new Error(
      'Need one bip32Derivation masterFingerprint to match the HDSigner fingerprint',
    );
  }
  const signers = myDerivations.map(bipDv => {
    const node = hdKeyPair.derivePath(bipDv.path);
    if (!bipDv.pubkey.equals(node.publicKey)) {
      throw new Error('pubkey did not match bip32Derivation');
    }
    return node;
  });
  return signers;
}
function getSortedSigs(script, partialSig) {
  const p2ms = payments.p2ms({ output: script });
  // for each pubkey in order of p2ms script
  return p2ms.pubkeys
    .map(pk => {
      // filter partialSig array by pubkey being equal
      return (
        partialSig.filter(ps => {
          return ps.pubkey.equals(pk);
        })[0] || {}
      ).signature;
      // Any pubkey without a match will return undefined
      // this last filter removes all the undefined items in the array.
    })
    .filter(v => !!v);
}
function scriptWitnessToWitnessStack(buffer) {
  let offset = 0;
  function readSlice(n) {
    offset += n;
    return buffer.slice(offset - n, offset);
  }
  function readVarInt() {
    const vi = varuint.decode(buffer, offset);
    offset += varuint.decode.bytes;
    return vi;
  }
  function readVarSlice() {
    return readSlice(readVarInt());
  }
  function readVector() {
    const count = readVarInt();
    const vector = [];
    for (let i = 0; i < count; i++) vector.push(readVarSlice());
    return vector;
  }
  return readVector();
}
function sighashTypeToString(sighashType) {
  let text =
    sighashType & transaction_1.Transaction.SIGHASH_ANYONECANPAY
      ? 'SIGHASH_ANYONECANPAY | '
      : '';
  const sigMod = sighashType & 0x1f;
  switch (sigMod) {
    case transaction_1.Transaction.SIGHASH_ALL:
      text += 'SIGHASH_ALL';
      break;
    case transaction_1.Transaction.SIGHASH_SINGLE:
      text += 'SIGHASH_SINGLE';
      break;
    case transaction_1.Transaction.SIGHASH_NONE:
      text += 'SIGHASH_NONE';
      break;
  }
  return text;
}
function witnessStackToScriptWitness(witness) {
  let buffer = Buffer.allocUnsafe(0);
  function writeSlice(slice) {
    buffer = Buffer.concat([buffer, Buffer.from(slice)]);
  }
  function writeVarInt(i) {
    const currentLen = buffer.length;
    const varintLen = varuint.encodingLength(i);
    buffer = Buffer.concat([buffer, Buffer.allocUnsafe(varintLen)]);
    varuint.encode(i, buffer, currentLen);
  }
  function writeVarSlice(slice) {
    writeVarInt(slice.length);
    writeSlice(slice);
  }
  function writeVector(vector) {
    writeVarInt(vector.length);
    vector.forEach(writeVarSlice);
  }
  writeVector(witness);
  return buffer;
}
function addNonWitnessTxCache(cache, input, inputIndex) {
  cache.__NON_WITNESS_UTXO_BUF_CACHE[inputIndex] = input.nonWitnessUtxo;
  const tx = transaction_1.Transaction.fromBuffer(input.nonWitnessUtxo);
  cache.__NON_WITNESS_UTXO_TX_CACHE[inputIndex] = tx;
  const self = cache;
  const selfIndex = inputIndex;
  delete input.nonWitnessUtxo;
  Object.defineProperty(input, 'nonWitnessUtxo', {
    enumerable: true,
    get() {
      const buf = self.__NON_WITNESS_UTXO_BUF_CACHE[selfIndex];
      const txCache = self.__NON_WITNESS_UTXO_TX_CACHE[selfIndex];
      if (buf !== undefined) {
        return buf;
      } else {
        const newBuf = txCache.toBuffer();
        self.__NON_WITNESS_UTXO_BUF_CACHE[selfIndex] = newBuf;
        return newBuf;
      }
    },
    set(data) {
      self.__NON_WITNESS_UTXO_BUF_CACHE[selfIndex] = data;
    },
  });
}
function inputFinalizeGetAmts(inputs, tx, cache, mustFinalize) {
  let inputAmount = 0;
  inputs.forEach((input, idx) => {
    if (mustFinalize && input.finalScriptSig)
      tx.ins[idx].script = input.finalScriptSig;
    if (mustFinalize && input.finalScriptWitness) {
      tx.ins[idx].witness = scriptWitnessToWitnessStack(
        input.finalScriptWitness,
      );
    }
    if (input.witnessUtxo) {
      inputAmount += input.witnessUtxo.value;
    } else if (input.nonWitnessUtxo) {
      const nwTx = nonWitnessUtxoTxFromCache(cache, input, idx);
      const vout = tx.ins[idx].index;
      const out = nwTx.outs[vout];
      inputAmount += out.value;
    }
  });
  const outputAmount = tx.outs.reduce((total, o) => total + o.value, 0);
  const fee = inputAmount - outputAmount;
  if (fee < 0) {
    throw new Error('Outputs are spending more than Inputs');
  }
  const bytes = tx.virtualSize();
  cache.__FEE = fee;
  cache.__EXTRACTED_TX = tx;
  cache.__FEE_RATE = Math.floor(fee / bytes);
}
function nonWitnessUtxoTxFromCache(cache, input, inputIndex) {
  const c = cache.__NON_WITNESS_UTXO_TX_CACHE;
  if (!c[inputIndex]) {
    addNonWitnessTxCache(cache, input, inputIndex);
  }
  return c[inputIndex];
}
function classifyScript(script) {
  if (isP2WPKH(script)) return 'witnesspubkeyhash';
  if (isP2PKH(script)) return 'pubkeyhash';
  if (isP2MS(script)) return 'multisig';
  if (isP2PK(script)) return 'pubkey';
  return 'nonstandard';
}
function range(n) {
  return [...Array(n).keys()];
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "SqU0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, '__esModule', { value: true });
const input = __webpack_require__("WkSN");
exports.input = input;
const output = __webpack_require__("YgBC");
exports.output = output;


/***/ }),

/***/ "SsB5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, '__esModule', { value: true });
// OP_RETURN {data}
const bscript = __webpack_require__("O5DG");
const OPS = bscript.OPS;
function check(script) {
  const buffer = bscript.compile(script);
  return buffer.length > 1 && buffer[0] === OPS.OP_RETURN;
}
exports.check = check;
check.toJSON = () => {
  return 'null data output';
};
const output = { check };
exports.output = output;


/***/ }),

/***/ "TJSY":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// OP_0 {pubKeyHash}
Object.defineProperty(exports, '__esModule', { value: true });
const bscript = __webpack_require__("O5DG");
const script_1 = __webpack_require__("O5DG");
function check(script) {
  const buffer = bscript.compile(script);
  return (
    buffer.length === 22 &&
    buffer[0] === script_1.OPS.OP_0 &&
    buffer[1] === 0x14
  );
}
exports.check = check;
check.toJSON = () => {
  return 'Witness pubKeyHash output';
};


/***/ }),

/***/ "W89i":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, '__esModule', { value: true });
const networks_1 = __webpack_require__("A6N3");
const bscript = __webpack_require__("O5DG");
const lazy = __webpack_require__("XKyx");
const typef = __webpack_require__("d+zW");
const OPS = bscript.OPS;
function stacksEqual(a, b) {
  if (a.length !== b.length) return false;
  return a.every((x, i) => {
    return x.equals(b[i]);
  });
}
// output: OP_RETURN ...
function p2data(a, opts) {
  if (!a.data && !a.output) throw new TypeError('Not enough data');
  opts = Object.assign({ validate: true }, opts || {});
  typef(
    {
      network: typef.maybe(typef.Object),
      output: typef.maybe(typef.Buffer),
      data: typef.maybe(typef.arrayOf(typef.Buffer)),
    },
    a,
  );
  const network = a.network || networks_1.bitcoin;
  const o = { name: 'embed', network };
  lazy.prop(o, 'output', () => {
    if (!a.data) return;
    return bscript.compile([OPS.OP_RETURN].concat(a.data));
  });
  lazy.prop(o, 'data', () => {
    if (!a.output) return;
    return bscript.decompile(a.output).slice(1);
  });
  // extended validation
  if (opts.validate) {
    if (a.output) {
      const chunks = bscript.decompile(a.output);
      if (chunks[0] !== OPS.OP_RETURN) throw new TypeError('Output is invalid');
      if (!chunks.slice(1).every(typef.Buffer))
        throw new TypeError('Output is invalid');
      if (a.data && !stacksEqual(a.data, o.data))
        throw new TypeError('Data mismatch');
    }
  }
  return Object.assign(o, a);
}
exports.p2data = p2data;


/***/ }),

/***/ "WdoV":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, '__esModule', { value: true });
const bip32 = __webpack_require__("sHUq");
exports.bip32 = bip32;
const address = __webpack_require__("lMJ2");
exports.address = address;
const crypto = __webpack_require__("lin5");
exports.crypto = crypto;
const ECPair = __webpack_require__("IiU8");
exports.ECPair = ECPair;
const networks = __webpack_require__("A6N3");
exports.networks = networks;
const payments = __webpack_require__("iRDL");
exports.payments = payments;
const script = __webpack_require__("O5DG");
exports.script = script;
var block_1 = __webpack_require__("QDNB");
exports.Block = block_1.Block;
var psbt_1 = __webpack_require__("Re6D");
exports.Psbt = psbt_1.Psbt;
var script_1 = __webpack_require__("O5DG");
exports.opcodes = script_1.OPS;
var transaction_1 = __webpack_require__("NPSo");
exports.Transaction = transaction_1.Transaction;
var transaction_builder_1 = __webpack_require__("yRTm");
exports.TransactionBuilder = transaction_builder_1.TransactionBuilder;


/***/ }),

/***/ "WkSN":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// {signature} {pubKey}
Object.defineProperty(exports, '__esModule', { value: true });
const bscript = __webpack_require__("O5DG");
function check(script) {
  const chunks = bscript.decompile(script);
  return (
    chunks.length === 2 &&
    bscript.isCanonicalScriptSignature(chunks[0]) &&
    bscript.isCanonicalPubKey(chunks[1])
  );
}
exports.check = check;
check.toJSON = () => {
  return 'pubKeyHash input';
};


/***/ }),

/***/ "XKyx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, '__esModule', { value: true });
function prop(object, name, f) {
  Object.defineProperty(object, name, {
    configurable: true,
    enumerable: true,
    get() {
      const _value = f.call(this);
      this[name] = _value;
      return _value;
    },
    set(_value) {
      Object.defineProperty(this, name, {
        configurable: true,
        enumerable: true,
        value: _value,
        writable: true,
      });
    },
  });
}
exports.prop = prop;
function value(f) {
  let _value;
  return () => {
    if (_value !== undefined) return _value;
    _value = f();
    return _value;
  };
}
exports.value = value;


/***/ }),

/***/ "YgBC":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// OP_DUP OP_HASH160 {pubKeyHash} OP_EQUALVERIFY OP_CHECKSIG
Object.defineProperty(exports, '__esModule', { value: true });
const bscript = __webpack_require__("O5DG");
const script_1 = __webpack_require__("O5DG");
function check(script) {
  const buffer = bscript.compile(script);
  return (
    buffer.length === 25 &&
    buffer[0] === script_1.OPS.OP_DUP &&
    buffer[1] === script_1.OPS.OP_HASH160 &&
    buffer[2] === 0x14 &&
    buffer[23] === script_1.OPS.OP_EQUALVERIFY &&
    buffer[24] === script_1.OPS.OP_CHECKSIG
  );
}
exports.check = check;
check.toJSON = () => {
  return 'pubKeyHash output';
};


/***/ }),

/***/ "YkUL":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// OP_0 [signatures ...]
Object.defineProperty(exports, '__esModule', { value: true });
const bscript = __webpack_require__("O5DG");
const script_1 = __webpack_require__("O5DG");
function partialSignature(value) {
  return (
    value === script_1.OPS.OP_0 || bscript.isCanonicalScriptSignature(value)
  );
}
function check(script, allowIncomplete) {
  const chunks = bscript.decompile(script);
  if (chunks.length < 2) return false;
  if (chunks[0] !== script_1.OPS.OP_0) return false;
  if (allowIncomplete) {
    return chunks.slice(1).every(partialSignature);
  }
  return chunks.slice(1).every(bscript.isCanonicalScriptSignature);
}
exports.check = check;
check.toJSON = () => {
  return 'multisig input';
};


/***/ }),

/***/ "YxaY":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
// <scriptSig> {serialized scriptPubKey script}
Object.defineProperty(exports, '__esModule', { value: true });
const bscript = __webpack_require__("O5DG");
const p2ms = __webpack_require__("xmXb");
const p2pk = __webpack_require__("bEv/");
const p2pkh = __webpack_require__("SqU0");
const p2wpkho = __webpack_require__("TJSY");
const p2wsho = __webpack_require__("cZz8");
function check(script, allowIncomplete) {
  const chunks = bscript.decompile(script);
  if (chunks.length < 1) return false;
  const lastChunk = chunks[chunks.length - 1];
  if (!Buffer.isBuffer(lastChunk)) return false;
  const scriptSigChunks = bscript.decompile(
    bscript.compile(chunks.slice(0, -1)),
  );
  const redeemScriptChunks = bscript.decompile(lastChunk);
  // is redeemScript a valid script?
  if (!redeemScriptChunks) return false;
  // is redeemScriptSig push only?
  if (!bscript.isPushOnly(scriptSigChunks)) return false;
  // is witness?
  if (chunks.length === 1) {
    return (
      p2wsho.check(redeemScriptChunks) || p2wpkho.check(redeemScriptChunks)
    );
  }
  // match types
  if (
    p2pkh.input.check(scriptSigChunks) &&
    p2pkh.output.check(redeemScriptChunks)
  )
    return true;
  if (
    p2ms.input.check(scriptSigChunks, allowIncomplete) &&
    p2ms.output.check(redeemScriptChunks)
  )
    return true;
  if (
    p2pk.input.check(scriptSigChunks) &&
    p2pk.output.check(redeemScriptChunks)
  )
    return true;
  return false;
}
exports.check = check;
check.toJSON = () => {
  return 'scriptHash input';
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "bEv/":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, '__esModule', { value: true });
const input = __webpack_require__("I/fK");
exports.input = input;
const output = __webpack_require__("Nw9z");
exports.output = output;


/***/ }),

/***/ "cZz8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// OP_0 {scriptHash}
Object.defineProperty(exports, '__esModule', { value: true });
const bscript = __webpack_require__("O5DG");
const script_1 = __webpack_require__("O5DG");
function check(script) {
  const buffer = bscript.compile(script);
  return (
    buffer.length === 34 &&
    buffer[0] === script_1.OPS.OP_0 &&
    buffer[1] === 0x20
  );
}
exports.check = check;
check.toJSON = () => {
  return 'Witness scriptHash output';
};


/***/ }),

/***/ "dfgu":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
Object.defineProperty(exports, '__esModule', { value: true });
function decode(buffer, maxLength, minimal) {
  maxLength = maxLength || 4;
  minimal = minimal === undefined ? true : minimal;
  const length = buffer.length;
  if (length === 0) return 0;
  if (length > maxLength) throw new TypeError('Script number overflow');
  if (minimal) {
    if ((buffer[length - 1] & 0x7f) === 0) {
      if (length <= 1 || (buffer[length - 2] & 0x80) === 0)
        throw new Error('Non-minimally encoded script number');
    }
  }
  // 40-bit
  if (length === 5) {
    const a = buffer.readUInt32LE(0);
    const b = buffer.readUInt8(4);
    if (b & 0x80) return -((b & ~0x80) * 0x100000000 + a);
    return b * 0x100000000 + a;
  }
  // 32-bit / 24-bit / 16-bit / 8-bit
  let result = 0;
  for (let i = 0; i < length; ++i) {
    result |= buffer[i] << (8 * i);
  }
  if (buffer[length - 1] & 0x80)
    return -(result & ~(0x80 << (8 * (length - 1))));
  return result;
}
exports.decode = decode;
function scriptNumSize(i) {
  return i > 0x7fffffff
    ? 5
    : i > 0x7fffff
    ? 4
    : i > 0x7fff
    ? 3
    : i > 0x7f
    ? 2
    : i > 0x00
    ? 1
    : 0;
}
function encode(_number) {
  let value = Math.abs(_number);
  const size = scriptNumSize(value);
  const buffer = Buffer.allocUnsafe(size);
  const negative = _number < 0;
  for (let i = 0; i < size; ++i) {
    buffer.writeUInt8(value & 0xff, i);
    value >>= 8;
  }
  if (buffer[size - 1] & 0x80) {
    buffer.writeUInt8(negative ? 0x80 : 0x00, size - 1);
  } else if (negative) {
    buffer[size - 1] |= 0x80;
  }
  return buffer;
}
exports.encode = encode;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "iRDL":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, '__esModule', { value: true });
const embed_1 = __webpack_require__("W89i");
exports.embed = embed_1.p2data;
const p2ms_1 = __webpack_require__("Is0A");
exports.p2ms = p2ms_1.p2ms;
const p2pk_1 = __webpack_require__("vsEA");
exports.p2pk = p2pk_1.p2pk;
const p2pkh_1 = __webpack_require__("rLNA");
exports.p2pkh = p2pkh_1.p2pkh;
const p2sh_1 = __webpack_require__("xLoW");
exports.p2sh = p2sh_1.p2sh;
const p2wpkh_1 = __webpack_require__("8GU6");
exports.p2wpkh = p2wpkh_1.p2wpkh;
const p2wsh_1 = __webpack_require__("lEHy");
exports.p2wsh = p2wsh_1.p2wsh;
// TODO
// witness commitment


/***/ }),

/***/ "lEHy":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
Object.defineProperty(exports, '__esModule', { value: true });
const bcrypto = __webpack_require__("lin5");
const networks_1 = __webpack_require__("A6N3");
const bscript = __webpack_require__("O5DG");
const lazy = __webpack_require__("XKyx");
const typef = __webpack_require__("d+zW");
const OPS = bscript.OPS;
const bech32 = __webpack_require__("vyt/");
const EMPTY_BUFFER = Buffer.alloc(0);
function stacksEqual(a, b) {
  if (a.length !== b.length) return false;
  return a.every((x, i) => {
    return x.equals(b[i]);
  });
}
// input: <>
// witness: [redeemScriptSig ...] {redeemScript}
// output: OP_0 {sha256(redeemScript)}
function p2wsh(a, opts) {
  if (!a.address && !a.hash && !a.output && !a.redeem && !a.witness)
    throw new TypeError('Not enough data');
  opts = Object.assign({ validate: true }, opts || {});
  typef(
    {
      network: typef.maybe(typef.Object),
      address: typef.maybe(typef.String),
      hash: typef.maybe(typef.BufferN(32)),
      output: typef.maybe(typef.BufferN(34)),
      redeem: typef.maybe({
        input: typef.maybe(typef.Buffer),
        network: typef.maybe(typef.Object),
        output: typef.maybe(typef.Buffer),
        witness: typef.maybe(typef.arrayOf(typef.Buffer)),
      }),
      input: typef.maybe(typef.BufferN(0)),
      witness: typef.maybe(typef.arrayOf(typef.Buffer)),
    },
    a,
  );
  const _address = lazy.value(() => {
    const result = bech32.decode(a.address);
    const version = result.words.shift();
    const data = bech32.fromWords(result.words);
    return {
      version,
      prefix: result.prefix,
      data: Buffer.from(data),
    };
  });
  const _rchunks = lazy.value(() => {
    return bscript.decompile(a.redeem.input);
  });
  let network = a.network;
  if (!network) {
    network = (a.redeem && a.redeem.network) || networks_1.bitcoin;
  }
  const o = { network };
  lazy.prop(o, 'address', () => {
    if (!o.hash) return;
    const words = bech32.toWords(o.hash);
    words.unshift(0x00);
    return bech32.encode(network.bech32, words);
  });
  lazy.prop(o, 'hash', () => {
    if (a.output) return a.output.slice(2);
    if (a.address) return _address().data;
    if (o.redeem && o.redeem.output) return bcrypto.sha256(o.redeem.output);
  });
  lazy.prop(o, 'output', () => {
    if (!o.hash) return;
    return bscript.compile([OPS.OP_0, o.hash]);
  });
  lazy.prop(o, 'redeem', () => {
    if (!a.witness) return;
    return {
      output: a.witness[a.witness.length - 1],
      input: EMPTY_BUFFER,
      witness: a.witness.slice(0, -1),
    };
  });
  lazy.prop(o, 'input', () => {
    if (!o.witness) return;
    return EMPTY_BUFFER;
  });
  lazy.prop(o, 'witness', () => {
    // transform redeem input to witness stack?
    if (
      a.redeem &&
      a.redeem.input &&
      a.redeem.input.length > 0 &&
      a.redeem.output &&
      a.redeem.output.length > 0
    ) {
      const stack = bscript.toStack(_rchunks());
      // assign, and blank the existing input
      o.redeem = Object.assign({ witness: stack }, a.redeem);
      o.redeem.input = EMPTY_BUFFER;
      return [].concat(stack, a.redeem.output);
    }
    if (!a.redeem) return;
    if (!a.redeem.output) return;
    if (!a.redeem.witness) return;
    return [].concat(a.redeem.witness, a.redeem.output);
  });
  lazy.prop(o, 'name', () => {
    const nameParts = ['p2wsh'];
    if (o.redeem !== undefined) nameParts.push(o.redeem.name);
    return nameParts.join('-');
  });
  // extended validation
  if (opts.validate) {
    let hash = Buffer.from([]);
    if (a.address) {
      if (_address().prefix !== network.bech32)
        throw new TypeError('Invalid prefix or Network mismatch');
      if (_address().version !== 0x00)
        throw new TypeError('Invalid address version');
      if (_address().data.length !== 32)
        throw new TypeError('Invalid address data');
      hash = _address().data;
    }
    if (a.hash) {
      if (hash.length > 0 && !hash.equals(a.hash))
        throw new TypeError('Hash mismatch');
      else hash = a.hash;
    }
    if (a.output) {
      if (
        a.output.length !== 34 ||
        a.output[0] !== OPS.OP_0 ||
        a.output[1] !== 0x20
      )
        throw new TypeError('Output is invalid');
      const hash2 = a.output.slice(2);
      if (hash.length > 0 && !hash.equals(hash2))
        throw new TypeError('Hash mismatch');
      else hash = hash2;
    }
    if (a.redeem) {
      if (a.redeem.network && a.redeem.network !== network)
        throw new TypeError('Network mismatch');
      // is there two redeem sources?
      if (
        a.redeem.input &&
        a.redeem.input.length > 0 &&
        a.redeem.witness &&
        a.redeem.witness.length > 0
      )
        throw new TypeError('Ambiguous witness source');
      // is the redeem output non-empty?
      if (a.redeem.output) {
        if (bscript.decompile(a.redeem.output).length === 0)
          throw new TypeError('Redeem.output is invalid');
        // match hash against other sources
        const hash2 = bcrypto.sha256(a.redeem.output);
        if (hash.length > 0 && !hash.equals(hash2))
          throw new TypeError('Hash mismatch');
        else hash = hash2;
      }
      if (a.redeem.input && !bscript.isPushOnly(_rchunks()))
        throw new TypeError('Non push-only scriptSig');
      if (
        a.witness &&
        a.redeem.witness &&
        !stacksEqual(a.witness, a.redeem.witness)
      )
        throw new TypeError('Witness and redeem.witness mismatch');
    }
    if (a.witness) {
      if (
        a.redeem &&
        a.redeem.output &&
        !a.redeem.output.equals(a.witness[a.witness.length - 1])
      )
        throw new TypeError('Witness and redeem.output mismatch');
    }
  }
  return Object.assign(o, a);
}
exports.p2wsh = p2wsh;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "lMJ2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
Object.defineProperty(exports, '__esModule', { value: true });
const networks = __webpack_require__("A6N3");
const payments = __webpack_require__("iRDL");
const bscript = __webpack_require__("O5DG");
const types = __webpack_require__("wmJG");
const bech32 = __webpack_require__("vyt/");
const bs58check = __webpack_require__("b3gk");
const typeforce = __webpack_require__("d+zW");
function fromBase58Check(address) {
  const payload = bs58check.decode(address);
  // TODO: 4.0.0, move to "toOutputScript"
  if (payload.length < 21) throw new TypeError(address + ' is too short');
  if (payload.length > 21) throw new TypeError(address + ' is too long');
  const version = payload.readUInt8(0);
  const hash = payload.slice(1);
  return { version, hash };
}
exports.fromBase58Check = fromBase58Check;
function fromBech32(address) {
  const result = bech32.decode(address);
  const data = bech32.fromWords(result.words.slice(1));
  return {
    version: result.words[0],
    prefix: result.prefix,
    data: Buffer.from(data),
  };
}
exports.fromBech32 = fromBech32;
function toBase58Check(hash, version) {
  typeforce(types.tuple(types.Hash160bit, types.UInt8), arguments);
  const payload = Buffer.allocUnsafe(21);
  payload.writeUInt8(version, 0);
  hash.copy(payload, 1);
  return bs58check.encode(payload);
}
exports.toBase58Check = toBase58Check;
function toBech32(data, version, prefix) {
  const words = bech32.toWords(data);
  words.unshift(version);
  return bech32.encode(prefix, words);
}
exports.toBech32 = toBech32;
function fromOutputScript(output, network) {
  // TODO: Network
  network = network || networks.bitcoin;
  try {
    return payments.p2pkh({ output, network }).address;
  } catch (e) {}
  try {
    return payments.p2sh({ output, network }).address;
  } catch (e) {}
  try {
    return payments.p2wpkh({ output, network }).address;
  } catch (e) {}
  try {
    return payments.p2wsh({ output, network }).address;
  } catch (e) {}
  throw new Error(bscript.toASM(output) + ' has no matching Address');
}
exports.fromOutputScript = fromOutputScript;
function toOutputScript(address, network) {
  network = network || networks.bitcoin;
  let decodeBase58;
  let decodeBech32;
  try {
    decodeBase58 = fromBase58Check(address);
  } catch (e) {}
  if (decodeBase58) {
    if (decodeBase58.version === network.pubKeyHash)
      return payments.p2pkh({ hash: decodeBase58.hash }).output;
    if (decodeBase58.version === network.scriptHash)
      return payments.p2sh({ hash: decodeBase58.hash }).output;
  } else {
    try {
      decodeBech32 = fromBech32(address);
    } catch (e) {}
    if (decodeBech32) {
      if (decodeBech32.prefix !== network.bech32)
        throw new Error(address + ' has an invalid prefix');
      if (decodeBech32.version === 0) {
        if (decodeBech32.data.length === 20)
          return payments.p2wpkh({ hash: decodeBech32.data }).output;
        if (decodeBech32.data.length === 32)
          return payments.p2wsh({ hash: decodeBech32.data }).output;
      }
    }
  }
  throw new Error(address + ' has no matching Script');
}
exports.toOutputScript = toOutputScript;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "lin5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, '__esModule', { value: true });
const createHash = __webpack_require__("mObS");
function ripemd160(buffer) {
  try {
    return createHash('rmd160')
      .update(buffer)
      .digest();
  } catch (err) {
    return createHash('ripemd160')
      .update(buffer)
      .digest();
  }
}
exports.ripemd160 = ripemd160;
function sha1(buffer) {
  return createHash('sha1')
    .update(buffer)
    .digest();
}
exports.sha1 = sha1;
function sha256(buffer) {
  return createHash('sha256')
    .update(buffer)
    .digest();
}
exports.sha256 = sha256;
function hash160(buffer) {
  return ripemd160(sha256(buffer));
}
exports.hash160 = hash160;
function hash256(buffer) {
  return sha256(sha256(buffer));
}
exports.hash256 = hash256;


/***/ }),

/***/ "mBxT":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// OP_HASH160 {scriptHash} OP_EQUAL
Object.defineProperty(exports, '__esModule', { value: true });
const bscript = __webpack_require__("O5DG");
const script_1 = __webpack_require__("O5DG");
function check(script) {
  const buffer = bscript.compile(script);
  return (
    buffer.length === 23 &&
    buffer[0] === script_1.OPS.OP_HASH160 &&
    buffer[1] === 0x14 &&
    buffer[22] === script_1.OPS.OP_EQUAL
  );
}
exports.check = check;
check.toJSON = () => {
  return 'scriptHash output';
};


/***/ }),

/***/ "mi50":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// m [pubKeys ...] n OP_CHECKMULTISIG
Object.defineProperty(exports, '__esModule', { value: true });
const bscript = __webpack_require__("O5DG");
const script_1 = __webpack_require__("O5DG");
const types = __webpack_require__("wmJG");
const OP_INT_BASE = script_1.OPS.OP_RESERVED; // OP_1 - 1
function check(script, allowIncomplete) {
  const chunks = bscript.decompile(script);
  if (chunks.length < 4) return false;
  if (chunks[chunks.length - 1] !== script_1.OPS.OP_CHECKMULTISIG) return false;
  if (!types.Number(chunks[0])) return false;
  if (!types.Number(chunks[chunks.length - 2])) return false;
  const m = chunks[0] - OP_INT_BASE;
  const n = chunks[chunks.length - 2] - OP_INT_BASE;
  if (m <= 0) return false;
  if (n > 16) return false;
  if (m > n) return false;
  if (n !== chunks.length - 3) return false;
  if (allowIncomplete) return true;
  const keys = chunks.slice(1, -2);
  return keys.every(bscript.isCanonicalPubKey);
}
exports.check = check;
check.toJSON = () => {
  return 'multi-sig output';
};


/***/ }),

/***/ "n8MN":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, '__esModule', { value: true });
// https://github.com/feross/buffer/blob/master/index.js#L1127
function verifuint(value, max) {
  if (typeof value !== 'number')
    throw new Error('cannot write a non-number as a number');
  if (value < 0)
    throw new Error('specified a negative value for writing an unsigned value');
  if (value > max) throw new Error('RangeError: value out of range');
  if (Math.floor(value) !== value)
    throw new Error('value has a fractional component');
}
function readUInt64LE(buffer, offset) {
  const a = buffer.readUInt32LE(offset);
  let b = buffer.readUInt32LE(offset + 4);
  b *= 0x100000000;
  verifuint(b + a, 0x001fffffffffffff);
  return b + a;
}
exports.readUInt64LE = readUInt64LE;
function writeUInt64LE(buffer, value, offset) {
  verifuint(value, 0x001fffffffffffff);
  buffer.writeInt32LE(value & -1, offset);
  buffer.writeUInt32LE(Math.floor(value / 0x100000000), offset + 4);
  return offset + 8;
}
exports.writeUInt64LE = writeUInt64LE;
function reverseBuffer(buffer) {
  if (buffer.length < 1) return buffer;
  let j = buffer.length - 1;
  let tmp = 0;
  for (let i = 0; i < buffer.length / 2; i++) {
    tmp = buffer[i];
    buffer[i] = buffer[j];
    buffer[j] = tmp;
    j--;
  }
  return buffer;
}
exports.reverseBuffer = reverseBuffer;


/***/ }),

/***/ "pFpI":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// {signature} {pubKey}
Object.defineProperty(exports, '__esModule', { value: true });
const bscript = __webpack_require__("O5DG");
function isCompressedCanonicalPubKey(pubKey) {
  return bscript.isCanonicalPubKey(pubKey) && pubKey.length === 33;
}
function check(script) {
  const chunks = bscript.decompile(script);
  return (
    chunks.length === 2 &&
    bscript.isCanonicalScriptSignature(chunks[0]) &&
    isCompressedCanonicalPubKey(chunks[1])
  );
}
exports.check = check;
check.toJSON = () => {
  return 'witnessPubKeyHash input';
};


/***/ }),

/***/ "rLNA":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
Object.defineProperty(exports, '__esModule', { value: true });
const bcrypto = __webpack_require__("lin5");
const networks_1 = __webpack_require__("A6N3");
const bscript = __webpack_require__("O5DG");
const lazy = __webpack_require__("XKyx");
const typef = __webpack_require__("d+zW");
const OPS = bscript.OPS;
const ecc = __webpack_require__("KfcP");
const bs58check = __webpack_require__("b3gk");
// input: {signature} {pubkey}
// output: OP_DUP OP_HASH160 {hash160(pubkey)} OP_EQUALVERIFY OP_CHECKSIG
function p2pkh(a, opts) {
  if (!a.address && !a.hash && !a.output && !a.pubkey && !a.input)
    throw new TypeError('Not enough data');
  opts = Object.assign({ validate: true }, opts || {});
  typef(
    {
      network: typef.maybe(typef.Object),
      address: typef.maybe(typef.String),
      hash: typef.maybe(typef.BufferN(20)),
      output: typef.maybe(typef.BufferN(25)),
      pubkey: typef.maybe(ecc.isPoint),
      signature: typef.maybe(bscript.isCanonicalScriptSignature),
      input: typef.maybe(typef.Buffer),
    },
    a,
  );
  const _address = lazy.value(() => {
    const payload = bs58check.decode(a.address);
    const version = payload.readUInt8(0);
    const hash = payload.slice(1);
    return { version, hash };
  });
  const _chunks = lazy.value(() => {
    return bscript.decompile(a.input);
  });
  const network = a.network || networks_1.bitcoin;
  const o = { name: 'p2pkh', network };
  lazy.prop(o, 'address', () => {
    if (!o.hash) return;
    const payload = Buffer.allocUnsafe(21);
    payload.writeUInt8(network.pubKeyHash, 0);
    o.hash.copy(payload, 1);
    return bs58check.encode(payload);
  });
  lazy.prop(o, 'hash', () => {
    if (a.output) return a.output.slice(3, 23);
    if (a.address) return _address().hash;
    if (a.pubkey || o.pubkey) return bcrypto.hash160(a.pubkey || o.pubkey);
  });
  lazy.prop(o, 'output', () => {
    if (!o.hash) return;
    return bscript.compile([
      OPS.OP_DUP,
      OPS.OP_HASH160,
      o.hash,
      OPS.OP_EQUALVERIFY,
      OPS.OP_CHECKSIG,
    ]);
  });
  lazy.prop(o, 'pubkey', () => {
    if (!a.input) return;
    return _chunks()[1];
  });
  lazy.prop(o, 'signature', () => {
    if (!a.input) return;
    return _chunks()[0];
  });
  lazy.prop(o, 'input', () => {
    if (!a.pubkey) return;
    if (!a.signature) return;
    return bscript.compile([a.signature, a.pubkey]);
  });
  lazy.prop(o, 'witness', () => {
    if (!o.input) return;
    return [];
  });
  // extended validation
  if (opts.validate) {
    let hash = Buffer.from([]);
    if (a.address) {
      if (_address().version !== network.pubKeyHash)
        throw new TypeError('Invalid version or Network mismatch');
      if (_address().hash.length !== 20) throw new TypeError('Invalid address');
      hash = _address().hash;
    }
    if (a.hash) {
      if (hash.length > 0 && !hash.equals(a.hash))
        throw new TypeError('Hash mismatch');
      else hash = a.hash;
    }
    if (a.output) {
      if (
        a.output.length !== 25 ||
        a.output[0] !== OPS.OP_DUP ||
        a.output[1] !== OPS.OP_HASH160 ||
        a.output[2] !== 0x14 ||
        a.output[23] !== OPS.OP_EQUALVERIFY ||
        a.output[24] !== OPS.OP_CHECKSIG
      )
        throw new TypeError('Output is invalid');
      const hash2 = a.output.slice(3, 23);
      if (hash.length > 0 && !hash.equals(hash2))
        throw new TypeError('Hash mismatch');
      else hash = hash2;
    }
    if (a.pubkey) {
      const pkh = bcrypto.hash160(a.pubkey);
      if (hash.length > 0 && !hash.equals(pkh))
        throw new TypeError('Hash mismatch');
      else hash = pkh;
    }
    if (a.input) {
      const chunks = _chunks();
      if (chunks.length !== 2) throw new TypeError('Input is invalid');
      if (!bscript.isCanonicalScriptSignature(chunks[0]))
        throw new TypeError('Input has invalid signature');
      if (!ecc.isPoint(chunks[1]))
        throw new TypeError('Input has invalid pubkey');
      if (a.signature && !a.signature.equals(chunks[0]))
        throw new TypeError('Signature mismatch');
      if (a.pubkey && !a.pubkey.equals(chunks[1]))
        throw new TypeError('Pubkey mismatch');
      const pkh = bcrypto.hash160(chunks[1]);
      if (hash.length > 0 && !hash.equals(pkh))
        throw new TypeError('Hash mismatch');
    }
  }
  return Object.assign(o, a);
}
exports.p2pkh = p2pkh;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "vR+u":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, '__esModule', { value: true });
const input = __webpack_require__("Fh8C");
exports.input = input;
const output = __webpack_require__("cZz8");
exports.output = output;


/***/ }),

/***/ "vsEA":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, '__esModule', { value: true });
const networks_1 = __webpack_require__("A6N3");
const bscript = __webpack_require__("O5DG");
const lazy = __webpack_require__("XKyx");
const typef = __webpack_require__("d+zW");
const OPS = bscript.OPS;
const ecc = __webpack_require__("KfcP");
// input: {signature}
// output: {pubKey} OP_CHECKSIG
function p2pk(a, opts) {
  if (!a.input && !a.output && !a.pubkey && !a.input && !a.signature)
    throw new TypeError('Not enough data');
  opts = Object.assign({ validate: true }, opts || {});
  typef(
    {
      network: typef.maybe(typef.Object),
      output: typef.maybe(typef.Buffer),
      pubkey: typef.maybe(ecc.isPoint),
      signature: typef.maybe(bscript.isCanonicalScriptSignature),
      input: typef.maybe(typef.Buffer),
    },
    a,
  );
  const _chunks = lazy.value(() => {
    return bscript.decompile(a.input);
  });
  const network = a.network || networks_1.bitcoin;
  const o = { name: 'p2pk', network };
  lazy.prop(o, 'output', () => {
    if (!a.pubkey) return;
    return bscript.compile([a.pubkey, OPS.OP_CHECKSIG]);
  });
  lazy.prop(o, 'pubkey', () => {
    if (!a.output) return;
    return a.output.slice(1, -1);
  });
  lazy.prop(o, 'signature', () => {
    if (!a.input) return;
    return _chunks()[0];
  });
  lazy.prop(o, 'input', () => {
    if (!a.signature) return;
    return bscript.compile([a.signature]);
  });
  lazy.prop(o, 'witness', () => {
    if (!o.input) return;
    return [];
  });
  // extended validation
  if (opts.validate) {
    if (a.output) {
      if (a.output[a.output.length - 1] !== OPS.OP_CHECKSIG)
        throw new TypeError('Output is invalid');
      if (!ecc.isPoint(o.pubkey))
        throw new TypeError('Output pubkey is invalid');
      if (a.pubkey && !a.pubkey.equals(o.pubkey))
        throw new TypeError('Pubkey mismatch');
    }
    if (a.signature) {
      if (a.input && !a.input.equals(o.input))
        throw new TypeError('Signature mismatch');
    }
    if (a.input) {
      if (_chunks().length !== 1) throw new TypeError('Input is invalid');
      if (!bscript.isCanonicalScriptSignature(o.signature))
        throw new TypeError('Input has invalid signature');
    }
  }
  return Object.assign(o, a);
}
exports.p2pk = p2pk;


/***/ }),

/***/ "wmJG":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, '__esModule', { value: true });
const typeforce = __webpack_require__("d+zW");
const UINT31_MAX = Math.pow(2, 31) - 1;
function UInt31(value) {
  return typeforce.UInt32(value) && value <= UINT31_MAX;
}
exports.UInt31 = UInt31;
function BIP32Path(value) {
  return typeforce.String(value) && !!value.match(/^(m\/)?(\d+'?\/)*\d+'?$/);
}
exports.BIP32Path = BIP32Path;
BIP32Path.toJSON = () => {
  return 'BIP32 derivation path';
};
function Signer(obj) {
  return (
    (typeforce.Buffer(obj.publicKey) ||
      typeof obj.getPublicKey === 'function') &&
    typeof obj.sign === 'function'
  );
}
exports.Signer = Signer;
const SATOSHI_MAX = 21 * 1e14;
function Satoshi(value) {
  return typeforce.UInt53(value) && value <= SATOSHI_MAX;
}
exports.Satoshi = Satoshi;
// external dependent types
exports.ECPoint = typeforce.quacksLike('Point');
// exposed, external API
exports.Network = typeforce.compile({
  messagePrefix: typeforce.oneOf(typeforce.Buffer, typeforce.String),
  bip32: {
    public: typeforce.UInt32,
    private: typeforce.UInt32,
  },
  pubKeyHash: typeforce.UInt8,
  scriptHash: typeforce.UInt8,
  wif: typeforce.UInt8,
});
exports.Buffer256bit = typeforce.BufferN(32);
exports.Hash160bit = typeforce.BufferN(20);
exports.Hash256bit = typeforce.BufferN(32);
exports.Number = typeforce.Number; // tslint:disable-line variable-name
exports.Array = typeforce.Array;
exports.Boolean = typeforce.Boolean; // tslint:disable-line variable-name
exports.String = typeforce.String; // tslint:disable-line variable-name
exports.Buffer = typeforce.Buffer;
exports.Hex = typeforce.Hex;
exports.maybe = typeforce.maybe;
exports.tuple = typeforce.tuple;
exports.UInt8 = typeforce.UInt8;
exports.UInt32 = typeforce.UInt32;
exports.Function = typeforce.Function;
exports.BufferN = typeforce.BufferN;
exports.Null = typeforce.Null;
exports.oneOf = typeforce.oneOf;


/***/ }),

/***/ "xLoW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
Object.defineProperty(exports, '__esModule', { value: true });
const bcrypto = __webpack_require__("lin5");
const networks_1 = __webpack_require__("A6N3");
const bscript = __webpack_require__("O5DG");
const lazy = __webpack_require__("XKyx");
const typef = __webpack_require__("d+zW");
const OPS = bscript.OPS;
const bs58check = __webpack_require__("b3gk");
function stacksEqual(a, b) {
  if (a.length !== b.length) return false;
  return a.every((x, i) => {
    return x.equals(b[i]);
  });
}
// input: [redeemScriptSig ...] {redeemScript}
// witness: <?>
// output: OP_HASH160 {hash160(redeemScript)} OP_EQUAL
function p2sh(a, opts) {
  if (!a.address && !a.hash && !a.output && !a.redeem && !a.input)
    throw new TypeError('Not enough data');
  opts = Object.assign({ validate: true }, opts || {});
  typef(
    {
      network: typef.maybe(typef.Object),
      address: typef.maybe(typef.String),
      hash: typef.maybe(typef.BufferN(20)),
      output: typef.maybe(typef.BufferN(23)),
      redeem: typef.maybe({
        network: typef.maybe(typef.Object),
        output: typef.maybe(typef.Buffer),
        input: typef.maybe(typef.Buffer),
        witness: typef.maybe(typef.arrayOf(typef.Buffer)),
      }),
      input: typef.maybe(typef.Buffer),
      witness: typef.maybe(typef.arrayOf(typef.Buffer)),
    },
    a,
  );
  let network = a.network;
  if (!network) {
    network = (a.redeem && a.redeem.network) || networks_1.bitcoin;
  }
  const o = { network };
  const _address = lazy.value(() => {
    const payload = bs58check.decode(a.address);
    const version = payload.readUInt8(0);
    const hash = payload.slice(1);
    return { version, hash };
  });
  const _chunks = lazy.value(() => {
    return bscript.decompile(a.input);
  });
  const _redeem = lazy.value(() => {
    const chunks = _chunks();
    return {
      network,
      output: chunks[chunks.length - 1],
      input: bscript.compile(chunks.slice(0, -1)),
      witness: a.witness || [],
    };
  });
  // output dependents
  lazy.prop(o, 'address', () => {
    if (!o.hash) return;
    const payload = Buffer.allocUnsafe(21);
    payload.writeUInt8(o.network.scriptHash, 0);
    o.hash.copy(payload, 1);
    return bs58check.encode(payload);
  });
  lazy.prop(o, 'hash', () => {
    // in order of least effort
    if (a.output) return a.output.slice(2, 22);
    if (a.address) return _address().hash;
    if (o.redeem && o.redeem.output) return bcrypto.hash160(o.redeem.output);
  });
  lazy.prop(o, 'output', () => {
    if (!o.hash) return;
    return bscript.compile([OPS.OP_HASH160, o.hash, OPS.OP_EQUAL]);
  });
  // input dependents
  lazy.prop(o, 'redeem', () => {
    if (!a.input) return;
    return _redeem();
  });
  lazy.prop(o, 'input', () => {
    if (!a.redeem || !a.redeem.input || !a.redeem.output) return;
    return bscript.compile(
      [].concat(bscript.decompile(a.redeem.input), a.redeem.output),
    );
  });
  lazy.prop(o, 'witness', () => {
    if (o.redeem && o.redeem.witness) return o.redeem.witness;
    if (o.input) return [];
  });
  lazy.prop(o, 'name', () => {
    const nameParts = ['p2sh'];
    if (o.redeem !== undefined) nameParts.push(o.redeem.name);
    return nameParts.join('-');
  });
  if (opts.validate) {
    let hash = Buffer.from([]);
    if (a.address) {
      if (_address().version !== network.scriptHash)
        throw new TypeError('Invalid version or Network mismatch');
      if (_address().hash.length !== 20) throw new TypeError('Invalid address');
      hash = _address().hash;
    }
    if (a.hash) {
      if (hash.length > 0 && !hash.equals(a.hash))
        throw new TypeError('Hash mismatch');
      else hash = a.hash;
    }
    if (a.output) {
      if (
        a.output.length !== 23 ||
        a.output[0] !== OPS.OP_HASH160 ||
        a.output[1] !== 0x14 ||
        a.output[22] !== OPS.OP_EQUAL
      )
        throw new TypeError('Output is invalid');
      const hash2 = a.output.slice(2, 22);
      if (hash.length > 0 && !hash.equals(hash2))
        throw new TypeError('Hash mismatch');
      else hash = hash2;
    }
    // inlined to prevent 'no-inner-declarations' failing
    const checkRedeem = redeem => {
      // is the redeem output empty/invalid?
      if (redeem.output) {
        const decompile = bscript.decompile(redeem.output);
        if (!decompile || decompile.length < 1)
          throw new TypeError('Redeem.output too short');
        // match hash against other sources
        const hash2 = bcrypto.hash160(redeem.output);
        if (hash.length > 0 && !hash.equals(hash2))
          throw new TypeError('Hash mismatch');
        else hash = hash2;
      }
      if (redeem.input) {
        const hasInput = redeem.input.length > 0;
        const hasWitness = redeem.witness && redeem.witness.length > 0;
        if (!hasInput && !hasWitness) throw new TypeError('Empty input');
        if (hasInput && hasWitness)
          throw new TypeError('Input and witness provided');
        if (hasInput) {
          const richunks = bscript.decompile(redeem.input);
          if (!bscript.isPushOnly(richunks))
            throw new TypeError('Non push-only scriptSig');
        }
      }
    };
    if (a.input) {
      const chunks = _chunks();
      if (!chunks || chunks.length < 1) throw new TypeError('Input too short');
      if (!Buffer.isBuffer(_redeem().output))
        throw new TypeError('Input is invalid');
      checkRedeem(_redeem());
    }
    if (a.redeem) {
      if (a.redeem.network && a.redeem.network !== network)
        throw new TypeError('Network mismatch');
      if (a.input) {
        const redeem = _redeem();
        if (a.redeem.output && !a.redeem.output.equals(redeem.output))
          throw new TypeError('Redeem.output mismatch');
        if (a.redeem.input && !a.redeem.input.equals(redeem.input))
          throw new TypeError('Redeem.input mismatch');
      }
      checkRedeem(a.redeem);
    }
    if (a.witness) {
      if (
        a.redeem &&
        a.redeem.witness &&
        !stacksEqual(a.redeem.witness, a.witness)
      )
        throw new TypeError('Witness and redeem.witness mismatch');
    }
  }
  return Object.assign(o, a);
}
exports.p2sh = p2sh;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "xmXb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, '__esModule', { value: true });
const input = __webpack_require__("YkUL");
exports.input = input;
const output = __webpack_require__("mi50");
exports.output = output;


/***/ }),

/***/ "yRTm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
Object.defineProperty(exports, '__esModule', { value: true });
const baddress = __webpack_require__("lMJ2");
const bufferutils_1 = __webpack_require__("n8MN");
const classify = __webpack_require__("I6F5");
const bcrypto = __webpack_require__("lin5");
const ECPair = __webpack_require__("IiU8");
const networks = __webpack_require__("A6N3");
const payments = __webpack_require__("iRDL");
const bscript = __webpack_require__("O5DG");
const script_1 = __webpack_require__("O5DG");
const transaction_1 = __webpack_require__("NPSo");
const types = __webpack_require__("wmJG");
const typeforce = __webpack_require__("d+zW");
const SCRIPT_TYPES = classify.types;
const PREVOUT_TYPES = new Set([
  // Raw
  'p2pkh',
  'p2pk',
  'p2wpkh',
  'p2ms',
  // P2SH wrapped
  'p2sh-p2pkh',
  'p2sh-p2pk',
  'p2sh-p2wpkh',
  'p2sh-p2ms',
  // P2WSH wrapped
  'p2wsh-p2pkh',
  'p2wsh-p2pk',
  'p2wsh-p2ms',
  // P2SH-P2WSH wrapper
  'p2sh-p2wsh-p2pkh',
  'p2sh-p2wsh-p2pk',
  'p2sh-p2wsh-p2ms',
]);
function tfMessage(type, value, message) {
  try {
    typeforce(type, value);
  } catch (err) {
    throw new Error(message);
  }
}
function txIsString(tx) {
  return typeof tx === 'string' || tx instanceof String;
}
function txIsTransaction(tx) {
  return tx instanceof transaction_1.Transaction;
}
class TransactionBuilder {
  // WARNING: maximumFeeRate is __NOT__ to be relied on,
  //          it's just another potential safety mechanism (safety in-depth)
  constructor(network = networks.bitcoin, maximumFeeRate = 2500) {
    this.network = network;
    this.maximumFeeRate = maximumFeeRate;
    this.__PREV_TX_SET = {};
    this.__INPUTS = [];
    this.__TX = new transaction_1.Transaction();
    this.__TX.version = 2;
    this.__USE_LOW_R = false;
    console.warn(
      'Deprecation Warning: TransactionBuilder will be removed in the future. ' +
        '(v6.x.x or later) Please use the Psbt class instead. Examples of usage ' +
        'are available in the transactions-psbt.js integration test file on our ' +
        'Github. A high level explanation is available in the psbt.ts and psbt.js ' +
        'files as well.',
    );
  }
  static fromTransaction(transaction, network) {
    const txb = new TransactionBuilder(network);
    // Copy transaction fields
    txb.setVersion(transaction.version);
    txb.setLockTime(transaction.locktime);
    // Copy outputs (done first to avoid signature invalidation)
    transaction.outs.forEach(txOut => {
      txb.addOutput(txOut.script, txOut.value);
    });
    // Copy inputs
    transaction.ins.forEach(txIn => {
      txb.__addInputUnsafe(txIn.hash, txIn.index, {
        sequence: txIn.sequence,
        script: txIn.script,
        witness: txIn.witness,
      });
    });
    // fix some things not possible through the public API
    txb.__INPUTS.forEach((input, i) => {
      fixMultisigOrder(input, transaction, i);
    });
    return txb;
  }
  setLowR(setting) {
    typeforce(typeforce.maybe(typeforce.Boolean), setting);
    if (setting === undefined) {
      setting = true;
    }
    this.__USE_LOW_R = setting;
    return setting;
  }
  setLockTime(locktime) {
    typeforce(types.UInt32, locktime);
    // if any signatures exist, throw
    if (
      this.__INPUTS.some(input => {
        if (!input.signatures) return false;
        return input.signatures.some(s => s !== undefined);
      })
    ) {
      throw new Error('No, this would invalidate signatures');
    }
    this.__TX.locktime = locktime;
  }
  setVersion(version) {
    typeforce(types.UInt32, version);
    // XXX: this might eventually become more complex depending on what the versions represent
    this.__TX.version = version;
  }
  addInput(txHash, vout, sequence, prevOutScript) {
    if (!this.__canModifyInputs()) {
      throw new Error('No, this would invalidate signatures');
    }
    let value;
    // is it a hex string?
    if (txIsString(txHash)) {
      // transaction hashs's are displayed in reverse order, un-reverse it
      txHash = bufferutils_1.reverseBuffer(Buffer.from(txHash, 'hex'));
      // is it a Transaction object?
    } else if (txIsTransaction(txHash)) {
      const txOut = txHash.outs[vout];
      prevOutScript = txOut.script;
      value = txOut.value;
      txHash = txHash.getHash(false);
    }
    return this.__addInputUnsafe(txHash, vout, {
      sequence,
      prevOutScript,
      value,
    });
  }
  addOutput(scriptPubKey, value) {
    if (!this.__canModifyOutputs()) {
      throw new Error('No, this would invalidate signatures');
    }
    // Attempt to get a script if it's a base58 or bech32 address string
    if (typeof scriptPubKey === 'string') {
      scriptPubKey = baddress.toOutputScript(scriptPubKey, this.network);
    }
    return this.__TX.addOutput(scriptPubKey, value);
  }
  build() {
    return this.__build(false);
  }
  buildIncomplete() {
    return this.__build(true);
  }
  sign(
    signParams,
    keyPair,
    redeemScript,
    hashType,
    witnessValue,
    witnessScript,
  ) {
    trySign(
      getSigningData(
        this.network,
        this.__INPUTS,
        this.__needsOutputs.bind(this),
        this.__TX,
        signParams,
        keyPair,
        redeemScript,
        hashType,
        witnessValue,
        witnessScript,
        this.__USE_LOW_R,
      ),
    );
  }
  __addInputUnsafe(txHash, vout, options) {
    if (transaction_1.Transaction.isCoinbaseHash(txHash)) {
      throw new Error('coinbase inputs not supported');
    }
    const prevTxOut = txHash.toString('hex') + ':' + vout;
    if (this.__PREV_TX_SET[prevTxOut] !== undefined)
      throw new Error('Duplicate TxOut: ' + prevTxOut);
    let input = {};
    // derive what we can from the scriptSig
    if (options.script !== undefined) {
      input = expandInput(options.script, options.witness || []);
    }
    // if an input value was given, retain it
    if (options.value !== undefined) {
      input.value = options.value;
    }
    // derive what we can from the previous transactions output script
    if (!input.prevOutScript && options.prevOutScript) {
      let prevOutType;
      if (!input.pubkeys && !input.signatures) {
        const expanded = expandOutput(options.prevOutScript);
        if (expanded.pubkeys) {
          input.pubkeys = expanded.pubkeys;
          input.signatures = expanded.signatures;
        }
        prevOutType = expanded.type;
      }
      input.prevOutScript = options.prevOutScript;
      input.prevOutType = prevOutType || classify.output(options.prevOutScript);
    }
    const vin = this.__TX.addInput(
      txHash,
      vout,
      options.sequence,
      options.scriptSig,
    );
    this.__INPUTS[vin] = input;
    this.__PREV_TX_SET[prevTxOut] = true;
    return vin;
  }
  __build(allowIncomplete) {
    if (!allowIncomplete) {
      if (!this.__TX.ins.length) throw new Error('Transaction has no inputs');
      if (!this.__TX.outs.length) throw new Error('Transaction has no outputs');
    }
    const tx = this.__TX.clone();
    // create script signatures from inputs
    this.__INPUTS.forEach((input, i) => {
      if (!input.prevOutType && !allowIncomplete)
        throw new Error('Transaction is not complete');
      const result = build(input.prevOutType, input, allowIncomplete);
      if (!result) {
        if (!allowIncomplete && input.prevOutType === SCRIPT_TYPES.NONSTANDARD)
          throw new Error('Unknown input type');
        if (!allowIncomplete) throw new Error('Not enough information');
        return;
      }
      tx.setInputScript(i, result.input);
      tx.setWitness(i, result.witness);
    });
    if (!allowIncomplete) {
      // do not rely on this, its merely a last resort
      if (this.__overMaximumFees(tx.virtualSize())) {
        throw new Error('Transaction has absurd fees');
      }
    }
    return tx;
  }
  __canModifyInputs() {
    return this.__INPUTS.every(input => {
      if (!input.signatures) return true;
      return input.signatures.every(signature => {
        if (!signature) return true;
        const hashType = signatureHashType(signature);
        // if SIGHASH_ANYONECANPAY is set, signatures would not
        // be invalidated by more inputs
        return (
          (hashType & transaction_1.Transaction.SIGHASH_ANYONECANPAY) !== 0
        );
      });
    });
  }
  __needsOutputs(signingHashType) {
    if (signingHashType === transaction_1.Transaction.SIGHASH_ALL) {
      return this.__TX.outs.length === 0;
    }
    // if inputs are being signed with SIGHASH_NONE, we don't strictly need outputs
    // .build() will fail, but .buildIncomplete() is OK
    return (
      this.__TX.outs.length === 0 &&
      this.__INPUTS.some(input => {
        if (!input.signatures) return false;
        return input.signatures.some(signature => {
          if (!signature) return false; // no signature, no issue
          const hashType = signatureHashType(signature);
          if (hashType & transaction_1.Transaction.SIGHASH_NONE) return false; // SIGHASH_NONE doesn't care about outputs
          return true; // SIGHASH_* does care
        });
      })
    );
  }
  __canModifyOutputs() {
    const nInputs = this.__TX.ins.length;
    const nOutputs = this.__TX.outs.length;
    return this.__INPUTS.every(input => {
      if (input.signatures === undefined) return true;
      return input.signatures.every(signature => {
        if (!signature) return true;
        const hashType = signatureHashType(signature);
        const hashTypeMod = hashType & 0x1f;
        if (hashTypeMod === transaction_1.Transaction.SIGHASH_NONE) return true;
        if (hashTypeMod === transaction_1.Transaction.SIGHASH_SINGLE) {
          // if SIGHASH_SINGLE is set, and nInputs > nOutputs
          // some signatures would be invalidated by the addition
          // of more outputs
          return nInputs <= nOutputs;
        }
        return false;
      });
    });
  }
  __overMaximumFees(bytes) {
    // not all inputs will have .value defined
    const incoming = this.__INPUTS.reduce((a, x) => a + (x.value >>> 0), 0);
    // but all outputs do, and if we have any input value
    // we can immediately determine if the outputs are too small
    const outgoing = this.__TX.outs.reduce((a, x) => a + x.value, 0);
    const fee = incoming - outgoing;
    const feeRate = fee / bytes;
    return feeRate > this.maximumFeeRate;
  }
}
exports.TransactionBuilder = TransactionBuilder;
function expandInput(scriptSig, witnessStack, type, scriptPubKey) {
  if (scriptSig.length === 0 && witnessStack.length === 0) return {};
  if (!type) {
    let ssType = classify.input(scriptSig, true);
    let wsType = classify.witness(witnessStack, true);
    if (ssType === SCRIPT_TYPES.NONSTANDARD) ssType = undefined;
    if (wsType === SCRIPT_TYPES.NONSTANDARD) wsType = undefined;
    type = ssType || wsType;
  }
  switch (type) {
    case SCRIPT_TYPES.P2WPKH: {
      const { output, pubkey, signature } = payments.p2wpkh({
        witness: witnessStack,
      });
      return {
        prevOutScript: output,
        prevOutType: SCRIPT_TYPES.P2WPKH,
        pubkeys: [pubkey],
        signatures: [signature],
      };
    }
    case SCRIPT_TYPES.P2PKH: {
      const { output, pubkey, signature } = payments.p2pkh({
        input: scriptSig,
      });
      return {
        prevOutScript: output,
        prevOutType: SCRIPT_TYPES.P2PKH,
        pubkeys: [pubkey],
        signatures: [signature],
      };
    }
    case SCRIPT_TYPES.P2PK: {
      const { signature } = payments.p2pk({ input: scriptSig });
      return {
        prevOutType: SCRIPT_TYPES.P2PK,
        pubkeys: [undefined],
        signatures: [signature],
      };
    }
    case SCRIPT_TYPES.P2MS: {
      const { m, pubkeys, signatures } = payments.p2ms(
        {
          input: scriptSig,
          output: scriptPubKey,
        },
        { allowIncomplete: true },
      );
      return {
        prevOutType: SCRIPT_TYPES.P2MS,
        pubkeys,
        signatures,
        maxSignatures: m,
      };
    }
  }
  if (type === SCRIPT_TYPES.P2SH) {
    const { output, redeem } = payments.p2sh({
      input: scriptSig,
      witness: witnessStack,
    });
    const outputType = classify.output(redeem.output);
    const expanded = expandInput(
      redeem.input,
      redeem.witness,
      outputType,
      redeem.output,
    );
    if (!expanded.prevOutType) return {};
    return {
      prevOutScript: output,
      prevOutType: SCRIPT_TYPES.P2SH,
      redeemScript: redeem.output,
      redeemScriptType: expanded.prevOutType,
      witnessScript: expanded.witnessScript,
      witnessScriptType: expanded.witnessScriptType,
      pubkeys: expanded.pubkeys,
      signatures: expanded.signatures,
    };
  }
  if (type === SCRIPT_TYPES.P2WSH) {
    const { output, redeem } = payments.p2wsh({
      input: scriptSig,
      witness: witnessStack,
    });
    const outputType = classify.output(redeem.output);
    let expanded;
    if (outputType === SCRIPT_TYPES.P2WPKH) {
      expanded = expandInput(redeem.input, redeem.witness, outputType);
    } else {
      expanded = expandInput(
        bscript.compile(redeem.witness),
        [],
        outputType,
        redeem.output,
      );
    }
    if (!expanded.prevOutType) return {};
    return {
      prevOutScript: output,
      prevOutType: SCRIPT_TYPES.P2WSH,
      witnessScript: redeem.output,
      witnessScriptType: expanded.prevOutType,
      pubkeys: expanded.pubkeys,
      signatures: expanded.signatures,
    };
  }
  return {
    prevOutType: SCRIPT_TYPES.NONSTANDARD,
    prevOutScript: scriptSig,
  };
}
// could be done in expandInput, but requires the original Transaction for hashForSignature
function fixMultisigOrder(input, transaction, vin) {
  if (input.redeemScriptType !== SCRIPT_TYPES.P2MS || !input.redeemScript)
    return;
  if (input.pubkeys.length === input.signatures.length) return;
  const unmatched = input.signatures.concat();
  input.signatures = input.pubkeys.map(pubKey => {
    const keyPair = ECPair.fromPublicKey(pubKey);
    let match;
    // check for a signature
    unmatched.some((signature, i) => {
      // skip if undefined || OP_0
      if (!signature) return false;
      // TODO: avoid O(n) hashForSignature
      const parsed = bscript.signature.decode(signature);
      const hash = transaction.hashForSignature(
        vin,
        input.redeemScript,
        parsed.hashType,
      );
      // skip if signature does not match pubKey
      if (!keyPair.verify(hash, parsed.signature)) return false;
      // remove matched signature from unmatched
      unmatched[i] = undefined;
      match = signature;
      return true;
    });
    return match;
  });
}
function expandOutput(script, ourPubKey) {
  typeforce(types.Buffer, script);
  const type = classify.output(script);
  switch (type) {
    case SCRIPT_TYPES.P2PKH: {
      if (!ourPubKey) return { type };
      // does our hash160(pubKey) match the output scripts?
      const pkh1 = payments.p2pkh({ output: script }).hash;
      const pkh2 = bcrypto.hash160(ourPubKey);
      if (!pkh1.equals(pkh2)) return { type };
      return {
        type,
        pubkeys: [ourPubKey],
        signatures: [undefined],
      };
    }
    case SCRIPT_TYPES.P2WPKH: {
      if (!ourPubKey) return { type };
      // does our hash160(pubKey) match the output scripts?
      const wpkh1 = payments.p2wpkh({ output: script }).hash;
      const wpkh2 = bcrypto.hash160(ourPubKey);
      if (!wpkh1.equals(wpkh2)) return { type };
      return {
        type,
        pubkeys: [ourPubKey],
        signatures: [undefined],
      };
    }
    case SCRIPT_TYPES.P2PK: {
      const p2pk = payments.p2pk({ output: script });
      return {
        type,
        pubkeys: [p2pk.pubkey],
        signatures: [undefined],
      };
    }
    case SCRIPT_TYPES.P2MS: {
      const p2ms = payments.p2ms({ output: script });
      return {
        type,
        pubkeys: p2ms.pubkeys,
        signatures: p2ms.pubkeys.map(() => undefined),
        maxSignatures: p2ms.m,
      };
    }
  }
  return { type };
}
function prepareInput(input, ourPubKey, redeemScript, witnessScript) {
  if (redeemScript && witnessScript) {
    const p2wsh = payments.p2wsh({
      redeem: { output: witnessScript },
    });
    const p2wshAlt = payments.p2wsh({ output: redeemScript });
    const p2sh = payments.p2sh({ redeem: { output: redeemScript } });
    const p2shAlt = payments.p2sh({ redeem: p2wsh });
    // enforces P2SH(P2WSH(...))
    if (!p2wsh.hash.equals(p2wshAlt.hash))
      throw new Error('Witness script inconsistent with prevOutScript');
    if (!p2sh.hash.equals(p2shAlt.hash))
      throw new Error('Redeem script inconsistent with prevOutScript');
    const expanded = expandOutput(p2wsh.redeem.output, ourPubKey);
    if (!expanded.pubkeys)
      throw new Error(
        expanded.type +
          ' not supported as witnessScript (' +
          bscript.toASM(witnessScript) +
          ')',
      );
    if (input.signatures && input.signatures.some(x => x !== undefined)) {
      expanded.signatures = input.signatures;
    }
    const signScript = witnessScript;
    if (expanded.type === SCRIPT_TYPES.P2WPKH)
      throw new Error('P2SH(P2WSH(P2WPKH)) is a consensus failure');
    return {
      redeemScript,
      redeemScriptType: SCRIPT_TYPES.P2WSH,
      witnessScript,
      witnessScriptType: expanded.type,
      prevOutType: SCRIPT_TYPES.P2SH,
      prevOutScript: p2sh.output,
      hasWitness: true,
      signScript,
      signType: expanded.type,
      pubkeys: expanded.pubkeys,
      signatures: expanded.signatures,
      maxSignatures: expanded.maxSignatures,
    };
  }
  if (redeemScript) {
    const p2sh = payments.p2sh({ redeem: { output: redeemScript } });
    if (input.prevOutScript) {
      let p2shAlt;
      try {
        p2shAlt = payments.p2sh({ output: input.prevOutScript });
      } catch (e) {
        throw new Error('PrevOutScript must be P2SH');
      }
      if (!p2sh.hash.equals(p2shAlt.hash))
        throw new Error('Redeem script inconsistent with prevOutScript');
    }
    const expanded = expandOutput(p2sh.redeem.output, ourPubKey);
    if (!expanded.pubkeys)
      throw new Error(
        expanded.type +
          ' not supported as redeemScript (' +
          bscript.toASM(redeemScript) +
          ')',
      );
    if (input.signatures && input.signatures.some(x => x !== undefined)) {
      expanded.signatures = input.signatures;
    }
    let signScript = redeemScript;
    if (expanded.type === SCRIPT_TYPES.P2WPKH) {
      signScript = payments.p2pkh({ pubkey: expanded.pubkeys[0] }).output;
    }
    return {
      redeemScript,
      redeemScriptType: expanded.type,
      prevOutType: SCRIPT_TYPES.P2SH,
      prevOutScript: p2sh.output,
      hasWitness: expanded.type === SCRIPT_TYPES.P2WPKH,
      signScript,
      signType: expanded.type,
      pubkeys: expanded.pubkeys,
      signatures: expanded.signatures,
      maxSignatures: expanded.maxSignatures,
    };
  }
  if (witnessScript) {
    const p2wsh = payments.p2wsh({ redeem: { output: witnessScript } });
    if (input.prevOutScript) {
      const p2wshAlt = payments.p2wsh({ output: input.prevOutScript });
      if (!p2wsh.hash.equals(p2wshAlt.hash))
        throw new Error('Witness script inconsistent with prevOutScript');
    }
    const expanded = expandOutput(p2wsh.redeem.output, ourPubKey);
    if (!expanded.pubkeys)
      throw new Error(
        expanded.type +
          ' not supported as witnessScript (' +
          bscript.toASM(witnessScript) +
          ')',
      );
    if (input.signatures && input.signatures.some(x => x !== undefined)) {
      expanded.signatures = input.signatures;
    }
    const signScript = witnessScript;
    if (expanded.type === SCRIPT_TYPES.P2WPKH)
      throw new Error('P2WSH(P2WPKH) is a consensus failure');
    return {
      witnessScript,
      witnessScriptType: expanded.type,
      prevOutType: SCRIPT_TYPES.P2WSH,
      prevOutScript: p2wsh.output,
      hasWitness: true,
      signScript,
      signType: expanded.type,
      pubkeys: expanded.pubkeys,
      signatures: expanded.signatures,
      maxSignatures: expanded.maxSignatures,
    };
  }
  if (input.prevOutType && input.prevOutScript) {
    // embedded scripts are not possible without extra information
    if (input.prevOutType === SCRIPT_TYPES.P2SH)
      throw new Error(
        'PrevOutScript is ' + input.prevOutType + ', requires redeemScript',
      );
    if (input.prevOutType === SCRIPT_TYPES.P2WSH)
      throw new Error(
        'PrevOutScript is ' + input.prevOutType + ', requires witnessScript',
      );
    if (!input.prevOutScript) throw new Error('PrevOutScript is missing');
    const expanded = expandOutput(input.prevOutScript, ourPubKey);
    if (!expanded.pubkeys)
      throw new Error(
        expanded.type +
          ' not supported (' +
          bscript.toASM(input.prevOutScript) +
          ')',
      );
    if (input.signatures && input.signatures.some(x => x !== undefined)) {
      expanded.signatures = input.signatures;
    }
    let signScript = input.prevOutScript;
    if (expanded.type === SCRIPT_TYPES.P2WPKH) {
      signScript = payments.p2pkh({ pubkey: expanded.pubkeys[0] }).output;
    }
    return {
      prevOutType: expanded.type,
      prevOutScript: input.prevOutScript,
      hasWitness: expanded.type === SCRIPT_TYPES.P2WPKH,
      signScript,
      signType: expanded.type,
      pubkeys: expanded.pubkeys,
      signatures: expanded.signatures,
      maxSignatures: expanded.maxSignatures,
    };
  }
  const prevOutScript = payments.p2pkh({ pubkey: ourPubKey }).output;
  return {
    prevOutType: SCRIPT_TYPES.P2PKH,
    prevOutScript,
    hasWitness: false,
    signScript: prevOutScript,
    signType: SCRIPT_TYPES.P2PKH,
    pubkeys: [ourPubKey],
    signatures: [undefined],
  };
}
function build(type, input, allowIncomplete) {
  const pubkeys = input.pubkeys || [];
  let signatures = input.signatures || [];
  switch (type) {
    case SCRIPT_TYPES.P2PKH: {
      if (pubkeys.length === 0) break;
      if (signatures.length === 0) break;
      return payments.p2pkh({ pubkey: pubkeys[0], signature: signatures[0] });
    }
    case SCRIPT_TYPES.P2WPKH: {
      if (pubkeys.length === 0) break;
      if (signatures.length === 0) break;
      return payments.p2wpkh({ pubkey: pubkeys[0], signature: signatures[0] });
    }
    case SCRIPT_TYPES.P2PK: {
      if (pubkeys.length === 0) break;
      if (signatures.length === 0) break;
      return payments.p2pk({ signature: signatures[0] });
    }
    case SCRIPT_TYPES.P2MS: {
      const m = input.maxSignatures;
      if (allowIncomplete) {
        signatures = signatures.map(x => x || script_1.OPS.OP_0);
      } else {
        signatures = signatures.filter(x => x);
      }
      // if the transaction is not not complete (complete), or if signatures.length === m, validate
      // otherwise, the number of OP_0's may be >= m, so don't validate (boo)
      const validate = !allowIncomplete || m === signatures.length;
      return payments.p2ms(
        { m, pubkeys, signatures },
        { allowIncomplete, validate },
      );
    }
    case SCRIPT_TYPES.P2SH: {
      const redeem = build(input.redeemScriptType, input, allowIncomplete);
      if (!redeem) return;
      return payments.p2sh({
        redeem: {
          output: redeem.output || input.redeemScript,
          input: redeem.input,
          witness: redeem.witness,
        },
      });
    }
    case SCRIPT_TYPES.P2WSH: {
      const redeem = build(input.witnessScriptType, input, allowIncomplete);
      if (!redeem) return;
      return payments.p2wsh({
        redeem: {
          output: input.witnessScript,
          input: redeem.input,
          witness: redeem.witness,
        },
      });
    }
  }
}
function canSign(input) {
  return (
    input.signScript !== undefined &&
    input.signType !== undefined &&
    input.pubkeys !== undefined &&
    input.signatures !== undefined &&
    input.signatures.length === input.pubkeys.length &&
    input.pubkeys.length > 0 &&
    (input.hasWitness === false || input.value !== undefined)
  );
}
function signatureHashType(buffer) {
  return buffer.readUInt8(buffer.length - 1);
}
function checkSignArgs(inputs, signParams) {
  if (!PREVOUT_TYPES.has(signParams.prevOutScriptType)) {
    throw new TypeError(
      `Unknown prevOutScriptType "${signParams.prevOutScriptType}"`,
    );
  }
  tfMessage(
    typeforce.Number,
    signParams.vin,
    `sign must include vin parameter as Number (input index)`,
  );
  tfMessage(
    types.Signer,
    signParams.keyPair,
    `sign must include keyPair parameter as Signer interface`,
  );
  tfMessage(
    typeforce.maybe(typeforce.Number),
    signParams.hashType,
    `sign hashType parameter must be a number`,
  );
  const prevOutType = (inputs[signParams.vin] || []).prevOutType;
  const posType = signParams.prevOutScriptType;
  switch (posType) {
    case 'p2pkh':
      if (prevOutType && prevOutType !== 'pubkeyhash') {
        throw new TypeError(
          `input #${signParams.vin} is not of type p2pkh: ${prevOutType}`,
        );
      }
      tfMessage(
        typeforce.value(undefined),
        signParams.witnessScript,
        `${posType} requires NO witnessScript`,
      );
      tfMessage(
        typeforce.value(undefined),
        signParams.redeemScript,
        `${posType} requires NO redeemScript`,
      );
      tfMessage(
        typeforce.value(undefined),
        signParams.witnessValue,
        `${posType} requires NO witnessValue`,
      );
      break;
    case 'p2pk':
      if (prevOutType && prevOutType !== 'pubkey') {
        throw new TypeError(
          `input #${signParams.vin} is not of type p2pk: ${prevOutType}`,
        );
      }
      tfMessage(
        typeforce.value(undefined),
        signParams.witnessScript,
        `${posType} requires NO witnessScript`,
      );
      tfMessage(
        typeforce.value(undefined),
        signParams.redeemScript,
        `${posType} requires NO redeemScript`,
      );
      tfMessage(
        typeforce.value(undefined),
        signParams.witnessValue,
        `${posType} requires NO witnessValue`,
      );
      break;
    case 'p2wpkh':
      if (prevOutType && prevOutType !== 'witnesspubkeyhash') {
        throw new TypeError(
          `input #${signParams.vin} is not of type p2wpkh: ${prevOutType}`,
        );
      }
      tfMessage(
        typeforce.value(undefined),
        signParams.witnessScript,
        `${posType} requires NO witnessScript`,
      );
      tfMessage(
        typeforce.value(undefined),
        signParams.redeemScript,
        `${posType} requires NO redeemScript`,
      );
      tfMessage(
        types.Satoshi,
        signParams.witnessValue,
        `${posType} requires witnessValue`,
      );
      break;
    case 'p2ms':
      if (prevOutType && prevOutType !== 'multisig') {
        throw new TypeError(
          `input #${signParams.vin} is not of type p2ms: ${prevOutType}`,
        );
      }
      tfMessage(
        typeforce.value(undefined),
        signParams.witnessScript,
        `${posType} requires NO witnessScript`,
      );
      tfMessage(
        typeforce.value(undefined),
        signParams.redeemScript,
        `${posType} requires NO redeemScript`,
      );
      tfMessage(
        typeforce.value(undefined),
        signParams.witnessValue,
        `${posType} requires NO witnessValue`,
      );
      break;
    case 'p2sh-p2wpkh':
      if (prevOutType && prevOutType !== 'scripthash') {
        throw new TypeError(
          `input #${signParams.vin} is not of type p2sh-p2wpkh: ${prevOutType}`,
        );
      }
      tfMessage(
        typeforce.value(undefined),
        signParams.witnessScript,
        `${posType} requires NO witnessScript`,
      );
      tfMessage(
        typeforce.Buffer,
        signParams.redeemScript,
        `${posType} requires redeemScript`,
      );
      tfMessage(
        types.Satoshi,
        signParams.witnessValue,
        `${posType} requires witnessValue`,
      );
      break;
    case 'p2sh-p2ms':
    case 'p2sh-p2pk':
    case 'p2sh-p2pkh':
      if (prevOutType && prevOutType !== 'scripthash') {
        throw new TypeError(
          `input #${signParams.vin} is not of type ${posType}: ${prevOutType}`,
        );
      }
      tfMessage(
        typeforce.value(undefined),
        signParams.witnessScript,
        `${posType} requires NO witnessScript`,
      );
      tfMessage(
        typeforce.Buffer,
        signParams.redeemScript,
        `${posType} requires redeemScript`,
      );
      tfMessage(
        typeforce.value(undefined),
        signParams.witnessValue,
        `${posType} requires NO witnessValue`,
      );
      break;
    case 'p2wsh-p2ms':
    case 'p2wsh-p2pk':
    case 'p2wsh-p2pkh':
      if (prevOutType && prevOutType !== 'witnessscripthash') {
        throw new TypeError(
          `input #${signParams.vin} is not of type ${posType}: ${prevOutType}`,
        );
      }
      tfMessage(
        typeforce.Buffer,
        signParams.witnessScript,
        `${posType} requires witnessScript`,
      );
      tfMessage(
        typeforce.value(undefined),
        signParams.redeemScript,
        `${posType} requires NO redeemScript`,
      );
      tfMessage(
        types.Satoshi,
        signParams.witnessValue,
        `${posType} requires witnessValue`,
      );
      break;
    case 'p2sh-p2wsh-p2ms':
    case 'p2sh-p2wsh-p2pk':
    case 'p2sh-p2wsh-p2pkh':
      if (prevOutType && prevOutType !== 'scripthash') {
        throw new TypeError(
          `input #${signParams.vin} is not of type ${posType}: ${prevOutType}`,
        );
      }
      tfMessage(
        typeforce.Buffer,
        signParams.witnessScript,
        `${posType} requires witnessScript`,
      );
      tfMessage(
        typeforce.Buffer,
        signParams.redeemScript,
        `${posType} requires witnessScript`,
      );
      tfMessage(
        types.Satoshi,
        signParams.witnessValue,
        `${posType} requires witnessScript`,
      );
      break;
  }
}
function trySign({
  input,
  ourPubKey,
  keyPair,
  signatureHash,
  hashType,
  useLowR,
}) {
  // enforce in order signing of public keys
  let signed = false;
  for (const [i, pubKey] of input.pubkeys.entries()) {
    if (!ourPubKey.equals(pubKey)) continue;
    if (input.signatures[i]) throw new Error('Signature already exists');
    // TODO: add tests
    if (ourPubKey.length !== 33 && input.hasWitness) {
      throw new Error(
        'BIP143 rejects uncompressed public keys in P2WPKH or P2WSH',
      );
    }
    const signature = keyPair.sign(signatureHash, useLowR);
    input.signatures[i] = bscript.signature.encode(signature, hashType);
    signed = true;
  }
  if (!signed) throw new Error('Key pair cannot sign for this input');
}
function getSigningData(
  network,
  inputs,
  needsOutputs,
  tx,
  signParams,
  keyPair,
  redeemScript,
  hashType,
  witnessValue,
  witnessScript,
  useLowR,
) {
  let vin;
  if (typeof signParams === 'number') {
    console.warn(
      'DEPRECATED: TransactionBuilder sign method arguments ' +
        'will change in v6, please use the TxbSignArg interface',
    );
    vin = signParams;
  } else if (typeof signParams === 'object') {
    checkSignArgs(inputs, signParams);
    ({
      vin,
      keyPair,
      redeemScript,
      hashType,
      witnessValue,
      witnessScript,
    } = signParams);
  } else {
    throw new TypeError(
      'TransactionBuilder sign first arg must be TxbSignArg or number',
    );
  }
  if (keyPair === undefined) {
    throw new Error('sign requires keypair');
  }
  // TODO: remove keyPair.network matching in 4.0.0
  if (keyPair.network && keyPair.network !== network)
    throw new TypeError('Inconsistent network');
  if (!inputs[vin]) throw new Error('No input at index: ' + vin);
  hashType = hashType || transaction_1.Transaction.SIGHASH_ALL;
  if (needsOutputs(hashType)) throw new Error('Transaction needs outputs');
  const input = inputs[vin];
  // if redeemScript was previously provided, enforce consistency
  if (
    input.redeemScript !== undefined &&
    redeemScript &&
    !input.redeemScript.equals(redeemScript)
  ) {
    throw new Error('Inconsistent redeemScript');
  }
  const ourPubKey =
    keyPair.publicKey || (keyPair.getPublicKey && keyPair.getPublicKey());
  if (!canSign(input)) {
    if (witnessValue !== undefined) {
      if (input.value !== undefined && input.value !== witnessValue)
        throw new Error('Input did not match witnessValue');
      typeforce(types.Satoshi, witnessValue);
      input.value = witnessValue;
    }
    if (!canSign(input)) {
      const prepared = prepareInput(
        input,
        ourPubKey,
        redeemScript,
        witnessScript,
      );
      // updates inline
      Object.assign(input, prepared);
    }
    if (!canSign(input)) throw Error(input.prevOutType + ' not supported');
  }
  // ready to sign
  let signatureHash;
  if (input.hasWitness) {
    signatureHash = tx.hashForWitnessV0(
      vin,
      input.signScript,
      input.value,
      hashType,
    );
  } else {
    signatureHash = tx.hashForSignature(vin, input.signScript, hashType);
  }
  return {
    input,
    ourPubKey,
    keyPair,
    signatureHash,
    hashType,
    useLowR: !!useLowR,
  };
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "yX9u":
/***/ (function(module, exports, __webpack_require__) {

var OPS = __webpack_require__("E0BK")

var map = {}
for (var op in OPS) {
  var code = OPS[op]
  map[code] = op
}

module.exports = map


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYml0Y29pbmpzLWxpYi9zcmMvcGF5bWVudHMvcDJ3cGtoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iaXRjb2luanMtbGliL3NyYy90ZW1wbGF0ZXMvd2l0bmVzc2NvbW1pdG1lbnQvb3V0cHV0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iaXRjb2luanMtbGliL3NyYy9uZXR3b3Jrcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYml0Y29pbmpzLWxpYi9zcmMvdGVtcGxhdGVzL3dpdG5lc3NwdWJrZXloYXNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iaXRjb2luanMtbGliL3NyYy90ZW1wbGF0ZXMvd2l0bmVzc3NjcmlwdGhhc2gvaW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JpdGNvaW5qcy1saWIvc3JjL3RlbXBsYXRlcy93aXRuZXNzY29tbWl0bWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYml0Y29pbmpzLWxpYi9zcmMvdGVtcGxhdGVzL3B1YmtleS9pbnB1dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYml0Y29pbmpzLWxpYi9zcmMvY2xhc3NpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JpdGNvaW5qcy1saWIvc3JjL3RlbXBsYXRlcy9zY3JpcHRoYXNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iaXRjb2luanMtbGliL3NyYy9lY3BhaXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JpdGNvaW5qcy1saWIvc3JjL3BheW1lbnRzL3AybXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JpdGNvaW5qcy1saWIvc3JjL3RyYW5zYWN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iaXRjb2luanMtbGliL3NyYy90ZW1wbGF0ZXMvcHVia2V5L291dHB1dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYml0Y29pbmpzLWxpYi9zcmMvc2NyaXB0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iaXRjb2luanMtbGliL3NyYy9zY3JpcHRfc2lnbmF0dXJlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iaXRjb2luanMtbGliL3NyYy9ibG9jay5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYml0Y29pbmpzLWxpYi9zcmMvcHNidC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYml0Y29pbmpzLWxpYi9zcmMvdGVtcGxhdGVzL3B1YmtleWhhc2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JpdGNvaW5qcy1saWIvc3JjL3RlbXBsYXRlcy9udWxsZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYml0Y29pbmpzLWxpYi9zcmMvdGVtcGxhdGVzL3dpdG5lc3NwdWJrZXloYXNoL291dHB1dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYml0Y29pbmpzLWxpYi9zcmMvcGF5bWVudHMvZW1iZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JpdGNvaW5qcy1saWIvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iaXRjb2luanMtbGliL3NyYy90ZW1wbGF0ZXMvcHVia2V5aGFzaC9pbnB1dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYml0Y29pbmpzLWxpYi9zcmMvcGF5bWVudHMvbGF6eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYml0Y29pbmpzLWxpYi9zcmMvdGVtcGxhdGVzL3B1YmtleWhhc2gvb3V0cHV0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iaXRjb2luanMtbGliL3NyYy90ZW1wbGF0ZXMvbXVsdGlzaWcvaW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JpdGNvaW5qcy1saWIvc3JjL3RlbXBsYXRlcy9zY3JpcHRoYXNoL2lucHV0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iaXRjb2luanMtbGliL3NyYy90ZW1wbGF0ZXMvcHVia2V5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iaXRjb2luanMtbGliL3NyYy90ZW1wbGF0ZXMvd2l0bmVzc3NjcmlwdGhhc2gvb3V0cHV0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iaXRjb2luanMtbGliL3NyYy9zY3JpcHRfbnVtYmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iaXRjb2luanMtbGliL3NyYy9wYXltZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYml0Y29pbmpzLWxpYi9zcmMvcGF5bWVudHMvcDJ3c2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JpdGNvaW5qcy1saWIvc3JjL2FkZHJlc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JpdGNvaW5qcy1saWIvc3JjL2NyeXB0by5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYml0Y29pbmpzLWxpYi9zcmMvdGVtcGxhdGVzL3NjcmlwdGhhc2gvb3V0cHV0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iaXRjb2luanMtbGliL3NyYy90ZW1wbGF0ZXMvbXVsdGlzaWcvb3V0cHV0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iaXRjb2luanMtbGliL3NyYy9idWZmZXJ1dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYml0Y29pbmpzLWxpYi9zcmMvdGVtcGxhdGVzL3dpdG5lc3NwdWJrZXloYXNoL2lucHV0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iaXRjb2luanMtbGliL3NyYy9wYXltZW50cy9wMnBraC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYml0Y29pbmpzLWxpYi9zcmMvdGVtcGxhdGVzL3dpdG5lc3NzY3JpcHRoYXNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iaXRjb2luanMtbGliL3NyYy9wYXltZW50cy9wMnBrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iaXRjb2luanMtbGliL3NyYy90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYml0Y29pbmpzLWxpYi9zcmMvcGF5bWVudHMvcDJzaC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYml0Y29pbmpzLWxpYi9zcmMvdGVtcGxhdGVzL211bHRpc2lnL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iaXRjb2luanMtbGliL3NyYy90cmFuc2FjdGlvbl9idWlsZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iaXRjb2luLW9wcy9tYXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsOENBQWE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxnQkFBZ0IsbUJBQU8sQ0FBQyxNQUFXO0FBQ25DLG1CQUFtQixtQkFBTyxDQUFDLE1BQWE7QUFDeEMsZ0JBQWdCLG1CQUFPLENBQUMsTUFBVztBQUNuQyxhQUFhLG1CQUFPLENBQUMsTUFBUTtBQUM3QixjQUFjLG1CQUFPLENBQUMsTUFBVztBQUNqQztBQUNBLFlBQVksbUJBQU8sQ0FBQyxNQUFnQjtBQUNwQyxlQUFlLG1CQUFPLENBQUMsTUFBUTtBQUMvQjtBQUNBLGFBQWEsVUFBVSxFQUFFO0FBQ3pCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUIsWUFBWTtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGFBQWE7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDN2RhO0FBQ2IsSUFBSSxPQUFPO0FBQ1gsOENBQThDLGNBQWM7QUFDNUQsZ0JBQWdCLG1CQUFPLENBQUMsTUFBYztBQUN0QyxpQkFBaUIsbUJBQU8sQ0FBQyxNQUFjO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDaEJBLDhDQUFhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQscUJBQXFCLG1CQUFPLENBQUMsTUFBaUI7QUFDOUMsd0JBQXdCLG1CQUFPLENBQUMsTUFBb0I7QUFDcEQsY0FBYyxtQkFBTyxDQUFDLE1BQVM7QUFDL0IsY0FBYyxtQkFBTyxDQUFDLE1BQU87QUFDN0IsWUFBWSxtQkFBTyxDQUFDLE1BQWdCO0FBQ3BDLGlCQUFpQixtQkFBTyxDQUFDLE1BQWtCO0FBQzNDLGtCQUFrQixtQkFBTyxDQUFDLE1BQVc7QUFDckMsY0FBYyxtQkFBTyxDQUFDLE1BQWE7QUFDbkMsb0JBQW9CLG1CQUFPLENBQUMsTUFBaUI7QUFDN0MsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNoTEEsOENBQWE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxjQUFjLG1CQUFPLENBQUMsTUFBUztBQUMvQixjQUFjLG1CQUFPLENBQUMsTUFBTztBQUM3QixrQkFBa0IsbUJBQU8sQ0FBQyxNQUFXO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsS0FBSyxzQkFBc0I7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ25EQSw4Q0FBYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELHNCQUFzQixtQkFBTyxDQUFDLE1BQWU7QUFDN0MsZ0JBQWdCLG1CQUFPLENBQUMsTUFBVTtBQUNsQyxzQkFBc0IsbUJBQU8sQ0FBQyxNQUFlO0FBQzdDLGNBQWMsbUJBQU8sQ0FBQyxNQUFTO0FBQy9CLHVCQUF1QixtQkFBTyxDQUFDLE1BQXFCO0FBQ3BELGtCQUFrQixtQkFBTyxDQUFDLE1BQVc7QUFDckMsZ0JBQWdCLG1CQUFPLENBQUMsTUFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1CQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiwwQkFBMEI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxlQUFlO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixVQUFVLDRCQUE0QjtBQUNwRTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxvQkFBb0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSx1Q0FBdUMsYUFBYTtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsb0JBQW9CO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSwyQ0FBMkMsYUFBYTtBQUN4RDtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxpQkFBaUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3Qyw0QkFBNEI7QUFDcEUsMEJBQTBCLFFBQVE7QUFDbEMsMkJBQTJCLE1BQU07QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQWEsV0FBVztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxTQUFTLDBCQUEwQjtBQUNuQztBQUNBLFdBQVcsV0FBVztBQUN0QjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsaUJBQWlCLE9BQU8sK0JBQStCLHVCQUF1QjtBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSx1QkFBdUI7QUFDdEMsS0FBSztBQUNMO0FBQ0E7QUFDQSxXQUFXLGtCQUFrQixjQUFjLFdBQVc7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxLQUFLO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxrQkFBa0I7QUFDcEUsK0NBQStDLDJCQUEyQjtBQUMxRTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyw0QkFBNEI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0UsSUFBSTtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsV0FBVztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsNENBQTRDLHdCQUF3QjtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSCxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0Qyx5QkFBeUI7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGtCQUFrQixXQUFXO0FBQzdCLGFBQWEsd0JBQXdCO0FBQ3JDO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsaUJBQWlCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixXQUFXO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN4b0NhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsY0FBYyxtQkFBTyxDQUFDLE1BQVM7QUFDL0I7QUFDQSxlQUFlLG1CQUFPLENBQUMsTUFBVTtBQUNqQzs7Ozs7Ozs7O0FDTGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxjQUFjO0FBQ2QsZ0JBQWdCLG1CQUFPLENBQUMsTUFBVztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7Ozs7Ozs7OztBQ2RhO0FBQ2IsU0FBUztBQUNULDhDQUE4QyxjQUFjO0FBQzVELGdCQUFnQixtQkFBTyxDQUFDLE1BQWM7QUFDdEMsaUJBQWlCLG1CQUFPLENBQUMsTUFBYztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ2hCYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELG1CQUFtQixtQkFBTyxDQUFDLE1BQWE7QUFDeEMsZ0JBQWdCLG1CQUFPLENBQUMsTUFBVztBQUNuQyxhQUFhLG1CQUFPLENBQUMsTUFBUTtBQUM3QixjQUFjLG1CQUFPLENBQUMsTUFBVztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQixZQUFZO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDaERhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsY0FBYyxtQkFBTyxDQUFDLE1BQU87QUFDN0I7QUFDQSxnQkFBZ0IsbUJBQU8sQ0FBQyxNQUFXO0FBQ25DO0FBQ0EsZUFBZSxtQkFBTyxDQUFDLE1BQVU7QUFDakM7QUFDQSxlQUFlLG1CQUFPLENBQUMsTUFBVTtBQUNqQztBQUNBLGlCQUFpQixtQkFBTyxDQUFDLE1BQVk7QUFDckM7QUFDQSxpQkFBaUIsbUJBQU8sQ0FBQyxNQUFZO0FBQ3JDO0FBQ0EsZUFBZSxtQkFBTyxDQUFDLE1BQVU7QUFDakM7QUFDQSxjQUFjLG1CQUFPLENBQUMsTUFBUztBQUMvQjtBQUNBLGFBQWEsbUJBQU8sQ0FBQyxNQUFRO0FBQzdCO0FBQ0EsZUFBZSxtQkFBTyxDQUFDLE1BQVU7QUFDakM7QUFDQSxvQkFBb0IsbUJBQU8sQ0FBQyxNQUFlO0FBQzNDO0FBQ0EsNEJBQTRCLG1CQUFPLENBQUMsTUFBdUI7QUFDM0Q7Ozs7Ozs7OztBQ3pCYTtBQUNiLElBQUksVUFBVSxFQUFFO0FBQ2hCLDhDQUE4QyxjQUFjO0FBQzVELGdCQUFnQixtQkFBTyxDQUFDLE1BQWM7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNmYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDOUJhO0FBQ2Isc0JBQXNCLFdBQVc7QUFDakMsOENBQThDLGNBQWM7QUFDNUQsZ0JBQWdCLG1CQUFPLENBQUMsTUFBYztBQUN0QyxpQkFBaUIsbUJBQU8sQ0FBQyxNQUFjO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDbkJhO0FBQ2I7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxnQkFBZ0IsbUJBQU8sQ0FBQyxNQUFjO0FBQ3RDLGlCQUFpQixtQkFBTyxDQUFDLE1BQWM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN0QkEsOENBQWE7QUFDYixnQkFBZ0I7QUFDaEIsOENBQThDLGNBQWM7QUFDNUQsZ0JBQWdCLG1CQUFPLENBQUMsTUFBYztBQUN0QyxhQUFhLG1CQUFPLENBQUMsTUFBYTtBQUNsQyxhQUFhLG1CQUFPLENBQUMsTUFBVztBQUNoQyxjQUFjLG1CQUFPLENBQUMsTUFBZTtBQUNyQyxnQkFBZ0IsbUJBQU8sQ0FBQyxNQUE2QjtBQUNyRCxlQUFlLG1CQUFPLENBQUMsTUFBNkI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2pEYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGNBQWMsbUJBQU8sQ0FBQyxNQUFTO0FBQy9CO0FBQ0EsZUFBZSxtQkFBTyxDQUFDLE1BQVU7QUFDakM7Ozs7Ozs7OztBQ0xhO0FBQ2IsU0FBUztBQUNULDhDQUE4QyxjQUFjO0FBQzVELGdCQUFnQixtQkFBTyxDQUFDLE1BQWM7QUFDdEMsaUJBQWlCLG1CQUFPLENBQUMsTUFBYztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ2hCQSw4Q0FBYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFVBQVU7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNURhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsZ0JBQWdCLG1CQUFPLENBQUMsTUFBUztBQUNqQztBQUNBLGVBQWUsbUJBQU8sQ0FBQyxNQUFRO0FBQy9CO0FBQ0EsZUFBZSxtQkFBTyxDQUFDLE1BQVE7QUFDL0I7QUFDQSxnQkFBZ0IsbUJBQU8sQ0FBQyxNQUFTO0FBQ2pDO0FBQ0EsZUFBZSxtQkFBTyxDQUFDLE1BQVE7QUFDL0I7QUFDQSxpQkFBaUIsbUJBQU8sQ0FBQyxNQUFVO0FBQ25DO0FBQ0EsZ0JBQWdCLG1CQUFPLENBQUMsTUFBUztBQUNqQztBQUNBO0FBQ0E7Ozs7Ozs7OztBQ2pCQSw4Q0FBYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGdCQUFnQixtQkFBTyxDQUFDLE1BQVc7QUFDbkMsbUJBQW1CLG1CQUFPLENBQUMsTUFBYTtBQUN4QyxnQkFBZ0IsbUJBQU8sQ0FBQyxNQUFXO0FBQ25DLGFBQWEsbUJBQU8sQ0FBQyxNQUFRO0FBQzdCLGNBQWMsbUJBQU8sQ0FBQyxNQUFXO0FBQ2pDO0FBQ0EsZUFBZSxtQkFBTyxDQUFDLE1BQVE7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsaUJBQWlCLFlBQVk7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxpQkFBaUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3BMQSw4Q0FBYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGlCQUFpQixtQkFBTyxDQUFDLE1BQVk7QUFDckMsaUJBQWlCLG1CQUFPLENBQUMsTUFBWTtBQUNyQyxnQkFBZ0IsbUJBQU8sQ0FBQyxNQUFVO0FBQ2xDLGNBQWMsbUJBQU8sQ0FBQyxNQUFTO0FBQy9CLGVBQWUsbUJBQU8sQ0FBQyxNQUFRO0FBQy9CLGtCQUFrQixtQkFBTyxDQUFDLE1BQVc7QUFDckMsa0JBQWtCLG1CQUFPLENBQUMsTUFBVztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsa0JBQWtCO0FBQzdDLEdBQUc7QUFDSDtBQUNBLDBCQUEwQixrQkFBa0I7QUFDNUMsR0FBRztBQUNIO0FBQ0EsNEJBQTRCLGtCQUFrQjtBQUM5QyxHQUFHO0FBQ0g7QUFDQSwyQkFBMkIsa0JBQWtCO0FBQzdDLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLDZCQUE2QiwwQkFBMEI7QUFDdkQ7QUFDQSw0QkFBNEIsMEJBQTBCO0FBQ3RELEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsMEJBQTBCO0FBQzVEO0FBQ0EsaUNBQWlDLDBCQUEwQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUMxRmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxtQkFBbUIsbUJBQU8sQ0FBQyxNQUFhO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDbENhO0FBQ2IsZUFBZSxXQUFXO0FBQzFCLDhDQUE4QyxjQUFjO0FBQzVELGdCQUFnQixtQkFBTyxDQUFDLE1BQWM7QUFDdEMsaUJBQWlCLG1CQUFPLENBQUMsTUFBYztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDakJhO0FBQ2I7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxnQkFBZ0IsbUJBQU8sQ0FBQyxNQUFjO0FBQ3RDLGlCQUFpQixtQkFBTyxDQUFDLE1BQWM7QUFDdkMsY0FBYyxtQkFBTyxDQUFDLE1BQWE7QUFDbkMsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzFCYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsdUJBQXVCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3ZDYTtBQUNiLElBQUksVUFBVSxFQUFFO0FBQ2hCLDhDQUE4QyxjQUFjO0FBQzVELGdCQUFnQixtQkFBTyxDQUFDLE1BQWM7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNsQkEsOENBQWE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxnQkFBZ0IsbUJBQU8sQ0FBQyxNQUFXO0FBQ25DLG1CQUFtQixtQkFBTyxDQUFDLE1BQWE7QUFDeEMsZ0JBQWdCLG1CQUFPLENBQUMsTUFBVztBQUNuQyxhQUFhLG1CQUFPLENBQUMsTUFBUTtBQUM3QixjQUFjLG1CQUFPLENBQUMsTUFBVztBQUNqQztBQUNBLFlBQVksbUJBQU8sQ0FBQyxNQUFnQjtBQUNwQyxrQkFBa0IsbUJBQU8sQ0FBQyxNQUFXO0FBQ3JDLFdBQVcsVUFBVSxFQUFFO0FBQ3ZCLDhCQUE4QixnQkFBZ0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQixZQUFZO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1osR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNuSWE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxjQUFjLG1CQUFPLENBQUMsTUFBUztBQUMvQjtBQUNBLGVBQWUsbUJBQU8sQ0FBQyxNQUFVO0FBQ2pDOzs7Ozs7Ozs7QUNMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELG1CQUFtQixtQkFBTyxDQUFDLE1BQWE7QUFDeEMsZ0JBQWdCLG1CQUFPLENBQUMsTUFBVztBQUNuQyxhQUFhLG1CQUFPLENBQUMsTUFBUTtBQUM3QixjQUFjLG1CQUFPLENBQUMsTUFBVztBQUNqQztBQUNBLFlBQVksbUJBQU8sQ0FBQyxNQUFnQjtBQUNwQyxXQUFXO0FBQ1gsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUIsWUFBWTtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3ZFYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLE1BQVc7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQSxvQ0FBb0M7QUFDcEMsa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN6REEsOENBQWE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxnQkFBZ0IsbUJBQU8sQ0FBQyxNQUFXO0FBQ25DLG1CQUFtQixtQkFBTyxDQUFDLE1BQWE7QUFDeEMsZ0JBQWdCLG1CQUFPLENBQUMsTUFBVztBQUNuQyxhQUFhLG1CQUFPLENBQUMsTUFBUTtBQUM3QixjQUFjLG1CQUFPLENBQUMsTUFBVztBQUNqQztBQUNBLGtCQUFrQixtQkFBTyxDQUFDLE1BQVc7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUIsWUFBWTtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3RMYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGNBQWMsbUJBQU8sQ0FBQyxNQUFTO0FBQy9CO0FBQ0EsZUFBZSxtQkFBTyxDQUFDLE1BQVU7QUFDakM7Ozs7Ozs7OztBQ0xBLDhDQUFhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsaUJBQWlCLG1CQUFPLENBQUMsTUFBVztBQUNwQyxzQkFBc0IsbUJBQU8sQ0FBQyxNQUFlO0FBQzdDLGlCQUFpQixtQkFBTyxDQUFDLE1BQVk7QUFDckMsZ0JBQWdCLG1CQUFPLENBQUMsTUFBVTtBQUNsQyxlQUFlLG1CQUFPLENBQUMsTUFBVTtBQUNqQyxpQkFBaUIsbUJBQU8sQ0FBQyxNQUFZO0FBQ3JDLGlCQUFpQixtQkFBTyxDQUFDLE1BQVk7QUFDckMsZ0JBQWdCLG1CQUFPLENBQUMsTUFBVTtBQUNsQyxpQkFBaUIsbUJBQU8sQ0FBQyxNQUFVO0FBQ25DLHNCQUFzQixtQkFBTyxDQUFDLE1BQWU7QUFDN0MsY0FBYyxtQkFBTyxDQUFDLE1BQVM7QUFDL0Isa0JBQWtCLG1CQUFPLENBQUMsTUFBVztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN4aUNBLFVBQVUsbUJBQU8sQ0FBQyxNQUFjOztBQUVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6InZlbmRvcn5lMDlhMjE3Zi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYmNyeXB0byA9IHJlcXVpcmUoJy4uL2NyeXB0bycpO1xuY29uc3QgbmV0d29ya3NfMSA9IHJlcXVpcmUoJy4uL25ldHdvcmtzJyk7XG5jb25zdCBic2NyaXB0ID0gcmVxdWlyZSgnLi4vc2NyaXB0Jyk7XG5jb25zdCBsYXp5ID0gcmVxdWlyZSgnLi9sYXp5Jyk7XG5jb25zdCB0eXBlZiA9IHJlcXVpcmUoJ3R5cGVmb3JjZScpO1xuY29uc3QgT1BTID0gYnNjcmlwdC5PUFM7XG5jb25zdCBlY2MgPSByZXF1aXJlKCd0aW55LXNlY3AyNTZrMScpO1xuY29uc3QgYmVjaDMyID0gcmVxdWlyZSgnYmVjaDMyJyk7XG5jb25zdCBFTVBUWV9CVUZGRVIgPSBCdWZmZXIuYWxsb2MoMCk7XG4vLyB3aXRuZXNzOiB7c2lnbmF0dXJlfSB7cHViS2V5fVxuLy8gaW5wdXQ6IDw+XG4vLyBvdXRwdXQ6IE9QXzAge3B1YktleUhhc2h9XG5mdW5jdGlvbiBwMndwa2goYSwgb3B0cykge1xuICBpZiAoIWEuYWRkcmVzcyAmJiAhYS5oYXNoICYmICFhLm91dHB1dCAmJiAhYS5wdWJrZXkgJiYgIWEud2l0bmVzcylcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdOb3QgZW5vdWdoIGRhdGEnKTtcbiAgb3B0cyA9IE9iamVjdC5hc3NpZ24oeyB2YWxpZGF0ZTogdHJ1ZSB9LCBvcHRzIHx8IHt9KTtcbiAgdHlwZWYoXG4gICAge1xuICAgICAgYWRkcmVzczogdHlwZWYubWF5YmUodHlwZWYuU3RyaW5nKSxcbiAgICAgIGhhc2g6IHR5cGVmLm1heWJlKHR5cGVmLkJ1ZmZlck4oMjApKSxcbiAgICAgIGlucHV0OiB0eXBlZi5tYXliZSh0eXBlZi5CdWZmZXJOKDApKSxcbiAgICAgIG5ldHdvcms6IHR5cGVmLm1heWJlKHR5cGVmLk9iamVjdCksXG4gICAgICBvdXRwdXQ6IHR5cGVmLm1heWJlKHR5cGVmLkJ1ZmZlck4oMjIpKSxcbiAgICAgIHB1YmtleTogdHlwZWYubWF5YmUoZWNjLmlzUG9pbnQpLFxuICAgICAgc2lnbmF0dXJlOiB0eXBlZi5tYXliZShic2NyaXB0LmlzQ2Fub25pY2FsU2NyaXB0U2lnbmF0dXJlKSxcbiAgICAgIHdpdG5lc3M6IHR5cGVmLm1heWJlKHR5cGVmLmFycmF5T2YodHlwZWYuQnVmZmVyKSksXG4gICAgfSxcbiAgICBhLFxuICApO1xuICBjb25zdCBfYWRkcmVzcyA9IGxhenkudmFsdWUoKCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IGJlY2gzMi5kZWNvZGUoYS5hZGRyZXNzKTtcbiAgICBjb25zdCB2ZXJzaW9uID0gcmVzdWx0LndvcmRzLnNoaWZ0KCk7XG4gICAgY29uc3QgZGF0YSA9IGJlY2gzMi5mcm9tV29yZHMocmVzdWx0LndvcmRzKTtcbiAgICByZXR1cm4ge1xuICAgICAgdmVyc2lvbixcbiAgICAgIHByZWZpeDogcmVzdWx0LnByZWZpeCxcbiAgICAgIGRhdGE6IEJ1ZmZlci5mcm9tKGRhdGEpLFxuICAgIH07XG4gIH0pO1xuICBjb25zdCBuZXR3b3JrID0gYS5uZXR3b3JrIHx8IG5ldHdvcmtzXzEuYml0Y29pbjtcbiAgY29uc3QgbyA9IHsgbmFtZTogJ3Ayd3BraCcsIG5ldHdvcmsgfTtcbiAgbGF6eS5wcm9wKG8sICdhZGRyZXNzJywgKCkgPT4ge1xuICAgIGlmICghby5oYXNoKSByZXR1cm47XG4gICAgY29uc3Qgd29yZHMgPSBiZWNoMzIudG9Xb3JkcyhvLmhhc2gpO1xuICAgIHdvcmRzLnVuc2hpZnQoMHgwMCk7XG4gICAgcmV0dXJuIGJlY2gzMi5lbmNvZGUobmV0d29yay5iZWNoMzIsIHdvcmRzKTtcbiAgfSk7XG4gIGxhenkucHJvcChvLCAnaGFzaCcsICgpID0+IHtcbiAgICBpZiAoYS5vdXRwdXQpIHJldHVybiBhLm91dHB1dC5zbGljZSgyLCAyMik7XG4gICAgaWYgKGEuYWRkcmVzcykgcmV0dXJuIF9hZGRyZXNzKCkuZGF0YTtcbiAgICBpZiAoYS5wdWJrZXkgfHwgby5wdWJrZXkpIHJldHVybiBiY3J5cHRvLmhhc2gxNjAoYS5wdWJrZXkgfHwgby5wdWJrZXkpO1xuICB9KTtcbiAgbGF6eS5wcm9wKG8sICdvdXRwdXQnLCAoKSA9PiB7XG4gICAgaWYgKCFvLmhhc2gpIHJldHVybjtcbiAgICByZXR1cm4gYnNjcmlwdC5jb21waWxlKFtPUFMuT1BfMCwgby5oYXNoXSk7XG4gIH0pO1xuICBsYXp5LnByb3AobywgJ3B1YmtleScsICgpID0+IHtcbiAgICBpZiAoYS5wdWJrZXkpIHJldHVybiBhLnB1YmtleTtcbiAgICBpZiAoIWEud2l0bmVzcykgcmV0dXJuO1xuICAgIHJldHVybiBhLndpdG5lc3NbMV07XG4gIH0pO1xuICBsYXp5LnByb3AobywgJ3NpZ25hdHVyZScsICgpID0+IHtcbiAgICBpZiAoIWEud2l0bmVzcykgcmV0dXJuO1xuICAgIHJldHVybiBhLndpdG5lc3NbMF07XG4gIH0pO1xuICBsYXp5LnByb3AobywgJ2lucHV0JywgKCkgPT4ge1xuICAgIGlmICghby53aXRuZXNzKSByZXR1cm47XG4gICAgcmV0dXJuIEVNUFRZX0JVRkZFUjtcbiAgfSk7XG4gIGxhenkucHJvcChvLCAnd2l0bmVzcycsICgpID0+IHtcbiAgICBpZiAoIWEucHVia2V5KSByZXR1cm47XG4gICAgaWYgKCFhLnNpZ25hdHVyZSkgcmV0dXJuO1xuICAgIHJldHVybiBbYS5zaWduYXR1cmUsIGEucHVia2V5XTtcbiAgfSk7XG4gIC8vIGV4dGVuZGVkIHZhbGlkYXRpb25cbiAgaWYgKG9wdHMudmFsaWRhdGUpIHtcbiAgICBsZXQgaGFzaCA9IEJ1ZmZlci5mcm9tKFtdKTtcbiAgICBpZiAoYS5hZGRyZXNzKSB7XG4gICAgICBpZiAobmV0d29yayAmJiBuZXR3b3JrLmJlY2gzMiAhPT0gX2FkZHJlc3MoKS5wcmVmaXgpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgcHJlZml4IG9yIE5ldHdvcmsgbWlzbWF0Y2gnKTtcbiAgICAgIGlmIChfYWRkcmVzcygpLnZlcnNpb24gIT09IDB4MDApXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgYWRkcmVzcyB2ZXJzaW9uJyk7XG4gICAgICBpZiAoX2FkZHJlc3MoKS5kYXRhLmxlbmd0aCAhPT0gMjApXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgYWRkcmVzcyBkYXRhJyk7XG4gICAgICBoYXNoID0gX2FkZHJlc3MoKS5kYXRhO1xuICAgIH1cbiAgICBpZiAoYS5oYXNoKSB7XG4gICAgICBpZiAoaGFzaC5sZW5ndGggPiAwICYmICFoYXNoLmVxdWFscyhhLmhhc2gpKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdIYXNoIG1pc21hdGNoJyk7XG4gICAgICBlbHNlIGhhc2ggPSBhLmhhc2g7XG4gICAgfVxuICAgIGlmIChhLm91dHB1dCkge1xuICAgICAgaWYgKFxuICAgICAgICBhLm91dHB1dC5sZW5ndGggIT09IDIyIHx8XG4gICAgICAgIGEub3V0cHV0WzBdICE9PSBPUFMuT1BfMCB8fFxuICAgICAgICBhLm91dHB1dFsxXSAhPT0gMHgxNFxuICAgICAgKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdPdXRwdXQgaXMgaW52YWxpZCcpO1xuICAgICAgaWYgKGhhc2gubGVuZ3RoID4gMCAmJiAhaGFzaC5lcXVhbHMoYS5vdXRwdXQuc2xpY2UoMikpKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdIYXNoIG1pc21hdGNoJyk7XG4gICAgICBlbHNlIGhhc2ggPSBhLm91dHB1dC5zbGljZSgyKTtcbiAgICB9XG4gICAgaWYgKGEucHVia2V5KSB7XG4gICAgICBjb25zdCBwa2ggPSBiY3J5cHRvLmhhc2gxNjAoYS5wdWJrZXkpO1xuICAgICAgaWYgKGhhc2gubGVuZ3RoID4gMCAmJiAhaGFzaC5lcXVhbHMocGtoKSlcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSGFzaCBtaXNtYXRjaCcpO1xuICAgICAgZWxzZSBoYXNoID0gcGtoO1xuICAgIH1cbiAgICBpZiAoYS53aXRuZXNzKSB7XG4gICAgICBpZiAoYS53aXRuZXNzLmxlbmd0aCAhPT0gMikgdGhyb3cgbmV3IFR5cGVFcnJvcignV2l0bmVzcyBpcyBpbnZhbGlkJyk7XG4gICAgICBpZiAoIWJzY3JpcHQuaXNDYW5vbmljYWxTY3JpcHRTaWduYXR1cmUoYS53aXRuZXNzWzBdKSlcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignV2l0bmVzcyBoYXMgaW52YWxpZCBzaWduYXR1cmUnKTtcbiAgICAgIGlmICghZWNjLmlzUG9pbnQoYS53aXRuZXNzWzFdKSlcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignV2l0bmVzcyBoYXMgaW52YWxpZCBwdWJrZXknKTtcbiAgICAgIGlmIChhLnNpZ25hdHVyZSAmJiAhYS5zaWduYXR1cmUuZXF1YWxzKGEud2l0bmVzc1swXSkpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1NpZ25hdHVyZSBtaXNtYXRjaCcpO1xuICAgICAgaWYgKGEucHVia2V5ICYmICFhLnB1YmtleS5lcXVhbHMoYS53aXRuZXNzWzFdKSlcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUHVia2V5IG1pc21hdGNoJyk7XG4gICAgICBjb25zdCBwa2ggPSBiY3J5cHRvLmhhc2gxNjAoYS53aXRuZXNzWzFdKTtcbiAgICAgIGlmIChoYXNoLmxlbmd0aCA+IDAgJiYgIWhhc2guZXF1YWxzKHBraCkpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0hhc2ggbWlzbWF0Y2gnKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24obywgYSk7XG59XG5leHBvcnRzLnAyd3BraCA9IHAyd3BraDtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIE9QX1JFVFVSTiB7YWEyMWE5ZWR9IHtjb21taXRtZW50fVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGJzY3JpcHQgPSByZXF1aXJlKCcuLi8uLi9zY3JpcHQnKTtcbmNvbnN0IHNjcmlwdF8xID0gcmVxdWlyZSgnLi4vLi4vc2NyaXB0Jyk7XG5jb25zdCB0eXBlcyA9IHJlcXVpcmUoJy4uLy4uL3R5cGVzJyk7XG5jb25zdCB0eXBlZm9yY2UgPSByZXF1aXJlKCd0eXBlZm9yY2UnKTtcbmNvbnN0IEhFQURFUiA9IEJ1ZmZlci5mcm9tKCdhYTIxYTllZCcsICdoZXgnKTtcbmZ1bmN0aW9uIGNoZWNrKHNjcmlwdCkge1xuICBjb25zdCBidWZmZXIgPSBic2NyaXB0LmNvbXBpbGUoc2NyaXB0KTtcbiAgcmV0dXJuIChcbiAgICBidWZmZXIubGVuZ3RoID4gMzcgJiZcbiAgICBidWZmZXJbMF0gPT09IHNjcmlwdF8xLk9QUy5PUF9SRVRVUk4gJiZcbiAgICBidWZmZXJbMV0gPT09IDB4MjQgJiZcbiAgICBidWZmZXIuc2xpY2UoMiwgNikuZXF1YWxzKEhFQURFUilcbiAgKTtcbn1cbmV4cG9ydHMuY2hlY2sgPSBjaGVjaztcbmNoZWNrLnRvSlNPTiA9ICgpID0+IHtcbiAgcmV0dXJuICdXaXRuZXNzIGNvbW1pdG1lbnQgb3V0cHV0Jztcbn07XG5mdW5jdGlvbiBlbmNvZGUoY29tbWl0bWVudCkge1xuICB0eXBlZm9yY2UodHlwZXMuSGFzaDI1NmJpdCwgY29tbWl0bWVudCk7XG4gIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSgzNik7XG4gIEhFQURFUi5jb3B5KGJ1ZmZlciwgMCk7XG4gIGNvbW1pdG1lbnQuY29weShidWZmZXIsIDQpO1xuICByZXR1cm4gYnNjcmlwdC5jb21waWxlKFtzY3JpcHRfMS5PUFMuT1BfUkVUVVJOLCBidWZmZXJdKTtcbn1cbmV4cG9ydHMuZW5jb2RlID0gZW5jb2RlO1xuZnVuY3Rpb24gZGVjb2RlKGJ1ZmZlcikge1xuICB0eXBlZm9yY2UoY2hlY2ssIGJ1ZmZlcik7XG4gIHJldHVybiBic2NyaXB0LmRlY29tcGlsZShidWZmZXIpWzFdLnNsaWNlKDQsIDM2KTtcbn1cbmV4cG9ydHMuZGVjb2RlID0gZGVjb2RlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYml0Y29pbiA9IHtcbiAgbWVzc2FnZVByZWZpeDogJ1xceDE4Qml0Y29pbiBTaWduZWQgTWVzc2FnZTpcXG4nLFxuICBiZWNoMzI6ICdiYycsXG4gIGJpcDMyOiB7XG4gICAgcHVibGljOiAweDA0ODhiMjFlLFxuICAgIHByaXZhdGU6IDB4MDQ4OGFkZTQsXG4gIH0sXG4gIHB1YktleUhhc2g6IDB4MDAsXG4gIHNjcmlwdEhhc2g6IDB4MDUsXG4gIHdpZjogMHg4MCxcbn07XG5leHBvcnRzLnJlZ3Rlc3QgPSB7XG4gIG1lc3NhZ2VQcmVmaXg6ICdcXHgxOEJpdGNvaW4gU2lnbmVkIE1lc3NhZ2U6XFxuJyxcbiAgYmVjaDMyOiAnYmNydCcsXG4gIGJpcDMyOiB7XG4gICAgcHVibGljOiAweDA0MzU4N2NmLFxuICAgIHByaXZhdGU6IDB4MDQzNTgzOTQsXG4gIH0sXG4gIHB1YktleUhhc2g6IDB4NmYsXG4gIHNjcmlwdEhhc2g6IDB4YzQsXG4gIHdpZjogMHhlZixcbn07XG5leHBvcnRzLnRlc3RuZXQgPSB7XG4gIG1lc3NhZ2VQcmVmaXg6ICdcXHgxOEJpdGNvaW4gU2lnbmVkIE1lc3NhZ2U6XFxuJyxcbiAgYmVjaDMyOiAndGInLFxuICBiaXAzMjoge1xuICAgIHB1YmxpYzogMHgwNDM1ODdjZixcbiAgICBwcml2YXRlOiAweDA0MzU4Mzk0LFxuICB9LFxuICBwdWJLZXlIYXNoOiAweDZmLFxuICBzY3JpcHRIYXNoOiAweGM0LFxuICB3aWY6IDB4ZWYsXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGlucHV0ID0gcmVxdWlyZSgnLi9pbnB1dCcpO1xuZXhwb3J0cy5pbnB1dCA9IGlucHV0O1xuY29uc3Qgb3V0cHV0ID0gcmVxdWlyZSgnLi9vdXRwdXQnKTtcbmV4cG9ydHMub3V0cHV0ID0gb3V0cHV0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gPHNjcmlwdFNpZz4ge3NlcmlhbGl6ZWQgc2NyaXB0UHViS2V5IHNjcmlwdH1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBic2NyaXB0ID0gcmVxdWlyZSgnLi4vLi4vc2NyaXB0Jyk7XG5jb25zdCB0eXBlZm9yY2UgPSByZXF1aXJlKCd0eXBlZm9yY2UnKTtcbmNvbnN0IHAybXMgPSByZXF1aXJlKCcuLi9tdWx0aXNpZycpO1xuY29uc3QgcDJwayA9IHJlcXVpcmUoJy4uL3B1YmtleScpO1xuY29uc3QgcDJwa2ggPSByZXF1aXJlKCcuLi9wdWJrZXloYXNoJyk7XG5mdW5jdGlvbiBjaGVjayhjaHVua3MsIGFsbG93SW5jb21wbGV0ZSkge1xuICB0eXBlZm9yY2UodHlwZWZvcmNlLkFycmF5LCBjaHVua3MpO1xuICBpZiAoY2h1bmtzLmxlbmd0aCA8IDEpIHJldHVybiBmYWxzZTtcbiAgY29uc3Qgd2l0bmVzc1NjcmlwdCA9IGNodW5rc1tjaHVua3MubGVuZ3RoIC0gMV07XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKHdpdG5lc3NTY3JpcHQpKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHdpdG5lc3NTY3JpcHRDaHVua3MgPSBic2NyaXB0LmRlY29tcGlsZSh3aXRuZXNzU2NyaXB0KTtcbiAgLy8gaXMgd2l0bmVzc1NjcmlwdCBhIHZhbGlkIHNjcmlwdD9cbiAgaWYgKCF3aXRuZXNzU2NyaXB0Q2h1bmtzIHx8IHdpdG5lc3NTY3JpcHRDaHVua3MubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHdpdG5lc3NSYXdTY3JpcHRTaWcgPSBic2NyaXB0LmNvbXBpbGUoY2h1bmtzLnNsaWNlKDAsIC0xKSk7XG4gIC8vIG1hdGNoIHR5cGVzXG4gIGlmIChcbiAgICBwMnBraC5pbnB1dC5jaGVjayh3aXRuZXNzUmF3U2NyaXB0U2lnKSAmJlxuICAgIHAycGtoLm91dHB1dC5jaGVjayh3aXRuZXNzU2NyaXB0Q2h1bmtzKVxuICApXG4gICAgcmV0dXJuIHRydWU7XG4gIGlmIChcbiAgICBwMm1zLmlucHV0LmNoZWNrKHdpdG5lc3NSYXdTY3JpcHRTaWcsIGFsbG93SW5jb21wbGV0ZSkgJiZcbiAgICBwMm1zLm91dHB1dC5jaGVjayh3aXRuZXNzU2NyaXB0Q2h1bmtzKVxuICApXG4gICAgcmV0dXJuIHRydWU7XG4gIGlmIChcbiAgICBwMnBrLmlucHV0LmNoZWNrKHdpdG5lc3NSYXdTY3JpcHRTaWcpICYmXG4gICAgcDJway5vdXRwdXQuY2hlY2sod2l0bmVzc1NjcmlwdENodW5rcylcbiAgKVxuICAgIHJldHVybiB0cnVlO1xuICByZXR1cm4gZmFsc2U7XG59XG5leHBvcnRzLmNoZWNrID0gY2hlY2s7XG5jaGVjay50b0pTT04gPSAoKSA9PiB7XG4gIHJldHVybiAnd2l0bmVzc1NjcmlwdEhhc2ggaW5wdXQnO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBvdXRwdXQgPSByZXF1aXJlKCcuL291dHB1dCcpO1xuZXhwb3J0cy5vdXRwdXQgPSBvdXRwdXQ7XG4iLCIndXNlIHN0cmljdCc7XG4vLyB7c2lnbmF0dXJlfVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGJzY3JpcHQgPSByZXF1aXJlKCcuLi8uLi9zY3JpcHQnKTtcbmZ1bmN0aW9uIGNoZWNrKHNjcmlwdCkge1xuICBjb25zdCBjaHVua3MgPSBic2NyaXB0LmRlY29tcGlsZShzY3JpcHQpO1xuICByZXR1cm4gY2h1bmtzLmxlbmd0aCA9PT0gMSAmJiBic2NyaXB0LmlzQ2Fub25pY2FsU2NyaXB0U2lnbmF0dXJlKGNodW5rc1swXSk7XG59XG5leHBvcnRzLmNoZWNrID0gY2hlY2s7XG5jaGVjay50b0pTT04gPSAoKSA9PiB7XG4gIHJldHVybiAncHViS2V5IGlucHV0Jztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgc2NyaXB0XzEgPSByZXF1aXJlKCcuL3NjcmlwdCcpO1xuY29uc3QgbXVsdGlzaWcgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy9tdWx0aXNpZycpO1xuY29uc3QgbnVsbERhdGEgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy9udWxsZGF0YScpO1xuY29uc3QgcHViS2V5ID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvcHVia2V5Jyk7XG5jb25zdCBwdWJLZXlIYXNoID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvcHVia2V5aGFzaCcpO1xuY29uc3Qgc2NyaXB0SGFzaCA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL3NjcmlwdGhhc2gnKTtcbmNvbnN0IHdpdG5lc3NDb21taXRtZW50ID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvd2l0bmVzc2NvbW1pdG1lbnQnKTtcbmNvbnN0IHdpdG5lc3NQdWJLZXlIYXNoID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvd2l0bmVzc3B1YmtleWhhc2gnKTtcbmNvbnN0IHdpdG5lc3NTY3JpcHRIYXNoID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvd2l0bmVzc3NjcmlwdGhhc2gnKTtcbmNvbnN0IHR5cGVzID0ge1xuICBQMk1TOiAnbXVsdGlzaWcnLFxuICBOT05TVEFOREFSRDogJ25vbnN0YW5kYXJkJyxcbiAgTlVMTERBVEE6ICdudWxsZGF0YScsXG4gIFAyUEs6ICdwdWJrZXknLFxuICBQMlBLSDogJ3B1YmtleWhhc2gnLFxuICBQMlNIOiAnc2NyaXB0aGFzaCcsXG4gIFAyV1BLSDogJ3dpdG5lc3NwdWJrZXloYXNoJyxcbiAgUDJXU0g6ICd3aXRuZXNzc2NyaXB0aGFzaCcsXG4gIFdJVE5FU1NfQ09NTUlUTUVOVDogJ3dpdG5lc3Njb21taXRtZW50Jyxcbn07XG5leHBvcnRzLnR5cGVzID0gdHlwZXM7XG5mdW5jdGlvbiBjbGFzc2lmeU91dHB1dChzY3JpcHQpIHtcbiAgaWYgKHdpdG5lc3NQdWJLZXlIYXNoLm91dHB1dC5jaGVjayhzY3JpcHQpKSByZXR1cm4gdHlwZXMuUDJXUEtIO1xuICBpZiAod2l0bmVzc1NjcmlwdEhhc2gub3V0cHV0LmNoZWNrKHNjcmlwdCkpIHJldHVybiB0eXBlcy5QMldTSDtcbiAgaWYgKHB1YktleUhhc2gub3V0cHV0LmNoZWNrKHNjcmlwdCkpIHJldHVybiB0eXBlcy5QMlBLSDtcbiAgaWYgKHNjcmlwdEhhc2gub3V0cHV0LmNoZWNrKHNjcmlwdCkpIHJldHVybiB0eXBlcy5QMlNIO1xuICAvLyBYWFg6IG9wdGltaXphdGlvbiwgYmVsb3cgZnVuY3Rpb25zIC5kZWNvbXBpbGUgYmVmb3JlIHVzZVxuICBjb25zdCBjaHVua3MgPSBzY3JpcHRfMS5kZWNvbXBpbGUoc2NyaXB0KTtcbiAgaWYgKCFjaHVua3MpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgc2NyaXB0Jyk7XG4gIGlmIChtdWx0aXNpZy5vdXRwdXQuY2hlY2soY2h1bmtzKSkgcmV0dXJuIHR5cGVzLlAyTVM7XG4gIGlmIChwdWJLZXkub3V0cHV0LmNoZWNrKGNodW5rcykpIHJldHVybiB0eXBlcy5QMlBLO1xuICBpZiAod2l0bmVzc0NvbW1pdG1lbnQub3V0cHV0LmNoZWNrKGNodW5rcykpIHJldHVybiB0eXBlcy5XSVRORVNTX0NPTU1JVE1FTlQ7XG4gIGlmIChudWxsRGF0YS5vdXRwdXQuY2hlY2soY2h1bmtzKSkgcmV0dXJuIHR5cGVzLk5VTExEQVRBO1xuICByZXR1cm4gdHlwZXMuTk9OU1RBTkRBUkQ7XG59XG5leHBvcnRzLm91dHB1dCA9IGNsYXNzaWZ5T3V0cHV0O1xuZnVuY3Rpb24gY2xhc3NpZnlJbnB1dChzY3JpcHQsIGFsbG93SW5jb21wbGV0ZSkge1xuICAvLyBYWFg6IG9wdGltaXphdGlvbiwgYmVsb3cgZnVuY3Rpb25zIC5kZWNvbXBpbGUgYmVmb3JlIHVzZVxuICBjb25zdCBjaHVua3MgPSBzY3JpcHRfMS5kZWNvbXBpbGUoc2NyaXB0KTtcbiAgaWYgKCFjaHVua3MpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgc2NyaXB0Jyk7XG4gIGlmIChwdWJLZXlIYXNoLmlucHV0LmNoZWNrKGNodW5rcykpIHJldHVybiB0eXBlcy5QMlBLSDtcbiAgaWYgKHNjcmlwdEhhc2guaW5wdXQuY2hlY2soY2h1bmtzLCBhbGxvd0luY29tcGxldGUpKSByZXR1cm4gdHlwZXMuUDJTSDtcbiAgaWYgKG11bHRpc2lnLmlucHV0LmNoZWNrKGNodW5rcywgYWxsb3dJbmNvbXBsZXRlKSkgcmV0dXJuIHR5cGVzLlAyTVM7XG4gIGlmIChwdWJLZXkuaW5wdXQuY2hlY2soY2h1bmtzKSkgcmV0dXJuIHR5cGVzLlAyUEs7XG4gIHJldHVybiB0eXBlcy5OT05TVEFOREFSRDtcbn1cbmV4cG9ydHMuaW5wdXQgPSBjbGFzc2lmeUlucHV0O1xuZnVuY3Rpb24gY2xhc3NpZnlXaXRuZXNzKHNjcmlwdCwgYWxsb3dJbmNvbXBsZXRlKSB7XG4gIC8vIFhYWDogb3B0aW1pemF0aW9uLCBiZWxvdyBmdW5jdGlvbnMgLmRlY29tcGlsZSBiZWZvcmUgdXNlXG4gIGNvbnN0IGNodW5rcyA9IHNjcmlwdF8xLmRlY29tcGlsZShzY3JpcHQpO1xuICBpZiAoIWNodW5rcykgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBzY3JpcHQnKTtcbiAgaWYgKHdpdG5lc3NQdWJLZXlIYXNoLmlucHV0LmNoZWNrKGNodW5rcykpIHJldHVybiB0eXBlcy5QMldQS0g7XG4gIGlmICh3aXRuZXNzU2NyaXB0SGFzaC5pbnB1dC5jaGVjayhjaHVua3MsIGFsbG93SW5jb21wbGV0ZSkpXG4gICAgcmV0dXJuIHR5cGVzLlAyV1NIO1xuICByZXR1cm4gdHlwZXMuTk9OU1RBTkRBUkQ7XG59XG5leHBvcnRzLndpdG5lc3MgPSBjbGFzc2lmeVdpdG5lc3M7XG4iLCIndXNlIHN0cmljdCc7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaW5wdXQgPSByZXF1aXJlKCcuL2lucHV0Jyk7XG5leHBvcnRzLmlucHV0ID0gaW5wdXQ7XG5jb25zdCBvdXRwdXQgPSByZXF1aXJlKCcuL291dHB1dCcpO1xuZXhwb3J0cy5vdXRwdXQgPSBvdXRwdXQ7XG4iLCIndXNlIHN0cmljdCc7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgTkVUV09SS1MgPSByZXF1aXJlKCcuL25ldHdvcmtzJyk7XG5jb25zdCB0eXBlcyA9IHJlcXVpcmUoJy4vdHlwZXMnKTtcbmNvbnN0IGVjYyA9IHJlcXVpcmUoJ3Rpbnktc2VjcDI1NmsxJyk7XG5jb25zdCByYW5kb21CeXRlcyA9IHJlcXVpcmUoJ3JhbmRvbWJ5dGVzJyk7XG5jb25zdCB0eXBlZm9yY2UgPSByZXF1aXJlKCd0eXBlZm9yY2UnKTtcbmNvbnN0IHdpZiA9IHJlcXVpcmUoJ3dpZicpO1xuY29uc3QgaXNPcHRpb25zID0gdHlwZWZvcmNlLm1heWJlKFxuICB0eXBlZm9yY2UuY29tcGlsZSh7XG4gICAgY29tcHJlc3NlZDogdHlwZXMubWF5YmUodHlwZXMuQm9vbGVhbiksXG4gICAgbmV0d29yazogdHlwZXMubWF5YmUodHlwZXMuTmV0d29yayksXG4gIH0pLFxuKTtcbmNsYXNzIEVDUGFpciB7XG4gIGNvbnN0cnVjdG9yKF9fRCwgX19RLCBvcHRpb25zKSB7XG4gICAgdGhpcy5fX0QgPSBfX0Q7XG4gICAgdGhpcy5fX1EgPSBfX1E7XG4gICAgdGhpcy5sb3dSID0gZmFsc2U7XG4gICAgaWYgKG9wdGlvbnMgPT09IHVuZGVmaW5lZCkgb3B0aW9ucyA9IHt9O1xuICAgIHRoaXMuY29tcHJlc3NlZCA9XG4gICAgICBvcHRpb25zLmNvbXByZXNzZWQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBvcHRpb25zLmNvbXByZXNzZWQ7XG4gICAgdGhpcy5uZXR3b3JrID0gb3B0aW9ucy5uZXR3b3JrIHx8IE5FVFdPUktTLmJpdGNvaW47XG4gICAgaWYgKF9fUSAhPT0gdW5kZWZpbmVkKSB0aGlzLl9fUSA9IGVjYy5wb2ludENvbXByZXNzKF9fUSwgdGhpcy5jb21wcmVzc2VkKTtcbiAgfVxuICBnZXQgcHJpdmF0ZUtleSgpIHtcbiAgICByZXR1cm4gdGhpcy5fX0Q7XG4gIH1cbiAgZ2V0IHB1YmxpY0tleSgpIHtcbiAgICBpZiAoIXRoaXMuX19RKSB0aGlzLl9fUSA9IGVjYy5wb2ludEZyb21TY2FsYXIodGhpcy5fX0QsIHRoaXMuY29tcHJlc3NlZCk7XG4gICAgcmV0dXJuIHRoaXMuX19RO1xuICB9XG4gIHRvV0lGKCkge1xuICAgIGlmICghdGhpcy5fX0QpIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBwcml2YXRlIGtleScpO1xuICAgIHJldHVybiB3aWYuZW5jb2RlKHRoaXMubmV0d29yay53aWYsIHRoaXMuX19ELCB0aGlzLmNvbXByZXNzZWQpO1xuICB9XG4gIHNpZ24oaGFzaCwgbG93Uikge1xuICAgIGlmICghdGhpcy5fX0QpIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBwcml2YXRlIGtleScpO1xuICAgIGlmIChsb3dSID09PSB1bmRlZmluZWQpIGxvd1IgPSB0aGlzLmxvd1I7XG4gICAgaWYgKGxvd1IgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gZWNjLnNpZ24oaGFzaCwgdGhpcy5fX0QpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgc2lnID0gZWNjLnNpZ24oaGFzaCwgdGhpcy5fX0QpO1xuICAgICAgY29uc3QgZXh0cmFEYXRhID0gQnVmZmVyLmFsbG9jKDMyLCAwKTtcbiAgICAgIGxldCBjb3VudGVyID0gMDtcbiAgICAgIC8vIGlmIGZpcnN0IHRyeSBpcyBsb3dSLCBza2lwIHRoZSBsb29wXG4gICAgICAvLyBmb3Igc2Vjb25kIHRyeSBhbmQgb24sIGFkZCBleHRyYSBlbnRyb3B5IGNvdW50aW5nIHVwXG4gICAgICB3aGlsZSAoc2lnWzBdID4gMHg3Zikge1xuICAgICAgICBjb3VudGVyKys7XG4gICAgICAgIGV4dHJhRGF0YS53cml0ZVVJbnRMRShjb3VudGVyLCAwLCA2KTtcbiAgICAgICAgc2lnID0gZWNjLnNpZ25XaXRoRW50cm9weShoYXNoLCB0aGlzLl9fRCwgZXh0cmFEYXRhKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzaWc7XG4gICAgfVxuICB9XG4gIHZlcmlmeShoYXNoLCBzaWduYXR1cmUpIHtcbiAgICByZXR1cm4gZWNjLnZlcmlmeShoYXNoLCB0aGlzLnB1YmxpY0tleSwgc2lnbmF0dXJlKTtcbiAgfVxufVxuZnVuY3Rpb24gZnJvbVByaXZhdGVLZXkoYnVmZmVyLCBvcHRpb25zKSB7XG4gIHR5cGVmb3JjZSh0eXBlcy5CdWZmZXIyNTZiaXQsIGJ1ZmZlcik7XG4gIGlmICghZWNjLmlzUHJpdmF0ZShidWZmZXIpKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1ByaXZhdGUga2V5IG5vdCBpbiByYW5nZSBbMSwgbiknKTtcbiAgdHlwZWZvcmNlKGlzT3B0aW9ucywgb3B0aW9ucyk7XG4gIHJldHVybiBuZXcgRUNQYWlyKGJ1ZmZlciwgdW5kZWZpbmVkLCBvcHRpb25zKTtcbn1cbmV4cG9ydHMuZnJvbVByaXZhdGVLZXkgPSBmcm9tUHJpdmF0ZUtleTtcbmZ1bmN0aW9uIGZyb21QdWJsaWNLZXkoYnVmZmVyLCBvcHRpb25zKSB7XG4gIHR5cGVmb3JjZShlY2MuaXNQb2ludCwgYnVmZmVyKTtcbiAgdHlwZWZvcmNlKGlzT3B0aW9ucywgb3B0aW9ucyk7XG4gIHJldHVybiBuZXcgRUNQYWlyKHVuZGVmaW5lZCwgYnVmZmVyLCBvcHRpb25zKTtcbn1cbmV4cG9ydHMuZnJvbVB1YmxpY0tleSA9IGZyb21QdWJsaWNLZXk7XG5mdW5jdGlvbiBmcm9tV0lGKHdpZlN0cmluZywgbmV0d29yaykge1xuICBjb25zdCBkZWNvZGVkID0gd2lmLmRlY29kZSh3aWZTdHJpbmcpO1xuICBjb25zdCB2ZXJzaW9uID0gZGVjb2RlZC52ZXJzaW9uO1xuICAvLyBsaXN0IG9mIG5ldHdvcmtzP1xuICBpZiAodHlwZXMuQXJyYXkobmV0d29yaykpIHtcbiAgICBuZXR3b3JrID0gbmV0d29ya1xuICAgICAgLmZpbHRlcih4ID0+IHtcbiAgICAgICAgcmV0dXJuIHZlcnNpb24gPT09IHgud2lmO1xuICAgICAgfSlcbiAgICAgIC5wb3AoKTtcbiAgICBpZiAoIW5ldHdvcmspIHRocm93IG5ldyBFcnJvcignVW5rbm93biBuZXR3b3JrIHZlcnNpb24nKTtcbiAgICAvLyBvdGhlcndpc2UsIGFzc3VtZSBhIG5ldHdvcmsgb2JqZWN0IChvciBkZWZhdWx0IHRvIGJpdGNvaW4pXG4gIH0gZWxzZSB7XG4gICAgbmV0d29yayA9IG5ldHdvcmsgfHwgTkVUV09SS1MuYml0Y29pbjtcbiAgICBpZiAodmVyc2lvbiAhPT0gbmV0d29yay53aWYpIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBuZXR3b3JrIHZlcnNpb24nKTtcbiAgfVxuICByZXR1cm4gZnJvbVByaXZhdGVLZXkoZGVjb2RlZC5wcml2YXRlS2V5LCB7XG4gICAgY29tcHJlc3NlZDogZGVjb2RlZC5jb21wcmVzc2VkLFxuICAgIG5ldHdvcms6IG5ldHdvcmssXG4gIH0pO1xufVxuZXhwb3J0cy5mcm9tV0lGID0gZnJvbVdJRjtcbmZ1bmN0aW9uIG1ha2VSYW5kb20ob3B0aW9ucykge1xuICB0eXBlZm9yY2UoaXNPcHRpb25zLCBvcHRpb25zKTtcbiAgaWYgKG9wdGlvbnMgPT09IHVuZGVmaW5lZCkgb3B0aW9ucyA9IHt9O1xuICBjb25zdCBybmcgPSBvcHRpb25zLnJuZyB8fCByYW5kb21CeXRlcztcbiAgbGV0IGQ7XG4gIGRvIHtcbiAgICBkID0gcm5nKDMyKTtcbiAgICB0eXBlZm9yY2UodHlwZXMuQnVmZmVyMjU2Yml0LCBkKTtcbiAgfSB3aGlsZSAoIWVjYy5pc1ByaXZhdGUoZCkpO1xuICByZXR1cm4gZnJvbVByaXZhdGVLZXkoZCwgb3B0aW9ucyk7XG59XG5leHBvcnRzLm1ha2VSYW5kb20gPSBtYWtlUmFuZG9tO1xuIiwiJ3VzZSBzdHJpY3QnO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IG5ldHdvcmtzXzEgPSByZXF1aXJlKCcuLi9uZXR3b3JrcycpO1xuY29uc3QgYnNjcmlwdCA9IHJlcXVpcmUoJy4uL3NjcmlwdCcpO1xuY29uc3QgbGF6eSA9IHJlcXVpcmUoJy4vbGF6eScpO1xuY29uc3QgT1BTID0gYnNjcmlwdC5PUFM7XG5jb25zdCB0eXBlZiA9IHJlcXVpcmUoJ3R5cGVmb3JjZScpO1xuY29uc3QgZWNjID0gcmVxdWlyZSgndGlueS1zZWNwMjU2azEnKTtcbmNvbnN0IE9QX0lOVF9CQVNFID0gT1BTLk9QX1JFU0VSVkVEOyAvLyBPUF8xIC0gMVxuZnVuY3Rpb24gc3RhY2tzRXF1YWwoYSwgYikge1xuICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBhLmV2ZXJ5KCh4LCBpKSA9PiB7XG4gICAgcmV0dXJuIHguZXF1YWxzKGJbaV0pO1xuICB9KTtcbn1cbi8vIGlucHV0OiBPUF8wIFtzaWduYXR1cmVzIC4uLl1cbi8vIG91dHB1dDogbSBbcHViS2V5cyAuLi5dIG4gT1BfQ0hFQ0tNVUxUSVNJR1xuZnVuY3Rpb24gcDJtcyhhLCBvcHRzKSB7XG4gIGlmIChcbiAgICAhYS5pbnB1dCAmJlxuICAgICFhLm91dHB1dCAmJlxuICAgICEoYS5wdWJrZXlzICYmIGEubSAhPT0gdW5kZWZpbmVkKSAmJlxuICAgICFhLnNpZ25hdHVyZXNcbiAgKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ05vdCBlbm91Z2ggZGF0YScpO1xuICBvcHRzID0gT2JqZWN0LmFzc2lnbih7IHZhbGlkYXRlOiB0cnVlIH0sIG9wdHMgfHwge30pO1xuICBmdW5jdGlvbiBpc0FjY2VwdGFibGVTaWduYXR1cmUoeCkge1xuICAgIHJldHVybiAoXG4gICAgICBic2NyaXB0LmlzQ2Fub25pY2FsU2NyaXB0U2lnbmF0dXJlKHgpIHx8XG4gICAgICAob3B0cy5hbGxvd0luY29tcGxldGUgJiYgeCA9PT0gT1BTLk9QXzApICE9PSB1bmRlZmluZWRcbiAgICApO1xuICB9XG4gIHR5cGVmKFxuICAgIHtcbiAgICAgIG5ldHdvcms6IHR5cGVmLm1heWJlKHR5cGVmLk9iamVjdCksXG4gICAgICBtOiB0eXBlZi5tYXliZSh0eXBlZi5OdW1iZXIpLFxuICAgICAgbjogdHlwZWYubWF5YmUodHlwZWYuTnVtYmVyKSxcbiAgICAgIG91dHB1dDogdHlwZWYubWF5YmUodHlwZWYuQnVmZmVyKSxcbiAgICAgIHB1YmtleXM6IHR5cGVmLm1heWJlKHR5cGVmLmFycmF5T2YoZWNjLmlzUG9pbnQpKSxcbiAgICAgIHNpZ25hdHVyZXM6IHR5cGVmLm1heWJlKHR5cGVmLmFycmF5T2YoaXNBY2NlcHRhYmxlU2lnbmF0dXJlKSksXG4gICAgICBpbnB1dDogdHlwZWYubWF5YmUodHlwZWYuQnVmZmVyKSxcbiAgICB9LFxuICAgIGEsXG4gICk7XG4gIGNvbnN0IG5ldHdvcmsgPSBhLm5ldHdvcmsgfHwgbmV0d29ya3NfMS5iaXRjb2luO1xuICBjb25zdCBvID0geyBuZXR3b3JrIH07XG4gIGxldCBjaHVua3MgPSBbXTtcbiAgbGV0IGRlY29kZWQgPSBmYWxzZTtcbiAgZnVuY3Rpb24gZGVjb2RlKG91dHB1dCkge1xuICAgIGlmIChkZWNvZGVkKSByZXR1cm47XG4gICAgZGVjb2RlZCA9IHRydWU7XG4gICAgY2h1bmtzID0gYnNjcmlwdC5kZWNvbXBpbGUob3V0cHV0KTtcbiAgICBvLm0gPSBjaHVua3NbMF0gLSBPUF9JTlRfQkFTRTtcbiAgICBvLm4gPSBjaHVua3NbY2h1bmtzLmxlbmd0aCAtIDJdIC0gT1BfSU5UX0JBU0U7XG4gICAgby5wdWJrZXlzID0gY2h1bmtzLnNsaWNlKDEsIC0yKTtcbiAgfVxuICBsYXp5LnByb3AobywgJ291dHB1dCcsICgpID0+IHtcbiAgICBpZiAoIWEubSkgcmV0dXJuO1xuICAgIGlmICghby5uKSByZXR1cm47XG4gICAgaWYgKCFhLnB1YmtleXMpIHJldHVybjtcbiAgICByZXR1cm4gYnNjcmlwdC5jb21waWxlKFxuICAgICAgW10uY29uY2F0KFxuICAgICAgICBPUF9JTlRfQkFTRSArIGEubSxcbiAgICAgICAgYS5wdWJrZXlzLFxuICAgICAgICBPUF9JTlRfQkFTRSArIG8ubixcbiAgICAgICAgT1BTLk9QX0NIRUNLTVVMVElTSUcsXG4gICAgICApLFxuICAgICk7XG4gIH0pO1xuICBsYXp5LnByb3AobywgJ20nLCAoKSA9PiB7XG4gICAgaWYgKCFvLm91dHB1dCkgcmV0dXJuO1xuICAgIGRlY29kZShvLm91dHB1dCk7XG4gICAgcmV0dXJuIG8ubTtcbiAgfSk7XG4gIGxhenkucHJvcChvLCAnbicsICgpID0+IHtcbiAgICBpZiAoIW8ucHVia2V5cykgcmV0dXJuO1xuICAgIHJldHVybiBvLnB1YmtleXMubGVuZ3RoO1xuICB9KTtcbiAgbGF6eS5wcm9wKG8sICdwdWJrZXlzJywgKCkgPT4ge1xuICAgIGlmICghYS5vdXRwdXQpIHJldHVybjtcbiAgICBkZWNvZGUoYS5vdXRwdXQpO1xuICAgIHJldHVybiBvLnB1YmtleXM7XG4gIH0pO1xuICBsYXp5LnByb3AobywgJ3NpZ25hdHVyZXMnLCAoKSA9PiB7XG4gICAgaWYgKCFhLmlucHV0KSByZXR1cm47XG4gICAgcmV0dXJuIGJzY3JpcHQuZGVjb21waWxlKGEuaW5wdXQpLnNsaWNlKDEpO1xuICB9KTtcbiAgbGF6eS5wcm9wKG8sICdpbnB1dCcsICgpID0+IHtcbiAgICBpZiAoIWEuc2lnbmF0dXJlcykgcmV0dXJuO1xuICAgIHJldHVybiBic2NyaXB0LmNvbXBpbGUoW09QUy5PUF8wXS5jb25jYXQoYS5zaWduYXR1cmVzKSk7XG4gIH0pO1xuICBsYXp5LnByb3AobywgJ3dpdG5lc3MnLCAoKSA9PiB7XG4gICAgaWYgKCFvLmlucHV0KSByZXR1cm47XG4gICAgcmV0dXJuIFtdO1xuICB9KTtcbiAgbGF6eS5wcm9wKG8sICduYW1lJywgKCkgPT4ge1xuICAgIGlmICghby5tIHx8ICFvLm4pIHJldHVybjtcbiAgICByZXR1cm4gYHAybXMoJHtvLm19IG9mICR7by5ufSlgO1xuICB9KTtcbiAgLy8gZXh0ZW5kZWQgdmFsaWRhdGlvblxuICBpZiAob3B0cy52YWxpZGF0ZSkge1xuICAgIGlmIChhLm91dHB1dCkge1xuICAgICAgZGVjb2RlKGEub3V0cHV0KTtcbiAgICAgIGlmICghdHlwZWYuTnVtYmVyKGNodW5rc1swXSkpIHRocm93IG5ldyBUeXBlRXJyb3IoJ091dHB1dCBpcyBpbnZhbGlkJyk7XG4gICAgICBpZiAoIXR5cGVmLk51bWJlcihjaHVua3NbY2h1bmtzLmxlbmd0aCAtIDJdKSlcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT3V0cHV0IGlzIGludmFsaWQnKTtcbiAgICAgIGlmIChjaHVua3NbY2h1bmtzLmxlbmd0aCAtIDFdICE9PSBPUFMuT1BfQ0hFQ0tNVUxUSVNJRylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT3V0cHV0IGlzIGludmFsaWQnKTtcbiAgICAgIGlmIChvLm0gPD0gMCB8fCBvLm4gPiAxNiB8fCBvLm0gPiBvLm4gfHwgby5uICE9PSBjaHVua3MubGVuZ3RoIC0gMylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT3V0cHV0IGlzIGludmFsaWQnKTtcbiAgICAgIGlmICghby5wdWJrZXlzLmV2ZXJ5KHggPT4gZWNjLmlzUG9pbnQoeCkpKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdPdXRwdXQgaXMgaW52YWxpZCcpO1xuICAgICAgaWYgKGEubSAhPT0gdW5kZWZpbmVkICYmIGEubSAhPT0gby5tKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdtIG1pc21hdGNoJyk7XG4gICAgICBpZiAoYS5uICE9PSB1bmRlZmluZWQgJiYgYS5uICE9PSBvLm4pIHRocm93IG5ldyBUeXBlRXJyb3IoJ24gbWlzbWF0Y2gnKTtcbiAgICAgIGlmIChhLnB1YmtleXMgJiYgIXN0YWNrc0VxdWFsKGEucHVia2V5cywgby5wdWJrZXlzKSlcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUHVia2V5cyBtaXNtYXRjaCcpO1xuICAgIH1cbiAgICBpZiAoYS5wdWJrZXlzKSB7XG4gICAgICBpZiAoYS5uICE9PSB1bmRlZmluZWQgJiYgYS5uICE9PSBhLnB1YmtleXMubGVuZ3RoKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQdWJrZXkgY291bnQgbWlzbWF0Y2gnKTtcbiAgICAgIG8ubiA9IGEucHVia2V5cy5sZW5ndGg7XG4gICAgICBpZiAoby5uIDwgby5tKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdQdWJrZXkgY291bnQgY2Fubm90IGJlIGxlc3MgdGhhbiBtJyk7XG4gICAgfVxuICAgIGlmIChhLnNpZ25hdHVyZXMpIHtcbiAgICAgIGlmIChhLnNpZ25hdHVyZXMubGVuZ3RoIDwgby5tKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdOb3QgZW5vdWdoIHNpZ25hdHVyZXMgcHJvdmlkZWQnKTtcbiAgICAgIGlmIChhLnNpZ25hdHVyZXMubGVuZ3RoID4gby5tKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUb28gbWFueSBzaWduYXR1cmVzIHByb3ZpZGVkJyk7XG4gICAgfVxuICAgIGlmIChhLmlucHV0KSB7XG4gICAgICBpZiAoYS5pbnB1dFswXSAhPT0gT1BTLk9QXzApIHRocm93IG5ldyBUeXBlRXJyb3IoJ0lucHV0IGlzIGludmFsaWQnKTtcbiAgICAgIGlmIChcbiAgICAgICAgby5zaWduYXR1cmVzLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAhby5zaWduYXR1cmVzLmV2ZXJ5KGlzQWNjZXB0YWJsZVNpZ25hdHVyZSlcbiAgICAgIClcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW5wdXQgaGFzIGludmFsaWQgc2lnbmF0dXJlKHMpJyk7XG4gICAgICBpZiAoYS5zaWduYXR1cmVzICYmICFzdGFja3NFcXVhbChhLnNpZ25hdHVyZXMsIG8uc2lnbmF0dXJlcykpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1NpZ25hdHVyZSBtaXNtYXRjaCcpO1xuICAgICAgaWYgKGEubSAhPT0gdW5kZWZpbmVkICYmIGEubSAhPT0gYS5zaWduYXR1cmVzLmxlbmd0aClcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignU2lnbmF0dXJlIGNvdW50IG1pc21hdGNoJyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBPYmplY3QuYXNzaWduKG8sIGEpO1xufVxuZXhwb3J0cy5wMm1zID0gcDJtcztcbiIsIid1c2Ugc3RyaWN0Jztcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBidWZmZXJ1dGlscyA9IHJlcXVpcmUoJy4vYnVmZmVydXRpbHMnKTtcbmNvbnN0IGJ1ZmZlcnV0aWxzXzEgPSByZXF1aXJlKCcuL2J1ZmZlcnV0aWxzJyk7XG5jb25zdCBiY3J5cHRvID0gcmVxdWlyZSgnLi9jcnlwdG8nKTtcbmNvbnN0IGJzY3JpcHQgPSByZXF1aXJlKCcuL3NjcmlwdCcpO1xuY29uc3Qgc2NyaXB0XzEgPSByZXF1aXJlKCcuL3NjcmlwdCcpO1xuY29uc3QgdHlwZXMgPSByZXF1aXJlKCcuL3R5cGVzJyk7XG5jb25zdCB0eXBlZm9yY2UgPSByZXF1aXJlKCd0eXBlZm9yY2UnKTtcbmNvbnN0IHZhcnVpbnQgPSByZXF1aXJlKCd2YXJ1aW50LWJpdGNvaW4nKTtcbmZ1bmN0aW9uIHZhclNsaWNlU2l6ZShzb21lU2NyaXB0KSB7XG4gIGNvbnN0IGxlbmd0aCA9IHNvbWVTY3JpcHQubGVuZ3RoO1xuICByZXR1cm4gdmFydWludC5lbmNvZGluZ0xlbmd0aChsZW5ndGgpICsgbGVuZ3RoO1xufVxuZnVuY3Rpb24gdmVjdG9yU2l6ZShzb21lVmVjdG9yKSB7XG4gIGNvbnN0IGxlbmd0aCA9IHNvbWVWZWN0b3IubGVuZ3RoO1xuICByZXR1cm4gKFxuICAgIHZhcnVpbnQuZW5jb2RpbmdMZW5ndGgobGVuZ3RoKSArXG4gICAgc29tZVZlY3Rvci5yZWR1Y2UoKHN1bSwgd2l0bmVzcykgPT4ge1xuICAgICAgcmV0dXJuIHN1bSArIHZhclNsaWNlU2l6ZSh3aXRuZXNzKTtcbiAgICB9LCAwKVxuICApO1xufVxuY29uc3QgRU1QVFlfU0NSSVBUID0gQnVmZmVyLmFsbG9jVW5zYWZlKDApO1xuY29uc3QgRU1QVFlfV0lUTkVTUyA9IFtdO1xuY29uc3QgWkVSTyA9IEJ1ZmZlci5mcm9tKFxuICAnMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCcsXG4gICdoZXgnLFxuKTtcbmNvbnN0IE9ORSA9IEJ1ZmZlci5mcm9tKFxuICAnMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMScsXG4gICdoZXgnLFxuKTtcbmNvbnN0IFZBTFVFX1VJTlQ2NF9NQVggPSBCdWZmZXIuZnJvbSgnZmZmZmZmZmZmZmZmZmZmZicsICdoZXgnKTtcbmNvbnN0IEJMQU5LX09VVFBVVCA9IHtcbiAgc2NyaXB0OiBFTVBUWV9TQ1JJUFQsXG4gIHZhbHVlQnVmZmVyOiBWQUxVRV9VSU5UNjRfTUFYLFxufTtcbmZ1bmN0aW9uIGlzT3V0cHV0KG91dCkge1xuICByZXR1cm4gb3V0LnZhbHVlICE9PSB1bmRlZmluZWQ7XG59XG5jbGFzcyBUcmFuc2FjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudmVyc2lvbiA9IDE7XG4gICAgdGhpcy5sb2NrdGltZSA9IDA7XG4gICAgdGhpcy5pbnMgPSBbXTtcbiAgICB0aGlzLm91dHMgPSBbXTtcbiAgfVxuICBzdGF0aWMgZnJvbUJ1ZmZlcihidWZmZXIsIF9OT19TVFJJQ1QpIHtcbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICBmdW5jdGlvbiByZWFkU2xpY2Uobikge1xuICAgICAgb2Zmc2V0ICs9IG47XG4gICAgICByZXR1cm4gYnVmZmVyLnNsaWNlKG9mZnNldCAtIG4sIG9mZnNldCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlYWRVSW50MzIoKSB7XG4gICAgICBjb25zdCBpID0gYnVmZmVyLnJlYWRVSW50MzJMRShvZmZzZXQpO1xuICAgICAgb2Zmc2V0ICs9IDQ7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVhZEludDMyKCkge1xuICAgICAgY29uc3QgaSA9IGJ1ZmZlci5yZWFkSW50MzJMRShvZmZzZXQpO1xuICAgICAgb2Zmc2V0ICs9IDQ7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVhZFVJbnQ2NCgpIHtcbiAgICAgIGNvbnN0IGkgPSBidWZmZXJ1dGlscy5yZWFkVUludDY0TEUoYnVmZmVyLCBvZmZzZXQpO1xuICAgICAgb2Zmc2V0ICs9IDg7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVhZFZhckludCgpIHtcbiAgICAgIGNvbnN0IHZpID0gdmFydWludC5kZWNvZGUoYnVmZmVyLCBvZmZzZXQpO1xuICAgICAgb2Zmc2V0ICs9IHZhcnVpbnQuZGVjb2RlLmJ5dGVzO1xuICAgICAgcmV0dXJuIHZpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZWFkVmFyU2xpY2UoKSB7XG4gICAgICByZXR1cm4gcmVhZFNsaWNlKHJlYWRWYXJJbnQoKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlYWRWZWN0b3IoKSB7XG4gICAgICBjb25zdCBjb3VudCA9IHJlYWRWYXJJbnQoKTtcbiAgICAgIGNvbnN0IHZlY3RvciA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB2ZWN0b3IucHVzaChyZWFkVmFyU2xpY2UoKSk7XG4gICAgICByZXR1cm4gdmVjdG9yO1xuICAgIH1cbiAgICBjb25zdCB0eCA9IG5ldyBUcmFuc2FjdGlvbigpO1xuICAgIHR4LnZlcnNpb24gPSByZWFkSW50MzIoKTtcbiAgICBjb25zdCBtYXJrZXIgPSBidWZmZXIucmVhZFVJbnQ4KG9mZnNldCk7XG4gICAgY29uc3QgZmxhZyA9IGJ1ZmZlci5yZWFkVUludDgob2Zmc2V0ICsgMSk7XG4gICAgbGV0IGhhc1dpdG5lc3NlcyA9IGZhbHNlO1xuICAgIGlmIChcbiAgICAgIG1hcmtlciA9PT0gVHJhbnNhY3Rpb24uQURWQU5DRURfVFJBTlNBQ1RJT05fTUFSS0VSICYmXG4gICAgICBmbGFnID09PSBUcmFuc2FjdGlvbi5BRFZBTkNFRF9UUkFOU0FDVElPTl9GTEFHXG4gICAgKSB7XG4gICAgICBvZmZzZXQgKz0gMjtcbiAgICAgIGhhc1dpdG5lc3NlcyA9IHRydWU7XG4gICAgfVxuICAgIGNvbnN0IHZpbkxlbiA9IHJlYWRWYXJJbnQoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZpbkxlbjsgKytpKSB7XG4gICAgICB0eC5pbnMucHVzaCh7XG4gICAgICAgIGhhc2g6IHJlYWRTbGljZSgzMiksXG4gICAgICAgIGluZGV4OiByZWFkVUludDMyKCksXG4gICAgICAgIHNjcmlwdDogcmVhZFZhclNsaWNlKCksXG4gICAgICAgIHNlcXVlbmNlOiByZWFkVUludDMyKCksXG4gICAgICAgIHdpdG5lc3M6IEVNUFRZX1dJVE5FU1MsXG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3Qgdm91dExlbiA9IHJlYWRWYXJJbnQoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZvdXRMZW47ICsraSkge1xuICAgICAgdHgub3V0cy5wdXNoKHtcbiAgICAgICAgdmFsdWU6IHJlYWRVSW50NjQoKSxcbiAgICAgICAgc2NyaXB0OiByZWFkVmFyU2xpY2UoKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoaGFzV2l0bmVzc2VzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZpbkxlbjsgKytpKSB7XG4gICAgICAgIHR4Lmluc1tpXS53aXRuZXNzID0gcmVhZFZlY3RvcigpO1xuICAgICAgfVxuICAgICAgLy8gd2FzIHRoaXMgcG9pbnRsZXNzP1xuICAgICAgaWYgKCF0eC5oYXNXaXRuZXNzZXMoKSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmFuc2FjdGlvbiBoYXMgc3VwZXJmbHVvdXMgd2l0bmVzcyBkYXRhJyk7XG4gICAgfVxuICAgIHR4LmxvY2t0aW1lID0gcmVhZFVJbnQzMigpO1xuICAgIGlmIChfTk9fU1RSSUNUKSByZXR1cm4gdHg7XG4gICAgaWYgKG9mZnNldCAhPT0gYnVmZmVyLmxlbmd0aClcbiAgICAgIHRocm93IG5ldyBFcnJvcignVHJhbnNhY3Rpb24gaGFzIHVuZXhwZWN0ZWQgZGF0YScpO1xuICAgIHJldHVybiB0eDtcbiAgfVxuICBzdGF0aWMgZnJvbUhleChoZXgpIHtcbiAgICByZXR1cm4gVHJhbnNhY3Rpb24uZnJvbUJ1ZmZlcihCdWZmZXIuZnJvbShoZXgsICdoZXgnKSwgZmFsc2UpO1xuICB9XG4gIHN0YXRpYyBpc0NvaW5iYXNlSGFzaChidWZmZXIpIHtcbiAgICB0eXBlZm9yY2UodHlwZXMuSGFzaDI1NmJpdCwgYnVmZmVyKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyArK2kpIHtcbiAgICAgIGlmIChidWZmZXJbaV0gIT09IDApIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaXNDb2luYmFzZSgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5pbnMubGVuZ3RoID09PSAxICYmIFRyYW5zYWN0aW9uLmlzQ29pbmJhc2VIYXNoKHRoaXMuaW5zWzBdLmhhc2gpXG4gICAgKTtcbiAgfVxuICBhZGRJbnB1dChoYXNoLCBpbmRleCwgc2VxdWVuY2UsIHNjcmlwdFNpZykge1xuICAgIHR5cGVmb3JjZShcbiAgICAgIHR5cGVzLnR1cGxlKFxuICAgICAgICB0eXBlcy5IYXNoMjU2Yml0LFxuICAgICAgICB0eXBlcy5VSW50MzIsXG4gICAgICAgIHR5cGVzLm1heWJlKHR5cGVzLlVJbnQzMiksXG4gICAgICAgIHR5cGVzLm1heWJlKHR5cGVzLkJ1ZmZlciksXG4gICAgICApLFxuICAgICAgYXJndW1lbnRzLFxuICAgICk7XG4gICAgaWYgKHR5cGVzLk51bGwoc2VxdWVuY2UpKSB7XG4gICAgICBzZXF1ZW5jZSA9IFRyYW5zYWN0aW9uLkRFRkFVTFRfU0VRVUVOQ0U7XG4gICAgfVxuICAgIC8vIEFkZCB0aGUgaW5wdXQgYW5kIHJldHVybiB0aGUgaW5wdXQncyBpbmRleFxuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmlucy5wdXNoKHtcbiAgICAgICAgaGFzaCxcbiAgICAgICAgaW5kZXgsXG4gICAgICAgIHNjcmlwdDogc2NyaXB0U2lnIHx8IEVNUFRZX1NDUklQVCxcbiAgICAgICAgc2VxdWVuY2U6IHNlcXVlbmNlLFxuICAgICAgICB3aXRuZXNzOiBFTVBUWV9XSVRORVNTLFxuICAgICAgfSkgLSAxXG4gICAgKTtcbiAgfVxuICBhZGRPdXRwdXQoc2NyaXB0UHViS2V5LCB2YWx1ZSkge1xuICAgIHR5cGVmb3JjZSh0eXBlcy50dXBsZSh0eXBlcy5CdWZmZXIsIHR5cGVzLlNhdG9zaGkpLCBhcmd1bWVudHMpO1xuICAgIC8vIEFkZCB0aGUgb3V0cHV0IGFuZCByZXR1cm4gdGhlIG91dHB1dCdzIGluZGV4XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMub3V0cy5wdXNoKHtcbiAgICAgICAgc2NyaXB0OiBzY3JpcHRQdWJLZXksXG4gICAgICAgIHZhbHVlLFxuICAgICAgfSkgLSAxXG4gICAgKTtcbiAgfVxuICBoYXNXaXRuZXNzZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5zLnNvbWUoeCA9PiB7XG4gICAgICByZXR1cm4geC53aXRuZXNzLmxlbmd0aCAhPT0gMDtcbiAgICB9KTtcbiAgfVxuICB3ZWlnaHQoKSB7XG4gICAgY29uc3QgYmFzZSA9IHRoaXMuX19ieXRlTGVuZ3RoKGZhbHNlKTtcbiAgICBjb25zdCB0b3RhbCA9IHRoaXMuX19ieXRlTGVuZ3RoKHRydWUpO1xuICAgIHJldHVybiBiYXNlICogMyArIHRvdGFsO1xuICB9XG4gIHZpcnR1YWxTaXplKCkge1xuICAgIHJldHVybiBNYXRoLmNlaWwodGhpcy53ZWlnaHQoKSAvIDQpO1xuICB9XG4gIGJ5dGVMZW5ndGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19ieXRlTGVuZ3RoKHRydWUpO1xuICB9XG4gIGNsb25lKCkge1xuICAgIGNvbnN0IG5ld1R4ID0gbmV3IFRyYW5zYWN0aW9uKCk7XG4gICAgbmV3VHgudmVyc2lvbiA9IHRoaXMudmVyc2lvbjtcbiAgICBuZXdUeC5sb2NrdGltZSA9IHRoaXMubG9ja3RpbWU7XG4gICAgbmV3VHguaW5zID0gdGhpcy5pbnMubWFwKHR4SW4gPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaGFzaDogdHhJbi5oYXNoLFxuICAgICAgICBpbmRleDogdHhJbi5pbmRleCxcbiAgICAgICAgc2NyaXB0OiB0eEluLnNjcmlwdCxcbiAgICAgICAgc2VxdWVuY2U6IHR4SW4uc2VxdWVuY2UsXG4gICAgICAgIHdpdG5lc3M6IHR4SW4ud2l0bmVzcyxcbiAgICAgIH07XG4gICAgfSk7XG4gICAgbmV3VHgub3V0cyA9IHRoaXMub3V0cy5tYXAodHhPdXQgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2NyaXB0OiB0eE91dC5zY3JpcHQsXG4gICAgICAgIHZhbHVlOiB0eE91dC52YWx1ZSxcbiAgICAgIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ld1R4O1xuICB9XG4gIC8qKlxuICAgKiBIYXNoIHRyYW5zYWN0aW9uIGZvciBzaWduaW5nIGEgc3BlY2lmaWMgaW5wdXQuXG4gICAqXG4gICAqIEJpdGNvaW4gdXNlcyBhIGRpZmZlcmVudCBoYXNoIGZvciBlYWNoIHNpZ25lZCB0cmFuc2FjdGlvbiBpbnB1dC5cbiAgICogVGhpcyBtZXRob2QgY29waWVzIHRoZSB0cmFuc2FjdGlvbiwgbWFrZXMgdGhlIG5lY2Vzc2FyeSBjaGFuZ2VzIGJhc2VkIG9uIHRoZVxuICAgKiBoYXNoVHlwZSwgYW5kIHRoZW4gaGFzaGVzIHRoZSByZXN1bHQuXG4gICAqIFRoaXMgaGFzaCBjYW4gdGhlbiBiZSB1c2VkIHRvIHNpZ24gdGhlIHByb3ZpZGVkIHRyYW5zYWN0aW9uIGlucHV0LlxuICAgKi9cbiAgaGFzaEZvclNpZ25hdHVyZShpbkluZGV4LCBwcmV2T3V0U2NyaXB0LCBoYXNoVHlwZSkge1xuICAgIHR5cGVmb3JjZShcbiAgICAgIHR5cGVzLnR1cGxlKHR5cGVzLlVJbnQzMiwgdHlwZXMuQnVmZmVyLCAvKiB0eXBlcy5VSW50OCAqLyB0eXBlcy5OdW1iZXIpLFxuICAgICAgYXJndW1lbnRzLFxuICAgICk7XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2JpdGNvaW4vYml0Y29pbi9ibG9iL21hc3Rlci9zcmMvdGVzdC9zaWdoYXNoX3Rlc3RzLmNwcCNMMjlcbiAgICBpZiAoaW5JbmRleCA+PSB0aGlzLmlucy5sZW5ndGgpIHJldHVybiBPTkU7XG4gICAgLy8gaWdub3JlIE9QX0NPREVTRVBBUkFUT1JcbiAgICBjb25zdCBvdXJTY3JpcHQgPSBic2NyaXB0LmNvbXBpbGUoXG4gICAgICBic2NyaXB0LmRlY29tcGlsZShwcmV2T3V0U2NyaXB0KS5maWx0ZXIoeCA9PiB7XG4gICAgICAgIHJldHVybiB4ICE9PSBzY3JpcHRfMS5PUFMuT1BfQ09ERVNFUEFSQVRPUjtcbiAgICAgIH0pLFxuICAgICk7XG4gICAgY29uc3QgdHhUbXAgPSB0aGlzLmNsb25lKCk7XG4gICAgLy8gU0lHSEFTSF9OT05FOiBpZ25vcmUgYWxsIG91dHB1dHM/ICh3aWxkY2FyZCBwYXllZSlcbiAgICBpZiAoKGhhc2hUeXBlICYgMHgxZikgPT09IFRyYW5zYWN0aW9uLlNJR0hBU0hfTk9ORSkge1xuICAgICAgdHhUbXAub3V0cyA9IFtdO1xuICAgICAgLy8gaWdub3JlIHNlcXVlbmNlIG51bWJlcnMgKGV4Y2VwdCBhdCBpbkluZGV4KVxuICAgICAgdHhUbXAuaW5zLmZvckVhY2goKGlucHV0LCBpKSA9PiB7XG4gICAgICAgIGlmIChpID09PSBpbkluZGV4KSByZXR1cm47XG4gICAgICAgIGlucHV0LnNlcXVlbmNlID0gMDtcbiAgICAgIH0pO1xuICAgICAgLy8gU0lHSEFTSF9TSU5HTEU6IGlnbm9yZSBhbGwgb3V0cHV0cywgZXhjZXB0IGF0IHRoZSBzYW1lIGluZGV4P1xuICAgIH0gZWxzZSBpZiAoKGhhc2hUeXBlICYgMHgxZikgPT09IFRyYW5zYWN0aW9uLlNJR0hBU0hfU0lOR0xFKSB7XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYml0Y29pbi9iaXRjb2luL2Jsb2IvbWFzdGVyL3NyYy90ZXN0L3NpZ2hhc2hfdGVzdHMuY3BwI0w2MFxuICAgICAgaWYgKGluSW5kZXggPj0gdGhpcy5vdXRzLmxlbmd0aCkgcmV0dXJuIE9ORTtcbiAgICAgIC8vIHRydW5jYXRlIG91dHB1dHMgYWZ0ZXJcbiAgICAgIHR4VG1wLm91dHMubGVuZ3RoID0gaW5JbmRleCArIDE7XG4gICAgICAvLyBcImJsYW5rXCIgb3V0cHV0cyBiZWZvcmVcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5JbmRleDsgaSsrKSB7XG4gICAgICAgIHR4VG1wLm91dHNbaV0gPSBCTEFOS19PVVRQVVQ7XG4gICAgICB9XG4gICAgICAvLyBpZ25vcmUgc2VxdWVuY2UgbnVtYmVycyAoZXhjZXB0IGF0IGluSW5kZXgpXG4gICAgICB0eFRtcC5pbnMuZm9yRWFjaCgoaW5wdXQsIHkpID0+IHtcbiAgICAgICAgaWYgKHkgPT09IGluSW5kZXgpIHJldHVybjtcbiAgICAgICAgaW5wdXQuc2VxdWVuY2UgPSAwO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8vIFNJR0hBU0hfQU5ZT05FQ0FOUEFZOiBpZ25vcmUgaW5wdXRzIGVudGlyZWx5P1xuICAgIGlmIChoYXNoVHlwZSAmIFRyYW5zYWN0aW9uLlNJR0hBU0hfQU5ZT05FQ0FOUEFZKSB7XG4gICAgICB0eFRtcC5pbnMgPSBbdHhUbXAuaW5zW2luSW5kZXhdXTtcbiAgICAgIHR4VG1wLmluc1swXS5zY3JpcHQgPSBvdXJTY3JpcHQ7XG4gICAgICAvLyBTSUdIQVNIX0FMTDogb25seSBpZ25vcmUgaW5wdXQgc2NyaXB0c1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBcImJsYW5rXCIgb3RoZXJzIGlucHV0IHNjcmlwdHNcbiAgICAgIHR4VG1wLmlucy5mb3JFYWNoKGlucHV0ID0+IHtcbiAgICAgICAgaW5wdXQuc2NyaXB0ID0gRU1QVFlfU0NSSVBUO1xuICAgICAgfSk7XG4gICAgICB0eFRtcC5pbnNbaW5JbmRleF0uc2NyaXB0ID0gb3VyU2NyaXB0O1xuICAgIH1cbiAgICAvLyBzZXJpYWxpemUgYW5kIGhhc2hcbiAgICBjb25zdCBidWZmZXIgPSBCdWZmZXIuYWxsb2NVbnNhZmUodHhUbXAuX19ieXRlTGVuZ3RoKGZhbHNlKSArIDQpO1xuICAgIGJ1ZmZlci53cml0ZUludDMyTEUoaGFzaFR5cGUsIGJ1ZmZlci5sZW5ndGggLSA0KTtcbiAgICB0eFRtcC5fX3RvQnVmZmVyKGJ1ZmZlciwgMCwgZmFsc2UpO1xuICAgIHJldHVybiBiY3J5cHRvLmhhc2gyNTYoYnVmZmVyKTtcbiAgfVxuICBoYXNoRm9yV2l0bmVzc1YwKGluSW5kZXgsIHByZXZPdXRTY3JpcHQsIHZhbHVlLCBoYXNoVHlwZSkge1xuICAgIHR5cGVmb3JjZShcbiAgICAgIHR5cGVzLnR1cGxlKHR5cGVzLlVJbnQzMiwgdHlwZXMuQnVmZmVyLCB0eXBlcy5TYXRvc2hpLCB0eXBlcy5VSW50MzIpLFxuICAgICAgYXJndW1lbnRzLFxuICAgICk7XG4gICAgbGV0IHRidWZmZXIgPSBCdWZmZXIuZnJvbShbXSk7XG4gICAgbGV0IHRvZmZzZXQgPSAwO1xuICAgIGZ1bmN0aW9uIHdyaXRlU2xpY2Uoc2xpY2UpIHtcbiAgICAgIHRvZmZzZXQgKz0gc2xpY2UuY29weSh0YnVmZmVyLCB0b2Zmc2V0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gd3JpdGVVSW50MzIoaSkge1xuICAgICAgdG9mZnNldCA9IHRidWZmZXIud3JpdGVVSW50MzJMRShpLCB0b2Zmc2V0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gd3JpdGVVSW50NjQoaSkge1xuICAgICAgdG9mZnNldCA9IGJ1ZmZlcnV0aWxzLndyaXRlVUludDY0TEUodGJ1ZmZlciwgaSwgdG9mZnNldCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHdyaXRlVmFySW50KGkpIHtcbiAgICAgIHZhcnVpbnQuZW5jb2RlKGksIHRidWZmZXIsIHRvZmZzZXQpO1xuICAgICAgdG9mZnNldCArPSB2YXJ1aW50LmVuY29kZS5ieXRlcztcbiAgICB9XG4gICAgZnVuY3Rpb24gd3JpdGVWYXJTbGljZShzbGljZSkge1xuICAgICAgd3JpdGVWYXJJbnQoc2xpY2UubGVuZ3RoKTtcbiAgICAgIHdyaXRlU2xpY2Uoc2xpY2UpO1xuICAgIH1cbiAgICBsZXQgaGFzaE91dHB1dHMgPSBaRVJPO1xuICAgIGxldCBoYXNoUHJldm91dHMgPSBaRVJPO1xuICAgIGxldCBoYXNoU2VxdWVuY2UgPSBaRVJPO1xuICAgIGlmICghKGhhc2hUeXBlICYgVHJhbnNhY3Rpb24uU0lHSEFTSF9BTllPTkVDQU5QQVkpKSB7XG4gICAgICB0YnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKDM2ICogdGhpcy5pbnMubGVuZ3RoKTtcbiAgICAgIHRvZmZzZXQgPSAwO1xuICAgICAgdGhpcy5pbnMuZm9yRWFjaCh0eEluID0+IHtcbiAgICAgICAgd3JpdGVTbGljZSh0eEluLmhhc2gpO1xuICAgICAgICB3cml0ZVVJbnQzMih0eEluLmluZGV4KTtcbiAgICAgIH0pO1xuICAgICAgaGFzaFByZXZvdXRzID0gYmNyeXB0by5oYXNoMjU2KHRidWZmZXIpO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICAhKGhhc2hUeXBlICYgVHJhbnNhY3Rpb24uU0lHSEFTSF9BTllPTkVDQU5QQVkpICYmXG4gICAgICAoaGFzaFR5cGUgJiAweDFmKSAhPT0gVHJhbnNhY3Rpb24uU0lHSEFTSF9TSU5HTEUgJiZcbiAgICAgIChoYXNoVHlwZSAmIDB4MWYpICE9PSBUcmFuc2FjdGlvbi5TSUdIQVNIX05PTkVcbiAgICApIHtcbiAgICAgIHRidWZmZXIgPSBCdWZmZXIuYWxsb2NVbnNhZmUoNCAqIHRoaXMuaW5zLmxlbmd0aCk7XG4gICAgICB0b2Zmc2V0ID0gMDtcbiAgICAgIHRoaXMuaW5zLmZvckVhY2godHhJbiA9PiB7XG4gICAgICAgIHdyaXRlVUludDMyKHR4SW4uc2VxdWVuY2UpO1xuICAgICAgfSk7XG4gICAgICBoYXNoU2VxdWVuY2UgPSBiY3J5cHRvLmhhc2gyNTYodGJ1ZmZlcik7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIChoYXNoVHlwZSAmIDB4MWYpICE9PSBUcmFuc2FjdGlvbi5TSUdIQVNIX1NJTkdMRSAmJlxuICAgICAgKGhhc2hUeXBlICYgMHgxZikgIT09IFRyYW5zYWN0aW9uLlNJR0hBU0hfTk9ORVxuICAgICkge1xuICAgICAgY29uc3QgdHhPdXRzU2l6ZSA9IHRoaXMub3V0cy5yZWR1Y2UoKHN1bSwgb3V0cHV0KSA9PiB7XG4gICAgICAgIHJldHVybiBzdW0gKyA4ICsgdmFyU2xpY2VTaXplKG91dHB1dC5zY3JpcHQpO1xuICAgICAgfSwgMCk7XG4gICAgICB0YnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKHR4T3V0c1NpemUpO1xuICAgICAgdG9mZnNldCA9IDA7XG4gICAgICB0aGlzLm91dHMuZm9yRWFjaChvdXQgPT4ge1xuICAgICAgICB3cml0ZVVJbnQ2NChvdXQudmFsdWUpO1xuICAgICAgICB3cml0ZVZhclNsaWNlKG91dC5zY3JpcHQpO1xuICAgICAgfSk7XG4gICAgICBoYXNoT3V0cHV0cyA9IGJjcnlwdG8uaGFzaDI1Nih0YnVmZmVyKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgKGhhc2hUeXBlICYgMHgxZikgPT09IFRyYW5zYWN0aW9uLlNJR0hBU0hfU0lOR0xFICYmXG4gICAgICBpbkluZGV4IDwgdGhpcy5vdXRzLmxlbmd0aFxuICAgICkge1xuICAgICAgY29uc3Qgb3V0cHV0ID0gdGhpcy5vdXRzW2luSW5kZXhdO1xuICAgICAgdGJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSg4ICsgdmFyU2xpY2VTaXplKG91dHB1dC5zY3JpcHQpKTtcbiAgICAgIHRvZmZzZXQgPSAwO1xuICAgICAgd3JpdGVVSW50NjQob3V0cHV0LnZhbHVlKTtcbiAgICAgIHdyaXRlVmFyU2xpY2Uob3V0cHV0LnNjcmlwdCk7XG4gICAgICBoYXNoT3V0cHV0cyA9IGJjcnlwdG8uaGFzaDI1Nih0YnVmZmVyKTtcbiAgICB9XG4gICAgdGJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSgxNTYgKyB2YXJTbGljZVNpemUocHJldk91dFNjcmlwdCkpO1xuICAgIHRvZmZzZXQgPSAwO1xuICAgIGNvbnN0IGlucHV0ID0gdGhpcy5pbnNbaW5JbmRleF07XG4gICAgd3JpdGVVSW50MzIodGhpcy52ZXJzaW9uKTtcbiAgICB3cml0ZVNsaWNlKGhhc2hQcmV2b3V0cyk7XG4gICAgd3JpdGVTbGljZShoYXNoU2VxdWVuY2UpO1xuICAgIHdyaXRlU2xpY2UoaW5wdXQuaGFzaCk7XG4gICAgd3JpdGVVSW50MzIoaW5wdXQuaW5kZXgpO1xuICAgIHdyaXRlVmFyU2xpY2UocHJldk91dFNjcmlwdCk7XG4gICAgd3JpdGVVSW50NjQodmFsdWUpO1xuICAgIHdyaXRlVUludDMyKGlucHV0LnNlcXVlbmNlKTtcbiAgICB3cml0ZVNsaWNlKGhhc2hPdXRwdXRzKTtcbiAgICB3cml0ZVVJbnQzMih0aGlzLmxvY2t0aW1lKTtcbiAgICB3cml0ZVVJbnQzMihoYXNoVHlwZSk7XG4gICAgcmV0dXJuIGJjcnlwdG8uaGFzaDI1Nih0YnVmZmVyKTtcbiAgfVxuICBnZXRIYXNoKGZvcldpdG5lc3MpIHtcbiAgICAvLyB3dHhpZCBmb3IgY29pbmJhc2UgaXMgYWx3YXlzIDMyIGJ5dGVzIG9mIDB4MDBcbiAgICBpZiAoZm9yV2l0bmVzcyAmJiB0aGlzLmlzQ29pbmJhc2UoKSkgcmV0dXJuIEJ1ZmZlci5hbGxvYygzMiwgMCk7XG4gICAgcmV0dXJuIGJjcnlwdG8uaGFzaDI1Nih0aGlzLl9fdG9CdWZmZXIodW5kZWZpbmVkLCB1bmRlZmluZWQsIGZvcldpdG5lc3MpKTtcbiAgfVxuICBnZXRJZCgpIHtcbiAgICAvLyB0cmFuc2FjdGlvbiBoYXNoJ3MgYXJlIGRpc3BsYXllZCBpbiByZXZlcnNlIG9yZGVyXG4gICAgcmV0dXJuIGJ1ZmZlcnV0aWxzXzEucmV2ZXJzZUJ1ZmZlcih0aGlzLmdldEhhc2goZmFsc2UpKS50b1N0cmluZygnaGV4Jyk7XG4gIH1cbiAgdG9CdWZmZXIoYnVmZmVyLCBpbml0aWFsT2Zmc2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuX190b0J1ZmZlcihidWZmZXIsIGluaXRpYWxPZmZzZXQsIHRydWUpO1xuICB9XG4gIHRvSGV4KCkge1xuICAgIHJldHVybiB0aGlzLnRvQnVmZmVyKHVuZGVmaW5lZCwgdW5kZWZpbmVkKS50b1N0cmluZygnaGV4Jyk7XG4gIH1cbiAgc2V0SW5wdXRTY3JpcHQoaW5kZXgsIHNjcmlwdFNpZykge1xuICAgIHR5cGVmb3JjZSh0eXBlcy50dXBsZSh0eXBlcy5OdW1iZXIsIHR5cGVzLkJ1ZmZlciksIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5pbnNbaW5kZXhdLnNjcmlwdCA9IHNjcmlwdFNpZztcbiAgfVxuICBzZXRXaXRuZXNzKGluZGV4LCB3aXRuZXNzKSB7XG4gICAgdHlwZWZvcmNlKHR5cGVzLnR1cGxlKHR5cGVzLk51bWJlciwgW3R5cGVzLkJ1ZmZlcl0pLCBhcmd1bWVudHMpO1xuICAgIHRoaXMuaW5zW2luZGV4XS53aXRuZXNzID0gd2l0bmVzcztcbiAgfVxuICBfX2J5dGVMZW5ndGgoX0FMTE9XX1dJVE5FU1MpIHtcbiAgICBjb25zdCBoYXNXaXRuZXNzZXMgPSBfQUxMT1dfV0lUTkVTUyAmJiB0aGlzLmhhc1dpdG5lc3NlcygpO1xuICAgIHJldHVybiAoXG4gICAgICAoaGFzV2l0bmVzc2VzID8gMTAgOiA4KSArXG4gICAgICB2YXJ1aW50LmVuY29kaW5nTGVuZ3RoKHRoaXMuaW5zLmxlbmd0aCkgK1xuICAgICAgdmFydWludC5lbmNvZGluZ0xlbmd0aCh0aGlzLm91dHMubGVuZ3RoKSArXG4gICAgICB0aGlzLmlucy5yZWR1Y2UoKHN1bSwgaW5wdXQpID0+IHtcbiAgICAgICAgcmV0dXJuIHN1bSArIDQwICsgdmFyU2xpY2VTaXplKGlucHV0LnNjcmlwdCk7XG4gICAgICB9LCAwKSArXG4gICAgICB0aGlzLm91dHMucmVkdWNlKChzdW0sIG91dHB1dCkgPT4ge1xuICAgICAgICByZXR1cm4gc3VtICsgOCArIHZhclNsaWNlU2l6ZShvdXRwdXQuc2NyaXB0KTtcbiAgICAgIH0sIDApICtcbiAgICAgIChoYXNXaXRuZXNzZXNcbiAgICAgICAgPyB0aGlzLmlucy5yZWR1Y2UoKHN1bSwgaW5wdXQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzdW0gKyB2ZWN0b3JTaXplKGlucHV0LndpdG5lc3MpO1xuICAgICAgICAgIH0sIDApXG4gICAgICAgIDogMClcbiAgICApO1xuICB9XG4gIF9fdG9CdWZmZXIoYnVmZmVyLCBpbml0aWFsT2Zmc2V0LCBfQUxMT1dfV0lUTkVTUykge1xuICAgIGlmICghYnVmZmVyKSBidWZmZXIgPSBCdWZmZXIuYWxsb2NVbnNhZmUodGhpcy5fX2J5dGVMZW5ndGgoX0FMTE9XX1dJVE5FU1MpKTtcbiAgICBsZXQgb2Zmc2V0ID0gaW5pdGlhbE9mZnNldCB8fCAwO1xuICAgIGZ1bmN0aW9uIHdyaXRlU2xpY2Uoc2xpY2UpIHtcbiAgICAgIG9mZnNldCArPSBzbGljZS5jb3B5KGJ1ZmZlciwgb2Zmc2V0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gd3JpdGVVSW50OChpKSB7XG4gICAgICBvZmZzZXQgPSBidWZmZXIud3JpdGVVSW50OChpLCBvZmZzZXQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB3cml0ZVVJbnQzMihpKSB7XG4gICAgICBvZmZzZXQgPSBidWZmZXIud3JpdGVVSW50MzJMRShpLCBvZmZzZXQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB3cml0ZUludDMyKGkpIHtcbiAgICAgIG9mZnNldCA9IGJ1ZmZlci53cml0ZUludDMyTEUoaSwgb2Zmc2V0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gd3JpdGVVSW50NjQoaSkge1xuICAgICAgb2Zmc2V0ID0gYnVmZmVydXRpbHMud3JpdGVVSW50NjRMRShidWZmZXIsIGksIG9mZnNldCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHdyaXRlVmFySW50KGkpIHtcbiAgICAgIHZhcnVpbnQuZW5jb2RlKGksIGJ1ZmZlciwgb2Zmc2V0KTtcbiAgICAgIG9mZnNldCArPSB2YXJ1aW50LmVuY29kZS5ieXRlcztcbiAgICB9XG4gICAgZnVuY3Rpb24gd3JpdGVWYXJTbGljZShzbGljZSkge1xuICAgICAgd3JpdGVWYXJJbnQoc2xpY2UubGVuZ3RoKTtcbiAgICAgIHdyaXRlU2xpY2Uoc2xpY2UpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB3cml0ZVZlY3Rvcih2ZWN0b3IpIHtcbiAgICAgIHdyaXRlVmFySW50KHZlY3Rvci5sZW5ndGgpO1xuICAgICAgdmVjdG9yLmZvckVhY2god3JpdGVWYXJTbGljZSk7XG4gICAgfVxuICAgIHdyaXRlSW50MzIodGhpcy52ZXJzaW9uKTtcbiAgICBjb25zdCBoYXNXaXRuZXNzZXMgPSBfQUxMT1dfV0lUTkVTUyAmJiB0aGlzLmhhc1dpdG5lc3NlcygpO1xuICAgIGlmIChoYXNXaXRuZXNzZXMpIHtcbiAgICAgIHdyaXRlVUludDgoVHJhbnNhY3Rpb24uQURWQU5DRURfVFJBTlNBQ1RJT05fTUFSS0VSKTtcbiAgICAgIHdyaXRlVUludDgoVHJhbnNhY3Rpb24uQURWQU5DRURfVFJBTlNBQ1RJT05fRkxBRyk7XG4gICAgfVxuICAgIHdyaXRlVmFySW50KHRoaXMuaW5zLmxlbmd0aCk7XG4gICAgdGhpcy5pbnMuZm9yRWFjaCh0eEluID0+IHtcbiAgICAgIHdyaXRlU2xpY2UodHhJbi5oYXNoKTtcbiAgICAgIHdyaXRlVUludDMyKHR4SW4uaW5kZXgpO1xuICAgICAgd3JpdGVWYXJTbGljZSh0eEluLnNjcmlwdCk7XG4gICAgICB3cml0ZVVJbnQzMih0eEluLnNlcXVlbmNlKTtcbiAgICB9KTtcbiAgICB3cml0ZVZhckludCh0aGlzLm91dHMubGVuZ3RoKTtcbiAgICB0aGlzLm91dHMuZm9yRWFjaCh0eE91dCA9PiB7XG4gICAgICBpZiAoaXNPdXRwdXQodHhPdXQpKSB7XG4gICAgICAgIHdyaXRlVUludDY0KHR4T3V0LnZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdyaXRlU2xpY2UodHhPdXQudmFsdWVCdWZmZXIpO1xuICAgICAgfVxuICAgICAgd3JpdGVWYXJTbGljZSh0eE91dC5zY3JpcHQpO1xuICAgIH0pO1xuICAgIGlmIChoYXNXaXRuZXNzZXMpIHtcbiAgICAgIHRoaXMuaW5zLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgICB3cml0ZVZlY3RvcihpbnB1dC53aXRuZXNzKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB3cml0ZVVJbnQzMih0aGlzLmxvY2t0aW1lKTtcbiAgICAvLyBhdm9pZCBzbGljaW5nIHVubGVzcyBuZWNlc3NhcnlcbiAgICBpZiAoaW5pdGlhbE9mZnNldCAhPT0gdW5kZWZpbmVkKSByZXR1cm4gYnVmZmVyLnNsaWNlKGluaXRpYWxPZmZzZXQsIG9mZnNldCk7XG4gICAgcmV0dXJuIGJ1ZmZlcjtcbiAgfVxufVxuVHJhbnNhY3Rpb24uREVGQVVMVF9TRVFVRU5DRSA9IDB4ZmZmZmZmZmY7XG5UcmFuc2FjdGlvbi5TSUdIQVNIX0FMTCA9IDB4MDE7XG5UcmFuc2FjdGlvbi5TSUdIQVNIX05PTkUgPSAweDAyO1xuVHJhbnNhY3Rpb24uU0lHSEFTSF9TSU5HTEUgPSAweDAzO1xuVHJhbnNhY3Rpb24uU0lHSEFTSF9BTllPTkVDQU5QQVkgPSAweDgwO1xuVHJhbnNhY3Rpb24uQURWQU5DRURfVFJBTlNBQ1RJT05fTUFSS0VSID0gMHgwMDtcblRyYW5zYWN0aW9uLkFEVkFOQ0VEX1RSQU5TQUNUSU9OX0ZMQUcgPSAweDAxO1xuZXhwb3J0cy5UcmFuc2FjdGlvbiA9IFRyYW5zYWN0aW9uO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8ge3B1YktleX0gT1BfQ0hFQ0tTSUdcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBic2NyaXB0ID0gcmVxdWlyZSgnLi4vLi4vc2NyaXB0Jyk7XG5jb25zdCBzY3JpcHRfMSA9IHJlcXVpcmUoJy4uLy4uL3NjcmlwdCcpO1xuZnVuY3Rpb24gY2hlY2soc2NyaXB0KSB7XG4gIGNvbnN0IGNodW5rcyA9IGJzY3JpcHQuZGVjb21waWxlKHNjcmlwdCk7XG4gIHJldHVybiAoXG4gICAgY2h1bmtzLmxlbmd0aCA9PT0gMiAmJlxuICAgIGJzY3JpcHQuaXNDYW5vbmljYWxQdWJLZXkoY2h1bmtzWzBdKSAmJlxuICAgIGNodW5rc1sxXSA9PT0gc2NyaXB0XzEuT1BTLk9QX0NIRUNLU0lHXG4gICk7XG59XG5leHBvcnRzLmNoZWNrID0gY2hlY2s7XG5jaGVjay50b0pTT04gPSAoKSA9PiB7XG4gIHJldHVybiAncHViS2V5IG91dHB1dCc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHNjcmlwdE51bWJlciA9IHJlcXVpcmUoJy4vc2NyaXB0X251bWJlcicpO1xuY29uc3Qgc2NyaXB0U2lnbmF0dXJlID0gcmVxdWlyZSgnLi9zY3JpcHRfc2lnbmF0dXJlJyk7XG5jb25zdCB0eXBlcyA9IHJlcXVpcmUoJy4vdHlwZXMnKTtcbmNvbnN0IGJpcDY2ID0gcmVxdWlyZSgnYmlwNjYnKTtcbmNvbnN0IGVjYyA9IHJlcXVpcmUoJ3Rpbnktc2VjcDI1NmsxJyk7XG5jb25zdCBwdXNoZGF0YSA9IHJlcXVpcmUoJ3B1c2hkYXRhLWJpdGNvaW4nKTtcbmNvbnN0IHR5cGVmb3JjZSA9IHJlcXVpcmUoJ3R5cGVmb3JjZScpO1xuZXhwb3J0cy5PUFMgPSByZXF1aXJlKCdiaXRjb2luLW9wcycpO1xuY29uc3QgUkVWRVJTRV9PUFMgPSByZXF1aXJlKCdiaXRjb2luLW9wcy9tYXAnKTtcbmNvbnN0IE9QX0lOVF9CQVNFID0gZXhwb3J0cy5PUFMuT1BfUkVTRVJWRUQ7IC8vIE9QXzEgLSAxXG5mdW5jdGlvbiBpc09QSW50KHZhbHVlKSB7XG4gIHJldHVybiAoXG4gICAgdHlwZXMuTnVtYmVyKHZhbHVlKSAmJlxuICAgICh2YWx1ZSA9PT0gZXhwb3J0cy5PUFMuT1BfMCB8fFxuICAgICAgKHZhbHVlID49IGV4cG9ydHMuT1BTLk9QXzEgJiYgdmFsdWUgPD0gZXhwb3J0cy5PUFMuT1BfMTYpIHx8XG4gICAgICB2YWx1ZSA9PT0gZXhwb3J0cy5PUFMuT1BfMU5FR0FURSlcbiAgKTtcbn1cbmZ1bmN0aW9uIGlzUHVzaE9ubHlDaHVuayh2YWx1ZSkge1xuICByZXR1cm4gdHlwZXMuQnVmZmVyKHZhbHVlKSB8fCBpc09QSW50KHZhbHVlKTtcbn1cbmZ1bmN0aW9uIGlzUHVzaE9ubHkodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVzLkFycmF5KHZhbHVlKSAmJiB2YWx1ZS5ldmVyeShpc1B1c2hPbmx5Q2h1bmspO1xufVxuZXhwb3J0cy5pc1B1c2hPbmx5ID0gaXNQdXNoT25seTtcbmZ1bmN0aW9uIGFzTWluaW1hbE9QKGJ1ZmZlcikge1xuICBpZiAoYnVmZmVyLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGV4cG9ydHMuT1BTLk9QXzA7XG4gIGlmIChidWZmZXIubGVuZ3RoICE9PSAxKSByZXR1cm47XG4gIGlmIChidWZmZXJbMF0gPj0gMSAmJiBidWZmZXJbMF0gPD0gMTYpIHJldHVybiBPUF9JTlRfQkFTRSArIGJ1ZmZlclswXTtcbiAgaWYgKGJ1ZmZlclswXSA9PT0gMHg4MSkgcmV0dXJuIGV4cG9ydHMuT1BTLk9QXzFORUdBVEU7XG59XG5mdW5jdGlvbiBjaHVua3NJc0J1ZmZlcihidWYpIHtcbiAgcmV0dXJuIEJ1ZmZlci5pc0J1ZmZlcihidWYpO1xufVxuZnVuY3Rpb24gY2h1bmtzSXNBcnJheShidWYpIHtcbiAgcmV0dXJuIHR5cGVzLkFycmF5KGJ1Zik7XG59XG5mdW5jdGlvbiBzaW5nbGVDaHVua0lzQnVmZmVyKGJ1Zikge1xuICByZXR1cm4gQnVmZmVyLmlzQnVmZmVyKGJ1Zik7XG59XG5mdW5jdGlvbiBjb21waWxlKGNodW5rcykge1xuICAvLyBUT0RPOiByZW1vdmUgbWVcbiAgaWYgKGNodW5rc0lzQnVmZmVyKGNodW5rcykpIHJldHVybiBjaHVua3M7XG4gIHR5cGVmb3JjZSh0eXBlcy5BcnJheSwgY2h1bmtzKTtcbiAgY29uc3QgYnVmZmVyU2l6ZSA9IGNodW5rcy5yZWR1Y2UoKGFjY3VtLCBjaHVuaykgPT4ge1xuICAgIC8vIGRhdGEgY2h1bmtcbiAgICBpZiAoc2luZ2xlQ2h1bmtJc0J1ZmZlcihjaHVuaykpIHtcbiAgICAgIC8vIGFkaGVyZSB0byBCSVA2Mi4zLCBtaW5pbWFsIHB1c2ggcG9saWN5XG4gICAgICBpZiAoY2h1bmsubGVuZ3RoID09PSAxICYmIGFzTWluaW1hbE9QKGNodW5rKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBhY2N1bSArIDE7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjdW0gKyBwdXNoZGF0YS5lbmNvZGluZ0xlbmd0aChjaHVuay5sZW5ndGgpICsgY2h1bmsubGVuZ3RoO1xuICAgIH1cbiAgICAvLyBvcGNvZGVcbiAgICByZXR1cm4gYWNjdW0gKyAxO1xuICB9LCAwLjApO1xuICBjb25zdCBidWZmZXIgPSBCdWZmZXIuYWxsb2NVbnNhZmUoYnVmZmVyU2l6ZSk7XG4gIGxldCBvZmZzZXQgPSAwO1xuICBjaHVua3MuZm9yRWFjaChjaHVuayA9PiB7XG4gICAgLy8gZGF0YSBjaHVua1xuICAgIGlmIChzaW5nbGVDaHVua0lzQnVmZmVyKGNodW5rKSkge1xuICAgICAgLy8gYWRoZXJlIHRvIEJJUDYyLjMsIG1pbmltYWwgcHVzaCBwb2xpY3lcbiAgICAgIGNvbnN0IG9wY29kZSA9IGFzTWluaW1hbE9QKGNodW5rKTtcbiAgICAgIGlmIChvcGNvZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBidWZmZXIud3JpdGVVSW50OChvcGNvZGUsIG9mZnNldCk7XG4gICAgICAgIG9mZnNldCArPSAxO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBvZmZzZXQgKz0gcHVzaGRhdGEuZW5jb2RlKGJ1ZmZlciwgY2h1bmsubGVuZ3RoLCBvZmZzZXQpO1xuICAgICAgY2h1bmsuY29weShidWZmZXIsIG9mZnNldCk7XG4gICAgICBvZmZzZXQgKz0gY2h1bmsubGVuZ3RoO1xuICAgICAgLy8gb3Bjb2RlXG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1ZmZlci53cml0ZVVJbnQ4KGNodW5rLCBvZmZzZXQpO1xuICAgICAgb2Zmc2V0ICs9IDE7XG4gICAgfVxuICB9KTtcbiAgaWYgKG9mZnNldCAhPT0gYnVmZmVyLmxlbmd0aCkgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZGVjb2RlIGNodW5rcycpO1xuICByZXR1cm4gYnVmZmVyO1xufVxuZXhwb3J0cy5jb21waWxlID0gY29tcGlsZTtcbmZ1bmN0aW9uIGRlY29tcGlsZShidWZmZXIpIHtcbiAgLy8gVE9ETzogcmVtb3ZlIG1lXG4gIGlmIChjaHVua3NJc0FycmF5KGJ1ZmZlcikpIHJldHVybiBidWZmZXI7XG4gIHR5cGVmb3JjZSh0eXBlcy5CdWZmZXIsIGJ1ZmZlcik7XG4gIGNvbnN0IGNodW5rcyA9IFtdO1xuICBsZXQgaSA9IDA7XG4gIHdoaWxlIChpIDwgYnVmZmVyLmxlbmd0aCkge1xuICAgIGNvbnN0IG9wY29kZSA9IGJ1ZmZlcltpXTtcbiAgICAvLyBkYXRhIGNodW5rXG4gICAgaWYgKG9wY29kZSA+IGV4cG9ydHMuT1BTLk9QXzAgJiYgb3Bjb2RlIDw9IGV4cG9ydHMuT1BTLk9QX1BVU0hEQVRBNCkge1xuICAgICAgY29uc3QgZCA9IHB1c2hkYXRhLmRlY29kZShidWZmZXIsIGkpO1xuICAgICAgLy8gZGlkIHJlYWRpbmcgYSBwdXNoRGF0YUludCBmYWlsP1xuICAgICAgaWYgKGQgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgaSArPSBkLnNpemU7XG4gICAgICAvLyBhdHRlbXB0IHRvIHJlYWQgdG9vIG11Y2ggZGF0YT9cbiAgICAgIGlmIChpICsgZC5udW1iZXIgPiBidWZmZXIubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICAgIGNvbnN0IGRhdGEgPSBidWZmZXIuc2xpY2UoaSwgaSArIGQubnVtYmVyKTtcbiAgICAgIGkgKz0gZC5udW1iZXI7XG4gICAgICAvLyBkZWNvbXBpbGUgbWluaW1hbGx5XG4gICAgICBjb25zdCBvcCA9IGFzTWluaW1hbE9QKGRhdGEpO1xuICAgICAgaWYgKG9wICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2h1bmtzLnB1c2gob3ApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2h1bmtzLnB1c2goZGF0YSk7XG4gICAgICB9XG4gICAgICAvLyBvcGNvZGVcbiAgICB9IGVsc2Uge1xuICAgICAgY2h1bmtzLnB1c2gob3Bjb2RlKTtcbiAgICAgIGkgKz0gMTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNodW5rcztcbn1cbmV4cG9ydHMuZGVjb21waWxlID0gZGVjb21waWxlO1xuZnVuY3Rpb24gdG9BU00oY2h1bmtzKSB7XG4gIGlmIChjaHVua3NJc0J1ZmZlcihjaHVua3MpKSB7XG4gICAgY2h1bmtzID0gZGVjb21waWxlKGNodW5rcyk7XG4gIH1cbiAgcmV0dXJuIGNodW5rc1xuICAgIC5tYXAoY2h1bmsgPT4ge1xuICAgICAgLy8gZGF0YT9cbiAgICAgIGlmIChzaW5nbGVDaHVua0lzQnVmZmVyKGNodW5rKSkge1xuICAgICAgICBjb25zdCBvcCA9IGFzTWluaW1hbE9QKGNodW5rKTtcbiAgICAgICAgaWYgKG9wID09PSB1bmRlZmluZWQpIHJldHVybiBjaHVuay50b1N0cmluZygnaGV4Jyk7XG4gICAgICAgIGNodW5rID0gb3A7XG4gICAgICB9XG4gICAgICAvLyBvcGNvZGUhXG4gICAgICByZXR1cm4gUkVWRVJTRV9PUFNbY2h1bmtdO1xuICAgIH0pXG4gICAgLmpvaW4oJyAnKTtcbn1cbmV4cG9ydHMudG9BU00gPSB0b0FTTTtcbmZ1bmN0aW9uIGZyb21BU00oYXNtKSB7XG4gIHR5cGVmb3JjZSh0eXBlcy5TdHJpbmcsIGFzbSk7XG4gIHJldHVybiBjb21waWxlKFxuICAgIGFzbS5zcGxpdCgnICcpLm1hcChjaHVua1N0ciA9PiB7XG4gICAgICAvLyBvcGNvZGU/XG4gICAgICBpZiAoZXhwb3J0cy5PUFNbY2h1bmtTdHJdICE9PSB1bmRlZmluZWQpIHJldHVybiBleHBvcnRzLk9QU1tjaHVua1N0cl07XG4gICAgICB0eXBlZm9yY2UodHlwZXMuSGV4LCBjaHVua1N0cik7XG4gICAgICAvLyBkYXRhIVxuICAgICAgcmV0dXJuIEJ1ZmZlci5mcm9tKGNodW5rU3RyLCAnaGV4Jyk7XG4gICAgfSksXG4gICk7XG59XG5leHBvcnRzLmZyb21BU00gPSBmcm9tQVNNO1xuZnVuY3Rpb24gdG9TdGFjayhjaHVua3MpIHtcbiAgY2h1bmtzID0gZGVjb21waWxlKGNodW5rcyk7XG4gIHR5cGVmb3JjZShpc1B1c2hPbmx5LCBjaHVua3MpO1xuICByZXR1cm4gY2h1bmtzLm1hcChvcCA9PiB7XG4gICAgaWYgKHNpbmdsZUNodW5rSXNCdWZmZXIob3ApKSByZXR1cm4gb3A7XG4gICAgaWYgKG9wID09PSBleHBvcnRzLk9QUy5PUF8wKSByZXR1cm4gQnVmZmVyLmFsbG9jVW5zYWZlKDApO1xuICAgIHJldHVybiBzY3JpcHROdW1iZXIuZW5jb2RlKG9wIC0gT1BfSU5UX0JBU0UpO1xuICB9KTtcbn1cbmV4cG9ydHMudG9TdGFjayA9IHRvU3RhY2s7XG5mdW5jdGlvbiBpc0Nhbm9uaWNhbFB1YktleShidWZmZXIpIHtcbiAgcmV0dXJuIGVjYy5pc1BvaW50KGJ1ZmZlcik7XG59XG5leHBvcnRzLmlzQ2Fub25pY2FsUHViS2V5ID0gaXNDYW5vbmljYWxQdWJLZXk7XG5mdW5jdGlvbiBpc0RlZmluZWRIYXNoVHlwZShoYXNoVHlwZSkge1xuICBjb25zdCBoYXNoVHlwZU1vZCA9IGhhc2hUeXBlICYgfjB4ODA7XG4gIC8vIHJldHVybiBoYXNoVHlwZU1vZCA+IFNJR0hBU0hfQUxMICYmIGhhc2hUeXBlTW9kIDwgU0lHSEFTSF9TSU5HTEVcbiAgcmV0dXJuIGhhc2hUeXBlTW9kID4gMHgwMCAmJiBoYXNoVHlwZU1vZCA8IDB4MDQ7XG59XG5leHBvcnRzLmlzRGVmaW5lZEhhc2hUeXBlID0gaXNEZWZpbmVkSGFzaFR5cGU7XG5mdW5jdGlvbiBpc0Nhbm9uaWNhbFNjcmlwdFNpZ25hdHVyZShidWZmZXIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmZmVyKSkgcmV0dXJuIGZhbHNlO1xuICBpZiAoIWlzRGVmaW5lZEhhc2hUeXBlKGJ1ZmZlcltidWZmZXIubGVuZ3RoIC0gMV0pKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBiaXA2Ni5jaGVjayhidWZmZXIuc2xpY2UoMCwgLTEpKTtcbn1cbmV4cG9ydHMuaXNDYW5vbmljYWxTY3JpcHRTaWduYXR1cmUgPSBpc0Nhbm9uaWNhbFNjcmlwdFNpZ25hdHVyZTtcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSB2YXJpYWJsZS1uYW1lXG5leHBvcnRzLm51bWJlciA9IHNjcmlwdE51bWJlcjtcbmV4cG9ydHMuc2lnbmF0dXJlID0gc2NyaXB0U2lnbmF0dXJlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHR5cGVzID0gcmVxdWlyZSgnLi90eXBlcycpO1xuY29uc3QgYmlwNjYgPSByZXF1aXJlKCdiaXA2NicpO1xuY29uc3QgdHlwZWZvcmNlID0gcmVxdWlyZSgndHlwZWZvcmNlJyk7XG5jb25zdCBaRVJPID0gQnVmZmVyLmFsbG9jKDEsIDApO1xuZnVuY3Rpb24gdG9ERVIoeCkge1xuICBsZXQgaSA9IDA7XG4gIHdoaWxlICh4W2ldID09PSAwKSArK2k7XG4gIGlmIChpID09PSB4Lmxlbmd0aCkgcmV0dXJuIFpFUk87XG4gIHggPSB4LnNsaWNlKGkpO1xuICBpZiAoeFswXSAmIDB4ODApIHJldHVybiBCdWZmZXIuY29uY2F0KFtaRVJPLCB4XSwgMSArIHgubGVuZ3RoKTtcbiAgcmV0dXJuIHg7XG59XG5mdW5jdGlvbiBmcm9tREVSKHgpIHtcbiAgaWYgKHhbMF0gPT09IDB4MDApIHggPSB4LnNsaWNlKDEpO1xuICBjb25zdCBidWZmZXIgPSBCdWZmZXIuYWxsb2MoMzIsIDApO1xuICBjb25zdCBic3RhcnQgPSBNYXRoLm1heCgwLCAzMiAtIHgubGVuZ3RoKTtcbiAgeC5jb3B5KGJ1ZmZlciwgYnN0YXJ0KTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbn1cbi8vIEJJUDYyOiAxIGJ5dGUgaGFzaFR5cGUgZmxhZyAob25seSAweDAxLCAweDAyLCAweDAzLCAweDgxLCAweDgyIGFuZCAweDgzIGFyZSBhbGxvd2VkKVxuZnVuY3Rpb24gZGVjb2RlKGJ1ZmZlcikge1xuICBjb25zdCBoYXNoVHlwZSA9IGJ1ZmZlci5yZWFkVUludDgoYnVmZmVyLmxlbmd0aCAtIDEpO1xuICBjb25zdCBoYXNoVHlwZU1vZCA9IGhhc2hUeXBlICYgfjB4ODA7XG4gIGlmIChoYXNoVHlwZU1vZCA8PSAwIHx8IGhhc2hUeXBlTW9kID49IDQpXG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGhhc2hUeXBlICcgKyBoYXNoVHlwZSk7XG4gIGNvbnN0IGRlY29kZWQgPSBiaXA2Ni5kZWNvZGUoYnVmZmVyLnNsaWNlKDAsIC0xKSk7XG4gIGNvbnN0IHIgPSBmcm9tREVSKGRlY29kZWQucik7XG4gIGNvbnN0IHMgPSBmcm9tREVSKGRlY29kZWQucyk7XG4gIGNvbnN0IHNpZ25hdHVyZSA9IEJ1ZmZlci5jb25jYXQoW3IsIHNdLCA2NCk7XG4gIHJldHVybiB7IHNpZ25hdHVyZSwgaGFzaFR5cGUgfTtcbn1cbmV4cG9ydHMuZGVjb2RlID0gZGVjb2RlO1xuZnVuY3Rpb24gZW5jb2RlKHNpZ25hdHVyZSwgaGFzaFR5cGUpIHtcbiAgdHlwZWZvcmNlKFxuICAgIHtcbiAgICAgIHNpZ25hdHVyZTogdHlwZXMuQnVmZmVyTig2NCksXG4gICAgICBoYXNoVHlwZTogdHlwZXMuVUludDgsXG4gICAgfSxcbiAgICB7IHNpZ25hdHVyZSwgaGFzaFR5cGUgfSxcbiAgKTtcbiAgY29uc3QgaGFzaFR5cGVNb2QgPSBoYXNoVHlwZSAmIH4weDgwO1xuICBpZiAoaGFzaFR5cGVNb2QgPD0gMCB8fCBoYXNoVHlwZU1vZCA+PSA0KVxuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBoYXNoVHlwZSAnICsgaGFzaFR5cGUpO1xuICBjb25zdCBoYXNoVHlwZUJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSgxKTtcbiAgaGFzaFR5cGVCdWZmZXIud3JpdGVVSW50OChoYXNoVHlwZSwgMCk7XG4gIGNvbnN0IHIgPSB0b0RFUihzaWduYXR1cmUuc2xpY2UoMCwgMzIpKTtcbiAgY29uc3QgcyA9IHRvREVSKHNpZ25hdHVyZS5zbGljZSgzMiwgNjQpKTtcbiAgcmV0dXJuIEJ1ZmZlci5jb25jYXQoW2JpcDY2LmVuY29kZShyLCBzKSwgaGFzaFR5cGVCdWZmZXJdKTtcbn1cbmV4cG9ydHMuZW5jb2RlID0gZW5jb2RlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGJ1ZmZlcnV0aWxzXzEgPSByZXF1aXJlKCcuL2J1ZmZlcnV0aWxzJyk7XG5jb25zdCBiY3J5cHRvID0gcmVxdWlyZSgnLi9jcnlwdG8nKTtcbmNvbnN0IHRyYW5zYWN0aW9uXzEgPSByZXF1aXJlKCcuL3RyYW5zYWN0aW9uJyk7XG5jb25zdCB0eXBlcyA9IHJlcXVpcmUoJy4vdHlwZXMnKTtcbmNvbnN0IGZhc3RNZXJrbGVSb290ID0gcmVxdWlyZSgnbWVya2xlLWxpYi9mYXN0Um9vdCcpO1xuY29uc3QgdHlwZWZvcmNlID0gcmVxdWlyZSgndHlwZWZvcmNlJyk7XG5jb25zdCB2YXJ1aW50ID0gcmVxdWlyZSgndmFydWludC1iaXRjb2luJyk7XG5jb25zdCBlcnJvck1lcmtsZU5vVHhlcyA9IG5ldyBUeXBlRXJyb3IoXG4gICdDYW5ub3QgY29tcHV0ZSBtZXJrbGUgcm9vdCBmb3IgemVybyB0cmFuc2FjdGlvbnMnLFxuKTtcbmNvbnN0IGVycm9yV2l0bmVzc05vdFNlZ3dpdCA9IG5ldyBUeXBlRXJyb3IoXG4gICdDYW5ub3QgY29tcHV0ZSB3aXRuZXNzIGNvbW1pdCBmb3Igbm9uLXNlZ3dpdCBibG9jaycsXG4pO1xuY2xhc3MgQmxvY2sge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnZlcnNpb24gPSAxO1xuICAgIHRoaXMucHJldkhhc2ggPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5tZXJrbGVSb290ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMudGltZXN0YW1wID0gMDtcbiAgICB0aGlzLndpdG5lc3NDb21taXQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5iaXRzID0gMDtcbiAgICB0aGlzLm5vbmNlID0gMDtcbiAgICB0aGlzLnRyYW5zYWN0aW9ucyA9IHVuZGVmaW5lZDtcbiAgfVxuICBzdGF0aWMgZnJvbUJ1ZmZlcihidWZmZXIpIHtcbiAgICBpZiAoYnVmZmVyLmxlbmd0aCA8IDgwKSB0aHJvdyBuZXcgRXJyb3IoJ0J1ZmZlciB0b28gc21hbGwgKDwgODAgYnl0ZXMpJyk7XG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgY29uc3QgcmVhZFNsaWNlID0gbiA9PiB7XG4gICAgICBvZmZzZXQgKz0gbjtcbiAgICAgIHJldHVybiBidWZmZXIuc2xpY2Uob2Zmc2V0IC0gbiwgb2Zmc2V0KTtcbiAgICB9O1xuICAgIGNvbnN0IHJlYWRVSW50MzIgPSAoKSA9PiB7XG4gICAgICBjb25zdCBpID0gYnVmZmVyLnJlYWRVSW50MzJMRShvZmZzZXQpO1xuICAgICAgb2Zmc2V0ICs9IDQ7XG4gICAgICByZXR1cm4gaTtcbiAgICB9O1xuICAgIGNvbnN0IHJlYWRJbnQzMiA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGkgPSBidWZmZXIucmVhZEludDMyTEUob2Zmc2V0KTtcbiAgICAgIG9mZnNldCArPSA0O1xuICAgICAgcmV0dXJuIGk7XG4gICAgfTtcbiAgICBjb25zdCBibG9jayA9IG5ldyBCbG9jaygpO1xuICAgIGJsb2NrLnZlcnNpb24gPSByZWFkSW50MzIoKTtcbiAgICBibG9jay5wcmV2SGFzaCA9IHJlYWRTbGljZSgzMik7XG4gICAgYmxvY2subWVya2xlUm9vdCA9IHJlYWRTbGljZSgzMik7XG4gICAgYmxvY2sudGltZXN0YW1wID0gcmVhZFVJbnQzMigpO1xuICAgIGJsb2NrLmJpdHMgPSByZWFkVUludDMyKCk7XG4gICAgYmxvY2subm9uY2UgPSByZWFkVUludDMyKCk7XG4gICAgaWYgKGJ1ZmZlci5sZW5ndGggPT09IDgwKSByZXR1cm4gYmxvY2s7XG4gICAgY29uc3QgcmVhZFZhckludCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHZpID0gdmFydWludC5kZWNvZGUoYnVmZmVyLCBvZmZzZXQpO1xuICAgICAgb2Zmc2V0ICs9IHZhcnVpbnQuZGVjb2RlLmJ5dGVzO1xuICAgICAgcmV0dXJuIHZpO1xuICAgIH07XG4gICAgY29uc3QgcmVhZFRyYW5zYWN0aW9uID0gKCkgPT4ge1xuICAgICAgY29uc3QgdHggPSB0cmFuc2FjdGlvbl8xLlRyYW5zYWN0aW9uLmZyb21CdWZmZXIoXG4gICAgICAgIGJ1ZmZlci5zbGljZShvZmZzZXQpLFxuICAgICAgICB0cnVlLFxuICAgICAgKTtcbiAgICAgIG9mZnNldCArPSB0eC5ieXRlTGVuZ3RoKCk7XG4gICAgICByZXR1cm4gdHg7XG4gICAgfTtcbiAgICBjb25zdCBuVHJhbnNhY3Rpb25zID0gcmVhZFZhckludCgpO1xuICAgIGJsb2NrLnRyYW5zYWN0aW9ucyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgblRyYW5zYWN0aW9uczsgKytpKSB7XG4gICAgICBjb25zdCB0eCA9IHJlYWRUcmFuc2FjdGlvbigpO1xuICAgICAgYmxvY2sudHJhbnNhY3Rpb25zLnB1c2godHgpO1xuICAgIH1cbiAgICBjb25zdCB3aXRuZXNzQ29tbWl0ID0gYmxvY2suZ2V0V2l0bmVzc0NvbW1pdCgpO1xuICAgIC8vIFRoaXMgQmxvY2sgY29udGFpbnMgYSB3aXRuZXNzIGNvbW1pdFxuICAgIGlmICh3aXRuZXNzQ29tbWl0KSBibG9jay53aXRuZXNzQ29tbWl0ID0gd2l0bmVzc0NvbW1pdDtcbiAgICByZXR1cm4gYmxvY2s7XG4gIH1cbiAgc3RhdGljIGZyb21IZXgoaGV4KSB7XG4gICAgcmV0dXJuIEJsb2NrLmZyb21CdWZmZXIoQnVmZmVyLmZyb20oaGV4LCAnaGV4JykpO1xuICB9XG4gIHN0YXRpYyBjYWxjdWxhdGVUYXJnZXQoYml0cykge1xuICAgIGNvbnN0IGV4cG9uZW50ID0gKChiaXRzICYgMHhmZjAwMDAwMCkgPj4gMjQpIC0gMztcbiAgICBjb25zdCBtYW50aXNzYSA9IGJpdHMgJiAweDAwN2ZmZmZmO1xuICAgIGNvbnN0IHRhcmdldCA9IEJ1ZmZlci5hbGxvYygzMiwgMCk7XG4gICAgdGFyZ2V0LndyaXRlVUludEJFKG1hbnRpc3NhLCAyOSAtIGV4cG9uZW50LCAzKTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG4gIHN0YXRpYyBjYWxjdWxhdGVNZXJrbGVSb290KHRyYW5zYWN0aW9ucywgZm9yV2l0bmVzcykge1xuICAgIHR5cGVmb3JjZShbeyBnZXRIYXNoOiB0eXBlcy5GdW5jdGlvbiB9XSwgdHJhbnNhY3Rpb25zKTtcbiAgICBpZiAodHJhbnNhY3Rpb25zLmxlbmd0aCA9PT0gMCkgdGhyb3cgZXJyb3JNZXJrbGVOb1R4ZXM7XG4gICAgaWYgKGZvcldpdG5lc3MgJiYgIXR4ZXNIYXZlV2l0bmVzc0NvbW1pdCh0cmFuc2FjdGlvbnMpKVxuICAgICAgdGhyb3cgZXJyb3JXaXRuZXNzTm90U2Vnd2l0O1xuICAgIGNvbnN0IGhhc2hlcyA9IHRyYW5zYWN0aW9ucy5tYXAodHJhbnNhY3Rpb24gPT5cbiAgICAgIHRyYW5zYWN0aW9uLmdldEhhc2goZm9yV2l0bmVzcyksXG4gICAgKTtcbiAgICBjb25zdCByb290SGFzaCA9IGZhc3RNZXJrbGVSb290KGhhc2hlcywgYmNyeXB0by5oYXNoMjU2KTtcbiAgICByZXR1cm4gZm9yV2l0bmVzc1xuICAgICAgPyBiY3J5cHRvLmhhc2gyNTYoXG4gICAgICAgICAgQnVmZmVyLmNvbmNhdChbcm9vdEhhc2gsIHRyYW5zYWN0aW9uc1swXS5pbnNbMF0ud2l0bmVzc1swXV0pLFxuICAgICAgICApXG4gICAgICA6IHJvb3RIYXNoO1xuICB9XG4gIGdldFdpdG5lc3NDb21taXQoKSB7XG4gICAgaWYgKCF0eGVzSGF2ZVdpdG5lc3NDb21taXQodGhpcy50cmFuc2FjdGlvbnMpKSByZXR1cm4gbnVsbDtcbiAgICAvLyBUaGUgbWVya2xlIHJvb3QgZm9yIHRoZSB3aXRuZXNzIGRhdGEgaXMgaW4gYW4gT1BfUkVUVVJOIG91dHB1dC5cbiAgICAvLyBUaGVyZSBpcyBubyBydWxlIGZvciB0aGUgaW5kZXggb2YgdGhlIG91dHB1dCwgc28gdXNlIGZpbHRlciB0byBmaW5kIGl0LlxuICAgIC8vIFRoZSByb290IGlzIHByZXBlbmRlZCB3aXRoIDB4YWEyMWE5ZWQgc28gY2hlY2sgZm9yIDB4NmEyNGFhMjFhOWVkXG4gICAgLy8gSWYgbXVsdGlwbGUgY29tbWl0cyBhcmUgZm91bmQsIHRoZSBvdXRwdXQgd2l0aCBoaWdoZXN0IGluZGV4IGlzIGFzc3VtZWQuXG4gICAgY29uc3Qgd2l0bmVzc0NvbW1pdHMgPSB0aGlzLnRyYW5zYWN0aW9uc1swXS5vdXRzXG4gICAgICAuZmlsdGVyKG91dCA9PlxuICAgICAgICBvdXQuc2NyaXB0LnNsaWNlKDAsIDYpLmVxdWFscyhCdWZmZXIuZnJvbSgnNmEyNGFhMjFhOWVkJywgJ2hleCcpKSxcbiAgICAgIClcbiAgICAgIC5tYXAob3V0ID0+IG91dC5zY3JpcHQuc2xpY2UoNiwgMzgpKTtcbiAgICBpZiAod2l0bmVzc0NvbW1pdHMubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcbiAgICAvLyBVc2UgdGhlIGNvbW1pdCB3aXRoIHRoZSBoaWdoZXN0IG91dHB1dCAoc2hvdWxkIG9ubHkgYmUgb25lIHRob3VnaClcbiAgICBjb25zdCByZXN1bHQgPSB3aXRuZXNzQ29tbWl0c1t3aXRuZXNzQ29tbWl0cy5sZW5ndGggLSAxXTtcbiAgICBpZiAoIShyZXN1bHQgaW5zdGFuY2VvZiBCdWZmZXIgJiYgcmVzdWx0Lmxlbmd0aCA9PT0gMzIpKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGhhc1dpdG5lc3NDb21taXQoKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy53aXRuZXNzQ29tbWl0IGluc3RhbmNlb2YgQnVmZmVyICYmXG4gICAgICB0aGlzLndpdG5lc3NDb21taXQubGVuZ3RoID09PSAzMlxuICAgIClcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGlmICh0aGlzLmdldFdpdG5lc3NDb21taXQoKSAhPT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGhhc1dpdG5lc3MoKSB7XG4gICAgcmV0dXJuIGFueVR4SGFzV2l0bmVzcyh0aGlzLnRyYW5zYWN0aW9ucyk7XG4gIH1cbiAgYnl0ZUxlbmd0aChoZWFkZXJzT25seSkge1xuICAgIGlmIChoZWFkZXJzT25seSB8fCAhdGhpcy50cmFuc2FjdGlvbnMpIHJldHVybiA4MDtcbiAgICByZXR1cm4gKFxuICAgICAgODAgK1xuICAgICAgdmFydWludC5lbmNvZGluZ0xlbmd0aCh0aGlzLnRyYW5zYWN0aW9ucy5sZW5ndGgpICtcbiAgICAgIHRoaXMudHJhbnNhY3Rpb25zLnJlZHVjZSgoYSwgeCkgPT4gYSArIHguYnl0ZUxlbmd0aCgpLCAwKVxuICAgICk7XG4gIH1cbiAgZ2V0SGFzaCgpIHtcbiAgICByZXR1cm4gYmNyeXB0by5oYXNoMjU2KHRoaXMudG9CdWZmZXIodHJ1ZSkpO1xuICB9XG4gIGdldElkKCkge1xuICAgIHJldHVybiBidWZmZXJ1dGlsc18xLnJldmVyc2VCdWZmZXIodGhpcy5nZXRIYXNoKCkpLnRvU3RyaW5nKCdoZXgnKTtcbiAgfVxuICBnZXRVVENEYXRlKCkge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgwKTsgLy8gZXBvY2hcbiAgICBkYXRlLnNldFVUQ1NlY29uZHModGhpcy50aW1lc3RhbXApO1xuICAgIHJldHVybiBkYXRlO1xuICB9XG4gIC8vIFRPRE86IGJ1ZmZlciwgb2Zmc2V0IGNvbXBhdGliaWxpdHlcbiAgdG9CdWZmZXIoaGVhZGVyc09ubHkpIHtcbiAgICBjb25zdCBidWZmZXIgPSBCdWZmZXIuYWxsb2NVbnNhZmUodGhpcy5ieXRlTGVuZ3RoKGhlYWRlcnNPbmx5KSk7XG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgY29uc3Qgd3JpdGVTbGljZSA9IHNsaWNlID0+IHtcbiAgICAgIHNsaWNlLmNvcHkoYnVmZmVyLCBvZmZzZXQpO1xuICAgICAgb2Zmc2V0ICs9IHNsaWNlLmxlbmd0aDtcbiAgICB9O1xuICAgIGNvbnN0IHdyaXRlSW50MzIgPSBpID0+IHtcbiAgICAgIGJ1ZmZlci53cml0ZUludDMyTEUoaSwgb2Zmc2V0KTtcbiAgICAgIG9mZnNldCArPSA0O1xuICAgIH07XG4gICAgY29uc3Qgd3JpdGVVSW50MzIgPSBpID0+IHtcbiAgICAgIGJ1ZmZlci53cml0ZVVJbnQzMkxFKGksIG9mZnNldCk7XG4gICAgICBvZmZzZXQgKz0gNDtcbiAgICB9O1xuICAgIHdyaXRlSW50MzIodGhpcy52ZXJzaW9uKTtcbiAgICB3cml0ZVNsaWNlKHRoaXMucHJldkhhc2gpO1xuICAgIHdyaXRlU2xpY2UodGhpcy5tZXJrbGVSb290KTtcbiAgICB3cml0ZVVJbnQzMih0aGlzLnRpbWVzdGFtcCk7XG4gICAgd3JpdGVVSW50MzIodGhpcy5iaXRzKTtcbiAgICB3cml0ZVVJbnQzMih0aGlzLm5vbmNlKTtcbiAgICBpZiAoaGVhZGVyc09ubHkgfHwgIXRoaXMudHJhbnNhY3Rpb25zKSByZXR1cm4gYnVmZmVyO1xuICAgIHZhcnVpbnQuZW5jb2RlKHRoaXMudHJhbnNhY3Rpb25zLmxlbmd0aCwgYnVmZmVyLCBvZmZzZXQpO1xuICAgIG9mZnNldCArPSB2YXJ1aW50LmVuY29kZS5ieXRlcztcbiAgICB0aGlzLnRyYW5zYWN0aW9ucy5mb3JFYWNoKHR4ID0+IHtcbiAgICAgIGNvbnN0IHR4U2l6ZSA9IHR4LmJ5dGVMZW5ndGgoKTsgLy8gVE9ETzogZXh0cmFjdCBmcm9tIHRvQnVmZmVyP1xuICAgICAgdHgudG9CdWZmZXIoYnVmZmVyLCBvZmZzZXQpO1xuICAgICAgb2Zmc2V0ICs9IHR4U2l6ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gYnVmZmVyO1xuICB9XG4gIHRvSGV4KGhlYWRlcnNPbmx5KSB7XG4gICAgcmV0dXJuIHRoaXMudG9CdWZmZXIoaGVhZGVyc09ubHkpLnRvU3RyaW5nKCdoZXgnKTtcbiAgfVxuICBjaGVja1R4Um9vdHMoKSB7XG4gICAgLy8gSWYgdGhlIEJsb2NrIGhhcyBzZWd3aXQgdHJhbnNhY3Rpb25zIGJ1dCBubyB3aXRuZXNzIGNvbW1pdCxcbiAgICAvLyB0aGVyZSdzIG5vIHdheSBpdCBjYW4gYmUgdmFsaWQsIHNvIGZhaWwgdGhlIGNoZWNrLlxuICAgIGNvbnN0IGhhc1dpdG5lc3NDb21taXQgPSB0aGlzLmhhc1dpdG5lc3NDb21taXQoKTtcbiAgICBpZiAoIWhhc1dpdG5lc3NDb21taXQgJiYgdGhpcy5oYXNXaXRuZXNzKCkpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5fX2NoZWNrTWVya2xlUm9vdCgpICYmXG4gICAgICAoaGFzV2l0bmVzc0NvbW1pdCA/IHRoaXMuX19jaGVja1dpdG5lc3NDb21taXQoKSA6IHRydWUpXG4gICAgKTtcbiAgfVxuICBjaGVja1Byb29mT2ZXb3JrKCkge1xuICAgIGNvbnN0IGhhc2ggPSBidWZmZXJ1dGlsc18xLnJldmVyc2VCdWZmZXIodGhpcy5nZXRIYXNoKCkpO1xuICAgIGNvbnN0IHRhcmdldCA9IEJsb2NrLmNhbGN1bGF0ZVRhcmdldCh0aGlzLmJpdHMpO1xuICAgIHJldHVybiBoYXNoLmNvbXBhcmUodGFyZ2V0KSA8PSAwO1xuICB9XG4gIF9fY2hlY2tNZXJrbGVSb290KCkge1xuICAgIGlmICghdGhpcy50cmFuc2FjdGlvbnMpIHRocm93IGVycm9yTWVya2xlTm9UeGVzO1xuICAgIGNvbnN0IGFjdHVhbE1lcmtsZVJvb3QgPSBCbG9jay5jYWxjdWxhdGVNZXJrbGVSb290KHRoaXMudHJhbnNhY3Rpb25zKTtcbiAgICByZXR1cm4gdGhpcy5tZXJrbGVSb290LmNvbXBhcmUoYWN0dWFsTWVya2xlUm9vdCkgPT09IDA7XG4gIH1cbiAgX19jaGVja1dpdG5lc3NDb21taXQoKSB7XG4gICAgaWYgKCF0aGlzLnRyYW5zYWN0aW9ucykgdGhyb3cgZXJyb3JNZXJrbGVOb1R4ZXM7XG4gICAgaWYgKCF0aGlzLmhhc1dpdG5lc3NDb21taXQoKSkgdGhyb3cgZXJyb3JXaXRuZXNzTm90U2Vnd2l0O1xuICAgIGNvbnN0IGFjdHVhbFdpdG5lc3NDb21taXQgPSBCbG9jay5jYWxjdWxhdGVNZXJrbGVSb290KFxuICAgICAgdGhpcy50cmFuc2FjdGlvbnMsXG4gICAgICB0cnVlLFxuICAgICk7XG4gICAgcmV0dXJuIHRoaXMud2l0bmVzc0NvbW1pdC5jb21wYXJlKGFjdHVhbFdpdG5lc3NDb21taXQpID09PSAwO1xuICB9XG59XG5leHBvcnRzLkJsb2NrID0gQmxvY2s7XG5mdW5jdGlvbiB0eGVzSGF2ZVdpdG5lc3NDb21taXQodHJhbnNhY3Rpb25zKSB7XG4gIHJldHVybiAoXG4gICAgdHJhbnNhY3Rpb25zIGluc3RhbmNlb2YgQXJyYXkgJiZcbiAgICB0cmFuc2FjdGlvbnNbMF0gJiZcbiAgICB0cmFuc2FjdGlvbnNbMF0uaW5zICYmXG4gICAgdHJhbnNhY3Rpb25zWzBdLmlucyBpbnN0YW5jZW9mIEFycmF5ICYmXG4gICAgdHJhbnNhY3Rpb25zWzBdLmluc1swXSAmJlxuICAgIHRyYW5zYWN0aW9uc1swXS5pbnNbMF0ud2l0bmVzcyAmJlxuICAgIHRyYW5zYWN0aW9uc1swXS5pbnNbMF0ud2l0bmVzcyBpbnN0YW5jZW9mIEFycmF5ICYmXG4gICAgdHJhbnNhY3Rpb25zWzBdLmluc1swXS53aXRuZXNzLmxlbmd0aCA+IDBcbiAgKTtcbn1cbmZ1bmN0aW9uIGFueVR4SGFzV2l0bmVzcyh0cmFuc2FjdGlvbnMpIHtcbiAgcmV0dXJuIChcbiAgICB0cmFuc2FjdGlvbnMgaW5zdGFuY2VvZiBBcnJheSAmJlxuICAgIHRyYW5zYWN0aW9ucy5zb21lKFxuICAgICAgdHggPT5cbiAgICAgICAgdHlwZW9mIHR4ID09PSAnb2JqZWN0JyAmJlxuICAgICAgICB0eC5pbnMgaW5zdGFuY2VvZiBBcnJheSAmJlxuICAgICAgICB0eC5pbnMuc29tZShcbiAgICAgICAgICBpbnB1dCA9PlxuICAgICAgICAgICAgdHlwZW9mIGlucHV0ID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAgICAgaW5wdXQud2l0bmVzcyBpbnN0YW5jZW9mIEFycmF5ICYmXG4gICAgICAgICAgICBpbnB1dC53aXRuZXNzLmxlbmd0aCA+IDAsXG4gICAgICAgICksXG4gICAgKVxuICApO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGJpcDE3NF8xID0gcmVxdWlyZSgnYmlwMTc0Jyk7XG5jb25zdCB2YXJ1aW50ID0gcmVxdWlyZSgnYmlwMTc0L3NyYy9saWIvY29udmVydGVyL3ZhcmludCcpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoJ2JpcDE3NC9zcmMvbGliL3V0aWxzJyk7XG5jb25zdCBhZGRyZXNzXzEgPSByZXF1aXJlKCcuL2FkZHJlc3MnKTtcbmNvbnN0IGJ1ZmZlcnV0aWxzXzEgPSByZXF1aXJlKCcuL2J1ZmZlcnV0aWxzJyk7XG5jb25zdCBjcnlwdG9fMSA9IHJlcXVpcmUoJy4vY3J5cHRvJyk7XG5jb25zdCBlY3BhaXJfMSA9IHJlcXVpcmUoJy4vZWNwYWlyJyk7XG5jb25zdCBuZXR3b3Jrc18xID0gcmVxdWlyZSgnLi9uZXR3b3JrcycpO1xuY29uc3QgcGF5bWVudHMgPSByZXF1aXJlKCcuL3BheW1lbnRzJyk7XG5jb25zdCBic2NyaXB0ID0gcmVxdWlyZSgnLi9zY3JpcHQnKTtcbmNvbnN0IHRyYW5zYWN0aW9uXzEgPSByZXF1aXJlKCcuL3RyYW5zYWN0aW9uJyk7XG4vKipcbiAqIFRoZXNlIGFyZSB0aGUgZGVmYXVsdCBhcmd1bWVudHMgZm9yIGEgUHNidCBpbnN0YW5jZS5cbiAqL1xuY29uc3QgREVGQVVMVF9PUFRTID0ge1xuICAvKipcbiAgICogQSBiaXRjb2luanMgTmV0d29yayBvYmplY3QuIFRoaXMgaXMgb25seSB1c2VkIGlmIHlvdSBwYXNzIGFuIGBhZGRyZXNzYFxuICAgKiBwYXJhbWV0ZXIgdG8gYWRkT3V0cHV0LiBPdGhlcndpc2UgaXQgaXMgbm90IG5lZWRlZCBhbmQgY2FuIGJlIGxlZnQgZGVmYXVsdC5cbiAgICovXG4gIG5ldHdvcms6IG5ldHdvcmtzXzEuYml0Y29pbixcbiAgLyoqXG4gICAqIFdoZW4gZXh0cmFjdFRyYW5zYWN0aW9uIGlzIGNhbGxlZCwgdGhlIGZlZSByYXRlIGlzIGNoZWNrZWQuXG4gICAqIFRISVMgSVMgTk9UIFRPIEJFIFJFTElFRCBPTi5cbiAgICogSXQgaXMgb25seSBoZXJlIGFzIGEgbGFzdCBkaXRjaCBlZmZvcnQgdG8gcHJldmVudCBzZW5kaW5nIGEgNTAwIEJUQyBmZWUgZXRjLlxuICAgKi9cbiAgbWF4aW11bUZlZVJhdGU6IDUwMDAsXG59O1xuLyoqXG4gKiBQc2J0IGNsYXNzIGNhbiBwYXJzZSBhbmQgZ2VuZXJhdGUgYSBQU0JUIGJpbmFyeSBiYXNlZCBvZmYgb2YgdGhlIEJJUDE3NC5cbiAqIFRoZXJlIGFyZSA2IHJvbGVzIHRoYXQgdGhpcyBjbGFzcyBmdWxmaWxscy4gKEV4cGxhaW5lZCBpbiBCSVAxNzQpXG4gKlxuICogQ3JlYXRvcjogVGhpcyBjYW4gYmUgZG9uZSB3aXRoIGBuZXcgUHNidCgpYFxuICogVXBkYXRlcjogVGhpcyBjYW4gYmUgZG9uZSB3aXRoIGBwc2J0LmFkZElucHV0KGlucHV0KWAsIGBwc2J0LmFkZElucHV0cyhpbnB1dHMpYCxcbiAqICAgYHBzYnQuYWRkT3V0cHV0KG91dHB1dClgLCBgcHNidC5hZGRPdXRwdXRzKG91dHB1dHMpYCB3aGVuIHlvdSBhcmUgbG9va2luZyB0b1xuICogICBhZGQgbmV3IGlucHV0cyBhbmQgb3V0cHV0cyB0byB0aGUgUFNCVCwgYW5kIGBwc2J0LnVwZGF0ZUdsb2JhbChpdGVtT2JqZWN0KWAsXG4gKiAgIGBwc2J0LnVwZGF0ZUlucHV0KGl0ZW1PYmplY3QpYCwgYHBzYnQudXBkYXRlT3V0cHV0KGl0ZW1PYmplY3QpYFxuICogICBhZGRJbnB1dCByZXF1aXJlcyBoYXNoOiBCdWZmZXIgfCBzdHJpbmc7IGFuZCBpbmRleDogbnVtYmVyOyBhcyBhdHRyaWJ1dGVzXG4gKiAgIGFuZCBjYW4gYWxzbyBpbmNsdWRlIGFueSBhdHRyaWJ1dGVzIHRoYXQgYXJlIHVzZWQgaW4gdXBkYXRlSW5wdXQgbWV0aG9kLlxuICogICBhZGRPdXRwdXQgcmVxdWlyZXMgc2NyaXB0OiBCdWZmZXI7IGFuZCB2YWx1ZTogbnVtYmVyOyBhbmQgbGlrZXdpc2UgY2FuIGluY2x1ZGVcbiAqICAgZGF0YSBmb3IgdXBkYXRlT3V0cHV0LlxuICogICBGb3IgYSBsaXN0IG9mIHdoYXQgYXR0cmlidXRlcyBzaG91bGQgYmUgd2hhdCB0eXBlcy4gQ2hlY2sgdGhlIGJpcDE3NCBsaWJyYXJ5LlxuICogICBBbHNvLCBjaGVjayB0aGUgaW50ZWdyYXRpb24gdGVzdHMgZm9yIHNvbWUgZXhhbXBsZXMgb2YgdXNhZ2UuXG4gKiBTaWduZXI6IFRoZXJlIGFyZSBhIGZldyBtZXRob2RzLiBzaWduQWxsSW5wdXRzIGFuZCBzaWduQWxsSW5wdXRzQXN5bmMsIHdoaWNoIHdpbGwgc2VhcmNoIGFsbCBpbnB1dFxuICogICBpbmZvcm1hdGlvbiBmb3IgeW91ciBwdWJrZXkgb3IgcHVia2V5aGFzaCwgYW5kIG9ubHkgc2lnbiBpbnB1dHMgd2hlcmUgaXQgZmluZHNcbiAqICAgeW91ciBpbmZvLiBPciB5b3UgY2FuIGV4cGxpY2l0bHkgc2lnbiBhIHNwZWNpZmljIGlucHV0IHdpdGggc2lnbklucHV0IGFuZFxuICogICBzaWduSW5wdXRBc3luYy4gRm9yIHRoZSBhc3luYyBtZXRob2RzIHlvdSBjYW4gY3JlYXRlIGEgU2lnbmVyQXN5bmMgb2JqZWN0XG4gKiAgIGFuZCB1c2Ugc29tZXRoaW5nIGxpa2UgYSBoYXJkd2FyZSB3YWxsZXQgdG8gc2lnbiB3aXRoLiAoWW91IG11c3QgaW1wbGVtZW50IHRoaXMpXG4gKiBDb21iaW5lcjogcHNidHMgY2FuIGJlIGNvbWJpbmVkIGVhc2lseSB3aXRoIGBwc2J0LmNvbWJpbmUocHNidDIsIHBzYnQzLCBwc2J0NCAuLi4pYFxuICogICB0aGUgcHNidCBjYWxsaW5nIGNvbWJpbmUgd2lsbCBhbHdheXMgaGF2ZSBwcmVjZWRlbmNlIHdoZW4gYSBjb25mbGljdCBvY2N1cnMuXG4gKiAgIENvbWJpbmUgY2hlY2tzIGlmIHRoZSBpbnRlcm5hbCBiaXRjb2luIHRyYW5zYWN0aW9uIGlzIHRoZSBzYW1lLCBzbyBiZSBzdXJlIHRoYXRcbiAqICAgYWxsIHNlcXVlbmNlcywgdmVyc2lvbiwgbG9ja3RpbWUsIGV0Yy4gYXJlIHRoZSBzYW1lIGJlZm9yZSBjb21iaW5pbmcuXG4gKiBJbnB1dCBGaW5hbGl6ZXI6IFRoaXMgcm9sZSBpcyBmYWlybHkgaW1wb3J0YW50LiBOb3Qgb25seSBkb2VzIGl0IG5lZWQgdG8gY29uc3RydWN0XG4gKiAgIHRoZSBpbnB1dCBzY3JpcHRTaWdzIGFuZCB3aXRuZXNzZXMsIGJ1dCBpdCBTSE9VTEQgdmVyaWZ5IHRoZSBzaWduYXR1cmVzIGV0Yy5cbiAqICAgQmVmb3JlIHJ1bm5pbmcgYHBzYnQuZmluYWxpemVBbGxJbnB1dHMoKWAgcGxlYXNlIHJ1biBgcHNidC52YWxpZGF0ZVNpZ25hdHVyZXNPZkFsbElucHV0cygpYFxuICogICBSdW5uaW5nIGFueSBmaW5hbGl6ZSBtZXRob2Qgd2lsbCBkZWxldGUgYW55IGRhdGEgaW4gdGhlIGlucHV0KHMpIHRoYXQgYXJlIG5vIGxvbmdlclxuICogICBuZWVkZWQgZHVlIHRvIHRoZSBmaW5hbGl6ZWQgc2NyaXB0cyBjb250YWluaW5nIHRoZSBpbmZvcm1hdGlvbi5cbiAqIFRyYW5zYWN0aW9uIEV4dHJhY3RvcjogVGhpcyByb2xlIHdpbGwgcGVyZm9ybSBzb21lIGNoZWNrcyBiZWZvcmUgcmV0dXJuaW5nIGFcbiAqICAgVHJhbnNhY3Rpb24gb2JqZWN0LiBTdWNoIGFzIGZlZSByYXRlIG5vdCBiZWluZyBsYXJnZXIgdGhhbiBtYXhpbXVtRmVlUmF0ZSBldGMuXG4gKi9cbmNsYXNzIFBzYnQge1xuICBjb25zdHJ1Y3RvcihvcHRzID0ge30sIGRhdGEgPSBuZXcgYmlwMTc0XzEuUHNidChuZXcgUHNidFRyYW5zYWN0aW9uKCkpKSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAvLyBzZXQgZGVmYXVsdHNcbiAgICB0aGlzLm9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX09QVFMsIG9wdHMpO1xuICAgIHRoaXMuX19DQUNIRSA9IHtcbiAgICAgIF9fTk9OX1dJVE5FU1NfVVRYT19UWF9DQUNIRTogW10sXG4gICAgICBfX05PTl9XSVRORVNTX1VUWE9fQlVGX0NBQ0hFOiBbXSxcbiAgICAgIF9fVFhfSU5fQ0FDSEU6IHt9LFxuICAgICAgX19UWDogdGhpcy5kYXRhLmdsb2JhbE1hcC51bnNpZ25lZFR4LnR4LFxuICAgIH07XG4gICAgaWYgKHRoaXMuZGF0YS5pbnB1dHMubGVuZ3RoID09PSAwKSB0aGlzLnNldFZlcnNpb24oMik7XG4gICAgLy8gTWFrZSBkYXRhIGhpZGRlbiB3aGVuIGVudW1lcmF0aW5nXG4gICAgY29uc3QgZHBldyA9IChvYmosIGF0dHIsIGVudW1lcmFibGUsIHdyaXRhYmxlKSA9PlxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgYXR0ciwge1xuICAgICAgICBlbnVtZXJhYmxlLFxuICAgICAgICB3cml0YWJsZSxcbiAgICAgIH0pO1xuICAgIGRwZXcodGhpcywgJ19fQ0FDSEUnLCBmYWxzZSwgdHJ1ZSk7XG4gICAgZHBldyh0aGlzLCAnb3B0cycsIGZhbHNlLCB0cnVlKTtcbiAgfVxuICBzdGF0aWMgZnJvbUJhc2U2NChkYXRhLCBvcHRzID0ge30pIHtcbiAgICBjb25zdCBidWZmZXIgPSBCdWZmZXIuZnJvbShkYXRhLCAnYmFzZTY0Jyk7XG4gICAgcmV0dXJuIHRoaXMuZnJvbUJ1ZmZlcihidWZmZXIsIG9wdHMpO1xuICB9XG4gIHN0YXRpYyBmcm9tSGV4KGRhdGEsIG9wdHMgPSB7fSkge1xuICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGRhdGEsICdoZXgnKTtcbiAgICByZXR1cm4gdGhpcy5mcm9tQnVmZmVyKGJ1ZmZlciwgb3B0cyk7XG4gIH1cbiAgc3RhdGljIGZyb21CdWZmZXIoYnVmZmVyLCBvcHRzID0ge30pIHtcbiAgICBjb25zdCBwc2J0QmFzZSA9IGJpcDE3NF8xLlBzYnQuZnJvbUJ1ZmZlcihidWZmZXIsIHRyYW5zYWN0aW9uRnJvbUJ1ZmZlcik7XG4gICAgY29uc3QgcHNidCA9IG5ldyBQc2J0KG9wdHMsIHBzYnRCYXNlKTtcbiAgICBjaGVja1R4Rm9yRHVwZUlucyhwc2J0Ll9fQ0FDSEUuX19UWCwgcHNidC5fX0NBQ0hFKTtcbiAgICByZXR1cm4gcHNidDtcbiAgfVxuICBnZXQgaW5wdXRDb3VudCgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLmlucHV0cy5sZW5ndGg7XG4gIH1cbiAgY29tYmluZSguLi50aG9zZSkge1xuICAgIHRoaXMuZGF0YS5jb21iaW5lKC4uLnRob3NlLm1hcChvID0+IG8uZGF0YSkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGNsb25lKCkge1xuICAgIC8vIFRPRE86IG1vcmUgZWZmaWNpZW50IGNsb25pbmdcbiAgICBjb25zdCByZXMgPSBQc2J0LmZyb21CdWZmZXIodGhpcy5kYXRhLnRvQnVmZmVyKCkpO1xuICAgIHJlcy5vcHRzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLm9wdHMpKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIHNldE1heGltdW1GZWVSYXRlKHNhdG9zaGlQZXJCeXRlKSB7XG4gICAgY2hlY2szMkJpdChzYXRvc2hpUGVyQnl0ZSk7IC8vIDQyLjkgQlRDIHBlciBieXRlIElTIGV4Y2Vzc2l2ZS4uLiBzbyB0aHJvd1xuICAgIHRoaXMub3B0cy5tYXhpbXVtRmVlUmF0ZSA9IHNhdG9zaGlQZXJCeXRlO1xuICB9XG4gIHNldFZlcnNpb24odmVyc2lvbikge1xuICAgIGNoZWNrMzJCaXQodmVyc2lvbik7XG4gICAgY2hlY2tJbnB1dHNGb3JQYXJ0aWFsU2lnKHRoaXMuZGF0YS5pbnB1dHMsICdzZXRWZXJzaW9uJyk7XG4gICAgY29uc3QgYyA9IHRoaXMuX19DQUNIRTtcbiAgICBjLl9fVFgudmVyc2lvbiA9IHZlcnNpb247XG4gICAgYy5fX0VYVFJBQ1RFRF9UWCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBzZXRMb2NrdGltZShsb2NrdGltZSkge1xuICAgIGNoZWNrMzJCaXQobG9ja3RpbWUpO1xuICAgIGNoZWNrSW5wdXRzRm9yUGFydGlhbFNpZyh0aGlzLmRhdGEuaW5wdXRzLCAnc2V0TG9ja3RpbWUnKTtcbiAgICBjb25zdCBjID0gdGhpcy5fX0NBQ0hFO1xuICAgIGMuX19UWC5sb2NrdGltZSA9IGxvY2t0aW1lO1xuICAgIGMuX19FWFRSQUNURURfVFggPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgc2V0SW5wdXRTZXF1ZW5jZShpbnB1dEluZGV4LCBzZXF1ZW5jZSkge1xuICAgIGNoZWNrMzJCaXQoc2VxdWVuY2UpO1xuICAgIGNoZWNrSW5wdXRzRm9yUGFydGlhbFNpZyh0aGlzLmRhdGEuaW5wdXRzLCAnc2V0SW5wdXRTZXF1ZW5jZScpO1xuICAgIGNvbnN0IGMgPSB0aGlzLl9fQ0FDSEU7XG4gICAgaWYgKGMuX19UWC5pbnMubGVuZ3RoIDw9IGlucHV0SW5kZXgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW5wdXQgaW5kZXggdG9vIGhpZ2gnKTtcbiAgICB9XG4gICAgYy5fX1RYLmluc1tpbnB1dEluZGV4XS5zZXF1ZW5jZSA9IHNlcXVlbmNlO1xuICAgIGMuX19FWFRSQUNURURfVFggPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgYWRkSW5wdXRzKGlucHV0RGF0YXMpIHtcbiAgICBpbnB1dERhdGFzLmZvckVhY2goaW5wdXREYXRhID0+IHRoaXMuYWRkSW5wdXQoaW5wdXREYXRhKSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgYWRkSW5wdXQoaW5wdXREYXRhKSB7XG4gICAgY2hlY2tJbnB1dHNGb3JQYXJ0aWFsU2lnKHRoaXMuZGF0YS5pbnB1dHMsICdhZGRJbnB1dCcpO1xuICAgIGNvbnN0IGMgPSB0aGlzLl9fQ0FDSEU7XG4gICAgdGhpcy5kYXRhLmFkZElucHV0KGlucHV0RGF0YSk7XG4gICAgY29uc3QgdHhJbiA9IGMuX19UWC5pbnNbYy5fX1RYLmlucy5sZW5ndGggLSAxXTtcbiAgICBjaGVja1R4SW5wdXRDYWNoZShjLCB0eEluKTtcbiAgICBjb25zdCBpbnB1dEluZGV4ID0gdGhpcy5kYXRhLmlucHV0cy5sZW5ndGggLSAxO1xuICAgIGNvbnN0IGlucHV0ID0gdGhpcy5kYXRhLmlucHV0c1tpbnB1dEluZGV4XTtcbiAgICBpZiAoaW5wdXQubm9uV2l0bmVzc1V0eG8pIHtcbiAgICAgIGFkZE5vbldpdG5lc3NUeENhY2hlKHRoaXMuX19DQUNIRSwgaW5wdXQsIGlucHV0SW5kZXgpO1xuICAgIH1cbiAgICBjLl9fRkVFID0gdW5kZWZpbmVkO1xuICAgIGMuX19GRUVfUkFURSA9IHVuZGVmaW5lZDtcbiAgICBjLl9fRVhUUkFDVEVEX1RYID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGFkZE91dHB1dHMob3V0cHV0RGF0YXMpIHtcbiAgICBvdXRwdXREYXRhcy5mb3JFYWNoKG91dHB1dERhdGEgPT4gdGhpcy5hZGRPdXRwdXQob3V0cHV0RGF0YSkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGFkZE91dHB1dChvdXRwdXREYXRhKSB7XG4gICAgY2hlY2tJbnB1dHNGb3JQYXJ0aWFsU2lnKHRoaXMuZGF0YS5pbnB1dHMsICdhZGRPdXRwdXQnKTtcbiAgICBjb25zdCB7IGFkZHJlc3MgfSA9IG91dHB1dERhdGE7XG4gICAgaWYgKHR5cGVvZiBhZGRyZXNzID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgeyBuZXR3b3JrIH0gPSB0aGlzLm9wdHM7XG4gICAgICBjb25zdCBzY3JpcHQgPSBhZGRyZXNzXzEudG9PdXRwdXRTY3JpcHQoYWRkcmVzcywgbmV0d29yayk7XG4gICAgICBvdXRwdXREYXRhID0gT2JqZWN0LmFzc2lnbihvdXRwdXREYXRhLCB7IHNjcmlwdCB9KTtcbiAgICB9XG4gICAgY29uc3QgYyA9IHRoaXMuX19DQUNIRTtcbiAgICB0aGlzLmRhdGEuYWRkT3V0cHV0KG91dHB1dERhdGEpO1xuICAgIGMuX19GRUUgPSB1bmRlZmluZWQ7XG4gICAgYy5fX0ZFRV9SQVRFID0gdW5kZWZpbmVkO1xuICAgIGMuX19FWFRSQUNURURfVFggPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZXh0cmFjdFRyYW5zYWN0aW9uKGRpc2FibGVGZWVDaGVjaykge1xuICAgIGlmICghdGhpcy5kYXRhLmlucHV0cy5ldmVyeShpc0ZpbmFsaXplZCkpIHRocm93IG5ldyBFcnJvcignTm90IGZpbmFsaXplZCcpO1xuICAgIGNvbnN0IGMgPSB0aGlzLl9fQ0FDSEU7XG4gICAgaWYgKCFkaXNhYmxlRmVlQ2hlY2spIHtcbiAgICAgIGNoZWNrRmVlcyh0aGlzLCBjLCB0aGlzLm9wdHMpO1xuICAgIH1cbiAgICBpZiAoYy5fX0VYVFJBQ1RFRF9UWCkgcmV0dXJuIGMuX19FWFRSQUNURURfVFg7XG4gICAgY29uc3QgdHggPSBjLl9fVFguY2xvbmUoKTtcbiAgICBpbnB1dEZpbmFsaXplR2V0QW10cyh0aGlzLmRhdGEuaW5wdXRzLCB0eCwgYywgdHJ1ZSk7XG4gICAgcmV0dXJuIHR4O1xuICB9XG4gIGdldEZlZVJhdGUoKSB7XG4gICAgcmV0dXJuIGdldFR4Q2FjaGVWYWx1ZShcbiAgICAgICdfX0ZFRV9SQVRFJyxcbiAgICAgICdmZWUgcmF0ZScsXG4gICAgICB0aGlzLmRhdGEuaW5wdXRzLFxuICAgICAgdGhpcy5fX0NBQ0hFLFxuICAgICk7XG4gIH1cbiAgZ2V0RmVlKCkge1xuICAgIHJldHVybiBnZXRUeENhY2hlVmFsdWUoJ19fRkVFJywgJ2ZlZScsIHRoaXMuZGF0YS5pbnB1dHMsIHRoaXMuX19DQUNIRSk7XG4gIH1cbiAgZmluYWxpemVBbGxJbnB1dHMoKSB7XG4gICAgdXRpbHNfMS5jaGVja0ZvcklucHV0KHRoaXMuZGF0YS5pbnB1dHMsIDApOyAvLyBtYWtpbmcgc3VyZSB3ZSBoYXZlIGF0IGxlYXN0IG9uZVxuICAgIHJhbmdlKHRoaXMuZGF0YS5pbnB1dHMubGVuZ3RoKS5mb3JFYWNoKGlkeCA9PiB0aGlzLmZpbmFsaXplSW5wdXQoaWR4KSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZmluYWxpemVJbnB1dChpbnB1dEluZGV4KSB7XG4gICAgY29uc3QgaW5wdXQgPSB1dGlsc18xLmNoZWNrRm9ySW5wdXQodGhpcy5kYXRhLmlucHV0cywgaW5wdXRJbmRleCk7XG4gICAgY29uc3QgeyBzY3JpcHQsIGlzUDJTSCwgaXNQMldTSCwgaXNTZWd3aXQgfSA9IGdldFNjcmlwdEZyb21JbnB1dChcbiAgICAgIGlucHV0SW5kZXgsXG4gICAgICBpbnB1dCxcbiAgICAgIHRoaXMuX19DQUNIRSxcbiAgICApO1xuICAgIGlmICghc2NyaXB0KSB0aHJvdyBuZXcgRXJyb3IoYE5vIHNjcmlwdCBmb3VuZCBmb3IgaW5wdXQgIyR7aW5wdXRJbmRleH1gKTtcbiAgICBjb25zdCBzY3JpcHRUeXBlID0gY2xhc3NpZnlTY3JpcHQoc2NyaXB0KTtcbiAgICBpZiAoIWNhbkZpbmFsaXplKGlucHV0LCBzY3JpcHQsIHNjcmlwdFR5cGUpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4gbm90IGZpbmFsaXplIGlucHV0ICMke2lucHV0SW5kZXh9YCk7XG4gICAgY2hlY2tQYXJ0aWFsU2lnU2lnaGFzaGVzKGlucHV0KTtcbiAgICBjb25zdCB7IGZpbmFsU2NyaXB0U2lnLCBmaW5hbFNjcmlwdFdpdG5lc3MgfSA9IGdldEZpbmFsU2NyaXB0cyhcbiAgICAgIHNjcmlwdCxcbiAgICAgIHNjcmlwdFR5cGUsXG4gICAgICBpbnB1dC5wYXJ0aWFsU2lnLFxuICAgICAgaXNTZWd3aXQsXG4gICAgICBpc1AyU0gsXG4gICAgICBpc1AyV1NILFxuICAgICk7XG4gICAgaWYgKGZpbmFsU2NyaXB0U2lnKSB0aGlzLmRhdGEudXBkYXRlSW5wdXQoaW5wdXRJbmRleCwgeyBmaW5hbFNjcmlwdFNpZyB9KTtcbiAgICBpZiAoZmluYWxTY3JpcHRXaXRuZXNzKVxuICAgICAgdGhpcy5kYXRhLnVwZGF0ZUlucHV0KGlucHV0SW5kZXgsIHsgZmluYWxTY3JpcHRXaXRuZXNzIH0pO1xuICAgIGlmICghZmluYWxTY3JpcHRTaWcgJiYgIWZpbmFsU2NyaXB0V2l0bmVzcylcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBlcnJvciBmaW5hbGl6aW5nIGlucHV0ICMke2lucHV0SW5kZXh9YCk7XG4gICAgdGhpcy5kYXRhLmNsZWFyRmluYWxpemVkSW5wdXQoaW5wdXRJbmRleCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdmFsaWRhdGVTaWduYXR1cmVzT2ZBbGxJbnB1dHMoKSB7XG4gICAgdXRpbHNfMS5jaGVja0ZvcklucHV0KHRoaXMuZGF0YS5pbnB1dHMsIDApOyAvLyBtYWtpbmcgc3VyZSB3ZSBoYXZlIGF0IGxlYXN0IG9uZVxuICAgIGNvbnN0IHJlc3VsdHMgPSByYW5nZSh0aGlzLmRhdGEuaW5wdXRzLmxlbmd0aCkubWFwKGlkeCA9PlxuICAgICAgdGhpcy52YWxpZGF0ZVNpZ25hdHVyZXNPZklucHV0KGlkeCksXG4gICAgKTtcbiAgICByZXR1cm4gcmVzdWx0cy5yZWR1Y2UoKGZpbmFsLCByZXMpID0+IHJlcyA9PT0gdHJ1ZSAmJiBmaW5hbCwgdHJ1ZSk7XG4gIH1cbiAgdmFsaWRhdGVTaWduYXR1cmVzT2ZJbnB1dChpbnB1dEluZGV4LCBwdWJrZXkpIHtcbiAgICBjb25zdCBpbnB1dCA9IHRoaXMuZGF0YS5pbnB1dHNbaW5wdXRJbmRleF07XG4gICAgY29uc3QgcGFydGlhbFNpZyA9IChpbnB1dCB8fCB7fSkucGFydGlhbFNpZztcbiAgICBpZiAoIWlucHV0IHx8ICFwYXJ0aWFsU2lnIHx8IHBhcnRpYWxTaWcubGVuZ3RoIDwgMSlcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gc2lnbmF0dXJlcyB0byB2YWxpZGF0ZScpO1xuICAgIGNvbnN0IG15U2lncyA9IHB1YmtleVxuICAgICAgPyBwYXJ0aWFsU2lnLmZpbHRlcihzaWcgPT4gc2lnLnB1YmtleS5lcXVhbHMocHVia2V5KSlcbiAgICAgIDogcGFydGlhbFNpZztcbiAgICBpZiAobXlTaWdzLmxlbmd0aCA8IDEpIHRocm93IG5ldyBFcnJvcignTm8gc2lnbmF0dXJlcyBmb3IgdGhpcyBwdWJrZXknKTtcbiAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgbGV0IGhhc2hDYWNoZTtcbiAgICBsZXQgc2NyaXB0Q2FjaGU7XG4gICAgbGV0IHNpZ2hhc2hDYWNoZTtcbiAgICBmb3IgKGNvbnN0IHBTaWcgb2YgbXlTaWdzKSB7XG4gICAgICBjb25zdCBzaWcgPSBic2NyaXB0LnNpZ25hdHVyZS5kZWNvZGUocFNpZy5zaWduYXR1cmUpO1xuICAgICAgY29uc3QgeyBoYXNoLCBzY3JpcHQgfSA9XG4gICAgICAgIHNpZ2hhc2hDYWNoZSAhPT0gc2lnLmhhc2hUeXBlXG4gICAgICAgICAgPyBnZXRIYXNoRm9yU2lnKFxuICAgICAgICAgICAgICBpbnB1dEluZGV4LFxuICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHt9LCBpbnB1dCwgeyBzaWdoYXNoVHlwZTogc2lnLmhhc2hUeXBlIH0pLFxuICAgICAgICAgICAgICB0aGlzLl9fQ0FDSEUsXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiB7IGhhc2g6IGhhc2hDYWNoZSwgc2NyaXB0OiBzY3JpcHRDYWNoZSB9O1xuICAgICAgc2lnaGFzaENhY2hlID0gc2lnLmhhc2hUeXBlO1xuICAgICAgaGFzaENhY2hlID0gaGFzaDtcbiAgICAgIHNjcmlwdENhY2hlID0gc2NyaXB0O1xuICAgICAgY2hlY2tTY3JpcHRGb3JQdWJrZXkocFNpZy5wdWJrZXksIHNjcmlwdCwgJ3ZlcmlmeScpO1xuICAgICAgY29uc3Qga2V5cGFpciA9IGVjcGFpcl8xLmZyb21QdWJsaWNLZXkocFNpZy5wdWJrZXkpO1xuICAgICAgcmVzdWx0cy5wdXNoKGtleXBhaXIudmVyaWZ5KGhhc2gsIHNpZy5zaWduYXR1cmUpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHMuZXZlcnkocmVzID0+IHJlcyA9PT0gdHJ1ZSk7XG4gIH1cbiAgc2lnbkFsbElucHV0c0hEKFxuICAgIGhkS2V5UGFpcixcbiAgICBzaWdoYXNoVHlwZXMgPSBbdHJhbnNhY3Rpb25fMS5UcmFuc2FjdGlvbi5TSUdIQVNIX0FMTF0sXG4gICkge1xuICAgIGlmICghaGRLZXlQYWlyIHx8ICFoZEtleVBhaXIucHVibGljS2V5IHx8ICFoZEtleVBhaXIuZmluZ2VycHJpbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTmVlZCBIRFNpZ25lciB0byBzaWduIGlucHV0Jyk7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGkgb2YgcmFuZ2UodGhpcy5kYXRhLmlucHV0cy5sZW5ndGgpKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLnNpZ25JbnB1dEhEKGksIGhkS2V5UGFpciwgc2lnaGFzaFR5cGVzKTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKHRydWUpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJlc3VsdHMucHVzaChmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChyZXN1bHRzLmV2ZXJ5KHYgPT4gdiA9PT0gZmFsc2UpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGlucHV0cyB3ZXJlIHNpZ25lZCcpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBzaWduQWxsSW5wdXRzSERBc3luYyhcbiAgICBoZEtleVBhaXIsXG4gICAgc2lnaGFzaFR5cGVzID0gW3RyYW5zYWN0aW9uXzEuVHJhbnNhY3Rpb24uU0lHSEFTSF9BTExdLFxuICApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKCFoZEtleVBhaXIgfHwgIWhkS2V5UGFpci5wdWJsaWNLZXkgfHwgIWhkS2V5UGFpci5maW5nZXJwcmludCkge1xuICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcignTmVlZCBIRFNpZ25lciB0byBzaWduIGlucHV0JykpO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgaSBvZiByYW5nZSh0aGlzLmRhdGEuaW5wdXRzLmxlbmd0aCkpIHtcbiAgICAgICAgcHJvbWlzZXMucHVzaChcbiAgICAgICAgICB0aGlzLnNpZ25JbnB1dEhEQXN5bmMoaSwgaGRLZXlQYWlyLCBzaWdoYXNoVHlwZXMpLnRoZW4oXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgIHJlc3VsdHMucHVzaCh0cnVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgIHJlc3VsdHMucHVzaChmYWxzZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xuICAgICAgICBpZiAocmVzdWx0cy5ldmVyeSh2ID0+IHYgPT09IGZhbHNlKSkge1xuICAgICAgICAgIHJldHVybiByZWplY3QobmV3IEVycm9yKCdObyBpbnB1dHMgd2VyZSBzaWduZWQnKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgc2lnbklucHV0SEQoXG4gICAgaW5wdXRJbmRleCxcbiAgICBoZEtleVBhaXIsXG4gICAgc2lnaGFzaFR5cGVzID0gW3RyYW5zYWN0aW9uXzEuVHJhbnNhY3Rpb24uU0lHSEFTSF9BTExdLFxuICApIHtcbiAgICBpZiAoIWhkS2V5UGFpciB8fCAhaGRLZXlQYWlyLnB1YmxpY0tleSB8fCAhaGRLZXlQYWlyLmZpbmdlcnByaW50KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05lZWQgSERTaWduZXIgdG8gc2lnbiBpbnB1dCcpO1xuICAgIH1cbiAgICBjb25zdCBzaWduZXJzID0gZ2V0U2lnbmVyc0Zyb21IRChpbnB1dEluZGV4LCB0aGlzLmRhdGEuaW5wdXRzLCBoZEtleVBhaXIpO1xuICAgIHNpZ25lcnMuZm9yRWFjaChzaWduZXIgPT4gdGhpcy5zaWduSW5wdXQoaW5wdXRJbmRleCwgc2lnbmVyLCBzaWdoYXNoVHlwZXMpKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBzaWduSW5wdXRIREFzeW5jKFxuICAgIGlucHV0SW5kZXgsXG4gICAgaGRLZXlQYWlyLFxuICAgIHNpZ2hhc2hUeXBlcyA9IFt0cmFuc2FjdGlvbl8xLlRyYW5zYWN0aW9uLlNJR0hBU0hfQUxMXSxcbiAgKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICghaGRLZXlQYWlyIHx8ICFoZEtleVBhaXIucHVibGljS2V5IHx8ICFoZEtleVBhaXIuZmluZ2VycHJpbnQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgRXJyb3IoJ05lZWQgSERTaWduZXIgdG8gc2lnbiBpbnB1dCcpKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHNpZ25lcnMgPSBnZXRTaWduZXJzRnJvbUhEKGlucHV0SW5kZXgsIHRoaXMuZGF0YS5pbnB1dHMsIGhkS2V5UGFpcik7XG4gICAgICBjb25zdCBwcm9taXNlcyA9IHNpZ25lcnMubWFwKHNpZ25lciA9PlxuICAgICAgICB0aGlzLnNpZ25JbnB1dEFzeW5jKGlucHV0SW5kZXgsIHNpZ25lciwgc2lnaGFzaFR5cGVzKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgIH0pO1xuICB9XG4gIHNpZ25BbGxJbnB1dHMoXG4gICAga2V5UGFpcixcbiAgICBzaWdoYXNoVHlwZXMgPSBbdHJhbnNhY3Rpb25fMS5UcmFuc2FjdGlvbi5TSUdIQVNIX0FMTF0sXG4gICkge1xuICAgIGlmICgha2V5UGFpciB8fCAha2V5UGFpci5wdWJsaWNLZXkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05lZWQgU2lnbmVyIHRvIHNpZ24gaW5wdXQnKTtcbiAgICAvLyBUT0RPOiBBZGQgYSBwdWJrZXkvcHVia2V5aGFzaCBjYWNoZSB0byBlYWNoIGlucHV0XG4gICAgLy8gYXMgaW5wdXQgaW5mb3JtYXRpb24gaXMgYWRkZWQsIHRoZW4gZXZlbnR1YWxseVxuICAgIC8vIG9wdGltaXplIHRoaXMgbWV0aG9kLlxuICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGkgb2YgcmFuZ2UodGhpcy5kYXRhLmlucHV0cy5sZW5ndGgpKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLnNpZ25JbnB1dChpLCBrZXlQYWlyLCBzaWdoYXNoVHlwZXMpO1xuICAgICAgICByZXN1bHRzLnB1c2godHJ1ZSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJlc3VsdHMuZXZlcnkodiA9PiB2ID09PSBmYWxzZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gaW5wdXRzIHdlcmUgc2lnbmVkJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHNpZ25BbGxJbnB1dHNBc3luYyhcbiAgICBrZXlQYWlyLFxuICAgIHNpZ2hhc2hUeXBlcyA9IFt0cmFuc2FjdGlvbl8xLlRyYW5zYWN0aW9uLlNJR0hBU0hfQUxMXSxcbiAgKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICgha2V5UGFpciB8fCAha2V5UGFpci5wdWJsaWNLZXkpXG4gICAgICAgIHJldHVybiByZWplY3QobmV3IEVycm9yKCdOZWVkIFNpZ25lciB0byBzaWduIGlucHV0JykpO1xuICAgICAgLy8gVE9ETzogQWRkIGEgcHVia2V5L3B1YmtleWhhc2ggY2FjaGUgdG8gZWFjaCBpbnB1dFxuICAgICAgLy8gYXMgaW5wdXQgaW5mb3JtYXRpb24gaXMgYWRkZWQsIHRoZW4gZXZlbnR1YWxseVxuICAgICAgLy8gb3B0aW1pemUgdGhpcyBtZXRob2QuXG4gICAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICAgICAgZm9yIChjb25zdCBbaV0gb2YgdGhpcy5kYXRhLmlucHV0cy5lbnRyaWVzKCkpIHtcbiAgICAgICAgcHJvbWlzZXMucHVzaChcbiAgICAgICAgICB0aGlzLnNpZ25JbnB1dEFzeW5jKGksIGtleVBhaXIsIHNpZ2hhc2hUeXBlcykudGhlbihcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHRydWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGZhbHNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7XG4gICAgICAgIGlmIChyZXN1bHRzLmV2ZXJ5KHYgPT4gdiA9PT0gZmFsc2UpKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgRXJyb3IoJ05vIGlucHV0cyB3ZXJlIHNpZ25lZCcpKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBzaWduSW5wdXQoXG4gICAgaW5wdXRJbmRleCxcbiAgICBrZXlQYWlyLFxuICAgIHNpZ2hhc2hUeXBlcyA9IFt0cmFuc2FjdGlvbl8xLlRyYW5zYWN0aW9uLlNJR0hBU0hfQUxMXSxcbiAgKSB7XG4gICAgaWYgKCFrZXlQYWlyIHx8ICFrZXlQYWlyLnB1YmxpY0tleSlcbiAgICAgIHRocm93IG5ldyBFcnJvcignTmVlZCBTaWduZXIgdG8gc2lnbiBpbnB1dCcpO1xuICAgIGNvbnN0IHsgaGFzaCwgc2lnaGFzaFR5cGUgfSA9IGdldEhhc2hBbmRTaWdoYXNoVHlwZShcbiAgICAgIHRoaXMuZGF0YS5pbnB1dHMsXG4gICAgICBpbnB1dEluZGV4LFxuICAgICAga2V5UGFpci5wdWJsaWNLZXksXG4gICAgICB0aGlzLl9fQ0FDSEUsXG4gICAgICBzaWdoYXNoVHlwZXMsXG4gICAgKTtcbiAgICBjb25zdCBwYXJ0aWFsU2lnID0gW1xuICAgICAge1xuICAgICAgICBwdWJrZXk6IGtleVBhaXIucHVibGljS2V5LFxuICAgICAgICBzaWduYXR1cmU6IGJzY3JpcHQuc2lnbmF0dXJlLmVuY29kZShrZXlQYWlyLnNpZ24oaGFzaCksIHNpZ2hhc2hUeXBlKSxcbiAgICAgIH0sXG4gICAgXTtcbiAgICB0aGlzLmRhdGEudXBkYXRlSW5wdXQoaW5wdXRJbmRleCwgeyBwYXJ0aWFsU2lnIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHNpZ25JbnB1dEFzeW5jKFxuICAgIGlucHV0SW5kZXgsXG4gICAga2V5UGFpcixcbiAgICBzaWdoYXNoVHlwZXMgPSBbdHJhbnNhY3Rpb25fMS5UcmFuc2FjdGlvbi5TSUdIQVNIX0FMTF0sXG4gICkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoIWtleVBhaXIgfHwgIWtleVBhaXIucHVibGljS2V5KVxuICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcignTmVlZCBTaWduZXIgdG8gc2lnbiBpbnB1dCcpKTtcbiAgICAgIGNvbnN0IHsgaGFzaCwgc2lnaGFzaFR5cGUgfSA9IGdldEhhc2hBbmRTaWdoYXNoVHlwZShcbiAgICAgICAgdGhpcy5kYXRhLmlucHV0cyxcbiAgICAgICAgaW5wdXRJbmRleCxcbiAgICAgICAga2V5UGFpci5wdWJsaWNLZXksXG4gICAgICAgIHRoaXMuX19DQUNIRSxcbiAgICAgICAgc2lnaGFzaFR5cGVzLFxuICAgICAgKTtcbiAgICAgIFByb21pc2UucmVzb2x2ZShrZXlQYWlyLnNpZ24oaGFzaCkpLnRoZW4oc2lnbmF0dXJlID0+IHtcbiAgICAgICAgY29uc3QgcGFydGlhbFNpZyA9IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwdWJrZXk6IGtleVBhaXIucHVibGljS2V5LFxuICAgICAgICAgICAgc2lnbmF0dXJlOiBic2NyaXB0LnNpZ25hdHVyZS5lbmNvZGUoc2lnbmF0dXJlLCBzaWdoYXNoVHlwZSksXG4gICAgICAgICAgfSxcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5kYXRhLnVwZGF0ZUlucHV0KGlucHV0SW5kZXgsIHsgcGFydGlhbFNpZyB9KTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgdG9CdWZmZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS50b0J1ZmZlcigpO1xuICB9XG4gIHRvSGV4KCkge1xuICAgIHJldHVybiB0aGlzLmRhdGEudG9IZXgoKTtcbiAgfVxuICB0b0Jhc2U2NCgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLnRvQmFzZTY0KCk7XG4gIH1cbiAgdXBkYXRlR2xvYmFsKHVwZGF0ZURhdGEpIHtcbiAgICB0aGlzLmRhdGEudXBkYXRlR2xvYmFsKHVwZGF0ZURhdGEpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHVwZGF0ZUlucHV0KGlucHV0SW5kZXgsIHVwZGF0ZURhdGEpIHtcbiAgICB0aGlzLmRhdGEudXBkYXRlSW5wdXQoaW5wdXRJbmRleCwgdXBkYXRlRGF0YSk7XG4gICAgaWYgKHVwZGF0ZURhdGEubm9uV2l0bmVzc1V0eG8pIHtcbiAgICAgIGFkZE5vbldpdG5lc3NUeENhY2hlKFxuICAgICAgICB0aGlzLl9fQ0FDSEUsXG4gICAgICAgIHRoaXMuZGF0YS5pbnB1dHNbaW5wdXRJbmRleF0sXG4gICAgICAgIGlucHV0SW5kZXgsXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB1cGRhdGVPdXRwdXQob3V0cHV0SW5kZXgsIHVwZGF0ZURhdGEpIHtcbiAgICB0aGlzLmRhdGEudXBkYXRlT3V0cHV0KG91dHB1dEluZGV4LCB1cGRhdGVEYXRhKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBhZGRVbmtub3duS2V5VmFsVG9HbG9iYWwoa2V5VmFsKSB7XG4gICAgdGhpcy5kYXRhLmFkZFVua25vd25LZXlWYWxUb0dsb2JhbChrZXlWYWwpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGFkZFVua25vd25LZXlWYWxUb0lucHV0KGlucHV0SW5kZXgsIGtleVZhbCkge1xuICAgIHRoaXMuZGF0YS5hZGRVbmtub3duS2V5VmFsVG9JbnB1dChpbnB1dEluZGV4LCBrZXlWYWwpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGFkZFVua25vd25LZXlWYWxUb091dHB1dChvdXRwdXRJbmRleCwga2V5VmFsKSB7XG4gICAgdGhpcy5kYXRhLmFkZFVua25vd25LZXlWYWxUb091dHB1dChvdXRwdXRJbmRleCwga2V5VmFsKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBjbGVhckZpbmFsaXplZElucHV0KGlucHV0SW5kZXgpIHtcbiAgICB0aGlzLmRhdGEuY2xlYXJGaW5hbGl6ZWRJbnB1dChpbnB1dEluZGV4KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuZXhwb3J0cy5Qc2J0ID0gUHNidDtcbi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBuZWVkZWQgdG8gcGFzcyB0byB0aGUgYmlwMTc0IGJhc2UgY2xhc3MncyBmcm9tQnVmZmVyLlxuICogSXQgdGFrZXMgdGhlIFwidHJhbnNhY3Rpb24gYnVmZmVyXCIgcG9ydGlvbiBvZiB0aGUgcHNidCBidWZmZXIgYW5kIHJldHVybnMgYVxuICogVHJhbnNhY3Rpb24gKEZyb20gdGhlIGJpcDE3NCBsaWJyYXJ5KSBpbnRlcmZhY2UuXG4gKi9cbmNvbnN0IHRyYW5zYWN0aW9uRnJvbUJ1ZmZlciA9IGJ1ZmZlciA9PiBuZXcgUHNidFRyYW5zYWN0aW9uKGJ1ZmZlcik7XG4vKipcbiAqIFRoaXMgY2xhc3MgaW1wbGVtZW50cyB0aGUgVHJhbnNhY3Rpb24gaW50ZXJmYWNlIGZyb20gYmlwMTc0IGxpYnJhcnkuXG4gKiBJdCBjb250YWlucyBhIGJpdGNvaW5qcy1saWIgVHJhbnNhY3Rpb24gb2JqZWN0LlxuICovXG5jbGFzcyBQc2J0VHJhbnNhY3Rpb24ge1xuICBjb25zdHJ1Y3RvcihidWZmZXIgPSBCdWZmZXIuZnJvbShbMiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0pKSB7XG4gICAgdGhpcy50eCA9IHRyYW5zYWN0aW9uXzEuVHJhbnNhY3Rpb24uZnJvbUJ1ZmZlcihidWZmZXIpO1xuICAgIGNoZWNrVHhFbXB0eSh0aGlzLnR4KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3R4Jywge1xuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuICBnZXRJbnB1dE91dHB1dENvdW50cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaW5wdXRDb3VudDogdGhpcy50eC5pbnMubGVuZ3RoLFxuICAgICAgb3V0cHV0Q291bnQ6IHRoaXMudHgub3V0cy5sZW5ndGgsXG4gICAgfTtcbiAgfVxuICBhZGRJbnB1dChpbnB1dCkge1xuICAgIGlmIChcbiAgICAgIGlucHV0Lmhhc2ggPT09IHVuZGVmaW5lZCB8fFxuICAgICAgaW5wdXQuaW5kZXggPT09IHVuZGVmaW5lZCB8fFxuICAgICAgKCFCdWZmZXIuaXNCdWZmZXIoaW5wdXQuaGFzaCkgJiYgdHlwZW9mIGlucHV0Lmhhc2ggIT09ICdzdHJpbmcnKSB8fFxuICAgICAgdHlwZW9mIGlucHV0LmluZGV4ICE9PSAnbnVtYmVyJ1xuICAgICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciBhZGRpbmcgaW5wdXQuJyk7XG4gICAgfVxuICAgIGNvbnN0IGhhc2ggPVxuICAgICAgdHlwZW9mIGlucHV0Lmhhc2ggPT09ICdzdHJpbmcnXG4gICAgICAgID8gYnVmZmVydXRpbHNfMS5yZXZlcnNlQnVmZmVyKEJ1ZmZlci5mcm9tKGlucHV0Lmhhc2gsICdoZXgnKSlcbiAgICAgICAgOiBpbnB1dC5oYXNoO1xuICAgIHRoaXMudHguYWRkSW5wdXQoaGFzaCwgaW5wdXQuaW5kZXgsIGlucHV0LnNlcXVlbmNlKTtcbiAgfVxuICBhZGRPdXRwdXQob3V0cHV0KSB7XG4gICAgaWYgKFxuICAgICAgb3V0cHV0LnNjcmlwdCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICBvdXRwdXQudmFsdWUgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgIUJ1ZmZlci5pc0J1ZmZlcihvdXRwdXQuc2NyaXB0KSB8fFxuICAgICAgdHlwZW9mIG91dHB1dC52YWx1ZSAhPT0gJ251bWJlcidcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3IgYWRkaW5nIG91dHB1dC4nKTtcbiAgICB9XG4gICAgdGhpcy50eC5hZGRPdXRwdXQob3V0cHV0LnNjcmlwdCwgb3V0cHV0LnZhbHVlKTtcbiAgfVxuICB0b0J1ZmZlcigpIHtcbiAgICByZXR1cm4gdGhpcy50eC50b0J1ZmZlcigpO1xuICB9XG59XG5mdW5jdGlvbiBjYW5GaW5hbGl6ZShpbnB1dCwgc2NyaXB0LCBzY3JpcHRUeXBlKSB7XG4gIHN3aXRjaCAoc2NyaXB0VHlwZSkge1xuICAgIGNhc2UgJ3B1YmtleSc6XG4gICAgY2FzZSAncHVia2V5aGFzaCc6XG4gICAgY2FzZSAnd2l0bmVzc3B1YmtleWhhc2gnOlxuICAgICAgcmV0dXJuIGhhc1NpZ3MoMSwgaW5wdXQucGFydGlhbFNpZyk7XG4gICAgY2FzZSAnbXVsdGlzaWcnOlxuICAgICAgY29uc3QgcDJtcyA9IHBheW1lbnRzLnAybXMoeyBvdXRwdXQ6IHNjcmlwdCB9KTtcbiAgICAgIHJldHVybiBoYXNTaWdzKHAybXMubSwgaW5wdXQucGFydGlhbFNpZyk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuZnVuY3Rpb24gaGFzU2lncyhuZWVkZWRTaWdzLCBwYXJ0aWFsU2lnKSB7XG4gIGlmICghcGFydGlhbFNpZykgcmV0dXJuIGZhbHNlO1xuICBpZiAocGFydGlhbFNpZy5sZW5ndGggPiBuZWVkZWRTaWdzKSB0aHJvdyBuZXcgRXJyb3IoJ1RvbyBtYW55IHNpZ25hdHVyZXMnKTtcbiAgcmV0dXJuIHBhcnRpYWxTaWcubGVuZ3RoID09PSBuZWVkZWRTaWdzO1xufVxuZnVuY3Rpb24gaXNGaW5hbGl6ZWQoaW5wdXQpIHtcbiAgcmV0dXJuICEhaW5wdXQuZmluYWxTY3JpcHRTaWcgfHwgISFpbnB1dC5maW5hbFNjcmlwdFdpdG5lc3M7XG59XG5mdW5jdGlvbiBpc1BheW1lbnRGYWN0b3J5KHBheW1lbnQpIHtcbiAgcmV0dXJuIHNjcmlwdCA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHBheW1lbnQoeyBvdXRwdXQ6IHNjcmlwdCB9KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcbn1cbmNvbnN0IGlzUDJNUyA9IGlzUGF5bWVudEZhY3RvcnkocGF5bWVudHMucDJtcyk7XG5jb25zdCBpc1AyUEsgPSBpc1BheW1lbnRGYWN0b3J5KHBheW1lbnRzLnAycGspO1xuY29uc3QgaXNQMlBLSCA9IGlzUGF5bWVudEZhY3RvcnkocGF5bWVudHMucDJwa2gpO1xuY29uc3QgaXNQMldQS0ggPSBpc1BheW1lbnRGYWN0b3J5KHBheW1lbnRzLnAyd3BraCk7XG5jb25zdCBpc1AyV1NIU2NyaXB0ID0gaXNQYXltZW50RmFjdG9yeShwYXltZW50cy5wMndzaCk7XG5mdW5jdGlvbiBjaGVjazMyQml0KG51bSkge1xuICBpZiAoXG4gICAgdHlwZW9mIG51bSAhPT0gJ251bWJlcicgfHxcbiAgICBudW0gIT09IE1hdGguZmxvb3IobnVtKSB8fFxuICAgIG51bSA+IDB4ZmZmZmZmZmYgfHxcbiAgICBudW0gPCAwXG4gICkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCAzMiBiaXQgaW50ZWdlcicpO1xuICB9XG59XG5mdW5jdGlvbiBjaGVja0ZlZXMocHNidCwgY2FjaGUsIG9wdHMpIHtcbiAgY29uc3QgZmVlUmF0ZSA9IGNhY2hlLl9fRkVFX1JBVEUgfHwgcHNidC5nZXRGZWVSYXRlKCk7XG4gIGNvbnN0IHZzaXplID0gY2FjaGUuX19FWFRSQUNURURfVFgudmlydHVhbFNpemUoKTtcbiAgY29uc3Qgc2F0b3NoaXMgPSBmZWVSYXRlICogdnNpemU7XG4gIGlmIChmZWVSYXRlID49IG9wdHMubWF4aW11bUZlZVJhdGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgV2FybmluZzogWW91IGFyZSBwYXlpbmcgYXJvdW5kICR7KHNhdG9zaGlzIC8gMWU4KS50b0ZpeGVkKDgpfSBpbiBgICtcbiAgICAgICAgYGZlZXMsIHdoaWNoIGlzICR7ZmVlUmF0ZX0gc2F0b3NoaSBwZXIgYnl0ZSBmb3IgYSB0cmFuc2FjdGlvbiBgICtcbiAgICAgICAgYHdpdGggYSBWU2l6ZSBvZiAke3ZzaXplfSBieXRlcyAoc2Vnd2l0IGNvdW50ZWQgYXMgMC4yNSBieXRlIHBlciBgICtcbiAgICAgICAgYGJ5dGUpLiBVc2Ugc2V0TWF4aW11bUZlZVJhdGUgbWV0aG9kIHRvIHJhaXNlIHlvdXIgdGhyZXNob2xkLCBvciBgICtcbiAgICAgICAgYHBhc3MgdHJ1ZSB0byB0aGUgZmlyc3QgYXJnIG9mIGV4dHJhY3RUcmFuc2FjdGlvbi5gLFxuICAgICk7XG4gIH1cbn1cbmZ1bmN0aW9uIGNoZWNrSW5wdXRzRm9yUGFydGlhbFNpZyhpbnB1dHMsIGFjdGlvbikge1xuICBpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgbGV0IHRocm93cyA9IGZhbHNlO1xuICAgIGxldCBwU2lncyA9IFtdO1xuICAgIGlmICgoaW5wdXQucGFydGlhbFNpZyB8fCBbXSkubGVuZ3RoID09PSAwKSB7XG4gICAgICBpZiAoIWlucHV0LmZpbmFsU2NyaXB0U2lnICYmICFpbnB1dC5maW5hbFNjcmlwdFdpdG5lc3MpIHJldHVybjtcbiAgICAgIHBTaWdzID0gZ2V0UHNpZ3NGcm9tSW5wdXRGaW5hbFNjcmlwdHMoaW5wdXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwU2lncyA9IGlucHV0LnBhcnRpYWxTaWc7XG4gICAgfVxuICAgIHBTaWdzLmZvckVhY2gocFNpZyA9PiB7XG4gICAgICBjb25zdCB7IGhhc2hUeXBlIH0gPSBic2NyaXB0LnNpZ25hdHVyZS5kZWNvZGUocFNpZy5zaWduYXR1cmUpO1xuICAgICAgY29uc3Qgd2hpdGVsaXN0ID0gW107XG4gICAgICBjb25zdCBpc0FueW9uZUNhblBheSA9XG4gICAgICAgIGhhc2hUeXBlICYgdHJhbnNhY3Rpb25fMS5UcmFuc2FjdGlvbi5TSUdIQVNIX0FOWU9ORUNBTlBBWTtcbiAgICAgIGlmIChpc0FueW9uZUNhblBheSkgd2hpdGVsaXN0LnB1c2goJ2FkZElucHV0Jyk7XG4gICAgICBjb25zdCBoYXNoTW9kID0gaGFzaFR5cGUgJiAweDFmO1xuICAgICAgc3dpdGNoIChoYXNoTW9kKSB7XG4gICAgICAgIGNhc2UgdHJhbnNhY3Rpb25fMS5UcmFuc2FjdGlvbi5TSUdIQVNIX0FMTDpcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0cmFuc2FjdGlvbl8xLlRyYW5zYWN0aW9uLlNJR0hBU0hfU0lOR0xFOlxuICAgICAgICBjYXNlIHRyYW5zYWN0aW9uXzEuVHJhbnNhY3Rpb24uU0lHSEFTSF9OT05FOlxuICAgICAgICAgIHdoaXRlbGlzdC5wdXNoKCdhZGRPdXRwdXQnKTtcbiAgICAgICAgICB3aGl0ZWxpc3QucHVzaCgnc2V0SW5wdXRTZXF1ZW5jZScpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKHdoaXRlbGlzdC5pbmRleE9mKGFjdGlvbikgPT09IC0xKSB7XG4gICAgICAgIHRocm93cyA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHRocm93cykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IG1vZGlmeSB0cmFuc2FjdGlvbiwgc2lnbmF0dXJlcyBleGlzdC4nKTtcbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gY2hlY2tQYXJ0aWFsU2lnU2lnaGFzaGVzKGlucHV0KSB7XG4gIGlmICghaW5wdXQuc2lnaGFzaFR5cGUgfHwgIWlucHV0LnBhcnRpYWxTaWcpIHJldHVybjtcbiAgY29uc3QgeyBwYXJ0aWFsU2lnLCBzaWdoYXNoVHlwZSB9ID0gaW5wdXQ7XG4gIHBhcnRpYWxTaWcuZm9yRWFjaChwU2lnID0+IHtcbiAgICBjb25zdCB7IGhhc2hUeXBlIH0gPSBic2NyaXB0LnNpZ25hdHVyZS5kZWNvZGUocFNpZy5zaWduYXR1cmUpO1xuICAgIGlmIChzaWdoYXNoVHlwZSAhPT0gaGFzaFR5cGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU2lnbmF0dXJlIHNpZ2hhc2ggZG9lcyBub3QgbWF0Y2ggaW5wdXQgc2lnaGFzaCB0eXBlJyk7XG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIGNoZWNrU2NyaXB0Rm9yUHVia2V5KHB1YmtleSwgc2NyaXB0LCBhY3Rpb24pIHtcbiAgY29uc3QgcHVia2V5SGFzaCA9IGNyeXB0b18xLmhhc2gxNjAocHVia2V5KTtcbiAgY29uc3QgZGVjb21waWxlZCA9IGJzY3JpcHQuZGVjb21waWxlKHNjcmlwdCk7XG4gIGlmIChkZWNvbXBpbGVkID09PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gc2NyaXB0IGVycm9yJyk7XG4gIGNvbnN0IGhhc0tleSA9IGRlY29tcGlsZWQuc29tZShlbGVtZW50ID0+IHtcbiAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdudW1iZXInKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIGVsZW1lbnQuZXF1YWxzKHB1YmtleSkgfHwgZWxlbWVudC5lcXVhbHMocHVia2V5SGFzaCk7XG4gIH0pO1xuICBpZiAoIWhhc0tleSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBDYW4gbm90ICR7YWN0aW9ufSBmb3IgdGhpcyBpbnB1dCB3aXRoIHRoZSBrZXkgJHtwdWJrZXkudG9TdHJpbmcoJ2hleCcpfWAsXG4gICAgKTtcbiAgfVxufVxuZnVuY3Rpb24gY2hlY2tUeEVtcHR5KHR4KSB7XG4gIGNvbnN0IGlzRW1wdHkgPSB0eC5pbnMuZXZlcnkoXG4gICAgaW5wdXQgPT5cbiAgICAgIGlucHV0LnNjcmlwdCAmJlxuICAgICAgaW5wdXQuc2NyaXB0Lmxlbmd0aCA9PT0gMCAmJlxuICAgICAgaW5wdXQud2l0bmVzcyAmJlxuICAgICAgaW5wdXQud2l0bmVzcy5sZW5ndGggPT09IDAsXG4gICk7XG4gIGlmICghaXNFbXB0eSkge1xuICAgIHRocm93IG5ldyBFcnJvcignRm9ybWF0IEVycm9yOiBUcmFuc2FjdGlvbiBTY3JpcHRTaWdzIGFyZSBub3QgZW1wdHknKTtcbiAgfVxufVxuZnVuY3Rpb24gY2hlY2tUeEZvckR1cGVJbnModHgsIGNhY2hlKSB7XG4gIHR4Lmlucy5mb3JFYWNoKGlucHV0ID0+IHtcbiAgICBjaGVja1R4SW5wdXRDYWNoZShjYWNoZSwgaW5wdXQpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGNoZWNrVHhJbnB1dENhY2hlKGNhY2hlLCBpbnB1dCkge1xuICBjb25zdCBrZXkgPVxuICAgIGJ1ZmZlcnV0aWxzXzEucmV2ZXJzZUJ1ZmZlcihCdWZmZXIuZnJvbShpbnB1dC5oYXNoKSkudG9TdHJpbmcoJ2hleCcpICtcbiAgICAnOicgK1xuICAgIGlucHV0LmluZGV4O1xuICBpZiAoY2FjaGUuX19UWF9JTl9DQUNIRVtrZXldKSB0aHJvdyBuZXcgRXJyb3IoJ0R1cGxpY2F0ZSBpbnB1dCBkZXRlY3RlZC4nKTtcbiAgY2FjaGUuX19UWF9JTl9DQUNIRVtrZXldID0gMTtcbn1cbmZ1bmN0aW9uIHNjcmlwdENoZWNrZXJGYWN0b3J5KHBheW1lbnQsIHBheW1lbnRTY3JpcHROYW1lKSB7XG4gIHJldHVybiAoaW5wdXRJbmRleCwgc2NyaXB0UHViS2V5LCByZWRlZW1TY3JpcHQpID0+IHtcbiAgICBjb25zdCByZWRlZW1TY3JpcHRPdXRwdXQgPSBwYXltZW50KHtcbiAgICAgIHJlZGVlbTogeyBvdXRwdXQ6IHJlZGVlbVNjcmlwdCB9LFxuICAgIH0pLm91dHB1dDtcbiAgICBpZiAoIXNjcmlwdFB1YktleS5lcXVhbHMocmVkZWVtU2NyaXB0T3V0cHV0KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgJHtwYXltZW50U2NyaXB0TmFtZX0gZm9yIGlucHV0ICMke2lucHV0SW5kZXh9IGRvZXNuJ3QgbWF0Y2ggdGhlIHNjcmlwdFB1YktleSBpbiB0aGUgcHJldm91dGAsXG4gICAgICApO1xuICAgIH1cbiAgfTtcbn1cbmNvbnN0IGNoZWNrUmVkZWVtU2NyaXB0ID0gc2NyaXB0Q2hlY2tlckZhY3RvcnkocGF5bWVudHMucDJzaCwgJ1JlZGVlbSBzY3JpcHQnKTtcbmNvbnN0IGNoZWNrV2l0bmVzc1NjcmlwdCA9IHNjcmlwdENoZWNrZXJGYWN0b3J5KFxuICBwYXltZW50cy5wMndzaCxcbiAgJ1dpdG5lc3Mgc2NyaXB0Jyxcbik7XG5mdW5jdGlvbiBnZXRUeENhY2hlVmFsdWUoa2V5LCBuYW1lLCBpbnB1dHMsIGMpIHtcbiAgaWYgKCFpbnB1dHMuZXZlcnkoaXNGaW5hbGl6ZWQpKVxuICAgIHRocm93IG5ldyBFcnJvcihgUFNCVCBtdXN0IGJlIGZpbmFsaXplZCB0byBjYWxjdWxhdGUgJHtuYW1lfWApO1xuICBpZiAoa2V5ID09PSAnX19GRUVfUkFURScgJiYgYy5fX0ZFRV9SQVRFKSByZXR1cm4gYy5fX0ZFRV9SQVRFO1xuICBpZiAoa2V5ID09PSAnX19GRUUnICYmIGMuX19GRUUpIHJldHVybiBjLl9fRkVFO1xuICBsZXQgdHg7XG4gIGxldCBtdXN0RmluYWxpemUgPSB0cnVlO1xuICBpZiAoYy5fX0VYVFJBQ1RFRF9UWCkge1xuICAgIHR4ID0gYy5fX0VYVFJBQ1RFRF9UWDtcbiAgICBtdXN0RmluYWxpemUgPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICB0eCA9IGMuX19UWC5jbG9uZSgpO1xuICB9XG4gIGlucHV0RmluYWxpemVHZXRBbXRzKGlucHV0cywgdHgsIGMsIG11c3RGaW5hbGl6ZSk7XG4gIGlmIChrZXkgPT09ICdfX0ZFRV9SQVRFJykgcmV0dXJuIGMuX19GRUVfUkFURTtcbiAgZWxzZSBpZiAoa2V5ID09PSAnX19GRUUnKSByZXR1cm4gYy5fX0ZFRTtcbn1cbmZ1bmN0aW9uIGdldEZpbmFsU2NyaXB0cyhcbiAgc2NyaXB0LFxuICBzY3JpcHRUeXBlLFxuICBwYXJ0aWFsU2lnLFxuICBpc1NlZ3dpdCxcbiAgaXNQMlNILFxuICBpc1AyV1NILFxuKSB7XG4gIGxldCBmaW5hbFNjcmlwdFNpZztcbiAgbGV0IGZpbmFsU2NyaXB0V2l0bmVzcztcbiAgLy8gV293LCB0aGUgcGF5bWVudHMgQVBJIGlzIHZlcnkgaGFuZHlcbiAgY29uc3QgcGF5bWVudCA9IGdldFBheW1lbnQoc2NyaXB0LCBzY3JpcHRUeXBlLCBwYXJ0aWFsU2lnKTtcbiAgY29uc3QgcDJ3c2ggPSAhaXNQMldTSCA/IG51bGwgOiBwYXltZW50cy5wMndzaCh7IHJlZGVlbTogcGF5bWVudCB9KTtcbiAgY29uc3QgcDJzaCA9ICFpc1AyU0ggPyBudWxsIDogcGF5bWVudHMucDJzaCh7IHJlZGVlbTogcDJ3c2ggfHwgcGF5bWVudCB9KTtcbiAgaWYgKGlzU2Vnd2l0KSB7XG4gICAgaWYgKHAyd3NoKSB7XG4gICAgICBmaW5hbFNjcmlwdFdpdG5lc3MgPSB3aXRuZXNzU3RhY2tUb1NjcmlwdFdpdG5lc3MocDJ3c2gud2l0bmVzcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbmFsU2NyaXB0V2l0bmVzcyA9IHdpdG5lc3NTdGFja1RvU2NyaXB0V2l0bmVzcyhwYXltZW50LndpdG5lc3MpO1xuICAgIH1cbiAgICBpZiAocDJzaCkge1xuICAgICAgZmluYWxTY3JpcHRTaWcgPSBwMnNoLmlucHV0O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAocDJzaCkge1xuICAgICAgZmluYWxTY3JpcHRTaWcgPSBwMnNoLmlucHV0O1xuICAgIH0gZWxzZSB7XG4gICAgICBmaW5hbFNjcmlwdFNpZyA9IHBheW1lbnQuaW5wdXQ7XG4gICAgfVxuICB9XG4gIHJldHVybiB7XG4gICAgZmluYWxTY3JpcHRTaWcsXG4gICAgZmluYWxTY3JpcHRXaXRuZXNzLFxuICB9O1xufVxuZnVuY3Rpb24gZ2V0SGFzaEFuZFNpZ2hhc2hUeXBlKFxuICBpbnB1dHMsXG4gIGlucHV0SW5kZXgsXG4gIHB1YmtleSxcbiAgY2FjaGUsXG4gIHNpZ2hhc2hUeXBlcyxcbikge1xuICBjb25zdCBpbnB1dCA9IHV0aWxzXzEuY2hlY2tGb3JJbnB1dChpbnB1dHMsIGlucHV0SW5kZXgpO1xuICBjb25zdCB7IGhhc2gsIHNpZ2hhc2hUeXBlLCBzY3JpcHQgfSA9IGdldEhhc2hGb3JTaWcoXG4gICAgaW5wdXRJbmRleCxcbiAgICBpbnB1dCxcbiAgICBjYWNoZSxcbiAgICBzaWdoYXNoVHlwZXMsXG4gICk7XG4gIGNoZWNrU2NyaXB0Rm9yUHVia2V5KHB1YmtleSwgc2NyaXB0LCAnc2lnbicpO1xuICByZXR1cm4ge1xuICAgIGhhc2gsXG4gICAgc2lnaGFzaFR5cGUsXG4gIH07XG59XG5mdW5jdGlvbiBnZXRIYXNoRm9yU2lnKGlucHV0SW5kZXgsIGlucHV0LCBjYWNoZSwgc2lnaGFzaFR5cGVzKSB7XG4gIGNvbnN0IHVuc2lnbmVkVHggPSBjYWNoZS5fX1RYO1xuICBjb25zdCBzaWdoYXNoVHlwZSA9XG4gICAgaW5wdXQuc2lnaGFzaFR5cGUgfHwgdHJhbnNhY3Rpb25fMS5UcmFuc2FjdGlvbi5TSUdIQVNIX0FMTDtcbiAgaWYgKHNpZ2hhc2hUeXBlcyAmJiBzaWdoYXNoVHlwZXMuaW5kZXhPZihzaWdoYXNoVHlwZSkgPCAwKSB7XG4gICAgY29uc3Qgc3RyID0gc2lnaGFzaFR5cGVUb1N0cmluZyhzaWdoYXNoVHlwZSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYFNpZ2hhc2ggdHlwZSBpcyBub3QgYWxsb3dlZC4gUmV0cnkgdGhlIHNpZ24gbWV0aG9kIHBhc3NpbmcgdGhlIGAgK1xuICAgICAgICBgc2lnaGFzaFR5cGVzIGFycmF5IG9mIHdoaXRlbGlzdGVkIHR5cGVzLiBTaWdoYXNoIHR5cGU6ICR7c3RyfWAsXG4gICAgKTtcbiAgfVxuICBsZXQgaGFzaDtcbiAgbGV0IHNjcmlwdDtcbiAgaWYgKGlucHV0Lm5vbldpdG5lc3NVdHhvKSB7XG4gICAgY29uc3Qgbm9uV2l0bmVzc1V0eG9UeCA9IG5vbldpdG5lc3NVdHhvVHhGcm9tQ2FjaGUoXG4gICAgICBjYWNoZSxcbiAgICAgIGlucHV0LFxuICAgICAgaW5wdXRJbmRleCxcbiAgICApO1xuICAgIGNvbnN0IHByZXZvdXRIYXNoID0gdW5zaWduZWRUeC5pbnNbaW5wdXRJbmRleF0uaGFzaDtcbiAgICBjb25zdCB1dHhvSGFzaCA9IG5vbldpdG5lc3NVdHhvVHguZ2V0SGFzaCgpO1xuICAgIC8vIElmIGEgbm9uLXdpdG5lc3MgVVRYTyBpcyBwcm92aWRlZCwgaXRzIGhhc2ggbXVzdCBtYXRjaCB0aGUgaGFzaCBzcGVjaWZpZWQgaW4gdGhlIHByZXZvdXRcbiAgICBpZiAoIXByZXZvdXRIYXNoLmVxdWFscyh1dHhvSGFzaCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYE5vbi13aXRuZXNzIFVUWE8gaGFzaCBmb3IgaW5wdXQgIyR7aW5wdXRJbmRleH0gZG9lc24ndCBtYXRjaCB0aGUgaGFzaCBzcGVjaWZpZWQgaW4gdGhlIHByZXZvdXRgLFxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgcHJldm91dEluZGV4ID0gdW5zaWduZWRUeC5pbnNbaW5wdXRJbmRleF0uaW5kZXg7XG4gICAgY29uc3QgcHJldm91dCA9IG5vbldpdG5lc3NVdHhvVHgub3V0c1twcmV2b3V0SW5kZXhdO1xuICAgIGlmIChpbnB1dC5yZWRlZW1TY3JpcHQpIHtcbiAgICAgIC8vIElmIGEgcmVkZWVtU2NyaXB0IGlzIHByb3ZpZGVkLCB0aGUgc2NyaXB0UHViS2V5IG11c3QgYmUgZm9yIHRoYXQgcmVkZWVtU2NyaXB0XG4gICAgICBjaGVja1JlZGVlbVNjcmlwdChpbnB1dEluZGV4LCBwcmV2b3V0LnNjcmlwdCwgaW5wdXQucmVkZWVtU2NyaXB0KTtcbiAgICAgIHNjcmlwdCA9IGlucHV0LnJlZGVlbVNjcmlwdDtcbiAgICB9IGVsc2Uge1xuICAgICAgc2NyaXB0ID0gcHJldm91dC5zY3JpcHQ7XG4gICAgfVxuICAgIGlmIChpc1AyV1NIU2NyaXB0KHNjcmlwdCkpIHtcbiAgICAgIGlmICghaW5wdXQud2l0bmVzc1NjcmlwdClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTZWd3aXQgaW5wdXQgbmVlZHMgd2l0bmVzc1NjcmlwdCBpZiBub3QgUDJXUEtIJyk7XG4gICAgICBjaGVja1dpdG5lc3NTY3JpcHQoaW5wdXRJbmRleCwgc2NyaXB0LCBpbnB1dC53aXRuZXNzU2NyaXB0KTtcbiAgICAgIGhhc2ggPSB1bnNpZ25lZFR4Lmhhc2hGb3JXaXRuZXNzVjAoXG4gICAgICAgIGlucHV0SW5kZXgsXG4gICAgICAgIGlucHV0LndpdG5lc3NTY3JpcHQsXG4gICAgICAgIHByZXZvdXQudmFsdWUsXG4gICAgICAgIHNpZ2hhc2hUeXBlLFxuICAgICAgKTtcbiAgICAgIHNjcmlwdCA9IGlucHV0LndpdG5lc3NTY3JpcHQ7XG4gICAgfSBlbHNlIGlmIChpc1AyV1BLSChzY3JpcHQpKSB7XG4gICAgICAvLyBQMldQS0ggdXNlcyB0aGUgUDJQS0ggdGVtcGxhdGUgZm9yIHByZXZvdXRTY3JpcHQgd2hlbiBzaWduaW5nXG4gICAgICBjb25zdCBzaWduaW5nU2NyaXB0ID0gcGF5bWVudHMucDJwa2goeyBoYXNoOiBzY3JpcHQuc2xpY2UoMikgfSkub3V0cHV0O1xuICAgICAgaGFzaCA9IHVuc2lnbmVkVHguaGFzaEZvcldpdG5lc3NWMChcbiAgICAgICAgaW5wdXRJbmRleCxcbiAgICAgICAgc2lnbmluZ1NjcmlwdCxcbiAgICAgICAgcHJldm91dC52YWx1ZSxcbiAgICAgICAgc2lnaGFzaFR5cGUsXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBoYXNoID0gdW5zaWduZWRUeC5oYXNoRm9yU2lnbmF0dXJlKGlucHV0SW5kZXgsIHNjcmlwdCwgc2lnaGFzaFR5cGUpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpbnB1dC53aXRuZXNzVXR4bykge1xuICAgIGxldCBfc2NyaXB0OyAvLyBzbyB3ZSBkb24ndCBzaGFkb3cgdGhlIGBsZXQgc2NyaXB0YCBhYm92ZVxuICAgIGlmIChpbnB1dC5yZWRlZW1TY3JpcHQpIHtcbiAgICAgIC8vIElmIGEgcmVkZWVtU2NyaXB0IGlzIHByb3ZpZGVkLCB0aGUgc2NyaXB0UHViS2V5IG11c3QgYmUgZm9yIHRoYXQgcmVkZWVtU2NyaXB0XG4gICAgICBjaGVja1JlZGVlbVNjcmlwdChcbiAgICAgICAgaW5wdXRJbmRleCxcbiAgICAgICAgaW5wdXQud2l0bmVzc1V0eG8uc2NyaXB0LFxuICAgICAgICBpbnB1dC5yZWRlZW1TY3JpcHQsXG4gICAgICApO1xuICAgICAgX3NjcmlwdCA9IGlucHV0LnJlZGVlbVNjcmlwdDtcbiAgICB9IGVsc2Uge1xuICAgICAgX3NjcmlwdCA9IGlucHV0LndpdG5lc3NVdHhvLnNjcmlwdDtcbiAgICB9XG4gICAgaWYgKGlzUDJXUEtIKF9zY3JpcHQpKSB7XG4gICAgICAvLyBQMldQS0ggdXNlcyB0aGUgUDJQS0ggdGVtcGxhdGUgZm9yIHByZXZvdXRTY3JpcHQgd2hlbiBzaWduaW5nXG4gICAgICBjb25zdCBzaWduaW5nU2NyaXB0ID0gcGF5bWVudHMucDJwa2goeyBoYXNoOiBfc2NyaXB0LnNsaWNlKDIpIH0pLm91dHB1dDtcbiAgICAgIGhhc2ggPSB1bnNpZ25lZFR4Lmhhc2hGb3JXaXRuZXNzVjAoXG4gICAgICAgIGlucHV0SW5kZXgsXG4gICAgICAgIHNpZ25pbmdTY3JpcHQsXG4gICAgICAgIGlucHV0LndpdG5lc3NVdHhvLnZhbHVlLFxuICAgICAgICBzaWdoYXNoVHlwZSxcbiAgICAgICk7XG4gICAgICBzY3JpcHQgPSBfc2NyaXB0O1xuICAgIH0gZWxzZSBpZiAoaXNQMldTSFNjcmlwdChfc2NyaXB0KSkge1xuICAgICAgaWYgKCFpbnB1dC53aXRuZXNzU2NyaXB0KVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NlZ3dpdCBpbnB1dCBuZWVkcyB3aXRuZXNzU2NyaXB0IGlmIG5vdCBQMldQS0gnKTtcbiAgICAgIGNoZWNrV2l0bmVzc1NjcmlwdChpbnB1dEluZGV4LCBfc2NyaXB0LCBpbnB1dC53aXRuZXNzU2NyaXB0KTtcbiAgICAgIGhhc2ggPSB1bnNpZ25lZFR4Lmhhc2hGb3JXaXRuZXNzVjAoXG4gICAgICAgIGlucHV0SW5kZXgsXG4gICAgICAgIGlucHV0LndpdG5lc3NTY3JpcHQsXG4gICAgICAgIGlucHV0LndpdG5lc3NVdHhvLnZhbHVlLFxuICAgICAgICBzaWdoYXNoVHlwZSxcbiAgICAgICk7XG4gICAgICAvLyB3YW50IHRvIG1ha2Ugc3VyZSB0aGUgc2NyaXB0IHdlIHJldHVybiBpcyB0aGUgYWN0dWFsIG1lYW5pbmdmdWwgc2NyaXB0XG4gICAgICBzY3JpcHQgPSBpbnB1dC53aXRuZXNzU2NyaXB0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBJbnB1dCAjJHtpbnB1dEluZGV4fSBoYXMgd2l0bmVzc1V0eG8gYnV0IG5vbi1zZWd3aXQgc2NyaXB0OiBgICtcbiAgICAgICAgICBgJHtfc2NyaXB0LnRvU3RyaW5nKCdoZXgnKX1gLFxuICAgICAgKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOZWVkIGEgVXR4byBpbnB1dCBpdGVtIGZvciBzaWduaW5nJyk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBzY3JpcHQsXG4gICAgc2lnaGFzaFR5cGUsXG4gICAgaGFzaCxcbiAgfTtcbn1cbmZ1bmN0aW9uIGdldFBheW1lbnQoc2NyaXB0LCBzY3JpcHRUeXBlLCBwYXJ0aWFsU2lnKSB7XG4gIGxldCBwYXltZW50O1xuICBzd2l0Y2ggKHNjcmlwdFR5cGUpIHtcbiAgICBjYXNlICdtdWx0aXNpZyc6XG4gICAgICBjb25zdCBzaWdzID0gZ2V0U29ydGVkU2lncyhzY3JpcHQsIHBhcnRpYWxTaWcpO1xuICAgICAgcGF5bWVudCA9IHBheW1lbnRzLnAybXMoe1xuICAgICAgICBvdXRwdXQ6IHNjcmlwdCxcbiAgICAgICAgc2lnbmF0dXJlczogc2lncyxcbiAgICAgIH0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncHVia2V5JzpcbiAgICAgIHBheW1lbnQgPSBwYXltZW50cy5wMnBrKHtcbiAgICAgICAgb3V0cHV0OiBzY3JpcHQsXG4gICAgICAgIHNpZ25hdHVyZTogcGFydGlhbFNpZ1swXS5zaWduYXR1cmUsXG4gICAgICB9KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3B1YmtleWhhc2gnOlxuICAgICAgcGF5bWVudCA9IHBheW1lbnRzLnAycGtoKHtcbiAgICAgICAgb3V0cHV0OiBzY3JpcHQsXG4gICAgICAgIHB1YmtleTogcGFydGlhbFNpZ1swXS5wdWJrZXksXG4gICAgICAgIHNpZ25hdHVyZTogcGFydGlhbFNpZ1swXS5zaWduYXR1cmUsXG4gICAgICB9KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3dpdG5lc3NwdWJrZXloYXNoJzpcbiAgICAgIHBheW1lbnQgPSBwYXltZW50cy5wMndwa2goe1xuICAgICAgICBvdXRwdXQ6IHNjcmlwdCxcbiAgICAgICAgcHVia2V5OiBwYXJ0aWFsU2lnWzBdLnB1YmtleSxcbiAgICAgICAgc2lnbmF0dXJlOiBwYXJ0aWFsU2lnWzBdLnNpZ25hdHVyZSxcbiAgICAgIH0pO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgcmV0dXJuIHBheW1lbnQ7XG59XG5mdW5jdGlvbiBnZXRQc2lnc0Zyb21JbnB1dEZpbmFsU2NyaXB0cyhpbnB1dCkge1xuICBjb25zdCBzY3JpcHRJdGVtcyA9ICFpbnB1dC5maW5hbFNjcmlwdFNpZ1xuICAgID8gW11cbiAgICA6IGJzY3JpcHQuZGVjb21waWxlKGlucHV0LmZpbmFsU2NyaXB0U2lnKSB8fCBbXTtcbiAgY29uc3Qgd2l0bmVzc0l0ZW1zID0gIWlucHV0LmZpbmFsU2NyaXB0V2l0bmVzc1xuICAgID8gW11cbiAgICA6IGJzY3JpcHQuZGVjb21waWxlKGlucHV0LmZpbmFsU2NyaXB0V2l0bmVzcykgfHwgW107XG4gIHJldHVybiBzY3JpcHRJdGVtc1xuICAgIC5jb25jYXQod2l0bmVzc0l0ZW1zKVxuICAgIC5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICByZXR1cm4gQnVmZmVyLmlzQnVmZmVyKGl0ZW0pICYmIGJzY3JpcHQuaXNDYW5vbmljYWxTY3JpcHRTaWduYXR1cmUoaXRlbSk7XG4gICAgfSlcbiAgICAubWFwKHNpZyA9PiAoeyBzaWduYXR1cmU6IHNpZyB9KSk7XG59XG5mdW5jdGlvbiBnZXRTY3JpcHRGcm9tSW5wdXQoaW5wdXRJbmRleCwgaW5wdXQsIGNhY2hlKSB7XG4gIGNvbnN0IHVuc2lnbmVkVHggPSBjYWNoZS5fX1RYO1xuICBjb25zdCByZXMgPSB7XG4gICAgc2NyaXB0OiBudWxsLFxuICAgIGlzU2Vnd2l0OiBmYWxzZSxcbiAgICBpc1AyU0g6IGZhbHNlLFxuICAgIGlzUDJXU0g6IGZhbHNlLFxuICB9O1xuICByZXMuaXNQMlNIID0gISFpbnB1dC5yZWRlZW1TY3JpcHQ7XG4gIHJlcy5pc1AyV1NIID0gISFpbnB1dC53aXRuZXNzU2NyaXB0O1xuICBpZiAoaW5wdXQud2l0bmVzc1NjcmlwdCkge1xuICAgIHJlcy5zY3JpcHQgPSBpbnB1dC53aXRuZXNzU2NyaXB0O1xuICB9IGVsc2UgaWYgKGlucHV0LnJlZGVlbVNjcmlwdCkge1xuICAgIHJlcy5zY3JpcHQgPSBpbnB1dC5yZWRlZW1TY3JpcHQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKGlucHV0Lm5vbldpdG5lc3NVdHhvKSB7XG4gICAgICBjb25zdCBub25XaXRuZXNzVXR4b1R4ID0gbm9uV2l0bmVzc1V0eG9UeEZyb21DYWNoZShcbiAgICAgICAgY2FjaGUsXG4gICAgICAgIGlucHV0LFxuICAgICAgICBpbnB1dEluZGV4LFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHByZXZvdXRJbmRleCA9IHVuc2lnbmVkVHguaW5zW2lucHV0SW5kZXhdLmluZGV4O1xuICAgICAgcmVzLnNjcmlwdCA9IG5vbldpdG5lc3NVdHhvVHgub3V0c1twcmV2b3V0SW5kZXhdLnNjcmlwdDtcbiAgICB9IGVsc2UgaWYgKGlucHV0LndpdG5lc3NVdHhvKSB7XG4gICAgICByZXMuc2NyaXB0ID0gaW5wdXQud2l0bmVzc1V0eG8uc2NyaXB0O1xuICAgIH1cbiAgfVxuICBpZiAoaW5wdXQud2l0bmVzc1NjcmlwdCB8fCBpc1AyV1BLSChyZXMuc2NyaXB0KSkge1xuICAgIHJlcy5pc1NlZ3dpdCA9IHRydWU7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbmZ1bmN0aW9uIGdldFNpZ25lcnNGcm9tSEQoaW5wdXRJbmRleCwgaW5wdXRzLCBoZEtleVBhaXIpIHtcbiAgY29uc3QgaW5wdXQgPSB1dGlsc18xLmNoZWNrRm9ySW5wdXQoaW5wdXRzLCBpbnB1dEluZGV4KTtcbiAgaWYgKCFpbnB1dC5iaXAzMkRlcml2YXRpb24gfHwgaW5wdXQuYmlwMzJEZXJpdmF0aW9uLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTmVlZCBiaXAzMkRlcml2YXRpb24gdG8gc2lnbiB3aXRoIEhEJyk7XG4gIH1cbiAgY29uc3QgbXlEZXJpdmF0aW9ucyA9IGlucHV0LmJpcDMyRGVyaXZhdGlvblxuICAgIC5tYXAoYmlwRHYgPT4ge1xuICAgICAgaWYgKGJpcER2Lm1hc3RlckZpbmdlcnByaW50LmVxdWFscyhoZEtleVBhaXIuZmluZ2VycHJpbnQpKSB7XG4gICAgICAgIHJldHVybiBiaXBEdjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9KVxuICAgIC5maWx0ZXIodiA9PiAhIXYpO1xuICBpZiAobXlEZXJpdmF0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnTmVlZCBvbmUgYmlwMzJEZXJpdmF0aW9uIG1hc3RlckZpbmdlcnByaW50IHRvIG1hdGNoIHRoZSBIRFNpZ25lciBmaW5nZXJwcmludCcsXG4gICAgKTtcbiAgfVxuICBjb25zdCBzaWduZXJzID0gbXlEZXJpdmF0aW9ucy5tYXAoYmlwRHYgPT4ge1xuICAgIGNvbnN0IG5vZGUgPSBoZEtleVBhaXIuZGVyaXZlUGF0aChiaXBEdi5wYXRoKTtcbiAgICBpZiAoIWJpcER2LnB1YmtleS5lcXVhbHMobm9kZS5wdWJsaWNLZXkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3B1YmtleSBkaWQgbm90IG1hdGNoIGJpcDMyRGVyaXZhdGlvbicpO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbiAgfSk7XG4gIHJldHVybiBzaWduZXJzO1xufVxuZnVuY3Rpb24gZ2V0U29ydGVkU2lncyhzY3JpcHQsIHBhcnRpYWxTaWcpIHtcbiAgY29uc3QgcDJtcyA9IHBheW1lbnRzLnAybXMoeyBvdXRwdXQ6IHNjcmlwdCB9KTtcbiAgLy8gZm9yIGVhY2ggcHVia2V5IGluIG9yZGVyIG9mIHAybXMgc2NyaXB0XG4gIHJldHVybiBwMm1zLnB1YmtleXNcbiAgICAubWFwKHBrID0+IHtcbiAgICAgIC8vIGZpbHRlciBwYXJ0aWFsU2lnIGFycmF5IGJ5IHB1YmtleSBiZWluZyBlcXVhbFxuICAgICAgcmV0dXJuIChcbiAgICAgICAgcGFydGlhbFNpZy5maWx0ZXIocHMgPT4ge1xuICAgICAgICAgIHJldHVybiBwcy5wdWJrZXkuZXF1YWxzKHBrKTtcbiAgICAgICAgfSlbMF0gfHwge31cbiAgICAgICkuc2lnbmF0dXJlO1xuICAgICAgLy8gQW55IHB1YmtleSB3aXRob3V0IGEgbWF0Y2ggd2lsbCByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAvLyB0aGlzIGxhc3QgZmlsdGVyIHJlbW92ZXMgYWxsIHRoZSB1bmRlZmluZWQgaXRlbXMgaW4gdGhlIGFycmF5LlxuICAgIH0pXG4gICAgLmZpbHRlcih2ID0+ICEhdik7XG59XG5mdW5jdGlvbiBzY3JpcHRXaXRuZXNzVG9XaXRuZXNzU3RhY2soYnVmZmVyKSB7XG4gIGxldCBvZmZzZXQgPSAwO1xuICBmdW5jdGlvbiByZWFkU2xpY2Uobikge1xuICAgIG9mZnNldCArPSBuO1xuICAgIHJldHVybiBidWZmZXIuc2xpY2Uob2Zmc2V0IC0gbiwgb2Zmc2V0KTtcbiAgfVxuICBmdW5jdGlvbiByZWFkVmFySW50KCkge1xuICAgIGNvbnN0IHZpID0gdmFydWludC5kZWNvZGUoYnVmZmVyLCBvZmZzZXQpO1xuICAgIG9mZnNldCArPSB2YXJ1aW50LmRlY29kZS5ieXRlcztcbiAgICByZXR1cm4gdmk7XG4gIH1cbiAgZnVuY3Rpb24gcmVhZFZhclNsaWNlKCkge1xuICAgIHJldHVybiByZWFkU2xpY2UocmVhZFZhckludCgpKTtcbiAgfVxuICBmdW5jdGlvbiByZWFkVmVjdG9yKCkge1xuICAgIGNvbnN0IGNvdW50ID0gcmVhZFZhckludCgpO1xuICAgIGNvbnN0IHZlY3RvciA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykgdmVjdG9yLnB1c2gocmVhZFZhclNsaWNlKCkpO1xuICAgIHJldHVybiB2ZWN0b3I7XG4gIH1cbiAgcmV0dXJuIHJlYWRWZWN0b3IoKTtcbn1cbmZ1bmN0aW9uIHNpZ2hhc2hUeXBlVG9TdHJpbmcoc2lnaGFzaFR5cGUpIHtcbiAgbGV0IHRleHQgPVxuICAgIHNpZ2hhc2hUeXBlICYgdHJhbnNhY3Rpb25fMS5UcmFuc2FjdGlvbi5TSUdIQVNIX0FOWU9ORUNBTlBBWVxuICAgICAgPyAnU0lHSEFTSF9BTllPTkVDQU5QQVkgfCAnXG4gICAgICA6ICcnO1xuICBjb25zdCBzaWdNb2QgPSBzaWdoYXNoVHlwZSAmIDB4MWY7XG4gIHN3aXRjaCAoc2lnTW9kKSB7XG4gICAgY2FzZSB0cmFuc2FjdGlvbl8xLlRyYW5zYWN0aW9uLlNJR0hBU0hfQUxMOlxuICAgICAgdGV4dCArPSAnU0lHSEFTSF9BTEwnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSB0cmFuc2FjdGlvbl8xLlRyYW5zYWN0aW9uLlNJR0hBU0hfU0lOR0xFOlxuICAgICAgdGV4dCArPSAnU0lHSEFTSF9TSU5HTEUnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSB0cmFuc2FjdGlvbl8xLlRyYW5zYWN0aW9uLlNJR0hBU0hfTk9ORTpcbiAgICAgIHRleHQgKz0gJ1NJR0hBU0hfTk9ORSc7XG4gICAgICBicmVhaztcbiAgfVxuICByZXR1cm4gdGV4dDtcbn1cbmZ1bmN0aW9uIHdpdG5lc3NTdGFja1RvU2NyaXB0V2l0bmVzcyh3aXRuZXNzKSB7XG4gIGxldCBidWZmZXIgPSBCdWZmZXIuYWxsb2NVbnNhZmUoMCk7XG4gIGZ1bmN0aW9uIHdyaXRlU2xpY2Uoc2xpY2UpIHtcbiAgICBidWZmZXIgPSBCdWZmZXIuY29uY2F0KFtidWZmZXIsIEJ1ZmZlci5mcm9tKHNsaWNlKV0pO1xuICB9XG4gIGZ1bmN0aW9uIHdyaXRlVmFySW50KGkpIHtcbiAgICBjb25zdCBjdXJyZW50TGVuID0gYnVmZmVyLmxlbmd0aDtcbiAgICBjb25zdCB2YXJpbnRMZW4gPSB2YXJ1aW50LmVuY29kaW5nTGVuZ3RoKGkpO1xuICAgIGJ1ZmZlciA9IEJ1ZmZlci5jb25jYXQoW2J1ZmZlciwgQnVmZmVyLmFsbG9jVW5zYWZlKHZhcmludExlbildKTtcbiAgICB2YXJ1aW50LmVuY29kZShpLCBidWZmZXIsIGN1cnJlbnRMZW4pO1xuICB9XG4gIGZ1bmN0aW9uIHdyaXRlVmFyU2xpY2Uoc2xpY2UpIHtcbiAgICB3cml0ZVZhckludChzbGljZS5sZW5ndGgpO1xuICAgIHdyaXRlU2xpY2Uoc2xpY2UpO1xuICB9XG4gIGZ1bmN0aW9uIHdyaXRlVmVjdG9yKHZlY3Rvcikge1xuICAgIHdyaXRlVmFySW50KHZlY3Rvci5sZW5ndGgpO1xuICAgIHZlY3Rvci5mb3JFYWNoKHdyaXRlVmFyU2xpY2UpO1xuICB9XG4gIHdyaXRlVmVjdG9yKHdpdG5lc3MpO1xuICByZXR1cm4gYnVmZmVyO1xufVxuZnVuY3Rpb24gYWRkTm9uV2l0bmVzc1R4Q2FjaGUoY2FjaGUsIGlucHV0LCBpbnB1dEluZGV4KSB7XG4gIGNhY2hlLl9fTk9OX1dJVE5FU1NfVVRYT19CVUZfQ0FDSEVbaW5wdXRJbmRleF0gPSBpbnB1dC5ub25XaXRuZXNzVXR4bztcbiAgY29uc3QgdHggPSB0cmFuc2FjdGlvbl8xLlRyYW5zYWN0aW9uLmZyb21CdWZmZXIoaW5wdXQubm9uV2l0bmVzc1V0eG8pO1xuICBjYWNoZS5fX05PTl9XSVRORVNTX1VUWE9fVFhfQ0FDSEVbaW5wdXRJbmRleF0gPSB0eDtcbiAgY29uc3Qgc2VsZiA9IGNhY2hlO1xuICBjb25zdCBzZWxmSW5kZXggPSBpbnB1dEluZGV4O1xuICBkZWxldGUgaW5wdXQubm9uV2l0bmVzc1V0eG87XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpbnB1dCwgJ25vbldpdG5lc3NVdHhvJywge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0KCkge1xuICAgICAgY29uc3QgYnVmID0gc2VsZi5fX05PTl9XSVRORVNTX1VUWE9fQlVGX0NBQ0hFW3NlbGZJbmRleF07XG4gICAgICBjb25zdCB0eENhY2hlID0gc2VsZi5fX05PTl9XSVRORVNTX1VUWE9fVFhfQ0FDSEVbc2VsZkluZGV4XTtcbiAgICAgIGlmIChidWYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gYnVmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbmV3QnVmID0gdHhDYWNoZS50b0J1ZmZlcigpO1xuICAgICAgICBzZWxmLl9fTk9OX1dJVE5FU1NfVVRYT19CVUZfQ0FDSEVbc2VsZkluZGV4XSA9IG5ld0J1ZjtcbiAgICAgICAgcmV0dXJuIG5ld0J1ZjtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNldChkYXRhKSB7XG4gICAgICBzZWxmLl9fTk9OX1dJVE5FU1NfVVRYT19CVUZfQ0FDSEVbc2VsZkluZGV4XSA9IGRhdGE7XG4gICAgfSxcbiAgfSk7XG59XG5mdW5jdGlvbiBpbnB1dEZpbmFsaXplR2V0QW10cyhpbnB1dHMsIHR4LCBjYWNoZSwgbXVzdEZpbmFsaXplKSB7XG4gIGxldCBpbnB1dEFtb3VudCA9IDA7XG4gIGlucHV0cy5mb3JFYWNoKChpbnB1dCwgaWR4KSA9PiB7XG4gICAgaWYgKG11c3RGaW5hbGl6ZSAmJiBpbnB1dC5maW5hbFNjcmlwdFNpZylcbiAgICAgIHR4Lmluc1tpZHhdLnNjcmlwdCA9IGlucHV0LmZpbmFsU2NyaXB0U2lnO1xuICAgIGlmIChtdXN0RmluYWxpemUgJiYgaW5wdXQuZmluYWxTY3JpcHRXaXRuZXNzKSB7XG4gICAgICB0eC5pbnNbaWR4XS53aXRuZXNzID0gc2NyaXB0V2l0bmVzc1RvV2l0bmVzc1N0YWNrKFxuICAgICAgICBpbnB1dC5maW5hbFNjcmlwdFdpdG5lc3MsXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoaW5wdXQud2l0bmVzc1V0eG8pIHtcbiAgICAgIGlucHV0QW1vdW50ICs9IGlucHV0LndpdG5lc3NVdHhvLnZhbHVlO1xuICAgIH0gZWxzZSBpZiAoaW5wdXQubm9uV2l0bmVzc1V0eG8pIHtcbiAgICAgIGNvbnN0IG53VHggPSBub25XaXRuZXNzVXR4b1R4RnJvbUNhY2hlKGNhY2hlLCBpbnB1dCwgaWR4KTtcbiAgICAgIGNvbnN0IHZvdXQgPSB0eC5pbnNbaWR4XS5pbmRleDtcbiAgICAgIGNvbnN0IG91dCA9IG53VHgub3V0c1t2b3V0XTtcbiAgICAgIGlucHV0QW1vdW50ICs9IG91dC52YWx1ZTtcbiAgICB9XG4gIH0pO1xuICBjb25zdCBvdXRwdXRBbW91bnQgPSB0eC5vdXRzLnJlZHVjZSgodG90YWwsIG8pID0+IHRvdGFsICsgby52YWx1ZSwgMCk7XG4gIGNvbnN0IGZlZSA9IGlucHV0QW1vdW50IC0gb3V0cHV0QW1vdW50O1xuICBpZiAoZmVlIDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignT3V0cHV0cyBhcmUgc3BlbmRpbmcgbW9yZSB0aGFuIElucHV0cycpO1xuICB9XG4gIGNvbnN0IGJ5dGVzID0gdHgudmlydHVhbFNpemUoKTtcbiAgY2FjaGUuX19GRUUgPSBmZWU7XG4gIGNhY2hlLl9fRVhUUkFDVEVEX1RYID0gdHg7XG4gIGNhY2hlLl9fRkVFX1JBVEUgPSBNYXRoLmZsb29yKGZlZSAvIGJ5dGVzKTtcbn1cbmZ1bmN0aW9uIG5vbldpdG5lc3NVdHhvVHhGcm9tQ2FjaGUoY2FjaGUsIGlucHV0LCBpbnB1dEluZGV4KSB7XG4gIGNvbnN0IGMgPSBjYWNoZS5fX05PTl9XSVRORVNTX1VUWE9fVFhfQ0FDSEU7XG4gIGlmICghY1tpbnB1dEluZGV4XSkge1xuICAgIGFkZE5vbldpdG5lc3NUeENhY2hlKGNhY2hlLCBpbnB1dCwgaW5wdXRJbmRleCk7XG4gIH1cbiAgcmV0dXJuIGNbaW5wdXRJbmRleF07XG59XG5mdW5jdGlvbiBjbGFzc2lmeVNjcmlwdChzY3JpcHQpIHtcbiAgaWYgKGlzUDJXUEtIKHNjcmlwdCkpIHJldHVybiAnd2l0bmVzc3B1YmtleWhhc2gnO1xuICBpZiAoaXNQMlBLSChzY3JpcHQpKSByZXR1cm4gJ3B1YmtleWhhc2gnO1xuICBpZiAoaXNQMk1TKHNjcmlwdCkpIHJldHVybiAnbXVsdGlzaWcnO1xuICBpZiAoaXNQMlBLKHNjcmlwdCkpIHJldHVybiAncHVia2V5JztcbiAgcmV0dXJuICdub25zdGFuZGFyZCc7XG59XG5mdW5jdGlvbiByYW5nZShuKSB7XG4gIHJldHVybiBbLi4uQXJyYXkobikua2V5cygpXTtcbn1cbiIsIid1c2Ugc3RyaWN0Jztcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBpbnB1dCA9IHJlcXVpcmUoJy4vaW5wdXQnKTtcbmV4cG9ydHMuaW5wdXQgPSBpbnB1dDtcbmNvbnN0IG91dHB1dCA9IHJlcXVpcmUoJy4vb3V0cHV0Jyk7XG5leHBvcnRzLm91dHB1dCA9IG91dHB1dDtcbiIsIid1c2Ugc3RyaWN0Jztcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4vLyBPUF9SRVRVUk4ge2RhdGF9XG5jb25zdCBic2NyaXB0ID0gcmVxdWlyZSgnLi4vc2NyaXB0Jyk7XG5jb25zdCBPUFMgPSBic2NyaXB0Lk9QUztcbmZ1bmN0aW9uIGNoZWNrKHNjcmlwdCkge1xuICBjb25zdCBidWZmZXIgPSBic2NyaXB0LmNvbXBpbGUoc2NyaXB0KTtcbiAgcmV0dXJuIGJ1ZmZlci5sZW5ndGggPiAxICYmIGJ1ZmZlclswXSA9PT0gT1BTLk9QX1JFVFVSTjtcbn1cbmV4cG9ydHMuY2hlY2sgPSBjaGVjaztcbmNoZWNrLnRvSlNPTiA9ICgpID0+IHtcbiAgcmV0dXJuICdudWxsIGRhdGEgb3V0cHV0Jztcbn07XG5jb25zdCBvdXRwdXQgPSB7IGNoZWNrIH07XG5leHBvcnRzLm91dHB1dCA9IG91dHB1dDtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIE9QXzAge3B1YktleUhhc2h9XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYnNjcmlwdCA9IHJlcXVpcmUoJy4uLy4uL3NjcmlwdCcpO1xuY29uc3Qgc2NyaXB0XzEgPSByZXF1aXJlKCcuLi8uLi9zY3JpcHQnKTtcbmZ1bmN0aW9uIGNoZWNrKHNjcmlwdCkge1xuICBjb25zdCBidWZmZXIgPSBic2NyaXB0LmNvbXBpbGUoc2NyaXB0KTtcbiAgcmV0dXJuIChcbiAgICBidWZmZXIubGVuZ3RoID09PSAyMiAmJlxuICAgIGJ1ZmZlclswXSA9PT0gc2NyaXB0XzEuT1BTLk9QXzAgJiZcbiAgICBidWZmZXJbMV0gPT09IDB4MTRcbiAgKTtcbn1cbmV4cG9ydHMuY2hlY2sgPSBjaGVjaztcbmNoZWNrLnRvSlNPTiA9ICgpID0+IHtcbiAgcmV0dXJuICdXaXRuZXNzIHB1YktleUhhc2ggb3V0cHV0Jztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgbmV0d29ya3NfMSA9IHJlcXVpcmUoJy4uL25ldHdvcmtzJyk7XG5jb25zdCBic2NyaXB0ID0gcmVxdWlyZSgnLi4vc2NyaXB0Jyk7XG5jb25zdCBsYXp5ID0gcmVxdWlyZSgnLi9sYXp5Jyk7XG5jb25zdCB0eXBlZiA9IHJlcXVpcmUoJ3R5cGVmb3JjZScpO1xuY29uc3QgT1BTID0gYnNjcmlwdC5PUFM7XG5mdW5jdGlvbiBzdGFja3NFcXVhbChhLCBiKSB7XG4gIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIGEuZXZlcnkoKHgsIGkpID0+IHtcbiAgICByZXR1cm4geC5lcXVhbHMoYltpXSk7XG4gIH0pO1xufVxuLy8gb3V0cHV0OiBPUF9SRVRVUk4gLi4uXG5mdW5jdGlvbiBwMmRhdGEoYSwgb3B0cykge1xuICBpZiAoIWEuZGF0YSAmJiAhYS5vdXRwdXQpIHRocm93IG5ldyBUeXBlRXJyb3IoJ05vdCBlbm91Z2ggZGF0YScpO1xuICBvcHRzID0gT2JqZWN0LmFzc2lnbih7IHZhbGlkYXRlOiB0cnVlIH0sIG9wdHMgfHwge30pO1xuICB0eXBlZihcbiAgICB7XG4gICAgICBuZXR3b3JrOiB0eXBlZi5tYXliZSh0eXBlZi5PYmplY3QpLFxuICAgICAgb3V0cHV0OiB0eXBlZi5tYXliZSh0eXBlZi5CdWZmZXIpLFxuICAgICAgZGF0YTogdHlwZWYubWF5YmUodHlwZWYuYXJyYXlPZih0eXBlZi5CdWZmZXIpKSxcbiAgICB9LFxuICAgIGEsXG4gICk7XG4gIGNvbnN0IG5ldHdvcmsgPSBhLm5ldHdvcmsgfHwgbmV0d29ya3NfMS5iaXRjb2luO1xuICBjb25zdCBvID0geyBuYW1lOiAnZW1iZWQnLCBuZXR3b3JrIH07XG4gIGxhenkucHJvcChvLCAnb3V0cHV0JywgKCkgPT4ge1xuICAgIGlmICghYS5kYXRhKSByZXR1cm47XG4gICAgcmV0dXJuIGJzY3JpcHQuY29tcGlsZShbT1BTLk9QX1JFVFVSTl0uY29uY2F0KGEuZGF0YSkpO1xuICB9KTtcbiAgbGF6eS5wcm9wKG8sICdkYXRhJywgKCkgPT4ge1xuICAgIGlmICghYS5vdXRwdXQpIHJldHVybjtcbiAgICByZXR1cm4gYnNjcmlwdC5kZWNvbXBpbGUoYS5vdXRwdXQpLnNsaWNlKDEpO1xuICB9KTtcbiAgLy8gZXh0ZW5kZWQgdmFsaWRhdGlvblxuICBpZiAob3B0cy52YWxpZGF0ZSkge1xuICAgIGlmIChhLm91dHB1dCkge1xuICAgICAgY29uc3QgY2h1bmtzID0gYnNjcmlwdC5kZWNvbXBpbGUoYS5vdXRwdXQpO1xuICAgICAgaWYgKGNodW5rc1swXSAhPT0gT1BTLk9QX1JFVFVSTikgdGhyb3cgbmV3IFR5cGVFcnJvcignT3V0cHV0IGlzIGludmFsaWQnKTtcbiAgICAgIGlmICghY2h1bmtzLnNsaWNlKDEpLmV2ZXJ5KHR5cGVmLkJ1ZmZlcikpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ091dHB1dCBpcyBpbnZhbGlkJyk7XG4gICAgICBpZiAoYS5kYXRhICYmICFzdGFja3NFcXVhbChhLmRhdGEsIG8uZGF0YSkpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0RhdGEgbWlzbWF0Y2gnKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24obywgYSk7XG59XG5leHBvcnRzLnAyZGF0YSA9IHAyZGF0YTtcbiIsIid1c2Ugc3RyaWN0Jztcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBiaXAzMiA9IHJlcXVpcmUoJ2JpcDMyJyk7XG5leHBvcnRzLmJpcDMyID0gYmlwMzI7XG5jb25zdCBhZGRyZXNzID0gcmVxdWlyZSgnLi9hZGRyZXNzJyk7XG5leHBvcnRzLmFkZHJlc3MgPSBhZGRyZXNzO1xuY29uc3QgY3J5cHRvID0gcmVxdWlyZSgnLi9jcnlwdG8nKTtcbmV4cG9ydHMuY3J5cHRvID0gY3J5cHRvO1xuY29uc3QgRUNQYWlyID0gcmVxdWlyZSgnLi9lY3BhaXInKTtcbmV4cG9ydHMuRUNQYWlyID0gRUNQYWlyO1xuY29uc3QgbmV0d29ya3MgPSByZXF1aXJlKCcuL25ldHdvcmtzJyk7XG5leHBvcnRzLm5ldHdvcmtzID0gbmV0d29ya3M7XG5jb25zdCBwYXltZW50cyA9IHJlcXVpcmUoJy4vcGF5bWVudHMnKTtcbmV4cG9ydHMucGF5bWVudHMgPSBwYXltZW50cztcbmNvbnN0IHNjcmlwdCA9IHJlcXVpcmUoJy4vc2NyaXB0Jyk7XG5leHBvcnRzLnNjcmlwdCA9IHNjcmlwdDtcbnZhciBibG9ja18xID0gcmVxdWlyZSgnLi9ibG9jaycpO1xuZXhwb3J0cy5CbG9jayA9IGJsb2NrXzEuQmxvY2s7XG52YXIgcHNidF8xID0gcmVxdWlyZSgnLi9wc2J0Jyk7XG5leHBvcnRzLlBzYnQgPSBwc2J0XzEuUHNidDtcbnZhciBzY3JpcHRfMSA9IHJlcXVpcmUoJy4vc2NyaXB0Jyk7XG5leHBvcnRzLm9wY29kZXMgPSBzY3JpcHRfMS5PUFM7XG52YXIgdHJhbnNhY3Rpb25fMSA9IHJlcXVpcmUoJy4vdHJhbnNhY3Rpb24nKTtcbmV4cG9ydHMuVHJhbnNhY3Rpb24gPSB0cmFuc2FjdGlvbl8xLlRyYW5zYWN0aW9uO1xudmFyIHRyYW5zYWN0aW9uX2J1aWxkZXJfMSA9IHJlcXVpcmUoJy4vdHJhbnNhY3Rpb25fYnVpbGRlcicpO1xuZXhwb3J0cy5UcmFuc2FjdGlvbkJ1aWxkZXIgPSB0cmFuc2FjdGlvbl9idWlsZGVyXzEuVHJhbnNhY3Rpb25CdWlsZGVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8ge3NpZ25hdHVyZX0ge3B1YktleX1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBic2NyaXB0ID0gcmVxdWlyZSgnLi4vLi4vc2NyaXB0Jyk7XG5mdW5jdGlvbiBjaGVjayhzY3JpcHQpIHtcbiAgY29uc3QgY2h1bmtzID0gYnNjcmlwdC5kZWNvbXBpbGUoc2NyaXB0KTtcbiAgcmV0dXJuIChcbiAgICBjaHVua3MubGVuZ3RoID09PSAyICYmXG4gICAgYnNjcmlwdC5pc0Nhbm9uaWNhbFNjcmlwdFNpZ25hdHVyZShjaHVua3NbMF0pICYmXG4gICAgYnNjcmlwdC5pc0Nhbm9uaWNhbFB1YktleShjaHVua3NbMV0pXG4gICk7XG59XG5leHBvcnRzLmNoZWNrID0gY2hlY2s7XG5jaGVjay50b0pTT04gPSAoKSA9PiB7XG4gIHJldHVybiAncHViS2V5SGFzaCBpbnB1dCc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIHByb3Aob2JqZWN0LCBuYW1lLCBmKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQoKSB7XG4gICAgICBjb25zdCBfdmFsdWUgPSBmLmNhbGwodGhpcyk7XG4gICAgICB0aGlzW25hbWVdID0gX3ZhbHVlO1xuICAgICAgcmV0dXJuIF92YWx1ZTtcbiAgICB9LFxuICAgIHNldChfdmFsdWUpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBuYW1lLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IF92YWx1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICB9KTtcbiAgICB9LFxuICB9KTtcbn1cbmV4cG9ydHMucHJvcCA9IHByb3A7XG5mdW5jdGlvbiB2YWx1ZShmKSB7XG4gIGxldCBfdmFsdWU7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgaWYgKF92YWx1ZSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gX3ZhbHVlO1xuICAgIF92YWx1ZSA9IGYoKTtcbiAgICByZXR1cm4gX3ZhbHVlO1xuICB9O1xufVxuZXhwb3J0cy52YWx1ZSA9IHZhbHVlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gT1BfRFVQIE9QX0hBU0gxNjAge3B1YktleUhhc2h9IE9QX0VRVUFMVkVSSUZZIE9QX0NIRUNLU0lHXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYnNjcmlwdCA9IHJlcXVpcmUoJy4uLy4uL3NjcmlwdCcpO1xuY29uc3Qgc2NyaXB0XzEgPSByZXF1aXJlKCcuLi8uLi9zY3JpcHQnKTtcbmZ1bmN0aW9uIGNoZWNrKHNjcmlwdCkge1xuICBjb25zdCBidWZmZXIgPSBic2NyaXB0LmNvbXBpbGUoc2NyaXB0KTtcbiAgcmV0dXJuIChcbiAgICBidWZmZXIubGVuZ3RoID09PSAyNSAmJlxuICAgIGJ1ZmZlclswXSA9PT0gc2NyaXB0XzEuT1BTLk9QX0RVUCAmJlxuICAgIGJ1ZmZlclsxXSA9PT0gc2NyaXB0XzEuT1BTLk9QX0hBU0gxNjAgJiZcbiAgICBidWZmZXJbMl0gPT09IDB4MTQgJiZcbiAgICBidWZmZXJbMjNdID09PSBzY3JpcHRfMS5PUFMuT1BfRVFVQUxWRVJJRlkgJiZcbiAgICBidWZmZXJbMjRdID09PSBzY3JpcHRfMS5PUFMuT1BfQ0hFQ0tTSUdcbiAgKTtcbn1cbmV4cG9ydHMuY2hlY2sgPSBjaGVjaztcbmNoZWNrLnRvSlNPTiA9ICgpID0+IHtcbiAgcmV0dXJuICdwdWJLZXlIYXNoIG91dHB1dCc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gT1BfMCBbc2lnbmF0dXJlcyAuLi5dXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYnNjcmlwdCA9IHJlcXVpcmUoJy4uLy4uL3NjcmlwdCcpO1xuY29uc3Qgc2NyaXB0XzEgPSByZXF1aXJlKCcuLi8uLi9zY3JpcHQnKTtcbmZ1bmN0aW9uIHBhcnRpYWxTaWduYXR1cmUodmFsdWUpIHtcbiAgcmV0dXJuIChcbiAgICB2YWx1ZSA9PT0gc2NyaXB0XzEuT1BTLk9QXzAgfHwgYnNjcmlwdC5pc0Nhbm9uaWNhbFNjcmlwdFNpZ25hdHVyZSh2YWx1ZSlcbiAgKTtcbn1cbmZ1bmN0aW9uIGNoZWNrKHNjcmlwdCwgYWxsb3dJbmNvbXBsZXRlKSB7XG4gIGNvbnN0IGNodW5rcyA9IGJzY3JpcHQuZGVjb21waWxlKHNjcmlwdCk7XG4gIGlmIChjaHVua3MubGVuZ3RoIDwgMikgcmV0dXJuIGZhbHNlO1xuICBpZiAoY2h1bmtzWzBdICE9PSBzY3JpcHRfMS5PUFMuT1BfMCkgcmV0dXJuIGZhbHNlO1xuICBpZiAoYWxsb3dJbmNvbXBsZXRlKSB7XG4gICAgcmV0dXJuIGNodW5rcy5zbGljZSgxKS5ldmVyeShwYXJ0aWFsU2lnbmF0dXJlKTtcbiAgfVxuICByZXR1cm4gY2h1bmtzLnNsaWNlKDEpLmV2ZXJ5KGJzY3JpcHQuaXNDYW5vbmljYWxTY3JpcHRTaWduYXR1cmUpO1xufVxuZXhwb3J0cy5jaGVjayA9IGNoZWNrO1xuY2hlY2sudG9KU09OID0gKCkgPT4ge1xuICByZXR1cm4gJ211bHRpc2lnIGlucHV0Jztcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyA8c2NyaXB0U2lnPiB7c2VyaWFsaXplZCBzY3JpcHRQdWJLZXkgc2NyaXB0fVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGJzY3JpcHQgPSByZXF1aXJlKCcuLi8uLi9zY3JpcHQnKTtcbmNvbnN0IHAybXMgPSByZXF1aXJlKCcuLi9tdWx0aXNpZycpO1xuY29uc3QgcDJwayA9IHJlcXVpcmUoJy4uL3B1YmtleScpO1xuY29uc3QgcDJwa2ggPSByZXF1aXJlKCcuLi9wdWJrZXloYXNoJyk7XG5jb25zdCBwMndwa2hvID0gcmVxdWlyZSgnLi4vd2l0bmVzc3B1YmtleWhhc2gvb3V0cHV0Jyk7XG5jb25zdCBwMndzaG8gPSByZXF1aXJlKCcuLi93aXRuZXNzc2NyaXB0aGFzaC9vdXRwdXQnKTtcbmZ1bmN0aW9uIGNoZWNrKHNjcmlwdCwgYWxsb3dJbmNvbXBsZXRlKSB7XG4gIGNvbnN0IGNodW5rcyA9IGJzY3JpcHQuZGVjb21waWxlKHNjcmlwdCk7XG4gIGlmIChjaHVua3MubGVuZ3RoIDwgMSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBsYXN0Q2h1bmsgPSBjaHVua3NbY2h1bmtzLmxlbmd0aCAtIDFdO1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihsYXN0Q2h1bmspKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHNjcmlwdFNpZ0NodW5rcyA9IGJzY3JpcHQuZGVjb21waWxlKFxuICAgIGJzY3JpcHQuY29tcGlsZShjaHVua3Muc2xpY2UoMCwgLTEpKSxcbiAgKTtcbiAgY29uc3QgcmVkZWVtU2NyaXB0Q2h1bmtzID0gYnNjcmlwdC5kZWNvbXBpbGUobGFzdENodW5rKTtcbiAgLy8gaXMgcmVkZWVtU2NyaXB0IGEgdmFsaWQgc2NyaXB0P1xuICBpZiAoIXJlZGVlbVNjcmlwdENodW5rcykgcmV0dXJuIGZhbHNlO1xuICAvLyBpcyByZWRlZW1TY3JpcHRTaWcgcHVzaCBvbmx5P1xuICBpZiAoIWJzY3JpcHQuaXNQdXNoT25seShzY3JpcHRTaWdDaHVua3MpKSByZXR1cm4gZmFsc2U7XG4gIC8vIGlzIHdpdG5lc3M/XG4gIGlmIChjaHVua3MubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHAyd3Noby5jaGVjayhyZWRlZW1TY3JpcHRDaHVua3MpIHx8IHAyd3BraG8uY2hlY2socmVkZWVtU2NyaXB0Q2h1bmtzKVxuICAgICk7XG4gIH1cbiAgLy8gbWF0Y2ggdHlwZXNcbiAgaWYgKFxuICAgIHAycGtoLmlucHV0LmNoZWNrKHNjcmlwdFNpZ0NodW5rcykgJiZcbiAgICBwMnBraC5vdXRwdXQuY2hlY2socmVkZWVtU2NyaXB0Q2h1bmtzKVxuICApXG4gICAgcmV0dXJuIHRydWU7XG4gIGlmIChcbiAgICBwMm1zLmlucHV0LmNoZWNrKHNjcmlwdFNpZ0NodW5rcywgYWxsb3dJbmNvbXBsZXRlKSAmJlxuICAgIHAybXMub3V0cHV0LmNoZWNrKHJlZGVlbVNjcmlwdENodW5rcylcbiAgKVxuICAgIHJldHVybiB0cnVlO1xuICBpZiAoXG4gICAgcDJway5pbnB1dC5jaGVjayhzY3JpcHRTaWdDaHVua3MpICYmXG4gICAgcDJway5vdXRwdXQuY2hlY2socmVkZWVtU2NyaXB0Q2h1bmtzKVxuICApXG4gICAgcmV0dXJuIHRydWU7XG4gIHJldHVybiBmYWxzZTtcbn1cbmV4cG9ydHMuY2hlY2sgPSBjaGVjaztcbmNoZWNrLnRvSlNPTiA9ICgpID0+IHtcbiAgcmV0dXJuICdzY3JpcHRIYXNoIGlucHV0Jztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaW5wdXQgPSByZXF1aXJlKCcuL2lucHV0Jyk7XG5leHBvcnRzLmlucHV0ID0gaW5wdXQ7XG5jb25zdCBvdXRwdXQgPSByZXF1aXJlKCcuL291dHB1dCcpO1xuZXhwb3J0cy5vdXRwdXQgPSBvdXRwdXQ7XG4iLCIndXNlIHN0cmljdCc7XG4vLyBPUF8wIHtzY3JpcHRIYXNofVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGJzY3JpcHQgPSByZXF1aXJlKCcuLi8uLi9zY3JpcHQnKTtcbmNvbnN0IHNjcmlwdF8xID0gcmVxdWlyZSgnLi4vLi4vc2NyaXB0Jyk7XG5mdW5jdGlvbiBjaGVjayhzY3JpcHQpIHtcbiAgY29uc3QgYnVmZmVyID0gYnNjcmlwdC5jb21waWxlKHNjcmlwdCk7XG4gIHJldHVybiAoXG4gICAgYnVmZmVyLmxlbmd0aCA9PT0gMzQgJiZcbiAgICBidWZmZXJbMF0gPT09IHNjcmlwdF8xLk9QUy5PUF8wICYmXG4gICAgYnVmZmVyWzFdID09PSAweDIwXG4gICk7XG59XG5leHBvcnRzLmNoZWNrID0gY2hlY2s7XG5jaGVjay50b0pTT04gPSAoKSA9PiB7XG4gIHJldHVybiAnV2l0bmVzcyBzY3JpcHRIYXNoIG91dHB1dCc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGRlY29kZShidWZmZXIsIG1heExlbmd0aCwgbWluaW1hbCkge1xuICBtYXhMZW5ndGggPSBtYXhMZW5ndGggfHwgNDtcbiAgbWluaW1hbCA9IG1pbmltYWwgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBtaW5pbWFsO1xuICBjb25zdCBsZW5ndGggPSBidWZmZXIubGVuZ3RoO1xuICBpZiAobGVuZ3RoID09PSAwKSByZXR1cm4gMDtcbiAgaWYgKGxlbmd0aCA+IG1heExlbmd0aCkgdGhyb3cgbmV3IFR5cGVFcnJvcignU2NyaXB0IG51bWJlciBvdmVyZmxvdycpO1xuICBpZiAobWluaW1hbCkge1xuICAgIGlmICgoYnVmZmVyW2xlbmd0aCAtIDFdICYgMHg3ZikgPT09IDApIHtcbiAgICAgIGlmIChsZW5ndGggPD0gMSB8fCAoYnVmZmVyW2xlbmd0aCAtIDJdICYgMHg4MCkgPT09IDApXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm9uLW1pbmltYWxseSBlbmNvZGVkIHNjcmlwdCBudW1iZXInKTtcbiAgICB9XG4gIH1cbiAgLy8gNDAtYml0XG4gIGlmIChsZW5ndGggPT09IDUpIHtcbiAgICBjb25zdCBhID0gYnVmZmVyLnJlYWRVSW50MzJMRSgwKTtcbiAgICBjb25zdCBiID0gYnVmZmVyLnJlYWRVSW50OCg0KTtcbiAgICBpZiAoYiAmIDB4ODApIHJldHVybiAtKChiICYgfjB4ODApICogMHgxMDAwMDAwMDAgKyBhKTtcbiAgICByZXR1cm4gYiAqIDB4MTAwMDAwMDAwICsgYTtcbiAgfVxuICAvLyAzMi1iaXQgLyAyNC1iaXQgLyAxNi1iaXQgLyA4LWJpdFxuICBsZXQgcmVzdWx0ID0gMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIHJlc3VsdCB8PSBidWZmZXJbaV0gPDwgKDggKiBpKTtcbiAgfVxuICBpZiAoYnVmZmVyW2xlbmd0aCAtIDFdICYgMHg4MClcbiAgICByZXR1cm4gLShyZXN1bHQgJiB+KDB4ODAgPDwgKDggKiAobGVuZ3RoIC0gMSkpKSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnRzLmRlY29kZSA9IGRlY29kZTtcbmZ1bmN0aW9uIHNjcmlwdE51bVNpemUoaSkge1xuICByZXR1cm4gaSA+IDB4N2ZmZmZmZmZcbiAgICA/IDVcbiAgICA6IGkgPiAweDdmZmZmZlxuICAgID8gNFxuICAgIDogaSA+IDB4N2ZmZlxuICAgID8gM1xuICAgIDogaSA+IDB4N2ZcbiAgICA/IDJcbiAgICA6IGkgPiAweDAwXG4gICAgPyAxXG4gICAgOiAwO1xufVxuZnVuY3Rpb24gZW5jb2RlKF9udW1iZXIpIHtcbiAgbGV0IHZhbHVlID0gTWF0aC5hYnMoX251bWJlcik7XG4gIGNvbnN0IHNpemUgPSBzY3JpcHROdW1TaXplKHZhbHVlKTtcbiAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKHNpemUpO1xuICBjb25zdCBuZWdhdGl2ZSA9IF9udW1iZXIgPCAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7ICsraSkge1xuICAgIGJ1ZmZlci53cml0ZVVJbnQ4KHZhbHVlICYgMHhmZiwgaSk7XG4gICAgdmFsdWUgPj49IDg7XG4gIH1cbiAgaWYgKGJ1ZmZlcltzaXplIC0gMV0gJiAweDgwKSB7XG4gICAgYnVmZmVyLndyaXRlVUludDgobmVnYXRpdmUgPyAweDgwIDogMHgwMCwgc2l6ZSAtIDEpO1xuICB9IGVsc2UgaWYgKG5lZ2F0aXZlKSB7XG4gICAgYnVmZmVyW3NpemUgLSAxXSB8PSAweDgwO1xuICB9XG4gIHJldHVybiBidWZmZXI7XG59XG5leHBvcnRzLmVuY29kZSA9IGVuY29kZTtcbiIsIid1c2Ugc3RyaWN0Jztcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBlbWJlZF8xID0gcmVxdWlyZSgnLi9lbWJlZCcpO1xuZXhwb3J0cy5lbWJlZCA9IGVtYmVkXzEucDJkYXRhO1xuY29uc3QgcDJtc18xID0gcmVxdWlyZSgnLi9wMm1zJyk7XG5leHBvcnRzLnAybXMgPSBwMm1zXzEucDJtcztcbmNvbnN0IHAycGtfMSA9IHJlcXVpcmUoJy4vcDJwaycpO1xuZXhwb3J0cy5wMnBrID0gcDJwa18xLnAycGs7XG5jb25zdCBwMnBraF8xID0gcmVxdWlyZSgnLi9wMnBraCcpO1xuZXhwb3J0cy5wMnBraCA9IHAycGtoXzEucDJwa2g7XG5jb25zdCBwMnNoXzEgPSByZXF1aXJlKCcuL3Ayc2gnKTtcbmV4cG9ydHMucDJzaCA9IHAyc2hfMS5wMnNoO1xuY29uc3QgcDJ3cGtoXzEgPSByZXF1aXJlKCcuL3Ayd3BraCcpO1xuZXhwb3J0cy5wMndwa2ggPSBwMndwa2hfMS5wMndwa2g7XG5jb25zdCBwMndzaF8xID0gcmVxdWlyZSgnLi9wMndzaCcpO1xuZXhwb3J0cy5wMndzaCA9IHAyd3NoXzEucDJ3c2g7XG4vLyBUT0RPXG4vLyB3aXRuZXNzIGNvbW1pdG1lbnRcbiIsIid1c2Ugc3RyaWN0Jztcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBiY3J5cHRvID0gcmVxdWlyZSgnLi4vY3J5cHRvJyk7XG5jb25zdCBuZXR3b3Jrc18xID0gcmVxdWlyZSgnLi4vbmV0d29ya3MnKTtcbmNvbnN0IGJzY3JpcHQgPSByZXF1aXJlKCcuLi9zY3JpcHQnKTtcbmNvbnN0IGxhenkgPSByZXF1aXJlKCcuL2xhenknKTtcbmNvbnN0IHR5cGVmID0gcmVxdWlyZSgndHlwZWZvcmNlJyk7XG5jb25zdCBPUFMgPSBic2NyaXB0Lk9QUztcbmNvbnN0IGJlY2gzMiA9IHJlcXVpcmUoJ2JlY2gzMicpO1xuY29uc3QgRU1QVFlfQlVGRkVSID0gQnVmZmVyLmFsbG9jKDApO1xuZnVuY3Rpb24gc3RhY2tzRXF1YWwoYSwgYikge1xuICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBhLmV2ZXJ5KCh4LCBpKSA9PiB7XG4gICAgcmV0dXJuIHguZXF1YWxzKGJbaV0pO1xuICB9KTtcbn1cbi8vIGlucHV0OiA8PlxuLy8gd2l0bmVzczogW3JlZGVlbVNjcmlwdFNpZyAuLi5dIHtyZWRlZW1TY3JpcHR9XG4vLyBvdXRwdXQ6IE9QXzAge3NoYTI1NihyZWRlZW1TY3JpcHQpfVxuZnVuY3Rpb24gcDJ3c2goYSwgb3B0cykge1xuICBpZiAoIWEuYWRkcmVzcyAmJiAhYS5oYXNoICYmICFhLm91dHB1dCAmJiAhYS5yZWRlZW0gJiYgIWEud2l0bmVzcylcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdOb3QgZW5vdWdoIGRhdGEnKTtcbiAgb3B0cyA9IE9iamVjdC5hc3NpZ24oeyB2YWxpZGF0ZTogdHJ1ZSB9LCBvcHRzIHx8IHt9KTtcbiAgdHlwZWYoXG4gICAge1xuICAgICAgbmV0d29yazogdHlwZWYubWF5YmUodHlwZWYuT2JqZWN0KSxcbiAgICAgIGFkZHJlc3M6IHR5cGVmLm1heWJlKHR5cGVmLlN0cmluZyksXG4gICAgICBoYXNoOiB0eXBlZi5tYXliZSh0eXBlZi5CdWZmZXJOKDMyKSksXG4gICAgICBvdXRwdXQ6IHR5cGVmLm1heWJlKHR5cGVmLkJ1ZmZlck4oMzQpKSxcbiAgICAgIHJlZGVlbTogdHlwZWYubWF5YmUoe1xuICAgICAgICBpbnB1dDogdHlwZWYubWF5YmUodHlwZWYuQnVmZmVyKSxcbiAgICAgICAgbmV0d29yazogdHlwZWYubWF5YmUodHlwZWYuT2JqZWN0KSxcbiAgICAgICAgb3V0cHV0OiB0eXBlZi5tYXliZSh0eXBlZi5CdWZmZXIpLFxuICAgICAgICB3aXRuZXNzOiB0eXBlZi5tYXliZSh0eXBlZi5hcnJheU9mKHR5cGVmLkJ1ZmZlcikpLFxuICAgICAgfSksXG4gICAgICBpbnB1dDogdHlwZWYubWF5YmUodHlwZWYuQnVmZmVyTigwKSksXG4gICAgICB3aXRuZXNzOiB0eXBlZi5tYXliZSh0eXBlZi5hcnJheU9mKHR5cGVmLkJ1ZmZlcikpLFxuICAgIH0sXG4gICAgYSxcbiAgKTtcbiAgY29uc3QgX2FkZHJlc3MgPSBsYXp5LnZhbHVlKCgpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBiZWNoMzIuZGVjb2RlKGEuYWRkcmVzcyk7XG4gICAgY29uc3QgdmVyc2lvbiA9IHJlc3VsdC53b3Jkcy5zaGlmdCgpO1xuICAgIGNvbnN0IGRhdGEgPSBiZWNoMzIuZnJvbVdvcmRzKHJlc3VsdC53b3Jkcyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZlcnNpb24sXG4gICAgICBwcmVmaXg6IHJlc3VsdC5wcmVmaXgsXG4gICAgICBkYXRhOiBCdWZmZXIuZnJvbShkYXRhKSxcbiAgICB9O1xuICB9KTtcbiAgY29uc3QgX3JjaHVua3MgPSBsYXp5LnZhbHVlKCgpID0+IHtcbiAgICByZXR1cm4gYnNjcmlwdC5kZWNvbXBpbGUoYS5yZWRlZW0uaW5wdXQpO1xuICB9KTtcbiAgbGV0IG5ldHdvcmsgPSBhLm5ldHdvcms7XG4gIGlmICghbmV0d29yaykge1xuICAgIG5ldHdvcmsgPSAoYS5yZWRlZW0gJiYgYS5yZWRlZW0ubmV0d29yaykgfHwgbmV0d29ya3NfMS5iaXRjb2luO1xuICB9XG4gIGNvbnN0IG8gPSB7IG5ldHdvcmsgfTtcbiAgbGF6eS5wcm9wKG8sICdhZGRyZXNzJywgKCkgPT4ge1xuICAgIGlmICghby5oYXNoKSByZXR1cm47XG4gICAgY29uc3Qgd29yZHMgPSBiZWNoMzIudG9Xb3JkcyhvLmhhc2gpO1xuICAgIHdvcmRzLnVuc2hpZnQoMHgwMCk7XG4gICAgcmV0dXJuIGJlY2gzMi5lbmNvZGUobmV0d29yay5iZWNoMzIsIHdvcmRzKTtcbiAgfSk7XG4gIGxhenkucHJvcChvLCAnaGFzaCcsICgpID0+IHtcbiAgICBpZiAoYS5vdXRwdXQpIHJldHVybiBhLm91dHB1dC5zbGljZSgyKTtcbiAgICBpZiAoYS5hZGRyZXNzKSByZXR1cm4gX2FkZHJlc3MoKS5kYXRhO1xuICAgIGlmIChvLnJlZGVlbSAmJiBvLnJlZGVlbS5vdXRwdXQpIHJldHVybiBiY3J5cHRvLnNoYTI1NihvLnJlZGVlbS5vdXRwdXQpO1xuICB9KTtcbiAgbGF6eS5wcm9wKG8sICdvdXRwdXQnLCAoKSA9PiB7XG4gICAgaWYgKCFvLmhhc2gpIHJldHVybjtcbiAgICByZXR1cm4gYnNjcmlwdC5jb21waWxlKFtPUFMuT1BfMCwgby5oYXNoXSk7XG4gIH0pO1xuICBsYXp5LnByb3AobywgJ3JlZGVlbScsICgpID0+IHtcbiAgICBpZiAoIWEud2l0bmVzcykgcmV0dXJuO1xuICAgIHJldHVybiB7XG4gICAgICBvdXRwdXQ6IGEud2l0bmVzc1thLndpdG5lc3MubGVuZ3RoIC0gMV0sXG4gICAgICBpbnB1dDogRU1QVFlfQlVGRkVSLFxuICAgICAgd2l0bmVzczogYS53aXRuZXNzLnNsaWNlKDAsIC0xKSxcbiAgICB9O1xuICB9KTtcbiAgbGF6eS5wcm9wKG8sICdpbnB1dCcsICgpID0+IHtcbiAgICBpZiAoIW8ud2l0bmVzcykgcmV0dXJuO1xuICAgIHJldHVybiBFTVBUWV9CVUZGRVI7XG4gIH0pO1xuICBsYXp5LnByb3AobywgJ3dpdG5lc3MnLCAoKSA9PiB7XG4gICAgLy8gdHJhbnNmb3JtIHJlZGVlbSBpbnB1dCB0byB3aXRuZXNzIHN0YWNrP1xuICAgIGlmIChcbiAgICAgIGEucmVkZWVtICYmXG4gICAgICBhLnJlZGVlbS5pbnB1dCAmJlxuICAgICAgYS5yZWRlZW0uaW5wdXQubGVuZ3RoID4gMCAmJlxuICAgICAgYS5yZWRlZW0ub3V0cHV0ICYmXG4gICAgICBhLnJlZGVlbS5vdXRwdXQubGVuZ3RoID4gMFxuICAgICkge1xuICAgICAgY29uc3Qgc3RhY2sgPSBic2NyaXB0LnRvU3RhY2soX3JjaHVua3MoKSk7XG4gICAgICAvLyBhc3NpZ24sIGFuZCBibGFuayB0aGUgZXhpc3RpbmcgaW5wdXRcbiAgICAgIG8ucmVkZWVtID0gT2JqZWN0LmFzc2lnbih7IHdpdG5lc3M6IHN0YWNrIH0sIGEucmVkZWVtKTtcbiAgICAgIG8ucmVkZWVtLmlucHV0ID0gRU1QVFlfQlVGRkVSO1xuICAgICAgcmV0dXJuIFtdLmNvbmNhdChzdGFjaywgYS5yZWRlZW0ub3V0cHV0KTtcbiAgICB9XG4gICAgaWYgKCFhLnJlZGVlbSkgcmV0dXJuO1xuICAgIGlmICghYS5yZWRlZW0ub3V0cHV0KSByZXR1cm47XG4gICAgaWYgKCFhLnJlZGVlbS53aXRuZXNzKSByZXR1cm47XG4gICAgcmV0dXJuIFtdLmNvbmNhdChhLnJlZGVlbS53aXRuZXNzLCBhLnJlZGVlbS5vdXRwdXQpO1xuICB9KTtcbiAgbGF6eS5wcm9wKG8sICduYW1lJywgKCkgPT4ge1xuICAgIGNvbnN0IG5hbWVQYXJ0cyA9IFsncDJ3c2gnXTtcbiAgICBpZiAoby5yZWRlZW0gIT09IHVuZGVmaW5lZCkgbmFtZVBhcnRzLnB1c2goby5yZWRlZW0ubmFtZSk7XG4gICAgcmV0dXJuIG5hbWVQYXJ0cy5qb2luKCctJyk7XG4gIH0pO1xuICAvLyBleHRlbmRlZCB2YWxpZGF0aW9uXG4gIGlmIChvcHRzLnZhbGlkYXRlKSB7XG4gICAgbGV0IGhhc2ggPSBCdWZmZXIuZnJvbShbXSk7XG4gICAgaWYgKGEuYWRkcmVzcykge1xuICAgICAgaWYgKF9hZGRyZXNzKCkucHJlZml4ICE9PSBuZXR3b3JrLmJlY2gzMilcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBwcmVmaXggb3IgTmV0d29yayBtaXNtYXRjaCcpO1xuICAgICAgaWYgKF9hZGRyZXNzKCkudmVyc2lvbiAhPT0gMHgwMClcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBhZGRyZXNzIHZlcnNpb24nKTtcbiAgICAgIGlmIChfYWRkcmVzcygpLmRhdGEubGVuZ3RoICE9PSAzMilcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBhZGRyZXNzIGRhdGEnKTtcbiAgICAgIGhhc2ggPSBfYWRkcmVzcygpLmRhdGE7XG4gICAgfVxuICAgIGlmIChhLmhhc2gpIHtcbiAgICAgIGlmIChoYXNoLmxlbmd0aCA+IDAgJiYgIWhhc2guZXF1YWxzKGEuaGFzaCkpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0hhc2ggbWlzbWF0Y2gnKTtcbiAgICAgIGVsc2UgaGFzaCA9IGEuaGFzaDtcbiAgICB9XG4gICAgaWYgKGEub3V0cHV0KSB7XG4gICAgICBpZiAoXG4gICAgICAgIGEub3V0cHV0Lmxlbmd0aCAhPT0gMzQgfHxcbiAgICAgICAgYS5vdXRwdXRbMF0gIT09IE9QUy5PUF8wIHx8XG4gICAgICAgIGEub3V0cHV0WzFdICE9PSAweDIwXG4gICAgICApXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ091dHB1dCBpcyBpbnZhbGlkJyk7XG4gICAgICBjb25zdCBoYXNoMiA9IGEub3V0cHV0LnNsaWNlKDIpO1xuICAgICAgaWYgKGhhc2gubGVuZ3RoID4gMCAmJiAhaGFzaC5lcXVhbHMoaGFzaDIpKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdIYXNoIG1pc21hdGNoJyk7XG4gICAgICBlbHNlIGhhc2ggPSBoYXNoMjtcbiAgICB9XG4gICAgaWYgKGEucmVkZWVtKSB7XG4gICAgICBpZiAoYS5yZWRlZW0ubmV0d29yayAmJiBhLnJlZGVlbS5uZXR3b3JrICE9PSBuZXR3b3JrKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdOZXR3b3JrIG1pc21hdGNoJyk7XG4gICAgICAvLyBpcyB0aGVyZSB0d28gcmVkZWVtIHNvdXJjZXM/XG4gICAgICBpZiAoXG4gICAgICAgIGEucmVkZWVtLmlucHV0ICYmXG4gICAgICAgIGEucmVkZWVtLmlucHV0Lmxlbmd0aCA+IDAgJiZcbiAgICAgICAgYS5yZWRlZW0ud2l0bmVzcyAmJlxuICAgICAgICBhLnJlZGVlbS53aXRuZXNzLmxlbmd0aCA+IDBcbiAgICAgIClcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQW1iaWd1b3VzIHdpdG5lc3Mgc291cmNlJyk7XG4gICAgICAvLyBpcyB0aGUgcmVkZWVtIG91dHB1dCBub24tZW1wdHk/XG4gICAgICBpZiAoYS5yZWRlZW0ub3V0cHV0KSB7XG4gICAgICAgIGlmIChic2NyaXB0LmRlY29tcGlsZShhLnJlZGVlbS5vdXRwdXQpLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdSZWRlZW0ub3V0cHV0IGlzIGludmFsaWQnKTtcbiAgICAgICAgLy8gbWF0Y2ggaGFzaCBhZ2FpbnN0IG90aGVyIHNvdXJjZXNcbiAgICAgICAgY29uc3QgaGFzaDIgPSBiY3J5cHRvLnNoYTI1NihhLnJlZGVlbS5vdXRwdXQpO1xuICAgICAgICBpZiAoaGFzaC5sZW5ndGggPiAwICYmICFoYXNoLmVxdWFscyhoYXNoMikpXG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSGFzaCBtaXNtYXRjaCcpO1xuICAgICAgICBlbHNlIGhhc2ggPSBoYXNoMjtcbiAgICAgIH1cbiAgICAgIGlmIChhLnJlZGVlbS5pbnB1dCAmJiAhYnNjcmlwdC5pc1B1c2hPbmx5KF9yY2h1bmtzKCkpKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdOb24gcHVzaC1vbmx5IHNjcmlwdFNpZycpO1xuICAgICAgaWYgKFxuICAgICAgICBhLndpdG5lc3MgJiZcbiAgICAgICAgYS5yZWRlZW0ud2l0bmVzcyAmJlxuICAgICAgICAhc3RhY2tzRXF1YWwoYS53aXRuZXNzLCBhLnJlZGVlbS53aXRuZXNzKVxuICAgICAgKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdXaXRuZXNzIGFuZCByZWRlZW0ud2l0bmVzcyBtaXNtYXRjaCcpO1xuICAgIH1cbiAgICBpZiAoYS53aXRuZXNzKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGEucmVkZWVtICYmXG4gICAgICAgIGEucmVkZWVtLm91dHB1dCAmJlxuICAgICAgICAhYS5yZWRlZW0ub3V0cHV0LmVxdWFscyhhLndpdG5lc3NbYS53aXRuZXNzLmxlbmd0aCAtIDFdKVxuICAgICAgKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdXaXRuZXNzIGFuZCByZWRlZW0ub3V0cHV0IG1pc21hdGNoJyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBPYmplY3QuYXNzaWduKG8sIGEpO1xufVxuZXhwb3J0cy5wMndzaCA9IHAyd3NoO1xuIiwiJ3VzZSBzdHJpY3QnO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IG5ldHdvcmtzID0gcmVxdWlyZSgnLi9uZXR3b3JrcycpO1xuY29uc3QgcGF5bWVudHMgPSByZXF1aXJlKCcuL3BheW1lbnRzJyk7XG5jb25zdCBic2NyaXB0ID0gcmVxdWlyZSgnLi9zY3JpcHQnKTtcbmNvbnN0IHR5cGVzID0gcmVxdWlyZSgnLi90eXBlcycpO1xuY29uc3QgYmVjaDMyID0gcmVxdWlyZSgnYmVjaDMyJyk7XG5jb25zdCBiczU4Y2hlY2sgPSByZXF1aXJlKCdiczU4Y2hlY2snKTtcbmNvbnN0IHR5cGVmb3JjZSA9IHJlcXVpcmUoJ3R5cGVmb3JjZScpO1xuZnVuY3Rpb24gZnJvbUJhc2U1OENoZWNrKGFkZHJlc3MpIHtcbiAgY29uc3QgcGF5bG9hZCA9IGJzNThjaGVjay5kZWNvZGUoYWRkcmVzcyk7XG4gIC8vIFRPRE86IDQuMC4wLCBtb3ZlIHRvIFwidG9PdXRwdXRTY3JpcHRcIlxuICBpZiAocGF5bG9hZC5sZW5ndGggPCAyMSkgdGhyb3cgbmV3IFR5cGVFcnJvcihhZGRyZXNzICsgJyBpcyB0b28gc2hvcnQnKTtcbiAgaWYgKHBheWxvYWQubGVuZ3RoID4gMjEpIHRocm93IG5ldyBUeXBlRXJyb3IoYWRkcmVzcyArICcgaXMgdG9vIGxvbmcnKTtcbiAgY29uc3QgdmVyc2lvbiA9IHBheWxvYWQucmVhZFVJbnQ4KDApO1xuICBjb25zdCBoYXNoID0gcGF5bG9hZC5zbGljZSgxKTtcbiAgcmV0dXJuIHsgdmVyc2lvbiwgaGFzaCB9O1xufVxuZXhwb3J0cy5mcm9tQmFzZTU4Q2hlY2sgPSBmcm9tQmFzZTU4Q2hlY2s7XG5mdW5jdGlvbiBmcm9tQmVjaDMyKGFkZHJlc3MpIHtcbiAgY29uc3QgcmVzdWx0ID0gYmVjaDMyLmRlY29kZShhZGRyZXNzKTtcbiAgY29uc3QgZGF0YSA9IGJlY2gzMi5mcm9tV29yZHMocmVzdWx0LndvcmRzLnNsaWNlKDEpKTtcbiAgcmV0dXJuIHtcbiAgICB2ZXJzaW9uOiByZXN1bHQud29yZHNbMF0sXG4gICAgcHJlZml4OiByZXN1bHQucHJlZml4LFxuICAgIGRhdGE6IEJ1ZmZlci5mcm9tKGRhdGEpLFxuICB9O1xufVxuZXhwb3J0cy5mcm9tQmVjaDMyID0gZnJvbUJlY2gzMjtcbmZ1bmN0aW9uIHRvQmFzZTU4Q2hlY2soaGFzaCwgdmVyc2lvbikge1xuICB0eXBlZm9yY2UodHlwZXMudHVwbGUodHlwZXMuSGFzaDE2MGJpdCwgdHlwZXMuVUludDgpLCBhcmd1bWVudHMpO1xuICBjb25zdCBwYXlsb2FkID0gQnVmZmVyLmFsbG9jVW5zYWZlKDIxKTtcbiAgcGF5bG9hZC53cml0ZVVJbnQ4KHZlcnNpb24sIDApO1xuICBoYXNoLmNvcHkocGF5bG9hZCwgMSk7XG4gIHJldHVybiBiczU4Y2hlY2suZW5jb2RlKHBheWxvYWQpO1xufVxuZXhwb3J0cy50b0Jhc2U1OENoZWNrID0gdG9CYXNlNThDaGVjaztcbmZ1bmN0aW9uIHRvQmVjaDMyKGRhdGEsIHZlcnNpb24sIHByZWZpeCkge1xuICBjb25zdCB3b3JkcyA9IGJlY2gzMi50b1dvcmRzKGRhdGEpO1xuICB3b3Jkcy51bnNoaWZ0KHZlcnNpb24pO1xuICByZXR1cm4gYmVjaDMyLmVuY29kZShwcmVmaXgsIHdvcmRzKTtcbn1cbmV4cG9ydHMudG9CZWNoMzIgPSB0b0JlY2gzMjtcbmZ1bmN0aW9uIGZyb21PdXRwdXRTY3JpcHQob3V0cHV0LCBuZXR3b3JrKSB7XG4gIC8vIFRPRE86IE5ldHdvcmtcbiAgbmV0d29yayA9IG5ldHdvcmsgfHwgbmV0d29ya3MuYml0Y29pbjtcbiAgdHJ5IHtcbiAgICByZXR1cm4gcGF5bWVudHMucDJwa2goeyBvdXRwdXQsIG5ldHdvcmsgfSkuYWRkcmVzcztcbiAgfSBjYXRjaCAoZSkge31cbiAgdHJ5IHtcbiAgICByZXR1cm4gcGF5bWVudHMucDJzaCh7IG91dHB1dCwgbmV0d29yayB9KS5hZGRyZXNzO1xuICB9IGNhdGNoIChlKSB7fVxuICB0cnkge1xuICAgIHJldHVybiBwYXltZW50cy5wMndwa2goeyBvdXRwdXQsIG5ldHdvcmsgfSkuYWRkcmVzcztcbiAgfSBjYXRjaCAoZSkge31cbiAgdHJ5IHtcbiAgICByZXR1cm4gcGF5bWVudHMucDJ3c2goeyBvdXRwdXQsIG5ldHdvcmsgfSkuYWRkcmVzcztcbiAgfSBjYXRjaCAoZSkge31cbiAgdGhyb3cgbmV3IEVycm9yKGJzY3JpcHQudG9BU00ob3V0cHV0KSArICcgaGFzIG5vIG1hdGNoaW5nIEFkZHJlc3MnKTtcbn1cbmV4cG9ydHMuZnJvbU91dHB1dFNjcmlwdCA9IGZyb21PdXRwdXRTY3JpcHQ7XG5mdW5jdGlvbiB0b091dHB1dFNjcmlwdChhZGRyZXNzLCBuZXR3b3JrKSB7XG4gIG5ldHdvcmsgPSBuZXR3b3JrIHx8IG5ldHdvcmtzLmJpdGNvaW47XG4gIGxldCBkZWNvZGVCYXNlNTg7XG4gIGxldCBkZWNvZGVCZWNoMzI7XG4gIHRyeSB7XG4gICAgZGVjb2RlQmFzZTU4ID0gZnJvbUJhc2U1OENoZWNrKGFkZHJlc3MpO1xuICB9IGNhdGNoIChlKSB7fVxuICBpZiAoZGVjb2RlQmFzZTU4KSB7XG4gICAgaWYgKGRlY29kZUJhc2U1OC52ZXJzaW9uID09PSBuZXR3b3JrLnB1YktleUhhc2gpXG4gICAgICByZXR1cm4gcGF5bWVudHMucDJwa2goeyBoYXNoOiBkZWNvZGVCYXNlNTguaGFzaCB9KS5vdXRwdXQ7XG4gICAgaWYgKGRlY29kZUJhc2U1OC52ZXJzaW9uID09PSBuZXR3b3JrLnNjcmlwdEhhc2gpXG4gICAgICByZXR1cm4gcGF5bWVudHMucDJzaCh7IGhhc2g6IGRlY29kZUJhc2U1OC5oYXNoIH0pLm91dHB1dDtcbiAgfSBlbHNlIHtcbiAgICB0cnkge1xuICAgICAgZGVjb2RlQmVjaDMyID0gZnJvbUJlY2gzMihhZGRyZXNzKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIGlmIChkZWNvZGVCZWNoMzIpIHtcbiAgICAgIGlmIChkZWNvZGVCZWNoMzIucHJlZml4ICE9PSBuZXR3b3JrLmJlY2gzMilcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGFkZHJlc3MgKyAnIGhhcyBhbiBpbnZhbGlkIHByZWZpeCcpO1xuICAgICAgaWYgKGRlY29kZUJlY2gzMi52ZXJzaW9uID09PSAwKSB7XG4gICAgICAgIGlmIChkZWNvZGVCZWNoMzIuZGF0YS5sZW5ndGggPT09IDIwKVxuICAgICAgICAgIHJldHVybiBwYXltZW50cy5wMndwa2goeyBoYXNoOiBkZWNvZGVCZWNoMzIuZGF0YSB9KS5vdXRwdXQ7XG4gICAgICAgIGlmIChkZWNvZGVCZWNoMzIuZGF0YS5sZW5ndGggPT09IDMyKVxuICAgICAgICAgIHJldHVybiBwYXltZW50cy5wMndzaCh7IGhhc2g6IGRlY29kZUJlY2gzMi5kYXRhIH0pLm91dHB1dDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKGFkZHJlc3MgKyAnIGhhcyBubyBtYXRjaGluZyBTY3JpcHQnKTtcbn1cbmV4cG9ydHMudG9PdXRwdXRTY3JpcHQgPSB0b091dHB1dFNjcmlwdDtcbiIsIid1c2Ugc3RyaWN0Jztcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjcmVhdGVIYXNoID0gcmVxdWlyZSgnY3JlYXRlLWhhc2gnKTtcbmZ1bmN0aW9uIHJpcGVtZDE2MChidWZmZXIpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gY3JlYXRlSGFzaCgncm1kMTYwJylcbiAgICAgIC51cGRhdGUoYnVmZmVyKVxuICAgICAgLmRpZ2VzdCgpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gY3JlYXRlSGFzaCgncmlwZW1kMTYwJylcbiAgICAgIC51cGRhdGUoYnVmZmVyKVxuICAgICAgLmRpZ2VzdCgpO1xuICB9XG59XG5leHBvcnRzLnJpcGVtZDE2MCA9IHJpcGVtZDE2MDtcbmZ1bmN0aW9uIHNoYTEoYnVmZmVyKSB7XG4gIHJldHVybiBjcmVhdGVIYXNoKCdzaGExJylcbiAgICAudXBkYXRlKGJ1ZmZlcilcbiAgICAuZGlnZXN0KCk7XG59XG5leHBvcnRzLnNoYTEgPSBzaGExO1xuZnVuY3Rpb24gc2hhMjU2KGJ1ZmZlcikge1xuICByZXR1cm4gY3JlYXRlSGFzaCgnc2hhMjU2JylcbiAgICAudXBkYXRlKGJ1ZmZlcilcbiAgICAuZGlnZXN0KCk7XG59XG5leHBvcnRzLnNoYTI1NiA9IHNoYTI1NjtcbmZ1bmN0aW9uIGhhc2gxNjAoYnVmZmVyKSB7XG4gIHJldHVybiByaXBlbWQxNjAoc2hhMjU2KGJ1ZmZlcikpO1xufVxuZXhwb3J0cy5oYXNoMTYwID0gaGFzaDE2MDtcbmZ1bmN0aW9uIGhhc2gyNTYoYnVmZmVyKSB7XG4gIHJldHVybiBzaGEyNTYoc2hhMjU2KGJ1ZmZlcikpO1xufVxuZXhwb3J0cy5oYXNoMjU2ID0gaGFzaDI1NjtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIE9QX0hBU0gxNjAge3NjcmlwdEhhc2h9IE9QX0VRVUFMXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYnNjcmlwdCA9IHJlcXVpcmUoJy4uLy4uL3NjcmlwdCcpO1xuY29uc3Qgc2NyaXB0XzEgPSByZXF1aXJlKCcuLi8uLi9zY3JpcHQnKTtcbmZ1bmN0aW9uIGNoZWNrKHNjcmlwdCkge1xuICBjb25zdCBidWZmZXIgPSBic2NyaXB0LmNvbXBpbGUoc2NyaXB0KTtcbiAgcmV0dXJuIChcbiAgICBidWZmZXIubGVuZ3RoID09PSAyMyAmJlxuICAgIGJ1ZmZlclswXSA9PT0gc2NyaXB0XzEuT1BTLk9QX0hBU0gxNjAgJiZcbiAgICBidWZmZXJbMV0gPT09IDB4MTQgJiZcbiAgICBidWZmZXJbMjJdID09PSBzY3JpcHRfMS5PUFMuT1BfRVFVQUxcbiAgKTtcbn1cbmV4cG9ydHMuY2hlY2sgPSBjaGVjaztcbmNoZWNrLnRvSlNPTiA9ICgpID0+IHtcbiAgcmV0dXJuICdzY3JpcHRIYXNoIG91dHB1dCc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gbSBbcHViS2V5cyAuLi5dIG4gT1BfQ0hFQ0tNVUxUSVNJR1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGJzY3JpcHQgPSByZXF1aXJlKCcuLi8uLi9zY3JpcHQnKTtcbmNvbnN0IHNjcmlwdF8xID0gcmVxdWlyZSgnLi4vLi4vc2NyaXB0Jyk7XG5jb25zdCB0eXBlcyA9IHJlcXVpcmUoJy4uLy4uL3R5cGVzJyk7XG5jb25zdCBPUF9JTlRfQkFTRSA9IHNjcmlwdF8xLk9QUy5PUF9SRVNFUlZFRDsgLy8gT1BfMSAtIDFcbmZ1bmN0aW9uIGNoZWNrKHNjcmlwdCwgYWxsb3dJbmNvbXBsZXRlKSB7XG4gIGNvbnN0IGNodW5rcyA9IGJzY3JpcHQuZGVjb21waWxlKHNjcmlwdCk7XG4gIGlmIChjaHVua3MubGVuZ3RoIDwgNCkgcmV0dXJuIGZhbHNlO1xuICBpZiAoY2h1bmtzW2NodW5rcy5sZW5ndGggLSAxXSAhPT0gc2NyaXB0XzEuT1BTLk9QX0NIRUNLTVVMVElTSUcpIHJldHVybiBmYWxzZTtcbiAgaWYgKCF0eXBlcy5OdW1iZXIoY2h1bmtzWzBdKSkgcmV0dXJuIGZhbHNlO1xuICBpZiAoIXR5cGVzLk51bWJlcihjaHVua3NbY2h1bmtzLmxlbmd0aCAtIDJdKSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBtID0gY2h1bmtzWzBdIC0gT1BfSU5UX0JBU0U7XG4gIGNvbnN0IG4gPSBjaHVua3NbY2h1bmtzLmxlbmd0aCAtIDJdIC0gT1BfSU5UX0JBU0U7XG4gIGlmIChtIDw9IDApIHJldHVybiBmYWxzZTtcbiAgaWYgKG4gPiAxNikgcmV0dXJuIGZhbHNlO1xuICBpZiAobSA+IG4pIHJldHVybiBmYWxzZTtcbiAgaWYgKG4gIT09IGNodW5rcy5sZW5ndGggLSAzKSByZXR1cm4gZmFsc2U7XG4gIGlmIChhbGxvd0luY29tcGxldGUpIHJldHVybiB0cnVlO1xuICBjb25zdCBrZXlzID0gY2h1bmtzLnNsaWNlKDEsIC0yKTtcbiAgcmV0dXJuIGtleXMuZXZlcnkoYnNjcmlwdC5pc0Nhbm9uaWNhbFB1YktleSk7XG59XG5leHBvcnRzLmNoZWNrID0gY2hlY2s7XG5jaGVjay50b0pTT04gPSAoKSA9PiB7XG4gIHJldHVybiAnbXVsdGktc2lnIG91dHB1dCc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL2Jsb2IvbWFzdGVyL2luZGV4LmpzI0wxMTI3XG5mdW5jdGlvbiB2ZXJpZnVpbnQodmFsdWUsIG1heCkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJylcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKTtcbiAgaWYgKHZhbHVlIDwgMClcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NwZWNpZmllZCBhIG5lZ2F0aXZlIHZhbHVlIGZvciB3cml0aW5nIGFuIHVuc2lnbmVkIHZhbHVlJyk7XG4gIGlmICh2YWx1ZSA+IG1heCkgdGhyb3cgbmV3IEVycm9yKCdSYW5nZUVycm9yOiB2YWx1ZSBvdXQgb2YgcmFuZ2UnKTtcbiAgaWYgKE1hdGguZmxvb3IodmFsdWUpICE9PSB2YWx1ZSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3ZhbHVlIGhhcyBhIGZyYWN0aW9uYWwgY29tcG9uZW50Jyk7XG59XG5mdW5jdGlvbiByZWFkVUludDY0TEUoYnVmZmVyLCBvZmZzZXQpIHtcbiAgY29uc3QgYSA9IGJ1ZmZlci5yZWFkVUludDMyTEUob2Zmc2V0KTtcbiAgbGV0IGIgPSBidWZmZXIucmVhZFVJbnQzMkxFKG9mZnNldCArIDQpO1xuICBiICo9IDB4MTAwMDAwMDAwO1xuICB2ZXJpZnVpbnQoYiArIGEsIDB4MDAxZmZmZmZmZmZmZmZmZik7XG4gIHJldHVybiBiICsgYTtcbn1cbmV4cG9ydHMucmVhZFVJbnQ2NExFID0gcmVhZFVJbnQ2NExFO1xuZnVuY3Rpb24gd3JpdGVVSW50NjRMRShidWZmZXIsIHZhbHVlLCBvZmZzZXQpIHtcbiAgdmVyaWZ1aW50KHZhbHVlLCAweDAwMWZmZmZmZmZmZmZmZmYpO1xuICBidWZmZXIud3JpdGVJbnQzMkxFKHZhbHVlICYgLTEsIG9mZnNldCk7XG4gIGJ1ZmZlci53cml0ZVVJbnQzMkxFKE1hdGguZmxvb3IodmFsdWUgLyAweDEwMDAwMDAwMCksIG9mZnNldCArIDQpO1xuICByZXR1cm4gb2Zmc2V0ICsgODtcbn1cbmV4cG9ydHMud3JpdGVVSW50NjRMRSA9IHdyaXRlVUludDY0TEU7XG5mdW5jdGlvbiByZXZlcnNlQnVmZmVyKGJ1ZmZlcikge1xuICBpZiAoYnVmZmVyLmxlbmd0aCA8IDEpIHJldHVybiBidWZmZXI7XG4gIGxldCBqID0gYnVmZmVyLmxlbmd0aCAtIDE7XG4gIGxldCB0bXAgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1ZmZlci5sZW5ndGggLyAyOyBpKyspIHtcbiAgICB0bXAgPSBidWZmZXJbaV07XG4gICAgYnVmZmVyW2ldID0gYnVmZmVyW2pdO1xuICAgIGJ1ZmZlcltqXSA9IHRtcDtcbiAgICBqLS07XG4gIH1cbiAgcmV0dXJuIGJ1ZmZlcjtcbn1cbmV4cG9ydHMucmV2ZXJzZUJ1ZmZlciA9IHJldmVyc2VCdWZmZXI7XG4iLCIndXNlIHN0cmljdCc7XG4vLyB7c2lnbmF0dXJlfSB7cHViS2V5fVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGJzY3JpcHQgPSByZXF1aXJlKCcuLi8uLi9zY3JpcHQnKTtcbmZ1bmN0aW9uIGlzQ29tcHJlc3NlZENhbm9uaWNhbFB1YktleShwdWJLZXkpIHtcbiAgcmV0dXJuIGJzY3JpcHQuaXNDYW5vbmljYWxQdWJLZXkocHViS2V5KSAmJiBwdWJLZXkubGVuZ3RoID09PSAzMztcbn1cbmZ1bmN0aW9uIGNoZWNrKHNjcmlwdCkge1xuICBjb25zdCBjaHVua3MgPSBic2NyaXB0LmRlY29tcGlsZShzY3JpcHQpO1xuICByZXR1cm4gKFxuICAgIGNodW5rcy5sZW5ndGggPT09IDIgJiZcbiAgICBic2NyaXB0LmlzQ2Fub25pY2FsU2NyaXB0U2lnbmF0dXJlKGNodW5rc1swXSkgJiZcbiAgICBpc0NvbXByZXNzZWRDYW5vbmljYWxQdWJLZXkoY2h1bmtzWzFdKVxuICApO1xufVxuZXhwb3J0cy5jaGVjayA9IGNoZWNrO1xuY2hlY2sudG9KU09OID0gKCkgPT4ge1xuICByZXR1cm4gJ3dpdG5lc3NQdWJLZXlIYXNoIGlucHV0Jztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYmNyeXB0byA9IHJlcXVpcmUoJy4uL2NyeXB0bycpO1xuY29uc3QgbmV0d29ya3NfMSA9IHJlcXVpcmUoJy4uL25ldHdvcmtzJyk7XG5jb25zdCBic2NyaXB0ID0gcmVxdWlyZSgnLi4vc2NyaXB0Jyk7XG5jb25zdCBsYXp5ID0gcmVxdWlyZSgnLi9sYXp5Jyk7XG5jb25zdCB0eXBlZiA9IHJlcXVpcmUoJ3R5cGVmb3JjZScpO1xuY29uc3QgT1BTID0gYnNjcmlwdC5PUFM7XG5jb25zdCBlY2MgPSByZXF1aXJlKCd0aW55LXNlY3AyNTZrMScpO1xuY29uc3QgYnM1OGNoZWNrID0gcmVxdWlyZSgnYnM1OGNoZWNrJyk7XG4vLyBpbnB1dDoge3NpZ25hdHVyZX0ge3B1YmtleX1cbi8vIG91dHB1dDogT1BfRFVQIE9QX0hBU0gxNjAge2hhc2gxNjAocHVia2V5KX0gT1BfRVFVQUxWRVJJRlkgT1BfQ0hFQ0tTSUdcbmZ1bmN0aW9uIHAycGtoKGEsIG9wdHMpIHtcbiAgaWYgKCFhLmFkZHJlc3MgJiYgIWEuaGFzaCAmJiAhYS5vdXRwdXQgJiYgIWEucHVia2V5ICYmICFhLmlucHV0KVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ05vdCBlbm91Z2ggZGF0YScpO1xuICBvcHRzID0gT2JqZWN0LmFzc2lnbih7IHZhbGlkYXRlOiB0cnVlIH0sIG9wdHMgfHwge30pO1xuICB0eXBlZihcbiAgICB7XG4gICAgICBuZXR3b3JrOiB0eXBlZi5tYXliZSh0eXBlZi5PYmplY3QpLFxuICAgICAgYWRkcmVzczogdHlwZWYubWF5YmUodHlwZWYuU3RyaW5nKSxcbiAgICAgIGhhc2g6IHR5cGVmLm1heWJlKHR5cGVmLkJ1ZmZlck4oMjApKSxcbiAgICAgIG91dHB1dDogdHlwZWYubWF5YmUodHlwZWYuQnVmZmVyTigyNSkpLFxuICAgICAgcHVia2V5OiB0eXBlZi5tYXliZShlY2MuaXNQb2ludCksXG4gICAgICBzaWduYXR1cmU6IHR5cGVmLm1heWJlKGJzY3JpcHQuaXNDYW5vbmljYWxTY3JpcHRTaWduYXR1cmUpLFxuICAgICAgaW5wdXQ6IHR5cGVmLm1heWJlKHR5cGVmLkJ1ZmZlciksXG4gICAgfSxcbiAgICBhLFxuICApO1xuICBjb25zdCBfYWRkcmVzcyA9IGxhenkudmFsdWUoKCkgPT4ge1xuICAgIGNvbnN0IHBheWxvYWQgPSBiczU4Y2hlY2suZGVjb2RlKGEuYWRkcmVzcyk7XG4gICAgY29uc3QgdmVyc2lvbiA9IHBheWxvYWQucmVhZFVJbnQ4KDApO1xuICAgIGNvbnN0IGhhc2ggPSBwYXlsb2FkLnNsaWNlKDEpO1xuICAgIHJldHVybiB7IHZlcnNpb24sIGhhc2ggfTtcbiAgfSk7XG4gIGNvbnN0IF9jaHVua3MgPSBsYXp5LnZhbHVlKCgpID0+IHtcbiAgICByZXR1cm4gYnNjcmlwdC5kZWNvbXBpbGUoYS5pbnB1dCk7XG4gIH0pO1xuICBjb25zdCBuZXR3b3JrID0gYS5uZXR3b3JrIHx8IG5ldHdvcmtzXzEuYml0Y29pbjtcbiAgY29uc3QgbyA9IHsgbmFtZTogJ3AycGtoJywgbmV0d29yayB9O1xuICBsYXp5LnByb3AobywgJ2FkZHJlc3MnLCAoKSA9PiB7XG4gICAgaWYgKCFvLmhhc2gpIHJldHVybjtcbiAgICBjb25zdCBwYXlsb2FkID0gQnVmZmVyLmFsbG9jVW5zYWZlKDIxKTtcbiAgICBwYXlsb2FkLndyaXRlVUludDgobmV0d29yay5wdWJLZXlIYXNoLCAwKTtcbiAgICBvLmhhc2guY29weShwYXlsb2FkLCAxKTtcbiAgICByZXR1cm4gYnM1OGNoZWNrLmVuY29kZShwYXlsb2FkKTtcbiAgfSk7XG4gIGxhenkucHJvcChvLCAnaGFzaCcsICgpID0+IHtcbiAgICBpZiAoYS5vdXRwdXQpIHJldHVybiBhLm91dHB1dC5zbGljZSgzLCAyMyk7XG4gICAgaWYgKGEuYWRkcmVzcykgcmV0dXJuIF9hZGRyZXNzKCkuaGFzaDtcbiAgICBpZiAoYS5wdWJrZXkgfHwgby5wdWJrZXkpIHJldHVybiBiY3J5cHRvLmhhc2gxNjAoYS5wdWJrZXkgfHwgby5wdWJrZXkpO1xuICB9KTtcbiAgbGF6eS5wcm9wKG8sICdvdXRwdXQnLCAoKSA9PiB7XG4gICAgaWYgKCFvLmhhc2gpIHJldHVybjtcbiAgICByZXR1cm4gYnNjcmlwdC5jb21waWxlKFtcbiAgICAgIE9QUy5PUF9EVVAsXG4gICAgICBPUFMuT1BfSEFTSDE2MCxcbiAgICAgIG8uaGFzaCxcbiAgICAgIE9QUy5PUF9FUVVBTFZFUklGWSxcbiAgICAgIE9QUy5PUF9DSEVDS1NJRyxcbiAgICBdKTtcbiAgfSk7XG4gIGxhenkucHJvcChvLCAncHVia2V5JywgKCkgPT4ge1xuICAgIGlmICghYS5pbnB1dCkgcmV0dXJuO1xuICAgIHJldHVybiBfY2h1bmtzKClbMV07XG4gIH0pO1xuICBsYXp5LnByb3AobywgJ3NpZ25hdHVyZScsICgpID0+IHtcbiAgICBpZiAoIWEuaW5wdXQpIHJldHVybjtcbiAgICByZXR1cm4gX2NodW5rcygpWzBdO1xuICB9KTtcbiAgbGF6eS5wcm9wKG8sICdpbnB1dCcsICgpID0+IHtcbiAgICBpZiAoIWEucHVia2V5KSByZXR1cm47XG4gICAgaWYgKCFhLnNpZ25hdHVyZSkgcmV0dXJuO1xuICAgIHJldHVybiBic2NyaXB0LmNvbXBpbGUoW2Euc2lnbmF0dXJlLCBhLnB1YmtleV0pO1xuICB9KTtcbiAgbGF6eS5wcm9wKG8sICd3aXRuZXNzJywgKCkgPT4ge1xuICAgIGlmICghby5pbnB1dCkgcmV0dXJuO1xuICAgIHJldHVybiBbXTtcbiAgfSk7XG4gIC8vIGV4dGVuZGVkIHZhbGlkYXRpb25cbiAgaWYgKG9wdHMudmFsaWRhdGUpIHtcbiAgICBsZXQgaGFzaCA9IEJ1ZmZlci5mcm9tKFtdKTtcbiAgICBpZiAoYS5hZGRyZXNzKSB7XG4gICAgICBpZiAoX2FkZHJlc3MoKS52ZXJzaW9uICE9PSBuZXR3b3JrLnB1YktleUhhc2gpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgdmVyc2lvbiBvciBOZXR3b3JrIG1pc21hdGNoJyk7XG4gICAgICBpZiAoX2FkZHJlc3MoKS5oYXNoLmxlbmd0aCAhPT0gMjApIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgYWRkcmVzcycpO1xuICAgICAgaGFzaCA9IF9hZGRyZXNzKCkuaGFzaDtcbiAgICB9XG4gICAgaWYgKGEuaGFzaCkge1xuICAgICAgaWYgKGhhc2gubGVuZ3RoID4gMCAmJiAhaGFzaC5lcXVhbHMoYS5oYXNoKSlcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSGFzaCBtaXNtYXRjaCcpO1xuICAgICAgZWxzZSBoYXNoID0gYS5oYXNoO1xuICAgIH1cbiAgICBpZiAoYS5vdXRwdXQpIHtcbiAgICAgIGlmIChcbiAgICAgICAgYS5vdXRwdXQubGVuZ3RoICE9PSAyNSB8fFxuICAgICAgICBhLm91dHB1dFswXSAhPT0gT1BTLk9QX0RVUCB8fFxuICAgICAgICBhLm91dHB1dFsxXSAhPT0gT1BTLk9QX0hBU0gxNjAgfHxcbiAgICAgICAgYS5vdXRwdXRbMl0gIT09IDB4MTQgfHxcbiAgICAgICAgYS5vdXRwdXRbMjNdICE9PSBPUFMuT1BfRVFVQUxWRVJJRlkgfHxcbiAgICAgICAgYS5vdXRwdXRbMjRdICE9PSBPUFMuT1BfQ0hFQ0tTSUdcbiAgICAgIClcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT3V0cHV0IGlzIGludmFsaWQnKTtcbiAgICAgIGNvbnN0IGhhc2gyID0gYS5vdXRwdXQuc2xpY2UoMywgMjMpO1xuICAgICAgaWYgKGhhc2gubGVuZ3RoID4gMCAmJiAhaGFzaC5lcXVhbHMoaGFzaDIpKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdIYXNoIG1pc21hdGNoJyk7XG4gICAgICBlbHNlIGhhc2ggPSBoYXNoMjtcbiAgICB9XG4gICAgaWYgKGEucHVia2V5KSB7XG4gICAgICBjb25zdCBwa2ggPSBiY3J5cHRvLmhhc2gxNjAoYS5wdWJrZXkpO1xuICAgICAgaWYgKGhhc2gubGVuZ3RoID4gMCAmJiAhaGFzaC5lcXVhbHMocGtoKSlcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSGFzaCBtaXNtYXRjaCcpO1xuICAgICAgZWxzZSBoYXNoID0gcGtoO1xuICAgIH1cbiAgICBpZiAoYS5pbnB1dCkge1xuICAgICAgY29uc3QgY2h1bmtzID0gX2NodW5rcygpO1xuICAgICAgaWYgKGNodW5rcy5sZW5ndGggIT09IDIpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0lucHV0IGlzIGludmFsaWQnKTtcbiAgICAgIGlmICghYnNjcmlwdC5pc0Nhbm9uaWNhbFNjcmlwdFNpZ25hdHVyZShjaHVua3NbMF0pKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnB1dCBoYXMgaW52YWxpZCBzaWduYXR1cmUnKTtcbiAgICAgIGlmICghZWNjLmlzUG9pbnQoY2h1bmtzWzFdKSlcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW5wdXQgaGFzIGludmFsaWQgcHVia2V5Jyk7XG4gICAgICBpZiAoYS5zaWduYXR1cmUgJiYgIWEuc2lnbmF0dXJlLmVxdWFscyhjaHVua3NbMF0pKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdTaWduYXR1cmUgbWlzbWF0Y2gnKTtcbiAgICAgIGlmIChhLnB1YmtleSAmJiAhYS5wdWJrZXkuZXF1YWxzKGNodW5rc1sxXSkpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1B1YmtleSBtaXNtYXRjaCcpO1xuICAgICAgY29uc3QgcGtoID0gYmNyeXB0by5oYXNoMTYwKGNodW5rc1sxXSk7XG4gICAgICBpZiAoaGFzaC5sZW5ndGggPiAwICYmICFoYXNoLmVxdWFscyhwa2gpKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdIYXNoIG1pc21hdGNoJyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBPYmplY3QuYXNzaWduKG8sIGEpO1xufVxuZXhwb3J0cy5wMnBraCA9IHAycGtoO1xuIiwiJ3VzZSBzdHJpY3QnO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGlucHV0ID0gcmVxdWlyZSgnLi9pbnB1dCcpO1xuZXhwb3J0cy5pbnB1dCA9IGlucHV0O1xuY29uc3Qgb3V0cHV0ID0gcmVxdWlyZSgnLi9vdXRwdXQnKTtcbmV4cG9ydHMub3V0cHV0ID0gb3V0cHV0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IG5ldHdvcmtzXzEgPSByZXF1aXJlKCcuLi9uZXR3b3JrcycpO1xuY29uc3QgYnNjcmlwdCA9IHJlcXVpcmUoJy4uL3NjcmlwdCcpO1xuY29uc3QgbGF6eSA9IHJlcXVpcmUoJy4vbGF6eScpO1xuY29uc3QgdHlwZWYgPSByZXF1aXJlKCd0eXBlZm9yY2UnKTtcbmNvbnN0IE9QUyA9IGJzY3JpcHQuT1BTO1xuY29uc3QgZWNjID0gcmVxdWlyZSgndGlueS1zZWNwMjU2azEnKTtcbi8vIGlucHV0OiB7c2lnbmF0dXJlfVxuLy8gb3V0cHV0OiB7cHViS2V5fSBPUF9DSEVDS1NJR1xuZnVuY3Rpb24gcDJwayhhLCBvcHRzKSB7XG4gIGlmICghYS5pbnB1dCAmJiAhYS5vdXRwdXQgJiYgIWEucHVia2V5ICYmICFhLmlucHV0ICYmICFhLnNpZ25hdHVyZSlcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdOb3QgZW5vdWdoIGRhdGEnKTtcbiAgb3B0cyA9IE9iamVjdC5hc3NpZ24oeyB2YWxpZGF0ZTogdHJ1ZSB9LCBvcHRzIHx8IHt9KTtcbiAgdHlwZWYoXG4gICAge1xuICAgICAgbmV0d29yazogdHlwZWYubWF5YmUodHlwZWYuT2JqZWN0KSxcbiAgICAgIG91dHB1dDogdHlwZWYubWF5YmUodHlwZWYuQnVmZmVyKSxcbiAgICAgIHB1YmtleTogdHlwZWYubWF5YmUoZWNjLmlzUG9pbnQpLFxuICAgICAgc2lnbmF0dXJlOiB0eXBlZi5tYXliZShic2NyaXB0LmlzQ2Fub25pY2FsU2NyaXB0U2lnbmF0dXJlKSxcbiAgICAgIGlucHV0OiB0eXBlZi5tYXliZSh0eXBlZi5CdWZmZXIpLFxuICAgIH0sXG4gICAgYSxcbiAgKTtcbiAgY29uc3QgX2NodW5rcyA9IGxhenkudmFsdWUoKCkgPT4ge1xuICAgIHJldHVybiBic2NyaXB0LmRlY29tcGlsZShhLmlucHV0KTtcbiAgfSk7XG4gIGNvbnN0IG5ldHdvcmsgPSBhLm5ldHdvcmsgfHwgbmV0d29ya3NfMS5iaXRjb2luO1xuICBjb25zdCBvID0geyBuYW1lOiAncDJwaycsIG5ldHdvcmsgfTtcbiAgbGF6eS5wcm9wKG8sICdvdXRwdXQnLCAoKSA9PiB7XG4gICAgaWYgKCFhLnB1YmtleSkgcmV0dXJuO1xuICAgIHJldHVybiBic2NyaXB0LmNvbXBpbGUoW2EucHVia2V5LCBPUFMuT1BfQ0hFQ0tTSUddKTtcbiAgfSk7XG4gIGxhenkucHJvcChvLCAncHVia2V5JywgKCkgPT4ge1xuICAgIGlmICghYS5vdXRwdXQpIHJldHVybjtcbiAgICByZXR1cm4gYS5vdXRwdXQuc2xpY2UoMSwgLTEpO1xuICB9KTtcbiAgbGF6eS5wcm9wKG8sICdzaWduYXR1cmUnLCAoKSA9PiB7XG4gICAgaWYgKCFhLmlucHV0KSByZXR1cm47XG4gICAgcmV0dXJuIF9jaHVua3MoKVswXTtcbiAgfSk7XG4gIGxhenkucHJvcChvLCAnaW5wdXQnLCAoKSA9PiB7XG4gICAgaWYgKCFhLnNpZ25hdHVyZSkgcmV0dXJuO1xuICAgIHJldHVybiBic2NyaXB0LmNvbXBpbGUoW2Euc2lnbmF0dXJlXSk7XG4gIH0pO1xuICBsYXp5LnByb3AobywgJ3dpdG5lc3MnLCAoKSA9PiB7XG4gICAgaWYgKCFvLmlucHV0KSByZXR1cm47XG4gICAgcmV0dXJuIFtdO1xuICB9KTtcbiAgLy8gZXh0ZW5kZWQgdmFsaWRhdGlvblxuICBpZiAob3B0cy52YWxpZGF0ZSkge1xuICAgIGlmIChhLm91dHB1dCkge1xuICAgICAgaWYgKGEub3V0cHV0W2Eub3V0cHV0Lmxlbmd0aCAtIDFdICE9PSBPUFMuT1BfQ0hFQ0tTSUcpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ091dHB1dCBpcyBpbnZhbGlkJyk7XG4gICAgICBpZiAoIWVjYy5pc1BvaW50KG8ucHVia2V5KSlcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT3V0cHV0IHB1YmtleSBpcyBpbnZhbGlkJyk7XG4gICAgICBpZiAoYS5wdWJrZXkgJiYgIWEucHVia2V5LmVxdWFscyhvLnB1YmtleSkpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1B1YmtleSBtaXNtYXRjaCcpO1xuICAgIH1cbiAgICBpZiAoYS5zaWduYXR1cmUpIHtcbiAgICAgIGlmIChhLmlucHV0ICYmICFhLmlucHV0LmVxdWFscyhvLmlucHV0KSlcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignU2lnbmF0dXJlIG1pc21hdGNoJyk7XG4gICAgfVxuICAgIGlmIChhLmlucHV0KSB7XG4gICAgICBpZiAoX2NodW5rcygpLmxlbmd0aCAhPT0gMSkgdGhyb3cgbmV3IFR5cGVFcnJvcignSW5wdXQgaXMgaW52YWxpZCcpO1xuICAgICAgaWYgKCFic2NyaXB0LmlzQ2Fub25pY2FsU2NyaXB0U2lnbmF0dXJlKG8uc2lnbmF0dXJlKSlcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW5wdXQgaGFzIGludmFsaWQgc2lnbmF0dXJlJyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBPYmplY3QuYXNzaWduKG8sIGEpO1xufVxuZXhwb3J0cy5wMnBrID0gcDJwaztcbiIsIid1c2Ugc3RyaWN0Jztcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB0eXBlZm9yY2UgPSByZXF1aXJlKCd0eXBlZm9yY2UnKTtcbmNvbnN0IFVJTlQzMV9NQVggPSBNYXRoLnBvdygyLCAzMSkgLSAxO1xuZnVuY3Rpb24gVUludDMxKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlZm9yY2UuVUludDMyKHZhbHVlKSAmJiB2YWx1ZSA8PSBVSU5UMzFfTUFYO1xufVxuZXhwb3J0cy5VSW50MzEgPSBVSW50MzE7XG5mdW5jdGlvbiBCSVAzMlBhdGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVmb3JjZS5TdHJpbmcodmFsdWUpICYmICEhdmFsdWUubWF0Y2goL14obVxcLyk/KFxcZCsnP1xcLykqXFxkKyc/JC8pO1xufVxuZXhwb3J0cy5CSVAzMlBhdGggPSBCSVAzMlBhdGg7XG5CSVAzMlBhdGgudG9KU09OID0gKCkgPT4ge1xuICByZXR1cm4gJ0JJUDMyIGRlcml2YXRpb24gcGF0aCc7XG59O1xuZnVuY3Rpb24gU2lnbmVyKG9iaikge1xuICByZXR1cm4gKFxuICAgICh0eXBlZm9yY2UuQnVmZmVyKG9iai5wdWJsaWNLZXkpIHx8XG4gICAgICB0eXBlb2Ygb2JqLmdldFB1YmxpY0tleSA9PT0gJ2Z1bmN0aW9uJykgJiZcbiAgICB0eXBlb2Ygb2JqLnNpZ24gPT09ICdmdW5jdGlvbidcbiAgKTtcbn1cbmV4cG9ydHMuU2lnbmVyID0gU2lnbmVyO1xuY29uc3QgU0FUT1NISV9NQVggPSAyMSAqIDFlMTQ7XG5mdW5jdGlvbiBTYXRvc2hpKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlZm9yY2UuVUludDUzKHZhbHVlKSAmJiB2YWx1ZSA8PSBTQVRPU0hJX01BWDtcbn1cbmV4cG9ydHMuU2F0b3NoaSA9IFNhdG9zaGk7XG4vLyBleHRlcm5hbCBkZXBlbmRlbnQgdHlwZXNcbmV4cG9ydHMuRUNQb2ludCA9IHR5cGVmb3JjZS5xdWFja3NMaWtlKCdQb2ludCcpO1xuLy8gZXhwb3NlZCwgZXh0ZXJuYWwgQVBJXG5leHBvcnRzLk5ldHdvcmsgPSB0eXBlZm9yY2UuY29tcGlsZSh7XG4gIG1lc3NhZ2VQcmVmaXg6IHR5cGVmb3JjZS5vbmVPZih0eXBlZm9yY2UuQnVmZmVyLCB0eXBlZm9yY2UuU3RyaW5nKSxcbiAgYmlwMzI6IHtcbiAgICBwdWJsaWM6IHR5cGVmb3JjZS5VSW50MzIsXG4gICAgcHJpdmF0ZTogdHlwZWZvcmNlLlVJbnQzMixcbiAgfSxcbiAgcHViS2V5SGFzaDogdHlwZWZvcmNlLlVJbnQ4LFxuICBzY3JpcHRIYXNoOiB0eXBlZm9yY2UuVUludDgsXG4gIHdpZjogdHlwZWZvcmNlLlVJbnQ4LFxufSk7XG5leHBvcnRzLkJ1ZmZlcjI1NmJpdCA9IHR5cGVmb3JjZS5CdWZmZXJOKDMyKTtcbmV4cG9ydHMuSGFzaDE2MGJpdCA9IHR5cGVmb3JjZS5CdWZmZXJOKDIwKTtcbmV4cG9ydHMuSGFzaDI1NmJpdCA9IHR5cGVmb3JjZS5CdWZmZXJOKDMyKTtcbmV4cG9ydHMuTnVtYmVyID0gdHlwZWZvcmNlLk51bWJlcjsgLy8gdHNsaW50OmRpc2FibGUtbGluZSB2YXJpYWJsZS1uYW1lXG5leHBvcnRzLkFycmF5ID0gdHlwZWZvcmNlLkFycmF5O1xuZXhwb3J0cy5Cb29sZWFuID0gdHlwZWZvcmNlLkJvb2xlYW47IC8vIHRzbGludDpkaXNhYmxlLWxpbmUgdmFyaWFibGUtbmFtZVxuZXhwb3J0cy5TdHJpbmcgPSB0eXBlZm9yY2UuU3RyaW5nOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lIHZhcmlhYmxlLW5hbWVcbmV4cG9ydHMuQnVmZmVyID0gdHlwZWZvcmNlLkJ1ZmZlcjtcbmV4cG9ydHMuSGV4ID0gdHlwZWZvcmNlLkhleDtcbmV4cG9ydHMubWF5YmUgPSB0eXBlZm9yY2UubWF5YmU7XG5leHBvcnRzLnR1cGxlID0gdHlwZWZvcmNlLnR1cGxlO1xuZXhwb3J0cy5VSW50OCA9IHR5cGVmb3JjZS5VSW50ODtcbmV4cG9ydHMuVUludDMyID0gdHlwZWZvcmNlLlVJbnQzMjtcbmV4cG9ydHMuRnVuY3Rpb24gPSB0eXBlZm9yY2UuRnVuY3Rpb247XG5leHBvcnRzLkJ1ZmZlck4gPSB0eXBlZm9yY2UuQnVmZmVyTjtcbmV4cG9ydHMuTnVsbCA9IHR5cGVmb3JjZS5OdWxsO1xuZXhwb3J0cy5vbmVPZiA9IHR5cGVmb3JjZS5vbmVPZjtcbiIsIid1c2Ugc3RyaWN0Jztcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBiY3J5cHRvID0gcmVxdWlyZSgnLi4vY3J5cHRvJyk7XG5jb25zdCBuZXR3b3Jrc18xID0gcmVxdWlyZSgnLi4vbmV0d29ya3MnKTtcbmNvbnN0IGJzY3JpcHQgPSByZXF1aXJlKCcuLi9zY3JpcHQnKTtcbmNvbnN0IGxhenkgPSByZXF1aXJlKCcuL2xhenknKTtcbmNvbnN0IHR5cGVmID0gcmVxdWlyZSgndHlwZWZvcmNlJyk7XG5jb25zdCBPUFMgPSBic2NyaXB0Lk9QUztcbmNvbnN0IGJzNThjaGVjayA9IHJlcXVpcmUoJ2JzNThjaGVjaycpO1xuZnVuY3Rpb24gc3RhY2tzRXF1YWwoYSwgYikge1xuICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBhLmV2ZXJ5KCh4LCBpKSA9PiB7XG4gICAgcmV0dXJuIHguZXF1YWxzKGJbaV0pO1xuICB9KTtcbn1cbi8vIGlucHV0OiBbcmVkZWVtU2NyaXB0U2lnIC4uLl0ge3JlZGVlbVNjcmlwdH1cbi8vIHdpdG5lc3M6IDw/PlxuLy8gb3V0cHV0OiBPUF9IQVNIMTYwIHtoYXNoMTYwKHJlZGVlbVNjcmlwdCl9IE9QX0VRVUFMXG5mdW5jdGlvbiBwMnNoKGEsIG9wdHMpIHtcbiAgaWYgKCFhLmFkZHJlc3MgJiYgIWEuaGFzaCAmJiAhYS5vdXRwdXQgJiYgIWEucmVkZWVtICYmICFhLmlucHV0KVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ05vdCBlbm91Z2ggZGF0YScpO1xuICBvcHRzID0gT2JqZWN0LmFzc2lnbih7IHZhbGlkYXRlOiB0cnVlIH0sIG9wdHMgfHwge30pO1xuICB0eXBlZihcbiAgICB7XG4gICAgICBuZXR3b3JrOiB0eXBlZi5tYXliZSh0eXBlZi5PYmplY3QpLFxuICAgICAgYWRkcmVzczogdHlwZWYubWF5YmUodHlwZWYuU3RyaW5nKSxcbiAgICAgIGhhc2g6IHR5cGVmLm1heWJlKHR5cGVmLkJ1ZmZlck4oMjApKSxcbiAgICAgIG91dHB1dDogdHlwZWYubWF5YmUodHlwZWYuQnVmZmVyTigyMykpLFxuICAgICAgcmVkZWVtOiB0eXBlZi5tYXliZSh7XG4gICAgICAgIG5ldHdvcms6IHR5cGVmLm1heWJlKHR5cGVmLk9iamVjdCksXG4gICAgICAgIG91dHB1dDogdHlwZWYubWF5YmUodHlwZWYuQnVmZmVyKSxcbiAgICAgICAgaW5wdXQ6IHR5cGVmLm1heWJlKHR5cGVmLkJ1ZmZlciksXG4gICAgICAgIHdpdG5lc3M6IHR5cGVmLm1heWJlKHR5cGVmLmFycmF5T2YodHlwZWYuQnVmZmVyKSksXG4gICAgICB9KSxcbiAgICAgIGlucHV0OiB0eXBlZi5tYXliZSh0eXBlZi5CdWZmZXIpLFxuICAgICAgd2l0bmVzczogdHlwZWYubWF5YmUodHlwZWYuYXJyYXlPZih0eXBlZi5CdWZmZXIpKSxcbiAgICB9LFxuICAgIGEsXG4gICk7XG4gIGxldCBuZXR3b3JrID0gYS5uZXR3b3JrO1xuICBpZiAoIW5ldHdvcmspIHtcbiAgICBuZXR3b3JrID0gKGEucmVkZWVtICYmIGEucmVkZWVtLm5ldHdvcmspIHx8IG5ldHdvcmtzXzEuYml0Y29pbjtcbiAgfVxuICBjb25zdCBvID0geyBuZXR3b3JrIH07XG4gIGNvbnN0IF9hZGRyZXNzID0gbGF6eS52YWx1ZSgoKSA9PiB7XG4gICAgY29uc3QgcGF5bG9hZCA9IGJzNThjaGVjay5kZWNvZGUoYS5hZGRyZXNzKTtcbiAgICBjb25zdCB2ZXJzaW9uID0gcGF5bG9hZC5yZWFkVUludDgoMCk7XG4gICAgY29uc3QgaGFzaCA9IHBheWxvYWQuc2xpY2UoMSk7XG4gICAgcmV0dXJuIHsgdmVyc2lvbiwgaGFzaCB9O1xuICB9KTtcbiAgY29uc3QgX2NodW5rcyA9IGxhenkudmFsdWUoKCkgPT4ge1xuICAgIHJldHVybiBic2NyaXB0LmRlY29tcGlsZShhLmlucHV0KTtcbiAgfSk7XG4gIGNvbnN0IF9yZWRlZW0gPSBsYXp5LnZhbHVlKCgpID0+IHtcbiAgICBjb25zdCBjaHVua3MgPSBfY2h1bmtzKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5ldHdvcmssXG4gICAgICBvdXRwdXQ6IGNodW5rc1tjaHVua3MubGVuZ3RoIC0gMV0sXG4gICAgICBpbnB1dDogYnNjcmlwdC5jb21waWxlKGNodW5rcy5zbGljZSgwLCAtMSkpLFxuICAgICAgd2l0bmVzczogYS53aXRuZXNzIHx8IFtdLFxuICAgIH07XG4gIH0pO1xuICAvLyBvdXRwdXQgZGVwZW5kZW50c1xuICBsYXp5LnByb3AobywgJ2FkZHJlc3MnLCAoKSA9PiB7XG4gICAgaWYgKCFvLmhhc2gpIHJldHVybjtcbiAgICBjb25zdCBwYXlsb2FkID0gQnVmZmVyLmFsbG9jVW5zYWZlKDIxKTtcbiAgICBwYXlsb2FkLndyaXRlVUludDgoby5uZXR3b3JrLnNjcmlwdEhhc2gsIDApO1xuICAgIG8uaGFzaC5jb3B5KHBheWxvYWQsIDEpO1xuICAgIHJldHVybiBiczU4Y2hlY2suZW5jb2RlKHBheWxvYWQpO1xuICB9KTtcbiAgbGF6eS5wcm9wKG8sICdoYXNoJywgKCkgPT4ge1xuICAgIC8vIGluIG9yZGVyIG9mIGxlYXN0IGVmZm9ydFxuICAgIGlmIChhLm91dHB1dCkgcmV0dXJuIGEub3V0cHV0LnNsaWNlKDIsIDIyKTtcbiAgICBpZiAoYS5hZGRyZXNzKSByZXR1cm4gX2FkZHJlc3MoKS5oYXNoO1xuICAgIGlmIChvLnJlZGVlbSAmJiBvLnJlZGVlbS5vdXRwdXQpIHJldHVybiBiY3J5cHRvLmhhc2gxNjAoby5yZWRlZW0ub3V0cHV0KTtcbiAgfSk7XG4gIGxhenkucHJvcChvLCAnb3V0cHV0JywgKCkgPT4ge1xuICAgIGlmICghby5oYXNoKSByZXR1cm47XG4gICAgcmV0dXJuIGJzY3JpcHQuY29tcGlsZShbT1BTLk9QX0hBU0gxNjAsIG8uaGFzaCwgT1BTLk9QX0VRVUFMXSk7XG4gIH0pO1xuICAvLyBpbnB1dCBkZXBlbmRlbnRzXG4gIGxhenkucHJvcChvLCAncmVkZWVtJywgKCkgPT4ge1xuICAgIGlmICghYS5pbnB1dCkgcmV0dXJuO1xuICAgIHJldHVybiBfcmVkZWVtKCk7XG4gIH0pO1xuICBsYXp5LnByb3AobywgJ2lucHV0JywgKCkgPT4ge1xuICAgIGlmICghYS5yZWRlZW0gfHwgIWEucmVkZWVtLmlucHV0IHx8ICFhLnJlZGVlbS5vdXRwdXQpIHJldHVybjtcbiAgICByZXR1cm4gYnNjcmlwdC5jb21waWxlKFxuICAgICAgW10uY29uY2F0KGJzY3JpcHQuZGVjb21waWxlKGEucmVkZWVtLmlucHV0KSwgYS5yZWRlZW0ub3V0cHV0KSxcbiAgICApO1xuICB9KTtcbiAgbGF6eS5wcm9wKG8sICd3aXRuZXNzJywgKCkgPT4ge1xuICAgIGlmIChvLnJlZGVlbSAmJiBvLnJlZGVlbS53aXRuZXNzKSByZXR1cm4gby5yZWRlZW0ud2l0bmVzcztcbiAgICBpZiAoby5pbnB1dCkgcmV0dXJuIFtdO1xuICB9KTtcbiAgbGF6eS5wcm9wKG8sICduYW1lJywgKCkgPT4ge1xuICAgIGNvbnN0IG5hbWVQYXJ0cyA9IFsncDJzaCddO1xuICAgIGlmIChvLnJlZGVlbSAhPT0gdW5kZWZpbmVkKSBuYW1lUGFydHMucHVzaChvLnJlZGVlbS5uYW1lKTtcbiAgICByZXR1cm4gbmFtZVBhcnRzLmpvaW4oJy0nKTtcbiAgfSk7XG4gIGlmIChvcHRzLnZhbGlkYXRlKSB7XG4gICAgbGV0IGhhc2ggPSBCdWZmZXIuZnJvbShbXSk7XG4gICAgaWYgKGEuYWRkcmVzcykge1xuICAgICAgaWYgKF9hZGRyZXNzKCkudmVyc2lvbiAhPT0gbmV0d29yay5zY3JpcHRIYXNoKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHZlcnNpb24gb3IgTmV0d29yayBtaXNtYXRjaCcpO1xuICAgICAgaWYgKF9hZGRyZXNzKCkuaGFzaC5sZW5ndGggIT09IDIwKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGFkZHJlc3MnKTtcbiAgICAgIGhhc2ggPSBfYWRkcmVzcygpLmhhc2g7XG4gICAgfVxuICAgIGlmIChhLmhhc2gpIHtcbiAgICAgIGlmIChoYXNoLmxlbmd0aCA+IDAgJiYgIWhhc2guZXF1YWxzKGEuaGFzaCkpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0hhc2ggbWlzbWF0Y2gnKTtcbiAgICAgIGVsc2UgaGFzaCA9IGEuaGFzaDtcbiAgICB9XG4gICAgaWYgKGEub3V0cHV0KSB7XG4gICAgICBpZiAoXG4gICAgICAgIGEub3V0cHV0Lmxlbmd0aCAhPT0gMjMgfHxcbiAgICAgICAgYS5vdXRwdXRbMF0gIT09IE9QUy5PUF9IQVNIMTYwIHx8XG4gICAgICAgIGEub3V0cHV0WzFdICE9PSAweDE0IHx8XG4gICAgICAgIGEub3V0cHV0WzIyXSAhPT0gT1BTLk9QX0VRVUFMXG4gICAgICApXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ091dHB1dCBpcyBpbnZhbGlkJyk7XG4gICAgICBjb25zdCBoYXNoMiA9IGEub3V0cHV0LnNsaWNlKDIsIDIyKTtcbiAgICAgIGlmIChoYXNoLmxlbmd0aCA+IDAgJiYgIWhhc2guZXF1YWxzKGhhc2gyKSlcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSGFzaCBtaXNtYXRjaCcpO1xuICAgICAgZWxzZSBoYXNoID0gaGFzaDI7XG4gICAgfVxuICAgIC8vIGlubGluZWQgdG8gcHJldmVudCAnbm8taW5uZXItZGVjbGFyYXRpb25zJyBmYWlsaW5nXG4gICAgY29uc3QgY2hlY2tSZWRlZW0gPSByZWRlZW0gPT4ge1xuICAgICAgLy8gaXMgdGhlIHJlZGVlbSBvdXRwdXQgZW1wdHkvaW52YWxpZD9cbiAgICAgIGlmIChyZWRlZW0ub3V0cHV0KSB7XG4gICAgICAgIGNvbnN0IGRlY29tcGlsZSA9IGJzY3JpcHQuZGVjb21waWxlKHJlZGVlbS5vdXRwdXQpO1xuICAgICAgICBpZiAoIWRlY29tcGlsZSB8fCBkZWNvbXBpbGUubGVuZ3RoIDwgMSlcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdSZWRlZW0ub3V0cHV0IHRvbyBzaG9ydCcpO1xuICAgICAgICAvLyBtYXRjaCBoYXNoIGFnYWluc3Qgb3RoZXIgc291cmNlc1xuICAgICAgICBjb25zdCBoYXNoMiA9IGJjcnlwdG8uaGFzaDE2MChyZWRlZW0ub3V0cHV0KTtcbiAgICAgICAgaWYgKGhhc2gubGVuZ3RoID4gMCAmJiAhaGFzaC5lcXVhbHMoaGFzaDIpKVxuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0hhc2ggbWlzbWF0Y2gnKTtcbiAgICAgICAgZWxzZSBoYXNoID0gaGFzaDI7XG4gICAgICB9XG4gICAgICBpZiAocmVkZWVtLmlucHV0KSB7XG4gICAgICAgIGNvbnN0IGhhc0lucHV0ID0gcmVkZWVtLmlucHV0Lmxlbmd0aCA+IDA7XG4gICAgICAgIGNvbnN0IGhhc1dpdG5lc3MgPSByZWRlZW0ud2l0bmVzcyAmJiByZWRlZW0ud2l0bmVzcy5sZW5ndGggPiAwO1xuICAgICAgICBpZiAoIWhhc0lucHV0ICYmICFoYXNXaXRuZXNzKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdFbXB0eSBpbnB1dCcpO1xuICAgICAgICBpZiAoaGFzSW5wdXQgJiYgaGFzV2l0bmVzcylcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnB1dCBhbmQgd2l0bmVzcyBwcm92aWRlZCcpO1xuICAgICAgICBpZiAoaGFzSW5wdXQpIHtcbiAgICAgICAgICBjb25zdCByaWNodW5rcyA9IGJzY3JpcHQuZGVjb21waWxlKHJlZGVlbS5pbnB1dCk7XG4gICAgICAgICAgaWYgKCFic2NyaXB0LmlzUHVzaE9ubHkocmljaHVua3MpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTm9uIHB1c2gtb25seSBzY3JpcHRTaWcnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgaWYgKGEuaW5wdXQpIHtcbiAgICAgIGNvbnN0IGNodW5rcyA9IF9jaHVua3MoKTtcbiAgICAgIGlmICghY2h1bmtzIHx8IGNodW5rcy5sZW5ndGggPCAxKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnB1dCB0b28gc2hvcnQnKTtcbiAgICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKF9yZWRlZW0oKS5vdXRwdXQpKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnB1dCBpcyBpbnZhbGlkJyk7XG4gICAgICBjaGVja1JlZGVlbShfcmVkZWVtKCkpO1xuICAgIH1cbiAgICBpZiAoYS5yZWRlZW0pIHtcbiAgICAgIGlmIChhLnJlZGVlbS5uZXR3b3JrICYmIGEucmVkZWVtLm5ldHdvcmsgIT09IG5ldHdvcmspXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgbWlzbWF0Y2gnKTtcbiAgICAgIGlmIChhLmlucHV0KSB7XG4gICAgICAgIGNvbnN0IHJlZGVlbSA9IF9yZWRlZW0oKTtcbiAgICAgICAgaWYgKGEucmVkZWVtLm91dHB1dCAmJiAhYS5yZWRlZW0ub3V0cHV0LmVxdWFscyhyZWRlZW0ub3V0cHV0KSlcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdSZWRlZW0ub3V0cHV0IG1pc21hdGNoJyk7XG4gICAgICAgIGlmIChhLnJlZGVlbS5pbnB1dCAmJiAhYS5yZWRlZW0uaW5wdXQuZXF1YWxzKHJlZGVlbS5pbnB1dCkpXG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUmVkZWVtLmlucHV0IG1pc21hdGNoJyk7XG4gICAgICB9XG4gICAgICBjaGVja1JlZGVlbShhLnJlZGVlbSk7XG4gICAgfVxuICAgIGlmIChhLndpdG5lc3MpIHtcbiAgICAgIGlmIChcbiAgICAgICAgYS5yZWRlZW0gJiZcbiAgICAgICAgYS5yZWRlZW0ud2l0bmVzcyAmJlxuICAgICAgICAhc3RhY2tzRXF1YWwoYS5yZWRlZW0ud2l0bmVzcywgYS53aXRuZXNzKVxuICAgICAgKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdXaXRuZXNzIGFuZCByZWRlZW0ud2l0bmVzcyBtaXNtYXRjaCcpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gT2JqZWN0LmFzc2lnbihvLCBhKTtcbn1cbmV4cG9ydHMucDJzaCA9IHAyc2g7XG4iLCIndXNlIHN0cmljdCc7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaW5wdXQgPSByZXF1aXJlKCcuL2lucHV0Jyk7XG5leHBvcnRzLmlucHV0ID0gaW5wdXQ7XG5jb25zdCBvdXRwdXQgPSByZXF1aXJlKCcuL291dHB1dCcpO1xuZXhwb3J0cy5vdXRwdXQgPSBvdXRwdXQ7XG4iLCIndXNlIHN0cmljdCc7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYmFkZHJlc3MgPSByZXF1aXJlKCcuL2FkZHJlc3MnKTtcbmNvbnN0IGJ1ZmZlcnV0aWxzXzEgPSByZXF1aXJlKCcuL2J1ZmZlcnV0aWxzJyk7XG5jb25zdCBjbGFzc2lmeSA9IHJlcXVpcmUoJy4vY2xhc3NpZnknKTtcbmNvbnN0IGJjcnlwdG8gPSByZXF1aXJlKCcuL2NyeXB0bycpO1xuY29uc3QgRUNQYWlyID0gcmVxdWlyZSgnLi9lY3BhaXInKTtcbmNvbnN0IG5ldHdvcmtzID0gcmVxdWlyZSgnLi9uZXR3b3JrcycpO1xuY29uc3QgcGF5bWVudHMgPSByZXF1aXJlKCcuL3BheW1lbnRzJyk7XG5jb25zdCBic2NyaXB0ID0gcmVxdWlyZSgnLi9zY3JpcHQnKTtcbmNvbnN0IHNjcmlwdF8xID0gcmVxdWlyZSgnLi9zY3JpcHQnKTtcbmNvbnN0IHRyYW5zYWN0aW9uXzEgPSByZXF1aXJlKCcuL3RyYW5zYWN0aW9uJyk7XG5jb25zdCB0eXBlcyA9IHJlcXVpcmUoJy4vdHlwZXMnKTtcbmNvbnN0IHR5cGVmb3JjZSA9IHJlcXVpcmUoJ3R5cGVmb3JjZScpO1xuY29uc3QgU0NSSVBUX1RZUEVTID0gY2xhc3NpZnkudHlwZXM7XG5jb25zdCBQUkVWT1VUX1RZUEVTID0gbmV3IFNldChbXG4gIC8vIFJhd1xuICAncDJwa2gnLFxuICAncDJwaycsXG4gICdwMndwa2gnLFxuICAncDJtcycsXG4gIC8vIFAyU0ggd3JhcHBlZFxuICAncDJzaC1wMnBraCcsXG4gICdwMnNoLXAycGsnLFxuICAncDJzaC1wMndwa2gnLFxuICAncDJzaC1wMm1zJyxcbiAgLy8gUDJXU0ggd3JhcHBlZFxuICAncDJ3c2gtcDJwa2gnLFxuICAncDJ3c2gtcDJwaycsXG4gICdwMndzaC1wMm1zJyxcbiAgLy8gUDJTSC1QMldTSCB3cmFwcGVyXG4gICdwMnNoLXAyd3NoLXAycGtoJyxcbiAgJ3Ayc2gtcDJ3c2gtcDJwaycsXG4gICdwMnNoLXAyd3NoLXAybXMnLFxuXSk7XG5mdW5jdGlvbiB0Zk1lc3NhZ2UodHlwZSwgdmFsdWUsIG1lc3NhZ2UpIHtcbiAgdHJ5IHtcbiAgICB0eXBlZm9yY2UodHlwZSwgdmFsdWUpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIH1cbn1cbmZ1bmN0aW9uIHR4SXNTdHJpbmcodHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB0eCA9PT0gJ3N0cmluZycgfHwgdHggaW5zdGFuY2VvZiBTdHJpbmc7XG59XG5mdW5jdGlvbiB0eElzVHJhbnNhY3Rpb24odHgpIHtcbiAgcmV0dXJuIHR4IGluc3RhbmNlb2YgdHJhbnNhY3Rpb25fMS5UcmFuc2FjdGlvbjtcbn1cbmNsYXNzIFRyYW5zYWN0aW9uQnVpbGRlciB7XG4gIC8vIFdBUk5JTkc6IG1heGltdW1GZWVSYXRlIGlzIF9fTk9UX18gdG8gYmUgcmVsaWVkIG9uLFxuICAvLyAgICAgICAgICBpdCdzIGp1c3QgYW5vdGhlciBwb3RlbnRpYWwgc2FmZXR5IG1lY2hhbmlzbSAoc2FmZXR5IGluLWRlcHRoKVxuICBjb25zdHJ1Y3RvcihuZXR3b3JrID0gbmV0d29ya3MuYml0Y29pbiwgbWF4aW11bUZlZVJhdGUgPSAyNTAwKSB7XG4gICAgdGhpcy5uZXR3b3JrID0gbmV0d29yaztcbiAgICB0aGlzLm1heGltdW1GZWVSYXRlID0gbWF4aW11bUZlZVJhdGU7XG4gICAgdGhpcy5fX1BSRVZfVFhfU0VUID0ge307XG4gICAgdGhpcy5fX0lOUFVUUyA9IFtdO1xuICAgIHRoaXMuX19UWCA9IG5ldyB0cmFuc2FjdGlvbl8xLlRyYW5zYWN0aW9uKCk7XG4gICAgdGhpcy5fX1RYLnZlcnNpb24gPSAyO1xuICAgIHRoaXMuX19VU0VfTE9XX1IgPSBmYWxzZTtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICAnRGVwcmVjYXRpb24gV2FybmluZzogVHJhbnNhY3Rpb25CdWlsZGVyIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlLiAnICtcbiAgICAgICAgJyh2Ni54Lnggb3IgbGF0ZXIpIFBsZWFzZSB1c2UgdGhlIFBzYnQgY2xhc3MgaW5zdGVhZC4gRXhhbXBsZXMgb2YgdXNhZ2UgJyArXG4gICAgICAgICdhcmUgYXZhaWxhYmxlIGluIHRoZSB0cmFuc2FjdGlvbnMtcHNidC5qcyBpbnRlZ3JhdGlvbiB0ZXN0IGZpbGUgb24gb3VyICcgK1xuICAgICAgICAnR2l0aHViLiBBIGhpZ2ggbGV2ZWwgZXhwbGFuYXRpb24gaXMgYXZhaWxhYmxlIGluIHRoZSBwc2J0LnRzIGFuZCBwc2J0LmpzICcgK1xuICAgICAgICAnZmlsZXMgYXMgd2VsbC4nLFxuICAgICk7XG4gIH1cbiAgc3RhdGljIGZyb21UcmFuc2FjdGlvbih0cmFuc2FjdGlvbiwgbmV0d29yaykge1xuICAgIGNvbnN0IHR4YiA9IG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIobmV0d29yayk7XG4gICAgLy8gQ29weSB0cmFuc2FjdGlvbiBmaWVsZHNcbiAgICB0eGIuc2V0VmVyc2lvbih0cmFuc2FjdGlvbi52ZXJzaW9uKTtcbiAgICB0eGIuc2V0TG9ja1RpbWUodHJhbnNhY3Rpb24ubG9ja3RpbWUpO1xuICAgIC8vIENvcHkgb3V0cHV0cyAoZG9uZSBmaXJzdCB0byBhdm9pZCBzaWduYXR1cmUgaW52YWxpZGF0aW9uKVxuICAgIHRyYW5zYWN0aW9uLm91dHMuZm9yRWFjaCh0eE91dCA9PiB7XG4gICAgICB0eGIuYWRkT3V0cHV0KHR4T3V0LnNjcmlwdCwgdHhPdXQudmFsdWUpO1xuICAgIH0pO1xuICAgIC8vIENvcHkgaW5wdXRzXG4gICAgdHJhbnNhY3Rpb24uaW5zLmZvckVhY2godHhJbiA9PiB7XG4gICAgICB0eGIuX19hZGRJbnB1dFVuc2FmZSh0eEluLmhhc2gsIHR4SW4uaW5kZXgsIHtcbiAgICAgICAgc2VxdWVuY2U6IHR4SW4uc2VxdWVuY2UsXG4gICAgICAgIHNjcmlwdDogdHhJbi5zY3JpcHQsXG4gICAgICAgIHdpdG5lc3M6IHR4SW4ud2l0bmVzcyxcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIGZpeCBzb21lIHRoaW5ncyBub3QgcG9zc2libGUgdGhyb3VnaCB0aGUgcHVibGljIEFQSVxuICAgIHR4Yi5fX0lOUFVUUy5mb3JFYWNoKChpbnB1dCwgaSkgPT4ge1xuICAgICAgZml4TXVsdGlzaWdPcmRlcihpbnB1dCwgdHJhbnNhY3Rpb24sIGkpO1xuICAgIH0pO1xuICAgIHJldHVybiB0eGI7XG4gIH1cbiAgc2V0TG93UihzZXR0aW5nKSB7XG4gICAgdHlwZWZvcmNlKHR5cGVmb3JjZS5tYXliZSh0eXBlZm9yY2UuQm9vbGVhbiksIHNldHRpbmcpO1xuICAgIGlmIChzZXR0aW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHNldHRpbmcgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLl9fVVNFX0xPV19SID0gc2V0dGluZztcbiAgICByZXR1cm4gc2V0dGluZztcbiAgfVxuICBzZXRMb2NrVGltZShsb2NrdGltZSkge1xuICAgIHR5cGVmb3JjZSh0eXBlcy5VSW50MzIsIGxvY2t0aW1lKTtcbiAgICAvLyBpZiBhbnkgc2lnbmF0dXJlcyBleGlzdCwgdGhyb3dcbiAgICBpZiAoXG4gICAgICB0aGlzLl9fSU5QVVRTLnNvbWUoaW5wdXQgPT4ge1xuICAgICAgICBpZiAoIWlucHV0LnNpZ25hdHVyZXMpIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGlucHV0LnNpZ25hdHVyZXMuc29tZShzID0+IHMgIT09IHVuZGVmaW5lZCk7XG4gICAgICB9KVxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObywgdGhpcyB3b3VsZCBpbnZhbGlkYXRlIHNpZ25hdHVyZXMnKTtcbiAgICB9XG4gICAgdGhpcy5fX1RYLmxvY2t0aW1lID0gbG9ja3RpbWU7XG4gIH1cbiAgc2V0VmVyc2lvbih2ZXJzaW9uKSB7XG4gICAgdHlwZWZvcmNlKHR5cGVzLlVJbnQzMiwgdmVyc2lvbik7XG4gICAgLy8gWFhYOiB0aGlzIG1pZ2h0IGV2ZW50dWFsbHkgYmVjb21lIG1vcmUgY29tcGxleCBkZXBlbmRpbmcgb24gd2hhdCB0aGUgdmVyc2lvbnMgcmVwcmVzZW50XG4gICAgdGhpcy5fX1RYLnZlcnNpb24gPSB2ZXJzaW9uO1xuICB9XG4gIGFkZElucHV0KHR4SGFzaCwgdm91dCwgc2VxdWVuY2UsIHByZXZPdXRTY3JpcHQpIHtcbiAgICBpZiAoIXRoaXMuX19jYW5Nb2RpZnlJbnB1dHMoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObywgdGhpcyB3b3VsZCBpbnZhbGlkYXRlIHNpZ25hdHVyZXMnKTtcbiAgICB9XG4gICAgbGV0IHZhbHVlO1xuICAgIC8vIGlzIGl0IGEgaGV4IHN0cmluZz9cbiAgICBpZiAodHhJc1N0cmluZyh0eEhhc2gpKSB7XG4gICAgICAvLyB0cmFuc2FjdGlvbiBoYXNocydzIGFyZSBkaXNwbGF5ZWQgaW4gcmV2ZXJzZSBvcmRlciwgdW4tcmV2ZXJzZSBpdFxuICAgICAgdHhIYXNoID0gYnVmZmVydXRpbHNfMS5yZXZlcnNlQnVmZmVyKEJ1ZmZlci5mcm9tKHR4SGFzaCwgJ2hleCcpKTtcbiAgICAgIC8vIGlzIGl0IGEgVHJhbnNhY3Rpb24gb2JqZWN0P1xuICAgIH0gZWxzZSBpZiAodHhJc1RyYW5zYWN0aW9uKHR4SGFzaCkpIHtcbiAgICAgIGNvbnN0IHR4T3V0ID0gdHhIYXNoLm91dHNbdm91dF07XG4gICAgICBwcmV2T3V0U2NyaXB0ID0gdHhPdXQuc2NyaXB0O1xuICAgICAgdmFsdWUgPSB0eE91dC52YWx1ZTtcbiAgICAgIHR4SGFzaCA9IHR4SGFzaC5nZXRIYXNoKGZhbHNlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX19hZGRJbnB1dFVuc2FmZSh0eEhhc2gsIHZvdXQsIHtcbiAgICAgIHNlcXVlbmNlLFxuICAgICAgcHJldk91dFNjcmlwdCxcbiAgICAgIHZhbHVlLFxuICAgIH0pO1xuICB9XG4gIGFkZE91dHB1dChzY3JpcHRQdWJLZXksIHZhbHVlKSB7XG4gICAgaWYgKCF0aGlzLl9fY2FuTW9kaWZ5T3V0cHV0cygpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vLCB0aGlzIHdvdWxkIGludmFsaWRhdGUgc2lnbmF0dXJlcycpO1xuICAgIH1cbiAgICAvLyBBdHRlbXB0IHRvIGdldCBhIHNjcmlwdCBpZiBpdCdzIGEgYmFzZTU4IG9yIGJlY2gzMiBhZGRyZXNzIHN0cmluZ1xuICAgIGlmICh0eXBlb2Ygc2NyaXB0UHViS2V5ID09PSAnc3RyaW5nJykge1xuICAgICAgc2NyaXB0UHViS2V5ID0gYmFkZHJlc3MudG9PdXRwdXRTY3JpcHQoc2NyaXB0UHViS2V5LCB0aGlzLm5ldHdvcmspO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fX1RYLmFkZE91dHB1dChzY3JpcHRQdWJLZXksIHZhbHVlKTtcbiAgfVxuICBidWlsZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fX2J1aWxkKGZhbHNlKTtcbiAgfVxuICBidWlsZEluY29tcGxldGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19idWlsZCh0cnVlKTtcbiAgfVxuICBzaWduKFxuICAgIHNpZ25QYXJhbXMsXG4gICAga2V5UGFpcixcbiAgICByZWRlZW1TY3JpcHQsXG4gICAgaGFzaFR5cGUsXG4gICAgd2l0bmVzc1ZhbHVlLFxuICAgIHdpdG5lc3NTY3JpcHQsXG4gICkge1xuICAgIHRyeVNpZ24oXG4gICAgICBnZXRTaWduaW5nRGF0YShcbiAgICAgICAgdGhpcy5uZXR3b3JrLFxuICAgICAgICB0aGlzLl9fSU5QVVRTLFxuICAgICAgICB0aGlzLl9fbmVlZHNPdXRwdXRzLmJpbmQodGhpcyksXG4gICAgICAgIHRoaXMuX19UWCxcbiAgICAgICAgc2lnblBhcmFtcyxcbiAgICAgICAga2V5UGFpcixcbiAgICAgICAgcmVkZWVtU2NyaXB0LFxuICAgICAgICBoYXNoVHlwZSxcbiAgICAgICAgd2l0bmVzc1ZhbHVlLFxuICAgICAgICB3aXRuZXNzU2NyaXB0LFxuICAgICAgICB0aGlzLl9fVVNFX0xPV19SLFxuICAgICAgKSxcbiAgICApO1xuICB9XG4gIF9fYWRkSW5wdXRVbnNhZmUodHhIYXNoLCB2b3V0LCBvcHRpb25zKSB7XG4gICAgaWYgKHRyYW5zYWN0aW9uXzEuVHJhbnNhY3Rpb24uaXNDb2luYmFzZUhhc2godHhIYXNoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb2luYmFzZSBpbnB1dHMgbm90IHN1cHBvcnRlZCcpO1xuICAgIH1cbiAgICBjb25zdCBwcmV2VHhPdXQgPSB0eEhhc2gudG9TdHJpbmcoJ2hleCcpICsgJzonICsgdm91dDtcbiAgICBpZiAodGhpcy5fX1BSRVZfVFhfU0VUW3ByZXZUeE91dF0gIT09IHVuZGVmaW5lZClcbiAgICAgIHRocm93IG5ldyBFcnJvcignRHVwbGljYXRlIFR4T3V0OiAnICsgcHJldlR4T3V0KTtcbiAgICBsZXQgaW5wdXQgPSB7fTtcbiAgICAvLyBkZXJpdmUgd2hhdCB3ZSBjYW4gZnJvbSB0aGUgc2NyaXB0U2lnXG4gICAgaWYgKG9wdGlvbnMuc2NyaXB0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlucHV0ID0gZXhwYW5kSW5wdXQob3B0aW9ucy5zY3JpcHQsIG9wdGlvbnMud2l0bmVzcyB8fCBbXSk7XG4gICAgfVxuICAgIC8vIGlmIGFuIGlucHV0IHZhbHVlIHdhcyBnaXZlbiwgcmV0YWluIGl0XG4gICAgaWYgKG9wdGlvbnMudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaW5wdXQudmFsdWUgPSBvcHRpb25zLnZhbHVlO1xuICAgIH1cbiAgICAvLyBkZXJpdmUgd2hhdCB3ZSBjYW4gZnJvbSB0aGUgcHJldmlvdXMgdHJhbnNhY3Rpb25zIG91dHB1dCBzY3JpcHRcbiAgICBpZiAoIWlucHV0LnByZXZPdXRTY3JpcHQgJiYgb3B0aW9ucy5wcmV2T3V0U2NyaXB0KSB7XG4gICAgICBsZXQgcHJldk91dFR5cGU7XG4gICAgICBpZiAoIWlucHV0LnB1YmtleXMgJiYgIWlucHV0LnNpZ25hdHVyZXMpIHtcbiAgICAgICAgY29uc3QgZXhwYW5kZWQgPSBleHBhbmRPdXRwdXQob3B0aW9ucy5wcmV2T3V0U2NyaXB0KTtcbiAgICAgICAgaWYgKGV4cGFuZGVkLnB1YmtleXMpIHtcbiAgICAgICAgICBpbnB1dC5wdWJrZXlzID0gZXhwYW5kZWQucHVia2V5cztcbiAgICAgICAgICBpbnB1dC5zaWduYXR1cmVzID0gZXhwYW5kZWQuc2lnbmF0dXJlcztcbiAgICAgICAgfVxuICAgICAgICBwcmV2T3V0VHlwZSA9IGV4cGFuZGVkLnR5cGU7XG4gICAgICB9XG4gICAgICBpbnB1dC5wcmV2T3V0U2NyaXB0ID0gb3B0aW9ucy5wcmV2T3V0U2NyaXB0O1xuICAgICAgaW5wdXQucHJldk91dFR5cGUgPSBwcmV2T3V0VHlwZSB8fCBjbGFzc2lmeS5vdXRwdXQob3B0aW9ucy5wcmV2T3V0U2NyaXB0KTtcbiAgICB9XG4gICAgY29uc3QgdmluID0gdGhpcy5fX1RYLmFkZElucHV0KFxuICAgICAgdHhIYXNoLFxuICAgICAgdm91dCxcbiAgICAgIG9wdGlvbnMuc2VxdWVuY2UsXG4gICAgICBvcHRpb25zLnNjcmlwdFNpZyxcbiAgICApO1xuICAgIHRoaXMuX19JTlBVVFNbdmluXSA9IGlucHV0O1xuICAgIHRoaXMuX19QUkVWX1RYX1NFVFtwcmV2VHhPdXRdID0gdHJ1ZTtcbiAgICByZXR1cm4gdmluO1xuICB9XG4gIF9fYnVpbGQoYWxsb3dJbmNvbXBsZXRlKSB7XG4gICAgaWYgKCFhbGxvd0luY29tcGxldGUpIHtcbiAgICAgIGlmICghdGhpcy5fX1RYLmlucy5sZW5ndGgpIHRocm93IG5ldyBFcnJvcignVHJhbnNhY3Rpb24gaGFzIG5vIGlucHV0cycpO1xuICAgICAgaWYgKCF0aGlzLl9fVFgub3V0cy5sZW5ndGgpIHRocm93IG5ldyBFcnJvcignVHJhbnNhY3Rpb24gaGFzIG5vIG91dHB1dHMnKTtcbiAgICB9XG4gICAgY29uc3QgdHggPSB0aGlzLl9fVFguY2xvbmUoKTtcbiAgICAvLyBjcmVhdGUgc2NyaXB0IHNpZ25hdHVyZXMgZnJvbSBpbnB1dHNcbiAgICB0aGlzLl9fSU5QVVRTLmZvckVhY2goKGlucHV0LCBpKSA9PiB7XG4gICAgICBpZiAoIWlucHV0LnByZXZPdXRUeXBlICYmICFhbGxvd0luY29tcGxldGUpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVHJhbnNhY3Rpb24gaXMgbm90IGNvbXBsZXRlJyk7XG4gICAgICBjb25zdCByZXN1bHQgPSBidWlsZChpbnB1dC5wcmV2T3V0VHlwZSwgaW5wdXQsIGFsbG93SW5jb21wbGV0ZSk7XG4gICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICBpZiAoIWFsbG93SW5jb21wbGV0ZSAmJiBpbnB1dC5wcmV2T3V0VHlwZSA9PT0gU0NSSVBUX1RZUEVTLk5PTlNUQU5EQVJEKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBpbnB1dCB0eXBlJyk7XG4gICAgICAgIGlmICghYWxsb3dJbmNvbXBsZXRlKSB0aHJvdyBuZXcgRXJyb3IoJ05vdCBlbm91Z2ggaW5mb3JtYXRpb24nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdHguc2V0SW5wdXRTY3JpcHQoaSwgcmVzdWx0LmlucHV0KTtcbiAgICAgIHR4LnNldFdpdG5lc3MoaSwgcmVzdWx0LndpdG5lc3MpO1xuICAgIH0pO1xuICAgIGlmICghYWxsb3dJbmNvbXBsZXRlKSB7XG4gICAgICAvLyBkbyBub3QgcmVseSBvbiB0aGlzLCBpdHMgbWVyZWx5IGEgbGFzdCByZXNvcnRcbiAgICAgIGlmICh0aGlzLl9fb3Zlck1heGltdW1GZWVzKHR4LnZpcnR1YWxTaXplKCkpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVHJhbnNhY3Rpb24gaGFzIGFic3VyZCBmZWVzJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0eDtcbiAgfVxuICBfX2Nhbk1vZGlmeUlucHV0cygpIHtcbiAgICByZXR1cm4gdGhpcy5fX0lOUFVUUy5ldmVyeShpbnB1dCA9PiB7XG4gICAgICBpZiAoIWlucHV0LnNpZ25hdHVyZXMpIHJldHVybiB0cnVlO1xuICAgICAgcmV0dXJuIGlucHV0LnNpZ25hdHVyZXMuZXZlcnkoc2lnbmF0dXJlID0+IHtcbiAgICAgICAgaWYgKCFzaWduYXR1cmUpIHJldHVybiB0cnVlO1xuICAgICAgICBjb25zdCBoYXNoVHlwZSA9IHNpZ25hdHVyZUhhc2hUeXBlKHNpZ25hdHVyZSk7XG4gICAgICAgIC8vIGlmIFNJR0hBU0hfQU5ZT05FQ0FOUEFZIGlzIHNldCwgc2lnbmF0dXJlcyB3b3VsZCBub3RcbiAgICAgICAgLy8gYmUgaW52YWxpZGF0ZWQgYnkgbW9yZSBpbnB1dHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAoaGFzaFR5cGUgJiB0cmFuc2FjdGlvbl8xLlRyYW5zYWN0aW9uLlNJR0hBU0hfQU5ZT05FQ0FOUEFZKSAhPT0gMFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgX19uZWVkc091dHB1dHMoc2lnbmluZ0hhc2hUeXBlKSB7XG4gICAgaWYgKHNpZ25pbmdIYXNoVHlwZSA9PT0gdHJhbnNhY3Rpb25fMS5UcmFuc2FjdGlvbi5TSUdIQVNIX0FMTCkge1xuICAgICAgcmV0dXJuIHRoaXMuX19UWC5vdXRzLmxlbmd0aCA9PT0gMDtcbiAgICB9XG4gICAgLy8gaWYgaW5wdXRzIGFyZSBiZWluZyBzaWduZWQgd2l0aCBTSUdIQVNIX05PTkUsIHdlIGRvbid0IHN0cmljdGx5IG5lZWQgb3V0cHV0c1xuICAgIC8vIC5idWlsZCgpIHdpbGwgZmFpbCwgYnV0IC5idWlsZEluY29tcGxldGUoKSBpcyBPS1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLl9fVFgub3V0cy5sZW5ndGggPT09IDAgJiZcbiAgICAgIHRoaXMuX19JTlBVVFMuc29tZShpbnB1dCA9PiB7XG4gICAgICAgIGlmICghaW5wdXQuc2lnbmF0dXJlcykgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gaW5wdXQuc2lnbmF0dXJlcy5zb21lKHNpZ25hdHVyZSA9PiB7XG4gICAgICAgICAgaWYgKCFzaWduYXR1cmUpIHJldHVybiBmYWxzZTsgLy8gbm8gc2lnbmF0dXJlLCBubyBpc3N1ZVxuICAgICAgICAgIGNvbnN0IGhhc2hUeXBlID0gc2lnbmF0dXJlSGFzaFR5cGUoc2lnbmF0dXJlKTtcbiAgICAgICAgICBpZiAoaGFzaFR5cGUgJiB0cmFuc2FjdGlvbl8xLlRyYW5zYWN0aW9uLlNJR0hBU0hfTk9ORSkgcmV0dXJuIGZhbHNlOyAvLyBTSUdIQVNIX05PTkUgZG9lc24ndCBjYXJlIGFib3V0IG91dHB1dHNcbiAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gU0lHSEFTSF8qIGRvZXMgY2FyZVxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBfX2Nhbk1vZGlmeU91dHB1dHMoKSB7XG4gICAgY29uc3QgbklucHV0cyA9IHRoaXMuX19UWC5pbnMubGVuZ3RoO1xuICAgIGNvbnN0IG5PdXRwdXRzID0gdGhpcy5fX1RYLm91dHMubGVuZ3RoO1xuICAgIHJldHVybiB0aGlzLl9fSU5QVVRTLmV2ZXJ5KGlucHV0ID0+IHtcbiAgICAgIGlmIChpbnB1dC5zaWduYXR1cmVzID09PSB1bmRlZmluZWQpIHJldHVybiB0cnVlO1xuICAgICAgcmV0dXJuIGlucHV0LnNpZ25hdHVyZXMuZXZlcnkoc2lnbmF0dXJlID0+IHtcbiAgICAgICAgaWYgKCFzaWduYXR1cmUpIHJldHVybiB0cnVlO1xuICAgICAgICBjb25zdCBoYXNoVHlwZSA9IHNpZ25hdHVyZUhhc2hUeXBlKHNpZ25hdHVyZSk7XG4gICAgICAgIGNvbnN0IGhhc2hUeXBlTW9kID0gaGFzaFR5cGUgJiAweDFmO1xuICAgICAgICBpZiAoaGFzaFR5cGVNb2QgPT09IHRyYW5zYWN0aW9uXzEuVHJhbnNhY3Rpb24uU0lHSEFTSF9OT05FKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgaWYgKGhhc2hUeXBlTW9kID09PSB0cmFuc2FjdGlvbl8xLlRyYW5zYWN0aW9uLlNJR0hBU0hfU0lOR0xFKSB7XG4gICAgICAgICAgLy8gaWYgU0lHSEFTSF9TSU5HTEUgaXMgc2V0LCBhbmQgbklucHV0cyA+IG5PdXRwdXRzXG4gICAgICAgICAgLy8gc29tZSBzaWduYXR1cmVzIHdvdWxkIGJlIGludmFsaWRhdGVkIGJ5IHRoZSBhZGRpdGlvblxuICAgICAgICAgIC8vIG9mIG1vcmUgb3V0cHV0c1xuICAgICAgICAgIHJldHVybiBuSW5wdXRzIDw9IG5PdXRwdXRzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIF9fb3Zlck1heGltdW1GZWVzKGJ5dGVzKSB7XG4gICAgLy8gbm90IGFsbCBpbnB1dHMgd2lsbCBoYXZlIC52YWx1ZSBkZWZpbmVkXG4gICAgY29uc3QgaW5jb21pbmcgPSB0aGlzLl9fSU5QVVRTLnJlZHVjZSgoYSwgeCkgPT4gYSArICh4LnZhbHVlID4+PiAwKSwgMCk7XG4gICAgLy8gYnV0IGFsbCBvdXRwdXRzIGRvLCBhbmQgaWYgd2UgaGF2ZSBhbnkgaW5wdXQgdmFsdWVcbiAgICAvLyB3ZSBjYW4gaW1tZWRpYXRlbHkgZGV0ZXJtaW5lIGlmIHRoZSBvdXRwdXRzIGFyZSB0b28gc21hbGxcbiAgICBjb25zdCBvdXRnb2luZyA9IHRoaXMuX19UWC5vdXRzLnJlZHVjZSgoYSwgeCkgPT4gYSArIHgudmFsdWUsIDApO1xuICAgIGNvbnN0IGZlZSA9IGluY29taW5nIC0gb3V0Z29pbmc7XG4gICAgY29uc3QgZmVlUmF0ZSA9IGZlZSAvIGJ5dGVzO1xuICAgIHJldHVybiBmZWVSYXRlID4gdGhpcy5tYXhpbXVtRmVlUmF0ZTtcbiAgfVxufVxuZXhwb3J0cy5UcmFuc2FjdGlvbkJ1aWxkZXIgPSBUcmFuc2FjdGlvbkJ1aWxkZXI7XG5mdW5jdGlvbiBleHBhbmRJbnB1dChzY3JpcHRTaWcsIHdpdG5lc3NTdGFjaywgdHlwZSwgc2NyaXB0UHViS2V5KSB7XG4gIGlmIChzY3JpcHRTaWcubGVuZ3RoID09PSAwICYmIHdpdG5lc3NTdGFjay5sZW5ndGggPT09IDApIHJldHVybiB7fTtcbiAgaWYgKCF0eXBlKSB7XG4gICAgbGV0IHNzVHlwZSA9IGNsYXNzaWZ5LmlucHV0KHNjcmlwdFNpZywgdHJ1ZSk7XG4gICAgbGV0IHdzVHlwZSA9IGNsYXNzaWZ5LndpdG5lc3Mod2l0bmVzc1N0YWNrLCB0cnVlKTtcbiAgICBpZiAoc3NUeXBlID09PSBTQ1JJUFRfVFlQRVMuTk9OU1RBTkRBUkQpIHNzVHlwZSA9IHVuZGVmaW5lZDtcbiAgICBpZiAod3NUeXBlID09PSBTQ1JJUFRfVFlQRVMuTk9OU1RBTkRBUkQpIHdzVHlwZSA9IHVuZGVmaW5lZDtcbiAgICB0eXBlID0gc3NUeXBlIHx8IHdzVHlwZTtcbiAgfVxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFNDUklQVF9UWVBFUy5QMldQS0g6IHtcbiAgICAgIGNvbnN0IHsgb3V0cHV0LCBwdWJrZXksIHNpZ25hdHVyZSB9ID0gcGF5bWVudHMucDJ3cGtoKHtcbiAgICAgICAgd2l0bmVzczogd2l0bmVzc1N0YWNrLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwcmV2T3V0U2NyaXB0OiBvdXRwdXQsXG4gICAgICAgIHByZXZPdXRUeXBlOiBTQ1JJUFRfVFlQRVMuUDJXUEtILFxuICAgICAgICBwdWJrZXlzOiBbcHVia2V5XSxcbiAgICAgICAgc2lnbmF0dXJlczogW3NpZ25hdHVyZV0sXG4gICAgICB9O1xuICAgIH1cbiAgICBjYXNlIFNDUklQVF9UWVBFUy5QMlBLSDoge1xuICAgICAgY29uc3QgeyBvdXRwdXQsIHB1YmtleSwgc2lnbmF0dXJlIH0gPSBwYXltZW50cy5wMnBraCh7XG4gICAgICAgIGlucHV0OiBzY3JpcHRTaWcsXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHByZXZPdXRTY3JpcHQ6IG91dHB1dCxcbiAgICAgICAgcHJldk91dFR5cGU6IFNDUklQVF9UWVBFUy5QMlBLSCxcbiAgICAgICAgcHVia2V5czogW3B1YmtleV0sXG4gICAgICAgIHNpZ25hdHVyZXM6IFtzaWduYXR1cmVdLFxuICAgICAgfTtcbiAgICB9XG4gICAgY2FzZSBTQ1JJUFRfVFlQRVMuUDJQSzoge1xuICAgICAgY29uc3QgeyBzaWduYXR1cmUgfSA9IHBheW1lbnRzLnAycGsoeyBpbnB1dDogc2NyaXB0U2lnIH0pO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcHJldk91dFR5cGU6IFNDUklQVF9UWVBFUy5QMlBLLFxuICAgICAgICBwdWJrZXlzOiBbdW5kZWZpbmVkXSxcbiAgICAgICAgc2lnbmF0dXJlczogW3NpZ25hdHVyZV0sXG4gICAgICB9O1xuICAgIH1cbiAgICBjYXNlIFNDUklQVF9UWVBFUy5QMk1TOiB7XG4gICAgICBjb25zdCB7IG0sIHB1YmtleXMsIHNpZ25hdHVyZXMgfSA9IHBheW1lbnRzLnAybXMoXG4gICAgICAgIHtcbiAgICAgICAgICBpbnB1dDogc2NyaXB0U2lnLFxuICAgICAgICAgIG91dHB1dDogc2NyaXB0UHViS2V5LFxuICAgICAgICB9LFxuICAgICAgICB7IGFsbG93SW5jb21wbGV0ZTogdHJ1ZSB9LFxuICAgICAgKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHByZXZPdXRUeXBlOiBTQ1JJUFRfVFlQRVMuUDJNUyxcbiAgICAgICAgcHVia2V5cyxcbiAgICAgICAgc2lnbmF0dXJlcyxcbiAgICAgICAgbWF4U2lnbmF0dXJlczogbSxcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIGlmICh0eXBlID09PSBTQ1JJUFRfVFlQRVMuUDJTSCkge1xuICAgIGNvbnN0IHsgb3V0cHV0LCByZWRlZW0gfSA9IHBheW1lbnRzLnAyc2goe1xuICAgICAgaW5wdXQ6IHNjcmlwdFNpZyxcbiAgICAgIHdpdG5lc3M6IHdpdG5lc3NTdGFjayxcbiAgICB9KTtcbiAgICBjb25zdCBvdXRwdXRUeXBlID0gY2xhc3NpZnkub3V0cHV0KHJlZGVlbS5vdXRwdXQpO1xuICAgIGNvbnN0IGV4cGFuZGVkID0gZXhwYW5kSW5wdXQoXG4gICAgICByZWRlZW0uaW5wdXQsXG4gICAgICByZWRlZW0ud2l0bmVzcyxcbiAgICAgIG91dHB1dFR5cGUsXG4gICAgICByZWRlZW0ub3V0cHV0LFxuICAgICk7XG4gICAgaWYgKCFleHBhbmRlZC5wcmV2T3V0VHlwZSkgcmV0dXJuIHt9O1xuICAgIHJldHVybiB7XG4gICAgICBwcmV2T3V0U2NyaXB0OiBvdXRwdXQsXG4gICAgICBwcmV2T3V0VHlwZTogU0NSSVBUX1RZUEVTLlAyU0gsXG4gICAgICByZWRlZW1TY3JpcHQ6IHJlZGVlbS5vdXRwdXQsXG4gICAgICByZWRlZW1TY3JpcHRUeXBlOiBleHBhbmRlZC5wcmV2T3V0VHlwZSxcbiAgICAgIHdpdG5lc3NTY3JpcHQ6IGV4cGFuZGVkLndpdG5lc3NTY3JpcHQsXG4gICAgICB3aXRuZXNzU2NyaXB0VHlwZTogZXhwYW5kZWQud2l0bmVzc1NjcmlwdFR5cGUsXG4gICAgICBwdWJrZXlzOiBleHBhbmRlZC5wdWJrZXlzLFxuICAgICAgc2lnbmF0dXJlczogZXhwYW5kZWQuc2lnbmF0dXJlcyxcbiAgICB9O1xuICB9XG4gIGlmICh0eXBlID09PSBTQ1JJUFRfVFlQRVMuUDJXU0gpIHtcbiAgICBjb25zdCB7IG91dHB1dCwgcmVkZWVtIH0gPSBwYXltZW50cy5wMndzaCh7XG4gICAgICBpbnB1dDogc2NyaXB0U2lnLFxuICAgICAgd2l0bmVzczogd2l0bmVzc1N0YWNrLFxuICAgIH0pO1xuICAgIGNvbnN0IG91dHB1dFR5cGUgPSBjbGFzc2lmeS5vdXRwdXQocmVkZWVtLm91dHB1dCk7XG4gICAgbGV0IGV4cGFuZGVkO1xuICAgIGlmIChvdXRwdXRUeXBlID09PSBTQ1JJUFRfVFlQRVMuUDJXUEtIKSB7XG4gICAgICBleHBhbmRlZCA9IGV4cGFuZElucHV0KHJlZGVlbS5pbnB1dCwgcmVkZWVtLndpdG5lc3MsIG91dHB1dFR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBhbmRlZCA9IGV4cGFuZElucHV0KFxuICAgICAgICBic2NyaXB0LmNvbXBpbGUocmVkZWVtLndpdG5lc3MpLFxuICAgICAgICBbXSxcbiAgICAgICAgb3V0cHV0VHlwZSxcbiAgICAgICAgcmVkZWVtLm91dHB1dCxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghZXhwYW5kZWQucHJldk91dFR5cGUpIHJldHVybiB7fTtcbiAgICByZXR1cm4ge1xuICAgICAgcHJldk91dFNjcmlwdDogb3V0cHV0LFxuICAgICAgcHJldk91dFR5cGU6IFNDUklQVF9UWVBFUy5QMldTSCxcbiAgICAgIHdpdG5lc3NTY3JpcHQ6IHJlZGVlbS5vdXRwdXQsXG4gICAgICB3aXRuZXNzU2NyaXB0VHlwZTogZXhwYW5kZWQucHJldk91dFR5cGUsXG4gICAgICBwdWJrZXlzOiBleHBhbmRlZC5wdWJrZXlzLFxuICAgICAgc2lnbmF0dXJlczogZXhwYW5kZWQuc2lnbmF0dXJlcyxcbiAgICB9O1xuICB9XG4gIHJldHVybiB7XG4gICAgcHJldk91dFR5cGU6IFNDUklQVF9UWVBFUy5OT05TVEFOREFSRCxcbiAgICBwcmV2T3V0U2NyaXB0OiBzY3JpcHRTaWcsXG4gIH07XG59XG4vLyBjb3VsZCBiZSBkb25lIGluIGV4cGFuZElucHV0LCBidXQgcmVxdWlyZXMgdGhlIG9yaWdpbmFsIFRyYW5zYWN0aW9uIGZvciBoYXNoRm9yU2lnbmF0dXJlXG5mdW5jdGlvbiBmaXhNdWx0aXNpZ09yZGVyKGlucHV0LCB0cmFuc2FjdGlvbiwgdmluKSB7XG4gIGlmIChpbnB1dC5yZWRlZW1TY3JpcHRUeXBlICE9PSBTQ1JJUFRfVFlQRVMuUDJNUyB8fCAhaW5wdXQucmVkZWVtU2NyaXB0KVxuICAgIHJldHVybjtcbiAgaWYgKGlucHV0LnB1YmtleXMubGVuZ3RoID09PSBpbnB1dC5zaWduYXR1cmVzLmxlbmd0aCkgcmV0dXJuO1xuICBjb25zdCB1bm1hdGNoZWQgPSBpbnB1dC5zaWduYXR1cmVzLmNvbmNhdCgpO1xuICBpbnB1dC5zaWduYXR1cmVzID0gaW5wdXQucHVia2V5cy5tYXAocHViS2V5ID0+IHtcbiAgICBjb25zdCBrZXlQYWlyID0gRUNQYWlyLmZyb21QdWJsaWNLZXkocHViS2V5KTtcbiAgICBsZXQgbWF0Y2g7XG4gICAgLy8gY2hlY2sgZm9yIGEgc2lnbmF0dXJlXG4gICAgdW5tYXRjaGVkLnNvbWUoKHNpZ25hdHVyZSwgaSkgPT4ge1xuICAgICAgLy8gc2tpcCBpZiB1bmRlZmluZWQgfHwgT1BfMFxuICAgICAgaWYgKCFzaWduYXR1cmUpIHJldHVybiBmYWxzZTtcbiAgICAgIC8vIFRPRE86IGF2b2lkIE8obikgaGFzaEZvclNpZ25hdHVyZVxuICAgICAgY29uc3QgcGFyc2VkID0gYnNjcmlwdC5zaWduYXR1cmUuZGVjb2RlKHNpZ25hdHVyZSk7XG4gICAgICBjb25zdCBoYXNoID0gdHJhbnNhY3Rpb24uaGFzaEZvclNpZ25hdHVyZShcbiAgICAgICAgdmluLFxuICAgICAgICBpbnB1dC5yZWRlZW1TY3JpcHQsXG4gICAgICAgIHBhcnNlZC5oYXNoVHlwZSxcbiAgICAgICk7XG4gICAgICAvLyBza2lwIGlmIHNpZ25hdHVyZSBkb2VzIG5vdCBtYXRjaCBwdWJLZXlcbiAgICAgIGlmICgha2V5UGFpci52ZXJpZnkoaGFzaCwgcGFyc2VkLnNpZ25hdHVyZSkpIHJldHVybiBmYWxzZTtcbiAgICAgIC8vIHJlbW92ZSBtYXRjaGVkIHNpZ25hdHVyZSBmcm9tIHVubWF0Y2hlZFxuICAgICAgdW5tYXRjaGVkW2ldID0gdW5kZWZpbmVkO1xuICAgICAgbWF0Y2ggPSBzaWduYXR1cmU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gbWF0Y2g7XG4gIH0pO1xufVxuZnVuY3Rpb24gZXhwYW5kT3V0cHV0KHNjcmlwdCwgb3VyUHViS2V5KSB7XG4gIHR5cGVmb3JjZSh0eXBlcy5CdWZmZXIsIHNjcmlwdCk7XG4gIGNvbnN0IHR5cGUgPSBjbGFzc2lmeS5vdXRwdXQoc2NyaXB0KTtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBTQ1JJUFRfVFlQRVMuUDJQS0g6IHtcbiAgICAgIGlmICghb3VyUHViS2V5KSByZXR1cm4geyB0eXBlIH07XG4gICAgICAvLyBkb2VzIG91ciBoYXNoMTYwKHB1YktleSkgbWF0Y2ggdGhlIG91dHB1dCBzY3JpcHRzP1xuICAgICAgY29uc3QgcGtoMSA9IHBheW1lbnRzLnAycGtoKHsgb3V0cHV0OiBzY3JpcHQgfSkuaGFzaDtcbiAgICAgIGNvbnN0IHBraDIgPSBiY3J5cHRvLmhhc2gxNjAob3VyUHViS2V5KTtcbiAgICAgIGlmICghcGtoMS5lcXVhbHMocGtoMikpIHJldHVybiB7IHR5cGUgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIHB1YmtleXM6IFtvdXJQdWJLZXldLFxuICAgICAgICBzaWduYXR1cmVzOiBbdW5kZWZpbmVkXSxcbiAgICAgIH07XG4gICAgfVxuICAgIGNhc2UgU0NSSVBUX1RZUEVTLlAyV1BLSDoge1xuICAgICAgaWYgKCFvdXJQdWJLZXkpIHJldHVybiB7IHR5cGUgfTtcbiAgICAgIC8vIGRvZXMgb3VyIGhhc2gxNjAocHViS2V5KSBtYXRjaCB0aGUgb3V0cHV0IHNjcmlwdHM/XG4gICAgICBjb25zdCB3cGtoMSA9IHBheW1lbnRzLnAyd3BraCh7IG91dHB1dDogc2NyaXB0IH0pLmhhc2g7XG4gICAgICBjb25zdCB3cGtoMiA9IGJjcnlwdG8uaGFzaDE2MChvdXJQdWJLZXkpO1xuICAgICAgaWYgKCF3cGtoMS5lcXVhbHMod3BraDIpKSByZXR1cm4geyB0eXBlIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlLFxuICAgICAgICBwdWJrZXlzOiBbb3VyUHViS2V5XSxcbiAgICAgICAgc2lnbmF0dXJlczogW3VuZGVmaW5lZF0sXG4gICAgICB9O1xuICAgIH1cbiAgICBjYXNlIFNDUklQVF9UWVBFUy5QMlBLOiB7XG4gICAgICBjb25zdCBwMnBrID0gcGF5bWVudHMucDJwayh7IG91dHB1dDogc2NyaXB0IH0pO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSxcbiAgICAgICAgcHVia2V5czogW3AycGsucHVia2V5XSxcbiAgICAgICAgc2lnbmF0dXJlczogW3VuZGVmaW5lZF0sXG4gICAgICB9O1xuICAgIH1cbiAgICBjYXNlIFNDUklQVF9UWVBFUy5QMk1TOiB7XG4gICAgICBjb25zdCBwMm1zID0gcGF5bWVudHMucDJtcyh7IG91dHB1dDogc2NyaXB0IH0pO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSxcbiAgICAgICAgcHVia2V5czogcDJtcy5wdWJrZXlzLFxuICAgICAgICBzaWduYXR1cmVzOiBwMm1zLnB1YmtleXMubWFwKCgpID0+IHVuZGVmaW5lZCksXG4gICAgICAgIG1heFNpZ25hdHVyZXM6IHAybXMubSxcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIHJldHVybiB7IHR5cGUgfTtcbn1cbmZ1bmN0aW9uIHByZXBhcmVJbnB1dChpbnB1dCwgb3VyUHViS2V5LCByZWRlZW1TY3JpcHQsIHdpdG5lc3NTY3JpcHQpIHtcbiAgaWYgKHJlZGVlbVNjcmlwdCAmJiB3aXRuZXNzU2NyaXB0KSB7XG4gICAgY29uc3QgcDJ3c2ggPSBwYXltZW50cy5wMndzaCh7XG4gICAgICByZWRlZW06IHsgb3V0cHV0OiB3aXRuZXNzU2NyaXB0IH0sXG4gICAgfSk7XG4gICAgY29uc3QgcDJ3c2hBbHQgPSBwYXltZW50cy5wMndzaCh7IG91dHB1dDogcmVkZWVtU2NyaXB0IH0pO1xuICAgIGNvbnN0IHAyc2ggPSBwYXltZW50cy5wMnNoKHsgcmVkZWVtOiB7IG91dHB1dDogcmVkZWVtU2NyaXB0IH0gfSk7XG4gICAgY29uc3QgcDJzaEFsdCA9IHBheW1lbnRzLnAyc2goeyByZWRlZW06IHAyd3NoIH0pO1xuICAgIC8vIGVuZm9yY2VzIFAyU0goUDJXU0goLi4uKSlcbiAgICBpZiAoIXAyd3NoLmhhc2guZXF1YWxzKHAyd3NoQWx0Lmhhc2gpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXaXRuZXNzIHNjcmlwdCBpbmNvbnNpc3RlbnQgd2l0aCBwcmV2T3V0U2NyaXB0Jyk7XG4gICAgaWYgKCFwMnNoLmhhc2guZXF1YWxzKHAyc2hBbHQuaGFzaCkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZGVlbSBzY3JpcHQgaW5jb25zaXN0ZW50IHdpdGggcHJldk91dFNjcmlwdCcpO1xuICAgIGNvbnN0IGV4cGFuZGVkID0gZXhwYW5kT3V0cHV0KHAyd3NoLnJlZGVlbS5vdXRwdXQsIG91clB1YktleSk7XG4gICAgaWYgKCFleHBhbmRlZC5wdWJrZXlzKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBleHBhbmRlZC50eXBlICtcbiAgICAgICAgICAnIG5vdCBzdXBwb3J0ZWQgYXMgd2l0bmVzc1NjcmlwdCAoJyArXG4gICAgICAgICAgYnNjcmlwdC50b0FTTSh3aXRuZXNzU2NyaXB0KSArXG4gICAgICAgICAgJyknLFxuICAgICAgKTtcbiAgICBpZiAoaW5wdXQuc2lnbmF0dXJlcyAmJiBpbnB1dC5zaWduYXR1cmVzLnNvbWUoeCA9PiB4ICE9PSB1bmRlZmluZWQpKSB7XG4gICAgICBleHBhbmRlZC5zaWduYXR1cmVzID0gaW5wdXQuc2lnbmF0dXJlcztcbiAgICB9XG4gICAgY29uc3Qgc2lnblNjcmlwdCA9IHdpdG5lc3NTY3JpcHQ7XG4gICAgaWYgKGV4cGFuZGVkLnR5cGUgPT09IFNDUklQVF9UWVBFUy5QMldQS0gpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1AyU0goUDJXU0goUDJXUEtIKSkgaXMgYSBjb25zZW5zdXMgZmFpbHVyZScpO1xuICAgIHJldHVybiB7XG4gICAgICByZWRlZW1TY3JpcHQsXG4gICAgICByZWRlZW1TY3JpcHRUeXBlOiBTQ1JJUFRfVFlQRVMuUDJXU0gsXG4gICAgICB3aXRuZXNzU2NyaXB0LFxuICAgICAgd2l0bmVzc1NjcmlwdFR5cGU6IGV4cGFuZGVkLnR5cGUsXG4gICAgICBwcmV2T3V0VHlwZTogU0NSSVBUX1RZUEVTLlAyU0gsXG4gICAgICBwcmV2T3V0U2NyaXB0OiBwMnNoLm91dHB1dCxcbiAgICAgIGhhc1dpdG5lc3M6IHRydWUsXG4gICAgICBzaWduU2NyaXB0LFxuICAgICAgc2lnblR5cGU6IGV4cGFuZGVkLnR5cGUsXG4gICAgICBwdWJrZXlzOiBleHBhbmRlZC5wdWJrZXlzLFxuICAgICAgc2lnbmF0dXJlczogZXhwYW5kZWQuc2lnbmF0dXJlcyxcbiAgICAgIG1heFNpZ25hdHVyZXM6IGV4cGFuZGVkLm1heFNpZ25hdHVyZXMsXG4gICAgfTtcbiAgfVxuICBpZiAocmVkZWVtU2NyaXB0KSB7XG4gICAgY29uc3QgcDJzaCA9IHBheW1lbnRzLnAyc2goeyByZWRlZW06IHsgb3V0cHV0OiByZWRlZW1TY3JpcHQgfSB9KTtcbiAgICBpZiAoaW5wdXQucHJldk91dFNjcmlwdCkge1xuICAgICAgbGV0IHAyc2hBbHQ7XG4gICAgICB0cnkge1xuICAgICAgICBwMnNoQWx0ID0gcGF5bWVudHMucDJzaCh7IG91dHB1dDogaW5wdXQucHJldk91dFNjcmlwdCB9KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcmV2T3V0U2NyaXB0IG11c3QgYmUgUDJTSCcpO1xuICAgICAgfVxuICAgICAgaWYgKCFwMnNoLmhhc2guZXF1YWxzKHAyc2hBbHQuaGFzaCkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUmVkZWVtIHNjcmlwdCBpbmNvbnNpc3RlbnQgd2l0aCBwcmV2T3V0U2NyaXB0Jyk7XG4gICAgfVxuICAgIGNvbnN0IGV4cGFuZGVkID0gZXhwYW5kT3V0cHV0KHAyc2gucmVkZWVtLm91dHB1dCwgb3VyUHViS2V5KTtcbiAgICBpZiAoIWV4cGFuZGVkLnB1YmtleXMpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGV4cGFuZGVkLnR5cGUgK1xuICAgICAgICAgICcgbm90IHN1cHBvcnRlZCBhcyByZWRlZW1TY3JpcHQgKCcgK1xuICAgICAgICAgIGJzY3JpcHQudG9BU00ocmVkZWVtU2NyaXB0KSArXG4gICAgICAgICAgJyknLFxuICAgICAgKTtcbiAgICBpZiAoaW5wdXQuc2lnbmF0dXJlcyAmJiBpbnB1dC5zaWduYXR1cmVzLnNvbWUoeCA9PiB4ICE9PSB1bmRlZmluZWQpKSB7XG4gICAgICBleHBhbmRlZC5zaWduYXR1cmVzID0gaW5wdXQuc2lnbmF0dXJlcztcbiAgICB9XG4gICAgbGV0IHNpZ25TY3JpcHQgPSByZWRlZW1TY3JpcHQ7XG4gICAgaWYgKGV4cGFuZGVkLnR5cGUgPT09IFNDUklQVF9UWVBFUy5QMldQS0gpIHtcbiAgICAgIHNpZ25TY3JpcHQgPSBwYXltZW50cy5wMnBraCh7IHB1YmtleTogZXhwYW5kZWQucHVia2V5c1swXSB9KS5vdXRwdXQ7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICByZWRlZW1TY3JpcHQsXG4gICAgICByZWRlZW1TY3JpcHRUeXBlOiBleHBhbmRlZC50eXBlLFxuICAgICAgcHJldk91dFR5cGU6IFNDUklQVF9UWVBFUy5QMlNILFxuICAgICAgcHJldk91dFNjcmlwdDogcDJzaC5vdXRwdXQsXG4gICAgICBoYXNXaXRuZXNzOiBleHBhbmRlZC50eXBlID09PSBTQ1JJUFRfVFlQRVMuUDJXUEtILFxuICAgICAgc2lnblNjcmlwdCxcbiAgICAgIHNpZ25UeXBlOiBleHBhbmRlZC50eXBlLFxuICAgICAgcHVia2V5czogZXhwYW5kZWQucHVia2V5cyxcbiAgICAgIHNpZ25hdHVyZXM6IGV4cGFuZGVkLnNpZ25hdHVyZXMsXG4gICAgICBtYXhTaWduYXR1cmVzOiBleHBhbmRlZC5tYXhTaWduYXR1cmVzLFxuICAgIH07XG4gIH1cbiAgaWYgKHdpdG5lc3NTY3JpcHQpIHtcbiAgICBjb25zdCBwMndzaCA9IHBheW1lbnRzLnAyd3NoKHsgcmVkZWVtOiB7IG91dHB1dDogd2l0bmVzc1NjcmlwdCB9IH0pO1xuICAgIGlmIChpbnB1dC5wcmV2T3V0U2NyaXB0KSB7XG4gICAgICBjb25zdCBwMndzaEFsdCA9IHBheW1lbnRzLnAyd3NoKHsgb3V0cHV0OiBpbnB1dC5wcmV2T3V0U2NyaXB0IH0pO1xuICAgICAgaWYgKCFwMndzaC5oYXNoLmVxdWFscyhwMndzaEFsdC5oYXNoKSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXaXRuZXNzIHNjcmlwdCBpbmNvbnNpc3RlbnQgd2l0aCBwcmV2T3V0U2NyaXB0Jyk7XG4gICAgfVxuICAgIGNvbnN0IGV4cGFuZGVkID0gZXhwYW5kT3V0cHV0KHAyd3NoLnJlZGVlbS5vdXRwdXQsIG91clB1YktleSk7XG4gICAgaWYgKCFleHBhbmRlZC5wdWJrZXlzKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBleHBhbmRlZC50eXBlICtcbiAgICAgICAgICAnIG5vdCBzdXBwb3J0ZWQgYXMgd2l0bmVzc1NjcmlwdCAoJyArXG4gICAgICAgICAgYnNjcmlwdC50b0FTTSh3aXRuZXNzU2NyaXB0KSArXG4gICAgICAgICAgJyknLFxuICAgICAgKTtcbiAgICBpZiAoaW5wdXQuc2lnbmF0dXJlcyAmJiBpbnB1dC5zaWduYXR1cmVzLnNvbWUoeCA9PiB4ICE9PSB1bmRlZmluZWQpKSB7XG4gICAgICBleHBhbmRlZC5zaWduYXR1cmVzID0gaW5wdXQuc2lnbmF0dXJlcztcbiAgICB9XG4gICAgY29uc3Qgc2lnblNjcmlwdCA9IHdpdG5lc3NTY3JpcHQ7XG4gICAgaWYgKGV4cGFuZGVkLnR5cGUgPT09IFNDUklQVF9UWVBFUy5QMldQS0gpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1AyV1NIKFAyV1BLSCkgaXMgYSBjb25zZW5zdXMgZmFpbHVyZScpO1xuICAgIHJldHVybiB7XG4gICAgICB3aXRuZXNzU2NyaXB0LFxuICAgICAgd2l0bmVzc1NjcmlwdFR5cGU6IGV4cGFuZGVkLnR5cGUsXG4gICAgICBwcmV2T3V0VHlwZTogU0NSSVBUX1RZUEVTLlAyV1NILFxuICAgICAgcHJldk91dFNjcmlwdDogcDJ3c2gub3V0cHV0LFxuICAgICAgaGFzV2l0bmVzczogdHJ1ZSxcbiAgICAgIHNpZ25TY3JpcHQsXG4gICAgICBzaWduVHlwZTogZXhwYW5kZWQudHlwZSxcbiAgICAgIHB1YmtleXM6IGV4cGFuZGVkLnB1YmtleXMsXG4gICAgICBzaWduYXR1cmVzOiBleHBhbmRlZC5zaWduYXR1cmVzLFxuICAgICAgbWF4U2lnbmF0dXJlczogZXhwYW5kZWQubWF4U2lnbmF0dXJlcyxcbiAgICB9O1xuICB9XG4gIGlmIChpbnB1dC5wcmV2T3V0VHlwZSAmJiBpbnB1dC5wcmV2T3V0U2NyaXB0KSB7XG4gICAgLy8gZW1iZWRkZWQgc2NyaXB0cyBhcmUgbm90IHBvc3NpYmxlIHdpdGhvdXQgZXh0cmEgaW5mb3JtYXRpb25cbiAgICBpZiAoaW5wdXQucHJldk91dFR5cGUgPT09IFNDUklQVF9UWVBFUy5QMlNIKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnUHJldk91dFNjcmlwdCBpcyAnICsgaW5wdXQucHJldk91dFR5cGUgKyAnLCByZXF1aXJlcyByZWRlZW1TY3JpcHQnLFxuICAgICAgKTtcbiAgICBpZiAoaW5wdXQucHJldk91dFR5cGUgPT09IFNDUklQVF9UWVBFUy5QMldTSClcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1ByZXZPdXRTY3JpcHQgaXMgJyArIGlucHV0LnByZXZPdXRUeXBlICsgJywgcmVxdWlyZXMgd2l0bmVzc1NjcmlwdCcsXG4gICAgICApO1xuICAgIGlmICghaW5wdXQucHJldk91dFNjcmlwdCkgdGhyb3cgbmV3IEVycm9yKCdQcmV2T3V0U2NyaXB0IGlzIG1pc3NpbmcnKTtcbiAgICBjb25zdCBleHBhbmRlZCA9IGV4cGFuZE91dHB1dChpbnB1dC5wcmV2T3V0U2NyaXB0LCBvdXJQdWJLZXkpO1xuICAgIGlmICghZXhwYW5kZWQucHVia2V5cylcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgZXhwYW5kZWQudHlwZSArXG4gICAgICAgICAgJyBub3Qgc3VwcG9ydGVkICgnICtcbiAgICAgICAgICBic2NyaXB0LnRvQVNNKGlucHV0LnByZXZPdXRTY3JpcHQpICtcbiAgICAgICAgICAnKScsXG4gICAgICApO1xuICAgIGlmIChpbnB1dC5zaWduYXR1cmVzICYmIGlucHV0LnNpZ25hdHVyZXMuc29tZSh4ID0+IHggIT09IHVuZGVmaW5lZCkpIHtcbiAgICAgIGV4cGFuZGVkLnNpZ25hdHVyZXMgPSBpbnB1dC5zaWduYXR1cmVzO1xuICAgIH1cbiAgICBsZXQgc2lnblNjcmlwdCA9IGlucHV0LnByZXZPdXRTY3JpcHQ7XG4gICAgaWYgKGV4cGFuZGVkLnR5cGUgPT09IFNDUklQVF9UWVBFUy5QMldQS0gpIHtcbiAgICAgIHNpZ25TY3JpcHQgPSBwYXltZW50cy5wMnBraCh7IHB1YmtleTogZXhwYW5kZWQucHVia2V5c1swXSB9KS5vdXRwdXQ7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBwcmV2T3V0VHlwZTogZXhwYW5kZWQudHlwZSxcbiAgICAgIHByZXZPdXRTY3JpcHQ6IGlucHV0LnByZXZPdXRTY3JpcHQsXG4gICAgICBoYXNXaXRuZXNzOiBleHBhbmRlZC50eXBlID09PSBTQ1JJUFRfVFlQRVMuUDJXUEtILFxuICAgICAgc2lnblNjcmlwdCxcbiAgICAgIHNpZ25UeXBlOiBleHBhbmRlZC50eXBlLFxuICAgICAgcHVia2V5czogZXhwYW5kZWQucHVia2V5cyxcbiAgICAgIHNpZ25hdHVyZXM6IGV4cGFuZGVkLnNpZ25hdHVyZXMsXG4gICAgICBtYXhTaWduYXR1cmVzOiBleHBhbmRlZC5tYXhTaWduYXR1cmVzLFxuICAgIH07XG4gIH1cbiAgY29uc3QgcHJldk91dFNjcmlwdCA9IHBheW1lbnRzLnAycGtoKHsgcHVia2V5OiBvdXJQdWJLZXkgfSkub3V0cHV0O1xuICByZXR1cm4ge1xuICAgIHByZXZPdXRUeXBlOiBTQ1JJUFRfVFlQRVMuUDJQS0gsXG4gICAgcHJldk91dFNjcmlwdCxcbiAgICBoYXNXaXRuZXNzOiBmYWxzZSxcbiAgICBzaWduU2NyaXB0OiBwcmV2T3V0U2NyaXB0LFxuICAgIHNpZ25UeXBlOiBTQ1JJUFRfVFlQRVMuUDJQS0gsXG4gICAgcHVia2V5czogW291clB1YktleV0sXG4gICAgc2lnbmF0dXJlczogW3VuZGVmaW5lZF0sXG4gIH07XG59XG5mdW5jdGlvbiBidWlsZCh0eXBlLCBpbnB1dCwgYWxsb3dJbmNvbXBsZXRlKSB7XG4gIGNvbnN0IHB1YmtleXMgPSBpbnB1dC5wdWJrZXlzIHx8IFtdO1xuICBsZXQgc2lnbmF0dXJlcyA9IGlucHV0LnNpZ25hdHVyZXMgfHwgW107XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgU0NSSVBUX1RZUEVTLlAyUEtIOiB7XG4gICAgICBpZiAocHVia2V5cy5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgaWYgKHNpZ25hdHVyZXMubGVuZ3RoID09PSAwKSBicmVhaztcbiAgICAgIHJldHVybiBwYXltZW50cy5wMnBraCh7IHB1YmtleTogcHVia2V5c1swXSwgc2lnbmF0dXJlOiBzaWduYXR1cmVzWzBdIH0pO1xuICAgIH1cbiAgICBjYXNlIFNDUklQVF9UWVBFUy5QMldQS0g6IHtcbiAgICAgIGlmIChwdWJrZXlzLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG4gICAgICBpZiAoc2lnbmF0dXJlcy5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgcmV0dXJuIHBheW1lbnRzLnAyd3BraCh7IHB1YmtleTogcHVia2V5c1swXSwgc2lnbmF0dXJlOiBzaWduYXR1cmVzWzBdIH0pO1xuICAgIH1cbiAgICBjYXNlIFNDUklQVF9UWVBFUy5QMlBLOiB7XG4gICAgICBpZiAocHVia2V5cy5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgaWYgKHNpZ25hdHVyZXMubGVuZ3RoID09PSAwKSBicmVhaztcbiAgICAgIHJldHVybiBwYXltZW50cy5wMnBrKHsgc2lnbmF0dXJlOiBzaWduYXR1cmVzWzBdIH0pO1xuICAgIH1cbiAgICBjYXNlIFNDUklQVF9UWVBFUy5QMk1TOiB7XG4gICAgICBjb25zdCBtID0gaW5wdXQubWF4U2lnbmF0dXJlcztcbiAgICAgIGlmIChhbGxvd0luY29tcGxldGUpIHtcbiAgICAgICAgc2lnbmF0dXJlcyA9IHNpZ25hdHVyZXMubWFwKHggPT4geCB8fCBzY3JpcHRfMS5PUFMuT1BfMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaWduYXR1cmVzID0gc2lnbmF0dXJlcy5maWx0ZXIoeCA9PiB4KTtcbiAgICAgIH1cbiAgICAgIC8vIGlmIHRoZSB0cmFuc2FjdGlvbiBpcyBub3Qgbm90IGNvbXBsZXRlIChjb21wbGV0ZSksIG9yIGlmIHNpZ25hdHVyZXMubGVuZ3RoID09PSBtLCB2YWxpZGF0ZVxuICAgICAgLy8gb3RoZXJ3aXNlLCB0aGUgbnVtYmVyIG9mIE9QXzAncyBtYXkgYmUgPj0gbSwgc28gZG9uJ3QgdmFsaWRhdGUgKGJvbylcbiAgICAgIGNvbnN0IHZhbGlkYXRlID0gIWFsbG93SW5jb21wbGV0ZSB8fCBtID09PSBzaWduYXR1cmVzLmxlbmd0aDtcbiAgICAgIHJldHVybiBwYXltZW50cy5wMm1zKFxuICAgICAgICB7IG0sIHB1YmtleXMsIHNpZ25hdHVyZXMgfSxcbiAgICAgICAgeyBhbGxvd0luY29tcGxldGUsIHZhbGlkYXRlIH0sXG4gICAgICApO1xuICAgIH1cbiAgICBjYXNlIFNDUklQVF9UWVBFUy5QMlNIOiB7XG4gICAgICBjb25zdCByZWRlZW0gPSBidWlsZChpbnB1dC5yZWRlZW1TY3JpcHRUeXBlLCBpbnB1dCwgYWxsb3dJbmNvbXBsZXRlKTtcbiAgICAgIGlmICghcmVkZWVtKSByZXR1cm47XG4gICAgICByZXR1cm4gcGF5bWVudHMucDJzaCh7XG4gICAgICAgIHJlZGVlbToge1xuICAgICAgICAgIG91dHB1dDogcmVkZWVtLm91dHB1dCB8fCBpbnB1dC5yZWRlZW1TY3JpcHQsXG4gICAgICAgICAgaW5wdXQ6IHJlZGVlbS5pbnB1dCxcbiAgICAgICAgICB3aXRuZXNzOiByZWRlZW0ud2l0bmVzcyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjYXNlIFNDUklQVF9UWVBFUy5QMldTSDoge1xuICAgICAgY29uc3QgcmVkZWVtID0gYnVpbGQoaW5wdXQud2l0bmVzc1NjcmlwdFR5cGUsIGlucHV0LCBhbGxvd0luY29tcGxldGUpO1xuICAgICAgaWYgKCFyZWRlZW0pIHJldHVybjtcbiAgICAgIHJldHVybiBwYXltZW50cy5wMndzaCh7XG4gICAgICAgIHJlZGVlbToge1xuICAgICAgICAgIG91dHB1dDogaW5wdXQud2l0bmVzc1NjcmlwdCxcbiAgICAgICAgICBpbnB1dDogcmVkZWVtLmlucHV0LFxuICAgICAgICAgIHdpdG5lc3M6IHJlZGVlbS53aXRuZXNzLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiBjYW5TaWduKGlucHV0KSB7XG4gIHJldHVybiAoXG4gICAgaW5wdXQuc2lnblNjcmlwdCAhPT0gdW5kZWZpbmVkICYmXG4gICAgaW5wdXQuc2lnblR5cGUgIT09IHVuZGVmaW5lZCAmJlxuICAgIGlucHV0LnB1YmtleXMgIT09IHVuZGVmaW5lZCAmJlxuICAgIGlucHV0LnNpZ25hdHVyZXMgIT09IHVuZGVmaW5lZCAmJlxuICAgIGlucHV0LnNpZ25hdHVyZXMubGVuZ3RoID09PSBpbnB1dC5wdWJrZXlzLmxlbmd0aCAmJlxuICAgIGlucHV0LnB1YmtleXMubGVuZ3RoID4gMCAmJlxuICAgIChpbnB1dC5oYXNXaXRuZXNzID09PSBmYWxzZSB8fCBpbnB1dC52YWx1ZSAhPT0gdW5kZWZpbmVkKVxuICApO1xufVxuZnVuY3Rpb24gc2lnbmF0dXJlSGFzaFR5cGUoYnVmZmVyKSB7XG4gIHJldHVybiBidWZmZXIucmVhZFVJbnQ4KGJ1ZmZlci5sZW5ndGggLSAxKTtcbn1cbmZ1bmN0aW9uIGNoZWNrU2lnbkFyZ3MoaW5wdXRzLCBzaWduUGFyYW1zKSB7XG4gIGlmICghUFJFVk9VVF9UWVBFUy5oYXMoc2lnblBhcmFtcy5wcmV2T3V0U2NyaXB0VHlwZSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgYFVua25vd24gcHJldk91dFNjcmlwdFR5cGUgXCIke3NpZ25QYXJhbXMucHJldk91dFNjcmlwdFR5cGV9XCJgLFxuICAgICk7XG4gIH1cbiAgdGZNZXNzYWdlKFxuICAgIHR5cGVmb3JjZS5OdW1iZXIsXG4gICAgc2lnblBhcmFtcy52aW4sXG4gICAgYHNpZ24gbXVzdCBpbmNsdWRlIHZpbiBwYXJhbWV0ZXIgYXMgTnVtYmVyIChpbnB1dCBpbmRleClgLFxuICApO1xuICB0Zk1lc3NhZ2UoXG4gICAgdHlwZXMuU2lnbmVyLFxuICAgIHNpZ25QYXJhbXMua2V5UGFpcixcbiAgICBgc2lnbiBtdXN0IGluY2x1ZGUga2V5UGFpciBwYXJhbWV0ZXIgYXMgU2lnbmVyIGludGVyZmFjZWAsXG4gICk7XG4gIHRmTWVzc2FnZShcbiAgICB0eXBlZm9yY2UubWF5YmUodHlwZWZvcmNlLk51bWJlciksXG4gICAgc2lnblBhcmFtcy5oYXNoVHlwZSxcbiAgICBgc2lnbiBoYXNoVHlwZSBwYXJhbWV0ZXIgbXVzdCBiZSBhIG51bWJlcmAsXG4gICk7XG4gIGNvbnN0IHByZXZPdXRUeXBlID0gKGlucHV0c1tzaWduUGFyYW1zLnZpbl0gfHwgW10pLnByZXZPdXRUeXBlO1xuICBjb25zdCBwb3NUeXBlID0gc2lnblBhcmFtcy5wcmV2T3V0U2NyaXB0VHlwZTtcbiAgc3dpdGNoIChwb3NUeXBlKSB7XG4gICAgY2FzZSAncDJwa2gnOlxuICAgICAgaWYgKHByZXZPdXRUeXBlICYmIHByZXZPdXRUeXBlICE9PSAncHVia2V5aGFzaCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBgaW5wdXQgIyR7c2lnblBhcmFtcy52aW59IGlzIG5vdCBvZiB0eXBlIHAycGtoOiAke3ByZXZPdXRUeXBlfWAsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICB0Zk1lc3NhZ2UoXG4gICAgICAgIHR5cGVmb3JjZS52YWx1ZSh1bmRlZmluZWQpLFxuICAgICAgICBzaWduUGFyYW1zLndpdG5lc3NTY3JpcHQsXG4gICAgICAgIGAke3Bvc1R5cGV9IHJlcXVpcmVzIE5PIHdpdG5lc3NTY3JpcHRgLFxuICAgICAgKTtcbiAgICAgIHRmTWVzc2FnZShcbiAgICAgICAgdHlwZWZvcmNlLnZhbHVlKHVuZGVmaW5lZCksXG4gICAgICAgIHNpZ25QYXJhbXMucmVkZWVtU2NyaXB0LFxuICAgICAgICBgJHtwb3NUeXBlfSByZXF1aXJlcyBOTyByZWRlZW1TY3JpcHRgLFxuICAgICAgKTtcbiAgICAgIHRmTWVzc2FnZShcbiAgICAgICAgdHlwZWZvcmNlLnZhbHVlKHVuZGVmaW5lZCksXG4gICAgICAgIHNpZ25QYXJhbXMud2l0bmVzc1ZhbHVlLFxuICAgICAgICBgJHtwb3NUeXBlfSByZXF1aXJlcyBOTyB3aXRuZXNzVmFsdWVgLFxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3AycGsnOlxuICAgICAgaWYgKHByZXZPdXRUeXBlICYmIHByZXZPdXRUeXBlICE9PSAncHVia2V5Jykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIGBpbnB1dCAjJHtzaWduUGFyYW1zLnZpbn0gaXMgbm90IG9mIHR5cGUgcDJwazogJHtwcmV2T3V0VHlwZX1gLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgdGZNZXNzYWdlKFxuICAgICAgICB0eXBlZm9yY2UudmFsdWUodW5kZWZpbmVkKSxcbiAgICAgICAgc2lnblBhcmFtcy53aXRuZXNzU2NyaXB0LFxuICAgICAgICBgJHtwb3NUeXBlfSByZXF1aXJlcyBOTyB3aXRuZXNzU2NyaXB0YCxcbiAgICAgICk7XG4gICAgICB0Zk1lc3NhZ2UoXG4gICAgICAgIHR5cGVmb3JjZS52YWx1ZSh1bmRlZmluZWQpLFxuICAgICAgICBzaWduUGFyYW1zLnJlZGVlbVNjcmlwdCxcbiAgICAgICAgYCR7cG9zVHlwZX0gcmVxdWlyZXMgTk8gcmVkZWVtU2NyaXB0YCxcbiAgICAgICk7XG4gICAgICB0Zk1lc3NhZ2UoXG4gICAgICAgIHR5cGVmb3JjZS52YWx1ZSh1bmRlZmluZWQpLFxuICAgICAgICBzaWduUGFyYW1zLndpdG5lc3NWYWx1ZSxcbiAgICAgICAgYCR7cG9zVHlwZX0gcmVxdWlyZXMgTk8gd2l0bmVzc1ZhbHVlYCxcbiAgICAgICk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdwMndwa2gnOlxuICAgICAgaWYgKHByZXZPdXRUeXBlICYmIHByZXZPdXRUeXBlICE9PSAnd2l0bmVzc3B1YmtleWhhc2gnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgYGlucHV0ICMke3NpZ25QYXJhbXMudmlufSBpcyBub3Qgb2YgdHlwZSBwMndwa2g6ICR7cHJldk91dFR5cGV9YCxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHRmTWVzc2FnZShcbiAgICAgICAgdHlwZWZvcmNlLnZhbHVlKHVuZGVmaW5lZCksXG4gICAgICAgIHNpZ25QYXJhbXMud2l0bmVzc1NjcmlwdCxcbiAgICAgICAgYCR7cG9zVHlwZX0gcmVxdWlyZXMgTk8gd2l0bmVzc1NjcmlwdGAsXG4gICAgICApO1xuICAgICAgdGZNZXNzYWdlKFxuICAgICAgICB0eXBlZm9yY2UudmFsdWUodW5kZWZpbmVkKSxcbiAgICAgICAgc2lnblBhcmFtcy5yZWRlZW1TY3JpcHQsXG4gICAgICAgIGAke3Bvc1R5cGV9IHJlcXVpcmVzIE5PIHJlZGVlbVNjcmlwdGAsXG4gICAgICApO1xuICAgICAgdGZNZXNzYWdlKFxuICAgICAgICB0eXBlcy5TYXRvc2hpLFxuICAgICAgICBzaWduUGFyYW1zLndpdG5lc3NWYWx1ZSxcbiAgICAgICAgYCR7cG9zVHlwZX0gcmVxdWlyZXMgd2l0bmVzc1ZhbHVlYCxcbiAgICAgICk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdwMm1zJzpcbiAgICAgIGlmIChwcmV2T3V0VHlwZSAmJiBwcmV2T3V0VHlwZSAhPT0gJ211bHRpc2lnJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIGBpbnB1dCAjJHtzaWduUGFyYW1zLnZpbn0gaXMgbm90IG9mIHR5cGUgcDJtczogJHtwcmV2T3V0VHlwZX1gLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgdGZNZXNzYWdlKFxuICAgICAgICB0eXBlZm9yY2UudmFsdWUodW5kZWZpbmVkKSxcbiAgICAgICAgc2lnblBhcmFtcy53aXRuZXNzU2NyaXB0LFxuICAgICAgICBgJHtwb3NUeXBlfSByZXF1aXJlcyBOTyB3aXRuZXNzU2NyaXB0YCxcbiAgICAgICk7XG4gICAgICB0Zk1lc3NhZ2UoXG4gICAgICAgIHR5cGVmb3JjZS52YWx1ZSh1bmRlZmluZWQpLFxuICAgICAgICBzaWduUGFyYW1zLnJlZGVlbVNjcmlwdCxcbiAgICAgICAgYCR7cG9zVHlwZX0gcmVxdWlyZXMgTk8gcmVkZWVtU2NyaXB0YCxcbiAgICAgICk7XG4gICAgICB0Zk1lc3NhZ2UoXG4gICAgICAgIHR5cGVmb3JjZS52YWx1ZSh1bmRlZmluZWQpLFxuICAgICAgICBzaWduUGFyYW1zLndpdG5lc3NWYWx1ZSxcbiAgICAgICAgYCR7cG9zVHlwZX0gcmVxdWlyZXMgTk8gd2l0bmVzc1ZhbHVlYCxcbiAgICAgICk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdwMnNoLXAyd3BraCc6XG4gICAgICBpZiAocHJldk91dFR5cGUgJiYgcHJldk91dFR5cGUgIT09ICdzY3JpcHRoYXNoJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIGBpbnB1dCAjJHtzaWduUGFyYW1zLnZpbn0gaXMgbm90IG9mIHR5cGUgcDJzaC1wMndwa2g6ICR7cHJldk91dFR5cGV9YCxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHRmTWVzc2FnZShcbiAgICAgICAgdHlwZWZvcmNlLnZhbHVlKHVuZGVmaW5lZCksXG4gICAgICAgIHNpZ25QYXJhbXMud2l0bmVzc1NjcmlwdCxcbiAgICAgICAgYCR7cG9zVHlwZX0gcmVxdWlyZXMgTk8gd2l0bmVzc1NjcmlwdGAsXG4gICAgICApO1xuICAgICAgdGZNZXNzYWdlKFxuICAgICAgICB0eXBlZm9yY2UuQnVmZmVyLFxuICAgICAgICBzaWduUGFyYW1zLnJlZGVlbVNjcmlwdCxcbiAgICAgICAgYCR7cG9zVHlwZX0gcmVxdWlyZXMgcmVkZWVtU2NyaXB0YCxcbiAgICAgICk7XG4gICAgICB0Zk1lc3NhZ2UoXG4gICAgICAgIHR5cGVzLlNhdG9zaGksXG4gICAgICAgIHNpZ25QYXJhbXMud2l0bmVzc1ZhbHVlLFxuICAgICAgICBgJHtwb3NUeXBlfSByZXF1aXJlcyB3aXRuZXNzVmFsdWVgLFxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3Ayc2gtcDJtcyc6XG4gICAgY2FzZSAncDJzaC1wMnBrJzpcbiAgICBjYXNlICdwMnNoLXAycGtoJzpcbiAgICAgIGlmIChwcmV2T3V0VHlwZSAmJiBwcmV2T3V0VHlwZSAhPT0gJ3NjcmlwdGhhc2gnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgYGlucHV0ICMke3NpZ25QYXJhbXMudmlufSBpcyBub3Qgb2YgdHlwZSAke3Bvc1R5cGV9OiAke3ByZXZPdXRUeXBlfWAsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICB0Zk1lc3NhZ2UoXG4gICAgICAgIHR5cGVmb3JjZS52YWx1ZSh1bmRlZmluZWQpLFxuICAgICAgICBzaWduUGFyYW1zLndpdG5lc3NTY3JpcHQsXG4gICAgICAgIGAke3Bvc1R5cGV9IHJlcXVpcmVzIE5PIHdpdG5lc3NTY3JpcHRgLFxuICAgICAgKTtcbiAgICAgIHRmTWVzc2FnZShcbiAgICAgICAgdHlwZWZvcmNlLkJ1ZmZlcixcbiAgICAgICAgc2lnblBhcmFtcy5yZWRlZW1TY3JpcHQsXG4gICAgICAgIGAke3Bvc1R5cGV9IHJlcXVpcmVzIHJlZGVlbVNjcmlwdGAsXG4gICAgICApO1xuICAgICAgdGZNZXNzYWdlKFxuICAgICAgICB0eXBlZm9yY2UudmFsdWUodW5kZWZpbmVkKSxcbiAgICAgICAgc2lnblBhcmFtcy53aXRuZXNzVmFsdWUsXG4gICAgICAgIGAke3Bvc1R5cGV9IHJlcXVpcmVzIE5PIHdpdG5lc3NWYWx1ZWAsXG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncDJ3c2gtcDJtcyc6XG4gICAgY2FzZSAncDJ3c2gtcDJwayc6XG4gICAgY2FzZSAncDJ3c2gtcDJwa2gnOlxuICAgICAgaWYgKHByZXZPdXRUeXBlICYmIHByZXZPdXRUeXBlICE9PSAnd2l0bmVzc3NjcmlwdGhhc2gnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgYGlucHV0ICMke3NpZ25QYXJhbXMudmlufSBpcyBub3Qgb2YgdHlwZSAke3Bvc1R5cGV9OiAke3ByZXZPdXRUeXBlfWAsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICB0Zk1lc3NhZ2UoXG4gICAgICAgIHR5cGVmb3JjZS5CdWZmZXIsXG4gICAgICAgIHNpZ25QYXJhbXMud2l0bmVzc1NjcmlwdCxcbiAgICAgICAgYCR7cG9zVHlwZX0gcmVxdWlyZXMgd2l0bmVzc1NjcmlwdGAsXG4gICAgICApO1xuICAgICAgdGZNZXNzYWdlKFxuICAgICAgICB0eXBlZm9yY2UudmFsdWUodW5kZWZpbmVkKSxcbiAgICAgICAgc2lnblBhcmFtcy5yZWRlZW1TY3JpcHQsXG4gICAgICAgIGAke3Bvc1R5cGV9IHJlcXVpcmVzIE5PIHJlZGVlbVNjcmlwdGAsXG4gICAgICApO1xuICAgICAgdGZNZXNzYWdlKFxuICAgICAgICB0eXBlcy5TYXRvc2hpLFxuICAgICAgICBzaWduUGFyYW1zLndpdG5lc3NWYWx1ZSxcbiAgICAgICAgYCR7cG9zVHlwZX0gcmVxdWlyZXMgd2l0bmVzc1ZhbHVlYCxcbiAgICAgICk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdwMnNoLXAyd3NoLXAybXMnOlxuICAgIGNhc2UgJ3Ayc2gtcDJ3c2gtcDJwayc6XG4gICAgY2FzZSAncDJzaC1wMndzaC1wMnBraCc6XG4gICAgICBpZiAocHJldk91dFR5cGUgJiYgcHJldk91dFR5cGUgIT09ICdzY3JpcHRoYXNoJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIGBpbnB1dCAjJHtzaWduUGFyYW1zLnZpbn0gaXMgbm90IG9mIHR5cGUgJHtwb3NUeXBlfTogJHtwcmV2T3V0VHlwZX1gLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgdGZNZXNzYWdlKFxuICAgICAgICB0eXBlZm9yY2UuQnVmZmVyLFxuICAgICAgICBzaWduUGFyYW1zLndpdG5lc3NTY3JpcHQsXG4gICAgICAgIGAke3Bvc1R5cGV9IHJlcXVpcmVzIHdpdG5lc3NTY3JpcHRgLFxuICAgICAgKTtcbiAgICAgIHRmTWVzc2FnZShcbiAgICAgICAgdHlwZWZvcmNlLkJ1ZmZlcixcbiAgICAgICAgc2lnblBhcmFtcy5yZWRlZW1TY3JpcHQsXG4gICAgICAgIGAke3Bvc1R5cGV9IHJlcXVpcmVzIHdpdG5lc3NTY3JpcHRgLFxuICAgICAgKTtcbiAgICAgIHRmTWVzc2FnZShcbiAgICAgICAgdHlwZXMuU2F0b3NoaSxcbiAgICAgICAgc2lnblBhcmFtcy53aXRuZXNzVmFsdWUsXG4gICAgICAgIGAke3Bvc1R5cGV9IHJlcXVpcmVzIHdpdG5lc3NTY3JpcHRgLFxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICB9XG59XG5mdW5jdGlvbiB0cnlTaWduKHtcbiAgaW5wdXQsXG4gIG91clB1YktleSxcbiAga2V5UGFpcixcbiAgc2lnbmF0dXJlSGFzaCxcbiAgaGFzaFR5cGUsXG4gIHVzZUxvd1IsXG59KSB7XG4gIC8vIGVuZm9yY2UgaW4gb3JkZXIgc2lnbmluZyBvZiBwdWJsaWMga2V5c1xuICBsZXQgc2lnbmVkID0gZmFsc2U7XG4gIGZvciAoY29uc3QgW2ksIHB1YktleV0gb2YgaW5wdXQucHVia2V5cy5lbnRyaWVzKCkpIHtcbiAgICBpZiAoIW91clB1YktleS5lcXVhbHMocHViS2V5KSkgY29udGludWU7XG4gICAgaWYgKGlucHV0LnNpZ25hdHVyZXNbaV0pIHRocm93IG5ldyBFcnJvcignU2lnbmF0dXJlIGFscmVhZHkgZXhpc3RzJyk7XG4gICAgLy8gVE9ETzogYWRkIHRlc3RzXG4gICAgaWYgKG91clB1YktleS5sZW5ndGggIT09IDMzICYmIGlucHV0Lmhhc1dpdG5lc3MpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0JJUDE0MyByZWplY3RzIHVuY29tcHJlc3NlZCBwdWJsaWMga2V5cyBpbiBQMldQS0ggb3IgUDJXU0gnLFxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3Qgc2lnbmF0dXJlID0ga2V5UGFpci5zaWduKHNpZ25hdHVyZUhhc2gsIHVzZUxvd1IpO1xuICAgIGlucHV0LnNpZ25hdHVyZXNbaV0gPSBic2NyaXB0LnNpZ25hdHVyZS5lbmNvZGUoc2lnbmF0dXJlLCBoYXNoVHlwZSk7XG4gICAgc2lnbmVkID0gdHJ1ZTtcbiAgfVxuICBpZiAoIXNpZ25lZCkgdGhyb3cgbmV3IEVycm9yKCdLZXkgcGFpciBjYW5ub3Qgc2lnbiBmb3IgdGhpcyBpbnB1dCcpO1xufVxuZnVuY3Rpb24gZ2V0U2lnbmluZ0RhdGEoXG4gIG5ldHdvcmssXG4gIGlucHV0cyxcbiAgbmVlZHNPdXRwdXRzLFxuICB0eCxcbiAgc2lnblBhcmFtcyxcbiAga2V5UGFpcixcbiAgcmVkZWVtU2NyaXB0LFxuICBoYXNoVHlwZSxcbiAgd2l0bmVzc1ZhbHVlLFxuICB3aXRuZXNzU2NyaXB0LFxuICB1c2VMb3dSLFxuKSB7XG4gIGxldCB2aW47XG4gIGlmICh0eXBlb2Ygc2lnblBhcmFtcyA9PT0gJ251bWJlcicpIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICAnREVQUkVDQVRFRDogVHJhbnNhY3Rpb25CdWlsZGVyIHNpZ24gbWV0aG9kIGFyZ3VtZW50cyAnICtcbiAgICAgICAgJ3dpbGwgY2hhbmdlIGluIHY2LCBwbGVhc2UgdXNlIHRoZSBUeGJTaWduQXJnIGludGVyZmFjZScsXG4gICAgKTtcbiAgICB2aW4gPSBzaWduUGFyYW1zO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBzaWduUGFyYW1zID09PSAnb2JqZWN0Jykge1xuICAgIGNoZWNrU2lnbkFyZ3MoaW5wdXRzLCBzaWduUGFyYW1zKTtcbiAgICAoe1xuICAgICAgdmluLFxuICAgICAga2V5UGFpcixcbiAgICAgIHJlZGVlbVNjcmlwdCxcbiAgICAgIGhhc2hUeXBlLFxuICAgICAgd2l0bmVzc1ZhbHVlLFxuICAgICAgd2l0bmVzc1NjcmlwdCxcbiAgICB9ID0gc2lnblBhcmFtcyk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdUcmFuc2FjdGlvbkJ1aWxkZXIgc2lnbiBmaXJzdCBhcmcgbXVzdCBiZSBUeGJTaWduQXJnIG9yIG51bWJlcicsXG4gICAgKTtcbiAgfVxuICBpZiAoa2V5UGFpciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzaWduIHJlcXVpcmVzIGtleXBhaXInKTtcbiAgfVxuICAvLyBUT0RPOiByZW1vdmUga2V5UGFpci5uZXR3b3JrIG1hdGNoaW5nIGluIDQuMC4wXG4gIGlmIChrZXlQYWlyLm5ldHdvcmsgJiYga2V5UGFpci5uZXR3b3JrICE9PSBuZXR3b3JrKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0luY29uc2lzdGVudCBuZXR3b3JrJyk7XG4gIGlmICghaW5wdXRzW3Zpbl0pIHRocm93IG5ldyBFcnJvcignTm8gaW5wdXQgYXQgaW5kZXg6ICcgKyB2aW4pO1xuICBoYXNoVHlwZSA9IGhhc2hUeXBlIHx8IHRyYW5zYWN0aW9uXzEuVHJhbnNhY3Rpb24uU0lHSEFTSF9BTEw7XG4gIGlmIChuZWVkc091dHB1dHMoaGFzaFR5cGUpKSB0aHJvdyBuZXcgRXJyb3IoJ1RyYW5zYWN0aW9uIG5lZWRzIG91dHB1dHMnKTtcbiAgY29uc3QgaW5wdXQgPSBpbnB1dHNbdmluXTtcbiAgLy8gaWYgcmVkZWVtU2NyaXB0IHdhcyBwcmV2aW91c2x5IHByb3ZpZGVkLCBlbmZvcmNlIGNvbnNpc3RlbmN5XG4gIGlmIChcbiAgICBpbnB1dC5yZWRlZW1TY3JpcHQgIT09IHVuZGVmaW5lZCAmJlxuICAgIHJlZGVlbVNjcmlwdCAmJlxuICAgICFpbnB1dC5yZWRlZW1TY3JpcHQuZXF1YWxzKHJlZGVlbVNjcmlwdClcbiAgKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbmNvbnNpc3RlbnQgcmVkZWVtU2NyaXB0Jyk7XG4gIH1cbiAgY29uc3Qgb3VyUHViS2V5ID1cbiAgICBrZXlQYWlyLnB1YmxpY0tleSB8fCAoa2V5UGFpci5nZXRQdWJsaWNLZXkgJiYga2V5UGFpci5nZXRQdWJsaWNLZXkoKSk7XG4gIGlmICghY2FuU2lnbihpbnB1dCkpIHtcbiAgICBpZiAod2l0bmVzc1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChpbnB1dC52YWx1ZSAhPT0gdW5kZWZpbmVkICYmIGlucHV0LnZhbHVlICE9PSB3aXRuZXNzVmFsdWUpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW5wdXQgZGlkIG5vdCBtYXRjaCB3aXRuZXNzVmFsdWUnKTtcbiAgICAgIHR5cGVmb3JjZSh0eXBlcy5TYXRvc2hpLCB3aXRuZXNzVmFsdWUpO1xuICAgICAgaW5wdXQudmFsdWUgPSB3aXRuZXNzVmFsdWU7XG4gICAgfVxuICAgIGlmICghY2FuU2lnbihpbnB1dCkpIHtcbiAgICAgIGNvbnN0IHByZXBhcmVkID0gcHJlcGFyZUlucHV0KFxuICAgICAgICBpbnB1dCxcbiAgICAgICAgb3VyUHViS2V5LFxuICAgICAgICByZWRlZW1TY3JpcHQsXG4gICAgICAgIHdpdG5lc3NTY3JpcHQsXG4gICAgICApO1xuICAgICAgLy8gdXBkYXRlcyBpbmxpbmVcbiAgICAgIE9iamVjdC5hc3NpZ24oaW5wdXQsIHByZXBhcmVkKTtcbiAgICB9XG4gICAgaWYgKCFjYW5TaWduKGlucHV0KSkgdGhyb3cgRXJyb3IoaW5wdXQucHJldk91dFR5cGUgKyAnIG5vdCBzdXBwb3J0ZWQnKTtcbiAgfVxuICAvLyByZWFkeSB0byBzaWduXG4gIGxldCBzaWduYXR1cmVIYXNoO1xuICBpZiAoaW5wdXQuaGFzV2l0bmVzcykge1xuICAgIHNpZ25hdHVyZUhhc2ggPSB0eC5oYXNoRm9yV2l0bmVzc1YwKFxuICAgICAgdmluLFxuICAgICAgaW5wdXQuc2lnblNjcmlwdCxcbiAgICAgIGlucHV0LnZhbHVlLFxuICAgICAgaGFzaFR5cGUsXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBzaWduYXR1cmVIYXNoID0gdHguaGFzaEZvclNpZ25hdHVyZSh2aW4sIGlucHV0LnNpZ25TY3JpcHQsIGhhc2hUeXBlKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIGlucHV0LFxuICAgIG91clB1YktleSxcbiAgICBrZXlQYWlyLFxuICAgIHNpZ25hdHVyZUhhc2gsXG4gICAgaGFzaFR5cGUsXG4gICAgdXNlTG93UjogISF1c2VMb3dSLFxuICB9O1xufVxuIiwidmFyIE9QUyA9IHJlcXVpcmUoJy4vaW5kZXguanNvbicpXG5cbnZhciBtYXAgPSB7fVxuZm9yICh2YXIgb3AgaW4gT1BTKSB7XG4gIHZhciBjb2RlID0gT1BTW29wXVxuICBtYXBbY29kZV0gPSBvcFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcFxuIl0sInNvdXJjZVJvb3QiOiIifQ==