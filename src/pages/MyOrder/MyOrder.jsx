import React, { useState } from "react";

const ordersData = [
  {
    id: "ORD-48392",
    product: "Instagram Account (50K Followers)",
    seller: "socialhub",
    price: 120,
    status: "Completed",
    date: "2026-02-12",
  },
  {
    id: "ORD-48393",
    product: "YouTube Channel (Monetized)",
    seller: "channelmarket",
    price: 540,
    status: "Processing",
    date: "2026-02-15",
  },
  {
    id: "ORD-48394",
    product: "Twitter Account (10K Followers)",
    seller: "twtrstore",
    price: 60,
    status: "Disputed",
    date: "2026-02-17",
  },
];

function StatusBadge({ status }) {
  const styles = {
    Completed: "bg-green-100 text-green-700",
    Processing: "bg-yellow-100 text-yellow-700",
    Disputed: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function MyOrdersPage() {
  const [search, setSearch] = useState("");

  const filteredOrders = ordersData.filter((order) =>
    order.product.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>

        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-left">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Seller</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {order.id}
                  </td>
                  <td className="px-6 py-4">{order.product}</td>
                  <td className="px-6 py-4">{order.seller}</td>
                  <td className="px-6 py-4 font-semibold">${order.price}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4">{order.date}</td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
