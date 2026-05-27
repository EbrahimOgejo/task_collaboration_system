import Card from "../ui/Card";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

export default function TeamCard({
  team,
  onJoin,
  onLeave
}) {
  return (
    <Card className="hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">
            {team.name}
          </h2>

          <p className="text-slate-500 mt-2">
            {team.description || "No description"}
          </p>
        </div>

        <Badge type="info">
          {team.members?.length || 0} Members
        </Badge>
      </div>

      <div className="flex mt-6 -space-x-3">
        {(team.members || []).map((member, index) => (
          <div
            key={index}
            className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center font-medium"
          >
            {member.username?.[0] || "U"}
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <Button
          className="flex-1"
          onClick={() => onJoin(team.id)}
        >
          Join
        </Button>

        <Button
          className="flex-1 bg-slate-800 hover:bg-slate-900"
          onClick={() => onLeave(team.id)}
        >
          Leave
        </Button>
      </div>
    </Card>
  );
}