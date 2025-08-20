import { Logger } from "../logging/logger.js";
import { MomoConfig } from "../types.js";
export declare function cashTransfer(cfg: MomoConfig, logger: Logger, params: {
    amount: number | string;
    beneficiaryPhone: string;
    currency?: string;
}): Promise<{
    referenceId: string;
    mtnStatusCode: number;
    mtnStatusText: string;
    status: "REQUESTED";
}>;
export declare function getTransferStatus(cfg: MomoConfig, logger: Logger, transactionId: string): Promise<any>;
export declare function getAccountBalance(cfg: MomoConfig, logger: Logger): Promise<any>;
