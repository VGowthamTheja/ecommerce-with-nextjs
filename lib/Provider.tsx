"use client";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <NextUIProvider>{children}</NextUIProvider>
    </div>
  );
};

export default Provider;
