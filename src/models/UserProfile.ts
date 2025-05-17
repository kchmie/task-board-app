import Task from "../controllers/Task";

export default interface IUserProfile {
    profileName: string,
    tasks: Task[],
    filters: [string, string]
}
