import { useState, FormEvent, useEffect } from "react";
import { useNavigate, useHref } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";
import { GitHubIcon } from "../components/GithubIcon"

export function Subscribe() {
  const navigate = useNavigate()
  const href = useHref(`https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_API_GH_ACCESS_TOKEN}&redirect_uri=${import.meta.env.VITE_API_GH_REDIRECT_LINK}`) 
  const [authorizeLink, setAutorizeLink] = useState('')

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [createSubscriber, { loading }] = useCreateSubscriberMutation()

  async function handleSubscribe(event: FormEvent) {
    event.preventDefault()
    try {
      const response = await createSubscriber({
        variables: {
          name,
          email,
        }
      })
  
      navigate('/event',{state: response})
      
    } catch (err) {
      console.error(err)
      return
    }

  }

  function handleGithubLogin() {
    window.location.replace(authorizeLink)
  }

  useEffect(() => {
    setAutorizeLink(`https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_API_GH_ACCESS_TOKEN}&redirect_uri=${import.meta.env.VITE_API_GH_REDIRECT_LINK}`)
  })


  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center max-h-[100vh] overflow-hidden relative">
      <div className="bg-reactIcon absolute bg-no-repeat top-2.5 left-0 bottom-0 right-0 bg-top opacity-100"></div>
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto z-10">
        <div className="max-w-[640px]">
           <Logo />

            <h1 className="mt-8 text-[2.5rem] leading-tight">
              Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">ReactJS</strong> 
            </h1>

            <p className="mt-4 text-gray-200 leading-relaxed">Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.              
            </p>
        </div>

        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">Inscreva-se gratuitamente!</strong>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
            <input 
              className="bg-gray-900 rounded px-5 h-14"
              type="text"
              placeholder="Seu nome completo" 
              onChange={event => setName(event.target.value)}
              />

            <input 
              className="bg-gray-900 rounded px-5 h-14"
              type="email"
              placeholder="Digite seu e-mail" 
              onChange={event => setEmail(event.target.value)}
              />

            <button type="submit"
              disabled={loading}
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-color disabled:opacity-50">
              <span className="pt-1 flex items-center justify-center">Garantir minha vaga!</span> 
            </button>
          </form>

          <button type="button" onClick={handleGithubLogin}
          disabled={loading}
          className="mt-4 bg-gray-100 uppercase w-full px-8 py-2 rounded font-bold text-sm hover:bg-gray-300 transition-color disabled:opacity-50 text-gray-900 flex items-center justify-center">
            <GitHubIcon /> <span className="ml-2 block center pt-[2px]"> entrar com github</span>
          </button>
        </div>
      </div>
      
      <div className="mt-10 mx-auto bg-mockup bg-cover bg-no-repeat w-[1100px] h-[588px] items-center z-10 "/>
      
    </div>
  )
}