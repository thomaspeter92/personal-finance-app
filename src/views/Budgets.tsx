import React from "react";
import useBudgetsStore from "../stores/budgetsStore";
import BudgetChart from "../components/ui/BudgetChart";
import useTransactionsStore, { Transaction } from "../stores/transactionsStore";
import { formatDateString } from "../util/helpers";
import { Icons } from "../components/ui/Icons";
import { Link } from "react-router-dom";

type Props = {};

const BudgetBox = ({
  theme,
  title,
  maximum,
  currentSpend,
  latestSpending,
}: {
  theme: string;
  title: string;
  maximum: number;
  currentSpend: number;
  latestSpending: Transaction[];
}) => {
  const CaretIcon = Icons["caretRight"];

  let percentage = (currentSpend / maximum) * 100;
  if (percentage > 100) percentage = 100;

  let remaining = maximum - currentSpend;
  if (remaining < 0) remaining = 0;
  return (
    <div className="rounded-lg bg-white p-5">
      <h2 className="flex items-center font-bold gap-3">
        <span className="w-4 h-4 rounded-full" style={{ background: theme }} />
        <span>{title}</span>
      </h2>
      <div className="my-3 text-xs text-gray-500 space-y-3">
        <p>Maxmimum of ${maximum}</p>
        <div className="h-7 w-full p-1 bg-beige-100 rounded overflow-hidden">
          <div
            className="h-full rounded"
            style={{ width: percentage + "%", background: theme }}
          ></div>
        </div>
        <div className="flex [&>div]:flex-1">
          <div
            className="space-y-1 border-l-4 pl-3 rounded"
            style={{ borderColor: theme }}
          >
            <p className="text-xs text-gray-500">Spent</p>
            <p className="font-bold text-black">${currentSpend}</p>
          </div>
          <div className="space-y-1 border-l-4 border-beige-100 pl-3 rounded">
            <p className="text-xs text-gray-500">Remaining</p>
            <p className="font-bold text-black">${remaining}</p>
          </div>
        </div>
      </div>
      <div className="bg-beige-100 p-3 pb-0 rounded-lg space-y-3">
        <p className="text-sm flex justify-between items-center mb-4">
          <span className="font-bold ">Latest Spending</span>
          <Link
            to={"/transactions"}
            className="text-gray-500 text-xs flex items-center gap-1"
          >
            See All <CaretIcon className="h-1.5 fill-gray-500" />
          </Link>
        </p>
        {latestSpending.slice(0, 3).map((d, i) => (
          <div className="flex gap-3 items-center text-xs [&:not(:last-child)]:border-b border-gray-300/25 pb-3">
            <img src={d.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
            <p className="font-bold flex-1">{d.name}</p>
            <p className="text-right text-[11px] font-bold">
              {d.amount > 0
                ? `+$${d.amount.toFixed(2)}`
                : `-$${Math.abs(d.amount).toFixed(2)}`}
              <span className="block text-gray-500 font-normal">
                {formatDateString(d.date)}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Budgets = ({}: Props) => {
  const { budgets } = useBudgetsStore();
  const { transactions } = useTransactionsStore();

  const latestSpending: Record<string, Transaction[]> = {};
  budgets.forEach((budget) => {
    latestSpending[budget.category] = [];
  });
  transactions.forEach((t) => {
    if (t.category in latestSpending) {
      latestSpending[t.category].push(t);
    }
  });

  console.log(latestSpending);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Budgets</h1>
      <div className="grid lg:grid-cols-2 gap-5 items-start">
        <div className="rounded-lg bg-white p-5 lg:sticky top-5 gap-5 flex flex-col sm:flex-row  lg:flex-col items-center">
          <BudgetChart />

          <div className="w-full flex-1">
            <h2 className="font-bold text-lg mb-5">Spending Summary</h2>
            <div className="space-y-3 text-sm">
              {budgets.map((b, i) => (
                <div
                  className={`flex gap-3 text-gray-500 pb-3 items-center [&:not(:last-child)]:border-b`}
                >
                  <span
                    className={`w-1 h-6 rounded-full `}
                    style={{ background: b.theme }}
                  />
                  <span className="flex-1">{b.category}</span>
                  <p>
                    <span
                      className={`font-bold text-gray-900 ${
                        b.currentSpend > b.maximum ? "text-red" : ""
                      }`}
                    >
                      ${b.currentSpend}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {" "}
                      of ${b.maximum}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-5">
          {budgets.map((b, i) => (
            <BudgetBox
              title={b.category}
              theme={b.theme}
              maximum={b.maximum}
              currentSpend={b.currentSpend}
              latestSpending={latestSpending[b.category]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Budgets;
