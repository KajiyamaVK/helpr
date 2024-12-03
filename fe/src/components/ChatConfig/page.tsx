"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { ChatMode } from "@/types/openAI"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux" 
import { RootState } from "@/src/store"

export default function ChatConfig() {
  const [selectedMode, setSelectedMode] = useState<string>()
  const [chatModes, setChatModes] = useState<ChatMode[]>([])
  const chatMode = useSelector((store: RootState)=>{
    return store.chatMode
  })

  const uiLanguage = useSelector((store: RootState)=>{
    return store.general.uiConfig.language
  })

  function dropdownLabel(){
    switch(chatMode){
    case ('simpleChat'):
      return 'Chat Padrão'
    default: return  'Chat Padrão2'
    }    
  }

  useEffect(() => {
    async function fetchChatModes() {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/openai/chat-modes`);
      const result = await response.json();
      return result.data;
    }
    fetchChatModes().then(setChatModes)
  }, [])

  useEffect(() => {
    const currentSelectedModeLabel:string | undefined = chatModes.find((mode)=> mode.mode === chatMode)?.languages.find((language)=> language.language === uiLanguage)?.label
    if(currentSelectedModeLabel) setSelectedMode(currentSelectedModeLabel)
  }, [chatModes])
    
  return (
    <div className="w-full max-w-[300px]">
      <Select value={selectedMode} onValueChange={(value) => setSelectedMode(value as string)}>
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

