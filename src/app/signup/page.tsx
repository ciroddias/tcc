"use client"

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

interface IFormData {
  username: string;
  password: string;
  confirmPassword: string;
}

export default function Signup(){
    const router = useRouter();
    const [formData, setFormData] = useState<IFormData>({
      username: '',
      password: '',
      confirmPassword: ''
    });

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value
      });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const { username, password, confirmPassword } = formData;

      if (!username || !password || !confirmPassword) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      // encriptar password
      fetch('/api/account/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, confirmPassword })
      }).then(response => {
        if (response.ok) {
          alert("Conta criada com sucesso!");
          router.push('/signin');
        } else {
          alert("Erro ao criar conta. Tente novamente.");
        }
      }).catch(error => {
        console.error("Erro ao enviar dados:", error);
        alert("Erro ao enviar dados. Tente novamente.");
      });

      console.log("Formulário enviado:", formData);
    }

    return (
      <div className="flex justify-center gap-10 items-start text-[#5C946E]">
        <form className="space-y-4 w-1/2 max-w-[600px]" onSubmit={handleSubmit}>
          <h1 className="text-[#104547] text-[40px] font-light">
            Signup
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
          <input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            type="password"
            placeholder="Confirmar senha"
            className="w-full p-[20px] text-[#5C946E] border border-[#5C946E] rounded-none focus:outline-none focus:border-[#104547]"
          />
          <button
            type="submit"
            className="w-full p-[20px] bg-[#5C946E] text-white hover:bg-[#104547] transition"
          >
            Criar conta
          </button>
          <span className="m-auto">
            Já possui uma conta? <a className="underline" href="/signin">Entrar</a>
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