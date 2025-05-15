import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "@/utils/auth";
import prisma from "@/utils/prisma";


export const GET = async (req: NextRequest) => {
  try {
    const page = req.nextUrl.searchParams.get("page") || "1";
    const search = req.nextUrl.searchParams.get("search") || "";
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({
        message: "can not create order",
        status: 500,
      });
    }
    const whereCondition: Prisma.OrderWhereInput = search
      ? {
          OR: [
            { useremail: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};
    const POST_PER_PAGE = Number(process.env.POST_PER_PAGE);
    if (isNaN(parseInt(page)) || parseInt(page) < 1) {
      return NextResponse.json({ message: "Invalid page number", status: 400 });
    }

    const [allProducts, count] = await prisma.$transaction([
      prisma.order.findMany({
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (parseInt(page) - 1),
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.order.count(),
    ]);

    return NextResponse.json({ allOrders: allProducts, count, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "can not get all order", status: 500 });
  }
};
