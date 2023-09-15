"use client";

import Logo from "@/icons/Logo";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Input,
  Kbd,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import SideNavMenu from "./SideNavMenu";
import IconSearchLine from "@/icons/SearchIcon";

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
        <NavbarItem>
          <Button
            className=" border-1"
            startContent={<IconSearchLine className="w-4 h-4 text-gray-300" />}
            endContent={<Kbd keys={["command"]}>K</Kbd>}
          >
            Quick Search
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Topbar;
