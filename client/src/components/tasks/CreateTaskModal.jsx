import { useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

export default function CreateTaskModal({
  isOpen,
  onClose,
  onCreate
}) {
  const [task, setTask] = useState({
    title: "",
    description: ""
  });

  const handleSubmit = async () => {
    await onCreate(task);

    setTask({
      title: "",
      description: ""
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-6">
        Create Task
      </h2>

      <div className="space-y-4">
        <input
          value={task.title}
          placeholder="Task title"
          className="w-full border border-slate-200 rounded-xl px-4 py-3"
          onChange={(e) =>
            setTask({
              ...task,
              title: e.target.value
            })
          }
        />

        <textarea
          value={task.description}
          rows="4"
          placeholder="Description"
          className="w-full border border-slate-200 rounded-xl px-4 py-3"
          onChange={(e) =>
            setTask({
              ...task,
              description: e.target.value
            })
          }
        />

        <Button
          onClick={handleSubmit}
          className="w-full"
        >
          Create Task
        </Button>
      </div>
    </Modal>
  );
}