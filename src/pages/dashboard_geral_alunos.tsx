import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Componentes
import NavbarOrientador from "../components/orientador/navbar_orientador";

// Utils
import { verificarAutenticacao } from "../utils/verificarAutenticacao";
import { buscarAlunos } from "../utils/buscarAlunos";
import type { Aluno } from "../utils/types";

export default function DashboardGeralAlunos() {
  const [autenticado, setAutenticado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [carregandoAlunos, setCarregandoAlunos] = useState(true);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 15;

  const navigate = useNavigate();

  useEffect(() => {
    async function autenticar() {
      try {
        const resultado = await verificarAutenticacao();

        if (resultado.autenticado) {
          setAutenticado(true);
        } else {
          setErro(resultado.erro || "Usuário não autenticado.");
          navigate("/", { replace: true });
        }
      } catch (err) {
        console.error("Erro na autenticação:", err);
        setErro("Erro ao verificar autenticação.");
        navigate("/", { replace: true });
      }
    }

    autenticar();
  }, [navigate]);

  useEffect(() => {
    if (!autenticado) return;

    async function carregar() {
      setCarregandoAlunos(true);
      try {
        const data = await buscarAlunos();
        setAlunos(data);
      } catch (error: any) {
        setErro(error.message || "Erro ao carregar alunos.");
      } finally {
        setCarregandoAlunos(false);
      }
    }

    carregar();
  }, [autenticado]);

  if (!autenticado && !erro) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
        <p className="text-gray-500">Verificando autenticação...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
        <p className="text-red-600 font-bold">{erro}</p>
      </div>
    );
  }

  // Cálculo da paginação
  const totalPaginas = Math.ceil(alunos.length / itensPorPagina);
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const alunosPagina = alunos.slice(inicio, fim);

  const proximaPagina = () => {
    if (paginaAtual < totalPaginas) setPaginaAtual(paginaAtual + 1);
  };

  const paginaAnterior = () => {
    if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
  };

  return (
    <div className="relative min-h-screen w-full bg-[url('./assets/login-bg.png')] bg-cover bg-center bg-no-repeat">
      <div className="fixed top-0 left-0 z-50 w-full">
        <NavbarOrientador />
      </div>

      <div className="flex min-h-screen flex-col items-center gap-12 pt-[80px]">
        <h1 className="font-rift mb-2 text-center text-5xl font-bold tracking-wide text-green-400 subpixel-antialiased mt-12">
          ALUNOS
        </h1>

        <main className="flex w-full max-w-7xl flex-1 flex-col items-center px-4 pb-12">
          {carregandoAlunos ? (
            <div className="w-full rounded-lg bg-[#D9D9D9] p-8 text-center text-gray-600">
              Carregando lista de alunos...
            </div>
          ) : alunos.length === 0 ? (
            <div className="w-full rounded-lg bg-[#D9D9D9] p-8 text-center text-gray-600">
              Nenhum aluno encontrado.
            </div>
          ) : (
            <div className="w-full rounded-lg bg-[#D9D9D9] shadow-lg p-6">
              {/* Tabela de Alunos */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-400">
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-800">
                        Nome
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-800">
                        RA
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-800">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-800">
                        Telefone
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-800">
                        Curso
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {alunosPagina.map((aluno, index) => (
                      <tr
                        key={aluno.id_usuario || index}
                        className="border-b border-gray-300 transition hover:bg-gray-200"
                      >
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {aluno.nome}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {aluno.ra || "—"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {aluno.email || "—"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {aluno.telefone || "—"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {aluno.curso || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Controles de paginação */}
              {totalPaginas > 1 && (
                <div className="mt-6 flex items-center justify-center gap-4">
                  <button
                    onClick={paginaAnterior}
                    disabled={paginaAtual === 1}
                    className={`rounded-lg px-4 py-2 font-semibold transition-colors ${
                      paginaAtual === 1
                        ? "cursor-not-allowed bg-gray-300 text-gray-500"
                        : "bg-[#EB521B] text-white hover:bg-[#c54516]"
                    }`}
                  >
                    Anterior
                  </button>

                  <span className="font-medium text-gray-700">
                    Página {paginaAtual} de {totalPaginas}
                  </span>

                  <button
                    onClick={proximaPagina}
                    disabled={paginaAtual === totalPaginas}
                    className={`rounded-lg px-4 py-2 font-semibold transition-colors ${
                      paginaAtual === totalPaginas
                        ? "cursor-not-allowed bg-gray-300 text-gray-500"
                        : "bg-[#EB521B] text-white hover:bg-[#c54516]"
                    }`}
                  >
                    Próximo
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
