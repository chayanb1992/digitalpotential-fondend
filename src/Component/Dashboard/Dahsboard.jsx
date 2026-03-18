import React, { useContext } from "react";
import { AuthContex } from "../../AuthContex/AuthContex";

export default function Dashboard() {
  const { user } = useContext(AuthContex);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:block">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Dashboard</h2>
        </div>

        <nav className="p-4 space-y-2">
          <a
            href="/dashboard"
            className="block px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            Overview
          </a>

          <a
            href="/orders"
            className="block px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            My Orders
          </a>

          <a
            href="/my-services"
            className="block px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            My Service
          </a>

          <a
            href="/wallet"
            className="block px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            Wallet
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            Welcome {user?.displayName || "User"}
          </h1>
          <p className="text-gray-500 text-sm">
            Manage your accounts, orders, and wallet.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Balance */}
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-gray-500">Wallet Balance</p>
            <p className="text-2xl font-bold text-green-600">
              ${user?.balance || "0.00"}
            </p>
          </div>

          {/* Orders */}
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold">12</p>
          </div>

          {/* Accounts */}
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-gray-500">Accounts Purchased</p>
            <p className="text-2xl font-bold">5</p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>

          <table className="w-full text-left text-sm">
            <thead className="border-b">
              <tr>
                <th className="py-2">Order ID</th>
                <th>Service</th>
                <th>Status</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-2">#1021</td>
                <td>Instagram Followers</td>
                <td className="text-green-600">Completed</td>
                <td>$15</td>
              </tr>

              <tr className="border-b">
                <td className="py-2">#1020</td>
                <td>YouTube Subscribers</td>
                <td className="text-yellow-600">Processing</td>
                <td>$25</td>
              </tr>

              <tr>
                <td className="py-2">#1019</td>
                <td>TikTok Likes</td>
                <td className="text-green-600">Completed</td>
                <td>$10</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
