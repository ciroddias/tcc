"use client"

import { useEffect } from "react"

export default function signin() {

    useEffect(()=>{
      prompt("Set your google ai api key: ");
    }, [])

    return (
        <main className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: '#E4FFED' }}>
            <div className="flex justify-center gap-10 items-start text-[#5C946E]">
                <form className="space-y-4 w-1/2 max-w-[600px]" >
                <h1 className="text-[#104547] text-[40px] font-light">
                    Login
                </h1>
                <input
                    type="text"
                    placeholder="Usuário"
                    className="w-full p-[20px] text-[#5C946E] border border-[#5C946E] rounded-none focus:outline-none focus:border-[#104547]"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    className="w-full p-[20px] text-[#5C946E] border border-[#5C946E] rounded-none focus:outline-none focus:border-[#104547]"
                />
                <button
                    type="submit"
                    className="w-full p-[20px] bg-[#5C946E] text-white hover:bg-[#104547] transition"
                >
                    Entrar
                </button>
                <span className="m-auto">
                    ou <a className="underline" href="/signup">crie sua conta</a>
                </span>
                </form>
                <span 
                className="mt-[70px] tracking-[10px] leading-[60px] text-[40px] text-[#104547] font-light mb-6 text-left">
                ASSISTENTE
                <br/> FINANCEIRO 
                <br />PESSOAL
                </span>
            </div>
        </main>
    )
}