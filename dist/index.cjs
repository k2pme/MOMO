'use strict';

var fs = require('fs');
var path = require('path');
var axios3 = require('axios');
var uuid = require('uuid');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var fs__default = /*#__PURE__*/_interopDefault(fs);
var path__default = /*#__PURE__*/_interopDefault(path);
var axios3__default = /*#__PURE__*/_interopDefault(axios3);

// src/logging/file-transport.ts
function ensureDir(dir) {
  if (!fs__default.default.existsSync(dir)) fs__default.default.mkdirSync(dir, { recursive: true });
}
function todayName() {
  const d = /* @__PURE__ */ new Date();
  const YYYY = d.getFullYear();
  const MM = String(d.getMonth() + 1).padStart(2, "0");
  const DD = String(d.getDate()).padStart(2, "0");
  return `${YYYY}-${MM}-${DD}.log`;
}
var FileTransport = class {
  constructor(dir) {
    this.dir = dir;
    ensureDir(dir);
  }
  write(r) {
    const file = path__default.default.join(this.dir, todayName());
    const line = JSON.stringify(r) + "\n";
    fs__default.default.appendFileSync(file, line, { encoding: "utf8" });
  }
};

// src/logging/memory-transport.ts
var MemoryTransport = class {
  constructor() {
    this.buf = [];
  }
  write(r) {
    this.buf.push(r);
  }
  dump() {
    return [...this.buf];
  }
};

// src/logging/logger.ts
var Logger = class {
  constructor(opts) {
    this.levelOrder = { debug: 10, info: 20, error: 30 };
    this.min = "info";
    this.min = opts?.level || "info";
    const isNode = typeof process !== "undefined" && !!process.versions?.node;
    if (opts?.transport === "memory") this.transport = new MemoryTransport();
    else if (opts?.transport === "file") this.transport = new FileTransport(opts?.dir || "./logs");
    else this.transport = isNode ? new FileTransport(opts?.dir || "./logs") : new MemoryTransport();
  }
  log(level, msg, meta) {
    if (this.levelOrder[level] < this.levelOrder[this.min]) return;
    const rec = { ts: (/* @__PURE__ */ new Date()).toISOString(), level, msg, meta };
    this.transport.write(rec);
  }
  info(msg, meta) {
    this.log("info", msg, meta);
  }
  error(msg, meta) {
    this.log("error", msg, meta);
  }
  debug(msg, meta) {
    this.log("debug", msg, meta);
  }
};

// src/config.ts
function loadConfigFromEnv() {
  return {
    baseUrl: process.env.MTN_API_BASE_URL,
    environment: process.env.MTN_API_ENVIRONMENT,
    callbackHost: process.env.MTN_URL_CALLBACK ?? void 0,
    cacheControl: process.env.MTN_CACHE_CONTROL ?? "cache",
    subscriptionKeys: {
      collection: process.env.MTN_COLLECTION_SUBSCRIPTION_KEY,
      disbursement: process.env.MTN_DISBURSEMENT_SUBSCRIPTION_KEY,
      remittance: process.env.MTN_REMITTANCE_SUBSCRIPTION_KEY
    },
    logs: {
      enabled: true,
      dir: process.env.MOMO_LOG_DIR || "./logs",
      level: process.env.MOMO_LOG_LEVEL || "info"
    }
  };
}
var newRefId = () => uuid.v4();
var configStore = {
  collection: void 0,
  disbursement: void 0,
  remittance: void 0
};
async function provisionApiUserAndKey(product, cfg, logger) {
  if (configStore[product]) return configStore[product];
  const subKey = product === "collection" ? cfg.subscriptionKeys.collection : product === "disbursement" ? cfg.subscriptionKeys.disbursement : cfg.subscriptionKeys.remittance;
  if (!subKey) throw new Error(`Missing subscriptionKey for product ${product}`);
  const apiUser = newRefId();
  console.log(subKey, apiUser);
  await axios3__default.default.post(
    `${cfg.baseUrl}/v1_0/apiuser`,
    { providerCallbackHost: cfg.callbackHost ?? "string" },
    { headers: { "X-Reference-Id": apiUser, "Ocp-Apim-Subscription-Key": subKey, "Cache-Control": cfg.cacheControl } }
  );
  logger.info(`[${product}] API User created`, { apiUser });
  await new Promise((res) => setTimeout(res, 2e3));
  const resp = await axios3__default.default.post(
    `${cfg.baseUrl}/v1_0/apiuser/${apiUser}/apikey`,
    {},
    { headers: { "Ocp-Apim-Subscription-Key": subKey } }
  );
  const apiKey = resp.data.apiKey;
  logger.info(`[${product}] API Key created`);
  const creds = { apiUser, apiKey };
  configStore[product] = creds;
  return creds;
}

