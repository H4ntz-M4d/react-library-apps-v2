import { RoleContent } from "../content/RoleContent"
import { RoleProvider } from "../context/RoleContext"

export const RolePage = () => {
    return (
        <RoleProvider>
            <RoleContent />
        </RoleProvider>
    )
}