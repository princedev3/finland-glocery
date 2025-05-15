"use client"
import { useGetAllCommentQuery } from '@/app/_apis_/_comment_index.apis';
import { useGetRecommendedProductsQuery, useGetSingleProductQuery } from '@/app/_apis_/_product_index.apis';
import Comment from '@/components/comment';
import ListComments from '@/components/list-comments';
import LoadingSpinner from '@/components/navbar-collections/loading';
import Recommendations from '@/components/recommendations';
import { disAbleCart } from '@/constants/helper-functions';
import { CreatedComment } from '@/constants/types';
import { useCartStore } from '@/provider/cart-store';
import { Product } from '@prisma/client';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import {motion} from "framer-motion"
import { toast } from 'sonner';

export default function ProductPage() {
  const {id} = useParams()
  const {data,isLoading}=useGetSingleProductQuery(id as string)
  const {data:recommededData,isLoading:recommendedIsLoading}= useGetRecommendedProductsQuery(data?.getSingleFetch?.cat as string,{skip:!data?.getSingleFetch?.cat})
  const {data:commentData,isLoading:isCommentLoading}=useGetAllCommentQuery(id as string)
  const [selectedImage,setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("");
   const { addToCart, products } = useCartStore();
   const handleSizeChange = (item: string) => {
    setSelectedSize(item);
  };

        const isOutOfStock = disAbleCart(products,id as string,data?.getSingleFetch?.quantity as number)
         const addToCarts = () => {
          if(!selectedSize){
            toast.warning("select size")
            return
          }
         addToCart({
           name: data?.getSingleFetch?.name as string,
           id: id as string,
           price: data?.getSingleFetch?.discount!>0? (data?.getSingleFetch?.price! -data?.getSingleFetch?.discount!): data?.getSingleFetch?.price as number * 1,
           image: data?.getSingleFetch?.images[0] as string,
           size: selectedSize,
           color: "#000",
           quantity: 1,
           initialQuantity: data?.getSingleFetch?.quantity as number,
         });
       };
  if(isLoading || isCommentLoading || recommendedIsLoading){
    return <LoadingSpinner/>
  }
  return (
    <div className="bg-white min-h-screen p-4 md:p-10 text-gray-800">
      <div className="grid md:grid-cols-2 gap-8">
       
        <div className="flex flex-col items-center">
          <Image src={ data?.getSingleFetch?.images[selectedImage] as string} alt="Orange" width={300} height={300} className="rounded-md" />
          <div className="flex gap-2 mt-4">
            {
              data?.getSingleFetch?.images.map((item,index)=>
                <Image onClick={()=>setSelectedImage(index)} src={item} key={index} alt="Icon" width={50} height={50} className='cursor-pointer' />
              )
            }
          </div>
        </div>
        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-semibold">{data?.getSingleFetch?.name}</h1>
          {
            data?.getSingleFetch?.discount! >0 &&
          <p className="text-gray-500 mt-2 line-through">€{data?.getSingleFetch?.price}</p>
          }
          <p className="text-3xl font-bold text-pink-600">€{ data?.getSingleFetch?.discount! >0? (data?.getSingleFetch?.price! -data?.getSingleFetch?.discount!) : data?.getSingleFetch?.price}</p>
            <div className="flex gap-4">
              {data?.getSingleFetch.sizes.map((item) => (
                <div
                  key={item}
                  onClick={() => handleSizeChange(item)}
                  className={`${
                    selectedSize === item ? "bg-gray-600 text-white" : ""
                  } text-lg min-w-12 text-center cursor-pointer border p-1 flexx items-center justify-center capitalize rounded-sm text-gray-600`}
                >
                  {item}
                </div>
              ))}
            </div>
          <motion.button 
            whileTap={{ scale: 0.95 }}
          onClick={addToCarts} disabled={isOutOfStock} className="mt-4 disabled:bg-pink-400 bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600">Add to Cart</motion.button>
          <div className="mt-6 space-y-2">
            <div className="text-sm font-medium text-green-600">✓ Best Seller Product</div>
            <div className="text-sm font-medium text-green-600">✓ 100% satisfaction guarantee</div>
          </div>
        </div>
      </div>
        <div className="mt-10 space-y-4">
          <div  className="border p-4 rounded-md">
            <h3 className="font-semibold">Details</h3>
            <p className="text-sm text-gray-600 mt-2">{data?.getSingleFetch?.desc}</p>
          </div>
          <div  className="border p-4 rounded-md">
            <h3 className="font-semibold">Conservation and storage</h3>
            <p className="text-sm text-gray-600 mt-2">{data?.getSingleFetch?.storage}</p>
          </div>
          <div  className="border p-4 rounded-md">
            <h3 className="font-semibold">Ingredients</h3>
            <p className="text-sm text-gray-600 mt-2">{data?.getSingleFetch?.ingridents}</p>
          </div>
      </div>
  <div className="mb-[50px] grid gap-y-10">
      <Comment />
      <div className="grid gap-y-7">
        <ListComments commentData={commentData as {createdComment: CreatedComment[];
    averageRating: number}} />
      </div>
    </div>
      {/* Recommendations */}
      {
        recommededData?.getSingleFetch.length as number >0 && 
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Recommendations</h2>
        <Recommendations recommededData={recommededData as  {
    getSingleFetch: Product[];
} } />
      </div>
      }
    </div>
  );
}
