import useBillsStore from "../../stores/billsStore";
import {
  getDueSoonBills,
  getTotalBillsPaid,
  getUpcomingBills,
} from "../../util/helpers";
import OverviewSection from "./OverviewSection";

type Props = {};

const BillsOverview = ({}: Props) => {
  const { bills } = useBillsStore();
  const upcoming = getUpcomingBills(bills);
  const paidBills = getTotalBillsPaid(bills);
  const dueSoon = getDueSoonBills(bills);

  return (
    <OverviewSection
      title="Recurring Bills"
      link="/bills"
      linkText="See Details"
    >
      <div className="space-y-5">
        <p className="bg-beige-100 border-l-4 border-green rounded-lg p-5 py-6 text-gray-500 flex justify-between">
          Paid Bills
          <span className="font-bold text-gray-900">${paidBills}</span>
        </p>
        <p className="bg-beige-100 border-l-4 border-yellow rounded-lg p-5 py-6 text-gray-500 flex justify-between">
          Total Upcomong
          <span className="font-bold text-gray-900"> ${upcoming}</span>
        </p>
        <p className="bg-beige-100 border-l-4 border-cyan rounded-lg p-5 py-6 text-gray-500 flex justify-between">
          Due Soon
          <span className="font-bold text-gray-900">${dueSoon}</span>
        </p>
      </div>
    </OverviewSection>
  );
};

export default BillsOverview;
