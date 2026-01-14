import { useMemo, useState } from "react";
import { rankingCategoriesMock, rankingRowsMock, type RankingRow } from "../mocks";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type SortKey = "points" | "tournamentsPlayed" | "lastResultAt";
type SortDir = "desc" | "asc";

function compareRows(a: RankingRow, b: RankingRow, key: SortKey, dir: SortDir) {
  const mult = dir === "desc" ? -1 : 1;

  if (key === "lastResultAt") {
    const av = new Date(a.lastResultAt).getTime();
    const bv = new Date(b.lastResultAt).getTime();
    if (av === bv) return 0;
    return av < bv ? -1 * mult : 1 * mult;
  }

  const av = a[key];
  const bv = b[key];
  if (av === bv) return 0;
  return av < bv ? -1 * mult : 1 * mult;
}

export function RankingPage() {
  const [rankingCategoryId, setRankingCategoryId] = useState<string>(rankingCategoriesMock[0]?.id ?? "");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("points");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const selectedCategory = useMemo(
    () => rankingCategoriesMock.find((c) => c.id === rankingCategoryId),
    [rankingCategoryId]
  );

  const rows = useMemo(() => {
    const base = rankingRowsMock.filter((r) => r.rankingCategoryId === rankingCategoryId);

    const filtered = base.filter((r) =>
      r.playerName.toLowerCase().includes(search.trim().toLowerCase())
    );

    // Ordenação principal (ex.: pontos desc) + tie-breaks
    const sorted = [...filtered].sort((a, b) => {
      // chave escolhida
      const primary = compareRows(a, b, sortKey, sortDir);
      if (primary !== 0) return primary;

      // tie-break 1: pontos desc (se não for a chave principal)
      if (sortKey !== "points") {
        const t1 = compareRows(a, b, "points", "desc");
        if (t1 !== 0) return t1;
      }

      // tie-break 2: mais torneios jogados desc
      const t2 = compareRows(a, b, "tournamentsPlayed", "desc");
      if (t2 !== 0) return t2;

      // tie-break 3: resultado mais recente desc
      const t3 = compareRows(a, b, "lastResultAt", "desc");
      if (t3 !== 0) return t3;

      // tie-break final: nome asc
      return a.playerName.localeCompare(b.playerName);
    });

    // Calcula posição
    return sorted.map((r, i) => ({ ...r, position: i + 1 }));
  }, [rankingCategoryId, search, sortKey, sortDir]);

  function toggleSortDir() {
    setSortDir((d) => (d === "desc" ? "asc" : "desc"));
  }

  return (
    <div className="">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Ranking</h1>
          <p className="text-sm text-muted-foreground">
            Dados mockados (MVP). Em seguida conectamos ao backend.
          </p>
        </div>
        {selectedCategory && (
          <Badge variant="secondary" className="mt-1">
            {selectedCategory.name}
          </Badge>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Filtros</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <div className="space-y-2">
            <div className="text-sm font-medium">Categoria</div>
            <Select value={rankingCategoryId} onValueChange={setRankingCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                {rankingCategoriesMock.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Buscar jogador</div>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ex.: Bruno"
            />
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Ordenação</div>
            <div className="flex gap-2">
              <Select value={sortKey} onValueChange={(v) => setSortKey(v as SortKey)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="points">Pontos</SelectItem>
                  <SelectItem value="tournamentsPlayed">Torneios</SelectItem>
                  <SelectItem value="lastResultAt">Mais recente</SelectItem>
                </SelectContent>
              </Select>

              <Button type="button" variant="outline" onClick={toggleSortDir}>
                {sortDir === "desc" ? "Desc" : "Asc"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Classificação</CardTitle>
          <div className="text-sm text-muted-foreground">
            {rows.length} jogador(es)
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">#</TableHead>
                  <TableHead>Jogador</TableHead>
                  <TableHead className="text-right">Pontos</TableHead>
                  <TableHead className="text-right">Torneios</TableHead>
                  <TableHead className="text-right">Último</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.playerId}>
                    <TableCell className="font-medium">{(r as any).position}</TableCell>
                    <TableCell>{r.playerName}</TableCell>
                    <TableCell className="text-right">{r.points}</TableCell>
                    <TableCell className="text-right">{r.tournamentsPlayed}</TableCell>
                    <TableCell className="text-right">
                      {new Date(r.lastResultAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}

                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                      Nenhum jogador encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
