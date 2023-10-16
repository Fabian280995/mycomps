// User Info Provider
"use client";
import fetchUserInfo from "@/lib/actions/getUserInfo";
import { User } from "@/types";
import { useAuth } from "@clerk/nextjs";
import React, { createContext, useState } from "react";

interface UserInfoContextProps {
  isLoading: boolean;
  userInfo: User | undefined;
  userLocation: { lat: number; lng: number } | undefined;
  refetchUserLocation: () => void;
  setUserInfo: React.Dispatch<React.SetStateAction<User | undefined>>;
  refetchUserInfo: () => void;
}

const UserInfoContext = createContext<UserInfoContextProps>({
  isLoading: false,
  userInfo: undefined,
  userLocation: undefined,
  refetchUserLocation: () => {},
  setUserInfo: () => {},
  refetchUserInfo: () => {},
});

export const useUserInfo = () => {
  return React.useContext(UserInfoContext);
};

const UserInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<User | undefined>(undefined);
  const [userLocation, setUserLocation] = useState<
    { lat: number; lng: number } | undefined
  >(undefined);
  const { userId, getToken } = useAuth();

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

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  };

  React.useEffect(() => {
    if (userId) {
      getUserInfo();
    }
  }, [userId]);

  React.useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <UserInfoContext.Provider
      value={{
        isLoading,
        userInfo,
        userLocation,
        refetchUserLocation: getUserLocation,
        setUserInfo,
        refetchUserInfo: getUserInfo,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoProvider;
