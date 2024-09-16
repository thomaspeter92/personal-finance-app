import { create } from "zustand";
import { persist } from "zustand/middleware"; // Optional for persistence
import { Transaction } from "./transactionsStore";

type Budget = {
  category: string;
  maximum: number;
  theme: string;
  currentSpend: number;
};

type BudgetsState = {
  budgets: Budget[];
  totalSpent: number;
  totalBudget: number;
  setBudgets: (budgets: Budget[]) => void;
  setTotalSpent: (amount: number) => void;
  setTotalBudget: (amount: number) => void;
};

const fetchBudgets = async () => {
  return fetch("/data.json")
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const calculateCurrentSpend = (
  budgets: Budget[],
  transactions: Transaction[]
) => {
  const budgetObj: any = {};
  budgets.forEach((b) => {
    budgetObj[b.category] = 0;
  });
  const totalSpent = transactions.reduce(
    (acc, curr) => (curr.category in budgetObj ? (acc += curr.amount) : acc),
    0
  );
  transactions.forEach((t) => {
    if (t.category in budgetObj) {
      budgetObj[t.category] += t.amount;
    }
  });
  return Math.abs(totalSpent);
};

const useBudgetsStore = create<BudgetsState>()(
  persist(
    (set) => ({
      budgets: [],
      totalSpent: 0,
      totalBudget: 0,
      setBudgets: (budgets) => set({ budgets }),
      setTotalSpent: (amount) => set({ totalSpent: amount }),
      setTotalBudget: (amount) => set({ totalBudget: amount }),
    }),
    {
      name: "budgets-storage", // name in local storage
      onRehydrateStorage: () => (state) => {
        if (!state?.budgets || state.budgets.length === 0) {
          (async () => {
            let data = await fetchBudgets();

            state?.setBudgets(data.budgets as Budget[]);
            state?.setTotalSpent(
              calculateCurrentSpend(data.budgets, data.transactions)
            );
            state?.setTotalBudget(
              data.budgets.reduce(
                (acc: number, curr: Budget) => (acc += curr.maximum),
                0
              )
            );
          })();
        }
      },
    }
  )
);

export default useBudgetsStore;
