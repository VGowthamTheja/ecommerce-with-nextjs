"use client";

import IconClose from "@/icons/CloseIcon";
import IconMenu from "@/icons/HamburgerIcon";
import { Button, Link, User } from "@nextui-org/react";
import classNames from "classnames";
import { Fragment, useState } from "react";
import CountryMap from "./CountryMap";

const SideNavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    console.log("toggleMenu");

    setIsOpen(!isOpen);
  };
  return (
    <Fragment>
      <Button
        isIconOnly
        className="dark:text-white text-black absolute top-[50%] right-4 z-50 hover:bg-teal-600"
        onClick={toggleMenu}
      >
        <IconMenu />
      </Button>

      <div
        className={`top-0 right-0 w-[20vw] bg-slate-200 pl-10 text-black fixed h-full z-50 ease-in-out duration-300 ${
          isOpen ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <Button
          isIconOnly
          variant="light"
          className="text-black absolute top-4 right-4 z-50"
          onClick={toggleMenu}
        >
          <IconClose />
        </Button>
        <div className="flex flex-col items-start justify-center pt-10">
          {/* user info */}
          <User
            name="Junior Garcia"
            description={
              <Link href="https://twitter.com/jrgarciadev" size="sm" isExternal>
                @jrgarciadev
              </Link>
            }
            avatarProps={{
              src: "https://avatars.githubusercontent.com/u/30373425?v=4",
            }}
          />
        </div>
        <div className="absolute bottom-20 w-[159px] right-8 flex items-center text-black">
          <CountryMap />
        </div>
        <div className="absolute bottom-10 flex items-center justify-center">
          <p className="uppercase text-sm font-bold">
            © 2023 NextCommerce <span className="text-slate-500">v1.0.0</span>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default SideNavMenu;
