import FeatureCarousel from "@/components/FeatureCarousel";
import { Fragment } from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-start justify-center">
      <h1 className="font-bold uppercase text-2xl py-4 border-b-1 px-4">
        Featured
      </h1>
      <div className="w-full min-h-[230px] py-2 px-8">
        <FeatureCarousel />
      </div>
    </div>
  );
}
