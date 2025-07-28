"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

interface IMessage {
  text: string;
  role: "user" | "assistant"; 
}

export default function Home() {
  const [chatId, setChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([
    "O que é taxa selic?", "O que são juros compostos?", "Qual é o investimento mais seguro do Brasil?"
  ])

  // Recuperar mensagens do chatId se existir;

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/signin");
        return;
      }

      setToken(token);
    } catch (error) {
      router.push("/signin");
    }
  }, []);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setCurrentMessage(value);
  }

  async function handleSendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    if (!token) {
      alert("Você precisa estar logado para enviar mensagens.");
      router.push("/signin");
    }
    
    setMessages(prev => [...prev, { text: currentMessage, role: "user" }]);
    setIsLoading(true)
    const { message, chatId: newChatId } = await fetch('/api/chats/message/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatId, message: currentMessage}),
    }).then(response => {
      setIsLoading(false)
      if (!response.ok) {
        alert("Erro ao enviar mensagem");
        return;
      }
      setCurrentMessage("");
      return response.json();
    })
    if (newChatId) {
      setChatId(newChatId);
    }

    setMessages(prev => [...prev, { text: message, role: "assistant" }]);
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
          <Message text={msg.text} role={msg.role} key={i} />  ))}
        {isLoading && (
          <div className="flex justify-start gap-3 items-center mb-4">
            <div className="w-4 h-4 bg-[#5C946E] rounded-full animate-pulse" />
            <p className="text-sm text-[#104547]">Digitando...</p>
          </div>
        )}
      </div>

      <div className="mb-2">
        <MessageSuggestions onSelect={setCurrentMessage} suggestions={suggestions} /> 
      </div>

      <form className="flex gap-2 items-center" onSubmit={handleSendMessage}>
        <input
          onChange={handleInputChange}
          value={currentMessage}
          name="message"
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

interface IMessageProps {
  text: string;
  role: "user" | "assistant";
}

function Message({text, role}: IMessageProps) {
  return (
    <div className={`flex ${role === "user" ? "justify-start flex-row-reverse" : "justify-start"} gap-3 items-center mb-4`}>
      {/* <div className={`w-8 h-8 ${role === "user" ? "bg-[#104547]":"bg-[#5C946E]"} rounded-full`} /> */}
      <div className="text-sm text-[#104547]">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
}

interface IMessageSuggestionsProps {
  suggestions: string[];
  onSelect: (text: string) => void;
}

function MessageSuggestions({ suggestions, onSelect }: IMessageSuggestionsProps) {
  return (
    <div>
      <span className="text-[#5C946E]">Suggestions:</span>
      <div className="flex gap-2">
        {suggestions.map((text, i) => (
          <button
            onClick={() => {
              onSelect(text);
            }}
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
