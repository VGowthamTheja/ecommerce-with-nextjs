"use client";

import Logo from "@/icons/Logo";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const Topbar = () => {
  return (
    <Navbar
      className="dark:bg-slate-800 bg-slate-950"
      shouldHideOnScroll
      maxWidth="2xl"
      height="5rem"
    >
      <NavbarBrand>
        <Logo />
        <p className="font-bold text-inherit uppercase text-lg tracking-widest select-none ml-4">
          NextCommerce
        </p>
      </NavbarBrand>
      <NavbarContent
        className="hidden sm:flex gap-4"
        justify="center"
      ></NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem></NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Topbar;
