import { Message } from '../interfaces';

export function simpleChat(content: string): Message[] {
  return [
    {
      role: 'system',
      content: 'Você é um assistente prestativo e amigável.',
    },
    {
      role: 'assistant',
      content: `
      Claro! Estou pronto para ajudar. Como posso ser útil?
    `,
    },
    {
      role: 'user',
      content: content,
    },
  ];
}
