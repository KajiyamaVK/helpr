"use client";
import ChatBaloon from "@/components/ChatBaloon/page";
import ChatConfig from "@/components/ChatConfig/page";
import { UserInput } from "@/components/UserInput/page";
import { ChatBaloonProps } from "@/types/openAI";
import { useState, useEffect } from "react";


export default function Home() {
  const [chatBaloonContent, setChatBaloonContent] = useState<ChatBaloonProps[]>([]);

  useEffect(() => {
    console.log(chatBaloonContent);
  }, [chatBaloonContent]);

  return (
    <div className="flex flex-col items-center h-screen w-screen gap-10 justify-end pb-10">
      <ChatBaloon chatBaloonContent={chatBaloonContent} />
      <ChatConfig />
      <UserInput setChatBaloonContent={setChatBaloonContent} chatBaloonContent={chatBaloonContent} />
    </div>
  );
}
