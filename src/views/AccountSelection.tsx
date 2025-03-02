import { Link } from "react-router";
import { CenterPanel } from "./ui-components";
import { AccountAvatarBig } from "./ui-components/AccountAvatarBig";
import { useTestStore } from "../TestStore";

export function AccountSelection() {
    const zustandText = useTestStore((state) => state.test)

    return (
        <CenterPanel>
            <div id="tooltip-default" role="tooltip" className="tooltip invisible">xdxd</div>
            <p className="text-3xl m-5">Wybierz użytkownika:</p>
            <p>Zustand test: {zustandText}</p>
            <div className="flex w-4/8 gap-5 justify-center flex-wrap">
                <Link to="/home" data-tooltip-target="tooltip-default"><AccountAvatarBig name="Użytkownik Testowy" /></Link>
                <AccountAvatarBig add />
            </div>
        </CenterPanel>
    )
}
