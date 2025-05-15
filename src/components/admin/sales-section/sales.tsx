"use client";
import React from "react";
import { DataTable } from "./sales-data-table";
import { orderColumns } from "./sales-column";
import { PaginationWithLinks } from "@/components/navbar-collections/pagination-with-links";
import { Order } from "@prisma/client";

const Sales = ({data,page}:{data:{allOrders:Order[],count:number},page:string}) => {

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4 text-baseGreen">
        Manage Sales
      </h1>
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
