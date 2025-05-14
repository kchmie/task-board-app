
import { Link } from "react-router";
import { Button } from "./ui-components";
import { useAppStore } from "../AppStore";
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import { LightButton } from "./ui-components/LightButton";

export function Home() {
    const { activeProfile, updateActiveProfile, setActiveProfile, setActiveEditTask, removeProfile } = useAppStore()

    return (<>
        <div className="shadow-md bg-white p-2.5 flex justify-between items-center">
            <p className="text-3xl">{activeProfile?.profileName}</p>
            <Link to="/" onClick={() => { setActiveProfile(null) }}><Button>Wyloguj</Button></Link>
        </div>
        <div className="p-4">
            <p className="text-2xl justify-center flex md:justify-normal">Wszystkie zadania:</p>
            <div className="flex gap-4 overflow-auto flex-wrap w-full my-4 justify-center md:justify-normal">
                {activeProfile?.tasks.map((task, idx) => {
                    return <div key={idx} className="shadow-sm border border-gray-200 w-96 p-2">
                        <div className="flex flex-col justify-between h-full">
                            <div>
                                <div className="flex justify-between items-center">
                                    <p className="text-xl">{task.category[0]} {task.title}</p> 
                                    <p className="text-gray-500">koniec {formatDistanceToNow(new Date(task.deadline), {addSuffix: true, locale: pl})}</p>
                                </div>
                                {task.content}  
                                {task.completed && <p className="text-green-500 font-bold text-right">Zakończony!</p> || <p className="text-gray-400 font-bold text-right">Do zrobienia</p>} 
                                {/* <p className="text-sm text-gray-400">{task.notes.toString()} </p> */}
                            </div>
                            
                            <div>
                                <div className="w-full bg-gray-200 h-0.5 my-2"></div>
                                <div className="flex gap-2">
                                    <LightButton onClick={() => {updateActiveProfile(activeProfile!.updateTask(task, {completed:true}))}}>
                                        Zakończ
                                    </LightButton>
                                    <Link to="/createtask" onClick={() => {setActiveEditTask(task)}}><LightButton>
                                        Edytuj
                                    </LightButton></Link>
                                    <Link to="/tasknotes" onClick={() => {setActiveEditTask(task)}}><LightButton>
                                        Notatki ({task.notes.length})
                                    </LightButton></Link>
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

            <div className="flex gap-3 justify-center md:justify-normal">
                <Link to="/createtask"><Button>Dodaj zadanie</Button></Link>
                <Link to="/" onClick={() => { removeProfile(activeProfile!); setActiveProfile(null); }}><Button className="text-red-500">Usuń profil</Button></Link>
                {/* <Button onClick={() => {updateActiveProfile(activeProfile!.removeTask(activeProfile!.tasks[activeProfile!.tasks.length-1]))}}>Usuń ostatni task</Button>
                <Button onClick={() => {updateActiveProfile(activeProfile!.updateTask(activeProfile!.tasks[activeProfile!.tasks.length-1], activeProfile!.tasks[activeProfile!.tasks.length-1].addNote("TestNote")))}}>Dodaj notatke</Button> */}
            </div>
        </div>
    </>)
}
