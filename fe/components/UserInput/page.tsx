"use client";

import { ChatBaloonProps } from "@/types/openAI";
import { useState } from "react";

interface UserInputProps {
  setChatBaloonContent: (content: ChatBaloonProps[]) => void;
  chatBaloonContent: ChatBaloonProps[];
}

export function UserInput({ setChatBaloonContent, chatBaloonContent = [] }: UserInputProps) {
  const [inputValue, setInputValue] = useState("");

  async function sendMessage(inputValue: string): Promise<void> {
    console.log('entrei');
    const userBalloon: ChatBaloonProps = { role: "user", message: inputValue };
    setChatBaloonContent([...(chatBaloonContent || []), userBalloon]);

    const response = await fetch("http://localhost:3001/openai/text-review", {
      method: "POST",
      body: JSON.stringify({ content: inputValue }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    setInputValue("");
    setChatBaloonContent([...(chatBaloonContent || []),userBalloon, { role: "bot", message: data.message }]);
  }


  return (
    <div className="flex gap-2 items-center min-w-[399px] w-full max-w-[800px] ">
      <textarea 
        value={inputValue} 
        className="min-w-[399px] w-full max-w-[800px] h-20 text-black p-2" 
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(inputValue);
          }
        }}
      />
      <button 
        className="bg-slate-700 border border-slate-600 text-white px-4 py-2 rounded-md h-20 hover:bg-slate-600" 
        onClick={() => sendMessage(inputValue)}
      >
        Enviar
      </button>
    </div>    
  )
}