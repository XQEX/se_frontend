import React, { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import { fetchJobSeekerInfo } from "../api/JobSeeker";
import { fetchEmployerInfo } from "../api/Employer";
import { fetchCompanyInfo } from "../api/Company";

interface UserContextType {
  user: any;
  isLoading: boolean;
  isLoggedIn: boolean;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  const { isLoading: isLoadingJobSeeker } = useQuery(
    "currentJobSeeker",
    fetchJobSeekerInfo,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      enabled: !!!user,
      retry(failureCount, error): boolean {
        if ((error as any).status === 401 || failureCount > 2) {
          setUser(null);
          return false;
        }
        return true;
      },
      onSuccess: (data) => {
        setUser(data);
      },
      onError: () => {
        setUser(null);
      },
    }
  );

  const { isLoading: isLoadingEmployer } = useQuery(
    "currentEmployer",
    fetchEmployerInfo,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      enabled: !!!user,
      retry(failureCount, error): boolean {
        if ((error as any).status === 401 || failureCount > 2) {
          setUser(null);
          return false;
        }
        return true;
      },
      onSuccess: (data) => {
        setUser(data);
      },
      onError: () => {
        setUser(null);
      },
    }
  );
  const { isLoading: isLoadingCompany } = useQuery(
    "currentCompany",
    fetchCompanyInfo,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      enabled: !!!user,
      retry(failureCount, error): boolean {
        if ((error as any).status === 401 || failureCount > 2) {
          setUser(null);
          return false;
        }
        return true;
      },
      onSuccess: (data) => {
        setUser(data);
      },
      onError: () => {
        setUser(null);
      },
    }
  );

  const isLoading = isLoadingJobSeeker || isLoadingEmployer || isLoadingCompany;
  const isLoggedIn = !!user;

  return (
    <UserContext.Provider value={{ user, isLoading, isLoggedIn, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
