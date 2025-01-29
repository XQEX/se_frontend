import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners"; // You can use any spinner library

interface AdminInfo {
  name: string;
  email: string;
}

interface ApprovalRequest {
  id: string;
  userId: string;
  userType: string;
  status: string;
  adminId: string;
}

interface ApiResponse<T> {
  success: boolean;
  msg: string;
  data: T;
}

const Admin: React.FC = () => {
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);
  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Fetching admin data...");
        const adminResponse = await axios.get<ApiResponse<AdminInfo>>(
          "http://localhost:6977/api/admin/auth"
        );
        setAdminInfo(adminResponse.data.data);

        console.log("Fetching approval requests...");
        const approvalResponse = await axios.get<
          ApiResponse<ApprovalRequest[]>
        >("http://localhost:6977/api/admin/approve");
        setApprovalRequests(approvalResponse.data.data);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      } finally {
        setLoading(false);
        console.log("Fetch complete, loading set to false");
      }
    };

    fetchData();
  }, []);

  const handleGenerateAdmin = async () => {
    setButtonLoading(true);
    try {
      const response = await axios.post<ApiResponse<AdminInfo>>(
        "http://localhost:6977/api/admin",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            permission_key: "69duangjun69",
          },
        }
      );
      if (response.data.success) {
        console.log("Generated Admin:", response.data.data);
      } else {
        console.error("Failed to generate admin:", response.data.msg);
      }
    } catch (error) {
      console.error("There was an error generating the admin!", error);
    } finally {
      setButtonLoading(false);
    }
  };

  const handleAdminLogin = async (name: string, password: string) => {
    setLoginLoading(true);
    try {
      const response = await axios.post<ApiResponse<{ token: string }>>(
        "http://localhost:6977/api/admin/auth",
        {
          nameEmail: name,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Credential: "include",
          },
        }
      );
      if (response.data.success) {
        console.log("Login successful:", response.data.data);
      } else {
        console.error("Failed to login as admin:", response.data.msg);
      }
    } catch (error) {
      console.error("There was an error logging in as admin!", error);
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="relative p-6 bg-gray-100 min-h-screen">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <ClipLoader color="#ffffff" size={50} />
        </div>
      )}

      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Generate Admin</h2>
        <button
          onClick={handleGenerateAdmin}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={buttonLoading}
        >
          {buttonLoading ? (
            <ClipLoader color="#ffffff" size={20} />
          ) : (
            "Generate Admin"
          )}
        </button>
      </div>

      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const username = formData.get("username") as string;
            const password = formData.get("password") as string;
            handleAdminLogin(username, password);
          }}
        >
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            disabled={loginLoading}
          >
            {loginLoading ? <ClipLoader color="#ffffff" size={20} /> : "Login"}
          </button>
        </form>
      </div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {adminInfo && (
        <div className="mb-6 p-4 bg-white rounded shadow">
          <h2 className="text-2xl font-semibold">Welcome, {adminInfo.name}</h2>
          <p className="text-gray-600">Email: {adminInfo.email}</p>
        </div>
      )}
      <h2 className="text-2xl font-semibold mb-4">
        Registration Approval Requests
      </h2>
      {adminInfo ? (
        <ul className="space-y-4">
          {approvalRequests.map((request) => (
            <li key={request.id} className="p-4 bg-white rounded shadow">
              <span className="font-medium">{request.userId}</span> -{" "}
              <span className="text-gray-600">{request.userType}</span> -{" "}
              <span className="text-gray-600">{request.status}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">
          Please log in to view approval requests.
        </p>
      )}
    </div>
  );
};

export default Admin;
