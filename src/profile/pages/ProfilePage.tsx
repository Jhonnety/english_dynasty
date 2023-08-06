import { useContext, useEffect } from "react";
import { BannerPublicity, CreditsUser, InfoUser, ProfileUser } from "../components"
import { UserContext } from "../../contexts";
import { Loading } from "../../components";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/Initialization";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const suscribed = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate('/start');
      }
    });

    return () => suscribed();
  }, []);
  const { englishUser } = useContext(UserContext);

  return englishUser.uid !== undefined ? (
    <div className="profilePageContainer">
      <div className="profileUserColumn">
        <ProfileUser />
        <CreditsUser />
      </div>
      <div className="infoUserColumn">
        <InfoUser />
        <BannerPublicity />
      </div>
    </div>
  ) : (
    <div className="loadinProfilePage">
      <Loading />
    </div>
  );

}
