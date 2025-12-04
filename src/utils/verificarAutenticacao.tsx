// src/utils/auth.ts

export interface VerificacaoResultado {
  autenticado: boolean;
  erro: string | null;
}

/**
 * Função auxiliar para decodificar o JWT manualmente (sem bibliotecas externas).
 * Serve para ler a data de expiração (exp) de dentro do token.
 */
function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

/**
 * Verifica apenas se o usuário tem um token válido e não expirado.
 * Não verifica role/permissão.
 */
export async function verificarAutenticacao(): Promise<VerificacaoResultado> {
  // 1. Pega o token salvo no login
  const token = localStorage.getItem("authToken");

  // 🚫 Sem token → Não autenticado
  if (!token) {
    return {
      autenticado: false,
      erro: "Token ausente. Faça login novamente.",
    };
  }

  // 🕵️ Decodifica o token para ver se a estrutura é válida
  const decoded = parseJwt(token);

  // Se o token estiver quebrado (não for um JWT válido)
  if (!decoded) {
    localStorage.removeItem("authToken"); // Limpa o lixo
    return {
      autenticado: false,
      erro: "Token inválido ou corrompido.",
    };
  }

  // ⏳ Verifica Expiração (campo 'exp' do JWT é em segundos UNIX)
  const currentTime = Date.now() / 1000;
  
  if (decoded.exp && decoded.exp < currentTime) {
    localStorage.removeItem("authToken"); // Token venceu, remove
    return {
      autenticado: false,
      erro: "Sessão expirada. Faça login novamente.",
    };
  }

  // ✅ Se chegou aqui, o token existe, é legível e está no prazo de validade.
  return {
    autenticado: true,
    erro: null,
  };
}