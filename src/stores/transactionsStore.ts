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

type Transaction = {
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
};

const fetchTransactions = async () => {
  return fetch("/data.json")
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const useTransactionsStore = create<TransactionsState>()(
  persist(
    (set) => ({
      transactions: [],
      setTransactions: (transactions) => set({ transactions }),
      //   updateTransaction: (
      //     id: number,
      //     updatedTransaction: Partial<Transaction>
      //   ) =>
      //     set((state) => ({
      //       // Find the transaction with matching ID and update it, otherwise skip
      //       transactions: state.transactions.map((transaction) =>
      //         transaction === id
      //           ? { ...transaction, ...updatedTransaction }
      //           : transaction
      //       ),
      //     })),
    }),
    {
      name: "transactions-storage", // name in local storage
      onRehydrateStorage: () => (state) => {
        if (!state?.transactions || state.transactions.length === 0) {
          (async () => {
            let data = await fetchTransactions();
            state?.setTransactions(data.transactions as Transaction[]);
          })();
        }
      },
    }
  )
);

export default useTransactionsStore;
