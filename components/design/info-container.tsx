import React from "react";

interface InfoContainerProps {
  title?: string;
  children: React.ReactNode;
}

const InfoContainer: React.FC<InfoContainerProps> = ({ title, children }) => {
  return (
    <div className="max-w-7xl mx-auto bg-gradient-to-l from-teal-400 to-emerald-400 p-1 rounded-2xl w-full">
      <div className="w-full rounded-[0.825rem] bg-white px-12 py-20 flex flex-col items-center gap-4">
        {title && (
          <h3 className="text-emerald-500 text-3xl font-semibold">{title}</h3>
        )}
        {children}
      </div>
    </div>
  );
};

export default InfoContainer;
