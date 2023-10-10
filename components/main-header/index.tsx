import AuthLinks from "./auth-links";
import Brand from "./brand";

const MainHeader = () => {
  return (
    <header
      className="flex items-center justify-between padding-x py-4 gap-12
      w-full bg-white"
    >
      <Brand />
      {/* 
      <MainHeaderNav /> */}
      <AuthLinks />
    </header>
  );
};

export default MainHeader;
