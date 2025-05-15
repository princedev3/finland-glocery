"use client"
import AdminSidebar from '@/components/admin-collections/admin-sidebar'
import Products from '@/components/admin/product-section/product';
import React, { useState } from 'react'
import { useGetAllProductQuery } from '../_apis_/_product_index.apis';
import { useSearchParams } from 'next/navigation';
import { ProductType } from '@/constants/types';
import LoadingSpinner from '@/components/navbar-collections/loading';

const Admin = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") as string || "1";
    const [selectedSection, setSelectedSection] = useState("products");
    const {data,isLoading } = useGetAllProductQuery(parseInt((page as string)))

  const renderSection = () => {
    switch (selectedSection) {
      case "sales":
        return <div className="">sale</div>;
      case "products":
        return <Products data={data as ProductType} page={page} />;
      case "analytics":
        return <div className="">analytics</div>;
      case "users":
        return <div className="">users</div>;
      default:
        return (
          <div className="text-gray-500 text-center">Select a section</div>
        );
    }
  };
  if(isLoading){
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