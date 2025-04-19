import { Link } from "react-router";
import { CenterPanel, ProfileAvatarBig, Button } from "./ui-components";
import { useAppStore } from "../AppStore";

export function ProfileSelection() {
    const { userProfiles, removeProfile, setActiveProfile } = useAppStore()

    const removeLastProfile = () => {
        removeProfile(userProfiles[userProfiles.length - 1])
    }

    return (
        <CenterPanel>
            <p className="text-3xl m-5">Wybierz profil:</p>
            <div className="flex mx-5 lg:w-6/8 gap-5 justify-center flex-wrap">
                {userProfiles.map((profile, i) => {
                    return <Link key={i} to="/home" onClick={() => { setActiveProfile(profile) }}><ProfileAvatarBig name={profile.profileName} /></Link>
                })}
                <Link to="/createprofile"><ProfileAvatarBig add/></Link>
                
            </div>
            <Button onClick={removeLastProfile}>Usuń ostatni profil</Button>
        </CenterPanel>
    )
}
