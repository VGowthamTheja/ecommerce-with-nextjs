"use client";

import React, { MouseEventHandler, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Divider, Input, Tooltip } from "@nextui-org/react";
import IconBxsUser from "@/icons/NameIcon";
import IconMaildotru from "@/icons/MailIcon";
import { IconEye, IconEyeClosed } from "@/icons/EyeIcon";
import toast from "react-hot-toast";

const Signup = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const isButtonDisabled = useMemo(() => {
    return !user.email || !user.password || !user.username;
  }, [user]);

  const router = useRouter();

  const onSignup = async (e: any) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/sign_up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success("Signup Success");
        router.push("/login");
      }
    } catch (error: any) {
      console.log("Signup Failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleVisiblity = () => {
    setOpen(!open);
  };

  return (
    <div className="flex flex-col max-w-xs mx-auto items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl">Signup</h1>
      <Divider className="h-1" />
      <form className="flex flex-col gap-10 mt-8">
        <Input
          className="w-full"
          isRequired
          label="Username"
          labelPlacement="outside"
          variant="bordered"
          type="text"
          name="username"
          id="username"
          endContent={<IconBxsUser className="w-6 h-6 text-gray-500" />}
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <Input
          className="w-full"
          isRequired
          label="Email"
          labelPlacement="outside"
          variant="bordered"
          type="email"
          name="email"
          id="email"
          value={user.email}
          endContent={<IconMaildotru className="w-6 h-6 text-gray-500" />}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <Input
          className="w-full"
          isRequired
          label="Password"
          labelPlacement="outside"
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
        <Tooltip
          isOpen={isButtonDisabled}
          content={"Fill up the form to submit"}
          showArrow
          placement="bottom"
          color="foreground"
        >
          <Button
            variant="solid"
            color="primary"
            isDisabled={isButtonDisabled}
            isLoading={loading}
            onClick={onSignup}
            className="p-2 w-full border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          >
            {loading ? "Registering..." : "Signup"}
          </Button>
        </Tooltip>
        <span className="text-center">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-blue-500">Login</span>
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
