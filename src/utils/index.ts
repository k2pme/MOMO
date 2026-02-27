import { MomoConfig } from "../types";

export const isProduction = (cfg: MomoConfig) => cfg.environment === "production";