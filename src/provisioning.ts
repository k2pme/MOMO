import axios from "axios";
import { newRefId } from "./utils/ids.js";
import { Logger } from "./logging/logger.js";
import { MtnProduct, MomoConfig, ProvisionedCreds } from "./types.js";

const configStore: Record<MtnProduct, ProvisionedCreds | undefined> = {
    collection: undefined, disbursement: undefined, remittance: undefined
};

export async function provisionApiUserAndKey(product: MtnProduct, cfg: MomoConfig, logger: Logger): Promise<ProvisionedCreds> {

    if (configStore[product]) return configStore[product]!;

    const subKey =
        product === "collection"   ? cfg.subscriptionKeys.collection :
            product === "disbursement" ? cfg.subscriptionKeys.disbursement :
                cfg.subscriptionKeys.remittance;

    if (!subKey) throw new Error(`Missing subscriptionKey for product ${product}`);

    const apiUser = newRefId();
    console.log(subKey, apiUser);
    // 1) Create API User
    await axios.post(
        `${cfg.baseUrl}/v1_0/apiuser`,
        { providerCallbackHost: cfg.callbackHost ?? "string" },
        { headers: { "X-Reference-Id": apiUser, "Ocp-Apim-Subscription-Key": subKey, "Cache-Control": cfg.cacheControl } }
    );

    logger.info(`[${product}] API User created`, { apiUser });



    // 2) Wait a bit & create API Key
    await new Promise(res => setTimeout(res, 2000));

    const resp = await axios.post(
        `${cfg.baseUrl}/v1_0/apiuser/${apiUser}/apikey`,
        {},
        { headers: { "Ocp-Apim-Subscription-Key": subKey } }
    );

    const apiKey = resp.data.apiKey as string;
    logger.info(`[${product}] API Key created`);

    const creds = { apiUser, apiKey };
    configStore[product] = creds;
    return creds;
}
