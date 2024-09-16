import { useState, useEffect } from "react";
import useTransactionsStore from "../stores/transactionsStore";
import { formatDateString } from "../util/helpers";
import Button from "../components/ui/Button";

const Transactions = () => {
  const { transactions } = useTransactionsStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [slicedTransactions, setSlicedTransactions] = useState(
    transactions.slice(0, 10)
  );

  const handleNextPageChange = () => {
    if (currentPage < Math.ceil(transactions.length / 10)) {
      setCurrentPage((page) => page + 1);
    }
  };

  const handlePrevPageChange = () => {
    if (currentPage > 1) {
      setCurrentPage((page) => page - 1);
    }
  };

  useEffect(() => {
    // const totalPages = Math.ceil(transactions.length / 10);
    const sliced = transactions.slice((currentPage - 1) * 10, currentPage * 10);
    setSlicedTransactions(sliced);
  }, [currentPage]);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Transactions</h1>
      <div className="bg-white rounded-xl p-8">
        <table className=" w-full">
          <thead>
            <tr className="[&>td]:pb-5 border-b border-gray-100 text-sm text-gray-500">
              <td>Recipiet/Sender</td>
              <td>Category</td>
              <td>Transaction Date</td>
              <td>Amount</td>
            </tr>
          </thead>
          <tbody>
            {slicedTransactions.map((t, i) => (
              <tr
                key={t.date}
                className="[&>td]:py-5 [&:not(:last-child)]:border-b"
              >
                <td className="flex gap-5 items-center font-bold text-gray-900">
                  <img src={t.avatar} className="w-10 h-10 rounded-full" />
                  {t.name}
                </td>
                <td className="text-gray-500 text-sm">{t.category}</td>
                <td className="text-gray-500 text-sm">
                  {formatDateString(t.date)}
                </td>
                <td
                  className={`font-bold ${
                    t.amount > 0 ? "text-green" : "text-gray-900"
                  }`}
                >
                  {t.amount > 0
                    ? `+$${t.amount.toFixed(2)}`
                    : `-$${Math.abs(t.amount).toFixed(2)}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between">
          <Button intent="black-outlined">Prev</Button>
          <div></div>
          <Button intent="black-outlined">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
