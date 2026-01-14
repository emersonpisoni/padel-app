import { http } from "./http";
import type { TournamentDTO } from "../types/dto";

export async function listTournaments(): Promise<TournamentDTO[]> {
  const { data } = await http.get("/tournaments");
  return data;
}

export async function getTournament(id: string): Promise<TournamentDTO> {
  const { data } = await http.get(`/tournaments/${id}`);
  return data;
}
