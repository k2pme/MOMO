"use strict";

var _require = require('uuid'),
  uuidv4 = _require.v4;
module.exports = wichtig = {
  bas64Encode: function bas64Encode(apiUser, apiKey) {
    var bytes = Buffer.from("".concat(apiUser, ":").concat(apiKey), 'utf-8');
    return Buffer.from(bytes).toString('base64');
  },
  bearerFormat: function bearerFormat(b64token) {
    return "Bearer ".concat(b64token);
  },
  basicFormat: function basicFormat(b64token) {
    return "Basic ".concat(b64token);
  },
  generateUUID: function generateUUID() {
    return uuidv4();
  }
};