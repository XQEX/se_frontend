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
  return data.data;
};

export const loginJobSeeker = async (
  nameEmail: string,
  password: string
): Promise<JobSeekerAuthResponse> => {
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
  return data.data;
};

export const fetchJobSeekerInfo = async (): Promise<JobSeekerInfo> => {
  const { data } = await axios.get<{ data: JobSeekerInfo }>(
    `http://localhost:${backendPort}/api/user/job-seeker/auth`,
    {
      withCredentials: true,
    }
  );
  return data.data;
};

export const logoutJobSeeker = async (): Promise<void> => {
  const { data } = await axios.delete<{ data: void }>(
    `http://localhost:${backendPort}/api/user/job-seeker/auth`,
    {
      withCredentials: true,
    }
  );
  return data.data;
};
