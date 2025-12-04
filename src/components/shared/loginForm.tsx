import React, { useState } from "react";

// // Navegação após login não implementada
import { useNavigate } from "react-router-dom";

const API_URL_AUTH = import.meta.env.VITE_URL_BACKEND + "auth/login";

interface LoginResponse {
  access_token: string;
  token_type: string;
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function loginHandleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    if (!email || !senha) {
      setError("Por favor, preencha o e-mail e a senha.");
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch(API_URL_AUTH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
      
      if (response.ok) {
        const data: LoginResponse = await response.json();
        const token = data.access_token;
  
        localStorage.setItem("authToken", token);
        


        navigate("/orientador/dashboard/projetos");

      } else {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Erro desconhecido" }));
        const errorMessage =
          errorData.detail || "Credenciais inválidas ou erro no servidor.";
        setError(
          `Falha na autenticação: ${errorMessage} (Status: ${response.status})`,
        );
      }
    } catch (error) {
      console.error("Erro de conexão/requisição:", error);
      setError("Erro de conexão. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="flex w-full flex-col items-center gap-3"
      onSubmit={loginHandleSubmit}
    >
      <div className="flex w-full flex-col items-center">
        <label
          htmlFor="email"
          className="mb-1 self-start text-sm font-medium text-gray-700"
        >
          E-mail
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-10 w-full rounded border border-gray-300 bg-[#c5c5c5] p-4 focus:outline-none"
        />
      </div>
      <div className="flex w-full flex-col items-center">
        <label
          htmlFor="senha"
          className="mb-1 self-start text-sm font-medium text-gray-700"
        >
          Senha
        </label>
        <input
          type="password"
          id="senha"
          name="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="h-10 w-full rounded border border-gray-300 bg-[#c5c5c5] p-4 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="h h-13 w-64 cursor-pointer self-center rounded-2xl bg-[#EB521B] p-2 text-gray-300 transition hover:bg-[#005EAD] hover:text-[#000000]"
      >
        {loading ? "Entrando..." : "Entrar ➔"}
      </button>

      {error && <p className="text-center text-red-600">{error}</p>}
    </form>
  );
}
