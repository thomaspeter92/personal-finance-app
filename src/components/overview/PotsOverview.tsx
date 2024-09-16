import usePotsStore from "../../stores/potsStore";
import { Icons } from "../ui/Icons";
import OverviewSection from "./OverviewSection";

type Props = {};

const PotsOverview = ({}: Props) => {
  const { pots } = usePotsStore();
  console.log(pots);
  const Icon = Icons["potsOutlined"];

  const totalSaved = pots.reduce((acc, curr) => curr.total + acc, 0);

  return (
    <OverviewSection title="Pots" link="/pots" linkText="See Details">
      <div className="flex flex-wrap gap-5 whitespace-nowrap">
        <div className="flex flex-1 items-center bg-beige-100 rounded-lg p-5 gap-5">
          <Icon className="fill-green" />
          <div>
            <p className="text-sm text-gray-500 mb-2">Total Saved</p>
            <p className="font-bold text-2xl">${totalSaved}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 ">
          {pots.slice(0, 4).map((pot, i) => {
            let color = pot.theme;
            return (
              <div
                key={pot.name + i}
                style={{ borderColor: pot.theme }}
                className={`border-l-4 pl-4 rounded-l`}
              >
                <p className="text-sm text-gray-500 mb-2">{pot.name}</p>
                <p className="font-bold text-xl">${pot.total}</p>
              </div>
            );
          })}
        </div>
      </div>
    </OverviewSection>
  );
};

export default PotsOverview;
