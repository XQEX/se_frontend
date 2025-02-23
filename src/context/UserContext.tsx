import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchJobSeekerInfo } from "../api/JobSeeker";
import { fetchEmployerInfo } from "../api/Employer";
import { fetchCompanyInfo } from "../api/Company";

interface UserContextType {
  user: any;
  isLoading: boolean;
  isLoggedIn: boolean;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  refetchjobseeker: () => void;
  refetchemployer: () => void;
  refetchCompany: () => void;
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Check if the user is signed in on page load (e.g., based on cookies or localStorage)
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsSignedIn(true); // User is logged in if token is available
    }
  }, []);

  const { isLoading: isLoadingJobSeeker, refetch: refetchjobseeker } = useQuery(
    "currentJobSeeker",
    fetchJobSeekerInfo,
    {
      onSuccess: (data) => {
        setUser((prev: any) => prev ?? data);
      },
    }
  );

  const { isLoading: isLoadingEmployer, refetch: refetchemployer } = useQuery(
    "currentEmployer",
    fetchEmployerInfo,
    {
      onSuccess: (data) => {
        setUser((prev: any) => prev ?? data);
      },
    }
  );

  const { isLoading: isLoadingCompany, refetch: refetchCompany } = useQuery(
    "currentCompany",
    fetchCompanyInfo,
    {
      onSuccess: (data) => {
        setUser((prev: any) => prev ?? data);
      },
    }
  );

  const isLoading = isLoadingJobSeeker || isLoadingEmployer || isLoadingCompany;
  const isLoggedIn = !!user;

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        isLoggedIn,
        setUser,
        refetchjobseeker,
        refetchemployer,
        refetchCompany,
        isSignedIn,
        setIsSignedIn,
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
