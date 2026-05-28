import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  CheckSquare,
  Users,
  Shield,
  LogOut
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const navigation = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard
    },

    {
      label: "Tasks",
      path: "/tasks",
      icon: CheckSquare
    },

    {
      label: "Teams",
      path: "/teams",
      icon: Users
    }
  ];

  const adminNavigation = [
    {
      label: "User Management",
      path: "/admin/users",
      icon: Shield
    }
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-72 min-h-screen bg-slate-950 text-white flex flex-col">
      {/* LOGO */}
      <div className="px-8 py-8 border-b border-slate-800">
        <h1 className="text-4xl font-black tracking-tight">
          TaskCollab
        </h1>

        <p className="text-slate-400 text-sm mt-2">
          Enterprise Task Collaboration System
        </p>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={22} />

              <span className="font-medium">
                {item.label}
              </span>
            </NavLink>
          );
        })}

        {/* ADMIN NAVIGATION */}
        {user?.role === "admin" && (
          <>
            <div className="pt-8 pb-3 px-5">
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Administration
              </p>
            </div>

            {adminNavigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 ${
                      isActive
                        ? "bg-purple-600 text-white"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`
                  }
                >
                  <Icon size={22} />

                  <span className="font-medium">
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </>
        )}
      </nav>

      {/* FOOTER */}
      <div className="border-t border-slate-800 px-6 py-5 space-y-5">
        {/* USER INFO */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">
            {user?.username?.charAt(0)?.toUpperCase()}
          </div>

          <div>
            <p className="font-semibold">
              {user?.username}
            </p>

            <p className="text-sm text-slate-400 capitalize">
              {user?.role}
            </p>
          </div>
        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 transition-all duration-200 rounded-2xl py-3 font-semibold"
        >
          <LogOut size={20} />

          Logout
        </button>
      </div>
    </aside>
  );
}