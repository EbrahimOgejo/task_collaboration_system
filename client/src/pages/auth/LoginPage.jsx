import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthLayout from "../../components/auth/AuthLayout";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");

      const user = await login(form);

      toast.success(
        "Login successful"
      );

      if (user.must_reset_password) {
        navigate("/force-password-reset");

      } else if (
        user.role === "admin"
      ) {
        navigate("/admin/users");

      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      const message =
        err.response?.data?.error ||
        "Invalid credentials";

      setError(message);

      toast.error(message);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Let's get you started, Sign in to your account"
    >
      <div className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          className="w-full border border-slate-200 rounded-xl px-4 py-3"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
        />

        <div className="relative">
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Password"
            value={form.password}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-12"
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value
              })
            }
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <FaEyeSlash size={18} />
            ) : (
              <FaEye size={18} />
            )}
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
        >
          Sign In
        </button>

        <div className="flex justify-between text-sm">
          <Link
            to="/forgot-password"
            className="text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>

          <Link
            to="/register"
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}