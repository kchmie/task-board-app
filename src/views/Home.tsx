
import { Link } from "react-router";
import { Button } from "./ui-components";
import { useAppStore } from "../AppStore";
import Task from "../controllers/Task";
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import { LightButton } from "./ui-components/LightButton";

export function Home() {
    const { activeProfile, updateActiveProfile, setActiveProfile } = useAppStore()

    const addTask = () => {
        let d = new Date()
        d.setDate(d.getDate()+2)
        updateActiveProfile(activeProfile!.addTask(new Task("Test", "testowy", d)))
    }

    return (<>
        <div className="shadow-md bg-white p-2.5 flex justify-between items-center">
            <p className="text-3xl">{activeProfile?.profileName}</p>
            <Link to="/" onClick={() => { setActiveProfile(null) }}><Button>Wyloguj</Button></Link>
        </div>
        <div className="p-4">
            <p className="text-2xl">Wszystkie taski:</p>
            <div className="flex gap-4 overflow-auto flex-wrap w-full my-4">
                {activeProfile?.tasks.map((task, idx) => {
                    return <div key={idx} className="shadow-sm border border-gray-200 w-64 p-2">
                        <div className="flex flex-col justify-between h-full">
                            <div>
                                <div className="flex justify-between items-center">
                                    <p className="text-xl">{task.title}</p> 
                                    <p className="text-gray-500">koniec {formatDistanceToNow(new Date(task.deadline), {addSuffix: true, locale: pl})}</p>
                                </div>
                                {task.content}  
                                {task.completed && <p className="text-green-500 font-bold text-right">Zakończony!</p> || <p className="text-gray-400 font-bold text-right">Do zrobienia</p>} 
                                {/* <p className="text-sm text-gray-400">{task.notes.toString()} </p> */}
                            </div>
                            
                            <div>
                                <div className="w-full bg-gray-200 h-0.5 my-2"></div>
                                <div className="flex">
                                    <LightButton onClick={() => {updateActiveProfile(activeProfile!.updateTask(task, {completed:true}))}}>
                                        Zakończ
                                    </LightButton>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>

            {/* <p className="text-xl">Taski na dzisiaj:</p>
            <div>
                {activeProfile?.tasks.filter((task) => task.isDueToday()).map((task, idx) => {
                    return <div key={idx}>{task.title} {task.content} {new Date(task.deadline).toLocaleString()} {task.completed && "Completed" || ""} </div>
                })}
            </div>

            <p className="text-xl">Taski na ten tydzień:</p>
            <div>
                {activeProfile?.tasks.filter((task) => task.isDueThisWeek()).map((task, idx) => {
                    return <div key={idx}>{task.title} {task.content} {new Date(task.deadline).toLocaleString()} {task.completed && "Completed" || ""} </div>
                })}
            </div> */}

            <div className="flex gap-3">
                <Button onClick={() => {addTask()}}>Dodaj task</Button>
                {/* <Button onClick={() => {updateActiveProfile(activeProfile!.removeTask(activeProfile!.tasks[activeProfile!.tasks.length-1]))}}>Usuń ostatni task</Button>
                <Button onClick={() => {updateActiveProfile(activeProfile!.updateTask(activeProfile!.tasks[activeProfile!.tasks.length-1], activeProfile!.tasks[activeProfile!.tasks.length-1].addNote("TestNote")))}}>Dodaj notatke</Button> */}
            </div>
        </div>
    </>)
}
