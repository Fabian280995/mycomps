import React from "react";

const AboutPage = () => {
  return (
    <div>
      <div className=" text-white py-8 rounded-md shadow-md bg-teal-400">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-gray-700">mycomps</span>.de
        </h1>
        <p className="text-center text-2xl">- Level Up Your Competition -</p>
      </div>

      <div className="w-full my-4 bg-white p-6 shadow-md rounded-md">
        <section id="about-info">
          <h1 className="text-3xl font-semibold mb-6">Unsere Geschichte</h1>
          <p className="text-gray-700 text-lg leading-loose">
            Hallo, ich bin Fabian Lessmann, 28 Jahre alt, leidenschaftlicher
            Sportler und Entwickler. Ich habe selbst immer wieder die Erfahrung
            gemacht, wie wichtig es ist, klare Ziele im Sport zu haben, um
            wirklich effizient Fortschritte zu machen. Diese Erfahrungen haben
            mich dazu inspiriert, <span className="text-teal-400">MyComps</span>{" "}
            zu entwickeln - eine Plattform, auf der du Wettkämpfe finden und
            dich optimal auf diese vorbereiten kannst.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Unsere Mission</h2>
          <p className="text-gray-700 text-lg leading-loose">
            Unsere Mission bei <span className="text-teal-400">MyComps</span>{" "}
            ist es, deine Fitness auf das nächste Level zu bringen. Dabei haben
            wir verstanden, dass für den Fortschritt nicht nur der regelmäßige
            Gang zum Training wichtig ist, sondern auch die nötige
            Herausforderung um dauerhaft am Ball zu bleiben. Dabei sind Ziele
            das A und O, wenn es um langfristigen Erfolg geht.
            <br /> Wir verstehen die Bedeutung von Motivation und klaren Zielen,
            und sind hier um dir zu helfen. Hole das Beste aus deinem Training
            mit Zielen, welche nicht nur dein sportliches Können herausfordern,
            sondern dir auch deine Schwächen aufzeigen und biete dir somit die
            optimale Grundlage um an deinen Leistungen zu wachsen.
            <br />
            Auf unserer Plattform kannst du Wettkämpfe finden, die zu deinen
            Vorstellungen passen, und dich optimal auf diese vorbereiten.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Unsere Vision</h2>
          <p className="text-gray-700 text-lg leading-loose">
            Unsere Vision für <span className="text-teal-400">MyComps</span> ist
            es, eine blühende Gemeinschaft von Sportlern zu schaffen, die sich
            gegenseitig motivieren und unterstützen. Wir möchten, dass du dich
            von dieser Gemeinschaft inspirieren lässt und dass deine
            Fitnessziele nicht nur erreichbar, sondern auch unterhaltsam werden.
            Bei <span className="text-teal-400">MyComps</span> geht es darum,
            Spaß am Sport zu haben und gleichzeitig das Beste aus dir
            herauszuholen.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Unsere Werte</h2>
          <ul className="list-disc pl-6 text-gray-700 text-lg leading-loose">
            <li>
              <strong>Leidenschaft:</strong> Wir sind genauso leidenschaftlich
              für Sport und Fitness wie du. Unsere Plattform spiegelt unsere
              Hingabe wider, um dir bei deinen sportlichen Zielen zu helfen.
            </li>
            <li>
              <strong>Innovation:</strong> Wir sind stets auf der Suche nach
              neuen Wegen, um deine Erfahrung zu verbessern. Innovation steht im
              Mittelpunkt unserer Bemühungen, damit du ständig neue
              Möglichkeiten entdecken kannst.
            </li>
            <li>
              <strong>Gemeinschaft:</strong> Bei{" "}
              <span className="text-teal-400">MyComps</span> geht es nicht nur
              um individuelle Erfolge, sondern auch um die Unterstützung und den
              Austausch in einer großartigen Gemeinschaft von Gleichgesinnten.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
