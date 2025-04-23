import ITask from "../models/Task";
import Serializable from "./Serializable";

export default class Task extends Serializable implements ITask {
    title: string;
    content: string;
    deadline: Date;
    completed: Boolean;

    constructor(title: string, content: string, deadline: Date, completed: Boolean = false) {
        super()

        this.title = title
        this.content = content
        this.deadline = deadline
        this.completed = completed
    }

    setTitle(title: string) : Task {
        this.title = title
        return this
    }

    setContent(content: string) : Task {
        this.content = content
        return this
    }

    setDeadline(deadline: Date) : Task {
        this.deadline = deadline
        return this
    }

    setCompleted(completed: Boolean) : Task {
        this.completed = completed
        return this
    }

    update(task: Task | Partial<Task>) : Task {
        this.setTitle(task.title || this.title)
        this.setContent(task.content || this.content)
        this.setDeadline(task.deadline || this.deadline)
        this.setCompleted(task.completed || this.completed)
        return this
    }

    static isDueToday(task : Task) : Boolean {
        let d = new Date(task.deadline)
        d.setHours(0, 0, 0, 0)
        let t = new Date()
        t.setHours(0, 0, 0, 0)

        return !task.completed && d <= t
    }

    static isDueThisWeek(task : Task) : Boolean {
        let d = new Date(task.deadline)
        d.setHours(0, 0, 0, 0)
        let t = new Date()
        t.setHours(0, 0, 0, 0)
        t.setDate(t.getDate()+7)

        return !task.completed && d <= t
    }

}
