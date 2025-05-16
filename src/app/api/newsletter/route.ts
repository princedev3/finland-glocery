import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const existingSubcriber = await prisma.newsletterSubscriber.findFirst({
      where: {
        email: body.email,
      },
    });
    if (existingSubcriber) {
      return NextResponse.json({
        message: "you already subscribed to newsletter.",
        status: 200,
      });
    }
    await prisma.newsletterSubscriber.create({
      data: {
        email: body.email,
      },
    });
    return NextResponse.json({
      message: "Thank you for subscribing.",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "can not suscribe to newsletter",
      status: 500,
    });
  }
};
export const DELETE = async (req: NextRequest) => {
  try {
   const rawEmail = req.nextUrl.searchParams.get("email") as string;
 const email =   decodeURIComponent(rawEmail).trim().toLowerCase()
    const existingSubcriber = await prisma.newsletterSubscriber.findFirst({
      where: {
      email: {
      equals: email,
      mode: "insensitive",
    },
      },
    });
    if (existingSubcriber) {
      await prisma.newsletterSubscriber.delete({
        where: {
          email: email,
        },
      });

      return NextResponse.json({
        message: "Thank you have unsubscribed",
        status: 200,
      });
    }
    return NextResponse.json({
      message: "something went wrong",
      status: 500,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "something went wrong",
      status: 500,
    });
  }
};
