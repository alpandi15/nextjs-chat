import type { AppProps, AppContext } from 'next/app'
import Pusher from 'pusher-js'
import getConfig from 'next/config'
import { FC, useState, useEffect } from 'react'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { config, dom } from "@fortawesome/fontawesome-svg-core"
import { SyncLoader } from 'react-spinners'
import { QueryClientProvider, QueryClient } from 'react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'
import styled from 'styled-components'
import GlobalStyle from '../styles/GlobalStyle'
import { logout } from '../services/auth'
import ApplicationContext, { AppContextType, UserDataContext } from '../context/AppContext'
import { useRouteState } from '../hook/useRouteState'
import { getCookies } from '../services/utils/storage'
import { TOKEN } from '../constants'
import store from '../redux/store'
import '../styles/tailwind.css'

config.autoAddCss = false;
const queryClient = new QueryClient()

const { publicRuntimeConfig } = getConfig()

function MyApp({
  Component,
  pageProps,
  user
}: AppProps & AppContextType) {
  const routeState = useRouteState();
  // const [pusher, setPusher] = useState<Pusher>()
  const [notification, setNotification] = useState({})

  useEffect(() => {
    (async () => {
      if (typeof window !== 'undefined') {
        let pusher: Pusher
        if (process.env.NODE_ENV !== 'production') {
          // Enable pusher logging - isn't included in production
          Pusher.logToConsole = true
        }
      
        const token = await getCookies(TOKEN)
        if (token && user) {
          pusher = new Pusher('58207882627042a86186', {
            cluster: 'ap1',
            forceTLS: true,
            authEndpoint: `${publicRuntimeConfig.API_URL}broadcasting/auth`,
            auth: {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          })
          joinChannel(pusher, user)
        }
      }
    })()
  }, [TOKEN, user])
  
  const joinChannel = (pusher: Pusher, user: UserDataContext) => {
    if(pusher) {
      pusher.subscribe(`private-App.Models.User.${user?.id}`)
      pusher.bind('Illuminate\\Notifications\\Events\\BroadcastNotificationCreated',
      (data: any) => {
        console.log('RECEIVED ', data)
        setNotification(data)
      })
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ApplicationContext.Provider
          value={{
            user,
            logout,
            notification
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
  let pageProps: any = {}
  // let user: UserDataContext = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  // const response = await apiGetProfile(ctx)
  // console.log('AUTH ', pageProps)
  // if (response?.success) {
  //   user = response?.data
  // }

  return {
    pageProps,
    navigation: 'Navigasi Ini',
    user: pageProps?.user
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