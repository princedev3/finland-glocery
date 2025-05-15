import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateVerificationtokenbyemail } from "@/utils/generate-verification-tokensbyemail";
import { sendVerificationEmail } from "@/utils/sendVerificationTokenByEmail";

export const POST = async(req:NextRequest)=>{
    try {
        const {name,password,email} = await req.json()
     
if(!email || email===null){
  return NextResponse.json({message:"check user details",status:500})
}
        
        const findExistingUser = await prisma.user.findFirst({
            where:{
                email
            }
        })
      if(findExistingUser){
         return NextResponse.json({message:"check user details",status:500})
      }
      const hash = await bcrypt.hash(password, 10);
    const verifyToken =   await generateVerificationtokenbyemail(email)
    await sendVerificationEmail(email,verifyToken.token,"verify-email")
      await prisma.user.create({
       data:{
         email,password:hash,name
       }
      })
        return NextResponse.json({message:"check your email",status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"can not user",status:500})
    }
}