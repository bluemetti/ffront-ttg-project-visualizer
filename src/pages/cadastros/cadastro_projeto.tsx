import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CadastroProjetoForm from "../../components/cadastros/cadastroProjeto/cadastroProjetoForm";
import NavBarOrientador from "../../components/orientador/navbar_orientador";
import { verificarAutenticacao } from "../../utils/verificarAutenticacao";

export default function CadastroProjeto() {
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
      <div className="text-center text-gray-500">
        Verificando autenticação...
      </div>
    );
  }

  if (erro) {
    return <div className="text-center text-red-600">{erro}</div>;
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[url('./assets/login-bg.png')] bg-cover bg-center bg-no-repeat">
      <div className="fixed top-0 left-0 z-50 w-full">
        <NavBarOrientador />
      </div>

      <div className="flex min-h-screen flex-col items-center justify-center px-4 pt-[80px]">
        <div className="flex w-full max-w-lg flex-col items-center gap-6 rounded-2xl bg-[#D9D9D9] p-6 shadow-2xl backdrop-blur-md md:max-w-xl md:p-8 lg:max-w-2xl">
          <h1 className="text-center text-xl font-bold text-gray-800 md:text-2xl">
            Cadastrar Projeto
          </h1>
          <CadastroProjetoForm />
        </div>
      </div>
    </div>
  );
}
