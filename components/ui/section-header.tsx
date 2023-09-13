import React from "react";

interface Props {
  title: string;
  subtitle?: string;
}

const SectionHeader = ({ title, subtitle }: Props) => {
  return (
    <div className="flex flex-col max-w-3xl gap-2">
      <h2 className="h2-green">{title}</h2>
      <p className="text-gray-600 font-semibold">{subtitle ? subtitle : ""}</p>
    </div>
  );
};

export default SectionHeader;
