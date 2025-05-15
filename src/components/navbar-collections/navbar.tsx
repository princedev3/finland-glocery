"use client"
import { navbarItems } from '@/constants/data'
import Link from 'next/link'
import React, { useEffect } from 'react'
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
import { userStore } from '@/provider/user-store'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCartStore } from '@/provider/cart-store'
  
const Navbar = () => {
  const session = userStore((state) => state.session);
   const cartQuantity = useCartStore((state) => state.totalItems);
const router = useRouter()
const handleLogout = async () => {
    await signOut({ redirect: false });
    await signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/login` });
    router.push("/login");
  };
    useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  return (
    <div className='h-[80px] z-50 bg-white  shadow sticky top-0 left-0 w-full gap-4 flex items-center justify-between px-2 lg:px-10'>
        <div className="flex-1">
            <Link href={"/"}>
            <h1 className="text-[24px] text-black font-bold capitalize cursor-pointer">Exclusive</h1>
            </Link>
        </div>
        <div className="flex-1 hidden md:flex items-center gap-4 justify-between">
            {
                navbarItems.map(item=>{
                  if(item.title=== "admin"){
                    if(session && session.user.role==="ADMIN"){
                      return  <Link key={item.id} href={item.pathName} className="capitalize text-lg font-semibold cursor-pointer">{item.title} </Link>
                    }
                  }else{
                  return  <Link key={item.id} href={item.pathName} className="capitalize text-lg font-semibold cursor-pointer">{item.title} </Link>
                  }
                  }
                )
            }
        </div>
        <div className="flex-1 justify-end items-center flex gap-5">
        <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      <Link href={"/like"} className='cursor-pointer'>
    <Heart size={30} className='w-[30px] h-[30px] cursor-pointer' />
      </Link>
    </TooltipTrigger>
    <TooltipContent>
      <p className='font-semibold capitalize'>likes</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
{
  cartQuantity>0 && 
  <Link href={"/cart"} className="relative">
<div className="absolute w-6 flex items-center justify-center text-white text-lg font-semibold rounded-full h-6 bg-[var(--color-custom-base)] -right-3 -top-3 ">{cartQuantity} </div>
<ShoppingCart size={30} className='w-[30px] h-[30px] cursor-pointer ' />
  </Link>
}
<OpenToggle/>
<DropdownMenu>
  <DropdownMenuTrigger asChild>
  {session?.user ? (
    <div className="border w-[40px] h-[40px] object-contain rounded-full hover:bg-gray-200 cursor-pointer text-black font-bold flex items-center justify-center">
          {session?.user.email.charAt(0).toUpperCase()}
        </div>
  ) : 
  <Image alt='' src={"/noavatar.png"} width={40} height={40} className='w-[40px] h-[40px] object-contain rounded-full'/>
  }
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-48">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={handleLogout} className="text-base font-medium cursor-pointer">
      Log out
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>


  

        </div>
    </div>
  )
}

export default Navbar