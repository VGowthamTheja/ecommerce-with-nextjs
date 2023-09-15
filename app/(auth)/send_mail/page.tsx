"use client";

import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const SendMail = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMail = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/send_mail_link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
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
        <div className="rounded-md border p-6 flex flex-col items-center max-w-sm">
          <h1 className="text-xl mb-2 font-medium">Reset Password</h1>
          <p className="text-xs text-gray-500 mb-3">
            Please provide your registered e-mail to reset your password
          </p>
          <Input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your E-mail"
            className="mt-5"
          />
          <Button
            type="submit"
            onClick={handleSendMail}
            isLoading={loading}
            className="uppercase text-xs p-2 rounded-md font-medium mt-3 w-full text-white bg-green-600"
          >
            send verification link
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SendMail;
