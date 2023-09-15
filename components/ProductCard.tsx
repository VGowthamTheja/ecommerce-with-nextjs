"use client";

import { useAppState } from "@/context/state";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { products } from "@prisma/client";
import { getParamByISO } from "iso-country-currency";

import React from "react";

type Props = {
  product: any;
};

const ProductCard = ({ product }: Props) => {
  const { state, setState } = useAppState();
  return (
    <Card
      shadow="sm"
      isPressable
      isHoverable
      fullWidth
      onPress={() => console.log("item pressed")}
    >
      <CardBody className="overflow-y-hidden p-0 h-[200px]">
        <Image
          shadow="sm"
          radius="lg"
          alt={product.title}
          className="object-cover"
          src={product.thumbnail}
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
