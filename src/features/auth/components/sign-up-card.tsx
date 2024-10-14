"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { DottedSeparator } from "@/components/doted-separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function SignUpCard() {
  return (
    <Card className="w-full h-full md:w-[486px] border-none shadow-none ">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription className="text-2xl">
          By signing up you agree to our {""}
          <Link href="">
            <span className="text-blue-700">Privacy policy</span>
          </Link>{" "}
          and {""}
          <Link href="">
            <span className="text-blue-700">Terms of Service</span>
          </Link>{" "}
        </CardDescription>
      </CardHeader>
      <div className="px-7 ">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <form className="space-y-4">
          <Input
            required
            type="text"
            value=""
            onChange={() => {}}
            placeholder="Enter Your Name"
            disabled={false}
          />
          <Input
            required
            type="email"
            value="email"
            onChange={() => {}}
            placeholder="Enter Email address"
            disabled={false}
          />
          <Input
            required
            type="password"
            value=""
            onChange={() => {}}
            placeholder="Enter Password"
            min={8}
            max={256}
            disabled={false}
          />
          <Button disabled={false} size="lg" className="w-full">
            Sign In
          </Button>
        </form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="flex flex-col p-7 gap-y-4">
        <Button
          variant="secondary"
          size="lg"
          className="w-full"
          disabled={false}
        >
          <FcGoogle className="mr-2 size-5" />
          Log In with Google
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="w-full"
          disabled={false}
        >
          <FaGithub className="mr-2 size-5" />
          Log In with Github
        </Button>
      </CardContent>
    </Card>
  );
}
