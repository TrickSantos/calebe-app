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
