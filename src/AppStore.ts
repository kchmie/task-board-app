import { create } from 'zustand'
import IAppState from './models/AppState'

export const useAppStore = create<IAppState>()((set, get) => ({
    userProfiles: [],
    addProfile: (profile, save = true) => {
        set((state) => ({
            userProfiles: [...state.userProfiles, profile]
        }))
        if (save) syncProfileLocalStorage(get)
    },
    removeProfile: (profile) => {
        set((state) => ({
            userProfiles: state.userProfiles.filter((userProfile) => userProfile != profile)
        }))
        syncProfileLocalStorage(get)
    }
}))

const syncProfileLocalStorage = (get: () => IAppState) => {
    localStorage.setItem("userProfiles", JSON.stringify(get().userProfiles))
};
