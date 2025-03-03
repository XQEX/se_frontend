import { useState, useEffect, useRef } from "react";
import { Navbar } from "../../components/Navbar";
import { gsap } from "gsap";
import { useUser } from "../../context/UserContext";
import { getUserMatchingStatus } from "../../api/Matching";

type Status = "UNMATCHED" | "INPROGRESS" | "ACCEPTED" | "DENIED";

function TrackEmployers() {
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
              ติดตามการรับสมัครพนักงานของคุณ
            </div>
          </div>

          <div ref={tableRef} className="w-full text-gray-600 py-6 ">
            {findingMatches.length === 0 ? (
              <NoDataMessage type="finding" />
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4 mt-8">
                  พนักงานที่คุณกดสนใจ
                </h2>
                <div className=" overflow-x-auto max-h-[400px] mt-8 ">
                  <table className="w-full text-left ">
                    <thead className="bg-amber-200">
                      <tr>
                        <th className="p-3 border border-amber-100">พนักงาน</th>
                        <th className="p-3 border border-amber-100">
                          ข้อมูลในโพสหางาน
                        </th>
                        <th className="p-3 border border-amber-100">
                          รายได้ที่เรียกร้อง
                        </th>
                        <th className="p-3 border border-amber-100">
                          สถานะการยืนยันเข้าทำงาน
                        </th>

                        <th className="p-3 border border-amber-100">
                          วันที่โพสหางาน
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {findingMatches.map((match) => (
                        <tr key={match.id} className="hover:bg-amber-50">
                          <td className="p-3 border border-amber-100">
                            <div className="text-xl text-gray-500 font-bold">
                              พนักงาน :
                            </div>
                            <div className="text-lg">
                              {match.toPost.jobSeekerId}
                            </div>
                          </td>
                          {/* รายละเอียด */}
                          <td className="p-3 border border-amber-100">
                            <div className="text-sm text-gray-500">
                              <div className=" px-3">
                                <div>
                                  ตำแหน่งงานที่หา : {match.toPost.title}
                                </div>
                                <div>
                                  ประสบกาณ์ : {match.toPost.description}
                                </div>
                                <div>
                                  สถานที่ที่สะดวก : {match.toPost.jobLocation}
                                </div>
                                <div>
                                  ช่วงวันทำงาน : {match.toPost.workDates}
                                </div>
                                <div>
                                  ช่วงเวลาเข้างาน :{" "}
                                  {match.toPost.workHoursRange}
                                </div>
                                <div>
                                  ประเภทงาน : {match.toPost.jobPostType}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="p-3 border border-amber-100">
                            ฿{match.toPost.expectedSalary.toLocaleString()}
                          </td>

                          <td className="p-3 border border-amber-100">
                            <StatusBadge status={match.toPost.status} />
                          </td>

                          <td className="p-3 border border-amber-100">
                            {new Date(
                              match.toPost.createdAt
                            ).toLocaleDateString("th-TH")}
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
                  โพสรับสมัครงานที่คุณที่มีคนกดสนใจ
                </h2>
                <div className="overflow-x-auto max-h-[400px] mt-8">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-emerald-200">
                      <tr>
                        <th className="p-3 border border-emerald-100">
                          โพสของคุณ
                        </th>
                        <th className="p-3 border border-emerald-100">
                          คนที่สมัครเข้ามาทำงาน
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {hiringMatches.map((post) => (
                        <tr key={post.id} className="hover:bg-emerald-50">
                          {/* ข้อมูลในโพสหาคน */}
                          <td className="p-3 border border-emerald-100">
                            {/* ไอดี Post */}
                            {/* {post.id} */}
                            <div>
                              <strong>Title:</strong> {post.title}
                            </div>
                            <div>
                              <strong>Description:</strong> {post.description}
                            </div>
                            <div>
                              <strong>Job Location:</strong> {post.jobLocation}
                            </div>
                            <div>
                              <strong>Work Dates:</strong> {post.workDates}
                            </div>
                            <div>
                              <strong>Work Hours Range:</strong>{" "}
                              {post.workHoursRange}
                            </div>
                            <div>
                              <strong>Status:</strong> {post.status}
                            </div>
                            <div>
                              <strong>Hired Amount:</strong> {post.hiredAmount}
                            </div>
                            <div>
                              <strong>Job Post Type:</strong> {post.jobPostType}
                            </div>
                          </td>
                          <td className="p-3 border border-emerald-100">
                            {post.postMatched.map((match: any) => (
                              <div key={match.id}>
                                {match.toMatchSeekers.map(
                                  (seeker: any, index: number) => (
                                    <div key={seeker.jobHiringPostMatchedId}>
                                      <div className="flex flex-col border-b border-emerald-400 p-3 text-center">
                                        {index + 1}. ID:{" "}
                                        {seeker.jobSeekerId ||
                                          seeker.oauthJobSeekerId}
                                        <StatusBadge status={seeker.status} />
                                        <button>
                                          แก้ไขสถานะขอผู้สมัคร :
                                          {/* {seeker.jobSeekerId ?? 
                                          seeker.oauthJobSeekerId}  ใช้ id พวกนี้ยิง api update สถานะ การสมัคร*/}
                                          <select
                                            name="updatejobseekstatus"
                                            id="updatejobseekstatus"
                                            className="text-center"
                                          >
                                            <option value="UNMATCHED">
                                              รอดำเนินการ
                                            </option>
                                            <option value="INPROGRESS">
                                              กำลังตรวจสอบ
                                            </option>
                                            <option value="ACCEPTED">
                                              รับแล้ว
                                            </option>
                                            <option value="DENIED">
                                              ปฏิเสธแล้ว
                                            </option>
                                          </select>
                                        </button>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            ))}
                          </td>
                        </tr>
                      ))}
                      {/* asdasd */}
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

export default TrackEmployers;
