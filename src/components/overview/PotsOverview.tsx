import usePotsStore from "../../stores/potsStore";
import OverviewSection from "./OverviewSection";

type Props = {};

const PotsOverview = ({}: Props) => {
  const { pots } = usePotsStore();

  return (
    <OverviewSection title="Pots" link="/pots" linkText="See Details">
      <div></div>
    </OverviewSection>
  );
};

export default PotsOverview;
