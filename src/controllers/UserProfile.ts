import IUserProfile from "../models/UserProfile";
import Serializable from "./Serializable";
import Task from "./Task";

export default class UserProfile extends Serializable implements IUserProfile {
    profileName: string;
    tasks: Task[];

    constructor(profileName: string) {
        super()

        this.profileName = profileName
        this.tasks = []
    }

    addTask(task: Task) : UserProfile {
        this.tasks.push(task)
        return this
    }

    removeTask(task: Task) : UserProfile {
        this.tasks = this.tasks.filter((profileTask) => profileTask != task)
        return this
    }

    updateTask(source: Task, update: Task | Partial<Task>) : UserProfile {
        this.tasks.find((profileTask) => {return profileTask===source})?.update(update)
        return this
    }
}
