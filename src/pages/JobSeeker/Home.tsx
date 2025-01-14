import { useEffect, useRef } from "react";
import Navbar from "../../components/Navbar"; // Navbar component
import Lottie from "lottie-react"; // Lottie animation
import Animation from "../../Animation/Job.json"; // Lottie animation
import { gsap } from "gsap"; // for animaitons texts
import { Link } from "react-router-dom"; // for link to other page

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
        duration: 2.5,
        ease: "power2.out",
      }
    );

    // Fade-in animation for Lottie animation
    gsap.fromTo(
      lottieRef.current,
      { opacity: 0 }, // Start with opacity 0
      {
        opacity: 1, // Fade in to full opacity
        duration: 2.5,
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
            className="text-4xl md:text-6xl font-bold mb-4 md:mb-6"
          >
            Welcome To SkillBridge
          </div>
          {/* Animated Subtext */}
          <div
            ref={subTextRef}
            className="text-lg md:text-xl mb-6 text-gray-600 kanit-light"
          >
            แหล่งรวมงานสำหรับการหางานของบุคคลกลุ่มเฉพาะทาง
            ที่ช่วยเสริมสร้างความเท่าเทียมกันในสังคม
          </div>
          <Link to="/find">
            <div className="px-8 flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M8 4l8 8-8 8V4z" />
              </svg>
              <u>Explore for your job here</u>
            </div>
          </Link>
          <Link to="/findemp">
            <div className="px-8 flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M8 4l8 8-8 8V4z" />
              </svg>
              <u>Find your Employee</u>
            </div>
          </Link>
        </div>
        {/* Animation Section */}
        <div ref={lottieRef} className="w-full max-w-xs md:max-w-xl">
          <Lottie animationData={Animation} style={style} />
        </div>
      </div>
    </div>
  );
}

export default Home;
