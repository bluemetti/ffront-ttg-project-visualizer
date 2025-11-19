import "./App.css";
import "./index.css";
import LoginForm from "./components/shared/loginForm";

function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-12 bg-[url('./assets/login-bg.png')] bg-cover bg-center bg-no-repeat">
      <header className="flex flex-col items-center gap-2">
        <p className="text-lg font-light text-gray-200 subpixel-antialiased">
          Portal de Projetos
        </p>
        <h1 className="font-rift text-6xl font-bold text-green-400 subpixel-antialiased">
          TRILHA TÉCNICO-GESTOR
        </h1>
      </header>

      <main className="flex max-h-fit min-h-1/2 w-3/4 flex-col gap-12 rounded-lg bg-[#d9d9d9] p-8 shadow-lg md:w-1/2 lg:w-1/4">
        <h2 className="text-center text-3xl font-bold text-black subpixel-antialiased">
          LOGIN
        </h2>

        <LoginForm />

        <div className="flex items-center justify-center">
          <img
            src="src\assets\cimatec-universidade-logo.png"
            alt="SENAI CIMATEC"
            className="mt-4 w-48"
          />
        </div>
      </main>
    </div>
  );
}

export default App;
