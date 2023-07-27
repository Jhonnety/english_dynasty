import { useContext } from "react";
import { AuthContext } from "../../contexts";
import image_boy1 from '../../assets/images/image_boy1.png'
import { SignUp , ForgotPassword, Login} from "../components";



export const AuthPage = () => {
    const { isAuthOpen, closeAll } = useContext(AuthContext);

    return (
        <>
            {(isAuthOpen.forgotPassword || isAuthOpen.login || isAuthOpen.signUp) && (
                <>
                    <div className="authPageShadow" onClick={closeAll}></div>
                    <div className="authPageContainer bounceInUp">
                        <div className="authImageContainer">
                            <div className="authMessageContainer">
                                <h1>Welcome back to English Dynasty</h1>
                                <p>Sign in to continue to your account.</p>
                            </div>
                            <img src={image_boy1} alt="image_girl2" className="imageGirl2" />
                        </div>
                        {isAuthOpen.login && <Login />}
                        {isAuthOpen.signUp && <SignUp />}
                        {isAuthOpen.forgotPassword && <ForgotPassword/>}
                    </div>
                </>
            )}
        </>
    );
};
