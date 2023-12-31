
import { UserProvider, AuthPopUpContext, TimeProvider } from './contexts'
import { ButtonLoadingProvider } from './contexts/ButtonLoadingProvider'
import { AppRouter } from './routers/AppRouter'


export const EnglishDynastyApp = () => {

  return (
    <ButtonLoadingProvider>
      <AuthPopUpContext>
        <UserProvider>
          <TimeProvider>
            <AppRouter />
          </TimeProvider>
        </UserProvider>
      </AuthPopUpContext>
    </ButtonLoadingProvider>
  )
}

