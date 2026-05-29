import { useState } from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  resetPassword
} from "../../services/authService";

function ResetPasswordPage() {
  const navigate = useNavigate();

  const { token } = useParams();

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await resetPassword(
        token,
        password
      );

      toast.success(
        "Password reset successful"
      );

      navigate("/login");

    } catch (error) {
      toast.error(
        error.response?.data?.error ||
        "Password reset failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Reset Password
        </h1>

        <form
          onSubmit={handleReset}
          className="space-y-4"
        >
          <div>
            <label className="block mb-1 font-medium">
              New Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;