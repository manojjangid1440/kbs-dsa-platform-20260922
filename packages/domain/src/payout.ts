import {requireRule,validInstant} from '@kbs/contracts';
import type {Principal} from './access.ts';
export interface PayoutRule {approved:boolean;version:string;bankId:string;cardId:string;allowedActivationValues:readonly string[];amountPaise:number;effectiveFrom:string;effectiveUntil:string;}
export interface Entitlement {id:string;organizationId:string;advisorId:string;bankId:string;cardId:string;eventKey:string;misRowId:string;ruleVersion:string;amountPaise:number;eligible:boolean;hold:boolean;reservedBy:string|null;paidBy:string|null;}
export function deriveEntitlement(input:{id:string;organizationId:string;ownerKind:'ADVISOR'|'TELECALLER';advisorId:string;bankId:string;cardId:string;eventKey:string;misRowId:string;rawActivation:string|null;now:string},rule:PayoutRule|null):Entitlement {
 requireRule(input.ownerKind==='ADVISOR','NO_TELECALLER_COMMISSION','Only Advisor events create entitlement');
 requireRule(rule?.approved&&rule.version,'POLICY_REQUIRED','Approved commercial rule required');
 const at=validInstant(input.now);
 requireRule(rule.bankId===input.bankId&&rule.cardId===input.cardId&&validInstant(rule.effectiveFrom)<=at&&at<validInstant(rule.effectiveUntil),'RULE_NOT_APPLICABLE','No applicable rule');
 requireRule(input.rawActivation!==null&&input.rawActivation!==''&&input.rawActivation!=='#N/A'&&rule.allowedActivationValues.includes(input.rawActivation),'NOT_ELIGIBLE','MIS activation does not meet approved trigger');
 requireRule(Number.isSafeInteger(rule.amountPaise)&&rule.amountPaise>0&&input.eventKey.length>0&&input.misRowId.length>0,'INVALID_ENTITLEMENT','Unique evidence and integer positive rate required');
 return {id:input.id,organizationId:input.organizationId,advisorId:input.advisorId,bankId:input.bankId,cardId:input.cardId,eventKey:input.eventKey,misRowId:input.misRowId,ruleVersion:rule.version,amountPaise:rule.amountPaise,eligible:true,hold:false,reservedBy:null,paidBy:null};
}
export interface Approval {actorId:string;role:'MANAGER'|'ADMIN';revision:number;at:string;}
export interface Claim {id:string;organizationId:string;advisorId:string;managerId:string;adminId:string;revision:number;amountPaise:number;items:readonly {entitlementId:string;amountPaise:number;misRowId:string;ruleVersion:string}[];approvals:readonly Approval[];state:'PENDING'|'APPROVED'|'HOLD'|'PAID';}
function usable(e:Entitlement){requireRule(e.eligible&&!e.hold&&!e.paidBy,'NOT_ELIGIBLE','Entitlement unavailable');}
/** Pure transition only: repository MUST lock rows and commit results atomically. */
export function reserve(actor:Principal,id:string,events:readonly Entitlement[],managerId:string|null,adminId:string):{claim:Claim;events:Entitlement[]} {
 requireRule(actor.active&&actor.role==='ADVISOR','FORBIDDEN','Advisor required');
 requireRule(managerId&&managerId!==adminId&&managerId!==actor.id&&adminId!==actor.id,'APPROVER_REQUIRED','Distinct independent Manager and Admin required');
 requireRule(id.length>0&&events.length>0&&new Set(events.map(e=>e.id)).size===events.length&&new Set(events.map(e=>`${e.bankId}:${e.eventKey}`)).size===events.length,'INVALID_SELECTION','Unique events required');
 for(const e of events){usable(e);requireRule(e.organizationId===actor.organizationId&&e.advisorId===actor.id&&!e.reservedBy,'CLAIM_CONFLICT','Event is not owned or already reserved');}
 const amountPaise=events.reduce((n,e)=>n+e.amountPaise,0);requireRule(Number.isSafeInteger(amountPaise)&&amountPaise>0,'INVALID_AMOUNT','Invalid total');
 return {claim:{id,organizationId:actor.organizationId,advisorId:actor.id,managerId,adminId,revision:1,amountPaise,items:events.map(e=>({entitlementId:e.id,amountPaise:e.amountPaise,misRowId:e.misRowId,ruleVersion:e.ruleVersion})),approvals:[],state:'PENDING'},events:events.map(e=>({...e,reservedBy:id}))};
}
function validateEvidence(claim:Claim,events:readonly Entitlement[]):void {
 requireRule(events.length===claim.items.length&&new Set(events.map(e=>e.id)).size===events.length,'EVIDENCE_MISMATCH','Complete unique evidence required');
 for(const item of claim.items){const e=events.find(x=>x.id===item.entitlementId);requireRule(e,'EVIDENCE_MISMATCH','Missing event');usable(e);requireRule(e.organizationId===claim.organizationId&&e.advisorId===claim.advisorId&&e.reservedBy===claim.id&&e.misRowId===item.misRowId&&e.ruleVersion===item.ruleVersion&&e.amountPaise===item.amountPaise,'EVIDENCE_CHANGED','Re-review changed evidence');}
}
export function approve(claim:Claim,actor:Principal,events:readonly Entitlement[],now:string):Claim {
 validInstant(now);requireRule(actor.active&&actor.organizationId===claim.organizationId,'FORBIDDEN','Access denied');
 requireRule(claim.state==='PENDING','INVALID_TRANSITION','Request not pending');validateEvidence(claim,events);
 requireRule((actor.role==='MANAGER'&&actor.id===claim.managerId)||(actor.role==='ADMIN'&&actor.id===claim.adminId),'FORBIDDEN','Designated approver required');
 requireRule(!claim.approvals.some(a=>a.role===actor.role||a.actorId===actor.id),'DUPLICATE_APPROVAL','Distinct approval required');
 const approvals=[...claim.approvals,{actorId:actor.id,role:actor.role as 'MANAGER'|'ADMIN',revision:claim.revision,at:now}];
 return {...claim,approvals,state:approvals.length===2?'APPROVED':'PENDING'};
}
export interface ExternalPayment {id:string;requestId:string;reference:string;amountPaise:number;paidAt:string;proofAssetId:string;recordedBy:string;}
export function settle(claim:Claim,actor:Principal,events:readonly Entitlement[],input:{id:string;reference:string;amountPaise:number;paidAt:string;proofAssetId:string;proofClean:boolean},existingPayments:readonly ExternalPayment[]):{claim:Claim;events:Entitlement[];payment:ExternalPayment} {
 requireRule(actor.active&&actor.role==='ACCOUNTS'&&actor.organizationId===claim.organizationId,'FORBIDDEN','Accounts required');
 requireRule(claim.state==='APPROVED'&&claim.approvals.some(a=>a.role==='MANAGER'&&a.actorId===claim.managerId&&a.revision===claim.revision)&&claim.approvals.some(a=>a.role==='ADMIN'&&a.actorId===claim.adminId&&a.revision===claim.revision)&&claim.managerId!==claim.adminId,'APPROVALS_REQUIRED','Both distinct current approvals required');
 validateEvidence(claim,events);validInstant(input.paidAt);
 requireRule(input.amountPaise===claim.amountPaise&&Number.isSafeInteger(input.amountPaise),'AMOUNT_MISMATCH','Full approved amount required');
 requireRule(input.proofClean&&input.proofAssetId.length>0,'PROOF_REQUIRED','Clean authorized payment proof required');
 requireRule(input.id.length>0&&input.reference.trim().length>0&&input.reference===input.reference.trim(),'INVALID_PAYMENT','Payment ID and exact reference required');
 requireRule(!existingPayments.some(p=>p.requestId===claim.id||p.reference===input.reference||p.id===input.id),'DUPLICATE_PAYMENT','Payment already recorded');
 return {claim:{...claim,state:'PAID'},events:events.map(e=>({...e,reservedBy:null,paidBy:input.id})),payment:{id:input.id,requestId:claim.id,reference:input.reference,amountPaise:input.amountPaise,paidAt:input.paidAt,proofAssetId:input.proofAssetId,recordedBy:actor.id}};
}
export function availableCount(events:readonly Entitlement[]):number{return events.filter(e=>e.eligible&&!e.hold&&!e.reservedBy&&!e.paidBy).length;}
