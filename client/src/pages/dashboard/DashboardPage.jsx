import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import StatsCards from "../../components/dashboard/StatsCards";
import TaskOverview from "../../components/dashboard/TaskOverview";
import ActivityFeed from "../../components/dashboard/ActivityFeed";

import { getDashboardStats } from "../../services/dashboardService";
import Spinner from "../../components/ui/Spinner";

export default function DashboardPage() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Live enterprise performance overview.
          </p>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <>
            <StatsCards stats={stats} />

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <TaskOverview />
              </div>

              <ActivityFeed />
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}