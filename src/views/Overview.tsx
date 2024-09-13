import BillsOverview from "../components/overview/BillsOverview";
import BudgetsOverview from "../components/overview/BudgetsOverview";
import Card from "../components/overview/Card";
import PotsOverview from "../components/overview/PotsOverview";
import TransactionsOverview from "../components/overview/TransactionsOverview";
import usePotsStore from "../stores/potsStore";

type Props = {};

const Overview = ({}: Props) => {
  return (
    <div className="space-y-10 my-3">
      <h1 className="text-2xl font-bold">Overview</h1>
      <div className="grid grid-cols-3 gap-5">
        <Card title="Current Balance" value="$5,500" />
        <Card title="Income" value="$4000" />
        <Card title="expenses" value="$1200" />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <PotsOverview />
        <BudgetsOverview />
        <TransactionsOverview />
        <BillsOverview />
      </div>
    </div>
  );
};

export default Overview;
