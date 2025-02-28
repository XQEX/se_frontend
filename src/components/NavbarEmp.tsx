import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Avatar, Menu, Divider } from "@mantine/core";
import { FaUserCircle, FaSearch, FaHome, FaBell } from "react-icons/fa";
import { logoutJobSeeker } from "../api/JobSeeker";
import { logoutEmployer } from "../api/Employer";
import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../api/EmployerAndCompany";
import { logoutCompany } from "../api/Company";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Notification {
  id: string;
  status: "READ" | "UNREAD";
  title: string;
  description: string;
  userType: string;
  jobSeekerId?: string;
  oauthJobSeekerId?: string;
  employerId?: string;
  oauthEmployerId?: string;
  companyId?: string;
  createdAt: string;
  updatedAt: string;
}
interface NavbarEmpProps {
  user: any;
  isLoading: boolean;
  isHaveUser: boolean;
  refetchjobseeker: () => void;
  refetchemployer: () => void;
  refetchCompany: () => void;
  isStale: boolean;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const NavbarEmp: React.FC<NavbarEmpProps> = ({
  user,
  isLoading,
  isHaveUser,
  refetchjobseeker,
  refetchemployer,
  refetchCompany,
  isStale,
  setUser,
}) => {
  const [isSignedIn, setIsSignedIn] = useState(isHaveUser);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // เริ่มต้นด้วย "all"
  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true;
    return notification.status === filter;
  });
  useEffect(() => {
    const loadNotifications = async () => {
      if (!user) return; // ป้องกันการโหลดถ้าไม่มี user
      try {
        const data = await fetchNotifications();
        if (Array.isArray(data)) {
          const filteredData: Notification[] = data.map((item) => ({
            ...item,
            jobSeekerId: item.jobSeekerId || "",
            oauthJobSeekerId: item.oauthJobSeekerId || "",
            employerId: item.employerId || "",
            oauthEmployerId: item.oauthEmployerId || "",
            companyId: item.companyId || "",
          }));
          setNotifications(filteredData);
          console.log(notifications);
        } else {
          throw new Error("Invalid notifications data");
        }
      } catch (err) {
        console.error("Error loading notifications:", err); // 👉 เพิ่ม log
        setError("Failed to load notifications");
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, [user]); // ให้ `user` เป็น dependency
  // Helper function for toast messages
  const notifyError = (message: string) =>
    toast.error(message, { position: "top-center" });

  useEffect(() => {
    // console.log("NavbarEmp: isSignedIn", isSignedIn);
    setIsSignedIn(isHaveUser);

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
  }, [isHaveUser]);

  const handleLogout = async () => {
    try {
      if (user?.type === "JOBSEEKER") {
        await logoutJobSeeker();
      } else if (user?.type === "EMPLOYER") {
        await logoutEmployer();
      } else if (user?.type === "COMPANY") {
        await logoutCompany();
      }
      notifyError("คุณออกจากระบบ!"); // Show the notification after navigation
      setIsSignedIn(false);
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  // const FakeNotifications = ["คุณมีการแจ้งเตือนใหม่"];
  const handleNotificationClick = async (notification: Notification) => {
    try {
      // Mark the notification as read
      const updatedNotification = await markNotificationAsRead(notification.id);
      // Update the notification state
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif.id === notification.id ? updatedNotification : notif
        )
      );
      // Show the notification details
      alert(
        `Notification Details:\n\nTitle: ${notification.title}\nDescription: ${notification.description}`
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      // Mark all notifications as read
      const updatedNotifications = await markAllNotificationsAsRead();
      // Update the notification state
      setNotifications(updatedNotifications);
      // Show a success message
      alert("All notifications have been marked as read.");
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
      alert("Failed to mark all notifications as read.");
    }
  };

  return (
    <>
      <ToastContainer />
      <nav
        className={`backdrop-blur-sm bg-seagreen/80 flex justify-between items-center px-6 py-1 shadow-md sticky top-0 z-50 min-h-[60px] transition-transform duration-300 ${
          scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {/* ✅ โลโก้ */}
        <div className="logo">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/white_logo.png" alt="logo" className="w-12 h-auto" />
            <span className="font-bold text-white text-2xl leading-none">
              SkillBridge
            </span>
          </Link>
        </div>

        {/* ✅ Navigation Links */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* ✅ หน้าแรก */}
          <Link
            to="/homeemp"
            className="text-gray-200 font-[Kanit] hover:text-white px-4 py-1 rounded-md transition-colors duration-300 flex items-center"
          >
            <FaHome className="mr-2" />
            หน้าแรก
          </Link>
          {/* ✅ ค้นหางาน */}
          <Link
            to="/findemp"
            className="text-gray-200 font-[Kanit] hover:text-white px-4 py-1 rounded-md transition-colors duration-300 flex items-center"
          >
            <FaSearch className="mr-2" />
            ค้นหางาน
          </Link>
          {/* ✅ การแจ้งเตือน */}
          {isSignedIn && (
            <Menu width={250} position="bottom-end" shadow="md">
              <Menu.Target>
                <button className="text-gray-200 font-[Kanit] hover:text-white transition-colors duration-300 relative">
                  <FaBell size={20} />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
              </Menu.Target>

              <Menu.Dropdown>
                <div className="p-2">
                  <div className="kanit-regular text-center">การแจ้งเตือน</div>
                  <div className="flex justify-around my-2">
                    <button
                      onClick={() => setFilter("all")}
                      className={`px-2 py-1 ${
                        filter === "all" ? "bg-gray-200" : ""
                      }`}
                    >
                      ทั้งหมด
                    </button>
                    <button
                      onClick={() => setFilter("READ")}
                      className={`px-2 py-1 ${
                        filter === "READ" ? "bg-gray-200" : ""
                      }`}
                    >
                      อ่านแล้ว
                    </button>
                    <button
                      onClick={() => setFilter("UNREAD")}
                      className={`px-2 py-1 ${
                        filter === "UNREAD" ? "bg-gray-200" : ""
                      }`}
                    >
                      ยังไม่อ่าน
                    </button>
                  </div>
                </div>
                <Divider />
                {loading ? (
                  <Menu.Item className="kanit-light text-center">
                    กำลังโหลด...
                  </Menu.Item>
                ) : error ? (
                  <Menu.Item className="kanit-light text-center text-red-500">
                    {error}
                  </Menu.Item>
                ) : filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification, index) => (
                    <Menu.Item
                      key={index}
                      className="kanit-light"
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div>
                        <div>
                          {notification.title}
                          {notification.status === "UNREAD" && (
                            <span className="text-red-500"> (NEW)</span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          {notification.status}
                        </div>
                      </div>
                    </Menu.Item>
                  ))
                ) : (
                  <Menu.Item className="kanit-light text-center">
                    ไม่มีการแจ้งเตือน
                  </Menu.Item>
                )}
                <Divider />
                <Menu.Item className="kanit-regular text-center bg-gray-200">
                  <button
                    className="text-seagreen"
                    onClick={handleMarkAllAsRead} // Ensure this line is correct
                  >
                    อ่านทั้งหมด
                  </button>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
          {/* ✅ ปุ่มเข้าสู่ระบบ & สมัครสมาชิก */}
          {!isSignedIn ? (
            <>
              <Link
                to="/signin"
                className="text-gray-200 font-[Kanit] hover:text-white px-4 py-1 rounded-md transition-colors duration-300"
              >
                เข้าสู่ระบบ
              </Link>
              <Link
                to="/select-user-type"
                className="text-gray-200 px-4 py-1 rounded-md border border-seagreen font-[Kanit] hover:text-white transition-colors duration-300"
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
                      alt={user.name}
                      radius="xl"
                      size={30}
                    />
                  ) : (
                    <FaUserCircle size={24} />
                  )}
                  <span className="font-[Kanit]">{user?.username}</span>
                </button>
              </Menu.Target>
              <Menu.Dropdown>
                {isSignedIn ? (
                  <>
                    <Menu.Item
                      component={Link}
                      to="/profileemp"
                      className="kanit-regular"
                    >
                      โปรไฟล์
                    </Menu.Item>
                    <Menu.Item onClick={handleLogout} className="kanit-regular">
                      ออกจากระบบ
                    </Menu.Item>
                  </>
                ) : (
                  <>
                    <Menu.Item
                      component={Link}
                      to="/signin"
                      className="kanit-regular"
                    >
                      เข้าสู่ระบบ
                    </Menu.Item>
                    <Menu.Item
                      component={Link}
                      to="/signup"
                      className="kanit-regular"
                    >
                      สมัครสมาชิก
                    </Menu.Item>
                  </>
                )}
              </Menu.Dropdown>
            </Menu>
          )}
        </div>
      </nav>
    </>
  );
};
