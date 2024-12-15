import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Lottie from "lottie-react";
import Animation from "../Animation/Job.json";
import Footer from "../components/Footer";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import CategoriesGrid from "../components/CategoriesGrid";
import JobCard from "../components/JobCard";
import Sidebar from "../components/Sidebar";
import SearchForm from "../components/SearchForm";

function Home() {
  const style = {
    height: "auto", // Let the height adjust based on container
  };

  // Refs for animations
  const headingRef = useRef(null);
  const subTextRef = useRef(null);
  const lottieRef = useRef(null); // Ref for the Lottie animation

  useEffect(() => {
    // Slide-left animation for the subtext
    gsap.fromTo(
      subTextRef.current,
      { opacity: 0, x: 50 }, // Start from the right (x: 50)
      {
        opacity: 1,
        x: 0, // Move to original position
        duration: 2.5,
        ease: "power2.out", // Smooth easing
      }
    );

    // Fade-in and slide-up animation for heading
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 4.5,
        ease: "power2.out",
      }
    );

    // Fade-in animation for Lottie animation
    gsap.fromTo(
      lottieRef.current,
      { opacity: 0 }, // Start with opacity 0
      {
        opacity: 1, // Fade in to full opacity
        duration: 5,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col md:flex-row bg-white text-[#2e8b57] justify-center items-center p-4 md:p-8">
        {/* Text Section */}
        <div className="flex flex-col items-center md:items-start py-6 text-center md:text-left">
          {/* Animated Heading */}
          <div
            ref={headingRef}
            className="text-3xl md:text-6xl font-bold mb-4 md:mb-6"
          >
            Welcome To Skill bridge
          </div>
          {/* Animated Subtext */}
          <div
            ref={subTextRef}
            className="text-lg md:text-xl mb-6 text-gray-600 kanit-light"
          >
            แหล่งรวมงานสำหรับการหางานของบุคคลกลุ่มเฉพาะทาง
            ที่ช่วยเสริมสร้างความเท่าเทียมกันในสังคม
          </div>
        </div>
        {/* Animation Section */}
        <div ref={lottieRef} className="w-full max-w-xs md:max-w-lg">
          <Lottie animationData={Animation} style={style} />
        </div>
      </div>
      <CategoriesGrid />
      <div className="bg-gray-100 p-4 md:p-8">
        <div className="max-w-screen-lg mx-auto">
          <div className="text-xl md:text-xl mb-6 text-gray-700 kanit-light font-bold text-center md:text-left">
            เริ่มค้นหางานที่ใช่สำหรับคุณ . . .
          </div>
          <SearchForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
