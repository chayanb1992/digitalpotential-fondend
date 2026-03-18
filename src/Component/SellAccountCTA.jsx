import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router";
import { AuthContex } from "../AuthContex/AuthContex";
import { useContext } from "react";

export default function SellAccountCTA() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContex);
  const benefits = [
    "Fast & secure account transfer",
    "Escrow-protected payments",
    "Manual verification for every listing",
    "Dedicated seller support",
  ];

  const handleSellClick = () => {
    if (!user) {
      navigate("/login", { state: { from: "/sell-account" } });
    } else {
      navigate("/sell-account");
    }
  };

  return (
    <section className="bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 px-6 py-10 sm:px-10 sm:py-14">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Want to Sell Your Account?
              </h2>

              <p className="mt-4 text-base text-slate-600 sm:text-lg">
                List your social media account and sell it securely to verified
                buyers. We handle the process from start to finish.
              </p>

              <ul className="mt-6 space-y-3">
                {benefits.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-sm text-slate-700"
                  >
                    <FaCheckCircle className="text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right CTA */}
            <div className="flex flex-col items-start gap-4 sm:items-end">
              <span className="text-sm font-medium text-slate-500">
                Start earning today
              </span>

              <a
                onClick={handleSellClick}
                className="inline-flex items-center gap-2 rounded-xl
                           bg-orange-500 px-8 py-4 text-sm font-semibold
                           text-white shadow hover:bg-orange-600 transition cursor-pointer"
              >
                Sell Your Account
                <FaArrowRight />
              </a>

              <p className="text-xs text-slate-500">
                Listing takes less than 5 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
