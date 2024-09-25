import useBudgetsStore from "../../stores/budgetsStore";
import BudgetChart from "../ui/BudgetChart";
import OverviewSection from "./OverviewSection";

type Props = {};

const BudgetsOverview = ({}: Props) => {
  const { budgets } = useBudgetsStore();

  return (
    <OverviewSection title="Budgets" link="/budgets" linkText="See Details">
      <div className="flex flex-wrap gap-5 items-center justify-center">
        <BudgetChart />
        <div className="gap-5 w-fit space-y-5  flex-1 whitespace-nowrap shrink-0">
          {budgets.map((d) => (
            <div
              key={d.category}
              style={{ borderColor: d.theme }}
              className="border-l-4 rounded px-3 w-fit"
            >
              <p className="capitalize text-gray-500 text-xs mb-2">
                {d.category}
              </p>
              <p className="font-bold ">${d.maximum}</p>
            </div>
          ))}
        </div>
      </div>
    </OverviewSection>
  );
};

export default BudgetsOverview;
