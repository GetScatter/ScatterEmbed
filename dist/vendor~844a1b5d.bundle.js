(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[26],{

/***/ "2J3U":
/***/ (function(module, exports) {

module.exports = IdIterator

function IdIterator(opts){
  opts = opts || {}
  var max = opts.max || Number.MAX_SAFE_INTEGER
  var idCounter = typeof opts.start !== 'undefined' ? opts.start : Math.floor(Math.random() * max)

  return function createRandomId () {
    idCounter = idCounter % max
    return idCounter++
  }

}

/***/ }),

/***/ "6IJF":
/***/ (function(module, exports) {

module.exports = function(modules) {
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.l = !0, module.exports;
    }
    var installedModules = {};
    return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
    __webpack_require__.i = function(value) {
        return value;
    }, __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            configurable: !1,
            enumerable: !0,
            get: getter
        });
    }, __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module.default;
        } : function() {
            return module;
        };
        return __webpack_require__.d(getter, "a", getter), getter;
    }, __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }, __webpack_require__.p = "dist", __webpack_require__(__webpack_require__.s = 6);
}([ function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    Object.defineProperty(__webpack_exports__, "__esModule", {
        value: !0
    });
    var __WEBPACK_IMPORTED_MODULE_0__helpers__ = __webpack_require__(5), __WEBPACK_IMPORTED_MODULE_1__style_less__ = __webpack_require__(4), DATE_STRING_REGEX = (__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style_less__), 
    /(^\d{1,4}[\.|\\\/|-]\d{1,2}[\.|\\\/|-]\d{1,4})(\s*(?:0?[1-9]:[0-5]|1(?=[012])\d:[0-5])\d\s*[ap]m)?$/), PARTIAL_DATE_REGEX = /\d{2}:\d{2}:\d{2} GMT-\d{4}/, JSON_DATE_REGEX = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/, requestAnimationFrame = window.requestAnimationFrame || function(cb) {
        return cb(), 0;
    }, _defaultConfig = {
        hoverPreviewEnabled: !1,
        hoverPreviewArrayCount: 100,
        hoverPreviewFieldCount: 5,
        animateOpen: !0,
        animateClose: !0,
        theme: null,
        useToJSON: !0,
        sortPropertiesBy: null
    }, JSONFormatter = function() {
        function JSONFormatter(json, open, config, key) {
            void 0 === open && (open = 1), void 0 === config && (config = _defaultConfig), this.json = json, 
            this.open = open, this.config = config, this.key = key, this._isOpen = null, void 0 === this.config.hoverPreviewEnabled && (this.config.hoverPreviewEnabled = _defaultConfig.hoverPreviewEnabled), 
            void 0 === this.config.hoverPreviewArrayCount && (this.config.hoverPreviewArrayCount = _defaultConfig.hoverPreviewArrayCount), 
            void 0 === this.config.hoverPreviewFieldCount && (this.config.hoverPreviewFieldCount = _defaultConfig.hoverPreviewFieldCount), 
            void 0 === this.config.useToJSON && (this.config.useToJSON = _defaultConfig.useToJSON);
        }
        return Object.defineProperty(JSONFormatter.prototype, "isOpen", {
            get: function() {
                return null !== this._isOpen ? this._isOpen : this.open > 0;
            },
            set: function(value) {
                this._isOpen = value;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(JSONFormatter.prototype, "isDate", {
            get: function() {
                return this.json instanceof Date || "string" === this.type && (DATE_STRING_REGEX.test(this.json) || JSON_DATE_REGEX.test(this.json) || PARTIAL_DATE_REGEX.test(this.json));
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(JSONFormatter.prototype, "isUrl", {
            get: function() {
                return "string" === this.type && 0 === this.json.indexOf("http");
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(JSONFormatter.prototype, "isArray", {
            get: function() {
                return Array.isArray(this.json);
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(JSONFormatter.prototype, "isObject", {
            get: function() {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.a)(this.json);
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(JSONFormatter.prototype, "isEmptyObject", {
            get: function() {
                return !this.keys.length && !this.isArray;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(JSONFormatter.prototype, "isEmpty", {
            get: function() {
                return this.isEmptyObject || this.keys && !this.keys.length && this.isArray;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(JSONFormatter.prototype, "useToJSON", {
            get: function() {
                return this.config.useToJSON && "stringifiable" === this.type;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(JSONFormatter.prototype, "hasKey", {
            get: function() {
                return void 0 !== this.key;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(JSONFormatter.prototype, "constructorName", {
            get: function() {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.b)(this.json);
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(JSONFormatter.prototype, "type", {
            get: function() {
                return null === this.json ? "null" : this.config.useToJSON && this.json && this.json.toJSON ? "stringifiable" : typeof this.json;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(JSONFormatter.prototype, "keys", {
            get: function() {
                if (this.isObject) {
                    var keys = Object.keys(this.json).map(function(key) {
                        return key || '""';
                    });
                    return !this.isArray && this.config.sortPropertiesBy ? keys.sort(this.config.sortPropertiesBy) : keys;
                }
                return [];
            },
            enumerable: !0,
            configurable: !0
        }), JSONFormatter.prototype.toggleOpen = function() {
            this.isOpen = !this.isOpen, this.element && (this.isOpen ? this.appendChildren(this.config.animateOpen) : this.removeChildren(this.config.animateClose), 
            this.element.classList.toggle(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.c)("open")));
        }, JSONFormatter.prototype.openAtDepth = function(depth) {
            void 0 === depth && (depth = 1), depth < 0 || (this.open = depth, this.isOpen = 0 !== depth, 
            this.element && (this.removeChildren(!1), 0 === depth ? this.element.classList.remove(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.c)("open")) : (this.appendChildren(this.config.animateOpen), 
            this.element.classList.add(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.c)("open")))));
        }, JSONFormatter.prototype.getInlinepreview = function() {
            var _this = this;
            if (this.isArray) return this.json.length > this.config.hoverPreviewArrayCount ? "Array[" + this.json.length + "]" : "[" + this.json.map(__WEBPACK_IMPORTED_MODULE_0__helpers__.d).join(", ") + "]";
            var keys = this.keys, narrowKeys = keys.slice(0, this.config.hoverPreviewFieldCount), kvs = narrowKeys.map(function(key) {
                return key + ":" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.d)(_this.type, _this.json[key]);
            }), ellipsis = keys.length >= this.config.hoverPreviewFieldCount ? "…" : "";
            return "{" + kvs.join(", ") + ellipsis + "}";
        }, JSONFormatter.prototype.render = function() {
            this.element = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.e)("div", "row");
            var togglerLink = this.isObject ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.e)("a", "toggler-link") : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.e)("span");
            if (this.isObject && !this.useToJSON && togglerLink.appendChild(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.e)("span", "toggler")), 
            this.hasKey && togglerLink.appendChild(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.e)("span", "key", this.key + ":")), 
            this.isObject && !this.useToJSON) {
                var value = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.e)("span", "value"), objectWrapperSpan = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.e)("span"), constructorName = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.e)("span", "constructor-name", this.constructorName);
                if (objectWrapperSpan.appendChild(constructorName), this.isArray) {
                    var arrayWrapperSpan = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.e)("span");
                    arrayWrapperSpan.appendChild(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.e)("span", "bracket", "[")), 
                    arrayWrapperSpan.appendChild(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.e)("span", "number", this.json.length)), 
                    arrayWrapperSpan.appendChild(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.e)("span", "bracket", "]")), 
                    objectWrapperSpan.appendChild(arrayWrapperSpan);
                }
                value.appendChild(objectWrapperSpan), togglerLink.appendChild(value);
            } else {
                var value = this.isUrl ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.e)("a") : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.e)("span");
                value.classList.add(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.c)(this.type)), 
                this.isDate && value.classList.add(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.c)("date")), 
                this.isUrl && (value.classList.add(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.c)("url")), 
                value.setAttribute("href", this.json));
                var valuePreview = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.f)(this.type, this.json, this.useToJSON ? this.json.toJSON() : this.json);
                value.appendChild(document.createTextNode(valuePreview)), togglerLink.appendChild(value);
            }
            if (this.isObject && this.config.hoverPreviewEnabled) {
                var preview = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.e)("span", "preview-text");
                preview.appendChild(document.createTextNode(this.getInlinepreview())), togglerLink.appendChild(preview);
            }
            var children = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.e)("div", "children");
            return this.isObject && children.classList.add(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.c)("object")), 
            this.isArray && children.classList.add(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.c)("array")), 
            this.isEmpty && children.classList.add(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.c)("empty")), 
            this.config && this.config.theme && this.element.classList.add(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.c)(this.config.theme)), 
            this.isOpen && this.element.classList.add(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.c)("open")), 
            this.element.appendChild(togglerLink), this.element.appendChild(children), this.isObject && this.isOpen && this.appendChildren(), 
            this.isObject && !this.useToJSON && togglerLink.addEventListener("click", this.toggleOpen.bind(this)), 
            this.element;
        }, JSONFormatter.prototype.appendChildren = function(animated) {
            var _this = this;
            void 0 === animated && (animated = !1);
            var children = this.element.querySelector("div." + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.c)("children"));
            if (children && !this.isEmpty) if (animated) {
                var index_1 = 0, addAChild_1 = function() {
                    var key = _this.keys[index_1], formatter = new JSONFormatter(_this.json[key], _this.open - 1, _this.config, key);
                    children.appendChild(formatter.render()), (index_1 += 1) < _this.keys.length && (index_1 > 10 ? addAChild_1() : requestAnimationFrame(addAChild_1));
                };
                requestAnimationFrame(addAChild_1);
            } else this.keys.forEach(function(key) {
                var formatter = new JSONFormatter(_this.json[key], _this.open - 1, _this.config, key);
                children.appendChild(formatter.render());
            });
        }, JSONFormatter.prototype.removeChildren = function(animated) {
            void 0 === animated && (animated = !1);
            var childrenElement = this.element.querySelector("div." + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__.c)("children"));
            if (animated) {
                var childrenRemoved_1 = 0, removeAChild_1 = function() {
                    childrenElement && childrenElement.children.length && (childrenElement.removeChild(childrenElement.children[0]), 
                    childrenRemoved_1 += 1, childrenRemoved_1 > 10 ? removeAChild_1() : requestAnimationFrame(removeAChild_1));
                };
                requestAnimationFrame(removeAChild_1);
            } else childrenElement && (childrenElement.innerHTML = "");
        }, JSONFormatter;
    }();
    __webpack_exports__.default = JSONFormatter;
}, function(module, exports, __webpack_require__) {
    exports = module.exports = __webpack_require__(2)(), exports.push([ module.i, '.json-formatter-row {\n  font-family: monospace;\n}\n.json-formatter-row,\n.json-formatter-row a,\n.json-formatter-row a:hover {\n  color: black;\n  text-decoration: none;\n}\n.json-formatter-row .json-formatter-row {\n  margin-left: 1rem;\n}\n.json-formatter-row .json-formatter-children.json-formatter-empty {\n  opacity: 0.5;\n  margin-left: 1rem;\n}\n.json-formatter-row .json-formatter-children.json-formatter-empty:after {\n  display: none;\n}\n.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-object:after {\n  content: "No properties";\n}\n.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-array:after {\n  content: "[]";\n}\n.json-formatter-row .json-formatter-string,\n.json-formatter-row .json-formatter-stringifiable {\n  color: green;\n  white-space: pre;\n  word-wrap: break-word;\n}\n.json-formatter-row .json-formatter-number {\n  color: blue;\n}\n.json-formatter-row .json-formatter-boolean {\n  color: red;\n}\n.json-formatter-row .json-formatter-null {\n  color: #855A00;\n}\n.json-formatter-row .json-formatter-undefined {\n  color: #ca0b69;\n}\n.json-formatter-row .json-formatter-function {\n  color: #FF20ED;\n}\n.json-formatter-row .json-formatter-date {\n  background-color: rgba(0, 0, 0, 0.05);\n}\n.json-formatter-row .json-formatter-url {\n  text-decoration: underline;\n  color: blue;\n  cursor: pointer;\n}\n.json-formatter-row .json-formatter-bracket {\n  color: blue;\n}\n.json-formatter-row .json-formatter-key {\n  color: #00008B;\n  padding-right: 0.2rem;\n}\n.json-formatter-row .json-formatter-toggler-link {\n  cursor: pointer;\n}\n.json-formatter-row .json-formatter-toggler {\n  line-height: 1.2rem;\n  font-size: 0.7rem;\n  vertical-align: middle;\n  opacity: 0.6;\n  cursor: pointer;\n  padding-right: 0.2rem;\n}\n.json-formatter-row .json-formatter-toggler:after {\n  display: inline-block;\n  transition: transform 100ms ease-in;\n  content: "\\25BA";\n}\n.json-formatter-row > a > .json-formatter-preview-text {\n  opacity: 0;\n  transition: opacity 0.15s ease-in;\n  font-style: italic;\n}\n.json-formatter-row:hover > a > .json-formatter-preview-text {\n  opacity: 0.6;\n}\n.json-formatter-row.json-formatter-open > .json-formatter-toggler-link .json-formatter-toggler:after {\n  transform: rotate(90deg);\n}\n.json-formatter-row.json-formatter-open > .json-formatter-children:after {\n  display: inline-block;\n}\n.json-formatter-row.json-formatter-open > a > .json-formatter-preview-text {\n  display: none;\n}\n.json-formatter-row.json-formatter-open.json-formatter-empty:after {\n  display: block;\n}\n.json-formatter-dark.json-formatter-row {\n  font-family: monospace;\n}\n.json-formatter-dark.json-formatter-row,\n.json-formatter-dark.json-formatter-row a,\n.json-formatter-dark.json-formatter-row a:hover {\n  color: white;\n  text-decoration: none;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-row {\n  margin-left: 1rem;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty {\n  opacity: 0.5;\n  margin-left: 1rem;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty:after {\n  display: none;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-object:after {\n  content: "No properties";\n}\n.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-array:after {\n  content: "[]";\n}\n.json-formatter-dark.json-formatter-row .json-formatter-string,\n.json-formatter-dark.json-formatter-row .json-formatter-stringifiable {\n  color: #31F031;\n  white-space: pre;\n  word-wrap: break-word;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-number {\n  color: #66C2FF;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-boolean {\n  color: #EC4242;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-null {\n  color: #EEC97D;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-undefined {\n  color: #ef8fbe;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-function {\n  color: #FD48CB;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-date {\n  background-color: rgba(255, 255, 255, 0.05);\n}\n.json-formatter-dark.json-formatter-row .json-formatter-url {\n  text-decoration: underline;\n  color: #027BFF;\n  cursor: pointer;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-bracket {\n  color: #9494FF;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-key {\n  color: #23A0DB;\n  padding-right: 0.2rem;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-toggler-link {\n  cursor: pointer;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-toggler {\n  line-height: 1.2rem;\n  font-size: 0.7rem;\n  vertical-align: middle;\n  opacity: 0.6;\n  cursor: pointer;\n  padding-right: 0.2rem;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-toggler:after {\n  display: inline-block;\n  transition: transform 100ms ease-in;\n  content: "\\25BA";\n}\n.json-formatter-dark.json-formatter-row > a > .json-formatter-preview-text {\n  opacity: 0;\n  transition: opacity 0.15s ease-in;\n  font-style: italic;\n}\n.json-formatter-dark.json-formatter-row:hover > a > .json-formatter-preview-text {\n  opacity: 0.6;\n}\n.json-formatter-dark.json-formatter-row.json-formatter-open > .json-formatter-toggler-link .json-formatter-toggler:after {\n  transform: rotate(90deg);\n}\n.json-formatter-dark.json-formatter-row.json-formatter-open > .json-formatter-children:after {\n  display: inline-block;\n}\n.json-formatter-dark.json-formatter-row.json-formatter-open > a > .json-formatter-preview-text {\n  display: none;\n}\n.json-formatter-dark.json-formatter-row.json-formatter-open.json-formatter-empty:after {\n  display: block;\n}\n', "" ]);
}, function(module, exports) {
    module.exports = function() {
        var list = [];
        return list.toString = function() {
            for (var result = [], i = 0; i < this.length; i++) {
                var item = this[i];
                item[2] ? result.push("@media " + item[2] + "{" + item[1] + "}") : result.push(item[1]);
            }
            return result.join("");
        }, list.i = function(modules, mediaQuery) {
            "string" == typeof modules && (modules = [ [ null, modules, "" ] ]);
            for (var alreadyImportedModules = {}, i = 0; i < this.length; i++) {
                var id = this[i][0];
                "number" == typeof id && (alreadyImportedModules[id] = !0);
            }
            for (i = 0; i < modules.length; i++) {
                var item = modules[i];
                "number" == typeof item[0] && alreadyImportedModules[item[0]] || (mediaQuery && !item[2] ? item[2] = mediaQuery : mediaQuery && (item[2] = "(" + item[2] + ") and (" + mediaQuery + ")"), 
                list.push(item));
            }
        }, list;
    };
}, function(module, exports) {
    function addStylesToDom(styles, options) {
        for (var i = 0; i < styles.length; i++) {
            var item = styles[i], domStyle = stylesInDom[item.id];
            if (domStyle) {
                domStyle.refs++;
                for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j](item.parts[j]);
                for (;j < item.parts.length; j++) domStyle.parts.push(addStyle(item.parts[j], options));
            } else {
                for (var parts = [], j = 0; j < item.parts.length; j++) parts.push(addStyle(item.parts[j], options));
                stylesInDom[item.id] = {
                    id: item.id,
                    refs: 1,
                    parts: parts
                };
            }
        }
    }
    function listToStyles(list) {
        for (var styles = [], newStyles = {}, i = 0; i < list.length; i++) {
            var item = list[i], id = item[0], css = item[1], media = item[2], sourceMap = item[3], part = {
                css: css,
                media: media,
                sourceMap: sourceMap
            };
            newStyles[id] ? newStyles[id].parts.push(part) : styles.push(newStyles[id] = {
                id: id,
                parts: [ part ]
            });
        }
        return styles;
    }
    function insertStyleElement(options, styleElement) {
        var head = getHeadElement(), lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
        if ("top" === options.insertAt) lastStyleElementInsertedAtTop ? lastStyleElementInsertedAtTop.nextSibling ? head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling) : head.appendChild(styleElement) : head.insertBefore(styleElement, head.firstChild), 
        styleElementsInsertedAtTop.push(styleElement); else {
            if ("bottom" !== options.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
            head.appendChild(styleElement);
        }
    }
    function removeStyleElement(styleElement) {
        styleElement.parentNode.removeChild(styleElement);
        var idx = styleElementsInsertedAtTop.indexOf(styleElement);
        idx >= 0 && styleElementsInsertedAtTop.splice(idx, 1);
    }
    function createStyleElement(options) {
        var styleElement = document.createElement("style");
        return styleElement.type = "text/css", insertStyleElement(options, styleElement), 
        styleElement;
    }
    function createLinkElement(options) {
        var linkElement = document.createElement("link");
        return linkElement.rel = "stylesheet", insertStyleElement(options, linkElement), 
        linkElement;
    }
    function addStyle(obj, options) {
        var styleElement, update, remove;
        if (options.singleton) {
            var styleIndex = singletonCounter++;
            styleElement = singletonElement || (singletonElement = createStyleElement(options)), 
            update = applyToSingletonTag.bind(null, styleElement, styleIndex, !1), remove = applyToSingletonTag.bind(null, styleElement, styleIndex, !0);
        } else obj.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (styleElement = createLinkElement(options), 
        update = updateLink.bind(null, styleElement), remove = function() {
            removeStyleElement(styleElement), styleElement.href && URL.revokeObjectURL(styleElement.href);
        }) : (styleElement = createStyleElement(options), update = applyToTag.bind(null, styleElement), 
        remove = function() {
            removeStyleElement(styleElement);
        });
        return update(obj), function(newObj) {
            if (newObj) {
                if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) return;
                update(obj = newObj);
            } else remove();
        };
    }
    function applyToSingletonTag(styleElement, index, remove, obj) {
        var css = remove ? "" : obj.css;
        if (styleElement.styleSheet) styleElement.styleSheet.cssText = replaceText(index, css); else {
            var cssNode = document.createTextNode(css), childNodes = styleElement.childNodes;
            childNodes[index] && styleElement.removeChild(childNodes[index]), childNodes.length ? styleElement.insertBefore(cssNode, childNodes[index]) : styleElement.appendChild(cssNode);
        }
    }
    function applyToTag(styleElement, obj) {
        var css = obj.css, media = obj.media;
        if (media && styleElement.setAttribute("media", media), styleElement.styleSheet) styleElement.styleSheet.cssText = css; else {
            for (;styleElement.firstChild; ) styleElement.removeChild(styleElement.firstChild);
            styleElement.appendChild(document.createTextNode(css));
        }
    }
    function updateLink(linkElement, obj) {
        var css = obj.css, sourceMap = obj.sourceMap;
        sourceMap && (css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */");
        var blob = new Blob([ css ], {
            type: "text/css"
        }), oldSrc = linkElement.href;
        linkElement.href = URL.createObjectURL(blob), oldSrc && URL.revokeObjectURL(oldSrc);
    }
    var stylesInDom = {}, memoize = function(fn) {
        var memo;
        return function() {
            return void 0 === memo && (memo = fn.apply(this, arguments)), memo;
        };
    }, isOldIE = memoize(function() {
        return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
    }), getHeadElement = memoize(function() {
        return document.head || document.getElementsByTagName("head")[0];
    }), singletonElement = null, singletonCounter = 0, styleElementsInsertedAtTop = [];
    module.exports = function(list, options) {
        if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
        options = options || {}, void 0 === options.singleton && (options.singleton = isOldIE()), 
        void 0 === options.insertAt && (options.insertAt = "bottom");
        var styles = listToStyles(list);
        return addStylesToDom(styles, options), function(newList) {
            for (var mayRemove = [], i = 0; i < styles.length; i++) {
                var item = styles[i], domStyle = stylesInDom[item.id];
                domStyle.refs--, mayRemove.push(domStyle);
            }
            if (newList) {
                addStylesToDom(listToStyles(newList), options);
            }
            for (var i = 0; i < mayRemove.length; i++) {
                var domStyle = mayRemove[i];
                if (0 === domStyle.refs) {
                    for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();
                    delete stylesInDom[domStyle.id];
                }
            }
        };
    };
    var replaceText = function() {
        var textStore = [];
        return function(index, replacement) {
            return textStore[index] = replacement, textStore.filter(Boolean).join("\n");
        };
    }();
}, function(module, exports, __webpack_require__) {
    var content = __webpack_require__(1);
    "string" == typeof content && (content = [ [ module.i, content, "" ] ]);
    __webpack_require__(3)(content, {});
    content.locals && (module.exports = content.locals);
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    function escapeString(str) {
        return str.replace('"', '"');
    }
    function isObject(value) {
        var type = typeof value;
        return !!value && "object" == type;
    }
    function getObjectName(object) {
        if (void 0 === object) return "";
        if (null === object) return "Object";
        if ("object" == typeof object && !object.constructor) return "Object";
        var funcNameRegex = /function ([^(]*)/, results = funcNameRegex.exec(object.constructor.toString());
        return results && results.length > 1 ? results[1] : "";
    }
    function getValuePreview(type, object, value) {
        return "null" === type || "undefined" === type ? type : ("string" !== type && "stringifiable" !== type || (value = '"' + escapeString(value) + '"'), 
        "function" === type ? object.toString().replace(/[\r\n]/g, "").replace(/\{.*\}/, "") + "{…}" : value);
    }
    function getPreview(type, object) {
        var value = "";
        return isObject(object) ? (value = getObjectName(object), Array.isArray(object) && (value += "[" + object.length + "]")) : value = getValuePreview(type, object, object), 
        value;
    }
    function cssClass(className) {
        return "json-formatter-" + className;
    }
    function createElement(type, className, content) {
        var el = document.createElement(type);
        return className && el.classList.add(cssClass(className)), void 0 !== content && (content instanceof Node ? el.appendChild(content) : el.appendChild(document.createTextNode(String(content)))), 
        el;
    }
    __webpack_exports__.a = isObject, __webpack_exports__.b = getObjectName, __webpack_exports__.f = getValuePreview, 
    __webpack_exports__.d = getPreview, __webpack_exports__.c = cssClass, __webpack_exports__.e = createElement;
}, function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(0);
} ]);
//# sourceMappingURL=json-formatter.js.map

