/* eslint-disable react-hooks/set-state-in-effect */
import React, { useContext, useState, useRef, useEffect } from "react";
import logo from "../../../assets/logo22.png";
import { Link, NavLink } from "react-router";
import { AuthContex } from "../../../AuthContex/AuthContex";
import { Search, Grid } from "lucide-react";
import {
  User,
  Store,
  Package,
  Mail,
  AlertTriangle,
  Star,
  Wallet,
  Gift,
  Send,
  Moon,
  LogOut,
  Menu,
} from "lucide-react";
import axios from "axios";

export default function NavbarTailwind() {
  const { user, logOut, userData } = useContext(AuthContex);

  const [openProfile, setOpenProfile] = useState(false);
  const dropdownRef = useRef(null);
  const [userCategory, setUserCategory] = useState("");
  const [storeData, setStoreData] = useState(null);
  const [storeLoaded, setStoreLoaded] = useState(false);
  // add user
  const checkAndAddUser = async () => {
    if (!user?.email) return;

    try {
      const res = await axios.get(
        "https://web-production-33681.up.railway.app/users",
      );

      const users = res.data;
      // console.log(users);

      const existingUser = users.find((u) => u.email === user.email);

      if (!existingUser) {
        const newUser = {
          name: user?.displayName,
          email: user?.email,
        };
        // console.log(newUser);

        const addRes = await axios.post(
          "https://web-production-33681.up.railway.app/users",
          newUser,
        );

        setUserCategory(addRes.data.type || "Buyer");
      } else {
        setUserCategory(existingUser.type);
      }
    } catch (error) {
      console.error("User check error:", error);
    }
  };

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (!user?.email) return;
  //     console.log(user.email);
  //     try {
  //       // check user
  //       const res = await axios.get(
  //         `http://127.0.0.1:8000/users/${user.email}`,
  //       );
  //       console.log(res.data.user_catagory);

  //       setUserCategory(res.data.user_catagory);
  //     } catch (error) {
  //       // if user not found → create user
  //       console.error("Fetch user error:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, [user]);
  const handleLogout = async () => {
    try {
      await logOut();
      setOpenProfile(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  // console.log(userData);
  useEffect(() => {
    if (!userData?.id || storeLoaded) return;

    axios
      .get(`https://web-production-33681.up.railway.app/stores/${userData.id}`)
      .then((res) => {
        setStoreData(res.data);
      })
      .catch(() => {
        setStoreData(null);
      })
      .finally(() => {
        setStoreLoaded(true);
      });
  }, [userData, storeLoaded]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (user) {
      checkAndAddUser();
    }
  }, [user]);

  return (
    <nav className="w-full bg-[#f4f4f3] border-b">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="logo" className="h-9" />
          </Link>
          <Link to="/catalog">
            <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm">
              <Grid size={16} />
              Catalog
            </button>
          </Link>
        </div>

        {/* SEARCH (Hidden on small screen) */}
        <div className="hidden md:flex flex-1 justify-center px-6">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search accounts, services..."
              className="w-full bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 outline-none focus:ring-2 focus:ring-orange-400"
            />
            <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="ml-auto flex items-center gap-4">
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
                <div className="fixed inset-0 z-50 flex justify-end">
                  {/* overlay */}
                  <div
                    className="absolute inset-0 bg-black/40"
                    onClick={() => setOpenProfile(false)}
                  />

                  {/* drawer */}
                  <div className="relative w-80 h-full bg-slate-700 text-white p-5 overflow-y-auto">
                    {/* profile header */}
                    <div className="flex items-center gap-3 mb-6">
                      <img
                        src={user?.photoURL || "https://i.pravatar.cc/40"}
                        className="w-12 h-12 rounded-full"
                      />

                      <div>
                        <h3 className="font-semibold">
                          {user?.displayName || "Username"}
                        </h3>
                        <p className="text-xs text-gray-300">{user?.email}</p>

                        <span className="inline-block mt-1 bg-orange-500 text-xs px-2 py-1 rounded">
                          {userCategory}
                        </span>
                      </div>
                    </div>

                    {/* menu */}
                    <div className="space-y-3">
                      <NavLink
                        onClick={() => setOpenProfile(false)}
                        className="menuItem"
                        to="/profile"
                      >
                        <User size={18} /> Profile
                      </NavLink>
                      {storeData ? (
                        <NavLink
                          onClick={() => setOpenProfile(false)}
                          className="menuItem"
                          to="/seller-store"
                        >
                          <Store size={18} /> My Store
                        </NavLink>
                      ) : (
                        <NavLink
                          onClick={() => setOpenProfile(false)}
                          className="menuItem"
                          to="/create-store"
                        >
                          <Store size={18} /> Become Seller
                        </NavLink>
                      )}

                      <NavLink
                        onClick={() => setOpenProfile(false)}
                        className="menuItem"
                        to="/orders"
                      >
                        <Package size={18} /> My Orders
                      </NavLink>

                      <NavLink
                        onClick={() => setOpenProfile(false)}
                        className="menuItem"
                        to="/messages"
                      >
                        <Mail size={18} /> Messages
                      </NavLink>

                      <NavLink
                        onClick={() => setOpenProfile(false)}
                        className="menuItem"
                        to="/disputes"
                      >
                        <AlertTriangle size={18} /> Disputes
                      </NavLink>

                      <NavLink
                        onClick={() => setOpenProfile(false)}
                        className="menuItem"
                        to="/reviews"
                      >
                        <Star size={18} /> Give Review
                      </NavLink>

                      <NavLink
                        onClick={() => setOpenProfile(false)}
                        className="menuItem"
                        to="/wallet"
                      >
                        <Wallet size={18} /> Add Funds
                      </NavLink>

                      <NavLink
                        onClick={() => setOpenProfile(false)}
                        className="menuItem"
                        to="/referral"
                      >
                        <Gift size={18} /> Referral Program
                      </NavLink>

                      <NavLink
                        onClick={() => setOpenProfile(false)}
                        className="menuItem"
                        to="/telegram"
                      >
                        <Send size={18} /> Connect Telegram
                      </NavLink>

                      <button
                        onClick={() => setOpenProfile(false)}
                        className="menuItem"
                      >
                        <Moon size={18} /> Dark Mode
                      </button>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 text-red-400 hover:bg-slate-600 p-3 rounded-lg w-full"
                      >
                        <LogOut size={18} /> Logout
                      </button>
                    </div>
                  </div>
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
    </nav>
  );
}
