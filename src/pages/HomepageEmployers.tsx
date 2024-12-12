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
            <h1 style={{ fontSize: "24px", margin: 0 }}>ก.</h1>
          </div>
          <h2 style={{ fontSize: "18px", margin: "10px 0" }}>เชียงราย อ.แม่สาย</h2>
          <p style={{ fontSize: "14px", lineHeight: "1.5" }}>
            ผู้ผลิตคอมพิวเตอร์ที่ใหญ่เป็นอันดับหนึ่งในโลก มีทีมศึกษาวิจัยและพัฒนาที่แข็งแกร่ง ซึ่งได้รับการยกย่องเป็นหนึ่งในบริษัท...
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
