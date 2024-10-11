import { useState, useEffect } from "react";
import useTransactionsStore from "../stores/transactionsStore";
import { formatDateString } from "../util/helpers";
import Button from "../components/ui/Button";
// import Input from "../components/ui/Input";

// TODO: ADD SORTING AND FILTERING FUNCTIONS

const Transactions = () => {
  const { transactions } = useTransactionsStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [slicedTransactions, setSlicedTransactions] = useState(
    transactions.slice(0, 7)
  );

  const handleNextPageChange = () => {
    if (currentPage < Math.ceil(transactions.length / 7)) {
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
    const sliced = transactions.slice((currentPage - 1) * 7, currentPage * 7);
    setSlicedTransactions(sliced);
  }, [currentPage]);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Transactions</h1>
      <div className="bg-white rounded-xl p-8">
        {/* <div className="flex items-center mb-8 justify-end"> */}
        {/* <div className="flex items-center gap-3">
            <label htmlFor="sortSelect" className="text-gray-500">
              Sort by:{" "}
            </label>
            <Select
              id="sortSelect"
              onChange={() => null}
              defaultValue="latest"
              options={[
                { value: "latest", label: "Latest" },
                { value: "oldest", label: "Oldest" },
                { value: "highest", label: "Highest" },
                { value: "lowest", label: "Lowest" },
                { value: "a-z", label: "A to Z" },
                { value: "z-a", label: "Z - A" },
              ]}
            />
          </div>
        </div> */}
        <table className=" w-full">
          <thead className="hidden lg:table-header-group">
            <tr className="[&>td]:pb-5 border-b border-gray-100 text-sm text-gray-500">
              <td>Recipient/Sender</td>
              <td>Category</td>
              <td>Transaction Date</td>
              <td>Amount</td>
            </tr>
          </thead>
          <tbody>
            {slicedTransactions.map((t, i) => (
              <tr
                key={t.date + i}
                className="[&>td]:py-5 [&:not(:last-child)]:border-b text-sm"
              >
                <td className="flex gap-5 items-center font-bold text-gray-900">
                  <img src={t.avatar} className="w-10 h-10 rounded-full" />
                  <p>
                    {t.name}
                    <span className="text-sm text-gray-500 font-normal block lg:hidden">
                      {t.category}
                    </span>
                  </p>
                </td>
                <td className="text-gray-500 text-sm hidden lg:table-cell">
                  {t.category}
                </td>
                <td className="text-gray-500 text-sm hidden lg:table-cell">
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
                  <span className="block text-sm text-gray-500 font-normal lg:hidden">
                    {formatDateString(t.date)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-5">
          <Button
            onClick={handlePrevPageChange}
            iconLeft="caretLeft"
            intent="black-outlined"
          >
            Prev
          </Button>
          <div className="gap-2 hidden lg:flex">
            {[...Array(Math.ceil(transactions.length / 7)).keys()].map((d) => (
              <Button
                onClick={() => setCurrentPage(d + 1)}
                intent={currentPage === d + 1 ? "black" : "black-outlined"}
              >
                {d + 1}
              </Button>
            ))}
          </div>
          <Button
            onClick={handleNextPageChange}
            iconRight="caretRight"
            intent="black-outlined"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
