// components/AlunoDropdownSearch.tsx
import { useMemo, useState, useRef, useEffect } from "react";
import type { Aluno } from "../../../utils/types";

interface Props {
  alunos: Aluno[]; // lista recebida do backend via prop
  onSelect: (aluno: Aluno) => void; // callback quando selecionar um aluno
  placeholder?: string;
}

export default function AlunoDropdownSearch({
  alunos,
  onSelect,
  placeholder = "Buscar aluno...",
}: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // normaliza id (uso interno)
  const idOf = (a: Aluno) => String(a.id_usuario ?? a.nome);

  // lista filtrada em memo
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return alunos;
    return alunos.filter((a) => a.nome.toLowerCase().includes(q));
  }, [alunos, query]);

  // fecha ao clicar fora
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const handleSelect = (aluno: Aluno) => {
    onSelect(aluno);
    setQuery("");
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative w-full max-w-md">
      <label className="sr-only">Buscar aluno</label>
      <input
        type="text"
        aria-label="Buscar aluno"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:ring-2 focus:ring-[#005EAD] focus:outline-none"
      />

      {open && (
        <ul className="absolute z-20 mt-1 max-h-48 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-sm text-gray-500">
              Nenhum aluno encontrado
            </li>
          ) : (
            filtered.map((a) => (
              <li
                key={idOf(a)}
                onClick={() => handleSelect(a)}
                className="cursor-pointer px-3 py-2 text-sm hover:bg-[#e6f0fa]"
                role="option"
                aria-selected="false"
              >
                {a.nome}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
