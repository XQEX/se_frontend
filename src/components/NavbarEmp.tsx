import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Menu, Divider } from "@mantine/core";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const navigate = useNavigate();

  const user = { name: "User", profilePicture: "" }; // Replace with actual user data

  const handleLogout = () => {
    setIsSignedIn(false);
    navigate("/signin"); // Redirect to the sign-in page after logout
  };

  return (
    <nav className="flex justify-between items-center px-6 py-1 bg-white shadow-md sticky top-0 z-50 min-h-[60px]">
      <div className="logo">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="logo" className="w-12 h-auto" />
          <span className="font-bold text-seagreen text-lg">SkillBridge</span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/homeemp")}
          className="text-seagreen kanit-light hover:text-seagreen/50 px-4 py-1 rounded-md transition-colors duration-300"
        >
          สำหรับบริษัท
        </button>
        {!isSignedIn ? (
          <>
            <button
              onClick={() => navigate("/signin")}
              className="text-seagreen kanit-light hover:text-seagreen/50 px-4 py-1 rounded-md transition-colors duration-300"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="text-seagreen px-4 py-1 rounded-md border border-seagreen kanit-medium hover:text-seagreen/50 transition-colors duration-300"
            >
              Sign Up
            </button>
          </>
        ) : (
            <Menu
            width={250}
            position="bottom-end"
            styles={{
              dropdown: {
                marginTop: "60px",
                right: 0,
                left: "auto",
                border:"5px ",
              },
            }}
          >
          
            <Menu.Target>
              {user.profilePicture ? (
                <Avatar
                  src={user.profilePicture}
                  alt={user.name}
                  radius="xl"
                  size={60}
                  className="transition-transform transform hover:scale-105"
                />
              ) : (
                <FaUserCircle
                  size={30}
                  className="text-gray-400 transition-transform transform hover:scale-105 cursor-pointer"
                />
              )}
            </Menu.Target>
            <Menu.Dropdown className="m-2">
              <div className="p-3 text-center">
                <div className="kanit-medium">{user.name}</div>
              </div>
              <Divider />
              <Menu.Item
                onClick={() => navigate("/profileemp")}
                className="kanit-light"
              >
                Profile
              </Menu.Item>
              <Menu.Item
                onClick={() => navigate("/settings")}
                className="kanit-light"
              >
                Settings
              </Menu.Item>
              <Menu.Item
                onClick={handleLogout}
                className="kanit-light text-red-500"
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </div>
    </nav>
  );
}
