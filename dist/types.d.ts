export type MtnProduct = "collection" | "disbursement" | "remittance";
export interface SubscriptionKeys {
    collection?: string;
    disbursement?: string;
    remittance?: string;
}
export interface MomoConfig {
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
export interface AccessTokenCache {
    accessToken: string | null;
    expirationTime: number | null;
}
export interface ProvisionedCreds {
    apiUser: string;
    apiKey: string;
}
export interface RequestToPayPayload {
    amount: string | number;
    currency?: string;
    phoneNumber: string;
}
