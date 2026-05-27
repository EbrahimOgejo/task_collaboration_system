import Card from "../ui/Card";
import {
  CheckCircle,
  Clock,
  Users,
  Briefcase
} from "lucide-react";

export default function StatsCards({
  stats
}) {
  const cards = [
    {
      title: "Total Tasks",
      value: stats.total_tasks || 0,
      icon: CheckCircle
    },
    {
      title: "Completed",
      value: stats.completed_tasks || 0,
      icon: Briefcase
    },
    {
      title: "Pending",
      value: stats.pending_tasks || 0,
      icon: Clock
    },
    {
      title: "Teams",
      value: stats.teams || 0,
      icon: Users
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {cards.map((item, index) => {
        const Icon = item.icon;

        return (
          <Card key={index}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-sm">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold mt-3">
                  {item.value}
                </h2>
              </div>

              <div className="bg-blue-50 p-3 rounded-xl">
                <Icon
                  size={22}
                  className="text-blue-600"
                />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}