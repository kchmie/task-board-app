
import { HashRouter, Route, Routes } from 'react-router'
import { Home } from './views/Home'
import { AccountSelection } from './views/AccountSelection'
import { useAppStore } from './AppStore'
import { useEffect } from 'react'
import UserProfile from './controllers/UserProfile'

function App() {
    const { addProfile } = useAppStore()

    useEffect(() => {
        const profilesObject = JSON.parse(localStorage.getItem("userProfiles") || "[]") as UserProfile[]
        profilesObject.forEach((profile) => {
            addProfile(UserProfile.fromJSON(profile), false)
        })
    }, [])

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
