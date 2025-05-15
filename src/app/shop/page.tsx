"use client"
import { PaginationWithLinks } from '@/components/navbar-collections/pagination-with-links'
import { foodItems } from '@/constants/data'
import {motion} from "framer-motion"
import React from 'react'

const Shop = () => {
    const page = "1"
  return (
     <div>
         <div className="mb-7 md:px-20">
            <div className="">

      <h1 className="text-[30px] font-semibold capitalize text-center  mx-auto my-5">
        Our Products
      </h1>
      <form action="" className="flex items-center mb-5 gap-3">
        <input type="text" placeholder='search for your favorite item' className='flex-1 outline-0 border-2 py-3 px-2 text-lg rounded-2xl' />
        <button className='text-xl cursor-pointer capitalize bg-black text-white w-[100px] py-3 rounded-2xl '>search</button>
      </form>
            </div>
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 "
      >
        {/* {(foodItems.map((item) => (
            <SingleCard key={item.id} {...item} />
          ) ))} */}
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