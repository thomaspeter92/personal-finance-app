import OverviewSection from "./OverviewSection";

type Props = {};

function TransactionsOverview({}: Props) {
  return (
    <OverviewSection
      title="Transactions"
      link="/transactions"
      linkText="See Details"
    >
      <div></div>
    </OverviewSection>
  );
}

export default TransactionsOverview;
