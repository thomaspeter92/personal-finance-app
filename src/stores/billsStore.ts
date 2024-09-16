import { DateTime } from "luxon";
import { create } from "zustand";
import { persist } from "zustand/middleware"; // Optional for persistence

export type Bills = {
  name: string;
  day: number;
  avatar: string;
  amount: number;
}[];

type BillsState = {
  bills: Bills;
  setBills: (bills: Bills) => void;
  // updateBill: (id: number, updatedBill: Partial<Bill>) => void;
};

const fetchBills = async () => {
  return fetch("/data.json")
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const useBillsStore = create<BillsState>()(
  persist(
    (set) => ({
      bills: [],
      setBills: (bills: Bills) => set({ bills }),
      // updateBill: (id: number, updatedBill: Partial<Bill>) =>
      //   set((state) => ({
      //     // Find the pot with matching ID and update it, otherwise skip
      //     bills: state.bills.map((pot) =>
      //       pot.id === id ? { ...pot, ...updatedPot } : pot
      //     ),
      //   })),
    }),
    {
      name: "bills-storage", // name in local storage
      onRehydrateStorage: () => (state) => {
        if (state && state?.bills?.length < 1) {
          (async () => {
            let data = await fetchBills();
            // regular bills occur in the transactions array. Filter them out
            const billsKeys = new Set();
            const bills: Bills = [];
            data.transactions.forEach((d: any) => {
              if (!billsKeys.has(d.name) && d.recurring) {
                console.log(billsKeys);
                billsKeys.add(d.name);
                bills.push({
                  name: d.name,
                  day: DateTime.fromISO(d.date).day,
                  avatar: d.avatar,
                  amount: d.amount,
                });
              }
            });
            console.log(DateTime.now().day);
            state?.setBills(bills);
          })();
        }
      },
    }
  )
);

export default useBillsStore;
