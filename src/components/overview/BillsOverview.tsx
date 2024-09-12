import OverviewSection from "./OverviewSection";

type Props = {};

const BillsOverview = ({}: Props) => {
  return (
    <OverviewSection
      title="Recurring Bills"
      link="/bills"
      linkText="See Details"
    >
      <div></div>
    </OverviewSection>
  );
};

export default BillsOverview;
