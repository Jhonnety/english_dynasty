import { UserProvider } from './contexts/UserProvider'
import { AppRouter } from './routers/AppRouter'



function App() {

  return (
    <UserProvider>
      <AppRouter/>
    </UserProvider>
  )
}

export default App
