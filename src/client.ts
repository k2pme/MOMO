import { Logger } from "./logging/logger.js";
import { loadConfigFromEnv } from "./config.js";
import { MomoConfig } from "./types.js";
import * as Collection from "./services/collection.js";
import * as Disbursement from "./services/disbursement.js";
import * as Remittance from "./services/remittance.js";

export class MtnMomoClient {
    private cfg: MomoConfig;
    private logger: Logger;

    constructor(cfg: Partial<MomoConfig> = {}) {
        const merged = { ...loadConfigFromEnv(), ...cfg };
        // checks:
        if (!merged.baseUrl) throw new Error("Missing baseUrl");
        if (!merged.environment) throw new Error("Missing environment");
        if (!merged.subscriptionKeys) throw new Error("Missing subscriptionKeys");
        this.cfg = merged as MomoConfig;

        this.logger = new Logger({
            dir: this.cfg.logs?.dir,
            level: this.cfg.logs?.level || "info",
            transport: this.cfg.logs?.transport // auto choose if undefined
        });

        this.logger.info("MtnMomoClient instantiated");
    }

    // --- Collection
    collection = {
        requestToPay: (amount: number|string, phoneNumber: string, currency?: string) =>
            Collection.requestToPay(this.cfg, this.logger, { amount, phoneNumber, currency }),
        getStatus: (transactionId: string) =>
            Collection.getRequestStatus(this.cfg, this.logger, transactionId),
        getBalance: () => Collection.getBalance(this.cfg, this.logger),
        validateAccount: (accountHolderId: string, accountHolderIdType?: string) =>
            Collection.validateAccount(this.cfg, this.logger, accountHolderId, accountHolderIdType)
    };

    // --- Disbursement
    disbursement = {
        transfer: (amount: number|string, beneficiaryPhone: string, currency?: string) =>
            Disbursement.transfer(this.cfg, this.logger, { amount, beneficiaryPhone, currency }),
        getStatus: (transactionId: string) =>
            Disbursement.getStatus(this.cfg, this.logger, transactionId)
    };

    // --- Remittance
    remittance = {
        cashTransfer: (amount: number|string, beneficiaryPhone: string, currency?: string) =>
            Remittance.cashTransfer(this.cfg, this.logger, { amount, beneficiaryPhone, currency }),
        getTransferStatus: (transactionId: string) =>
            Remittance.getTransferStatus(this.cfg, this.logger, transactionId),
        getAccountBalance: () =>
            Remittance.getAccountBalance(this.cfg, this.logger)
    };
}
