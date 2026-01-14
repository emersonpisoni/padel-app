import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTournament } from "../../../api/tournaments";

export function TournamentDetailPage() {
  const { id } = useParams();
  const tournamentId = id ?? "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tournament", tournamentId],
    queryFn: () => getTournament(tournamentId),
    enabled: Boolean(tournamentId),
  });

  if (isLoading) return <div>Carregando...</div>;
  if (isError || !data) return <div>Falha ao carregar o torneio.</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">{data.name}</h1>
      <div className="rounded border bg-white p-4 space-y-2">
        <div><span className="text-gray-600">Data:</span> {new Date(data.startDate).toLocaleDateString()}</div>
        <div><span className="text-gray-600">Cidade:</span> {data.city || "—"}</div>
        <div><span className="text-gray-600">Status:</span> {data.status}</div>
      </div>

      <div className="rounded border bg-white p-4">
        Próximo passo: listar categorias do torneio, inscrições e jogos.
      </div>
    </div>
  );
}
