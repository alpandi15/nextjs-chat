import type { AppProps, AppContext } from 'next/app'
import { FC } from 'react'
import Head from 'next/head'
import { connect, Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import { config, dom } from "@fortawesome/fontawesome-svg-core"
import { SyncLoader } from 'react-spinners'
import { QueryClientProvider, QueryClient } from 'react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'
import styled from 'styled-components'
import GlobalStyle from '../styles/GlobalStyle'
import { apiGetProfile, logout } from '../services/auth'
import ApplicationContext, { AppContextType, UserDataContext } from '../context/AppContext'
import { useRouteState } from '../hook/useRouteState'
import store from '../redux/store'
import '../styles/tailwind.css'

config.autoAddCss = false;
const queryClient = new QueryClient()

function MyApp({
  Component,
  pageProps,
  user
}: AppProps & AppContextType) {
  const routeState = useRouteState();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ApplicationContext.Provider
          value={{
            user,
            logout
          }}
        >
          <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <style>{dom.css()}</style>
          </Head>
          <>
            <Component {...pageProps} />
            {routeState === "start" && (
              <Preloader>{routeState}</Preloader>
            )}
          </>
          <GlobalStyle />
        </ApplicationContext.Provider>
        {/* <ReactQueryDevtools /> */}
      </Provider>
    </QueryClientProvider>
  )
}

MyApp.getInitialProps = async ({Component, ctx}: AppContext) => {
  let pageProps = {}
  let user: UserDataContext = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  const response = await apiGetProfile(ctx)
  if (response?.success) {
    user = response?.data
  }

  return {
    pageProps,
    navigation: 'Navigasi Ini',
    user
  }
}

// const makeStore = () => {
//   return store
// }
export default MyApp

const Preloader: FC = () => (
  <ContentLoader>
    <div>
      <SyncLoader color="#2ca58d" />
    </div>
  </ContentLoader>
)

const ContentLoader = styled.div`
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255,255,255, 0.7);
`