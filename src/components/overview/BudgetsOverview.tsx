import useBudgetsStore from "../../stores/budgetsStore";
import OverviewSection from "./OverviewSection";
import { PieChart, Pie, Cell } from "recharts";

type Props = {};

const BudgetsOverview = ({}: Props) => {
  const { budgets, totalSpent, totalBudget } = useBudgetsStore();

  return (
    <OverviewSection title="Budgets" link="/budgets" linkText="See Details">
      <div className="flex flex-wrap gap-5 items-center justify-center">
        <div className="relative flex-1 flex items-center justify-center">
          <PieChart width={300} height={300}>
            <Pie
              innerRadius={90}
              outerRadius={140}
              dataKey="value"
              fill="#8884d8"
              data={budgets.map((d) => ({
                name: d.category,
                value: d.maximum,
              }))}
            >
              {budgets.map((d, index) => (
                <Cell key={`cell-${index}`} fill={d.theme} />
              ))}
            </Pie>
          </PieChart>
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center">
            <p className="font-bold text-2xl mb-2">${Math.round(totalSpent)}</p>
            <p className="text-gray-500">of ${Math.round(totalBudget)} limit</p>
          </div>
        </div>
        <div className="gap-5 w-fit space-y-5  flex-1 whitespace-nowrap shrink-0">
          {budgets.map((d) => (
            <div
              key={d.category}
              style={{ borderColor: d.theme }}
              className="border-l-4 rounded px-3 w-fit"
            >
              <p className="capitalize text-gray-500 text-sm mb-2">
                {d.category}
              </p>
              <p className="font-bold text-lg">${d.maximum}</p>
            </div>
          ))}
        </div>
      </div>
    </OverviewSection>
  );
};

export default BudgetsOverview;
