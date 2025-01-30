import axios from "axios";

interface EmployerInfo {
  id: string;
  username: string;
}

interface EmployerAuthResponse {
  id: string;
  type: string;
  isOauth: boolean;
}

export const registerEmployer = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): Promise<{ id: string }> => {
  const { data } = await axios.post<{ data: { id: string } }>(
    "http://localhost:6977/api/user/employer",
    { name, email, password, confirmPassword },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return data.data;
};

export const loginEmployer = async (
  nameEmail: string,
  password: string
): Promise<EmployerAuthResponse> => {
  const { data } = await axios.post<{ data: EmployerAuthResponse }>(
    "http://localhost:6977/api/user/employer/auth",
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

export const fetchEmployerInfo = async (): Promise<EmployerInfo> => {
  const { data } = await axios.get<{ data: EmployerInfo }>(
    "http://localhost:6977/api/user/employer/auth",
    {
      withCredentials: true,
    }
  );
  return data.data;
};

export const logoutEmployer = async (): Promise<void> => {
  const { data } = await axios.delete<{ data: void }>(
    "http://localhost:6977/api/user/employer/auth",
    {
      withCredentials: true,
    }
  );
  return data.data;
};
