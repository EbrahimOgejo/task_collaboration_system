import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold mb-6">
        Task Collaboration Management System
      </h1>

      <p className="text-xl mb-8">
        Enterprise collaboration platform for teams.
      </p>

      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-blue-600 px-6 py-3 rounded"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-green-600 px-6 py-3 rounded"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}