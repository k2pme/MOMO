"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestToPay = requestToPay;
exports.getRequestStatus = getRequestStatus;
exports.getBalance = getBalance;
exports.validateAccount = validateAccount;
const axios_1 = __importDefault(require("axios"));
const ids_js_1 = require("../utils/ids.js");
const auth_js_1 = require("../auth.js");
async function requestToPay(cfg, logger, params) {
    const token = await (0, auth_js_1.getAccessToken)("collection", cfg, logger);
    const ref = (0, ids_js_1.newRefId)();
    const currency = params.currency ?? "XAF";
    const headers = {
        "X-Reference-Id": ref,
        "X-Target-Environment": cfg.environment,
        "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.collection,
        "Authorization": `Bearer ${token}`,
        "Cache-Control": cfg.cacheControl,
        "X-Callback-Url": undefined,
    };
    console.log(headers);
    const payload = {
        amount: String(params.amount),
        currency: currency,
        externalId: '1234',
        payer: { partyIdType: "MSISDN", partyId: params.phoneNumber },
        payerMessage: "Payment request",
        payeeNote: "Thank you for using our service"
    };
    const r = await axios_1.default.post(`${cfg.baseUrl}/collection/v1_0/requesttopay`, payload, { headers });
    logger.info(`[Collection:RequestToPay] Success`, { ref, amount: payload.amount, currency, phone: params.phoneNumber });
    return { referenceId: ref, mtnStatusCode: r.status, mtnStatusText: r.statusText, status: "REQUESTED" };
}
async function getRequestStatus(cfg, logger, transactionId) {
    const token = await (0, auth_js_1.getAccessToken)("collection", cfg, logger);
    const headers = {
        "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.collection,
        "Authorization": `Bearer ${token}`,
        "X-Target-Environment": cfg.environment
    };
    const r = await axios_1.default.get(`${cfg.baseUrl}/collection/v1_0/requesttopay/${transactionId}`, { headers });
    logger.info(`[Collection:GetTransactionStatus]`, { transactionId, status: r.data?.status });
    return r.data;
}
async function getBalance(cfg, logger) {
    const token = await (0, auth_js_1.getAccessToken)("collection", cfg, logger);
    const headers = {
        "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.collection,
        "Authorization": `Bearer ${token}`,
        "X-Target-Environment": cfg.environment
    };
    const r = await axios_1.default.get(`${cfg.baseUrl}/collection/v1_0/account/balance`, { headers });
    logger.info(`[Collection:GetAccountBalance]`, { currency: r.data?.currency, availableBalance: r.data?.availableBalance });
    return r.data;
}
async function validateAccount(cfg, logger, accountHolderId, accountHolderIdType = "msisdn") {
    const token = await (0, auth_js_1.getAccessToken)("collection", cfg, logger);
    const headers = {
        "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.collection,
        "Authorization": `Bearer ${token}`,
        "X-Target-Environment": cfg.environment
    };
    const r = await axios_1.default.get(`${cfg.baseUrl}/collection/v1_0/accountholder/${accountHolderIdType}/${accountHolderId}/active`, { headers });
    logger.info(`[Collection:ValidateAccountHolderStatus]`, { accountHolderId, result: r.data?.result });
    return r.data;
}