/***/ }),

/***/ "RGXH":
/***/ (function(module, exports) {

var at, // The index of the current character
    ch, // The current character
    escapee = {
        '"':  '"',
        '\\': '\\',
        '/':  '/',
        b:    '\b',
        f:    '\f',
        n:    '\n',
        r:    '\r',
        t:    '\t'
    },
    text,

    error = function (m) {
        // Call error when something is wrong.
        throw {
            name:    'SyntaxError',
            message: m,
            at:      at,
            text:    text
        };
    },
    
    next = function (c) {
        // If a c parameter is provided, verify that it matches the current character.
        if (c && c !== ch) {
            error("Expected '" + c + "' instead of '" + ch + "'");
        }
        
        // Get the next character. When there are no more characters,
        // return the empty string.
        
        ch = text.charAt(at);
        at += 1;
        return ch;
    },
    
    number = function () {
        // Parse a number value.
        var number,
            string = '';
        
        if (ch === '-') {
            string = '-';
            next('-');
        }
        while (ch >= '0' && ch <= '9') {
            string += ch;
            next();
        }
        if (ch === '.') {
            string += '.';
            while (next() && ch >= '0' && ch <= '9') {
                string += ch;
            }
        }
        if (ch === 'e' || ch === 'E') {
            string += ch;
            next();
            if (ch === '-' || ch === '+') {
                string += ch;
                next();
            }
            while (ch >= '0' && ch <= '9') {
                string += ch;
                next();
            }
        }
        number = +string;
        if (!isFinite(number)) {
            error("Bad number");
        } else {
            return number;
        }
    },
    
    string = function () {
        // Parse a string value.
        var hex,
            i,
            string = '',
            uffff;
        
        // When parsing for string values, we must look for " and \ characters.
        if (ch === '"') {
            while (next()) {
                if (ch === '"') {
                    next();
                    return string;
                } else if (ch === '\\') {
                    next();
                    if (ch === 'u') {
                        uffff = 0;
                        for (i = 0; i < 4; i += 1) {
                            hex = parseInt(next(), 16);
                            if (!isFinite(hex)) {
                                break;
                            }
                            uffff = uffff * 16 + hex;
                        }
                        string += String.fromCharCode(uffff);
                    } else if (typeof escapee[ch] === 'string') {
                        string += escapee[ch];
                    } else {
                        break;
                    }
                } else {
                    string += ch;
                }
            }
        }
        error("Bad string");
    },

    white = function () {

// Skip whitespace.

        while (ch && ch <= ' ') {
            next();
        }
    },

    word = function () {

// true, false, or null.

        switch (ch) {
        case 't':
            next('t');
            next('r');
            next('u');
            next('e');
            return true;
        case 'f':
            next('f');
            next('a');
            next('l');
            next('s');
            next('e');
            return false;
        case 'n':
            next('n');
            next('u');
            next('l');
            next('l');
            return null;
        }
        error("Unexpected '" + ch + "'");
    },

    value,  // Place holder for the value function.

    array = function () {

// Parse an array value.

        var array = [];

        if (ch === '[') {
            next('[');
            white();
            if (ch === ']') {
                next(']');
                return array;   // empty array
            }
            while (ch) {
                array.push(value());
                white();
                if (ch === ']') {
                    next(']');
                    return array;
                }
                next(',');
                white();
            }
        }
        error("Bad array");
    },

    object = function () {

// Parse an object value.

        var key,
            object = {};

        if (ch === '{') {
            next('{');
            white();
            if (ch === '}') {
                next('}');
                return object;   // empty object
            }
            while (ch) {
                key = string();
                white();
                next(':');
                if (Object.hasOwnProperty.call(object, key)) {
                    error('Duplicate key "' + key + '"');
                }
                object[key] = value();
                white();
                if (ch === '}') {
                    next('}');
                    return object;
                }
                next(',');
                white();
            }
        }
        error("Bad object");
    };

value = function () {

// Parse a JSON value. It could be an object, an array, a string, a number,
// or a word.

    white();
    switch (ch) {
    case '{':
        return object();
    case '[':
        return array();
    case '"':
        return string();
    case '-':
        return number();
    default:
        return ch >= '0' && ch <= '9' ? number() : word();
    }
};

// Return the json_parse function. It will have access to all of the above
// functions and variables.

module.exports = function (source, reviver) {
    var result;
    
    text = source;
    at = 0;
    ch = ' ';
    result = value();
    white();
    if (ch) {
        error("Syntax error");
    }

    // If there is a reviver function, we recursively walk the new structure,
    // passing each name/value pair to the reviver function for possible
    // transformation, starting with a temporary root object that holds the result
    // in an empty key. If there is not a reviver function, we simply return the
    // result.

    return typeof reviver === 'function' ? (function walk(holder, key) {
        var k, v, value = holder[key];
        if (value && typeof value === 'object') {
            for (k in value) {
                if (Object.prototype.hasOwnProperty.call(value, k)) {
                    v = walk(value, k);
                    if (v !== undefined) {
                        value[k] = v;
                    } else {
                        delete value[k];
                    }
                }
            }
        }
        return reviver.call(holder, key, value);
    }({'': result}, '')) : result;
};


/***/ }),

/***/ "dsut":
/***/ (function(module, exports, __webpack_require__) {

exports.parse = __webpack_require__("RGXH");
exports.stringify = __webpack_require__("uPSP");


/***/ }),

/***/ "rE/H":
/***/ (function(module, exports, __webpack_require__) {

var json = typeof JSON !== 'undefined' ? JSON : __webpack_require__("dsut");

module.exports = function (obj, opts) {
    if (!opts) opts = {};
    if (typeof opts === 'function') opts = { cmp: opts };
    var space = opts.space || '';
    if (typeof space === 'number') space = Array(space+1).join(' ');
    var cycles = (typeof opts.cycles === 'boolean') ? opts.cycles : false;
    var replacer = opts.replacer || function(key, value) { return value; };

    var cmp = opts.cmp && (function (f) {
        return function (node) {
            return function (a, b) {
                var aobj = { key: a, value: node[a] };
                var bobj = { key: b, value: node[b] };
                return f(aobj, bobj);
            };
        };
    })(opts.cmp);

    var seen = [];
    return (function stringify (parent, key, node, level) {
        var indent = space ? ('\n' + new Array(level + 1).join(space)) : '';
        var colonSeparator = space ? ': ' : ':';

        if (node && node.toJSON && typeof node.toJSON === 'function') {
            node = node.toJSON();
        }

        node = replacer.call(parent, key, node);

        if (node === undefined) {
            return;
        }
        if (typeof node !== 'object' || node === null) {
            return json.stringify(node);
        }
        if (isArray(node)) {
            var out = [];
            for (var i = 0; i < node.length; i++) {
                var item = stringify(node, i, node[i], level+1) || json.stringify(null);
                out.push(indent + space + item);
            }
            return '[' + out.join(',') + indent + ']';
        }
        else {
            if (seen.indexOf(node) !== -1) {
                if (cycles) return json.stringify('__cycle__');
                throw new TypeError('Converting circular structure to JSON');
            }
            else seen.push(node);

            var keys = objectKeys(node).sort(cmp && cmp(node));
            var out = [];
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = stringify(node, key, node[key], level+1);

                if(!value) continue;

                var keyValue = json.stringify(key)
                    + colonSeparator
                    + value;
                ;
                out.push(indent + space + keyValue);
            }
            seen.splice(seen.indexOf(node), 1);
            return '{' + out.join(',') + indent + '}';
        }
    })({ '': obj }, '', obj, 0);
};

var isArray = Array.isArray || function (x) {
    return {}.toString.call(x) === '[object Array]';
};

var objectKeys = Object.keys || function (obj) {
    var has = Object.prototype.hasOwnProperty || function () { return true };
    var keys = [];
    for (var key in obj) {
        if (has.call(obj, key)) keys.push(key);
    }
    return keys;
};


/***/ }),

