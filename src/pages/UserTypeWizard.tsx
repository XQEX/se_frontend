import { useNavigate } from "react-router-dom";

function UserTypeWizard() {
  const navigate = useNavigate();

  // เมื่อผู้ใช้เลือกหางาน
  const handleSeek = () => {
    // ไปหน้า signUp/job-seeker
    navigate("/signUp/job-seeker");
  };

  // เมื่อผู้ใช้เลือกหาคนทำงาน
  const handleEmploy = () => {
    // ไปหน้า signUp/employer
    navigate("/signUp/employer");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md relative overflow-hidden">
        {/* Title */}
        <h1 className="text-xl font-bold text-center mb-6">
          เลือกประเภทผู้ใช้งาน
        </h1>

        {/* SINGLE STEP */}
        <div className="transition-all duration-700 opacity-100 translate-x-0">
          <p className="mb-4 text-center">คุณต้องการทำอะไร?</p>
          <div className="flex flex-col space-y-4">
            <button
              onClick={handleSeek}
              className="bg-seagreen text-white py-3 px-4 rounded-md hover:opacity-90 transition-opacity"
            >
              ฉันต้องการหางาน
            </button>
            <button
              onClick={handleEmploy}
              className="bg-seagreen text-white py-3 px-4 rounded-md hover:opacity-90 transition-opacity"
            >
              ฉันต้องการหาคนทำงาน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserTypeWizard;
