import React from 'react'
import styled from 'styled-components'
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link'
import { withAuthSync } from '../../components/Security/auth'
import { useAppContext } from '../../hook/useAppData'

const Home = () => {
  const { user, logout } = useAppContext()
  return (
    <ContentLayout>
      <Content>
        {/* <div>
          <div>Selamat Datang,</div>
          <b>
            {
              user?.name
            }
          </b>
          {' '}
          <Link href="/home/profile">
            <a>{`Profil's >>`}</a>
          </Link>
          <div>
            <Logout onClick={logout}>Logout</Logout>
          </div>
        </div> */}
        <LeftSide>
          <Header>
            <ProfileImg>
              <img src="/vercel.svg" alt=""/>
            </ProfileImg>
            <ActionContent>
              <Icon><FontAwesomeIcon size="2x" color="#4e4e4e" icon={faComment}/></Icon>
              <Icon><FontAwesomeIcon size="2x" color="#4e4e4e" icon={faComment}/></Icon>
            </ActionContent>
          </Header>
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
  background: red;
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
  padding: 5px;
  justify-content: space-between;
`
const ProfileImg = styled.div`
  width: 55px;
  height: 55px;
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
const Icon = styled.div`
  padding: 10px;
`

const Logout = styled.button`
  margin-top: 2rem;
`