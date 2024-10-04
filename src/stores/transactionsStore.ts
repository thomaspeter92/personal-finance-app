import { create } from "zustand";
import { persist } from "zustand/middleware"; // Optional for persistence

type Categorgy =
  | "Entertainment"
  | "Bills"
  | "Dining Out"
  | "General"
  | "Groceries"
  | "Transportation"
  | "Lifestyle"
  | "Education"
  | "Personal Care"
  | "Shopping";

export type Transaction = {
  avatar: string;
  name: string;
  category: Categorgy;
  date: string;
  amount: number;
  recurring: boolean;
};

type TransactionsState = {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  sortTransactions: (
    sortBy: "latest" | "oldest" | "highest" | "lowest"
  ) => void;
  transactionCategories: Categorgy[];
  setTransactionCategories: (categories: Categorgy[]) => void;
};

const fetchTransactions = async () => {
  return fetch("/data.json")
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const useTransactionsStore = create<TransactionsState>()(
  persist(
    (set, get) => ({
      transactions: [],
      transactionCategories: [],
      setTransactions: (transactions) => set({ transactions }),
      setTransactionCategories: (categories) =>
        set({ transactionCategories: categories }),
      sortTransactions: (sortBy) => {
        const sortedTransactions = [...get().transactions].sort((a, b) => {
          switch (sortBy) {
            case "latest":
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            case "oldest":
              return new Date(a.date).getTime() - new Date(b.date).getTime();
            case "highest":
              return b.amount - a.amount;
            case "lowest":
              return a.amount - b.amount;
            default:
              return 0;
          }
        });
        set({ transactions: sortedTransactions });
      },
    }),
    {
      name: "transactions-storage", // name in local storage
      onRehydrateStorage: () => (state) => {
        if (!state?.transactions || state.transactions.length === 0) {
          (async () => {
            let data = await fetchTransactions();
            state?.setTransactions(data.transactions as Transaction[]);
            const categories: Categorgy[] = [
              ...new Set<Categorgy>(
                data.transactions.map((item: Transaction) => item.category)
              ),
            ];
            state?.setTransactionCategories(categories);
          })();
        }
      },
    }
  )
);

export default useTransactionsStore;
