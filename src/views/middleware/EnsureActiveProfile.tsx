import { Navigate, Outlet } from "react-router"
import { useAppStore } from "../../AppStore"

export const EnsureActiveProfile = () => {
    const { activeProfile } = useAppStore()
    return activeProfile === null ? <Navigate to="/" replace /> : <Outlet />
}
