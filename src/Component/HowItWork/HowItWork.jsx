import {
  FaSearch,
  FaLock,
  FaExchangeAlt,
  FaCheckCircle,
  FaShieldAlt,
  FaHeadset,
} from "react-icons/fa";

export default function HowItWorks() {
  return (
    <section className="bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            How Buying an Account Works
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            A secure, transparent, and fully assisted transfer process
          </p>
        </div>

        {/* Steps */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <FaSearch />,
              title: "Choose Account",
              desc: "Browse verified accounts and select the one that fits your needs.",
            },
            {
              icon: <FaLock />,
              title: "Secure Payment",
              desc: "Funds are held safely in escrow until the transfer is complete.",
            },
            {
              icon: <FaExchangeAlt />,
              title: "Ownership Transfer",
              desc: "We guide both parties through a secure handover process.",
            },
            {
              icon: <FaCheckCircle />,
              title: "Confirmation",
              desc: "Funds are released once you confirm successful access.",
            },
          ].map((step, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white">
                {step.icon}
              </div>
              <h3 className="text-sm font-semibold text-slate-800">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Trust Signals */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: <FaShieldAlt className="text-orange-500" />,
              title: "Verified Listings",
              desc: "Every account is manually reviewed before being listed.",
            },
            {
              icon: <FaLock className="text-orange-500" />,
              title: "Escrow Protection",
              desc: "Your payment is protected until ownership is confirmed.",
            },
            {
              icon: <FaHeadset className="text-orange-500" />,
              title: "24/7 Support",
              desc: "Our team assists you at every step of the transfer.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="text-xl">{item.icon}</div>
              <div>
                <h4 className="text-sm font-semibold text-slate-800">
                  {item.title}
                </h4>
                <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