// src/auth.ts
var tokens = {
  collection: { accessToken: null, expirationTime: null },
  disbursement: { accessToken: null, expirationTime: null },
  remittance: { accessToken: null, expirationTime: null }
};
async function getAccessToken(product, cfg, logger) {
  const cached = tokens[product];
  if (cached.accessToken && cached.expirationTime && cached.expirationTime > Date.now())
    return cached.accessToken;
  let apiUser;
  let apiKey;
  if (cfg.environment.toLowerCase() === "sandbox") {
    ({ apiUser, apiKey } = await provisionApiUserAndKey(product, cfg, logger));
  } else {
    apiUser = product === "collection" ? process.env.MTN_COLLECTION_API_USER : product === "disbursement" ? process.env.MTN_DISBURSEMENT_API_USER : process.env.MTN_REMITTANCE_API_USER;
    apiKey = product === "collection" ? process.env.MTN_COLLECTION_API_KEY : product === "disbursement" ? process.env.MTN_DISBURSEMENT_API_KEY : process.env.MTN_REMITTANCE_API_KEY;
    if (!apiUser || !apiKey) {
      throw new Error(
        `[${product}] Missing apiUser/apiKey for production environment. Please set them in .env or config.`
      );
    }
  }
  const subKey = product === "collection" ? cfg.subscriptionKeys.collection : product === "disbursement" ? cfg.subscriptionKeys.disbursement : cfg.subscriptionKeys.remittance;
  const endpoint = product === "collection" ? `${cfg.baseUrl}/collection/token/` : product === "disbursement" ? `${cfg.baseUrl}/disbursement/token/` : `${cfg.baseUrl}/remittance/token/`;
  const basic = Buffer.from(`${apiUser}:${apiKey}`).toString("base64");
  const resp = await axios3__default.default.post(
    endpoint,
    {},
    {
      headers: {
        "Ocp-Apim-Subscription-Key": subKey,
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/json"
      }
    }
  );
  const token = resp.data?.access_token;
  const expires_in = resp.data?.expires_in ?? 1800;
  if (!token) throw new Error("No access_token in MTN response");
  tokens[product] = {
    accessToken: token,
    expirationTime: Date.now() + expires_in * 1e3
  };
  logger.info(`[${product}] Access token retrieved`);
  return token;
}

