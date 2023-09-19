"use client";

import FeatureCarousel from "@/components/FeatureCarousel";
import { useAppState } from "@/context/state";
import { sortProductByCategoryForTabs } from "@/lib/constants";
import { Spinner, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";

const DynamicTabs = () => {
  const [products, setProducts] = useState([]);
  const { state, setState } = useAppState();

  useEffect(() => {
    async function getCurrentUser() {
      const response = await fetch("/api/auth/current_user");
      const currentUser = await response.json();

      if (currentUser.error === "No token present") {
        return;
      }

      setState((prevState) => ({
        ...prevState,
        currentUser,
      }));
    }
    getCurrentUser();
  }, []);

  console.log("state", state);

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
      {products.length === 0 ? (
        <div className="flex items-center justify-center h-[90vh] w-screen">
          <Spinner
            size="lg"
            color="warning"
            label="loading..."
            labelColor="warning"
            className="text-center uppercase text-2xl font-semibold"
          />
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default DynamicTabs;
