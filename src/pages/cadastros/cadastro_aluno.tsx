import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CadastroAlunoForm from "../../components/cadastros/cadastroAlunoForm";
import NavBarOrientador from "../../components/orientador/navbar_orientador";
// import { verificarAutenticacao } from "../../../utils/verificar_autenticaco";

const BACKEND_URL = import.meta.env.VITE_URL_BACKEND + "upload/alunos";

export default function CadastroAluno() {
  const [autenticado, setAutenticado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [statusUpload, setStatusUpload] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // async function autenticar() {
    //   try {
    //     // const resultado = await verificarAutenticacao();
    //     if (resultado.autenticado) {
    //       setAutenticado(true);
    //     } else {
    //       setErro(resultado.erro || "Usuário não autenticado.");
    //       navigate("/", { replace: true });
    //     }
    //   } catch (err) {
    //     console.error("Erro na autenticação:", err);
    //     setErro("Erro ao verificar autenticação.");
    //     navigate("/", { replace: true });
    //   }
    // }
    // autenticar();
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

  const handleUpload = async () => {
    if (!arquivo) {
      setStatusUpload("Por favor, selecione um arquivo CSV antes de enviar.");
      return;
    }

    const formData = new FormData();
    formData.append("file", arquivo);

    try {
      setStatusUpload("Enviando...");
      const token = localStorage.getItem("authToken");

      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      setStatusUpload("Upload concluído com sucesso!");
    } catch (error) {
      console.error(error);
      setStatusUpload("Falha ao enviar o arquivo. Tente novamente.");
    }
  };

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

          <div className="mt-6 flex w-full flex-col items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-800">
              Upload de Alunos via CSV
            </h2>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setArquivo(e.target.files?.[0] || null)}
              className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-white p-2 text-sm text-gray-700 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700"
            />

            <button
              onClick={handleUpload}
              className="rounded-lg bg-green-600 px-6 py-2 font-semibold text-white transition hover:bg-green-700"
            >
              Enviar CSV
            </button>

            {statusUpload && (
              <p
                className={`text-sm ${
                  statusUpload.includes("sucesso")
                    ? "text-green-600"
                    : statusUpload.includes("Falha")
                    ? "text-red-600"
                    : "text-gray-700"
                }`}
              >
                {statusUpload}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}