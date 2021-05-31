import { connect } from 'react-redux'
import {
  faCheck,
  faTimes,
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getContactsData } from '../../../redux/actions/contact'
import { getProfileData } from '../../../redux/actions/message'
import {
  Header,
  ProfileImg,
  ActionContent,
  ButtonIcon,
  ScrollMessage,
  FormSendMessage,
  InputMessage
} from './styles'

function MessageFunction({
  profile
}: any) {
  if (profile?.id) {
    return (
      <>
        <Header>
          <ProfileImg>
            <img src="/profile.png" alt=""/>
            <div style={{
              padding: '0 8px'
            }}>
              <div className="username">{profile?.name}</div>
              <div className="status">{profile?.terakhir_dilihat}</div>
            </div>
          </ProfileImg>
          <ActionContent>
            <ButtonIcon onClick={() => console.log()}>
              <FontAwesomeIcon color="#919191" icon={faTimes}/>
            </ButtonIcon>
          </ActionContent>
        </Header>
        <ScrollMessage className="overflow-auto flex flex-col-reverse">
          <div className="wrapper w-full p-4">
            <div className="content w-full">
              <div className="date pb-2">
                <div className="bg-blue-600 text-white text">Hari Ini</div>
              </div>
              <div className="message">
                <div className="w-full flex justify-end pb-2 messages">
                  <div className="bg-green-200 py-1 px-2 text-xs rounded-b-lg rounded-tl-lg text-black">
                    <p className="inline-block">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus, quibusdam! </p>
                    <div className="times flex justify-end items-center">
                      <span className="text-xs ml-2 inline-block">10.30</span>
                      <div className="ml-1">
                        <FontAwesomeIcon className="text-blue-500" icon={faCheck} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-start pb-2 messages">
                  <div className="bg-gray-200 py-1 px-2 text-xs rounded-b-lg rounded-tl-lg text-black">
                    <p className="inline-block">yoi</p>
                    <div className="times flex justify-end items-center">
                      <span className="text-xs ml-2 inline-block">10.30</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollMessage>
        <FormSendMessage className="flex bottom-0 w-full">
          <div className="w-full">
            <form action="" className="py-2 px-3 w-full flex">
              <InputMessage
                placeholder="Tulis sesuatu..."
              />
              <div className="right-icon">
                <FontAwesomeIcon color="#919191" icon={faPaperPlane} />
              </div>
            </form>
          </div>
        </FormSendMessage>
      </>
    )
  }
  return null
}

const mapStateToProps = (state: any) => {
  const {
    messageStore
  } = state
  return {
    profile: messageStore?.profile
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  getContactsData: () => dispatch(getContactsData()),
  getProfileData: (id: number) => dispatch(getProfileData(id))
})

export const MessageConversation = connect(mapStateToProps, mapDispatchToProps)(MessageFunction)
