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
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export function Auth({ className, ...props }: React.ComponentProps<"div">) {
  const auth = getAuth();

  const [isLogin, setIsLogin] = useState(true);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const errorMessages: Record<string, string> = {
    "auth/missing-email": "Email is required.",
    "auth/invalid-email": "Invalid email address.",
    "auth/email-already-in-use": "Email already in use. Please login.",
    "auth/missing-password": "Password is required.",
    "auth/weak-password": "Password should be at least 8 characters.",
    "auth/user-not-found": "No user found with this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/too-many-requests": "Too many requests. Please try again later.",
  };

  function getErrorMessage(code: string) {
    return errorMessages[code] || "An error occurred. Please try again.";
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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

        sendEmailVerification(user).then(() => {
          toast(
            "A verification email has been sent. Don’t forget to check spam too."
          );
          setTimeout(() => {
            setIsLogin(true);
          }, 2000);
        });
      })
      .catch((error) => {
        toast(getErrorMessage(error.code));
      });
    setLoading(false);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((res) => {
        if (!res.user.emailVerified) {
          toast("Verify your email before logging in.");
        } else {
          toast(
            "Logged in successfully. You may now continue to your account."
          );
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((error) => {
        toast(getErrorMessage(error.code));
      });
    setLoading(false);
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
              <form onSubmit={handleSignIn}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="spongebob@squarepants.com"
                      required
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
                      required
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full cursor-pointer"
                    >
                      {loading ? "Loading..." : "Login"}
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
                      required
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
                      required
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
                      required
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full cursor-pointer"
                    >
                      {loading ? "Loading..." : "Sign Up"}
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
