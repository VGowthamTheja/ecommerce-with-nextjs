import React from "react";
import Image from "next/image";
import Logo from "../public/magento-icon.svg";

const Navbar = () => {
  return (
    <nav className="px-10 py-5 text-teal-700 bg-gray-800 flex select-none">
      <div className="flex-1 inline-flex items-center gap-5">
        <Image src={Logo} width={50} height={50} alt="logo" />
        <div className="uppercase font-bold text-xl">nextcart</div>
      </div>
      <div className="flex-1 md:inline-flex hidden items-center justify-center md:content">
        Navlinks & Search
      </div>
      <div className="flex-1 inline-flex items-center justify-end">Cart</div>
    </nav>
  );
};

export default Navbar;
