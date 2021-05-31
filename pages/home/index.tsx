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

const Home = () => {
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