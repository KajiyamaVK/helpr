"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { ChatMode } from "@/types/openAI"
import { useState } from "react"
import { useSelector } from "react-redux" 
import { RootState } from "@/src/store"

export default function ChatConfig() {
  const [selectedMode, setSelectedMode] = useState<ChatMode>("simpleChat")
  const chatMode = useSelector((store: RootState)=>{
    return store.chatMode
  })

  function dropdownLabel(){
    switch(chatMode){
    case ('simpleChat'):
      return 'Chat Padrão'
    default: return  'Chat Padrão2'
    }    
  }

  return (
    <div className="w-full max-w-[300px]">
      <Select value={dropdownLabel()} onValueChange={(value) => setSelectedMode(value as ChatMode)}>
        <SelectTrigger className="w-full bg-zinc-900 text-zinc-100 border-zinc-700 focus:ring-zinc-700">
          <SelectValue placeholder="Selecione o modo do chat" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 text-zinc-100 border-zinc-700">
          <SelectItem value="simpleChat" className="hover:bg-zinc-800 cursor-pointer">
            {dropdownLabel()}
          </SelectItem>
          <SelectItem value="revision" className="hover:bg-zinc-800 cursor-pointer">
            Revisão de texto
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

