import React, { useState } from "react";
import ProjectListItem from "./projectListItem";
// Importe a tipagem que definimos no utils
import { type ProjetoAPI } from "../../../utils/buscarProjetos";

interface ProjectListProps {
  // CORREÇÃO 1: Use a tipagem correta em vez de any
  projetos: ProjetoAPI[];
}

export default function ProjectList({ projetos }: ProjectListProps) {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  if (!Array.isArray(projetos) || projetos.length === 0) {
    return (
      <div className="mt-6 flex flex-col items-center justify-center text-gray-500">
        <p className="text-lg">Nenhum projeto encontrado.</p>
      </div>
    );
  }

  // Cálculo da paginação
  const totalPaginas = Math.ceil(projetos.length / itensPorPagina);
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const projetosPagina = projetos.slice(inicio, fim);

  const proximaPagina = () => {
    if (paginaAtual < totalPaginas) setPaginaAtual(paginaAtual + 1);
  };

  const paginaAnterior = () => {
    if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
  };

  return (
    <div className="flex w-full flex-col gap-6 p-4">
      {/* Lista de projetos */}
      <div className="flex flex-col gap-4">
        {projetosPagina.map((projeto) => (
          <ProjectListItem 
            // CORREÇÃO 2: O JSON retorna 'id_projeto', não 'id'
            key={projeto.id_projeto} 
            projeto={projeto} 
          />
        ))}
      </div>

      {/* Controles de paginação - Só mostra se houver mais de 1 página */}
      {totalPaginas > 1 && (
        <div className="mt-4 flex items-center justify-center gap-4">
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
  );
}