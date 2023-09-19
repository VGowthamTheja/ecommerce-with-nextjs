import TabbedAuth from "@/components/TabbedAuth";
import Logo from "@/icons/Logo";
import React from "react";

const Authorize = () => {
  return (
    <div className="flex flex-row justify-center items-center h-screen">
      <div className="flex flex-[2] h-full text-white select-none bg-black flex-col justify-center items-center">
        <Logo width={150} height={150} />
        <h1 className="text-6xl uppercase font-bold">NextCommerce</h1>
      </div>
      <div className="flex flex-1 flex-col justify-center items-center">
        <TabbedAuth />
        <div className="flex w-[80%] flex-row mt-4 items-center justify-center">
          {/* make an or continue with options */}
          <hr className="w-full h-[2px] bg-gray-500" />
          <p className="text-center text-xs font-medium text-gray-500 uppercase min-w-fit px-2">
            Or continue with
          </p>
          <hr className="w-full h-[2px] bg-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default Authorize;
