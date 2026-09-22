import {DomainError} from '@kbs/contracts';
export type JobKind='MIS_IMPORT'|'NOTIFICATION'|'TRAINING_DEADLINE'|'RECONCILIATION';
export interface JobEnvelope {id:string;kind:JobKind;organizationId:string;idempotencyKey:string;}
export async function executeJob(_job:JobEnvelope):Promise<never>{
 throw new DomainError('WORKER_NOT_CONFIGURED','Durable job repository and approved handlers are required');
}
