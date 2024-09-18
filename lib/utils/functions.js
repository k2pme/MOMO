"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wichtig = void 0;
const uuid4_1 = __importDefault(require("uuid4"));
const utf8_1 = __importDefault(require("utf8"));
const base_64_1 = __importDefault(require("base-64"));
exports.wichtig = {
    bas64Encode: (apiUser, apiKey) => {
        var bytes = utf8_1.default.encode(`${apiUser}:${apiKey}`);
        return base_64_1.default.encode(bytes);
    },
    bearerFormat: (b64token) => {
        return `Bearer ${b64token}`;
    },
    basicFormat: (b64token) => {
        return `Basic ${b64token}`;
    },
    generateUUID: () => {
        return (0, uuid4_1.default)();
    },
};
