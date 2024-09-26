import React from "react";
import usePotsStore from "../stores/potsStore";
import Button from "../components/ui/Button";

type Props = {};

const Pots = (props: Props) => {
  const { pots } = usePotsStore();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Budgets</h1>
      <div className="grid sm:grid-cols-2 gap-5">
        {pots.map((d, i) => {
          const percentage = (d.total / d.target) * 100;
          return (
            <div className="p-5 bg-white rounded-lg space-y-4">
              <h2 className="font-bold flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ background: d.theme }}
                />
                {d.name}
              </h2>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">Total Saved</p>
                <p className="font-bold text-lg">${d.total}</p>
              </div>
              <div className="h-3 p-[2px] w-full bg-beige-100 rounded-full">
                <div
                  className="h-full rounded-full"
                  style={{ background: d.theme, width: percentage + "%" }}
                ></div>
              </div>
              <div className="flex text-xs text-gray-500 justify-between">
                <p className="  font-bold">{percentage.toFixed(0)}%</p>
                <p>Target of ${d.target}</p>
              </div>
              <div className="flex [&>*]:flex-1 gap-5">
                <Button intent="beige">Add Money</Button>
                <Button intent="beige">Withdraw</Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pots;
