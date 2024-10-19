"use server";
import { cookies } from "next/headers";
import { Account, Client } from "node-appwrite";
import { AUTH_COOKIE } from "./constants";

export const getCurrent = async () => {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const sessions = cookies().get(AUTH_COOKIE);

    if (!sessions?.value) return null;
    client.setSession(sessions.value);

    const account = new Account(client);

    const user = await account.get();
    return user;
  } catch {
    return { error: "There was an error getting the user" };
  }
};
