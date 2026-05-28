import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";

import CreateUserModal from "../../components/admin/CreateUserModal";

import {
  getUsers,
  createUser,
  toggleUserStatus,
  deleteUser
} from "../../services/adminService";

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] =
    useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreate = async (
    payload
  ) => {
    await createUser(payload);
    await loadUsers();
  };

  const handleToggleStatus = async (
    userId
  ) => {
    await toggleUserStatus(userId);
    await loadUsers();
  };

  const handleDelete = async (
    userId
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    await deleteUser(userId);

    await loadUsers();
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">
              User Management
            </h1>

            <p className="text-slate-500 mt-2">
              Manage platform users.
            </p>
          </div>

          <Button
            onClick={() =>
              setShowModal(true)
            }
          >
            Invite User
          </Button>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {users.map((user) => (
              <Card key={user.id}>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {user.username}
                    </h2>

                    <p className="text-slate-500">
                      {user.email}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm">
                      {user.role}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-lg text-sm ${
                        user.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.is_active
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="secondary"
                      onClick={() =>
                        handleToggleStatus(
                          user.id
                        )
                      }
                    >
                      {user.is_active
                        ? "Deactivate"
                        : "Activate"}
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() =>
                        handleDelete(
                          user.id
                        )
                      }
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <CreateUserModal
          isOpen={showModal}
          onClose={() =>
            setShowModal(false)
          }
          onCreate={handleCreate}
        />
      </div>
    </DashboardLayout>
  );
}