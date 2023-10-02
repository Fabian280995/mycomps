import React from "react";

const EnrollmentLink = ({ enrollmentLink }: { enrollmentLink?: string }) => {
  return enrollmentLink ? (
    <a
      href={enrollmentLink}
      className="bg-teal-400 rounded-md hover:bg-teal-500 transition-all duration-150 px-4 py-2 text-center"
    >
      <p className="text-white font-semibold text-xs">direkt einschreiben!</p>
    </a>
  ) : (
    <div className="bg-gray-50 rounded-md px-4 py-2 text-center">
      <p className="text-gray-400 font-semibold text-xs">
        kein Link zur Einschreibung verfügbar
      </p>
    </div>
  );
};

export default EnrollmentLink;
