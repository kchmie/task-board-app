import Task from "../controllers/Task";

export default interface IUserProfile {
    profileName: string,
    inputText: string,
    tasks: Task[]
}
