
import { HashRouter, Route, Routes } from 'react-router'
import { Home } from './views/Home'
import { ProfileSelection } from './views/ProfileSelection'
import { useAppStore } from './AppStore'
import { useEffect } from 'react'
import UserProfile from './controllers/UserProfile'
import { EnsureActiveProfile } from './views/middleware/EnsureActiveProfile'
import { ProfileCreation } from './views/ProfileCreation'
import Task from './controllers/Task'
import { TaskCreation } from './views/TaskCreation'

function App() {
    const { addProfile } = useAppStore()

    useEffect(() => {
        const profilesObject = JSON.parse(localStorage.getItem("userProfiles") || "[]") as UserProfile[]
        profilesObject.forEach((profile) => {
            addProfile(UserProfile.fromJSON(profile, [["tasks", Task.prototype]]), false)
        })
    }, [])

    return (
        <HashRouter>
            <Routes>
                {/* Middleware to ensure the user has chosen a profile */}
                <Route element={<EnsureActiveProfile />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/createtask" element={<TaskCreation />} />
                </Route>
                <Route path="/" element={<ProfileSelection />} />
                <Route path="/createprofile" element={<ProfileCreation />} />
            </Routes>
        </HashRouter>

    )
}

export default App
