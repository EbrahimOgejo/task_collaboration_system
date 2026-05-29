import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

function LoginForm() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: ""
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const user = await login(
        formData
      );

      toast.success(
        "Login successful"
      );

      if (
        user.role === "admin"
      ) {
        navigate("/admin/users");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      toast.error(
        error.response?.data?.error ||
        "Login failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label className="block mb-1 font-medium">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-4 py-3"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Password
        </label>

        <div className="relative">
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3 pr-12"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword
              ? <FaEyeSlash />
              : <FaEye />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
      >
        {loading
          ? "Signing In..."
          : "Sign In"}
      </button>

      <div className="flex justify-between text-sm">
        <Link
          to="/forgot-password"
          className="text-blue-600 hover:underline"
        >
          Forgot Password?
        </Link>

        <Link
          to="/signup"
          className="text-blue-600 hover:underline"
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;