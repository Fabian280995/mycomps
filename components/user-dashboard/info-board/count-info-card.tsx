import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  count: number | undefined;
  limit?: number;
  href?: string;
}

const CountInfoCard = ({
  title,
  subtitle,
  icon,
  count,
  limit,
  href,
}: Props) => {
  return (
    <Link
      href={href ? href : "/"}
      className="w-full rounded-3xl shadow-md bg-white p-6 flex items-center justify-between
      hover:-translate-y-1 hover:shadow-lg transition-all duration-100 ease-out"
    >
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 bg-teal-400 rounded-full text-white flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h3 className="text-base md:text-lg xl:text-xl font-semibold text-gray-400">
            {title}
          </h3>
          {subtitle && <p className="text-xs text-gray-300">{subtitle}</p>}
        </div>
      </div>
      <div className="w-12 h-12 rounded-full text-white flex items-center justify-center">
        <p className="text-gray-700 text-xl md:text-3xl xl:text-4xl font-bold">
          {count ? count : "0"}
        </p>
        {limit && (
          <p className="text-gray-400 text-base font-semibold self-end pb-2">
            /{limit}
          </p>
        )}
      </div>
    </Link>
  );
};

export default CountInfoCard;
