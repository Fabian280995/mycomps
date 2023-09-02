"use client";
import React from "react";

const BottomScrollIndicator = () => {
  const [scrollTop, setScrollTop] = React.useState(0);

  const onScroll = () => {
    const winScroll = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    setScrollTop((winScroll / height) * 100);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="sticky bottom-0 left-o right-0 z-50
      h-1 bg-white/20 w-full"
    >
      <div
        className={`h-full bg-emerald-400`}
        style={{ width: `${scrollTop}%` }}
      />
    </div>
  );
};

export default BottomScrollIndicator;
