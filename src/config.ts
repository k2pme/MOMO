import { MomoConfig } from "./types.js";

export function loadConfigFromEnv(): Partial<MomoConfig> {
    // facultatif: .env déjà supporté côté app
    return {
        baseUrl: process.env.MTN_API_BASE_URL,
        environment: process.env.MTN_API_ENVIRONMENT,
        callbackHost: process.env.MTN_URL_CALLBACK ?? undefined,
        cacheControl : process.env.MTN_CACHE_CONTROL ?? 'cache',
        subscriptionKeys: {
            collection: process.env.MTN_COLLECTION_SUBSCRIPTION_KEY,
            disbursement: process.env.MTN_DISBURSEMENT_SUBSCRIPTION_KEY,
            remittance: process.env.MTN_REMITTANCE_SUBSCRIPTION_KEY
        },
        logs: {
            enabled: true,
            dir: process.env.MOMO_LOG_DIR || "./logs",
            level: (process.env.MOMO_LOG_LEVEL as any) || "info"
        }
    } as Partial<MomoConfig>;
}
