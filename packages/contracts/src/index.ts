import { z } from 'zod';
export const Role = z.enum(['ADMIN','MANAGER','TELECALLER','ADVISOR','ACCOUNTS']);
export type Role = z.infer<typeof Role>;
export const Pincode = z.string().regex(/^\d{6}$/);
export const Mobile = z.string().regex(/^\+91[6-9]\d{9}$/);
export const Paise = z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER);
export const Reference = z.string().min(1).max(200).refine(v=>v.trim()===v, 'Reference whitespace requires explicit bank mapping');
export const Employment = z.enum(['SALARIED','SELF_EMPLOYED','SELF_EMPLOYED_PROFESSIONAL']);
export const LeadInput = z.object({
 cardVersionId:z.string().uuid(), customerName:z.string().trim().min(1).max(150),
 mobile:Mobile, panVerificationId:z.string().uuid(), pincode:Pincode,
 employment:Employment, annualItrIncomePaise:Paise,
 consentEvidenceId:z.string().uuid(), bureauAcknowledgement:z.literal(true),
}).strict();
export const OtpRequest = z.object({mobile:Mobile,purpose:z.enum(['LOGIN','ADVISOR_SIGNUP'])}).strict();
export const PayoutSelection = z.object({entitlementIds:z.array(z.string().uuid()).min(1).max(100).refine(ids=>new Set(ids).size===ids.length,'Duplicate entitlement')}).strict();
export class DomainError extends Error {
 constructor(public readonly code:string, message:string) { super(message); this.name='DomainError'; }
}
export function requireRule(condition:unknown, code:string, message:string):asserts condition {
 if(!condition) throw new DomainError(code,message);
}
export function validInstant(value:string):number {
 const n=Date.parse(value);
 requireRule(Number.isFinite(n) && /(?:Z|[+-]\d{2}:\d{2})$/.test(value),'INVALID_TIME','An explicit timezone instant is required');
 return n;
}
