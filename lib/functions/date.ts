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

export function getStartAndEndDateForMonth(
  year: number,
  month: number
): { startDate: Date; endDate: Date } {
  // Überprüfe, ob der Monat im gültigen Bereich (1-12) liegt
  if (month < 1 || month > 12) {
    throw new Error(
      "Ungültiger Monat. Der Monat sollte zwischen 1 und 12 liegen."
    );
  }

  // Erstelle das Startdatum am ersten Tag des Monats um Mitternacht (00:00:00)
  const startDate = new Date(year, month - 1, 1, 0, 0, 0);

  // Berechne das Enddatum, indem du zum ersten Tag des nächsten Monats subtrahierst und 1 Millisekunde abziehst
  const nextMonth = new Date(year, month, 1, 0, 0, -1);
  const endDate = nextMonth;

  return { startDate, endDate };
}
