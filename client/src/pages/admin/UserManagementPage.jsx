import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/ui/Button";
import UserTable from "../../components/admin/UserTable";
import CreateUserModal from "../../components/admin/CreateUserModal";

import {
  getUsers,
  createUser,
  toggleUserStatus
} from "../../services/adminService";

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const handleCreate = async (payload) => {
    await createUser(payload);
    await loadUsers();
  };

  const handleToggle = async (user) => {
    await toggleUserStatus(
      user.id,
      user.is_active
    );

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
            onClick={() => setShowModal(true)}
          >
            Create User
          </Button>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <UserTable
            users={users}
            onToggleStatus={handleToggle}
          />
        )}

        <CreateUserModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onCreate={handleCreate}
        />
      </div>
    </DashboardLayout>
  );
}