import { PieChart, Pie, Cell } from "recharts";
import useBudgetsStore from "../../stores/budgetsStore";

const BudgetChart = () => {
  const { budgets, totalBudget, totalSpent } = useBudgetsStore();

  return (
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
  );
};

export default BudgetChart;
