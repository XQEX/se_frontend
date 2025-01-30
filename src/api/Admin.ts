import axios from "axios";
import { backendPort } from "./globalvariable";
interface AdminInfo {
  id: string;
  username: string;
}

interface ApprovalRequest {
  id: string;
  userId: string;
  userType: string;
  status: string;
  adminId: string;
}

export const fetchAdminInfo = async (): Promise<AdminInfo> => {
  const { data } = await axios.get<{ data: AdminInfo }>(
    `http://localhost:${backendPort}/api/admin/auth`,
    {
      withCredentials: true,
    }
  );
  return data.data;
};

export const fetchApprovalRequests = async (): Promise<ApprovalRequest[]> => {
  const { data } = await axios.get<{ data: ApprovalRequest[] }>(
    `http://localhost:${backendPort}/api/admin/approve`,
    {
      withCredentials: true,
    }
  );
  return data.data;
};

export const generateAdmin = async (): Promise<AdminInfo> => {
  const { data } = await axios.post<{ data: AdminInfo }>(
    `http://localhost:${backendPort}/api/admin`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        permission_key: "69duangjun69",
      },
      withCredentials: true,
    }
  );
  console.log("successfully generate admin", data);
  return data.data;
};

export const loginAdmin = async (
  name: string,
  password: string
): Promise<AdminInfo> => {
  const { data } = await axios.post<{ data: AdminInfo }>(
    `http://localhost:${backendPort}/api/admin/auth`,
    {
      nameEmail: name,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  console.log("login success", data);
  return data.data;
};

export const logoutAdmin = async (): Promise<void> => {
  const { data } = await axios.delete<{ data: void }>(
    `http://localhost:${backendPort}/api/admin/auth`,
    {
      withCredentials: true,
    }
  );
  console.log("delete success", data);
  return data.data;
};

export const approveUser = async (
  userId: string,
  status: string
): Promise<ApprovalRequest> => {
  const { data } = await axios.post<{ data: ApprovalRequest }>(
    `http://localhost:${backendPort}/api/admin/approve`,
    { id: userId, status },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  console.log(data);
  return data.data;
};
