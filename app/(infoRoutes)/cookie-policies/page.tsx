import React from "react";

const CookiePoliciesPage = () => {
  return (
    <div>
      <div className="bg-teal-400 rounded-md text-white p-4 shadow-md">
        <h1 className="text-4xl text-center">
          Willkommen zu unseren Cookie-Richtlinien
        </h1>
      </div>

      <div className="w-full bg-white p-4 shadow-md mt-4">
        <section id="general-info">
          <h1 className="text-2xl font-semibold mb-4">
            Allgemeine Informationen zu Cookies
          </h1>
          <p className="text-gray-700 mb-4">
            Cookies sind kleine Textdateien, die auf deinem Computer oder
            Mobilgerät gespeichert werden, wenn du unsere Website besuchst.
            Diese Dateien dienen dazu, Informationen zu speichern und abzurufen,
            um deine Web-Erfahrung zu verbessern und personalisieren.
          </p>

          <h2 className="text-xl font-semibold mb-2">
            Warum verwenden wir Cookies?
          </h2>
          <p className="text-gray-700 mb-4">
            Wir setzen Cookies aus verschiedenen Gründen ein, darunter:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>
              <strong>Speicherung von Präferenzen:</strong> Cookies helfen
              dabei, deine Präferenzen wie Spracheinstellungen oder
              Login-Informationen zu speichern.
            </li>
            <li>
              <strong>Verbesserung der Website-Performance:</strong> Wir nutzen
              Cookies, um Informationen darüber zu sammeln, wie Besucher unsere
              Website nutzen, und um die Leistung und Benutzerfreundlichkeit zu
              optimieren.
            </li>
            <li>
              <strong>Gezielte Werbung:</strong> Cookies ermöglichen es uns,
              gezielte Werbung basierend auf deinen Interessen anzuzeigen.
            </li>
          </ul>
        </section>

        <section id="detailed-info" className="mt-8">
          <h1 className="text-2xl font-semibold mb-4">
            Detaillierte Erklärungen zu Cookies
          </h1>
          <h2 className="text-xl font-semibold mb-2">Arten von Cookies</h2>
          <p className="text-gray-700 mb-4">
            Es existieren zwei Hauptarten von Cookies:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>
              <strong>Dauerhafte Cookies:</strong> Diese verbleiben auf deinem
              Gerät, selbst nachdem du deinen Browser schließt, und dienen der
              Speicherung von Langzeitpräferenzen.
            </li>
            <li>
              <strong>Sitzungscookies:</strong> Diese werden temporär
              gespeichert und verschwinden nach dem Schließen deines Browsers.
              Sie dienen der temporären Speicherung von Informationen.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mb-2">
            Wie verwenden wir Cookies?
          </h2>
          <p className="text-gray-700 mb-4">
            Wir setzen verschiedene Arten von Cookies ein, darunter:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>
              <strong>Notwendige Cookies:</strong> Diese sind für den
              reibungslosen Betrieb unserer Website unerlässlich und ermöglichen
              dir grundlegende Funktionen.
            </li>
            <li>
              <strong>Präferenz-Cookies:</strong> Diese speichern deine
              Einstellungen und Präferenzen, um dein nächstes Besuchserlebnis zu
              verbessern.
            </li>
            <li>
              <strong>Statistik-Cookies:</strong> Sie helfen uns, die
              Website-Leistung zu analysieren und zu verbessern, indem sie
              anonyme Informationen darüber sammeln, wie Besucher die Website
              nutzen.
            </li>
            <li>
              <strong>Marketing-Cookies:</strong> Diese werden verwendet, um dir
              relevante Werbung basierend auf deinen Interessen anzuzeigen.
            </li>
          </ul>
        </section>

        <section id="cookie-settings" className="mt-8">
          <h1 className="text-2xl font-semibold mb-4">
            Deine Cookie-Einstellungen
          </h1>
          <p className="text-gray-700 mb-4">
            Du hast die Möglichkeit, deine Cookie-Einstellungen jederzeit
            anzupassen. Dies kannst du in den Einstellungen deines Browsers tun.
          </p>
        </section>

        <section id="contact" className="mt-8">
          <h1 className="text-2xl font-semibold mb-4">Kontakt</h1>
          <p className="text-gray-700 mb-4">
            Wenn du Fragen zu unseren Cookie-Richtlinien hast, kontaktiere uns
            bitte unter den folgenden Kontaktdaten.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Mail:</strong>
            <a
              href="mailto:lessmannwebdev@gmail.com"
              className="text-teal-400 hover:underline ml-4"
            >
              lessmannwebdev@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default CookiePoliciesPage;
