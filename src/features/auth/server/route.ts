import { Hono } from "hono";
import { ID } from "node-appwrite";
import { deleteCookie, setCookie } from "hono/cookie";

import { loginSchema, signupSchema } from "../schemas";
import { zValidator } from "@hono/zod-validator";
import { createAdminClient } from "@/lib/appwrite";
import { AUTH_COOKIE } from "../constants";

const validator = zValidator("json", loginSchema);
const signupValidator = zValidator("json", signupSchema);

const app = new Hono()
  .post("/login", validator, async (c) => {
    const { email, password } = c.req.valid("json");
    const { account } = createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: Number(session.expire) || 60 * 60 * 24 * 30,
    });

    return c.json({ success: true }, 201);
  })
  .post("/register", signupValidator, async (c) => {
    const { email, password, name } = c.req.valid("json");
    const { account } = createAdminClient();
    await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: Number(session.expire) || 60 * 60 * 24 * 30,
    });

    return c.json({ success: true }, 201);
  })
  .post("/logout", async (c) => {
    deleteCookie(c, AUTH_COOKIE);
    // const { account } = createAdminClient();
    // await account.deleteSession("current");
    // return c.json({
    //   success: true,
    // });
  });
export default app;
