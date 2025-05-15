"use client"
import Footer from '@/components/navbar-collections/footer'
import Navbar from '@/components/navbar-collections/navbar'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Provider } from "react-redux";
import { store } from './rtk-store-provider'

const authRoute = ["/new-password","/login","/register","/forgot-password","/verify-email","/forgot-password-check"]
const LayoutProvider = ({children}:{children:React.ReactNode}) => {
    const pathName = usePathname()
  return (
    <Provider store={store}>
       {!authRoute.includes(pathName) && <Navbar/>}
             {children}     
        {!authRoute.includes(pathName) && <Footer/>}
    </Provider>
  )
}

export default LayoutProvider