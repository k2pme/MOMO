import { isProduction } from ".";
import { MomoConfig } from "../types";

export const getCurrency = (cfg: MomoConfig, currency?: string) => {
    if (!isProduction(cfg)) return 'EUR';

    return currency ?? 'XAF';
}