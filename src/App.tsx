import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='h-screen items-center justify-center flex flex-col gap-3'>
      <p className='text-xl'>Vite + React + Tailwind + Electron</p>
      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer" onClick={() => setCount((count) => count + 1)}>
        Count is {count}
      </button>
    </div>
  )
}

export default App
