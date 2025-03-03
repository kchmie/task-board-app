import UserProfile from "../controllers/UserProfile";

export default interface IAppState {
    userProfiles: UserProfile[]

    addProfile: (profile: UserProfile) => void
    removeProfile: (profile: UserProfile) => void
}
