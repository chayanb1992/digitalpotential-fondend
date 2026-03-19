import { FaInstagram, FaFacebook } from "react-icons/fa";
import { NavLink } from "react-router";
import axios from "axios";
import React, { useEffect, useState } from "react";

import ins_pre from "../../assets/instagram-1.png";
import facebookImg from "../../assets/facebook.jpg";

export default function TrendingAccounts() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- Fetch Cards + Accounts ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Get all cards
        const res = await axios.get(
          "https://web-production-33681.up.railway.app/card-info/",
        );

        const cardList = res.data;

        // 2️⃣ Fetch accounts per card
        const updatedCards = await Promise.all(
          cardList.map(async (card) => {
            try {
              const accRes = await axios.get(
                `https://web-production-33681.up.railway.app/instagram/${card.id}/`,
              );

              // count only AVAILABLE accounts
              const availableCount = accRes.data.filter(
                (acc) => !acc.sold,
              ).length;

              return {
                ...card,
                quantity: availableCount,
              };
            } catch {
              return { ...card, quantity: 0 };
            }
          }),
        );

        setCards(updatedCards);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ---------------- Icon ---------------- */
  const getIcon = (category) => {
    switch (category) {
      case "Instagram":
        return <FaInstagram className="text-pink-500" />;
      case "Facebook":
        return <FaFacebook className="text-blue-600" />;
      default:
        return null;
    }
  };

  /* ---------------- Image ---------------- */
  const getImage = (category, image) => {
    if (image) return image;

    switch (category) {
      case "Instagram":
        return ins_pre;
      case "Facebook":
        return facebookImg;
      default:
        return ins_pre;
    }
  };

  if (loading) {
    return <div className="flex justify-center py-20">Loading...</div>;
  }

  return (
    <section className="bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-bold">Trending Accounts</h2>
        </div>

        {/* Cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cards.map((item) => (
            <div
              key={item.id}
              className="group border rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              {/* Image */}
              <img
                src={getImage(item.category, item.image)}
                alt={item.title}
                className="h-44 w-full object-cover"
              />

              {/* Content */}
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex gap-2 items-center text-xs">
                    {getIcon(item.category)}
                    <span>{item.category}</span>
                  </div>

                  <span className="text-xs text-gray-500">
                    {item.quantity} Available
                  </span>
                </div>

                <h3 className="text-sm font-semibold">{item.title}</h3>

                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold">${item.price}</span>

                  <NavLink to={`/accounts/${item.id}`}>
                    <button className="text-orange-500 text-xs hover:underline">
                      View
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="mt-8 flex justify-end">
          <NavLink to="/allAccounts">
            <button className="text-sm text-orange-500 hover:text-orange-600">
              View all →
            </button>
          </NavLink>
        </div>
      </div>
    </section>
  );
}
