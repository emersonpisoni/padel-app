import { useQuery } from "@tanstack/react-query";
import { listTournaments } from "../../../api/tournaments";
import { Link } from "react-router-dom";

export function TournamentsListPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tournaments"],
    queryFn: listTournaments,
  });

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Falha ao carregar torneios.</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Torneios</h1>

      <div className="grid gap-3">
        {data?.map((t) => (
          <Link key={t.id} to={`/tournaments/${t.id}`} className="rounded border bg-white p-4 hover:bg-gray-50">
            <div className="font-medium">{t.name}</div>
            <div className="text-sm text-gray-600">
              {new Date(t.startDate).toLocaleDateString()} • {t.city || "—"} • {t.status}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
