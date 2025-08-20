import { Logger } from "./logging/logger.js";
import { MomoConfig, MtnProduct } from "./types.js";
export declare function getAccessToken(product: MtnProduct, cfg: MomoConfig, logger: Logger): Promise<string>;
