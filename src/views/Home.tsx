
import { Link } from "react-router";
import { Button } from "./ui-components";
import { useAppStore } from "../AppStore";
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import { LightButton } from "./ui-components/LightButton";
import Task from "../controllers/Task";

export function Home() {
    const { activeProfile, updateActiveProfile, setActiveProfile, setActiveEditTask, removeProfile } = useAppStore()

    const updateTimeFilter = (e: any) => {
        updateActiveProfile(activeProfile!.updateFilters(e.target.value, activeProfile!.filters[1]))
        console.log()
    }

    const updateGroupFilter = (e: any) => {
        updateActiveProfile(activeProfile!.updateFilters(activeProfile!.filters[0], e.target.value))
    }

    return (<>
        <div className="shadow-md bg-white p-2.5 flex justify-between items-center">
            <p className="text-3xl">{activeProfile!.profileName}</p>
            <Link to="/" onClick={() => { setActiveProfile(null) }}><Button>Wyloguj</Button></Link>
        </div>
        <div className="p-4">
            {/* <p className="text-2xl justify-center flex md:justify-normal">Wszystkie zadania:</p> */}
            <div className="flex gap-2 items-e">
                <p className="text-l">Wyświetl zadania </p>
                <select defaultValue={activeProfile!.filters[0]} onChange={updateTimeFilter} className="rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-l w-30 font-semibold">
                    <option value="day">📆 Na dzisiaj</option>
                    <option value="week">📅 Na tydzień</option>
                    <option value="all">🖥️ Wszystkie</option>
                </select>
                
                <p className="text-l">z kategorii </p>
                <select defaultValue={activeProfile!.filters[1]} onChange={updateGroupFilter} className="rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-l w-30 font-semibold">
                    <option value="all">🖥️ Wszystkie</option>
                    {Task.categories.map((category, idx) => {
                        return <option key={idx} value={category.icon + "." + category.name}>{category.icon + " " + category.name}</option>
                    })}
                </select>
            </div>
            <div className="flex gap-4 overflow-auto flex-wrap w-full my-4 justify-center md:justify-normal">
                {activeProfile?.tasks.filter((task, _) => {
                    let dateFilter = false, groupFilter = false;

                    if(activeProfile!.filters[0] == "all") dateFilter = true;
                    else if(activeProfile!.filters[0] == "day" && task.isDueToday()) dateFilter = true;
                    else if(activeProfile!.filters[0] == "week" && task.isDueThisWeek()) dateFilter = true;

                    if(activeProfile!.filters[1] == "all") groupFilter = true;
                    else if(activeProfile!.filters[1] == task.category[0] + "." + task.category[1]) groupFilter = true;

                    return dateFilter && groupFilter
                }).sort((a, b) => {
                    return a.completed === b.completed 
                        ? new Date(a.deadline).getTime() - new Date(b.deadline).getTime() 
                        : a.completed ? 1 : -1;
                }).map((task, idx) => {
                    return <div key={idx} className="shadow-sm border border-gray-200 w-96 p-2">
                        <div className="flex flex-col justify-between h-full">
                            <div>
                                <div className="flex justify-between items-center">
                                    <p className="text-xl">{task.category[0]} {task.title}</p> 
                                    <p className="text-gray-500">koniec {formatDistanceToNow(new Date(task.deadline), {addSuffix: true, locale: pl})}</p>
                                </div>
                                {task.content}  
                                {task.completed && <p className="text-green-500 font-bold text-right">Zakończone!</p> || <p className={task.isOverdue() && "text-red-400 font-bold text-right" || "text-gray-400 font-bold text-right"}>Do zrobienia</p>} 
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

            <div className="flex gap-3 justify-center md:justify-normal">
                <Link to="/createtask"><Button>Dodaj zadanie</Button></Link>
                <Link to="/" onClick={() => { removeProfile(activeProfile!); setActiveProfile(null); }}><Button className="text-red-500">Usuń profil</Button></Link>
            </div>
        </div>
    </>)
}
