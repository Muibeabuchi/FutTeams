import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createWorkspaceSchema } from "../schema";
import { sessionMiddleware } from "@/lib/session-middleware";
import { AppwriteEnvData } from "@/lib/constants";
import { ID } from "node-appwrite";

const app = new Hono().post(
  "/",
  zValidator("json", createWorkspaceSchema),
  sessionMiddleware,
  async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");
    const { name } = c.req.valid("json");

    const workspace = await databases.createDocument(
      AppwriteEnvData.databaseId,
      AppwriteEnvData.workspaceId,
      ID.unique(),
      { name, userId: user.$id }
    );

    return c.json({ data: workspace });
  }
);

export default app;
