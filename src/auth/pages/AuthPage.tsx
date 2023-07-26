import { useContext } from "react";
import { AuthContext } from "../../contexts";
import image_girl2 from '../../assets/images/image_girl2.png'
import { Login } from "../components/Login";

export const AuthPage = () => {


    const { isAuthOpen, closeAll } = useContext(AuthContext);
    return (
        <>
            {isAuthOpen.login &&
                <>
                    <div className="authPageShadow" onClick={closeAll}></div>
                    <div className="authPageContainer">
                        <div className="authImageContainer">
                            <div className="authMessageContainer">
                                <h1>Welcome back to English Dynasty</h1>
                                <p>Sign in to continue to your account.</p>
                            </div>
                            <img src={image_girl2} alt="image_girl2" className="imageGirl2" />
                        </div>
                        <Login/>
                    </div>
                </>
            }
        </>
    )
}
