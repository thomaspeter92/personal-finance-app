import { Icons } from "../components/ui/Icons";

export const menu: {
  [key: string]: {
    label: string;
    href: string;
    icon: keyof typeof Icons;
  };
} = {
  overview: {
    label: "Overview",
    href: "/",
    icon: "home",
  },
  transactions: {
    label: "Transactions",
    href: "/transactions",
    icon: "transactions",
  },
  budgets: {
    label: "Budgets",
    href: "/budgets",
    icon: "budgets",
  },
  pots: {
    label: "Pots",
    href: "/pots",
    icon: "pots",
  },
  bills: {
    label: "Recurring Bills",
    href: "/bills",
    icon: "bills",
  },
};
