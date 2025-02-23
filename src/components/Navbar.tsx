import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Menu, Divider, Burger, Drawer } from "@mantine/core";
import {
  FaUserCircle,
  FaSearch as FaFind,
  FaEdit,
  FaBuilding,
  FaBell,
} from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
import { useDisclosure } from "@mantine/hooks";
import { useUser } from "../context/UserContext";
import { logoutJobSeeker } from "../api/JobSeeker";
import { logoutEmployer } from "../api/Employer";
import { logoutCompany } from "../api/Company";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Navbar: React.FC = () => {
  const { user, isLoading, isLoggedIn ,refetchjobseeker,refetchemployer,refetchCompany} = useUser();
  const [isSignedIn, setIsSignedIn] = useState(isLoggedIn);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  // Helper function for toast messages
  const notifyError = (message: string) =>
    toast.error(message, { position: "top-center" });

  useEffect(() => {
    console.log("User:", user);
    setIsSignedIn(isLoggedIn);
    if (isLoggedIn) {
      refetchjobseeker();
      refetchCompany();
      refetchemployer();
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    if (!isLoggedIn) return;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      if (user.type === "JOBSEEKER") {
        await logoutJobSeeker();
      } else if (user.type === "EMPLOYER") {
        await logoutEmployer();
      } else if (user.type === "COMPANY") {
        await logoutCompany();
      }
      notifyError("คุณออกจากระบบ!"); // Show the notification after navigation
      setIsSignedIn(false);
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const menuItems = (
    <div>
      {isSignedIn ? (
        <>
          <Menu.Item component={Link} to="/profile" className="kanit-regular">
            โปรไฟล์
          </Menu.Item>
          <Menu.Item onClick={handleLogout} className="kanit-regular">
            ออกจากระบบ
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item component={Link} to="/signin" className="kanit-regular">
            เข้าสู่ระบบ
          </Menu.Item>
          <Menu.Item component={Link} to="/signup" className="kanit-regular">
            สมัครสมาชิก
          </Menu.Item>
        </>
      )}
    </div>
  );

  const navLinks = (
    <div className="flex space-x-4">
      <Link
        to="/find"
        className="text-gray-200 kanit-regular hover:text-white px-4 py-1 rounded-md transition-colors duration-300 flex items-center"
      >
        <FaFind className="mr-2" />
        ค้นหางาน
      </Link>
      <Link
        to="/application/JobPosition"
        className="text-gray-200 kanit-regular hover:text-white px-4 py-1 rounded-md transition-colors duration-300 flex items-center"
      >
        <FaEdit className="mr-2" />
        แก้ไขประวัติ
      </Link>
      <Link
        to="/homeemp"
        className="text-gray-200 kanit-regular hover:text-white px-4 py-1 rounded-md transition-colors duration-300 flex items-center"
      >
        <FaBuilding className="mr-2" />
        สำหรับบริษัท
      </Link>
      <Link
        to="/postjob"
        className="text-gray-200 kanit-regular hover:text-white px-4 py-1 rounded-md transition-colors duration-300 flex items-center"
      >
        <MdPostAdd className="mr-2" />
        โพสต์หางาน
      </Link>
    </div>
  );

  const FakeNotifications = ["a", "b", "c", "d", "e", "f", "g"];

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <ToastContainer />
      <nav
        className={`backdrop-blur-sm bg-seagreen/80 flex justify-between items-center px-6 py-1 shadow-md sticky top-0 z-50 min-h-[60px] transition-transform duration-300 ${
          scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="logo">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/white_logo.png" alt="logo" className="w-12 h-auto" />
            <span className="font-bold text-white text-2xl leading-none">
              SkillBridge
            </span>
          </Link>
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          {isSignedIn && (
            <>
              {navLinks}
              <Menu width={250} position="bottom-end" shadow="md">
                <Menu.Target>
                  <button className="text-gray-200 kanit-regular hover:text-white transition-colors duration-300 relative">
                    <FaBell size={20} />
                    {FakeNotifications.length > 0 && (
                      <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </button>
                </Menu.Target>
                <Menu.Dropdown>
                  <div className="p-2">
                    <div className="kanit-regular text-center">
                      การแจ้งเตือน
                    </div>
                  </div>
                  <Divider />
                  {FakeNotifications.length > 0 ? (
                    FakeNotifications.map((message, index) => (
                      <Menu.Item key={index} className="kanit-light">
                        {message}
                      </Menu.Item>
                    ))
                  ) : (
                    <Menu.Item className="kanit-light text-center">
                      ไม่มีการแจ้งเตือน
                    </Menu.Item>
                  )}
                  <Divider />
                  <Menu.Item className="kanit-regular text-center bg-gray-200">
                    <a href="/notifications" className="text-seagreen">
                      ดูทั้งหมด
                    </a>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </>
          )}
          <div className="hidden lg:flex items-center space-x-4">
            {!isSignedIn ? (
              <>
                <Link
                  to="/find"
                  className="text-gray-200 kanit-regular hover:text-white px-4 py-1 rounded-md transition-colors duration-300 flex items-center"
                >
                  <FaFind className="mr-2" />
                  ค้นหางาน
                </Link>
                <Link
                  to="/signin"
                  className="text-gray-200 kanit-regular hover:text-white px-4 py-1 rounded-md transition-colors duration-300"
                >
                  เข้าสู่ระบบ
                </Link>
                <Link
                  to="/select-user-type"
                  className="text-gray-200 px-4 py-1 rounded-md border border-seagreen kanit-regular hover:text-white transition-colors duration-300"
                >
                  สมัครสมาชิก
                </Link>
              </>
            ) : (
              <Menu width={250} position="bottom-end">
                <Menu.Target>
                  <button className="flex items-center space-x-2 bg-gray-200 text-black px-4 py-2 rounded-3xl hover:bg-white transition">
                    {user?.profilePicture ? (
                      <Avatar
                        src={user.profilePicture}
                        alt={user.username}
                        radius="xl"
                        size={30}
                      />
                    ) : (
                      <FaUserCircle size={24} />
                    )}
                    <span className="kanit-regular">{user?.username}</span>
                  </button>
                </Menu.Target>
                <Menu.Dropdown className="m-2">
                  <div className="p-3 text-center">
                    <div className="kanit-regular">{user?.username}</div>
                  </div>
                  <Divider />
                  {menuItems}
                </Menu.Dropdown>
              </Menu>
            )}
          </div>
        </div>
        <div className="lg:hidden">
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            size="sm"
            color="white"
          />
        </div>
      </nav>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        title="SkillBridge"
        padding="md"
        size="100%"
        className="text-seagreen kanit-regular text-lg"
      >
        <div className="flex flex-col space-y-4">
          <div className="text-black">
            <Link
              to="/find"
              className="text-gray-900 kanit-regular hover:text-black px-4 py-1 rounded-md transition-colors duration-300 flex items-center"
            >
              <FaFind className="mr-2" />
              ค้นหางาน
            </Link>
            <Link
              to="/homeemp"
              className="text-gray-900 kanit-regular hover:text-black px-4 py-1 rounded-md transition-colors duration-300 flex items-center"
            >
              <FaBuilding className="mr-2" />
              สำหรับบริษัท
            </Link>
            {isSignedIn ? (
              <>
                <Link
                  to="/editjob"
                  className="text-gray-900 kanit-regular hover:text-black px-4 py-1 rounded-md transition-colors duration-300 flex items-center"
                >
                  <FaEdit className="mr-2" />
                  แก้ไขประวัติ
                </Link>
                <Link
                  to="/postjob"
                  className="text-gray-900 kanit-regular hover:text-black px-4 py-1 rounded-md transition-colors duration-300 flex items-center"
                >
                  <MdPostAdd className="mr-2" />
                  โพสหางาน
                </Link>
                <div className="px-4 py-1">
                  <Menu width={250} position="bottom-start" shadow="md">
                    <Menu.Target>
                      <button className="text-gray-900 kanit-regular hover:text-black transition-colors duration-300 relative flex items-center">
                        <FaBell className="mr-2" size={20} />
                        การแจ้งเตือน
                        {FakeNotifications.length > 0 && (
                          <span className="absolute top-0 left-5 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                        )}
                      </button>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <div className="p-2">
                        <div className="kanit-regular text-center">
                          การแจ้งเตือน
                        </div>
                      </div>
                      <Divider />
                      {FakeNotifications.map((message, index) => (
                        <Menu.Item key={index} className="kanit-light">
                          {message}
                        </Menu.Item>
                      ))}
                      <Divider />
                      <Menu.Item className="kanit-regular text-center bg-gray-200">
                        <a href="/notifications" className="text-seagreen">
                          ดูทั้งหมด
                        </a>
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </div>
              </>
            ) : (
              <div className="flex  flex-col">
                <Link
                  to="/signin"
                  className="text-gray-900 kanit-regular hover:text-black px-4 py-1 rounded-md transition-colors duration-300 flex items-center"
                >
                  <FaUserCircle className="mr-2" />
                  เข้าสู่ระบบ
                </Link>
                <Link
                  to="/select-user-type"
                  className="text-gray-900 px-4 py-1 border-seagreen kanit-regular hover:text-black transition-colors duration-300 flex items-center"
                >
                  <FaUserCircle className="mr-2" />
                  สมัครสมาชิก
                </Link>
              </div>
            )}
          </div>
          {isSignedIn && (
            <>
              <Divider className="my-4" />
              <div className="flex flex-col space-y-4">
                <Menu width={250} position="bottom-end">
                  <Menu.Target>
                    <button className="flex items-center space-x-2 bg-gray-200 text-black px-4 py-2 rounded-3xl hover:bg-white transition">
                      {user?.profilePicture ? (
                        <Avatar
                          src={user.profilePicture}
                          alt={user.username}
                          radius="xl"
                          size={30}
                        />
                      ) : (
                        <FaUserCircle size={24} />
                      )}
                      <span className="kanit-regular">{user?.username}</span>
                    </button>
                  </Menu.Target>
                  <Menu.Dropdown className="m-2">
                    <div className="p-3 text-center">
                      <div className="kanit-regular">{user?.username}</div>
                    </div>
                    <Divider />
                    {menuItems}
                  </Menu.Dropdown>
                </Menu>
              </div>
            </>
          )}
        </div>
      </Drawer>
    </>
  );
};
