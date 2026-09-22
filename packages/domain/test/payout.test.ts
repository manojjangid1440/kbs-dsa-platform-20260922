import test from 'node:test';import assert from 'node:assert/strict';
import {deriveEntitlement,reserve,approve,settle,availableCount,type PayoutRule} from '../src/payout.ts';
import type {Principal} from '../src/access.ts';
const now='2026-09-22T10:00:00Z';
// Synthetic rule tests mechanics only; not a production KBS rate or trigger.
const rule:PayoutRule={approved:true,version:'synthetic',bankId:'b',cardId:'c',allowedActivationValues:['SYNTHETIC_EVENT'],amountPaise:10000,effectiveFrom:'2026-01-01T00:00:00Z',effectiveUntil:'2027-01-01T00:00:00Z'};
const input={id:'e',organizationId:'org',ownerKind:'ADVISOR' as const,advisorId:'a',bankId:'b',cardId:'c',eventKey:'bank-approved-event',misRowId:'r',rawActivation:'SYNTHETIC_EVENT',now};
const advisor:Principal={id:'a',organizationId:'org',role:'ADVISOR',active:true};
const manager:Principal={...advisor,id:'m',role:'MANAGER'},admin:Principal={...advisor,id:'o',role:'ADMIN'},accounts:Principal={...advisor,id:'f',role:'ACCOUNTS'};
const payment={id:'p',reference:'TX-001',amountPaise:10000,paidAt:now,proofAssetId:'proof',proofClean:true};
const setup=()=>reserve(advisor,'claim',[deriveEntitlement(input,rule)],'m','o');
test('no commercial policy, approval or unknown activation can create payable event',()=>{
 assert.throws(()=>deriveEntitlement(input,null));
 for(const rawActivation of ['Approve','INACTIVE','#N/A','V + ACTIVE','TXN ACTIVE - Rs 100',null])assert.throws(()=>deriveEntitlement({...input,rawActivation},rule));
 assert.throws(()=>deriveEntitlement({...input,ownerKind:'TELECALLER'},rule));
});
test('reservation removes availability and blocks duplicate or other-owner claim',()=>{
 const {events}=setup();assert.equal(availableCount(events),0);assert.throws(()=>reserve(advisor,'second',events,'m','o'));
 const e=deriveEntitlement(input,rule);assert.throws(()=>reserve(advisor,'claim',[e,e],'m','o'));
 assert.throws(()=>reserve({...advisor,id:'other'},'claim',[e],'m','o'));
});
test('direct Admin hierarchy cannot skip independent Manager',()=>{
 const e=deriveEntitlement(input,rule);assert.throws(()=>reserve(advisor,'c',[e],null,'o'));assert.throws(()=>reserve(advisor,'c',[e],'o','o'));
});
test('both distinct role approvals required; order not imposed',()=>{
 const {claim,events}=setup();const first=approve(claim,admin,events,now);assert.equal(first.state,'PENDING');
 assert.throws(()=>settle(first,accounts,events,payment,[]));assert.throws(()=>approve(first,admin,events,now));
 assert.equal(approve(first,manager,events,now).state,'APPROVED');
 assert.throws(()=>approve(claim,{...manager,id:'other'},events,now));
});
test('correction or hold blocks stale approval and settlement',()=>{
 const {claim,events}=setup();const changed=events.map(e=>({...e,misRowId:'corrected'}));assert.throws(()=>approve(claim,manager,changed,now));
 const full=approve(approve(claim,manager,events,now),admin,events,now);
 assert.throws(()=>settle(full,accounts,events.map(e=>({...e,hold:true})),payment,[]));
});
test('full payment requires clean proof and unique transaction; paid cannot be reclaimed',()=>{
 const {claim,events}=setup();const full=approve(approve(claim,manager,events,now),admin,events,now);
 assert.throws(()=>settle(full,accounts,events,{...payment,proofClean:false},[]));
 assert.throws(()=>settle(full,accounts,events,{...payment,amountPaise:1},[]));
 const paid=settle(full,accounts,events,payment,[]);assert.equal(paid.claim.state,'PAID');assert.equal(availableCount(paid.events),0);
 assert.throws(()=>settle(full,accounts,events,payment,[paid.payment]));assert.throws(()=>reserve(advisor,'second',paid.events,'m','o'));
 assert.equal(events[0]?.misRowId,paid.events[0]?.misRowId);assert.equal(events[0]?.paidBy,null);
});
