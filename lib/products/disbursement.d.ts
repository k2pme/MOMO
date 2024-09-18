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
export interface Return {
    response: {};
}
export interface bodyDeposit {
    amount: string;
    currency: string;
    externalId: string;
    payee: {
        partyIdType: "MSISDN";
        partyId: string;
    };
    payerMessage: string;
    payeeNote: string;
}
export interface DepositData {
    accessToken: string;
    subscriptionKey: string;
    env?: string;
    body?: bodyDeposit;
    cache?: string;
    root?: string;
    XReferenceId: string;
}
export interface TransfertBody {
    "amount": "12000";
    "currency": "EUR";
    "externalId": "12345";
    "payee": {
        "partyIdType": "MSISDN";
        "partyId": "242068541193";
    };
    "payerMessage": "string";
    "payeeNote": "string";
}
export interface TransfertData {
    accessToken: string;
    subscriptionKey: string;
    env?: string;
    body?: TransfertBody;
    cache?: string;
    root?: string;
    XReferenceId: string;
}
export declare const disbursement: {
    createAccessToken: ({ auth, subscriptionKey, cache, root }: AccessTokenParams) => Promise<Return>;
    deposit: ({ accessToken, subscriptionKey, env, body, cache, root, XReferenceId }: DepositData) => Promise<Return>;
    Transfer: ({ accessToken, subscriptionKey, env, body, cache, root, XReferenceId }: TransfertData) => Promise<Return>;
};
