"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newRefId = void 0;
const uuid_1 = require("uuid");
const newRefId = () => (0, uuid_1.v4)();
exports.newRefId = newRefId;
