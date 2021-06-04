import React from 'react'
import { connect } from 'react-redux'
import { withAuthSync } from '../../components/Security/auth'
import { ListContact } from '../../components/Page/Home/Contacts'
import { MessageConversation } from '../../components/Page/Home/Message'
import {
  ContentLayout,
  Content,
  LeftSide,
  RightSide
} from '../../components/Page/Home/styles'
// import { useAppContext } from '../../hook/useAppData'

const Home = () => {
  // const { pusher, user } = useAppContext()
  // React.useEffect(() => {
  //   console.log('WINDOW ', pusher)
  //   if (pusher) {
  //     const channel = pusher.subscribe(`private-App.Models.User.${user?.id}`)
  //     .bind('Illuminate\\Notifications\\Events\\BroadcastNotificationCreated',
  //     (data: any) => {
  //       console.log('RECEIVED ', data)
  //     })
  //     console.log('Channel ', channel)
  //   }
  // }, [pusher])

  // React.useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     window.addEventListener('beforeunload', e => {
  //       e.returnValue = 'Are you sure you want to leave? You will lose your state'
  //     })
  //   }
  //   return () => {
  //     window.removeEventListener('beforeunload', e => {
  //       e.returnValue = 'Remove Listener'
  //     })
  //   }
  // }, [])

  return (
    <ContentLayout>
      <Content>
        <LeftSide>
          <ListContact />
        </LeftSide>
        <RightSide>
          <MessageConversation />
        </RightSide>
      </Content>
    </ContentLayout>
  )
}

const mapStateToProps = (state: any) => {
  const {
    messageStore
  } = state
  return {
    loadProfile: messageStore?.loadProfile
  }
}

export default withAuthSync(connect(mapStateToProps)(Home))