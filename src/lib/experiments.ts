import { logger } from "@/lib/logger";

export interface FeatureFlags {
  enable_2step_form: boolean;
  enable_mobile_sticky_cta: boolean;
  enable_json_ld_schema: boolean;
  hero_cta_variant: "default" | "urgency" | "social_proof";
}

const DEFAULT_FLAGS: FeatureFlags = {
  enable_2step_form: false,
  enable_mobile_sticky_cta: false,
  enable_json_ld_schema: true,
  hero_cta_variant: "default",
};

export class ExperimentManager {
  private flags: FeatureFlags = { ...DEFAULT_FLAGS };

  public getFlag<K extends keyof FeatureFlags>(key: K): FeatureFlags[K] {
    return this.flags[key];
  }

  public setFlag<K extends keyof FeatureFlags>(key: K, value: FeatureFlags[K]): void {
    logger.info(`Feature Flag Changed: ${String(key)} = ${String(value)}`, "ExperimentManager");
    this.flags[key] = value;
  }

  public getVariant(experimentKey: string, defaultValue = "control"): string {
    logger.info(`Experiment Variant Requested: ${experimentKey}`, "ExperimentManager");
    return defaultValue;
  }
}

export const experiments = new ExperimentManager();
