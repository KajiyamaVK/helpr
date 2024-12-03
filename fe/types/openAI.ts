export type Role = "user" | "bot";

interface ChatModeLanguage {
  language: string;
  label: string;
}

export interface ChatMode {
  mode: string;
  languages: ChatModeLanguage[];
}

export interface ChatBaloonProps {
  role: Role;
  message: string;
}