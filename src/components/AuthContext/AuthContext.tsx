import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { sendOTP, verifyOTP } from "../../apis/auth";
import {
  getLocalStorage,
  removeLocalStorage,
  setLoginStorage,
} from "../../utils/localStorage";
import { UserAuth } from "../../constants/type";
import { ACCESS_TOKENS_KEY, EXPIRE_TIME } from "../../constants/keys";

// Define the shape of the context, including async functions
interface AuthContextType {
  user: { email: string } | null;
  getOTP: (email: string) => Promise<any>;
  verifyOTPProvider: (email: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

// Create the context with a default value of undefined
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Define the props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component with TypeScript and async functions
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserAuth | null>(null);

  useEffect(() => {
    try {
      const token = getLocalStorage(ACCESS_TOKENS_KEY);
      const user = setLoginStorage(token);
      setUser(user);
    } catch (error) {
      console.log("User has not logged in or token is expired");
    }
  }, []);

  const getOTP = async (email: string): Promise<any> => {
    // Simulate async getOTP operation
    return await sendOTP(email);
  };

  const verifyOTPProvider = async (
    email: string,
    code: string
  ): Promise<void> => {
    // Simulate async login operation
    const verifyOTPResponse = await verifyOTP(email, code);
    const user: UserAuth = setLoginStorage(verifyOTPResponse.accessToken);
    setUser(user);
  };

  const logout = async (): Promise<void> => {
    setUser(null);
    removeLocalStorage(ACCESS_TOKENS_KEY);
    removeLocalStorage(EXPIRE_TIME);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, getOTP, verifyOTPProvider, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
