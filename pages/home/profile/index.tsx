import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { withAuthSync } from '../../../components/Security/auth'
import { useUserContext } from '../../../components/Context/UserContext'

const Profile = () => {
  const state = useUserContext()

  return (
    <Content>
      <div>
        Profile User
      </div>
      <div>
        <div>
          <div><b>Name</b></div>
          <div>{state?.user?.name}</div>
        </div>
        <div>
          <div><b>Email</b></div>
          <div>{state?.user?.email}</div>
        </div>
        <div>
          <div><b>Username</b></div>
          <div>{state?.user?.username}</div>
        </div>
      </div>
      <div>
        <Link href="/home/profile/edit">
          <a>Edit</a>
        </Link>
      </div>
    </Content>
  )
}

export default withAuthSync(Profile)

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
