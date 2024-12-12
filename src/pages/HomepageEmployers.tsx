import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomepageEmployers = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Logout Button */}
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <button
          style={{
            background: "none",
            border: "none",
            color: "#333",
            cursor: "pointer",
            fontSize: "14px",
          }}
         
        >
        </button>
      </div>
{/* Image Section */}
<div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          {/* Placeholder for Images */}
          <div
            style={{
              width: "440px",
              height: "150px",
              border: "2px solid black",
              backgroundColor: "#ccc",
            }}
          ></div>
          <div
            style={{
              width: "440px",
              height: "150px",
              border: "2px solid black",
              backgroundColor: "#ccc",
            }}
          ></div>
          <div
            style={{
              width: "440px",
              height: "150px",
              border: "2px solid black",
              backgroundColor: "#ccc",
            }}
          ></div>
        </div>
      {/* Content Area */}
      <div style={{ padding: "20px" }}>
        {/* Job Card */}
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1 style={{ fontSize: "32px", margin: 0 }}>SkillBridge</h1>
          </div>
          <h2 style={{ fontSize: "18px", margin: "10px 0" }}>เชียงราย อ.แม่สาย</h2>
          <p style={{ fontSize: "14px", lineHeight: "1.5" }}>
          ผู้ผลิตคอมพิวเตอรที่ใหญ่อันดับหนึ่งในโลก มีทีมศึกษาวิจัยและพัฒนาที่แข็งแกร่ง ซึ่งได้รับการยกย่องเป็นผู้ผลิตคอมพิวเตอร์โน๊ตบุ๊ค
          ระหว่างประเทศที่ใหญ่อันดับหนึ่งติดต่อกันมาเป็นเวลาหลายๆปี ในขณะเดียวกัน ได้ประยุกต์ใช้กลยุทธ์ทางธุรกิจที่ยืดหยุ่นในการสร้างผลิตภัณฑ์
          หลากหลายที่มีมูลค่าเพิ่มสูงด้วยเทคโนโลยีระดับชั้นนำ ความสามารถด้านการศึกษาวิจัยและพัฒนาที่โดดเด่นและต้นทุนที่กำลังการแข่งขันอยู่สูง ปัจจุบันได้กลายเป็นแหล่งผลิตคอมพิวเตอร์โน๊ตบุ๊คที่สำคัญระดับโลก ค.ศ.2019 
          ในรายชื่อบริษัทชั้นนำ 500 อันดับแรกของโลกที่ประกาศโดยนิตยสารฟอร์จูน Quanta Computer ติดอยู่ในอันดับที่ 349 Quanta Computer 
          ให้ความสำคัญอย่างยิ่งกับการผลิตที่มีคุณภาพสูง พร้อมพัฒนาการสื่อสารไร้สายและผลิตภัณฑ์แอลซีดีแบบซิงโครนัส 
          นำหน้ากระแสตลาดไฮเทคและมีความร่วมมือระยะยาวกับบริษัทที่มีชื่อเสียงระดับโลกหลายแห่ง บริษัทได้ชักชวนบุคลากรดีเด่นในวงการเป็นจำนวนมาก ให้ความสนใจกับการศึกษาค้นคว้า การพัฒนาและการผลิต ไม่เพียงแต่มุ่งมั่นในการพัฒนาและการสร้างนวัตกรรมผลิตภัณฑ์เท่านั้น 
          แต่ยังขยายเครือข่ายการตลาดอย่างแข็งขัน ซึ่งทำให้ผลิตภัณฑ์มีชื่อเสียงในวงการอุตสาหกรรมเนื่องจากคุณภาพที่ยอดเยี่ยมและเทคโนโลยีชั้นนำ และได้รับความนิยมอย่างมากจากตลาดในประเทศที่ทันสมัย เช่น ยุโรป อเมริกาและญี่ปุ่น เป็นต้น
          </p>
        </div>

        

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <button
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            คำร้องขอสมัคร
          </button>
          <button
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            แก้ไขข้อมูล
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomepageEmployers;
