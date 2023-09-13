import { products } from "@prisma/client";
import Image from "next/image";
import React from "react";
import ProductCard from "./ProductCard";

const FeatureCarousel = async () => {
  const response = await fetch("http://localhost:3000/api/v1/products");
  const products = await response.json();

  return (
    <div className=" h-[220px] py-8 px-6">
      <div className="flex flex-row">
        {products.map((product: products) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeatureCarousel;
