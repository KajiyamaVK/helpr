"use client";

import { ChatBaloonProps } from "@/types/openAI";
import { useState } from "react";

interface UserInputProps {
  setChatBaloonContent: (content: ChatBaloonProps[]) => void;
  chatBaloonContent: ChatBaloonProps[];
}

export function UserInput({ setChatBaloonContent, chatBaloonContent = [] }: UserInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage(inputValue: string): Promise<void> {
    if (!inputValue.trim()) return;

    try {
      setIsLoading(true);
      const userBalloon: ChatBaloonProps = { role: "user", message: inputValue };
      setChatBaloonContent([...chatBaloonContent, userBalloon]);

      const response = await fetch("http://localhost:3001/openai/text-review", {
        method: "POST",
        body: JSON.stringify({ content: inputValue }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to get response');
      }

      setInputValue("");
      setChatBaloonContent([
        ...chatBaloonContent,
        userBalloon,
        { role: "bot", message: responseData.data }  // Using data instead of message
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Optionally show an error message to the user
      setChatBaloonContent([
        ...chatBaloonContent,
        { role: "bot", message: "Sorry, I encountered an error processing your message." }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex gap-4 w-full">
      <textarea 
        value={inputValue} 
        className="flex-1 w-full h-20 text-black p-2" 
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(inputValue);
          }
        }}
        disabled={isLoading}
        placeholder="Type your message here..."
      />
      <button 
        className="w-46 h-20 bg-slate-700 border border-slate-600 text-white px-4 py-2 rounded-md hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed" 
        onClick={() => sendMessage(inputValue)}
        disabled={inputValue.trim().length === 0 || isLoading}
      >
        {isLoading ? 'Sending...' : 'Enviar'}
      </button>
    </div>
  );
}