import { useState } from "react";

export default function BuyAccounts() {
  const [platform, setPlatform] = useState("All");

  const accounts = [
    {
      title: "Verified Instagram Account",
      platform: "Instagram",
      followers: "120K",
      price: "$850",
      image: "https://via.placeholder.com/400x260?text=Instagram",
    },
    {
      title: "TikTok Creator Account",
      platform: "TikTok",
      followers: "85K",
      price: "$620",
      image: "https://via.placeholder.com/400x260?text=TikTok",
    },
    {
      title: "Twitter (X) Account",
      platform: "Twitter",
      followers: "45K",
      price: "$340",
      image: "https://via.placeholder.com/400x260?text=Twitter",
    },
    {
      title: "YouTube Monetized Channel",
      platform: "YouTube",
      followers: "32K",
      price: "$1,200",
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
              Buy Verified Accounts
            </h1>
            <p className="mt-2 text-slate-600">
              Browse safe, verified social media accounts with escrow protection
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
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
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
                  <button className="rounded-lg bg-orange-500 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-600 transition">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TRUST BAR */}
        <div className="mt-14 rounded-xl bg-slate-50 p-6 text-center">
          <p className="text-sm font-medium text-slate-700">
            Escrow Protected • Manual Verification • Secure Ownership Transfer
          </p>
        </div>
      </div>
    </section>
  );
}
