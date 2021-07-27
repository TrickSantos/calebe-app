declare module "*.png";

interface IUsuario {
  id: number;
  nome: string;
  email: string;
  perfil: "pastor" | "lider" | "admin" | "membro";
  avatar: string;
  equipeId: number;
  equipe: IEquipe;
}

export interface IDistrito {
  id: number;
  nome: string;
  igrejas: IIgreja[];
}

export interface IIgreja {
  id: number;
  nome: string;
  distritoId: number;
  distrito: IDistrito;
}

export interface IEquipe {
  id: number;
  nome: string;
  instagram: string;
  avatar: string;
  igrejaId: number;
  igreja: IIgreja;
  membros: IUsuario[];
}

export interface IDesafio {
  id: number;
  titulo: string;
  pontos: number;
  cover: string;
  video: string;
  conteudo: string;
  liberacao: string;
  encerramento: string;
}

export interface IDevocional {
  id: number;
  autorId: number;
  titulo: string;
  verso: string;
  cover: string;
  video: string;
  conteudo: string;
  liberacao: string;
  autor: IUsuario;
}
