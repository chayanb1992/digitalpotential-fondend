import { useState } from "react";

function MyServices() {
  const [active, setActive] = useState("accounts");

  const accountServices = [
    {
      title: "Instagram Accounts",
      description: "Buy and sell high quality Instagram accounts safely.",
    },
    {
      title: "YouTube Channels",
      description: "Verified YouTube channels with active subscribers.",
    },
    {
      title: "TikTok Accounts",
      description: "Trending TikTok accounts ready for growth.",
    },
  ];

  const growthServices = [
    {
      title: "Instagram Growth",
      description: "Increase followers and engagement organically.",
    },
    {
      title: "YouTube Promotion",
      description: "Boost your channel views and subscribers.",
    },
    {
      title: "TikTok Promotion",
      description: "Reach millions with targeted TikTok promotion.",
    },
  ];

  const services = active === "accounts" ? accountServices : growthServices;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-10 space-x-4">
          <button
            onClick={() => setActive("accounts")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              active === "accounts"
                ? "bg-blue-600 text-white"
                : "bg-white border"
            }`}
          >
            Accounts
          </button>

          <button
            onClick={() => setActive("growth")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              active === "growth" ? "bg-blue-600 text-white" : "bg-white border"
            }`}
          >
            Growth Services
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>

              <p className="text-gray-600 mb-4">{service.description}</p>

              <button className="text-blue-600 font-medium hover:underline">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MyServices;
