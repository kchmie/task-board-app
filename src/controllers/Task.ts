import ITask from "../models/Task";
import Serializable from "./Serializable";

export default class Task extends Serializable implements ITask {
    title: string;
    content: string;
    deadline: Date;
    completed: Boolean;
    notes: String[];
    category: String[];

    static categories = [
        { name: "Brak", icon: "" },
        { name: "Dom", icon: "🏠" },
        { name: "Praca", icon: "💼" },
        { name: "Nauka", icon: "🎓" },
        { name: "Zdrowie", icon: "💪" },
        { name: "Lifestyle", icon: "🧘" },
        { name: "Relacje", icon: "🧑‍🤝‍🧑" },
        { name: "Hobby", icon: "🎨" },
        { name: "Sprawy", icon: "🚗" },
        { name: "Podróże", icon: "🌍" },
        { name: "Zakupy", icon: "🛒" },
    ];

    constructor(title: string, content: string, deadline: Date, category: String[] = ["Brak", ""], completed: Boolean = false, notes: String[] = []) {
        super()

        this.title = title
        this.content = content
        this.deadline = deadline
        this.completed = completed
        this.notes = notes
        this.category = category
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

    setCategory(category: String[]) : Task {
        this.category = category
        return this
    }

    addNote(note: String) : Task {
        this.notes.push(note)
        return this
    }

    update(task: Task | Partial<Task>) : Task {
        this.setTitle(task.title || this.title)
        this.setContent(task.content || this.content)
        this.setDeadline(task.deadline || this.deadline)
        this.setCompleted(task.completed || this.completed)
        this.setCategory(task.category || this.category)
        return this
    }

    isDueToday() : Boolean {
        let d = new Date(this.deadline)
        d.setHours(0, 0, 0, 0)
        let t = new Date()
        t.setHours(0, 0, 0, 0)

        return !this.completed && d <= t
    }

    isDueThisWeek() : Boolean {
        let d = new Date(this.deadline)
        d.setHours(0, 0, 0, 0)
        let t = new Date()
        t.setHours(0, 0, 0, 0)
        t.setDate(t.getDate()+7)

        return !this.completed && d <= t
    }

}
