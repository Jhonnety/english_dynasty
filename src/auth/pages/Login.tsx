import { FormEvent, useContext } from "react";
import { useForm } from "../../hooks/useForm"
import { UserContext } from "../../contexts/UserProvider";

export const Login = () => {
  const { login, loginWithGoogle, englishUser } = useContext(UserContext);
  const { displayName } = englishUser
  console.log(displayName)
  const { email, password, onInputChange } = useForm({
    email: "", password: ""
  })
  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(email, password)
  }
  const handleGoogle = () => {
    loginWithGoogle()
  }

  return (
    <form onSubmit={handleLogin}>
      {displayName && (<h1>{displayName}</h1>)}
      <input
        name="email"
        value={email}
        onChange={onInputChange}
        type="email" />
      <input
        name="password"
        value={password}
        onChange={onInputChange}
        type="password" />
      <button type="submit">Login</button>
      <button type="button" onClick={handleGoogle}>Login with google</button>
    </form>
  )
}
