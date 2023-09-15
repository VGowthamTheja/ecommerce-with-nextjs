"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Divider, Input } from "@nextui-org/react";
import IconBxsUser from "@/icons/NameIcon";
import IconMaildotru from "@/icons/MailIcon";
import { IconEye, IconEyeClosed } from "@/icons/EyeIcon";
import toast from "react-hot-toast";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onLogin = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Login Success");
        router.push("/");
      }

      if (res.status === 400) {
        toast.error(data.error);
      }
    } catch (error: any) {
      toast.error(error);
      console.log("Login Failed", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleVisiblity = () => {
    setOpen(!open);
  };
  return (
    <div className="flex flex-col max-w-xs mx-auto items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl">Login</h1>
      <Divider className="h-1" />
      <form className="flex flex-col">
        <Input
          className="w-full mt-8"
          isRequired
          label="Email"
          labelPlacement="outside"
          placeholder="Enter your email"
          variant="bordered"
          autoFocus
          type="email"
          name="email"
          id="email"
          value={user.email}
          endContent={<IconMaildotru className="w-6 h-6 text-gray-500" />}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <Input
          className="w-full mt-8"
          isRequired
          label="Password"
          labelPlacement="outside"
          placeholder="Enter your password"
          variant="bordered"
          type={open ? "text" : "password"}
          name="password"
          id="password"
          value={user.password}
          endContent={
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onClick={toggleVisiblity}
            >
              {open ? (
                <IconEyeClosed className="w-6 h-6 text-gray-500" />
              ) : (
                <IconEye className="w-6 h-6 text-gray-500" />
              )}
            </Button>
          }
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <Button
          variant="solid"
          color="primary"
          isLoading={loading}
          onClick={onLogin}
          className="p-2 w-full mt-8 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          {loading ? "Authenticating..." : "Login"}
        </Button>
        <span className="text-center">
          <Link href="/send_mail">
            <span className="text-blue-500">Forgot Password?</span>
          </Link>
        </span>
        <span className="text-center">
          {"Don't have an account?"}{" "}
          <Link href="/signup">
            <span className="text-blue-500">Signup</span>
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
