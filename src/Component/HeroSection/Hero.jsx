import React from "react";
import heroImage from "../../assets/hero.png";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:flex lg:items-center lg:gap-12">
        {/* Left Content */}
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
          <h1 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Unlock Your <br className="hidden sm:block" />
            <span className="text-slate-900">Digital Potential</span>
          </h1>

          <p className="mt-4 text-base text-slate-600 sm:mt-6 sm:text-lg">
            Seamlessly buy and sell online accounts.
          </p>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4 lg:justify-start">
            <a
              href="#"
              className="w-full sm:w-auto rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-orange-600 transition"
            >
              Explore
            </a>
            <a
              href="#"
              className="w-full sm:w-auto rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative mt-10 flex justify-center lg:mt-0 lg:flex-1">
          <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg">
            <img
              src={heroImage}
              alt="Hero Illustration"
              className="w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
