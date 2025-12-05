import "./App.css";

import LoginForm from "./components/shared/loginForm"; 
import { Link } from "react-router-dom";

function App() {
  
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-12 bg-[url('./assets/login-bg.png')] bg-cover bg-center bg-no-repeat overflow-hidden">
      
      <header className="flex flex-col items-center gap-2">
        <p className="text-lg font-light text-gray-200 subpixel-antialiased">
          Portal de Projetos
        </p>
        <h1 className="font-rift text-6xl font-bold text-green-400 subpixel-antialiased text-center px-4">
          TRILHA TÉCNICO-GESTOR
        </h1>
      </header>

      <main className="flex w-3/4 flex-col gap-12 rounded-lg bg-[#d9d9d9] p-8 shadow-lg md:w-1/2 lg:w-1/4">
        <h2 className="text-center text-3xl font-bold text-black subpixel-antialiased">
          LOGIN
        </h2>

        <LoginForm />

        <div className="flex flex-col items-center gap-4">
          <Link
            to="/sobre-ttg"
            className="text-center text-sm text-gray-700 underline hover:text-[#005EAD]"
          >
            Saiba mais sobre a TTG e o SENAI CIMATEC
          </Link>

          <img
            src="src/assets/cimatec-universidade-logo.png"
            alt="SENAI CIMATEC"
            className="mt-2 w-48"
          />
        </div>
      </main>
    </div>
  );
}

export default App;