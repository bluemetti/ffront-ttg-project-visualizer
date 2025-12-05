// src/utils/buscarEmpresas.ts
import { getAuthHeaders } from "./getAuthHeaders.tsx";

export type EmpresaAPI = {
  id_empresa: number;
  nome: string;
  cnpj: string;
  descricao: string;
};

const API_EMPRESAS = import.meta.env.VITE_URL_BACKEND + "empresas";

export async function buscarEmpresas(): Promise<EmpresaAPI[]> {
  const headers = getAuthHeaders();
  const res = await fetch(API_EMPRESAS, {
    method: "GET",
    headers,
  });
  if (!res.ok) {
    throw new Error(`Erro ao carregar empresas (status ${res.status})`);
  }
  const data: EmpresaAPI[] = await res.json();
  return data;
}
