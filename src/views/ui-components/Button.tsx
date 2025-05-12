
export function Button(props: any) {
    return (
        <button className={props.className + " bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-md cursor-pointer"}
            onClick={props.onClick}>
            {props.children}
        </button>
    )
}
