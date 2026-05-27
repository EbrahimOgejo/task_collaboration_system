import { useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

export default function CreateUserModal({
  isOpen,
  onClose,
  onCreate
}) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    role: "user"
  });

  const handleSubmit = async () => {
    await onCreate(form);

    setForm({
      username: "",
      email: "",
      role: "user"
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-6">
        Create User
      </h2>

      <div className="space-y-4">
        <input
          value={form.username}
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
          value={form.email}
          placeholder="Email"
          className="w-full border border-slate-200 rounded-xl px-4 py-3"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
        />

        <select
          value={form.role}
          className="w-full border border-slate-200 rounded-xl px-4 py-3"
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value
            })
          }
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <Button
          onClick={handleSubmit}
          className="w-full"
        >
          Create User
        </Button>
      </div>
    </Modal>
  );
}