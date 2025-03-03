import { create } from 'zustand'
import IAppState from './models/AppState'

export const useAppStore = create<IAppState>()((set) => ({
    userProfiles: [],
    addProfile: (profile) => set((state) => ({
        userProfiles: [...state.userProfiles, profile]
    })),
    removeProfile: (profile) => set((state) => ({
        userProfiles: state.userProfiles.filter((userProfile) => userProfile != profile)
    }))
}))