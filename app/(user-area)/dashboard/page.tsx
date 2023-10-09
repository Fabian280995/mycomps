import getUserInfo from "@/lib/actions/getUserInfo";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const DashboardSetupPage = async () => {
  const user = auth();
  if (!user) redirect("/");
  const token = await user.getToken();
  if (!token) redirect("/");

  const userInfo = await getUserInfo(token);
  console.log("USER INFO", userInfo);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full mt-12">
      <h1 className="text-4xl font-semibold text-gray-900">Dashboard</h1>
    </div>
  );
};

export default DashboardSetupPage;
