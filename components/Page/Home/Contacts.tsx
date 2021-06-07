import { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import {
  faCheck,
  faCheckDouble,
  faBell,
  faSignOutAlt,
  faSearch,
  faUserFriends
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  addContactDataKonfirmasi,
  addContactDataProses,
  getContactsData,
  konfirmasiContactDiterima,
  konfirmasiContactTolak,
  updateMessageContact
} from '../../../redux/actions/contact'
import {
  getProfileData,
  getMessageData,
  endScrollMessage
} from '../../../redux/actions/message'
import {
  Header,
  ProfileImg,
  LogoutAction,
  ButtonIcon,
  FormSearch,
  SearchBar,
  ContentListChat,
  UserContact,
  PesanTerakhir,
  Badge
} from './styles'
import { useAppContext } from '../../../hook/useAppData'
import { UserDataContext } from 'context/AppContext'
import Modal from 'components/Modal'
import ModalNotification from './Modal/Notification'
import UserList from './Modal/UserList'
import { updateUserData } from 'redux/actions/user'

function ListContactFunction({
  getContactsData,
  getProfileData,
  getMessageData,
  updateMessageContact,
  contacts,
  profile
}: any) {
  const { user, logout, notification } = useAppContext()
  const contactKonfirmasi = useSelector((state: any) => state?.contactStore?.contactKonfirmasi)
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const [modal, setModal] = useState({
    notification: false,
    friends: false
  })

  useEffect(() => {
    const fetch = async () => {
      await getContactsData()
    }
    fetch()
  }, [])

  useEffect(() => {
    (async () => {
      if(notification?.message !== undefined) {
        await updateMessageContact(notification?.message, user)
      }

      if(notification.contact !== undefined){
        if(notification.contact.status === 'proses' && notification.contact.friend.id !== user?.id){
          // ini pengirim pertemanan masuk ke proses
          dispatch(addContactDataProses(notification.contact))
        // console.log('tambah teman');
        }else if(notification.contact.status === 'proses' && notification.contact.friend.id === user?.id){
            // ini penerima pertemanan masuk ke konfirmasi
          dispatch(addContactDataKonfirmasi(notification.contact, user))
        }else if(notification.contact.status === 'ditolak'){
          dispatch(konfirmasiContactTolak(notification.contact, user))
            
        }else if(notification.contact.status === 'diterima'){
          dispatch(konfirmasiContactDiterima(notification.contact, user))
          console.log('diterima');
        }
        dispatch(updateUserData(notification.contact))
      }
    })()
  }, [notification])

  const clickFriend = async (contactId: number) => {
    const finded = contacts.find((v: any) => Number(v.id) === Number(contactId))
    if (profile?.id !== finded?.friend?.id) {
      dispatch(endScrollMessage(true))
      await getProfileData(finded?.friend?.id)
      await getMessageData(finded?.friend?.id)
    }
  }

  const handleModal = (state: "notification" | 'friends') => {
    setModal({
      ...modal,
      [state]: !modal[state]
    })
  }
  return (
    <>
      <Header>
        <ProfileImg>
          <img src="/profile.png" alt=""/>
          <div className="username">{user?.name}</div>
        </ProfileImg>
        <LogoutAction>
          <ButtonIcon onClick={() => handleModal('friends')}><FontAwesomeIcon color="#919191" icon={faUserFriends}/></ButtonIcon>
          <ButtonIcon onClick={() => handleModal('notification')}>
            <FontAwesomeIcon color="#919191" icon={faBell}/>
            {
              contactKonfirmasi?.length !== 0 && (
                <Badge>{contactKonfirmasi?.length}</Badge>
              )
            }
          </ButtonIcon>
          <ButtonIcon onClick={logout}>
            <FontAwesomeIcon color="#919191" icon={faSignOutAlt}/>
          </ButtonIcon>
        </LogoutAction>
      </Header>
      <FormSearch>
        <div className="left-icon">
          <FontAwesomeIcon color="#ededed" icon={faSearch} />
        </div>
        <SearchBar
          placeholder="Cari..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </FormSearch>
      <ContentListChat>
        {
          contacts.filter((v: any) => {
            if (search === '') {
              return v
            } else if (String(v?.friend?.name).toLowerCase().includes(search.toLowerCase())) {
              return v
            }
          }).map((val: any, key: number) => {
            if (val?.status === 'diterima') {
              return (
                <UserContact
                  active={profile?.id === val?.friend?.id}
                  key={key}
                  onClick={() => clickFriend(val?.id)}
                >
                  <ProfileImg>
                    <img src="/profile.png" alt=""/>
                    <div>
                      <div className="username">{val?.friend?.name}</div>
                      <div className="current-message">
                        {
                          val?.friend?.as_pesan === 'pengirim'
                          ? val?.friend?.read_at === null ? (
                            <>
                              <FontAwesomeIcon className="text-gray-400" icon={faCheck} />
                              <PesanTerakhir style={{ marginLeft: '5px' }}>{val?.friend?.pesan_terakhir}</PesanTerakhir>
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon className="text-green-500" icon={faCheckDouble} />
                              <PesanTerakhir style={{ marginLeft: '5px' }}>{val?.friend?.pesan_terakhir}</PesanTerakhir>
                            </>
                          )
                          : val?.friend?.read_at === null ? (
                            <>
                              <PesanTerakhir style={{ fontWeight: 600, fontSize: '11px' }}>{val?.friend?.pesan_terakhir}</PesanTerakhir>
                            </>
                          ) : (
                            <>
                              <PesanTerakhir>{val?.friend?.pesan_terakhir}</PesanTerakhir>
                            </>
                          )
                        }
                      </div>
                    </div>
                  </ProfileImg>
                  <div style={{ fontSize: '11px' }}>
                    {val?.friend?.terakhir_dilihat}
                  </div>
                </UserContact>
              )
            }
            return
          })
        }
      </ContentListChat>
      <Modal
        open={modal?.notification}
        onClose={() => handleModal('notification')}
      >
        <ModalNotification />
      </Modal>
      {
        modal?.friends && (
          <Modal
            open={modal?.friends}
            onClose={() => handleModal('friends')}
          >
            <UserList />
          </Modal>
        )
      }
    </>
  )
}

const mapStateToProps = (state: any) => {
  const {
    contactStore,
    messageStore
  } = state
  return {
    contacts: contactStore?.contacts,
    profile: messageStore?.profile
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  getContactsData: () => dispatch(getContactsData()),
  getProfileData: (id: number) => dispatch(getProfileData(id)),
  getMessageData: (data: any) => dispatch(getMessageData(data)),
  updateMessageContact: (data: any, user: UserDataContext) => dispatch(updateMessageContact(data, user))
})

export const ListContact = connect(mapStateToProps, mapDispatchToProps)(ListContactFunction)
