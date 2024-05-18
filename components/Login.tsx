import { FunctionComponent } from "preact";

type LoginProps = {
    message?: string
}

//action login en el form es la ruta a la que se envia el formulario

const Login:FunctionComponent<LoginProps> = ({message}) => {
    return(
        <div class = "login-container">
            <h2>Login</h2>
            {message && <p class = "error-message">Incorrect credentials or user does not exist</p>}
            <form method = "POST" action = "/login">
                <label for="email">Email</label>
                <input type="text" id="email" name="email" required></input>
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required></input>
                <button type="submit">Login</button>
                <p class="register-link">Don't have an account? <a href="/register">Register</a></p>
            </form>
        </div>
    )
}

export default Login;