import test from 'node:test';import assert from 'node:assert/strict';import {buildApp} from '../src/app.ts';
test('live does not falsely report functional readiness',async()=>{
 const app=buildApp();try{
 assert.equal((await app.inject('/health/live')).statusCode,200);
 const ready=await app.inject('/health/ready');assert.equal(ready.statusCode,503);assert.equal(ready.json().capabilities.authentication,false);
 }finally{await app.close();}
});
test('protected routes reject forged role and arbitrary bearer token',async()=>{
 const app=buildApp();try{for(const url of ['/v1/leads','/v1/payments/ready','/v1/imports/mis']){
 const res=await app.inject({url,headers:{'x-role':'ADMIN',authorization:'Bearer forged'}});assert.equal(res.statusCode,401);assert.equal(res.headers['cache-control'],'no-store');
 }}finally{await app.close();}
});
test('OTP boundary validates but never pretends provider success or echoes PII',async()=>{
 const app=buildApp();try{
 assert.equal((await app.inject({method:'POST',url:'/v1/auth/otp/request',payload:{mobile:'invalid',purpose:'LOGIN'}})).statusCode,400);
 const res=await app.inject({method:'POST',url:'/v1/auth/otp/request',payload:{mobile:'+919000000001',purpose:'LOGIN'}});
 assert.equal(res.statusCode,503);assert.equal(res.body.includes('9000000001'),false);
 }finally{await app.close();}
});
