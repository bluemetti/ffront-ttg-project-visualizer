import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBarOrientador() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown se clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    localStorage.removeItem("authToken");
    // console.log("Usuário deslogado com sucesso.");
    navigate("/");
  }
  const nome = localStorage.getItem("userName") || "ORIENTADOR";
  const primeiroNome = nome.split(" ")[0].toUpperCase();
  return (
    <nav className="relative box-border flex h-[60px] w-full items-center justify-between border-t-2 border-[#222] bg-[#0366b0] px-4">
      {/* Esquerda: saudação e sair */}
      <div className="flex items-center">
        <span className="font-oswald mr-2 text-[28px] font-normal tracking-wider text-white">
          OLÁ,
          <span className="ml-1 font-medium text-[#6ee04e]">
            {primeiroNome}!
          </span>
        </span>
        <button
          onClick={handleLogout}
          className="ml-2 cursor-pointer rounded-md border-none bg-[#e53935] px-[18px] py-[6px] text-[14px] text-white transition-colors duration-200 hover:bg-[#c62828]"
        >
          Sair
        </button>
      </div>

      {/* Direita: botões de navegação */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/dashboard/projetos")}
          className="cursor-pointer rounded-md border-none bg-[#f4511e] px-[18px] py-2 text-[15px] text-white transition-colors duration-200 hover:bg-[#d84315]"
        >
          Projetos
        </button>
        <button
          onClick={() => navigate("/dashboard/alunos")}
          className="cursor-pointer rounded-md border-none bg-[#f4511e] px-[18px] py-2 text-[15px] text-white transition-colors duration-200 hover:bg-[#d84315]"
        >
          Alunos
        </button>

        {/* Botão Cadastro com Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="cursor-pointer rounded-md border-none bg-[#6A1B9A] px-[18px] py-2 text-[15px] text-white transition-colors duration-200 hover:bg-[#4A148C]"
          >
            Ver Mais ▾
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 z-50 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
              <ul className="flex flex-col text-left">
                <li>
                  <button
                    onClick={() => {
                      navigate("/orientador/cadastro/projeto");
                      setDropdownOpen(false);
                    }}
                    className="w-full cursor-pointer px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                  >
                    Cadastrar Projeto
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate("/orientador/cadastro/aluno");
                      setDropdownOpen(false);
                    }}
                    className="w-full cursor-pointer px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                  >
                    Cadastrar Aluno
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate("/orientador/cadastro/empresa");
                      setDropdownOpen(false);
                    }}
                    className="w-full cursor-pointer px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                  >
                    Cadastrar Empresa
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
