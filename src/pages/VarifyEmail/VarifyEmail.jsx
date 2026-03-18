import { sendEmailVerification } from "firebase/auth";
import { use } from "react";
import { AuthContex } from "../../AuthContex/AuthContex";

export default function VerifyEmail() {
  const { user } = use(AuthContex);
  const resendEmail = async () => {
    if (user.currentUser) {
      await sendEmailVerification(user.currentUser);
      alert("Verification email sent again!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h2 className="text-xl font-bold mb-4">Verify your email</h2>

        <p className="text-gray-500 mb-4">
          We sent a verification link to your email.
        </p>

        <button
          onClick={resendEmail}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          Resend Email
        </button>
      </div>
    </div>
  );
}
