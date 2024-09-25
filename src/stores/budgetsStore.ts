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
  try {
    const data = await fetch("/data.json").then((res) => res.json());

    const updatedBudgets = calculateCurrentSpend(
      data.budgets as Budget[],
      data.transactions as Transaction[]
    );

    return { ...data, budgets: updatedBudgets };
  } catch (err) {
    console.log(err);
    return null;
  }
};

const calculateCurrentSpend = (
  budgets: Budget[],
  transactions: Transaction[]
): Budget[] => {
  const budgetObj: { [key: string]: number } = {};

  // Initialize currentSpend to 0 for each budget
  budgets.forEach((b) => {
    budgetObj[b.category] = 0;
  });

  // Calculate the current spend for each category
  transactions.forEach((t) => {
    if (t.category in budgetObj) {
      budgetObj[t.category] += Math.abs(t.amount);
    }
  });

  // Update each budget with the calculated currentSpend
  return budgets.map((budget) => ({
    ...budget,
    currentSpend: budgetObj[budget.category] || 0,
  }));
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
              data.budgets.reduce(
                (acc: any, budget: any) => acc + budget.currentSpend,
                0
              )
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
