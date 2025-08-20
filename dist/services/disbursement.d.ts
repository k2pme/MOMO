import { Logger } from "../logging/logger.js";
import { MomoConfig } from "../types.js";
export declare function transfer(cfg: MomoConfig, logger: Logger, params: {
    amount: number | string;
    beneficiaryPhone: string;
    currency?: string;
}): Promise<{
    referenceId: string;
    mtnStatusCode: number;
    mtnStatusText: string;
    status: "REQUESTED";
}>;
export declare function getStatus(cfg: MomoConfig, logger: Logger, transactionId: string): Promise<any>;
