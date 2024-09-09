import { images } from "./images";

export const menu: {
  [key: string]: {
    label: string;
    href: string;
    icon: string;
  };
} = {
  overview: {
    label: "Overview",
    href: "/",
    icon: images.homeIcon,
  },
  transactions: {
    label: "Transactions",
    href: "/transactions",
    icon: images.transactionsIcon,
  },
  budgets: {
    label: "Budgets",
    href: "/budgets",
    icon: images.budgetsIcon,
  },
  pots: {
    label: "Pots",
    href: "/pots",
    icon: images.potsIcon,
  },
  bills: {
    label: "Recurring Bills",
    href: "/bills",
    icon: images.billsIcon,
  },
};
