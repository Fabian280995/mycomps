import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-zinc-800 text-white h-[24rem]
    flex gap-6 justify-center items-center flex-wrap border-t-4 border-zinc-600
    "
    >
      <div className="flex flex-col gap-2 items-center">
        <p className="text-zinc-400 font-semibold">
          &copy; mycomps.de @ fabian lessmann <br />
        </p>
        <p className="text-zinc-500">Hier entsteht der Footer ...</p>
      </div>
    </footer>
  );
};

export default Footer;
