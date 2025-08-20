import { Logger } from "./logging/logger.js";
import { MtnProduct, MomoConfig, ProvisionedCreds } from "./types.js";
export declare function provisionApiUserAndKey(product: MtnProduct, cfg: MomoConfig, logger: Logger): Promise<ProvisionedCreds>;
