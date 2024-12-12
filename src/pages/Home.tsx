import React from "react";
import Navbar from "../components/Navbar";
import Lottie from "lottie-react";
import Animation from "../Animation/Job.json";
import { Button, Input } from "@mantine/core";
import { useState } from "react";

function Home() {
  const style = {
    height: 600,
  };
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-row bg-white text-[#2e8b57] justify-center items-center ">
        <div className=" flex flex-col items-center  py-6">
          <div className="text-6xl font-bold mb-4">Welcome To Skill bridge</div>
          <div className="text-xl text-center mb-6 text-black">
            แหล่งรวมงานสำหรับการหางานของบุคคลกลุ่มเฉพาะทาง
            ที่ช่วยเสริมสร้างความเท่าเทียมกันในสังคม
          </div>
          <div className="flex flex-row items-center justify-center space-x-4">
            <Input
              classNames={{
                input: `bg-white text-black px-4 py-2 text-lg rounded-md transition-all duration-300 ${
                  isFocused ? "w-120" : "w-120"
                }`,
              }}
              placeholder="ค้นหางานที่คุณสนใจ"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <Button
              classNames={{
                root: "bg-green-500 text-white hover:bg-black hover:text-white text-lg px-6 py-3 rounded-md transition-all duration-300",
              }}
            >
              ค้นหา
            </Button>
          </div>
        </div>
        <Lottie animationData={Animation} style={style} />
      </div>
    </div>
  );
}

export default Home;
