import React from "react";
import Image from "next/image";
import Magneto from "./magento-icon.svg";
function Logo() {
  return (
    <div>
      <Image src={Magneto} alt="Magento Logo" width={50} height={50} />
    </div>
  );
}

export default Logo;
