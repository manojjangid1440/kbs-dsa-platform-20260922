import { readConfig } from "@kbs/config";
readConfig(process.env);
console.error(
  "Worker foundation only: durable queue and handlers are not configured. No jobs consumed.",
);
process.exitCode = 1;
