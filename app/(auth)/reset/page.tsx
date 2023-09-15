"use client";

import IconWarning from "@/icons/WarningIcon";
import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Reset = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/reset_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, token }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        console.log("Password Reset Success");
      }

      if (res.status === 400) {
        toast.error(data.error);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <div className="rounded-md border p-4 border-yellow-500 bg-yellow-200 mb-6 flex items-center">
          <IconWarning className="text-yellow-500 mr-3" />
          Token: <span className="text-sky-600 font-medium">{token}</span>
        </div>
        <div className="flex max-w-sm flex-col items-center rounded-md border p-6">
          <h1 className="mb-2 text-xl font-medium">Confirm Password</h1>
          <p className="mb-3 text-xs text-gray-500">
            Enter your new password to Confirm
          </p>
          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            className="mt-5"
          />
          <Button
            type="submit"
            onClick={handleResetPassword}
            isLoading={loading}
            className="mt-3 w-full rounded-md bg-green-600 p-2 text-xs font-medium uppercase text-white"
          >
            submit password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Reset;
