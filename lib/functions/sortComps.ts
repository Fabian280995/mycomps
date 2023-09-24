import { Competition } from "@/types";

const MONTHS = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];
export const sortCompsByMonth = (comps: Competition[]) => {
  let compsByMonth: { [key: string]: Competition[] } = {};

  // get years from comps
  const years = comps
    .map((comp) => new Date(comp.startDate).getFullYear())
    .filter((year, index, self) => self.indexOf(year) === index);

  // sort the comps by year and month

  years.forEach((year) => {
    MONTHS.forEach((month) => {
      const monthComps = comps.filter(
        (comp) =>
          new Date(comp.startDate).toLocaleString("de-DE", {
            month: "long",
          }) === month && new Date(comp.startDate).getFullYear() === year
      );
      if (monthComps.length > 0) {
        compsByMonth = {
          ...compsByMonth,
          [`${month} ${year}`]: monthComps,
        };
      }
    });
  });

  return compsByMonth;
};
