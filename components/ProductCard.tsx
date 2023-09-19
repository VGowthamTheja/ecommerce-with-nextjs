"use client";

import { useAppState } from "@/context/state";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { products } from "@prisma/client";
import { getParamByISO } from "iso-country-currency";

import React from "react";
import StarRating from "./Star";

type Props = {
  product: any;
};

const ProductCard = ({ product }: Props) => {
  const { state, setState } = useAppState();
  const rating = product.rating.toFixed(1);
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
        <b>{product.title}</b>
        <div className="">
          <StarRating rating={rating} totalStars={5} />
        </div>
        <p className="text-default-500">
          {/* display discount percentage and original price striked and discounted to be highlighted */}
          {product.discountPercentage > 0 ? (
            <div className="flex items-center gap-8">
              <span className="text-default-500 line-through">
                MRP: {getParamByISO(state.currency, "symbol")} {product.price}
              </span>
              <span className="text-gray-100">
                Our Price: {getParamByISO(state.currency, "symbol")}{" "}
                {(
                  product.price -
                  (product.price * product.discountPercentage) / 100
                ).toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-default-500">{product.price}</span>
          )}
        </p>
        <div className="flex justify-between items-center bg-red-600 w-full px-2 rounded-md">
          <span className="text-default-500">
            {product.discountPercentage > 0 ? (
              <span className="text-gray-100">
                {product.discountPercentage}% off
              </span>
            ) : (
              <span className="text-gray-100">Best Price</span>
            )}
          </span>
          <span className="text-default-500">
            {product.discountPercentage > 0 ? (
              <span className="text-gray-100">
                Save{" "}
                {getParamByISO(state.currency, "symbol") +
                  " " +
                  ((product.price * product.discountPercentage) / 100).toFixed(
                    2
                  )}
              </span>
            ) : (
              <span className="text-gray-100">Free Shipping</span>
            )}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
