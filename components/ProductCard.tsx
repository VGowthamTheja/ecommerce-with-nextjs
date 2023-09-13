"use client";

import { useAppState } from "@/context/state";
import { products } from "@prisma/client";
import { getParamByISO } from "iso-country-currency";

import Image from "next/image";
import React from "react";

type Props = {
  product: products;
};

const ProductCard = ({ product }: Props) => {
  const { state, setState } = useAppState();
  return (
    <div className="flex flex-col items-center justify-center border rounded-md">
      <div className="">
        <Image
          src={product.image}
          alt={product.product_name}
          width={200}
          height={200}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full pt-1">
        <h1 className="text-sm font-bold">{product.product_name}</h1>
        <h1 className="text-sm font-bold">
          {getParamByISO(state.currency, "symbol")} {product.price}
        </h1>
      </div>
    </div>
  );
};

export default ProductCard;
