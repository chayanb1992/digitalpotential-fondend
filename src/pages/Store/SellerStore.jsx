import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContex } from "../../AuthContex/AuthContex";
import { Link } from "react-router";

export default function SellerStore() {
  const { userData, loading } = useContext(AuthContex);

  const [storeData, setStoreData] = useState(null);
  const [cards, setCards] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  /* ---------------- Fetch Store Info ---------------- */
  useEffect(() => {
    if (!userData?.id) return;

    axios
      .get(`https://web-production-33681.up.railway.app/stores/${userData.id}/`)
      .then((res) => setStoreData(res.data))
      .catch(() => setStoreData(null));
  }, [userData]);

  /* ---------------- Fetch Cards + Accounts ---------------- */
  useEffect(() => {
    if (!userData?.id) return;

    const fetchData = async () => {
      try {
        setProductsLoading(true);

        const cardRes = await axios.get(
          `https://web-production-33681.up.railway.app/card-info/${userData.id}`,
        );

        const cardsData = cardRes.data;

        const cardsWithAccounts = await Promise.all(
          cardsData.map(async (card) => {
            try {
              const accRes = await axios.get(
                `https://web-production-33681.up.railway.app/instagram/${card.id}`,
              );

              return {
                ...card,
                accounts: accRes.data || [],
              };
            } catch {
              return { ...card, accounts: [] };
            }
          }),
        );

        setCards(cardsWithAccounts);
      } catch (err) {
        console.error(err);
        setCards([]);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchData();
  }, [userData]);

  /* ---------------- Delete Product ---------------- */
  const handleDeleteProduct = async (cardId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://web-production-33681.up.railway.app/card-info/${cardId}`,
      );
      setCards((prev) => prev.filter((card) => card.id !== cardId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  /* ---------------- Loading ---------------- */
  if (loading || productsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-semibold animate-pulse text-gray-600">
          Loading store...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="h-40 bg-gray-200"></div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Store Info */}
        <div className="bg-white border rounded-xl p-6 -mt-12 flex items-center gap-4">
          <img
            src={storeData?.logo}
            alt="store"
            className="w-20 h-20 rounded-lg border object-cover"
          />

          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              {storeData?.store_name || "My Store"}
            </h1>

            <p className="text-gray-500 text-sm">
              {storeData?.description || "Store description"}
            </p>

            <div className="flex gap-4 mt-2 text-xs text-gray-500">
              <span>📦 {cards.length} Products</span>
              <span>🛒 Sales: 4.2k</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mt-10 mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Products</h2>

          <Link to="/add-product">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm transition">
              + Add Product
            </button>
          </Link>
        </div>

        {/* Products */}
        {cards.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            No products found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cards.map((product) => (
              <div
                key={product.id}
                className="bg-white border rounded-xl hover:shadow-md transition flex flex-col"
              >
                {/* Image */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-44 w-full object-cover rounded-t-xl"
                />

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-medium text-gray-800">{product.title}</h3>

                  <p className="text-xs text-gray-500">{product.category}</p>

                  <div className="mt-3 text-sm text-gray-600 space-y-1">
                    <p>
                      Price:{" "}
                      <span className="font-semibold text-gray-800">
                        ${product.price}
                      </span>
                    </p>

                    <p>
                      Stock:{" "}
                      <span className="font-semibold text-gray-800">
                        {product.accounts.length} Available
                      </span>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <Link to={`/edit-product/${product.id}`} className="flex-1">
                      <button className="w-full text-sm bg-orange-500 hover:bg-orange-600 text-white py-1.5 rounded transition">
                        Edit
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex-1 text-sm border border-red-500 text-red-500 hover:bg-red-50 py-1.5 rounded transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
