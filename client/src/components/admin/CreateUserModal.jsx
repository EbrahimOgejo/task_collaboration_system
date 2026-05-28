import { useState } from "react";
import Button from "../ui/Button";

export default function CreateUserModal({
  isOpen,
  onClose,
  onCreate
}) {
  const [formData, setFormData] =
    useState({
      username: "",
      email: "",
      role: "user"
    });

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await onCreate(formData);

      setFormData({
        username: "",
        email: "",
        role: "user"
      });

      onClose();
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.error ||
          "Failed to invite user."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6">
          Invite User
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({
                ...formData,
                username: e.target.value
              })
            }
            className="w-full border rounded-xl px-4 py-3"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value
              })
            }
            className="w-full border rounded-xl px-4 py-3"
            required
          />

          <select
            value={formData.role}
            onChange={(e) =>
              setFormData({
                ...formData,
                role: e.target.value
              })
            }
            className="w-full border rounded-xl px-4 py-3"
          >
            <option value="user">
              User
            </option>

            <option value="admin">
              Admin
            </option>
          </select>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Inviting..."
                : "Invite User"}
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}