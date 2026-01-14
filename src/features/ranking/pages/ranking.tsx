import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRanking } from "../../../api/ranking";

export function RankingPage() {
  // no MVP, um select simples; depois você busca /ranking-categories
  const [rankingCategoryId, setRankingCategoryId] = useState<string>("");

  const enabled = Boolean(rankingCategoryId);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["ranking", rankingCategoryId],
    queryFn: () => getRanking({ rankingCategoryId }),
    enabled,
  });

  const rows = useMemo(() => data ?? [], [data]);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Ranking</h1>

      <div className="rounded border bg-white p-4 space-y-2">
        <label className="text-sm text-gray-700">Categoria</label>
        <input
          value={rankingCategoryId}
          onChange={(e) => setRankingCategoryId(e.target.value)}
          placeholder="Cole o ID (MVP) — depois virá de um select"
          className="w-full rounded border px-3 py-2"
        />
        <div className="text-xs text-gray-500">
          Próximo passo: carregar /ranking-categories e trocar por dropdown.
        </div>
      </div>

      {!enabled && <div className="text-sm text-gray-600">Selecione uma categoria para ver o ranking.</div>}
      {isLoading && <div>Carregando ranking...</div>}
      {isError && <div>Falha ao carregar ranking.</div>}

      {enabled && !isLoading && !isError && (
        <div className="rounded border bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3">#</th>
                <th className="text-left p-3">Jogador</th>
                <th className="text-left p-3">Pontos</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.playerId} className="border-t">
                  <td className="p-3">{r.position}</td>
                  <td className="p-3">{r.playerName}</td>
                  <td className="p-3">{r.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
