import { Link } from "react-router";
import { Button, CenterPanel, TextInput } from "./ui-components";
import { useEffect, useRef, useState } from "react";
import { useAppStore } from "../AppStore";
import Task from "../controllers/Task";

function toLocalISOString(date: Date): string {
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  const localDate = new Date(date.getTime() - offsetMs);
  return localDate.toISOString().slice(0, 16); // tylko YYYY-MM-DDTHH:mm
}

export function TaskCreation(_: any) {
    const [errorMessage, setErrorMessage] = useState("")

    let taskNameInput = useRef<HTMLInputElement>(null)
    let taskDescInput = useRef<HTMLInputElement>(null)
    let taskDeadInput = useRef<HTMLInputElement>(null)
    let taskCateInput = useRef<HTMLSelectElement>(null)

    const { activeProfile, updateActiveProfile, activeEditTask, setActiveEditTask } = useAppStore()

    useEffect(() => {
        if (activeEditTask !== undefined && activeEditTask !== null) {
            taskNameInput.current!.value = activeEditTask.title
            taskDescInput.current!.value = activeEditTask.content
            taskDeadInput.current!.value = toLocalISOString(new Date(activeEditTask.deadline)).split(".")[0]
            taskCateInput.current!.value = activeEditTask.category.join(".")
        }
    }, [])

    const addOrUpdateTask = (e: any) => {
        let taskName = taskNameInput.current!.value
        let taskDesc = taskDescInput.current!.value
        let taskDead = new Date(taskDeadInput.current!.value)
        let taskCate = taskCateInput.current!.value.split(".")

        if (taskName === "") {
            e.preventDefault()
            setErrorMessage("Zadanie musi mieć podaną nazwę!")
            return
        }

        if (isNaN(taskDead.getTime())) {
            e.preventDefault()
            setErrorMessage("Zadanie musi mieć deadline!")
            return
        }

        if(taskDead < new Date()) {
            e.preventDefault()
            setErrorMessage("Deadline zadania nie może być w przeszłości!")
            return
        }

        if (activeEditTask !== undefined && activeEditTask !== null) {
            updateActiveProfile(activeProfile!.updateTask(activeEditTask, activeEditTask.setTitle(taskName).setContent(taskDesc).setDeadline(taskDead).setCategory(taskCate)))
        } else {
            updateActiveProfile(activeProfile!.addTask(new Task(taskName, taskDesc, taskDead, taskCate)))
        }


        setActiveEditTask(null)
    }

    return (
        <>
            <CenterPanel>
                <p className="text-3xl">Nazwa zadania</p>
                <TextInput ref={taskNameInput} placeholder="Nazwa zadania" className="sm:w-2/5 w-4/5" />

                <p className="text-3xl">Opis zadania</p>
                <TextInput ref={taskDescInput} placeholder="Nazwa zadania" className="sm:w-2/5 w-4/5" />

                <p className="text-3xl">Deadline</p>
                <input ref={taskDeadInput} type="datetime-local" className="sm:w-2/5 w-4/5 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500" />

                <p className="text-3xl">Kategoria</p>
                <select ref={taskCateInput} className="sm:w-2/5 w-4/5 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                    {Task.categories.map((category, idx) => {
                        return <option key={idx} value={category.icon + "." + category.name}>{category.icon + " " + category.name}</option>
                    })}
                </select>

                <p className="text-red-500 font-semibold h-5">{errorMessage !== "" && errorMessage}</p>

                <div className="flex gap-2 w-full justify-center">
                    <Link to="/home" onClick={() => { setActiveEditTask(null) }}><Button>Wróć</Button></Link>
                    <Link to="/home" onClick={addOrUpdateTask}><Button>{activeEditTask !== undefined && activeEditTask !== null ? "Zapisz zadanie" : "Dodaj zadanie"}</Button></Link>
                </div>
                {
                    (activeEditTask !== undefined && activeEditTask !== null) && <Link to="/home" onClick={() => { updateActiveProfile(activeProfile!.removeTask(activeEditTask)); setActiveEditTask(null); }}><Button className="text-red-500">Usuń zadanie</Button></Link>
                }
            </CenterPanel>
        </>
    )
}
