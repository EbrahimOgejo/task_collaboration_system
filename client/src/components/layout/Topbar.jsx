import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-3 text-slate-400"
        />

        <input
          placeholder="Search tasks, teams..."
          className="pl-10 pr-4 py-2 w-96 border border-slate-200 rounded-xl outline-none"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full" />
        </button>

        <div className="w-10 h-10 rounded-full bg-slate-200" />
      </div>
    </header>
  );
}