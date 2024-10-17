"use client";

import { Loader, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/doted-separator";

import { useLogout } from "../api/use-logout";
import { useCurrent } from "../api/use-current";

export const UserButton = () => {
  const { data: user, isLoading: loadingUser } = useCurrent();
  const { mutate: logOut } = useLogout();

  if (loadingUser) {
    return (
      <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300">
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  //   const { name, email } = user;

  if (!user) return null;

  const { name, email } = user;
  const avatarCallback = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase() ?? "U";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 border border-neutral-300 transition">
          <AvatarFallback className="font-medium flex items-center justify-center bg-neutral-200 text-neutral-500">
            {avatarCallback}
          </AvatarFallback>
          <AvatarImage />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-50"
        sideOffset={10}
      >
        <div className="flex flex-col items-center gap-2 px-2.5 justify-center py-4">
          <Avatar className="size-[52px]  border border-neutral-300 ">
            <AvatarFallback className="text-xl font-medium flex items-center justify-center bg-neutral-200 text-neutral-500">
              {avatarCallback}
            </AvatarFallback>
            <AvatarImage />
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900 ">
              {name || "User"}
            </p>
            <p className="text-xs text-neutral-500 ">{email}</p>
          </div>
        </div>
        <DottedSeparator className="mb-1" />
        <DropdownMenuItem
          className="h-10 items-center justify-center flex text-amber-700 font-medium cursor-pointer"
          onClick={() => logOut()}
        >
          <LogOut className="size-4 mr-2" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
