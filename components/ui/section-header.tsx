import React from "react";

interface Props {
  title: string;
  subtitle?: string;
}

const SectionHeader = ({ title, subtitle }: Props) => {
  return (
    <div className="px-8 md:px-12 lg:px-16 w-full">
      <div className="flex flex-col max-w-7xl mx-auto ">
        <h2 className="h2-green">{title}</h2>
        <p className="text-gray-600 font-semibold">
          {subtitle ? subtitle : ""}
        </p>
      </div>
    </div>
  );
};

export default SectionHeader;
