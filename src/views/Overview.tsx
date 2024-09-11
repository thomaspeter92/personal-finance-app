import React from "react";
import OverviewSection from "../components/OverviewSection";

type Props = {};

const Overview = (props: Props) => {
  return (
    <div>
      <OverviewSection title="Pots" link="/pots" linkText="See Details">
        <div></div>
      </OverviewSection>
    </div>
  );
};

export default Overview;
