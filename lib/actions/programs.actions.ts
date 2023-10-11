export const getActiveProgram = async (
  jwtToken: string,
  activeProgramId: string
) => {
  const res = await fetch(
    `https://mycomps-cms.vercel.app/api/app-users/programs/${activeProgramId}`,
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
