import test from 'node:test'; import assert from 'node:assert/strict';
import {readConfig,capabilityReadiness} from '../src/index.ts';
test('invalid runtime configuration fails closed',()=>{
 assert.throws(()=>readConfig({API_PORT:'oops'}));assert.throws(()=>readConfig({NODE_ENV:'production'}),/PRODUCTION_NOT_READY/);
 assert.equal(readConfig({}).API_HOST,'127.0.0.1'); assert.equal(Object.values(capabilityReadiness).some(Boolean),false);
});
