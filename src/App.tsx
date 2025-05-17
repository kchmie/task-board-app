
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
import { TaskNotes } from './views/TaskNotes'

import icon from "./assets/icon.ico"

function App() {
    const { addProfile } = useAppStore()

    useEffect(() => {
        const profilesObject = JSON.parse(localStorage.getItem("userProfiles") || "[]") as UserProfile[]
        profilesObject.forEach((profile) => {
            addProfile(UserProfile.fromJSON(profile, [["tasks", Task.prototype]]), false)
        })
    }, [])

    useEffect(() => {
        let link: HTMLLinkElement = document.querySelector("link[rel~='icon']") as HTMLLinkElement;

        if (!link) {
            link = document.createElement('link');
            document.getElementsByTagName('head')[0].appendChild(link);
        }

        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = icon;
    }, [])

    return (
        <HashRouter>
            <Routes>
                {/* Middleware to ensure the user has chosen a profile */}
                <Route element={<EnsureActiveProfile />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/createtask" element={<TaskCreation />} />
                    <Route path="/tasknotes" element={<TaskNotes />} />
                </Route>
                <Route path="/" element={<ProfileSelection />} />
                <Route path="/createprofile" element={<ProfileCreation />} />
            </Routes>
        </HashRouter>

    )
}

export default App
