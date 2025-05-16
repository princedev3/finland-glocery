"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDeleteNewsLetterMutation } from "../_apis_/_newsletter_index.apis";
import { toast } from "sonner";

export default function UnsubscribePage() {
    const [deleteNewsLetter,{isLoading,isSuccess}]=useDeleteNewsLetterMutation()
    const searchParams = useSearchParams()
    const email = searchParams.get("email")
  const router = useRouter();
 
  const handleUnsubscribe = async() => {
    
 const res = await deleteNewsLetter(email)
 if(res.data.status===200){
    toast.success(res.data.message)
    router.push("/")
    return
}
toast.error(res.data.message)
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">Unsubscribe</h1>
        {!isSuccess? (
          <>
            <p className="text-gray-600">
              Are you sure you want to unsubscribe from our emails?
            </p>
            <button
              onClick={handleUnsubscribe}
              className="w-full cursor-pointer bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-xl transition duration-300"
            >
              Yes, Unsubscribe Me
            </button>
            <p className="text-sm text-gray-500">
              Changed your mind?{" "}
              <a
                href="/"
                className="text-blue-500  hover:underline font-medium"
              >
                Stay subscribed
              </a>
            </p>
          </>
        ) : (
          <>
            <div className="text-green-600 text-xl font-medium">
              You've been unsubscribed.
            </div>
            <p className="text-gray-600">
              We're sorry to see you go. You can always re-subscribe from your profile settings.
            </p>
            <button
              onClick={() => router.push("/")}
              className="w-full cursor-pointer bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 rounded-xl transition duration-300"
            >
              Return to Homepage
            </button>
          </>
        )}
      </div>
    </div>
  );
}
