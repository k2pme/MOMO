"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var wichtig = require('./../utils/functions');
var _require = require('axios'),
  axios = _require["default"];
var collection = {
  createAccessToken: function () {
    var _createAccessToken = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
      var auth, subscriptionKey, _ref$cache, cache, _ref$root, root, basic, headers, rep;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            auth = _ref.auth, subscriptionKey = _ref.subscriptionKey, _ref$cache = _ref.cache, cache = _ref$cache === void 0 ? 'no-cache' : _ref$cache, _ref$root = _ref.root, root = _ref$root === void 0 ? 'https://sandbox.momodeveloper.mtn.com' : _ref$root;
            basic = wichtig.basicFormat(wichtig.bas64Encode(auth.apiUser, auth.apiKey));
            headers = {
              'Authorization': basic,
              'Cache-Control': cache,
              'Ocp-Apim-Subscription-Key': subscriptionKey
            };
            _context.prev = 3;
            _context.next = 6;
            return axios.post("".concat(root, "/collection/token/"), {}, {
              headers: headers
            });
          case 6:
            rep = _context.sent;
            return _context.abrupt("return", rep.data);
          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](3);
            throw _context.t0;
          case 13:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[3, 10]]);
    }));
    function createAccessToken(_x) {
      return _createAccessToken.apply(this, arguments);
    }
    return createAccessToken;
  }(),
  requestToPay: function () {
    var _requestToPay = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref2) {
      var accessToken, subscriptionKey, _ref2$env, env, _ref2$body, body, _ref2$cache, cache, _ref2$root, root, XReferenceId, XCallbackUrl, headers, rep;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            accessToken = _ref2.accessToken, subscriptionKey = _ref2.subscriptionKey, _ref2$env = _ref2.env, env = _ref2$env === void 0 ? 'sandbox' : _ref2$env, _ref2$body = _ref2.body, body = _ref2$body === void 0 ? {
              "amount": "1000",
              "currency": "EUR",
              "externalId": "1245",
              "payer": {
                "partyIdType": "MSISDN",
                "partyId": "225478963"
              },
              "payerMessage": "string",
              "payeeNote": "string"
            } : _ref2$body, _ref2$cache = _ref2.cache, cache = _ref2$cache === void 0 ? 'no-cache' : _ref2$cache, _ref2$root = _ref2.root, root = _ref2$root === void 0 ? 'https://sandbox.momodeveloper.mtn.com' : _ref2$root, XReferenceId = _ref2.XReferenceId, XCallbackUrl = _ref2.XCallbackUrl;
            headers = {
              'Authorization': wichtig.bearerFormat(accessToken),
              'X-Reference-Id': XReferenceId ? XReferenceId : wichtig.generateUUID(),
              'X-Target-Environment': env,
              'Content-Type': 'application/json',
              'Cache-Control': cache,
              'Ocp-Apim-Subscription-Key': subscriptionKey,
              'X-Callback-Url': XCallbackUrl
            };
            _context2.prev = 2;
            _context2.next = 5;
            return axios.post("".concat(root, "/collection/v1_0/requesttopay"), body, {
              headers: headers
            });
          case 5:
            rep = _context2.sent;
            return _context2.abrupt("return", rep.data);
          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](2);
            throw _context2.t0;
          case 12:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[2, 9]]);
    }));
    function requestToPay(_x2) {
      return _requestToPay.apply(this, arguments);
    }
    return requestToPay;
  }(),
  createPayment: function () {
    var _createPayment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(_ref3) {
      var accessToken, subscriptionKey, _ref3$env, env, _ref3$body, body, _ref3$cache, cache, _ref3$root, root, XReferenceId, XCallbackUrl, headers, rep;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            accessToken = _ref3.accessToken, subscriptionKey = _ref3.subscriptionKey, _ref3$env = _ref3.env, env = _ref3$env === void 0 ? 'sandbox' : _ref3$env, _ref3$body = _ref3.body, body = _ref3$body === void 0 ? {
              "externalTransactionId": "12345",
              "money": {
                "amount": "122",
                "currency": "EUR"
              },
              "customerReference": "661551442",
              "serviceProviderUserName": "ahio"
            } : _ref3$body, _ref3$cache = _ref3.cache, cache = _ref3$cache === void 0 ? 'no-cache' : _ref3$cache, _ref3$root = _ref3.root, root = _ref3$root === void 0 ? 'https://sandbox.momodeveloper.mtn.com' : _ref3$root, XReferenceId = _ref3.XReferenceId, XCallbackUrl = _ref3.XCallbackUrl;
            headers = {
              'Authorization': wichtig.bearerFormat(accessToken),
              'X-Reference-Id': XReferenceId ? XReferenceId : wichtig.generateUUID(),
              'X-Target-Environment': env,
              'Content-Type': 'application/json',
              'Cache-Control': cache,
              'Ocp-Apim-Subscription-Key': subscriptionKey,
              'X-Callback-Url': XCallbackUrl
            };
            _context3.prev = 2;
            _context3.next = 5;
            return axios.post("".concat(root, "/collection/v2_0/payment"), body, {
              headers: headers
            });
          case 5:
            rep = _context3.sent;
            return _context3.abrupt("return", rep.data);
          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](2);
            throw _context3.t0;
          case 12:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[2, 9]]);
    }));
    function createPayment(_x3) {
      return _createPayment.apply(this, arguments);
    }
    return createPayment;
  }(),
  getAccountBalance: function () {
    var _getAccountBalance = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(_ref4) {
      var accessToken, subscriptionKey, _ref4$env, env, _ref4$cache, cache, _ref4$root, root, headers, rep;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            accessToken = _ref4.accessToken, subscriptionKey = _ref4.subscriptionKey, _ref4$env = _ref4.env, env = _ref4$env === void 0 ? "sandbox" : _ref4$env, _ref4$cache = _ref4.cache, cache = _ref4$cache === void 0 ? 'no-cache' : _ref4$cache, _ref4$root = _ref4.root, root = _ref4$root === void 0 ? 'https://sandbox.momodeveloper.mtn.com' : _ref4$root;
            headers = {
              'Authorization': wichtig.bearerFormat(accessToken),
              'X-Target-Environment': env,
              'Content-Type': 'application/json',
              'Cache-Control': cache,
              'Ocp-Apim-Subscription-Key': subscriptionKey
            };
            _context4.prev = 2;
            _context4.next = 5;
            return axios.get("".concat(root, "/collection/v1_0/account/balance"), {
              headers: headers
            });
          case 5:
            rep = _context4.sent;
            return _context4.abrupt("return", rep.data);
          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](2);
            throw _context4.t0;
          case 12:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[2, 9]]);
    }));
    function getAccountBalance(_x4) {
      return _getAccountBalance.apply(this, arguments);
    }
    return getAccountBalance;
  }(),
  getBasicUserInfo: function () {
    var _getBasicUserInfo = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(_ref5) {
      var accessToken, subscriptionKey, _ref5$acountHolderMSI, acountHolderMSISDN, _ref5$env, env, _ref5$cache, cache, _ref5$root, root, headers, rep;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            accessToken = _ref5.accessToken, subscriptionKey = _ref5.subscriptionKey, _ref5$acountHolderMSI = _ref5.acountHolderMSISDN, acountHolderMSISDN = _ref5$acountHolderMSI === void 0 ? '00242064581139' : _ref5$acountHolderMSI, _ref5$env = _ref5.env, env = _ref5$env === void 0 ? 'sandbox' : _ref5$env, _ref5$cache = _ref5.cache, cache = _ref5$cache === void 0 ? 'no-cache' : _ref5$cache, _ref5$root = _ref5.root, root = _ref5$root === void 0 ? 'https://sandbox.momodeveloper.mtn.com' : _ref5$root;
            headers = {
              'Authorization': wichtig.bearerFormat(accessToken),
              'X-Target-Environment': env,
              'Content-Type': 'application/json',
              'Cache-Control': cache,
              'Ocp-Apim-Subscription-Key': subscriptionKey
            };
            _context5.prev = 2;
            _context5.next = 5;
            return axios.get("".concat(root, "/collection/v1_0/accountholder/msisdn/").concat(acountHolderMSISDN, "/basicuserinfo"), {
              headers: headers
            });
          case 5:
            rep = _context5.sent;
            return _context5.abrupt("return", rep.data);
          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](2);
            throw _context5.t0;
          case 12:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[2, 9]]);
    }));
    function getBasicUserInfo(_x5) {
      return _getBasicUserInfo.apply(this, arguments);
    }
    return getBasicUserInfo;
  }(),
  getRequestToPayInfo: function () {
    var _getRequestToPayInfo = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(_ref6) {
      var _ref6$root, root, referenceId, accessToken, _ref6$env, env, _ref6$cache, cache, subscriptionKey, headers, response;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _ref6$root = _ref6.root, root = _ref6$root === void 0 ? 'https://sandbox.momodeveloper.mtn.com' : _ref6$root, referenceId = _ref6.referenceId, accessToken = _ref6.accessToken, _ref6$env = _ref6.env, env = _ref6$env === void 0 ? 'sandbox' : _ref6$env, _ref6$cache = _ref6.cache, cache = _ref6$cache === void 0 ? 'no-cache' : _ref6$cache, subscriptionKey = _ref6.subscriptionKey;
            headers = {
              'Authorization': wichtig.bearerFormat(accessToken),
              'X-Target-Environment': env,
              'Content-Type': 'application/json',
              'Cache-Control': cache,
              'Ocp-Apim-Subscription-Key': subscriptionKey
            };
            _context6.prev = 2;
            _context6.next = 5;
            return axios.get("".concat(root, "/collection/v1_0/requesttopay/").concat(referenceId), {
              headers: headers
            });
          case 5:
            response = _context6.sent;
            return _context6.abrupt("return", response.data);
          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](2);
            throw _context6.t0;
          case 12:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[2, 9]]);
    }));
    function getRequestToPayInfo(_x6) {
      return _getRequestToPayInfo.apply(this, arguments);
    }
    return getRequestToPayInfo;
  }(),
  getHolderAccountValidation: function () {
    var _getHolderAccountValidation = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(_ref7) {
      var _ref7$root, root, accountHolderIdType, accountHolderId, accessToken, _ref7$env, env, _ref7$cache, cache, subscriptionKey, headers, response;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _ref7$root = _ref7.root, root = _ref7$root === void 0 ? 'https://sandbox.momodeveloper.mtn.com' : _ref7$root, accountHolderIdType = _ref7.accountHolderIdType, accountHolderId = _ref7.accountHolderId, accessToken = _ref7.accessToken, _ref7$env = _ref7.env, env = _ref7$env === void 0 ? 'sandbox' : _ref7$env, _ref7$cache = _ref7.cache, cache = _ref7$cache === void 0 ? 'no-cache' : _ref7$cache, subscriptionKey = _ref7.subscriptionKey;
            headers = {
              'Authorization': wichtig.bearerFormat(accessToken),
              'X-Target-Environment': env,
              'Content-Type': 'application/json',
              'Cache-Control': cache,
              'Ocp-Apim-Subscription-Key': subscriptionKey
            };
            _context7.prev = 2;
            _context7.next = 5;
            return axios.get("".concat(root, "/collection/v1_0/accountholder/").concat(accountHolderIdType, "/").concat(accountHolderId, "/active"), {
              headers: headers
            });
          case 5:
            response = _context7.sent;
            return _context7.abrupt("return", response.data);
          case 9:
            _context7.prev = 9;
            _context7.t0 = _context7["catch"](2);
            throw _context7.t0;
          case 12:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[2, 9]]);
    }));
    function getHolderAccountValidation(_x7) {
      return _getHolderAccountValidation.apply(this, arguments);
    }
    return getHolderAccountValidation;
  }(),
  getAccountBalanceWithCurrency: function () {
    var _getAccountBalanceWithCurrency = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(_ref8) {
      var _ref8$root, root, accessToken, _ref8$env, env, _ref8$cache, cache, subscriptionKey, currency, headers, response;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _ref8$root = _ref8.root, root = _ref8$root === void 0 ? 'https://sandbox.momodeveloper.mtn.com' : _ref8$root, accessToken = _ref8.accessToken, _ref8$env = _ref8.env, env = _ref8$env === void 0 ? 'sandbox' : _ref8$env, _ref8$cache = _ref8.cache, cache = _ref8$cache === void 0 ? 'no-cache' : _ref8$cache, subscriptionKey = _ref8.subscriptionKey, currency = _ref8.currency;
            headers = {
              'Authorization': wichtig.bearerFormat(accessToken),
              'X-Target-Environment': env,
              'Content-Type': 'application/json',
              'Cache-Control': cache,
              'Ocp-Apim-Subscription-Key': subscriptionKey
            };
            _context8.prev = 2;
            console.warn(currency);
            _context8.next = 6;
            return axios.get("".concat(root, "/collection/v1_0/account/balance/").concat(currency), {
              headers: headers
            });
          case 6:
            response = _context8.sent;
            return _context8.abrupt("return", response.data);
          case 10:
            _context8.prev = 10;
            _context8.t0 = _context8["catch"](2);
            throw _context8.t0;
          case 13:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[2, 10]]);
    }));
    function getAccountBalanceWithCurrency(_x8) {
      return _getAccountBalanceWithCurrency.apply(this, arguments);
    }
    return getAccountBalanceWithCurrency;
  }()
};
module.exports = collection;