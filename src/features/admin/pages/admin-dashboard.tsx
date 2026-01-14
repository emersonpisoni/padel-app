import { Link } from "react-router-dom";

export function AdminDashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Admin</h1>
      <div className="rounded border bg-white p-4">
        <Link className="underline" to="/admin/tournaments/new">
          Criar torneio
        </Link>
      </div>
    </div>
  );
}
