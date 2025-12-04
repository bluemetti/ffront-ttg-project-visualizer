import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Componentes
import ProjectList from "../../src/components/shared/dashboard_geral_projetos/projectList";

// Utils
import { verificarAutenticacao } from "../utils/verificarAutenticacao"; 
import { buscarProjetos, type ProjetoAPI } from "../utils/buscarProjetos";

export default function DashboardGeralProjetos() {
  const [autenticado, setAutenticado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [projetos, setProjetos] = useState<ProjetoAPI[]>([]);
  const [carregandoProjetos, setCarregandoProjetos] = useState(true);

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
      setCarregandoProjetos(true);
      try {
        const data = await buscarProjetos();
        setProjetos(data);
      } catch (error: any) {
        setErro(error.message || "Erro ao carregar projetos.");
      } finally {
        setCarregandoProjetos(false);
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


  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-12 bg-[url('./assets/login-bg.png')] bg-cover bg-center bg-no-repeat">
      
      <h1 className="font-rift mb-2 text-center text-5xl font-bold tracking-wide text-green-400 subpixel-antialiased mt-12">
        PROJETOS
      </h1>
      
      <main className="flex w-full max-w-7xl flex-1 flex-col items-center px-4 pb-12">
        {carregandoProjetos ? (
          <div className="w-full rounded-lg bg-[#D9D9D9] p-8 text-center text-gray-600">
            Carregando lista de projetos...
          </div>
        ) : (
          <div className="min-h-content w-full rounded-lg bg-[#D9D9D9] shadow-lg">
            <ProjectList projetos={projetos} />
          </div>
        )}
      </main>
    </div>
  );
}