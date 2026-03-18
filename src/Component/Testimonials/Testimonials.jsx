import { FaStar, FaCheckCircle } from "react-icons/fa";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Ahsan Rahman",
      role: "Digital Marketer",
      feedback:
        "The entire process was smooth and secure. I received full access to the Instagram account exactly as described. Highly recommended.",
      rating: 5,
    },
    {
      name: "Sarah Collins",
      role: "E-commerce Owner",
      feedback:
        "I was worried about safety at first, but the escrow system worked perfectly. Funds were released only after confirmation.",
      rating: 5,
    },
    {
      name: "Michael Torres",
      role: "Content Creator",
      feedback:
        "Great platform for buying established accounts. Support guided me through every step of the transfer.",
      rating: 4,
    },
  ];

  return (
    <section className="bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Trusted by buyers and sellers worldwide
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              {/* Rating */}
              <div className="mb-3 flex items-center gap-1 text-orange-500">
                {[...Array(item.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* Feedback */}
              <p className="text-sm text-slate-700 leading-relaxed">
                “{item.feedback}”
              </p>

              {/* User */}
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-500 font-bold">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800 flex items-center gap-1">
                    {item.name}
                    <FaCheckCircle className="text-green-500 text-xs" />
                  </p>
                  <p className="text-xs text-slate-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Note */}
        <div className="mt-12 text-center text-sm text-slate-500">
          All testimonials are from verified buyers and sellers on our platform.
        </div>
      </div>
    </section>
  );
}
