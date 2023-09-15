"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        const response = await fetch("/api/auth/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          setVerified(true);
        }
      } catch (error: any) {
        setError(true);
        console.log(error);
      }
    };

    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Your Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? token : "No Token"}
      </h2>
      {verified && (
        <div>
          <h2 className="p-2 bg-green-500 text-black">Email Verified</h2>
          <Link href="/auth/login">
            <span className="p-2 bg-blue-500 text-black">Login</span>
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="p-2 bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
}
