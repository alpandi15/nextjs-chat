import React from 'react'
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

export default withAuthSync(Home)