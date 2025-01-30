import axios from "axios";
import { backendPort } from "./globalvariable";

interface JobSeekerInfo {
  id: string;
  username: string;
}

interface JobSeekerAuthResponse {
  id: string;
  type: string;
  isOauth: boolean;
}

export const registerJobSeeker = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): Promise<{ id: string }> => {
  try {
    console.log("Registering job seeker with:", {
      name,
      email,
      password,
      confirmPassword,
    });
    const { data } = await axios.post<{ data: { id: string } }>(
      `http://localhost:${backendPort}/api/user/job-seeker`,
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

export const loginJobSeeker = async (
  nameEmail: string,
  password: string
): Promise<JobSeekerAuthResponse> => {
  try {
    console.log("Attempting to login job seeker with:", {
      nameEmail,
      password,
    });
    const { data } = await axios.post<{ data: JobSeekerAuthResponse }>(
      `http://localhost:${backendPort}/api/user/job-seeker/auth`,
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

export const logoutJobSeeker = async (): Promise<void> => {
  try {
    console.log("Logging out job seeker...");
    const { data } = await axios.delete<{ data: void }>(
      `http://localhost:${backendPort}/api/user/job-seeker/auth`,
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

export const fetchJobSeekerInfo = async (): Promise<JobSeekerInfo> => {
  try {
    console.log("Fetching job seeker info...");
    const { data } = await axios.get<{ data: JobSeekerInfo }>(
      `http://localhost:${backendPort}/api/user/job-seeker/auth`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("Fetch job seeker info successful:", data);
    return data.data;
  } catch (error) {
    console.error("Fetch job seeker info failed:", error);
    throw error;
  }
};
