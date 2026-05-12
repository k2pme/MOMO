import ky from "ky";
import { newRefId } from "../utils/ids.js";
import { getAccessToken } from "../auth.js";
import { Logger } from "../logging/logger.js";
import { MomoConfig } from "../types.js";
import { getCurrency } from "../utils/service.js";

export async function cashTransfer(cfg: MomoConfig, logger: Logger, params: { amount: number | string; beneficiaryPhone: string; currency?: string }) {
    const token = await getAccessToken("remittance", cfg, logger);
    const ref = newRefId();
    const currency = getCurrency(cfg, params.currency);

    const headers = {
        "X-Reference-Id": ref,
        "X-Target-Environment": cfg.environment,
        "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.remittance!,
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };

    const payload = {
        amount: String(params.amount),
        currency,
        externalId: ref,
        payee: { partyIdType: "MSISDN", partyId: params.beneficiaryPhone },
        payerMessage: "Remittance request",
        payeeNote: "Here is your remittance payment"
    };

    const r = await ky.post(`${cfg.baseUrl}/remittance/v1_0/transfer`, {
        json: payload,
        headers
    });
    logger.info(`[Remittance:CashTransfer] Success`, { ref, amount: payload.amount, currency });
    return { referenceId: ref, mtnStatusCode: r.status, mtnStatusText: r.statusText, status: "REQUESTED" as const };
}

export async function getTransferStatus(cfg: MomoConfig, logger: Logger, transactionId: string) {
    const token = await getAccessToken("remittance", cfg, logger);
    const headers = {
        "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.remittance!,
        "Authorization": `Bearer ${token}`,
        "X-Target-Environment": cfg.environment
    };
    const r = await ky.get(`${cfg.baseUrl}/remittance/v1_0/transfer/${transactionId}`, { headers });
    const data = await r.json();
    logger.info(`[Remittance:GetTransferStatus]`, { transactionId, status: (data as any)?.status });
    return data;
}

export async function getAccountBalance(cfg: MomoConfig, logger: Logger) {
    const token = await getAccessToken("remittance", cfg, logger);
    const headers = {
        "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.remittance!,
        "Authorization": `Bearer ${token}`,
        "X-Target-Environment": cfg.environment
    };
    const r = await ky.get(`${cfg.baseUrl}/remittance/v1_0/account/balance`, { headers });
    const data = await r.json();
    logger.info(`[Remittance:GetAccountBalance]`, { currency: (data as any)?.currency, availableBalance: (data as any)?.availableBalance });
    return data;
}
