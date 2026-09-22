import { requireRule, validInstant, type Role } from "@kbs/contracts";
export interface Principal {
  id: string;
  organizationId: string;
  role: Role;
  active: boolean;
}
export interface ResourceScope {
  organizationId: string;
  ownerId?: string;
  managerId?: string;
}
export type Action =
  | "lead.read"
  | "customer.read"
  | "mis.import"
  | "telecaller.create"
  | "training.reactivate"
  | "payout.request"
  | "payout.manager-approve"
  | "payout.admin-approve"
  | "payment.record";
const allowed: Record<Action, readonly Role[]> = {
  "lead.read": ["ADMIN", "MANAGER", "ADVISOR"],
  "customer.read": ["ADMIN", "MANAGER", "TELECALLER"],
  "mis.import": ["ADMIN"],
  "telecaller.create": ["MANAGER"],
  "training.reactivate": ["MANAGER"],
  "payout.request": ["ADVISOR"],
  "payout.manager-approve": ["MANAGER"],
  "payout.admin-approve": ["ADMIN"],
  "payment.record": ["ACCOUNTS"],
};
/** Principal, relationships and verified network context must come from trusted server repositories. */
export function authorize(
  actor: Principal,
  action: Action,
  resource: ResourceScope,
): void {
  requireRule(
    actor.active && actor.organizationId === resource.organizationId,
    "FORBIDDEN",
    "Access denied",
  );
  requireRule(
    allowed[action].includes(actor.role),
    "FORBIDDEN",
    "Access denied",
  );
  if (actor.role === "MANAGER" && action !== "telecaller.create")
    requireRule(resource.managerId === actor.id, "FORBIDDEN", "Access denied");
  if (actor.role === "ADVISOR" || actor.role === "TELECALLER")
    requireRule(resource.ownerId === actor.id, "FORBIDDEN", "Access denied");
}
export interface TelecallerContext {
  trainingComplete: boolean;
  officeNetworkVerified: boolean;
  wfh?: {
    userId: string;
    organizationId: string;
    startsAt: string;
    expiresAt: string;
    revoked: boolean;
  };
}
export function enforceCustomerAccess(
  actor: Principal,
  context: TelecallerContext,
  now: string,
): void {
  requireRule(actor.active, "FORBIDDEN", "Account inactive");
  if (actor.role !== "TELECALLER") return;
  requireRule(
    context.trainingComplete,
    "TRAINING_REQUIRED",
    "Training must be complete",
  );
  const at = validInstant(now),
    g = context.wfh;
  const wfh =
    g &&
    !g.revoked &&
    g.userId === actor.id &&
    g.organizationId === actor.organizationId &&
    validInstant(g.startsAt) <= at &&
    at < validInstant(g.expiresAt);
  requireRule(
    context.officeNetworkVerified || wfh,
    "OFFICE_ACCESS_REQUIRED",
    "Approved office network or active WFH grant required",
  );
}
