import { products } from "@prisma/client";
import Image from "next/image";
import React from "react";
import ProductCard from "./ProductCard";
import IconBox_open from "@/icons/EmptyBoxIcon";

const FeatureCarousel = ({ products }: any) => {
  return (
    <div className="py-8 px-6">
      <div className="grid grid-cols-6 gap-3">
        {products.length === 0 && (
          <div className="left-[50%]">
            <IconBox_open className="w-16 h-16 text-white" />
            <h1 className="text-2xl font-bold text-white">No products found</h1>
          </div>
        )}
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeatureCarousel;
