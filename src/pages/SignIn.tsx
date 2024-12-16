import React from "react";
import Navbar from "../components/Navbar";
import { Button } from "@mantine/core";

function SignIn() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex p-5">
        <div className="kanit-bold text-center pt-5">เข้าสู่ระบบ</div>
        <button className="bg-seagreen text-white kanit-semibold w-30 h-15 rounded">
          สำหรับบริษัทคลิคที่นี่
        </button>
      </div>

      <div className="flex flex-col p-10 justify-center">
        <label className="text-black text-sm mb-1 kanit-light">
          ชื่อผู้ใช้งานหรืออีเมล
        </label>
        <input
          type="text"
          placeholder="ชื่อผู้ใช้งานหรืออีเมล"
          className="text-black placeholder-kanit rounded-lg border border-gray-300 w-2/5 p-2"
        />
      </div>
      <div className="flex flex-col px-10">
        <label className="text-black text-sm mb-1 kanit-light">รหัสผ่าน</label>
        <input
          type="text"
          placeholder="รหัสผ่าน"
          className="text-black placeholder-kanit rounded-lg border border-gray-300 w-2/5 p-2"
        />
      </div>
      <div className="flex justify-center">
        <button className="bg-seagreen text-white kanit-semibold w-100 h-50 rounded">
          เข้าสู่ระบบ
        </button>
        <button className="border-spacing-4 text-black kanit-semibold w-10 h-5 pt-8">
          ยังไม่ได้สมัครสมาชิค? สมัครที่นี่
        </button>
      </div>
    </div>
  );
}

export default SignIn;
