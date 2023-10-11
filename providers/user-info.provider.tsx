// User Info Provider
"use client";
import fetchUserInfo from "@/lib/actions/getUserInfo";
import { User } from "@/types";
import { useAuth } from "@clerk/nextjs";
import React, { createContext, useState } from "react";

interface UserInfoContextProps {
  isLoading: boolean;
  userInfo: User | undefined;
  setUserInfo: React.Dispatch<React.SetStateAction<User | undefined>>;
  refetchUserInfo: () => void;
}

const UserInfoContext = createContext<UserInfoContextProps>({
  isLoading: false,
  userInfo: undefined,
  setUserInfo: () => {},
  refetchUserInfo: () => {},
});

export const useUserInfo = () => {
  return React.useContext(UserInfoContext);
};

const UserInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<User | undefined>(undefined);
  const { userId, getToken } = useAuth();

  console.log("USER_INFO_PROVIDER: userId: ", userId);

  const getUserInfo = async () => {
    setIsLoading(true);
    try {
      const token = await getToken();
      if (token) {
        const userInfo = await fetchUserInfo(token);
        setUserInfo(userInfo);
      }
    } catch (err: any) {
      console.log("USER_INFO_PROVIDER: Error getting UserInfo: ", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (userId) {
      getUserInfo();
    }
  }, [userId]);

  return (
    <UserInfoContext.Provider
      value={{ isLoading, userInfo, setUserInfo, refetchUserInfo: getUserInfo }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoProvider;
