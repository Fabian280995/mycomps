import React from "react";
import NavigationButton from "../ui/nav-btn";
import InfoContainer from "../design/info-container";

const CompsOverview = async () => {
  return (
    <section className="w-full space-y-24">
      <div className="padding-x">
        <InfoContainer
          title="
          Bist du bereit für deinen nächsten Wettkampf?"
        >
          <p className="text-gray-600 font-semibold text-2xl">
            Starte jetzt mit unserem Wettkampfplaner und hebe ab zu neuen
            Höchstleistungen!
          </p>
          <NavigationButton
            href="/competitions"
            title="Jetzt zum Wettkampfplaner!"
          />
          <p className="text-gray-400 font-semibold">
            mycomps.de - dein Schlüssel zu noch mehr Erfolg!
          </p>
        </InfoContainer>
      </div>
    </section>
  );
};

export default CompsOverview;
