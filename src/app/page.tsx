"use client"
import AllProduct from '@/components/navbar-collections/all-product'
import DiscountedProduct from '@/components/navbar-collections/discountedProduct'
import HeroSection from '@/components/navbar-collections/hero-section'
import MarketPlace from '@/components/navbar-collections/market-place'
import NewProduct from '@/components/navbar-collections/new-product'
import Newsletter from '@/components/navbar-collections/newsletter'
import Testimonial from '@/components/navbar-collections/testimonial'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useGetAllProductQuery, useGetDiscountedProductsQuery, useGetNewArrivalProductsQuery } from './_apis_/_product_index.apis'
import { ProductType, SliderCommentType } from '@/constants/types'
import { Product } from '@prisma/client'
import { useGetCommentForSiderQuery } from './_apis_/_comment_index.apis'
import LoadingSpinner from '@/components/navbar-collections/loading'


const Home = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
 const {data:newArrivalProducts,isLoading:arrivalIsLoading}=useGetNewArrivalProductsQuery(null)
 const {data:discountProducts,isLoading:discountisLoading}= useGetDiscountedProductsQuery(null)
 const{data:testimonialData,isLoading:testimonialIsLoading}=useGetCommentForSiderQuery(null)
 const {data,isLoading}=useGetAllProductQuery({page:parseInt((page as string) || "1")})
 if(arrivalIsLoading || isLoading || discountisLoading || testimonialIsLoading){
  return <LoadingSpinner/>
 }
  return (
    <div className=''>
      <HeroSection/>
      <NewProduct data={newArrivalProducts as {allProducts: Product[]} } />
      <DiscountedProduct data={discountProducts as {allProducts: Product[]} } /> 
      <AllProduct data={data as ProductType} page={page as string}/>
      <MarketPlace/>
      <Testimonial data={testimonialData as {
    sliderComment: SliderCommentType[];
}  } />
      <Newsletter/>
    </div>
  )
}

export default Home