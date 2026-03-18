import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useContext } from "react";
import { AuthContex } from "../../AuthContex/AuthContex";

export default function AccountInfoCard() {
  const { id } = useParams(); // card id

  const [card, setCard] = useState(null);
  const [available, setAvailable] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const { userData } = useContext(AuthContex);

  /* ---------------- BUY FUNCTION ---------------- */
  const handleBuy = async () => {
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/buy/${card.id}?quantity=${quantity}&user_id=${userData.id}`,
      );

      const accounts = res.data.accounts;

      if (!accounts.length) {
        alert("No accounts received");
        return;
      }

      // Convert to text format
      const textData = accounts
        .map(
          (acc) =>
            `${acc.username},${acc.password},${acc.twofa_code},${acc.email},${acc.email_password}`,
        )
        .join("\n");

      // Create file
      const blob = new Blob([textData], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${card.title}_accounts.txt`;
      link.click();

      window.URL.revokeObjectURL(url);

      alert("✅ Accounts downloaded successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.detail || "Purchase failed");
    }
  };

  /* ---------------- Fetch Data ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Get card info
        const cardRes = await axios.get(
          `http://127.0.0.1:8000/card-info/single/${id}`,
        );

        // 2️⃣ Get accounts of this card
        const accRes = await axios.get(`http://127.0.0.1:8000/instagram/${id}`);

        const availableCount = accRes.data.filter((acc) => !acc.sold).length;

        setCard(cardRes.data);
        setAvailable(availableCount);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  /* ---------------- Quantity ---------------- */
  const increase = () => {
    if (quantity < available) {
      setQuantity((q) => q + 1);
    }
  };

  const decrease = () => {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!card) {
    return <div className="text-center py-20">Not Found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row gap-6">
      {/* Image */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg p-6">
        <img
          src={card.image}
          alt={card.title}
          className="w-48 h-48 object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex-1 space-y-4">
        {/* Delivery */}
        <span className="inline-block bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full font-medium">
          🚚 {card.delivery}
        </span>

        {/* Title */}
        <h2 className="text-2xl font-bold">{card.title}</h2>

        {/* Price */}
        <div className="text-3xl font-bold text-blue-600">${card.price}</div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-gray-500 text-sm">
          <span>⭐ {card.star || "4.5"}</span>
          <span>📦 {available} units</span>
          <span>⏱ {card.delivery}</span>
        </div>

        {/* Description */}
        <div>
          <h3 className="font-semibold mb-1">Description</h3>
          <p className="text-gray-600 text-sm">{card.description}</p>
        </div>

        {/* Quantity */}
        <div>
          <h3 className="font-semibold mb-2">Quantity</h3>

          <div className="flex items-center gap-3">
            <button
              onClick={decrease}
              className="w-10 h-10 rounded-full border"
            >
              −
            </button>

            <div className="w-16 h-10 border flex items-center justify-center">
              {quantity}
            </div>

            <button
              onClick={increase}
              className="w-10 h-10 rounded-full border"
            >
              +
            </button>

            <span className="text-sm text-gray-400 ml-4">Max: {available}</span>
          </div>
        </div>

        {/* Buy Button */}
        <button
          onClick={handleBuy}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold"
        >
          ⚡ BUY NOW - ${card.price * quantity}
        </button>

        {/* Contact */}
        <button className="w-full border py-3 rounded-lg text-gray-700 hover:bg-gray-50">
          💬 Contact Seller
        </button>
      </div>
    </div>
  );
}
