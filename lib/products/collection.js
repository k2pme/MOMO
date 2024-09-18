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
exports.collection = void 0;
const axios_1 = __importDefault(require("axios"));
const functions_js_1 = require("../utils/functions.js");
// interface AccountBalance{
//     root ?: string,
//     accessToken : string,
//     env ?: string,
//     cache ?: string,
//     subscriptionKey : string
// }
exports.collection = {
    createAccessToken: (_a) => __awaiter(void 0, [_a], void 0, function* ({ auth, subscriptionKey, cache = 'no-cache', root = 'https://sandbox.momodeveloper.mtn.com' }) {
        const basic = functions_js_1.wichtig.basicFormat(functions_js_1.wichtig.bas64Encode(auth.apiUser, auth.apiKey));
        const headers = {
            'Authorization': basic,
            'Cache-Control': cache,
            'Ocp-Apim-Subscription-Key': subscriptionKey,
        };
        try {
            const rep = yield axios_1.default.post(`${root}/collection/token/`, {}, { headers });
            return rep.data;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }),
    requestToPay: (_a) => __awaiter(void 0, [_a], void 0, function* ({ accessToken, subscriptionKey, env = 'sandbox', body = {
        "amount": "1000",
        "currency": "EUR",
        "externalId": "1245",
        "payer": {
            "partyIdType": "MSISDN",
            "partyId": "225478963"
        },
        "payerMessage": "string",
        "payeeNote": "string"
    }, cache = 'no-cache', root = 'https://sandbox.momodeveloper.mtn.com', XReferenceId }) {
        const headers = {
            'Authorization': functions_js_1.wichtig.bearerFormat(accessToken),
            'X-Reference-Id': XReferenceId ? XReferenceId : functions_js_1.wichtig.generateUUID(),
            'X-Target-Environment': env,
            'Content-Type': 'application/json',
            'Cache-Control': cache,
            'Ocp-Apim-Subscription-Key': subscriptionKey,
        };
        try {
            const rep = yield axios_1.default.post(`${root}/collection/v1_0/requesttopay`, body, { headers });
            rep.data.XReferenceId = XReferenceId;
            return rep.data;
        }
        catch (err) {
            throw err;
        }
    }),
    createPayment: (_a) => __awaiter(void 0, [_a], void 0, function* ({ accessToken, subscriptionKey, env = 'sandbox', body = {
        "externalTransactionId": "12345",
        "money": {
            "amount": "122",
            "currency": "EUR"
        },
        "customerReference": "661551442",
        "serviceProviderUserName": "ahio"
    }, cache = 'no-cache', root = 'https://sandbox.momodeveloper.mtn.com', XReferenceId }) {
        const headers = {
            'Authorization': functions_js_1.wichtig.bearerFormat(accessToken),
            'X-Reference-Id': XReferenceId ? XReferenceId : functions_js_1.wichtig.generateUUID(),
            'X-Target-Environment': env,
            'Content-Type': 'application/json',
            'Cache-Control': cache,
            'Ocp-Apim-Subscription-Key': subscriptionKey,
        };
        try {
            const rep = yield axios_1.default.post(`${root}/collection/v2_0/payment`, body, { headers });
            rep.data.XReferenceId = XReferenceId;
            return rep.data;
        }
        catch (err) {
            throw err;
        }
    }),
    getAccountBalance: (_a) => __awaiter(void 0, [_a], void 0, function* ({ accessToken, subscriptionKey, env = "sandbox", cache = 'no-cache', root = 'https://sandbox.momodeveloper.mtn.com' }) {
        const headers = {
            'Authorization': functions_js_1.wichtig.bearerFormat(accessToken),
            'X-Target-Environment': env,
            'Content-Type': 'application/json',
            'Cache-Control': cache,
            'Ocp-Apim-Subscription-Key': subscriptionKey,
        };
        try {
            const rep = yield axios_1.default.get(`${root}/collection/v1_0/account/balance`, { headers });
            return rep.data;
        }
        catch (err) {
            throw err;
        }
    }),
    getBasicUserInfo: (_a) => __awaiter(void 0, [_a], void 0, function* ({ accessToken, subscriptionKey, acountHolderMSISDN = '00242064581139', env = 'sandbox', cache = 'no-cache', root = 'https://sandbox.momodeveloper.mtn.com' }) {
        const headers = {
            'Authorization': functions_js_1.wichtig.bearerFormat(accessToken),
            'X-Target-Environment': env,
            'Content-Type': 'application/json',
            'Cache-Control': cache,
            'Ocp-Apim-Subscription-Key': subscriptionKey,
        };
        try {
            const rep = yield axios_1.default.get(`${root}/collection/v1_0/accountholder/msisdn/${acountHolderMSISDN}/basicuserinfo`, { headers });
            return rep.data;
        }
        catch (err) {
            throw err;
        }
    }),
    getRequestToPayInfo: (_a) => __awaiter(void 0, [_a], void 0, function* ({ root = 'https://sandbox.momodeveloper.mtn.com', referenceId, accessToken, env = 'sandbox', cache = 'no-cache', subscriptionKey }) {
        const headers = {
            'Authorization': functions_js_1.wichtig.bearerFormat(accessToken),
            'X-Target-Environment': env,
            'Content-Type': 'application/json',
            'Cache-Control': cache,
            'Ocp-Apim-Subscription-Key': subscriptionKey,
        };
        try {
            const response = yield axios_1.default.get(`${root}/collection/v1_0/requesttopay/${referenceId}`, { headers });
            return response.data;
        }
        catch (e) {
            throw e;
        }
    }),
    getHolderAccountValidation: (_a) => __awaiter(void 0, [_a], void 0, function* ({ root = 'https://sandbox.momodeveloper.mtn.com', accountHolderIdType, accountHolderId, accessToken, env = 'sandbox', cache = 'no-cache', subscriptionKey }) {
        const headers = {
            'Authorization': functions_js_1.wichtig.bearerFormat(accessToken),
            'X-Target-Environment': env,
            'Content-Type': 'application/json',
            'Cache-Control': cache,
            'Ocp-Apim-Subscription-Key': subscriptionKey,
        };
        try {
            const response = yield axios_1.default.get(`${root}/collection/v1_0/accountholder/${accountHolderIdType}/${accountHolderId}/active`, { headers });
            return response.data;
        }
        catch (e) {
            throw e;
        }
    }),
    getAccountBalanceWithCurrency: (_a) => __awaiter(void 0, [_a], void 0, function* ({ root = 'https://sandbox.momodeveloper.mtn.com', accessToken, env = 'sandbox', cache = 'no-cache', subscriptionKey, currency }) {
        const headers = {
            'Authorization': functions_js_1.wichtig.bearerFormat(accessToken),
            'X-Target-Environment': env,
            'Content-Type': 'application/json',
            'Cache-Control': cache,
            'Ocp-Apim-Subscription-Key': subscriptionKey,
        };
        try {
            console.warn(currency);
            const response = yield axios_1.default.get(`${root}/collection/v1_0/account/balance/${currency}`, { headers });
            return response.data;
        }
        catch (e) {
            throw e;
        }
    }),
};
