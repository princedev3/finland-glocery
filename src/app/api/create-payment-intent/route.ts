import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    const { amount ,product,note,email,address,name,phoneNumber} = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "eur",
       payment_method_types: ['card']
      // automatic_payment_methods: { enabled: true },
    });
    
await prisma.order.create({
    data:{
        amount:amount/100,
        useremail:email,
        userPhone:phoneNumber,
        note:note?note:"",
        orderAddress:address,
        intentId:paymentIntent.id,
        paymentStatus:"NOT-Paid",
        deliveryStatus:"one",
        product:product,
        username:name
    }
})
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}