"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChatMode } from "@/types/openAI"
import { useState } from "react"

export default function ChatConfig() {
  const [selectedMode, setSelectedMode] = useState<ChatMode>("simpleChat")

  return (
    <div className="w-full flex max-w-[800px]">
      <div className="w-full max-w-[300px]">
        <Select value={selectedMode} onValueChange={(value) => setSelectedMode(value as ChatMode)}>
          <SelectTrigger className="w-full bg-zinc-900 text-zinc-100 border-zinc-700 focus:ring-zinc-700">
            <SelectValue placeholder="Selecione o modo do chat" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 text-zinc-100 border-zinc-700">
            <SelectItem value="simpleChat" className="hover:bg-zinc-800 cursor-pointer">
            Chat padrão
            </SelectItem>
            <SelectItem value="revision" className="hover:bg-zinc-800 cursor-pointer">
            Revisão de texto
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

