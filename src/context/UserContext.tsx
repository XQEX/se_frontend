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
      enabled: !user, // Only fetch if user is not already set
      refetchOnWindowFocus: false,
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
      enabled: !user, // Only fetch if user is not already set
      refetchOnWindowFocus: false,
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
      enabled: !user, // Only fetch if user is not already set
      refetchOnWindowFocus: false,
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
