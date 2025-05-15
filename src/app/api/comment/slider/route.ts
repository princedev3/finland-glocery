import prisma from "@/utils/prisma";
import {  NextResponse } from "next/server";

export const GET = async () => {
  try {
    
    const sliderComment = await prisma.comment.findMany({
      take: 6,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
    return NextResponse.json({
      sliderComment,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "can not get slider comment",
      status: 500,
    });
  }
};
