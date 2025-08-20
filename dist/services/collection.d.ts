import { Logger } from "../logging/logger.js";
import { MomoConfig } from "../types.js";
export declare function requestToPay(cfg: MomoConfig, logger: Logger, params: {
    amount: number | string;
    phoneNumber: string;
    currency?: string;
}): Promise<{
    referenceId: string;
    mtnStatusCode: number;
    mtnStatusText: string;
    status: "REQUESTED";
}>;
export declare function getRequestStatus(cfg: MomoConfig, logger: Logger, transactionId: string): Promise<any>;
export declare function getBalance(cfg: MomoConfig, logger: Logger): Promise<any>;
export declare function validateAccount(cfg: MomoConfig, logger: Logger, accountHolderId: string, accountHolderIdType?: string): Promise<any>;
