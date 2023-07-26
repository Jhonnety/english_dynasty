import { FormEvent, useContext } from "react";
import { useForm } from "../../hooks/useForm"
import { UserContext } from "../../contexts/UserProvider";
import { AuthContext } from "../../contexts";

export const Login = () => {
  const { login, loginWithGoogle } = useContext(UserContext);
  const { closeAll } = useContext(AuthContext);
  const { email, password, onInputChange } = useForm({
    email: "", password: ""
  })
  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(email, password)
  }
  const handleGoogle = () => {
    loginWithGoogle()
  }

  return (
    <div className="loginContainer">
      <button onClick={closeAll} className="exitLogin"><i className="fa-light fa-circle-xmark"></i></button>
      <div className="loginProvidersContainer">
        <button type="button" onClick={handleGoogle} className="authGoogleButton"><i className="fa-brands fa-google"></i> Continue with Google</button>
      </div>
      <div className="lineOr"><h1>or</h1></div>
      <form onSubmit={handleLogin} className="loginForm">
        <div className="formControlLogin">
        <i className="fa-regular fa-envelope"></i>
          <input
            name="email"
            value={email}
            onChange={onInputChange}
            type="email"
            className="inputLoginForm"
            placeholder="Email address" />
        </div>
        <div className="formControlLogin">
          <i className="fa-regular fa-key"></i>
          <input
            name="password"
            value={password}
            onChange={onInputChange}
            type="password"
            className="inputLoginForm"
            placeholder="password"/>
        </div>
        <button type="submit" className="submitLoginButton">Login</button>
      </form>
      <a href="" className="forgotPasswordLink">Forgot password?</a>
      <a href="" className="signUpLink">Not a member yet? <b>Sign up</b></a>
    </div>
  )
}
