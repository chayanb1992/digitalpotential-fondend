import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContex } from "../../AuthContex/AuthContex";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Signup() {
  const navigate = useNavigate();
  const { user, createAccount, signWithGoogle, logOut } =
    useContext(AuthContex);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [repeatPasswordShow, setRepeatPasswordShow] = useState(false);
  const [error, setError] = useState("");

  // Handle registration
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
    if (!regex.test(password)) {
      setError(
        "Password must include uppercase, lowercase, number, and special character.",
      );
      return;
    }
    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!terms) {
      setError("You must accept the Terms & Conditions.");
      return;
    }

    try {
      const result = await createAccount(email, password);
      await updateProfile(result.user, { displayName: name });
      await sendEmailVerification(result.user);
      await logOut();

      toast.success("Account created! Please verify your email.");
      navigate("/login");
      setName("");
      setImage("");
      setEmail("");
      setPassword("");
      setTerms(false);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  // Google registration
  const handleGoogleLogin = async () => {
    try {
      await signWithGoogle();
      navigate("/");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

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
            Create your account
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Join our marketplace to buy and sell social accounts
          </p>
        </div>
        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleOnSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-orange-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-orange-500 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={passwordShow ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-orange-500 outline-none"
            />
            <button
              type="button"
              onClick={() => setPasswordShow(!passwordShow)}
              className="absolute right-3 top-9 text-gray-400"
            >
              {passwordShow ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type={repeatPasswordShow ? "text" : "password"}
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-orange-500 outline-none"
            />
            <button
              type="button"
              onClick={() => setRepeatPasswordShow(!repeatPasswordShow)}
              className="absolute right-3 top-9 text-gray-400"
            >
              {repeatPasswordShow ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              className="mt-1 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
            />
            <p>
              I agree to the{" "}
              <span className="text-orange-500 cursor-pointer hover:underline">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-orange-500 cursor-pointer hover:underline">
                Privacy Policy
              </span>
            </p>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-orange-500 py-2.5 font-semibold text-white hover:bg-orange-600 transition"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px w-full bg-gray-200"></div>
          <span className="text-sm text-gray-400">OR</span>
          <div className="h-px w-full bg-gray-200"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-white text-black font-medium py-2 rounded-lg hover:bg-gray-200 transition"
        >
          <FcGoogle size={22} /> Register with Google
        </button>

        {/* Login link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
