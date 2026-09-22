import { requireRule, validInstant } from "@kbs/contracts";
export interface Enrollment {
  userId: string;
  managerId: string;
  firstLoginAt: string;
  originalDeadline: string;
  deadline: string;
  passed: readonly number[];
  reactivations: readonly {
    actorId: string;
    at: string;
    reason: string;
    deadline: string;
  }[];
}
const hours = 3_600_000;
export function startTraining(
  userId: string,
  managerId: string,
  now: string,
  existing?: Enrollment,
): Enrollment {
  if (existing) {
    requireRule(
      existing.userId === userId && existing.managerId === managerId,
      "ENROLLMENT_MISMATCH",
      "Enrollment identity differs",
    );
    return existing;
  }
  const deadline = new Date(validInstant(now) + 72 * hours).toISOString();
  return {
    userId,
    managerId,
    firstLoginAt: now,
    originalDeadline: deadline,
    deadline,
    passed: [],
    reactivations: [],
  };
}
export function currentModule(e: Enrollment): number | null {
  return [1, 2, 3].find((m) => !e.passed.includes(m)) ?? null;
}
export function trainingState(
  e: Enrollment,
  now: string,
): "COMPLETE" | "OVERDUE" | "IN_PROGRESS" {
  if (currentModule(e) === null) return "COMPLETE";
  return validInstant(now) >= validInstant(e.deadline)
    ? "OVERDUE"
    : "IN_PROGRESS";
}
/** Score counts come from server-side marking, never the client's claimed score. */
export function assess(
  e: Enrollment,
  input: {
    module: number;
    correct: number;
    total: number;
    passingPercent: number;
    now: string;
  },
): Enrollment {
  requireRule(
    trainingState(e, input.now) === "IN_PROGRESS",
    "TRAINING_UNAVAILABLE",
    "Training is complete or overdue",
  );
  requireRule(
    input.module === currentModule(e),
    "MODULE_ORDER",
    "Complete modules in order",
  );
  requireRule(
    Number.isInteger(input.correct) &&
      Number.isInteger(input.total) &&
      input.total > 0 &&
      input.correct >= 0 &&
      input.correct <= input.total,
    "INVALID_SCORE",
    "Invalid marked score",
  );
  requireRule(
    Number.isFinite(input.passingPercent) &&
      input.passingPercent > 0 &&
      input.passingPercent <= 100,
    "POLICY_REQUIRED",
    "Configured passing threshold required",
  );
  return input.correct * 100 >= input.total * input.passingPercent
    ? { ...e, passed: [...e.passed, input.module] }
    : e;
}
export function reactivate(
  e: Enrollment,
  input: {
    managerId: string;
    now: string;
    reason: string;
    windowHours: number;
  },
): Enrollment {
  requireRule(
    input.managerId === e.managerId,
    "FORBIDDEN",
    "Assigned Manager required",
  );
  requireRule(
    trainingState(e, input.now) === "OVERDUE",
    "NOT_OVERDUE",
    "Only overdue incomplete training can be reactivated",
  );
  requireRule(
    input.reason.trim().length > 0 &&
      Number.isFinite(input.windowHours) &&
      input.windowHours > 0,
    "POLICY_REQUIRED",
    "Reason and approved reactivation window required",
  );
  const deadline = new Date(
    validInstant(input.now) + input.windowHours * hours,
  ).toISOString();
  return {
    ...e,
    deadline,
    reactivations: [
      ...e.reactivations,
      {
        actorId: input.managerId,
        at: input.now,
        reason: input.reason,
        deadline,
      },
    ],
  };
}
