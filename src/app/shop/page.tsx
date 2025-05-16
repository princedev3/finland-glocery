"use client"
import { PaginationWithLinks } from '@/components/navbar-collections/pagination-with-links'
import { foodItems } from '@/constants/data'
import {motion} from "framer-motion"
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useGetAllProductQuery } from '../_apis_/_product_index.apis'
import SingleCard from '@/components/navbar-collections/singlecard'
import LoadingSpinner from '@/components/navbar-collections/loading'

const Shop = () => {
  const router = useRouter()
   const searchparams = useSearchParams()
   const page = searchparams.get("page")  || "1"
   const search = searchparams.get("search") || ""
    const [searchTerm, setSearchTerm] = useState(search);
    const {data,isLoading}=useGetAllProductQuery({page:parseInt((page as string) || "1"),search})

 const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (searchTerm) query.set("search", searchTerm);
    query.set("page", "1");
    router.push(`/shop?${query.toString()}`);
  };

useEffect(() => {
  if (searchTerm === "" && search !== "") {
    router.push("/shop?page=1");
  }
}, [searchTerm]);

  if(isLoading){
  return <LoadingSpinner/>
}

  return (
     <div>
         <div className="mb-7 md:px-20">
            <div className="">
      <h1 className="text-[30px] font-semibold capitalize text-center  mx-auto my-5">
        Our Products
      </h1>
   <form onSubmit={handleSearch} className="flex items-center mb-5 gap-3">
  <input
    type="text"
    placeholder="Search for your favorite item"
    className="flex-1 outline-0 border-2 py-3 px-2 text-lg rounded-2xl"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <button
    type="submit"
    className="text-xl cursor-pointer capitalize bg-black text-white w-[100px] py-3 rounded-2xl"
  >
    Search
  </button>
</form>

            </div>
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 "
      >
      {( data && data?.message?.allProducts?.length >0 && data?.message?.allProducts.map((item) => (
            <SingleCard key={item.id} {...item} types="products" />
          ) ))}
      </motion.div>
        <PaginationWithLinks
          pageSize={Number(process.env.NEXT_PUBLIC_POST_PER_PAGE)}
          page={parseInt((page as string) || "1")}
          totalCount={foodItems.length as number}
        />
    </div>
    </div>
  )
}

export default Shop