import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchJobSeekerInfo } from "../api/JobSeeker"; // Adjust the import based on your API
import { fetchEmployerInfo } from "../api/Employer"; // Adjust the import based on your API
import { fetchAdminInfo } from "../api/Admin"; // Adjust the import based on your API

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
  const { data, isLoading } = useQuery("currentUser", fetchJobSeekerInfo, {
    onSuccess: (data) => {
      setUser(data);
    },
    onError: () => {
      setUser(null);
    },
  });

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
