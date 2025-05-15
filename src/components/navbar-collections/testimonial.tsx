"use client";
import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import {motion} from "framer-motion"
import StarRating from "./star-rating";
import { SliderCommentType } from "@/constants/types";
const Testimonial = ({data}:{data:{
    sliderComment: SliderCommentType[];
}}) => {


return (
<div className="bg-gray-200  py-20 px-6">
  <motion.div 
    initial={{ x: -100, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  className="text-center mb-16">
    <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
      Bringing Joy to Your Everyday.
    </h2>
    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
Our mission is your smile.
    </p>
  </motion.div>

  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
  { data && data.sliderComment.length>0 && data.sliderComment.map((item, index) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.2, 
      }}
      className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={item.user.image || "/noavatar.png"}
          width={60}
          height={60}
          alt="User Avatar"
          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {item.user.name}
          </h3>
          <p className="text-sm text-gray-500">
            {format(item.createdAt, "PPP")}
          </p>
        </div>
      </div>
      <StarRating rating={item.value} />
      <p className="text-gray-700 mt-4 italic">“{item.comment}”</p>
    </motion.div>
  ))}
</div>
</div>

  );
};

export default Testimonial;
