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
    setActiveProfileInputText: (text: string) =>
        set((state) => {
            state.activeProfile?.setInputText(text)
            return {activeProfile: state.activeProfile}
        })
}))

export const syncProfileLocalStorage = (userProfiles: UserProfile[]) => {
    localStorage.setItem("userProfiles", JSON.stringify(userProfiles))
};
