export default function AuthLayout({
  title,
  subtitle,
  children
}) {
  return (
    <div className="min-h-screen grid grid-cols-2 bg-slate-50">
      {/* LEFT */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-700 text-white p-16 flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            TaskCollab
          </h1>
        </div>

        <div>
          <h2 className="text-5xl font-bold leading-tight">
            Manage work
            <br />
            with clarity.
          </h2>

          <p className="mt-6 text-slate-300 text-lg max-w-lg">
            Enterprise collaboration platform for teams,
            projects, task execution, and productivity.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-2xl p-6">
            <h3 className="text-3xl font-bold">128+</h3>
            <p className="text-slate-300 mt-2">Tasks Managed</p>
          </div>

          <div className="bg-white/10 rounded-2xl p-6">
            <h3 className="text-3xl font-bold">24</h3>
            <p className="text-slate-300 mt-2">Teams Active</p>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <div className="bg-white border border-slate-200 shadow-xl rounded-3xl p-10">
            <h1 className="text-3xl font-bold text-slate-900">
              {title}
            </h1>

            <p className="text-slate-500 mt-2 mb-8">
              {subtitle}
            </p>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}