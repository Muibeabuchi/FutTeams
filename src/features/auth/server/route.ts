import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema } from "../schemas";

const validator = zValidator("json", loginSchema);

const app = new Hono().post("/login", validator, async (c) => {
  const { email, password } = c.req.valid("json");
  console.log(email, password);
  return c.json({ email, password });
});

export default app;
