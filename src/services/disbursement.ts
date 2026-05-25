import ky from "ky";
import { newRefId } from "../utils/ids.js";
import { getAccessToken } from "../auth.js";
import { Logger } from "../logging/logger.js";
import { MomoConfig } from "../types.js";
import { getCurrency } from "../utils/service.js";

export async function transfer(cfg: MomoConfig, logger: Logger, params: { amount: number | string; beneficiaryPhone: string; currency?: string }) {

    const token = await getAccessToken("disbursement", cfg, logger);
    const ref = newRefId();
    const currency = getCurrency(cfg, params.currency);

    const headers = {
        "X-Reference-Id": ref,
        "X-Target-Environment": cfg.environment,
        "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.disbursement!,
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };

    const payload = {
        amount: String(params.amount),
        currency,
        externalId: ref,
        payee: { partyIdType: "MSISDN", partyId: params.beneficiaryPhone },
        payerMessage: "Disbursement request",
        payeeNote: "Here is your payment"
    };

    const r = await ky.post(`${cfg.baseUrl}/disbursement/v1_0/transfer`, {
        json: payload,
        headers
    });
    logger.info(`[Disbursement] Success`, { ref, amount: payload.amount, currency });
    return { referenceId: ref, mtnStatusCode: r.status, mtnStatusText: r.statusText, status: "REQUESTED" as const };
}

export async function getStatus(cfg: MomoConfig, logger: Logger, transactionId: string) {
    const token = await getAccessToken("disbursement", cfg, logger);
    const headers = {
        "Ocp-Apim-Subscription-Key": cfg.subscriptionKeys.disbursement!,
        "Authorization": `Bearer ${token}`,
        "X-Target-Environment": cfg.environment
    };
    const r = await ky.get(`${cfg.baseUrl}/disbursement/v1_0/transfer/${transactionId}`, { headers });
    const data = await r.json() as any;
    logger.info(`[GetDisbursementStatus]`, { transactionId, status: data?.status });
    return data;
}
