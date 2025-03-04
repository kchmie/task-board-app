import { Link } from "react-router";
import { CenterPanel, AccountAvatarBig, Button } from "./ui-components";
import { useAppStore } from "../AppStore";
import UserProfile from "../controllers/UserProfile";

export function AccountSelection() {
    const {userProfiles, addProfile, removeProfile} = useAppStore()

    const addProfiles = () => {
        addProfile(new UserProfile(`${(Math.random() + 1).toString(36).substring(7)} ${(Math.random() + 1).toString(36).substring(7)}`, "Test"))
    }

    const removeLastProfile = () => {
        removeProfile(userProfiles[userProfiles.length-1])
    }

    return (
        <CenterPanel>
            <p className="text-3xl m-5">Wybierz użytkownika:</p>
            <div className="flex mx-5 lg:w-6/8 gap-5 justify-center flex-wrap">
                {userProfiles.map((profile, i) => {
                    return <Link key={i} to="/home"><AccountAvatarBig name={profile.profileName} /></Link>
                })}
                <AccountAvatarBig add onClick={addProfiles}/>
            </div>
            <Button onClick={removeLastProfile}>Usuń ostatni profil</Button>
        </CenterPanel>
    )
}
