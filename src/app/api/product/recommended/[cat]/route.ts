import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
type ParamType = {
  params: Promise<{ cat: string }>;
};
export const GET = async (req: NextRequest, { params }: ParamType) => {
  try {
    const { cat} = await params;
    const getSingleFetch = await prisma.product.findMany({
      where: {
        cat:cat as string
      },
    });
    return NextResponse.json({ getSingleFetch, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "can not get product", status: 500 });
  }
};