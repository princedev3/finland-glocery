"use client"
import React, { useEffect, useRef, useState } from 'react'
import { LoaderCircle, Star } from 'lucide-react';
import emojiData from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { userStore } from '@/provider/user-store';
import { toast } from 'sonner';
import { useCreateCommentMutation } from '@/app/_apis_/_comment_index.apis';
import { useParams } from 'next/navigation';
const Comment = () => {
    const {id}=useParams()
    const [createComment,{isLoading:iscreatingComment}]=  useCreateCommentMutation()
     const session = userStore((state) => state.session);
     const [message, setMessage] = useState("");
  const [emojiOpen, setEmojiOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);
    const handleEmojiSelect = (emoji: any) => {
    setMessage((prev) => prev + emoji.native);
  };
   useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setEmojiOpen(false);
      }
    };

    if (emojiOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiOpen]);
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
try {
    e.preventDefault()
  if(!session?.user){
    toast.error("kindly login")
    return
  }
   const target = e.target as HTMLFormElement;
      const formdata = new FormData(target);
      const rating = formdata.get("rating");
      await createComment({
        rating,
        message,
        userId: session?.user?.id,
        productId: id,
      });
     
     setMessage("")
     
      
} catch (error) {
    console.log(error)
}
  }
  return (
    <form onSubmit={handleSubmit} className="mt-10">
            <div className="grid gap-y-2 mt-4 mb-2">
                 <h2 className="text-2xl font-bold my-10">Customer Reviews</h2>
              <span className="text-gray-700 text-lg">
                Your email address will not be published. Require fields are
                marked<b className="text-red-600">*</b>
              </span>
              <div className="flex items-center">
                <span className="text-gray-700 text-lg">
                  You rating of this product
                </span>
                <Star className="w-4 h-4 text-yellow-500" />
                <Star className="w-4 h-4 text-yellow-500" />
                <Star className="w-4 h-4 text-yellow-500" />
                <Star className="w-4 h-4 text-yellow-500" />
              </div>
            </div>
            <div className="grid grid-cols-[1fr_auto] border rounded-md shadow  ">
              <Textarea
                required
                cols={7}
                placeholder="write your review*"
                value={message}
                className="!border-none !focus:ring-0 !focus:outline-none !shadow-none !outline-0 focus:border-none !focus:ring-0 !focus:outline-none  resize-none"
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="relative h-full">
                <button
                  type="button"
                  className="bg-gray-50 cursor-pointer w-[50px] md:w-[100px] h-full"
                  onClick={() => setEmojiOpen(!emojiOpen)}
                >
                  😊
                </button>
                 {emojiOpen && (
                  <div
                    ref={pickerRef}
                    className="absolute top-full right-0 z-50"
                  >
                     <Picker
                      data={emojiData}
                      onEmojiSelect={handleEmojiSelect}
                    /> 
                  </div>
                )} 
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <Select required name="rating">
                <SelectTrigger className="w-full py-6">
                  <SelectValue placeholder="Rating*" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">One</SelectItem>
                  <SelectItem value="2">Two</SelectItem>
                  <SelectItem value="3">Three</SelectItem>
                  <SelectItem value="4">Four</SelectItem>
                  <SelectItem value="5">Five</SelectItem>
                </SelectContent>
              </Select>
              <Button
              disabled={iscreatingComment}
                type="submit"
                className="bg-black text-lg font-semibold  py-6"
              >
                {iscreatingComment ? (
                  <LoaderCircle
                    className="animate-spin grid mx-auto"
                    color="white"
                    size={22}
                  />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
  )
}

export default Comment