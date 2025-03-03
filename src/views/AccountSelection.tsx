import { Link } from "react-router";
import { CenterPanel, AccountAvatarBig } from "./ui-components";
import { useAppStore } from "../AppStore";
import UserProfile from "../controllers/UserProfile";

export function AccountSelection() {
    const {userProfiles, addProfile} = useAppStore()

    const addProfiles = () => {
        addProfile(new UserProfile("John Doe", "Test"))
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
        </CenterPanel>
    )
}
