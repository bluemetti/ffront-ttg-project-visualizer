import React from "react";
import { useNavigate } from "react-router-dom";
// Ajuste o caminho dos imports conforme sua estrutura de pastas
import { type ProjetoAPI } from "../../../utils/buscarProjetos";

interface ProjectListItemProps {
  projeto: ProjetoAPI;
}

export default function ProjectListItem({ projeto }: ProjectListItemProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/shared/verProjeto/${projeto.id_projeto}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group flex w-full cursor-pointer items-center rounded-xl border border-gray-400 bg-[#d9d9d9] p-4 transition hover:bg-gray-300"
    >
      <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-3">
        
        {/* Coluna 1: Nome do Projeto */}
        <div>
          <h2 className="mb-1 truncate text-lg font-bold text-[#003366]">
            {projeto.nome_projeto}
          </h2>
        </div>

        {/* Coluna 2: Fase e Status */}
        <div className="text-sm text-black">
          <p>
            <span className="font-semibold text-black">Fase: </span>
            {projeto.fase}
          </p>
          <p>
            <span className="font-semibold text-black">Status: </span>
            {projeto.status}
          </p>
        </div>

        {/* Coluna 3: Orientador e Data */}
        <div className="text-sm text-black md:text-right">
          <p className="truncate">
            <span className="font-semibold text-black">Orientador: </span>
            {projeto.orientador_tecnico}
          </p>

          <p>
            <span className="font-semibold text-black">Início: </span>
            {projeto.semestre_inicial}
          </p>
        </div>
      </div>
    </div>
  );
}