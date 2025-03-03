import { useState, useEffect, useRef } from "react";
import { Navbar } from "../../components/Navbar";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { getUserMatchingStatus } from "../../api/Matching";

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

  const NoDataMessage = ({ type }: { type: "hiring" | "finding" }) => (
    <div className="p-4 text-center text-gray-500">
      {type === "hiring" ? "ยังไม่มีประกาศงานของคุณ" : "ยังไม่มีการสมัครงาน"}
    </div>
  );

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
  }, []);

  useEffect(() => {
    refetchjobseeker();
    refetchCompany();
    refetchemployer();
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
    <div>
      <Navbar
        user={user}
        isLoading={isUserLoading}
        isHaveUser={isHaveUser}
        refetchjobseeker={refetchjobseeker}
        refetchemployer={refetchemployer}
        refetchCompany={refetchCompany}
        isStale={isStale}
        setUser={setUser}
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
                          ผู้ว่าจ้าง (นายจ้าง , บริษัท)
                        </th>
                        <th className="p-3 border border-amber-100">
                          เงินเดือนที่คาดหวัง
                        </th>
                        <th className="p-3 border border-amber-100">สถานะ</th>
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
                                  คำอธิบายเพิ่มเติม:{" "}
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
                          {/* บริษัท */}
                          <td className="p-3 border border-amber-100">
                            {match.postMatched &&
                            match.postMatched.length > 0 ? (
                              <div>
                                <div>มีบริษัทสนใจคุณ</div>
                                {match.postMatched.map(
                                  (post: any, index: number) => (
                                    <div key={index}>
                                      {post.employerId ??
                                        post.oauthEmployerId ??
                                        post.companyId}
                                    </div>
                                  )
                                )}
                              </div>
                            ) : (
                              <div>กำลังรอคนที่มาสนใจคุณ</div>
                            )}
                          </td>
                          {/* เงินเดือน */}
                          <td className="p-3 border border-amber-100">
                            ฿{match.expectedSalary?.toLocaleString()}
                          </td>
                          {/* สถานะ  */}
                          {/* รอฝั่ง emp  อัพเดตสถานะให้เราเอง */}
                          <td className="p-3 border border-amber-100">
                            <StatusBadge status={match.status} />
                            <div className="flex justify-center mt-8">
                              <select>
                                <option value="Accept">ยืนยัน</option>
                                <option value="Reject">ปฏิเสธ</option>
                              </select>
                            </div>
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
                  โพสรับสมัครงานที่คุณกดสนใจ
                </h2>
                <div className="overflow-x-auto max-h-[400px] mt-8">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-emerald-200">
                      <tr>
                        <th className="p-3 border border-emerald-100">
                          โพสของ
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
                            <div className="font-semibold">
                              {post.toPostMatched.toPost.employerId ??
                                post.toPostMatched.toPost.oauthEmployerId ??
                                post.toPostMatched.toPost.companyId}
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
