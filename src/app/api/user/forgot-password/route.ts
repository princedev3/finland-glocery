import { generateResetPasswordToken } from "@/utils/generate-verification-tokensbyemail";
import prisma from "@/utils/prisma";
import { sendVerificationEmail } from "@/utils/sendVerificationTokenByEmail";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req:NextRequest)=>{
    try {
        const {email}=await req.json()
       const findUser = await prisma.user.findFirst({
        where:{
            email
        }
       })
       if(!findUser){
            return NextResponse.json({message:"check user details",status:500})
       }

       const token = await generateResetPasswordToken(email)
       await sendVerificationEmail(email,token.token,"forgot-password-check")

        return NextResponse.json({message:"check your email",status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"can not change password",status:500})
    }
}