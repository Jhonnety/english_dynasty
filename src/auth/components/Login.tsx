import { FormEvent, useContext, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm"
import { UserContext } from "../../contexts/UserProvider";
import { AuthContext } from "../../contexts";
import { useMessage } from "../../hooks/useMessage";

export const Login = () => {
  const { login, loginWithGoogle } = useContext(UserContext);
  const { closeAll } = useContext(AuthContext);
  const { email, password, onInputChange } = useForm({
    email: "", password: ""
  })
  const { createMessage } = useMessage()
  const [errorForm, setErrorForm] = useState({ emailError: '', passwordError: '' })
  const [touchedForm, setTouchedForm] = useState(false)

  useEffect(() => {
    if (touchedForm) {
      let emailError: string = "";
      let passwordError: string = ""

      if (email == '') emailError = 'Email is required.';
      else if (!(email.includes("@") && email.includes("."))) emailError = 'Email no valid.';
      if (password == '') passwordError = 'Password is required.';

      setErrorForm({
        emailError: emailError,
        passwordError: passwordError
      })
    }
  }, [email, password, touchedForm])


  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouchedForm(true)

    if (!touchedForm && (errorForm.emailError != '' || errorForm.passwordError != '')) {
      createMessage({
        kind: 'error',
        title: 'Login Failed',
        paragraph: 'Check the fields'
      });
    }
    else login(email, password);
  }



  return (
    <div className="loginContainer">
      <button onClick={closeAll} className="exitLogin"><i className="fa-light fa-circle-xmark"></i></button>
      <div className="loginProvidersContainer">
        <button type="button" onClick={loginWithGoogle} className="authGoogleButton"><i className="fa-brands fa-google"></i> Continue with Google</button>
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
        {errorForm.emailError != '' && <span className="errorFormLogin">{errorForm.emailError}</span>}
        <div className="formControlLogin">
          <i className="fa-regular fa-key"></i>
          <input
            name="password"
            value={password}
            onChange={onInputChange}
            type="password"
            className="inputLoginForm"
            placeholder="Password" />
        </div>
        {errorForm.passwordError != '' && <span className="errorFormLogin">{errorForm.passwordError}</span>}
        <button type="submit" className="submitLoginButton">Login</button>
      </form>
      <a href="" className="forgotPasswordLink">Forgot password?</a>
      <a href="" className="signUpLink">Not a member yet? <b>Sign up</b></a>
    </div>
  )
}
