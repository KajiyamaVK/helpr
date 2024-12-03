export type Role = 'user' | 'assistant' | 'system';

export type Model = 'gpt-4o' | 'gpt-4o-mini' | 'o1';

export interface Content {
  type: string;
  text: string;
}

export interface Message {
  role: Role;
  content: string;
}

interface ChatModeLanguage {
  language: string;
  label: string;
}

export interface ChatMode {
  mode: string;
  languages: ChatModeLanguage[];
}

export interface ChatModesResponse {
  chatModes: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}
