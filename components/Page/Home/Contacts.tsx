import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  faCheck,
  faCheckDouble,
  faCommentAlt,
  faSignOutAlt,
  faSearch
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getContactsData, updateMessageContact } from '../../../redux/actions/contact'
import {
  getProfileData,
  getMessageData
} from '../../../redux/actions/message'
import {
  Header,
  ProfileImg,
  ActionContent,
  ButtonIcon,
  FormSearch,
  SearchBar,
  ContentListChat,
  UserContact
} from './styles'
import { useAppContext } from '../../../hook/useAppData'
import { UserDataContext } from 'context/AppContext'

function ListContactFunction({
  getContactsData,
  getProfileData,
  getMessageData,
  updateMessageContact,
  contacts
}: any) {
  const [messageActive, setMessageActive] = useState(null)
  const { user, logout, notification } = useAppContext()
  const [search, setSearch] = useState('')

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
    })()
  }, [notification])

  const clickFriend = async (contactId: number) => {
    const finded = contacts.find((v: any) => Number(v.id) === Number(contactId))
    if (finded && messageActive !== finded?.id) {
      await getProfileData(finded?.friend?.id)
      await getMessageData(finded?.friend?.id)
      setMessageActive(finded?.friend?.id)
    }
  }

  return (
    <>
      <Header>
        <ProfileImg>
          <img src="/profile.png" alt=""/>
          <div className="username">{user?.name}</div>
        </ProfileImg>
        <ActionContent>
          <ButtonIcon><FontAwesomeIcon color="#919191" icon={faCommentAlt}/></ButtonIcon>
          <ButtonIcon onClick={logout}>
            <FontAwesomeIcon color="#919191" icon={faSignOutAlt}/>
          </ButtonIcon>
        </ActionContent>
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
                <UserContact key={key} onClick={() => clickFriend(val?.id)}>
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
                              <div style={{ marginLeft: '5px' }}>{val?.friend?.pesan_terakhir}</div>
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon className="text-green-500" icon={faCheckDouble} />
                              <div style={{ marginLeft: '5px' }}>{val?.friend?.pesan_terakhir}</div>
                            </>
                          )
                          : val?.friend?.read_at === null ? (
                            <>
                              <div style={{ fontWeight: 600 }}>{val?.friend?.pesan_terakhir}</div>
                            </>
                          ) : (
                            <>
                              <div>{val?.friend?.pesan_terakhir}</div>
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
    </>
  )
}

const mapStateToProps = (state: any) => {
  const {
    contactStore
  } = state
  return {
    contacts: contactStore?.contacts
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  getContactsData: () => dispatch(getContactsData()),
  getProfileData: (id: number) => dispatch(getProfileData(id)),
  getMessageData: (data: any) => dispatch(getMessageData(data)),
  updateMessageContact: (data: any, user: UserDataContext) => dispatch(updateMessageContact(data, user))
})

export const ListContact = connect(mapStateToProps, mapDispatchToProps)(ListContactFunction)
