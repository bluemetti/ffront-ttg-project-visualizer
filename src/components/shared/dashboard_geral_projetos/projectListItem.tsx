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
        
        {/* Coluna 1: Nome e Líder */}
        <div>
          <h2 className="mb-1 truncate text-lg font-bold text-[#003366]">
            {projeto.nome_projeto}
          </h2>
          <p className="text-sm font-semibold text-black">
            <span className="text-black">Líder: </span>
            {/* CORREÇÃO 1: Trata o caso de null */}
            <span className="font-normal">
              {projeto.aluno_lider || "Não definido"}
            </span>
          </p>
        </div>

        {/* Coluna 2: Fase, Status e Empresa */}
        <div className="text-sm text-black">
          <p>
            <span className="font-semibold text-black">Fase: </span>
            {projeto.fase}
          </p>
          <p>
            <span className="font-semibold text-black">Status: </span>
            {projeto.status}
          </p>
          <p className="hidden truncate sm:block">
            <span className="font-semibold text-black">Empresa: </span>
            {projeto.empresa_demandante}
          </p>
        </div>

        {/* Coluna 3: Orientadores e Data */}
        <div className="text-sm text-black md:text-right">
          <p className="truncate">
            <span className="font-semibold text-black">OET: </span>
            {projeto.orientador_tecnico}
          </p>

          {/* CORREÇÃO 2: Verifica se orientador_gestao existe antes de mostrar */}
          {projeto.orientador_gestao ? (
            <p className="truncate">
              <span className="font-semibold text-black">OGP: </span>
              {projeto.orientador_gestao}
            </p>
          ) : (
             // Opcional: Se quiser manter o espaço ocupado, deixe um <p> vazio ou com "N/A"
             <p className="truncate text-gray-500 italic text-xs">Sem OGP</p>
          )}

          <p>
            <span className="font-semibold text-black">Início: </span>
            {projeto.semestre_inicial}
          </p>
        </div>
      </div>
    </div>
  );
}