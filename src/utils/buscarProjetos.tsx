// src/utils/buscarProjetos.ts

import { getAuthHeaders } from "./getAuthHeaders";

// 1. Ajuste na interface baseada no JSON real
export interface ProjetoAPI {
  id_projeto: number;
  nome_projeto: string;
  fase: string;
  empresa_demandante: string;
  orientador_tecnico: string;
  aluno_lider: string | null; // <-- Agora aceita null
  descricao: string;          // <-- Adicionado (veio no JSON)
  status: string;
  semestre_inicial: string;
  orientador_gestao?: string; // <-- Tornado opcional (não veio no JSON)
}

// Definindo a URL base para reutilizar
const BASE_URL = import.meta.env.VITE_URL_BACKEND;
const API_URL_PROJETOS = BASE_URL + "projetos/dashboard/all";

/**
 * Busca a lista de projetos do backend.
 */
export async function buscarProjetos(): Promise<ProjetoAPI[]> {
  try {
    const headers = getAuthHeaders();
    const response = await fetch(API_URL_PROJETOS, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`Erro ao carregar projetos (status ${response.status})`);
    }

    const data: ProjetoAPI[] = await response.json();
    console.log("Projetos carregados:", data);
    return data;
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    throw new Error("Erro ao carregar lista de projetos.");
  }
}

/**
 * Busca APENAS os projetos vinculados ao aluno logado.
 */
export async function buscarProjetosDoAluno(): Promise<ProjetoAPI[]> {
  try {
    const headers = getAuthHeaders();
    
    // ATENÇÃO: Verifique se no login você salvou como "userId" ou "id_usuario"
    // No login anterior estava salvando o token, certifique-se de salvar o ID também.
    const userId = localStorage.getItem("userId"); 
    
    if (!userId) {
      throw new Error("ID do usuário não encontrado. Faça login novamente.");
    }

    // 2. Correção: Usar a variável BASE_URL definida acima
    const response = await fetch(`${BASE_URL}alunos/perfil/${userId}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`Erro ao carregar perfil (status ${response.status})`);
    }

    const dadosPerfil = await response.json();
    
    // Retorna o array de projetos que vem dentro do perfil
    return dadosPerfil.projetos || []; 

  } catch (error) {
    console.error("Erro ao buscar projetos do aluno:", error);
    throw error; 
  }
}