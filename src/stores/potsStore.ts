import { create } from "zustand";
import { persist } from "zustand/middleware"; // Optional for persistence

type Pot = {
  name: string;
  target: number;
  theme: string;
  total: number;
};

type PotsState = {
  pots: Pot[];
  setPots: (pots: Pot[]) => void;
  // updatePot: (id: number, updatedPot: Partial<Pot>) => void;
};

const fetchPots = async () => {
  return fetch("/data.json")
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const usePotsStore = create<PotsState>()(
  persist(
    (set) => ({
      pots: [],
      setPots: (pots) => set({ pots }),
      // updatePot: (id: number, updatedPot: Partial<Pot>) =>
      //   set((state) => ({
      //     // Find the pot with matching ID and update it, otherwise skip
      //     pots: state.pots.map((pot) =>
      //       pot.id === id ? { ...pot, ...updatedPot } : pot
      //     ),
      //   })),
    }),
    {
      name: "pots-storage", // name in local storage
      onRehydrateStorage: () => (state) => {
        if (!state?.pots || state.pots.length === 0) {
          (async () => {
            let data = await fetchPots();
            state?.setPots(data.pots as Pot[]);
          })();
        }
      },
    }
  )
);

export default usePotsStore;
