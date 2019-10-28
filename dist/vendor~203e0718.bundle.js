(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "0CSc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isCallable = __webpack_require__("IdCN");

var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

var forEachArray = function forEachArray(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

var forEachString = function forEachString(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

var forEachObject = function forEachObject(object, iterator, receiver) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

var forEach = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (toStr.call(list) === '[object Array]') {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};

module.exports = forEach;


/***/ }),

/***/ "AAEA":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var BN = __webpack_require__("OZ/i");

var _require = __webpack_require__("DGy1"),
    Long = _require.Long;

var assert = __webpack_require__("9lTW");

var types = {
  bytes: function bytes() {
    return [bytebuf];
  },
  string: function string() {
    return [_string];
  },
  vector: function vector(type) {
    var sorted = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return [_vector, { type: type, sorted: sorted }];
  },
  optional: function optional(type) {
    return [_optional, { type: type }];
  },
  time: function time() {
    return [_time2];
  },
  map: function map(annotation) {
    return [_map, { annotation: annotation }];
  },
  static_variant: function static_variant(types) {
    return [_static_variant, { types: types }];
  },

  fixed_string16: function fixed_string16() {
    return [_string, { maxLen: 16 }];
  },
  fixed_string32: function fixed_string32() {
    return [_string, { maxLen: 32 }];
  },

  fixed_bytes16: function fixed_bytes16() {
    return [bytebuf, { len: 16 }];
  },
  fixed_bytes20: function fixed_bytes20() {
    return [bytebuf, { len: 20 }];
  },
  fixed_bytes28: function fixed_bytes28() {
    return [bytebuf, { len: 28 }];
  },
  fixed_bytes32: function fixed_bytes32() {
    return [bytebuf, { len: 32 }];
  },
  fixed_bytes33: function fixed_bytes33() {
    return [bytebuf, { len: 33 }];
  },
  fixed_bytes64: function fixed_bytes64() {
    return [bytebuf, { len: 64 }];
  },
  fixed_bytes65: function fixed_bytes65() {
    return [bytebuf, { len: 65 }];
  },

  uint8: function uint8() {
    return [intbuf, { bits: 8 }];
  },
  uint16: function uint16() {
    return [intbuf, { bits: 16 }];
  },
  uint32: function uint32() {
    return [intbuf, { bits: 32 }];
  },
  uint64: function uint64() {
    return [intbuf, { bits: 64 }];
  },
  uint128: function uint128() {
    return [bnbuf, { bits: 128 }];
  },
  uint224: function uint224() {
    return [bnbuf, { bits: 224 }];
  },
  uint256: function uint256() {
    return [bnbuf, { bits: 256 }];
  },
  uint512: function uint512() {
    return [bnbuf, { bits: 512 }];
  },

  varuint32: function varuint32() {
    return [intbuf, { bits: 32, variable: true }];
  },

  int8: function int8() {
    return [intbuf, { signed: true, bits: 8 }];
  },
  int16: function int16() {
    return [intbuf, { signed: true, bits: 16 }];
  },
  int32: function int32() {
    return [intbuf, { signed: true, bits: 32 }];
  },
  int64: function int64() {
    return [intbuf, { signed: true, bits: 64 }];
  },
  int128: function int128() {
    return [bnbuf, { signed: true, bits: 128 }];
  },
  int224: function int224() {
    return [bnbuf, { signed: true, bits: 224 }];
  },
  int256: function int256() {
    return [bnbuf, { signed: true, bits: 256 }];
  },
  int512: function int512() {
    return [bnbuf, { signed: true, bits: 512 }];
  },

  varint32: function varint32() {
    return [intbuf, { signed: true, bits: 32, variable: true }];
  },

  float32: function float32() {
    return [float, { bits: 32 }];
  },
  float64: function float64() {
    return [float, { bits: 64 }];
  }

  /*
    @arg {SerializerConfig} config
    @return {object} {[typeName]: function(args)}
  */
};module.exports = function (config) {
  config = Object.assign({ defaults: false, debug: false, customTypes: {} }, config);

  var allTypes = Object.assign({}, types, config.customTypes);

  var createTypeReducer = function createTypeReducer(baseTypes) {
    return function (customTypes, name) {
      customTypes[name] = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var type = createType(name, config, args, baseTypes, allTypes, customTypes);
        return type;
      };
      return customTypes;
    };
  };

  var baseTypes = Object.keys(types).reduce(createTypeReducer(), {});

  var customTypes = Object.keys(config.customTypes || {}).reduce(createTypeReducer(baseTypes), {});

  return Object.assign({}, baseTypes, customTypes, { config: config });
};

/**
    @args {string} typeName - matches types[]
    @args {string} config - Additional arguments for types
*/
function createType(typeName, config, args, baseTypes, allTypes, customTypes) {
  var Type = baseTypes ? allTypes[typeName] : types[typeName];

  var _Type = Type.apply(undefined, _toConsumableArray(args)),
      _Type2 = _slicedToArray(_Type, 2),
      fn = _Type2[0],
      _Type2$ = _Type2[1],
      v = _Type2$ === undefined ? {} : _Type2$;

  var validation = Object.assign(v, config);
  validation.typeName = typeName;
  var type = fn(validation, baseTypes, customTypes);
  type.typeName = typeName;
  return type;
}

var _map = function _map(validation) {
  var _validation$annotatio = _slicedToArray(validation.annotation, 2),
      type1 = _validation$annotatio[0],
      type2 = _validation$annotatio[1];

  if (!isSerializer(type1)) {
    throw new TypeError('map<type1, > unknown');
  }
  if (!isSerializer(type2)) {
    throw new TypeError('map<, type2> unknown');
  }

  return {
    fromByteBuffer: function fromByteBuffer(b) {
      var size = b.readVarint32();
      var result = {};
      for (var i = 0; i < size; i++) {
        result[type1.fromByteBuffer(b)] = type2.fromByteBuffer(b);
      }
      if (validation.debug) {
        console.log('0x' + size.toString(16), '(map.fromByteBuffer length)', result);
      }
      return result;
    },
    appendByteBuffer: function appendByteBuffer(b, value) {
      validate(value, validation);
      var keys = Object.keys(value);
      b.writeVarint32(keys.length);
      if (validation.debug) {
        console.log('0x' + keys.length.toString(16), '(map.appendByteBuffer length)', keys);
      }
      // if(sorted === true) {
      //   value = sortKeys(type1, Object.assign({}, value))
      // }
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var o = _step.value;

          var value2 = value[o];
          type1.appendByteBuffer(b, o);
          type2.appendByteBuffer(b, value2);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    },
    fromObject: function fromObject(value) {
      validate(value, validation);
      var result = {};
      // if(sorted === true) {
      //   value = sortKeys(type1, Object.assign({}, value))
      // }
      for (var o in value) {
        result[type1.fromObject(o)] = type2.fromObject(value[o]);
      }
      return result;
    },
    toObject: function toObject(value) {
      if (validation.defaults && value == null) {
        return _defineProperty({}, type1.toObject(null), type2.toObject(null));
      }
      validate(value, validation);
      var result = {};
      // if(sorted === true) {
      //   value = sortKey(type1, Object.assign({}, value))
      // }
      for (var o in value) {
        result[type1.toObject(o)] = type2.toObject(value[o]);
      }
      return result;
    }
  };
};

var _static_variant = function _static_variant(validation) {
  var types = validation.types;

  return {
    fromByteBuffer: function fromByteBuffer(b) {
      var typePosition = b.readVarint32();
      var type = types[typePosition];
      if (validation.debug) {
        console.error('static_variant id ' + typePosition + ' (0x' + typePosition.toString(16) + ')');
      }
      assert(type, 'static_variant invalid type position ' + typePosition);
      return [typePosition, type.fromByteBuffer(b)];
    },
    appendByteBuffer: function appendByteBuffer(b, object) {
      assert(Array.isArray(object) && object.length === 2, 'Required tuple');
      var typePosition = object[0];
      var type = types[typePosition];
      assert(type, 'type ' + typePosition);
      b.writeVarint32(typePosition);
      type.appendByteBuffer(b, object[1]);
    },
    fromObject: function fromObject(object) {
      assert(Array.isArray(object) && object.length === 2, 'Required tuple');
      var typePosition = object[0];
      var type = types[typePosition];
      assert(type, 'type ' + typePosition);
      return [typePosition, type.fromObject(object[1])];
    },
    toObject: function toObject(object) {
      if (validation.defaults && object == null) {
        return [0, types[0].toObject(null, debug)];
      }
      assert(Array.isArray(object) && object.length === 2, 'Required tuple');
      var typePosition = object[0];
      var type = types[typePosition];
      assert(type, 'type ' + typePosition);
      return [typePosition, type.toObject(object[1])];
    }
  };
};

var _vector = function _vector(validation) {
  var type = validation.type,
      sorted = validation.sorted;

  if (!isSerializer(type)) {
    throw new TypeError('vector type should be a serializer');
  }

  return {
    fromByteBuffer: function fromByteBuffer(b) {
      var size = b.readVarint32();
      if (validation.debug) {
        console.log('fromByteBuffer vector length', size, '(0x' + size.toString(16) + ')');
      }
      var result = [];
      for (var i = 0; i < size; i++) {
        result.push(type.fromByteBuffer(b));
      }
      return result;
    },
    appendByteBuffer: function appendByteBuffer(b, value) {
      if (value == null) {
        value = [];
      }
      validate(value, validation);
      b.writeVarint32(value.length);
      if (sorted === true) {
        value = sort(type, Object.assign([], value));
      }
      if (validation.debug) {
        console.log('0x' + value.length.toString(16), '(vector.appendByteBuffer length)', value);
      }
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = value[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var o = _step2.value;

          type.appendByteBuffer(b, o);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    },
    fromObject: function fromObject(value) {
      if (value == null) {
        value = [];
      }
      validate(value, validation);
      var result = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = value[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var o = _step3.value;

          result.push(type.fromObject(o));
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      if (sorted === true) {
        result = sort(type, Object.assign([], result));
      }
      return result;
    },
    toObject: function toObject(value) {
      if (validation.defaults && value == null) {
        return [type.toObject(value)];
      }
      if (value == null) {
        value = [];
      }
      validate(value, validation);
      if (sorted === true) {
        value = sort(type, Object.assign([], value));
      }
      var result = [];
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = value[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var o = _step4.value;

          result.push(type.toObject(o));
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return result;
    }
  };
};

var _optional = function _optional(validation) {
  var type = validation.type;

  if (!isSerializer(type)) {
    throw new TypeError('optional parameter should be a serializer');
  }

  return {
    fromByteBuffer: function fromByteBuffer(b) {
      if (!(b.readUint8() === 1)) {
        return null;
      }
      return type.fromByteBuffer(b);
    },
    appendByteBuffer: function appendByteBuffer(b, value) {
      if (value != null) {
        b.writeUint8(1);
        type.appendByteBuffer(b, value);
      } else {
        b.writeUint8(0);
      }
    },
    fromObject: function fromObject(value) {
      if (value == null) {
        return null;
      }
      return type.fromObject(value);
    },
    toObject: function toObject(value) {
      // toObject is only null save if defaults is true
      var resultValue = void 0;
      if (value == null && !validation.defaults) {
        resultValue = null;
      } else {
        resultValue = type.toObject(value);
      }
      return resultValue;
    }
  };
};

var intbufType = function intbufType(_ref2) {
  var _ref2$signed = _ref2.signed,
      signed = _ref2$signed === undefined ? false : _ref2$signed,
      bits = _ref2.bits,
      variable = _ref2.variable;
  return variable ? 'Varint' + bits + (signed ? 'ZigZag' : '') : '' + (signed ? 'Int' : 'Uint') + bits;
};

var intbuf = function intbuf(validation) {
  return {
    fromByteBuffer: function fromByteBuffer(b) {
      var value = b['read' + intbufType(validation)]();
      return Long.isLong(value) ? value.toString() : value;
    },
    appendByteBuffer: function appendByteBuffer(b, value) {
      // validateInt(value, validation)
      // value = typeof value === 'string' ? Long.fromString(value) : value
      b['write' + intbufType(validation)](value);
    },
    fromObject: function fromObject(value) {
      validateInt(value, validation);
      // if(validation.bits > 53 && typeof value === 'number')
      //     value = String(value)

      return value;
    },
    toObject: function toObject(value) {
      if (validation.defaults && value == null) {
        return validation.bits > 53 ? '0' : 0;
      }

      validateInt(value, validation);
      // if(validation.bits > 53 && typeof value === 'number')
      //     value = String(value)

      return Long.isLong(value) ? value.toString() : value;
    }
  };
};

/** Big Numbers (> 64 bits) */
var bnbuf = function bnbuf(validation) {
  var _validation$signed = validation.signed,
      signed = _validation$signed === undefined ? false : _validation$signed,
      bits = validation.bits;

  var size = bits / 8;
  return {
    fromByteBuffer: function fromByteBuffer(b) {
      var bcopy = b.copy(b.offset, b.offset + size);
      b.skip(size);

      var bn = new BN(bcopy.toHex(), 'hex');
      var buf = bn.toArrayLike(Buffer, 'le', size); // convert to little endian
      bn = new BN(buf.toString('hex'), 'hex');
      if (signed) {
        bn = bn.fromTwos(bits);
      }
      var value = bn.toString();
      validateInt(value, validation);
      return bits > 53 ? value : bn.toNumber();
    },
    appendByteBuffer: function appendByteBuffer(b, value) {
      validateInt(value, validation);
      var bn = new BN(value);
      if (signed) {
        bn = bn.toTwos(bits);
      }
      var buf = bn.toArrayLike(Buffer, 'le', size);
      b.append(buf.toString('binary'), 'binary');
    },
    fromObject: function fromObject(value) {
      validateInt(value, validation);
      return value;
    },
    toObject: function toObject(value) {
      if (validation.defaults && value == null) {
        return validation.bits > 53 ? '0' : 0;
      }
      validateInt(value, validation);
      return value;
    }
  };
};

var floatPoint = __webpack_require__("RnXq");

var float = function float(validation) {
  var bits = validation.bits;

  // assert(bits === 32 || bits === 64, 'unsupported float bit size: ' + bits)

  var sizeName = bits === 32 ? 'Float' : bits === 64 ? 'Double' : null;
  assert(sizeName, 'unsupported float bit size: ' + bits);
  var size = bits / 8;

  return {
    fromByteBuffer: function fromByteBuffer(b) {
      var bcopy = b.copy(b.offset, b.offset + size);
      b.skip(size);
      var fb = Buffer.from(bcopy.toBinary(), 'binary');
      return floatPoint['read' + sizeName + 'LE'](fb);
    },
    appendByteBuffer: function appendByteBuffer(b, value) {
      var output = [];
      floatPoint['write' + sizeName + 'LE'](output, value);
      b.append(output);
    },
    fromObject: function fromObject(value) {
      return value;
    },
    toObject: function toObject(value) {
      if (validation.defaults && value == null) {
        return 0.0;
      }
      return value;
    }
  };
};

var bytebuf = function bytebuf(validation) {
  var _bytebuf = {
    fromByteBuffer: function fromByteBuffer(b) {
      var len = validation.len;

      var bCopy = void 0;
      if (len == null) {
        var lenPrefix = b.readVarint32();
        bCopy = b.copy(b.offset, b.offset + lenPrefix);
        b.skip(lenPrefix);
      } else {
        bCopy = b.copy(b.offset, b.offset + len);
        b.skip(len);
      }
      return Buffer.from(bCopy.toBinary(), 'binary');
    },
    appendByteBuffer: function appendByteBuffer(b, value) {
      // value = _bytebuf.fromObject(value)

      var len = validation.len;

      if (len == null) {
        b.writeVarint32(value.length);
      }
      b.append(value.toString('binary'), 'binary');
    },
    fromObject: function fromObject(value) {
      if (typeof value === 'string') {
        value = Buffer.from(value, 'hex');
      } else if (value instanceof Array) {
        value = Buffer.from(value);
      } else if (value instanceof Uint8Array) {
        value = Buffer.from(value);
      }

      validate(value, validation);
      return value;
    },
    toObject: function toObject(value) {
      var defaults = validation.defaults,
          len = validation.len;

      if (defaults && value == null) {
        return Array(len ? len + 1 : 1).join('00');
      }
      validate(value, validation);
      return value.toString('hex');
    },
    compare: function compare(a, b) {
      return Buffer.compare(a, b);
    }
  };
  return _bytebuf;
};

var _string = function _string(validation) {
  return {
    fromByteBuffer: function fromByteBuffer(b) {
      return b.readVString();
    },
    appendByteBuffer: function appendByteBuffer(b, value) {
      validate(value, validation);
      b.writeVString(value.toString());
    },
    fromObject: function fromObject(value) {
      validate(value, validation);
      return value;
    },
    toObject: function toObject(value) {
      if (validation.defaults && value == null) {
        return '';
      }
      validate(value, validation);
      return value;
    }
  };
};

var _time2 = function _time2(validation) {
  var _time = {
    fromByteBuffer: function fromByteBuffer(b) {
      return b.readUint32();
    },
    appendByteBuffer: function appendByteBuffer(b, value) {
      // if(typeof value !== "number")
      //     value = _time.fromObject(value)

      validate(value, validation);
      b.writeUint32(value);
    },
    fromObject: function fromObject(value) {
      validate(value, validation);

      if (typeof value === 'number') {
        return value;
      }

      if (value.getTime) {
        return Math.floor(value.getTime() / 1000);
      }

      if (typeof value !== 'string') {
        throw new Error('Unknown date type: ' + value);
      }

      // Chrome assumes Zulu when missing, Firefox does not
      if (typeof value === 'string' && !/Z$/.test(value)) {
        value += 'Z';
      }

      return Math.floor(new Date(value).getTime() / 1000);
    },
    toObject: function toObject(value) {
      if (validation.defaults && value == null) {
        return new Date(0).toISOString().split('.')[0];
      }

      validate(value, validation);

      // if(typeof value === "string") {
      //     if(!/Z$/.test(value))
      //         value += "Z"
      //
      //     return value
      // }

      // if(value.getTime)
      //     return value.toISOString().split('.')[0] + 'Z'

      validateInt(value, spread(validation, { bits: 32 }));
      var int = parseInt(value);
      return new Date(int * 1000).toISOString().split('.')[0];
    }
  };
  return _time;
};

var validate = function validate(value, validation) {
  if (isEmpty(value)) {
    throw new Error('Required ' + validation.typeName);
  }

  if (validation.len != null) {
    if (value.length == null) {
      throw new Error('len validation requries a "length" property');
    }

    var len = validation.len;

    if (value.length !== len) {
      throw new Error(validation.typeName + ' length ' + value.length + ' does not equal ' + len);
    }
  }

  if (validation.maxLen != null) {
    var maxLen = validation.maxLen;

    if (value.length == null) {
      throw new Error('maxLen validation requries a "length" property');
    }

    if (value.length > maxLen) {
      throw new Error(validation.typeName + ' length ' + value.length + ' exceeds maxLen ' + maxLen);
    }
  }
};

var ZERO = new BN();
var ONE = new BN('1');

function validateInt(value, validation) {
  if (isEmpty(value)) {
    throw new Error('Required ' + validation.typeName);
  }
  var _validation$signed2 = validation.signed,
      signed = _validation$signed2 === undefined ? false : _validation$signed2,
      _validation$bits = validation.bits,
      bits = _validation$bits === undefined ? 54 : _validation$bits;


  value = String(value).trim();
  if (signed && !/^-?[0-9]+$/.test(value) || !signed && !/^[0-9]+$/.test(value)) {
    throw new Error('Number format ' + validation.typeName + ' ' + value);
  }

  var max = signed ? maxSigned(bits) : maxUnsigned(bits);
  var min = signed ? minSigned(bits) : ZERO;
  var i = new BN(value);

  // console.log('i.toString(), min.toString()', i.toString(), min.toString())
  if (i.cmp(min) < 0 || i.cmp(max) > 0) {
    throw new Error('Overflow ' + validation.typeName + ' ' + value + ', ' + ('max ' + max.toString() + ', min ' + min.toString() + ', signed ' + signed + ', bits ' + bits));
  }
}

var isSerializer = function isSerializer(type) {
  return (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && typeof type.fromByteBuffer === 'function' && typeof type.appendByteBuffer === 'function' && typeof type.fromObject === 'function' && typeof type.toObject === 'function';
};

var toString = function toString(value, encoding) {
  return value == null ? value : value.toString ? value.toString(encoding) : value;
};

var sort = function sort(type, values) {
  return type.compare ? values.sort(type.compare) : // custom compare
  values.sort();
};

var spread = function spread() {
  return Object.assign.apply(Object, arguments);
};
var isEmpty = function isEmpty(value) {
  return value == null;
};

// 1 << N === Math.pow(2, N)
var maxUnsigned = function maxUnsigned(bits) {
  return new BN(1).ishln(bits).isub(ONE);
};
var maxSigned = function maxSigned(bits) {
  return new BN(1).ishln(bits - 1).isub(ONE);
};
var minSigned = function minSigned(bits) {
  return new BN(1).ishln(bits - 1).ineg();
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "D3zA":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__("aI7X");

module.exports = Function.prototype.bind || implementation;


/***/ }),

/***/ "Mlzg":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Types = __webpack_require__("AAEA");
var Fcbuffer = __webpack_require__("xr2V");
var assert = __webpack_require__("9lTW");

var create = Fcbuffer.create;

/**
  @typedef {object} SerializerConfig
  @property {boolean} [SerializerConfig.defaults = false] - Insert in defaults (like 0, false, '000...', or '') for any missing values.  This helps test and inspect what a definition should look like.  Do not enable in production.
  @property {boolean} [SerializerConfig.debug = false] - Prints lots of HEX and field-level information to help debug binary serialization.
  @property {object} [customTypes] - Add or overwrite low level types (see ./src/types.js `const types = {...}`).
*/

/**
  @typedef {object} CreateStruct
  @property {Array<String>} CreateStruct.errors - If any errors exists, no struts will be created.
  @property {Object} CreateStruct.struct - Struct objects keyed by definition name.
  @property {String} CreateStruct.struct.structName - Struct object that will serialize this type.
  @property {Struct} CreateStruct.struct.struct - Struct object that will serialize this type (see ./src/struct.js).
*/

/**
  @arg {object} definitions - examples https://github.com/EOSIO/eosjs-json/blob/master/schema
  @arg {SerializerConfig} config
  @return {CreateStruct}
*/

module.exports = function (definitions) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if ((typeof definitions === 'undefined' ? 'undefined' : _typeof(definitions)) !== 'object') {
    throw new TypeError('definitions is a required parameter');
  }

  if (config.customTypes) {
    definitions = Object.assign({}, definitions); //clone
    for (var key in config.customTypes) {
      // custom types overwrite definitions
      delete definitions[key];
    }
  }

  var types = Types(config);

  var _create = create(definitions, types),
      errors = _create.errors,
      structs = _create.structs;

  /** Extend with more JSON schema and type definitions */


  var _extend = function _extend(parent, child) {
    var combined = Object.assign({}, parent, child);

    var _create2 = create(combined, types),
        structs = _create2.structs,
        errors = _create2.errors;

    return {
      errors: errors,
      structs: structs,
      extend: function extend(child) {
        return _extend(combined, child);
      },
      fromBuffer: fromBuffer(types, structs),
      toBuffer: toBuffer(types, structs)
    };
  };

  return {
    errors: errors,
    structs: structs,
    types: types,
    extend: function extend(child) {
      return _extend(definitions, child);
    },

    /**
      @arg {string} typeName lookup struct or type by name
      @arg {Buffer} buf serialized data to be parsed
      @return {object} deserialized object
    */
    fromBuffer: fromBuffer(types, structs),

    /**
      @arg {string} typeName lookup struct or type by name
      @arg {Object} object for serialization
      @return {Buffer} serialized object
    */
    toBuffer: toBuffer(types, structs)
  };
};

var fromBuffer = function fromBuffer(types, structs) {
  return function (typeName, buf) {
    assert.equal(typeof typeName === 'undefined' ? 'undefined' : _typeof(typeName), 'string', 'typeName (type or struct name)');
    if (typeof buf === 'string') {
      buf = Buffer.from(buf, 'hex');
    }
    assert(Buffer.isBuffer(buf), 'expecting buf<hex|Buffer>');

    var type = types[typeName];
    if (type) {
      type = type();
    } else {
      type = structs[typeName];
    }
    assert(type, 'missing type or struct: ' + typeName);
    return Fcbuffer.fromBuffer(type, buf);
  };
};

var toBuffer = function toBuffer(types, structs) {
  return function (typeName, value) {
    assert.equal(typeof typeName === 'undefined' ? 'undefined' : _typeof(typeName), 'string', 'typeName (type or struct name)');
    assert(value != null, 'value is required');

    var type = types[typeName];
    if (type) {
      type = type();
    } else {
      type = structs[typeName];
    }
    assert(type, 'missing type or struct: ' + typeName);
    return Fcbuffer.toBuffer(type, value);
  };
};

module.exports.fromBuffer = Fcbuffer.fromBuffer;
module.exports.toBuffer = Fcbuffer.toBuffer;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "N1pS":
/***/ (function(module, exports) {

module.exports = stringify
stringify.default = stringify
stringify.stable = deterministicStringify
stringify.stableStringify = deterministicStringify

var arr = []

// Regular stringify
function stringify (obj, replacer, spacer) {
  decirc(obj, '', [], undefined)
  var res = JSON.stringify(obj, replacer, spacer)
  while (arr.length !== 0) {
    var part = arr.pop()
    part[0][part[1]] = part[2]
  }
  return res
}
function decirc (val, k, stack, parent) {
  var i
  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        parent[k] = '[Circular]'
        arr.push([parent, k, val])
        return
      }
    }
    stack.push(val)
    // Optimize for Arrays. Big arrays could kill the performance otherwise!
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        decirc(val[i], i, stack, val)
      }
    } else {
      var keys = Object.keys(val)
      for (i = 0; i < keys.length; i++) {
        var key = keys[i]
        decirc(val[key], key, stack, val)
      }
    }
    stack.pop()
  }
}

