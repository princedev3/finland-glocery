"use client"
import React, { useEffect, useState } from 'react'
import {motion} from "framer-motion"
import Image from 'next/image'
import { Eye, Heart } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import Link from 'next/link'
import { useCartStore } from '@/provider/cart-store'
import { disAbleCart } from '@/constants/helper-functions'
import { Badge } from '../ui/badge'
import { useCreateLikeMutation, useGetLikesQuery } from '@/app/_apis_/_like_index.apis'
import { userStore } from '@/provider/user-store'
import { toast } from 'sonner'
import { Products } from '@/constants/types'

const SingleCard = ({id,quantity,name,images,price,types,discount}:Products) => {
const session = userStore((state) => state.session);
 const [liked, setLiked] = useState(false);
const [createLike] = useCreateLikeMutation();
 const { data, isLoading } = useGetLikesQuery(null);

 const { addToCart, products } = useCartStore();
      const isOutOfStock = disAbleCart(products,id,quantity)
       const addToCarts = () => {
       addToCart({
         name: name as string,
         id: id as string,
         price:  discount>0? (price -discount): price as number * 1,
         image: images[0] as string,
         size: "s",
         color: "#000",
         quantity: 1,
         initialQuantity: quantity as number,
       });
     };

      useEffect(() => {
    if (!isLoading && data?.message) {
      setLiked(data?.message?.includes(id));
    }
  }, [data, id, isLoading]);

   const handleLike = async () => {
    try {
      if (!session) {
        toast.error("kindly login");
        return;
      }

       await createLike({ id, userId: session.user?.id });
      setLiked((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return ( 
     <div className="h-[400px] min-w-[260px] border shadow-lg rounded-2xl bg-gray-100 relative">
         <div className="absolute  top-4 z-10 transition-all duration-300 right-2">
        {
          types==="products"?
           (<div className="flex flex-col gap-3">
            <motion.div
              whileTap={{ scale: 0.85 }}
              className="cursor-pointer w-[33px] h-[33px] p-[6px] bg-white rounded-full flex items-center justify-center"
            >
              <Heart
              onClick={handleLike}
                size={30}
                className={`${
                  liked ? "fill-red-500 stroke-red-500" : ""
                }  text-baseBlack rounded-full z-10`}
              />
            </motion.div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href={`/product/${id}`}
                    className="cursor-pointer w-[33px] h-[33px]  p-[6px] bg-white rounded-full flex items-center justify-center"
                  >
                    <Eye
                      size={30}
                      className="shadow-sm min-w-[27px] z-10 min-h-[27px] rounded-full  text-baseBlack"
                    />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>see more</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>):types==="discounts"? <Badge variant="default" className="capitalize">discount</Badge> :<Badge variant="default" className="capitalize">new</Badge> 
        }
          
        </div>
      <div className="h-[200px] relative w-full  flex rounded-2xl items-center justify-center z-0">
          <Image src={images[0]} fill alt={name}  className="w-[200px] !z-0 h-[200px] object-cover rounded-2xl"/>
      </div>
      <div className="p-2">
         <div className="capitalize mt-2 text-xl font-semibold">{name}</div>
        <div className="text-lg font-medium mt-2 flex justify-between">€{discount>0?(price-discount) :price} {discount>0 && <span className="line-through text-red-700">€{price} </span> } </div>
         <div className="text-lg mt-2">{quantity} Left</div>
         <motion.button
         disabled={isOutOfStock}
         onClick={addToCarts}
        whileTap={{ scale: 0.95 }}
        className={`bg-black w-full mt-2 rounded-[20px] pointer-events-auto text-white font-medium cursor-pointer py-3 disabled:cursor-not-allowed disabled:bg-black/50`}
      >
        Add to cart
      </motion.button>
          </div> 
     </div>
  )
}

export default SingleCard