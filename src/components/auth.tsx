"use client";

import { useState } from "react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FcGoogle } from "react-icons/fc";

export function Auth({ className, ...props }: React.ComponentProps<"div">) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin ? (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="spongebob@squarepants.com"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input id="password" type="password" required />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full cursor-pointer">
                      Login
                    </Button>
                    <Button variant="outline" className="w-full cursor-pointer">
                      Continue with Google <FcGoogle />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between mt-4 text-center text-sm">
                  <div>Don&apos;t have an account? </div>
                  <div
                    onClick={() => setIsLogin(false)}
                    className="underline underline-offset-4 cursor-pointer"
                  >
                    Sign up
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
              <CardDescription>
                Enter your email below to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Spongebob Squarepants"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="spongebob@squarepants.com"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input id="password" type="password" required />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full cursor-pointer">
                      Sign Up
                    </Button>
                    <Button variant="outline" className="w-full cursor-pointer">
                      Continue with Google <FcGoogle />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between mt-4 text-center text-sm">
                  <div>Already have an account? </div>
                  <div
                    onClick={() => setIsLogin(true)}
                    className="underline underline-offset-4 cursor-pointer"
                  >
                    Login
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Auth;
