
import { Link } from "react-router";
import { Button, CenterPanel, TextInput } from "./ui-components";
import { useEffect, useRef } from "react";
import { syncProfileLocalStorage, useAppStore } from "../AppStore";

export function Home() {
    const { activeProfile, userProfiles, updateActiveProfile, setActiveProfile } = useAppStore()
    const testInput = useRef<HTMLInputElement>(null)

    useEffect(() => {
        syncProfileLocalStorage(userProfiles)
    }, [activeProfile!.inputText])

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

            <Link to="/" onClick={() => { setActiveProfile(null) }}><Button>Wróć do wyboru profilu</Button></Link>
        </CenterPanel>
    )
}
