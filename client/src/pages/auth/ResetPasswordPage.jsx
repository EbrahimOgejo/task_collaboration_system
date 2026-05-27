import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import { resetPassword } from "../../services/authService";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleReset = async () => {
    await resetPassword(token, password);
    navigate("/login");
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Create a new password"
    >
      <div className="space-y-4">
        <input
          type="password"
          placeholder="New Password"
          className="w-full border border-slate-200 rounded-xl px-4 py-3"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleReset}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
        >
          Reset Password
        </button>
      </div>
    </AuthLayout>
  );
}