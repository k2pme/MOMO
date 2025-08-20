import { MomoConfig } from "./types.js";
export declare class MtnMomoClient {
    private cfg;
    private logger;
    constructor(cfg?: Partial<MomoConfig>);
    collection: {
        requestToPay: (amount: number | string, phoneNumber: string, currency?: string) => Promise<{
            referenceId: string;
            mtnStatusCode: number;
            mtnStatusText: string;
            status: "REQUESTED";
        }>;
        getStatus: (transactionId: string) => Promise<any>;
        getBalance: () => Promise<any>;
        validateAccount: (accountHolderId: string, accountHolderIdType?: string) => Promise<any>;
    };
    disbursement: {
        transfer: (amount: number | string, beneficiaryPhone: string, currency?: string) => Promise<{
            referenceId: string;
            mtnStatusCode: number;
            mtnStatusText: string;
            status: "REQUESTED";
        }>;
        getStatus: (transactionId: string) => Promise<any>;
    };
    remittance: {
        cashTransfer: (amount: number | string, beneficiaryPhone: string, currency?: string) => Promise<{
            referenceId: string;
            mtnStatusCode: number;
            mtnStatusText: string;
            status: "REQUESTED";
        }>;
        getTransferStatus: (transactionId: string) => Promise<any>;
        getAccountBalance: () => Promise<any>;
    };
}
