import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleLogin = async () => {
  try {
    const user = await login(form);

    toast.success("Login successful");

    if (user.must_reset_password) {
      navigate("/force-password-reset");
    } else {
      navigate("/dashboard");
    }
  } catch (err) {
    toast.error(
      err.response?.data?.error ||
      "Invalid credentials"
    );
  }
};

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account"
    >
      <div className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <input
          placeholder="Email"
          className="w-full border border-slate-200 rounded-xl px-4 py-3"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-slate-200 rounded-xl px-4 py-3"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value
            })
          }
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
        >
          Sign In
        </button>

        <div className="flex justify-between text-sm">
          <Link
            to="/forgot-password"
            className="text-blue-600"
          >
            Forgot Password?
          </Link>

          <Link
            to="/register"
            className="text-blue-600"
          >
            Register
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}