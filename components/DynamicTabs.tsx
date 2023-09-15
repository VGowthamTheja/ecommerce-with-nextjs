"use client";

import FeatureCarousel from "@/components/FeatureCarousel";
import { sortProductByCategoryForTabs } from "@/lib/constants";
import { Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";

const DynamicTabs = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://dummyjson.com/products?limit=0");
      const { products } = await response.json();
      setProducts(products);
    };
    fetchProducts();
  }, []);

  const categories: any = sortProductByCategoryForTabs(products);
  return (
    <div className="">
      <Tabs
        className="mt-5 ml-3 w-[70%] overflow-x-hidden"
        aria-label="Dynamic tabs"
        items={categories}
        variant="solid"
        color="primary"
      >
        {(item: any) => (
          <Tab key={item.id} title={item.label}>
            <div className="first-of-type:mt-2 mt-14">
              <h1 className="font-bold uppercase text-2xl py-4 border-b-1 px-4">
                {item.label}
              </h1>
              <div className="w-[80%] min-h-[230px] py-2 px-8">
                <FeatureCarousel products={item.content} />
              </div>
            </div>
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default DynamicTabs;
