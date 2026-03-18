import React from "react";

export default function Services() {
  const services = [
    {
      title: "Account Verification",
      description:
        "Get your social media accounts verified quickly and securely.",
      icon: "🔒",
      bgColor: "bg-orange-100",
    },
    {
      title: "Social Media Growth",
      description:
        "Boost followers and engagement on your Instagram, TikTok, or Twitter accounts.",
      icon: "📈",
      bgColor: "bg-green-100",
    },
    {
      title: "Secure Escrow Service",
      description:
        "Safe transactions for buying or selling accounts with escrow protection.",
      icon: "💰",
      bgColor: "bg-blue-100",
    },
    {
      title: "Account Consultation",
      description:
        "Expert advice on account monetization, growth strategies, and more.",
      icon: "📝",
      bgColor: "bg-purple-100",
    },
    {
      title: "Custom Branding",
      description: "Get personalized logos, banners, and profile optimization.",
      icon: "🎨",
      bgColor: "bg-pink-100",
    },
    {
      title: "24/7 Support",
      description: "Our team is always available to help with any queries.",
      icon: "🛎️",
      bgColor: "bg-yellow-100",
    },
  ];

  return (
    <section className="bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        {/* HEADER */}
        <div className="mb-12 text-center">
          <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Our Services
          </h1>
          <p className="mt-2 text-slate-600">
            Explore the range of services we offer to make your account buying
            and selling experience secure and profitable.
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl ${service.bgColor}`}
              >
                {service.icon}
              </div>

              <h3 className="mt-4 text-lg font-semibold text-slate-800">
                {service.title}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* TRUST BAR */}
        <div className="mt-14 rounded-xl bg-slate-50 p-6 text-center">
          <p className="text-sm font-medium text-slate-700">
            Professional Services • Verified Experts • Secure & Fast
          </p>
        </div>
      </div>
    </section>
  );
}
