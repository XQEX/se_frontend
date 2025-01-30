import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { ClipLoader } from "react-spinners"; // You can use any spinner library
import {
  fetchAdminInfo,
  generateAdmin,
  fetchApprovalRequests,
  loginAdmin,
  logoutAdmin,
  approveUser,
} from "../api/Admin";

interface ApprovalRequest {
  id: string;
  userId: string;
  userType: string;
  status: string;
  adminId: string;
}

const Admin: React.FC = () => {
  const queryClient = useQueryClient();
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { data: adminInfo, isLoading: adminLoading } = useQuery(
    "adminInfo",
    fetchAdminInfo,
    { enabled: isLoggedIn }
  );
  const { data: approvalRequests = [], isLoading: approvalLoading } = useQuery(
    "approvalRequests",
    fetchApprovalRequests,
    {
      enabled: isLoggedIn,
    }
  );
  const generateAdminMutation = useMutation(generateAdmin, {
    onSuccess: () => {
      queryClient.invalidateQueries("adminInfo");
    },
  });
  const loginAdminMutation = useMutation(
    ({ name, password }: { name: string; password: string }) =>
      loginAdmin(name, password),
    {
      onSuccess: (data) => {
        queryClient.setQueryData("adminInfo", data);
      },
    }
  );
  const logoutAdminMutation = useMutation(logoutAdmin, {
    onSuccess: () => {
      queryClient.invalidateQueries("adminInfo");
    },
  });
  const approveUserMutation = useMutation(
    ({ userId, status }: { userId: string; status: string }) =>
      approveUser(userId, status),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("approvalRequests");
      },
    }
  );

  const handleGenerateAdmin = () => {
    generateAdminMutation.mutate();
  };

  const handleAdminLogin = (name: string, password: string) => {
    setLoginLoading(true);
    loginAdminMutation.mutate(
      { name, password },
      {
        onSuccess: () => {
          setIsLoggedIn(true);
        },
        onSettled: () => {
          setLoginLoading(false);
        },
      }
    );
  };

  const handleAdminLogout = () => {
    setLogoutLoading(true);
    logoutAdminMutation.mutate(undefined, {
      onSuccess: () => {
        setIsLoggedIn(false);
      },
      onSettled: () => {
        setLogoutLoading(false);
      },
    });
  };

  const handleApproveUser = (userId: string, status: string) => {
    approveUserMutation.mutate({ userId, status });
  };

  return (
    <div className="relative p-6 bg-gray-100 min-h-screen">
      {(adminLoading || approvalLoading) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <ClipLoader color="#ffffff" size={50} />
        </div>
      )}

      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Generate Admin</h2>
        <button
          onClick={handleGenerateAdmin}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={generateAdminMutation.isLoading}
        >
          {generateAdminMutation.isLoading ? (
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
        <button
          type="submit"
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-green-600"
          disabled={logoutLoading}
          onClick={handleAdminLogout}
        >
          {logoutLoading ? <ClipLoader color="#ffffff" size={20} /> : "Logout"}
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {adminInfo && (
        <div className="mb-6 p-4 bg-white rounded shadow">
          <h2 className="text-2xl font-semibold">
            Welcome, {adminInfo.username}
          </h2>
          <p className="text-gray-600">ID: {adminInfo.id}</p>
        </div>
      )}
      <h2 className="text-2xl font-semibold mb-4">
        Registration Approval Requests
      </h2>
      {adminInfo ? (
        Array.isArray(approvalRequests) ? (
          <ul className="space-y-4">
            {approvalRequests.map((request: ApprovalRequest) => (
              <li key={request.id} className="p-4 bg-white rounded shadow">
                <span className="font-medium">{request.userId}</span> -{" "}
                <span className="text-gray-600">{request.userType}</span> -{" "}
                <span className="text-gray-600">{request.status}</span>
                <button
                  onClick={() => handleApproveUser(request.id, "APPROVED")}
                  className="ml-4 px-2 py-1 bg-green-500 text-white rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleApproveUser(request.id, "UNAPPROVED")}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                >
                  Unapprove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No approval requests found.</p>
        )
      ) : (
        <p className="text-gray-600">
          Please log in to view approval requests.
        </p>
      )}
    </div>
  );
};

export default Admin;