// src/services/collection.ts
async function requestToPay(cfg, logger, params) {
  const token = await getAccessToken("collection", cfg, logger);
  const ref = newRefId();
  const currency = params.currency ?? "XAF";
  const headers = {
    "X-Reference-Id": ref,
    "X-Target-Environment": cfg.environment,
    "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.collection,
    "Authorization": `Bearer ${token}`,
    "Cache-Control": cfg.cacheControl,
    "X-Callback-Url": void 0
  };
  console.log(headers);
  const payload = {
    amount: String(params.amount),
    currency,
    externalId: "1234",
    payer: { partyIdType: "MSISDN", partyId: params.phoneNumber },
    payerMessage: "Payment request",
    payeeNote: "Thank you for using our service"
  };
  const r = await axios3__default.default.post(`${cfg.baseUrl}/collection/v1_0/requesttopay`, payload, { headers });
  logger.info(`[Collection:RequestToPay] Success`, { ref, amount: payload.amount, currency, phone: params.phoneNumber });
  return { referenceId: ref, mtnStatusCode: r.status, mtnStatusText: r.statusText, status: "REQUESTED" };
}
async function getRequestStatus(cfg, logger, transactionId) {
  const token = await getAccessToken("collection", cfg, logger);
  const headers = {
    "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.collection,
    "Authorization": `Bearer ${token}`,
    "X-Target-Environment": cfg.environment
  };
  const r = await axios3__default.default.get(`${cfg.baseUrl}/collection/v1_0/requesttopay/${transactionId}`, { headers });
  logger.info(`[Collection:GetTransactionStatus]`, { transactionId, status: r.data?.status });
  return r.data;
}
async function getBalance(cfg, logger) {
  const token = await getAccessToken("collection", cfg, logger);
  const headers = {
    "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.collection,
    "Authorization": `Bearer ${token}`,
    "X-Target-Environment": cfg.environment
  };
  const r = await axios3__default.default.get(`${cfg.baseUrl}/collection/v1_0/account/balance`, { headers });
  logger.info(`[Collection:GetAccountBalance]`, { currency: r.data?.currency, availableBalance: r.data?.availableBalance });
  return r.data;
}
async function validateAccount(cfg, logger, accountHolderId, accountHolderIdType = "msisdn") {
  const token = await getAccessToken("collection", cfg, logger);
  const headers = {
    "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.collection,
    "Authorization": `Bearer ${token}`,
    "X-Target-Environment": cfg.environment
  };
  const r = await axios3__default.default.get(`${cfg.baseUrl}/collection/v1_0/accountholder/${accountHolderIdType}/${accountHolderId}/active`, { headers });
  logger.info(`[Collection:ValidateAccountHolderStatus]`, { accountHolderId, result: r.data?.result });
  return r.data;
}
async function transfer(cfg, logger, params) {
  const token = await getAccessToken("disbursement", cfg, logger);
  const ref = newRefId();
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
  const r = await axios3__default.default.post(`${cfg.baseUrl}/disbursement/v1_0/transfer`, payload, { headers });
  logger.info(`[Disbursement] Success`, { ref, amount: payload.amount, currency });
  return { referenceId: ref, mtnStatusCode: r.status, mtnStatusText: r.statusText, status: "REQUESTED" };
}
async function getStatus(cfg, logger, transactionId) {
  const token = await getAccessToken("disbursement", cfg, logger);
  const headers = {
    "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.disbursement,
    "Authorization": `Bearer ${token}`,
    "X-Target-Environment": cfg.environment
  };
  const r = await axios3__default.default.get(`${cfg.baseUrl}/disbursement/v1_0/transfer/${transactionId}`, { headers });
  logger.info(`[GetDisbursementStatus]`, { transactionId, status: r.data?.status });
  return r.data;
}
async function cashTransfer(cfg, logger, params) {
  const token = await getAccessToken("remittance", cfg, logger);
  const ref = newRefId();
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
  const r = await axios3__default.default.post(`${cfg.baseUrl}/remittance/v1_0/transfer`, payload, { headers });
  logger.info(`[Remittance:CashTransfer] Success`, { ref, amount: payload.amount, currency });
  return { referenceId: ref, mtnStatusCode: r.status, mtnStatusText: r.statusText, status: "REQUESTED" };
}
async function getTransferStatus(cfg, logger, transactionId) {
  const token = await getAccessToken("remittance", cfg, logger);
  const headers = {
    "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.remittance,
    "Authorization": `Bearer ${token}`,
    "X-Target-Environment": cfg.environment
  };
  const r = await axios3__default.default.get(`${cfg.baseUrl}/remittance/v1_0/transfer/${transactionId}`, { headers });
  logger.info(`[Remittance:GetTransferStatus]`, { transactionId, status: r.data?.status });
  return r.data;
}
async function getAccountBalance(cfg, logger) {
  const token = await getAccessToken("remittance", cfg, logger);
  const headers = {
    "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.remittance,
    "Authorization": `Bearer ${token}`,
    "X-Target-Environment": cfg.environment
  };
  const r = await axios3__default.default.get(`${cfg.baseUrl}/remittance/v1_0/account/balance`, { headers });
  logger.info(`[Remittance:GetAccountBalance]`, { currency: r.data?.currency, availableBalance: r.data?.availableBalance });
  return r.data;
}

// src/client.ts
var MtnMomoClient = class {
  constructor(cfg = {}) {
    // --- Collection
    this.collection = {
      requestToPay: (amount, phoneNumber, currency) => requestToPay(this.cfg, this.logger, { amount, phoneNumber, currency }),
      getStatus: (transactionId) => getRequestStatus(this.cfg, this.logger, transactionId),
      getBalance: () => getBalance(this.cfg, this.logger),
      validateAccount: (accountHolderId, accountHolderIdType) => validateAccount(this.cfg, this.logger, accountHolderId, accountHolderIdType)
    };
    // --- Disbursement
    this.disbursement = {
      transfer: (amount, beneficiaryPhone, currency) => transfer(this.cfg, this.logger, { amount, beneficiaryPhone, currency }),
      getStatus: (transactionId) => getStatus(this.cfg, this.logger, transactionId)
    };
    // --- Remittance
    this.remittance = {
      cashTransfer: (amount, beneficiaryPhone, currency) => cashTransfer(this.cfg, this.logger, { amount, beneficiaryPhone, currency }),
      getTransferStatus: (transactionId) => getTransferStatus(this.cfg, this.logger, transactionId),
      getAccountBalance: () => getAccountBalance(this.cfg, this.logger)
    };
    const merged = { ...loadConfigFromEnv(), ...cfg };
    if (!merged.baseUrl) throw new Error("Missing baseUrl");
    if (!merged.environment) throw new Error("Missing environment");
    if (!merged.subscriptionKeys) throw new Error("Missing subscriptionKeys");
    this.cfg = merged;
    this.logger = new Logger({
      dir: this.cfg.logs?.dir,
      level: this.cfg.logs?.level || "info",
      transport: this.cfg.logs?.transport
      // auto choose if undefined
    });
    this.logger.info("MtnMomoClient instantiated");
  }
};

exports.MtnMomoClient = MtnMomoClient;
