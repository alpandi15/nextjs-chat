import React from 'react'
import styled from 'styled-components'
import {
  faCommentAlt,
  faCheck,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link'
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ProfileImg>
                <img src="/vercel.svg" alt=""/>
              </ProfileImg>
              <div style={{
                padding: '0 8px',
                fontSize: '14px',
                fontWeight: 500
              }}>{user?.name}</div>
            </div>
            <ActionContent>
              <ButtonIcon><FontAwesomeIcon color="#4e4e4e" icon={faCommentAlt}/></ButtonIcon>
              <ButtonIcon onClick={logout}>
                <FontAwesomeIcon color="#4e4e4e" icon={faSignOutAlt}/>
              </ButtonIcon>
            </ActionContent>
          </Header>
          <div style={{ padding: '10px', backgroundColor: 'rgb(247 247 247)' }}>
            <SearchBar
              placeholder="Cari..."
            />
          </div>
          <ContentListChat>
            {
              UserData.map((val, key) => (
                <UserContact key={key}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                  }}>
                    <ProfileImg>
                      <img src="/vercel.svg" alt=""/>
                    </ProfileImg>
                    <div style={{ margin: '0 10px' }}>
                      <ContantName>{val.name}</ContantName>
                      <Message>
                        <FontAwesomeIcon color="4e4e4e" icon={faCheck} />
                        <div style={{ marginLeft: '5px' }}>Udah kan ?</div>
                      </Message>
                    </div>
                  </div>
                  <div style={{ fontSize: '11px' }}>
                    20:30am
                  </div>
                </UserContact>
              ))
            }
          </ContentListChat>
        </LeftSide>
        <RightSide>
          Kanan
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
  max-width: 90%;
  min-width: 380px;
  display: flex;
`
const LeftSide = styled.div`
  width: 40%;
`
const RightSide = styled.div`
  background: blue;
  width: 60%;
`
const Header = styled.div`
  background: #dedede;
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 15px;
  justify-content: space-between;
`
const ProfileImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: red;
`
const ActionContent = styled.div`
  display: flex;
  align-items: center;
`
const ButtonIcon = styled.div`
  padding: 5px 10px;
  font-size: 20px;
  cursor: pointer;
`
const SearchBar = styled.input`
  width: 100%;
  height: 3rem;
  border-radius: 5px;
  padding: 15px;
  outline: none;
  font-size: 12px;
`
const ContentListChat = styled.div`
  height: 400px;
  max-height: 400px;
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
const Message = styled.div`
  font-size: 10px !important;
  display: flex;
  align-items: center;
  padding: 0 !important;
`
const ContantName = styled.div`
  font-size: 14px;
  font-weight: 600;
`
const Logout = styled.button`
  margin-top: 2rem;
`