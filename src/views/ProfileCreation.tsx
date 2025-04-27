import { Link } from "react-router";
import { ProfileAvatarBig, Button, CenterPanel, TextInput } from "./ui-components";
import { useState } from "react";
import { useAppStore } from "../AppStore";
import UserProfile from "../controllers/UserProfile";

export function ProfileCreation() {
    const [profileName, setProfileName] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const {addProfile} = useAppStore()
    
    const addNewProfile = (e:any) => {
        if(profileName === ""){
            e.preventDefault()
            setErrorMessage("Nazwa profilu nie może być pusta")
            return
        }
        addProfile(new UserProfile(profileName))
    }

    return (
        <CenterPanel>
            <p className="text-3xl">Nazwa profilu</p>
            <ProfileAvatarBig name={profileName}></ProfileAvatarBig>
            <TextInput onChange={(e: any) => {setProfileName(e.target.value); setErrorMessage("")}} placeholder="Nazwa profilu"></TextInput>
            <p className="text-red-500 font-bold h-5">{errorMessage !== "" && errorMessage}</p>
            <div className="flex gap-2 w-full justify-center">
                <Link to="/"><Button>Wróć</Button></Link>
                <Link to="/" onClick={addNewProfile}><Button>Dodaj profil</Button></Link>
            </div>
        </CenterPanel>
    )
}
