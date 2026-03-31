/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Lock, KeyRound, Mail } from "lucide-react";
 

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);


  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: {
      email: string;
      otp: string;
      newPassword: string;
    }) => {
      const res = await fetch(
        "http://localhost:5000/api/v1/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      return res.json();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      
      const result = await mutateAsync({
        email,
        otp,
        newPassword,
      });

      if (!result.success) {
        setErrorMsg(result.message || "Reset failed");
        return;
      }

      
      const refreshRes = await fetch(
        "http://localhost:5000/api/v1/auth/token-refresh",
        {
          method: "POST",
          credentials: "include", // 🔥 important for cookies
        }
      );

      const refreshData = await refreshRes.json();

      if (!refreshData.success) {
        setErrorMsg("Password reset done, but auto login failed");
        return;
      }

      
      if (refreshData.data?.accessToken) {
        localStorage.setItem("accessToken", refreshData.data.accessToken);
      }

      setSuccessMsg("Password reset & logged in successfully ✅");

      
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <Card className="w-full max-w-md shadow-xl border">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">
            Reset Password 🔐
          </CardTitle>
          <CardDescription>
            Enter OTP and your new password
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
           
            <div className="relative">
              <Mail className="absolute left-3 top-3 size-4 text-gray-400" />
              <Input value={email} readOnly className="pl-9 bg-gray-100" />
            </div>

           
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 size-4 text-gray-400" />
              <Input
                placeholder="Enter OTP"
                className="pl-9"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

           
            <div className="relative">
              <Lock className="absolute left-3 top-3 size-4 text-gray-400" />
              <Input
                type="password"
                placeholder="Enter new password"
                className="pl-9"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            
            {errorMsg && (
              <Alert variant="destructive">
                <AlertDescription>{errorMsg}</AlertDescription>
              </Alert>
            )}

            {successMsg && (
              <Alert>
                <AlertDescription>{successMsg}</AlertDescription>
              </Alert>
            )}

           
            <Button className="w-full" disabled={isPending}>
              {isPending ? "Processing..." : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;