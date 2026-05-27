import {
  LayoutDashboard,
  CheckSquare,
  Users,
  Shield,
  LogOut
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menu = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard"
    },
    {
      icon: CheckSquare,
      label: "Tasks",
      path: "/tasks"
    },
    {
      icon: Users,
      label: "Teams",
      path: "/teams"
    }
  ];

  if (user?.role === "admin") {
    menu.push({
      icon: Shield,
      label: "Admin",
      path: "/admin"
    });
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-72 min-h-screen bg-white border-r border-slate-200 flex flex-col">
      <div className="p-8 border-b border-slate-200">
        <h1 className="text-2xl font-bold tracking-tight">
          TaskCollab
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item, index) => {
          const Icon = item.icon;

          return (
            <Link
              key={index}
              to={item.path}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition"
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200 space-y-4">
        <div className="bg-slate-100 rounded-xl p-4">
          <p className="font-medium">
            {user?.username || "Guest"}
          </p>

          <p className="text-sm text-slate-500">
            {user?.email || ""}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}