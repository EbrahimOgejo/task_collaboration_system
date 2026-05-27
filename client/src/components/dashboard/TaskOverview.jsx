import Card from "../ui/Card";

export default function TaskOverview() {
  return (
    <Card className="h-96">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Task Overview
        </h2>

        <span className="text-sm text-slate-500">
          Last 30 days
        </span>
      </div>

      <div className="flex items-end gap-6 h-72">
        {[45, 65, 30, 80, 55, 90, 70].map((height, i) => (
          <div
            key={i}
            className="flex-1 bg-blue-500 rounded-t-xl"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </Card>
  );
}