/***/ "uPSP":
/***/ (function(module, exports) {

var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    gap,
    indent,
    meta = {    // table of character substitutions
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"' : '\\"',
        '\\': '\\\\'
    },
    rep;

function quote(string) {
    // If the string contains no control characters, no quote characters, and no
    // backslash characters, then we can safely slap some quotes around it.
    // Otherwise we must also replace the offending characters with safe escape
    // sequences.
    
    escapable.lastIndex = 0;
    return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
        var c = meta[a];
        return typeof c === 'string' ? c :
            '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + string + '"';
}

function str(key, holder) {
    // Produce a string from holder[key].
    var i,          // The loop counter.
        k,          // The member key.
        v,          // The member value.
        length,
        mind = gap,
        partial,
        value = holder[key];
    
    // If the value has a toJSON method, call it to obtain a replacement value.
    if (value && typeof value === 'object' &&
            typeof value.toJSON === 'function') {
        value = value.toJSON(key);
    }
    
    // If we were called with a replacer function, then call the replacer to
    // obtain a replacement value.
    if (typeof rep === 'function') {
        value = rep.call(holder, key, value);
    }
    
    // What happens next depends on the value's type.
    switch (typeof value) {
        case 'string':
            return quote(value);
        
        case 'number':
            // JSON numbers must be finite. Encode non-finite numbers as null.
            return isFinite(value) ? String(value) : 'null';
        
        case 'boolean':
        case 'null':
            // If the value is a boolean or null, convert it to a string. Note:
            // typeof null does not produce 'null'. The case is included here in
            // the remote chance that this gets fixed someday.
            return String(value);
            
        case 'object':
            if (!value) return 'null';
            gap += indent;
            partial = [];
            
            // Array.isArray
            if (Object.prototype.toString.apply(value) === '[object Array]') {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }
                
                // Join all of the elements together, separated with commas, and
                // wrap them in brackets.
                v = partial.length === 0 ? '[]' : gap ?
                    '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                    '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }
            
            // If the replacer is an array, use it to select the members to be
            // stringified.
            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }
            else {
                // Otherwise, iterate through all of the keys in the object.
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }
            
        // Join all of the member texts together, separated with commas,
        // and wrap them in braces.

        v = partial.length === 0 ? '{}' : gap ?
            '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
            '{' + partial.join(',') + '}';
        gap = mind;
        return v;
    }
}

