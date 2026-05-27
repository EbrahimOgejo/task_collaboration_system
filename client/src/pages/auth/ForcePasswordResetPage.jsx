import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import { forceResetPassword } from "../../services/authService";

export default function ForcePasswordResetPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    await forceResetPassword(password);
    navigate("/dashboard");
  };

  return (
    <AuthLayout
      title="Password Reset Required"
      subtitle="Update your temporary password"
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
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
        >
          Update Password
        </button>
      </div>
    </AuthLayout>
  );
}