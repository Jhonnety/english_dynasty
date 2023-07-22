import { createContext, useState } from 'react';
import { EnglishUser } from '../models';



interface UserContextProps {
  englishUser:EnglishUser;
  changeEnglishUser: (newEnglishUser: EnglishUser) => void;
}

export const UserContext = createContext<UserContextProps>({
  englishUser:{},
  changeEnglishUser: () => {},
});

export const UserProvider = ({
  children
}:any) => {
  const [englishUser, setEnglishUser] = useState({});

  const changeEnglishUser = (newEnglishUser: EnglishUser) => {
    setEnglishUser(newEnglishUser);
  };

  return (
    <UserContext.Provider value={{ englishUser, changeEnglishUser }}>
      {children}
    </UserContext.Provider>
  );
};
