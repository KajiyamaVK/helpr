"use client";
import ChatBaloon from "@/src/components/ChatBaloon/page";
import ChatConfig from "@/src/components/ChatConfig/page";
import { UserInput } from "@/src/components/UserInput/page";
import { store } from "@/src/store";
import { ChatBaloonProps } from "@/types/openAI";
import { useState, useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";

export default function Home() {
  const [chatBaloonContent, setChatBaloonContent] = useState<ChatBaloonProps[]>([]);

  useEffect(() => {
    console.log(chatBaloonContent);
  }, [chatBaloonContent]);

  return (
    <>
      <ReduxProvider store={store}>
        <div className="h-screen py-10 flex flex-col items-center w-full gap-10 justify-between"> 
          <ChatBaloon chatBaloonContent={chatBaloonContent} />
          <div className="w-full max-w-[1096px] flex flex-col gap-3">
            <ChatConfig />
            <UserInput setChatBaloonContent={setChatBaloonContent} chatBaloonContent={chatBaloonContent} />
          </div>
        </div>
      </ReduxProvider>
    </>
  );
}
