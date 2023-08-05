import { NavLink } from 'react-router-dom';

type SetIsSubMenuOpen = React.Dispatch<React.SetStateAction<boolean>>;

export const MenuGames = ({ setIsSubMenuOpen }: { setIsSubMenuOpen: SetIsSubMenuOpen }) => {

    return (
        <>
            <div className='MenuGamerContainer fadeInDown'>
                <NavLink
                    className=""
                    to="/games/swordmaster"
                    onClick={() => setIsSubMenuOpen(false)}
                ><i className="fa-solid fa-swords"></i> Swordmaster's Lexicon: Blade of Words</NavLink>
                <NavLink
                    className=""
                    to="/games/wordarrow"
                    onClick={() => setIsSubMenuOpen(false)}
                ><i className="fa-solid fa-bow-arrow"></i> WordArrow Mastery: Precision Challenge</NavLink>
                {/*                 <NavLink
                    className=""
                    to="/profile/credits"
                    onClick={() => setIsSubMenuOpen(false)}
                ><i className="fa-solid fa-helmet-battle"></i> Linguistic Master: Lord of Words</NavLink>
                <NavLink
                    className=""
                    to="/profile/credits"
                    onClick={() => setIsSubMenuOpen(false)}
                ><i className="fa-solid fa-hood-cloak"></i> Vocab Overlord: Language Conqueror</NavLink>
 */}
            </div>
        </>
    )
}
