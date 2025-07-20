"use client";

import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [suggestions, setSuggestions] = useState<string[]>([
    "O que é taxa selic?", "O que são juros compostos?", "Qual é o investimento mais seguro do Brasil?"
  ])

  function handleSendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = fetch('/api/chats/message/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: "Hello from client" }),
    }); 
  }

  return (
    <div className="flex flex-col w-screen h-screen p-10">
      <div className="flex-1 w-full relative overflow-y-auto p-4 mb-4">
        {messages.length === 0 
        ? <span 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[70px] tracking-[10px] leading-[60px] text-[40px] text-[#104547] font-light mb-6 text-left">
          ASSISTENTE
          <br/> FINANCEIRO 
          <br />PESSOAL
        </span>
        : messages.map((msg, i) => (
          <Message key={i} />  ))}
      </div>

      <div className="mb-2">
        <MessageSuggestions suggestions={suggestions} /> 
      </div>

      <form className="flex gap-2 items-center" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full p-[20px] text-[#5C946E] border border-[#5C946E] focus:outline-none focus:border-[#104547] rounded-none"
        />
        <button className="p-[20px] bg-[#5C946E] text-white hover:bg-[#104547] transition">
          Enviar
        </button>
      </form>
    </div>        
  );
}

function Message() {
  return (
    <div className="flex items-start mb-4">
      <div className="w-10 h-10 bg-blue-500 rounded-full mr-3"></div>
      <div className="sp-3 rounded shadow">
        <p className="text-sm">This is a message.</p>
      </div>
    </div>
  );
}

function MessageSuggestions({ suggestions }: { suggestions: string[] }) {
  return (
    <div>
      <span className="text-[#5C946E]">Suggestions:</span>
      <div className="flex gap-2">
        {suggestions.map((text, i) => (
          <button
            key={i}
            className="p-3 text-[#5C946E] border border-[#5C946E] rounded-none focus:outline-none focus:border-[#104547]"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
