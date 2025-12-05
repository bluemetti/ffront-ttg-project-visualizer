// src/utils/buscarAlunos.ts

import { getAuthHeaders } from "./getAuthHeaders";
import type { Aluno } from "./types";

const API_URL_ALUNOS = import.meta.env.VITE_URL_BACKEND + "alunos/";

export async function buscarAlunos(): Promise<Aluno[]> {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Token ausente. Faça login novamente.");
  }

  try {
    const headers = getAuthHeaders();
    const response = await fetch(API_URL_ALUNOS, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(
        response.status === 401
          ? "Token inválido ou expirado."
          : `Erro no servidor (status ${response.status}).`,
      );
    }

    const data: Aluno[] = await response.json();
    return data;
  } catch (error: any) {
    console.error("Erro ao buscar alunos:", error);
    throw new Error(error.message || "Erro ao buscar alunos.");
  }
}
