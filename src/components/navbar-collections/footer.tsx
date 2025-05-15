import Link from "next/link";
import React from "react";
import {
  FaTiktok,
 } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { FacebookIcon, Instagram } from "lucide-react";
import { navbarItems } from "@/constants/data";

const Footer = () => {
  return (
    <div className=" bg-[#000] p-5 md:p-20 text-white grid gap-y-5 ">
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(270px,_1fr))] gap-[50px] ">
        <div className="grid self-start gap-y-1">
        <Link href={"/"} className="">
            <h1 className="text-[30px] text-white font-bold capitalize cursor-pointer">Exclusive</h1>
            </Link>
          <span className="text-lg text-white">
            We are a residential interior design firm located in Portland. Our
            boutique-studio offers more than
          </span>
        </div>
        <div className="grid gap-y-4 self-start text-white">
           <span className=" text-xl font-semibold uppercase">
             Navigation
           </span>
             {
                navbarItems.map(item=>(
           <Link
           key={item.id}
             href={"/policy"}
             className="hover:text-teal-600  text-xl capitalize cursor-pointer"
           >
            {item.title}
           </Link>
                ))

            }
               <Link href={"/terms"} className="hover:text-teal-600 text-lg cursor-pointer capitalize">
              Terms and Condition
            </Link>  
         </div>
         <div className="grid gap-y-4 self-start text-white ">
          <span className=" text-xl font-semibold uppercase">
            Payment
          </span>
          <ul className="flex flex-col gap-4">
            <span className=" hover:text-teal-600 text-lg cursor-pointer">
              Paystack Integration
            </span>
            <li className=" hover:text-teal-600 text-lg cursor-pointer capitalize">
              fast
            </li>
            <li className="hover:text-teal-600 text-lg cursor-pointer capitalize">
              reliable
            </li>
            <li className="hover:text-teal-600 text-lg cursor-pointer capitalize">
              secured
            </li>
          
          </ul>
        </div>
      
      </div>
      <Separator className="my-3 bg-slate-800" />
      
      <div className="grid gap-y-5 self-start text-white">
           <span className="text-xl font-semibold uppercase">
             FOLLOW US
           </span>
           <div className="flex items-center gap-4">
             <a
               href="#"
               target="_blank"
               rel="noopener noreferrer"
               className="border p-2 rounded-full group hover:bg-baseBlue cursor-pointer flex items-center justify-center"
             >
               <FacebookIcon
                 size={30}
                 className="text-white group-hover:text-white"
               />
             </a>
             <div className="border p-2 rounded-full group hover:bg-baseBlue/65 flex items-center justify-center">
               <a
                 href="#"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-white group-hover:text-white"
               >
                 <Instagram
                   size={30}
                   className="text-white group-hover:text-white"
                 />
               </a>
             </div>
             <div className="border p-2 rounded-full group hover:bg-pink-500 flex items-center justify-center">
               <a
                 href="#"
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 <FaTiktok
                   size={30}
                   className="text-white group-hover:text-white"
                 />
               </a>
             </div>
           </div>
         </div>

  
    </div>
  );
};

export default Footer;

