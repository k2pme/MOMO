import ky from "ky";
import { newRefId } from "../utils/ids.js";
import { getAccessToken } from "../auth.js";
import { Logger } from "../logging/logger.js";
import { MomoConfig } from "../types.js";
import { getCurrency } from "../utils/service.js";

export async function requestToPay(
    cfg: MomoConfig, logger: Logger,
    params: { amount: number | string; phoneNumber: string; currency?: string }
) {

    const token = await getAccessToken("collection", cfg, logger);
    const ref = newRefId();

    const currency = getCurrency(cfg, params.currency);

    const headers = {
        "X-Reference-Id": ref,
        "X-Target-Environment": cfg.environment,
        "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.collection!,
        "Authorization": `Bearer ${token}`,
        "Cache-Control" : cfg.cacheControl,
        "X-Callback-Url" : undefined,
    };

    const payload = {
        amount: String(params.amount),
        currency : currency,
        externalId: '1234',
        payer: { partyIdType: "MSISDN", partyId: params.phoneNumber },
        payerMessage: "Payment request",
        payeeNote: "Thank you for using our service"
    };

    const r = await ky.post(`${cfg.baseUrl}/collection/v1_0/requesttopay`, {
        json: payload,
        headers
    });
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
    const r = await ky.get(`${cfg.baseUrl}/collection/v1_0/requesttopay/${transactionId}`, { headers });
    const data = await r.json() as any;
    logger.info(`[Collection:GetTransactionStatus]`, { transactionId, status: data?.status });
    return data;
}

export async function getBalance(cfg: MomoConfig, logger: Logger) {
    const token = await getAccessToken("collection", cfg, logger);
    const headers = {
        "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.collection!,
        "Authorization": `Bearer ${token}`,
        "X-Target-Environment": cfg.environment
    };
    const r = await ky.get(`${cfg.baseUrl}/collection/v1_0/account/balance`, { headers });
    const data = await r.json() as any;
    logger.info(`[Collection:GetAccountBalance]`, { currency: data?.currency, availableBalance: data?.availableBalance });
    return data;
}

export async function validateAccount(cfg: MomoConfig, logger: Logger, accountHolderId: string, accountHolderIdType = "msisdn") {
    const token = await getAccessToken("collection", cfg, logger);
    const headers = {
        "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.collection!,
        "Authorization": `Bearer ${token}`,
        "X-Target-Environment": cfg.environment
    };
    const r = await ky.get(`${cfg.baseUrl}/collection/v1_0/accountholder/${accountHolderIdType}/${accountHolderId}/active`, { headers });
    const data = await r.json() as any;
    logger.info(`[Collection:ValidateAccountHolderStatus]`, { accountHolderId, result: data?.result });
    return data;
}
