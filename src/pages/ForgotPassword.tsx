"use client"

import { motion } from "framer-motion"
import type React from "react"
import { useState } from "react"
import { FiMail, FiArrowLeft, FiCheck } from "react-icons/fi"
import { Link } from "react-router-dom"


function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
   
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 kanit-regular">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl  text-gray-900">ลืมรหัสผ่าน?</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          กรุณากรอกอีเมลของคุณ เราจะส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปให้คุณ
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {!isSubmitted ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm  text-gray-700">
                  อีเมล
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="focus:ring-seagreen focus:border-seagreen block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="transition-colors duration-300 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-seagreen hover:bg-seagreen-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-seagreen"
                >
                  ส่งลิงก์รีเซ็ตรหัสผ่าน
                </motion.button>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <FiCheck className="mx-auto h-12 w-12 text-seagreen" aria-hidden="true" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">ตรวจสอบอีเมลของคุณ</h3>
                <p className="mt-1 text-sm text-gray-500">เราได้ส่งลิงก์รีเซ็ตรหัสผ่านไปที่ {email} แล้ว</p>
            </div>
          )}

          <div className="mt-6">
            <Link
              to="/signin"
              className="flex items-center justify-center text-sm text-seagreen hover:text-seagreen-dark"
            >
              <FiArrowLeft className="mr-2" />
              กลับไปหน้าเข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword

