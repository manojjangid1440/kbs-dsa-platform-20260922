import test from 'node:test';
import assert from 'node:assert/strict';
import {LeadInput, Pincode, Reference, PayoutSelection, validInstant} from '../src/index.ts';
const lead={cardVersionId:'00000000-0000-4000-8000-000000000001',customerName:'Synthetic customer',mobile:'+919000000001',panVerificationId:'00000000-0000-4000-8000-000000000002',pincode:'012345',employment:'SALARIED',annualItrIncomePaise:50000000,consentEvidenceId:'00000000-0000-4000-8000-000000000003',bureauAcknowledgement:true};
test('strict lead input rejects injected bank facts and privileged role',()=>{
 assert.ok(LeadInput.safeParse(lead).success);
 for(const field of ['CURRENT_STAGE','FINAL_DECISION','activation','role','advisorId']) assert.equal(LeadInput.safeParse({...lead,[field]:'Approve'}).success,false);
});
test('reference and pincode preserve leading zeros; no number coercion',()=>{
 assert.equal(Pincode.parse('012345'),'012345'); assert.equal(Pincode.safeParse(12345).success,false);
 assert.equal(Reference.parse('00001'),'00001'); assert.equal(Reference.safeParse(' 00001').success,false);
});
test('consent and integral money required',()=>{
 assert.equal(LeadInput.safeParse({...lead,bureauAcknowledgement:false}).success,false);
 assert.equal(LeadInput.safeParse({...lead,annualItrIncomePaise:1.5}).success,false);
});
test('duplicate payout selection and ambiguous timestamps rejected',()=>{
 const id=lead.cardVersionId;assert.equal(PayoutSelection.safeParse({entitlementIds:[id,id]}).success,false);
 assert.throws(()=>validInstant('2026-09-22'),/timezone/);
});
