"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import {useRouter} from "next/navigation"

interface IFormData {
    username: string;
    password: string;
}

export default function signin() {
    const [formData, setFormData] = useState<IFormData>({
        username: "",
        password: ""
    });
    const router = useRouter();

    useEffect(()=>{
      prompt("Set your google ai api key: ");
    }, [])

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function handleSignin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        console.log({formData})
        // Encriptar senha antes de enviar
        fetch("/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: formData.username, password: formData.password })
        }).then(async response => {
            if (!response.ok) {alert("Erro ao fazer login"); return; }
            const {token} = await response.json();
            localStorage.setItem("token", token);
            router.push("/home")
        })
    }

    return (
        <div className="flex justify-center gap-10 items-start text-[#5C946E]">
            <form className="space-y-4 w-1/2 max-w-[600px]" onSubmit={handleSignin} >
            <h1 className="text-[#104547] text-[40px] font-light">
                Login
            </h1>
            <input
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                type="text"
                placeholder="Usuário"
                className="w-full p-[20px] text-[#5C946E] border border-[#5C946E] rounded-none focus:outline-none focus:border-[#104547]"
            />
            <input
                name="password"
                value={formData.password}
                onChange={handleInputChange}
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
    )
}