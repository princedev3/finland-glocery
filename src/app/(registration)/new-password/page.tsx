'use client'
import { useForgotPasswordChangeMutation } from '@/app/_apis_/_user_index.api'
import { motion } from 'framer-motion'
import { LoaderCircle, Lock } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [forgotPasswordChange,{isLoading}]= useForgotPasswordChangeMutation()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")
  const handleForgotPassword = async(e:React.FormEvent<HTMLFormElement>)=>{
 try {
     e.preventDefault()
    const target = e.target as HTMLFormElement
    const formdata = new FormData(target)
    const password = formdata.get("password")
    const res = await forgotPasswordChange({email,password})
if(res.data.status ===200){
  toast.success(res.data.message)
  router.push("/login")
  return
}
toast.success(res.data.message)
 } catch (error) {
  console.log(error)
 }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-md rounded-md p-8 w-full max-w-3xl border"
          >
            <h2 className="text-lg uppercase font-semibold text-[#0095D9] border-l-4 pl-2 border-[#0095D9] mb-6">
             enter new passowrd
            </h2>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="flex items-center border rounded-md bg-blue-50 px-3 py-2">
                <span className="mr-2 text-gray-400">
                 <Lock/>
                </span>
                <input
                  type="password"
                  name='password'
                  placeholder="......"
                  className="bg-transparent flex-1 outline-none"
                />
              </div>
              <motion.button
              disabled={isLoading}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full capitalize bg-[#0095D9] text-white py-2 rounded-md font-semibold"
              >
                {
                  isLoading?  <LoaderCircle className="animate-spin h-5 w-5 mx-auto" />:"Change password"
                }
               </motion.button>
            </form>
     <p className="mt-6 text-center text-lg text-gray-600">
                 Remembered your password?{' '}
                 <Link href="/login" className="text-[#0095D9] hover:underline">
                   Back to Login
                 </Link>
               </p>
          
          </motion.div>
        </div>
  )
}
