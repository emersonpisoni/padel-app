export type RankingCategory = {
  id: string;
  name: string; // "Intermediário Masculino"
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  gender: "M" | "F" | "X";
};

export type RankingRow = {
  playerId: string;
  playerName: string;
  points: number;
  tournamentsPlayed: number;
  lastResultAt: string; // ISO date (para tie-break simples)
  rankingCategoryId: string;
};

export const rankingCategoriesMock: RankingCategory[] = [
  { id: "rc-im", name: "Intermediário Masculino", level: "INTERMEDIATE", gender: "M" },
  { id: "rc-if", name: "Intermediário Feminino", level: "INTERMEDIATE", gender: "F" },
  { id: "rc-ax", name: "Avançado Misto", level: "ADVANCED", gender: "X" },
  { id: "rc-bm", name: "Iniciante Masculino", level: "BEGINNER", gender: "M" },
];

export const rankingRowsMock: RankingRow[] = [
  { playerId: "p1", playerName: "Bruno Almeida", points: 540, tournamentsPlayed: 6, lastResultAt: "2026-01-05", rankingCategoryId: "rc-im" },
  { playerId: "p2", playerName: "Caio Ribeiro", points: 540, tournamentsPlayed: 5, lastResultAt: "2026-01-10", rankingCategoryId: "rc-im" },
  { playerId: "p3", playerName: "Diego Santos", points: 420, tournamentsPlayed: 4, lastResultAt: "2025-12-18", rankingCategoryId: "rc-im" },
  { playerId: "p4", playerName: "Felipe Costa", points: 380, tournamentsPlayed: 7, lastResultAt: "2025-11-30", rankingCategoryId: "rc-im" },

  { playerId: "p5", playerName: "Ana Paula", points: 610, tournamentsPlayed: 6, lastResultAt: "2026-01-02", rankingCategoryId: "rc-if" },
  { playerId: "p6", playerName: "Mariana Souza", points: 460, tournamentsPlayed: 4, lastResultAt: "2025-12-20", rankingCategoryId: "rc-if" },

  { playerId: "p7", playerName: "Lucas Martins", points: 720, tournamentsPlayed: 7, lastResultAt: "2026-01-08", rankingCategoryId: "rc-ax" },
  { playerId: "p8", playerName: "Patrícia Lima", points: 680, tournamentsPlayed: 6, lastResultAt: "2025-12-28", rankingCategoryId: "rc-ax" },

  { playerId: "p9", playerName: "Rafael Silva", points: 210, tournamentsPlayed: 3, lastResultAt: "2026-01-01", rankingCategoryId: "rc-bm" },
];
