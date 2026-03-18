import React, { useRef } from "react";
import {
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaTiktok,
  FaLinkedin,
} from "react-icons/fa";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const platforms = [
  { name: "Instagram", icon: FaInstagram, color: "text-pink-500" },
  { name: "Twitter", icon: FaTwitter, color: "text-sky-500" },
  { name: "Facebook", icon: FaFacebook, color: "text-blue-600" },
  { name: "YouTube", icon: FaYoutube, color: "text-red-600" },
  { name: "TikTok", icon: FaTiktok, color: "text-black" },
  { name: "LinkedIn", icon: FaLinkedin, color: "text-blue-700" },
];

export default function Platforms() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 relative">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Supported Platforms
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            Trade accounts across the most popular networks
          </p>
        </div>

        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-[65%] -translate-y-1/2 z-10
                     bg-white border shadow-md rounded-full p-2
                     hover:bg-gray-100"
        >
          <FaAngleLeft size={20} />
        </button>

        {/* Platforms Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide no-scrollbar"
        >
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            return (
              <div
                key={index}
                className="min-w-[45%] sm:min-w-[30%] lg:min-w-[16%]
                           shrink-0
                           flex flex-col items-center justify-center
                           rounded-xl border border-slate-200 bg-slate-50
                           px-4 py-6 transition
                           hover:-translate-y-1 hover:shadow-md"
              >
                <Icon
                  className={`text-3xl ${platform.color} transition group-hover:scale-110`}
                />
                <p className="mt-3 text-sm font-semibold text-slate-700">
                  {platform.name}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-[65%] -translate-y-1/2 z-10
                     bg-white border shadow-md rounded-full p-2
                     hover:bg-gray-100"
        >
          <FaAngleRight size={20} />
        </button>
      </div>
    </section>
  );
}
