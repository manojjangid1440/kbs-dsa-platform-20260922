# ADR 001 One modular monorepo

Status: accepted engineering choice. Date: 2026-09-22.

Use npm workspaces, TypeScript, Next.js/shadcn web, Expo React Native Android, Fastify API, separate worker and PostgreSQL. Share domain/contracts/tokens, not platform screens. The requested fresh repo and core-first sequence are mandatory.

Alternatives: independent repositories multiply policy drift; prematurely separated microservices add deployment/transaction cost. One web-only site cannot satisfy Android telephony/device needs. Expo permits native configuration/builds and must not be mistaken for a browser wrapper. This ADR selects architecture, not a live host or vendor.
