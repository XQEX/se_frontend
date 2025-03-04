"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FiClock, FiHome, FiArrowLeft, FiCheckCircle } from "react-icons/fi"
import { motion } from "framer-motion"

export default function AwaitApproval() {
  const [dots, setDots] = useState(".")

  // Animation for the loading dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md text-center kanit-regular">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-teal-50 mb-8">
          <FiClock className="h-12 w-12 text-seagreen animate-pulse" />
        </div>
        <h1 className="text-5xl font-bold text-seagreen mb-4">รอสักกำเน่อ</h1>

        <div className="flex items-center justify-center mb-6">
          <div className="h-1 w-16 bg-seagreen rounded"></div>
        </div>

        <p className="text-xl text-gray-600 mb-12">กรุณารอเจ้าหน้าที่ยืนยันการสมัคร{dots}</p>
        <div className="mb-10 text-sm text-gray-500 flex items-center justify-center">
          <FiCheckCircle className="mr-2 text-seagreen" />
          <span>เราจะแจ้งให้ทราบเมื่อได้รับการอนุมัติ</span>
        </div>
        <div className="space-y-4 w-full">
          <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-full px-6 py-3 bg-seagreen text-white rounded-lg hover:bg-seagreen/90 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-md">
          <Link
            to="/"
            className="flex items-center justify-center "
          >
            <FiHome className="mr-2" />
            <span>กลับไปยังหน้าหลัก</span>
          </Link>
          </motion.button>
          
          <motion.button
            onClick={() => window.history.back()}
            whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-full px-6 py-3 border-2 border-seagreen text-seagreen rounded-lg hover:bg-teal-50 transition-all duration-300 transform hover:translate-y-[-2px]"
          >
            <FiArrowLeft className="mr-2" />
            <span>ย้อนกลับ</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}

