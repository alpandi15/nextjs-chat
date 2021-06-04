import { connect, useDispatch } from 'react-redux'
import {
  useForm
} from 'react-hook-form'
import {
  faCheck,
  faCheckDouble,
  faPaperPlane,
  faChevronLeft
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getContactsData, updateMessageContact } from '../../../redux/actions/contact'
import {
  getProfileData,
  addSetMessageData,
  setSortMessageDispatch,
  updateMessageDataDispatch,
  addScrollSetMessageData,
  endScrollMessage,
  resetProfileData
} from '../../../redux/actions/message'
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
import { useEffect, useRef, useState } from 'react'
import { UserDataContext } from 'context/AppContext'
import { readMessageData, apiAddMessageData } from '../../../services/message'
import { generateUuid } from '../../../services/utils/uuid'

type FormInputProps = {
  messages: string
}

function MessageFunction({
  profile,
  groupSortMessage,
  addSetMessageData,
  updateMessageContact,
  addScrollSetMessageData,
  endScroll,
  messages
}: any) {
  const [triggerScroll, setTriggerScroll] = useState(true)
  // const [batasPesan, setBatasPesan] = useState(true)
  const { user, notification } = useAppContext()
  const refContentMessage = useRef(null)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    reset
  } = useForm<FormInputProps>()

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

  useEffect(() => {
    (async () => {
      if(notification?.message !== undefined) {
        const { message } = notification
        if(message.status === 'created'){
          if((Number(message.penerima) === Number(user.id) && Number(profile.id) === Number(message.pengirim))){
            addSetMessageData(message, user)
          }
          if(Number(message.penerima) === Number(user.id) && (Number(message.pengirim) === Number(profile.id))) {
            readMessageData(profile.id)
            // console.log('diterima pesannya bro');
          }
        }
        else if(message.status === 'updated'){
          dispatch(updateMessageDataDispatch(message))
          dispatch(setSortMessageDispatch('timestamp'))
        }
      }
    })()
  }, [
    notification
    // user,
    // profile
  ])

  const onSubmit = async (data: FormInputProps) => {
    const uuid = await generateUuid()
    reset()
    await updateMessageContact({
      client_ref_id: uuid,
      pesan: data?.messages,
      pengirim: user?.id,
      penerima: profile?.id
    }, user)
    await addSetMessageData({
      client_ref_id: uuid,
      pesan: data?.messages
    }, user)
    await apiAddMessageData(profile?.id, {
      client_ref_id: uuid,
      pesan: data?.messages
    })
  }

  const scrollTrigger = async () => {
    let height: any = refContentMessage?.current
    let max_height = height.scrollHeight
    let on_scroll = height.scrollTop - height.offsetHeight
    let offset_height = height.offsetHeight
    // console.log('Scroll ', max_height, on_scroll, offset_height, triggerScroll, endScroll)
    if(on_scroll <= (- max_height) && triggerScroll && endScroll){
      setTriggerScroll(false)
      const res = await addScrollSetMessageData({ id: profile?.id, skip: messages?.length }, user)
      // console.log('Ambil Data Baru ', res)
      // setSkip((old) => old + 10)
      if(res?.length < 1){
        // setSkip(10)
        dispatch(endScrollMessage(false))
        // setBatasPesan(false)
      }
      height.scrollTop = - max_height + offset_height
      setTriggerScroll(true)
    }
  }

  if (profile?.id) {
    return (
      <>
        <Header>
          <ProfileImg>
            <ActionContent mobileVisible={profile?.id ? false : true}>
              <ButtonIcon onClick={() => dispatch(resetProfileData())}>
                <FontAwesomeIcon color="#919191" icon={faChevronLeft}/>
              </ButtonIcon>
            </ActionContent>
            <img src="/profile.png" alt=""/>
            <div style={{
              padding: '0 8px'
            }}>
              <div className="username">{profile?.name}</div>
              <div className="status">{profile?.terakhir_dilihat}</div>
            </div>
          </ProfileImg>
        </Header>
        <ScrollMessage
          ref={refContentMessage}
          onScroll={scrollTrigger}
          className="overflow-auto flex flex-col-reverse"
        >
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
                                        <FontAwesomeIcon className="text-gray-400" icon={faCheck} />
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
            <form onSubmit={handleSubmit(onSubmit)} className="py-2 px-3 w-full flex">
              <InputMessage
                placeholder="Tulis sesuatu..."
                {...register('messages')}
              />
              <button className="right-icon">
                <FontAwesomeIcon color="#919191" icon={faPaperPlane} />
              </button>
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
    groupSortMessage: messageStore?.groupSortMessage,
    endScroll: messageStore?.endScroll
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  getContactsData: () => dispatch(getContactsData()),
  getProfileData: (id: number) => dispatch(getProfileData(id)),
  addSetMessageData: (message: any, user: UserDataContext) => dispatch(addSetMessageData(message, user)),
  updateMessageContact: (message: any, user: UserDataContext) => dispatch(updateMessageContact(message, user)),
  addScrollSetMessageData: (data: { id:number, skip:number }, user: UserDataContext) => dispatch(addScrollSetMessageData(data, user))
})

export const MessageConversation = connect(mapStateToProps, mapDispatchToProps)(MessageFunction)
