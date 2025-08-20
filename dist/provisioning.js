"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.provisionApiUserAndKey = provisionApiUserAndKey;
const axios_1 = __importDefault(require("axios"));
const ids_js_1 = require("./utils/ids.js");
const configStore = {
    collection: undefined, disbursement: undefined, remittance: undefined
};
async function provisionApiUserAndKey(product, cfg, logger) {
    if (configStore[product])
        return configStore[product];
    const subKey = product === "collection" ? cfg.subscriptionKeys.collection :
        product === "disbursement" ? cfg.subscriptionKeys.disbursement :
            cfg.subscriptionKeys.remittance;
    if (!subKey)
        throw new Error(`Missing subscriptionKey for product ${product}`);
    const apiUser = (0, ids_js_1.newRefId)();
    console.log(subKey, apiUser);
    // 1) Create API User
    await axios_1.default.post(`${cfg.baseUrl}/v1_0/apiuser`, { providerCallbackHost: cfg.callbackHost ?? "string" }, { headers: { "X-Reference-Id": apiUser, "Ocp-Apim-Subscription-Key": subKey, "Cache-Control": cfg.cacheControl } });
    logger.info(`[${product}] API User created`, { apiUser });
    // 2) Wait a bit & create API Key
    await new Promise(res => setTimeout(res, 2000));
    const resp = await axios_1.default.post(`${cfg.baseUrl}/v1_0/apiuser/${apiUser}/apikey`, {}, { headers: { "Ocp-Apim-Subscription-Key": subKey } });
    const apiKey = resp.data.apiKey;
    logger.info(`[${product}] API Key created`);
    const creds = { apiUser, apiKey };
    configStore[product] = creds;
    return creds;
}
