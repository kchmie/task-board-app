import { useState } from 'react'
import { Button, TextInput } from './views/ui-components'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='h-screen items-center justify-center flex flex-col gap-3'>
      <p className='text-xl'>Vite + React + Tailwind + Electron</p>
      <Button onClick={() => setCount((count) => count + 1)} className="bg-slate-200 ">
        Count is {count}
      </Button>
      <TextInput />
    </div>
  )
}

export default App
