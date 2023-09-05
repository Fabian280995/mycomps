/* export function getDateRangeForWeeks(offset: number) {
  const currentDate = new Date();
  const startOfWeek = new Date(currentDate);
  const endOfWeek = new Date(currentDate);

  // Endzeitpunkt auf das aktuelle Datum und Uhrzeit setzen
  endOfWeek.setHours(23, 59, 59, 999);

  // Startzeitpunkt auf den Beginn der aktuellen Woche setzen
  startOfWeek.setDate(startOfWeek.getDate() - (startOfWeek.getDay() || 7));
  startOfWeek.setHours(0, 0, 0, 0);

  // Berechnen Sie den Versatz für Wochen
  const weekOffset = 7 * offset;

  // Versetzten Sie den Start- und Endzeitpunkt um die gewünschte Anzahl von Wochen
  startOfWeek.setDate(startOfWeek.getDate() - weekOffset);
  endOfWeek.setDate(endOfWeek.getDate() - weekOffset);

  return {
    start: startOfWeek,
    end: endOfWeek,
  };
} */

/* export function getWeekDates(offset: number) {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const startOfWeek = new Date(currentDate);
  const endOfWeek = new Date(currentDate);

  // Den Startzeitpunkt auf den Montag der aktuellen Woche setzen
  startOfWeek.setDate(
    currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1)
  );

  // Den Endzeitpunkt auf den Sonntag der aktuellen Woche setzen
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  // Uhrzeiten auf Mitternacht setzen
  startOfWeek.setHours(0, 0, 0, 0);
  endOfWeek.setHours(23, 59, 59, 999);

  // Offset hinzufügen oder subtrahieren, um Wochen in der Vergangenheit oder Zukunft zu erhalten
  startOfWeek.setDate(startOfWeek.getDate() + 7 * offset);
  endOfWeek.setDate(endOfWeek.getDate() + 7 * offset);

  return {
    start: startOfWeek,
    end: endOfWeek,
  };
} */

interface LocalDateOptions {
  weekday?: "long" | "short" | "narrow";
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
}

export function getWeekDates(offset: number) {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const startOfWeek = new Date(currentDate);
  const endOfWeek = new Date(currentDate);

  // Den Startzeitpunkt auf den Montag der aktuellen Woche setzen
  startOfWeek.setDate(
    currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1)
  );
  startOfWeek.setHours(0, 0, 0, 0);

  // Den Endzeitpunkt auf den Sonntag der aktuellen Woche setzen
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  // Offset hinzufügen oder subtrahieren, um Wochen in der Vergangenheit oder Zukunft zu erhalten
  startOfWeek.setDate(startOfWeek.getDate() + 7 * offset);
  endOfWeek.setDate(endOfWeek.getDate() + 7 * offset);

  /* // Datumsformat auf Deutsch ändern
  const options: LocalDateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const startDateString = startOfWeek.toLocaleDateString("de-DE", options);
  const endDateString = endOfWeek.toLocaleDateString("de-DE", options);
 */
  return {
    start: startOfWeek,
    end: endOfWeek,
  };
}

export function getDateRange(rangeInDays: number) {
  const currentDate = new Date();
  const startDate = new Date(currentDate);
  const endDate = new Date(currentDate);

  // Setze das Startdatum auf 00:00 Uhr heute
  startDate.setHours(0, 0, 0, 0);

  // Setze das Enddatum basierend auf der angegebenen Range in Tagen
  endDate.setDate(currentDate.getDate() + rangeInDays);
  endDate.setHours(23, 59, 59, 999);

  return {
    start: startDate,
    end: endDate,
  };
}
