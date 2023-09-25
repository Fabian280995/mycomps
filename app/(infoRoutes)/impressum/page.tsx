import React from "react";

const ImpressumPage = () => {
  return (
    <div className="space-y-4">
      <div className="bg-teal-400 rounded-md text-white p-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">Impressum</h1>
      </div>

      <div className="bg-white p-4 shadow-md rounded-md">
        <section id="imprint-info">
          <h1 className="text-2xl font-semibold mb-4">Angaben gemäß § 5 TMG</h1>
          <p className="text-gray-700">
            &copy; 2023 | mycomps.de
            <br />
            Fabian Lessmann
            <br />
            Berliner Str. 7
            <br />
            54550, Daun
            <br />
            Deutschland
            <br />
          </p>

          <h2 className="text-xl font-semibold mt-4 mb-2">Kontakt</h2>
          <p className="text-gray-700">
            E-Mail: lessmannwebdev@gmail.com
            <br />
            Telefon: +49 151 16773509
            <br />
          </p>

          <h2 className="text-xl font-semibold mt-4 mb-2">Umsatzsteuer-ID</h2>
          <p className="text-gray-700">
            Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:
            <br />
            folgt...
            <br />
          </p>

          <h2 className="text-xl font-semibold mt-4 mb-2">
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
          </h2>
          <p className="text-gray-700">
            Fabian Lessmann
            <br />
            Berliner Str. 7
            <br />
            54550, Daun
            <br />
            Deutschland
            <br />
          </p>
        </section>
      </div>
    </div>
  );
};

export default ImpressumPage;
