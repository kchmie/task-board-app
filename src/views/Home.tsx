
import { Link } from "react-router";
import { Button, CenterPanel, TextInput } from "./ui-components";
import { act, useRef } from "react";
import { useAppStore } from "../AppStore";
import Task from "../controllers/Task";

export function Home() {
    const { activeProfile, updateActiveProfile, setActiveProfile } = useAppStore()
    const testInput = useRef<HTMLInputElement>(null)

    const addTask = () => {
        let d = new Date()
        d.setDate(d.getDate()+2)
        updateActiveProfile(activeProfile!.addTask(new Task("Test", "testowy", d)))
    }

    return (
        <CenterPanel>
            <p className="text-3xl">Strona główna</p>
            <div>
                {`Inputtext profilu: ${activeProfile!.inputText}`}
            </div>
            <div>
                <TextInput ref={testInput} />
                <Button onClick={() => { updateActiveProfile(activeProfile!.setInputText(testInput.current?.value || "")) }}>Zapisz</Button>
            </div>

            <p className="text-xl">Wszystkie taski:</p>
            <div>
                {activeProfile?.tasks.map((task, idx) => {
                    return <div key={idx}>{task.title} {task.content} {new Date(task.deadline).toLocaleString()} {task.completed && "Completed" || ""} </div>
                })}
            </div>

            <p className="text-xl">Taski na dzisiaj:</p>
            <div>
                {activeProfile?.tasks.filter((task) => Task.isDueToday(task)).map((task, idx) => {
                    return <div key={idx}>{task.title} {task.content} {new Date(task.deadline).toLocaleString()} {task.completed && "Completed" || ""} </div>
                })}
            </div>

            <p className="text-xl">Taski na ten tydzień:</p>
            <div>
                {activeProfile?.tasks.filter((task) => Task.isDueThisWeek(task)).map((task, idx) => {
                    return <div key={idx}>{task.title} {task.content} {new Date(task.deadline).toLocaleString()} {task.completed && "Completed" || ""} </div>
                })}
            </div>

            <div className="flex gap-3">
                <Button onClick={() => {addTask()}}>Dodaj task</Button>
                <Button onClick={() => {updateActiveProfile(activeProfile!.removeTask(activeProfile!.tasks[activeProfile!.tasks.length-1]))}}>Usuń ostatni task</Button>
                <Button onClick={() => {updateActiveProfile(activeProfile!.updateTask(activeProfile!.tasks[activeProfile!.tasks.length-1], {completed:true}))}}>Zakończ ostatni task</Button>
            </div>

            <Link to="/" onClick={() => { setActiveProfile(null) }}><Button>Wróć do wyboru profilu</Button></Link>
        </CenterPanel>
    )
}
