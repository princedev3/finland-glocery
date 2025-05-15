"use client"
import React from "react";
import {  Search } from "lucide-react";
import CreateProduct from "./create-product";
import { ProductType } from "@/constants/types";
import AdminSingleCard from "./admin-single-card";
import { PaginationWithLinks } from "@/components/navbar-collections/pagination-with-links";

const Products = ({data,page}:{data:ProductType,page:string}) => {
  return (
    <div>
      <div className="grid gap-5">
        <div className="flex items-center justify-between gap-5">
          <div className="flex-1">
            <form
              action=""
              className="flex h-[48px] items-center border rounded-md bg-gray-100"
            >
              <input
                type="text"
                placeholder="Search product by name"
                className="border-none w-full outline-none text-lg p-2 text-gray-600 rounded-l-md placeholder:text-sm"
              />
              <button className="h-full px-2">
                <Search className="text-gray-600" />
              </button>
            </form>
          </div>
          <CreateProduct />
        </div>
         <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
        {data &&  data?.message?.allProducts?.length>0 && 
          data?.message?.allProducts?.map((item) => (
            <AdminSingleCard key={item.id} {...item} />
          ))}
      </div>
      <PaginationWithLinks
              pageSize={Number(process.env.NEXT_PUBLIC_POST_PER_PAGE)}
              page={parseInt((page as string) || "1")}
              totalCount={data?.message?.count as number}
            />
      </div>
    </div>
  );
};

export default Products;
