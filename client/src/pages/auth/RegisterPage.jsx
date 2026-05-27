import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import { registerUser } from "../../services/authService";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleRegister = async () => {
  try {
    await registerUser(form);

    toast.success("Account created");
    navigate("/login");
  } catch (err) {
    toast.error(
      err.response?.data?.error ||
      "Registration failed"
    );
  }
};

  return (
    <AuthLayout
      title="Create account"
      subtitle="Start collaborating"
    >
      <div className="space-y-4">
        {message && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm">
            {message}
          </div>
        )}

        <input
          placeholder="Username"
          className="w-full border border-slate-200 rounded-xl px-4 py-3"
          onChange={(e) =>
            setForm({
              ...form,
              username: e.target.value
            })
          }
        />

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
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
        >
          Create Account
        </button>

        <Link
          to="/login"
          className="text-blue-600 text-sm"
        >
          Already have an account?
        </Link>
      </div>
    </AuthLayout>
  );
}