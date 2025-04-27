
export function LightButton(props: any) {
    return (
        <button className={props.className + " bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-200 cursor-pointer"}
            onClick={props.onClick}>
            {props.children}
        </button>
    )
}
