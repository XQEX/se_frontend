import axios from "axios";
import { backendPort } from "./globalvariable";

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
  try {
    console.log("Registering employer with:", {
      name,
      email,
      password,
      confirmPassword,
    });
    const { data } = await axios.post<{ data: { id: string } }>(
      `http://localhost:${backendPort}/api/user/employer`,
      { name, email, password, confirmPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("Registration successful:", data);
    return data.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const loginEmployer = async (
  nameEmail: string,
  password: string
): Promise<EmployerAuthResponse> => {
  try {
    console.log("Attempting to login employer with:", { nameEmail, password });
    const { data } = await axios.post<{ data: EmployerAuthResponse }>(
      `http://localhost:${backendPort}/api/user/employer/auth`,
      { nameEmail, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("Login successful:", data);
    return data.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const fetchEmployerInfo = async (): Promise<EmployerInfo> => {
  try {
    console.log("Fetching employer info...");
    const { data } = await axios.get<{ data: EmployerInfo }>(
      `http://localhost:${backendPort}/api/user/employer/auth`,
      {
        withCredentials: true,
      }
    );
    console.log("Fetch employer info successful:", data);
    return data.data;
  } catch (error) {
    console.error("Fetch employer info failed:", error);
    throw error;
  }
};

export const logoutEmployer = async (): Promise<void> => {
  try {
    console.log("Logging out employer...");
    const { data } = await axios.delete<{ data: void }>(
      `http://localhost:${backendPort}/api/user/employer/auth`,
      {
        withCredentials: true,
      }
    );
    console.log("Logout successful:", data);
    return data.data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};
