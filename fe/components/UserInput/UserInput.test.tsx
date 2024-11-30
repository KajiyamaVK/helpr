import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserInput } from './page';
import '@testing-library/jest-dom';
import { ChatBaloonProps } from '@/types/openAI';

describe('UserInput Component', () => {
  const mockSetChatBaloonContent = jest.fn();
  const mockChatBaloonContent: ChatBaloonProps[] = [];

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: 'Bot response' }),
      })
    ) as jest.Mock;
  });

  it('renders textarea and button', () => {
    render(
      <UserInput
        setChatBaloonContent={mockSetChatBaloonContent}
        chatBaloonContent={mockChatBaloonContent}
      />
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
  });

  it('button should be disabled when textarea is empty', () => {
    render(
      <UserInput
        setChatBaloonContent={mockSetChatBaloonContent}
        chatBaloonContent={mockChatBaloonContent}
      />
    );

    const button = screen.getByRole('button', { name: /enviar/i });
    expect(button).toBeDisabled();
  });

  it('updates input value when typing', () => {
    render(
      <UserInput
        setChatBaloonContent={mockSetChatBaloonContent}
        chatBaloonContent={mockChatBaloonContent}
      />
    );

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Hello' } });
    expect(textarea).toHaveValue('Hello');
  });

  it('sends message when clicking send button', async () => {
    render(
      <UserInput
        setChatBaloonContent={mockSetChatBaloonContent}
        chatBaloonContent={mockChatBaloonContent}
      />
    );

    const textarea = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /enviar/i });

    fireEvent.change(textarea, { target: { value: 'Hello' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3001/openai/text-review',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ content: 'Hello' }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );
    });

    expect(mockSetChatBaloonContent).toHaveBeenCalledTimes(2);
  });

  it('sends message when pressing Enter', async () => {
    render(
      <UserInput
        setChatBaloonContent={mockSetChatBaloonContent}
        chatBaloonContent={mockChatBaloonContent}
      />
    );

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Hello' } });
    fireEvent.keyDown(textarea, { key: 'Enter' });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    expect(mockSetChatBaloonContent).toHaveBeenCalledTimes(2);
  });

  it('does not send message when pressing Shift+Enter', async () => {
    render(
      <UserInput
        setChatBaloonContent={mockSetChatBaloonContent}
        chatBaloonContent={mockChatBaloonContent}
      />
    );

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Hello' } });
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true });

    expect(fetch).not.toHaveBeenCalled();
    expect(mockSetChatBaloonContent).not.toHaveBeenCalled();
  });
}); 