import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ToastContainer } from "react-toastify";

export default function Layout({children}) {
    return (
        <div>
        <ToastContainer position="top-center"
            style={{ fontSize: "24px" }} />
            
            <Header />
            <main>
                {children}
            </main>
            
            <Footer />

        </div>
    )
}
