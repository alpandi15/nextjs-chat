import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  faCheck
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getContactsData } from '../../../redux/actions/contact'
import { getProfileData } from '../../../redux/actions/message'

function ListContactFunction({
  getContactsData,
  getProfileData,
  contacts
}: any) {
  const [messageActive, setMessageActive] = useState(null)
  useEffect(() => {
    const fetch = async () => {
      await getContactsData()
    }
    fetch()
  }, [])

  const clickFriend = async (contactId: number) => {

    let contactMessage = contacts.filter((v: { id: any }) => {
      return v.id == contactId;
    })

    let friend_id = contactMessage.length > 0 ? {status: true, id: contactMessage[0].friend.id} : {status: false}
    console.log('ID ', contactMessage, friend_id)
    if(friend_id.status && messageActive !== friend_id.id){
      await getProfileData(friend_id.id)
      setMessageActive(friend_id.id)
    }
  }

  return (
    <ContentListChat>
      {
        contacts?.map((val: any, key: number) => {
          return (
            <UserContact key={key} onClick={() => clickFriend(val?.id)}>
              <ProfileImg>
                <img src="/profile.png" alt=""/>
                <div>
                  <div className="username">{val?.friend?.name}</div>
                  <div className="current-message">
                    <FontAwesomeIcon color="#919191" icon={faCheck} />
                    <div style={{ marginLeft: '5px' }}>{val?.friend?.pesan_terakhir}</div>
                  </div>
                </div>
              </ProfileImg>
              <div style={{ fontSize: '11px' }}>
                20:30am
              </div>
            </UserContact>
          )
        })
      }
  </ContentListChat>
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
  getProfileData: (id: number) => dispatch(getProfileData(id))
})

export const ListContact = connect(mapStateToProps, mapDispatchToProps)(ListContactFunction)

const ContentListChat = styled.div`
  height: 536px;
  max-height: 536px;
  overflow: hidden;
  overflow-y: scroll;
`
const UserContact = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ececec;
  cursor: pointer;
`
const ProfileImg = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  .username {
    font-size: 12px;
    margin-left: 10px;
    font-weight: 500;
  }
  
  .status {
    font-size: 11px;
    margin-left: 10px;
  }

  .current-message {
    margin-left: 10px;
    font-size: 10px !important;
    display: flex;
    align-items: center;
    padding: 0 !important;
  }
`