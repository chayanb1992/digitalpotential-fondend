/* eslint-disable react-hooks/set-state-in-effect */
import React, { useContext, useState, useRef, useEffect } from "react";
import logo from "../../../assets/logo22.png";
import { Link, NavLink } from "react-router"; // Assuming react-router-dom in your setup
import { AuthContex } from "../../../AuthContex/AuthContex";
import axios from "axios";
import {
  Search,
  Grid,
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
  X,
  ChevronRight,
  Bell,
} from "lucide-react";
import DropdownItem from "../../../Component/DropdownItem/DropdownItem";

export default function NavbarTailwind() {
  const { user, logOut, userData } = useContext(AuthContex);

  // States
  const [openProfile, setOpenProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef(null);

  // Data States
  const [userCategory, setUserCategory] = useState("");
  const [storeData, setStoreData] = useState(null);
  const [storeLoaded, setStoreLoaded] = useState(false);

  // --- Data Fetching Logic ---
  const checkAndAddUser = async () => {
    if (!user?.email) return;
    try {
      const res = await axios.get(
        "https://web-production-33681.up.railway.app/users/",
      );
      const existingUser = res.data.find((u) => u.email === user.email);

      if (!existingUser) {
        const newUser = { name: user?.displayName, email: user?.email };
        const addRes = await axios.post(
          "https://web-production-33681.up.railway.app/users/",
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

  useEffect(() => {
    if (user) checkAndAddUser();
  }, [user]);

  useEffect(() => {
    if (!userData?.id || storeLoaded) return;
    axios
      .get(`https://web-production-33681.up.railway.app/stores/${userData.id}`)
      .then((res) => setStoreData(res.data))
      .catch(() => setStoreData(null))
      .finally(() => setStoreLoaded(true));
  }, [userData, storeLoaded]);

  // --- UX Listeners ---
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      setOpenProfile(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // --- Reusable UI Components ---
  // const DropdownItem = ({ to, icon: Icon, children, onClick, danger }) => (
  //   <NavLink
  //     to={to}
  //     onClick={onClick}
  //     className={({ isActive }) =>
  //       `flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all duration-200
  //       ${isActive ? "bg-orange-50 text-orange-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
  //       ${danger ? "text-red-500 hover:bg-red-50 hover:text-red-600" : ""}`
  //     }
  //   >
  //     <Icon size={18} className={danger ? "text-red-500" : "text-gray-400"} />
  //     {children}
  //   </NavLink>
  // );

  return (
    <>
      {/* Spacer to prevent layout shift due to fixed header */}
      <div className="h-[72px] w-full bg-[#f8f9fa]" />

      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b border-gray-200
        ${isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm py-2" : "bg-white py-3"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* LEFT: Mobile Menu & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full md:hidden transition-colors"
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="flex-shrink-0">
              <img
                src={logo}
                alt="logo"
                className="h-8 md:h-10 w-auto object-contain"
              />
            </Link>
          </div>

          {/* CENTER: Desktop Search & Catalog */}
          <div className="hidden md:flex flex-1 items-center gap-4 max-w-2xl ml-8">
            <Link to="/catalog">
              <button className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow">
                <Grid size={16} />
                Catalog
              </button>
            </Link>

            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search
                  size={18}
                  className="text-gray-400 group-focus-within:text-orange-500 transition-colors"
                />
              </div>
              <input
                type="text"
                placeholder="Search for services, products, or sellers..."
                className="w-full bg-gray-100/80 border border-transparent rounded-full py-2.5 pl-11 pr-4 text-sm outline-none focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder-gray-400"
              />
            </div>
          </div>

          {/* RIGHT: User Actions */}
          <div className="flex items-center gap-2 md:gap-4 ml-auto">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full md:hidden transition-colors"
            >
              {mobileSearchOpen ? <X size={22} /> : <Search size={22} />}
            </button>

            {user ? (
              <>
                {/* Quick Action: Messages (Desktop + Mobile) */}
                <Link
                  to="/"
                  className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors hidden sm:block"
                >
                  <Mail size={22} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full border border-white"></span>
                </Link>

                {/* User Profile Trigger */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setOpenProfile(!openProfile)}
                    className="flex items-center gap-2 p-1 pr-3 rounded-full border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all bg-white"
                  >
                    <img
                      src={user?.photoURL || "https://i.pravatar.cc/150"}
                      alt="avatar"
                      className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover"
                    />
                    <span className="hidden md:block text-sm font-medium text-gray-700 max-w-[100px] truncate">
                      {user?.displayName?.split(" ")[0] || "User"}
                    </span>
                  </button>

                  {/* Desktop Dropdown / Mobile Drawer */}
                  {openProfile && (
                    <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 origin-top-right">
                      {/* User Info Header */}
                      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {user?.displayName}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {user?.email}
                        </p>
                        <div className="mt-2 inline-flex items-center px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-md">
                          {userCategory || "Loading..."}
                        </div>
                      </div>

                      <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                        {/* Section 1: Buying */}
                        <div className="py-2">
                          <p className="px-4 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                            Buying
                          </p>
                          <DropdownItem
                            to="/orders"
                            icon={Package}
                            onClick={() => setOpenProfile(false)}
                          >
                            My Orders
                          </DropdownItem>
                          <DropdownItem
                            to="/disputes"
                            icon={AlertTriangle}
                            onClick={() => setOpenProfile(false)}
                          >
                            Disputes
                          </DropdownItem>
                          <DropdownItem
                            to="/reviews"
                            icon={Star}
                            onClick={() => setOpenProfile(false)}
                          >
                            My Reviews
                          </DropdownItem>
                        </div>

                        {/* Section 2: Selling */}
                        <div className="py-2 border-t border-gray-100">
                          <p className="px-4 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                            Selling
                          </p>
                          {storeData ? (
                            <DropdownItem
                              to="/seller-store"
                              icon={Store}
                              onClick={() => setOpenProfile(false)}
                            >
                              Store Dashboard
                            </DropdownItem>
                          ) : (
                            <DropdownItem
                              to="/create-store"
                              icon={Store}
                              onClick={() => setOpenProfile(false)}
                            >
                              Become a Seller
                            </DropdownItem>
                          )}
                        </div>

                        {/* Section 3: Account */}
                        <div className="py-2 border-t border-gray-100">
                          <p className="px-4 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                            Account
                          </p>
                          <DropdownItem
                            to="/profile"
                            icon={User}
                            onClick={() => setOpenProfile(false)}
                          >
                            Profile Settings
                          </DropdownItem>
                          <DropdownItem
                            to="/wallet"
                            icon={Wallet}
                            onClick={() => setOpenProfile(false)}
                          >
                            Wallet & Funds
                          </DropdownItem>
                          <DropdownItem
                            to="/referral"
                            icon={Gift}
                            onClick={() => setOpenProfile(false)}
                          >
                            Referrals
                          </DropdownItem>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="p-2 border-t border-gray-100 bg-gray-50">
                        <button className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <span className="flex items-center gap-3">
                            <Moon size={18} /> Dark Mode
                          </span>
                          {/* Toggle Switch Visual */}
                          <div className="w-8 h-4 bg-gray-300 rounded-full relative">
                            <div className="w-3 h-3 bg-white rounded-full absolute top-0.5 left-0.5" />
                          </div>
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-1"
                        >
                          <LogOut size={18} /> Log Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-1 sm:gap-3">
                <Link
                  to="/login"
                  className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors hidden sm:block"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm hover:shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE SLIDE-DOWN SEARCH BAR */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-b border-gray-100 ${mobileSearchOpen ? "max-h-20 opacity-100 py-3" : "max-h-0 opacity-0 py-0 border-transparent"}`}
        >
          <div className="px-4">
            <div className="relative w-full">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search services..."
                className="w-full bg-gray-100 border-none rounded-full py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-orange-500"
                autoFocus={mobileSearchOpen}
              />
            </div>
          </div>
        </div>
      </header>

      {/* --- MOBILE SIDEBAR MENU --- */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[120] lg:hidden">
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[280px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-left">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <img src={logo} alt="logo" className="h-8" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full bg-gray-50"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl"
              >
                Home
              </NavLink>
              <NavLink
                to="/catalog"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-3 text-sm font-medium text-orange-600 bg-orange-50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <Grid size={20} /> Catalog
                </div>
                <ChevronRight size={16} />
              </NavLink>

              {!user && (
                <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-3">
                  <Link
                    to="/login"
                    className="w-full text-center py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="w-full text-center py-2.5 bg-orange-500 text-white rounded-xl text-sm font-medium"
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
