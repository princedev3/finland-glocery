"use client"
import { navbarItems } from '@/constants/data'
import Link from 'next/link'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, ShoppingCart } from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import OpenToggle from './open-toggle'
  
  


const Navbar = () => {
  return (
    <div className='h-[80px] bg-white  shadow sticky top-0 left-0 w-full gap-4 flex items-center justify-between px-2 lg:px-10'>
        <div className="flex-1">
            <Link href={"/"}>
            <h1 className="text-[24px] text-black font-bold capitalize cursor-pointer">Exclusive</h1>
            </Link>
        </div>
        <div className="flex-1 hidden md:flex items-center gap-4 justify-between">
            {
                navbarItems.map(item=>(
                    <Link key={item.id} href={item.pathName} className="capitalize text-lg font-semibold cursor-pointer">{item.title} </Link>
                ))
            }
        </div>
        <div className="flex-1 justify-end items-center flex gap-5">
        <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
    <Heart size={30} className='w-[30px] h-[30px] cursor-pointer' />
    </TooltipTrigger>
    <TooltipContent>
      <p className='text-lg font-semibold capitalize'>likes</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
<ShoppingCart size={30} className='w-[30px] h-[30px] cursor-pointer ' />
<OpenToggle/>
<DropdownMenu>
  <DropdownMenuTrigger>
  <Avatar className='w-[40px] h-[40px] cursor-pointer '>
  <AvatarImage  src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem className='text-lg font-semibold cursor-pointer'>Log-out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

  

        </div>
    </div>
  )
}

export default Navbar