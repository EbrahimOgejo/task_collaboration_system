import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export default function UserTable({
  users,
  onToggleStatus
}) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 text-left">
              <th className="py-4">Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-slate-100"
              >
                <td className="py-5 font-medium">
                  {user.username}
                </td>

                <td>{user.email}</td>

                <td>
                  <Badge
                    type={
                      user.role === "admin"
                        ? "danger"
                        : "info"
                    }
                  >
                    {user.role}
                  </Badge>
                </td>

                <td>
                  <Badge
                    type={
                      user.is_active
                        ? "success"
                        : "warning"
                    }
                  >
                    {user.is_active
                      ? "Active"
                      : "Inactive"}
                  </Badge>
                </td>

                <td>
                  <Button
                    onClick={() =>
                      onToggleStatus(user)
                    }
                    className="bg-slate-800 hover:bg-slate-900"
                  >
                    {user.is_active
                      ? "Deactivate"
                      : "Activate"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}