
"use client";
import { useRef } from "react";
import CarouselControl from "./carousel-control";
import { Product } from "@prisma/client";
import SingleCard from "./singlecard";

const NewProduct = ({ data }: { data: { allProducts: Product[] } }) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="bg-[#FAFAFA] w-full grid gap-y-4 py-10">
      <div className="flex justify-between items-center px-4">
        <h1 className="text-xl md:text-3xl font-semibold">New Arrival</h1>     
           <div className="flex items-center gap-6">
           <CarouselControl
             sliderRef={sliderRef as React.RefObject<HTMLDivElement>}
             sliderType="newProduct"
          />
        </div>
      </div>
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-hidden snap-x snap-mandatory scroll-smooth px-4"
      >
        {data?.allProducts?.map((item) => (
          <div
            key={item.id}
            className="snap-start shrink-0 w-[80%] sm:w-[45%] md:w-[30%] lg:w-[23%]"
          >
            <SingleCard key={item.id} types="" {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewProduct;
