import BillsOverview from "../components/overview/BillsOverview";
import BudgetsOverview from "../components/overview/BudgetsOverview";
import Card from "../components/overview/Card";
import PotsOverview from "../components/overview/PotsOverview";
import TransactionsOverview from "../components/overview/TransactionsOverview";

type Props = {};

const Overview = ({}: Props) => {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">Overview</h1>
      <div className="grid sm:grid-cols-3 gap-5">
        <Card title="Current Balance" value="$5,500" />
        <Card title="Income" value="$4,000" />
        <Card title="expenses" value="$1,200" />
      </div>
      <div className="flex flex-col lg:flex-row gap-5 [&>*]:flex-1">
        <div className="space-y-5">
          <PotsOverview />
          <TransactionsOverview />
        </div>
        <div className="space-y-5">
          <BudgetsOverview />
          <BillsOverview />
        </div>
      </div>
    </div>
  );
};

export default Overview;
