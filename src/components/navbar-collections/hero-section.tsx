"use client"
import React from 'react'
import { motion } from 'framer-motion';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <motion.div
    initial={{ opacity: 0.7, scale: 0.7 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }} 
    transition={{ duration: 0.2, ease: "easeOut" }}
      className="h-[475px] relative bg-cover bg-center flex justify-center flex-col gap-4 pl-2 md:pl-3 lg:pl-6"
      style={{ backgroundImage: "url('/frame.png')" }}
    >
      <div className="h-full w-full absolute left-0 z-0 top-0 bg-black/20"></div>
      <h1 className="text-white text-[50px] md:text-[60px] z-10 font-bold ">GO FAR TOGETHER</h1>
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="w-fit z-10 bg-black text-white text-2xl capitalize !py-4 rounded-full cursor-pointer !px-8"
      >
        <Link href={"/shop"}>
        Start Shopping now
        </Link>
      </motion.button>
    </motion.div>
    
  
  )
}

export default HeroSection