import { UserProvider, AuthPopUpContext } from './contexts'
import { AppRouter } from './routers/AppRouter'



function App() {

  return (
    <AuthPopUpContext>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </AuthPopUpContext>
  )
}

export default App
