"use client"
import AdminSidebar from '@/components/admin-collections/admin-sidebar'
import Products from '@/components/admin/product-section/product';
import React, { useState } from 'react'
import { useGetAllProductQuery } from '../_apis_/_product_index.apis';
import { useSearchParams } from 'next/navigation';
import { ProductType } from '@/constants/types';
import LoadingSpinner from '@/components/navbar-collections/loading';
import AllUser from '@/components/admin/customer/all-user';
import { useGetAllUserQuery } from '../_apis_/_user_index.api';
import { Order, User } from '@prisma/client';
import { useGetAllOrderQuery } from '../_apis_/_order_index.apis';
import Sales from '@/components/admin/sales-section/sales';

const Admin = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") as string || "1";
    const [selectedSection, setSelectedSection] = useState("products");
    const { data:userData, isLoading:isUserLoading } = useGetAllUserQuery(page);
    const {data,isLoading } = useGetAllProductQuery(parseInt((page as string)))
     const { data:orderData, isLoading:orderIsLoading } = useGetAllOrderQuery({ page,search:"hello" });

  const renderSection = () => {
    switch (selectedSection) {
      case "sales":
        return <Sales data={orderData as {allOrders:Order[],count:number}} page={page} />;
      case "products":
        return <Products data={data as ProductType} page={page} />;
      case "analytics":
        return <div className="">analytics</div>;
      case "users":
        return <AllUser page={page} datauser={userData as {allUser:User[] ,count:number}}/>;
      default:
        return (
          <div className="text-gray-500 text-center">Select a section</div>
        );
    }
  };
  if(isLoading|| isUserLoading || orderIsLoading){
    return <LoadingSpinner/>
  }
  return (
      <div className="flex gap-2 md:gap-6 my-3 min-h-[100vh]">
      <div className="">
        <AdminSidebar setSelectedSection={setSelectedSection} selectedSection={selectedSection} />
      </div>
      <div className="flex-1">{renderSection()}</div>
    </div>
  )
}

export default Admin