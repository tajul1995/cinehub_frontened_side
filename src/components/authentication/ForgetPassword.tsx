/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch(
        "http://localhost:5000/api/v1/auth/forget-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
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
      const result = await mutateAsync(email);

      if (!result.success) {
        setErrorMsg(result.message || "Something went wrong");
        return;
      }

      setSuccessMsg("Password reset link sent to your email 📩");
       setTimeout(() => {
      router.push(`/reset-password?email=${email}`);
    }, 1000);
      setEmail("");
    } catch (err: any) {
      setErrorMsg(err.message || "Request failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <Card className="w-full max-w-md shadow-xl border">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">
            Forgot Password 🔐
          </CardTitle>
          <CardDescription>
            Enter your email to receive a reset link
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 size-4 text-gray-400" />
              <Input
                type="email"
                placeholder="Enter your email"
                className="pl-9"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Error */}
            {errorMsg && (
              <Alert variant="destructive">
                <AlertDescription>{errorMsg}</AlertDescription>
              </Alert>
            )}

            {/* Success */}
            {successMsg && (
              <Alert>
                <AlertDescription>{successMsg}</AlertDescription>
              </Alert>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;