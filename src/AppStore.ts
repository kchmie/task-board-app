import { create } from 'zustand'
import IAppState from './models/AppState'
import UserProfile from './controllers/UserProfile'
import Task from './controllers/Task'

export const useAppStore = create<IAppState>()((set, get) => ({
    userProfiles: [],
    activeProfile: null,
    activeEditTask: null,
    addProfile: (profile, save = true) => {
        set((state) => ({
            userProfiles: [...state.userProfiles, profile]
        }))
        if (save) syncProfileLocalStorage(get().userProfiles)
    },
    removeProfile: (profile) => {
        set((state) => ({
            userProfiles: state.userProfiles.filter((userProfile) => userProfile != profile)
        }))
        syncProfileLocalStorage(get().userProfiles)
    },
    setActiveProfile: (profile) => {
        set((_) => ({
            activeProfile: profile
        }))
    },
    updateActiveProfile: (profile: UserProfile) => {
        set((_) => ({
            activeProfile: profile
        }))
        syncProfileLocalStorage(get().userProfiles)
    },
    setActiveEditTask: (task: Task | null) =>  {
        set((_) => ({
            activeEditTask: task
        }))
    }
}))

export const syncProfileLocalStorage = (userProfiles: UserProfile[]) => {
    localStorage.setItem("userProfiles", JSON.stringify(userProfiles))
};