// Stable-stringify
function compareFunction (a, b) {
  if (a < b) {
    return -1
  }
  if (a > b) {
    return 1
  }
  return 0
}

function deterministicStringify (obj, replacer, spacer) {
  var tmp = deterministicDecirc(obj, '', [], undefined) || obj
  var res = JSON.stringify(tmp, replacer, spacer)
  while (arr.length !== 0) {
    var part = arr.pop()
    part[0][part[1]] = part[2]
  }
  return res
}

function deterministicDecirc (val, k, stack, parent) {
  var i
  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        parent[k] = '[Circular]'
        arr.push([parent, k, val])
        return
      }
    }
    if (typeof val.toJSON === 'function') {
      return
    }
    stack.push(val)
    // Optimize for Arrays. Big arrays could kill the performance otherwise!
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        deterministicDecirc(val[i], i, stack, val)
      }
    } else {
      // Create a temporary object in the required way
      var tmp = {}
      var keys = Object.keys(val).sort(compareFunction)
      for (i = 0; i < keys.length; i++) {
        var key = keys[i]
        deterministicDecirc(val[key], key, stack, val)
        tmp[key] = val[key]
      }
      if (parent !== undefined) {
        arr.push([parent, k, val])
        parent[k] = tmp
      } else {
        return tmp
      }
    }
    stack.pop()
  }
}


/***/ }),

/***/ "aI7X":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ "gAlf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ByteBuffer = __webpack_require__("DGy1");

/**
  @class Struct

  @arg {object} config.override = {
    'Message.data.appendByteBuffer': ({fields, object, b}) => {..}
  }
  Rare cases where specialized serilization is needed (ex A Message object has
  'type' and 'data' fields where object.type === 'transfer' can define
  serialization time Struct needed for 'data' .. This saves complexity for the
  end-user's working with json.  See override unit test.
*/
module.exports = function (name) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { debug: false };

  config = Object.assign({ override: {} }, config);
  var fields = {};
  var fieldOne = void 0,
      fieldOneName = void 0;

  return {
    compare: function compare(a, b) {
      var v1 = a[fieldOneName];
      var v2 = b[fieldOneName];

      if (!fieldOne || !fieldOne.compare) {
        return v1 > v2 ? 1 : v1 < v2 ? -1 : 0;
      }

      return fieldOne.compare(v1, v2);
    },


    /** @private */
    add: function add(fieldName, type) {
      fields[fieldName] = type;
      if (fieldOne == null) {
        fieldOne = type;
        fieldOneName = fieldName;
      }
    },


    // Complete list of fields, after resolving "base" inheritance
    fields: fields,

    fromByteBuffer: function fromByteBuffer(b) {
      var object = {};
      var field = null;
      try {
        for (field in fields) {
          var type = fields[field];
          try {
            var o1 = b.offset;
            if (field === '') {
              // structPtr
              object = type.fromByteBuffer(b, config);
            } else {
              var fromByteBuffer = config.override[name + '.' + field + '.fromByteBuffer'];
              if (fromByteBuffer) {
                fromByteBuffer({ fields: fields, object: object, b: b, config: config });
              } else {
                object[field] = type.fromByteBuffer(b, config);
              }
            }
            if (config.debug) {
              if (type.struct) {
                console.error(type.struct);
              } else {
                var value = void 0;
                try {
                  // human readable text
                  value = type.toObject(field === '' ? object : object[field], config);
                } catch (error) {
                  // console.error('fromByteBuffer debug error:', error)
                  value = '';
                }
                var _b = b.copy(o1, b.offset);
                console.error('fromByteBuffer', name + '.' + field, '\'' + value + '\'', _b.toHex());
              }
            }
          } catch (e) {
            console.error(e + ' in ' + name + '.' + field);
            b.printDebug();
            throw e;
          }
        }
      } catch (error) {
        error.message += ' in ' + name + '.' + field;
        throw error;
      }
      return object;
    },
    appendByteBuffer: function appendByteBuffer(b, object) {
      var field = null;
      try {
        for (field in fields) {
          var type = fields[field];
          if (field === '') {
            // structPtr
            type.appendByteBuffer(b, object);
          } else {
            var appendByteBuffer = config.override[name + '.' + field + '.appendByteBuffer'];
            if (appendByteBuffer) {
              appendByteBuffer({ fields: fields, object: object, b: b });
            } else {
              type.appendByteBuffer(b, object[field]);
            }
          }
        }
      } catch (error) {
        try {
          error.message += ' ' + name + '.' + field + ' = ' + JSON.stringify(object[field]);
        } catch (e) {
          // circular ref
          error.message += ' ' + name + '.' + field + ' = ' + object[field];
        }
        throw error;
      }
    },
    fromObject: function fromObject(serializedObject) {
      var fromObject_struct = config.override[name + '.fromObject'];
      if (fromObject_struct) {
        var ret = fromObject_struct(serializedObject);
        if (ret != null) {
          return ret;
        }
      }

      var result = {};
      var field = null;
      try {
        for (field in fields) {
          // if(config.debug) {
          //   console.error(name, field, '(fromObject)')
          // }
          var type = fields[field];
          if (field === '') {
            // structPtr
            var object = type.fromObject(serializedObject);
            Object.assign(result, object);
          } else {
            var fromObject = config.override[name + '.' + field + '.fromObject'];
            if (fromObject) {
              fromObject({ fields: fields, object: serializedObject, result: result });
            } else {
              var value = serializedObject[field];
              var _object = type.fromObject(value);
              result[field] = _object;
            }
          }
        }
      } catch (error) {
        error.message += ' ' + name + '.' + field;
        throw error;
      }

      return result;
    },
    toObject: function toObject() {
      var serializedObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var toObject_struct = config.override[name + '.toObject'];
      if (toObject_struct) {
        var ret = toObject_struct(serializedObject);
        if (ret != null) {
          return ret;
        }
      }

      var result = {};
      var field = null;
      try {
        // if (!fields) { return result }

        for (field in fields) {
          var type = fields[field];

          var toObject = config.override[name + '.' + field + '.toObject'];
          if (toObject) {
            toObject({ fields: fields, object: serializedObject, result: result, config: config });
          } else {
            if (field === '') {
              // structPtr
              var object = type.toObject(serializedObject, config);
              Object.assign(result, object);
            } else {
              var _object2 = type.toObject(serializedObject ? serializedObject[field] : null, config);
              result[field] = _object2;
            }
          }

          if (config.debug) {
            try {
              var b = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, ByteBuffer.LITTLE_ENDIAN);
              if (serializedObject != null) {
                var value = serializedObject[field];
                if (value) {
                  var appendByteBuffer = config.override[name + '.' + field + '.appendByteBuffer'];
                  if (toObject && appendByteBuffer) {
                    appendByteBuffer({ fields: fields, object: serializedObject, b: b });
                  } else {
                    type.appendByteBuffer(b, value);
                  }
                }
              }
              b = b.copy(0, b.offset);
              console.error('toObject', name + '.' + field, '\'' + result[field] + '\'', b.toHex());
            } catch (error) {
              // work-around to prevent debug time crash
              error.message = name + '.' + field + ' ' + error.message;
              console.error(error);
            }
          }
        }
      } catch (error) {
        error.message += ' ' + name + '.' + field;
        throw error;
      }
      return result;
    }
  };
};

/***/ }),

/***/ "oNNP":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__("D3zA");

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ }),

/***/ "vgmO":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("yLpj")))

/***/ }),

/***/ "xr2V":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var ByteBuffer = __webpack_require__("DGy1");
var Struct = __webpack_require__("gAlf");

module.exports = {
  create: create,
  toBuffer: toBuffer,
  fromBuffer: fromBuffer

  /**
    @summary Create a serializer for each definition.
    @return {CreateStruct}
  */
};function create(definitions, types) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : types.config;

  var errors = [];
  if (!config.sort) {
    config.sort = {};
  }

  // Basic structure validation
  for (var key in definitions) {
    var value = definitions[key];
    var base = value.base,
        fields = value.fields;

    var typeOfValue = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    if (typeOfValue === 'object') {
      if (!base && !fields) {
        errors.push('Expecting ' + key + '.fields or ' + key + '.base');
        continue;
      }
      if (base && typeof base !== 'string') {
        errors.push('Expecting string ' + key + '.base');
      }
      if (fields) {
        if ((typeof fields === 'undefined' ? 'undefined' : _typeof(fields)) !== 'object') {
          errors.push('Expecting object ' + key + '.fields');
        } else {
          for (var field in fields) {
            if (typeof fields[field] !== 'string') {
              errors.push('Expecting string in ' + key + '.fields.' + field);
            }
          }
        }
      }
    } else if (typeOfValue !== 'string') {
      errors.push('Expecting object or string under ' + key + ', instead got ' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)));
      continue;
    }
  }

  // Keys with objects are structs
  var structs = {};
  for (var _key in definitions) {
    var _value = definitions[_key];
    if ((typeof _value === 'undefined' ? 'undefined' : _typeof(_value)) === 'object') {
      structs[_key] = Struct(_key, config);
    }
  }

  // Resolve user-friendly typedef names pointing to a native type (or another typedef)
  for (var _key2 in definitions) {
    var _value2 = definitions[_key2];
    if (typeof _value2 === 'string') {
      var type = types[_value2];
      if (type) {
        types[_key2] = type;
      } else {
        // example: key === 'fields' && value === field[]
        var struct = getTypeOrStruct(_key2, _value2); // type = vector(field)
        if (struct) {
          structs[_key2] = struct;
        } else {
          errors.push('Unrecognized type or struct ' + _key2 + '.' + _value2);
        }
      }
    }
  }

  // Structs can inherit another struct, they will share the same instance
  for (var _key3 in definitions) {
    var thisStruct = structs[_key3];
    if (!thisStruct) continue;
    var _value3 = definitions[_key3];
    if ((typeof _value3 === 'undefined' ? 'undefined' : _typeof(_value3)) === 'object' && _value3.base) {
      var base = _value3.base;
      var baseStruct = structs[base];
      if (!baseStruct) {
        errors.push('Missing ' + base + ' in ' + _key3 + '.base');
        continue;
      }
      thisStruct.add('', structPtr(baseStruct));
    }
  }

  // Create types from a string (ex vector[Type])
  function getTypeOrStruct(key, Type, typeArgs, fieldName) {
    var typeatty = parseType(Type);
    if (!typeatty) return null;
    var name = typeatty.name,
        annotation = typeatty.annotation,
        arrayType = typeatty.arrayType;

    var ret = void 0;
    if (annotation) {
      // any_type<field_name, type_name>
      var _type = types[name];
      if (_type == null) {
        errors.push('Missing ' + name + ' in ' + Type);
        return null;
      }
      var annTypes = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = annotation[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var annTypeName = _step.value;

          var annType = getTypeOrStruct(key, annTypeName, null, fieldName);
          if (!annType) {
            errors.push('Missing ' + annTypeName + ' in ' + Type);
            return null;
          }
          annTypes.push(annType);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      ret = _type(annTypes);
    } else if (arrayType == null) {
      // AnyType
      var fieldStruct = structs[name];
      if (fieldStruct) {
        return fieldStruct;
      }

      var _type2 = types[name];
      if (!_type2) {
        return null;
      }

      // types need to be instantiated
      ret = _type2(typeArgs);
    } else if (arrayType === '') {
      // AnyType[]
      var nameType = getTypeOrStruct(key, typeatty.name, null, fieldName);
      if (!nameType) {
        return null;
      }

      var sort = config.sort[key + '.' + fieldName] || false;
      // console.log('sort?', `${key}.${fieldName}`, sort, config.sort)
      ret = types.vector(nameType, sort);
    } else if (arrayType.length > 0) {
      // vector[Type]
      var arrayTs = getTypeOrStruct(key, typeatty.arrayType, null, fieldName);
      if (!arrayTs) {
        errors.push('Missing ' + typeatty.arrayType + ' in ' + Type);
        return null;
      }
      var baseTs = getTypeOrStruct(key, typeatty.name, arrayTs, fieldName);
      if (!baseTs) {
        errors.push('Missing ' + typeatty.name + ' in ' + Type);
        return null;
      }
      ret = baseTs;
    }
    return typeatty.optional ? types.optional(ret) : ret;
  }

  // Add all the fields.  Thanks to structPtr no need to look at base types.
  for (var _key4 in definitions) {
    var _thisStruct = structs[_key4];
    if (!_thisStruct) continue;
    var _value4 = definitions[_key4];
    if (!_value4.fields) continue;
    var fields = _value4.fields;

    for (var Field in fields) {
      var Type = fields[Field];
      var ts = getTypeOrStruct(_key4, Type, null, Field);
      if (!ts) {
        errors.push('Missing ' + Type + ' in ' + _key4 + '.fields.' + Field);
        continue;
      }
      _thisStruct.add(Field, ts);
    }
  }

  if (errors.length) {
    // 'structs' could contain invalid references
    return { errors: errors };
  }

  return { errors: errors, structs: structs };
}

var parseType = function parseType(name) {
  if (!name || typeof name !== 'string') {
    return null;
  }

  name = name.trim();

  var annotationMatch = name.match(/<(.*)>/);
  if (annotationMatch) {
    var annotation = annotationMatch ? annotationMatch[1].replace(/ /g, '').split(',') : null;

    name = name.replace(annotationMatch[0], '').trim();
    return { name: name, annotation: annotation };
  }

  var arrayMatch = name.match(/\[(.*)\]/);
  var arrayType = arrayMatch ? arrayMatch[1].trim() : null;

  if (arrayMatch) {
    name = name.replace(arrayMatch[0], '').trim();
  }

  var optional = false;
  if (/\?$/.test(name)) {
    name = name.substring(0, name.length - 1);
    optional = true;
  }
  return { name: name, arrayType: arrayType, optional: optional };
};

/**
  Base types all point to the same struct.

  Note, appendByteBuffer has no return type.
*/
var structPtr = function structPtr(type) {
  return {
    fromByteBuffer: function fromByteBuffer(b) {
      return type.fromByteBuffer(b);
    },
    appendByteBuffer: function appendByteBuffer(b, value) {
      type.appendByteBuffer(b, value);
    },
    fromObject: function fromObject(value) {
      return type.fromObject(value);
    },
    toObject: function toObject(value) {
      return type.toObject(value);
    }
  };
};

function toBuffer(type, value) {
  var struct = type.fromObject(value);
  return Buffer.from(toByteBuffer(type, struct).toBinary(), 'binary');
}

function fromBuffer(type, buffer) {
  var toObject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var b = ByteBuffer.fromBinary(buffer.toString('binary'), ByteBuffer.LITTLE_ENDIAN);
  var struct = type.fromByteBuffer(b);
  return toObject ? type.toObject(struct) : struct;
}

