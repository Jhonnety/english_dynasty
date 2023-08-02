
import { ChangeEvent, useContext } from "react";
import { useForm } from "../../hooks/useForm"
import { UserContext } from "../../contexts";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/Initialization";
import { useMessage } from "../../hooks/useMessage";
import { ButtonLoadingContext } from "../../contexts/ButtonLoadingProvider";
import { Loading } from "../../components";

export const InfoUser = () => {
    const { englishUser } = useContext(UserContext);
    const { createMessage, savedChanges } = useMessage();
    const { isNotLoading, isLoading, loading } = useContext(ButtonLoadingContext);
    const { fullName, onInputChange, email, englishLvl, country, interests } = useForm({
        fullName: englishUser.fullName,
        email: englishUser.email,
        englishLvl: englishUser.englishLvl,
        country: englishUser.country,
        interests: englishUser.interests
    });
    const validLvl = (event: ChangeEvent<HTMLInputElement>) => {
        const allowedValues1 = ['A', 'B', 'C', 'a', 'b', 'c'];
        const value = event.target.value;
        const allowedValues2 = [1, 2];

        if (value.length == 1 && !allowedValues1.includes(value)) {
            return false;
        }
        else if (value.length == 2 && !allowedValues2.includes(parseInt(value[1]))) {
            return false;
        }
        else onInputChange(event)
    }

    const handleUpdateUser = async () => {
        isLoading();
        const idForm = englishUser.idForm + "";
        const usersRef = doc(db, "users", idForm);

        await updateDoc(usersRef, {
            ...englishUser,
            fullName,
            englishLvl,
            country,
            interests

        }).then(() => {
            savedChanges()
            isNotLoading();
        })
            .catch((e) => {
                createMessage({
                    kind: 'error',
                    title: 'Error Saving Changes',
                    paragraph: 'We apologize, but there was an error while attempting to save your changes. Please check your internet connection and try again later.',
                    error: e
                });
                isNotLoading();
            })

    }
    return (
        <div className="infoUserContainer">
            <ol className="infoUserList">
                <li className="infoUserItem">
                    <h3 className="infoUserTitle">Full name: </h3>
                    <input className="infoUserInput" name="fullName" value={fullName} onChange={onInputChange} placeholder="Full name" />
                </li>
                <li className="infoUserItem">
                    <h3 className="infoUserTitle">Email: </h3>
                    <input className="infoUserInput" readOnly name="email" value={email} onChange={onInputChange} placeholder="Email" />
                </li>
                <li className="infoUserItem">
                    <h3 className="infoUserTitle">English lvl: </h3>
                    <input className="infoUserInput" maxLength={2} name="englishLvl" value={englishLvl} placeholder="A1, A2, B1, B2, C1, C2" onChange={validLvl} />
                </li>
                <li className="infoUserItem">
                    <h3 className="infoUserTitle">Country: </h3>
                    <input className="infoUserInput" name="country" value={country} placeholder="e.g., Spain" onChange={onInputChange} />
                </li>
                <li className="infoUserItem">
                    <h3 className="infoUserTitle">Interests: </h3>
                    <input className="infoUserInput" name="interests" value={interests} placeholder="Video games, culture, poker, etc" onChange={onInputChange} />
                </li>
            </ol>
            <div className="infoUserButtonsContainer">
                <button onClick={handleUpdateUser} className="saveInforUserChangesButton" disabled={loading}>{loading ? <Loading /> : <><i className="fa-solid fa-floppy-disk"></i> Save changes</>}</button>
            </div>

        </div>
    )
}
