import React, { useState } from "react";
import { NavbarEmp } from "../../components/NavbarEmp";
import Footer from "../../components/Footer";
import "./ProfileEmployers.css";

const ProfileEmployers: React.FC = () => {
  const [images, setImages] = useState<(string | null)[]>([null, null, null]);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedImages = [...images];
        updatedImages[index] = reader.result as string;
        setImages(updatedImages);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    alert("โปรไฟล์ถูกสร้างเรียบร้อย!");
  };

  return (
    <div>
      <NavbarEmp />
      <div className="profile-container">
        <h1 className="profile-title">โปรไฟล์</h1>

        {/* Image Upload Section */}
        <div className="image-row">
          {["small", "large", "small"].map((size, index) => (
            <div className={`image-upload ${size}`} key={index}>
              <label htmlFor={`imageUpload${index}`}>
                {images[index] ? (
                  <img
                    src={images[index]}
                    alt={`Uploaded ${index}`}
                    className="uploaded-image"
                  />
                ) : (
                  <div className="upload-placeholder">+</div>
                )}
              </label>
              <input
                id={`imageUpload${index}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, index)}
                style={{ display: "none" }}
              />
            </div>
          ))}
        </div>

        {/* Form Section */}
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="companyName">ชื่อ</label>
            <input
              type="text"
              id="companyName"
              placeholder="กรอกชื่อของคุณ..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="description1">หัวข้อ</label>
            <input
              type="text"
              id="description1"
              placeholder="กรอกคำอธิบายเกี่ยวกับของคุณ..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="description2">หัวข้อ</label>
            <input
              type="text"
              id="description2"
              placeholder="กรอกคำอธิบายเกี่ยวกับของคุณ..."
            />
          </div>
        </div>

        <button className="submit-button" onClick={handleSubmit}>
          สร้างโปรไฟล์
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileEmployers;
