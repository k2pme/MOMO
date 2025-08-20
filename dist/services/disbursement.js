"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transfer = transfer;
exports.getStatus = getStatus;
const axios_1 = __importDefault(require("axios"));
const ids_js_1 = require("../utils/ids.js");
const auth_js_1 = require("../auth.js");
async function transfer(cfg, logger, params) {
    const token = await (0, auth_js_1.getAccessToken)("disbursement", cfg, logger);
    const ref = (0, ids_js_1.newRefId)();
    const currency = params.currency ?? "XAF";
    const headers = {
        "X-Reference-Id": ref,
        "X-Target-Environment": cfg.environment,
        "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.disbursement,
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };
    const payload = {
        amount: String(params.amount),
        currency,
        externalId: ref,
        payee: { partyIdType: "MSISDN", partyId: params.beneficiaryPhone },
        payerMessage: "Disbursement request",
        payeeNote: "Here is your payment"
    };
    const r = await axios_1.default.post(`${cfg.baseUrl}/disbursement/v1_0/transfer`, payload, { headers });
    logger.info(`[Disbursement] Success`, { ref, amount: payload.amount, currency });
    return { referenceId: ref, mtnStatusCode: r.status, mtnStatusText: r.statusText, status: "REQUESTED" };
}
async function getStatus(cfg, logger, transactionId) {
    const token = await (0, auth_js_1.getAccessToken)("disbursement", cfg, logger);
    const headers = {
        "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.disbursement,
        "Authorization": `Bearer ${token}`,
        "X-Target-Environment": cfg.environment
    };
    const r = await axios_1.default.get(`${cfg.baseUrl}/disbursement/v1_0/transfer/${transactionId}`, { headers });
    logger.info(`[GetDisbursementStatus]`, { transactionId, status: r.data?.status });
    return r.data;
}
