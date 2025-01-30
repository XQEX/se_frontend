import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignIn() {
  const [nameEmail, setNameEmail] = useState("");
  const [password, setPassword] = useState("");

  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper function for toast messages
  const notifyError = (message: string) =>
    toast.error(message, { position: "top-center" });
  const notifySuccess = (message: string) =>
    toast.success(message, { position: "top-center" });

  async function LoginJobseek(e: React.FormEvent) {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const body = {
        nameEmail: nameEmail,
        password: password,
      };

      const response = await fetch(
        "http://localhost:6977/api/user/job-seeker/auth",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(body),
        }
      );

      const { msg, data } = await response.json();

      // If the server returns an error status (example)
      if (!response.ok) {
        notifyError(msg || "มีข้อผิดพลาด กรุณาลองอีกครั้ง");
      } else {
        notifySuccess(msg || "เข้าสู่ระบบชิกสำเร็จ!");
        // TODO: e.g. Redirect the user or clear the form
      }
      console.log(data);
    } catch (error) {
      notifyError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleGoogleOauth() {
    window.open(
      "http://localhost:6977/api/user/job-seeker/oauth/google",
      "_self"
    );
  }
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div
        className={`flex flex-col items-center justify-center flex-grow px-5 ${
          isSubmitting ? "pointer-events-none blur-sm" : ""
        }`}
      >
        {/* Title */}
        <h1 className="kanit-bold text-xl text-center mb-8">เข้าสู่ระบบ</h1>

        {/* Form Section */}
        <div className="w-full max-w-sm space-y-6">
          {/* Username/Email Input */}
          <div className="flex flex-col">
            <label className="text-black text-sm mb-2 kanit-light">
              ชื่อผู้ใช้งานหรืออีเมล
            </label>
            <input
              type="text"
              value={nameEmail}
              placeholder="ชื่อผู้ใช้งานหรืออีเมล"
              onChange={(e) => setNameEmail(e.target.value)}
              className="text-black placeholder-kanit rounded-lg border border-gray-300 p-3"
              onChange={(e) => {
                setNameEmail(e.target.value);
              }}
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label className="text-black text-sm mb-2 kanit-light">
              รหัสผ่าน
            </label>
            <input
              type="password"
              value={password}
              placeholder="รหัสผ่าน"
              onChange={(e) => setPassword(e.target.value)}
              className="text-black placeholder-kanit rounded-lg border border-gray-300 p-3"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          {/* Login Button */}
          <div className="flex justify-center">
            <button
              onClick={LoginJobseek}
              className="bg-seagreen text-white kanit-semibold w-full py-3 rounded-lg"
            >
              เข้าสู่ระบบ
            </button>
          </div>
          <button onClick={handleGoogleOauth}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-google"
              viewBox="0 0 16 16"
            >
              <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
            </svg>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center">
          <Link to="/SignUp" className="text-seagreen kanit-semibold underline">
            ยังไม่ได้สมัครสมาชิก? สมัครที่นี่
          </Link>
        </div>
      </div>
      {/* Spinner Overlay */}
      {isSubmitting && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
          {/* Simple spinner */}
          <label className="text-white  kanit-semibold">กำลังเข้าสู่ระบบ</label>
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}

export default SignIn;
