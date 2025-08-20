import axios from "axios";
import { newRefId } from "../utils/ids.js";
import { getAccessToken } from "../auth.js";
import { Logger } from "../logging/logger.js";
import { MomoConfig } from "../types.js";

export async function requestToPay(
    cfg: MomoConfig, logger: Logger,
    params: { amount: number | string; phoneNumber: string; currency?: string }
) {

    const token = await getAccessToken("collection", cfg, logger);
    const ref = newRefId();

    const currency = params.currency ?? "XAF";

    const headers = {
        "X-Reference-Id": ref,
        "X-Target-Environment": cfg.environment,
        "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.collection!,
        "Authorization": `Bearer ${token}`,
        "Cache-Control" : cfg.cacheControl,
        "X-Callback-Url" : undefined,
    };

    console.log(headers);

    const payload = {
        amount: String(params.amount),
        currency : currency,
        externalId: '1234',
        payer: { partyIdType: "MSISDN", partyId: params.phoneNumber },
        payerMessage: "Payment request",
        payeeNote: "Thank you for using our service"
    };

    const r = await axios.post(`${cfg.baseUrl}/collection/v1_0/requesttopay`, payload, { headers });
    logger.info(`[Collection:RequestToPay] Success`, { ref, amount: payload.amount, currency, phone: params.phoneNumber });
    return { referenceId: ref, mtnStatusCode: r.status, mtnStatusText: r.statusText, status: "REQUESTED" as const };
}

export async function getRequestStatus(cfg: MomoConfig, logger: Logger, transactionId: string) {
    const token = await getAccessToken("collection", cfg, logger);
    const headers = {
        "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.collection!,
        "Authorization": `Bearer ${token}`,
        "X-Target-Environment": cfg.environment
    };
    const r = await axios.get(`${cfg.baseUrl}/collection/v1_0/requesttopay/${transactionId}`, { headers });
    logger.info(`[Collection:GetTransactionStatus]`, { transactionId, status: r.data?.status });
    return r.data;
}

export async function getBalance(cfg: MomoConfig, logger: Logger) {
    const token = await getAccessToken("collection", cfg, logger);
    const headers = {
        "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.collection!,
        "Authorization": `Bearer ${token}`,
        "X-Target-Environment": cfg.environment
    };
    const r = await axios.get(`${cfg.baseUrl}/collection/v1_0/account/balance`, { headers });
    logger.info(`[Collection:GetAccountBalance]`, { currency: r.data?.currency, availableBalance: r.data?.availableBalance });
    return r.data;
}

export async function validateAccount(cfg: MomoConfig, logger: Logger, accountHolderId: string, accountHolderIdType = "msisdn") {
    const token = await getAccessToken("collection", cfg, logger);
    const headers = {
        "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.collection!,
        "Authorization": `Bearer ${token}`,
        "X-Target-Environment": cfg.environment
    };
    const r = await axios.get(`${cfg.baseUrl}/collection/v1_0/accountholder/${accountHolderIdType}/${accountHolderId}/active`, { headers });
    logger.info(`[Collection:ValidateAccountHolderStatus]`, { accountHolderId, result: r.data?.result });
    return r.data;
}
