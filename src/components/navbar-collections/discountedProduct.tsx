"use client";
import { useRef } from "react";
import CarouselControl from "./carousel-control";
import { Product } from "@prisma/client";
import SingleCard from "./singlecard";

const DiscountedProduct = ({data}:{data:{allProducts: Product[]}}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  
  return (
    <div className="bg-[#FAFAFA] w-full grid gap-y-4 pb-10">
      <div className="flex justify-between">
        <h1 className="text-xl md:text-3xl font-semibold capitalize">discounted Product</h1>
        <div className="flex items-center gap-6">
          <CarouselControl
            sliderRef={sliderRef as React.RefObject<HTMLDivElement>}
            sliderType="discountedProduct"
          />
        </div>
      </div>
      <div className="flex gap-7 overflow-x-hidden snap-x w-full" ref={sliderRef}>
        {data && data.allProducts.length>0 && data.allProducts.map((item) => (
    <SingleCard key={item.id} {...item} types="discounts" />          
        ))}
      </div>
    </div>
  );
};


export default DiscountedProduct