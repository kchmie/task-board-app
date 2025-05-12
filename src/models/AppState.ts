import Task from "../controllers/Task";
import UserProfile from "../controllers/UserProfile";

export default interface IAppState {
    userProfiles: UserProfile[]
    activeProfile: UserProfile | null

    activeEditTask: Task | null

    addProfile: (profile: UserProfile, save?: Boolean) => void
    removeProfile: (profile: UserProfile) => void
    setActiveProfile: (profile: UserProfile | null) => void
    updateActiveProfile: (profile: UserProfile) => void
    setActiveEditTask: (task: Task | null) => void
}
