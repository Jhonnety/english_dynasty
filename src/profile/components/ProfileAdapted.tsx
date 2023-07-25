import { useContext } from 'react';
import { UserContext } from '../../contexts/UserProvider';

function getFirstName(fullName: string) {
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0];
    const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    return capitalizedFirstName;
}

export const ProfileAdapted = () => {
    const { englishUser } = useContext(UserContext)
    return (
        <>
            {englishUser.uid &&
                <div className='userProfile'>
                    <h1>Hello, {getFirstName(englishUser.name + "")}</h1>
                    <img src={englishUser.url} />
                </div>
            }
        </>
    )
}
