import { Sport } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sports`;

const getSports = async (): Promise<Sport[]> => {
  const res = await fetch(URL);
  const data = await res.json();
  return data;
};

export default getSports;
