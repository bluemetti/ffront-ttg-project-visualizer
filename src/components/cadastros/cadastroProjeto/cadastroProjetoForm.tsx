// path: src/components/orientador/cadastro/cadastro_projeto/CadastroProjetoForm.tsx
import React, { useEffect, useState } from "react";
import type { Aluno } from "../../../utils/types";
import SimpleTeamManager from "./simpleTeamManager"; // Importe o componente novo acima

import { buscarEmpresas, type EmpresaAPI } from "../../../utils/buscarEmpresas";
import { buscarAlunos } from "../../../utils/buscarAlunos";

const API_URL = import.meta.env.VITE_URL_BACKEND + "projetos";

export default function CadastroProjetoForm() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataIni, setDataIni] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [status, setStatus] = useState("Ativo");
  const [idEmpresa, setIdEmpresa] = useState<number | "">("");
  const [nomeOrientador, setNomeOrientador] = useState("");
  
  // Estado simples para IDs dos alunos: [180021, 180022]
  const [idsAlunos, setIdsAlunos] = useState<number[]>([]);

  // Dados para os Dropdowns
  const [empresas, setEmpresas] = useState<EmpresaAPI[]>([]);
  const [alunosDisponiveis, setAlunosDisponiveis] = useState<Aluno[]>([]);
  
  const [loading, setLoading] = useState(false);

  // Carregar Dados Iniciais (Empresas e Alunos)
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [empData, alunosData] = await Promise.all([
          buscarEmpresas(),
          buscarAlunos()
        ]);
        setEmpresas(empData);
        setAlunosDisponiveis(alunosData);
      } catch (error) {
        console.error("Erro ao carregar dados", error);
        alert("Erro ao carregar listas de cadastro.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Monta o JSON exato que você pediu
    const payload = {
      nome: nome,
      descricao: descricao,
      data_ini: dataIni,
      data_fim: dataFim,
      status: status,
      id_empresa: Number(idEmpresa),
      id_alunos_participantes: idsAlunos, // Array de números direto
      nome_orientador: nomeOrientador
    };

    console.log("JSON Enviado:", JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Projeto cadastrado com sucesso!");
        // Opcional: Limpar form
      } else {
        alert("Erro ao salvar projeto.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col p-6 gap-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-[#003366] mb-2">Novo Projeto</h2>

      {/* Nome do Projeto */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome do Projeto</label>
        <input
          required
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-[#C9C9C9] px-3 py-2"
        />
      </div>

      {/* Descrição */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          rows={3}
          className="w-full rounded-md border border-gray-300 bg-[#C9C9C9] px-3 py-2"
        />
      </div>

      {/* Datas (Grid 2 colunas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Data Início</label>
          <input
            type="date"
            required
            value={dataIni}
            onChange={(e) => setDataIni(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-[#C9C9C9] px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Data Fim</label>
          <input
            type="date"
            required
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-[#C9C9C9] px-3 py-2"
          />
        </div>
      </div>

      {/* Status e Orientador */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-[#C9C9C9] px-3 py-2"
          >
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
            <option value="Concluido">Concluído</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome Orientador</label>
          <input
            type="text"
            placeholder="Ex: Prof. Carlos Silva"
            value={nomeOrientador}
            onChange={(e) => setNomeOrientador(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-[#C9C9C9] px-3 py-2"
          />
        </div>
      </div>

      {/* Dropdown de Empresa (Mantido conforme pedido) */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Empresa</label>
        <select
          value={idEmpresa}
          onChange={(e) => setIdEmpresa(e.target.value ? Number(e.target.value) : "")}
          className="w-full rounded-md border border-gray-300 bg-[#C9C9C9] px-3 py-2"
        >
          <option value="">Selecione uma empresa</option>
          {empresas.map((emp) => (
            <option key={emp.id_empresa} value={emp.id_empresa}>
              {emp.nome}
            </option>
          ))}
        </select>
      </div>

      <hr className="border-gray-300 my-2" />

      {/* Gerenciamento de Equipe Simplificado */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Alunos Participantes</label>
        {loading ? (
          <p className="text-sm text-gray-500">Carregando alunos...</p>
        ) : (
          <SimpleTeamManager 
            alunosDisponiveis={alunosDisponiveis}
            selectedIds={idsAlunos}
            onChange={setIdsAlunos}
          />
        )}
      </div>

      {/* Botão Salvar */}
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-[#EB521B] px-8 py-3 text-white font-bold hover:bg-[#c44a1d] transition-colors"
        >
          Cadastrar Projeto
        </button>
      </div>
    </form>
  );
}