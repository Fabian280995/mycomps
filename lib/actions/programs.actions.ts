export const getProgramById = async (jwtToken: string, programId: string) => {
  const res = await fetch(
    `https://mycomps-cms.vercel.app/api/app-users/programs/${programId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch active program");
  }
  return res.json();
};

export const getPrograms = async (jwtToken: string) => {
  const res = await fetch("http://localhost:3001/api/app-users/programs", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch programs");
  }
  return res.json();
};
