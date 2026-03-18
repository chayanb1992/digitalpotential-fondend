import React, { useState } from "react";
import { FaCreditCard, FaBitcoin } from "react-icons/fa";

export default function AddFund() {
  const [method, setMethod] = useState("card");
  const [amount, setAmount] = useState("");
  const [crypto, setCrypto] = useState("BTC");

  const quickAmounts = [10, 25, 50, 100, 250];

  const handleDeposit = () => {
    console.log({
      amount,
      method,
      crypto,
    });

    // call backend
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* WALLET HEADER */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-6 mb-6 shadow">
          <p className="text-sm opacity-80">Wallet Balance</p>

          <h2 className="text-3xl font-bold mt-1">$120.50</h2>

          <p className="text-sm mt-2 opacity-90">
            Add funds to purchase accounts or services
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-xl shadow p-6">
          {/* TITLE */}
          <h3 className="text-xl font-semibold mb-6">Add Funds</h3>

          {/* AMOUNT */}
          <div className="mb-6">
            <label className="text-sm font-medium">Enter Amount</label>

            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-2 w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
            />

            {/* QUICK AMOUNT */}
            <div className="flex gap-3 mt-3 flex-wrap">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt)}
                  className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
                >
                  ${amt}
                </button>
              ))}
            </div>
          </div>

          {/* PAYMENT METHOD */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-3">Payment Method</p>

            <div className="grid grid-cols-2 gap-4">
              {/* CARD */}
              <button
                onClick={() => setMethod("card")}
                className={`flex items-center justify-center gap-2 border p-4 rounded-lg
                ${method === "card" ? "border-orange-500 bg-orange-50" : ""}`}
              >
                <FaCreditCard size={18} />
                Mastercard / Card
              </button>

              {/* CRYPTO */}
              <button
                onClick={() => setMethod("crypto")}
                className={`flex items-center justify-center gap-2 border p-4 rounded-lg
                ${method === "crypto" ? "border-orange-500 bg-orange-50" : ""}`}
              >
                <FaBitcoin size={18} />
                Crypto
              </button>
            </div>
          </div>

          {/* CARD PAYMENT */}
          {method === "card" && (
            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full border rounded-lg px-4 py-3"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM / YY"
                  className="border rounded-lg px-4 py-3"
                />

                <input
                  type="text"
                  placeholder="CVC"
                  className="border rounded-lg px-4 py-3"
                />
              </div>

              <input
                type="text"
                placeholder="Cardholder Name"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>
          )}

          {/* CRYPTO PAYMENT */}
          {method === "crypto" && (
            <div className="mb-6">
              {/* CRYPTO SELECT */}
              <label className="text-sm font-medium">
                Select Cryptocurrency
              </label>

              <select
                value={crypto}
                onChange={(e) => setCrypto(e.target.value)}
                className="mt-2 w-full border rounded-lg px-4 py-3"
              >
                <option>BTC</option>
                <option>ETH</option>
                <option>USDT</option>
              </select>

              {/* WALLET ADDRESS */}
              <div className="mt-4 bg-gray-100 p-4 rounded-lg text-sm">
                <p className="text-gray-500 mb-1">
                  Send payment to this wallet
                </p>

                <p className="break-all font-mono">
                  0x4A9C1f2b8F6D7a9C23D5A9B4E8c7F4a0b1E9C2d3
                </p>
              </div>
            </div>
          )}

          {/* SUMMARY */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between text-sm">
              <span>Amount</span>
              <span>${amount || 0}</span>
            </div>

            <div className="flex justify-between text-sm mt-2">
              <span>Fee</span>
              <span>$0</span>
            </div>

            <div className="flex justify-between font-semibold mt-3">
              <span>Total</span>
              <span>${amount || 0}</span>
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleDeposit}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Add Funds
          </button>
        </div>
      </div>
    </div>
  );
}
