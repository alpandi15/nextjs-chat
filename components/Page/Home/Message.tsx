import { connect } from 'react-redux'
import {
  // faCheck,
  faTimes,
  faCheckDouble,
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
import { useAppContext } from '../../../hook/useAppData'

function MessageFunction({
  profile,
  groupSortMessage
}: any) {
  const { user } = useAppContext()
  const getDateFunction = (date: any) => {
    var d = date; 
    let month = d.getMonth()+1; 
    let day = d.getDate(); 
    let output = ((""+day).length<2 ? "0" : "") + day + "/" + ((""+month).length<2 ? '0' : "") + month + "/" + d.getFullYear()
    return output
  }

  const checkDate = (date: any) => {
    let today = getDateFunction(new Date())
    let yesterday: any = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    yesterday = getDateFunction(yesterday)
    if(today === date){
      return 'Hari ini'
    }else if(yesterday === date){
      return 'Kemarin'
    }else{
      return date
    }   
  }

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
              {
                Object.keys(groupSortMessage)?.map((group) => (
                  <div key={group}>
                    <div className="date pb-2">
                      <div className="bg-blue-600 text-white text">{checkDate(group)}</div>
                    </div>
                    {
                      groupSortMessage[group].map((message: any) => {
                        if (user?.id === message?.pengirim) {
                          return (
                            <div className="w-full flex justify-end pb-2 messages" key={message?.id}>
                              <div className="bg-green-100 py-1 px-2 text-xs rounded-b-lg rounded-tl-lg text-black">
                                <p className="inline-block">{message?.message}</p>
                                <div className="times flex justify-end items-center">
                                  <span className="text-xs ml-2 inline-block">{message.time}</span>
                                  <div className="ml-1">
                                    {
                                      message?.read_at === null ? (
                                        <FontAwesomeIcon className="text-gray-400" icon={faCheckDouble} />
                                      ) : (
                                        <FontAwesomeIcon className="text-green-500" icon={faCheckDouble} />
                                      )
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        }
                        return (
                          <div className="w-full flex justify-start pb-2 messages" key={message?.id}>
                            <div className="bg-gray-200 py-1 px-2 text-xs rounded-b-lg rounded-tl-lg text-black">
                              <p className="inline-block">{message?.message}</p>
                              <div className="times flex justify-end items-center">
                                <span className="text-xs ml-2 inline-block">{message?.time}</span>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                ))
              }
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
    profile: messageStore?.profile,
    messages: messageStore?.messages,
    groupSortMessage: messageStore?.groupSortMessage
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  getContactsData: () => dispatch(getContactsData()),
  getProfileData: (id: number) => dispatch(getProfileData(id))
})

export const MessageConversation = connect(mapStateToProps, mapDispatchToProps)(MessageFunction)
