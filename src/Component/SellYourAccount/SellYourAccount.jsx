import { useState } from "react";
import { useLocation } from "react-router";

export default function SellAccounts() {
  const [type, setType] = useState("account");

  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    followers: "",
    price: "",
    description: "",
    serviceType: "",
    accountDetails: "",
    maxLimit: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getFollowerLabel = () => {
    if (formData.platform === "Facebook") return "Friends";
    if (formData.platform === "YouTube") return "Subscribers";
    return "Followers";
  };

  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Sell on Marketplace
        </h2>

        {/* TYPE SELECTION */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setType("account")}
            className={`px-6 py-2 rounded-lg border font-semibold transition ${
              type === "account"
                ? "bg-orange-500 text-white border-orange-500"
                : "border-slate-300 text-slate-700"
            }`}
          >
            Accounts
          </button>

          <button
            onClick={() => setType("growth")}
            className={`px-6 py-2 rounded-lg border font-semibold transition ${
              type === "growth"
                ? "bg-orange-500 text-white border-orange-500"
                : "border-slate-300 text-slate-700"
            }`}
          >
            Growth Services
          </button>
        </div>

        <form className="space-y-5">
          {/* ACCOUNT FIELDS */}
          {type === "account" && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Account Title
                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="Example: 50K Instagram Page"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* PLATFORM */}
                <div>
                  <label className="block text-sm mb-1">Platform</label>

                  <select
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="">Select Platform</option>
                    <option>Instagram</option>
                    <option>Twitter</option>
                    <option>YouTube</option>
                    <option>Facebook</option>
                  </select>
                </div>

                {/* FOLLOWERS */}
                <div>
                  <label className="block text-sm mb-1">
                    {getFollowerLabel()}
                  </label>

                  <input
                    type="number"
                    name="followers"
                    placeholder="50000"
                    value={formData.followers}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>
            </>
          )}

          {/* GROWTH SERVICE FIELDS */}
          {type === "growth" && (
            <>
              <div>
                <label className="block text-sm mb-1">Service Name</label>

                <input
                  type="text"
                  name="title"
                  placeholder="Instagram Growth Service"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* SERVICE TYPE */}
                <div>
                  <label className="block text-sm mb-1">Service Type</label>

                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option>Followers Growth</option>
                    <option>Likes</option>
                    <option>Views</option>
                    <option>Subscribers</option>
                  </select>
                </div>

                {/* MAX SERVICE LIMIT */}
                <div>
                  <label className="block text-sm mb-1">
                    Max Service Limit
                  </label>

                  <input
                    type="number"
                    name="maxLimit"
                    placeholder="Example: 5000"
                    value={formData.maxLimit}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>
            </>
          )}

          {/* PRICE */}
          <div>
            <label className="block text-sm mb-1">Price ($)</label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* ACCOUNT LOGIN DETAILS */}
          {type === "account" && (
            <div>
              <label className="block text-sm mb-1">
                Account Login Details
              </label>

              <textarea
                rows="4"
                name="accountDetails"
                value={formData.accountDetails}
                onChange={handleChange}
                placeholder="username:password,email:password || username2:password,email2:password"
                className="w-full border rounded-lg px-3 py-2"
              />

              <p className="text-xs text-slate-500 mt-1">
                Separate multiple accounts using <strong>||</strong>
              </p>
            </div>
          )}

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm mb-1">Description</label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
