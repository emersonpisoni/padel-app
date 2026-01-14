import { http } from "./http";
import type { RankingRowDTO } from "../types/dto";

export async function getRanking(params: { rankingCategoryId: string; season?: string }): Promise<RankingRowDTO[]> {
  const { data } = await http.get("/ranking", { params });
  return data;
}
