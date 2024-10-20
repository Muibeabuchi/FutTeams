import { SettingsIcon, UsersIcon } from "lucide-react";
import { z } from "zod";

import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";

export const Routes = [
  {
    label: "Home",
    href: "",
    filledIcon: GoHomeFill,
    Icon: GoHome,
  },
  {
    label: "My Tasks",
    href: "/tasks",
    Icon: GoCheckCircle,
    filledIcon: GoCheckCircleFill,
  },
  {
    label: "Settings",
    href: "/settings",
    filledIcon: SettingsIcon,
    Icon: SettingsIcon,
  },
  {
    label: "Users",
    href: "/users",
    filledIcon: UsersIcon,
    Icon: UsersIcon,
  },
];

const AppwriteEnvSchema = z.object({
  databaseId: z.string(),
  workspaceId: z.string(),
});

export const AppwriteEnv = AppwriteEnvSchema.safeParse({
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
  workspaceId: process.env.NEXT_PUBLIC_APPWRITE_WORKSPACES_ID,
});
