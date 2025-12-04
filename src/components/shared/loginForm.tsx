import React, { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState();
  const [error, setError] = useState<string | null>(null);

  function loginHandleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !senha) {
      setError("Por favor, preencha o e-mail e a senha.");
      return;
    }

    console.log("Validação OK. Campos preenchidos:", { email, senha });
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

      <p className="cursor-pointer text-center text-black underline hover:text-[#005EAD]">
        Esqueceu a senha? ➔<a href=""></a>
      </p>
    </form>
  );
}