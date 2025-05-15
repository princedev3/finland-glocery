"use client";
import React from "react";
import { useGetLikedProductsQuery } from "../_apis_/_like_index.apis";
import LoadingSpinner from "@/components/navbar-collections/loading";
import SingleCard from "@/components/navbar-collections/singlecard";


const LikePage = () => {
  const { data, isLoading } = useGetLikedProductsQuery(null);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <div className="wave-text my-7 text-2xl flex items-center font-semibold text-teal-600 capitalize mx-auto justify-center">
        <span className="wave mr-1">liked </span>
        <span className="wave  mr-1"> products</span>
      </div>
      <div className="">
        
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
        {data && data?.message.length ?
          data?.message.map((item) => <SingleCard types="products" key={item.id} {...item}  />)
       :null
        }
     </div> 
  <div className="my-7 grid text-center text-2xl w-full items-center font-semibold capitalize mx-auto justify-center">
         {data && data?.message.length ?null
       :"Like cart Empty"
        }    
      </div>
      </div>
    </div>
  );
};

export default LikePage;
