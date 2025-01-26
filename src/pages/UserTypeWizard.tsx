import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserTypeWizard() {
  // เราใช้ step เพียง 2 step:
  // - Step 1 ถาม: "หางาน?" หรือ "หาคนทำงาน?"
  // - Step 2 จะปรากฏเฉพาะกรณี "หาคนทำงาน"
  const [currentStep, setCurrentStep] = useState(1);

  // userFlow จะเป็น "seek" หรือ "employ" (หรือ null ยังไม่เลือก)
  type UserFlow = "seek" | "employ" | null;
  const [userFlow, setUserFlow] = useState<UserFlow>(null);

  const navigate = useNavigate();

  // เมื่อผู้ใช้เลือกหางานหรือหาคนทำงานที่ Step 1
  const handleStep1Choice = (flow: UserFlow) => {
    setUserFlow(flow);

    if (flow === "seek") {
      // ถ้าต้องการหางาน ให้ไปหน้า Signup ทันที (param เป็น "job-seeker")
      navigate("/signUp/job-seeker");
    } else if (flow === "employ") {
      // ถ้าต้องการหาคนทำงาน ไป Step 2
      setCurrentStep(2);
    }
  };

  // เมื่อผู้ใช้เลือกที่ Step 2 (employer หรือ company)
  const handleStep2Choice = (role: "employer" | "company") => {
    // ไปหน้าสมัครสมาชิก เช่น "/signUp/employer" หรือ "/signUp/company"
    navigate(`/signUp/${role}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md relative overflow-hidden">
        {/* Title */}
        <h1 className="text-xl font-bold text-center mb-6">
          เลือกประเภทผู้ใช้งาน
        </h1>

        {/* STEP 1 */}
        {currentStep === 1 && (
          <div
            className={`
              transition-all duration-700 
              ${
                currentStep === 1
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-full"
              }
            `}
          >
            <p className="mb-4 text-center">คุณต้องการทำอะไร?</p>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => handleStep1Choice("seek")}
                className="bg-seagreen text-white py-3 px-4 rounded-md hover:opacity-90 transition-opacity"
              >
                ฉันต้องการหางาน
              </button>
              <button
                onClick={() => handleStep1Choice("employ")}
                className="bg-seagreen text-white py-3 px-4 rounded-md hover:opacity-90 transition-opacity"
              >
                ฉันต้องการหาคนทำงาน
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 (เฉพาะกรณี userFlow === "employ") */}
        {currentStep === 2 && userFlow === "employ" && (
          <div
            className={`
              transition-all duration-700 
              ${
                currentStep === 2
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-full"
              }
            `}
          >
            <p className="mb-4 text-center">คุณเป็นนายจ้างหรือบริษัท?</p>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => handleStep2Choice("employer")}
                className="bg-seagreen text-white py-3 px-4 rounded-md hover:opacity-90 transition-opacity"
              >
                นายจ้าง (Employer)
              </button>
              <button
                onClick={() => handleStep2Choice("company")}
                className="bg-seagreen text-white py-3 px-4 rounded-md hover:opacity-90 transition-opacity"
              >
                บริษัท (Company)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserTypeWizard;
