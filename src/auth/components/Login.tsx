import { FormEvent, useContext } from "react";
import { useForm } from "../../hooks/useForm"
import { UserContext } from "../../contexts/UserProvider";

export const Login = () => {
  const { login, loginWithGoogle, englishUser } = useContext(UserContext);
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
      { englishUser && JSON.stringify(englishUser)}
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
