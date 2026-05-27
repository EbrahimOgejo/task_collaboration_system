import DashboardLayout from "../../components/layout/DashboardLayout";
import StatsCards from "../../components/dashboard/StatsCards";
import ActivityFeed from "../../components/dashboard/ActivityFeed";

export default function AdminDashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Administrative overview and platform controls.
          </p>
        </div>

        <StatsCards />

        <ActivityFeed />
      </div>
    </DashboardLayout>
  );
}