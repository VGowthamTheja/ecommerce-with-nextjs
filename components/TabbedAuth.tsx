"use client";

import React, { useMemo, useState } from "react";

import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
  Tooltip,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import IconMaildotru from "@/icons/MailIcon";
import { IconEye, IconEyeClosed } from "@/icons/EyeIcon";
import IconBxsUser from "@/icons/NameIcon";

export default function TabbedAuth() {
  const [selected, setSelected] = useState("login");
  const [user, setUser] = useState({} as any);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isButtonDisabled = useMemo(() => {
    return !user.email || !user.password || !user.username;
  }, [user]);

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
        setSelected("login");
      }
    } catch (error: any) {
      console.log("Signup Failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="flex flex-col">
      <Card className="max-w-full w-[340px] h-[400px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={(key: any) => setSelected(key)}
          >
            <Tab key="login" title="Login">
              <form className="flex flex-col gap-4">
                <Input
                  isRequired
                  label="Email"
                  value={user.email}
                  placeholder="Enter your email"
                  type="email"
                  endContent={
                    <IconMaildotru className="w-6 h-6 text-gray-500" />
                  }
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type={open ? "text" : "password"}
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
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
                <span className="text-center">
                  <Link href="/send_mail">
                    <span className="text-blue-500">Forgot Password?</span>
                  </Link>
                </span>
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    isLoading={loading}
                    onClick={onLogin}
                    color="primary"
                  >
                    {loading ? "Authenticating..." : "Login"}
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form className="flex flex-col gap-4 h-[300px]">
                <Input
                  isRequired
                  label="Name"
                  placeholder="Enter your name"
                  type="text"
                  endContent={<IconBxsUser className="w-6 h-6 text-gray-500" />}
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  value={user.email}
                  endContent={
                    <IconMaildotru className="w-6 h-6 text-gray-500" />
                  }
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type={open ? "text" : "password"}
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
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Tooltip
                    isOpen={isButtonDisabled}
                    content={"Fill up the form to submit"}
                    showArrow
                    placement="bottom"
                    color="foreground"
                  >
                    <Button
                      isDisabled={isButtonDisabled}
                      isLoading={loading}
                      onClick={onSignup}
                      fullWidth
                      color="primary"
                    >
                      {loading ? "Registering..." : "Signup"}
                    </Button>
                  </Tooltip>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
