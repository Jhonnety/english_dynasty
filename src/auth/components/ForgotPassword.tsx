import { FormEvent, useContext } from "react";
import { AuthContext, UserContext } from "../../contexts";
import { useForm } from "../../hooks/useForm";
import { useMessage } from "../../hooks/useMessage";
import { ButtonLoadingContext } from "../../contexts/ButtonLoadingProvider";
import { Loading } from "../../components";


export const ForgotPassword = () => {
    const { closeAll, openLogin } = useContext(AuthContext);
    const { createMessage } = useMessage()
    const { resetPassword } = useContext(UserContext);
    const { email, onInputChange, onResetForm } = useForm({
        email: "", password: "", confirmPassword: ""
    })
    const { loading } = useContext(ButtonLoadingContext);
    
    const handleForgotPassword = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (email == '') {
            createMessage({
                kind: 'error',
                title: 'Send reset password email failed',
                paragraph: 'The email is required.'
            });
        }
        else if (!(email.includes("@") && email.includes("."))) {
            createMessage({
                kind: 'error',
                title: 'Send reset password email failed',
                paragraph: 'The email is not valid.'
            });
        }
        else {
            resetPassword(email, onResetForm);
        }
    }
    return (
        <div className="loginContainer fadeInRight">
            <button onClick={closeAll} className="exitLogin"><i className="fa-light fa-circle-xmark"></i></button>
            <h1 className="signUpTitle">Forgot Your Password? <b>No Worries, We've Got You Covered!</b></h1>
            <form onSubmit={handleForgotPassword} className="loginForm">
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
                <button type="submit" className="submitLoginButton" disabled={loading}>{ loading ? <Loading/> : 'Send Reset Email'}</button>
            </form>

            <a onClick={openLogin} className="signUpLink">Continue to <b>Login</b></a>
        </div>
    )
}
