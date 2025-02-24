import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { motion } from "framer-motion";
import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";

function Profile() {
  const {
    user,
    isLoading,
    refetchjobseeker,
    refetchemployer,
    refetchCompany,
    isStale,
    setUser,
  } = useUser();
  const [isHaveUser, setIsHaveUser] = useState(false);
  useEffect(() => {
    refetchjobseeker();
    refetchCompany();
    refetchemployer();
    // console.log("current user:", user);
    // console.log("isLoading:", isLoading);
    // console.log("isHaveUser :", isHaveUser);
    // console.log("isStale :", isStale);
    setIsHaveUser(!!user);
  }, [user, isLoading, isStale]);
  // Track which tab is active; default is "work"
  const [activeTab, setActiveTab] = React.useState("work");

  // Function to handle tab changes
  const handleTabClick = (tabName: React.SetStateAction<string>) => {
    setActiveTab(tabName);
  };

  // Common classes for all tabs
  const baseTabClasses = "pb-1 transition";

  // Active vs. inactive styles
  const activeClasses =
    "text-gray-900 font-semibold border-b-2 border-gray-900";
  const inactiveClasses = "text-gray-600 hover:text-gray-900";

  return (
    <div>
      <Navbar
        user={user}
        isLoading={isLoading}
        isHaveUser={isHaveUser}
        refetchjobseeker={refetchjobseeker}
        refetchemployer={refetchemployer}
        refetchCompany={refetchCompany}
        isStale={isStale}
        setUser={setUser}
      />

      <header className="bg-gradient-to-r from-seagreen to-green-400 h-40 w-full relative"></header>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 -mt-20 flex flex-col md:flex-row items-center md:items-start">
            <div className="w-48 h-48 rounded-3xl overflow-hidden border-4 border-white shadow-md">
              <img
                src="พิการ.jpg"
                alt="Profile photo"
                className="object-cover w-full h-full"
              />
            </div>

            <div className="mt-4 md:mt-0 md:ml-6 flex-1">
              <div className="flex items-center">
                <h1 className="text-xl md:text-2xl font-semibold mr-2">
                  {user.firstName} {user.lastName}
                </h1>
              </div>

              <p className="text-gray-600 mt-1 text-sm md:text-base">
                {user.email}
              </p>

              {/* <div className="flex items-center mt-4 space-x-2">
              <button className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-black transition">
                Follow
              </button>
              <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition">
                Get in touch
              </button>
            </div> */}
            </div>

            <div className="mt-6 md:mt-0 md:ml-auto grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-lg font-semibold">2,985</p>
                <p className="text-sm text-gray-500">Work</p>
              </div>
              <div>
                <p className="text-lg font-semibold">132</p>
                <p className="text-sm text-gray-500">Following</p>
              </div>
              <div>
                <p className="text-lg font-semibold">548</p>
                <p className="text-sm text-gray-500">Likes</p>
              </div>
            </div>
          </div>

          {/* Add Quick Action Buttons */}
          <div className="bg-white rounded-lg shadow-md p-4 mt-4 flex justify-center space-x-4">
            <Link
              to="/my-posts"
              className="flex-1 bg-seagreen/80 text-white px-4 py-3 rounded-lg hover:bg-seagreen transition text-center font-medium"
            >
              โพสต์งานของฉัน
            </Link>
            <Link
              to="/find"
              className="flex-1 bg-seagreen/80 text-white px-4 py-3 rounded-lg hover:bg-seagreen transition text-center font-medium"
            >
              ค้นหางาน
            </Link>
            <Link
              to="/trackjobseeker"
              className="flex-1 bg-seagreen/80 text-white px-4 py-3 rounded-lg hover:bg-seagreen transition text-center font-medium"
            >
              ติดตามงาน
            </Link>
          </div>

          <div className="mt-8 flex items-center space-x-4 border-b border-gray-200 pb-2">
            <button
              className={
                baseTabClasses +
                " " +
                (activeTab === "work" ? activeClasses : inactiveClasses)
              }
              onClick={() => handleTabClick("work")}
            >
              Work <span className="text-sm text-gray-500">54</span>
            </button>
            <button
              className={
                baseTabClasses +
                " " +
                (activeTab === "about" ? activeClasses : inactiveClasses)
              }
              onClick={() => handleTabClick("about")}
            >
              About
            </button>
          </div>
        </section>

        {activeTab === "work" && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
                <img
                  src="https://via.placeholder.com/400x250?text=VPN+Mobile+App"
                  alt="VPN Mobile App"
                  className="w-full rounded-md"
                />
                <h3 className="mt-4 text-lg font-semibold">VPN Mobile App</h3>
                <p className="text-gray-500 text-sm">Mobile UI, Research</p>
                <div className="flex items-center justify-between mt-3 text-gray-400 text-xs">
                  <div>
                    <span className="font-medium">517</span>
                    <span className="ml-1">❤️</span>
                  </div>
                  <span className="font-medium">9.3k</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
                <img
                  src="https://via.placeholder.com/400x250?text=Property+Dashboard"
                  alt="Property Dashboard"
                  className="w-full rounded-md"
                />
                <h3 className="mt-4 text-lg font-semibold">
                  Property Dashboard
                </h3>
                <p className="text-gray-500 text-sm">Web interface</p>
                <div className="flex items-center justify-between mt-3 text-gray-400 text-xs">
                  <div>
                    <span className="font-medium">983</span>
                    <span className="ml-1">❤️</span>
                  </div>
                  <span className="font-medium">14k</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
                <img
                  src="https://via.placeholder.com/400x250?text=Healthcare+Mobile+App"
                  alt="Healthcare Mobile App"
                  className="w-full rounded-md"
                />
                <h3 className="mt-4 text-lg font-semibold">
                  Healthcare Mobile App
                </h3>
                <p className="text-gray-500 text-sm">Mobile UI, Branding</p>
                <div className="flex items-center justify-between mt-3 text-gray-400 text-xs">
                  <div>
                    <span className="font-medium">875</span>
                    <span className="ml-1">❤️</span>
                  </div>
                  <span className="font-medium">13.5k</span>
                </div>
              </div>
            </div>
          </section>
        )}
      </motion.div>
    </div>
  );
}

export default Profile;
