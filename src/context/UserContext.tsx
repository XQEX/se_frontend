import React, { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import { fetchJobSeekerInfo } from "../api/JobSeeker";
import { fetchEmployerInfo } from "../api/Employer";
import { fetchCompanyInfo } from "../api/Company";

interface UserContextType {
  user: any;
  isLoading: boolean;
  isHaveUser: boolean;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  refetchjobseeker: () => void;
  refetchemployer: () => void;
  refetchCompany: () => void;
  isStale: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  const {
    isLoading: isLoadingJobSeeker,
    refetch: refetchjobseeker,
    isStale: isStaleJobseeker,
  } = useQuery("currentJobSeeker", fetchJobSeekerInfo, {
    onSuccess: (data) => {
      setUser((prev: any) => prev ?? data);
    },
  });

  const {
    isLoading: isLoadingEmployer,
    refetch: refetchemployer,
    isStale: isStaleEmployer,
  } = useQuery("currentEmployer", fetchEmployerInfo, {
    onSuccess: (data) => {
      setUser((prev: any) => prev ?? data);
    },
  });

  const {
    isLoading: isLoadingCompany,
    refetch: refetchCompany,
    isStale: isStaleCompany,
  } = useQuery("currentCompany", fetchCompanyInfo, {
    onSuccess: (data) => {
      setUser((prev: any) => prev ?? data);
    },
  });

  const isLoading = isLoadingJobSeeker || isLoadingEmployer || isLoadingCompany;
  const isStale = isStaleJobseeker || isStaleEmployer || isStaleCompany;
  const isHaveUser = !!user;

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        isHaveUser,
        setUser,
        refetchjobseeker,
        refetchemployer,
        refetchCompany,
        isStale,
      }}
    >
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
