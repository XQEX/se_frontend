import axios from "axios";
import { backendPort } from "./globalvariable";

interface CompanyInfo {
  id: string;
  username: string;
}

interface CompanyAuthResponse {
  id: string;
  type: string;
  isOauth: boolean;
}

export const registerCompany = async (
  officialName: string,
  email: string,
  password: string,
  confirmPassword: string
): Promise<{ id: string }> => {
  const { data } = await axios.post<{ data: { id: string } }>(
    `http://localhost:${backendPort}/api/user/company`,
    { officialName, email, password, confirmPassword },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return data.data;
};

export const loginCompany = async (
  nameEmail: string,
  password: string
): Promise<CompanyAuthResponse> => {
  const { data } = await axios.post<{ data: CompanyAuthResponse }>(
    `http://localhost:${backendPort}/api/user/company/auth`,
    { nameEmail, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return data.data;
};

export const fetchCompanyInfo = async (): Promise<CompanyInfo> => {
  const { data } = await axios.get<{ data: CompanyInfo }>(
    `http://localhost:${backendPort}/api/user/company/auth`,
    {
      withCredentials: true,
    }
  );
  return data.data;
};

export const logoutCompany = async (): Promise<void> => {
  const { data } = await axios.delete<{ data: void }>(
    `http://localhost:${backendPort}/api/user/company/auth`,
    {
      withCredentials: true,
    }
  );
  return data.data;
};
