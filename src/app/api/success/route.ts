import { sendEmailWithPdf } from "@/components/send-order-emails/sendorderemailwithpdf";
import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest) {
  try {
    const paymentIntent = req.nextUrl.searchParams.get("paymentIntent") as string;

    const fetchOrder = await prisma.$transaction(async (tx) => {
      const order = await tx.order.update({
        where: { intentId: paymentIntent },
        data: { paymentStatus: "PAID/SUCCESSFUL" },
      });

      const orderedProducts = order.product as {
        id: string;
        quantity: number;
      }[];

      for (const item of orderedProducts) {
        const product = await tx.product.findFirst({
          where: { id: item.id },
          select: { quantity: true },
        });

        if (!product) {
          throw new Error(`Product with ID ${item.id} not found`);
        }

        if (product.quantity < item.quantity) {
          throw new Error(`Not enough stock for product ${item.id}`);
        }

        await tx.product.update({
          where: { id: item.id },
          data: {
            quantity: { decrement: item.quantity },
          },
        });
      }

      return order; 
    });

    await sendEmailWithPdf(fetchOrder);

    return NextResponse.json({ message: "successful", status: 200 });
  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}


