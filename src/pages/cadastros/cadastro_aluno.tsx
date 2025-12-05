import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CadastroAlunoForm from "../../components/cadastros/cadastroAlunoForm";
import NavBarOrientador from "../../components/orientador/navbar_orientador";
import { verificarAutenticacao } from "../../utils/verificarAutenticacao";

export default function CadastroAluno() {
  const [autenticado, setAutenticado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
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

  if (!autenticado && !erro) {
    return (
      <div className="mt-6 text-center text-gray-500">
        Verificando autenticação...
      </div>
    );
  }

  if (erro) {
    return <div className="mt-6 text-center text-red-600">{erro}</div>;
  }

  return (
    <div className="relative min-h-screen w-full bg-[url('./assets/login-bg.png')] bg-cover bg-center bg-no-repeat">
      <div className="fixed top-0 left-0 z-50 w-full">
        <NavBarOrientador />
      </div>

      <div className="flex min-h-screen flex-col items-center justify-center px-4 pt-[80px]">
        <div className="flex w-full max-w-2xl flex-col items-center gap-6 rounded-2xl bg-[#D9D9D9] p-8 shadow-2xl backdrop-blur-md md:w-1/2">
          <h1 className="mb-2 text-center text-2xl font-bold text-gray-800">
            Cadastro de Aluno
          </h1>

          <CadastroAlunoForm />

        </div>
      </div>
    </div>
  );
}