import { Hono } from "hono";
import { handle } from "hono/vercel";

import auth from "@/features/auth/server/route";

// export const runtime = "edge";

const app = new Hono().basePath("/api").route("/auth", auth);

export type AppType = typeof app;

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
