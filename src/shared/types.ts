// Use for any secret values that might flow into telemetry to ensure masking.
export type MaskedString = string & { __masked: true };

export interface PublishContext {
  credentialsMissing: boolean;
}
