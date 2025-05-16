"use client"
import { useCartStore } from '@/provider/cart-store'
import confetti from 'canvas-confetti'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const PaymentSuccess = () => {
    const clearCart = useCartStore((state) => state.clearCart);
    const searchParams = useSearchParams()
    const payment_intent = searchParams.get("payment_intent")

    useEffect(()=>{
          if (!payment_intent) return; 
        const updateOrder = async()=>{
          const res=  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/success?paymentIntent=${payment_intent}`,{
             method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
           })

           if(res.status===200){
            clearCart(),
            confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.95, y: 0.05 },
      angle: 180,
      startVelocity: 40,
    });
           }
        }
        updateOrder()
    },[payment_intent])

payment_intent

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
        <h2 className="text-2xl">You successfully sent</h2>

        <Link href={"/"} className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
          home
        </Link>
      </div>
    </main>
  )
}

export default PaymentSuccess