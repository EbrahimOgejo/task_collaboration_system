import Card from "../ui/Card";
import Button from "../ui/Button";

export default function TeamCard({
  team,
  onJoin,
  onLeave
}) {
  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">
            {team.name}
          </h2>

          <p className="text-slate-500 mt-2">
            {team.description}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            Members
          </p>

          <div className="mt-3 space-y-2">
            {team.members?.length > 0 ? (
              team.members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2"
                >
                  <div>
                    <p className="font-medium">
                      {member.username}
                    </p>

                    <p className="text-xs text-slate-500">
                      {member.email}
                    </p>
                  </div>

                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
                    {member.role}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-sm">
                No members yet.
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            onClick={() => onJoin(team.id)}
          >
            Join
          </Button>

          <Button
            variant="secondary"
            onClick={() => onLeave(team.id)}
          >
            Leave
          </Button>
        </div>
      </div>
    </Card>
  );
}