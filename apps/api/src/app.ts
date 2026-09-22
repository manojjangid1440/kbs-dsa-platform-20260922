import Fastify from "fastify";
import { randomUUID } from "node:crypto";
import { OtpRequest } from "@kbs/contracts";
import { capabilityReadiness } from "@kbs/config";
export function buildApp() {
  const app = Fastify({
    logger: false,
    bodyLimit: 64 * 1024,
    trustProxy: false,
    genReqId: () => randomUUID(),
  });
  app.addHook("onSend", async (_request, reply, payload) => {
    reply.header("X-Content-Type-Options", "nosniff");
    reply.header("Cache-Control", "no-store");
    return payload;
  });
  app.setErrorHandler((error, request, reply) => {
    const candidate = (error as { statusCode?: unknown }).statusCode;
    const status =
      typeof candidate === "number" && candidate >= 400 && candidate < 500
        ? candidate
        : 500;
    reply.code(status).send({
      error: {
        code: status < 500 ? "INVALID_REQUEST" : "INTERNAL_ERROR",
        message: "Request could not be processed",
        requestId: request.id,
      },
    });
  });
  app.get("/health/live", async () => ({
    status: "alive",
    service: "kbs-api",
    version: "0.1.0",
  }));
  app.get("/health/ready", async (_request, reply) =>
    reply
      .code(503)
      .send({ status: "not-ready", capabilities: capabilityReadiness }),
  );
  app.post("/v1/auth/otp/request", async (request, reply) => {
    if (!OtpRequest.safeParse(request.body).success)
      return reply.code(400).send({
        error: {
          code: "INVALID_INPUT",
          message: "Valid mobile and purpose required",
          requestId: request.id,
        },
      });
    return reply.code(503).send({
      error: {
        code: "OTP_NOT_CONFIGURED",
        message: "Sign-in is not available yet",
        requestId: request.id,
      },
    });
  });
  // No temporary role/header bypass. Replace with verified server sessions in F01/F02.
  app.all("/v1/*", async (request, reply) =>
    reply.code(401).send({
      error: {
        code: "UNAUTHENTICATED",
        message: "A verified session is required",
        requestId: request.id,
      },
    }),
  );
  return app;
}
