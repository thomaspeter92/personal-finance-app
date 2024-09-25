import useTransactionsStore from "../../stores/transactionsStore";
import { formatDateString } from "../../util/helpers";
import OverviewSection from "./OverviewSection";

type Props = {};

function TransactionsOverview({}: Props) {
  const { transactions } = useTransactionsStore();

  return (
    <OverviewSection
      title="Transactions"
      link="/transactions"
      linkText="See Details"
    >
      <div className="divide-y divide-gray-100">
        {/* Show 5 latest transactions */}
        {transactions.slice(0, 5).map((t) => (
          <div key={t.date} className="flex items-center justify-between py-5 ">
            <div className="flex items-center gap-3">
              <img className="w-10 h-10 rounded-full" src={t.avatar} alt="" />
              <p className="font-bold text-sm">{t.name}</p>
            </div>
            <div className="text-right">
              <p
                className={`font-bold ${
                  t.amount > 0 ? "text-green" : "text-gray-900"
                }`}
              >
                {t.amount > 0
                  ? `$${Math.abs(t.amount).toFixed(2)}`
                  : `-$${Math.abs(t.amount).toFixed(2)}`}
              </p>
              <p className="text-beige-500 text-xs">
                {formatDateString(t.date)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </OverviewSection>
  );
}

export default TransactionsOverview;
