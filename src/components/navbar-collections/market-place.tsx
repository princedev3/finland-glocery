"use client"
import Image from 'next/image'
import React from 'react'
import {motion} from "framer-motion"
const MarketPlace = () => {
  return (
    <div className='min-h-[350px] bg-[#F7F7F7] gap-[10px] grid md:grid-cols-2'>
        <motion.div 
        initial={{x:-100}}
        whileInView={{x:0}}
        viewport={{ once: true }} 
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex items-center justify-center">
        <div className="text-[#757575] lg:w-[80%] xl:w-[70%]">
            <h1 className="my-[29px] text-[36px] ">Our marketplace</h1>
            <span className="text-lg">Instacart is the North American leader in online grocery delivery with a marketplace spanning more than 75,000 brick and mortar stores across more than 13,000 cities in the US and Canada. Every day, busy people and families use Instacart to explore the largest grocery catalog in the world, where they can discover new products and buy the brands they love from the retailers they trust.</span>
        </div>
        </motion.div>
        <div className="relative h-[350px] md:h-full">
    <Image src="/market-place-frame.png" alt='' fill className='object-contain' />
  </div>
    </div>
  )
}

export default MarketPlace