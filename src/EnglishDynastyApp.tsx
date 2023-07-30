import { UserProvider, AuthPopUpContext } from './contexts'
import { ButtonLoadingProvider } from './contexts/ButtonLoadingProvider'
import { AppRouter } from './routers/AppRouter'



function App() {

  return (
    <ButtonLoadingProvider>
      <AuthPopUpContext>
        <UserProvider>
          <AppRouter />
        </UserProvider>
      </AuthPopUpContext>
    </ButtonLoadingProvider>
  )
}

export default App
