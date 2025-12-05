import React, { useState } from "react";

const API_URL_EMPRESAS = import.meta.env.VITE_URL_BACKEND + "empresas";

export default function CadastroEmpresaForm() {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [descricao, setDescricao] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const formatarCNPJ = (valor: string) => {
    // Remove tudo que não é dígito
    const numeros = valor.replace(/\D/g, "");
    
    // Aplica a máscara 00.000.000/0000-00
    if (numeros.length <= 2) {
      return numeros;
    } else if (numeros.length <= 5) {
      return `${numeros.slice(0, 2)}.${numeros.slice(2)}`;
    } else if (numeros.length <= 8) {
      return `${numeros.slice(0, 2)}.${numeros.slice(2, 5)}.${numeros.slice(5)}`;
    } else if (numeros.length <= 12) {
      return `${numeros.slice(0, 2)}.${numeros.slice(2, 5)}.${numeros.slice(5, 8)}/${numeros.slice(8)}`;
    } else {
      return `${numeros.slice(0, 2)}.${numeros.slice(2, 5)}.${numeros.slice(5, 8)}/${numeros.slice(8, 12)}-${numeros.slice(12, 14)}`;
    }
  };

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarCNPJ(e.target.value);
    setCnpj(valorFormatado);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!nome || !cnpj || !descricao) {
      setError("Por favor, preencha todos os campos.");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Autenticação necessária.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        nome,
        cnpj,
        descricao,
      };

      const response = await fetch(API_URL_EMPRESAS, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccess("Empresa cadastrada com sucesso!");
        setNome("");
        setCnpj("");
        setDescricao("");
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.detail || "Falha no cadastro.");
      }
    } catch (err) {
      console.error(err);
      setError("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="mx-auto flex w-full flex-col justify-center rounded-lg p-6"
      onSubmit={handleSubmit}
    >
      <div className="mb-4 flex flex-col gap-4">
        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Nome da Empresa
          </label>
          <input
            className="w-full rounded-md border border-gray-300 bg-[#C9C9C9] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005EAD]"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Moirel Modas"
          />
        </div>

        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            CNPJ
          </label>
          <input
            className="w-full rounded-md border border-gray-300 bg-[#C9C9C9] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005EAD]"
            value={cnpj}
            onChange={handleCNPJChange}
            placeholder="00.000.000/0000-00"
            maxLength={18}
          />
        </div>

        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Descrição
          </label>
          <textarea
            className="w-full rounded-md border border-gray-300 bg-[#C9C9C9] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005EAD]"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descreva a empresa..."
            rows={4}
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-md bg-green-100 p-3 text-green-700">
          {success}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-[#005EAD] py-2 text-white transition-colors hover:bg-[#004080] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Cadastrando..." : "Cadastrar Empresa"}
      </button>
    </form>
  );
}
