import { User } from "@/types";

const getUserInfo = async (jwtToken: string): Promise<User> => {
  console.log("trying to get user info");
  console.log("JWT TOKEN", jwtToken);

  const res = await fetch("http://localhost:3001/api/app-users/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  const data = await res.json();

  console.log("data", data);

  return data;
};

export default getUserInfo;
