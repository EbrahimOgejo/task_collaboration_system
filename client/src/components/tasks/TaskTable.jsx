import Badge from "../ui/Badge";
import Card from "../ui/Card";
import Button from "../ui/Button";

export default function TaskTable({
  tasks,
  onDelete,
  onToggleComplete
}) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-slate-200">
              <th className="py-4">Task</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="border-b border-slate-100"
              >
                <td className="py-5 font-medium">
                  {task.title}
                </td>

                <td>
                  {task.description || "No description"}
                </td>

                <td>
                  <Badge
                    type={
                      task.completed
                        ? "success"
                        : "warning"
                    }
                  >
                    {task.completed
                      ? "Completed"
                      : "Pending"}
                  </Badge>
                </td>

                <td className="flex gap-3 py-4">
                  <Button
                    onClick={() =>
                      onToggleComplete(task)
                    }
                    className="bg-slate-800 hover:bg-slate-900"
                  >
                    {task.completed
                      ? "Reopen"
                      : "Complete"}
                  </Button>

                  <Button
                    onClick={() =>
                      onDelete(task.id)
                    }
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Delete
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