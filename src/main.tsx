//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    //<StrictMode>
    <App />
    //</StrictMode>,
);

(String.prototype as any).toColor = function () {
    const colors = [
        "bg-linear-to-bl from-cyan-200 to-blue-300",
        "bg-linear-to-bl from-sky-200 to-indigo-300",
        "bg-linear-to-bl from-violet-200 to-fuchsia-300",
        "bg-linear-to-bl from-purple-200 to-pink-300",
        "bg-linear-to-bl from-rose-200 to-indigo-300",
        "bg-linear-to-bl from-blue-200 to-pink-300",
    ]

    let hash = 0;
    for (let i = 0; i < this.length; i++) {
        hash = this.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];

}
