import { FaInstagram, FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";

import ins_pre from "../../assets/instagram-1.png";
import twitter from "../../assets/twitter.jpg";
import youtube from "../../assets/Youtube.png";
import facebook from "../../assets/facebook.jpg";

export default function GrowthServicesAll() {
  const trending = [
    {
      title: "Premium Instagram Account",
      image: ins_pre,
      followers: "45K",
      price: "$320",
      platform: "Instagram",
      icon: <FaInstagram className="text-pink-500" />,
    },
    {
      title: "Twitter Account with 10K+",
      image: twitter,
      followers: "10K",
      price: "$180",
      platform: "Twitter",
      icon: <FaTwitter className="text-sky-500" />,
    },
    {
      title: "Growing YouTube Channel",
      image: youtube,
      followers: "25K",
      price: "$540",
      platform: "YouTube",
      icon: <FaYoutube className="text-red-600" />,
    },
    {
      title: "High-Reach Facebook Page",
      image: facebook,
      followers: "60K",
      price: "$410",
      platform: "Facebook",
      icon: <FaFacebook className="text-blue-600" />,
    },
  ];

  return (
    <section className="bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Growth Services</h2>
        </div>

        {/* Cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {trending.map((item, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white
              transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    {item.icon}
                    <span className="text-slate-600">{item.platform}</span>
                  </div>

                  <span className="text-xs text-slate-500">
                    {item.followers}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-slate-800 line-clamp-2">
                  {item.title}
                </h3>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">
                    {item.price}
                  </span>

                  <button className="text-xs font-semibold text-orange-500 hover:underline">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
