import React, { useState } from "react";

export default function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const faqs = [
    {
      question: "How do I buy an account?",
      answer:
        "You can browse the Buy Accounts page, filter by platform, and click 'View Details' to purchase an account safely with escrow protection.",
    },
    {
      question: "How do I sell my account?",
      answer:
        "Go to the Sell Accounts page, select your account type, and click 'Sell Now'. Our team will verify and connect you with buyers securely.",
    },
    {
      question: "Is my payment secure?",
      answer:
        "Yes. All transactions are protected by our escrow service to ensure a safe and secure payment process.",
    },
    {
      question: "Can I get support 24/7?",
      answer:
        "Absolutely. Our support team is available around the clock to assist with any issues or inquiries.",
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        {/* HEADER */}
        <div className="mb-12 text-center">
          <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Support Center
          </h1>
          <p className="mt-2 text-slate-600">
            We're here to help! Get answers to frequently asked questions or
            send us a message.
          </p>
        </div>

        {/* CONTACT FORM */}
        <div className="mb-16 max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-6"
          >
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* FAQ */}
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-6 text-xl font-semibold text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="rounded-lg border border-slate-200 bg-white p-4 group"
              >
                <summary className="cursor-pointer text-sm font-medium text-slate-800 list-none marker:hidden">
                  {faq.question}
                </summary>
                <p className="mt-2 text-sm text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>

        {/* TRUST BAR */}
        <div className="mt-14 rounded-xl bg-slate-50 p-6 text-center">
          <p className="text-sm font-medium text-slate-700">
            Trusted Support • 24/7 Assistance • Secure Communication
          </p>
        </div>
      </div>
    </section>
  );
}
