"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MtnMomoClient = void 0;
const logger_js_1 = require("./logging/logger.js");
const config_js_1 = require("./config.js");
const Collection = __importStar(require("./services/collection.js"));
const Disbursement = __importStar(require("./services/disbursement.js"));
const Remittance = __importStar(require("./services/remittance.js"));
class MtnMomoClient {
    constructor(cfg = {}) {
        // --- Collection
        this.collection = {
            requestToPay: (amount, phoneNumber, currency) => Collection.requestToPay(this.cfg, this.logger, { amount, phoneNumber, currency }),
            getStatus: (transactionId) => Collection.getRequestStatus(this.cfg, this.logger, transactionId),
            getBalance: () => Collection.getBalance(this.cfg, this.logger),
            validateAccount: (accountHolderId, accountHolderIdType) => Collection.validateAccount(this.cfg, this.logger, accountHolderId, accountHolderIdType)
        };
        // --- Disbursement
        this.disbursement = {
            transfer: (amount, beneficiaryPhone, currency) => Disbursement.transfer(this.cfg, this.logger, { amount, beneficiaryPhone, currency }),
            getStatus: (transactionId) => Disbursement.getStatus(this.cfg, this.logger, transactionId)
        };
        // --- Remittance
        this.remittance = {
            cashTransfer: (amount, beneficiaryPhone, currency) => Remittance.cashTransfer(this.cfg, this.logger, { amount, beneficiaryPhone, currency }),
            getTransferStatus: (transactionId) => Remittance.getTransferStatus(this.cfg, this.logger, transactionId),
            getAccountBalance: () => Remittance.getAccountBalance(this.cfg, this.logger)
        };
        const merged = { ...(0, config_js_1.loadConfigFromEnv)(), ...cfg };
        // checks:
        if (!merged.baseUrl)
            throw new Error("Missing baseUrl");
        if (!merged.environment)
            throw new Error("Missing environment");
        if (!merged.subscriptionKeys)
            throw new Error("Missing subscriptionKeys");
        this.cfg = merged;
        this.logger = new logger_js_1.Logger({
            dir: this.cfg.logs?.dir,
            level: this.cfg.logs?.level || "info",
            transport: this.cfg.logs?.transport // auto choose if undefined
        });
        this.logger.info("MtnMomoClient instantiated");
    }
}
exports.MtnMomoClient = MtnMomoClient;
