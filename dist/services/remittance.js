"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cashTransfer = cashTransfer;
exports.getTransferStatus = getTransferStatus;
exports.getAccountBalance = getAccountBalance;
const axios_1 = __importDefault(require("axios"));
const ids_js_1 = require("../utils/ids.js");
const auth_js_1 = require("../auth.js");
async function cashTransfer(cfg, logger, params) {
    const token = await (0, auth_js_1.getAccessToken)("remittance", cfg, logger);
    const ref = (0, ids_js_1.newRefId)();
    const currency = params.currency ?? "XAF";
    const headers = {
        "X-Reference-Id": ref,
        "X-Target-Environment": cfg.environment,
        "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.remittance,
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };
    const payload = {
        amount: String(params.amount),
        currency,
        externalId: ref,
        payee: { partyIdType: "MSISDN", partyId: params.beneficiaryPhone },
        payerMessage: "Remittance request",
        payeeNote: "Here is your remittance payment"
    };
    const r = await axios_1.default.post(`${cfg.baseUrl}/remittance/v1_0/transfer`, payload, { headers });
    logger.info(`[Remittance:CashTransfer] Success`, { ref, amount: payload.amount, currency });
    return { referenceId: ref, mtnStatusCode: r.status, mtnStatusText: r.statusText, status: "REQUESTED" };
}
async function getTransferStatus(cfg, logger, transactionId) {
    const token = await (0, auth_js_1.getAccessToken)("remittance", cfg, logger);
    const headers = {
        "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.remittance,
        "Authorization": `Bearer ${token}`,
        "X-Target-Environment": cfg.environment
    };
    const r = await axios_1.default.get(`${cfg.baseUrl}/remittance/v1_0/transfer/${transactionId}`, { headers });
    logger.info(`[Remittance:GetTransferStatus]`, { transactionId, status: r.data?.status });
    return r.data;
}
async function getAccountBalance(cfg, logger) {
    const token = await (0, auth_js_1.getAccessToken)("remittance", cfg, logger);
    const headers = {
        "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.remittance,
        "Authorization": `Bearer ${token}`,
        "X-Target-Environment": cfg.environment
    };
    const r = await axios_1.default.get(`${cfg.baseUrl}/remittance/v1_0/account/balance`, { headers });
    logger.info(`[Remittance:GetAccountBalance]`, { currency: r.data?.currency, availableBalance: r.data?.availableBalance });
    return r.data;
}
