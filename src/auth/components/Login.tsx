import { FormEvent, useContext, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm"
import { UserContext } from "../../contexts/UserProvider";
import { AuthContext } from "../../contexts";
import { useMessage } from "../../hooks/useMessage";
import icon_google from "../../assets/icons/icon_google.png";
import icon_facebook from "../../assets/icons/icon_facebook.png";

export const Login = () => {
  const { login, loginWithGoogle, loginWithFacebook } = useContext(UserContext);
  const { closeAll, openForgotPassword } = useContext(AuthContext);
  const { email, password, onInputChange, onResetForm } = useForm({
    email: "", password: ""
  })
  const { createMessage } = useMessage()
  const [errorForm, setErrorForm] = useState({ emailError: '', passwordError: '' })
  const [touchedForm, setTouchedForm] = useState(false)
  const { openSignUp } = useContext(AuthContext);

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

    if (errorForm.emailError != '' || errorForm.passwordError != '') {
      createMessage({
        kind: 'error',
        title: 'Login Failed',
        paragraph: 'Check the fields'
      });
    }
    else if (!touchedForm && (email == "" || password == "")) {
      createMessage({
        kind: 'error',
        title: 'Login Failed',
        paragraph: 'The fields are required'
      });
    }
    else {
      login(email, password, resetLogin);
    }
  }
  const resetLogin = () => {
    onResetForm();
    setTouchedForm(false);
    setErrorForm({ emailError: '', passwordError: '' });
  }
  return (
    <div className="loginContainer  fadeInRight ">
      <button onClick={closeAll} className="exitLogin"><i className="fa-light fa-circle-xmark"></i></button>
      <div className="loginProvidersContainer">
        <button type="button" onClick={loginWithFacebook} className="otherProviderAuthButton"><img src={icon_facebook} /> <h3>Continue with Facebook</h3></button>
        <button type="button" onClick={loginWithGoogle} className="otherProviderAuthButton"><img src={icon_google} /> <h3>Continue with Google</h3></button>
      </div>
      <div className="lineOr"><h1>or</h1></div>
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
        {errorForm.emailError != '' && <span className="errorFormLogin">{errorForm.emailError}</span>}
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
        {errorForm.passwordError != '' && <span className="errorFormLogin">{errorForm.passwordError}</span>}
        <button type="submit" className="submitLoginButton">Login</button>
      </form>
      <a onClick={openForgotPassword} className="forgotPasswordLink">Forgot password?</a>
      <a onClick={openSignUp} className="signUpLink">Not a member yet? <b>Sign up</b></a>
    </div>
  )
}
