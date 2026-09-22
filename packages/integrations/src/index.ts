/** Ports only. No fake production provider or bank-status adapter. */
export type ProviderOutcome<T> =
  | { kind: "confirmed"; value: T; providerReference: string }
  | { kind: "pending"; providerReference: string }
  | { kind: "unavailable"; code: string };
export interface OtpProvider {
  request(input: {
    mobile: string;
    idempotencyKey: string;
  }): Promise<ProviderOutcome<{ challengeId: string; expiresAt: string }>>;
  verify(input: {
    challengeId: string;
    code: string;
  }): Promise<ProviderOutcome<{ verified: true }>>;
}
export interface TelephonyProvider {
  initiate(input: {
    customerId: string;
    actorId: string;
    consentEvidenceId: string;
    idempotencyKey: string;
  }): Promise<ProviderOutcome<{ callId: string }>>;
}
export interface PrivateAssetProvider {
  access(input: {
    assetId: string;
    actorId: string;
    purpose: string;
  }): Promise<ProviderOutcome<{ url: string; expiresAt: string }>>;
}
export const unavailableOtpProvider: OtpProvider = {
  async request() {
    return { kind: "unavailable", code: "OTP_PROVIDER_NOT_CONFIGURED" };
  },
  async verify() {
    return { kind: "unavailable", code: "OTP_PROVIDER_NOT_CONFIGURED" };
  },
};
