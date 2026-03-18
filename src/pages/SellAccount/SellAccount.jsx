import { useState } from "react";

export default function SellAccountService() {
  const [platform, setPlatform] = useState("All");

  // Example accounts that can be sold
  const accounts = [
    {
      title: "Instagram Growth Account",
      platform: "Instagram",
      followers: "15K",
      price: "$150",
      image: "https://via.placeholder.com/400x260?text=Instagram",
    },
    {
      title: "TikTok Viral Account",
      platform: "TikTok",
      followers: "25K",
      price: "$220",
      image: "https://via.placeholder.com/400x260?text=TikTok",
    },
    {
      title: "Twitter Starter Account",
      platform: "Twitter",
      followers: "5K",
      price: "$50",
      image: "https://via.placeholder.com/400x260?text=Twitter",
    },
    {
      title: "YouTube Beginner Channel",
      platform: "YouTube",
      followers: "2K",
      price: "$180",
      image: "https://via.placeholder.com/400x260?text=YouTube",
    },
  ];

  const filteredAccounts =
    platform === "All"
      ? accounts
      : accounts.filter((a) => a.platform === platform);

  return (
    <section className="bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Sell Your Accounts
            </h1>
            <p className="mt-2 text-slate-600">
              List your social media accounts safely and get the best price
            </p>
          </div>

          {/* FILTER */}
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full sm:w-52 rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option>All</option>
            <option>Instagram</option>
            <option>TikTok</option>
            <option>Twitter</option>
            <option>YouTube</option>
          </select>
        </div>

        {/* ACCOUNT GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAccounts.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-44 w-full object-cover transition group-hover:scale-105"
              />

              <div className="p-4">
                <span className="text-xs font-semibold text-orange-500">
                  {item.platform}
                </span>

                <h3 className="mt-1 text-sm font-semibold text-slate-800">
                  {item.title}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {item.followers} followers
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-slate-900">
                    {item.price}
                  </span>
                  <button className="rounded-lg bg-green-500 px-4 py-2 text-xs font-semibold text-white hover:bg-green-600 transition">
                    Sell Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TRUST BAR */}
        <div className="mt-14 rounded-xl bg-slate-50 p-6 text-center">
          <p className="text-sm font-medium text-slate-700">
            Secure Listing • Verified Buyers • Fast Payment Processing
          </p>
        </div>
      </div>
    </section>
  );
}
