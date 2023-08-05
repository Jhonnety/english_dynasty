import { useContext, useState } from 'react';
import { UserContext } from '../../contexts';
import animals from "../../assets/animals/ImagesAnimal";
import { ButtonLoadingContext } from '../../contexts/ButtonLoadingProvider';
import { db } from '../../firebase/Initialization';
import { doc, updateDoc } from 'firebase/firestore';
import { useMessage } from '../../hooks/useMessage';

function getFirstName(fullName: any) {
  if (fullName == undefined) return ""
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0];
  const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  return capitalizedFirstName;
}

export const ProfileUser = () => {
  const [isOpenProfiles, setIsOpenProfiles] = useState(false)
  const { englishUser, changeProfilePhoto } = useContext(UserContext);
  const { isNotLoading, isLoading, loading } = useContext(ButtonLoadingContext);
  const { savedChanges, createMessage } = useMessage()
  const onChangeProfile = (url: string) => {
    if (!loading) {
      changeProfilePhoto(url);
      saveProfilePhoto(url);
    }
  }

  const saveProfilePhoto = async (url: string) => {
    isLoading();
    const idForm = englishUser.idForm + "";
    const usersRef = doc(db, "users", idForm);

    await updateDoc(usersRef, {
      ...englishUser,

      url
    }).then(() => {
      setIsOpenProfiles(false)
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
    <>
      <div className="profileImageContainer">
        <div className="backgroundContainer"><div></div></div>
        <div className="imageProfile">
          <img src={(englishUser.url != "" && englishUser.url != undefined) ? englishUser.url : animals.animalPanda} />
          <button className='changeProfileButton'
            onClick={() => setIsOpenProfiles(!isOpenProfiles)}>
            <i className="fa-solid fa-clothes-hanger"></i>
          </button>
        </div>
        {isOpenProfiles &&
          <div className='changeProfileImageContainer fadeInDownAnimals'>
            <h1 className='selectAvatar'>Select your avatar!</h1>
            {
              Object.keys(animals).map((animal) => (
                <img key={animal} onClick={() => onChangeProfile(animals[animal])} className='animalImageProfile' src={animals[animal]} />
              ))
            }
            {
              !(englishUser.urlGoogle == "" || englishUser.urlGoogle == undefined) &&
              <img onClick={() => onChangeProfile(englishUser.urlGoogle as string)} className='animalImageProfile' src={englishUser.urlGoogle} />
            }
          </div>
        }
        <h1 className="nameProfile">{(englishUser.name != undefined && englishUser.name != "") ? getFirstName(englishUser.name) : getFirstName(englishUser.fullName)}</h1>
        <h1 className="subcriptionProfile">{englishUser.kind} account</h1>

      </div >
    </>
  )
}

