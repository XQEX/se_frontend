import React, { useEffect, useState } from "react";
import { NewNav } from "../components/NewNav";
import { useUser } from "../context/UserContext";

function Term() {
  const {
    user,
    isLoading,
    refetchjobseeker,
    refetchemployer,
    refetchCompany,
    isStale,
    setUser,
    queryClient,
  } = useUser();
  const [isHaveUser, setIsHaveUser] = useState(false);
  useEffect(() => {
    refetchjobseeker();
    refetchemployer();
    refetchCompany();
    setIsHaveUser(!!user);
  }, [user, isLoading, isStale]);
  return (
    <div className="h-screen kanit-regular">
      <NewNav
        user={user}
        isLoading={isLoading}
        isHaveUser={isHaveUser}
        refetchjobseeker={refetchjobseeker}
        refetchemployer={refetchemployer}
        refetchCompany={refetchCompany}
        isStale={isStale}
        setUser={setUser}
        userType={user?.type}
        queryClient={queryClient}
      />

      <div className="my-4">
        <h1 className="text-4xl font-bold mb-4 ml-4">ข้อกำหนดและเงื่อนไข</h1>
        <p className="ml-4">
          ยินดีต้อนรับสู่เว็บไซต์ของเรา
          การใช้บริการของเราถือว่าคุณยอมรับข้อกำหนดและเงื่อนไขเหล่านี้
          โปรดอ่านอย่างละเอียด
        </p>
        <h2 className="text-2xl font-bold mb-2 ml-4 mt-4">การใช้งานเว็บไซต์</h2>
        <p className="ml-4">
          คุณต้องปฏิบัติตามกฎหมายและข้อบังคับที่เกี่ยวข้องทั้งหมดเมื่อใช้เว็บไซต์ของเรา
          ห้ามใช้เว็บไซต์ของเราในทางที่ผิด
        </p>
        <h2 className="text-2xl font-bold mb-2 ml-4 mt-4">
          การเปลี่ยนแปลงข้อกำหนด
        </h2>
        <p className="ml-4">
          เราขอสงวนสิทธิ์ในการเปลี่ยนแปลงข้อกำหนดและเงื่อนไขเหล่านี้ได้ตลอดเวลา
          การเปลี่ยนแปลงจะมีผลบังคับใช้ทันทีที่เราโพสต์บนเว็บไซต์
        </p>
        <h2 className="text-2xl font-bold mb-2 ml-4 mt-4">การติดต่อเรา</h2>
        <p className="ml-4">
          หากคุณมีคำถามหรือข้อสงสัยเกี่ยวกับข้อกำหนดและเงื่อนไขเหล่านี้
          โปรดติดต่อเราผ่านทางข้อมูลที่ให้ไว้ในเว็บไซต์ของเรา
        </p>
      </div>
    </div>
  );
}

export default Term;
