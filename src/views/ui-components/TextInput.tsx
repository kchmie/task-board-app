
export function TextInput(props: any) {
    return (
        <input
            className={props.className+" p-2 mr-2 shadow border border-gray-400 rounded focus:outline-none placeholder:text-black"}
            placeholder={props.placeholder}
            onChange={props.onChange}
            value={props.value}
            ref={props.ref}
        />
    )

}
