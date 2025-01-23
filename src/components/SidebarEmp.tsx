import React, { useState } from "react";

function Sidebar() {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("ทั้งหมด"); // Default to "ทั้งหมด"
  const [minSalary, setMinSalary] = useState("10000+");
  const [workHours, setWorkHours] = useState("");

  const salaryOptions = ["10000+", "20000+", "50000+"];
  const provinces = [
    "ทั้งหมด",
    "กรุงเทพมหานคร", "กระบี่", "กาญจนบุรี", "กาฬสินธุ์", "กำแพงเพชร",
    "ขอนแก่น", "จันทบุรี", "ฉะเชิงเทรา", "ชลบุรี", "ชัยนาท", "ชัยภูมิ",
    "ชุมพร", "เชียงราย", "เชียงใหม่", "ตรัง", "ตราด", "ตาก", "นครนายก",
    "นครปฐม", "นครพนม", "นครราชสีมา", "นครศรีธรรมราช", "นครสวรรค์",
    "นนทบุรี", "นราธิวาส", "น่าน", "บึงกาฬ", "บุรีรัมย์", "ปทุมธานี",
    "ประจวบคีรีขันธ์", "ปราจีนบุรี", "ปัตตานี", "พระนครศรีอยุธยา",
    "พังงา", "พัทลุง", "พิจิตร", "พิษณุโลก", "เพชรบุรี", "เพชรบูรณ์",
    "แพร่", "พะเยา", "ภูเก็ต", "มหาสารคาม", "มุกดาหาร", "แม่ฮ่องสอน",
    "ยะลา", "ยโสธร", "ร้อยเอ็ด", "ระนอง", "ระยอง", "ราชบุรี", "ลพบุรี",
    "ลำปาง", "ลำพูน", "เลย", "ศรีสะเกษ", "สกลนคร", "สงขลา", "สตูล",
    "สมุทรปราการ", "สมุทรสงคราม", "สมุทรสาคร", "สระแก้ว", "สระบุรี",
    "สิงห์บุรี", "สุโขทัย", "สุพรรณบุรี", "สุราษฎร์ธานี", "สุรินทร์",
    "หนองคาย", "หนองบัวลำภู", "อ่างทอง", "อุดรธานี", "อุทัยธานี",
    "อุตรดิตถ์", "อุบลราชธานี", "อำนาจเจริญ"
  ];

  const handleJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
  };

  const handleMinSalaryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMinSalary(e.target.value);
  };

  const handleWorkHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkHours(e.target.value);
  };

  const handleSearch = () => {
    console.log({
      jobTitle,
      location,
      salary: minSalary,
      workHours,
    });
  };

  return (
    <div className="flex flex-col h-screen w-1/4 bg-gray-100 text-black">
      <div className="flex flex-col justify-start items-start space-y-4 p-4">
        <div className="text-black font-bold text-lg">ตัวกรองค้นหาผู้สมัคร</div>

        <div className="flex flex-col w-full gap-4">
          {/* ตัวกรองตำแหน่งงาน */}
          <div className="flex flex-col">
            <label className="text-black text-sm mb-1">ตำแหน่งงาน</label>
            <input
              type="text"
              value={jobTitle}
              onChange={handleJobTitleChange}
              placeholder="กรอกตำแหน่งงาน"
              className="text-black rounded-lg border border-gray-300 w-full p-2"
            />
          </div>

          {/* ตัวกรองสถานที่ทำงาน */}
          <div className="flex flex-col">
            <label className="text-black text-sm mb-1">จังหวัด</label>
            <select
              value={location}
              onChange={handleLocationChange}
              className="text-black rounded-lg border border-gray-300 w-full p-2 bg-white"
            >
              {provinces.map((province, index) => (
                <option key={index} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>

          {/* ตัวกรองชั่วโมงทำงาน */}
          <div className="flex flex-col">
            <label className="text-black text-sm mb-1">ชั่วโมงทำงาน</label>
            <input
              type="text"
              value={workHours}
              onChange={handleWorkHoursChange}
              placeholder="ระบุชั่วโมงทำงาน"
              className="text-black rounded-lg border border-gray-300 w-full p-2"
            />
          </div>

          {/* ตัวกรองช่วงเงินเดือน */}
          <div className="flex flex-col">
            <label className="text-black text-sm mb-1">ช่วงเงินเดือน (บาท)</label>
            <select
              value={minSalary}
              onChange={handleMinSalaryChange}
              className="text-black rounded-lg border border-gray-300 w-full p-2 bg-white"
            >
              {salaryOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ปุ่มค้นหา */}
      <button
        onClick={handleSearch}
        className="font-medium rounded-lg p-2 m-4 transition"
        style={{
          backgroundColor: "#2E8B57", // สีเขียว
          color: "white",
          border: "none",
        }}
        onMouseEnter={(e) =>
          ((e.target as HTMLButtonElement).style.backgroundColor = "#1C6F44") // เปลี่ยนสีเมื่อ Hover
        }
        onMouseLeave={(e) =>
          ((e.target as HTMLButtonElement).style.backgroundColor = "#2E8B57") // กลับเป็นสีเดิม
        }
      >
        ค้นหา
      </button>
    </div>
  );
}

export default Sidebar;
