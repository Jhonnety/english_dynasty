import { useContext } from 'react'
import { UserContext } from '../../contexts/UserProvider';
import { NavLink } from 'react-router-dom';


type SetIsSubMenuOpen = React.Dispatch<React.SetStateAction<boolean>>;

export const MenuProfile = ({ setIsSubMenuOpen }: { setIsSubMenuOpen: SetIsSubMenuOpen }) => {
    const { logOut } = useContext(UserContext);
    return (
        <div className='MenuProfileContainer fadeInDown'>
            <NavLink
                className=""
                to="/profile/"
                onClick={()=>setIsSubMenuOpen(false)}
            ><i className="fa-regular fa-id-card-clip"></i> Profile</NavLink>
            <NavLink
                className=""
                to="/profile/subscription"
                onClick={()=>setIsSubMenuOpen(false)}
            ><i className="fa-regular fa-gift"></i> Subscription</NavLink>
            <NavLink
                className=""
                to="/profile/credits"
                onClick={()=>setIsSubMenuOpen(false)}
            ><i className="fa-light fa-coin"></i> Credits</NavLink>
            <hr />
            <NavLink
                className=""
                to="/profile/favorties"
                onClick={()=>setIsSubMenuOpen(false)}
            ><i className="fa-regular fa-heart"></i> Favorties</NavLink>
            <NavLink
                className=""
                to="/profile/progress"
                onClick={()=>setIsSubMenuOpen(false)}
            ><i className="fa-regular fa-graduation-cap"></i> Progress</NavLink>
            <NavLink
                className=""
                to="/profile/comments"
                onClick={()=>setIsSubMenuOpen(false)}
            ><i className="fa-regular fa-comment"></i> Comments</NavLink>
            <button onClick={logOut}>Log out</button>
        </div>
    )
}
