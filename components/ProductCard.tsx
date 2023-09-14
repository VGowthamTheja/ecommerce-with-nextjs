"use client";

import { useAppState } from "@/context/state";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { products } from "@prisma/client";
import { getParamByISO } from "iso-country-currency";

import React from "react";

type Props = {
  product: products;
};

const ProductCard = ({ product }: Props) => {
  const { state, setState } = useAppState();
  return (
    <Card shadow="sm" isPressable onPress={() => console.log("item pressed")}>
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="200px"
          height="200px"
          alt={product.product_name}
          className="w-full object-cover"
          src={product.image}
        />
      </CardBody>
      <CardFooter className="text-small justify-between flex flex-col">
        <b>{product.product_name}</b>
        <p className="text-default-500">
          {getParamByISO(state.currency, "symbol")} {product.price}
        </p>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
