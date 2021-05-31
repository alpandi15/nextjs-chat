import React from 'react'
import styled from 'styled-components'
import {
  faCommentAlt,
  faCheck,
  faCheckDouble,
  faSignOutAlt,
  faTimes,
  faPaperPlane,
  faSearch
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withAuthSync } from '../../components/Security/auth'
import { useAppContext } from '../../hook/useAppData'

const UserData = [
  {id: 1, name: 'Pandi'},
  {id: 1, name: 'Pandi'},
  {id: 1, name: 'Pandi'},
  {id: 1, name: 'Pandi'},
  {id: 1, name: 'Pandi'},
  {id: 1, name: 'Pandi'},
  {id: 1, name: 'Pandi'},
  {id: 1, name: 'Pandi'}
]

const Home = () => {
  const { user, logout } = useAppContext()
  return (
    <ContentLayout>
      <Content>
        <LeftSide>
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
            />
          </FormSearch>
          <ContentListChat>
            {
              UserData.map((val, key) => (
                <UserContact key={key}>
                  <ProfileImg>
                    <img src="/profile.png" alt=""/>
                    <div>
                      <div className="username">{val.name}</div>
                      <div className="current-message">
                        <FontAwesomeIcon color="#919191" icon={faCheck} />
                        <div style={{ marginLeft: '5px' }}>Udah kan ?</div>
                      </div>
                    </div>
                  </ProfileImg>
                  <div style={{ fontSize: '11px' }}>
                    20:30am
                  </div>
                </UserContact>
              ))
            }
          </ContentListChat>
        </LeftSide>
        <RightSide>
          <Header>
            <ProfileImg>
              <img src="/profile.png" alt=""/>
              <div style={{
                padding: '0 8px'
              }}>
                <div className="username">{user?.name}</div>
                <div className="status">Online</div>
              </div>
            </ProfileImg>
            <ActionContent>
              <ButtonIcon onClick={logout}>
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
        </RightSide>
      </Content>
    </ContentLayout>
  )
}

export default withAuthSync(Home)

const ContentLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const Content = styled.div`
  background-color: #FFF;
  width: 100%;
  max-width: 100%;
  min-width: 380px;
  display: flex;
  height: 100%;
  overflow: hidden;
`
const LeftSide = styled.div`
  width: 30%;
`
const RightSide = styled.div`
  width: 70%;
  border-left: 1px solid #cecece;
  position: relative;
`
const Header = styled.div`
  background: #dedede;
  height: 55px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 15px;
  justify-content: space-between;
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
const ActionContent = styled.div`
  display: flex;
  align-items: center;
`
const ButtonIcon = styled.div`
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
`
const FormSearch = styled.div`
  padding: 5px 10px;
  background-color: #ededed;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;

  .left-icon, .right-icon {
    padding: 10px;
  }

  .left-icon {
    position: absolute;
    top: 2px;
    left: 13px;
  }
`
const SearchBar = styled.input`
  width: 100%;
  height: 2.2rem;
  border-radius: 30px;
  padding: 0 15px;
  outline: none;
  font-size: 12px;
  padding-left: 40px;
`
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
const InputMessage = styled.textarea`
  width: 100%;
  height: 3rem;
  border-radius: 5px;
  padding: 7px 10px;
  outline: none;
  font-size: 12px;
`
const ScrollMessage = styled.div`
  height: calc(100vh - 122px);
  .wrapper {
    .content {
      padding: 5px;
      .date {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .text {
          font-size: 12px;
          padding: 2px 5px;
          border-radius: 8px;
        }
      }

      .message {
        .times {
          span {
            font-size: 9px;
          }
        }
      }
    }
  }
`
const FormSendMessage = styled.div`
  // padding: 10px;
  background-color: #ececec;
  // position: absolute;
  // width: 100%;
  // bottom: 0;
  // display: flex;
  // align-items: center;

  .right-icon, .right-icon {
    padding: 10px;
  }
`