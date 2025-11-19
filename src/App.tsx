import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    // Utilize classes Tailwind para estilização
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-500 p-4">
      <div className="flex space-x-8 mb-8">
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img 
            src={viteLogo} 
            className="h-24 w-24 hover:drop-shadow-[0_0_2em_#646cffaa] transition-all duration-300 ease-in-out" 
            alt="Vite logo" 
          />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img 
            src={reactLogo} 
            className="h-24 w-24 hover:drop-shadow-[0_0_2em_#61dafb] transition-all duration-300 ease-in-out" 
            alt="React logo" 
          />
        </a>
      </div>
      
      <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
        Vite + React + <span className="text-blue-600">Tailwind 4</span>
      </h1>
      
      <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center gap-4 border border-gray-200">
        <button 
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Count is {count}
        </button>
      </div>
      
      <p className="text-gray-600 text-sm mt-8">
        Click on the logos to learn more
      </p>
    </div>
  )
}

export default App