
export function TextInput(props: any) {
    return (
        <input
            className={props.className + " p-2 mx-2 border border-gray-300 rounded-md focus:outline-none placeholder:text-gray-500"}
            placeholder={props.placeholder}
            onChange={props.onChange}
            value={props.value}
            ref={props.ref}
        />
    )

}
