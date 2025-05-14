import { useRef, useState } from "react"
import { useAppStore } from "../AppStore"
import { Button, CenterPanel, TextInput } from "./ui-components"
import { Link } from "react-router"

export function TaskNotes(_: any) {
    let noteInput = useRef<HTMLInputElement>(null)
    const [errorMessage, setErrorMessage] = useState("")
    
    const { activeProfile, updateActiveProfile, activeEditTask, setActiveEditTask } = useAppStore()

    const addNote = (_: any) => {
        if(noteInput.current?.value === "") {
            setErrorMessage("Notatka nie może być pusta!")
            return
        }
        activeEditTask?.addNote(noteInput.current!.value + "\n" + new Date().toLocaleString())
        updateActiveProfile(activeProfile!)
        noteInput.current!.value = ""
    }

    return (
        <>
            <CenterPanel>
                <p className="text-3xl">Notatki do zadania: {activeEditTask?.title}</p>
                
                {
                    activeEditTask?.notes.map((note, idx) => {
                        return <div key={idx} className="text-center">
                            <p>{note.split("\n")[0]}</p>
                            <p className="text-gray-500">{note.split("\n")[1]}</p>
                        </div>
                    })
                }

                <p className="text-red-500 font-semibold h-5">{errorMessage !== "" && errorMessage}</p>

                <div className="flex w-full justify-center">
                    <TextInput ref={noteInput} placeholder="Treść notatki" className="sm:w-2/7 w-4/7" />
                    <Button onClick={addNote}>Dodaj notatke</Button>
                </div>
                
                <Link to="/home" onClick={() => { setActiveEditTask(null) }}><Button>Wróć</Button></Link>
            </CenterPanel>
        </>
    )
}
