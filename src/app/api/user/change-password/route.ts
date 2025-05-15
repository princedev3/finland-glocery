import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async(req:NextRequest)=>{ 
    try {
        const {password,email} = await req.json()
     console.log(password,email)
if(!email || email===null){
       return NextResponse.json({message:"check user details",status:500})
}
        
        const findExistingUser = await prisma.user.findFirst({
            where:{
                email
            }
        })
      if(!findExistingUser){
         return NextResponse.json({message:"check user details",status:500})
      }
      const hash = await bcrypt.hash(password, 10);
  
      await prisma.user.update({
        where:{
            id:findExistingUser.id
        },
       data:{
      password:hash
       }
      })
        return NextResponse.json({message:"password updated",status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"can not user",status:500})
    }
}