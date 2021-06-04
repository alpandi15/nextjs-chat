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
import { updateStatusContact } from '../../redux/actions/contact'

const Home = ({
  updateStatusContact
}: any) => {
  React.useEffect(() => {
    const intervalStatus = setInterval(async () => {
      await updateStatusContact()
    }, 58000)
    
    return () => {
      clearInterval(intervalStatus)
    }
  }, [])

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
const mapDispatchToProps = (dispatch: any) => ({
  updateStatusContact: () => dispatch(updateStatusContact())
})

export default withAuthSync(connect(mapStateToProps, mapDispatchToProps)(Home))