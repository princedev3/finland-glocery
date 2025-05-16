import prisma from "@/utils/prisma";
import {  NextResponse } from "next/server";

export const GET = async () => {
  try {
  const allProducts = await prisma.product.findMany({
  where: {
    discount: {
      gte: 1,
    },
  },
  orderBy: {
    createdAt: 'desc',
  },
});
 return NextResponse.json({ allProducts, status: 200 });
  } catch (error) {
    console.error("Failed to fetch recent products:", error);
    return NextResponse.json({ message: "Can not get product", status: 500 });
  }
};



