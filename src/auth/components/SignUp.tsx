import { FormEvent, useContext, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm"
import { UserContext } from "../../contexts/UserProvider";
import { AuthContext } from "../../contexts";
import { useMessage } from "../../hooks/useMessage";
import { TERMS_AND_CONDITIONS } from "../../utils";

export const SignUp = () => {
  const { email, password, confirmPassword, onInputChange, onResetForm } = useForm({
    email: "", password: "", confirmPassword: ""
  })
  const { signUp } = useContext(UserContext);
  const [isOpenTerms, setIsOpenTerms] = useState({ terms: false, animation: true })
  const { createMessage } = useMessage()
  const { closeAll, openLogin } = useContext(AuthContext);
  const [touchedForm, setTouchedForm] = useState(false)
  const [errorForm, setErrorForm] = useState({ emailError: '', passwordError: '', confirmPasswordError: '' });

  useEffect(() => {
    if (touchedForm) {
      let emailError: string = "";
      let passwordError: string = ""
      let confirmPasswordError: string = ""
      if (email == '') emailError = 'Email is required.';
      else if (!(email.includes("@") && email.includes("."))) emailError = 'Email no valid.';
      if (password == '') passwordError = 'Password is required.';
      if (password.length < 6) passwordError = 'The password must be at least 6 characters..';
      if (confirmPassword == '') confirmPasswordError = 'ConfirmPassword is required.';
      else if (password != confirmPassword) confirmPasswordError = 'The passwords must be the same.';

      setErrorForm({
        emailError: emailError,
        passwordError: passwordError,
        confirmPasswordError: confirmPasswordError
      })
    }
  }, [email, password, confirmPassword, touchedForm])

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouchedForm(true)

    if (errorForm.emailError != '' || errorForm.passwordError != '' || errorForm.confirmPasswordError != '') {
      createMessage({
        kind: 'error',
        title: 'Login Failed',
        paragraph: 'Check the fields'
      });
    }
    else if (!touchedForm && (email == "" || password == "" || confirmPassword == "" || password.length < 6 || password != confirmPassword)) {
      createMessage({
        kind: 'error',
        title: 'Login Failed',
        paragraph: 'Check the fields'
      });
    }
    else {
      signUp(email, password, resetSignUp)
    }

  }
  const resetSignUp = () => {
    onResetForm();
    setTouchedForm(false);
    setErrorForm({ emailError: '', passwordError: '', confirmPasswordError: '' });
  }
  return (
    <div className="loginContainer fadeInRight">
      <button onClick={closeAll} className="exitLogin"><i className="fa-light fa-circle-xmark"></i></button>
      <h1 className="signUpTitle">Ready to get started? <b>Sign up for your account.</b></h1>
      {isOpenTerms.terms
        ?
        <div className="textAreaContainer">
          <textarea readOnly className="termsAndConditionsTextArea fadeInRight" value={TERMS_AND_CONDITIONS}></textarea>
          <button onClick={() => setIsOpenTerms({ terms: false, animation: false })} className="termsAndConditionsButton"><i className="fa-solid fa-arrow-left"></i> Back</button>
        </div>
        :
        <form onSubmit={handleLogin} className={`loginForm ${!isOpenTerms.animation ? 'fadeInRight' : ''}`}>
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
              placeholder="Password (6 characters minimum)" />
          </div>
          {errorForm.passwordError && <span className="errorFormLogin">{errorForm.passwordError}</span>}
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
          {errorForm.confirmPasswordError && <span className="errorFormLogin">{errorForm.confirmPasswordError}</span>}
          <a onClick={() => setIsOpenTerms({ terms: true, animation: true })} className="termsAndConditionsLink">Terms and conditions.</a>
          <button type="submit" className="submitLoginButton">Sign Up</button>
        </form>
      }
      <a onClick={openLogin} className="signUpLink">Already have an account? <b>Login</b></a>
    </div>
  )
}
