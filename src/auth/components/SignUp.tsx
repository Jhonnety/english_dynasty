import { FormEvent, useContext } from "react";
import { useForm } from "../../hooks/useForm"
import { UserContext } from "../../contexts/UserProvider";
import { AuthContext } from "../../contexts";

export const SignUp = () => {
  const { email, password, confirmPassword, onInputChange } = useForm({
    email: "", password: "", confirmPassword: ""
  })
  const { signUp } = useContext(UserContext);
  const { closeAll, openLogin } = useContext(AuthContext);
  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signUp(email, password)
  }
  return ( 
    <div className="loginContainer fadeInRight">
      <button onClick={closeAll} className="exitLogin"><i className="fa-light fa-circle-xmark"></i></button>
      <h1 className="signUpTitle">Ready to get started? <b>Sign up for your account.</b></h1>
      <form onSubmit={handleLogin} className="loginForm">
        <div className="formControlLogin">
          <i className="fa-solid fa-envelope"></i>
          <input
            name="email"
            value={email}
            onChange={onInputChange}
            type="email"
            className="inputLoginForm"
            placeholder="Email address" />
        </div>
        {false && <span className="errorFormLogin">{"errorForm.emailError"}</span>}
        <div className="formControlLogin">
          <i className="fa-duotone fa-key"></i>
          <input
            name="password"
            value={password}
            onChange={onInputChange}
            type="password"
            className="inputLoginForm"
            placeholder="Password" />
        </div>
        {false && <span className="errorFormLogin">{"errorForm.passwordError"}</span>}
        <div className="formControlLogin">
          <i className="fa-solid fa-key"></i>
          <input
            name="confirmPassword"
            value={confirmPassword}
            onChange={onInputChange}
            type="password"
            className="inputLoginForm"
            placeholder="Confirm password" />
        </div>
        {false && <span className="errorFormLogin">{"errorForm.passwordError"}</span>}
        <button type="submit" className="submitLoginButton">Login</button>
      </form>
      <a onClick={openLogin} className="signUpLink">Already have an account? <b>Login</b></a>
    </div>
  )
}
