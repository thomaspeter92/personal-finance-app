import { DateTime } from "luxon";
import { Bills } from "../stores/billsStore";

type ISODateString = string;
export const formatDateString = (date: ISODateString) => {
  return DateTime.fromISO(date).toFormat("dd LLL yyyy");
};

export const getUpcomingBills = (bills: Bills): number => {
  const currentDay = DateTime.now().day;
  const total = bills.reduce(
    (acc, curr) => (curr.day > currentDay ? (acc += curr.amount) : acc),
    0
  );
  return Number(Math.abs(total).toFixed(2));
};

export const getTotalBillsPaid = (bills: Bills): number => {
  const currentDay = DateTime.now().day;
  const total = bills.reduce(
    (acc, curr) => (curr.day <= currentDay ? (acc += curr.amount) : acc),
    0
  );
  return Number(Math.abs(total).toFixed(2));
};

// Returns bills due in the coming 5 days
export const getDueSoonBills = (bills: Bills): number => {
  const now = DateTime.now();
  const currentDay = now.day;
  const currentMonthDays = now.daysInMonth; // Get total days in the current month

  const total = bills.reduce((acc, curr) => {
    const isDueThisMonth = curr.day > currentDay && curr.day <= currentDay + 5;

    const isDueNextMonth =
      curr.day <= currentDay + 5 - currentMonthDays &&
      currentDay + 5 > currentMonthDays;

    // Add the bill amount if it's due either in the current or next month
    if (isDueThisMonth || isDueNextMonth) {
      acc += curr.amount;
    }

    return acc;
  }, 0);

  return Math.abs(Number(total.toFixed(2)));
};
export function getOrdinal(n: number) {
  let s = ["th", "st", "nd", "rd"];
  let v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
