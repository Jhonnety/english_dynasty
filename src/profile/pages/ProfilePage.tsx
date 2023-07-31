import { CreditsUser, ProfileUser } from "../components"

export const ProfilePage = () => {
  return (
    <div className="profilePageContainer">
      <div className="profileUserColumn">
        <ProfileUser />
        <CreditsUser />
      </div>
      <div className="infoUserColumn">

      </div>

    </div>
  )
}
