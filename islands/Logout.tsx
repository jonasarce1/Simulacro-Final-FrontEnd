import { FunctionComponent } from "preact";

const Logout: FunctionComponent = () => {
    const logout = () => {
        document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        window.location.href = "/login";
    }

    return(
        <a class="logout-button" onClick={logout}>Logout</a>
    )
}

export default Logout;