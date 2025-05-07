"use client"
import { navbarItems } from '@/constants/data';
import Link from 'next/link';
import React, { useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  

const OpenToggle = () => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='md:hidden'>
   
    <Sheet open={isOpen} onOpenChange={setIsOpen} >
  <SheetTrigger asChild>
  <button
      className={`menu-toggle ${isOpen ? 'open' : ''} relative`}
      onClick={() => setIsOpen(!isOpen)}
      aria-label="Toggle menu"
    >
      <span className="bar top"></span>
      <span className="bar middle"></span>
      <span className="bar bottom"></span>
    </button>
  </SheetTrigger>
  <SheetContent side={'left'}>
    <SheetHeader>
      <SheetTitle>
      <div className="flex-1">
            <Link href={"/"}>
            <h1 className="text-[24px] text-black font-bold capitalize cursor-pointer">Exclusive</h1>
            </Link>
        </div>
      </SheetTitle>
      <SheetDescription className='flex flex-col mt-5 justify-center gap-6'>
      {
                 navbarItems.map(item=>(
                     <Link key={item.id} href={item.pathName} className="capitalize text-black text-xl font-semibold cursor-pointer">{item.title} </Link>
                 ))
             }

      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>

           


    </div>
  )
}

export default OpenToggle