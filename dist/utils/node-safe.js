"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNode = void 0;
const isNode = () => typeof process !== "undefined" && !!process.versions?.node;
exports.isNode = isNode;
