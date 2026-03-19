import { Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";

import facebook from "../../assets/catagory/facebook-icon.png";
import gmail from "../../assets/catagory/Gmail-Logo.png";
import instagram from "../../assets/catagory/instagram-icon.png";
import outlook from "../../assets/catagory/Outlook-Logo.png";
import pinterest from "../../assets/catagory/Pinterest-Logo.png";
import telegram from "../../assets/catagory/Telegram-icon.png";
import tiktok from "../../assets/catagory/Tiktok-Logo.png";
import x_logo from "../../assets/catagory/X-Logo.png";
import youtube from "../../assets/catagory/YouTube-logo.png";

import axios from "axios";
import { AuthContex } from "../../AuthContex/AuthContex";

const imageMap = {
  "facebook-icon.png": facebook,
  "Gmail-Logo.png": gmail,
  "instagram-icon.png": instagram,
  "Outlook-Logo.png": outlook,
  "Pinterest-Logo.png": pinterest,
  "Telegram-icon.png": telegram,
  "Tiktok-Logo.png": tiktok,
  "X-Logo.png": x_logo,
  "YouTube-Logo.png": youtube,
};

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const { loading } = useContext(AuthContex);

  useEffect(() => {
    setLoadingState(true);
    axios
      .get("https://web-production-33681.up.railway.app/category/")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoadingState(false);
      });
  }, []);

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            Browse Categories
          </h2>

          <p className="text-gray-500 mt-2">
            Find accounts, services, and digital assets easily
          </p>

          <div className="w-24 h-0.5 bg-orange-500 mx-auto mt-4"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {/* 🔹 LOADING SKELETON */}
          {loadingState
            ? Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="border rounded-xl p-6 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 bg-size-[200%_100%] animate-shimmer"
                >
                  <div className="w-14 h-14 bg-gray-200 rounded-full mx-auto mb-4"></div>

                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>

                  <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
              ))
            : categories.map((cat, index) => (
                <div
                  key={index}
                  className="group relative bg-white border rounded-xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer"
                >
                  {/* NEW Badge */}
                  {cat.isNew && (
                    <span className="absolute top-3 right-3 bg-green-500 text-white text-[10px] px-2 py-1 rounded-full">
                      NEW
                    </span>
                  )}

                  {/* Icon */}
                  <div className="w-14 h-14 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-4 group-hover:bg-orange-100 transition">
                    <img
                      src={imageMap[cat.image]}
                      alt={cat.name}
                      className="w-8 h-8"
                    />
                  </div>

                  {/* Name */}
                  <h3 className="font-semibold text-gray-800 group-hover:text-orange-500 transition">
                    {cat.name}
                  </h3>

                  {/* Count */}
                  <p className="text-sm text-gray-500 mt-1">
                    {cat.products} listings
                  </p>

                  {/* Hover */}
                  <div className="opacity-0 group-hover:opacity-100 text-xs text-orange-500 mt-3 transition">
                    View Category →
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
