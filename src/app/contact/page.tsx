'use client';
import Maps from '@/components/map';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 flex items-center justify-center">
      <motion.div
        className="bg-white rounded-xl shadow-xl w-full max-w-5xl p-8 space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
       <motion.h2
         className="text-3xl md:text-4xl font-extrabold text-teal-800 text-center"
      initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
         >
         Contact <span className="text-teal-500">Us</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-700">LANDMARKIT</h3>
              <p className="text-gray-600 leading-relaxed">
                Kishore Sapphire<br />
                6th Floor, Madhapur<br />
                Hyderabad, 500084
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2">
              <Phone className='w-5 h-5'/>
              <p className="text-lg text-gray-600"> 999-9999-999</p>
              </div>
              <div className="flex items-center gap-2">
              <Phone className='w-5 h-5'/>
              <p className="text-lg text-gray-600"> 999-9999-999</p>
              </div>
          
              <p className="text-lg text-blue-600 underline">contact@landmarkit.in</p>
            </div>
            <div className="bg-teal-100 w-16 h-16 flex items-center justify-center rounded-full">
              <svg className="w-8 h-8 text-teal-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3zm0 0v10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 21h14" />
              </svg>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Name" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400" />
              <input type="text" placeholder="Company" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400" />
              <input type="email" placeholder="Email" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400" />
              <input type="text" placeholder="Phone" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400" />
              <textarea placeholder="Message" className="p-3 border border-gray-300 rounded-md sm:col-span-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-teal-400"></textarea>
              <div className="sm:col-span-2 flex justify-end">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-teal-700 text-white px-6 py-2 rounded-md shadow-md hover:bg-teal-800 transition-all duration-300"
                >
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
        {/* Map + Social Icons */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mt-8 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
       <Maps/>
        </motion.div>
      </motion.div>
     </div>
  );
}
