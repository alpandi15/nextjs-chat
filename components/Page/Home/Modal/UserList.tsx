import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from 'redux/actions/user'
import { apiAddContact } from 'services/contacts'
import {
  faUserPlus
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Scroll,
  Button
} from './styled'

const UserList = () => {
  const dispatch = useDispatch()
  const usersData = useSelector((state: any) => state?.userStore?.users)
  useEffect(() => {
    (async () => {
      dispatch(getUserData())
    })()
  }, [])

  const addTeman = async (username: string) => {
    await apiAddContact({
      friend: username
    })
  }

  return (
    <>
      <Scroll>
        {
          usersData?.map((val: any, index: number) => (
            <div className="user-wrapper" key={index}>
              <div className="user">
                <img src="/profile.png" className="image" alt="" />
                <div className="user-name">{val?.name}</div>
              </div>
              <div className="action">
                {
                  val?.berteman?.status === 'diterima' && (
                    <div className="status-friend">Teman Anda</div>
                  )
                }
                {
                  val?.berteman?.status === 'proses' && (
                    <div className="status-process">Menunggu Konfirmasi</div>
                  )
                }
                {
                  val?.berteman?.status === 'ditolak' && (
                    <div className="status-reject">Ditolak</div>
                  )
                }
                {
                  !val?.berteman && (
                    <Button onClick={() => addTeman(val?.username)} className="add">
                      <FontAwesomeIcon icon={faUserPlus} />
                    </Button>
                  )
                }
              </div>
            </div>
          ))
        }
      </Scroll>
    </>
  )
}

export default UserList
