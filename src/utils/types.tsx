export interface Aluno {
  id_usuario?: number; // algumas APIs usam id_usuario
  nome: string;
  email?: string;
  ra?: string;
  telefone?: string;
  curso?: string | number;
}