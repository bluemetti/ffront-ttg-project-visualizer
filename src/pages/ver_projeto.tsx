import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarOrientador from "../components/orientador/navbar_orientador";
import { getAuthHeaders } from "../utils/getAuthHeaders";

interface ProjetoDetalhes {
  id_projeto: number;
  nome_projeto: string;
  orientador_tecnico: string;
  empresa_demandante: string;
  semestre_inicial: string;
  fase: string;
  descricao: string;
  status: string;
  alunos?: string[]; // Array de nomes dos alunos
}

const BASE_URL = import.meta.env.VITE_URL_BACKEND;

export default function VerProjeto() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [projeto, setProjeto] = useState<ProjetoDetalhes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjeto = async () => {
      try {
        setLoading(true);
        setError(null);

        const headers = getAuthHeaders();
        const response = await fetch(
          `${BASE_URL}projetos/${id}`,
          {
            method: "GET",
            headers,
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao carregar os detalhes do projeto");
        }

        const data = await response.json();
        console.log("Dados completos do projeto:", data);
        setProjeto(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro desconhecido"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProjeto();
    }
  }, [id]);

  const handleVoltar = () => {
    navigate("/dashboard/projetos");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#003366] via-[#004080] to-[#0059b3]">
        <NavbarOrientador />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-white text-xl">Carregando...</div>
        </div>
      </div>
    );
  }

  if (error || !projeto) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#003366] via-[#004080] to-[#0059b3]">
        <NavbarOrientador />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <p className="text-red-300 text-xl mb-4">
              {error || "Projeto não encontrado"}
            </p>
            <button
              onClick={handleVoltar}
              className="rounded-lg bg-[#EB521B] px-6 py-2 font-semibold text-white transition hover:bg-[#c54516]"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[url('./assets/login-bg.png')] bg-cover bg-center bg-no-repeat">
      <div className="fixed top-0 left-0 z-50 w-full">
        <NavbarOrientador />
      </div>

      <div className="flex min-h-screen flex-col items-center justify-center px-4 pt-[80px]">
        <div className="w-full max-w-4xl rounded-xl bg-white p-8 shadow-2xl">
          {/* Header */}
          <div className="mb-6 border-b border-gray-300 pb-4">
            <h1 className="text-3xl font-bold text-[#003366] text-center">
              Detalhes do Projeto
            </h1>
          </div>

          {/* Informações do Projeto */}
          <div className="space-y-6">
            {/* Nome do Projeto */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nome do Projeto
              </label>
              <div className="rounded-lg bg-gray-100 p-4">
                <p className="text-lg text-gray-900">{projeto.nome_projeto}</p>
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descrição
              </label>
              <div className="rounded-lg bg-gray-100 p-4">
                <p className="text-gray-900 whitespace-pre-wrap">
                  {projeto.descricao}
                </p>
              </div>
            </div>

            {/* Grid de Informações */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Semestre Inicial */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Semestre Inicial
                </label>
                <div className="rounded-lg bg-gray-100 p-4">
                  <p className="text-gray-900">{projeto.semestre_inicial}</p>
                </div>
              </div>

              {/* Fase */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fase
                </label>
                <div className="rounded-lg bg-gray-100 p-4">
                  <p className="text-gray-900">{projeto.fase}</p>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <div className="rounded-lg bg-gray-100 p-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      projeto.status === "Ativo"
                        ? "bg-green-200 text-green-800"
                        : projeto.status === "Concluído"
                        ? "bg-blue-200 text-blue-800"
                        : "bg-gray-300 text-gray-800"
                    }`}
                  >
                    {projeto.status}
                  </span>
                </div>
              </div>

              {/* Empresa */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Empresa Demandante
                </label>
                <div className="rounded-lg bg-gray-100 p-4">
                  <p className="text-gray-900">{projeto.empresa_demandante}</p>
                </div>
              </div>
            </div>

            {/* Orientador */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Orientador Técnico
              </label>
              <div className="rounded-lg bg-gray-100 p-4">
                <p className="text-lg text-gray-900">
                  {projeto.orientador_tecnico}
                </p>
              </div>
            </div>

            {/* Alunos */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Alunos do Projeto
              </label>
              <div className="rounded-lg bg-gray-100 p-4 space-y-2">
                {projeto.alunos && projeto.alunos.length > 0 ? (
                  projeto.alunos.map((nomeAluno, index) => (
                    <div key={index} className="flex items-center border-b border-gray-300 pb-2 last:border-b-0 last:pb-0">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#003366] text-white font-semibold">
                          {index + 1}
                        </span>
                        <p className="text-gray-900 font-medium">{nomeAluno}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 italic">Nenhum aluno vinculado ao projeto</p>
                )}
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="mt-8 flex justify-center border-t border-gray-300 pt-6">
            <button
              onClick={handleVoltar}
              className="rounded-lg bg-[#EB521B] px-6 py-2 font-semibold text-white transition hover:bg-[#c54516]"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
