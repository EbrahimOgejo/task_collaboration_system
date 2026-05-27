import { useState } from "react";
import api from "../../services/api";

export default function ForcePasswordResetPage() {
  const [password, setPassword] = useState("");

  const submit = async () => {
    await api.post("/auth/force-reset-password", {
      password
    });

    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-xl p-8 rounded-xl w-96">
        <h1 className="text-2xl font-bold mb-4">
          Change Temporary Password
        </h1>

        <input
          type="password"
          className="w-full border p-2 rounded mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full bg-indigo-600 text-white p-2 rounded"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}