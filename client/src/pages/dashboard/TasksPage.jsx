import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import TaskTable from "../../components/tasks/TaskTable";
import Button from "../../components/ui/Button";
import CreateTaskModal from "../../components/tasks/CreateTaskModal";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "../../services/taskService";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreate = async (payload) => {
    await createTask(payload);
    await loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    await loadTasks();
  };

  const handleToggleComplete = async (task) => {
    await updateTask(task.id, {
      completed: !task.completed
    });

    await loadTasks();
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">
              Tasks
            </h1>

            <p className="text-slate-500 mt-2">
              Manage your work items.
            </p>
          </div>

          <Button
            onClick={() => setShowModal(true)}
          >
            New Task
          </Button>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <TaskTable
            tasks={tasks}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
          />
        )}

        <CreateTaskModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onCreate={handleCreate}
        />
      </div>
    </DashboardLayout>
  );
}