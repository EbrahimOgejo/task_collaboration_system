import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/ui/Button";
import TeamCard from "../../components/teams/TeamCard";
import CreateTeamModal from "../../components/teams/CreateTeamModal";
import Spinner from "../../components/ui/Spinner";

import {
  getTeams,
  createTeam,
  joinTeam,
  leaveTeam
} from "../../services/teamService";

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadTeams = async () => {
    try {
      const data = await getTeams();
      setTeams(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const handleCreate = async (payload) => {
    await createTeam(payload);
    await loadTeams();
  };

  const handleJoin = async (id) => {
    await joinTeam(id);
    await loadTeams();
  };

  const handleLeave = async (id) => {
    await leaveTeam(id);
    await loadTeams();
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">
              Teams
            </h1>

            <p className="text-slate-500 mt-2">
              Collaborate across departments.
            </p>
          </div>

          <Button onClick={() => setShowModal(true)}>
            Create Team
          </Button>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {teams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                onJoin={handleJoin}
                onLeave={handleLeave}
              />
            ))}
          </div>
        )}

        <CreateTeamModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onCreate={handleCreate}
        />
      </div>
    </DashboardLayout>
  );
}