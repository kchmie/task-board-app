import IUserProfile from "../models/UserProfile";
import Serializable from "./Serializable";
import Task from "./Task";

export default class UserProfile extends Serializable implements IUserProfile {
    profileName: string;
    inputText: string;
    tasks: Task[];

    constructor(profileName: string, inputText: string) {
        super()

        this.profileName = profileName
        this.inputText = inputText
        this.tasks = []
    }

    setInputText(text: string) : UserProfile {
        this.inputText = text
        return this
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
