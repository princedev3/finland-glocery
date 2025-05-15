'use client'
import { motion } from 'framer-motion'
import { LoaderCircle, Lock, Mail } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signIn } from "next-auth/react";
import { toast } from 'sonner';


export default function RegisterPage() {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setLoading(false);
    if (res?.ok && !res.error) {
      console.log(res)
      toast.success("Login successful!");
      router.push("/");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-md rounded-md p-8 w-full max-w-3xl border"
      >
        <h2 className="text-xl font-semibold text-[#0095D9] border-l-4 pl-2 border-[#0095D9] mb-6">
          LOG IN
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border rounded-md bg-blue-50 px-3 py-2">
            <span className="mr-2 text-gray-400">
             <Mail/>
            </span>
            <input
              type="email"
              name='email'
              required
              placeholder="marvinprince232@gmail.com"
              className="bg-transparent flex-1 outline-none"
            />
          </div>
          <div className="flex items-center border rounded-md bg-blue-50 px-3 py-2">
            <span className="mr-2 text-gray-400">
              <Lock/>
            </span>
            <input
              type="password"
              name='password'
              required
              minLength={5}
              placeholder="••••••••"
              className="bg-transparent flex-1 outline-none"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-[#0095D9] text-white py-2 rounded-md font-semibold"
          >
   {loading ? (
  <LoaderCircle className="animate-spin h-5 w-5 mx-auto" />
) : (
  " Log In"
)}
</motion.button>
        </form>
        <div className="flex justify-between mt-4 text-sm text-red-600 font-medium">
          <Link href="/forgot-password" className="text-xl cursor-pointer">Forgot Password?</Link>
          <Link href="/register" className="text-xl cursor-pointer">Register</Link>
        </div>
      </motion.div>
    </div>
  )
}
