// components/SimpleTeamManager.tsx
import AlunoDropdownSearch from "./alunoDropdownSearch"; // Mantenha o seu arquivo original
import type { Aluno } from "../../../utils/types";

interface Props {
  alunosDisponiveis: Aluno[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
}

export default function SimpleTeamManager({ alunosDisponiveis, selectedIds, onChange }: Props) {
  
  // Adiciona um aluno pelo objeto completo, mas salva apenas o ID
  const handleAdd = (aluno: Aluno) => {
    if (!aluno.id_usuario) return;
    if (selectedIds.includes(aluno.id_usuario)) return;
    onChange([...selectedIds, aluno.id_usuario]);
  };

  // Remove pelo ID
  const handleRemove = (idToRemove: number) => {
    onChange(selectedIds.filter((id) => id !== idToRemove));
  };

  // Helper para mostrar o nome do aluno baseado no ID selecionado
  const getAlunoNome = (id: number) => {
    const found = alunosDisponiveis.find((a) => a.id_usuario === id);
    return found ? found.nome : "Aluno desconhecido";
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-4">
        <AlunoDropdownSearch 
          alunos={alunosDisponiveis} 
          onSelect={handleAdd} 
          placeholder="Pesquisar aluno para adicionar..."
        />
      </div>

      {/* Lista Simples de Alunos Selecionados */}
      <ul className="flex flex-col gap-2">
        {selectedIds.length === 0 && (
          <li className="text-sm text-gray-500 italic">Nenhum aluno selecionado.</li>
        )}
        
        {selectedIds.map((id) => (
          <li key={id} className="flex items-center justify-between rounded-md border border-gray-300 bg-gray-50 px-4 py-2">
            <span className="text-gray-800 font-medium">
              {getAlunoNome(id)}
            </span>
            <button
              type="button"
              onClick={() => handleRemove(id)}
              className="text-sm text-red-600 hover:text-red-800 font-semibold hover:underline"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}