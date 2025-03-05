import { useState, useEffect, useRef } from "react";
import { NewNav } from "../../components/NewNav";
import { gsap } from "gsap";
import { useUser } from "../../context/UserContext";
import { getUserMatchingStatus, updateMatchStatus } from "../../api/Matching";

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
      INPROGRESS: {
        color: "bg-blue-100 text-blue-800",
        text: "รอการตอบกลับ",
      },
      ACCEPTED: {
        color: "bg-green-100 text-green-800",
        text: "พนักงานตอบรับคำเชิญของคุณ",
      },
      DENIED: {
        color: "bg-red-100 text-red-800",
        text: "ปฏิเสธการยื่นรับสมัคร",
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

  const EmpStatusBadge = ({
    status,
    small = false,
  }: {
    status: Status;
    small?: boolean;
  }) => {
    const statusConfig = {
      UNMATCHED: { color: "bg-gray-100 text-gray-800", text: "รอดำเนินการ" },
      INPROGRESS: {
        color: "bg-blue-100 text-blue-800",
        text: "รอการตอบกลับข้อเสนอของคุณ",
      },
      ACCEPTED: {
        color: "bg-green-100 text-green-800",
        text: "พนักงานตอบรับคำเชิญของคุณ",
      },
      DENIED: {
        color: "bg-red-100 text-red-800",
        text: "ปฏิเสธการยื่นรับสมัคร",
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

  const NoDataMessage = ({ type }: { type: "hiring" | "finding" }) => (
    <div className="p-6 text-center text-gray-500 bg-white rounded-lg shadow-md m-16">
      <p className="text-lg font-semibold">
        {type === "hiring"
          ? "โพสรับสมัครงานทของคุณที่มีคนกดสนใจ"
          : "พนักงานที่คุณกดสนใจ"}
      </p>
      {type === "hiring" ? (
        // ตารางโพสของตัวเอง
        <table className="w-full text-left border-collapse mt-4">
          <thead className="bg-gray-200 text-center">
            <tr>
              <th className="p-3 border border-gray-100">โพสของคุณ</th>
              <th className="p-3 border border-gray-100">
                คนที่สมัครเข้ามาทำงาน
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-gray-100" colSpan={5}>
                ยังไม่มีข้อมูล
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        // ตารางข้อมูลพนักงาน  ที่ไปกดสนใจ
        <table className="w-full text-left border-collapse mt-4">
          <thead className="bg-gray-200 text-center">
            <tr>
              <th className="p-3 border border-gray-100">พนักงาน</th>
              <th className="p-3 border border-gray-100">ข้อมูลในโพสหางาน</th>
              <th className="p-3 border border-gray-100">รายได้ที่เรียกร้อง</th>
              <th className="p-3 border border-gray-100">
                สถานะการยืนยันเข้าทำงาน
              </th>
              <th className="p-3 border border-gray-100">วันที่โพสหางาน</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-gray-100" colSpan={5}>
                ยังไม่มีข้อมูล
              </td>
            </tr>
          </tbody>
        </table>
      )}
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

    fetchMatchingStatus(); // Fetch immediately on component mount

    const intervalId = setInterval(() => {
      fetchMatchingStatus();
    }, 10000); // Fetch notifications every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [user]);

  const handleStatusChange = async (
    matchId: string,
    newStatus: string,
    seekerId: string
  ) => {
    try {
      await updateMatchStatus(matchId, newStatus, seekerId);
      const updatedStatus = await getUserMatchingStatus();
      setHiringMatches(updatedStatus.data.hiringMatches);
      setFindingMatches(updatedStatus.data.findingMatches);
    } catch (error) {
      console.error("Error updating match status:", error);
    }
  };

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
      {/* NewNav */}
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
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 text-gray-800 justify-center items-center p-4 md:p-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left kanit-light w-full max-w-6xl">
          <div className="flex flex-row justify-end gap-auto w-full">
            <div
              ref={headingRef}
              className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-start text-green-700"
            >
              ติดตามการรับสมัครพนักงานของคุณ
            </div>
          </div>

          <div ref={tableRef} className="w-full text-gray-600 py-6">
            {findingMatches.length === 0 ? (
              <NoDataMessage type="finding" />
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4 mt-8 text-green-700">
                  พนักงานที่คุณกดสนใจ
                </h2>
                <div className="overflow-x-auto max-h-[400px] mt-8 shadow-lg rounded-lg">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-green-200 text-center">
                      <tr>
                        <th className="p-3 border border-green-100">พนักงาน</th>
                        <th className="p-3 border border-green-100">
                          ข้อมูลในโพสหางาน
                        </th>
                        <th className="p-3 border border-green-100">
                          รายได้ที่เรียกร้อง
                        </th>
                        <th className="p-3 border border-green-100">
                          สถานะการยืนยันเข้าทำงาน
                        </th>
                        <th className="p-3 border border-green-100">
                          วันที่โพสหางาน
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {findingMatches.map((match) => (
                        <tr key={match.id} className="hover:bg-green-50">
                          <td className="p-3 border border-green-100">
                            <div className="text-md text-gray-500 font-bold">
                              พนักงาน :
                            </div>
                            <div className="text-md">
                              <div>
                                <strong>ชื่อ:</strong>{" "}
                                {match.toPost.userData.firstName}
                              </div>
                              <div>
                                <strong>นามสกุล:</strong>{" "}
                                {match.toPost.userData.lastName}
                              </div>
                              <div>
                                <strong>อีเมล:</strong>{" "}
                                {match.toPost.userData.email}
                              </div>
                              <div>
                                {/* รูปโปรไฟล์ดึงมายังไงไม่รู้รอเพื่อนทำให้ */}
                                <strong>รูปโปรไฟล์:</strong>{" "}
                                <img
                                  src={
                                    user.profilePicture !== "UNDEFINED"
                                      ? match.toPost.userData.profilePicture
                                      : "profile.webp"
                                  }
                                  alt="Profile photo"
                                  className="object-cover w-32 h-32"
                                />
                              </div>
                              <div>
                                <strong>เกี่ยวกับฉัน:</strong>{" "}
                                {match.toPost.userData.aboutMe}
                              </div>
                              <div>
                                <strong>ติดต่อ:</strong>{" "}
                                {match.toPost.userData.contact}
                              </div>
                              {/* รูปresumeดึงมายังไงไม่รู้รอเพื่อนทำให้ */}
                              <div>
                                <strong>เรซูเม่:</strong>{" "}
                                <img
                                  src={
                                    user.profilePicture !== "UNDEFINED"
                                      ? match.toPost.userData.resume
                                      : "resume.webp"
                                  }
                                  alt="Resume"
                                  className="object-cover w-32 h-32"
                                />
                              </div>
                            </div>
                          </td>
                          {/* รายละเอียด */}
                          <td className="p-3 border border-green-100">
                            <div className="text-sm text-gray-500">
                              <div className="px-3">
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

                          <td className="p-3 border text-sm border-green-100">
                            ฿ {match.toPost.expectedSalary.toLocaleString()} บาท
                          </td>

                          <td className="p-3 border border-green-100 text-center text-sm">
                            <StatusBadge status={match.status} />
                          </td>

                          <td className="p-3 border border-green-100 text-sm">
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
                <h2 className="text-2xl font-bold mb-4 mt-8 text-green-700">
                  โพสรับสมัครงานของคุณที่มีคนกดสนใจ
                </h2>
                <div className="overflow-x-auto max-h-[400px] mt-8 shadow-lg rounded-lg">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-emerald-200 text-center">
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
                            {post.postMatched.length === 0 && (
                              <div className="flex items-center justify-center p-4 ">
                                <span className="text-gray-600 dark:text-gray-500 text-lg italic">
                                  ยังไม่มีผู้ใช้คนใดสนใจงานในขณะนี้
                                </span>
                              </div>
                            )}
                            {post.postMatched.map((match: any) => (
                              <div key={match.id}>
                                {match.toMatchSeekers.map(
                                  (seeker: any, index: number) => (
                                    <div key={seeker.jobHiringPostMatchedId}>
                                      <div className="flex flex-col border-b border-emerald-400 p-3 text-center">
                                        {index + 1}. ID พนักงานที่สมัครเข้ามา:{" "}
                                        {seeker.jobSeekerId ||
                                          seeker.oauthJobSeekerId}
                                        <EmpStatusBadge
                                          status={seeker.status}
                                        />
                                        {seeker.status === "INPROGRESS" && (
                                          <button>
                                            แก้ไขสถานะขอผู้สมัคร :
                                            <div className="text-center">
                                              <div className="gap-3">
                                                <div className="flex justify-center gap-2 mt-2">
                                                  <button
                                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                                    onClick={() => {
                                                      const acceptedCount =
                                                        match.toMatchSeekers.filter(
                                                          (s: any) =>
                                                            s.status ===
                                                            "ACCEPTED"
                                                        ).length;
                                                      if (
                                                        acceptedCount <
                                                        post.hiredAmount
                                                      ) {
                                                        handleStatusChange(
                                                          seeker.jobHiringPostMatchedId,
                                                          "ACCEPTED",
                                                          seeker.jobSeekerId ??
                                                            seeker.oauthJobSeekerId
                                                        );
                                                      } else {
                                                        alert(
                                                          "จำนวนผู้ที่รับเข้าทำงานเต็มแล้ว"
                                                        );
                                                      }
                                                    }}
                                                  >
                                                    ยอมรับ
                                                  </button>
                                                  <button
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                    onClick={() =>
                                                      handleStatusChange(
                                                        seeker.jobHiringPostMatchedId,
                                                        "DENIED",
                                                        seeker.jobSeekerId ??
                                                          seeker.oauthJobSeekerId
                                                      )
                                                    }
                                                  >
                                                    ปฏิเสธ
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </button>
                                        )}
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
