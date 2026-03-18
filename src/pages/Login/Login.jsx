import React, { use, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContex } from "../../AuthContex/AuthContex";
import { toast, ToastContainer } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
// import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, login, signWithGoogle, logOut } = use(AuthContex);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);

  // Handle normal login
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    // toast.error("Please verify your email first.");
    try {
      const result = await login(email, password);
      console.log(!result.user.emailVerified);
      if (!result.user.emailVerified) {
        toast.error("Please verify your email first.");
        await logOut();
        return;
      }
      toast.success("Login successful!");
      const redirectPath = location.state?.from || "/";
      navigate(redirectPath);
    } catch (err) {
      toast.error(err.message || "Login failed!");
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      await signWithGoogle();
      toast.success("Logged in with Google!");
      const redirectPath = location.state?.from || "/";
      navigate(redirectPath);
    } catch (err) {
      toast.error(err.message || "Google login failed!");
    }
  };

  // Redirect if user is already logged in
  useEffect(() => {
    if (user && user.emailVerified) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div className="min-h-screen bg-[#f4f4f3] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Login to your account
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Access your dashboard and manage your accounts
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleOnSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-orange-500 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={passwordShow ? "text" : "password"}
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-orange-500 outline-none"
            />
            <button
              type="button"
              onClick={() => setPasswordShow(!passwordShow)}
              className="absolute right-3 top-9 text-gray-400"
            >
              {passwordShow ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-orange-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-orange-500 py-2.5 font-semibold text-white hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px w-full bg-gray-200"></div>
          <span className="text-sm text-gray-400">OR</span>
          <div className="h-px w-full bg-gray-200"></div>
        </div>

        {/* Google login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center border border-gray-300 justify-center gap-2 bg-white text-black font-medium py-2 rounded-lg hover:bg-gray-200 transition"
        >
          <FcGoogle size={22} />
          Login with Google
        </button>

        {/* Sign up */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-orange-500 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
