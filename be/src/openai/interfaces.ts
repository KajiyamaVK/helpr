export type Role = 'user' | 'assistant';

export type Model = 'gpt-4o' | 'gpt-4o-mini' | 'o1';

export interface Content {
  type: string;
  text: string;
}

export interface Message {
  role: Role;
  content: string;
}
