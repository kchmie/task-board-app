import { stringToColor } from "../../util"

export function AccountAvatarBig(props: any) {
    const initials = props.add ? "" : (props.name as string).split(" ").map(word => word[0]?.toUpperCase()).join("")

    return (
        <>
            <div className={`${props.add ? "bg-slate-100" : stringToColor(props.name)} flex max-w-sm p-6 border border-gray-200 rounded-lg shadow-sm w-25 h-25 items-center justify-center overflow-hidden`}
                onClick={props.onClick}>
                {props.add ? <p className="text-3xl font-semibold">+</p> : <p className="text-3xl font-semibold">{initials}</p>}
            </div>
        </>
    )
};
