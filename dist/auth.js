"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessToken = getAccessToken;
const axios_1 = __importDefault(require("axios"));
const provisioning_js_1 = require("./provisioning.js");
const tokens = {
    collection: { accessToken: null, expirationTime: null },
    disbursement: { accessToken: null, expirationTime: null },
    remittance: { accessToken: null, expirationTime: null }
};
async function getAccessToken(product, cfg, logger) {
    const cached = tokens[product];
    if (cached.accessToken &&
        cached.expirationTime &&
        cached.expirationTime > Date.now())
        return cached.accessToken;
    let apiUser;
    let apiKey;
    // ✅ If sandbox → generate credentials automatically
    if (cfg.environment.toLowerCase() === "sandbox") {
        ({ apiUser, apiKey } = await (0, provisioning_js_1.provisionApiUserAndKey)(product, cfg, logger));
    }
    else {
        // ✅ In production → must be provided in config/env
        apiUser =
            product === "collection"
                ? process.env.MTN_COLLECTION_API_USER
                : product === "disbursement"
                    ? process.env.MTN_DISBURSEMENT_API_USER
                    : process.env.MTN_REMITTANCE_API_USER;
        apiKey =
            product === "collection"
                ? process.env.MTN_COLLECTION_API_KEY
                : product === "disbursement"
                    ? process.env.MTN_DISBURSEMENT_API_KEY
                    : process.env.MTN_REMITTANCE_API_KEY;
        if (!apiUser || !apiKey) {
            throw new Error(`[${product}] Missing apiUser/apiKey for production environment. Please set them in .env or config.`);
        }
    }
    const subKey = product === "collection"
        ? cfg.subscriptionKeys.collection
        : product === "disbursement"
            ? cfg.subscriptionKeys.disbursement
            : cfg.subscriptionKeys.remittance;
    const endpoint = product === "collection"
        ? `${cfg.baseUrl}/collection/token/`
        : product === "disbursement"
            ? `${cfg.baseUrl}/disbursement/token/`
            : `${cfg.baseUrl}/remittance/token/`;
    const basic = Buffer.from(`${apiUser}:${apiKey}`).toString("base64");
    const resp = await axios_1.default.post(endpoint, {}, {
        headers: {
            "Ocp-Apim-Subscription-Key": subKey,
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/json"
        }
    });
    const token = resp.data?.access_token;
    const expires_in = resp.data?.expires_in ?? 1800; // default 30min
    if (!token)
        throw new Error("No access_token in MTN response");
    tokens[product] = {
        accessToken: token,
        expirationTime: Date.now() + expires_in * 1000
    };
    logger.info(`[${product}] Access token retrieved`);
    return token;
}
