export type MtnProduct = "collection" | "disbursement" | "remittance";

export interface SubscriptionKeys {
    collection?: string;
    disbursement?: string;
    remittance?: string;
}

export interface MomoConfig {
    baseUrl: string;                 // ex: https://sandbox.momodeveloper.mtn.com
    environment: string;             // "sandbox" | "production" (selon API MTN)
    callbackHost?: string;           // providerCallbackHost pour provisioning
    subscriptionKeys: SubscriptionKeys;
    cacheControl? : string;
    logs?: {
        enabled?: boolean;             // default true
        dir?: string;                  // default "./logs"
        level?: "info" | "error" | "debug";
        transport?: "file" | "memory"; // auto "file" en Node, "memory" en navigateur
    };
    transport?: (req: {
        url: string; method: "GET"|"POST"; headers?: Record<string,string>; data?: any;
    }) => Promise<{ status: number; statusText: string; data: any }>;
    // ^ Option avancée: sur front, tu fournis un transport qui passe par ton backend.
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
    currency?: string; // default XAF
    phoneNumber: string;
}
