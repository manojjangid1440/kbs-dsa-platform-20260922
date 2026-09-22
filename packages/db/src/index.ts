export const coreMigrationUrl = new URL(
  "../migrations/001_core.sql",
  import.meta.url,
);
/** Baseline schema only. No production repository or unrestricted query API is exported. */
export const repositoryReadiness = false;
export const otpMigrationUrl = new URL(
  "../migrations/002_otp_challenges.sql",
  import.meta.url,
);
export { OtpChallenges } from "./otp-challenges.ts";
export { postgresDatabase } from "./transaction.ts";
export type { SqlTransaction, TransactionalDatabase } from "./transaction.ts";
