"use client";
import React, { useEffect } from "react";
import { DataTable } from "./sales-data-table";
import { orderColumns } from "./sales-column";
import { PaginationWithLinks } from "@/components/navbar-collections/pagination-with-links";
import { Order } from "@prisma/client";
import { useRouter } from "next/navigation";

const Sales = ({data,page,searchTerm,setSearchTerm,search}:{data:{allOrders:Order[],count:number},page:string,setSearchTerm:(searchTerm:string)=>void,searchTerm:string,search:string}) => {
const router =useRouter()
   const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      const query = new URLSearchParams();
      if (searchTerm) query.set("search", searchTerm);
      query.set("page", "1");
      router.push(`/admin?${query.toString()}`);
    };
  
  useEffect(() => {
    if (searchTerm === "" && search !== "") {
      router.push("/shop?page=1");
    }
  }, [searchTerm]);
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4 text-baseGreen">
        Manage Sales
      </h1>
         <form onSubmit={handleSearch} className="flex items-center mb-5 gap-3">
  <input
    type="text"
    placeholder="Search for your favorite item"
    className="flex-1 outline-0 border-2 py-3 px-2 text-lg rounded-2xl"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <button
    type="submit"
    className="text-xl cursor-pointer capitalize bg-black text-white w-[100px] py-3 rounded-2xl"
  >
    Search
  </button>
</form>
      {data && data?.allOrders?.length > 0 ? (
        <DataTable columns={orderColumns} data={data?.allOrders} />
      ) : (
        <span className="text-center mx-auto grid">No Order Found</span>
      )}
      {data && data?.allOrders?.length > 0 && (
        <PaginationWithLinks
          pageSize={Number(process.env.NEXT_PUBLIC_POST_PER_PAGE)}
          page={parseInt((page as string) || "1")}
          totalCount={data?.count as number}
        />
      )}
    </div>
  );
};

export default Sales;
