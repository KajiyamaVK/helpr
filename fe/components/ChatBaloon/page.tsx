"use client";


import { ChatBaloonProps } from "@/types/openAI";
import Image from "next/image";
import botAvatar from "@/public/isaacAvatar.png"

export default function ChatBaloon({ chatBaloonContent }: { chatBaloonContent: ChatBaloonProps[] }) {
  return(
    <div className="flex flex-col gap-4 max-w-[800px] w-[800px] h-[calc(100vh-200px)] overflow-y-auto">
      {chatBaloonContent.map(({ role, message }, index) => (
        <div className="flex items-center gap-4" key={`${role}-${index}-${message.substring(0, 10)}`}>
          {role === "bot" && (
            <div className="flex-shrink-0">
              <Image src={botAvatar} alt="bot avatar" width={50} height={50} />
            </div>
          )}
          <div className={`${role === "user" ? "bg-slate-800 ml-auto" : "bg-transparent border-l-2 border-slate-600"}  w-min-[399px] max-w-[500px] rounded-lg p-4 flex mx-10`}>
            {message}
          </div>
        </div>
      ))}
    </div>
  )
}