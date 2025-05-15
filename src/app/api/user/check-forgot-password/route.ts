import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { generateResetPasswordToken } from "@/utils/generate-verification-tokensbyemail";
import { sendVerificationEmail } from "@/utils/sendVerificationTokenByEmail";

export const POST = async(req:NextRequest)=>{
    try {
        const {token} = await req.json()
if(!token){
 return NextResponse.json({message:"something went wrong",status:500})
}
const findToken = await prisma.passwordResetToken.findFirst({
            where:{
                token
            }
        })
      if(!findToken){
         return NextResponse.json({message:"something went wrong",status:500})
      }
  const findUser = await prisma.user.findFirst({
    where:{
        email:findToken.email
    }
  })
   if(!findUser){
         return NextResponse.json({message:"something went wrong",status:500})
      }
      if(new Date() > findToken.expires){
          const newToken = await generateResetPasswordToken(
        findUser?.email as string
      );
      await sendVerificationEmail(
        findUser?.email as string,
        newToken.token,"forgot-password-check"
      );
      return NextResponse.json({ message: "check email again", status: 500 });
      }
    await prisma.passwordResetToken.delete({
      where: {
        id:findToken.id as string,
      },
    });
    return NextResponse.json({message:findUser.email,status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"can not verify email",status:500})
    }
}