import { useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

export default function CreateTeamModal({
  isOpen,
  onClose,
  onCreate
}) {
  const [team, setTeam] = useState({
    name: "",
    description: ""
  });

  const handleSubmit = async () => {
    await onCreate(team);

    setTeam({
      name: "",
      description: ""
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-6">
        Create Team
      </h2>

      <div className="space-y-4">
        <input
          value={team.name}
          placeholder="Team Name"
          className="w-full border border-slate-200 rounded-xl px-4 py-3"
          onChange={(e) =>
            setTeam({
              ...team,
              name: e.target.value
            })
          }
        />

        <textarea
          value={team.description}
          rows="4"
          placeholder="Description"
          className="w-full border border-slate-200 rounded-xl px-4 py-3"
          onChange={(e) =>
            setTeam({
              ...team,
              description: e.target.value
            })
          }
        />

        <Button
          onClick={handleSubmit}
          className="w-full"
        >
          Create Team
        </Button>
      </div>
    </Modal>
  );
}