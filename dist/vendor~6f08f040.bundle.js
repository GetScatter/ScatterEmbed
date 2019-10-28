(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[20],{

/***/ "+aAF":
/***/ (function(module, exports) {

module.exports = ensureHeader
function ensureHeader (headers, key, value) {
  var lower = key.toLowerCase()
  if (!headers[key] && !headers[lower]) {
    headers[key] = value
  }
}


/***/ }),

/***/ "+eF9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SecurityError = /** @class */ (function (_super) {
    __extends(SecurityError, _super);
    function SecurityError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SecurityError;
}(Error));
exports.SecurityError = SecurityError;
var InvalidStateError = /** @class */ (function (_super) {
    __extends(InvalidStateError, _super);
    function InvalidStateError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InvalidStateError;
}(Error));
exports.InvalidStateError = InvalidStateError;
var NetworkError = /** @class */ (function (_super) {
    __extends(NetworkError, _super);
    function NetworkError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NetworkError;
}(Error));
exports.NetworkError = NetworkError;
var SyntaxError = /** @class */ (function (_super) {
    __extends(SyntaxError, _super);
    function SyntaxError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SyntaxError;
}(Error));
exports.SyntaxError = SyntaxError;
//# sourceMappingURL=errors.js.map

/***/ }),

/***/ "7sdD":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var window = __webpack_require__("vgmO")
var isFunction = __webpack_require__("g2LC")
var parseHeaders = __webpack_require__("ZESv")
var xtend = __webpack_require__("U6jy")

module.exports = createXHR
// Allow use of default import syntax in TypeScript
module.exports.default = createXHR;
createXHR.XMLHttpRequest = window.XMLHttpRequest || noop
createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window.XDomainRequest

forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
    createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
        options = initParams(uri, options, callback)
        options.method = method.toUpperCase()
        return _createXHR(options)
    }
})

function forEachArray(array, iterator) {
    for (var i = 0; i < array.length; i++) {
        iterator(array[i])
    }
}

function isEmpty(obj){
    for(var i in obj){
        if(obj.hasOwnProperty(i)) return false
    }
    return true
}

function initParams(uri, options, callback) {
    var params = uri

    if (isFunction(options)) {
        callback = options
        if (typeof uri === "string") {
            params = {uri:uri}
        }
    } else {
        params = xtend(options, {uri: uri})
    }

    params.callback = callback
    return params
}

function createXHR(uri, options, callback) {
    options = initParams(uri, options, callback)
    return _createXHR(options)
}

function _createXHR(options) {
    if(typeof options.callback === "undefined"){
        throw new Error("callback argument missing")
    }

    var called = false
    var callback = function cbOnce(err, response, body){
        if(!called){
            called = true
            options.callback(err, response, body)
        }
    }

    function readystatechange() {
        if (xhr.readyState === 4) {
            setTimeout(loadFunc, 0)
        }
    }

    function getBody() {
        // Chrome with requestType=blob throws errors arround when even testing access to responseText
        var body = undefined

        if (xhr.response) {
            body = xhr.response
        } else {
            body = xhr.responseText || getXml(xhr)
        }

        if (isJson) {
            try {
                body = JSON.parse(body)
            } catch (e) {}
        }

        return body
    }

    function errorFunc(evt) {
        clearTimeout(timeoutTimer)
        if(!(evt instanceof Error)){
            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error") )
        }
        evt.statusCode = 0
        return callback(evt, failureResponse)
    }

    // will load the data & process the response in a special response object
    function loadFunc() {
        if (aborted) return
        var status
        clearTimeout(timeoutTimer)
        if(options.useXDR && xhr.status===undefined) {
            //IE8 CORS GET successful response doesn't have a status field, but body is fine
            status = 200
        } else {
            status = (xhr.status === 1223 ? 204 : xhr.status)
        }
        var response = failureResponse
        var err = null

        if (status !== 0){
            response = {
                body: getBody(),
                statusCode: status,
                method: method,
                headers: {},
                url: uri,
                rawRequest: xhr
            }
            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
                response.headers = parseHeaders(xhr.getAllResponseHeaders())
            }
        } else {
            err = new Error("Internal XMLHttpRequest Error")
        }
        return callback(err, response, response.body)
    }

    var xhr = options.xhr || null

    if (!xhr) {
        if (options.cors || options.useXDR) {
            xhr = new createXHR.XDomainRequest()
        }else{
            xhr = new createXHR.XMLHttpRequest()
        }
    }

    var key
    var aborted
    var uri = xhr.url = options.uri || options.url
    var method = xhr.method = options.method || "GET"
    var body = options.body || options.data
    var headers = xhr.headers = options.headers || {}
    var sync = !!options.sync
    var isJson = false
    var timeoutTimer
    var failureResponse = {
        body: undefined,
        headers: {},
        statusCode: 0,
        method: method,
        url: uri,
        rawRequest: xhr
    }

    if ("json" in options && options.json !== false) {
        isJson = true
        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json") //Don't override existing accept header declared by user
        if (method !== "GET" && method !== "HEAD") {
            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json") //Don't override existing accept header declared by user
            body = JSON.stringify(options.json === true ? body : options.json)
        }
    }

    xhr.onreadystatechange = readystatechange
    xhr.onload = loadFunc
    xhr.onerror = errorFunc
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    }
    xhr.onabort = function(){
        aborted = true;
    }
    xhr.ontimeout = errorFunc
    xhr.open(method, uri, !sync, options.username, options.password)
    //has to be after open
    if(!sync) {
        xhr.withCredentials = !!options.withCredentials
    }
    // Cannot set timeout with sync request
    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
    if (!sync && options.timeout > 0 ) {
        timeoutTimer = setTimeout(function(){
            if (aborted) return
            aborted = true//IE9 may still call readystatechange
            xhr.abort("timeout")
            var e = new Error("XMLHttpRequest timeout")
            e.code = "ETIMEDOUT"
            errorFunc(e)
        }, options.timeout )
    }

    if (xhr.setRequestHeader) {
        for(key in headers){
            if(headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key])
            }
        }
    } else if (options.headers && !isEmpty(options.headers)) {
        throw new Error("Headers cannot be set on an XDomainRequest object")
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType
    }

    if ("beforeSend" in options &&
        typeof options.beforeSend === "function"
    ) {
        options.beforeSend(xhr)
    }

    // Microsoft Edge browser sends "undefined" when send is called with undefined value.
    // XMLHttpRequest spec says to pass null as body to indicate no body
    // See https://github.com/naugtur/xhr/issues/100.
    xhr.send(body || null)

    return xhr


}

function getXml(xhr) {
    // xhr.responseXML will throw Exception "InvalidStateError" or "DOMException"
    // See https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseXML.
    try {
        if (xhr.responseType === "document") {
            return xhr.responseXML
        }
        var firefoxBugTakenEffect = xhr.responseXML && xhr.responseXML.documentElement.nodeName === "parsererror"
        if (xhr.responseType === "" && !firefoxBugTakenEffect) {
            return xhr.responseXML
        }
    } catch (e) {}

    return null
}

function noop() {}


/***/ }),

/***/ "DtST":
/***/ (function(module, exports) {

module.exports = getResponse
function getResponse (opt, resp) {
  if (!resp) return null
  return {
    statusCode: resp.statusCode,
    headers: resp.headers,
    method: opt.method,
    url: opt.url,
    // the XHR object in browser, http response in Node
    rawRequest: resp.rawRequest ? resp.rawRequest : resp
  }
}


/***/ }),

