"use client";

import { app, auth, db } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
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
import { setDoc, doc } from "firebase/firestore";

export function Auth({ className, ...props }: React.ComponentProps<"div">) {
  const [isLogin, setIsLogin] = useState(true);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then(async (res) => {
        const user = res.user;

        await updateProfile(user, {
          displayName: userData.name,
        });

        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: userData.name,
          email: user.email,
          createdAt: new Date().toISOString(),
        });

        console.log(user);
      })
      .catch((error) => {
        console.log("Error Code:- ", error.code);
        console.log("Error Message:- ", error.message);
      });
  };

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
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input id="password" type="password" />
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
              <form onSubmit={handleSignUp}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Spongebob Squarepants"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="spongebob@squarepants.com"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                    />
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
