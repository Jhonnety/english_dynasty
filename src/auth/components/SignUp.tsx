import { FormEvent, useContext } from "react";
import { useForm } from "../../hooks/useForm"
import { UserContext } from "../../contexts/UserProvider";

export const SignUp = () => {
  const { email, password, onInputChange } = useForm({
    email: "", password: ""
  })
  const { signUp } = useContext(UserContext);
  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signUp(email, password)
  }
  return (
    <form onSubmit={handleLogin}>
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
      <button>Register</button>
    </form>
  )
}