function toByteBuffer(type, value) {
  var b = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, ByteBuffer.LITTLE_ENDIAN);
  type.appendByteBuffer(b, value);
  return b.copy(0, b.offset);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm9yLWVhY2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZjYnVmZmVyL2xpYi90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZnVuY3Rpb24tYmluZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZmNidWZmZXIvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mYXN0LXNhZmUtc3RyaW5naWZ5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mdW5jdGlvbi1iaW5kL2ltcGxlbWVudGF0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mY2J1ZmZlci9saWIvc3RydWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9oYXMvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbG9iYWwvd2luZG93LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mY2J1ZmZlci9saWIvZmNidWZmZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsaUJBQWlCLG1CQUFPLENBQUMsTUFBYTs7QUFFdEM7QUFDQTs7QUFFQTtBQUNBLHVDQUF1QyxTQUFTO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0NBQXdDLFNBQVM7QUFDakQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7O0FDN0RBLDhDQUFhOztBQUViLG9HQUFvRyxtQkFBbUIsRUFBRSxtQkFBbUIsOEhBQThIOztBQUUxUSxrQ0FBa0MsaUNBQWlDLGVBQWUsZUFBZSxnQkFBZ0Isb0JBQW9CLE1BQU0sMENBQTBDLCtCQUErQixhQUFhLHFCQUFxQixtQ0FBbUMsRUFBRSxFQUFFLGNBQWMsV0FBVyxVQUFVLEVBQUUsVUFBVSxNQUFNLHlDQUF5QyxFQUFFLFVBQVUsa0JBQWtCLEVBQUUsRUFBRSxhQUFhLEVBQUUsMkJBQTJCLDBCQUEwQixZQUFZLEVBQUUsMkNBQTJDLDhCQUE4QixFQUFFLE9BQU8sNkVBQTZFLEVBQUUsR0FBRyxFQUFFOztBQUVycEIsMkNBQTJDLGtCQUFrQixrQ0FBa0MscUVBQXFFLEVBQUUsRUFBRSxPQUFPLGtCQUFrQixFQUFFLFlBQVk7O0FBRS9NLGtDQUFrQywwQkFBMEIsMENBQTBDLGdCQUFnQixPQUFPLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxPQUFPLHdCQUF3QixFQUFFOztBQUVqTSxTQUFTLG1CQUFPLENBQUMsTUFBTzs7QUFFeEIsZUFBZSxtQkFBTyxDQUFDLE1BQVk7QUFDbkM7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLE1BQVE7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxzQkFBc0IsNkJBQTZCO0FBQ25ELEdBQUc7QUFDSDtBQUNBLHdCQUF3QixhQUFhO0FBQ3JDLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsbUJBQW1CLHlCQUF5QjtBQUM1QyxHQUFHO0FBQ0g7QUFDQSw4QkFBOEIsZUFBZTtBQUM3QyxHQUFHOztBQUVIO0FBQ0Esc0JBQXNCLGFBQWE7QUFDbkMsR0FBRztBQUNIO0FBQ0Esc0JBQXNCLGFBQWE7QUFDbkMsR0FBRzs7QUFFSDtBQUNBLHNCQUFzQixVQUFVO0FBQ2hDLEdBQUc7QUFDSDtBQUNBLHNCQUFzQixVQUFVO0FBQ2hDLEdBQUc7QUFDSDtBQUNBLHNCQUFzQixVQUFVO0FBQ2hDLEdBQUc7QUFDSDtBQUNBLHNCQUFzQixVQUFVO0FBQ2hDLEdBQUc7QUFDSDtBQUNBLHNCQUFzQixVQUFVO0FBQ2hDLEdBQUc7QUFDSDtBQUNBLHNCQUFzQixVQUFVO0FBQ2hDLEdBQUc7QUFDSDtBQUNBLHNCQUFzQixVQUFVO0FBQ2hDLEdBQUc7O0FBRUg7QUFDQSxxQkFBcUIsVUFBVTtBQUMvQixHQUFHO0FBQ0g7QUFDQSxxQkFBcUIsV0FBVztBQUNoQyxHQUFHO0FBQ0g7QUFDQSxxQkFBcUIsV0FBVztBQUNoQyxHQUFHO0FBQ0g7QUFDQSxxQkFBcUIsV0FBVztBQUNoQyxHQUFHO0FBQ0g7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQyxHQUFHO0FBQ0g7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQyxHQUFHO0FBQ0g7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQyxHQUFHO0FBQ0g7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQyxHQUFHOztBQUVIO0FBQ0EscUJBQXFCLDJCQUEyQjtBQUNoRCxHQUFHOztBQUVIO0FBQ0EscUJBQXFCLHdCQUF3QjtBQUM3QyxHQUFHO0FBQ0g7QUFDQSxxQkFBcUIseUJBQXlCO0FBQzlDLEdBQUc7QUFDSDtBQUNBLHFCQUFxQix5QkFBeUI7QUFDOUMsR0FBRztBQUNIO0FBQ0EscUJBQXFCLHlCQUF5QjtBQUM5QyxHQUFHO0FBQ0g7QUFDQSxvQkFBb0IsMEJBQTBCO0FBQzlDLEdBQUc7QUFDSDtBQUNBLG9CQUFvQiwwQkFBMEI7QUFDOUMsR0FBRztBQUNIO0FBQ0Esb0JBQW9CLDBCQUEwQjtBQUM5QyxHQUFHO0FBQ0g7QUFDQSxvQkFBb0IsMEJBQTBCO0FBQzlDLEdBQUc7O0FBRUg7QUFDQSxxQkFBcUIseUNBQXlDO0FBQzlELEdBQUc7O0FBRUg7QUFDQSxvQkFBb0IsV0FBVztBQUMvQixHQUFHO0FBQ0g7QUFDQSxvQkFBb0IsV0FBVztBQUMvQjs7QUFFQTtBQUNBLFVBQVUsaUJBQWlCO0FBQzNCLGFBQWEsT0FBTyxFQUFFO0FBQ3RCO0FBQ0EsRUFBRTtBQUNGLDBCQUEwQiwrQ0FBK0MsRUFBRTs7QUFFM0UsaUNBQWlDOztBQUVqQztBQUNBO0FBQ0E7QUFDQSx1RUFBdUUsYUFBYTtBQUNwRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtRUFBbUU7O0FBRW5FLHdEQUF3RCx5Q0FBeUM7O0FBRWpHLHlCQUF5QiwyQkFBMkIsaUJBQWlCO0FBQ3JFOztBQUVBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsVUFBVTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDREQUE0RCxnRUFBZ0U7QUFDNUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixVQUFVO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrREFBK0QsbUVBQW1FO0FBQ2xJOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtEQUErRCxtRUFBbUU7QUFDbEk7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0RBQStELG1FQUFtRTtBQUNsSTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLG1CQUFPLENBQUMsTUFBWTs7QUFFckM7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw2Q0FBNkMsV0FBVztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFD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QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0VBQWtFLGdFQUFnRTtBQUNsSTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQ0FBaUMsSUFBSSxHQUFHLFVBQVU7QUFDbEQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7O0FBRUEsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6InZlbmRvcn4yMDNlMDcxOC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnaXMtY2FsbGFibGUnKTtcblxudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBmb3JFYWNoQXJyYXkgPSBmdW5jdGlvbiBmb3JFYWNoQXJyYXkoYXJyYXksIGl0ZXJhdG9yLCByZWNlaXZlcikge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChhcnJheSwgaSkpIHtcbiAgICAgICAgICAgIGlmIChyZWNlaXZlciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3IoYXJyYXlbaV0sIGksIGFycmF5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChyZWNlaXZlciwgYXJyYXlbaV0sIGksIGFycmF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciBmb3JFYWNoU3RyaW5nID0gZnVuY3Rpb24gZm9yRWFjaFN0cmluZyhzdHJpbmcsIGl0ZXJhdG9yLCByZWNlaXZlcikge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzdHJpbmcubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgLy8gbm8gc3VjaCB0aGluZyBhcyBhIHNwYXJzZSBzdHJpbmcuXG4gICAgICAgIGlmIChyZWNlaXZlciA9PSBudWxsKSB7XG4gICAgICAgICAgICBpdGVyYXRvcihzdHJpbmcuY2hhckF0KGkpLCBpLCBzdHJpbmcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChyZWNlaXZlciwgc3RyaW5nLmNoYXJBdChpKSwgaSwgc3RyaW5nKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciBmb3JFYWNoT2JqZWN0ID0gZnVuY3Rpb24gZm9yRWFjaE9iamVjdChvYmplY3QsIGl0ZXJhdG9yLCByZWNlaXZlcikge1xuICAgIGZvciAodmFyIGsgaW4gb2JqZWN0KSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgaykpIHtcbiAgICAgICAgICAgIGlmIChyZWNlaXZlciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3Iob2JqZWN0W2tdLCBrLCBvYmplY3QpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpdGVyYXRvci5jYWxsKHJlY2VpdmVyLCBvYmplY3Rba10sIGssIG9iamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2gobGlzdCwgaXRlcmF0b3IsIHRoaXNBcmcpIHtcbiAgICBpZiAoIWlzQ2FsbGFibGUoaXRlcmF0b3IpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2l0ZXJhdG9yIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgIH1cblxuICAgIHZhciByZWNlaXZlcjtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSAzKSB7XG4gICAgICAgIHJlY2VpdmVyID0gdGhpc0FyZztcbiAgICB9XG5cbiAgICBpZiAodG9TdHIuY2FsbChsaXN0KSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgICBmb3JFYWNoQXJyYXkobGlzdCwgaXRlcmF0b3IsIHJlY2VpdmVyKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ID09PSAnc3RyaW5nJykge1xuICAgICAgICBmb3JFYWNoU3RyaW5nKGxpc3QsIGl0ZXJhdG9yLCByZWNlaXZlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yRWFjaE9iamVjdChsaXN0LCBpdGVyYXRvciwgcmVjZWl2ZXIpO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZm9yRWFjaDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgX3NsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH0gcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyByZXR1cm4gYXJyOyB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkgeyByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpOyB9IGVsc2UgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTsgfSB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG52YXIgQk4gPSByZXF1aXJlKCdibi5qcycpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCdieXRlYnVmZmVyJyksXG4gICAgTG9uZyA9IF9yZXF1aXJlLkxvbmc7XG5cbnZhciBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKTtcblxudmFyIHR5cGVzID0ge1xuICBieXRlczogZnVuY3Rpb24gYnl0ZXMoKSB7XG4gICAgcmV0dXJuIFtieXRlYnVmXTtcbiAgfSxcbiAgc3RyaW5nOiBmdW5jdGlvbiBzdHJpbmcoKSB7XG4gICAgcmV0dXJuIFtfc3RyaW5nXTtcbiAgfSxcbiAgdmVjdG9yOiBmdW5jdGlvbiB2ZWN0b3IodHlwZSkge1xuICAgIHZhciBzb3J0ZWQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHRydWU7XG4gICAgcmV0dXJuIFtfdmVjdG9yLCB7IHR5cGU6IHR5cGUsIHNvcnRlZDogc29ydGVkIH1dO1xuICB9LFxuICBvcHRpb25hbDogZnVuY3Rpb24gb3B0aW9uYWwodHlwZSkge1xuICAgIHJldHVybiBbX29wdGlvbmFsLCB7IHR5cGU6IHR5cGUgfV07XG4gIH0sXG4gIHRpbWU6IGZ1bmN0aW9uIHRpbWUoKSB7XG4gICAgcmV0dXJuIFtfdGltZTJdO1xuICB9LFxuICBtYXA6IGZ1bmN0aW9uIG1hcChhbm5vdGF0aW9uKSB7XG4gICAgcmV0dXJuIFtfbWFwLCB7IGFubm90YXRpb246IGFubm90YXRpb24gfV07XG4gIH0sXG4gIHN0YXRpY192YXJpYW50OiBmdW5jdGlvbiBzdGF0aWNfdmFyaWFudCh0eXBlcykge1xuICAgIHJldHVybiBbX3N0YXRpY192YXJpYW50LCB7IHR5cGVzOiB0eXBlcyB9XTtcbiAgfSxcblxuICBmaXhlZF9zdHJpbmcxNjogZnVuY3Rpb24gZml4ZWRfc3RyaW5nMTYoKSB7XG4gICAgcmV0dXJuIFtfc3RyaW5nLCB7IG1heExlbjogMTYgfV07XG4gIH0sXG4gIGZpeGVkX3N0cmluZzMyOiBmdW5jdGlvbiBmaXhlZF9zdHJpbmczMigpIHtcbiAgICByZXR1cm4gW19zdHJpbmcsIHsgbWF4TGVuOiAzMiB9XTtcbiAgfSxcblxuICBmaXhlZF9ieXRlczE2OiBmdW5jdGlvbiBmaXhlZF9ieXRlczE2KCkge1xuICAgIHJldHVybiBbYnl0ZWJ1ZiwgeyBsZW46IDE2IH1dO1xuICB9LFxuICBmaXhlZF9ieXRlczIwOiBmdW5jdGlvbiBmaXhlZF9ieXRlczIwKCkge1xuICAgIHJldHVybiBbYnl0ZWJ1ZiwgeyBsZW46IDIwIH1dO1xuICB9LFxuICBmaXhlZF9ieXRlczI4OiBmdW5jdGlvbiBmaXhlZF9ieXRlczI4KCkge1xuICAgIHJldHVybiBbYnl0ZWJ1ZiwgeyBsZW46IDI4IH1dO1xuICB9LFxuICBmaXhlZF9ieXRlczMyOiBmdW5jdGlvbiBmaXhlZF9ieXRlczMyKCkge1xuICAgIHJldHVybiBbYnl0ZWJ1ZiwgeyBsZW46IDMyIH1dO1xuICB9LFxuICBmaXhlZF9ieXRlczMzOiBmdW5jdGlvbiBmaXhlZF9ieXRlczMzKCkge1xuICAgIHJldHVybiBbYnl0ZWJ1ZiwgeyBsZW46IDMzIH1dO1xuICB9LFxuICBmaXhlZF9ieXRlczY0OiBmdW5jdGlvbiBmaXhlZF9ieXRlczY0KCkge1xuICAgIHJldHVybiBbYnl0ZWJ1ZiwgeyBsZW46IDY0IH1dO1xuICB9LFxuICBmaXhlZF9ieXRlczY1OiBmdW5jdGlvbiBmaXhlZF9ieXRlczY1KCkge1xuICAgIHJldHVybiBbYnl0ZWJ1ZiwgeyBsZW46IDY1IH1dO1xuICB9LFxuXG4gIHVpbnQ4OiBmdW5jdGlvbiB1aW50OCgpIHtcbiAgICByZXR1cm4gW2ludGJ1ZiwgeyBiaXRzOiA4IH1dO1xuICB9LFxuICB1aW50MTY6IGZ1bmN0aW9uIHVpbnQxNigpIHtcbiAgICByZXR1cm4gW2ludGJ1ZiwgeyBiaXRzOiAxNiB9XTtcbiAgfSxcbiAgdWludDMyOiBmdW5jdGlvbiB1aW50MzIoKSB7XG4gICAgcmV0dXJuIFtpbnRidWYsIHsgYml0czogMzIgfV07XG4gIH0sXG4gIHVpbnQ2NDogZnVuY3Rpb24gdWludDY0KCkge1xuICAgIHJldHVybiBbaW50YnVmLCB7IGJpdHM6IDY0IH1dO1xuICB9LFxuICB1aW50MTI4OiBmdW5jdGlvbiB1aW50MTI4KCkge1xuICAgIHJldHVybiBbYm5idWYsIHsgYml0czogMTI4IH1dO1xuICB9LFxuICB1aW50MjI0OiBmdW5jdGlvbiB1aW50MjI0KCkge1xuICAgIHJldHVybiBbYm5idWYsIHsgYml0czogMjI0IH1dO1xuICB9LFxuICB1aW50MjU2OiBmdW5jdGlvbiB1aW50MjU2KCkge1xuICAgIHJldHVybiBbYm5idWYsIHsgYml0czogMjU2IH1dO1xuICB9LFxuICB1aW50NTEyOiBmdW5jdGlvbiB1aW50NTEyKCkge1xuICAgIHJldHVybiBbYm5idWYsIHsgYml0czogNTEyIH1dO1xuICB9LFxuXG4gIHZhcnVpbnQzMjogZnVuY3Rpb24gdmFydWludDMyKCkge1xuICAgIHJldHVybiBbaW50YnVmLCB7IGJpdHM6IDMyLCB2YXJpYWJsZTogdHJ1ZSB9XTtcbiAgfSxcblxuICBpbnQ4OiBmdW5jdGlvbiBpbnQ4KCkge1xuICAgIHJldHVybiBbaW50YnVmLCB7IHNpZ25lZDogdHJ1ZSwgYml0czogOCB9XTtcbiAgfSxcbiAgaW50MTY6IGZ1bmN0aW9uIGludDE2KCkge1xuICAgIHJldHVybiBbaW50YnVmLCB7IHNpZ25lZDogdHJ1ZSwgYml0czogMTYgfV07XG4gIH0sXG4gIGludDMyOiBmdW5jdGlvbiBpbnQzMigpIHtcbiAgICByZXR1cm4gW2ludGJ1ZiwgeyBzaWduZWQ6IHRydWUsIGJpdHM6IDMyIH1dO1xuICB9LFxuICBpbnQ2NDogZnVuY3Rpb24gaW50NjQoKSB7XG4gICAgcmV0dXJuIFtpbnRidWYsIHsgc2lnbmVkOiB0cnVlLCBiaXRzOiA2NCB9XTtcbiAgfSxcbiAgaW50MTI4OiBmdW5jdGlvbiBpbnQxMjgoKSB7XG4gICAgcmV0dXJuIFtibmJ1ZiwgeyBzaWduZWQ6IHRydWUsIGJpdHM6IDEyOCB9XTtcbiAgfSxcbiAgaW50MjI0OiBmdW5jdGlvbiBpbnQyMjQoKSB7XG4gICAgcmV0dXJuIFtibmJ1ZiwgeyBzaWduZWQ6IHRydWUsIGJpdHM6IDIyNCB9XTtcbiAgfSxcbiAgaW50MjU2OiBmdW5jdGlvbiBpbnQyNTYoKSB7XG4gICAgcmV0dXJuIFtibmJ1ZiwgeyBzaWduZWQ6IHRydWUsIGJpdHM6IDI1NiB9XTtcbiAgfSxcbiAgaW50NTEyOiBmdW5jdGlvbiBpbnQ1MTIoKSB7XG4gICAgcmV0dXJuIFtibmJ1ZiwgeyBzaWduZWQ6IHRydWUsIGJpdHM6IDUxMiB9XTtcbiAgfSxcblxuICB2YXJpbnQzMjogZnVuY3Rpb24gdmFyaW50MzIoKSB7XG4gICAgcmV0dXJuIFtpbnRidWYsIHsgc2lnbmVkOiB0cnVlLCBiaXRzOiAzMiwgdmFyaWFibGU6IHRydWUgfV07XG4gIH0sXG5cbiAgZmxvYXQzMjogZnVuY3Rpb24gZmxvYXQzMigpIHtcbiAgICByZXR1cm4gW2Zsb2F0LCB7IGJpdHM6IDMyIH1dO1xuICB9LFxuICBmbG9hdDY0OiBmdW5jdGlvbiBmbG9hdDY0KCkge1xuICAgIHJldHVybiBbZmxvYXQsIHsgYml0czogNjQgfV07XG4gIH1cblxuICAvKlxuICAgIEBhcmcge1NlcmlhbGl6ZXJDb25maWd9IGNvbmZpZ1xuICAgIEByZXR1cm4ge29iamVjdH0ge1t0eXBlTmFtZV06IGZ1bmN0aW9uKGFyZ3MpfVxuICAqL1xufTttb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7IGRlZmF1bHRzOiBmYWxzZSwgZGVidWc6IGZhbHNlLCBjdXN0b21UeXBlczoge30gfSwgY29uZmlnKTtcblxuICB2YXIgYWxsVHlwZXMgPSBPYmplY3QuYXNzaWduKHt9LCB0eXBlcywgY29uZmlnLmN1c3RvbVR5cGVzKTtcblxuICB2YXIgY3JlYXRlVHlwZVJlZHVjZXIgPSBmdW5jdGlvbiBjcmVhdGVUeXBlUmVkdWNlcihiYXNlVHlwZXMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGN1c3RvbVR5cGVzLCBuYW1lKSB7XG4gICAgICBjdXN0b21UeXBlc1tuYW1lXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHR5cGUgPSBjcmVhdGVUeXBlKG5hbWUsIGNvbmZpZywgYXJncywgYmFzZVR5cGVzLCBhbGxUeXBlcywgY3VzdG9tVHlwZXMpO1xuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICAgIH07XG4gICAgICByZXR1cm4gY3VzdG9tVHlwZXM7XG4gICAgfTtcbiAgfTtcblxuICB2YXIgYmFzZVR5cGVzID0gT2JqZWN0LmtleXModHlwZXMpLnJlZHVjZShjcmVhdGVUeXBlUmVkdWNlcigpLCB7fSk7XG5cbiAgdmFyIGN1c3RvbVR5cGVzID0gT2JqZWN0LmtleXMoY29uZmlnLmN1c3RvbVR5cGVzIHx8IHt9KS5yZWR1Y2UoY3JlYXRlVHlwZVJlZHVjZXIoYmFzZVR5cGVzKSwge30pO1xuXG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBiYXNlVHlwZXMsIGN1c3RvbVR5cGVzLCB7IGNvbmZpZzogY29uZmlnIH0pO1xufTtcblxuLyoqXG4gICAgQGFyZ3Mge3N0cmluZ30gdHlwZU5hbWUgLSBtYXRjaGVzIHR5cGVzW11cbiAgICBAYXJncyB7c3RyaW5nfSBjb25maWcgLSBBZGRpdGlvbmFsIGFyZ3VtZW50cyBmb3IgdHlwZXNcbiovXG5mdW5jdGlvbiBjcmVhdGVUeXBlKHR5cGVOYW1lLCBjb25maWcsIGFyZ3MsIGJhc2VUeXBlcywgYWxsVHlwZXMsIGN1c3RvbVR5cGVzKSB7XG4gIHZhciBUeXBlID0gYmFzZVR5cGVzID8gYWxsVHlwZXNbdHlwZU5hbWVdIDogdHlwZXNbdHlwZU5hbWVdO1xuXG4gIHZhciBfVHlwZSA9IFR5cGUuYXBwbHkodW5kZWZpbmVkLCBfdG9Db25zdW1hYmxlQXJyYXkoYXJncykpLFxuICAgICAgX1R5cGUyID0gX3NsaWNlZFRvQXJyYXkoX1R5cGUsIDIpLFxuICAgICAgZm4gPSBfVHlwZTJbMF0sXG4gICAgICBfVHlwZTIkID0gX1R5cGUyWzFdLFxuICAgICAgdiA9IF9UeXBlMiQgPT09IHVuZGVmaW5lZCA/IHt9IDogX1R5cGUyJDtcblxuICB2YXIgdmFsaWRhdGlvbiA9IE9iamVjdC5hc3NpZ24odiwgY29uZmlnKTtcbiAgdmFsaWRhdGlvbi50eXBlTmFtZSA9IHR5cGVOYW1lO1xuICB2YXIgdHlwZSA9IGZuKHZhbGlkYXRpb24sIGJhc2VUeXBlcywgY3VzdG9tVHlwZXMpO1xuICB0eXBlLnR5cGVOYW1lID0gdHlwZU5hbWU7XG4gIHJldHVybiB0eXBlO1xufVxuXG52YXIgX21hcCA9IGZ1bmN0aW9uIF9tYXAodmFsaWRhdGlvbikge1xuICB2YXIgX3ZhbGlkYXRpb24kYW5ub3RhdGlvID0gX3NsaWNlZFRvQXJyYXkodmFsaWRhdGlvbi5hbm5vdGF0aW9uLCAyKSxcbiAgICAgIHR5cGUxID0gX3ZhbGlkYXRpb24kYW5ub3RhdGlvWzBdLFxuICAgICAgdHlwZTIgPSBfdmFsaWRhdGlvbiRhbm5vdGF0aW9bMV07XG5cbiAgaWYgKCFpc1NlcmlhbGl6ZXIodHlwZTEpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbWFwPHR5cGUxLCA+IHVua25vd24nKTtcbiAgfVxuICBpZiAoIWlzU2VyaWFsaXplcih0eXBlMikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdtYXA8LCB0eXBlMj4gdW5rbm93bicpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBmcm9tQnl0ZUJ1ZmZlcjogZnVuY3Rpb24gZnJvbUJ5dGVCdWZmZXIoYikge1xuICAgICAgdmFyIHNpemUgPSBiLnJlYWRWYXJpbnQzMigpO1xuICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgcmVzdWx0W3R5cGUxLmZyb21CeXRlQnVmZmVyKGIpXSA9IHR5cGUyLmZyb21CeXRlQnVmZmVyKGIpO1xuICAgICAgfVxuICAgICAgaWYgKHZhbGlkYXRpb24uZGVidWcpIHtcbiAgICAgICAgY29uc29sZS5sb2coJzB4JyArIHNpemUudG9TdHJpbmcoMTYpLCAnKG1hcC5mcm9tQnl0ZUJ1ZmZlciBsZW5ndGgpJywgcmVzdWx0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcbiAgICBhcHBlbmRCeXRlQnVmZmVyOiBmdW5jdGlvbiBhcHBlbmRCeXRlQnVmZmVyKGIsIHZhbHVlKSB7XG4gICAgICB2YWxpZGF0ZSh2YWx1ZSwgdmFsaWRhdGlvbik7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcbiAgICAgIGIud3JpdGVWYXJpbnQzMihrZXlzLmxlbmd0aCk7XG4gICAgICBpZiAodmFsaWRhdGlvbi5kZWJ1Zykge1xuICAgICAgICBjb25zb2xlLmxvZygnMHgnICsga2V5cy5sZW5ndGgudG9TdHJpbmcoMTYpLCAnKG1hcC5hcHBlbmRCeXRlQnVmZmVyIGxlbmd0aCknLCBrZXlzKTtcbiAgICAgIH1cbiAgICAgIC8vIGlmKHNvcnRlZCA9PT0gdHJ1ZSkge1xuICAgICAgLy8gICB2YWx1ZSA9IHNvcnRLZXlzKHR5cGUxLCBPYmplY3QuYXNzaWduKHt9LCB2YWx1ZSkpXG4gICAgICAvLyB9XG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0ga2V5c1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgbyA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICAgICAgdmFyIHZhbHVlMiA9IHZhbHVlW29dO1xuICAgICAgICAgIHR5cGUxLmFwcGVuZEJ5dGVCdWZmZXIoYiwgbyk7XG4gICAgICAgICAgdHlwZTIuYXBwZW5kQnl0ZUJ1ZmZlcihiLCB2YWx1ZTIpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAgIF9pdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGZyb21PYmplY3Q6IGZ1bmN0aW9uIGZyb21PYmplY3QodmFsdWUpIHtcbiAgICAgIHZhbGlkYXRlKHZhbHVlLCB2YWxpZGF0aW9uKTtcbiAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgIC8vIGlmKHNvcnRlZCA9PT0gdHJ1ZSkge1xuICAgICAgLy8gICB2YWx1ZSA9IHNvcnRLZXlzKHR5cGUxLCBPYmplY3QuYXNzaWduKHt9LCB2YWx1ZSkpXG4gICAgICAvLyB9XG4gICAgICBmb3IgKHZhciBvIGluIHZhbHVlKSB7XG4gICAgICAgIHJlc3VsdFt0eXBlMS5mcm9tT2JqZWN0KG8pXSA9IHR5cGUyLmZyb21PYmplY3QodmFsdWVbb10pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuICAgIHRvT2JqZWN0OiBmdW5jdGlvbiB0b09iamVjdCh2YWx1ZSkge1xuICAgICAgaWYgKHZhbGlkYXRpb24uZGVmYXVsdHMgJiYgdmFsdWUgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gX2RlZmluZVByb3BlcnR5KHt9LCB0eXBlMS50b09iamVjdChudWxsKSwgdHlwZTIudG9PYmplY3QobnVsbCkpO1xuICAgICAgfVxuICAgICAgdmFsaWRhdGUodmFsdWUsIHZhbGlkYXRpb24pO1xuICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgLy8gaWYoc29ydGVkID09PSB0cnVlKSB7XG4gICAgICAvLyAgIHZhbHVlID0gc29ydEtleSh0eXBlMSwgT2JqZWN0LmFzc2lnbih7fSwgdmFsdWUpKVxuICAgICAgLy8gfVxuICAgICAgZm9yICh2YXIgbyBpbiB2YWx1ZSkge1xuICAgICAgICByZXN1bHRbdHlwZTEudG9PYmplY3QobyldID0gdHlwZTIudG9PYmplY3QodmFsdWVbb10pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH07XG59O1xuXG52YXIgX3N0YXRpY192YXJpYW50ID0gZnVuY3Rpb24gX3N0YXRpY192YXJpYW50KHZhbGlkYXRpb24pIHtcbiAgdmFyIHR5cGVzID0gdmFsaWRhdGlvbi50eXBlcztcblxuICByZXR1cm4ge1xuICAgIGZyb21CeXRlQnVmZmVyOiBmdW5jdGlvbiBmcm9tQnl0ZUJ1ZmZlcihiKSB7XG4gICAgICB2YXIgdHlwZVBvc2l0aW9uID0gYi5yZWFkVmFyaW50MzIoKTtcbiAgICAgIHZhciB0eXBlID0gdHlwZXNbdHlwZVBvc2l0aW9uXTtcbiAgICAgIGlmICh2YWxpZGF0aW9uLmRlYnVnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ3N0YXRpY192YXJpYW50IGlkICcgKyB0eXBlUG9zaXRpb24gKyAnICgweCcgKyB0eXBlUG9zaXRpb24udG9TdHJpbmcoMTYpICsgJyknKTtcbiAgICAgIH1cbiAgICAgIGFzc2VydCh0eXBlLCAnc3RhdGljX3ZhcmlhbnQgaW52YWxpZCB0eXBlIHBvc2l0aW9uICcgKyB0eXBlUG9zaXRpb24pO1xuICAgICAgcmV0dXJuIFt0eXBlUG9zaXRpb24sIHR5cGUuZnJvbUJ5dGVCdWZmZXIoYildO1xuICAgIH0sXG4gICAgYXBwZW5kQnl0ZUJ1ZmZlcjogZnVuY3Rpb24gYXBwZW5kQnl0ZUJ1ZmZlcihiLCBvYmplY3QpIHtcbiAgICAgIGFzc2VydChBcnJheS5pc0FycmF5KG9iamVjdCkgJiYgb2JqZWN0Lmxlbmd0aCA9PT0gMiwgJ1JlcXVpcmVkIHR1cGxlJyk7XG4gICAgICB2YXIgdHlwZVBvc2l0aW9uID0gb2JqZWN0WzBdO1xuICAgICAgdmFyIHR5cGUgPSB0eXBlc1t0eXBlUG9zaXRpb25dO1xuICAgICAgYXNzZXJ0KHR5cGUsICd0eXBlICcgKyB0eXBlUG9zaXRpb24pO1xuICAgICAgYi53cml0ZVZhcmludDMyKHR5cGVQb3NpdGlvbik7XG4gICAgICB0eXBlLmFwcGVuZEJ5dGVCdWZmZXIoYiwgb2JqZWN0WzFdKTtcbiAgICB9LFxuICAgIGZyb21PYmplY3Q6IGZ1bmN0aW9uIGZyb21PYmplY3Qob2JqZWN0KSB7XG4gICAgICBhc3NlcnQoQXJyYXkuaXNBcnJheShvYmplY3QpICYmIG9iamVjdC5sZW5ndGggPT09IDIsICdSZXF1aXJlZCB0dXBsZScpO1xuICAgICAgdmFyIHR5cGVQb3NpdGlvbiA9IG9iamVjdFswXTtcbiAgICAgIHZhciB0eXBlID0gdHlwZXNbdHlwZVBvc2l0aW9uXTtcbiAgICAgIGFzc2VydCh0eXBlLCAndHlwZSAnICsgdHlwZVBvc2l0aW9uKTtcbiAgICAgIHJldHVybiBbdHlwZVBvc2l0aW9uLCB0eXBlLmZyb21PYmplY3Qob2JqZWN0WzFdKV07XG4gICAgfSxcbiAgICB0b09iamVjdDogZnVuY3Rpb24gdG9PYmplY3Qob2JqZWN0KSB7XG4gICAgICBpZiAodmFsaWRhdGlvbi5kZWZhdWx0cyAmJiBvYmplY3QgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gWzAsIHR5cGVzWzBdLnRvT2JqZWN0KG51bGwsIGRlYnVnKV07XG4gICAgICB9XG4gICAgICBhc3NlcnQoQXJyYXkuaXNBcnJheShvYmplY3QpICYmIG9iamVjdC5sZW5ndGggPT09IDIsICdSZXF1aXJlZCB0dXBsZScpO1xuICAgICAgdmFyIHR5cGVQb3NpdGlvbiA9IG9iamVjdFswXTtcbiAgICAgIHZhciB0eXBlID0gdHlwZXNbdHlwZVBvc2l0aW9uXTtcbiAgICAgIGFzc2VydCh0eXBlLCAndHlwZSAnICsgdHlwZVBvc2l0aW9uKTtcbiAgICAgIHJldHVybiBbdHlwZVBvc2l0aW9uLCB0eXBlLnRvT2JqZWN0KG9iamVjdFsxXSldO1xuICAgIH1cbiAgfTtcbn07XG5cbnZhciBfdmVjdG9yID0gZnVuY3Rpb24gX3ZlY3Rvcih2YWxpZGF0aW9uKSB7XG4gIHZhciB0eXBlID0gdmFsaWRhdGlvbi50eXBlLFxuICAgICAgc29ydGVkID0gdmFsaWRhdGlvbi5zb3J0ZWQ7XG5cbiAgaWYgKCFpc1NlcmlhbGl6ZXIodHlwZSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2ZWN0b3IgdHlwZSBzaG91bGQgYmUgYSBzZXJpYWxpemVyJyk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGZyb21CeXRlQnVmZmVyOiBmdW5jdGlvbiBmcm9tQnl0ZUJ1ZmZlcihiKSB7XG4gICAgICB2YXIgc2l6ZSA9IGIucmVhZFZhcmludDMyKCk7XG4gICAgICBpZiAodmFsaWRhdGlvbi5kZWJ1Zykge1xuICAgICAgICBjb25zb2xlLmxvZygnZnJvbUJ5dGVCdWZmZXIgdmVjdG9yIGxlbmd0aCcsIHNpemUsICcoMHgnICsgc2l6ZS50b1N0cmluZygxNikgKyAnKScpO1xuICAgICAgfVxuICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgcmVzdWx0LnB1c2godHlwZS5mcm9tQnl0ZUJ1ZmZlcihiKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG4gICAgYXBwZW5kQnl0ZUJ1ZmZlcjogZnVuY3Rpb24gYXBwZW5kQnl0ZUJ1ZmZlcihiLCB2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgdmFsdWUgPSBbXTtcbiAgICAgIH1cbiAgICAgIHZhbGlkYXRlKHZhbHVlLCB2YWxpZGF0aW9uKTtcbiAgICAgIGIud3JpdGVWYXJpbnQzMih2YWx1ZS5sZW5ndGgpO1xuICAgICAgaWYgKHNvcnRlZCA9PT0gdHJ1ZSkge1xuICAgICAgICB2YWx1ZSA9IHNvcnQodHlwZSwgT2JqZWN0LmFzc2lnbihbXSwgdmFsdWUpKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWxpZGF0aW9uLmRlYnVnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCcweCcgKyB2YWx1ZS5sZW5ndGgudG9TdHJpbmcoMTYpLCAnKHZlY3Rvci5hcHBlbmRCeXRlQnVmZmVyIGxlbmd0aCknLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IHZhbHVlW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAyOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gKF9zdGVwMiA9IF9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlKSB7XG4gICAgICAgICAgdmFyIG8gPSBfc3RlcDIudmFsdWU7XG5cbiAgICAgICAgICB0eXBlLmFwcGVuZEJ5dGVCdWZmZXIoYiwgbyk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuICAgICAgICBfaXRlcmF0b3JFcnJvcjIgPSBlcnI7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgJiYgX2l0ZXJhdG9yMi5yZXR1cm4pIHtcbiAgICAgICAgICAgIF9pdGVyYXRvcjIucmV0dXJuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjIpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGZyb21PYmplY3Q6IGZ1bmN0aW9uIGZyb21PYmplY3QodmFsdWUpIHtcbiAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgIHZhbHVlID0gW107XG4gICAgICB9XG4gICAgICB2YWxpZGF0ZSh2YWx1ZSwgdmFsaWRhdGlvbik7XG4gICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlO1xuICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMyA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yMyA9IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMyA9IHZhbHVlW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAzOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gKF9zdGVwMyA9IF9pdGVyYXRvcjMubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlKSB7XG4gICAgICAgICAgdmFyIG8gPSBfc3RlcDMudmFsdWU7XG5cbiAgICAgICAgICByZXN1bHQucHVzaCh0eXBlLmZyb21PYmplY3QobykpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IzID0gdHJ1ZTtcbiAgICAgICAgX2l0ZXJhdG9yRXJyb3IzID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zICYmIF9pdGVyYXRvcjMucmV0dXJuKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3IzLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IzKSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzb3J0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgcmVzdWx0ID0gc29ydCh0eXBlLCBPYmplY3QuYXNzaWduKFtdLCByZXN1bHQpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcbiAgICB0b09iamVjdDogZnVuY3Rpb24gdG9PYmplY3QodmFsdWUpIHtcbiAgICAgIGlmICh2YWxpZGF0aW9uLmRlZmF1bHRzICYmIHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFt0eXBlLnRvT2JqZWN0KHZhbHVlKV07XG4gICAgICB9XG4gICAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICB2YWx1ZSA9IFtdO1xuICAgICAgfVxuICAgICAgdmFsaWRhdGUodmFsdWUsIHZhbGlkYXRpb24pO1xuICAgICAgaWYgKHNvcnRlZCA9PT0gdHJ1ZSkge1xuICAgICAgICB2YWx1ZSA9IHNvcnQodHlwZSwgT2JqZWN0LmFzc2lnbihbXSwgdmFsdWUpKTtcbiAgICAgIH1cbiAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCA9IHRydWU7XG4gICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3I0ID0gZmFsc2U7XG4gICAgICB2YXIgX2l0ZXJhdG9yRXJyb3I0ID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3I0ID0gdmFsdWVbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDQ7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgPSAoX3N0ZXA0ID0gX2l0ZXJhdG9yNC5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgbyA9IF9zdGVwNC52YWx1ZTtcblxuICAgICAgICAgIHJlc3VsdC5wdXNoKHR5cGUudG9PYmplY3QobykpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3I0ID0gdHJ1ZTtcbiAgICAgICAgX2l0ZXJhdG9yRXJyb3I0ID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ICYmIF9pdGVyYXRvcjQucmV0dXJuKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3I0LnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3I0KSB7XG4gICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9O1xufTtcblxudmFyIF9vcHRpb25hbCA9IGZ1bmN0aW9uIF9vcHRpb25hbCh2YWxpZGF0aW9uKSB7XG4gIHZhciB0eXBlID0gdmFsaWRhdGlvbi50eXBlO1xuXG4gIGlmICghaXNTZXJpYWxpemVyKHR5cGUpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uYWwgcGFyYW1ldGVyIHNob3VsZCBiZSBhIHNlcmlhbGl6ZXInKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZnJvbUJ5dGVCdWZmZXI6IGZ1bmN0aW9uIGZyb21CeXRlQnVmZmVyKGIpIHtcbiAgICAgIGlmICghKGIucmVhZFVpbnQ4KCkgPT09IDEpKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHR5cGUuZnJvbUJ5dGVCdWZmZXIoYik7XG4gICAgfSxcbiAgICBhcHBlbmRCeXRlQnVmZmVyOiBmdW5jdGlvbiBhcHBlbmRCeXRlQnVmZmVyKGIsIHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICBiLndyaXRlVWludDgoMSk7XG4gICAgICAgIHR5cGUuYXBwZW5kQnl0ZUJ1ZmZlcihiLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBiLndyaXRlVWludDgoMCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBmcm9tT2JqZWN0OiBmdW5jdGlvbiBmcm9tT2JqZWN0KHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0eXBlLmZyb21PYmplY3QodmFsdWUpO1xuICAgIH0sXG4gICAgdG9PYmplY3Q6IGZ1bmN0aW9uIHRvT2JqZWN0KHZhbHVlKSB7XG4gICAgICAvLyB0b09iamVjdCBpcyBvbmx5IG51bGwgc2F2ZSBpZiBkZWZhdWx0cyBpcyB0cnVlXG4gICAgICB2YXIgcmVzdWx0VmFsdWUgPSB2b2lkIDA7XG4gICAgICBpZiAodmFsdWUgPT0gbnVsbCAmJiAhdmFsaWRhdGlvbi5kZWZhdWx0cykge1xuICAgICAgICByZXN1bHRWYWx1ZSA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHRWYWx1ZSA9IHR5cGUudG9PYmplY3QodmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdFZhbHVlO1xuICAgIH1cbiAgfTtcbn07XG5cbnZhciBpbnRidWZUeXBlID0gZnVuY3Rpb24gaW50YnVmVHlwZShfcmVmMikge1xuICB2YXIgX3JlZjIkc2lnbmVkID0gX3JlZjIuc2lnbmVkLFxuICAgICAgc2lnbmVkID0gX3JlZjIkc2lnbmVkID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWYyJHNpZ25lZCxcbiAgICAgIGJpdHMgPSBfcmVmMi5iaXRzLFxuICAgICAgdmFyaWFibGUgPSBfcmVmMi52YXJpYWJsZTtcbiAgcmV0dXJuIHZhcmlhYmxlID8gJ1ZhcmludCcgKyBiaXRzICsgKHNpZ25lZCA/ICdaaWdaYWcnIDogJycpIDogJycgKyAoc2lnbmVkID8gJ0ludCcgOiAnVWludCcpICsgYml0cztcbn07XG5cbnZhciBpbnRidWYgPSBmdW5jdGlvbiBpbnRidWYodmFsaWRhdGlvbikge1xuICByZXR1cm4ge1xuICAgIGZyb21CeXRlQnVmZmVyOiBmdW5jdGlvbiBmcm9tQnl0ZUJ1ZmZlcihiKSB7XG4gICAgICB2YXIgdmFsdWUgPSBiWydyZWFkJyArIGludGJ1ZlR5cGUodmFsaWRhdGlvbildKCk7XG4gICAgICByZXR1cm4gTG9uZy5pc0xvbmcodmFsdWUpID8gdmFsdWUudG9TdHJpbmcoKSA6IHZhbHVlO1xuICAgIH0sXG4gICAgYXBwZW5kQnl0ZUJ1ZmZlcjogZnVuY3Rpb24gYXBwZW5kQnl0ZUJ1ZmZlcihiLCB2YWx1ZSkge1xuICAgICAgLy8gdmFsaWRhdGVJbnQodmFsdWUsIHZhbGlkYXRpb24pXG4gICAgICAvLyB2YWx1ZSA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyBMb25nLmZyb21TdHJpbmcodmFsdWUpIDogdmFsdWVcbiAgICAgIGJbJ3dyaXRlJyArIGludGJ1ZlR5cGUodmFsaWRhdGlvbildKHZhbHVlKTtcbiAgICB9LFxuICAgIGZyb21PYmplY3Q6IGZ1bmN0aW9uIGZyb21PYmplY3QodmFsdWUpIHtcbiAgICAgIHZhbGlkYXRlSW50KHZhbHVlLCB2YWxpZGF0aW9uKTtcbiAgICAgIC8vIGlmKHZhbGlkYXRpb24uYml0cyA+IDUzICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpXG4gICAgICAvLyAgICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpXG5cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICAgIHRvT2JqZWN0OiBmdW5jdGlvbiB0b09iamVjdCh2YWx1ZSkge1xuICAgICAgaWYgKHZhbGlkYXRpb24uZGVmYXVsdHMgJiYgdmFsdWUgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGlvbi5iaXRzID4gNTMgPyAnMCcgOiAwO1xuICAgICAgfVxuXG4gICAgICB2YWxpZGF0ZUludCh2YWx1ZSwgdmFsaWRhdGlvbik7XG4gICAgICAvLyBpZih2YWxpZGF0aW9uLmJpdHMgPiA1MyAmJiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKVxuICAgICAgLy8gICAgIHZhbHVlID0gU3RyaW5nKHZhbHVlKVxuXG4gICAgICByZXR1cm4gTG9uZy5pc0xvbmcodmFsdWUpID8gdmFsdWUudG9TdHJpbmcoKSA6IHZhbHVlO1xuICAgIH1cbiAgfTtcbn07XG5cbi8qKiBCaWcgTnVtYmVycyAoPiA2NCBiaXRzKSAqL1xudmFyIGJuYnVmID0gZnVuY3Rpb24gYm5idWYodmFsaWRhdGlvbikge1xuICB2YXIgX3ZhbGlkYXRpb24kc2lnbmVkID0gdmFsaWRhdGlvbi5zaWduZWQsXG4gICAgICBzaWduZWQgPSBfdmFsaWRhdGlvbiRzaWduZWQgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogX3ZhbGlkYXRpb24kc2lnbmVkLFxuICAgICAgYml0cyA9IHZhbGlkYXRpb24uYml0cztcblxuICB2YXIgc2l6ZSA9IGJpdHMgLyA4O1xuICByZXR1cm4ge1xuICAgIGZyb21CeXRlQnVmZmVyOiBmdW5jdGlvbiBmcm9tQnl0ZUJ1ZmZlcihiKSB7XG4gICAgICB2YXIgYmNvcHkgPSBiLmNvcHkoYi5vZmZzZXQsIGIub2Zmc2V0ICsgc2l6ZSk7XG4gICAgICBiLnNraXAoc2l6ZSk7XG5cbiAgICAgIHZhciBibiA9IG5ldyBCTihiY29weS50b0hleCgpLCAnaGV4Jyk7XG4gICAgICB2YXIgYnVmID0gYm4udG9BcnJheUxpa2UoQnVmZmVyLCAnbGUnLCBzaXplKTsgLy8gY29udmVydCB0byBsaXR0bGUgZW5kaWFuXG4gICAgICBibiA9IG5ldyBCTihidWYudG9TdHJpbmcoJ2hleCcpLCAnaGV4Jyk7XG4gICAgICBpZiAoc2lnbmVkKSB7XG4gICAgICAgIGJuID0gYm4uZnJvbVR3b3MoYml0cyk7XG4gICAgICB9XG4gICAgICB2YXIgdmFsdWUgPSBibi50b1N0cmluZygpO1xuICAgICAgdmFsaWRhdGVJbnQodmFsdWUsIHZhbGlkYXRpb24pO1xuICAgICAgcmV0dXJuIGJpdHMgPiA1MyA/IHZhbHVlIDogYm4udG9OdW1iZXIoKTtcbiAgICB9LFxuICAgIGFwcGVuZEJ5dGVCdWZmZXI6IGZ1bmN0aW9uIGFwcGVuZEJ5dGVCdWZmZXIoYiwgdmFsdWUpIHtcbiAgICAgIHZhbGlkYXRlSW50KHZhbHVlLCB2YWxpZGF0aW9uKTtcbiAgICAgIHZhciBibiA9IG5ldyBCTih2YWx1ZSk7XG4gICAgICBpZiAoc2lnbmVkKSB7XG4gICAgICAgIGJuID0gYm4udG9Ud29zKGJpdHMpO1xuICAgICAgfVxuICAgICAgdmFyIGJ1ZiA9IGJuLnRvQXJyYXlMaWtlKEJ1ZmZlciwgJ2xlJywgc2l6ZSk7XG4gICAgICBiLmFwcGVuZChidWYudG9TdHJpbmcoJ2JpbmFyeScpLCAnYmluYXJ5Jyk7XG4gICAgfSxcbiAgICBmcm9tT2JqZWN0OiBmdW5jdGlvbiBmcm9tT2JqZWN0KHZhbHVlKSB7XG4gICAgICB2YWxpZGF0ZUludCh2YWx1ZSwgdmFsaWRhdGlvbik7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICB0b09iamVjdDogZnVuY3Rpb24gdG9PYmplY3QodmFsdWUpIHtcbiAgICAgIGlmICh2YWxpZGF0aW9uLmRlZmF1bHRzICYmIHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRpb24uYml0cyA+IDUzID8gJzAnIDogMDtcbiAgICAgIH1cbiAgICAgIHZhbGlkYXRlSW50KHZhbHVlLCB2YWxpZGF0aW9uKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH07XG59O1xuXG52YXIgZmxvYXRQb2ludCA9IHJlcXVpcmUoJ2llZWUtZmxvYXQnKTtcblxudmFyIGZsb2F0ID0gZnVuY3Rpb24gZmxvYXQodmFsaWRhdGlvbikge1xuICB2YXIgYml0cyA9IHZhbGlkYXRpb24uYml0cztcblxuICAvLyBhc3NlcnQoYml0cyA9PT0gMzIgfHwgYml0cyA9PT0gNjQsICd1bnN1cHBvcnRlZCBmbG9hdCBiaXQgc2l6ZTogJyArIGJpdHMpXG5cbiAgdmFyIHNpemVOYW1lID0gYml0cyA9PT0gMzIgPyAnRmxvYXQnIDogYml0cyA9PT0gNjQgPyAnRG91YmxlJyA6IG51bGw7XG4gIGFzc2VydChzaXplTmFtZSwgJ3Vuc3VwcG9ydGVkIGZsb2F0IGJpdCBzaXplOiAnICsgYml0cyk7XG4gIHZhciBzaXplID0gYml0cyAvIDg7XG5cbiAgcmV0dXJuIHtcbiAgICBmcm9tQnl0ZUJ1ZmZlcjogZnVuY3Rpb24gZnJvbUJ5dGVCdWZmZXIoYikge1xuICAgICAgdmFyIGJjb3B5ID0gYi5jb3B5KGIub2Zmc2V0LCBiLm9mZnNldCArIHNpemUpO1xuICAgICAgYi5za2lwKHNpemUpO1xuICAgICAgdmFyIGZiID0gQnVmZmVyLmZyb20oYmNvcHkudG9CaW5hcnkoKSwgJ2JpbmFyeScpO1xuICAgICAgcmV0dXJuIGZsb2F0UG9pbnRbJ3JlYWQnICsgc2l6ZU5hbWUgKyAnTEUnXShmYik7XG4gICAgfSxcbiAgICBhcHBlbmRCeXRlQnVmZmVyOiBmdW5jdGlvbiBhcHBlbmRCeXRlQnVmZmVyKGIsIHZhbHVlKSB7XG4gICAgICB2YXIgb3V0cHV0ID0gW107XG4gICAgICBmbG9hdFBvaW50Wyd3cml0ZScgKyBzaXplTmFtZSArICdMRSddKG91dHB1dCwgdmFsdWUpO1xuICAgICAgYi5hcHBlbmQob3V0cHV0KTtcbiAgICB9LFxuICAgIGZyb21PYmplY3Q6IGZ1bmN0aW9uIGZyb21PYmplY3QodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICAgIHRvT2JqZWN0OiBmdW5jdGlvbiB0b09iamVjdCh2YWx1ZSkge1xuICAgICAgaWYgKHZhbGlkYXRpb24uZGVmYXVsdHMgJiYgdmFsdWUgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gMC4wO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfTtcbn07XG5cbnZhciBieXRlYnVmID0gZnVuY3Rpb24gYnl0ZWJ1Zih2YWxpZGF0aW9uKSB7XG4gIHZhciBfYnl0ZWJ1ZiA9IHtcbiAgICBmcm9tQnl0ZUJ1ZmZlcjogZnVuY3Rpb24gZnJvbUJ5dGVCdWZmZXIoYikge1xuICAgICAgdmFyIGxlbiA9IHZhbGlkYXRpb24ubGVuO1xuXG4gICAgICB2YXIgYkNvcHkgPSB2b2lkIDA7XG4gICAgICBpZiAobGVuID09IG51bGwpIHtcbiAgICAgICAgdmFyIGxlblByZWZpeCA9IGIucmVhZFZhcmludDMyKCk7XG4gICAgICAgIGJDb3B5ID0gYi5jb3B5KGIub2Zmc2V0LCBiLm9mZnNldCArIGxlblByZWZpeCk7XG4gICAgICAgIGIuc2tpcChsZW5QcmVmaXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYkNvcHkgPSBiLmNvcHkoYi5vZmZzZXQsIGIub2Zmc2V0ICsgbGVuKTtcbiAgICAgICAgYi5za2lwKGxlbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gQnVmZmVyLmZyb20oYkNvcHkudG9CaW5hcnkoKSwgJ2JpbmFyeScpO1xuICAgIH0sXG4gICAgYXBwZW5kQnl0ZUJ1ZmZlcjogZnVuY3Rpb24gYXBwZW5kQnl0ZUJ1ZmZlcihiLCB2YWx1ZSkge1xuICAgICAgLy8gdmFsdWUgPSBfYnl0ZWJ1Zi5mcm9tT2JqZWN0KHZhbHVlKVxuXG4gICAgICB2YXIgbGVuID0gdmFsaWRhdGlvbi5sZW47XG5cbiAgICAgIGlmIChsZW4gPT0gbnVsbCkge1xuICAgICAgICBiLndyaXRlVmFyaW50MzIodmFsdWUubGVuZ3RoKTtcbiAgICAgIH1cbiAgICAgIGIuYXBwZW5kKHZhbHVlLnRvU3RyaW5nKCdiaW5hcnknKSwgJ2JpbmFyeScpO1xuICAgIH0sXG4gICAgZnJvbU9iamVjdDogZnVuY3Rpb24gZnJvbU9iamVjdCh2YWx1ZSkge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdmFsdWUgPSBCdWZmZXIuZnJvbSh2YWx1ZSwgJ2hleCcpO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHZhbHVlID0gQnVmZmVyLmZyb20odmFsdWUpO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgICAgdmFsdWUgPSBCdWZmZXIuZnJvbSh2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIHZhbGlkYXRlKHZhbHVlLCB2YWxpZGF0aW9uKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICAgIHRvT2JqZWN0OiBmdW5jdGlvbiB0b09iamVjdCh2YWx1ZSkge1xuICAgICAgdmFyIGRlZmF1bHRzID0gdmFsaWRhdGlvbi5kZWZhdWx0cyxcbiAgICAgICAgICBsZW4gPSB2YWxpZGF0aW9uLmxlbjtcblxuICAgICAgaWYgKGRlZmF1bHRzICYmIHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5KGxlbiA/IGxlbiArIDEgOiAxKS5qb2luKCcwMCcpO1xuICAgICAgfVxuICAgICAgdmFsaWRhdGUodmFsdWUsIHZhbGlkYXRpb24pO1xuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCdoZXgnKTtcbiAgICB9LFxuICAgIGNvbXBhcmU6IGZ1bmN0aW9uIGNvbXBhcmUoYSwgYikge1xuICAgICAgcmV0dXJuIEJ1ZmZlci5jb21wYXJlKGEsIGIpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIF9ieXRlYnVmO1xufTtcblxudmFyIF9zdHJpbmcgPSBmdW5jdGlvbiBfc3RyaW5nKHZhbGlkYXRpb24pIHtcbiAgcmV0dXJuIHtcbiAgICBmcm9tQnl0ZUJ1ZmZlcjogZnVuY3Rpb24gZnJvbUJ5dGVCdWZmZXIoYikge1xuICAgICAgcmV0dXJuIGIucmVhZFZTdHJpbmcoKTtcbiAgICB9LFxuICAgIGFwcGVuZEJ5dGVCdWZmZXI6IGZ1bmN0aW9uIGFwcGVuZEJ5dGVCdWZmZXIoYiwgdmFsdWUpIHtcbiAgICAgIHZhbGlkYXRlKHZhbHVlLCB2YWxpZGF0aW9uKTtcbiAgICAgIGIud3JpdGVWU3RyaW5nKHZhbHVlLnRvU3RyaW5nKCkpO1xuICAgIH0sXG4gICAgZnJvbU9iamVjdDogZnVuY3Rpb24gZnJvbU9iamVjdCh2YWx1ZSkge1xuICAgICAgdmFsaWRhdGUodmFsdWUsIHZhbGlkYXRpb24pO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgdG9PYmplY3Q6IGZ1bmN0aW9uIHRvT2JqZWN0KHZhbHVlKSB7XG4gICAgICBpZiAodmFsaWRhdGlvbi5kZWZhdWx0cyAmJiB2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICAgIHZhbGlkYXRlKHZhbHVlLCB2YWxpZGF0aW9uKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH07XG59O1xuXG52YXIgX3RpbWUyID0gZnVuY3Rpb24gX3RpbWUyKHZhbGlkYXRpb24pIHtcbiAgdmFyIF90aW1lID0ge1xuICAgIGZyb21CeXRlQnVmZmVyOiBmdW5jdGlvbiBmcm9tQnl0ZUJ1ZmZlcihiKSB7XG4gICAgICByZXR1cm4gYi5yZWFkVWludDMyKCk7XG4gICAgfSxcbiAgICBhcHBlbmRCeXRlQnVmZmVyOiBmdW5jdGlvbiBhcHBlbmRCeXRlQnVmZmVyKGIsIHZhbHVlKSB7XG4gICAgICAvLyBpZih0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIpXG4gICAgICAvLyAgICAgdmFsdWUgPSBfdGltZS5mcm9tT2JqZWN0KHZhbHVlKVxuXG4gICAgICB2YWxpZGF0ZSh2YWx1ZSwgdmFsaWRhdGlvbik7XG4gICAgICBiLndyaXRlVWludDMyKHZhbHVlKTtcbiAgICB9LFxuICAgIGZyb21PYmplY3Q6IGZ1bmN0aW9uIGZyb21PYmplY3QodmFsdWUpIHtcbiAgICAgIHZhbGlkYXRlKHZhbHVlLCB2YWxpZGF0aW9uKTtcblxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodmFsdWUuZ2V0VGltZSkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih2YWx1ZS5nZXRUaW1lKCkgLyAxMDAwKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGRhdGUgdHlwZTogJyArIHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2hyb21lIGFzc3VtZXMgWnVsdSB3aGVuIG1pc3NpbmcsIEZpcmVmb3ggZG9lcyBub3RcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmICEvWiQvLnRlc3QodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlICs9ICdaJztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIE1hdGguZmxvb3IobmV3IERhdGUodmFsdWUpLmdldFRpbWUoKSAvIDEwMDApO1xuICAgIH0sXG4gICAgdG9PYmplY3Q6IGZ1bmN0aW9uIHRvT2JqZWN0KHZhbHVlKSB7XG4gICAgICBpZiAodmFsaWRhdGlvbi5kZWZhdWx0cyAmJiB2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSgwKS50b0lTT1N0cmluZygpLnNwbGl0KCcuJylbMF07XG4gICAgICB9XG5cbiAgICAgIHZhbGlkYXRlKHZhbHVlLCB2YWxpZGF0aW9uKTtcblxuICAgICAgLy8gaWYodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAvLyAgICAgaWYoIS9aJC8udGVzdCh2YWx1ZSkpXG4gICAgICAvLyAgICAgICAgIHZhbHVlICs9IFwiWlwiXG4gICAgICAvL1xuICAgICAgLy8gICAgIHJldHVybiB2YWx1ZVxuICAgICAgLy8gfVxuXG4gICAgICAvLyBpZih2YWx1ZS5nZXRUaW1lKVxuICAgICAgLy8gICAgIHJldHVybiB2YWx1ZS50b0lTT1N0cmluZygpLnNwbGl0KCcuJylbMF0gKyAnWidcblxuICAgICAgdmFsaWRhdGVJbnQodmFsdWUsIHNwcmVhZCh2YWxpZGF0aW9uLCB7IGJpdHM6IDMyIH0pKTtcbiAgICAgIHZhciBpbnQgPSBwYXJzZUludCh2YWx1ZSk7XG4gICAgICByZXR1cm4gbmV3IERhdGUoaW50ICogMTAwMCkudG9JU09TdHJpbmcoKS5zcGxpdCgnLicpWzBdO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIF90aW1lO1xufTtcblxudmFyIHZhbGlkYXRlID0gZnVuY3Rpb24gdmFsaWRhdGUodmFsdWUsIHZhbGlkYXRpb24pIHtcbiAgaWYgKGlzRW1wdHkodmFsdWUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdSZXF1aXJlZCAnICsgdmFsaWRhdGlvbi50eXBlTmFtZSk7XG4gIH1cblxuICBpZiAodmFsaWRhdGlvbi5sZW4gIT0gbnVsbCkge1xuICAgIGlmICh2YWx1ZS5sZW5ndGggPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdsZW4gdmFsaWRhdGlvbiByZXF1cmllcyBhIFwibGVuZ3RoXCIgcHJvcGVydHknKTtcbiAgICB9XG5cbiAgICB2YXIgbGVuID0gdmFsaWRhdGlvbi5sZW47XG5cbiAgICBpZiAodmFsdWUubGVuZ3RoICE9PSBsZW4pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih2YWxpZGF0aW9uLnR5cGVOYW1lICsgJyBsZW5ndGggJyArIHZhbHVlLmxlbmd0aCArICcgZG9lcyBub3QgZXF1YWwgJyArIGxlbik7XG4gICAgfVxuICB9XG5cbiAgaWYgKHZhbGlkYXRpb24ubWF4TGVuICE9IG51bGwpIHtcbiAgICB2YXIgbWF4TGVuID0gdmFsaWRhdGlvbi5tYXhMZW47XG5cbiAgICBpZiAodmFsdWUubGVuZ3RoID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWF4TGVuIHZhbGlkYXRpb24gcmVxdXJpZXMgYSBcImxlbmd0aFwiIHByb3BlcnR5Jyk7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlLmxlbmd0aCA+IG1heExlbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHZhbGlkYXRpb24udHlwZU5hbWUgKyAnIGxlbmd0aCAnICsgdmFsdWUubGVuZ3RoICsgJyBleGNlZWRzIG1heExlbiAnICsgbWF4TGVuKTtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBaRVJPID0gbmV3IEJOKCk7XG52YXIgT05FID0gbmV3IEJOKCcxJyk7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlSW50KHZhbHVlLCB2YWxpZGF0aW9uKSB7XG4gIGlmIChpc0VtcHR5KHZhbHVlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignUmVxdWlyZWQgJyArIHZhbGlkYXRpb24udHlwZU5hbWUpO1xuICB9XG4gIHZhciBfdmFsaWRhdGlvbiRzaWduZWQyID0gdmFsaWRhdGlvbi5zaWduZWQsXG4gICAgICBzaWduZWQgPSBfdmFsaWRhdGlvbiRzaWduZWQyID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF92YWxpZGF0aW9uJHNpZ25lZDIsXG4gICAgICBfdmFsaWRhdGlvbiRiaXRzID0gdmFsaWRhdGlvbi5iaXRzLFxuICAgICAgYml0cyA9IF92YWxpZGF0aW9uJGJpdHMgPT09IHVuZGVmaW5lZCA/IDU0IDogX3ZhbGlkYXRpb24kYml0cztcblxuXG4gIHZhbHVlID0gU3RyaW5nKHZhbHVlKS50cmltKCk7XG4gIGlmIChzaWduZWQgJiYgIS9eLT9bMC05XSskLy50ZXN0KHZhbHVlKSB8fCAhc2lnbmVkICYmICEvXlswLTldKyQvLnRlc3QodmFsdWUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOdW1iZXIgZm9ybWF0ICcgKyB2YWxpZGF0aW9uLnR5cGVOYW1lICsgJyAnICsgdmFsdWUpO1xuICB9XG5cbiAgdmFyIG1heCA9IHNpZ25lZCA/IG1heFNpZ25lZChiaXRzKSA6IG1heFVuc2lnbmVkKGJpdHMpO1xuICB2YXIgbWluID0gc2lnbmVkID8gbWluU2lnbmVkKGJpdHMpIDogWkVSTztcbiAgdmFyIGkgPSBuZXcgQk4odmFsdWUpO1xuXG4gIC8vIGNvbnNvbGUubG9nKCdpLnRvU3RyaW5nKCksIG1pbi50b1N0cmluZygpJywgaS50b1N0cmluZygpLCBtaW4udG9TdHJpbmcoKSlcbiAgaWYgKGkuY21wKG1pbikgPCAwIHx8IGkuY21wKG1heCkgPiAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdPdmVyZmxvdyAnICsgdmFsaWRhdGlvbi50eXBlTmFtZSArICcgJyArIHZhbHVlICsgJywgJyArICgnbWF4ICcgKyBtYXgudG9TdHJpbmcoKSArICcsIG1pbiAnICsgbWluLnRvU3RyaW5nKCkgKyAnLCBzaWduZWQgJyArIHNpZ25lZCArICcsIGJpdHMgJyArIGJpdHMpKTtcbiAgfVxufVxuXG52YXIgaXNTZXJpYWxpemVyID0gZnVuY3Rpb24gaXNTZXJpYWxpemVyKHR5cGUpIHtcbiAgcmV0dXJuICh0eXBlb2YgdHlwZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodHlwZSkpID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdHlwZS5mcm9tQnl0ZUJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgdHlwZS5hcHBlbmRCeXRlQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiB0eXBlLmZyb21PYmplY3QgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHR5cGUudG9PYmplY3QgPT09ICdmdW5jdGlvbic7XG59O1xuXG52YXIgdG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyh2YWx1ZSwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyB2YWx1ZSA6IHZhbHVlLnRvU3RyaW5nID8gdmFsdWUudG9TdHJpbmcoZW5jb2RpbmcpIDogdmFsdWU7XG59O1xuXG52YXIgc29ydCA9IGZ1bmN0aW9uIHNvcnQodHlwZSwgdmFsdWVzKSB7XG4gIHJldHVybiB0eXBlLmNvbXBhcmUgPyB2YWx1ZXMuc29ydCh0eXBlLmNvbXBhcmUpIDogLy8gY3VzdG9tIGNvbXBhcmVcbiAgdmFsdWVzLnNvcnQoKTtcbn07XG5cbnZhciBzcHJlYWQgPSBmdW5jdGlvbiBzcHJlYWQoKSB7XG4gIHJldHVybiBPYmplY3QuYXNzaWduLmFwcGx5KE9iamVjdCwgYXJndW1lbnRzKTtcbn07XG52YXIgaXNFbXB0eSA9IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09IG51bGw7XG59O1xuXG4vLyAxIDw8IE4gPT09IE1hdGgucG93KDIsIE4pXG52YXIgbWF4VW5zaWduZWQgPSBmdW5jdGlvbiBtYXhVbnNpZ25lZChiaXRzKSB7XG4gIHJldHVybiBuZXcgQk4oMSkuaXNobG4oYml0cykuaXN1YihPTkUpO1xufTtcbnZhciBtYXhTaWduZWQgPSBmdW5jdGlvbiBtYXhTaWduZWQoYml0cykge1xuICByZXR1cm4gbmV3IEJOKDEpLmlzaGxuKGJpdHMgLSAxKS5pc3ViKE9ORSk7XG59O1xudmFyIG1pblNpZ25lZCA9IGZ1bmN0aW9uIG1pblNpZ25lZChiaXRzKSB7XG4gIHJldHVybiBuZXcgQk4oMSkuaXNobG4oYml0cyAtIDEpLmluZWcoKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgfHwgaW1wbGVtZW50YXRpb247XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIFR5cGVzID0gcmVxdWlyZSgnLi90eXBlcycpO1xudmFyIEZjYnVmZmVyID0gcmVxdWlyZSgnLi9mY2J1ZmZlcicpO1xudmFyIGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpO1xuXG52YXIgY3JlYXRlID0gRmNidWZmZXIuY3JlYXRlO1xuXG4vKipcbiAgQHR5cGVkZWYge29iamVjdH0gU2VyaWFsaXplckNvbmZpZ1xuICBAcHJvcGVydHkge2Jvb2xlYW59IFtTZXJpYWxpemVyQ29uZmlnLmRlZmF1bHRzID0gZmFsc2VdIC0gSW5zZXJ0IGluIGRlZmF1bHRzIChsaWtlIDAsIGZhbHNlLCAnMDAwLi4uJywgb3IgJycpIGZvciBhbnkgbWlzc2luZyB2YWx1ZXMuICBUaGlzIGhlbHBzIHRlc3QgYW5kIGluc3BlY3Qgd2hhdCBhIGRlZmluaXRpb24gc2hvdWxkIGxvb2sgbGlrZS4gIERvIG5vdCBlbmFibGUgaW4gcHJvZHVjdGlvbi5cbiAgQHByb3BlcnR5IHtib29sZWFufSBbU2VyaWFsaXplckNvbmZpZy5kZWJ1ZyA9IGZhbHNlXSAtIFByaW50cyBsb3RzIG9mIEhFWCBhbmQgZmllbGQtbGV2ZWwgaW5mb3JtYXRpb24gdG8gaGVscCBkZWJ1ZyBiaW5hcnkgc2VyaWFsaXphdGlvbi5cbiAgQHByb3BlcnR5IHtvYmplY3R9IFtjdXN0b21UeXBlc10gLSBBZGQgb3Igb3ZlcndyaXRlIGxvdyBsZXZlbCB0eXBlcyAoc2VlIC4vc3JjL3R5cGVzLmpzIGBjb25zdCB0eXBlcyA9IHsuLi59YCkuXG4qL1xuXG4vKipcbiAgQHR5cGVkZWYge29iamVjdH0gQ3JlYXRlU3RydWN0XG4gIEBwcm9wZXJ0eSB7QXJyYXk8U3RyaW5nPn0gQ3JlYXRlU3RydWN0LmVycm9ycyAtIElmIGFueSBlcnJvcnMgZXhpc3RzLCBubyBzdHJ1dHMgd2lsbCBiZSBjcmVhdGVkLlxuICBAcHJvcGVydHkge09iamVjdH0gQ3JlYXRlU3RydWN0LnN0cnVjdCAtIFN0cnVjdCBvYmplY3RzIGtleWVkIGJ5IGRlZmluaXRpb24gbmFtZS5cbiAgQHByb3BlcnR5IHtTdHJpbmd9IENyZWF0ZVN0cnVjdC5zdHJ1Y3Quc3RydWN0TmFtZSAtIFN0cnVjdCBvYmplY3QgdGhhdCB3aWxsIHNlcmlhbGl6ZSB0aGlzIHR5cGUuXG4gIEBwcm9wZXJ0eSB7U3RydWN0fSBDcmVhdGVTdHJ1Y3Quc3RydWN0LnN0cnVjdCAtIFN0cnVjdCBvYmplY3QgdGhhdCB3aWxsIHNlcmlhbGl6ZSB0aGlzIHR5cGUgKHNlZSAuL3NyYy9zdHJ1Y3QuanMpLlxuKi9cblxuLyoqXG4gIEBhcmcge29iamVjdH0gZGVmaW5pdGlvbnMgLSBleGFtcGxlcyBodHRwczovL2dpdGh1Yi5jb20vRU9TSU8vZW9zanMtanNvbi9ibG9iL21hc3Rlci9zY2hlbWFcbiAgQGFyZyB7U2VyaWFsaXplckNvbmZpZ30gY29uZmlnXG4gIEByZXR1cm4ge0NyZWF0ZVN0cnVjdH1cbiovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRlZmluaXRpb25zKSB7XG4gIHZhciBjb25maWcgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gIGlmICgodHlwZW9mIGRlZmluaXRpb25zID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihkZWZpbml0aW9ucykpICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2RlZmluaXRpb25zIGlzIGEgcmVxdWlyZWQgcGFyYW1ldGVyJyk7XG4gIH1cblxuICBpZiAoY29uZmlnLmN1c3RvbVR5cGVzKSB7XG4gICAgZGVmaW5pdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZpbml0aW9ucyk7IC8vY2xvbmVcbiAgICBmb3IgKHZhciBrZXkgaW4gY29uZmlnLmN1c3RvbVR5cGVzKSB7XG4gICAgICAvLyBjdXN0b20gdHlwZXMgb3ZlcndyaXRlIGRlZmluaXRpb25zXG4gICAgICBkZWxldGUgZGVmaW5pdGlvbnNba2V5XTtcbiAgICB9XG4gIH1cblxuICB2YXIgdHlwZXMgPSBUeXBlcyhjb25maWcpO1xuXG4gIHZhciBfY3JlYXRlID0gY3JlYXRlKGRlZmluaXRpb25zLCB0eXBlcyksXG4gICAgICBlcnJvcnMgPSBfY3JlYXRlLmVycm9ycyxcbiAgICAgIHN0cnVjdHMgPSBfY3JlYXRlLnN0cnVjdHM7XG5cbiAgLyoqIEV4dGVuZCB3aXRoIG1vcmUgSlNPTiBzY2hlbWEgYW5kIHR5cGUgZGVmaW5pdGlvbnMgKi9cblxuXG4gIHZhciBfZXh0ZW5kID0gZnVuY3Rpb24gX2V4dGVuZChwYXJlbnQsIGNoaWxkKSB7XG4gICAgdmFyIGNvbWJpbmVkID0gT2JqZWN0LmFzc2lnbih7fSwgcGFyZW50LCBjaGlsZCk7XG5cbiAgICB2YXIgX2NyZWF0ZTIgPSBjcmVhdGUoY29tYmluZWQsIHR5cGVzKSxcbiAgICAgICAgc3RydWN0cyA9IF9jcmVhdGUyLnN0cnVjdHMsXG4gICAgICAgIGVycm9ycyA9IF9jcmVhdGUyLmVycm9ycztcblxuICAgIHJldHVybiB7XG4gICAgICBlcnJvcnM6IGVycm9ycyxcbiAgICAgIHN0cnVjdHM6IHN0cnVjdHMsXG4gICAgICBleHRlbmQ6IGZ1bmN0aW9uIGV4dGVuZChjaGlsZCkge1xuICAgICAgICByZXR1cm4gX2V4dGVuZChjb21iaW5lZCwgY2hpbGQpO1xuICAgICAgfSxcbiAgICAgIGZyb21CdWZmZXI6IGZyb21CdWZmZXIodHlwZXMsIHN0cnVjdHMpLFxuICAgICAgdG9CdWZmZXI6IHRvQnVmZmVyKHR5cGVzLCBzdHJ1Y3RzKVxuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBlcnJvcnM6IGVycm9ycyxcbiAgICBzdHJ1Y3RzOiBzdHJ1Y3RzLFxuICAgIHR5cGVzOiB0eXBlcyxcbiAgICBleHRlbmQ6IGZ1bmN0aW9uIGV4dGVuZChjaGlsZCkge1xuICAgICAgcmV0dXJuIF9leHRlbmQoZGVmaW5pdGlvbnMsIGNoaWxkKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICBAYXJnIHtzdHJpbmd9IHR5cGVOYW1lIGxvb2t1cCBzdHJ1Y3Qgb3IgdHlwZSBieSBuYW1lXG4gICAgICBAYXJnIHtCdWZmZXJ9IGJ1ZiBzZXJpYWxpemVkIGRhdGEgdG8gYmUgcGFyc2VkXG4gICAgICBAcmV0dXJuIHtvYmplY3R9IGRlc2VyaWFsaXplZCBvYmplY3RcbiAgICAqL1xuICAgIGZyb21CdWZmZXI6IGZyb21CdWZmZXIodHlwZXMsIHN0cnVjdHMpLFxuXG4gICAgLyoqXG4gICAgICBAYXJnIHtzdHJpbmd9IHR5cGVOYW1lIGxvb2t1cCBzdHJ1Y3Qgb3IgdHlwZSBieSBuYW1lXG4gICAgICBAYXJnIHtPYmplY3R9IG9iamVjdCBmb3Igc2VyaWFsaXphdGlvblxuICAgICAgQHJldHVybiB7QnVmZmVyfSBzZXJpYWxpemVkIG9iamVjdFxuICAgICovXG4gICAgdG9CdWZmZXI6IHRvQnVmZmVyKHR5cGVzLCBzdHJ1Y3RzKVxuICB9O1xufTtcblxudmFyIGZyb21CdWZmZXIgPSBmdW5jdGlvbiBmcm9tQnVmZmVyKHR5cGVzLCBzdHJ1Y3RzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodHlwZU5hbWUsIGJ1Zikge1xuICAgIGFzc2VydC5lcXVhbCh0eXBlb2YgdHlwZU5hbWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHR5cGVOYW1lKSwgJ3N0cmluZycsICd0eXBlTmFtZSAodHlwZSBvciBzdHJ1Y3QgbmFtZSknKTtcbiAgICBpZiAodHlwZW9mIGJ1ZiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGJ1ZiA9IEJ1ZmZlci5mcm9tKGJ1ZiwgJ2hleCcpO1xuICAgIH1cbiAgICBhc3NlcnQoQnVmZmVyLmlzQnVmZmVyKGJ1ZiksICdleHBlY3RpbmcgYnVmPGhleHxCdWZmZXI+Jyk7XG5cbiAgICB2YXIgdHlwZSA9IHR5cGVzW3R5cGVOYW1lXTtcbiAgICBpZiAodHlwZSkge1xuICAgICAgdHlwZSA9IHR5cGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdHlwZSA9IHN0cnVjdHNbdHlwZU5hbWVdO1xuICAgIH1cbiAgICBhc3NlcnQodHlwZSwgJ21pc3NpbmcgdHlwZSBvciBzdHJ1Y3Q6ICcgKyB0eXBlTmFtZSk7XG4gICAgcmV0dXJuIEZjYnVmZmVyLmZyb21CdWZmZXIodHlwZSwgYnVmKTtcbiAgfTtcbn07XG5cbnZhciB0b0J1ZmZlciA9IGZ1bmN0aW9uIHRvQnVmZmVyKHR5cGVzLCBzdHJ1Y3RzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodHlwZU5hbWUsIHZhbHVlKSB7XG4gICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiB0eXBlTmFtZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodHlwZU5hbWUpLCAnc3RyaW5nJywgJ3R5cGVOYW1lICh0eXBlIG9yIHN0cnVjdCBuYW1lKScpO1xuICAgIGFzc2VydCh2YWx1ZSAhPSBudWxsLCAndmFsdWUgaXMgcmVxdWlyZWQnKTtcblxuICAgIHZhciB0eXBlID0gdHlwZXNbdHlwZU5hbWVdO1xuICAgIGlmICh0eXBlKSB7XG4gICAgICB0eXBlID0gdHlwZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0eXBlID0gc3RydWN0c1t0eXBlTmFtZV07XG4gICAgfVxuICAgIGFzc2VydCh0eXBlLCAnbWlzc2luZyB0eXBlIG9yIHN0cnVjdDogJyArIHR5cGVOYW1lKTtcbiAgICByZXR1cm4gRmNidWZmZXIudG9CdWZmZXIodHlwZSwgdmFsdWUpO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMuZnJvbUJ1ZmZlciA9IEZjYnVmZmVyLmZyb21CdWZmZXI7XG5tb2R1bGUuZXhwb3J0cy50b0J1ZmZlciA9IEZjYnVmZmVyLnRvQnVmZmVyOyIsIm1vZHVsZS5leHBvcnRzID0gc3RyaW5naWZ5XG5zdHJpbmdpZnkuZGVmYXVsdCA9IHN0cmluZ2lmeVxuc3RyaW5naWZ5LnN0YWJsZSA9IGRldGVybWluaXN0aWNTdHJpbmdpZnlcbnN0cmluZ2lmeS5zdGFibGVTdHJpbmdpZnkgPSBkZXRlcm1pbmlzdGljU3RyaW5naWZ5XG5cbnZhciBhcnIgPSBbXVxuXG4vLyBSZWd1bGFyIHN0cmluZ2lmeVxuZnVuY3Rpb24gc3RyaW5naWZ5IChvYmosIHJlcGxhY2VyLCBzcGFjZXIpIHtcbiAgZGVjaXJjKG9iaiwgJycsIFtdLCB1bmRlZmluZWQpXG4gIHZhciByZXMgPSBKU09OLnN0cmluZ2lmeShvYmosIHJlcGxhY2VyLCBzcGFjZXIpXG4gIHdoaWxlIChhcnIubGVuZ3RoICE9PSAwKSB7XG4gICAgdmFyIHBhcnQgPSBhcnIucG9wKClcbiAgICBwYXJ0WzBdW3BhcnRbMV1dID0gcGFydFsyXVxuICB9XG4gIHJldHVybiByZXNcbn1cbmZ1bmN0aW9uIGRlY2lyYyAodmFsLCBrLCBzdGFjaywgcGFyZW50KSB7XG4gIHZhciBpXG4gIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwgIT09IG51bGwpIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgc3RhY2subGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChzdGFja1tpXSA9PT0gdmFsKSB7XG4gICAgICAgIHBhcmVudFtrXSA9ICdbQ2lyY3VsYXJdJ1xuICAgICAgICBhcnIucHVzaChbcGFyZW50LCBrLCB2YWxdKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG4gICAgc3RhY2sucHVzaCh2YWwpXG4gICAgLy8gT3B0aW1pemUgZm9yIEFycmF5cy4gQmlnIGFycmF5cyBjb3VsZCBraWxsIHRoZSBwZXJmb3JtYW5jZSBvdGhlcndpc2UhXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgZm9yIChpID0gMDsgaSA8IHZhbC5sZW5ndGg7IGkrKykge1xuICAgICAgICBkZWNpcmModmFsW2ldLCBpLCBzdGFjaywgdmFsKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHZhbClcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2ldXG4gICAgICAgIGRlY2lyYyh2YWxba2V5XSwga2V5LCBzdGFjaywgdmFsKVxuICAgICAgfVxuICAgIH1cbiAgICBzdGFjay5wb3AoKVxuICB9XG59XG5cbi8vIFN0YWJsZS1zdHJpbmdpZnlcbmZ1bmN0aW9uIGNvbXBhcmVGdW5jdGlvbiAoYSwgYikge1xuICBpZiAoYSA8IGIpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuICBpZiAoYSA+IGIpIHtcbiAgICByZXR1cm4gMVxuICB9XG4gIHJldHVybiAwXG59XG5cbmZ1bmN0aW9uIGRldGVybWluaXN0aWNTdHJpbmdpZnkgKG9iaiwgcmVwbGFjZXIsIHNwYWNlcikge1xuICB2YXIgdG1wID0gZGV0ZXJtaW5pc3RpY0RlY2lyYyhvYmosICcnLCBbXSwgdW5kZWZpbmVkKSB8fCBvYmpcbiAgdmFyIHJlcyA9IEpTT04uc3RyaW5naWZ5KHRtcCwgcmVwbGFjZXIsIHNwYWNlcilcbiAgd2hpbGUgKGFyci5sZW5ndGggIT09IDApIHtcbiAgICB2YXIgcGFydCA9IGFyci5wb3AoKVxuICAgIHBhcnRbMF1bcGFydFsxXV0gPSBwYXJ0WzJdXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBkZXRlcm1pbmlzdGljRGVjaXJjICh2YWwsIGssIHN0YWNrLCBwYXJlbnQpIHtcbiAgdmFyIGlcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbCAhPT0gbnVsbCkge1xuICAgIGZvciAoaSA9IDA7IGkgPCBzdGFjay5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHN0YWNrW2ldID09PSB2YWwpIHtcbiAgICAgICAgcGFyZW50W2tdID0gJ1tDaXJjdWxhcl0nXG4gICAgICAgIGFyci5wdXNoKFtwYXJlbnQsIGssIHZhbF0pXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbC50b0pTT04gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBzdGFjay5wdXNoKHZhbClcbiAgICAvLyBPcHRpbWl6ZSBmb3IgQXJyYXlzLiBCaWcgYXJyYXlzIGNvdWxkIGtpbGwgdGhlIHBlcmZvcm1hbmNlIG90aGVyd2lzZSFcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdmFsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRldGVybWluaXN0aWNEZWNpcmModmFsW2ldLCBpLCBzdGFjaywgdmFsKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDcmVhdGUgYSB0ZW1wb3Jhcnkgb2JqZWN0IGluIHRoZSByZXF1aXJlZCB3YXlcbiAgICAgIHZhciB0bXAgPSB7fVxuICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh2YWwpLnNvcnQoY29tcGFyZUZ1bmN0aW9uKVxuICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNbaV1cbiAgICAgICAgZGV0ZXJtaW5pc3RpY0RlY2lyYyh2YWxba2V5XSwga2V5LCBzdGFjaywgdmFsKVxuICAgICAgICB0bXBba2V5XSA9IHZhbFtrZXldXG4gICAgICB9XG4gICAgICBpZiAocGFyZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYXJyLnB1c2goW3BhcmVudCwgaywgdmFsXSlcbiAgICAgICAgcGFyZW50W2tdID0gdG1wXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdG1wXG4gICAgICB9XG4gICAgfVxuICAgIHN0YWNrLnBvcCgpXG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLyogZXNsaW50IG5vLWludmFsaWQtdGhpczogMSAqL1xuXG52YXIgRVJST1JfTUVTU0FHRSA9ICdGdW5jdGlvbi5wcm90b3R5cGUuYmluZCBjYWxsZWQgb24gaW5jb21wYXRpYmxlICc7XG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIGZ1bmNUeXBlID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKHRoYXQpIHtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcztcbiAgICBpZiAodHlwZW9mIHRhcmdldCAhPT0gJ2Z1bmN0aW9uJyB8fCB0b1N0ci5jYWxsKHRhcmdldCkgIT09IGZ1bmNUeXBlKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRVJST1JfTUVTU0FHRSArIHRhcmdldCk7XG4gICAgfVxuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gICAgdmFyIGJvdW5kO1xuICAgIHZhciBiaW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgYm91bmQpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0YXJnZXQuYXBwbHkoXG4gICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICBhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKE9iamVjdChyZXN1bHQpID09PSByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0LmFwcGx5KFxuICAgICAgICAgICAgICAgIHRoYXQsXG4gICAgICAgICAgICAgICAgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgYm91bmRMZW5ndGggPSBNYXRoLm1heCgwLCB0YXJnZXQubGVuZ3RoIC0gYXJncy5sZW5ndGgpO1xuICAgIHZhciBib3VuZEFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvdW5kTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYm91bmRBcmdzLnB1c2goJyQnICsgaSk7XG4gICAgfVxuXG4gICAgYm91bmQgPSBGdW5jdGlvbignYmluZGVyJywgJ3JldHVybiBmdW5jdGlvbiAoJyArIGJvdW5kQXJncy5qb2luKCcsJykgKyAnKXsgcmV0dXJuIGJpbmRlci5hcHBseSh0aGlzLGFyZ3VtZW50cyk7IH0nKShiaW5kZXIpO1xuXG4gICAgaWYgKHRhcmdldC5wcm90b3R5cGUpIHtcbiAgICAgICAgdmFyIEVtcHR5ID0gZnVuY3Rpb24gRW1wdHkoKSB7fTtcbiAgICAgICAgRW1wdHkucHJvdG90eXBlID0gdGFyZ2V0LnByb3RvdHlwZTtcbiAgICAgICAgYm91bmQucHJvdG90eXBlID0gbmV3IEVtcHR5KCk7XG4gICAgICAgIEVtcHR5LnByb3RvdHlwZSA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvdW5kO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEJ5dGVCdWZmZXIgPSByZXF1aXJlKCdieXRlYnVmZmVyJyk7XG5cbi8qKlxuICBAY2xhc3MgU3RydWN0XG5cbiAgQGFyZyB7b2JqZWN0fSBjb25maWcub3ZlcnJpZGUgPSB7XG4gICAgJ01lc3NhZ2UuZGF0YS5hcHBlbmRCeXRlQnVmZmVyJzogKHtmaWVsZHMsIG9iamVjdCwgYn0pID0+IHsuLn1cbiAgfVxuICBSYXJlIGNhc2VzIHdoZXJlIHNwZWNpYWxpemVkIHNlcmlsaXphdGlvbiBpcyBuZWVkZWQgKGV4IEEgTWVzc2FnZSBvYmplY3QgaGFzXG4gICd0eXBlJyBhbmQgJ2RhdGEnIGZpZWxkcyB3aGVyZSBvYmplY3QudHlwZSA9PT0gJ3RyYW5zZmVyJyBjYW4gZGVmaW5lXG4gIHNlcmlhbGl6YXRpb24gdGltZSBTdHJ1Y3QgbmVlZGVkIGZvciAnZGF0YScgLi4gVGhpcyBzYXZlcyBjb21wbGV4aXR5IGZvciB0aGVcbiAgZW5kLXVzZXIncyB3b3JraW5nIHdpdGgganNvbi4gIFNlZSBvdmVycmlkZSB1bml0IHRlc3QuXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICB2YXIgY29uZmlnID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7IGRlYnVnOiBmYWxzZSB9O1xuXG4gIGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oeyBvdmVycmlkZToge30gfSwgY29uZmlnKTtcbiAgdmFyIGZpZWxkcyA9IHt9O1xuICB2YXIgZmllbGRPbmUgPSB2b2lkIDAsXG4gICAgICBmaWVsZE9uZU5hbWUgPSB2b2lkIDA7XG5cbiAgcmV0dXJuIHtcbiAgICBjb21wYXJlOiBmdW5jdGlvbiBjb21wYXJlKGEsIGIpIHtcbiAgICAgIHZhciB2MSA9IGFbZmllbGRPbmVOYW1lXTtcbiAgICAgIHZhciB2MiA9IGJbZmllbGRPbmVOYW1lXTtcblxuICAgICAgaWYgKCFmaWVsZE9uZSB8fCAhZmllbGRPbmUuY29tcGFyZSkge1xuICAgICAgICByZXR1cm4gdjEgPiB2MiA/IDEgOiB2MSA8IHYyID8gLTEgOiAwO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmllbGRPbmUuY29tcGFyZSh2MSwgdjIpO1xuICAgIH0sXG5cblxuICAgIC8qKiBAcHJpdmF0ZSAqL1xuICAgIGFkZDogZnVuY3Rpb24gYWRkKGZpZWxkTmFtZSwgdHlwZSkge1xuICAgICAgZmllbGRzW2ZpZWxkTmFtZV0gPSB0eXBlO1xuICAgICAgaWYgKGZpZWxkT25lID09IG51bGwpIHtcbiAgICAgICAgZmllbGRPbmUgPSB0eXBlO1xuICAgICAgICBmaWVsZE9uZU5hbWUgPSBmaWVsZE5hbWU7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLy8gQ29tcGxldGUgbGlzdCBvZiBmaWVsZHMsIGFmdGVyIHJlc29sdmluZyBcImJhc2VcIiBpbmhlcml0YW5jZVxuICAgIGZpZWxkczogZmllbGRzLFxuXG4gICAgZnJvbUJ5dGVCdWZmZXI6IGZ1bmN0aW9uIGZyb21CeXRlQnVmZmVyKGIpIHtcbiAgICAgIHZhciBvYmplY3QgPSB7fTtcbiAgICAgIHZhciBmaWVsZCA9IG51bGw7XG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKGZpZWxkIGluIGZpZWxkcykge1xuICAgICAgICAgIHZhciB0eXBlID0gZmllbGRzW2ZpZWxkXTtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIG8xID0gYi5vZmZzZXQ7XG4gICAgICAgICAgICBpZiAoZmllbGQgPT09ICcnKSB7XG4gICAgICAgICAgICAgIC8vIHN0cnVjdFB0clxuICAgICAgICAgICAgICBvYmplY3QgPSB0eXBlLmZyb21CeXRlQnVmZmVyKGIsIGNvbmZpZyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB2YXIgZnJvbUJ5dGVCdWZmZXIgPSBjb25maWcub3ZlcnJpZGVbbmFtZSArICcuJyArIGZpZWxkICsgJy5mcm9tQnl0ZUJ1ZmZlciddO1xuICAgICAgICAgICAgICBpZiAoZnJvbUJ5dGVCdWZmZXIpIHtcbiAgICAgICAgICAgICAgICBmcm9tQnl0ZUJ1ZmZlcih7IGZpZWxkczogZmllbGRzLCBvYmplY3Q6IG9iamVjdCwgYjogYiwgY29uZmlnOiBjb25maWcgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0W2ZpZWxkXSA9IHR5cGUuZnJvbUJ5dGVCdWZmZXIoYiwgY29uZmlnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbmZpZy5kZWJ1Zykge1xuICAgICAgICAgICAgICBpZiAodHlwZS5zdHJ1Y3QpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKHR5cGUuc3RydWN0KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIC8vIGh1bWFuIHJlYWRhYmxlIHRleHRcbiAgICAgICAgICAgICAgICAgIHZhbHVlID0gdHlwZS50b09iamVjdChmaWVsZCA9PT0gJycgPyBvYmplY3QgOiBvYmplY3RbZmllbGRdLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKCdmcm9tQnl0ZUJ1ZmZlciBkZWJ1ZyBlcnJvcjonLCBlcnJvcilcbiAgICAgICAgICAgICAgICAgIHZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBfYiA9IGIuY29weShvMSwgYi5vZmZzZXQpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2Zyb21CeXRlQnVmZmVyJywgbmFtZSArICcuJyArIGZpZWxkLCAnXFwnJyArIHZhbHVlICsgJ1xcJycsIF9iLnRvSGV4KCkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlICsgJyBpbiAnICsgbmFtZSArICcuJyArIGZpZWxkKTtcbiAgICAgICAgICAgIGIucHJpbnREZWJ1ZygpO1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGVycm9yLm1lc3NhZ2UgKz0gJyBpbiAnICsgbmFtZSArICcuJyArIGZpZWxkO1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfSxcbiAgICBhcHBlbmRCeXRlQnVmZmVyOiBmdW5jdGlvbiBhcHBlbmRCeXRlQnVmZmVyKGIsIG9iamVjdCkge1xuICAgICAgdmFyIGZpZWxkID0gbnVsbDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGZvciAoZmllbGQgaW4gZmllbGRzKSB7XG4gICAgICAgICAgdmFyIHR5cGUgPSBmaWVsZHNbZmllbGRdO1xuICAgICAgICAgIGlmIChmaWVsZCA9PT0gJycpIHtcbiAgICAgICAgICAgIC8vIHN0cnVjdFB0clxuICAgICAgICAgICAgdHlwZS5hcHBlbmRCeXRlQnVmZmVyKGIsIG9iamVjdCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBhcHBlbmRCeXRlQnVmZmVyID0gY29uZmlnLm92ZXJyaWRlW25hbWUgKyAnLicgKyBmaWVsZCArICcuYXBwZW5kQnl0ZUJ1ZmZlciddO1xuICAgICAgICAgICAgaWYgKGFwcGVuZEJ5dGVCdWZmZXIpIHtcbiAgICAgICAgICAgICAgYXBwZW5kQnl0ZUJ1ZmZlcih7IGZpZWxkczogZmllbGRzLCBvYmplY3Q6IG9iamVjdCwgYjogYiB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHR5cGUuYXBwZW5kQnl0ZUJ1ZmZlcihiLCBvYmplY3RbZmllbGRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZXJyb3IubWVzc2FnZSArPSAnICcgKyBuYW1lICsgJy4nICsgZmllbGQgKyAnID0gJyArIEpTT04uc3RyaW5naWZ5KG9iamVjdFtmaWVsZF0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gY2lyY3VsYXIgcmVmXG4gICAgICAgICAgZXJyb3IubWVzc2FnZSArPSAnICcgKyBuYW1lICsgJy4nICsgZmllbGQgKyAnID0gJyArIG9iamVjdFtmaWVsZF07XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgfSxcbiAgICBmcm9tT2JqZWN0OiBmdW5jdGlvbiBmcm9tT2JqZWN0KHNlcmlhbGl6ZWRPYmplY3QpIHtcbiAgICAgIHZhciBmcm9tT2JqZWN0X3N0cnVjdCA9IGNvbmZpZy5vdmVycmlkZVtuYW1lICsgJy5mcm9tT2JqZWN0J107XG4gICAgICBpZiAoZnJvbU9iamVjdF9zdHJ1Y3QpIHtcbiAgICAgICAgdmFyIHJldCA9IGZyb21PYmplY3Rfc3RydWN0KHNlcmlhbGl6ZWRPYmplY3QpO1xuICAgICAgICBpZiAocmV0ICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgIHZhciBmaWVsZCA9IG51bGw7XG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKGZpZWxkIGluIGZpZWxkcykge1xuICAgICAgICAgIC8vIGlmKGNvbmZpZy5kZWJ1Zykge1xuICAgICAgICAgIC8vICAgY29uc29sZS5lcnJvcihuYW1lLCBmaWVsZCwgJyhmcm9tT2JqZWN0KScpXG4gICAgICAgICAgLy8gfVxuICAgICAgICAgIHZhciB0eXBlID0gZmllbGRzW2ZpZWxkXTtcbiAgICAgICAgICBpZiAoZmllbGQgPT09ICcnKSB7XG4gICAgICAgICAgICAvLyBzdHJ1Y3RQdHJcbiAgICAgICAgICAgIHZhciBvYmplY3QgPSB0eXBlLmZyb21PYmplY3Qoc2VyaWFsaXplZE9iamVjdCk7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHJlc3VsdCwgb2JqZWN0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGZyb21PYmplY3QgPSBjb25maWcub3ZlcnJpZGVbbmFtZSArICcuJyArIGZpZWxkICsgJy5mcm9tT2JqZWN0J107XG4gICAgICAgICAgICBpZiAoZnJvbU9iamVjdCkge1xuICAgICAgICAgICAgICBmcm9tT2JqZWN0KHsgZmllbGRzOiBmaWVsZHMsIG9iamVjdDogc2VyaWFsaXplZE9iamVjdCwgcmVzdWx0OiByZXN1bHQgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBzZXJpYWxpemVkT2JqZWN0W2ZpZWxkXTtcbiAgICAgICAgICAgICAgdmFyIF9vYmplY3QgPSB0eXBlLmZyb21PYmplY3QodmFsdWUpO1xuICAgICAgICAgICAgICByZXN1bHRbZmllbGRdID0gX29iamVjdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGVycm9yLm1lc3NhZ2UgKz0gJyAnICsgbmFtZSArICcuJyArIGZpZWxkO1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuICAgIHRvT2JqZWN0OiBmdW5jdGlvbiB0b09iamVjdCgpIHtcbiAgICAgIHZhciBzZXJpYWxpemVkT2JqZWN0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcblxuICAgICAgdmFyIHRvT2JqZWN0X3N0cnVjdCA9IGNvbmZpZy5vdmVycmlkZVtuYW1lICsgJy50b09iamVjdCddO1xuICAgICAgaWYgKHRvT2JqZWN0X3N0cnVjdCkge1xuICAgICAgICB2YXIgcmV0ID0gdG9PYmplY3Rfc3RydWN0KHNlcmlhbGl6ZWRPYmplY3QpO1xuICAgICAgICBpZiAocmV0ICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgIHZhciBmaWVsZCA9IG51bGw7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBpZiAoIWZpZWxkcykgeyByZXR1cm4gcmVzdWx0IH1cblxuICAgICAgICBmb3IgKGZpZWxkIGluIGZpZWxkcykge1xuICAgICAgICAgIHZhciB0eXBlID0gZmllbGRzW2ZpZWxkXTtcblxuICAgICAgICAgIHZhciB0b09iamVjdCA9IGNvbmZpZy5vdmVycmlkZVtuYW1lICsgJy4nICsgZmllbGQgKyAnLnRvT2JqZWN0J107XG4gICAgICAgICAgaWYgKHRvT2JqZWN0KSB7XG4gICAgICAgICAgICB0b09iamVjdCh7IGZpZWxkczogZmllbGRzLCBvYmplY3Q6IHNlcmlhbGl6ZWRPYmplY3QsIHJlc3VsdDogcmVzdWx0LCBjb25maWc6IGNvbmZpZyB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGZpZWxkID09PSAnJykge1xuICAgICAgICAgICAgICAvLyBzdHJ1Y3RQdHJcbiAgICAgICAgICAgICAgdmFyIG9iamVjdCA9IHR5cGUudG9PYmplY3Qoc2VyaWFsaXplZE9iamVjdCwgY29uZmlnKTtcbiAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihyZXN1bHQsIG9iamVjdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB2YXIgX29iamVjdDIgPSB0eXBlLnRvT2JqZWN0KHNlcmlhbGl6ZWRPYmplY3QgPyBzZXJpYWxpemVkT2JqZWN0W2ZpZWxkXSA6IG51bGwsIGNvbmZpZyk7XG4gICAgICAgICAgICAgIHJlc3VsdFtmaWVsZF0gPSBfb2JqZWN0MjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY29uZmlnLmRlYnVnKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICB2YXIgYiA9IG5ldyBCeXRlQnVmZmVyKEJ5dGVCdWZmZXIuREVGQVVMVF9DQVBBQ0lUWSwgQnl0ZUJ1ZmZlci5MSVRUTEVfRU5ESUFOKTtcbiAgICAgICAgICAgICAgaWYgKHNlcmlhbGl6ZWRPYmplY3QgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHNlcmlhbGl6ZWRPYmplY3RbZmllbGRdO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgdmFyIGFwcGVuZEJ5dGVCdWZmZXIgPSBjb25maWcub3ZlcnJpZGVbbmFtZSArICcuJyArIGZpZWxkICsgJy5hcHBlbmRCeXRlQnVmZmVyJ107XG4gICAgICAgICAgICAgICAgICBpZiAodG9PYmplY3QgJiYgYXBwZW5kQnl0ZUJ1ZmZlcikge1xuICAgICAgICAgICAgICAgICAgICBhcHBlbmRCeXRlQnVmZmVyKHsgZmllbGRzOiBmaWVsZHMsIG9iamVjdDogc2VyaWFsaXplZE9iamVjdCwgYjogYiB9KTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUuYXBwZW5kQnl0ZUJ1ZmZlcihiLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGIgPSBiLmNvcHkoMCwgYi5vZmZzZXQpO1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCd0b09iamVjdCcsIG5hbWUgKyAnLicgKyBmaWVsZCwgJ1xcJycgKyByZXN1bHRbZmllbGRdICsgJ1xcJycsIGIudG9IZXgoKSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAvLyB3b3JrLWFyb3VuZCB0byBwcmV2ZW50IGRlYnVnIHRpbWUgY3Jhc2hcbiAgICAgICAgICAgICAgZXJyb3IubWVzc2FnZSA9IG5hbWUgKyAnLicgKyBmaWVsZCArICcgJyArIGVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgZXJyb3IubWVzc2FnZSArPSAnICcgKyBuYW1lICsgJy4nICsgZmllbGQ7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH07XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCdmdW5jdGlvbi1iaW5kJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYmluZC5jYWxsKEZ1bmN0aW9uLmNhbGwsIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuIiwidmFyIHdpbjtcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB3aW4gPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB3aW4gPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKXtcbiAgICB3aW4gPSBzZWxmO1xufSBlbHNlIHtcbiAgICB3aW4gPSB7fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3aW47XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIEJ5dGVCdWZmZXIgPSByZXF1aXJlKCdieXRlYnVmZmVyJyk7XG52YXIgU3RydWN0ID0gcmVxdWlyZSgnLi9zdHJ1Y3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZTogY3JlYXRlLFxuICB0b0J1ZmZlcjogdG9CdWZmZXIsXG4gIGZyb21CdWZmZXI6IGZyb21CdWZmZXJcblxuICAvKipcbiAgICBAc3VtbWFyeSBDcmVhdGUgYSBzZXJpYWxpemVyIGZvciBlYWNoIGRlZmluaXRpb24uXG4gICAgQHJldHVybiB7Q3JlYXRlU3RydWN0fVxuICAqL1xufTtmdW5jdGlvbiBjcmVhdGUoZGVmaW5pdGlvbnMsIHR5cGVzKSB7XG4gIHZhciBjb25maWcgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHR5cGVzLmNvbmZpZztcblxuICB2YXIgZXJyb3JzID0gW107XG4gIGlmICghY29uZmlnLnNvcnQpIHtcbiAgICBjb25maWcuc29ydCA9IHt9O1xuICB9XG5cbiAgLy8gQmFzaWMgc3RydWN0dXJlIHZhbGlkYXRpb25cbiAgZm9yICh2YXIga2V5IGluIGRlZmluaXRpb25zKSB7XG4gICAgdmFyIHZhbHVlID0gZGVmaW5pdGlvbnNba2V5XTtcbiAgICB2YXIgYmFzZSA9IHZhbHVlLmJhc2UsXG4gICAgICAgIGZpZWxkcyA9IHZhbHVlLmZpZWxkcztcblxuICAgIHZhciB0eXBlT2ZWYWx1ZSA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWUpO1xuICAgIGlmICh0eXBlT2ZWYWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICghYmFzZSAmJiAhZmllbGRzKSB7XG4gICAgICAgIGVycm9ycy5wdXNoKCdFeHBlY3RpbmcgJyArIGtleSArICcuZmllbGRzIG9yICcgKyBrZXkgKyAnLmJhc2UnKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoYmFzZSAmJiB0eXBlb2YgYmFzZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgZXJyb3JzLnB1c2goJ0V4cGVjdGluZyBzdHJpbmcgJyArIGtleSArICcuYmFzZScpO1xuICAgICAgfVxuICAgICAgaWYgKGZpZWxkcykge1xuICAgICAgICBpZiAoKHR5cGVvZiBmaWVsZHMgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGZpZWxkcykpICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGVycm9ycy5wdXNoKCdFeHBlY3Rpbmcgb2JqZWN0ICcgKyBrZXkgKyAnLmZpZWxkcycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvciAodmFyIGZpZWxkIGluIGZpZWxkcykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWVsZHNbZmllbGRdICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBlcnJvcnMucHVzaCgnRXhwZWN0aW5nIHN0cmluZyBpbiAnICsga2V5ICsgJy5maWVsZHMuJyArIGZpZWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVPZlZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgZXJyb3JzLnB1c2goJ0V4cGVjdGluZyBvYmplY3Qgb3Igc3RyaW5nIHVuZGVyICcgKyBrZXkgKyAnLCBpbnN0ZWFkIGdvdCAnICsgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWUpKSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gIH1cblxuICAvLyBLZXlzIHdpdGggb2JqZWN0cyBhcmUgc3RydWN0c1xuICB2YXIgc3RydWN0cyA9IHt9O1xuICBmb3IgKHZhciBfa2V5IGluIGRlZmluaXRpb25zKSB7XG4gICAgdmFyIF92YWx1ZSA9IGRlZmluaXRpb25zW19rZXldO1xuICAgIGlmICgodHlwZW9mIF92YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoX3ZhbHVlKSkgPT09ICdvYmplY3QnKSB7XG4gICAgICBzdHJ1Y3RzW19rZXldID0gU3RydWN0KF9rZXksIGNvbmZpZyk7XG4gICAgfVxuICB9XG5cbiAgLy8gUmVzb2x2ZSB1c2VyLWZyaWVuZGx5IHR5cGVkZWYgbmFtZXMgcG9pbnRpbmcgdG8gYSBuYXRpdmUgdHlwZSAob3IgYW5vdGhlciB0eXBlZGVmKVxuICBmb3IgKHZhciBfa2V5MiBpbiBkZWZpbml0aW9ucykge1xuICAgIHZhciBfdmFsdWUyID0gZGVmaW5pdGlvbnNbX2tleTJdO1xuICAgIGlmICh0eXBlb2YgX3ZhbHVlMiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhciB0eXBlID0gdHlwZXNbX3ZhbHVlMl07XG4gICAgICBpZiAodHlwZSkge1xuICAgICAgICB0eXBlc1tfa2V5Ml0gPSB0eXBlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZXhhbXBsZToga2V5ID09PSAnZmllbGRzJyAmJiB2YWx1ZSA9PT0gZmllbGRbXVxuICAgICAgICB2YXIgc3RydWN0ID0gZ2V0VHlwZU9yU3RydWN0KF9rZXkyLCBfdmFsdWUyKTsgLy8gdHlwZSA9IHZlY3RvcihmaWVsZClcbiAgICAgICAgaWYgKHN0cnVjdCkge1xuICAgICAgICAgIHN0cnVjdHNbX2tleTJdID0gc3RydWN0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVycm9ycy5wdXNoKCdVbnJlY29nbml6ZWQgdHlwZSBvciBzdHJ1Y3QgJyArIF9rZXkyICsgJy4nICsgX3ZhbHVlMik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBTdHJ1Y3RzIGNhbiBpbmhlcml0IGFub3RoZXIgc3RydWN0LCB0aGV5IHdpbGwgc2hhcmUgdGhlIHNhbWUgaW5zdGFuY2VcbiAgZm9yICh2YXIgX2tleTMgaW4gZGVmaW5pdGlvbnMpIHtcbiAgICB2YXIgdGhpc1N0cnVjdCA9IHN0cnVjdHNbX2tleTNdO1xuICAgIGlmICghdGhpc1N0cnVjdCkgY29udGludWU7XG4gICAgdmFyIF92YWx1ZTMgPSBkZWZpbml0aW9uc1tfa2V5M107XG4gICAgaWYgKCh0eXBlb2YgX3ZhbHVlMyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoX3ZhbHVlMykpID09PSAnb2JqZWN0JyAmJiBfdmFsdWUzLmJhc2UpIHtcbiAgICAgIHZhciBiYXNlID0gX3ZhbHVlMy5iYXNlO1xuICAgICAgdmFyIGJhc2VTdHJ1Y3QgPSBzdHJ1Y3RzW2Jhc2VdO1xuICAgICAgaWYgKCFiYXNlU3RydWN0KSB7XG4gICAgICAgIGVycm9ycy5wdXNoKCdNaXNzaW5nICcgKyBiYXNlICsgJyBpbiAnICsgX2tleTMgKyAnLmJhc2UnKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB0aGlzU3RydWN0LmFkZCgnJywgc3RydWN0UHRyKGJhc2VTdHJ1Y3QpKTtcbiAgICB9XG4gIH1cblxuICAvLyBDcmVhdGUgdHlwZXMgZnJvbSBhIHN0cmluZyAoZXggdmVjdG9yW1R5cGVdKVxuICBmdW5jdGlvbiBnZXRUeXBlT3JTdHJ1Y3Qoa2V5LCBUeXBlLCB0eXBlQXJncywgZmllbGROYW1lKSB7XG4gICAgdmFyIHR5cGVhdHR5ID0gcGFyc2VUeXBlKFR5cGUpO1xuICAgIGlmICghdHlwZWF0dHkpIHJldHVybiBudWxsO1xuICAgIHZhciBuYW1lID0gdHlwZWF0dHkubmFtZSxcbiAgICAgICAgYW5ub3RhdGlvbiA9IHR5cGVhdHR5LmFubm90YXRpb24sXG4gICAgICAgIGFycmF5VHlwZSA9IHR5cGVhdHR5LmFycmF5VHlwZTtcblxuICAgIHZhciByZXQgPSB2b2lkIDA7XG4gICAgaWYgKGFubm90YXRpb24pIHtcbiAgICAgIC8vIGFueV90eXBlPGZpZWxkX25hbWUsIHR5cGVfbmFtZT5cbiAgICAgIHZhciBfdHlwZSA9IHR5cGVzW25hbWVdO1xuICAgICAgaWYgKF90eXBlID09IG51bGwpIHtcbiAgICAgICAgZXJyb3JzLnB1c2goJ01pc3NpbmcgJyArIG5hbWUgKyAnIGluICcgKyBUeXBlKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICB2YXIgYW5uVHlwZXMgPSBbXTtcbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBhbm5vdGF0aW9uW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgICAgIHZhciBhbm5UeXBlTmFtZSA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICAgICAgdmFyIGFublR5cGUgPSBnZXRUeXBlT3JTdHJ1Y3Qoa2V5LCBhbm5UeXBlTmFtZSwgbnVsbCwgZmllbGROYW1lKTtcbiAgICAgICAgICBpZiAoIWFublR5cGUpIHtcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKCdNaXNzaW5nICcgKyBhbm5UeXBlTmFtZSArICcgaW4gJyArIFR5cGUpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGFublR5cGVzLnB1c2goYW5uVHlwZSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXQgPSBfdHlwZShhbm5UeXBlcyk7XG4gICAgfSBlbHNlIGlmIChhcnJheVR5cGUgPT0gbnVsbCkge1xuICAgICAgLy8gQW55VHlwZVxuICAgICAgdmFyIGZpZWxkU3RydWN0ID0gc3RydWN0c1tuYW1lXTtcbiAgICAgIGlmIChmaWVsZFN0cnVjdCkge1xuICAgICAgICByZXR1cm4gZmllbGRTdHJ1Y3Q7XG4gICAgICB9XG5cbiAgICAgIHZhciBfdHlwZTIgPSB0eXBlc1tuYW1lXTtcbiAgICAgIGlmICghX3R5cGUyKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyB0eXBlcyBuZWVkIHRvIGJlIGluc3RhbnRpYXRlZFxuICAgICAgcmV0ID0gX3R5cGUyKHR5cGVBcmdzKTtcbiAgICB9IGVsc2UgaWYgKGFycmF5VHlwZSA9PT0gJycpIHtcbiAgICAgIC8vIEFueVR5cGVbXVxuICAgICAgdmFyIG5hbWVUeXBlID0gZ2V0VHlwZU9yU3RydWN0KGtleSwgdHlwZWF0dHkubmFtZSwgbnVsbCwgZmllbGROYW1lKTtcbiAgICAgIGlmICghbmFtZVR5cGUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciBzb3J0ID0gY29uZmlnLnNvcnRba2V5ICsgJy4nICsgZmllbGROYW1lXSB8fCBmYWxzZTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdzb3J0PycsIGAke2tleX0uJHtmaWVsZE5hbWV9YCwgc29ydCwgY29uZmlnLnNvcnQpXG4gICAgICByZXQgPSB0eXBlcy52ZWN0b3IobmFtZVR5cGUsIHNvcnQpO1xuICAgIH0gZWxzZSBpZiAoYXJyYXlUeXBlLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIHZlY3RvcltUeXBlXVxuICAgICAgdmFyIGFycmF5VHMgPSBnZXRUeXBlT3JTdHJ1Y3Qoa2V5LCB0eXBlYXR0eS5hcnJheVR5cGUsIG51bGwsIGZpZWxkTmFtZSk7XG4gICAgICBpZiAoIWFycmF5VHMpIHtcbiAgICAgICAgZXJyb3JzLnB1c2goJ01pc3NpbmcgJyArIHR5cGVhdHR5LmFycmF5VHlwZSArICcgaW4gJyArIFR5cGUpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHZhciBiYXNlVHMgPSBnZXRUeXBlT3JTdHJ1Y3Qoa2V5LCB0eXBlYXR0eS5uYW1lLCBhcnJheVRzLCBmaWVsZE5hbWUpO1xuICAgICAgaWYgKCFiYXNlVHMpIHtcbiAgICAgICAgZXJyb3JzLnB1c2goJ01pc3NpbmcgJyArIHR5cGVhdHR5Lm5hbWUgKyAnIGluICcgKyBUeXBlKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICByZXQgPSBiYXNlVHM7XG4gICAgfVxuICAgIHJldHVybiB0eXBlYXR0eS5vcHRpb25hbCA/IHR5cGVzLm9wdGlvbmFsKHJldCkgOiByZXQ7XG4gIH1cblxuICAvLyBBZGQgYWxsIHRoZSBmaWVsZHMuICBUaGFua3MgdG8gc3RydWN0UHRyIG5vIG5lZWQgdG8gbG9vayBhdCBiYXNlIHR5cGVzLlxuICBmb3IgKHZhciBfa2V5NCBpbiBkZWZpbml0aW9ucykge1xuICAgIHZhciBfdGhpc1N0cnVjdCA9IHN0cnVjdHNbX2tleTRdO1xuICAgIGlmICghX3RoaXNTdHJ1Y3QpIGNvbnRpbnVlO1xuICAgIHZhciBfdmFsdWU0ID0gZGVmaW5pdGlvbnNbX2tleTRdO1xuICAgIGlmICghX3ZhbHVlNC5maWVsZHMpIGNvbnRpbnVlO1xuICAgIHZhciBmaWVsZHMgPSBfdmFsdWU0LmZpZWxkcztcblxuICAgIGZvciAodmFyIEZpZWxkIGluIGZpZWxkcykge1xuICAgICAgdmFyIFR5cGUgPSBmaWVsZHNbRmllbGRdO1xuICAgICAgdmFyIHRzID0gZ2V0VHlwZU9yU3RydWN0KF9rZXk0LCBUeXBlLCBudWxsLCBGaWVsZCk7XG4gICAgICBpZiAoIXRzKSB7XG4gICAgICAgIGVycm9ycy5wdXNoKCdNaXNzaW5nICcgKyBUeXBlICsgJyBpbiAnICsgX2tleTQgKyAnLmZpZWxkcy4nICsgRmllbGQpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIF90aGlzU3RydWN0LmFkZChGaWVsZCwgdHMpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChlcnJvcnMubGVuZ3RoKSB7XG4gICAgLy8gJ3N0cnVjdHMnIGNvdWxkIGNvbnRhaW4gaW52YWxpZCByZWZlcmVuY2VzXG4gICAgcmV0dXJuIHsgZXJyb3JzOiBlcnJvcnMgfTtcbiAgfVxuXG4gIHJldHVybiB7IGVycm9yczogZXJyb3JzLCBzdHJ1Y3RzOiBzdHJ1Y3RzIH07XG59XG5cbnZhciBwYXJzZVR5cGUgPSBmdW5jdGlvbiBwYXJzZVR5cGUobmFtZSkge1xuICBpZiAoIW5hbWUgfHwgdHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBuYW1lID0gbmFtZS50cmltKCk7XG5cbiAgdmFyIGFubm90YXRpb25NYXRjaCA9IG5hbWUubWF0Y2goLzwoLiopPi8pO1xuICBpZiAoYW5ub3RhdGlvbk1hdGNoKSB7XG4gICAgdmFyIGFubm90YXRpb24gPSBhbm5vdGF0aW9uTWF0Y2ggPyBhbm5vdGF0aW9uTWF0Y2hbMV0ucmVwbGFjZSgvIC9nLCAnJykuc3BsaXQoJywnKSA6IG51bGw7XG5cbiAgICBuYW1lID0gbmFtZS5yZXBsYWNlKGFubm90YXRpb25NYXRjaFswXSwgJycpLnRyaW0oKTtcbiAgICByZXR1cm4geyBuYW1lOiBuYW1lLCBhbm5vdGF0aW9uOiBhbm5vdGF0aW9uIH07XG4gIH1cblxuICB2YXIgYXJyYXlNYXRjaCA9IG5hbWUubWF0Y2goL1xcWyguKilcXF0vKTtcbiAgdmFyIGFycmF5VHlwZSA9IGFycmF5TWF0Y2ggPyBhcnJheU1hdGNoWzFdLnRyaW0oKSA6IG51bGw7XG5cbiAgaWYgKGFycmF5TWF0Y2gpIHtcbiAgICBuYW1lID0gbmFtZS5yZXBsYWNlKGFycmF5TWF0Y2hbMF0sICcnKS50cmltKCk7XG4gIH1cblxuICB2YXIgb3B0aW9uYWwgPSBmYWxzZTtcbiAgaWYgKC9cXD8kLy50ZXN0KG5hbWUpKSB7XG4gICAgbmFtZSA9IG5hbWUuc3Vic3RyaW5nKDAsIG5hbWUubGVuZ3RoIC0gMSk7XG4gICAgb3B0aW9uYWwgPSB0cnVlO1xuICB9XG4gIHJldHVybiB7IG5hbWU6IG5hbWUsIGFycmF5VHlwZTogYXJyYXlUeXBlLCBvcHRpb25hbDogb3B0aW9uYWwgfTtcbn07XG5cbi8qKlxuICBCYXNlIHR5cGVzIGFsbCBwb2ludCB0byB0aGUgc2FtZSBzdHJ1Y3QuXG5cbiAgTm90ZSwgYXBwZW5kQnl0ZUJ1ZmZlciBoYXMgbm8gcmV0dXJuIHR5cGUuXG4qL1xudmFyIHN0cnVjdFB0ciA9IGZ1bmN0aW9uIHN0cnVjdFB0cih0eXBlKSB7XG4gIHJldHVybiB7XG4gICAgZnJvbUJ5dGVCdWZmZXI6IGZ1bmN0aW9uIGZyb21CeXRlQnVmZmVyKGIpIHtcbiAgICAgIHJldHVybiB0eXBlLmZyb21CeXRlQnVmZmVyKGIpO1xuICAgIH0sXG4gICAgYXBwZW5kQnl0ZUJ1ZmZlcjogZnVuY3Rpb24gYXBwZW5kQnl0ZUJ1ZmZlcihiLCB2YWx1ZSkge1xuICAgICAgdHlwZS5hcHBlbmRCeXRlQnVmZmVyKGIsIHZhbHVlKTtcbiAgICB9LFxuICAgIGZyb21PYmplY3Q6IGZ1bmN0aW9uIGZyb21PYmplY3QodmFsdWUpIHtcbiAgICAgIHJldHVybiB0eXBlLmZyb21PYmplY3QodmFsdWUpO1xuICAgIH0sXG4gICAgdG9PYmplY3Q6IGZ1bmN0aW9uIHRvT2JqZWN0KHZhbHVlKSB7XG4gICAgICByZXR1cm4gdHlwZS50b09iamVjdCh2YWx1ZSk7XG4gICAgfVxuICB9O1xufTtcblxuZnVuY3Rpb24gdG9CdWZmZXIodHlwZSwgdmFsdWUpIHtcbiAgdmFyIHN0cnVjdCA9IHR5cGUuZnJvbU9iamVjdCh2YWx1ZSk7XG4gIHJldHVybiBCdWZmZXIuZnJvbSh0b0J5dGVCdWZmZXIodHlwZSwgc3RydWN0KS50b0JpbmFyeSgpLCAnYmluYXJ5Jyk7XG59XG5cbmZ1bmN0aW9uIGZyb21CdWZmZXIodHlwZSwgYnVmZmVyKSB7XG4gIHZhciB0b09iamVjdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogdHJ1ZTtcblxuICB2YXIgYiA9IEJ5dGVCdWZmZXIuZnJvbUJpbmFyeShidWZmZXIudG9TdHJpbmcoJ2JpbmFyeScpLCBCeXRlQnVmZmVyLkxJVFRMRV9FTkRJQU4pO1xuICB2YXIgc3RydWN0ID0gdHlwZS5mcm9tQnl0ZUJ1ZmZlcihiKTtcbiAgcmV0dXJuIHRvT2JqZWN0ID8gdHlwZS50b09iamVjdChzdHJ1Y3QpIDogc3RydWN0O1xufVxuXG5mdW5jdGlvbiB0b0J5dGVCdWZmZXIodHlwZSwgdmFsdWUpIHtcbiAgdmFyIGIgPSBuZXcgQnl0ZUJ1ZmZlcihCeXRlQnVmZmVyLkRFRkFVTFRfQ0FQQUNJVFksIEJ5dGVCdWZmZXIuTElUVExFX0VORElBTik7XG4gIHR5cGUuYXBwZW5kQnl0ZUJ1ZmZlcihiLCB2YWx1ZSk7XG4gIHJldHVybiBiLmNvcHkoMCwgYi5vZmZzZXQpO1xufSJdLCJzb3VyY2VSb290IjoiIn0=