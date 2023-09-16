import React from "react";

interface InfoContainerProps {
  title?: string;
  children: React.ReactNode;
}

const InfoContainer: React.FC<InfoContainerProps> = ({ title, children }) => {
  return (
    <div className="bg-gradient-to-l from-teal-400 to-purple-400 p-0.5 rounded-2xl w-full">
      <div className="w-full rounded-[0.825rem] bg-white px-12 py-20 flex flex-col items-center gap-4">
        {title && (
          <h3 className="text-purple-500 drop-shadow-md text-3xl font-semibold">
            {title}
          </h3>
        )}
        {children}
      </div>
    </div>
  );
};

export default InfoContainer;
