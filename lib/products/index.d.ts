export declare const Products: {
    collection: {
        createAccessToken: ({ auth, subscriptionKey, cache, root }: import("./collection").AccessTokenParams) => Promise<Response>;
        requestToPay: ({ accessToken, subscriptionKey, env, body, cache, root, XReferenceId }: import("./collection").RequestToPayParams) => Promise<import("./collection").Return>;
        createPayment: ({ accessToken, subscriptionKey, env, body, cache, root, XReferenceId }: import("./collection").CreatePayment) => Promise<import("./collection").Return>;
        getAccountBalance: ({ accessToken, subscriptionKey, env, cache, root }: import("./collection").getbalance) => Promise<import("./collection").Return>;
        getBasicUserInfo: ({ accessToken, subscriptionKey, acountHolderMSISDN, env, cache, root }: import("./collection").getBasicInfo) => Promise<import("./collection").Return>;
        getRequestToPayInfo: ({ root, referenceId, accessToken, env, cache, subscriptionKey }: import("./collection").requestTopayInfo) => Promise<import("./collection").Return>;
        getHolderAccountValidation: ({ root, accountHolderIdType, accountHolderId, accessToken, env, cache, subscriptionKey }: import("./collection").HolderAccount) => Promise<import("./collection").Return>;
        getAccountBalanceWithCurrency: ({ root, accessToken, env, cache, subscriptionKey, currency }: import("./collection").AccountBalanceCurrency) => Promise<import("./collection").Return>;
    };
    disbursement: {
        createAccessToken: ({ auth, subscriptionKey, cache, root }: import("./disbursement").AccessTokenParams) => Promise<import("./disbursement").Return>;
        deposit: ({ accessToken, subscriptionKey, env, body, cache, root, XReferenceId }: import("./disbursement").DepositData) => Promise<import("./disbursement").Return>;
        Transfer: ({ accessToken, subscriptionKey, env, body, cache, root, XReferenceId }: import("./disbursement").TransfertData) => Promise<import("./disbursement").Return>;
    };
};
