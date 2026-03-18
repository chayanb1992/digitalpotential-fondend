import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { NavLink } from "react-router";

import ins_pre from "../../assets/instagram-1.png";
import facebookImg from "../../assets/facebook.jpg";

export default function AllAccounts() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  /* ---------------- FETCH SAME AS TRENDING ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // ✅ SAME API AS TRENDING
        const res = await axios.get("http://127.0.0.1:8000/card-info/");
        const cardList = res.data;

        const updatedCards = await Promise.all(
          cardList.map(async (card) => {
            try {
              const accRes = await axios.get(
                `http://127.0.0.1:8000/instagram/${card.id}`,
              );

              // ✅ count only unsold accounts
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
        setCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ---------------- PAGINATION ---------------- */
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  const currentCards = cards.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage,
  );

  const paginate = (page) => setCurrentPage(page);

  /* ---------------- HELPERS ---------------- */
  const getIcon = (category) => {
    if (category === "Instagram")
      return <FaInstagram className="text-pink-500" />;
    if (category === "Facebook")
      return <FaFacebook className="text-blue-500" />;
    return null;
  };

  const getImage = (category, image) => {
    if (image) return image;

    if (category === "Instagram") return ins_pre;
    if (category === "Facebook") return facebookImg;

    return ins_pre;
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="flex justify-center py-20 text-gray-600">
        Loading accounts...
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-800 mb-8">All Accounts</h2>

      {/* EMPTY */}
      {cards.length === 0 ? (
        <div className="text-center text-gray-500 py-20">No accounts found</div>
      ) : (
        <>
          {/* GRID */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {currentCards.map((item) => (
              <div
                key={item.id}
                className="bg-white border rounded-xl hover:shadow-md transition overflow-hidden"
              >
                {/* IMAGE */}
                <img
                  src={getImage(item.category, item.image)}
                  alt={item.title}
                  onError={(e) => (e.target.src = ins_pre)}
                  className="h-44 w-full object-cover"
                />

                {/* CONTENT */}
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex gap-2 items-center text-xs text-gray-500">
                      {getIcon(item.category)}
                      <span>{item.category}</span>
                    </div>

                    <span className="text-xs text-gray-500">
                      {item.quantity} Available
                    </span>
                  </div>

                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                    {item.title}
                  </h3>

                  <div className="flex justify-between items-center mt-3">
                    <span className="font-semibold text-gray-800">
                      ${item.price}
                    </span>

                    <NavLink to={`/accounts/${item.id}`}>
                      <button className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded">
                        View
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 gap-2 flex-wrap">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;

                return (
                  <button
                    key={page}
                    onClick={() => paginate(page)}
                    className={`px-3 py-1.5 text-sm border rounded ${
                      currentPage === page
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}
    </section>
  );
}
