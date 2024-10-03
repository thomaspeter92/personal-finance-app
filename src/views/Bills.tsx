import React from "react";
import { Icons } from "../components/ui/Icons";
import useBillsStore from "../stores/billsStore";
import {
  getUpcomingBills,
  getDueSoonBills,
  getTotalBillsPaid,
  getOrdinal,
} from "../util/helpers";

type Props = {};

const Bills = (props: Props) => {
  const { bills } = useBillsStore();
  const upcoming = getUpcomingBills(bills);
  const dueSoon = getDueSoonBills(bills);
  const paid = getTotalBillsPaid(bills);

  const BillsIcon = Icons["bills"];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Recurring Bills</h1>
      <div className="grid xl:grid-cols-2 gap-5 items-start">
        <div className="gap-5 flex flex-col sm:flex-row xl:flex-col [&>*]:flex-1">
          {/* TOTAL */}
          <div className="bg-gray-900 p-5 rounded-xl text-beige-100">
            <BillsIcon className="fill-beige-100 w-10 h-10" />
            <p className="text-sm  mt-5">Total Bills</p>
            <p className="font-black text-4xl mt-2">$100</p>
          </div>

          {/* SUMMARY */}
          <div className="bg-white rounded-xl p-5">
            <h2 className="font-bold text-lg mb-3">Summary</h2>
            <div className="[&>p]:flex [&>p]:justify-between [&>p]:text-gray-500 [&>p:not(:last-child)]:border-b [&>p:not(:last-child)]:pb-3 space-y-3 text-sm ">
              <p>
                Paid Bills{" "}
                <span className="font-bold text-gray-900">${paid}</span>
              </p>
              <p>
                Total Upcoming{" "}
                <span className="font-bold text-gray-900">${upcoming}</span>
              </p>
              <p className="!text-red">
                Due Soon <span className="font-bold text-red">${dueSoon}</span>
              </p>
            </div>
          </div>
        </div>

        {/* BILLS LIST */}
        <div className="p-5 rounded-xl bg-white">
          <table className="w-full">
            <thead className="hidden sm:table-header-group">
              <tr className="[&>td]:pb-5 border-b border-gray-100 text-sm text-gray-500">
                <td>Bill Title</td>
                <td>Due Date</td>
                <td>Amount</td>
              </tr>
            </thead>
            <tbody>
              {bills?.map((x, i) => (
                <tr className="[&>td]:py-2  text-sm">
                  <td className="flex items-center gap-2">
                    <img src={x.avatar} className="w-7 h-7 rounded-full" />
                    <p className="font-semibold ">
                      {x.name}
                      <span className="text-[11px] block font-medium sm:hidden">
                        Monthly - {getOrdinal(x.day)}
                      </span>
                    </p>
                  </td>
                  <td className="text-gray-500 text-xs hidden sm:table-cell">
                    Monthly - {getOrdinal(x.day)}
                  </td>
                  <td className="font-bold">${Math.abs(x.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bills;