module.exports = function (value, replacer, space) {
    var i;
    gap = '';
    indent = '';
    
    // If the space parameter is a number, make an indent string containing that
    // many spaces.
    if (typeof space === 'number') {
        for (i = 0; i < space; i += 1) {
            indent += ' ';
        }
    }
    // If the space parameter is a string, it will be used as the indent string.
    else if (typeof space === 'string') {
        indent = space;
    }

    // If there is a replacer, it must be a function or an array.
    // Otherwise, throw an error.
    rep = replacer;
    if (replacer && typeof replacer !== 'function'
    && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
        throw new Error('JSON.stringify');
    }
    
    // Make a fake root object containing our value under the key of ''.
    // Return the result of stringifying the value.
    return str('', {'': value});
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvanNvbi1ycGMtcmFuZG9tLWlkL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9qc29uLWZvcm1hdHRlci1qcy9kaXN0L2pzb24tZm9ybWF0dGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9qc29uaWZ5L2xpYi9wYXJzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvanNvbmlmeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvanNvbi1zdGFibGUtc3RyaW5naWZ5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9qc29uaWZ5L2xpYi9zdHJpbmdpZnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDOzs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsVUFBVSxJQUFJLGNBQWMsSUFBSSxjQUFjLElBQUksbUZBQW1GLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUseUJBQXlCLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDNU47QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLHFCQUFxQixrQ0FBa0M7QUFDdkQsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDQSxDQUFDO0FBQ0Q7QUFDQSxDQUFDO0FBQ0QsMEM7Ozs7Ozs7QUNqYUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLE9BQU87QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFD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OztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixXQUFXO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsVUFBVTtBQUM5QiIsImZpbGUiOiJ2ZW5kb3J+ODQ0YTFiNWQuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBJZEl0ZXJhdG9yXG5cbmZ1bmN0aW9uIElkSXRlcmF0b3Iob3B0cyl7XG4gIG9wdHMgPSBvcHRzIHx8IHt9XG4gIHZhciBtYXggPSBvcHRzLm1heCB8fCBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUlxuICB2YXIgaWRDb3VudGVyID0gdHlwZW9mIG9wdHMuc3RhcnQgIT09ICd1bmRlZmluZWQnID8gb3B0cy5zdGFydCA6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heClcblxuICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlUmFuZG9tSWQgKCkge1xuICAgIGlkQ291bnRlciA9IGlkQ291bnRlciAlIG1heFxuICAgIHJldHVybiBpZENvdW50ZXIrK1xuICB9XG5cbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZXMpIHtcbiAgICBmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4gICAgICAgIGlmIChpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkgcmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gICAgICAgIHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiAgICAgICAgICAgIGk6IG1vZHVsZUlkLFxuICAgICAgICAgICAgbDogITEsXG4gICAgICAgICAgICBleHBvcnRzOiB7fVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyksIFxuICAgICAgICBtb2R1bGUubCA9ICEwLCBtb2R1bGUuZXhwb3J0cztcbiAgICB9XG4gICAgdmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcbiAgICByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcywgX193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcywgXG4gICAgX193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sIF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuICAgICAgICBfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkgfHwgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogITEsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiAhMCxcbiAgICAgICAgICAgIGdldDogZ2V0dGVyXG4gICAgICAgIH0pO1xuICAgIH0sIF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuICAgICAgICB2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID8gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9kdWxlLmRlZmF1bHQ7XG4gICAgICAgIH0gOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBtb2R1bGU7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCBcImFcIiwgZ2V0dGVyKSwgZ2V0dGVyO1xuICAgIH0sIF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTtcbiAgICB9LCBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImRpc3RcIiwgX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2KTtcbn0oWyBmdW5jdGlvbihtb2R1bGUsIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoX193ZWJwYWNrX2V4cG9ydHNfXywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICAgICAgdmFsdWU6ICEwXG4gICAgfSk7XG4gICAgdmFyIF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9faGVscGVyc19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KSwgX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX19zdHlsZV9sZXNzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpLCBEQVRFX1NUUklOR19SRUdFWCA9IChfX3dlYnBhY2tfcmVxdWlyZV9fLm4oX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX19zdHlsZV9sZXNzX18pLCBcbiAgICAvKF5cXGR7MSw0fVtcXC58XFxcXFxcL3wtXVxcZHsxLDJ9W1xcLnxcXFxcXFwvfC1dXFxkezEsNH0pKFxccyooPzowP1sxLTldOlswLTVdfDEoPz1bMDEyXSlcXGQ6WzAtNV0pXFxkXFxzKlthcF1tKT8kLyksIFBBUlRJQUxfREFURV9SRUdFWCA9IC9cXGR7Mn06XFxkezJ9OlxcZHsyfSBHTVQtXFxkezR9LywgSlNPTl9EQVRFX1JFR0VYID0gL1xcZHs0fS1cXGR7Mn0tXFxkezJ9VFxcZHsyfTpcXGR7Mn06XFxkezJ9LlxcZHszfVovLCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IGZ1bmN0aW9uKGNiKSB7XG4gICAgICAgIHJldHVybiBjYigpLCAwO1xuICAgIH0sIF9kZWZhdWx0Q29uZmlnID0ge1xuICAgICAgICBob3ZlclByZXZpZXdFbmFibGVkOiAhMSxcbiAgICAgICAgaG92ZXJQcmV2aWV3QXJyYXlDb3VudDogMTAwLFxuICAgICAgICBob3ZlclByZXZpZXdGaWVsZENvdW50OiA1LFxuICAgICAgICBhbmltYXRlT3BlbjogITAsXG4gICAgICAgIGFuaW1hdGVDbG9zZTogITAsXG4gICAgICAgIHRoZW1lOiBudWxsLFxuICAgICAgICB1c2VUb0pTT046ICEwLFxuICAgICAgICBzb3J0UHJvcGVydGllc0J5OiBudWxsXG4gICAgfSwgSlNPTkZvcm1hdHRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBmdW5jdGlvbiBKU09ORm9ybWF0dGVyKGpzb24sIG9wZW4sIGNvbmZpZywga2V5KSB7XG4gICAgICAgICAgICB2b2lkIDAgPT09IG9wZW4gJiYgKG9wZW4gPSAxKSwgdm9pZCAwID09PSBjb25maWcgJiYgKGNvbmZpZyA9IF9kZWZhdWx0Q29uZmlnKSwgdGhpcy5qc29uID0ganNvbiwgXG4gICAgICAgICAgICB0aGlzLm9wZW4gPSBvcGVuLCB0aGlzLmNvbmZpZyA9IGNvbmZpZywgdGhpcy5rZXkgPSBrZXksIHRoaXMuX2lzT3BlbiA9IG51bGwsIHZvaWQgMCA9PT0gdGhpcy5jb25maWcuaG92ZXJQcmV2aWV3RW5hYmxlZCAmJiAodGhpcy5jb25maWcuaG92ZXJQcmV2aWV3RW5hYmxlZCA9IF9kZWZhdWx0Q29uZmlnLmhvdmVyUHJldmlld0VuYWJsZWQpLCBcbiAgICAgICAgICAgIHZvaWQgMCA9PT0gdGhpcy5jb25maWcuaG92ZXJQcmV2aWV3QXJyYXlDb3VudCAmJiAodGhpcy5jb25maWcuaG92ZXJQcmV2aWV3QXJyYXlDb3VudCA9IF9kZWZhdWx0Q29uZmlnLmhvdmVyUHJldmlld0FycmF5Q291bnQpLCBcbiAgICAgICAgICAgIHZvaWQgMCA9PT0gdGhpcy5jb25maWcuaG92ZXJQcmV2aWV3RmllbGRDb3VudCAmJiAodGhpcy5jb25maWcuaG92ZXJQcmV2aWV3RmllbGRDb3VudCA9IF9kZWZhdWx0Q29uZmlnLmhvdmVyUHJldmlld0ZpZWxkQ291bnQpLCBcbiAgICAgICAgICAgIHZvaWQgMCA9PT0gdGhpcy5jb25maWcudXNlVG9KU09OICYmICh0aGlzLmNvbmZpZy51c2VUb0pTT04gPSBfZGVmYXVsdENvbmZpZy51c2VUb0pTT04pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoSlNPTkZvcm1hdHRlci5wcm90b3R5cGUsIFwiaXNPcGVuXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGwgIT09IHRoaXMuX2lzT3BlbiA/IHRoaXMuX2lzT3BlbiA6IHRoaXMub3BlbiA+IDA7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzT3BlbiA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6ICEwLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiAhMFxuICAgICAgICB9KSwgT2JqZWN0LmRlZmluZVByb3BlcnR5KEpTT05Gb3JtYXR0ZXIucHJvdG90eXBlLCBcImlzRGF0ZVwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmpzb24gaW5zdGFuY2VvZiBEYXRlIHx8IFwic3RyaW5nXCIgPT09IHRoaXMudHlwZSAmJiAoREFURV9TVFJJTkdfUkVHRVgudGVzdCh0aGlzLmpzb24pIHx8IEpTT05fREFURV9SRUdFWC50ZXN0KHRoaXMuanNvbikgfHwgUEFSVElBTF9EQVRFX1JFR0VYLnRlc3QodGhpcy5qc29uKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogITAsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6ICEwXG4gICAgICAgIH0pLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoSlNPTkZvcm1hdHRlci5wcm90b3R5cGUsIFwiaXNVcmxcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdHJpbmdcIiA9PT0gdGhpcy50eXBlICYmIDAgPT09IHRoaXMuanNvbi5pbmRleE9mKFwiaHR0cFwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiAhMCxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogITBcbiAgICAgICAgfSksIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShKU09ORm9ybWF0dGVyLnByb3RvdHlwZSwgXCJpc0FycmF5XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodGhpcy5qc29uKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiAhMCxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogITBcbiAgICAgICAgfSksIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShKU09ORm9ybWF0dGVyLnByb3RvdHlwZSwgXCJpc09iamVjdFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmkoX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19oZWxwZXJzX18uYSkodGhpcy5qc29uKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiAhMCxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogITBcbiAgICAgICAgfSksIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShKU09ORm9ybWF0dGVyLnByb3RvdHlwZSwgXCJpc0VtcHR5T2JqZWN0XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLmtleXMubGVuZ3RoICYmICF0aGlzLmlzQXJyYXk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogITAsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6ICEwXG4gICAgICAgIH0pLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoSlNPTkZvcm1hdHRlci5wcm90b3R5cGUsIFwiaXNFbXB0eVwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzRW1wdHlPYmplY3QgfHwgdGhpcy5rZXlzICYmICF0aGlzLmtleXMubGVuZ3RoICYmIHRoaXMuaXNBcnJheTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiAhMCxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogITBcbiAgICAgICAgfSksIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShKU09ORm9ybWF0dGVyLnByb3RvdHlwZSwgXCJ1c2VUb0pTT05cIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb25maWcudXNlVG9KU09OICYmIFwic3RyaW5naWZpYWJsZVwiID09PSB0aGlzLnR5cGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogITAsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6ICEwXG4gICAgICAgIH0pLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoSlNPTkZvcm1hdHRlci5wcm90b3R5cGUsIFwiaGFzS2V5XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgMCAhPT0gdGhpcy5rZXk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogITAsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6ICEwXG4gICAgICAgIH0pLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoSlNPTkZvcm1hdHRlci5wcm90b3R5cGUsIFwiY29uc3RydWN0b3JOYW1lXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uaShfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX2hlbHBlcnNfXy5iKSh0aGlzLmpzb24pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6ICEwLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiAhMFxuICAgICAgICB9KSwgT2JqZWN0LmRlZmluZVByb3BlcnR5KEpTT05Gb3JtYXR0ZXIucHJvdG90eXBlLCBcInR5cGVcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbCA9PT0gdGhpcy5qc29uID8gXCJudWxsXCIgOiB0aGlzLmNvbmZpZy51c2VUb0pTT04gJiYgdGhpcy5qc29uICYmIHRoaXMuanNvbi50b0pTT04gPyBcInN0cmluZ2lmaWFibGVcIiA6IHR5cGVvZiB0aGlzLmpzb247XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogITAsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6ICEwXG4gICAgICAgIH0pLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoSlNPTkZvcm1hdHRlci5wcm90b3R5cGUsIFwia2V5c1wiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXModGhpcy5qc29uKS5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5IHx8ICdcIlwiJztcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhdGhpcy5pc0FycmF5ICYmIHRoaXMuY29uZmlnLnNvcnRQcm9wZXJ0aWVzQnkgPyBrZXlzLnNvcnQodGhpcy5jb25maWcuc29ydFByb3BlcnRpZXNCeSkgOiBrZXlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogITAsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6ICEwXG4gICAgICAgIH0pLCBKU09ORm9ybWF0dGVyLnByb3RvdHlwZS50b2dnbGVPcGVuID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9ICF0aGlzLmlzT3BlbiwgdGhpcy5lbGVtZW50ICYmICh0aGlzLmlzT3BlbiA/IHRoaXMuYXBwZW5kQ2hpbGRyZW4odGhpcy5jb25maWcuYW5pbWF0ZU9wZW4pIDogdGhpcy5yZW1vdmVDaGlsZHJlbih0aGlzLmNvbmZpZy5hbmltYXRlQ2xvc2UpLCBcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKF9fd2VicGFja19yZXF1aXJlX18uaShfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX2hlbHBlcnNfXy5jKShcIm9wZW5cIikpKTtcbiAgICAgICAgfSwgSlNPTkZvcm1hdHRlci5wcm90b3R5cGUub3BlbkF0RGVwdGggPSBmdW5jdGlvbihkZXB0aCkge1xuICAgICAgICAgICAgdm9pZCAwID09PSBkZXB0aCAmJiAoZGVwdGggPSAxKSwgZGVwdGggPCAwIHx8ICh0aGlzLm9wZW4gPSBkZXB0aCwgdGhpcy5pc09wZW4gPSAwICE9PSBkZXB0aCwgXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgJiYgKHRoaXMucmVtb3ZlQ2hpbGRyZW4oITEpLCAwID09PSBkZXB0aCA/IHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKF9fd2VicGFja19yZXF1aXJlX18uaShfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX2hlbHBlcnNfXy5jKShcIm9wZW5cIikpIDogKHRoaXMuYXBwZW5kQ2hpbGRyZW4odGhpcy5jb25maWcuYW5pbWF0ZU9wZW4pLCBcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKF9fd2VicGFja19yZXF1aXJlX18uaShfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX2hlbHBlcnNfXy5jKShcIm9wZW5cIikpKSkpO1xuICAgICAgICB9LCBKU09ORm9ybWF0dGVyLnByb3RvdHlwZS5nZXRJbmxpbmVwcmV2aWV3ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNBcnJheSkgcmV0dXJuIHRoaXMuanNvbi5sZW5ndGggPiB0aGlzLmNvbmZpZy5ob3ZlclByZXZpZXdBcnJheUNvdW50ID8gXCJBcnJheVtcIiArIHRoaXMuanNvbi5sZW5ndGggKyBcIl1cIiA6IFwiW1wiICsgdGhpcy5qc29uLm1hcChfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX2hlbHBlcnNfXy5kKS5qb2luKFwiLCBcIikgKyBcIl1cIjtcbiAgICAgICAgICAgIHZhciBrZXlzID0gdGhpcy5rZXlzLCBuYXJyb3dLZXlzID0ga2V5cy5zbGljZSgwLCB0aGlzLmNvbmZpZy5ob3ZlclByZXZpZXdGaWVsZENvdW50KSwga3ZzID0gbmFycm93S2V5cy5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleSArIFwiOlwiICsgX193ZWJwYWNrX3JlcXVpcmVfXy5pKF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9faGVscGVyc19fLmQpKF90aGlzLnR5cGUsIF90aGlzLmpzb25ba2V5XSk7XG4gICAgICAgICAgICB9KSwgZWxsaXBzaXMgPSBrZXlzLmxlbmd0aCA+PSB0aGlzLmNvbmZpZy5ob3ZlclByZXZpZXdGaWVsZENvdW50ID8gXCLigKZcIiA6IFwiXCI7XG4gICAgICAgICAgICByZXR1cm4gXCJ7XCIgKyBrdnMuam9pbihcIiwgXCIpICsgZWxsaXBzaXMgKyBcIn1cIjtcbiAgICAgICAgfSwgSlNPTkZvcm1hdHRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmkoX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19oZWxwZXJzX18uZSkoXCJkaXZcIiwgXCJyb3dcIik7XG4gICAgICAgICAgICB2YXIgdG9nZ2xlckxpbmsgPSB0aGlzLmlzT2JqZWN0ID8gX193ZWJwYWNrX3JlcXVpcmVfXy5pKF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9faGVscGVyc19fLmUpKFwiYVwiLCBcInRvZ2dsZXItbGlua1wiKSA6IF9fd2VicGFja19yZXF1aXJlX18uaShfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX2hlbHBlcnNfXy5lKShcInNwYW5cIik7XG4gICAgICAgICAgICBpZiAodGhpcy5pc09iamVjdCAmJiAhdGhpcy51c2VUb0pTT04gJiYgdG9nZ2xlckxpbmsuYXBwZW5kQ2hpbGQoX193ZWJwYWNrX3JlcXVpcmVfXy5pKF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9faGVscGVyc19fLmUpKFwic3BhblwiLCBcInRvZ2dsZXJcIikpLCBcbiAgICAgICAgICAgIHRoaXMuaGFzS2V5ICYmIHRvZ2dsZXJMaW5rLmFwcGVuZENoaWxkKF9fd2VicGFja19yZXF1aXJlX18uaShfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX2hlbHBlcnNfXy5lKShcInNwYW5cIiwgXCJrZXlcIiwgdGhpcy5rZXkgKyBcIjpcIikpLCBcbiAgICAgICAgICAgIHRoaXMuaXNPYmplY3QgJiYgIXRoaXMudXNlVG9KU09OKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5pKF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9faGVscGVyc19fLmUpKFwic3BhblwiLCBcInZhbHVlXCIpLCBvYmplY3RXcmFwcGVyU3BhbiA9IF9fd2VicGFja19yZXF1aXJlX18uaShfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX2hlbHBlcnNfXy5lKShcInNwYW5cIiksIGNvbnN0cnVjdG9yTmFtZSA9IF9fd2VicGFja19yZXF1aXJlX18uaShfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX2hlbHBlcnNfXy5lKShcInNwYW5cIiwgXCJjb25zdHJ1Y3Rvci1uYW1lXCIsIHRoaXMuY29uc3RydWN0b3JOYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0V3JhcHBlclNwYW4uYXBwZW5kQ2hpbGQoY29uc3RydWN0b3JOYW1lKSwgdGhpcy5pc0FycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhcnJheVdyYXBwZXJTcGFuID0gX193ZWJwYWNrX3JlcXVpcmVfXy5pKF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9faGVscGVyc19fLmUpKFwic3BhblwiKTtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXlXcmFwcGVyU3Bhbi5hcHBlbmRDaGlsZChfX3dlYnBhY2tfcmVxdWlyZV9fLmkoX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19oZWxwZXJzX18uZSkoXCJzcGFuXCIsIFwiYnJhY2tldFwiLCBcIltcIikpLCBcbiAgICAgICAgICAgICAgICAgICAgYXJyYXlXcmFwcGVyU3Bhbi5hcHBlbmRDaGlsZChfX3dlYnBhY2tfcmVxdWlyZV9fLmkoX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19oZWxwZXJzX18uZSkoXCJzcGFuXCIsIFwibnVtYmVyXCIsIHRoaXMuanNvbi5sZW5ndGgpKSwgXG4gICAgICAgICAgICAgICAgICAgIGFycmF5V3JhcHBlclNwYW4uYXBwZW5kQ2hpbGQoX193ZWJwYWNrX3JlcXVpcmVfXy5pKF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9faGVscGVyc19fLmUpKFwic3BhblwiLCBcImJyYWNrZXRcIiwgXCJdXCIpKSwgXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFdyYXBwZXJTcGFuLmFwcGVuZENoaWxkKGFycmF5V3JhcHBlclNwYW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YWx1ZS5hcHBlbmRDaGlsZChvYmplY3RXcmFwcGVyU3BhbiksIHRvZ2dsZXJMaW5rLmFwcGVuZENoaWxkKHZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5pc1VybCA/IF9fd2VicGFja19yZXF1aXJlX18uaShfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX2hlbHBlcnNfXy5lKShcImFcIikgOiBfX3dlYnBhY2tfcmVxdWlyZV9fLmkoX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19oZWxwZXJzX18uZSkoXCJzcGFuXCIpO1xuICAgICAgICAgICAgICAgIHZhbHVlLmNsYXNzTGlzdC5hZGQoX193ZWJwYWNrX3JlcXVpcmVfXy5pKF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9faGVscGVyc19fLmMpKHRoaXMudHlwZSkpLCBcbiAgICAgICAgICAgICAgICB0aGlzLmlzRGF0ZSAmJiB2YWx1ZS5jbGFzc0xpc3QuYWRkKF9fd2VicGFja19yZXF1aXJlX18uaShfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX2hlbHBlcnNfXy5jKShcImRhdGVcIikpLCBcbiAgICAgICAgICAgICAgICB0aGlzLmlzVXJsICYmICh2YWx1ZS5jbGFzc0xpc3QuYWRkKF9fd2VicGFja19yZXF1aXJlX18uaShfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX2hlbHBlcnNfXy5jKShcInVybFwiKSksIFxuICAgICAgICAgICAgICAgIHZhbHVlLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgdGhpcy5qc29uKSk7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlUHJldmlldyA9IF9fd2VicGFja19yZXF1aXJlX18uaShfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX2hlbHBlcnNfXy5mKSh0aGlzLnR5cGUsIHRoaXMuanNvbiwgdGhpcy51c2VUb0pTT04gPyB0aGlzLmpzb24udG9KU09OKCkgOiB0aGlzLmpzb24pO1xuICAgICAgICAgICAgICAgIHZhbHVlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZhbHVlUHJldmlldykpLCB0b2dnbGVyTGluay5hcHBlbmRDaGlsZCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5pc09iamVjdCAmJiB0aGlzLmNvbmZpZy5ob3ZlclByZXZpZXdFbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByZXZpZXcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmkoX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19oZWxwZXJzX18uZSkoXCJzcGFuXCIsIFwicHJldmlldy10ZXh0XCIpO1xuICAgICAgICAgICAgICAgIHByZXZpZXcuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5nZXRJbmxpbmVwcmV2aWV3KCkpKSwgdG9nZ2xlckxpbmsuYXBwZW5kQ2hpbGQocHJldmlldyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmkoX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19oZWxwZXJzX18uZSkoXCJkaXZcIiwgXCJjaGlsZHJlblwiKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzT2JqZWN0ICYmIGNoaWxkcmVuLmNsYXNzTGlzdC5hZGQoX193ZWJwYWNrX3JlcXVpcmVfXy5pKF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9faGVscGVyc19fLmMpKFwib2JqZWN0XCIpKSwgXG4gICAgICAgICAgICB0aGlzLmlzQXJyYXkgJiYgY2hpbGRyZW4uY2xhc3NMaXN0LmFkZChfX3dlYnBhY2tfcmVxdWlyZV9fLmkoX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19oZWxwZXJzX18uYykoXCJhcnJheVwiKSksIFxuICAgICAgICAgICAgdGhpcy5pc0VtcHR5ICYmIGNoaWxkcmVuLmNsYXNzTGlzdC5hZGQoX193ZWJwYWNrX3JlcXVpcmVfXy5pKF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9faGVscGVyc19fLmMpKFwiZW1wdHlcIikpLCBcbiAgICAgICAgICAgIHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLnRoZW1lICYmIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKF9fd2VicGFja19yZXF1aXJlX18uaShfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX2hlbHBlcnNfXy5jKSh0aGlzLmNvbmZpZy50aGVtZSkpLCBcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuICYmIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKF9fd2VicGFja19yZXF1aXJlX18uaShfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX2hlbHBlcnNfXy5jKShcIm9wZW5cIikpLCBcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0b2dnbGVyTGluayksIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZHJlbiksIHRoaXMuaXNPYmplY3QgJiYgdGhpcy5pc09wZW4gJiYgdGhpcy5hcHBlbmRDaGlsZHJlbigpLCBcbiAgICAgICAgICAgIHRoaXMuaXNPYmplY3QgJiYgIXRoaXMudXNlVG9KU09OICYmIHRvZ2dsZXJMaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnRvZ2dsZU9wZW4uYmluZCh0aGlzKSksIFxuICAgICAgICAgICAgdGhpcy5lbGVtZW50O1xuICAgICAgICB9LCBKU09ORm9ybWF0dGVyLnByb3RvdHlwZS5hcHBlbmRDaGlsZHJlbiA9IGZ1bmN0aW9uKGFuaW1hdGVkKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdm9pZCAwID09PSBhbmltYXRlZCAmJiAoYW5pbWF0ZWQgPSAhMSk7XG4gICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcImRpdi5cIiArIF9fd2VicGFja19yZXF1aXJlX18uaShfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX2hlbHBlcnNfXy5jKShcImNoaWxkcmVuXCIpKTtcbiAgICAgICAgICAgIGlmIChjaGlsZHJlbiAmJiAhdGhpcy5pc0VtcHR5KSBpZiAoYW5pbWF0ZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXhfMSA9IDAsIGFkZEFDaGlsZF8xID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBrZXkgPSBfdGhpcy5rZXlzW2luZGV4XzFdLCBmb3JtYXR0ZXIgPSBuZXcgSlNPTkZvcm1hdHRlcihfdGhpcy5qc29uW2tleV0sIF90aGlzLm9wZW4gLSAxLCBfdGhpcy5jb25maWcsIGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuLmFwcGVuZENoaWxkKGZvcm1hdHRlci5yZW5kZXIoKSksIChpbmRleF8xICs9IDEpIDwgX3RoaXMua2V5cy5sZW5ndGggJiYgKGluZGV4XzEgPiAxMCA/IGFkZEFDaGlsZF8xKCkgOiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYWRkQUNoaWxkXzEpKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhZGRBQ2hpbGRfMSk7XG4gICAgICAgICAgICB9IGVsc2UgdGhpcy5rZXlzLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZvcm1hdHRlciA9IG5ldyBKU09ORm9ybWF0dGVyKF90aGlzLmpzb25ba2V5XSwgX3RoaXMub3BlbiAtIDEsIF90aGlzLmNvbmZpZywga2V5KTtcbiAgICAgICAgICAgICAgICBjaGlsZHJlbi5hcHBlbmRDaGlsZChmb3JtYXR0ZXIucmVuZGVyKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIEpTT05Gb3JtYXR0ZXIucHJvdG90eXBlLnJlbW92ZUNoaWxkcmVuID0gZnVuY3Rpb24oYW5pbWF0ZWQpIHtcbiAgICAgICAgICAgIHZvaWQgMCA9PT0gYW5pbWF0ZWQgJiYgKGFuaW1hdGVkID0gITEpO1xuICAgICAgICAgICAgdmFyIGNoaWxkcmVuRWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiZGl2LlwiICsgX193ZWJwYWNrX3JlcXVpcmVfXy5pKF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9faGVscGVyc19fLmMpKFwiY2hpbGRyZW5cIikpO1xuICAgICAgICAgICAgaWYgKGFuaW1hdGVkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkcmVuUmVtb3ZlZF8xID0gMCwgcmVtb3ZlQUNoaWxkXzEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW5FbGVtZW50ICYmIGNoaWxkcmVuRWxlbWVudC5jaGlsZHJlbi5sZW5ndGggJiYgKGNoaWxkcmVuRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZHJlbkVsZW1lbnQuY2hpbGRyZW5bMF0pLCBcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW5SZW1vdmVkXzEgKz0gMSwgY2hpbGRyZW5SZW1vdmVkXzEgPiAxMCA/IHJlbW92ZUFDaGlsZF8xKCkgOiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVtb3ZlQUNoaWxkXzEpKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW1vdmVBQ2hpbGRfMSk7XG4gICAgICAgICAgICB9IGVsc2UgY2hpbGRyZW5FbGVtZW50ICYmIChjaGlsZHJlbkVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIik7XG4gICAgICAgIH0sIEpTT05Gb3JtYXR0ZXI7XG4gICAgfSgpO1xuICAgIF9fd2VicGFja19leHBvcnRzX18uZGVmYXVsdCA9IEpTT05Gb3JtYXR0ZXI7XG59LCBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiAgICBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpKCksIGV4cG9ydHMucHVzaChbIG1vZHVsZS5pLCAnLmpzb24tZm9ybWF0dGVyLXJvdyB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbn1cXG4uanNvbi1mb3JtYXR0ZXItcm93LFxcbi5qc29uLWZvcm1hdHRlci1yb3cgYSxcXG4uanNvbi1mb3JtYXR0ZXItcm93IGE6aG92ZXIge1xcbiAgY29sb3I6IGJsYWNrO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG4uanNvbi1mb3JtYXR0ZXItcm93IC5qc29uLWZvcm1hdHRlci1yb3cge1xcbiAgbWFyZ2luLWxlZnQ6IDFyZW07XFxufVxcbi5qc29uLWZvcm1hdHRlci1yb3cgLmpzb24tZm9ybWF0dGVyLWNoaWxkcmVuLmpzb24tZm9ybWF0dGVyLWVtcHR5IHtcXG4gIG9wYWNpdHk6IDAuNTtcXG4gIG1hcmdpbi1sZWZ0OiAxcmVtO1xcbn1cXG4uanNvbi1mb3JtYXR0ZXItcm93IC5qc29uLWZvcm1hdHRlci1jaGlsZHJlbi5qc29uLWZvcm1hdHRlci1lbXB0eTphZnRlciB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG4uanNvbi1mb3JtYXR0ZXItcm93IC5qc29uLWZvcm1hdHRlci1jaGlsZHJlbi5qc29uLWZvcm1hdHRlci1lbXB0eS5qc29uLWZvcm1hdHRlci1vYmplY3Q6YWZ0ZXIge1xcbiAgY29udGVudDogXCJObyBwcm9wZXJ0aWVzXCI7XFxufVxcbi5qc29uLWZvcm1hdHRlci1yb3cgLmpzb24tZm9ybWF0dGVyLWNoaWxkcmVuLmpzb24tZm9ybWF0dGVyLWVtcHR5Lmpzb24tZm9ybWF0dGVyLWFycmF5OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFwiW11cIjtcXG59XFxuLmpzb24tZm9ybWF0dGVyLXJvdyAuanNvbi1mb3JtYXR0ZXItc3RyaW5nLFxcbi5qc29uLWZvcm1hdHRlci1yb3cgLmpzb24tZm9ybWF0dGVyLXN0cmluZ2lmaWFibGUge1xcbiAgY29sb3I6IGdyZWVuO1xcbiAgd2hpdGUtc3BhY2U6IHByZTtcXG4gIHdvcmQtd3JhcDogYnJlYWstd29yZDtcXG59XFxuLmpzb24tZm9ybWF0dGVyLXJvdyAuanNvbi1mb3JtYXR0ZXItbnVtYmVyIHtcXG4gIGNvbG9yOiBibHVlO1xcbn1cXG4uanNvbi1mb3JtYXR0ZXItcm93IC5qc29uLWZvcm1hdHRlci1ib29sZWFuIHtcXG4gIGNvbG9yOiByZWQ7XFxufVxcbi5qc29uLWZvcm1hdHRlci1yb3cgLmpzb24tZm9ybWF0dGVyLW51bGwge1xcbiAgY29sb3I6ICM4NTVBMDA7XFxufVxcbi5qc29uLWZvcm1hdHRlci1yb3cgLmpzb24tZm9ybWF0dGVyLXVuZGVmaW5lZCB7XFxuICBjb2xvcjogI2NhMGI2OTtcXG59XFxuLmpzb24tZm9ybWF0dGVyLXJvdyAuanNvbi1mb3JtYXR0ZXItZnVuY3Rpb24ge1xcbiAgY29sb3I6ICNGRjIwRUQ7XFxufVxcbi5qc29uLWZvcm1hdHRlci1yb3cgLmpzb24tZm9ybWF0dGVyLWRhdGUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjA1KTtcXG59XFxuLmpzb24tZm9ybWF0dGVyLXJvdyAuanNvbi1mb3JtYXR0ZXItdXJsIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbiAgY29sb3I6IGJsdWU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5qc29uLWZvcm1hdHRlci1yb3cgLmpzb24tZm9ybWF0dGVyLWJyYWNrZXQge1xcbiAgY29sb3I6IGJsdWU7XFxufVxcbi5qc29uLWZvcm1hdHRlci1yb3cgLmpzb24tZm9ybWF0dGVyLWtleSB7XFxuICBjb2xvcjogIzAwMDA4QjtcXG4gIHBhZGRpbmctcmlnaHQ6IDAuMnJlbTtcXG59XFxuLmpzb24tZm9ybWF0dGVyLXJvdyAuanNvbi1mb3JtYXR0ZXItdG9nZ2xlci1saW5rIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLmpzb24tZm9ybWF0dGVyLXJvdyAuanNvbi1mb3JtYXR0ZXItdG9nZ2xlciB7XFxuICBsaW5lLWhlaWdodDogMS4ycmVtO1xcbiAgZm9udC1zaXplOiAwLjdyZW07XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgb3BhY2l0eTogMC42O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgcGFkZGluZy1yaWdodDogMC4ycmVtO1xcbn1cXG4uanNvbi1mb3JtYXR0ZXItcm93IC5qc29uLWZvcm1hdHRlci10b2dnbGVyOmFmdGVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxMDBtcyBlYXNlLWluO1xcbiAgY29udGVudDogXCJcXFxcMjVCQVwiO1xcbn1cXG4uanNvbi1mb3JtYXR0ZXItcm93ID4gYSA+IC5qc29uLWZvcm1hdHRlci1wcmV2aWV3LXRleHQge1xcbiAgb3BhY2l0eTogMDtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4xNXMgZWFzZS1pbjtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuLmpzb24tZm9ybWF0dGVyLXJvdzpob3ZlciA+IGEgPiAuanNvbi1mb3JtYXR0ZXItcHJldmlldy10ZXh0IHtcXG4gIG9wYWNpdHk6IDAuNjtcXG59XFxuLmpzb24tZm9ybWF0dGVyLXJvdy5qc29uLWZvcm1hdHRlci1vcGVuID4gLmpzb24tZm9ybWF0dGVyLXRvZ2dsZXItbGluayAuanNvbi1mb3JtYXR0ZXItdG9nZ2xlcjphZnRlciB7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XFxufVxcbi5qc29uLWZvcm1hdHRlci1yb3cuanNvbi1mb3JtYXR0ZXItb3BlbiA+IC5qc29uLWZvcm1hdHRlci1jaGlsZHJlbjphZnRlciB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxufVxcbi5qc29uLWZvcm1hdHRlci1yb3cuanNvbi1mb3JtYXR0ZXItb3BlbiA+IGEgPiAuanNvbi1mb3JtYXR0ZXItcHJldmlldy10ZXh0IHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcbi5qc29uLWZvcm1hdHRlci1yb3cuanNvbi1mb3JtYXR0ZXItb3Blbi5qc29uLWZvcm1hdHRlci1lbXB0eTphZnRlciB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuLmpzb24tZm9ybWF0dGVyLWRhcmsuanNvbi1mb3JtYXR0ZXItcm93IHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxufVxcbi5qc29uLWZvcm1hdHRlci1kYXJrLmpzb24tZm9ybWF0dGVyLXJvdyxcXG4uanNvbi1mb3JtYXR0ZXItZGFyay5qc29uLWZvcm1hdHRlci1yb3cgYSxcXG4uanNvbi1mb3JtYXR0ZXItZGFyay5qc29uLWZvcm1hdHRlci1yb3cgYTpob3ZlciB7XFxuICBjb2xvcjogd2hpdGU7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxufVxcbi5qc29uLWZvcm1hdHRlci1kYXJrLmpzb24tZm9ybWF0dGVyLXJvdyAuanNvbi1mb3JtYXR0ZXItcm93IHtcXG4gIG1hcmdpbi1sZWZ0OiAxcmVtO1xcbn1cXG4uanNvbi1mb3JtYXR0ZXItZGFyay5qc29uLWZvcm1hdHRlci1yb3cgLmpzb24tZm9ybWF0dGVyLWNoaWxkcmVuLmpzb24tZm9ybWF0dGVyLWVtcHR5IHtcXG4gIG9wYWNpdHk6IDAuNTtcXG4gIG1hcmdpbi1sZWZ0OiAxcmVtO1xcbn1cXG4uanNvbi1mb3JtYXR0ZXItZGFyay5qc29uLWZvcm1hdHRlci1yb3cgLmpzb24tZm9ybWF0dGVyLWNoaWxkcmVuLmpzb24tZm9ybWF0dGVyLWVtcHR5OmFmdGVyIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcbi5qc29uLWZvcm1hdHRlci1kYXJrLmpzb24tZm9ybWF0dGVyLXJvdyAuanNvbi1mb3JtYXR0ZXItY2hpbGRyZW4uanNvbi1mb3JtYXR0ZXItZW1wdHkuanNvbi1mb3JtYXR0ZXItb2JqZWN0OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFwiTm8gcHJvcGVydGllc1wiO1xcbn1cXG4uanNvbi1mb3JtYXR0ZXItZGFyay5qc29uLWZvcm1hdHRlci1yb3cgLmpzb24tZm9ybWF0dGVyLWNoaWxkcmVuLmpzb24tZm9ybWF0dGVyLWVtcHR5Lmpzb24tZm9ybWF0dGVyLWFycmF5OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFwiW11cIjtcXG59XFxuLmpzb24tZm9ybWF0dGVyLWRhcmsuanNvbi1mb3JtYXR0ZXItcm93IC5qc29uLWZvcm1hdHRlci1zdHJpbmcsXFxuLmpzb24tZm9ybWF0dGVyLWRhcmsuanNvbi1mb3JtYXR0ZXItcm93IC5qc29uLWZvcm1hdHRlci1zdHJpbmdpZmlhYmxlIHtcXG4gIGNvbG9yOiAjMzFGMDMxO1xcbiAgd2hpdGUtc3BhY2U6IHByZTtcXG4gIHdvcmQtd3JhcDogYnJlYWstd29yZDtcXG59XFxuLmpzb24tZm9ybWF0dGVyLWRhcmsuanNvbi1mb3JtYXR0ZXItcm93IC5qc29uLWZvcm1hdHRlci1udW1iZXIge1xcbiAgY29sb3I6ICM2NkMyRkY7XFxufVxcbi5qc29uLWZvcm1hdHRlci1kYXJrLmpzb24tZm9ybWF0dGVyLXJvdyAuanNvbi1mb3JtYXR0ZXItYm9vbGVhbiB7XFxuICBjb2xvcjogI0VDNDI0MjtcXG59XFxuLmpzb24tZm9ybWF0dGVyLWRhcmsuanNvbi1mb3JtYXR0ZXItcm93IC5qc29uLWZvcm1hdHRlci1udWxsIHtcXG4gIGNvbG9yOiAjRUVDOTdEO1xcbn1cXG4uanNvbi1mb3JtYXR0ZXItZGFyay5qc29uLWZvcm1hdHRlci1yb3cgLmpzb24tZm9ybWF0dGVyLXVuZGVmaW5lZCB7XFxuICBjb2xvcjogI2VmOGZiZTtcXG59XFxuLmpzb24tZm9ybWF0dGVyLWRhcmsuanNvbi1mb3JtYXR0ZXItcm93IC5qc29uLWZvcm1hdHRlci1mdW5jdGlvbiB7XFxuICBjb2xvcjogI0ZENDhDQjtcXG59XFxuLmpzb24tZm9ybWF0dGVyLWRhcmsuanNvbi1mb3JtYXR0ZXItcm93IC5qc29uLWZvcm1hdHRlci1kYXRlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSk7XFxufVxcbi5qc29uLWZvcm1hdHRlci1kYXJrLmpzb24tZm9ybWF0dGVyLXJvdyAuanNvbi1mb3JtYXR0ZXItdXJsIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbiAgY29sb3I6ICMwMjdCRkY7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5qc29uLWZvcm1hdHRlci1kYXJrLmpzb24tZm9ybWF0dGVyLXJvdyAuanNvbi1mb3JtYXR0ZXItYnJhY2tldCB7XFxuICBjb2xvcjogIzk0OTRGRjtcXG59XFxuLmpzb24tZm9ybWF0dGVyLWRhcmsuanNvbi1mb3JtYXR0ZXItcm93IC5qc29uLWZvcm1hdHRlci1rZXkge1xcbiAgY29sb3I6ICMyM0EwREI7XFxuICBwYWRkaW5nLXJpZ2h0OiAwLjJyZW07XFxufVxcbi5qc29uLWZvcm1hdHRlci1kYXJrLmpzb24tZm9ybWF0dGVyLXJvdyAuanNvbi1mb3JtYXR0ZXItdG9nZ2xlci1saW5rIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLmpzb24tZm9ybWF0dGVyLWRhcmsuanNvbi1mb3JtYXR0ZXItcm93IC5qc29uLWZvcm1hdHRlci10b2dnbGVyIHtcXG4gIGxpbmUtaGVpZ2h0OiAxLjJyZW07XFxuICBmb250LXNpemU6IDAuN3JlbTtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICBvcGFjaXR5OiAwLjY7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBwYWRkaW5nLXJpZ2h0OiAwLjJyZW07XFxufVxcbi5qc29uLWZvcm1hdHRlci1kYXJrLmpzb24tZm9ybWF0dGVyLXJvdyAuanNvbi1mb3JtYXR0ZXItdG9nZ2xlcjphZnRlciB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMTAwbXMgZWFzZS1pbjtcXG4gIGNvbnRlbnQ6IFwiXFxcXDI1QkFcIjtcXG59XFxuLmpzb24tZm9ybWF0dGVyLWRhcmsuanNvbi1mb3JtYXR0ZXItcm93ID4gYSA+IC5qc29uLWZvcm1hdHRlci1wcmV2aWV3LXRleHQge1xcbiAgb3BhY2l0eTogMDtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4xNXMgZWFzZS1pbjtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuLmpzb24tZm9ybWF0dGVyLWRhcmsuanNvbi1mb3JtYXR0ZXItcm93OmhvdmVyID4gYSA+IC5qc29uLWZvcm1hdHRlci1wcmV2aWV3LXRleHQge1xcbiAgb3BhY2l0eTogMC42O1xcbn1cXG4uanNvbi1mb3JtYXR0ZXItZGFyay5qc29uLWZvcm1hdHRlci1yb3cuanNvbi1mb3JtYXR0ZXItb3BlbiA+IC5qc29uLWZvcm1hdHRlci10b2dnbGVyLWxpbmsgLmpzb24tZm9ybWF0dGVyLXRvZ2dsZXI6YWZ0ZXIge1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xcbn1cXG4uanNvbi1mb3JtYXR0ZXItZGFyay5qc29uLWZvcm1hdHRlci1yb3cuanNvbi1mb3JtYXR0ZXItb3BlbiA+IC5qc29uLWZvcm1hdHRlci1jaGlsZHJlbjphZnRlciB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxufVxcbi5qc29uLWZvcm1hdHRlci1kYXJrLmpzb24tZm9ybWF0dGVyLXJvdy5qc29uLWZvcm1hdHRlci1vcGVuID4gYSA+IC5qc29uLWZvcm1hdHRlci1wcmV2aWV3LXRleHQge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuLmpzb24tZm9ybWF0dGVyLWRhcmsuanNvbi1mb3JtYXR0ZXItcm93Lmpzb24tZm9ybWF0dGVyLW9wZW4uanNvbi1mb3JtYXR0ZXItZW1wdHk6YWZ0ZXIge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcbicsIFwiXCIgXSk7XG59LCBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbGlzdCA9IFtdO1xuICAgICAgICByZXR1cm4gbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZm9yICh2YXIgcmVzdWx0ID0gW10sIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gdGhpc1tpXTtcbiAgICAgICAgICAgICAgICBpdGVtWzJdID8gcmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpIDogcmVzdWx0LnB1c2goaXRlbVsxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XG4gICAgICAgIH0sIGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcbiAgICAgICAgICAgIFwic3RyaW5nXCIgPT0gdHlwZW9mIG1vZHVsZXMgJiYgKG1vZHVsZXMgPSBbIFsgbnVsbCwgbW9kdWxlcywgXCJcIiBdIF0pO1xuICAgICAgICAgICAgZm9yICh2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9LCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSB0aGlzW2ldWzBdO1xuICAgICAgICAgICAgICAgIFwibnVtYmVyXCIgPT0gdHlwZW9mIGlkICYmIChhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9ICEwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuICAgICAgICAgICAgICAgIFwibnVtYmVyXCIgPT0gdHlwZW9mIGl0ZW1bMF0gJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSB8fCAobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSA/IGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5IDogbWVkaWFRdWVyeSAmJiAoaXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiKSwgXG4gICAgICAgICAgICAgICAgbGlzdC5wdXNoKGl0ZW0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgbGlzdDtcbiAgICB9O1xufSwgZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG4gICAgZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXSwgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcbiAgICAgICAgICAgIGlmIChkb21TdHlsZSkge1xuICAgICAgICAgICAgICAgIGRvbVN0eWxlLnJlZnMrKztcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcbiAgICAgICAgICAgICAgICBmb3IgKDtqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHBhcnRzID0gW10sIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykgcGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG4gICAgICAgICAgICAgICAgc3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpdGVtLmlkLFxuICAgICAgICAgICAgICAgICAgICByZWZzOiAxLFxuICAgICAgICAgICAgICAgICAgICBwYXJ0czogcGFydHNcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XG4gICAgICAgIGZvciAodmFyIHN0eWxlcyA9IFtdLCBuZXdTdHlsZXMgPSB7fSwgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV0sIGlkID0gaXRlbVswXSwgY3NzID0gaXRlbVsxXSwgbWVkaWEgPSBpdGVtWzJdLCBzb3VyY2VNYXAgPSBpdGVtWzNdLCBwYXJ0ID0ge1xuICAgICAgICAgICAgICAgIGNzczogY3NzLFxuICAgICAgICAgICAgICAgIG1lZGlhOiBtZWRpYSxcbiAgICAgICAgICAgICAgICBzb3VyY2VNYXA6IHNvdXJjZU1hcFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG5ld1N0eWxlc1tpZF0gPyBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCkgOiBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge1xuICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICBwYXJ0czogWyBwYXJ0IF1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHlsZXM7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBnZXRIZWFkRWxlbWVudCgpLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wW3N0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAoXCJ0b3BcIiA9PT0gb3B0aW9ucy5pbnNlcnRBdCkgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPyBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyA/IGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIDogaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpIDogaGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBoZWFkLmZpcnN0Q2hpbGQpLCBcbiAgICAgICAgc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AucHVzaChzdHlsZUVsZW1lbnQpOyBlbHNlIHtcbiAgICAgICAgICAgIGlmIChcImJvdHRvbVwiICE9PSBvcHRpb25zLmluc2VydEF0KSB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0Jy4gTXVzdCBiZSAndG9wJyBvciAnYm90dG9tJy5cIik7XG4gICAgICAgICAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAgICAgICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xuICAgICAgICB2YXIgaWR4ID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZUVsZW1lbnQpO1xuICAgICAgICBpZHggPj0gMCAmJiBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgICAgICAgcmV0dXJuIHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiLCBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KSwgXG4gICAgICAgIHN0eWxlRWxlbWVudDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucykge1xuICAgICAgICB2YXIgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcbiAgICAgICAgcmV0dXJuIGxpbmtFbGVtZW50LnJlbCA9IFwic3R5bGVzaGVldFwiLCBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGlua0VsZW1lbnQpLCBcbiAgICAgICAgbGlua0VsZW1lbnQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICAgICAgICB2YXIgc3R5bGVFbGVtZW50LCB1cGRhdGUsIHJlbW92ZTtcbiAgICAgICAgaWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG4gICAgICAgICAgICB2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcbiAgICAgICAgICAgIHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpLCBcbiAgICAgICAgICAgIHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsICExKSwgcmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgITApO1xuICAgICAgICB9IGVsc2Ugb2JqLnNvdXJjZU1hcCAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFVSTCAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgQmxvYiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGJ0b2EgPyAoc3R5bGVFbGVtZW50ID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyksIFxuICAgICAgICB1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KSwgcmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSwgc3R5bGVFbGVtZW50LmhyZWYgJiYgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZUVsZW1lbnQuaHJlZik7XG4gICAgICAgIH0pIDogKHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSwgdXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCksIFxuICAgICAgICByZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHVwZGF0ZShvYmopLCBmdW5jdGlvbihuZXdPYmopIHtcbiAgICAgICAgICAgIGlmIChuZXdPYmopIHtcbiAgICAgICAgICAgICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgICAgICAgICB9IGVsc2UgcmVtb3ZlKCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcbiAgICAgICAgdmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuICAgICAgICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTsgZWxzZSB7XG4gICAgICAgICAgICB2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyksIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2RlcztcbiAgICAgICAgICAgIGNoaWxkTm9kZXNbaW5kZXhdICYmIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSksIGNoaWxkTm9kZXMubGVuZ3RoID8gc3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSkgOiBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaikge1xuICAgICAgICB2YXIgY3NzID0gb2JqLmNzcywgbWVkaWEgPSBvYmoubWVkaWE7XG4gICAgICAgIGlmIChtZWRpYSAmJiBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpLCBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzczsgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKDtzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZDsgKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxpbmsobGlua0VsZW1lbnQsIG9iaikge1xuICAgICAgICB2YXIgY3NzID0gb2JqLmNzcywgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgICAgICAgc291cmNlTWFwICYmIChjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCIpO1xuICAgICAgICB2YXIgYmxvYiA9IG5ldyBCbG9iKFsgY3NzIF0sIHtcbiAgICAgICAgICAgIHR5cGU6IFwidGV4dC9jc3NcIlxuICAgICAgICB9KSwgb2xkU3JjID0gbGlua0VsZW1lbnQuaHJlZjtcbiAgICAgICAgbGlua0VsZW1lbnQuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYiksIG9sZFNyYyAmJiBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG4gICAgfVxuICAgIHZhciBzdHlsZXNJbkRvbSA9IHt9LCBtZW1vaXplID0gZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgdmFyIG1lbW87XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB2b2lkIDAgPT09IG1lbW8gJiYgKG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpKSwgbWVtbztcbiAgICAgICAgfTtcbiAgICB9LCBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIC9tc2llIFs2LTldXFxiLy50ZXN0KHNlbGYubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcbiAgICB9KSwgZ2V0SGVhZEVsZW1lbnQgPSBtZW1vaXplKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gICAgfSksIHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsLCBzaW5nbGV0b25Db3VudGVyID0gMCwgc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AgPSBbXTtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mIERFQlVHICYmIERFQlVHICYmIFwib2JqZWN0XCIgIT0gdHlwZW9mIGRvY3VtZW50KSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9LCB2b2lkIDAgPT09IG9wdGlvbnMuc2luZ2xldG9uICYmIChvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKSksIFxuICAgICAgICB2b2lkIDAgPT09IG9wdGlvbnMuaW5zZXJ0QXQgJiYgKG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiKTtcbiAgICAgICAgdmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0KTtcbiAgICAgICAgcmV0dXJuIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyksIGZ1bmN0aW9uKG5ld0xpc3QpIHtcbiAgICAgICAgICAgIGZvciAodmFyIG1heVJlbW92ZSA9IFtdLCBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gc3R5bGVzW2ldLCBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuICAgICAgICAgICAgICAgIGRvbVN0eWxlLnJlZnMtLSwgbWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5ld0xpc3QpIHtcbiAgICAgICAgICAgICAgICBhZGRTdHlsZXNUb0RvbShsaXN0VG9TdHlsZXMobmV3TGlzdCksIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG4gICAgICAgICAgICAgICAgaWYgKDAgPT09IGRvbVN0eWxlLnJlZnMpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgcmVwbGFjZVRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRleHRTdG9yZSA9IFtdO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oaW5kZXgsIHJlcGxhY2VtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50LCB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIH07XG4gICAgfSgpO1xufSwgZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gICAgdmFyIGNvbnRlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuICAgIFwic3RyaW5nXCIgPT0gdHlwZW9mIGNvbnRlbnQgJiYgKGNvbnRlbnQgPSBbIFsgbW9kdWxlLmksIGNvbnRlbnQsIFwiXCIgXSBdKTtcbiAgICBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpKGNvbnRlbnQsIHt9KTtcbiAgICBjb250ZW50LmxvY2FscyAmJiAobW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscyk7XG59LCBmdW5jdGlvbihtb2R1bGUsIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBmdW5jdGlvbiBlc2NhcGVTdHJpbmcoc3RyKSB7XG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgnXCInLCAnXCInKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gICAgICAgIHJldHVybiAhIXZhbHVlICYmIFwib2JqZWN0XCIgPT0gdHlwZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0T2JqZWN0TmFtZShvYmplY3QpIHtcbiAgICAgICAgaWYgKHZvaWQgMCA9PT0gb2JqZWN0KSByZXR1cm4gXCJcIjtcbiAgICAgICAgaWYgKG51bGwgPT09IG9iamVjdCkgcmV0dXJuIFwiT2JqZWN0XCI7XG4gICAgICAgIGlmIChcIm9iamVjdFwiID09IHR5cGVvZiBvYmplY3QgJiYgIW9iamVjdC5jb25zdHJ1Y3RvcikgcmV0dXJuIFwiT2JqZWN0XCI7XG4gICAgICAgIHZhciBmdW5jTmFtZVJlZ2V4ID0gL2Z1bmN0aW9uIChbXihdKikvLCByZXN1bHRzID0gZnVuY05hbWVSZWdleC5leGVjKG9iamVjdC5jb25zdHJ1Y3Rvci50b1N0cmluZygpKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHMgJiYgcmVzdWx0cy5sZW5ndGggPiAxID8gcmVzdWx0c1sxXSA6IFwiXCI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFZhbHVlUHJldmlldyh0eXBlLCBvYmplY3QsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBcIm51bGxcIiA9PT0gdHlwZSB8fCBcInVuZGVmaW5lZFwiID09PSB0eXBlID8gdHlwZSA6IChcInN0cmluZ1wiICE9PSB0eXBlICYmIFwic3RyaW5naWZpYWJsZVwiICE9PSB0eXBlIHx8ICh2YWx1ZSA9ICdcIicgKyBlc2NhcGVTdHJpbmcodmFsdWUpICsgJ1wiJyksIFxuICAgICAgICBcImZ1bmN0aW9uXCIgPT09IHR5cGUgPyBvYmplY3QudG9TdHJpbmcoKS5yZXBsYWNlKC9bXFxyXFxuXS9nLCBcIlwiKS5yZXBsYWNlKC9cXHsuKlxcfS8sIFwiXCIpICsgXCJ74oCmfVwiIDogdmFsdWUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRQcmV2aWV3KHR5cGUsIG9iamVjdCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBcIlwiO1xuICAgICAgICByZXR1cm4gaXNPYmplY3Qob2JqZWN0KSA/ICh2YWx1ZSA9IGdldE9iamVjdE5hbWUob2JqZWN0KSwgQXJyYXkuaXNBcnJheShvYmplY3QpICYmICh2YWx1ZSArPSBcIltcIiArIG9iamVjdC5sZW5ndGggKyBcIl1cIikpIDogdmFsdWUgPSBnZXRWYWx1ZVByZXZpZXcodHlwZSwgb2JqZWN0LCBvYmplY3QpLCBcbiAgICAgICAgdmFsdWU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNzc0NsYXNzKGNsYXNzTmFtZSkge1xuICAgICAgICByZXR1cm4gXCJqc29uLWZvcm1hdHRlci1cIiArIGNsYXNzTmFtZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0eXBlLCBjbGFzc05hbWUsIGNvbnRlbnQpIHtcbiAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZSAmJiBlbC5jbGFzc0xpc3QuYWRkKGNzc0NsYXNzKGNsYXNzTmFtZSkpLCB2b2lkIDAgIT09IGNvbnRlbnQgJiYgKGNvbnRlbnQgaW5zdGFuY2VvZiBOb2RlID8gZWwuYXBwZW5kQ2hpbGQoY29udGVudCkgOiBlbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShTdHJpbmcoY29udGVudCkpKSksIFxuICAgICAgICBlbDtcbiAgICB9XG4gICAgX193ZWJwYWNrX2V4cG9ydHNfXy5hID0gaXNPYmplY3QsIF9fd2VicGFja19leHBvcnRzX18uYiA9IGdldE9iamVjdE5hbWUsIF9fd2VicGFja19leHBvcnRzX18uZiA9IGdldFZhbHVlUHJldmlldywgXG4gICAgX193ZWJwYWNrX2V4cG9ydHNfXy5kID0gZ2V0UHJldmlldywgX193ZWJwYWNrX2V4cG9ydHNfXy5jID0gY3NzQ2xhc3MsIF9fd2VicGFja19leHBvcnRzX18uZSA9IGNyZWF0ZUVsZW1lbnQ7XG59LCBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG59IF0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9anNvbi1mb3JtYXR0ZXIuanMubWFwIiwidmFyIGF0LCAvLyBUaGUgaW5kZXggb2YgdGhlIGN1cnJlbnQgY2hhcmFjdGVyXG4gICAgY2gsIC8vIFRoZSBjdXJyZW50IGNoYXJhY3RlclxuICAgIGVzY2FwZWUgPSB7XG4gICAgICAgICdcIic6ICAnXCInLFxuICAgICAgICAnXFxcXCc6ICdcXFxcJyxcbiAgICAgICAgJy8nOiAgJy8nLFxuICAgICAgICBiOiAgICAnXFxiJyxcbiAgICAgICAgZjogICAgJ1xcZicsXG4gICAgICAgIG46ICAgICdcXG4nLFxuICAgICAgICByOiAgICAnXFxyJyxcbiAgICAgICAgdDogICAgJ1xcdCdcbiAgICB9LFxuICAgIHRleHQsXG5cbiAgICBlcnJvciA9IGZ1bmN0aW9uIChtKSB7XG4gICAgICAgIC8vIENhbGwgZXJyb3Igd2hlbiBzb21ldGhpbmcgaXMgd3JvbmcuXG4gICAgICAgIHRocm93IHtcbiAgICAgICAgICAgIG5hbWU6ICAgICdTeW50YXhFcnJvcicsXG4gICAgICAgICAgICBtZXNzYWdlOiBtLFxuICAgICAgICAgICAgYXQ6ICAgICAgYXQsXG4gICAgICAgICAgICB0ZXh0OiAgICB0ZXh0XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBcbiAgICBuZXh0ID0gZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgLy8gSWYgYSBjIHBhcmFtZXRlciBpcyBwcm92aWRlZCwgdmVyaWZ5IHRoYXQgaXQgbWF0Y2hlcyB0aGUgY3VycmVudCBjaGFyYWN0ZXIuXG4gICAgICAgIGlmIChjICYmIGMgIT09IGNoKSB7XG4gICAgICAgICAgICBlcnJvcihcIkV4cGVjdGVkICdcIiArIGMgKyBcIicgaW5zdGVhZCBvZiAnXCIgKyBjaCArIFwiJ1wiKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gR2V0IHRoZSBuZXh0IGNoYXJhY3Rlci4gV2hlbiB0aGVyZSBhcmUgbm8gbW9yZSBjaGFyYWN0ZXJzLFxuICAgICAgICAvLyByZXR1cm4gdGhlIGVtcHR5IHN0cmluZy5cbiAgICAgICAgXG4gICAgICAgIGNoID0gdGV4dC5jaGFyQXQoYXQpO1xuICAgICAgICBhdCArPSAxO1xuICAgICAgICByZXR1cm4gY2g7XG4gICAgfSxcbiAgICBcbiAgICBudW1iZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIFBhcnNlIGEgbnVtYmVyIHZhbHVlLlxuICAgICAgICB2YXIgbnVtYmVyLFxuICAgICAgICAgICAgc3RyaW5nID0gJyc7XG4gICAgICAgIFxuICAgICAgICBpZiAoY2ggPT09ICctJykge1xuICAgICAgICAgICAgc3RyaW5nID0gJy0nO1xuICAgICAgICAgICAgbmV4dCgnLScpO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChjaCA+PSAnMCcgJiYgY2ggPD0gJzknKSB7XG4gICAgICAgICAgICBzdHJpbmcgKz0gY2g7XG4gICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoID09PSAnLicpIHtcbiAgICAgICAgICAgIHN0cmluZyArPSAnLic7XG4gICAgICAgICAgICB3aGlsZSAobmV4dCgpICYmIGNoID49ICcwJyAmJiBjaCA8PSAnOScpIHtcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gY2g7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoID09PSAnZScgfHwgY2ggPT09ICdFJykge1xuICAgICAgICAgICAgc3RyaW5nICs9IGNoO1xuICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgaWYgKGNoID09PSAnLScgfHwgY2ggPT09ICcrJykge1xuICAgICAgICAgICAgICAgIHN0cmluZyArPSBjaDtcbiAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoY2ggPj0gJzAnICYmIGNoIDw9ICc5Jykge1xuICAgICAgICAgICAgICAgIHN0cmluZyArPSBjaDtcbiAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbnVtYmVyID0gK3N0cmluZztcbiAgICAgICAgaWYgKCFpc0Zpbml0ZShudW1iZXIpKSB7XG4gICAgICAgICAgICBlcnJvcihcIkJhZCBudW1iZXJcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVtYmVyO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICBzdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIFBhcnNlIGEgc3RyaW5nIHZhbHVlLlxuICAgICAgICB2YXIgaGV4LFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIHN0cmluZyA9ICcnLFxuICAgICAgICAgICAgdWZmZmY7XG4gICAgICAgIFxuICAgICAgICAvLyBXaGVuIHBhcnNpbmcgZm9yIHN0cmluZyB2YWx1ZXMsIHdlIG11c3QgbG9vayBmb3IgXCIgYW5kIFxcIGNoYXJhY3RlcnMuXG4gICAgICAgIGlmIChjaCA9PT0gJ1wiJykge1xuICAgICAgICAgICAgd2hpbGUgKG5leHQoKSkge1xuICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ1wiJykge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaCA9PT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoID09PSAndScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVmZmZmID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCA0OyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZXggPSBwYXJzZUludChuZXh0KCksIDE2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzRmluaXRlKGhleCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVmZmZmID0gdWZmZmYgKiAxNiArIGhleDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHVmZmZmKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZXNjYXBlZVtjaF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgKz0gZXNjYXBlZVtjaF07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyArPSBjaDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZXJyb3IoXCJCYWQgc3RyaW5nXCIpO1xuICAgIH0sXG5cbiAgICB3aGl0ZSA9IGZ1bmN0aW9uICgpIHtcblxuLy8gU2tpcCB3aGl0ZXNwYWNlLlxuXG4gICAgICAgIHdoaWxlIChjaCAmJiBjaCA8PSAnICcpIHtcbiAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB3b3JkID0gZnVuY3Rpb24gKCkge1xuXG4vLyB0cnVlLCBmYWxzZSwgb3IgbnVsbC5cblxuICAgICAgICBzd2l0Y2ggKGNoKSB7XG4gICAgICAgIGNhc2UgJ3QnOlxuICAgICAgICAgICAgbmV4dCgndCcpO1xuICAgICAgICAgICAgbmV4dCgncicpO1xuICAgICAgICAgICAgbmV4dCgndScpO1xuICAgICAgICAgICAgbmV4dCgnZScpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIGNhc2UgJ2YnOlxuICAgICAgICAgICAgbmV4dCgnZicpO1xuICAgICAgICAgICAgbmV4dCgnYScpO1xuICAgICAgICAgICAgbmV4dCgnbCcpO1xuICAgICAgICAgICAgbmV4dCgncycpO1xuICAgICAgICAgICAgbmV4dCgnZScpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjYXNlICduJzpcbiAgICAgICAgICAgIG5leHQoJ24nKTtcbiAgICAgICAgICAgIG5leHQoJ3UnKTtcbiAgICAgICAgICAgIG5leHQoJ2wnKTtcbiAgICAgICAgICAgIG5leHQoJ2wnKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVycm9yKFwiVW5leHBlY3RlZCAnXCIgKyBjaCArIFwiJ1wiKTtcbiAgICB9LFxuXG4gICAgdmFsdWUsICAvLyBQbGFjZSBob2xkZXIgZm9yIHRoZSB2YWx1ZSBmdW5jdGlvbi5cblxuICAgIGFycmF5ID0gZnVuY3Rpb24gKCkge1xuXG4vLyBQYXJzZSBhbiBhcnJheSB2YWx1ZS5cblxuICAgICAgICB2YXIgYXJyYXkgPSBbXTtcblxuICAgICAgICBpZiAoY2ggPT09ICdbJykge1xuICAgICAgICAgICAgbmV4dCgnWycpO1xuICAgICAgICAgICAgd2hpdGUoKTtcbiAgICAgICAgICAgIGlmIChjaCA9PT0gJ10nKSB7XG4gICAgICAgICAgICAgICAgbmV4dCgnXScpO1xuICAgICAgICAgICAgICAgIHJldHVybiBhcnJheTsgICAvLyBlbXB0eSBhcnJheVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKGNoKSB7XG4gICAgICAgICAgICAgICAgYXJyYXkucHVzaCh2YWx1ZSgpKTtcbiAgICAgICAgICAgICAgICB3aGl0ZSgpO1xuICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ10nKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoJ10nKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXh0KCcsJyk7XG4gICAgICAgICAgICAgICAgd2hpdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlcnJvcihcIkJhZCBhcnJheVwiKTtcbiAgICB9LFxuXG4gICAgb2JqZWN0ID0gZnVuY3Rpb24gKCkge1xuXG4vLyBQYXJzZSBhbiBvYmplY3QgdmFsdWUuXG5cbiAgICAgICAgdmFyIGtleSxcbiAgICAgICAgICAgIG9iamVjdCA9IHt9O1xuXG4gICAgICAgIGlmIChjaCA9PT0gJ3snKSB7XG4gICAgICAgICAgICBuZXh0KCd7Jyk7XG4gICAgICAgICAgICB3aGl0ZSgpO1xuICAgICAgICAgICAgaWYgKGNoID09PSAnfScpIHtcbiAgICAgICAgICAgICAgICBuZXh0KCd9Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdDsgICAvLyBlbXB0eSBvYmplY3RcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChjaCkge1xuICAgICAgICAgICAgICAgIGtleSA9IHN0cmluZygpO1xuICAgICAgICAgICAgICAgIHdoaXRlKCk7XG4gICAgICAgICAgICAgICAgbmV4dCgnOicpO1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IoJ0R1cGxpY2F0ZSBrZXkgXCInICsga2V5ICsgJ1wiJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9iamVjdFtrZXldID0gdmFsdWUoKTtcbiAgICAgICAgICAgICAgICB3aGl0ZSgpO1xuICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gJ30nKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoJ30nKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV4dCgnLCcpO1xuICAgICAgICAgICAgICAgIHdoaXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZXJyb3IoXCJCYWQgb2JqZWN0XCIpO1xuICAgIH07XG5cbnZhbHVlID0gZnVuY3Rpb24gKCkge1xuXG4vLyBQYXJzZSBhIEpTT04gdmFsdWUuIEl0IGNvdWxkIGJlIGFuIG9iamVjdCwgYW4gYXJyYXksIGEgc3RyaW5nLCBhIG51bWJlcixcbi8vIG9yIGEgd29yZC5cblxuICAgIHdoaXRlKCk7XG4gICAgc3dpdGNoIChjaCkge1xuICAgIGNhc2UgJ3snOlxuICAgICAgICByZXR1cm4gb2JqZWN0KCk7XG4gICAgY2FzZSAnWyc6XG4gICAgICAgIHJldHVybiBhcnJheSgpO1xuICAgIGNhc2UgJ1wiJzpcbiAgICAgICAgcmV0dXJuIHN0cmluZygpO1xuICAgIGNhc2UgJy0nOlxuICAgICAgICByZXR1cm4gbnVtYmVyKCk7XG4gICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGNoID49ICcwJyAmJiBjaCA8PSAnOScgPyBudW1iZXIoKSA6IHdvcmQoKTtcbiAgICB9XG59O1xuXG4vLyBSZXR1cm4gdGhlIGpzb25fcGFyc2UgZnVuY3Rpb24uIEl0IHdpbGwgaGF2ZSBhY2Nlc3MgdG8gYWxsIG9mIHRoZSBhYm92ZVxuLy8gZnVuY3Rpb25zIGFuZCB2YXJpYWJsZXMuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNvdXJjZSwgcmV2aXZlcikge1xuICAgIHZhciByZXN1bHQ7XG4gICAgXG4gICAgdGV4dCA9IHNvdXJjZTtcbiAgICBhdCA9IDA7XG4gICAgY2ggPSAnICc7XG4gICAgcmVzdWx0ID0gdmFsdWUoKTtcbiAgICB3aGl0ZSgpO1xuICAgIGlmIChjaCkge1xuICAgICAgICBlcnJvcihcIlN5bnRheCBlcnJvclwiKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSBpcyBhIHJldml2ZXIgZnVuY3Rpb24sIHdlIHJlY3Vyc2l2ZWx5IHdhbGsgdGhlIG5ldyBzdHJ1Y3R1cmUsXG4gICAgLy8gcGFzc2luZyBlYWNoIG5hbWUvdmFsdWUgcGFpciB0byB0aGUgcmV2aXZlciBmdW5jdGlvbiBmb3IgcG9zc2libGVcbiAgICAvLyB0cmFuc2Zvcm1hdGlvbiwgc3RhcnRpbmcgd2l0aCBhIHRlbXBvcmFyeSByb290IG9iamVjdCB0aGF0IGhvbGRzIHRoZSByZXN1bHRcbiAgICAvLyBpbiBhbiBlbXB0eSBrZXkuIElmIHRoZXJlIGlzIG5vdCBhIHJldml2ZXIgZnVuY3Rpb24sIHdlIHNpbXBseSByZXR1cm4gdGhlXG4gICAgLy8gcmVzdWx0LlxuXG4gICAgcmV0dXJuIHR5cGVvZiByZXZpdmVyID09PSAnZnVuY3Rpb24nID8gKGZ1bmN0aW9uIHdhbGsoaG9sZGVyLCBrZXkpIHtcbiAgICAgICAgdmFyIGssIHYsIHZhbHVlID0gaG9sZGVyW2tleV07XG4gICAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBmb3IgKGsgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrKSkge1xuICAgICAgICAgICAgICAgICAgICB2ID0gd2Fsayh2YWx1ZSwgayk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlW2tdID0gdjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB2YWx1ZVtrXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV2aXZlci5jYWxsKGhvbGRlciwga2V5LCB2YWx1ZSk7XG4gICAgfSh7Jyc6IHJlc3VsdH0sICcnKSkgOiByZXN1bHQ7XG59O1xuIiwiZXhwb3J0cy5wYXJzZSA9IHJlcXVpcmUoJy4vbGliL3BhcnNlJyk7XG5leHBvcnRzLnN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vbGliL3N0cmluZ2lmeScpO1xuIiwidmFyIGpzb24gPSB0eXBlb2YgSlNPTiAhPT0gJ3VuZGVmaW5lZCcgPyBKU09OIDogcmVxdWlyZSgnanNvbmlmeScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmosIG9wdHMpIHtcbiAgICBpZiAoIW9wdHMpIG9wdHMgPSB7fTtcbiAgICBpZiAodHlwZW9mIG9wdHMgPT09ICdmdW5jdGlvbicpIG9wdHMgPSB7IGNtcDogb3B0cyB9O1xuICAgIHZhciBzcGFjZSA9IG9wdHMuc3BhY2UgfHwgJyc7XG4gICAgaWYgKHR5cGVvZiBzcGFjZSA9PT0gJ251bWJlcicpIHNwYWNlID0gQXJyYXkoc3BhY2UrMSkuam9pbignICcpO1xuICAgIHZhciBjeWNsZXMgPSAodHlwZW9mIG9wdHMuY3ljbGVzID09PSAnYm9vbGVhbicpID8gb3B0cy5jeWNsZXMgOiBmYWxzZTtcbiAgICB2YXIgcmVwbGFjZXIgPSBvcHRzLnJlcGxhY2VyIHx8IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gICAgdmFyIGNtcCA9IG9wdHMuY21wICYmIChmdW5jdGlvbiAoZikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICAgIHZhciBhb2JqID0geyBrZXk6IGEsIHZhbHVlOiBub2RlW2FdIH07XG4gICAgICAgICAgICAgICAgdmFyIGJvYmogPSB7IGtleTogYiwgdmFsdWU6IG5vZGVbYl0gfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZihhb2JqLCBib2JqKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfSkob3B0cy5jbXApO1xuXG4gICAgdmFyIHNlZW4gPSBbXTtcbiAgICByZXR1cm4gKGZ1bmN0aW9uIHN0cmluZ2lmeSAocGFyZW50LCBrZXksIG5vZGUsIGxldmVsKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSBzcGFjZSA/ICgnXFxuJyArIG5ldyBBcnJheShsZXZlbCArIDEpLmpvaW4oc3BhY2UpKSA6ICcnO1xuICAgICAgICB2YXIgY29sb25TZXBhcmF0b3IgPSBzcGFjZSA/ICc6ICcgOiAnOic7XG5cbiAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS50b0pTT04gJiYgdHlwZW9mIG5vZGUudG9KU09OID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBub2RlID0gbm9kZS50b0pTT04oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vZGUgPSByZXBsYWNlci5jYWxsKHBhcmVudCwga2V5LCBub2RlKTtcblxuICAgICAgICBpZiAobm9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBub2RlICE9PSAnb2JqZWN0JyB8fCBub2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4ganNvbi5zdHJpbmdpZnkobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXJyYXkobm9kZSkpIHtcbiAgICAgICAgICAgIHZhciBvdXQgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gc3RyaW5naWZ5KG5vZGUsIGksIG5vZGVbaV0sIGxldmVsKzEpIHx8IGpzb24uc3RyaW5naWZ5KG51bGwpO1xuICAgICAgICAgICAgICAgIG91dC5wdXNoKGluZGVudCArIHNwYWNlICsgaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJ1snICsgb3V0LmpvaW4oJywnKSArIGluZGVudCArICddJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChzZWVuLmluZGV4T2Yobm9kZSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN5Y2xlcykgcmV0dXJuIGpzb24uc3RyaW5naWZ5KCdfX2N5Y2xlX18nKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDb252ZXJ0aW5nIGNpcmN1bGFyIHN0cnVjdHVyZSB0byBKU09OJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHNlZW4ucHVzaChub2RlKTtcblxuICAgICAgICAgICAgdmFyIGtleXMgPSBvYmplY3RLZXlzKG5vZGUpLnNvcnQoY21wICYmIGNtcChub2RlKSk7XG4gICAgICAgICAgICB2YXIgb3V0ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBzdHJpbmdpZnkobm9kZSwga2V5LCBub2RlW2tleV0sIGxldmVsKzEpO1xuXG4gICAgICAgICAgICAgICAgaWYoIXZhbHVlKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIHZhciBrZXlWYWx1ZSA9IGpzb24uc3RyaW5naWZ5KGtleSlcbiAgICAgICAgICAgICAgICAgICAgKyBjb2xvblNlcGFyYXRvclxuICAgICAgICAgICAgICAgICAgICArIHZhbHVlO1xuICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICBvdXQucHVzaChpbmRlbnQgKyBzcGFjZSArIGtleVZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlZW4uc3BsaWNlKHNlZW4uaW5kZXhPZihub2RlKSwgMSk7XG4gICAgICAgICAgICByZXR1cm4gJ3snICsgb3V0LmpvaW4oJywnKSArIGluZGVudCArICd9JztcbiAgICAgICAgfVxuICAgIH0pKHsgJyc6IG9iaiB9LCAnJywgb2JqLCAwKTtcbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiB7fS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxudmFyIG9iamVjdEtleXMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkgfHwgZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJ1ZSB9O1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICBpZiAoaGFzLmNhbGwob2JqLCBrZXkpKSBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIGtleXM7XG59O1xuIiwidmFyIGN4ID0gL1tcXHUwMDAwXFx1MDBhZFxcdTA2MDAtXFx1MDYwNFxcdTA3MGZcXHUxN2I0XFx1MTdiNVxcdTIwMGMtXFx1MjAwZlxcdTIwMjgtXFx1MjAyZlxcdTIwNjAtXFx1MjA2ZlxcdWZlZmZcXHVmZmYwLVxcdWZmZmZdL2csXG4gICAgZXNjYXBhYmxlID0gL1tcXFxcXFxcIlxceDAwLVxceDFmXFx4N2YtXFx4OWZcXHUwMGFkXFx1MDYwMC1cXHUwNjA0XFx1MDcwZlxcdTE3YjRcXHUxN2I1XFx1MjAwYy1cXHUyMDBmXFx1MjAyOC1cXHUyMDJmXFx1MjA2MC1cXHUyMDZmXFx1ZmVmZlxcdWZmZjAtXFx1ZmZmZl0vZyxcbiAgICBnYXAsXG4gICAgaW5kZW50LFxuICAgIG1ldGEgPSB7ICAgIC8vIHRhYmxlIG9mIGNoYXJhY3RlciBzdWJzdGl0dXRpb25zXG4gICAgICAgICdcXGInOiAnXFxcXGInLFxuICAgICAgICAnXFx0JzogJ1xcXFx0JyxcbiAgICAgICAgJ1xcbic6ICdcXFxcbicsXG4gICAgICAgICdcXGYnOiAnXFxcXGYnLFxuICAgICAgICAnXFxyJzogJ1xcXFxyJyxcbiAgICAgICAgJ1wiJyA6ICdcXFxcXCInLFxuICAgICAgICAnXFxcXCc6ICdcXFxcXFxcXCdcbiAgICB9LFxuICAgIHJlcDtcblxuZnVuY3Rpb24gcXVvdGUoc3RyaW5nKSB7XG4gICAgLy8gSWYgdGhlIHN0cmluZyBjb250YWlucyBubyBjb250cm9sIGNoYXJhY3RlcnMsIG5vIHF1b3RlIGNoYXJhY3RlcnMsIGFuZCBub1xuICAgIC8vIGJhY2tzbGFzaCBjaGFyYWN0ZXJzLCB0aGVuIHdlIGNhbiBzYWZlbHkgc2xhcCBzb21lIHF1b3RlcyBhcm91bmQgaXQuXG4gICAgLy8gT3RoZXJ3aXNlIHdlIG11c3QgYWxzbyByZXBsYWNlIHRoZSBvZmZlbmRpbmcgY2hhcmFjdGVycyB3aXRoIHNhZmUgZXNjYXBlXG4gICAgLy8gc2VxdWVuY2VzLlxuICAgIFxuICAgIGVzY2FwYWJsZS5sYXN0SW5kZXggPSAwO1xuICAgIHJldHVybiBlc2NhcGFibGUudGVzdChzdHJpbmcpID8gJ1wiJyArIHN0cmluZy5yZXBsYWNlKGVzY2FwYWJsZSwgZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgdmFyIGMgPSBtZXRhW2FdO1xuICAgICAgICByZXR1cm4gdHlwZW9mIGMgPT09ICdzdHJpbmcnID8gYyA6XG4gICAgICAgICAgICAnXFxcXHUnICsgKCcwMDAwJyArIGEuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikpLnNsaWNlKC00KTtcbiAgICB9KSArICdcIicgOiAnXCInICsgc3RyaW5nICsgJ1wiJztcbn1cblxuZnVuY3Rpb24gc3RyKGtleSwgaG9sZGVyKSB7XG4gICAgLy8gUHJvZHVjZSBhIHN0cmluZyBmcm9tIGhvbGRlcltrZXldLlxuICAgIHZhciBpLCAgICAgICAgICAvLyBUaGUgbG9vcCBjb3VudGVyLlxuICAgICAgICBrLCAgICAgICAgICAvLyBUaGUgbWVtYmVyIGtleS5cbiAgICAgICAgdiwgICAgICAgICAgLy8gVGhlIG1lbWJlciB2YWx1ZS5cbiAgICAgICAgbGVuZ3RoLFxuICAgICAgICBtaW5kID0gZ2FwLFxuICAgICAgICBwYXJ0aWFsLFxuICAgICAgICB2YWx1ZSA9IGhvbGRlcltrZXldO1xuICAgIFxuICAgIC8vIElmIHRoZSB2YWx1ZSBoYXMgYSB0b0pTT04gbWV0aG9kLCBjYWxsIGl0IHRvIG9idGFpbiBhIHJlcGxhY2VtZW50IHZhbHVlLlxuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUudG9KU09OID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUudG9KU09OKGtleSk7XG4gICAgfVxuICAgIFxuICAgIC8vIElmIHdlIHdlcmUgY2FsbGVkIHdpdGggYSByZXBsYWNlciBmdW5jdGlvbiwgdGhlbiBjYWxsIHRoZSByZXBsYWNlciB0b1xuICAgIC8vIG9idGFpbiBhIHJlcGxhY2VtZW50IHZhbHVlLlxuICAgIGlmICh0eXBlb2YgcmVwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhbHVlID0gcmVwLmNhbGwoaG9sZGVyLCBrZXksIHZhbHVlKTtcbiAgICB9XG4gICAgXG4gICAgLy8gV2hhdCBoYXBwZW5zIG5leHQgZGVwZW5kcyBvbiB0aGUgdmFsdWUncyB0eXBlLlxuICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICByZXR1cm4gcXVvdGUodmFsdWUpO1xuICAgICAgICBcbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgIC8vIEpTT04gbnVtYmVycyBtdXN0IGJlIGZpbml0ZS4gRW5jb2RlIG5vbi1maW5pdGUgbnVtYmVycyBhcyBudWxsLlxuICAgICAgICAgICAgcmV0dXJuIGlzRmluaXRlKHZhbHVlKSA/IFN0cmluZyh2YWx1ZSkgOiAnbnVsbCc7XG4gICAgICAgIFxuICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgY2FzZSAnbnVsbCc6XG4gICAgICAgICAgICAvLyBJZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuIG9yIG51bGwsIGNvbnZlcnQgaXQgdG8gYSBzdHJpbmcuIE5vdGU6XG4gICAgICAgICAgICAvLyB0eXBlb2YgbnVsbCBkb2VzIG5vdCBwcm9kdWNlICdudWxsJy4gVGhlIGNhc2UgaXMgaW5jbHVkZWQgaGVyZSBpblxuICAgICAgICAgICAgLy8gdGhlIHJlbW90ZSBjaGFuY2UgdGhhdCB0aGlzIGdldHMgZml4ZWQgc29tZWRheS5cbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgICAgICAgICAgXG4gICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm4gJ251bGwnO1xuICAgICAgICAgICAgZ2FwICs9IGluZGVudDtcbiAgICAgICAgICAgIHBhcnRpYWwgPSBbXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQXJyYXkuaXNBcnJheVxuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuYXBwbHkodmFsdWUpID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgICAgICAgICAgbGVuZ3RoID0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJ0aWFsW2ldID0gc3RyKGksIHZhbHVlKSB8fCAnbnVsbCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIEpvaW4gYWxsIG9mIHRoZSBlbGVtZW50cyB0b2dldGhlciwgc2VwYXJhdGVkIHdpdGggY29tbWFzLCBhbmRcbiAgICAgICAgICAgICAgICAvLyB3cmFwIHRoZW0gaW4gYnJhY2tldHMuXG4gICAgICAgICAgICAgICAgdiA9IHBhcnRpYWwubGVuZ3RoID09PSAwID8gJ1tdJyA6IGdhcCA/XG4gICAgICAgICAgICAgICAgICAgICdbXFxuJyArIGdhcCArIHBhcnRpYWwuam9pbignLFxcbicgKyBnYXApICsgJ1xcbicgKyBtaW5kICsgJ10nIDpcbiAgICAgICAgICAgICAgICAgICAgJ1snICsgcGFydGlhbC5qb2luKCcsJykgKyAnXSc7XG4gICAgICAgICAgICAgICAgZ2FwID0gbWluZDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gSWYgdGhlIHJlcGxhY2VyIGlzIGFuIGFycmF5LCB1c2UgaXQgdG8gc2VsZWN0IHRoZSBtZW1iZXJzIHRvIGJlXG4gICAgICAgICAgICAvLyBzdHJpbmdpZmllZC5cbiAgICAgICAgICAgIGlmIChyZXAgJiYgdHlwZW9mIHJlcCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBsZW5ndGggPSByZXAubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBrID0gcmVwW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGsgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2ID0gc3RyKGssIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydGlhbC5wdXNoKHF1b3RlKGspICsgKGdhcCA/ICc6ICcgOiAnOicpICsgdik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UsIGl0ZXJhdGUgdGhyb3VnaCBhbGwgb2YgdGhlIGtleXMgaW4gdGhlIG9iamVjdC5cbiAgICAgICAgICAgICAgICBmb3IgKGsgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgaykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHYgPSBzdHIoaywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWFsLnB1c2gocXVvdGUoaykgKyAoZ2FwID8gJzogJyA6ICc6JykgKyB2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAvLyBKb2luIGFsbCBvZiB0aGUgbWVtYmVyIHRleHRzIHRvZ2V0aGVyLCBzZXBhcmF0ZWQgd2l0aCBjb21tYXMsXG4gICAgICAgIC8vIGFuZCB3cmFwIHRoZW0gaW4gYnJhY2VzLlxuXG4gICAgICAgIHYgPSBwYXJ0aWFsLmxlbmd0aCA9PT0gMCA/ICd7fScgOiBnYXAgP1xuICAgICAgICAgICAgJ3tcXG4nICsgZ2FwICsgcGFydGlhbC5qb2luKCcsXFxuJyArIGdhcCkgKyAnXFxuJyArIG1pbmQgKyAnfScgOlxuICAgICAgICAgICAgJ3snICsgcGFydGlhbC5qb2luKCcsJykgKyAnfSc7XG4gICAgICAgIGdhcCA9IG1pbmQ7XG4gICAgICAgIHJldHVybiB2O1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUsIHJlcGxhY2VyLCBzcGFjZSkge1xuICAgIHZhciBpO1xuICAgIGdhcCA9ICcnO1xuICAgIGluZGVudCA9ICcnO1xuICAgIFxuICAgIC8vIElmIHRoZSBzcGFjZSBwYXJhbWV0ZXIgaXMgYSBudW1iZXIsIG1ha2UgYW4gaW5kZW50IHN0cmluZyBjb250YWluaW5nIHRoYXRcbiAgICAvLyBtYW55IHNwYWNlcy5cbiAgICBpZiAodHlwZW9mIHNwYWNlID09PSAnbnVtYmVyJykge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc3BhY2U7IGkgKz0gMSkge1xuICAgICAgICAgICAgaW5kZW50ICs9ICcgJztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBJZiB0aGUgc3BhY2UgcGFyYW1ldGVyIGlzIGEgc3RyaW5nLCBpdCB3aWxsIGJlIHVzZWQgYXMgdGhlIGluZGVudCBzdHJpbmcuXG4gICAgZWxzZSBpZiAodHlwZW9mIHNwYWNlID09PSAnc3RyaW5nJykge1xuICAgICAgICBpbmRlbnQgPSBzcGFjZTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSBpcyBhIHJlcGxhY2VyLCBpdCBtdXN0IGJlIGEgZnVuY3Rpb24gb3IgYW4gYXJyYXkuXG4gICAgLy8gT3RoZXJ3aXNlLCB0aHJvdyBhbiBlcnJvci5cbiAgICByZXAgPSByZXBsYWNlcjtcbiAgICBpZiAocmVwbGFjZXIgJiYgdHlwZW9mIHJlcGxhY2VyICE9PSAnZnVuY3Rpb24nXG4gICAgJiYgKHR5cGVvZiByZXBsYWNlciAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIHJlcGxhY2VyLmxlbmd0aCAhPT0gJ251bWJlcicpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSlNPTi5zdHJpbmdpZnknKTtcbiAgICB9XG4gICAgXG4gICAgLy8gTWFrZSBhIGZha2Ugcm9vdCBvYmplY3QgY29udGFpbmluZyBvdXIgdmFsdWUgdW5kZXIgdGhlIGtleSBvZiAnJy5cbiAgICAvLyBSZXR1cm4gdGhlIHJlc3VsdCBvZiBzdHJpbmdpZnlpbmcgdGhlIHZhbHVlLlxuICAgIHJldHVybiBzdHIoJycsIHsnJzogdmFsdWV9KTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9