import React from 'react'
import {motion} from "framer-motion"
import SingleCard from './navbar-collections/singlecard'
import { Product } from '@prisma/client';

const Recommendations = ({recommededData}:{recommededData:{ 
    getSingleFetch: Product[];
} }) => {
  return (
       <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 "
          >
            {( recommededData && recommededData?.getSingleFetch.length>0 && recommededData?.getSingleFetch?.map((item) => (
                <SingleCard key={item.id} {...item} types='products' />
              ) ))}
          </motion.div>
  )
}

export default Recommendations