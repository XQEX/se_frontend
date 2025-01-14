import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Menu, Divider, Burger, Drawer } from "@mantine/core";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { useDisclosure } from "@mantine/hooks";

export default function Navbar() {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const user = { name: "มนุษย์", profilePicture: "/null" };
  const [
    mobileMenuOpened,
    { toggle: toggleMobileMenu, close: closeMobileMenu },
  ] = useDisclosure(false);
  const [searchDrawerOpened, { toggle: toggleSearchDrawer }] =
    useDisclosure(false);

  const menuItems = (
    <>
      {isSignedIn ? (
        <>
          <Menu.Item component={Link} to="/settings" className="kanit-light">
            ตั้งค่า
          </Menu.Item>
          <Menu.Item
            onClick={() => setIsSignedIn(false)}
            className="kanit-light"
          >
            ออกจากระบบ
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item component={Link} to="/signin" className="kanit-light">
            เข้าสู่ระบบ
          </Menu.Item>
          <Menu.Item component={Link} to="/signup" className="kanit-light">
            สมัครสมาชิก
          </Menu.Item>
        </>
      )}
    </>
  );

  return (
    <>
      <nav className="backdrop-blur-sm bg-white/30  flex justify-between items-center px-6 py-1 shadow-md sticky top-0 z-50 min-h-[60px]">
        <div className="logo">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="logo" className="w-12 h-auto" />
            <span className="font-bold text-seagreen text-lg">SkillBridge</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="lg:hidden">
            <button onClick={toggleSearchDrawer}>
              <FaSearch size={20} className="text-gray-900" />
            </button>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            {!isSignedIn ? (
              <>
                <Link
                  to="/signin"
                  className="text-seagreen kanit-light hover:text-seagreen/50 px-4 py-1 rounded-md transition-colors duration-300"
                >
                  เข้าสู่ระบบ
                </Link>
                <Link
                  to="/signup"
                  className="text-seagreen px-4 py-1 rounded-md border border-seagreen kanit-medium hover:text-seagreen/50 transition-colors duration-300"
                >
                  สมัครสมาชิก
                </Link>
              </>
            ) : (
              <Menu width={250} position="bottom-end">
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
                      className="text-gray-400 transition-transform transform hover:scale-105"
                    />
                  )}
                </Menu.Target>
                <Menu.Dropdown className="m-2">
                  <div className="p-3 text-center">
                    <div className="kanit-medium">{user.name}</div>
                  </div>
                  <Divider />
                  {menuItems}
                </Menu.Dropdown>
              </Menu>
            )}
          </div>
          <div className="lg:hidden">
            <Burger
              opened={mobileMenuOpened}
              onClick={toggleMobileMenu}
              size="sm"
            />
          </div>
        </div>
      </nav>

      {/* mobile drawer*/}
      <Drawer
        opened={mobileMenuOpened}
        onClose={closeMobileMenu}
        title=""
        padding="xl"
        size="100%"
        position="right"
      >
        <div className="flex flex-col space-y-4">
          {isSignedIn ? (
            <>
              <div className="p-3 text-center">
                <div className="kanit-medium">{user.name}</div>
              </div>
              <Divider />
              <Link
                to="/settings"
                className="kanit-light"
                onClick={closeMobileMenu}
              >
                ตั้งค่า
              </Link>
              <button
                onClick={() => {
                  setIsSignedIn(false);
                }}
                className="kanit-light text-left"
              >
                ออกจากระบบ
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="kanit-light"
                onClick={closeMobileMenu}
              >
                เข้าสู่ระบบ
              </Link>
              <Link
                to="/signup"
                className="kanit-light"
                onClick={closeMobileMenu}
              >
                สมัครสมาชิก
              </Link>
            </>
          )}
        </div>
      </Drawer>


      <Drawer
        opened={searchDrawerOpened}
        onClose={toggleSearchDrawer}
        title="ค้นหา"
        className="kanit-regular"
        size="100%"
        position="left"
      >
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="search-input" className="kanit-light">
              สถานที่ทํางาน
            </label>
            <input
              id="search-input"
              placeholder="พิมพ์คำค้นหาของคุณที่นี่"
              type="text"
              className="p-2 border rounded-md kanit-light"
            />
          </div>
        </div>
      </Drawer>
    </>
  );
}
