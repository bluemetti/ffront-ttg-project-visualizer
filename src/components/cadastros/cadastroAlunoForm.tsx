import React, { useState } from "react";

const cursos = [
  { id: 1, nome: "Engenharia de Software" },
  { id: 2, nome: "Ciência da Computação" },
  { id: 3, nome: "Sistemas de Informação" },
  { id: 4, nome: "Engenharia Elétrica" },
  { id: 5, nome: "Engenharia de Computação" },
  { id: 6, nome: "Engenharia Mecânica" },
  { id: 7, nome: "Engenharia Química" },
];

const API_URL_ALUNOS = import.meta.env.VITE_URL_BACKEND + "alunos";

export default function CadastroAlunoForm() {
  const [nome, setNome] = useState("");
  const [ra, setRa] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [curso, setCurso] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!nome || !ra || !telefone || !email || !curso) {
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
        email,
        telefone,
        ra,
        curso,
      };

      const response = await fetch(API_URL_ALUNOS, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccess("Aluno cadastrado com sucesso!");
        setNome("");
        setRa("");
        setTelefone("");
        setEmail("");
        setCurso("");
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
      <div className="mb-4 flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Nome completo
          </label>
          <input
            className="w-full rounded-md border border-gray-300 bg-[#C9C9C9] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005EAD]"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            R.A
          </label>
          <input
            className="w-full rounded-md border border-gray-300 bg-[#C9C9C9] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005EAD]"
            value={ra}
            onChange={(e) => setRa(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Telefone (WhatsApp)
          </label>
          <input
            className="w-full rounded-md border border-gray-300 bg-[#C9C9C9] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005EAD]"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>
      </div>

      <label className="mb-1 block text-sm font-medium text-gray-700">
        E-mail Institucional
      </label>
      <input
        className="w-full rounded-md border border-gray-300 bg-[#C9C9C9] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005EAD]"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="mt-4 mb-1 block text-sm font-medium text-gray-700">
        Curso
      </label>
      <select
        className="w-full rounded-md border border-gray-300 bg-[#C9C9C9] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005EAD]"
        value={curso}
        onChange={(e) => setCurso(e.target.value)}
      >
        <option value="">Selecione um curso</option>
        {cursos.map((c) => (
          <option key={c.id} value={c.nome}>
            {c.nome}
          </option>
        ))}
      </select>

      {error && <p className="mt-4 text-center text-red-600">{error}</p>}
      {success && <p className="mt-4 text-center text-green-600">{success}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 cursor-pointer self-center rounded-md bg-[#EB521B] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#c44a1d] disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {loading ? "Cadastrando..." : "Cadastrar ➔"}
      </button>
    </form>
  );
}