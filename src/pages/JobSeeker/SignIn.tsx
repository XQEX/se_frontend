import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Import Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignIn() {
  const navigate = useNavigate();
  const [nameEmail, setNameEmail] = useState("");
  const [password, setPassword] = useState("");

  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function LoginJobseek(e: React.FormEvent) {
    e.preventDefault();

    setIsSubmitting(true);
    // Helper function for toast messages
    const notifyError = (message: string) =>
      toast.error(message, { position: "top-center" });
    const notifySuccess = (message: string) =>
      toast.success(message, { position: "top-center" });

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
      ).then((res) => res.json());

      const { success, msg, data } = await response;

      // If the server returns an error status (example)
      if (!success) {
        notifyError(msg || "มีข้อผิดพลาด กรุณาลองอีกครั้ง");
      } else {
        notifySuccess(msg || "เข้าสู่ระบบชิกสำเร็จ!");
        // navigate("/");
        // TODO: e.g. Redirect the user or clear the form
      }

      console.log(success, msg, data);
    } catch (error) {
      notifyError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={`h-screen flex flex-col`}>
      <ToastContainer />
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
              placeholder="ชื่อผู้ใช้งานหรืออีเมล"
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
              placeholder="รหัสผ่าน"
              className="text-black placeholder-kanit rounded-lg border border-gray-300 p-3"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          {/* Login Button */}
          <div className="flex justify-center">
            <button
              className="bg-seagreen text-white kanit-semibold w-full py-3 rounded-lg"
              onClick={LoginJobseek}
            >
              {isSubmitting ? "กำลังดำเนินการ..." : "เข้าสู่ระบบ"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center">
          <Link to="/SignUp" className="text-seagreen kanit-semibold underline">
            ยังไม่ได้สมัครสมาชิก? สมัครที่นี่
          </Link>
        </div>
      </div>
      {/*Spinning */}
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
