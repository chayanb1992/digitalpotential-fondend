import React, { useContext, useEffect, useState } from "react";
import { FaWallet, FaCalendarAlt, FaStore } from "react-icons/fa";
import { AuthContex } from "../../AuthContex/AuthContex";
import { Link, useNavigate } from "react-router";
import axios from "axios";

export default function Profile() {
  const { user, loading, userData } = useContext(AuthContex);
  const navigate = useNavigate();
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // 🔥 Become Seller API
  const handleBecomeSeller = async () => {
    try {
      setUpdating(true);

      await axios.patch(
        `http://localhost:8000/users/become-seller/${userData.id}`,
      );

      window.location.reload(); // simple refresh (later we can optimize)
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-5xl space-y-6">
        {/* PROFILE */}
        <div className="bg-white border rounded-xl p-6 grid md:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="flex flex-col items-center text-center border-r pr-4">
            <img
              src={user?.photoURL}
              alt="avatar"
              className="w-20 h-20 rounded-full object-cover"
            />

            <p className="text-gray-600 text-sm mt-2">{userData?.email}</p>

            <div className="flex gap-2 mt-3">
              <span className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                {userData?.type}
              </span>

              <span className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                Google Login
              </span>
            </div>

            <button className="mt-5 px-4 py-2 border text-sm rounded hover:bg-gray-100 transition">
              Edit Profile
            </button>
          </div>

          {/* RIGHT */}
          <div className="md:col-span-2 space-y-5">
            <h3 className="text-lg font-semibold text-gray-800">
              Account Overview
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Balance */}
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <FaWallet />
                  <span>Balance</span>
                </div>

                <p className="text-2xl font-semibold mt-2 text-gray-800">
                  ${userData?.balance ?? 0}
                </p>

                <Link to="/profile/add-fund">
                  <button className="mt-3 text-xs px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded">
                    Add Funds
                  </button>
                </Link>
              </div>

              {/* Member Since */}
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <FaCalendarAlt />
                  <span>Member Since</span>
                </div>

                <p className="text-sm font-medium mt-2 text-gray-800">
                  {userData?.created_at
                    ? new Date(userData.created_at).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )
                    : "Loading..."}
                </p>
              </div>
            </div>

            {/* DETAILS */}
            <div className="border rounded-lg p-4 text-sm space-y-2">
              <p>
                <span className="text-gray-500">Email:</span> {userData?.email}
              </p>

              <p>
                <span className="text-gray-500">Account Type:</span>{" "}
                {userData?.type}
              </p>

              <p>
                <span className="text-gray-500">Login Method:</span> Google
              </p>
            </div>
          </div>
        </div>

        {/* 🔥 CONDITIONAL SELLER SECTION */}

        {userData?.type === "buyer" && (
          <div className="bg-white border rounded-lg p-5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FaStore className="text-gray-500" />
              <div>
                <h4 className="text-sm font-medium text-gray-800">
                  Become a Seller
                </h4>
                <p className="text-xs text-gray-500">
                  Start selling your accounts
                </p>
              </div>
            </div>

            <button
              onClick={handleBecomeSeller}
              disabled={updating}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded disabled:opacity-50"
            >
              {updating ? "Processing..." : "Apply"}
            </button>
          </div>
        )}

        {userData?.type === "seller" && (
          <div className="bg-white border rounded-lg p-5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FaStore className="text-orange-500" />
              <div>
                <h4 className="text-sm font-medium text-gray-800">
                  Seller Dashboard
                </h4>
                <p className="text-xs text-gray-500">
                  Manage your store, products & orders
                </p>
              </div>
            </div>

            <Link>
              <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded">
                Go to Dashboard
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
