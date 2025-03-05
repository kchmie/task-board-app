import UserProfile from "../controllers/UserProfile";

export default interface IAppState {
    userProfiles: UserProfile[]
    activeProfile: UserProfile | null

    addProfile: (profile: UserProfile, save?: Boolean) => void
    removeProfile: (profile: UserProfile) => void
    setActiveProfile: (profile: UserProfile | null) => void
    setActiveProfileInputText: (text: string) => void
}
