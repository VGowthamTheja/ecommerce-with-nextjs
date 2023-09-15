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
          <div className="flex items-center justify-center">
            <div className="flex items-center border border-green-400 w-max p-3 rounded-md bg-green-200">
              <span className="text-green-500 mr-2">
                <svg
                  fill="none"
                  viewBox="0 0 15 15"
                  height="1.5em"
                  width="1.5em"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M0 7.5a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0zm7.072 3.21l4.318-5.398-.78-.624-3.682 4.601L4.32 7.116l-.64.768 3.392 2.827z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span>Your E-mail is successfully verified.</span>
            </div>
          </div>
          <Link href="/login">
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
