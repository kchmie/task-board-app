export const stringToColor = function (string: string) {
    const colors = [
        "bg-linear-to-bl from-cyan-200 to-blue-300",
        "bg-linear-to-bl from-sky-200 to-indigo-300",
        "bg-linear-to-bl from-violet-200 to-fuchsia-300",
        "bg-linear-to-bl from-purple-200 to-pink-300",
        "bg-linear-to-bl from-rose-200 to-indigo-300",
        "bg-linear-to-bl from-blue-200 to-pink-300",
        "bg-linear-to-bl from-emerald-200 to-pink-300",
        "bg-linear-to-bl from-teal-200 to-sky-300",
        "bg-linear-to-bl from-emerald-200 to-indigo-300",
        "bg-linear-to-bl from-teal-200 to-fuchsia-300",
    ]

    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];

}
