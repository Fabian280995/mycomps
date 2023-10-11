import { User } from "@/types";

const getUserInfo = async (jwtToken: string): Promise<User> => {
  const res = await fetch("https://mycomps-cms.vercel.app/api/app-users/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user info");
  }

  return res.json();
};

export default getUserInfo;
