export interface Auth {
    apiKey: string;
    apiUser: string;
}
export interface AccessTokenParams {
    auth: Auth;
    subscriptionKey: string;
    cache?: string;
    root?: string;
}
export interface Body_ {
    amount: string;
    currency: string;
    externalId: string;
    payer: {
        partyIdType: "MSISDN";
        partyId: string;
    };
    payerMessage: string;
    payeeNote: string;
}
export interface RequestToPayParams {
    body?: Body_;
    accessToken: string;
    subscriptionKey: string;
    env?: string;
    cache?: string;
    root?: string;
    XReferenceId?: '';
}
export interface Return {
    response: {};
}
export interface BodyCP {
    externalTransactionId: string;
    money: {
        amount: string;
        currency: string;
    };
    customerReference: string;
    serviceProviderUserName: string;
}
export interface CreatePayment {
    accessToken: string;
    subscriptionKey: string;
    env?: string;
    body?: BodyCP;
    cache?: string;
    root?: string;
    XReferenceId?: string;
}
export interface getbalance {
    accessToken: string;
    subscriptionKey: string;
    env?: string;
    cache?: string;
    root?: string;
}
export interface getBasicInfo {
    accessToken: string;
    subscriptionKey: string;
    acountHolderMSISDN: string;
    env?: string;
    cache?: string;
    root?: string;
}
export interface requestTopayInfo {
    root?: string;
    referenceId: string;
    accessToken: string;
    env?: string;
    cache?: string;
    subscriptionKey: string;
}
export interface HolderAccount {
    root?: string;
    accountHolderIdType: string;
    accountHolderId: string;
    accessToken: string;
    env?: string;
    cache?: string;
    subscriptionKey: string;
}
export interface AccountBalanceCurrency {
    root?: string;
    accessToken: string;
    env?: string;
    cache?: string;
    subscriptionKey: string;
    currency: string;
}
export declare const collection: {
    createAccessToken: ({ auth, subscriptionKey, cache, root }: AccessTokenParams) => Promise<Response>;
    requestToPay: ({ accessToken, subscriptionKey, env, body, cache, root, XReferenceId }: RequestToPayParams) => Promise<Return>;
    createPayment: ({ accessToken, subscriptionKey, env, body, cache, root, XReferenceId }: CreatePayment) => Promise<Return>;
    getAccountBalance: ({ accessToken, subscriptionKey, env, cache, root }: getbalance) => Promise<Return>;
    getBasicUserInfo: ({ accessToken, subscriptionKey, acountHolderMSISDN, env, cache, root }: getBasicInfo) => Promise<Return>;
    getRequestToPayInfo: ({ root, referenceId, accessToken, env, cache, subscriptionKey }: requestTopayInfo) => Promise<Return>;
    getHolderAccountValidation: ({ root, accountHolderIdType, accountHolderId, accessToken, env, cache, subscriptionKey }: HolderAccount) => Promise<Return>;
    getAccountBalanceWithCurrency: ({ root, accessToken, env, cache, subscriptionKey, currency }: AccountBalanceCurrency) => Promise<Return>;
};
