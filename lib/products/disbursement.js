"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disbursement = void 0;
const axios_1 = __importDefault(require("axios"));
const functions_js_1 = require("../utils/functions.js");
exports.disbursement = {
    createAccessToken: (_a) => __awaiter(void 0, [_a], void 0, function* ({ auth, subscriptionKey, cache = 'no-cache', root = 'https://sandbox.momodeveloper.mtn.com' }) {
        const basic = functions_js_1.wichtig.basicFormat(functions_js_1.wichtig.bas64Encode(auth.apiUser, auth.apiKey));
        const headers = {
            'Authorization': basic, //'Basic ZGUxMzU1ZjctZDA5ZS00NjdkLWEzN2UtYjM4YTcwNGNmZDg2Ojk0ODE4NzVkMTZkODQyNDM5MzY4MzRjNmYwMWJhZGY0',
            'Cache-Control': cache,
            'Ocp-Apim-Subscription-Key': subscriptionKey,
        };
        try {
            const rep = yield axios_1.default.post(`${root}/disbursement/token/`, {}, { headers });
            return rep.data;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }),
    deposit: (_a) => __awaiter(void 0, [_a], void 0, function* ({ accessToken, subscriptionKey, env = 'sandbox', body = {
        "amount": "string",
        "currency": "string",
        "externalId": "string",
        "payee": {
            "partyIdType": "MSISDN",
            "partyId": "string"
        },
        "payerMessage": "string",
        "payeeNote": "string"
    }, cache = 'no-cache', root = 'https://sandbox.momodeveloper.mtn.com', XReferenceId }) {
        //  if(!XReferenceId){
        //      const XReferenceId = wichtig.generateUUID()
        //  }
        const headers = {
            'Authorization': functions_js_1.wichtig.bearerFormat(accessToken),
            'X-Reference-Id': XReferenceId,
            'X-Target-Environment': env,
            'Content-Type': 'application/json',
            'Cache-Control': cache,
            'Ocp-Apim-Subscription-Key': subscriptionKey,
        };
        try {
            const rep = yield axios_1.default.post(`${root}/disbursement/v2_0/deposit`, body, { headers });
            rep.data.XReferenceId = XReferenceId;
            return rep.data;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }),
    Transfer: (_a) => __awaiter(void 0, [_a], void 0, function* ({ accessToken, subscriptionKey, env = 'sandbox', body = {
        "amount": "12000",
        "currency": "EUR",
        "externalId": "12345",
        "payee": {
            "partyIdType": "MSISDN",
            "partyId": "242068541193"
        },
        "payerMessage": "string",
        "payeeNote": "string"
    }, cache = 'no-cache', root = 'https://sandbox.momodeveloper.mtn.com', XReferenceId }) {
        //  if(!XReferenceId){
        //      const XReferenceId = wichtig.generateUUID()
        //  }
        const headers = {
            'Authorization': functions_js_1.wichtig.bearerFormat(accessToken),
            'X-Reference-Id': XReferenceId ? XReferenceId : functions_js_1.wichtig.generateUUID(),
            'X-Target-Environment': env,
            'Content-Type': 'application/json',
            'Cache-Control': cache,
            'Ocp-Apim-Subscription-Key': subscriptionKey,
        };
        try {
            const rep = yield axios_1.default.post(`${root}/disbursement/v1_0/transfer`, body, { headers });
            return rep.data;
        }
        catch (err) {
            throw err;
        }
    }),
};
