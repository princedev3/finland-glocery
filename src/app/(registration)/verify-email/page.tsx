'use client'
import { BeatLoader } from "react-spinners";
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyEmailMutation } from "@/app/_apis_/_user_index.api";
import { useEffect } from "react";
import { toast } from "sonner";

export default function VerifyEmail() {
  const [verifyEmail]= useVerifyEmailMutation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  useEffect(()=>{
const checkEmail = async()=>{
 const res =  await verifyEmail({token})
 if(res.data.status ===200){
  toast.success(res.data.message)
  router.push("/login")
  return
 }
 toast.error(res.data.message)
}
checkEmail()
  },[token,router])
 
  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-md rounded-md p-8 w-full max-w-3xl border"
          >
            <h2 className="text-lg uppercase font-semibold text-[#0095D9] border-l-4 pl-2 border-[#0095D9] mb-6">
              verify email
            </h2>
    <form action="" className="grid mx-auto text-center">
     <div className="flex items-center justify-center gap-1">
         <span className="capitalize font-semibold text-[#0095D9] text-xl">
              verifying email
         </span>
         <BeatLoader size={10} color="#0095D9" />
       </div>
     </form>
     <p className="mt-6 text-center text-lg text-gray-600">
                please wait...
               </p>
          </motion.div>
        </div>
  )
}
