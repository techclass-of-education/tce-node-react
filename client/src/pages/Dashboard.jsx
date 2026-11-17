import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const stats = [
  { label: "Total projects", value: "12" },
  { label: "Open tasks", value: "34" },
  { label: "Completed", value: "128" },
];

const activity = [
  { id: 1, title: "Website redesign", status: "In progress", date: "Nov 14" },
  { id: 2, title: "Mobile app launch", status: "Completed", date: "Nov 12" },
  { id: 3, title: "Marketing report", status: "Pending", date: "Nov 10" },
];

const statusStyles = {
  "In progress": "bg-amber-50 text-amber-700",
  Completed: "bg-green-50 text-green-700",
  Pending: "bg-slate-100 text-slate-600",
};

export default function Dashboard() {
  const navigate = useNavigate();
  const user = useLocation().state?.user || {};
  // console.log(user)
  
  function handleAllProfiles(e)
  {
    navigate("/profiles")
  }

  const handleLogout = async () => {
    const res=await axios.get("http://localhost:5000/user/logout",{withCredentials:true})
    localStorage.setItem("currentUser",false)
    alert(res.data.msg)
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top bar */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <span className="text-lg font-semibold text-indigo-600">Dashboard</span>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-slate-600 sm:block">{user.email}</span>
            <button
              onClick={handleAllProfiles}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              All Profiles
            </button>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-semibold text-slate-900">
          Hello, {user.name || "there"}
        </h1>
        
        <p className="mt-1 text-sm text-slate-500">Here's what's happening today.</p>

        {/* Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{s.label}</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Recent activity */}
        <div className="mt-6 rounded-xl bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">Recent activity</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="pb-2 font-medium">Project</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {activity.map((a) => (
                  <tr key={a.id} className="border-b border-slate-100 last:border-0">
                    <td className="py-3 font-medium text-slate-800">{a.title}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[a.status]}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="py-3 text-slate-500">{a.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
