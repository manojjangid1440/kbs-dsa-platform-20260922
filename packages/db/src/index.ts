export const coreMigrationUrl=new URL('../migrations/001_core.sql',import.meta.url);
/** Baseline schema only. No production repository or unrestricted query API is exported. */
export const repositoryReadiness=false;
