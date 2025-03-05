"use client";

import { useState, useEffect, useRef } from "react";
import { NewNav } from "../../components/NewNav";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import {
  getUserMatchingStatus,
  updateFindingMatchStatus,
} from "../../api/Matching";

type Status = "UNMATCHED" | "INPROGRESS" | "ACCEPTED" | "DENIED";

function TrackJobSeeker() {
  const [hiringMatches, setHiringMatches] = useState<any[]>([]);
  const [findingMatches, setFindingMatches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const StatusBadge = ({
    status,
    small = false,
  }: {
    status: Status;
    small?: boolean;
  }) => {
    const statusConfig = {
      UNMATCHED: { color: "bg-gray-100 text-gray-800", text: "รอดำเนินการ" },
      INPROGRESS: { color: "bg-blue-100 text-blue-800", text: "กำลังตรวจสอบ" },
      ACCEPTED: { color: "bg-green-100 text-green-800", text: "รับแล้ว" },
      DENIED: { color: "bg-red-100 text-red-800", text: "ปฏิเสธแล้ว" },
    };

    return (
      <span
        className={`${small ? "px-2 py-1 text-xs" : "px-3 py-1 text-sm"} 
          rounded-full ${statusConfig[status].color}`}
      >
        {statusConfig[status].text}
      </span>
    );
  };
  const JobseekStatusBadge = ({
    status,
    small = false,
  }: {
    status: Status;
    small?: boolean;
  }) => {
    const statusConfig = {
      UNMATCHED: { color: "bg-gray-100 text-gray-800", text: "ยังไม่มีคนสนใจ" },
      INPROGRESS: {
        color: "bg-blue-100 text-blue-800",
        text: "รอคุณดำเนินการ",
      },
      ACCEPTED: {
        color: "bg-green-100 text-green-800",
        text: "ยอมรับการยื่นขอรับเข้าทำงาน",
      },
      DENIED: {
        color: "bg-red-100 text-red-800",
        text: "ปฏิเสธการยื่นขอรับเข้าทำงานแล้ว",
      },
    };

    return (
      <span
        className={`${small ? "px-2 py-1 text-xs" : "px-3 py-1 text-sm"} 
          rounded-full ${statusConfig[status].color}`}
      >
        {statusConfig[status].text}
      </span>
    );
  };

  const NoDataMessage = ({ type }: { type: "hiring" | "finding" }) => {
    return (
      <div className="flex flex-col mt-10 items-center justify-center p-6 bg-white shadow-md rounded-2xl border border-gray-200 max-w-md mx-auto">
        <p className="text-lg font-semibold text-gray-700 ">
          {type === "hiring"
            ? "ยังไม่มีประกาศงานของคุณ"
            : "ยังไม่มีการสมัครงาน"}
        </p>
        <p className="text-sm text-gray-500 mt-2 text-center">
          {type === "hiring"
            ? 'คุณสามารถสร้างประกาศงานใหม่ได้โดยไปที่หน้า "สร้างประกาศงาน"'
            : 'คุณสามารถค้นหางานที่สนใจและสมัครได้โดยไปที่หน้า "ค้นหางาน"'}
        </p>
        <Link
          to={type === "hiring" ? "/postjob" : "/find"}
          className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg shadow-md transition duration-300 hover:bg-blue-600 hover:shadow-lg"
        >
          {type === "hiring"
            ? "คลิกที่นี่เพื่อสร้างประกาศงานใหม่"
            : "คลิกที่นี่เพื่อค้นหางาน"}
        </Link>
      </div>
    );
  };

  const headingRef = useRef(null);
  const tableRef = useRef(null);
  const lottieRef = useRef(null);

  const {
    user,
    isLoading: isUserLoading,
    refetchjobseeker,
    refetchemployer,
    refetchCompany,
    isStale,
    setUser,
    queryClient,
  } = useUser();
  const [isHaveUser, setIsHaveUser] = useState(false);

  useEffect(() => {
    const fetchMatchingStatus = async () => {
      try {
        const status = await getUserMatchingStatus();
        setHiringMatches(status.data.hiringMatches);
        setFindingMatches(status.data.findingMatches);
      } catch (error) {
        console.error("Error fetching matching status:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMatchingStatus();
    const intervalId = setInterval(() => {
      fetchMatchingStatus();
    }, 10000); // Fetch notifications every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [user]);

  const handleStatusChange = async (matchId: string, newStatus: string) => {
    try {
      await updateFindingMatchStatus(matchId, newStatus);
      const updatedStatus = await getUserMatchingStatus();
      setHiringMatches(updatedStatus.data.hiringMatches);
      setFindingMatches(updatedStatus.data.findingMatches);
    } catch (error) {
      console.error("Error updating match status:", error);
    }
  };

  const hasAcceptedMatch = findingMatches.some((match) =>
    match.postMatched.some(
      (post: { status: Status }) => post.status === "ACCEPTED"
    )
  );

  useEffect(() => {
    setIsHaveUser(!!user);
  }, [user, isUserLoading, isStale]);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 2.5, ease: "power2.out" }
    );
    gsap.fromTo(
      tableRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 2.5, ease: "power2.out" }
    );
    gsap.fromTo(
      lottieRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2.5, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="bg-gradient-to-b from-white to-green-50 min-h-screen">
      <NewNav
        user={user}
        isLoading={isUserLoading}
        isHaveUser={isHaveUser}
        isStale={isStale}
        setUser={setUser}
        userType={user?.type}
        queryClient={queryClient}
      />
      <div className="min-h-screen flex flex-col md:flex-row bg-white text-[#2e8b57] justify-center items-center p-4 md:p-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left kanit-light">
          <div className="flex flex-row justify-end gap-auto">
            <div
              ref={headingRef}
              className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text start"
            >
              ข้อมูลการสมัครงานทั้งหมดของคุณ
            </div>
          </div>

          <div ref={tableRef} className="w-full text-gray-600 py-6 ">
            {findingMatches.length === 0 ? (
              <NoDataMessage type="finding" />
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4 mt-8">
                  งานที่คุณกำลังค้นหา
                </h2>
                <div className=" overflow-x-auto max-h-[400px] mt-8 ">
                  <table className="w-full text-left ">
                    <thead className="bg-amber-200">
                      <tr>
                        <th className="p-3 border border-amber-100">
                          ตำแหน่งที่ค้นหา
                        </th>
                        <th className="p-3 border border-amber-100">
                          ข้อมูลในการยื่นสมัคร
                        </th>
                        <th className="p-3 border border-amber-100">
                          เงินเดือนที่คาดหวัง
                        </th>
                        <th className="p-3 border border-amber-100">
                          ผู้ว่าจ้าง (นายจ้าง , บริษัท)
                        </th>

                        <th className="p-3 border border-amber-100">
                          วันที่สมัคร
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {findingMatches.map((match) => (
                        <tr key={match.id} className="hover:bg-amber-50">
                          {/* ตำแหน่งที่สมัคร */}
                          <td className="p-3 border border-amber-100">
                            <div className="text-xl text-gray-500 font-bold">
                              ตำแหน่งงาน :
                            </div>
                            <div className="text-lg">{match.title}</div>
                          </td>
                          {/* รายละเอียด */}
                          <td className="p-3 border border-amber-100">
                            <div className="text-sm text-gray-500">
                              <div className=" px-3">
                                <div className="font-bold">
                                  คำอธิบายเพิ่มเติม:
                                </div>
                                <div>{match.description}</div>
                                <div className="font-bold">สถานที่: </div>
                                <div>{match.jobLocation}</div>
                                <div className="font-bold">ช่วงเวลาทำงาน: </div>
                                <div>{match.workHoursRange}</div>
                                <div className="font-bold">ประเภทงาน: </div>
                                <div>{match.jobPostType}</div>
                                <div className="font-bold">วันที่ทำงาน: </div>
                                <div>{match.workDates}</div>
                              </div>
                            </div>
                          </td>
                          {/* เงินเดือน */}
                          <td className="p-3 border border-amber-100">
                            ฿{match.expectedSalary?.toLocaleString()}
                          </td>
                          {/* บริษัท */}
                          <td className="p-3 border border-amber-100">
                            {match.postMatched &&
                            match.postMatched.length > 0 ? (
                              <div>
                                <div className="font-bold">
                                  มีบริษัทดังต่อไปนี้กำลังสนใจคุณ
                                </div>
                                {match.postMatched.map(
                                  (post: any, index: number) => (
                                    <div
                                      key={index}
                                      className="flex flex-col items-center justify-center border border-gray-300 p-2 rounded-md mb-2"
                                    >
                                      <div className="text-start">
                                        <div className="font-bold">
                                          ข้อมูลผู้ว่าจ้าง:
                                        </div>
                                        <div>
                                          ชื่อผู้ใช้: {post.toEmployer.username}
                                        </div>
                                        <div>
                                          ชื่อ: {post.toEmployer.firstName}
                                        </div>
                                        <div>
                                          นามสกุล: {post.toEmployer.lastName}
                                        </div>
                                        <div>
                                          อีเมล: {post.toEmployer.email}
                                        </div>
                                        <div>
                                          เกี่ยวกับ: {post.toEmployer.aboutMe}
                                        </div>
                                        <div>
                                          ติดต่อ: {post.toEmployer.contact}
                                        </div>
                                        <div>
                                          จังหวัดที่อยู่อาศัย:
                                          {post.toEmployer.provinceAddress}
                                        </div>
                                        <div>
                                          ที่อยู่: {post.toEmployer.address}
                                        </div>
                                      </div>
                                      <div>
                                        <div>
                                          <div className="font-bold">
                                            สถานะ :
                                          </div>
                                          <JobseekStatusBadge
                                            status={post.status}
                                          />
                                          {post.status === "INPROGRESS" && (
                                            <div className="flex gap-2 mt-2">
                                              {!hasAcceptedMatch && (
                                                <div className="flex gap-2">
                                                  <button
                                                    className="bg-green-500 text-white px-3 py-1 rounded"
                                                    onClick={() =>
                                                      handleStatusChange(
                                                        post.id,
                                                        "ACCEPTED"
                                                      )
                                                    }
                                                    disabled={hasAcceptedMatch}
                                                    //  ลบอันนี้ถ้าอยากให้สามารถกดปุ่มซ้ำได้ ไม่ต้องมี hasAcceptanceMatch
                                                  >
                                                    Accept
                                                  </button>
                                                  <button
                                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                                    onClick={() =>
                                                      handleStatusChange(
                                                        post.id,
                                                        "DENIED"
                                                      )
                                                    }
                                                    disabled={hasAcceptedMatch}
                                                  >
                                                    Reject
                                                  </button>
                                                </div>
                                              )}
                                            </div>
                                          )}
                                          <div></div>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            ) : (
                              <div>กำลังรอคนที่มาสนใจคุณ</div>
                            )}
                          </td>

                          <td className="p-3 border border-amber-100">
                            {new Date(match.createdAt).toLocaleDateString(
                              "th-TH"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {hiringMatches.length === 0 ? (
              <NoDataMessage type="hiring" />
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4 mt-8">
                  โพสต์รับสมัครงานที่คุณกดสนใจ
                </h2>
                <div className="overflow-x-auto max-h-[400px] mt-8">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-emerald-200">
                      <tr>
                        <th className="p-3 border border-emerald-100">
                          โพสต์ของ
                        </th>
                        <th className="p-3 border border-emerald-100">
                          ความสามารถที่นายจ้างต้องการ
                        </th>
                        <th className="p-3 border border-emerald-100">
                          เงินเดือน และ สวัสดิการ
                        </th>
                        <th className="p-3 border border-emerald-100">สถานะ</th>
                        <th className="p-3 border border-emerald-100">
                          วันเวลาที่โพส
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {hiringMatches.map((post) => (
                        <tr key={post.id} className="hover:bg-emerald-50">
                          <td className="p-3 border border-emerald-100">
                            <div>
                              {post.toPostMatched.toPost.postByCompany && (
                                <div className="p-4 bg-white shadow-lg rounded-lg">
                                  <strong className="text-lg ">Company:</strong>
                                  <img
                                    src={
                                      user.profilePicture !== "UNDEFINED"
                                        ? post.toPostMatched.toPost
                                            .postByCompany.profilePicture
                                        : "profile.webp"
                                    }
                                    alt="Profile photo"
                                    className="object-cover w-32 h-32 rounded-full mt-2 mb-4"
                                  />
                                  <div className="text-gray-700">
                                    <div>
                                      {
                                        post.toPostMatched.toPost.postByCompany
                                          .officialName
                                      }
                                    </div>
                                    <div>
                                      Email:{" "}
                                      {
                                        post.toPostMatched.toPost.postByCompany
                                          .email
                                      }
                                    </div>
                                    <div>
                                      Contact:{" "}
                                      {
                                        post.toPostMatched.toPost.postByCompany
                                          .contact
                                      }
                                    </div>
                                    <div>
                                      Address:{" "}
                                      {
                                        post.toPostMatched.toPost.postByCompany
                                          .address
                                      }
                                    </div>
                                    <div>
                                      About Us:{" "}
                                      {
                                        post.toPostMatched.toPost.postByCompany
                                          .aboutUs
                                      }
                                    </div>
                                  </div>
                                </div>
                              )}
                              {post.toPostMatched.toPost
                                .postByOauthEmployer && (
                                <div className="p-4 bg-white shadow-lg rounded-lg mt-4">
                                  <strong className="text-lg ">
                                    Oauth Employer:
                                  </strong>
                                  <img
                                    src={
                                      user.profilePicture !== "UNDEFINED"
                                        ? post.toPostMatched.toPost
                                            .postByOauthEmployer.profilePicture
                                        : "profile.webp"
                                    }
                                    alt="Profile photo"
                                    className="object-cover w-32 h-32 rounded-full mt-2 mb-4"
                                  />
                                  <div className="text-gray-700">
                                    <div>
                                      {
                                        post.toPostMatched.toPost
                                          .postByOauthEmployer.firstName
                                      }{" "}
                                      {
                                        post.toPostMatched.toPost
                                          .postByOauthEmployer.lastName
                                      }
                                    </div>
                                    <div>
                                      Email:{" "}
                                      {
                                        post.toPostMatched.toPost
                                          .postByOauthEmployer.email
                                      }
                                    </div>
                                    <div>
                                      Contact:{" "}
                                      {
                                        post.toPostMatched.toPost
                                          .postByOauthEmployer.contact
                                      }
                                    </div>
                                    <div>
                                      Address:{" "}
                                      {
                                        post.toPostMatched.toPost
                                          .postByOauthEmployer.address
                                      }
                                    </div>
                                    <div>
                                      About Me:{" "}
                                      {
                                        post.toPostMatched.toPost
                                          .postByOauthEmployer.aboutMe
                                      }
                                    </div>
                                  </div>
                                </div>
                              )}
                              {post.toPostMatched.toPost.postByEmployer && (
                                <div className="p-4 bg-white shadow-lg rounded-lg mt-4">
                                  <strong className="text-lg ">
                                    Employer:
                                  </strong>
                                  <img
                                    src={
                                      user.profilePicture !== "UNDEFINED"
                                        ? post.toPostMatched.toPost
                                            .postByEmployer.profilePicture
                                        : "profile.webp"
                                    }
                                    alt="Profile photo"
                                    className="object-cover w-32 h-32 rounded-full mt-2 mb-4"
                                  />
                                  <div className="text-gray-700">
                                    <div>
                                      {
                                        post.toPostMatched.toPost.postByEmployer
                                          .firstName
                                      }{" "}
                                      {
                                        post.toPostMatched.toPost.postByEmployer
                                          .lastName
                                      }
                                    </div>
                                    <div>
                                      Email:{" "}
                                      {
                                        post.toPostMatched.toPost.postByEmployer
                                          .email
                                      }
                                    </div>
                                    <div>
                                      Contact:{" "}
                                      {
                                        post.toPostMatched.toPost.postByEmployer
                                          .contact
                                      }
                                    </div>
                                    <div>
                                      Address:{" "}
                                      {
                                        post.toPostMatched.toPost.postByEmployer
                                          .address
                                      }
                                    </div>
                                    <div>
                                      About Me:{" "}
                                      {
                                        post.toPostMatched.toPost.postByEmployer
                                          .aboutMe
                                      }
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="text-sm text-gray-500">
                              {/* คำอธิบายความสามารถที่บริษัทต้องการ */}
                              <div>
                                <strong>Title:</strong>
                                {post.toPostMatched.toPost.title}
                              </div>
                              <div>
                                <strong>Description:</strong>{" "}
                                {post.toPostMatched.toPost.description}
                              </div>
                              <div>
                                <strong>Job Location:</strong>{" "}
                                {post.toPostMatched.toPost.jobLocation}
                              </div>

                              <div>
                                <strong>Work Dates:</strong>{" "}
                                {post.toPostMatched.toPost.workDates}
                              </div>
                              <div>
                                <strong>Work Hours Range:</strong>{" "}
                                {post.toPostMatched.toPost.workHoursRange}
                              </div>
                              <div>
                                <strong>Status:</strong>{" "}
                                {post.toPostMatched.toPost.status}
                              </div>
                              <div>
                                <strong>Hired Amount:</strong> 1
                              </div>
                              <div>
                                <strong>Job Post Type:</strong> FULLTIME
                              </div>
                            </div>
                          </td>

                          <td className="p-3 border border-emerald-100">
                            ฿{post.toPostMatched.toPost.salary.toLocaleString()}
                          </td>
                          <td className="p-3 border border-emerald-100">
                            <StatusBadge
                              status={post.toPostMatched.toPost.status}
                            />
                          </td>

                          <td className="p-3 border border-emerald-100">
                            {new Date(
                              post.toPostMatched.toPost.updatedAt
                            ).toLocaleDateString("th-TH")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackJobSeeker;
