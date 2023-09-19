import React from "react";
import Image from "next/image";
import Magneto from "./magento-icon.svg";
function Logo({ ...props }) {
  return (
    <div>
      <Image src={Magneto} alt="Magento Logo" {...props} />
    </div>
  );
}

export default Logo;
