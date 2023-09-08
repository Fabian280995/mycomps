import { Competition, Sport } from "@/types";

export function getSportsFromCompetitions(competitions: Competition[]) {
  const sports: Sport[] = [];
  competitions.forEach((competition) => {
    if (!sports.find((sport) => sport.id === competition.sport.id)) {
      sports.push(competition.sport);
    }
  });
  return sports;
}

export function getMonthsFromComps(competitions: Competition[]) {
  const months: { name: string; number: number }[] = [];

  competitions.forEach((comp) => {
    const month = new Date(comp.startDate);
    const monthNumber = month.getMonth() + 1; // Monate sind 0-basiert
    const monthName = month.toLocaleString("default", {
      month: "long",
    }); // Monatsname ermitteln

    // Überprüfen, ob der Monat bereits im Array vorhanden ist
    const monthExists = months.find((m) => m.number === monthNumber);

    // Wenn der Monat nicht gefunden wurde, füge ihn zum Array hinzu
    if (!monthExists) {
      months.push({ name: monthName, number: monthNumber });
    }
  });

  return months;
}
