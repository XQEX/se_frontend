import React, { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import { getCurrentUser, CurrentUserResponse } from "../api/auth";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: CurrentUserResponse['data'] | null;
  error: string | null;
}

interface UserContextType extends AuthState {
  refetchUser: () => void;
  setUser: React.Dispatch<React.SetStateAction<CurrentUserResponse['data'] | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<CurrentUserResponse['data'] | null>(null);

  const {
    isLoading,
    error,
    refetch: refetchUser
  } = useQuery("currentUser", getCurrentUser, {
    onSuccess: (data) => {
      if (data.success && data.data) {
        setUser(data.data);
      } else {
        setUser(null);
      }
    },
    onError: (error) => {
      console.error("Error fetching user info:", error);
      setUser(null);
    },
    // Refresh every 3 minutes instead of 3 seconds for better performance
    refetchInterval: 180000,
    retry: 1,
  });

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated: !!user,
    error: error ? (error as Error).message : null,
    refetchUser,
  };

  return (
    <UserContext.Provider value={value}>
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
