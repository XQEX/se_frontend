import React from "react";

interface JobCardEmpProps {
  jobTitle: string;
  Name: string;
  expectedPosition: string;
  expectedSalary: string;
  onViewDetails: () => void;
}

const JobCardEmp: React.FC<JobCardEmpProps> = ({
  jobTitle,
  Name,
  expectedPosition,
  expectedSalary,
  onViewDetails,
}) => {
  return (
    <div className="job-card-emp bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <h3 className="text-lg font-bold mb-2">{jobTitle}</h3>
      <p className="text-sm text-gray-600">
        <strong>Name:</strong> {Name}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Position:</strong> {expectedPosition}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Expected Salary:</strong> {expectedSalary}
      </p>
      <div className="job-actions flex justify-end gap-2 mt-4">
        <button
          className="font-medium rounded-lg py-2 px-4 transition"
          style={{
            backgroundColor: "#2E8B57", // สี Sea Green
            color: "white",
            border: "none",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#1C6F44")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#2E8B57")
          }
          onClick={onViewDetails}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default JobCardEmp;
