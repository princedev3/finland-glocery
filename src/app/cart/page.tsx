"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
// import Link from "next/link";
// import confetti from "canvas-confetti";
import { useDebouncedCallback } from "use-debounce";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useCartStore } from "@/provider/cart-store";
// import LoadingSpinner from "@/components/navbar-collections/loading";
import EmptyCart from "@/components/navbar-collections/empty-cart";
import { userStore } from "@/provider/user-store";
import Buy from "./buy";

const Cart = () => {
  // const router = useRouter();
  const session = userStore((state) => state.session);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState( "" );
  const [email, setEmail] = useState( "");
  const [note, setNote] = useState("");
  const [openCheckout, setOpenCheckout] = useState(false);
  const addressRef = useRef("");
  const phoneRef = useRef("");
  const noteRef = useRef("");
  const emailRef = useRef("");
  const nameRef = useRef("");

 useEffect(() => {
  if (session) {
    setName(session.user?.name ?? "");
    setEmail(session.user?.email ?? "");
  }
}, [session]);
 
  const debouncedSetAddress = useDebouncedCallback((val: string) => {
    setAddress(val);
  }, 300);
  const debouncedSetEmail = useDebouncedCallback((val: string) => {
    setEmail(val);
  }, 300);
  const debouncedSetNote = useDebouncedCallback((val: string) => {
    setNote(val);
  }, 400);
  const debouncedPhoneNumber = useDebouncedCallback((val: string) => {
    setPhoneNumber(val);
  }, 300);
  const debouncedSetName = useDebouncedCallback((val: string) => {
    setName(val);
  }, 300);

  

  const product = useCartStore ((state) => state.products);
  const remove = useCartStore((state) => state.removeFromCart);
 
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const itemCount = useCartStore((state) => state.totalItems);
 

  
  const finalPrice = product.reduce((acc, cur) => acc + cur.price, 0)
 



  if (!product.length) {
    return (
     <EmptyCart/>
    )
  }
  return (
    <div>
      <h1 className="text-center mb-4 text-xl font-semibold text-teal-600 my-6 overflow-x-hidden">
        Checkout (<span className="text-teal-600/80">{itemCount} items</span>){" "}
      </h1>
      <div className="grid md:grid-flow-col md:grid-cols-[2fr_1.2fr] gap-4 ">
        <div className="grid gap-y-4 self-start ">
          {product.map((item) => (
            <div
              className="border grid grid-flow-col justify-between p-3 rounded-lg"
              key={item.id}
            >
              <div className="grid grid-flow-col auto-cols-max gap-3 ">
                <div className="relative w-[120px] h-full ">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                <div className="grid gap-[1px] auto-rows-max ">
                  <span className="capitalize font-medium text-lg text-gray-700">
                    {item.name}{" "}
                  </span>
                  <span className="text-gray-700">
                    QTY: <span className="ml-2">{item.quantity}</span>{" "}
                  </span>
                  <span className="text-gray-700">
                    size: <span className="ml-2">{item.size}</span>{" "}
                  </span>
                  <div className="text-gray-700 capitalize flex items-center gap-2">
                    color:{" "}
                    <div
                      style={{ backgroundColor: item.color }}
                      className={`w-4 h-4 rounded-full`}
                    />
                  </div>
                  <div className="text-gray-700 capitalize">
                    price:
                    <span className="font-semibold text-xl ml-2">
                      €{" "}
                      <span className="text-base">
                        {item.price.toLocaleString()}
                      </span>
                    </span>{" "}
                  </div>
                  <span
                    className="text-red-600 cursor-pointer"
                    onClick={() => remove(item)}
                  >
                    remove
                  </span>
                </div>
              </div>
              <span className="justify-end text-xl">
                <Plus
                  onClick={() => {
                    if (item.quantity < item.initialQuantity) {
                      incrementQuantity(item.id);
                    } else {
                      toast.warning(
                        "You've reached the maximum available quantity."
                      );
                    }
                  }}
                  className={`w-7 h-7 ${
                    item.quantity >= item.initialQuantity
                      ? "cursor-not-allowed opacity-40"
                      : "cursor-pointer"
                  }`}
                  size={30}
                />
              </span>
            </div>
          ))}
        </div>
        {openCheckout === false ? (
          <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="border rounded-lg p-3 self-start grid gap-y-5">
            <h1 className="text-lg font-semibold text-teal-600">
              Billing Details
            </h1>
            <>
              <div className="grid  gap-2 items-center">
                <div className="w-full text-gray-700 text-lg">
                  Name <span className="text-red-600">*</span>
                </div>
                <input
                required
                  type="text"
                  defaultValue={name}
                  onChange={(e) => {
                    const val = e.target.value;
                    nameRef.current = val;
                    debouncedSetName(val);
                  }}
                  className="w-full outline-none py-3 px-1 rounded-sm border"
                />
              </div>
              <div className="grid  gap-2 items-center">
                <div className="w-full text-gray-700 text-lg">
                  Email <span className="text-red-600">*</span>
                </div>
                <input
                required
                  type="email"
                  defaultValue={email}
                  onChange={(e) => {
                    const val = e.target.value;
                    emailRef.current = val;
                    debouncedSetEmail(val);
                  }}
                  className="w-full outline-none py-3 px-1 rounded-sm border"
                />
              </div>
              <div className="grid  gap-2 items-center">
                <div className="w-full text-gray-700 text-lg">
                  Address <span className="text-red-600">*</span>
                </div>
                <input
                required
                  type="text"
                  defaultValue={address}
                  onChange={(e) => {
                    const val = e.target.value;
                    addressRef.current = val;
                    debouncedSetAddress(val);
                  }}
                  className="w-full outline-none py-3 px-1 rounded-sm border"
                />
              </div>
              <div className="grid  gap-2 items-center">
                <div className="w-full text-gray-700 text-lg">
                  Phone <span className="text-red-600">*</span>
                </div>
                <input
                  type="number"
                  defaultValue={phoneNumber}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (!/^\d*$/.test(val)) return;
                    if (val.length > 12) return;
                    phoneRef.current = val;
                    debouncedPhoneNumber(val);
                  }}
                  placeholder="+35853157776"
                  className="w-full outline-none py-3 px-1 rounded-sm border"
                />
              </div>
              <div className="grid  gap-2 items-center">
                <div className="w-full text-gray-700 text-lg">Note</div>
                <input
                  defaultValue={note}
                  onChange={(e) => {
                    const val = e.target.value;
                    noteRef.current = val;
                    debouncedSetNote(val);
                  }}
                  type="text"
                  name="note"
                  placeholder="Note"
                  className="w-full outline-none py-3 px-1 rounded-sm border"
                />
              </div>
            </>

            <motion.button
              disabled={!phoneNumber || !email ||!name || !address }
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpenCheckout(true)}
              className={`bg-teal-600 font-semibold w-full rounded-[30px] pointer-events-auto text-white text-lg cursor-pointer py-3 disabled:cursor-not-allowed disabled:bg-teal-600/80`}
            >
              Proceed to checkout
            </motion.button>
          </motion.div>
        ) : (
          <div className="border rounded-lg p-3 text-[19px] self-start grid gap-y-3">
            <h1 className="text-xl font-semibold text-teal-600">
              Order Summary
            </h1>
            <div className="grid grid-flow-col  justify-between text-gray-700 items-center">
              <span className="w-full">Total Item</span>
              <span className="">{itemCount} </span>
            </div>
            <div className="grid grid-flow-col justify-between text-gray-700 items-center">
              <span className="w-full">Shipping & handling</span>
              <span className="w-full">€ 10</span>
              
            </div>
            <div className="grid grid-flow-col justify-between text-gray-700 items-center">
              <span className="w-full">Estimated Tax</span>
              <span className="">vax (inclusive) </span>
            </div>

            <Separator className="my-3" />
            <div className="">
              <div className="grid grid-flow-col justify-between items-center">
                <span className="w-full font-semibold text-baseBlack">
                  Product price
                </span>
                <span className="font-semibold text-baseBlack">
                  <span className="font-semibold text-xl">€</span>{" "}
                  {finalPrice.toLocaleString()}{" "}
                </span>
              </div>
              <div className="grid grid-flow-col justify-between  items-center">
                <span className="w-full font-semibold text-baseBlack">
                  Total{" "}
                </span>
                <span className="font-semibold text-baseBlack">
                  <span className="font-semibold text-xl">€</span>{" "}
                  {finalPrice +10}
                </span>
              </div>
            </div>
            <Buy totalPrice={finalPrice +10} note={note} phoneNumber={phoneNumber} email={email} name={name} address={address} />
          </div>
        )}
      </div>
      <div className="my-5 text-center text-xl text-teal-600 font-medium">
        We ship to anywhere within Kupio...
      </div>
    </div>
  );
};

export default Cart;