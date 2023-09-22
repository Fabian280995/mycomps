import Link from "next/link";
import React from "react";

const InDevelopmentPage = () => {
  return (
    <div
      className="w-screen h-screen flex flex-col justify-center max-w-5xl padding-x mx-auto py-6
    overflow-y-auto no-scrollbar"
    >
      <h1 className="text-2xl md:text-4xl xl:text-6xl font-bold text-teal-400 drop-shadow-md">
        Willkommen bei mycomps.de!
      </h1>
      <br />
      <strong className="mt-4 text-2xl text-gray-700">
        Diese Seite befindet sich noch in Entwicklung.
      </strong>
      <p className="mt-2 text-lg text-gray-700">
        Wir geben unser bestes um die Seite schnellstmöglich für dich fertig zu
        stellen.
        <br />
        Du kannst dich bereits umsehen, allerdings kann es sein, dass noch nicht
        alles funktioniert und einige Funktionen noch nicht für dein Smartphone
        oder andere Geräte optimiert sind.
      </p>
      <Link
        type="button"
        className="px-6 py-3 mt-4 sm:mt-8 text-white bg-teal-400
            rounded-full shadow-lg hover:bg-teal-500 border border-white
            transform hover:scale-105 transition-all duration-300 ease-in-out max-w-xl self-center my-6"
        href="/home"
      >
        <p className="text-sm md:text-lg font-semibold text-white">
          Jetzt weiter zur Website!
        </p>
      </Link>
      <ul className="list-disc">
        <strong>Deshalb:</strong>
        <li>
          <p className="font-semibold text-red-500">
            Keine Garantie für die Richtigkeit der Daten. Informiere dich auf
            der Website der Veranstalter!
          </p>
        </li>
        <li>
          <p className="font-semibold text-red-500">
            Mit dem Besuch der Seite erklärst du dich mit der Nutzung von
            Cookies einverstanden.
          </p>
          <Link
            href="/cookie-policies"
            className="text-gray-400 hover:underline text-base"
          >
            Hier kannst du mehr zu Cookies erfahren.
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default InDevelopmentPage;
