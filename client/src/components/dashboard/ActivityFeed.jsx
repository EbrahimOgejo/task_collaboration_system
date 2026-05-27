import Card from "../ui/Card";

const activities = [
  "John completed task 'Client onboarding'",
  "Sarah created a new team",
  "Admin added a new user",
  "Task deadline updated",
  "Project Alpha marked completed"
];

export default function ActivityFeed() {
  return (
    <Card className="h-96">
      <h2 className="text-xl font-semibold mb-6">
        Recent Activity
      </h2>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="border-b border-slate-100 pb-4"
          >
            <p className="text-slate-700">
              {activity}
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Just now
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}