import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import { convertToSubcurrency } from "@/constants/helper-functions";
import CheckoutPage from "@/components/checkoutpage";
import { useEffect, useState } from "react";
import { useCartStore } from "@/provider/cart-store";


const Buy = ({totalPrice,email,note,address,name,phoneNumber}:{totalPrice:number,note?:string, email:string,name:string,address:string,phoneNumber:string}) => {
 const stripePromise =loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)
  const [clientSecret, setClientSecret] = useState("");
  const cartItemsProducts = useCartStore((state) => state.products);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: convertToSubcurrency(totalPrice),
        note,
        product: cartItemsProducts , 
        email,
        address,
        name,
        phoneNumber,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [totalPrice]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>payment</Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto">
        <DialogHeader>
          {clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: { theme: "flat" },
              }}
            >
              <CheckoutPage
                clientSecret={clientSecret}
                amount={totalPrice}
              />
            </Elements>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default Buy