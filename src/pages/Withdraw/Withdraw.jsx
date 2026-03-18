import React, { useState } from "react";

export default function Withdraw() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("crypto");

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-6">Withdraw Funds</h2>

      <input
        type="number"
        placeholder="Amount"
        className="w-full border px-4 py-3 rounded-lg mb-4"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        className="w-full border px-4 py-3 rounded-lg mb-4"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
      >
        <option value="crypto">Crypto</option>
        <option value="bank">Bank Transfer</option>
      </select>

      <input
        type="text"
        placeholder="Wallet Address"
        className="w-full border px-4 py-3 rounded-lg mb-4"
      />

      <button className="w-full bg-orange-500 text-white py-3 rounded-lg">
        Request Withdrawal
      </button>
    </div>
  );
}
