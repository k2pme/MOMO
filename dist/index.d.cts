type MtnProduct = "collection" | "disbursement" | "remittance";
interface SubscriptionKeys {
    collection?: string;
    disbursement?: string;
    remittance?: string;
}
interface MomoConfig {
    baseUrl: string;
    environment: string;
    callbackHost?: string;
    subscriptionKeys: SubscriptionKeys;
    cacheControl?: string;
    logs?: {
        enabled?: boolean;
        dir?: string;
        level?: "info" | "error" | "debug";
        transport?: "file" | "memory";
    };
    transport?: (req: {
        url: string;
        method: "GET" | "POST";
        headers?: Record<string, string>;
        data?: any;
    }) => Promise<{
        status: number;
        statusText: string;
        data: any;
    }>;
}
interface AccessTokenCache {
    accessToken: string | null;
    expirationTime: number | null;
}
interface ProvisionedCreds {
    apiUser: string;
    apiKey: string;
}
interface RequestToPayPayload {
    amount: string | number;
    currency?: string;
    phoneNumber: string;
}

declare class MtnMomoClient {
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

export { type AccessTokenCache, type MomoConfig, MtnMomoClient, type MtnProduct, type ProvisionedCreds, type RequestToPayPayload, type SubscriptionKeys };
