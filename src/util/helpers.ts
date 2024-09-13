import { DateTime } from "luxon";

type ISODateString = string;
export const formatDateString = (date: ISODateString) => {
  return DateTime.fromISO(date).toFormat("dd LLL yyyy");
};
