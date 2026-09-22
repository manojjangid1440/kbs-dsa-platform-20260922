import test from 'node:test';import assert from 'node:assert/strict';
import {startTraining,trainingState,currentModule,assess,reactivate} from '../src/training.ts';
const at='2026-09-22T18:30:00Z';
test('first login has exactly 72 elapsed hours and is never reset',()=>{
 const e=startTraining('t','m',at);assert.equal(e.deadline,'2026-09-25T18:30:00.000Z');
 assert.equal(startTraining('t','m','2026-09-23T00:00:00Z',e),e);
 assert.equal(trainingState(e,e.deadline),'OVERDUE');
});
test('sequential marks pass persist and incomplete deadline blocks submission',()=>{
 let e=startTraining('t','m',at);
 assert.throws(()=>assess(e,{module:2,correct:10,total:10,passingPercent:80,now:at}));
 e=assess(e,{module:1,correct:8,total:10,passingPercent:80,now:at});
 assert.equal(currentModule(e),2);
 assert.equal(assess(e,{module:2,correct:7,total:10,passingPercent:80,now:at}),e);
 assert.throws(()=>assess(e,{module:2,correct:10,total:10,passingPercent:80,now:e.deadline}));
});
test('reactivation preserves passes and original deadline; requires assigned Manager and explicit window',()=>{
 let e=startTraining('t','m',at);e=assess(e,{module:1,correct:1,total:1,passingPercent:100,now:at});
 const input={managerId:'m',now:e.deadline,reason:'Additional approved training window',windowHours:12};
 assert.throws(()=>reactivate(e,{...input,managerId:'other'}));assert.throws(()=>reactivate(e,{...input,windowHours:0}));
 const next=reactivate(e,input);assert.equal(currentModule(next),2);assert.equal(next.originalDeadline,e.deadline);
 assert.equal(validHours(next.deadline,e.deadline),12);
});
function validHours(a:string,b:string){return (Date.parse(a)-Date.parse(b))/3600000;}
test('complete enrollment remains complete after original deadline',()=>{
 let e=startTraining('t','m',at);for(const module of [1,2,3])e=assess(e,{module,correct:1,total:1,passingPercent:100,now:at});
 assert.equal(trainingState(e,'2026-10-01T00:00:00Z'),'COMPLETE');
});
