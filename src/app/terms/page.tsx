"use client";

import { privacyInfo } from "@/constants/data";
import { FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import React from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Policy = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8 md:p-12 mt-12"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-bold text-center text-teal-700 mb-10"
      >
        Privacy Policy
      </motion.h1>

      <div className="space-y-10">
        {privacyInfo.map((item) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            className="p-6 md:p-8 bg-gray-50 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <FaLock className="text-teal-600 text-2xl" />
              <h2 className="text-xl md:text-2xl font-semibold text-teal-800">{item.title}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Policy;
