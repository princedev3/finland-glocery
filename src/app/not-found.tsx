import { navbarItems } from '@/constants/data'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
<div
  className="bg-cover bg-center h-screen bg-no-repeat w-full flex items-center justify-center"
  style={{ backgroundImage: "url('/notfound.png')" }}
>
  <div className="bg-[#333253]/60 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto text-white shadow-xl w-full">
    <h1 className="text-4xl font-extrabold mb-4 text-center">
      You have landed in the 404 errorverse
    </h1>
    <p className="text-lg mb-6 text-center">
      Use a wormhole (aka link) to get back to the good stuff.
    </p>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-2 sm:grid-cols-1">
      {navbarItems.map((item) => (
        <Link
          key={item.id}
          href={item.pathName}
          className="block text-center capitalize py-2 px-4 bg-white/20 hover:bg-white/30 rounded-lg text-lg font-medium transition-all duration-300"
        >
          {item.title}
        </Link>
      ))}
    </div>
    <div className="mt-8 text-center">
      <Link
        href="/"
        className="inline-block bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300"
      >
        Go to Homepage
      </Link>
    </div>
  </div>
</div>


  )
}

export default NotFound