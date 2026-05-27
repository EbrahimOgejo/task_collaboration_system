import { useState } from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import { forgotPassword } from "../../services/authService";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
  try {
    await forgotPassword(email);
    toast.success("Reset email sent");
  } catch {
    toast.error("Request failed");
  }
};

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Reset your account password"
    >
      <div className="space-y-4">
        {message && (
          <div className="bg-green-50 text-green-700 p-3 rounded-xl text-sm">
            {message}
          </div>
        )}

        <input
          placeholder="Email"
          className="w-full border border-slate-200 rounded-xl px-4 py-3"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
        >
          Send Reset Link
        </button>
      </div>
    </AuthLayout>
  );
}