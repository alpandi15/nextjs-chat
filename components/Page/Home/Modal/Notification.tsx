import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getContactsDataKonfirmasi } from 'redux/actions/contact'
import { apiDestroyKonfirmasi } from 'services/contacts'
import {
  Scroll,
  Button
} from './styled'

const Notification = () => {
  const dispatch = useDispatch()
  const contactKonfirmasi = useSelector((state: any) => state?.contactStore?.contactKonfirmasi)
  useEffect(() => {
    (async () => {
      dispatch(getContactsDataKonfirmasi())
    })()
  }, [])
  const terimaTeman = async (id: number) => {
    await apiDestroyKonfirmasi(id, {
      status: 'diterima'
    })
  }
  const tolakTeman = async (id: number) => {
    await apiDestroyKonfirmasi(id, {
      status: 'ditolak'
    })
  }
  return (
    <>
      <Scroll>
        {
          contactKonfirmasi?.map((val: any, index: number) => (
            <div className="user-wrapper" key={index}>
              <div className="user">
                <img className="image" src="/profile.png" alt="" />
                <div className="user-name">{val?.friend?.name}</div>
              </div>
              <div className="action">
                <Button onClick={() => terimaTeman(val?.friend?.id)} className="accept">Terima</Button>
                <Button onClick={() => tolakTeman(val?.friend?.id)} className="reject">Tolak</Button>
              </div>
            </div>
          ))
        }
      </Scroll>
    </>
  )
}

export default Notification
