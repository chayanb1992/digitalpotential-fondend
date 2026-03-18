import React from "react";
import { Link } from "react-router";

export default function WalletDashboard() {
  const transactions = [
    { id: 1, type: "Deposit", amount: 100, status: "Completed" },
    { id: 2, type: "Purchase", amount: -45, status: "Completed" },
    { id: 3, type: "Sale", amount: 150, status: "Pending" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* BALANCE CARD */}
      <div className="bg-orange-500 text-white rounded-xl p-6 mb-6">
        <p className="text-sm opacity-80">Wallet Balance</p>
        <h2 className="text-3xl font-bold">$120.50</h2>

        <div className="flex gap-3 mt-4">
          <Link
            to="/wallet/add-fund"
            className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium"
          >
            Add Funds
          </Link>

          <Link
            to="/wallet/withdraw"
            className="bg-orange-600 px-4 py-2 rounded-lg"
          >
            Withdraw
          </Link>
        </div>
      </div>

      {/* TRANSACTIONS */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Transaction History</h3>

        <table className="w-full text-sm">
          <thead className="border-b">
            <tr>
              <th className="text-left py-2">Type</th>
              <th className="text-left">Amount</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b">
                <td className="py-3">{t.type}</td>

                <td
                  className={t.amount > 0 ? "text-green-600" : "text-red-500"}
                >
                  ${t.amount}
                </td>

                <td>{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
