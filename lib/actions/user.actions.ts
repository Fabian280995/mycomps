import { User } from "@/types";

export const updateUserCompIds = async (
  jwtToken: string,
  compIds: string[]
): Promise<User> => {
  const data = {
    compIds: compIds,
  };
  const res = await fetch("http://localhost:3001/api/app-users/user", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to patch user");
  }

  return res.json();
};
