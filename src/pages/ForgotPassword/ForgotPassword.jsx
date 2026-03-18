import React from "react";
import { Link } from "react-router";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-[#f4f4f3] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Forgot your password?
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Enter your email and we’ll send you a reset link
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-orange-500 outline-none"
            />
          </div>

          {/* Reset Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-orange-500 py-2.5 font-semibold text-white hover:bg-orange-600 transition"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to login */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-medium hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