/***/ "JfJa":
/***/ (function(module, exports, __webpack_require__) {

var request = __webpack_require__("qqRY")

module.exports = function (url, options) {
  return new Promise(function (resolve, reject) {
    request(url, options, function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};


/***/ }),

/***/ "N9pI":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, Buffer) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = __webpack_require__("lJCZ");
var https = __webpack_require__("JPgR");
var os = __webpack_require__("PENG");
var url = __webpack_require__("CxY0");
var progress_event_1 = __webpack_require__("o5O0");
var errors_1 = __webpack_require__("+eF9");
var xml_http_request_event_target_1 = __webpack_require__("Zevj");
var xml_http_request_upload_1 = __webpack_require__("RjMt");
var Cookie = __webpack_require__("pspB");
var XMLHttpRequest = /** @class */ (function (_super) {
    __extends(XMLHttpRequest, _super);
    function XMLHttpRequest(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.UNSENT = XMLHttpRequest.UNSENT;
        _this.OPENED = XMLHttpRequest.OPENED;
        _this.HEADERS_RECEIVED = XMLHttpRequest.HEADERS_RECEIVED;
        _this.LOADING = XMLHttpRequest.LOADING;
        _this.DONE = XMLHttpRequest.DONE;
        _this.onreadystatechange = null;
        _this.readyState = XMLHttpRequest.UNSENT;
        _this.response = null;
        _this.responseText = '';
        _this.responseType = '';
        _this.status = 0; // TODO: UNSENT?
        _this.statusText = '';
        _this.timeout = 0;
        _this.upload = new xml_http_request_upload_1.XMLHttpRequestUpload();
        _this.responseUrl = '';
        _this.withCredentials = false;
        _this._method = null;
        _this._url = null;
        _this._sync = false;
        _this._headers = {};
        _this._loweredHeaders = {};
        _this._mimeOverride = null; // TODO: is type right?
        _this._request = null;
        _this._response = null;
        _this._responseParts = null;
        _this._responseHeaders = null;
        _this._aborting = null; // TODO: type?
        _this._error = null; // TODO: type?
        _this._loadedBytes = 0;
        _this._totalBytes = 0;
        _this._lengthComputable = false;
        _this._restrictedMethods = { CONNECT: true, TRACE: true, TRACK: true };
        _this._restrictedHeaders = {
            'accept-charset': true,
            'accept-encoding': true,
            'access-control-request-headers': true,
            'access-control-request-method': true,
            connection: true,
            'content-length': true,
            cookie: true,
            cookie2: true,
            date: true,
            dnt: true,
            expect: true,
            host: true,
            'keep-alive': true,
            origin: true,
            referer: true,
            te: true,
            trailer: true,
            'transfer-encoding': true,
            upgrade: true,
            'user-agent': true,
            via: true
        };
        _this._privateHeaders = { 'set-cookie': true, 'set-cookie2': true };
        _this._userAgent = "Mozilla/5.0 (" + os.type() + " " + os.arch() + ") node.js/" + process.versions.node + " v8/" + process.versions.v8;
        _this._anonymous = options.anon || false;
        return _this;
    }
    XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
        if (async === void 0) { async = true; }
        method = method.toUpperCase();
        if (this._restrictedMethods[method]) {
            throw new XMLHttpRequest.SecurityError("HTTP method " + method + " is not allowed in XHR");
        }
        ;
        var xhrUrl = this._parseUrl(url, user, password);
        if (this.readyState === XMLHttpRequest.HEADERS_RECEIVED || this.readyState === XMLHttpRequest.LOADING) {
            // TODO(pwnall): terminate abort(), terminate send()
        }
        this._method = method;
        this._url = xhrUrl;
        this._sync = !async;
        this._headers = {};
        this._loweredHeaders = {};
        this._mimeOverride = null;
        this._setReadyState(XMLHttpRequest.OPENED);
        this._request = null;
        this._response = null;
        this.status = 0;
        this.statusText = '';
        this._responseParts = [];
        this._responseHeaders = null;
        this._loadedBytes = 0;
        this._totalBytes = 0;
        this._lengthComputable = false;
    };
    XMLHttpRequest.prototype.setRequestHeader = function (name, value) {
        if (this.readyState !== XMLHttpRequest.OPENED) {
            throw new XMLHttpRequest.InvalidStateError('XHR readyState must be OPENED');
        }
        var loweredName = name.toLowerCase();
        if (this._restrictedHeaders[loweredName] || /^sec-/.test(loweredName) || /^proxy-/.test(loweredName)) {
            console.warn("Refused to set unsafe header \"" + name + "\"");
            return;
        }
        value = value.toString();
        if (this._loweredHeaders[loweredName] != null) {
            name = this._loweredHeaders[loweredName];
            this._headers[name] = this._headers[name] + ", " + value;
        }
        else {
            this._loweredHeaders[loweredName] = name;
            this._headers[name] = value;
        }
    };
    XMLHttpRequest.prototype.send = function (data) {
        if (this.readyState !== XMLHttpRequest.OPENED) {
            throw new XMLHttpRequest.InvalidStateError('XHR readyState must be OPENED');
        }
        if (this._request) {
            throw new XMLHttpRequest.InvalidStateError('send() already called');
        }
        switch (this._url.protocol) {
            case 'file:':
                return this._sendFile(data);
            case 'http:':
            case 'https:':
                return this._sendHttp(data);
            default:
                throw new XMLHttpRequest.NetworkError("Unsupported protocol " + this._url.protocol);
        }
    };
    XMLHttpRequest.prototype.abort = function () {
        if (this._request == null) {
            return;
        }
        this._request.abort();
        this._setError();
        this._dispatchProgress('abort');
        this._dispatchProgress('loadend');
    };
    XMLHttpRequest.prototype.getResponseHeader = function (name) {
        if (this._responseHeaders == null || name == null) {
            return null;
        }
        var loweredName = name.toLowerCase();
        return this._responseHeaders.hasOwnProperty(loweredName)
            ? this._responseHeaders[name.toLowerCase()]
            : null;
    };
    XMLHttpRequest.prototype.getAllResponseHeaders = function () {
        var _this = this;
        if (this._responseHeaders == null) {
            return '';
        }
        return Object.keys(this._responseHeaders).map(function (key) { return key + ": " + _this._responseHeaders[key]; }).join('\r\n');
    };
    XMLHttpRequest.prototype.overrideMimeType = function (mimeType) {
        if (this.readyState === XMLHttpRequest.LOADING || this.readyState === XMLHttpRequest.DONE) {
            throw new XMLHttpRequest.InvalidStateError('overrideMimeType() not allowed in LOADING or DONE');
        }
        this._mimeOverride = mimeType.toLowerCase();
    };
    XMLHttpRequest.prototype.nodejsSet = function (options) {
        this.nodejsHttpAgent = options.httpAgent || this.nodejsHttpAgent;
        this.nodejsHttpsAgent = options.httpsAgent || this.nodejsHttpsAgent;
        if (options.hasOwnProperty('baseUrl')) {
            if (options.baseUrl != null) {
                var parsedUrl = url.parse(options.baseUrl, false, true);
                if (!parsedUrl.protocol) {
                    throw new XMLHttpRequest.SyntaxError("baseUrl must be an absolute URL");
                }
            }
            this.nodejsBaseUrl = options.baseUrl;
        }
    };
    XMLHttpRequest.nodejsSet = function (options) {
        XMLHttpRequest.prototype.nodejsSet(options);
    };
    XMLHttpRequest.prototype._setReadyState = function (readyState) {
        this.readyState = readyState;
        this.dispatchEvent(new progress_event_1.ProgressEvent('readystatechange'));
    };
    XMLHttpRequest.prototype._sendFile = function (data) {
        // TODO
        throw new Error('Protocol file: not implemented');
    };
    XMLHttpRequest.prototype._sendHttp = function (data) {
        if (this._sync) {
            throw new Error('Synchronous XHR processing not implemented');
        }
        if (data && (this._method === 'GET' || this._method === 'HEAD')) {
            console.warn("Discarding entity body for " + this._method + " requests");
            data = null;
        }
        else {
            data = data || '';
        }
        this.upload._setData(data);
        this._finalizeHeaders();
        this._sendHxxpRequest();
    };
    XMLHttpRequest.prototype._sendHxxpRequest = function () {
        var _this = this;
        if (this.withCredentials) {
            var cookie = XMLHttpRequest.cookieJar
                .getCookies(Cookie.CookieAccessInfo(this._url.hostname, this._url.pathname, this._url.protocol === 'https:')).toValueString();
            this._headers.cookie = this._headers.cookie2 = cookie;
        }
        var _a = this._url.protocol === 'http:' ? [http, this.nodejsHttpAgent] : [https, this.nodejsHttpsAgent], hxxp = _a[0], agent = _a[1];
        var requestMethod = hxxp.request.bind(hxxp);
        var request = requestMethod({
            hostname: this._url.hostname,
            port: +this._url.port,
            path: this._url.path,
            auth: this._url.auth,
            method: this._method,
            headers: this._headers,
            agent: agent
        });
        this._request = request;
        if (this.timeout) {
            request.setTimeout(this.timeout, function () { return _this._onHttpTimeout(request); });
        }
        request.on('response', function (response) { return _this._onHttpResponse(request, response); });
        request.on('error', function (error) { return _this._onHttpRequestError(request, error); });
        this.upload._startUpload(request);
        if (this._request === request) {
            this._dispatchProgress('loadstart');
        }
    };
    XMLHttpRequest.prototype._finalizeHeaders = function () {
        this._headers = __assign({}, this._headers, { Connection: 'keep-alive', Host: this._url.host, 'User-Agent': this._userAgent }, this._anonymous ? { Referer: 'about:blank' } : {});
        this.upload._finalizeHeaders(this._headers, this._loweredHeaders);
    };
    XMLHttpRequest.prototype._onHttpResponse = function (request, response) {
        var _this = this;
        if (this._request !== request) {
            return;
        }
        if (this.withCredentials && (response.headers['set-cookie'] || response.headers['set-cookie2'])) {
            XMLHttpRequest.cookieJar
                .setCookies(response.headers['set-cookie'] || response.headers['set-cookie2']);
        }
        if ([301, 302, 303, 307, 308].indexOf(response.statusCode) >= 0) {
            this._url = this._parseUrl(response.headers.location);
            this._method = 'GET';
            if (this._loweredHeaders['content-type']) {
                delete this._headers[this._loweredHeaders['content-type']];
                delete this._loweredHeaders['content-type'];
            }
            if (this._headers['Content-Type'] != null) {
                delete this._headers['Content-Type'];
            }
            delete this._headers['Content-Length'];
            this.upload._reset();
            this._finalizeHeaders();
            this._sendHxxpRequest();
            return;
        }
        this._response = response;
        this._response.on('data', function (data) { return _this._onHttpResponseData(response, data); });
        this._response.on('end', function () { return _this._onHttpResponseEnd(response); });
        this._response.on('close', function () { return _this._onHttpResponseClose(response); });
        this.responseUrl = this._url.href.split('#')[0];
        this.status = response.statusCode;
        this.statusText = http.STATUS_CODES[this.status];
        this._parseResponseHeaders(response);
        var lengthString = this._responseHeaders['content-length'] || '';
        this._totalBytes = +lengthString;
        this._lengthComputable = !!lengthString;
        this._setReadyState(XMLHttpRequest.HEADERS_RECEIVED);
    };
    XMLHttpRequest.prototype._onHttpResponseData = function (response, data) {
        if (this._response !== response) {
            return;
        }
        this._responseParts.push(new Buffer(data));
        this._loadedBytes += data.length;
        if (this.readyState !== XMLHttpRequest.LOADING) {
            this._setReadyState(XMLHttpRequest.LOADING);
        }
        this._dispatchProgress('progress');
    };
    XMLHttpRequest.prototype._onHttpResponseEnd = function (response) {
        if (this._response !== response) {
            return;
        }
        this._parseResponse();
        this._request = null;
        this._response = null;
        this._setReadyState(XMLHttpRequest.DONE);
        this._dispatchProgress('load');
        this._dispatchProgress('loadend');
    };
    XMLHttpRequest.prototype._onHttpResponseClose = function (response) {
        if (this._response !== response) {
            return;
        }
        var request = this._request;
        this._setError();
        request.abort();
        this._setReadyState(XMLHttpRequest.DONE);
        this._dispatchProgress('error');
        this._dispatchProgress('loadend');
    };
    XMLHttpRequest.prototype._onHttpTimeout = function (request) {
        if (this._request !== request) {
            return;
        }
        this._setError();
        request.abort();
        this._setReadyState(XMLHttpRequest.DONE);
        this._dispatchProgress('timeout');
        this._dispatchProgress('loadend');
    };
    XMLHttpRequest.prototype._onHttpRequestError = function (request, error) {
        if (this._request !== request) {
            return;
        }
        this._setError();
        request.abort();
        this._setReadyState(XMLHttpRequest.DONE);
        this._dispatchProgress('error');
        this._dispatchProgress('loadend');
    };
    XMLHttpRequest.prototype._dispatchProgress = function (eventType) {
        var event = new XMLHttpRequest.ProgressEvent(eventType);
        event.lengthComputable = this._lengthComputable;
        event.loaded = this._loadedBytes;
        event.total = this._totalBytes;
        this.dispatchEvent(event);
    };
    XMLHttpRequest.prototype._setError = function () {
        this._request = null;
        this._response = null;
        this._responseHeaders = null;
        this._responseParts = null;
    };
    XMLHttpRequest.prototype._parseUrl = function (urlString, user, password) {
        var absoluteUrl = this.nodejsBaseUrl == null ? urlString : url.resolve(this.nodejsBaseUrl, urlString);
        var xhrUrl = url.parse(absoluteUrl, false, true);
        xhrUrl.hash = null;
        var _a = (xhrUrl.auth || '').split(':'), xhrUser = _a[0], xhrPassword = _a[1];
        if (xhrUser || xhrPassword || user || password) {
            xhrUrl.auth = (user || xhrUser || '') + ":" + (password || xhrPassword || '');
        }
        return xhrUrl;
    };
    XMLHttpRequest.prototype._parseResponseHeaders = function (response) {
        this._responseHeaders = {};
        for (var name_1 in response.headers) {
            var loweredName = name_1.toLowerCase();
            if (this._privateHeaders[loweredName]) {
                continue;
            }
            this._responseHeaders[loweredName] = response.headers[name_1];
        }
        if (this._mimeOverride != null) {
            this._responseHeaders['content-type'] = this._mimeOverride;
        }
    };
    XMLHttpRequest.prototype._parseResponse = function () {
        var buffer = Buffer.concat(this._responseParts);
        this._responseParts = null;
        switch (this.responseType) {
            case 'json':
                this.responseText = null;
                try {
                    this.response = JSON.parse(buffer.toString('utf-8'));
                }
                catch (_a) {
                    this.response = null;
                }
                return;
            case 'buffer':
                this.responseText = null;
                this.response = buffer;
                return;
            case 'arraybuffer':
                this.responseText = null;
                var arrayBuffer = new ArrayBuffer(buffer.length);
                var view = new Uint8Array(arrayBuffer);
                for (var i = 0; i < buffer.length; i++) {
                    view[i] = buffer[i];
                }
                this.response = arrayBuffer;
                return;
            case 'text':
            default:
                try {
                    this.responseText = buffer.toString(this._parseResponseEncoding());
                }
                catch (_b) {
                    this.responseText = buffer.toString('binary');
                }
                this.response = this.responseText;
        }
    };
    XMLHttpRequest.prototype._parseResponseEncoding = function () {
        return /;\s*charset=(.*)$/.exec(this._responseHeaders['content-type'] || '')[1] || 'utf-8';
    };
    XMLHttpRequest.ProgressEvent = progress_event_1.ProgressEvent;
    XMLHttpRequest.InvalidStateError = errors_1.InvalidStateError;
    XMLHttpRequest.NetworkError = errors_1.NetworkError;
    XMLHttpRequest.SecurityError = errors_1.SecurityError;
    XMLHttpRequest.SyntaxError = errors_1.SyntaxError;
    XMLHttpRequest.XMLHttpRequestUpload = xml_http_request_upload_1.XMLHttpRequestUpload;
    XMLHttpRequest.UNSENT = 0;
    XMLHttpRequest.OPENED = 1;
    XMLHttpRequest.HEADERS_RECEIVED = 2;
    XMLHttpRequest.LOADING = 3;
    XMLHttpRequest.DONE = 4;
    XMLHttpRequest.cookieJar = Cookie.CookieJar();
    return XMLHttpRequest;
}(xml_http_request_event_target_1.XMLHttpRequestEventTarget));
exports.XMLHttpRequest = XMLHttpRequest;
XMLHttpRequest.prototype.nodejsHttpAgent = http.globalAgent;
XMLHttpRequest.prototype.nodejsHttpsAgent = https.globalAgent;
XMLHttpRequest.prototype.nodejsBaseUrl = null;
//# sourceMappingURL=xml-http-request.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("8oxB"), __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "RjMt":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var xml_http_request_event_target_1 = __webpack_require__("Zevj");
var XMLHttpRequestUpload = /** @class */ (function (_super) {
    __extends(XMLHttpRequestUpload, _super);
    function XMLHttpRequestUpload() {
        var _this = _super.call(this) || this;
        _this._contentType = null;
        _this._body = null;
        _this._reset();
        return _this;
    }
    XMLHttpRequestUpload.prototype._reset = function () {
        this._contentType = null;
        this._body = null;
    };
    XMLHttpRequestUpload.prototype._setData = function (data) {
        if (data == null) {
            return;
        }
        if (typeof data === 'string') {
            if (data.length !== 0) {
                this._contentType = 'text/plain;charset=UTF-8';
            }
            this._body = new Buffer(data, 'utf-8');
        }
        else if (Buffer.isBuffer(data)) {
            this._body = data;
        }
        else if (data instanceof ArrayBuffer) {
            var body = new Buffer(data.byteLength);
            var view = new Uint8Array(data);
            for (var i = 0; i < data.byteLength; i++) {
                body[i] = view[i];
            }
            this._body = body;
        }
        else if (data.buffer && data.buffer instanceof ArrayBuffer) {
            var body = new Buffer(data.byteLength);
            var offset = data.byteOffset;
            var view = new Uint8Array(data.buffer);
            for (var i = 0; i < data.byteLength; i++) {
                body[i] = view[i + offset];
            }
            this._body = body;
        }
        else {
            throw new Error("Unsupported send() data " + data);
        }
    };
    XMLHttpRequestUpload.prototype._finalizeHeaders = function (headers, loweredHeaders) {
        if (this._contentType && !loweredHeaders['content-type']) {
            headers['Content-Type'] = this._contentType;
        }
        if (this._body) {
            headers['Content-Length'] = this._body.length.toString();
        }
    };
    XMLHttpRequestUpload.prototype._startUpload = function (request) {
        if (this._body) {
            request.write(this._body);
        }
        request.end();
    };
    return XMLHttpRequestUpload;
}(xml_http_request_event_target_1.XMLHttpRequestEventTarget));
exports.XMLHttpRequestUpload = XMLHttpRequestUpload;
//# sourceMappingURL=xml-http-request-upload.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("HDXh").Buffer))

/***/ }),

/***/ "T8zd":
/***/ (function(module, exports, __webpack_require__) {

var xhr = __webpack_require__("7sdD")
var normalize = __webpack_require__("DtST")
var noop = function () {}

module.exports = xhrRequest
function xhrRequest (opt, cb) {
  delete opt.uri

  // for better JSON.parse error handling than xhr module
  var useJson = false
  if (opt.responseType === 'json') {
    opt.responseType = 'text'
    useJson = true
  }

  var req = xhr(opt, function xhrRequestResult (err, resp, body) {
    if (useJson && !err) {
      try {
        var text = resp.rawRequest.responseText
        body = JSON.parse(text)
      } catch (e) {
        err = e
      }
    }

    resp = normalize(opt, resp)
    if (err) cb(err, null, resp)
    else cb(err, body, resp)
    cb = noop
  })

  // Patch abort() so that it also calls the callback, but with an error
  var onabort = req.onabort
  req.onabort = function () {
    var ret = onabort.apply(req, Array.prototype.slice.call(arguments))
    cb(new Error('XHR Aborted'))
    cb = noop
    return ret
  }

  return req
}


/***/ }),

/***/ "U6jy":
/***/ (function(module, exports) {

module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}


/***/ }),

/***/ "VWpA":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strictUriEncode = __webpack_require__("ZFOp");
var objectAssign = __webpack_require__("MgzW");
var decodeComponent = __webpack_require__("8jRI");

function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [
					encode(key, opts),
					'[',
					index,
					']'
				].join('') : [
					encode(key, opts),
					'[',
					encode(index, opts),
					']=',
					encode(value, opts)
				].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'[]=',
					encode(value, opts)
				].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'=',
					encode(value, opts)
				].join('');
			};
	}
}

function parserForArrayFormat(opts) {
	var result;

	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, accumulator) {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return function (key, value, accumulator) {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				} else if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		default:
			return function (key, value, accumulator) {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	} else if (typeof input === 'object') {
		return keysSorter(Object.keys(input)).sort(function (a, b) {
			return Number(a) - Number(b);
		}).map(function (key) {
			return input[key];
		});
	}

	return input;
}

function extract(str) {
	var queryStart = str.indexOf('?');
	if (queryStart === -1) {
		return '';
	}
	return str.slice(queryStart + 1);
}

function parse(str, opts) {
	opts = objectAssign({arrayFormat: 'none'}, opts);

	var formatter = parserForArrayFormat(opts);

	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^[?#&]/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeComponent(val);

		formatter(decodeComponent(key), val, ret);
	});

	return Object.keys(ret).sort().reduce(function (result, key) {
		var val = ret[key];
		if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
			// Sort object keys, not values
			result[key] = keysSorter(val);
		} else {
			result[key] = val;
		}

		return result;
	}, Object.create(null));
}

exports.extract = extract;
exports.parse = parse;

exports.stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

	if (opts.sort === false) {
		opts.sort = function () {};
	}

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort(opts.sort).map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				result.push(formatter(key, val2, result.length));
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};

exports.parseUrl = function (str, opts) {
	return {
		url: str.split('?')[0] || '',
		query: parse(extract(str), opts)
	};
};


/***/ }),

/***/ "Zevj":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var XMLHttpRequestEventTarget = /** @class */ (function () {
    function XMLHttpRequestEventTarget() {
        this.listeners = {};
    }
    XMLHttpRequestEventTarget.prototype.addEventListener = function (eventType, listener) {
        eventType = eventType.toLowerCase();
        this.listeners[eventType] = this.listeners[eventType] || [];
        this.listeners[eventType].push(listener.handleEvent || listener);
    };
    XMLHttpRequestEventTarget.prototype.removeEventListener = function (eventType, listener) {
        eventType = eventType.toLowerCase();
        if (!this.listeners[eventType]) {
            return;
        }
        var index = this.listeners[eventType].indexOf(listener.handleEvent || listener);
        if (index < 0) {
            return;
        }
        this.listeners[eventType].splice(index, 1);
    };
    XMLHttpRequestEventTarget.prototype.dispatchEvent = function (event) {
        var eventType = event.type.toLowerCase();
        event.target = this; // TODO: set event.currentTarget?
        if (this.listeners[eventType]) {
            for (var _i = 0, _a = this.listeners[eventType]; _i < _a.length; _i++) {
                var listener_1 = _a[_i];
                listener_1.call(this, event);
            }
        }
        var listener = this["on" + eventType];
        if (listener) {
            listener.call(this, event);
        }
        return true;
    };
    return XMLHttpRequestEventTarget;
}());
exports.XMLHttpRequestEventTarget = XMLHttpRequestEventTarget;
//# sourceMappingURL=xml-http-request-event-target.js.map

