"use client";
import React from "react";
import { DataTable } from "./user-data-table";
import { userColumns } from "./user-column";
import { PaginationWithLinks } from "@/components/navbar-collections/pagination-with-links";
import { User } from "@prisma/client";

const AllUser = ({datauser,page}:{datauser:{allUser:User[],count:number},page:string}) => {
  
  

  return (
    <div>
      <h1 className="text-2xl font-semibold my-4 text-baseGreen capitalize">
        Manage user
      </h1>
      <div className="">
        <DataTable data={datauser?.allUser} columns={userColumns} />
        {datauser && datauser?.count && (
          <PaginationWithLinks
            pageSize={Number(process.env.NEXT_PUBLIC_POST_PER_PAGE)}
            page={parseInt((page as string) || "1")}
            totalCount={datauser?.count as number}
          />
        )}
      </div>
    </div>
  );
};

export default AllUser;
