
import { Link } from "react-router";
import { Button, CenterPanel, TextInput } from "./ui-components";
import { useEffect, useRef, useState } from "react";

export function Home() {
    const [testText, setTestText] = useState("")
    const testInput = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setTestText(localStorage.getItem("testText") || "")
    }, [])

    useEffect(() => {
        localStorage.setItem("testText", testText)
    }, [testText])

    return (
        <CenterPanel>
            <p className="text-3xl">Strona główna</p>
            <div>
                {`Testowy localstorage: ${testText}`}
            </div>
            <div>
                <TextInput ref={testInput} />
                <Button onClick={() => { setTestText(testInput.current?.value || "") }}>Zapisz</Button>
            </div>

            <Link to="/"><Button>Wróć do wyboru użytkownika</Button></Link>
        </CenterPanel>
    )
}
