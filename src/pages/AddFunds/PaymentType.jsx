import { useState } from "react";

export default function PaymentTypeSelector() {
  const [selected, setSelected] = useState("crypto");

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-1">Select Payment Type</h2>
      <p className="text-sm text-gray-500 mb-6">
        Choose how you want to process your payment.
      </p>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Crypto */}
        <button
          onClick={() => setSelected("crypto")}
          className={`p-6 rounded-lg border transition text-left
          ${
            selected === "crypto"
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-transparent"
              : "bg-white border-gray-200 hover:border-indigo-300"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">🪙</span>
            <span className="font-semibold">Crypto Auto Payment</span>
          </div>
          <p
            className={`text-sm ${
              selected === "crypto" ? "text-indigo-100" : "text-gray-500"
            }`}
          >
            Fast & Auto-confirmed (Binance API).
          </p>
        </button>

        {/* Manual */}
        <button
          onClick={() => setSelected("manual")}
          className={`p-6 rounded-lg border transition text-left
          ${
            selected === "manual"
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-transparent"
              : "bg-white border-gray-200 hover:border-indigo-300"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">💳</span>
            <span className="font-semibold">Manual Payment</span>
          </div>
          <p
            className={`text-sm ${
              selected === "manual" ? "text-indigo-100" : "text-gray-500"
            }`}
          >
            Traditional way (Screenshot & Review).
          </p>
        </button>
      </div>

      {/* Footer buttons */}
      <div className="flex justify-between">
        <button className="px-6 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200">
          ← Back
        </button>

        <button className="px-8 py-2 rounded-lg text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90">
          Continue →
        </button>
      </div>
    </div>
  );
}
