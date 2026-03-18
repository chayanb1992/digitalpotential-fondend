import React, { useContext, useState, useRef, useEffect } from "react";
import logo from "../../../assets/logo22.png";
import { Link, NavLink } from "react-router";
import { AuthContex } from "../../../AuthContex/AuthContex";

export default function NavbarTailwind() {
  const { user, logOut } = useContext(AuthContex);

  const [menuOpen, setMenuOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logOut();
      setOpenProfile(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full border-b border-gray-200 bg-[#f4f4f3] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              ☰
            </button>

            <img src={logo} alt="Logo" className="h-9 w-auto" />
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden sm:flex items-center gap-6">
            <NavLink to="/" className="font-medium hover:text-orange-600">
              Home
            </NavLink>

            <NavLink
              to="/allAccounts"
              className="font-medium hover:text-orange-600"
            >
              Accounts
            </NavLink>

            <NavLink
              to="/growthServices"
              className="font-medium hover:text-orange-600"
            >
              Growth Services
            </NavLink>

            <NavLink
              to="/support"
              className="font-medium hover:text-orange-600"
            >
              Support
            </NavLink>
          </div>

          {/* RIGHT */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              {/* PROFILE BUTTON */}
              <button
                onClick={() => setOpenProfile(!openProfile)}
                className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200"
              >
                <img
                  src={user?.photoURL || "https://i.pravatar.cc/40"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />

                <span className="text-sm font-medium">
                  {user?.displayName || "User"}
                </span>

                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* DROPDOWN */}
              {openProfile && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {/* BALANCE */}
                  <div className="px-4 py-3 border-b">
                    <p className="text-xs text-gray-500">Current Balance</p>
                    <p className="font-semibold text-green-600">
                      $ {user?.balance || "0.00"}
                    </p>
                  </div>

                  {/* MENU */}
                  <NavLink
                    to="/dashboard"
                    onClick={() => setOpenProfile(!openProfile)}
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Dashboard
                  </NavLink>

                  <NavLink
                    to="/orders"
                    onClick={() => setOpenProfile(!openProfile)}
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    My Orders
                  </NavLink>

                  <NavLink
                    to="/sell-account"
                    onClick={() => setOpenProfile(!openProfile)}
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Sell Account
                  </NavLink>

                  <NavLink
                    to="/wallet"
                    onClick={() => setOpenProfile(!openProfile)}
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Wallet
                  </NavLink>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="font-medium text-gray-700 hover:text-orange-600"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-orange-500 px-4 py-2 rounded-lg text-white hover:bg-orange-600"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="sm:hidden border-t bg-[#f4f4f3]">
          <div className="px-4 py-3 space-y-2">
            <NavLink to="/" className="block py-2">
              Home
            </NavLink>

            <NavLink to="/accounts" className="block py-2">
              Accounts
            </NavLink>

            <NavLink to="/services" className="block py-2">
              Growth Services
            </NavLink>

            <NavLink to="/support" className="block py-2">
              Support
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
