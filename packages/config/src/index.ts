import { z } from "zod";
const Environment = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  API_HOST: z.string().default("127.0.0.1"),
  API_PORT: z.coerce.number().int().min(1).max(65535).default(4000),
});
export function readConfig(env: Record<string, string | undefined>) {
  const config = Environment.parse(env);
  if (config.NODE_ENV === "production")
    throw new Error(
      "PRODUCTION_NOT_READY: real sessions, repositories, providers and approved policies are not implemented",
    );
  return config;
}
export const capabilityReadiness = {
  authentication: false,
  databaseRepositories: false,
  privateFiles: false,
  liveCalling: false,
  identityVerification: false,
  misPublication: false,
  payoutSettlement: false,
} as const;
