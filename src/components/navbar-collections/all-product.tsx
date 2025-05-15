"use client"
import React from 'react'
import {motion} from "framer-motion"
import SingleCard from './singlecard';
import { PaginationWithLinks } from './pagination-with-links';
import { ProductType } from '@/constants/types';

const AllProduct = ({page,data}:{page:string,data:ProductType}) => {
  return (
    <div>
      <div className="mb-7  px-5 ">
      <h1 className="text-[30px] font-semibold capitalize text-baseBlack  mx-auto my-5">
        Our Products
      </h1>
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
          totalCount={data?.message?.count as number}
        />
    </div>
    </div>
  )
}

export default AllProduct