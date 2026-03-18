import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function FAQSection() {
  const faqs = [
    {
      q: "Is buying and selling accounts safe?",
      a: "Yes. Every account listed on our platform goes through manual verification. Payments are protected by escrow and released only after successful transfer.",
    },
    {
      q: "Can the seller recover the account after selling?",
      a: "No. We require full ownership transfer, including email, recovery options, and 2FA removal. Sellers are permanently restricted from reclaiming sold accounts.",
    },
    {
      q: "What platforms do you support?",
      a: "We currently support Instagram, Facebook, TikTok, Twitter (X), and YouTube accounts. More platforms will be added soon.",
    },
    {
      q: "How does escrow payment work?",
      a: "Buyer funds are held securely in escrow. Once the buyer confirms account access and ownership, payment is released to the seller.",
    },
    {
      q: "How long does a transaction take?",
      a: "Most transactions complete within 24–72 hours, depending on platform verification and buyer confirmation.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-white border-t border-slate-200">
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-600">
            Everything you need to know about buying and selling accounts safely
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold text-slate-800">
                  {item.q}
                </span>
                <FaChevronDown
                  className={`text-slate-400 transition ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-5 pb-4 text-sm text-slate-600">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
