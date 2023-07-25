import { ReactNode } from "react"

interface AuthPage {
    children: ReactNode
}

export const AuthPage = ({ children }: AuthPage) => {
    return <div className="authPageContainer">{children}</div>
}
