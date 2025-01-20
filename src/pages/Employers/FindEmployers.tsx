import React from "react";
import NavbarEmp from "../../components/NavbarEmp";
import SidebarEmp from "../../components/SidebarEmp";
import JobCardEmp from "../../components/JobCardEmp";
import Footer from "../../components/Footer";
import { Pagination, ScrollArea } from "@mantine/core";

const FindEmployers: React.FC = () => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("ค่าที่ค้นหา:", e.target.value);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* แถบเมนูนำทาง (Navbar) */}
      <NavbarEmp />

      {/* เนื้อหาหลัก (Main Content) */}
      <div className="flex flex-row">
        {/* แถบเมนูด้านข้าง (Sidebar) */}
        <SidebarEmp />

        {/* ส่วนแสดงผลหลัก (Main Section) */}
        <div className="w-3/4 p-4">
          <div className="kanit-medium mb-4 text-2xl">ค้นหาผู้สมัครงาน</div>

          {/* รายการผู้สมัคร (Job Cards) */}
          <ScrollArea style={{ height: "70vh" }}>
            <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <JobCardEmp
                  key={index}
                  jobTitle={`ตำแหน่งงาน ${index + 1}`}
                  Name={`ผู้สมัครงาน ${index + 1}`}
                  expectedPosition="วิศวกรซอฟต์แวร์"
                  expectedSalary={`฿${(index + 1) * 1000}`}
                  onViewDetails={() =>
                    console.log(`ดูรายละเอียดสำหรับผู้สมัครงาน ${index + 1}`)
                  }
                />
              ))}
            </div>
          </ScrollArea>

          {/* ระบบแบ่งหน้า (Pagination) */}
          <div className="flex items-center justify-center mt-6">
            <Pagination total={10} color="teal" />
          </div>
        </div>
      </div>

      {/* ส่วนท้ายของหน้า (Footer) */}
      <Footer />
    </div>
  );
};

export default FindEmployers;
