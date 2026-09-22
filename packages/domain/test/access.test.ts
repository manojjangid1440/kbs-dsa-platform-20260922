import test from 'node:test';import assert from 'node:assert/strict';
import {authorize,enforceCustomerAccess,type Principal} from '../src/access.ts';
const a:Principal={id:'a',organizationId:'org',role:'ADVISOR',active:true};
const now='2026-09-22T10:00:00Z';
test('own data and organization role boundaries enforced',()=>{
 authorize(a,'lead.read',{organizationId:'org',ownerId:'a'});
 assert.throws(()=>authorize(a,'lead.read',{organizationId:'org',ownerId:'b'}));
 assert.throws(()=>authorize({...a,role:'ADMIN'},'lead.read',{organizationId:'other'}));
 assert.throws(()=>authorize({...a,role:'ACCOUNTS'},'mis.import',{organizationId:'org'}));
 assert.throws(()=>authorize({...a,role:'ADMIN'},'telecaller.create',{organizationId:'org'}));
});
test('assigned manager alone may reactivate',()=>{
 authorize({...a,role:'MANAGER'},'training.reactivate',{organizationId:'org',managerId:'a'});
 assert.throws(()=>authorize({...a,role:'MANAGER'},'training.reactivate',{organizationId:'org',managerId:'b'}));
});
test('Advisor works offsite while Telecaller requires training and verified network',()=>{
 const c={trainingComplete:false,officeNetworkVerified:false};enforceCustomerAccess(a,c,now);
 assert.throws(()=>enforceCustomerAccess({...a,role:'TELECALLER'},c,now));
 assert.throws(()=>enforceCustomerAccess({...a,role:'TELECALLER'},{...c,trainingComplete:true},now));
});
test('WFH expires at exact boundary and cannot be borrowed or revoked',()=>{
 const t={...a,role:'TELECALLER' as const};
 const c={trainingComplete:true,officeNetworkVerified:false,wfh:{userId:'a',organizationId:'org',startsAt:'2026-09-22T09:00:00Z',expiresAt:'2026-09-22T11:00:00Z',revoked:false}};
 enforceCustomerAccess(t,c,now);
 for(const wfh of [{...c.wfh,expiresAt:now},{...c.wfh,userId:'b'},{...c.wfh,revoked:true}]) assert.throws(()=>enforceCustomerAccess(t,{...c,wfh},now));
});
