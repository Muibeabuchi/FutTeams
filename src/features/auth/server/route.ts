import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, signupSchema } from "../schemas";

const validator = zValidator("json", loginSchema);
const signupValidator = zValidator("json", signupSchema);

const app = new Hono()
  .post("/login", validator, async (c) => {
    const { email, password } = c.req.valid("json");
    console.log(email, password);
    return c.json({ email, password });
  })
  .post("/register", signupValidator, async (c) => {
    const { email, password, name } = c.req.valid("json");

    return c.json({
      email,
      name,
      password,
    });
  });
export default app;
