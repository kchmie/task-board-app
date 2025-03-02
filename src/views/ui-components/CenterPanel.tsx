
export function CenterPanel(props: any) {
    return (
        <div className='h-screen items-center justify-center flex flex-col gap-3'>
            {props.children}
        </div>
    )
}
