
import { HashRouter, Route, Routes } from 'react-router'
import { Home } from './views/Home'
import { AccountSelection } from './views/AccountSelection'

function App() {

    return (
        <HashRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<AccountSelection />} />
            </Routes>
        </HashRouter>

    )
}

export default App
