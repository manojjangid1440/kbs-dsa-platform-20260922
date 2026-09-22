import {buildApp} from './app.ts';import {readConfig} from '@kbs/config';
const config=readConfig(process.env);const app=buildApp();
await app.listen({host:config.API_HOST,port:config.API_PORT});
for(const signal of ['SIGINT','SIGTERM'] as const) process.on(signal,()=>{void app.close().then(()=>process.exit(0));});
