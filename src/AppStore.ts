import { create } from 'zustand'
import IAppState from './models/AppState'
import UserProfile from './controllers/UserProfile'

export const useAppStore = create<IAppState>()((set, get) => ({
    userProfiles: [],
    activeProfile: null,
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
    updateActiveProfile: (profile: UserProfile) =>
        set((_) => ({
            activeProfile: profile
        }))
}))

export const syncProfileLocalStorage = (userProfiles: UserProfile[]) => {
    localStorage.setItem("userProfiles", JSON.stringify(userProfiles))
};