/***/ }),

/***/ "hgLn":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("N9pI"));
var xml_http_request_event_target_1 = __webpack_require__("Zevj");
exports.XMLHttpRequestEventTarget = xml_http_request_event_target_1.XMLHttpRequestEventTarget;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "o5O0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ProgressEvent = /** @class */ (function () {
    function ProgressEvent(type) {
        this.type = type;
        this.bubbles = false;
        this.cancelable = false;
        this.loaded = 0;
        this.lengthComputable = false;
        this.total = 0;
    }
    return ProgressEvent;
}());
exports.ProgressEvent = ProgressEvent;
//# sourceMappingURL=progress-event.js.map

/***/ }),

/***/ "qqRY":
/***/ (function(module, exports, __webpack_require__) {

var queryString = __webpack_require__("VWpA")
var setQuery = __webpack_require__("05rV")
var assign = __webpack_require__("MgzW")
var ensureHeader = __webpack_require__("+aAF")

// this is replaced in the browser
var request = __webpack_require__("T8zd")

var mimeTypeJson = 'application/json'
var noop = function () {}

module.exports = xhrRequest
function xhrRequest (url, opt, cb) {
  if (!url || typeof url !== 'string') {
    throw new TypeError('must specify a URL')
  }
  if (typeof opt === 'function') {
    cb = opt
    opt = {}
  }
  if (cb && typeof cb !== 'function') {
    throw new TypeError('expected cb to be undefined or a function')
  }

  cb = cb || noop
  opt = opt || {}

  var defaultResponse = opt.json ? 'json' : 'text'
  opt = assign({ responseType: defaultResponse }, opt)

  var headers = opt.headers || {}
  var method = (opt.method || 'GET').toUpperCase()
  var query = opt.query
  if (query) {
    if (typeof query !== 'string') {
      query = queryString.stringify(query)
    }
    url = setQuery(url, query)
  }

  // allow json response
  if (opt.responseType === 'json') {
    ensureHeader(headers, 'Accept', mimeTypeJson)
  }

  // if body content is json
  if (opt.json && method !== 'GET' && method !== 'HEAD') {
    ensureHeader(headers, 'Content-Type', mimeTypeJson)
    opt.body = JSON.stringify(opt.body)
  }

  opt.method = method
  opt.url = url
  opt.headers = headers
  delete opt.query
  delete opt.json

  return request(opt, cb)
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveGhyLXJlcXVlc3QvbGliL2Vuc3VyZS1oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3hocjItY29va2llcy9kaXN0L2Vycm9ycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveGhyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy94aHItcmVxdWVzdC9saWIvbm9ybWFsaXplLXJlc3BvbnNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy94aHItcmVxdWVzdC1wcm9taXNlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy94aHIyLWNvb2tpZXMvZGlzdC94bWwtaHR0cC1yZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy94aHIyLWNvb2tpZXMvZGlzdC94bWwtaHR0cC1yZXF1ZXN0LXVwbG9hZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveGhyLXJlcXVlc3QvbGliL3JlcXVlc3QtYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveHRlbmQvaW1tdXRhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy94aHItcmVxdWVzdC9ub2RlX21vZHVsZXMvcXVlcnktc3RyaW5nL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy94aHIyLWNvb2tpZXMvZGlzdC94bWwtaHR0cC1yZXF1ZXN0LWV2ZW50LXRhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveGhyMi1jb29raWVzL2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3hocjItY29va2llcy9kaXN0L3Byb2dyZXNzLWV2ZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy94aHItcmVxdWVzdC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNOYTtBQUNiO0FBQ0E7QUFDQSxVQUFVLGdCQUFnQixzQ0FBc0MsaUJBQWlCLEVBQUU7QUFDbkYseUJBQXlCLHVEQUF1RDtBQUNoRjtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0EsQ0FBQztBQUNELDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLGtDOzs7Ozs7OztBQzVDYTtBQUNiLGFBQWEsbUJBQU8sQ0FBQyxNQUFlO0FBQ3BDLGlCQUFpQixtQkFBTyxDQUFDLE1BQWE7QUFDdEMsbUJBQW1CLG1CQUFPLENBQUMsTUFBZTtBQUMxQyxZQUFZLG1CQUFPLENBQUMsTUFBTzs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0EsbUJBQW1CLGtCQUFrQjtBQUNyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0EsS0FBSztBQUNMLGlDQUFpQyxTQUFTO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDdFBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNYQSxjQUFjLG1CQUFPLENBQUMsTUFBYTs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7Ozs7Ozs7OztBQ1RBLHVEQUFhO0FBQ2I7QUFDQTtBQUNBLFVBQVUsZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUNuRix5QkFBeUIsdURBQXVEO0FBQ2hGO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSw0Q0FBNEMsT0FBTztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxXQUFXLG1CQUFPLENBQUMsTUFBTTtBQUN6QixZQUFZLG1CQUFPLENBQUMsTUFBTztBQUMzQixTQUFTLG1CQUFPLENBQUMsTUFBSTtBQUNyQixVQUFVLG1CQUFPLENBQUMsTUFBSztBQUN2Qix1QkFBdUIsbUJBQU8sQ0FBQyxNQUFrQjtBQUNqRCxlQUFlLG1CQUFPLENBQUMsTUFBVTtBQUNqQyxzQ0FBc0MsbUJBQU8sQ0FBQyxNQUFpQztBQUMvRSxnQ0FBZ0MsbUJBQU8sQ0FBQyxNQUEyQjtBQUNuRSxhQUFhLG1CQUFPLENBQUMsTUFBVztBQUNoQztBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsY0FBYztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGNBQWM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRUFBc0UsaURBQWlELEVBQUU7QUFDekg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSwwREFBMEQsc0NBQXNDLEVBQUU7QUFDbEc7QUFDQSxvREFBb0QsaURBQWlELEVBQUU7QUFDdkcsOENBQThDLGtEQUFrRCxFQUFFO0FBQ2xHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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ZSxtQkFBTyxDQUFDLE1BQWU7QUFDdEMsYUFBYSxtQkFBTyxDQUFDLE1BQWU7QUFDcEMsbUJBQW1CLG1CQUFPLENBQUMsTUFBd0I7O0FBRW5EO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLE1BQWtCOztBQUV4QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCLGdDQUFnQzs7QUFFaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwiZmlsZSI6InZlbmRvcn42ZjA4ZjA0MC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGVuc3VyZUhlYWRlclxuZnVuY3Rpb24gZW5zdXJlSGVhZGVyIChoZWFkZXJzLCBrZXksIHZhbHVlKSB7XG4gIHZhciBsb3dlciA9IGtleS50b0xvd2VyQ2FzZSgpXG4gIGlmICghaGVhZGVyc1trZXldICYmICFoZWFkZXJzW2xvd2VyXSkge1xuICAgIGhlYWRlcnNba2V5XSA9IHZhbHVlXG4gIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgU2VjdXJpdHlFcnJvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2VjdXJpdHlFcnJvciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTZWN1cml0eUVycm9yKCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBTZWN1cml0eUVycm9yO1xufShFcnJvcikpO1xuZXhwb3J0cy5TZWN1cml0eUVycm9yID0gU2VjdXJpdHlFcnJvcjtcbnZhciBJbnZhbGlkU3RhdGVFcnJvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoSW52YWxpZFN0YXRlRXJyb3IsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSW52YWxpZFN0YXRlRXJyb3IoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEludmFsaWRTdGF0ZUVycm9yO1xufShFcnJvcikpO1xuZXhwb3J0cy5JbnZhbGlkU3RhdGVFcnJvciA9IEludmFsaWRTdGF0ZUVycm9yO1xudmFyIE5ldHdvcmtFcnJvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTmV0d29ya0Vycm9yLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE5ldHdvcmtFcnJvcigpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gTmV0d29ya0Vycm9yO1xufShFcnJvcikpO1xuZXhwb3J0cy5OZXR3b3JrRXJyb3IgPSBOZXR3b3JrRXJyb3I7XG52YXIgU3ludGF4RXJyb3IgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFN5bnRheEVycm9yLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFN5bnRheEVycm9yKCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBTeW50YXhFcnJvcjtcbn0oRXJyb3IpKTtcbmV4cG9ydHMuU3ludGF4RXJyb3IgPSBTeW50YXhFcnJvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVycm9ycy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciB3aW5kb3cgPSByZXF1aXJlKFwiZ2xvYmFsL3dpbmRvd1wiKVxudmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKFwiaXMtZnVuY3Rpb25cIilcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKFwicGFyc2UtaGVhZGVyc1wiKVxudmFyIHh0ZW5kID0gcmVxdWlyZShcInh0ZW5kXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlWEhSXG4vLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgc3ludGF4IGluIFR5cGVTY3JpcHRcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVYSFI7XG5jcmVhdGVYSFIuWE1MSHR0cFJlcXVlc3QgPSB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgfHwgbm9vcFxuY3JlYXRlWEhSLlhEb21haW5SZXF1ZXN0ID0gXCJ3aXRoQ3JlZGVudGlhbHNcIiBpbiAobmV3IGNyZWF0ZVhIUi5YTUxIdHRwUmVxdWVzdCgpKSA/IGNyZWF0ZVhIUi5YTUxIdHRwUmVxdWVzdCA6IHdpbmRvdy5YRG9tYWluUmVxdWVzdFxuXG5mb3JFYWNoQXJyYXkoW1wiZ2V0XCIsIFwicHV0XCIsIFwicG9zdFwiLCBcInBhdGNoXCIsIFwiaGVhZFwiLCBcImRlbGV0ZVwiXSwgZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgY3JlYXRlWEhSW21ldGhvZCA9PT0gXCJkZWxldGVcIiA/IFwiZGVsXCIgOiBtZXRob2RdID0gZnVuY3Rpb24odXJpLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgICAgICBvcHRpb25zID0gaW5pdFBhcmFtcyh1cmksIG9wdGlvbnMsIGNhbGxiYWNrKVxuICAgICAgICBvcHRpb25zLm1ldGhvZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpXG4gICAgICAgIHJldHVybiBfY3JlYXRlWEhSKG9wdGlvbnMpXG4gICAgfVxufSlcblxuZnVuY3Rpb24gZm9yRWFjaEFycmF5KGFycmF5LCBpdGVyYXRvcikge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlcmF0b3IoYXJyYXlbaV0pXG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0VtcHR5KG9iail7XG4gICAgZm9yKHZhciBpIGluIG9iail7XG4gICAgICAgIGlmKG9iai5oYXNPd25Qcm9wZXJ0eShpKSkgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIGluaXRQYXJhbXModXJpLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIHZhciBwYXJhbXMgPSB1cmlcblxuICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbnMpKSB7XG4gICAgICAgIGNhbGxiYWNrID0gb3B0aW9uc1xuICAgICAgICBpZiAodHlwZW9mIHVyaSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgcGFyYW1zID0ge3VyaTp1cml9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBwYXJhbXMgPSB4dGVuZChvcHRpb25zLCB7dXJpOiB1cml9KVxuICAgIH1cblxuICAgIHBhcmFtcy5jYWxsYmFjayA9IGNhbGxiYWNrXG4gICAgcmV0dXJuIHBhcmFtc1xufVxuXG5mdW5jdGlvbiBjcmVhdGVYSFIodXJpLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIG9wdGlvbnMgPSBpbml0UGFyYW1zKHVyaSwgb3B0aW9ucywgY2FsbGJhY2spXG4gICAgcmV0dXJuIF9jcmVhdGVYSFIob3B0aW9ucylcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZVhIUihvcHRpb25zKSB7XG4gICAgaWYodHlwZW9mIG9wdGlvbnMuY2FsbGJhY2sgPT09IFwidW5kZWZpbmVkXCIpe1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYWxsYmFjayBhcmd1bWVudCBtaXNzaW5nXCIpXG4gICAgfVxuXG4gICAgdmFyIGNhbGxlZCA9IGZhbHNlXG4gICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gY2JPbmNlKGVyciwgcmVzcG9uc2UsIGJvZHkpe1xuICAgICAgICBpZighY2FsbGVkKXtcbiAgICAgICAgICAgIGNhbGxlZCA9IHRydWVcbiAgICAgICAgICAgIG9wdGlvbnMuY2FsbGJhY2soZXJyLCByZXNwb25zZSwgYm9keSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlYWR5c3RhdGVjaGFuZ2UoKSB7XG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgc2V0VGltZW91dChsb2FkRnVuYywgMClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJvZHkoKSB7XG4gICAgICAgIC8vIENocm9tZSB3aXRoIHJlcXVlc3RUeXBlPWJsb2IgdGhyb3dzIGVycm9ycyBhcnJvdW5kIHdoZW4gZXZlbiB0ZXN0aW5nIGFjY2VzcyB0byByZXNwb25zZVRleHRcbiAgICAgICAgdmFyIGJvZHkgPSB1bmRlZmluZWRcblxuICAgICAgICBpZiAoeGhyLnJlc3BvbnNlKSB7XG4gICAgICAgICAgICBib2R5ID0geGhyLnJlc3BvbnNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBib2R5ID0geGhyLnJlc3BvbnNlVGV4dCB8fCBnZXRYbWwoeGhyKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzSnNvbikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBib2R5ID0gSlNPTi5wYXJzZShib2R5KVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBib2R5XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXJyb3JGdW5jKGV2dCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dFRpbWVyKVxuICAgICAgICBpZighKGV2dCBpbnN0YW5jZW9mIEVycm9yKSl7XG4gICAgICAgICAgICBldnQgPSBuZXcgRXJyb3IoXCJcIiArIChldnQgfHwgXCJVbmtub3duIFhNTEh0dHBSZXF1ZXN0IEVycm9yXCIpIClcbiAgICAgICAgfVxuICAgICAgICBldnQuc3RhdHVzQ29kZSA9IDBcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGV2dCwgZmFpbHVyZVJlc3BvbnNlKVxuICAgIH1cblxuICAgIC8vIHdpbGwgbG9hZCB0aGUgZGF0YSAmIHByb2Nlc3MgdGhlIHJlc3BvbnNlIGluIGEgc3BlY2lhbCByZXNwb25zZSBvYmplY3RcbiAgICBmdW5jdGlvbiBsb2FkRnVuYygpIHtcbiAgICAgICAgaWYgKGFib3J0ZWQpIHJldHVyblxuICAgICAgICB2YXIgc3RhdHVzXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0VGltZXIpXG4gICAgICAgIGlmKG9wdGlvbnMudXNlWERSICYmIHhoci5zdGF0dXM9PT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vSUU4IENPUlMgR0VUIHN1Y2Nlc3NmdWwgcmVzcG9uc2UgZG9lc24ndCBoYXZlIGEgc3RhdHVzIGZpZWxkLCBidXQgYm9keSBpcyBmaW5lXG4gICAgICAgICAgICBzdGF0dXMgPSAyMDBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXR1cyA9ICh4aHIuc3RhdHVzID09PSAxMjIzID8gMjA0IDogeGhyLnN0YXR1cylcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzcG9uc2UgPSBmYWlsdXJlUmVzcG9uc2VcbiAgICAgICAgdmFyIGVyciA9IG51bGxcblxuICAgICAgICBpZiAoc3RhdHVzICE9PSAwKXtcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge1xuICAgICAgICAgICAgICAgIGJvZHk6IGdldEJvZHkoKSxcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiBzdGF0dXMsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge30sXG4gICAgICAgICAgICAgICAgdXJsOiB1cmksXG4gICAgICAgICAgICAgICAgcmF3UmVxdWVzdDogeGhyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKXsgLy9yZW1lbWJlciB4aHIgY2FuIGluIGZhY3QgYmUgWERSIGZvciBDT1JTIGluIElFXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuaGVhZGVycyA9IHBhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlcnIgPSBuZXcgRXJyb3IoXCJJbnRlcm5hbCBYTUxIdHRwUmVxdWVzdCBFcnJvclwiKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIsIHJlc3BvbnNlLCByZXNwb25zZS5ib2R5KVxuICAgIH1cblxuICAgIHZhciB4aHIgPSBvcHRpb25zLnhociB8fCBudWxsXG5cbiAgICBpZiAoIXhocikge1xuICAgICAgICBpZiAob3B0aW9ucy5jb3JzIHx8IG9wdGlvbnMudXNlWERSKSB7XG4gICAgICAgICAgICB4aHIgPSBuZXcgY3JlYXRlWEhSLlhEb21haW5SZXF1ZXN0KClcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB4aHIgPSBuZXcgY3JlYXRlWEhSLlhNTEh0dHBSZXF1ZXN0KClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBrZXlcbiAgICB2YXIgYWJvcnRlZFxuICAgIHZhciB1cmkgPSB4aHIudXJsID0gb3B0aW9ucy51cmkgfHwgb3B0aW9ucy51cmxcbiAgICB2YXIgbWV0aG9kID0geGhyLm1ldGhvZCA9IG9wdGlvbnMubWV0aG9kIHx8IFwiR0VUXCJcbiAgICB2YXIgYm9keSA9IG9wdGlvbnMuYm9keSB8fCBvcHRpb25zLmRhdGFcbiAgICB2YXIgaGVhZGVycyA9IHhoci5oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzIHx8IHt9XG4gICAgdmFyIHN5bmMgPSAhIW9wdGlvbnMuc3luY1xuICAgIHZhciBpc0pzb24gPSBmYWxzZVxuICAgIHZhciB0aW1lb3V0VGltZXJcbiAgICB2YXIgZmFpbHVyZVJlc3BvbnNlID0ge1xuICAgICAgICBib2R5OiB1bmRlZmluZWQsXG4gICAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgICBzdGF0dXNDb2RlOiAwLFxuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgdXJsOiB1cmksXG4gICAgICAgIHJhd1JlcXVlc3Q6IHhoclxuICAgIH1cblxuICAgIGlmIChcImpzb25cIiBpbiBvcHRpb25zICYmIG9wdGlvbnMuanNvbiAhPT0gZmFsc2UpIHtcbiAgICAgICAgaXNKc29uID0gdHJ1ZVxuICAgICAgICBoZWFkZXJzW1wiYWNjZXB0XCJdIHx8IGhlYWRlcnNbXCJBY2NlcHRcIl0gfHwgKGhlYWRlcnNbXCJBY2NlcHRcIl0gPSBcImFwcGxpY2F0aW9uL2pzb25cIikgLy9Eb24ndCBvdmVycmlkZSBleGlzdGluZyBhY2NlcHQgaGVhZGVyIGRlY2xhcmVkIGJ5IHVzZXJcbiAgICAgICAgaWYgKG1ldGhvZCAhPT0gXCJHRVRcIiAmJiBtZXRob2QgIT09IFwiSEVBRFwiKSB7XG4gICAgICAgICAgICBoZWFkZXJzW1wiY29udGVudC10eXBlXCJdIHx8IGhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gfHwgKGhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gPSBcImFwcGxpY2F0aW9uL2pzb25cIikgLy9Eb24ndCBvdmVycmlkZSBleGlzdGluZyBhY2NlcHQgaGVhZGVyIGRlY2xhcmVkIGJ5IHVzZXJcbiAgICAgICAgICAgIGJvZHkgPSBKU09OLnN0cmluZ2lmeShvcHRpb25zLmpzb24gPT09IHRydWUgPyBib2R5IDogb3B0aW9ucy5qc29uKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IHJlYWR5c3RhdGVjaGFuZ2VcbiAgICB4aHIub25sb2FkID0gbG9hZEZ1bmNcbiAgICB4aHIub25lcnJvciA9IGVycm9yRnVuY1xuICAgIC8vIElFOSBtdXN0IGhhdmUgb25wcm9ncmVzcyBiZSBzZXQgdG8gYSB1bmlxdWUgZnVuY3Rpb24uXG4gICAgeGhyLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIElFIG11c3QgZGllXG4gICAgfVxuICAgIHhoci5vbmFib3J0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgYWJvcnRlZCA9IHRydWU7XG4gICAgfVxuICAgIHhoci5vbnRpbWVvdXQgPSBlcnJvckZ1bmNcbiAgICB4aHIub3BlbihtZXRob2QsIHVyaSwgIXN5bmMsIG9wdGlvbnMudXNlcm5hbWUsIG9wdGlvbnMucGFzc3dvcmQpXG4gICAgLy9oYXMgdG8gYmUgYWZ0ZXIgb3BlblxuICAgIGlmKCFzeW5jKSB7XG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSAhIW9wdGlvbnMud2l0aENyZWRlbnRpYWxzXG4gICAgfVxuICAgIC8vIENhbm5vdCBzZXQgdGltZW91dCB3aXRoIHN5bmMgcmVxdWVzdFxuICAgIC8vIG5vdCBzZXR0aW5nIHRpbWVvdXQgb24gdGhlIHhociBvYmplY3QsIGJlY2F1c2Ugb2Ygb2xkIHdlYmtpdHMgZXRjLiBub3QgaGFuZGxpbmcgdGhhdCBjb3JyZWN0bHlcbiAgICAvLyBib3RoIG5wbSdzIHJlcXVlc3QgYW5kIGpxdWVyeSAxLnggdXNlIHRoaXMga2luZCBvZiB0aW1lb3V0LCBzbyB0aGlzIGlzIGJlaW5nIGNvbnNpc3RlbnRcbiAgICBpZiAoIXN5bmMgJiYgb3B0aW9ucy50aW1lb3V0ID4gMCApIHtcbiAgICAgICAgdGltZW91dFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYgKGFib3J0ZWQpIHJldHVyblxuICAgICAgICAgICAgYWJvcnRlZCA9IHRydWUvL0lFOSBtYXkgc3RpbGwgY2FsbCByZWFkeXN0YXRlY2hhbmdlXG4gICAgICAgICAgICB4aHIuYWJvcnQoXCJ0aW1lb3V0XCIpXG4gICAgICAgICAgICB2YXIgZSA9IG5ldyBFcnJvcihcIlhNTEh0dHBSZXF1ZXN0IHRpbWVvdXRcIilcbiAgICAgICAgICAgIGUuY29kZSA9IFwiRVRJTUVET1VUXCJcbiAgICAgICAgICAgIGVycm9yRnVuYyhlKVxuICAgICAgICB9LCBvcHRpb25zLnRpbWVvdXQgKVxuICAgIH1cblxuICAgIGlmICh4aHIuc2V0UmVxdWVzdEhlYWRlcikge1xuICAgICAgICBmb3Ioa2V5IGluIGhlYWRlcnMpe1xuICAgICAgICAgICAgaWYoaGVhZGVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKXtcbiAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihrZXksIGhlYWRlcnNba2V5XSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5oZWFkZXJzICYmICFpc0VtcHR5KG9wdGlvbnMuaGVhZGVycykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSGVhZGVycyBjYW5ub3QgYmUgc2V0IG9uIGFuIFhEb21haW5SZXF1ZXN0IG9iamVjdFwiKVxuICAgIH1cblxuICAgIGlmIChcInJlc3BvbnNlVHlwZVwiIGluIG9wdGlvbnMpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMucmVzcG9uc2VUeXBlXG4gICAgfVxuXG4gICAgaWYgKFwiYmVmb3JlU2VuZFwiIGluIG9wdGlvbnMgJiZcbiAgICAgICAgdHlwZW9mIG9wdGlvbnMuYmVmb3JlU2VuZCA9PT0gXCJmdW5jdGlvblwiXG4gICAgKSB7XG4gICAgICAgIG9wdGlvbnMuYmVmb3JlU2VuZCh4aHIpXG4gICAgfVxuXG4gICAgLy8gTWljcm9zb2Z0IEVkZ2UgYnJvd3NlciBzZW5kcyBcInVuZGVmaW5lZFwiIHdoZW4gc2VuZCBpcyBjYWxsZWQgd2l0aCB1bmRlZmluZWQgdmFsdWUuXG4gICAgLy8gWE1MSHR0cFJlcXVlc3Qgc3BlYyBzYXlzIHRvIHBhc3MgbnVsbCBhcyBib2R5IHRvIGluZGljYXRlIG5vIGJvZHlcbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL25hdWd0dXIveGhyL2lzc3Vlcy8xMDAuXG4gICAgeGhyLnNlbmQoYm9keSB8fCBudWxsKVxuXG4gICAgcmV0dXJuIHhoclxuXG5cbn1cblxuZnVuY3Rpb24gZ2V0WG1sKHhocikge1xuICAgIC8vIHhoci5yZXNwb25zZVhNTCB3aWxsIHRocm93IEV4Y2VwdGlvbiBcIkludmFsaWRTdGF0ZUVycm9yXCIgb3IgXCJET01FeGNlcHRpb25cIlxuICAgIC8vIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvWE1MSHR0cFJlcXVlc3QvcmVzcG9uc2VYTUwuXG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHhoci5yZXNwb25zZVR5cGUgPT09IFwiZG9jdW1lbnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIHhoci5yZXNwb25zZVhNTFxuICAgICAgICB9XG4gICAgICAgIHZhciBmaXJlZm94QnVnVGFrZW5FZmZlY3QgPSB4aHIucmVzcG9uc2VYTUwgJiYgeGhyLnJlc3BvbnNlWE1MLmRvY3VtZW50RWxlbWVudC5ub2RlTmFtZSA9PT0gXCJwYXJzZXJlcnJvclwiXG4gICAgICAgIGlmICh4aHIucmVzcG9uc2VUeXBlID09PSBcIlwiICYmICFmaXJlZm94QnVnVGFrZW5FZmZlY3QpIHtcbiAgICAgICAgICAgIHJldHVybiB4aHIucmVzcG9uc2VYTUxcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICByZXR1cm4gbnVsbFxufVxuXG5mdW5jdGlvbiBub29wKCkge31cbiIsIm1vZHVsZS5leHBvcnRzID0gZ2V0UmVzcG9uc2VcbmZ1bmN0aW9uIGdldFJlc3BvbnNlIChvcHQsIHJlc3ApIHtcbiAgaWYgKCFyZXNwKSByZXR1cm4gbnVsbFxuICByZXR1cm4ge1xuICAgIHN0YXR1c0NvZGU6IHJlc3Auc3RhdHVzQ29kZSxcbiAgICBoZWFkZXJzOiByZXNwLmhlYWRlcnMsXG4gICAgbWV0aG9kOiBvcHQubWV0aG9kLFxuICAgIHVybDogb3B0LnVybCxcbiAgICAvLyB0aGUgWEhSIG9iamVjdCBpbiBicm93c2VyLCBodHRwIHJlc3BvbnNlIGluIE5vZGVcbiAgICByYXdSZXF1ZXN0OiByZXNwLnJhd1JlcXVlc3QgPyByZXNwLnJhd1JlcXVlc3QgOiByZXNwXG4gIH1cbn1cbiIsInZhciByZXF1ZXN0ID0gcmVxdWlyZSgneGhyLXJlcXVlc3QnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICByZXF1ZXN0KHVybCwgb3B0aW9ucywgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xuICAgICAgaWYgKGVycikgcmVqZWN0KGVycik7XG4gICAgICBlbHNlIHJlc29sdmUoZGF0YSk7XG4gICAgfSk7XG4gIH0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgfVxuICAgIHJldHVybiB0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XG52YXIgaHR0cHMgPSByZXF1aXJlKFwiaHR0cHNcIik7XG52YXIgb3MgPSByZXF1aXJlKFwib3NcIik7XG52YXIgdXJsID0gcmVxdWlyZShcInVybFwiKTtcbnZhciBwcm9ncmVzc19ldmVudF8xID0gcmVxdWlyZShcIi4vcHJvZ3Jlc3MtZXZlbnRcIik7XG52YXIgZXJyb3JzXzEgPSByZXF1aXJlKFwiLi9lcnJvcnNcIik7XG52YXIgeG1sX2h0dHBfcmVxdWVzdF9ldmVudF90YXJnZXRfMSA9IHJlcXVpcmUoXCIuL3htbC1odHRwLXJlcXVlc3QtZXZlbnQtdGFyZ2V0XCIpO1xudmFyIHhtbF9odHRwX3JlcXVlc3RfdXBsb2FkXzEgPSByZXF1aXJlKFwiLi94bWwtaHR0cC1yZXF1ZXN0LXVwbG9hZFwiKTtcbnZhciBDb29raWUgPSByZXF1aXJlKFwiY29va2llamFyXCIpO1xudmFyIFhNTEh0dHBSZXF1ZXN0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhYTUxIdHRwUmVxdWVzdCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBYTUxIdHRwUmVxdWVzdChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLlVOU0VOVCA9IFhNTEh0dHBSZXF1ZXN0LlVOU0VOVDtcbiAgICAgICAgX3RoaXMuT1BFTkVEID0gWE1MSHR0cFJlcXVlc3QuT1BFTkVEO1xuICAgICAgICBfdGhpcy5IRUFERVJTX1JFQ0VJVkVEID0gWE1MSHR0cFJlcXVlc3QuSEVBREVSU19SRUNFSVZFRDtcbiAgICAgICAgX3RoaXMuTE9BRElORyA9IFhNTEh0dHBSZXF1ZXN0LkxPQURJTkc7XG4gICAgICAgIF90aGlzLkRPTkUgPSBYTUxIdHRwUmVxdWVzdC5ET05FO1xuICAgICAgICBfdGhpcy5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgICAgICBfdGhpcy5yZWFkeVN0YXRlID0gWE1MSHR0cFJlcXVlc3QuVU5TRU5UO1xuICAgICAgICBfdGhpcy5yZXNwb25zZSA9IG51bGw7XG4gICAgICAgIF90aGlzLnJlc3BvbnNlVGV4dCA9ICcnO1xuICAgICAgICBfdGhpcy5yZXNwb25zZVR5cGUgPSAnJztcbiAgICAgICAgX3RoaXMuc3RhdHVzID0gMDsgLy8gVE9ETzogVU5TRU5UP1xuICAgICAgICBfdGhpcy5zdGF0dXNUZXh0ID0gJyc7XG4gICAgICAgIF90aGlzLnRpbWVvdXQgPSAwO1xuICAgICAgICBfdGhpcy51cGxvYWQgPSBuZXcgeG1sX2h0dHBfcmVxdWVzdF91cGxvYWRfMS5YTUxIdHRwUmVxdWVzdFVwbG9hZCgpO1xuICAgICAgICBfdGhpcy5yZXNwb25zZVVybCA9ICcnO1xuICAgICAgICBfdGhpcy53aXRoQ3JlZGVudGlhbHMgPSBmYWxzZTtcbiAgICAgICAgX3RoaXMuX21ldGhvZCA9IG51bGw7XG4gICAgICAgIF90aGlzLl91cmwgPSBudWxsO1xuICAgICAgICBfdGhpcy5fc3luYyA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5faGVhZGVycyA9IHt9O1xuICAgICAgICBfdGhpcy5fbG93ZXJlZEhlYWRlcnMgPSB7fTtcbiAgICAgICAgX3RoaXMuX21pbWVPdmVycmlkZSA9IG51bGw7IC8vIFRPRE86IGlzIHR5cGUgcmlnaHQ/XG4gICAgICAgIF90aGlzLl9yZXF1ZXN0ID0gbnVsbDtcbiAgICAgICAgX3RoaXMuX3Jlc3BvbnNlID0gbnVsbDtcbiAgICAgICAgX3RoaXMuX3Jlc3BvbnNlUGFydHMgPSBudWxsO1xuICAgICAgICBfdGhpcy5fcmVzcG9uc2VIZWFkZXJzID0gbnVsbDtcbiAgICAgICAgX3RoaXMuX2Fib3J0aW5nID0gbnVsbDsgLy8gVE9ETzogdHlwZT9cbiAgICAgICAgX3RoaXMuX2Vycm9yID0gbnVsbDsgLy8gVE9ETzogdHlwZT9cbiAgICAgICAgX3RoaXMuX2xvYWRlZEJ5dGVzID0gMDtcbiAgICAgICAgX3RoaXMuX3RvdGFsQnl0ZXMgPSAwO1xuICAgICAgICBfdGhpcy5fbGVuZ3RoQ29tcHV0YWJsZSA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5fcmVzdHJpY3RlZE1ldGhvZHMgPSB7IENPTk5FQ1Q6IHRydWUsIFRSQUNFOiB0cnVlLCBUUkFDSzogdHJ1ZSB9O1xuICAgICAgICBfdGhpcy5fcmVzdHJpY3RlZEhlYWRlcnMgPSB7XG4gICAgICAgICAgICAnYWNjZXB0LWNoYXJzZXQnOiB0cnVlLFxuICAgICAgICAgICAgJ2FjY2VwdC1lbmNvZGluZyc6IHRydWUsXG4gICAgICAgICAgICAnYWNjZXNzLWNvbnRyb2wtcmVxdWVzdC1oZWFkZXJzJzogdHJ1ZSxcbiAgICAgICAgICAgICdhY2Nlc3MtY29udHJvbC1yZXF1ZXN0LW1ldGhvZCc6IHRydWUsXG4gICAgICAgICAgICBjb25uZWN0aW9uOiB0cnVlLFxuICAgICAgICAgICAgJ2NvbnRlbnQtbGVuZ3RoJzogdHJ1ZSxcbiAgICAgICAgICAgIGNvb2tpZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvb2tpZTI6IHRydWUsXG4gICAgICAgICAgICBkYXRlOiB0cnVlLFxuICAgICAgICAgICAgZG50OiB0cnVlLFxuICAgICAgICAgICAgZXhwZWN0OiB0cnVlLFxuICAgICAgICAgICAgaG9zdDogdHJ1ZSxcbiAgICAgICAgICAgICdrZWVwLWFsaXZlJzogdHJ1ZSxcbiAgICAgICAgICAgIG9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICAgIHJlZmVyZXI6IHRydWUsXG4gICAgICAgICAgICB0ZTogdHJ1ZSxcbiAgICAgICAgICAgIHRyYWlsZXI6IHRydWUsXG4gICAgICAgICAgICAndHJhbnNmZXItZW5jb2RpbmcnOiB0cnVlLFxuICAgICAgICAgICAgdXBncmFkZTogdHJ1ZSxcbiAgICAgICAgICAgICd1c2VyLWFnZW50JzogdHJ1ZSxcbiAgICAgICAgICAgIHZpYTogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICBfdGhpcy5fcHJpdmF0ZUhlYWRlcnMgPSB7ICdzZXQtY29va2llJzogdHJ1ZSwgJ3NldC1jb29raWUyJzogdHJ1ZSB9O1xuICAgICAgICBfdGhpcy5fdXNlckFnZW50ID0gXCJNb3ppbGxhLzUuMCAoXCIgKyBvcy50eXBlKCkgKyBcIiBcIiArIG9zLmFyY2goKSArIFwiKSBub2RlLmpzL1wiICsgcHJvY2Vzcy52ZXJzaW9ucy5ub2RlICsgXCIgdjgvXCIgKyBwcm9jZXNzLnZlcnNpb25zLnY4O1xuICAgICAgICBfdGhpcy5fYW5vbnltb3VzID0gb3B0aW9ucy5hbm9uIHx8IGZhbHNlO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKG1ldGhvZCwgdXJsLCBhc3luYywgdXNlciwgcGFzc3dvcmQpIHtcbiAgICAgICAgaWYgKGFzeW5jID09PSB2b2lkIDApIHsgYXN5bmMgPSB0cnVlOyB9XG4gICAgICAgIG1ldGhvZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBpZiAodGhpcy5fcmVzdHJpY3RlZE1ldGhvZHNbbWV0aG9kXSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFhNTEh0dHBSZXF1ZXN0LlNlY3VyaXR5RXJyb3IoXCJIVFRQIG1ldGhvZCBcIiArIG1ldGhvZCArIFwiIGlzIG5vdCBhbGxvd2VkIGluIFhIUlwiKTtcbiAgICAgICAgfVxuICAgICAgICA7XG4gICAgICAgIHZhciB4aHJVcmwgPSB0aGlzLl9wYXJzZVVybCh1cmwsIHVzZXIsIHBhc3N3b3JkKTtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gWE1MSHR0cFJlcXVlc3QuSEVBREVSU19SRUNFSVZFRCB8fCB0aGlzLnJlYWR5U3RhdGUgPT09IFhNTEh0dHBSZXF1ZXN0LkxPQURJTkcpIHtcbiAgICAgICAgICAgIC8vIFRPRE8ocHduYWxsKTogdGVybWluYXRlIGFib3J0KCksIHRlcm1pbmF0ZSBzZW5kKClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tZXRob2QgPSBtZXRob2Q7XG4gICAgICAgIHRoaXMuX3VybCA9IHhoclVybDtcbiAgICAgICAgdGhpcy5fc3luYyA9ICFhc3luYztcbiAgICAgICAgdGhpcy5faGVhZGVycyA9IHt9O1xuICAgICAgICB0aGlzLl9sb3dlcmVkSGVhZGVycyA9IHt9O1xuICAgICAgICB0aGlzLl9taW1lT3ZlcnJpZGUgPSBudWxsO1xuICAgICAgICB0aGlzLl9zZXRSZWFkeVN0YXRlKFhNTEh0dHBSZXF1ZXN0Lk9QRU5FRCk7XG4gICAgICAgIHRoaXMuX3JlcXVlc3QgPSBudWxsO1xuICAgICAgICB0aGlzLl9yZXNwb25zZSA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gMDtcbiAgICAgICAgdGhpcy5zdGF0dXNUZXh0ID0gJyc7XG4gICAgICAgIHRoaXMuX3Jlc3BvbnNlUGFydHMgPSBbXTtcbiAgICAgICAgdGhpcy5fcmVzcG9uc2VIZWFkZXJzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbG9hZGVkQnl0ZXMgPSAwO1xuICAgICAgICB0aGlzLl90b3RhbEJ5dGVzID0gMDtcbiAgICAgICAgdGhpcy5fbGVuZ3RoQ29tcHV0YWJsZSA9IGZhbHNlO1xuICAgIH07XG4gICAgWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLnNldFJlcXVlc3RIZWFkZXIgPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSAhPT0gWE1MSHR0cFJlcXVlc3QuT1BFTkVEKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgWE1MSHR0cFJlcXVlc3QuSW52YWxpZFN0YXRlRXJyb3IoJ1hIUiByZWFkeVN0YXRlIG11c3QgYmUgT1BFTkVEJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxvd2VyZWROYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAodGhpcy5fcmVzdHJpY3RlZEhlYWRlcnNbbG93ZXJlZE5hbWVdIHx8IC9ec2VjLS8udGVzdChsb3dlcmVkTmFtZSkgfHwgL15wcm94eS0vLnRlc3QobG93ZXJlZE5hbWUpKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJSZWZ1c2VkIHRvIHNldCB1bnNhZmUgaGVhZGVyIFxcXCJcIiArIG5hbWUgKyBcIlxcXCJcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgICBpZiAodGhpcy5fbG93ZXJlZEhlYWRlcnNbbG93ZXJlZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIG5hbWUgPSB0aGlzLl9sb3dlcmVkSGVhZGVyc1tsb3dlcmVkTmFtZV07XG4gICAgICAgICAgICB0aGlzLl9oZWFkZXJzW25hbWVdID0gdGhpcy5faGVhZGVyc1tuYW1lXSArIFwiLCBcIiArIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbG93ZXJlZEhlYWRlcnNbbG93ZXJlZE5hbWVdID0gbmFtZTtcbiAgICAgICAgICAgIHRoaXMuX2hlYWRlcnNbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlICE9PSBYTUxIdHRwUmVxdWVzdC5PUEVORUQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBYTUxIdHRwUmVxdWVzdC5JbnZhbGlkU3RhdGVFcnJvcignWEhSIHJlYWR5U3RhdGUgbXVzdCBiZSBPUEVORUQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fcmVxdWVzdCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFhNTEh0dHBSZXF1ZXN0LkludmFsaWRTdGF0ZUVycm9yKCdzZW5kKCkgYWxyZWFkeSBjYWxsZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKHRoaXMuX3VybC5wcm90b2NvbCkge1xuICAgICAgICAgICAgY2FzZSAnZmlsZTonOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZW5kRmlsZShkYXRhKTtcbiAgICAgICAgICAgIGNhc2UgJ2h0dHA6JzpcbiAgICAgICAgICAgIGNhc2UgJ2h0dHBzOic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlbmRIdHRwKGRhdGEpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgWE1MSHR0cFJlcXVlc3QuTmV0d29ya0Vycm9yKFwiVW5zdXBwb3J0ZWQgcHJvdG9jb2wgXCIgKyB0aGlzLl91cmwucHJvdG9jb2wpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9yZXF1ZXN0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHRoaXMuX3NldEVycm9yKCk7XG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoUHJvZ3Jlc3MoJ2Fib3J0Jyk7XG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoUHJvZ3Jlc3MoJ2xvYWRlbmQnKTtcbiAgICB9O1xuICAgIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5nZXRSZXNwb25zZUhlYWRlciA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIGlmICh0aGlzLl9yZXNwb25zZUhlYWRlcnMgPT0gbnVsbCB8fCBuYW1lID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsb3dlcmVkTmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3BvbnNlSGVhZGVycy5oYXNPd25Qcm9wZXJ0eShsb3dlcmVkTmFtZSlcbiAgICAgICAgICAgID8gdGhpcy5fcmVzcG9uc2VIZWFkZXJzW25hbWUudG9Mb3dlckNhc2UoKV1cbiAgICAgICAgICAgIDogbnVsbDtcbiAgICB9O1xuICAgIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5nZXRBbGxSZXNwb25zZUhlYWRlcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLl9yZXNwb25zZUhlYWRlcnMgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9yZXNwb25zZUhlYWRlcnMpLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBrZXkgKyBcIjogXCIgKyBfdGhpcy5fcmVzcG9uc2VIZWFkZXJzW2tleV07IH0pLmpvaW4oJ1xcclxcbicpO1xuICAgIH07XG4gICAgWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLm92ZXJyaWRlTWltZVR5cGUgPSBmdW5jdGlvbiAobWltZVR5cGUpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gWE1MSHR0cFJlcXVlc3QuTE9BRElORyB8fCB0aGlzLnJlYWR5U3RhdGUgPT09IFhNTEh0dHBSZXF1ZXN0LkRPTkUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBYTUxIdHRwUmVxdWVzdC5JbnZhbGlkU3RhdGVFcnJvcignb3ZlcnJpZGVNaW1lVHlwZSgpIG5vdCBhbGxvd2VkIGluIExPQURJTkcgb3IgRE9ORScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21pbWVPdmVycmlkZSA9IG1pbWVUeXBlLnRvTG93ZXJDYXNlKCk7XG4gICAgfTtcbiAgICBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUubm9kZWpzU2V0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5ub2RlanNIdHRwQWdlbnQgPSBvcHRpb25zLmh0dHBBZ2VudCB8fCB0aGlzLm5vZGVqc0h0dHBBZ2VudDtcbiAgICAgICAgdGhpcy5ub2RlanNIdHRwc0FnZW50ID0gb3B0aW9ucy5odHRwc0FnZW50IHx8IHRoaXMubm9kZWpzSHR0cHNBZ2VudDtcbiAgICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2Jhc2VVcmwnKSkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuYmFzZVVybCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcnNlZFVybCA9IHVybC5wYXJzZShvcHRpb25zLmJhc2VVcmwsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBpZiAoIXBhcnNlZFVybC5wcm90b2NvbCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgWE1MSHR0cFJlcXVlc3QuU3ludGF4RXJyb3IoXCJiYXNlVXJsIG11c3QgYmUgYW4gYWJzb2x1dGUgVVJMXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubm9kZWpzQmFzZVVybCA9IG9wdGlvbnMuYmFzZVVybDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgWE1MSHR0cFJlcXVlc3Qubm9kZWpzU2V0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLm5vZGVqc1NldChvcHRpb25zKTtcbiAgICB9O1xuICAgIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5fc2V0UmVhZHlTdGF0ZSA9IGZ1bmN0aW9uIChyZWFkeVN0YXRlKSB7XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IHJlYWR5U3RhdGU7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgcHJvZ3Jlc3NfZXZlbnRfMS5Qcm9ncmVzc0V2ZW50KCdyZWFkeXN0YXRlY2hhbmdlJykpO1xuICAgIH07XG4gICAgWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLl9zZW5kRmlsZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm90b2NvbCBmaWxlOiBub3QgaW1wbGVtZW50ZWQnKTtcbiAgICB9O1xuICAgIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5fc2VuZEh0dHAgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAodGhpcy5fc3luYykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTeW5jaHJvbm91cyBYSFIgcHJvY2Vzc2luZyBub3QgaW1wbGVtZW50ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YSAmJiAodGhpcy5fbWV0aG9kID09PSAnR0VUJyB8fCB0aGlzLl9tZXRob2QgPT09ICdIRUFEJykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkRpc2NhcmRpbmcgZW50aXR5IGJvZHkgZm9yIFwiICsgdGhpcy5fbWV0aG9kICsgXCIgcmVxdWVzdHNcIik7XG4gICAgICAgICAgICBkYXRhID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhIHx8ICcnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBsb2FkLl9zZXREYXRhKGRhdGEpO1xuICAgICAgICB0aGlzLl9maW5hbGl6ZUhlYWRlcnMoKTtcbiAgICAgICAgdGhpcy5fc2VuZEh4eHBSZXF1ZXN0KCk7XG4gICAgfTtcbiAgICBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuX3NlbmRIeHhwUmVxdWVzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICAgICAgICB2YXIgY29va2llID0gWE1MSHR0cFJlcXVlc3QuY29va2llSmFyXG4gICAgICAgICAgICAgICAgLmdldENvb2tpZXMoQ29va2llLkNvb2tpZUFjY2Vzc0luZm8odGhpcy5fdXJsLmhvc3RuYW1lLCB0aGlzLl91cmwucGF0aG5hbWUsIHRoaXMuX3VybC5wcm90b2NvbCA9PT0gJ2h0dHBzOicpKS50b1ZhbHVlU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLl9oZWFkZXJzLmNvb2tpZSA9IHRoaXMuX2hlYWRlcnMuY29va2llMiA9IGNvb2tpZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX2EgPSB0aGlzLl91cmwucHJvdG9jb2wgPT09ICdodHRwOicgPyBbaHR0cCwgdGhpcy5ub2RlanNIdHRwQWdlbnRdIDogW2h0dHBzLCB0aGlzLm5vZGVqc0h0dHBzQWdlbnRdLCBoeHhwID0gX2FbMF0sIGFnZW50ID0gX2FbMV07XG4gICAgICAgIHZhciByZXF1ZXN0TWV0aG9kID0gaHh4cC5yZXF1ZXN0LmJpbmQoaHh4cCk7XG4gICAgICAgIHZhciByZXF1ZXN0ID0gcmVxdWVzdE1ldGhvZCh7XG4gICAgICAgICAgICBob3N0bmFtZTogdGhpcy5fdXJsLmhvc3RuYW1lLFxuICAgICAgICAgICAgcG9ydDogK3RoaXMuX3VybC5wb3J0LFxuICAgICAgICAgICAgcGF0aDogdGhpcy5fdXJsLnBhdGgsXG4gICAgICAgICAgICBhdXRoOiB0aGlzLl91cmwuYXV0aCxcbiAgICAgICAgICAgIG1ldGhvZDogdGhpcy5fbWV0aG9kLFxuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgICAgICAgIGFnZW50OiBhZ2VudFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fcmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIGlmICh0aGlzLnRpbWVvdXQpIHtcbiAgICAgICAgICAgIHJlcXVlc3Quc2V0VGltZW91dCh0aGlzLnRpbWVvdXQsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLl9vbkh0dHBUaW1lb3V0KHJlcXVlc3QpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0Lm9uKCdyZXNwb25zZScsIGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4gX3RoaXMuX29uSHR0cFJlc3BvbnNlKHJlcXVlc3QsIHJlc3BvbnNlKTsgfSk7XG4gICAgICAgIHJlcXVlc3Qub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycm9yKSB7IHJldHVybiBfdGhpcy5fb25IdHRwUmVxdWVzdEVycm9yKHJlcXVlc3QsIGVycm9yKTsgfSk7XG4gICAgICAgIHRoaXMudXBsb2FkLl9zdGFydFVwbG9hZChyZXF1ZXN0KTtcbiAgICAgICAgaWYgKHRoaXMuX3JlcXVlc3QgPT09IHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoUHJvZ3Jlc3MoJ2xvYWRzdGFydCcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuX2ZpbmFsaXplSGVhZGVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5faGVhZGVycyA9IF9fYXNzaWduKHt9LCB0aGlzLl9oZWFkZXJzLCB7IENvbm5lY3Rpb246ICdrZWVwLWFsaXZlJywgSG9zdDogdGhpcy5fdXJsLmhvc3QsICdVc2VyLUFnZW50JzogdGhpcy5fdXNlckFnZW50IH0sIHRoaXMuX2Fub255bW91cyA/IHsgUmVmZXJlcjogJ2Fib3V0OmJsYW5rJyB9IDoge30pO1xuICAgICAgICB0aGlzLnVwbG9hZC5fZmluYWxpemVIZWFkZXJzKHRoaXMuX2hlYWRlcnMsIHRoaXMuX2xvd2VyZWRIZWFkZXJzKTtcbiAgICB9O1xuICAgIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5fb25IdHRwUmVzcG9uc2UgPSBmdW5jdGlvbiAocmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuX3JlcXVlc3QgIT09IHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy53aXRoQ3JlZGVudGlhbHMgJiYgKHJlc3BvbnNlLmhlYWRlcnNbJ3NldC1jb29raWUnXSB8fCByZXNwb25zZS5oZWFkZXJzWydzZXQtY29va2llMiddKSkge1xuICAgICAgICAgICAgWE1MSHR0cFJlcXVlc3QuY29va2llSmFyXG4gICAgICAgICAgICAgICAgLnNldENvb2tpZXMocmVzcG9uc2UuaGVhZGVyc1snc2V0LWNvb2tpZSddIHx8IHJlc3BvbnNlLmhlYWRlcnNbJ3NldC1jb29raWUyJ10pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChbMzAxLCAzMDIsIDMwMywgMzA3LCAzMDhdLmluZGV4T2YocmVzcG9uc2Uuc3RhdHVzQ29kZSkgPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5fdXJsID0gdGhpcy5fcGFyc2VVcmwocmVzcG9uc2UuaGVhZGVycy5sb2NhdGlvbik7XG4gICAgICAgICAgICB0aGlzLl9tZXRob2QgPSAnR0VUJztcbiAgICAgICAgICAgIGlmICh0aGlzLl9sb3dlcmVkSGVhZGVyc1snY29udGVudC10eXBlJ10pIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5faGVhZGVyc1t0aGlzLl9sb3dlcmVkSGVhZGVyc1snY29udGVudC10eXBlJ11dO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9sb3dlcmVkSGVhZGVyc1snY29udGVudC10eXBlJ107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5faGVhZGVyc1snQ29udGVudC1UeXBlJ10gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9oZWFkZXJzWydDb250ZW50LVR5cGUnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9oZWFkZXJzWydDb250ZW50LUxlbmd0aCddO1xuICAgICAgICAgICAgdGhpcy51cGxvYWQuX3Jlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLl9maW5hbGl6ZUhlYWRlcnMoKTtcbiAgICAgICAgICAgIHRoaXMuX3NlbmRIeHhwUmVxdWVzdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Jlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgICAgIHRoaXMuX3Jlc3BvbnNlLm9uKCdkYXRhJywgZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIF90aGlzLl9vbkh0dHBSZXNwb25zZURhdGEocmVzcG9uc2UsIGRhdGEpOyB9KTtcbiAgICAgICAgdGhpcy5fcmVzcG9uc2Uub24oJ2VuZCcsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLl9vbkh0dHBSZXNwb25zZUVuZChyZXNwb25zZSk7IH0pO1xuICAgICAgICB0aGlzLl9yZXNwb25zZS5vbignY2xvc2UnLCBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5fb25IdHRwUmVzcG9uc2VDbG9zZShyZXNwb25zZSk7IH0pO1xuICAgICAgICB0aGlzLnJlc3BvbnNlVXJsID0gdGhpcy5fdXJsLmhyZWYuc3BsaXQoJyMnKVswXTtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXNDb2RlO1xuICAgICAgICB0aGlzLnN0YXR1c1RleHQgPSBodHRwLlNUQVRVU19DT0RFU1t0aGlzLnN0YXR1c107XG4gICAgICAgIHRoaXMuX3BhcnNlUmVzcG9uc2VIZWFkZXJzKHJlc3BvbnNlKTtcbiAgICAgICAgdmFyIGxlbmd0aFN0cmluZyA9IHRoaXMuX3Jlc3BvbnNlSGVhZGVyc1snY29udGVudC1sZW5ndGgnXSB8fCAnJztcbiAgICAgICAgdGhpcy5fdG90YWxCeXRlcyA9ICtsZW5ndGhTdHJpbmc7XG4gICAgICAgIHRoaXMuX2xlbmd0aENvbXB1dGFibGUgPSAhIWxlbmd0aFN0cmluZztcbiAgICAgICAgdGhpcy5fc2V0UmVhZHlTdGF0ZShYTUxIdHRwUmVxdWVzdC5IRUFERVJTX1JFQ0VJVkVEKTtcbiAgICB9O1xuICAgIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5fb25IdHRwUmVzcG9uc2VEYXRhID0gZnVuY3Rpb24gKHJlc3BvbnNlLCBkYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLl9yZXNwb25zZSAhPT0gcmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZXNwb25zZVBhcnRzLnB1c2gobmV3IEJ1ZmZlcihkYXRhKSk7XG4gICAgICAgIHRoaXMuX2xvYWRlZEJ5dGVzICs9IGRhdGEubGVuZ3RoO1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlICE9PSBYTUxIdHRwUmVxdWVzdC5MT0FESU5HKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXRSZWFkeVN0YXRlKFhNTEh0dHBSZXF1ZXN0LkxPQURJTkcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoUHJvZ3Jlc3MoJ3Byb2dyZXNzJyk7XG4gICAgfTtcbiAgICBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuX29uSHR0cFJlc3BvbnNlRW5kID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICh0aGlzLl9yZXNwb25zZSAhPT0gcmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wYXJzZVJlc3BvbnNlKCk7XG4gICAgICAgIHRoaXMuX3JlcXVlc3QgPSBudWxsO1xuICAgICAgICB0aGlzLl9yZXNwb25zZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX3NldFJlYWR5U3RhdGUoWE1MSHR0cFJlcXVlc3QuRE9ORSk7XG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoUHJvZ3Jlc3MoJ2xvYWQnKTtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2hQcm9ncmVzcygnbG9hZGVuZCcpO1xuICAgIH07XG4gICAgWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLl9vbkh0dHBSZXNwb25zZUNsb3NlID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICh0aGlzLl9yZXNwb25zZSAhPT0gcmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVxdWVzdCA9IHRoaXMuX3JlcXVlc3Q7XG4gICAgICAgIHRoaXMuX3NldEVycm9yKCk7XG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgdGhpcy5fc2V0UmVhZHlTdGF0ZShYTUxIdHRwUmVxdWVzdC5ET05FKTtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2hQcm9ncmVzcygnZXJyb3InKTtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2hQcm9ncmVzcygnbG9hZGVuZCcpO1xuICAgIH07XG4gICAgWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLl9vbkh0dHBUaW1lb3V0ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgaWYgKHRoaXMuX3JlcXVlc3QgIT09IHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zZXRFcnJvcigpO1xuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHRoaXMuX3NldFJlYWR5U3RhdGUoWE1MSHR0cFJlcXVlc3QuRE9ORSk7XG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoUHJvZ3Jlc3MoJ3RpbWVvdXQnKTtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2hQcm9ncmVzcygnbG9hZGVuZCcpO1xuICAgIH07XG4gICAgWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLl9vbkh0dHBSZXF1ZXN0RXJyb3IgPSBmdW5jdGlvbiAocmVxdWVzdCwgZXJyb3IpIHtcbiAgICAgICAgaWYgKHRoaXMuX3JlcXVlc3QgIT09IHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zZXRFcnJvcigpO1xuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHRoaXMuX3NldFJlYWR5U3RhdGUoWE1MSHR0cFJlcXVlc3QuRE9ORSk7XG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoUHJvZ3Jlc3MoJ2Vycm9yJyk7XG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoUHJvZ3Jlc3MoJ2xvYWRlbmQnKTtcbiAgICB9O1xuICAgIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5fZGlzcGF0Y2hQcm9ncmVzcyA9IGZ1bmN0aW9uIChldmVudFR5cGUpIHtcbiAgICAgICAgdmFyIGV2ZW50ID0gbmV3IFhNTEh0dHBSZXF1ZXN0LlByb2dyZXNzRXZlbnQoZXZlbnRUeXBlKTtcbiAgICAgICAgZXZlbnQubGVuZ3RoQ29tcHV0YWJsZSA9IHRoaXMuX2xlbmd0aENvbXB1dGFibGU7XG4gICAgICAgIGV2ZW50LmxvYWRlZCA9IHRoaXMuX2xvYWRlZEJ5dGVzO1xuICAgICAgICBldmVudC50b3RhbCA9IHRoaXMuX3RvdGFsQnl0ZXM7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfTtcbiAgICBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuX3NldEVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9yZXF1ZXN0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcmVzcG9uc2UgPSBudWxsO1xuICAgICAgICB0aGlzLl9yZXNwb25zZUhlYWRlcnMgPSBudWxsO1xuICAgICAgICB0aGlzLl9yZXNwb25zZVBhcnRzID0gbnVsbDtcbiAgICB9O1xuICAgIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5fcGFyc2VVcmwgPSBmdW5jdGlvbiAodXJsU3RyaW5nLCB1c2VyLCBwYXNzd29yZCkge1xuICAgICAgICB2YXIgYWJzb2x1dGVVcmwgPSB0aGlzLm5vZGVqc0Jhc2VVcmwgPT0gbnVsbCA/IHVybFN0cmluZyA6IHVybC5yZXNvbHZlKHRoaXMubm9kZWpzQmFzZVVybCwgdXJsU3RyaW5nKTtcbiAgICAgICAgdmFyIHhoclVybCA9IHVybC5wYXJzZShhYnNvbHV0ZVVybCwgZmFsc2UsIHRydWUpO1xuICAgICAgICB4aHJVcmwuaGFzaCA9IG51bGw7XG4gICAgICAgIHZhciBfYSA9ICh4aHJVcmwuYXV0aCB8fCAnJykuc3BsaXQoJzonKSwgeGhyVXNlciA9IF9hWzBdLCB4aHJQYXNzd29yZCA9IF9hWzFdO1xuICAgICAgICBpZiAoeGhyVXNlciB8fCB4aHJQYXNzd29yZCB8fCB1c2VyIHx8IHBhc3N3b3JkKSB7XG4gICAgICAgICAgICB4aHJVcmwuYXV0aCA9ICh1c2VyIHx8IHhoclVzZXIgfHwgJycpICsgXCI6XCIgKyAocGFzc3dvcmQgfHwgeGhyUGFzc3dvcmQgfHwgJycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4aHJVcmw7XG4gICAgfTtcbiAgICBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuX3BhcnNlUmVzcG9uc2VIZWFkZXJzID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHRoaXMuX3Jlc3BvbnNlSGVhZGVycyA9IHt9O1xuICAgICAgICBmb3IgKHZhciBuYW1lXzEgaW4gcmVzcG9uc2UuaGVhZGVycykge1xuICAgICAgICAgICAgdmFyIGxvd2VyZWROYW1lID0gbmFtZV8xLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5fcHJpdmF0ZUhlYWRlcnNbbG93ZXJlZE5hbWVdKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9yZXNwb25zZUhlYWRlcnNbbG93ZXJlZE5hbWVdID0gcmVzcG9uc2UuaGVhZGVyc1tuYW1lXzFdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9taW1lT3ZlcnJpZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fcmVzcG9uc2VIZWFkZXJzWydjb250ZW50LXR5cGUnXSA9IHRoaXMuX21pbWVPdmVycmlkZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLl9wYXJzZVJlc3BvbnNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYnVmZmVyID0gQnVmZmVyLmNvbmNhdCh0aGlzLl9yZXNwb25zZVBhcnRzKTtcbiAgICAgICAgdGhpcy5fcmVzcG9uc2VQYXJ0cyA9IG51bGw7XG4gICAgICAgIHN3aXRjaCAodGhpcy5yZXNwb25zZVR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2pzb24nOlxuICAgICAgICAgICAgICAgIHRoaXMucmVzcG9uc2VUZXh0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3BvbnNlID0gSlNPTi5wYXJzZShidWZmZXIudG9TdHJpbmcoJ3V0Zi04JykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNwb25zZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgJ2J1ZmZlcic6XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNwb25zZVRleHQgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzcG9uc2UgPSBidWZmZXI7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSAnYXJyYXlidWZmZXInOlxuICAgICAgICAgICAgICAgIHRoaXMucmVzcG9uc2VUZXh0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgYXJyYXlCdWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoYnVmZmVyLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShhcnJheUJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBidWZmZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmlld1tpXSA9IGJ1ZmZlcltpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNwb25zZSA9IGFycmF5QnVmZmVyO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3BvbnNlVGV4dCA9IGJ1ZmZlci50b1N0cmluZyh0aGlzLl9wYXJzZVJlc3BvbnNlRW5jb2RpbmcoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChfYikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3BvbnNlVGV4dCA9IGJ1ZmZlci50b1N0cmluZygnYmluYXJ5Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMucmVzcG9uc2UgPSB0aGlzLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLl9wYXJzZVJlc3BvbnNlRW5jb2RpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAvO1xccypjaGFyc2V0PSguKikkLy5leGVjKHRoaXMuX3Jlc3BvbnNlSGVhZGVyc1snY29udGVudC10eXBlJ10gfHwgJycpWzFdIHx8ICd1dGYtOCc7XG4gICAgfTtcbiAgICBYTUxIdHRwUmVxdWVzdC5Qcm9ncmVzc0V2ZW50ID0gcHJvZ3Jlc3NfZXZlbnRfMS5Qcm9ncmVzc0V2ZW50O1xuICAgIFhNTEh0dHBSZXF1ZXN0LkludmFsaWRTdGF0ZUVycm9yID0gZXJyb3JzXzEuSW52YWxpZFN0YXRlRXJyb3I7XG4gICAgWE1MSHR0cFJlcXVlc3QuTmV0d29ya0Vycm9yID0gZXJyb3JzXzEuTmV0d29ya0Vycm9yO1xuICAgIFhNTEh0dHBSZXF1ZXN0LlNlY3VyaXR5RXJyb3IgPSBlcnJvcnNfMS5TZWN1cml0eUVycm9yO1xuICAgIFhNTEh0dHBSZXF1ZXN0LlN5bnRheEVycm9yID0gZXJyb3JzXzEuU3ludGF4RXJyb3I7XG4gICAgWE1MSHR0cFJlcXVlc3QuWE1MSHR0cFJlcXVlc3RVcGxvYWQgPSB4bWxfaHR0cF9yZXF1ZXN0X3VwbG9hZF8xLlhNTEh0dHBSZXF1ZXN0VXBsb2FkO1xuICAgIFhNTEh0dHBSZXF1ZXN0LlVOU0VOVCA9IDA7XG4gICAgWE1MSHR0cFJlcXVlc3QuT1BFTkVEID0gMTtcbiAgICBYTUxIdHRwUmVxdWVzdC5IRUFERVJTX1JFQ0VJVkVEID0gMjtcbiAgICBYTUxIdHRwUmVxdWVzdC5MT0FESU5HID0gMztcbiAgICBYTUxIdHRwUmVxdWVzdC5ET05FID0gNDtcbiAgICBYTUxIdHRwUmVxdWVzdC5jb29raWVKYXIgPSBDb29raWUuQ29va2llSmFyKCk7XG4gICAgcmV0dXJuIFhNTEh0dHBSZXF1ZXN0O1xufSh4bWxfaHR0cF9yZXF1ZXN0X2V2ZW50X3RhcmdldF8xLlhNTEh0dHBSZXF1ZXN0RXZlbnRUYXJnZXQpKTtcbmV4cG9ydHMuWE1MSHR0cFJlcXVlc3QgPSBYTUxIdHRwUmVxdWVzdDtcblhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5ub2RlanNIdHRwQWdlbnQgPSBodHRwLmdsb2JhbEFnZW50O1xuWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLm5vZGVqc0h0dHBzQWdlbnQgPSBodHRwcy5nbG9iYWxBZ2VudDtcblhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5ub2RlanNCYXNlVXJsID0gbnVsbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXhtbC1odHRwLXJlcXVlc3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB4bWxfaHR0cF9yZXF1ZXN0X2V2ZW50X3RhcmdldF8xID0gcmVxdWlyZShcIi4veG1sLWh0dHAtcmVxdWVzdC1ldmVudC10YXJnZXRcIik7XG52YXIgWE1MSHR0cFJlcXVlc3RVcGxvYWQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFhNTEh0dHBSZXF1ZXN0VXBsb2FkLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFhNTEh0dHBSZXF1ZXN0VXBsb2FkKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5fY29udGVudFR5cGUgPSBudWxsO1xuICAgICAgICBfdGhpcy5fYm9keSA9IG51bGw7XG4gICAgICAgIF90aGlzLl9yZXNldCgpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFhNTEh0dHBSZXF1ZXN0VXBsb2FkLnByb3RvdHlwZS5fcmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2NvbnRlbnRUeXBlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYm9keSA9IG51bGw7XG4gICAgfTtcbiAgICBYTUxIdHRwUmVxdWVzdFVwbG9hZC5wcm90b3R5cGUuX3NldERhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAoZGF0YSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGVudFR5cGUgPSAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2JvZHkgPSBuZXcgQnVmZmVyKGRhdGEsICd1dGYtOCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEJ1ZmZlci5pc0J1ZmZlcihkYXRhKSkge1xuICAgICAgICAgICAgdGhpcy5fYm9keSA9IGRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICB2YXIgYm9keSA9IG5ldyBCdWZmZXIoZGF0YS5ieXRlTGVuZ3RoKTtcbiAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoZGF0YSk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEuYnl0ZUxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYm9keVtpXSA9IHZpZXdbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9ib2R5ID0gYm9keTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkYXRhLmJ1ZmZlciAmJiBkYXRhLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICB2YXIgYm9keSA9IG5ldyBCdWZmZXIoZGF0YS5ieXRlTGVuZ3RoKTtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSBkYXRhLmJ5dGVPZmZzZXQ7XG4gICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGRhdGEuYnVmZmVyKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5ieXRlTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBib2R5W2ldID0gdmlld1tpICsgb2Zmc2V0XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2JvZHkgPSBib2R5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5zdXBwb3J0ZWQgc2VuZCgpIGRhdGEgXCIgKyBkYXRhKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgWE1MSHR0cFJlcXVlc3RVcGxvYWQucHJvdG90eXBlLl9maW5hbGl6ZUhlYWRlcnMgPSBmdW5jdGlvbiAoaGVhZGVycywgbG93ZXJlZEhlYWRlcnMpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NvbnRlbnRUeXBlICYmICFsb3dlcmVkSGVhZGVyc1snY29udGVudC10eXBlJ10pIHtcbiAgICAgICAgICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdGhpcy5fY29udGVudFR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2JvZHkpIHtcbiAgICAgICAgICAgIGhlYWRlcnNbJ0NvbnRlbnQtTGVuZ3RoJ10gPSB0aGlzLl9ib2R5Lmxlbmd0aC50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBYTUxIdHRwUmVxdWVzdFVwbG9hZC5wcm90b3R5cGUuX3N0YXJ0VXBsb2FkID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgaWYgKHRoaXMuX2JvZHkpIHtcbiAgICAgICAgICAgIHJlcXVlc3Qud3JpdGUodGhpcy5fYm9keSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVxdWVzdC5lbmQoKTtcbiAgICB9O1xuICAgIHJldHVybiBYTUxIdHRwUmVxdWVzdFVwbG9hZDtcbn0oeG1sX2h0dHBfcmVxdWVzdF9ldmVudF90YXJnZXRfMS5YTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0KSk7XG5leHBvcnRzLlhNTEh0dHBSZXF1ZXN0VXBsb2FkID0gWE1MSHR0cFJlcXVlc3RVcGxvYWQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD14bWwtaHR0cC1yZXF1ZXN0LXVwbG9hZC5qcy5tYXAiLCJ2YXIgeGhyID0gcmVxdWlyZSgneGhyJylcbnZhciBub3JtYWxpemUgPSByZXF1aXJlKCcuL25vcm1hbGl6ZS1yZXNwb25zZScpXG52YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9XG5cbm1vZHVsZS5leHBvcnRzID0geGhyUmVxdWVzdFxuZnVuY3Rpb24geGhyUmVxdWVzdCAob3B0LCBjYikge1xuICBkZWxldGUgb3B0LnVyaVxuXG4gIC8vIGZvciBiZXR0ZXIgSlNPTi5wYXJzZSBlcnJvciBoYW5kbGluZyB0aGFuIHhociBtb2R1bGVcbiAgdmFyIHVzZUpzb24gPSBmYWxzZVxuICBpZiAob3B0LnJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nKSB7XG4gICAgb3B0LnJlc3BvbnNlVHlwZSA9ICd0ZXh0J1xuICAgIHVzZUpzb24gPSB0cnVlXG4gIH1cblxuICB2YXIgcmVxID0geGhyKG9wdCwgZnVuY3Rpb24geGhyUmVxdWVzdFJlc3VsdCAoZXJyLCByZXNwLCBib2R5KSB7XG4gICAgaWYgKHVzZUpzb24gJiYgIWVycikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHRleHQgPSByZXNwLnJhd1JlcXVlc3QucmVzcG9uc2VUZXh0XG4gICAgICAgIGJvZHkgPSBKU09OLnBhcnNlKHRleHQpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGVyciA9IGVcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXNwID0gbm9ybWFsaXplKG9wdCwgcmVzcClcbiAgICBpZiAoZXJyKSBjYihlcnIsIG51bGwsIHJlc3ApXG4gICAgZWxzZSBjYihlcnIsIGJvZHksIHJlc3ApXG4gICAgY2IgPSBub29wXG4gIH0pXG5cbiAgLy8gUGF0Y2ggYWJvcnQoKSBzbyB0aGF0IGl0IGFsc28gY2FsbHMgdGhlIGNhbGxiYWNrLCBidXQgd2l0aCBhbiBlcnJvclxuICB2YXIgb25hYm9ydCA9IHJlcS5vbmFib3J0XG4gIHJlcS5vbmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByZXQgPSBvbmFib3J0LmFwcGx5KHJlcSwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSlcbiAgICBjYihuZXcgRXJyb3IoJ1hIUiBBYm9ydGVkJykpXG4gICAgY2IgPSBub29wXG4gICAgcmV0dXJuIHJldFxuICB9XG5cbiAgcmV0dXJuIHJlcVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBleHRlbmRcblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gZXh0ZW5kKCkge1xuICAgIHZhciB0YXJnZXQgPSB7fVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXVxuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXRcbn1cbiIsIid1c2Ugc3RyaWN0JztcbnZhciBzdHJpY3RVcmlFbmNvZGUgPSByZXF1aXJlKCdzdHJpY3QtdXJpLWVuY29kZScpO1xudmFyIG9iamVjdEFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbnZhciBkZWNvZGVDb21wb25lbnQgPSByZXF1aXJlKCdkZWNvZGUtdXJpLWNvbXBvbmVudCcpO1xuXG5mdW5jdGlvbiBlbmNvZGVyRm9yQXJyYXlGb3JtYXQob3B0cykge1xuXHRzd2l0Y2ggKG9wdHMuYXJyYXlGb3JtYXQpIHtcblx0XHRjYXNlICdpbmRleCc6XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKGtleSwgdmFsdWUsIGluZGV4KSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZSA9PT0gbnVsbCA/IFtcblx0XHRcdFx0XHRlbmNvZGUoa2V5LCBvcHRzKSxcblx0XHRcdFx0XHQnWycsXG5cdFx0XHRcdFx0aW5kZXgsXG5cdFx0XHRcdFx0J10nXG5cdFx0XHRcdF0uam9pbignJykgOiBbXG5cdFx0XHRcdFx0ZW5jb2RlKGtleSwgb3B0cyksXG5cdFx0XHRcdFx0J1snLFxuXHRcdFx0XHRcdGVuY29kZShpbmRleCwgb3B0cyksXG5cdFx0XHRcdFx0J109Jyxcblx0XHRcdFx0XHRlbmNvZGUodmFsdWUsIG9wdHMpXG5cdFx0XHRcdF0uam9pbignJyk7XG5cdFx0XHR9O1xuXG5cdFx0Y2FzZSAnYnJhY2tldCc6XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlID09PSBudWxsID8gZW5jb2RlKGtleSwgb3B0cykgOiBbXG5cdFx0XHRcdFx0ZW5jb2RlKGtleSwgb3B0cyksXG5cdFx0XHRcdFx0J1tdPScsXG5cdFx0XHRcdFx0ZW5jb2RlKHZhbHVlLCBvcHRzKVxuXHRcdFx0XHRdLmpvaW4oJycpO1xuXHRcdFx0fTtcblxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlID09PSBudWxsID8gZW5jb2RlKGtleSwgb3B0cykgOiBbXG5cdFx0XHRcdFx0ZW5jb2RlKGtleSwgb3B0cyksXG5cdFx0XHRcdFx0Jz0nLFxuXHRcdFx0XHRcdGVuY29kZSh2YWx1ZSwgb3B0cylcblx0XHRcdFx0XS5qb2luKCcnKTtcblx0XHRcdH07XG5cdH1cbn1cblxuZnVuY3Rpb24gcGFyc2VyRm9yQXJyYXlGb3JtYXQob3B0cykge1xuXHR2YXIgcmVzdWx0O1xuXG5cdHN3aXRjaCAob3B0cy5hcnJheUZvcm1hdCkge1xuXHRcdGNhc2UgJ2luZGV4Jzpcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgYWNjdW11bGF0b3IpIHtcblx0XHRcdFx0cmVzdWx0ID0gL1xcWyhcXGQqKVxcXSQvLmV4ZWMoa2V5KTtcblxuXHRcdFx0XHRrZXkgPSBrZXkucmVwbGFjZSgvXFxbXFxkKlxcXSQvLCAnJyk7XG5cblx0XHRcdFx0aWYgKCFyZXN1bHQpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gdmFsdWU7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGFjY3VtdWxhdG9yW2tleV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSB7fTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFjY3VtdWxhdG9yW2tleV1bcmVzdWx0WzFdXSA9IHZhbHVlO1xuXHRcdFx0fTtcblxuXHRcdGNhc2UgJ2JyYWNrZXQnOlxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChrZXksIHZhbHVlLCBhY2N1bXVsYXRvcikge1xuXHRcdFx0XHRyZXN1bHQgPSAvKFxcW1xcXSkkLy5leGVjKGtleSk7XG5cdFx0XHRcdGtleSA9IGtleS5yZXBsYWNlKC9cXFtcXF0kLywgJycpO1xuXG5cdFx0XHRcdGlmICghcmVzdWx0KSB7XG5cdFx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IHZhbHVlO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fSBlbHNlIGlmIChhY2N1bXVsYXRvcltrZXldID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gW3ZhbHVlXTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gW10uY29uY2F0KGFjY3VtdWxhdG9yW2tleV0sIHZhbHVlKTtcblx0XHRcdH07XG5cblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChrZXksIHZhbHVlLCBhY2N1bXVsYXRvcikge1xuXHRcdFx0XHRpZiAoYWNjdW11bGF0b3Jba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IHZhbHVlO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSBbXS5jb25jYXQoYWNjdW11bGF0b3Jba2V5XSwgdmFsdWUpO1xuXHRcdFx0fTtcblx0fVxufVxuXG5mdW5jdGlvbiBlbmNvZGUodmFsdWUsIG9wdHMpIHtcblx0aWYgKG9wdHMuZW5jb2RlKSB7XG5cdFx0cmV0dXJuIG9wdHMuc3RyaWN0ID8gc3RyaWN0VXJpRW5jb2RlKHZhbHVlKSA6IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG5cdH1cblxuXHRyZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGtleXNTb3J0ZXIoaW5wdXQpIHtcblx0aWYgKEFycmF5LmlzQXJyYXkoaW5wdXQpKSB7XG5cdFx0cmV0dXJuIGlucHV0LnNvcnQoKTtcblx0fSBlbHNlIGlmICh0eXBlb2YgaW5wdXQgPT09ICdvYmplY3QnKSB7XG5cdFx0cmV0dXJuIGtleXNTb3J0ZXIoT2JqZWN0LmtleXMoaW5wdXQpKS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG5cdFx0XHRyZXR1cm4gTnVtYmVyKGEpIC0gTnVtYmVyKGIpO1xuXHRcdH0pLm1hcChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRyZXR1cm4gaW5wdXRba2V5XTtcblx0XHR9KTtcblx0fVxuXG5cdHJldHVybiBpbnB1dDtcbn1cblxuZnVuY3Rpb24gZXh0cmFjdChzdHIpIHtcblx0dmFyIHF1ZXJ5U3RhcnQgPSBzdHIuaW5kZXhPZignPycpO1xuXHRpZiAocXVlcnlTdGFydCA9PT0gLTEpIHtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblx0cmV0dXJuIHN0ci5zbGljZShxdWVyeVN0YXJ0ICsgMSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlKHN0ciwgb3B0cykge1xuXHRvcHRzID0gb2JqZWN0QXNzaWduKHthcnJheUZvcm1hdDogJ25vbmUnfSwgb3B0cyk7XG5cblx0dmFyIGZvcm1hdHRlciA9IHBhcnNlckZvckFycmF5Rm9ybWF0KG9wdHMpO1xuXG5cdC8vIENyZWF0ZSBhbiBvYmplY3Qgd2l0aCBubyBwcm90b3R5cGVcblx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9xdWVyeS1zdHJpbmcvaXNzdWVzLzQ3XG5cdHZhciByZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG5cdGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiByZXQ7XG5cdH1cblxuXHRzdHIgPSBzdHIudHJpbSgpLnJlcGxhY2UoL15bPyMmXS8sICcnKTtcblxuXHRpZiAoIXN0cikge1xuXHRcdHJldHVybiByZXQ7XG5cdH1cblxuXHRzdHIuc3BsaXQoJyYnKS5mb3JFYWNoKGZ1bmN0aW9uIChwYXJhbSkge1xuXHRcdHZhciBwYXJ0cyA9IHBhcmFtLnJlcGxhY2UoL1xcKy9nLCAnICcpLnNwbGl0KCc9Jyk7XG5cdFx0Ly8gRmlyZWZveCAocHJlIDQwKSBkZWNvZGVzIGAlM0RgIHRvIGA9YFxuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvcXVlcnktc3RyaW5nL3B1bGwvMzdcblx0XHR2YXIga2V5ID0gcGFydHMuc2hpZnQoKTtcblx0XHR2YXIgdmFsID0gcGFydHMubGVuZ3RoID4gMCA/IHBhcnRzLmpvaW4oJz0nKSA6IHVuZGVmaW5lZDtcblxuXHRcdC8vIG1pc3NpbmcgYD1gIHNob3VsZCBiZSBgbnVsbGA6XG5cdFx0Ly8gaHR0cDovL3czLm9yZy9UUi8yMDEyL1dELXVybC0yMDEyMDUyNC8jY29sbGVjdC11cmwtcGFyYW1ldGVyc1xuXHRcdHZhbCA9IHZhbCA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGRlY29kZUNvbXBvbmVudCh2YWwpO1xuXG5cdFx0Zm9ybWF0dGVyKGRlY29kZUNvbXBvbmVudChrZXkpLCB2YWwsIHJldCk7XG5cdH0pO1xuXG5cdHJldHVybiBPYmplY3Qua2V5cyhyZXQpLnNvcnQoKS5yZWR1Y2UoZnVuY3Rpb24gKHJlc3VsdCwga2V5KSB7XG5cdFx0dmFyIHZhbCA9IHJldFtrZXldO1xuXHRcdGlmIChCb29sZWFuKHZhbCkgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkodmFsKSkge1xuXHRcdFx0Ly8gU29ydCBvYmplY3Qga2V5cywgbm90IHZhbHVlc1xuXHRcdFx0cmVzdWx0W2tleV0gPSBrZXlzU29ydGVyKHZhbCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlc3VsdFtrZXldID0gdmFsO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sIE9iamVjdC5jcmVhdGUobnVsbCkpO1xufVxuXG5leHBvcnRzLmV4dHJhY3QgPSBleHRyYWN0O1xuZXhwb3J0cy5wYXJzZSA9IHBhcnNlO1xuXG5leHBvcnRzLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIChvYmosIG9wdHMpIHtcblx0dmFyIGRlZmF1bHRzID0ge1xuXHRcdGVuY29kZTogdHJ1ZSxcblx0XHRzdHJpY3Q6IHRydWUsXG5cdFx0YXJyYXlGb3JtYXQ6ICdub25lJ1xuXHR9O1xuXG5cdG9wdHMgPSBvYmplY3RBc3NpZ24oZGVmYXVsdHMsIG9wdHMpO1xuXG5cdGlmIChvcHRzLnNvcnQgPT09IGZhbHNlKSB7XG5cdFx0b3B0cy5zb3J0ID0gZnVuY3Rpb24gKCkge307XG5cdH1cblxuXHR2YXIgZm9ybWF0dGVyID0gZW5jb2RlckZvckFycmF5Rm9ybWF0KG9wdHMpO1xuXG5cdHJldHVybiBvYmogPyBPYmplY3Qua2V5cyhvYmopLnNvcnQob3B0cy5zb3J0KS5tYXAoZnVuY3Rpb24gKGtleSkge1xuXHRcdHZhciB2YWwgPSBvYmpba2V5XTtcblxuXHRcdGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblxuXHRcdGlmICh2YWwgPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBlbmNvZGUoa2V5LCBvcHRzKTtcblx0XHR9XG5cblx0XHRpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gW107XG5cblx0XHRcdHZhbC5zbGljZSgpLmZvckVhY2goZnVuY3Rpb24gKHZhbDIpIHtcblx0XHRcdFx0aWYgKHZhbDIgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGZvcm1hdHRlcihrZXksIHZhbDIsIHJlc3VsdC5sZW5ndGgpKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oJyYnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZW5jb2RlKGtleSwgb3B0cykgKyAnPScgKyBlbmNvZGUodmFsLCBvcHRzKTtcblx0fSkuZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG5cdFx0cmV0dXJuIHgubGVuZ3RoID4gMDtcblx0fSkuam9pbignJicpIDogJyc7XG59O1xuXG5leHBvcnRzLnBhcnNlVXJsID0gZnVuY3Rpb24gKHN0ciwgb3B0cykge1xuXHRyZXR1cm4ge1xuXHRcdHVybDogc3RyLnNwbGl0KCc/JylbMF0gfHwgJycsXG5cdFx0cXVlcnk6IHBhcnNlKGV4dHJhY3Qoc3RyKSwgb3B0cylcblx0fTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFhNTEh0dHBSZXF1ZXN0RXZlbnRUYXJnZXQoKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0ge307XG4gICAgfVxuICAgIFhNTEh0dHBSZXF1ZXN0RXZlbnRUYXJnZXQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnRUeXBlLCBsaXN0ZW5lcikge1xuICAgICAgICBldmVudFR5cGUgPSBldmVudFR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRUeXBlXSA9IHRoaXMubGlzdGVuZXJzW2V2ZW50VHlwZV0gfHwgW107XG4gICAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50VHlwZV0ucHVzaChsaXN0ZW5lci5oYW5kbGVFdmVudCB8fCBsaXN0ZW5lcik7XG4gICAgfTtcbiAgICBYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50VHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgZXZlbnRUeXBlID0gZXZlbnRUeXBlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmICghdGhpcy5saXN0ZW5lcnNbZXZlbnRUeXBlXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMubGlzdGVuZXJzW2V2ZW50VHlwZV0uaW5kZXhPZihsaXN0ZW5lci5oYW5kbGVFdmVudCB8fCBsaXN0ZW5lcik7XG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxpc3RlbmVyc1tldmVudFR5cGVdLnNwbGljZShpbmRleCwgMSk7XG4gICAgfTtcbiAgICBYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0LnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHZhciBldmVudFR5cGUgPSBldmVudC50eXBlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGV2ZW50LnRhcmdldCA9IHRoaXM7IC8vIFRPRE86IHNldCBldmVudC5jdXJyZW50VGFyZ2V0P1xuICAgICAgICBpZiAodGhpcy5saXN0ZW5lcnNbZXZlbnRUeXBlXSkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMubGlzdGVuZXJzW2V2ZW50VHlwZV07IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxpc3RlbmVyXzEgPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgbGlzdGVuZXJfMS5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdGVuZXIgPSB0aGlzW1wib25cIiArIGV2ZW50VHlwZV07XG4gICAgICAgIGlmIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgbGlzdGVuZXIuY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICByZXR1cm4gWE1MSHR0cFJlcXVlc3RFdmVudFRhcmdldDtcbn0oKSk7XG5leHBvcnRzLlhNTEh0dHBSZXF1ZXN0RXZlbnRUYXJnZXQgPSBYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9eG1sLWh0dHAtcmVxdWVzdC1ldmVudC10YXJnZXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5mdW5jdGlvbiBfX2V4cG9ydChtKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xufVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuX19leHBvcnQocmVxdWlyZShcIi4veG1sLWh0dHAtcmVxdWVzdFwiKSk7XG52YXIgeG1sX2h0dHBfcmVxdWVzdF9ldmVudF90YXJnZXRfMSA9IHJlcXVpcmUoXCIuL3htbC1odHRwLXJlcXVlc3QtZXZlbnQtdGFyZ2V0XCIpO1xuZXhwb3J0cy5YTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0ID0geG1sX2h0dHBfcmVxdWVzdF9ldmVudF90YXJnZXRfMS5YTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgUHJvZ3Jlc3NFdmVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQcm9ncmVzc0V2ZW50KHR5cGUpIHtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5idWJibGVzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2FuY2VsYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxvYWRlZCA9IDA7XG4gICAgICAgIHRoaXMubGVuZ3RoQ29tcHV0YWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRvdGFsID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIFByb2dyZXNzRXZlbnQ7XG59KCkpO1xuZXhwb3J0cy5Qcm9ncmVzc0V2ZW50ID0gUHJvZ3Jlc3NFdmVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByb2dyZXNzLWV2ZW50LmpzLm1hcCIsInZhciBxdWVyeVN0cmluZyA9IHJlcXVpcmUoJ3F1ZXJ5LXN0cmluZycpXG52YXIgc2V0UXVlcnkgPSByZXF1aXJlKCd1cmwtc2V0LXF1ZXJ5JylcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJylcbnZhciBlbnN1cmVIZWFkZXIgPSByZXF1aXJlKCcuL2xpYi9lbnN1cmUtaGVhZGVyLmpzJylcblxuLy8gdGhpcyBpcyByZXBsYWNlZCBpbiB0aGUgYnJvd3NlclxudmFyIHJlcXVlc3QgPSByZXF1aXJlKCcuL2xpYi9yZXF1ZXN0LmpzJylcblxudmFyIG1pbWVUeXBlSnNvbiA9ICdhcHBsaWNhdGlvbi9qc29uJ1xudmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fVxuXG5tb2R1bGUuZXhwb3J0cyA9IHhoclJlcXVlc3RcbmZ1bmN0aW9uIHhoclJlcXVlc3QgKHVybCwgb3B0LCBjYikge1xuICBpZiAoIXVybCB8fCB0eXBlb2YgdXJsICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ211c3Qgc3BlY2lmeSBhIFVSTCcpXG4gIH1cbiAgaWYgKHR5cGVvZiBvcHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYiA9IG9wdFxuICAgIG9wdCA9IHt9XG4gIH1cbiAgaWYgKGNiICYmIHR5cGVvZiBjYiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4cGVjdGVkIGNiIHRvIGJlIHVuZGVmaW5lZCBvciBhIGZ1bmN0aW9uJylcbiAgfVxuXG4gIGNiID0gY2IgfHwgbm9vcFxuICBvcHQgPSBvcHQgfHwge31cblxuICB2YXIgZGVmYXVsdFJlc3BvbnNlID0gb3B0Lmpzb24gPyAnanNvbicgOiAndGV4dCdcbiAgb3B0ID0gYXNzaWduKHsgcmVzcG9uc2VUeXBlOiBkZWZhdWx0UmVzcG9uc2UgfSwgb3B0KVxuXG4gIHZhciBoZWFkZXJzID0gb3B0LmhlYWRlcnMgfHwge31cbiAgdmFyIG1ldGhvZCA9IChvcHQubWV0aG9kIHx8ICdHRVQnKS50b1VwcGVyQ2FzZSgpXG4gIHZhciBxdWVyeSA9IG9wdC5xdWVyeVxuICBpZiAocXVlcnkpIHtcbiAgICBpZiAodHlwZW9mIHF1ZXJ5ICE9PSAnc3RyaW5nJykge1xuICAgICAgcXVlcnkgPSBxdWVyeVN0cmluZy5zdHJpbmdpZnkocXVlcnkpXG4gICAgfVxuICAgIHVybCA9IHNldFF1ZXJ5KHVybCwgcXVlcnkpXG4gIH1cblxuICAvLyBhbGxvdyBqc29uIHJlc3BvbnNlXG4gIGlmIChvcHQucmVzcG9uc2VUeXBlID09PSAnanNvbicpIHtcbiAgICBlbnN1cmVIZWFkZXIoaGVhZGVycywgJ0FjY2VwdCcsIG1pbWVUeXBlSnNvbilcbiAgfVxuXG4gIC8vIGlmIGJvZHkgY29udGVudCBpcyBqc29uXG4gIGlmIChvcHQuanNvbiAmJiBtZXRob2QgIT09ICdHRVQnICYmIG1ldGhvZCAhPT0gJ0hFQUQnKSB7XG4gICAgZW5zdXJlSGVhZGVyKGhlYWRlcnMsICdDb250ZW50LVR5cGUnLCBtaW1lVHlwZUpzb24pXG4gICAgb3B0LmJvZHkgPSBKU09OLnN0cmluZ2lmeShvcHQuYm9keSlcbiAgfVxuXG4gIG9wdC5tZXRob2QgPSBtZXRob2RcbiAgb3B0LnVybCA9IHVybFxuICBvcHQuaGVhZGVycyA9IGhlYWRlcnNcbiAgZGVsZXRlIG9wdC5xdWVyeVxuICBkZWxldGUgb3B0Lmpzb25cblxuICByZXR1cm4gcmVxdWVzdChvcHQsIGNiKVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==