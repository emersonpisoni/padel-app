export type RankingGender = "M" | "F" | "X"; // masc, fem, misto (ou aberto)
export type Level = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export type RankingCategoryDTO = {
  id: string;
  name: string;          // "Intermediário Masculino"
  level: Level;
  gender: RankingGender;
};

export type TournamentDTO = {
  id: string;
  name: string;
  startDate: string; // ISO
  city?: string;
  status: "DRAFT" | "PUBLISHED" | "ONGOING" | "FINISHED";
};

export type TournamentCategoryDTO = {
  id: string;
  tournamentId: string;
  rankingCategory: RankingCategoryDTO;
  weight: number;
  status: "OPEN" | "LOCKED" | "RUNNING" | "CLOSED";
};

export type RankingRowDTO = {
  position: number;
  playerId: string;
  playerName: string;
  points: number;
};
